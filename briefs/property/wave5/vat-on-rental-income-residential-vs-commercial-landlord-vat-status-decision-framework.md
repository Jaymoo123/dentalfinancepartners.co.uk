# Wave 5 brief: vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework

---

## Manager pre-decisions

- **Suggested slug:** `vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> A10 is the **umbrella decision-framework page** for the VAT bucket, serving the high-volume "is rent VAT-able" search-intent cohort. The page answers the entry-level question by walking the rental-income taxonomy: **(a) residential lettings are exempt under VATA 1994 Sch 9 Group 1 Item 1**, with no OTT route available (Sch 10 para 5 disapplies OTT on dwellings); **(b) commercial lettings are exempt by default but standard-rated if OTT is exercised** (Sch 10 generally); **(c) holiday accommodation is standard-rated as accommodation supplies** (Sch 9 Group 1 Note 9 carve-out); **(d) bundled services may convert otherwise-exempt rent into composite or multiple supplies** (Card Protection Plan test). The page is a **decision-tree umbrella** distinct from the depth pages: forward-links to A1 (OTT depth), A3 (partial-exemption depth), A8 (TOMS / 28-day depth), and the existing `landlord-vat-registration-when-required` page (registration depth). **The clear differentiation from the existing registration page** is that A10 is the per-stream decision framework (what VAT treatment applies to each rental income type, in plain language with a decision tree) while the existing page is the when-must-you-register operational mechanic. **Distinct from A1 by being the framework not the OTT depth. Distinct from A3 by being the upstream classification not the downstream allocation.**

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Highest-volume entry-level VAT query. Must explicitly differentiate from existing `landlord-vat-registration-when-required` to avoid cannibalisation. Use a per-page differentiator that emphasises "decision framework" + "rental income types" + "is rent VAT-able" rather than "when must you register".

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.ukpropertyaccountants.co.uk/vat-on-rental-income-essential-insights-for-landlords-and-investors/ — VERIFIED ALIVE 2026-05-23. Comprehensive on how VAT applies differently to residential rentals (exempt), commercial properties (can opt to tax), holiday lettings (taxable above £90,000 threshold), and serviced accommodation. Primary outline reference for the decision-tree spine.
- https://www.ukpropertyaccountants.co.uk/vat-registered-property-business-pros-and-cons-for-landlords/ — VERIFIED ALIVE 2026-05-23. Use for the pros-and-cons summary of registering vs not.
- https://www.towerstone.co.uk/is-there-vat-on-rent — STAGE 1 SEED. WebFetch returned permission-denied during Stage 2 verification 2026-05-23; treat as **TENTATIVE** and session must re-verify with httpx at write time. If dead, ukpropertyaccountants links above provide adequate outline coverage.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the rental-VAT myths section.

**Stage 2 verification note:** three URLs confirmed alive (primary). One tentative (towerstone). Adequate coverage even if tentative URL is dead.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: decision-tree outlines, classification frameworks, the residential / commercial / holiday-let / SA matrix. Borrow outline-shape, NOT clause language. Cross-check every claim against VATA 1994 Sch 9 Group 1 + Sch 10 + Notice 742.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (VAT on rent, is rent VATable, landlord VAT status, rental income VAT treatment).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — **closest existing.** Highest cannibal risk in the bucket. Differentiation: A10 is the per-rental-stream decision framework (what VAT treatment applies to each); the existing page is the operational registration-test (when do you become a VAT-registered landlord). A10 must open with explicit framing that distinguishes "what's the VAT treatment of my rent?" from "do I need to register?". A10 forward-links to existing for the registration mechanic; existing should back-link to A10 for the upstream classification framework (raise INTERNAL_LINK flag).

2. **A1 (forthcoming sibling)** — adjacent: OTT depth. A10 forward-links to A1.

3. **A3 (forthcoming sibling)** — adjacent: partial-exemption operational mechanic. A10 forward-links to A3 once portfolio mixes exempt + taxable.

4. **A8 (forthcoming sibling)** — adjacent: 28-day rule TOMS deepening. A10 forward-links to A8 for long-stay accommodation.

5. `toms-vat-serviced-accommodation` (category: `property-types-and-specialist-tax`) — adjacent. SA / holiday-let VAT. Cross-link.

6. `togc-vat-property-letting-business` (category: `property-types-and-specialist-tax`) — distant. Cross-link only if A10 covers TOGC briefly in the portfolio-disposal section.

**Cannibalisation discipline:**
- A10 stays strictly at decision-framework level. It does NOT re-walk OTT mechanics (defer to A1), partial-exemption mechanics (defer to A3), 28-day rule (defer to A8), or registration test (defer to existing). It IS the umbrella decision-tree that points readers to the depth pages.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `vat-on-rent`, `is-rent-vatable`, `landlord-vat-status`, `rental-income-vat` returned no old-slug redirects that map onto this new slug-token set. Note: existing `property-vat-registration-expert-services` redirect token in middleware.ts is to `property-accountant-services` — unrelated. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. A10 is the umbrella; citations span the relevant statute, regs, and notices.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 Sch 9 Group 1 (land exemption — residential lettings)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/9)
- [VATA 1994 Sch 9 Group 1 Note 9 (holiday accommodation standard-rated)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/9)
- [VATA 1994 Sch 10 para 5 (OTT disapplied for dwellings)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/5)
- [VATA 1994 Sch 10 (OTT regime — cross-reference to A1)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [HMRC VAT Notice 742 (Land and property)](https://www.gov.uk/government/publications/vat-notice-742-land-and-property)
- [HMRC VAT Notice 709/3 (Hotels and holiday accommodation)](https://www.gov.uk/government/publications/vat-notice-7093-hotels-and-holiday-accommodation)
- [HMRC VAT Manual VATLAND chapter](https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property)
- [Card Protection Plan Ltd v Commissioners of Customs and Excise (Case C-349/96) — composite-vs-multiple-supplies authority](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61996CJ0349)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (VAT registration threshold £90k, de-reg £88k, OTT election window, 28-day TOMS trigger, the 20%-from-day-29 figure if cross-referenced from A8) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Plain-language opening since this is the umbrella entry-point.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the four-stream decision tree, after a worked mixed-portfolio scenario, after the OTT-consideration moment.
- Vary opening sentence. A10 should open from the perspective of "the VAT treatment of your rent depends entirely on what type of property you let — and the rules differ in unexpected ways".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 12-14 FAQs (umbrella page, high entry-level demand).

### Cannibalisation
- Read existing `landlord-vat-registration-when-required` carefully before writing. Differentiation is critical: A10 is upstream classification, existing is registration mechanic.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section.

### Anti-templating
- A10's natural H2 spine differs from siblings: (1) the decision-framework opening — what VAT treatment applies to each rental income stream, (2) residential lettings (Sch 9 Group 1 exempt), (3) commercial lettings (Sch 9 default exempt, Sch 10 OTT route to standard-rated), (4) holiday accommodation (Sch 9 Note 9 standard-rated), (5) serviced accommodation + 28-day rule (forward-link A8), (6) parking / leisure pitches / sports lets, (7) bundled services + composite-vs-multiple supplies (Card Protection Plan), (8) mixed-portfolio decision tree, (9) when do these classifications trigger registration (forward-link existing page), (10) downstream depth pages (forward-link A1, A3, A8).
- Vary FAQ phrasing.

### Quality bar
- Word count: 3,000-3,500 body (umbrella; upper-mid band).
- FAQs: 12-14.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** Three confirmed alive; towerstone tentative.
5. **Read the closest existing pages.** Particular care: existing `landlord-vat-registration-when-required`.
6. **Plan the rewrite/write.** Decision-tree spine.
7. **Verify factual claims.** §16.35 per-write.
8. **Fetch a hero image from Pexels** via fetch_image_for_post.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none listed; the `property-vat-registration-expert-services` redirect token is unrelated.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (raise INTERNAL_LINK for existing `landlord-vat-registration-when-required` to back-link to A10).
18. **Discovery log.**
19. **Next page** (A10 is the last in the bucket; back-patch + post-write tracker close).

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
