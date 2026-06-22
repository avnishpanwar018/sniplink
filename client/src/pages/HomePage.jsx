import { useState } from 'react';
import toast from 'react-hot-toast';
import { Zap, Shield, BarChart3, QrCode as QrCodeIcon } from 'lucide-react';
import UrlForm from '../components/UrlForm';
import ResultCard from '../components/ResultCard';
import { useShortenUrl } from '../hooks/useShortenUrl';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate short links in milliseconds with our optimized backend.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with rate limiting and input validation.',
  },
  {
    icon: BarChart3,
    title: 'Click Analytics',
    description: 'Track every click with real-time analytics and insights.',
  },
  {
    icon: QrCodeIcon,
    title: 'QR Codes',
    description: 'Auto-generate QR codes for easy mobile sharing.',
  },
];

export default function HomePage() {
  const { shortenUrl, result, isLoading, error, reset } = useShortenUrl();

  const handleSubmit = async (url) => {
    try {
      await shortenUrl(url);
      toast.success('URL shortened successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="relative">
      {/* ── Hero Section ─────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]
                          bg-gradient-to-br from-primary-400/20 via-accent-400/10 to-transparent
                          rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px]
                          bg-gradient-to-tl from-accent-400/10 to-transparent
                          rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">



          {/* Heading */}
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight
                         animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}>
            Shorten your links,
            <br />
            <span className="gradient-text">amplify your reach</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-center text-lg sm:text-xl text-slate-600 dark:text-slate-400
                        max-w-2xl mx-auto animate-fade-in-up"
             style={{ animationDelay: '0.2s' }}>
            Transform long, ugly URLs into clean, trackable short links.
            Get analytics, QR codes, and more — all for free.
          </p>

          {/* URL Form */}
          <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <UrlForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Error display */}
          {error && !isLoading && (
            <div className="mt-4 text-center">
              <p className="text-sm text-red-500 animate-fade-in-up">{error}</p>
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="mt-8">
              <ResultCard data={result} />
            </div>
          )}
        </div>
      </section>

      {/* ── Features Section ─────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Everything you need
        </h2>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-lg mx-auto">
          Powerful features to help you manage and track your links effectively.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card group hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30 w-fit mb-4
                            group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
