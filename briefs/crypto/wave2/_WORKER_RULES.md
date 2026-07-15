# Crypto wave-2 — shared worker rules

You are writing ONE wave-2 blog asset for the UK crypto-tax accountancy site at `crypto/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief +
`docs/crypto/house_positions.md` (the ONLY source for figures/thresholds/dates) before writing.
Working brand is injected by the page template + site config, NOT hardcoded in body copy. Write
about "the firm", "we", "your position", "investors/traders/businesses".

Wave-2 is the distress/planning + pillar lane. All seven assets are BLOG posts written to
`crypto/web/content/blog/<slug>.md`. None are new /for or /services pages (those exist from
wave-1). Several link INTO existing wave-1 service/hub pages for capture.

## Inputs (read first)
- **Your brief**: `briefs/crypto/wave2/<brief>.md` — target queries, H2 structure, house positions
  to cite, danger zones, FAQ seeds, internal links to REAL wave-1 slugs. Follow it exactly.
- **Facts**: `docs/crypto/house_positions.md`. Every figure must match a house position and link its
  gov.uk URL. If your brief FLAGS an HP gap, DO NOT invent a figure: describe qualitatively, link
  the named verification URL, and route to "speak to us".

## Blog file format (unchanged from wave-1)
Frontmatter (YAML) then a **RAW HTML** body (loader does NO markdown conversion; use `<p>`, `<h2>`,
`<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`, `<a href>`; NEVER markdown syntax):
```
---
title: "Compelling human title"
slug: "<exact-slug-from-brief>"
date: "2026-07-15"
author: ""
category: "<exact category from brief>"
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

## Category → route slug (via crypto/web/src/lib/blog.ts slugifyCategory)
slugifyCategory lowercases, strips `(),`, turns `&`→`and`, spaces→`-`. So the LIVE category slugs
(use the exact category string your brief assigns; the route is derived, do not hand-write it):
- `Crypto CGT & Disposals` → `crypto-cgt-and-disposals`
- `Staking Mining & Airdrops` → `staking-mining-and-airdrops`
- `DeFi & Complex Transactions` → `defi-and-complex-transactions`
- `HMRC Disclosure & Compliance` → `hmrc-disclosure-and-compliance`
- `Trader Status & Day Trading` → `trader-status-and-day-trading`
- `Crypto for Business` → `crypto-for-business`
(Wave-1 brief `route:` lines like `/blog/crypto-cgt/...` were illustrative and WRONG; the real
category slug is `crypto-cgt-and-disposals`. Do not copy the short form.)

## Global quality rules (locked, non-negotiable, unchanged from wave-1)
- **A\* authority bar**: genuinely authoritative, worked examples, tables, real edge cases.
- **BLUF**: open each H2 the brief marks answer-box with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, middle dots (·) only. Hard rule.
- **Faceless authority**: no named experts, no invented credentials/qualifications, no fabricated
  client names/counts, no pricing figures. Authority = cited HMRC/FCA sources + calculators + data
  asset. Owner is NOT an accountant.
- **Tax-compliance frame ONLY**: never investment advice, price views, or financial promotions.
- **Planning content = legitimate reliefs and timing ONLY** (spouse transfers, loss claims within
  the claim window, negligible-value claims, ISA wrappers). NEVER evasion, concealment, or
  "hide it from HMRC" framing. The honest, cited version is the differentiator.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` (or fca.org.uk where the
  brief names it) for every figure and date.
- **UK-wide default (HMRC).** Flag Scottish income tax bands only where a marginal-rate outcome
  changes.

## SHARED DANGER ZONES (apply to every asset — carried from wave-1 house_positions verification)
- **CGT on crypto is 18% ONLY on the gain within the taxpayer's remaining basic-rate band, then
  24% above; higher/additional-rate pay a flat 24%** (HP 2). NEVER a flat "18% basic rate". Basic
  band ceiling £37,700 taxable income (2026/27).
- **CGT annual exempt amount = £3,000** (HP 3, frozen).
- **Crypto-to-crypto swaps ARE disposals** at sterling market value (HP 6).
- **s104 pooling per token at average cost** (HP 4); same-day then 30-day then pool (HP 5) overrides
  and is out of scope of any web calculator.
- **CARF dates, exact, never exaggerated** (HP 24): platforms collect from **1 January 2026**
  (covering 1 Jan to 31 Dec 2026); first report to HMRC **between 1 January 2027 and 31 May 2027**;
  annual by 31 May thereafter. Do NOT say HMRC already has full historic data.
- **Disclosure years by behaviour: 4 / 6 / 20** (HP 31, reasonable care / careless / deliberate).
  State year counts precisely; present penalty percentages as ranges linked to HMRC penalty
  guidance; do NOT assert an exact penalty % without build-time re-verification.
- **DeFi + IHT-situs positions carry "HMRC's current view, not settled law" EVERY time** (HP 13, 14,
  28).
- **Trader status is usually a BAD outcome** (HP 16): income tax to 45% + Class 4 NIC vs 24% CGT.
- **Losing private keys is NOT a disposal** (HP 20); negligible value needs the asset itself
  worthless (HP 21); exchange collapse is fact-specific, no promised deduction (HP 22).
- **Scope wall** (HP 30): property CGT, EMI/SEIS, generic sole-trader SA belong to OTHER estate
  sites. No cross-linking between estate sites, EVER. (The generalist "accountant-for-crypto-traders"
  post is on a different brand/domain; do not reference or link it.)
- **Calculators are scenario/estimate tools** ending at "your situation has X complexity, speak to
  us"; they state their simplifications and never claim a filing-ready figure.

## Internal links (plain anchors; wave-1 siblings are BUILT)
- audience hubs: `/for/<slug>` — investors, day-traders, defi-and-staking, nft-creators-and-flippers,
  miners, businesses
- service pages: `/services/<slug>` — hmrc-disclosure, crypto-self-assessment,
  koinly-recap-reconciliation, crypto-cgt-planning, investor-vs-trader-status
- calculators: `/calculators/<slug>` — crypto-cgt-estimator, crypto-disclosure-estimator,
  investor-vs-trader-status-checker, staking-mining-income-estimator
- research asset: `/research/crypto-tax-gap-index`
- wave-1 blogs (link by real slug, category-slug in the path):
  `/blog/hmrc-disclosure-and-compliance/carf-crypto-reporting-2026-explained`,
  `/blog/hmrc-disclosure-and-compliance/hmrc-crypto-nudge-letter-what-to-do`,
  `/blog/crypto-cgt-and-disposals/crypto-to-crypto-swaps-are-disposals`,
  `/blog/crypto-cgt-and-disposals/crypto-same-day-30-day-rules-worked-example`,
  `/blog/crypto-cgt-and-disposals/lost-crypto-exchange-collapse-negligible-value`,
  `/blog/staking-mining-and-airdrops/staking-rewards-tax-two-step`,
  `/blog/staking-mining-and-airdrops/crypto-mining-tax-1000-allowance`,
  `/blog/defi-and-complex-transactions/defi-lending-liquidity-pool-disposals`,
  `/blog/trader-status-and-day-trading/day-trader-forex-spread-betting-tax-uk`,
  `/blog/crypto-for-business/paying-staff-in-crypto-paye-nic`,
  `/blog/crypto-for-business/company-crypto-treasury-accounting`,
  `/blog/crypto-cgt-and-disposals/nft-tax-income-vs-cgt`

Write ONLY your assigned file. Do not run builds, edit config, or touch another site or another
worker's file. Report the path written and a 1-line summary.
