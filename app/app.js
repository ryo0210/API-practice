//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2")
// const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test"
});

// const request = require("request")
// app.use(bodyParser.urlencoded({extended: true}));

//Get all users
app.all("/api/v1/users", function(req, res) {
    //Connect mysql2
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected all method!!!");
    });
    connection.query('SELECT * FROM users', function(err, rows) {
        if (!rows) {
            res.status(404).send({message: "Not Found users!"})
        } else {
            res.status(200).json(rows)
        }
    });
});

//Get a user
app.get("/api/v1/users/:id", function(req, res) {
    //Connect mysql2
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected get method!!!");
    });
    const id = req.params.id
    connection.query(`SELECT * FROM users WHERE id = ${id}`, function(err, row) {
        if (!row) {
            res.status(404).send({message: "Not Found user!"})
        } else {
            res.status(201).json(row)
        }
    });
});

//Search users matching keyword
app.get("/api/v1/search", function(req, res) {
    //Connect mysql2
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected get method!!!");
    });
    const keyword = req.query.q
    connection.query(`SELECT * FROM users WHERE name LIKE "%${keyword}%"`, function(err, rows) {
        if (!rows) {
            res.status(404).send({message: keyword})
        } else {
            res.status(200).json(rows)
        }
    });
});

app.listen(3000, function(req, res) {
  console.log("server is running on part 3000.");
});
