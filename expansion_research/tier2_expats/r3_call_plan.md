# R3 Tier-2 (expats + non-residents), call plan + actuals

Date: 2026-07-15. Branch expansion/phase-0. HARD RULE for this run: **zero paid API
calls**, no DataForSEO, no Serper (credits exhausted estate-wide, none attempted),
no spend guard touched. All paid keyword enrichment deferred to DOSSIER.md
"TODO, paid pulls".

## Planned calls (free sources only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| SERP sweep | DDG (free) | 34 buyer-intent queries, uk-en, num=10 | $0 |
| Autocomplete | Google suggest (free) | 25 seeds x (blank + a-z) | $0 |
| Fetch-verify | direct page fetches | all survivors, homepage + 1 expat service page | $0 |
| Sitemap crawl | direct fetches | top dedicated rivals | $0 |
| Serper / DataForSEO | none | **none this run** | **$0** |

## Actuals (2026-07-15, this completed run)

| Item | Measured |
|---|---|
| DDG queries | 34/34 returned (1 retried once) |
| Domains seen / survivors after estate+directory filter | 207 / 192 (1 estate hit propertytaxpartners.co.uk dropped at filter, **0 leaks, hard assert passed**; 14 directory/info dropped; 2 survivors were SERP-redirect junk strings) |
| Autocomplete queries / unique suggestions | 675 / 2,918 |
| Domain fetch-verifies | 192 (raw/verify_evidence.json); ~13 strategic bot-blocked domains classified from their own DDG SERP titles/snippets (verify_method=serp in competitors.json) |
| Verified rivals | 53 (25 DEDICATED + 28 SECTION) + 16 adjacent players mapped |
| Sitemap crawls | 14 attempted, 12 crawlable, 2,176 URLs |
| Topic pool | 3,310 raw -> 2,907 kept (10 exact + 29 fuzzy estate dupes dropped, all NRL-cluster terms already on the property site) -> 2,851 final keywords -> 1,909 page-level clusters (160 property-adjacent flagged) |
| DataForSEO / Serper calls | **0**, $0 |
| **Total paid this task** | **$0.00** |
