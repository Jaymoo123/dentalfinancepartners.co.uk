# Wave 8 brief: disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion

**Site:** property
**Bucket:** C (VAT operational depth — Sch 10 disapplication paragraph walk paras 5+6+12)
**Session:** C
**Pick ID:** C7
**Brief type:** Net-new page (references C1 pillar; CRITICAL drift-catch correction at Stage 1a — slug retained but body must cover paras 5+6+12 distinguished)
**Source markdown path on launch:** `Property/web/content/blog/disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion

---

## Manager pre-decisions

- **Suggested slug:** `disapplication-option-to-tax-schedule-10-paragraph-12-residential-conversion`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — Sch 10 disapplication routes, paras 5+6+12 walk)
- **Framing differentiator (Stage 2, 2026-05-25):**

> **CRITICAL drift-catch correction baked in at Stage 1a.** The original slug references "paragraph 12 residential conversion" but VATA 1994 Sch 10 paragraph 12 is the **"developers of exempt land"** anti-avoidance provision (verbatim heading "Developers of exempt land" — verified 2026-05-25 against legislation.gov.uk). The dwelling / residential disapplication routes are at **Sch 10 paragraphs 5 and 6** (verbatim headings "Dwellings designed or adapted, and intended for use, as dwelling etc" for para 5 and "Conversion of buildings for use as dwelling etc" for para 6 — both verified 2026-05-25). Slug retained but body MUST cover all three disapplication routes (paras 5 + 6 + 12) clearly distinguished. Page walks: (a) **The disapplication concept** — disapplication is NOT revocation. The option remains in force, but does NOT apply to specified grants (so those grants revert to the Sch 9 Group 1 exempt-default). Distinct from active revocation under paras 23 / 24 / 25 (see C2). The opter does NOT need to take any action to invoke disapplication — it operates by statute either automatically (para 5) or on recipient certification (para 6); (b) **Para 5 — automatic dwelling disapplication.** Verbatim heading "Dwellings designed or adapted, and intended for use, as dwelling etc". The option to tax does NOT apply to any grant relating to a building (or part) that is "designed or adapted, and intended, for use as a dwelling or number of dwellings, or solely for a relevant residential purpose". No election needed by recipient. Tests are objective (designed / adapted) and subjective (intended). Catches: completed dwellings; new-builds prior to handover; converted dwellings. Does NOT catch: bare land; commercial buildings; mixed-use buildings (the residential PORTION is disapplied, opted commercial portion remains taxable — apportionment required); (c) **Para 6 — recipient-certified residential / charitable disapplication.** Verbatim heading "Conversion of buildings for use as dwelling etc". The option does NOT apply where the recipient certifies in writing that the building is intended for use solely for a relevant residential purpose or relevant charitable purpose. Certification via **VAT 1614D** form (verified 2026-05-25). Recipient must hold the certificate at the time of the grant and provide it to the grantor. Conditions: intended use; specified relevant residential / charitable purpose definitions per Sch 8 Group 5 Notes 4 + 6; reasonable cause for certifier's belief; (d) **Para 12 — developers of exempt land anti-avoidance.** Verbatim heading "Developers of exempt land". This is NOT a residential-conversion disapplication. It is an ANTI-AVOIDANCE provision targeting a specific pre-1997 planning structure: developer A (vendor) opts to tax + sells opted land to developer B who plans to make exempt onward supplies. Without para 12, A would have charged 20% VAT recoverable by B if B were taxable, but B holds-as-exempt and recovers nothing — leaving A's option to tax to artificially shift VAT recovery. Para 12 disapplies A's option in defined circumstances: (i) grant by developer of an exempt land grant; (ii) recipient connected (or is "development financier" per Sch 10 para 14 — verify); (iii) intended use within ≥3-year period substantially for exempt purpose. Catches sophisticated planning but rarely live for typical landlord transactions; (e) **The three-route distinction in practice** — landlord developer converting commercial to residential typically engages para 5 (completed dwellings) AND/OR para 6 (recipient certification by housing association buyer); paras 12 catches structured anti-avoidance and is fact-pattern-specific. Most landlords need para 5 + para 6 walk; specialist transactions need para 12. The slug "paragraph 12 residential conversion" reflects the ORIGINAL brief lineup's conflation; corrected here at body level; (f) **The VAT 1614D recipient-certification mechanics in detail** — must specify the relevant residential / charitable use; can be issued by housing associations, care home operators, charities, certain other relevant-residential operators; certifier liability under VATA 1994 s.62 for incorrect certificate; (g) **The apportionment overlay** for mixed-use buildings — opted commercial portion remains standard-rated, dwelling / residential portion automatically disapplied; per HMRC VATLP manual + Notice 742A. Operational complexity at completion. Cross-references C1 (pillar — option-to-tax framework, including which paragraphs catch which grants), C2 (revocation depth — para 24 six-year-no-interest contrasts with para 5/6 disapplication routes), C6 (commercial-to-residential conversion — para 6 certification typical at handover to housing association developer).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C7 is the CRITICAL drift-catch correction brief — the slug references para 12 but body MUST cover paras 5+6+12 distinguished. Para 12 alone is not the residential-conversion disapplication route. The §16.45 drift catches: (1) "para 12 is the residential conversion disapplication" is FALSE — para 12 is developers-of-exempt-land anti-avoidance; (2) residential disapplication is at paras 5 + 6; (3) disapplication is NOT revocation — option remains in force; (4) para 5 automatic and objective; para 6 requires recipient certification (VAT 1614D); (5) mixed-use apportionment required for partial-residential / partial-commercial buildings.

**Pool-thinness disclosure:** Competitor coverage often conflates the three disapplication routes (especially mislabelling para 12 as the residential route — same drift our seed corrected). The clean three-route walk-through plus VAT 1614D mechanics plus mixed-use apportionment overlay is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: paragraph cites for disapplication routes (FLAG any competitor mislabelling para 12 as residential disapplication — same drift catch); VAT 1614D form treatment; mixed-use apportionment; para 12 developer-of-exempt-land coverage (commonly omitted entirely).

- https://www.saffery.com/insights/articles/disapplication-option-to-tax/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/disapplication-option-tax
- https://www.rsmuk.com/insights/tax-insights/option-to-tax-disapplication
- https://www.crowe.com/uk/insights/vat-disapplication-conversion
- https://www.evelyn.com/insights-and-events/insights/option-to-tax-disapplification/

**Borrowable patterns:** competitor para-5-vs-para-6 distinction tables (verify); VAT 1614D worked-example certificates.

---

## GSC data

*Net-new page; primary topical queries expected: "disapplication option to tax", "Sch 10 para 5", "Sch 10 para 6", "VAT 1614D certificate", "option to tax residential conversion", "developers of exempt land VAT", "option to tax housing association sale".*

---

## Closest existing pages (cannibalisation context)

- C1 pillar `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (cross-link as option-to-tax framework anchor)
- C2 revocation `option-to-tax-revocation-routes-6-month-cooling-off-20-year-exit-landlords` (cross-link — disapplication vs revocation boundary)
- C6 conversion `vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics` (cross-link — para 6 certification typical at developer handover)
- `vat-option-to-tax-commercial-property-mechanics-election-revocation` (Wave 5 — operational mechanics companion)
- `vat-on-new-builds-residential-property` (zero-rated downstream — para 5 dwelling status)

**Cannibalisation discipline:**
- C7 is the disapplication-paragraph-walk depth. Frame against C1 (framework), C2 (revocation), C6 (conversion downstream).
- Vary persona figures from Wave 5 mechanics page.

---

## Redirect overlap (on launch)

No existing slug matches C7's three-paragraph disapplication scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- VATA 1994 Sch 10 para 5 (dwelling automatic disapplication — verified 2026-05-25): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/5
- VATA 1994 Sch 10 para 6 (recipient-certified disapplication — verified 2026-05-25): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/6
- VATA 1994 Sch 10 para 12 (developers of exempt land — anti-avoidance, verified 2026-05-25): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/12
- VATA 1994 Sch 10 para 14 (development-financier definition for para 12 purposes): https://www.legislation.gov.uk/ukpga/1994/23/schedule/10/paragraph/14
- VATA 1994 Sch 8 Group 5 Notes 4 + 6 (relevant residential + relevant charitable purpose definitions): https://www.legislation.gov.uk/ukpga/1994/23/schedule/8
- VATA 1994 s.62 (incorrect-certificate penalty): https://www.legislation.gov.uk/ukpga/1994/23/section/62

**HMRC guidance + forms:**
- HMRC VAT Notice 742A (option to tax — disapplication routes): https://www.gov.uk/government/publications/vat-notice-742a-opting-to-tax-land-and-buildings
- VAT 1614D form (recipient residential certification): https://www.gov.uk/government/publications/vat-1614d-certify-property-intended-for-relevant-residential-or-charitable-purposes
- HMRC VATLP manual (Land and Property — disapplication treatment): https://www.gov.uk/hmrc-internal-manuals/vat-land-and-property

**Cross-references in house_positions.md:** §29 (Wave 8 VAT cluster — primary anchor); §29.3 (Sch 10 option-to-tax — disapplification paragraphs verbatim from lock); §29.11 do-not-write list ("Sch 10 para 12 covers residential conversion disapplification" forbidden — this brief enforces the correct framing); §16.45 drift discipline (paras 5+6 for residential, para 12 is developers-of-exempt-land anti-avoidance).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 10 para 5 verbatim heading "Dwellings designed or adapted, and intended for use, as dwelling etc"; verify Sch 10 para 6 verbatim heading "Conversion of buildings for use as dwelling etc"; verify Sch 10 para 12 verbatim heading "Developers of exempt land"; verify VAT 1614D is current certificate form; verify Sch 10 para 14 development-financier definition for para 12 purposes; verify Sch 8 Group 5 Notes 4 + 6 relevant-residential + relevant-charitable definitions at write time.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory paragraph references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Commercial-property opter + Developer selling to housing association / charity.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the three-paragraph distinction section (highest intent: opter confused about which paragraph applies)
  - After the VAT 1614D mechanics section (intent: housing association / charity recipient needing certification)
  - Optionally after the mixed-use apportionment overlay
- Vary opening; do NOT lead with "Disapplication of the option to tax under Sch 10...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on "what is the difference between paras 5, 6 and 12" (5 = automatic dwelling; 6 = recipient certification; 12 = developers-of-exempt-land anti-avoidance), "do I need to revoke the option to disapply for a sale to a housing association" (no — recipient certifies under para 6 via VAT 1614D; option remains in force for other supplies), and "what form is recipient certification" (VAT 1614D).

### Cannibalisation
- Cross-link C1 pillar for the option-to-tax framework.
- Cross-link C2 revocation for the disapplication-vs-revocation boundary.
- Cross-link C6 conversion for the para 6 certification at developer handover.

### House positions
- §29 primary; §29.3 verbatim.
- §29.11 do-not-write list — "Sch 10 para 12 covers residential conversion disapplication" forbidden (this brief is the enforcement page).
- §16.45 — paras 5 + 6 for residential, para 12 for developers-of-exempt-land.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is the three-paragraph clean distinction + VAT 1614D mechanics + mixed-use apportionment overlay. Write to it.
- Vary H2s from C1, C2 and Wave 5 mechanics page.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.3 mandatory; §16.45 drift discipline on para-12-not-residential and paras-5+6-for-residential. Per §16.35: re-verify Sch 10 paras 5 / 6 / 12 / 14 verbatim headings, VAT 1614D form currency, Sch 8 Gr 5 Notes 4 + 6 definitions at write time.

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
