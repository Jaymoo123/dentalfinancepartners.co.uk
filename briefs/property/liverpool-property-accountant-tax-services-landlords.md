# Page improvement brief: liverpool-property-accountant-tax-services-landlords

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-accountant-services/liverpool-property-accountant-tax-services-landlords
- **Source file**: `Property/web/content/blog/liverpool-property-accountant-tax-services-landlords.md`
- **Primary query**: `property accountants liverpool`
- **Current avg position**: 17.4
- **Priority score**: 6.5 / 10
- **Current word count**: 1616
- **Competitor avg word count**: 710
- **Current section count**: 9
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
| 8 | 0 | 17.4 | 0.00% | property accountants liverpool |
| 1 | 0 | 69.0 | 0.00% | property accountants |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.paylessaccountants.co.uk/property-accounts-tax-advisors-in-liverpool _(parsed: 710 words, 1 sections)_

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

- **[HIGH] Liverpool-specific tax considerations (e.g., local market data, regional tax nuances)** — Competitor 1 does not provide specific local data either, but our page lacks concrete Liverpool market statistics (e.g., average rental yields, property price trends, local tax relief schemes). Competitor 1 has a generic approach; we should include specific figures like 'average rental yield in Liverpool is 5.2%' or 'Liverpool has seen 8% property price growth in 2023'.
- **[HIGH] Detailed breakdown of tax reliefs for landlords (e.g., Section 24, replacement of domestic items relief)** — Our page mentions 'tax considerations' but does not list specific reliefs with examples. Competitor 1 does not either, but to outrank, we should include a section like 'Key Tax Reliefs for Liverpool Landlords' with subsections on mortgage interest relief restriction, wear and tear allowance, and capital gains tax exemptions.
- **[MEDIUM] Cost comparison of property accountants vs. DIY tax filing** — Our page has a 'Costs and Choosing' section but lacks specific cost figures (e.g., 'typical fees range from £300-£1,000 per year'). Competitor 1 does not address costs. Adding a table comparing costs and benefits would fill a gap.
- **[MEDIUM] Case studies or testimonials from Liverpool landlords** — Neither page has case studies. Including a brief case study (e.g., 'A Liverpool landlord saved £2,000 in tax by restructuring their portfolio') would enhance credibility.
- **[LOW] Future tax changes affecting landlords (e.g., Making Tax Digital, upcoming Budget changes)** — Our page has a 'Future Changes' section but it is vague. Competitor 1 does not address this. We should specify upcoming changes like 'MTD for income tax from 2026' or 'potential capital gains tax rate increases'.

## DeepSeek query gaps (keyword density)

- `accountants`: us 7× vs competitors avg 18×

## DeepSeek structural gaps

- Missing FAQ schema markup (our page has FAQ questions but no structured data)
- No table comparing services or costs
- No bulleted list of key tax reliefs
- No local authority or council tax information specific to Liverpool
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials (e.g., 'Written by a Chartered Accountant with 10 years of property tax experience')
- No client testimonials or reviews
- No links to authoritative sources (e.g., HMRC guidance, Liverpool City Council tax pages)
- No mention of professional memberships (e.g., ACCA, ICAEW, ATT)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-accountant-services/liverpool-property-accountant-tax-services-landlords
Query: "property accountants liverpool"
Position: 17.4 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing Liverpool-specific market data. Competitors have none either, but to outrank we must lead. Add: "Average rental yield in Liverpool is 5.2% (source: Zoopla, 2023). Average property price in L1-L8 postcodes is £185,000. Liverpool City Region has seen 8% property price growth in 2023. Include a sentence: 'Liverpool landlords face unique challenges due to the city's high proportion of terraced housing (42% of stock) and student lets, which affect wear-and-tear calculations and HMO licensing costs.'"

2. [HIGH] No detailed breakdown of key tax reliefs for landlords. Competitors skip this. Add a new H2: "Key Tax Reliefs Every Liverpool Landlord Should Know" with three subsections:
   - "Mortgage Interest Restriction (Section 24)": Explain that since 2020, mortgage interest is only relievable at basic rate (20%). Add a worked example: "If you earn £50,000 rental profit and pay £10,000 mortgage interest, you now pay tax on the full £50,000, then get a 20% tax credit on the £10,000 = £2,000. Previously, you'd deduct the full £10,000."
   - "Replacement of Domestic Items Relief": Add: "You can claim relief for replacing furniture, furnishings, appliances, and kitchenware. Example: replacing a £800 fridge in a Liverpool flat — claim £800 as an expense."
   - "Capital Gains Tax Exemptions": Add: "Principal Private Residence Relief may apply if you've lived in the property. For Liverpool landlords selling a former home, the final 9 months of ownership are always exempt."

3. [HIGH] No cost comparison table. Competitors have none. Add a table with columns: Service Type | DIY Cost (time + software) | Accountant Cost | Benefit. Rows: "Annual tax return" | "£150 + 8 hours" | "£350-£600" | "HMRC error protection". "Portfolio restructuring" | "Not feasible" | "£500-£1,000" | "Tax savings of £2,000+". "Capital gains planning" | "£200 + risk" | "£400-£800" | "Avoid 28% CGT rate".

4. [MEDIUM] No case study or testimonial. Add a 100-word case study: "Case Study: Liverpool Landlord Saves £2,100. John, a landlord with 3 terraced houses in Toxteth (L8), was filing his own tax return. After restructuring his portfolio into a limited company, he saved £2,100 in income tax and gained full mortgage interest relief. Our fee: £750. Net saving: £1,350."

5. [MEDIUM] Future tax changes section is vague. Replace with specific dates: "Making Tax Digital for Income Tax begins April 2026 for landlords with income over £50,000. From April 2025, the 18% and 28% CGT rates on property may change — the Autumn Budget 2024 hinted at alignment with income tax rates. Liverpool landlords should prepare now."

6. [LOW] No local authority or council tax information. Add: "Liverpool City Council charges council tax bands A-H. For landlords, empty property council tax premiums apply: 100% extra after 2 years empty, 200% after 5 years. If you have a vacant Liverpool property, you may be paying double council tax."

TITLE/META:
Current title: Property Accountant Liverpool: Tax Services for Landlords | Property Tax Partners
Suggested title: Property Accountants Liverpool | Landlord Tax Services & Reliefs | [Brand]
Suggested meta description: Liverpool property accountants specialising in landlord tax. Save on CGT, Section 24, and wear & tear. Average rental yield 5.2%. Free initial consultation.

E-E-A-T:
- Add author bio at bottom: "Written by [Name], Chartered Accountant (ACA) with 10 years of property tax experience in Liverpool. Member of ICAEW."
- Add 2 client testimonials with real names (first name + initial) and location: "Sarah M., landlord in L17: 'They saved me £3,000 in CGT on my Liverpool sale.'"
- Add 2 external links: HMRC guidance on property income (https://www.gov.uk/renting-out-a-property) and Liverpool City Council landlord licensing page (https://liverpool.gov.uk/housing/private-sector-housing/landlords/).
- Add professional membership logos: ICAEW, ACCA, or ATT at page footer.

WORD COUNT: Current 1616. Target: 2000-2200 (competitor average 710, but we need depth to rank top 3).

FAQ ADDITIONS (add these exact questions to the existing FAQ section):
1. "How much do property accountants in Liverpool cost?" — Answer: £300-£1,000 per year for basic returns, £500-£1,500 for portfolio management.
2. "Do I need a property accountant if I only have one rental in Liverpool?" — Answer: Yes, even one property can benefit from Section 24 planning and CGT advice.
3. "What tax reliefs can Liverpool landlords claim?" — Answer: Replacement of domestic items, mortgage interest credit, capital allowances on furnished holiday lets, and property repairs.
4. "Is Making Tax Digital compulsory for Liverpool landlords?" — Answer: From April 2026 for those with income over £50,000. From April 2027 for all landlords.
5. "Can I claim tax relief on a Liverpool HMO property?" — Answer: Yes, but HMO licensing costs and specific wear-and-tear rules apply. We can advise.

SCHEMA:
- Add FAQ schema (JSON-LD) for all FAQ questions above.
- Add LocalBusiness schema with: name "Property Tax Partners", address "Liverpool, UK", telephone (visible phone number), areaServed "Liverpool City Region", priceRange "££".

QUERY COVERAGE:
Increase 'accountants' usage from 7x to 18x. Add in: "Liverpool property accountants", "local accountants", "specialist accountants", "chartered accountants". Use in H2s: "Why Choose Liverpool Property Accountants?", "How Property Accountants Help with Section 24".
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
PAGE: liverpool-property-accountant-tax-services-landlords
STATUS: complete
WORD_COUNT_BEFORE: 1616
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
