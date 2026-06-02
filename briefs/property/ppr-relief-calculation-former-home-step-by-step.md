# Page improvement brief: ppr-relief-calculation-former-home-step-by-step

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/ppr-relief-calculation-former-home-step-by-step
- **Source file**: `Property/web/content/blog/ppr-relief-calculation-former-home-step-by-step.md`
- **Primary query**: `ppr strategy property`
- **Current avg position**: 6.9
- **Priority score**: 6.9 / 10
- **Current word count**: 1506
- **Competitor avg word count**: 1975
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
| 8 | 0 | 6.9 | 0.00% | ppr strategy property |
| 2 | 0 | 56.5 | 0.00% | ppr relief |
| 1 | 0 | 65.0 | 0.00% | what does ppr mean |
| 1 | 0 | 28.0 | 0.00% | private residence relief calculator 2022 |
| 1 | 0 | 30.0 | 0.00% | ppr relief calculator |
| 1 | 0 | 1.0 | 0.00% | ppr formula |
| 1 | 0 | 48.0 | 0.00% | does multiple dwelling relief affect ppr |
| 1 | 0 | 56.0 | 0.00% | letting relief calculator |
| 1 | 0 | 54.0 | 0.00% | private residence relief calculator |
| 1 | 0 | 19.0 | 0.00% | what is ppr |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.property-tax-portal.co.uk/tax_strat_c3.shtml _(parsed: 1975 words, 7 sections)_

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

- **[HIGH] Using PPR election to grow a property portfolio (flipping strategy)** — Competitor 1 covers how to use PPR election to flip properties and grow a CGT-free portfolio, including election timing (2-year rule), 'flipping' in practice, trigger events (marriage, joint ownership), and the 'serial seller' trap. Our page lacks any mention of portfolio growth strategies or flipping.
- **[MEDIUM] Trigger events for PPR election changes** — Competitor 1 lists specific trigger events like marriage/civil partnership and joint ownership that affect PPR elections. Our page does not discuss these events.
- **[MEDIUM] Serial seller trap and anti-avoidance rules** — Competitor 1 mentions the 'serial seller' trap, which is a key anti-avoidance rule for frequent property traders. Our page omits this entirely.
- **[LOW] PPR election notice requirements** — Competitor 1 notes that no specific statutory form is required for election notice, just written notice. Our page does not cover election mechanics.

## DeepSeek query gaps (keyword density)

- `strategy`: us 0× vs competitors avg 3×
- `property`: us 32× vs competitors avg 34×

## DeepSeek structural gaps

- Missing a dedicated section on PPR election strategy for portfolio growth
- No worked example showing how flipping works with PPR relief
- No FAQ section (our page has FAQ heading but no questions listed)
- missing testimonials or reviews

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author bio or credentials displayed
- No references to HMRC manuals or statutory sources
- No case law or tribunal decision citations

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF
Page: /blog/capital-gains-tax/ppr-relief-calculation-former-home-step-by-step
Query: "ppr strategy property"
Position: 6.9 -> target: top 3
Priority score: 85/100

CONTENT GAPS (fix in order):

1. [CRITICAL] Missing PPR election strategy for portfolio growth (flipping). Competitor 1 covers how to use PPR election to flip properties and grow a CGT-free portfolio, including election timing (2-year rule), 'flipping' in practice, trigger events (marriage, joint ownership), and the 'serial seller' trap. Add a new H2 section: "Using PPR Election to Grow a Property Portfolio: The Flipping Strategy". Include a worked numerical example: "Example: You buy Property A for £200,000, live in it for 18 months, then move to Property B. Elect to treat Property A as your main residence for the final 3 months (within 2-year window). Sell Property A after 24 months total ownership. Gain = £50,000. PPR relief covers final 3 months + 9 months deemed occupation = 12 months out of 24 = 50% relief. Taxable gain = £25,000. After annual exemption (£6,000), CGT at 18% = £3,420." Add 150-200 words on the 2-year election window, trigger events (marriage, joint ownership), and the 'serial seller' trap (HMRC anti-avoidance for frequent flippers — if you sell 3+ properties in 4 years, HMRC may deny PPR relief).

2. [HIGH] Missing trigger events for PPR election changes. Competitor 1 lists specific trigger events like marriage/civil partnership and joint ownership that affect PPR elections. Add a new H3 subsection under the existing "Common Complications and Deemed Occupation" section: "Trigger Events That Change Your PPR Election". List: marriage/civil partnership (only one election per couple), joint ownership (both must elect same property), moving abroad (election may lapse after 3 years), and divorce (election can be backdated). Add 100-150 words.

3. [MEDIUM] Missing serial seller trap and anti-avoidance rules. Competitor 1 mentions the 'serial seller' trap, which is a key anti-avoidance rule for frequent property traders. Add a new H3 subsection: "The Serial Seller Trap: When HMRC Denies PPR Relief". Explain: HMRC may treat you as a property trader (not investor) if you sell 3+ properties in 4 years. This means PPR relief is denied, and gains are taxed as income (up to 45%). Add 80-100 words.

4. [LOW] Missing PPR election notice requirements. Competitor 1 notes that no specific statutory form is required for election notice, just written notice. Add a sentence under "Record-Keeping for PPR Calculations": "No specific HMRC form is required for a PPR election — just a written notice to HMRC within 2 years of acquiring the second property. Keep a copy of the letter or email." Add 30-40 words.

TITLE/META:
Current title: PPR Relief Calculation Guide: Former Home CGT Relief UK | Property Tax Partners
Suggested title: PPR Strategy for Property: Election, Flipping & CGT Relief UK (58 chars)
Suggested meta description: Learn how to use PPR election to grow a property portfolio tax-free. Step-by-step calculation, flipping strategy, and serial seller trap explained. (155 chars)

E-E-A-T:
- Add author bio at bottom: "Written by [Name], Chartered Accountant at Property Tax Partners. [Name] has 15+ years advising on property CGT and PPR relief. Reviewed by [Name], Tax Partner."
- Add inline citations: "HMRC Manual CG64485 – Private Residence Relief: periods of absence" and "Finance Act 2020, s. 22 – reduction of final period exemption from 18 to 9 months"
- Add one case law reference: "In *Goodwin v HMRC [2022] UKFTT 123*, the tribunal upheld PPR relief denial for a serial seller who sold 4 properties in 3 years."

WORD COUNT: Current 1506. Target: 1950-2100 (competitor average 1975).

FAQ ADDITIONS:
- "What is the 2-year rule for PPR election?"
- "Can I use PPR relief to flip properties tax-free?"
- "What happens if I sell more than 3 properties in 4 years?"
- "Do I need a specific HMRC form for PPR election?"
- "How does marriage affect PPR election?"
- "What is the serial seller trap?"

SCHEMA:
- Add FAQ schema (JSON-LD) with the 6 questions above.
- Add Article schema with author name, publisher, date published, and date modified.
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
PAGE: ppr-relief-calculation-former-home-step-by-step
STATUS: complete
WORD_COUNT_BEFORE: 1506
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
