# Page improvement brief: residential-property-developer-tax-uk

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/residential-property-developer-tax-uk
- **Source file**: `Property/web/content/blog/residential-property-developer-tax-uk.md`
- **Primary query**: `property development tax planning`
- **Current avg position**: 53.0
- **Priority score**: 4.5 / 10
- **Current word count**: 941
- **Competitor avg word count**: 510
- **Current section count**: 10
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
| 1 | 0 | 30.0 | 0.00% | paying tax on property development |
| 1 | 0 | 53.0 | 0.00% | property development tax planning |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://nmec.org.uk/property/property-development-and-tax-what-you-need-to-know/ _(parsed: 510 words, 1 sections)_

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

- **[HIGH] SDLT surcharges for property developers** — Competitors cover SDLT surcharges (e.g., 3% surcharge on additional dwellings, 15% rate for companies) and how they apply to developers. Our page lacks any mention of SDLT.
- **[HIGH] VAT on property development (new builds vs conversions, option to tax)** — Competitors explain VAT treatment: zero-rating for new builds, reduced rate for conversions, and option to tax for commercial properties. Our page omits VAT entirely.
- **[HIGH] Capital Gains Tax (CGT) vs Income Tax on development profits** — Competitors detail the distinction between trading profits (income tax) and investment gains (CGT), including the impact of incorporation and principal private residence relief. Our page only briefly mentions income tax.
- **[MEDIUM] Corporation Tax rates for property development companies** — Competitors cite specific rates: 19% main rate, 25% from April 2023 for profits over £250k, and marginal relief. Our page lacks these figures.
- **[MEDIUM] Tax relief for development finance costs (interest, loan fees)** — Competitors explain how interest on development loans is deductible as a trading expense, and restrictions under corporate interest restriction rules. Our page does not cover financing costs.
- **[MEDIUM] Stamp Duty Land Tax (SDLT) multiple dwellings relief and mixed-use relief** — Competitors discuss SDLT reliefs available for developers buying multiple units or mixed-use properties. Our page has no SDLT content.
- **[MEDIUM] Tax implications of joint ventures and partnerships in property development** — Competitors cover how profits are taxed in JVs, partnership tax returns, and allocation of profits. Our page does not address this structure.
- **[LOW] Making Tax Digital (MTD) for property developers** — Competitors mention MTD requirements for VAT and income tax, and digital record-keeping obligations. Our page only briefly mentions record keeping.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing a dedicated section on SDLT (Stamp Duty Land Tax)
- Missing a section on VAT (including zero-rating, option to tax)
- Missing a section on Capital Gains Tax vs Income Tax
- Missing a section on Corporation Tax rates and thresholds
- Missing a section on financing costs and interest relief
- Missing a section on joint ventures and partnerships
- No FAQ section with actual questions and answers (current FAQ section is empty)
- No table comparing tax treatments (e.g., sole trader vs company vs LLP)
- No case study or example calculations
- no author attribution
- no last-updated date

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials (e.g., 'Written by a Chartered Tax Adviser')
- No references to HMRC guidance or official publications (e.g., HMRC manuals, SP 1/2018)
- No client testimonials or case studies demonstrating expertise
- No date of last review or update (page title says '2026' but no review date in content)
- No links to professional bodies (e.g., CIOT, ATT, ICAEW)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF  
Page: /blog/incorporation-and-company-structures/residential-property-developer-tax-uk  
Query: "property development tax planning"  
Position: 53.0 -> target: top 3  
Priority score: 9.2/10  

CONTENT GAPS (fix in order):  

1. [CRITICAL] **SDLT surcharges for property developers**  
   Competitors detail the 3% surcharge on additional dwellings (effective from April 2016) and the 15% flat rate for companies buying residential properties over £500k. Our page has zero SDLT content.  
   **Add:** A new H2 section: "Stamp Duty Land Tax (SDLT) for Property Developers" with:  
   - Explanation of the 3% surcharge on additional dwellings (e.g., buy-to-let, second homes)  
   - The 15% rate for companies purchasing residential property over £500k (unless reliefs apply)  
   - Multiple Dwellings Relief (MDR) – how it works for bulk purchases (e.g., 5+ flats)  
   - Mixed-use relief (e.g., shop with flat above) – 0% residential surcharge applies  
   - Example: "A developer buys 10 flats at £200k each. Without MDR: SDLT on each flat at 3% surcharge = £6,000 per flat. With MDR: average price per flat = £200k, SDLT at 3% = £6,000 per flat, but MDR reduces rate to 1% on first £250k = £2,000 per flat. Total saving: £40,000."  

2. [CRITICAL] **VAT on property development (new builds vs conversions, option to tax)**  
   Competitors explain zero-rating for new-build residential properties (VAT at 0%), reduced rate 5% for conversions (e.g., barn to house), and option to tax for commercial properties (allows input VAT recovery). Our page omits VAT entirely.  
   **Add:** A new H2 section: "VAT Treatment for Property Developers" with:  
   - Zero-rating: New-build residential properties – no VAT charged to buyer, developer can recover input VAT on costs  
   - Reduced rate 5%: Conversions of non-residential to residential (e.g., office to flats)  
   - Option to tax: For commercial properties – allows developer to charge 20% VAT and recover input VAT on construction costs  
   - Example: "A developer builds 5 new houses. Construction costs £1m + VAT £200k. Developer charges buyer £500k per house (no VAT). Developer reclaims the £200k input VAT from HMRC. Net VAT cost: £0."  

3. [CRITICAL] **Capital Gains Tax (CGT) vs Income Tax on development profits**  
   Competitors detail the distinction: trading profits (income tax) vs investment gains (CGT at 18%/24% for residential, 10%/20% for commercial). Our page only briefly mentions income tax.  
   **Add:** A new H2 section: "Capital Gains Tax vs Income Tax on Development Profits" with:  
   - Key test: HMRC’s badges of trade (e.g., intention to profit, frequency, organisation)  
   - If trading: profits taxed as income (20%/40%/45% for individuals, 19%/25% for companies)  
   - If investment: CGT at 18%/24% for residential property, 10%/20% for commercial  
   - Principal Private Residence Relief (PPR) – only available if property is main residence, not for trading  
   - Example: "Developer buys land for £100k, builds 3 houses, sells for £200k each. If trading: profit £500k, taxed at 40% = £200k income tax. If investment: gain £500k, CGT at 24% = £120k. Difference: £80k."  

4. [HIGH] **Corporation Tax rates for property development companies**  
   Competitors cite specific rates: 19% main rate (2023), 25% from April 2023 for profits over £250k, marginal relief between £50k-£250k. Our page lacks these figures.  
   **Add:** A new H2 section: "Corporation Tax Rates for Property Development Companies" with:  
   - Current rates: 19% for profits up to £50k, 25% for profits over £250k, marginal relief between £50k-£250k (effective rate ~26.5% on profits between £50k-£250k)  
   - Example: "A development company makes £300k profit. Tax: first £50k at 19% = £9,500; next £200k at 26.5% = £53,000; last £50k at 25% = £12,500. Total: £75,000."  

5. [HIGH] **Tax relief for development finance costs (interest, loan fees)**  
   Competitors explain how interest on development loans is deductible as a trading expense, and restrictions under corporate interest restriction rules (for companies with net interest over £2m). Our page does not cover financing costs.  
   **Add:** A new H2 section: "Tax Relief for Development Finance Costs" with:  
   - Interest on development loans: fully deductible as trading expense if used wholly for trade  
   - Loan arrangement fees: deductible over loan term (e.g., 2% fee on £1m loan = £20k, spread over 5 years = £4k/year)  
   - Corporate interest restriction: For companies with net interest expense over £2m, deduction capped at 30% of EBITDA  
   - Example: "Developer borrows £500k at 6% interest = £30k/year. If trading, this is deductible against profits. If investment, interest is deductible against rental income only."  

6. [MEDIUM] **Stamp Duty Land Tax (SDLT) multiple dwellings relief and mixed-use relief**  
   Competitors discuss MDR (for 2+ dwellings) and mixed-use relief (e.g., shop with flat). Our page has no SDLT content.  
   **Add:** Within the SDLT section (point 1), include:  
   - MDR: For 2+ dwellings, SDLT calculated on average price per dwelling, then multiplied by number of dwellings. Minimum rate 1% on first £250k.  
   - Mixed-use relief: For properties with both residential and non-residential elements (e.g., pub with flat), SDLT at commercial rates (0% up to £150k, 2% £150k-£250k, 5% over £250k) – no 3% surcharge.  

7. [MEDIUM] **Tax implications of joint ventures and partnerships in property development**  
   Competitors cover how profits are taxed in JVs, partnership tax returns, and allocation of profits. Our page does not address this structure.  
   **Add:** A new H2 section: "Tax Implications of Joint Ventures and Partnerships" with:  
   - Partnership: Each partner taxed on their share of profits (income tax or corporation tax depending on partner type)  
   - Joint venture (corporate): Each company taxed separately on its share of profits  
   - Example: "Two developers form a
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
PAGE: residential-property-developer-tax-uk
STATUS: complete
WORD_COUNT_BEFORE: 941
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
