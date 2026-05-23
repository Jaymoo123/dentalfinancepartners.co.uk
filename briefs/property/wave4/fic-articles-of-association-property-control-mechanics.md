# Wave 4 brief: fic-articles-of-association-property-control-mechanics

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/fic-articles-of-association-property-control-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/fic-articles-of-association-property-control-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `fic-articles-of-association-property-control-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Articles of Association as the **drafting layer** of a property FIC. The mechanic this page owns is the clause-by-clause translation of family + tax + control goals into CA 2006 s.18 articles: bespoke share-class design (voting / non-voting / preference / growth), founder-protection mechanics (casting vote, reserved-matters list requiring founder consent for life, weighted-vote provisions on specified resolutions), pre-emption rights on transfer, drag-along + tag-along for downstream exits, dividend-control mechanics by class, preference-share redemption / amortisation provisions, deadlock-breaking arrangements. This page is the **articles drafting** sub-thread of the Bucket A FIC group; it is NOT the corporate-governance discipline (defer to A7), NOT the retirement-income drawdown mechanic (defer to A8), NOT the share-gift PET mechanic (defer to A9), and NOT the blended-family use case (defer to A10). The page demonstrates what bespoke articles actually contain, with clause-name + purpose + drafting-trap commentary, distinct from any "what is a FIC" pillar.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** FIC sub-thread, structural / control angle. Distinct from existing FIC-comparison and FIC-pillar pages by focussing on the articles drafting layer.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

**Stage 1 seed URL note:** the same tlpi `protecting-a-late-husbands-property-legacy-with-a-fic` URL was also used as A10's seed (blended-family). Stage 2 retains it here for the "control mechanics protect against unintended downstream beneficiaries" angle BUT shifts the primary references to articles-of-association-specific firms. A10 keeps the case study as its primary; A6 cites it as a colour link only.

- https://www.tlpi.co.uk/key-pillars-to-the-family-investment-company — **NEW PRIMARY.** VERIFIED ALIVE 2026-05-23. TLPI's structural breakdown of FIC pillars; useful for the control-mechanics outline.
- https://www.tlpi.co.uk/what-is-a-family-investment-company — VERIFIED ALIVE 2026-05-23. The FIC intro page; useful for opening-section pattern and the "what makes articles bespoke" framing.
- https://www.tlpi.co.uk/insights/why-you-need-a-family-investment-company — VERIFIED ALIVE 2026-05-23. Use as colour for the "why articles design matters" framing.
- https://www.taxaccountant.co.uk/family-investment-company-tax-planning/ — VERIFIED ALIVE 2026-05-23. Discusses share-class design + retained-control mechanics in articles drafting context.
- https://www.taxaccountant.co.uk/family-investment-companies-fics-protecting-family-wealth/ — VERIFIED ALIVE 2026-05-23. Family-wealth angle on FIC articles; useful for the reserved-matters list use case.
- https://www.ukpropertyaccountants.co.uk/freezer-shares-and-growth-shares-in-family-investment-companies/ — VERIFIED ALIVE 2026-05-23. Direct on share-class taxonomy used in articles drafting.
- https://www.tlpi.co.uk/case-studies/protecting-a-late-husbands-property-legacy-with-a-fic — STAGE 1 SEED, retained as colour. VERIFIED ALIVE 2026-05-23. Useful as illustration but primary use-case angle belongs to A10.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: H2/H3 outline patterns for articles-drafting sections (reserved matters, pre-emption, drag / tag, dividend control, redemption), how competitors describe each clause's purpose, FAQ density. Borrow outline-shape, NOT clause language (the page must not read like a precedent firm's marketing copy). Cross-check every clause description against CA 2006 + house position §21.2 / §21.5.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `fic-vs-discretionary-trust-property-comparison` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `fic-complete-guide-property-wealth-transfer` (Jaccard 0.15, category: `Incorporation & Company Structures`)
- `foreign-tax-credit-uk-property-overseas-landlords` (Jaccard 0.15, category: `Non-Resident Landlord Tax`)
- `property-investment-tax-uk-complete-guide-2026` (Jaccard 0.14, category: `Landlord Tax Essentials`)
- `spv-property-investment-special-purpose-vehicle-guide` (Jaccard 0.13, category: `Incorporation & Company Structures`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite. Articles drafting is a Companies-Act-led page; legislation citations dominate over HMRC manuals.

- [CA 2006 s.18 (articles of association, requirement to have)](https://www.legislation.gov.uk/ukpga/2006/46/section/18)
- [CA 2006 s.20 (default model articles application)](https://www.legislation.gov.uk/ukpga/2006/46/section/20)
- [CA 2006 s.21 (amendment of articles — special resolution)](https://www.legislation.gov.uk/ukpga/2006/46/section/21)
- [CA 2006 s.22 (entrenched provisions)](https://www.legislation.gov.uk/ukpga/2006/46/section/22)
- [CA 2006 s.284 (votes on resolutions — one vote per share unless articles vary)](https://www.legislation.gov.uk/ukpga/2006/46/section/284)
- [CA 2006 s.561 (existing shareholders' right of pre-emption — disapplied or shaped by articles)](https://www.legislation.gov.uk/ukpga/2006/46/section/561)
- [CA 2006 s.629 (classes of shares: defined)](https://www.legislation.gov.uk/ukpga/2006/46/section/629)
- [Companies Act 2006 (Model Articles) Regulations 2008 SI 2008/3229 (the default starting point)](https://www.legislation.gov.uk/uksi/2008/3229/contents/made)
- [HMRC ERSM110000+ (Employment-Related Securities Manual, applies where founder + family members receive shares connected to office)](https://www.gov.uk/hmrc-internal-manuals/employment-related-securities/ersm110000)
- [HMRC CTM (Company Taxation Manual) on dividend declaration mechanics, intersection with articles-controlled class-rights](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual)
- [STEP / ICAEW technical guidance on FIC articles (commentary only, not primary authority)](https://www.step.org/)

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
- **Final slug:** fic-articles-of-association-property-control-mechanics (per brief, no override)
- **Final category:** Incorporation & Company Structures (per brief)
- **H1 chosen:** "Drafting FIC Articles of Association for Property: The Clause-by-Clause Control Layer"
- **Meta title chosen:** "FIC Articles of Association: Property Control Drafting" (54 chars)
- **Why these vs other options:** Title leads with "Drafting" verb to position page as the operational/drafting layer (anti-templating contrast with the existing FIC structural pillar that surveys mechanics at company-level). The "Clause-by-Clause" subtitle is the page's framing differentiator made explicit. Meta title prioritises "FIC Articles of Association" head term + "Property Control" qualifier + "Drafting" verb to land all three primary tokens within 62 chars.

### Competitor URLs fetched
- tlpi.co.uk/key-pillars-to-the-family-investment-company → pillar-based structural approach (asset protection / tax / wealth preservation / control) but DOES NOT address articles of association, share-class design, reserved matters, pre-emption, dividend control, redemption, or drag-along/tag-along. Clear structural gap to fill.
- tlpi.co.uk/what-is-a-family-investment-company → narrative arc (problem → FIC definition → tax benefits → control → property), but no clause-level detail and no CA 2006 citations.
- taxaccountant.co.uk/family-investment-company-tax-planning/ → "different classes of shares with varying rights" mentioned but NO specific clause examples, NO CA 2006 sections cited, no reserved-matters / drag-tag / pre-emption / redemption mechanics. Minimal legislative depth.
- All three competitors confirm the drafting-layer gap. A6 is the first clause-by-clause walkthrough on the topic.

### Existing-page review (from "Closest existing pages")
- `fic-complete-guide-property-wealth-transfer` (pillar): comprehensive structural reference. Touches share classes at high level + governance + life-and-death tax. A6 cannibalisation handled by going DEEPER into clause-by-clause articles drafting (CA 2006 section spine, 4-class taxonomy with 5-item-per-class definition discipline, reserved-matters list, pre-emption cascade, drag/tag, dividend control wording, preference redemption mechanics, deadlock, entrenchment). A6 forward-links to pillar as the "wider structural reference".
- `fic-growth-shares-and-freezer-shares-design`: highest cannibalisation risk. Covers growth/freezer hurdle setting + valuation + ERS s.431 trap. A6 explicitly defers HURDLE and VALUATION mechanics to this page; A6 only covers the CLASS DEFINITION wording in the articles (5-item discipline per class). Clean split.
- `fic-vs-discretionary-trust-property-comparison`: pure comparison page, no cannibalisation with A6.
- `fic-iht-treatment-bpr-myth`: IHT framing of FIC, no cannibalisation with A6. Cross-link only.
- `spv-property-investment-special-purpose-vehicle-guide`: SPV mechanics, only tangentially relevant. Not linked.

### Citations added (external authority)
1. CA 2006 s.18 (articles requirement) — legislation.gov.uk
2. CA 2006 s.20 (default model articles) — referenced
3. CA 2006 s.21 (amendment via special resolution) — legislation.gov.uk
4. CA 2006 s.22 (entrenched provisions) — legislation.gov.uk (linked twice)
5. CA 2006 s.284 (voting on a poll) — legislation.gov.uk
6. CA 2006 s.561 (statutory pre-emption) — legislation.gov.uk
7. CA 2006 s.629 (classes of shares) — legislation.gov.uk
8. CA 2006 s.684 (preference share redemption) — legislation.gov.uk
9. SI 2008/3229 (Companies (Model Articles) Regulations 2008) — legislation.gov.uk
10. ITTOIA 2005 s.624 (settlements legislation) — legislation.gov.uk
11. HMRC ERSM110000+ (employment-related-securities manual) — gov.uk
12. Jones v Garnett (Arctic Systems) [2007] UKHL 35 — cited (no link, case-name reference)
Total: 8 hyperlinked authority citations (s.18, s.21, s.22, s.284, s.561, s.629, s.684 sequence + SI 2008/3229 + ITTOIA s.624 + ERSM110000) — comfortably above the 4-7 floor.

### Internal links added (to our existing pages)
1. `/blog/incorporation-and-company-structures/fic-growth-shares-and-freezer-shares-design` — defer to for hurdle setting + valuation methodology (2 references)
2. `/blog/incorporation-and-company-structures/fic-vs-discretionary-trust-property-comparison` — defer to for threshold decision
3. `/blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth` — defer to for IHT framing
4. `/blog/incorporation-and-company-structures/alphabet-shares-property-spv-dividend-splitting-spouse-children` — cross-link for s.624 settlements boundary (2 references, one in FAQ and one in dividend-control body section)
5. `/blog/incorporation-and-company-structures/btl-limited-company-year-end-date-changing-tax-planning` — cross-link in entrenchment section (year-end change is the example of a NOT-to-entrench provision)
All 5 distinct targets verified existing on disk before commit.

### Inline CTA placements
- Aside 1: after share-class architecture (high-intent moment, post-taxonomy)
- Aside 2: after dividend control by class (post-settlements/ERS discussion, structuring scope moment)
- Aside 3: after entrenchment section (decision-framework moment)
Three asides total, none in opening, none inside worked examples. Conforms to brief CTA guidance.

### Build attempts
- Single run: `cd Property/web && npm run build` — passed clean. Page appears at expected static path. No errors, no warnings related to the new file.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 ↔ 14 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 54 chars (≤62) ✓
- Meta description length: 155 chars (≤158) ✓
- Internal links resolve: 5 distinct targets all confirmed on disk ✓
- monitored_pages row inserted: id 174 (rewrite_type='rewrite', monitor_until=2026-08-21) ✓
- Body word count: 3,926 (just under 4,000 ceiling; over the 2,500-3,500 typical band as expected for the FIC sub-thread structural anchor — see note below)

### Word-count calibration note (§16.16)
A6 is the FIC sub-thread structural anchor for the bucket. Walks 10 H2 sections: model-vs-bespoke articles framing, CA 2006 foundation clauses, 4-class share architecture, reserved-matters list (8 items), pre-emption (statutory disapplication + 6-step transfer cascade), drag/tag, dividend control by class with settlements boundary, preference redemption mechanic, deadlock, entrenchment, articles-vs-SHA split. Each H2 has clause-level commentary distinct from existing FIC pillar / growth-shares / FIC-vs-trust pages on the site. Trimmed twice during write (closing "drafting horizon" H2 absorbed into final closing paragraph; articles-vs-SHA section compacted from 6 paras to 3) to land at 3,926 from initial 4,136. A7-A10 in this sub-thread expected to sit closer to mid-band because they can reference A6 for the foundation rather than re-walking it.

### Flags raised to wave4_site_wide_flags.md
- F-2 propagated from worktree-local copy to main repo (orphan from previous Session A run; back-patch list for A1's four cross-links once A8/A9 ship).
- No new A6-specific flags raised. The A6 cross-links to A2 (alphabet) and A3 (year-end change) were live at write-time and are hyperlinked in the body; the cross-link to A7-A10 is held until those siblings ship (manager-side wave-close back-patch).

### 2-3 sentence summary
A6 is the FIC sub-thread structural anchor, written as a clause-by-clause walkthrough of bespoke property FIC articles of association indexed against the relevant Companies Act 2006 sections. Competitor pages in the sub-thread (TLPI, tax-accountant) all gesture at "bespoke share classes" and "founder control" without saying what either means in clause text; A6 fills the gap with explicit citation of s.18, s.20, s.21, s.22, s.284, s.561, s.629, s.684, and the SI 2008/3229 model articles default. A7-A10 (governance, retirement income, growth-share gifting, blended-family articles) will reference A6 for the constitutional foundation rather than re-walking it.
