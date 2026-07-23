# Research-Authority scout spec: startups-tech (UK tech startups / high-growth / SaaS)

Scouted 2026-07-23. Site key `startups-tech`, dir `startups-tech/`. GREENFIELD (no existing research asset).
Faceless brand, official/gov sources preferred, calculators excluded. Matches batch-1 template:
niche register asset + universal CH formations/insolvency/ONS survival, PLUS a distinctive
funding-reliefs flagship unique to this niche.

## Niche & SIC cluster
Tech-startup cluster on Companies House (active companies, first SIC, ~July 2026):
- **62012** business/domestic software development — ~87,581 active (first SIC). The spine code.
- **62020** IT consultancy activities — very large cohort.
- **62090** other IT service activities.
- **63110** data processing, hosting & related activities.
- **58290** other software publishing.
Combined cluster is well into six figures of active companies — one of the largest formation
cohorts on the register, and the fastest-forming. Distinct from the professional-services niches:
this niche's real story is **funding + R&D reliefs + survival of high-growth firms**, not just formations.

## FLAGSHIP: UK Tech-Funding Reliefs Index (SEIS/EIS)
**HMRC Enterprise Investment Scheme & Seed Enterprise Investment Scheme statistics.**
- URL: https://www.gov.uk/government/statistics/enterprise-investment-scheme-and-seed-enterprise-investment-scheme-may-2026
- Format: **ODS** ("Statistical Tables: 2026", ~23 KB). Machine-readable. NOT PDF-only.
- Licence: **OGL v3.0**. Clean, attribution only.
- Cadence: **annual**, May release.
- Time series: **EIS from 1993-94, SEIS from 2012-13** — a 30+ year spine, rare depth.
- Tables provided: industrial breakdown, geographical breakdown, distribution by funds raised,
  distribution of investors by investment size, advance-assurance requests (AAR).
- Headline figures (2024-25):
  - EIS: **3,735 companies** raised **£1,575m**. Info & Communication = **£550m (35%)** — the single
    largest sector. London + South East = £948m (60%).
  - SEIS: **2,430 companies** raised **£276m**. Info & Communication = **£115m (42%)**. London + SE = £181m (66%).
  - AAR 2025-26: EIS 3,310 applications (72% approved), SEIS 4,085 (76% approved) — a forward-looking pipeline signal.
- Narrative angle: **"Where UK startup equity money actually goes."** Tech is the dominant sector for
  both schemes; London/SE concentration is a "funding desert" story for the regions. The 30-year EIS
  series lets us plot the rise/fall of tax-advantaged startup funding — no one else publishes this as a
  living, sector-and-region index. Direct lead-gen: founders raising SEIS/EIS need advance assurance +
  compliance statements (SEIS1/EIS1) — accountant territory.
- Tag: **BUILDABLE_NOW** (single ODS, small, clean).

## Supplementary assets

### 1. R&D Tax Relief usage by tech firms — HMRC R&D Tax Credits statistics
- URL: https://www.gov.uk/government/statistics/corporate-tax-research-and-development-tax-credit/research-and-development-tax-credits-statistics-september-2024
  (latest edition September 2025; page auto-carries newest).
- Format: **two ODS files** — Main tables (~26 KB) + **Supplementary tables (~116 KB)**. Machine-readable.
- Licence: **OGL v3.0**. Cadence: **annual**, September.
- Breakdowns: by sector (SIC), by company size (SME scheme vs RDEC), by region, by claim-size band.
  Supplementary file = the detailed sector × size × region cross-tabs.
- Headline (2023-24): **46,950 claims** (down 26% YoY after anti-fraud clampdown), **£7.6bn relief**,
  £46.1bn qualifying expenditure. Information & Communication + Manufacturing + Professional/Scientific/Technical
  = **72% of claims, 71% of amount**; I&C is a top-two contributor.
- Angle: **"The R&D relief squeeze on tech."** The 26% claim collapse from HMRC compliance action is a live,
  founder-relevant story; pair with SEIS/EIS to show the two main state levers for tech startups. Strong
  lead-gen (R&D claims are advisory-heavy, high scrutiny now).
- Tag: **BUILDABLE_NOW**.

### 2. Tech-cluster formations index — Companies House
- Free Company Data Product (bulk snapshot): https://download.companieshouse.gov.uk/en_output.html
  (also http://download.companieshouse.gov.uk/ ). Monthly ZIP → CSV, ~5m live companies, includes SIC codes,
  CompanyCategory, incorporation date. **OGL**.
- Format: **CSV** (bulk). Machine-readable. Cadence: monthly.
- Build via existing engine niche config (mirror batch-1 CH formations-by-SIC + seasonality) over the
  62012/62020/62090/63110/58290 cluster.
- Angle: **"How fast is Tech UK being born?"** Monthly formation run-rate + seasonality for the software cluster;
  62012 alone is one of the biggest active cohorts on the register. Cross-reference formation surge vs SEIS/EIS
  uptake.
- Tag: **BUILDABLE_NOW** (engine already parses this bulk product for other sites).

### 3. Tech-startup survival curves — ONS Business Demography
- URL: https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/2024
- Format: **XLSX reference tables** (datasets attached to bulletin). Machine-readable. Licence **OGL**.
  Cadence: **annual**, November.
- Info & Communication section: births/deaths/survival + **high-growth rate 9.2% (highest of any industry)**;
  5-year survival for recent birth cohorts ~44% baseline (all-industry), I&C isolable at section level.
- Angle: **"Only ~X% of tech startups survive 5 years"** — the headline every founder searches. Pair the
  survival curve against the high-growth rate: tech is simultaneously the highest-churn AND highest-growth sector.
- Tag: **BUILDABLE_NOW**.

### 4. Tech-sector insolvency monitor — Insolvency Service
- Company insolvency statistics by industry (SIC section): https://www.gov.uk/government/collections/company-insolvency-statistics-releases
- Format: **ODS/CSV** tables. Licence **OGL**. Cadence: monthly/quarterly.
- Isolable at **SIC Section J (Information & Communication)** — coarser than 5-digit but directly usable, unlike
  the professional-services niches where legal/dental sit inside broad sections. Caveat the section-level grain.
- Angle: **"Tech failures, tracked monthly."** Complements ONS survival (annual, lagged) with a fresh monthly signal.
- Tag: **BUILDABLE_NOW** (with section-grain caveat).

### 5. Tech-cluster active register asset (niche register)
- Same CH Free Company Data Product; produce the niche register/snapshot (active counts, category mix
  Ltd vs LLP, age distribution, dormant vs trading) for the software cluster — the batch-1 "niche register asset" analogue.
- Tag: **BUILDABLE_NOW**.

## LICENCE BLOCKERS / DEFER
- **Beauhurst** (equity-deals dataset): **commercial, proprietary — NOT open.** Do not scrape/republish.
  Cite only as secondary context if ever needed. OMIT as a data asset.
- **British Business Bank — Small Business Equity Tracker**: report is PDF; underlying deal data is **licensed
  from Beauhurst** — cannot rebuild the dataset. Cite figures editorially only. **NEEDS-MANUAL / DEFER.**
- **Tech Nation legacy data**: organisation wound down (2023); datasets archived, licensing/continuity unclear
  and stale. **DEFER** — not a living source.
- HMRC EIS/SEIS + R&D + ONS + CH + Insolvency Service are all OGL — no named-entity or reputational-damage
  clauses (contrast Solicitors/SRA in batch-1). Cleanest licence footing of any batch-2 niche so far.

## Build notes
Flagship (SEIS/EIS ODS) is the smallest, cleanest, most distinctive asset — build first as the showcase, then
R&D relief (pairs to form a "state support for tech" duo), then the CH formations/register + ONS survival +
insolvency universals via existing engine config. All six BUILDABLE_NOW; zero bulk/manual dependencies for the
flagship. No non-OGL source is on the build path.
