# Session B — start here

**You are Session B**, one of three parallel Claude Opus 4.7 sessions continuing the Property website page rewrite work. You have a pre-assigned list of 15 pages to rewrite. Sessions A and C have their own assigned lists. **You will never need to coordinate with A or C in real time** because page assignments are fixed.

---

## Read order (do this before touching any code)

1. **This file (you are reading it).** Tells you who you are, what you're doing, what your 15 pages are.
2. **`docs/competitor_rewrite_playbook.md`** — the master playbook explaining the system, the analysis pipeline, the per-page workflow, the universal rules.
3. **`docs/property/rewrite_progress_2026-05-21.md`** — the log of the first 17 pages so you understand what good looks like. The Peterborough page (`Property/web/content/blog/peterborough-property-accountant-specialist-tax-services.md`) is the gold-standard reference.
4. **`docs/property/site_wide_flags.md`** — issues already known to need user input. Add to the bottom (append-only) when you find more. Do not pause to wait for user input; flag and continue.
5. **`docs/property/page_rewrite_tracker.md`** — the master tracker. Find the "Session B pages" section. That's your work list. You can also see what Sessions A and C are doing.

---

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Brand voice: practical, specific, "no hard sell". Exact figures and named legislation, not vague hedges.
- Anonymised social proof only. Never real client names.

### Lead-gen architecture
- The blog template (`Property/web/src/components/blog/BlogPostRenderer.tsx`) **automatically injects a `LeadForm` at the bottom of every post**. **Never duplicate this in body content.**
- Add 1-3 inline `<aside>` CTAs in the body at high-intent moments. Drive scroll-to-form, do NOT embed a duplicate form.
- Content pre-sells the form via worked examples, HMRC citations, local data.

### CSS in markdown content
- **Tailwind utility classes do NOT work in markdown body content.** Tailwind v4 scans `src/**` only, not `content/**`.
- Use semantic HTML in markdown: `<aside>`, `<table>`, `<ul>`, `<strong>`.
- The `.prose-blog` rules in `Property/web/src/app/globals.css` style all of these automatically.
- Inline CTA pattern: `<aside><p>Headline</p><p>Body copy that prompts scroll-to-form below.</p></aside>` — no classes.
- Tables: just `<table><thead><tr><th>...</th></tr></thead><tbody>...</tbody></table>` — no classes.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array.
- The template auto-emits FAQPage JSON-LD from frontmatter via `buildBlogPostingJsonLd`. **Do NOT manually add FAQ schema in body content.** If DeepSeek's brief says "add FAQ schema", ignore — schema is already there. The valuable action is to expand the FAQs themselves.
- Target 10-14 FAQs per page.
- Article, FAQPage, BreadcrumbList, Organization all auto-emit.

### Cannibalisation
- Pillar pages exist for major concepts (Section 24, BTL limited company, MTD, CGT on UK property). When your page touches one of those, write the **applied / scenario / local** version, not the comprehensive theoretical version. Link out to the pillar.
- Do NOT duplicate worked examples verbatim across pages.
- Pre-flagged cannibalisation risks for your pages are listed in `docs/property/page_rewrite_tracker.md` under "Session B pages" — check the Notes column.

### MTD threshold (most common error to look for and fix)
- The MTD-for-ITSA threshold is **£50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028**. NEVER £10,000.
- Many existing pages have the obsolete £10,000 threshold. Fix every instance you see.
- The mandate is **already live** (current date is in 2026 or later). Reframe any "April 2026 will/coming/from" language as past tense.

### Date stamping
- Update the `date:` frontmatter to today's date when you rewrite a page.

### External authority links to favour
- HMRC Property Income Manual: https://www.gov.uk/hmrc-internal-manuals/property-income-manual
- HMRC Capital Gains Manual: https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual
- gov.uk MTD for ITSA sign-up checker: https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax
- legislation.gov.uk ITTOIA 2005: https://www.legislation.gov.uk/ukpga/2005/5
- legislation.gov.uk TCGA 1992: https://www.legislation.gov.uk/ukpga/1992/12
- HMRC CGT on UK property service: https://www.gov.uk/report-and-pay-your-capital-gains-tax

---

## Per-page workflow

For each page in your assignment list (in priority order):

### Step 1 — Claim the page
Open `docs/property/page_rewrite_tracker.md`. Find your page in the "Session B pages" table. Change Status from `⬜ todo` to `🟡 in_progress`. Add today's date. Save. This prevents Sessions A and C from working on it.

### Step 2 — Read the source
The source markdown file is at `Property/web/content/blog/<slug>.md`. Read it completely. Note: current word count, current FAQ count, current title and meta, factual errors (especially MTD threshold), em-dashes.

### Step 3 — Pull data (cannibalisation + GSC)
```bash
cd C:/Users/user/Documents/Accounting && python -c "
import sys; sys.path.insert(0, '.')
from optimisation_engine.competitor._db import _sql
SLUG = '<your-page-slug-here>'
rows = _sql(f\"SELECT query, SUM(impressions) AS i, SUM(clicks) AS c, ROUND(AVG(position)::NUMERIC,1) AS p FROM gsc_query_data WHERE site_key='property' AND page_url ILIKE '%{SLUG}%' AND date >= CURRENT_DATE - 90 GROUP BY query ORDER BY SUM(impressions) DESC LIMIT 15\")
for r in rows: print(f'  {r[\"i\"]} impr | {r[\"c\"]} clk | pos {r[\"p\"]} | {r[\"query\"]}')
"
```

### Step 4 — Fetch competitors (verify DeepSeek claims)
Pull competitor URLs from `briefs/property/<slug>.md` and verify:

```bash
cd C:/Users/user/Documents/Accounting && python -c "
import sys; sys.path.insert(0, '.')
from optimisation_engine.competitor._fetch import fetch_url
from bs4 import BeautifulSoup
URL = '<competitor-url>'
status, html = fetch_url(URL)
if status == 200:
    soup = BeautifulSoup(html, 'lxml')
    print(f'H2s: {[h.get_text(strip=True) for h in soup.find_all(\"h2\")]}')
    for t in soup(['script','style','nav','header','footer','aside','noscript']): t.decompose()
    print(f'Words: {len(soup.get_text(\" \", strip=True).split())}')
"
```

### Step 5 — Rewrite
Apply the universal rules. Target ~2,500-3,500 words. Expand FAQs to 10-14. Add 1-3 inline `<aside>` CTAs. Add 3-6 external authority links. Fix MTD threshold and em-dashes. Update date. Stay clear of cannibalisation per tracker Notes.

### Step 6 — Build
```bash
cd C:/Users/user/Documents/Accounting/Property/web && npm run build
```

### Step 7 — Verify FAQ schema count
```bash
grep -o '"@type":"Question"' "C:/Users/user/Documents/Accounting/Property/web/.next/server/app/blog/<category>/<slug>.html" | wc -l
```

### Step 8 — Verify no em-dashes and no Tailwind leakage
```bash
grep -c "—" "C:/Users/user/Documents/Accounting/Property/web/content/blog/<slug>.md"
grep -cE 'class="[a-z]' "C:/Users/user/Documents/Accounting/Property/web/content/blog/<slug>.md"
```
Both should return 0.

### Step 9 — Mark done in tracker
Open `docs/property/page_rewrite_tracker.md`. Update your page row: change `🟡 in_progress` to `✅ done`. Add a one-line note summarising key changes.

### Step 10 — Flag any site-wide issues
If you find something requiring user input, **append** a new entry to `docs/property/site_wide_flags.md`. Never edit existing entries.

### Step 11 — Move to the next page
Repeat from Step 1.

---

## What to flag vs what to handle yourself

**Handle yourself:**
- MTD threshold corrections (£10k → £50k)
- Em-dash removals
- April 2026 future-tense → past-tense reframes
- PropertyBee removal from any page that references it
- FAQ expansion from 4 → 10-14
- Adding external authority links
- Adding inline `<aside>` CTAs
- Cannibalisation handling via differentiation + linking out to siblings

**Flag to `docs/property/site_wide_flags.md` (and continue):**
- Factual errors on a different page you noticed while researching
- Cannibalisation between two pages with no clear differentiation
- Slugs that are wrong (obsolete dates, thresholds, etc.)
- Pages that are TSX templates or category indexes rather than blog content (mark `⏭️ skip` + flag)
- Business decisions (brand positioning, redirects, etc.)
- Unverifiable claims you can't fix in-place

**Stop and ask** (only in extreme cases):
- Codebase appears broken (build failures on baseline)
- Security vulnerability
- Otherwise: never pause. Flag and continue.

---

## Your Session B page assignments (15 pages)

In priority order — work through them top to bottom.

| # | Slug | Score | Pos | Notes |
|---|---|---|---|---|
| 19 | liverpool-property-accountant-tax-services-landlords | 6.5 | 17.4 | City template (Liverpool selective licensing) |
| 22 | mtd-rental-income-threshold-exemptions | 5.9 | 24.0 | CRITICAL: likely has £10k threshold error — fix to £50k/£30k/£20k |
| 25 | non-resident-landlord-tax | 5.3 | 35.4 | NRL scheme, NRL1 form, withholding tax |
| 28 | furnished-holiday-let-tax-rules-exemptions | 5.0 | 43.7 | CRITICAL: FHL regime abolished 6 April 2025 — page must reflect this |
| 31 | buy-to-let-limited-company-complete-guide-uk | 4.9 | 52.0 | PILLAR PAGE — high importance, careful and thorough rewrite |
| 34 | property-accountant-london-expert-services | 4.7 | 38.3 | Coordinate scope with Session A's #24 London page — differentiate angles |
| 37 | how-to-scale-buy-to-let-portfolio-1-to-10-properties | 4.7 | 63.1 | |
| 40 | residential-property-developer-tax-uk | 4.5 | 53.0 | Trading vs investment distinction |
| 43 | how-to-calculate-net-rental-income-after-all-costs-uk-guide | 4.5 | 64.5 | |
| 46 | cgt-gifting-property-family-members-uk | 4.5 | 77.5 | |
| 49 | landlord-accounting-software-uk-best-options-2026 | 4.1 | 60.3 | Cannibalisation with best-mtd-software (done) — differentiate by scope (general accounting vs MTD-specific) |
| 52 | why-southampton-landlords-need-property-accountant | 4.0 | 68.0 | City template (Southampton) despite confusing slug |
| 55 | inheritance-tax-rental-property-uk-guide | 3.8 | 71.3 | IHT mechanics — specialist depth, mention BR limits |
| 58 | incorporation-and-company-structures | 3.8 | 81.0 | Likely a category/pillar page — check before treating as blog. If category page, flag and skip. |
| 61 | nrl-withholding-tax-20-percent-basic-rate-deduction | 3.5 | 69.0 | NRL specifics — coordinate with your own #25 (non-resident-landlord-tax) to differentiate |

---

## When you're done with all 15

Update `docs/property/page_rewrite_tracker.md` summary table at the top, then write a one-paragraph completion note to `docs/property/site_wide_flags.md` with timestamp `[SESSION_B_COMPLETE]` noting any pages where you couldn't get a clean rewrite and why. Then stop.

---

## Cost / quality bar

- Each page: typically 2,500-3,500 words, 10-14 FAQs, 3-6 external authority links, 1-3 inline aside CTAs
- Build must pass
- FAQ schema count in built HTML must match frontmatter count
- Zero em-dashes
- Zero Tailwind utility classes in markdown
- Cannibalisation cleared

Begin with page #19 (liverpool-property-accountant-tax-services-landlords).
