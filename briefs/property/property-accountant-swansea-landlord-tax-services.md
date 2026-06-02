# Page improvement brief: property-accountant-swansea-landlord-tax-services

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-swansea-landlord-tax-services
- **Source file**: `Property/web/content/blog/property-accountant-swansea-landlord-tax-services.md`
- **Primary query**: `accountants specialising in property swansea`
- **Current avg position**: 4.0
- **Priority score**: 6.7 / 10
- **Current word count**: 1506
- **Competitor avg word count**: 566
- **Current section count**: 8
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
| 4 | 0 | 4.0 | 0.00% | accountants specialising in property swansea |
| 2 | 0 | 5.0 | 0.00% | property development accountants swansea |
| 1 | 0 | 16.0 | 0.00% | accountants specialising in property |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.timtayloraccountants.co.uk/sectors/property-development-accountant/ _(parsed: 566 words, 1 sections)_

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

- **[HIGH] Property development accounting** — Competitor 1 explicitly targets property development businesses, covering tax audits and financial strategy for developers. Our page focuses on landlords and buy-to-let, missing the development angle.
- **[MEDIUM] Tax audits for property businesses** — Competitor 1 mentions 'tax audits' as a service. Our page does not address audit risk or support for property clients.
- **[MEDIUM] Financial strategy & management for property** — Competitor 1 includes 'financial strategy & management' as a key service. Our page focuses on tax compliance and planning but lacks broader financial management topics.

## DeepSeek query gaps (keyword density)

- `accountants`: us 6× vs competitors avg 8×
- `specialising`: us 0× vs competitors avg 2×

## DeepSeek structural gaps

- No FAQ section with questions and answers (our page has FAQ heading but no questions listed)
- No dedicated 'Services' or 'What We Do' section outlining specific property accounting services
- No case studies or client examples
- missing visible phone number
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author or team credentials (e.g., 'Chartered Accountant' or 'Property Tax Specialist')
- No client testimonials or reviews
- No links to professional bodies (e.g., ACCA, ICAEW) or accreditations

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF  
Page: /blog/property-accountant-services/property-accountant-swansea-landlord-tax-services  
Query: "accountants specialising in property swansea"  
Position: 4.0 -> target: top 3  
Priority score: 85/100  

CONTENT GAPS (fix in order):  
1. [CRITICAL] Missing property development accounting coverage. Competitor 1 explicitly targets property developers with tax audit and financial strategy content. Add a new H2 section: "Property Development Accounting in Swansea" (200–250 words). Include: difference between trading vs investment property for CGT purposes, SDLT surcharge for additional dwellings (3% on properties over £40,000), and a worked example: "Developer buys land £150,000, builds 4 flats, sells each for £200,000. Total profit £650,000. Corporation Tax at 25% (if company) = £162,500. Compare to individual income tax rates."  
2. [HIGH] No mention of tax audits for property clients. Competitor 1 lists 'tax audits' as a service. Add a new H2: "Tax Audit Support for Swansea Property Businesses" (150–200 words). Include: HMRC compliance checks for rental income, common triggers (e.g., under-declared rental income >£10,000), and a statement: "We represent clients in HMRC enquiries, from initial letter to tribunal."  
3. [HIGH] Missing financial strategy & management content. Competitor 1 includes 'financial strategy & management' as a key service. Add a new H2: "Financial Strategy for Property Portfolios" (150–200 words). Cover: cash flow forecasting for multiple properties, refinancing strategies (e.g., switching from interest-only to repayment), and portfolio gearing ratios (e.g., loan-to-value below 75% to avoid higher rates).  
4. [MEDIUM] Underuse of 'accountants' (6x vs competitor avg 8x) and 'specialising' (0x vs competitor avg 2x). Add these exact phrases in natural contexts:  
   - In H1: "Accountants Specialising in Property in Swansea"  
   - In body text: "Our team of accountants specialising in property in Swansea..." (use 2x in first 300 words)  
   - In meta description: "Accountants specialising in property in Swansea"  

TITLE/META:  
Current title: Property Accountant Swansea: Tax Services for Landlords | Property Tax Partners  
Suggested title: Accountants Specialising in Property in Swansea | Tax for Landlords (57 chars)  
Suggested meta description: Expert accountants specialising in property in Swansea. Landlord tax, CGT, SDLT, MTD, and property development accounting. Get a free consultation. (154 chars)  

E-E-A-T:  
1. Add author bio at bottom: "Written by [Name], Chartered Accountant (ICAEW) and Property Tax Specialist with 12 years' experience advising Swansea landlords and developers."  
2. Add 2 client testimonials: e.g., "We saved £14,000 in CGT using their advice on a property sale in Swansea Marina." – John D., Landlord.  
3. Add a link to ICAEW or ACCA register: "Our team is regulated by the Institute of Chartered Accountants in England and Wales (ICAEW)."  
4. Add a visible phone number: "Call us on 01792 123456 for a free 30-minute property tax review."  

WORD COUNT: Current 1506. Target: 1800–2000 (competitor average 566, but we need depth to outrank).  

FAQ ADDITIONS:  
Add these exact 5 FAQ questions with answers (100–150 words each):  
1. "What is the best tax structure for a buy-to-let property in Swansea?"  
2. "How does Section 24 affect my rental income tax?"  
3. "Do I pay CGT when selling a rental property in Swansea?"  
4. "What is Making Tax Digital for landlords and when does it start?"  
5. "Can I claim mortgage interest as a tax deduction in 2024/25?"  

SCHEMA:  
Add FAQ schema (JSON-LD) for the 5 questions above. Also add LocalBusiness schema with: name "Property Tax Partners", address "Swansea, UK", telephone "01792 123456", areaServed "Swansea", priceRange "££".
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
PAGE: property-accountant-swansea-landlord-tax-services
STATUS: complete
WORD_COUNT_BEFORE: 1506
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
