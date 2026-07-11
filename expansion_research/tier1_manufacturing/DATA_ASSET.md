# Flagship research/data asset proposal — Manufacturing & engineering (R3)

Date: 2026-07-12. Pattern: UK Landlord Tax Index (property estate, shipped 2026-06-09;
CH API key already in .env) and UK Care Provider Business Index (care R3 dossier).

## Proposal: **UK Manufacturing Business Index**

A quarterly-refreshed index of the business health of UK manufacturing and engineering
built from free, licence-clean sources: Companies House filtered to manufacturing SIC
codes (divisions 10-33, i.e. 10xxx "manufacture of food products" through 33xxx "repair
and installation of machinery and equipment") plus engineering-services codes 71121
(engineering design activities for industrial process and production) and 71129 (other
engineering activities). Headline series: manufacturing company incorporations vs
dissolutions by sub-sector (food, metal fabrication, machinery, electronics, automotive,
aerospace buckets) and region; cohort survival ("what share of fabricators incorporated
in 2021 still exist?"); and an insolvency cross-check against the Insolvency Service's
published manufacturing-industry breakdown.

### Feasibility (all sources fetched live 2026-07-12, evidence `raw/citation_checks.json`)

- **CH free bulk snapshot** of all live companies incl. SIC codes + incorporation date:
  https://download.companieshouse.gov.uk/en_output.html (200). Same file already powers
  the Landlord Tax Index pipeline, so the loader exists.
- **SIC table** confirming the code set — divisions 10-33 ("Manufacture of...") and
  71121/71129: https://resources.companieshouse.gov.uk/sic/ (200; page contains
  "Manufacture" rows and code "71121").
- **CH Advanced Search API** (same key as Landlord Tax Index) for dissolutions by
  `sic_codes` + `dissolved_from/to` — the bulk live snapshot alone lacks deaths.
- **Insolvency Service monthly statistics** (200):
  https://www.gov.uk/government/collections/monthly-insolvency-statistics — publishes
  insolvencies by industry (SIC section C = manufacturing), the cross-check series.
- **ONS manufacturing and production industry hub** (200):
  https://www.ons.gov.uk/businessindustryandtrade/manufacturingandproductionindustry —
  output/turnover context layers for narrative framing.

### Why this one

- **On-funnel**: closure/insolvency series → cost-control and margin content; the
  incorporation series by sub-sector → /for/* hub pages; a capital-intensity angle
  (companies in machinery-heavy SICs) → capital-allowances calculator and money pages.
- **Faceless data-PR**: "X UK fabrication companies dissolved for every new one formed in
  2026 Q2" is trade-press bait (The Manufacturer, Manufacturing Digital, Machinery — all
  seen as info-layer domains in our sweep) with no named-expert requirement, consistent
  with the credential constraint.
- **Uniquely wide SIC base**: 24 divisions give sub-sector league tables no rival
  publishes; ONS publishes output indices but not company-demography by sub-sector.
- **Nobody in the 38 verified rivals publishes anything like it** — sitemaps checked
  (22 crawled): service pages + blogs only. Make UK's paid member reports are the nearest
  thing, which is exactly the gap between a trade body's product and a citable free index.

### Pipeline

1. Quarterly: CH bulk snapshot → filter SIC 10000-33200 + 71121/71129 → live counts by
   sub-sector bucket + region (postcode-district mapping reused from Landlord Tax Index).
2. CH Advanced Search API: incorporations + dissolutions per quarter per SIC bucket.
3. Insolvency Service industry table → manufacturing insolvency series (sanity check).
4. DuckDB/SQLite locally → static JSON series → one `/research/manufacturing-index` page
   + embeddable charts (same architecture incl. /embed route).

### Risks / notes

- SIC self-reporting noise: holding companies and traders mis-file under manufacturing
  codes; mitigate by excluding dormant-accounts companies (snapshot carries accounts
  status, as the Landlord Tax Index filtering already does) and stating methodology.
- The 24-division base is large (~300k+ companies expected); bucket to ~10 sub-sector
  groups for publishable tables, keep division-level in the data download.
- 71121/71129 engineering consultancies include civil/structural firms outside the
  niche's audience; publish the engineering-services series separately labelled.
- No CQC-equivalent regulator layer exists for manufacturing; the Insolvency Service
  industry series is the independent cross-check instead.

## Rejected alternatives

- **R&D-claims-by-sector index** (HMRC publishes National Statistics on R&D tax relief):
  HMRC's own publication is canonical — thin room to add value, and the R&D boutiques
  (ForrestBrown etc.) already re-chart it.
- **Factory gate / steel price tracker**: MEPS International (seen in sweep) sells exactly
  this; commodity-price data is licence-encumbered.
- **Made-in-UK exporter map** (HMRC trade-in-goods by region): interesting but off-funnel
  for an accountancy lead site; revisit as v2 CBAM-era content support.
