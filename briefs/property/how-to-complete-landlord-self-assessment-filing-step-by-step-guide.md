# Page improvement brief: how-to-complete-landlord-self-assessment-filing-step-by-step-guide

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide
- **Source file**: `Property/web/content/blog/how-to-complete-landlord-self-assessment-filing-step-by-step-guide.md`
- **Primary query**: `self assessment landlord`
- **Current avg position**: 76.1
- **Priority score**: 4.5 / 10
- **Current word count**: 1834
- **Competitor avg word count**: 773
- **Current section count**: 13
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
| 6 | 0 | 76.1 | 0.00% | self assessment landlord |
| 6 | 0 | 48.5 | 0.00% | hmrc sa105 |
| 4 | 0 | 48.5 | 0.00% | sa105 hmrc |
| 3 | 0 | 53.0 | 0.00% | self assessment property income |
| 3 | 0 | 72.0 | 0.00% | landlord self assessment |
| 2 | 0 | 83.0 | 0.00% | self assessment for rental income |
| 2 | 0 | 72.0 | 0.00% | self assessment for landlords |
| 2 | 0 | 78.0 | 0.00% | property income self assessment |
| 2 | 0 | 59.0 | 0.00% | form sa105 |
| 2 | 0 | 52.0 | 0.00% | sa105 form |
| 1 | 0 | 84.0 | 0.00% | self assessment for property income |
| 1 | 0 | 82.0 | 0.00% | self assessment tax return for landlords |
| 1 | 0 | 80.0 | 0.00% | landlords self assessment |
| 1 | 0 | 71.0 | 0.00% | landlord self assessment tax return |
| 1 | 0 | 62.0 | 0.00% | property income tax return |
| 1 | 0 | 78.0 | 0.00% | self assessment tax return landlord |
| 1 | 0 | 67.0 | 0.00% | landlord self assessment guide |
| 1 | 0 | 9.0 | 0.00% | sa105 2026 |
| 1 | 0 | 40.0 | 0.00% | sa 105 form |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.xero.com/uk/guides/self-assessment-for-landlords/ _(parsed: 1693 words, 14 sections)_
- https://www.gov.uk/guidance/help-with-property-on-your-self-assessment-tax-return _(parsed: 385 words, 4 sections)_
- https://thegoodlandlord.com/landlord-self-assessment/ _(parsed: 241 words, 3 sections)_

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

- **[HIGH] Registration process for self assessment as a landlord** — Competitor 2 has a dedicated H2 'How to register for self assessment for rental income' (91 words) with step-by-step instructions and required personal details. Our page lacks any section on registration.
- **[HIGH] Allowable expenses for landlords** — Competitor 2 has a dedicated H2 'What are allowable expenses for landlords' (109 words) listing specific deductible costs. Our page only mentions 'Documents and Records' but does not detail allowable expenses.
- **[MEDIUM] National Insurance on rental income** — Competitor 2 has a dedicated H2 'National Insurance on rental income' (61 words) explaining when NI applies. Our page does not mention NI at all.
- **[MEDIUM] Difference between Self Assessment and MTD for Income Tax** — Competitor 2 has an H2 'What's the difference between self assessment and MTD for Income Tax for landlords?' and a follow-up H2 on MTD. Our page only briefly mentions 'Future Tax Changes and Digital Reporting' but does not clearly contrast SA vs MTD.
- **[HIGH] Specific income thresholds for filing requirement** — Competitor 2 mentions specific figures: £2,500 after expenses, £10,000 before expenses, and £1,000 property allowance. Our page does not cite these thresholds.
- **[LOW] Helpsheets and HMRC resources** — Competitor 1 (GOV.UK) provides links to helpsheets and HMRC YouTube videos. Our page lacks references to official HMRC helpsheets.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with common landlord self assessment questions
- Missing table of contents or key takeaways summary at the top
- No registration step-by-step guide
- No allowable expenses list or table
- No comparison table for Self Assessment vs MTD
- no last-updated date
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials (e.g., tax accountant, property expert)
- No citations or links to official HMRC sources
- No case studies or real-world examples
- No mention of professional qualifications or affiliations

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/landlord-tax-essentials/how-to-complete-landlord-self-assessment-filing-step-by-step-guide
Query: "self assessment landlord"
Position: 76.1 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Registration process for self assessment as a landlord — Competitor 2 has a dedicated H2 "How to register for self assessment for rental income" (91 words) with step-by-step instructions. Add a new H2 section "How to Register for Self Assessment as a Landlord" with exactly 120-150 words. Include: (a) go to GOV.UK and search "register for self assessment", (b) you need your National Insurance number, (c) if you've never filed before, you must register by 5 October following the tax year you first had rental income, (d) HMRC will send you a UTR (Unique Taxpayer Reference) within 10 working days, (e) example: "If you started renting out a property in June 2024, you must register by 5 October 2025."

2. [CRITICAL] Specific income thresholds for filing requirement — Competitor 2 cites exact figures: £2,500 after allowable expenses, £10,000 before expenses, £1,000 property allowance. Add a new H2 section "When Must a Landlord File a Self Assessment Tax Return?" with exactly 100-130 words. Include: (a) if your gross rental income is over £10,000 per year, you must file, (b) if your net rental income (after expenses) is between £2,500 and £9,999, you must file, (c) if your gross rental income is under £1,000, you can use the property allowance instead of filing, (d) cite HMRC guidance HS253.

3. [HIGH] Allowable expenses for landlords — Competitor 2 has a dedicated H2 "What are allowable expenses for landlords" (109 words) listing specific deductible costs. Add a new H2 section "Allowable Expenses for Landlords: What You Can Claim" with exactly 150-200 words. Include a bulleted list of 8-10 specific expenses: mortgage interest (restricted to basic rate tax relief), letting agent fees, repairs and maintenance (not improvements), insurance, ground rent, service charges, legal fees for renewing a lease (not purchase), utility bills if you pay them, council tax if you pay it, and property management fees. Add a worked example: "If you earned £12,000 rent and spent £3,500 on repairs, £1,200 on letting agent fees, and £800 on insurance, your taxable profit is £6,500."

4. [MEDIUM] National Insurance on rental income — Competitor 2 has a dedicated H2 "National Insurance on rental income" (61 words). Add a new H2 section "Do Landlords Pay National Insurance on Rental Income?" with exactly 80-100 words. State: (a) rental income is not subject to Class 2 or Class 4 National Insurance if it's from property you own, (b) if you run a property business (e.g., serviced accommodation with significant services), you may need to pay Class 2 NI, (c) cite HMRC guidance on property income vs trading income.

5. [MEDIUM] Difference between Self Assessment and MTD for Income Tax — Competitor 2 has an H2 "What's the difference between self assessment and MTD for Income Tax for landlords?" and a follow-up H2 on MTD. Replace your existing "Future Tax Changes and Digital Reporting" section with a new H2 "Self Assessment vs Making Tax Digital (MTD) for Landlords" with exactly 150-180 words. Include a comparison table with 4 rows: (a) Filing method: annual return vs quarterly digital updates, (b) Software: any HMRC-recognised software vs MTD-compatible software only, (c) Threshold: all landlords with rental income over £1,000 vs landlords with total income over £50,000 (from April 2026), (d) Penalties: late filing penalties vs points-based penalty system. Add a clear statement: "MTD for Income Tax will be mandatory from April 2026 for landlords with total income over £50,000, and from April 2027 for those with income over £30,000."

6. [HIGH] Missing FAQ section — Competitor average is 0 FAQs, but adding FAQs will capture voice search and featured snippets. Add a new H2 "Frequently Asked Questions About Landlord Self Assessment" with exactly 5-7 questions (see FAQ ADDITIONS below). Each answer should be 40-60 words.

7. [MEDIUM] Missing table of contents or key takeaways summary — Add a "Key Takeaways" box at the top of the article (after the intro paragraph) with 4 bullet points: (1) You must register by 5 October following the tax year you first had rental income, (2) File your return by 31 January for online filing, (3) You can claim specific allowable expenses to reduce your tax bill, (4) MTD for Income Tax will replace self assessment from April 2026 for higher-income landlords.

8. [LOW] Helpsheets and HMRC resources — Add a new H2 "Official HMRC Resources for Landlords" with exactly 50-70 words. Link to: (a) HMRC helpsheet HS253 "Property Income", (b) HMRC YouTube video "How to complete the property pages", (c) GOV.UK page "Rent a Room in your home" if applicable.

TITLE/META:
Current title: Landlord Self Assessment Filing Guide: Complete Step-by-Step | Property Tax Partners
Suggested title: Landlord Self Assessment: Step-by-Step Guide to Filing Your Tax Return
Suggested meta description: Complete guide to filing self assessment as a landlord. Covers registration, deadlines, allowable expenses, and the SA105 property pages. Updated for 2024/25 tax year.

E-E-A-T:
1. Add author bio at bottom: "Written by [Name], Chartered Tax Adviser at Property Tax Partners. [Name] has 12 years' experience advising UK landlords on property tax compliance." Include a headshot and link to LinkedIn profile.
2. Add 3-4 in-text citations to HMRC sources: (a) GOV.UK "Register for Self Assessment", (b) HMRC helpsheet HS253, (c) GOV.UK "Check if you need to send a Self Assessment tax return", (d) HMRC "Making Tax Digital for Income Tax".
3. Add a real-world example: "Case study: Sarah, a landlord with one rental property earning £15,000 per year, claimed £4,200 in allowable expenses. Her taxable profit was £10,800, and she paid £1,944 in CGT (at 18%) on a property sale gain of £77,000 after 
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
PAGE: how-to-complete-landlord-self-assessment-filing-step-by-step-guide
STATUS: complete
WORD_COUNT_BEFORE: 1834
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
