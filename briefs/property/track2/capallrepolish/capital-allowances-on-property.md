# Track 2 brief: capital-allowances-on-property (re-polish pass)

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (Track 2 capital-allowances RE-POLISH; facts already clean, this is a pure discoverability + decision-router rebuild)
**Source markdown path:** `Property/web/content/blog/capital-allowances-on-property.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/capital-allowances-on-property
**Stage 1 priority:** M (real but thin signal: 16 GSC impressions across 9 distinct head-term queries, pos 43-91; this page carries the cluster's only measurable head-term equity, so the lift target is visibility, not click-rate-at-position)
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (house_positions §38 + §25.1-§25.12 read in full; current source markdown read end-to-end and confirmed FA-2026-current; sibling slugs verified on disk; reviewer convention confirmed against deployed cluster siblings)
**Cannibalisation status:** REWRITE with sharp differentiation (collapse is BOTH out of standing scope AND blocked by the deterministic equity guard — see cannibalisation block; never collapse a stronger page into the zero-equity pillar)

> **Difference vs the previous capallowances brief.** A prior brief (`briefs/property/track2/capallowances/capital-allowances-on-property.md`, dated 2026-05-30) led on STALE_FACTS. That correctness job has SINCE BEEN DONE: the live page now carries dateModified/sourcesVerifiedAt 2026-05-30, the FA-2026 floor is correct (WDA 14% via FA 2026 s.28, 40% FYA via FA 2026 s.29 → CAA 2001 s.45U, AIA £1m permanent, full expensing s.45S company-only, FHL abolished FA 2025 Sch 5), the s.35 bar is anchored to statute not a "2016 HMRC view", and there is no pricing leak and no em-dash. **This re-polish brief therefore has a different load-bearing fix: the page is INVISIBLE (page 4-9) and STRUCTURE-thin for snippet capture. The single distinct asset to build is a top-of-page quick-decision matrix (property type x what qualifies x which allowance) that no sibling owns, recasting the page from a prose "complete guide" into the head-term decision-router that answers "does my property qualify?" before routing to the specialist sub-guides.**

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowances-on-property`. It is the broad-intent gateway phrase and the only page in the cluster with measurable Google head-term equity (16 impr / 9 queries). No redirect — see cannibalisation block (a 301 here would be a reversed-equity collapse).
- **Category:** `property-types-and-specialist-tax` (kept; matches canonical and the cluster siblings).
- **Gap-mode tag (from diagnosis):** `INVISIBLE` (primary: pos 43-91, page 4-9, the head-term family is not seen) + `STRUCTURE` (secondary: no snippet-bait decision table, prose-only routing, no scannable property-type matrix) + `CTR_FAIL` (tertiary/downstream: 0 clicks, but you cannot fail CTR at position 50 — fixing structure + the decision matrix is the prerequisite to any future click).
- **"Why this rewrite" angle:** This is the broad-intent **decision-router / entry-point** for "capital allowances on property". The facts are already current, so the rewrite is NOT a correctness job. It is a discoverability + structure job: (a) add a top-of-page quick-decision matrix (the distinct asset), (b) tighten every mechanism section to a 1-2 paragraph router blurb + forward-link (no deep recomputation — that belongs to the siblings), (c) lift FAQs and authority citations to snippet-bait depth, (d) rewrite metaTitle/metaDescription/H1 to lead with the decision-router promise ("does yours qualify?") rather than the generic "complete guide" framing. The page must stay broad-gateway in altitude and route OUT to the specialist sub-guides; it must NOT duplicate the pillar's exhaustive CAA-2001 decision framework or any sibling's mechanics.

---

## Current page snapshot (Stage 2 — filesystem read 2026-06-02)

- **Source markdown path:** `Property/web/content/blog/capital-allowances-on-property.md`
- **Current word count:** ~3,401 (diagnosis figure; 14 H2 sections of mostly clean prose, 5 worked examples already present)
- **Current H2 outline (14):**
  1. What Are Capital Allowances on Property? (gateway; links to capital-vs-revenue guide)
  2. Residential Property: The Section 35 Dwelling-House Bar (correctly anchored to s.35; common-parts carve-out + worked example present)
  3. Commercial Property: The Full Plant and Machinery Regime (P&M list + s.33A integral features)
  4. The Annual Investment Allowance (AIA): Permanent at £1 Million (correct; s.51A(5) + F(No.2)A 2023)
  5. Full Expensing and the New 40% First-Year Allowance (s.45S company-only vs s.45U 40% FYA; sole-trader worked example present)
  6. Writing-Down Allowances: 14% Main Pool, 6% Special Rate (correct; FA 2026 s.28; straddling-hybrid worked example present)
  7. The Structures and Buildings Allowance (SBA) (s.270AA, allowance statement s.270IA, s.37B add-back, s.270CF residential bar; worked example present)
  8. Furnished Holiday Lets: The Regime Has Been Abolished (correct; FA 2025 Sch 5; grandfathered pools)
  9. How to Claim, and the Two-Year Window
  10. Capital Allowances When You Sell a Commercial Property (s.61, s.196 Table, s.198 election, balancing charge)
  11. Holding Property Through a Limited Company
  12. Capital Allowances and Making Tax Digital (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028 — correct)
  13. Where to Go Next (hub-routing list — already present)
  14. When to Get Professional Advice
  + Sources `<ol>` (7 legislation.gov.uk / gov.uk citations already present)
- **Current metaTitle:** "Capital Allowances on Property: UK Landlord Guide 2026" (54 chars; clean, complete, but generic "guide" framing — competes head-to-head with gov.uk for the same explainer intent rather than owning the decision-router intent)
- **Current metaDescription:** "How capital allowances on property work in 2026: the s.35 residential bar, commercial fixtures, AIA, the 40% FYA, SBA and WDA rates after Finance Act 2026." (155 chars; accurate, mechanism-list framing, no "does yours qualify?" hook)
- **Current h1:** "Capital Allowances on Property: A Complete Guide for UK Landlords"
- **Current FAQs (frontmatter count):** 14 (already at target; high quality and FA-2026-current). The rewrite KEEPS these and may re-order so the highest-impression query verbatims sit at FAQ #1-#4; net count stays 12-14.
- **Current outbound authority links:** 7 (gov.uk overview + 6 legislation.gov.uk: s.35, s.51A, s.56, FA 2026 s.29, s.270AA, s.270IA, FA 2025 Sch 5). Good. Add s.198 + TCGA 1992 s.37B as in-body anchors if not already numbered.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; Article auto-emitted by `buildBlogPostingJsonLd`). **No `reviewedBy` field currently** — ADD it (cluster convention below).
- **Last meaningful edit date:** `dateModified: 2026-05-30`; `sourcesVerifiedAt: 2026-05-30` (post the §38 FA 2026 lock — facts are current).
- **HTML hygiene:** citation anchors use unique ids (`cite-gov`, `cite-s35`, `cite-s51a` etc.) — clean. No duplicate-id defect (that was the PRIOR pass's problem and it is resolved). No empty FAQ placeholder heading.

---

## GSC angle (last 90 days) — from diagnosis payload

**From the diagnosis (verify with a fresh pull at execution, e.g. `python -m optimisation_engine.track2.pull_page_data --slug capital-allowances-on-property`):**

- **Aggregate:** ~16 Google impressions across 9 distinct indexed queries, average position band **43-91** (page 4-9). Effectively **INVISIBLE** for the head-term family. 0 clicks.
- **Query breadth is the asset.** Unlike a single-keyword page, this slug already surfaces on 9 distinct head terms ("capital allowances on property", "property capital allowances", "capital allowances on investment property in uk", "can you claim capital allowances on investment property", "capital allowances property improvements", "rental capital allowances", "capital allowance claim on commercial property", "capital allowances for commercial property owners", "capital allowances on leasehold property improvements"). That breadth is exactly the decision-router signature — Google sees this as the broad entry-point, which is the intent to OWN.
- **Equity check vs the pillar (same GSC method):** the designated canonical pillar `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` shows **1 impression / 1 query ("it comes under which section") / pos 3.0**, versus THIS page's **16 impressions / 9 distinct head-term queries / pos 59.1**. This page is decisively stronger on demand and query breadth. A 301 into the pillar would destroy ranking equity and is rejected by the deterministic equity guard. Never collapse a stronger page into a weaker one.
- **Bing/cross-engine:** per memory `bing_webmaster_data.md`, legacy capital-allowance pages sometimes rank page-1 Bing while page 4-8 Google. At execution, pull `bing_query_data` for this slug — if Bing visibility is materially higher, that reinforces the top-of-page snippet-bait decision matrix (Bing rewards structured tables).
- **Read:** there is no CTR-fail lever to pull at position 50. The diagnosis correctly orders the gap modes: **become visible by owning the decision-router intent with a scannable matrix the head-term queries reward**, which is the prerequisite for any future click. Meta optimisation supports this (lead with "does yours qualify?") but is not by itself the lift.
- **GA4:** pull `ga4_page_data` for this slug at execution; expect near-zero sessions consistent with the impression volume. Do not gate the rewrite on GA4.

**Strategic conclusion:** REWRITE as a discoverability + decision-router job, positioned as the cluster's broad entry-point hub. Realistic post-rewrite target: move off page 4-9 onto page 1-3 for the broad "capital allowances on property" head-term family over 90-180 days, on the strength of the decision matrix (snippet/AI-overview bait), the existing FA-2026-current depth, and internal-link authority from the deep-dive siblings. Set the `monitored_pages` window to **180 days** (INVISIBLE-baseline page per the F-11 long-window rule).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INVISIBLE.** Position 43-91 across 9 head-term queries means the page is not seen. The fix is to give Google/Bing the strongest possible "this is THE decision-router for capital allowances on property" signal: a top-of-page property-type x what-qualifies x which-allowance matrix (no competitor or sibling owns this), tight scannable routing, and answer-shaped FAQ verbatims.

**Secondary: STRUCTURE.** The page is currently a well-written prose "complete guide". It lacks the single highest-value structural asset for this intent: a quick-decision matrix near the top that answers "does my property qualify?" at a glance. It also reads as a long-form guide that re-derives mechanism detail the siblings own, diluting its altitude. The re-polish converts each mechanism section to a 1-2 paragraph router blurb + forward-link, and front-loads the decision matrix.

**Tertiary / downstream: CTR_FAIL.** 0 clicks, but this is a consequence of INVISIBLE, not an independent lever. Rewrite metaTitle/metaDescription/H1 to lead with the decision-router promise (a hygiene + intent-repositioning step), but treat structure + matrix as the load-bearing fix.

**NOT present (confirmed clean — do not re-litigate):**
- **No STALE_FACT risk.** Facts are FA-2026-aligned and verified 2026-05-30 (WDA 14% / special rate 6% / 40% FYA s.45U / AIA £1m permanent / full expensing s.45S company-only / FHL abolition FA 2025 Sch 5). The prior STALE_FACTS pass is discharged.
- **No pricing leak.** No fee figures anywhere; only statutory £ amounts (£1m AIA cap, worked-example asset costs), which are facts not fees. Keep it that way (Decision E: even a soft "£800-£1,500 general-market" fee comparison is a pricing leak — do not introduce one in the professional-advice section).
- **No em-dash.** None in body; keep zero.
- **Compliant social proof.** Anonymised, generic partner-firm CTA. Keep.

**Load-bearing fix sequence (ordered by ROI):**
1. **Add the top-of-page quick-decision matrix** (the distinct asset; plain HTML `<table>`, no pricing) immediately after the opening 2-3 framing paragraphs. This is the whole point of the re-polish.
2. **Tighten each mechanism section to a 1-2 paragraph router blurb + forward-link.** Keep the worked examples that illustrate the DECISION (residential common-parts vs in-dwelling bar; sole-trader 40% FYA), but do NOT re-derive AIA association rules, the full WDA hybrid arithmetic, the full s.270 sub-section walk, or the s.198 election content depth — those belong to the siblings. Trim where the page over-explains a mechanism the sibling owns.
3. **Add a second reference table** for the rates/thresholds spine (allowance x rate x who/when) where it aids scanning, plain HTML, no pricing.
4. **Re-order FAQs** so the highest-impression head-term verbatims are FAQ #1-#4; keep net count 12-14 (already 14).
5. **Add `reviewedBy` + `reviewerCredentials`** frontmatter (cluster convention) for E-E-A-T parity with deployed siblings.
6. **Rewrite metaTitle/metaDescription/H1** to lead with the decision-router promise ("does yours qualify?" / property-type routing), repositioning away from the gov.uk-overlapping "complete guide" explainer intent.
7. **Confirm internal OUT-links** to all cluster deep-dives resolve (hub-routing) and the reciprocal pillar link is present.

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/_archive/track2_cannib_index_2026-05-23.md` (refresh-read at execution). The slug sits in a dense capital-allowances cluster of 14+ pages.

**Collapse-direction check (mandatory): collapse is DROPPED on two independent grounds.**
1. **Standing rule:** Track 2 is rewrite-only; collapse is a deferred workstream (memory `feedback_rewrite_only_no_collapse.md`).
2. **Equity guard:** the only overlap that matters is the designated canonical pillar `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`. Same-method GSC equity check: pillar = 1 impr / 1 query / pos 3.0; THIS page = 16 impr / 9 distinct head-term queries / pos 59.1. This page is decisively the stronger page on demand and query breadth. A 301 into the pillar is a reversed-equity collapse that `scripts/track2_collapse_guard.py` R6 blocks, and house_positions §38 records this exact collapse as diagnosed-then-dropped. If anything, the zero-equity pillar should LATER 301 into this page, not the reverse. Reciprocal forward-link only.

**Distinct intent to own on rewrite.** This page is the **broad "capital allowances on property" entry-point / decision-router** answering the head queries gov.uk and competitors compete for: does my property qualify? residential vs commercial vs HMO common parts vs former-FHL? It routes to the specialist sub-guides. The **pillar** owns the exhaustive CAA-2001 "complete decision framework" long-tail (who claims what, through which vehicle, with full mechanics). The **mechanism siblings** each own one lever and must NOT be duplicated here, only forward-linked.

**Differentiation rule for the rewrite (hard):** keep each mechanism to a 1-2 paragraph router blurb plus forward-link (no deep recomputation), and add the **top-of-page quick-decision matrix (property type x what qualifies x which allowance)** that no sibling owns. That decision-router table is the distinct asset this page should rank for. The mechanism siblings to forward-link (and NOT duplicate):
- AIA depth → `annual-investment-allowance-uk` (+ `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010`)
- WDA rates + straddling hybrid → `writing-down-allowance-rates`
- SBA mechanics → `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward`
- Integral features → `integral-features-capital-allowances`
- Commercial fixtures menu → `capital-allowances-commercial-property-what-can-claim`
- Full expensing / 50% FYA → `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`
- HMO common-parts s.35 mechanics → `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`
- FHL grandfathering → `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`
- Balancing charge on disposal → `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics`

**Conclusion:** REWRITE in place as the broad-intent decision-router hub. No REDIRECT-PROPOSED (reversed-equity collapse blocked). No FLAG-MANAGER (page is clean). The hub discipline IS the cannibalisation-management mechanism: this page stays broad and routes OUT; the siblings own the mechanics.

---

## Section-by-section content plan (~3,800 words)

Target ~3,800 words (up from 3,401), with the increment going almost entirely to the new decision matrix + reference table + tightened router blurbs (NOT to re-derived mechanism depth). Altitude stays broad-gateway throughout.

1. **What Are Capital Allowances on Property?** (~280 words) — Keep the existing gateway framing: capital allowances = relief on qualifying assets; the capital-vs-revenue gateway question (forward-link `capital-vs-revenue-expenditure-landlord-uk`); the rules turn sharply on property type. Add ONE sentence that previews the decision matrix below ("The matrix below answers, at a glance, whether your property type qualifies and which allowance applies."). 1 inline `<aside>` CTA already present after this section — keep.

2. **NEW — Quick-Decision Matrix: Does Your Property Qualify?** (~220 words including table) — THE distinct asset. Two or three framing sentences ("Use this matrix as the entry-point; each row links to the deep-dive for that mechanism."), then the **DECISION MATRIX TABLE** (spec below). This sits high on the page for snippet/AI-overview capture. No pricing; statutory facts only.

3. **Residential Property: The Section 35 Dwelling-House Bar** (~300 words) — Keep s.35 anchor + the common-parts carve-out + the converted-six-flats worked example (this illustrates the DECISION, so it stays). Tighten any over-explanation. Forward-link `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` for the HMO common-parts mechanics and `landlord-tax-deductions-uk-2026-complete-list` for the replacement-of-domestic-items route residential landlords actually use.

4. **Commercial Property: The Full Plant and Machinery Regime** (~260 words) — Keep the qualifying-fixtures list + s.33A integral-features mention as a ROUTER blurb. Forward-link `capital-allowances-commercial-property-what-can-claim` (full menu) and `integral-features-capital-allowances` (s.33A five categories). Do NOT re-derive the integral-features categories in depth here.

5. **The Annual Investment Allowance (AIA): Permanent at £1 Million** (~200 words) — Router blurb: 100% in year of spend, £1m permanent (s.51A(5), F(No.2)A 2023 s.8), commercial/common-parts tool (barred for in-dwelling plant by s.35), excess pools down. Forward-link `annual-investment-allowance-uk` + `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` for allocation/association rules. Do NOT re-derive the s.51E/s.51G association rules.

6. **Full Expensing and the New 40% First-Year Allowance** (~280 words) — Router blurb distinguishing company-only full expensing (s.45S, 100%) from the 40% FYA (FA 2026 s.29 → CAA 2001 s.45U, on/after 1 Jan 2026, new+unused main-rate, excludes cars/second-hand/overseas-leasing, NOT incorporation-restricted). Keep the sole-trader £60,000 worked example (it illustrates WHEN the 40% FYA bites vs full expensing — a decision, so it stays). Forward-link `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`. Per §38: do NOT write "40% FYA is unincorporated-only".

7. **Writing-Down Allowances: 14% Main Pool, 6% Special Rate** (~200 words) — Router blurb: main pool 14% (FA 2026 s.28 → CAA 2001 s.56(1), from 1 Apr 2026 CT / 6 Apr 2026 IT), special rate 6% unchanged (s.104D), straddling periods use a hybrid time-apportioned rate (s.28(2)-(6)). Keep a one-line pointer to the worked hybrid; forward-link `writing-down-allowance-rates` for the full arithmetic and `writing-down-allowance-cars` for car-emissions pooling. Trim the full hybrid walk-through (sibling owns it).

8. **The Structures and Buildings Allowance (SBA)** (~280 words) — Router blurb: 3% straight-line over 33⅓ years (s.270AA), construction on/after 29 Oct 2018, non-residential first use; the allowance-statement trap (s.270IA(2): nil without it, including for successor owners); no balancing event on sale but TCGA 1992 s.37B add-back to CGT base cost; residential exclusion s.270CF (NOT s.270BG). Keep the £1m → £30k/yr worked example. Forward-link `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward`. Do NOT re-derive the full s.270BA-270CF sub-section walk.

9. **Furnished Holiday Lets: The Regime Has Been Abolished** (~220 words) — Keep: FA 2025 Sch 5 abolition (6 Apr 2025 IT / 1 Apr 2025 CT); former FHL = ordinary residential business, s.35 bar applies to new spend; grandfathered pools continue WDA. Forward-link `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics`. Cross-ref §6 + §25.7.

10. **NEW — Capital Allowances at a Glance: Rates and Who Can Claim** (~120 words including table) — A compact **REFERENCE TABLE** (allowance x rate x who/when, spec below) consolidating the rate spine for scanning. Plain HTML, no pricing. Sits after FHL, before the claim-process sections, as the second snippet-bait asset.

11. **How to Claim, and the Two-Year Window** (~200 words) — Keep: claim via SA return / CT600; broadly two-year amendment window; pooling persists across periods; fixtures purchase has the tighter s.198 conditions. Keep as a router blurb; forward-link the fixtures/disposal sibling for the s.198 detail.

12. **Capital Allowances When You Sell a Commercial Property** (~240 words) — Router blurb: disposal values under s.61 + fixtures Table s.196; balancing charge where TDR exceeds pool; the joint s.198 election fixes the value (pooling-requirement gate s.187B); SBA no balancing event but s.37B add-back. Forward-link `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` (and the s.198 fixtures sibling if a distinct live slug exists — confirm at execution). Do NOT re-derive the full s.198 election content/form depth (sibling owns it).

13. **Holding Property Through a Limited Company** (~180 words) — Keep: company has widest access (AIA, WDAs, full expensing s.45S, 50% special-rate FYA, SBA); s.35 bar still applies to corporate residential landlords (common parts only). Forward-link `buy-to-let-limited-company-complete-guide-uk`. Keep boundary-clean vs §4 Section 24.

14. **Capital Allowances and Making Tax Digital** (~160 words) — Keep: MTD ITSA thresholds £50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028; capital allowances feed the year-end digital return. Forward-link `making-tax-digital-landlords-april-2026-deadline` (verify slug live at execution).

15. **Where to Go Next** (~140 words) — Keep the hub-routing list; ensure it links the pillar (reciprocal) + AIA + WDA + SBA + integral-features + full-expensing siblings. This is the explicit decision-router exit.

16. **When to Get Professional Advice** (~180 words) — Keep. Number-free per Decision E (no fee bands). Generic anonymised partner-firm CTA; "use the form on this page" handoff. Keep the Section-24-is-separate boundary note.

17. **Sources** (`<ol>`) — Keep the 7 numbered legislation.gov.uk/gov.uk citations; add TCGA 1992 s.37B and CAA 2001 s.198 as numbered anchors if cited in body.

### TABLE 1 (REQUIRED — the distinct decision-router asset): Quick-Decision Matrix

Plain HTML `<table>`. This is a decision/"does it qualify" matrix, so a side-by-side comparison table is mandatory. No pricing; statutory facts only.

**Columns:** `Property / area type` | `Plant & machinery allowances?` | `Which allowance applies` | `Key statute / nuance` | `Deep-dive`

**Rows (one per property-type decision):**
| Property / area type | P&M allowances? | Which allowance applies | Key statute / nuance | Deep-dive |
|---|---|---|---|---|
| Residential dwelling (BTL flat/house interior) | No | None for in-dwelling plant; use replacement-of-domestic-items relief / revenue repairs instead | CAA 2001 s.35 dwelling-house bar | landlord-tax-deductions guide |
| Common parts of a block / HMO (communal boiler, lift, stairwell lighting, door entry) | Yes (common-parts portion) | AIA, WDA, 40% FYA / full expensing as applicable | s.35 carve-out; just-and-reasonable apportionment where shared | hmo-common-parts s.35 mechanics |
| Commercial property (offices, shops, warehouses, industrial) | Yes (full regime) | AIA + WDA; integral features in special-rate pool | s.33A integral features; List C plant | commercial what-can-claim / integral features |
| New non-residential construction (the building shell) | No (P&M); SBA instead | SBA 3% straight-line over 33⅓ years | s.270AA; allowance statement s.270IA; s.270CF residential bar | SBA claim-mechanics |
| Former furnished holiday let (post 6 Apr 2025 / 1 Apr 2025) | No new spend | Grandfathered pools continue WDA; new spend barred by s.35 | FA 2025 Sch 5; ordinary residential business now | fhl-grandfathered claims |
| Fixtures bought with a commercial property | Yes, if pooled + elected | Buyer claims via s.198 election value | s.187B pooling gate; s.198 2-year election | fixtures / disposal mechanics |

### TABLE 2 (REQUIRED — rates/thresholds reference): Capital Allowances at a Glance

This is a rates/bands/thresholds spine, so a reference table that aids scanning is required. Plain HTML, no pricing.

**Columns:** `Allowance` | `Rate` | `Who / when` | `Statute`

**Rows:**
| Allowance | Rate | Who / when | Statute |
|---|---|---|---|
| Annual Investment Allowance (AIA) | 100% in year, up to £1,000,000 | Permanent from 1 Apr 2023; businesses with qualifying P&M (not in-dwelling) | CAA 2001 s.51A(5); F(No.2)A 2023 s.8 |
| Full expensing | 100% first-year | Companies only; new + unused main-rate plant | CAA 2001 s.45S |
| 50% first-year allowance | 50% first-year | Companies only; new + unused special-rate assets | CAA 2001 s.45S companion |
| New 40% first-year allowance | 40% first-year | New + unused main-rate plant, spend on/after 1 Jan 2026; excludes cars, second-hand, overseas-leasing | FA 2026 s.29 → CAA 2001 s.45U |
| Main-pool WDA | 14% reducing balance | From 1 Apr 2026 (CT) / 6 Apr 2026 (IT); straddling-period hybrid | FA 2026 s.28 → CAA 2001 s.56(1) |
| Special-rate-pool WDA | 6% reducing balance | Unchanged; integral features, long-life assets | CAA 2001 s.104D |
| Structures & Buildings Allowance | 3% straight-line (33⅓ yrs) | Non-residential construction on/after 29 Oct 2018 | CAA 2001 s.270AA |
| Zero-emission car FYA | 100% first-year | New + unused 0 g/km cars; to 31 Mar 2027 (CT) / 5 Apr 2027 (IT) | CAA 2001 s.45D |

---

## Statute spine (every section number with its Act — verify each on legislation.gov.uk at write time per F-8/F-37)

**Capital Allowances Act 2001 (CAA 2001):**
- s.15 — qualifying activities (post-FA-2025 omission of FHL paras (c)/(da)) — §25.1
- s.21 — buildings exclusion (List A) — §25.2 (optional, only if commercial section needs the shell/plant line)
- s.23 — List C carve-back (plant fixed to a building) — §25.2 (optional)
- s.33A — integral features, five categories, special-rate pool — §25.2 / §38
- s.35 — dwelling-house bar (residential P&M restriction) + common-parts/just-and-reasonable apportionment — §25.7 / §38 [LOAD-BEARING; verify subs (2) bar + subs (3) apportionment verbatim]
- s.38B — cars excluded from AIA (General Exclusion 2) — §38 (only if AIA-cars line included)
- s.45D — 100% FYA, zero-emission (0 g/km) cars — §25.5 / §38
- s.45S — full expensing, 100% FYA, companies only — §25.5 / §38
- s.45U — the new 40% FYA, inserted by FA 2026 s.29 — §38 [verify the inserted-section number resolves; never invent]
- s.46 — general FYA exclusions (leasing etc.) — §25.5 (only if leasing nuance included)
- s.51A(5) — AIA maximum £1,000,000 (permanent) — §25.3 / §38
- s.56(1) — main-pool WDA now 14% (substituted by FA 2026 s.28(1)) — §38 [LOAD-BEARING; verify it reads 14% with the FA 2026 annotation]
- s.61 — disposal events and disposal values — §25.6
- s.104D — special-rate-pool WDA 6% (unchanged) — §38
- s.187B — pooling requirement (buyer fixtures gate) — §25.11
- s.196 — fixtures disposal-value Table — §25.6
- s.198 — fixtures election on sale of qualifying interest (2-year limit via s.201) — §25.2 / §25.11
- s.270AA — SBA: 3% rate, 29 Oct 2018 gate, 33⅓-year period — §25.4 / §38
- s.270CF — SBA residential-use exclusion (NOT s.270BG, which is land-acquisition) — §25.4
- s.270IA(2) — SBA allowance-statement requirement (nil without it) — §25.4

**Finance Acts:**
- Finance Act 2026 (c.11), Royal Assent 18 March 2026, ENACTED — s.28 (WDA 14% substitution + s.28(2)-(6) straddling hybrid); s.29 (40% FYA, inserting CAA 2001 s.45U) — §38 [F-37: re-verify RA date + that s.28/s.29 are enacted, not Bill-form; cited URLs https://www.legislation.gov.uk/ukpga/2026/11/section/28 and /section/29 must resolve]
- Finance (No. 2) Act 2023 (c.30), RA 11 July 2023 — s.8 (AIA £1m permanent); insertion of CAA 2001 s.45S full expensing — §25.8 / §38
- Finance Act 2025 (c.8), Schedule 5 — abolition of the FHL regime; Part 3 (capital allowances), Part 5 commencement 1 Apr 2025 (CT) / 6 Apr 2025 (IT) — §6 / §25.7 / §38
- Finance Act 2020 — SBA rate uplift 2% → 3% (1 Apr / 6 Apr 2020) — §25.4 (only if the uplift is mentioned)

**Taxation of Chargeable Gains Act 1992 (TCGA 1992):**
- s.37B — SBA cumulative add-back into CGT base cost on disposal — §25.4 / §25.6 [verify resolves at write time]

**Income Tax (Trading and Other Income) Act 2005 (ITTOIA 2005):**
- (only if the MTD/qualifying-income framing needs it) — not required for the core spine.

---

## Competitor depth benchmark (Stage 2 — carried from diagnosis; RE-FETCH + status-check at execution per §16.31)

| URL | Re-fetch status (execution) | What to borrow | What to differentiate against |
|---|---|---|---|
| https://lovellconsulting.com/property-investor/ | __ verify 200 | Property-investor capital-allowances framing; survey/embedded-fixtures angle | Specialist-firm angle, likely no decision matrix; we add the property-type router + FA-2026 currency. |
| https://www.eddisons.com/insights/a-guide-to-capital-allowances-for-commercial-property | __ verify 200 | Commercial surveyor fixtures-survey framing | Commercial-only; our page is the residential-AND-commercial decision-router. We add the s.35 residential bar + common-parts carve-out they omit. |
| https://propertytaxoptimisers.co.uk/blog/capital-allowances-for-landlords/ | __ verify 200 | Landlord-specific residential-vs-commercial gateway angle (matches our consumer intent) | Check FHL handling (likely stale pre-abolition) + WDA/AIA rate currency; we are FA-2026-current. |
| https://taxeezy.co.uk/resources/tax-guides/capital-allowances-for-landlords-letting-out-uk-property/ | __ verify 200 | Plain-English landlord gateway structure | Likely pre-FA-2026 (18% WDA / AIA-temporary). Our differentiator: 14% WDA + 40% FYA s.45U + AIA permanent + the decision matrix. |

**Competitor depth ceiling for this query class:** generally ~1,500-3,500 words, 0-4 FAQs, mostly prose with NO property-type decision matrix, and frequently at least one pre-FA-2026 stale rate. **No competitor owns a property-type x what-qualifies x which-allowance matrix.** Our ~3,800-word page with 12-14 FAQs + the decision matrix + the rates reference table + FA-2026-current statute anchoring + hub-routing to deep-dive siblings is decisively best-in-class on **structure, currency, and decision-router utility**, not just length.

**What to borrow:** eddisons' fixtures-survey framing for the commercial router blurb; the plain-English landlord gateway tone from taxeezy/propertytaxoptimisers.
**What to differentiate against:** every competitor is prose-only with no decision matrix and likely at least one stale rate. Our distinctiveness is the matrix + "current as of FA 2026 (RA 18 March 2026)" + the hub-routing.

---

## Internal-link targets within the live corpus (Stage 2)

All paths to be verified to exist on disk at execution (`Property/web/content/blog/`). Path = `/blog/<category-slug>/<slug>`. The page is the HUB; these are forward-links OUT.

**Route OUT to (canonical deep-dives):**
- `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — the decision-framework pillar; reciprocal forward-link (the zero-equity pillar should later 301 here, not vice-versa).
- `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` — AIA deep-dive (note category `section-24-and-tax-relief`).
- `/blog/.../aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` — AIA allocation/association rules (verify category slug at execution).
- `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` — WDA rates + hybrid.
- `/blog/section-24-and-tax-relief/writing-down-allowance-cars` — WDA on cars / emissions pooling.
- `/blog/property-types-and-specialist-tax/structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` — SBA mechanics.
- `/blog/property-types-and-specialist-tax/integral-features-capital-allowances` — integral features (s.33A).
- `/blog/property-types-and-specialist-tax/capital-allowances-commercial-property-what-can-claim` — commercial qualifying-asset menu.
- `/blog/property-types-and-specialist-tax/full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — company full-expensing + 50% FYA.
- `/blog/.../hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` — HMO common-parts s.35 (verify slug + category live at execution).
- `/blog/.../fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — FHL grandfathered pools (verify slug live).
- `/blog/.../balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` — balancing charge on disposal (verify slug live).

**Upstream gateway + supporting (link from the relevant section):**
- `/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk` — the capital-vs-revenue line (already linked in intro; keep + strengthen).
- `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — residential deductions / replacement-of-domestic-items route (already linked; keep).
- `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — incorporation comparison (already linked; keep).
- `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — MTD section forward-link (already linked; verify slug live at execution).

**Confirm-at-execution:** the HMO common-parts, FHL-grandfathered, balancing-charge, AIA-association, and fixtures-election sibling slugs + categories. Verify live before linking; do not invent. Where a sibling is not yet live, link the nearest live equivalent or omit the forward-link rather than fabricate a path.

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis, each assigned exactly once to where it is served. (metaTitle / H1 / H2# / FAQ# / body§; H2 numbers refer to the section-by-section plan above.)

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| capital allowances on property | gsc (primary) | 16* | 59.1* | metaTitle + H1 |
| property capital allowances | gsc | 4 | 51.3 | H2#1 (opening framing) |
| capital allowances on investment property in uk | gsc | 3 | 43 | FAQ#1 (verbatim: "Can I claim capital allowances on an investment property in the UK?") |
| capital allowances property | gsc | 2 | 48.5 | Table 1 caption + H2#2 lead |
| can you claim capital allowances on investment property | gsc | 2 | 59 | FAQ#2 (verbatim "Can you claim capital allowances on investment property?") |
| capital allowances property improvements | gsc | 1 | 75 | FAQ#3 (improvements: capital-vs-revenue + integral-features line) |
| rental capital allowances | gsc | 1 | 67 | H2#3 (residential s.35) body§ |
| capital allowance claim on commercial property | gsc | 1 | 91 | H2#4 (commercial regime) + Table 1 commercial row |
| capital allowances for commercial property owners | gsc | 1 | 76 | FAQ#4 (verbatim "What capital allowances can commercial property owners claim?") |
| capital allowances on leasehold property improvements | gsc | 1 | 69 | FAQ#5 (leasehold improvements: s.35 in-dwelling vs common-parts; SBA non-residential) |
| capital allowances buy to let property | adjacent | 0 | 0 | FAQ#6 (verbatim "Can I claim capital allowances on a buy-to-let property?") |
| can you claim capital allowances on residential property | adjacent | 0 | 0 | H2#2 (s.35 bar) body§ + Table 1 residential row |
| capital allowances on commercial property | adjacent | 0 | 0 | metaDescription + H2#4 |
| capital allowances HMO common parts | adjacent | 0 | 0 | H2#2 common-parts carve-out + Table 1 common-parts row + FAQ#7 |

*Aggregate impressions/position for the head term per the cannibalisation equity-check figures; verify exact per-query split at execution.

---

## Meta plan

- **metaTitle (<=62):** `Capital Allowances on Property: UK Decision Guide 2026` (54 chars) — repositions from generic "Landlord Guide" to "Decision Guide", signalling the property-type decision-router intent and stepping away from the gov.uk-overlapping explainer framing. (Alt if a stronger CTR hook is wanted at execution: `Capital Allowances on Property 2026: Does Yours Qualify?` (56 chars).)
- **metaDescription (<=158):** `Does your property qualify for capital allowances in 2026? Residential vs commercial vs HMO common parts, the s.35 bar and a quick-decision matrix.` (147 chars) — leads with the "does yours qualify?" decision hook + names the matrix + the property types the head queries use.
- **h1:** `Capital Allowances on Property: Which Properties Qualify in 2026` — decision-router framing carrying the primary head term; distinct from the metaTitle wording (avoids verbatim duplication) while keeping the exact-match phrase "Capital Allowances on Property".
- **summary (frontmatter):** Keep the existing accurate summary, lightly retuned to foreground the decision-router: "Capital allowances on property let UK landlords and investors claim tax relief on qualifying fixtures, plant and structures, but whether you can claim turns sharply on property type. This decision-router explains which properties qualify after Finance Act 2026, why residential dwellings are barred by CAA 2001 s.35 while commercial property and HMO common parts qualify, and routes you to the deep-dive on each allowance (AIA, the 40% FYA, full expensing, the SBA and writing-down allowances)."

---

## Schema plan

- **reviewer name (reviewedBy):** `ICAEW Qualified Senior Reviewer` (the deployed Property-site reviewer attribution; REAL reviewer convention used across the corpus and the capital-allowances cluster siblings via `reviewedBy` frontmatter → `schema.ts` `reviewedBy.name`).
- **reviewer credentials (reviewerCredentials):** `Chartered Accountant (ACA, ICAEW), Property Tax Specialist` (the exact credential string the 8 deployed capital-allowances cluster siblings use; maps to `schema.ts` `reviewedBy.jobTitle`). ADD both fields to frontmatter (currently absent) for E-E-A-T parity with the siblings.
- **howTo:** `false`. This is a broad decision-router / gateway page, not a single step-by-step procedure. Do NOT emit HowTo JSON-LD. (The "How to Claim" section is a router blurb, not an ordered procedure that warrants HowTo markup.)
- **dateModified:** `2026-05-30` (per instruction; also set `sourcesVerifiedAt: 2026-05-30` — facts unchanged since the §38 lock; the re-polish is structural, no new statutory facts introduced, so the verification date stays valid. If the execution session re-verifies any statute URL it may bump both to the execution date.)
- **JSON-LD blocks that emit:** `Article` (auto via `buildBlogPostingJsonLd`, now carrying `reviewedBy`) + `FAQPage` (auto from the frontmatter `faqs:` array, 12-14 entries). **NOT HowTo.** Do not hand-add FAQ or Article schema in the body — the renderer emits both from frontmatter.

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13` and house_positions §13: NO em-dashes anywhere (commas, parentheses, full stops, middle dots); anonymised social proof only; NO pricing/fees (Decision E: even a soft "£800-£1,500 general-market" fee comparison is a pricing leak — do not introduce one); exact figures + named statute; LeadForm auto-injected by `BlogPostRenderer.tsx` (never duplicated); 1-3 inline `<aside>` CTAs at conversion moments (the page already has one after the intro — keep, optionally add one after the commercial/SBA section); semantic HTML only, no Tailwind utility classes in body; frontmatter `faqs:` array drives FAQPage schema (never hand-add FAQ schema in body); statute-citation discipline (F-8: content can be removed by amendment even when the URL is live — verify current wording; F-37: state FA 2026 s.28/s.29 as ENACTED, RA 18 March 2026, never Bill-form).

**Critical for THIS brief:** the page is already clean — the job is structure + the decision matrix, not correctness. Do NOT regress the facts. Keep zero em-dashes, zero pricing. Hub-discipline: link OUT, do not re-derive sibling mechanism depth. The two REQUIRED tables (decision matrix + rates reference) are plain HTML with statutory facts only.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas (do not restate)

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full 19-step legacy-rewrite workflow. **Track 2 deltas for this page:**
- Step 1: read house_positions §38 + §25.1-§25.12 + §6 + §13 in full at session start.
- Step 4 (verification): re-verify FA 2026 c.11 RA 18 Mar 2026 + CAA 2001 s.56 = 14% (substituted by FA 2026 s.28(1)) + CAA 2001 s.45U (40% FYA, inserted by FA 2026 s.29) + s.35 subs (2)/(3) + TCGA 1992 s.37B + CAA 2001 s.270CF on legislation.gov.uk. Facts are already on-page and correct; this is a confirm-don't-regress check, not a rewrite of the facts.
- Step 9: **rewrite markdown at existing path** (not a new file). Preserve frontmatter slug + canonical + category. ADD `reviewedBy` + `reviewerCredentials`. Insert the two required `<table>` blocks (decision matrix high on page; rates reference after FHL). Rewrite metaTitle/metaDescription/h1 per Meta plan. Re-order FAQs so head-term verbatims lead. Keep dateModified/sourcesVerifiedAt 2026-05-30 (or bump to execution date if any URL re-verified).
- Step 11 six-checks: FAQ schema count = frontmatter length (12-14); em-dash count = 0; Tailwind class count = 0; meta title <=62 + complete; meta description <=158 + complete; all internal links resolve; **+ pricing-check** (`£[0-9]` returns only statutory amounts, no fee bands); **+ table-render check** (both `<table>` blocks render as valid HTML, no Tailwind classes); **+ unique-id check** (no duplicate `id=` in body).
- Step 12: confirm NO redirect (collapse dropped + equity-guard-blocked; REWRITE in place).
- Step 13: insert/update `monitored_pages` row — **180-day window** (INVISIBLE-baseline page per F-11).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §38 WDA 14%/6% (FA 2026 s.28) + straddling hybrid (kept correct, router blurb): __
- §38 40% FYA (FA 2026 s.29 → CAA 2001 s.45U; not incorporation-restricted): __
- §38 AIA £1m permanent (s.51A(5) / F(No.2)A 2023 s.8): __
- §38 full expensing companies-only (s.45S): __
- §38 / §25.7 s.35 dwelling-house bar + common-parts carve-out: __
- §25.4 SBA (s.270AA / 29 Oct 2018 / s.270IA / s.270CF / s.37B): __
- §6 + §25.7 FHL abolition (FA 2025 Sch 5; grandfathered pools): __
- FA 2026 c.11 RA 18 Mar 2026 re-verified on legislation.gov.uk: __ (Y/N + date)

### Comparison: before vs after
- Word count: 3,401 → __ (target ~3,800)
- H2 count: 14 → __ (target ~16 incl. the two new table sections)
- FAQ count: 14 → __ (keep 12-14; head-term verbatims re-ordered to lead)
- Decision matrix table added (Table 1): __ (Y/N)
- Rates reference table added (Table 2): __ (Y/N)
- reviewedBy + reviewerCredentials added: __ (Y/N)
- Worked examples: 5 → __ (keep the decision-illustrating ones; trim re-derived mechanism arithmetic)
- Authority links: 7 → __ (keep; + TCGA s.37B / CAA s.198 if cited)
- Internal OUT-links to cluster deep-dives: __ (hub-routing count)
- metaTitle: "...UK Landlord Guide 2026" → __
- metaDescription: (mechanism-list) → __
- h1: "...A Complete Guide for UK Landlords" → __

### Flags raised
- No STALE_FACTS, no pricing leak, no em-dash (confirmed clean at diagnosis): __ confirmed still clean post-rewrite
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
