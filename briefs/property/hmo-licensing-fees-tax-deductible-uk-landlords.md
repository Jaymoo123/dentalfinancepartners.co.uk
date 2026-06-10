# Page improvement brief: hmo-licensing-fees-tax-deductible-uk-landlords

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords
- **Source file**: `Property/web/content/blog/hmo-licensing-fees-tax-deductible-uk-landlords.md`
- **Primary query**: `are licensing fees tax deductible`
- **Current avg position**: 4.0
- **Priority score**: 7.7 / 10
- **Current word count**: 1328
- **Competitor avg word count**: 1760
- **Current section count**: 10
- **Competitor avg section count**: 9
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
| 1 | 0 | 4.0 | 0.00% | are licensing fees tax deductible |
| 1 | 0 | 9.0 | 0.00% | costs of renting out house as hmo uk landlord expenses |
| 1 | 0 | 80.0 | 0.00% | hmo tax |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://fatfire.com/are-license-fees-tax-deductible/ _(parsed: 2040 words, 8 sections)_
- https://fatfire.com/are-registration-fees-tax-deductible/ _(parsed: 1480 words, 10 sections)_

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

- **[HIGH] General license fee deductibility rules (IRS/HMRC principles)** — Competitor 1 covers general tax deductibility criteria (ordinary and necessary business expenses) with examples. Our page jumps straight to HMO licensing without explaining the foundational rules for license fees.
- **[MEDIUM] Step-by-step guide to claiming deductions** — Competitor 1 has a dedicated H2 'Claiming Your Deductions: A Step-by-Step Guide' with actionable steps. Our page lacks a clear process for claiming HMO licensing fee deductions.
- **[MEDIUM] Exceptions and special cases (personal vs. business use, capital vs. revenue)** — Competitor 1 has an H2 'When Things Get Complicated: Exceptions and Special Cases' discussing personal use and capital vs. revenue. Our page does not address these nuances.
- **[LOW] Comparison of different license fee types (professional, business, vehicle, etc.)** — Competitor 1 lists various license fee types (professional, business, vehicle) with examples. Our page is narrowly focused on HMO licensing only.
- **[LOW] Vehicle registration and license fee deductions** — Competitor 2 covers vehicle registration fees, license fees, and state-specific variations. Our page does not mention vehicle-related deductions.

## DeepSeek query gaps (keyword density)

- `fees`: us 26× vs competitors avg 34.5×
- `deductible`: us 11× vs competitors avg 17.5×
- `tax`: us 45× vs competitors avg 48×

## DeepSeek structural gaps

- Missing a 'Step-by-Step Claiming Guide' section
- Missing a 'Exceptions and Special Cases' section
- Missing a 'General Tax Deductibility Principles' section
- No FAQ section with questions (competitors have none either, but we have no FAQ content despite heading)
- missing calculator or tool

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials displayed
- No citations or references to HMRC guidelines or case law
- No mention of professional qualifications (e.g., accountant, tax advisor)
- No external links to authoritative sources (e.g., HMRC, gov.uk)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-types-and-specialist-tax/hmo-licensing-fees-tax-deductible-uk-landlords
Query: "are licensing fees tax deductible"
Position: 4.0 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing general tax deductibility principles for licence fees. Competitor 1 opens with HMRC’s “wholly and exclusively” rule and “ordinary and necessary” business expense test, then applies it to licence fees. Add a new H2: “General Tax Deductibility Principles for Licence Fees” with 120–150 words explaining: (a) HMRC’s Section 34 ITTOIA 2005 rule for revenue expenses, (b) the “duality of purpose” test, (c) a clear example: “If you pay a £1,200 HMO licence fee for a property you let, it’s wholly for the rental business. If you live in one room, only 80% is deductible.”

2. [HIGH] Missing step-by-step claiming guide. Competitor 1 has H2 “Claiming Your Deductions: A Step-by-Step Guide” with 5 steps. Add a new H2: “How to Claim HMO Licence Fee Deductions: Step-by-Step” with 200–250 words covering: Step 1 – Identify the fee type (application vs renewal vs variation); Step 2 – Check the property is used wholly or mainly for letting; Step 3 – Allocate between capital and revenue (application = capital, renewal = revenue); Step 4 – Record the date and amount; Step 5 – Enter in the correct box on your SA105 or company tax return.

3. [HIGH] Missing exceptions and special cases section. Competitor 1 has H2 “When Things Get Complicated: Exceptions and Special Cases.” Add a new H2: “Exceptions and Special Cases: When HMO Licence Fees Are Not Fully Deductible” with 150–180 words covering: (a) personal use of the property (e.g., live-in landlord), (b) mixed-use properties (part-residential, part-commercial), (c) fees paid before the property is first let (capital, not revenue), (d) fees for a property that remains empty for more than 6 weeks (HMRC may challenge).

4. [MEDIUM] Missing worked numerical example. Competitor 1 includes a tax calculation example. Add a new paragraph under “How Do HMO Licence Costs Affect Your Tax Bill?”: “Example: You pay a £1,500 HMO licence fee for a 5-year licence. This is a capital cost. You claim £300 per year as capital allowances (writing-down allowance at 18% on the £1,500 = £270 per year). If you pay a £200 annual renewal fee, that’s fully deductible in the year paid. At 40% tax, the renewal saves you £80.”

5. [MEDIUM] Missing comparison of licence fee types. Competitor 1 lists professional, business, and vehicle licence fees. Add 80–100 words under a new H3: “Other Licence Fees Landlords Can Claim” covering: (a) vehicle licence (car tax) for business use, (b) professional licence (e.g., ARLA Propertymark membership), (c) business rates licence (if applicable). State: “These follow the same ‘wholly and exclusively’ test.”

6. [LOW] Missing vehicle registration fee deduction mention. Competitor 2 covers vehicle registration fees. Add 40–50 words under “Other Licence Fees” or as a standalone sentence: “Vehicle excise duty (car tax) for a vehicle used solely for your letting business is deductible. If used partly privately, only the business proportion is claimable.”

TITLE/META:
Current title: HMO Licensing Fees Tax Deductible? UK Landlord Guide 2026 | Property Tax Partners
Suggested title: Are HMO Licensing Fees Tax Deductible? UK Landlord Guide 2026
Suggested meta description: Are HMO licensing fees tax deductible? Learn HMRC rules, step-by-step claiming, and capital vs revenue treatment for UK landlords. Updated 2026.

E-E-A-T:
- Add author byline: “By [Name], Chartered Tax Adviser at Property Tax Partners” with a 1-sentence bio linking to author page.
- Add 2–3 citations: link to HMRC’s “Property Income Manual” (PIM2020) and “Capital Allowances Manual” (CA23000) for capital vs revenue treatment.
- Add a disclaimer: “This guide is for informational purposes. Consult a qualified accountant for your specific circumstances.”
- Add an internal link to your “Capital Allowances for Landlords” page.

WORD COUNT: Current 1328. Target: 1750–1850 (competitor average 1760).

FAQ ADDITIONS:
Add these 4 exact FAQ questions and answers (150–200 words total):

1. “Are HMO licensing fees tax deductible for UK landlords?” – Yes, if the property is let wholly for business. Application fees are capital (claim via capital allowances). Renewal fees are revenue (deduct in full in the year paid).

2. “Can I claim HMO licence fees as a capital allowance?” – Yes, if the licence lasts more than one year. Claim writing-down allowance at 18% per year on the cost. Example: £1,500 licence = £270 per year.

3. “What if I live in the HMO property as a live-in landlord?” – Only the business proportion is deductible. If you live in one of five rooms, 80% of the fee is deductible. HMRC applies the “duality of purpose” test.

4. “Are selective licensing fees tax deductible?” – Yes, same rules apply. Selective licensing fees under the Housing Act 2004 are deductible if the property is let. Renewal fees are revenue; initial fees are capital.

SCHEMA:
Add FAQ schema (type: FAQPage) for the 4 questions above. Add Article schema (type: Article) with author, datePublished, dateModified, and publisher fields.
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
PAGE: hmo-licensing-fees-tax-deductible-uk-landlords
STATUS: complete
WORD_COUNT_BEFORE: 1328
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
