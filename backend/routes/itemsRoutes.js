const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authenticateToken = require("../middleware/authMiddleware");

router.use(authenticateToken);
router
  .route("/")
  .post(itemController.createItemController)
  .get(itemController.getItemsController);
router.route("/:id").put(itemController.updateItemController);

module.exports = router;
