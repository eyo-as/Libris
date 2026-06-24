const { getUserById } = require("../services/authService");
const { getItems, createItem, updateItem } = require("../services/itemService");
const catchAsync = require("../utils/catchAsync");

const createItemController = catchAsync(async (req, res, next) => {
  const userId = req.user.id || req.user._id;
  const item = await createItem({
    userId,
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    item,
  });
});

const getItemsController = catchAsync(async (req, res, next) => {
  const userId = req.user.id || req.user._id;

  const items = await getItems(userId);

  res.status(200).json({
    status: "success",
    results: items.length,
    items,
  });
});

const updateItemController = catchAsync(async (req, res, next) => {
  const itemId = req.params.id;

  const newItem = await updateItem(itemId, req.body);

  res.status(200).json({
    status: "success",
    newItem,
  });
});

module.exports = {
  createItemController,
  getItemsController,
  updateItemController,
};
