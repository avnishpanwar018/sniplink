/**
 * A stat display card with an icon, label, and value.
 * Used on the analytics page to show key metrics.
 */
export default function StatsCard({ icon: Icon, label, value, className = '' }) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/30">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}
