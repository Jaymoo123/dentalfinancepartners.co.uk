# Wave 6 brief: multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics

**Site:** property
**Bucket:** A (LtdCo extraction-sequence pillar)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `multi-company-group-extraction-spv-holding-co-dividend-conduit-mechanics`
- **Suggested category:** `incorporation-and-company-structures`
- **Bucket:** A (LtdCo extraction-sequence pillar)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> A7 is the **personal-extraction angle from a multi-company group structure** (HoldCo + 5-30 SPVs), distinct from intra-group mechanics. Three load-bearing mechanics: (i) **inter-company dividends are CT-exempt under CTA 2009 Part 9A** (verified at https://www.legislation.gov.uk/ukpga/2009/4/section/931A on 2026-05-23 — s.931A "Charge to tax on distributions received" + Chapter 2 small-companies exemption + Chapter 3 non-small-companies exemption framework), so SPVs can pay dividends up to HoldCo without CT leakage, but extraction at personal level from HoldCo is taxable at standard dividend rates; (ii) **marginal-relief associated-company squeeze** under CTA 2010 s.18E "Associated companies" (verified 2026-05-23) — every SPV in the group counts as an associated company, slicing the small-profits-rate £50k lower limit and the £250k upper limit by the count of associated companies, so a 10-SPV group sees each SPV's lower limit fall to £5,000 and upper limit to £25,000; (iii) **alphabet shares at HoldCo level** for cross-SPV income shifting via differential dividend rights (subject to §21.2 settlements legislation Arctic Systems carve-out for spouse, s.629 attribution for minor children).
>
> **SEQUENCING CONSTRAINTS (per Stage 1 §16.32 coordination notes):** A7 ↔ C4 (CAA 2001 AIA shared cap under ss.51E + 51G shared-premises / similar-activities tests) is **bidirectional** — manager applies back-patch at wave merge. A7 ↔ C5 (full expensing intra-group transfer under CAA 2001 s.45S + Sch A1 connected-company restrictions) is **also bidirectional** — manager back-patches. **A7 must ship on A-branch before A8-A10 (within-bucket sequencing per Stage 1).**

If your reasoning suggests the slug / category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** A7 sits at three cross-bucket seams (C4, C5) and one within-bucket dependency (A8-A10 cite A7 for group context). Sequencing matters.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- **Replacement candidates for session SERP search at write time:** "HoldCo property SPV extraction dividend conduit CTA 2009 931A"; "associated companies marginal relief property SPV group s.18E"; "alphabet shares HoldCo property group cross-SPV income shift".
- Session expected to do targeted SERP searches at write time and document choices in the work-log.

**Stage 2 verification note:** the HoldCo-property-group extraction niche is thinly covered; most competitor content is general HoldCo, not property-specific. Session relies on legislation + house position §21 citations.

**Fetch + read + extract instruction (session):** Run targeted SERP searches at write time for replacement URLs. Cross-check every claim against legislation.gov.uk for CTA 2009 Pt 9A (dividend exemption), CTA 2010 ss.18A-18N (small profits + associated companies), CTA 2010 s.18E (associated companies definition), CA 2006 s.1162 (parent / subsidiary definition for group purposes), and HMRC INTM164000 (dividend exemption) + CTM02060 (group relief) for the interpretive overlay.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. Primary topical queries: "HoldCo property SPV extraction", "associated companies marginal relief property group", "dividend conduit HoldCo personal extraction", "alphabet shares HoldCo income shift".*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `property-company-group-relief-corporation-tax` (Wave 1 B2) — intra-group mechanic (group relief for losses). A7 is the extraction-up-to-personal angle. Forward / back link as complementary.
2. `sdlt-group-relief-for-corporate-landlord-portfolios` (Wave 1 A5) — SDLT angle on intra-group property transfers. A7 forward-links for the structure-formation context.
3. `corporation-tax-marginal-relief-property-companies` (Wave 1 B4) — associated-companies squeeze. A7 deepens specifically for HoldCo groups.
4. `alphabet-shares-property-spv-dividend-splitting-spouse-children` (Wave 4 A2) — alphabet-share mechanic at single-SPV level. A7 deepens for HoldCo-level alphabet shares cross-SPV.
5. `when-does-property-holding-company-structure-make-sense-uk-landlords` (middleware line 312) — pre-decision (whether to form a HoldCo). A7 is post-decision (you have one, how to extract).
6. Wave 6 A1 (sibling pillar) — A7 sits within A1's six-route framework but adds the multi-company overlay. Mandatory back-link.
7. Wave 6 C4 + C5 (cross-bucket siblings, parallel A-branch and C-branch) — **A7 must include a clearly-flagged "AIA allocation across associated SPVs" subsection (forward-link C4) and a "full expensing intra-group transfer carve-out" subsection (forward-link C5). Manager applies bidirectional back-patches at wave merge per §16.32.**

**Cannibalisation discipline:**
- A7 stays at the multi-company personal-extraction level. It does NOT re-walk intra-group CT mechanics (defer to Wave 1 B2), SDLT group relief (defer to Wave 1 A5), single-SPV alphabet shares (defer to Wave 4 A2), or single-SPV marginal relief (defer to Wave 1 B4 + Wave 6 A1).

---

## Redirect overlap (on launch)

Stage 2 scan of `Property/web/src/middleware.ts` for tokens `holdco`, `holding-company`, `multi-company-extraction`, `group-extraction`: legacy `when-does-property-holding-company-structure-make-sense-uk-landlords` (line 312) routes to category page; unrelated to A7 specifically.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. **STAGE 2 §16.36 NOTES:** brief-seed cited "CTA 2010 ss.18-44 associated-cos". CTA 2010 s.18 was OMITTED by FA 2014 (verified). The current associated-companies / small-profits framework is **CTA 2010 ss.18A-18N (post-FA-2021)**; the associated-companies definition specifically lives at **s.18E "Associated companies"** (verified 2026-05-23). Use s.18A-18N range and s.18E for the associated-cos definition.

- [CTA 2009 s.931A "Charge to tax on distributions received"](https://www.legislation.gov.uk/ukpga/2009/4/section/931A) — dividend exemption gateway (Part 9A)
- [CTA 2009 Part 9A (Company Distributions)](https://www.legislation.gov.uk/ukpga/2009/4/part/9A) — full chapter; Chapter 2 small companies exemption + Chapter 3 non-small exemption
- [CTA 2010 s.18A "Profits charged at the standard small profits rate"](https://www.legislation.gov.uk/ukpga/2010/4/section/18A) — small profits rate gateway
- [CTA 2010 s.18E "Associated companies"](https://www.legislation.gov.uk/ukpga/2010/4/section/18E) — associated-companies definition for marginal-relief band-slicing
- [CTA 2010 s.18N "Close investment-holding companies"](https://www.legislation.gov.uk/ukpga/2010/4/section/18N) — CIHC carve-out (HoldCo may be caught where it does not satisfy a permitted purpose under s.18N(2); the "holding shares in qualifying companies" purpose typically applies)
- [CA 2006 s.1162 "Parent and subsidiary undertakings"](https://www.legislation.gov.uk/ukpga/2006/46/section/1162) — group definition
- [HMRC CTM02060 (Group relief)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm02060) — intra-group interpretive overlay
- [HMRC INTM164000 (Dividend exemption)](https://www.gov.uk/hmrc-internal-manuals/international-manual/intm164000) — dividend exemption chapter
- [HMRC CTM03950+ (Associated companies definition under new regime)](https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03950) — verify exact CTM at write time

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every figure against current gov.uk at write time:
- Small-profits-rate lower / upper limits £50k / £250k (CTA 2010 s.18D); sliced by associated companies count (s.18E).
- Marginal-relief fraction (3/200) and effective 26.5% rate in the band.
- Dividend rates 10.75 / 35.75 / 39.35 post-6-April-2026 (§21.4 F-20 correction).
- CIHC main rate 25% from FY 2026/27 if caught (per §21.5).

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Front-load the associated-companies squeeze for HoldCo groups — most readers underestimate how aggressive band-slicing is on a 5-30-SPV group.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 2 inline `<aside>` CTAs: after the associated-companies squeeze block, after the alphabet-shares cross-SPV block.
- Vary opening sentence. A7 should open from "a 10-SPV portfolio under a HoldCo is not 10 independent extraction questions — it's one extraction question with three load-bearing mechanics that change the maths versus a solo SPV".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 12-14 FAQs.

### Cannibalisation
- Read Wave 1 B2, Wave 1 B4, Wave 4 A2, Wave 6 A1 carefully before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- §21.2 (settlements legislation + alphabet shares — applies to HoldCo-level alphabet structure same as SPV-level).
- §21.4 (rates context).
- §21.5 (CIHC mechanics; HoldCo may be caught depending on the s.18N(2) qualifying-purpose test).
- §25.3 (AIA shared-allowance mechanics — the C4 cross-bucket reference).
- §25.5 (full expensing for companies + leasing carve-out — the C5 cross-bucket reference).

### Anti-templating
- A7's natural H2 spine: (1) the HoldCo group context — when this structure exists and why, (2) **mechanic 1 — dividend conduit:** SPV dividends up to HoldCo are CT-exempt (CTA 2009 s.931A); personal extraction from HoldCo is dividend-rate-taxable; net = single layer of personal dividend tax, (3) **mechanic 2 — associated-companies squeeze** (CTA 2010 s.18E): every group SPV slices the marginal-relief band, with worked maths for 5- / 10- / 20-SPV groups, (4) **mechanic 3 — alphabet shares at HoldCo level** for cross-SPV income shifting (subject to §21.2 settlements legislation), (5) **CAA cross-reference subsection — AIA shared allowance** across the group under CAA 2001 s.51E + s.51G (forward-link Wave 6 C4), (6) **CAA cross-reference subsection — full expensing intra-group transfer carve-out** (forward-link Wave 6 C5), (7) CIHC risk at HoldCo level — when the holding-only structure satisfies s.18N(2)(c) permitted purpose, (8) worked extraction across 10-SPV group with HoldCo, (9) decision-tree quick-reference.
- Vary FAQ phrasing.

### Quality bar
- Word count: 3,200-3,800 body (multi-mechanic depth).
- FAQs: 12-14.
- New external authority links: 6-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start. §21.2 + §21.4 + §21.5 + §25.3 + §25.5 primary.
2. **Claim the page** in `docs/property/wave6_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** Stage 1 pool sparse; session does targeted SERP at write time.
5. **Read the closest existing pages.** Particular care: Wave 1 B2 + Wave 1 B4 + Wave 4 A2.
6. **Plan the rewrite/write.** Three-mechanic spine with CAA cross-bucket subsections.
7. **Verify factual claims.** §16.35 per-write.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none directly.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise CROSS_BUCKET_BACKLINK for Wave 6 C4 + C5 bidirectional back-patch at wave merge per §16.32).
18. **Discovery log.**
19. **Next page** (A8 follows; A8-A10 may cite A7 for HoldCo context).

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
- **Why these vs other options:**

### Competitor URLs fetched

### Existing-page review (from "Closest existing pages")

### Citations added (external authority)

### Internal links added (to our existing pages)

### Inline CTA placements

### Build attempts

### Verification

### §16.35 numeric verification log (every figure cited)

### Flags raised to wave6_site_wide_flags.md

### 2-3 sentence summary
