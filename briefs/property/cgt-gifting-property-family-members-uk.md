# Page improvement brief: cgt-gifting-property-family-members-uk

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-gifting-property-family-members-uk
- **Source file**: `Property/web/content/blog/cgt-gifting-property-family-members-uk.md`
- **Primary query**: `capital gains tax on gifts`
- **Current avg position**: 77.5
- **Priority score**: 4.5 / 10
- **Current word count**: 1581
- **Competitor avg word count**: 2825
- **Current section count**: 10
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
| 6 | 0 | 77.5 | 0.00% | capital gains tax on gifts |
| 4 | 0 | 72.8 | 0.00% | gifts and capital gains tax |
| 3 | 0 | 69.0 | 0.00% | gifting property tax |
| 3 | 0 | 65.3 | 0.00% | gifting property tax uk |
| 2 | 0 | 67.0 | 0.00% | capital gains tax on gifted property |
| 2 | 0 | 68.0 | 0.00% | capital gains tax gifts |
| 2 | 0 | 72.5 | 0.00% | gifting property and capital gains tax |
| 2 | 0 | 62.5 | 0.00% | cgt on gifts |
| 2 | 0 | 73.5 | 0.00% | gifting property tax (or gifting property uk) |
| 1 | 0 | 71.0 | 0.00% | capital gains on gifts |
| 1 | 0 | 68.0 | 0.00% | gifting capital gains |
| 1 | 0 | 71.0 | 0.00% | gifting property capital gains tax |
| 1 | 0 | 66.0 | 0.00% | capital gains tax on selling a gifted property uk |
| 1 | 0 | 69.0 | 0.00% | capital gains tax gifted property |
| 1 | 0 | 79.0 | 0.00% | gift of property tax implications |
| 1 | 0 | 67.0 | 0.00% | cgt gifting property |
| 1 | 0 | 68.0 | 0.00% | capital gains tax on a gifted property |
| 1 | 0 | 78.0 | 0.00% | taxes on gifted property |
| 1 | 0 | 67.0 | 0.00% | capital gains tax on gifted property uk |
| 1 | 0 | 67.0 | 0.00% | capital gains on gifted property |
| 1 | 0 | 74.0 | 0.00% | capital gains tax gift |
| 1 | 0 | 72.0 | 0.00% | property gift tax |
| 1 | 0 | 82.0 | 0.00% | gifted property tax implications |
| 1 | 0 | 69.0 | 0.00% | capital gains tax and gifts |
| 1 | 0 | 69.0 | 0.00% | gifted property capital gains tax |
| 1 | 0 | 73.0 | 0.00% | capital gains tax gifting property |
| 1 | 0 | 66.0 | 0.00% | capital gains tax on gifts of property |
| 1 | 0 | 65.0 | 0.00% | capital gains gifted property |
| 1 | 0 | 64.0 | 0.00% | cgt on gifted property |
| 1 | 0 | 67.0 | 0.00% | capital gains tax on gift |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://smartasset.com/investing/capital-gains-tax-calculator _(parsed: 4104 words, 10 sections)_
- https://www.gov.uk/capital-gains-tax/gifts _(parsed: 268 words, 2 sections)_

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

- **[HIGH] Capital gains tax rates and thresholds for 2025/26** — Competitors provide specific tax rates (e.g., 10%, 20% for basic and higher rate taxpayers) and annual exempt amounts. Our page lacks any mention of current rates or thresholds.
- **[MEDIUM] Short-term vs long-term capital gains distinction** — Competitors explain the difference between short-term (held ≤1 year) and long-term gains, with different tax treatments. Our page does not address holding periods.
- **[HIGH] How to calculate capital gains on gifts** — Competitors include step-by-step calculation methods and examples with figures. Our page lacks a clear calculation example or formula.
- **[HIGH] Strategies to reduce CGT on gifts (e.g., holdover relief, gift relief)** — Competitors discuss tax-loss harvesting, using annual exemption, and other reliefs. Our page mentions exemptions but lacks detailed strategies like holdover relief or gift relief.
- **[MEDIUM] Impact of other taxes (e.g., inheritance tax, stamp duty) on gifts** — Competitors cover interactions with other taxes. Our page focuses solely on CGT without mentioning IHT or SDLT implications.

## DeepSeek query gaps (keyword density)

- `tax`: us 41× vs competitors avg 121×
- `gains`: us 11× vs competitors avg 77.3×
- `capital`: us 8× vs competitors avg 70.7×

## DeepSeek structural gaps

- Missing a dedicated 'How to Calculate CGT on Gifts' section with step-by-step example
- No FAQ section with common questions (e.g., 'Do I pay CGT if I gift property to my spouse?')
- No comparison table of tax rates for different scenarios (e.g., basic vs higher rate taxpayer)
- Lack of a clear 'Key Takeaways' or summary box
- missing calculator or tool
- missing FAQ accordion

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author byline or credentials (e.g., 'Written by a Chartered Tax Adviser')
- No references to HMRC official guidance or legislation (e.g., TCGA 1992)
- No date of last update or review (page mentions 2026 but no specific date)
- No links to authoritative sources (e.g., HMRC manuals)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/cgt-gifting-property-family-members-uk
Query: "capital gains tax on gifts"
Position: 77.5 -> target: top 3
Priority score: 95/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing current CGT rates and thresholds for 2025/26. Competitors list: basic rate 10% (18% for residential property), higher rate 20% (24% for residential property), annual exempt amount £3,000. Add a bold table showing: "2025/26 CGT Rates: Basic rate taxpayer: 10% (18% on residential property). Higher rate taxpayer: 20% (24% on residential property). Annual exempt amount: £3,000."

2. [CRITICAL] No worked calculation example. Competitors show: "Gift property worth £300,000, original cost £150,000, gain = £150,000. Less annual exemption £3,000 = £147,000 taxable. At 18% = £26,460 CGT due." Add a full step-by-step example with specific figures: purchase price £200,000, market value at gift £350,000, gain £150,000, annual exemption £3,000, taxable gain £147,000, CGT at 18% = £26,460.

3. [HIGH] No mention of holdover relief (gift relief) under TCGA 1992 s.165. Competitors explain: "Holdover relief defers CGT when gifting business assets or certain property. The recipient takes over your original cost basis." Add a dedicated subsection "Holdover Relief (Gift Relief)" explaining eligibility: must be business assets or shares in unlisted companies, not main residence. Include condition: both donor and recipient must claim in writing within 4 years of gift.

4. [HIGH] No distinction between short-term and long-term gains. Competitors note: "Holding period does not affect CGT rate in the UK (unlike US). All gains are taxed at same rates regardless of holding period." Add a sentence: "Unlike some countries, the UK does not differentiate between short-term and long-term capital gains. All gains on property gifts are taxed at the same rates (18%/24%) regardless of how long you've owned it."

5. [HIGH] Missing interaction with Inheritance Tax (IHT). Competitors cover: "Gifts may be exempt from CGT but still count as potentially exempt transfers (PETs) for IHT. If donor dies within 7 years, IHT may apply." Add a section "How CGT and IHT Interact on Gifts" explaining: gift of property is a PET for IHT; if donor survives 7 years, no IHT; if donor dies within 7 years, taper relief applies; CGT paid may reduce IHT liability.

6. [MEDIUM] No mention of Stamp Duty Land Tax (SDLT) implications for recipient. Competitors note: "If recipient takes on a mortgage, they may owe SDLT on the amount of debt assumed." Add: "If the gifted property has an outstanding mortgage, the recipient may be liable for SDLT on the amount of debt they take over. For example, if property is worth £300,000 with £100,000 mortgage, SDLT may apply to £100,000."

7. [MEDIUM] Missing strategies to reduce CGT. Competitors list: use annual exemption each year, gift in stages, claim holdover relief, gift to spouse (no CGT), consider selling instead of gifting. Add a bullet-point list: "5 Ways to Reduce CGT on Property Gifts: 1) Use your £3,000 annual exemption, 2) Gift to spouse/civil partner (no CGT), 3) Claim holdover relief for business assets, 4) Gift in stages over multiple tax years, 5) Consider selling and gifting cash instead."

8. [MEDIUM] No FAQ section. Competitors have 5-7 FAQs. Add 6 FAQs (see below).

TITLE/META:
Current title: CGT Gifting Property Family: UK Tax Rules & Exemptions 2026 | Property Tax Partners
Suggested title: Capital Gains Tax on Gifts: UK Rules for Property & Family 2025/26
Suggested meta description: How to calculate CGT when gifting property to family in the UK. Rates, exemptions, holdover relief, and worked examples for 2025/26. HMRC guidance.

E-E-A-T:
- Add author byline: "Written by [Name], Chartered Tax Adviser (CTA) and Member of the Chartered Institute of Taxation (CIOT)" at top of page
- Add date: "Last updated: [current date] | Reviewed: [current date]" in a visible date stamp
- Add 3-4 internal links to HMRC official pages: e.g., HMRC Capital Gains Manual CG12300 (holdover relief), HMRC guidance on gifts, TCGA 1992 s.165
- Add external link to HMRC's official CGT rates page: https://www.gov.uk/capital-gains-tax/rates
- Add a "Disclaimer" box: "This article provides general guidance only. Tax rules can change. Always consult a qualified tax adviser for your specific circumstances."

WORD COUNT: Current 1,581. Target: 2,800-3,200 (competitor average 2,825).

FAQ ADDITIONS:
1. Do I pay capital gains tax if I gift property to my spouse?
2. What is the annual exempt amount for capital gains tax in 2025/26?
3. Can I avoid CGT by gifting property to my children?
4. What is holdover relief and how does it work on property gifts?
5. Do I need to report a gift of property to HMRC?
6. What happens if I gift property and die within 7 years?

SCHEMA:
- Add FAQ schema (structured data) for the 6 FAQs above
- Add Article schema with author, datePublished, dateModified, publisher, and description fields
- Add BreadcrumbList schema for navigation path
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
PAGE: cgt-gifting-property-family-members-uk
STATUS: complete
WORD_COUNT_BEFORE: 1581
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
