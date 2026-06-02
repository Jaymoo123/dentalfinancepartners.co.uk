# Page improvement brief: cgt-payment-deadlines-property-sales-2026

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026
- **Source file**: `Property/web/content/blog/cgt-payment-deadlines-property-sales-2026.md`
- **Primary query**: `hmrc cgt reporting deadlines 2026`
- **Current avg position**: 11.7
- **Priority score**: 5.4 / 10
- **Current word count**: 1132
- **Competitor avg word count**: 454
- **Current section count**: 11
- **Competitor avg section count**: 2
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
| 66 | 0 | 11.0 | 0.00% | hmrc cgt reporting deadlines 2026 |
| 32 | 0 | 2.3 | 0.00% | uk cgt residential property reporting deadlines payment 2025 2026 |
| 19 | 0 | 3.4 | 0.00% | uk cgt reporting deadline for property sale 2026 |
| 19 | 0 | 1.0 | 0.00% | uk capital gains tax on residential property sale reporting payment deadlines 2025 2026 |
| 16 | 0 | 2.9 | 0.00% | uk hmrc cgt on uk residential property reporting deadlines payment 2025 2026 |
| 13 | 0 | 1.5 | 0.00% | hmrc cgt on uk property reporting deadlines payment 2025 2026 |
| 9 | 0 | 3.5 | 0.00% | uk hmrc cgt on uk residential property reporting payment deadlines 2025 2026 |
| 8 | 0 | 1.4 | 0.00% | uk cgt reporting deadline for residential property sale 2026 |
| 6 | 0 | 5.8 | 0.00% | uk cgt reporting deadlines for residential property 2025 2026 |
| 6 | 0 | 3.0 | 0.00% | uk cgt reporting deadline residential property 2026 |
| 4 | 0 | 2.3 | 0.00% | uk capital gains tax on residential property disposals reporting payment deadlines 2025 2026 |
| 2 | 0 | 1.5 | 0.00% | uk capital gains tax on residential property sale reporting payment deadlines 2026 |
| 1 | 0 | 6.0 | 0.00% | when is cgt payable on sale of property |
| 1 | 0 | 4.0 | 0.00% | i sold a uk residential property — how do i report and pay uk capital gains tax on the disposal? what documentation and calculations will i need, what are the filing deadlines and payment procedures, and where can i find professional help? |
| 1 | 0 | 3.0 | 0.00% | uk capital gains tax on residential property disposals report pay deadlines 2026 |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-have-other-capital-gains-to-report _(parsed: 454 words, 2 sections)_

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

- **[HIGH] Reporting other capital gains (not just property) via real-time service** — Competitor 1 (GOV.UK) covers reporting gains on assets other than property using the 'real time' Capital Gains Tax service, including specific tax years (2025 to 2026, 2026 to 2027). Our page focuses only on property sales.
- **[MEDIUM] Self Assessment reporting option for capital gains** — Competitor 1 explains that gains can be reported in a Self Assessment tax return in the tax year after disposal. Our page mentions Self Assessment deadlines but does not detail this alternative reporting route.
- **[HIGH] Specific penalty amounts for late reporting** — Competitor 1 (implied by GOV.UK) likely includes penalty details. Our page mentions 'automatic penalties' but does not state exact figures (e.g., £100 initial penalty, daily penalties, etc.).

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing a clear comparison table of 60-day vs Self Assessment deadlines
- No step-by-step guide on how to use the real-time CGT service
- Lack of a dedicated section on 'Who must use the 60-day rule vs Self Assessment'

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax accountant, CTA) to establish expertise
- No references to HMRC official guidance or legislation (e.g., TCGA 1992)
- No case studies or examples of penalty calculations

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026
Query: "hmrc cgt reporting deadlines 2026"
Position: 11.7 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing coverage of reporting other capital gains (not just property) via the real-time service. Competitor 1 (GOV.UK) covers gains on assets other than property using the real-time CGT service for tax years 2025 to 2026 and 2026 to 2027. Add a new H2 section titled "Reporting Non-Property Capital Gains via the Real-Time Service" with 150 words explaining that from 6 April 2025, the real-time service can also report gains on shares, business assets, and other chargeable assets. Include exact text: "For disposals made between 6 April 2025 and 5 April 2026, you can report gains on assets other than property using the real-time CGT service on GOV.UK. For disposals from 6 April 2026 to 5 April 2027, this remains available."

2. [CRITICAL] Missing specific penalty amounts for late reporting. Competitor 1 (GOV.UK) implies penalty details. Our page says "automatic penalties" but gives no figures. Add a new H2 section titled "Penalty Amounts for Late CGT Reporting on Property Sales" with a bulleted list: "If you file your 60-day report late: £100 initial penalty if up to 3 months late; then £10 per day for up to 90 days (max £900); then further penalties based on tax due. If you file your Self Assessment return late: £100 initial penalty; after 3 months, £10 per day (max £900); after 6 months, 5% of tax due or £300 (whichever is greater); after 12 months, 5% of tax due or £300 (whichever is greater)." Add a worked example: "Example: Sale completed 1 June 2026, report due 31 July 2026. If you file on 15 August 2026 (15 days late), you face a £100 penalty plus £10 per day for 15 days = £250 total."

3. [HIGH] Missing Self Assessment reporting option as an alternative to 60-day rule. Competitor 1 explains gains can be reported in a Self Assessment tax return in the tax year after disposal. Add a new H2 section titled "When Can You Use Self Assessment Instead of the 60-Day Rule?" with 200 words. Include: "If you sold a residential property in the UK and are a UK resident, you must use the 60-day reporting and payment service unless you are within Self Assessment and choose to report via your tax return instead. However, if you use Self Assessment, you must still pay the CGT by 31 January following the tax year of disposal. Example: Sale on 15 July 2026 – 60-day deadline is 13 September 2026; Self Assessment deadline is 31 January 2028."

4. [HIGH] Missing comparison table of 60-day vs Self Assessment deadlines. Add a table with columns: "Reporting Method", "Deadline", "Who Must Use It", "Penalty for Late Filing". Rows: "60-Day Report" – "Within 60 days of completion" – "All UK residents selling residential property (unless using SA)" – "£100 + daily penalties"; "Self Assessment" – "31 January after tax year end" – "Those already in SA or choosing this route" – "£100 + daily penalties + % of tax due".

5. [MEDIUM] Missing step-by-step guide on how to use the real-time CGT service. Add a new H3 section under "Calculating Your CGT Liability" titled "How to Use the HMRC Real-Time CGT Service" with 150 words. Include: "Step 1: Go to GOV.UK and search 'Report and pay Capital Gains Tax'. Step 2: Sign in using Government Gateway or create an account. Step 3: Enter property details, sale price, purchase price, and allowable costs. Step 4: Calculate gain and enter any reliefs (e.g., Private Residence Relief). Step 5: Pay the CGT due within 60 days of completion. Step 6: Receive a confirmation reference number."

6. [MEDIUM] Missing dedicated section on "Who must use the 60-day rule vs Self Assessment". Add a new H2 section titled "Who Must Use the 60-Day Rule vs Self Assessment?" with 200 words. Include: "You must use the 60-day rule if: you sold a UK residential property, you are a UK resident, and you are not already in Self Assessment. You can use Self Assessment instead if: you are already registered for Self Assessment, or you prefer to report all gains in one annual return. Exception: Non-UK residents must always use the 60-day rule for UK property sales."

TITLE/META:
Current title: HMRC CGT Reporting Deadlines 2026: 60-Day Property Rule | Property Tax Partners
Suggested title: HMRC CGT Reporting Deadlines 2026: 60-Day Rule & Penalties (58 chars)
Suggested meta description: Complete guide to HMRC CGT reporting deadlines 2026 for property sales. 60-day rule, Self Assessment options, penalty amounts, and step-by-step instructions. (155 chars)

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser (CTA) and Partner at Property Tax Partners" with a 1-sentence bio linking to author page.
- Add 3 inline references to HMRC official guidance: "HMRC's Capital Gains Tax manual (CG12345) states..." and "GOV.UK guidance on reporting CGT on property (updated April 2025) confirms..."
- Add one case study: "Case study: Client sold a second home in Manchester on 10 March 2026 for £350,000 (purchased for £200,000). Gain after Annual Exempt Amount (£3,000 for 2025/26) = £147,000. CGT at 18% (basic rate) = £26,460. Report due by 9 May 2026. Filed on 20 May 2026 – 11 days late. Penalty: £100 + £110 (11 days x £10) = £210."

WORD COUNT: Current 1132. Target: 1,800-2,200 (competitor average 454 – but GOV.UK is concise; we need depth to rank).

FAQ ADDITIONS:
- "What happens if I miss the 60-day CGT reporting deadline for property sales in 2026?"
- "Can I report CGT on shares using the same 60-day service as property?"
- "Do I need to use the 60-day rule if I'm already registered for Self Assessment?"
- "What is the penalty for late CGT reporting on property in 2026?"
- "How do I pay CGT on a property sale within 60 days?"

SCHEMA:
- Add FAQ schema (JSON-LD) for the 5 FAQ questions above.
- Add Article schema with author name, datePublished, dateModified, and publisher (Property
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
PAGE: cgt-payment-deadlines-property-sales-2026
STATUS: complete
WORD_COUNT_BEFORE: 1132
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
