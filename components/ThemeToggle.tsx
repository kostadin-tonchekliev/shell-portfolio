'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Render a placeholder with the same dimensions to prevent layout shift
  if (!mounted) {
    return (
      <div className="w-14 h-9 sm:w-16 sm:h-10 rounded-full bg-bg-tertiary/50 border border-bg-tertiary self-center" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-9 sm:w-16 sm:h-10 rounded-full bg-bg-tertiary/50 border border-bg-tertiary hover:border-accent transition-all duration-300 flex items-center self-center"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sliding knob with icon */}
      <span 
        className={`absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent shadow-md transition-all duration-300 flex items-center justify-center ${
          theme === 'dark' 
            ? 'translate-x-[26px] sm:translate-x-[30px]' 
            : 'translate-x-[2px] sm:translate-x-[2px]'
        }`}
      >
        {theme === 'dark' ? (
          // Sun icon when dark mode is on
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon icon when light mode is on
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </span>
    </button>
  );
}
