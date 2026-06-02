# Page improvement brief: cgt-annual-exempt-amount-3000-allowance-2026-27

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27
- **Source file**: `Property/web/content/blog/cgt-annual-exempt-amount-3000-allowance-2026-27.md`
- **Primary query**: `uk capital gains tax annual exempt amount 2026`
- **Current avg position**: 8.3
- **Priority score**: 6.9 / 10
- **Current word count**: 1441
- **Competitor avg word count**: 1069
- **Current section count**: 10
- **Competitor avg section count**: 6
- **Current FAQ count (parsed, may be wrong)**: 0
- **Competitor avg FAQ count (parsed, may be wrong)**: 0

> ⚠️ The FAQ counts above come from a parser that does not recognise `<dl>/<dt>/<dd>` patterns or all JSON-LD schema variations. **Read the source file frontmatter to see actual FAQ count, then plan to expand to 10-14.**

## GSC query data (last 90 days)

This is the ground truth on what queries the page currently surfaces for. Use this to inform:
- Meta title (lead with the highest-impression query word order)
- Meta description (specific differentiators that beat competing SERP results)
- FAQ questions (target the queries with impressions but no clicks)

| Impressions | Clicks | Avg Pos | CTR | Query |
|---:|---:|---:|---:|---|
| 6 | 0 | 5.9 | 0.00% | gov.uk capital gains tax annual exempt amount 2026 2027 £3000 |
| 6 | 0 | 8.3 | 0.00% | uk capital gains tax annual exempt amount 2026 |
| 5 | 0 | 4.5 | 0.00% | uk cgt annual exempt amount 2026 |
| 3 | 0 | 5.8 | 0.00% | hmrc capital gains tax annual exempt amount 2026 2027 |
| 3 | 0 | 3.0 | 0.00% | uk capital gains tax annual exempt amount 2025 2026 3000 |
| 2 | 0 | 4.0 | 0.00% | current uk cgt annual exempt amount 2026 |
| 2 | 0 | 3.0 | 0.00% | gov.uk capital gains tax annual exempt amount 2026 3000 |
| 2 | 0 | 10.0 | 0.00% | hmrc capital gains tax annual exempt amount 2025 2026 £3000 |
| 2 | 0 | 6.5 | 0.00% | gov.uk capital gains tax annual exempt amount 2026 2027 £3,000 |
| 1 | 0 | 8.0 | 0.00% | gov.uk capital gains tax annual exempt amount 2026 2027 |
| 1 | 0 | 4.0 | 0.00% | gov.uk annual exempt amount capital gains tax 3000 2025 2026 |
| 1 | 0 | 6.0 | 0.00% | gov.uk annual exempt amount capital gains tax 2025 2026 3000 |
| 1 | 0 | 9.0 | 0.00% | uk capital gains tax annual exempt amount 2026 2027 hmrc |
| 1 | 0 | 7.0 | 0.00% | gov.uk capital gains tax annual exempt amount 2026 2027 individuals |
| 1 | 0 | 7.0 | 0.00% | hmrc capital gains tax annual exempt amount 2026 2027 official |
| 1 | 0 | 8.0 | 0.00% | uk capital gains tax annual exempt amount 2026 hmrc |
| 1 | 0 | 5.0 | 0.00% | gov uk capital gains tax annual exempt amount 2026 2027 |
| 1 | 0 | 9.0 | 0.00% | uk capital gains tax annual exempt amount 2026 2027 shares hmrc |
| 1 | 0 | 12.0 | 0.00% | gov.uk capital gains tax annual exempt amount 2026 2027 uk |
| 1 | 0 | 6.0 | 0.00% | hmrc annual exempt amount 2025 2026 capital gains tax 3000 |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/guidance/capital-gains-tax-rates-and-allowances _(parsed: 1445 words, 5 sections)_
- https://www.hl.co.uk/tools/calculators/capital-gains-tax-calculator _(parsed: 1165 words, 9 sections)_
- https://www.gov.uk/capital-gains-tax/rates _(parsed: 597 words, 3 sections)_

```python
# Fetch and inspect competitor:
from optimisation_engine.competitor._fetch import fetch_url
from bs4 import BeautifulSoup
status, html = fetch_url('<url>')
soup = BeautifulSoup(html, 'lxml')
print(f'H2s: {[h.get_text() for h in soup.find_all("h2")]}')
print(f'FAQ schema present: {"FAQPage" in html}')
```

## DeepSeek topic gaps

- **[HIGH] CGT rates for basic rate vs higher rate taxpayers from 6 April 2026** — Competitor 1 explicitly states rates: 18% for basic rate, 24% for higher rate from 6 April 2026. Our page mentions rates but does not clearly separate by income tax band with the specific 2026 rates.
- **[MEDIUM] Trustees, personal representatives, and business rates** — Competitor 1 has a dedicated H2 'If you’re a trustee, personal representative or business' with 24% rate from 6 April 2026. Our page lacks this specific section.
- **[MEDIUM] Annual exempt amount limits for previous years (e.g., £6,000, £12,300)** — Competitor 2 includes a table showing historical annual exempt amounts (£3,000, £1,500, £6,000, £12,300). Our page only mentions current £3,000.
- **[LOW] Qualifying new residents from 6 April 2025** — Competitor 2 has a dedicated H2 'If you’re a qualifying new resident from 6 April 2025' with 4-year rule. Our page does not cover this.

## DeepSeek query gaps (keyword density)

- `rates`: us 0× vs competitors avg 2.7×
- `2026`: us 7× vs competitors avg 8.7×

## DeepSeek structural gaps

- Missing a table comparing annual exempt amounts across tax years
- Missing a clear breakdown of CGT rates by income tax band (basic vs higher) for 2026
- Missing a section on trustees/personal representatives rates
- Missing a section on qualifying new residents
- missing stats or social proof block
- no last-updated date

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials
- No references to official HMRC sources or links to GOV.UK
- No date of last update or review
- No mention of professional qualifications or regulatory body

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27
Query: "uk capital gains tax annual exempt amount 2026"
Position: 8.3 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing explicit CGT rates by income tax band for 2026/27. Competitors clearly state: basic rate taxpayers pay 18% on residential property gains, higher rate taxpayers pay 24% from 6 April 2026. Our page mentions rates vaguely but does not separate by band. Add a dedicated H2: "CGT Rates for 2026/27: Basic Rate vs Higher Rate Taxpayers" with a table showing: Basic rate (18% residential property, 10% other assets), Higher rate (24% residential property, 20% other assets). Include a worked example: "If you are a basic rate taxpayer with a gain of £5,000 after the £3,000 allowance, CGT = £5,000 × 18% = £900."

2. [HIGH] Missing historical annual exempt amount table. Competitor 2 includes a table showing: 2026/27: £3,000, 2025/26: £3,000, 2024/25: £3,000, 2023/24: £6,000, 2022/23: £12,300. Add a new H2: "Historical Annual Exempt Amounts: 2022–2027" with a 3-column table (Tax Year, Annual Exempt Amount, Change from Previous Year). This signals authority and helps with "history of CGT allowance" queries.

3. [MEDIUM] Missing section on trustees and personal representatives. Competitor 1 has a dedicated H2 "If you’re a trustee, personal representative or business" stating the rate is 24% from 6 April 2026. Add a new H2: "Trustees, Personal Representatives and Business Assets" with text: "From 6 April 2026, trustees and personal representatives pay CGT at 24% on residential property gains. For business assets, the rate remains 20%." Include a note that the annual exempt amount for most trustees is £1,500 (half the individual rate).

4. [MEDIUM] Missing section on qualifying new residents from 6 April 2025. Competitor 2 covers this with a 4-year rule. Add a new H2: "Qualifying New Residents: The 4-Year CGT Rule" with text: "If you became a UK resident from 6 April 2025 and were non-resident for the previous 10 years, you may be eligible for a 4-year exemption on foreign gains. This does not apply to UK residential property gains."

5. [LOW] Missing a "last updated" date and author byline. Add "Last updated: [current month year]" immediately below the H1. Add an author byline: "By [Name], Senior Tax Adviser at Property Tax Partners" with a 1-sentence bio: "[Name] is a Chartered Tax Adviser with 15+ years of experience in UK capital gains tax planning."

6. [LOW] Missing internal links to related CGT pages. Add 2-3 contextual internal links: e.g., "For more on CGT on property sales, see our guide: /blog/capital-gains-tax/cgt-on-property" and "For principal private residence relief, see: /blog/capital-gains-tax/principal-private-residence-relief".

TITLE/META:
Current title: CGT Annual Exempt Amount 2026: £3,000 Allowance Guide | Property Tax Partners
Suggested title: CGT Annual Exempt Amount 2026: £3,000 Allowance & Rates Guide (60 chars)
Suggested meta description: CGT annual exempt amount 2026 is £3,000. See 2026/27 rates for basic vs higher rate taxpayers, historical allowances, and planning strategies. Updated for 2026. (155 chars)

E-E-A-T:
- Add author byline: "By [Name], Chartered Tax Adviser (CTA)" with link to author bio page
- Add 2-3 links to GOV.UK: e.g., "For official rates, see GOV.UK: Capital Gains Tax rates and allowances" (https://www.gov.uk/capital-gains-tax/rates)
- Add a "Last reviewed: [month year]" date stamp
- Add a "Disclaimer: This guide is for informational purposes. Consult a qualified tax adviser for your specific circumstances." at the bottom
- Add a trust signal: "Property Tax Partners is regulated by the Association of Accounting Technicians (AAT) for tax advisory services."

WORD COUNT: Current 1,441. Target: 1,800–2,200 (competitor average 1,069 but we need more depth to rank top 3).

FAQ ADDITIONS:
Add a new H2: "Frequently Asked Questions" with these exact Q&As:

1. "What is the CGT annual exempt amount for 2026/27?"
Answer: The annual exempt amount for 2026/27 is £3,000 for individuals. This is unchanged from 2025/26. It was reduced from £6,000 in 2024/25 and from £12,300 in 2023/24.

2. "What are the CGT rates for 2026/27?"
Answer: From 6 April 2026, basic rate taxpayers pay 18% on residential property gains and 10% on other assets. Higher rate taxpayers pay 24% on residential property gains and 20% on other assets. Trustees and personal representatives pay 24% on residential property gains.

3. "Can I carry forward unused CGT allowance?"
Answer: No. The CGT annual exempt amount is use-it-or-lose-it. You cannot carry forward unused allowance to future tax years. This is why tax-loss harvesting and timing disposals is important.

4. "What was the CGT allowance in previous years?"
Answer: 2026/27: £3,000, 2025/26: £3,000, 2024/25: £3,000, 2023/24: £6,000, 2022/23: £12,300. The allowance has been significantly reduced from £12,300 in 2022/23 to £3,000 from 2024/25 onwards.

5. "Does the £3,000 allowance apply to couples?"
Answer: Yes, each individual has their own £3,000 allowance. Married couples and civil partners can transfer assets between each other tax-free to utilise both allowances, effectively allowing £6,000 of gains tax-free per couple.

SCHEMA:
Add FAQ schema (JSON-LD) for the 5 FAQ questions above. Use "FAQPage" schema type. Also add "Article" schema with author name, datePublished, dateModified, and publisher (Property Tax Partners).
```

> The above is DeepSeek's brief. Treat as a starting point. **Verify every claim against the actual live competitor pages before transcribing figures or section ideas into our content.**

## Cannibalisation context

Pillar pages already exist for these topics. When this page touches one of them, write the **applied / local / scenario-flavoured** version, not the comprehensive theoretical version. Link out to the pillar guide rather than duplicating.

- **Section 24** → `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide`
- **BTL limited company** → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`
- **MTD for landlords** → `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline`
- **CGT on UK property** → `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`

Before writing, run this to check no pillar competes for our target queries:

```bash
cd C:/Users/user/Documents/Accounting && python -c "
from optimisation_engine.competitor._db import _sql
for url in [<pillar paths from above>]:
    rows = _sql(f\"\"\"SELECT query, SUM(impressions) AS i FROM gsc_query_data
                       WHERE site_key='property' AND page_url='https://www.propertytaxpartners.co.uk{url}'
                       AND date >= CURRENT_DATE - 90 GROUP BY query HAVING SUM(impressions) > 2 ORDER BY i DESC LIMIT 5\"\"\")
    print(url, rows)
"
```

## External authority links to favour

Reach for these when adding citations. Land on parent paths if unsure of specific URLs (better to under-promise than 404).

- [HMRC Property Income Manual](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [gov.uk MTD for ITSA sign-up checker](https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax)
- [legislation.gov.uk ITTOIA 2005](https://www.legislation.gov.uk/ukpga/2005/5)
- [HMRC CGT on UK property service](https://www.gov.uk/report-and-pay-your-capital-gains-tax)
- [HMRC Capital Gains Manual](https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual)
- [HMRC Property Rental Toolkit](https://www.gov.uk/government/publications/hmrc-property-rental-toolkit)

## Site context (`property`)

- **Audience**: UK landlords, buy-to-let investors, property developers
- **Lead form segments**: Individual landlord (1-3 properties), Portfolio owner (4-10 properties), Large portfolio (10+ properties), Property developer
- **Web root**: `Property/web`
- **Content dir**: `Property/web/content/blog`
- **Domain**: `https://www.propertytaxpartners.co.uk`


## Universal site rules (do not skip)

### Voice
- **No em-dashes.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Brand voice: practical, specific, "no hard sell". Use exact figures and named legislation, not vague hedges.
- Anonymised social proof only. No real client names anywhere.

### Lead-gen architecture
- The blog template (`src/components/blog/BlogPostRenderer.tsx`) **automatically injects a `LeadForm` at the bottom** of every post. **Never duplicate this in body content.**
- Add 1-3 inline CTAs in the body at high-intent moments (after worked examples, after comparison tables, after the "what to expect" section). These should drive scroll-to-form, not embed a duplicate form.
- Content should pre-sell the form: worked examples, HMRC citations, local data, anonymised case studies.
- Match the form's role segments (1-3 props / 4-10 / 10+ / developer) by addressing each in the content where relevant.

### CSS / styling in markdown content
- **Tailwind utility classes do NOT work in markdown body content** because Tailwind v4 scans `src/**` only, not `content/**`.
- Use semantic HTML: `<aside>...</aside>`, `<table>...</table>`, `<ul>...</ul>`, `<strong>`.
- The `.prose-blog` CSS in `src/app/globals.css` styles all of these automatically with the property brand (emerald accent, slate text, hand-rolled table styling, callout asides).
- Inline CTA pattern:
```html
<aside>
<p>Headline that signals conversion moment</p>
<p>Body copy that prompts scroll-to-form below.</p>
</aside>
```
- Tables: just `<table><thead><tr><th>...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`. No classes needed.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array (`question` + `answer`).
- The template auto-emits FAQPage JSON-LD from the frontmatter via `buildBlogPostingJsonLd`. **Do NOT manually add FAQ schema to the body.**
- Article + BreadcrumbList + Organization schema also auto-emitted.
- Target 10-14 FAQs covering: DeepSeek-surfaced gaps + GSC query demand + competitor FAQ patterns + lead-form qualifier questions (segment-specific).

### Cannibalisation
- Pillar pages exist for the main concepts (Section 24, BTL limited company, MTD, CGT). When this page touches one of those topics, write the **applied / local / scenario-flavoured** version, not the comprehensive theoretical version. Link out to the pillar guide.
- Do not duplicate worked examples verbatim across pages. Differ figures, scenarios, or angles.

### Quality bar (acceptance criteria)
- Word count: roughly competitor average (typically 2,500-3,500)
- FAQs: 10-14
- New external authority links: 4-7 (HMRC manuals, legislation.gov.uk, gov.uk)
- 1-3 inline `<aside>` CTAs at conversion moments
- Build passes: `cd <web-root> && npm run build`
- FAQ schema count in built HTML matches frontmatter count (verify with grep)
- No em-dashes anywhere in body or FAQs
- No Tailwind classes anywhere in the markdown file
- Internal links to relevant pillar pages



## Workflow (do in order)

1. **Read the source file** at the path listed under "Source file" below.
2. **Pull GSC data** for the page (see "GSC data" section below — already populated for you).
3. **Fetch each competitor URL** and read what they actually have. Verify DeepSeek's claims by hand. Bad input data = bad output content.
   ```python
   from optimisation_engine.competitor._fetch import fetch_url
   from bs4 import BeautifulSoup
   status, html = fetch_url('<competitor-url>')
   # inspect headings, FAQs, word count, key data points
   ```
4. **Write the rewrite**:
   - Keep the frontmatter structure (title, slug, canonical, date, author, category, altText, image, h1, summary, schema, faqs).
   - Rewrite metaTitle and metaDescription using GSC query data (lead with the highest-impression query word order).
   - Rewrite the body for depth, specificity, and conversion. Use semantic HTML.
   - Expand FAQs to 10-14, frontmatter `faqs:` array.
5. **Run the build**: `cd <web-root> && npm run build`. Confirm it passes with no new warnings.
6. **Verify FAQ schema count**: grep the built HTML to confirm FAQ count matches frontmatter:
   ```bash
   grep -c '"@type":"Question"' <web-root>/.next/server/app/blog/<category>/<slug>.html
   ```
7. **Report back** with: word count before/after, FAQ count, new external links added, summary of changes.


## Final commands you will run

```bash
# Read the source file
# (use Read tool)

# Build to verify
cd C:/Users/user/Documents/Accounting/Property/web && npm run build

# Verify FAQ schema count matches frontmatter
grep -c '"@type":"Question"' .next/server/app/blog/<category>/<slug>.html

# When done, report back: word count before/after, FAQ count, links added, summary
```

## When you're done

Reply with this exact summary block so the orchestrator can confirm the page is ready:

```
PAGE: cgt-annual-exempt-amount-3000-allowance-2026-27
STATUS: complete
WORD_COUNT_BEFORE: 1441
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
