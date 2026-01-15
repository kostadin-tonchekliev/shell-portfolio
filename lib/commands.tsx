'use client';

import React, { useEffect, useState, useRef } from 'react';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';
import experienceData from '@/data/experience.json';
import profileData from '@/data/profile.json';
import type { SkillsData, ProjectsData, ExperienceData, ProfileData } from './types';

const skills = skillsData as SkillsData;
const projects = projectsData as ProjectsData;
const experience = experienceData as ExperienceData;
const profile = profileData as ProfileData;

export interface Command {
  description: string;
  execute: (args?: string[]) => React.ReactNode;
}

// Dynamic line component that scales based on container width
function DynamicLine({ className = 'text-accent' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineLength, setLineLength] = useState(58); // Default fallback

  useEffect(() => {
    const calculateLength = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Each ━ character is approximately 8-10px wide in monospace font
        // We use a slightly smaller estimate to ensure it fits
        const charWidth = 9.6;
        const calculatedLength = Math.floor(containerWidth / charWidth);
        setLineLength(Math.max(20, calculatedLength)); // Minimum 20 chars
      }
    };

    calculateLength();

    // Recalculate on window resize
    window.addEventListener('resize', calculateLength);
    return () => window.removeEventListener('resize', calculateLength);
  }, []);

  return (
    <div ref={containerRef} className={`${className} overflow-hidden`}>
      {'━'.repeat(lineLength)}
    </div>
  );
}

// Section header component with dynamic lines
function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <DynamicLine />
      <div className="text-accent font-semibold">  {title}</div>
      <DynamicLine />
    </>
  );
}

// Color mapping for Tailwind classes
const colorMap: Record<string, string> = {
  'accent': 'text-accent',
  'prompt-green': 'text-prompt-green',
  'prompt-cyan': 'text-prompt-cyan',
  'prompt-yellow': 'text-prompt-yellow',
};

export const COMMANDS: Record<string, Command> = {
  help: {
    description: 'List all available commands',
    execute: () => (
      <div className="space-y-2">
        <div className="text-accent font-semibold">Available Commands:</div>
        <div className="space-y-1 ml-2">
          <div><span className="text-accent">help</span>        - Show this help message</div>
          <div><span className="text-accent">about</span>       - Learn about me</div>
          <div><span className="text-accent">skills</span>      - View my technical skills</div>
          <div><span className="text-accent">projects</span>    - Browse my projects</div>
          <div><span className="text-accent">experience</span>  - View my work experience</div>
          <div><span className="text-accent">education</span>   - View my education</div>
          <div><span className="text-accent">contact</span>     - Get my contact information</div>
          <div><span className="text-accent">clear</span>       - Clear the terminal</div>
        </div>
        <div className="text-text-muted mt-3">Easter Eggs:</div>
        <div className="text-text-muted ml-2">whoami, neofetch, sudo, rm -rf /, exit</div>
        <div className="text-prompt-cyan mt-3">Tip: Click commands in the sidebar or use Tab for autocomplete!</div>
      </div>
    ),
  },

  about: {
    description: 'Learn about me',
    execute: () => (
      <div className="space-y-3">
        <SectionHeader title={`About ${profile.name}`} />
        <div className="mt-2">{profile.about.intro}</div>
        <div>{profile.about.description}</div>
        <div className="mt-3">
          <span className="text-text-muted">Philosophy:</span>
          <div className="ml-2">&ldquo;{profile.about.philosophy}&rdquo;</div>
        </div>
        <div className="mt-2">
          <span className="text-text-muted">Current Focus:</span>
          <div className="ml-2 space-y-1">
            {profile.about.currentFocus.map((focus) => (
              <div key={focus}>• {focus}</div>
            ))}
          </div>
        </div>
        <div className="text-prompt-cyan mt-3">Type &apos;skills&apos; to see my technical expertise!</div>
      </div>
    ),
  },

  skills: {
    description: 'View my technical skills',
    execute: () => (
      <div className="space-y-3">
        <SectionHeader title="Technical Skills" />
        <div className="space-y-3 mt-2">
          {skills.categories.map((category) => (
            <div key={category.name}>
              <span className={`${colorMap[category.color] || 'text-accent'} font-semibold`}>
                {category.icon}  {category.name}:
              </span>
              <div className="ml-4">{category.skills.join(', ')}</div>
            </div>
          ))}
        </div>
        <div className="text-prompt-cyan mt-3">Type &apos;projects&apos; to see these skills in action!</div>
      </div>
    ),
  },

  projects: {
    description: 'Browse my projects',
    execute: () => (
      <div className="space-y-3">
        <SectionHeader title="Featured Projects" />
        
        {projects.projects.map((project, index) => (
          <div 
            key={project.title} 
            className={`${index === 0 ? 'mt-2 ' : ''}p-3 bg-bg-tertiary rounded border-l-3 border-accent`}
          >
            <div className="text-accent font-semibold">{project.icon} {project.title}</div>
            <div className="text-text-secondary mt-1">{project.description}</div>
            <div className="text-text-muted text-sm mt-2">{project.technologies.join(' • ')}</div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs font-medium bg-accent/10 text-accent border border-accent/30 rounded hover:bg-accent/20 hover:border-accent/50 transition-all duration-150"
              >
                <span>View Project</span>
                <span>→</span>
              </a>
            )}
          </div>
        ))}

        <div className="text-prompt-cyan mt-3">Type &apos;experience&apos; to see my work history!</div>
      </div>
    ),
  },

  experience: {
    description: 'View my work experience',
    execute: () => (
      <div className="space-y-3">
        <SectionHeader title="Work Experience" />

        {experience.positions.map((position, index) => (
          <div 
            key={`${position.company}-${position.period}`} 
            className={`${index === 0 ? 'mt-2 ' : ''}pl-3 border-l-2 border-accent`}
          >
            <div className="font-semibold">{position.title}</div>
            <div className="text-accent">@ {position.company}</div>
            <div className="text-text-muted text-sm">{position.period}</div>
            <div className="text-text-secondary mt-1">{position.description}</div>
          </div>
        ))}

        <div className="text-prompt-cyan mt-3">Type &apos;education&apos; to see my academic background!</div>
      </div>
    ),
  },

  education: {
    description: 'View my education',
    execute: () => (
      <div className="space-y-3">
        <SectionHeader title="Education" />

        {profile.education?.map((edu, index) => (
          <div 
            key={`${edu.institution}-${edu.period}`} 
            className={`${index === 0 ? 'mt-2 ' : ''}pl-3 border-l-2 border-prompt-cyan`}
          >
            <div className="font-semibold">🎓 {edu.degree}</div>
            <div className="text-prompt-cyan">@ {edu.institution}</div>
            <div className="text-text-muted text-sm">{edu.period}</div>
            <div className="text-text-secondary mt-1">{edu.description}</div>
          </div>
        ))}

        <div className="text-prompt-cyan mt-3">Type &apos;contact&apos; to get in touch!</div>
      </div>
    ),
  },

  contact: {
    description: 'Get my contact information',
    execute: () => (
      <div className="space-y-3">
        <SectionHeader title="Contact Information" />
        <div className="mt-2">
          Let&apos;s connect! I&apos;m always open to discussing new opportunities,
          interesting projects, or just chatting about DevOps.
        </div>
        <div className="space-y-2 mt-3 ml-2">
          <div>
            <span className="text-accent">📧 Email:</span>    
            <a href={`mailto:${profile.email}`} className="output-link ml-2">{profile.email}</a>
          </div>
          <div>
            <span className="text-accent">💼 LinkedIn:</span> 
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="output-link ml-2">{profile.links.linkedin.replace('https://', '')}</a>
          </div>
          <div>
            <span className="text-accent">🐙 GitHub:</span>   
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="output-link ml-2">{profile.links.github.replace('https://', '')}</a>
          </div>
          <div>
            <span className="text-accent">🐦 Twitter:</span>  
            <a href={profile.links.twitter} target="_blank" rel="noopener noreferrer" className="output-link ml-2">@{profile.links.twitter.split('/').pop()}</a>
          </div>
        </div>
        <div className="text-prompt-green mt-3">Looking forward to hearing from you! 🚀</div>
      </div>
    ),
  },

  clear: {
    description: 'Clear the terminal',
    execute: () => '__CLEAR__',
  },

  // Easter Eggs
  whoami: {
    description: 'Who are you?',
    execute: () => (
      <div>
        <div className="text-prompt-green">visitor</div>
        <div className="text-text-muted mt-2">
          You&apos;re a curious soul exploring this terminal portfolio.
          <br />Welcome! Feel free to look around and run some commands.
        </div>
      </div>
    ),
  },

  neofetch: {
    description: 'System information',
    execute: () => (
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <pre className="text-accent text-xs leading-tight">
{`        .--.
       |o_o |
       |:_/ |
      //   \\ \\
     (|     | )
    /'\\_   _/\`\\
    \\___)=(___/`}
        </pre>
        <div className="space-y-1 text-sm">
          <div><span className="text-accent font-semibold">visitor</span><span>@{profile.name.toLowerCase().replace(/\s+/g, '-')}</span></div>
          <div className="text-text-muted">------------------</div>
          <div><span className="text-accent">OS:</span> Portfolio OS 1.0.0</div>
          <div><span className="text-accent">Host:</span> {profile.name}&apos;s Portfolio</div>
          <div><span className="text-accent">Kernel:</span> Next.js 2024</div>
          <div><span className="text-accent">Uptime:</span> Always online ☁️</div>
          <div><span className="text-accent">Shell:</span> portfolio-bash 5.0</div>
          <div><span className="text-accent">Terminal:</span> Web Terminal</div>
          <div><span className="text-accent">CPU:</span> Your Browser @ ∞ GHz</div>
          <div><span className="text-accent">Memory:</span> Unlimited thoughts</div>
        </div>
      </div>
    ),
  },

  sudo: {
    description: 'Superuser do',
    execute: (args) => {
      if (!args || args.length === 0) {
        return <div className="text-accent">usage: sudo command</div>;
      }
      return (
        <div>
          <div className="text-accent">[sudo] password for visitor: </div>
          <div className="text-accent">Sorry, visitor is not in the sudoers file. This incident will be reported. 🚨</div>
          <div className="text-text-muted mt-2">Nice try though! 😉</div>
        </div>
      );
    },
  },

  exit: {
    description: 'Exit the terminal',
    execute: () => (
      <div>
        <div className="text-prompt-yellow">Logout</div>
        <div className="text-text-muted mt-2">
          Just kidding! You can&apos;t escape this easily.
          <br />Try exploring with &apos;help&apos; instead! 😄
        </div>
      </div>
    ),
  },

  rm: {
    description: 'Remove files',
    execute: (args) => {
      const argsStr = args?.join(' ') || '';
      if (argsStr.includes('-rf /') || argsStr.includes('-rf /*')) {
        return (
          <div>
            <div className="text-accent font-bold">🚨 NICE TRY! 🚨</div>
            <div className="text-prompt-yellow mt-2">You really thought that would work?</div>
            <div className="text-text-muted">This portfolio is protected by advanced anti-destruction technology.</div>
            <div className="text-prompt-green mt-2">System integrity: 100% ✓</div>
          </div>
        );
      }
      return <div className="text-accent">rm: cannot remove &apos;{argsStr}&apos;: Permission denied</div>;
    },
  },

  ls: {
    description: 'List directory contents',
    execute: () => (
      <div className="text-prompt-cyan">about.txt    skills.json    projects/    experience.md    contact.yml</div>
    ),
  },

  pwd: {
    description: 'Print working directory',
    execute: () => <div className="text-prompt-cyan">/home/visitor/portfolio</div>,
  },

  cd: {
    description: 'Change directory',
    execute: () => (
      <div className="text-text-muted">Staying right here in the portfolio. Try running a command instead!</div>
    ),
  },

  cat: {
    description: 'Concatenate and display files',
    execute: (args) => {
      const file = args?.[0];
      if (!file) {
        return <div className="text-accent">cat: missing operand</div>;
      }
      if (file === 'about.txt') {
        return COMMANDS.about.execute();
      }
      const cmdName = file.replace(/\.(txt|json|md|yml)$/, '');
      return <div className="text-text-muted">Try running &apos;{cmdName}&apos; as a command instead!</div>;
    },
  },

  echo: {
    description: 'Display a line of text',
    execute: (args) => <div>{args?.join(' ') || ''}</div>,
  },

  date: {
    description: 'Display current date and time',
    execute: () => <div className="text-prompt-cyan">{new Date().toString()}</div>,
  },

  history: {
    description: 'Show command history',
    execute: () => (
      <div className="text-text-muted">Command history is available using ↑ and ↓ arrow keys!</div>
    ),
  },
};

export function getWelcomeMessage(): React.ReactNode {
  return (
    <div className="space-y-3">
      <pre className="text-accent text-sm leading-tight">
{` ____              ___              
|  _ \\  _____   __/ _ \\ _ __  ___  
| | | |/ _ \\ \\ / / | | | '_ \\/ __| 
| |_| |  __/\\ V /| |_| | |_) \\__ \\ 
|____/ \\___| \\_/  \\___/| .__/|___/ 
                       |_|         `}
      </pre>
      <div className="text-prompt-green">Welcome to my interactive portfolio!</div>
      <div className="text-text-muted">
        Type &apos;<span className="text-accent">help</span>&apos; to see available commands.
      </div>
      <div className="text-text-muted">Click on commands in the sidebar or type them below.</div>
    </div>
  );
}

export function getCommandNames(): string[] {
  return Object.keys(COMMANDS);
}

// Re-export skills data for the SkillsWidget
export { skills as skillsData };

export const MAIN_COMMANDS = ['help', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'clear'];
export const EASTER_EGG_COMMANDS = ['whoami', 'neofetch'];
