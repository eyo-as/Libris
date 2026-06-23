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

module.exports = { createItem, getItems };
