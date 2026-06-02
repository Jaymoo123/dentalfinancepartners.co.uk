# Page improvement brief: landlord-insurance-tax-deductible-what-can-you-claim

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/landlord-insurance-tax-deductible-what-can-you-claim
- **Source file**: `(not found - search manually)`
- **Primary query**: `income tax on landlord insurance claims`
- **Current avg position**: 29.0
- **Priority score**: 6.4 / 10
- **Current word count**: 1234
- **Competitor avg word count**: 2052
- **Current section count**: 12
- **Competitor avg section count**: 10
- **Current FAQ count (parsed, may be wrong)**: 0
- **Competitor avg FAQ count (parsed, may be wrong)**: 2

> ⚠️ The FAQ counts above come from a parser that does not recognise `<dl>/<dt>/<dd>` patterns or all JSON-LD schema variations. **Read the source file frontmatter to see actual FAQ count, then plan to expand to 10-14.**

## GSC query data (last 90 days)

This is the ground truth on what queries the page currently surfaces for. Use this to inform:
- Meta title (lead with the highest-impression query word order)
- Meta description (specific differentiators that beat competing SERP results)
- FAQ questions (target the queries with impressions but no clicks)

| Impressions | Clicks | Avg Pos | CTR | Query |
|---:|---:|---:|---:|---|
| 17 | 0 | 28.6 | 0.00% | income tax on landlord insurance claims |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income _(parsed: 3135 words, 14 sections)_
- https://www.insurancechoice.co.uk/blog/landlord-tax-guide/ _(parsed: 2019 words, 9 sections)_
- https://www.which.co.uk/money/tax/income-tax/tax-on-property-and-rental-income/allowable-expenses-and-allowances-aKT7h4c8jJta _(parsed: 1003 words, 8 sections)_

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

- **[HIGH] Allowable expenses vs capital expenditure distinction** — Competitors (GOV.UK, Which?) explicitly distinguish between allowable expenses (revenue) and capital expenditure, with GOV.UK providing a dedicated H2 'Capital expenditure' (122 words) and Which? covering 'Annual investment allowance for landlords'. Our page lacks this distinction, which is critical for tax compliance.
- **[HIGH] Replacement of domestic items relief** — Which? has a dedicated H2 'Landlord 'wear and tear' replacement relief' and 'What qualifies for the 'replacement of domestic items relief'?' with specific examples (beds, carpets, fridges) and figures (£600, £400). Our page does not mention this relief, which is a key allowable expense for landlords.
- **[MEDIUM] Cash basis accounting** — GOV.UK has a dedicated H2 'Cash basis accounting' (78 words) explaining this simpler accounting method. Our page does not address cash basis, which affects how insurance claims are reported.
- **[MEDIUM] Record keeping requirements** — GOV.UK has a dedicated H2 'Record keeping' (140 words) specifying 5-year retention. Our page lacks guidance on record keeping for insurance claims.
- **[MEDIUM] Changes to tax relief for residential property (Section 24)** — GOV.UK mentions 'Changes to tax relief for residential property' (22 words) regarding finance cost restriction. Our page does not address this, which impacts landlords with mortgages.
- **[LOW] Annual Investment Allowance for landlords** — Which? has a dedicated H2 'Annual investment allowance for landlords' (79 words) explaining capital vs revenue. Our page lacks this, though it's less directly related to insurance.

## DeepSeek query gaps (keyword density)

- `tax`: us 32× vs competitors avg 58.3×
- `income`: us 8× vs competitors avg 33.7×

## DeepSeek structural gaps

- Missing FAQ section with questions like 'Is landlord insurance tax deductible?', 'Can I claim insurance premiums as an allowable expense?', 'What is the difference between revenue and capital expenses?'
- Missing a clear 'Allowable expenses' section that lists all deductible expenses including insurance, with examples
- Missing a 'Capital expenditure' section to clarify what is not deductible
- Missing a 'Record keeping' section with retention periods
- missing stats or social proof block
- no last-updated date

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., 'Written by a tax accountant')
- No references to HMRC guidance or official sources (e.g., HMRC manuals, legislation)
- No date of last update or review
- No external links to authoritative sites like GOV.UK or professional bodies

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/section-24-and-tax-relief/landlord-insurance-tax-deductible-what-can-you-claim
Query: "income tax on landlord insurance claims"
Position: 29 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing distinction between allowable expenses (revenue) and capital expenditure. Competitors (GOV.UK, Which?) have dedicated H2s. Add a new H2: "Allowable expenses vs capital expenditure: what counts for income tax on landlord insurance claims" (minimum 200 words). Include: insurance premiums are revenue (allowable); replacing a whole roof after a claim is capital (not allowable). Add a worked example: "If you claim £1,200 for a burst pipe repair, that's revenue. If you replace the entire kitchen after a fire at £8,000, that's capital — you claim capital allowances instead."

2. [CRITICAL] Missing "Replacement of domestic items relief" (RDI). Which? covers this with specific figures. Add a new H2: "Replacement of domestic items relief: what it means for insurance claims" (minimum 150 words). Include: "If you claim on insurance for a replacement fridge (£600), bed (£400), or carpet (£800), you cannot also claim RDI on the same item. RDI applies only if you pay out of pocket, not via insurance." Add a note: "HMRC allows RDI for like-for-like replacements only — no upgrades."

3. [HIGH] Missing "Cash basis accounting" section. GOV.UK has 78 words on this. Add a new H2: "Cash basis accounting for landlord insurance claims" (minimum 100 words). Explain: "Under cash basis, you deduct insurance premiums in the tax year you pay them, not when the policy period starts. This affects how you report claims income — you declare the claim payout in the year you receive it."

4. [HIGH] Missing "Record keeping requirements" section. GOV.UK has 140 words on this. Add a new H2: "Record keeping for landlord insurance claims: what HMRC requires" (minimum 120 words). Include: "Keep all insurance policy documents, claim forms, settlement letters, and receipts for repairs for at least 5 years after the tax year they relate to. HMRC can ask for these in a compliance check."

5. [MEDIUM] Missing "Changes to tax relief for residential property (Section 24)" reference. GOV.UK mentions this. Add a sentence under a new H2: "Section 24 and its impact on insurance claims" (minimum 80 words). Include: "Section 24 restricts finance cost relief for residential landlords. Insurance premiums remain fully deductible as a revenue expense — they are not affected by Section 24. This is separate from mortgage interest restriction."

6. [MEDIUM] Missing FAQ section entirely. Competitors average 2 FAQs. Add a new H2: "Frequently asked questions about income tax on landlord insurance claims" with 4-5 questions (see FAQ ADDITIONS below).

7. [LOW] Missing "Annual Investment Allowance (AIA) for landlords" mention. Which? covers this. Add a brief note under the capital expenditure section: "If you buy new plant or machinery (e.g., a boiler) after an insurance claim, you may claim AIA at 100% on the first £1 million. This is separate from insurance deductibility."

TITLE/META:
Current title: Income Tax on Landlord Insurance Claims: What's Deductible | Property Tax Partners
Suggested title: Income Tax on Landlord Insurance Claims: Allowable Expenses & Capital (58 chars)
Suggested meta description: Confused about income tax on landlord insurance claims? Learn what's deductible (premiums, repairs) vs capital expenditure. Includes cash basis, RDI relief, and record keeping. (155 chars)

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser, [Date]" — use a real name with credentials (e.g., "John Smith, ATT").
- Add 2 external links to GOV.UK: one to "Property income manual: allowable expenses" (PIM2010) and one to "Capital allowances for plant and machinery" (CA23000).
- Add a "Last updated: [current month year]" line at the top of the article.
- Add a disclaimer: "This article is for general guidance only. Consult a qualified tax adviser for your specific situation."

WORD COUNT: Current 1,234. Target: 2,000-2,200 (competitor average 2,052).

FAQ ADDITIONS:
Add these exact questions under a new H2 "Frequently asked questions about income tax on landlord insurance claims":
1. "Is landlord insurance tax deductible?" — Answer: Yes, premiums are an allowable revenue expense. Deduct them in the tax year you pay them under cash basis, or when the policy period starts under accruals basis.
2. "Can I claim insurance premiums as an allowable expense if I use cash basis?" — Answer: Yes. Under cash basis, deduct premiums in the year you pay them, regardless of when the policy covers.
3. "What is the difference between revenue and capital expenses for landlord insurance claims?" — Answer: Revenue expenses (e.g., repair after a claim) are fully deductible in the year. Capital expenses (e.g., replacing a roof) are not deductible — you claim capital allowances instead.
4. "Do I pay income tax on insurance claim payouts?" — Answer: Yes, if the payout covers lost rental income or repairs you've deducted. No, if it covers capital assets (e.g., rebuilding a property) — that's a capital receipt, not income.
5. "How does replacement of domestic items relief interact with insurance claims?" — Answer: If your insurance pays for a replacement (e.g., a new fridge), you cannot claim RDI on that item. RDI only applies when you pay out of pocket for like-for-like replacements.

SCHEMA:
Add FAQ schema (type: FAQPage) for the 5 questions above.
Add Article schema with author, datePublished, dateModified, and publisher fields.
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
PAGE: landlord-insurance-tax-deductible-what-can-you-claim
STATUS: complete
WORD_COUNT_BEFORE: 1234
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
