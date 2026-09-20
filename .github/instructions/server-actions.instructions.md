---
description: Read this before implementing or modifying data mutations in the project.
applyTo: '**/*.ts', '**/*.tsx'
---

# Server Actions

ALL data mutations (create/update/delete) must be done via server actions. Never mutate data directly from a client component or an API route.

## File location and naming

- Server action files MUST be named `actions.ts`.
- Colocate `actions.ts` in the same directory as the component that calls it.
- Server actions are called from Client Components (e.g. `"use client"` forms/handlers importing from a sibling `actions.ts`).

## Function signatures

- Accept plain, explicitly typed TypeScript parameters for all inputs. NEVER type a parameter as `FormData`.
- Define/reuse a TypeScript type (or Zod-inferred type) for each action's input shape.

## Validation

- ALL server actions must validate their input with **Zod** before doing anything else.
- Parse input with `schema.safeParse(...)` and return an error result on validation failure before proceeding (see Error handling below).

## Auth check

- Every server action must first check for a logged-in user (e.g. `const { userId } = await auth();`) and return an error result if there is none, before any database operation.
- This check must happen before validation errors are handled and before any mutation logic runs.

## Error handling

- Server actions must NEVER `throw` errors. Always return an object indicating success or failure instead.
- Use a consistent return shape, e.g. `{ success: true, data?: T } | { success: false, error: string }`.
- Wrap calls to `/data` helpers in `try/catch` and convert any caught error into the `{ success: false, error: string }` shape rather than letting it propagate.

## Database access

- Server actions must NEVER call Drizzle queries directly.
- All database operations must go through helper functions in the `/data` directory that wrap Drizzle queries (see [data/links.ts](../../data/links.ts) for the existing pattern).
- If a needed helper doesn't exist, add it to `/data` rather than inlining a query in the action.

## Order of operations in a server action

1. Check for authenticated user; return an error result if absent.
2. Validate input with Zod; return an error result if invalid.
3. Call the relevant `/data` helper function to perform the mutation, catching any errors.
4. Return a success/error result (and/or call `revalidatePath`/`revalidateTag` as needed).
