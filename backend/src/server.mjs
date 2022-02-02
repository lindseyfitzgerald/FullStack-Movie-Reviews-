import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express";
import { MongoClient } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//const multer = require("multer");
//const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.static(path.join(__dirname, '/build')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", async (req, res) => {

  try{
  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewURLParser: true});
  const db = client.db('react-reviews');

  const movieInfo = await db.collection('movies').find({}).toArray();
  console.log(movieInfo)
  res.status(200).json(movieInfo);

  client.close();
  } catch(error) {
    res.status(500).json({ message: "Error connecting to DB: ", error})

  }
})
app.get("/api/movies", async (req, res) => {

  try{
  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewURLParser: true});
  const db = client.db('react-reviews');

  const movieInfo = await db.collection('movies').find({}).toArray();
  //console.log(movieInfo)
  res.status(200).json(movieInfo);

  client.close();
  } catch(error) {
    res.status(500).json({ message: "Error connecting to DB: ", error})

  }
})

app.post('/api/addMovie', async (req, res) => {
  try {
      const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
      const db = client.db('react-reviews');
      console.log(req.body);
      //const movie = {name:req.body.name, date:req.body.date, actors:req.body.actors,poster:req.body.poster, rating:req.body.rating}
      //await db.collection('movies').insertOne( movie);

      //const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
      
      res.status(200).json({message: "Success"});
      client.close();
  }
  catch( error) {
      res.status(500).json( { message: "Error connecting to db", error});
  }
})

app.post('/api/removeMovie', async (req, res) => {
  try {
      console.log(req.body.name);

      const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
      const db = client.db('react-reviews');

      let returnVal = await db.collection('movies').deleteOne( {name:req.body.name})
      console.log(returnVal);
      const movieInfo = await db.collection('movies').find({name:req.params.name}).toArray();
      if( returnVal.deletedCount == 1) {
          res.status(200).json({message: `Movie ${req.body.name} deleted`});
      }
      else {
          res.status(200).json({message: "Unable to delete movie"});
      }
      client.close();
  }
  catch( error) {
      res.status(500).json( { message: "Error connecting to db", error});
  }
})
//app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})

app.listen(3002, () => {
  console.log(`Server listening on ${3002}`);

});