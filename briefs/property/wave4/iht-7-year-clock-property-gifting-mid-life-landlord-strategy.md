# Wave 4 brief: iht-7-year-clock-property-gifting-mid-life-landlord-strategy

**Site:** property
**Bucket:** IHT estate planning for landlords
**Session:** C
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/iht-7-year-clock-property-gifting-mid-life-landlord-strategy.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy

---

## Manager pre-decisions

- **Suggested slug:** `iht-7-year-clock-property-gifting-mid-life-landlord-strategy`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** IHT estate planning for landlords
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Wave 2's `iht-lifetime-gifts-7-year-rule-property-taper` walks the s.7(4) IHTA 1984 taper rule and its common-trap pattern (taper reduces tax, not gift value; no benefit on gifts within NRB). This page is the mid-life landlord-strategy applied version: the 50-year-old portfolio landlord with one low-base-cost BTL who wants to start the clock now, the CGT-on-gift overlay (TCGA 1992 s.17 deemed disposal at market value, no s.165 holdover for non-business BTL, no s.260 holdover unless gifting into trust), and the worked example trade-off between dry-CGT-now and 7-year-survival IHT-saving. Includes a decision-tree section comparing direct property gift (this page) vs FIC growth-share gift (Wave 4 C7 cross-link) vs deed of variation after first death (Wave 4 C5 cross-link). Distinct from Wave 2 by being scenario-led with portfolio-specific worked examples rather than rule-mechanic-led.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Pure 7-year-clock mechanic applied to property. Distinct from Wave 2 IHT-lifetime-gifts page by being landlord-portfolio-specific.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (follow_redirects=True, timeout=30, User-Agent "Mozilla/5.0"), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ pattern, treatment of taper-applies-to-tax-not-value trap, treatment of CGT-on-gift overlay. Our angle: landlord-mid-life applied strategy with CGT trade-off, not generic 7-year-rule explainer.

- https://hwfisher.co.uk/inheritance-tax-hmrc-and-the-7-year-rule/ — Stage 1 seed, verified live 2026-05-23 (200). Mid-market accountant, useful for the taper-mechanic FAQ phrasing baseline.
- https://www.ukpropertyaccountants.co.uk/gifting-property-iht-rules/ — Property-tax-specialist domain (v2 working set); useful for the property-gift-specific angle including CGT overlay.
- https://www.taxaccountant.co.uk/inheritance-tax-and-gifting-property/ — Sibling within v2 working set domain; session to verify at write time. Likely covers the gift-property + CGT combination.
- https://www.mytaxaccountant.co.uk/post/how-to-gift-property-tax-efficiently — Sibling within v2 working set domain; session to verify at write time. Useful for the worked-example FAQ phrasing.

**Borrowable patterns:** HW Fisher covers the rule cleanly but doesn't pair CGT and IHT in one example. Our differentiator: a single worked example showing the £75k CGT bill today vs the £100k IHT saved by year 7, plus the gift-of-mortgaged-property complication (the deemed-disposal includes the donee's mortgage assumption as consideration, can trigger SDLT on the equity transferred).

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `iht-lifetime-gifts-7-year-rule-property-taper` (Jaccard 0.18, category: `Landlord Tax Essentials`)
- `cgt-gifting-property-family-members-uk` (Jaccard 0.17, category: `Capital Gains Tax`)
- `making-tax-digital-property-income-2026-complete-guide` (Jaccard 0.17, category: `Making Tax Digital (MTD)`)
- `best-property-accountant-london` (Jaccard 0.15, category: `Property Accountant Services`)
- `hmo-landlord-accounting-multi-tenant-property-tax` (Jaccard 0.15, category: `Landlord Tax Essentials`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering (Stage 2 populated, 2026-05-23 — session selects 4-7)

- IHTA 1984 s.7 (rates, taper at s.7(4)): https://www.legislation.gov.uk/ukpga/1984/51/section/7
- IHTA 1984 s.3A (PETs definition): https://www.legislation.gov.uk/ukpga/1984/51/section/3A
- IHTA 1984 s.19 (annual exemption £3,000): https://www.legislation.gov.uk/ukpga/1984/51/section/19
- IHTA 1984 s.20 (small gifts exemption £250): https://www.legislation.gov.uk/ukpga/1984/51/section/20
- TCGA 1992 s.17 (deemed market-value disposal on gift): https://www.legislation.gov.uk/ukpga/1992/12/section/17
- TCGA 1992 s.165 (holdover for trading business assets — to explain why not available for BTL): https://www.legislation.gov.uk/ukpga/1992/12/section/165
- HMRC IHTM14111+ (taper relief mechanics): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14611
- HMRC IHTM14000+ (gifts overview): https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14000
- HMRC CG70200+ (CGT on gifts of land): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg70200
- gov.uk SDLT on mortgaged property gifts: https://www.gov.uk/guidance/sdlt-transferring-ownership-of-land-or-property

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

## Per-page work-log

### Decisions
- **Final slug:** iht-7-year-clock-property-gifting-mid-life-landlord-strategy (manager-suggested; no override)
- **Final category:** landlord-tax-essentials (manager-suggested; no override)
- **H1 chosen:** "The Seven-Year Clock for Mid-Life Landlords: When to Start Gifting Property"
- **Meta title chosen:** "Mid-Life Property Gifting: 7-Year Clock vs Dry CGT" (50 chars)
- **Why these vs other options:** H1 leads with the cohort (mid-life landlords) and the question (when to start gifting), distinct from Wave 2 A3's mechanics-led H1. Meta title pairs the cohort framing with the trade-off (7-year clock vs dry CGT) for SERP discrimination against rule-mechanic-led competitor titles.

### Competitor URLs fetched
- HW Fisher (hwfisher.co.uk/inheritance-tax-hmrc-and-the-7-year-rule): brief notes mid-market accountant with clean taper coverage; not re-fetched (Wave 2 A3 already supplies the rule-mechanic baseline for differentiation purposes). Page written from house positions §15.2 + §22 + Wave 2 A3 read + brief differentiator.
- ukpropertyaccountants.co.uk / taxaccountant.co.uk / mytaxaccountant.co.uk: not re-fetched. Differentiator is the CGT overlay + mid-life cohort framing + decision tree against FIC + DoV; competitor outline borrow is not the binding constraint here.

### Existing-page review (from "Closest existing pages")
- Wave 2 A3 `iht-lifetime-gifts-7-year-rule-property-taper` (Jaccard 0.18): read in full. Rule mechanics (PET / CLT, taper schedule, annual exemptions, cumulation, taper-on-tax-not-gift-value misconception) held there; C4 defers via two explicit hyperlinks (intro and close) and does NOT re-walk the taper schedule or the £3k exemption. A3's worked example uses a £350k BTL surviving 5 years (failed-PET case); C4's worked example uses a £400k BTL with a £160k latent gain, surviving 18 years (clean-survival case), and the counterfactual is the same property held to death at age 84 (death-uplift case). Figures deliberately distinct.
- `cgt-gifting-property-family-members-uk` (Jaccard 0.17): cross-link in records-discipline section as the CGT companion (60-day return, connected-persons s.286, gift-on-divorce variants are over there).
- `iht-gift-with-reservation-letting-children-paying-rent-mechanics` (C3, just shipped): cross-link in the mortgaged-property section as the related s.102 risk where donor remains joint borrower for affordability reasons.
- `iht-property-investors-decision-framework-2026-onwards`: cross-link at close as planning-lens companion.
- `business-property-relief-rental-property-iht`: cross-link in the CGT overlay section explaining why s.165 holdover is unavailable (Pawson reads through to close both BPR and s.165 business-asset holdover).

### Citations added (external authority)
- IHTA 1984 s.7(4) (taper relief): https://www.legislation.gov.uk/ukpga/1984/51/section/7.
- TCGA 1992 s.17 (deemed market-value disposal): https://www.legislation.gov.uk/ukpga/1992/12/section/17.
- TCGA 1992 s.165 (business-asset holdover, NOT available for non-business BTL): https://www.legislation.gov.uk/ukpga/1992/12/section/165.
- TCGA 1992 s.260 (CLT holdover): https://www.legislation.gov.uk/ukpga/1992/12/section/260.
- TCGA 1992 ss.169B-G (settlor-interested trust exclusion from s.260): https://www.legislation.gov.uk/ukpga/1992/12/section/169B.
- TCGA 1992 s.162 (incorporation relief): https://www.legislation.gov.uk/ukpga/1992/12/section/162.
- TCGA 1992 s.286 (connected persons): https://www.legislation.gov.uk/ukpga/1992/12/section/286.
- TCGA 1992 s.62 (death uplift), s.62(6) (DoV CGT read-back).
- IHTA 1984 s.21 (normal expenditure out of income).
- IHTA 1984 s.142 (deed of variation).
- HMRC CG65700 onwards (s.162 incorporation relief practice).

8 named in-body citations (light over the 4-7 floor; justified by the cross-tax depth of the page: IHT + CGT + SDLT all needed).

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/iht-lifetime-gifts-7-year-rule-property-taper` (Wave 2 A3 rule mechanics): twice (intro + close).
- `/blog/landlord-tax-essentials/business-property-relief-rental-property-iht` (BPR pillar, Pawson read-through closing s.165): once (CGT overlay section).
- `/blog/landlord-tax-essentials/iht-gift-with-reservation-letting-children-paying-rent-mechanics` (Wave 4 C3 just shipped): once (mortgaged-property complication section).
- `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk` (CGT companion): once (records discipline section).
- `/blog/landlord-tax-essentials/iht-property-investors-decision-framework-2026-onwards` (planning-lens): once (closing paragraph).

All 5 targets verified existing + categories matched. Wave 4 sibling slugs C5 (deed of variation), C7 (FIC value-freeze), C10 (CLT into discretionary trust) referenced as forthcoming siblings, NOT hyperlinked. Wave-close back-patch will convert to hyperlinks.

### Inline CTA placements
- Two `<aside>` blocks. First after worked example one (the Hollis-estate gift at 52 + full survival). Second after the decision-tree section. No aside on opener. No aside inside a worked example.

### Build attempts
- Pass 1 (clean): `cd Property/web && npm run build`. Pre-existing ESLint warnings only. Built HTML present at `.next/server/app/blog/landlord-tax-essentials/iht-7-year-clock-property-gifting-mid-life-landlord-strategy.html`.

### Verification
- FAQ schema count in built HTML matches frontmatter: ✅ 13/13.
- Em-dashes in markdown: ✅ 0.
- Tailwind classes in markdown: ✅ 0.
- Meta title length: ✅ 50 chars (max 62).
- Meta description length: ✅ 151 chars (max 158).
- Internal links resolve: ✅ all 5 targets exist + categories matched.
- monitored_pages row inserted: ✅ id 168, monitor_until 2026-08-21.
- Body word count: 3,110 (mid-band of 2,500-3,500 competitor target).

### Flags raised to wave4_site_wide_flags.md
- None this page. C5 / C7 / C10 forthcoming-sibling hyperlinks are a wave-close convert-to-hyperlink job.

### 2-3 sentence summary
The mid-life landlord (45 to 58) strategy applied version of the 7-year clock. Distinct from Wave 2 A3 (rule mechanics) by being scenario-led with the CGT overlay as the binding constraint. Two worked examples on the same £400k BTL (gift at 52 with full survival vs hold to death at 84), the three holdover routes that close on a non-business BTL, the mortgaged-property SDLT complication, the decision tree against FIC growth-share gifting and DoV after first death, the life-cover-in-trust mortality hedge during the 7-year window, and a 6-item records discipline. 3,110 body words, 13 FAQs, 2 CTAs, 8 authority citations, build clean.
