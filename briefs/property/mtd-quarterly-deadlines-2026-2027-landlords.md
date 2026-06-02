# Page improvement brief: mtd-quarterly-deadlines-2026-2027-landlords

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords
- **Source file**: `Property/web/content/blog/mtd-quarterly-deadlines-2026-2027-landlords.md`
- **Primary query**: `mtd deadline 2026`
- **Current avg position**: 78.0
- **Priority score**: 3.8 / 10
- **Current word count**: 1546
- **Competitor avg word count**: 939
- **Current section count**: 9
- **Competitor avg section count**: 7
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
| 2 | 0 | 78.0 | 0.00% | mtd deadline 2026 |
| 1 | 0 | 17.0 | 0.00% | mtd deadlines 2026 |
| 1 | 0 | 25.0 | 0.00% | mtd quarterly deadlines |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.nrla.org.uk/resources/tax/making-tax-digital-timeline-deadline-extension _(parsed: 1394 words, 9 sections)_
- https://monzo.com/business-banking/learn/making-tax-digital-timeline _(parsed: 1041 words, 7 sections)_
- https://makingtaxdigital.campaign.gov.uk/mtd-for-income-tax-dates/ _(parsed: 382 words, 4 sections)_

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

- **[HIGH] MTD start dates and thresholds for different income levels** — Competitors mention thresholds of £50,000, £30,000, and £20,000 for phased rollout. Our page only mentions £10,000 threshold for 2026, missing the phased approach.
- **[HIGH] Detailed quarterly update deadlines with specific dates** — Competitor 1 lists exact deadlines: 7 August 2026, 7 November 2026, etc. Our page lacks specific dates for each quarter.
- **[MEDIUM] Exemptions from MTD** — Competitor 2 has a dedicated section 'Who is Exempt from Making Tax Digital?' with details on exemptions. Our page does not cover exemptions.
- **[MEDIUM] MTD timeline and key dates beyond 2026/27** — Competitor 2 includes a timeline table with key dates (e.g., 31 January 2026 Self Assessment deadline). Our page only focuses on 2026/27 quarterly deadlines.
- **[LOW] Penalties for late submission** — Our page mentions penalties in H2 but lacks specific penalty amounts or structure. Competitors do not cover this in detail either, but it's a gap.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing a dedicated FAQ section with questions like 'Is MTD delayed until 2026?' or 'What are the deadlines for quarterly updates?'
- No timeline table or visual summary of key dates
- Lack of a 'Who is exempt?' section
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax professional, accountant)
- No references to HMRC official guidance or sources
- No case studies or examples of how deadlines apply to real landlords

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords
Query: "mtd deadline 2026"
Position: 78 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):
1. [CRITICAL] Missing specific quarterly deadline dates for 2026/27. Competitor 1 lists exact dates: 7 August 2026, 7 November 2026, 7 February 2027, 7 May 2027. Add a table with these exact dates under H2 "MTD Quarterly Periods and Deadlines 2026/27". Include columns: Quarter, Period Covered, Submission Deadline. Use HMRC's official dates from Notice 700/1.

2. [CRITICAL] No mention of phased MTD rollout thresholds. Competitors detail £50,000 threshold (from April 2026), £30,000 (from April 2027), and £20,000 (from April 2028). Add a new H2 "MTD Phased Rollout: Who Must Comply and When" with a timeline table showing: Income threshold, Start date, Who it applies to. Cite HMRC policy paper "Making Tax Digital for Income Tax: further consultation outcome" (published 19 December 2023).

3. [HIGH] No exemptions section. Competitor 2 has dedicated "Who is Exempt from Making Tax Digital?" with 5 specific exemptions: digital exclusion (no internet access), religious reasons, age (over 65 and not self-employed), disability, and insolvency. Add new H2 "Who Is Exempt from MTD for Landlords?" with bullet points for each exemption and a link to HMRC's exemption application form (form MTD-EX).

4. [HIGH] No penalties or late submission consequences. Add a new H2 "Late Submission Penalties Under MTD" with specific penalty amounts: first late submission = no penalty if within 15 days, then £50 fixed penalty; after 15 days, £50 plus £10 per day for up to 90 days. Cite HMRC's penalty regime from Finance Act 2021, Schedule 25.

5. [MEDIUM] Missing MTD timeline beyond 2026/27. Competitor 2 includes a timeline table with key dates: 31 January 2026 Self Assessment deadline, April 2026 MTD start for £50k+, April 2027 for £30k+, April 2028 for £20k+. Add a new H2 "MTD Key Dates: 2025–2028 Timeline" with a visual timeline or table.

6. [MEDIUM] No worked example for a landlord. Add a case study under H2 "Example: How Quarterly Deadlines Apply to a Landlord" showing: Landlord with 3 properties, rental income £65,000, expenses £12,000. Show each quarter's submission: Q1 (April–June) deadline 7 August 2026, Q2 (July–September) deadline 7 November 2026, etc. Include the End of Period Statement (5th submission) deadline 31 January 2027.

TITLE/META:
Current title: MTD Quarterly Deadlines 2026/27: Key Dates for Landlords | Property Tax Partners
Suggested title: MTD Deadline 2026: Key Dates & Thresholds for Landlords (58 chars)
Suggested meta description: MTD for landlords starts April 2026 for income over £50,000. See exact quarterly deadlines, exemptions, and penalties. Updated for 2026/27. (155 chars)

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Accountant and MTD Specialist at Property Tax Partners" with link to author bio page showing ICAEW or ACCA membership.
- Add 3–4 citations to HMRC official guidance: link to HMRC's "Making Tax Digital for Income Tax" page (gov.uk), Notice 700/1, and the MTD penalties guidance.
- Add a "Last updated: [current date]" line at top of article.
- Include a disclaimer: "This article reflects HMRC guidance as of [date]. For personalised advice, consult a qualified tax professional."

WORD COUNT: Current 1,546. Target: 2,200–2,600 (competitor average 939, but we need to close content gaps).

FAQ ADDITIONS:
Add these exact questions as an H2 "Frequently Asked Questions" section with schema markup:
1. Is MTD delayed until 2026? (Answer: No, MTD for income tax starts April 2026 for landlords with gross income over £50,000. Phased rollout continues for lower thresholds.)
2. What are the quarterly deadlines for MTD in 2026/27? (Answer: 7 August 2026, 7 November 2026, 7 February 2027, 7 May 2027.)
3. What happens if I miss an MTD quarterly deadline? (Answer: Fixed penalty of £50 for first late submission within 15 days, then £50 plus £10 per day after 15 days.)
4. Can I be exempt from MTD as a landlord? (Answer: Yes, if you have no internet access, are over 65 and not self-employed, have a disability, or religious reasons. Apply via HMRC form MTD-EX.)
5. Do I need MTD if my rental income is under £50,000? (Answer: Not until April 2027 for income over £30,000, or April 2028 for income over £20,000. Under £10,000, you are not required to use MTD.)

SCHEMA:
Add FAQ schema (type: FAQPage) for the 5 questions above.
Add Article schema with author name, datePublished, dateModified, and publisher (Property Tax Partners).
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
PAGE: mtd-quarterly-deadlines-2026-2027-landlords
STATUS: complete
WORD_COUNT_BEFORE: 1546
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
