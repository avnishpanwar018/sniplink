const validator = require('validator');
const AppError = require('../utils/AppError');

/**
 * Middleware to validate and sanitize the incoming URL before processing.
 * Checks for empty input, excessively long URLs, and invalid URL format.
 */
const validateUrl = (req, res, next) => {
  let { url } = req.body;

  // Check for missing or empty URL
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    return next(new AppError('Please provide a URL', 400));
  }

  url = url.trim();

  // Reject excessively long URLs
  if (url.length > 2048) {
    return next(new AppError('URL must not exceed 2048 characters', 400));
  }

  // Prepend protocol if missing so validator can check it
  let urlToValidate = url;
  if (!/^https?:\/\//i.test(urlToValidate)) {
    urlToValidate = `https://${urlToValidate}`;
  }

  // Validate URL format
  const isValid = validator.isURL(urlToValidate, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    require_tld: true,
  });

  if (!isValid) {
    return next(new AppError('Please provide a valid URL', 400));
  }

  // Store the cleaned URL back on the request
  req.body.url = url;
  next();
};

module.exports = validateUrl;
