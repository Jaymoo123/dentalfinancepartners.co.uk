# R3 deep-research dossier — Care homes + domiciliary care accountancy (Tier-1)

Date: 2026-07-11. Branch: expansion/phase-0. Research pass ran under the zero-spend
constraint; the paid DataForSEO enrichment then ran the same day, late evening
(owner-authorised, manager-direct, **$0.2520 measured, spend guard untouched**) and the
dossier was re-scored on the returned volumes/KD/CPC. Serper account remains out of
credits, so the SERP sweep is still DDG-only (see anomalies).

## Index

| File | Contents |
|---|---|
| [COMPETITORS.md](COMPETITORS.md) + [competitors.json](competitors.json) | 41 verified rivals (12 DEDICATED + 29 SECTION), evidence quotes, adjacent-player map, drop log |
| [TOPICS.md](TOPICS.md) + [topic_pool.json](topic_pool.json) / [topic_pool_final.json](topic_pool_final.json) | 1,296 raw → 1,049 final keywords → 652 page-level clusters, DFS-enriched (91 keywords / 53 clusters with measured volume); 0% estate dedup (measured) |
| [LAUNCH_CORE.md](LAUNCH_CORE.md) | /for/* sub-segment hub architecture, 22 pages + 4 tools + 1 asset, re-scored with measured volume/KD/CPC per page |
| [CALCULATORS.md](CALCULATORS.md) | 9 candidates, launch tier re-scored to 4 (FNC/fee-mix promoted on measured 880/mo family); care-calculator.co.uk surface = 143 kw, 0 top-10 |
| [DATA_ASSET.md](DATA_ASSET.md) | UK Care Provider Business Index (CH SIC 87/88 + CQC data) — all sources fetched live this run |
| [HOUSE_POSITIONS_OUTLINE.md](HOUSE_POSITIONS_OUTLINE.md) | 29 positions, 34/34 citations fetched live with anchor phrases |
| [r3_call_plan.md](r3_call_plan.md) | Call plan + measured actuals ($0.00 research pass; $0.2520 enrichment recorded in the spend table below) |
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
- **Measured demand (DFS, 2026-07-11)**: the demand core is CQC money ("cqc registration"
  2,900/mo KD 26, "cqc registration manager" 720/mo KD 0) and funding mix ("chc funding"
  5,400/mo KD 13 adjacent, "fnc funding" 880/mo KD 0), plus "buying a care home" 320/mo
  KD 0. HIRE heads are small-volume but premium: "care home accountant(s)" 90/mo KD 0 at
  **CPC £39.12**. The dedicated tier is measurably weak in Google — carehome-accountants.
  co.uk ranks for 4 keywords, costcare.co.uk 11 (brand noise), heighten's top-500 contain
  zero care terms — and the only tool site (care-calculator.co.uk, 143 kw) has zero top-10
  positions. Contested-on-paper, weak-in-SERPs: the gap thesis strengthens.
- **Data asset is feasibility-checked**: CH bulk + SIC 87/88 + CQC public data + insolvency
  stats all fetched live this run; pipeline reuses the Landlord Tax Index loaders and CH key.
- **≥3 genuine verified rivals**: comfortably yes (12 dedicated) — no thin-field concern.

## Anomalies / limitations (honest record)

1. **Serper quota exhausted**: all 36 Serper calls returned 400 "Not enough credits"; the
   SERP sweep ran on DDG only. Google-side visibility (positions, hit counts) is therefore
   under-sampled; rival set was compensated via fetch-verification of all 175 domains plus
   live web search on blocked ones, but a Google re-sweep belongs in the paid pulls below.
2. **RESOLVED 2026-07-11 (late evening)**: the research pass carried no volumes/KD/CPC
   (zero DataForSEO by rule); the paid pulls then ran manager-direct, owner-authorised
   (guard lifted by owner ruling for interactive runs, DATAFORSEO_ABORT_AT untouched) —
   care batch **$0.2520 measured** (8 keyword-suggestion seeds $0.1250 + 4 ranked-keywords
   domains $0.1270, UK 2826). LAUNCH_CORE/CALCULATORS re-scored and topic_pool_final
   re-clustered with volume ordering the same evening. Residual: DFS returns null volume
   for most long-tail terms (91 of 1,049 pool keywords matched), so per-term nulls mean
   <10/mo, not missing data.
3. Residual pool noise: the 1,049-keyword pool still contains stragglers the regex sweeps
   missed (measured examples in TOPICS.md); page-level verify at write time is mandatory.
4. 9 candidate domains stayed unverifiable (bot-blocked, not search-recovered) and were
   excluded from competitors.json rather than guessed at (list in COMPETITORS.md).

## Spend record

| Item | Cost |
|---|---|
| DataForSEO — research pass | $0.00 (zero calls) |
| DataForSEO — enrichment 2026-07-11 late evening (owner-authorised): 8 × keyword_suggestions + 4 × ranked_keywords, UK 2826 | **$0.2520 measured** ($0.1250 + $0.1270; guard untouched) |
| Serper | $0.00 (36 attempts, all 400 no-credits) |
| DDG, autocomplete (891), 175 fetch-verifies, 22 sitemap crawls, 34 citation checks | $0 |
| **Total** | **$0.2520** |

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

## DONE — paid pulls (record, 2026-07-11 late evening)

Items 1-4 of the planned TODO are complete: 8 keyword-suggestion seeds (242 flat rows,
163 with volume) + 4 ranked-keywords domains including the optional care-calculator.co.uk
pull (658 flat rows) landed in `raw/dfs_*.json` at **$0.2520 measured** vs the $0.42
estimate; LAUNCH_CORE and CALCULATORS re-scored (FNC/fee-mix calculator promoted to launch
tier), `s5b_finalise.py` re-run with volume joining and volume-desc ordering (1,049
keywords → 652 clusters, 53 with measured volume).

**Still open: item 5 — Serper Google re-sweep** (re-run `s1_serp_collect.py` for
Google-side positions and diff survivors vs the DDG-only candidates.json) remains blocked
on the Serper credit top-up (Open question 1).
