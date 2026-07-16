# Crypto launch-core — shared worker rules

You are writing ONE launch-core asset for a new UK crypto-tax accountancy site at `crypto/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief + the facts
source before writing. Working brand = **Crypto Tax Partners** (do NOT hardcode the brand
name in body copy; write about "the firm", "we", "your position", "investors/traders/businesses".
Brand + CTA are injected by the page template + site config, not by your content file).

## Inputs (read first)
- **Your brief**: `briefs/crypto/wave1/<brief>.md` — the spec: target queries, required H2 structure,
  house positions to cite, danger zones, FAQ seeds. Follow it.
- **Facts**: `docs/crypto/house_positions.md` — the ONLY source for figures/thresholds/dates. Every
  figure you state must match a house position and link its gov.uk URL. If your brief flags an HP
  gap, DO NOT invent a figure: omit or describe qualitatively.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin/AI-scammy. Worked examples, tables,
  real edge cases. Quality IS the strategy.
- **BLUF**: where the brief says answer-box/BLUF, open each H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Use commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no invented credentials or qualifications, no fabricated
  client names/counts, no pricing figures (pricing flows from config, never stated). The owner is
  NOT an accountant, authority comes from cited HMRC sources + the calculators + the data asset.
- **Tax-compliance frame ONLY**: never give investment advice, price predictions, or financial
  promotions. This is a tax site, not a trading site.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure.
- **UK-wide default (HMRC).** Flag Scottish income tax bands only where a marginal-rate outcome
  changes; never silently assume rUK bands where it matters.

## SHARED DANGER ZONES (apply to every asset — from house_positions verification)
- **CGT on crypto is 18% ONLY on the part of the gain within the taxpayer's remaining basic-rate
  band, then 24% above; higher/additional-rate pay a flat 24%** (HP 2). NEVER write a flat
  "18% basic rate". The basic-rate band ceiling is £37,700 taxable income (2026/27).
- **CGT annual exempt amount = £3,000** (HP 3, frozen). Most active traders exhaust it in one or
  two disposals once swaps are counted.
- **Crypto-to-crypto swaps ARE disposals** at sterling market value (HP 6). "I never cashed out"
  is not a defence.
- **s104 pooling is per token at average cost** (HP 4). FIFO/LIFO/spec-ID (US software defaults)
  are WRONG for UK. **Same-day then 30-day then pool** ordering overrides the pool (HP 5) and is
  out of scope of any web calculator.
- **CARF dates, exact, never exaggerated** (HP 24): UK platforms collect user/transaction data
  from **1 January 2026** (covering 1 Jan to 31 Dec 2026); the first report to HMRC is submitted
  **between 1 January 2027 and 31 May 2027**; annual by 31 May thereafter. Do not say HMRC already
  has full historic data or that reporting has "already happened".
- **DeFi + IHT-situs positions carry "HMRC's current view, not settled law" EVERY time** (HP 13,
  14, 28). The 2023 DeFi consultation was not enacted. Many DeFi deposits/LP entries are disposals
  under CRYPTO61000, framed as HMRC's view.
- **Trader status is usually a BAD outcome** (HP 16): income tax up to 45% + Class 4 NIC vs 24%
  CGT. Almost everyone is an investor (HP 15); trader treatment only in exceptional circumstances.
- **Employer NIC = 15% above the £5,000 secondary threshold** (HP 8, from 6 Apr 2025) for
  paying-staff-in-crypto content. The old **13.8% / £9,100 is STALE, never use it.**
- **Losing private keys is NOT a disposal** (HP 20); a negligible value claim needs the asset
  itself to be worthless (HP 21). Exchange collapse is fact-specific, no promised deduction (HP 22).
- **Mining/staking two-step** (HP 9, 10): income on receipt at receipt value (misc vs trading),
  which becomes the CGT base cost. **£1,000 trading/misc allowance** shelters small receipts from
  income tax only, NOT the later CGT (HP 12).
- **Airdrops**: income only if received in return for something; unsolicited airdrops enter CGT at
  acquisition value (HP 11). **Forks split base cost, not free income** (HP 23).
- **Scope wall** (HP 30): property CGT, EMI/SEIS, and generic sole-trader SA belong to OTHER estate
  sites. No cross-linking between estate sites, ever.
- **Calculators are scenario/estimate tools** that end at "your situation has X complexity, speak
  to us" and state their simplifications. Never claim a filing-ready or "accurate" tax figure.

## Internal links (plain anchors, fine if the sibling is not built yet)
- audience hubs: `/for/<slug>` — investors, day-traders, defi-and-staking, nft-creators-and-flippers, miners, businesses
- service pages: `/services/<slug>` — hmrc-disclosure, crypto-self-assessment, koinly-recap-reconciliation, crypto-cgt-planning, investor-vs-trader-status
- calculators: `/calculators/<slug>` — crypto-cgt-estimator, crypto-disclosure-estimator, investor-vs-trader-status-checker, staking-mining-income-estimator
- research asset: `/research/crypto-tax-gap-index`
- blogs: `/blog/<category-slugified>/<slug>`

## BLOG posts → `crypto/web/content/blog/<slug>.md`
Frontmatter (YAML) then a **RAW HTML** body (the loader injects the body with NO markdown
conversion; use `<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`;
never markdown syntax):
```
---
title: "Compelling human title"
slug: "<exact-slug>"
date: "2026-07-14"
author: ""
category: "<the exact category your brief assigns>"
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
Blog categories in use (match your brief exactly): `Crypto CGT & Disposals` · `Staking Mining & Airdrops` ·
`DeFi & Complex Transactions` · `HMRC Disclosure & Compliance` · `Trader Status & Day Trading` ·
`Crypto for Business`.

## MONEY pages (services / for hubs) → TypeScript data entries
Shared data files. Edit ONLY the entry your dispatch assigns; keep the `interface` and the
`get<Thing>(slug)` helper unchanged. Fields per entry: `slug` (do not change), `title`, `headline`,
`metaTitle`, `metaDescription` (<=155), `intro`, `stats` (exactly 3 × {value,label}), `challenges`
(exactly 4 × {title,body}), `howWeHelp` (exactly 3 × {title,body}), `faqs` (2+ × {question,answer}).
Every figure matches house_positions and is safe to state (no HP-gap figures). Replace the stub
entry content with brief-accurate, HP-verified copy.

Write ONLY your assigned file(s). Do not run builds, do not edit config or other sites, do not touch
another worker's file. Report the path(s) written and a 1-line summary.
