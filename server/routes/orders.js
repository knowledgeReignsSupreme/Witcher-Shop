const express = require('express');
const {
  createOrder,
  getOrder,
  updateOrderToPaid,
  getOrderByUser,
} = require('../controllers/orders');
const { protect, isOrderMadeByUser } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });

// /api/v1/orders
router.route('/').post(protect, createOrder).get(protect, getOrderByUser);
router.route('/:id').get(protect, isOrderMadeByUser, getOrder);
router.route('/:id/pay').put(protect, isOrderMadeByUser, updateOrderToPaid);

module.exports = router;
