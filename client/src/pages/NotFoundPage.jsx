import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-8xl sm:text-9xl font-extrabold gradient-text mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
