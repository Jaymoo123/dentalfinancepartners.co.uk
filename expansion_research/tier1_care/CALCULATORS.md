# Calculator candidates — Care homes + domiciliary care (R3)

Date: 2026-07-11. Pattern: property calculator fleet (config-driven, 1 file + 1 import per
tool). **Re-scored same day with the completed DataForSEO pulls**, including the
care-calculator.co.uk ranked-keywords surface (143 keywords, ETV 96.18, **zero top-10
positions** — every ranking is pos 11-104, so its whole surface is winnable by a stronger
site). All cited rates verified live via `s6_citation_check.py` (34/34 pass).

## Rival tool precedent (verified this run)

- **care-calculator.co.uk** — "Care Agency Rate Calculator | Estimate Home Care Hourly
  Costs (UK)" (fetched 200; 43 care mentions). A standalone tool site ranking in our sweep:
  direct proof the hourly-rate tool intent exists and currently has no accountancy-firm owner.
  **Measured surface (DFS ranked keywords, 2026-07-11):** 143 keywords, best position 14
  ("cqc ratings" 2,900/mo), 0 in the top 10. Three families dominate: (a) NHS funding —
  "chc funding" 5,400/mo KD 13, "continuing healthcare funding" 1,900/mo KD 16, "fnc
  funding" 880/mo KD 0; (b) hourly care cost — "how much does home care cost per hour uk"
  720/mo KD 10, "how much do care agencies charge per hour" 390/mo KD 0, "self employed
  carer hourly rate uk" 210/mo KD 0; (c) carer pay — "care workers pay" 260/mo KD 1,
  "carers wage uk" 260/mo KD 11. Much of (a) is consumer-framed, but the FNC/fee-rate slice
  is exactly the provider fee-mix input, and (b)/(c) are the direct inputs to tools 1-3.
- **cqcfinancialviability.com** — CQC Qualified Accountants Ltd **sells** the financial
  viability statement as a product from an online shop (fetched 200). Proof of paid intent
  on the FVS query.
- **heightenaccountants.co.uk** — runs a "Quick Quote for Heighten Care Homes Accountants"
  funnel (live search). Pricing-interactivity precedent among the dedicated tier.
- Autocomplete surfaced "cqc registration fees calculator" and "care home financial
  assessment calculator" as real suggestion strings (`raw/autocomplete_raw.json`) — the
  latter is consumer-side (excluded from pool) but confirms calculator-shaped demand.

## Launch tier (build with the site) — re-scored 2026-07-11

Launch tier confirmed by the measured data, one promotion from the queue:

1. Care-hour cost — measured family 720+390+320+210/mo, KD 0-10, incumbent tool has zero
   top-10 positions → **strongest measured tool, unchanged at #1**.
2. Sleep-in NMW — "sleep-in shift pay" 40/mo KD 0 measured; small head but zero rival tool
   anywhere → stays launch tier on gap grounds.
3. Staffing margin — carer-pay inputs measure 260/260/90/70/mo (KD ≤11); stays.
4. **PROMOTED from queue: Funded nursing care & fee-mix margin calculator (was #8)** —
   the FNC family measured far bigger than assumed: "fnc funding" 880/mo KD 0, "how much
   is funded nursing care" 140/mo KD 3, "funded nursing care payments" 90/mo KD 3, plus
   "chc funding" 5,400/mo KD 13 adjacent — and it is precisely the family care-calculator.
   co.uk lives on without ever cracking the top 10. Build with the site if capacity allows,
   else first follow-up.

Detail (specs unchanged from the R3 pass):

1. **True cost of a care hour calculator (domiciliary)** — carer wage + travel time (paid at
   NMW per the working-hours rules, verified) + mileage (AMAP 45p now, 55p from 6 Apr 2026,
   estate ground truth) + employer NIC 15% above £5,000 (verified) + pension + holiday accrual
   + overheads → true hourly delivery cost vs the local-authority rate the user enters.
   Precedent: care-calculator.co.uk owns this space alone, without the accountancy depth.
   This is the money tool: every agency negotiating LA fee rates does this sum.
2. **Sleep-in shift & NMW compliance calculator** — shift pattern (sleep-in vs waking night),
   awake hours, travel time between calls → NMW-compliant pay floor per Mencap v
   Tomlinson-Blake (UKSC, verified) + the working-hours guidance (verified). No rival tool
   exists anywhere in the verified set; the dedicated firms cover it in prose only.
3. **Care staffing cost & margin calculator (care home)** — roster (nurses/carers/night
   cover), agency-staff share, NLW £12.71 (21+) from Apr 2026 (rates page verified), employer NIC,
   pension → weekly staffing cost per occupied bed and staffing % of fee income vs the
   sector's benchmark, with an occupancy-void sensitivity slider.

## Queue tier

4. **CQC financial viability statement helper** — guided inputs → draft figures for the CQC
   FVS template (template URL verified live). Precedent: cqcfinancialviability.com charges
   for exactly this; a free interactive version is the classic wedge.
5. **VAT welfare-exemption checker** — service type (regulated care vs domestic help vs
   supported-living rent split) + who contracts → exempt/taxable verdict with VAT Notice
   701/2 logic (verified) and a flag on the RCB 2/2025 VAT-grouping position (verified).
6. **Care home purchase: capital allowances estimator** — purchase price / fit-out split →
   plant & machinery pool (AIA £1m verified; WDA 18%→14% + 40% FYA, FA 2026 estate ground
   truth) + SBA 3% (verified). Precedent: Cost Care/Eureka/Sponjem monetise this with
   prose + claim services; no tool.
7. **Selling a care home: CGT & BADR estimator** — proceeds, base cost, BADR eligibility →
   tax at 24% vs BADR rate on the first £1m (both pages verified).
8. **Funded nursing care & fee-mix margin calculator** — bed mix (FNC £267.68/week verified,
   LA rate, self-funder rate) → blended weekly revenue per bed and margin. **PROMOTED to
   launch tier 2026-07-11 on measured FNC demand (see above).**
9. **VAT registration threshold tracker** — rolling 12-month taxable turnover vs £90,000
   (verified) — matters for mixed care/non-care income; cheap port of estate logic.

## Rejected

- Consumer "will I have to sell my house / care fees means-test" calculators — family-side
  audience, wrong side of the lead funnel, and consumer sites (payingforcare.org, Age UK)
  own it.
- CQC registration application-fee lookup — CQC fees are a lookup table, not a calculation;
  covered as a table inside the start-an-agency money page instead.
- Care home valuation calculator — broker territory (Rangewell, Florence Legacy,
  Carterwood); a lead-gen accountancy site should capture the tax side (CGT/BADR tool 7),
  not impersonate a valuer.
