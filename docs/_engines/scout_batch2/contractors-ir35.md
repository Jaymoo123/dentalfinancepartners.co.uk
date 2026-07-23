# Research-Authority scout spec: contractors-ir35

Scouted 2026-07-23. Site key `contractors-ir35`, dir `contractors-ir35/`. Faceless brand.
Niche: UK contractors / IR35 / personal-service companies (PSCs) - freelance IT, engineering,
management consultants trading through limited companies. Calculators excluded.

Mirrors the batch-1 template (CH formations-by-SIC + insolvency-by-SIC-section + ONS
Business Demography survival + seasonality) PLUS a niche-specific IR35 reform-impact asset.

---

## What the EXISTING niche config already covers
`optimisation_engine/ingestion/research/niches/contractors_ir35.py` is already wired and feeds
`contractor_incorporations` (Supabase) -> `contractors-ir35/web/src/data/uk-contractor-index.json`.
It already provides:
- **CH incorporations index** by SIC, TTM + decade, provisional-month handling, dedup union.
- **13 SIC codes across 5 segments**: IT consultancy (62020 primary), IT+software (62011/62012/62020/62090),
  management consultancy (70210/70221/70229), engineering (71121/71122/71129), creative (73110/74100/74201).
- Headline = IT consultancy (62020). Union key `all_contractor_cos_ttm`.

So the formations SPINE exists. This scout confirms the SIC set is sound and identifies (a) the
**reform-impact annotation layer** that turns the existing formations series into the flagship, and
(b) the supplementary assets that are NOT yet built.

### SIC / population confirmation
SIC set is correct for PSC proxy. Core contractor codes: **62020** IT consultancy, **62090** other IT,
**70229** management consultancy, **71121/71122** engineering. Rough active-company scale across the
union is ~250-400k companies (62020 alone is one of the largest single SIC codes on the register,
several hundred thousand live companies - a very large denominator, good for a flagship).
NOTE the config's `notes` string claims "dissolved companies remain on the register; no survivorship
bias" - that is WRONG for the CH free snapshot (live companies only). Formation-year counts for OLD
years are survivorship-biased; recent-year formations (2015+) are effectively unbiased. The reform
narrative lives in recent years, so the flagship is safe, but the notes string should be corrected.

---

## FLAGSHIP: PSC Formations Reform-Impact Index (IR35 2017 + 2021)
**The killer angle.** Monthly/quarterly NEW incorporations across the contractor SIC union, indexed
and annotated against the two off-payroll reform dates: **Apr 2017 (public sector)** and **Apr 2021
(private sector)**. New-incorporation counts do not suffer survivorship bias, so the dip/rebound
around each reform date is directly visible - a proprietary series no one else publishes cleanly.
- **Source**: Companies House Free Company Data Product (bulk CSV, monthly snapshot), `IncorporationDate`
  + `SICCode.SicText_N` fields. http://download.companieshouse.gov.uk/en_output.html
- **Format**: CSV inside ZIP (one 473MB file or 7 split files). **Machine-readable.**
- **Licence**: Companies House free-reuse terms (Crown copyright, free reuse; effectively OGL-equivalent).
- **Cadence**: monthly, updated within 5 working days of month-end.
- **Build state**: BUILDABLE_NOW - the ingestion already pulls this feed. Flagship = add a reform-date
  overlay + before/after growth-rate deltas (e.g. formations CAGR pre-2017 vs 2017-2020 vs post-2021)
  to the existing `uk-contractor-index.json`. Pure derived layer, no new source.
- **Narrative**: "Did IR35 kill the PSC? What 250k+ contractor company formations show around the two
  off-payroll reforms." HMRC says reform hit ~120,000 contractors and raised £4.2bn (Oct 2019-Mar 2023);
  the formations curve is the independent check on that claim.

---

## SUPPLEMENTARY ASSETS

### S1. CEST usage & abandonment tracker  (NEEDS-MANUAL / scrape+FOI)
HMRC's own Check Employment Status for Tax tool - determinations and outside/inside/undetermined split.
- **Source**: GOV.UK CEST usage data (HTML tables, quarterly commitment).
  https://www.gov.uk/government/publications/check-employment-status-for-tax-cest-2019-enhancement/check-employment-status-for-tax-cest-usage-data
- **Format**: **HTML tables only - NOT CSV/ODS.** Licence OGL v3.0.
- **Headline**: 1,837,488 uses to Aug 2021; intermediary outcomes 49% outside / 30% inside / 21% undetermined.
  Later FOI data (IR35 Shield, via The Register 2026): determinations fell 458,894 (2023-24) -> 135,178
  (2025-26), a **71% collapse**; ~1 in 5 still undetermined; CEST logic unchanged since Nov 2019.
- **Build state**: NEEDS-MANUAL. Scrape the HTML table + append FOI-sourced later quarters. High-narrative,
  low-effort-to-parse, but not an automated machine feed. Strong standalone story: "HMRC's own IR35 tool
  is being abandoned - usage down 71% in two years, a fifth of answers still 'undetermined'."

### S2. Off-payroll reform impact figures  (NEEDS-MANUAL, citation layer)
HMRC's own impact estimates - use as the annotation/citation layer on the flagship, not a live feed.
- **Source**: GOV.UK "Impacts of the 2021 off-payroll working rules reform in the private and voluntary
  sectors (updated)". https://www.gov.uk/government/publications/impacts-of-the-2021-off-payroll-working-rules-reform-in-the-private-and-voluntary-sectors
- **Format**: HTML report (no ODS/CSV attachment). Licence OGL v3.0.
- **Headline**: £4.2bn additional tax/NIC/Apprenticeship Levy (Oct 2019-Mar 2023); ~120,000 contractors
  affected; ~£10k avg extra tax per affected worker.
- **Build state**: NEEDS-MANUAL (figures pasted as sourced context on the flagship page). Not a dataset.

### S3. Insolvency by SIC section - contractor sectors  (BUILDABLE_NOW)
Company insolvencies for the sectors PSCs sit in, as a distress signal post-reform.
- **Source**: Insolvency Service "Company Insolvency Statistics" (monthly release + quarterly
  supplementary industry tables). https://www.gov.uk/government/collections/company-insolvency-statistics-releases
- **Format**: **ODS spreadsheet tables** (Table 1c = insolvencies by SIC). Machine-readable. OGL v3.0.
- **Cadence**: monthly headline; industry breakdown quarterly (Jan/Apr/Jul/Oct); 3-level SIC back to Jan 2023,
  annual to 2016.
- **Relevant sections**: **Section J** (Information & communication - captures IT contracting) and
  **Section M** (Professional, scientific & technical - consultancy/engineering). Section M ran 1,930
  insolvencies in the 12m to Jun 2026 (8% of industry-captured cases).
- **Build state**: BUILDABLE_NOW. CAVEAT: section-level is coarse (IT contracting is not isolable below
  Section J in most monthly tables); the quarterly supplementary tables go deeper. Use as the standard
  batch-1 insolvency panel with the usual coarseness caveat.

### S4. ONS Business Demography survival curves - SIC group 62/70/71  (BUILDABLE_NOW)
Birth/death/survival of businesses in the contractor SIC groups - "how long does a PSC last?".
- **Source**: ONS Business Demography reference table.
  https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable/current
  (annual bulletin: /bulletins/businessdemography/2024). Quarterly experimental series also available.
- **Format**: **XLSX** reference tables. Machine-readable. OGL v3.0.
- **Cadence**: annual (bulletin ~Nov), by SIC 2007 group + region.
- **Build state**: BUILDABLE_NOW. Standard batch-1 survival panel; filter to groups 62/70/71.

### S5. ONS self-employment jobs by industry (JOBS04 / EMP14)  (BUILDABLE_NOW)
Macro backdrop: self-employed headcount by industry, to contrast with the incorporations series
(are contractors going self-employed / umbrella instead of PSC after reform?).
- **Source**: JOBS04 https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/selfemploymentjobsbyindustryjobs04
  and EMP14 (employees vs self-employed by industry).
- **Format**: **XLSX** time series. Machine-readable. OGL v3.0. Cadence quarterly (Feb/May/Aug/Nov).
- **Build state**: BUILDABLE_NOW. Secondary context panel, not a flagship.

### S6. Seasonality of contractor formations  (BUILDABLE_NOW)
Month-of-year formation pattern from the same CH feed as the flagship (tax-year-end April spike, etc).
- **Source**: derived from CH free data product (same as flagship). Machine-readable, OGL-equivalent.
- **Build state**: BUILDABLE_NOW. Standard batch-1 seasonality panel; zero new source.

---

## LICENCE / BUILD SUMMARY
- **BUILDABLE_NOW (machine-readable, open)**: Flagship (CH formations reform overlay), S3 insolvency (ODS),
  S4 ONS demography (XLSX), S5 ONS self-employment (XLSX), S6 seasonality (CH). = **1 flagship + 4 supp.**
- **NEEDS-MANUAL (HTML/PDF/FOI, no clean feed)**: S1 CEST tracker (HTML scrape + FOI), S2 HMRC impact
  figures (HTML, citation only). = **2 supp.**
- **No hard licence blockers.** All gov sources are OGL v3.0 or CH free-reuse (Crown copyright, free reuse).
- **IPSE DROPPED**: IPSE Freelancer Confidence Index / IR35 Spotlight is a membership-body publication,
  PDF-only, no data-reuse licence, named-entity source. Not a machine feed - cite sparingly at most, do
  not ingest. (Consistent with faceless-brand + OGL-preferred rules.)
- **Dissolutions caveat**: a true dissolutions-by-year series is NEEDS-BULK - the CH free snapshot is
  live-companies-only and excludes dissolved companies, so voluntary strike-offs (contractors closing PSCs
  post-reform) are not directly countable from it. The flagship deliberately uses NEW incorporations (bias-free)
  instead. A dissolutions series would need CH streaming-API accumulation or a bulk historical extract - defer.

## Existing-config verdict
The existing `contractors_ir35.py` config is **sufficient for the flagship + S6 seasonality** (formations
spine already built). It needs a **derived reform-overlay layer** (annotate 2017/2021, compute before/after
deltas) and a **one-line fix** to the `notes` string (drop the false "no survivorship bias" claim). S3/S4/S5
are new ingestion feeds (insolvency ODS, ONS XLSX x2) not yet in this config - add as new source refs when
building the batch-2 universal panels. No SIC changes needed.
