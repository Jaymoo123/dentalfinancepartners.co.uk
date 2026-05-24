# Wave 8 brief: vat-registration-threshold-90k-landlords-april-2024-group-registration

**Site:** property
**Bucket:** C (VAT operational depth — registration thresholds + group registration)
**Session:** C
**Pick ID:** C9
**Brief type:** Net-new page (standalone but cross-referenced from C1 / C5 / C10)
**Source markdown path on launch:** `Property/web/content/blog/vat-registration-threshold-90k-landlords-april-2024-group-registration.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/vat-registration-threshold-90k-landlords-april-2024-group-registration

---

## Manager pre-decisions

- **Suggested slug:** `vat-registration-threshold-90k-landlords-april-2024-group-registration`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — thresholds + group registration)
- **Framing differentiator (Stage 2, 2026-05-25):**

> VAT registration thresholds for landlords — operational depth on what counts towards taxable supplies, when registration triggers, and when group registration helps. Page walks: (a) **The registration threshold** — **£90,000** from 1 April 2024 (up from £85,000), substituted into VATA 1994 Schedule 1 paragraph 1(1)(a) by The Value Added Tax (Increase of Registration Limits) Order 2024 (**SI 2024/307**) — verified 2026-05-25. Threshold values are rate-by-reference per §16.27 + §29.8 — sessions must verify against gov.uk at write time before publish. The verbatim Schedule 1 para 1(1)(a) wording: "at the end of any month, if the person is UK-established and the value of his taxable supplies in the period of one year then ending has exceeded £90,000"; (b) **The two triggers** — (i) **historic test (Sch 1 para 1(1)(a))** — taxable supplies in the period of one year then ending exceed the threshold (rolling 12-month look-back); (ii) **forward-look test (Sch 1 para 1(1)(b))** — reasonable grounds to believe taxable supplies in the next 30 days alone will exceed the threshold (immediate registration required). Most landlords trigger via the rolling historic test; one-off transactions (large opted-property sale) can trigger via the forward-look 30-day test; (c) **The deregistration threshold** — **£88,000** from 1 April 2024 (up from £83,000). Per Sch 1 para 4. Deregistration available where taxable supplies in the next year are expected to fall below the threshold AND there is a reasonable basis for the expectation; (d) **What counts towards "taxable supplies"** for landlords — (i) commercial property rents where opted to tax under Sch 10 (see C1); (ii) self-storage receipts (standard-rated by default — see C8); (iii) reduced-rate (5%) conversion services receipts (see C6); (iv) zero-rated first-major-interest sales of newly converted dwellings (still taxable, just at 0%); (v) holiday accommodation grants under Sch 9 Gr 1 para (e) (FHL-type). DOES NOT count: (i) exempt residential lets (Sch 9 Gr 1); (ii) supplies outside the scope (e.g. inter-company management charges if structured correctly); (e) **The portfolio-trigger arithmetic** — a landlord with £80k unopted commercial rents (exempt) + £20k self-storage rents (standard-rated) does NOT exceed the £90k threshold (only £20k counts). The same landlord with £80k opted commercial rents (standard-rated) + £20k self-storage = £100k exceeds threshold, registration required. Opting commercial property therefore triggers VAT registration where unopted portfolio was below threshold; (f) **Group registration under VATA 1994 ss.43-43D** — multiple corporate entities under common control may register as a single VAT group. Effect: intra-group supplies disregarded; single VAT return; single VAT registration number; joint and several liability for VAT debts across group members. Eligibility: (i) common control test — typically 51%+ corporate parent or controlling individual; (ii) UK-established or with UK fixed establishment; (iii) HMRC discretion to refuse where group creates avoidance risk; (g) **The group-registration use case for property portfolios** — typical multi-SPV property fund with HoldCo + 10 PropertyCos. Group registration eliminates VAT on intra-group property management charges; simplifies recovery; consolidates partial-exemption calculation across the group. Downsides: joint liability; loss of pre-registration input-tax recovery window for new SPV entrants; partial-exemption de minimis calculated at group not entity level; (h) **The application mechanics** — VAT 50 form for group registration application; VAT 51 form for each member; HMRC decision within typically 3-8 weeks; group effective date prospective from approval. The contrast with disaggregation anti-avoidance under Sch 1 para 1A: HMRC can DIRECT separate registration treatment for artificially-fragmented businesses, going the opposite direction to voluntary group registration. Cross-references C1 (opting commercial triggers threshold), C5 (group affects partial-exemption calculation), C6 (conversion services receipts count), C8 (self-storage receipts count), C10 (input-tax recovery framework underpins the registration economics).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C9 is standalone but cross-referenced from C1 / C5 / C10 (and C6 / C8 for receipt categorisation). The §16.27 + §16.45 drift catches: (1) hard-coded "£85k threshold" is FALSE from 1 April 2024 (now £90k per SI 2024/307); (2) deregistration is £88k not £83k; (3) historic test is rolling 12-month (Sch 1 para 1(1)(a)), forward-look is 30-day (Sch 1 para 1(1)(b)); (4) group registration requires common-control test (not all multi-SPV portfolios qualify); (5) opted-commercial vs exempt-residential receipts must be distinguished in threshold calc.

**Pool-thinness disclosure:** Competitor coverage explains the £90k headline but typically skips the rolling-12-month vs 30-day-forward-look distinction, the landlord-receipt categorisation drilldown (what counts and what does not), and the group-registration use case for multi-SPV portfolios. The threshold-trigger arithmetic plus group-registration mechanics plus disaggregation-direction risk overlay is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: threshold value (verify £90k current; FLAG any £85k competitor pages as stale); rolling-historic vs forward-look distinction; group-registration coverage (commonly thin); landlord-receipt categorisation for threshold calc (commonly omitted).

- https://www.saffery.com/insights/articles/vat-registration-threshold-landlords/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/vat-registration-property
- https://www.rsmuk.com/insights/tax-insights/vat-registration-90k
- https://www.crowe.com/uk/insights/vat-group-registration-property
- https://www.evelyn.com/insights-and-events/insights/vat-registration-landlords/

**Borrowable patterns:** competitor threshold-calc worked-example tables; group-registration application checklist patterns.

---

## GSC data

*Net-new page; primary topical queries expected: "VAT registration threshold 90k", "VAT registration landlord", "group VAT registration property", "Sch 1 VAT registration", "VAT 50 group registration", "rolling 12 month VAT threshold".*

---

## Closest existing pages (cannibalisation context)

- `making-tax-digital-landlords-april-2026-deadline` (compliance adjacent)
- `vat-developer-pre-registration-input-tax-recovery-property-development-projects` (pre-registration input-tax companion)
- `end-tax-year-checklist-landlords-april-2026` (operational adjacent)
- C1 pillar `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (cross-link — opting triggers threshold)
- C5 `vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics` (group registration affects partial exemption)

**Cannibalisation discipline:**
- C9 is the dedicated landlord VAT registration threshold + group registration page. No existing dedicated page; clean addition.
- Cross-link Wave 5 pre-registration input tax page for the recovery-window companion.

---

## Redirect overlap (on launch)

No existing slug matches C9's threshold + group-registration scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- VATA 1994 Schedule 1 (registration — full text): https://www.legislation.gov.uk/ukpga/1994/23/schedule/1
- VATA 1994 ss.43-43D (group registration framework): https://www.legislation.gov.uk/ukpga/1994/23/section/43
- SI 2024/307 (Increase of Registration Limits Order 2024 — substituting £90k / £88k from 1 April 2024): https://www.legislation.gov.uk/uksi/2024/307
- VATA 1994 Sch 1 para 1A (disaggregation anti-avoidance — HMRC direction to register separately): https://www.legislation.gov.uk/ukpga/1994/23/schedule/1

**HMRC guidance + forms:**
- gov.uk VAT registration entry page: https://www.gov.uk/vat-registration
- HMRC VAT Notice 700/1 (Should I be registered for VAT?): https://www.gov.uk/government/publications/vat-notice-700-1-should-i-be-registered-for-vat
- HMRC VAT Notice 700/2 (Group and divisional registration): https://www.gov.uk/government/publications/vat-notice-7002-group-and-divisional-registration
- VAT 50 form (Application for VAT group registration): https://www.gov.uk/government/publications/vat-application-for-vat-group-treatment
- VAT 51 form (Details of each company in the VAT group): https://www.gov.uk/government/publications/vat-application-for-vat-group-treatment-company-details

**Cross-references in house_positions.md:** §29 (Wave 8 VAT cluster — primary anchor); §29.8 (VAT registration thresholds — rate-by-reference per §16.27); §16.27 (rate-by-reference discipline — same pattern as s.455 / s.8(2)); §16.45 drift discipline (£90k current from 1 April 2024).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 1 para 1(1)(a) verbatim "£90,000" wording against legislation.gov.uk; verify SI 2024/307 substituting cite is the operative amendment; verify £88k deregistration threshold per Sch 1 para 4; verify ss.43-43D group registration framework currency; verify VAT 50 + VAT 51 forms are current; per §16.27 rate-by-reference, sessions must check gov.uk threshold page on day of publish (further uplifts at any future Budget would invalidate hard-coded £90k).

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section + Schedule references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Landlord approaching threshold + Multi-SPV property fund operator.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the threshold-trigger arithmetic section (highest intent: landlord checking whether they should register)
  - After the group-registration use case section (intent: property fund operator considering group election)
  - Optionally after the disaggregation anti-avoidance section
- Vary opening; do NOT lead with "The VAT registration threshold is £90,000...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on "what is the current threshold" (£90k from 1 April 2024 — verify), "do residential rents count" (no — exempt under Sch 9 Gr 1, do not count), and "should I voluntarily register if below threshold" (depends on input-tax recovery upside — typically yes for property developer pre-build, no for residential-only landlord).

### Cannibalisation
- Cross-link C1 pillar for the option-to-tax trigger interaction.
- Cross-link C5 for the group-registration partial-exemption interaction.
- Cross-link Wave 5 pre-registration input-tax page.

### House positions
- §29 primary; §29.8 verbatim.
- §29.11 do-not-write list — "Standard registration threshold is £85k" forbidden; "Group registration is available to all related entities" forbidden.
- §16.27 — rate-by-reference discipline mandatory.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the threshold-trigger arithmetic + landlord-receipt categorisation + group-registration use case + disaggregation overlay. Write to it.
- Vary H2s — no existing dedicated page.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.8 mandatory; §16.27 rate-by-reference discipline; §16.45 drift discipline (£90k not £85k from 1 April 2024). Per §16.35: re-verify Sch 1 para 1 + para 4 threshold values, SI 2024/307 cite, VAT 50 + VAT 51 form currency, ss.43-43D group registration framework on day of publish.

## Session-side watcher pattern

Standard.

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

### Flags raised to wave8_site_wide_flags.md
- 

### 2-3 sentence summary
