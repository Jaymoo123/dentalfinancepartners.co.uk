# R3 Tier-2 (farmers and rural businesses) call plan + actuals

Date: 2026-07-15. Branch expansion/phase-0. HARD RULE for this run: **zero paid API
calls** (no Serper, no DataForSEO). No spend guard set, raised, or touched. All paid
keyword enrichment deferred to DOSSIER.md "TODO: paid pulls".

## Planned calls (free sources only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| SERP sweep | DDG (free, via ddgs) | 35 queries, uk-en, num=10 | $0 |
| Autocomplete | Google suggest (free) | 25 seeds x (blank + a-z) = 675 | $0 |
| Fetch-verify | direct page fetches | all 170 surviving domains, homepage + 1 farming page | $0 |
| Web-search recovery | Claude WebSearch (free tool) | key bot-blocked rivals | $0 |
| Sitemap crawl | direct fetches | 20 verified rivals | $0 |
| Serper / DataForSEO | none | **0 calls** | **$0** |

## Actuals (2026-07-15, this completed run)

| Item | Measured |
|---|---|
| DDG queries | 35/35 returned (10 results each) |
| Domains seen / survivors after estate+directory filter | 191 / 170 (1 estate leak dropped, hard assert passed; 20 directory/info dropped) |
| Autocomplete queries / unique suggestions | 673 / 2,381 |
| Domain fetch-verifies | 170 (raw/verify_evidence.json); ~28 bot-blocked or unreachable |
| Web-search classifications | 6 rivals recovered by search (Butler & Co, Chavereys, Albert Goodman, PKF Francis Clark, Green & Co, Old Mill confirm) |
| Verified rivals | 56 (12 DEDICATED + 44 SECTION); 15 left UNVERIFIED_BOT_BLOCKED |
| Sitemap crawls | 20 attempted, 16 crawlable, ~7,600 URLs |
| Topic pool | 2,118 raw terms kept -> 1,422 page-level clusters (0 exact estate dupes vs 8 corpora query CSVs) |
| Paid API calls | **0**, $0 |
| **Total paid this task** | **$0.00** |
