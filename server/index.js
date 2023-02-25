const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "strongpassword123",
  database: "auth",
});

app.get("/users", (req, res) => {
  const sqlUsers = "SELECT * FROM user";
  db.query(sqlUsers, (err, result) => {
    if (err) {
      res.end("something went wrong");
    } else {
      res.send(result.map((item) => item));
    }
  });
});

app.post("/register", (req, res) => {
  let { password, username } = req.body;

  username = username.toLowerCase();

  const sqlUsers = "SELECT * FROM user WHERE username = ?";
  const sqlUsersInsert = "INSERT INTO user (username, password) VALUES (?, ?)";

  db.query(sqlUsers, [username], (err, result) => {
    if (result.length > 0) {
      res.end("username already taken");
    } else {
      // register it
      bcrypt.hash(password, 10).then((hash) => {
        db.query(sqlUsersInsert, [username, hash], (err, result) => {
          if (!err) {
            res.end("successfully created");
          } else {
            res.end(hash);
          }
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  let { password, username } = req.body;

  username = username.toLowerCase();

  const sqlUsers = "SELECT * FROM user WHERE username = ?";

  db.query(sqlUsers, [username], (err, result) => {
    if ((result.length = 1)) {
      bcrypt.compare(password, result[0].password).then((match) => {
        if (match) {
          res.end("correct password");
        } else {
          res.end("incorrect password");
        }
      });
    } else {
      // register it
      res.end("user does not exist");
    }
  });
});

app.listen(5000, () => {
  console.log("LISTENING ON PORT 5000");
});
