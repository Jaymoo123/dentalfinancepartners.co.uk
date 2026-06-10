# Page improvement brief: 2027-property-tax-rates-affect-capital-gains-tax-sales

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/2027-property-tax-rates-affect-capital-gains-tax-sales
- **Source file**: `Property/web/content/blog/2027-property-tax-rates-affect-capital-gains-tax-sales.md`
- **Primary query**: `capital gains tax uk property calculator`
- **Current avg position**: 37.0
- **Priority score**: 5.4 / 10
- **Current word count**: 1518
- **Competitor avg word count**: 404
- **Current section count**: 8
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
| 1 | 0 | 37.0 | 0.00% | capital gains tax uk property calculator |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

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

- **[HIGH] How to calculate capital gains tax on property step-by-step** — Competitors (GOV.UK) provide a clear step-by-step process: determine market value, deduct costs, apply reliefs, then calculate tax. Our page lacks any step-by-step calculation guide or examples.
- **[HIGH] Deductible costs when selling property** — Competitors list specific deductible costs: estate agents' fees, solicitors' fees, costs of improvements. Our page does not mention any deductible costs or examples.
- **[HIGH] Reliefs available for property CGT (Private Residence Relief, etc.)** — Competitors mention reliefs like Private Residence Relief and business asset relief. Our page has no mention of any CGT reliefs.
- **[MEDIUM] Current CGT rates and allowances for property (2024/25)** — Our page focuses on 2027 changes but does not state current CGT rates (18%/24% for residential property) or the annual exempt amount (£3,000). Competitors do not provide rates but users expect them.
- **[MEDIUM] Special circumstances: selling a lease, part of land, compulsory purchase** — Competitors cover special rules for selling a lease, part of land, or compulsory purchase. Our page lacks these scenarios.
- **[HIGH] How to report and pay CGT on property (60-day rule)** — Competitors mention reporting and payment process. Our page does not cover the 60-day reporting requirement for UK property sales.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing step-by-step calculation guide or calculator
- Missing FAQ section with common CGT questions
- Missing table of current CGT rates and allowances
- Missing list of deductible costs with examples
- Missing section on reliefs with eligibility criteria
- missing calculator or tool

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No links to official HMRC guidance or authoritative sources
- No author credentials or expert attribution
- No references to legislation or case law
- No mention of professional advice or disclaimers

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/2027-property-tax-rates-affect-capital-gains-tax-sales
Query: "capital gains tax uk property calculator"
Position: 37 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing step-by-step CGT calculation guide with worked example. Competitors (GOV.UK, TaxScouts) show: determine gain (sale price minus purchase price minus allowable costs), apply reliefs, then apply rate. Add a full worked example: "Example: You sell a buy-to-let flat for £350,000. You bought it for £200,000. Allowable costs: estate agent fees £8,000, solicitor fees £1,500, new kitchen £15,000. Gain = £350,000 - £200,000 - £24,500 = £125,500. Annual exempt amount £3,000. Taxable gain = £122,500. If you're a basic-rate taxpayer, first £37,700 of gain at 18% = £6,786, remaining £84,800 at 24% = £20,352. Total CGT = £27,138."

2. [CRITICAL] Missing list of deductible costs when selling property. Competitors (GOV.UK, Which?) list: estate agents' fees, solicitors' fees, survey costs, stamp duty paid on purchase, costs of improvements (not repairs). Add a bullet-point list under a new H2: "What costs can you deduct when calculating CGT on property?" Include specific examples: "Replacement of a boiler (£2,500), new roof (£8,000), extension (£30,000). Do NOT deduct: redecorating, routine repairs, mortgage interest."

3. [CRITICAL] Missing section on CGT reliefs for property. Competitors (GOV.UK, TaxScouts) mention Private Residence Relief (PRR), Letting Relief (abolished from April 2020 except in limited cases), and Business Asset Disposal Relief. Add a new H2: "Capital Gains Tax reliefs for property sales" with sub-sections: Private Residence Relief (full exemption if you lived there), the final 9 months exemption rule, and the £40,000 letting relief cap for shared occupancy.

4. [HIGH] Missing current CGT rates and allowances for 2024/25. Users searching "capital gains tax uk property calculator" expect current rates. Add a table under a new H2: "Current CGT rates for residential property (2024/25)" with: Basic rate (18%), Higher/additional rate (24%), Annual exempt amount (£3,000), and note that rates change from 6 April 2025 (18% and 24% remain, but exempt amount drops to £3,000 from £6,000).

5. [HIGH] Missing 60-day reporting and payment rule. Competitors (GOV.UK) state: "You must report and pay CGT within 60 days of completing the sale of a UK residential property." Add a new H2: "How to report and pay CGT on property sales" with: "Use the 'real-time' CGT service on GOV.UK. You must file within 60 days of completion. Penalties apply for late filing: £100 initial, then daily penalties."

6. [MEDIUM] Missing special circumstances: selling a lease, part of land, compulsory purchase. Competitors (GOV.UK) cover these. Add a short paragraph under a new H2: "Special situations: selling a lease, part of land, or compulsory purchase" with: "For leases, use the lease premium rules. For part of land, apportion cost based on market values. Compulsory purchase may qualify for roll-over relief."

7. [MEDIUM] Missing FAQ section. Competitor average is 0, but user intent for "calculator" queries expects quick answers. Add 5 FAQs (see below).

TITLE/META:
Current title: 2027 Property Tax Rates CGT: How New Rules Affect Sales | Property Tax Partners
Suggested title: Capital Gains Tax UK Property Calculator: Rates & Reliefs 2024/25
Suggested meta description: Calculate CGT on your property sale. Current rates 18%/24%, £3,000 allowance, deductible costs, reliefs, and 60-day reporting. Step-by-step example included.

E-E-A-T:
- Add author byline: "By [Name], Chartered Tax Adviser, Property Tax Partners" with link to author bio page
- Add 3 external links to official HMRC guidance: (1) HMRC CGT on property page, (2) HMRC 60-day reporting page, (3) HMRC Private Residence Relief guidance
- Add a disclaimer: "This article is for general guidance only. Tax rules can change. Consult a qualified tax adviser for your specific situation."
- Add a "Last updated: [date]" line at top of article

WORD COUNT: Current 1,518. Target: 2,200-2,500 (competitor average 404, but this is a comprehensive guide page).

FAQ ADDITIONS:
1. How do I calculate capital gains tax on a property sale?
2. What costs can I deduct when selling a property for CGT?
3. What is the 60-day rule for reporting CGT on property?
4. What is the annual exempt amount for CGT in 2024/25?
5. Can I avoid CGT on my main home sale?

SCHEMA:
- Add FAQ schema (structured data) for the 5 FAQ questions above
- Add Article schema with author, datePublished, dateModified, and publisher fields
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
PAGE: 2027-property-tax-rates-affect-capital-gains-tax-sales
STATUS: complete
WORD_COUNT_BEFORE: 1518
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
