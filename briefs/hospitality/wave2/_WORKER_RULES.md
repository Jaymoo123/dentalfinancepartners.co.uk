# Hospitality wave-2 — shared worker rules

You are writing ONE wave-2 content asset for the live UK hospitality-accountancy site at
`hospitality/web` (repo root `C:\Users\user\Documents\Accounting`). Working brand =
**Hospitality Finance Partners** (do NOT hardcode the brand in body copy; write about "the
business", "operators", "your restaurant/pub/hotel". CTA/brand is injected by the page template
and site config, not by your content file).

Wave-2 differs from wave-1: these are net-new BLOG posts (assets 1-5) plus ONE section addition
to an existing page (asset 6). No new services/hubs. Assets 1-5 are all blog `.md` files. Asset
6 edits an existing `.tsx` page + its JSON snapshot, and has its own explicit spec.

## Inputs (read first)
- **Your brief**: `briefs/hospitality/wave2/<slug>.md` — the spec. Follow it exactly.
- **Facts**: `docs/hospitality/house_positions.md` (HP 1-28) + `docs/hospitality/rates_ledger.json`
  — the ONLY source for figures/thresholds/dates. Every figure you state must match a house
  position and link its gov.uk / legislation.gov.uk URL. If your brief flags an HP GAP, DO NOT
  invent a figure: omit, or describe qualitatively, or link gov.uk live for the reader.
- **Wave-1 for voice/structure**: `briefs/hospitality/wave1/` briefs and the built posts in
  `hospitality/web/content/blog/`. Match that A* depth and answer-first house style.

## Global quality rules (locked, non-negotiable — same as wave-1)
- **A\* authority bar**: genuinely authoritative, never thin/AI-scammy. Worked examples, tables,
  operator-relevant edge cases. Quality IS the strategy.
- **BLUF**: open the page (and each H2 the brief tags) with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Use commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no invented credentials, no fabricated client names
  or counts, no pricing/fee figures (pricing flows from config, never stated in body).
- **BUSINESS/OPERATOR frame**: the audience is the owner/operator/employer (covers, sites, GP%,
  rotas, EPOS, revenue mix), never the employee/guest.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure.
- **England default.** Flag Scotland/Wales/NI explicitly where rates, licensing and duty differ.

## SHARED DANGER ZONES (carried from wave-1 — apply to every asset)
- **RHL relief ENDED for new claims from 1 April 2026** (HP 19). NEVER assert a live Retail,
  Hospitality & Leisure relief discount % or cap. Route rates content to SBRR and the revised
  multipliers; describe RHL as ended. 2026-27 England multipliers (HP 19): RHL 38.2p (RV below
  £51,000) / 43p (£51,000 to £499,999); £500,000+ pay 50.8p. Do not assert transitional protection.
- **Employer NIC = 15% / £5,000 secondary threshold** (HP 12, from Apr 2025). The old
  **13.8% / £9,100 is STALE — never use it.** Employment Allowance £10,500 (HP 13).
- **NLW £12.71 (21+), £10.85 (18-20), £8.00 (under-18/apprentice) from 6 Apr 2026** (HP 11).
  **VAT registration threshold £90,000** (HP 4).
- **Tips can NEVER count toward NMW/NLW** (HP 10). **Tronc NIC exemption is NOT automatic** (HP 7):
  it needs genuine troncmaster independence; any employer allocation involvement destroys it.
  Income tax via PAYE still applies to tronc receipts.
- **Tips Act 2023 in force since 1 October 2024** (HP 8); 100% of qualifying tips to workers,
  written policy, records; frame as current law, not forthcoming.
- **Food-VAT (HP 1-3)**: never reduce to "hot food is taxed". Carry the five hot tests, the
  eat-in/premises override (HP 2), and the four zero-rating carve-outs (confectionery, crisps and
  savoury snacks, soft drinks, alcohol — all standard-rated; ice cream standard-rated) (HP 3).
  **Alcohol is always standard-rated in every context.**
- **FRS sector rates (HP 5)**: catering 12.5%, pubs 6.5%, hotels/accommodation 10.5%,
  limited-cost-trader 16.5%. Tradescode governs, not self-description. Do not invent other rates.
- **Kitchen/refit capital allowances (HP 22)**: AIA £1m; main-pool WDA 18% falling to 14% from
  2026-27 (FA 2026 s.28); new 40% FYA for qualifying main-pool additions (s.29). Special-rate 6%
  is NOT in HP 22 — do not attach the 40% FYA to special-rate additions.
- **MTD for Income Tax staircase (HP 24)**: over £50k from 6 Apr 2026, £30k from 6 Apr 2027,
  £20k from 6 Apr 2028. Cash basis is the unincorporated default from 6 Apr 2024 (HP 25).
- **GP% / food-cost / labour% benchmarks are illustrative only** — never present a margin figure
  as an official benchmark; state assumptions.
- **FHL regime abolished April 2025** — do NOT assert Furnished Holiday Lettings rules; not an HP.
- **TOMS (HP 6)**: applies to any operator packaging bought-in travel elements, not only tour
  operators; VAT on the margin only; no input VAT recovery on bought-in elements. Do not state a
  TOMS rate or margin %; the detailed calculation method / place-of-supply detail is NOT an HP.

## Estate dedup rule (MANDATORY — read your brief's dedup section)
The **generalist site (Holloway Davies) has 5 live hospitality posts** (accountant-for-hotels,
accountant-for-restaurants-and-cafes, accountant-for-pubs-and-bars-uk,
hospitality-accountant-restaurant-pub-hotel, hospitality-accountants). These are broad
"why hire a specialist" hire-intent posts. Every wave-2 asset must own a DISTINCT intent
(workflow / EPOS / revenue-management / product-VAT-rates / advisory-vs-compliance), not restate
the generalist's generic "specialist accountant for X" pitch. Your brief documents the exact wedge;
hold it. Also dedup against the site's own 24 launch pages (12 blog + 6 hubs + 5 services + index);
your brief names the sibling pages to LINK, not duplicate.

## BLOG posts → `hospitality/web/content/blog/<slug>.md` (assets 1-5)
Frontmatter (YAML) then a **RAW HTML** body (loader injects the body with NO markdown conversion;
use `<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`; never
markdown syntax). The loader adds heading IDs automatically. Frontmatter shape:
```
---
title: "Compelling human title"
slug: "<exact-slug from brief>"
date: "2026-07-15"
author: ""
category: "<exact category string from brief>"
metaTitle: "<= 60 chars, includes primary query>"
metaDescription: "<= 155 chars>"
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
**Blog categories in use (use the exact string your brief assigns — all are existing categories,
slugifyCategory-safe):** `Hospitality VAT` · `Tips and Tronc` · `Licensed Trade` ·
`Payroll and Employment` · `Hospitality Accounts` · `Making Tax Digital` · `Capital Allowances` ·
`Business Rates`. Do NOT invent a new category (a new category creates a new /blog/<slug> route
with a one-post index — avoid).

Internal-link href patterns (plain anchors; all these siblings are BUILT):
- hubs: `/for/{restaurants,pubs-and-bars,takeaways,hotels-and-guesthouses,cafes-and-coffee-shops,caterers-and-street-food}`
- services: `/services/{tronc-scheme-setup,hospitality-payroll,hospitality-vat,toms-advice,business-rates-relief}`
- calculators: `/calculators/{staff-cost-rota-margin-calculator,tronc-tips-paye-nic-calculator,food-drink-vat-rate-checker}`
- blog: `/blog/<category-slugified>/<slug>` (e.g. Hospitality VAT → `/blog/hospitality-vat/vat-on-takeaway-food`)
- research index: `/research/hospitality-openings-closures-index`

## SECTION addition (asset 6) → edit existing `.tsx` + JSON (own spec in the brief)
Not a new page. Add ONE `<Section>` to
`hospitality/web/src/app/research/hospitality-openings-closures-index/page.tsx` and the data it
needs to `hospitality/web/src/data/uk-hospitality-openings-closures-index.json`. The brief gives
the exact placement, data keys, and copy spec. Keep the existing `Section`/`Stat` components,
`fmt`/`fmtNet` helpers, and JSON shape unchanged. Do not restructure the page.

Write ONLY your assigned file(s). Do not run builds, do not edit config or other sites, do not
touch another worker's file. Report the path(s) written and a 1-line summary.
