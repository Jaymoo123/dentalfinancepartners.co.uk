# R3 Tier-2 (FCA-regulated firms) call plan + actuals

Date: 2026-07-15. Branch expansion/phase-0. HARD RULE for this run: zero paid API calls
(no Serper, no DataForSEO). No guard or .env changes. All paid keyword enrichment
deferred to DOSSIER.md "TODO paid pulls".

## Planned calls (free only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| SERP sweep | DDG (free) | 32 buyer-intent queries, uk-en, num=10 | $0 |
| Autocomplete | Google suggest (free) | 24 seeds x (blank + a-z) | $0 |
| Fetch-verify | direct page fetches | all survivors, homepage + 1 FCA service page | $0 |
| Sitemap crawl | direct fetches | 12 dedicated/strong-section rivals | $0 |

## Actuals (2026-07-15)

| Item | Measured |
|---|---|
| DDG queries | 32/32 returned (1 retried once) |
| Domains seen / survivors | 221 / 206 (0 estate leaks, hard assert passed; 15 directory/regulator dropped) |
| Autocomplete queries / unique suggestions | 648 / 1,860 |
| Domain fetch-verifies | 206 (3 resumable chunks, raw/verify_evidence.json) |
| Verified rivals | 2 DEDICATED + 17 SECTION accountancy; SERPs dominated by compliance consultancies / law firms / regtech (see COMPETITORS.md) |
| Sitemap crawls | 12 attempted, 11 crawlable, ~9,970 URLs |
| Topic pool | 1,440 raw -> 1,382 kept (0 estate dupes) -> 1,258 final keywords -> 845 page-level clusters (volumes null, no paid pulls) |
| Paid API calls | 0, $0.00 |
