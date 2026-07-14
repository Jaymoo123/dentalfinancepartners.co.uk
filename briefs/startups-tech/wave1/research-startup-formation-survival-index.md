---
slug: startup-formation-survival-index
tier: research
route: /research/startup-formation-survival-index
category: (research asset, not a blog category)
intent: AUTHORITY / LINK-EARN. Faceless data-PR asset for journalists, newsletter writers (Sifted/UKTN tier) and founders; the citable free counter to paywalled startup-stats providers. Feeds the calculator fleet and /for/* hubs. NOT a lead page, an authority and off-site-links play.
---
# Research asset brief: UK Startup Formation & Survival Index (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; all copy references "the site" / "we". CTA and brand copy flow from site config at write time. No em-dashes anywhere (use commas, parentheses, full stops, middle dot ·). This is a DATA asset, not a blog. Read `expansion_research/tier1_startups_tech/DATA_ASSET.md` for the intended shape (this brief operationalises it).

## HARD RULE, non-negotiable: REAL DATA ONLY

**Zero fabricated figures.** Every headline number, chart value, survival percentage, league-table
rank and median in this asset must come from a real Companies House pull that is reproducible from
the documented source and method. This is an estate hard rule and has direct precedent: the shipped
**UK Landlord Tax Index** (Property, `/research/landlord-tax-index`, CH key already in `.env`) was
built real-data-only, and the pharmacies and crypto (site 3/4) index builds enforced the same bar.
If a figure cannot be produced from the actual data pull, it does NOT go on the page. Placeholder or
illustrative numbers are forbidden in a published data asset. Where the data does not yet support a
claim (for example survival curves before enough snapshots are archived), the page says so honestly
rather than filling the gap. This bar IS the asset's value: a free, methodologically transparent
index is only citable if every number is real.

## What the asset is (from DATA_ASSET.md)

A quarterly research index built from Companies House bulk data: incorporation cohorts of UK tech
companies (SIC 62xxx software/IT + 63xxx information services), tracked for formation volume and
survival (active vs dissolved / in liquidation), by region, cohort year and sub-sector. Headline
outputs:

- Formation counts by quarter and region (heat map + league table of tech hubs).
- Cohort status mix and, once enough snapshots exist, cohort survival curves ("of software
  companies incorporated in 20XX, X% are still active").
- Median time-to-dissolution and insolvency-route mix (where the data supports it).
- v2 overlays (NOT v1): SEIS/EIS advance-assurance and R&D-claim aggregate stats from HMRC National
  Statistics (free, annual), verify table URLs at build, not blocking for v1.

## Data source and method (the ONLY sources; HP29)

1. **Companies House Basic Company Data snapshot** (all live companies incl. SIC codes, incorporation
   date, status, postcode): free monthly bulk download. This is the same source that powers the
   estate's shipped Landlord Tax Index, so the ingest code is reusable.
   https://download.companieshouse.gov.uk/en_output.html (HP29)
2. **Companies House API** (company profile / streaming, for dissolved-company backfill and
   prior-cohort sampling): https://developer.company-information.service.gov.uk/ (HP29)
3. **SIC code list** (official): the tech core is SIC 62 and 63:
   62011 / 62012 / 62020 / 62090 (software / programming / consultancy) and 63110 / 63120
   (data processing / portals). https://resources.companieshouse.gov.uk/sic/ (HP29)

No other data source is permitted for v1. Any figure not derivable from (1)+(2)+(3) is out.

## Methodology the build must implement and PUBLISH

The methodology page ships WITH the index (gold-standard bar; the asset is only citable if the method
is transparent). It must specify:

1. **Cohort definition**: companies incorporated in a given quarter/year whose SIC code is in the
   62/63 tech set. State exactly which SIC codes are included (the list above) and that a company is
   counted in the tech set if any of its registered SIC codes is in-scope (flag the multi-SIC
   counting choice openly).
2. **Formation counts**: count of in-scope incorporations per quarter and per region (region derived
   from registered-office postcode; state the postcode-to-region mapping used).
3. **Status / survival**: from the snapshot, classify each cohort company as active vs
   dissolved / liquidation / other, using the Companies House status field. State clearly that the
   basic snapshot contains LIVE companies only, so survival for prior cohorts is derived by either
   (a) month-over-month snapshot diffing (start archiving snapshots now, even though the site ships
   later) or (b) API sampling of prior-cohort company numbers. v1 may ship formation + current
   status-mix from a single snapshot plus API sampling; full survival curves wait for archived
   snapshots.
4. **Median time-to-dissolution / insolvency mix**: only where the data supports it; otherwise state
   "not yet available" honestly.
5. **Reproducibility**: the page states the snapshot date(s) used, the SIC set, and enough method that
   a third party could reproduce the headline numbers from the same free source. The ingest script is
   re-runnable (mirror the Landlord Tax Index pattern).

## Honest framing (mandatory, on the page)

The methodology / notes section must state, in plain terms:

- **Dormant is not the same as trading.** An "active" Companies House status does not mean the
  company is trading; state this so survival is not over-read.
- **SIC codes are self-reported and noisy.** Companies choose their own SIC codes at incorporation
  and may not update them; the tech-set membership is therefore approximate. Say so.
- **Snapshot-diffing lag.** Survival updates need roughly 2-3 months of archived snapshots before the
  first survival release; until then the page shows formation + current status mix only, and says the
  survival curves are forthcoming rather than estimating them.
- **What the index is not.** It is a formation-and-status index from public data, not a funding, valuation
  or trading-performance measure. No claim beyond what the data supports.

## Required page structure / H2 skeleton

Each headline section opens with a citable 40-60 word BLUF answer stating what the data shows, sourced
to the pull.

1. Hero + BLUF: what the index measures and the single most citable headline (a real formation or
   status-mix figure from the actual pull; if v1 has no survival number yet, the headline is a
   formation figure, never a fabricated survival stat).
2. Formation trends: counts by quarter and region (heat map + tech-hub league table), all from the
   real pull.
3. Sub-sector split: software/programming/consultancy (62) vs data/information services (63), real
   counts.
4. Status / survival: current status mix by cohort; survival curves ONLY once archived snapshots
   support them, else an honest "forthcoming" note.
5. Regional league table: tech hubs ranked by formation (and, when available, survival), postcode-derived.
6. Methodology and honest-framing notes (the section above, published in full).
7. Sources and reproducibility (the three HP29 sources, snapshot date, SIC set).
8. How to cite / data-download (offer the underlying aggregated data for journalists to cite; this is
   the link-earn mechanic).

Tables / charts required (all real-data):
- Formation-by-quarter time series (chart).
- Tech-hub league table (region · formation count · rank).
- Sub-sector split (62 vs 63 counts).
- Status-mix / survival table per cohort (with the "forthcoming" honesty note where v1 lacks the data).

## Why this asset (positioning, from DATA_ASSET.md)

- Faceless data-PR compliant (estate rule: no named-expert authority), the citable UK startup-stats
  space is held by paywalled Beauhurst; a free, methodologically transparent index undercuts it for
  citations.
- Feeds the calculator fleet (a runway/survival tool can cite the survival medians) and the /for/*
  hubs (`/for/pre-seed-founders` cites cohort data).

## House positions touched

- HP 29: Companies House free bulk products (basic company data snapshot + API) are live and
  downloadable; the feasibility anchor and the ONLY data source for v1. SIC 62/63 is the tech core.
  https://download.companieshouse.gov.uk/en_output.html · https://developer.company-information.service.gov.uk/ · https://resources.companieshouse.gov.uk/sic/

(No tax-figure HPs apply to the index body itself. If any tax overlay is added at v2, every figure must
map to its HP + gov.uk URL like every other page; v2 HMRC overlays are out of v1 scope.)

## Internal links (slug map)

- Hub: `/for/pre-seed-founders`, `/for/funded-startups`, `/for/saas-companies`
- Calculator: `/calculators/rd-relief-estimator`, `/calculators/seis-eis-relief-calculator` (contextual, where the index cohort data supports a tool)
- Service: `/services/core-compliance` (soft CTA only; this is an authority asset, not a lead page)

## Hallucination danger zones

- **NO fabricated figures, anywhere.** This is the load-bearing rule. Every number is from the real
  Companies House pull or it does not appear. No illustrative/placeholder stats in the published asset
  (unlike blog worked examples, which may be labelled illustrative; a data asset may not).
- Do NOT publish survival curves before the archived snapshots support them; state "forthcoming" honestly.
- Do NOT over-read "active" status as "trading"; the dormant caveat is mandatory.
- Do NOT present SIC-based tech-set membership as exact; the self-reporting caveat is mandatory.
- Do NOT add data sources beyond the three HP29 Companies House products for v1. No Beauhurst,
  no scraped third-party stats, no HMRC overlay in v1.
- Do NOT name a specific number of companies, hubs or survival rate in this brief; the real figures come
  from the build's pull, not from the brief.
- No pricing, no named experts, no fabricated client counts.

## Stage 2 / build TODO

- Start the monthly snapshot-archiving cron at build sign-off, even though the site ships later, so
  survival diffing has 2-3 months of history when the first survival release is due (DATA_ASSET.md).
- Reuse the Landlord Tax Index ingest code (CH key already in `.env`); confirm the SIC 62/63 filter and
  postcode-to-region mapping.
- Produce v1 = formation counts + current status mix from a single snapshot + API sampling of prior
  cohorts; hold survival curves for the archived-snapshot release.
- v2 only: verify HMRC National Statistics table URLs (R&D claims, EIS/SEIS advance assurance) at build
  before adding any overlay; every overlay figure gets its own HP + gov.uk URL.
- Publish the methodology + honest-framing notes page WITH the index at launch (not after).
