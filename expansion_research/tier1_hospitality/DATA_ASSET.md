# Flagship research/data asset proposal — Hospitality (R3)

Date: 2026-07-11. Pattern: UK Landlord Tax Index (property estate, shipped 2026-06-09;
CH API key already in .env).

## Proposal: **UK Hospitality Openings & Closures Index**

A quarterly-refreshed index of UK hospitality company formation and failure built from
Companies House data filtered to hospitality SIC codes (56101 licensed restaurants, 56102
unlicensed restaurants/cafes, 56103 takeaway shops/mobile food stands, 56210 event catering,
56290 other food services, 56301 licensed clubs, 56302 public houses and bars, 55100 hotels,
55201/55209 holiday & other accommodation) — incorporations vs dissolutions by sub-trade,
region and cohort survival ("what share of takeaways incorporated in 2021 still exist?").

### Why this one

- **Data verified pullable this run** (all three sources fetched live 2026-07-11, evidence
  `raw/citation_checks.json`):
  - CH free bulk snapshot of all live companies incl. SIC codes + incorporation date:
    https://download.companieshouse.gov.uk/en_output.html (200).
  - CH Advanced Search API filters by `sic_codes` + `incorporated_from/to` + `dissolved_from/to`
    (spec fetched 200) — gives dissolutions, which the bulk live-snapshot alone lacks.
  - SIC code table: https://resources.companieshouse.gov.uk/sic/ (200; 56xxx codes confirmed).
  - Context layer: Insolvency Service monthly stats collection (200) for CVL/administration
    counts to sanity-check the dissolution series.
- **Demonstrated search demand for exactly this statistic**: "how many pubs in the uk" family
  = 3,600/mo × 7 variants + "how many pubs in london" 880×3 (from paperchase/inn-control
  ranked-keyword pulls this run, KD 0-11). Inn Control ranks on it with a blog post; an
  always-current index page beats a static article.
- **Faceless data-PR**: "X takeaways opened for every pub that closed in 2026 Q2" is trade-press
  bait (Morning Advertiser, BigHospitality) with no named-expert requirement.
- **On-funnel**: every chart deep-links the sub-trade hubs (/for/pubs → pub closures series)
  and the staff-cost calculator (cost pressure narrative).
- **Nobody in the 48 verified rivals publishes anything like it** (sitemaps checked: service
  pages + blogs only).

### Pipeline

1. Quarterly: download bulk snapshot; filter SIC 55/56 prefixes → live-company counts by
   sub-trade/region (postcode district → region mapping already used by the Landlord Tax Index).
2. Advanced Search API: incorporations and dissolutions per quarter per SIC bucket
   (paged pulls; rate limits fine at this volume, same key as Landlord Tax Index).
3. DuckDB/SQLite locally → static JSON series → one `/research/hospitality-openings-closures-index`
   page + embeddable charts (same architecture as Landlord Tax Index, incl. /embed route).
4. Headline metrics: net openings by sub-trade, pub-count tracker (answers the 3,600/mo
   question directly), survival curves by incorporation cohort, regional heat map.

### Risks / notes

- SIC codes are self-reported and some operators file under generic codes — state methodology;
  the index measures "companies registered as", which is the same caveat all CH-based studies carry.
- Sole-trader cafes/B&Bs are invisible to CH — scope the index as incorporated hospitality
  and say so (the lead-gen audience skews incorporated anyway).
- Dissolution date ≠ trading-closure date (strike-offs lag); use rolling 4-quarter averages.

## Rejected alternatives

- **Pub-count-only tracker** (BBPA already publishes an annual number; too narrow, one-trade).
- **Menu-price inflation index** (needs menu scraping at scale; fragile, ToS-risky).
- **Hospitality wage index from job ads** (Indeed/Caterer scraping — ToS risk, and ONS AWE
  already covers it; thin added value).
- **Tips/tronc adoption survey** (no data source without outreach; estate model avoids it).
