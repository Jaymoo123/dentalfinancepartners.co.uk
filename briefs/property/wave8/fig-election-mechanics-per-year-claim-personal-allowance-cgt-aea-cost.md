# Wave 8 brief: fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost

**Site:** property
**Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
**Session:** A
**Pick ID:** A2
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-dom-and-international/fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost

---

## Manager pre-decisions

- **Suggested slug:** `fig-election-mechanics-per-year-claim-personal-allowance-cgt-aea-cost`
- **Suggested category:** `non-dom-and-international`
- **Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> The hidden cost calculus of the FIG election. Page anchors verbatim on **ITTOIA 2005 s.845A** (claim mechanism + Step 2 deduction per ITA 2007 s.23) and walks the operational mechanics that competitor coverage glosses. (a) **Per-year claim, not automatic** — s.845A wording is "An individual may make a claim for relief for a tax year under this section (a 'foreign income claim')" — failure to claim in any specific year forfeits that year's relief permanently; a four-year FIG window is in practice up to four separate elections, not a single election covering the whole window. (b) **Claim deadline** — per s.845A the foreign income claim "must be made before the end of the period of 12 months beginning with 31 January after the end of that tax year" — so for 2025-26 claims the deadline is **31 January 2028**; sessions must NOT cite TMA 1970 s.43 (4 years) as the deadline. The s.845A deadline is shorter than the standard amendment window. (c) **Allowances forfeited.** Claiming FIG in a tax year forfeits **the personal allowance** (ITA 2007 s.35), **the dividend allowance** (ITA 2007 s.13A), AND **the CGT annual exempt amount** (TCGA 1992 Sch 1 para 1) for that tax year — identical architecture to the historic remittance basis under ITA 2007 s.809G. (d) **Breakeven calculation worked.** For 2026-27 (personal allowance £12,570 framed by-reference per §16.27, dividend allowance £500, CGT AEA £3,000 — verify gov.uk at write time): forfeiting these three allowances at marginal 40% + dividend higher 33.75% + CGT 18-24% means the FIG claim is economically negative where foreign income / gains are below approximately £10-15k for a higher-rate taxpayer. (e) **No automatic comparison HMRC tool** — the claim is binary, not "claim the better of FIG or arising-basis" per year; sessions must walk the manual breakeven test in the self-assessment return. (f) **Step 2 mechanics.** s.845A applies the relief at Step 2 of ITA 2007 s.23 (deducting reliefs from total income to arrive at net income BEFORE personal allowance is applied at Step 3) — so FIG-claimed income is mechanically removed from the calculation flow before allowances would apply, which is what triggers the allowance forfeiture as a corollary not a separate election. Cross-reference §17.8 + §17.6. NOT writing eligibility-gateway depth (A1) or year-5 cliff planning (A3) or trust-of-minor settlement attribution (parking for later).

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 2 manager note:** Stage 2 cross-check against ITTOIA 2005 s.845A on legislation.gov.uk on 2026-05-25 confirmed the s.845A claim deadline is "12 months from 31 January after end of tax year" — NOT TMA 1970 s.43 (4 years from end of tax year). HP §17.8 currently cites s.43; this is the operational claim deadline that controls. Brief surfaces this as HP drift for manager Stage 2b closure. s.845A subsection (3A) restricts the deduction "only from qualifying foreign income" — important nuance: FIG is not a global income exemption, the deduction is hypothecated to foreign income / gains.

**Pool-thinness disclosure:** Big-four coverage gives the headline "claim forfeits PA" but few work the year-by-year breakeven calculation explicitly or surface the s.845A 12-month-from-31-Jan deadline specifically (most cite the 4-year amendment window from confusion with s.43). The worked-breakeven plus deadline-clarification is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract claim-mechanism depth, deadline citations (verify whether they cite s.845A or s.43), worked breakeven examples, allowance-forfeiture treatment, Step 2 calculation walk-throughs.

- https://www.charteredaccountants.co.uk/insights/fig-claim-or-not
- https://www.gov.uk/government/publications/reforming-the-taxation-of-non-uk-domiciled-individuals
- https://www.deloitte.com/uk/en/services/tax/perspectives/non-dom-reform.html
- https://www.pwc.co.uk/services/tax/insights/non-dom-reform-2025.html
- https://www.kpmg.com/uk/en/home/insights/2024/03/non-dom-reform.html

**Borrowable patterns:** competitor breakeven-calculation tables (if any); allowance-loss visual summaries.

---

## GSC data

*Net-new page; primary topical queries expected: "FIG election cost", "FIG claim personal allowance", "FIG vs arising basis breakeven", "ITTOIA 845A claim deadline", "FIG worth it small foreign income", "claim FIG self assessment".*

---

## Closest existing pages (cannibalisation context)

- `non-dom-reform-april-2025-fig-regime-property-investors` (cannibal score 0.38 — headline; **clean separation — that page is policy; A2 is mechanics depth**)
- `tax-efficient-property-investment-structure-guide` (0.16 — broader structure planning; cross-link only as "wider context" anchor)
- `end-tax-year-checklist-landlords-april-2026` (0.21 — year-end timing; cross-link as the deadline-discipline companion)
- A1 (FIG eligibility) — back-link as eligibility prerequisite
- A3 (year-5 cliff) — forward-link as post-window companion

**Cannibalisation discipline:**
- Cross-link A1 (gateway test) — do NOT re-walk eligibility conditions.
- Vary persona figures from A1, A3.

---

## Redirect overlap (on launch)

No existing slug matches A2's election-mechanics scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (FIG election mechanics):**
- ITTOIA 2005 s.845A (claim mechanism + Step 2 deduction): https://www.legislation.gov.uk/ukpga/2005/5/section/845A
- ITTOIA 2005 s.845B (qualifying new resident test + 4-year window): https://www.legislation.gov.uk/ukpga/2005/5/section/845B
- ITTOIA 2005 s.845H (qualifying foreign income categories): https://www.legislation.gov.uk/ukpga/2005/5/section/845H
- FA 2025 s.37 (inserting Act): https://www.legislation.gov.uk/ukpga/2025/8/section/37
- ITA 2007 s.23 (Step 2 of income tax calculation): https://www.legislation.gov.uk/ukpga/2007/3/section/23
- ITA 2007 s.35 (personal allowance — for forfeiture framing): https://www.legislation.gov.uk/ukpga/2007/3/section/35
- ITA 2007 s.809G (historic remittance basis allowance-forfeiture parallel — historic citation for comparison): https://www.legislation.gov.uk/ukpga/2007/3/section/809G
- TCGA 1992 Sch 1 para 1 (CGT annual exempt amount — for forfeiture framing): https://www.legislation.gov.uk/ukpga/1992/12/schedule/1

**Government guidance:**
- gov.uk "Income Tax rates and Personal Allowances" (PA value — verify at write time): https://www.gov.uk/income-tax-rates
- gov.uk "Capital Gains Tax allowances" (AEA value): https://www.gov.uk/capital-gains-tax/allowances

**Cross-references in house_positions.md:** §17.6 (headline framing); §17.8 (operative FIG mini-lock — primary anchor; especially §17.8.2 forfeit-PA point); §17.8.1 (citations); §16.27 (rate-by-reference discipline — PA / dividend allowance / CGT AEA all rate-by-reference); §21 (corporation tax framework — irrelevant but cross-link for "individual vs company" framing context).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify s.845A wording — confirm per-year claim, confirm "12 months from 31 January after end of tax year" deadline (NOT TMA 1970 s.43). Verify personal allowance £12,570 for 2026-27 against gov.uk rates page. Verify dividend allowance £500 for 2026-27 against gov.uk. Verify CGT AEA £3,000 for 2026-27 against gov.uk. Verify ITA 2007 s.23 Step 2 sequence (Steps 1-7 — relief at Step 2 means before allowance application). All values are rate-by-reference per §16.27 — sessions writing later tax years must re-verify.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references verbatim.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise International landlord + Returning UK resident + High-foreign-income individual.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the s.845A per-year claim mechanics section (high-intent: planning current-year claim)
  - After the breakeven calculation walk-through (educational hook — most readers will not have run the maths)
  - Optionally after the allowance-forfeiture comparison vs historic remittance basis
- Vary opening; do NOT lead with "The FIG election mechanics work...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQ on the s.845A deadline (most readers will assume s.43 4-year window).

### Cannibalisation
- Cross-link A1 (eligibility gateway). Do NOT re-walk s.845B(1) conditions.
- Forward-link A3 (year-5 cliff).
- Vary persona figures from A1, A3.

### House positions
- §17.6 + §17.8 primary.
- §17.8.2 do-not-write list — "FIG preserves PA" forbidden; "FIG is automatic" forbidden.
- §16.27 rate-by-reference for PA / dividend allowance / CGT AEA.
- §16.45 — verbatim s.845A walk + correct deadline mandatory.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is worked breakeven + s.845A deadline clarification + Step 2 mechanics walk. Write to it.
- Vary H2s from A1, A3.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

See `docs/property/NETNEW_PROGRAM.md` §4.9 for the verbatim 19-step workflow. Session must follow steps 1-19 in order. Wave 8 Bucket A specific overrides:
- Step 1: Read §17.6 + §17.8 + §16.27 (three HP sections).
- Step 7: Mandatory §16.35 re-verifications listed in "Universal rules" above. Surface s.845A-vs-s.43 deadline distinction to Stage 2b manager if HP not closed by then.
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
