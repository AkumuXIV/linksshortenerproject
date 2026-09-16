# Auth

All authentication and session management is handled by **Clerk** (`@clerk/nextjs`). Do not introduce any other auth method (NextAuth, custom JWT/session handling, Passport, etc.) — if a task seems to need one, use Clerk's equivalent feature instead.

## Setup

- `proxy.ts` wraps every request in `clerkMiddleware()` — do not bypass or remove this.
- `app/layout.tsx` wraps the app in `<ClerkProvider>`. Keep this at the root layout; don't add a second provider deeper in the tree.
- Sign-in/sign-up pages exist at `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` for the Clerk catch-all routes, but these routes are **not** used for the primary sign-in/sign-up flow (see Modal section below). Keep them in place as a fallback destination for Clerk-generated links/emails.

## Protected routes

- `/dashboard` (and everything under it) requires a signed-in user.
- Enforce this with `auth.protect()` in `proxy.ts` for the `/dashboard` matcher, or with `const { userId } = await auth()` + `redirect("/")` at the top of the relevant Server Component/layout. Prefer the middleware approach so new pages under `/dashboard` are protected automatically.
- Never rely on client-side checks (e.g. hiding UI with `<Show>`) alone to protect a route — always enforce on the server.

## Homepage redirect

- If a signed-in user visits `/` (the homepage), redirect them to `/dashboard`.
- Implement this as a server-side check in `app/page.tsx` (e.g. `const { userId } = await auth(); if (userId) redirect("/dashboard");`), not as a client-side effect.

## Sign in / sign up must be modals

- `SignInButton` and `SignUpButton` must always use `mode="modal"`. Never link/redirect to a full-page sign-in or sign-up form as the primary flow.

```tsx
<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

- The `app/sign-in` and `app/sign-up` catch-all pages should stay as-is only as a fallback for direct navigation/links; do not build new flows that route to them intentionally.

## Conventions

- Use `<Show when="signed-in">` / `<Show when="signed-out">` for client-side conditional rendering (see `app/layout.tsx` header for the existing pattern) — this is presentation only, not a substitute for server-side protection.
- Use `await auth()` (server) or `useAuth()` (client) to read auth state — never mix the two in the same component.
- Keep the `shadcn` Clerk theme (`@clerk/ui/themes`) applied via `ClerkProvider appearance` so Clerk components match the app's design system.
