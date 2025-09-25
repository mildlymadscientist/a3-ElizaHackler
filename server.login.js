require('dotenv').config();

const express = require('express'),
  app = express(),
  dreams = []

//middleware
app.use(express.static('public'))
app.use(express.static('views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//connect to MongoDB with information in .env file
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//make variables
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

//makes sure database is connected because it kept erroring
app.use((req, res, next) => {
  if (collectionUsers !== null) {
    next()
  }
})

//login from username and password
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  //findOne returns a promise so await it
  const userExists = await collectionUsers.findOne({ username });

  //if username is in database
  if (userExists) {

    //if password is right
    if (userExists.password === password) {
      //save username
      loggedInUser = username;
      return res.redirect('/main.HTML');
    } else {
      return res.sendFile(__dirname + '/views/index.html');
    }
  } else {

    //make new user
    console.log("Creating new user: " + username);
    const result = await collectionUsers.insertOne({ username, password });

    //save username
    loggedInUser = username;

    //send new user status in URL
    return res.redirect('/main.HTML?newUser=true');
  }

});

//gets all posts for username
app.get('/user-posts', async (req, res) => {

  //make sure database is connected
  if (collectionPosts !== null) {

    //get logged in username
    const username = loggedInUser;

    //make sure user
    const posts = await collectionPosts.find({ username: username }).toArray();
    res.json(posts);

  } else {
    res.status(503).json({ error: 'Database not connected' });
  }
});

//add post attached to post button
app.post('/add', async (req, res) => {
  //get post info from body
  const { post, username, color } = req.body;

  //get date
  const date = new Date();

  //insert into database
  await collectionPosts.insertOne({ username, post, date, color });

  //get all posts again
  const posts = await collectionPosts.find({ username }).toArray();
  res.json(posts);
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
