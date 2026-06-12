# Generalist (Holloway Davies) — site state

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** www.hollowaydavies.co.uk · Vercel project `holloway-davies` · site_key `generalist` · brand: distinct generalist design system (off-white + ink + orange, Geist Sans), james-holloway byline.

## Corpus + structure (as of 2026-06-12)

- ~322 blog posts + fundamentals section (`generalist/web/content/blog` + `content/fundamentals`; 383 mapped slugs), 193 city pages, 7 PDF templates, `/blog/stage/*` navigation.
- Keyword intel: 199 topics in the blog_topics pool (config prompts still carry agency→generalist rewrite TODO).
- Experiments: `calc_promo_inline` LIVE (first generalist experiment, both arms verified in prod). Nurture engine composed but DORMANT (collect-only).

## Search/optimisation state

- **Data**: GSC + Bing query data flowing to Supabase. NOTE: GSC was never ingested for this site until 2026-06-12 (the table had 2 rows); always check ingestion recency before judging "no demand".
- **SERP meta program batch 1 + tail (2026-06-12)**: 61 pages re-titled/re-described from fresh 90d GSC + Bing query data (39 batch-1 + 22 tail covering every page ≥8 combined impressions), deployed + IndexNow'd, 90-day regression watch in `monitored_pages` (to 2026-09-10). Engine: `docs/_engines/SERP_META_PROGRAM.md`. 28d outcome verdicts via weekly_run from ~2026-07-10.
- **Factual corrections shipped same day**: `confirmation-statement-late-penalty-companies-house` fully rewritten (page wrongly presented annual-accounts penalty bands as CS01 fines; GOV.UK-verified rewrite). AMAP 45p→55p (FA 2026, from 6 Apr 2026) corrected on `employee-mileage-45p-tax-free-rules` (rewritten, GOV.UK-verified), `can-i-claim-mileage-limited-company-director` and `accountant-for-delivery-drivers-uk` (back-patched incl. recomputed worked examples).
- **Content-gap follow-ups**: `docs/generalist/opportunity_register_meta_2026-06-12.md` (register only, no edits yet — 92 entries).

## Known pending

- Wider FA-2026/AMAP stale-figure sweep across the rest of the corpus (estate-wide deferred workstream; this site has had only the 3 pages above corrected).
- Net-new/rewrite content programs: not yet onboarded for this site (see `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`).
