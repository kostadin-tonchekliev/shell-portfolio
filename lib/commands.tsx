import React from 'react';

export interface Command {
  description: string;
  execute: (args?: string[]) => React.ReactNode;
}

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
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="text-accent font-semibold">  About Me</div>
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="mt-2">
          Hey there! 👋 I&apos;m a passionate <span className="text-accent">DevOps Engineer</span> with a love for
          automation, infrastructure as code, and building reliable systems.
        </div>
        <div>
          I specialize in designing and implementing CI/CD pipelines, managing
          cloud infrastructure, and containerizing applications. My goal is to
          bridge the gap between development and operations, making deployments
          smooth and systems resilient.
        </div>
        <div className="mt-3">
          <span className="text-text-muted">Philosophy:</span>
          <div className="ml-2">&ldquo;Automate everything that can be automated, monitor what can&apos;t.&rdquo;</div>
        </div>
        <div className="mt-2">
          <span className="text-text-muted">Current Focus:</span>
          <div className="ml-2 space-y-1">
            <div>• Kubernetes orchestration at scale</div>
            <div>• GitOps and infrastructure automation</div>
            <div>• Observability and monitoring solutions</div>
            <div>• Security-first DevOps practices</div>
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
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="text-accent font-semibold">  Technical Skills</div>
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="space-y-3 mt-2">
          <div>
            <span className="text-accent font-semibold">☁️  Cloud Platforms:</span>
            <div className="ml-4">AWS, Google Cloud, Azure, DigitalOcean</div>
          </div>
          <div>
            <span className="text-accent font-semibold">🐳  Containers & Orchestration:</span>
            <div className="ml-4">Docker, Kubernetes, Helm, Docker Compose</div>
          </div>
          <div>
            <span className="text-accent font-semibold">🔄  CI/CD:</span>
            <div className="ml-4">Jenkins, GitHub Actions, GitLab CI, ArgoCD, CircleCI</div>
          </div>
          <div>
            <span className="text-accent font-semibold">📦  Infrastructure as Code:</span>
            <div className="ml-4">Terraform, Pulumi, CloudFormation, Ansible</div>
          </div>
          <div>
            <span className="text-accent font-semibold">📊  Monitoring & Observability:</span>
            <div className="ml-4">Prometheus, Grafana, ELK Stack, Datadog, New Relic</div>
          </div>
          <div>
            <span className="text-accent font-semibold">💻  Scripting & Programming:</span>
            <div className="ml-4">Python, Bash, Go, JavaScript, YAML</div>
          </div>
          <div>
            <span className="text-accent font-semibold">🔒  Security:</span>
            <div className="ml-4">Vault, SOPS, Trivy, Falco, OPA</div>
          </div>
          <div>
            <span className="text-accent font-semibold">🗄️  Databases:</span>
            <div className="ml-4">PostgreSQL, MySQL, MongoDB, Redis</div>
          </div>
        </div>
        <div className="text-prompt-cyan mt-3">Type &apos;projects&apos; to see these skills in action!</div>
      </div>
    ),
  },

  projects: {
    description: 'Browse my projects',
    execute: () => (
      <div className="space-y-3">
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="text-accent font-semibold">  Featured Projects</div>
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        
        <div className="mt-2 p-3 bg-bg-tertiary rounded border-l-3 border-accent">
          <div className="text-accent font-semibold">🚀 K8s Cluster Automation</div>
          <div className="text-text-secondary mt-1">Fully automated Kubernetes cluster provisioning with Terraform and Ansible. Includes GitOps workflow with ArgoCD.</div>
          <div className="text-text-muted text-sm mt-2">Terraform • Kubernetes • ArgoCD • Helm • AWS</div>
        </div>

        <div className="p-3 bg-bg-tertiary rounded border-l-3 border-accent">
          <div className="text-accent font-semibold">📊 Observability Platform</div>
          <div className="text-text-secondary mt-1">Complete monitoring stack with custom dashboards, alerting, and log aggregation for microservices architecture.</div>
          <div className="text-text-muted text-sm mt-2">Prometheus • Grafana • Loki • AlertManager</div>
        </div>

        <div className="p-3 bg-bg-tertiary rounded border-l-3 border-accent">
          <div className="text-accent font-semibold">🔄 CI/CD Pipeline Framework</div>
          <div className="text-text-secondary mt-1">Reusable pipeline templates for multi-language projects with security scanning and automated deployments.</div>
          <div className="text-text-muted text-sm mt-2">GitHub Actions • Trivy • SonarQube • Docker</div>
        </div>

        <div className="p-3 bg-bg-tertiary rounded border-l-3 border-accent">
          <div className="text-accent font-semibold">🔐 Secrets Management System</div>
          <div className="text-text-secondary mt-1">Centralized secrets management with automatic rotation and audit logging across multiple environments.</div>
          <div className="text-text-muted text-sm mt-2">HashiCorp Vault • Kubernetes • External Secrets</div>
        </div>

        <div className="text-prompt-cyan mt-3">Type &apos;experience&apos; to see my work history!</div>
      </div>
    ),
  },

  experience: {
    description: 'View my work experience',
    execute: () => (
      <div className="space-y-3">
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="text-accent font-semibold">  Work Experience</div>
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

        <div className="mt-2 pl-3 border-l-2 border-accent">
          <div className="font-semibold">Senior DevOps Engineer</div>
          <div className="text-accent">@ TechCorp Inc.</div>
          <div className="text-text-muted text-sm">2022 - Present</div>
          <div className="text-text-secondary mt-1">Leading infrastructure automation initiatives, managing Kubernetes clusters, and implementing GitOps practices across the organization.</div>
        </div>

        <div className="pl-3 border-l-2 border-accent">
          <div className="font-semibold">DevOps Engineer</div>
          <div className="text-accent">@ CloudScale Solutions</div>
          <div className="text-text-muted text-sm">2020 - 2022</div>
          <div className="text-text-secondary mt-1">Built and maintained CI/CD pipelines, migrated legacy infrastructure to containerized workloads, and reduced deployment time by 70%.</div>
        </div>

        <div className="pl-3 border-l-2 border-accent">
          <div className="font-semibold">Systems Administrator</div>
          <div className="text-accent">@ StartupXYZ</div>
          <div className="text-text-muted text-sm">2018 - 2020</div>
          <div className="text-text-secondary mt-1">Managed Linux servers, implemented monitoring solutions, and began the journey into infrastructure automation.</div>
        </div>

        <div className="text-prompt-cyan mt-3">Type &apos;contact&apos; to get in touch!</div>
      </div>
    ),
  },

  contact: {
    description: 'Get my contact information',
    execute: () => (
      <div className="space-y-3">
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="text-accent font-semibold">  Contact Information</div>
        <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="mt-2">
          Let&apos;s connect! I&apos;m always open to discussing new opportunities,
          interesting projects, or just chatting about DevOps.
        </div>
        <div className="space-y-2 mt-3 ml-2">
          <div>
            <span className="text-accent">📧 Email:</span>    
            <a href="mailto:hello@devops-engineer.dev" className="output-link ml-2">hello@devops-engineer.dev</a>
          </div>
          <div>
            <span className="text-accent">💼 LinkedIn:</span> 
            <a href="https://linkedin.com/in/devops-engineer" target="_blank" rel="noopener noreferrer" className="output-link ml-2">linkedin.com/in/devops-engineer</a>
          </div>
          <div>
            <span className="text-accent">🐙 GitHub:</span>   
            <a href="https://github.com/devops-engineer" target="_blank" rel="noopener noreferrer" className="output-link ml-2">github.com/devops-engineer</a>
          </div>
          <div>
            <span className="text-accent">🐦 Twitter:</span>  
            <a href="https://twitter.com/devops_engineer" target="_blank" rel="noopener noreferrer" className="output-link ml-2">@devops_engineer</a>
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
          <div><span className="text-accent font-semibold">visitor</span><span>@portfolio</span></div>
          <div className="text-text-muted">------------------</div>
          <div><span className="text-accent">OS:</span> Portfolio OS 1.0.0</div>
          <div><span className="text-accent">Host:</span> DevOps Engineer Portfolio</div>
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

export const MAIN_COMMANDS = ['help', 'about', 'skills', 'projects', 'experience', 'contact', 'clear'];
export const EASTER_EGG_COMMANDS = ['whoami', 'neofetch'];
