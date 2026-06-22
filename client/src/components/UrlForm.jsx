import { useState } from 'react';
import { Link2 } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function UrlForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError('Please enter a URL');
      return;
    }

    // Basic client-side check (server does full validation)
    if (trimmed.length > 2048) {
      setValidationError('URL is too long (max 2048 characters)');
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Link2 className="w-5 h-5 text-slate-400" />
          </div>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder="Paste your long URL here..."
            className="input-field"
            style={{ paddingLeft: '3rem' }}
            disabled={isLoading}
            autoComplete="url"
            aria-label="URL to shorten"
            aria-invalid={!!validationError}
            aria-describedby={validationError ? 'url-error' : undefined}
          />
        </div>
        <button
          id="shorten-button"
          type="submit"
          className="btn-primary whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Shortening...
            </>
          ) : (
            'Shorten URL'
          )}
        </button>
      </div>
      {validationError && (
        <p id="url-error" className="mt-2 text-sm text-red-500 animate-fade-in-up">
          {validationError}
        </p>
      )}
    </form>
  );
}
