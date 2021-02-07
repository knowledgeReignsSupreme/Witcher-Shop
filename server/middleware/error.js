const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (error, req, res, next) => {
  let err = { ...error };

  err.message = error.message;

  console.log(error);

  if (error.name === 'CastError') {
    const message = `Resource not found with id of ${error.value}`;
    err = new ErrorResponse(message, 404);
  }

  //Duplicate key
  if (error.code === 11000) {
    const message = `Duplicate field value entered`;
    err = new ErrorResponse(message, 400);
  }

  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((value) => value.message);
    err = new ErrorResponse(message, 400);
  }

  if (error.name === 'TypeError' && process.env.NODE_ENV !== 'development') {
    const message = `Server error`;
    err = new ErrorResponse(message, 500);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, err: err.message || 'Server Error' });
};

module.exports = errorHandler;
