# Wave 8 brief: vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics

**Site:** property
**Bucket:** C (VAT operational depth — Sch 7A Group 6 + developer recovery flow)
**Session:** C
**Pick ID:** C6
**Brief type:** Net-new page (REFRAMED from Stage 1a — narrow to commercial-to-residential 5% trigger + developer input-tax flow)
**Source markdown path on launch:** `Property/web/content/blog/vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/vat-and-property/vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics

---

## Manager pre-decisions

- **Suggested slug:** `vat-commercial-to-residential-conversion-5-percent-reduced-rate-developer-recovery-mechanics`
- **Suggested category:** `vat-and-property`
- **Bucket:** C (VAT operational depth — reduced-rate conversions, REFRAMED to narrow commercial-to-residential)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Commercial-to-residential conversion VAT depth — the 5% reduced rate under VATA 1994 Sch 7A Group 6 + the developer input-tax recovery flow. Page walks: (a) **The reduced-rate operative provision** — VATA 1994 s.29A enables the 5% reduced rate (Sch 7A is the operative table of reduced-rate supplies; verified 2026-05-25). The verbatim Group 6 description: "The supply, in the course of a qualifying conversion, of qualifying services related to the conversion" plus building materials by the installer; (b) **What counts as a "qualifying conversion" under Sch 7A Group 6 Notes** — (i) conversion of a non-residential building (e.g. office, warehouse, shop, agricultural barn) or non-residential part of a building into a single household dwelling; (ii) conversion into multiple-occupancy dwellings (e.g. HMO bedsits, flatshare schemes); (iii) conversion into a "special residential" building (care home, student halls, hospice — buildings used for relevant residential purpose); (iv) changed-number-of-dwellings conversions where the conversion changes the number of single household dwellings in a building (e.g. one large house into 4 flats, or 4 flats into one house). DRIFT CATCH for §29.7 lock: the §29.7 line "Group 7" reference is to the Group 7 supply category (renovation of empty homes — see VATA 1994 Sch 7A Group 7), NOT to Group 6 qualifying-conversion categorisation. Changed-number-of-dwellings is a Group 6 conversion category, not a Group 7 category — verify at write time and flag if §29.1 misframes; (c) **What counts as "qualifying services"** — services consisting of any works to the fabric of the building (structural, plumbing, electrical, plastering, decorating) plus connection works to drainage, gas, electricity, water, telecoms. EXCLUDES: (i) services that are not works to the fabric (e.g. interior design consultancy alone); (ii) supply of goods that are not "building materials" as defined in VATA 1994 Sch 8 Group 5 Note 22 (e.g. carpets, white goods, freestanding furniture); (d) **The 5% rate applies to BOTH labour AND materials provided by the contractor doing the conversion**, but only where the contractor supplies the materials in the course of the qualifying-conversion service. Materials bought directly by the developer (not via the contractor) attract standard-rate 20% and are non-recoverable for the developer downstream of zero-rated onward sale (input tax restriction); (e) **Statutory consents required** — planning permission for change of use (Town and Country Planning Act 1990 Class C3 dwelling use class typically applicable, with PD-right alternatives) AND building control approval where structural works engaged. Without consents, HMRC can challenge the qualifying-conversion characterisation; (f) **The developer input-tax recovery flow** — three downstream scenarios: (i) **Developer sells converted property as first major-interest grant of dwelling — ZERO-RATED under Sch 8 Group 5 Item 1**. Developer's 5% input VAT on conversion services is FULLY recoverable as attributable to zero-rated taxable supply (VATA 1994 s.24 + s.26 + Sch 9 Gr 1 exempt-land exclusion does not bite because zero-rated is taxable not exempt). Best economic outcome; (ii) **Developer rents converted residential property — EXEMPT under Sch 9 Group 1**. Developer's 5% input VAT is NON-RECOVERABLE (or partial-exemption residual — see C5). Worst outcome; (iii) **Mixed — first letting then sale** — input tax recoverable subject to CGS clawback over 10 intervals per SI 1995/2518 regs 112-116 if let portion changes use. CGS bite is substantial on conversions with capital cost ≥£250k; (g) **Operational walkthrough** — developer acquires opted commercial property (vendor charges 20% VAT, developer recovers via opt-to-tax or pre-registration recovery — see C10); developer engages conversion contractor (5% on qualifying services); developer sells converted dwellings zero-rated (first major-interest grant); developer recovers all input VAT. Distinct from existing both-directions overview page; companion to existing zero-rate-new-build page.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 1 manager note:** C6 is REFRAMED from a both-directions overview to narrow commercial-to-residential 5% + developer recovery flow. The existing page `vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate` covers both directions at overview level; C6 is the commercial-to-residential operational depth. The §16.45 drift catches: (1) "5% rate for all conversions" is FALSE — only qualifying-conversion categories under Sch 7A Group 6; (2) materials bought directly by developer (not via contractor) attract 20%; (3) §29.1 reference to Group 7 = changed-number-of-dwellings is a §29.1 INTERNAL drift catch (Group 7 = renovation/alteration of empty residential premises; changed-number-of-dwellings is a Group 6 qualifying-conversion category); flag to manager for §29.1 correction. The web-checked Group 7 description is "renovation or alteration of qualifying residential premises".

**Pool-thinness disclosure:** Competitor coverage typically states "5% reduced rate for conversions" but skips the qualifying-services / qualifying-conversion category distinction, the building-materials-vs-fittings exclusion, and the developer downstream-recovery flow (zero-rated sale vs exempt letting). The end-to-end developer recovery walkthrough with worked example is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of: qualifying-conversion category list (some competitors say "any conversion" — false); qualifying-services definition (verify "fabric of building" + connection works); building-materials exclusion (verify Sch 8 Gr 5 Note 22); developer downstream recovery (commonly omitted or skewed); CGS interaction on let-then-sold mixed (commonly omitted).

- https://www.saffery.com/insights/articles/commercial-to-residential-conversion-vat/
- https://www.bdo.co.uk/en-gb/insights/tax/vat/commercial-residential-conversion
- https://www.rsmuk.com/insights/tax-insights/conversion-vat-5-percent
- https://www.crowe.com/uk/insights/conversion-reduced-rate-vat
- https://www.evelyn.com/insights-and-events/insights/commercial-residential-conversion-vat/

**Borrowable patterns:** competitor qualifying-conversion checklists (verify against Sch 7A Group 6 Notes); HMRC Notice 708 section 7 + 8 worked-example summaries.

---

## GSC data

*Net-new page; primary topical queries expected: "commercial to residential VAT 5%", "qualifying conversion reduced rate", "Sch 7A Group 6 conversion", "developer VAT recovery conversion", "5% reduced rate office to flats", "VAT Notice 708 conversion".*

---

## Closest existing pages (cannibalisation context)

- `vat-property-conversion-residential-to-commercial-or-commercial-to-residential-zero-rate-reduced-rate` (existing both-directions overview — cross-link explicitly as the both-directions companion; C6 is the commercial-to-residential operational depth)
- `vat-on-new-builds-residential-property` (zero-rated first-major-interest companion — back-link for the downstream sale leg)
- `residential-property-developer-tax-uk` (RPDT companion)
- C1 pillar `option-to-tax-vata-1994-schedule-10-commercial-property-20-year-lock` (opt-to-tax on acquired commercial property — input recovery enabler)
- C5 special-method `vat-partial-exemption-special-method-approval-landlords-standard-method-override-mechanics` (partial-exemption interaction if developer rents converted property)

**Cannibalisation discipline:**
- Existing page is both-directions overview. C6 is the commercial-to-residential operational depth. Frame the boundary explicitly.
- Vary persona figures from existing page.

---

## Redirect overlap (on launch)

No existing slug matches C6's narrow commercial-to-residential depth scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory:**
- VATA 1994 Sch 7A (reduced-rate supplies — full text): https://www.legislation.gov.uk/ukpga/1994/23/schedule/7A
- VATA 1994 s.29A (reduced-rate operative provision): https://www.legislation.gov.uk/ukpga/1994/23/section/29A
- VATA 1994 Sch 8 Group 5 (zero-rated construction — downstream first-major-interest sale anchor): https://www.legislation.gov.uk/ukpga/1994/23/schedule/8
- VATA 1994 Sch 9 Group 1 (exempt land — downstream letting exemption anchor): https://www.legislation.gov.uk/ukpga/1994/23/schedule/9
- VATA 1994 s.24 + s.26 (input-tax recovery framework): https://www.legislation.gov.uk/ukpga/1994/23/section/24
- SI 1995/2518 regs 112-116 (CGS — clawback on mixed-use change): https://www.legislation.gov.uk/uksi/1995/2518/part/XV

**HMRC guidance:**
- HMRC VAT Notice 708 (Buildings and construction — sections 7 + 8 on reduced-rate conversions): https://www.gov.uk/government/publications/vat-notice-708-buildings-and-construction
- HMRC VCONST manual (VAT Construction): https://www.gov.uk/hmrc-internal-manuals/vat-construction
- HMRC VAT Notice 706 (Partial exemption — for residual-cost interaction): https://www.gov.uk/government/publications/vat-notice-706-partial-exemption

**Cross-references in house_positions.md:** §29 (Wave 8 VAT cluster — primary anchor); §29.1 (overview — VERIFY Group 6 vs Group 7 framing per drift catch); §29.7 (reduced rate 5% verbatim); §29.5 (CGS interaction); §29.11 do-not-write list ("Reduced rate is 0%" forbidden — 5% per Sch 7A, 0% is zero-rating per Sch 8); §16.45 drift discipline.

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 7A Group 6 description verbatim against legislation.gov.uk; verify Sch 7A Group 7 covers renovation / alteration of empty residential premises (NOT changed-number-of-dwellings — that is a Group 6 qualifying-conversion category — flag §29.1 internal inconsistency to manager); verify VATA 1994 s.29A is the reduced-rate operative provision; verify Sch 8 Group 5 Item 1 zero-rated first-major-interest dwelling sale; verify Sch 8 Group 5 Note 22 building-materials definition; verify CGS £250k threshold per §29.5 + §16.27 rate-by-reference.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section + Schedule + Group references.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Property developer + Conversion-project landlord.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the qualifying-conversion / qualifying-services definition section (highest intent: developer scoping a conversion)
  - After the developer downstream recovery flow section (intent: developer modelling input-tax recovery)
  - Optionally after the CGS interaction section
- Vary opening; do NOT lead with "The 5% reduced rate for conversions...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on "does 5% apply to all conversion work" (no — only qualifying-services for qualifying-conversion categories), "can I buy materials directly to save VAT" (no — materials direct to developer attract 20%, only contractor-supplied materials get 5%), and "can I recover the 5% input VAT" (yes if downstream sale is zero-rated first major interest; no if downstream is exempt letting).

### Cannibalisation
- Cross-link existing both-directions page in opening + closing as the both-directions overview companion.
- Cross-link `vat-on-new-builds-residential-property` for the zero-rated downstream sale leg.
- Cross-link C1 pillar for the opt-to-tax acquisition leg.
- Forward-link C5 for the partial-exemption interaction.

### House positions
- §29 primary; §29.7 verbatim.
- §29.11 do-not-write list — "Reduced rate is 0%" forbidden.
- §16.45 — qualifying conversions only; Sch 7A Group 6 not Group 7 for the operative reduced-rate.
- Flag §29.1 Group 7 framing drift to manager in work-log.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is qualifying-conversion category typology + developer downstream recovery flow + CGS interaction. Write to it.
- Vary H2s from existing conversion-overview page.

---

## Workflow (per page; claim ONE page at a time)

See NETNEW_PROGRAM §4.9 (verbatim 19 steps). Key per-page anchors for this brief: §29 + §29.7 + §29.5 mandatory; §16.45 drift discipline. Flag Group 6 vs Group 7 framing in §29.1 to manager. Per §16.35: re-verify Sch 7A Group 6 verbatim, s.29A operative status, Sch 8 Group 5 zero-rated first-major-interest cite, CGS regs 112-116 mid-period change-of-use clawback mechanics.

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
