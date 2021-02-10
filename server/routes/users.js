const express = require('express');
const {
  register,
  login,
  googleLogin,
  logout,
  getProfile,
} = require('../controllers/users');

const { protect } = require('../middleware/auth');
const router = express.Router();
// /api/v1/users
const ordersRouter = require('./orders');
router.use('/:userId/orders', ordersRouter);

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/profile').get(protect, getProfile);
router.route('/googlelogin').post(googleLogin);

module.exports = router;
