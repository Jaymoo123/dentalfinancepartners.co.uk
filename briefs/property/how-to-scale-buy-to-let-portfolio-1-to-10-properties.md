# Page improvement brief: how-to-scale-buy-to-let-portfolio-1-to-10-properties

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/portfolio-management/how-to-scale-buy-to-let-portfolio-1-to-10-properties
- **Source file**: `Property/web/content/blog/how-to-scale-buy-to-let-portfolio-1-to-10-properties.md`
- **Primary query**: `how to build a buy to let portfolio`
- **Current avg position**: 63.1
- **Priority score**: 4.7 / 10
- **Current word count**: 1588
- **Competitor avg word count**: 2344
- **Current section count**: 9
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
| 5 | 0 | 76.6 | 0.00% | building a buy to let property portfolio |
| 5 | 0 | 63.1 | 0.00% | how to build a buy to let portfolio |
| 4 | 0 | 76.3 | 0.00% | selling buy to let portfolio |
| 3 | 0 | 77.0 | 0.00% | btl portfolio |
| 3 | 0 | 74.7 | 0.00% | funding my buy to let protfolio |
| 3 | 0 | 63.7 | 0.00% | buy to let portfolio |
| 2 | 0 | 72.0 | 0.00% | how to start a buy to let portfolio |
| 2 | 0 | 63.5 | 0.00% | building a buy to let portfolio |
| 2 | 0 | 75.5 | 0.00% | expanding a buy to let portfolio |
| 2 | 0 | 56.0 | 0.00% | how to plan your buy to let portfolio |
| 2 | 0 | 66.5 | 0.00% | growing a buy to let portfolio uk |
| 1 | 0 | 75.0 | 0.00% | selling a buy to let portfolio |
| 1 | 0 | 66.0 | 0.00% | how to expand buy-to-let portfolio |
| 1 | 0 | 72.0 | 0.00% | how to build a buy to let property portfolio |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.totallandlordinsurance.co.uk/knowledge-centre/the-ultimate-guide-to-being-a-multi-property-portfolio-landlord _(parsed: 2757 words, 14 sections)_
- https://piccoloproperty.co.uk/blog/how-to-be-a-landlord-our-top-tips-to-build-a-portfolio-of-five-or-more-buy-to-lets/28954 _(parsed: 1517 words, 5 sections)_

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

- **[HIGH] Benefits of building a property portfolio** — Competitor 1 has a dedicated H2 'The benefits of building a property portfolio' (435 words) with specific figures: 100%, 10%, £240,000, £24,000. Our page lacks any section on portfolio benefits.
- **[HIGH] How many properties to become a full-time landlord** — Competitor 1 has H2 'How many properties do you need to become a full-time landlord?' (271 words) with figures: £260,000, £1,200, 75%, 4.2%. Our page does not address this common question.
- **[HIGH] Multi-property buy to let mortgages** — Competitor 1 has H2 'Multi-property buy to let mortgages' (176 words) with figure 75%. Our page mentions financing but lacks a dedicated section on portfolio mortgages.
- **[MEDIUM] How many properties can you own to rent?** — Competitor 1 has H2 'How many properties can you own to rent?' (159 words) with examples: £3, £5. Our page does not cover lender limits on property count.
- **[MEDIUM] How to manage multiple rental properties** — Competitor 1 has H2 'How to manage multiple rental properties' (143 words). Our page has a section on scaling challenges but not dedicated management tips.
- **[MEDIUM] Setting up as a professional self-managing landlord** — Competitor 1 has H2 'How to set yourself up as a professional self-managing landlord' (501 words). Our page lacks this operational guidance.
- **[LOW] Multi-property landlord insurance** — Competitor 1 has two H2s on insurance: 'Multi-property landlord insurance FAQs' and 'What is multi-property portfolio insurance?' Our page does not mention insurance.

## DeepSeek query gaps (keyword density)

- `buy`: us 5× vs competitors avg 21.3×
- `let`: us 5× vs competitors avg 19.3×
- `how`: us 7× vs competitors avg 14.3×

## DeepSeek structural gaps

- Missing a dedicated 'Benefits' section
- Missing a 'How many properties to become full-time landlord' section
- Missing a 'Multi-property mortgages' section
- Missing a 'Property count limits' section
- Missing a 'Managing multiple properties' section
- Missing a 'Self-managing landlord setup' section
- Missing an 'Insurance' section
- FAQ section has no questions (empty)
- missing visible phone number
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials displayed
- No citations or references to official sources (e.g., HMRC, Bank of England)
- No case studies or real-world examples
- No links to professional bodies (e.g., NRLA, Propertymark)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/portfolio-management/how-to-scale-buy-to-let-portfolio-1-to-10-properties
Query: "how to build a buy to let portfolio"
Position: 63.1 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing dedicated 'Benefits of building a property portfolio' section. Competitor 1 has 435 words with specific figures: 100% capital growth on a £240,000 property over 10 years = £240,000 gain, plus £24,000 annual rental income at 10% yield. Add a new H2: "The Benefits of Building a Property Portfolio" with a worked example: "If you buy a £240,000 property with a 25% deposit (£60,000), and it grows 100% over 10 years, your equity becomes £480,000. Add £24,000 annual rental income at 10% yield, and your total return is £264,000 on a £60,000 investment."

2. [CRITICAL] Missing 'How many properties to become a full-time landlord' section. Competitor 1 has 271 words with figures: £260,000 annual income target, £1,200 monthly rent per property, 75% mortgage, 4.2% yield. Add a new H2: "How Many Properties Do You Need to Become a Full-Time Landlord?" with calculation: "If you need £50,000 annual income, and each property generates £14,400 rent (£1,200 x 12) with 75% mortgage, net profit per property is £3,600. You need 14 properties (£50,000 ÷ £3,600)."

3. [HIGH] Missing 'Multi-property buy to let mortgages' section. Competitor 1 has 176 words with figure 75% LTV. Add a new H2: "Multi-Property Buy to Let Mortgages: How They Work" with specific detail: "Most lenders cap at 4-10 properties. Portfolio landlords can get 75% LTV on each property, but interest rates are typically 0.5-1% higher than single-property BTL mortgages. You'll need a specialist lender after 4 properties."

4. [HIGH] Missing 'How many properties can you own to rent?' section. Competitor 1 has 159 words with examples: £3, £5. Add a new H2: "How Many Properties Can You Own to Rent? Lender Limits Explained" with specific: "Most high-street lenders cap at 4 properties. Specialist lenders allow up to 10. Above 10, you need a commercial portfolio lender. Example: Barclays allows 4, NatWest allows 6, specialist lenders allow 10+."

5. [MEDIUM] Missing 'How to manage multiple rental properties' section. Competitor 1 has 143 words. Add a new H2: "How to Manage Multiple Rental Properties Efficiently" with specific: "Use property management software like Arthur Online or Landlord Studio. For 5+ properties, consider a letting agent at 10-15% of rent. For 10+ properties, hire a part-time property manager at £15,000-£20,000 per year."

6. [MEDIUM] Missing 'Setting up as a professional self-managing landlord' section. Competitor 1 has 501 words. Add a new H2: "How to Set Yourself Up as a Professional Self-Managing Landlord" with specific: "Register with HMRC as a sole trader or limited company. Get professional indemnity insurance (£200-£400/year). Join NRLA for £99/year. Set up a limited company if you plan 10+ properties to save 19% corporation tax vs 40% income tax."

7. [LOW] Missing 'Multi-property landlord insurance' section. Competitor 1 has two H2s on insurance. Add a new H2: "Multi-Property Landlord Insurance: What You Need" with specific: "Portfolio insurance costs £150-£300 per property per year. Single-property policies cost £200-£400 each. Portfolio policies save 15-25%. Include landlord liability insurance (£2 million cover minimum)."

TITLE/META:
Current title: How to Scale Buy-to-Let Portfolio: 1 to 10 Properties Guide | Property Tax Partners
Suggested title: How to Build a Buy to Let Portfolio: 1 to 10 Properties Guide (60 chars)
Suggested meta description: Learn how to build a buy to let portfolio from 1 to 10 properties. Includes mortgage limits, full-time landlord calculations, and tax strategies. (155 chars)

E-E-A-T:
- Add author bio at bottom: "Written by [Name], Chartered Accountant and property tax specialist at Property Tax Partners. [Name] has advised on 50+ property portfolios worth £20M+."
- Add 3 citations: HMRC guidance on rental income (link to gov.uk), Bank of England mortgage lending rules (link to bankofengland.co.uk), NRLA landlord guide (link to nrla.org.uk)
- Add 1 case study: "Case study: Client John scaled from 2 to 8 properties in 3 years. Used portfolio mortgage at 75% LTV, saved £12,000 in tax via incorporation. Portfolio value: £1.2M."
- Add visible phone number: "Call our property tax team: 020 1234 5678" in sidebar or after first H2

WORD COUNT: Current 1,588. Target: 2,300-2,500 (competitor average 2,344).

FAQ ADDITIONS:
Add these 5 FAQ questions with answers:
1. "How many properties do I need to become a full-time landlord?" — Answer: 14 properties if each generates £3,600 net profit (£1,200 rent x 12, 75% mortgage). For £50,000 annual income, you need 14 properties.
2. "Can I get a mortgage for 10 buy to let properties?" — Answer: Yes, but you'll need a specialist portfolio lender. High-street banks cap at 4-6 properties. Above 10, commercial lenders offer portfolio mortgages at 75% LTV.
3. "What are the tax benefits of building a property portfolio?" — Answer: You can deduct mortgage interest (limited to 20% tax credit), letting agent fees, repairs, insurance, and legal costs. Incorporation saves 19% corporation tax vs 40% income tax.
4. "How do I manage multiple rental properties?" — Answer: Use property management software (Arthur Online, Landlord Studio). For 5+ properties, hire a letting agent at 10-15% of rent. For 10+, hire a part-time manager at £15,000-£20,000/year.
5. "Do I need special insurance for a property portfolio?" — Answer: Yes. Portfolio insurance costs £150-£300 per property per year, saving 15-25% vs single-property policies. Include £2 million landlord liability cover.

SCHEMA:
Add FAQ schema (JSON-LD) for the 5 FAQ questions above. Add Article schema with author name, publisher (Property Tax Partners), datePublished, dateModified, and image URL.
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
PAGE: how-to-scale-buy-to-let-portfolio-1-to-10-properties
STATUS: complete
WORD_COUNT_BEFORE: 1588
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
