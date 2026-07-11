# R3 deep-research dossier — Care homes + domiciliary care accountancy (Tier-1)

Date: 2026-07-11. Branch: expansion/phase-0. Run constraint honoured: **zero DataForSEO
calls, $0 paid spend, no spend-guard changes**. Serper account was out of credits, so the
SERP sweep is DDG-only (see anomalies).

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 41 verified rivals (12 DEDICATED + 29 SECTION), evidence quotes, adjacent-player map, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool.json](topic_pool.json) / [topic_pool_final.json](topic_pool_final.json) | 1,296 raw → 1,049 final keywords → 659 page-level clusters; 0% estate dedup (measured) |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | /for/* sub-segment hub architecture, 22 pages + 3 tools + 1 asset (volumes/KD explicitly unavailable this run) |
| [CALCULATORS.md](CALCULATORS.md) | 9 candidates, 3 launch-tier, with verified rival tool precedent (care-calculator.co.uk; paid FVS product) |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Care Provider Business Index (CH SIC 87/88 + CQC data) — all sources fetched live this run |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 29 positions, 34/34 citations fetched live with anchor phrases |
| [r3_call_plan.md](r3_call_plan.md) | Call plan + measured actuals ($0.00 paid) |
| s1-s7 scripts + raw/ | Re-runnable pipeline (s2 resumable in chunks; s5b = judged finalise) + all raw evidence |

## Summary

- **Field verdict: CONTESTED, with a young dedicated tier and exploitable gaps.** 12
  dedicated care-accountancy brands verified live (incl. two exact-match domains and a firm
  that sells CQC financial viability statements as a product), plus 29 real firms with care
  sector pages. Unlike hospitality there is no 30-year institutional layer; several
  sub-fields (CQC registration, care-home capital allowances, buy/sell) are owned by
  **non-accountant adjacents**, which is where an A* accountancy site can take the financial
  slice of the query with better depth.
- **Widest gaps**: domiciliary-care finance (sleep-ins post-Mencap, travel-time NMW,
  true-cost-of-a-care-hour economics — 2 dedicated rivals, no tools), supported living
  (1 dedicated rival), the VAT welfare-exemption/RCB 2/2025 advisory wedge, and an almost
  total **interactive-tool vacuum** (one standalone calculator site in the entire sweep).
- **Topic pool is genuinely net-new for the estate**: 0 of 1,296 candidate terms collided
  with 7,905 estate titles (exact or fuzzy ≥0.90) — no cannibalisation decision blocks this
  launch, unlike hospitality. The only wall to police is medical-site clinician adjacency
  (5 terms dropped, flag automated in s5).
- **Data asset is feasibility-checked**: CH bulk + SIC 87/88 + CQC public data + insolvency
  stats all fetched live this run; pipeline reuses the Landlord Tax Index loaders and CH key.
- **≥3 genuine verified rivals**: comfortably yes (12 dedicated) — no thin-field concern.

## Anomalies / limitations (honest record)

1. **Serper quota exhausted**: all 36 Serper calls returned 400 "Not enough credits"; the
   SERP sweep ran on DDG only. Google-side visibility (positions, hit counts) is therefore
   under-sampled; rival set was compensated via fetch-verification of all 175 domains plus
   live web search on blocked ones, but a Google re-sweep belongs in the paid pulls below.
2. **No volumes/KD/CPC anywhere in this dossier** (zero DataForSEO by rule). All demand
   claims are family-size/precedent-based and marked as such.
3. Residual pool noise: the 1,049-keyword pool still contains stragglers the regex sweeps
   missed (measured examples in TOPICS.md); page-level verify at write time is mandatory.
4. 9 candidate domains stayed unverifiable (bot-blocked, not search-recovered) and were
   excluded from competitors.json rather than guessed at (list in COMPETITORS.md).

## Spend record

| Item | Cost |
|---|---|
| DataForSEO | **$0.00 (zero calls; guard untouched)** |
| Serper | $0.00 (36 attempts, all 400 no-credits) |
| DDG, autocomplete (891), 175 fetch-verifies, 22 sitemap crawls, 34 citation checks | $0 |
| **Total** | **$0.00** |

## Open questions (for owner / R4 gate)

1. **Serper top-up** — account has no credits; blocks any future Serper-based sweep estate-wide,
   not just this niche.
2. **Location pages**: auditox runs 6,112 programmatic URLs in this exact niche — works, but
   strains the gold-standard A* bar (same owner call as hospitality).
3. **CQC FVS productisation**: content/calculator only, or an actual fixed-fee FVS signing
   service (requires an accountant signature — interacts with the user-not-accountant
   constraint; likely partner-fulfilled like other leads).
4. **Children's homes (Ofsted) scope**: in the hub set at launch or deferred? Rivals list it
   but the regulator differs (Ofsted not CQC); citations for that hub need their own s6 pass.

## TODO — paid pulls (exact DataForSEO tasks, when the daily guard resets)

All via `DataForSEOClient._post_paid` → CostTracker + api_cost_log, site_key NULL,
UK location 2826. Estimated total ≈ $0.42 at config rates (mirrors hospitality actuals).

1. `dataforseo_labs/google/keyword_suggestions/live` × 8 seeds, limit 200:
   "care home accountant", "domiciliary care accountant", "care home payroll",
   "sleep in shift pay", "care home vat", "buying a care home", "cqc registration",
   "supported living accountant". (~8 × $0.03 = $0.24)
2. `dataforseo_labs/google/ranked_keywords/live` × 3 rivals, limit 500:
   **heightenaccountants.co.uk** (152-URL care blog hub), **costcare.co.uk**
   (care-home tax/CA specialist), **carehome-accountants.co.uk** (120-URL exact-match
   site). (~3 × $0.06 = $0.18)
3. Optional 4th ranked pull: **care-calculator.co.uk** (tool-site keyword surface for the
   calculator fleet spec).
4. Re-score LAUNCH_CORE picks + CALCULATORS launch tier with the returned volumes/KD/CPC;
   re-cluster topic_pool_final with volume ordering (s5b re-run).
5. After Serper top-up: re-run `s1_serp_collect.py` for Google-side positions and diff
   survivors vs this run's DDG-only candidates.json.
