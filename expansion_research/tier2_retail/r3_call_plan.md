# R3 Tier-2 (retail + independent shops) — call plan + actuals

Date: 2026-07-15. Branch expansion/phase-0. HARD RULE for this run: **zero paid API
calls** (no DataForSEO, no Serper) — none made, no guard/.env touched. All paid keyword
enrichment deferred to DOSSIER.md "TODO — paid pulls".

## Planned calls (free sources only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| SERP sweep | DDG (free) | 35 buyer-intent queries, uk-en, num=10 | $0 |
| Autocomplete | Google suggest (free) | 25 seeds x (blank + a-z) = 675 | $0 |
| Fetch-verify | direct page fetches | multi-hit + hire-intent single-hit survivors | $0 |
| Sitemap crawl | direct fetches | 10 strongest SECTION rivals | $0 |
| Serper / DataForSEO | — | **none this run** | **$0** |

## Actuals (2026-07-15, this completed run)

| Item | Measured |
|---|---|
| DDG queries | 35/35 returned (10 results each) |
| Domains seen / survivors after estate+directory filter | 245 / 219 (1 estate domain hit — hollowaydavies.co.uk generalist ranking for "accountants for independent shops" — correctly dropped; 0 leaks in survivors, hard assert passed; 25 directory/info dropped) |
| Autocomplete queries / unique suggestions | 675 / 1,273 |
| Domain fetch-verifies | 108 (multi-hit + hire-intent single-hit; 79 fetched OK, 29 blocked/failed) |
| Verified rivals | 22 SECTION, **0 DEDICATED** (see COMPETITORS.md) |
| Sitemap crawls | 10/10 crawlable, 7,291 URLs |
| Topic pool | see topic_pool.json + DOSSIER.md (estate dedupe run vs 3,407-row augmented inventory incl. all 7 new expansion sites + ecommerce content) |
| Estate inventory note | raw/estate_blog_topics.json = tier1_care snapshot (2,035 rows) + 1,372 rows harvested this run from new site dirs (care, charities, crypto, ecommerce, hospitality, pharmacies, startups-tech, contractors-ir35, construction-cis: blog md titles/slugs + data/*.ts slugs+titles) |
| Paid calls | **0**, $0.00 |
