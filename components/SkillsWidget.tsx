'use client';

import React, { useState, useEffect } from 'react';

interface SkillCategory {
  icon: string;
  name: string;
  skills: string[];
  color: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: '☁️',
    name: 'Cloud',
    skills: ['AWS', 'GCP', 'Azure'],
    color: 'var(--prompt-cyan)',
  },
  {
    icon: '🐳',
    name: 'Containers',
    skills: ['Docker', 'Kubernetes', 'Helm'],
    color: 'var(--prompt-cyan)',
  },
  {
    icon: '🔄',
    name: 'CI/CD',
    skills: ['GitHub Actions', 'GitLab CI', 'ArgoCD'],
    color: 'var(--prompt-green)',
  },
  {
    icon: '📦',
    name: 'IaC',
    skills: ['Terraform', 'Pulumi', 'Ansible'],
    color: 'var(--prompt-yellow)',
  },
  {
    icon: '📊',
    name: 'Observability',
    skills: ['Prometheus', 'Grafana', 'ELK'],
    color: 'var(--accent)',
  },
  {
    icon: '💻',
    name: 'Languages',
    skills: ['Python', 'Bash', 'Go'],
    color: 'var(--prompt-green)',
  },
];

export default function SkillsWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [uptime, setUptime] = useState('0:00:00');

  // Cycle through skills for the highlight effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SKILL_CATEGORIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="skills-widget w-full h-full bg-bg-secondary rounded-xl overflow-hidden border border-bg-tertiary shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(230,57,70,0.1)] flex flex-col min-h-[500px]">
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
          <span className="text-accent font-mono">{SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)}</span>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="p-3 space-y-2 flex-1 overflow-y-auto">
        {SKILL_CATEGORIES.map((category, index) => (
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
                style={{ color: category.color }}
              >
                {category.name}
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
