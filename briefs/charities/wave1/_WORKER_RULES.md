# Charities launch-core — shared worker rules

You are writing ONE launch-core asset for a new UK charity-accountancy site at `charities/web`
(repo root `C:\Users\user\Documents\Accounting`). Read this file + your assigned brief + the
facts source before writing. Site working brand = **Trustee Tax** (do NOT hardcode
the brand name in body copy; write about "the charity", "trustees", "your charity". CTA/brand is
injected by the page template and site config, not by your content file).

## Inputs (read first)
- **Your brief**: `briefs/charities/wave1/<brief>.md` — the spec: target queries, required H2
  structure, competitors to beat, house positions to cite, hallucination danger zones. Follow it.
- **Facts**: `docs/charities/house_positions.md` — the ONLY source for figures/thresholds/dates.
  Every figure you state must match a house position and link its gov.uk URL. If the brief flags
  an HP gap or open flag as uncleared, DO NOT invent a figure: omit it or describe qualitatively.

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin or AI-scammy. Worked examples, tables,
  edge cases the brief names. This quality IS the strategy.
- **BLUF**: where the brief says answer-box/BLUF, open each H2 with a citable 40-60 word answer.
- **NO em-dashes anywhere.** Use commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no invented credentials/ACA/ICAEW claims, no fabricated
  client names, no pricing figures (pricing flows from config, never stated in content).
- **Cite official sources inline** as `<a href="https://www.gov.uk/...">` for every figure, taken
  from your brief's House Positions section. charitysorp.org / legislation.gov.uk where the HP uses them.
- **England & Wales default.** Flag Scotland/OSCR and Northern Ireland explicitly where the brief
  says; never silently mix jurisdictions.
- **Internal links** to sibling launch-core assets, using these href patterns (plain anchors, fine
  if the sibling is not built yet):
  - pillars/guides: `/guides/<slug>` (e.g. `/guides/gift-aid-complete-guide`)
  - service pages: `/services/<slug>` (independent-examination, charity-accounts, charity-bookkeeping, gift-aid, charity-vat)
  - sector pages: `/for/<slug>` (cics, social-enterprises)
  - calculators: `/calculators/<slug>`
  - blogs: `/blog/<category-slugified>/<slug>` (category lowercased, spaces to dashes, "and"→"and")
  Use the specific internal-link targets named in your brief's internal-links section.

## BLOG posts → `charities/web/content/blog/<slug>.md`
Frontmatter (YAML), then a **RAW HTML** body:
```
---
title: "Compelling human title"
slug: "<exact-slug>"
date: "2026-07-14"
author: ""
category: "<one of the 6 categories below, exact string>"
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
**The 6 valid categories (use the exact string):** `Charity Accounts and SORP` ·
`Independent Examination and Audit` · `Gift Aid` · `Charity VAT` · `Trustee Compliance` ·
`CICs and Social Enterprises`.

**CRITICAL — body is RAW HTML, not markdown.** The loader injects the body via
`dangerouslySetInnerHTML` with NO markdown conversion. Use `<p>`, `<h2>`, `<h3>`, `<ul><li>`,
`<ol><li>`, `<table><thead><tr><th>…<tbody><tr><td>`, `<strong>`, `<a href>`. Do NOT use markdown
syntax (`##`, `-`, `**`, `[]()`, backticks) anywhere in the body; it renders as literal text.
Model the exact style of the existing post `charities/web/content/blog/what-is-an-independent-examination.md`.

## PILLAR guides → `charities/web/content/guides/<slug>.md`
Frontmatter then a **RAW HTML** body (the guides loader injects the body with NO markdown
conversion, exactly like the blog loader; the table of contents is built by parsing `<h2>` tags):
```
---
title: "Guide title"
slug: "<exact-slug>"
summary: "One-line summary."
lastReviewed: "2026-07-14"
---
<body>
```
Body is RAW HTML only (`<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>`, `<strong>`,
`<a href>`). Do NOT use markdown syntax. Use `<h2>` for each major section so the auto table of
contents populates. There is no `faqs` frontmatter field on guides: put the FAQ as an inline
`<h2>Frequently asked questions</h2>` block with `<h3>` questions and `<p>` answers. Model the
raw-HTML style of `charities/web/content/guides/example-guide.md` and the blog posts.

## MONEY pages (services / for) → TypeScript data entries
These live in shared data files. Edit ONLY the entries your dispatch assigns; keep the existing
`interface` and the `getCharityService`/`getCharityType` helper unchanged. Each entry fields:
`slug` (do not change), `title`, `headline`, `metaTitle` (may include " | Trustee Tax"),
`metaDescription` (<=155 chars), `intro`, `stats` (exactly 3 × {value,label}), `challenges`
(exactly 4 × {title,body}), `howWeHelp` (exactly 3 × {title,body}), `faqs` (2+ × {question,answer}).
Every figure in an entry must match `docs/charities/house_positions.md` and be safe to state (no
open-flag figures). Replace the existing draft entry content with brief-accurate, HP-verified copy.

Write ONLY your assigned file(s). Do not run builds, do not edit config or other sites, do not
touch another worker's file. Report the path(s) written and a 1-line summary.
