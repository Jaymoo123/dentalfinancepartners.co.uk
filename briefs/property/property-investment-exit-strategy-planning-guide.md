# Page improvement brief: property-investment-exit-strategy-planning-guide

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/portfolio-management/property-investment-exit-strategy-planning-guide
- **Source file**: `Property/web/content/blog/property-investment-exit-strategy-planning-guide.md`
- **Primary query**: `property portfolio tax planning`
- **Current avg position**: 53.7
- **Priority score**: 2.0 / 10
- **Current word count**: 1964
- **Competitor avg word count**: 1014
- **Current section count**: 11
- **Competitor avg section count**: 2
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
| 3 | 0 | 53.7 | 0.00% | property portfolio tax planning |
| 2 | 0 | 61.5 | 0.00% | property investment exit strategy |
| 1 | 0 | 35.0 | 0.00% | exit strategy property investment |
| 1 | 0 | 79.0 | 0.00% | property exit strategy |
| 1 | 0 | 57.0 | 0.00% | property disposal strategy |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.tlpi.co.uk/insights/essential-tax-planning-needed-to-create-a-profitable-property-portfolio _(parsed: 1014 words, 2 sections)_

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

- **[HIGH] Ways to buy investment property (personally, via trading company, using a Family Investment Company)** — Competitors cover three core ways to buy investment property with specific figures: 45%, 20%, 25%, 40% (likely tax rates or relief percentages). Our page focuses on exit strategy but misses the initial acquisition tax planning that is critical for portfolio tax planning.
- **[MEDIUM] SSAS and investment consultants** — Competitors mention SSAS (Small Self-Administered Scheme) and offer free 15-minute calls with expert SSAS consultants. Our page lacks any mention of pension-based property investment structures like SSAS or SIPP.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing H3 subheadings within sections to break down complex topics (e.g., acquisition methods)
- No FAQ section with questions (our page has FAQ heading but no questions listed)
- No call-to-action for a free consultation or expert call (competitors offer 'Book your free, 15 minute no obligation call')
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax specialist, chartered accountant)
- No mention of professional accreditations or memberships (e.g., ATT, CIOT, ICAEW)
- No case studies or real-world examples to demonstrate expertise
- No references to HMRC guidelines or official tax legislation

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/portfolio-management/property-investment-exit-strategy-planning-guide
Query: "property portfolio tax planning"
Position: 53.7 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing acquisition structure comparison: Competitors detail four ownership methods with specific tax rates (45%, 20%, 25%, 40%). Add a new H2 section titled "Acquisition Structures That Impact Exit Tax" with an H3 for each: "Personal ownership (individual) – CGT at 18%/24% on disposal", "Trading company – Corporation Tax at 25% on gains, then dividend tax up to 39.35%", "Family Investment Company (FIC) – Corporation Tax at 25% with retained profits control", "SIPP/SSAS – tax-free growth, 25% tax-free lump sum on exit". Include a worked example: "Buy-to-let held personally: £200k gain, £12,300 annual exempt amount gone from 2024/25, taxed at 18% (basic rate) or 24% (higher rate) = £45,048 tax due."

2. [HIGH] Add SSAS and pension-based property investment: Competitors offer "free 15-minute call with SSAS consultant" and explain SSAS allows commercial property purchase with tax relief. Add a new H2 section "Using a SSAS or SIPP for Property Portfolio Tax Planning" with H3: "SSAS advantages: borrow up to 50% of net fund value, rent paid to pension is tax-free, no CGT on disposal within pension". Add a specific figure: "A SSAS can lend up to 50% of its net fund value to purchase property, e.g., a £500k fund can borrow £250k for a £750k property."

3. [HIGH] Add HMRC legislation citations: Competitors reference specific legislation (e.g., TCGA 1992, ITTOIA 2005). Add three citations: "Under TCGA 1992 s.2, individuals pay CGT on gains above the annual exempt amount (£3,000 from 2024/25)", "Finance Act 2024 reduced CGT higher rate from 28% to 24% for residential property", "HMRC guidance on Principal Private Residence relief (CG64200) – only applies if property was your main home at some point."

4. [MEDIUM] Add a worked numerical example for portfolio exit: Competitors show a full calculation. Add a new H3 "Example: Selling a 3-property portfolio" with: "Property A: bought £150k, sold £220k, gain £70k. Property B: bought £200k, sold £280k, gain £80k. Property C: bought £180k, sold £210k, gain £30k. Total gains £180k. Less annual exempt amount £3,000 = £177k taxable. At 24% = £42,480 CGT. If sold via company: Corporation Tax at 25% = £44,250, but retained profits can be extracted at lower dividend rates."

5. [MEDIUM] Add a "Tax Planning Checklist for Portfolio Exit" section: Competitors have bullet-point checklists. Add a new H2 "Pre-Exit Tax Planning Checklist" with 8 specific items: "1. Review annual exempt amount (£3,000 for 2024/25) – can you split sales across tax years? 2. Consider transferring to spouse (no CGT on transfer between spouses) to use two allowances. 3. Check if any property qualifies for Business Asset Disposal Relief (10% rate, £1m lifetime limit). 4. Assess if holding period qualifies for 24% rate vs 18% (basic rate band £37,700). 5. Review capital losses carried forward – offset against gains. 6. Check if property was ever your main home (PPR relief). 7. Evaluate incorporation relief if transferring to company. 8. Consider holding via trust for IHT planning."

TITLE/META:
Current title: Property Investment Exit Strategy: Planning Guide UK | Property Tax Partners
Suggested title: Property Portfolio Tax Planning: Exit Strategy Guide UK (2025)
Suggested meta description: Plan your property portfolio exit with UK tax planning strategies. CGT rates, SSAS options, and acquisition structures. Free consultation available.

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser (CTA) and Fellow of the Association of Taxation Technicians (ATT)"
- Add a "Why Trust Us" box: "Our team includes CTA-qualified advisers with 15+ years in property tax. We reference HMRC legislation and real case studies."
- Add one anonymised case study: "Case study: Client with 4-property portfolio (£1.2m value) wanted to exit. We structured sale over two tax years, used spouse's allowance, and claimed BADR on one property. Saved £28,000 in CGT."
- Add a reference to HMRC's official guidance: "See HMRC manual CG64200 for PPR relief rules."

WORD COUNT: Current 1,964. Target: 2,800-3,200 (competitor average 1,014 but we need depth for top 3).

FAQ ADDITIONS:
Add an H2 "Frequently Asked Questions on Property Portfolio Tax Planning" with these exact questions:
- "What is the CGT rate on selling a property portfolio in 2025?" (Answer: 18% for basic rate taxpayers, 24% for higher rate, down from 28% in 2024)
- "Can I avoid CGT by transferring property to my spouse?" (Answer: Yes, no CGT on inter-spouse transfers, but done before sale)
- "Is it better to sell properties personally or through a company?" (Answer: Personal: 18-24% CGT. Company: 25% CT plus dividend tax up to 39.35%. Depends on profit extraction plans)
- "What is a SSAS and how does it help with property tax?" (Answer: Small Self-Administered Scheme – allows pension fund to buy commercial property, rent paid to pension is tax-free, no CGT on disposal)
- "What is the annual exempt amount for CGT in 2024/25?" (Answer: £3,000, down from £6,000 in 2023/24)
- "Can I use Business Asset Disposal Relief on property?" (Answer: Yes, if property qualifies as a business asset – e.g., furnished holiday lettings or commercial property – 10% rate, £1m lifetime limit)

SCHEMA:
Add FAQ schema (JSON-LD) for the 6 questions above.
Add Article schema with author, datePublished, dateModified, publisher (Property Tax Partners), and image.
Add BreadcrumbList schema for page hierarchy.
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
PAGE: property-investment-exit-strategy-planning-guide
STATUS: complete
WORD_COUNT_BEFORE: 1964
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
