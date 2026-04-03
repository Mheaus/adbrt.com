# Copilot Instructions

## Tech Stack

- **Framework**: React Router v7 (full-stack SSR + prerendering)
- **UI**: React 19 + TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **Build**: Vite 7
- **Package manager**: pnpm
- **Linter**: Oxlint (`pnpm lint` / `pnpm lint:fix`)
- **Formatter**: Oxfmt (`pnpm format` / `pnpm format:check`)
- **Type check**: `pnpm typecheck`

## Project Structure

```
app/
├── routes/         # React Router routes (UI routes + API endpoints)
├── components/     # Shared reusable UI components
├── hooks/          # Custom React hooks
├── devo/           # Self-contained feature module (components, logic, types)
└── types/          # Shared TypeScript types
```

- UI routes export a **default component** and optionally a `loader`, `meta`, `links`, etc.
- API/resource routes (e.g. `api.github.ts`) export only a `loader` — no default export.
- Feature-specific code lives in its own subdirectory (e.g. `app/devo/`).

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files & directories | kebab-case | `business-card.tsx`, `use-debounce.ts` |
| React components | PascalCase | `BusinessCard`, `ProgressiveImage` |
| Custom hooks | camelCase with `use` prefix | `useLocalStorage`, `useDebounce` |
| Constants | SCREAMING_SNAKE_CASE | `FIVE_MINUTES` |
| TypeScript type aliases | PascalCase with descriptive suffix | `BusinessCardProps` |

## Code Conventions

### Imports

- Prefer the `~/` path alias for cross-directory app-internal imports (maps to `./app/`), and use relative imports within the same folder or feature module when they are the clearest choice.
- Always import React as a namespace: `import * as React from 'react'`.
- Use the `type` keyword for type-only imports: `import type { Route } from './+types/home'`.
- Order: external libraries → internal `~/` paths → local relative paths.

```typescript
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import Nav from '~/components/nav';
import type { DevoItem } from '~/types/devo';
```

### Components

- Functional components only, written as `const` arrow functions.
- Default exports for components.
- Define prop types with a `type` alias above the component.
- Keep components focused — extract sub-components or hooks when logic grows.

```typescript
type MyComponentProps = {
  label: string;
  onAction: () => void;
};

const MyComponent = ({ label, onAction }: MyComponentProps) => {
  return <button onClick={onAction}>{label}</button>;
};

export default MyComponent;
```

### Styling

- **Tailwind CSS only** for styling — no CSS modules, no inline style objects except for dynamic values that can't be expressed as classes.
- Use `clsx` for conditional class names.
- CSS variables for shared design tokens (defined in `app.css`).

### State & Data Fetching

- Prefer React built-in hooks (`useState`, `useCallback`, `useEffect`, `useRef`) before adding new libraries.
- Use **TanStack React Query** for client-side data fetching with caching.
- Use React Router **loaders** for data that should be available before the page renders.
- Server-only code (scrapers, DB calls, etc.) lives in files suffixed `.server.ts`.

### Server-Side Patterns

- Cache expensive server calls with a simple in-memory TTL cache (see `app/devo/fetchers.server.ts`).
- Expose data to the client via React Router `loader` + `useLoaderData`.
- Return `Response` objects from API loaders and set appropriate `Cache-Control` headers.

### TypeScript

- Strict mode is enabled — no `any`, no implicit `any`.
- Prefer `satisfies` over explicit type casting for config objects.
- Use the auto-generated React Router types (`./+types/<route>`) for `loader`, `meta`, etc.
- Narrow errors with `err instanceof Error` before accessing `.message`.

### Error Handling

- Add `try/catch` at `loader`/`action` boundaries (including API loaders) when you need to translate failures into user-visible messages or HTTP responses.
- Use the root-level `ErrorBoundary` in `app/root.tsx` by default; add route-level `ErrorBoundary` exports when a route needs custom user-visible error handling.
- API loaders should return a `Response` with an appropriate HTTP status on failure.

## Good Practices

- **Keep files small and focused.** Components longer than ~150 lines are a signal to split.
- **Colocate feature code.** Everything related to a feature goes in its own directory (like `app/devo/`).
- **No barrel `index` files.** Import directly from the source file.
- **Accessibility.** Interactive non-button elements must have `role`, `aria-*`, and keyboard handlers.
- **Progressive enhancement.** Images use the blur-up pattern via `ProgressiveImage`; SSR provides initial HTML.
- **No tests are currently written.** Do not add a test framework without explicit instruction.

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<optional scope>): <short description>
```

### Types

| Type | When to use |
|---|---|
| `feat` | New feature or user-visible addition |
| `fix` | Bug fix |
| `chore` | Maintenance, config, tooling, dependencies |
| `refactor` | Code restructure with no behavior change |
| `style` | Formatting, whitespace only |
| `docs` | Documentation only |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |

### Rules

- Use the **imperative mood** in the description: "add route" not "added route".
- Keep the subject line under **72 characters**.
- Reference the PR number at the end when applicable: `feat: add devo page (#12)`.
- Breaking changes must include `!` after the type and a `BREAKING CHANGE:` footer.

### Examples

```
feat: add progressive image component
fix: correct cache TTL calculation in devo fetcher
chore: upgrade react-router to v7.5
refactor(devo): extract date formatting into utility
docs: update README with Docker instructions
```
