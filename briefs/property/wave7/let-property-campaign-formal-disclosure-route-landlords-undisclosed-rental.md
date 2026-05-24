# Wave 7 brief: let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental

**Site:** property
**Bucket:** B (HMRC enquiry + tax compliance ops)
**Pick:** B6 — Let Property Campaign formal disclosure route
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental

---

## Frontmatter header

- **Slug:** `let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental`
- **Bucket:** B
- **Section ID:** §27.6 + §27.3 (LPC operates within Sch 41 framework)
- **Framing differentiator (~50 words):** Three-step LPC process: (i) notify intent via gov.uk landlord disclosure form (NO penalty consequence at notification — per §27.9); (ii) disclose within 90 days of HMRC acknowledgment with tax + interest + penalty calculation; (iii) pay in full. Eligibility limited to **residential rental income** (commercial / mixed-use uses general DDS route per §27.9). Penalty bands within Sch 41 + Sch 24 with unprompted-disclosure floors (0% careless within 12 months). NOT for serious-fraud cases (use CoP9 / B3).
- **Locked HP anchors:**
  - §27.6 (LPC + WDF + DDS architecture)
  - §27.3 (Sch 41 failure-to-notify framework LPC operates within)
  - §27.9 (do-not-write list — "LPC notification triggers immediate penalty" + "LPC is open to commercial-property landlords" both forbidden)
- **monitored_pages stub:** Register at launch; primary monitored queries include "Let Property Campaign", "LPC landlord disclosure", "HMRC voluntary disclosure rental", "LPC penalty rate landlord", "LPC 90 day disclosure".

---

## Manager pre-decisions

- **Suggested slug:** `let-property-campaign-formal-disclosure-route-landlords-undisclosed-rental`
- **Suggested category:** `landlord-tax-essentials`
- **Bucket:** B
- **Framing differentiator (Stage 2, 2026-05-24):**

> LPC is the working voluntary-disclosure route for residential landlords with undisclosed rental income. Campaign open since 9 September 2013, no announced end-date (verify still active at write time). The page is the step-by-step operational reference. Three readers in scope: (i) landlord realising for first time that historic rental income (lodger, sublet, family rental, accidental landlord during career move) should have been declared; (ii) landlord with nudge letter (B5) considering LPC as response option 2; (iii) landlord with informal-letting history coming forward voluntarily before HMRC contact. The page walks the three-step process with worked figures: (1) **NOTIFY** — submit landlord disclosure form on gov.uk; NO penalty consequence at this stage (the §27.9 "notification triggers immediate penalty exposure" item is wrong); HMRC acknowledges and provides Disclosure Reference Number; (2) **DISCLOSE** — within 90 days of HMRC acknowledgment, calculate: (a) tax — five years' undeclared rental net profit re-computed; (b) interest — repayment interest on each year's underpaid tax from due date to disclosure date (rate per HMRC tables); (c) penalty — band depends on behaviour and disclosure prompted/unprompted; (3) **PAY** — full liability paid on disclosure (or HMRC time-to-pay arrangement requested). **Eligibility limited to residential rental income** — commercial property uses general voluntary-disclosure via the **Digital Disclosure Service (DDS)** per §27.6; FHL is residential per HMRC operational treatment but post-2025 FHL abolition the cohort is fully residential. **Penalty bands** per Sch 41 / Sch 24 — unprompted careless within 12 months → 0% floor; unprompted careless beyond 12 months → 10%; prompted careless → 15%; deliberate-not-concealed → 20%/35% floors; deliberate-concealed → 30%/50% floors (cross-ref B8). **LPC is NOT appropriate where HMRC has criminal-prosecution interest** — switch to CoP9 / CDF (B3) for deliberate-fraud cases. Two worked scenarios: (i) landlord with 4 years of inherited-flat rental income (£8k/yr net), unprompted within 12 months of first liability arising → 0% penalty; (ii) landlord with 7 years of family-rental (£15k/yr net), prompted via nudge letter → 15% careless prompted; total liability tax £36k + interest £4k + penalty £5.4k = £45.4k.

**Stage 1 manager note:** **B8 → B6 forward-link** (Sch 41 + Sch 24 penalty bands at B8 are referenced by B6). B6 must ship after B8.

**Pool-thinness disclosure:** LPC well-covered by landlord-specialist firms (mid-market focus area). Brief generator pulls from gov.uk LPC landing + Sch 41 verbatim + Sch 24 mitigation matrix + §27.6 + §27.3 + §27.9. The do-not-write list catches the two most common competitor errors: (a) notification triggers penalty (false); (b) LPC for commercial landlords (false).

---

## Competitor URLs (Stage 2 populated; sessions verify liveness per §16.31 at write time)

**Fetch + read + extract instruction:** Standard httpx + BS4. Extract treatment of (a) three-step process clarity; (b) penalty-band matrix completeness; (c) residential-only eligibility framing (most omit the commercial-property exclusion); (d) interest-rate methodology.

- https://www.ukpropertyaccountants.co.uk/let-property-campaign-landlord-disclosure/ — mid-market specialist.
- https://www.uklandlordtax.co.uk/let-property-campaign-step-by-step/ — landlord-flavoured.
- https://www.landlordstax.co.uk/lpc-landlord-disclosure-route/ — landlord-specialist.

**Borrowable patterns:** Most landlord-specialist firms walk the three steps reasonably; few cover the eligibility carve-out (commercial → DDS) or the prompted-vs-unprompted distinction with worked penalty calculations.

---

## GSC data

*Net-new page. Primary topical queries expected: "Let Property Campaign landlord", "LPC disclosure form HMRC", "voluntary disclosure rental income", "LPC penalty rate", "LPC 90 day window", "undeclared rental income disclosure".*

---

## Closest existing pages (cannibalisation context)

- `rental-yield-calculator-guide-uk-landlords` (0.25 — **false-positive** — token overlap)
- `birmingham-property-accountant` (0.20 — local; false-positive)
- `cgt-selling-buy-to-let-property-calculation-guide` (0.20 — adjacent CGT)

**Cannibalisation discipline:**
- No on-site duplication; B6 is the canonical LPC page.
- B5 (nudge letter) references LPC as response option 2; B6 is the deep-dive.
- B8 owns the Sch 24 / Sch 41 penalty matrix; B6 references for the mitigation-floor mechanic.
- B3 (CoP9) is for serious-fraud cases; B6 explicitly excludes those and signposts B3.

---

## Redirect overlap (on launch)

Stage 1 scan of `Property/web/src/middleware.ts`: no existing redirects for "let-property-campaign" or "lpc" slugs. No middleware edit on initial launch. Possible legacy stale page on LPC at older slug — verify at write time and flag for manager merge if found.

---

## Authority links worth considering (Stage 2 populated; session selects 6-8)

**HMRC publications:**
- Let Property Campaign landing: https://www.gov.uk/guidance/let-property-campaign
- LPC disclosure form: https://www.gov.uk/let-property-campaign-tell-hmrc-about-undeclared-rental-income
- HMRC interest rates: https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments

**Statutory:**
- Sch 41 FA 2008 (failure-to-notify framework — LPC operates within): https://www.legislation.gov.uk/ukpga/2008/9/schedule/41
- Sch 24 FA 2007 (inaccuracy framework for amendments under LPC): https://www.legislation.gov.uk/ukpga/2007/11/schedule/24
- TMA 1970 s.7 (notification of chargeability — Sch 41 trigger): https://www.legislation.gov.uk/ukpga/1970/9/section/7
- TMA 1970 s.34 / s.36 / s.36A (discovery time limits — for the historic-years lookback): cross-ref B1

**HMRC manuals:**
- CH150000+ (Compliance Handbook on disclosure mitigation): https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch150000
- CH72000+ (failure-to-notify): https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch72000

**Cross-references in house_positions.md:** §27.6 (primary anchor — LPC + WDF + DDS architecture); §27.3 (Sch 41 framework); §27.9 (do-not-write list).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** (i) Verify LPC campaign still active at write time (open since 9 September 2013; no announced end-date — confirm); (ii) verify 90-day disclosure window from HMRC acknowledgment (HMRC has occasionally varied this in operational practice); (iii) verify residential-only eligibility (commercial uses DDS); (iv) confirm penalty-floor calculations against Sch 24 paras 9-10 + Sch 41 para 13 verbatim; (v) verify current HMRC repayment-interest rate for worked examples.

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Reader-facing — first-time disclosers.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer.
- `<aside>` styled by global CSS.
- Lead-form role segments: Individual landlord / Portfolio owner / Large portfolio / Property developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the three-step process walk (high-intent: reader has just identified LPC fits their facts)
  - After the residential-only eligibility carve-out (commercial readers signposted to DDS)
  - Optionally after the prompted-vs-unprompted floor mechanic
- Vary opening; do NOT lead with "The Let Property Campaign is HMRC's...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12.

### Cannibalisation
- B5 (nudge letter) and B7 (WDF) sibling pages; B6 is the residential-UK voluntary-disclosure deep-dive.
- B8 owns the Sch 24/41 penalty matrix; reference but do not re-cover.

### House positions
- §27.6 is the primary anchor.
- §27.3 secondary (Sch 41 framework).
- §27.9 do-not-write list: "notification triggers immediate penalty" forbidden; "open to commercial-property landlords" forbidden.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Framing differentiator is the three-step process + penalty-floor depth + commercial-carve-out. Write to it.
- Vary opening.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

1. Read `house_positions.md` once. §27.6 primary; §27.3 + §27.9 adjacent.
2. Claim in `wave7_page_tracker.md`, todo → in_progress + UTC.
3. Read brief.
4. Fetch competitor URLs (httpx + BS4).
5. Read closest existing pages.
6. Plan write.
7. Verify factual claims; **per §16.35: re-verify LPC active status; verify 90-day window; verify residential-only eligibility; verify penalty floors verbatim; verify current HMRC repayment-interest rate**.
8. Fetch Pexels hero image.
9. Write markdown at `Property/web/content/blog/<slug>.md` with full frontmatter.
10. Build: `cd Property/web && npm run build`.
11. Verify six checks.
12. No middleware edit on initial launch (flag any stale LPC page for redirect at hygiene).
13. Register in `monitored_pages`.
14. Commit on branch (BEFORE marking done; do NOT include tracker file).
15. Fill work-log below.
16. Mark done in tracker with 1-line Notes.
17. Append flags.
18. Log discoveries.
19. Next page.

## Session-side watcher pattern

Spawn Monitor on Q&A file; keep working while waiting.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:**
- **Final category:**
- **H1 chosen:**
- **Meta title chosen:**
- **Why these vs other options:**

### Competitor URLs fetched
- 

### Existing-page review
- 

### Citations added
- 

### Internal links added
- 

### Inline CTA placements
- 

### Build attempts
- 

### Verification
- em-dash count:
- Tailwind utility classes:
- metaTitle length:
- metaDescription length:
- FAQ count:
- Internal links resolve:
- Body word count:

### Flags raised to wave7_site_wide_flags.md
- 

### 2-3 sentence summary
