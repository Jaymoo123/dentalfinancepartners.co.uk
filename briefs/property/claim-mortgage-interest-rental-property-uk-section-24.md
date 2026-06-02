# Page improvement brief: claim-mortgage-interest-rental-property-uk-section-24

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24
- **Source file**: `Property/web/content/blog/claim-mortgage-interest-rental-property-uk-section-24.md`
- **Primary query**: `can you claim mortgage interest on rental property`
- **Current avg position**: 62.0
- **Priority score**: 4.3 / 10
- **Current word count**: 1499
- **Competitor avg word count**: 2295
- **Current section count**: 12
- **Competitor avg section count**: 11
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
| 1 | 0 | 62.0 | 0.00% | can you claim mortgage interest on rental property |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income _(parsed: 3135 words, 14 sections)_
- https://www.which.co.uk/money/tax/income-tax/tax-on-property-and-rental-income/buy-to-let-mortgage-tax-relief-changes-explained-aHQIA2d4bjXj _(parsed: 616 words, 4 sections)_

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

- **[HIGH] Allowable expenses for rental property** — Competitor 1 (GOV.UK) has a dedicated H2 'Allowable expenses' with 305 words, including specific examples (e.g., 'replacement of domestic items relief' with a 50-year figure) and a list of allowable costs. Our page only mentions 'What Costs Qualify for the Tax Credit' but lacks detailed examples and the 50-year rule.
- **[HIGH] Record keeping requirements** — Competitor 1 has a 'Record keeping' H2 with 140 words specifying a 5-year retention period. Our page has no dedicated section on record keeping or retention periods.
- **[MEDIUM] Cash basis accounting** — Competitor 1 includes a 'Cash basis accounting' H2 (78 words) explaining this simpler method. Our page does not mention cash basis accounting at all.
- **[MEDIUM] Capital expenditure vs revenue expenses** — Competitor 1 has a 'Capital expenditure' H2 (122 words) explaining the distinction. Our page lacks this differentiation.
- **[MEDIUM] How to report taxable profits** — Competitor 1 has 'How to work out your taxable profits' and 'How to report your taxable profits' H2s. Our page does not cover the reporting process or tax return forms.

## DeepSeek query gaps (keyword density)

- `tax`: us 0× vs competitors avg 32×
- `income`: us 0× vs competitors avg 20.7×
- `insurance`: us 0× vs competitors avg 2×
- `landlord`: us 0× vs competitors avg 2×

## DeepSeek structural gaps

- Missing a dedicated 'Allowable expenses' section with bullet-point list of specific costs
- Missing a 'Record keeping' section with retention period (e.g., 5 years)
- Missing a 'Cash basis accounting' section
- Missing a 'Capital expenditure' section
- Missing a 'How to report' section with reference to SA105 or other forms
- FAQ section has no questions (empty)
- missing stats or social proof block
- no last-updated date

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax accountant or property expert)
- No references to HMRC official guidance or legislation (e.g., Section 24 of Finance Act 2015)
- No citations or links to authoritative sources (e.g., GOV.UK pages)
- No date of last review or update (page title says '2026 Rules' but no update timestamp)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/section-24-and-tax-relief/claim-mortgage-interest-rental-property-uk-section-24
Query: "can you claim mortgage interest on rental property"
Position: 62.0 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing dedicated 'Allowable expenses' section with specific examples and the 50-year rule. Competitor 1 (GOV.UK) has a 305-word H2 'Allowable expenses' including 'replacement of domestic items relief' and a 50-year figure. Add a new H2: **"What counts as an allowable expense for a rental property?"** Include a bullet-point list of at least 8 specific costs: letting agent fees, ground rent, service charges, insurance (buildings, contents, liability), legal fees for renewing a lease (under 50 years), accountancy fees, repairs and maintenance (not improvements), and replacement of domestic items relief (e.g., replacing a £500 fridge after 5 years, claim £500 minus any proceeds from the old item). Add a worked example: "If you replace a washing machine costing £400, and the old one is scrapped with no resale value, you can claim £400 as an allowable expense under the replacement of domestic items relief."

2. [CRITICAL] Missing 'Record keeping' section with retention period. Competitor 1 has a 140-word H2 'Record keeping' specifying a 5-year retention period. Add a new H2: **"How long must you keep rental property records?"** State: "You must keep all records of income and expenses for your rental property for at least 5 years after the 31 January deadline of the relevant tax year. For example, for the 2024/25 tax year, keep records until at least 31 January 2031." Include a list of records to keep: tenancy agreements, rent receipts, invoices for repairs, bank statements, mortgage interest statements, and capital gains records.

3. [HIGH] Missing 'Cash basis accounting' section. Competitor 1 has a 78-word H2 'Cash basis accounting'. Add a new H2: **"Can you use cash basis accounting for your rental property?"** Explain: "If your annual rental income is £150,000 or less, you can use cash basis accounting. This means you record income when received and expenses when paid, not when invoiced. You cannot claim capital allowances under cash basis, but you can claim replacement of domestic items relief." Add a simple example: "If you receive £1,000 rent in March 2025 but the tenant pays for February 2025, under cash basis you record the £1,000 in the 2024/25 tax year."

4. [HIGH] Missing 'Capital expenditure vs revenue expenses' section. Competitor 1 has a 122-word H2 'Capital expenditure'. Add a new H2: **"What is the difference between capital expenditure and revenue expenses?"** Explain: "Capital expenditure is spending on improving the property, such as adding an extension or installing central heating. This cannot be claimed as an expense but may reduce Capital Gains Tax when you sell. Revenue expenses are day-to-day costs like repairs and maintenance. For example, repairing a broken boiler is a revenue expense; replacing the entire heating system is capital expenditure." Add a table with 3 examples each side.

5. [HIGH] Missing 'How to report taxable profits' section. Competitor 1 has 'How to work out your taxable profits' and 'How to report your taxable profits' H2s. Add a new H2: **"How do you report rental income on your tax return?"** Explain: "You report rental income on the property pages of your Self Assessment tax return. Use form SA105 if filing online. You must report your total rental income, total allowable expenses, and the resulting profit or loss. If you have a loss, you can carry it forward to offset against future rental profits." Include a step-by-step: 1) Log into HMRC online account, 2) Complete property pages, 3) Enter income, 4) Enter expenses, 5) Calculate profit, 6) Submit.

6. [MEDIUM] Missing 'Tax' and 'Income' keyword coverage. Competitors use 'tax' 32x and 'income' 20.7x on average; our page uses 0x each. Add these terms naturally throughout the new sections. For example: "The tax credit is calculated as 20% of your mortgage interest, reducing your income tax bill." and "Your rental income is added to your other income to determine your tax band."

7. [MEDIUM] Missing 'Insurance' and 'Landlord' keyword coverage. Competitors use 'insurance' 2x and 'landlord' 2x on average; our page uses 0x each. Add: "Landlord insurance, including buildings and contents cover, is an allowable expense." and "As a landlord, you must keep accurate records of all insurance premiums paid."

TITLE/META:
Current title: Claim Mortgage Interest on Rental Property UK? 2026 Rules | Property Tax Partners
Suggested title: Can You Claim Mortgage Interest on a Rental Property? UK 2026 Rules
Suggested meta description: Learn if you can claim mortgage interest on a rental property under Section 24. Includes allowable expenses, record keeping, and how to report rental income to HMRC.

E-E-A-T:
- Add an author byline: "By [Name], Chartered Tax Adviser at Property Tax Partners" with a link to their LinkedIn or professional profile.
- Add a date of last review: "Last reviewed: [current month] 2025" at the top of the article.
- Add 2-3 citations to HMRC official guidance: e.g., "According to HMRC's guidance on property income (PIM2000), mortgage interest is not an allowable expense for individual landlords." Link to GOV.UK page.
- Add a disclaimer: "This article is for general guidance only. Consult a qualified tax adviser for your specific circumstances."

WORD COUNT: Current 1499. Target: 2295-2500 (competitor average 2295).

FAQ ADDITIONS:
- "Can I claim mortgage interest on my rental property in 2025?"
- "What is the 20% tax credit for mortgage interest?"
- "How do I calculate the mortgage interest tax credit?"
- "Can I claim mortgage interest if I use cash basis accounting?"
- "What records do I need to keep for rental property mortgage interest?"
- "How long do I need to keep rental property records?"
- "Is mortgage interest an allo
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
PAGE: claim-mortgage-interest-rental-property-uk-section-24
STATUS: complete
WORD_COUNT_BEFORE: 1499
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
