require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let usersCollection, ownersCollection;

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db('strentdb');
    usersCollection = db.collection('users');
    ownersCollection = db.collection('owners');

    app.get('/test-db', async (req, res) => {
      try {
        const collections = await db.listCollections().toArray();
        res.send({ message: "Connected to MongoDB!", collections });
      } catch (error) {
        res.status(500).send({ message: "Failed to connect to MongoDB", error: error.message });
      }
    });

    app.post('/users', async (req, res) => {
      const newUser = req.body;

      try {
        if (newUser.role === 'Landlord') {
          const existingOwner = await ownersCollection.findOne({ email: newUser.email });
          if (existingOwner) {
            return res.status(400).send({ message: "Landlord account with this email already exists" });
          }

          const result = await ownersCollection.insertOne(newUser);
          return res.status(201).send({ message: "Landlord created successfully!", userId: result.insertedId });
        } else {
          const existingUser = await usersCollection.findOne({ email: newUser.email });
          if (existingUser) {
            return res.status(400).send({ message: "Tenant account with this email already exists" });
          }

          const result = await usersCollection.insertOne(newUser);
          return res.status(201).send({ message: "Tenant created successfully!", userId: result.insertedId });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error creating user/owner." });
      }
    });

    app.get('/users', async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    app.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        // Search in users collection (tenants)
        let user = await usersCollection.findOne({ email });

        if (!user) {
          // Search in owners collection (landlords)
          user = await ownersCollection.findOne({ email });

          if (!user) {
            return res.status(404).send({ message: "User not found" });
          }
        }

        if (user.password !== password) {
          return res.status(401).send({ message: "Incorrect password" });
        }

        res.send({
          message: "Login successful",
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            institution: user.institution || null,
          },
        });
      } catch (error) {
        res.status(500).send({ message: "Internal server error", error: error.message });
      }
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

main().catch(console.error);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});