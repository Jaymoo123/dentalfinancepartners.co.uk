---
slug: online-seller-index
tier: data-asset
route: /research/online-seller-index
intent: Flagship faceless data-PR asset. Companies-House-derived quarterly index of the UK incorporated online-seller economy. Deep-links the money pages; national/trade-press bait with no named-expert requirement (credential constraint). DEDUP_AUDIT A1 = UNIQUE (nothing in the estate, no rival runs one).
---
# UK Online Seller Business Index: data asset brief

## The wedge (DEDUP_AUDIT A1 = UNIQUE)

The content field in this niche is saturated (14 dedicated firms, 868-URL SaaS content arm); the DATA field is empty. No rival publishes a Companies-House-derived, methodology-stated index of the UK online-seller economy (DATA_ASSET.md: the 14 firms' sitemaps are service pages + blog guides; the SaaS layer publishes survey-based marketing content, not a CH-derived index). This is the clearest genuine wedge in the whole niche. Pattern mirror: the property estate's UK Landlord Tax Index (shipped 2026-06-09; CH API key already in .env; loader + /embed architecture reused). Doctrine mirror: the pharmacies index — REAL public data only, zero fabricated figures.

## HARD NO-FABRICATION RULE (non-negotiable, mirror pharmacies index doctrine)

Every number on this page is computed from a named public source and reproducible from the pipeline. NO illustrative, estimated, rounded-for-effect, or placeholder figures ship in the published asset. If a series cannot be built from the sources below, the page omits it and says so in the methodology. No "approximately N" without the source computation behind it. A figure with no source computation is a build blocker, not a copy choice. The methodology section publishes the exact SIC code set, date ranges, and filters so any reader can reproduce the counts. Charts render only from the pipeline's static JSON series; no hand-entered data points.

## Data sources (all fetched live 2026-07-12, evidence raw/citation_checks.json, 32/32 pass — DATA_ASSET.md)

- Companies House free bulk snapshot (all live companies incl. SIC + incorporation date): https://download.companieshouse.gov.uk/en_output.html — same file powers the Landlord Tax Index; loader exists.
- Companies House SIC table (confirms 47910 is a real filterable code): https://resources.companieshouse.gov.uk/sic/
- Companies House Advanced Search API (dissolutions by `sic_codes` + `dissolved_from/to`; same key as Landlord Tax Index) — the bulk snapshot alone lacks deaths, so births/deaths need the API.
- ONS internet-retail sales as a proportion of all retail (time series J4MC/DRSI): https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi — demand-side cross-check.
- Insolvency Service monthly statistics — sanity-check the dissolution series.

## SIC code set (publish openly in methodology — DATA_ASSET.md)

- PRIMARY: 47910 (retail sale via mail order houses or via internet).
- LABELLED SECONDARY series (never blended silently into the headline): 47990 (other retail not in stores); 46900 (non-specialised wholesale — the common FBA-wholesaler code).

## Headline series / chart + table plan

1. Online-retail company incorporations vs dissolutions, by quarter (births/deaths/net) — CH bulk snapshot + Advanced Search API. Line/bar chart + data table.
2. Cohort survival curves ("what share of internet-retail companies incorporated in the 2021 lockdown boom still exist?") — CH incorporation date + dissolution date. The data-PR headline generator.
3. Live counts by region (postcode-district mapping reused from Landlord Tax Index) — table + optional map.
4. ONS internet-retail sales proportion (J4MC/DRSI) as a demand-side overlay against company births — dual-axis chart, external sanity anchor.
5. Insolvency Service overlay — sanity band on the dissolution series (context, not headline).

Each chart: methodology note beneath it naming the source, the SIC set, and the date range. Every chart has a downloadable/embeddable version (/embed route, Landlord Tax Index architecture).

## Update cadence

Quarterly refresh (DATA_ASSET.md pipeline). Publish the "last refreshed" date and the next scheduled refresh on the page. The timely hook renews itself: digital-platform reporting (data to HMRC since Jan 2024, HP 12) + the HMRC side-hustle campaign keep the "seller population under scrutiny" narrative live.

## Pipeline (DATA_ASSET.md)

1. Quarterly: CH bulk snapshot → filter SIC 47910 (primary) + 47990/46900 (labelled secondary) → live counts by region.
2. CH Advanced Search API: incorporations + dissolutions per quarter per SIC bucket → births/deaths/net + cohort survival curves.
3. ONS J4MC/DRSI CSV ingest → demand-side overlay.
4. DuckDB/SQLite locally → static JSON series → /research/online-seller-index page + embeddable charts.

## Risks / methodology caveats (state ON the page — DATA_ASSET.md)

- SIC noise: 47910 misses sellers filing under product-specific retail codes and captures some legacy catalogue/mail-order firms. Mitigate by (a) publishing the code-set methodology openly, (b) the ONS overlay as external sanity check, (c) emphasising FLOWS (births/deaths/cohorts, robust to constant misclassification) over absolute levels.
- Marketplace-only sole traders (the Vinted/eBay side-hustle layer) NEVER appear in Companies House — the index measures the INCORPORATED seller economy only. Say so explicitly.
- Dormant/agent-address companies inflate live counts; filter on accounts status where the snapshot allows (as Landlord Tax Index does).
- No regulator layer exists (unlike CQC for care); the ONS series is the external anchor.

## Data-PR framing (faceless — credential constraint)

Headline archetype: "1 in N UK internet-retail companies incorporated in the 2021 boom has already dissolved." National + trade press (Tamebay/ChannelX, InternetRetailing) bait with NO named-expert requirement. No named author, no quoted expert, no credential claim (estate rule: off-site authority must be faceless data-PR). The methodology and the data ARE the authority.

## Internal links (real launch-core slugs only — on-funnel deep links)

- Cohort-survival / dissolution charts → /calculators/seller-take-home and /calculators/vat-threshold-tracker ("seller deaths" → margin/VAT reality).
- Incorporation series → /calculators/sole-trader-vs-ltd-sellers.
- Platform-reporting narrative → /services/hmrc-letter-online-sales and /blog/blog-platform-reporting-rules (HP 12/13).
- Hubs: /for/amazon-sellers, /for/shopify-sellers, /for/marketplace-sellers, /for/dropshippers.
- VAT depth where cross-border seller births are discussed: /vat/deemed-supplier-establishment.

## House positions touched (context only; the numbers on the page come from the DATA SOURCES, not the ledger)

- HP 12 (platform reporting in force since 1 Jan 2024, `platform_reporting_in_force`): the "seller population now visible to HMRC" hook.
- HP 13 (`platform_reporting_seller_exclusion`, 30 sales / €2,000): if the page mentions the reporting trigger, it is a report-exclusion, not a tax threshold.
- Note: unlike the calculators, this asset's figures are NOT ledger figures. Ledger keys apply only where tax facts are stated in prose; all index numbers must come from CH/ONS/Insolvency Service computations.

## Hallucination / danger zones

- NO fabricated, estimated, or placeholder figures anywhere (hard rule above).
- Never present SIC-47910 counts as "all UK online sellers" — incorporated only; marketplace sole traders excluded.
- Never blend the secondary SIC series into the headline silently.
- IOSS €150 / OSS £8,818 (HP 9/10) are FLAGGED — if cross-border seller commentary cites them, second citation required; prefer to link /vat/ioss-vs-oss rather than assert the figures here.
- No em-dashes.

## Stage 2 TODO

- Confirm the Landlord Tax Index loader + /embed architecture is reusable as-is for the SIC filter.
- Run the CH Advanced Search API for the dissolution series and confirm the API key/quota.
- Confirm ONS J4MC/DRSI CSV endpoint still resolves; pull the current series.
- Draft the methodology section (SIC set, date ranges, filters) before any chart is designed.
- Regenerate every headline number from the pipeline; nothing ships until reproducible.
