'use client';

import React, { useState, useEffect } from 'react';
import skillsData from '@/data/skills.json';
import type { SkillsData } from '@/lib/types';

const skills = skillsData as SkillsData;

// Color mapping from JSON color names to CSS variable values
const colorVarMap: Record<string, string> = {
  'accent': 'var(--accent)',
  'prompt-green': 'var(--prompt-green)',
  'prompt-cyan': 'var(--prompt-cyan)',
  'prompt-yellow': 'var(--prompt-yellow)',
};

interface SkillsWidgetProps {
  compact?: boolean;
}

export default function SkillsWidget({ compact = false }: SkillsWidgetProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [uptime, setUptime] = useState('0:00:00');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = skills.categories;

  // Cycle through skills for the highlight effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length]);

  // Uptime counter
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      setUptime(
        `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  // Compact mobile version
  if (compact) {
    return (
      <div className="skills-widget w-full bg-bg-secondary rounded-xl overflow-hidden border border-bg-tertiary shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(230,57,70,0.05)]">
        {/* Title Bar - clickable to expand */}
        <div 
          className="flex items-center justify-between px-3 py-2 bg-bg-titlebar border-b border-bg-tertiary select-none cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-btn-close opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-btn-minimize opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-btn-maximize opacity-80" />
          </div>
          <div className="text-xs text-text-muted font-medium tracking-wide flex items-center gap-2">
            <span>skills — htop</span>
            <span className="text-accent font-mono">{totalSkills}</span>
          </div>
          <div className="w-[40px] flex justify-end">
            <svg 
              className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Collapsed: Horizontal scroll of skill categories */}
        {!isExpanded && (
          <div className="p-3 overflow-x-auto">
            <div className="flex gap-2">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex-shrink-0 px-3 py-2 rounded-lg border border-bg-tertiary/50 bg-bg-tertiary/20"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-xs">{category.icon}</span>
                    <span 
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: colorVarMap[category.color] || 'var(--accent)' }}
                    >
                      {category.shortName}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {category.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 text-[9px] rounded bg-bg-tertiary/60 text-text-secondary border border-bg-tertiary"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[9px] text-text-muted">
                        +{category.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expanded: Full grid view */}
        {isExpanded && (
          <div className="p-3 space-y-2 max-h-[300px] overflow-y-auto">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`skill-category p-2.5 rounded-lg border transition-all duration-500 ${
                  index === activeIndex
                    ? 'border-accent/40 bg-accent/5'
                    : 'border-bg-tertiary/50 bg-bg-tertiary/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">{category.icon}</span>
                  <span 
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: colorVarMap[category.color] || 'var(--accent)' }}
                  >
                    {category.shortName}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-2 py-0.5 text-[10px] rounded bg-bg-tertiary/60 text-text-secondary border border-bg-tertiary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full desktop version
  return (
    <div className="skills-widget w-full h-[700px] bg-bg-secondary rounded-xl overflow-hidden border border-bg-tertiary shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(230,57,70,0.1)] flex flex-col">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-bg-titlebar border-b border-bg-tertiary select-none">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-btn-close opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-btn-minimize opacity-80" />
          <span className="w-2.5 h-2.5 rounded-full bg-btn-maximize opacity-80" />
        </div>
        <div className="text-xs text-text-muted font-medium tracking-wide">
          skills — htop
        </div>
        <div className="w-[40px]" />
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-bg-tertiary/50 bg-bg-tertiary/20">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">UPTIME</span>
          <span className="text-prompt-green font-mono">{uptime}</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-text-muted">SKILLS LOADED</span>
          <span className="text-accent font-mono">{totalSkills}</span>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="p-3 space-y-2 flex-1 overflow-y-auto">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className={`skill-category p-2.5 rounded-lg border transition-all duration-500 ${
              index === activeIndex
                ? 'border-accent/40 bg-accent/5 scale-[1.02]'
                : 'border-bg-tertiary/50 bg-bg-tertiary/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{category.icon}</span>
              <span 
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: colorVarMap[category.color] || 'var(--accent)' }}
              >
                {category.shortName}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag px-2 py-0.5 text-[10px] rounded bg-bg-tertiary/60 text-text-secondary border border-bg-tertiary hover:border-accent/30 hover:text-accent transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-bg-tertiary/50 bg-bg-tertiary/20">
        <div className="flex items-center justify-between text-[10px] text-text-muted">
          <span>Press <span className="text-accent">F1</span> for help</span>
          <span className="text-prompt-green">● ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
