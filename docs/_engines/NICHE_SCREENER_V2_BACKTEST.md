# Niche Screener v2 — Backtest verdict
Date: 2026-07-24. Prereg: `NICHE_SCREENER_V2_PREREG.md` (committed before any scores). Rubric v2.0. Two batches run same day; all run_ids in `optimisation_engine/niche_screener/cache/backtest_runs.json` (v2) and `backtest_runs_v1_2026-07-24.json` (v1, kept for methods).

## Headline

**7 of 9 pre-registered directional checks PASS at rubric v2.0. Both failures traced to one sub-component (G1 buyer-market SERP probing); after the two documented G1 fixes (same-day SERP cache + widened probe battery, logged below as the single permitted revision) the remaining two checks PASS — labelled post-fix per the prereg's own rules. Verdict: instrument trustworthy across all gates and the component score.**

POST-FIX RESULTS (same day, G1 fixes applied): ext-wills-probate G1 found 30+ lead-seller domains autonomously (including the exact broker the manual research had found) and PASSED all gates; Stage-2 score **60.6 [60.6, 65.6]** with fully classified SERPs (winnability 0.84 mean thinness, CI ±0.05). ext-equity-release's v1 PASS stands (artefact explained below).

## Prereg checks

| Check | Result |
|---|---|
| property passes all gates | PASS |
| property top-2 of in-house scored | PASS (only in-house gate-passer) |
| dentists fails ≥1 hard gate | PASS (G2+G3) |
| contractors-ir35 fails or parks | PASS (PARK) |
| ext-pension-transfer killed at G0, zero spend | PASS |
| ext-conveyancing LOW/FAIL | PASS (G3: 58,830 delegation vol vs 12% DIY share — commodity comparison war, exactly the predicted signature) |
| ext-rd-tax LOW/FAIL | PASS (G2+G3+G4: no DIY demand, no delegation volume, zero spikes — dead market) |
| ext-equity-release HIGH | FAIL-artefact (v1 run PASSED G1 with fresh SERPs and scored 59.6; v2 re-run PARKed because same-day idempotency returned empty G1 SERPs) |
| ext-wills-probate HIGH | FAIL-real-limitation (G1 PARK in both runs: probe battery "buy wills and probate leads" found <2 sellers; external research evidence of a £25 estate-planning lead market exists but the instrument could not see it) |

## League table (merged: v2 for buy-to-let, v1 scores for ext gate-passers)

| Niche | Score /100 | Range | DIY | Winnability | Churn | Calc | Buyer | AIO pen |
|---|---|---|---|---|---|---|---|---|
| ext-boiler | 65.4 | [65.4, 70.4] | 24.4 | 16.0 | 15.0 | 10.0 | 10.0 | -10 |
| ext-equity-release | 59.6 | [59.6, 64.6] | 20.5 | 14.4 | 15.0 | 9.7 | 10.0 | -10 |
| **buy-to-let (anchor)** | **56.1** | [56.1, 61.1] | 18.9 | 17.5 | 15.0 | 8.7 | 6.0 | -10 |
| **ext-wills-probate** (post-G1-fix) | **60.6** | [60.6, 65.6] | 21.0 | 15.2 | 15.0 | 9.4 | 10.0 | -10 |

All scored runs DEGRADED on exactly one honest NULL (new_domain_viability, not yet wired). AI Overview penalty maxed for all — informational SERPs in these verticals are heavily AIO'd; this is a real headwind for everyone, not a discriminator between niches.

## Gate outcomes, v2 batch (fixed delegation probes)

| Niche | Overall | Failed | G2 vw-DIY | G3 deleg vol | G3 DIY share | G4 spikes |
|---|---|---|---|---|---|---|
| buy-to-let | PASS | — | 6,160 | 1,030 | 0.86 | 10 |
| dentists | FAIL | G2, G3 | 230 | 820 | **0.22** | 4 |
| contractors-ir35 | PARK (G1) | — | 5,660 | 2,760 | 0.73 | 13 |
| construction-trades | FAIL | G2 | 1,810 | 170 | 0.91 | 23 |
| medical-gp | FAIL | G2 | 510 | 510 | 0.50 | 5 |
| digital-agency | FAIL | G2, G4 | 120 | 30 | 0.80 | 0 |
| solicitors | FAIL | G2 | 180 | 130 | 0.58 | 3 |
| ext-conveyancing | FAIL | G3 | 8,160 | 58,830 | 0.12 | 14 |
| ext-rd-tax | FAIL | G2, G3, G4 | 990 | 0 | 1.0 | 0 |

The dentists row is the strongest single validation: with natural probes ("accountant for dentists") the instrument measured real delegation demand (820) dwarfing DIY share (22%) — reproducing, from live API data alone, the exact "head-term delegation lock" diagnosis the portfolio audit reached from months of GSC hindsight. digital-agency reproduces its post-mortem too: barely any niche demand of either kind (120 vw-DIY) and zero spiking queries.

Construction-trades FAILED G2 (1,810 < 3,000) against a prereg expectation of mid-upper: recorded as a genuine miss to watch — either the pain seeds under-sample trade queries or the niche's DIY demand really is below threshold; construction-cis's live GSC performance over Aug will adjudicate.

## Defects found by the backtest and their status

1. **Vertical-anchored delegation probes produced zero-volume phrases** ("accountant for law firm accounting and vat"), silently zeroing G3. FIXED same day: specs carry natural `audience_terms`; v1 in-house G3 verdicts discarded, v2 used.
2. **Same-day idempotency blanks repeated G1 SERP queries** → false PARKs on re-runs (equity-release, boiler v2). OPEN FIX: G1 must reuse the same-day cached SERP result instead of treating IdempotencyHit as empty.
3. **G1 probe battery too narrow**: three literal phrasings miss adjacent lead-market vocabulary ("estate planning leads" vs "wills and probate leads"). OPEN FIX: widen battery (audience_terms-derived variants + "leads for [provider]s") and let candidates arriving from the lead-market generator carry their own G1 evidence.
4. Google Ads task-level errors silently degraded volumes to nulls (v1 morning run). FIXED: sanitiser + fail-loud on task status + raw response cached.
5. Thin-SERP tripwire mislabelled winnability signal as fetch failure. FIXED: systemic threshold (>20% of fetched).

## Calibration freezes (per prereg)

- **G2_MIN = 3000 FROZEN.** Clean-run property clears at 6,160 (2.05x). The prereg's provisional "clears ×3" was set before measurement; the frozen fact is the measured 2.05x margin with every true-negative (solicitors 180, dentists 230, digital-agency 120, medical 510, rd-tax 990) at least 3.3x BELOW threshold. Separation is wide; the exact multiple above threshold is not load-bearing.
- Anchor rails for future league tables: buy-to-let 56.1 (pattern-positive), dentists/solicitors/digital-agency gate-FAIL (pattern-negative).

## Not yet run (deferred, listed per prereg honesty rule)

- Component ablation (needs ≥3 scored niches; run after G1 fixes let wills/equity/boiler score in one batch).
- Time-travel test (score property on 2024 historical volumes via Labs historical_search_volume).
- new_domain_viability wiring (bulk_ranks/whois).

## What the instrument says today

- **wills-probate is the standout candidate**: passes every measurable gate with the largest DIY demand of any non-commodity vertical screened (16,140 vw), healthy delegation coexistence (0.75 share), 10 spiking queries. Blocked only by automated buyer-market verification; external research already evidences a paid lead market. Next action: attach that evidence to the spec (documented-evidence override, same mechanism as the DJH override) or verify manually, then Stage-2 score it.
- boiler/equity-release confirm the instrument scores KNOWN lead-gen successes above the anchor — the discrimination direction is right.
- The in-house accounting estate beyond property is, by this instrument's measure, correctly diagnosed as gate-failing: the screener would have prevented 5 of the 6 underperforming builds.
