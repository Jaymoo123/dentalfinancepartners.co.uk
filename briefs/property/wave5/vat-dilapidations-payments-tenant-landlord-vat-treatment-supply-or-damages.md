# Wave 5 brief: vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages

---

## Manager pre-decisions

- **Suggested slug:** `vat-dilapidations-payments-tenant-landlord-vat-treatment-supply-or-damages`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Dilapidations payments at lease end raise a **single recurring VAT question**: are they damages (outside the scope of VAT) or consideration for a taxable supply (standard-rated, if landlord OTT-on)? HMRC's position **changed materially in 2020** via VAT Brief 12/2020, moving from a near-universal "outside scope" treatment to a **look-through-to-the-underlying-contract test** that the agreed payment continues, post-lease, to be consideration for the supply of the lease. The position was further refined by Revenue and Customs Brief 12/2020 retraction commentary and case law. Zero on-site coverage. This page is the canonical depth on dilapidations + VAT: the pre-2020 framing, the post-2020 look-through test, the practical evidence requirements (lease clauses, surveyor reports, settlement correspondence), the supply-vs-damages diagnostic, and the lease-drafting implications. **Distinct from A1 (OTT election)** by being applied to a specific end-of-lease transaction, not the election mechanic. **Distinct from existing dilapidations content** (there is none on-site for VAT specifically; CGT capital-vs-revenue overlay is on-topic and gets a section).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Niche commercial-landlord topic; high search intent during lease-end negotiations. Zero on-site coverage of the VAT angle.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://bhp.co.uk/news-events/blog/dilapidations-demystified-accounting-tax-and-vat-implications/ — VERIFIED ALIVE 2026-05-23. Comprehensive on the accounting + tax + VAT dimensions: recognition criteria, audit considerations, tax deductibility, VAT treatment with the specific guidance that "genuine dilapidations do not attract VAT". Primary outline reference for the supply-vs-damages diagnostic.
- https://www.geraldedelman.com/insights/vat-and-property-issues — TENTATIVE 2026-05-23 (Stage 2 WebFetch returned permission-denied). Session re-verifies at write time. If dead, search geraldedelman.com or saffery.com for replacement on commercial-lease-end VAT treatment.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the dilapidations-myths section (e.g., the common belief that all lease-end payments follow the rent's VAT treatment; in fact dilapidations are tested separately on a supply-vs-damages basis).

**Stage 2 verification note:** bhp confirmed alive (primary). geraldedelman tentative pending session re-verify. ukpropertyaccountants confirmed alive.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor explains the supply-vs-damages diagnostic, the post-2020 HMRC view, evidence requirements, and lease-drafting implications. If geraldedelman is dead, replace with saffery.com or another firm's commercial-lease VAT analysis.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (dilapidations VAT, lease end damages VAT, schedule of dilapidations VAT treatment).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. **A1 (forthcoming sibling)** — adjacent: A5 only matters where the landlord is OTT-on the let property. A5 forward-links to A1 for the OTT election mechanic; A5 does not re-walk it.

2. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — distant. Touches the exempt-vs-taxable distinction at registration depth only. Cross-link briefly.

3. **A10 (forthcoming sibling)** — adjacent: A10 is the residential-vs-commercial decision framework; A5 is the lease-end-specific applied page. Cross-link from A10's commercial-element section.

4. No existing on-site coverage of commercial-lease-end dilapidations or supply-vs-damages VAT diagnostics. Topical gap confirmed.

**Cannibalisation discipline:**
- A5 is the dilapidations-specific applied page. A1 owns OTT mechanic; A5 stays narrow to the lease-end transaction.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `dilapidations`, `lease-end`, `damages`, `supply-or-damages`, `tenant-landlord-vat` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. Dilapidations + VAT is HMRC-Brief-led with VATSC underlying guidance.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 s.5 (meaning of supply)](https://www.legislation.gov.uk/ukpga/1994/23/section/5)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [HMRC Revenue and Customs Brief 12 (2020): VAT early termination fees and compensation payments](https://www.gov.uk/government/publications/revenue-and-customs-brief-12-2020-vat-early-termination-fees-and-compensation-payments)
- [HMRC Revenue and Customs Brief 2 (2022): VAT early termination fees and compensation payments (revised position)](https://www.gov.uk/government/publications/revenue-and-customs-brief-2-2022-vat-early-termination-fees-and-compensation-payments)
- [HMRC VAT Manual VATSC (Supply and Consideration)](https://www.gov.uk/hmrc-internal-manuals/vat-supply-and-consideration)
- [HMRC VAT Notice 742 (Land and property)](https://www.gov.uk/government/publications/vat-notice-742-land-and-property)
- [VATA 1994 Sch 10 (OTT regime — cross-reference for landlord OTT position)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/10)
- [Vocalspruce Ltd v HMRC [2014] UKUT 276 — relevant for compensation-vs-supply line](https://www.gov.uk/tax-and-chancery-tribunal-decisions)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (VAT registration threshold, OTT election window, any rate or threshold cited in HMRC Briefs 12/2020 or 2/2022, statutory time-limits) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. Particular care: the HMRC Brief position has shifted since 2020; ensure the most recent Brief is the cited authority.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact briefs, regulations, notices.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the supply-vs-damages diagnostic section, after a worked dilapidations example, after the lease-drafting implications section.
- Vary opening sentence. A5 should open from the perspective of the lease-end moment: a tenant about to hand back keys, landlord with a schedule of dilapidations, and the question of whether VAT applies to the settlement.

### Schema
- FAQs live in frontmatter `faqs:` array. Target 10-12 FAQs.

### Cannibalisation
- Read closest-existing pages before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section.

### Anti-templating
- A5's natural H2 spine differs from A1 / A2 / A3 / A4: (1) the lease-end moment and the supply-vs-damages question, (2) the pre-2020 HMRC view, (3) the post-2020 look-through test (Brief 12/2020 + Brief 2/2022 refinement), (4) the supply-vs-damages diagnostic (genuine compensation vs further consideration for the lease), (5) evidence requirements (lease clauses, schedule of dilapidations, surveyor's report, settlement correspondence), (6) worked commercial-lease example with OTT-on landlord, (7) lease-drafting implications, (8) CGT capital-vs-revenue overlay (brief mention), (9) the residential lease angle (typically outside scope due to exempt rent).
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,500-3,000 body (niche topic).
- FAQs: 10-12.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** geraldedelman tentative; replace if dead.
5. **Read the closest existing pages.**
6. **Plan the rewrite/write.** Distinct H2 spine.
7. **Verify factual claims.** §16.35 per-write: every numeric figure WebFetched. Particular care: HMRC Brief 2/2022 is the most recent position; cite the latest.
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
