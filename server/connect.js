const mysql = require("mysql");

module.exports = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "strongpassword123",
  database: "auth",
});
