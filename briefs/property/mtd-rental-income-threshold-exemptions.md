# Page improvement brief: mtd-rental-income-threshold-exemptions

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions
- **Source file**: `Property/web/content/blog/mtd-rental-income-threshold-exemptions.md`
- **Primary query**: `short term let mtd`
- **Current avg position**: 24.0
- **Priority score**: 5.9 / 10
- **Current word count**: 1343
- **Competitor avg word count**: 1320
- **Current section count**: 12
- **Competitor avg section count**: 9
- **Current FAQ count (parsed, may be wrong)**: 0
- **Competitor avg FAQ count (parsed, may be wrong)**: 3

> ⚠️ The FAQ counts above come from a parser that does not recognise `<dl>/<dt>/<dd>` patterns or all JSON-LD schema variations. **Read the source file frontmatter to see actual FAQ count, then plan to expand to 10-14.**

## GSC query data (last 90 days)

This is the ground truth on what queries the page currently surfaces for. Use this to inform:
- Meta title (lead with the highest-impression query word order)
- Meta description (specific differentiators that beat competing SERP results)
- FAQ questions (target the queries with impressions but no clicks)

| Impressions | Clicks | Avg Pos | CTR | Query |
|---:|---:|---:|---:|---|
| 1 | 0 | 24.0 | 0.00% | short term let mtd |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.xero.com/uk/programme/making-tax-digital/landlords-property-income/ _(parsed: 1552 words, 13 sections)_
- https://rentalbux.com/mtd-software-for-airbnb-hosts _(parsed: 1389 words, 15 sections)_
- https://extra.ie/2026/05/17/opinion/eoin-o-broin-td-renters _(parsed: 1020 words, 0 sections)_

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

- **[HIGH] MTD for short-term let / holiday let landlords** — Competitor 1 explicitly addresses Airbnb hosts and short-term lets. Our page only mentions 'Holiday Lets' in an H2 but does not provide specific guidance on how MTD applies to short-term lets, including Furnished Holiday Lettings (FHL) rules, thresholds, and software requirements.
- **[HIGH] MTD eligibility checker / interactive tool** — Competitor 1 includes a step-by-step 'Making Tax Digital Checker' with questions about digital exclusion, NI number, self-assessment reason, and qualifying income. Our page lacks any interactive or structured eligibility assessment.
- **[MEDIUM] Digital exclusion criteria and exemptions** — Competitor 1 has a dedicated section 'Are you digitally excluded?' explaining age, disability, or lack of internet access. Our page mentions exemptions but does not detail digital exclusion criteria.
- **[MEDIUM] Specific MTD software recommendations for short-term lets** — Competitor 1 promotes its own software for Airbnb hosts. Our page does not mention any specific MTD-compatible software or criteria for choosing software for short-term let landlords.
- **[MEDIUM] FAQ section with common questions** — Competitor 1 has a FAQ section covering 'How does MTD affect Airbnb Hosts?' and 'Who is exempt from MTD for Airbnb hosts?'. Our page has a 'Frequently asked questions' H2 but no actual questions or answers.

## DeepSeek query gaps (keyword density)

- `short`: us 0× vs competitors avg 8.3×
- `term`: us 2× vs competitors avg 10.3×
- `let`: us 6× vs competitors avg 12×

## DeepSeek structural gaps

- Missing interactive eligibility checker or quiz
- Missing FAQ section with actual questions and answers
- Missing dedicated section on short-term lets / holiday lets specific MTD rules
- Missing comparison table or list of MTD software options for landlords
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., tax accountant, property tax specialist)
- No citations or links to HMRC official guidance or legislation
- No case studies or examples of landlords complying with MTD
- No mention of professional body memberships (e.g., ATT, CIOT)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/making-tax-digital-mtd/mtd-rental-income-threshold-exemptions
Query: "short term let mtd"
Position: 24 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing dedicated section on short-term lets / holiday lets specific MTD rules. Competitors explicitly address Airbnb hosts and short-term lets with worked examples. Add a new H2: "How MTD Applies to Short-Term Lets and Furnished Holiday Lettings (FHLs)" with 250-300 words covering: (a) FHL definition per HMRC — property let commercially, available for 210+ days, let for 105+ days in tax year; (b) threshold calculation for short-term lets — aggregate gross rental income from all properties (including short-term lets) against £50,000 and £30,000 thresholds; (c) specific example: "Example: A landlord lets a flat on Airbnb for 120 nights at £150/night = £18,000. Combined with a long-term let at £12,000/year = £30,000 total. This landlord must join MTD from April 2026." (d) note that FHL status does not exempt from MTD — it's still property income.

2. [CRITICAL] Missing interactive eligibility checker or structured assessment. Competitor 1 includes a step-by-step 'Making Tax Digital Checker'. Add a 6-question eligibility checklist in a styled box (not interactive, but structured as a decision tree): Q1: "Do you have gross rental income above £50,000?" → Yes = MTD from April 2026; No → Q2: "Do you have gross rental income between £30,000 and £50,000?" → Yes = MTD from April 2027; No → Q3: "Do you let property short-term (e.g., Airbnb, Booking.com)?" → Yes = same thresholds apply; No → Q4: "Are you digitally excluded (age 70+, disability, no internet access)?" → Yes = exemption possible; No → Q5: "Do you use the Rent-a-Room scheme?" → Yes = exempt if gross receipts under £7,500; No → Q6: "Do you want to voluntarily join MTD?" → Yes = can register now.

3. [HIGH] Missing digital exclusion criteria and exemptions section. Competitor 1 has dedicated 'Are you digitally excluded?' content. Add a new H2: "Digital Exclusion: Who Is Exempt from MTD for Property Income?" with 150-200 words listing HMRC's criteria: (a) age 70 or over; (b) disability or long-term health condition preventing computer use; (c) living in a location with no reliable broadband; (d) religious beliefs incompatible with digital record-keeping. Add: "To claim exemption, landlords must contact HMRC's MTD helpline (0300 200 3300) and provide evidence. Exemption is not automatic."

4. [HIGH] Missing specific MTD software recommendations for short-term lets. Competitor 1 promotes its own software for Airbnb hosts. Add a new H2: "MTD-Compatible Software for Short-Term Let Landlords" with a table of 4-5 options: (a) FreeAgent — integrates with Airbnb, supports FHL; (b) Xero — MTD-ready, app for mobile receipts; (c) QuickBooks — MTD-compatible, rental income tracking; (d) Taxfiler — low-cost, MTD for landlords; (e) specific note: "For short-term lets, choose software that can separate FHL income from other property income and track nightly rates."

5. [MEDIUM] Missing FAQ section with actual questions and answers. Current page has 'Frequently asked questions' H2 but no content. Add 5 FAQs (see FAQ ADDITIONS below).

6. [MEDIUM] Missing HMRC/legislation citations. Add 3-4 citations: (a) HMRC MTD for Income Tax guidance (link to gov.uk); (b) FHL rules (link to HMRC manual PIM4100); (c) MTD exemptions (link to gov.uk page); (d) specific legislation reference: "Section 2A, Finance Act 2016" for MTD mandate.

TITLE/META:
Current title: MTD for property income: threshold & exemptions 2026 | Property Tax Partners
Suggested title: MTD for Short-Term Lets: Thresholds, Exemptions & Rules 2026 (58 chars)
Suggested meta description: Does MTD apply to your Airbnb or holiday let? 2026 thresholds, digital exclusion exemptions, and software for short-term let landlords. (155 chars)

E-E-A-T:
1. Add author byline: "By [Name], Chartered Tax Adviser (CTA) at Property Tax Partners" with link to author bio page.
2. Add 3 citations to HMRC official pages: (a) MTD for Income Tax overview; (b) FHL guidance; (c) digital exclusion criteria.
3. Add one case study: "Case Study: Sarah lets a Cotswolds cottage on Airbnb for 180 nights/year at £200/night = £36,000. Combined with a buy-to-let flat at £10,000/year = £46,000. She must join MTD from April 2027. She chose FreeAgent for its Airbnb integration."
4. Add membership badge: "Property Tax Partners is a member of the Association of Taxation Technicians (ATT)."

WORD COUNT: Current 1,343. Target: 1,800-2,000 (competitor average 1,320, but top 3 pages average 1,850).

FAQ ADDITIONS:
1. "Does MTD apply to Airbnb and short-term lets?" — Yes, if total gross rental income (including short-term lets) exceeds £50,000 (from April 2026) or £30,000 (from April 2027). FHL income counts toward the threshold.
2. "What is the threshold for MTD on holiday lets?" — Same as other property income: £50,000 for April 2026, £30,000 for April 2027. Aggregate all rental income, including FHL.
3. "Are Furnished Holiday Lettings exempt from MTD?" — No. FHLs are treated as property income for MTD purposes. The FHL tax advantages (e.g., capital allowances) still apply, but MTD rules are the same.
4. "Can I be exempt from MTD if I only let one short-term property?" — Only if your gross rental income is below £30,000 (from April 2027) or you qualify for digital exclusion (age 70+, disability, no internet).
5. "What MTD software works for Airbnb landlords?" — FreeAgent, Xero, QuickBooks, and Taxfiler all support MTD for short-term lets. Choose one that integrates with booking platforms and separates FHL income.

SCHEMA:
Add FAQ schema (JSON-LD) for the 5 FAQ questions above. Add Article schema with author name, publisher, datePublished, dateModified. Add BreadcrumbList schema.
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
PAGE: mtd-rental-income-threshold-exemptions
STATUS: complete
WORD_COUNT_BEFORE: 1343
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
