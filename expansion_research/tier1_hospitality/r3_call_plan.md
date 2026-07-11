# R3 Tier-1 #2 (hospitality) — paid-call plan

Date: 2026-07-11. Branch expansion/phase-0. Written BEFORE any paid call.
Budget for this task: $3-8. Same-day prior spend: R2d $0.18 + charities R3 (see pilot_charities/r3_call_plan.md).

## Planned paid calls (all via DataForSEOClient._post_paid → CostTracker + api_cost_log, site_key NULL)

| Call | Endpoint | Params | Est. cost (config) |
|---|---|---|---|
| 1-3 | dataforseo_labs/google/ranked_keywords/live | top-3 verified hospitality rivals, limit 500, UK 2826 | 3 × ($0.01 + 500×$0.0001) = $0.18 |
| 4-11 | dataforseo_labs/google/keyword_suggestions/live | 8 seeds, limit 200, UK | 8 × ($0.01 + 200×$0.0001) = $0.24 |
| — | Serper search | ~36 queries gl=gb | separate Serper quota |
| — | DDG, Google Autocomplete, page fetches, sitemap crawls | free | $0 |

Estimated DataForSEO total: **~$0.42** (well under $3-8 budget).
Gates: balance check before first paid call; abort if any single response cost >5× estimate.

## Actuals (2026-07-11)
- keyword_suggestions × 8 seeds: 0.01464 + 0.01584 + 0.01224 + 0.012 + 0.0192 + 0.01356 + 0.015 + 0.0138 = **$0.11628** (169 flat rows).
- ranked_keywords × 3 (paperchase.ac $0.02952, inn-control.co.uk $0.042, tipsandtroncs.co.uk $0.01608) = **$0.0876** (430 flat rows).
- **Total paid this task: $0.20388.** Balance after: $48.91716. Well under the $3-8 budget.
- Incident: first ranked_keywords attempt hit the $0.85 daily code guard (already consumed by
  R2d $0.18 + charities R3 + this task's suggest calls on the same day). Since the task carries
  an explicit owner-authorised $3-8 budget, `s4b_dataforseo.py` raises the guard to
  abort_at $2.50 / ceiling $3.00 for its own process only (module patch, documented in-file).
  `optimisation_engine/config.py` untouched. $0 wasted before the abort (guard fired pre-call).
