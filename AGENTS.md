<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace

Peer-to-peer studio marketplace. Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, shadcn/ui (`base-nova` on Base UI). Imports use `@/*` → `src/*`.

## Run and verify

- `npm install`; `npm run dev`; `npm run lint` (runs bare `eslint`); `npm run build`.
- There is no test runner, typecheck script, or CI workflow. Use `npx tsc --noEmit` for types. Fast check: `npm run lint` + `npx tsc --noEmit`; run `npm run build` before handoff.
- `.env` is gitignored and required: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

## Architecture you would otherwise miss

- The only API route in this repo is Better Auth: `src/app/api/auth/[...all]/route.ts`. Server config (`better-auth` + MongoDB adapter, database `studiospace`) is `src/lib/auth.ts`; client helpers are `src/lib/auth-client.ts`.
- Studio CRUD lives in the adjacent `studiospace-server` Express app, not this repo. Its routes are:
  - `POST /add-new-studio`
  - `GET /my-studio-listings/:userId`
  - `PATCH` / `DELETE /my-studio-listings/:studioId`
  Start that server before testing studio management.
- Route groups: `(main)` adds Navbar/Footer; `(dashboard)` is a client shell with sidebar/navbar. Dashboard routes are not auth-protected yet.
- Server components read the session with `auth.api.getSession({ headers: await headers() })`; client components use `useSession()`.

## Conventions that differ from defaults

- Toasts: `toast.add({ title, description, type: "success" | "error" })` from `@/components/ui/toast`. `Toaster` is already mounted once in the root layout; don't add another or use `alert()`.
- Components are Base UI, not Radix: compose with `render={<Link href="..." />}` (plus `nativeButton={false}` for Button-as-link), not `asChild`.
- `cn` comes from the `cn` package (`import { cn } from "cn"`), not `clsx`/`tailwind-merge`. `src/lib/utils.ts` only re-exports it.
- Tailwind v4 has no `tailwind.config.*`; tokens are declared in `@theme inline` in `src/app/globals.css`. Prefer semantic utilities (`bg-bg-page`, `bg-bg-surface`, `text-text-primary`, `text-text-secondary`, `text-primary-green`, `text-accent-lime`). Many existing components hardcode hex — match the surrounding file rather than introducing new colors.
- Dark mode is the `.dark` class, toggled in `Navbar` and persisted under localStorage key `studiospace-theme`; there is no `next-themes`.
- Use `src/components/ui/carousel.tsx` (Embla); don't add Swiper or another carousel library.
- `next.config.ts` enables React Compiler and disables `cacheComponents`/`partialPrefetching`.
- Home sections live in `src/components/home/`. The featured studio cards use static design data in `featured-studios-data.ts`; there is no home-page data fetch yet.

## Current state

- Implemented: static home page design, login/signup, dashboard shell, add studio, my listings with edit/delete.
- Placeholder or missing: `/studios` explore page, studio detail `/studios/[id]`, dashboard overview, bookings, wishlist, auth route protection, `loading.tsx` / `error.tsx` / `not-found.tsx`.
- Navbar links to routes that do not exist yet (`/studios`, `/my-bookings`); the real signup route is `/signup`.

## Delivery

- `README.md` is still create-next-app boilerplate. Update it with site name, live URL, features, stack, local setup, and examiner test credentials when ready.
- Keep notable changes in focused commits; the assignment expects at least 15 client-side commits.
- Do not commit `.env`, secrets, generated files, or temporary assets.
