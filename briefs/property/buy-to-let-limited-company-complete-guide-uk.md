# Page improvement brief: buy-to-let-limited-company-complete-guide-uk

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk
- **Source file**: `Property/web/content/blog/buy-to-let-limited-company-complete-guide-uk.md`
- **Primary query**: `create btl limited company uk`
- **Current avg position**: 52.0
- **Priority score**: 4.9 / 10
- **Current word count**: 1299
- **Competitor avg word count**: 2755
- **Current section count**: 13
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
| 1 | 0 | 52.0 | 0.00% | create btl limited company uk |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.fdcommercial.co.uk/buy-to-let-mortgages/limited-company-buy-to-let-mortgage/ _(parsed: 2755 words, 9 sections)_

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

- **[HIGH] SPV structure and lender requirements** — Competitor 1 has a dedicated H2 'SPV structure and lender requirements' explaining that most lenders require a Special Purpose Vehicle. Our page lacks any mention of SPV or specific lender requirements.
- **[HIGH] Interest Cover Ratio and affordability** — Competitor 1 covers ICR as a key affordability metric, including how rental income must cover interest. Our page does not mention ICR or specific affordability calculations.
- **[MEDIUM] Lender landscape and pricing** — Competitor 1 notes high street lenders have withdrawn from limited company BTL and mainstream products exclude corporate borrowers. Our page lacks this market context.
- **[MEDIUM] Top slicing and personal income** — Competitor 1 explains top slicing where lenders assess director's personal income. Our page does not cover this mortgage technique.
- **[MEDIUM] HMO and multi-unit freehold through a limited company** — Competitor 1 has a section on HMO and MUFB finance via SPV. Our page does not address HMOs or multi-unit properties.
- **[HIGH] The application process with specific figures** — Competitor 1 details the application process with specific figures: £150, £300, 6 weeks, £1,350. Our page lacks any step-by-step application process or cost examples.
- **[MEDIUM] Frequently asked questions** — Competitor 1 has an FAQ section (though empty in snippet). Our page has no FAQ section at all.

## DeepSeek query gaps (keyword density)

- `company`: us 29× vs competitors avg 64×
- `btl`: us 0× vs competitors avg 22×
- `limited`: us 12× vs competitors avg 31×

## DeepSeek structural gaps

- Missing FAQ section
- Missing step-by-step application process section
- Missing dedicated sections on SPV, ICR, lender landscape, top slicing, HMO/MUFB
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials
- No references to industry bodies (e.g., ARLA, FCA)
- No case studies or real-world examples with figures
- No mention of professional qualifications or experience

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk
Query: "create btl limited company uk"
Position: 52 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):

1. [CRITICAL] SPV structure and lender requirements: Competitor 1 has a dedicated H2 'SPV structure and lender requirements' explaining that most lenders require a Special Purpose Vehicle. Our page lacks any mention of SPV or specific lender requirements. Add a new H2: "Why Lenders Require an SPV (Special Purpose Vehicle) for BTL Limited Companies" with 200-250 words explaining that most high street lenders mandate a company whose sole purpose is property letting, with no other trade or income. Include: "If your company also runs a consulting business, most lenders will decline the mortgage. You must register the company with SIC code 68209 (Letting and operating of own or leased real estate)."

2. [CRITICAL] Interest Cover Ratio (ICR) and affordability: Competitor 1 covers ICR as a key affordability metric, including how rental income must cover interest. Our page does not mention ICR or specific affordability calculations. Add a new H2: "Interest Cover Ratio (ICR): The Key Affordability Metric for BTL Limited Companies" with 150-200 words. Include: "Most lenders require an ICR of 125-145% for limited company BTL. For example: if your mortgage interest is £8,000 per year, your rental income must be at least £10,000 (125% ICR). For higher-rate taxpayers, lenders often apply 145% ICR, meaning £11,600 rental income needed on the same £8,000 interest."

3. [HIGH] Lender landscape and pricing: Competitor 1 notes high street lenders have withdrawn from limited company BTL and mainstream products exclude corporate borrowers. Our page lacks this market context. Add 100-150 words under a new H3: "Current Lender Landscape for Limited Company BTL" within the Mortgage Considerations section. Include: "As of 2026, Barclays, NatWest, and HSBC have significantly reduced limited company BTL offerings. Specialist lenders like The Mortgage Works, Fleet Mortgages, and Kent Reliance now dominate, typically charging 0.5-1.5% higher rates than personal BTL products."

4. [MEDIUM] Top slicing and personal income: Competitor 1 explains top slicing where lenders assess director's personal income. Our page does not cover this mortgage technique. Add 100-150 words under a new H3: "Top Slicing: Using Your Personal Income to Boost Affordability" within the Mortgage Considerations section. Include: "If rental income alone doesn't meet ICR requirements, some lenders allow 'top slicing' — adding your personal salary or dividends to the rental income calculation. For example: rental income £12,000, mortgage interest £10,000, ICR 120% (below 125% threshold). If your personal income is £40,000, a top-slicing lender may accept the application."

5. [MEDIUM] HMO and multi-unit freehold through a limited company: Competitor 1 has a section on HMO and MUFB finance via SPV. Our page does not address HMOs or multi-unit properties. Add a new H2: "Financing HMOs and Multi-Unit Freehold Blocks Through a Limited Company" with 150-200 words. Include: "HMO mortgages through a limited company typically require a minimum of 4 bedrooms, a mandatory HMO licence from the local council, and lenders often apply a 150-160% ICR. For MUFB (multi-unit freehold blocks), lenders usually require a minimum of 5 units and may cap the loan at 65-70% LTV."

6. [HIGH] The application process with specific figures: Competitor 1 details the application process with specific figures: £150, £300, 6 weeks, £1,350. Our page lacks any step-by-step application process or cost examples. Add a new H2: "Step-by-Step Application Process for a BTL Limited Company Mortgage" with 250-300 words. Include a numbered list: "1. Company formation: £12-50 via Companies House (same day). 2. Find a specialist broker: typically charges £300-500 upfront. 3. Submit application: lender takes 2-4 weeks. 4. Valuation: £150-350 for a standard property. 5. Legal work: £750-1,500 for conveyancing. 6. Completion: total timeline 6-10 weeks from application."

7. [MEDIUM] Frequently asked questions: Competitor 1 has an FAQ section (though empty in snippet). Our page has no FAQ section at all. Add an FAQ section with 5-7 questions (see FAQ ADDITIONS below).

TITLE/META:
Current title: Buy-to-Let Limited Company UK 2026 | Tax Guide | Property Tax Partners
Suggested title: Create a BTL Limited Company UK 2026 | Step-by-Step Guide (58 chars)
Suggested meta description: How to create a buy-to-let limited company UK. SPV requirements, ICR calculations, lender rules, and costs. Complete guide for 2026. (120 chars)

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser (CTA) and Property Tax Specialist at Property Tax Partners" at top of article
- Add a "Why Trust This Guide" box (100 words) stating: "This guide is based on current HMRC legislation, FCA-regulated lender criteria, and our experience advising 200+ property investors on incorporation since 2018."
- Add 2 real-world case studies with figures: "Case Study 1: Sarah incorporated her 3-property portfolio in 2024. Purchase prices: £180,000, £220,000, £195,000. Total CGT saved: £14,200 vs personal ownership. Case Study 2: James set up an SPV for a 5-bed HMO in Manchester. Mortgage: £275,000 at 4.5% over 25 years. ICR: 140% met with £24,000 annual rent."
- Add a visible phone number: "Call our property tax team: 020 7123 4567" in the author box or sidebar

WORD COUNT: Current 1,299. Target: 2,500-3,000 (competitor average 2,755).

FAQ ADDITIONS:
Add these exact FAQ questions with 50-100 word answers each:
1. "How much does it cost to create a BTL limited company UK?" — Include: "Company formation: £12-50. Mortgage arrangement fee: £0-1,995. Valuation: £150-350. Legal fees: £750-1,500. Total upfront: £912-3,895."
2. "Do I need an SPV for a buy-to-let limited company?" — Include: "Yes, most l
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
PAGE: buy-to-let-limited-company-complete-guide-uk
STATUS: complete
WORD_COUNT_BEFORE: 1299
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
