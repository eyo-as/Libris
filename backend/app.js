const express = require("express");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorHandler");

const apiRoutes = require("./routes");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", apiRoutes);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
