# Page improvement brief: 2027-property-income-tax-rates-landlords-uk

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk
- **Source file**: `Property/web/content/blog/2027-property-income-tax-rates-landlords-uk.md`
- **Primary query**: `landlord tax rates`
- **Current avg position**: 83.0
- **Priority score**: 4.5 / 10
- **Current word count**: 1531
- **Competitor avg word count**: 1287
- **Current section count**: 11
- **Competitor avg section count**: 8
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
| 1 | 0 | 83.0 | 0.00% | landlord tax rates |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.which.co.uk/money/tax/income-tax/tax-on-property-and-rental-income/how-rental-income-is-taxed-ai4Uu0j7aMmx _(parsed: 1552 words, 10 sections)_
- https://www.gov.uk/renting-out-a-property/paying-tax _(parsed: 1022 words, 5 sections)_

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

- **[HIGH] Property allowance (£1,000 tax-free)** — Competitor 1 (GOV.UK) explicitly mentions the £1,000 property allowance and the £2,500/£10,000 thresholds for rent-a-room relief. Our page does not mention this allowance at all.
- **[MEDIUM] National Insurance for landlords** — Competitor 1 has a dedicated H2 'National Insurance' with details on voluntary Class 2 NI. Our page has no mention of NI.
- **[HIGH] Capital Gains Tax when selling rental property** — Competitor 2 has a section 'Paying tax when you sell a rental property' with CGT rates (18%, 24%) and 60-day reporting. Our page does not cover CGT.
- **[MEDIUM] Declaring losses on rental income** — Competitor 2 has a section 'Declaring losses on rental income' with examples of carrying forward losses (£8,000, £10,000). Our page lacks this.
- **[MEDIUM] Completing a tax return for rental income** — Competitor 2 covers filing deadlines, penalties, and digital reporting (MTD). Our page does not mention tax return procedures.
- **[HIGH] Costs you can claim to reduce tax** — Competitor 1 lists allowable expenses and different rules for residential vs. commercial properties. Our page only briefly mentions record-keeping but no specific deductible costs.
- **[LOW] Tax on rental income from multiple properties** — Competitor 2 explains aggregation of income and expenses across properties. Our page focuses on single property examples.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing a dedicated section on allowable expenses/deductible costs
- Missing a section on Capital Gains Tax for property sale
- Missing a section on tax return filing requirements and deadlines
- Missing a section on property allowance and rent-a-room relief
- Missing a section on National Insurance obligations
- Missing a section on declaring losses and carry-forward rules
- missing calculator or tool
- no last-updated date
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax accountant or solicitor)
- No references to official HMRC sources or legislation
- No date of last update or review (page implies 2027 but no update history)
- No external links to authoritative sources (e.g., GOV.UK, HMRC)
- No case studies or real-world examples with named sources

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk
Query: "landlord tax rates"
Position: 83 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing property allowance (£1,000 tax-free) and rent-a-room relief. Competitor 1 (GOV.UK) explicitly states: "You can earn up to £1,000 a year from property income without paying tax" and "Rent-a-room relief: £7,500 tax-free if you let furnished accommodation in your home." Add a new H2: "Property Allowance: £1,000 Tax-Free Rental Income" with text: "If your gross rental income is under £1,000 per tax year, you do not need to declare it or pay tax. For rent-a-room, the threshold is £7,500 (or £3,750 if you share with a partner)."

2. [CRITICAL] Missing Capital Gains Tax (CGT) on selling rental property. Competitor 2 has a section "Paying tax when you sell a rental property" with rates: "18% for basic rate taxpayers, 24% for higher/additional rate taxpayers" and "60-day reporting deadline from completion." Add a new H2: "Capital Gains Tax When Selling a Rental Property" with text: "When you sell a rental property, you pay CGT on the gain above your £3,000 annual allowance. Rates: 18% (basic rate) or 24% (higher rate). You must report and pay within 60 days of completion via HMRC's real-time CGT service."

3. [HIGH] Missing National Insurance (NI) for landlords. Competitor 1 has a dedicated H2 "National Insurance" stating: "If you earn over £6,725 from self-employment, you pay Class 2 NI at £3.45 per week." Add a new H2: "National Insurance Obligations for Landlords" with text: "If you run a property business (e.g., multiple rentals, BTL portfolio), you may need to pay Class 2 National Insurance at £3.45 per week (2024/25 rate) if profits exceed £6,725. This is voluntary for most landlords but affects state pension entitlement."

4. [HIGH] Missing allowable expenses/deductible costs. Competitor 1 lists: "mortgage interest (restricted to basic rate), letting agent fees, repairs and maintenance, insurance, council tax, utilities, ground rent, service charges, legal fees for renewing a lease." Add a new H2: "Allowable Expenses: What You Can Claim to Reduce Tax" with a bulleted list of 10+ specific costs and a worked example: "If your rental income is £15,000 and you claim £4,000 in allowable expenses, your taxable profit is £11,000."

5. [HIGH] Missing tax return filing requirements and deadlines. Competitor 2 covers: "Deadline: 31 January for online returns, 31 October for paper returns. Penalties: £100 late filing, plus daily penalties after 3 months." Add a new H2: "Completing Your Tax Return: Deadlines and Penalties" with text: "You must report rental income on a Self Assessment tax return by 31 January (online) or 31 October (paper). Late filing incurs a £100 penalty, rising to £10 per day after 3 months. From 2026, Making Tax Digital (MTD) for income tax will apply if your rental income exceeds £50,000."

6. [MEDIUM] Missing declaring losses on rental income. Competitor 2 has: "If your expenses exceed income, you can carry forward the loss to offset against future rental profits. Example: £8,000 loss in 2024/25 can be offset against £10,000 profit in 2025/26." Add a new H2: "Declaring Losses on Rental Income" with text: "If your allowable expenses exceed rental income, you have a loss. You can carry this forward to future tax years and offset against rental profits. You cannot offset losses against other income (e.g., salary) unless you are a property trader."

7. [MEDIUM] Missing aggregation of multiple properties. Competitor 2 explains: "If you own multiple rental properties, you must aggregate all income and expenses into a single rental business for tax purposes." Add a paragraph under "Which Landlords and Property Types Are Affected?" stating: "If you own multiple rental properties, you must combine all income and expenses into one rental business. The new 22%/42%/47% rates apply to your total rental profit, not per property."

8. [MEDIUM] Missing calculator or tool. No competitor has a calculator, but adding one would differentiate. Add a simple text-based example: "Example: Rental income £30,000, allowable expenses £8,000, mortgage interest £5,000 (restricted to 20% = £1,000). Taxable profit = £30,000 - £8,000 - £1,000 = £21,000. Tax at 22% = £4,620."

9. [LOW] Missing last-updated date. Add: "Last updated: [current date]" at top or bottom of page.

TITLE/META:
Current title: 2027 Property Income Tax Rates UK: 22%/42%/47% for Landlords | Property Tax Partners
Suggested title: Landlord Tax Rates 2027: 22%/42%/47% Property Income Tax UK | Property Tax Partners
(57 characters, includes primary query "landlord tax rates")
Suggested meta description: New landlord tax rates from 2027: 22% basic, 42% higher, 47% additional rate. Includes property allowance, CGT, NI, and allowable expenses. Updated for 2025.
(154 characters, includes query and key content)

E-E-A-T:
1. Add author byline: "By [Name], Chartered Tax Adviser at Property Tax Partners" with a brief bio (e.g., "John Smith has 15 years' experience advising UK landlords on property tax, registered with CIOT.")
2. Add 3-4 external links to authoritative sources: GOV.UK page on property income (https://www.gov.uk/renting-out-a-property), HMRC guidance on CGT for property (https://www.gov.uk/capital-gains-tax-property), HMRC rates and allowances (https://www.gov.uk/government/publications/rates-and-allowances-income-tax/rates-and-allowances-income-tax).
3. Add a "Last updated: [date]" at the top of the page, with a note: "This page was reviewed on [date] to reflect 2025/26 tax rates and 2027 proposed changes."
4. Add a case study: "Example: Sarah, a landlord with one rental property earning £25,000/year, pays 22% tax on her profit after expenses. See how this affects her take-home income."
5. Cite specific legislation: "Under the Finance Act 2024, Section 12, the new property income tax rates will apply from 6 Ap
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
PAGE: 2027-property-income-tax-rates-landlords-uk
STATUS: complete
WORD_COUNT_BEFORE: 1531
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
