# Bend Golf Trip 2026

Tiny mobile-first webapp for a 4-guy golf trip: itinerary, team cup, solo leaderboard, score entry.

**Teams**: Curry/Lamb vs McDonald/Prather
**Dates**: June 8–14, 2026 (Sunriver, OR)

## Stack

- Next.js (App Router) + Tailwind
- Supabase (realtime Postgres)
- Deployed to Vercel (free tier)

## One-time setup

### 1. Supabase project (free)

1. Create an account at https://supabase.com and make a new project.
2. In the dashboard → **SQL Editor**, paste and run `supabase/schema.sql`.
3. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key

### 2. Local env

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase
- `NEXT_PUBLIC_TRIP_PIN` — any group PIN (e.g. `2026`). Leave blank to skip the gate.

### 3. Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add the three `NEXT_PUBLIC_*` env vars in Vercel project settings.
4. Deploy. Share the `*.vercel.app` URL + PIN with the group.

## Using the app

- **Home** — countdown, today's plan, live leaderboards
- **Plan** — full day-by-day itinerary + round list
- **Cup** — team cup holes + match history
- **Solo** — solo championship points + per-round podiums
- **Scores** — enter results after each round (team winner or solo 1/2/3)
- **House** — shared notes: address, Wi-Fi, door code, room assignments

Realtime: every phone updates instantly when anyone enters a score.

## Notes

- No real auth. The PIN is a soft gate — treat the anon key + app URL as "shared group credentials". Don't put anything sensitive in the house notes.
- To change team assignments or add courses, edit `lib/data.ts`.
