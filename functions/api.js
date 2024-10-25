require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

router.use(cors());
//router.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.q2fr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    const database = client.db("ebusiness_shop_dbuser");
    const tbladdcategory = database.collection("tbladdcategory");

    // Register routes here...
    router.get("/dashboardgetcategorylist", async (req, res) => {
      try {
        const query = tbladdcategory.find();
        const result = await query.toArray();
        res.send(result);
      } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).send("Internal Server Error");
      }
    });

    
    
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}


run();


app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
