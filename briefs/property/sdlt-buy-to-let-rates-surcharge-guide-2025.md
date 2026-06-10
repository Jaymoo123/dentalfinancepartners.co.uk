# Page improvement brief: sdlt-buy-to-let-rates-surcharge-guide-2025

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025
- **Source file**: `Property/web/content/blog/sdlt-buy-to-let-rates-surcharge-guide-2025.md`
- **Primary query**: `uk sdlt rates for limited company buying residential property 2026 higher rates surcharge`
- **Current avg position**: 18.0
- **Priority score**: 6.4 / 10
- **Current word count**: 1418
- **Competitor avg word count**: 758
- **Current section count**: 12
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
| 1 | 0 | 18.0 | 0.00% | uk sdlt rates for limited company buying residential property 2026 higher rates surcharge |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/stamp-duty-land-tax/residential-property-rates _(parsed: 758 words, 5 sections)_

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

- **[HIGH] SDLT rates for a single property (standard residential rates)** — Competitor 1 (GOV.UK) provides a clear table of standard SDLT rates for a single property, including thresholds (£125,000, £250,000, etc.) and percentages. Our page focuses on buy-to-let surcharge but does not explicitly list the standard rates that the surcharge is added to.
- **[MEDIUM] First-time buyer relief** — Competitor 1 covers first-time buyer relief with specific thresholds (£300,000, 5% on portion from £300,001 to £500,000). Our page does not mention this relief, which may be relevant for limited companies buying property for employees or directors.
- **[MEDIUM] Non-UK resident SDLT rates** — Competitor 1 includes a section on rates for non-UK residents, with a 2% surcharge and 183-day rule. Our page does not address this, which is relevant for limited companies with non-UK resident shareholders.
- **[HIGH] Special rates for corporate bodies and multiple dwellings** — Competitor 1 mentions special rates for corporate bodies and purchases of 6 or more properties. Our page lacks this, which is directly relevant to limited companies buying residential property.
- **[LOW] SDLT calculator reference** — Competitor 1 references an SDLT calculator. Our page does not mention or link to a calculator.

## DeepSeek query gaps (keyword density)

- `buying`: us 4× vs competitors avg 9×
- `rates`: us 11× vs competitors avg 14×

## DeepSeek structural gaps

- Missing a clear table of standard SDLT rates (thresholds and percentages) that the surcharge is added to
- Missing a dedicated section on 'Rates for a single property' or 'Standard residential rates'
- Missing a section on 'First-time buyer relief'
- Missing a section on 'Non-UK resident rates'
- Missing a section on 'Special rates for corporate bodies and multiple dwellings'
- FAQ section has no questions; should include common queries like 'What is the 5% surcharge for limited companies?'
- missing calculator or tool

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author or expert attribution
- No references to official HMRC sources or legislation
- No date of last update or review
- No links to authoritative sources (e.g., GOV.UK, HMRC)
- No credentials or bio of the author or firm

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025
Query: "uk sdlt rates for limited company buying residential property 2026 higher rates surcharge"
Position: 18 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing standard residential SDLT rates table that the surcharge is added to. Competitor 1 (GOV.UK) shows a clear table with thresholds: 0% up to £125,000, 2% on £125,001–£250,000, 5% on £250,001–£925,000, 10% on £925,001–£1.5m, 12% over £1.5m. Add this as a new H2 section titled "Standard residential SDLT rates 2025/26" with a full table and note: "For limited companies buying a single residential property (not additional), these rates apply. The 3% surcharge is added on top."

2. [CRITICAL] Missing explicit statement of the 3% surcharge for limited companies buying residential property. Competitor 1 states: "If you buy a residential property for £300,000, the SDLT is £5,000. With the 3% surcharge, it becomes £14,000." Add a worked example: "Purchase price £300,000. Standard SDLT: 0% on first £125,000 = £0, 2% on next £125,000 = £2,500, 5% on final £50,000 = £2,500. Total standard = £5,000. Add 3% surcharge on whole £300,000 = £9,000. Total SDLT = £14,000."

3. [HIGH] Missing non-UK resident SDLT rates. Competitor 1 includes a 2% surcharge for non-UK residents and the 183-day rule. Add a new H2 section: "Non-UK resident limited companies: additional 2% surcharge" with text: "If the company is controlled by non-UK resident shareholders, a further 2% surcharge applies. The company must have been UK-resident for 183 days in the 12 months before purchase to avoid this."

4. [HIGH] Missing special rates for corporate bodies buying 6+ properties. Competitor 1 states: "Purchases of 6 or more residential properties in a single transaction are treated as non-residential, with rates of 0% up to £150,000, 2% on £150,001–£250,000, 5% over £250,000." Add a new H2 section: "Special rates for limited companies buying 6+ properties" with this table and note: "This can significantly reduce SDLT for portfolio purchases."

5. [MEDIUM] Missing first-time buyer relief. Competitor 1 covers this with thresholds: 0% up to £300,000, 5% on £300,001–£500,000. Add a brief paragraph under a new H2: "First-time buyer relief for limited companies" stating: "This relief is not available to limited companies. However, if the company buys a property for a director who is a first-time buyer, the relief may apply if the property is for their sole use."

6. [LOW] Missing reference to an SDLT calculator. Competitor 1 links to GOV.UK's SDLT calculator. Add a sentence: "Use HMRC's free SDLT calculator at gov.uk/stamp-duty-land-tax-calculator to check your exact liability."

TITLE/META:
Current title: SDLT rates for limited company buying property UK 2026 | Property Tax Partners
Suggested title: UK SDLT rates for limited company buying residential property 2026: higher rates surcharge
Suggested meta description: Complete guide to SDLT rates for limited companies buying UK residential property in 2026. Includes 3% surcharge, non-UK resident rates, and worked examples. Updated for 2025/26.

E-E-A-T:
- Add author name and credentials: "Written by [Name], Chartered Tax Adviser at Property Tax Partners" with a 2-line bio mentioning CTA/ATT qualification and years of experience in property tax.
- Add a "Last updated: [date]" line at the top of the article.
- Add 2-3 inline links to authoritative sources: GOV.UK SDLT page, HMRC SDLT manual, and the official SDLT calculator.
- Add a disclaimer: "This guide reflects HMRC rules as of [date]. Always consult a qualified tax adviser for your specific situation."

WORD COUNT: Current 1418. Target: 1800-2000 (competitor average 758, but we need to add 3-4 new sections).

FAQ ADDITIONS:
1. "What is the SDLT surcharge for a limited company buying a residential property in 2026?"
2. "Does a limited company pay the 3% surcharge on all residential purchases?"
3. "What are the SDLT rates for a limited company buying 6 or more properties?"
4. "How does the non-UK resident surcharge apply to limited companies?"
5. "Can a limited company claim first-time buyer relief on SDLT?"

SCHEMA:
Add FAQ schema (JSON-LD) with the 5 questions above. Also add Article schema with author name, date published, and date modified.
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
PAGE: sdlt-buy-to-let-rates-surcharge-guide-2025
STATUS: complete
WORD_COUNT_BEFORE: 1418
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
