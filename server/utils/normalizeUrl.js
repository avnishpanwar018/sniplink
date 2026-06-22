/**
 * Normalizes a URL for consistent storage and deduplication.
 * - Ensures a protocol is present (defaults to https://)
 * - Lowercases the protocol and hostname
 * - Removes default ports (80, 443)
 * - Removes trailing slashes from the path
 */
const normalizeUrl = (rawUrl) => {
  let url = rawUrl.trim();

  // Prepend https:// if no protocol is specified
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);

    // Lowercase protocol and hostname
    parsed.protocol = parsed.protocol.toLowerCase();
    parsed.hostname = parsed.hostname.toLowerCase();

    // Remove default ports
    if (
      (parsed.protocol === 'http:' && parsed.port === '80') ||
      (parsed.protocol === 'https:' && parsed.port === '443')
    ) {
      parsed.port = '';
    }

    // Remove trailing slash from pathname (but keep '/' for root)
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.replace(/\/+$/, '');
    }

    return parsed.toString();
  } catch {
    // If URL constructor fails, return the original (validation will catch it)
    return url;
  }
};

module.exports = normalizeUrl;
