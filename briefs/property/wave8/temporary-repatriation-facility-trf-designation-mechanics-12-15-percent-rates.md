# Wave 8 brief: temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates

**Site:** property
**Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
**Session:** A
**Pick ID:** A4
**Brief type:** Net-new page
**Source markdown path on launch:** `Property/web/content/blog/temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates.md`
**Live URL on launch:** https://www.propertytaxpartners.co.uk/blog/non-dom-and-international/temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates

---

## Manager pre-decisions

- **Suggested slug:** `temporary-repatriation-facility-trf-designation-mechanics-12-15-percent-rates`
- **Suggested category:** `non-dom-and-international`
- **Bucket:** A (FIG / non-dom IHT / leaving-UK depth)
- **Framing differentiator (Stage 2, 2026-05-25):**

> The 3-year TRF designation election mechanics with verbatim rate-ramp anchoring on **FA 2025 s.41 + Sch 10**. (a) **Rate ramp verified verbatim against legislation.gov.uk on 2026-05-25** (FA 2025 Sch 10 para 1(8)): **12%** for designations in tax year 2025-26; **12%** for designations in tax year 2026-27; **15%** for designations in tax year 2027-28. Window closes 5 April 2028; no extension currently legislated. (b) **Designation deadline (FA 2025 Sch 10 para 8(1) verbatim):** elections "must be made before the end of the period of 12 months beginning with 31 January after the end of that tax year". So 2025-26 designations have a deadline of **31 January 2028**; 2026-27 designations have a deadline of **31 January 2029**; 2027-28 designations have a deadline of **31 January 2030**. Missing the deadline forfeits the TRF rate for that designation — post-deadline remittance falls back to normal-rate remittance taxation under the source statutory regime (ITTOIA 2005 s.832 / TCGA 1992 Sch 1 / ITEPA 2003 ss.22, 26, 41F, 554Z9, 554Z10). (c) **Rate-arbitrage worked calculation.** A non-dom holding £500k of pre-2024-25 unremitted foreign income / gains who designates £100k in 2026-27 pays 12% = £12,000 TRF charge. The same designation made in 2027-28 pays 15% = £15,000 TRF charge — a £3,000 cost of delay per £100k designated. For a £500k designation: 2026-27 cost £60,000; 2027-28 cost £75,000; delta £15,000. Sessions write the worked calculation explicitly. (d) **No-clean-capital benefit on designation.** Once designated and the charge paid, the £-amount becomes "clean capital" for UK tax purposes — no further UK tax on later physical remittance. This is the key benefit over arising-basis taxation post-2025-26 — without TRF, pre-2025-26 unremitted balances remain trapped (ITA 2007 s.809L mixed-fund rules continue to apply on later remittances). (e) **Designation does NOT require physical remittance.** Critical operational point — designation alone crystallises clean-capital status per Sch 10. A non-dom can designate £200k of pre-2024-25 income without physically bringing the money to the UK; pay 12% in 2025-26; later remit when convenient. Most competitor coverage gives only the rate-headline. NOT writing qualifying-overseas-capital category depth (A5 separate) or FIG eligibility (A1) or cliff planning (A3). Cross-reference §17.9 + §17.6.

If your reasoning suggests the slug/category should differ, you may override, but log the override and reason in the per-page work-log below.

**Stage 2 manager note:** Stage 2 cross-check against FA 2025 Sch 10 on legislation.gov.uk on 2026-05-25 confirmed verbatim: rate ramp 12% / 12% / 15% (para 1(8)); designation deadline "12 months beginning with 31 January after the end of that tax year" (para 8(1)). HP §17.9.2 do-not-write list correctly forbids "12% across all three years" + "designation deadline is the tax year end". The verbatim deadline wording is "12 months beginning with 31 January" — sessions must phrase exactly to avoid drift to "12 months after 31 January" (off-by-one risk). Sch 10 para 2 also revealed a third qualifying-overseas-capital scenario (para 2(8): capital held before 6 April 2025 situated outside UK when acquired and continuously thereafter) that HP §17.9 does not currently list — A5 brief covers this; flag for HP closure.

**Pool-thinness disclosure:** Saffery / BDO / RSM / Evelyn / Crowe coverage is consistent on the rate-headline but inconsistent on the deadline phrasing (several sources cite "tax year end + 12 months" or "31 January following tax year end" — both wrong; the statute says "12 months beginning with 31 January after the end of that tax year" which is approximately 22 months total from tax-year end). The verbatim deadline + worked rate-arbitrage calculation is the defensible point.

---

## Competitor URLs (Stage 2 populated; URL liveness verified at fetch time per §16.31)

**Fetch + read + extract instruction:** Standard httpx + BeautifulSoup. Extract treatment of rate ramp (verify 12% / 12% / 15%); deadline citations (flag drift if they say "tax year end" or "31 January following"); designation-vs-remittance distinction; worked rate-arbitrage examples.

- https://www.saffery.com/insights/articles/temporary-repatriation-facility-trf/
- https://www.bdo.co.uk/en-gb/insights/tax/private-client/temporary-repatriation-facility
- https://www.rsmuk.com/insights/private-client-services/temporary-repatriation-facility
- https://www.evelyn.com/insights-and-events/insights/the-temporary-repatriation-facility/
- https://www.crowe.com/uk/insights/temporary-repatriation-facility-non-doms

**Borrowable patterns:** competitor rate-comparison tables (verify); deadline-explanation diagrams.

---

## GSC data

*Net-new page; primary topical queries expected: "TRF designation 12%", "temporary repatriation facility deadline", "FA 2025 Schedule 10 TRF", "non dom TRF rate 2027", "TRF designation election", "TRF clean capital".*

---

## Closest existing pages (cannibalisation context)

- `non-dom-reform-april-2025-fig-regime-property-investors` (cannibal score 0.30 — headline; clean separation — that page is policy headline; A4 is TRF mechanics depth)
- `non-resident-cgt-selling-uk-property-overseas-guide` (0.10 — NRCGT adjacent but unrelated; do not cross-link)
- `leaving-uk-landlord-12-month-pre-departure-checklist` (0.15 — adjacent expat compliance)
- A5 (TRF qualifying capital) — forward-link as deep-dive on what can be designated

**Cannibalisation discipline:**
- Cross-link A5 as qualifying-capital companion (no overlap; A4 is mechanics, A5 is source-categorisation).
- Vary persona figures from A1, A2, A3, A5.

---

## Redirect overlap (on launch)

No existing slug matches A4's TRF-mechanics scope. No middleware edit required on initial launch.

---

## Authority links worth considering (Stage 2 populated 2026-05-25, session selects 6-8)

**Statutory (TRF operational):**
- FA 2025 s.41 (inserting Act): https://www.legislation.gov.uk/ukpga/2025/8/section/41
- FA 2025 Sch 10 (full operational detail): https://www.legislation.gov.uk/ukpga/2025/8/schedule/10
- ITA 2007 s.809B (historic remittance basis claim — TRF serves this cohort; historic citation): https://www.legislation.gov.uk/ukpga/2007/3/section/809B
- ITA 2007 s.809L (mixed-fund remittance rules — interact with TRF crystallisation): https://www.legislation.gov.uk/ukpga/2007/3/section/809L
- ITTOIA 2005 s.832 (foreign-income remittance trigger): https://www.legislation.gov.uk/ukpga/2005/5/section/832
- TCGA 1992 Sch 1 (CGT on remittance trigger): https://www.legislation.gov.uk/ukpga/1992/12/schedule/1
- ITEPA 2003 ss.22, 26, 41F, 554Z9, 554Z10 (employment / disguised remuneration remittance triggers): https://www.legislation.gov.uk/ukpga/2003/1/section/22

**Government guidance:**
- gov.uk "Changes to the taxation of non-UK domiciled individuals" (TRF section): https://www.gov.uk/guidance/changes-to-the-taxation-of-non-uk-domiciled-individuals
- HMRC RDRM (Residence, Domicile and Remittance Manual) — being rewritten for TRF: https://www.gov.uk/hmrc-internal-manuals/residence-domicile-and-remittance-basis

**Cross-references in house_positions.md:** §17.9 (TRF mini-lock — primary anchor); §17.9.1 (citations); §17.9.2 (do-not-write); §17.6 (headline framing); §17.8 (FIG — for distinction-not-conflation framing); §16.27 (rate-by-reference for the underlying remittance-source rates).

---

## Universal rules (do not skip)

**§16.35 per-write verification (mandatory):** Verify rate ramp 12% / 12% / 15% against FA 2025 Sch 10 para 1(8) verbatim. Verify deadline wording — "12 months beginning with 31 January after the end of that tax year" — NOT "12 months after 31 January" (off-by-one). Verify qualifying overseas capital scenarios at Sch 10 para 2 (three scenarios). Confirm window closes 5 April 2028 with no extension legislated. Verify ITA 2007 s.809B + s.809L for historic-cohort framing.

### Voice
- **No em-dashes.**
- Practical, specific. Exact figures, named legislation, statutory section references verbatim.
- Anonymised personas only.

### Lead-gen architecture
- LeadForm auto-injected at footer; never duplicate.
- `<aside>` styled by global CSS; no Tailwind utility classes inline.
- Lead-form role segments emphasise International landlord + Historic non-dom + Pre-2025-26 remittance basis claimant.

### CTA placement guidance (per this page)
- 2-3 inline `<aside>` CTAs:
  - After the rate-ramp verbatim citation (high-intent: reader checking which year to designate)
  - After the deadline mechanics + worked rate-arbitrage calculation (planning hook — explicit £-cost of delay)
  - Optionally after the "designation does not require physical remittance" clarification
- Vary opening; do NOT lead with "The Temporary Repatriation Facility lets...".

### Schema
- FAQs in frontmatter; FAQPage JSON-LD auto-emitted. Target 10-12. Include explicit FAQs on the deadline wording + the designation-vs-remittance distinction.

### Cannibalisation
- Cross-link A5 (qualifying capital companion). Do NOT re-walk source-categorisation.
- Vary persona figures from A1, A2, A3, A5.

### House positions
- §17.9 primary; verbatim from lock.
- §17.9.2 do-not-write list — "12% across all three years" forbidden; "designation deadline is the tax year end" forbidden; "TRF requires actual remittance" forbidden.
- §16.45 — rate ramp + deadline verbatim non-negotiable.

### Quality bar
- Word count: 2,800-3,500.
- FAQs: 10-12.
- New external authority links: 6-8.
- Build clean.
- All six verifications.

### Anti-templating
- Differentiator is verbatim rate-ramp + verbatim deadline wording + worked rate-arbitrage calculation + designation-vs-remittance distinction. Write to it.
- Vary H2s from A1, A2, A3, A5.

---

## Workflow (per page; claim ONE page at a time, verbatim 19 steps)

See `docs/property/NETNEW_PROGRAM.md` §4.9 for the verbatim 19-step workflow. Session must follow steps 1-19 in order. Wave 8 Bucket A specific overrides:
- Step 1: Read §17.6 + §17.9 + §17.8 (three HP sections — FIG-vs-TRF distinction).
- Step 7: Mandatory §16.35 re-verifications listed in "Universal rules" above.
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
