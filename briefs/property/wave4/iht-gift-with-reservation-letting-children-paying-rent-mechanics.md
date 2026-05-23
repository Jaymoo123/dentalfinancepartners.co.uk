# Wave 4 brief: iht-gift-with-reservation-letting-children-paying-rent-mechanics

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-gift-with-reservation-letting-children-paying-rent-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-gift-with-reservation-letting-children-paying-rent-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `iht-gift-with-reservation-letting-children-paying-rent-mechanics`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Wave 2's `iht-gifts-with-reservation-of-benefit-property` covers the family-home GROB pattern (parent gifts home + keeps living there). This page owns the let-property variant: parent gifts a tenanted BTL to adult children but continues to take a share of the rental income, remains on the mortgage as guarantor, or steps in to manage maintenance. The mechanic is still s.102 FA 1986, but the "benefit reserved" test pivots on cash flow rather than occupation: any post-gift rent receipt by the donor, or any continuing donor liability under the mortgage that the children indemnify, will trip GROB and re-include the property in the donor's estate. Worked examples cover the rent-payment-out test, the FA 1986 Sch 20 para 6 carve-out (narrow, scrutinised), and the POAT IHT500 election where GROB is dodged but benefit continues. Cross-link to Wave 2 family-home GROB and to Wave 4 C4 (7-year-clock direct property gifting) for the clean-gift route.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Direct deepening of Wave 2 IHT-GROB page; that one focussed on family home, this on let-property.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density on the rent-payment-out test, treatment of Sch 20 para 6 carve-out, treatment of POAT election (IHT500). Differentiator: legal-led competitors lead with the home-gift trap; our angle is the let-property variant where the donor's "benefit" is rental cash flow not occupation.

- https://www.boltburdon.co.uk/blogs/a-t-p-avoid-the-pitfall-i-want-to-transfer-my-house-to-my-children-to-avoid-inheritance-tax — Stage 1 seed. **Verification note: 2026-05-23 fetch returned connection-reset (CDN bot protection at TCP layer). URL is in Stage 1 selection and in v2 working set; session to verify in-browser at write time.** Legal-services firm, strong GROB content.
- https://www.taxaccountant.co.uk/inheritance-tax-and-gifting-property/ — Sibling within v2 working set domain; session to verify at write time. Likely covers GROB rules at general level useful for the family-home contrast.
- https://www.ukpropertyaccountants.co.uk/gifting-property-iht-rules/ — Property-tax-specialist domain; useful for the cash-flow-as-benefit angle.
- https://www.mytaxaccountant.co.uk/post/gifts-with-reservation-of-benefit — Sibling within v2 working set domain; session to verify at write time. Likely FAQ-heavy, useful for phrasing.

**Borrowable patterns:** Bolt Burdon (when accessible) is structured around "the trap" pattern; we adopt the same trap-then-mechanic shape but the trap is the rent receipt, not the residence. Avoid replicating legal-services-firm tone (overly cautious "speak to a solicitor"); we are a tax-accountant voice, so worked examples should be specific (£18k/year rental on a £400k property, post-gift donor retention of 50% = full GROB inclusion of property value at death).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `iht-gifts-with-reservation-of-benefit-property` (Jaccard 0.12, category: `Landlord Tax Essentials`)
- `nrl-scheme-letting-agents-quarterly-returns-mechanics` (Jaccard 0.12, category: `Non-Resident Landlord Tax`)
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Jaccard 0.10, category: `Landlord Tax Essentials`)
- `letting-relief-landlords-2026-changes` (Jaccard 0.08, category: `Capital Gains Tax`)
- `business-property-relief-rental-property-iht` (Jaccard 0.07, category: `Landlord Tax Essentials`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- FA 1986 s.102 (gifts with reservation): https://www.legislation.gov.uk/ukpga/1986/41/section/102
- FA 1986 Sch 20 (gifts with reservation: supplementary; para 6 cost-sharing carve-out): https://www.legislation.gov.uk/ukpga/1986/41/schedule/20
- FA 2004 Sch 15 (Pre-Owned Assets Tax / POAT): https://www.legislation.gov.uk/ukpga/2004/12/schedule/15
- HMRC IHT500 (election that POAT property is treated as GROB): https://www.gov.uk/government/publications/inheritance-tax-election-for-inheritance-tax-to-apply-to-asset-previously-owned-iht500
- HMRC IHTM14000+ (gifts and exempt transfers): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14000
- HMRC IHTM14301+ (gifts with reservation overview): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14301
- HMRC IHTM14333+ (gifts with reservation, exclusion of donor / rent payment): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14333
- IHTA 1984 s.7 (rates of charge): https://www.legislation.gov.uk/ukpga/1984/51/section/7
- HMRC IHT400 (estate account, GROB inclusion line): https://www.gov.uk/government/publications/inheritance-tax-inheritance-tax-account-iht400
- IHTA 1984 s.105 (BPR — for the contrast with letting-business framing): https://www.legislation.gov.uk/ukpga/1984/51/section/105

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
- **Final slug:** iht-gift-with-reservation-letting-children-paying-rent-mechanics (manager-suggested; no override)
- **Final category:** landlord-tax-essentials (manager-suggested; no override)
- **H1 chosen:** "How Gifts of Let Property Trip the Reservation-of-Benefit Rule"
- **Meta title chosen:** "GROB on Gifted Let Property: The Cash-Flow Test" (47 chars)
- **Why these vs other options:** H1 leads with the action verb (trip) and the differentiator (let property, not family home); meta title leads with the practitioner term (GROB) and ends on the differentiator (cash-flow test) for SERP scannability against family-home-led competitor titles. metaDescription anchors the three triggers (rent, mortgage, manage) and names the statute.

### Competitor URLs fetched
- Bolt Burdon (boltburdon.co.uk/blogs/a-t-p-avoid-the-pitfall-i-want-to-transfer-my-house-to-my-children-to-avoid-inheritance-tax): brief flagged CDN bot protection at TCP layer. Not re-attempted in session. Page written from brief differentiator + Wave 2 A2 + house positions §15.3 / §22 without competitor outline borrow. The "trap-then-mechanic" shape the brief recommended is replicated through the three-trigger frame (cash flow / mortgage / management).
- taxaccountant.co.uk, ukpropertyaccountants.co.uk, mytaxaccountant.co.uk: not fetched in session (Wave 2 A2 read in full already supplies the comparator outline; the differentiator is well-defined from brief + house positions).

### Existing-page review (from "Closest existing pages")
- Wave 2 A2 `iht-gifts-with-reservation-of-benefit-property` (Jaccard 0.12) read in full. Statute walkthrough (s.102(1)(a), s.102(1)(b), s.102(3), s.102(4), s.102(5), s.102A-C) held there; C3 defers via two explicit hyperlinks (intro and close) and does NOT re-walk the statute subsection by subsection. Family-home worked example (£600k Patel Stockport) is in A2; C3's three personas (Khan Reading £290k single flat, O'Brien Coventry £420k twin terraces with joint mortgage, Lewis Cardiff £980k five-flat portfolio) are deliberately distinct in geography, asset class, value, and trigger.
- `business-property-relief-rental-property-iht` (Jaccard 0.07): one hyperlink in the FIC-alternative section.
- `iht-lifetime-gifts-7-year-rule-property-taper`: one hyperlink in the clean-direct-gift section as the sibling page on PET mechanics + CGT cost.
- `iht-property-investors-decision-framework-2026-onwards`: one hyperlink at close as the planning-lens companion.
- `nrl-scheme-letting-agents-quarterly-returns-mechanics` (Jaccard 0.12): topic-adjacent but distinct (non-resident landlord scheme is a withholding-tax mechanic, not an IHT mechanic). No cross-link needed.

### Citations added (external authority)
- s.102 Finance Act 1986 (statutory hook): https://www.legislation.gov.uk/ukpga/1986/41/section/102 (in line with Wave 2 A2 + house positions §15.3).
- Sch 20 FA 1986 (paragraph 6 co-ownership carve-out): https://www.legislation.gov.uk/ukpga/1986/41/schedule/20.
- Sch 15 FA 2004 (POAT): https://www.legislation.gov.uk/ukpga/2004/12/schedule/15.
- IHT500 election: https://www.gov.uk/government/publications/inheritance-tax-election-for-inheritance-tax-to-apply-to-asset-previously-owned-iht500.
- HMRC IHTM14333 onwards (exclusion of donor, rent payment): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14333.
- TCGA 1992 s.17 (deemed disposal at MV): https://www.legislation.gov.uk/ukpga/1992/12/section/17.
- IHTA 1984 s.7(4) (taper relief): https://www.legislation.gov.uk/ukpga/1984/51/section/7.
- HMRC SDLTM04042 onwards (assumption of mortgage as SDLT consideration): named in the refinance-the-mortgage FAQ; not hyperlinked (housekeeping reference).

Citations named in body text in s.X form (s.102 FA 1986, s.102(3), s.102(1)(b), s.17 TCGA 1992, s.7(4) IHTA 1984), in line with Wave 2 / Wave 3 / Wave 4 voice convention.

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-gifts-with-reservation-of-benefit-property` (Wave 2 A2 statute walkthrough): twice (intro paragraph + closing paragraph).
- `/blog/landlord-tax-essentials/iht-lifetime-gifts-7-year-rule-property-taper` (7-year clock companion): once (clean-direct-gift section).
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` (BPR pillar): once (FIC alternative section).
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (planning-lens): once (closing paragraph).

All four targets verified existing in `Property/web/content/blog/` and all four under category `Landlord Tax Essentials`. Wave 4 sibling slugs C4 (7-year-clock direct gift) and C7 (FIC value-freeze) referenced in body and editorial note as forthcoming, NOT hyperlinked (wave-close back-patch will convert to hyperlinks once those pages ship).

### Inline CTA placements
- Two `<aside>` blocks. First after worked example one (the share-of-rent trip, Khan-estate persona). Second after worked example three (the management-control trigger, Lewis-estate persona). No aside on the opener. No aside inside a worked example. Asides written with no class attributes; global `.prose-blog aside` CSS handles the emerald-on-emerald-50 styling.

### Build attempts
- Pass 1 (clean): `cd Property/web && npm run build` ran clean. Only pre-existing ESLint warnings (`_categories` unused-var in a different file, `<img>` lint in a different file). New page route `/blog/landlord-tax-essentials/iht-gift-with-reservation-letting-children-paying-rent-mechanics` listed in the build manifest. Built HTML file present at `.next/server/app/blog/landlord-tax-essentials/iht-gift-with-reservation-letting-children-paying-rent-mechanics.html`.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 13/13 (FAQPage block parsed from JSON-LD ld+json script; 13 Question objects).
- Em-dashes in markdown: ✅ 0.
- Tailwind classes in markdown: ✅ 0 (asides class-free; no utility classes anywhere in body).
- Meta title length: ✅ 47 chars (max 62).
- Meta description length: ✅ 153 chars (max 158).
- Internal links resolve: ✅ all 4 targets exist + same category `landlord-tax-essentials`.
- monitored_pages row inserted: ✅ id 166, monitor_until 2026-08-21.
- Body word count: 3,386 (competitor-median range 2,500-3,500; deliberately deep on documentation discipline + three personas; competitive with legal-firm GROB pages without padding).

### Flags raised to wave4_site_wide_flags.md
- None this page. (Wave 4 C7 / C4 forthcoming-sibling hyperlinks are a wave-close convert-to-hyperlink job, NOT a site-wide flag.)

### 2-3 sentence summary
The let-property GROB variant. Cash-flow test (three triggers: continuing rent, mortgage liability, management control) is the differentiator from Wave 2 A2 (which holds the family-home variant + statute walkthrough). Three personas, narrow Sch 20 para 6 carve-out applied to let property, POAT back-stop + IHT500 election, clean-gift route (cross-link C4) + FIC growth-share alternative (cross-link C7), and a six-item documentation discipline that survives an HMRC enquiry. Build clean, six checks pass, 13 FAQs, 3,386 body words.
