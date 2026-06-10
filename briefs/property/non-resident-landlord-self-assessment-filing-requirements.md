# Page improvement brief: non-resident-landlord-self-assessment-filing-requirements

> You are Claude Opus 4.7. You have full filesystem and Bash access to the Accounting project at `C:/Users/user/Documents/Accounting`. Your job is to rewrite a single blog post to be the best version that could rank above the competitors. Follow the workflow at the bottom of this brief. Verify everything before writing.

## Page details

- **URL**: https://www.propertytaxpartners.co.uk/blog/non-resident-landlord-tax/non-resident-landlord-self-assessment-filing-requirements
- **Source file**: `Property/web/content/blog/non-resident-landlord-self-assessment-filing-requirements.md`
- **Primary query**: `hmrc self assessment non resident landlord`
- **Current avg position**: 54.8
- **Priority score**: 1.1 / 10
- **Current word count**: 1690
- **Competitor avg word count**: 294
- **Current section count**: 10
- **Competitor avg section count**: 2
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
| 4 | 0 | 54.8 | 0.00% | hmrc self assessment non resident landlord |
| 3 | 0 | 70.3 | 0.00% | non resident landlord tax returns |
| 1 | 0 | 61.0 | 0.00% | quarterly nrl return |

## Competitors analysed by DeepSeek

**Verify each one. Fetch the HTML and read what they actually have before transcribing claims.**

- https://www.landlordstax.co.uk/resources/guide-for-non-resident-landlords/self-assessment/ _(parsed: 306 words, 2 sections)_
- https://www.landlordstax.co.uk/resources/guide-for-uk-resident-landlords/self-assessment/ _(parsed: 271 words, 2 sections)_

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

- **[MEDIUM] What is Self Assessment and how does it work?** — Competitors have a dedicated H2 explaining the basics of Self Assessment (e.g., 'over 30 years' history). Our page jumps straight into filing requirements without a foundational explanation.

## DeepSeek query gaps (keyword density)

_(none)_

## DeepSeek structural gaps

- Missing a clear introductory section defining Self Assessment for non-resident landlords

> ⚠️ Many "missing FAQ" or "missing schema" structural gaps are wrong — the parser had bugs (didn't recognise `<dl>/<dt>/<dd>`, didn't always pick up JSON-LD). Always verify against the source file and the live HTML.

## DeepSeek E-E-A-T gaps

- - No author or reviewer credentials displayed
- No citations from HMRC official guidance or legislation
- No links to authoritative sources (e.g., HMRC manuals, tax treaties)

## DeepSeek improvement brief (raw)

```
IMPROVEMENT BRIEF  
Page: /blog/non-resident-landlord-tax/non-resident-landlord-self-assessment-filing-requirements  
Query: "hmrc self assessment non resident landlord"  
Position: 54.8 -> target: top 3  
Priority score: 92/100  

CONTENT GAPS (fix in order):  

1. [CRITICAL] Missing foundational explanation of Self Assessment for non-resident landlords. Competitors (e.g., TaxScouts, Crunch) open with a clear H2: "What is Self Assessment for non-resident landlords?" and explain it’s a system over 30 years old, requiring annual returns for UK rental income.  
   **Add:** A new H2 immediately after the intro: "What is Self Assessment and how does it work for non-resident landlords?" Write 150–200 words explaining: Self Assessment is HMRC’s system for declaring income not taxed at source (e.g., rental income). Non-resident landlords must file if gross rental income exceeds £1,000 (or net if below) and they are not in the NRL scheme. Cite HMRC’s official definition from gov.uk (link to HMRC manual SA100).  

2. [HIGH] Missing worked numerical example for CGT calculation. Competitors (e.g., Anderson Accountants) include a step-by-step example showing: purchase price £280,000, sale price £350,000, gain £70,000, annual exempt amount £3,000 (2025/26), taxable gain £67,000, CGT at 18%/24% = £12,060–£16,080.  
   **Add:** A new H3 under "Capital Gains Tax for Non-Resident Landlords": "Worked example: CGT on UK property sale". Show: Purchase price £280,000, sale price £350,000, gain £70,000. Deduct annual exempt amount £3,000 (2025/26) → taxable gain £67,000. If basic rate taxpayer: first £37,700 at 18% = £6,786, remaining £29,300 at 24% = £7,032, total CGT = £13,818. If higher rate: £67,000 at 24% = £16,080.  

3. [HIGH] Missing specific HMRC deadline dates for 2025/26. Competitors (e.g., TaxAssist Accountants) list exact dates: 5 October 2025 (register if new), 31 January 2026 (online filing + payment), 31 July 2026 (second payment on account).  
   **Add:** Under "Deadlines and Required Forms", add a bulleted list:  
   - Register for Self Assessment: by 5 October 2025 (if new landlord in 2024/25)  
   - File online return: by 31 January 2026  
   - Pay tax owed: by 31 January 2026  
   - Second payment on account (if applicable): by 31 July 2026  
   Link to HMRC’s official deadline page.  

4. [MEDIUM] Missing explanation of the NRL scheme’s impact on Self Assessment. Competitors (e.g., RIFT) explain that landlords in the NRL scheme have tax deducted at source (20%) but still must file Self Assessment if total income exceeds £1,000 or they want to claim expenses.  
   **Add:** Under "Reporting Rental Income, Expenses and the NRL Scheme", add 100 words: "If you’re in the Non-Resident Landlord Scheme, your letting agent deducts 20% tax from rent before paying you. You still need to file a Self Assessment return if your gross rental income exceeds £1,000 (or if you want to claim allowable expenses to reduce your tax bill). The NRL tax deducted is credited against your final liability."  

5. [MEDIUM] Missing double taxation relief example. Competitors (e.g., BDO) show a simple scenario: UK rental income £20,000, taxed in UK at 20% = £4,000. If also taxed in home country at 15% = £3,000, UK gives relief via Double Taxation Agreement (DTA) so no double tax.  
   **Add:** Under "Double Taxation Relief and International Considerations", add 80 words: "Example: You’re a French resident with UK rental income of £20,000. UK tax at 20% = £4,000. France taxes the same income at 15% = £3,000. Under the UK-France DTA, you claim Foreign Tax Credit Relief in France for the UK tax paid, so you only pay the difference (£1,000) in France. Always check the specific treaty with your country."  

TITLE/META:  
Current title: Non-Resident Landlord Self Assessment: UK Filing Guide 2026 | Property Tax Partners  
Suggested title: HMRC Self Assessment for Non-Resident Landlords: 2025/26 Filing Guide  
Suggested meta description: Complete guide to HMRC Self Assessment for non-resident landlords. Deadlines, NRL scheme, CGT examples, and double taxation relief. Updated for 2025/26.  

E-E-A-T:  
- Add author name and credentials: "Written by [Name], Chartered Tax Adviser (CTA) at Property Tax Partners" with a link to author bio page.  
- Add reviewer line: "Reviewed by [Name], ACCA qualified accountant, March 2025."  
- Add 3–5 inline citations to HMRC official guidance:  
  - HMRC Self Assessment manual (SA100)  
  - HMRC Non-Resident Landlord Scheme guidance (NRL1)  
  - HMRC Capital Gains Tax for non-residents (CG73900)  
  - HMRC Double Taxation Agreements list  
  - Link to gov.uk page: "Register for Self Assessment if you’re a non-resident landlord"  
- Add a "Sources" section at bottom with links to these HMRC pages.  

WORD COUNT: Current 1690. Target: 2,400–2,800 (competitor average 2,940).  

FAQ ADDITIONS:  
Add 5 FAQ questions with answers (each 50–80 words):  
1. "Do I need to file Self Assessment if I’m a non-resident landlord with no UK income?"  
   Answer: No, but you must still register if you have any UK rental income, even if it’s below £1,000. If no income, you don’t need to file.  
2. "What happens if I miss the Self Assessment deadline as a non-resident landlord?"  
   Answer: You’ll face an initial £100 penalty, plus daily penalties after 3 months. Interest accrues on unpaid tax at 7.5% (2025/26 rate).  
3. "Can I file my Self Assessment return online from abroad?"  
   Answer: Yes, HMRC’s online system is accessible worldwide. You’ll need a Government Gateway ID and UTR number.  
4. "How do I claim the Rent a Room Scheme as a non-resident landlord?"  
   Answer: If you let furnished accommodation in your UK home, you can earn up to £7,500 tax-free (2025/26). You must still file Self Assessment to claim it.  
5. "Do I need to pay tax on UK rental income if I live in a country with a Double Taxation Agreement?"  
   Answer: Yes, UK tax applies first. You then claim relief in your home country under 
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
PAGE: non-resident-landlord-self-assessment-filing-requirements
STATUS: complete
WORD_COUNT_BEFORE: 1690
WORD_COUNT_AFTER: <fill in>
FAQ_COUNT_BEFORE: <fill in from source file>
FAQ_COUNT_AFTER: <fill in>
EXTERNAL_LINKS_ADDED: <count>
INLINE_CTAS_ADDED: <count>
BUILD_PASSED: <yes/no>
CANNIBALISATION_RISK: <none / flagged: which pillar>
SUMMARY: <2-3 sentences on what changed>
```
