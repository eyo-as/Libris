const { createUser, authenticateUser } = require("../services/authService");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { signToken } = require("../utils/tokenUtils");

const createTokenResponse = (user) => ({
  token: signToken({ id: user._id, email: user.email }),
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
  },
});

const register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await createUser({ username, email, password });

  res.status(201).json({
    status: "success",
    ...createTokenResponse(user),
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authenticateUser({ email, password });

  res.status(200).json({
    status: "success",
    ...createTokenResponse(user),
  });
});

module.exports = { register, login };
