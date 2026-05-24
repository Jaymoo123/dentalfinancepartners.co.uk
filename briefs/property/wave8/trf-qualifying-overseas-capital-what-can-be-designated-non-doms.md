# Wave 8 brief: trf-qualifying-overseas-capital-what-can-be-designated-non-doms

**Site:** property
**Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
**Session:** A
**Pick ID:** A5
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/trf-qualifying-overseas-capital-what-can-be-designated-non-doms.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-dom-and-international/trf-qualifying-overseas-capital-what-can-be-designated-non-doms

---

## Manager pre-decisions

- **Suggested slug:** `trf-qualifying-overseas-capital-what-can-be-designated-non-doms`
- **Suggested category:** `non-dom-and-international`
- **Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> Source-categorisation walk-through of what CAN and CANNOT be designated under TRF. Page anchors verbatim on **FA 2025 Sch 10 para 2** with the THREE qualifying scenarios most competitor coverage collapses into a single "pre-2025-26 unremitted balance" headline. (a) **Scenario A (Sch 10 para 2(2)) — unremitted at designation.** Amounts that (i) arose in tax year 2024-25 or earlier as foreign income / gains; (ii) have NOT been remitted to UK by the designation date; (iii) would (absent TRF) trigger income tax under ITEPA 2003 ss.22, 26, 41F, 554Z9, 554Z10 OR ITTOIA 2005 s.832 OR CGT under TCGA 1992 Sch 1 on later remittance. The classic remittance-basis stockpile case. (b) **Scenario B (Sch 10 para 2(5)) — remitted during 2025-28 window.** Amounts that (i) arose pre-2025-26 as foreign income / gains; (ii) ARE remitted during 2025-26 to 2027-28; (iii) trigger remittance taxation on that remittance. So physical remittance during the TRF window can still attract the 12% / 12% / 15% rate via designation — the "remitted but designated" case competitor coverage often misses. (c) **Scenario C (Sch 10 para 2(8)) — capital acquired pre-6-April-2025 held offshore continuously.** Capital held before 6 April 2025, situated outside UK when acquired and continuously thereafter — a separate qualifying category that HP §17.9 does NOT currently list (Stage 2 drift catch surfaced 2026-05-25). This expansion catches asset bases (not just income / gain accumulations) that an individual brought into existence pre-2025-26 — relevant for the "what is the capital constituting my offshore portfolio" question. (d) **Partial designation allowed — £-amount specific.** Election specifies the £-amount designated, not full source coverage. A non-dom holding £500k offshore can designate £100k and leave £400k subject to normal remittance taxation on later remittance. No requirement to designate "everything from this source". Sessions write a worked partial-designation example. (e) **Mixed-fund interaction (ITA 2007 s.809L).** The mixed-fund identification rules continue to govern non-designated balances. A non-dom with mixed clean capital + pre-2025-26 income in a single account who designates only the income portion must apply s.809L to track which £ is which on later remittance — designation itself does NOT resolve mixed-fund ordering. (f) **Excluded categories.** TRF designation excludes: post-2024-25 foreign income / gains (these go into FIG window if eligible per A1, otherwise arising basis); pre-2008 mixed-fund balances that already had clean-capital identification done; amounts that have already triggered remittance taxation pre-2025-26. NOT writing TRF rate mechanics (A4 separate) or FIG-vs-TRF population distinction (A3 covers). Cross-reference §17.9 + §17.6.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 2 manager note:** Stage 2 cross-check against FA 2025 Sch 10 para 2 on legislation.gov.uk on 2026-05-25 revealed THREE qualifying overseas capital scenarios (para 2(2) unremitted; para 2(5) remitted in window; para 2(8) pre-6-April-2025 held offshore continuously). HP §17.9 currently lists only two scenarios (essentially A and B collapsed). Brief surfaces the third scenario as HP drift for Stage 2b closure. Mixed-fund s.809L interaction is the highest-confusion point for the cohort — many will assume TRF designation auto-orders subsequent remittances. It does not.

**Pool-thinness disclosure:** Big-four coverage tends to bullet "any pre-2025-26 foreign income or gain" as qualifying without working the three-scenario architecture or the mixed-fund s.809L interaction. The verbatim Sch 10 para 2 walk + mixed-fund clarification is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of qualifying capital scope (verify if they distinguish three scenarios); mixed-fund interaction (most don't cover); partial designation; excluded categories.

- https://www.saffery.com/insights/articles/temporary-repatriation-facility-trf/
- https://www.bdo.co.uk/en-gb/insights/tax/private-client/temporary-repatriation-facility
- https://www.evelyn.com/insights-and-events/insights/the-temporary-repatriation-facility/
- https://www.rsmuk.com/insights/private-client-services/temporary-repatriation-facility
- https://www.taylorwessing.com/en/insights-and-events/insights/2024/uk-non-dom-reform-trf

**Borrowable patterns:** competitor source-categorisation tables (verify); excluded-categories lists.

---

## GSC data

*Net-new page; primary topical queries expected: "TRF qualifying capital", "what can I designate TRF", "TRF mixed fund", "TRF pre-2025-26 income", "Sch 10 para 2 TRF", "TRF partial designation".*

---

## Closest existing pages (cannibalisation context)

- `non-dom-reform-april-2025-fig-regime-property-investors` (cannibal score 0.28 — headline)
- `non-resident-cgt-selling-uk-property-overseas-guide` (0.10 — NRCGT adjacent but unrelated; do not cross-link)
- `non-resident-landlord-self-assessment-filing-requirements` (0.12 — adjacent compliance only)
- A4 (TRF mechanics) — back-link as mechanics companion

**Cannibalisation discipline:**
- Cross-link A4 (TRF rate mechanics) as the companion. Clean separation — A4 is mechanics, A5 is what-qualifies.
- Vary persona figures from A1, A2, A3, A4.

---

## Redirect overlap (on launch)

No existing slug matches A5's TRF-qualifying-capital scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (TRF qualifying capital):**
- FA 2025 Sch 10 para 2 (qualifying overseas capital definition — three scenarios): https://www.legislation.gov.uk/ukpga/2025/8/schedule/10
- FA 2025 s.41 (inserting Act): https://www.legislation.gov.uk/ukpga/2025/8/section/41
- ITEPA 2003 s.22 (general earnings remittance trigger): https://www.legislation.gov.uk/ukpga/2003/1/section/22
- ITEPA 2003 ss.26, 41F, 554Z9, 554Z10 (employment / disguised remuneration triggers — for source-coverage scope)
- ITTOIA 2005 s.832 (foreign-income remittance trigger): https://www.legislation.gov.uk/ukpga/2005/5/section/832
- TCGA 1992 Sch 1 (CGT on remittance trigger): https://www.legislation.gov.uk/ukpga/1992/12/schedule/1
- ITA 2007 s.809L (mixed-fund identification rules — interact with designation): https://www.legislation.gov.uk/ukpga/2007/3/section/809L
- ITA 2007 s.809B (historic remittance basis claim — eligibility context): https://www.legislation.gov.uk/ukpga/2007/3/section/809B

**Government guidance:**
- gov.uk "Changes to the taxation of non-UK domiciled individuals" (TRF qualifying capital): https://www.gov.uk/guidance/changes-to-the-taxation-of-non-uk-domiciled-individuals
- HMRC RDRM (Residence, Domicile and Remittance Manual) — mixed-fund chapter for s.809L cross-reference

**Cross-references in house_positions.md:** §17.9 (TRF mini-lock — primary anchor; flag HP gap on third qualifying scenario at Stage 2b); §17.9.1 (citations); §17.9.2 (do-not-write); §17.6 (headline framing); §17.8 (FIG — for population distinction).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify Sch 10 para 2 wording for all three scenarios (para 2(2), para 2(5), para 2(8)). Verify s.809L mixed-fund identification rules continue to apply post-TRF (TRF does not displace mixed-fund). Verify excluded categories — post-2024-25 income / gains specifically excluded from TRF; pre-2008 clean-capital balances already identified excluded by definition. Sessions must NOT extend TRF to post-2024-25 sources.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references verbatim.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise Historic non-dom + Pre-2025-26 remittance basis claimant + Mixed-fund account holder.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the three-scenarios verbatim walk-through (high-intent: reader matching their portfolio to a scenario)
  - After the mixed-fund interaction section (technical hook — most readers do not know s.809L continues to apply)
  - Optionally after the partial-designation worked example
- Vary opening; do NOT lead with "TRF designation works...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQs on the three scenarios + mixed-fund interaction.

### Cannibalisation
- Cross-link A4. Do NOT re-walk rate mechanics.
- Vary persona figures from A1, A2, A3, A4.

### House positions
- §17.9 primary; surface HP gap on third qualifying scenario at Stage 2b.
- §17.9.2 do-not-write list — "TRF extends to post-2024-25" forbidden; "designation requires physical remittance" forbidden.
- §16.45 — three-scenario walk verbatim.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is three-scenarios walk + mixed-fund s.809L interaction + partial-designation worked example. Write to it.
- Vary H2s from A1, A2, A3, A4.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

See `docs/property/NETNEW_PROGRAM.md` §4.9 for the verbatim 19-step workflow. Session must follow steps 1-19 in order. Wave 8 Bucket A specific overrides:
- Step 1: Read §17.9 + §17.6 + §17.8 (three HP sections).
- Step 7: Mandatory §16.35 re-verifications listed in "Universal rules" above. Surface third-scenario HP gap to Stage 2b manager.
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
