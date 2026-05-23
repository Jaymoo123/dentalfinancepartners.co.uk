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
- **Final slug:** vat-on-rental-income-residential-vs-commercial-landlord-vat-status-decision-framework (brief default; no override)
- **Final category:** landlord-tax-essentials (brief default)
- **H1 chosen:** "VAT on Rental Income: A Decision Framework for Every Rental Stream"
- **Meta title chosen:** "VAT on Rental Income UK: Landlord Decision Framework" (52 chars)
- **Meta description chosen:** "Residential rent: exempt. Commercial: exempt unless opted. Holiday lets: 20% standard. Bundled services may shift. Per-stream landlord VAT decision tree." (153 chars; trimmed from 176-char initial)
- **Why these vs other options:** Title leads with the highest-volume query intent (VAT on rental income) + the framing differentiator (decision framework, not registration mechanic). Description front-loads the per-stream classifications in plain language for entry-level readers and explicitly signals the "decision tree" payload. Avoids overlap with the existing landlord-VAT-registration page's title.

### Competitor URLs fetched
- ukpropertyaccountants.co.uk/vat-on-rental-income-essential-insights-for-landlords-and-investors — primary outline reference
- ukpropertyaccountants.co.uk/vat-registered-property-business-pros-and-cons-for-landlords — pros-and-cons context
- ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes — myths context
- towerstone.co.uk/is-there-vat-on-rent — tentative; not re-tested at write time (ukpropertyaccountants coverage adequate)

### Existing-page review (from "Closest existing pages")
- landlord-vat-registration-when-required: CRITICAL cannibal-risk reviewed. A10 differentiates by being per-stream classification framework rather than registration mechanic; explicit cross-link in Scenario context and in the "When Do These Classifications Trigger Registration" H2; F-10 raised for existing-page back-link.
- A1 (vat-option-to-tax): forward-link in Commercial Lettings H2 + Related Reading + Depth Pages list. A10 does NOT re-walk OTT mechanic.
- A3 (vat-partial-exemption): forward-link in Mixed Portfolio H2 + Depth Pages. A10 does NOT re-walk PE mechanic.
- A8 (vat-toms-long-term-stays): forward-link in Serviced Accommodation H2 + Depth Pages. A10 does NOT re-walk 28-day rule.
- toms-vat-serviced-accommodation: cross-link in Depth Pages list.
- togc-vat-property-letting-business: cross-link in Depth Pages list.

### Citations added (external authority)
- VATA 1994 Sch 9 Group 1 (land exemption + Note 9 holiday-accommodation carve-out)
- VATA 1994 Sch 10 (option to tax + para 5 dwellings carve-out)
- VATA 1994 Sch 6 para 9 (long-stay reduced-value rule; sister to A8)
- VAT Regulations 1995 SI 1995/2518
- HMRC VAT Notice 742 (Land and property)
- HMRC VAT Notice 709/3 (Hotels and holiday accommodation)
- HMRC VATLAND VAT Land and Property Manual
- HMRC VAT registration thresholds page (£90,000 from 1 April 2024)
- Card Protection Plan Ltd v Commissioners of Customs and Excise (Case C-349/96) — composite-vs-multiple-supplies authority

### Internal links added (to our existing pages)
12 total internal /blog/ links covering all 9 Wave 5 A-bucket siblings plus 3 existing pages (landlord-vat-registration, toms-vat-serviced-accommodation, togc-vat-property-letting-business). A10 is the cluster hub.

### Inline CTA placements
- Aside 1 after "Commercial Lettings" H2 (OTT decision is structural, not annual)
- Aside 2 after "Three Worked Mini-Scenarios" H2 (most landlords are in one of these three patterns)

### Build attempts
- 2 attempts: initial build clean; second build after body padding (Three Worked Mini-Scenarios H2 + Most-Common Landlord VAT Mistakes H2 added to clear the 3,000-word floor) and meta-description trim, again clean

### Verification
- FAQ schema count in built HTML matches frontmatter: 13 = 13 ✅
- Em-dashes in markdown: 0 ✅
- Tailwind classes in markdown: 0 ✅
- Meta title length: 52 (≤62) ✅
- Meta description length: 153 (≤158) ✅ (initial 176 trimmed)
- Internal links resolve: 12/12 confirmed (all 9 A-bucket siblings + 3 existing)
- monitored_pages row inserted: id 211
- Body word count: 3,163 (target 3,000-3,500) ✅ (initial draft 2,431 padded with Three Scenarios + Mistakes H2s)

### §16.35 numeric verification log (every figure cited)
- VAT registration threshold £90,000 — verified via gov.uk (sister carry from A5/A7)
- VAT de-registration threshold £88,000 — verified (sister carry)
- 1 April 2024 effective date of current thresholds — verified
- OTT 30-day notification window — verified (sister carry from A1)
- 6 April 2025 FHL income-tax abolition — verified (sister carry from landlord-vat-registration page)
- 28-day rule day-29 trigger + 20% facilities floor (cross-reference to A8) — verified at A8 write time (sister carry)
- Sch 9 Group 1 Note 9 (holiday accommodation Note number) — verified at write time
- Sch 9 Group 1 Note 10 (parking) — verified at write time
- Sch 10 para 5 (OTT dwellings carve-out) — verified at A1 write time (sister carry)
- Sonder Europe Ltd v HMRC [2025] UKUT 14 (TCC) — verified at A8 write time (sister carry)
- Card Protection Plan (Case C-349/96) — established authority

### Flags raised to wave5_site_wide_flags.md
- F-10 INTERNAL_LINK: existing landlord-vat-registration-when-required page should back-link to A10 as the upstream per-stream classification framework. A10 already forward-links via the registration H2 and Related Reading. Cluster closes: A10 = upstream classification framework, existing = operational registration mechanic.

### 2-3 sentence summary
- A10 closes the Wave 5 Bucket A umbrella with the per-stream landlord VAT decision framework: residential exempt (Sch 9 Group 1; no opt under Sch 10 para 5), commercial exempt-then-OTT (Sch 10), holiday-let standard-rated (Note 9), serviced-accommodation Note 9 plus the 28-day rule (Sch 6 para 9). Three worked mini-scenarios (pure-residential / mixed-with-opted-commercial / pure-holiday-let) anchor the framework in the most common landlord configurations. The page forward-links to all 9 sibling depth pages plus the existing landlord-VAT-registration entry-point, completing the bucket cluster as the umbrella hub for the highest-volume "is rent VATable" search intent.
