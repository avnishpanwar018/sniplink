import { useParams, Link } from 'react-router-dom';
import {
  MousePointerClick,
  Calendar,
  Clock,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { useStats } from '../hooks/useStats';
import StatsCard from '../components/StatsCard';
import CopyButton from '../components/CopyButton';
import QrCode from '../components/QrCode';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Formats a date string into a human-readable format.
 */
function formatDate(dateString) {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function StatsPage() {
  const { shortCode } = useParams();
  const { stats, qrCode, isLoading, error } = useStats(shortCode);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-slate-500 dark:text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            URL Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <Link to="/" className="btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400
                   hover:text-primary-500 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
          Link Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Detailed statistics for your shortened URL.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in-up"
           style={{ animationDelay: '0.1s' }}>
        <StatsCard
          icon={MousePointerClick}
          label="Total Clicks"
          value={stats.clicks.toLocaleString()}
        />
        <StatsCard
          icon={Calendar}
          label="Created"
          value={formatDate(stats.createdAt)}
          className="text-base"
        />
        <StatsCard
          icon={Clock}
          label="Last Accessed"
          value={formatDate(stats.lastAccessed)}
          className="text-base"
        />
      </div>

      {/* URL Details + QR Code */}
      <div className="card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* URL Details */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Short URL */}
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Short URL
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={stats.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold gradient-text hover:opacity-80 transition-opacity"
                >
                  {stats.shortUrl}
                </a>
                <CopyButton text={stats.shortUrl} />
              </div>
            </div>

            {/* Original URL */}
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Original URL
              </p>
              <a
                href={stats.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-primary-500
                           transition-colors break-all"
              >
                {stats.originalUrl}
                <ExternalLink className="w-3.5 h-3.5 inline ml-1.5 mb-0.5" />
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center lg:justify-end shrink-0">
            <QrCode url={stats.shortUrl} size={160} />
          </div>
        </div>
      </div>
    </div>
  );
}
