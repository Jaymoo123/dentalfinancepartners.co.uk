# Page improvement brief: leeds

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://propertytaxpartners.co.uk/locations/leeds
- **Source file**: `(not found - search manually)`
- **Primary query**: `property accountancy leeds`
- **Current avg position**: 16.2
- **Priority score**: 6.8 / 10
- **Current word count**: 480
- **Competitor avg word count**: 1223
- **Current section count**: 6
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
| 14 | 0 | 16.3 | 0.00% | property accountancy leeds |
| 11 | 0 | 26.3 | 0.00% | buy to let accountant leeds |
| 4 | 0 | 17.8 | 0.00% | rental accountant leeds |
| 3 | 0 | 5.3 | 0.00% | rental accountant headingley |
| 2 | 0 | 42.5 | 0.00% | landlord tax advice leeds |
| 1 | 0 | 6.0 | 0.00% | accountants property tax |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://bhp.co.uk/office/leeds/property-accountancy/ _(parsed: 1241 words, 7 sections)_
- https://bhp.co.uk/office/leeds/property-accountancy-leeds/ _(parsed: 1205 words, 7 sections)_

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

- **[HIGH] Client testimonials and case studies** — Competitors include a dedicated 'Hear what our clients say' section with a specific client quote. Our page has no testimonials or case studies.
- **[HIGH] Detailed description of services for different property types (buy-to-let, commercial development, etc.)** — Competitors mention supporting clients with 'a single buy-to-let' and 'commercial development'. Our page only mentions 'landlords' generically.
- **[MEDIUM] Explanation of how the firm works with other teams (audit, advisory) for end-to-end service** — Competitors have a section 'Joined-up support from a team who want the best for you' describing collaboration with audit and advisory teams. Our page lacks this.
- **[MEDIUM] Specific tax considerations for property investors (e.g., SDLT, capital gains, VAT)** — Competitors mention 'tax accountants' and imply expertise in property tax. Our page does not list any specific tax areas or reliefs.
- **[LOW] Related services and articles** — Competitors have 'Related Services' and 'Related articles & insights' sections with links. Our page has 'Related articles' but no content or links.

## DeepSeek query gaps (keyword density)

- `leeds`: us 13× vs competitors avg 23×
- `accountancy`: us 0× vs competitors avg 6×
- `property`: us 17× vs competitors avg 22×

## DeepSeek structural gaps

- Missing FAQ section with questions about property accountancy in Leeds
- Missing client testimonials or case studies section
- Missing team introduction section (competitors have 'Introducing our Leeds property accountancy team')
- Missing clear call-to-action with contact form or phone number prominently displayed
- missing testimonials or reviews

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author or team member names or credentials
- No client testimonials or reviews
- No links to professional bodies (e.g., ACCA, ICAEW) or accreditations
- No case studies or examples of work

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /locations/leeds
Query: "property accountancy leeds"
Position: 16.2 -> target: top 3
Priority score: 92/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Client testimonials and case studies: Competitors include a dedicated ‘Hear what our clients say’ section with a specific client quote. Add a real client testimonial (anonymised if needed) with a name, role (e.g., “Sarah, buy-to-let landlord in Headingley”), and a specific result: “They saved me £4,200 in CGT on a single sale.” Also add one case study: “Client sold a Leeds city-centre flat for £185,000. We restructured ownership to use both spouses’ allowances, reducing CGT from £14,850 to £6,930.”

2. [CRITICAL] Detailed description of services for different property types: Competitors mention ‘single buy-to-let’ and ‘commercial development’. Add three bullet points under a new H2 “Property types we work with”: (a) Buy-to-let landlords – single properties or portfolios; (b) Commercial property developers – new builds, conversions, HMOs; (c) Mixed-use investors – shops with flats above, student lets.

3. [HIGH] Specific tax considerations for property investors: Competitors list SDLT, CGT, VAT. Add a new H2 “Key tax areas we cover for Leeds property investors” with 4–5 bullet points: Stamp Duty Land Tax (SDLT) on purchases over £250,000; Capital Gains Tax on disposals (18%/24% rates); VAT on new commercial builds; Furnished Holiday Lettings rules; Section 24 mortgage interest restriction.

4. [HIGH] Explanation of how the firm works with other teams: Competitors have a ‘Joined-up support’ section. Add a new H2 “How our Leeds property team works with our audit and advisory teams” and write 2–3 sentences: “We collaborate with our audit team for portfolio valuations and our advisory team for succession planning. This means you get one joined-up service, not separate conversations.”

5. [MEDIUM] Related services and articles: Competitors have ‘Related Services’ and ‘Related articles & insights’ sections with links. Add a ‘Related services’ section with 3 links: /services/property-accountancy, /services/tax-planning, /services/landlord-tax. Add a ‘Related articles’ section with 3 links to blog posts (e.g., “CGT on property sales in 2025: what Leeds landlords need to know”).

6. [MEDIUM] Team introduction section: Competitors have ‘Introducing our Leeds property accountancy team’. Add a new H2 “Meet our Leeds property accountancy team” with 2–3 team member names, job titles, and credentials (e.g., “John Davies, ACCA – 12 years’ experience in property tax”). Include a photo if available.

TITLE/META:
Current title: Property Accountant Leeds | Tax Specialists for Landlords | Property Tax Partners
Suggested title: Property Accountancy Leeds | Landlord & Property Tax Specialists | [Firm Name]
Suggested meta description: Expert property accountancy in Leeds. We help landlords and developers save on CGT, SDLT & VAT. Free initial consultation. Call 0113 XXX XXXX.

E-E-A-T:
- Add team member names and credentials (ACCA, ICAEW, CTA) under a new H2 “Meet our team”
- Add a link to your ICAEW or ACCA accreditation page (e.g., “We are regulated by the ICAEW – find out more”)
- Add one anonymised case study with specific figures (as above)
- Add a client testimonial with a real first name and location
- Add a line: “We have advised on over 200 property transactions in Leeds since 2020”

WORD COUNT: Current 480. Target: 1,100–1,300 (competitor average 1,223).

FAQ ADDITIONS:
Add these exact 5 FAQ questions and answers (each 40–60 words):

1. What does a property accountant in Leeds do?
   A property accountant specialises in tax and accounting for landlords, developers, and property investors. We handle SDLT returns, CGT calculations, VAT on new builds, and portfolio tax planning. Unlike a general accountant, we understand Section 24, HMO rules, and furnished holiday lettings.

2. How much does property accountancy cost in Leeds?
   Typical fees range from £150–£300 per month for a single buy-to-let landlord, depending on portfolio size. We offer a free initial consultation to discuss your needs and provide a fixed-fee quote. No hidden charges.

3. Do I need a specialist property accountant if I have one buy-to-let?
   Yes. Even one property can trigger complex tax rules like Section 24 mortgage interest restriction and CGT on sale. A specialist ensures you claim all allowable expenses and use your personal allowance correctly. Many landlords overpay by £500+ per year with a general accountant.

4. What tax reliefs are available for Leeds property investors?
   Key reliefs include: Capital Gains Tax annual exemption (£3,000 in 2025/26); Private Residence Relief if you lived in the property; Letting Relief (limited); and rollover relief on reinvestment. We also advise on incorporating to reduce SDLT on future purchases.

5. How quickly can you help me with a property tax return?
   We typically complete self-assessment tax returns for property income within 10 working days of receiving your documents. For urgent CGT calculations (e.g., a sale completing in 30 days), we can provide a same-day estimate.

SCHEMA:
Add LocalBusiness schema with:
- @type: LocalBusiness
- name: [Firm Name] Leeds
- address: [full Leeds address]
- telephone: [Leeds phone number]
- areaServed: Leeds, West Yorkshire
- priceRange: ££
- sameAs: [links to Google Business Profile, LinkedIn, ICAEW profile]

Add FAQPage schema for the 5 FAQ questions above.
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
PAGE: leeds
STATUS: complete
WORD_COUNT_BEFORE: 480
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
