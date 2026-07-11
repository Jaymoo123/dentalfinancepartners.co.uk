# R3 Tier-1 (care homes + domiciliary care) — call plan + actuals

Date: 2026-07-11. Branch expansion/phase-0. HARD RULE for this run: **zero DataForSEO
calls** — none made, and no spend guard was set, raised, or touched (no process-local
overrides either). All paid keyword enrichment deferred to DOSSIER.md "TODO — paid pulls".

## Planned calls (free/quota sources only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| SERP sweep | Serper google search | 36 queries, gl=gb, num=10 | Serper quota (~$0.001/query) |
| SERP sweep | DDG (free) | same 36 queries, uk-en | $0 |
| Autocomplete | Google suggest (free) | 33 seeds × (blank + a-z) = 891 | $0 |
| Fetch-verify | direct page fetches | all surviving domains, homepage + 1 care service page | $0 |
| Sitemap crawl | direct fetches | verified rivals | $0 |
| Citation check | direct fetches | 34 gov.uk / legislation / CQC / UKSC / CH / SfC URLs | $0 |
| DataForSEO | — | **none this run** | **$0** |

## Actuals (2026-07-11, this completed run)

| Item | Measured |
|---|---|
| Serper queries | 36 attempted, **36/36 failed 400 "Not enough credits"** (account quota exhausted; reproduced with a direct API call). $0 spent. SERP evidence this run is DDG-only |
| DDG queries | 36/36 returned |
| Domains seen / survivors after estate+directory filter | 207 / 180 (0 estate leaks, hard assert passed; 27 directory/info dropped; 5 survivors were SERP-redirect junk strings) |
| Autocomplete queries / unique suggestions | 891 / 1,716 |
| Domain fetch-verifies | 175 (4 resumable chunks → raw/verify_evidence.json) |
| Live web-search verifications | 13 rivals marked "search" in competitors.json (8 bot-blocked recoveries + 5 search-surfaced additions) |
| Verified rivals | 41 (12 DEDICATED + 29 SECTION) |
| Sitemap crawls | 22 attempted, 17 crawlable, 8,845 URLs |
| Topic pool | 1,296 raw → 1,184 kept (0 estate dupes) → 1,049 final keywords → 659 page-level clusters |
| Citation checks | re-run fresh this session: **34/34 pass, 0 failing** (a prior session had remapped 3 broken URLs — 2 CQC 404s, 1 MTD phrase-miss; this run confirms the fixed set live) |
| DataForSEO calls | **0**, $0 |
| **Total paid this task** | **$0.00** |
