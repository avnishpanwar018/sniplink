# ✂️ Sniplink — URL Shortener

A modern, full-stack URL Shortener project built with **React**, **Tailwind CSS**, **Node.js**, **Express.js**, and **MongoDB**, currently configured for local development and testing.

Shorten links, track clicks, generate QR codes — all with a beautiful, modern SaaS-style UI.

---

## ✨ Features

- 🔗 **Shorten URLs** — Transform long URLs into clean, short links
- 📊 **Click Analytics** — Track total clicks, creation date, and last access time
- 📱 **QR Codes** — Auto-generated QR codes with download support
- 📋 **Copy to Clipboard** — One-click copy with visual feedback
- 🌙 **Dark Mode** — Toggle between light and dark themes (persisted)
- 📱 **Fully Responsive** — Works beautifully on all screen sizes
- 🔒 **Secure** — Helmet, CORS, rate limiting, input sanitization
- ⚡ **Fast** — Optimized with atomic database operations

---

## 🛠️ Tech Stack

| Layer     | Technology                             |
|-----------|----------------------------------------|
| Frontend  | React (Vite), Tailwind CSS v4          |
| Backend   | Node.js, Express.js                    |
| Database  | MongoDB, Mongoose                      |
| Security  | Helmet, CORS, express-rate-limit, express-mongo-sanitize |
| QR Codes  | qrcode.react (frontend), qrcode (backend) |

---

## 📁 Project Structure

```
url-shortener/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Layout.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── UrlForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── QrCode.jsx
│   │   │   ├── CopyButton.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── StatsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useShortenUrl.js
│   │   │   └── useStats.js
│   │   ├── services/           # API service layer
│   │   │   └── api.js
│   │   ├── context/            # React context providers
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Express backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── urlController.js    # Route handlers
│   ├── middleware/
│   │   ├── errorHandler.js     # Global error middleware
│   │   └── validateUrl.js      # URL validation middleware
│   ├── models/
│   │   └── Url.js              # Mongoose schema
│   ├── routes/
│   │   └── urlRoutes.js        # API routes
│   ├── utils/
│   │   ├── AppError.js         # Custom error class
│   │   ├── asyncHandler.js     # Async wrapper
│   │   ├── generateShortCode.js
│   │   └── normalizeUrl.js
│   ├── app.js                  # Express app config
│   ├── server.js               # Entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running on `localhost:27017`)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd url-shortener
```

### 2. Set Up the Server

```bash
cd server
cp .env.example .env    # Create your environment file
npm install             # Install dependencies
npm run dev             # Start the dev server (port 5000)
```

### 3. Set Up the Client

```bash
cd client
npm install             # Install dependencies
npm run dev             # Start the dev server (port 5173)
```

### 4. Open the App

Visit **http://localhost:5173** in your browser.

---

## ⚙️ Environment Variables

| Variable       | Default                                 | Description                     |
|----------------|------------------------------------------|---------------------------------|
| `PORT`         | `5000`                                  | Server port                     |
| `NODE_ENV`     | `development`                           | Environment mode                |
| `MONGODB_URI`  | `mongodb://localhost:27017/url-shortener`| MongoDB connection string       |
| `BASE_URL`     | `http://localhost:5000`                 | Base URL for generated links    |
| `CLIENT_URL`   | `http://localhost:5173`                 | Frontend URL (for CORS)         |

---

## 📡 API Documentation

### POST `/api/shorten`

Create a shortened URL.

**Request:**
```json
{
  "url": "https://example.com/very/long/path"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "originalUrl": "https://example.com/very/long/path",
    "shortCode": "aB3xK9p",
    "shortUrl": "http://localhost:5000/aB3xK9p",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "clicks": 0
  }
}
```

---

### GET `/:shortCode`

Redirects to the original URL. Increments click count atomically.

- **302 redirect** on success
- **404** if short code not found

---

### GET `/api/stats/:shortCode`

Get analytics for a shortened URL.

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "originalUrl": "https://example.com/very/long/path",
    "shortCode": "aB3xK9p",
    "shortUrl": "http://localhost:5000/aB3xK9p",
    "clicks": 42,
    "lastAccessed": "2024-01-16T14:22:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T14:22:00.000Z"
  }
}
```

---

### GET `/api/qr/:shortCode`

Generate a QR code for a shortened URL.

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "shortUrl": "http://localhost:5000/aB3xK9p",
    "qrCode": "data:image/png;base64,..."
  }
}
```

---

## 🔒 Security

| Feature                 | Implementation                            |
|-------------------------|-------------------------------------------|
| Security Headers        | `helmet` middleware                       |
| CORS                    | Restricted to client origin               |
| Rate Limiting           | 100 requests / 15 min per IP              |
| NoSQL Injection         | `express-mongo-sanitize`                  |
| Input Validation        | `validator` + custom middleware            |
| Body Size Limit         | `express.json({ limit: '10kb' })`         |
| Error Masking           | Stack traces hidden in production         |
| Environment Variables   | Secrets stored in `.env` (not committed)  |

---

## 🏗️ Architecture Decisions

- **Atomic click tracking** — Uses `findOneAndUpdate` with `$inc` to prevent race conditions
- **URL normalization** — Ensures duplicate URLs map to the same short code
- **nanoid** — Generates URL-safe, collision-resistant 7-character codes
- **Custom error classes** — `AppError` for operational vs programming errors
- **Async handler wrapper** — Eliminates try/catch boilerplate in route handlers
- **Vite proxy** — `/api` requests proxied to Express during development
- **Tailwind CSS v4** — CSS-first configuration with `@theme` directive

