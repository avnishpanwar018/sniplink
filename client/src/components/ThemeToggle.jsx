import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-white/10
                 hover:bg-slate-200 dark:hover:bg-white/15
                 transition-all duration-300 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun
        className={`w-5 h-5 text-amber-500 transition-all duration-300
                    ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
        style={{ position: isDark ? 'absolute' : 'relative', inset: isDark ? '10px' : undefined }}
      />
      <Moon
        className={`w-5 h-5 text-indigo-300 transition-all duration-300
                    ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}
        style={{ position: !isDark ? 'absolute' : 'relative', inset: !isDark ? '10px' : undefined }}
      />
    </button>
  );
}
