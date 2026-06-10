# Page improvement brief: cgt-calculation-selling-buy-to-let-property-step-by-step

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step
- **Source file**: `Property/web/content/blog/cgt-calculation-selling-buy-to-let-property-step-by-step.md`
- **Primary query**: `how to calculate cgt on property`
- **Current avg position**: 74.3
- **Priority score**: 4.5 / 10
- **Current word count**: 1436
- **Competitor avg word count**: 758
- **Current section count**: 10
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
| 3 | 0 | 74.3 | 0.00% | how to calculate cgt on property |
| 1 | 0 | 67.0 | 0.00% | calculating cgt on sale of property |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.hl.co.uk/tools/calculators/capital-gains-tax-calculator _(parsed: 1165 words, 9 sections)_
- https://www.taxcafe.co.uk/resources/howtocalculatecapitalgainstax.html _(parsed: 705 words, 1 sections)_
- https://www.gov.uk/tax-sell-property/work-out-your-gain _(parsed: 404 words, 5 sections)_

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

- **[HIGH] Annual exempt amount (current £3,000)** — Competitor 1 mentions the annual exempt amount (£3,000) in their calculation section. Our page does not specify the current annual exempt amount for 2024/25.
- **[HIGH] CGT rates for property (18% and 24%)** — Competitor 1 includes specific CGT rates (18% for basic rate, 24% for higher rate) in their calculation. Our page does not state the current rates.
- **[MEDIUM] Market value rules for gifts and transfers** — Competitor 2 has a dedicated section 'Market value' explaining when to use market value (gifts, transfers). Our page lacks this detail.
- **[HIGH] Deductible costs (estate agents, solicitors, improvements)** — Competitor 2 lists specific deductible costs (estate agents, solicitors, improvement costs). Our page mentions costs but does not list examples.
- **[HIGH] Reliefs (Private Residence Relief, Letting Relief, Business Asset Disposal Relief)** — Competitor 2 mentions reliefs (your home, business asset). Our page only briefly mentions 'strategies to reduce CGT' but does not name specific reliefs.
- **[HIGH] Reporting and payment deadlines (60 days for property)** — Competitor 1 mentions reporting and payment deadlines. Our page has a section 'Reporting and Payment Deadlines' but does not specify the 60-day rule for property.
- **[MEDIUM] CGT calculator tool** — Competitor 1 offers a CGT calculator. Our page does not provide an interactive calculator or link to one.

## DeepSeek query gaps (keyword density)

- `tax`: us 0× vs competitors avg 24.7×
- `gains`: us 0× vs competitors avg 10×
- `capital`: us 0× vs competitors avg 8×

## DeepSeek structural gaps

- Missing a clear step-by-step calculation formula with current rates and allowances
- No FAQ section with specific questions (e.g., 'What is the annual exempt amount?')
- No table or bullet list of deductible costs
- No mention of market value rules for gifts/transfers
- missing calculator or tool

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials
- No references to HMRC guidance or official sources
- No date of last update or review
- No links to authoritative sources (e.g., GOV.UK)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step
Query: "how to calculate cgt on property"
Position: 74.3 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing current annual exempt amount (£3,000 for 2024/25). Competitor 1 explicitly states "you can make £3,000 in gains before paying CGT." Add a sentence in the Step-by-Step CGT Calculation section: "For the 2024/25 tax year, the annual exempt amount is £3,000. This means the first £3,000 of your total chargeable gain is tax-free."

2. [CRITICAL] Missing current CGT rates for property (18% basic rate, 24% higher rate). Competitor 1 states "18% if you're a basic rate taxpayer, 24% if you're a higher or additional rate taxpayer." Add a bullet list under Step-by-Step CGT Calculation: "CGT rates for residential property (2024/25): Basic rate taxpayer: 18% on gains within basic rate band; Higher/additional rate taxpayer: 24% on all gains above annual exempt amount."

3. [HIGH] Missing specific deductible costs list. Competitor 2 lists: estate agent fees, solicitor/conveyancing fees, Stamp Duty Land Tax paid on purchase, improvement costs (not repairs), survey costs, EPC certificates. Add a bullet list under "Deductible costs" subheading: "Deductible costs when selling a buy-to-let property: Estate agent fees (e.g., £4,500 on a £300,000 sale), Solicitor/conveyancing fees (e.g., £1,200), Stamp Duty Land Tax paid on original purchase (e.g., £7,500), Capital improvements (e.g., new kitchen £8,000, new boiler £3,500), Survey costs, EPC certificate cost (£60-£120)."

4. [HIGH] Missing market value rules for gifts/transfers. Competitor 2 has a dedicated "Market value" section. Add a subheading "Market value rules for gifts and transfers" with text: "If you gift the property to a family member or transfer it below market value, HMRC treats the transaction as if sold at market value. For example, if you gift a buy-to-let worth £350,000 to your child, the gain is calculated using £350,000 as the disposal proceeds, even if no money changes hands."

5. [HIGH] Missing specific reliefs (Private Residence Relief, Letting Relief, Business Asset Disposal Relief). Competitor 2 mentions "your home" relief. Add a subheading "Key reliefs that reduce CGT on property" with: "Private Residence Relief: If the property was your main home at any point, the final 9 months of ownership are exempt. Letting Relief: Up to £40,000 relief if you let the property while it was your main home (restricted from April 2020). Business Asset Disposal Relief: 10% CGT rate on gains up to £1 million if the property qualifies as a business asset (e.g., furnished holiday let)."

6. [HIGH] Missing 60-day reporting and payment deadline for property. Current section "Reporting and Payment Deadlines" is vague. Replace with: "For UK residential property sales completed after 27 October 2021, you must report the gain and pay any CGT due within 60 days of completion. This is done via HMRC's 'Report and pay Capital Gains Tax on UK property' online service. Failure to report within 60 days incurs penalties: £100 for up to 3 months late, then £10 per day."

7. [MEDIUM] Missing CGT calculator tool or link. Competitor 1 offers an interactive calculator. Add a link: "Use HMRC's free Capital Gains Tax calculator at gov.uk/capital-gains-tax/calculator to estimate your liability. Alternatively, try our simple calculator below." Then embed a basic HTML calculator or link to an internal tool.

8. [MEDIUM] Query coverage gaps: 'tax', 'gains', 'capital' used 0x vs competitors 24.7x, 10x, 8x. Add these terms naturally: "capital gains tax calculation for property", "tax on property gains", "how to calculate capital gains tax on buy-to-let".

TITLE/META:
Current title: CGT Selling Buy to Let Property: Step-by-Step Calculation | Property Tax Partners
Suggested title: How to Calculate CGT on Property: Step-by-Step Guide 2024/25 (57 chars)
Suggested meta description: Learn how to calculate Capital Gains Tax on buy-to-let property sales. Includes 2024/25 rates (18%/24%), £3,000 allowance, deductible costs, and 60-day deadline. (155 chars)

E-E-A-T:
1. Add author byline: "By [Full Name], Chartered Tax Adviser at Property Tax Partners" with a brief bio (e.g., "John Smith is a CTA-qualified tax adviser with 12 years' experience in property taxation.")
2. Add last updated date: "Last updated: [current date]" at top of article.
3. Add 2-3 links to authoritative sources: "For official guidance, see HMRC's Capital Gains Tax manual at gov.uk/hmrc-internal-manuals/capital-gains-manual" and "Current rates confirmed at gov.uk/capital-gains-tax/rates."
4. Add a "Disclaimer" note: "This guide is for informational purposes. Always consult a qualified tax adviser for your specific circumstances."

WORD COUNT: Current 1,436. Target: 1,800-2,200 (competitor average 758, but we need depth to rank). Add ~400-800 words of specific detail.

FAQ ADDITIONS:
1. "What is the annual exempt amount for CGT in 2024/25?" (Answer: £3,000)
2. "What are the current CGT rates for selling a buy-to-let property?" (Answer: 18% basic rate, 24% higher rate)
3. "Can I deduct estate agent fees from CGT?" (Answer: Yes, as a disposal cost)
4. "How long do I have to report a property sale to HMRC?" (Answer: 60 days from completion)
5. "What is Private Residence Relief and can I claim it on a buy-to-let?" (Answer: Only if it was your main home at some point)
6. "Do I pay CGT if I gift my buy-to-let to my child?" (Answer: Yes, based on market value)

SCHEMA:
Add FAQ schema (structured data) for all 6 FAQ questions above. Use JSON-LD format with @type: FAQPage. Also add Article schema with author, datePublished, dateModified, and publisher fields.
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
PAGE: cgt-calculation-selling-buy-to-let-property-step-by-step
STATUS: complete
WORD_COUNT_BEFORE: 1436
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
