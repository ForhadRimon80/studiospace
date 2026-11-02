<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace Project Guidelines

## Project Scope

- StudioSpace is a peer-to-peer marketplace for creative studios and production spaces.
- Follow the assignment requirements in the project brief: authentication, studio CRUD, bookings, responsive UI, loading/empty/not-found states, toast feedback, and light/dark theme support.
- Do not use Lorem ipsum or browser `alert()` for user feedback. Use the existing shadcn Toast and custom modal components.

## Architecture

- This repository is a Next.js App Router application using TypeScript.
- Use Tailwind CSS for styling and shadcn/ui components and primitives for the shared interface.
- Use Better Auth for authentication and session management, with the MongoDB adapter where server configuration requires persistence.
- Keep route-specific UI in `src/app` and reusable UI in `src/components`.
- Prefer existing shadcn/ui primitives before adding new UI patterns or custom components.
- Use the existing shadcn Carousel built on Embla for hero sliders; do not add Swiper or another carousel library.
- Treat private routes and mutation actions as authenticated surfaces. Preserve the intended return route after login.
- Read the relevant Next.js guide under `node_modules/next/dist/docs/` before changing framework APIs or conventions.

## UI and UX

- Use the StudioSpace palette: primary green `#087A43`, dark green `#064E32`, accent lime `#B8F36B`, light green `#EAF8DC`, background `#FFFFFF`, surface white `#FFFFFF`, heading `#101820`, body text `#64748B`, border `#E2E8E5`, and error `#DC2626`.
- Maintain a consistent StudioSpace visual system: typography, spacing, button styles, card dimensions, image ratios, and accessible contrast.
- Keep layouts responsive across mobile, tablet, and desktop.
- Use a branded skeleton or spinner during asynchronous work and a helpful empty state when a collection or search has no results.
- Use the existing shadcn Toast for success and error feedback across authentication, studio CRUD, and booking actions.
- Use the new X social logo rather than the retired Twitter bird.

## Data and Security

- Studio and booking data must use the server API and MongoDB contracts; do not rely on client-only persistence for core operations.
- Protect server mutations with JWTs stored in HTTPOnly cookies and return explicit unauthorized errors.
- Prevent overlapping confirmed bookings before creating a reservation.
- Validate form input on the client and server, including registration passwords: at least 6 characters with uppercase and lowercase letters.

## Build and Test

- Install dependencies with `npm install`.
- Run lint with `npm run lint`.
- Run the production validation with `npm run build`.
- Keep Tailwind CSS configuration and shadcn/ui component conventions consistent with the existing setup.
- Prefer the smallest relevant validation command after each change, then run both commands before handoff when practical.

## Documentation and Delivery

- Keep `README.md` meaningful and current with the website name, live URL, features, tech stack, local setup, and examiner test credentials.
- Make notable changes in focused commits; the assignment expects at least 15 client-side commits.
- Do not commit secrets, credentials, generated files, or temporary assignment assets.
