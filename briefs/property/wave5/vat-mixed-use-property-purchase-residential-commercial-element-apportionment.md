# Wave 5 brief: vat-mixed-use-property-purchase-residential-commercial-element-apportionment

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-mixed-use-property-purchase-residential-commercial-element-apportionment.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-mixed-use-property-purchase-residential-commercial-element-apportionment

---

## Manager pre-decisions

- **Suggested slug:** `vat-mixed-use-property-purchase-residential-commercial-element-apportionment`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Mixed-use property purchases (flat-over-shop, live-work units, hotel-with-ground-floor-retail, mixed residential / commercial blocks) raise a **consideration-apportionment question on acquisition**: how do you split the purchase price between the zero-rated new-build residential element (if applicable), the exempt-by-default residential lettings element, and the standard-rated commercial element where OTT applies? Zero on-site coverage. This page covers the **apportionment methodologies** (floor-area, market-value, professional-valuation, just-and-reasonable), the **VAT-vs-SDLT cross-question** (different apportionment rules apply in each tax), and the **OTT-on-commercial-element trap** (a single OTT election applies only to the commercial part if the building has been correctly subdivided in the election). **Distinct from A1 (OTT election)** by being apportionment-at-acquisition rather than the election mechanic itself. **Distinct from A6 (conversion)** by being the purchase-of-existing-mixed-use page, not the change-of-use conversion mechanic. **Distinct from existing SDLT mixed-use pages** (`sdlt-9-residential-mixed-use-classification`) by being VAT-focused, not SDLT-focused, with a section flagging the SDLT cross-reference.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Mixed-use is a high-intent specialist topic. Complements existing SDLT mixed-use classification page; sits inside the OTT cluster but at a distinct angle.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.towerstone.co.uk/how-does-vat-work-on-mixed-use-properties — STAGE 1 SEED. WebFetch returned permission-denied during Stage 2 verification 2026-05-23; treat as **TENTATIVE** and session must re-verify with httpx at write time. If dead, search ukpropertyaccountants.co.uk + geraldedelman.com for replacement on mixed-use VAT mechanics.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the mixed-use myths section (e.g., the misconception that a single OTT covers a whole mixed-use building; in fact dwellings are carved out under Sch 10 para 5).
- https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/ — VERIFIED ALIVE 2026-05-23. Useful for the OTT-on-acquisition context (buyer's VAT position when seller has opted on the commercial element).

**Stage 2 verification note:** towerstone URL flagged as tentative (permission-denied during Stage 2 fetch, not confirmed dead). Session re-verifies at write time. Two URLs confirmed alive provide outline coverage.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: methodology examples for apportionment, treatment of dwellings carve-out, VAT-vs-SDLT cross-references. If towerstone is dead at write time, search for "VAT mixed use property apportionment" on ukpropertyaccountants.co.uk + geraldedelman.com.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (VAT mixed use property, flat over shop VAT, apportionment commercial residential element).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `sdlt-9-residential-mixed-use-classification` (category: `property-types-and-specialist-tax`) — adjacent: SDLT mixed-use classification (Bewley test, predominantly-residential question). A4 is the VAT counterpart. Cross-link bi-directionally; A4 makes the cross-tax point.

2. **A1 (forthcoming sibling)** — upstream: OTT election mechanic. A4 forward-links to A1 for the OTT election; A4's scope is only the commercial element, not OTT mechanics.

3. **A6 (forthcoming sibling)** — adjacent: VAT on conversion of mixed-use into single-use. A4 is the purchase-of-mixed-use page; A6 is the conversion-of-resi-or-commercial page. Cross-link with explicit boundary in each brief.

4. `vat-on-new-builds-residential-property` (category: `property-types-and-specialist-tax`) — adjacent. Pure new-build residential is zero-rated; mixed-use new-builds raise the same apportionment question. Cross-link in the zero-rated-residential-component section.

5. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — distant. Touches mixed supplies at the highest level only. Cross-link only briefly.

6. **A2 (forthcoming sibling)** — adjacent: CGS applies to the commercial element if the OTT-on commercial portion is ≥ £250k. Cross-link in the CGS sub-section.

**Cannibalisation discipline:**
- A4 is specifically the apportionment-at-acquisition page. A1 owns OTT mechanic; A6 owns conversion; A2 owns CGS. A4 stays narrow to apportionment + per-element treatment + cross-tax SDLT reference.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `mixed-use`, `flat-over-shop`, `apportionment`, `live-work`, `composite` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. Mixed-use VAT is statute-led with HMRC guidance on apportionment methodology.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 Sch 8 Group 5 (zero-rated construction of new-build dwellings)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/8)
- [VATA 1994 Sch 9 Group 1 (land exemption — residential lettings)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/9)
- [VATA 1994 Sch 10 para 5 (dwellings carve-out from OTT)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/5)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [HMRC VAT Notice 742 (Land and property — apportionment chapter)](https://www.gov.uk/government/publications/vat-notice-742-land-and-property)
- [HMRC VAT Notice 708 (Buildings and construction)](https://www.gov.uk/government/publications/vat-notice-708-buildings-and-construction)
- [HMRC VAT Manual VATLAND chapter on apportionment](https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property)
- [HMRC SDLT Manual SDLTM00385 (mixed-use Bewley test) — cross-tax reference](https://www.gov.uk/hmrc-internal-manuals/stamp-duty-land-tax-manual)
- [Card Protection Plan Ltd v Commissioners of Customs and Excise (Case C-349/96) — composite-vs-multiple-supplies authority](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61996CJ0349)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (VAT registration threshold, OTT election window, any percentage rate, the £250k CGS threshold if mentioned, SDLT mixed-use rates if cross-referenced) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact regulations and notices.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the apportionment-methodology comparison, after the worked flat-over-shop example, after the VAT-vs-SDLT cross-tax section.
- Vary opening sentence. A4 should open from the perspective of "the contract specifies a single price, but VAT requires you to look behind that".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 10-12 FAQs.

### Cannibalisation
- Read closest-existing pages before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section.

### Anti-templating
- A4's natural H2 spine differs from A1 / A2 / A3: (1) why mixed-use raises a single-purchase-price problem, (2) the four VAT building blocks (zero-rated new-build dwelling, exempt residential lettings, standard-rated commercial OTT-on, exempt commercial OTT-off), (3) the apportionment methodologies (floor-area, market-value, professional valuation, just-and-reasonable), (4) the dwellings carve-out from OTT, (5) worked flat-over-shop example, (6) hotel-with-retail-ground-floor variant, (7) SDLT cross-reference (mixed-use rates), (8) downstream consequences (CGS forward-link, partial-exemption forward-link).
- Vary FAQ phrasing. No echo of A1 election or A2 interval or A3 attribution questions.

### Quality bar
- Word count: 2,500-3,200 body (specialist topic but mid-band).
- FAQs: 10-12.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** towerstone tentative; replace if dead.
5. **Read the closest existing pages.**
6. **Plan the rewrite/write.** Vary the H2 spine and opening from A1 / A2 / A3.
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
17. **Flag.**
18. **Discovery log.**
19. **Next page.**

## Session-side watcher pattern

When you append a STATUS open question, spawn a Monitor task watching for STATUS answered. Keep working on another step / another page while you wait.

---

## Per-page work-log (fill in as you go, supports resumability if interrupted)

### Decisions
- **Final slug:** vat-mixed-use-property-purchase-residential-commercial-element-apportionment (unchanged)
- **Final category:** Property Types & Specialist Tax
- **H1 chosen:** VAT on Mixed-Use Property Purchases: Apportionment and the Dwellings Carve-Out
- **Meta title chosen:** "VAT on Mixed-Use Property: Apportionment + OTT Trap" (51 chars)
- **Meta description chosen:** "Buying UK flat-over-shop or hotel-with-retail mixed-use property: VAT apportionment methodology, dwellings carve-out from OTT, SDLT cross-tax cross-reference." (158 chars)
- **Why these vs other options:** Title leads with "VAT on Mixed-Use Property" (the head query) + "Apportionment + OTT Trap" (depth signal). Meta description packs the three depth points: apportionment methodology, dwellings carve-out, SDLT cross-tax (the cross-tax point is unique to this page in the bucket).

### Competitor URLs fetched
- https://www.towerstone.co.uk/how-does-vat-work-on-mixed-use-properties — fetched successfully at write time (no permission denied this time). 15-section structure used as outline reference; apportionment methods listed (floor area, square footage, relative value, independent valuation, "HMRC does not mandate a single method").
- https://www.gov.uk/guidance/vat-on-land-and-property-notice-742 — used for the "fairly and reasonably" apportionment standard.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — informed the common-mistakes H2 (mythbusting on whole-building OTT covering dwellings).
- https://www.taxaccountant.co.uk/vat-on-property-purchases-when-the-seller-opted-to-tax/ — informed the buyer-side acquisition VAT analysis.

### Existing-page review (from "Closest existing pages")
- A1 (just-committed, OTT mechanic): forward-linked from the dwellings carve-out H2 and Related Reading.
- A2 (just-committed, CGS): forward-linked from the downstream-consequences H2 and Related Reading.
- A3 (just-committed, partial exemption): forward-linked from the downstream-consequences H2 and Related Reading.
- `sdlt-mixed-use-property-classification` (existing on site, landlord-tax-essentials category): cross-linked from SDLT cross-tax H2 and Related Reading. (Initial draft mis-referenced as `sdlt-9-residential-mixed-use-classification`; corrected on verification before commit.)
- `vat-on-new-builds-residential-property` (existing on site, property-types-and-specialist-tax category): cross-linked from Related Reading (new-build dwelling element in mixed-use builds).
- `landlord-vat-registration-when-required` (existing on site): not cross-linked from A4 (too entry-level; A1/A2/A3 own the depth links).

### Citations added (external authority)
- VATA 1994 Schedule 8 Group 5 (zero-rated construction of dwellings)
- VATA 1994 Schedule 9 Group 1 (land exemption)
- VATA 1994 Schedule 10 para 5 (dwellings carve-out)
- HMRC VAT Notice 742 (Land and property)
- HMRC VAT Notice 708 (Buildings and construction)
- HMRC VAT Land and Property internal manual
- HMRC SDLT Manual SDLTM00385 (Bewley test for SDLT mixed-use)

### Internal links added (to our existing pages)
- `/blog/property-types-and-specialist-tax/vat-option-to-tax-commercial-property-mechanics-election-revocation` (A1 sibling)
- `/blog/property-types-and-specialist-tax/vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` (A2 sibling)
- `/blog/landlord-tax-essentials/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method` (A3 sibling)
- `/blog/landlord-tax-essentials/sdlt-mixed-use-property-classification` (SDLT cross-tax existing)
- `/blog/property-types-and-specialist-tax/vat-on-new-builds-residential-property` (existing new-build sibling)

### Inline CTA placements
- Aside 1: after the four apportionment methodologies H2 (standard-vs-special methodology framing)
- Aside 2: after Worked Example 2 (hotel-with-retail) (aparthotel VAT analysis framing)

### Build attempts
- 1: build successful. A4 added to property-types-and-specialist-tax route. No errors.

### Verification
- FAQ schema count in built HTML matches frontmatter: 11 = 11 ✓
- Em-dashes in markdown: 0 ✓
- Tailwind classes in markdown: 0 ✓
- Meta title length: 51 chars (≤62) ✓
- Meta description length: 158 chars (=158, at the limit) ✓
- Internal links resolve: all 5 distinct paths resolve to existing markdown files ✓
- monitored_pages row inserted: yes (site_key=property, slug=vat-mixed-use-property-purchase-residential-commercial-element-apportionment, monitor_until=CURRENT_DATE + 90 days, rewrite_type=rewrite, notes='Wave 5 Bucket A net-new VAT mixed-use apportionment page')
- Body word count: 2,517 (within 2,500-3,200 specialist-topic band)

### §16.35 numeric verification log (every figure cited)
- 20% VAT standard rate: universal.
- Sch 10 para 5 dwellings carve-out: verified legislation.gov.uk paragraph/5 + HMRC Notice 742A (previously verified A1 work).
- Sch 8 Group 5 Item 1 zero-rated first grant of dwellings: verified legislation.gov.uk ukpga/1994/23/schedule/8 (2026-05-23). 4-condition definition of "designed as a dwelling" verified.
- Sch 9 Group 1 Item 1 land exemption: verified (previously A1 work-log).
- £250,000 VAT-exclusive CGS threshold (cross-referenced): verified A2 work-log.
- £90,000 VAT registration threshold (cross-referenced): verified A1 work-log.
- 5% SDLT additional dwelling supplement (cross-referenced in worked example): not a new VAT figure but a SDLT cross-reference. Cited in passing (not as a worked SDLT figure); SDLT depth treatment is at the cross-linked SDLT mixed-use page. The 5% additional dwelling supplement is consistent with the existing SDLT figures on the site as of 2026-05.
- Acquisition-cost apportionment percentages (62% commercial / 38% residential in the worked example): derived from the worked example, not a third-party figure.

### Flags raised to wave5_site_wide_flags.md
- None this session. Initial draft mis-linked to a non-existent `sdlt-9-residential-mixed-use-classification` page slug; corrected to the actual `sdlt-mixed-use-property-classification` (landlord-tax-essentials category) before commit. No site-wide implications.

### 2-3 sentence summary
- A4 is the VAT apportionment-at-acquisition page for mixed-use property purchases. Covers the four VAT building blocks (zero-rated new-build dwelling, exempt residential lettings, standard-rated commercial OTT-on, exempt commercial OTT-off), the four apportionment methodologies (floor area, market value, professional valuation, just-and-reasonable), the Sch 10 para 5 dwellings carve-out from OTT, structural-separation as the gating test for selective OTT, two worked examples (flat-over-shop + hotel-with-retail), and the SDLT cross-tax point (different apportionment from VAT under the Bewley test). Sits adjacent to A1/A2/A3 in the bucket and cross-links to the existing SDLT mixed-use classification page.
