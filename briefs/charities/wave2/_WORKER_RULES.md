# Charities wave-2 — shared worker rules

You are writing ONE wave-2 asset for the live UK charity-accountancy site at `charities/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief +
`docs/charities/house_positions.md` before writing. Working brand = **Trustee Finance Partners**
(do NOT hardcode the brand in body copy; write about "the charity", "trustees", "your charity",
"CIC directors". CTA/brand is injected by the page template + site config, never by your content).

Wave 1 shipped the 29-asset launch core (13 blogs, 6 guides, services, /for, 3 calculators).
Wave 2 fills the setup/registration + structures + CIC-funding + governance gaps. Everything in
wave 1 is a live internal-link target; use the real slugs listed in each brief.

## Inputs (read first)
- **Your brief**: `briefs/charities/wave2/<brief>.md` — the spec. Follow the H2 skeleton, BLUF
  spec, figures-map and internal-links exactly.
- **Facts**: `docs/charities/house_positions.md` (27 positions) + `docs/charities/rates_ledger.json`
  — the ONLY source for figures/thresholds/dates. Every figure you state must match a house
  position and link its gov.uk / Charity Commission / charitysorp.org / legislation.gov.uk URL.
  If the brief flags an HP GAP or an OPEN FLAG as uncleared, DO NOT invent a figure: omit it,
  describe qualitatively, or link the searcher to the named verification URL.

## Global quality rules (locked, non-negotiable — unchanged from wave 1)
- **A\* authority bar**: genuinely authoritative, never thin or AI-scammy. Worked examples,
  tables, edge cases the brief names. Quality IS the strategy.
- **BLUF**: open each H2 with a citable 40-60 word answer where the brief says so.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, middle dots (·) only. Hard rule.
- **Faceless authority**: no named experts, no invented ACA/ICAEW/credential claims, no fabricated
  client names, no pricing figures (pricing flows from config, never stated in content).
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure, from
  your brief's House Positions section.
- **England & Wales default.** Flag Scotland/OSCR and Northern Ireland (CCNI) explicitly where the
  brief says; never silently mix jurisdictions.
- **Business audience**: trustees, charity founders and CIC directors. Where the brief flags a
  business-side angle (e.g. company donors, CIC grant applicants), keep it segment-specific.
- **howToSteps**: where the brief marks a section procedural, structure it as an ordered `<ol><li>`
  sequence of discrete, actionable steps (this is the on-page equivalent of HowTo structured data;
  the page template surfaces ordered lists — do not hand-author JSON-LD).

## Internal-link href patterns (all wave-1 targets are LIVE)
- guides (pillars): `/guides/<slug>` — live slugs: `set-up-a-charity-cio`, `cic-complete-guide`,
  `gift-aid-complete-guide`, `charity-vat-guide`, `audit-vs-independent-examination`, `charity-sorp-2026`
- services: `/services/<slug>` — `independent-examination`, `charity-accounts`,
  `charity-bookkeeping`, `gift-aid`, `charity-vat`
- sectors: `/for/<slug>` — `cics`, `social-enterprises`
- calculators: `/calculators/<slug>` — `gift-aid-calculator`, `ie-vs-audit-checker`, `gasds-calculator`
- blogs: `/blog/<category-slug>/<slug>` — category slug is the post's `category` lowercased,
  `&`→`and`, `(),` stripped, spaces→`-`. The 6 category slugs:
  - `Charity Accounts and SORP` → `charity-accounts-and-sorp`
  - `Independent Examination and Audit` → `independent-examination-and-audit`
  - `Gift Aid` → `gift-aid`
  - `Charity VAT` → `charity-vat`
  - `Trustee Compliance` → `trustee-compliance`
  - `CICs and Social Enterprises` → `cics-and-social-enterprises`
  Live wave-1 blog slugs to link to: `cic34-form-guide`, `cic-vs-charity`,
  `charity-commission-annual-return-guide`, `trustees-annual-report-guide`,
  `who-can-do-an-independent-examination`, `what-is-an-independent-examination`,
  `charity-sorp-2026-changes`, `gasds-rules`, `gift-aid-declaration-wording`,
  `charity-trading-subsidiary-gift-aid`, `do-charities-pay-vat`, `can-charities-claim-back-vat`,
  `charity-accounting-software-compared`.

## BLOG posts → `charities/web/content/blog/<slug>.md`
Frontmatter (YAML) then a **RAW HTML** body (loader injects via `dangerouslySetInnerHTML`, NO
markdown conversion). Frontmatter fields:
```
---
title: "Compelling human title"
slug: "<exact-slug>"
date: "2026-07-15"
author: ""
category: "<one of the 6 exact category strings>"
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
**Body is RAW HTML, not markdown.** Use `<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`,
`<table><thead><tr><th>…<tbody><tr><td>`, `<strong>`, `<a href>`. NEVER markdown (`##`, `-`, `**`,
`[]()`, backticks) in the body. Model `charities/web/content/blog/cic34-form-guide.md` (live).

## PILLAR guides → `charities/web/content/guides/<slug>.md`
Frontmatter then RAW HTML body (same no-markdown rule; the table of contents is auto-built from
`<h2>` tags):
```
---
title: "Guide title"
slug: "<exact-slug>"
summary: "One-line summary."
lastReviewed: "2026-07-15"
---
<body>
```
Use `<h2>` for each major section. No `faqs` frontmatter field on guides: put FAQs as an inline
`<h2>Frequently asked questions</h2>` block with `<h3>` questions and `<p>` answers. Model a live
guide, e.g. `charities/web/content/guides/set-up-a-charity-cio.md`.

## MONEY pages (/for/<slug>) → TypeScript data entries
Money pages live in `charities/web/src/data/charity-types.ts` (the `charityTypes` array,
`CharityType` interface). Add ONLY the entry your dispatch assigns; keep the interface and
`getCharityType` helper unchanged. Fields: `slug`, `title`, `headline`, `metaTitle`
(may append " | Trustee Finance Partners"), `metaDescription` (<=155), `intro`, `stats`
(exactly 3 × {value,label}), `challenges` (exactly 4 × {title,body}), `howWeHelp`
(exactly 3 × {title,body}), `faqs` (2+ × {question,answer}). Every figure must match a house
position with an inline gov.uk `<a href>`; no open-flag figures. Model the live `cics` entry.

Write ONLY your assigned file(s). Do not run builds, do not edit config or other sites, do not
touch another worker's file. Report the path(s) written and a 1-line summary.
