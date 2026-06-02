# Page improvement brief: mortgage-interest-tax-relief-changes-landlords

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/mortgage-interest-tax-relief-changes-landlords
- **Source file**: `(not found - search manually)`
- **Primary query**: `uk mortgage interest relief restricted for individual landlords`
- **Current avg position**: 9.8
- **Priority score**: 6.5 / 10
- **Current word count**: 2027
- **Competitor avg word count**: 1264
- **Current section count**: 13
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
| 3 | 0 | 9.8 | 0.00% | uk mortgage interest relief restricted for individual landlords |
| 2 | 0 | 10.0 | 0.00% | mortgage interest relief restricted for individual landlords uk |
| 2 | 0 | 10.0 | 0.00% | mortgage interest relief restriction uk landlords |
| 2 | 0 | 9.5 | 0.00% | uk landlord mortgage interest relief restriction |
| 1 | 0 | 9.0 | 0.00% | mortgage interest relief restricted for rental properties uk |
| 1 | 0 | 9.0 | 0.00% | uk landlord mortgage interest relief restriction basic rate |
| 1 | 0 | 10.0 | 0.00% | uk landlord mortgage interest tax relief basic rate |
| 1 | 0 | 10.0 | 0.00% | uk landlord mortgage interest relief restricted |
| 1 | 0 | 18.0 | 0.00% | home insurance postco20% tax credit on mortgage interest |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies _(parsed: 1567 words, 8 sections)_
- https://uklandlordtax.co.uk/tax-guide/restriction-of-tax-relief-on-mortgage-interest-section-24/ _(parsed: 1115 words, 2 sections)_
- https://www.gov.uk/government/publications/restricting-finance-cost-relief-for-individual-landlords/restricting-finance-cost-relief-for-individual-landlords _(parsed: 1109 words, 6 sections)_

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

- **[MEDIUM] Policy background and legislative intent** — Competitor 1 (GOV.UK) includes a 'Policy objective' section explaining the rationale (fairness) and a 'Background to the measure' (Summer Budget 2015). Our page lacks this context.
- **[HIGH] Gradual phase-in details** — Competitor 1 mentions the 4-year phase-in with specific percentages (75%, 50%, 25% relief restriction). Our page only states 'fully implemented by April 2020' without the phase-in percentages.
- **[MEDIUM] Affected landlords scope** — Competitor 1 specifies 'individuals that receive rental income on residential property in the UK or elsewhere' and excludes certain entities. Our page does not explicitly define who is affected.
- **[LOW] Monitoring and evaluation** — Competitor 1 includes a 'Monitoring and evaluation' section (tax returns). Our page lacks any mention of how the measure is monitored.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with common landlord questions
- Missing a dedicated 'Who is affected' section
- Missing a 'Policy objective' or 'Background' section explaining the rationale
- no last-updated date

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author or expert credentials displayed
- No references to official HMRC sources or legislation
- No date of last update or review

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/mortgage-interest-tax-relief-changes-landlords
Query: "uk mortgage interest relief restricted for individual landlords"
Position: 9.8 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing phase-in percentages for the 4-year transition. Competitor 1 (GOV.UK) lists exact percentages: 75% restriction in 2017/18, 50% in 2018/19, 25% in 2019/20, 0% from 2020/21. Add a new H2: "Section 24 Phase-In Timeline (2017–2020)" with a bulleted list showing each tax year and the corresponding percentage of finance costs that could be deducted (e.g., 2017/18: 75% deductible, 25% restricted). Also add a sentence: "The restriction was fully implemented by April 2020, meaning no finance costs are deductible from rental income from 2020/21 onwards."

2. [HIGH] Missing "Who is affected" section. Competitor 1 explicitly states: "Individuals that receive rental income on residential property in the UK or elsewhere" and excludes companies, trusts, and furnished holiday lettings. Add a new H2: "Who Is Affected by Section 24?" with a bulleted list: affected = individual landlords (sole traders, partnerships), unaffected = limited companies, corporate landlords, furnished holiday lettings (if qualifying). Add a sentence: "If you let residential property in the UK or abroad as an individual, you are affected. If you hold property through a limited company, you are not."

3. [MEDIUM] Missing "Policy objective" section. Competitor 1 includes a "Policy objective" paragraph explaining the rationale: fairness between individual landlords and owner-occupiers, and reducing tax relief for higher-rate taxpayers. Add a new H2: "Why Was Section 24 Introduced? (Policy Background)" with 2–3 sentences: "The government introduced Section 24 in the Summer Budget 2015 to address the perceived unfairness of individual landlords deducting all finance costs, while owner-occupiers could not. The aim was to reduce the tax advantage for higher-rate taxpayers who borrowed heavily to invest in property."

4. [MEDIUM] Missing "Monitoring and evaluation" mention. Competitor 1 includes a "Monitoring and evaluation" section referencing HMRC tax return data. Add a short paragraph under a new H3: "How HMRC Monitors Section 24 Compliance" stating: "HMRC monitors the impact of Section 24 through tax return data. Landlords must report finance costs on their self-assessment return (box 44 on the property pages). HMRC uses this data to evaluate the measure's effect on tax revenues and landlord behaviour."

5. [LOW] Missing explicit exclusion of furnished holiday lettings (FHL). Competitor 1 notes FHLs are excluded. Add a sentence in the "Who is affected" section: "Furnished holiday lettings (FHLs) that meet the qualifying conditions are exempt from Section 24. If your property qualifies as an FHL, you can still deduct all finance costs from rental income."

TITLE/META:
Current title: Section 24 Mortgage Interest Restriction | UK Guide | Property Tax Partners
Suggested title: UK Mortgage Interest Relief Restricted for Individual Landlords (max 58 chars)
Suggested meta description: Section 24 restricts mortgage interest relief for individual landlords. Learn the phase-in rules, who is affected, and how to calculate your tax impact. Updated for 2025/26. (max 155 chars)

E-E-A-T:
- Add author name and credentials at top of article: "By [Author Name], Chartered Tax Adviser, Property Tax Partners" (include a link to author bio page if exists).
- Add a "Last updated: [date]" line immediately below the H1.
- Add a footnote or inline citation: "Source: HMRC, Section 24 legislation (Finance (No.2) Act 2015, Schedule 1)" linked to GOV.UK page.
- Add a disclaimer: "This guide is for informational purposes only and does not constitute tax advice. Consult a qualified accountant for your specific circumstances."

WORD COUNT: Current 2027. Target: 2,400–2,600 (competitor average 1,264, but we need depth to rank top 3). Add ~400–600 words from the content gaps above.

FAQ ADDITIONS:
Add an FAQ section with H2: "Frequently Asked Questions About Section 24" and these exact questions:
- "Does Section 24 apply to limited companies?" (Answer: No, only individual landlords.)
- "Can I still claim mortgage interest relief if I have a furnished holiday letting?" (Answer: Yes, FHLs are exempt.)
- "How do I report restricted finance costs on my tax return?" (Answer: Use box 44 on the property pages of your self-assessment.)
- "What happens if my rental income is less than my mortgage interest?" (Answer: You cannot create a loss; the basic rate tax credit is limited to the lower of your finance costs or your property profits.)
- "Is Section 24 being reversed or changed in 2025/26?" (Answer: No, the rules remain unchanged for 2025/26.)

SCHEMA:
- Add FAQ schema (structured data) for the FAQ section.
- Add Article schema with author, datePublished, dateModified, and publisher fields.
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
PAGE: mortgage-interest-tax-relief-changes-landlords
STATUS: complete
WORD_COUNT_BEFORE: 2027
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
