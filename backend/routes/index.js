const express = require("express");

const router = express.Router();

const userRoutes = require("./authRoutes");
const itemsRoutes = require("./itemsRoutes");

router.use("/auth", userRoutes);
router.use("/items", itemsRoutes);

module.exports = router;
