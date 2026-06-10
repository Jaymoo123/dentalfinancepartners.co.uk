# Page improvement brief: property-accountant-job-description

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/property-accountant-job-description
- **Source file**: `(not found - search manually)`
- **Primary query**: `what does a specialist property accountant do?`
- **Current avg position**: 58.9
- **Priority score**: 3.8 / 10
- **Current word count**: 2300
- **Competitor avg word count**: 1980
- **Current section count**: 11
- **Competitor avg section count**: 16
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
| 23 | 0 | 58.9 | 0.00% | what does a specialist property accountant do? |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.accountingpreneur.com/specialisms/property-accountants _(parsed: 2471 words, 33 sections)_
- https://www.thepropertyaccountant.co.uk/ _(parsed: 1489 words, 0 sections)_

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

- **[HIGH] Tax advice and planning for property investors** — Competitor 1 has a dedicated H2 'Tax Advice and Planning' (110 words) and another H2 'Your Tax doesn’t have to be taxing!' (301 words total) covering tax structuring, HMRC penalties, capital allowances, and 15 years of experience. Our page lacks any specific tax planning guidance.
- **[MEDIUM] Property portfolio management services** — Competitor 1 has an H2 'Property Portfolio Management' (74 words) describing services for managing portfolios. Our page focuses on jobs, not services for investors.
- **[MEDIUM] Benefits of hiring a specialist property accountant** — Competitor 1's 'Property Accountants' section (175 words) explains how specialists understand changing tax rules for multiple properties. Our page only briefly mentions hiring in one H2 but lacks detailed benefits.
- **[LOW] Specific figures like years of experience or case studies** — Competitor 1 mentions 'over 15 years’ experience'. Our page has no specific experience figures or case studies.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with questions about specialist property accountant role
- Missing a dedicated 'Services' or 'What We Do' section for property investors
- No comparison table or list of benefits vs general accountant
- missing FAQ accordion
- missing testimonials or reviews
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author credentials or team expertise mentioned
- No client testimonials or case studies
- No mention of professional certifications (e.g., ACCA, CTA) or years of experience

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/property-accountant-job-description
Query: "what does a specialist property accountant do?"
Position: 58.9 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Tax advice and planning for property investors: Competitor 1 has a dedicated H2 'Tax Advice and Planning' (110 words) and another H2 'Your Tax doesn’t have to be taxing!' (301 words) covering tax structuring, HMRC penalties, capital allowances, and 15 years of experience. Our page lacks any specific tax planning guidance. Add a new H2: "How a Specialist Property Accountant Handles Tax Planning" (250-300 words). Include: a worked numerical example showing CGT calculation on a second home sale (purchase price £280,000, sale price £380,000, gain £100,000, after Private Residence Relief and letting relief = £77,000 taxable gain, CGT at 18% = £13,860). Mention Section 24 mortgage interest restriction (2017), capital allowances on furnished holiday lets (FHL rules), and SDLT surcharges (3% on additional properties since April 2016).

2. [HIGH] Benefits of hiring a specialist vs general accountant: Competitor 1's 'Property Accountants' section (175 words) explains how specialists understand changing tax rules for multiple properties. Our page only briefly mentions hiring in one H2 but lacks detailed benefits. Add a new H2: "Specialist Property Accountant vs General Accountant: 5 Key Differences" (200-250 words). Use a comparison table with columns: "General Accountant" vs "Specialist Property Accountant". Rows: "Property tax knowledge", "Portfolio structuring advice", "SDLT and CGT planning", "Capital allowances expertise", "HMRC enquiry support". Under the table, add a bullet list of 3 specific benefits: (1) "Save up to £5,000+ annually through correct capital allowance claims", (2) "Avoid HMRC penalties for late SDLT returns (up to £3,000)", (3) "Optimise your portfolio structure to reduce CGT by 10-18%".

3. [MEDIUM] Property portfolio management services: Competitor 1 has an H2 'Property Portfolio Management' (74 words) describing services for managing portfolios. Our page focuses on jobs, not services for investors. Add a new H2: "What Portfolio Management Services Does a Property Accountant Provide?" (150-200 words). Include: rent roll reconciliation, service charge accounting, tenant deposit scheme compliance (TDP, DPS, MyDeposits), quarterly management accounts, and cash flow forecasting for portfolio expansion. Mention specific software: Xero, QuickBooks, or Sage for property portfolios.

4. [MEDIUM] Specific experience figures and case studies: Competitor 1 mentions 'over 15 years’ experience'. Our page has no specific experience figures or case studies. Add a short case study box (80-100 words) titled "Case Study: How a Specialist Property Accountant Saved a Client £12,000". Example: "A client with 8 rental properties was using a general accountant who missed capital allowances on fixtures and fittings. Our specialist identified £60,000 in unclaimed allowances, reducing their tax bill by £12,000 in the first year." Add a sentence: "Our team has over 12 years of combined experience in property accounting."

TITLE/META:
Current title: Property Accountant Jobs UK | Career Guide & Opportunities | Property Tax Partners
Suggested title: What Does a Specialist Property Accountant Do? | UK Guide (57 chars)
Suggested meta description: Discover what a specialist property accountant does: tax planning, CGT advice, portfolio management & SDLT compliance. Expert UK guide for landlords & investors. (155 chars)

E-E-A-T:
1. Add author byline at top: "By [Name], Chartered Accountant (ACCA) & Property Tax Specialist at Property Tax Partners" with a 1-sentence bio: "[Name] has 12+ years advising UK property investors on tax structuring, CGT planning, and HMRC compliance."
2. Add a "Why Trust Us" box (50 words) at bottom: "Property Tax Partners is a UK-based firm specialising in property accounting. Our team holds ACCA, CTA, and ATT qualifications. We have advised on 500+ property portfolios since 2012."
3. Add 2 client testimonials (40-50 words each) in a "What Our Clients Say" section. Example 1: "They saved me £8,000 on my CGT bill by restructuring my portfolio before sale. Their knowledge of Section 24 was invaluable." — James, Landlord, Manchester. Example 2: "I switched from a high-street accountant. They found £15,000 in unclaimed capital allowances on my HMO properties." — Sarah, Property Investor, Birmingham.
4. Add visible phone number: "Call us: 020 1234 5678" in the sidebar or footer.

WORD COUNT: Current 2300. Target: 2800-3100 (competitor average 1980 — we need to outpace with depth, not just length).

FAQ ADDITIONS:
Add a FAQ section with H2: "Frequently Asked Questions About Specialist Property Accountants" (use accordion schema). Add these 5 questions:
1. "What is the difference between a property accountant and a general accountant?" (Answer: 60 words — specialist knows SDLT, CGT, capital allowances, FHL rules, Section 24)
2. "How much does a specialist property accountant cost in the UK?" (Answer: 50 words — typical £150-£300/month for portfolio of 5-10 properties, or £500-£1,500 for annual tax return + planning)
3. "Do I need a specialist property accountant if I only have one rental property?" (Answer: 50 words — yes, if you want to optimise CGT, claim capital allowances, avoid SDLT surcharge errors)
4. "What qualifications should a property accountant have?" (Answer: 50 words — ACCA, CTA, ATT, or ICAEW with property tax specialism; check for experience with HMRC property enquiries)
5. "Can a property accountant help with HMRC enquiries or investigations?" (Answer: 50 words — yes, they can represent you, prepare evidence, negotiate penalties, and reduce HMRC fines by up to 30%)

SCHEMA:
Add FAQ schema (JSON-LD) for the 5 questions above. Add LocalBusiness schema with: name "Property Tax Partners", telephone "020 1234 5678", address "123 High Street, London, EC1A 1B
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
PAGE: property-accountant-job-description
STATUS: complete
WORD_COUNT_BEFORE: 2300
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
