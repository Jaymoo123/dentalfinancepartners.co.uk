# UK Landlord Tax Index — methodology

The UK Landlord Tax Index is a faceless, data-PR / GEO asset on the Property
site: a transparent, sourced read on how the tax system is reshaping UK
buy-to-let. It is built entirely from official open data, so every figure is
independently verifiable. Page: `/research/landlord-tax-index`.

## What it measures

**Hero metric — landlord limited-company incorporations.** The number of new UK
companies incorporated each month under the four real-estate SIC codes:

| SIC | Meaning | Role |
|-----|---------|------|
| 68209 | Other letting and operating of own or leased real estate | **Primary** proxy for a buy-to-let / landlord company |
| 68100 | Buying and selling of own real estate | Trading / developer companies |
| 68320 | Management of real estate on a fee or contract basis | Letting agents / managers |
| 68201 | Renting and operating of Housing Association real estate | Housing associations |

We report 68209 as the headline "landlord company" line, plus the **deduplicated
union** of all four codes as a wider "all property companies" figure (a company
can list up to four SIC codes, so a naive sum double-counts; the union is the
true unique count).

**Context metric — house prices.** Average price by UK nation from the HM Land
Registry UK House Price Index. Rising values increase a landlord's capital gains
and stamp duty exposure, which is part of what changes the maths on holding
property personally versus through a company.

## Sources

- **Companies House Advanced Search API** (`/advanced-search/companies`),
  filtered by `sic_codes` and `incorporated_from` / `incorporated_to`. The
  `hits` field is the count. Open data under the Open Government Licence.
- **HM Land Registry UK House Price Index** "Average prices" monthly CSV. Open
  data under the Open Government Licence.

## How the counts are derived

- For each calendar month we query the Advanced Search API once per SIC code and
  once for the union, reading `total` (`hits`).
- Counts are **gross**: dissolved companies remain on the Companies House
  register (just marked dissolved), so the series is **not** affected by
  survivorship. Verified: e.g. March 2016 returns 1,888 for SIC 68209 = 1,512
  active + 360 dissolved + a few in liquidation.
- The **most recent two months are provisional** and excluded from every
  headline figure, because Companies House indexes very recent incorporations
  with a short lag (the newest months under-count until the index catches up).
  On the page these months render as a dashed tail.
- Headline claims use **complete calendar years** and **trailing 12 months**, not
  single months, so they are robust to month-to-month noise and seasonality
  (incorporations always dip around the turn of the year).

## Refresh

Re-run the pipeline to update:

```
python -m optimisation_engine.ingestion.ingest_landlord_data --execute        # JSON + Supabase
python -m optimisation_engine.ingestion.ingest_landlord_data --execute --no-supabase   # JSON only
```

This rewrites the committed snapshot `Property/web/src/data/landlord-tax-index.json`
(which the page imports at build time) and upserts the history into Supabase
(`landlord_incorporations`, `housing_market_series`). Cadence: quarterly is
enough for the narrative; monthly if used for ongoing PR. The page text and the
CSV download both read the snapshot, so they never drift apart.

## Attribution and licence

The underlying data is Crown copyright / Open Government Licence. The Index
(selection, framing, charts) is free to cite with attribution to **Property Tax
Partners** (propertytaxpartners.co.uk). There is no named spokesperson: this is a
data release, attributable as "Property Tax Partners analysis of Companies House
and HM Land Registry data".
