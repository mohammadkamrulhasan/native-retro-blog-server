const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors=require('cors');
const bodyParser=require('body-parser');

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");



require('dotenv').config();
const port =process.env.PORT || 5055 ;
// console.log(process.env.DB_USER);

app.use(cors());
app.use(bodyParser.json());


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/categories", categoryRoute);
  


app.listen(process.env.PORT || port)







