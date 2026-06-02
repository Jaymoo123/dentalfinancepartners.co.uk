# Track 2 brief: capital-allowances-on-vans

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (Capital-Allowances Re-Polish batch)
**Source markdown path:** `Property/web/content/blog/capital-allowances-on-vans.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/capital-allowances-on-vans
**Stage 1 priority:** **M-H** · the page already holds page-1 Bing equity on its head term ("capital allowances on vans", Bing pos 3.0, 6 impr) plus four more page-1 Bing queries, but it is effectively invisible on Google (pos 48). The lift is a structure / snippet-capture / on-page query-coverage job, NOT a fact fix.
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (diagnosis hand-off ingested; source markdown read in full; sibling `capital-allowances-second-hand-vans` filesystem-confirmed; house position §38 read in full; FA 2026 c.11 enacted status confirmed at §38 lock)
**Cannibalisation status:** REWRITE (CLEAN COMPANION SPLIT, no collapse either direction; equity guard rejects collapsing either van page into the other, see §"Cannibalisation universe check")

> **This brief matches the depth of the gold-reference** `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the Batch-4 sibling `briefs/property/track2/batch4/writing-down-allowance-rates.md`. Every statute citation below was re-verified against `house_positions.md §38` (manager-verified at legislation.gov.uk + the GOV.UK measure page on 2026-05-30) and is re-confirmed live at write time per the F-37 Bill-vs-enacted discipline. **This is a re-polish of an already-correct page**: the diagnosis (and a fresh §38 cross-check) found NO live stale facts, NO statute errors, NO pricing leak and NO em-dashes. The rewrite must NOT regress any verified fact; it captures snippet share and on-page query coverage while holding the existing fact spine exactly.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowances-on-vans`. The slug is the exact-match head term ("capital allowances on vans" / "van capital allowances"), it carries the page-1 Bing equity, and it is the canonical for the GENERIC + NEW-VAN intent. Do not change it; do not redirect it.
- **Category:** `Landlord Tax Essentials` (kept). Aligns the page with the landlord-facing capital-allowances entry points; the deeper §38 cluster pages (WDA rates, AIA, full expensing, cars) live in other categories and are forward-link targets only.
- **Gap-mode tag (from diagnosis hand-off):**
  - `INVISIBLE` (**primary**) · Google pos 48 with 1 impression despite a complete, correct, 3,050-word page. The page is not surfacing on Google for any of its head terms; it survives only on Bing. The job is to climb off Google page 4-5 by tightening structure, query coverage and answer-shaped snippet bait so Google's bot has a clean target.
  - `CTR_FAIL` (**secondary**) · the page is page-1 on Bing on five queries yet earns near-zero clicks; the meta title is competent but generic ("Capital Allowances on Vans 2026: Landlord Tax Guide") and does not lead with the highest-intent differentiators the queries reveal (full expensing vs the 40% FYA vs AIA; the double-cab trap; sole-trade / cash-basis).
  - `STRUCTURE` (**tertiary**) · the page already carries a good at-a-glance table and 14 FAQs, but several high-value adjacent queries ("aia on van", "full expensing van limited company", "double cab pickup capital allowances 2025", "can a landlord claim capital allowances on a van", "capital allowances van cash basis") are answered in prose but not surfaced in scannable, answer-first H2 / table / FAQ form for snippet capture. The H2 set can be re-shaped so each head query has a dedicated answer-first heading.
- **"Why this rewrite" angle:** This is a re-polish, not a fact rescue. The 2026-05-30 version is already best-in-class on accuracy (all 11 statute cites re-verified, full expensing correctly permanent, 40% FYA correctly framed as not-legally-unincorporated-only, WDA 14% with the straddling hybrid, special-rate 6%, zero-emission-car FYA 0 g/km only). What it lacks is Google visibility. The rewrite's three jobs, in order: (1) re-shape the H2 architecture so every target head query has an answer-first heading or FAQ that Google can lift as a snippet; (2) add a decision/comparison table that answers "which relief for my van?" in one scan (the strongest snippet bait for this query class); (3) a planning-led meta rewrite that leads with the relief choice and the double-cab trap. The fact spine is frozen.

---

## Current page snapshot (Stage 2, read source markdown + frontmatter)

**Filesystem source read (`capital-allowances-on-vans.md`, 147 lines):**
- **Word count:** ~3,050 (body) · already at the upper-mid band; target ~3,200 (modest +150, achieved by the new decision table + two answer-first lead sentences, NOT by padding).
- **H2 outline (12 H2):**
  1. Van capital allowances at a glance (2026) *(carries the existing 6-row at-a-glance table)*
  2. What are capital allowances, and is a van plant and machinery?
  3. Can a landlord claim, and the section 35 dwelling-house boundary
  4. Full expensing for companies (permanent, no sunset)
  5. The 40% first-year allowance (Finance Act 2026 s.29)
  6. The annual investment allowance (AIA)
  7. Writing-down allowances and the straddling-period hybrid rate
  8. What about second-hand vans?
  9. Vans versus cars, and the double-cab pickup trap
  10. Private use, benefit-in-kind, and apportionment
  11. Practical steps and common mistakes
  12. How a property accountant can help · + Further reading · + Sources
- **metaTitle:** "Capital Allowances on Vans 2026: Landlord Tax Guide" (51 chars · OK length; generic, does not lead with relief-choice or the double-cab trap)
- **metaDescription:** "How UK landlords claim capital allowances on vans in 2026: permanent full expensing, the new 40% first-year allowance, AIA, 14% WDA and the double-cab trap." (153 chars · good, already names the mechanics; can be sharpened toward decision-intent but is not broken)
- **h1:** "Capital Allowances on Vans: A 2026 Guide for UK Landlords" (clear, intent-matched; keep or lightly tighten)
- **FAQ count (frontmatter):** 14 (already strong; all factually correct). Re-order so the highest-impression head queries map to FAQ #1-#5 verbatim; no net additions needed beyond optional 1-2.
- **Worked examples:** 4 (company full-expensing £30k; sole-trader 40% FYA £25k; flat 14% WDA £20k; straddling-period hybrid ~15.05%). All arithmetically sound; keep.
- **At-a-glance table:** 1 (Relief · Who can claim · Rate · New/used · Cars? · Statute · 6 rows). Already present and good; the rewrite ADDS a second, decision-shaped "which relief for my van?" table (see content plan §2b).
- **Inline CTAs:** 1 `<aside>` (after the 40% FYA worked example). Add a second at the double-cab / classification conversion moment.
- **Outbound authority links:** 11 numbered `<sup>` references to legislation.gov.uk + gov.uk (CAA 2001 ss.11, 15, 35, 45S, 51A, 38B, 56, 45D; FA 2026 ss.28, 29; HMRC EIM23151). All live and correct at the 2026-05-30 verify pass.
- **Internal links:** ~8 (capital-allowances-on-property; HMO common-parts s.35; full-expensing; BTL ltd-co complete guide; AIA-uk; AIA-landlords-uk; writing-down-allowance-rates; writing-down-allowance-cars; property-investment-tax pillar). **Note:** the sibling `capital-allowances-second-hand-vans` is the deliberate companion and MUST be reciprocally linked from the "What about second-hand vans?" section (the diagnosis confirms bidirectional cross-linking is the split mechanism). Verify it is present and add if missing.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; Article emitted by `BlogPostRenderer.tsx`). Body must NOT add manual FAQ schema. No `reviewedBy` block on the current file · ADD the E-E-A-T reviewer convention (see §"Schema plan").
- **Last meaningful edit:** 2026-05-30 (`dateModified` + `sourcesVerifiedAt`).

---

## GSC / Bing angle (from diagnosis hand-off)

**Aggregate signal:** the page is page-1 on **Bing** on its head term and four refinements, and **invisible on Google** (pos 48). This is the defining asymmetry: Bing already rewards the content; Google does not yet surface it. The lift is structure + snippet capture on Google while holding (and ideally extending) the Bing page-1 footprint.

| Query | source | impr | pos | Read |
|---|---:|---:|---:|---|
| capital allowances on vans | gsc | 1 | 48 | Head term, Google page-5. The whole INVISIBLE problem in one row. |
| capital allowances on vans | bing | 6 | 3 | Head term, Bing page-1. The equity to protect. |
| capital allowances on van sole trade | bing | 1 | 3 | Sole-trade intent (accruals-vs-cash) already page-1 Bing. |
| do you get first year allowance on a new van purchased | bing | 1 | 4 | New-van FYA intent, page-1 Bing. |
| writing down allowance on van | bing | 1 | 3 | WDA intent, page-1 Bing. |
| writing down allowances for van hmrc | bing | 1 | 4 | WDA + HMRC-authority intent, page-1 Bing. |
| van capital allowances | adjacent | 2 | 4 | Generic head synonym; the sibling holds pos 4 on the generic "van" term too · keep this page primary on the generic term. |
| aia on van | adjacent | 1 | 6 | AIA-on-van intent; under-served as a scannable answer. |
| first year allowance new van | adjacent | 0 | 0 | Net-new target (no current footprint). |
| 40% first year allowance van | adjacent | 0 | 0 | Net-new target; the 40% FYA is a 2026 differentiator no competitor carries. |
| full expensing van limited company | adjacent | 0 | 0 | Net-new target; company + full-expensing intent. |
| double cab pickup capital allowances 2025 | adjacent | 0 | 0 | Net-new target; the highest-consequence reclassification, strong snippet bait. |
| can a landlord claim capital allowances on a van | adjacent | 0 | 0 | Net-new target; the landlord eligibility + s.35 question. |
| capital allowances van cash basis | adjacent | 0 | 0 | Net-new target; the cash-basis trap. |

**Strategic conclusion:** the Bing page-1 footprint proves the content satisfies the intent; the rewrite must not regress it. For Google, the lever is answer-first structure + a decision table + reviewer E-E-A-T so Google's quality + snippet bots have a clean, scannable target. The adjacent zero-footprint queries (40% FYA van, full expensing van limited company, double-cab 2025, landlord eligibility, cash basis) are all already answered in prose · the job is to surface each in an answer-first heading or FAQ so the page can begin ranking for them. **Realistic post-rewrite target: enter Google page 1-2 on the head term within 60-90 days while holding Bing page-1, and begin earning impressions on the five net-new adjacent queries.**

**Execution session:** pull live `gsc_query_data` + `bing_query_data` for the slug (`python -m optimisation_engine.track2.pull_page_data --slug capital-allowances-on-vans`) to refresh the footprint and confirm the Bing equity before committing the meta rewrite.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INVISIBLE.** Google pos 48 on the exact-match head term despite a complete, correct, 3,050-word page. There is no fact problem and no thinness problem; the page is simply not being chosen by Google for queries it comprehensively answers. The fix is structural clarity for crawlers (answer-first headings, a decision table, an E-E-A-T reviewer signal) plus internal-link support, not new facts.

**Secondary: CTR_FAIL.** Page-1 Bing on five queries with near-zero clicks. The meta title is competent but generic and does not lead with the differentiators that pull the click (relief CHOICE; the double-cab trap; sole-trade / cash-basis). A planning-led, decision-led meta should lift CTR on the impressions the page already earns.

**Tertiary: STRUCTURE.** The content is all present but several head queries are answered in mid-paragraph prose rather than in scannable, answer-first form. Re-shaping the H2 set so each head query gets a dedicated answer-first heading (and surfacing the relief-choice decision in a side-by-side table) is the snippet-capture move.

**Load-bearing fix sequence (ordered by ROI):**

1. **Add a decision / "which relief for my van?" comparison table** near the top (after the existing at-a-glance table). This is the single strongest snippet-bait for a "which allowance applies" query class and directly serves "aia on van", "full expensing van limited company", "40% first year allowance van". (Highest ROI, smallest fact-risk: pure restructuring of facts already on the page.)
2. **Answer-first lead sentences** on the four most-targeted H2s (full expensing; 40% FYA; double-cab; cash basis), so the first sentence under each heading is a direct, liftable answer to the matching query.
3. **Re-order + lightly extend FAQs** so FAQ #1-#5 map verbatim to the highest-intent queries ("Can a landlord claim capital allowances on a van?", "Can I claim on a van using the cash basis?", "Is a double-cab pickup a van or a car?", "Do you get a first-year allowance on a new van?", "Full expensing or the 40% FYA for a company van?"). Optionally split the combined double-cab FAQ to add a "double cab pickup capital allowances 2025" verbatim phrasing.
4. **Planning-led meta rewrite** leading with relief-choice + the double-cab trap (CTR lever).
5. **Add the E-E-A-T `reviewedBy` block** (ICAEW Qualified Senior Reviewer convention) · a Google quality signal the page currently lacks.
6. **Second inline `<aside>` CTA** at the classification / double-cab conversion moment.
7. **Confirm reciprocal link to the sibling** `capital-allowances-second-hand-vans` from the second-hand section (the split mechanism).
8. **Hold the fact spine exactly:** WDA 14% (never 18%), special-rate 6% (never 4%), zero-emission-car FYA 0 g/km only (never ≤50 g/km), full expensing permanent (never "ends 31 March 2026"), FA 2026 as enacted law (never "Finance Bill 2026" / "proposed").

---

## Competitor URLs (Stage 2, from diagnosis competitor_targets; verify live at execution)

| URL | Use case | Borrow / differentiate |
|---|---|---|
| https://www.gov.uk/capital-allowances/business-cars | The authoritative car-vs-van boundary baseline | **Borrow:** the bare van-vs-car classification authority. **Differentiate:** gov.uk gives no landlord application, no s.35 boundary, no 40% FYA, no straddling-hybrid worked example, no decision table · that is our specialist layer. |
| https://www.pie.tax/tax-pible/capital-allowances-on-vans-tax-a-simple-guide | Direct competitor on the exact head term | **Borrow:** confirm topic scope coverage (full expensing / AIA / WDA). **Differentiate:** our 40% FYA correctness (s.45U), the straddling-hybrid worked example, the double-cab 2025 reclassification, the cash-basis trap, the s.35 dwelling boundary, and a decision table none of them carry. |
| https://england.landlordsguild.com/article/clearing-up-landlord-confusion-over-capital-allowances | Landlord-eligibility + s.35 confusion (the "can a landlord claim" intent) | **Borrow:** the framing of the common landlord misconception. **Differentiate:** precise s.35 dwelling-house boundary (the van is separable, not in-dwelling) with the statutory cite. |
| https://www.legislation.gov.uk/ukpga/2026/11/section/28 | Statutory base · WDA 14% substitution + straddling hybrid (s.28(2)-(6)) | Cite as `<sup>` ref (already ref-9). Re-verify operative wording + FA 2026 c.11 Royal Assent 18 Mar 2026 at write time. |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | Statutory base · 40% FYA, inserts CAA 2001 s.45U | Cite as `<sup>` ref (already ref-5). Re-verify operative wording at write time. |

**Competitor depth ceiling for this query class:** generalist "simple guide" pages are 1,000-1,800 words, 0-2 worked examples, 0 statute citations rendered, no decision table, and frequently carry the stale "full expensing ends March 2026" or the wrong "40% FYA is unincorporated-only" framing. Our ~3,200-word page with two scannable tables (at-a-glance + decision), 4 worked examples (incl. the straddling-hybrid that no competitor carries), 14 FAQs, 11 verified legislation.gov.uk / gov.uk citations and an E-E-A-T reviewer is decisively best-in-class on both accuracy and depth · the only deficit is Google surfacing, which the structural lift targets.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation status from diagnosis: CLEAN COMPANION SPLIT · REWRITE, no collapse either direction.**

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | capital-allowances-on-vans | REWRITE | self; rewrite in place; slug + category kept. Canonical for the **GENERIC + NEW-VAN** intent. |
| Sibling (companion) | capital-allowances-second-hand-vans | REWRITE (separate) | **DO NOT COLLAPSE either direction.** The sibling owns the **USED-VAN** deep-dive (why second-hand fails full expensing / 40% FYA, the AIA-vs-14%-WDA fallback, connected-party ss.214/217 denial, balancing charge on disposal). It holds Bing pos 2.0 on its own head term "capital allowances on second hand vans" + pos 4.0 on the generic "van" term. **Reciprocal cross-links stay** · this page links to the sibling for the "second hand" refinement only; the sibling links back for the new-van / generic intent. |
| Cluster siblings (across, §38) | writing-down-allowance-rates · writing-down-allowance-cars · full-expensing-capital-allowances · annual-investment-allowance-uk · annual-investment-allowance-landlords-uk · capital-allowances-on-property · hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | REWRITE / live (separate intents) | **Forward-link ACROSS only.** Keep the deep mechanics on those pages (WDA rate tables, AIA £1m cap mechanics, full-expensing company depth, car emissions bands, the s.35 HMO common-parts exception). This page references each briefly and links out; it does NOT duplicate their depth. |
| Cross-network (NOT a same-site cannibal) | Holloway Davies (generalist site) same-titled page | No action | Internal-network overlap on the sister generalist site, not a same-site cannibal. No collapse, no canonical change. Note only. |

**Collapse-direction equity guard (per `scripts/track2_collapse_guard.py` / Risk register):** a collapse in EITHER direction would 301 a live page-1 Bing page into the other. **REJECTED.** Neither page dominates the other on its own head term (this page = Bing pos 3.0 on "capital allowances on vans"; the sibling = Bing pos 2.0 on "capital allowances on second hand vans"), and both are near-zero on Google, so collapsing either destroys live page-1 Bing equity. The equity guard would flip such a proposal back to REWRITE. **Conclusion: REWRITE both, keep the split sharp.**

**Distinctness on rewrite:** keep THIS page the canonical for the GENERIC head terms ("capital allowances on vans" / "van capital allowances" / "first year allowance on a new van" / "writing down allowance on van") and the NEW-VAN intent (full expensing s.45S companies-only, 40% FYA s.45U / FA 2026 s.29, AIA on a new van, 14% main-pool WDA + straddling-period hybrid s.28(2)-(6), s.35 dwelling-house boundary, double-cab reclassification, cash-basis trap, private-use / van-BIK split). Reciprocal links to the sibling stay for the "second hand" refinement only.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **Companion sibling (bidirectional, the split mechanism):** `capital-allowances-second-hand-vans` (category `landlord-tax-essentials`) · link from the "What about second-hand vans?" section; confirm reciprocal back-link exists on the sibling.
- **Full expensing (across):** `full-expensing-capital-allowances` · from the company full-expensing section.
- **AIA (across):** `annual-investment-allowance-uk` and `annual-investment-allowance-landlords-uk` · from the AIA section.
- **WDA rates (across):** `writing-down-allowance-rates` · from the WDA / straddling-hybrid section.
- **Cars WDA (across):** `writing-down-allowance-cars` · from the vans-versus-cars / double-cab section.
- **s.35 HMO common parts (across):** `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` · from the s.35 dwelling-house boundary section.
- **Capital allowances on property (up):** `capital-allowances-on-property` · the broader plant-and-machinery picture.
- **BTL incorporation (cross-category):** `buy-to-let-limited-company-complete-guide-uk` · from the company / full-expensing section (the "should I incorporate" upstream question).
- **Property investment tax pillar (up):** `property-investment-tax-uk-complete-guide-2026` · from the CTA aside.

**All internal-link slugs must be canonicalised at write time** via the writer's Normalise stage (`slug_resolver.py`): a slug has exactly one real category prefix; never guess the path. (The current file's existing links use mixed prefixes such as `/blog/property-types-and-specialist-tax/` and `/blog/section-24-and-tax-relief/` · re-resolve each at write time.)

---

## House-position references (Stage 1)

- **§38 Capital allowances (CAA 2001), Finance Act 2026 reform floor** [LOCKED, manager source-verified 2026-05-30]. The load-bearing lock for this page. **FA 2026 (c.11), Royal Assent 18 March 2026, is ENACTED** · state all rates as current law, never "Finance Bill 2026" / "proposed". The page already complies; the rewrite must HOLD it:
  - Main-pool WDA **14%** (FA 2026 s.28 substitutes into CAA 2001 s.56(1)); 1 Apr 2026 CT / 6 Apr 2026 IT; straddling-period hybrid s.28(2)-(6). **Never write 18%.**
  - Special-rate pool **6%, UNCHANGED** (CAA 2001 s.104D). **Never write 4%.** (Page mentions special-rate only in passing, correctly at 6%.)
  - New **40% FYA** (FA 2026 s.29, inserts CAA 2001 s.45U); main-rate new-and-unused P&M; expenditure on/after 1 Jan 2026; excludes cars, second-hand, overseas leasing; **NOT incorporation-restricted in law** (do NOT write "unincorporated-only" or "companies cannot claim it"); frame as the practical route for those who cannot / would not use full expensing.
  - **AIA £1,000,000, permanent** (CAA 2001 s.51A(5)). The "temporary / reverts to £200,000" framing is stale.
  - **Full expensing 100% FYA, companies only** (CAA 2001 s.45S), new and unused, permanent · distinct from the 40% FYA.
  - **Cars:** excluded from AIA (s.38B General Exclusion 2) and from the 40% FYA. The only car FYA is **100% for new, unused zero-emission cars (0 g/km CO2)** (s.45D), to 31 Mar 2027 CT / 5 Apr 2027 IT. **0 g/km only · never write "≤50 g/km = FYA".** ≤50 g/km → main pool 14%; >50 g/km → special-rate pool 6%.
  - **s.35 dwelling-house bar:** no P&M allowances for plant for use in a dwelling-house; the van is a separable business vehicle, not in-dwelling, so it is NOT caught.
- **§13 / lead-gen do-not-write list** [LOCKED]: NO pricing / fees on-page; NO real client names; anonymised social proof only (Decision E: even soft "£800-£1,500 general-market" fee comparisons are a pricing-leak · none present, keep it that way). NO em-dashes.
- **House-position deference:** Track 2 NEVER edits `house_positions.md`. §38 already records the full FA 2026 floor (locked 2026-05-30), so no HP currency gap exists for this page · nothing to flag for a future-wave lock.

---

## House-position conflict flag (Stage 2)

**NO conflict.** The live page is fully consistent with the LOCKED §38 floor: WDA 14%, special-rate 6%, 40% FYA correctly framed as not-legally-unincorporated-only, full expensing permanent and companies-only, AIA £1m permanent, zero-emission-car FYA 0 g/km only, s.35 dwelling-house bar correctly applied to exempt the van. NO stale facts, NO statute errors, NO pricing leak, NO real client names, NO em-dashes (diagnosis confirmed; re-confirmed at this Stage-2 read against §38).

**The only material risk is a NON-content risk:** the page is invisible on Google (pos 48) despite page-1 Bing equity. The rewrite is a structure / snippet-capture / on-page query-coverage lift and **must not regress any verified fact.**

**No new F-flag raised** (no conflict to record). The execution session still re-verifies the statute spine at write time per the F-37 Bill-vs-enacted discipline before asserting any rate as in-force law, and logs the re-verification in the work-log.

---

## Authority links worth considering (Stage 2)

The page already cites 11 verified references; keep all and re-confirm liveness at execution. The load-bearing re-verification set:

| URL | Verification status (held at 2026-05-30; re-verify at write) | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Live, operative · full expensing companies-only, new and unused | ref-4 · full expensing |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | Live · inserts CAA 2001 s.45U, 40% FYA, on/after 1 Jan 2026 | ref-5 · 40% FYA |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | Live · AIA £1,000,000 | ref-6 · AIA |
| https://www.legislation.gov.uk/ukpga/2001/2/section/38B | Live · General Exclusion 2 (cars excluded from AIA) | ref-7 · cars excluded |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | Live · now reads 14%, annotated "substituted by Finance Act 2026 (c.11), s.28(1)" | ref-8 · main-pool WDA 14% |
| https://www.legislation.gov.uk/ukpga/2026/11/section/28 | Live · WDA reduction + straddling hybrid s.28(2)-(6) | ref-9 · WDA cut + hybrid |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45D | Live · 100% FYA new zero-emission (0 g/km) cars | ref-10 · zero-emission car FYA |
| https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim23151 | Live · double-cab pickups treated as cars from 6 Apr 2025; transition to 5 Apr 2029 | ref-11 · double-cab reclassification |
| https://www.legislation.gov.uk/ukpga/2001/2/section/11 · /15 · /35 | Live · P&M general conditions; qualifying activities (UK property business); dwelling-house bar | ref-1 / ref-2 / ref-3 |

**Optional additions** (only if they earn their place; do not bloat the Sources list): the GOV.UK measure page for the WDA cut + 40% FYA (the "does not change the special rate, currently 6%" verbatim source) as a single combined cross-reference, and `https://www.gov.uk/capital-allowances/business-cars` as the van-vs-car boundary cross-reference. **Re-verify FA 2026 c.11 Royal Assent (18 March 2026) at execution** per the F-37 discipline.

---

## Section-by-section content plan to ~3,200 words

Target: **12-13 H2s, ~3,200 body words, 14 FAQs, two tables (at-a-glance + decision), 4 worked examples, 2 inline `<aside>` CTAs.** The body is already ~3,050 words and correct · the plan PRESERVES every section and fact and adds answer-first structure + a decision table. Do not pad; do not regress.

1. **Intro (≈140 words, keep).** Keep the existing opener (full expensing now permanent; new 40% FYA; main rate dropped to 14% with the hybrid; s.35 boundary; double-cab may not be a van). It already front-loads the 2026 changes · tighten only.
2. **Van capital allowances at a glance (2026) · keep the at-a-glance table.** Existing 6-row table (Relief · Who can claim · Rate · New/used · Cars? · Statute). Hold every cell exactly (Full expensing / 40% FYA / AIA / main-pool WDA / zero-emission car FYA). This is the rate/threshold reference table; it stays.
2b. **NEW · "Which relief for my van?" decision table (snippet bait, ≈90 words around it).** A side-by-side DECISION table that answers the relief-choice query class in one scan. Plain HTML `<table>`, no pricing. **Columns:** Your situation | Best relief | Why | Statute. **Rows:**
   - Company, NEW and unused van → **Full expensing (100%)** → most generous, no cap, companies only → CAA 2001 s.45S
   - Company, USED / second-hand van → **AIA (100%, up to £1m)** then 14% WDA → full expensing needs new+unused → CAA 2001 s.51A / s.56
   - Sole trader / partnership (accruals), NEW van → **AIA (100%)**, or **40% FYA** once AIA is used up → AIA is more front-loaded for a single van → CAA 2001 s.51A / FA 2026 s.29
   - Sole trader / partnership (accruals), USED van → **AIA (100%)** then 14% WDA → 40% FYA needs new+unused → CAA 2001 s.51A / s.56
   - Anyone, on the **cash basis** → **No capital allowances on a van** (deduct cost as a cash-basis expense; allowances only for cars) → CAA 2001 (cash-basis rules)
   - Double-cab pickup bought on/after 6 Apr 2025 → **Usually a CAR** (emissions-based; excluded from AIA + 40% FYA) → check primary-suitability first → HMRC EIM23151 / CAA 2001 s.38B
   This table directly serves "aia on van", "full expensing van limited company", "40% first year allowance van", "capital allowances van cash basis" and "double cab pickup capital allowances 2025".
3. **What are capital allowances, and is a van plant and machinery? (≈230 words, keep).** Revenue-vs-capital gateway; van is P&M; UK property business is a qualifying activity (ss.11, 15). Hold.
4. **Can a landlord claim, and the section 35 dwelling-house boundary (≈320 words, keep + answer-first lead).** **Answer-first lead sentence:** "Yes, a landlord can claim capital allowances on a van used to run a property business · the section 35 dwelling-house bar does not catch it, because the van is a separable business vehicle, not plant inside a let home." Then the existing s.35 detail + the cash-basis caveat. Serves "can a landlord claim capital allowances on a van" + "capital allowances van cash basis". Forward-link the HMO common-parts sibling. **Inline `<aside>` CTA #1** stays nearby (or after §5).
5. **Full expensing for companies (permanent, no sunset) (≈300 words, keep + answer-first lead).** **Answer-first lead:** "Full expensing is permanent · there is no March-2026 cliff edge; CAA 2001 s.45S contains no end date." Then companies-only + new-and-unused conditions + the £30k worked example. Serves "full expensing van limited company". Forward-link full-expensing + BTL ltd-co.
6. **The 40% first-year allowance (Finance Act 2026 s.29) (≈300 words, keep + answer-first lead).** **Answer-first lead:** "Yes, you can get a first-year allowance on a NEW van · Finance Act 2026 s.29 (inserting CAA 2001 s.45U) gives a 40% first-year allowance on a new and unused van bought on or after 1 January 2026." Keep the not-legally-unincorporated-only framing EXACTLY (§38 lock) + the £25k sole-trader worked example. Serves "do you get first year allowance on a new van purchased", "first year allowance new van", "40% first year allowance van". Keep the existing `<aside>` CTA after the worked example.
7. **The annual investment allowance (AIA) (≈230 words, keep + answer-first lead).** **Answer-first lead:** "AIA gives a 100% deduction on a van (new or used) up to £1 million a year, and it is available to everyone · companies, sole traders and partnerships." Hold the s.51A £1m permanent framing + new-or-used + cars excluded. Serves "aia on van", "van capital allowances". Forward-link the two AIA siblings.
8. **Writing-down allowances and the straddling-period hybrid rate (≈340 words, keep).** **Answer-first lead:** "A van sits in the main pool, where the writing-down allowance is 14% a year on the reducing balance from April 2026 (cut from 18% by Finance Act 2026 s.28)." Hold the flat-14% worked example + the straddling-hybrid worked example (≈15.05% on the 1 Jan-31 Dec 2026 IT period) + the special-rate-6%-unchanged note. Serves "writing down allowance on van", "writing down allowances for van hmrc". Forward-link writing-down-allowance-rates.
9. **What about second-hand vans? (≈200 words, keep + sharpen the split link).** Used van fails full expensing + 40% FYA (both need new+unused); AIA or 14% WDA applies; connected-party market-value rule. **Add / confirm the reciprocal forward-link to the companion sibling** `capital-allowances-second-hand-vans` for the deeper used-van treatment (connected-party ss.214/217 denial, balancing charge). This is the split mechanism · keep this page's used-van treatment a concise pointer, not a duplicate of the sibling's depth.
10. **Vans versus cars, and the double-cab pickup trap (≈340 words, keep + answer-first lead + CTA).** **Answer-first lead:** "From 6 April 2025, HMRC treats most double-cab pickups as cars, not vans, for both capital allowances and the benefit-in-kind charge · so a double-cab bought expecting van treatment may be excluded from AIA and the 40% FYA." Hold the primary-suitability test + the 0-g/km-only zero-emission-car FYA + the ≤50 g/km main pool / >50 g/km special-rate detail (§38 lock) + the transitional rule to 5 Apr 2029 (EIM23151). Serves "double cab pickup capital allowances 2025". **Inline `<aside>` CTA #2 here** (classification is the highest-consequence decision · strong conversion moment). Forward-link writing-down-allowance-cars.
11. **Private use, benefit-in-kind, and apportionment (≈200 words, keep).** Sole-trader business-use proportion + mileage log; company van as company asset + van-BIK on significant private use. Hold.
12. **Practical steps and common mistakes (≈230 words, keep).** The claim checklist + the four predictable mistakes (full expensing / 40% FYA on a used van; claiming on the cash basis; expecting van treatment for a post-6-Apr-2025 double-cab; flat 14% on a straddling period). Hold.
13. **How a property accountant can help + Further reading + Sources (keep).** Anonymised CTA (no pricing, no client names); the existing internal-link cluster; the 11-item verified Sources list. Hold; re-resolve internal-link slugs at write time.

**FAQ block (frontmatter `faqs:`, 14 · re-ordered, optionally +1):** keep all 14 (all correct). **Re-order so FAQ #1-#5 map verbatim to the highest-intent queries:** (1) "Can a landlord claim capital allowances on a van?" [new framing, absorbs the s.35 + sole-trader content], (2) "Can I claim capital allowances on a van using the cash basis?", (3) "Do you get a first-year allowance on a new van?" [reframe the 40% FYA FAQ to the query phrasing], (4) "Is a double-cab pickup treated as a van or a car? (2025)", (5) "Full expensing or the 40% FYA for a company van?". Then the remaining existing FAQs. **Optionally split** the double-cab FAQ to add a verbatim "double cab pickup capital allowances 2025" phrasing. No fact changes to any answer.

---

## Statute spine (every section number with its Act · verify at write time)

| Statute | What it governs | Verified status (held 2026-05-30 / §38 lock) |
|---|---|---|
| **CAA 2001 s.11** | General conditions for plant and machinery allowances | Live (ref-1); re-verify wording at execution |
| **CAA 2001 s.15** | Qualifying activities (incl. UK property business) | Live (ref-2); re-verify at execution |
| **CAA 2001 s.35** | Bars P&M allowances on plant for use in a **dwelling-house** (van is NOT caught) | Live (ref-3); §38 lock; re-verify at execution |
| **CAA 2001 s.38B** | General Exclusion 2 · **cars excluded from AIA** (and from the 40% FYA) | Live (ref-7); §38 lock |
| **CAA 2001 s.45D** | 100% FYA for **new, unused zero-emission (0 g/km) cars**; to 31 Mar 2027 CT / 5 Apr 2027 IT | Live (ref-10); §38 lock · **0 g/km only** |
| **CAA 2001 s.45S** | **Full expensing** 100% FYA, **companies only**, new and unused, **permanent** (no sunset) | Live (ref-4); §38 lock |
| **CAA 2001 s.45U** | The **40% first-year allowance** (inserted by FA 2026 s.29); main-rate new+unused; on/after 1 Jan 2026; **no incorporation test** | Inserted by FA 2026 s.29; §38 lock · do NOT write "unincorporated-only" |
| **CAA 2001 s.51A** | **AIA £1,000,000**, permanent (s.51A(5); permanent via F(No.2)A 2023 s.8 from 1 Apr 2023) | Live (ref-6); §38 lock |
| **CAA 2001 s.56** | Main-pool WDA **= 14%** (substituted by FA 2026 s.28(1); 1 Apr 2026 CT / 6 Apr 2026 IT) | Live (ref-8), reads 14%, annotated "substituted by Finance Act 2026 (c.11), s.28(1)" · **never 18%** |
| **CAA 2001 s.104D** | Special-rate-pool WDA **= 6%, UNCHANGED** | §38 lock · **never 4%** (mentioned in passing on-page; hold at 6%) |
| **Finance Act 2026 (2026 c. 11) s.28** | Substitutes 14% main-pool WDA into CAA 2001 s.56; **straddling-period hybrid** s.28(2)-(6) | Live (ref-9); FA 2026 c.11 **ENACTED, Royal Assent 18 March 2026** · re-confirm at execution |
| **Finance Act 2026 (2026 c. 11) s.29** | Introduces the **40% FYA** (inserts CAA 2001 s.45U); on/after 1 Jan 2026 | Live (ref-5); §38 lock |
| **HMRC EIM23151** | Double-cab pickups treated as **cars from 6 April 2025**; transition to 5 Apr 2029 | Live (ref-11, gov.uk); re-verify at execution |

**F-37 / Bill-vs-enacted discipline:** FA 2026 c.11 is ENACTED (Royal Assent 18 March 2026 per §38 lock). State s.28 (14% WDA + hybrid) and s.29 (40% FYA) as **in-force law**, never Bill-form-hedged. Re-confirm Royal Assent + operative wording at write time. (For the connected-party detail on the second-hand section, the SIBLING page owns the ss.214/217 connected-party-denial depth · this page keeps a concise market-value pointer and links across.)

---

## Query-coverage plan

One row per `target_queries[]` item · each query assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| capital allowances on vans | gsc | 1 | 48 | metaTitle + H1 |
| capital allowances on vans | bing | 6 | 3 | H1 (same head term; metaTitle/H1 carry it for both engines) |
| capital allowances on van sole trade | bing | 1 | 3 | H2#4 (Can a landlord claim · sole-trader accruals lead) |
| do you get first year allowance on a new van purchased | bing | 1 | 4 | FAQ#3 ("Do you get a first-year allowance on a new van?") |
| writing down allowance on van | bing | 1 | 3 | H2#8 (Writing-down allowances · answer-first lead) |
| writing down allowances for van hmrc | bing | 1 | 4 | H2#8 body (HMRC straddling-hybrid + EIM/legislation cite) |
| van capital allowances | adjacent | 2 | 4 | metaDescription + H2#2 (at-a-glance table) |
| aia on van | adjacent | 1 | 6 | H2#7 (AIA · answer-first lead) |
| first year allowance new van | adjacent | 0 | 0 | H2#6 (40% FYA · answer-first lead) |
| 40% first year allowance van | adjacent | 0 | 0 | Decision table §2b (row: sole trader NEW van → 40% FYA) |
| full expensing van limited company | adjacent | 0 | 0 | H2#5 (Full expensing for companies) |
| double cab pickup capital allowances 2025 | adjacent | 0 | 0 | FAQ#4 ("Is a double-cab pickup a van or a car? (2025)") |
| can a landlord claim capital allowances on a van | adjacent | 0 | 0 | FAQ#1 ("Can a landlord claim capital allowances on a van?") |
| capital allowances van cash basis | adjacent | 0 | 0 | FAQ#2 ("Can I claim capital allowances on a van using the cash basis?") |

---

## Meta plan

- **metaTitle (≤ 62 chars):** lead with the relief-choice + 2026 differentiator. Candidates (execution picks one):
  - "Capital Allowances on Vans 2026: Full Expensing, 40% FYA, AIA" (60)
  - "Capital Allowances on Vans 2026: Which Relief + Double-Cab Trap" (62)
  - "Van Capital Allowances 2026: Full Expensing, 40% FYA or AIA?" (59)
- **metaDescription (≤ 158 chars):** decision-led + the double-cab hook. Candidate: "Which capital allowance applies to your van in 2026: permanent full expensing for companies, the new 40% first-year allowance, AIA, 14% WDA and the double-cab trap." (158, trim to ≤158 at write; e.g. drop "permanent" if over).
- **h1:** keep "Capital Allowances on Vans: A 2026 Guide for UK Landlords" (clear, intent-matched, carries the head term for both Google and Bing) OR tighten to "Capital Allowances on Vans 2026: A Guide for UK Landlords". Execution picks one; must carry "capital allowances on vans".
- **summary (frontmatter):** keep the existing accurate summary (it already names full expensing permanence, the 40% FYA, AIA, the 14% WDA + straddling hybrid, the s.35 boundary and the double-cab trap). Lightly tighten only; do NOT regress any fact.

---

## Schema plan

- **Reviewer (E-E-A-T · add the `reviewedBy` block, currently absent on this file):**
  - `reviewedBy`: "ICAEW Qualified Senior Reviewer"
  - `reviewerCredentials`: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"
  - `reviewedAt`: "2026-06-02"
  - (Site convention · anonymised institutional reviewer role, consistent with the lead-gen handoff model: no real personal client/staff names. Same convention used on `2027-tax-rates-incorporation-decision-uk-landlords` and the CIL guide.)
- **howTo:** **false.** This is an explainer / decision page, not a numbered step-by-step procedure. Do NOT emit HowTo JSON-LD. (The "Practical steps" section is a short claim checklist, not a HowTo recipe.)
- **dateModified:** "2026-05-30" (per the brief's fixed instruction · the execution writer may bump to the actual write date, but the brief specifies 2026-05-30). `sourcesVerifiedAt` set to the write date after re-verification.
- **JSON-LD blocks to emit:** **Article** (auto by `BlogPostRenderer.tsx`) + **FAQPage** (auto from frontmatter `faqs:`, 14 Q&A). **No HowTo.** Body must NOT add a manual second FAQ schema (FAQPage is frontmatter-driven; double-emission is a six-check failure).

---

## Universal rules, inherited from parent program (do not restate)

(Pointer block per the Track 2 brief template §13. Voice rules, lead-gen architecture, CSS-in-markdown ban, FAQs-and-schema rules, anti-templating, the six-check quality bar, and the statute-citation discipline · all inherited from `competitor_rewrite_playbook.md` + `house_positions.md §38` + the lead-gen memory locks.)

**Critical for THIS brief:** NO pricing / fees on-page (lead-gen handoff model; Decision E: even soft "£800-£1,500 general-market" fee comparisons are a pricing-leak · none present, keep it that way). NO real client names; anonymised social proof only. NO em-dashes anywhere (use commas, parentheses, full stops, middle dots). LeadForm auto-injected by `BlogPostRenderer.tsx` · never duplicate. **The fact spine is FROZEN: WDA 14% (never 18%), special-rate 6% (never 4%), zero-emission-car FYA 0 g/km only (never ≤50 g/km), full expensing permanent (never "ends 31 March 2026"), FA 2026 as enacted law (never "Finance Bill 2026" / "proposed"), 40% FYA not "unincorporated-only".** This is a re-polish; do not regress any verified fact.

---

## 19-step workflow, inherited from parent program (Track 2 legacy-rewrite adaptation)

(Inherits the full 19-step legacy-rewrite workflow. Track 2 deltas below.)

**Load-bearing pre-rewrite verification (do FIRST):**
1. Read `house_positions.md §38` + §13 in full at session start.
2. Claim this brief in the Track 2 page tracker (mark 🟡 stage2_drafting → 🔵 at execution).
3. Read this brief end-to-end + the current source `capital-allowances-on-vans.md` in full + the companion sibling `capital-allowances-second-hand-vans.md` (to keep the split sharp and confirm reciprocal links).
4. **Re-verify against legislation.gov.uk + gov.uk at write time** (F-37 discipline): s.45S, FA 2026 s.28 (+ s.56 reads 14%), FA 2026 s.29 (+ s.45U inserted), s.51A, s.38B, s.45D, s.35, s.11, s.15, EIM23151, and FA 2026 c.11 Royal Assent 18 March 2026. **Nothing should change · this is a re-polish · but verify before asserting.**
5. Re-fetch the competitor URLs to confirm liveness at execution.
6. Pull live GSC + Bing for the slug to confirm the Bing page-1 footprint before the meta rewrite.
7. **Rewrite markdown at the existing path** (NOT a new file). Preserve slug + canonical + category. Add the `reviewedBy` block. Set `dateModified` per the Schema plan; `sourcesVerifiedAt` = write date.
8. Add the decision table (§2b), answer-first leads (§§4-6, 8, 10), re-ordered FAQs, second `<aside>` CTA. Do NOT pad; do NOT regress facts.
9. Run the deterministic QA chain (independent QA recomputes every worked example + WebFetches every cite; predeploy gate HARD-blocks on any wrong arithmetic / wrong-Act citation / 404 link / any surviving "18%" main-rate or "4%" special-rate string).
10. `cd Property/web && npm run build` · must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve via `slug_resolver.py`; **grep "£[0-9]" returns 0 fee-quote lines**; **grep for a main-pool "18%" or special-rate "4%" returns 0**; **grep confirms the reciprocal sibling link is present**.
12. Confirm no redirect needed (REWRITE; equity guard rejects collapse either direction).
13. Update / insert the `monitored_pages` row (180-day window given the INVISIBLE-on-Google baseline) + IndexNow.
14. Commit on `main`; update tracker (✅ executed), flags (none new), heartbeat.

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment (§38 · HOLD, do not regress)
- WDA 14% main pool (never 18%): __
- Special-rate 6% (never 4%): __
- 40% FYA not "unincorporated-only" (FA 2026 s.29 / s.45U): __
- Full expensing permanent + companies-only (s.45S): __
- AIA £1m permanent (s.51A): __
- Zero-emission-car FYA 0 g/km only (s.45D): __
- s.35 dwelling-house bar does NOT catch the van: __
- Double-cab cars from 6 Apr 2025 + transition to 5 Apr 2029 (EIM23151): __

### Comparison: before vs after
- Word count: 3,050 → __ (target ~3,200)
- H2 count: 12 → __ (12-13; +1 decision sub-section)
- Tables: 1 (at-a-glance) → 2 (+ decision "which relief for my van?")
- FAQ count: 14 → __ (14, re-ordered; optional +1 double-cab split)
- Answer-first H2 leads added: __ (target 5: full expensing, 40% FYA, AIA, WDA, double-cab)
- Inline CTAs: 1 → 2
- `reviewedBy` E-E-A-T block added: __ (Y/N)
- Reciprocal sibling link to `capital-allowances-second-hand-vans` confirmed: __ (Y/N)
- Authority links: 11 → __ (hold 11, all re-verified)

### Statute re-verification at write time (F-37)
- s.45S full expensing: __
- FA 2026 s.28 + s.56 reads 14%: __
- FA 2026 s.29 + s.45U 40% FYA: __
- s.51A AIA £1m: __
- s.38B cars excluded: __
- s.45D zero-emission 0 g/km: __
- s.35 / s.11 / s.15: __
- EIM23151 double-cab: __
- FA 2026 c.11 Royal Assent 18 Mar 2026: __

### Flags raised
- None expected (no conflict; re-polish only). Any new flag surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
