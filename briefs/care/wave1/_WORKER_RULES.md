# Care launch-core — shared CONTENT-worker rules

You are writing ONE launch-core asset for a new UK care-sector accountancy site at
`care/web` (repo root `C:\Users\user\Documents\Accounting`). Working brand **Care Finance
Partners** — do NOT hardcode the brand in body copy; write about "the site", "we", "your service",
"care providers". Brand + CTA are injected by the page template and site config, never by content.

## Inputs (read first, in order)
1. This file.
2. **Your brief**: `briefs/care/wave1/<asset>.md` — the spec (target queries, H2 structure,
   competitors, house positions to cite, hallucination danger zones, internal links). Follow it, but
   where it conflicts with THIS file on category strings/slugs, THIS file wins.
3. **Facts**: `docs/care/house_positions.md` — the ONLY source for figures/thresholds/dates.
   Every figure you state must match a numbered house position and link its gov.uk URL. If your
   brief FLAGS an HP gap (a fact no HP covers), do NOT invent a figure: describe it qualitatively /
   principles-only, or omit it. Known cross-cutting gaps: CQC registration-fee amounts, ALL Ofsted
   figures, Home Office visa/sponsorship fee amounts, business-rates multiplier, devolved-nation
   rates. NONE of these may appear as numbers.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin or AI-scammy. Worked examples, tables,
  edge cases the brief names. This quality IS the strategy.
- **BLUF**: open each money/guide H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no ACA/ICAEW/credential claims, no fabricated client
  names/counts, NO pricing figures (pricing flows from config).
- **NO pipeline artefacts in reader copy**: never "verify at build", "the brief notes", inline
  "(HP12)" codes, "speak to us" as a table cell, or narrated punts ("we won't cover X here" when
  the brief required X). If your brief flags a figure as unverified, write around it cleanly.
- **No cross-post boilerplate**: do not open with a formulaic "This guide sets out..." intro; vary
  structure and voice per asset. Do not restate the same definition paragraph that sibling posts
  will carry; link to the canonical page instead.
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure, from
  your brief's House Positions section.
- **England default** (CQC, NHS funding, business rates). Scotland/Wales/NI flagged explicitly
  where the brief requires, never silently mixed, never given figures without an HP.
- **Operator/business frame only**: care home owners, registered managers, agency directors.
  Never the care-worker or family-payer frame. Medical-adjacency wall: nothing clinical or
  patient-facing.
- **No brand in metaTitle**: query-focused, ≤60 chars, no brand suffix (template appends it).
- **Internal links** (plain anchors, fine if the target is stubbed): services `/services/<slug>`,
  hubs `/for/<slug>`, calculators `/calculators/<slug>`, research `/research/care-provider-business-index`,
  blogs `/blog/<category-slug>/<slug>`. Use ONLY the exact slugs in `_BRIEF_RULES.md`
  (§ "Real route slugs") and the category map below.

## BLOG posts → `care/web/content/blog/<slug>.md`
YAML frontmatter, then a **RAW HTML** body. Model the EXACT shape of an existing post
`crypto/web/content/blog/carf-crypto-reporting-2026-explained.md` (same frontmatter fields):
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
`<ol><li>`, `<table>`, `<strong>`, `<a href>`. NO markdown syntax (`##`, `-`, `**`, `[]()`,
backticks) in the body — it renders as literal text.

### The 6 valid blog categories (EXACT string) → URL slug
- `Care Home Accounts and Funding` → `/blog/care-home-accounts-and-funding/<slug>`
- `Payroll and Workforce Costs` → `/blog/payroll-and-workforce-costs/<slug>`
- `VAT and Welfare Exemption` → `/blog/vat-and-welfare-exemption/<slug>`
- `CQC and Financial Compliance` → `/blog/cqc-and-financial-compliance/<slug>`
- `Business Structure and Acquisition` → `/blog/business-structure-and-acquisition/<slug>`
- `Fees, FNC and Local Authority Rates` → `/blog/fees-fnc-and-local-authority-rates/<slug>`

Blog slug → category assignment (use the brief's category; this is the authoritative list):
- `care-home-vat-exemption-edge-cases` → VAT and Welfare Exemption
- `sleep-in-pay-travel-time-nmw` → Payroll and Workforce Costs
- `sponsoring-care-workers-true-cost` → Payroll and Workforce Costs
- `fnc-chc-la-fee-mix-accounting` → Fees, FNC and Local Authority Rates
- `agency-staff-cost-control-occupancy` → Care Home Accounts and Funding
- `ofsted-vs-cqc-money-paperwork` → CQC and Financial Compliance
- `cqc-financial-viability-statement-walkthrough` → CQC and Financial Compliance
- `capital-allowances-care-home-fit-out` → Business Structure and Acquisition
- `business-rates-care-homes` → Business Structure and Acquisition
- `mtd-it-care-owner-operators` → Care Home Accounts and Funding

## MONEY pages (services / for hubs / home) → TypeScript data entries
Live in shared data files (`care/web/src/data/*.ts`, mirrored from the startups-tech/crypto
pattern). Edit ONLY the entry your dispatch assigns; keep the `interface` and `get…(slug)` helper
unchanged. Entry fields: `slug` (do not change), `title`, `headline`, `metaTitle` (≤60, no brand
suffix), `metaDescription` (≤155), `intro`, `stats` (exactly 3 × {value,label} — values must be
HP-verifiable figures, never invented), `challenges` (exactly 4 × {title,body} — the field is
`body:`, NOT `answer:`), `howWeHelp` (exactly 3 × {title,body}), `faqs` (2+ × {question,answer}).
Body strings may contain inline `<a href>` and `<strong>`. Replace the infra STUB content entirely
with brief-accurate, HP-verified copy. Run `npx tsc --noEmit` from `care/web` after your edit and
fix any error YOU introduced before reporting done (verify the command output yourself; do not
claim green without running it).

Calculators and the research index are ALREADY BUILT — do not touch
`care/web/src/lib/calculators/` or the research page.

Write ONLY your assigned file(s). Do not run full builds, do not edit config or other sites, do
not touch another worker's file. Work synchronously in the foreground. Report the path(s) written
and a 1-line summary.
