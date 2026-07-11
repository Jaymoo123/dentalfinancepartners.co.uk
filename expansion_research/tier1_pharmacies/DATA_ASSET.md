# Flagship research/data asset proposal — Pharmacies (R3)

Date: 2026-07-11. Pattern: UK Landlord Tax Index (property estate, shipped 2026-06-09) /
Hospitality Openings & Closures Index (tier1_hospitality). All sources below fetched live
2026-07-11 (`raw/citation_checks.json`).

## Proposal: **UK Community Pharmacy Openings & Closures Index**

A quarterly index of England's community pharmacy network: active contractor counts, openings,
closures, ownership churn (independent vs multiple), and dispensing-volume trends — by region
and over time. "Pharmacy closures" is a running national news story (funding squeeze, multiples
divesting), which makes this the rare data asset with built-in trade-press and national-press
demand, faceless-PR compatible (no named expert needed — locked estate rule).

### Sources — feasibility verified live this run

- **NHSBSA Open Data Portal** (opendata.nhsbsa.net — fetched 200): open datasets including
  prescribing/dispensing data under open licence.
- **NHSBSA Dispensing Contractors Data**
  (nhsbsa.nhs.uk/prescription-data/dispensing-data/dispensing-contractors-data — fetched 200):
  monthly per-contractor dispensing data — the pharmacy-level backbone. Month-over-month
  presence/absence of a contractor code = openings/closures signal; items dispensed = volume
  trend; contractor name grouping = independent vs multiple split.
- **Companies House bulk snapshot + SIC 47730** (download.companieshouse.gov.uk/en_output.html
  and resources.companieshouse.gov.uk/sic/ — both fetched 200; 47730 "Dispensing chemist in
  specialised stores" confirmed on the SIC table; R1 counted 7,992 live companies): corporate
  layer — incorporations/dissolutions, cohort survival, CH Advanced Search API for
  dissolved-company queries (same pipeline as the hospitality index; CH key already in .env).

### Why this one

- **Two independent official spines** (NHSBSA contractor-level + CH company-level) — richer
  than the hospitality index, and pharmacy is the only Tier-1 niche where a public per-business
  monthly activity dataset exists at all.
- **On-funnel**: closure/margin-squeeze narrative feeds the purchase-affordability calculator
  (distressed sales = buyers searching), the NHS cash-flow estimator, and the sale-side CGT
  pages.
- **Nothing like it in the field surveyed this run**: rivals publish "pharmacy closures" prose
  citing NPA press releases; an always-current index page outranks and out-cites static
  articles, and is exactly the GEO/AI-answer citation magnet the estate strategy calls for.
- **England-first caveat**: NHSBSA covers England; Scotland/Wales equivalents (PSD, NWSSP)
  queued as v2 — consistent with the England-first contract content call.

### Pipeline sketch

1. Monthly/quarterly: pull dispensing-contractors CSVs → contractor register diff → openings/
   closures by region; items series per contractor.
2. Quarterly: CH bulk snapshot filtered to SIC 47730 + Advanced Search dissolution pulls →
   corporate churn + cohort survival.
3. Static JSON build → /research/pharmacy-index page (Landlord-Tax-Index render pattern),
   headline stats + regional map + downloadable dataset (cite-us licence line).

### Open feasibility items (cheap, free, pre-build)

- Confirm the dispensing-contractors CSV schema contains a stable contractor identifier +
  address/postcode (download one month's file — free, ~minutes).
- Check NHSBSA open-data licence terms page for attribution wording.
