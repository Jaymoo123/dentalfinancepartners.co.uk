# R2d call plan — UK search volumes for expansion niches

Date: 2026-07-11. Branch expansion/phase-0. Written BEFORE any paid call.

## Balance (free appendix/user_data, 2026-07-11)
- Balance: **$49.9674** (positive — proceed).

## Scope
- 89 R1 candidates minus the 13 EXCLUDE rows from R2C_OVERLAP.md = **76 niches**.
- Skipped (EXCLUDE, own-estate direct overlap per R2c): #1 Landlords, #2 Property investors,
  #3 Airbnb/holiday-let, #8 Construction/CIS, #9 Builders, #15 Dentists, #16 Doctors/GPs,
  #17 Locum doctors, #28 Solicitors, #29 Barristers, #30 IT contractors, #31 Freelancers,
  #48 Marketing agencies. Reason: their query pools already belong to existing estate sites;
  spending on their volumes would be wasted (data exists in own GSC/Bing corpora).

## Endpoint choice
- **`keywords_data/google_ads/search_volume/live`** — Google Ads volume + CPC + competition,
  UP TO 1000 keywords per single flat-priced request. Public pricing: **$0.05/task** (live
  priority may bill $0.075; probe verifies actual from the response `cost` field).
- Rejected alternatives:
  - Labs `keyword_overview`/`bulk_keyword_difficulty`: $0.01 base + per-row charges, and KD
    endpoint doesn't return volume. For ~300 keywords Labs per-row pricing ≥ the flat Ads call
    and adds nothing we need.
  - Labs `keyword_ideas`/`suggestions`: per-seed calls → 76 × $0.01+ = $0.76+, 15x costlier.
- Phase-9 defect fixed: that run sent ONE stilted phrasing per niche ("tradesman accountant uk")
  and got volume=0. This run sends 3-5 natural-register variants per niche
  ("accountant(s) for X", "X accountant(s)", "X tax", natural forms like "farm accountant")
  and scores on summed cluster volume + best single term.

## Arithmetic
- ~292 keywords total (76 niches × 3-5 variants + 2 canary terms).
- Call 1 (probe): 10 keywords incl. canary "accountant for landlords" → 1 × $0.05–0.075.
- Call 2 (full): remaining ~282 keywords in one batch → 1 × $0.05–0.075.
- **Expected total: $0.10–0.15.** Hard abort if probe cost implies total > $10 (it cannot).
- Also within the code-level daily guard DATAFORSEO_ABORT_AT = $0.85.
- Both calls go through `DataForSEOClient._post_paid` → CostTracker + api_cost_log.
- Config: added `keywords_data/google_ads/search_volume/live` to DATAFORSEO_COSTS
  (base $0.075 conservative estimate, per_row 0).

## Probe validation gates (all must pass before call 2)
1. HTTP 200 / task status 20000.
2. Canary "accountant for landlords" volume plausible non-zero.
3. Response echoes location_code 2826 (United Kingdom).
4. Charged cost (response `cost`) matches estimate order of magnitude.

## Probe evidence (10 keywords, 2026-07-11)
- HTTP 20000 / task 20000. Cost charged: **$0.09**.
- Canary "accountant for landlords" = 260/mo, "landlord accountant" = 390/mo (plausible, non-zero).
- location_code echoed 2826 on every item. CPC returned free where present ($8.63/$11.87 etc.).
- Multi-variant fix validated in-probe: "accountant for farmers" = null but
  "agricultural accountant" = 320 — the phase-9 single-phrasing defect would have scored this 0.
- Pricing learning: probe implied a possible per-keyword component ($0.075 + $0.0015/kw fits
  $0.09 at 10 kw); config estimate updated conservatively before the full call. The full call
  (299 kw) then also cost $0.09 flat → actual pricing is per-task, cheaper than the guard estimate.

## Actuals
- One incident: first probe attempt aborted BEFORE any spend — api_cost_log.site_key FKs
  public.sites and 'expansion' is not a site (409). Fixed by logging with site_key NULL. $0 wasted.
- Calls made: 2 paid (probe 10 kw $0.09, full 299 kw $0.09) + 2 free balance checks.
- **Total spend $0.18** (api_cost_log sum = $0.18; balance $49.9674 → $49.7874, exact match).
- Coverage: 309/309 keywords returned; 76/76 in-scope niches scored.
- Plan said $0.10–0.15; actual $0.18 (probe billed live-priority $0.09 not $0.05–0.075).
  Within the $10 hard ceiling and the $0.85 daily code guard.
- Outputs: r2d_volumes.json (309 rows), R2D_VOLUMES.md (ranked 76 niches + anomalies),
  raw responses r2d_raw_probe.json / r2d_raw_full.json (re-analysis is free).
