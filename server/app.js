const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const urlRoutes = require('./routes/urlRoutes');
const { redirectUrl } = require('./controllers/urlController');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

// ──────────────────────────────────────────────
//  Security Middleware
// ──────────────────────────────────────────────

// Set security HTTP headers
app.use(helmet());

// Enable CORS for the frontend client
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Parse JSON bodies with a size limit to prevent abuse
app.use(express.json({ limit: '10kb' }));

// Sanitize request data against NoSQL injection
app.use(mongoSanitize());

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many requests. Please try again later.',
  },
});
app.use(limiter);

// ──────────────────────────────────────────────
//  Routes
// ──────────────────────────────────────────────

// API routes (must come before the catch-all redirect)
app.use('/api', urlRoutes);

// Redirect route — must be after /api to avoid conflicts
app.get('/:shortCode', redirectUrl);

// ──────────────────────────────────────────────
//  Error Handling
// ──────────────────────────────────────────────

// Handle 404 for unmatched routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.method} ${req.originalUrl}`, 404));
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
