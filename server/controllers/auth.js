const db = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  const sqlUsers = "SELECT * FROM user";
  db.query(sqlUsers, (err, result) => {
    if (err) {
      res.status(401).end("something went wrong");
    } else {
      res.status(200).send(result);
    }
  });
};

const Register = (req, res) => {
  let { password, username } = req.body;

  username = username.toLowerCase();

  const sqlUsers = "SELECT * FROM user WHERE username = ?";
  const sqlUsersInsert = "INSERT INTO user (username, password) VALUES (?, ?)";

  db.query(sqlUsers, [username], (err, result) => {
    if (result.length > 0) {
      res.status(401).end("username already taken");
    } else {
      // register it
      bcrypt.hash(password, 10).then((hash) => {
        db.query(sqlUsersInsert, [username, hash], (err, result) => {
          if (!err) {
            res.end("successfully created");
          } else {
            res.status(401).end("something went wrong");
          }
        });
      });
    }
  });
};

const Login = (req, res) => {
  let { password, username } = req.body;

  username = username.toLowerCase();

  const sqlUsers = "SELECT * FROM user WHERE username = ?";

  db.query(sqlUsers, [username], (err, result) => {
    if (result.length == 1) {
      bcrypt.compare(password, result[0].password).then((match) => {
        if (match) {
          // Todo make tokens with jwt
          res.cookie("token", "something....", {
            httpOnly: true,
          });
          res.status(200).end("correct password");
        } else {
          res.status(401).end("incorrect password");
        }
      });
    } else {
      // register it
      res.status(404).end("user does not exist");
    }
  });
};

const Test = (req, res) => {
  res.end("Test world");
};
module.exports = { getUsers, Register, Login, Test };
