# Pharmacies launch-core — shared worker rules

You are writing ONE launch-core asset for a new UK pharmacy-accountancy site at `pharmacies/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief + the facts
source before writing. Working brand = **Pharmacy Tax** (do NOT hardcode the brand
name in body copy; write about "the firm", "we", "your pharmacy", "pharmacy owners/buyers/sellers".
Brand + CTA are injected by the page template + site config, not by your content file).

## Inputs (read first)
- **Your brief**: `briefs/pharmacies/wave1/<brief>.md` — the spec: target queries, required H2
  structure, house positions to cite, danger zones, FAQ seeds. Follow it.
- **Facts**: `docs/pharmacies/house_positions.md` — the ONLY source for figures/thresholds/rates.
  Every figure you state must match a house position and link its gov.uk URL. If your brief flags an
  HP gap, DO NOT invent a figure: omit it or describe qualitatively.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin/AI-scammy. Worked examples, tables,
  real edge cases. Quality IS the strategy.
- **BLUF**: where the brief says answer-box/BLUF, open each H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Use commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no invented credentials/qualifications, no fabricated
  client names/counts, no pricing figures (pricing flows from config, never stated). The owner is
  NOT an accountant; authority comes from cited HMRC/NHS/gov.uk sources + the calculators + the
  data asset.
- **Tax-and-accounting-compliance frame ONLY.** Never clinical, prescribing, or patient-facing
  content. That is the medical site's turf and a regulated-profession credibility trap.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` (or nhsbsa.nhs.uk /
  england.nhs.uk / legislation.gov.uk / pharmacyregulation.org) for every figure.
- **England (and Wales where relevant) default.** NHS contract content (CPCF, FP34, Drug Tariff,
  Category M, Pharmacy First) is ENGLAND; flag Scotland/Wales/NI variants as post-launch, never
  silently assume England rules apply UK-wide.

## SHARED DANGER ZONES (apply to every asset — from house_positions verification)
- **BADR is 18% for 2026/27** on qualifying disposals up to the £1m lifetime limit (HP 14). The
  14% (2025/26) and 10% (before) rates are STALE. Never quote 10% or 14% as current.
- **Standard CGT beyond BADR = 18% on gains within the remaining basic-rate band, 24% above**
  (HP 15); annual exempt amount **£3,000** (frozen). Never write a flat "18%".
- **Employer (Class 1 secondary) NIC = 15% above a £5,000 secondary threshold** (HP 25, from
  6 Apr 2025). The old **13.8% / £9,100 is STALE, never use it.** Employment Allowance = **£10,500**
  (HP 26).
- **Corporation tax 25% main / 19% small profits with marginal relief** in the £50,000 to £250,000
  band, divided by associated companies (HP 27) — the multi-store group trap. **Dividends taxed at
  10.75% / 35.75% / 39.35%** with a **£500** allowance (HP 28); profit extraction is a two-layer
  (CT then dividend) calculation.
- **FA 2026 capital allowances**: main-rate WDA is **14%** (fell from 18%), new **40% first-year
  allowance**, special-rate pool stays **6%**, AIA **£1,000,000** at 100%, SBA **3%** straight line
  (HP 17-19). Never quote the old 18% WDA.
- **VAT is the pharmacy signature**: NHS-dispensed prescription drugs are **zero-rated**, most OTC
  retail is **standard-rated**, so a pharmacy is a VAT-MIXED business that usually reclaims more
  input VAT than a plain retailer expects (HP 1). Pharmacist private services may be exempt or
  standard (HP 2). Retail schemes split the takings (HP 4). Registration threshold **£90,000**;
  voluntary registration is normally advantageous because of zero-rated outputs (HP 5).
- **Buying/selling structure**: share purchase = **0.5% stamp duty on shares** (inherits history);
  asset purchase = **SDLT on property at non-residential rates up to 5%** (HP 12). Goodwill
  dominates pharmacy pricing and CT relief on goodwill is restricted on a company purchase (HP 13).
- **NEVER invent a valuation multiple or pence-per-item benchmark** (HP 16). Valuation stays
  method-level (adjusted EBITDA multiple / pence-per-item described as method) unless a named,
  cited broker source is provided. This is the single biggest fabrication trap on the site.
- **NHS cash flow**: FP34 prescriptions are submitted monthly, payment arrives roughly two months
  later with an advance on account (HP 7). Do NOT invent an exact advance percentage or payment day;
  keep the timeline illustrative and qualitative. Income is contract-driven not till-driven (HP 6).
- **Category M / Drug Tariff**: gross margin is set centrally and retrospectively adjusted (HP 8);
  do NOT invent a target-margin or clawback percentage. The Drug Tariff blog is a citation/GEO
  surface (look-up intent), NEVER framed as a money/lead page. Pharmacy First is a separate,
  growing service-income line (HP 9); no invented fee figures.
- **Locum content is CONTENT-ONLY, no lead form** (the `locum-pharmacists` hub and the two locum
  blogs). Pharmacist-specific ONLY (ESM4270 HP 20, GPhC substitution, day-rate norms qualitative);
  HMRC's locum-pharmacist position is restrictive, "everyone does it self-employed" is not a
  defence. IR35 where working through own company (HP 21). MTD for Income Tax from **April 2026 at
  £50,000+** (HP 23), cash basis default (HP 24). Must be DEDUPED from medicalaccounts.co.uk's
  generic locum content and the estate's contractors-ir35 site; cut anything liftable onto those.
- **Positioning wall**: nothing clinical/prescribing/patient-safety (medical-site adjacency trap).
  No cross-linking to other estate sites, ever.
- **Calculators are scenario/estimate tools** that state their simplifications and end at "your
  situation has X complexity, speak to us". Never claim a filing-ready or "accurate" tax figure.

## Internal links (plain anchors, fine if the sibling is not built yet)
- audience hubs `/for/<slug>`: `pharmacy-owners`, `buying-a-pharmacy`, `selling-a-pharmacy`,
  `pharmacy-groups`, `locum-pharmacists`
- service pages `/services/<slug>`: `pharmacy-purchase-accounting`, `pharmacy-sale-cgt-badr`,
  `pharmacy-valuation-goodwill`, `nhs-payment-reconciliation-fp34`, `pharmacy-vat-retail-schemes`,
  `pharmacy-payroll-workforce`, `pharmacy-incorporation-structure`, `pharmacy-benchmarking-margin`
- **calculators `/calculators/<slug>` — ONLY these three exist at launch**:
  `pharmacy-purchase-affordability`, `pharmacy-fp34-cash-flow-estimator`, `locum-take-home-comparator`.
  Embeds use `/embed/<same-slug>`. Queue-tier tools (sale CGT/BADR, VAT-mix, employer-NIC) do NOT
  exist yet: route those intents to `/contact` ("speak to us"), NEVER link a non-existent calculator.
- research asset: `/research/pharmacy-openings-closures-index`
- blogs: `/blog/<category-slugified>/<slug>`

## BLOG posts → `pharmacies/web/content/blog/<slug>.md`
Frontmatter (YAML) then a **RAW HTML** body (the loader injects the body with NO markdown
conversion; use `<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`;
never markdown syntax):
```
---
title: "Compelling human title"
slug: "<exact-slug>"
date: "2026-07-14"
author: ""
category: "<the exact category label below that your brief maps to>"
metaTitle: "<= 60 chars, includes primary query"
metaDescription: "<= 155 chars"
h1: "Page H1"
summary: "One-sentence preview."
keyTakeaways:
  - "3 to 5 concise takeaways"
faqs:
  - question: "From the brief's FAQ candidates"
    answer: "Concise cited answer."
---
<body>
```
**Blog category labels (use EXACTLY one of these, matched to your post's cluster):**
`Buying a Pharmacy` · `Selling a Pharmacy` · `NHS Contract and Income` · `VAT and Retail Schemes` ·
`Locum Pharmacists`. Mapping:
- Buying a Pharmacy: `blog-buying-a-pharmacy-uk-checklist`, `blog-first-time-pharmacy-buyer-finance`,
  `blog-share-vs-asset-purchase-pharmacy`
- Selling a Pharmacy: `blog-preparing-a-pharmacy-for-sale`, `blog-pharmacy-goodwill-what-its-worth`
- NHS Contract and Income: `blog-how-fp34-payment-cycle-works`, `blog-category-m-clawbacks-explained`,
  `blog-drug-tariff-changes-explained`, `blog-pharmacy-first-income-accounting`
- VAT and Retail Schemes: `blog-do-pharmacies-pay-vat`, `blog-vat-on-private-services-pharmacy-first`
- Locum Pharmacists: `blog-are-locum-pharmacists-self-employed`,
  `blog-locum-pharmacist-limited-company-vs-umbrella`

## MONEY pages (services / for hubs) → TypeScript data entries
Shared data files (`pharmacies/web/src/data/pharmacies-hubs.ts`,
`pharmacies/web/src/data/pharmacies-services.ts`). Edit ONLY the entry your dispatch assigns; keep
the `interface` and the `get<Thing>(slug)` helper unchanged. Fields per entry: `slug` (do not
change), `title`, `headline`, `metaTitle`, `metaDescription` (<=155), `intro`, `stats` (exactly
3 × {value,label}), `challenges` (exactly 4 × {title,body}), `howWeHelp` (exactly 3 × {title,body}),
`faqs` (2+ × {question,answer}), and for the `locum-pharmacists` hub keep `noLeadForm: true`. Every
figure matches house_positions and is safe to state (no HP-gap figures). Replace the stub content
with brief-accurate, HP-verified copy. Run `npx tsc --noEmit` (from `pharmacies/web`) after editing.

Write ONLY your assigned file(s). Do not run full builds, do not edit config or other sites, do not
touch another worker's file. Report the path(s) written and a 1-line summary.
