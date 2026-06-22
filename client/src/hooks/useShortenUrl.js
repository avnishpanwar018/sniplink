import { useState } from 'react';
import { shortenUrl as shortenUrlApi } from '../services/api';

/**
 * Hook for shortening URLs.
 * Manages loading, result, and error state.
 */
export function useShortenUrl() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async (url) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await shortenUrlApi(url);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { shortenUrl, result, isLoading, error, reset };
}
