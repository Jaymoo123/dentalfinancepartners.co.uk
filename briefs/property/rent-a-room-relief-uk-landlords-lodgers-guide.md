# Page improvement brief: rent-a-room-relief-uk-landlords-lodgers-guide

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/rent-a-room-relief-uk-landlords-lodgers-guide
- **Source file**: `Property/web/content/blog/rent-a-room-relief-uk-landlords-lodgers-guide.md`
- **Primary query**: `rent a room allowance 2026`
- **Current avg position**: 12.0
- **Priority score**: 6.0 / 10
- **Current word count**: 1841
- **Competitor avg word count**: 1206
- **Current section count**: 11
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
| 7 | 0 | 12.0 | 0.00% | rent a room allowance 2026 |
| 3 | 0 | 9.5 | 0.00% | uk rent a room scheme allowance 2026 |
| 2 | 0 | 52.5 | 0.00% | rent a room income for mortgage |
| 2 | 0 | 46.0 | 0.00% | rent a room tax relief |
| 2 | 0 | 9.0 | 0.00% | rent a room scheme uk allowance 2026 |
| 2 | 0 | 30.0 | 0.00% | lodgers tax free allowance |
| 1 | 0 | 9.0 | 0.00% | rent a room scheme allowance 2026 uk |
| 1 | 0 | 9.0 | 0.00% | rent a room relief 2026 |
| 1 | 0 | 39.0 | 0.00% | rent a room allowance 2025/26 |
| 1 | 0 | 8.0 | 0.00% | uk rent a room relief amount 2026 |
| 1 | 0 | 37.0 | 0.00% | room rental tax allowance |
| 1 | 0 | 8.0 | 0.00% | uk rent a room scheme limit 2026 |
| 1 | 0 | 9.0 | 0.00% | uk rent a room scheme tax rules 2026 |
| 1 | 0 | 29.0 | 0.00% | lodger allowance |
| 1 | 0 | 38.0 | 0.00% | tax allowance for renting a room |
| 1 | 0 | 10.0 | 0.00% | rent a room scheme allowance uk 2026 |
| 1 | 0 | 74.0 | 0.00% | rent a room relief 2024/25 |
| 1 | 0 | 28.0 | 0.00% | lodgers allowance |
| 1 | 0 | 33.0 | 0.00% | tax free allowance rent a room |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/government/publications/rent-a-room-for-traders-hs223-self-assessment-helpsheet/hs223-rent-a-room-scheme-2025 _(parsed: 1206 words, 5 sections)_

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

- **[HIGH] Time limit for opting out of the scheme** — Competitor GOV.UK covers a specific time limit: 'You must let HMRC know within one year of 31 January following the end of the tax year if you do not want to use the Rent-a-Room Scheme.' Our page lacks this deadline.
- **[MEDIUM] Losses under the Rent-a-Room Scheme** — Competitor has a section on 'Losses' (though empty), indicating that losses cannot be claimed under the scheme. Our page does not mention this restriction.
- **[MEDIUM] Example scenarios for when the scheme applies** — Competitor includes an example: 'if you run a guest house or bed and breakfast'. Our page lacks concrete examples of when the scheme does or does not apply.
- **[HIGH] Reduced limit for joint owners (£3,750)** — Competitor mentions the reduced limit of £3,750 for joint owners. Our page only mentions £7,500 and does not address the joint ownership scenario.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing a dedicated 'Time limit' section or subsection
- Missing a 'Losses' section explaining that losses cannot be claimed
- Missing a 'Joint owners' subsection explaining the £3,750 limit
- No FAQ section with questions (our page has FAQ heading but no questions listed)

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author or reviewer credentials displayed
- No citations or references to official HMRC guidance or legislation
- No date of last update or review shown
- No links to authoritative sources (e.g., GOV.UK)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/section-24-and-tax-relief/rent-a-room-relief-uk-landlords-lodgers-guide
Query: "rent a room allowance 2026"
Position: 12 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing time limit for opting out of the scheme. Competitor GOV.UK states: "You must let HMRC know within one year of 31 January following the end of the tax year if you do not want to use the Rent-a-Room Scheme." Add a new H2 subsection "Time Limit for Opting Out" with this exact deadline: for 2025/26 tax year, deadline is 31 January 2028. Include a worked example: "If you earned £9,000 in 2025/26 and want to use normal property income rules instead, you must notify HMRC by 31 January 2028."

2. [HIGH] Missing reduced limit for joint owners (£3,750). Competitor mentions £3,750 for joint owners. Add a new H2 subsection "Joint Owners: Reduced £3,750 Allowance" with: "If you own the property jointly with someone else (e.g., spouse), the £7,500 allowance is split between you. Each owner gets £3,750 tax-free. This applies even if only one lodger lives there." Add a worked numerical example: "Two joint owners, rental income £9,000. Each declares £4,500. Each uses £3,750 allowance, taxed on £750 each at their marginal rate."

3. [HIGH] Missing explanation that losses cannot be claimed under the scheme. Competitor has a 'Losses' section (though empty). Add a new H2 subsection "Losses Cannot Be Claimed Under the Scheme" with: "If your allowable expenses exceed your rental income, you cannot claim a loss under the Rent-a-Room Scheme. You must use normal property income rules to claim losses. Example: £6,000 income, £7,000 expenses. Under the scheme, no loss is allowed. Under normal rules, you could offset the £1,000 loss against other income."

4. [MEDIUM] Missing concrete examples of when the scheme does not apply. Competitor includes example: "if you run a guest house or bed and breakfast". Add a new H2 subsection "When the Scheme Does Not Apply" with: "The scheme does not apply if: (a) you run a guest house, bed and breakfast, or hotel; (b) the property is not your main home; (c) you let to a company rather than an individual; (d) the lodger has exclusive use of the entire property (e.g., you move out)."

5. [MEDIUM] Missing reference to the 2026/27 allowance figure. Query is "rent a room allowance 2026". Add a sentence in the first H2: "For the 2026/27 tax year, the Rent-a-Room allowance remains £7,500. This has been frozen since 2016 and is not index-linked." Add a note: "No changes were announced in the Spring Budget 2025 or Autumn Budget 2024 for 2026/27."

TITLE/META:
Current title: Rent-a-Room Relief: £7,500 Tax-Free Allowance Guide 2026 | Property Tax Partners
Suggested title: Rent a Room Allowance 2026: £7,500 Tax-Free Guide & Rules
Suggested meta description: Rent a Room allowance 2026: £7,500 tax-free income for lodgers. Full guide including time limits, joint owner rules, and when losses cannot be claimed. Updated for 2026/27.

E-E-A-T:
1. Add author byline: "Written by [Name], Chartered Tax Adviser, [Date]. Reviewed by [Name], ACCA/CTA, [Date]."
2. Add citation: "Source: HMRC Rent-a-Room Scheme guidance (HS223) – updated April 2025."
3. Add internal link to HMRC's official page: "For full HMRC guidance, see GOV.UK: Rent a Room in Your Home (HS223)."
4. Add last updated date: "Last updated: [current date] for 2026/27 tax year."
5. Add a note: "This guide reflects legislation as of [date]. Always check HMRC's latest guidance."

WORD COUNT: Current 1841. Target: 2200-2500 (competitor average 1206, but we need to add 400-700 words for gaps).

FAQ ADDITIONS:
1. "What is the rent a room allowance for 2026/27?"
2. "Can I claim rent a room relief if I own the property jointly with my spouse?"
3. "What is the deadline to opt out of the rent a room scheme?"
4. "Can I claim a loss under the rent a room scheme?"
5. "Does rent a room relief apply to bed and breakfasts or guest houses?"
6. "What happens if I earn more than £7,500 from a lodger?"

SCHEMA:
Add FAQ schema (structured data) with the 6 questions above. Use JSON-LD format with @type: FAQPage. Add Article schema with author, datePublished, dateModified, publisher (Property Tax Partners).
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
PAGE: rent-a-room-relief-uk-landlords-lodgers-guide
STATUS: complete
WORD_COUNT_BEFORE: 1841
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
