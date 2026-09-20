# Agent Instructions

## Standards index

## Non-negotiables

- Match the conventions already established in the codebase over introducing new patterns. When in doubt, look at the nearest existing file of the same kind ([components/ui/button.tsx](components/ui/button.tsx) for UI primitives, [db/index.ts](db/index.ts) for the DB client, etc.) before writing new code.

- Never commit secrets or hardcode values that belong in environment variables.
- If a request touches Clerk auth, database schema/migrations, or UI styling, read the corresponding doc above first — they capture conventions that aren't obvious from a single file in isolation.
- **Never create or use `middleware.ts`.** It is deprecated in the version of Next.js used by this project. Use [proxy.ts](proxy.ts) instead for all middleware-equivalent logic (route interception, auth checks, redirects, etc.).
