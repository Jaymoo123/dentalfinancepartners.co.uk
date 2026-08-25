# Research-Authority scout: hospitality (batch 2)

Scouted 2026-07-23. Site key `hospitality`, dir `hospitality/`. Niche: UK hospitality
(restaurants, cafes, pubs, bars, hotels, takeaways, catering). GREENFIELD (no existing
research asset). Build the proven universal template (CH formations-by-SIC,
insolvency-by-SIC-section, ONS Business Demography survival, seasonality) PLUS the
niche-specific FSA food-hygiene register asset. Calculators excluded.

## Niche shape: SIC codes + active-company scale
Section I (Accommodation and food service activities) — the cleanest, highest-signal
section in the whole SIC scheme for insolvency (see flagship). ONS enterprise counts
(IDBR snapshot 14 Mar 2025; latest 5-digit split is 2021, good proxy):
- **56101** Licensed restaurants — ~29,680
- **56102** Unlicensed restaurants & cafes — ~24,810
- **56103** Take-away food shops / mobile stands — ~40,570
- **56210** Event catering — (in div 56, count via Business Counts pull)
- **56290** Other food service (contract/canteen) — (div 56)
- **56301** / **56302** Licensed clubs / public houses & bars — ~29,865 (pubs+bars)
- **55100** Hotels and similar accommodation — (Section I, accommodation)
- **55201/55202/55209/55300/55900** Holiday/short-stay, camping, other accommodation
- **Section I total: ~233,080 businesses (UK, 2025)** — one of the largest, most
  fragmented, lowest-margin sections. This is the sales pitch: high churn = high advice need.

---

## FLAGSHIP: UK Hospitality Insolvency Index + survival curve
**Why flagship:** hospitality carries the UK's highest company insolvency burden. Section I
(accommodation + food) is a *clean, isolable* SIC section in the Insolvency Service tables —
unlike dental (Section Q) or legal (Section M) where the niche is buried in an aggregate.
Over the 12 months to May 2026, accommodation & food services accounted for **~3,296
insolvencies (~14% of all cases) — the third-largest sector**. Powerful narrative:
"the hardest business in Britain to keep alive." Pair the insolvency rate with an ONS
survival curve for a single flagship: *how many hospitality firms born each year are still
trading 1/3/5 years later, and how many fail — by type (CVL / administration / compulsory)*.

- **Source A — Insolvency Service, Company Insolvency Statistics (monthly + quarterly
  industry tables).** Industry tables broken down by 2007 SIC section; Table 1c (E&W),
  Table 4b (Scotland). Type-of-procedure split within section published quarterly
  (Jan/Apr/Jul/Oct).
  - Format: **XLSX** + ODS (machine-readable). Licence: **OGL v3.0**. Cadence: monthly
    (industry detail refreshed with each release; procedure-split quarterly).
  - Landing: https://www.gov.uk/government/collections/insolvency-service-official-statistics
  - Latest example file (June 2026):
    `https://assets.publishing.service.gov.uk/media/6a58e5a15ca06bf11ccb4335/Industry_Tables_in_Excel__xlsx__Format_-_Company_Insolvency_Statistics_June_2026.xlsx`
  - Headline: ~3,296 accom+food insolvencies / 12m to May 2026 (~14%, 3rd-largest sector).
  - **BUILDABLE_NOW.** Section I is genuinely clean here (unlike sibling niches) — no caveat needed.

- **Source B — ONS Business Demography, survival by industry section.** Births, deaths,
  1-to-5-year survival for Section I. Regional five-year survival available via
  Explore-Local-Statistics indicator.
  - Format: **XLSX/CSV**. Licence: **OGL v3.0**. Cadence: annual (autumn).
  - https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/latest
  - Indicator: https://www.ons.gov.uk/explore-local-statistics/indicators/business-survival-five-year
  - Headline: SW region highest 5yr survival 43.5% (2019 cohort → 2024); accom+food
    consistently below the all-industry average.
  - **BUILDABLE_NOW.**

Narrative angle: "Hospitality Insolvency Index — the highest-risk section in the UK
economy, tracked monthly, with survival odds by year and region." Living, re-runnable, citable.

---

## Supplementary assets

### S1 — FSA Food Hygiene (FHRS) density + quality map  [BUILDABLE_NOW, huge dataset]
The killer supplementary: a live, ~**610,698-establishment** open register of every rated
food business in the UK, geocoded, by local authority, with hygiene score, business type
(Restaurant/Cafe/Canteen, Pub/bar, Takeaway, Hotel, etc.) and rating date. Enables
region/LA density maps, "hygiene league tables", new-opening / churn proxies, and
business-type mix by area — none of which anyone publishes as a clean living index.
- Format: **XML + JSON + CSV**, per-local-authority files **and** an all-authorities bulk
  file; live **API** (no key, no registration), XML refreshed **daily**.
- Open-data portal: https://ratings.food.gov.uk/open-data
- API v2 docs: https://api.ratings.food.gov.uk/help  · LA list: https://ratings.food.gov.uk/authorities/xml
- Licence: **VERIFY** — page references FSA terms & conditions; FHRS data is widely
  republished and generally treated as OGL/open, but the open-data page links a bespoke
  T&C rather than a bare OGL badge. Flag: confirm attribution wording before flagship
  publish; no named-entity restriction expected, but no adverse "worst hygiene" naming of
  individual businesses (reputational — keep to aggregate LA/region/type stats).
- Angle: "Where Britain eats — hospitality density and hygiene by region." Ties directly to
  formations (new SIC-56 companies vs new FSA registrations).

### S2 — Companies House formations / dissolutions across the 55xxx/56xxx cluster  [BUILDABLE_NOW]
Same engine as the CH-SIC pilot: monthly formations + dissolutions per 5-digit SIC across
the hospitality cluster (56101/02/03, 56210/290, 56301/302, 55100 + accommodation sub-codes).
- Source: CH free bulk snapshot `CompanyCategory`/`SICCode` fields.
  http://download.companieshouse.gov.uk/en_output.html (monthly full snapshot, CSV, OGL).
- Add seasonality overlay (formations peak/trough by month) — hospitality is strongly seasonal.
- Licence: **OGL**. **BUILDABLE_NOW** via existing niche engine config (add hospitality SIC set).

### S3 — ONS UK Business Counts: hospitality density by region + size band  [BUILDABLE_NOW]
Enterprise/local-unit counts and turnover for Division 55 & 56 by 5-digit SIC, region, and
employment size band — the denominator for every rate above (insolvencies per 1,000 firms,
FSA establishments per capita).
- https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/ukbusinessactivitysizeandlocation/latest
- Nomis (query builder, CSV/API): https://www.nomisweb.co.uk/articles/1405.aspx
- Format: **XLSX/CSV + Nomis API**. Licence: **OGL v3.0**. Cadence: annual (Sept). IDBR snapshot Mar 2025.
- **BUILDABLE_NOW.**

### S4 — Insolvency procedure-mix within Section I  [BUILDABLE_NOW]
From the same Insolvency Service quarterly supplementary tables (S-A above): split accom+food
insolvencies by CVL vs administration vs compulsory vs CVA over time. Distinct angle:
"how hospitality firms die" — CVL-dominated, rising administrations narrative.
- Format XLSX, OGL, quarterly. **BUILDABLE_NOW** (same download as flagship, extra sheet).

### S5 — Regional / devolved-nation cut  [BUILDABLE_NOW, low effort]
Scotland insolvency (Table 4b) + ONS Scotland/Wales/NI business counts + FSA covers all four
nations. Enables a UK-nations comparison layer without a new source.

---

## Buildable-now vs needs-bulk
- **BUILDABLE_NOW (all core):** Flagship (Insolvency Section I + ONS survival), S1 FSA,
  S2 CH cluster, S3 Business Counts, S4 procedure-mix, S5 nations. Every asset is
  machine-readable and OGL (FSA licence to confirm — see below). No PDF-only blockers.
- **NEEDS-BULK / heavier parse:** FSA all-authorities download is large (~610k rows, ~380+
  LA files if going per-LA) — one-time bulk ingest + geocode join, but mechanical. CH bulk
  snapshot is the usual monthly ~5GB parse (already handled by the pilot engine).
- **DEFER / MANUAL:** CH filed accounts (XBRL turnover/profit for SIC 56/55) — medium effort,
  defer as a later "hospitality margins" layer. UKHospitality trade reports = PDF/paywalled,
  not a data source.

## Licence flags
- Insolvency Service, ONS Business Demography, ONS Business Counts, Companies House bulk:
  all **OGL v3.0** — clean, attribution only.
- **FSA FHRS: VERIFY before publish.** Open-data page cites bespoke T&C rather than a bare
  OGL badge; treat as open+attribution, keep to aggregate stats, avoid naming individual
  low-rated businesses. This is the only licence item needing a look before the flagship ships.

## Build note
Cleanest greenfield of the batch: Section I is a rare case where the niche maps *exactly*
onto one whole SIC section, so the insolvency flagship needs no "buried in an aggregate"
caveat. Reuse the CH-SIC + insolvency + survival engine wholesale; the only new-source work
is the FSA ingest, which is worth it for the density/hygiene map (nothing comparable is
published as a living index).
