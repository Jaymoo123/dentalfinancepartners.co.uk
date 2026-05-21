# Session A — start here

**You are Session A**, one of three parallel Claude Opus 4.7 sessions continuing the Property website page rewrite work. You have a pre-assigned list of 15 pages to rewrite. Sessions B and C have their own assigned lists. **You will never need to coordinate with B or C in real time** because page assignments are fixed.

---

## Read order (do this before touching any code)

1. **This file (you are reading it).** Tells you who you are, what you're doing, what your 15 pages are.
2. **`docs/competitor_rewrite_playbook.md`** — the master playbook explaining the system, the analysis pipeline, the per-page workflow, the universal rules.
3. **`docs/rewrite_progress_2026-05-21.md`** — the log of the first 17 pages so you understand what good looks like. The Peterborough page (`Property/web/content/blog/peterborough-property-accountant-specialist-tax-services.md`) is the gold-standard reference.
4. **`docs/site_wide_flags.md`** — issues already known to need user input. Add to the bottom (append-only) when you find more. Do not pause to wait for user input; flag and continue.
5. **`docs/page_rewrite_tracker.md`** — the master tracker. Find the "Session A pages" section. That's your work list. You can also see what Sessions B and C are doing.

---

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Em-dashes read as AI-generated. Use commas, parentheses, full stops, or middle dots.
- Brand voice: practical, specific, "no hard sell". Exact figures and named legislation, not vague hedges.
- Anonymised social proof only. Never real client names.

### Lead-gen architecture
- The blog template (`Property/web/src/components/blog/BlogPostRenderer.tsx`) **automatically injects a `LeadForm` at the bottom of every post**. **Never duplicate this in body content.**
- Add 1-3 inline `<aside>` CTAs in the body at high-intent moments (after worked examples, after comparison tables, after the "what to expect" section). Drive scroll-to-form, do NOT embed a duplicate form.
- Content pre-sells the form via worked examples, HMRC citations, local data.

### CSS in markdown content
- **Tailwind utility classes do NOT work in markdown body content.** Tailwind v4 scans `src/**` only, not `content/**`.
- Use semantic HTML in markdown: `<aside>`, `<table>`, `<ul>`, `<strong>`.
- The `.prose-blog` rules in `Property/web/src/app/globals.css` style all of these automatically. The `.prose-blog aside` rule (emerald accent callout) was added during session 0.
- Inline CTA pattern: `<aside><p>Headline</p><p>Body copy that prompts scroll-to-form below.</p></aside>` — no classes.
- Tables: just `<table><thead><tr><th>...</th></tr></thead><tbody>...</tbody></table>` — no classes.

### FAQs and schema
- FAQs live in frontmatter as `faqs:` array (each entry has `question` and `answer`).
- The template auto-emits FAQPage JSON-LD from frontmatter via `buildBlogPostingJsonLd` in `src/lib/schema.ts`. **Do NOT manually add FAQ schema in body content.** If DeepSeek's brief tells you "add FAQ schema", ignore that recommendation — schema is already there. The valuable action is to expand the FAQs themselves.
- Target 10-14 FAQs per page covering: DeepSeek-surfaced gaps + GSC query demand + competitor FAQ patterns + lead-form qualifier questions.
- Article, FAQPage, BreadcrumbList, Organization all auto-emit.

### Cannibalisation
- Pillar pages exist for major concepts (Section 24, BTL limited company, MTD, CGT on UK property). When your page touches one of those, write the **applied / scenario / local** version, not the comprehensive theoretical version. Link out to the pillar.
- Do NOT duplicate worked examples verbatim across pages. Differ figures, scenarios, or angles.
- Pre-flagged cannibalisation risks for your pages are listed in `docs/page_rewrite_tracker.md` under "Session A pages" — check the Notes column.

### MTD threshold (most common error to look for and fix)
- The MTD-for-ITSA threshold is **£50,000 from 6 April 2026, £30,000 from 6 April 2027, £20,000 from 6 April 2028**. NEVER £10,000.
- Many existing pages have the obsolete £10,000 threshold. Fix every instance you see.
- The mandate is **already live** (current date is in 2026 or later). Reframe any "April 2026 will/coming/from" language as past tense.

### Date stamping
- Update the `date:` frontmatter to today's date when you rewrite a page (use the current real date, not 2026-05-21 from the playbook).

### External authority links to favour
- HMRC Property Income Manual: https://www.gov.uk/hmrc-internal-manuals/property-income-manual
- HMRC Capital Gains Manual: https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual
- gov.uk MTD for ITSA sign-up checker: https://www.gov.uk/guidance/check-when-to-sign-up-for-making-tax-digital-for-income-tax
- legislation.gov.uk ITTOIA 2005: https://www.legislation.gov.uk/ukpga/2005/5
- legislation.gov.uk TCGA 1992: https://www.legislation.gov.uk/ukpga/1992/12
- HMRC CGT on UK property service: https://www.gov.uk/report-and-pay-your-capital-gains-tax

Land on parent paths if unsure of specific URLs (better to under-promise than 404).

---

## Per-page workflow

For each page in your assignment list (in priority order):

### Step 1 — Claim the page
Open `docs/page_rewrite_tracker.md`. Find your page in the "Session A pages" table. Change its Status from `⬜ todo` to `🟡 in_progress`. Add today's date in the Date column. Save the file. This prevents Session B or C from accidentally working on it.

### Step 2 — Read the source
The source markdown file lives in `Property/web/content/blog/<slug>.md`. Read it completely. Note: current word count, current FAQ count, current title and meta description, factual errors (especially MTD threshold), em-dashes.

### Step 3 — Pull data (cannibalisation + GSC)
Run this Python check to verify cannibalisation and pull current GSC for the page:

```bash
cd C:/Users/user/Documents/Accounting && python -c "
import sys; sys.path.insert(0, '.')
from optimisation_engine.competitor._db import _sql
SLUG = '<your-page-slug-here>'
# This page's GSC
rows = _sql(f\"SELECT query, SUM(impressions) AS i, SUM(clicks) AS c, ROUND(AVG(position)::NUMERIC,1) AS p FROM gsc_query_data WHERE site_key='property' AND page_url ILIKE '%{SLUG}%' AND date >= CURRENT_DATE - 90 GROUP BY query ORDER BY SUM(impressions) DESC LIMIT 15\")
for r in rows: print(f'  {r[\"i\"]} impr | {r[\"c\"]} clk | pos {r[\"p\"]} | {r[\"query\"]}')
"
```

### Step 4 — Fetch competitors (verify DeepSeek claims)
Pull the competitor URLs from the brief at `briefs/property/<slug>.md` and fetch each one to verify what DeepSeek said about them:

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

If DeepSeek made specific claims about competitor figures or sections, verify they're real before transcribing into our content.

### Step 5 — Rewrite
Apply the universal rules. Target ~2,500-3,500 words. Expand FAQs to 10-14. Add 1-3 inline `<aside>` CTAs. Add 3-6 external authority links. Fix MTD threshold and any em-dashes. Update date. Stay clear of cannibalisation per the tracker Notes.

### Step 6 — Build
```bash
cd C:/Users/user/Documents/Accounting/Property/web && npm run build
```
Must pass with no new warnings introduced by your changes.

### Step 7 — Verify FAQ schema count
```bash
grep -o '"@type":"Question"' "C:/Users/user/Documents/Accounting/Property/web/.next/server/app/blog/<category>/<slug>.html" | wc -l
```
Should equal the number of entries in your `faqs:` frontmatter array.

### Step 8 — Verify no em-dashes and no Tailwind leakage
```bash
grep -c "—" "C:/Users/user/Documents/Accounting/Property/web/content/blog/<slug>.md"
grep -cE 'class="[a-z]' "C:/Users/user/Documents/Accounting/Property/web/content/blog/<slug>.md"
```
Both should return 0.

### Step 9 — Mark done in tracker
Open `docs/page_rewrite_tracker.md`. Update your page row: change `🟡 in_progress` to `✅ done`. Add a one-line note in the Notes column summarising the key changes (e.g., "MTD threshold fix; +1500 words; 4→12 FAQs; pivoted from rates to disposal mechanics").

### Step 10 — Flag any site-wide issues
If during the rewrite you discover something requiring user input (factual errors on other pages, cannibalisation you can't unilaterally fix, business-model questions), **append** a new entry to `docs/site_wide_flags.md` under the existing entries. Use the format at the top of that file. Never edit existing entries.

### Step 11 — Move to the next page in your list
Repeat from Step 1.

---

## What to flag vs what to handle yourself

**Handle yourself** (no user input needed):
- MTD threshold corrections (£10k → £50k)
- Em-dash removals
- April 2026 future-tense → past-tense reframes
- PropertyBee removal from any page that references it
- FAQ expansion from 4 → 10-14
- Adding external authority links
- Adding inline `<aside>` CTAs
- Cannibalisation handling via differentiation + linking out to siblings

**Flag to `docs/site_wide_flags.md`** (and continue, do not pause):
- Factual errors on a different page you noticed while researching
- Cannibalisation where two pages essentially duplicate each other and neither has a clearly better differentiation
- Pages where the slug itself is wrong (e.g., contains an obsolete date or threshold)
- Pages that turn out to be category index pages or TSX templates rather than blog content (mark `⏭️ skip` in tracker and flag)
- Anything that requires a business decision (brand positioning, redirect choices, etc.)
- Unverifiable claims that you can't fix in-place (e.g., "PropertyBee" type product references on other pages)

**Stop and ask** (only in extreme cases):
- If the codebase appears to be in an inconsistent or broken state (build failures on baseline, missing files, etc.) that would make rewriting unsafe.
- If you find a security vulnerability that should not wait for a flag entry to be read.
- Otherwise: never pause. Flag and continue.

---

## Your Session A page assignments (15 pages)

In priority order — work through them top to bottom. Pages flagged ⏭️ skip should be skipped without rewriting.

| # | Slug | Score | Pos | Notes |
|---|---|---|---|---|
| 18 | mortgage-interest-tax-relief-changes-landlords | 6.5 | 9.8 | |
| 21 | rent-a-room-relief-uk-landlords-lodgers-guide | 6.0 | 12.0 | |
| 24 | london-property-accountant | 5.4 | 26.0 | Coordinate scope with Session B's #34 London page — differentiate angles |
| 27 | sdlt-incorporation-stamp-duty-twice | 5.1 | 22.8 | |
| 30 | tax-efficient-property-investment-structure-guide | 4.9 | 36.9 | |
| 33 | property-accountant-bournemouth-landlords-tax-services | 4.7 | 31.7 | City template (follow Peterborough/Wolverhampton pattern) |
| 36 | london (locations TSX) | 4.7 | 43.0 | ⏭️ SKIP — TSX template page, not blog markdown |
| 39 | blog (index) | 4.5 | 8.5 | ⏭️ SKIP — blog index, not a content article |
| 42 | landlord-vat-registration-when-required | 4.5 | 55.0 | |
| 45 | how-to-complete-landlord-self-assessment-filing-step-by-step-guide | 4.5 | 76.1 | |
| 48 | claim-mortgage-interest-rental-property-uk-section-24 | 4.3 | 62.0 | Cannibalisation risk with Section 24 pillar — write the practical/applied version not the comprehensive guide |
| 51 | property-accountant-nottingham-landlords | 4.0 | 47.8 | City template |
| 54 | property-accountant-job-description | 3.8 | 58.9 | Different scope from BTL tax pages — careers/role explainer, treat accordingly |
| 57 | how-much-tax-rental-income-uk-complete-guide | 3.8 | 79.6 | Cannibalisation risk with #4 income-tax-rates page (done) and #14 cgt-aea page (done) — differentiate as the bands-and-calculation explainer |
| 60 | property-accountant-services-expert-solutions | 3.5 | 67.9 | |

**Effective rewrite count: 13** (excluding 2 skips).

---

## When you're done with all 13

Update `docs/page_rewrite_tracker.md` summary table at the top, then write a one-paragraph completion note to `docs/site_wide_flags.md` with timestamp `[SESSION_A_COMPLETE]` noting any pages where you couldn't get a clean rewrite done and why. Then stop.

---

## Cost / quality bar

- Each page: typically 2,500-3,500 words, 10-14 FAQs, 3-6 external authority links, 1-3 inline aside CTAs
- Build must pass
- FAQ schema count in built HTML must match frontmatter count
- Zero em-dashes
- Zero Tailwind utility classes in markdown
- Cannibalisation cleared (no significant overlap with sibling pages on the same query class)

Begin with page #18 (mortgage-interest-tax-relief-changes-landlords).
