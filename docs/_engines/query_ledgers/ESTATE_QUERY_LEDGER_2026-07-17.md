# Estate Query Ledger — Roll-up, 2026-07-17

Per-query, per-page, per-site position across the 7 older sites. Built by `optimisation_engine/analysis/query_ledger.py` from fresh GSC page×query×date pulls (through 2026-07-15) + Bing snapshots (pulled today), verified against independent date-dimension totals, then LLM-reviewed page by page (per-site ledgers in this directory). All actions are prescriptions awaiting approval; nothing has been applied.

## Method notes that matter when reading the ledgers

- **Sampling loss is large and now quantified**: the query dimension hides 24-83% of impressions per site (GSC privacy thresholding). Ledger numbers are floors, not totals; each ledger header carries its site's figure. Page-dimension totals were merged in so query-invisible pages still appear.
- **Expected-CTR-by-position curve** (pooled estate, branded/nav excluded) now replaces hard CTR thresholds — a first for this repo; meta_fix calls mean "observed CTR under half of expected at that position".
- **Holds are data-driven**: any page first impressed within 28 days is automatically held for ranking maturation, plus SERP-meta batch-2 (closes 2026-08-05) and property conversion surfaces (miniform watch, closes 2026-08-06). 230 pages held estate-wide.

## Action totals (post-LLM review)

| Site | pages | hold | meta_fix | expand | refresh | consolidate* | new-page targets | healthy | thin/no-action |
|---|---|---|---|---|---|---|---|---|---|
| property | 773 | 27 | 4 | 4 | 1 | 27 | 2 clusters | 158+102 | 410 |
| dentists | 34 | 4 | 1 | 4 | 2 | 3 | head cluster→homepage | 7 | 18 |
| solicitors | 171 | 81 | 1 | 2 | 1 | 5 | 2 | 28 | 52 |
| medical | 13 | 4 | 0 | 0 | 0 | 0 | 0 (all→homepage) | 6 | 3 |
| generalist | 553 | 114 | 5 | 8 | 6 | 21 | 2 (St Albans, Cannock) | 121 | 278 |
| agency | 40 | window | 0 | 2 | 2 | 0 | 0 genuine | 10 | 28 |
| construction-cis | 72 | 0 | 0 | 1 | 0 | 3 (disputed) | 1 future | 18 | 50 |

*consolidate_candidate = owner-approval-required under the data-gated-consolidation rule; several were overturned in review (see disagreements in each ledger).

## Cross-site priority ordering

**Tier 1 — the money-page pattern (biggest structural finding).** On dentists, solicitors and medical, the head commercial family lands on homepage/services pages ranking pos 30-80 with ~0 clicks while blogs rank fine. The prescription everywhere is the corepage engine, NOT new pages (new pages would cannibalise):
1. Solicitors `/services` corepage rewrite + fold `/contact`'s striking-distance rankings ("accountant for lawyers" pos 18-22) into it — the single clearest core-page win on the estate.
2. Dentists homepage corepage run — 4,837 impressions of head terms at pos 32-76, 1 click.
3. Medical homepage — blocked on Google indexing recovery first (07-20/08-03 verdicts); prime target after.

**Tier 2 — cheap click wins (meta passes on ranking pages).**
4. Property CGT meta pass: three pages, ~3,500 impressions at pages 1-2, 3 clicks total.
5. Generalist CGT-reporting-2026 meta_fix (pos 11-16 Google, pos 5-7 Bing, near-zero clicks) + the 4 other Bing-page-1 meta fixes.
6. "stamp duty scotland" pos 1.0 / 0 clicks snippet fix (property).

**Tier 3 — expand plays with measured demand.**
7. Generalist construction-accounting-software refresh/expand — 3,678 impressions, 0 clicks, absorbs ~750 unowned impressions.
8. Property landlord-software cluster (2 expands + 1 decision page, ~870 impressions at pos 38-72).
9. Construction-cis `/for/roofers` expand (351 impressions pos 16-22 — page exists, audit's "no target page" was wrong).
10. Solicitors client-account-reconciliation expand (core SRA topic at half its cluster's depth).

**Tier 4 — genuine new-page targets (short list; most "unowned" demand was actually owned).**
11. Property: LBTT non-residential rates 2026/27 (~500+ sampled impressions hitting a residential guide).
12. Generalist: /locations/st-albans (~660 impressions, no page), then Cannock (~217).
13. Solicitors: client-money-in-business-account; barrister-accountants-near-me.

**Tier 5 — hygiene surfaced by the ledgers (small, factual, manager-direct).**
14. Dentists flat-URL 301 batch (5 legacy /blog/{slug} URLs currently 404 with ~200 impressions).
15. Agency AIA page: stale 2024-25 title + WDA 18%→14% + missing 40% FYA (after window closes 07-22+).
16. Generalist p11d-company-car-fuel page stale NIC (adds to the known 22-file sweep).
17. Add "djh business advisers limited" (and similar) to noise_filter — it alone drove 3 false property consolidation flags.

## Consolidation candidates for owner approval

56 pages flagged estate-wide, but review overturned many (junk-query-driven, URL variants, already-redirected, local-intent misreads, young-site prematurity). The surviving credible clusters, all needing your approval under the data-gated rule: property Companies House cluster (8 pages, one query), property FHL-sunset trio, property ATED pairs, property landlord-insurance trio, dentists goodwill legacy/canonical pair, solicitors valuation pair (how-to-value vs wip-valuation), generalist tax-rebate-uk pair. Per locked rules the default is rewrite-not-collapse; each cluster needs a per-cluster decision with GSC+Bing refresh at execution time.

## What this feeds

- The green-lit Property optimisation run and solicitors corepage run now have page-level target lists (Tiers 1-3).
- Dentists: deploy the 18-page backlog first; its ledger re-runs ~08-05.
- Agency: nothing until 07-22; its ledger is the post-window worklist.
- Re-run cadence: `python -m optimisation_engine.analysis.query_ledger --site <key>` after each watch window closes; holds expire automatically by date.
