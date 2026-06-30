# Misconception Detector

![Misconception Detector Logo](./frontend/public/logo.png)

> AI-powered educational tool that diagnoses *why* students get things wrong — not just that they did.

---

## Overview

Every wrong answer traces back to a specific cognitive error. This tool names it. Instead of "Wrong — the answer is X," students receive a named misconception, an explanation anchored to their own words, and the correct understanding in plain language. Teachers get a live class-wide map of which mental models need correcting.

---

## Project Structure

```
misconception-detector/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Student and Teacher views
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # API client, utilities
│   │   └── types/         # TypeScript interfaces
│   └── ...
├── backend/           # Express + Node.js API
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/     # Auth, logging, error handling
│   │   └── lib/           # Anthropic client, data store
│   └── ...
└── package.json       # Root monorepo scripts
```

---

## Setup

### Prerequisites
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Installation

```bash
# Clone and install all dependencies
git clone <repo>
cd misconception-detector
npm run install:all
```

### Environment Variables

**Backend** — create `backend/.env`:
```env
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
NODE_ENV=development
```

**Frontend** — create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

### Development

```bash
# Runs both frontend (port 5173) and backend (port 3001)
npm run dev
```

### Production

```bash
npm run build    # Builds frontend to frontend/dist/
npm start        # Starts backend (serves API on port 3001)
```

---

## How It Works

1. **Student** picks a topic, reads a question, explains their reasoning
2. **Backend** forwards the answer to Claude with a carefully engineered system prompt
3. **Claude** returns a structured JSON diagnosis: misconception name, severity, explanation, correction
4. **Student** sees the named misconception and where their thinking diverged
5. **Teacher view** aggregates all submissions into a class-wide misconception frequency map

---

## Extending

- **Persistence**: swap the in-memory store (`backend/src/lib/store.ts`) for a database (Postgres, Supabase, MongoDB)
- **Class codes**: add a join-code system so multiple students submit to the same session
- **Custom questions**: let teachers upload their own questions via the teacher UI
- **LMS integration**: expose a webhook endpoint compatible with Google Classroom or Moodle

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| AI | Anthropic Claude API |
| State | React Query + Zustand |

---

## License

MIT
