'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Footer from '@/components/Footer';

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col modern-bg">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise-overlay" />

      {/* Content */}
      <div className="content-wrapper min-h-screen flex flex-col">
        {/* Main content - centered */}
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          {/* Terminal Window */}
          <div className="w-full max-w-3xl bg-bg-secondary rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(230,57,70,0.1)] border border-bg-tertiary">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-titlebar border-b border-bg-tertiary select-none">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-btn-close hover:brightness-125 transition-all cursor-pointer" />
                <span className="w-3 h-3 rounded-full bg-btn-minimize hover:brightness-125 transition-all cursor-pointer" />
                <span className="w-3 h-3 rounded-full bg-btn-maximize hover:brightness-125 transition-all cursor-pointer" />
              </div>
              <div className="text-sm text-text-secondary font-medium">
                error — zsh
              </div>
              <div className="w-[52px]" />
            </div>

            {/* Terminal Content */}
            <div className="p-8 text-sm leading-relaxed">
              {/* Command that caused the error */}
              <div className="flex items-center gap-2 mb-6">
                <Prompt />
                <span className="text-text-primary">cd {pathname}</span>
              </div>

              {/* ASCII 404 */}
              <pre className="text-accent text-sm leading-tight mb-6">
{` _  _    ___  _  _   
| || |  / _ \\| || |  
| || |_| | | | || |_ 
|__   _| | | |__   _|
   | | | |_| |  | |  
   |_|  \\___/   |_|  `}
              </pre>

              {/* Error output */}
              <div className="mb-8">
                <div className="text-accent mb-3">
                  bash: cd: {pathname}: No such file or directory
                </div>
                <div className="text-text-muted">
                  The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </div>
              </div>

              {/* Action prompt */}
              <div className="flex items-center gap-2">
                <Prompt />
                <Link 
                  href="/"
                  className="text-accent hover:text-accent-hover transition-colors underline underline-offset-4 decoration-accent/50 hover:decoration-accent"
                >
                  cd ~
                </Link>
                <span className="text-accent cursor-blink">_</span>
              </div>
            </div>
          </div>

          {/* Keyboard hint */}
          <p className="mt-8 text-text-muted text-sm">
            Press{' '}
            <kbd className="px-2 py-1 bg-bg-tertiary rounded border border-bg-tertiary text-text-secondary">
              Enter
            </kbd>{' '}
            or{' '}
            <Link href="/" className="text-accent hover:text-accent-hover transition-colors">
              click here
            </Link>{' '}
            to go home
          </p>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span className="flex-shrink-0">
      <span className="text-prompt-green font-semibold">visitor</span>
      <span className="text-text-secondary">@</span>
      <span className="text-prompt-cyan font-semibold">portfolio</span>
      <span className="text-text-secondary">:</span>
      <span className="text-prompt-yellow">~</span>
      <span className="text-text-primary ml-1">$</span>
    </span>
  );
}
