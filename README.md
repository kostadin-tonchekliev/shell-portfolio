# Terminal Portfolio

An interactive terminal-style portfolio website where visitors can explore your profile, skills, projects, and experience through a command-line interface.

## Features

- **Interactive Terminal** — Type commands or click the sidebar to navigate
- **Always-Visible Skills Widget** — An "htop-style" panel displaying your technical skills with live animations
- **Three-Panel Layout** — Commands sidebar, main terminal, and skills widget in a unified design
- **JSON-Based Data** — Skills, projects, and experience are stored in separate JSON files for easy editing
- **Command History** — Use ↑/↓ arrow keys to browse previous commands
- **Tab Autocomplete** — Press Tab to autocomplete command names
- **Keyboard Shortcuts** — `Ctrl+C` to cancel, `Ctrl+L` to clear
- **Easter Eggs** — Try `neofetch`, `whoami`, `sudo`, or `rm -rf /`

## Layout

The portfolio features a three-column layout with consistent macOS-style window chrome:

| Panel | Description |
|-------|-------------|
| **Commands Sidebar** | Quick-access buttons for all available commands |
| **Terminal** | Interactive command-line interface for exploring content |
| **Skills Widget** | Always-visible panel showing technical skills with cycling highlights and uptime counter |

## Available Commands

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `about` | Learn about me |
| `skills` | View technical skills |
| `projects` | Browse featured projects |
| `experience` | View work history |
| `contact` | Get contact information |
| `clear` | Clear the terminal |

## Tech Stack

- [Next.js](https://nextjs.org) 16 with App Router
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- TypeScript

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page with three-panel layout
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles & theme
├── components/
│   ├── Terminal.tsx      # Terminal emulator component
│   ├── Sidebar.tsx       # Command sidebar with window chrome
│   └── SkillsWidget.tsx  # Always-visible skills panel
├── data/
│   ├── skills.json       # Technical skills data
│   ├── projects.json     # Featured projects data
│   └── experience.json   # Work experience data
└── lib/
    ├── commands.tsx      # Command definitions & rendering
    └── types.ts          # TypeScript interfaces for data
```

## Customization

All portfolio content is stored in JSON files in the `data/` directory:

- **Skills** (`data/skills.json`): Edit skill categories, icons, and individual skills
- **Projects** (`data/projects.json`): Add or modify featured projects with descriptions and tech stacks
- **Experience** (`data/experience.json`): Update work history with positions, companies, and descriptions
- **About & Contact** (`lib/commands.tsx`): Edit the about section and contact information directly in the commands file
- **Styling** (`app/globals.css`): Customize colors, fonts, and theme

## License

MIT
