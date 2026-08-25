# Research-Authority Batch 2 scout: UK community pharmacies

Site key `pharmacies`, dir `pharmacies/`. Scouted 2026-07-23. Faceless brand.
Mirrors proven pilot (CH-SIC formations index + insolvency + ONS survival + niche register asset).
Calculators EXCLUDED. All licences verified OGL v3.0 unless flagged. NHS angle is dominant here —
the community-pharmacy niche is defined by the **net-closures debate**, and NHSBSA publishes the
authoritative machine-readable closure/contractor time series. That is the flagship, not Companies House.

## pharmacies (community pharmacy niche)
GREENFIELD (no existing research asset assumed). Primary SIC **47730 – Dispensing chemist in specialised
stores** (retail-classified). Companies-House active-company count is modest and unreliable via scrapers
(one directory shows ~821; big multiples register under other retail/holding SICs, independents scattered) —
**verify exact count at build via CH bulk snapshot** (the pilot's own method), do not quote a scraped figure.
The population that matters is NHS-side: **~10,526 pharmacies open Feb 2026 vs 11,609 Feb 2016** (>1,000 net
closures/decade; dipped below 10,000 in Mar 2025). Companies-House is a *supplementary* divergence signal
(companies formed vs premises lost), not the spine.

---

### FLAGSHIP — "Community Pharmacy Closures & Contractor Index" (net-closures tracker)
- **Source:** NHSBSA Open Data Portal — **Pharmacy Openings and Closures**
  https://opendata.nhsbsa.net/dataset/pharmacy-openings-and-closures
- **Format:** CSV **+ Data API** (per monthly release). **Licence:** OGL v3.0. **Tag: BUILDABLE_NOW.**
- **Cadence / range:** monthly, 1-month arrears; Dec 2022 → present (May 2026 latest at scout), ongoing.
- **Fields:** monthly snapshot of pharmacies on NHS England Pharmaceutical Lists (last calendar day) +
  openings + closures in-month, segmented by **owner group size — Small (1–5 premises = independents),
  Medium (6–99), Large (100+ = multiples)** — plus **100-hour** pharmacies and **distance-sellers**.
- **Headline figures:** 10,526 open Feb 2026 vs 11,609 Feb 2016 (>1,000 net loss/decade); 274 closures
  Jan 2024–Mar 2025 (~5/week); fell below 10,000 (9,999) end-Mar 2025.
- **Caveat:** ownership changes appear as a closure + immediate re-open (net-zero); backdated amendments
  make month-on-month totals not perfectly additive — document in methodology, use net-change columns.
- **Narrative angle:** THE cited standard for "how many pharmacies have closed, where, and who's shutting —
  independents vs multiples." Directly feeds the political closures debate; every trade outlet quotes crude
  totals — a living, region-and-ownership-segmented index becomes the reference. Lead-gen: independents
  (Small group) under pressure = the client base.

### Supplementary 1 — Contractor Details (density / per-100k map)
- https://opendata.nhsbsa.net/dataset/contractor-details — CSV + Data API, OGL v3.0. **BUILDABLE_NOW.**
- Monthly, 1-month arrears; Jul 2022 → present. Fields: contractor code, name, address, type, **ICB /
  region**, Health & Wellbeing Board (England), 100-hour status, F-code (NHS vs Private).
- Angle: **pharmacy density per 100k population by ICB/region** (join to ONS mid-year population) — the
  "pharmacy deserts" map. Contractor names/addresses are the public Pharmaceutical List → free to display
  (no named-entity licence restriction).

### Supplementary 2 — Pharmacy & Appliance Contractor Dispensing Data (workload index)
- https://opendata.nhsbsa.net/dataset/pharmacy-and-appliance-contractor-dispensing-data — CSV + API, OGL.
  **BUILDABLE_NOW.** Monthly, 3-month arrears. Volume of dispensing activity per contractor (items/fees).
- Angle: **items-dispensed-per-pharmacy rising while pharmacy count falls** — the "fewer pharmacies, more
  work" squeeze story. Powerful paired chart against the flagship closure line.

### Supplementary 3 — Prescription Cost Analysis (PCA) Monthly
- https://opendata.nhsbsa.net/dataset/prescription-cost-analysis-pca-monthly-data — CSV / ZIP / API, OGL.
  **BUILDABLE_NOW** (large; BNF-hierarchy granular). Monthly, 2-month arrears; Jan 2021 → present
  (legacy Feb 2008–Mar 2021 on NHSBSA site). >1bn items / ~£9bn drug spend per year.
- Angle: community drug-cost / dispensing-volume trends; margin-and-reimbursement context for the funding
  narrative. Supporting, not flagship (product-level, needs aggregation).

### Supplementary 4 — Companies House SIC 47730 formations & dissolutions
- CH bulk snapshot: https://download.companieshouse.gov.uk/en_output.html — bulk CSV, OGL. **BUILDABLE_NOW**
  via existing engine niche config (SIC 47730). Adds formations index + monthly seasonality.
- Angle: **corporate formations vs NHS premises** — new pharmacy *companies* still forming while NHS
  *contractor* numbers shrink (consolidation, online-only, ownership churn). Divergence chart is original.
- Insolvency: Section G (retail) aggregate only — pharmacies NOT isolable; low value, coarse caveat, mention
  briefly or omit (mirrors dentists' Section-Q treatment).

### Supplementary 5 — ONS Business Demography survival (SIC group 47.7)
- https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable/current
  — XLSX, OGL, annual (2023 ref tables released Nov 2024). **BUILDABLE_NOW.**
- Angle: 1–5yr survival curves for the retail-pharmacy SIC group. Note: ONS breaks to SIC *group* (3-digit
  47.7) not 5-digit 47730 — caveat, but standard pilot asset.

### Supplementary 6 — ONS Retail Sales Index: Dispensing Chemists (JO4M)
- https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/jo4m/drsi — CSV / XLS, OGL,
  **monthly**. **BUILDABLE_NOW.** Seasonally-adjusted retail sales *volume* for dispensing chemists, GB.
- Angle: front-of-shop / retail-health signal distinct from NHS dispensing — the commercial side of the
  pharmacy P&L. Light supplementary trend line.

---

### CONTEXT (not a machine-readable index — narrative framing only)
- **CPCF funding settlement** (gov.uk HTML/PDF + Community Pharmacy England): £3.073bn baseline 2025/26,
  rising £3.296bn (25/26) → £3.636bn (26/27); +£215m Pharmacy First; £193m pandemic over-payment written off.
  https://www.gov.uk/government/publications/community-pharmacy-contractual-framework-financial-year-2026-to-2027
  — use as funding-context copy around the closures index. **MANUAL** (PDF/HTML, not a dataset).
- **House of Commons Library CBP-9854 "Community pharmacy in England"** — authoritative narrative + chart
  source to cite/frame. PDF, not machine-readable. **MANUAL.**

### NEEDS-CHECK / NEEDS-MANUAL
- **NHSBSA General Pharmaceutical Services, England 2015-16→2023-24** statistical collection
  (https://www.nhsbsa.nhs.uk/statistical-collections/general-pharmaceutical-services-england/... — 403 on
  automated fetch at scout). Historically ships CSV/XLSX annex tables = the **long time series backbone**
  (pre-2022) to extend the flagship back to 2015/16. **NEEDS-CHECK annex format at build** — if CSV/XLSX,
  promote to BUILDABLE_NOW and use to lengthen the closures/contractor series.

---

## Tally
- **BUILDABLE_NOW: 7** (Openings/Closures flagship, Contractor Details, Pharmacy&Appliance dispensing, PCA,
  CH SIC 47730, ONS Business Demography, ONS RSI dispensing chemists).
- **NEEDS-CHECK/MANUAL: 3** (Gen Pharm Services annex format; CPCF funding PDF; HoC Library briefing).
- **Licence blockers: NONE.** All primary datasets OGL v3.0; NHSBSA contractor names are the public
  Pharmaceutical List (displayable). Only caveats: NHSBSA small-number suppression, ownership-churn net-zero
  quirk in the flagship, and ONS survival breaking to 3-digit SIC group not 5-digit 47730 — all documentable.
- **Avoid:** commercial providers (e.g. PharmData.co.uk, IBISWorld) — not open-licensed.

## Build order suggestion
Flagship (Openings & Closures) + Contractor-density map first (cleanest, strongest narrative, live API),
then pair the dispensing-workload index (Supp 2) against it, then CH formations divergence, then ONS assets.
