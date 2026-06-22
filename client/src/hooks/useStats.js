import { useState, useEffect } from 'react';
import { getStats, getQrCode } from '../services/api';

/**
 * Hook for fetching URL stats and QR code for a given short code.
 * Fetches on mount and when shortCode changes.
 */
export function useStats(shortCode) {
  const [stats, setStats] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortCode) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [statsData, qrData] = await Promise.all([
          getStats(shortCode),
          getQrCode(shortCode),
        ]);
        setStats(statsData);
        setQrCode(qrData.qrCode);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [shortCode]);

  return { stats, qrCode, isLoading, error };
}
