const db = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const data = require("../data");

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
      const hash = bcrypt.hashSync(password, 10);

      db.query(sqlUsersInsert, [username, hash], (err, result) => {
        if (!err) {
          const token = jwt.sign({ username: username }, "STRONGPASSWORD123");
          res.status(200).send({ msg: "successfully created", token: token });
        } else {
          res.status(401).end("something went wrong");
        }
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
      const match = bcrypt.compareSync(password, result[0].password);

      if (match) {
        // Todo make tokens with jwt
        const token = jwt.sign({ username: username }, "STRONGPASSWORD123");

        res.status(200).send({ msg: "correct password", token: token });
      } else {
        res.status(401).end("incorrect password");
      }
    } else {
      // register it
      res.status(404).end("user does not exist");
    }
  });
};

const ShouldStayConnected = (req, res) => {
  if (req.user) {
    res.status(200).send({ msg: "connected" });
  } else {
    res.status(401).send({ msg: "not connected" });
  }
};

const getRecipes = (req, res) => {
  if (req.user) {
    res.status(200).send(data);
  } else {
    res.status(401).send({ msg: "not connected" });
  }
};
module.exports = { getUsers, Register, Login, ShouldStayConnected, getRecipes };
