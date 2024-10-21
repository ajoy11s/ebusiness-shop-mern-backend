require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


//mongoDB Code added with function

const { MongoClient, ServerApiVersion } = require('mongodb');
const { error } = require('console');
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.q2fr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("ebusiness_shop_dbuser");
   
    const testdatacollection = database.collection("testdata");
   /* const doc = {
        title: "Ajoy Kumar Paul",
        content: "Test MongoDB",
      }
      const result = await testdata_collection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);*/

      app.get("/testdata", async (req, res) => {
        const query = testdatacollection.find();
        console.log(query);
        const result = await query.toArray();
        console.log(result);
        res.send(result);
      });

      const tblregisteruseradd = database.collection("tblregisteruseradd");
      app.post("/register_user_add", async (req, res) => {
        const userlist = req.body;
        const result = await tblregisteruseradd.insertOne(userlist);
        res.send(result);
      });

      const tbladdproduct = database.collection("tbladdproduct");
      app.post("/dashboard_add_product", async (req, res) => {
        const productlist = req.body;
        const result = await tbladdproduct.insertOne(productlist);
        res.send(result);
      });

      const tbladdcategory = database.collection("tbladdcategory");
      app.post("/dashboard_add_categorylist", async (req, res) => {
        const categorylist = req.body;
        const result = await tbladdcategory.insertOne(categorylist);
        res.send(result);
      });

      app.get("/dashboard_get_categorylist", async (req, res) => {
        const query = database.collection("tbladdcategory").find();
        console.log(query);
        const result = await query.toArray();
        console.log(result);
        res.send(result);
      });
  
  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch((error)=>{
    console.log(error);
});

//mongoDB Code end with function

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})