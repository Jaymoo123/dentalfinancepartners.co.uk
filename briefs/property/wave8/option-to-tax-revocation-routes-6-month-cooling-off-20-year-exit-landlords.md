# Wave 8 brief: option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords

**Site:** property
**Bucket:** C (VAT operational depth — option-to-tax revocation depth)
**Session:** C
**Pick ID:** C2
**Brief type:** Net-new page (references C1 pillar; write AFTER C1)
**Source markdown path on launch:** `Property/web/content/blog/option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords

---

## Manager pre-decisions

- **Suggested slug:** `option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — revocation depth, builds on C1 pillar)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Option-to-tax revocation depth — the four operative routes plus the boundary between active revocation and automatic disapplication. Page walks: (a) **Cooling-off revocation under Sch 10 para 23** (verbatim heading "Revocation of option: the 'cooling off' period" — verified 2026-05-25). Para 23(1)(a) sets the period: "the time that has lapsed since the day on which the option had effect is less than 6 months". Conditions: no input tax has been claimed on related costs AND no taxable supplies have been made under the option AND (where the building is a capital item under the CGS) no CGS adjustment intervals have elapsed. Form VAT 1614C; (b) **Six-year-no-interest automatic revocation under Sch 10 para 24** — where the opter no longer holds any interest in the opted land for ≥6 years, the option lapses automatically. No election required; useful for portfolio cleanup after disposal. The trap: re-acquiring an interest in the same land resurrects the option (verify timing windows at write time); (c) **20-year revocation under Sch 10 para 25** (verbatim heading "Revocation of option: lapse of more than 20 years since option had effect" — verified 2026-05-25). Form VAT 1614J. Pre-conditions: capital-items adjustment periods (CGS — typically 10 intervals) must have run; connected-party use restrictions checked; HMRC may direct further conditions; (d) **Automatic disapplication routes** (NOT formal revocation — the option remains in force but does not apply to specified supplies). Sch 10 para 5 disapplies the option for buildings designed or adapted as dwellings (verbatim heading "Dwellings designed or adapted, and intended for use, as dwelling etc"). Sch 10 para 6 (verbatim heading "Conversion of buildings for use as dwelling etc") enables recipient-certified disapplication via VAT 1614D where the recipient certifies intended residential or relevant-residential-purpose use; (e) **The capital-goods-scheme clawback risk on revocation** — revoking the option mid-CGS-adjustment-period (10 intervals on land per SI 1995/2518 regs 112-116) triggers clawback of previously-recovered input tax in proportion to remaining intervals (worked example: £100k VAT recovered on a £500k refurbishment Year 1; revoke in Year 5; clawback ≈ £100k × 5/10 = £50k); (f) **The decision tree for stuck-with-a-bad-option landlords** — cooling-off (≤6 months, no tax events) > seek dwelling disapplication (if residential use planned) > six-year-no-interest run-off (if portfolio exit planned) > 20-year endurance with mid-life CGS management. Distinct from C1 (framework pillar) and C7 (disapplication paragraph-walk — paras 5+6+12 with anti-avoidance depth).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C2 builds on C1 pillar — open and close with framework cross-link to C1. C2 is for the landlord stuck with a poorly-considered option who needs the exit playbook. The §16.45 drift catches for this brief are (1) "option can be revoked at any time" (false — 20-year lock unless cooling-off or no-interest exits); (2) cooling-off cite as para 22 or 24 (it is para 23); (3) cooling-off period length (it is 6 months, not 3); (4) confusing active revocation (paras 23/24/25 routes) with automatic disapplication (paras 5/6 — see C7).

**Pool-thinness disclosure:** Competitor coverage typically explains cooling-off + 20-year routes but skips Sch 10 para 24 (six-year-no-interest), CGS clawback quantification on mid-life revocation, and the active-revocation-vs-automatic-disapplication boundary. The four-route decision-tree plus CGS-clawback worked example is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: cooling-off period length (verify 6 months not 3); para 23 cite (some competitors misframe as para 22 or 24); 20-year revocation form (VAT 1614J); para 24 six-year-no-interest treatment (commonly omitted); CGS clawback quantification (commonly summarised but not worked).

- https://www.saffery.com/insights/articles/revoking-option-to-tax/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/option-to-tax-revocation
- https://www.rsmuk.com/insights/tax-insights/revoking-option-to-tax
- https://www.crowe.com/uk/insights/option-to-tax-revocation
- https://www.evelyn.com/insights-and-events/insights/option-to-tax-exit/

**Borrowable patterns:** competitor cooling-off explainer tables (verify para reference); 20-year revocation procedural diagrams.

---

## GSC data

*Net-new page; primary topical queries expected: "revoke option to tax", "VAT 1614J", "20 year option to tax revocation", "option to tax cooling off period", "VATA Sch 10 para 23", "option to tax 6 month rule", "revoke opt to tax commercial property".*

---

## Closest existing pages (cannibalisation context)

- `vat-option-to-tax-commercial-property-mechanics-election-revocation` (Wave 5 mechanics page — cross-link as operational-mechanics-side companion)
- C1 pillar `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (forward-link when live)
- C7 disapplication walk `disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion` (forward-link when live)
- `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` (CGS clawback context)
- `end-tax-year-checklist-landlords-april-2026` (operational adjacent)

**Cannibalisation discipline:**
- C1 pillar covers the framework and the 20-year-lock principle; C2 covers the four operative exit routes at depth. Frame the boundary explicitly.
- Wave 5 mechanics page covers the election operation; C2 covers the EXIT operation. Cross-link both ways.
- Vary persona figures from Wave 5.

---

## Redirect overlap (on launch)

No existing slug matches C2's revocation-depth scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (VATA 1994 Sch 10):**
- Sch 10 para 23 (cooling-off — 6 months): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/23
- Sch 10 para 24 (six-year-no-interest automatic revocation): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/24
- Sch 10 para 25 (20-year revocation): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/25
- Sch 10 para 5 (dwelling automatic disapplication): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/5
- Sch 10 para 6 (recipient-certified disapplication): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/6
- SI 1995/2518 Part XV (CGS — clawback mechanics on revocation): https://www.legislation.gov.uk/uksi/1995/2518/part/XV

**HMRC guidance + forms:**
- HMRC VAT Notice 742A (option to tax — full guidance): https://www.gov.uk/government/publications/vat-notice-742a-opting-to-tax-land-and-buildings
- VAT 1614C form (cooling-off revocation): https://www.gov.uk/government/publications/vat-1614c-ceasing-to-be-a-relevant-associate-in-relation-to-an-option-to-tax
- VAT 1614J form (20-year revocation): https://www.gov.uk/government/publications/vat-1614j-revoke-an-option-to-tax-after-20-years-have-elapsed
- VAT 1614D form (recipient residential certification): https://www.gov.uk/government/publications/vat-1614d-certify-property-intended-for-relevant-residential-or-charitable-purposes
- HMRC VATLP manual on revocation: https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property

**Cross-references in house_positions.md:** §29 (Wave 8 VAT cluster — primary anchor); §29.3 (option-to-tax mechanics — revocation routes); §29.5 (CGS interaction on revocation clawback); §29.11 do-not-write list ("option to tax is permanent" forbidden); §16.45 drift discipline.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 10 para 23(1)(a) "6 months" wording verbatim against legislation.gov.uk (do NOT write "3 months"); verify Sch 10 para 25 is the 20-year route (not 10-year); verify VAT 1614C and 1614J form numbers are current; verify Sch 10 para 24 six-year-no-interest route currency; verify CGS 10-interval period for land + buildings per SI 1995/2518 reg 114(3).

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory paragraph references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Commercial-property landlord stuck with bad option + Portfolio owner planning exit.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the cooling-off section (highest intent: opter within first 6 months and panicking)
  - After the CGS-clawback worked example (intent: opter contemplating mid-life revocation)
  - Optionally after the four-route decision tree
- Vary opening; do NOT lead with "If you have opted to tax and now regret it...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on "can I revoke at any time" (no — 20-year lock subject to exits), "what is the cooling-off period" (6 months under para 23, not 3), and "does revocation always trigger CGS clawback" (only mid-CGS-period revocation in respect of capital items).

### Cannibalisation
- Cross-link C1 pillar in opening + closing.
- Cross-link Wave 5 mechanics page as the operational-side companion.
- Forward-link C7 disapplication walk for the paras 5/6 boundary.

### House positions
- §29 primary; §29.3 + §29.5 verbatim.
- §29.11 do-not-write list — "option to tax is permanent" forbidden.
- §16.45 — para 23 not 22 or 24; 6 months not 3; 20-year not 10-year.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the four-route decision tree + CGS-clawback worked example + active-revocation-vs-disapplication boundary. Write to it.
- Vary H2s from C1 pillar and Wave 5 mechanics page.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.3 + §29.5 mandatory; §16.45 drift discipline on para-cite + period-length + lock-length. Per §16.35: re-verify Sch 10 paras 23/24/25 verbatim, VAT 1614C/1614J form currency, CGS 10-interval clawback mechanics at write time.

## Session-side watcher pattern

Standard.

---

## Per-page work-log (fill in as you go)

### Decisions
- **Final slug:** `option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords` (unchanged).
- **Final category:** `Property Types & Specialist Tax` (overridden per F-4 wave-wide drift).
- **H1 chosen:** "Revoking an Option to Tax: The Four Exit Routes Under Schedule 10 of VATA 1994, the CGS Clawback Shadow, and the Decision Tree for Landlords Stuck With a Bad Option"
- **Meta title chosen:** "Revoke Option to Tax: Sch 10 Paras 23/24/25 Routes" (50 chars)
- **Why these vs other options:** Exit-playbook framing distinct from C1's framework framing and Wave 5's mechanics framing. H2s organised by paragraph (23, 24, 25) plus disapplication-not-revocation boundary, then CGS clawback shadow with worked example, then decision tree. Whitford Properties worked example is single-property mid-life disapplication trap to vary from C1's three-asset portfolio REE and Wave 5's £2.4m refurb + £1.6m connected-party.

### Competitor URLs fetched
- Per F-1 lesson (Session A's hallucinated-URL flag) and brief pool-thinness disclosure that competitors typically skip paragraph 24, the framework + paragraph-24-depth + CGS-clawback worked example is our own depth. Did not pre-fetch the listed competitor URLs.

### Existing-page review
- **C1 PILLAR (just shipped).** Cross-link as framework companion in opening and Related Reading. C2 is the exit-route depth complementing C1's framework depth.
- **Wave 5 mechanics page.** Cross-link as operational election-side companion (Wave 5 covers the election mechanics; C2 covers the revocation mechanics). Worked example deliberately varies from Wave 5's £2.4m refurb / £1.6m connected-party.
- **CGS page.** Cross-link as CGS-mechanic companion.
- **Partial exemption page.** Cross-link in Related Reading.
- **TOGC page.** Cross-link in Related Reading.

### Citations added
- Statutory: VATA 1994 Sch 10 paras 6 (recipient-certified disapplication), 23 (cooling-off), 24 (6-year-no-interest), 25 (20-year revocation).
- HMRC: VAT Notice 742A.
- Forms verified directly against gov.uk publication pages 2026-05-25 (per F-5 verification table): VAT1614C, VAT1614J, VAT1614D.
- 8 external authority links in the Authorities footer.

### Internal links added
- `/blog/property-types-and-specialist-tax/option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (C1 pillar — exists on branch after b3fa0cd).
- `/blog/property-types-and-specialist-tax/vat-option-to-tax-commercial-property-mechanics-election-revocation` (Wave 5 mechanics companion).
- `/blog/property-types-and-specialist-tax/vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` (CGS companion).
- `/blog/property-types-and-specialist-tax/vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method`.
- `/blog/incorporation-and-company-structures/togc-vat-property-letting-business`.
- All 5 resolve to existing markdown files on disk; build confirms.
- Forward-text reference to C7 disapplication paragraph-walk in body (plain text until C7 lands); F-6 back-patch obligation logged.

### Inline CTA placements
- After "Cooling-off revocation under Schedule 10 paragraph 23" H2 — highest intent: opter within first 6 months, cooling-off review.
- After "The Capital Goods Scheme clawback on use changes" H2 / worked example — intent: opter contemplating mid-life exit and uncertain about CGS clawback exposure.

### Build attempts
- Build clean. C2 page generated in SSG path list.

### Verification
- em-dash count: 0
- Tailwind utility classes: 0
- metaTitle length: 50 (≤62 ✓)
- metaDescription length: 157 (≤158 ✓)
- FAQ count: 12 (target 10-12 ✓)
- Internal links resolve: 5/5 ✓
- Body word count: 2,879 (target 2,800-3,500 ✓)

### Flags raised to wave8_site_wide_flags.md
- No new flags raised on C2 (F-4 wave-wide category drift and F-5 form-attribution drift already raised on C1; same brief authority-list errors echo from C1 but no new BRIEF_DRIFT to log beyond what F-5 already covers — C2 brief authority links list mis-cites VAT1614C URL as `vat-1614c-ceasing-to-be-a-relevant-associate-...` which is actually the URL for VAT1614B; the correct VAT1614C URL is `vat-revoking-an-option-to-tax-within-6-month-cooling-off-period-vat1614c` per the F-5 verification table. C2 page uses the correct verified URL).

### 2-3 sentence summary
C2 shipped as the option-to-tax exit-route depth page: four routes (cooling-off Sch 10 para 23 VAT1614C, 6-year-no-interest para 24 automatic, 20-year para 25 VAT1614J, plus disapplication paras 5/6 contrasted as a non-revocation supply-specific mechanism). Differentiator depth on paragraph 24 (commonly omitted by competitors per pool-thinness disclosure) and CGS clawback distinction between use-change-triggered clawback and revocation-triggered clawback, with the Whitford Properties Limited £750k refurbishment / 2028 disapplication / £105k 7-year clawback worked example. 2,879 body words, 12 FAQs, 5 internal links, 0 em-dashes, 0 Tailwind, build clean.
