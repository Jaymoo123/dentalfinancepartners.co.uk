# Page improvement brief: cgt-property-2027-rate-changes-uk-landlords

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-property-2027-rate-changes-uk-landlords
- **Source file**: `Property/web/content/blog/cgt-property-2027-rate-changes-uk-landlords.md`
- **Primary query**: `changes to cgt annual exemption 2027`
- **Current avg position**: 9.7
- **Priority score**: 7.4 / 10
- **Current word count**: 1443
- **Competitor avg word count**: 722
- **Current section count**: 9
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
| 12 | 0 | 9.7 | 0.00% | changes to cgt annual exemption 2027 |
| 2 | 0 | 15.5 | 0.00% | uk property income tax changes april 2027 |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.gov.uk/government/publications/reducing-the-annual-exempt-amount-for-capital-gains-tax/capital-gains-tax-annual-exempt-amount _(parsed: 1103 words, 9 sections)_
- https://taxscape.deloitte.com/measures-autumn-statement-2022/annual-exempt-amount-for-capital-gains-tax-to-be-reduced.aspx _(parsed: 340 words, 4 sections)_

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

- **[HIGH] Annual exempt amount reduction timeline and figures** — Competitors explicitly state the reduction from £12,300 to £6,000 (2023/24) and to £3,000 (2024/25). Our page does not mention these figures or the phased reduction.
- **[MEDIUM] Who is affected (individuals, trustees, personal representatives)** — Competitors clearly list affected parties. Our page focuses on property investors/landlords but does not mention trustees or personal representatives.
- **[MEDIUM] Policy objective and background** — Competitors explain the policy rationale (public finances, fairness) and that it was announced at Autumn Statement 2022. Our page lacks this context.
- **[MEDIUM] Impact on trusts and trustees** — Competitors note that trustees have a lower exempt amount (£1,500 from 2024/25). Our page does not address trusts.
- **[LOW] Monitoring and evaluation** — Competitors mention monitoring via tax returns. Our page omits this.

## DeepSeek query gaps (keyword density)

- `annual`: us 4× vs competitors avg 7×

## DeepSeek structural gaps

- Missing FAQ section with specific questions about annual exemption changes
- No table or timeline showing the phased reduction of the annual exempt amount
- No 'Who will be affected?' section targeting different taxpayer types
- missing visible phone number
- no HMRC/legislation citations

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials
- No references to official sources (e.g., HMRC, Autumn Statement)
- No date of publication or last update

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/cgt-property-2027-rate-changes-uk-landlords
Query: "changes to cgt annual exemption 2027"
Position: 9.7 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing annual exempt amount reduction timeline and figures. Competitors explicitly state the phased reduction from £12,300 (2022/23) to £6,000 (2023/24) to £3,000 (2024/25). Add a table showing: "Tax Year | Annual Exempt Amount | Change from Previous Year | 2022/23 | £12,300 | N/A | 2023/24 | £6,000 | -£6,300 | 2024/25 | £3,000 | -£3,000". Then state: "From 2025/26 onwards, the £3,000 exemption remains frozen with no indexation. This directly impacts landlords selling property in 2027, as the exemption is 75% lower than 2022 levels."

2. [HIGH] Missing policy objective and background. Competitors explain the Autumn Statement 2022 announcement by Jeremy Hunt. Add: "The reduction was announced at the Autumn Statement 17 November 2022, citing the need to raise £1.2bn annually by 2027/28 to support public finances. The policy objective was to align CGT treatment with income tax principles and reduce the 'gains advantage' over earned income."

3. [HIGH] Missing 'Who is affected?' section. Competitors list individuals, trustees, and personal representatives. Add a new H2: "Who Is Affected by the Annual Exemption Reduction?" with sub-sections: "Individual landlords: exemption drops from £12,300 to £3,000 by 2024/25. Trustees: exemption drops from £6,150 to £1,500 by 2024/25. Personal representatives: exemption drops from £12,300 to £3,000 for the year of death and next two years."

4. [MEDIUM] Missing impact on trusts and trustees. Competitors note trustees have a lower exempt amount. Add: "For trusts, the annual exempt amount is half the individual rate. From 2024/25, trustees have a £1,500 exemption (down from £6,150 in 2022/23). This means trustees selling property in 2027 will have minimal shelter from CGT."

5. [MEDIUM] Missing monitoring and evaluation. Competitors mention HMRC monitoring via tax returns. Add: "HMRC monitors compliance through self-assessment tax returns (SA108 Capital Gains summary). Landlords must report gains exceeding the annual exempt amount within 60 days of completion for UK residential property disposals."

6. [LOW] Missing worked numerical example showing impact of exemption reduction. Add: "Example: Landlord sells buy-to-let property in 2027. Gain after reliefs: £50,000. With £3,000 exemption, taxable gain = £47,000. At 18% basic rate = £8,460 tax. If exemption were still £12,300, taxable gain = £37,700, tax = £6,786. Difference = £1,674 extra tax due to exemption reduction."

TITLE/META:
Current title: CGT Property 2027 Rate Changes: Impact on UK Landlords | Property Tax Partners
Suggested title: CGT Annual Exemption 2027: Changes & Impact on UK Landlords
Suggested meta description: The CGT annual exempt amount drops to £3,000 by 2024/25. See how this affects landlords selling property in 2027, with rates, examples, and planning tips.

E-E-A-T:
- Add author byline: "By [Name], Chartered Tax Adviser, Property Tax Partners" with link to author bio page
- Add publication date: "Published: [Date] | Last updated: [Date]"
- Add HMRC citation: "HMRC Capital Gains Tax Manual CG18000" and link to gov.uk page on annual exempt amount
- Add Autumn Statement reference: "HM Treasury, Autumn Statement 2022, paragraph 3.45"
- Add visible phone number in sidebar or footer: "Call us: 020 7XXX XXXX"

WORD COUNT: Current 1443. Target: 1800-2000 (competitor average 722, but query depth requires more detail).

FAQ ADDITIONS:
- What is the CGT annual exempt amount for 2027?
- How much has the annual exempt amount changed since 2022?
- Does the annual exempt amount apply to trusts selling property?
- Can I transfer assets to my spouse to use their annual exemption?
- What happens if I exceed the annual exempt amount in 2027?
- Is the annual exempt amount frozen or indexed for inflation?

SCHEMA:
- Add FAQ schema (JSON-LD) for the FAQ section
- Add Article schema with author, datePublished, dateModified, publisher, and mainEntityOfPage
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
PAGE: cgt-property-2027-rate-changes-uk-landlords
STATUS: complete
WORD_COUNT_BEFORE: 1443
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
