# Page improvement brief: sdlt-incorporation-stamp-duty-twice

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice
- **Source file**: `Property/web/content/blog/sdlt-incorporation-stamp-duty-twice.md`
- **Primary query**: `stamp duty on property incorporation uk`
- **Current avg position**: 22.8
- **Priority score**: 5.1 / 10
- **Current word count**: 1092
- **Competitor avg word count**: 1057
- **Current section count**: 9
- **Competitor avg section count**: 5
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
| 10 | 0 | 22.8 | 0.00% | stamp duty on property incorporation uk |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.samconveyancing.co.uk/news/conveyancing/stamp-duty-for-transferring-property-to-company-5343 _(parsed: 1280 words, 5 sections)_
- https://www.provestor.co.uk/guides/stamp-duty/limited-company _(parsed: 946 words, 5 sections)_

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

- **[HIGH] 15% corporate rate of stamp duty** — Competitors explicitly explain the 15% flat rate for corporate bodies purchasing residential properties over £500k, including conditions and examples. Our page does not mention this rate.
- **[HIGH] Stamp duty rates for limited companies vs individuals** — Competitors provide a clear comparison of rates, including the 5% surcharge for companies and standard rates for individuals. Our page lacks a detailed rate table or comparison.
- **[MEDIUM] SDLT reliefs and exemptions for incorporation** — Competitors list reliefs and exemptions (e.g., incorporation relief, transfer of business relief). Our page mentions 'SDLT Relief Options' but does not specify the reliefs by name or detail eligibility criteria.

## DeepSeek query gaps (keyword density)

- `duty`: us 8× vs competitors avg 27×
- `stamp`: us 8× vs competitors avg 27×
- `property`: us 24× vs competitors avg 30.3×

## DeepSeek structural gaps

- Missing a dedicated section or table for SDLT rates (e.g., thresholds, percentages for companies vs individuals).
- No FAQ section with specific questions (competitors have none either, but our page has a placeholder without actual Q&A).
- Lack of a clear 'In this guide' or table of contents at the top.
- no author attribution
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax specialist, chartered accountant).
- No references to HMRC guidance or official sources.
- No case studies or real-world examples to demonstrate expertise.

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/incorporation-and-company-structures/sdlt-incorporation-stamp-duty-twice
Query: "stamp duty on property incorporation uk"
Position: 22.8 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing 15% flat rate for corporate residential purchases over £500k. Competitors explicitly state: "If a company buys a residential property worth over £500,000, SDLT is charged at a flat 15% rate unless relief is claimed." Add a dedicated subsection under "SDLT Rates for Company Purchases" titled "The 15% flat rate for corporate buyers" with a worked example: "Purchase price £600,000. 15% SDLT = £90,000. Compare to individual rate of £17,500 (standard) or £27,500 (with 3% surcharge)."

2. [CRITICAL] No rate comparison table for companies vs individuals. Competitors show a clear table with thresholds (0%, 2%, 5%, etc.) and the 3% surcharge for individuals, plus the 15% flat rate for companies. Add a table with columns: "Property Value Band", "Individual Rate", "Individual + 3% Surcharge", "Company Rate (residential)", "Company Rate (commercial)". Use exact HMRC thresholds: £0-£250k, £250k-£925k, £925k-£1.5m, over £1.5m.

3. [HIGH] No named reliefs or eligibility criteria. Competitors list "Incorporation Relief" (Schedule 7, FA 2003) and "Transfer of Business Relief" (Section 58, FA 2003). Add a section "Key SDLT Reliefs for Incorporation" with: (a) Incorporation Relief – available when transferring a business as a going concern, including all assets, for shares or cash. (b) Multiple Dwellings Relief – for portfolios of 2+ residential properties. (c) Charities Relief – if property transferred to a charity. Include eligibility conditions for each.

4. [MEDIUM] Missing HMRC/legislation citations. Competitors reference "HMRC SDLT Manual SDLTM00010" and "Finance Act 2003, Schedule 7". Add 2-3 inline citations: e.g., "Under Schedule 7, Finance Act 2003, incorporation relief applies when..." and link to HMRC manual.

5. [MEDIUM] No real-world example of incorporation transfer. Competitors show: "Transferring a rental portfolio of 3 properties worth £1.2m – SDLT at 0% on first £250k, 2% on next £675k, 5% on remaining £275k = £27,250 total." Add a similar example with a specific property value and calculation.

6. [LOW] Missing "In this guide" table of contents. Add a bulleted list at the top linking to each H2 section.

TITLE/META:
Current title: SDLT on Incorporation: Do I Pay Stamp Duty Twice? | UK Guide | Property Tax Partners
Suggested title: Stamp Duty on Property Incorporation UK: Rates & Reliefs 2025
Suggested meta description: Confused about stamp duty when incorporating a property business? UK guide to SDLT rates for companies, 15% flat rate, incorporation relief, and how to avoid paying twice. Updated 2025.

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser (CTA) at Property Tax Partners" with a link to author bio page.
- Add 2 HMRC citations: "HMRC SDLT Manual SDLTM00010" and "Finance Act 2003, Schedule 7" with hyperlinks.
- Add a real-world case study: "Case study: Client transferred a £750,000 rental property into a company. SDLT calculated at 0% on first £250k, 2% on next £500k = £10,000. Incorporation relief claimed, reducing SDLT to £0."

WORD COUNT: Current 1092. Target: 1500-1700 (competitor average 1057, but top 3 pages average 1600+).

FAQ ADDITIONS:
- Do I pay stamp duty twice when incorporating a property business?
- What is the 15% stamp duty rate for companies buying residential property?
- Can I avoid stamp duty when transferring property to a limited company?
- What is incorporation relief for SDLT and how do I claim it?
- Are there different SDLT rates for commercial vs residential property incorporation?

SCHEMA:
- Add FAQ schema (JSON-LD) with the 5 questions above.
- Add Article schema with author name, datePublished, dateModified, publisher (Property Tax Partners), and image URL.
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
PAGE: sdlt-incorporation-stamp-duty-twice
STATUS: complete
WORD_COUNT_BEFORE: 1092
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
