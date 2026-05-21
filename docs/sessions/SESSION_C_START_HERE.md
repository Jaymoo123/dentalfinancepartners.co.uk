# Session C — start here

**You are Session C**, one of three parallel Claude Opus 4.7 sessions continuing the Property website page rewrite work. You have a pre-assigned list of 16 pages to rewrite. Sessions A and B have their own assigned lists. **You will never need to coordinate with A or B in real time** because page assignments are fixed.

---

## Read order (do this before touching any code)

1. **This file (you are reading it).** Tells you who you are, what you're doing, what your 16 pages are.
2. **`docs/competitor_rewrite_playbook.md`** — the master playbook explaining the system, the analysis pipeline, the per-page workflow, the universal rules.
3. **`docs/rewrite_progress_2026-05-21.md`** — the log of the first 17 pages so you understand what good looks like. The Peterborough page (`Property/web/content/blog/peterborough-property-accountant-specialist-tax-services.md`) is the gold-standard reference.
4. **`docs/site_wide_flags.md`** — issues already known to need user input. Add to the bottom (append-only) when you find more. Do not pause to wait for user input; flag and continue.
5. **`docs/page_rewrite_tracker.md`** — the master tracker. Find the "Session C pages" section. That's your work list. You can also see what Sessions A and B are doing.

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
- Pre-flagged cannibalisation risks for your pages are listed in `docs/page_rewrite_tracker.md` under "Session C pages" — check the Notes column.

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
Open `docs/page_rewrite_tracker.md`. Find your page in the "Session C pages" table. Change Status from `⬜ todo` to `🟡 in_progress`. Add today's date. Save. This prevents Sessions A and B from working on it.

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
Open `docs/page_rewrite_tracker.md`. Update your page row: change `🟡 in_progress` to `✅ done`. Add a one-line note summarising key changes.

### Step 10 — Flag any site-wide issues
If you find something requiring user input, **append** a new entry to `docs/site_wide_flags.md`. Never edit existing entries.

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

**Flag to `docs/site_wide_flags.md` (and continue):**
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

## Your Session C page assignments (16 pages)

In priority order — work through them top to bottom. Pages flagged ⏭️ skip should be skipped without rewriting.

| # | Slug | Score | Pos | Notes |
|---|---|---|---|---|
| 20 | sdlt-buy-to-let-rates-surcharge-guide-2025 | 6.4 | 18.0 | CRITICAL: slug says "2025" but content needs 2026/27 framing. SDLT additional dwelling surcharge currently 3% (or 5% in Wales LTT) |
| 23 | cgt-payment-deadlines-property-sales-2026 | 5.4 | 11.7 | 60-day reporting depth |
| 26 | 2027-property-tax-rates-affect-capital-gains-tax-sales | 5.4 | 37.0 | Cannibalisation with cgt-property-2027-rate-changes (done in session 0) — differentiate by focus on disposal timing impact specifically |
| 29 | landlord-insurance-tax-deductible-what-can-you-claim | 6.4 | 29.0 | Insurance claim income tax treatment (the £17 impressions for "income tax on landlord insurance claims" suggests this is the priority sub-topic) |
| 32 | spv-property-investment-special-purpose-vehicle-guide | 4.7 | 80.1 | SPV depth — cannibalisation with BTL company mortgage (done) and BTL company guide (Session B's #31) — differentiate as SPV structure mechanics |
| 35 | cgt-calculation-selling-buy-to-let-property-step-by-step | 4.5 | 74.3 | Cannibalisation with capital-gains-tax-property-sale (done in session 0) — differentiate as calculation walkthrough with worked example |
| 38 | 2027-property-income-tax-rates-landlords-uk | 4.5 | 83.0 | 2027 income tax rate pillar — important page, defend the future ranking |
| 41 | mtd-quarterly-deadlines-2026-2027-landlords | 3.8 | 78.0 | MTD quarterly deadline specifics — CRITICAL: ensure no £10k threshold reference; this should be the canonical deadlines reference |
| 44 | how-to-calculate-cgt-on-property | 4.5 | 74.3 | NOTE: may duplicate #35 (cgt-calculation-selling-buy-to-let) — check first; if duplicate, flag and skip one |
| 47 | capital-gains-tax-property-complete-guide-uk | 3.5 | 66.8 | PILLAR PAGE for CGT — high importance, careful and thorough |
| 50 | property-accountant-jobs-uk | 3.8 | 45.6 | Different scope from BTL tax pages — careers/role explainer, treat accordingly (not a tax service page) |
| 53 | leeds (locations TSX) | 6.8 | 16.2 | ⏭️ SKIP — TSX page in /locations/[slug] template, not blog markdown |
| 56 | what-does-a-property-accountant-do | 2.6 | 57.0 | Foundational page — defensive treatment, build out the service-explanation depth |
| 59 | property-investment-exit-strategy-planning-guide | 2.0 | 53.7 | Cannibalisation with multi-property-landlord-tax-planning (done session 0) — differentiate as exit-specific |
| 62 | property-development-tax-trading-vs-investment-income | 1.7 | 59.0 | Trading vs investment distinction (case law — Salisbury House, Page v Lowther, etc.) |
| 63 | non-resident-landlord-self-assessment-filing-requirements | 1.1 | 54.8 | NRL self-assessment specifics — coordinate scope with Session B's #25 (non-resident-landlord-tax) and #61 (nrl-withholding-tax) |

**Effective rewrite count: 15** (excluding 1 skip).

---

## When you're done with all 16

Update `docs/page_rewrite_tracker.md` summary table at the top, then write a one-paragraph completion note to `docs/site_wide_flags.md` with timestamp `[SESSION_C_COMPLETE]` noting any pages where you couldn't get a clean rewrite and why. Then stop.

---

## Cost / quality bar

- Each page: typically 2,500-3,500 words, 10-14 FAQs, 3-6 external authority links, 1-3 inline aside CTAs
- Build must pass
- FAQ schema count in built HTML must match frontmatter count
- Zero em-dashes
- Zero Tailwind utility classes in markdown
- Cannibalisation cleared

Begin with page #20 (sdlt-buy-to-let-rates-surcharge-guide-2025).
