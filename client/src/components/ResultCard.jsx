import { Link } from 'react-router-dom';
import { ExternalLink, BarChart3 } from 'lucide-react';
import CopyButton from './CopyButton';
import QrCode from './QrCode';

/**
 * Displays the result after a URL is successfully shortened.
 * Shows the short URL, copy button, QR code, and link to analytics.
 */
export default function ResultCard({ data }) {
  const { originalUrl, shortCode, shortUrl } = data;

  return (
    <div className="card animate-fade-in-up w-full max-w-2xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* URL Info Section */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Original URL */}
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Original URL
            </p>
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary-500
                         truncate block transition-colors"
            >
              {originalUrl}
              <ExternalLink className="w-3 h-3 inline ml-1 mb-0.5" />
            </a>
          </div>

          {/* Short URL */}
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Short URL
            </p>
            <div className="flex items-center gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold gradient-text hover:opacity-80 transition-opacity truncate"
              >
                {shortUrl}
              </a>
              <CopyButton text={shortUrl} />
            </div>
          </div>

          {/* Analytics Link */}
          <Link
            to={`/stats/${shortCode}`}
            className="btn-secondary inline-flex w-auto"
          >
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Link>
        </div>

        {/* QR Code Section */}
        <div className="flex justify-center lg:justify-end">
          <QrCode url={shortUrl} size={140} />
        </div>
      </div>
    </div>
  );
}
