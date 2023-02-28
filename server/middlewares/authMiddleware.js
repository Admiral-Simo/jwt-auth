const jwt = require("jsonwebtoken");
const db = require("../connect");

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ message: "No token provided" });
  }

  const user = jwt.verify(authHeaders, "STRONGPASSWORD123");

  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  let fullUser = "";

  db.query(
    "SELECT * FROM user WHERE username = ?",
    [user.username],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      } else {
        req.user = result[0];

        next();
      }
    }
  );
};
