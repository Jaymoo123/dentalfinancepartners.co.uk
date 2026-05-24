# Wave 8 brief: fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords

**Site:** property
**Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
**Session:** A
**Pick ID:** A1
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-dom-and-international/fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords

---

## Manager pre-decisions

- **Suggested slug:** `fig-regime-qualifying-new-resident-10-year-non-residence-test-landlords`
- **Suggested category:** `non-dom-and-international`
- **Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Operational walk-through of the FIG eligibility gateway for landlord-emigrants returning to the UK, anchored verbatim on **ITTOIA 2005 s.845B(1)** (inserted by FA 2025 s.37(1)(4), effective tax year 2025-26). Competitor coverage anchors on the headline "4-year window" but skips the gateway-test mechanics. The page walks the **four cumulative conditions** that s.845B(1) actually imposes: (a) the individual is **UK resident for that tax year**; (b) the individual is **not disqualified** for that tax year (a defined exclusion at s.845B(4) covering certain residence-pattern artefacts); (c) the individual was **not UK resident for each of the 10 tax years before that tax year** (the 10-tax-year prior-non-residence test — the headline gateway); (d) the individual is **at least 10 years old at commencement of the tax year** (the age-floor most competitor coverage omits entirely, relevant for trust-of-minor structures). Page also surfaces the SRT (FA 2013 Sch 45) interaction — partial-year residence triggered by split-year treatment (§17.2 Cases 1-8) **breaks the consecutive-non-residence chain** unless the individual was non-resident for the full tax year under the SRT cascade, because s.845B(1) tests against a full tax year not a part-year. Counter-narrative: the regime has **no partial-eligibility taper** for individuals who fail by 1 or 2 tax years — the 10-tax-year requirement is binary, no scaled-down 2-year or 3-year window for those with 8-of-10 prior non-residence. Compare with the historic remittance basis which had no prior-non-residence threshold and was indefinite. Cross-reference §17.6 (headline) + §17.8 + §15.6 (LTR IHT framework) + §22.X.1 (s.6A LTR test using same SRT residence concept). NOT writing election mechanics (A2 separate) or post-window cliff planning (A3 separate) or TRF interaction beyond a sentence pointer.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 2 manager note:** Stage 2 cross-check against legislation.gov.uk on 2026-05-25 confirmed s.845B(1) imposes four cumulative conditions including an age-floor of 10 years that HP §17.8 currently omits. Sessions must include the age-floor — relevant for trust-of-minor planning. Brief surfaces this as an HP gap for manager closure at Stage 2b. ITTOIA 2005 s.845A claim deadline is "12 months from 31 January after end of tax year" per the section text — NOT TMA 1970 s.43 (4 years), which HP §17.8 currently cites. Sessions write s.845A deadline mechanics, not s.43 (s.43 only relevant for return-amendment, not claim-creation).

**Pool-thinness disclosure:** Big-four / RSM / Saffery / Evelyn / BDO coverage is consistent on the headline "4 years exempt" framing but inconsistent on the s.845B age-floor and on whether split-year breaks the chain. The verbatim s.845B(1) walk-through plus the SRT-chain-break analysis is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of s.845B prior-non-residence test, whether they cite the verbatim section, whether they cover the age-floor, whether they cover split-year chain-break, comparison framing vs historic remittance basis.

- https://www.saffery.com/insights/articles/the-foreign-income-and-gains-regime-an-overview/
- https://www.bdo.co.uk/en-gb/insights/tax/private-client/abolition-of-the-non-dom-regime
- https://www.rsmuk.com/insights/private-client-services/the-new-uk-foreign-income-and-gains-regime
- https://www.crowe.com/uk/insights/non-dom-reform-fig-regime
- https://www.evelyn.com/insights-and-events/insights/the-uk-s-new-foreign-income-and-gains-fig-regime/

**Borrowable patterns:** competitor decision-tree visualisations for SRT cascade interactions; gateway-test flowcharts (verify s.845B(1) conditions match).

---

## GSC data

*Net-new page; primary topical queries expected: "FIG regime eligibility", "10 year non-residence FIG", "qualifying new resident UK tax", "ITTOIA 2005 s.845B", "FIG 4 year exemption rules", "moving to UK foreign income tax".*

---

## Closest existing pages (cannibalisation context)

- `non-dom-reform-april-2025-fig-regime-property-investors` (cannibal score 0.42 — headline overview; **clean separation — that page is the policy headline, A1 is the operational gateway-test depth; link out to A1 as the eligibility-deep-dive companion**)
- `srt-statutory-residence-test-landlord-decision-tree` (0.31 — SRT pillar; **back-link to it for SRT cascade depth, cite §17.1 framework**)
- `temporary-non-residence-5-year-cgt-recapture-property` (0.18 — returning-to-UK adjacent territory but s.10A is a separate regime; cross-link only on the s.845B-vs-s.10A length-distinction point, which A10 covers as its primary thesis)
- A2 (FIG election mechanics) — forward-link as eligibility-then-election pairing
- A3 (year-5 cliff) — forward-link as post-window companion

**Cannibalisation discipline:**
- Cross-link `non-dom-reform-april-2025-fig-regime-property-investors` as headline policy companion (do NOT duplicate headline framing).
- Vary persona figures from A2, A3.

---

## Redirect overlap (on launch)

No existing slug matches A1's eligibility-gateway scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (FIG regime + SRT cross-reference):**
- ITTOIA 2005 s.845A (claim mechanism + Step 2 deduction): https://www.legislation.gov.uk/ukpga/2005/5/section/845A
- ITTOIA 2005 s.845B (qualifying new resident test + 4-year window): https://www.legislation.gov.uk/ukpga/2005/5/section/845B
- FA 2025 s.37 (inserting Act for FIG regime): https://www.legislation.gov.uk/ukpga/2025/8/section/37
- FA 2025 s.40 (remittance basis abolition from 2025-26): https://www.legislation.gov.uk/ukpga/2025/8/section/40
- FA 2013 Sch 45 (SRT statutory test applied by cross-reference): https://www.legislation.gov.uk/ukpga/2013/29/schedule/45
- ITA 2007 s.23 (Step 2 of income tax calculation): https://www.legislation.gov.uk/ukpga/2007/3/section/23

**Government guidance:**
- gov.uk "Changes to the taxation of non-UK domiciled individuals": https://www.gov.uk/guidance/changes-to-the-taxation-of-non-uk-domiciled-individuals
- HMRC RDRM (Residence, Domicile and Remittance Manual) — being rewritten; sessions must verify currency at write time: https://www.gov.uk/hmrc-internal-manuals/residence-domicile-and-remittance-basis
- HMRC RDR3 (SRT operational guidance) — Annex A sufficient-ties matrix

**Cross-references in house_positions.md:** §17.6 (headline framing — remittance basis abolished, FIG window introduced); §17.8 (operative FIG mini-lock — primary anchor); §17.8.1 (citations); §17.8.2 (do-not-write); §17.1 (SRT cascade — applied by cross-reference for s.845B "UK resident" definition); §17.2 (split-year Cases 1-8 — chain-break analysis); §15.6 (LTR IHT framework — note LTR uses same SRT but is a SEPARATE test from FIG eligibility); §22.X.1 (LTR test architecture for cross-comparison).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify s.845B(1) verbatim wording at write time (HP §17.8 currently omits the age-floor condition at s.845B(1)(d) — surface in body; manager closes HP gap at Stage 2b). Verify s.845A claim deadline is "12 months from 31 January after end of tax year" per the section text — NOT TMA 1970 s.43 (4 years). Verify s.845B(4) "not disqualified" definition. Verify FA 2025 s.37 effective date — tax year 2025-26 and subsequent. Verify ITA 2007 s.23 Step 2 reference. Verify SRT cascade order (FA 2013 Sch 45 Part 1 automatic overseas tests, then Part 1 automatic UK tests, then Part 1 sufficient ties — cross-reference §17.1).

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references verbatim.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Returning UK resident + International landlord + New UK arrival.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the s.845B(1) four-conditions walk-through (high-intent: reader checking eligibility for self)
  - After the SRT chain-break section (educational hook — most readers underestimate how split-year breaks the chain)
  - Optionally after the "no partial taper" framing
- Vary opening; do NOT lead with "The new FIG regime...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on the age-floor condition + the SRT chain-break.

### Cannibalisation
- Cross-link `non-dom-reform-april-2025-fig-regime-property-investors` (headline) + `srt-statutory-residence-test-landlord-decision-tree` (SRT pillar).
- Forward-link A2, A3.
- Vary persona figures from A2, A3.

### House positions
- §17.6 + §17.8 primary; verbatim from lock.
- §15.6 + §22.X.1 for LTR-vs-FIG distinction.
- §17.8.2 do-not-write list — "7 years prior non-residence" forbidden; "FIG is automatic" forbidden; "FIG covers UK source income" forbidden.
- §16.45 — verbatim s.845B(1) walk is non-negotiable.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is gateway-test depth (four conditions verbatim) + SRT chain-break + no-partial-taper counter-narrative. Write to it.
- Vary H2s from A2, A3 (planned).

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

See `docs/property/NETNEW_PROGRAM.md` §4.9 for the verbatim 19-step workflow. Session must follow steps 1-19 in order. Wave 8 Bucket A specific overrides:
- Step 1: Read §17.6 + §17.8 + §15.6 + §22.X.1 + §17.1 + §17.2 (six HP sections; the FIG-LTR-SRT triangle).
- Step 7: Mandatory §16.35 re-verifications listed in "Universal rules" above. Surface HP age-floor gap to Stage 2b manager if not closed.
- Step 14: Commit BEFORE marking done; do NOT include tracker.

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
