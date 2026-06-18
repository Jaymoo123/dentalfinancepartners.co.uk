# Wave 1 writer brief — Trade Tax Specialists (construction-cis)

Issued 2026-06-12 by the wave conductor. Every wave-1 writer reads this in full, then writes exactly ONE page.

## Mandatory reads before writing

1. This brief.
2. `docs/construction-cis/house_positions.md` — HP-LOCKED ground truth. No sentence you write may contradict it. Every figure you quote must come from it.
3. `contractors-ir35/web/content/blog/what-is-ir35.md` — the format reference (frontmatter shape + raw-HTML body style).
4. Your page's row + pre-write note in `docs/construction-cis/SITE_PLAN.md` §7.

## File format (hard rules)

- Output file: `construction-cis/web/content/blog/<slug>.md`
- Frontmatter keys, in this order: `title`, `slug`, `date`, `updatedDate`, `author`, `category`, `metaTitle`, `metaDescription`, `h1`, `summary`, `keyTakeaways` (list of 4-5 strings), `sourcesVerifiedAt`, `schema` (empty string `''`), `faqs` (list of `question`/`answer` pairs).
- `date` and `updatedDate` and `sourcesVerifiedAt`: `'2026-06-12'`. `author`: `Trade Tax Specialists Editorial Team`.
- `category`: exactly one of `CIS Basics`, `CIS Compliance`, `CIS Refunds`, `CIS Advanced`, `VAT and MTD`, `Expenses`, `Limited Company` (as given in your row).
- Body after the closing `---`: **raw HTML only** (`<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<table>`, `<strong>`, `<a>`). NEVER markdown syntax (no `##`, no `**`, no `[]()`). The renderer does not parse markdown.
- **NO em-dashes ("—") anywhere** (frontmatter or body). Use commas, parentheses, full stops, middle dots. This is a deterministic QA gate; one em-dash fails the page.
- metaTitle: max 62 chars, primary keyword front-loaded, no em-dashes. metaDescription: ~150-160 chars, includes the primary keyword naturally.
- British English. UK tax year framing (2026/27 unless the topic is historical).

## Quality bar (gold standard, blocking)

Best-in-niche or it does not ship. That means: data-led structure, at least one HTML table or worked example where numbers are involved, current April-2026 rules covered where relevant, no padding, no AI-scammy listicle voice, no invented statistics, case studies, or client names. The page must read as written by a specialist construction accountant.

Fact guardrails (deterministic gates): AMAP mileage 55p/25p from 6 April 2026 (never 45p). Dividend rates 2026/27: 10.75% / 35.75% / 39.35% (never 8.75%/33.75%). Employer NIC 15% above £5,000 (never 13.8%/£9,100). CIS deductions apply to LABOUR ONLY (materials excluded): state this on every page that discusses deductions. GPS turnover test: £30k sole trader / £30k per partner or £100k partnership / £30k per director or £100k company.

## Internal linking (link audit is a hard gate: only these targets exist)

Core pages: `/` `/services` `/cis-refund` `/gross-payment-status` `/for` `/for/{plumbers,electricians,joiners,groundworkers,roofers,builders,gas-engineers,painters-decorators,scaffolders,civil-engineers}` `/about` `/contact`

Wave-1 blog URLs (pattern `/blog/{category-slug}/{slug}`; category slugs: cis-basics, cis-compliance, cis-refunds, cis-advanced, vat-and-mtd, expenses, limited-company):

| slug | URL |
|---|---|
| what-is-cis | /blog/cis-basics/what-is-cis |
| cis-gross-payment-status-guide | /blog/cis-compliance/cis-gross-payment-status-guide |
| cis-sole-trader-vs-limited-company | /blog/cis-basics/cis-sole-trader-vs-limited-company |
| how-to-register-for-cis | /blog/cis-basics/how-to-register-for-cis |
| cis-deduction-rates-explained | /blog/cis-basics/cis-deduction-rates-explained |
| cis-tax-refund-how-to-claim | /blog/cis-refunds/cis-tax-refund-how-to-claim |
| allowable-expenses-cis-subcontractor | /blog/expenses/allowable-expenses-cis-subcontractor |
| vat-reverse-charge-construction | /blog/vat-and-mtd/vat-reverse-charge-construction |
| cis-limited-company-reclaim | /blog/cis-advanced/cis-limited-company-reclaim |
| cis-monthly-return-guide | /blog/cis-compliance/cis-monthly-return-guide |
| mtd-income-tax-cis | /blog/vat-and-mtd/mtd-income-tax-cis |
| cis-subcontractor-verification | /blog/cis-compliance/cis-subcontractor-verification |
| what-is-a-cis-accountant | /blog/cis-basics/what-is-a-cis-accountant |
| cis-vs-paye | /blog/cis-basics/cis-vs-paye |
| cis-nil-return-explained | /blog/cis-compliance/cis-nil-return-explained |

Rules:
- Link to your row's "primary link target" at least once, in context, with descriptive anchor text.
- Clusters that touch CIS mechanics link UP to `/blog/cis-basics/what-is-cis` instead of restating the full scheme overview.
- 3-6 internal links per page total. Never link to a slug not in this brief. Never link a page to itself.
- Blog pages must not compete with the Tier 1 service pages: informational guides link to `/cis-refund` or `/gross-payment-status` as the CTA, they do not replace them.

## Length guidance

- Pillars (#1, #2, #3): comprehensive, in the weight class of the cfp reference pillar (~2,500-3,500 words incl. 9-10 FAQs).
- Clusters: focused and substantial (~1,400-2,200 words, 5-8 FAQs). #15 cis-nil-return-explained is deliberately short and punchy (~1,000-1,400 words).

## Provenance

Do not add a `generator:` key (matches the cfp wave-1 convention). No git commit. Write the file, then RETURN (raw data): slug, word count, internal links used, the figures you cited from HP, and any HP ambiguity you hit.
