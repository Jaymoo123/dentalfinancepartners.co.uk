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
