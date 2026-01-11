'use client';

import { useState, useCallback } from 'react';
import Terminal from '@/components/Terminal';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [externalCommand, setExternalCommand] = useState<string | undefined>();
  const [commandKey, setCommandKey] = useState(0);

  const handleCommandClick = useCallback((command: string) => {
    setExternalCommand(command);
    setCommandKey(prev => prev + 1);
  }, []);

  const handleCommandExecuted = useCallback(() => {
    setExternalCommand(undefined);
  }, []);

  return (
    <div className="min-h-screen flex flex-col modern-bg">
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="noise-overlay" />

      {/* Content */}
      <div className="content-wrapper min-h-screen flex flex-col">
        {/* Banner */}
        <header className="py-12 px-8 text-center border-b border-bg-tertiary/50 backdrop-blur-sm bg-bg-secondary/30">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-3">
            <span className="text-accent">&gt;</span> Welcome to my portfolio website
            <span className="text-accent cursor-blink">_</span>
          </h1>
          <p className="text-text-secondary text-base">
            DevOps Engineer | Cloud Architect | Automation Enthusiast
          </p>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row gap-8 p-8 max-w-[1400px] mx-auto w-full">
          <Sidebar onCommandClick={handleCommandClick} />
          <section className="flex-1 flex items-start">
            <Terminal 
              key={commandKey}
              externalCommand={externalCommand} 
              onCommandExecuted={handleCommandExecuted}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
