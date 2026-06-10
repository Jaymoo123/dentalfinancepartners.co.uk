# Page improvement brief: incorporation-and-company-structures

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/buy-to-let-limited-company-mortgage-rates-2026-market-guide
- **Source file**: `(not found - search manually)`
- **Primary query**: `current uk limited company buy to let mortgage rates 2026`
- **Current avg position**: 4.0
- **Priority score**: 7.3 / 10
- **Current word count**: 1497
- **Competitor avg word count**: 1312
- **Current section count**: 11
- **Competitor avg section count**: 7
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
| 2 | 0 | 4.0 | 0.00% | current uk limited company buy to let mortgage rates 2026 |
| 2 | 0 | 67.0 | 0.00% | btl limited company mortgage rates |
| 1 | 0 | 8.0 | 0.00% | uk buy to let limited company mortgage rates 2026 |
| 1 | 0 | 71.0 | 0.00% | ltd company btl rates |
| 1 | 0 | 70.0 | 0.00% | ltd company btl mortgage rates |
| 1 | 0 | 34.0 | 0.00% | spv mortgage rates |
| 1 | 0 | 97.0 | 0.00% | btl mortgage rates limited company |
| 1 | 0 | 68.0 | 0.00% | btl ltd company mortgage rates |
| 1 | 0 | 70.0 | 0.00% | btl company mortgage rates |
| 1 | 0 | 62.0 | 0.00% | btl mortgage rates for limited companies |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.comparebanks.co.uk/mortgages/limited-company-buy-to-let-mortgages/ _(parsed: 3225 words, 16 sections)_
- https://www.godirect.co.uk/buy-to-let/best-btl/best-limited-company-buy-to-let-mortgage.php _(parsed: 355 words, 2 sections)_

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

- **[HIGH] Current limited company BTL mortgage rate tables with specific lender rates** — Competitor 1 provides a table with rates updated daily, including figures like £200,000, £100,000, 25 years, 300 months. Competitor 2 lists specific lenders (Aldermore, The Mortgage Works, LendInvest, Molo Finance) with exact rates (e.g., 4.99%, 5.49%, 3.99%, 4.65%) and LTVs (75%, 80%). Our page lacks any rate tables or specific lender examples.
- **[MEDIUM] Detailed pros and cons of limited company BTL mortgages** — Competitor 2 has a dedicated H2 'The pros and cons of limited company BTL mortgages' (52 words). Our page mentions tax efficiency but does not have a balanced pros/cons section.
- **[MEDIUM] Step-by-step guide on how to get a limited company BTL mortgage** — Competitor 2 has a section 'How can you get a limited company buy-to-let mortgage?' (156 words) with criteria like 25% deposit, 125% rental cover. Our page lacks a clear application process guide.
- **[LOW] FAQ section with common questions** — Competitor 2 includes a FAQ 'Can I Use My Limited Company to Get a Mortgage?'. Our page has a FAQ heading but no actual questions or answers.

## DeepSeek query gaps (keyword density)

- `mortgage`: us 38× vs competitors avg 68.3×
- `limited`: us 5× vs competitors avg 27.7×
- `buy`: us 15× vs competitors avg 26.3×
- `let`: us 15× vs competitors avg 24.3×

## DeepSeek structural gaps

- Missing rate comparison table with specific lender rates and terms
- Missing pros and cons section
- Missing step-by-step application guide
- Missing actual FAQ content (questions and answers)
- missing calculator or tool
- no author attribution

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials
- No references to industry data sources or regulatory bodies (e.g., FCA, Bank of England)
- No customer testimonials or case studies

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/incorporation-and-company-structures/buy-to-let-limited-company-mortgage-rates-2026-market-guide
Query: "current uk limited company buy to let mortgage rates 2026"
Position: 4.0 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing rate comparison table with specific lender rates and terms. Competitor 1 has a table updated daily with figures like £200,000 loan, £100,000 loan, 25-year term, 300 months. Competitor 2 lists Aldermore (4.99% at 75% LTV), The Mortgage Works (5.49% at 75% LTV), LendInvest (3.99% at 80% LTV), Molo Finance (4.65% at 75% LTV). Add a table with 6-8 rows showing: Lender name, Starting rate, Max LTV, Product fee, ERC period. Use actual live rates from Moneyfacts or a broker panel. Update monthly.

2. [HIGH] Missing pros and cons section. Competitor 2 has a dedicated H2 'The pros and cons of limited company BTL mortgages' (52 words). Add a new H2: "Pros and Cons of Limited Company Buy-to-Let Mortgages in 2026". Write 3 pros (e.g., lower personal tax on rental income, full mortgage interest relief, inheritance tax planning) and 3 cons (e.g., higher arrangement fees, personal guarantee required, less lender choice). Use bullet points. Total 120-150 words.

3. [HIGH] Missing step-by-step application guide. Competitor 2 has 'How can you get a limited company buy-to-let mortgage?' (156 words) with criteria: 25% minimum deposit, 125% rental cover at 5.5% stress rate, 2 years of company accounts. Add a new H2: "How to Get a Limited Company Buy-to-Let Mortgage: Step-by-Step". Write 5 steps: (1) Set up SPV with correct SIC code (68100), (2) Prepare 2 years of company accounts and personal tax returns, (3) Calculate maximum borrowing using rental cover formula (monthly rent x 12 / 0.75 / stress rate), (4) Compare rates from specialist lenders, (5) Submit application with broker. Total 200-250 words.

4. [MEDIUM] Missing actual FAQ content. Competitor 2 includes 'Can I Use My Limited Company to Get a Mortgage?' with answer. Add 5 FAQ questions with answers (see FAQ ADDITIONS section below). Place after the Market Outlook section. Use <script type="application/ld+json"> for FAQ schema.

5. [MEDIUM] Missing calculator or tool. Competitor 1 has a mortgage calculator. Add a simple embedded calculator or a worked numerical example showing: Purchase price £280,000, 75% LTV = £210,000 loan, rate 4.99% over 25 years, monthly payment £1,226, rental income required at 125% cover = £1,533/month. Use a table format.

6. [LOW] No author attribution. Add author byline with full name, job title (e.g., "John Smith, Senior Mortgage Advisor at Property Tax Partners"), and a 1-sentence bio. Link to author page if exists.

TITLE/META:
Current title: BTL Limited Company Mortgage Rates 2026 | Market Guide | Property Tax Partners
Suggested title: Current UK Limited Company Buy-to-Let Mortgage Rates 2026 | Updated Guide (58 chars)
Suggested meta description: Compare current limited company BTL mortgage rates for 2026. See rates from Aldermore, TMW, LendInvest. Step-by-step application guide. Updated monthly. (155 chars)

E-E-A-T:
- Add author byline: "By [Name], Mortgage Advisor at Property Tax Partners" with a 1-sentence bio (e.g., "With 12 years of experience in specialist BTL lending, [Name] has arranged over 500 limited company mortgages.")
- Add a data source citation: "Rates sourced from Moneyfacts Group PLC, February 2026. Always check with a broker for live rates."
- Add a regulatory disclaimer: "Your home may be repossessed if you do not keep up with repayments on your mortgage. Think carefully before securing other debts against your home."
- Add a case study: "Case study: Client A set up an SPV in 2024, purchased a £350,000 property with 75% LTV at 4.99%. Annual rental income £24,000, mortgage interest £12,276, net profit £11,724 taxed at 19% corporation tax = £2,228 tax vs £4,689 if held personally."

WORD COUNT: Current 1497. Target: 2200-2500 (competitor average 1312, but we need to add tables, FAQ, pros/cons, step-by-step guide).

FAQ ADDITIONS:
1. "Can I use my limited company to get a buy-to-let mortgage?" — Answer: Yes, but only if the company is set up as an SPV with SIC code 68100. Most lenders require the company to have no other trading activities.
2. "What is the minimum deposit for a limited company BTL mortgage in 2026?" — Answer: Typically 25% (75% LTV). Some lenders offer 80% LTV with higher rates (e.g., LendInvest at 3.99% for 80% LTV).
3. "What rental cover do lenders require for company BTL mortgages?" — Answer: Most lenders require 125% rental cover at a stress rate of 5.5% or 6%. Example: For a £1,000/month rent, you need £1,250/month to pass the stress test.
4. "Are limited company BTL mortgage rates higher than personal BTL rates?" — Answer: Generally yes, by 0.5-1%. Personal BTL rates average 4.5-5%, while company rates average 4.99-5.5%. However, the tax savings often outweigh the rate difference.
5. "Can I get a limited company BTL mortgage with bad credit?" — Answer: It's harder but possible. Specialist lenders like Molo Finance and LendInvest consider adverse credit. Expect higher rates (6-8%) and lower LTVs (60-65%).

SCHEMA:
- Add FAQ schema: <script type="application/ld+json"> with the 5 FAQ questions and answers above.
- Add Article schema: <script type="application/ld+json"> with headline, author, datePublished, dateModified, publisher, image.
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
PAGE: incorporation-and-company-structures
STATUS: complete
WORD_COUNT_BEFORE: 1497
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
