'use client';

import { useState, useCallback } from 'react';
import Terminal from '@/components/Terminal';
import Sidebar from '@/components/Sidebar';
import SkillsWidget from '@/components/SkillsWidget';

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
        <main className="flex-1 flex flex-col xl:flex-row xl:items-start gap-6 p-6 max-w-[1800px] mx-auto w-full">
          <div className="xl:flex-1 xl:min-w-0">
            <Sidebar onCommandClick={handleCommandClick} />
          </div>
          <section className="xl:flex-[2] xl:min-w-0">
            <Terminal 
              key={commandKey}
              externalCommand={externalCommand} 
              onCommandExecuted={handleCommandExecuted}
            />
          </section>
          <div className="hidden xl:block xl:flex-1 xl:min-w-0">
            <SkillsWidget />
          </div>
        </main>
      </div>
    </div>
  );
}
