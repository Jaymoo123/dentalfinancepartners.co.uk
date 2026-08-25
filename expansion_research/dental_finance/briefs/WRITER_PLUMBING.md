# Writer plumbing — finance/tax expansion (shared by all 66 body writers)

Read this alongside your cluster brief. The cluster brief gives you the CONTENT
(angle, outline, links, sources, CTA, guardrail, FAQ stems). This file gives you
the SITE PLUMBING (where the file goes, frontmatter contract, category, voice).

## 1. Frontmatter contract (STANDARD_MANIFEST — build FAILS if broken)

Body = **raw HTML** in the .md (no markdown; `<p>`, `<h2>`, `<h3>`, `<ul>`, `<table>`,
`<aside>`, `<strong>`). No Tailwind classes (content/** is not scanned). The blog
template auto-injects a LeadForm at the bottom and auto-emits Article + FAQPage +
Breadcrumb + Organization JSON-LD from frontmatter. **Do NOT** hand-write schema,
do NOT put an FAQ section in the body, do NOT embed a second lead form.

**FILES ARE FLAT.** Every content loader is `readdirSync(dir).filter('.md')`, NON-recursive.
Write the file DIRECTLY into the content dir, NEVER a category subfolder:
`Property/web/content/blog/<slug>.md`, `generalist/web/content/blog/<slug>.md`,
`generalist/web/content/fundamentals/<slug>.md` (generalist pillars only),
`Dentists/web/content/blog/<slug>.md`. A file in a subfolder is invisible and 404s.
The category is a FRONTMATTER field only; the renderer builds the `/blog/<category-slug>/<slug>`
URL from it. Do not put the category in the path.

REQUIRED keys: `slug`, `title`, `date` (YYYY-MM-DD), `category`, `metaDescription`.
Always also set: `author`, `metaTitle`, `h1`, `summary`, `altText`, `image: ""`,
`schema: ''`, `canonical`, `faqs` (10-14 items, each `question` + `answer`).
`faqs` answers = 60-100 words, NO `[n]` citation markers (FAQs have no footnote anchor).

Meta rules: `metaTitle` 40-52 chars, primary keyword in first 30 chars, active voice,
no brand suffix (renderer adds it). `metaDescription` 140-155 chars, lead with a
specific figure/year, primary keyword once, no "Learn/Discover/Everything" opener.

Example frontmatter (generalist blog):
```yaml
---
title: "..."
slug: "the-suggested-slug-from-your-row"
canonical: "https://<domain>/<path>/<slug>"
date: "2026-07-30"
author: "<site author name>"
category: "<REAL category from section 2>"
metaTitle: "..."
metaDescription: "..."
altText: "..."
image: ""
h1: "..."
summary: "..."
schema: ''
faqs:
  - question: "..."
    answer: "..."
---
<h2>...</h2>
<p>...</p>
```

## 2. Per-cluster placement + category + author + domain

Use the REAL category below (NOT the `category` value on the staged row — that is a
staging label). The category slug drives the canonical URL and in-article tool-islands.

### Specialist Tax  (host: property)
- author: `Property Tax Partners Editorial Team` · domain: `https://www.propertytaxpartners.co.uk`
- ALL 15 content pages: dir `Property/web/content/blog/` · category `Property Types & Specialist Tax`
  · canonical `https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/<slug>`
- Lead-form segments: Individual landlord (1-3) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer

### Business Finance  (host: generalist / Holloway Davies)
- author: `Holloway Davies Editorial Team` · domain: `https://www.hollowaydavies.co.uk`
- category for ALL: `Business Finance` (NEW category — being added to taxonomy)
- PILLARS (invoice-finance-guide, asset-finance-guide, business-loans-guide):
  dir `generalist/web/content/fundamentals/` · canonical `https://www.hollowaydavies.co.uk/fundamentals/<slug>`
- clusters + segments: dir `generalist/web/content/blog/` · canonical `.../blog/business-finance/<slug>`
- Lead-form segments: Limited company (PRIMARY — company-gate) / Sole trader / Contractor or freelancer / Partnership or LLP / Just starting out

### Business Exit and Succession  (host: generalist)
- author + domain as generalist above · category for ALL: `Exit and Capital Gains`
- PILLARS (employee-ownership-trust-guide, business-valuation-guide, sell-my-business-guide):
  dir `generalist/web/content/fundamentals/` · canonical `.../fundamentals/<slug>`
- clusters + segments: dir `generalist/web/content/blog/` · canonical `.../blog/exit-and-capital-gains/<slug>`

### Dental Practice Finance  (host: dentists / Dental Finance Partners)
- author: `Dental Finance Partners Editorial Team` · domain: `https://www.dentalfinancepartners.co.uk`
- ALL 8 pages: dir `Dentists/web/content/blog/` (standard blog template, NOT dental-guides)
- category: `how-to-buy-a-dental-practice` = `Buying a Practice`;
  `dental-equipment-and-chair-finance` = `Capital Allowances & Equipment`;
  all others (commercial-mortgage, refinance, squat, working-capital, expansion, 100%) = `Practice Finance`
  · canonical `.../blog/<category-slug>/<slug>` (category-slug: buying-a-practice / capital-allowances-and-equipment / practice-finance)
- Lead-form segments: Associate dentist / Practice owner / Multi-practice group

## 3. Voice + quality (LOCKED estate rules)

- Opus-only A* authoritative. Never thin/flaggable. Every claim genuinely useful.
- NO em-dashes anywhere. Use commas, parentheses, full stops, middle dots (·).
  Also avoid: "in today's", "delve", "leverage", "landscape", "seamless", "tapestry".
- Faceless EEAT: the operator is NOT an accountant. No named-expert claims, no author
  bylines beyond the editorial-team name, no "our chartered team". Authority comes from
  data, HMRC citations, worked examples, anonymised scenarios — never a named person.
- Business audience. Anonymised social proof only, no real client names, no competitor
  firm name-drops (with or without address).
- 1-3 inline `<aside>` CTAs at conversion moments (after a worked example / comparison
  table). They prompt scroll-to-form, they do NOT embed a form.
- Word count: clusters/segments 1,800-3,000; pillars 3,500-5,000 (8-12 H2s).
- 4-7 external authority links (HMRC manuals, legislation.gov.uk, gov.uk, and the
  named sources in your cluster brief). Land on parent paths if unsure of a deep URL.
- Internal links: 3+ per page, root-relative (`/blog/...`, `/fundamentals/...`), drawn
  from your cluster brief's cross-link graph. Root-relative so a later host move is cheap.
  Use the REAL existing slug from the brief; do NOT worry about getting the category
  segment right (`/blog/<category>/<slug>`) - a post-write `normalise_links` pass fixes
  the category prefix automatically from the site's slug map and flags any invented slug.
  So: correct slug = essential; correct category in the URL = auto-fixed. Never invent a
  slug for a page that does not exist - if the brief names a target, use its exact slug.
- 2026/27 tax facts (FA 2026, enacted 18 Mar 2026 unless noted): dividend
  10.75/35.75/39.35%; BADR 18% (6 Apr 2026); employer NI 15% / £5,000; VAT reg £90k;
  EOT CGT 50% chargeable from 26 Nov 2025; CGT residential 18%/24%, AEA £3,000;
  FHL regime abolished April 2025 (FA 2025 Sch 5: 1 Apr 2025 CT / 6 Apr 2025 IT), NOT 2026;
R&D merged scheme 20% RDEC-style + ERIS; SBA 3% straight-line.
  CAPITAL ALLOWANCES (get these exact, they changed):
    · AIA £1m, permanent, unchanged.
    · Full expensing = 100% FYA on new/unused MAIN-rate plant, COMPANIES only, permanent, unchanged.
      50% FYA on new special-rate/integral features, companies, unchanged.
    · NEW 40% FYA from 1 Jan 2026 on new/unused MAIN-rate plant, available to BOTH
      companies AND unincorporated businesses (accruals basis). NOT cars, NOT second-hand.
      (Matters most for unincorporated businesses above the AIA £1m cap, who cannot use
      full expensing; a company will normally still prefer 100% full expensing.)
    · Main-pool WDA reduced 18% -> 14% from 1 Apr 2026 (CT) / 6 Apr 2026 (IT). Hybrid/
      apportioned rate for a chargeable period straddling the change.
    · Special-rate pool WDA 6%, unchanged.
    · Cars: no AIA, no full expensing, no 40% FYA. 100% FYA only for new/unused zero-emission
      cars (extended to 31 Mar 2027 CT / 5 Apr 2027 IT, verify); else main pool 14% or
      special rate 6% by CO2. (See the cars page for the live thresholds.)
- ANTI-SAMENESS: if you are a sector segment page (`...-for-X`, `how-to-sell-a-X`),
  your cluster brief names your ONE distinguishing axis. Build the page AROUND it.
  Do not reuse another sector page's worked example, table, or framing.

## 4. When done
Write the .md to the dir above. Then reply with: slug, path, word count, FAQ count,
internal links count, external authority links count, and one line confirming the
guardrail + de-cannib rule was honoured. Do NOT run the site build (the wave QA does that).
