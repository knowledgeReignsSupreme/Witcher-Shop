const express = require('express');
const { register, login, googleLogin } = require('../controllers/users');

const router = express.Router();
// /api/v1/users

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/googlelogin').post(googleLogin);

module.exports = router;
