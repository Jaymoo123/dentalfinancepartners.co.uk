# R3 Tier-1 (manufacturing & engineering) — call plan + actuals

Date: 2026-07-12 (run started 2026-07-11 session). Branch expansion/phase-0. HARD RULE for
this run: **zero DataForSEO calls** — none made, and no spend guard was set, raised, or
touched (no process-local overrides either). All paid keyword enrichment deferred to
DOSSIER.md "TODO — paid pulls".

## Planned calls (free/quota sources only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| Serper probe | Serper google search | 1 query only (known out-of-credits estate-wide; do not burn attempts) | $0 expected (400) |
| SERP sweep | DDG (free) | 36 queries, uk-en, num=10 | $0 |
| Autocomplete | Google suggest (free) | 34 seeds × (blank + a-z), deduped | $0 |
| Fetch-verify | direct page fetches | all surviving domains, homepage + 1 mfg service page | $0 |
| Sitemap crawl | direct fetches | verified rivals | $0 |
| Citation check | direct fetches | 34 gov.uk / legislation.gov.uk / FRC / CH / ONS URLs | $0 |
| DataForSEO | — | **none this run** | **$0** |

## Actuals (this completed run)

| Item | Measured |
|---|---|
| Serper queries | **1 probe attempted, failed 400** (quota exhausted, matches care run); no further attempts. $0 spent. SERP evidence this run is DDG-only |
| DDG queries | 36/36 returned |
| Domains seen / survivors after estate+directory filter | 220 / 204 (2 estate domains dropped pre-verify — hollowaydavies.co.uk, propertytaxpartners.co.uk; hard assert passed, 0 estate leaks in survivors; 14 directory/info/gov dropped) |
| Autocomplete queries / unique suggestions | 918 / 3,958 |
| Domain fetch-verifies | 204 (4 chunks of 52, foreground; 150 fetched OK, 54 failed 403/202/0/SSRF → raw/verify_evidence.json) |
| Live web-search verifications | 9 rivals marked "search" in competitors.json (4 bot-blocked recoveries: lanop, pkf-francisclark, mha, pearllemonaccountants + williamsoncroft mangled-domain recovery + 5 search-surfaced additions: streets, hurst, azets, ljsaccountingservices, bsassociate) |
| Verified rivals | 38 (1 DEDICATED + 37 SECTION) |
| Sitemap crawls | 22 attempted, 21 crawlable, 12,651 URLs |
| Topic pool | see TOPICS.md derivation table (s5 → s5b measured counts) |
| Citation checks | **34/34 pass, 0 phrase misses** (4 initially-planned URLs 404ed — full-expensing guidance slug, CBAM consultation, FRC FRS 102 old path, EII scheme slug — remapped to live equivalents and re-fetched; final set all 200) |
| DataForSEO calls | **0**, $0 |
| **Total paid this task** | **$0.00** |
