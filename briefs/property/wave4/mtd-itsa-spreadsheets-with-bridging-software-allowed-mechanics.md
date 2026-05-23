# Wave 4 brief: mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics

**Site:** property
**Bucket:** MTD ITSA operational details
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics`
- **Suggested category:** `making-tax-digital-mtd`
- **Bucket:** MTD ITSA operational details
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> The operational mechanics of running MTD ITSA on a spreadsheet + HMRC-recognised bridging software, per house position §19.14. §19.6 + §19.14 confirm this is allowed; this page operationalises it. Covers: the **digital-link rule** (HMRC notice 700/22 adapted for MTD ITSA — cell references, formulae, linked tables, API extracts, CSV import via script all count; copy-paste, manual re-keying, screen-reading do NOT), the spreadsheet **column-discipline** required (categorised columns mapping to SA105 categories — gross rental, agent fees, repairs, insurance, council tax, finance costs, other), and the **bridging-vendor selection** rule (defer to gov.uk compatible-software list; do NOT name specific vendors in body because the list changes). Includes a worked spreadsheet-cell example showing a compliant vs non-compliant data flow into a bridging tool. Distinct from B2 (software decision-tree by scenario) which evaluates routes at a strategic level; B8 owns the digital-link compliance mechanic specifically.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Practical bridge between bookkeeping-as-spreadsheet-power-users and the new MTD reality. Net-new on our site.

---

## Competitor URLs (Stage 2 validated)

Fetch each URL using `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then parse with `BeautifulSoup(html, "lxml")`. Read for the digital-link definition phrasing, copy-paste prohibition examples, and any worked spreadsheet-cell diagrams worth borrowing structurally.

- https://bhp.co.uk/news-events/blog/mtd-what-are-digital-links/ — VERIFIED ALIVE 2026-05-23 (Stage 1 seed). Practitioner-firm explainer rooted in the VAT MTD digital-links rule; useful for the rule-statement structure. Verify the specific "soft landing" / transition-period mentions are not stale (the VAT MTD soft landing has long expired).
- https://bhp.co.uk/news-events/blog/making-tax-digital-mtd-are-you-prepared-for-the-next-stage-of-mtd-digital-links/ — VERIFIED ALIVE 2026-05-23. Sibling BHP article; useful for the FAQ phrasing on the practical landlord-side compliance steps.
- https://rentalbux.com/blogs/mtd-bridging-software — VERIFIED ALIVE 2026-05-23. Bridging-software overview from a vendor (commercial bias to flag); useful for the "what does bridging software actually do" outline.
- https://rentalbux.com/blogs/understanding-mtd-bridging-software-benefits — VERIFIED ALIVE 2026-05-23. Sibling vendor piece; useful for the spreadsheet-to-API data-flow diagrams competitor pages tend to use.
- https://rentalbux.com/blogs/excel-making-tax-digital-complete-guide-uk-landlords — VERIFIED ALIVE 2026-05-23. Excel-specific MTD landlord guide; useful for the column-discipline section (categorisation patterns).
- https://fhpaccounting.co.uk/from-spreadsheets-to-xero-a-practical-migration-plan-for-small-businesses-to-streamline-accounting/ — VERIFIED ALIVE 2026-05-23. Inverse case (migrating away from spreadsheets); useful for the contrast paragraph on when spreadsheet + bridging is sensible vs when a full SaaS suite is.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `best-mtd-software-landlords-2026` (Jaccard 0.22, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (Jaccard 0.15, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-jointly-owned-property-threshold-split` (Jaccard 0.15, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (Jaccard 0.15, category: `Making Tax Digital (MTD)`)
- `mtd-itsa-overview-six-changes-residential-landlords` (Jaccard 0.15, category: `Making Tax Digital (MTD)`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this bucket

Pick 4-7 to actually cite; add others found during research.

- [HMRC notice 700/22 — Making Tax Digital for VAT (digital-link rule that MTD ITSA adapts; gov.uk)](https://www.gov.uk/government/publications/vat-notice-70022-making-tax-digital-for-vat)
- [HMRC compatible-software list for MTD ITSA — includes bridging vendors (gov.uk)](https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax)
- [HMRC Making Tax Digital for Income Tax — use the service (gov.uk)](https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax)
- [HMRC eligibility check for MTD ITSA (gov.uk)](https://www.gov.uk/guidance/check-if-youre-eligible-to-use-making-tax-digital-for-income-tax)
- [FA 2017 Sch A1 / Sch 14 — MTD framework (legislation.gov.uk; statutory basis for "digital records")](https://www.legislation.gov.uk/ukpga/2017/10/schedule/14)
- [HMRC Property Income Manual (PIM) overview — SA105 categories](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)
- [TMA 1970 s.12B — records retention (legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/1970/9/section/12B)
- [HMRC Compliance Handbook — record-keeping standards (gov.uk)](https://www.gov.uk/hmrc-internal-manuals/compliance-handbook)
- House position §19.14 (spreadsheet + bridging digital-link rule — Wave 4 extension) and §19.6 (software requirements) — internal tie-breakers.

---

## Universal rules (do not skip)

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. No specific NHS Trust / letting agency / tenant dispute names.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent on emerald-50. **You add no classes**, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments (match each where relevant in FAQs): Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments. Conversion moments to consider:
  - After the first worked numerical example
  - After a comparison table
  - After explaining a high-cost trap or pitfall
  - At the end of a decision-framework section
- Avoid: opening the page with an aside (let the user trust you first); placing an aside inside a worked example; >3 asides total.
- Don't write the same opening sentence each time. Avoid "Many landlords ask about ...". Vary the opening per page.

### Schema
- FAQs live in frontmatter `faqs:` array. The template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. **Don't add FAQ schema in body.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.
- If your topic suits HowTo schema (step-by-step process), flag in your work-log and the orchestrator will assess whether to add HowTo schema in the template (NOT in body).

### Cannibalisation
- The "Closest existing pages" section below shows what we already have on related topics. **Read those pages before writing**. Decide whether yours is the applied/scenario version (link out to the existing pillar) or vice versa.
- Do not duplicate worked numerical examples verbatim across pages. Differ figures, scenarios, or angles.

### House positions
- **Read `docs/property/house_positions.md` once at the start.** For Wave 4, pay particular attention to:
  - **Bucket A (LtdCo + FIC):** §11 (Companies House / ECCTA) and the Wave 4 LtdCo extension (manager will land §21 ahead of session launch covering FIC mechanics, share-class structures, charging-rent-to-own-co, post-incorporation operational details).
  - **Bucket B (MTD ITSA):** §3 (headline MTD position) + §19 (Wave 3 MTD extension covering the mandate timeline, qualifying-income mechanic, joint-property owner threshold, three-year exit rule, the corrected §19.7 15/30/31 + 3%/3%/10% penalty regime). Wave 4 may add a §19 extension covering agent involvement, foreign income, pension funds, letting-agent who-files mechanics.
  - **Bucket C (IHT):** §9 (headline IHT) + §15 (Wave 2 IHT extension with NRB/RNRB, PETs/CLTs/7-year-clock, GROB s.102 FA 1986, April 2026 BPR/APR cap, pensions in IHT from 2027, non-resident IHT). Wave 4 may add a §22 extension covering landlord-specific BPR-Pawson, deed-of-variation s.142, charitable-legacy s.1A, CLT/discretionary-trust mechanics, FIC-as-estate-planning-tool.

If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave4_site_wide_flags.md`.

### Quality bar
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short. **Do not aim for a word count**, aim to cover the topic thoroughly per the framing differentiator, and let the word count fall out naturally.
- FAQs: 10-14.
- New external authority links: 4-7 from the bucket-specific list below (plus others if you find them).
- Build clean: from your worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages from the "Closest existing pages" section.

### Anti-templating
- Each Wave 4 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 4, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave4_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site. Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 3 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 2/3 baked this discipline in; Wave 4 carries it forward. Use git add for the content file and brief file only.
    **§16.15 lesson:** do NOT include `docs/property/wave4_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave4_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **§16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave4_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave4_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** `mtd-itsa-spreadsheets-with-bridging-software-allowed-mechanics` (no override)
- **Final category:** `Making Tax Digital (MTD)` (no override)
- **H1 chosen:** "Spreadsheets Plus Bridging Software for MTD ITSA: The Digital-Link Mechanics"
- **Meta title chosen:** "MTD ITSA: Spreadsheets + Bridging Software, the Mechanics" (57 chars)
- **Why these vs other options:** Lead with the structural permission (allowed!) followed by the mechanic (digital-link rule). Distinct from B2's strategic-decision framing — B8 is a compliance-mechanic page for landlords who have already chosen the spreadsheet route.

### Competitor URLs fetched
- bhp.co.uk MTD digital-links -> acceptable / unacceptable lists used as cross-check for §19.14. Their list includes USB drives + email transfers as acceptable — I did NOT replicate (these are debatable for MTD ITSA specifically; conservative position via §19.14 omits them).
- rentalbux.com Excel guide -> spreadsheet column-discipline patterns informed my column-structure section.
- rentalbux.com MTD bridging -> data flow diagram informed the "what bridging software actually does" 5-step sequence.
- Did not fetch: bhp sibling, rentalbux benefits piece, fhpaccounting spreadsheet-to-Xero migration. Three primary sources were sufficient.

### Existing-page review (from "Closest existing pages")
- `best-mtd-software-landlords-2026` (Jaccard 0.22) — product listicle; not cross-linked from B8 (B2 already serves as the consolidating page for product-listicle siblings).
- `mtd-itsa-accidental-landlords-do-i-need-to-file-digitally` (0.15) — adjacent persona, not cross-linked.
- `mtd-itsa-jointly-owned-property-threshold-split` (0.15, Wave 3 B3) — threshold mechanic, deferred via cross-link to Wave 4 B1 joint-owner page.
- `mtd-itsa-letter-from-hmrc-what-to-do-next` (0.15) — adjacent, not cross-linked.
- `mtd-itsa-overview-six-changes-residential-landlords` (0.15) — bucket pillar; cross-linked in closing section.
- Additional semantic neighbours cross-linked: Wave 4 B2 (scenario-led software decision tree); Wave 4 B1 (joint-owner mechanics page).

### Citations added (external authority)
- HMRC notice 700/22 (MTD for VAT digital-link rule) — named in body as the foundational source
- gov.uk MTD ITSA compatible-software list (referenced, not hard-linked per §19.14 vendor-neutrality)
- gov.uk MTD ITSA "use the service" guidance (implicit context)
- FA 2017 Sch A1 paragraph 8 (digital-records obligation) — named in body
- TMA 1970 s.12B (7-year retention) — named in body
- House position §19.14 + §19.6 (Wave 4 digital-link extension + software requirements) — internal tie-breakers, named in body

### Internal links added (to our existing pages)
- `/blog/making-tax-digital-mtd/mtd-itsa-choosing-software-by-landlord-scenario-decision-tree` (Wave 4 B2) ×2 (decision-tree cross-reference + closing)
- `/blog/making-tax-digital-mtd/mtd-itsa-overview-six-changes-residential-landlords` ×1 (closing section, bucket pillar)
- `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse` (Wave 4 B1) ×1 (joint-owner cross-link, closing section)
- All 3 target files exist; URL category segments verified.
- B10 (digital-records / receipts / bank-feeds) referenced as a forthcoming sibling in closing section; plain text (page not yet written).

### Inline CTA placements
- `<aside>` 1: after the compliant-vs-non-compliant worked example for Khan (high-intent: landlord realising they may have manual-rekey points in their existing workbook).
- `<aside>` 2: after the common-pitfalls section (high-intent: landlord recognising their own anti-pattern in the list, wants help auditing).
- 2 asides total; reflects the technical-mechanics nature of the page.

### Build attempts
- Attempt 1: `cd Property/web && npm run build` passed clean; HTML rendered with 13 Question entries in 1 FAQPage block.

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 57 (max 62) ✓
- Meta description length: 146 (max 158) ✓
- Internal links resolve: 3/3 target files exist + URL category segments match ✓ (B10 reference plain text only)
- monitored_pages row inserted: yes (id 176, rewrite_type='rewrite', 90-day window)
- Body word count: 2,173 + 1 added aside (calibration note: focused mechanics page, competitor median short, deliberate non-padding)

### Flags raised to wave4_site_wide_flags.md
- F-3 already raised for B7. B8 references B10 (forthcoming) as plain text; will roll into a wave-close back-patch entry. Not raising a separate flag because B10 is also Session B's responsibility, will resolve in-session at B10 ship.

### 2-3 sentence summary
Net-new operational page on the spreadsheet-plus-bridging route through MTD ITSA. Walks the §19.14 / notice 700/22 digital-link rule (acceptable: cell references, formulae, CSV exports, API; not acceptable: copy-paste, manual re-keying, screen-reading), the spreadsheet column discipline aligned to SA105 categories, a Khan compliant-vs-non-compliant worked example, common pitfalls in legacy landlord workbooks, vendor-neutral bridging software selection criteria, the spreadsheet-versus-SaaS decision-trigger list, and a pre-mandate testing protocol. Anti-templating boundary: B2 owns the scenario-led decision-tree (strategic); B8 owns the digital-link compliance mechanic (tactical). Defers vendor naming to the gov.uk register per §19.14.
