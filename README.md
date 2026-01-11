# Terminal Portfolio

An interactive terminal-style portfolio website where visitors can explore your profile, skills, projects, and experience through a command-line interface.

## Features

- **Interactive Terminal** — Type commands or click the sidebar to navigate
- **Command History** — Use ↑/↓ arrow keys to browse previous commands
- **Tab Autocomplete** — Press Tab to autocomplete command names
- **Keyboard Shortcuts** — `Ctrl+C` to cancel, `Ctrl+L` to clear
- **Easter Eggs** — Try `neofetch`, `whoami`, `sudo`, or `rm -rf /`

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
│   ├── page.tsx          # Main page with layout
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles & theme
├── components/
│   ├── Terminal.tsx      # Terminal emulator component
│   └── Sidebar.tsx       # Command sidebar
└── lib/
    └── commands.tsx      # Command definitions & outputs
```

## Customization

Edit `lib/commands.tsx` to update your personal information, skills, projects, and work experience. The terminal styling can be modified in `globals.css`.

## License

MIT
