# Niche Screener v2 — Pre-registration
Committed BEFORE any v2 scores are computed. Rubric version 2.0 (weights in `optimisation_engine/niche_screener/common.py`). Any later rubric change is logged as v2.1+ and backtests rerun after a change are labelled post-hoc.

## Instrument under test
Gates-first screener: G0 regulatory / G1 evidenced buyer market / G2 volume-weighted DIY demand / G3 head-lock check / G4 rule-churn, then a /100 component score for gate-passers (diy_pain_demand 25, longtail_winnability 25, rule_churn 15, calculator_demand 10, buyer_market_depth 10, aio_exposure 0..-10, new_domain_viability 5). NULL components reported as score ranges, never midpoints.

## Outcome metric (in-house backtest)
Primary: leads per month while live (from `docs/PORTFOLIO_LEAD_AUDIT_2026-07-10.md` + Supabase `leads`). Secondary: lead/click conversion.

## Pre-registered expectations

In-house directional gates (PASS/FAIL of the whole instrument):
1. property (buy-to-let spec) ranks TOP-2 of any batch containing it, and passes all hard gates.
2. dentists FAILS ≥1 hard gate — expected G3 (demand locked in head terms) — or lands bottom half.
3. contractors-ir35 FAILS ≥1 hard gate or scores bottom quartile.
4. medical + agency: scored and reported SEPARATELY (outcomes confounded by documented technical failures; not used to pass or fail the instrument).
5. construction-cis: expected mid-to-upper (best early non-property signal), no gate failure.

Out-of-family external checks (known third-party outcomes; screener must separate):
- Expected HIGH: equity release (known thriving paid-lead market), will-writing/probate, boiler replacement quotes.
- Expected LOW/FAIL: mainstream conveyancing as standalone (commodity £4-7 leads, comparison-network walls), R&D tax advisory (shrinking, HMRC crackdown), DB pension transfers (buyer market dismantled — should fail G1 or IAR/regulatory flags).

Ablation expectation: every scored component should flip at least one verdict across the extended set; any component that never flips is removed in v2.1.

Time-travel expectation: property's universe scored on historical (2024) volumes still passes all gates.

## Failure handling
If any pre-registered expectation fails, the result is REPORTED AS A FAILURE in `docs/_engines/NICHE_SCREENER_V2_BACKTEST.md` first; at most one rubric revision (v2.1) may follow, with the revision and its motivation logged, and all post-revision results labelled post-hoc.

## Known limitations accepted up front
- n is tiny; no correlation statistics will be headlined (directional gates only).
- G2_MIN threshold requires one calibration pass on property/agency before the backtest proper; the calibrated value is frozen here once set: G2_MIN = TBD (to be filled in the calibration commit, before external scoring).
- new_domain_viability ships as an honest NULL until bulk_ranks/whois wiring lands.
