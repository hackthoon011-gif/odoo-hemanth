# File Previewer — Local Setup (VS Code)

This is a TanStack Start + React + Tailwind + Supabase app.
## ⚡ Technical Architecture & Performance Optimization

VendorBridge is built using a bleeding-edge full-stack architecture optimized for speed, real-time data synchronization, and type safety:

- **Frontend Core & SSR:** Engineered with **TanStack Start** and **TypeScript**, utilizing high-performance file-based routing and Server-Side Rendering (SSR) to achieve near-instantaneous first-contentful paint.
- **UI Architecture:** Tailored dark mode design layer using **Tailwind CSS** built on top of accessible **shadcn/ui** structural primitives.
- **Backend & Real-Time Engine:** Leverages a **Supabase** infrastructure for secure user authentication proxying, real-time database listener signals, and relational query storage.
- **Compilation Build Layer:** Bundled via **Vite** and executed over the **Bun** runtime environment, maximizing compilation throughput and system execution speeds.

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
