# Page improvement brief: hmo-vs-standard-buy-to-let-tax-comparison

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/hmo-vs-standard-buy-to-let-tax-comparison
- **Source file**: `Property/web/content/blog/hmo-vs-standard-buy-to-let-tax-comparison.md`
- **Primary query**: `hmo landlord tax planning`
- **Current avg position**: 11.7
- **Priority score**: 8.1 / 10
- **Current word count**: 1663
- **Competitor avg word count**: 3349
- **Current section count**: 11
- **Competitor avg section count**: 18
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
| 4 | 0 | 11.7 | 0.00% | hmo landlord tax planning |
| 1 | 0 | 36.0 | 0.00% | hmo tax |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.thehmomortgagebroker.co.uk/blog/hmo-tax-guide/ _(parsed: 3349 words, 18 sections)_

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

- **[HIGH] Worked Example: Section 24 Impact on a 6-Bed HMO** — Competitor provides a detailed worked example with specific figures (e.g., £39,600 rent, £6,600 mortgage interest, £13,200 profit) showing the tax impact of Section 24 on a typical HMO. Our page lacks any numerical example.
- **[HIGH] Personal vs Company Tax Comparison for HMO Investors** — Competitor includes a side-by-side comparison with figures (40% taxpayer, £39,600 profit, corporation tax vs income tax) for the same 6-bed HMO. Our page mentions incorporation but does not provide a concrete comparison with numbers.
- **[MEDIUM] HMO Licensing Fees — Are They Tax Deductible?** — Competitor explicitly addresses whether HMO licensing fees are tax deductible. Our page does not mention this specific expense.
- **[MEDIUM] Replacement of Domestic Items Relief for HMO Properties** — Competitor covers this relief specifically for HMO properties. Our page does not mention it.
- **[MEDIUM] Allowable Expenses for HMO Landlords** — Competitor lists allowable expenses with reference to HMRC guidance. Our page only briefly mentions expense allocation methods without a detailed list.
- **[LOW] Income Tax on HMO Rental Income — Rates and Bands** — Competitor explains how rental profit is added to other income and taxed at marginal rates. Our page assumes reader knowledge.

## DeepSeek query gaps (keyword density)

- `hmo`: us 48× vs competitors avg 110×
- `tax`: us 62× vs competitors avg 120×
- `NI`: us 30× vs competitors avg 38×
- `landlord`: us 14× vs competitors avg 19×

## DeepSeek structural gaps

- Missing a dedicated 'Worked Example' section with numerical calculations
- Missing a 'Personal vs Company Tax Comparison' table or side-by-side analysis
- Missing a 'Allowable Expenses' checklist or bullet list
- No FAQ section with actual questions (our FAQ has no questions listed)
- missing calculator or tool
- missing testimonials or reviews
- missing stats or social proof block
- no last-updated date
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax accountant or property tax specialist)
- No citations or references to HMRC guidance or official sources
- No case studies or real-world examples to demonstrate expertise

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-types-and-specialist-tax/hmo-vs-standard-buy-to-let-tax-comparison
Query: "hmo landlord tax planning"
Position: 11.7 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing worked example of Section 24 impact on a 6-bed HMO. Competitor shows: rent £39,600, mortgage interest £6,600, profit before restriction £13,200, then adds back 20% tax credit on interest (£1,320) to show net tax bill. Add a new H2 "Worked Example: Section 24 Impact on a 6-Bed HMO" with exact figures: purchase price £350,000, mortgage £262,500 at 4.5% = £11,812.50 interest, rent £3,300/month = £39,600/year, other expenses £14,850, net profit before interest £24,750, profit after interest £12,937.50, then show 20% tax credit = £2,362.50, final tax at 40% = £9,900 minus credit = £7,537.50.

2. [CRITICAL] Missing personal vs company tax comparison for same HMO. Competitor shows side-by-side: 40% taxpayer pays £7,537.50 income tax vs company pays 19% corporation tax on £24,750 = £4,702.50, then dividend tax on extraction. Add a new H2 "Personal vs Company Tax Comparison for HMO Investors" with a table: column 1 "Personal (40% taxpayer)", column 2 "Company (19% CT)", rows: rental profit £24,750, tax on profit, net retained, dividend tax (8.75% basic/33.75% higher), total tax paid. Use exact figures: personal = £7,537.50, company = £4,702.50 CT + £1,653.75 dividend tax = £6,356.25 total.

3. [HIGH] Missing HMO licensing fees tax deductibility. Competitor states: "HMO licensing fees are allowable as a revenue expense under S.35 ITTOIA 2005." Add a bullet under "Expense Allocation and Accounting Methods" section: "HMO licensing fees (typically £500-£1,200 per property per 5-year licence) are fully deductible as a revenue expense under ITTOIA 2005 S.35. Claim the annualised cost: £100-£240 per year."

4. [HIGH] Missing Replacement of Domestic Items Relief for HMOs. Competitor explains: "For HMOs, replacement of furniture, furnishings, appliances and kitchenware is deductible under S.33A ITTOIA 2005." Add a new H3 under "Expense Allocation and Accounting Methods": "Replacement of Domestic Items Relief for HMO Properties" with text: "Under S.33A ITTOIA 2005, HMO landlords can deduct the cost of replacing domestic items (beds, sofas, fridges, cookers, crockery) in communal areas and individual rooms. The relief covers the cost of the replacement item minus any proceeds from the old item. Initial purchase of items for a new HMO is capital, not deductible."

5. [HIGH] Missing allowable expenses checklist for HMO landlords. Competitor lists 12+ items with HMRC references. Add a new H2 "Allowable Expenses for HMO Landlords: Complete Checklist" with a bullet list of 15 items: mortgage interest (restricted to 20% tax credit), letting agent fees, insurance (buildings, contents, landlord liability), repairs and maintenance (not improvements), utility bills (if landlord pays), council tax (void periods only), ground rent and service charges, legal fees for tenancy agreements, accountancy fees, HMO licensing fees, gas safety certificates (annual), EICR (every 5 years), EPC (every 10 years), replacement of domestic items, property management software.

6. [MEDIUM] Missing income tax rates and bands explanation for HMO rental profit. Competitor explains: "Rental profit is added to your other income and taxed at 20%, 40% or 45%." Add a paragraph under "Key Tax Differences" section: "HMO rental profit is added to your employment income, pension, dividends and savings interest. For 2025/26, the tax bands are: £0-£37,700 at 20%, £37,701-£125,140 at 40%, over £125,140 at 45%. If your total income including HMO profit is £60,000, the first £37,700 is taxed at 20% and the remaining £22,300 at 40%."

TITLE/META:
Current title: HMO vs Buy-to-Let Tax Comparison: Which is Better? | 2026 | Property Tax Partners
Suggested title: HMO Landlord Tax Planning: Section 24, Licensing & Allowable Expenses (2026)
Suggested meta description: Complete HMO landlord tax planning guide. Worked example of Section 24 impact, allowable expenses checklist, licensing fees deductibility, and personal vs company tax comparison.

E-E-A-T:
1. Add author byline: "By [Name], Chartered Tax Adviser at Property Tax Partners" with a 2-sentence bio showing 10+ years property tax experience.
2. Add 3 HMRC citations: ITTOIA 2005 S.35 (licensing fees), S.33A (replacement of domestic items), S.24 (mortgage interest restriction).
3. Add a "Case Study" box: "Case Study: 6-bed HMO in Manchester — landlord saved £2,835 by incorporating. See worked example above."
4. Add last-updated date: "Last updated: [current month] 2025" in a visible position below H1.

WORD COUNT: Current 1,663. Target: 3,200-3,500 (competitor average 3,349).

FAQ ADDITIONS:
1. Are HMO licensing fees tax deductible?
2. How does Section 24 affect HMO landlords differently?
3. Should I hold my HMO in a limited company or personally?
4. What expenses can I claim as an HMO landlord?
5. Is replacement of furniture in an HMO tax deductible?
6. Do I pay capital gains tax when selling an HMO?
7. What is the difference between HMO and single let tax treatment?
8. Can I claim mortgage interest relief on my HMO?

SCHEMA:
Add FAQ schema (type: FAQPage) with all 8 questions and answers.
Add Article schema with author name, date published, date modified, and publisher (Property Tax Partners).
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
PAGE: hmo-vs-standard-buy-to-let-tax-comparison
STATUS: complete
WORD_COUNT_BEFORE: 1663
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
