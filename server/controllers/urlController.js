const Url = require('../models/Url');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const generateShortCode = require('../utils/generateShortCode');
const normalizeUrl = require('../utils/normalizeUrl');
const QRCode = require('qrcode');

/**
 * @desc    Create a shortened URL
 * @route   POST /api/shorten
 * @access  Public
 */
const shortenUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const normalized = normalizeUrl(url);

  // Check if this URL was already shortened
  const existing = await Url.findOne({ originalUrl: normalized });
  if (existing) {
    return res.status(200).json({
      status: 'success',
      data: {
        originalUrl: existing.originalUrl,
        shortCode: existing.shortCode,
        shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`,
        createdAt: existing.createdAt,
        clicks: existing.clicks,
      },
    });
  }

  // Generate a unique short code and create the record
  const shortCode = await generateShortCode();
  const newUrl = await Url.create({ originalUrl: normalized, shortCode });

  res.status(201).json({
    status: 'success',
    data: {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
      createdAt: newUrl.createdAt,
      clicks: newUrl.clicks,
    },
  });
});

/**
 * @desc    Redirect to original URL by short code
 * @route   GET /:shortCode
 * @access  Public
 */
const redirectUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  // Atomically increment clicks and set lastAccessed
  const urlDoc = await Url.findOneAndUpdate(
    { shortCode },
    {
      $inc: { clicks: 1 },
      $set: { lastAccessed: new Date() },
    },
    { new: true }
  );

  if (!urlDoc) {
    throw new AppError('Short URL not found', 404);
  }

  res.redirect(302, urlDoc.originalUrl);
});

/**
 * @desc    Get analytics/stats for a short URL
 * @route   GET /api/stats/:shortCode
 * @access  Public
 */
const getUrlStats = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const urlDoc = await Url.findOne({ shortCode }).lean();

  if (!urlDoc) {
    throw new AppError('Short URL not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      originalUrl: urlDoc.originalUrl,
      shortCode: urlDoc.shortCode,
      shortUrl: `${process.env.BASE_URL}/${urlDoc.shortCode}`,
      clicks: urlDoc.clicks,
      lastAccessed: urlDoc.lastAccessed,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    },
  });
});

/**
 * @desc    Generate a QR code for a short URL
 * @route   GET /api/qr/:shortCode
 * @access  Public
 */
const getQrCode = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const urlDoc = await Url.findOne({ shortCode }).lean();

  if (!urlDoc) {
    throw new AppError('Short URL not found', 404);
  }

  const shortUrl = `${process.env.BASE_URL}/${urlDoc.shortCode}`;
  const qrCodeDataUrl = await QRCode.toDataURL(shortUrl, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      shortUrl,
      qrCode: qrCodeDataUrl,
    },
  });
});

module.exports = { shortenUrl, redirectUrl, getUrlStats, getQrCode };
