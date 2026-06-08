# File Previewer — Local Setup (VS Code)

This is a TanStack Start + React + Tailwind + Supabase app.

## Prerequisites
- [Bun](https://bun.sh) (recommended) **or** Node.js 20+
- VS Code

## Install
```bash
bun install
# or: npm install
```

## Run dev server
```bash
bun run dev
# or: npm run dev
```
Open http://localhost:8080 (or whichever port Vite prints).

## Build for production
```bash
bun run build
bun run preview
```

## Environment
The `.env` in the repo root already contains the Supabase publishable keys
(safe to commit — they are public anon keys). No extra setup is needed to
match the Lovable preview.

If you ever rotate keys, update both pairs:
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (client)
- `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` (server / SSR)

## Project structure
- `src/routes/` — file-based routes (TanStack Router)
- `src/components/` — UI components (shadcn/ui)
- `src/integrations/supabase/` — Supabase client
- `vite.config.ts` — uses `@lovable.dev/vite-tanstack-config` preset
