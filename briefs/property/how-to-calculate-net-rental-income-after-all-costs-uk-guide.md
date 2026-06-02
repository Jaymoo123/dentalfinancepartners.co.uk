# Page improvement brief: how-to-calculate-net-rental-income-after-all-costs-uk-guide

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/how-to-calculate-net-rental-income-after-all-costs-uk-guide
- **Source file**: `Property/web/content/blog/how-to-calculate-net-rental-income-after-all-costs-uk-guide.md`
- **Primary query**: `how to calculate rent income`
- **Current avg position**: 64.5
- **Priority score**: 4.5 / 10
- **Current word count**: 1245
- **Competitor avg word count**: 1455
- **Current section count**: 8
- **Competitor avg section count**: 9
- **Current FAQ count (parsed, may be wrong)**: 0
- **Competitor avg FAQ count (parsed, may be wrong)**: 1

> ⚠️ The FAQ counts above come from a parser that does not recognise `<dl>/<dt>/<dd>` patterns or all JSON-LD schema variations. **Read the source file frontmatter to see actual FAQ count, then plan to expand to 10-14.**

## GSC query data (last 90 days)

This is the ground truth on what queries the page currently surfaces for. Use this to inform:
- Meta title (lead with the highest-impression query word order)
- Meta description (specific differentiators that beat competing SERP results)
- FAQ questions (target the queries with impressions but no clicks)

| Impressions | Clicks | Avg Pos | CTR | Query |
|---:|---:|---:|---:|---|
| 3 | 0 | 87.8 | 0.00% | how to calculate rental income |
| 3 | 0 | 64.5 | 0.00% | how to calculate rent income |
| 2 | 0 | 5.5 | 0.00% | what is net rental income |
| 1 | 0 | 73.0 | 0.00% | net rental |
| 1 | 0 | 86.0 | 0.00% | determining rental income |
| 1 | 0 | 69.0 | 0.00% | profit on rental property |
| 1 | 0 | 4.0 | 0.00% | what is net property income |
| 1 | 0 | 75.0 | 0.00% | calculate net rental income |
| 1 | 0 | 7.0 | 0.00% | what does net rental income mean |
| 1 | 0 | 81.0 | 0.00% | how to calculate rental income for taxes |
| 1 | 0 | 87.0 | 0.00% | net rental income calculation |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income _(parsed: 3135 words, 14 sections)_
- https://taxradar.co.uk/tools/rental-income-calculator _(parsed: 615 words, 6 sections)_

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

- **[HIGH] Rental Income Tax Calculator** — Competitors include an interactive calculator section (e.g., 'Rental Income Tax Calculator') that helps users determine marginal tax band. Our page lacks any calculator or interactive tool.
- **[HIGH] Property Income Allowance vs Actual Expenses** — Competitors have a dedicated H2 explaining the £1,000 property income allowance and comparison with actual expenses. Our page does not mention this allowance or the choice between the two methods.
- **[HIGH] Section 24: Mortgage Interest Relief Changes** — Competitors explain the 20% tax credit on mortgage interest since April 2020, with figures (20%, £1k, £0, 40%). Our page lacks any mention of Section 24 or mortgage interest relief changes.
- **[MEDIUM] Common Allowable Landlord Expenses** — Competitors list common allowable expenses (e.g., repairs, insurance, letting agent fees). Our page does not provide a detailed list of allowable expenses.
- **[MEDIUM] Joint Ownership & Form 17** — Competitors explain how rental income is split 50:50 by default for married couples and how Form 17 can change this. Our page does not cover joint ownership scenarios.
- **[MEDIUM] Tax bands and rates for 2026/27** — Competitors mention marginal tax bands (20%, 40%, 45%) and £1,000 allowance. Our page only mentions 'tax obligations' without specific rates or bands.

## DeepSeek query gaps (keyword density)

- `tax`: us 0× vs competitors avg 16×

## DeepSeek structural gaps

- Missing interactive calculator or tool
- No FAQ section with structured Q&A
- No comparison table (e.g., property income allowance vs actual expenses)
- No step-by-step calculation example with numbers
- missing calculator or tool
- missing FAQ accordion
- no last-updated date

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials
- No citations or references to HMRC guidelines
- No case studies or real-world examples
- No links to official HMRC resources

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/landlord-tax-essentials/how-to-calculate-net-rental-income-after-all-costs-uk-guide
Query: "how to calculate rent income"
Position: 64.5 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing step-by-step calculation example with real numbers. Competitors show a worked example: "Gross rent £12,000 – letting agent fees £1,200 – repairs £800 – insurance £240 = net rental income £9,760, then tax at 20% = £1,952." Add a full worked example: Gross rent £18,000, minus allowable expenses £4,500, net rental income £13,500. Then show tax calculation: £13,500 – £1,000 property allowance (if chosen) = £12,500 taxable, at 20% = £2,500 tax due. Use actual 2026/27 figures.

2. [CRITICAL] Missing Property Income Allowance vs Actual Expenses section. Competitors have a dedicated H2: "Property Income Allowance vs Actual Expenses: Which Is Better?" Add a comparison table with columns: Method, Deduction, Best For. Show £1,000 allowance vs itemised actual expenses. Include rule: you cannot claim both. Add example: if actual expenses are £800, use allowance; if £1,500, use actual.

3. [CRITICAL] Missing Section 24 mortgage interest relief explanation. Competitors explain: "Since April 2020, you cannot deduct mortgage interest from rental income. Instead, you get a 20% tax credit on the interest paid." Add a dedicated H2: "Section 24: How Mortgage Interest Relief Works in 2026/27" with example: Interest paid £5,000, basic rate tax credit = £1,000 (20% of £5,000). Higher-rate landlord loses 20% relief (was 40%, now 20%).

4. [HIGH] Missing tax bands and rates for 2026/27. Competitors list: Personal Allowance £12,570, Basic rate 20% (£12,571–£50,270), Higher rate 40% (£50,271–£125,140), Additional rate 45% (over £125,140). Add a table with these exact figures. State: "Rental income is added to your other income to determine your marginal tax band."

5. [HIGH] Missing common allowable expenses list. Competitors list 8–10 items. Add a bulleted list: letting agent fees (10–15% of rent), repairs and maintenance (not improvements), buildings insurance, contents insurance, ground rent, service charges, legal fees for renewing a tenancy (not for buying), accountancy fees, utility bills (if landlord pays), council tax (if property empty or landlord pays).

6. [MEDIUM] Missing joint ownership and Form 17 explanation. Competitors explain: "Married couples/civil partners default to 50:50 split. If you own property in unequal shares, file Form 17 with HMRC to declare beneficial ownership." Add a short paragraph with link to HMRC Form 17 guidance.

7. [MEDIUM] Missing FAQ section. Competitors average 1 FAQ. Add 3–4 FAQs (see FAQ ADDITIONS below).

8. [MEDIUM] Missing interactive calculator or tool. Add a simple embedded calculator: "Rental Income Tax Calculator" with fields: Gross annual rent (£), Allowable expenses (£), Mortgage interest (£), Other income (£). Output: Net rental income, Taxable amount, Tax due at marginal rate. Use JavaScript or embed a third-party tool.

TITLE/META:
Current title: How to Calculate Net Rental Income After All Costs UK 2026 | Property Tax Partners
Suggested title: How to Calculate Rental Income UK 2026: Net Profit After Costs (57 chars)
Suggested meta description: Calculate your net rental income after all costs in 2026. Includes Section 24 relief, property allowance vs expenses, and a step-by-step example. (148 chars)

E-E-A-T:
- Add author byline: "By [Name], Chartered Tax Adviser at Property Tax Partners" with link to author bio page.
- Add 2–3 citations to HMRC guidance: link to HMRC manual PIM2000 (property income), HMRC Form 17 page, and HMRC Section 24 guidance.
- Add a real-world case study: "Case study: Sarah owns a flat in Manchester, gross rent £14,400/year, expenses £3,200, mortgage interest £4,800. Her net rental income is £11,200, but after Section 24 credit, her tax bill is £1,840 (not £2,240)."
- Add last-updated date: "Last updated: [current month] 2026" at top of article.

WORD COUNT: Current 1,245. Target: 1,500–1,700 (competitor average 1,455). Add ~300–450 words covering the gaps above.

FAQ ADDITIONS:
1. "How do I calculate net rental income for tax purposes?" – Answer: Gross rent minus allowable expenses (repairs, insurance, agent fees, etc.) equals net rental income. Then apply your marginal tax rate. Example: £18,000 – £4,500 = £13,500 taxable.
2. "Can I claim the £1,000 property income allowance instead of actual expenses?" – Answer: Yes, if your gross rental income is under £1,000, no tax is due. If over £1,000, you can choose the £1,000 allowance or actual expenses. You cannot claim both.
3. "How does mortgage interest relief work in 2026?" – Answer: You cannot deduct mortgage interest from rental income. Instead, you get a 20% tax credit on the interest paid. Example: £5,000 interest = £1,000 credit.
4. "What expenses can I deduct from rental income UK?" – Answer: Letting agent fees, repairs, insurance, ground rent, service charges, legal fees for tenancy renewals, accountancy fees, utility bills, council tax (if landlord pays). Not capital improvements.

SCHEMA:
Add FAQ schema (structured data) for the 4 FAQs above. Use JSON-LD format with @type: FAQPage, mainEntity array with Question/Answer pairs. Also add Article schema with author, datePublished, dateModified, and publisher.
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
PAGE: how-to-calculate-net-rental-income-after-all-costs-uk-guide
STATUS: complete
WORD_COUNT_BEFORE: 1245
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
