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
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Meta description chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review (from "Closest existing pages")
- 

### Citations added (external authority)
- 

### Internal links added (to our existing pages)
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- FAQ schema count in built HTML matches frontmatter:
- Em-dashes in markdown:
- Tailwind classes in markdown:
- Meta title length:
- Meta description length:
- Internal links resolve:
- monitored_pages row inserted: id
- Body word count:

### §16.35 numeric verification log (every figure cited)
- 

### Flags raised to wave5_site_wide_flags.md
- 

### 2-3 sentence summary
- 
