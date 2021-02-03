const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');
const {
  getProducts,
  getProduct,
  getRelatedProduct,
  getTopProducts,
} = require('../controllers/products');

// /api/v1/products
router.route('/').get(advancedResults(Product), getProducts);
router.route('/top').get(advancedResults(Product), getTopProducts);
router.route('/:id/related').get(getRelatedProduct);
router.route('/:id').get(getProduct);

module.exports = router;
