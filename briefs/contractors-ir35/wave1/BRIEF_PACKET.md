# Wave 1 brief packet, contractors-ir35 (Contractor Finance Partners)

Read this whole file, then read `docs/contractors-ir35/house_positions.md` IN FULL before writing a word. The house positions document is the ONLY factual source for rates, thresholds, statutes and framings. Do NOT use web research. Do NOT rely on your training data for any figure; if house_positions does not cover a fact you need, write around it or flag it in an HTML comment at the end of the body (`<!-- FLAG: ... -->`), never guess.

## The site

UK contractor accountancy specialist (IR35 / off-payroll / PSC directors). Audience: UK limited-company contractors, umbrella workers, agency/client-side readers. Tax year 2026/27 unless date-banded; rUK bands. Quality bar: best-in-niche, genuinely authoritative, written by a specialist for real readers. The SERP is all specialists; generic filler fails.

## File format (mirror exactly)

Write a single `.md` file at `contractors-ir35/web/content/blog/<slug>.md` with YAML frontmatter then an HTML body. Fields, all required:

YAML discipline (added after wave-1 finding): DOUBLE-QUOTE every scalar value that contains a colon, apostrophe or other YAML-significant character (titles, metaTitle, summary, keyTakeaways items, FAQ questions and answers). `title: Outside IR35: How to...` is INVALID YAML and breaks the build; `title: "Outside IR35: How to..."` is correct.

```
---
title: "<Title Case, the working title from your assignment, refine freely within the same intent>"
slug: <assigned slug, do not change>
date: '2026-06-12'
updatedDate: '2026-06-12'
author: Contractor Finance Partners Editorial Team
category: <assigned category, exactly as given>
metaTitle: <max 62 chars, include the primary keyword>
metaDescription: <max 158 chars, concrete and specific>
h1: <usually = title>
summary: <2-3 sentence standfirst>
keyTakeaways:
  - "<4-6 takeaways, each a complete sentence with a concrete fact>"
sourcesVerifiedAt: '2026-06-12'
schema: ''
faqs:
- question: <q>
  answer: <complete, self-contained answer, 60-120 words>
---
```

- 10 to 14 FAQs for pillar pages, 6 to 10 for cluster pages.
- Body AFTER the frontmatter: raw semantic HTML only (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<strong>`, `<a>`, plus `<em>` for case names only). NO markdown syntax in the body, NO utility CSS classes, NO inline styles. H2/H3 headings in sentence case.
- Word counts (body only): pillar 3,500 to 4,500 words; cluster 2,800 to 3,500 words.

## Hard rules (any violation = the draft fails)

1. NO em-dashes (—) and NO en-dashes (–) anywhere, frontmatter included. Use commas, parentheses, full stops. Ranges: "£50,000 to £250,000", never "£50,000–£250,000".
2. Every figure/statute must match house_positions exactly, with its date band where HP gives one (e.g. dividend rates 10.75%/35.75%/39.35% tagged 2026/27). Follow each section's "Practical writing rule".
3. Respect the per-section DO-NOTs in house_positions (e.g. never present CEST "outside" as a guarantee; never publish a universal "optimal salary"; never apply the 5% allowance to Chapter 10).
4. Banned openers: "For contractors", "If you're a contractor", "As a contractor". Banned filler: "In today's", "navigate the complexities", "it's important to note", "delve", "landscape", "ever-evolving", "game-changer", "unlock", "seamless".
5. UK English. No first-person-singular. The firm is "we" sparingly; this is editorial, not sales copy. One soft CTA paragraph at the end linking to /ir35-status or /services is the only promotional content.
6. Internal links: 4 to 8 per page, ONLY from this allowlist:
   - Core: `/services`, `/ir35-status`, `/contact`, `/for` and `/for/<type>` (it-contractors, engineering-contractors, finance-contractors, management-consultants, project-managers, nhs-locum-doctors, oil-and-gas-contractors, legal-contractors, marketing-contractors, construction-contractors)
   - Wave-1 siblings via `/blog/<category-slug>/<slug>`, category slugs: IR35 Status → `ir35-status`, Limited Company Tax → `limited-company-tax`, Umbrella vs Limited Company → `umbrella-vs-limited-company`, Expenses and Deductions → `expenses-and-deductions`, Pension and Dividends → `pension-and-dividends`, MTD and Compliance → `mtd-and-compliance`, Contractor Accounting Basics → `contractor-accounting-basics`
   - Wave-1 sibling slugs: what-is-ir35 (IR35 Status), inside-ir35 (IR35 Status), outside-ir35 (IR35 Status), limited-company-vs-umbrella-contractor (Umbrella vs Limited Company), psc-limited-company-contractor-tax (Limited Company Tax), contractor-expenses-allowable-guide (Expenses and Deductions), contractor-pension-employer-contributions (Pension and Dividends), how-to-choose-contractor-accountant (Contractor Accounting Basics), off-payroll-working-rules-private-sector (IR35 Status), sds-status-determination-statement (IR35 Status), ir35-small-company-exemption (IR35 Status), flat-rate-vat-limited-cost-trader (MTD and Compliance), travel-expenses-inside-ir35 (Expenses and Deductions), umbrella-company-holiday-pay (Umbrella vs Limited Company), contractor-pension-carry-forward (Pension and Dividends)
7. Page boundaries (do not restate a sibling's core ground beyond a linking paragraph):
   - `what-is-ir35`: what IR35 is, Ch.8 vs Ch.10, the three tests at overview depth, who determines. The flagship.
   - `inside-ir35`: consequences when caught: deemed payment, take-home impact, umbrella option, what you can still claim.
   - `outside-ir35`: protecting status: working practices, substitution, contract review, evidence.
   - `off-payroll-working-rules-private-sector`: the 2021 reform mechanics: SDS chain, fee-payer, debt transfer, set-off.
8. Voice: confident specialist, plain English, short paragraphs (2-4 sentences), concrete worked examples with 2026/27 figures where HP supports them. Hooks the audience responds to: a £ figure, a legislation change, a deadline, a rate with its year.

## Self-check before you finish (all must pass)

- 0 em-dashes / en-dashes (search the file for both characters)
- Body is pure HTML, no markdown, no CSS classes
- metaTitle ≤ 62 chars; metaDescription ≤ 158 chars
- FAQ count within range; every faqs entry has question + answer
- Every internal link is on the allowlist with the correct category path
- Word count in range (body only)
- Every figure cross-checked against house_positions one final time
