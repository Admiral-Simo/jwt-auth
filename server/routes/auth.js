const express = require("express");
const {
  Login,
  Register,
  getUsers,
  ShouldStayConnected,
  getRecipes
} = require("../controllers/auth");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", getUsers);

router.post("/register", Register);

router.post("/login", Login);

router.get("/connected", authMiddleware, ShouldStayConnected);

router.get("/recipe", authMiddleware, getRecipes);

module.exports = router;
