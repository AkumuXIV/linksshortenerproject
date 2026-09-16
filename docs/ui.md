# UI Components

All UI elements in this app are built with **shadcn/ui**. Do not hand-roll custom components for things shadcn already provides.

## Rules

- Always use shadcn/ui components (`components/ui/*`) for UI primitives — buttons, inputs, dialogs, dropdowns, forms, cards, etc.
- Never create a custom/one-off component (e.g. a hand-written `<button>` with ad-hoc Tailwind classes) when a shadcn equivalent exists.
- If a needed component isn't in `components/ui/` yet, add it via the shadcn CLI rather than writing it from scratch:

  ```bash
  npx shadcn@latest add <component>
  ```

- After adding, use the generated component as-is and only extend it the way existing components in `components/ui/` are extended (e.g. `cva` variants in [components/ui/button.tsx](../components/ui/button.tsx)) — don't fork the internals.

## Conventions

- Config lives in [components.json](../components.json): style `base-nova`, base color `neutral`, icons from `lucide`, CSS variables enabled, no Tailwind config file (styles/tokens live in [app/globals.css](../app/globals.css)).
- Import via the `@/components/ui/*` alias, not relative paths.
- Use the `cn` helper (`lib/utils.ts`) for merging class names, matching the pattern in [components/ui/button.tsx](../components/ui/button.tsx).
- Compose complex UI out of existing shadcn primitives instead of introducing another component library.
