const AppError = require('../utils/AppError');

/**
 * Global error-handling middleware.
 * Transforms various error types into a consistent JSON response.
 */
const errorHandler = (err, req, res, _next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let status = err.status || 'error';

  // Mongoose validation error (e.g., required fields, maxlength)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    status = 'fail';
    const messages = Object.values(err.errors).map((e) => e.message);
    message = messages.join('. ');
  }

  // Mongoose cast error (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    status = 'fail';
    message = `Invalid value for ${err.path}: ${err.value}`;
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    status = 'fail';
    const field = Object.keys(err.keyValue).join(', ');
    message = `Duplicate value for: ${field}`;
  }

  // Log server errors for debugging
  if (statusCode >= 500) {
    console.error('❌ Server Error:', err);
  }

  res.status(statusCode).json({
    status,
    message:
      process.env.NODE_ENV === 'production' && statusCode >= 500
        ? 'Something went wrong. Please try again later.'
        : message,
  });
};

module.exports = errorHandler;
