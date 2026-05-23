# Wave 5 SERP Corpus Delta (Wave 4 → 2026-05-23)

Date: 2026-05-23
Sub-agent: serp_runner re-run + delta per NETNEW_PROGRAM §3 inter-wave queue item 2
Query set: 83 queries (same as Wave 4, pulled from `competitor_serps` `fetch_date='2026-05-21'`)
Source data: Supabase `competitor_serps` + `competitor_pages`; fresh rows written at `fetch_date='2026-05-23'`

## Method

`serp_runner.py` itself is GSC-driven (it picks each page's highest-impressions query from the trailing 28-day GSC window) and would *not* deterministically re-fetch the same 83 queries that populated Wave 4. To preserve corpus-comparability per the manager's safety constraint ("DO NOT modify the 83-query corpus list itself"), this sub-agent:

1. Pulled the 83 distinct queries from `competitor_serps WHERE site_key='property' AND fetch_date='2026-05-21'` (the Wave 4 snapshot).
2. Re-fetched each through `optimisation_engine.clients.ddg_serp_client.fetch_organic_results` (DuckDuckGo `uk-en`, the same client the production `serp_runner.py` uses). Note: the codebase nominally references Serper credentials, but `serp_runner.py` actually imports `fetch_organic_results` from `ddg_serp_client.py`; SERPER_API_KEY is present in `.env` but unused by this path.
3. Inserted fresh `competitor_serps` + `competitor_pages` rows tagged `fetch_date='2026-05-23'`, idempotent via the `(site_key, query, fetch_date)` unique index.
4. Computed the delta against `fetch_date='2026-05-21'`.

Run log: `docs/property/wave5_serp_rerun_log_2026-05-23.txt`.
Compute log: `docs/property/wave5_serp_delta_compute_log_2026-05-23.txt`.
Categorisation log: `docs/property/wave5_new_domains_categorised_2026-05-23.txt`.

## Summary

| Metric | Wave 4 (2026-05-21) | Today (2026-05-23) | Delta |
|---|---:|---:|---:|
| Distinct queries | 83 | 83 | 0 (same corpus, as required) |
| Distinct domains | 274 | 299 | +25 (net); 182 new appeared, 157 dropped |
| Distinct competitor URLs | 363 | 388 | +25 (net); 279 net-new URLs |
| URLs present in both snapshots | 96 | 96 | — |
| Movements ≥3 ranks on common URLs | — | — | 1 |

- New competitor URLs: 279 (URLs not in the Wave 4 capture)
- New competitor domains: 182 raw / 154 specialist after filter rules
- Position movements (≥3 ranks, top 10): 1 query
- Recommended additions to property competitor universe: 11 high-priority specialist domains (see below)

**Read on the high churn:** DDG's UK-en organic results show substantial day-to-day variation even when the underlying query set is fixed. The 157-domain "drop" between the two snapshots is mostly tail-position turnover (positions 4-5), not domains genuinely disappearing from the property niche. The signal we care about is the 11 specialist domains that surfaced at position 1-3 across one or more queries — those are real additions to the competitive set.

## Recommended additions to property competitor universe (specialist, position ≤3, ≥1 query)

Top-tier candidates (multi-query OR top-position):

| Domain | Apps | Best pos | Distinct queries | First seen on | Notes |
|---|---:|---:|---:|---|---|
| **landlordstudio.com** | 4 | 2 | 4 | selling a rental property | Landlord property-mgmt SaaS with detailed landlord-tax content. Multi-query coverage; UK-targeted. Strong addition. |
| **togetheraccounting.co.uk** | 2 | 1 | 2 | portfolio incorporation guidance | UK property-accountant firm; specialist BTL/incorporation content. Direct competitor. |
| **leonandcompany.co.uk** | 2 | 1 | 2 | rental property tax accountant | UK accountancy firm with landlord-tax pillar content. Direct competitor. |
| **protax.org.uk** | 2 | 1 | 2 | hmrc cgt reporting deadlines 2026 | UK tax-specialist firm with current-year CGT deadline content. Direct competitor. |
| **1stformations.co.uk** | 2 | 1 | 2 | hmrc self assessment non resident landlord | UK company-formations site with strong non-resident landlord + SPV content. Cross-category but real competitor for SPV/incorporation queries. |
| **protaxaccountant.co.uk** | 2 | 2 | 2 | vat on rental income hmrc | UK tax-accountant firm. Direct competitor. |
| **crunch.co.uk** | 2 | 3 | 2 | vat on rental income hmrc | Major UK online accountant; cross-category but ranks for landlord-tax queries. |
| **taxassist.co.uk** | 2 | 3 | 2 | rental property tax accountant | UK franchised accountancy network. Big surface area; cross-category competitor. |
| **mondaq.com** | 2 | 3 | 2 | incorporating a property portfolio uk | Legal/tax briefings aggregator publishing UK property-tax analyses. Authority-adjacent. |
| **thomsoncooper.com** | 2 | 5 | 2 | property tax advice | UK accountancy firm. Lower position but consistent appearance. |
| **kletta.com** | 1 | 1 | 1 | mtd deadline 2026 | MTD-software/landlord-compliance entrant; new UK product. MTD-cluster signal worth tracking. |

Second-tier (single-query but ranked #1, worth annotating in v2 universe but not necessarily working set):

`alexander.co.uk`, `benhams.com`, `blog.taxadvisorypartnership.com`, `churchillwealthmanagement.co.uk`, `hawesandco.co.uk`, `ibissandco.com`, `mmba.co.uk`, `muve.me.uk`, `optimiseaccountants.co.uk`, `qualitycompanyformations.co.uk`, `rayneressex.com`, `rodgerstaxation.co.uk`, `shawbrook.co.uk`, `upad.co.uk`, `yourliverpoolaccountants.co.uk` — each appeared once at position 1 on a single query. Likely tail churn rather than persistent competitors; flag for next re-run.

## New competitor URLs (existing domains, top-10 appearances)

279 net-new URLs across the corpus. The full list is queryable via:

```sql
SELECT cs.query, cp.url, cp.domain, cp.position
FROM competitor_pages cp
JOIN competitor_serps cs ON cp.serp_id = cs.id
WHERE cs.site_key='property' AND cs.fetch_date='2026-05-23'
  AND cp.url NOT IN (
    SELECT cp2.url FROM competitor_pages cp2
    JOIN competitor_serps cs2 ON cp2.serp_id = cs2.id
    WHERE cs2.site_key='property' AND cs2.fetch_date='2026-05-21'
  )
ORDER BY cp.position, cs.query;
```

Not enumerated inline (volume) — the table is the right consumer for Stage 1 candidate discovery in Wave 5.

## Position movement on tracked URLs (>3-rank changes)

Of the 96 URLs present in both snapshots, only **one** moved ≥3 ranks:

| URL | Query | Wave 4 pos | 2026-05-23 pos | Direction |
|---|---|---:|---:|---|
| https://www.tlpi.co.uk/insights/essential-tax-planning-needed... | property portfolio tax planning | 4 | 1 | UP (-3) |

Movement signal is muted — DDG's ranking is reasonably stable over 2 days on this query set, so most of the visible delta is *new* tail-position entrants rather than *re-ranking* of incumbents. This is expected on a 2-day cadence; the 7-day cadence proposed in NETNEW_PROGRAM §3 will likely surface more.

## Recommendation

**Yes, expand the competitor universe.** Add the 11 top-tier specialist domains listed above to the v2-of-243 working set. Of those, the strongest cases are `landlordstudio.com` (4 appearances, multi-cluster: BTL, MTD, selling, mgmt), `togetheraccounting.co.uk`, `leonandcompany.co.uk`, and `protax.org.uk` — each ranked #1 on one or more property-accountancy or CGT-deadline queries and didn't appear at all in the Wave 4 snapshot. Recommend annotating these as KEEP / direct competitor in `competitor_universe_v2.md` before Wave 5 Stage 1 candidate discovery runs, so their content is in scope for the gap analyser.

The single position movement (`tlpi.co.uk` +3 on "property portfolio tax planning") does not warrant any tracked-URL content review at this point.

**Next cadence:** continue the 7-day re-run per NETNEW_PROGRAM §3. Over 3-4 weeks the working domain set should stabilise as tail-position churn averages out and persistent specialists are surfaced repeatedly.

**Out-of-scope flag (not addressed in this pass):** the 83-query corpus itself is narrow vs. the 285-net-new + 231-legacy program scope. Widening the *query* set is a separate decision (per manager safety constraint) and would require a brief on which clusters to expand (VAT, IHT, LtdCo + FIC, location-grid) before re-running.
