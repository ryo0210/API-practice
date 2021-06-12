//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const path = require("path");
const { query } = require("express");
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test"
});

// リクエストのbodyをパースする設定
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// publicディレクトリを格納ファイル群のルートディレクトリとして設定
app.use(express.static(path.join(__dirname, 'public')));


//Get all users
app.all("/api/v1/users_list", function(req, res) {
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
    //Connect mysql
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected get method!!!");
    });
    const id = req.params.id
    connection.query(`SELECT * FROM users WHERE id = ${id}`, function(err, row) {
        if (!row) {
            res.status(404).send({message: "Not Found user!"})
        } else {
            res.status(200).json(row)
        }
    });
});

//Search users matching keyword
app.get("/api/v1/search", function(req, res) {
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

// Create a new user
app.post("/api/v1/users", async function(req, res) {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected POST method!!!");
    });

    const user_id = req.body.user_id
    const user_name = req.body.user_name ? req.body.user_name : ""
    const user_icon = req.body.user_icon ? req.body.user_icon : ""
    
    const query = async (sql) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err) => {
                if (err) {
                    res.status(500).send(err)
                    return reject()
                } else {
                    res.json({message: "新規ユーザーの登録に成功しました。"})
                    return resolve()
                }
            })
        })
    }
    await query(`INSERT INTO users (name) VALUES ("${user_name}")`)
})


app.listen(3000, function(req, res) {
  console.log("server is running on part 3000.");
});
