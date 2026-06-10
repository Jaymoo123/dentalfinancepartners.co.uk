# Holloway Davies

UK generalist accountancy lead-gen site. ICAEW chartered accountants for limited companies, contractors, sole traders, partnerships and small businesses. National coverage, fixed fees.

Production: https://www.hollowaydavies.co.uk

## Structure

```
generalist/
â”œâ”€â”€ web/                Next.js 15 App Router site (Vercel deploy root)
â”œâ”€â”€ pipeline/           Python content + SEO automation (DeepSeek, Supabase, Pexels, IndexNow)
â”œâ”€â”€ scripts/            One-off Node/Python helpers (brand assets, PDF templates, illustrations)
â”œâ”€â”€ seo-research/       Keyword + competitor research outputs (CSVs, briefs)
â”œâ”€â”€ supabase/           Per-niche SQL: newsletter_subscribers, blog_topics_generalist
â””â”€â”€ niche.config.json   Brand, nav, footer, lead form schema (loaded at runtime by web/)
```

## Web app

```
cd web
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Required env vars in `web/.env.local`:

- `NEXT_PUBLIC_SITE_URL` â€” canonical domain (no trailing slash)
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` â€” lead form writes
- `SUPABASE_SERVICE_ROLE_KEY` â€” newsletter subscriber writes (server-side only)
- `RESEND_*` â€” optional; if absent, newsletter signups are stored as `confirmed` directly

## Content pipeline

Bulk blog generation runs against Supabase queue (`blog_topics_generalist`):

```
python pipeline/bulk_generate.py
python pipeline/fix_cannibalisation.py
python pipeline/quality_spotcheck.py
```

City pages, glossary, guides, industry verticals and comparison pages each have their own generator under `pipeline/`.

## Editorial

- Author byline: Emma Carter (Editorial Lead)
- Technical reviewer byline: James Holloway, ICAEW Chartered Accountant
- Every published article carries the reviewer credit and an editorial-content disclosure
- Concrete tax advice is delivered via book-a-call with a qualified accountant on the partner team, never via published articles

## Lead form

Posts to Supabase `leads` table with `source: "generalist"` (the canonical site key, D2 revised 2026-06-10; legacy `'general'` remains CHECK-valid for in-flight compatibility — see `supabase/migrations/20260610000001`).

## Deployment

Vercel project root: `web/`. Framework preset must be set to Next.js explicitly via API or all routes silently 404.
