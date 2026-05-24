# Wave 8 brief: option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock

**Site:** property
**Bucket:** C (VAT operational depth — option-to-tax cluster pillar)
**Session:** C
**Pick ID:** C1
**Brief type:** Net-new page (PILLAR for option-to-tax cluster — write FIRST in bucket; C2 + C7 reference)
**Source markdown path on launch:** `Property/web/content/blog/option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock

---

## Manager pre-decisions

- **Suggested slug:** `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — option-to-tax pillar)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Schedule 10 VATA 1994 option-to-tax pillar — the framework page that anchors the whole option cluster (C1 pillar; C2 revocation; C3 TOGC option-matching; C7 disapplication). Walks: (a) **What the election does** — converts the default-exempt grant of any interest in or right over land (Sch 9 Group 1 Item 1) into a STANDARD-RATED supply, unlocking input-tax recovery on related capital + professional costs under VATA 1994 s.24 + s.26; (b) **The 20-year lock** at Sch 10 para 25 (verbatim heading "Revocation of option: lapse of more than 20 years since option had effect" — verified 2026-05-25) — once made, the option binds the opter for 20 years before any general revocation route opens (subject to the cooling-off and six-year-no-interest exits at paras 23 and 24); (c) **The election mechanics under Sch 10 para 2** (verbatim heading "Effect of the option to tax: exempt supplies become taxable") — notification to HMRC on form VAT 1614A within 30 days of effective date; HMRC acknowledges; option in force from effective date; (d) **The scope rule** — option binds the OPTER + REAL ESTATE INTEREST combination (per-property by default; real-estate election under Sch 10 para 21 via VAT 1614E binds all current and future interests of the opter); (e) **The prior-permission anti-avoidance trap at Sch 10 paras 28-30** — where the opter has made pre-option exempt grants of the same building within 10 years, HMRC permission required first (VAT 1614B); (f) **The decision framework** — input-tax recovery upside (recoverable 20% VAT on acquisition / construction / refurbishment / professional fees) versus tenant-impact cost (commercial tenant in partial-exemption position cannot fully recover the rent VAT; rents effectively rise by part of the VAT add; SDLT on opted lease premiums computed on VAT-inclusive consideration per FA 2003 s.51); (g) **The disapplication boundary** — the option is automatically disapplied for grants of buildings designed or adapted as dwellings (Sch 10 para 5), or where the recipient certifies residential / charitable use (Sch 10 para 6 via VAT 1614D), or under the developers-of-exempt-land anti-avoidance at Sch 10 para 12 (see C7 — distinct from the dwelling disapplications); (h) **The CGS interaction** — opted capital items ≥£250k attract Capital Goods Scheme adjustments over 10 intervals per SI 1995/2518 regs 112-116 (see §29.5); revoking later can trigger clawback. NOT writing the operational mechanics + revocation routes in body (those are C2's depth — cross-link); NOT writing TOGC option-matching (C3); NOT writing disapplication paragraph-walk (C7).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C1 is the option-to-tax cluster pillar. C2 (revocation), C3 (TOGC option-matching), C7 (disapplification para 5/6/12), C10 (input-tax recovery flow) all reference C1 forward-link. Write C1 first in the bucket and use it as the framework anchor. The #1 §16.45 drift catch is the "VATA 1994 s.51 option" misframe — option is in Sch 10, NOT s.51. The #2 drift catch is the "10-year lock" misframe — lock is 20 years per Sch 10 para 25.

**Pool-thinness disclosure:** Competitor coverage is fluent on the mechanics headline ("opt to tax to recover input VAT, 20-year lock") but typically thin on the prior-permission requirements at paras 28-30, the real-estate-election alternative at para 21, and the SDLT-on-VAT-inclusive-consideration interaction. The pillar-level framework plus the para-by-para Sch 10 walk-through plus the CGS interaction is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: 20-year lock (most competitors say 20 years correctly); 6-month cooling-off period (some get this wrong as 3 months); prior-permission requirement (commonly omitted); real-estate election (commonly omitted); form numbers (often outdated — verify against current gov.uk form pages). Flag any "s.51" misframes for the drift-catch list.

- https://www.saffery.com/insights/articles/option-to-tax-commercial-property/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/option-to-tax-property
- https://www.rsmuk.com/insights/tax-insights/option-to-tax-vat
- https://www.crowe.com/uk/insights/option-to-tax-property
- https://www.evelyn.com/insights-and-events/insights/option-to-tax-commercial/

**Borrowable patterns:** competitor "decision-to-opt" framing tables (input-tax recovery upside vs tenant-impact cost); HMRC form summary tables (verify form numbers against current gov.uk pages).

---

## GSC data

*Net-new page; primary topical queries expected: "option to tax commercial property", "VAT Schedule 10 option to tax", "20 year option to tax revocation", "VAT 1614A form", "option to tax mechanics landlord", "opt to tax commercial property pros and cons".*

---

## Closest existing pages (cannibalisation context)

- `vat-option-to-tax-commercial-property-mechanics-election-revocation` (cannibal score ~0.42 — Wave 5 operational mechanics page; this Wave 8 pillar covers the FRAMEWORK + 20-year lock at depth complementing the existing mechanics page; **cross-link explicitly as the operational-mechanics companion**)
- `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` (CGS interaction — back-link)
- `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method` (partial exemption interaction — back-link)
- `togc-vat-property-letting-business` (TOGC option-matching — forward-link to C3 when live)

**Cannibalisation discipline:**
- Existing Wave 5 page is the operational-steps page (election form, deadlines, revocation procedure). This Wave 8 pillar is the FRAMEWORK page (why opt, what the lock means, the architectural decision). Frame the relationship explicitly in opening + closing sections.
- Vary persona figures from the Wave 5 page.

---

## Redirect overlap (on launch)

No existing slug matches C1's framework scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (VATA 1994):**
- VATA 1994 Schedule 10 (option to tax — full text): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10
- VATA 1994 Sch 10 para 2 (election operative): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/2
- VATA 1994 Sch 10 para 25 (20-year revocation): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/25
- VATA 1994 Sch 10 para 21 (real estate election): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/21
- VATA 1994 Sch 9 Group 1 (exempt land default — what opting overrides): https://www.legislation.gov.uk/ukpga/1994/23/schedule/9
- VATA 1994 s.24 + s.26 (input tax framework): https://www.legislation.gov.uk/ukpga/1994/23/section/24

**HMRC guidance + forms:**
- HMRC VAT Notice 742A (Opting to tax land and buildings): https://www.gov.uk/government/publications/vat-notice-742a-opting-to-tax-land-and-buildings
- HMRC VATLP manual (Land and Property): https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property
- VAT 1614A form (notification of option): https://www.gov.uk/government/publications/vat-1614a-option-to-tax-land-andor-buildings-notification-of-an-option-to-tax
- VAT 1614B form (request for prior permission): https://www.gov.uk/government/publications/vat-1614b-request-for-permission-to-opt-to-tax-land-andor-buildings
- VAT 1614E form (real estate election): https://www.gov.uk/government/publications/vat-1614e-notification-of-a-real-estate-election

**Cross-references in house_positions.md:** §29 (Wave 8 VAT architectural cluster — primary anchor); §29.1 (VATA 1994 overview); §29.3 (Sch 10 option-to-tax mechanics + form numbers 1614A-J); §29.5 (CGS interaction); §29.8 (registration thresholds — opting may trigger registration); §16.27 (rate-by-reference for £250k CGS threshold and £90k registration threshold); §16.45 (drift discipline — Sch 10 not s.51; 20-year not 10-year).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 10 para 25 verbatim heading "Revocation of option: lapse of more than 20 years since option had effect" against legislation.gov.uk; verify Sch 10 para 2 verbatim heading "Effect of the option to tax: exempt supplies become taxable"; verify VAT 1614A is current notification form (HMRC has refreshed form numbers periodically); verify the £250k CGS threshold per §29.5 + §16.27 rate-by-reference discipline; verify prior-permission paras 28-30 still operative.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory paragraph references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Commercial-property landlord + Developer.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the 20-year lock explanation (high-intent: landlord considering whether to opt and worried about lock-in)
  - After the prior-permission section (intent: opter unaware of anti-avoidance trap)
  - Optionally after the decision framework section (input-tax-recovery vs tenant-impact tradeoff)
- Vary opening; do NOT lead with "The option to tax under VATA 1994 Schedule 10...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on the 20-year lock (most common misconception is "I can revoke any time"), the prior-permission requirement, and what "designed as a dwelling" means for automatic disapplication.

### Cannibalisation
- Cross-link `vat-option-to-tax-commercial-property-mechanics-election-revocation` as the Wave 5 operational-mechanics companion in opening + closing.
- Cross-link `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` for the CGS interaction.
- Forward-link C2 (revocation depth), C3 (TOGC option-matching), C7 (disapplication paragraph walk), C10 (input-tax recovery) when those Wave 8 pages live.

### House positions
- §29 primary; §29.1 + §29.3 + §29.5 + §29.8 verbatim.
- §29.11 do-not-write list — "Sch 10 para 12 covers residential conversion disapplication" forbidden (para 12 is developers-of-exempt-land; residential is paras 5+6).
- §16.45 — Sch 10 not s.51; 20-year not 10-year.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the pillar-level framework + 20-year-lock-at-depth + prior-permission + real-estate election. Write to it.
- Vary H2s from the Wave 5 mechanics page.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.1 + §29.3 + §29.5 + §29.8 mandatory; §16.45 drift discipline on Sch-10-not-s.51 and 20-year-not-10-year. Per §16.35: re-verify Sch 10 para 2 + para 25 verbatim headings, VAT 1614A form currency, £250k CGS threshold, and prior-permission paras 28-30 against legislation.gov.uk and gov.uk at write time.

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
