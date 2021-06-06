//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const mysql = require("mysql");

const app = express();

// const request = require("request")
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.send("server is up and running.")
});



app.listen(3000, function(req, res) {
  console.log("server is running on part 3000.");
});
