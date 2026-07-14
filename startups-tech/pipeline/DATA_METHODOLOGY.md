# UK Startup Formation and Survival Index — Data Methodology

## Source

**Companies House Advanced Search API**
https://developer.company-information.service.gov.uk/api/docs/
Licence: Open Government Licence v3.0
Publisher: Companies House (an executive agency of the Department for Business and Trade)

## Method

All figures are live hit-counts from the CH Advanced Search API, pulled 2026-07-15.

### Active / dissolved totals

- Combined total: single API query with `sic_codes=62011,62012,62020,62090,63110,63120,58210,58290` plus `company_status=active` or `company_status=dissolved`. CH deduplicates companies that list multiple SIC codes, so the combined total is correct to use (not the sum of per-SIC counts).
- Per-SIC breakdown: individual queries per SIC code, same status filters.

### Quarterly incorporations and dissolutions

- `incorporated_from` / `incorporated_to` date filter on the combined SIC query, no `company_status` restriction (all companies ever incorporated in that window, regardless of current status).
- `dissolved_from` / `dissolved_to` date filter for dissolutions.
- Quarters cover 2020-Q1 to 2026-Q2 (26 quarters).

### Annual formation counts

- Same `incorporated_from` / `incorporated_to` method, calendar-year windows, 2015-2025.

## SIC codes covered

| Code  | Label |
|-------|-------|
| 62011 | Ready-made interactive leisure and entertainment software development |
| 62012 | Business and domestic software development |
| 62020 | Information technology consultancy activities |
| 62090 | Other information technology service activities |
| 63110 | Data processing, hosting and related activities |
| 63120 | Web portals |
| 58210 | Publishing of computer games |
| 58290 | Other software publishing |

Rationale: 62011/62012/62020/62090 are the core software/IT codes per house_positions.md HP29. 63110/63120 cover SaaS infrastructure (hosting, data processing, web portals). 58210/58290 cover software publishing, including SaaS product companies that self-classify as publishers rather than developers.

## Date pulled

2026-07-15

## Honest limitations

1. **Snapshot, not cohort survival.** The active/dissolved ratio (44.0% active as at 2026-07-15) is a cross-sectional snapshot of all companies ever incorporated under these SIC codes. It is NOT a cohort survival rate. A company incorporated in 2024 has had far less time to fail than one incorporated in 2010. The snapshot rate understates long-run failure rates for older cohorts and overstates it for recent cohorts. Cite it as a "snapshot survival rate" with this caveat, never as "X% of UK tech startups survive".

2. **SIC self-reporting noise.** SIC codes are chosen by directors at incorporation. Many IT-services companies register under 62020 (IT consultancy) regardless of their actual activity (e.g., agencies, freelancers, non-tech businesses run through a limited company). The figures include a tail of companies whose primary activity is not technology.

3. **Dissolved ≠ failed.** The dissolved count includes: members' voluntary liquidations (tax-efficient exits for profitable founders), dormant shell companies struck off for non-filing, genuine failures, and companies that changed SIC code and were re-registered. It is not a pure failure signal.

4. **2020-Q2 dissolution anomaly.** CH suspended compulsory strike-off actions under the Corporate Insolvency and Governance Act 2020 (April-September 2020). 2020-Q2 shows only 892 dissolutions (vs a normal 8,000-14,000/quarter). The backlog cleared in 2020-Q4 and 2021-Q1. These three quarters must not be used as trend signals.

5. **UK-wide, no devolved split.** England, Scotland, Wales and Northern Ireland are included in all figures. No regional breakdown in v1 (the CH Advanced Search API does not support postcode-based filtering in combination with SIC and date filters at the hit-count level).

6. **No sole traders or partnerships.** CH data covers incorporated companies only. A freelance developer operating as a sole trader is invisible in this dataset.

## Re-running the pull

```
cd startups-tech/pipeline
python pull_ch_startup_index.py
```

Requires `COMPANIES_HOUSE_API_KEY` in `.env` at repo root (key already present).
Takes approximately 2 minutes (90 API calls at 400 ms spacing).
Output written to `startups-tech/web/src/data/startup-formation-survival-index.json`.
Raw API responses cached to `startups-tech/pipeline/_cache_ch_startup.json`.
