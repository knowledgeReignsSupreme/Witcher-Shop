const { OAuth2Client } = require('google-auth-library');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { sendTokenResponse } = require('./helpers');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  res.status(200).json({ success: true });
});

// desc     Log user
// route    POST /api/v1/users/login
// access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password'), 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new ErrorResponse('Invalid credentials. Please try again'),
      401
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      new ErrorResponse('Invalid credentials. Please try again'),
      401
    );
  }

  sendTokenResponse(user, 200, res);
});

// desc     Log user via google
// route    POST /api/v1/users/googlelogin
// access   Public
exports.googleLogin = asyncHandler(async (req, res, next) => {
  const tokenId = req.body.tokenId;

  const googleResponse = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  if (googleResponse.payload.email_verified) {
    const user = await User.findOne({ email: googleResponse.payload.email });

    if (user) {
      sendTokenResponse(user, 200, res);
    } else {
      const password = googleResponse.payload.email + process.env.JWT_SECRET;
      const newUser = await User.create({
        name: googleResponse.payload.name,
        email: googleResponse.payload.email,
        password,
      });

      const user = await User.findById(newUser._id);
      //This was made in order to avoid sending the password in the response
      sendTokenResponse(user, 200, res);
    }
  } else {
    return next(new ErrorResponse('Your google account is not verified', 400));
  }
});

// desc     Log user out / clear cookie
// route    POST /api/v1/auth/logout
// access   Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});
