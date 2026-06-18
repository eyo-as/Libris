const AppError = require("../utils/appError");

// DB/Mongoose specific cleaners
const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

// Handles MongoDB Error 11000 (Duplicate Key)
const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  return new AppError(
    `Duplicate field value: "${value}". Please use another value!`,
    400,
  );
};

// Handles Mongoose schema validation failures
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

// Response formats based on environment
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Trusted operational error: send clear message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming, systemic, or unknown error: do not leak details to user
  console.error("💥 SYSTEM CRASH ERROR:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong on our end.",
  });
};

// Main middleware wrapper
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
    error.message = err.message;

    // Automatically clean native MongoDB / Mongoose errors
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
