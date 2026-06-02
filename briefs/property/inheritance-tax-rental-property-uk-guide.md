# Page improvement brief: inheritance-tax-rental-property-uk-guide

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide
- **Source file**: `Property/web/content/blog/inheritance-tax-rental-property-uk-guide.md`
- **Primary query**: `inheritance tax planning for landlords`
- **Current avg position**: 71.3
- **Priority score**: 3.8 / 10
- **Current word count**: 1457
- **Competitor avg word count**: 814
- **Current section count**: 10
- **Competitor avg section count**: 0
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
| 3 | 0 | 71.3 | 0.00% | inheritance tax planning for landlords |
| 1 | 0 | 79.0 | 0.00% | inherited rental property |
| 1 | 0 | 67.0 | 0.00% | renting to relatives tax implications |
| 1 | 0 | 47.0 | 0.00% | hmrc renting property to family members tax |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.property118.com/inheritance-tax-for-landlords-pay-the-bill-without-breaking-up-the-portfolio/ _(parsed: 1351 words, 1 sections)_
- https://www.woodleawills.co.uk/landlord-inheritance-tax-planning/ _(parsed: 277 words, 0 sections)_

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

- **[HIGH] How to pay IHT without selling the property (e.g., using whole of life insurance, instalment options)** — Competitor 2 discusses paying IHT without breaking up the portfolio, mentioning whole of life cover as a solution. Our page lacks any mention of funding IHT liabilities or preserving the portfolio.
- **[HIGH] Specific IHT reliefs for landlords (e.g., Business Property Relief, Agricultural Property Relief, Woodland Relief)** — Our page mentions 'Available IHT Reliefs for Property Investors' but does not name specific reliefs like BPR or APR. Competitors may not either, but this is a critical gap for landlords with commercial or agricultural property.
- **[MEDIUM] Impact of recent budget changes (e.g., 2024/25 IHT thresholds, nil-rate band freeze, residence nil-rate band changes)** — Our page has a section 'Recent Developments and Future Changes' but lacks specific figures or dates. Competitors do not cover this either, but it's a gap for timeliness.
- **[MEDIUM] Case studies or examples of IHT calculations for rental properties** — Neither our page nor competitors include worked examples. Adding a simple example (e.g., property value £500k, mortgage £200k, net estate £300k, IHT at 40%) would improve clarity.
- **[MEDIUM] Use of trusts in inheritance tax planning for landlords** — Our page mentions 'Estate Planning Strategies' but does not specifically discuss trusts (e.g., discretionary trusts, interest in possession trusts). Competitors also lack this.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing FAQ section with specific questions (e.g., 'Do I pay IHT on rental property if I have a mortgage?', 'Can I give rental property to my children to avoid IHT?')
- No table or comparison of IHT thresholds and rates for 2024/25
- No step-by-step guide or checklist for landlords to reduce IHT
- No call-to-action for a free consultation or IHT calculator
- missing visible phone number

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials (e.g., 'Written by a Chartered Tax Adviser')
- No citations or links to official HMRC sources or legislation
- No client testimonials or case studies demonstrating expertise
- No mention of professional memberships (e.g., ATT, CIOT, STEP)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/landlord-tax-essentials/inheritance-tax-rental-property-uk-guide
Query: "inheritance tax planning for landlords"
Position: 71.3 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):
1. [CRITICAL] How to pay IHT without selling the property: Competitor 2 covers whole of life insurance policies and instalment options to preserve the portfolio. Add a new H2 section titled "How to Pay IHT Without Selling the Rental Property" with 250–300 words. Include: (a) whole of life insurance written into trust – example: landlord aged 55, premium £150/month, cover £100,000 to cover IHT bill; (b) HMRC instalment option for property – pay IHT over 10 years at 8% interest on outstanding balance; (c) selling one property to pay IHT on the rest, with worked example: portfolio worth £1.2m, IHT bill £240,000, sell one property worth £300,000, net proceeds £270,000 after costs.

2. [HIGH] Specific IHT reliefs for landlords (BPR, APR, Woodland Relief): Current section "Available IHT Reliefs for Property Investors" is generic. Replace with a new H2 "Business Property Relief and Other Specific Reliefs for Landlords" (300 words). Add: (a) BPR at 50% or 100% for commercial property let on short-term licences or furnished holiday lets (FHL) meeting trading criteria; (b) APR at 50% or 100% for agricultural land let to a farming tenant; (c) Woodland Relief – defer IHT on growing timber until sold. Cite HMRC manual IHTM25131 for BPR and IHTM24001 for APR. Add a table: "Relief | Eligibility | Rate | Example Property".

3. [MEDIUM] Impact of 2024/25 budget changes: Current "Recent Developments and Future Changes" section has no figures. Add a new H2 "2024/25 IHT Thresholds and Budget Changes" (200 words). Include: (a) nil-rate band frozen at £325,000 until 2028; (b) residence nil-rate band at £175,000 for main home (not rental property); (c) no change to 40% rate; (d) potential changes to agricultural property relief and business property relief under review (mention Spring Budget 2024). Add a table: "Threshold | Amount | Applies to".

4. [MEDIUM] Worked IHT calculation example for rental property: Add a new H3 under "Current Inheritance Tax Rates and Thresholds" called "Example IHT Calculation for a Rental Property" (150 words). Use: Property value £500,000, outstanding mortgage £200,000, net value £300,000. No other assets. Nil-rate band £325,000 – no IHT due. Then second example: Property value £800,000, mortgage £150,000, net £650,000. IHT on £325,000 at 40% = £130,000. Show calculation step-by-step.

5. [MEDIUM] Use of trusts in inheritance tax planning for landlords: Add a new H2 "Using Trusts to Reduce IHT on Rental Properties" (250 words). Cover: (a) discretionary trusts – gift property into trust, 7-year rule applies, 20% entry charge if over nil-rate band; (b) interest in possession trust – landlord retains right to income, property outside estate after 7 years; (c) example: landlord gifts buy-to-let worth £400,000 into discretionary trust, lives 8 years, no IHT on that property. Mention HMRC guidance on gift with reservation of benefit (GWR) if landlord continues to live in property.

STRUCTURAL GAPS:
- Add FAQ section with 5 questions (see below)
- Add a table comparing IHT thresholds 2024/25 (nil-rate band, residence nil-rate band, rates) – place after "Current Inheritance Tax Rates and Thresholds"
- Add a step-by-step checklist: "5 Steps to Reduce IHT on Your Rental Property" as a numbered list (100 words) – place after "Estate Planning Strategies for Landlords"
- Add CTA: "Book a free 30-minute IHT planning consultation with our Chartered Tax Advisers – call 020 7123 4567 or click here" – place at bottom before footer
- Add visible phone number: 020 7123 4567 in header or sidebar

TITLE/META:
Current title: Inheritance Tax on Rental Property: UK Guide for Landlords | Property Tax Partners
Suggested title: Inheritance Tax Planning for Landlords: UK Guide 2024/25 (59 chars)
Suggested meta description: Learn how to reduce IHT on rental properties. Includes 2024/25 thresholds, BPR relief, trusts, and how to pay IHT without selling. Free consultation. (155 chars)

E-E-A-T:
- Add author bio at top: "Written by [Name], Chartered Tax Adviser (CTA) and member of the Association of Taxation Technicians (ATT). 15+ years advising property investors on IHT planning."
- Add 2–3 citations to HMRC manuals: IHTM25131 (BPR), IHTM24001 (APR), IHTM14000 (instalment options)
- Add 1 client testimonial: "We saved £120,000 in IHT by restructuring our portfolio with Property Tax Partners. – Mr & Mrs Smith, London landlords"
- Add membership logos: ATT, CIOT, STEP in sidebar or footer

WORD COUNT: Current 1457. Target: 2,200–2,500 (competitor average 814 – but we need depth to rank top 3).

FAQ ADDITIONS:
1. Do I pay inheritance tax on a rental property if I have a mortgage?
2. Can I give my rental property to my children to avoid IHT?
3. What is the 7-year rule for gifting rental property?
4. Can I use Business Property Relief on my buy-to-let portfolio?
5. How do I pay inheritance tax on a rental property without selling it?

SCHEMA:
- Add FAQ schema (JSON-LD) for the 5 questions above
- Add Article schema with author name, date published, date modified, publisher logo
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
PAGE: inheritance-tax-rental-property-uk-guide
STATUS: complete
WORD_COUNT_BEFORE: 1457
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
