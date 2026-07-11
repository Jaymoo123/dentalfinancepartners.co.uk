# Flagship research/data asset proposal — Charities pilot (R3)

Date: 2026-07-11. Pattern: UK Landlord Tax Index (property estate, shipped 2026-06-09).

## Proposal: **UK Small Charity Finance Index**

An annually-refreshed, county/sector-segmented index of the finances of England & Wales
charities built from the Charity Commission's full register extract, answering questions no
rival publishes: what a "normal" small charity looks like financially, how many sit in each
scrutiny band (under £25k / IE band / audit band), reserves levels, income concentration,
and year-on-year survival/removal rates.

### Why this one

- **Source verified live 2026-07-11**: the Commission publishes a full downloadable register —
  https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download
  (HTTP 200; ZIP extracts in TXT/JSON, tables include charity, annual return history,
  financial history — evidence `raw/citation_checks.json`). No scraping, no licence problem
  (OGL). Companies House bulk data (for CIC cross-reference) also verified live:
  https://download.companieshouse.gov.uk/en_output.html (200).
- **Directly on-funnel**: the scrutiny-band segmentation (registration £5k / IE £25k / accruals
  £250k / audit £1m) is exactly the site's money topic — every index chart links the IE-vs-audit
  checker and the money pages.
- **Citable**: "X% of England & Wales charities fall in the independent-examination band" is the
  kind of statistic journalists and sector bodies (Civil Society, charity newsletters) cite —
  faceless data-PR, consistent with the no-named-expert constraint.
- **Nobody in the verified rival set has anything like it** (rival sites are service brochures +
  blogs; see COMPETITORS.md).

### Pipeline

1. Download full register ZIP (charity, charity_annual_return_history, financial tables) — monthly file.
2. Load to local DuckDB/SQLite (register is ~400k rows incl. removed charities; trivially small).
3. Derive: income bands vs scrutiny thresholds, sector (classification table), region,
   reserves where reported, filing lateness rates, removals/registrations per year.
4. Optional CIC layer: Companies House bulk snapshot filtered to CIC company type — CIC counts,
   growth, geography (headline "CICs vs charities" chart).
5. Static JSON out → one `/research/small-charity-finance-index` page + embeddable charts
   (same architecture as the Landlord Tax Index).

### Update cadence

Annual headline refresh (aligned to Commission data year) + a light quarterly counts refresh
(registrations/removals). Register file itself updates monthly, so re-runs are free.

### Risks / notes

- Financial detail (part B/reserves) is only rich for larger charities; small-charity analysis
  leans on income/expenditure headline figures — which is fine, the thresholds story only needs those.
- Scotland (OSCR) publishes a separate register download; v1 scope = England & Wales (matches
  house position 26), Scotland as a v2 extension.
- Verify at build time which extract tables are populated for removed charities (survival-rate metric).

## Rejected alternatives

- **Gift Aid uptake index** (HMRC charity tax relief statistics): real annual dataset, but it is
  HMRC's own headline publication — thin room to add value beyond re-charting.
- **Charity pay/CEO salary index**: data exists in accounts PDFs, but extraction is heavy
  (PDF parsing at scale) and reputationally spiky for a lead-gen site.
- **Independent examiner price index** (survey-based): no data source; would require outreach
  the estate model avoids.
