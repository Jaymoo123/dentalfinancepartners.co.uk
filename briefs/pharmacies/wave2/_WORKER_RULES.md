# Pharmacies wave-2 — shared worker rules

You are writing ONE wave-2 BLOG asset for the live pharmacy-accountancy site at `pharmacies/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief + the facts
source before writing. Working brand = **Pharmacy Finance Partners** (do NOT hardcode the brand
in body copy; write "the firm", "we", "your pharmacy", "pharmacy owners/buyers/sellers/locums").
Brand + CTA are injected by the template + site config, not by your content file.

Wave-2 is the **buying-a-pharmacy wedge lane** plus one locum content post and one seller post. All 7
assets are BLOG posts (no new hubs/services/calculators). Owner-locked list:

1. `blog-pharmacy-financial-due-diligence` — Buying a Pharmacy
2. `blog-cost-of-buying-a-pharmacy-investment` — Buying a Pharmacy (worked figures, all HP/ledger-traceable or FLAGGED)
3. `blog-pharmacy-business-loans-finance-mechanics` — Buying a Pharmacy (EBITDA covenants; companion to the live first-time-buyer post)
4. `blog-how-do-pharmacies-make-money` — NHS Contract and Income (110/mo authority/GEO explainer; feeds the Index)
5. `blog-reading-a-pharmacy-sale-listing` — Buying a Pharmacy (supporting angle on "pharmacy for sale" 2,400/mo; NOT a listings page)
6. `blog-locum-pharmacist-expenses-self-assessment` — Locum Pharmacists (content-only, NO lead form)
7. `blog-pharmacy-exit-planning-timeline` — Selling a Pharmacy (selling side)

## Inputs (read first)
- **Your brief**: `briefs/pharmacies/wave2/<brief>.md` — target queries, H2 skeleton, BLUF spec, HP map,
  dedup gate, danger zones, FAQ seeds, internal links. Follow it.
- **Facts**: `docs/pharmacies/house_positions.md` + `docs/pharmacies/rates_ledger.json` — the ONLY source
  for figures/thresholds/rates. Every figure must match an HP/ledger key and cite its gov.uk/NHS URL.
  If your brief FLAGS an HP gap, DO NOT invent a figure: omit it or describe qualitatively.

## NHS-pension verdict (documented, applies to wave-2 and beyond): SKIP
NHS-pension content is **medicalaccounts.co.uk turf** and off-limits here. The medical-adjacency wall
(TOPICS.md gate + house_positions positioning wall) plus the dossier evidence (the only NHS-pension
pages in the rival set are GP-practice/medical-sector firms: rus.co.uk "gp-practice-accounting-nhs-
pension", abmcharteredaccountants.com "/sectors/nhs-pension/") confirm it. Pharmacy staff pensions
would also be an auto-enrolment/payroll topic, not "NHS pension" (community pharmacists are not NHS
Pension Scheme members the way GPs/hospital staff are). **No wave-2 asset touches NHS pensions.** If a
worker feels a pension angle is needed, it is payroll auto-enrolment framing only, and flag to the
orchestrator first.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, worked examples, tables, real edge cases. Quality IS
  the strategy. Never thin/AI-scammy.
- **BLUF**: open the first H2 (and every H2 where the brief says answer-box) with a citable 40-60 word
  answer. The "how do pharmacies make money" post is a GEO/answer-box asset: its BLUF must be liftable.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no invented credentials, no fabricated client names/counts,
  no pricing (pricing flows from config, never stated). Owner is NOT an accountant; authority comes from
  cited HMRC/NHS/gov.uk sources + the calculators + the data asset.
- **Business audience (owners/buyers/sellers).** Every buying/selling post frames the buyer/owner, never
  the employee-pharmacist. The locum expenses post is the one content-audience exception (still business
  framing: the locum as a sole trader running their own affairs).
- **Tax-and-accounting frame ONLY.** Nothing clinical, prescribing or patient-facing (medical-site turf +
  regulated-profession trap). No cross-linking to other estate sites, ever.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` (or nhsbsa.nhs.uk /
  england.nhs.uk / legislation.gov.uk / pharmacyregulation.org) for every figure.
- **England (and Wales where relevant) default.** NHS contract content (CPCF, FP34, Drug Tariff,
  Category M, Pharmacy First) is ENGLAND; flag Scotland/Wales/NI variants as post-launch.

## SHARED DANGER ZONES (from house_positions; apply to every wave-2 asset)
- **BADR is 18% for 2026/27** on qualifying disposals up to the £1m lifetime limit (HP 14, ledger
  `badr_rate`/`badr_lifetime_limit`). 14% (2025/26) and 10% (before) are STALE. Never quote as current.
- **Standard CGT beyond BADR = 18% within the remaining basic-rate band, 24% above** (HP 15); AEA
  **£3,000** frozen; basic-rate ceiling **£37,700**. Never a flat 18%.
- **Buying/selling structure**: share purchase = **0.5% stamp duty on shares** (inherits history);
  asset purchase = **SDLT on property, non-residential bands up to 5%** (HP 12; the affordability
  calculator uses 0% to £150k, 2% £150k-250k, 5% above £250k — any worked SDLT example must match).
- **Goodwill dominates pharmacy pricing** (NHS contract + item volume driven); CT relief on goodwill is
  restricted on a company purchase (HP 13).
- **NEVER invent a valuation multiple, pence-per-item benchmark, target margin, clawback % or ROI/yield**
  (HP 16 + HP 8). The single biggest fabrication trap, and it hits every buying/selling post here
  (cost/investment, DD, loans/covenants, listing, exit). Valuation/EBITDA stay method-level. Any worked
  purchase price is ILLUSTRATIVE and labelled; the market number is deal-specific.
- **NHS cash flow**: FP34 submitted monthly, payment ~two months later with an advance on account (HP 7).
  Do NOT invent an exact advance % or payment day; keep it illustrative. Income is contract-driven not
  till-driven (HP 6).
- **Category M / Drug Tariff**: margin set centrally and retrospectively adjusted (HP 8); no invented
  target-margin or clawback %. Pharmacy First is a growing separate service-income line (HP 9); no
  invented fee figures.
- **Employer NIC = 15% above a £5,000 secondary threshold** (HP 25); 13.8%/£9,100 is STALE. Employment
  Allowance £10,500 (HP 26). Corporation tax 25%/19% with marginal relief in the £50,000 to £250,000
  band, divided by associated companies (HP 27). Dividends 10.75%/35.75%/39.35%, £500 allowance (HP 28).
- **MTD for Income Tax from April 2026 at £50,000+** (then £30,000 from April 2027, HP 23); cash basis is
  the default for unincorporated businesses (HP 24) — both hit the locum expenses post.
- **Locum content is CONTENT-ONLY, NO lead form** (the locum expenses post). Pharmacist-specific ONLY
  (GPhC fees, indemnity, CPD, locum-site travel, ESM4270 HP 20). Must be DEDUPED from generalist's
  locum-doctor + sole-trader-expenses posts, medicalaccounts.co.uk, and contractors-ir35 (see below).
- **Calculators are scenario/estimate tools** that state their simplifications and end at "your situation
  has X complexity, speak to us". Never a filing-ready or "accurate" tax figure.

## MANDATORY page-level dedup (47% cumulative estate dupe rate; non-negotiable per topic)
Generalist blog corpus (`generalist/web/content/blog/`, READ-ONLY) scanned for wave-2 (2026-07-15):
- **Topics 1-5 (DD, cost/investment, loans/covenants, how-money, listing): NO generalist match.** Clean
  lanes. Keep pharmacy-specific anyway so they never drift into generic business content.
- **Topic 6 (locum expenses): MATCHES** `accountant-for-locum-doctors.md` (locum-DOCTOR tax/IR35/expenses)
  and `allowable-expenses-sole-trader-checklist.md` (generic sole-trader checklist). Do NOT reproduce the
  generic checklist or any locum-doctor framing. Pharmacist-specific expense set only.
- **Topic 7 (exit timeline): MATCHES** `badr-cash-reserves-company-sale.md` (generic BADR pre-sale
  planning) and `earn-out-payments-tax-treatment-selling-limited-company.md` (generic earn-out tax). Do
  NOT restate generic BADR/earn-out mechanics; anchor on pharmacy value levers + sequencing.
- Also dedup against the pharmacies' own 27 live assets (per your brief's cannibalisation split). At WRITE
  time, run the page-level SERP check (gap-discovery rule) and confirm no sentence-level overlap.

## Internal links (plain anchors; sibling need not be built yet)
- audience hubs `/for/<slug>`: `pharmacy-owners`, `buying-a-pharmacy`, `selling-a-pharmacy`,
  `pharmacy-groups`, `locum-pharmacists`
- service pages `/services/<slug>`: `pharmacy-purchase-accounting`, `pharmacy-sale-cgt-badr`,
  `pharmacy-valuation-goodwill`, `nhs-payment-reconciliation-fp34`, `pharmacy-vat-retail-schemes`,
  `pharmacy-payroll-workforce`, `pharmacy-incorporation-structure`, `pharmacy-benchmarking-margin`
- **calculators `/calculators/<slug>` — ONLY these three exist**: `pharmacy-purchase-affordability`,
  `pharmacy-fp34-cash-flow-estimator`, `locum-take-home-comparator`. Embeds `/embed/<same-slug>`.
  NEVER link a non-existent calculator (no sale-CGT/BADR calc, no VAT-mix calc); route those intents to
  the relevant service page / `/contact`.
- research asset: `/research/pharmacy-openings-closures-index`
- **live wave-1 sibling blogs** (link freely): `buying-a-pharmacy-uk-checklist`,
  `first-time-pharmacy-buyer-finance`, `share-vs-asset-purchase-pharmacy`, `preparing-a-pharmacy-for-sale`,
  `pharmacy-goodwill-what-its-worth`, `how-fp34-payment-cycle-works`, `category-m-clawbacks-explained`,
  `drug-tariff-changes-explained`, `pharmacy-first-income-accounting`, `do-pharmacies-pay-vat`,
  `vat-on-private-services-pharmacy-first`, `are-locum-pharmacists-self-employed`,
  `locum-pharmacist-limited-company-vs-umbrella`.
- **wave-2 siblings** (cross-link where your brief says): the other six wave-2 slugs above.
- Blog route is `/blog/<category-slugified>/<slug>`.

## BLOG file → `pharmacies/web/content/blog/<slug>.md`
YAML frontmatter then a **RAW HTML** body (loader injects the body with NO markdown conversion; use
`<p>`,`<h2>`,`<h3>`,`<ul><li>`,`<ol><li>`,`<table>`,`<strong>`,`<a href>`; never markdown syntax):
```
---
title: "Compelling human title"
slug: "<exact-slug from your brief>"
date: "2026-07-15"
author: ""
category: "<exact category label below>"
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
**Category label (use EXACTLY the one your brief's frontmatter names — these already exist live and are
`slugifyCategory`-safe):** `Buying a Pharmacy` (→ `buying-a-pharmacy`), `Selling a Pharmacy`
(→ `selling-a-pharmacy`), `NHS Contract and Income` (→ `nhs-contract-and-income`), `Locum Pharmacists`
(→ `locum-pharmacists`). Do NOT invent a new category. Wave-2 mapping:
- Buying a Pharmacy: `blog-pharmacy-financial-due-diligence`, `blog-cost-of-buying-a-pharmacy-investment`,
  `blog-pharmacy-business-loans-finance-mechanics`, `blog-reading-a-pharmacy-sale-listing`
- NHS Contract and Income: `blog-how-do-pharmacies-make-money`
- Locum Pharmacists: `blog-locum-pharmacist-expenses-self-assessment`
- Selling a Pharmacy: `blog-pharmacy-exit-planning-timeline`

Where a section is procedural (a DD sequence, an exit timeline, a listing walkthrough), consider
`howToSteps`-style ordered structure in the body (`<ol><li>`), but only if genuinely step-based; do not
force it.

Write ONLY your assigned file. Do not run full builds, edit config or other sites, or touch another
worker's file. Report the path written and a 1-line summary.
