# Research-Authority Scout: generalist (Holloway Davies)

Scouted 2026-07-23. Site key `generalist`, dir `generalist/`, brand Holloway Davies (Ashfield
Trading Ltd trading name). Faceless generalist SME accountant serving small businesses across all
sectors. GREENFIELD: no existing `/research` route (confirmed — `generalist/web/src/app/` has no
research dir). Flagship is a BROAD all-sector UK-SME macro barometer, deliberately distinct from the
niche sites' single-SIC indexes (Dentists SIC 86230, Solicitors SIC 69102, etc.). Calculators
EXCLUDED (owner not interested). All sources below verified this session.

---

## FLAGSHIP: "State of UK Small Business" — the UK SME Barometer

A single living index page that fuses the four canonical national business-activity series into one
quarterly-refreshed barometer: **formations up, insolvencies up, survival, and the live business
population**. No competitor accountant publishes these together as one cited standard. Because it is
all-sector and national, it is the generalist analogue of the niche SIC indexes — the "macro" tier.

Composite headline (verified figures, refresh each build):
- **815,277 new incorporations** FYE Mar 2026 (+1.67% YoY) vs **787,120 dissolutions** (+8.31% YoY)
  → net register growth collapsing to +0.94% (5,479,045 total, 4,930,634 effective). Narrative:
  "Britain still starts companies faster than it closes them — but the gap is the narrowest in years."
- **1,845 company insolvencies** June 2026; **74% are Creditors' Voluntary Liquidations** (owner-led
  shutdowns, the SME distress signal — not banks calling in loans).
- **5.7 million** private-sector businesses at start of 2025 (+3.5% / +191k YoY); **99.85% are SMEs**;
  **75% have no employees**. 57% sole proprietorships, 37% companies, 6% partnerships.

Angle: a quarterly "is it a good or bad time to be a small business" score, with a sector league table
(below) and a founder-survival curve. Lead hook: "which sectors are forming fastest / dying fastest,
and where does your business sit."

### Flagship data spine (all BUILDABLE_NOW, all OGL v3.0)

**1. Companies House — Incorporated companies in the UK (quarterly)** — machine-readable spine for
formations/dissolutions/register size.
- Landing: https://www.gov.uk/government/statistics/incorporated-companies-in-the-uk-january-to-march-2026
- Stats hub (find latest each quarter): https://www.gov.uk/government/organisations/companies-house/about/statistics
- FORMAT: data tables in **.xlsx, .ods AND .csv** (quarterly official-statistics tables). MACHINE-READABLE.
- CADENCE: quarterly, published month after quarter-end (Jan–Mar released Apr, etc.).
- Also: annual **Companies register activities** release (FYE) for the age/register-age breakdowns:
  https://www.gov.uk/government/statistics/companies-register-activities-statistical-release-april-2025-to-march-2026
- LICENCE: OGL v3.0. No blocker.
- NOTE: this is the OFFICIAL STATISTICS series (aggregate national counts), NOT the CH bulk company
  data product (`download.companieshouse.gov.uk`). Use the stats series for the macro barometer; the
  bulk product is only needed if you want to slice formations by SIC yourself (see supplementary 5).

**2. Insolvency Service — Company Insolvency Statistics (monthly)** — the distress axis + sector league table.
- Latest commentary: https://www.gov.uk/government/statistics/company-insolvencies-june-2026/commentary-company-insolvency-statistics-june-2026
- FORMAT: **CSV** long-term series + tables; record-level data back to 2016; **SIC 2007 breakdown to
  3-digit level** in accompanying tables. MACHINE-READABLE.
- CADENCE: **monthly** (next 18 Aug 2026). Industry/SIC split lags one month.
- Headline sector league (12mo to Jun 2026): Construction 3,805 (17%), Wholesale/retail 3,463 (15%),
  Accommodation/food 3,233 (14%), Admin/support 2,196 (10%), Professional/scientific/technical 1,930
  (8%), Manufacturing 1,857 (8%). → the all-sector league table the niche sites can't build.
- LICENCE: OGL v3.0. No blocker. Coverage England & Wales (Scotland/NI published separately — caveat).

**3. ONS Business Demography (annual) — births / deaths / 1–5yr survival** — the founder-survival curve.
- Bulletin: https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/2024
- Quarterly experimental series (fresher, for interim updates):
  https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyquarterlyexperimentalstatisticsuk
- FORMAT: **XLSX** reference tables + NOMIS data-explorer (sliceable by SIC group, geography, size band).
- CADENCE: annual (headline) + quarterly experimental. Covers VAT/PAYE businesses from the IDBR.
- Angle: 5-year survival rate ("~4 in 10 make it to five years") as the founder's headline stat.
- LICENCE: OGL v3.0. No blocker.

**4. ONS UK Business Counts + Business Population Estimates — the live SME denominator.**
- UK Business (activity, size & location) dataset:
  https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/ukbusinessactivitysizeandlocation
  (also on NOMIS "UK Business Counts": https://www.nomisweb.co.uk/articles/1405.aspx) — VAT/PAYE
  enterprises by SIC, legal status, employment & turnover size band, region. 2.73m VAT/PAYE units Mar 2025.
- Business Population Estimates 2025 (BEIS/DBT, includes unregistered businesses — the full 5.7m):
  https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release
- FORMAT: **XLSX/ODS** detail tables + NOMIS API for Business Counts. MACHINE-READABLE.
- CADENCE: annual.
- LICENCE: OGL v3.0. No blocker.

---

## SUPPLEMENTARY ASSETS (4–6)

**S1. All-sector insolvency league table + "which sector is riskiest right now" tracker** — BUILDABLE_NOW.
Reuse source #2 SIC-section breakdown, but as a standalone ranked, monthly-refreshed page (the macro
counterpart to each niche site's single-section caveat). Distinct value: the generalist can name ALL
sections and rank them, which no single-SIC niche site can. OGL v3.0.

**S2. Company-formation seasonality + net-formation momentum** — BUILDABLE_NOW.
From source #1 quarterly series: incorporations vs dissolutions by quarter, YoY net-formation
momentum, and the narrowing register-growth story (+0.94% is the hook). Angle: "is the start-up boom
over?" Refresh quarterly. OGL v3.0.

**S3. UK late-payment / payment-practices barometer** — BUILDABLE_NOW (bulk CSV export).
- Full export: https://check-payment-practices.service.gov.uk/export/csv/  (also /export/ landing:
  https://check-payment-practices.service.gov.uk/export/)
- FORMAT: **CSV**, every large-business report (avg days to pay, % paid late, % paid within 30/60 days).
- CADENCE: continuous (firms report every 6 months); export is a rolling all-reports dump.
- Angle: "the UK late-payment index — how long the big buyers make small suppliers wait." Direct SME
  cash-flow relevance = strong lead hook. Aggregate the CSV to a sector/period trend; do NOT publish a
  named-firm shame-list as the hero (reputational-risk framing — keep hero aggregate, per-firm lookup
  is optional secondary). LICENCE: OGL v3.0 (Crown service data).
- Tag detail: BUILDABLE_NOW but the export is a large flat CSV → NEEDS light bulk-parse (aggregate
  before publish). Not manual.

**S4. Regional SME density & formation map** — BUILDABLE_NOW.
From source #4 (UK Business Counts by region/SIC via NOMIS) + source #1 country splits. A choropleth of
businesses-per-capita and sector mix by region/local authority. Angle: "where Britain's small
businesses actually are." OGL v3.0. NOMIS API keeps it refreshable.

**S5. Formations-by-SIC-section "what Britain is starting" index** — NEEDS-BULK.
The macro version of the niche formation indexes. The official CH stats series (#1) does NOT split new
incorporations by SIC, so to rank formations by sector you must parse the **CH bulk company data
product** (http://download.companieshouse.gov.uk/en_output.html — monthly full snapshot, `SICCode`
fields) or the free company snapshot, and diff incorporation dates. FORMAT: large monthly ZIP/CSV.
LICENCE: OGL v3.0. Tag: NEEDS-BULK/MANUAL (heavier parse; defer to phase 2 of build — the four-source
flagship + S1–S4 ship first without it).

**S6. HMRC / lending context layer (optional enrichment, not a standalone hero)** — MIXED.
- HMRC VAT + Corporation Tax receipts / population: machine-readable via
  https://www.gov.uk/government/collections/tax-and-national-insurance-statistics (ODS/CSV, OGL) —
  usable as a "tax take from small business" sidebar.
- Bank of England Money & Credit / SME lending (Bankstats / Money and Credit tables): CSV/XLSX, OGL-
  equivalent BoE terms. https://www.bankofengland.co.uk/statistics/money-and-credit — SME loan/deposit
  flows as a cash-flow context strip.
- HMRC "tax gap" is largely PDF/ODS summary → low machine-readability for a live index; use as a cited
  stat, not a data feed. Tag: BUILDABLE_NOW as sidebar stats (BoE/HMRC receipts CSV), tax-gap = defer.

---

## BUILD NOTES

- BUILDABLE_NOW: Flagship (all 4 spine sources), S1, S2, S3 (light aggregate), S4, S6-sidebar. = 4-source
  flagship + 5 supplementary shippable immediately from machine-readable OGL feeds.
- NEEDS-BULK/MANUAL: S5 formations-by-SIC (CH bulk product parse). Defer to a second build wave.
- LICENCE: **no blocker anywhere** — every source is OGL v3.0 (or BoE open terms). Attribution only.
  Contrast with the Solicitors site's SRA custom-licence named-firm restriction: the generalist macro
  barometer has NO named-entity constraint because it publishes national aggregates, not firm/entity
  rankings. Only self-imposed care: S3 payment-practices hero stays aggregate (reputational tact), and
  England-&-Wales-only coverage on insolvency needs a stated caveat.
- DISTINCTION FROM NICHE INDEXES: niche sites index ONE SIC (dental 86230, legal 69102). This flagship
  is explicitly the ALL-SECTOR, national macro tier — its unique selling point is the cross-sector
  league table and the fused formation-vs-insolvency-vs-survival composite that no single-SIC page can
  assemble. Do not narrow it to a SIC.
- Refresh cadence for the living index: monthly (insolvency) is the fastest heartbeat; run the barometer
  refresh monthly, roll in the quarterly CH + annual ONS layers as they publish.
