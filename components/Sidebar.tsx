'use client';

import React, { useState } from 'react';
import { MAIN_COMMANDS, EASTER_EGG_COMMANDS } from '@/lib/commands';

interface SidebarProps {
  onCommandClick: (command: string) => void;
}

export default function Sidebar({ onCommandClick }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside className="w-full bg-bg-secondary rounded-xl border border-bg-tertiary shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(230,57,70,0.05)] h-fit xl:sticky xl:top-8 overflow-hidden">
      {/* Title Bar */}
      <div 
        className="flex items-center justify-between px-3 py-2 bg-bg-titlebar border-b border-bg-tertiary select-none cursor-pointer xl:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-btn-close opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-btn-minimize opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-btn-maximize opacity-80" />
        </div>
        <div className="text-xs text-text-muted font-medium tracking-wide">
          commands — menu
        </div>
        {/* Mobile expand indicator */}
        <div className="w-[40px] flex justify-end xl:hidden">
          <svg 
            className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="w-[40px] hidden xl:block" />
      </div>

      {/* Mobile: Horizontal scrollable commands (collapsed state) */}
      <div className={`xl:hidden ${isExpanded ? 'hidden' : 'block'}`}>
        <div className="p-3 overflow-x-auto">
          <div className="flex gap-2 pb-1">
            {MAIN_COMMANDS.map((command) => (
              <button
                key={command}
                onClick={() => onCommandClick(command)}
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs text-text-secondary bg-bg-tertiary/50 border border-bg-tertiary hover:border-accent hover:text-accent transition-all duration-150 whitespace-nowrap"
              >
                <span className="text-accent mr-1">&gt;</span>
                {command}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Full content / Mobile: Expanded content */}
      <div className={`xl:block ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="p-4 xl:p-5">
          <div className="mb-4 xl:mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2 xl:mb-3">
              Commands
            </h2>
            {/* Mobile: Grid layout */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:hidden">
              {MAIN_COMMANDS.map((command) => (
                <button
                  key={command}
                  onClick={() => onCommandClick(command)}
                  className="px-2 py-1.5 rounded text-xs text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all duration-150 text-left truncate"
                >
                  <span className="text-accent mr-1">&gt;</span>
                  {command}
                </button>
              ))}
            </div>
            {/* Desktop: List layout */}
            <ul className="space-y-1 hidden xl:block">
              {MAIN_COMMANDS.map((command) => (
                <CommandItem 
                  key={command} 
                  command={command} 
                  onClick={() => onCommandClick(command)}
                />
              ))}
            </ul>
          </div>

          <div className="h-px bg-bg-tertiary my-4 xl:my-5" />

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2 xl:mb-3">
              Easter Eggs
            </h2>
            {/* Mobile: Grid layout */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 xl:hidden">
              {EASTER_EGG_COMMANDS.map((command) => (
                <button
                  key={command}
                  onClick={() => onCommandClick(command)}
                  className="px-2 py-1.5 rounded text-xs text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all duration-150 text-left truncate"
                >
                  <span className="text-accent mr-1">&gt;</span>
                  {command}
                </button>
              ))}
            </div>
            {/* Desktop: List layout */}
            <ul className="space-y-1 hidden xl:block">
              {EASTER_EGG_COMMANDS.map((command) => (
                <CommandItem 
                  key={command} 
                  command={command} 
                  onClick={() => onCommandClick(command)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface CommandItemProps {
  command: string;
  onClick: () => void;
}

function CommandItem({ command, onClick }: CommandItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 rounded text-sm text-text-secondary hover:bg-bg-tertiary hover:text-accent transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-secondary active:scale-[0.98]"
      >
        <span className="text-accent mr-1">&gt;</span>
        {command}
      </button>
    </li>
  );
}
