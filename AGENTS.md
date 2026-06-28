<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dreams Ôm Đà Lạt — Developer Guide

## Quick Start
```bash
npm run seed    # Seed database (admin user + programs)
npm run dev     # Start dev server on localhost:3456
npm run build   # Production build
npm run start   # Start production server
```

## Architecture
- **Framework:** Next.js 16 with App Router
- **Database:** SQLite via better-sqlite3 (`data/dreams.db`)
- **Styling:** Tailwind CSS v4
- **Languages:** Vietnamese (canonical) + English

## Routes
- `/vi/*` — Vietnamese pages
- `/en/*` — English pages
- `/admin/*` — Admin dashboard
- `/api/*` — REST API

## Admin Access
- URL: `/admin/login`
- Default: `admin@dreams.omdalat.com` / `admin123`

## Key Files
- `docs/DREAMS_OMDALAT_FOUNDER_LOCK_AND_DEV_MASTER_SPEC_2026.md` — Full spec
- `src/data/site.ts` — Site data (nav, programs, intents)
- `src/lib/db.ts` — Database schema & connection
- `src/lib/session.ts` — Admin session management
- `src/app/vi/uoc-mo-cua-toi/page.tsx` — Dream submission form
- `src/app/api/dreams/route.ts` — Dream submission API

## Build Rules
- No CSS or JS comments
- No emoji in production content
- No false promises about dreams
- Story default: private
- Data transfer requires field-level consent
