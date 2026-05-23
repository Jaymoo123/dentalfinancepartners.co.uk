# Wave 5 brief: vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics

**Site:** property
**Bucket:** A (VAT topical-gap deepening)
**Session:** A
**Brief type:** Net-new page (no existing markdown file)
**Source markdown path on launch:** `Property/web/content/blog/vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `vat-cladding-remediation-relief-residential-building-safety-act-section-30a-mechanics`
- **Suggested category:** `property-types-and-specialist-tax`
- **Bucket:** A (VAT topical-gap deepening)
- **Framing differentiator (Stage 2 deepened, 2026-05-23):**

> Cladding remediation costs post-Grenfell sit at a unique intersection of **VAT, leaseholder protection statute, and the Building Safety Act 2022 regime**. The VAT angle is highly specific: HMRC has confirmed a **zero-rating treatment for qualifying remediation works on residential buildings ≥ 11 metres** where the remediation is to remove or replace combustible cladding, with the work supplied to the freeholder / management company / leaseholder protected party as part of a wider remediation programme. Zero on-site coverage despite very high topical relevance (Building Safety Act 2022 enforcement ongoing through 2026 and 2027). This page is the canonical depth on the **cladding-remediation VAT relief mechanic**: the qualifying-works test, the 11-metre threshold, the interaction with the **Building Safety Levy** and the **Responsible Actors Scheme**, the recharge-to-leaseholders mechanic (Building Safety Act 2022 + LRA 1985 service charge interaction), and the documentation discipline for relief claims. **Distinct from A6 (conversion)** by being a defined remediation relief on existing residential stock rather than a change-of-use conversion. **Distinct from existing `vat-on-new-builds-residential-property`** by applying to remediation, not new construction.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Note:** The framing differentiator references "section 30A" in the slug as a working title shorthand. Session must verify the precise statutory citation route (likely VATA 1994 Sch 8 Group 5 supplemented by HMRC guidance + Building Safety Act 2022 references, not a literal section 30A of any one Act). Session may revise the slug if appropriate; log override in work-log.

**Stage 1 manager note:** Highly topical post-Grenfell. Underserved competitor coverage. High-intent freeholder + management-company cohort.

---

## Competitor URLs (Stage 2 §16.31 verified 2026-05-23)

- https://www.geraldedelman.com/insights/vat-and-the-cladding-crisis-a-missed-opportunity-for-relief/ — STAGE 1 SEED. WebFetch returned permission-denied during Stage 2 verification 2026-05-23; treat as **TENTATIVE** and session must re-verify with httpx at write time. If dead, search saffery.com or rsmuk.com or pkfsmithcooper.com for cladding-VAT analysis (firm-commentary sources).
- https://www.ukpropertyaccountants.co.uk/vat-and-property-dispelling-myths-and-avoiding-common-mistakes/ — VERIFIED ALIVE 2026-05-23. Use for the cladding-VAT myths section.
- https://www.taxaccountant.co.uk/vat-on-construction-industry-an-overview/ — VERIFIED ALIVE 2026-05-23. Use for the construction-VAT context (Notice 708 reduced-rate references, reverse-charge interaction).

**Stage 2 verification note:** geraldedelman tentative (permission-denied during Stage 2 fetch). Two URLs confirmed alive. Cladding-VAT is a topical-gap area with relatively thin competitor coverage; the session should also rely heavily on **direct HMRC guidance** (Notice 708 cladding chapter, Brief publications post-2022) rather than competitor outline.

**Fetch + read + extract instruction (session):** Fetch each URL via `httpx.get(url, timeout=30, follow_redirects=True, headers={"User-Agent": "Mozilla/5.0"})` then parse with BeautifulSoup (lxml). Extract: how each competitor frames the cladding-VAT angle, the qualifying-works definition, recharge-to-leaseholders mechanics. Cross-check every claim against HMRC guidance on cladding remediation (most authoritative) + Building Safety Act 2022.

---

## GSC data

*This is a net-new page; no GSC data exists for it yet. The primary topical query is implicit in the slug + framing differentiator (cladding remediation VAT, Building Safety Act VAT, leaseholder cladding charges VAT).*

---

## Closest existing pages (cannibalisation context)

Stage 1 + Stage 2 reasoned identification (not Jaccard):

1. `vat-on-new-builds-residential-property` (category: `property-types-and-specialist-tax`) — adjacent. New-build is zero-rated; remediation has its own relief route. Cross-link.

2. **A6 (forthcoming sibling)** — adjacent. Conversion reliefs are change-of-use; remediation is restoration-to-safe-residential-use. Cross-link.

3. **A1 (forthcoming sibling)** — distant. OTT does not apply to dwellings under Sch 10 para 5. Cross-link only briefly.

4. `domestic-reverse-charge-construction-vat-landlords` (category: `property-types-and-specialist-tax`) — adjacent. Construction services for cladding remediation may be reverse-charged. Cross-link.

5. No on-site coverage of Building Safety Act 2022, cladding remediation, leaseholder protection, or recharge mechanics specifically. Topical gap confirmed.

**Cannibalisation discipline:**
- A9 is the cladding-remediation-specific page. Stays narrow to the VAT angle + Building Safety Act interaction + recharge mechanics.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts` for the tokens `cladding`, `remediation`, `building-safety`, `leaseholder`, `grenfell`, `responsible-actors` returned no old-slug redirects that map onto this new slug-token set. Stage 2 + session may re-scan to confirm before launch.

---

## Authority links worth considering for this page (Stage 2 populated 2026-05-23)

Pick 5-8 to actually cite. Cladding-VAT is statute-led + Notice-led + Building-Safety-Act-2022-led.

- [VATA 1994 (Value Added Tax Act 1994), full contents](https://www.legislation.gov.uk/ukpga/1994/23/contents)
- [VATA 1994 Sch 8 Group 5 (zero-rated construction of dwellings)](https://www.legislation.gov.uk/ukpga/1994/23/schedule/8)
- [Finance Act 2022 (the FA 2022 changes around residential building safety)](https://www.legislation.gov.uk/ukpga/2022/3/contents)
- [Building Safety Act 2022](https://www.legislation.gov.uk/ukpga/2022/30/contents)
- [Building Safety Act 2022 Sch 8 (leaseholder protection from cladding remediation costs)](https://www.legislation.gov.uk/ukpga/2022/30/schedule/8)
- [HMRC VAT Notice 708 (Buildings and construction — cladding remediation chapter)](https://www.gov.uk/government/publications/vat-notice-708-buildings-and-construction)
- [HMRC VAT Manual VATLAND chapter](https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property)
- [HMRC VCONST chapter (Construction Manual)](https://www.gov.uk/hmrc-internal-manuals/vat-construction)
- [Landlord and Tenant Act 1985 s.19 + s.20 (service charge reasonableness)](https://www.legislation.gov.uk/ukpga/1985/70/contents)
- [Building Safety Levy guidance (gov.uk)](https://www.gov.uk/government/consultations/the-building-safety-levy)

---

## Universal rules (do not skip)

### §16.35 per-write numeric verification
Verify every numeric tax figure (11-metre height threshold for qualifying remediation, VAT rates, registration threshold, any Building Safety Levy figure cited) against current gov.uk at write time per §16.35. Do NOT carry figures from the brief without re-verification. Particular care: HMRC guidance on cladding-VAT relief is relatively recent and has evolved; verify the most-recent published HMRC position.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical, specific.
- Anonymised personas only. No specific tower-block names, no specific Tribunal cases naming live blocks.

### Lead-gen architecture (global CSS, you write the placement, not the styling)
- `Property/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- `<aside><p>headline</p><p>body</p></aside>` styled by global CSS.

### CTA placement guidance (per this page)
- Add 1-3 inline `<aside>` CTAs: after the qualifying-works test section, after a worked freeholder remediation example, after the recharge-to-leaseholders section.
- Vary opening sentence. A9 should open from the perspective of "a £2m+ cladding remediation programme on a residential block — VAT relief turns on highly specific qualifying-works tests".

### Schema
- FAQs live in frontmatter `faqs:` array. Target 10-12 FAQs.

### Cannibalisation
- Read closest-existing pages before writing.

### CSS in markdown
- Semantic HTML only. No Tailwind utility classes.

### House positions
- Bucket A has no dedicated house position section. Cross-check with house position §20 (Renters' Rights Act 2025) only where leaseholder-protection-vs-tenant-protection distinctions might be conflated; cladding-remediation falls under Building Safety Act 2022, not RRA 2025.

### Anti-templating
- A9's natural H2 spine: (1) the cladding-remediation context (post-Grenfell + BSA 2022), (2) the VAT-relief route (HMRC guidance + Sch 8 Group 5 alignment), (3) the 11-metre height threshold + qualifying-buildings test, (4) qualifying remediation works (cladding removal + replacement + associated fire-safety work), (5) recharge-to-leaseholders mechanic (BSA 2022 Sch 8 + LTA 1985 service charge), (6) interaction with Building Safety Levy + Responsible Actors Scheme, (7) worked freeholder funding example, (8) documentation discipline + relief-claim mechanics, (9) ineligible / non-qualifying remediation works.
- Vary FAQ phrasing.

### Quality bar
- Word count: 2,500-3,200 body (specialist topical depth).
- FAQs: 10-12.
- New external authority links: 5-8.

---

## Workflow (per page; claim ONE page at a time)

1. **Read `docs/property/house_positions.md`** once at the start.
2. **Claim the page** in `docs/property/wave5_page_tracker.md`.
3. **Read the brief** (this file). §16.35 mandatory. Particular care: cladding-VAT relief mechanics are evolving — verify against latest HMRC guidance at write time.
4. **Fetch each competitor URL.** geraldedelman tentative; replace if dead. Session relies heavily on direct HMRC sources.
5. **Read the closest existing pages.**
6. **Plan the rewrite/write.**
7. **Verify factual claims.** §16.35 per-write.
8. **Fetch a hero image from Pexels** via fetch_image_for_post. Avoid imagery of specific Grenfell-era blocks; use generic residential building imagery.
9. **Write the markdown file** at `Property/web/content/blog/<slug>.md`.
10. **Build:** `cd Property/web && npm run build`.
11. **Verify (six checks).**
12. **Redirect overlap:** none listed.
13. **Register in `monitored_pages`.**
14. **Commit on your branch.** Commit BEFORE marking done.
15. **Fill in work-log.**
16. **Mark done.**
17. **Flag** (any HOUSE_POSITION_CONFLICT signals on Building Safety Act 2022 interpretation).
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
