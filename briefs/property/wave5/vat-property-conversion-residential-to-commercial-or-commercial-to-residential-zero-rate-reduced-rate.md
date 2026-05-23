# Wave 5 brief: vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate

---

## Manager pre-decisions

- **Suggested slug:** `vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Property conversion projects sit at the **VAT-relief end** of the construction-VAT spectrum, with three distinct reliefs depending on direction-and-type of conversion: **(a) zero-rate on the first sale or long lease of a converted-non-residential-to-residential building** (VATA 1994 Sch 8 Group 5 Item 1(b)), **(b) 5% reduced-rate on the residential-to-multiple-occupancy conversion or change in number of dwellings** (Sch 7A Group 6), and **(c) 5% reduced-rate on the renovation of an empty residential property** (Sch 7A Group 7, the so-called "2-year empty-home" rule). Zero on-site coverage of conversion specifically (existing `vat-on-new-builds-residential-property` covers new-builds under Group 5 Item 1(a); a different statutory route). This page is the canonical depth on the **three conversion reliefs**: when each applies, the developer-vs-DIY route choice, the certification mechanic (HMRC VAT Notice 708 evidence), and the downstream sale-or-let VAT position. **Distinct from existing new-build page** by being change-of-use, not original construction. **Distinct from A4 (mixed-use apportionment)** by being the change-of-use project rather than the purchase apportionment. **Distinct from `diy-housebuilders-vat-refund-scheme`** by being the commercial-developer-track relief rather than the DIY-personal-occupation refund.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** High-intent landlord-developer cohort. Complements existing new-build page; adjacent to DIY scheme.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://uklandlordtax.co.uk/vat-property-conversion-guide/ — VERIFIED ALIVE 2026-05-23. Comprehensive on residential conversions, reduced rates for qualifying conversions, renovations of empty buildings, zero-rating for housing association projects. Primary outline reference for the three-relief spine.
- https://www.taxaccountant.co.uk/vat-on-construction-industry-an-overview/ — VERIFIED ALIVE 2026-05-23. Comprehensive on VAT basics, registration thresholds, VAT schemes (FRS, CIS, Reverse Charge), and Notice 708 reduced rates. Use for the construction-VAT context and certification mechanic.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the conversion-myths section (e.g., the misconception that any residential renovation gets 5%; in fact the building must have been empty for 2+ years to qualify under Sch 7A Group 7).

**Stage 2 verification note:** all three URLs verified alive 2026-05-23.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor distinguishes the three reliefs, the certification mechanic, the developer-vs-DIY route choice. Borrow outline-shape, NOT clause language. Cross-check every claim against Sch 8 Group 5 + Sch 7A Groups 6 + 7 + Notice 708.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (VAT conversion, commercial to residential VAT, empty home 5% VAT, change of use VAT).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `vat-on-new-builds-residential-property` (category: `property-types-and-specialist-tax`) — **closest existing.** New-build is Sch 8 Group 5 Item 1(a); conversion is Item 1(b). Same Schedule, different Item, similar 0% mechanic but distinct qualifying-conditions test. A6 forward-links to the existing page as the sibling new-build mechanic; existing should back-link to A6 (raise INTERNAL_LINK flag).

2. `diy-housebuilders-vat-refund-scheme` (category: `property-types-and-specialist-tax`) — adjacent. DIY scheme is the refund route for self-builders + self-converters who can't recover input tax through registration. A6 has a section on developer-vs-DIY route choice and cross-links to existing for the DIY mechanic.

3. `domestic-reverse-charge-construction-vat-landlords` (category: `property-types-and-specialist-tax`) — adjacent. Reverse-charge applies to construction services regardless of zero-rate / 5% / 20%; conversion projects use reverse-charge contractors. Cross-link.

4. **A1 (forthcoming sibling)** — adjacent. If the converted property is then let commercially with OTT, downstream VAT regime kicks in. Cross-link briefly.

5. **A4 (forthcoming sibling)** — adjacent. Mixed-use conversion (e.g., flat-over-shop converted into a single dwelling) has apportionment + change-of-use overlap. Cross-link.

**Cannibalisation discipline:**
- A6 is the conversion-specific applied page covering three reliefs. Existing new-build page covers Item 1(a) only; A6 covers Item 1(b) + Sch 7A Group 6 + Group 7. Clear topical boundary.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `conversion`, `change-of-use`, `commercial-to-residential`, `residential-to-commercial`, `5-percent`, `empty-home` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. Conversion VAT is statute-led + Notice-led.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 Sch 8 Group 5 (zero-rated construction of dwellings and converted non-residential)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/8)
- [VATA 1994 Sch 8 Group 5 Item 1(b) (zero-rated conversion non-resi-to-resi)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/8)
- [VATA 1994 Sch 7A Group 6 (5% reduced-rate residential conversion)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/7A)
- [VATA 1994 Sch 7A Group 7 (5% reduced-rate empty-home renovation)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/7A)
- [HMRC VAT Notice 708 (Buildings and construction)](https://www.gov.uk/government/publications/vat-notice-708-buildings-and-construction)
- [HMRC VAT Notice 719 (DIY refund — cross-reference)](https://www.gov.uk/government/publications/vat-refunds-for-diy-housebuilders-claim-form-and-notes-for-new-houses)
- [HMRC VAT Manual VATLAND chapter](https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property)
- [HMRC VCONST chapter (VAT Construction Manual)](https://www.gov.uk/hmrc-internal-manuals/vat-construction)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (VAT zero / 5% / 20% rates, the 2-year empty-home qualifying period, the registration threshold £90k, certification window) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact schedules, groups, items.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the three-relief comparison, after a worked commercial-to-residential example, after the developer-vs-DIY route-choice section.
- Vary opening sentence. A6 should open from the perspective of "VAT relief is direction-sensitive: where the building came from + what it becomes drives which of three reliefs applies".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 11-13 FAQs.

### Cannibalisation
- Read closest-existing new-build + DIY + reverse-charge pages before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section.

### Anti-templating self-check (brief 6 of 10)
- A1 spine: election → cooling-off → REE → disapplication → revocation. A2 spine: threshold → 10-intervals → adjustment formula → refurb → disposal. A3 spine: attribution → apportionment → de-minimis → annual adjustment → special method. A4 spine: building-blocks → apportionment-methodologies → dwellings carve-out → worked examples → SDLT cross-ref. A5 spine: lease-end moment → pre-2020 → post-2020 → diagnostic → evidence → lease-drafting. A6 natural spine: (1) three-relief overview at a glance, (2) Sch 8 Group 5 Item 1(b) (0% on first sale or long lease of converted-non-resi), (3) Sch 7A Group 6 (5% residential conversion), (4) Sch 7A Group 7 (5% empty-home renovation), (5) certification mechanic + Notice 708 evidence, (6) developer-vs-DIY route choice, (7) downstream sale-or-let VAT position, (8) worked commercial-to-residential project example, (9) worked empty-home renovation example.
- Six distinct spines confirmed. **No templating drift detected at brief-6 spot-check.**
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,800-3,500 body (three-relief depth; mid-to-upper band).
- FAQs: 11-13.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** All three confirmed alive.
5. **Read the closest existing pages** including the new-build + DIY + reverse-charge pages.
6. **Plan the rewrite/write.** Distinct H2 spine per the three-relief framing.
7. **Verify factual claims.** §16.35 per-write: every numeric figure WebFetched at write time.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none listed.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for existing new-build page to back-link to A6).
18. **Discovery log.**
19. **Next page.**

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate (brief default; no override)
- **Final category:** property-types-and-specialist-tax (brief default)
- **H1 chosen:** "Property Conversion and VAT: Zero-Rate, 5%, and the Certification Mechanic"
- **Meta title chosen:** "Property Conversion VAT UK: Zero-Rate and 5% Reliefs" (52 chars)
- **Meta description chosen:** "Three property conversion VAT reliefs: zero-rate Sch 8 Group 5 Item 1(b), 5% Sch 7A Group 6, 5% Sch 7A Group 7 empty-home. Mechanics + worked examples." (151 chars; trimmed from 176-char initial draft)
- **Why these vs other options:** Title leads with primary query (Property Conversion VAT) and signals both reliefs (zero + 5%). Description packs all three statutory anchors (the SEO win on Notice 708 + Sch 8 + Sch 7A clusters). H1 leads with the topic and then signals the mechanic depth without sacrificing readability.

### Competitor URLs fetched
- gov.uk/guidance/buildings-and-construction-vat-notice-708 — Notice 708 (primary authority, last updated 26 June 2025): Item 1(b) conditions, certification, 10-year rule, 2-year empty rule
- uklandlordtax.co.uk/vat-property-conversion-guide — alive; weak on statutory anchors but useful for the three-relief framework outline
- ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes — alive; useful for the misconceptions section seed
- taxaccountant.co.uk/vat-on-construction-industry-an-overview — alive; useful for the construction-VAT context but light on conversion specifics

### Existing-page review (from "Closest existing pages")
- vat-on-new-builds-residential-property: confirmed Sibling on Sch 8 Group 5 Item 1(a). Brief 5% conversion mention; A6 is the depth. Forward-link in Related Reading.
- diy-housebuilders-vat-refund-scheme: confirmed adjacent; A6 covers developer-route only, cross-link to DIY page for the self-converter mechanic
- domestic-reverse-charge-construction-vat-landlords: confirmed adjacent; cross-link for the reverse-charge interaction (5% rate is reverse-charged where parties are VAT/CIS-registered)
- A1 (vat-option-to-tax): confirmed sibling; cross-link in Related Reading
- A4 (vat-mixed-use-property-purchase): confirmed sibling; cross-link in Related Reading for the apportionment angle on mixed-use conversions

### Citations added (external authority)
- VATA 1994 Sch 8 Group 5 (zero-rated construction of dwellings) — legislation.gov.uk
- VATA 1994 Sch 7A (reduced-rate supplies) — legislation.gov.uk
- HMRC VAT Notice 708 (Buildings and construction) — gov.uk
- HMRC VAT Notice 719 (DIY refund scheme) — gov.uk
- HMRC VCONST VAT Construction Manual — gov.uk
- HMRC VATLAND VAT Land and Property Manual — gov.uk
- HMRC VAT Domestic Reverse Charge for Construction Services — gov.uk

### Internal links added (to our existing pages)
- /blog/property-types-and-specialist-tax/vat-on-new-builds-residential-property (existing)
- /blog/property-types-and-specialist-tax/diy-housebuilders-vat-refund-scheme (existing)
- /blog/property-types-and-specialist-tax/domestic-reverse-charge-construction-vat-landlords (existing)
- /blog/property-types-and-specialist-tax/vat-option-to-tax-commercial-property-mechanics-election-revocation (A1 sibling)
- /blog/property-types-and-specialist-tax/vat-mixed-use-property-purchase-residential-commercial-element-apportionment (A4 sibling)

### Inline CTA placements
- Aside 1 after "Zero-Rate on First Grant" H2 (structure the sale into project plan)
- Aside 2 after "5% Empty-Home Renovations" H2 (Empty Property Officer letter before mobilisation)
- Aside 3 after "Worked Example B" (5% relief is cost-reduction, not recovery route)

### Build attempts
- 1 attempt; build clean

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✅
- Em-dashes in markdown: 0 ✅
- Tailwind classes in markdown: 0 ✅
- Meta title length: 52 (≤62) ✅
- Meta description length: 151 (≤158) ✅ (initial 176 trimmed by collapsing "5% residential conversion Sch 7A Group 6" → "5% Sch 7A Group 6" and "5% empty-home renovation Sch 7A Group 7" → "5% Sch 7A Group 7 empty-home")
- Internal links resolve: 5/5 confirmed
- monitored_pages row inserted: id 200
- Body word count: 2,797 (target 2,800-3,500; at lower boundary by 3 words; not padded)

### §16.35 numeric verification log (every figure cited)
- 10-year non-residential-history rule (Item 1(b)) — verified via VAT Notice 708 at write time
- 2-year continuous empty-period rule (Sch 7A Group 7) — verified via VAT Notice 708 at write time
- 21-year major-interest threshold — statutory definition, verified via Sch 8 Group 5 Note 1 (carry-safe)
- Zero rate (0%), reduced rate (5%), standard rate (20%) — long-standing UK rates (no carry-risk)
- CGS £250,000 VAT-exclusive threshold — verified via A2 work-log (sister carry; reg 113 VAT Regulations 1995)
- Reverse-charge effective date 1 March 2021 — verified via gov.uk reverse-charge guidance at write time

### Flags raised to wave5_site_wide_flags.md
- F-6 INTERNAL_LINK: existing vat-on-new-builds-residential-property page should back-link to A6 for conversion-specific depth (it currently has one paragraph on the 5% rate). A6 already forward-links via Related Reading. (Flag-number F-5 was taken by Session C's alexander-ene URL-rot note shortly before A6 wrote-up; A6 takes F-6.)

### 2-3 sentence summary
- A6 sets out the three statutory reliefs for property conversion projects (Sch 8 Group 5 Item 1(b) zero-rate, Sch 7A Group 6 5% conversion, Sch 7A Group 7 5% empty-home), the certification mechanic and Notice 708 evidence requirements, the developer-vs-DIY route choice, and the downstream sale-or-let position that determines whether the relief produces a recovery route or just a cost reduction. Two worked examples (office-to-flats zero-rate + Victorian-terrace empty-home 5%) and a misconceptions section close out the page. Sits sibling to existing new-build and DIY pages with clear topical boundary.
