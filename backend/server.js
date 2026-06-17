require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// enables CORS for every single route
const corsOptions = {
  origin: "*", // Until the proper backend
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const startServer = async () => {
  try {
    // Await database connection before listening for API traffic
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server securely running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Initialization failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
