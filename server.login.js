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

let collectionUsers = null
let collectionPosts = null
let loggedInUser = null

async function run() {
  try {
    await client.connect();

    //connect to blogUsers and blogPosts databases
    collectionUsers = client.db("blogDatabase").collection("blogUsers");
    collectionPosts = client.db("blogDatabase").collection("blogPosts");
    await client.db("blogDatabase").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

app.use((req, res, next) => {
  if (collectionUsers !== null) {
    next()
  } else {
    res.status(503).send()
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await collectionUsers.findOne({ username });

    if (user) {
      // User exists, check password
      if (user.password === password) {
        // Login success
        loggedInUser = username;
        console.log("Login successful for user: " + username);
        return res.redirect('/main.HTML');
      } else {
        // Incorrect password
        console.log("Incorrect password for user: " + username);
        return res.sendFile(__dirname + '/views/index.html');
      }
    } else {
      // User doesn't exist, create new user
      console.log("Creating new user: " + username);
      const result = await collectionUsers.insertOne({ username, password });
      loggedInUser = username;
      console.log(`New user created with id: ${result.insertedId}`);
      return res.redirect('/main.HTML');
    }
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).send('Database error');
  }
});

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   //if username and password pair are in blogUsers database
//   if (collectionUsers.findOne({ username, password }) !== null) {
//     loggedInUser = username;
//     return res.redirect('/main.html');
//   }
//   //if cannot find username in database
//   else if (collectionUsers.findOne({ username }) === null) {
//     console.log("Creating new user: " + username);
//     //create new user with username and password
//     collectionUsers.insertOne({ username: username, password: password })
//       .then(result => {
//         console.log(`New user created with the following id: ${result.insertedId}`);
//       })
//       .catch(err => {
//         console.error(err);
//         res.status(500).json({ error: 'Database error' });
//       });

//     loggedInUser = username;
//     return res.redirect('/main.html');
//   } else {
//     console.log("Incorrect password for user: " + username);
//     res.sendFile(__dirname + '/views/index.html')
//   };
// });

app.get('/user-posts', async (req, res) => {
  if (collectionPosts !== null) {
    const username = loggedInUser;
    try {
      const posts = await collectionPosts.find({ username: username }).toArray();
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
  if (collectionPosts !== null) {
    const { post, username, color } = req.body;
    const date = new Date();
    await collectionPosts.insertOne({ username, post, date, color });
    const posts = await collectionPosts.find({ username }).toArray();
    res.json(posts);
  } else {
    res.status(503).json({ error: 'Database not connected' });
  }
})

//delete post
// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post('/remove', async (req, res) => {
  const result = await collectionPosts.deleteOne({
    _id: new ObjectId(req.body._id)
  })

  res.json(result)
})

//update post
app.post('/update', async (req, res) => {
  const result = await collectionPosts.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { post: req.body.post } }
  )

  res.json(result)
})

app.get('/get-username', (req, res) => {
  //get username from loggedInUser variable
  res.json({ username: loggedInUser });
});

run().catch(console.dir);

app.listen(process.env.PORT || 3000)
