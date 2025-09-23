require('dotenv').config();

const express = require('express'),
  app = express(),
  dreams = []

app.use(express.static('public'))
app.use(express.static('views'))

app.use(express.json())

app.post('/submit', (req, res) => {
  dreams.push(req.body.newdream)
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(dreams))
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection = null

async function run() {
  try {
    await client.connect(
      err => {
        console.log("err :", err);
        client.close();
      }

    );
    collection = client.db("blogDatabase").collection("blogUsers");
    // Send a ping to confirm a successful connection
    await client.db("blogDatabase").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

app.get("/docs", async (req, res) => {
  if (collection !== null) {
    const docs = await collection.find({}).toArray()
    res.json(docs)
  }
})

run().catch(console.dir);

app.listen(process.env.PORT || 3000)	
