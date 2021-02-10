const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Order = require('../models/Order');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.token) {
    console.log('E');
    token = req.cookies?.token;
  }

  if (!token) {
    return next(new ErrorResponse(`Not authorize to access this route`), 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse(`Not authorize to access this route`), 401);
  }
});

exports.isOrderMadeByUser = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new ErrorResponse('Order not found', 404));
  }

  if (order.user._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse('You are not allowed to view this order.', 401)
    );
  }

  req.order = order;
  next();
});
