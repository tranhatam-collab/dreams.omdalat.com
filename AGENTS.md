<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dreams Ôm Đà Lạt — Developer Guide

## Quick Start
```bash
npm ci          # Install dependencies
npm run dev     # Start Next.js dev server
npm run build   # Production build (Next.js)
npm run cf:build # Production build for Cloudflare Workers
npm run deploy  # Build + deploy to Cloudflare Workers
npm run seed    # Seed remote D1 database
npm run migrate # Apply D1 migrations to remote
```

## Architecture
- **Framework:** Next.js 16 with App Router
- **Runtime:** Cloudflare Workers via @opennextjs/cloudflare
- **Database:** Cloudflare D1 (binding: `DREAMS_DB`)
- **Styling:** Tailwind CSS v4
- **Languages:** Vietnamese (canonical) + English
- **Deploy:** GitHub Actions → Cloudflare Workers (trigger: push to `master`)

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
