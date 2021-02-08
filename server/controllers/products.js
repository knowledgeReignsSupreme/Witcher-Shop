const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// desc     Get all products
// route    GET /api/v1/products
// access   Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  const numberOfProducts = await Product.countDocuments();

  res.status(200).json(res.advancedResults);
});

// desc     Get single product
// route    GET /api/v1/products/:id
// access   Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: product });
});

// desc     Get Related product
// route    GET /api/v1/products/:id/related
// access   Public
exports.getRelatedProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  const count =
    (await Product.countDocuments({ category: product.category })) - 3;
  const random = Math.floor(Math.random() * count);

  const relatedProducts = await Product.find({
    category: product.category,
    title: { $ne: product.title },
  })
    .skip(random)
    .limit(3)
    .select('rating title price image slug category countInStock');

  if (!relatedProducts) {
    return next(
      new ErrorResponse(`There was an error fetching related products`, 500)
    );
  }

  res.status(200).json({ success: true, data: relatedProducts });
});

// desc     Get single product
// route    GET /api/v1/products/top
// access   Public
exports.getTopProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ countInStock: { $gte: 1 } })
    .sort({ rating: -1 })
    .limit(3);

  if (!products) {
    return next(
      new ErrorResponse(`There was a problem fetching top products`, 500)
    );
  }
  res.status(200).json({ success: true, data: products });
});
