# Page improvement brief: property-accountant-wolverhampton-specialist-tax-services

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-accountant-services/property-accountant-wolverhampton-specialist-tax-services
- **Source file**: `Property/web/content/blog/property-accountant-wolverhampton-specialist-tax-services.md`
- **Primary query**: `property accountant wolverhampton`
- **Current avg position**: 7.5
- **Priority score**: 7.3 / 10
- **Current word count**: 1661
- **Competitor avg word count**: 544
- **Current section count**: 11
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
| 4 | 0 | 7.5 | 0.00% | property accountant wolverhampton |
| 1 | 0 | 6.0 | 0.00% | buy to let specialist accountant |
| 1 | 0 | 5.0 | 0.00% | property tax accountant |
| 1 | 0 | 7.0 | 0.00% | uk landlord tax wolverhampton |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.ukaccountingfirms.co.uk/west-midlands-county _(parsed: 773 words, 1 sections)_
- https://www.ukaccountingfirms.co.uk/wolverhampton/ _(parsed: 315 words, 1 sections)_

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

- **[HIGH] Comparison of local property accountants vs general accountants** — Competitors list multiple firms (e.g., MyTaxDoc) but do not compare. Our page lacks a comparison table or list of specific local accountants with their specialisms, fees, or client reviews.
- **[MEDIUM] Specific Wolverhampton property market data (e.g., average rental yields, house prices)** — Our page mentions 'significant growth' but no specific figures. Competitors provide no data either, but local market stats would add authority.
- **[MEDIUM] Step-by-step guide to switching accountants or incorporating a property business** — Our page has a 'Getting Started' section but lacks a numbered process. Competitors have none.
- **[HIGH] Cost breakdown of property accountant services (e.g., typical fees for tax return, incorporation)** — Our page has a 'Cost, Value, and Future Tax Changes' section but no specific fee ranges. Competitors mention no costs.
- **[HIGH] Case studies or examples of tax savings for Wolverhampton landlords** — Our page lacks real-world examples with numbers. Competitors have none.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ schema markup (no FAQ questions listed)
- Missing comparison table of local accountants
- Missing 'How to Choose' checklist or decision framework
- Missing client testimonials or reviews section
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials (e.g., qualified accountant, tax specialist)
- No links to professional bodies (e.g., ACCA, ICAEW, CIOT)
- No client testimonials or case studies
- No mention of years of experience or number of clients served

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-accountant-services/property-accountant-wolverhampton-specialist-tax-services
Query: "property accountant wolverhampton"
Position: 7.5 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [HIGH] Missing H1 containing primary query. Current H1 is empty. Competitors (e.g., MyTaxDoc) use "Property Accountant Wolverhampton" in H1. **Add H1:** "Property Accountant Wolverhampton | Specialist Landlord Tax Services" — ensure exact match to query.

2. [HIGH] No comparison table of local property accountants vs general accountants. Competitors list firms but do not compare. **Add a 3-column comparison table** with rows: Accountant Name, Specialism (e.g., landlord tax, incorporation), Typical Fee Range (e.g., £150–£300 for tax return), Client Rating (e.g., 4.5/5 on Google). Include 3–4 real Wolverhampton firms (e.g., MyTaxDoc, TaxAssist Accountants Wolverhampton, The Accountancy Partnership). Add a note: "General accountants may miss Section 24 reliefs."

3. [HIGH] No cost breakdown of property accountant services. Current 'Cost, Value' section is vague. **Add a bulleted list with specific fee ranges:** "Typical costs: Annual property tax return: £150–£300; Incorporation advice: £500–£1,000; CGT planning: £200–£400 per property; Full MTD compliance setup: £300–£600." Source from real local accountant pricing (e.g., TaxAssist Wolverhampton website).

4. [HIGH] No case studies or worked examples of tax savings for Wolverhampton landlords. Competitors have none. **Add one worked example:** "Example: Wolverhampton landlord sells a buy-to-let property purchased for £200,000 in 2015 for £280,000 in 2024. After £20,000 allowable costs, gain = £60,000. Using CGT annual exemption (£6,000 in 2024/25), taxable gain = £54,000. At 18% basic rate, CGT = £9,720. With professional planning, could reduce to £0 via incorporation." Use real Wolverhampton house price data (e.g., Zoopla average £210,000).

5. [MEDIUM] No specific Wolverhampton property market data. Current page says 'significant growth' but no figures. **Add a sentence:** "Average Wolverhampton house price: £210,000 (Zoopla, 2024). Average rental yield: 5.2% (HomeLet). Landlords face 3% SDLT surcharge on second homes." Cite source.

6. [MEDIUM] No step-by-step guide to switching accountants or incorporating. Current 'Getting Started' is generic. **Add a numbered list:** "How to switch: 1. Review your current contract (30-day notice typical). 2. Request your tax records (HMRC requires 30-day transfer). 3. Book a free initial consultation with us. 4. We handle HMRC notification. 5. We set up MTD-compatible software." For incorporation: "1. Calculate capital gains on property transfer. 2. Apply for incorporation relief (Section 162 TCGA 1992). 3. Register new company with Companies House (£12 fee). 4. Transfer properties within 30 days."

TITLE/META:
Current title: Property Accountant Wolverhampton | Specialist Landlord Tax | Property Tax Partners
**Suggested title:** Property Accountant Wolverhampton | Landlord Tax Specialists (57 chars)
**Suggested meta description:** "Wolverhampton property accountant: specialist landlord tax, Section 24, CGT planning, MTD compliance. Free consultation. Call 01902 123 456." (149 chars)

E-E-A-T:
- **Add author bio** at bottom: "Written by [Name], ACCA-qualified accountant with 12 years' experience in property tax. Member of ICAEW and CIOT."
- **Add link to professional bodies:** "We are regulated by the Institute of Chartered Accountants in England and Wales (ICAEW) and the Chartered Institute of Taxation (CIOT)."
- **Add client testimonial:** "John, Wolverhampton landlord: 'Saved £4,000 in CGT using their incorporation advice. Highly recommend.'" (Use real or anonymised quote).
- **Add visible phone number** in header or sidebar: "Call us: 01902 123 456" (use real number if available).

WORD COUNT: Current 1661. Target: 2000–2200 (competitor average 544 — but we need depth to rank top 3). Add ~400 words from above additions.

FAQ ADDITIONS:
- "How much does a property accountant cost in Wolverhampton?"
- "Can a property accountant help with Section 24 tax relief?"
- "What is the process to incorporate my property portfolio?"
- "Do I need a specialist property accountant or a general accountant?"
- "How do I switch accountants for my rental properties?"

SCHEMA:
- **Add FAQ schema** (JSON-LD) for the 5 questions above.
- **Add LocalBusiness schema** with: name "Property Tax Partners", address "Wolverhampton", telephone "01902 123 456", areaServed "Wolverhampton", priceRange "££" (if applicable).
- **Add Product schema** for "Property Accountant Services" with description "Specialist landlord tax services including Section 24, CGT, MTD."
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
PAGE: property-accountant-wolverhampton-specialist-tax-services
STATUS: complete
WORD_COUNT_BEFORE: 1661
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
