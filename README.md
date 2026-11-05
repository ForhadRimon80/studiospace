# StudioSpace

StudioSpace is a peer-to-peer marketplace for discovering, listing, and booking creative studios, event spaces, photography locations, music studios, and other production spaces.

## Live Site

**Live URL:** Not deployed yet

## Features

- Browse studios with category filtering, location, pricing, capacity, and rating information.
- View detailed studio pages with amenities, host information, booking details, and view tracking.
- Create an account with email/password authentication or Google sign-in.
- Hosts can add, edit, view, and delete their studio listings.
- Users can reserve studio spaces with selected dates, times, crew counts, notes, and calculated pricing.
- Dashboard with studio statistics, recent bookings, and booking status management.
- My Bookings page with booking receipts, statuses, and booking cancellation controls.
- Responsive light and dark themes with persistent theme selection.
- Toast notifications and confirmation dialogs for user feedback and destructive actions.

## Tech Stack

### Client

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Base UI and shadcn/ui components
- Lucide React and React Icons
- Embla Carousel

### Authentication and data

- Better Auth
- MongoDB with Better Auth MongoDB adapter
- Express.js API server
- MongoDB database

## Project Structure

The project uses two applications:

- `studiospace/` — Next.js client application
- `studiospace-server/` — Express.js and MongoDB API server

## Local Setup

### Requirements

- Node.js 20 or newer
- npm
- MongoDB database

### 1. Start the API server

```bash
cd studiospace-server
npm install
```

Create a `.env` file in `studiospace-server/`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:

```bash
node index.js
```

The API server runs at `http://localhost:5000`.

### 2. Start the Next.js client

```bash
cd studiospace
npm install
```

Create a `.env` file in `studiospace/`:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Client Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## Main Routes

- `/` — Home page
- `/studios` — Explore studios
- `/studios/[id]` — Studio details and booking
- `/login` — Login
- `/signup` — Registration
- `/dashboard` — Host dashboard
- `/add-new-studio` — Add a studio listing
- `/my-studio-listings` — Manage studio listings
- `/my-bookings` — View personal bookings

## Examiner Test Credentials

Test credentials have not been added to this repository yet.

Add the examiner account details here before submission:

```text
Email: your-examiner-email@example.com
Password: your-examiner-password
```

Do not commit real secrets or private credentials to the repository.

## Notes

- Start the Express API server before opening pages that load studios, listings, bookings, or dashboard data.
- Keep `.env` files private and never commit them.
- The client and server are maintained as separate applications and repositories for submission.
