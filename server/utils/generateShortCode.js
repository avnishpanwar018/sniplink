const { nanoid } = require('nanoid');
const Url = require('../models/Url');

/**
 * Generates a unique 7-character short code.
 * Uses nanoid with a URL-safe alphabet. Retries on collision (extremely rare).
 */
const generateShortCode = async (length = 7) => {
  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const code = nanoid(length);
    const exists = await Url.findOne({ shortCode: code }).lean();

    if (!exists) {
      return code;
    }
  }

  // Extremely unlikely — nanoid with 7 chars has ~3.5 trillion combinations
  throw new Error('Failed to generate a unique short code. Please try again.');
};

module.exports = generateShortCode;
