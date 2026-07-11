# Calculator candidates — Care homes + domiciliary care (R3)

Date: 2026-07-11. Pattern: property calculator fleet (config-driven, 1 file + 1 import per
tool). **No volume/KD figures this run (zero DataForSEO)** — demand evidence is autocomplete
family size + verified rival precedent from `raw/verify_evidence.json` / sitemaps / live
search. All cited rates verified live via `s6_citation_check.py` (34/34 pass).

## Rival tool precedent (verified this run)

- **care-calculator.co.uk** — "Care Agency Rate Calculator | Estimate Home Care Hourly
  Costs (UK)" (fetched 200; 43 care mentions). A standalone tool site ranking in our sweep:
  direct proof the hourly-rate tool intent exists and currently has no accountancy-firm owner.
- **cqcfinancialviability.com** — CQC Qualified Accountants Ltd **sells** the financial
  viability statement as a product from an online shop (fetched 200). Proof of paid intent
  on the FVS query.
- **heightenaccountants.co.uk** — runs a "Quick Quote for Heighten Care Homes Accountants"
  funnel (live search). Pricing-interactivity precedent among the dedicated tier.
- Autocomplete surfaced "cqc registration fees calculator" and "care home financial
  assessment calculator" as real suggestion strings (`raw/autocomplete_raw.json`) — the
  latter is consumer-side (excluded from pool) but confirms calculator-shaped demand.

## Launch tier (build with the site)

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
   LA rate, self-funder rate) → blended weekly revenue per bed and margin.
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
