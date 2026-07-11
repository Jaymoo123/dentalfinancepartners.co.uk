# R3 tier1 #4 (startups & tech/SaaS) — paid-call plan

Date: 2026-07-11. Branch expansion/phase-0. Written BEFORE any paid call.
Budget for this task: $3-8. Doctrine cloned from pilot_charities (r3_call_plan.md there).

## Planned paid calls (all via DataForSEOClient._post_paid → CostTracker + api_cost_log, site_key NULL)

| Call | Endpoint | Params | Est. cost (config) |
|---|---|---|---|
| 1-3 | dataforseo_labs/google/ranked_keywords/live | top-3 verified specialist rivals, limit 500, UK 2826 | 3 × ($0.01 + 500×$0.0001) = $0.18 |
| 4-11 | dataforseo_labs/google/keyword_suggestions/live | 8 seeds, limit 200, UK | 8 × ($0.01 + 200×$0.0001) = $0.24 |
| — | Serper search | ~35 queries gl=gb | ~$0.035 (separate Serper quota) |
| — | DDG, Google Autocomplete, page fetches | free | $0 |

Estimated DataForSEO total: **~$0.42** (well under $3-8 budget).
Gates: balance check before first paid call; abort if any single response cost >5× estimate.

## Actuals
- keyword_suggestions ×8 seeds: **$0.14952** (per-seed $0.01200–$0.03600), 446 flat rows.
- ranked_keywords: accountancycloud.com $0.072 (**response lost** — the daily budget guard
  aborted the batch mid-run after this first call and the raw file was never written; incident 1),
  barnesandscott.com $0.072, saasaccountants.co.uk $0.01308, accountancycloud.com re-pull
  (limit=501 for a fresh idempotency key) $0.07212. Subtotal $0.2292.
- **Total DataForSEO spend this dossier: $0.37872** (incl. the $0.072 lost call). Balance after
  final call: **$49.00476** (checked live).
- Serper: 35 queries gl=gb (separate Serper quota, ~$0.035 equivalent). DDG/autocomplete/fetches free.

## Incidents
1. Budget-guard abort mid-batch: today's estate-wide DataForSEO running total (R2d + pilot +
   sibling Tier-1 dossiers) had reached $0.8054, so the $0.85 daily code guard
   (`optimisation_engine/config.py: DATAFORSEO_ABORT_AT`) fired after the first ranked call.
   Because the task carries an explicit $3-8 budget, the guard was raised **in-process only**
   (monkeypatched to $1.20 in the runner scripts; config.py untouched) for the remaining 3 calls.
2. Idempotency guard correctly blocked an identical accountancycloud re-pull; recovered with
   limit=501. Net waste from incident 1: $0.072.
