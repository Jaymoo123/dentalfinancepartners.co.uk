# Hospitality launch-core — shared worker rules

You are writing ONE launch-core asset for a new UK hospitality-accountancy site at `hospitality/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief + the facts
source before writing. Working brand = **Hospitality Finance Partners** (do NOT hardcode the brand
name in body copy; write about "the business", "operators", "your restaurant/pub/hotel". CTA/brand
is injected by the page template + site config, not by your content file).

## Inputs (read first)
- **Your brief**: `briefs/hospitality/wave1/<brief>.md` — the spec: target queries, required H2
  structure, competitors to beat, house positions to cite, hallucination danger zones. Follow it.
- **Facts**: `docs/hospitality/house_positions.md` — the ONLY source for figures/thresholds/dates.
  Every figure you state must match a house position and link its gov.uk / legislation.gov.uk URL.
  If your brief flags an HP gap, DO NOT invent a figure: omit or describe qualitatively.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin/AI-scammy. Worked examples, tables,
  operator-relevant edge cases. Quality IS the strategy.
- **BLUF**: where the brief says answer-box/BLUF, open each H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Use commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no invented credentials, no fabricated client names or
  counts, no pricing figures (pricing flows from config, never stated).
- **BUSINESS/OPERATOR frame**: the audience is the owner/employer (covers, sites, GP%, rotas),
  never the employee. Every /for hub and service page speaks to the operator.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure.
- **England default.** Flag Scotland/Wales/NI explicitly where the brief says (rates, licensing
  and duty differ); never silently present an England figure as UK-wide.
- **Internal links** to sibling launch-core assets, href patterns (plain anchors, fine if the
  sibling is not built yet):
  - sub-trade hubs: `/for/<slug>` (restaurants, pubs-and-bars, takeaways, hotels-and-guesthouses, cafes-and-coffee-shops, caterers-and-street-food)
  - service pages: `/services/<slug>` (tronc-scheme-setup, hospitality-payroll, hospitality-vat, toms-advice, business-rates-relief)
  - calculators: `/calculators/<slug>`
  - blogs: `/blog/<category-slugified>/<slug>`

## SHARED DANGER ZONES (apply to every asset — from the brief-writers' HP verification)
- **RHL relief ENDED for new claims from 1 April 2026** (HP 19). NEVER assert a live Retail,
  Hospitality & Leisure relief discount % or cap. Route rates content to SBRR and the revised
  multipliers; describe RHL as ended.
- **Employer NIC = 15% / £5,000 secondary threshold** (HP 12, from Apr 2025). The old
  **13.8% / £9,100 is STALE — never use it.** Employment Allowance £10,500 (HP).
- **NLW £12.71 from 6 Apr 2026** (HP 11). **VAT registration threshold £90,000** (HP 4).
- **Holiday pay 12.07% / 52-week reference period is NOT a locked house position** — cite gov.uk
  live or omit; do not assert from memory.
- **Licensing: a first-application licence cost is CAPITAL and not deductible** (BIM61405, HP 17);
  only renewals are deductible. Do not claim blanket deductibility.
- **GP% / food-cost benchmarks are illustrative only** — never present a margin figure as an
  official benchmark; state assumptions.
- **MGD rates/bands and AWRS penalty amounts are NOT locked** — describe the mechanism, link
  HMRC, do not state figures.
- **Kitchen fit-out (HP 22)**: AIA £1m, main-pool WDA 18% falling to 14%, new 40% first-year
  allowance (FA 2026 s.28/s.29); special-rate 6% is NOT in HP 22 — do not attach the 40% FYA to
  special-rate additions.
- **MTD for Income Tax staircase (HP 24)**: over £50k from 6 Apr 2026, £30k from 6 Apr 2027,
  £20k from 6 Apr 2028. Cash basis is the unincorporated default from 6 Apr 2024 (HP 25).
- **B&B / rent-a-room (HP 21)**: £7,500 (£3,750 if shared); residence + trade-vs-property nuance.
  This topic collides with live generalist/property estate content — keep the angle hospitality-specific.

## BLOG posts → `hospitality/web/content/blog/<slug>.md`
Frontmatter (YAML) then a **RAW HTML** body (the loader injects the body with NO markdown
conversion; use `<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`;
never markdown syntax):
```
---
title: "Compelling human title"
slug: "<exact-slug>"
date: "2026-07-14"
author: ""
category: "<the category your brief assigns, exact string>"
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
Blog categories in use (match your brief exactly): `Hospitality VAT` · `Tips and Tronc` ·
`Licensed Trade` · `Payroll and Employment` · `Hospitality Accounts` · `Making Tax Digital` ·
`Capital Allowances` · `Business Rates`.

## MONEY pages (services / for hubs) → TypeScript data entries
Shared data files. Edit ONLY the entry your dispatch assigns; keep the `interface` and the
`getHospitalityService`/`getHospitalityHub` helper unchanged. Fields per entry: `slug` (do not
change), `title`, `headline`, `metaTitle` (may include " | Hospitality Finance Partners"),
`metaDescription` (<=155), `intro`, `stats` (exactly 3 × {value,label}), `challenges` (exactly
4 × {title,body}), `howWeHelp` (exactly 3 × {title,body}), `faqs` (2+ × {question,answer}). Every
figure matches house_positions and is safe to state (no HP-gap figures). Operator frame throughout.
Replace the stub entry content with brief-accurate, HP-verified copy.

Write ONLY your assigned file(s). Do not run builds, do not edit config or other sites, do not
touch another worker's file. Report the path(s) written and a 1-line summary.
