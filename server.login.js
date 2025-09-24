require('dotenv').config();

const express = require('express'),
  app = express(),
  dreams = []

app.use(express.static('public'))
app.use(express.static('views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();
    collection = client.db("blogDatabase").collection("blogUsers");
    await client.db("blogDatabase").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

app.use((req, res, next) => {
  if (collection !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.USERNM &&
    password === process.env.PASS
  ) {

    return res.redirect('/main.html');
  }
  else if (username !== process.env.USERNM) {
    //create new user with username and password
    collection.insertOne({ username: username, password: password })
      .then(result => {
        console.log(`New user created with the following id: ${result.insertedId}`);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
      });


    return res.redirect('/main.html');
  } else {

    res.sendFile(__dirname + '/views/index.html')
  };
});

app.get('/user-posts', async (req, res) => {
  if (collection !== null) {
    const username = process.env.USERNM;
    try {
      const posts = await collection.find({ username: username }).toArray();
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(503).json({ error: 'Database not connected' });
  }
});

//add post attached to post button
app.post('/add', async (req, res) => {
  if (collection !== null) {
    const { post, username, color } = req.body;
    const date = new Date();
    await collection.insertOne({ username, post, date, color });
    const posts = await collection.find({ username }).toArray();
    res.json(posts);
  } else {
    res.status(503).json({ error: 'Database not connected' });
  }
})

//delete post
// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post('/remove', async (req, res) => {
  const result = await collection.deleteOne({
    _id: new ObjectId(req.body._id)
  })

  res.json(result)
})

//update post
app.post('/update', async (req, res) => {
  const result = await collection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { post: req.body.post } }
  )

  res.json(result)
})

app.get('/get-username', (req, res) => {
  res.json({ username: process.env.USERNM });
});

run().catch(console.dir);

app.listen(process.env.PORT || 3000)
