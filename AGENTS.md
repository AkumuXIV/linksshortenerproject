# Agent Instructions

This file is the entry point for coding agents working in this repository. It is a **link shortener** app built on Next.js. Detailed, topic-specific standards live in [docs/](docs/) — ALWAYS read the relevant .md file BEFORE working in that area of the codebase.

> [!IMPORTANT]
> It is **critical** that you read the relevant individual instructions file(s) in [docs/](docs/) below **BEFORE generating ANY code**, not after. Do not write, edit, or suggest code first and check the docs later — check first, every time, even if the task seems small or you think you already know the convention. If a task spans multiple areas (e.g. auth + UI), read every applicable doc before starting.

## Standards index

- [docs/auth.md](docs/auth.md) — Clerk-only auth, protected `/dashboard` route, homepage redirect, modal sign-in/sign-up.
- [docs/ui.md](docs/ui.md) — shadcn/ui only for all UI elements, no custom components.

## Non-negotiables

- Match the conventions already established in the codebase over introducing new patterns. When in doubt, look at the nearest existing file of the same kind ([components/ui/button.tsx](components/ui/button.tsx) for UI primitives, [db/index.ts](db/index.ts) for the DB client, etc.) before writing new code.
- Do not add new dependencies, config files (e.g. a `tailwind.config.*`), or architectural patterns that duplicate something already in [docs/tech-stack.md](docs/tech-stack.md) without a clear reason.
- Run `npm run lint` (and `npm run build` for non-trivial changes) before considering a change complete — see [docs/workflow.md](docs/workflow.md).
- Never commit secrets or hardcode values that belong in environment variables.
- If a request touches Clerk auth, database schema/migrations, or UI styling, read the corresponding doc above first — they capture conventions that aren't obvious from a single file in isolation.
