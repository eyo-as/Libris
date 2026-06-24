const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../services/itemService");
const AppError = require("../utils/appError");
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
  const userId = req.user.id;
  const itemId = req.params.id;

  const newItem = await updateItem(itemId, userId, req.body);

  if (!newItem) {
    return next(new AppError("Item not found or unauthorized", 404));
  }

  res.status(200).json({
    status: "success",
    newItem,
  });
});

const deleteItemController = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const itemId = req.params.id;

  const item = await deleteItem(itemId, userId);

  if (!item) {
    return next(new AppError("Item not found or unauthorized", 404));
  }

  res.status(204).send();
});

module.exports = {
  createItemController,
  getItemsController,
  updateItemController,
  deleteItemController,
};
