# Wave 5 brief: vat-developer-pre-registration-input-tax-recovery-property-development-projects

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-developer-pre-registration-input-tax-recovery-property-development-projects.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-developer-pre-registration-input-tax-recovery-property-development-projects

---

## Manager pre-decisions

- **Suggested slug:** `vat-developer-pre-registration-input-tax-recovery-property-development-projects`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Property developers incur **substantial VAT-able costs before VAT registration**: feasibility studies, planning consultancy, professional fees (architects, surveyors, structural engineers), legal fees, deposits on land, and start-up overheads. The **pre-registration input-tax recovery rules** under VAT Regulations 1995 reg 111 allow recovery of: **(a) goods on hand at registration date that were bought within 4 years pre-registration AND are still on hand for business use, and (b) services bought within 6 months pre-registration**, subject to the goods/services being used by the now-registered business in making taxable supplies. Zero on-site coverage. This page is the canonical depth on developer pre-registration recovery: the **6-month-services / 4-year-goods windows**, the still-on-hand test for goods, the apportionment between taxable + exempt + private use, the documentation discipline, and the interaction with the developer's downstream OTT election (A1) + CGS treatment (A2). **Distinct from A1 (OTT)** by being the recovery-rules-pre-OTT phase. **Distinct from A2 (CGS)** by being entry-point recovery, not the long-tail adjustment. **Distinct from existing `landlord-vat-registration-when-required`** by being developer-cohort-applied + reg-111-specific, not the registration-test page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** Developer cohort is a high-CPC sub-segment; reg 111 is canonical and underserved.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.towerstone.co.uk/can-i-reclaim-vat-on-property-development-costs — STAGE 1 SEED. WebFetch returned permission-denied during Stage 2 verification 2026-05-23; treat as **TENTATIVE** and session must re-verify with httpx at write time. If dead, search ukpropertyaccountants.co.uk + taxaccountant.co.uk for replacement.
- https://www.taxaccountant.co.uk/vat-on-construction-industry-an-overview/ — VERIFIED ALIVE 2026-05-23. Use for the developer-VAT context: registration thresholds, schemes, Notice 708 references.
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the pre-registration recovery myths section.
- https://www.ukpropertyaccountants.co.uk/vat-registered-property-business-pros-and-cons-for-landlords/ — VERIFIED ALIVE 2026-05-23. Use for the developer-vs-landlord VAT-registration trade-off.

**Stage 2 verification note:** towerstone tentative (permission-denied during Stage 2 fetch); session re-verifies. Three URLs confirmed alive.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor explains the 6-month / 4-year windows, the still-on-hand test, documentation discipline. Borrow outline-shape, NOT clause language. Cross-check every claim against VAT Regulations 1995 reg 111 + HMRC VAT Notice 700 chapter 11 + VIT32000+.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (pre-registration VAT recovery, developer VAT reclaim, property development VAT).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `landlord-vat-registration-when-required` (category: `landlord-tax-essentials`) — adjacent: registration test. A7 is the post-registration recovery rules; the existing page is the when-to-register entry-point. Cross-link.

2. **A1 (forthcoming sibling)** — adjacent: developer typically opts to tax post-registration to recover construction VAT. A7 forward-links to A1 once both pages ship.

3. **A2 (forthcoming sibling)** — adjacent: post-registration the developer's £250k+ assets enter CGS. A7 forward-links to A2 briefly.

4. **A6 (forthcoming sibling)** — adjacent: conversion-relief reliefs (0% / 5%) interact with the developer's input-tax position. A7 forward-links to A6 if the developer is doing a conversion.

5. `vat-on-new-builds-residential-property` (category: `property-types-and-specialist-tax`) — adjacent. New-build developer's zero-rated outputs + input-tax recovery framework. Cross-link.

6. `domestic-reverse-charge-construction-vat-landlords` (category: `property-types-and-specialist-tax`) — adjacent. Reverse-charged construction input VAT counts for pre-registration recovery purposes. Cross-link briefly.

**Cannibalisation discipline:**
- A7 is the pre-registration-recovery-specific page. It does NOT cover OTT election (defer to A1), CGS (defer to A2), conversion reliefs (defer to A6), or registration test (defer to existing).

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `pre-registration`, `developer`, `reclaim`, `input-tax`, `recovery`, `4-year`, `6-month`, `reg-111` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. Pre-registration recovery is reg-led + Notice-led + VAT-Manual-led.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 s.24 (input tax meaning + recovery framework)](https://www.legislation.gov.uk/ukpga/1994/23/section/24)
- [VAT Regulations 1995 SI 1995/2518](https://www.legislation.gov.uk/uksi/1995/2518/contents)
- [VAT Regulations 1995 reg 111 (pre-registration input tax)](https://www.legislation.gov.uk/uksi/1995/2518/regulation/111)
- [HMRC VAT Notice 700 chapter 11 (input tax recoverable)](https://www.gov.uk/government/publications/vat-notice-700-the-vat-guide)
- [HMRC VAT Manual VIT32000+ (Input Tax — pre-registration)](https://www.gov.uk/hmrc-internal-manuals/vat-input-tax)
- [HMRC VAT Manual VATLAND chapter](https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property)
- [HMRC VAT Notice 708 (Buildings and construction — cross-reference)](https://www.gov.uk/government/publications/vat-notice-708-buildings-and-construction)
- [HMRC VAT Notice 742A (OTT cross-reference)](https://www.gov.uk/government/publications/vat-notice-742a-opting-to-tax-land-and-buildings)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (4-year goods window, 6-month services window, VAT registration threshold £90k, any rate cited, the £250k CGS threshold if mentioned) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific. Exact regulations and notices.
- Anonymised personas only.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the windows-and-still-on-hand-test section, after a worked developer recovery example, after the OTT-and-downstream-recovery section.
- Vary opening sentence. A7 should open from the perspective of "the moment before registration is the highest-VAT-incurrence moment for a developer, and the rules that govern what can be recovered after registration are highly specific".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 10-12 FAQs.

### Cannibalisation
- Read closest-existing pages before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section.

### Anti-templating
- A7's natural H2 spine differs from siblings: (1) the pre-registration moment, (2) reg 111 framework (goods within 4 years still on hand + services within 6 months), (3) the still-on-hand test for goods, (4) services apportionment for the 6-month window, (5) documentation discipline (invoices, receipts, evidence chain), (6) taxable / exempt / private-use apportionment, (7) worked developer example (planning + survey + deposits), (8) downstream OTT election + CGS interaction, (9) common rejected claims.
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,500-3,200 body (operational mechanic; mid-band).
- FAQs: 10-12.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory.
4. **Fetch each competitor URL.** towerstone tentative; replace if dead.
5. **Read the closest existing pages.**
6. **Plan the rewrite/write.**
7. **Verify factual claims.** §16.35 per-write.
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
