# Research-Authority scout: care (UK care sector)

Scouted 2026-07-23. Confirmed sources, formats, licences, flagship pick for the care-sector accountancy
brand (site key `care`, dir `care/`). Serves care homes, domiciliary/home care, supported living.
Build the proven universal template (CH formations-by-SIC, insolvency, ONS Business Demography survival)
PLUS the niche register asset (CQC care directory). Calculators EXCLUDED (owner not interested).
GREENFIELD assumed (no existing research asset for this site).

## SIC codes + approximate active-company count
Section Q (Human health & social work) — the care-provider spine:
- **87100** Residential nursing care activities — ~5,576 active cos (confirmed).
- **87200** Residential care for learning disability, mental health & substance misuse — (count needs CH bulk).
- **87300** Residential care activities for the elderly and disabled — (large; count needs CH bulk, est. ~8-12k).
- **87900** Other residential care activities n.e.c. (often children's/supported-living) — (count needs CH bulk).
- **88100** Social work activities without accommodation for the elderly and disabled (home care / day centres) — ~10,838 active cos (confirmed).
- **88990** Other social work activities without accommodation n.e.c. (supported living frequently lands here) — (count needs CH bulk).
Group total: **~30,000-40,000 active companies** (order-of-magnitude; exact per-code split = CH bulk parse, tag below).
CAVEAT: SIC is self-selected and coarse; many single-home operators sit in 87300/87900 interchangeably. The
authoritative COUNT of live services is CQC (below), not Companies House — CH is for the incorporation/insolvency layer.

## FLAGSHIP: **UK Care Home Density & Quality Index** — CQC Care Directory
The register asset. THE proprietary angle: no one publishes a living beds-per-capita + rating-distribution +
provider-concentration map off the raw CQC extract. This is the care-sector analogue of the construction-CQC
density pilot.
- Source page: https://www.cqc.org.uk/about-us/transparency/using-cqc-data
- **Care Directory** — CSV (+ZIP), **updated ~weekly**, ~18 MB. Every CQC-regulated location in England
  (name, postcode, region, local authority, provider, service types, location ID). Direct URL pattern:
  `https://www.cqc.org.uk/sites/default/files/YYYY-MM/DD_Month_YYYY_CQC_directory.csv`
  (e.g. `.../2026-02/11_February_2026_CQC_directory.csv`). Latest URL changes weekly — scrape the source page for the current link.
- **Care Directory with Filters** — ODS, **monthly**, ~23 MB. Adds **registered manager** + **care-home BED NUMBERS** (density denominator) and service-type filters.
- **Care Directory with Ratings** — ODS, **monthly**, ~25 MB. Latest Overall + 5-domain ratings per location (Outstanding/Good/Requires Improvement/Inadequate).
- **Deactivated Locations** — ODS, monthly, ~26 MB. Closed/archived locations → **care-home closure/churn tracker**.
- Licence: **Open Government Licence** (attribution to CQC required). Formats machine-readable (CSV + ODS both parse in pandas).
- Narrative angles: "care deserts" (beds per 100 over-65s by LA/region), provider concentration (top operators' share of beds),
  rating-quality map, closure churn. Headline scale: tens of thousands of active locations across England.

## Supplementary sources
- **Companies House formations by SIC** (87100/87200/87300/87900/88100/88990) — via existing niche ingestion engine config, OGL.
  Formation-rate + seasonality index per code. BUILDABLE_NOW (engine config). Exact per-SIC active counts = CH bulk CSV, see below.
- **ONS Business Demography — survival rates, SIC group 87 (residential care)** — XLSX, OGL, annual.
  https://www.ons.gov.uk/businessindustryandtrade/changestobusiness/businessbirthsdeathsandsurvivalrates
  Care-home 1/3/5-year survival curve — "how long care businesses last". BUILDABLE_NOW.
- **Skills for Care — ASC-WDS workforce estimates** — XLSX, **OGL v3.0**, updated annually (October).
  https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/workforceintelligence/About-our-data/Data-downloads.aspx
  ~20,000 locations / ~650k workers; vacancy rates, turnover, pay by region/service/job role → **care-workforce vacancy & pay index**. BUILDABLE_NOW.
- **DHSC Market Sustainability & Improvement Fund (MSIF) / Fair Cost of Care — LA provider fee reporting** — gov.uk spreadsheets (ODS/XLSX), OGL, annual (2023/24, 2024/25, 2025/26).
  https://www.gov.uk/government/publications/market-sustainability-and-improvement-fund-2025-2026-care-provider-fees
  153 LAs' fee rates + uplifts for care homes (nursing/residential) and supported living → **local-authority fee-rate map + self-funder cross-subsidy gap** (strong lead-gen: shows margin pressure by LA). BUILDABLE_NOW (multi-file parse, medium effort).
- **Company insolvencies by industry — Insolvency Service** — coarse. Care sits inside **Section Q (Human health & social work)**; residential care not isolable from the published aggregate. Include only with an explicit caveat; low standalone signal. BUILDABLE_NOW but weak.
- **CQC deactivated-locations churn** (from flagship extract) — no new source; join active vs deactivated for closure rate. BUILDABLE_NOW.

## Buildability tags
- BUILDABLE_NOW (direct machine-readable): CQC Care Directory (CSV weekly) + with-Filters/with-Ratings/Deactivated (ODS monthly); ONS demography SIC 87 (XLSX); Skills for Care ASC-WDS (XLSX); MSIF LA fees (ODS/XLSX, multi-file); CH formations-by-SIC via engine; insolvency Section Q (weak).
- NEEDS-BULK/MANUAL: exact **per-SIC active-company counts** + Ltd-vs-LLP/charity incorporation split → Companies House bulk product CSV (`https://download.companieshouse.gov.uk/en_output.html`), OGL, one heavy parse. Also CQC XBRL/filed-accounts turnover = defer.

## Licence blockers / risk flags
- **LaingBuisson** (Care Homes for Older People report, CareSearch, CareMonitor, Care Homes Database) = **COMMERCIAL / PAID** (~£1,295-£3,250 per report; subscription DBs). NOT open, NOT OGL. **EXCLUDE** — do not scrape or reuse; cite only as market context if a figure is already public.
- **ADASS** budget-survey / autumn-survey data = mostly PDF, membership-flavoured; treat as PDF-manual, not a build spine.
- **Reputational-damage flag (self-imposed, not a licence bar):** CQC ratings ARE reusable under OGL, but a FACELESS
  accountancy brand must NOT publish named-provider "worst care homes" rankings — defamation-adjacent and off-brand.
  Aggregate ratings by region/LA/service-type only; never a named-entity shame list.

## Build order
1. **CQC Care Home Density & Quality Index** (flagship — cleanest greenfield showcase, weekly CSV, strongest proprietary narrative, beds+ratings+density in one asset).
2. **MSIF LA fee-rate map** (lead-gen: names the margin pain by local authority).
3. **Skills for Care workforce vacancy/pay index**, then **ONS SIC-87 survival curve**, then CH formations/seasonality.
One site fully, deploy-gated, before next.
