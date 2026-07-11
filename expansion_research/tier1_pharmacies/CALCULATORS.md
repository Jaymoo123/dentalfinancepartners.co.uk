# Calculator candidates — Pharmacies (R3)

Date: 2026-07-11. Pattern: property calculator fleet (config-driven, 1 file + 1 import per
tool). Demand evidence = R2D pulls (2026-07, raw in `../r2d_raw_full.json`), autocomplete
presence (`raw/autocomplete_raw.json`), verified rival precedent, and the same-day paid
enrichment (`raw/dfs_head_volumes.json` + `raw/dfs_keyword_suggestions.json`, 2026-07-11
late evening) — per-tool volume lines below.

## Launch tier (build with the site)

1. **Pharmacy purchase affordability & deal calculator** — purchase price (or item volume ×
   pence-per-item / EBITDA multiple), deposit, loan term/rate → repayments, post-tax cash
   cover from projected pharmacy profit, share-vs-asset duty comparison (0.5% stamp duty vs
   SDLT at non-residential rates, both citations verified live in `raw/citation_checks.json`).
   Rationale: the purchase is THE high-value lead moment (R2B lead value 4, "practice-purchase
   heavy niche" from R1); brokers (Hutchings-tier) publish valuation prose, no rival
   interactive tool seen in this run's fetched evidence. Measured demand (2026-07-11):
   "buying a pharmacy" 140/mo (CPC £1.69, KD 59), "buying a pharmacy uk" 70/mo (CPC £0.84,
   KD 0), "cost of buying a pharmacy" 10/mo; adjacent "pharmacy for sale" 2,400/mo is
   broker-listing intent, reachable via supporting content only.
2. **Locum pharmacist take-home comparator (sole trader vs limited vs umbrella/PAYE)** — day
   rate, days/week, expenses → net income under each route, with ESM4270/IR35 status warnings
   baked in (not a "go limited" pitch — HMRC's locum-pharmacist position is restrictive;
   position 20-22). Direct port of contractors-ir35 estate logic (cheap build). Serves the
   locum CONTENT audience without opening a locum lead funnel. Measured demand (2026-07-11):
   "locum pharmacist tax calculator" 10/mo, "accountants for locum pharmacists" 30/mo —
   confirms content-tier, not lead-tier.
3. **NHS payment (FP34) cash-flow estimator** — monthly items dispensed, average item value,
   advance percentage → month-by-month NHSBSA receipt timeline and the working-capital gap.
   No rival tool exists in anything fetched this run; encodes position 7. This is the "only a
   pharmacy specialist would build this" signal asset for the money pages. Measured demand
   (2026-07-11): "fp34" 140/mo KD 0; "drug tariff" 14,800/mo KD 37 sits adjacent (look-up
   intent — the tool is the specialist-signal, not a volume play).

## Queue tier

4. **Pharmacy sale CGT / BADR estimator** — proceeds, base cost, BADR eligibility → tax under
   BADR 14% vs 18%/24% CGT, lifetime-limit tracking (citations verified). Pairs with the
   sale-side money page. Measured (2026-07-11): "selling a pharmacy" 30/mo CPC £9.32 KD 7,
   "pharmacy valuation" 10-20/mo CPC £7.90-15.33, "pharmacy goodwill" no measured volume.
5. **Pharmacy VAT mix estimator** — NHS items revenue (zero-rated) vs OTC/retail split →
   expected input-VAT recovery position and retail-scheme sanity check (positions 1-4).
6. **Fit-out capital allowances planner** — fit-out budget split (plant vs structures) → AIA /
   40% FYA / 14% WDA / 3% SBA relief timeline (FA 2026 rules, ground truth + verified cites).
7. **Employer NIC / staff cost calculator** — dispenser & counter-staff payroll at 15%/£5,000
   with Employment Allowance — shared logic with estate calculators, cheap port.

Build order rationale: 1 and 3 differentiate (owner, high-value); 2 captures the locum
content cluster; everything else is a port from existing estate fleets.
