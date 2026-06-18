class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    // Sets status to 'fail' for 4xx errors, and 'error' for 5xx errors
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // Marks the error as handled/operational
    this.isOperational = true;

    // Capture the clean stack trace, keeping the constructor out of it
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
