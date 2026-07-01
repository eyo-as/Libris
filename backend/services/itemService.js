const ReadingItem = require("../models/ReadingItem");
const AppError = require("../utils/appError");

const createItem = async (itemData) => {
  if (!itemData.title) {
    throw new AppError("Title is required.", 400);
  }

  const newItem = await ReadingItem.create(itemData);
  return newItem;
};

const getItems = async (userId) => {
  if (!userId) {
    throw new AppError("User ID is required to fetch items.", 400);
  }

  return ReadingItem.find({ userId }).sort("-createdAt");
};

const getItemById = async (itemId, userId) => {
  if (!itemId || !userId) {
    throw new AppError("Item ID and user ID are required.", 400);
  }

  const item = await ReadingItem.findOne({ _id: itemId, userId });

  if (!item) {
    throw new AppError("Item not found or unauthorized.", 404);
  }

  return item;
};

const updateItem = async (itemId, userId, itemData) => {
  if (!itemId || !userId) {
    throw new AppError("Item ID and user ID are required.", 400);
  }

  return ReadingItem.findOneAndUpdate({ _id: itemId, userId }, itemData, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteItem = async (itemId, userId) => {
  const deletedItem = await ReadingItem.findOneAndDelete({
    _id: itemId,
    userId: userId,
  });

  return deletedItem;
};

module.exports = { createItem, getItems, getItemById, updateItem, deleteItem };
