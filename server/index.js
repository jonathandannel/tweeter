"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const path          = require("path");
const nodeSassMiddleware = require('node-sass-middleware');
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(nodeSassMiddleware({
    src: path.join(__dirname, './scss'),
    dest: path.join(__dirname, '../public'),
    debug: true,
    outputStyle: 'compressed'
}));

app.use(express.static(path.join(__dirname, '../public')));

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) throw err; //
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("=> * Tweeter listening on port " + PORT + " *");
  });

});
