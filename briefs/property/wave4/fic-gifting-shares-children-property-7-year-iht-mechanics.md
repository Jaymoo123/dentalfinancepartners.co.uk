# Wave 4 brief: fic-gifting-shares-children-property-7-year-iht-mechanics

**Site:** property
**Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/fic-gifting-shares-children-property-7-year-iht-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/fic-gifting-shares-children-property-7-year-iht-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `fic-gifting-shares-children-property-7-year-iht-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** LtdCo mechanics + FIC depth (FIC sub-thread)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> The **mechanics at the point of gift** when a founder transfers FIC growth shares to adult children. The mechanic this page owns is the four-question operational walkthrough: (i) **valuation** of the share-gift at MV per TCGA 1992 s.17, with minority-discount + freeze-share retained-control reducing MV below pro-rata NAV, (ii) **CGT treatment** with s.165 holdover NOT available for investment FICs per §21.5 (TCGA 1992 Sch 7 trading-share limit), so CGT crystallises at gift unless the FIC qualifies as trading (mostly it won't for BTL), (iii) **settlements-legislation risk** where the recipient is a minor (s.624 attribution) or via bare trust below 18 (still attributed), (iv) the **7-year PET clock** starting on the date of gift, not on FIC formation. This page is the **share-gift PET mechanic at the moment of transfer**; it is NOT the strategic-IHT-framing of why-to-use-a-FIC (that's C7), NOT the in-life retirement-income mechanic (that's A8), NOT the articles-drafting layer (that's A6), NOT the blended-family use case (that's A10). C4 covers 7-year-clock for direct property gifts; this page is FIC-share gifts.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** FIC sub-thread, gifting mechanics. Distinct from C3 (GROB-letting) and C4 (7-year-clock direct property gift) by being FIC-share-specific.

---

## Competitor URLs (Stage 2 validated 2026-05-23)

- https://www.ukpropertyaccountants.co.uk/how-to-involve-your-family-in-your-property-investment-journey-using-an-fic/ — **STAGE 1 SEED, retained as primary.** VERIFIED ALIVE 2026-05-23. Directly on-topic; family involvement via FIC shares.
- https://www.ukpropertyaccountants.co.uk/freezer-shares-and-growth-shares-in-family-investment-companies/ — VERIFIED ALIVE 2026-05-23. Direct on the freezer / growth share design used in the gift.
- https://uklandlordtax.co.uk/family-investment-company-inheritance-tax-and-freezing-value/ — VERIFIED ALIVE 2026-05-23. Has the IHT-side narrative; useful for the C7 boundary patrol. Anti-templating note: where the competitor walks into strategic-IHT framing, do NOT follow; cross-link to C7 instead.
- https://uklandlordtax.co.uk/tax-guide/property-family-investment-company-and-inheritance-tax/ — VERIFIED ALIVE 2026-05-23. Complementary IHT-FIC guide; useful for understanding what competitors put in which section so the page can clearly own the mechanic-at-gift.
- https://www.ukpropertyaccountants.co.uk/pros-and-cons-of-family-investment-companiesfics/ — VERIFIED ALIVE 2026-05-23. Useful for FAQ patterns on "should I gift shares now or wait" + the s.165 no-holdover downside flag.
- https://www.tlpi.co.uk/case-studies/fic-for-income-returns-and-protected-legacy — VERIFIED ALIVE 2026-05-23. Has the share-gift sequence in a case-study format; useful as a worked-example reference (rebuild figures, don't copy).
- https://www.taxaccountant.co.uk/family-investment-company-tax-planning/ — VERIFIED ALIVE 2026-05-23. Tax-planning frame; useful for FAQ depth on settlement-legislation interaction.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: H2/H3 outline patterns for the gift-mechanic section, FAQ density on "what about my minor children", "what if I die in year 3", "how is the share valued", citation density (s.17 TCGA, s.165 + Sch 7, s.624 ITTOIA, IHTA 1984 s.7 / s.18 / s.142). Borrow outline-shape, NOT figures or sentences. Anti-templating critical: many competitors blur gift-mechanics with strategic-IHT framing; this page must stay disciplined on the operational mechanics at moment of gift.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator.*

---

## Closest existing pages (Stage 1 mechanical Jaccard against 376 Property posts; Stage 2 may reason about additional semantic neighbours)

Top 5 by token Jaccard:

- `iht-lifetime-gifts-7-year-rule-property-taper` (Jaccard 0.19, category: `Landlord Tax Essentials`)
- `cgt-gifting-property-family-members-uk` (Jaccard 0.18, category: `Capital Gains Tax`)
- `fic-iht-treatment-bpr-myth` (Jaccard 0.18, category: `Incorporation & Company Structures`)
- `iht-residence-nil-rate-band-2m-taper-property-portfolios` (Jaccard 0.16, category: `Landlord Tax Essentials`)
- `business-property-relief-rental-property-iht` (Jaccard 0.15, category: `Landlord Tax Essentials`)

**Cannibalisation discipline:**
- If a closest-existing page is a pillar/comprehensive guide on the topic, write the **applied / scenario / local** version and link out to the pillar.
- If a closest-existing page is shallower than your framing differentiator suggests, write the deeper page and consider linking BACK from the existing page to yours (raise the cross-link as a flag).
- If two existing pages substantially overlap with your topic, raise a cannibalisation flag and don't proceed until orchestrator response, UNLESS your framing differentiator clearly puts you on a different angle.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` shows no old-slug redirect overlap for this slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 4-7 to actually cite. This is a CGT + settlements + IHT-PET mechanic page.

- [TCGA 1992 s.17 (disposals to connected persons deemed at market value)](https://www.legislation.gov.uk/ukpga/1992/12/section/17)
- [TCGA 1992 s.165 (gift relief / holdover for trading-company shares)](https://www.legislation.gov.uk/ukpga/1992/12/section/165)
- [TCGA 1992 Sch 7 (qualifying-business-asset definition: investment-FIC shares excluded)](https://www.legislation.gov.uk/ukpga/1992/12/schedule/7)
- [TCGA 1992 s.260 (CLT holdover, alternative route via discretionary trust — cross-cite to C10)](https://www.legislation.gov.uk/ukpga/1992/12/section/260)
- [IHTA 1984 s.3A (PETs: 7-year clock framework)](https://www.legislation.gov.uk/ukpga/1984/51/section/3A)
- [IHTA 1984 s.7(4) (taper relief: 0% under 3yr, then 20%, 40%, 60%, 80% per year)](https://www.legislation.gov.uk/ukpga/1984/51/section/7)
- [IHTA 1984 s.18 (spouse exemption — relevant if gift is to spouse first then to children)](https://www.legislation.gov.uk/ukpga/1984/51/section/18)
- [ITTOIA 2005 s.624 (settlements legislation — minor-child attribution)](https://www.legislation.gov.uk/ukpga/2005/5/section/624)
- [ITTOIA 2005 s.629 (income paid to / for benefit of unmarried minor children)](https://www.legislation.gov.uk/ukpga/2005/5/section/629)
- [HMRC IHTM14000+ (PET mechanics, Inheritance Tax Manual)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14000)
- [HMRC IHTM25000+ (BPR — cross-cite, BPR NOT available for investment FIC shares per *Pawson*)](https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25000)
- [HMRC CG66880+ (gift relief: trading-company test, Capital Gains Manual)](https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg66880)
- [*Pawson v HMRC* [2013] UKUT 050 (TCC) (investment-trading line, anchors why FIC shares aren't trading)](https://www.gov.uk/tax-and-chancery-tribunal-decisions/pawson-v-hmrc-2013-ukut-050-tcc)

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
- **Slug / category:** per brief, no override.
- **H1:** "Gifting FIC Growth Shares to Children: The Mechanics at the Moment of Transfer"
- **Meta title (50):** "FIC Share Gift to Children: 7-Year PET + CGT Rules"
- **Meta desc (148):** "Gifting FIC growth shares to children: s.17 valuation, s.165 holdover denial for investment FICs, settlements legislation, 7-year PET clock at gift."
- **Why these:** title centres on the 4-question framework's two most-searched terms (7-year PET + CGT) plus the destination (children) and the structural vehicle (FIC share gift). H1 explicitly says "at the moment of transfer" to anchor the operational-mechanic framing vs strategic-IHT framing (C7).

### Competitor outline takeaway
UKPropertyAccountants' family-involvement page and ukpropertyaccountants' freezer/growth-shares page both walk gift mechanics but collapse into strategic-IHT framing rapidly. TLPI's "fic for income returns and protected legacy" case study is the closest to a 4-question framework but is marketing-led. UKLandlordTax's IHT/FIC pages blur in-life income with at-gift mechanics. A9 fills the gap with explicit 4-question framework and an 8-document at-moment-of-gift checklist; no competitor surfaces this discipline at this depth.

### Cannibalisation
- Existing fic-iht-treatment-bpr-myth covers IHT-on-death of FIC shares but does NOT walk the share-gift mechanic at the moment of gift; A9 forward-links to that page on the no-BPR-for-investment-FIC point and stays in-lane on the gift mechanic.
- C4 (direct property gift) is the cross-bucket sibling per brief; A9 explicitly cross-references and the boundary section addresses the share-vs-property gift routes head-on (deferring to C4 for the direct-property mechanics once that ships in Session C).
- A8 (in-life retirement income, just shipped) is the boundary on the other side; A9 forward-links to A8 in the boundary section.

### Citations
1. TCGA 1992 s.17 (deemed MV connected-person disposal) — legislation.gov.uk
2. TCGA 1992 s.165 (gift relief restricted to trading-company shares) — legislation.gov.uk
3. TCGA 1992 Sch 7 (qualifying business asset definition) — legislation.gov.uk
4. TCGA 1992 s.260 (CLT holdover alternative route via discretionary trust) — legislation.gov.uk
5. IHTA 1984 s.3A (PET framework) — legislation.gov.uk
6. IHTA 1984 s.7(4) (taper relief schedule) — legislation.gov.uk
7. ITTOIA 2005 s.624 (settlements legislation) — legislation.gov.uk
8. Plus narrative references to TCGA 1992 s.286 (connected persons), s.58 (inter-spouse no gain no loss), ss.126-130 (share reorg base-cost), IHTA 1984 s.18 (spouse exemption), s.104 (BPR), s.113A (BPR on failed PET), ITTOIA 2005 s.629 (minor child attribution), ITEPA 2003 Ch 2 Pt 7 + s.431, Pawson v HMRC, HMRC IHTM14000+ + IHTM25000+ + CG66880+.
Total: 7 hyperlinked authority citations.

### Internal links (body, distinct)
6 distinct in-body internal links:
1. /blog/incorporation-and-company-structures/fic-articles-of-association-property-control-mechanics (A6) — articles drafting reference
2. /blog/incorporation-and-company-structures/fic-iht-treatment-bpr-myth — BPR investment-line + no-BPR-on-failed-PET reference
3. /blog/incorporation-and-company-structures/fic-vs-discretionary-trust-property-comparison — alternative-route comparison (s.260 holdover via trust)
4. /blog/incorporation-and-company-structures/alphabet-shares-property-spv-dividend-splitting-spouse-children — settlements-boundary cross-reference
5. /blog/incorporation-and-company-structures/fic-property-corporate-governance-board-meetings-resolutions-discipline (A7) — operational discipline reference
6. /blog/incorporation-and-company-structures/fic-property-retirement-decumulation-mechanics-uk (A8) — in-life income boundary reference
All targets verified existing on disk.

### Inline CTAs
- Aside 1: after CGT question 2 section (gift-cost calculation conversion moment)
- Aside 2: after documentation checklist section (pre-gift documentation review moment)
Two asides for this page (per brief, 1-3 allowed; reasoning: documentation discipline is the load-bearing conversion topic).

### Build attempts
Single run, passed clean.

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 ↔ 14 ✓
- Em-dashes: 0 ✓
- Tailwind classes: 0 ✓
- Meta title length: 50 (≤62) ✓
- Meta description length: 148 (≤158) ✓
- Internal links resolve: 6 distinct in-body targets all verified ✓
- monitored_pages row inserted: id 183 ✓
- Body word count: 2,538 (solid mid-band)

### Flags raised
- No new flags. A9's cross-link to C4 (direct property gift) and C7 (FIC strategic IHT framing) referenced inline as wave-close back-patch candidates (will hyperlink once C4/C7 ship in Session C).

### Summary
A9 walks the FIC growth-share gift mechanic at the moment of transfer through a 4-question framework: valuation under TCGA 1992 s.17 with hurdle + minority + marketability discounts (typically 1-5% of NAV); CGT with s.165 holdover denied for investment FICs per Schedule 7 (so CGT crystallises at gift, payable by founder); settlements legislation with s.624/s.629 minor-child attribution that doesn't bar the PET but does bar income-splitting until age 18; and the 7-year PET clock under IHTA 1984 s.3A from the date of gift (not FIC formation), with s.7(4) taper relief applying to the IHT rate (not chargeable value). 8-document at-moment-of-gift checklist makes the documentary discipline explicit. Boundary against C4 (direct-property gift), C7 (strategic IHT framing), and A8 (in-life income) addressed in dedicated closing section. Anti-templating against A6 / A7 / A8 by the 4-question-at-moment-of-gift structure.
