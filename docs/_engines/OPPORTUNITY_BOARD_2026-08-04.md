# Opportunity board, 2026-08-04

Product of the aggressive exploration run: 16 fresh niche screens (tranche 1: 5, tranche 2: 11),
the `new_domain_viability` component wired and back-applied, and content salvage from failed
screens. Total DataForSEO spend $2.59. Discovery funnel (58 lead-market + 13 reg-churn
candidates) is now effectively EXHAUSTED: everything credible is screened or excluded.

## League (viability-adjusted, like-for-like, all stage-2 scored niches)

| # | Niche | Score | Beatable SERP share | Status |
|---|---|---:|---:|---|
| 1 | wills-probate | 62.45 | 38% | BUILT, ~146 posts, awaiting G1 |
| 2 | divorce-finances | 61.22 | 26% | BUILT, 45 posts, awaiting G1 |
| 3 | **mortgage** | **59.97** | 14% | NEW candidate, IAR-gated |
| 4 | leasehold-rights | 58.87 | 36% | unbuilt, best non-IAR unbuilt |
| 5 | buy-to-let (anchor) | 57.50 | 27% | our best live site |
| 5 | solar-installation | 57.50 | 26% | unbuilt |
| 7 | older-driver-renewal | 57.36 | 22% | unbuilt |

## Tranche results (2026-08-04)

- Tranche 1 (5): **mortgage 59.97 PASS** (drags: 76% AIO exposure, entrenched bank/broker SERP
  at 14% beatable; lifts: 15 spiking queries, 12,360 DIY volume). bookkeeping, electrician,
  mtd-for-income-tax, landlord-compliance-renters-rights-act all G2/G3/G4 FAIL.
- Tranche 2 (11): ALL FAIL at G2 (DIY volume floor 3,000). business-insurance, plumber,
  roofing (closest, 1,800), removals, cosmetic-surgery, mansion-surcharge, pensions-into-iht,
  leasehold-to-commonhold, learner-driver-reform, self-assessment-timely-payments,
  vaping-duty-compliance. Trades = "too small"; reg-churn batch = uniformly "too early"
  (pre-volume consultation/SI-stage events).

## Standing verdicts

1. **Ship wills + divorce (owner G1).** Both sit above every alternative, both are finished
   inventory, and wills has the most beatable SERP measured anywhere (38%). Runbooks:
   `docs/wills-probate/PHASE6_G1_RUNBOOK_2026-08-04.md`, `docs/divorce-finances/PHASE6_G1_RUNBOOK_2026-08-04.md`.
2. **Mortgage = the one new opportunity, strategic not tactical.** 59.97 beats every unbuilt
   niche, but it is IAR-gated (needs an FCA-authorised broker principal / buyer relationship,
   the same open thread as the proposed mortgage bolt-on in NEXT_HORIZON_STRATEGY). Decision is
   commercial (buyer network) before content. Dossier: `out/mortgage_run_20260804T102718Z_b7eecc.md`.
3. **Leasehold-rights = best non-IAR unbuilt** (58.87, 36% beatable, +1.4 on anchor). Below the
   wills/divorce bar; defensible build only after those two are shipped and earning.
4. **Content salvage shipped 2026-08-04**: 23 posts across construction-cis (15), generalist (4),
   contractors-ir35 (4) from failed-screen demand data (`FAILED_SCREEN_CONTENT_SALVAGE_2026-08-04.md`).
5. **Re-screen calendar** (do not re-run early): ev-road-charging + landlord-epc-retrofit 2027;
   reg-churn tranche-2 batch when their events near force (pensions-into-iht mid-2027 run-up,
   vaping-duty late 2026, mansion-surcharge 2027-28); roofing/employment-law if seed iteration
   ever justified; boiler/equity-release remain calibration controls, not candidates.

## Instrument state

- `new_domain_viability` LIVE (bulk_ranks + RDAP, weight 5, permanent per-domain intel cache);
  all league scores above are complete (no NULL components except where noted historically).
- Provisional-score guard live (unknown_rate > 0.2 prints PROVISIONAL).
- Known defects still open: same-day idempotency blanking; volumes coverage <0.30 nulling
  (hit dental-implants, not the league runs).
