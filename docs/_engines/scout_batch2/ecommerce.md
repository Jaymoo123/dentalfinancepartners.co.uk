# Research-Authority Batch 2 scout: ecommerce (UK online retail / DTC)

Scouted 2026-07-23. Site key `ecommerce`, dir `ecommerce/`. GREENFIELD (no existing research asset).
Confirmed sources, formats, licences, flagship pick. Same universal template as batch 1
(CH formations-by-SIC + insolvency-by-SIC + ONS Business Demography survival + business counts)
PLUS a niche-specific spine that batch 1 sites don't have: the **ONS internet-sales-share time series**,
which is a clean, machine-readable, decades-long official series unique to this niche. Calculators excluded.

## SIC scope
- **47910** — Retail sale via mail order houses or via Internet (the core online-retail / DTC code).
  ~**187,354 active companies** (CH Basic Company Data, 2026). This is a very large, fast-churning
  population — bigger than any batch-1 niche — which makes the formation/dissolution story strong.
- **47990** — Other retail sale not in stores, stalls or markets (secondary; direct-selling / non-store overflow).
- Note: many DTC brands also register under category-specific 47.xx codes; 47910 is the cleanest proxy
  and the one to anchor the index on, with 47990 as a supplementary lens.

---

## FLAGSHIP: "UK Online Retail Index" — ONS internet-sales share paired with CH SIC-47910 formations/dissolutions
The pairing is the whole story: a demand-side series (how much of retail is online) laid against a
supply-side series (how many online-retail companies are being born and dying). No one publishes the two together.

### Spine A — ONS internet sales as % of total retail sales (series J4MC)
- **URL (time series):** https://www.ons.gov.uk/businessindustryandtrade/retailindustry/timeseries/j4mc/drsi
- **URL (parent dataset, DRSI):** https://www.ons.gov.uk/businessindustryandtrade/retailindustry/datasets/retailsalesindexinternetsales/current
- **Format:** CSV + XLSX download (machine-readable, direct download buttons on the time-series page). BUILDABLE_NOW.
- **Licence:** OGL v3 (ONS). Attribution only.
- **Cadence:** Monthly (last release 19 Jun 2026; next 24 Jul 2026). Series runs back to **2007**.
- **Headline figures:** internet sales = **27.3% of total UK retail (Apr 2026)**; ~19.2% pre-pandemic (2019);
  spiked to ~37.8% at the Feb-2021 lockdown peak, then normalised. ~15+ years of monthly data.
- **Angle:** "Online's share of UK retail: the pandemic spike and the great normalisation." The definitive
  single-chart backbone; also break out by store type via the internet-sales-index category weights dataset
  (https://www.ons.gov.uk/businessindustryandtrade/retailindustry/datasets/internetsalesindexcategoriesandtheirpercentageweights/current).

### Spine B — Companies House SIC-47910 formation + dissolution index
- **URL:** http://download.companieshouse.gov.uk/en_output.html (Free Company Data Product, "Basic Company Data").
- **Format:** ZIP of CSV, split into multiple files. Contains company status, incorporation date,
  dissolution date, and SIC codes — everything the pilot's formations-by-SIC engine needs. BUILDABLE_NOW
  (engine niche config already does this pattern for construction/dental/solicitors; just point at 47910/47990).
- **Licence:** OGL (Companies House). Attribution only.
- **Cadence:** Monthly (refreshed within 5 working days of month end).
- **Angle:** "The online-retail company boom and bust: formations by year 2007-2026 vs. dissolutions."
  Pandemic formation surge + post-2022 dissolution wave, filtered to the internet-retail SIC. Add seasonality
  (formations by month) exactly as the pilot template does.

**Why flagship:** demand-side (J4MC) + supply-side (CH 47910) is a genuinely novel, fully OGL, fully
machine-readable pairing that becomes the cited standard "state of UK online retail" page. Both refresh
monthly so the index stays living with zero manual work.

---

## SUPPLEMENTARY ASSETS

### S1 — ONS Business Demography survival curves, SIC 47.91
- **URL (bulle­tin + datasets):** https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/2024
- **Format:** XLSX reference tables broken down by SIC 2007 group and geography. BUILDABLE_NOW.
- **Licence:** OGL v3 (accredited official statistics).
- **Cadence:** Annual.
- **Figures:** births, deaths, and **5-year survival rates** of new businesses by SIC. Same asset shape as
  the batch-1 template but genuinely on-topic here (retail churn is the story).
- **Angle:** "How long do online retailers survive? 5-year survival vs. the all-industry average."

### S2 — Insolvency Service company insolvencies, Wholesale & Retail (SIC Section G)
- **URL:** https://www.gov.uk/government/collections/insolvency-service-official-statistics (latest monthly release,
  e.g. company-insolvencies-june-2026), Table 1c (E&W) / Table 4b (Scotland).
- **Format:** XLSX tables. BUILDABLE_NOW.
- **Licence:** OGL v3.
- **Cadence:** Monthly headline; **industry breakdown by 3-level SIC back to Jan 2022**, annual back to 2015.
- **Figures:** Wholesale & retail = **3,728 insolvencies in 2025 (16% of cases with industry captured)**, the
  2nd-largest sector by volume.
- **LICENCE/DATA CAVEAT:** insolvency data does NOT isolate SIC 47910 — the finest cut is division 47 / Section G,
  which mixes physical retail with online. **Must be framed as retail-sector context, not online-retail-specific.**
  Same caveat batch-1 applied to coarse sections. Still a valid "retail insolvency wave post-2022" supporting chart.

### S3 — ONS UK Business Counts (VAT/PAYE registered enterprises), SIC 47.91 / 47.99
- **URL:** https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/ukbusinessactivitysizeandlocation
  (also queryable on NOMIS: https://www.nomisweb.co.uk/ under "UK Business Counts").
- **Format:** XLSX / NOMIS API (JSON/CSV). BUILDABLE_NOW.
- **Licence:** OGL v3.
- **Cadence:** Annual (IDBR snapshot each March; 2.73m VAT/PAYE businesses UK-wide, Mar 2025).
- **Angle:** cross-check the CH company count against the VAT/PAYE-registered count (captures unincorporated
  online sellers CH misses), plus size-band (turnover/employment) and regional breakdowns for a density map.
  NOMIS gives a clean API cut by SIC 47.91 / 47.99 for a "where are the UK's online retailers" regional heatmap.

### S4 — Internet Sales Index by store type / category weights
- **URL:** https://www.ons.gov.uk/businessindustryandtrade/retailindustry/datasets/internetsalesindexcategoriesandtheirpercentageweights/current
- **Format:** XLSX. BUILDABLE_NOW. Licence OGL v3. Cadence monthly.
- **Angle:** which retail categories are most/least online (food vs. non-food vs. "non-store"). Adds a
  category dimension to the flagship without a new source type.

### S5 — Payment Practices & Performance (supplier-payment behaviour), retail filter
- **URL:** https://find-and-check-reports-on-payment-practices-and-performance.service.gov.uk/ (bulk data download).
- **Format:** CSV bulk export. BUILDABLE_NOW. Licence OGL. Cadence: rolling (large companies report half-yearly).
- **Angle:** how slowly do large retailers pay suppliers — the pilot's payment-practices template, on-topic for
  DTC brands that supply larger retailers. Lower priority; include only if flagship + S1-S3 land well.

---

## Build tags summary
- **BUILDABLE_NOW (6):** flagship Spine A (ONS J4MC) + Spine B (CH 47910 bulk), S1 survival, S2 insolvency,
  S3 business counts, S4 category weights, S5 payment practices. All are direct CSV/XLSX/API downloads, all OGL.
- **NEEDS-BULK/MANUAL:** none critical. CH bulk is a multi-file ZIP (same parse the engine already runs for
  batch-1 sites) — mechanical, not manual.

## Licence blockers
- **None.** Every source is OGL v3 (ONS / Companies House / Insolvency Service / GOV.UK payment-practices).
  Attribution only, no named-entity restrictions. No SRA-style custom-licence trap like the Solicitors batch had.
- Only constraint is a **data caveat, not a licence one**: insolvency (S2) can't isolate SIC 47910, so it must
  be presented as retail-sector context. Frame accordingly.

## Recommended build order
Flagship first (J4MC series is a one-file download → fastest credible showcase), then bolt on CH 47910
formations/dissolutions (reuse existing engine niche config), then S1 survival + S3 counts, then S2 insolvency
context + S4/S5. One coherent "UK Online Retail Index" hub, deploy-gated.
