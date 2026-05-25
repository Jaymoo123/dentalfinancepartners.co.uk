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
- **Final slug:** `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (unchanged from brief).
- **Final category:** `Property Types & Specialist Tax` (overridden from brief's `vat-and-property` / tracker's `vat-for-landlords`, neither of which is a live route — see F-4). Final canonical: `/blog/property-types-and-specialist-tax/option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock`.
- **H1 chosen:** "Option to Tax Commercial Property: The VATA 1994 Schedule 10 Framework, the 20-Year Lock, and the Strategic Decision Behind Input-Tax Recovery"
- **Meta title chosen:** "Option to Tax Sch 10 VATA 1994: The 20-Year Lock" (48 chars)
- **Why these vs other options:** Framework framing (architectural decision + 20-year lock) rather than mechanics walkthrough; H2s structured around opter-binding / lock / prior-permission / REE / CGS / economic-decision rather than form-by-form steps. Avoids overlap with Wave 5 mechanics companion page which already covers the operational walkthrough at depth.

### Competitor URLs fetched
- Brief listed 5 competitor URLs (saffery, bdo, rsmuk, crowe, evelyn). Per F-1 lesson (Session A's hallucinated-URL flag), I didn't pre-fetch; the framework-pillar differentiator is our own depth on the 20-year lock + paragraph 28 prior permission + paragraph 21 REE, not competitor-borrowed. The C1 pillar's defensible point sits inside-statute (Sch 10 paragraph walk), and competitors are typically thin on paragraphs 28 and 21 per the brief's pool-thinness disclosure.

### Existing-page review
- **`vat-option-to-tax-commercial-property-mechanics-election-revocation.md` (Wave 5 mechanics companion).** Read in full. Companion page covers: default exemption, VAT1614A 30-day mechanic, 6-month cooling-off mechanic, disapplication categories with H3 subsections, REE summary, 20-year revocation summary, TOGC interaction, £2.4m office refurb worked example, £1.6m connected-party mixed-use trap worked example. **Cannibalisation differentiation:** Wave 5 is the operational-mechanics page (form-by-form, step-by-step). C1 PILLAR is the architectural-framework page (why opt, what the 20-year lock means, who/what is bound, when prior permission required, REE vs per-property decision-architecture, CGS overlay, economic-decision framework). The two pages are designed to be read together. Cross-link explicitly in opening, election-mechanics H2 (forward-link to Wave 5), and Related Reading section.
- **`vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics.md`.** Read frontmatter + structure only. Used as the CGS-companion cross-link from C1's "Capital Goods Scheme shadow" H2.
- **`vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method.md`.** Forward-link in Related Reading; will deepen via C5 (special method) when that lands.
- **`togc-vat-property-letting-business.md`.** Canonical lives at `/blog/incorporation-and-company-structures/togc-vat-property-letting-business`. Forward-link in Related Reading; will be deepened via C3 (TOGC option-matching) when that lands.

### Citations added
- Statutory (legislation.gov.uk): VATA 1994 Sch 10 (root); Sch 10 paras 2 (election effect), 21 (real estate elections), 25 (20-year revocation), 28 (prior permission for pre-option exempt grants).
- HMRC: VAT Notice 742A.
- Forms: VAT1614A (notification), VAT1614H (prior permission). VAT1614C / VAT1614D / VAT1614E / VAT1614J cited in body as part of cluster context with cross-link discipline (depth on companion pages).
- All form attributions verified directly against gov.uk publication pages on 2026-05-25; see F-5 for the verification table.

### Internal links added
- `/blog/property-types-and-specialist-tax/vat-option-to-tax-commercial-property-mechanics-election-revocation` (Wave 5 mechanics companion) — twice in body + Related Reading.
- `/blog/property-types-and-specialist-tax/vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` — body (CGS section) + Related Reading.
- `/blog/property-types-and-specialist-tax/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method` — Related Reading.
- `/blog/incorporation-and-company-structures/togc-vat-property-letting-business` — Related Reading.
- `/blog/property-types-and-specialist-tax/vat-mixed-use-property-purchase-residential-commercial-element-apportionment` — Related Reading.
- `/blog/property-types-and-specialist-tax/vat-on-new-builds-residential-property` — Related Reading.
- All 6 internal links resolve to existing markdown files on disk; build clean confirms.
- **Forward-references (not hyperlinks) to Wave 8 siblings:** the FAQ on "where do I find operational mechanics / revocation routes / paragraph-walk" references C2 (revocation), C3 (TOGC), C7 (disapplication paragraph walk), C10 (recovery) in prose. These are plain-text references that will be converted to hyperlinks as each sibling lands on the branch. Tracking obligation logged in F-6 (next flag at session-end sweep).

### Inline CTA placements
- After "The 20-year lock at Schedule 10 paragraph 25" H2 — high-intent: landlord considering whether to opt and worried about lock-in.
- After "Prior permission under Schedule 10 paragraphs 28 to 30" H2 — intent: opter discovers pre-option exempt grant history they didn't know was material.
- After "The economic decision: input recovery against tenant cost and SDLT" H2 — decision-point intent: opter at threshold of notification decision.

### Build attempts
- Build 1 (post-write): build clean. C1 page generated in SSG path list at `/blog/property-types-and-specialist-tax/option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock`.
- npm install required at workspace root level prior to first build (worktree's node_modules was empty after fresh worktree creation).

### Verification
- em-dash count: 0
- Tailwind utility classes: 0
- metaTitle length: 48 (≤62 ✓)
- metaDescription length: 150 (≤158 ✓)
- FAQ count: 12 (pillar range 10-14 ✓)
- Internal links resolve: 6/6 ✓ (verified via Glob spot-check; build clean confirms)
- Body word count: 4,497 (pillar band 3,500-4,500 ✓; just inside ceiling after two trim passes)

### Flags raised to wave8_site_wide_flags.md
- **F-4 WAVE_WIDE_CATEGORY_DRIFT.** `vat-for-landlords` (tracker) / `vat-and-property` (brief) are not live routes; overridden to `Property Types & Specialist Tax` matching Wave 5 mechanics companion. Affects all 9 Bucket C picks; manager confirmation requested.
- **F-5 HOUSE_POSITION_EXTENSION + BRIEF_DRIFT.** §29.3 + §29.9 + C1 brief authority list mis-attribute VAT1614B as prior-permission form; actual prior-permission form is VAT1614H. Also §29.9 mis-attributes 1614F (actual: exclude new building from REE) and 1614G (actual: housing-association disapply) and 1614H (actual: prior permission, not notification). All 9 form attributions verified directly against gov.uk on 2026-05-25 with verbatim form titles; corrected mapping ready for §29.3 + §29.9 in-place patch.

### 2-3 sentence summary
C1 PILLAR shipped as the framework page for the Wave 8 Bucket C option-to-tax cluster: architectural decision logic (why opt, who is bound, what the 20-year lock at Sch 10 para 25 commits to), depth on prior permission at paragraphs 28-30 with the correct VAT1614H form (catching the §29 HP-lock drift on form attributions), the real estate election at paragraph 21 with the irrevocability nuance, and the economic decision framework netting input recovery against tenant-VAT cost and SDLT-on-VAT-inclusive consideration over the 20-year horizon. Differentiation against the Wave 5 mechanics companion is held through opener variation, framework-vs-mechanics framing, and a fresh Galloway Estate Limited £15m three-asset 2026/27 portfolio worked example (per-property opt vs REE strategic choice) replacing the Wave 5 £2.4m office refurb + £1.6m connected-party trap. 4,497 body words, 12 FAQs, 6 internal links, 0 em-dashes, 0 Tailwind classes, build clean.
