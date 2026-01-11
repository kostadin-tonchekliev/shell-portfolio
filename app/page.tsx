'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Terminal from '@/components/Terminal';
import Sidebar from '@/components/Sidebar';
import SkillsWidget from '@/components/SkillsWidget';
import profileData from '@/data/profile.json';
import type { ProfileData } from '@/lib/types';

const profile = profileData as ProfileData;

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
        <header className="py-10 px-8 border-b border-bg-tertiary/50 backdrop-blur-sm bg-bg-secondary/30">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-accent shadow-[0_0_30px_rgba(230,57,70,0.3)]">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-prompt-green rounded-full border-2 border-bg-secondary" title="Available" />
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight mb-2">
                <span className="text-accent">&gt;</span> {profile.name}
                <span className="text-accent cursor-blink">_</span>
              </h1>
              <p className="text-text-primary text-lg mb-1">{profile.title}</p>
              <p className="text-text-secondary text-base">{profile.tagline}</p>
            </div>

            {/* Quick Links */}
            <div className="flex gap-4 flex-shrink-0">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-bg-tertiary/50 border border-bg-tertiary hover:border-accent hover:bg-accent/10 transition-all duration-200 flex items-center justify-center text-text-secondary hover:text-accent"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-bg-tertiary/50 border border-bg-tertiary hover:border-accent hover:bg-accent/10 transition-all duration-200 flex items-center justify-center text-text-secondary hover:text-accent"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={profile.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-bg-tertiary/50 border border-bg-tertiary hover:border-accent hover:bg-accent/10 transition-all duration-200 flex items-center justify-center text-text-secondary hover:text-accent"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 rounded-lg bg-bg-tertiary/50 border border-bg-tertiary hover:border-accent hover:bg-accent/10 transition-all duration-200 flex items-center justify-center text-text-secondary hover:text-accent"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
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
