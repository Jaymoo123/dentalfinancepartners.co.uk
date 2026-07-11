# R3 pilot (charities) — paid-call plan

Date: 2026-07-11. Branch expansion/phase-0. Written BEFORE any paid call.
Balance at R2d close: $49.7874 (task brief says ~$49.79 — consistent). Budget for this task: $3-8.

## Planned paid calls (all via DataForSEOClient._post_paid → CostTracker + api_cost_log, site_key NULL)

| Call | Endpoint | Params | Est. cost (config) |
|---|---|---|---|
| 1-3 | dataforseo_labs/google/ranked_keywords/live | top-3 verified rivals, limit 500, UK 2826 | 3 × ($0.01 + 500×$0.0001) = $0.18 |
| 4-11 | dataforseo_labs/google/keyword_suggestions/live | ~8 seeds, limit 200, UK | 8 × ($0.01 + 200×$0.0001) = $0.24 |
| — | Serper search | ~32 queries gl=gb | ~$0.032 (separate Serper quota) |
| — | DDG, Google Autocomplete, page fetches | free | $0 |

Estimated DataForSEO total: **~$0.42** (well under the $3-8 budget and the $0.85/day code guard,
which already carries $0.18 from R2d today → projected daily total ~$0.60).

Gates: balance check before first paid call; abort if any single response cost >5× estimate.

## Actuals (2026-07-11, from api_cost_log)
- keyword_suggestions × 8 (16:29-16:30): $0.17184
- ranked_keywords × 4 (16:39-16:40): $0.11580 (charityaccountants.co.uk $0.02856, kgaccountantsblog.com $0.05304, charityaccountant.co.uk $0.02148, iel.org.uk $0.01272)
- **R3-charities DataForSEO total: $0.28764** (plan estimate $0.42; under budget $3-8)
- Serper: 32 queries × $0.001 ≈ $0.032 (own quota). DDG/autocomplete/fetches/citations: $0.
- NOTE: api_cost_log for 2026-07-11 also shows ~$0.60 of hospitality + startups/SaaS Labs calls
  (16:40-16:53) from a CONCURRENT session (not this task); today's combined dataforseo total
  crossed the $0.85 daily code guard (~$0.89 at 16:53) — any further paid calls today would abort.
  This task needs none.
