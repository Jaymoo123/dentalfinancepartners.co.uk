# Page improvement brief: what-does-a-property-accountant-do

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-accountant-services/what-does-a-property-accountant-do
- **Source file**: `Property/web/content/blog/what-does-a-property-accountant-do.md`
- **Primary query**: `property owner accountant`
- **Current avg position**: 57.0
- **Priority score**: 2.6 / 10
- **Current word count**: 2083
- **Competitor avg word count**: 542
- **Current section count**: 11
- **Competitor avg section count**: 3
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
| 1 | 0 | 57.0 | 0.00% | property owner accountant |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://chadwickaccountants.co.uk/service/landlord-services _(parsed: 542 words, 3 sections)_

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

- **[HIGH] Specialist services for different landlord types (HMO, limited companies, larger portfolios)** — Competitor 1 explicitly mentions 'sole trader with up to four properties, a HMO landlord, a property manager, limited companies, or investors with larger portfolios' under H2 'Specialist Landlord & Property Advice'. Our page lacks this segmentation.
- **[MEDIUM] Cost/value comparison with larger accounting firms** — Competitor 1 highlights 'fantastic value for money thanks to lower overhead costs' and 'best possible price' in two H2 sections. Our page only has a generic 'Cost vs. Value' section without specific pricing comparisons or overhead cost advantages.
- **[LOW] Geographic targeting (Warwickshire/Stratford)** — Competitor 1 targets a specific region in title and H2. Our page is generic UK-wide, missing local SEO opportunities.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with questions (our FAQ H2 has no questions listed)
- No bullet points or numbered lists for services or responsibilities
- No call-to-action buttons or contact forms visible in the snippet
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials mentioned
- No client testimonials or case studies
- No mention of professional memberships (e.g., ACCA, ICAEW, CIOT)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-accountant-services/what-does-a-property-accountant-do
Query: "property owner accountant"
Position: 57 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing segmentation for different landlord types. Competitor 1 explicitly lists "sole trader with up to four properties, a HMO landlord, a property manager, limited companies, or investors with larger portfolios" under H2 "Specialist Landlord & Property Advice". Add a new H2: "Specialist Services for Different Landlord Types" with bullet points covering: sole trader with 1-4 properties (focus on personal tax returns and CGT on sale), HMO landlords (HMO licensing costs, wear and tear allowance, rent-a-room relief), limited company landlords (corporation tax at 25% vs income tax, dividend extraction, Section 24 restriction), and portfolio investors (stamp duty surcharge, ATED, group relief).

2. [HIGH] No cost/value comparison with larger accounting firms. Competitor 1 highlights "fantastic value for money thanks to lower overhead costs" and "best possible price" in two H2 sections. Add a new H2: "Cost Comparison: Property Accountant vs. Large Accounting Firm" with a table showing: typical annual fee for a property accountant (£800-£2,500 for a portfolio of 5 properties) vs. a Big 4 or national firm (£3,000-£8,000+). Add a sentence: "Because we have lower overheads than city-centre firms, we pass those savings to you—typically 40-60% less for the same compliance work."

3. [MEDIUM] No geographic targeting. Competitor 1 targets Warwickshire/Stratford in title and H2. Add a sentence in the "Choosing the Right Property Accountant" section: "If you're based in the West Midlands, Warwickshire, or Stratford-upon-Avon, we offer face-to-face meetings and local knowledge of council tax bands and HMO licensing rules." Also add a localised H2: "Property Accountant Services in Warwickshire and the West Midlands" with 2-3 sentences about local property market trends (e.g., average rental yields in Coventry vs. Stratford).

TITLE/META:
Current title: Property Accountant: What They Do & Tax Services 2026 | Property Tax Partners
Suggested title: Property Owner Accountant: Tax Services for Landlords 2026 (58 chars)
Suggested meta description: Specialist property accountant for UK landlords. Save on CGT, SDLT & income tax. Fixed fees from £800/year. Free initial consultation. (134 chars)

E-E-A-T:
1. Add author bio at bottom: "Written by [Name], ACCA-qualified property tax specialist with 12 years' experience advising UK landlords. Reviewed by [Name], ICAEW Chartered Accountant."
2. Add one client testimonial: "We saved £4,200 in CGT on a single property sale thanks to their advice on principal private residence relief." — John S., Birmingham landlord (3 properties).
3. Add a sentence: "We are members of the Association of Accounting Technicians (AAT) and the Chartered Institute of Taxation (CIOT)."

WORD COUNT: Current 2083. Target: 2,400-2,600 (competitor average 542 — but we need depth for top 3; competitors are thin, so depth is our advantage).

FAQ ADDITIONS:
1. "How much does a property owner accountant cost for a single rental property?" (Answer: typically £800-£1,200/year for a single property, including self-assessment and basic tax planning.)
2. "Can a property accountant help me avoid capital gains tax when selling a buy-to-let?" (Answer: Yes, through principal private residence relief, letting relief, and timing of sale to use annual exempt amount (£3,000 for 2025/26).)
3. "Do I need a property accountant if I own properties through a limited company?" (Answer: Yes, because corporation tax returns (CT600), dividend extraction, and Section 24 interest restriction rules are complex.)
4. "What's the difference between a property accountant and a regular accountant?" (Answer: A property accountant specialises in landlord-specific reliefs like wear and tear allowance, replacement of domestic items relief, and SDLT surcharges.)

SCHEMA:
Add FAQ schema (JSON-LD) with the 4 questions above. Add LocalBusiness schema if targeting Warwickshire/West Midlands (include address, phone number, opening hours).
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
PAGE: what-does-a-property-accountant-do
STATUS: complete
WORD_COUNT_BEFORE: 2083
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
