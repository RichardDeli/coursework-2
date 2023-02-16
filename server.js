const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const logger = require("./logger");

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
