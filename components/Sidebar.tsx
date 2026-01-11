'use client';

import React from 'react';
import { MAIN_COMMANDS, EASTER_EGG_COMMANDS } from '@/lib/commands';

interface SidebarProps {
  onCommandClick: (command: string) => void;
}

export default function Sidebar({ onCommandClick }: SidebarProps) {
  return (
    <aside className="w-full bg-bg-secondary rounded-xl border border-bg-tertiary shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(230,57,70,0.05)] h-fit sticky top-8 overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-bg-titlebar border-b border-bg-tertiary select-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-btn-close opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-btn-minimize opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-btn-maximize opacity-80" />
        </div>
        <div className="text-xs text-text-muted font-medium tracking-wide">
          commands — menu
        </div>
        <div className="w-[40px]" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
            Commands
          </h2>
          <ul className="space-y-1">
            {MAIN_COMMANDS.map((command) => (
              <CommandItem 
                key={command} 
                command={command} 
                onClick={() => onCommandClick(command)}
              />
            ))}
          </ul>
        </div>

        <div className="h-px bg-bg-tertiary my-5" />

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
            Easter Eggs
          </h2>
          <ul className="space-y-1">
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
