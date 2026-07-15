# Startups/tech WAVE-2 — shared CONTENT-worker rules

You are writing ONE wave-2 asset for the UK startups / tech / SaaS accountancy site at
`startups-tech/web` (repo root `C:\Users\user\Documents\Accounting`). Working brand **Founder Finance
Partners** — do NOT hardcode the brand in body copy; write about "the site", "we", "your company",
"founders". Brand + CTA are injected by the page template and site config, never by your content.

Wave-2 is ALL blog posts (no new services/calculators/hubs). Follow the wave-1 worker rules
`briefs/startups-tech/wave1/_WORKER_RULES.md` for the blog frontmatter shape and the RAW-HTML body
rule; THIS file adds the wave-2 specifics and overrides on any conflict.

## Inputs (read first, in order)
1. This file.
2. `briefs/startups-tech/wave1/_WORKER_RULES.md` (blog frontmatter + RAW-HTML body rule + global quality rules).
3. **Your brief**: `briefs/startups-tech/wave2/<asset>.md`.
4. **Facts**: `docs/startups-tech/house_positions.md` — the ONLY source for figures/thresholds/dates.
   Every figure maps to a numbered HP and links its gov.uk URL. HP gaps flagged in your brief: do NOT
   invent; describe qualitatively or omit.

## Global quality rules (unchanged, locked)
- A\* authority bar; BLUF 40-60 words on each money/guide H2; NO em-dashes anywhere.
- Faceless authority: no named experts, no ACA/ICAEW claims, no fabricated client names/counts, NO pricing.
- Cite official sources inline as `<a href="https://www.gov.uk/...">` for every figure.
- Body is RAW HTML (`<p>`, `<h2>`, `<h3>`, `<ul><li>`, `<ol><li>`, `<table>...`, `<strong>`, `<a href>`).
  NO markdown syntax in the body.
- No brand in metaTitle (≤60 chars, template appends site name). metaDescription ≤155.

## WAVE-2 assets → slug · category (EXACT string) · category-URL-slug
All are blogs → `startups-tech/web/content/blog/<slug>.md`.

| # | slug | category (EXACT) | route |
|---|---|---|---|
| 1 | `what-is-an-emi-scheme` (PILLAR) | `Share Schemes and EMI` | /blog/share-schemes-and-emi/what-is-an-emi-scheme |
| 2 | `what-is-emi` (SUPPORT) | `Share Schemes and EMI` | /blog/share-schemes-and-emi/what-is-emi |
| 3 | `stock-vesting-explained` | `Share Schemes and EMI` | /blog/share-schemes-and-emi/stock-vesting-explained |
| 4 | `emi-annual-return-ers-walkthrough` | `Share Schemes and EMI` | /blog/share-schemes-and-emi/emi-annual-return-ers-walkthrough |
| 5 | `val231-emi-valuation-form-walkthrough` | `Share Schemes and EMI` | /blog/share-schemes-and-emi/val231-emi-valuation-form-walkthrough |
| 6 | `eis3-certificate-explained` | `SEIS and EIS` | /blog/seis-and-eis/eis3-certificate-explained |
| 7 | `startup-cfo-pay-and-fractional-cfo-cost` | `SaaS and Tech Finance` | /blog/saas-and-tech-finance/startup-cfo-pay-and-fractional-cfo-cost |
| 8 | `saas-revenue-recognition-uk-guide` | `SaaS and Tech Finance` | /blog/saas-and-tech-finance/saas-revenue-recognition-uk-guide |
| 9 | `uk-startup-grants-landscape` | `Startup Compliance` | /blog/startup-compliance/uk-startup-grants-landscape |

Category strings are the SAME 6-string set as wave-1 (see wave-1 rules §"The 6 valid blog categories").
The R&D-category quirk still applies IF you ever set an R&D category: use `Research and Development`
(spelled out), never "R&D Tax Relief" (the ampersand slugifies broken). Wave-2 asset #9 links to the
existing R&D post at `/blog/research-and-development/startup-grants-and-rd-interaction`.

## WAVE-2 specifics (new rules)
- **PILLAR-vs-SUPPORT (#1 and #2)**: `what-is-an-emi-scheme` is the HUB pillar. It SUMMARISES each EMI
  subtopic in 2-4 sentences and LINKS OUT to the existing deep post; it must NOT re-explain any subtopic
  in full (that cannibalises the deep posts). `what-is-emi` is the SHORT (~500-700w) definitional support
  post that funnels UP to the pillar; keep it short, do NOT pad. Both cross-link. The pillar MUST hub-link
  every existing EMI post (qualifying-company, valuation, disqualifying-events, EMI-vs-CSOP, s.431,
  option-pool, growth-shares) plus the two new siblings (stock-vesting, emi-annual-return).
- **Deepening posts (#4 ERS walkthrough, #5 VAL231)**: these DEEPEN existing posts on ONE thing each.
  #4 owns the FILING task; #5 owns the SAV-agreement PROCESS. Do NOT duplicate the existing
  `emi-option-valuation` AMV/UMV explainer, link to it.
- **Follow-on (#6 EIS3)**: follows `seis1-eis1-compliance-statements`; do NOT re-explain the SEIS1/EIS1
  filing, link it. Company-side only, NO investor advice/promotion.
- **#7 CFO-pay is a BLOG, distinct from `/services/fractional-cfo`**: LEARN-intent research post that
  routes to the service page; do NOT restate the service deliverables. Hold the funded/VC-backed wedge,
  never generic-SME CFO drift. Do NOT invent CFO salary/day-rate benchmarks or OUR fee.
- **#8 rev-rec is accounting-STANDARD content**: UK standards are IFRS 15 / FRS 102, NEVER US ASC 606 as
  governing a UK company. Most of the post carries NO HP figure (rev-rec is not an HMRC rate); only the
  VAT touch-point carries HP26. Do NOT attach HP figures to rev-rec mechanics.
- **#9 grants = ONE tight page**: category-level map only. Do NOT list specific grant schemes with
  amounts/eligibility/deadlines (they go stale and are unverifiable); stay category-level + FLAG. Do NOT
  become a generic R&D-tax-credit page (generalist owns those ~37 URLs). Link the R&D-interaction post out.

## VAL231 hard rule (HP14, applies to #1, #4, #5)
The standalone VAL231 form URL 404s. NEVER publish a VAL231 link. Cite the EMI + ERS manual pages
(HP14 sources). Re-verify at build; if still 404, keep citing the manuals only.

## Scope boundaries (unchanged)
- No IR35/off-payroll depth (one-line boundary, defer to Contractor Tax Accountants sibling, HP27).
- No agency/marketing-agency audience content (HP28).
- Scottish income tax: flag ONLY on founder-salary content (#7 touches salary lightly; flag if bands are
  stated), never on CGT/CT content.

## Internal links (plain anchors ok if a sibling is not built yet)
Services `/services/<slug>` · hubs `/for/<slug>` · calculators `/calculators/<slug>` ·
research `/research/<slug>` · blogs `/blog/<category-slug>/<slug>` (category lowercased, spaces → dashes,
"and" stays "and"). Use the exact targets named in your brief.

Write ONLY your assigned file. Do not run full builds, do not edit config or other sites, do not touch
another worker's file. Report the path written and a 1-line summary.
