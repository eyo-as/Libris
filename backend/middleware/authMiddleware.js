const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/tokenUtils");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return next(new AppError("Access denied. No token provided.", 401));
  }

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.id || payload._id, email: payload.email };
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token.", 401));
  }
};

module.exports = authenticateToken;
