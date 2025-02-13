require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4jm04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
     await client.db("admin").command({ ping: 1 });

     // to create database
     const userDatabase = client.db("Gradesway").collection("users")
     app.get('/user', async (req, res) => {
      try {
        const result = await userDatabase.find({}).toArray();
        res.send(result); // ✅ Fixed: Changed req.send() to res.send()
      } catch (error) {
        res.status(500).send({ message: "Error fetching users", error });
      }
    });
     


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);
   // Default route
   app.get('/', (req, res) => {
    res.send('port running');
   });
  
app.listen(port);
   
