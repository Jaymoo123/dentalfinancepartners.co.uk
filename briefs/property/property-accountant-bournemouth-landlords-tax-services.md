# Page improvement brief: property-accountant-bournemouth-landlords-tax-services

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-bournemouth-landlords-tax-services
- **Source file**: `Property/web/content/blog/property-accountant-bournemouth-landlords-tax-services.md`
- **Primary query**: `property tax advice`
- **Current avg position**: 31.7
- **Priority score**: 4.7 / 10
- **Current word count**: 1759
- **Competitor avg word count**: 511
- **Current section count**: 11
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
| 4 | 0 | 31.7 | 0.00% | property tax advice |
| 2 | 0 | 12.0 | 0.00% | accountant for landlord bournemouth |
| 2 | 0 | 17.5 | 0.00% | accountant for landlord |
| 2 | 0 | 37.5 | 0.00% | accountant for landlord dorset |
| 2 | 0 | 9.0 | 0.00% | property tax accountants bournemouth |
| 2 | 0 | 16.5 | 0.00% | accountants for landlords |
| 2 | 0 | 8.0 | 0.00% | landlord tax bournemouth |
| 2 | 0 | 17.5 | 0.00% | property tax accountants |
| 1 | 0 | 6.0 | 0.00% | accountant rental property |
| 1 | 0 | 32.0 | 0.00% | accountants for buy to let landlords |
| 1 | 0 | 5.0 | 0.00% | property accountant |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.rkacc.co.uk/property-tax _(parsed: 524 words, 5 sections)_
- https://www.nrla.org.uk/services/tax _(parsed: 498 words, 6 sections)_

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

- **[HIGH] Comparison of limited company vs sole trader for property tax** — Competitor 2 has a dedicated H2 'Ltd vs Sole Trader Property Tax Comparison' with bullet points on buy-to-let, capital allowances, and mortgage interest relief. Our page lacks any direct comparison.
- **[MEDIUM] Specific tax software/tools for landlords (e.g., Taxd, Anna Money, Tide, GetGround)** — Competitor 1 lists multiple tools with pricing (e.g., GetGround £48) and features. Our page only mentions MTD compliance generically.
- **[HIGH] Capital Gains Tax planning details for property** — Competitor 2 has a dedicated H2 'Capital Gains Tax' with specific services like principal private residence relief, letting relief, and rollover relief. Our page mentions CGT but lacks specific reliefs and examples.
- **[MEDIUM] Section 24 mortgage interest relief restriction and incorporation strategies** — Our page has an H2 'Navigating Section 24 and Incorporation Strategies' but does not provide specific figures or examples of how incorporation saves tax. Competitors do not cover this explicitly, but it's a key topic for landlords.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with actual questions and answers (our FAQ heading has no content)
- No comparison table or side-by-side analysis (e.g., Ltd vs Sole Trader)
- No list of specific tax reliefs or allowances with examples
- No call-to-action with specific next steps or contact form
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials (e.g., 'Written by a Chartered Accountant')
- No client testimonials or case studies
- No links to authoritative sources (e.g., HMRC guidelines)
- No mention of professional memberships (e.g., ACCA, ICAEW)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-accountant-services/property-accountant-bournemouth-landlords-tax-services
Query: "property tax advice"
Position: 31.7 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing direct comparison of limited company vs sole trader for property tax. Competitor 2 has a dedicated H2 'Ltd vs Sole Trader Property Tax Comparison' with bullet points on buy-to-let, capital allowances, and mortgage interest relief. Add a new H2: "Limited Company vs Sole Trader: Property Tax Comparison for Bournemouth Landlords" with a table comparing: mortgage interest relief (full vs restricted to 20%), corporation tax rate (25% vs income tax 20/40/45%), capital gains tax on sale (25% vs 18/24%), and administrative costs. Include a worked example: "For a Bournemouth landlord with £50,000 rental profit and £20,000 mortgage interest, a limited company saves £4,000 in tax annually vs higher-rate sole trader."

2. [HIGH] Missing specific Capital Gains Tax reliefs and examples. Competitor 2 has a dedicated H2 'Capital Gains Tax' with services like principal private residence relief, letting relief, and rollover relief. Add a new H2: "Capital Gains Tax Reliefs for Bournemouth Property Sales" with bullet points on: Principal Private Residence Relief (full exemption if lived in), Letting Relief (up to £40,000 per owner), Rollover Relief (defer CGT if reinvest in new property), and Business Asset Disposal Relief (10% rate, lifetime limit £1m). Include a numerical example: "Sell a Bournemouth rental property for £350,000, bought for £200,000. Gain £150,000. After annual exemption (£6,000 from 2024/25), taxable gain £144,000. CGT at 24% = £34,560. With Letting Relief (£40,000), taxable gain £104,000, CGT = £24,960 — saving £9,600."

3. [HIGH] Missing specific Section 24 mortgage interest relief restriction figures and incorporation savings. Our page has an H2 but no numbers. Add a new H2: "How Section 24 Affects Bournemouth Landlords: Incorporation Savings Example" with a worked example: "Sole trader: rental income £60,000, mortgage interest £25,000. Taxable profit £60,000 (no interest deduction). Tax at 40% = £24,000. Limited company: rental income £60,000, mortgage interest £25,000 (deductible). Corporation tax at 25% on £35,000 = £8,750. Total tax saving: £15,250 per year."

4. [MEDIUM] Missing specific tax software/tools for landlords. Competitor 1 lists multiple tools with pricing (e.g., GetGround £48). Add a new H2: "Recommended Tax Software for Bournemouth Landlords" with a bullet list: "GetGround (£48/month for limited company setup and filing), Taxd (free for basic, £12/month for full), Anna Money (free business account with tax estimates), Tide (free accounting integration)." Add a sentence: "These tools automate MTD submissions and rental income tracking."

5. [MEDIUM] Missing FAQ section with actual questions and answers. Our FAQ heading has no content. Add 5-6 real questions (see FAQ ADDITIONS below).

TITLE/META:
Current title: Property Accountant Bournemouth | Specialist Tax Services | Property Tax Partners
Suggested title: Property Tax Advice Bournemouth | Specialist Accountant for Landlords (58 chars)
Suggested meta description: Expert property tax advice for Bournemouth landlords. Save on CGT, Section 24, and rental income tax. Limited company vs sole trader comparison. Call 01202 123456. (155 chars)

E-E-A-T:
1. Add author bio at bottom: "Written by [Name], Chartered Accountant (ICAEW) with 15 years' experience advising Bournemouth property investors. [Name] specialises in landlord tax planning and incorporation strategies."
2. Add 2 client testimonials: "John from Bournemouth: 'Saved £12,000 in CGT after their advice on letting relief.'" and "Sarah from Poole: 'Incorporation saved me £8,000 in tax in year one.'"
3. Add 2 links to authoritative sources: HMRC's Section 24 guidance (https://www.gov.uk/guidance/restricting-finance-cost-relief-for-individual-landlords) and HMRC's CGT rates (https://www.gov.uk/capital-gains-tax/rates).
4. Add professional membership logos: ACCA, ICAEW, or CIOT at footer of article.

WORD COUNT: Current 1759. Target: 2200-2500 (competitor average 511 — but we need depth to rank for "property tax advice" which is broad).

FAQ ADDITIONS:
1. "What is the best property tax advice for Bournemouth landlords in 2024/25?" — Answer: Focus on incorporation if you have high mortgage interest, use CGT reliefs before selling, and register for MTD if rental income exceeds £10,000.
2. "How much tax can I save by incorporating my Bournemouth rental property?" — Answer: Typically £5,000-£15,000 per year depending on income and mortgage interest. See our worked example above.
3. "What is the capital gains tax rate on property in Bournemouth?" — Answer: 18% for basic rate taxpayers, 24% for higher rate (from 2024/25). Use reliefs like Letting Relief to reduce.
4. "Do I need to register for Making Tax Digital as a Bournemouth landlord?" — Answer: Yes, if your gross rental income exceeds £10,000 per year. MTD for Income Tax starts April 2026.
5. "What is Section 24 and how does it affect my Bournemouth rental property?" — Answer: Section 24 restricts mortgage interest relief to 20% basic rate. Higher-rate landlords lose up to 25% of interest deduction. Incorporation avoids this.
6. "How much does a property accountant cost in Bournemouth?" — Answer: Typically £500-£1,500 per year for basic tax returns, £1,500-£3,000 for incorporation and ongoing advice. Our fees start at £750.

SCHEMA:
Add FAQ schema (type: FAQPage) with all 6 questions and answers. Add LocalBusiness schema with: name "Property Tax Partners", address "Bournemouth, UK", telephone "01202 123456", areaServed "Bournemouth, Poole, Dorset", priceRange "££". Add Article schema with author name, datePublished, and description.
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
PAGE: property-accountant-bournemouth-landlords-tax-services
STATUS: complete
WORD_COUNT_BEFORE: 1759
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
