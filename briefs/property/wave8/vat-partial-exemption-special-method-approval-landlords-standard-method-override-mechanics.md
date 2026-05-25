# Wave 8 brief: vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics

**Site:** property
**Bucket:** C (VAT operational depth — partial exemption SPECIAL method + override)
**Session:** C
**Pick ID:** C5
**Brief type:** Net-new page (reframed at Stage 1a cannib audit — special method + override focus)
**Source markdown path on launch:** `Property/web/content/blog/vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — special method + override, REFRAMED from standard method which is Wave 5)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Partial-exemption SPECIAL method depth (NOT standard method — that is the Wave 5 page). Reframed at Stage 1a cannib audit. Page walks: (a) **The standard-method baseline** at SI 1995/2518 reg 101 — apportions residual input tax (non-attributable to either taxable or exempt supplies) using the value-of-taxable-supplies / value-of-total-supplies ratio. Default; no approval required; rounded UP to the nearest whole percentage. Suitable for many mixed-portfolio landlords; UNSUITABLE where the supply-value ratio materially distorts the actual-use ratio (e.g. high-value commercial opted rents alongside low-value residential exempt rents that consume disproportionate management time or shared-floor-area); (b) **The special method approval route at SI 1995/2518 reg 102** (verbatim heading "Use of other methods" — verified 2026-05-25). The Commissioners "may approve or direct the use by a taxable person of a method other than that specified in regulation 101". Operative requirements: (i) PRIOR HMRC approval required; (ii) method must be in WRITING; (iii) taxable person must provide a declaration that "to the best of their knowledge and belief" the proposed method is fair and reasonable; (iv) once approved, must be used consistently until either the trader requests change or HMRC directs change; (c) **The methods typically approved** for property portfolios: (i) sectorised methods (split portfolio into taxable-sector vs exempt-sector with separate apportionment); (ii) floor-area methods (residual costs apportioned by m² of taxable-use floor space vs exempt-use floor space); (iii) headcount methods (for management overheads where commercial and residential portfolios are managed by distinguishable teams); (iv) transaction-count methods (suitable for high-volume short-let portfolios with seasonal mix); (d) **The override / HMRC-direction architecture** — (i) **reg 107A standard-method override** (verified inserted by SI 2002/1074 on 18 April 2026; the §29.6 lock cites SI 2002/1142 — flag as HP gap). The override operates as an adjustment of attribution where standard-method attribution under reg 101(2)(b) and (d) "differs substantially" from actual use; (ii) **reg 102B HMRC-direction route** — HMRC may issue a direction requiring a taxable person to use a special method where the standard method is producing unreasonable results. Taxpayer-side reg 102B applications convert "we want to switch" to "HMRC has directed we switch", which forces consistency; (e) **The annual longer-period adjustment at reg 107** — partial-exemption attributions are calculated quarterly but reconciled annually on the longer-period basis. Material under either standard or special method; (f) **The decision tree** — small mixed portfolio (residential exempt rents <de minimis £625/month per reg 106) = recover all input tax + ignore partial exemption; medium mixed portfolio where standard method is fair = stay standard; large mixed portfolio where standard method distorts = apply for special method via reg 102 with PESM proposal; large mixed portfolio where HMRC has indicated standard method is unreasonable = await reg 102B direction or pre-empt with reg 102 application. Cross-references C1 (option-to-tax — opting commercial property changes the residential / commercial supply-value ratio) and C10 (input-tax recovery on professional fees — partial-exemption interaction). Distinct from the Wave 5 standard-method page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C5 is REFRAMED from the Stage 1a standard-method angle to special-method + override. The Wave 5 page `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method` covers standard method. C5 covers what comes after standard method when standard method distorts. The §16.45 drift catches: (1) reg 102 requires PRIOR HMRC approval (do NOT say "landlord can adopt special method unilaterally"); (2) reg 102 = special method approval, reg 102B = HMRC direction, reg 107A = standard-method override (three distinct provisions — do not conflate); (3) reg 107A insertion cite per §29.6 lock says SI 2002/1142 but actual is SI 2002/1074 — flag as HP gap for §29.6 close.

**Pool-thinness disclosure:** Competitor coverage typically explains standard method but skips the special-method application mechanics, the override-vs-direction distinction at reg 107A vs reg 102B, and the typical PESM methods approved for property. The reg-by-reg architecture plus method-choice decision tree plus PESM-method-typology is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: reg 102 prior-approval requirement (commonly omitted as competitors say "switch to special method"); reg 102B HMRC-direction (commonly omitted); reg 107A override insertion cite (verify SI cite — many competitors cite incorrectly); PESM-method typology (sectorised / floor-area / headcount).

- https://www.saffery.com/insights/articles/partial-exemption-special-method/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/partial-exemption-special-method
- https://www.rsmuk.com/insights/tax-insights/vat-special-method
- https://www.crowe.com/uk/insights/vat-partial-exemption-special-method
- https://www.evelyn.com/insights-and-events/insights/vat-special-method-approval/

**Borrowable patterns:** competitor PESM-method classification tables (verify with HMRC Notice 706); standard-method-vs-special-method decision frameworks.

---

## GSC data

*Net-new page; primary topical queries expected: "VAT partial exemption special method", "PESM approval landlord", "reg 102 partial exemption", "standard method override property", "VAT special method floor area", "reg 102B HMRC direction".*

---

## Closest existing pages (cannibalisation context)

- `vat-partial-exemption-landlords-mixed-residential-commercial-portfolios-standard-method` (Wave 5 STANDARD method page — cross-link explicitly as the standard-method companion; C5 is the post-standard-method route)
- C1 pillar `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (forward-link — opting changes the supply-value ratio that drives standard method)
- `vat-mixed-use-property-purchase-residential-commercial-element-apportionment` (apportionment adjacent)
- C10 `landlord-vat-recovery-professional-fees-capital-costs-commercial-property` (forward-link — partial-exemption interaction for residual fees)
- `vat-capital-goods-scheme-property-businesses-10-year-adjustment-mechanics` (CGS interaction with partial exemption)

**Cannibalisation discipline:**
- Wave 5 page covers standard method baseline. C5 covers special method approval + override + direction architecture. Frame the boundary explicitly in opening + closing.
- Vary persona figures from Wave 5.

---

## Redirect overlap (on launch)

No existing slug matches C5's special-method scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- SI 1995/2518 reg 101 (standard method — baseline reference): https://www.legislation.gov.uk/uksi/1995/2518/regulation/101
- SI 1995/2518 reg 102 (special method approval — verified 2026-05-25): https://www.legislation.gov.uk/uksi/1995/2518/regulation/102
- SI 1995/2518 reg 102B (HMRC direction): https://www.legislation.gov.uk/uksi/1995/2518/regulation/102B
- SI 1995/2518 reg 107A (standard-method override — verify SI 2002/1074 insertion cite at write time): https://www.legislation.gov.uk/uksi/1995/2518/regulation/107A
- SI 1995/2518 reg 106 (de minimis — £625/month + 50% test): https://www.legislation.gov.uk/uksi/1995/2518/regulation/106
- VATA 1994 s.26 (deduction of input tax framework): https://www.legislation.gov.uk/ukpga/1994/23/section/26

**HMRC guidance:**
- HMRC VAT Notice 706 (Partial exemption): https://www.gov.uk/government/publications/vat-notice-706-partial-exemption
- HMRC VAT Partial Exemption Manual (VPE / PE): https://www.gov.uk/hmrc-internal-manuals/vat-partial-exemption-guidance
- HMRC partial exemption framework (PE21000+ on special methods): https://www.gov.uk/hmrc-internal-manuals/vat-partial-exemption-guidance/pe21000

**Cross-references in house_positions.md:** §29 (Wave 8 VAT cluster — primary anchor); §29.6 (partial exemption — standard 101 / special 102 / override 107A / de minimis 106 verbatim; FLAG reg 107A SI cite as SI 2002/1074 not SI 2002/1142 per §29.9 sub-bullet correction); §29.11 do-not-write list ("Special method approval is automatic" forbidden); §16.45 drift discipline.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify SI 1995/2518 reg 102 "Use of other methods" verbatim heading; verify reg 102B is HMRC-direction route; verify reg 107A is standard-method override (and that it is the SI 2002/1074 amendment — flag SI 2002/1142 in §29.6 as drift catch for manager); verify de minimis figures at reg 106 (£625/month + 50%) against gov.uk per §16.27 rate-by-reference; verify reg 107 longer-period annual adjustment framework.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory regulation references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Mixed-portfolio landlord + Property fund / multi-SPV operator.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the standard-vs-special-method comparison section (highest intent: landlord choosing between methods)
  - After the reg 102 approval-application section (intent: trader preparing PESM submission)
  - Optionally after the override / direction architecture section
- Vary opening; do NOT lead with "Partial exemption is a VAT mechanism that...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on "can I switch to a special method without HMRC approval" (no — prior approval required), "what is the difference between reg 107A override and reg 102B direction" (direction is HMRC-initiated to mandate special method; override is taxpayer-initiated to adjust attribution mid-year), and "what is the de minimis limit" (£625/month average AND ≤50% of total input tax).

### Cannibalisation
- Cross-link Wave 5 standard-method page explicitly in opening + closing as the standard-method companion.
- Cross-link C1 pillar for the option-to-tax interaction.
- Forward-link C10 for the input-tax-recovery-on-professional-fees interaction.

### House positions
- §29 primary; §29.6 verbatim.
- §29.11 do-not-write list — "Special method approval is automatic" forbidden.
- §16.45 — reg 102 / 102B / 107A are distinct; do not conflate.
- Flag §29.6 SI-cite drift (SI 2002/1074 not SI 2002/1142) to manager in work-log.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is special-method approval + override / direction architecture + PESM method typology. Write to it.
- Vary H2s from Wave 5 standard-method page.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.6 mandatory; §16.45 drift discipline on reg 102 vs 102B vs 107A; flag SI-cite drift (107A inserted by SI 2002/1074, not SI 2002/1142 per §29.6) to manager. Per §16.35: re-verify reg 102 verbatim heading, reg 102B direction operative status, reg 107A insertion SI, reg 106 de minimis figures.

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

C5 shipped as partial-exemption special-method depth, reframed from Stage 1a's original standard-method angle (standard method is the Wave 5 page). Three-lever architecture walked: reg 102 special-method approval (prior HMRC approval + written method + fair-and-reasonable declaration); reg 107A standard-method override (verified inserted by SI 2002/1074 effective 18 April 2002, NOT the SI 2002/1142 originally locked at HP §29.6 stage 1, confirms the Stage 2b correction); reg 102B HMRC direction. PESM typology table (sectorised / floor-area / headcount / transaction-count) + de minimis transition / CGS interaction sections + Lansdowne Estates floor-area-based PESM worked example showing 12-percentage-point recovery uplift on £400k residual base. 2,882 body words, 12 FAQs, 4 internal links, 0 em-dashes, 0 Tailwind, build clean.

### Decisions
- **Final slug:** unchanged.
- **Final category:** `Property Types & Specialist Tax` per F-4.
- **H1:** "VAT Partial Exemption Special Method: The Regulation 102 Approval, the Regulation 107A Standard-Method Override, and the PESM Decision Architecture for Mixed-Portfolio Landlords"
- **Meta title:** 60 chars; meta description 142 chars.
- **Anti-templating:** the three-regulation architecture (102 / 107A / 102B) plus the PESM typology table is the per-page differentiator. Worked example varies persona (Lansdowne Estates, mixed three-commercial-plus-seven-residential portfolio).
### Verifications
- em-dash 0; Tailwind 0; metaTitle 60; metaDescription 142; FAQ 12; body 2,882; internal links 4/4 resolve; build clean.
