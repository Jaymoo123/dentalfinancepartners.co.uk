# Wave 8 brief: returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility

**Site:** property
**Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
**Session:** A
**Pick ID:** A10
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-dom-and-international/returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility

---

## Manager pre-decisions

- **Suggested slug:** `returning-to-uk-after-non-residence-section-10a-recapture-fig-eligibility`
- **Suggested category:** `non-dom-and-international`
- **Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> The cross-regime interaction page — two distinct regimes hit the returning UK landlord on re-arrival. Page anchors verbatim on **TCGA 1992 s.10A** (5-year temporary non-residence CGT recapture; departures after 5 April 2013) AND **ITTOIA 2005 s.845B(1)** (FIG eligibility — 10-tax-year prior non-residence requirement per A1 brief). A10 cross-references A7 (LTR test for IHT scope on re-arrival) + A1-A3 (FIG eligibility cluster) + §17.3 (s.10A architecture). (a) **The two clocks are different lengths.** s.10A operates on a **5-year-or-less** non-residence window — gains realised during departure period are recaptured in year of return if the individual was previously UK-resident in 4-of-7 tax years before departure. FIG operates on a **10-tax-year-or-more** prior non-residence requirement for eligibility on re-arrival per s.845B(1). The two windows are independent: a 6-year non-residence period escapes s.10A recapture (>5 years) BUT also fails FIG eligibility (<10 years prior non-residence). The "Goldilocks gap" of 6-9 years means no recapture but also no FIG access. (b) **Worked timeline.** Landlord departs UK 30 June 2026 (split-year Case 1 if applicable). 7 complete tax years non-resident (2027-28 through 2033-34). Returns to UK 1 May 2034. Outcomes: (i) s.10A NOT engaged — 7 years > 5-year temporary-non-residence threshold; departure-period gains stay non-UK-taxed. (ii) FIG NOT available — 7 years < 10-tax-year prior non-residence requirement at s.845B(1); 2034-35 income / gains assessed on arising basis. (iii) IHT LTR status — per A7's s.6A test, the 7-year departure + a 15-of-20 pre-departure history is INSUFFICIENT to lose LTR status (15 prior years requires 5 consecutive non-UK years per s.6A(3) — they have 7, so they did lose LTR, but they regain it gradually as the 10-of-20 window re-fills with UK-resident years post-2034-35). (c) **The two-clocks interaction matters most for the 3-9 year departure profile.** Departures <5 years: both s.10A (yes recapture) AND FIG (no, <10 years prior). Departures 5-9 years: no s.10A recapture BUT no FIG. Departures >=10 years: no s.10A AND FIG available subject to other s.845B conditions. Sessions write the table explicitly. (d) **SRT split-year chain-break.** A split-year departure (Case 1 starting full-time overseas work) sets the non-residence chain start. A split-year arrival (Case 4 / 5 / 6 / 7 / 8) for the s.845B(1) test breaks the "each of the 10 tax years before that tax year" chain — partial-year residence in the 10th tax year disqualifies. Sessions writing must check SRT cascade per §17.1 + §17.2. (e) **s.10A operates on assets owned at departure.** Per TCGA 1992 s.10A — gains on assets owned at departure, disposed during non-residence, are deemed to arise in the year of return. Gains on assets acquired AND disposed during the non-residence period are NOT caught by s.10A (separate from FIG; assessed under non-resident rules at the time). NRCGT (§17.4) operates regardless on UK land disposals. (f) **The income parallel — ITA 2007 s.812.** s.10A's income twin — dividend / pension lump-sum income during temporary non-residence is recaptured in year of return on the same 5-year test. Sessions should note this for non-property-portfolio context. Cross-reference §17.3 + §17.6 + §17.8 + §17.1 + §17.2 + §22.X.1 (LTR cross-ref). NOT writing FIG eligibility headline (A1 covers) or LTR IHT depth (A7 covers).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 2 manager note:** Stage 2 cross-check on TCGA 1992 s.10A had limited extract from legislation.gov.uk (page returned ellipsis), so the 5-year + 4-of-7 framing is anchored on HP §17.3 (Wave 2 lock verified against HMRC CG26540 on 2026-05-22) + HMRC Capital Gains Manual cross-reference. Sessions writing must re-verify s.10A wording at write time. ITTOIA 2005 s.845B(1) 10-tax-year wording verified verbatim 2026-05-25. The two-clocks interaction surfaces an HP gap — neither §17.3 nor §17.8 explicitly works the cross-window interaction; brief surfaces this as content-side gap (not HP doctrine drift; just an unwritten interaction worth flagging). The age-floor and "not disqualified" sub-conditions at s.845B(1) noted in A1 brief apply to A10 returning-to-UK scenarios identically.

**Pool-thinness disclosure:** Big-four / Saffery / BDO coverage tends to handle s.10A and FIG as separate topics on separate pages, rarely working the cross-window interaction explicitly. The two-clocks-three-zones (recapture, gap, FIG) framing is genuinely net-new. Defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of returning-to-UK planning (likely fragmented across multiple pages); cross-window FIG-vs-s.10A interaction (rare); split-year chain-break treatment.

- https://www.saffery.com/insights/articles/temporary-non-residence-return-uk/
- https://www.bdo.co.uk/en-gb/insights/tax/private-client/returning-to-uk-tax
- https://www.rsmuk.com/insights/private-client-services/returning-uk-residence
- https://www.evelyn.com/insights-and-events/insights/returning-to-uk-residence/
- https://www.taylorwessing.com/en/insights-and-events/insights/returning-uk-tax-planning

**Borrowable patterns:** competitor returning-to-UK timelines (verify); s.10A worked examples.

---

## GSC data

*Net-new page; primary topical queries expected: "return to UK after non residence", "s.10A temporary non resident CGT", "FIG eligibility return UK", "5 year vs 10 year non residence", "moving back to UK tax", "temporary non residence FIG".*

---

## Closest existing pages (cannibalisation context)

- `returning-to-uk-after-non-residence-property-portfolio` (cannibal score 0.55 — headline; **clean separation — that page is the returning-to-UK headline; A10 is the s.10A + FIG cross-regime interaction depth; cross-link as headline-to-depth pairing**)
- `temporary-non-residence-5-year-cgt-recapture-property` (0.42 — s.10A pillar; **back-link as the s.10A pillar; do NOT re-walk s.10A architecture**)
- `non-dom-reform-april-2025-fig-regime-property-investors` (0.30 — FIG headline)
- `srt-statutory-residence-test-landlord-decision-tree` (0.20 — SRT pillar for split-year)
- A1 (FIG eligibility gateway) — back-link as FIG cross-reference
- A7 (LTR pillar) — back-link as IHT cross-reference

**Cannibalisation discipline:**
- Cross-link `returning-to-uk-after-non-residence-property-portfolio` + `temporary-non-residence-5-year-cgt-recapture-property` as the two existing pillars (A10 is the interaction page, not a duplicate of either).
- Vary persona figures from A1, A3, A7.

---

## Redirect overlap (on launch)

No existing slug matches A10's two-clocks-interaction scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (s.10A + FIG + SRT):**
- TCGA 1992 s.10A (temporary non-residence — 5-year recapture): https://www.legislation.gov.uk/ukpga/1992/12/section/10A
- ITTOIA 2005 s.845B (FIG qualifying new resident test): https://www.legislation.gov.uk/ukpga/2005/5/section/845B
- ITTOIA 2005 s.845A (FIG claim mechanism): https://www.legislation.gov.uk/ukpga/2005/5/section/845A
- ITA 2007 s.812 (income parallel to s.10A — dividend / lump-sum recapture): https://www.legislation.gov.uk/ukpga/2007/3/section/812
- FA 2013 Sch 45 (SRT statutory test — applied for s.845B + s.10A residence determinations): https://www.legislation.gov.uk/ukpga/2013/29/schedule/45
- TCGA 1992 s.1A (NRCGT — applies regardless during non-residence): https://www.legislation.gov.uk/ukpga/1992/12/section/1A
- IHTA 1984 s.6A (LTR test — for IHT scope on re-arrival): https://www.legislation.gov.uk/ukpga/1984/51/section/6A
- FA 2025 s.37 (FIG inserting Act): https://www.legislation.gov.uk/ukpga/2025/8/section/37

**Government guidance:**
- HMRC Capital Gains Manual CG26540 onwards (s.10A operational guidance): https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual
- HMRC RDR3 (SRT operational guidance): https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt
- gov.uk "Tax if you return to the UK": https://www.gov.uk/tax-return-uk

**Cross-references in house_positions.md:** §17.3 (s.10A — primary anchor; verified against HMRC CG26540 on 2026-05-22); §17.6 (headline framing); §17.8 (FIG operational); §17.1 (SRT); §17.2 (split-year cases); §22.X.1 (LTR test for IHT scope on re-arrival).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify TCGA 1992 s.10A wording at write time (legislation.gov.uk extract was thin on 2026-05-25; cross-verify via HMRC CG26540). Confirm 5-year threshold + 4-of-7 prior residence test. Verify ITTOIA 2005 s.845B(1) 10-tax-year prior non-residence requirement. Verify ITA 2007 s.812 income parallel. Verify SRT cascade per §17.1 + §17.2. Sessions writing departure timelines must apply SRT split-year cases correctly — particularly Case 4 / 5 / 6 / 7 / 8 for arrivals (chain-break risk on FIG test).

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references verbatim.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Returning UK resident + Long-term expat + International landlord.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the two-clocks-three-zones table (high-intent: reader self-identifying departure-length zone)
  - After the worked 7-year-departure timeline (planning hook — sees exact recapture vs FIG outcomes)
  - Optionally after the SRT split-year chain-break section
- Vary opening; do NOT lead with "Returning to the UK after non-residence...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQs on the two-clocks distinction + the 5-9 year "no recapture but no FIG" gap + the split-year chain-break.

### Cannibalisation
- Cross-link `returning-to-uk-after-non-residence-property-portfolio` + `temporary-non-residence-5-year-cgt-recapture-property` + A1.
- Forward-link A7 for IHT-on-return scope.
- Vary persona figures from A1, A3, A7.

### House positions
- §17.3 + §17.8 primary; §17.1 + §17.2 SRT cross-ref.
- §17.8.2 do-not-write list — "FIG is automatic on return" forbidden; "7-year prior non-residence" forbidden.
- §16.45 — two-clocks (5-year vs 10-year) distinction non-negotiable.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is two-clocks-three-zones interaction + worked 7-year timeline + split-year chain-break analysis. Write to it.
- Vary H2s from A1, A3, A7.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

See `docs/property/NETNEW_PROGRAM.md` §4.9 for the verbatim 19-step workflow. Session must follow steps 1-19 in order. Wave 8 Bucket A specific overrides:
- Step 1: Read §17.3 + §17.6 + §17.8 + §17.1 + §17.2 + §22.X.1 (six HP sections — s.10A + FIG headline + FIG operational + SRT cascade + split-year + LTR for IHT cross-ref).
- Step 7: Mandatory §16.35 re-verifications listed in "Universal rules" above. s.10A verbatim re-check against legislation.gov.uk + HMRC CG26540.
- Step 14: Commit BEFORE marking done; do NOT include tracker.
- A10 publishes AFTER A1 + A7 (forward-links to those pillars).

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
