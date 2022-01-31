import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express";
import { MongoClient } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api/movies", async (req, res) => {

  try{
  const client = await MongoClient.connect('mongodb://localhost:27017', { userNewURLParser: true});
  const db = client.db('react-reviews');

  const movieInfo = await db.collection('movies').find({}).toArray();
  console.log(movieInfo)
  res.status(200).json(movieInfo);

  client.close();
  } catch(error) {
    res.status(500).json({ message: "Error connecting to DB: ", error})

  }
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the backend" });
});

//app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})

app.listen(3002, () => {
  console.log(`Server listening on ${3002}`);

});