# Wave 5 brief: welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers

**Site:** property
**Bucket:** B (Devolved property tax: Welsh LTT + Scottish LBTT + ADS)
**Session:** B
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers

---

## Manager pre-decisions

- **Suggested slug:** `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B (Devolved property tax — Welsh LTT lane)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Foundational LTT page for Welsh property purchases by individuals not owning another dwelling. The page owns the Welsh-statute main residential rate table and the cross-jurisdictional comparison that buyers asking about "stamp duty in Wales" actually need. Three positive Welsh-specific mechanics anchor it: the £225,000 nil band (materially higher than SDLT's £125,000), the absence of any non-resident surcharge equivalent to England's 2% (a Welsh policy choice, not a gap), and the absence of a separate first-time-buyer regime (the £225,000 nil band already serves the function). Distinct from any SDLT page because LTT is administered by the Welsh Revenue Authority under the Land Transaction Tax and Anti-avoidance of Devolved Taxes (Wales) Act 2017, not by HMRC under FA 2003. Worked examples use Welsh personas and Welsh purchase prices anchored to the 2026/27 bands; do not re-walk SDLT bands.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Net-new on our site; zero on-site Welsh LTT coverage. Anchors the Welsh sub-bucket cluster as the entry-point rates page. B1 is the canonical Welsh rates pillar that B2 (higher rates), B3 (MDR), B4 (FTB absence), B5 (uninhabitable refund) all link back to.

---

## Competitor URLs (Stage 2 populated, 2026-05-23)

**Fetch + read + extract instruction:** For each URL below, fetch with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Extract H2/H3 outline, FAQ density, band-table presentation, worked-example treatment, and any cross-jurisdictional comparison patterns. Our differentiator is Welsh-specific (Welsh statute, Welsh personas, Welsh-policy framing); competitor outlines tend to default to SDLT-with-a-Welsh-footnote.

- https://www.ukpropertyaccountants.co.uk/land-transaction-tax-a-complete-guide — Stage 1 seed; in v2 competitor working set. Property-tax-specialist domain. Likely covers main + higher rates in one page; our cluster separates them (B1 main, B2 higher).
- https://www.gov.wales/land-transaction-tax-rates-and-bands — authority source for rates, not a competitor for outline patterns; verify rate table at write time per §16.35.
- https://www.gov.wales/land-transaction-tax — Welsh Revenue Authority overview; useful for the registration / return mechanism and the 30-day return clock.
- https://taxaccountant.co.uk/stamp-duty-land-tax-on-property-in-wales — verify live at write time; Wales-specific competitor framing.
- https://www.alexander-ene.co.uk/land-transaction-tax-wales.htm — verify live at write time; mid-market accountant Wales-focused.

**§16.31 URL liveness check:** Run the httpx fetch above before relying on each URL. If a URL returns non-200 or a homepage redirect, replace via reasoning: search for the same accountant-firm domain + "land transaction tax" or fall back to gov.wales technical guidance pages enumerated in §23.10 of house_positions.md.

**Borrowable patterns:** UK Property Accountants outline likely uses a "complete guide" frame; resist. Our framing differentiator is rate-table + Welsh-specific structural points (3 positive points enumerated above), with explicit cross-jurisdictional comparison anchored on the £225k nil band rather than restating SDLT.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical queries are "land transaction tax wales", "ltt rates 2026", "welsh stamp duty bands", "ltt vs sdlt", "buying property in wales tax".*

---

## Closest existing pages (cannibalisation context)

Zero direct devolved-tax coverage on site as of 2026-05-23. Closest existing pages are SDLT pages (England-focused) where the new page must explicitly differentiate "if you're buying in Wales, this page; if buying in England or Northern Ireland, the SDLT page":

- `sdlt-buy-to-let-rates-surcharge-guide-2025` (category: SDLT; England rates + 5% surcharge pillar). **Differentiation guidance:** B1 is the Welsh-rates parallel. Forward-link from B1 to the SDLT pillar as "if your purchase is in England or Northern Ireland, see..."; raise the reciprocal back-link as a flag for the SDLT pillar to add a sibling-link to B1.
- `sdlt-non-resident-2-percent-surcharge` (category: SDLT; England-only NR surcharge). **Differentiation guidance:** B1 explicitly notes Wales has NOT introduced an equivalent NR surcharge (§23.1 do-not-write list). Cross-link to clarify the boundary.
- `sdlt-mixed-use-property-classification` (England mixed-use s.116(7) automatic non-residential). **Differentiation guidance:** Wales has no LTT equivalent to s.116(7) FA 2003. B5 covers the Welsh uninhabitable/derelict refund mechanic. B1 notes the absence of the six-dwellings rule in Wales (§23.3) but defers depth to B3 (MDR retention) and B5 (derelict refund).
- `2027-property-income-tax-rates-landlords-uk` (income-tax pillar, UK-wide). **Differentiation guidance:** cross-link as the income-tax counterpart for Welsh landlord taxpayers (income tax is NOT devolved at landlord-relevant rates; only LTT is).

**Cannibalisation discipline:**
- B1 ↔ B6 (Scottish LBTT rates) — parallel within-bucket templating risk. **Mitigation:** B1's framing differentiator is the three positive Welsh-specific structural points (£225k nil band, no NR surcharge, no FTB regime); do NOT structure B1 as "the Welsh equivalent of SDLT" or "the Welsh version of LBTT". Vary H2 outline from B6 (which will lead with Scottish-statute structural points + FTB relief).
- Do not duplicate worked numerical examples verbatim across B1, B2, B6. Differ purchase prices, persona names, and the comparison anchor.

---

## Redirect overlap (on launch)

Scan of `Property/web/src/middleware.ts` 2026-05-23 shows zero existing redirects for `welsh-*`, `ltt-*`, or `land-transaction-tax-*` tokens. No repointing required at launch. Session may re-scan to confirm.

---

## Authority links worth considering (session selects 5-8)

- **LTTA 2017 (primary statute):** https://www.legislation.gov.uk/anaw/2017/1/contents — key provisions ss.10 (effective date), 24 (residential rates), 25 (non-residential rates), 41 (return due 30 days), Sch 5 (higher rates) for cross-reference to B2.
- **LTT rates and bands (gov.wales, primary rate source):** https://www.gov.wales/land-transaction-tax-rates-and-bands
- **LTT calculator (Welsh Revenue Authority):** https://lttcalculator.wra.gov.wales
- **LTT technical guidance (calculation):** https://www.gov.wales/calculation-land-transaction-tax-payable-technical-guidance
- **LTT (Tax Bands and Tax Rates) (Wales) (Amendment) Regulations 2024** (Made-affirmative regulations, the most recent rate adjustment, useful for the citation density bar): https://www.legislation.gov.uk/wsi/2024 (search for the 2024 LTT regulations).
- **Welsh Revenue Authority return guidance:** https://www.gov.wales/file-tax-return-land-transaction-tax-online
- **SDLT FA 2003 (for the cross-jurisdictional contrast cite):** https://www.legislation.gov.uk/ukpga/2003/14/contents — confine to one or two cross-reference cites; do not deep-quote SDLT.

---

## Universal rules (do not skip)

### §16.35 per-write verification (highest priority for this brief)

**Verify every numeric tax figure (rates, bands, surcharge percentages, thresholds, replacement-window months) against current gov.wales / revenue.scot / legislation.gov.uk at write time per §16.35. Devolved tax tables change annually with each Welsh / Scottish Budget cycle. Do NOT carry figures from the brief without re-verification.** Specifically: re-verify the 2026/27 LTT main residential bands (£225k / £400k / £750k / £1.5m thresholds; 0% / 6% / 7.5% / 10% / 12% rates) against gov.wales/land-transaction-tax-rates-and-bands before committing. The 2024 amendment regulations affected higher rates only, not the main residential table — confirm at write time.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact figures, named legislation. No vague hedges.
- Anonymised personas only. No real client names. Use Welsh persona names where appropriate (Davies-Powell, Jones, Williams-Hughes); avoid real firms / agencies.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects `LeadForm` at the bottom. Never duplicate in body content.
- The `.prose-blog aside` CSS in `Property/web/src/app/globals.css` styles every `<aside>` in markdown with emerald-accent. You add no classes, just `<aside><p>headline</p><p>body</p></aside>`.
- Lead-form role segments: Individual landlord (1-3 properties) / Portfolio owner (4-10) / Large portfolio (10+) / Property developer.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs at high-intent moments. Suggested conversion points: after the rate-table is first walked with a worked example; after the cross-jurisdictional comparison table; at the end of the "Are you a cross-border buyer?" decision-tree section.
- Avoid: opening with an aside; placing inside a worked example; >3 asides total.

### Schema
- FAQs live in frontmatter `faqs:` array. Template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd`. Don't add FAQ schema in body.
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.

### Cannibalisation
- Read the closest-existing SDLT pages (above) before writing. Explicit "if your purchase is in England / NI, see X; if Wales, this page" framing in the opening paragraphs.
- Do not duplicate worked numerical examples verbatim across B1 / B2 / B6. Differ figures, scenarios, or angles.

### House positions
- **Read `docs/property/house_positions.md` §23 in full once at the start.** B1 sits on §23.1 (main Welsh residential rates). Cross-reference §1 (SDLT for comparative context); §23.7 (NI is SDLT, not devolved); §23.8 (cross-jurisdictional table).
- §23.11 do-not-write list applies in full: do NOT state Wales has a non-resident surcharge, do NOT state Wales has FTB relief, do NOT conflate "the UK" with "England + Wales", do NOT cite Welsh figures as the SDLT equivalent.

### Anti-templating (specific to B1)
- **B1↔B6 templating risk:** B1 is the Welsh-rates page; B6 will be the Scottish-rates page. Do NOT structure B1 as "the Welsh version of SDLT" or as a mirror to B6. The framing differentiator MUST be a POSITIVE-framing of the three Welsh-specific mechanics (£225k nil band, no NR surcharge, no separate FTB regime) with Welsh statute citations (LTTA 2017) and Welsh worked examples. NOT "the Welsh equivalent of the English SDLT X".
- Vary H2 outline from any SDLT page (do not re-use "Rates and bands" + "Who pays" + "Reliefs" template).
- Vary FAQ phrasing. Do NOT reuse "Is X tax deductible?" or "How does X work?" templates from SDLT pages.

### Quality bar
- Word count: 2,500-3,500 (non-pillar; B1 is the rates entry page, not a pillar-comprehensive guide).
- FAQs: 10-14.
- New external authority links: 5-7 from the list above (plus others if you find them during research).
- Build clean: from worktree root, `cd Property/web && npm run build`.
- FAQ schema count in built HTML matches frontmatter array length.
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant SDLT siblings + 2027 income-tax pillar from "Closest existing pages" section.

### Cross-bucket coordination
- C9 (`second-home-sdlt-additional-dwellings-surcharge-joint-owners-spouse-aggregation-rules`) is the SDLT-applied spousal-aggregation page. B1 does NOT cross-link to C9 (B1 is the main rates page, C9 is the surcharge mechanic page) but B2 (Welsh higher rates) does. B1 leaves the surcharge mechanic entirely to B2.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md` §23 in full** once at the start of your session. Cross-reference §1 (SDLT) and §23.8 (cross-jurisdictional table). For B1 specifically, §23.1 + §23.11 are mandatory.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`, change Status from todo to in_progress, add today UTC timestamp.
3. **Read the brief** (this file). Pay attention to: framing differentiator, closest existing pages, redirect overlap, authority links.
4. **Fetch each competitor URL** with httpx (`follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"}`), parse with BeautifulSoup (lxml). Verify §16.31 liveness; replace dead URLs via reasoning. Decide what is worth extracting (outline, FAQs, worked examples, band-table presentation, citation density).
5. **Read the closest existing pages** on our site. Note SDLT pages assume England; B1's job is the Welsh parallel + cross-link. Decide differentiation per the framing.
6. **Plan the write** before touching markdown. Decide: H2/H3 outline (vary it, do NOT pattern-match SDLT siblings or B6), meta title (lead with primary query order, max 62 chars), meta description (max 158 chars), 10-14 FAQs covering main rates + Welsh structural points + cross-jurisdictional traps + filing mechanics, inline aside CTA placements, cannibalisation handling.
7. **Verify factual claims** per §16.35: re-verify 2026/27 LTT main residential bands against gov.wales at write time; re-verify the 30-day return clock under LTTA 2017 s.41; re-verify the £40,000 minor-interest threshold (relevant for B2, cross-referenced here). House positions §23 is the tie-breaker.
8. **Fetch a hero image from Pexels** via `fetch_image_for_post` from `optimisation_engine.blog_generator.post_processing`. Query suggestion: "welsh property cottage" / "wales houses" — visually evocative of Welsh property. If Pexels returns None, leave image empty.
9. **Write the markdown file** at `Property/web/content/blog/welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers.md`. Frontmatter required fields: title, slug, canonical, date, author, category, metaTitle (max 62 chars), metaDescription (max 158 chars), altText, image, imageCredit (if Pexels), h1, summary, schema empty string, faqs array (10-14 entries), dateModified, reviewedBy, reviewerCredentials, reviewedAt, editorialNote.
10. **Build:** from worktree root, `cd Property/web && npm run build`. Must pass clean.
11. **Verify (all six checks must pass):** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62 chars, meta description ≤158 chars, internal links resolve.
12. **If your brief lists a redirect overlap:** edit `Property/web/src/middleware.ts` to repoint the old slug at your new page. B1 has zero current overlap; skip unless re-scan finds one.
13. **Register the new page for GSC monitoring:** insert a row into `monitored_pages` via the Supabase `_db` helper.
14. **Commit on your branch.** Per-page commit (do NOT merge to main). **CRITICAL: commit BEFORE marking done in tracker.** Use `git add` for the content file and brief file only. Do NOT include `docs/property/wave5_page_tracker.md` in your branch commit (tracker edits go to the main repo file via absolute paths only).
15. **Fill in the per-page work-log** at the bottom of this brief.
16. **Mark done** in `docs/property/wave5_page_tracker.md` (in_progress to done) with a 1-line Notes summary. Step 14 MUST be complete first.
17. **Append any site-wide flags** to `docs/property/wave5_site_wide_flags.md` (append-only).
18. **Log discoveries** to `docs/property/wave5_discovery_log_session_B.md` (append-only).
19. **Next page**, claim ONE more page from the top of your remaining list.

## Session-side watcher pattern

When you append a STATUS open question to your Q&A file, spawn a Monitor task on that file watching for the STATUS answered flip. Then keep working on another step / another page while you wait. Persistent false; timeout 1 hour; do NOT block on the watcher.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** `welsh-land-transaction-tax-ltt-rates-bands-2026-27-residential-buyers` (no override)
- **Final category:** `landlord-tax-essentials` (no override; matches B6 future placement so Welsh + Scottish pillar sit side-by-side under landlord-tax-essentials)
- **H1 chosen:** "Welsh Land Transaction Tax (LTT) 2026/27: Rates, Bands, and What Welsh Buyers Need to Know"
- **Meta title chosen:** "Welsh LTT 2026/27 Rates and Bands: A Buyer's Guide" (50 chars)
- **Why these vs other options:** The "Three things Welsh buyers should know" framing leads positively with the three §23.1 structural points (£225k nil band, no NR surcharge, no FTB regime) per the brief's anti-templating mandate, NOT "the Welsh equivalent of SDLT" or "the Welsh version of LBTT" framing.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/land-transaction-tax-a-complete-guide: live; "complete guide" framing with rate tables and a £2m worked example; we differentiate via the three structural points and the four-nation comparison table.
- gov.wales/land-transaction-tax-rates-and-bands: authority; rate table verified per §16.35 (matches §23.1 figures exactly).
- gov.wales/land-transaction-tax: Welsh Revenue Authority overview; confirms 30-day return window and the LTTA 2017 architecture.
- **DEAD URL:** taxaccountant.co.uk/stamp-duty-land-tax-on-property-in-wales returned 404 (§16.31). Skipped; replaced by deeper reading of gov.wales technical guidance.
- **OFF-TOPIC URL:** alexander-ene.co.uk/land-transaction-tax-wales.htm: redirected to firm homepage with no Welsh LTT content. Skipped; not a viable outline source.

### Existing-page review (from "Closest existing pages")
- `sdlt-buy-to-let-rates-surcharge-guide-2025`: forward-link from B1 (cross-jurisdictional contrast); raise INTERNAL_LINK flag for SDLT pillar to add reciprocal back-link.
- `sdlt-non-resident-2-percent-surcharge`: forward-link from B1 to clarify the boundary; the non-resident surcharge is England + NI only.
- `2027-property-income-tax-rates-landlords-uk`: forward-link from B1 (income-tax pillar is UK-wide).
- `sdlt-mixed-use-property-classification`: briefly referenced (Wales has no s.116(7) FA 2003 equivalent); depth deferred to B3 + B5.

### Citations added (external authority)
- Land Transaction Tax and Anti-avoidance of Devolved Taxes (Wales) Act 2017, ss.10 (effective date), 24 (residential rates), 41 (30-day return clock), Schs 7 / 16 / 19 (reliefs), Sch 22 (cross-border apportionment).
- LTT (Tax Bands and Tax Rates) (Wales) Regulations (current bands in force from 10 October 2022).
- FA 2003 ss.44, 48A, 76, Sch 4A (cross-jurisdictional contrast cites).
- LBTT(S)A 2013 Sch 14 (cross-border with Scotland).
- gov.wales rate page, technical guidance page, online return portal.

### Internal links added (to our existing pages)
- `/blog/landlord-tax-essentials/sdlt-buy-to-let-rates-surcharge-guide-2025` (used twice: in intro for jurisdiction routing, and in "Where this page fits" closing block).
- `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk`.
- `/blog/non-resident-landlord-tax/sdlt-non-resident-2-percent-surcharge`.

### Inline CTA placements
- Aside 1: after Williams-Hughes worked example (cross-border purchases / SDLT-LTT apportionment angle).
- Aside 2: after "Filing the return and paying the Welsh Revenue Authority" section (Welsh-specialist accountant angle).
- Total 2 asides, within 1-3 cap.

### Build attempts
- npm install (clean), npm run build: PASS (442 static pages, including the new page).

### Verification
- FAQ schema count in built HTML matches frontmatter: 14 = 14 ✅
- Em-dashes in markdown: 0 ✅
- Tailwind classes in markdown: 0 ✅
- Meta title length: 50 chars ≤62 ✅
- Meta description length: 153 chars ≤158 ✅
- Internal links resolve: all 3 unique targets exist in `Property/web/content/blog/` ✅
- monitored_pages row inserted: id 188 (90-day window) ✅
- Body word count: 2,736 (within 2,500-3,500 target) ✅

### Flags raised to wave5_site_wide_flags.md
- INTERNAL_LINK: SDLT BTL rates surcharge pillar should add a reciprocal sibling-link to B1 (Welsh LTT) once B1-B6 are merged; cross-jurisdictional routing.

### 2-3 sentence summary
B1 anchors the Welsh sub-bucket cluster with a positive-framing of the three Welsh-specific structural points (£225k nil band, no non-resident surcharge, no separate first-time-buyer regime), with three worked examples at Welsh purchase prices (£220k Davies / £395k Williams-Hughes / £1.6m Jones), the four-nation comparison table, and explicit cross-border apportionment under LTTA 2017 Sch 22 + FA 2003 s.48A. The rate table was verified live at gov.wales/land-transaction-tax-rates-and-bands per §16.35 and matches the §23.1 house position exactly. B1 leaves the higher-rates mechanic entirely to B2 and the MDR mechanic entirely to B3 (per brief sequencing).
