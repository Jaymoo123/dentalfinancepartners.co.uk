# Flagship research/data asset proposal — Care (R3)

Date: 2026-07-11. Pattern: UK Landlord Tax Index (property estate, shipped 2026-06-09;
CH API key already in .env) and Small Charity Finance Index (charities pilot, run for real).

## Proposal: **UK Care Provider Business Index**

A quarterly-refreshed index of the business health of the UK care sector built from two
free, licence-clean sources: Companies House filtered to social-care SIC codes (87100
residential nursing care, 87200 residential care for learning disabilities/mental
health/substance abuse, 87300 residential care for the elderly and disabled, 87900 other
residential care, 88100 non-residential social work for the elderly and disabled — the
domiciliary layer) and CQC's published provider data. Headline series: care company
incorporations vs dissolutions by sub-segment and region, cohort survival ("what share of
domiciliary agencies incorporated in 2021 still exist?"), and CQC registered-location
counts as the regulated-capacity cross-check.

### Feasibility (all sources fetched live 2026-07-11, evidence `raw/citation_checks.json`)

- **CH free bulk snapshot** of all live companies incl. SIC codes + incorporation date:
  https://download.companieshouse.gov.uk/en_output.html (200). Same file already powers
  the Landlord Tax Index pipeline, so the loader exists.
- **SIC table** confirming the 87/88 code set:
  https://resources.companieshouse.gov.uk/sic/ (200; "87" present on page).
- **CH Advanced Search API** (same key as Landlord Tax Index) for dissolutions by
  `sic_codes` + `dissolved_from/to` — the bulk live snapshot alone lacks deaths.
- **CQC data downloads**: https://www.cqc.org.uk/about-us/transparency/using-cqc-data
  (200) — CQC publishes provider/location directories incl. registrations,
  deregistrations and ratings; adds the regulated-sector layer no generic CH index has.
- **Context layers**: Insolvency Service monthly statistics collection (200) to
  sanity-check the dissolution series; CQC market oversight page (200) and Skills for
  Care state-of-the-sector report (200) for narrative framing.

### Why this one

- **On-funnel**: every chart deep-links the money pages — closures/cost-pressure series →
  staffing-cost and care-hour calculators; new-registrations series → start-an-agency and
  CQC FVS pages; regional series → (future) location pages.
- **Faceless data-PR**: "X domiciliary care companies formed for every care home that
  closed in 2026 Q2" is trade-press bait (Care Home Professional, Home Care Insight,
  Caring Times — all seen in our SERP sweep as info-layer domains) with no named-expert
  requirement, consistent with the credential constraint.
- **Demand signals in this run's free data**: autocomplete families "care home business
  for sale <city>", "how many care homes...", fee-increase and funding-crisis queries;
  the sector's distress narrative is permanently in the news cycle (£588m funding
  announcements etc. surfaced in autocomplete).
- **Nobody in the 41 verified rivals publishes anything like it** — sitemaps checked:
  service pages + blogs only. The nearest thing is Carterwood's paid advisory analytics,
  which is exactly the gap between a broker's product and a citable free index.

### Pipeline

1. Quarterly: CH bulk snapshot → filter SIC 87xxx/88100 → live counts by sub-segment +
   region (postcode-district mapping reused from Landlord Tax Index).
2. CH Advanced Search API: incorporations + dissolutions per quarter per SIC bucket.
3. CQC provider/location directory download → registered locations by service type +
   region; join deregistrations for the "regulated exits" series.
4. DuckDB/SQLite locally → static JSON series → one `/research/care-provider-index` page
   + embeddable charts (same architecture incl. /embed route).

### Risks / notes

- SIC self-reporting noise: many domiciliary agencies file under generic codes; the CQC
  layer (regulator-verified service types) is the corrective — state methodology.
- CQC covers England only; CH covers the UK. Publish UK company series + England
  regulated series side by side and label the scopes.
- Dormant/agent-address companies inflate live counts; filter on accounts status where
  the snapshot allows, as the Landlord Tax Index already does.
- Verify at build time which CQC download file carries deregistration dates (the
  using-cqc-data page catalogues several files; pick at build).

## Rejected alternatives

- **Care-worker pay index** (Skills for Care ASC-WDS data): rich, but Skills for Care's own
  publication is the canonical source — thin room to add value beyond re-charting.
- **LA fee-rate map** (each council's cost-of-care / fee-rate publications): highest lead
  relevance but 150+ scattered council sources with no standard format — an outreach/
  scraping burden the estate model avoids; revisit as v2 once the index has traction.
- **Care home fees paid-by-region consumer index**: consumer-side audience (family payers),
  wrong funnel, and carehome.co.uk/Lottie own it.
