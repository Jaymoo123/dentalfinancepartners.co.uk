# Ecommerce launch-core — shared CONTENT-worker rules

You are writing ONE launch-core asset for a new UK ecommerce/marketplace-seller accountancy site
at `ecommerce/web` (repo root `C:\Users\user\Documents\Accounting`). Working brand **Ecommerce Tax
Partners** — do NOT hardcode the brand in body copy; write about "the site", "we", "your business",
"online sellers". Brand + CTA are injected by the page template and site config, never by content.

## Inputs (read first, in order)
1. This file.
2. **Your brief**: `briefs/ecommerce/wave1/<asset>.md` — the spec (target queries, H2 structure,
   competitors, house positions to cite, hallucination danger zones, internal links). Follow it, but
   where it conflicts with THIS file on category strings/slugs, THIS file wins.
3. **Facts**: `docs/ecommerce/house_positions.md` — the ONLY source for figures/thresholds/dates
   (rates also in `docs/ecommerce/rates_ledger.json`). Every figure you state must match a numbered
   house position or ledger entry and link its gov.uk URL. If your brief FLAGS an HP gap, do NOT
   invent a figure: describe it qualitatively / principles-only, or omit it.

## SHARED DANGER ZONES (distilled from the brief-writers' HP findings; hard DO-NOT-STATE list)
- **IOSS €150 ceiling**: not gov.uk-verifiable (gov.uk carries the UK/NI £135). DO NOT state the
  €150 figure. Describe the IOSS scope qualitatively; the /vat/ioss-vs-oss page carries the
  build-time EU citation, link to it.
- **OSS NI £8,818/€10,000 threshold**: unpinned. DO NOT state either figure.
- **Badges of trade**: never reduce to a sales count or invent a list threshold. If your brief
  requires the badges list, it must cite HMRC BIM20205 onward (live URL) or stay qualitative.
- **Amazon 2024 Luxembourg-to-UK fee-billing switch**: authority is Amazon seller docs, not gov.uk.
  State the reverse-charge PRINCIPLE (Notice 741A, HP-cited); do not assert the Amazon-specific
  entity/date change unless your brief supplies the citation.
- **EU-side rules** (per-member-state establishment, fiscal representatives, EPR): out of gov.uk
  scope. No figures, no country-specific claims without an EU-official citation in your brief.
- **HMRC discovery/assessment time limits** ("how far back can HMRC go"): stay qualitative.
- **Establishment-test criteria**: HP fixes the deemed-supplier mechanism, NOT day/staff/premises
  thresholds. Principles only.
- **£135 consignment-value measurement** (shipping/insurance/aggregation): not HP-fixed; do not
  improvise rules.
- **Margin-scheme qualifying-goods list**: no specific eligibility list is HP-locked; describe
  second-hand-goods scope per the cited gov.uk page only.
- **VAT threshold = GROSS marketplace sales, not net platform payout.** State this correctly
  everywhere turnover is mentioned; it is the site's signature correction.
- **Generalist link-out rule**: generic £90k VAT registration mechanics, MTD ITSA mechanics,
  generic incorporation/ST-vs-Ltd, generic salary/dividend, generic-importer PVA are OWNED by
  hollowaydavies.co.uk. Link out; never re-explain at depth.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin or AI-scammy. Worked examples, tables,
  edge cases the brief names. This quality IS the strategy.
- **BLUF**: open each money/guide H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no ACA/ICAEW/credential claims, no fabricated client
  names/counts/testimonials, no fabricated search-volume or market stats, NO pricing figures.
- **NO pipeline artefacts in reader copy**: never "verify at build", "the brief notes", inline
  "(HP12)" codes, or narrated punts. If a figure is flagged unverified, write around it cleanly.
- **No cross-post boilerplate**: no formulaic "This guide sets out..." intros; vary structure and
  voice per asset; link to the canonical page instead of restating sibling definitions.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure, from
  your brief's House Positions section.
- **UK scope, seller-owner frame**: Amazon/Shopify/eBay/Etsy/TikTok/Vinted sellers as BUSINESS
  owners. Never consumer-buyer frame. GB-vs-NI VAT differences flagged explicitly where the brief
  requires, never silently mixed.
- **No brand in metaTitle**: query-focused, ≤60 chars, no brand suffix (template appends it).
- **Internal links** (plain anchors, fine if the target is stubbed): services `/services/<slug>`
  (ecommerce-vat-compliance, settlement-payout-reconciliation, selling-into-the-eu,
  hmrc-letter-online-sales), hubs `/for/<slug>` (amazon-sellers, shopify-sellers,
  marketplace-sellers, dropshippers), VAT cluster `/vat/<slug>` (deemed-supplier-establishment,
  vat-on-marketplace-fees, 135-import-rule, ioss-vs-oss, postponed-vat-margin-scheme), calculators
  `/calculators/<slug>` (seller-take-home, vat-threshold-tracker, sole-trader-vs-ltd-sellers),
  research `/research/online-seller-index`, blogs `/blog/<category-slug>/<slug>`. ONLY these slugs.

## BLOG posts → `ecommerce/web/content/blog/<slug>.md`
YAML frontmatter, then a **RAW HTML** body. Model the EXACT shape of an existing post
`care/web/content/blog/` (any post; same frontmatter fields):
```
---
title: "Compelling human title"
slug: "<exact slug>"
date: "2026-07-15"
author: ""
category: "<one of the 6 EXACT strings below>"
metaTitle: "<= 60 chars, includes primary query, NO brand suffix"
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
**CRITICAL — body is RAW HTML, not markdown.** The loader injects the body via
`dangerouslySetInnerHTML` with NO markdown conversion. Use `<p>`, `<h2>`, `<h3>`, `<ul><li>`,
`<ol><li>`, `<table>`, `<strong>`, `<a href>`. NO markdown syntax in the body.

### The 6 valid blog categories (EXACT string) → URL slug
- `VAT and Cross-Border Selling` → `/blog/vat-and-cross-border-selling/<slug>`
- `Platform Reporting and HMRC Letters` → `/blog/platform-reporting-and-hmrc-letters/<slug>`
- `Amazon and Marketplace Selling` → `/blog/amazon-and-marketplace-selling/<slug>`
- `Bookkeeping and Inventory` → `/blog/bookkeeping-and-inventory/<slug>`
- `Business Structure and Tax` → `/blog/business-structure-and-tax/<slug>`
- `Making Tax Digital and Self Assessment` → `/blog/making-tax-digital-and-self-assessment/<slug>`

Blog slug → category (authoritative list):
- `platform-reporting-rules` → Platform Reporting and HMRC Letters
- `trading-allowance-online-sellers` → Making Tax Digital and Self Assessment
- `vat-threshold-gross-vs-payout` → VAT and Cross-Border Selling
- `flat-rate-scheme-wrong-for-sellers` → VAT and Cross-Border Selling
- `cogs-inventory-basics` → Bookkeeping and Inventory
- `cash-vs-accruals-stock` → Bookkeeping and Inventory
- `sole-trader-vs-ltd-online-sellers` → Business Structure and Tax
- `mtd-itsa-online-sellers` → Making Tax Digital and Self Assessment

## MONEY pages (services / for hubs / vat cluster / home) → TypeScript data entries
Live in shared data files (`ecommerce/web/src/data/*.ts`). Edit ONLY the entry your dispatch
assigns; keep the `interface` and `get…(slug)` helper unchanged. Entry fields: `slug` (do not
change), `title`, `headline`, `metaTitle` (≤60, no brand suffix), `metaDescription` (≤155),
`intro`, `stats` (exactly 3 × {value,label} — values must be HP/ledger-verifiable figures, never
invented; if no citable figure fits, use a qualitative value string), `challenges` (exactly 4 ×
{title,body}), `howWeHelp` (exactly 3 × {title,body}), `faqs` (2+ × {question,answer}). Body
strings may contain inline `<a href>` and `<strong>`. Replace the infra STUB content entirely with
brief-accurate, HP-verified copy. Run `npx tsc --noEmit` from `ecommerce/web` after your edit and
fix any error YOU introduced before reporting done (verify the output yourself).

Calculators and the research index page structure are ALREADY BUILT — do not touch
`ecommerce/web/src/lib/calculators/` engines.

Write ONLY your assigned file(s). Do not run full builds, do not edit config or other sites, do
not touch another worker's file. Work synchronously in the foreground. Report the path(s) written
and a 1-line summary.
