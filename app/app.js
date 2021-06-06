//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2")
// const mysql = require("mysql");

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!");
});

// const request = require("request")
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/v1/hello", (req, res) => {
  res.json({"message": "hello"})
});



app.listen(3000, function(req, res) {
  console.log("server is running on part 3000.");
});
