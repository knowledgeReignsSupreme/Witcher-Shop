const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');
const { getProducts, getProduct } = require('../controllers/products');

// /api/v1/products
router.route('/').get(advancedResults(Product), getProducts);
router.route('/:id').get(getProduct);

module.exports = router;
