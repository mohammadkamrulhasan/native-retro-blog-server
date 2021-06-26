const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors=require('cors');
const bodyParser=require('body-parser');
require('dotenv').config()
const port =process.env.PORT || 5055 ;
// console.log(process.env.DB_USER);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Assalamu Alaikum')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fyzwt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection err',err);
  const productsCollection = client.db("kamrulBlog").collection("blog");
  // perform actions on the collection object
  console.log('Database connected successfully');

 
});



app.listen(port,()=>{
    console.log(`Back End is running at http://localhost:, ${port}`)
})







