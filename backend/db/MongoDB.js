require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db('strentdb'); 
    const usersCollection = db.collection('users');
    const ownersCollection = db.collection('owners');
    const ApartListingsCollection = db.collection('ApartListings');
    const messagesCollection = db.collection('messages');

    app.get('/test-db', async (req, res) => {
      try {
        const collections = await db.listCollections().toArray();
        res.send({ message: "Connected to MongoDB!", collections });
      } catch (error) {
        res.status(500).send({ message: "Failed to connect to MongoDB", error: error.message });
      }
    });

    // 📨 POST /send-message
    app.post('/send-message', async (req, res) => {
      const { senderId, receiverId, text } = req.body;

      if (!senderId || !receiverId || !text) {
        return res.status(400).send({ message: "Missing fields" });
      }

      try {
        const newMessage = {
          senderId,
          receiverId,
          text,
          timestamp: new Date()
        };

        const result = await messagesCollection.insertOne(newMessage);
        res.status(201).send({ message: "Message sent!", messageId: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to send message" });
      }
    });

    app.post('/users', async (req, res) => {
      const newUser = req.body;

      console.log('Received user data:', newUser);
      console.log('Type of age:', typeof newUser.age);

      const requiredFields = ['firstName', 'lastName', 'age', 'email', 'password', 'confirmPassword', 'role'];
      for (const field of requiredFields) {
        if (!newUser[field]) {
          return res.status(400).send({ message: `Missing required field: ${field}` });
        }
      }

      if (newUser.role === 'Tenant' && !newUser.institution) {
        return res.status(400).send({ message: "Institution is required for Tenant role" });
      }

      if (newUser.age !== undefined) {
        if (!Number.isInteger(newUser.age) || newUser.age <= 0) {
          return res.status(400).send({ message: "Age must be a positive integer" });
        }
        newUser.age = Number(newUser.age);
      }

      try {
        if (newUser.role === 'Landlord') {
          const existingOwner = await ownersCollection.findOne({ email: newUser.email });
          if (existingOwner) {
            return res.status(400).send({ message: "Landlord account with this email already exists" });
          }

          const result = await ownersCollection.insertOne(newUser);
          console.log('Inserted Landlord:', await ownersCollection.findOne({ _id: result.insertedId }));
          return res.status(201).send({ message: "Landlord created successfully!", userId: result.insertedId });
        } else {
          const existingUser = await usersCollection.findOne({ email: newUser.email });
          if (existingUser) {
            return res.status(400).send({ message: "Tenant account with this email already exists" });
          }

          const result = await usersCollection.insertOne(newUser);
          console.log('Inserted Tenant:', await usersCollection.findOne({ _id: result.insertedId }));
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

      console.log('Login attempt with email:', email);

      try {
        let user = await usersCollection.findOne({ email });
        console.log('User in users collection:', user);

        if (!user) {
          user = await ownersCollection.findOne({ email });
          console.log('User in owners collection:', user);
          if (!user) {
            return res.status(404).send({ message: "User not found" });
          }
        }

        if (user.password !== password) {
          console.log('Password mismatch for user:', user.email);
          return res.status(401).send({ message: "Incorrect password" });
        }

        console.log('Login successful for user:', user.email);
        res.send({
          message: "Login successful",
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            institution: user.institution || undefined,
            age: user.age,
            studyProgram: user.studyProgram || undefined,
            description: user.description || undefined
          }
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: "Internal server error", error: error.message });
      }
    });

    app.post('/rent', async (req, res) => {
      const newApartment = req.body;

      try {
        const result = await ApartListingsCollection.insertOne(newApartment);
        res.status(201).send({ message: 'Apartment added successfully', apartmentId: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding apartment', error: error.message });
      }
    });

    app.listen(3001, () => {
      console.log('Server running on http://localhost:3001');
    });

  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    await client.close();
    process.exit(1);
  }
}

main().catch(console.error);