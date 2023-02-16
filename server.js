const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const logger = require("./logger");
const cors = require('cors')

let connection;

const uri = 'mongodb+srv://Richard:richard1-@coursework-2.kklxmf0.mongodb.net/?retryWrites=true&w=majority'

const connectToDb = async () => {
    connection = await MongoClient.connect(
        uri,
        { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, }
      );
};

const getDb = () => {
    
    return connection.db('coursework');
  };

  app.use((req, res, next) => {
    console.log({
        method: req.method,
        url: req.url,
        status: res.statusCode
    });

    next();
}
)

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(cors())
  
connectToDb()
    .then(() => {
      app.listen(process.env.PORT, () =>
        console.log(`Server is running on port ${process.env.PORT}`)
      );
    })
    .catch((err) => {
      console.log("Error starting server: ", err);
    });
  
  const updateLesson = (lessonId, spaces) => {
    const db = getDb();
    const collection = db.collection("lesson");
  
    collection.findOneAndUpdate(
      { _id: ObjectId(lessonId) },
      { $inc: { spaces: -spaces } },
      (err, result) => {
        if (err) throw err;
      }
    );
  };
  
  app.get("/lessons", async (req, res, next) => {
    try {
      const searchText = req.query.search
      let query = {}
  
      if (searchText) {
        query = {
          $or: [
            { subject: { $regex: searchText, $options: 'i' } },
            { location: { $regex: searchText, $options: 'i' } }
          ]
        }
      }
  
      const db = getDb();
      const collection = db.collection("lesson");
      const items = await collection.find(query).toArray();
      
      res.send(items);
    } catch (err) {
      next(err);
    }
  });
  
  app.post("/orders", async (req, res, next) => {
    try {
      const order = req.body;
  
      const db = getDb();
      const collection = db.collection("order");
  
      collection.insertOne(order, (err, result) => {
        if (err) throw err;
  
        // updateLesson(order.lesson_id, order.spaces);
  
        res.json(result);
      });
    } catch (err) {
      next(err);
    }
  });
  
  