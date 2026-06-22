const User = require("../models/User");
const AppError = require("../utils/appError");

const createUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new AppError("username, email, and password are required.", 400);
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError("Email is already registered.", 409);
    }
    if (existingUser.username === username) {
      throw new AppError("Username is already taken.", 409);
    }
    throw new AppError("Email or Username is already registered.", 409);
  }

  const newUser = await User.create({
    username,
    email,
    passwordHash: password,
  });

  return newUser;
};

const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("email and password are required.", 400);
  }

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new AppError("Invalid credentials.", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials.", 401);
  }

  return user;
};

module.exports = {
  createUser,
  authenticateUser,
};
