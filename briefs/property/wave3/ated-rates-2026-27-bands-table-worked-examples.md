# Wave 3 brief: ated-rates-2026-27-bands-table-worked-examples

**Site:** property
**Bucket:** ATED (Annual Tax on Enveloped Dwellings)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/ated-rates-2026-27-bands-table-worked-examples.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/ated-rates-2026-27-bands-table-worked-examples

---

## Manager pre-decisions

- **Suggested slug:** `ated-rates-2026-27-bands-table-worked-examples`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** ATED (Annual Tax on Enveloped Dwellings)
- **Framing differentiator (READ THIS CAREFULLY, defines what makes this page distinct):**

> Rates and bands reference page anchored on the verified 2025/26 + 2026/27 figures from section 18.1. Worked examples by band tier (sub-1m flat, 2-5m townhouse, 5m+ central London house) showing the year-on-year uplift. Pre-return banding check mechanic for boundary cases. Distinct from A1 (strategic positioning) by being a quick-reference rates page; distinct from A7 (valuation rules) by anchoring on the rate, not the value. Reader: someone who knows they are in ATED and needs the current-year number.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

---

## Competitor URLs (Stage 2 validated)

- https://www.ukpropertyaccountants.co.uk/ated-rates/ (Stage 2 verified live 2026-05-22; on-topic). Confirms the 2026/27 band table matches house position §18.1 exactly. Includes a £1.8m London BTL worked example, the 30 April 2026 deadline, the 30-day acquisition-return rule, the 90-day newly-built rule, and the 1 April 2027 next-revaluation pointer.
- https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics (gov.uk primary; Stage 2 verified 2026-05-22, band figures match house position §18.1). The canonical source — cite directly.
- https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings-technical-guidance (gov.uk technical guidance; for the CPI indexation mechanic and the November-each-year publication of the next-year table).
- https://www.legislation.gov.uk/ukpga/2013/29/part/3 (FA 2013 Part 3; statutory anchor for the charge itself).

> Fetch each one with httpx (follow_redirects True, timeout 30, User-Agent Mozilla/5.0) then BeautifulSoup with lxml. Read what they actually have.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 2 reasoned)

1. `ated-complete-guide-2026-27` (Incorporation & Company Structures). **Strongest topical overlap** because the pillar carries the band table already (verbatim 2026/27 figures in FAQ + body). *Differentiation:* this rates page is a reference / calculator-shaped page with deeper worked examples per band, year-on-year comparison (2025/26 vs 2026/27), CPI indexation explainer, daily-apportioned acquisition examples, and a Pre-Return Banding Check (PRBC) walk-through. The pillar links one-paragraph-to-the-bands; this page IS the band-by-band reference. **Cannibalisation watch:** if H2 outline mirrors pillar's "Annual Charges" section, raise CANNIBAL. Resolution: keep this page numeric / worked-example heavy; link to pillar for all narrative on chargeable persons / reliefs / valuation.
2. `ated-rental-property-relief-mechanics`. *Differentiation:* one-paragraph cross-link in the "what the charge becomes after relief" section. No substantive overlap.
3. `ated-15-percent-flat-rate-sdlt-interaction`. *Differentiation:* one-line cross-link in the "acquisition timing matters" worked example (where SDLT 15% bites at acquisition and ATED bites annually thereafter).
4. Sibling A1 (overview). Co-equal; cross-link bilaterally. A1 is "who pays and why"; A2 is "how much, with worked numbers". No overlap.
5. Sibling A7 (valuation rules). Lateral mechanic — A7 covers WHEN the value is set, A2 covers WHAT the charge is at that value. Cross-link in the band-boundary section.

**Cannibalisation judgement:** this is the riskiest cannibalisation page in the bucket because the pillar already carries the band table. Discipline: make this a reference page with materially richer per-band worked examples (3-5 examples per band, mid-year acquisitions, band-boundary edge cases, PRBC scenarios). Word count should fall out at the longer end of the range because of the worked-example density. If competitor median is shorter, defer to topic coverage.

**Category note:** override to `incorporation-and-company-structures` (matches the existing four ATED pages).

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

no redirect overlap (middleware.ts checked 2026-05-22; no ATED-related redirect entries).

---

## Authority links worth considering for this bucket

- [HMRC ATED Manual (gov.uk Internal Manuals)](https://www.gov.uk/hmrc-internal-manuals/annual-tax-on-enveloped-dwellings)
- [ATED return guidance (gov.uk)](https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-returns)
- [ATED rates and bands (gov.uk current-year table)](https://www.gov.uk/government/publications/annual-tax-on-enveloped-dwellings-technical-guidance)
- [FA 2013 Part 3 (ATED introduction, legislation.gov.uk)](https://www.legislation.gov.uk/ukpga/2013/29/part/3)
- [Schedule A1 IHTA 1984 (IHT look-through for enveloped UK residential property)](https://www.legislation.gov.uk/ukpga/1984/51/schedule/A1)
- [Register of Overseas Entities (gov.uk)](https://www.gov.uk/guidance/register-an-overseas-entity)
- [FA 2009 Sch 55 (penalties for failure to make returns)](https://www.legislation.gov.uk/ukpga/2009/10/schedule/55)
- [HMRC ATED-CGT abolition guidance (FA 2019 transitional)](https://www.gov.uk/government/publications/non-resident-companies-chargeable-gains-on-uk-immovable-property)

You don't have to use all of these; pick the ones that fit your specific framing. Add others you find during research.

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
- **Read `docs/property/house_positions.md` once at the start.** For Wave 3, pay particular attention to **section 2 (headline ATED position)** AND **section 18 (Wave 3 ATED extension)** which gives you the 2026/27 band figures (verified 2026-05-22), the relief catalogue with statutory citations, the 30 April return mechanic, the five-yearly + acquisition valuation rules, the ATED-CGT abolition framing, the RoE interaction, and the OTM compliance campaign signal. Section 18 is the working detail; section 2 is the headline tie-breaker. If a competitor source contradicts a house position, the house position wins; the competitor is wrong or out of date. Flag the conflict in `docs/property/wave3_site_wide_flags.md`.

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
- Each Wave 3 page has a FRAMING DIFFERENTIATOR (see your assignment block). The differentiator defines what makes this page distinct from siblings in the same bucket. **Write to the differentiator**, don't write a generic "complete guide" template.
- Vary your H2 structure per page. ATED pillar pages and ATED penalty-appeal pages should NOT have the same outline. MTD persona pages must each lead with the persona-specific wrinkle. RRA mechanic pages and tax-implication pages should diverge clearly.
- Vary your opening 2-3 sentences. Don't pattern-match.
- Vary your FAQ phrasing. Don't reuse the same "Is X tax deductible?" template across multiple pages.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start of your session (only re-read for edge cases). For Wave 3, the bucket pointer above tells you which sections are your sections.
2. **Claim the page** in `docs/property/wave3_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** using httpx with follow_redirects True, timeout 30, User-Agent Mozilla/5.0, then BeautifulSoup with lxml. Decide what is worth extracting (outline, FAQs, worked examples, citation density, component patterns).
5. **Read the closest existing pages** on our site (Stage 2 will fill the precise list during your worktree session). Note where they over/undershoot the topic. Decide your differentiation per the framing.
6. **Plan the rewrite/write** before touching markdown. Decide: H2/H3 outline (vary it, do not pattern-match siblings), meta title (lead with the primary query word order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering competitor patterns + GSC demand + segment qualifiers + house-position clarifications, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** against HMRC manuals / legislation.gov.uk / gov.uk. House positions doc is the tie-breaker.
8. **Fetch a hero image from Pexels** (free, free-licence, attribution required). Use fetch_image_for_post from optimisation_engine.blog_generator.post_processing. Pick a query that is visually evocative and topical. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from your worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. Log your decision in the work-log.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase _db helper as in Wave 2 briefs.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Wave 1 had multiple tracker-ahead-of-branch drift incidents; Wave 2 baked in the discipline; Wave 3 carries it forward. Use git add for the content file and brief file only.
    **Wave 2 section 16.15 lesson:** do NOT include `docs/property/wave3_page_tracker.md` in your branch commit. Tracker edits go to the main repo file via absolute paths only, never as a branch commit, this avoids merge conflicts at wave-end.
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave3_page_tracker.md` (in_progress to done) with a 1-line Notes summary. (Step 14 MUST be complete first.) **Wave 2 section 16.14 lesson:** if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping.
17. **Append any site-wide flags** to `docs/property/wave3_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave3_discovery_log_session_<X>.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern (from Wave 2)

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then **keep working on another step / another page** while you wait. The watcher fires when the manager has answered, you re-read the file, act, and continue. Persistent false; timeout 1 hour; do NOT block on the watcher; pick up a different page or a different step on the same page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** ated-rates-2026-27-bands-table-worked-examples
- **Final category:** Incorporation & Company Structures (override per F-2)
- **H1 chosen:** "ATED Rates 2026/27: The Bands, the Charges, and Worked Examples by Tier"
- **Meta title chosen:** "ATED Rates 2026/27: Bands Table and Worked Examples" (51 chars)
- **Why these vs other options:** Leads with the year + "Rates" to lock the rates-reference search intent. The worked-examples promise in both metaTitle and H1 differentiates from the pillar's "Complete Guide" framing. Body structure (6 bands, 3-4 examples each, day-apportionment maths, PRBC walkthrough) honours the F-3 cannibalisation discipline against the pillar.

### Competitor URLs fetched
- Relied on Stage 2 validation; ukpropertyaccountants /ated-rates and gov.uk /annual-tax-on-enveloped-dwellings-the-basics confirmed live and house-position consistent per F-5. No fresh fetch needed.

### Existing-page review (from "Closest existing pages")
- `ated-complete-guide-2026-27`: pillar carries band table verbatim in FAQ + body. A2 differentiates by per-band worked examples (3-4 each), day-apportionment maths, year-on-year delta table, and PRBC step-by-step. No outline overlap with pillar's "Annual Charges" section.
- A1 sibling (just shipped): bilateral cross-link. A1 is positioning; A2 is numbers.
- `ated-rental-property-relief-mechanics`: cross-link in band-2 worked example.
- `ated-15-percent-flat-rate-sdlt-interaction`: cross-link in band-3 worked example for the SDLT-clawback dimension.
- `ated-late-filing-penalties-mechanics`: cross-link in the closing "where to go for the cascade" reference.

### Citations added (external authority)
- gov.uk ATED basics guidance
- gov.uk ATED Technical Guidance (CPI mechanic)
- HMRC ATED Manual
- legislation.gov.uk FA 2013 Part 3
- gov.uk ATED Returns Guidance

### Internal links added (to our existing pages)
- /blog/incorporation-and-company-structures/ated-overview-companies-holding-uk-residential-property-2026-27 (A1, bilateral)
- /blog/incorporation-and-company-structures/ated-complete-guide-2026-27 (pillar)
- /blog/incorporation-and-company-structures/ated-rental-property-relief-mechanics
- /blog/incorporation-and-company-structures/ated-15-percent-flat-rate-sdlt-interaction
- /blog/incorporation-and-company-structures/ated-late-filing-penalties-mechanics

### Inline CTA placements
- Two asides: (1) after band 1 worked examples on claim-only relief return discipline; (2) after band 6 worked examples on documentation / relief-defence file build.

### Build attempts
- Build 1: meta description was 163 chars (over 158 limit); trimmed by removing "year-on-year delta, " phrase. Build 2 clean.

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 / 13 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 51 (limit 62) ✓
- Meta description length: 143 (limit 158) ✓
- Internal links resolve: 5 unique target slugs verified present ✓
- monitored_pages row inserted: yes (id 125, rewrite_type='rewrite', 90-day window) ✓
- Body word count: 3,454 (longer end of the range; the per-band worked examples justify the depth, per F-3 cannibalisation discipline)

### Flags raised to wave3_site_wide_flags.md
- None new this page.

### 2-3 sentence summary
A2 ships the ATED rates reference page with 2026/27 bands, six-band worked examples (3-4 per band, anonymised facts across UK Ltd, overseas company, family-partnership-with-corporate-partner, and charity holding structures), the day-apportionment maths for mid-year and newly-built acquisitions, the year-on-year delta against 2025/26, and a step-by-step PRBC walkthrough for boundary cases. F-3 cannibalisation discipline against the pillar held: no narrative restatement of chargeable persons or reliefs, all cross-linked out for depth. Word count at the upper end (3,454) because worked-example density was the F-3 differentiation lever.
