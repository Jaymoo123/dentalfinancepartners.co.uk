# Startups/tech launch-core — shared CONTENT-worker rules

You are writing ONE launch-core asset for a new UK startups / tech / SaaS accountancy site at
`startups-tech/web` (repo root `C:\Users\user\Documents\Accounting`). Working brand **Founder Finance
Partners** — do NOT hardcode the brand in body copy; write about "the site", "we", "your company",
"founders". Brand + CTA are injected by the page template and site config, never by your content.

## Inputs (read first, in order)
1. This file.
2. **Your brief**: `briefs/startups-tech/wave1/<asset>.md` — the spec (target queries, H2 structure,
   competitors, house positions to cite, hallucination danger zones, internal links). Follow it, but
   where it conflicts with THIS file on category strings/slugs, THIS file wins.
3. **Facts**: `docs/startups-tech/house_positions.md` — the ONLY source for figures/thresholds/dates.
   Every figure you state must match a numbered house position and link its gov.uk URL. If your brief
   FLAGS an HP gap (a fact no HP covers), do NOT invent a figure: describe it qualitatively/principles
   -only, or omit it.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin or AI-scammy. Worked examples, tables,
  edge cases the brief names. This quality IS the strategy.
- **BLUF**: open each money/guide H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no ACA/ICAEW/credential claims, no fabricated client
  names/counts, NO pricing figures (pricing flows from config).
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure, from your
  brief's House Positions section (legislation.gov.uk where the HP uses it).
- **Boundaries (HP27/28)**: state the IR35/off-payroll boundary in ONE line and defer depth to the
  sibling Contractor Tax Accountants site; do NOT write agency/marketing-agency audience content.
- **Scottish income tax**: mention divergence ONLY on founder-salary content (dividend-vs-salary
  calculator + core-compliance/extraction), never on CGT or CT content.
- **No brand in metaTitle**: keep metaTitle query-focused, ≤60 chars, no brand suffix (the template
  appends the site name from config; this keeps the G1 brand swap a config-only change).
- **Internal links** (plain anchors, fine if the sibling is not built yet): services `/services/<slug>`,
  hubs `/for/<slug>`, calculators `/calculators/<slug>`, research `/research/<slug>`, blogs
  `/blog/<category-slug>/<slug>`. Use the specific targets named in your brief. Slug map is in
  `_BRIEF_RULES.md` (§ "Launch-core slug map").

## BLOG posts → `startups-tech/web/content/blog/<slug>.md`
YAML frontmatter, then a **RAW HTML** body. Model the EXACT shape of an existing post
`crypto/web/content/blog/carf-crypto-reporting-2026-explained.md` (same frontmatter fields):
```
---
title: "Compelling human title"
slug: "<exact-slug from the slug map>"
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
`<ol><li>`, `<table><thead><tr><th>…<tbody><tr><td>`, `<strong>`, `<a href>`. Do NOT use markdown
syntax (`##`, `-`, `**`, `[]()`, backticks) in the body — it renders as literal text.

### The 6 valid blog categories (use the EXACT string) → their URL slug
- `Research and Development` → `/blog/research-and-development/<slug>`
- `SEIS and EIS` → `/blog/seis-and-eis/<slug>`
- `Share Schemes and EMI` → `/blog/share-schemes-and-emi/<slug>`
- `Founder Tax and Extraction` → `/blog/founder-tax-and-extraction/<slug>`
- `SaaS and Tech Finance` → `/blog/saas-and-tech-finance/<slug>`
- `Startup Compliance` → `/blog/startup-compliance/<slug>`

> NOTE: the R&D blogs' briefs may say category "R&D Tax Relief" — IGNORE that string and use
> **`Research and Development`** (the literal "R&D" with an ampersand slugifies to the broken
> "randd-tax-relief"; spelled-out avoids it). Category → slug assignment per blog:
> - `Research and Development`: merged-rd-scheme-explained, eris-rd-intensive-30-percent,
>   rd-claim-notification-6-month-deadline, rd-additional-information-form-guide,
>   software-rd-eligibility-what-qualifies, startup-grants-and-rd-interaction
> - `SEIS and EIS`: seis-company-checklist, seis-vs-eis-explained,
>   how-to-apply-for-seis-eis-advance-assurance, seis1-eis1-compliance-statements
> - `Share Schemes and EMI`: emi-qualifying-company-rules, emi-option-valuation,
>   emi-disqualifying-events, emi-vs-csop, growth-shares-explained, section-431-elections,
>   option-pool-basics-uk-founders
> - `SaaS and Tech Finance`: vat-for-saas-place-of-supply

## MONEY pages (services / for) → TypeScript data entries
Live in shared data files (`startups-tech/web/src/data/*.ts`, mirrored from
`crypto/web/src/data/crypto-services.ts`). Edit ONLY the entry your dispatch assigns; keep the
`interface` and the `get…(slug)` helper unchanged. Entry fields: `slug` (do not change), `title`,
`headline`, `metaTitle` (≤60, no brand suffix), `metaDescription` (≤155), `intro`, `stats` (exactly
3 × {value,label}), `challenges` (exactly 4 × {title,body}), `howWeHelp` (exactly 3 × {title,body}),
`faqs` (2+ × {question,answer}). Body strings may contain inline `<a href>` and `<strong>` (see the
crypto entry for the exact style). Every figure matches `house_positions.md`. Replace the infra STUB
content entirely with brief-accurate, HP-verified copy. Run `npx tsc --noEmit` on the file you edit.

## CALCULATORS → `startups-tech/web/src/lib/calculators/tools/<slug>.ts`
Replace the infra STUB with the REAL formula from your calc brief. Every rate anchors to a numbered
HP (do not hardcode a rate the HP does not give). Use the shared `tax2026` lib the infra builder
ported. Add/extend the golden-figure vitest so at least one worked example asserts the exact output.
Run `npx vitest run` on your test. The 4 slugs: `rd-relief-estimator`, `seis-eis-relief-calculator`,
`emi-vs-unapproved-calculator`, `founder-dividend-vs-salary-calculator`.

## RESEARCH asset → `/research/startup-formation-survival-index`
Write the page copy from your brief using ONLY the real Companies House dataset produced by the data
pull (its JSON + `DATA_METHODOLOGY.md` — read them; paths in the brief/handoff). ZERO fabricated
figures. Cite the CH source URLs (HP29) and state the honest methodology/limitation verbatim from the
methodology doc. If a figure you want is not in the dataset, do NOT invent it.

Write ONLY your assigned file(s). Do not run full builds, do not edit config or other sites, do not
touch another worker's file. Report the path(s) written and a 1-line summary.
