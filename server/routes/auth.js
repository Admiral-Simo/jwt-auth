const express = require("express");
const { Login, Register, getUsers, Test } = require("../controllers/auth");

const router = express.Router();

router.post("/users", getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/test", Test);

module.exports = router;
