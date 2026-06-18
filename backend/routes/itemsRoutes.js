const express = require("express");
const router = express.Router();

// TODO: implement item CRUD controllers
router.get("/", (req, res) => {
  res.status(501).json({ message: "List items route not implemented yet" });
});

router.post("/", (req, res) => {
  res.status(501).json({ message: "Create item route not implemented yet" });
});

module.exports = router;
