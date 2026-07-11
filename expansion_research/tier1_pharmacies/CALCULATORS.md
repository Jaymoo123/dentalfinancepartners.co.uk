# Calculator candidates — Pharmacies (R3)

Date: 2026-07-11. Pattern: property calculator fleet (config-driven, 1 file + 1 import per
tool). ZERO-SPEND CONSTRAINT this run: no DataForSEO volumes; demand evidence = R2D pulls
(2026-07, raw in `../r2d_raw_full.json`), autocomplete presence (`raw/autocomplete_raw.json`),
and verified rival precedent. Per-tool volume/CPC enrichment is in the DOSSIER TODO-paid-pulls.

## Launch tier (build with the site)

1. **Pharmacy purchase affordability & deal calculator** — purchase price (or item volume ×
   pence-per-item / EBITDA multiple), deposit, loan term/rate → repayments, post-tax cash
   cover from projected pharmacy profit, share-vs-asset duty comparison (0.5% stamp duty vs
   SDLT at non-residential rates, both citations verified live in `raw/citation_checks.json`).
   Rationale: the purchase is THE high-value lead moment (R2B lead value 4, "practice-purchase
   heavy niche" from R1); brokers (Hutchings-tier) publish valuation prose, no rival
   interactive tool seen in this run's fetched evidence. Autocomplete confirms live intent
   ("buying a pharmacy uk", "pharmacy for sale" families).
2. **Locum pharmacist take-home comparator (sole trader vs limited vs umbrella/PAYE)** — day
   rate, days/week, expenses → net income under each route, with ESM4270/IR35 status warnings
   baked in (not a "go limited" pitch — HMRC's locum-pharmacist position is restrictive;
   position 20-22). Direct port of contractors-ir35 estate logic (cheap build). Serves the
   locum CONTENT audience without opening a locum lead funnel.
3. **NHS payment (FP34) cash-flow estimator** — monthly items dispensed, average item value,
   advance percentage → month-by-month NHSBSA receipt timeline and the working-capital gap.
   No rival tool exists in anything fetched this run; encodes position 7. This is the "only a
   pharmacy specialist would build this" signal asset for the money pages.

## Queue tier

4. **Pharmacy sale CGT / BADR estimator** — proceeds, base cost, BADR eligibility → tax under
   BADR 14% vs 18%/24% CGT, lifetime-limit tracking (citations verified). Pairs with the
   sale-side money page.
5. **Pharmacy VAT mix estimator** — NHS items revenue (zero-rated) vs OTC/retail split →
   expected input-VAT recovery position and retail-scheme sanity check (positions 1-4).
6. **Fit-out capital allowances planner** — fit-out budget split (plant vs structures) → AIA /
   40% FYA / 14% WDA / 3% SBA relief timeline (FA 2026 rules, ground truth + verified cites).
7. **Employer NIC / staff cost calculator** — dispenser & counter-staff payroll at 15%/£5,000
   with Employment Allowance — shared logic with estate calculators, cheap port.

Build order rationale: 1 and 3 differentiate (owner, high-value); 2 captures the locum
content cluster; everything else is a port from existing estate fleets.
