const express = require('express');
const router = express.Router();
const {
  shortenUrl,
  getUrlStats,
  getQrCode,
} = require('../controllers/urlController');
const validateUrl = require('../middleware/validateUrl');

// POST /api/shorten — Create a shortened URL
router.post('/shorten', validateUrl, shortenUrl);

// GET /api/stats/:shortCode — Get analytics for a short URL
router.get('/stats/:shortCode', getUrlStats);

// GET /api/qr/:shortCode — Get QR code for a short URL
router.get('/qr/:shortCode', getQrCode);

module.exports = router;
