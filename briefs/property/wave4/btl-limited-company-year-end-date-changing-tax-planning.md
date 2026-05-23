# Wave 4 brief: btl-limited-company-year-end-date-changing-tax-planning

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/btl-limited-company-year-end-date-changing-tax-planning.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/btl-limited-company-year-end-date-changing-tax-planning

---

## Manager pre-decisions

- **Suggested slug:** `btl-limited-company-year-end-date-changing-tax-planning`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The property-SPV accounting-reference-date (ARD) as a tax-planning lever, not a bookkeeping detail. CA 2006 s.392 limits direction of change asymmetrically: shortening the ARD is unlimited (file AA01 any time before the period ends), lengthening is restricted to once every five years and to a maximum 18-month accounting period. The mechanic this page owns is the **applied use cases** for a property SPV: (i) aligning the SPV ARD with the personal SA tax year (5 April or 31 March) to simplify MTD-ITSA cycle reconciliation where the same landlord runs both a personal portfolio and an SPV, (ii) deferring a profit-spike year-end past 6 April 2026 to capture the BPR / APR £1m cap planning window or to defer s.455 timing on overdrawn DLA, (iii) bringing forward a year-end to capture a current-year capital allowance pool before a known disposal. This page does NOT re-walk the basic CT mechanics (defer to A5); it leads with year-end-as-lever applied to property-SPV scenarios.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pure Ltd-Co operational mechanics; no FIC angle. Year-end date is a strategic lever that most BTL incorporation pages don't cover.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

- https://uklandlordtax.co.uk/should-i-change-my-btl-limited-company-year-end/ — **STAGE 1 SEED, retained as primary.** VERIFIED ALIVE 2026-05-23. Specialist BTL accountant; directly on topic. Useful for "should I change" decision framing + standard property-SPV scenarios.
- https://www.provestor.co.uk/help/property-taxes/actions-to-take-before-your-company-year-end — VERIFIED ALIVE 2026-05-23. Provestor's pre-year-end action checklist; useful as the "tactical actions in the closing month" reference, complements the strategic year-end-choice frame this page leads with. Commercial-bias flag (Provestor pushes its own software).
- https://www.taxaccountant.co.uk/year-end-dividend-planning-maximising-tax-efficiency/ — VERIFIED ALIVE 2026-05-23. Year-end dividend planning angle; useful for the personal-SA-alignment use case (FAQ patterns on tax-year-end-planning around the 5 April date).
- https://www.taxaccountant.co.uk/10-year-end-tax-planning-tips-for-individuals/ — VERIFIED ALIVE 2026-05-23. Generalist year-end-planning checklist; useful for FAQ phrasing parity around what landlords should do as ARD approaches.
- https://www.taxaccountant.co.uk/maximise-your-pension-savings-before-the-tax-year-end/ — VERIFIED ALIVE 2026-05-23. Year-end pension-contribution angle, relevant for the "pension extraction sequenced to ARD" use case overlap with §21.1 / §21.4.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract from each: H2/H3 outline, FAQ block, worked examples (figures, scenarios, period length used), citation density (CA 2006 s.392, Companies House AA01 form, HMRC CT operational manual), component patterns (decision trees, timeline diagrams, before / after period comparisons). Borrow outline-shape, NOT figures or sentences.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `buy-to-let-limited-company-complete-guide-uk` (Jaccard 0.20, category: `Incorporation & Company Structures`)
- `how-to-transfer-property-into-limited-company-uk` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `cgt-property-transfer-limited-company-calculate` (Jaccard 0.17, category: `Capital Gains Tax`)
- `end-tax-year-checklist-landlords-april-2026` (Jaccard 0.17, category: `Landlord Tax Essentials`)
- `property-investment-company-structure-planning` (Jaccard 0.17, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite.

- [CA 2006 s.392 (alteration of accounting reference date)](https://www.legislation.gov.uk/ukpga/2006/46/section/392)
- [CA 2006 s.391 (accounting reference periods and accounting reference date)](https://www.legislation.gov.uk/ukpga/2006/46/section/391)
- [Companies House guidance: change your company's year end (AA01)](https://www.gov.uk/change-your-companys-year-end)
- [Companies House form AA01 (change of accounting reference date)](https://www.gov.uk/government/publications/change-your-companys-accounting-reference-date-aa01)
- [HMRC CTM93000+ (corporation tax accounting periods, Company Taxation Manual)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm93000)
- [HMRC CTM01405 (accounting periods: change of accounting date — straddling rule)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm01405)
- [Finance Act 1998 Sch 18 para 3 (corporation tax return obligation for each accounting period)](https://www.legislation.gov.uk/ukpga/1998/36/schedule/18/paragraph/3)
- [CTA 2010 s.18N (CIHC carve-out, relevant where ARD change affects CIHC-status testing window)](https://www.legislation.gov.uk/ukpga/2010/4/section/18N)
- [HMRC CTM (Company Taxation Manual) main index](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual)
- [HMRC PIM (Property Income Manual) main index (for the SPV property-income overlay)](https://www.gov.uk/hmrc-internal-manuals/property-income-manual)

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
- **Final slug + category:** as briefed.
- **H1:** "BTL Limited Company Year-End Date: Changing the ARD as a Tax-Planning Lever"
- **Meta title:** "BTL Limited Company Year-End Date: Tax Planning Lever" (53 chars)
- **Why:** H1 names "ARD" (the technical term) plus "tax-planning lever" to telegraph the strategic frame. Meta title omits "ARD" to keep the search term close to "year-end date" + "tax planning".

### Competitor URLs fetched
- uklandlordtax.co.uk seed: thin, no CA 2006 s.392 detail. Confirmed strong competitive opening on the actual statutory mechanic.
- provestor.co.uk: tactical actions inside an existing period, NOT the year-end CHANGE itself. Used for FAQ tone.
- taxaccountant.co.uk year-end dividend planning: personal SA cycle phrasing for the alignment use case.
- taxaccountant.co.uk 10-tips and pension pages: light-touch reference for FAQ patterns.

### Existing-page review
- `end-tax-year-checklist-landlords-april-2026` is the tactical inside-the-period checklist. Linked + framed as the complement page; this A3 covers the strategic lever, the checklist covers actions.
- `buy-to-let-limited-company-complete-guide-uk` is the SPV pillar; linked.
- `property-investment-company-structure-planning` is the planning-stage decision page; linked.
- `how-to-transfer-property-into-limited-company-uk` is the upstream transfer mechanics; linked.

### Citations added (external authority)
4 external hyperlinks: CA 2006 s.392, CTA 2010 s.455, CTA 2010 s.464C, FA 1998 Sch 18 para 3. Plus HMRC CTM93000 (hyperlinked). Section-name citations in prose for CA 2006 s.391, AA01 form, CTM01405, IHTA 1984 (Pawson context).

### Internal links added
Six unique targets, all verified present on disk:
- end-tax-year-checklist-landlords-april-2026 (landlord-tax-essentials category)
- btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction (A1, this branch)
- director-loan-account-property-company-mechanics
- buy-to-let-limited-company-complete-guide-uk
- property-investment-company-structure-planning
- how-to-transfer-property-into-limited-company-uk

### Inline CTA placements
Two `<aside>` blocks: (1) on the default-ARD-from-Companies-House issue and our incorporation-time review practice; (2) on the ARD-change + s.455-timing interaction as the most common reason to file AA01 mid-life.

### Build attempts
- First build clean. No errors.

### Verification
- FAQ schema count: 14 in markdown frontmatter + 14 in built HTML JSON-LD ✓
- Em-dashes: 0 ✓
- Tailwind classes: 0 ✓
- Meta title length: 53 (≤62) ✓
- Meta description length: 146 (≤158) ✓
- Internal links resolve: 6 unique targets, all on disk ✓
- monitored_pages row inserted: yes (90-day window 2026-08-21)
- Body word count: 2,546, inside 2,500-3,500 typical range.

### Flags raised to wave4_site_wide_flags.md
- None new; the F-1 INTERNAL_LINK flag (Wave 4 sibling back-patches) is already raised for the wider set.

### 2-3 sentence summary
A3 frames the property-SPV accounting reference date as a strategic tax-planning lever rather than a bookkeeping default. The CA 2006 s.392 mechanic (shortening unlimited, lengthening once every five years max 18 months) is the structural anchor, applied through three use cases: personal Self Assessment year alignment for landlords running MTD ITSA on a personal portfolio in parallel; section 455 director's loan timing where the year-end can be moved past an expected repayment date; and capital allowance pre-disposal positioning. The page distinguishes from generalist year-end-checklist content (linked as complementary) and from the existing DLA-mechanics page (linked for the s.455 underpinning).
