const express = require("express");
const bodyparser = require("body-parser");
var cors = require("cors");
// const dotenv = require('dotenv').config();
var morgan = require("morgan");
const path = require("path");
const fileUpload = require("express-fileupload");

//Database import
const db = require('./database/db')

//Routes import
const routes = require("./server/routes/userRoutes");

var app = express();
db.connect()

global.appRoot = path.resolve(__dirname);

//for console in dev form
app.use(morgan("dev"));

//making uploads folder public to access
app.use("/uploads", express.static("uploads"));

app.use(
  bodyparser.urlencoded({
    extended: true
  })
);

//for cors error
app.use(cors());

app.use(
  fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 } //2mB
  })
);

//for body parser json
app.use(bodyparser.json());

//uri methods
app.use("/", routes);

//error handling
app.use((req, res, next) => {
  const error = new Error("404 Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
  console.log(error.message);
});

module.exports = app;
