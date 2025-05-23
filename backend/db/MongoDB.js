require('dotenv').config();  // load .env variables
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());



const uri = process.env.MONGODB_URI; // <--- THIS pulls from .env
const client = new MongoClient(uri);


async function main() {
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
  
    try {
      if (newUser.role === 'Landlord') {
        // 🔥 Save to owners collection
  
        // Check if landlord email already exists
        const existingOwner = await ownersCollection.findOne({ email: newUser.email });
        if (existingOwner) {
          return res.status(400).send({ message: "Landlord account with this email already exists" });
        }
  
        const result = await ownersCollection.insertOne(newUser);
        return res.status(201).send({ message: "Landlord created successfully!", userId: result.insertedId });
  
      } else {
        // 🔥 Save to users collection (Tenant)
  
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
      const user = await usersCollection.findOne({ email });
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      if (user.password !== password) {/*!!!*/
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
          institution: user.institution
        }
      });
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error: error.message });
    }
  });

  app.post('/rent', async (req, res) => {
    const newApartment = req.body;  // 👈 gets the form data from the frontend
  
    try {
      const result = await ApartListingsCollection.insertOne(newApartment); // 👈 insert into MongoDB
      res.status(201).send({ message: 'Apartment added successfully', apartmentId: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error adding apartment', error: error.message });
    }
  });


  };
  
  
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
  


main().catch(console.error);