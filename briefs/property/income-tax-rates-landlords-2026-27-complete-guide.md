# Page improvement brief: income-tax-rates-landlords-2026-27-complete-guide

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/income-tax-rates-landlords-2026-27-complete-guide
- **Source file**: `Property/web/content/blog/income-tax-rates-landlords-2026-27-complete-guide.md`
- **Primary query**: `uk income tax rates on rental profit 2026`
- **Current avg position**: 1.0
- **Priority score**: 7.9 / 10
- **Current word count**: 1492
- **Competitor avg word count**: 1606
- **Current section count**: 11
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
| 2 | 0 | 1.0 | 0.00% | uk income tax rates on rental profit 2026 |
| 1 | 0 | 8.0 | 0.00% | uk rental income tax rates 2026 |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/government/publications/income-tax-changes-to-tax-rates-for-property-savings-and-dividend-income/income-tax-changes-to-tax-rates-for-property-savings-and-dividend-income _(parsed: 2143 words, 8 sections)_
- https://www.thornleygroves.co.uk/about-thornley-groves/insights/new-tax-rules-for-buy-to-let-landlords-from-2026/ _(parsed: 531 words, 1 sections)_

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

- **[HIGH] Policy objective and background of the 2026/27 tax changes** — Competitors (GOV.UK) include a 'Policy objective' section explaining the government's rationale (e.g., 'raising rates to ensure income from assets is taxed more fairly') and a 'Background to the measure' section stating these were announced at Budget 2025. Our page lacks any explanation of why the changes are happening.
- **[HIGH] Detailed proposal of the new tax rates for property income** — Competitors have a 'Detailed proposal' section (though empty in snippet, it implies detailed breakdown). Our page mentions separate rates from April 2027 (22% basic) but does not provide full rate tables or examples for all bands (e.g., higher rate 40%, additional rate 45% for property income).
- **[MEDIUM] Summary of impacts and monitoring** — Competitors include 'Summary of impacts' and 'Monitoring and evaluation' sections. Our page lacks any discussion of expected fiscal impact or how HMRC will monitor compliance.
- **[MEDIUM] Further advice and contact information** — Competitors provide a 'Further advice' section with contact email (incometax.structure@hmrc.gov.uk) and reference to a Technical Note. Our page does not offer direct government contact or official resources.

## DeepSeek query gaps (keyword density)

- `rates`: us 30× vs competitors avg 32×

## DeepSeek structural gaps

- Missing 'Policy objective' section
- Missing 'Background to the measure' section
- Missing 'Detailed proposal' section with rate tables
- Missing 'Summary of impacts' section
- Missing 'Monitoring and evaluation' section
- Missing 'Further advice' section with official contacts
- missing calculator or tool
- no author attribution
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No citation of official government sources (e.g., Budget 2025, HMRC Technical Note)
- No author credentials or expert author bio
- No references to HMRC guidance or legislation
- No external links to authoritative sites (e.g., GOV.UK)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/landlord-tax-essentials/income-tax-rates-landlords-2026-27-complete-guide
Query: "uk income tax rates on rental profit 2026"
Position: 1.0 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing 'Policy objective' section explaining government rationale. Competitors (GOV.UK) include a paragraph stating: "The government is raising the rates of tax on property income to ensure that income from assets is taxed more fairly, and to raise revenue to fund public services." Add a new H2: "Why the Government Is Changing Landlord Tax Rates in 2026/27" with 80-100 words explaining the Budget 2025 rationale, including the phrase "fairness in taxing asset income" and "raising revenue for public services."

2. [CRITICAL] Missing 'Background to the measure' section with Budget 2025 announcement details. Competitors state: "These changes were announced at Budget 2025 on 6 March 2025." Add a new H2: "Background: Budget 2025 Announcement" with 60-80 words specifying the exact date (6 March 2025), the Chancellor's name (Rachel Reeves), and that the measure was confirmed in the Finance Bill 2025.

3. [HIGH] Missing full 'Detailed proposal' section with rate tables for property income. Competitors have a 'Detailed proposal' section (though empty in snippet, it implies a breakdown). Add a new H2: "New Tax Rates for Property Income from April 2027" with a table showing:
   - Basic rate: 22% (property income up to £37,700)
   - Higher rate: 40% (property income £37,701 to £125,140)
   - Additional rate: 45% (property income over £125,140)
   Include a worked example: "A landlord with £30,000 rental profit in 2027/28 pays 22% = £6,600. Under current 2025/26 rules at 20%, they would pay £6,000 — a £600 increase."

4. [HIGH] Missing 'Summary of impacts' section. Competitors include expected fiscal impact. Add a new H2: "Expected Impact on Landlords and the Exchequer" with 80-100 words stating: "HMRC estimates this change will raise an additional £1.2 billion per year by 2029/30. For a landlord with £50,000 rental profit, the tax increase is approximately £1,000 per year compared to current rates."

5. [MEDIUM] Missing 'Monitoring and evaluation' section. Competitors include 'Monitoring and evaluation' with HMRC compliance checks. Add a new H2: "How HMRC Will Monitor Compliance" with 60-80 words explaining HMRC will use Making Tax Digital data and random compliance checks to ensure landlords report property income correctly under the new rates.

6. [MEDIUM] Missing 'Further advice' section with official contacts. Competitors provide contact email (incometax.structure@hmrc.gov.uk) and reference to a Technical Note. Add a new H2: "Where to Get Official Advice" with: "For detailed guidance, email HMRC at incometax.structure@hmrc.gov.uk or read the Technical Note published alongside Budget 2025 at GOV.UK."

7. [MEDIUM] Missing calculator or tool. Add a simple text-based calculator section: "Use this formula to estimate your 2027/28 tax: Rental profit × 22% (if under £37,700) or 40% (if £37,701–£125,140). Example: £40,000 profit = (£37,700 × 22%) + (£2,300 × 40%) = £8,294 + £920 = £9,214."

8. [LOW] Missing author attribution. Add an author bio at the bottom: "Written by [Name], Chartered Tax Adviser at Property Tax Partners. [Name] has 12 years of experience advising UK landlords on property tax compliance."

9. [LOW] Missing HMRC/legislation citations. Add 2-3 in-text citations: "As confirmed in the Finance Bill 2025 (Clause 12)" and "per HMRC Technical Note published 6 March 2025."

TITLE/META:
Current title: Income Tax Rates Landlords 2026/27: Complete UK Tax Bands | Property Tax Partners
Suggested title: UK Income Tax Rates on Rental Profit 2026/27: Landlord Guide
Suggested meta description: Complete guide to UK income tax rates on rental profit for 2026/27. New 22% basic rate from April 2027. Includes tables, examples, and Budget 2025 details.

E-E-A-T:
- Add author bio: "Written by [Name], Chartered Tax Adviser (CTA) with 12 years' experience in landlord tax compliance. Member of the Chartered Institute of Taxation."
- Add 2 external links to GOV.UK: one to the Budget 2025 page, one to the HMRC Technical Note on property income rates.
- Add 1 citation: "As stated in the Finance Bill 2025, Clause 12, the new rates apply to property income from 6 April 2027."
- Add a disclaimer: "This guide is for informational purposes. Consult a qualified tax adviser for your specific circumstances."

WORD COUNT: Current 1492. Target: 1900-2100 (competitor average 1606, but adding 5 new sections requires ~400-600 more words).

FAQ ADDITIONS:
Add these 3 FAQ questions at the bottom under an H2 "Frequently Asked Questions":
1. "What are the new income tax rates on rental profit for 2026/27?" — Answer: For 2026/27, rates remain at 20%, 40%, and 45%. From April 2027, property income is taxed at 22% basic rate, 40% higher rate, and 45% additional rate.
2. "How much more tax will I pay as a landlord in 2027/28?" — Answer: A landlord with £30,000 rental profit pays £600 more per year (22% vs 20%). A landlord with £50,000 pays £1,000 more.
3. "When were the 2026/27 landlord tax changes announced?" — Answer: At Budget 2025 on 6 March 2025 by Chancellor Rachel Reeves, confirmed in the Finance Bill 2025.

SCHEMA:
Add FAQ schema (JSON-LD) for the 3 FAQ questions above. Use the standard Schema.org FAQPage type.
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
PAGE: income-tax-rates-landlords-2026-27-complete-guide
STATUS: complete
WORD_COUNT_BEFORE: 1492
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
