const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { sendTokenResponse } = require('./helpers');
const User = require('../models/User');

// desc     Register user
// route    POST /api/v1/users/register
// access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const alreadyExist = await User.findOne({ email });

  if (alreadyExist) {
    return next(
      new ErrorResponse('A user with this email address already exits'),
      400
    );
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);

  res.status(200).json({ success: true, token });
});

// desc     Log user
// route    POST /api/v1/users/login
// access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password'), 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials'), 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials'), 401);
  }

  sendTokenResponse(user, 200, res);
});
