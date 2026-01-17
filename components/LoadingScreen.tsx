'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500);
    } else {
      const handleLoad = () => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 500);
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Terminal-style loader */}
      <div className="flex flex-col items-center gap-6">
        {/* Animated terminal prompt */}
        <div className="text-lg sm:text-xl font-mono">
          <span className="text-prompt-green">visitor</span>
          <span className="text-text-secondary">@</span>
          <span className="text-prompt-cyan">portfolio</span>
          <span className="text-text-secondary">:</span>
          <span className="text-prompt-yellow">~</span>
          <span className="text-text-primary ml-1">$</span>
          <span className="text-text-primary ml-2">loading</span>
          <span className="loading-dots text-accent">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-1 bg-bg-tertiary rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
