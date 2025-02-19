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
    // await client.connect();
    //  await client.db("admin").command({ ping: 1 });

     // to create database
     const userDatabase = client.db("Gradesway").collection("users")
     const quizeDatabase = client.db("Gradesway").collection("quizes") 

    // post user data to the database
     app.post('/user', async (req, res) => {
        const user = req.body;
        const result = await userDatabase.insertOne(user);
        res.send(result);
     });

    
     // get user data from database
     app.get('/user', async (req, res) => {
      try {
        const result = await userDatabase.find({}).toArray();
        res.send(result); // ✅ Fixed: Changed req.send() to res.send()
      } catch (error) {
        res.status(500).send({ message: "Error fetching users", error });
      }
     });
     
     // post quize to the database
     app.post('/quiz', async (req, res) => {
      try {
        const user = req.body;
        const result = await quizeDatabase.insertOne(user);
        res.status(201).send({ message: "User created successfully", result });
      } catch (error) {
        res.status(500).send({ message: "Error creating user", error });
      }
     });
     

     // get quiz data from database
     app.get('/quizs', async (req, res) => {
      try {
        const result = await quizeDatabase.find({}).toArray();
        res.send(result); 
      } catch (error) {
        res.status(500).send({ message: "Error fetching quizes", error });
      }
     });

     // get quiz data base on id 
     app.get('/quizs/:id', async (req, res) => {
      try {
        const id = new ObjectId(req.params.id);
        const result = await quizeDatabase.findOne({ _id: id });
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error fetching quiz", error });
      }
     });
     
     // delte quiz data from database
     app.delete('/quizs/:id', async (req, res) => {
        const id = new ObjectId(req.params.id);
        const result = await quizeDatabase.deleteOne({ _id: id });
        res.send(result);
     });

     // update data from database
     app.put('/quizs/:id', async (req, res) => {
      const id = new ObjectId(req.params.id);
      const updateData = req.body; // Only update provided fields
  
      const result = await quizeDatabase.updateOne(
          { _id: id },
          { $set: updateData }
      );
      res.send(result);
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
   
