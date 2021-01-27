const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');

// desc     Get all products
// route    GET /api/v1/products
// access   Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  const numberOfProducts = await Product.countDocuments();

  res.status(200).json(res.advancedResults);
});

// desc     Get single product
// route    POST /api/v1/products/:id
// access   Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    new ErrorResponse(`Product not found with the id of ${req.params.id}`, 404);
  }

  res.status(200).json({ success: true, data: product });
});

// desc     Get single product
// route    GET /api/v1/products/top
// access   Public
exports.getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json({ success: true, data: res.advancedResults });
});
