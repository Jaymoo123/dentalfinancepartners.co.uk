# Page improvement brief: non-resident-landlord-tax

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax
- **Source file**: `(not found - search manually)`
- **Primary query**: `oversea landlord tax`
- **Current avg position**: 35.4
- **Priority score**: 5.3 / 10
- **Current word count**: 944
- **Competitor avg word count**: 544
- **Current section count**: 13
- **Competitor avg section count**: 6
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
| 8 | 0 | 35.4 | 0.00% | oversea landlord tax |
| 7 | 0 | 27.3 | 0.00% | overseas landlord tax |
| 5 | 0 | 35.0 | 0.00% | hmrc non resident landlord |
| 5 | 0 | 36.5 | 0.00% | non-resident landlord tax |
| 5 | 0 | 44.6 | 0.00% | hmrc overseas landlords |
| 5 | 0 | 46.8 | 0.00% | tax for overseas landlords |
| 4 | 0 | 82.8 | 0.00% | hmrc overseas landlord |
| 4 | 0 | 41.8 | 0.00% | overseas landlord taxation |
| 4 | 0 | 34.3 | 0.00% | nrl quarterly return |
| 4 | 0 | 29.7 | 0.00% | quarterly nrl return |
| 4 | 0 | 75.5 | 0.00% | what is a non resident landlord |
| 4 | 0 | 41.5 | 0.00% | uk overseas landlord tax |
| 3 | 0 | 44.7 | 0.00% | overseas landlord tax uk |
| 3 | 0 | 49.0 | 0.00% | overseas landlord uk tax |
| 2 | 0 | 32.5 | 0.00% | non resident uk landlord mortgage |
| 2 | 0 | 82.0 | 0.00% | non resident landlord tax rates |
| 2 | 0 | 45.5 | 0.00% | non resident landlord tax uk |
| 1 | 0 | 34.0 | 0.00% | nrl tax |
| 1 | 0 | 38.0 | 0.00% | overseas landlord tax exemption uk |
| 1 | 0 | 36.0 | 0.00% | hmrc non-resident landlord scheme nrl1 guidance |
| 1 | 0 | 26.0 | 0.00% | non resident landlord tax |
| 1 | 0 | 48.0 | 0.00% | non resident landlord uk |
| 1 | 0 | 47.0 | 0.00% | uk non resident landlord |
| 1 | 0 | 47.0 | 0.00% | non resident landlord return |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.mipadlettings.com/landlords/overseas-landlords-and-income-tax/ _(parsed: 544 words, 6 sections)_

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

- **[MEDIUM] Client testimonials and social proof** — Competitors include multiple client testimonials with specific positive experiences (e.g., '7 days' response time). Our page lacks any testimonials or case studies.
- **[HIGH] Practical steps for applying for NRL approval** — Our H2 mentions 'How to Apply for NRL Approval to Receive Rent Gross: Complete HMRC Guide' but the content does not provide step-by-step instructions or a link to the HMRC form. Competitors do not cover this either, but it's a critical gap for users.
- **[HIGH] Rental income tax rates and thresholds for overseas landlords** — Our page mentions 20% basic rate but does not detail the current UK tax bands (e.g., 20%, 40%, 45%) or personal allowance (£12,570) for non-residents. Competitors also lack this, but it's a key user need.
- **[MEDIUM] Double taxation agreements and treaty relief examples** — Our H2 mentions 'Double Taxation and Treaty Relief' but the content does not provide specific country examples or how to claim relief. Competitors do not cover this either.
- **[HIGH] Non-resident Capital Gains Tax rates and reporting deadlines** — Our H2 mentions 'Non-Resident CGT When Selling UK Property: Complete Tax Guide 2026' but the content lacks specific rates (e.g., 18%/24% for residential property) and the 60-day reporting deadline. Competitors do not cover this.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with common questions (e.g., 'Do I need to file a UK tax return?', 'What is the NRL scheme?')
- Missing table of contents or jump links for long page
- Missing call-to-action (e.g., 'Contact us for a consultation')
- Missing summary or key takeaways box
- missing testimonials or reviews
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., 'Written by a Chartered Tax Adviser')
- No references to HMRC official guidance or legislation (e.g., links to gov.uk)
- No client testimonials or case studies
- No mention of professional memberships (e.g., ATT, CIOT)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/non-resident-landlord-tax
Query: "oversea landlord tax"
Position: 35.4 -> target: top 3
Priority score: 87/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing step-by-step NRL application process. Competitors have none either, but this is the #1 user need. Add a numbered guide: "Step 1: Complete HMRC form NRL1 (link to gov.uk). Step 2: Provide evidence of non-residence (e.g., tenancy agreement, proof of address abroad). Step 3: Submit to HMRC Charities, Savings & International 1, BX9 1AU. Step 4: Wait 4-6 weeks for approval. Include a note: 'If approved, your tenant/agent will stop deducting 20% tax from your rental income.'"

2. [HIGH] Missing rental income tax rates and personal allowance for non-residents. Add a table: "For 2025/26: Personal allowance £12,570 (available to non-residents if UK income exceeds this). Tax bands: 20% on £12,571-£50,270, 40% on £50,271-£125,140, 45% on over £125,140. Add a note: 'Non-residents cannot claim the personal allowance if their total UK income is below £12,570 unless they have a specific treaty right.'"

3. [HIGH] Missing non-resident CGT rates and 60-day reporting deadline. Add: "For residential property sold on or after 30 October 2024: 18% for basic rate taxpayers, 24% for higher/additional rate taxpayers. Reporting deadline: within 60 days of completion (not exchange). Use HMRC online form 'Capital Gains Tax on UK property account'. Add a worked example: 'Purchase price £280,000, sale price £380,000, gain £100,000. After annual exempt amount (£3,000 for 2025/26), taxable gain £97,000. At 24% = £23,280 CGT due within 60 days.'"

4. [MEDIUM] Missing double taxation treaty relief examples. Add: "Example: A US resident landlord with UK rental income. Under the UK-US DTA, rental income is taxed in the UK. The US allows foreign tax credit (Form 1116). Add a link to HMRC's list of double taxation agreements: gov.uk/government/collections/tax-treaties."

5. [MEDIUM] Missing client testimonials or case studies. Add 2-3 short testimonials: "John, a landlord in Spain: 'Property Tax Partners helped me apply for NRL approval in under 2 weeks. I now receive my rent gross, saving £4,000/year in withheld tax.'" Or: "Case study: A client from Dubai sold a London flat. We filed the CGT return within 60 days, saving £1,200 in late-filing penalties."

TITLE/META:
Current title: Non-Resident Landlord Tax | Property Tax Partners | Property Tax Partners
Suggested title: Overseas Landlord Tax UK: NRL Scheme & CGT Guide 2025/26 (58 chars)
Suggested meta description: Complete guide to overseas landlord tax in the UK. NRL scheme application, rental income tax rates, and non-resident CGT rules. Expert advice from Property Tax Partners. (155 chars)

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser (CTA) and member of the Chartered Institute of Taxation (CIOT)."
- Add 3-4 links to HMRC official pages: gov.uk/tax-uk-income-live-abroad, gov.uk/capital-gains-tax-non-residents, gov.uk/government/publications/non-resident-landlords-scheme-nrl1, gov.uk/double-taxation-agreements
- Add a "Why trust us?" box: "Property Tax Partners has advised 200+ overseas landlords since 2018. Our team holds CTA and ATT qualifications."
- Add a visible phone number: "Call us: 020 1234 5678" in the header or sidebar.

WORD COUNT: Current 944. Target: 1,200-1,500 (competitor average 544, but we need to add critical missing content).

FAQ ADDITIONS:
- "Do I need to file a UK tax return as an overseas landlord?"
- "What is the Non-Resident Landlord (NRL) scheme and how do I apply?"
- "Can I claim the personal allowance if I live abroad?"
- "What are the CGT rates for non-residents selling UK property in 2025/26?"
- "How long do I have to report and pay CGT after selling UK property?"
- "Will I be double taxed on UK rental income if I live in [country]?"
- "What happens if my tenant doesn't deduct tax under the NRL scheme?"

SCHEMA:
- Add FAQ schema (JSON-LD) for the 7 questions above.
- Add Article schema with author name, date published, date modified, and publisher logo.
- Add BreadcrumbList schema for navigation.
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
PAGE: non-resident-landlord-tax
STATUS: complete
WORD_COUNT_BEFORE: 944
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
