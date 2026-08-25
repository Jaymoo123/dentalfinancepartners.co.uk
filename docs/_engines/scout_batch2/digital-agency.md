# Research-Authority scout: digital-agency

Scouted 2026-07-23. Site key `digital-agency` (dir `digital-agency/`). Faceless brand.
GREENFIELD — no existing research `.ts` data asset (only `digital-agency/seo-research/` SEO scratch).
Target: UK digital / marketing / creative agencies. Calculators excluded. Build the proven
universal template (CH formations/dissolutions by SIC, insolvency-by-SIC, ONS Business
Demography survival, seasonality, Payment Practices) PLUS the niche register/churn asset.

## SIC cluster (confirmed, SIC 2007)
Core creative/marketing cluster — all in the target niche:
- **73110** Advertising agencies — the anchor code (~46k active companies on CH; ONS adhoc has
  VAT/PAYE enterprise counts by size band, .xls, OGL, ref 1119).
- **73120** Media representation (selling ad space/time).
- **70210** Public relations & communications.
- **74100** Specialised design activities (branding, graphic, digital design).
- **73200** Market research & public opinion polling.
- **62012 / 62020** Business/software web development (agencies straddle these).
- **59112 / 74201** Content / photography (long tail).
Angle spine: **formation boom + notoriously high churn / short lifespan**. Advertising sits in SIC
division 731, which IS isolable to 3-digit in both CH and Insolvency Service data — so unlike some
niches, we can cut a genuinely agency-specific churn series. That makes a **survival/churn index the
flagship**, not a fallback.

---

## FLAGSHIP — UK Agency Survival & Churn Index
BUILDABLE_NOW. Combine two OGL machine-readable sources into one living index that answers "how
long do agencies actually last, and how many die each year".

1. **Companies House Free Company Data Product** — full monthly snapshot, multi-part CSV.
   - URL: http://download.companieshouse.gov.uk/en_output.html
   - Fields: `CompanyNumber`, `CompanyCategory` (Ltd vs LLP vs PLC), `CompanyStatus`
     (live/dissolved), `IncorporationDate`, `SICCode.SicText_1..4`, `DissolutionDate`.
   - Licence: OGL v3.0. Cadence: monthly (compiled to prior month-end).
   - Filter to the SIC cluster above → derive **formations per year**, **dissolutions per year**,
     **net register growth**, and **live-company age distribution** (median company age = proxy for
     "typical agency lifespan"). Advertising 73110 alone ~46k live.
2. **ONS Business Demography, UK: 2024** — reference tables, .xlsx + .csv.
   - Bulletin: https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/2024
   - Dataset: https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable
   - Table 2 = birth/death rates **by industry at 4-digit SIC**; survival tables give 1-to-5-year
     survival of birth cohorts.
   - Licence: OGL v3.0. Cadence: annual (last 20 Nov 2025; next ~Nov 2026).
   - Headline hooks: **5-year survival just 38.4%** (2019 cohort to 2024) — i.e. ~3 in 5 new
     businesses gone in 5 years; regional spread 30.6% (W Mids) to 43.5% (SW). **Information &
     Communication** has the **highest death rate context** and highest high-growth share (9.2%),
     birth 10.7% / death 9.8%. Business Admin & Support (agency-adjacent) birth 14.4% / death 13.5%
     — the churniest major sector.
   - Narrative angle: *"Most agencies don't make five years"* — pair the ONS 38.4% survival floor
     with our CH-derived agency-specific death counts to claim the definitive agency-lifespan number.

Why flagship: no public source publishes an agency-specific formation+churn+survival series; the
"agencies are short-lived" story is widely believed but never quantified. Direct lead-gen edge —
founders researching "will my agency survive" land on the cited standard.

---

## SUPPLEMENTARY

### S1 — Agency Insolvency Monitor (BUILDABLE_NOW)
Insolvency Service **Company Insolvency Statistics**, monthly release with industry tables.
- Landing (latest): https://www.gov.uk/government/collections/company-insolvency-statistics-releases
- Table **1c** = insolvencies by **3-digit SIC**, monthly back to Jan 2021, annual back to 2014;
  record-level CSV back to 2014. Table 4b = Scotland to 3-digit.
- Licence: OGL v3.0. Cadence: monthly (industry supplementary tables quarterly: Jan/Apr/Jul/Oct).
- Isolability: **division 731 (advertising & market research) IS captured to 3-digit** → genuinely
  agency-attributable, unlike the coarse Section-level fallback other niches settle for. Note the
  standard caveat: "industry captured" is a subset of all cases; state coverage %.
- Angle: track agency insolvencies vs the all-industry trend; Admin & Support was a top-5 insolvency
  sector (2,394 cases, 10% of captured, 12m to Nov 2024) — position agencies against that backdrop.

### S2 — Agency Slow-Payment / Cashflow Index (NEEDS-MANUAL join, moderate)
**Payment Practices & Performance** bulk data — every large UK company's reported payment behaviour.
- Bulk CSV export: https://check-payment-practices.service.gov.uk/export/csv/  (portal
  https://www.gov.uk/check-when-businesses-pay-invoices)
- Fields: average days to pay, % paid ≤30 / 31–60 / 61+ days, % paid late vs agreed terms,
  reporting company number. Licence: OGL v3.0. Cadence: twice-yearly filings, ~5,000+ reporters.
- CAVEAT: the file carries **no SIC code**, and agencies (mostly SME) sit *below* the reporting
  threshold — so they are the **suppliers being paid slowly**, not the reporters. Angle flips to
  *"which client sectors pay their agencies slowest"*: join reporter `CompanyNumber` → CH SIC to
  bucket the big brand/retail/media payers by sector and rank average days-to-pay. Buildable but
  requires a company-number→SIC merge → tag NEEDS-MANUAL. Strong faceless lead-gen ("agencies wait
  X days to get paid — here's who's worst").

### S3 — Agency Formation Seasonality (BUILDABLE_NOW)
Derived from the same CH Free Company Data Product (S/flagship source), no new download.
- `IncorporationDate` by month across the SIC cluster → month-of-year formation curve.
- Licence/cadence: inherits CH OGL, monthly. Angle: *"when do agencies get founded"* (Jan spike?),
  low-cost recurring content refresh.

### S4 — Digital-sector GVA / turnover context (BUILDABLE_NOW, macro backdrop)
ONS / DCMS **Economic Estimates** — digital + advertising sector GVA and turnover.
- ONS non-financial business economy (ABS) turnover by SIC: XLSX, OGL, annual. Landing:
  https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/bulletins/uknonfinancialbusinesseconomy/latest
- DCMS Economic Estimates (advertising & marketing subsector GVA): XLSX/CSV, OGL, annual —
  https://www.gov.uk/government/collections/dcms-sectors-economic-estimates
- Angle: size-of-prize / "the agency economy is worth £Xbn" framing to anchor the index intro.
  Supplementary context only, not a standalone flagship.

---

## LICENCE STATUS
No blockers. Every confirmed source is **OGL v3.0** (CH, ONS, Insolvency Service, Payment Practices,
DCMS) — aggregate stats + named-entity ranking both permitted. **No IPA / DMA industry reports used**
(those are membership/paywalled, non-OGL, named-firm restrictions) — deliberately excluded so the
whole asset stays freely (re)publishable and citation-safe. Standard attribution line per source.

## BUILD TAGS
- BUILDABLE_NOW: Flagship (CH + ONS), S1 insolvency, S3 seasonality, S4 macro context — 4.
- NEEDS-MANUAL: S2 slow-payment (company-number→SIC join) — 1.
- Bulk-download caveat: CH Free Company Data Product is a large multi-part monthly ZIP/CSV (~5m rows)
  — one-time parser + monthly refresh cron, same pattern as the Solicitors LLP-vs-Ltd build.
