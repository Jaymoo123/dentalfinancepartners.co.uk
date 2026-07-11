# Flagship research/data asset proposal — Ecommerce / Amazon sellers (R3)

Date: 2026-07-12. Pattern: UK Landlord Tax Index (property estate, shipped 2026-06-09;
CH API key already in .env) and the care/crypto/pharmacies R3 asset designs.

## Proposal: **UK Online Seller Business Index**

A quarterly-refreshed index of the business health of the UK ecommerce seller population
built from free, licence-clean sources: Companies House filtered to **SIC 47910 (retail
sale via mail order houses or via internet)** plus the adjacent codes sellers actually file
under (47990 other retail not in stores; 46900 non-specialised wholesale is the common
FBA-wholesaler code — include as a labelled secondary series). Headline series: online-
retail company incorporations vs dissolutions by region and cohort, survival curves ("what
share of internet-retail companies incorporated in the 2021 lockdown boom still exist?"),
and the ONS internet-retail sales series as the demand-side cross-check.

### Feasibility (all sources fetched live this run, evidence `raw/citation_checks.json`, 32/32 pass)

- **CH free bulk snapshot** of all live companies incl. SIC codes + incorporation date:
  https://download.companieshouse.gov.uk/en_output.html (200). Same file already powers
  the Landlord Tax Index pipeline, so the loader exists.
- **SIC table** confirming 47910 is a real, filterable code:
  https://resources.companieshouse.gov.uk/sic/ (200; "47910" present on the page).
- **CH Advanced Search API** (same key as Landlord Tax Index) for dissolutions by
  `sic_codes` + `dissolved_from/to` — the bulk live snapshot alone lacks deaths.
- **ONS internet-retail sales as a proportion of all retail (time series J4MC/DRSI)**:
  https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi
  (200) — the canonical demand-side series to plot company births against.
- **Insolvency Service monthly statistics** (200) to sanity-check the dissolution series.

### Why this one

- **On-funnel**: cohort-survival and dissolution charts deep-link the money pages —
  "lockdown-cohort seller deaths" → profit-margin and VAT-threshold calculators;
  incorporation series → sole-trader-vs-limited-company and "HMRC knows about your side
  hustle" pages.
- **Faceless data-PR**: "1 in N UK internet-retail companies from the 2021 boom has already
  dissolved" is national-press + trade-press (Tamebay/ChannelX, Internet Retailing) bait
  with no named-expert requirement, consistent with the credential constraint.
- **Timely hook that renews itself**: digital-platform reporting (data flowing to HMRC since
  Jan 2024) + the HMRC side-hustle campaign keep the "seller population under scrutiny"
  narrative permanently in the news cycle.
- **No rival runs one.** The 14 dedicated firms' sitemaps were crawled this run: service
  pages + blog guides only. The adjacent SaaS layer publishes survey-based "state of
  ecommerce" marketing content, not a CH-derived, methodology-stated index. This is the
  clearest genuine wedge in the whole niche (the content field itself is saturated;
  the data field is empty).

### Pipeline

1. Quarterly: CH bulk snapshot → filter SIC 47910 (primary) + 47990/46900 (labelled
   secondary) → live counts by region (postcode-district mapping reused from Landlord
   Tax Index).
2. CH Advanced Search API: incorporations + dissolutions per quarter per SIC bucket →
   births/deaths/net series + cohort survival curves.
3. ONS J4MC/DRSI series ingest (CSV endpoint) → demand-side overlay chart.
4. DuckDB/SQLite locally → static JSON series → one `/research/online-seller-index` page
   + embeddable charts (same architecture incl. /embed route as Landlord Tax Index).

### Risks / notes

- **SIC noise is worse than care**: 47910 misses sellers filing under product-specific
  retail codes, and captures some catalogue/mail-order legacy firms. Mitigate by (a)
  publishing the code-set methodology openly, (b) the ONS overlay as an external sanity
  check, (c) treating levels cautiously and emphasising flows (births/deaths/cohorts),
  which are robust to constant misclassification.
- Marketplace-only sole traders (the Vinted/eBay side-hustle layer) never appear in CH at
  all — the index measures the incorporated seller economy; say so.
- Dormant/agent-address companies inflate live counts; filter on accounts status where the
  snapshot allows, as the Landlord Tax Index already does.
- No regulator layer exists (unlike CQC for care) — the ONS series is the substitute
  external anchor.

## Rejected alternatives

- **Marketplace fee tracker** (Amazon/eBay/Etsy fee-change index): genuinely useful but
  fee schedules are ToS-scraping territory with change-detection burden, and the calculator
  sites (ecomcalctools, marginwise) already occupy fee space; keep fees inside calculators.
- **Seller-margin survey index**: needs a respondent base a faceless new site doesn't have.
- **EU VAT compliance-cost index**: the cross-border VAT agencies (SimplyVAT etc.) own this
  space with client data we can't match; the CH population play doesn't compete with them.
