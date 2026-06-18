const mongoose = require("mongoose");

const connectDB = async () => {
  const options = {
    maxPoolSize: 10,
    minPoolSize: 2,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 10000,
  };

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error(
      "MongoDB Connection Error: MONGO_URI environment variable is missing.",
    );
    throw new Error("MONGO_URI is not defined");
  }

  try {
    // Clean modern connection block
    await mongoose.connect(uri, options);
    console.log("MongoDB Atlas connected successfully.");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
