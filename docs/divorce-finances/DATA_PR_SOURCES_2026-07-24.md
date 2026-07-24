# Divorce-finances site: data-PR source verification (2026-07-24)

All sources verified live today. Every URL below was fetched or downloaded and inspected. No fabricated series. Nulls stay null.

## 1. MoJ Family Court Statistics Quarterly (FCSQ)

- **Latest edition:** October to December 2025, published 26 March 2026. Bulletin: https://www.gov.uk/government/statistics/family-court-statistics-quarterly-october-to-december-2025/family-court-statistics-quarterly-october-to-december-2025
- **Landing page (attachments):** https://www.gov.uk/government/statistics/family-court-statistics-quarterly-october-to-december-2025
- **CSV zip (verified, downloaded, 25 files):** https://assets.publishing.service.gov.uk/media/69c396303ed0546101e0dc2e/FCSQ_Q4_2025.zip
- **ODS tables:** https://assets.publishing.service.gov.uk/media/69c394e055cc7fccb3e0dc29/Family_Court_Tables__Oct-Dec_2025_.ods
- **Cadence:** quarterly (late Mar / Jun / Sep / Dec). **Licence:** OGL v3.
- **Verified CSV contents relevant to us:**
  - `CSV Divorce National 2025 Q4.csv` — columns `type, order_type, year, quarter, proceeding_type, law, contested, count`. Applications, conditional orders, final orders, quarterly back to 2003.
  - `CSV Divorce Timeliness 2025 Q4.csv` — columns `stage, year, quarter, case_type, law, count, mean_weeks, median_weeks`. Time from application to conditional and final order.
  - `CSV Divorce New Law 2025 Q4.csv` — sole vs joint applications under DDSA 2020.
  - `CSV Divorce Progression National 2025 Q4.csv` — cohort progression of applications through stages.
  - `CSV Financial Remedy National 2025 Q4.csv` — columns `type, year, qtr, consent, count`; applications and disposals, Contested / Initially Contested / Uncontested, quarterly back to 2006.
  - `CSV Matrimonial Matters County & UA Annual.csv` — divorce counts by county and unitary authority (local angle for PR).
- **Headline figures (Q4 2025 bulletin):** 2025 annual: 109,184 divorce applications, 105,704 final orders; mean 41 weeks to conditional order, 69 weeks to final order (median 28 / 38 weeks in Q4). Financial remedy: 49,067 applications in 2025 (up 8 percent), 46,651 disposals; 74 percent uncontested.

## 2. ONS divorces in England and Wales

- **Latest bulletin:** Divorces and dissolutions in England and Wales: 2023, https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/divorce/bulletins/divorcesinenglandandwales/2023
- **Dataset:** https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/divorce/datasets/divorcesinenglandandwales — latest edition 2023, released 2 July 2025, XLSX (divorcesworkbook2023finalcorrected.xlsx). Next release "to be announced".
- **Series:** annual divorce numbers and rates by duration of marriage, sex, to whom granted, reason. 2023: 102,678 divorces.
- **Cadence:** annual, roughly 18 months in arrears. **Licence:** OGL v3.
- **Verdict:** good context layer (median marriage duration, age at divorce) but too laggy and annual to headline an updatable asset. Feed into copy, not the core index.

## 3. Pension sharing orders — NOT reliably published

- The former FCSQ table of financial remedy disposals by order type (which included pension sharing) was withdrawn: MoJ deemed the data quality unsuitable for publication and it is not in the current tables. Verified: `CSV Financial Remedy National 2025 Q4.csv` contains zero pension rows; the Q4 2025 bulletin makes no mention of pension sharing.
- Guide to Family Court Statistics confirms the limitation: https://www.gov.uk/government/statistics/family-court-statistics-quarterly-october-to-december-2025/guide-to-family-court-statistics
- **Do not build an asset on pension sharing order volumes.** Any figure would need an FOI or parliamentary-answer citation with a fixed date; not evergreen.

## 4. DWP Child Maintenance Service statistics — strong

- **Latest edition:** data to March 2026, published ~July 2026: https://www.gov.uk/government/statistics/child-maintenance-service-statistics-data-to-march-2026/child-maintenance-service-statistics-data-to-march-2026
- **Series:** caseloads, maintenance due and paid, Direct Pay vs Collect and Pay split (quarter to Mar 2026: £405.1m due, £292.3m Direct Pay, £112.8m Collect and Pay), compliance rates, cumulative unpaid arrears (£791.2m since 2012, 7 percent of all maintenance due). Granular tables also on Stat-Xplore (regional breakdowns).
- **Cadence:** quarterly (Mar, Jun, Sep, Dec; next 29 September 2026). **Licence:** OGL v3.

## 5. Legal aid family / mediation — usable secondary

- **Legal aid statistics quarterly, Jan to Mar 2026:** https://www.gov.uk/government/statistics/legal-aid-statistics-quarterly-january-to-march-2026 (bulletin: https://www.gov.uk/government/statistics/legal-aid-statistics-quarterly-january-to-march-2026/legal-aid-statistics-england-and-wales-bulletin-jan-to-mar-2026). MIAM volumes and mediation outcomes (MIAMs up 2 percent YoY; outcomes up 8 percent, about half pre-LASPO levels). Interactive data at https://data.justice.gov.uk/legalaid/Legal-aid-mediation
- **Cadence:** quarterly. **Licence:** OGL v3. Family Mediation Council publishes only occasional surveys, not a reliable series.
- **FCSQ bonus:** `CSV Legal Representation National 2025 Q4.csv` in the same zip covers legal representation in family cases (litigants in person angle, strong PR hook).

## Unexpectedly good

- FCSQ divorce timeliness has mean AND median weeks by stage back to 2003 old-law petitions, giving a clean "how long divorce really takes" trend across the no-fault reform.
- County and unitary authority matrimonial CSV allows a "divorce map of England and Wales" local-PR layer.
- Legal representation CSV: rise of litigants in person in financial remedy is a ready-made narrative.

## RECOMMENDATION — build these 2 assets

Pattern as construction-cis uk-construction-index: snapshot JSON checked into repo + research page + `/data` CSV route, refreshed each quarterly release.

**1. UK Divorce and Financial Remedy Index (FCSQ-based).** Quarterly divorce applications, conditional and final orders, mean and median weeks to final order, plus financial remedy applications and contested share, all from the FCSQ CSV zip (single OGL source, quarterly cadence, series back to 2003/2006). Headline hooks: "divorce now takes 69 weeks on average", "financial remedy applications up 8 percent", county-level map. Uniquely journalist-friendly and no competitor maintains it as a live index.

**2. UK Child Maintenance Tracker (DWP CMS-based).** Quarterly caseload, Direct Pay vs Collect and Pay money split, compliance, and cumulative arrears (£791.2m). Directly on the money side of separation, quarterly OGL data, and the arrears figure is a perennial national-news hook. Complements asset 1 without overlapping source or narrative.

ONS annual data and legal aid mediation stats feed context sections of both pages rather than standing alone.
