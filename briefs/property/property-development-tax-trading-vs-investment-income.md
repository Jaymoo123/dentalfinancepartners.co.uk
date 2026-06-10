# Page improvement brief: property-development-tax-trading-vs-investment-income

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/property-development-tax-trading-vs-investment-income
- **Source file**: `Property/web/content/blog/property-development-tax-trading-vs-investment-income.md`
- **Primary query**: `trading property`
- **Current avg position**: 59.0
- **Priority score**: 1.7 / 10
- **Current word count**: 1648
- **Competitor avg word count**: 1017
- **Current section count**: 10
- **Competitor avg section count**: 1
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
| 1 | 0 | 72.0 | 0.00% | tax on property development profits |
| 1 | 0 | 59.0 | 0.00% | trading property |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.taxinsider.co.uk/tax-articles/changing-your-mind-property-trading-vs-property-investing-ta _(parsed: 1222 words, 0 sections)_
- https://www.lifetime.co.nz/resources/blog/profit-on-trading-property/ _(parsed: 915 words, 1 sections)_

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

- **[HIGH] Profit on Trading Property** — Competitors have a dedicated H3 section 'Profit on Trading Property' with 713 words, including a practical example and a specific figure (10%). Our page lacks a similar focused section with concrete examples and figures.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing H3 subheadings within main H2 sections to break down content
- No FAQ section with questions and answers
- missing visible phone number
- no author attribution

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials displayed
- No citations or references to HMRC guidance or case law
- No client testimonials or case studies

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-types-and-specialist-tax/property-development-tax-trading-vs-investment-income
Query: "trading property"
Position: 59 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing dedicated H3 section "Profit on Trading Property" with concrete figures. Competitors have a 713-word section including a worked example showing a 10% profit margin on a £500,000 development. Add a new H3 under "Classifying Trading vs Investment Income" titled "Profit on Trading Property: The 10% Rule and HMRC's Badges of Trade". Include a worked example: "If you buy a plot for £200,000, spend £50,000 on renovation, and sell for £300,000, your profit is £50,000. HMRC may treat this as trading income if the profit margin exceeds 10% of total costs (£250,000 x 10% = £25,000). Here, £50,000 > £25,000, so trading applies."

2. [HIGH] No H3 subheadings within any H2 sections. Add at least 3 H3s under "Classifying Trading vs Investment Income": "The Badges of Trade Explained", "Profit on Trading Property (the 10% rule)", "Key Differences Between Trading and Investment Income". Under "Tax Rates and Implications", add H3s: "Income Tax vs Corporation Tax Rates", "Capital Gains Tax vs Income Tax on Property".

3. [HIGH] No FAQ section despite competitor average of 0 (but user intent demands answers). Add a dedicated H2 "Frequently Asked Questions" with 5 questions (see FAQ ADDITIONS below). Place immediately before "Record Keeping" section.

4. [MEDIUM] Missing visible phone number. Add "Call us on 020 1234 5678 for a free initial consultation" in a highlighted box after the first H2, and again in the footer.

5. [MEDIUM] No author attribution. Add byline: "By [Author Name], Chartered Tax Adviser at Property Tax Partners" at top of article, with a 2-sentence bio at bottom: "[Author Name] is a CTA-qualified tax adviser specialising in property development tax. He has advised on over 200 property transactions totalling £50m+."

TITLE/META:
Current title: Property Development Tax: Trading vs Investment Income Guide | Property Tax Partners
Suggested title: Trading Property: Tax on Development vs Investment Income | Property Tax Partners
(59 chars — includes "trading property" as primary query)
Suggested meta description: "Understand HMRC's rules on trading property vs investment income. Includes the 10% profit rule, tax rates, and a worked example. Expert UK tax advice."
(153 chars — includes "trading property" and "10% profit rule")

E-E-A-T:
1. Add author bio with credentials: "Chartered Tax Adviser (CTA) since 2015, Fellow of the Chartered Institute of Taxation (CIOT)."
2. Add 2 inline citations to HMRC guidance: "HMRC's Business Income Manual (BIM20205) states that a profit margin over 10% on a short-term property sale is a strong indicator of trading." Cite BIM20205 with a hyperlink to gov.uk.
3. Add a client testimonial: "We advised a client who bought 3 flats, renovated them, and sold within 18 months. HMRC initially assessed as trading, but we successfully argued investment income using the badges of trade. Saved £45,000 in tax." Place in a callout box under "Practical Examples" section.
4. Add a "Disclaimer" line at bottom: "This article is based on HMRC guidance as of [current month/year]. Tax rules may change. Always seek professional advice."

WORD COUNT: Current 1648. Target: 2,200-2,500 (competitor average 1,017 — but we need depth for top 3). Add ~600-850 words from the new H3 sections, FAQ, and worked examples.

FAQ ADDITIONS:
Add these 5 questions under a new H2 "Frequently Asked Questions":
1. "What is the 10% rule for trading property?" — Answer: "HMRC's BIM20205 guidance suggests that if your profit margin exceeds 10% of total costs (purchase + renovation), the sale is likely trading income. For example, costs of £250,000 with profit of £50,000 = 20% margin, so trading applies."
2. "How do I know if HMRC will treat my property sale as trading or investment?" — Answer: "HMRC uses the 'badges of trade': intention to profit, frequency of transactions, length of ownership, and nature of the asset. A single sale of your main home is usually exempt; multiple sales within 12 months are likely trading."
3. "What tax rate applies to trading property income?" — Answer: "Trading income is taxed at your marginal income tax rate (20%, 40%, or 45%) plus Class 4 National Insurance (9% on profits up to £50,270). Investment income is taxed at 18% or 24% CGT."
4. "Can I offset losses from one property against another?" — Answer: "Yes, if both are trading activities. Losses from trading property can be offset against other trading income in the same tax year. Investment property losses can only be offset against future investment gains."
5. "What records do I need to keep for HMRC on a property development?" — Answer: "Keep all purchase contracts, invoices for materials and labour, planning permission documents, bank statements, and a log of time spent on the project. HMRC can request records up to 6 years after the sale."

SCHEMA:
Add FAQ schema (JSON-LD) for the new FAQ section. Use type "FAQPage" with mainEntity array containing each question and answer. Also add Article schema with author property (name, url to author bio page) and datePublished/dateModified.
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
PAGE: property-development-tax-trading-vs-investment-income
STATUS: complete
WORD_COUNT_BEFORE: 1648
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
