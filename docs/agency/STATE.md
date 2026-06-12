# Agency (Agency Founder Finance) — site state

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** agencyfounderfinance.co.uk · Vercel project `agency-founder-finance` · site_key `agency` · repo dir `digital-agency/` (NOTE: Supabase `sites.content_dir` says "Digital Agency/..." with a space; the on-disk dir is `digital-agency/` — tooling normalises this).

## Corpus + structure (as of 2026-06-12)

- Blog + fundamentals sections (`digital-agency/web/content/blog` + `content/fundamentals`; ~315 mapped slugs). UK + UAE/Dubai founder topics.
- Nurture engine composed but DORMANT (collect-only). Legacy DeepSeek title pipeline (`digital-agency/pipeline/title_optimise.py`) is RETIRED — do not reuse its LLM calls (Opus-only rule).

## Search/optimisation state

- **Data**: GSC live since 2026-04-15 (sc-domain) + Bing flowing. Young-site volumes: 90d at 2026-06-12 = 828 impressions, 0 clicks, 20 pages with any data.
- **SERP meta program batch 1 (2026-06-12)**: 30 pages re-titled/re-described from fresh 90d GSC + Bing query data, deployed + IndexNow'd, 90-day regression watch in `monitored_pages` (to 2026-09-10). Several pre-existing truncated/corrupted metaTitles fixed in passing. Engine: `docs/_engines/SERP_META_PROGRAM.md`. 28d verdicts via weekly_run from ~2026-07-10.
- **Content-gap follow-ups**: `docs/agency/opportunity_register_meta_2026-06-12.md` (register only).

## Known pending

- Stale BADR 10% spots inside `earn-out-tax-treatment-hmrc-agency-sale` and `selling-agency-tax-implications` bodies (operative statements say 14%, a couple of older in-body mentions still say 10%) — flagged during meta batch 1, queued for the FA-2026 stale-figure sweep.
- GA4 not configured for this site (first-party analytics runs).
- Net-new/rewrite content programs: not yet onboarded (see `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`).
