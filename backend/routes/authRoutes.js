const express = require("express");
const router = express.Router();

// TODO: implement auth controllers
router.post("/register", (req, res) => {
  res.status(501).json({ message: "Register route not implemented yet" });
});

router.post("/login", (req, res) => {
  res.status(501).json({ message: "Login route not implemented yet" });
});

module.exports = router;
