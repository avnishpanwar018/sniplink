import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Normalize error responses into a consistent format
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  }
);

/**
 * Shorten a URL.
 * @param {string} url - The original URL to shorten.
 * @returns {Promise<Object>} The shortened URL data.
 */
export const shortenUrl = async (url) => {
  const { data } = await api.post('/shorten', { url });
  return data.data;
};

/**
 * Get stats for a short URL.
 * @param {string} shortCode - The short code to look up.
 * @returns {Promise<Object>} The stats data.
 */
export const getStats = async (shortCode) => {
  const { data } = await api.get(`/stats/${shortCode}`);
  return data.data;
};

/**
 * Get a QR code for a short URL.
 * @param {string} shortCode - The short code to generate a QR code for.
 * @returns {Promise<Object>} The QR code data (base64 image).
 */
export const getQrCode = async (shortCode) => {
  const { data } = await api.get(`/qr/${shortCode}`);
  return data.data;
};
