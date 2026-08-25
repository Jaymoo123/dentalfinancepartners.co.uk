# Agency Founder Finance

Next.js 15 App Router site for a UK + UAE specialist accountancy firm working with agency founders.

## Structure

```
.
├── web/             # Next.js app (this is the Vercel root)
├── pipeline/        # Python content generation scripts
├── seo-research/    # Keyword research, competitor analysis, topic taxonomies
├── niche.config.json # Site brand, navigation, lead form config
└── .env.example     # Environment variable template
```

## Deployment (Vercel)

The site auto-deploys from `main` via the GitHub→Vercel integration.

### Vercel project settings

- **Root Directory**: `web`
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build` (default)
- **Install Command**: `npm install` (default)
- **Output Directory**: `.next` (default)
- **Node Version**: 18+ (default)

### Required environment variables (Vercel UI)

| Variable | Where to find | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings → API | Public URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings → API | Public anon key |
| `NEXT_PUBLIC_SITE_URL` | Hardcode | `https://www.agencyfounderfinance.co.uk` |

Optional (set when you have them):

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `RESEND_API_KEY` | Email delivery for guide downloads |

### Local development

```bash
cp .env.example .env
# Fill in the variables
cd web
npm install
npm run dev
```

## Python content pipeline (runs locally only)

The Python scripts in `pipeline/` generate blog posts, fundamentals pillars, images, and
research artefacts. They run on your laptop, not on Vercel.

Required env vars (in `.env` at the repo root):

- `DEEPSEEK_API_KEY` — content generation
- `PEXELS_API_KEY` — hero images
- `SERPER_API_KEY` — SERP research
- `SUPABASE_URL` + `SUPABASE_KEY` (service role) — topic queue

```bash
python pipeline/generate_blog_supabase.py   # generate one post
python pipeline/seed_topics.py              # seed initial topic queue
python pipeline/serper_mine.py              # mine competitor SERPs
python pipeline/dubai_research.py           # Dubai vertical research
```

## What's built

- 187+ blog posts across 9 categories
- 9 pillar guides (Fundamentals vertical)
- 14 agency-type landing pages
- 7 UK city pages (LocalBusiness schema)
- 5 calculators (salary-dividend, R&D credit, BADR, agency valuation, VAT scheme)
- 25 glossary entries
- 10 composite founder stories
- 5 relocation destinations (Dubai, Portugal, Cyprus, Spain, Singapore)
- 4 lead-magnet guides (with email gate + download page)
- 3 audience-stage pages (new founders / growth / pre-exit)
- 3 competitor comparison pages (Mazuma, Crunch, generalist)
- /free-health-check, /r-and-d-credits commercial landing pages

## Schema

Auto-generated per page:

- `BlogPosting` for blog posts
- `Article` for pillars and founder stories
- `FAQPage` everywhere FAQs appear
- `BreadcrumbList` on every page
- `Organization` on homepage
- `LocalBusiness` + `AccountingService` on city pages
- `Service` on commercial landing pages
- `DefinedTerm` on glossary entries

## Tax accuracy

All content uses 2025/26 UK tax figures:

- BADR: 14% (rising to 18% on 6 April 2026), £1M lifetime limit
- CGT main rate (non-residential): 18% basic, 24% higher
- Corporation tax: 19% small / 25% main, marginal relief £50k-£250k
- Dividend tax 2026/27: 10.75% / 35.75% / 39.35% (FA 2026 s.4)
- Dividend allowance: £500
- VAT threshold: £90,000 (from 1 April 2024)
- MTD ITSA: April 2026 for £50k+, April 2027 for £30k+

Future regenerations use the same figures (set in `pipeline/config_supabase.py` system prompts).
