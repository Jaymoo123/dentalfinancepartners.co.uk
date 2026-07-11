# Flagship data asset — Startups & tech/SaaS (R3, Tier-1 #4)

Date: 2026-07-11.

## Proposal: UK Startup Formation & Survival Index

A quarterly research asset built from Companies House bulk data: incorporation cohorts of tech
companies (SIC 62xxx software/IT + 63xxx information services), tracked for survival (active vs
dissolved/liquidation), by region, cohort year and sub-sector. Headline outputs:

- Formation counts by quarter/region (heat map + league table of tech hubs).
- Cohort survival curves (e.g. "of software companies incorporated in 2021, X% still active").
- Median time-to-dissolution; insolvency-route mix.
- Optional overlays at v2: SEIS/EIS advance-assurance and R&D-claim aggregate stats from HMRC
  National Statistics publications (free, annual).

## Feasibility — verified pullable 2026-07-11

- **Basic Company Data snapshot** (all live companies incl. SIC codes, incorporation date,
  status, postcode): free monthly bulk download —
  https://download.companieshouse.gov.uk/en_output.html (fetched, 200; download links present).
  Same source already powers the estate's shipped **UK Landlord Tax Index**
  (Property, `/research/landlord-tax-index`, CH key in .env) — direct estate precedent, ingest
  code reusable.
- **Companies House API** (streaming/company profile for dissolved-company backfill):
  https://developer.company-information.service.gov.uk/ (fetched, 200). Note: the basic snapshot
  contains live companies only; survival analysis needs either (a) month-over-month snapshot
  diffing (start archiving now — cheap), or (b) the advanced/dissolved data products; v1 can ship
  formation + status-mix from a single snapshot plus API sampling of prior cohorts.
- **SIC codes**: 62011/62012/62020/62090 (software/programming/consultancy), 63110/63120
  (data processing/portals) — official list confirmed live at
  https://resources.companieshouse.gov.uk/sic/ (fetched, 200).

## Why this asset

- Faceless data-PR compliant (estate rule: no named-expert authority) — journalists and
  newsletter writers (Sifted/UKTN tier) cite formation/survival stats every funding-winter cycle.
- Zero rival ownership: verified rival set is brochure+blog; the citable UK startup-stats space
  is held by Beauhurst (paywalled) — a free, methodologically transparent index undercuts it for
  citations.
- Feeds the calculator fleet (runway tool cites survival medians) and /for/* pages
  ("pre-seed founders" hub cites cohort data).

## Risks / open questions

- Survival claims need careful methodology notes (dormant ≠ trading; SIC self-reporting noise);
  publish the methodology page with the index (gold-standard bar).
- Snapshot diffing needs ~2-3 months of archived snapshots before the first survival update —
  start the archive cron at build sign-off even if the site ships later.
- v2 HMRC overlays (R&D claims, EIS/SEIS advance assurance statistics) are annual National
  Statistics releases — verify table URLs at build (not blocking; v1 is CH-only).
