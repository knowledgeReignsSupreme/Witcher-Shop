const Order = require('../models/Order');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// desc     Create new order
// route    post /api/v1/orders
// access   Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if ((orderItems && orderItems.length === 0) || !orderItems) {
    return next(new ErrorResponse('No items in this order'), 400);
  }

  const order = new Order({
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json({ success: true, data: createdOrder });
});

// desc     Get order
// route    get /api/v1/orders/:id
// access   Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  //We already get the order from the middleware
  res.status(201).json({ success: true, order: req.order });
});

// desc     Update order to paid
// route    get /api/v1/orders/:id/pay
// access   Private
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = req.order;

  order.isPaid = true;
  order.paidAt = Date.now();

  if (req.order.paymentMethod === 'PayPal') {
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address,
    };
  }

  const updatedOrder = await order.save();

  res.status(201).json({ success: true, order: updatedOrder });
});

// desc     Get order by user
// route    get /api/v1/users/:id/orders
// access   Private
exports.getOrderByUser = asyncHandler(async (req, res, next) => {
  const paidOrders = await Order.find({
    user: req.params.userId,
    isPaid: true,
  })
    .select('isPaid, isDelivered createdAt totalPrice')
    .sort('CreatedAt');

  const deliveredOrders = await Order.find({
    user: req.params.userId,
    isPaid: true,
    isDelivered: true,
  })
    .select('isPaid, isDelivered createdAt totalPrice deliveredAt')
    .sort('deliveredAt');

  const awaitingPaymentOrders = await Order.find({
    user: req.params.userId,
    isPaid: false,
  })
    .select('isPaid, isDelivered totalPrice createdAt')
    .sort('CreatedAt');

  const awaitingDeliveryOrders = await Order.find({
    user: req.params.userId,
    isPaid: true,
    isDelivered: false,
  })
    .select('isPaid, isDelivered totalPrice createdAt')
    .sort('CreatedAt');

  const data = {
    paidOrders,
    deliveredOrders,
    awaitingPaymentOrders,
    awaitingDeliveryOrders,
  };

  res.status(201).json({ success: true, data });
});
