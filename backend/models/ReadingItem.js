const mongoose = require("mongoose");

const ReadingItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    author: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["want to read", "reading", "completed"],
      default: "want to read",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const ReadingItem = mongoose.model("ReadingItem", ReadingItemSchema);
module.exports = ReadingItem;
