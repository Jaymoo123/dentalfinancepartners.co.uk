# R3 Tier-1 (ecommerce / Amazon sellers) — call plan + actuals

Date: 2026-07-12 (run started 2026-07-11 session). Branch expansion/phase-0. HARD RULE for
this run: **zero DataForSEO calls** — none made, and no spend guard was set, raised, or
touched (no process-local overrides either). Serper known out of credits estate-wide from
the care run: plan limited to a SINGLE probe call. All paid keyword enrichment deferred to
DOSSIER.md "TODO — paid pulls".

## Planned calls (free/quota sources only)

| Call | Endpoint | Params | Cost |
|---|---|---|---|
| SERP probe | Serper google search | 1 query only ("ecommerce accountant"), gl=gb, num=10 | ~$0.001 if credits existed |
| SERP sweep | DDG (free) | 36 queries, uk-en | $0 |
| Autocomplete | Google suggest (free) | 36 seeds × (blank + a-z) = 972 | $0 |
| Fetch-verify | direct page fetches | all surviving domains, homepage + 1 ecommerce service page | $0 |
| Sitemap crawl | direct fetches | verified rivals + SaaS content arms | $0 |
| Citation check | direct fetches | gov.uk / legislation.gov.uk / CH / ONS URLs | $0 |
| DataForSEO | — | **none this run** | **$0** |

## Actuals (this completed run)

| Item | Measured |
|---|---|
| Serper queries | **1 probe attempted, failed 400** (account out of credits, consistent with the care run's 36/36 failures). Remaining 35 Serper calls NOT attempted by design. $0 spent. SERP evidence this run is DDG-only |
| DDG queries | 36/36 returned |
| Domains seen / survivors after estate+directory filter | 179 / 160 (**1 estate leak caught by the hard gate: hollowaydavies.co.uk** — our generalist site ranks in this niche's SERPs; 18 directory/info dropped) |
| Autocomplete queries / unique suggestions | 972 / 2,688 |
| Domain fetch-verifies | 160 attempted → 129 fetched OK, 31 failed (403/202/DNS), resumable (`raw/verify_evidence.json`) |
| Live web-search verifications | **9** rivals marked "search" in competitors.json (yourecommerceaccountant, elver, e-accounts, ecommaccountant, theaccountancy, tax-wise, archimedia, gmprofessional + search-surfaced addition ecommerceaccountants.uk). Checker note 2026-07-12: elver's block was transient, it now fetches directly with matching evidence |
| Verified rivals | **82 (14 DEDICATED + 47 SECTION + 21 ADJACENT)** — adjacent tier mapped formally for the first time because the SaaS/tool layer is the strongest content competition in this niche |
| Sitemap crawls | 22 attempted, 17 crawlable, 7,418 URLs |
| Topic pool | 4,163 raw → 3,894 kept (1 exact + 11 fuzzy estate dupes, all generalist-ecommerce collisions; 257 norm-merges) → 3,160 final keywords (−734 junk) → 2,331 page-level clusters; 40 kept terms flagged `estate_conflict` vs the 6 live generalist ecommerce pages |
| Citation checks | **32/32 pass, 0 failing, all anchor phrases found** (1 URL remapped mid-run: gov.uk OSS-Union register page 404 → the live NI-distance-sales register page; both attempts recorded in this file + raw/citation_checks.json is the passing set) |
| DataForSEO calls | **0**, $0, guard untouched |
| **Total paid this task** | **$0.00** |
