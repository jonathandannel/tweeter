"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) throw err; //
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // db.collection('tweets').find().toArray((err, results) => {
  //   if (err) throw err;
  //   console.log('results: ', results);
  //   // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  //   // so it can define routes that use it to interact with the data layer.
  //
  //
    app.use("/tweets", tweetsRoutes);
  //
  //
  //
  //   db.close();
  // });

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
