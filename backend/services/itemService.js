const ReadingItem = require("../models/ReadingItem");
const User = require("../models/User");
const AppError = require("../utils/appError");

const createItem = async (itemData) => {
  if (!itemData.title) {
    throw new AppError("Title is required.", 400);
  }

  const newItem = await ReadingItem.create(itemData);

  return newItem;
};

const getItems = async (userId) => {
  const items = await ReadingItem.find({ userId }).sort("-createdAt");

  if (!items) {
    throw new AppError("Items not found.", 401);
  }

  return items;
};

const updateItem = async (itemId, userId, itemData) => {
  const user = await ReadingItem.find({ userId });
  if (!user) {
    throw new AppError("User not found", 401);
  }

  const newItem = await ReadingItem.findByIdAndUpdate(itemId, itemData, {
    returnDocument: "after",
  });

  return itemData;
};

module.exports = { createItem, getItems, updateItem };
