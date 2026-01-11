'use client';

import React from 'react';
import { MAIN_COMMANDS, EASTER_EGG_COMMANDS } from '@/lib/commands';

interface SidebarProps {
  onCommandClick: (command: string) => void;
}

export default function Sidebar({ onCommandClick }: SidebarProps) {
  return (
    <aside className="w-[200px] flex-shrink-0 p-6 bg-bg-secondary rounded-xl border border-bg-tertiary h-fit sticky top-8">
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
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

      <div className="h-px bg-bg-tertiary my-6" />

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
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
