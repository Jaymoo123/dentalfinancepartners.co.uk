# Track 2 brief: aia-capital-allowances

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief
**Source markdown path:** `Property/web/content/blog/aia-capital-allowances.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/aia-capital-allowances
**Stage 1 priority:** M (zero own-equity, but high-value cluster-hygiene fix — the page carries actively-wrong s.35 advice that must be corrected, and the rewrite locks the cluster's scope-filter intent)
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (house-position §25 + §38 + §7 ground truth re-verified; cluster siblings filesystem-confirmed)
**Cannibalisation status:** REWRITE (sharp differentiation) + FLAG-MANAGER (2 dead-duplicate landlord siblings flagged for a SEPARATE future cluster-collapse pass; not touched here)
**Decision:** REWRITE (rewrite-only mode — collapse forbidden; see §"Cannibalisation universe check")

> **Gold-reference depth target.** Match `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (data-complete) and the `birmingham-property-accountant.md` city-template depth + pricing-leak discipline. Every statute citation below carries an Act + section and MUST be re-verified against legislation.gov.uk at write time (including the Royal Assent date of Finance Act 2026 — the F-37 Bill-vs-enacted pattern).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `aia-capital-allowances`. The slug is generic/strong for the scope-filter intent ("does AIA apply to MY rental property"). Rewrite-only mode forbids a 301 collapse even though this page is among the weakest in its cluster (0/0 equity). Slug retained; canonical retained.
- **Category:** `property-types-and-specialist-tax` (kept — frontmatter `category: Property Types & Specialist Tax`).
- **Gap-mode tags:** `STALE_FACTS` (primary — actively wrong s.35 advice + garbled FYA framing + dead source link) + `INVISIBLE` (0 GSC + 0 Bing on the head term) + `THIN_DEPTH` (1,436 words; no statute spine; no scope-filter framework) + `STRUCTURE` (4 FAQs, no decision table, no reviewer byline) + `CANNIBAL` (4-way head-keyword collision inside a ~16-page cluster).
- **"Why this rewrite" angle:** the live page tells residential landlords they can claim AIA on "kitchens, bathrooms, heating systems, furniture and white goods in rental properties" (body lines 55-56 + FAQ framing) with NO mention of the **CAA 2001 s.35 dwelling-house bar**. Per house_positions **§25.10 + §38** this is FALSE and barred ("Landlords can claim AIA on furnishings/boilers inside a let dwelling" — barred by s.35). The load-bearing first job of the rewrite is the **factual correction**: reposition the page from a generic "AIA explainer" (which two stronger siblings already own) into the cluster's **residential-vs-commercial QUALIFICATION GATE** — the "does AIA actually apply to my property" decision page, anchored on s.35. This is a distinct primary intent no canonical owns, so it resolves the cannibalisation by differentiation rather than by collapse.

---

## Current page snapshot (Stage 2 — filesystem read 2026-06-02)

**Filesystem source read (`aia-capital-allowances.md`):**
- `word_count`: ~1,436 (body)
- H2 sections (13): What Are AIA Capital Allowances; Who Can Claim; What Qualifies; What Does Not Qualify; How Much Is the AIA Limit; When Can You Claim; How to Claim; AIA for Partnerships; AIA and Property Developers; Common Mistakes Landlords Make; Planning for the Future; Final Thoughts; Sources
- `metaTitle`: "AIA Capital Allowances: A Guide for UK Landlords" (48 chars)
- `metaDescription`: "AIA capital allowances explained for UK landlords. Learn how the £1m allowance works, what qualifies, and how to claim tax relief on plant and machinery." (151 chars)
- `h1`: "AIA Capital Allowances: What UK Landlords Need to Know"
- FAQs (frontmatter count): 4 (target 12-14)
- `author`: "Property Tax Partners Editorial Team"; **no `reviewedBy` / `reviewerCredentials` / `reviewedAt`** (missing the Wave 2+ byline pattern)
- `dateModified` + `sourcesVerifiedAt`: both stuck at `2026-05-20`
- `sourceDomains`: includes `aka.hmrc.gov.uk` (DEAD — ref-2 in body is `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm`)
- Internal links: 4 (`/services`, `what-does-a-property-accountant-do`, `property-investment-tax-uk-complete-guide-2026`, `landlord-tax-deductions-uk-2026-complete-list`, `how-to-choose-a-property-accountant`, `buy-to-let-limited-company-complete-guide-uk`)
- Outbound authority links: 1 live (gov.uk AIA page) + 4 secondary (ACCA, ATT, ICAEW, dead aka.hmrc) — **0 legislation.gov.uk statute citations**
- Decision/comparison table: 0
- Worked examples: 0
- Inline CTAs: 0

**Specific STALE_FACTS / house-position violations confirmed on read:**
1. **BANNED s.35 violation** (body lines 55-56, "What Qualifies" list): tells residential landlords AIA covers "Fixtures and fittings in rental properties (kitchens, bathrooms, heating systems)" + "Furniture and white goods (sofas, beds, fridges, washing machines)". This is barred by **CAA 2001 s.35** for plant in a dwelling-house. **Load-bearing fix.**
2. **STALE April-2027 assertion** (body line 110): "From April 2027, separate property income tax rates will apply, 22% basic, 42% higher, 47% additional" stated as a bare future assertion. Now ENACTED (FA 2026 c.11, RA 18 Mar 2026, §7). Must be re-stated WITH the enacted-law citation, OR trimmed (tangential to a capital-allowances page — recommend a single hedged sentence at most, see content plan §13).
3. **Garbled FYA framing** (body line 83): conflates the expired super-deduction (to 31 Mar 2023), full expensing, and the 50% special-rate FYA. Per §25.10 / §38: full expensing (s.45S) is COMPANY-ONLY + permanent; the page entirely OMITS the FA 2026 reforms — the new **40% FYA (s.29 / inserted s.45U, on or after 1 Jan 2026)** and the **main-pool WDA cut 18%→14% (s.28, from Apr 2026)**; special rate UNCHANGED at 6%.
4. **Cars/vans framing OK but under-cited** — should cite the **s.38B** AIA car exclusion + the **s.45D** zero-emission-car 100% FYA (0 g/km only).
5. **Dead source link** — ref-2 `aka.hmrc.gov.uk` (replace with live legislation.gov.uk / gov.uk).

**No pricing leak found** (no fee figures, no client names). **No em-dashes present.**

---

## GSC + Bing angle (last 90 days) — from diagnosis payload

**GSC:** this page = **0 impressions** in the window (INVISIBLE on Google).
**Bing:** the head-term equity sits on OTHER siblings, not this page; this page's landlord-specific siblings are also near-zero (1-8 Bing impr, pos 25-86, 0 clicks).

**Target-query table (verbatim from diagnosis):**

| query | source | impr | pos |
|---|---|---:|---:|
| aia capital allowances | adjacent | 0 | 0 |
| can landlords claim aia on rental property | adjacent | 0 | 0 |
| aia capital allowances rental property | adjacent | 0 | 0 |
| annual investment allowance | bing | 56 | 70.9 |
| annual investment allowance uk | bing | 56 | 70.9 |
| annual investment allowance landlords uk | bing | 32 | 63.9 |
| aia allowance uk property investors | bing | 8 | 25.3 |
| annual investment allowance 2024-25 | bing | 15 | 42.6 |
| capital allowance aia property landlords | bing | 1 | 81 |
| aia capital allowance property landlords | bing | 2 | 86 |
| capital allowances property investors caa 2001 | bing | 1 | 3 |
| does aia apply to residential property | adjacent | 0 | 0 |
| capital allowances residential vs commercial property | adjacent | 0 | 0 |
| s35 dwelling house capital allowances | adjacent | 0 | 0 |
| what plant and machinery qualifies for aia landlord | adjacent | 0 | 0 |

**Pattern read:** the generalist head term ("annual investment allowance" / "...uk") = 56 Bing impr but is OWNED by the `annual-investment-allowance-uk` canonical (Batch-4 brief). This page should NOT chase that head term. Its winnable, currently-unserved intent is the **scope-filter / qualification** cluster: "can landlords claim aia on rental property", "does aia apply to residential property", "capital allowances residential vs commercial property", "s35 dwelling house capital allowances", "what plant and machinery qualifies for aia landlord". These are zero-impression adjacent queries the cluster does not yet answer with a dedicated decision page. Realistic post-rewrite target: capture the qualification long-tail (low volume, high specificity, high conversion) + lift the dead landlord-specific Bing queries off pos 80+ by giving them a non-duplicate, correct, deeper page.

---

## Gap-mode diagnosis (Stage 1 → Stage 2 refined)

**Primary: STALE_FACTS.** The page gives actively wrong advice (s.35 violation) and omits the entire FA 2026 reform floor. Correction is the load-bearing first job.

**Secondary: INVISIBLE.** 0 GSC impressions; near-zero Bing. The page has no equity to protect, which de-risks an aggressive reposition.

**Tertiary: THIN_DEPTH + STRUCTURE.** 1,436 words, 4 FAQs, 0 statute citations, 0 decision table, 0 worked examples, no reviewer byline. Below the cluster floor and well below the gold-reference target.

**Quaternary: CANNIBAL.** Four pages collide on the "AIA for landlords" head keyword (see cannibalisation section). Resolved by sharp differentiation, not collapse.

**Load-bearing fix order (by ROI):**
1. **Correct the s.35 violation** — rebuild "What Qualifies" around the dwelling-house bar. State plainly: ordinary residential lettings get NO P&M allowances on items inside the let dwelling (boilers, kitchens, bathrooms, furniture, white goods). Replace the wrong "claim AIA on white goods" framing with the correct alternative: **replacement of domestic items relief (ITTOIA 2005 s.311A)** for like-for-like replacements (revenue relief, NOT a capital allowance) — and forward-link, do not re-derive.
2. **Reposition to the qualification gate.** New spine: residential dwelling (blocked by s.35) vs HMO/block common parts (narrow exception) vs commercial / mixed-use (qualifies). Add the integral-features carve-out (s.33A) for qualifying non-dwelling areas.
3. **Insert the FA 2026 reform floor** (§38): WDA 14% (s.28), new 40% FYA (s.29 / s.45U), full expensing company-only (s.45S), special rate 6% unchanged, AIA £1m permanent (s.51A).
4. **Add the qualification decision table** (see content plan §3) — snippet-bait + scan aid.
5. **Body lift to ~3,200 words; FAQ 4 → 12-14**, each FAQ targeting a verbatim qualification query.
6. **Authority links: replace the dead aka.hmrc link**; cite 6-8 verified legislation.gov.uk / gov.uk sources.
7. **Frontmatter hygiene:** add `reviewedBy` / `reviewerCredentials` / `reviewedAt`; bump `date` + `dateModified` + `sourcesVerifiedAt` to write date; strip `aka.hmrc.gov.uk` from `sourceDomains`.
8. **Trim or hedge the April-2027 paragraph** to one enacted-law sentence (§7).

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cluster:** ~16 pages on AIA / capital-allowance / full-expensing / WDA terms in `Property/web/content/blog`. FOUR collide on the exact "AIA for landlords" head keyword:
1. `aia-capital-allowances` (THIS PAGE — 0 GSC + 0 Bing)
2. `aia-capital-allowance-property-landlords` (1-2 Bing impr, pos ~86)
3. `capital-allowance-aia-property-landlords` (1-2 Bing impr, pos ~81)
4. `aia-allowance-uk-property-investors` (8 Bing impr, pos 25.3)

**Collapse-direction check:** the equity rule says a 301 must point a WEAKER page at a STRONGER one. This page (0/0) is among the weakest, so it would be a redirect SOURCE, never a canonical. **Rewrite-only mode (memory: `feedback_rewrite_only_no_collapse.md`) forbids the 301.** Correct output = sharply differentiated REWRITE.

**Cluster role ownership (distinct intents — do NOT re-derive):**

| Page | Owns | This page does NOT chase |
|---|---|---|
| `annual-investment-allowance-uk` (canonical, Batch-4) | generalist head term "annual investment allowance" + £1m allocation / short-period depth | the generalist head term |
| `what-is-aia-in-tax` (canonical, Batch-4) | pure definitional "what is AIA" Bing head term | the bare definition |
| `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` | the four-axis decision framework (pillar) | the full framework — forward-link UP |
| `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` | s.51 association / £1m-cap allocation rules | allocation depth — forward-link |
| **`aia-capital-allowances` (THIS PAGE)** | **the SCOPE-FILTER / QUALIFICATION GATE: who-can-claim-and-on-what; residential dwelling (s.35 bar) vs HMO common parts (narrow exception) vs commercial/mixed-use (qualifies); integral-features carve-out; AIA vs replacement-of-domestic-items relief for in-dwelling items** | — |

**Distinctiveness commitment:** this page answers "does AIA actually apply to MY rental property?" and forward-links UP to the pillar + allocation siblings rather than re-deriving allocation/definitional depth. The 2 dead-duplicate landlord pages (`aia-capital-allowance-property-landlords` + `capital-allowance-aia-property-landlords`) are flagged to `track2_site_wide_flags.md` for a SEPARATE future cluster-collapse pass; **this brief does NOT delete or redirect them.**

---

## Section-by-section content plan (~3,200 words)

Target: 12-14 H2s, ~3,200 body words, 12-14 FAQs, 1 qualification decision table, 1 reference table (rates/allowances), 2 inline CTAs at conversion moments, 6-8 authority links.

1. **Intro (~150 w).** Frame the real question landlords ask: "I bought a new boiler / fitted a kitchen / furnished a flat — can I claim AIA?" Set up the answer-shaped promise: it depends almost entirely on whether the item is inside a *dwelling-house* or in *commercial / common-part* space. Establish the page as the qualification decision page. Forward-link to the pillar for the full framework.

2. **What AIA is, in one paragraph (~180 w).** 100% first-year write-off for qualifying plant and machinery, up to **£1,000,000** (CAA 2001 **s.51A(5)**, permanent from 1 April 2023 per F(No.2)A 2023 s.8). One paragraph only — then pivot immediately to "but the harder question for a landlord is whether your spend qualifies at all." Forward-link `what-is-aia-in-tax` for the definitional deep-dive (do not re-derive).

3. **The qualification gate: does AIA apply to MY property? (~420 w) — CONTAINS THE DECISION TABLE.** The page's centrepiece. Walk the three buckets. **PLAN THIS COMPARISON TABLE (plain HTML `<table>`, no pricing):**

   *Table 1 — "Does AIA apply? Property type vs plant location"*
   | Property / location | AIA on plant & machinery? | Why (statute) |
   |---|---|---|
   | Item inside a let residential dwelling (boiler, fitted kitchen, bathroom, white goods, furniture) | No | CAA 2001 s.35 dwelling-house bar |
   | Common parts of a block / HMO (communal boiler, lift, hallway lighting) | Yes (narrow) | s.35 exception (not a dwelling-house) |
   | Commercial property (shop, office, warehouse) plant | Yes | qualifying activity, no s.35 bar |
   | Mixed-use building, commercial / common areas | Yes (non-dwelling part only) | s.35 bites on dwelling part only |
   | Integral features in qualifying non-dwelling areas (electrics, cold water, space heating, lifts, solar shading) | Yes (special-rate pool, 6%) | CAA 2001 s.33A |
   | Cars | No | s.38B (AIA General Exclusion 2) |

4. **The s.35 dwelling-house bar explained (~320 w).** The cluster's central misconception. State the rule (CAA 2001 **s.35**: no P&M allowances for plant for use in a dwelling-house within a property business). Explain WHY the live-page advice was wrong. Give the practical consequence: an ordinary BTL landlord buying a new boiler or fridge for a let flat cannot AIA it.

5. **What a residential landlord CAN claim instead (~280 w).** The constructive alternative so the page is genuinely useful. **Replacement of domestic items relief, ITTOIA 2005 s.311A** (like-for-like replacement of furniture, furnishings, appliances, kitchenware — a *revenue* deduction, NOT a capital allowance; no relief on the *first* purchase / initial fit-out). Note repairs vs improvements (revenue vs capital line) and forward-link `landlord-tax-deductions-uk-2026-complete-list`. **VERIFY s.311A at write time against legislation.gov.uk** (it is not in house_positions §25/§38; treat as a verify-required cite).

6. **HMO and block common parts: the narrow exception (~240 w).** Where s.35 does NOT bite: communal plant serving multiple dwellings (block boiler, lift, communal lighting, entry systems). Practical apportionment note. Forward-link `hmo-vs-standard-buy-to-let-tax-comparison`.

7. **Commercial and mixed-use property: the broad claim base (~300 w).** Where AIA works fully. Integral features (s.33A, special-rate 6%), main-pool plant, the s.21/s.22 buildings/structures exclusion and the s.23 List C carve-back at a high level (forward-link the pillar; do not re-derive). Fixtures on purchase need a s.198 election (one-sentence pointer + forward-link, not full depth).

8. **Who can claim, and the cash-basis trap (~240 w).** Sole traders, partnerships, companies carrying on a qualifying activity. The cash-basis restriction (capital allowances only on cars under cash basis). Keep the partnership point but DROP the live page's unsupported "each partner gets £1m" claim unless re-verified — frame per ICAEW 2024 clarification with a verify note.

9. **AIA vs full expensing vs the new 40% FYA (~340 w) — CONTAINS THE RATES/ALLOWANCES REFERENCE TABLE.** Correct the garbled FYA framing. **PLAN THIS REFERENCE TABLE (plain HTML, no pricing):**

   *Table 2 — "Capital allowance routes for qualifying plant (current law)"*
   | Allowance | Rate | Who | New/used | Key statute |
   |---|---|---|---|---|
   | AIA | 100% up to £1,000,000 | Sole traders, partnerships, companies | New or used | CAA 2001 s.51A |
   | Full expensing | 100% FYA | Companies only | New & unused | CAA 2001 s.45S |
   | New 40% FYA (main-rate) | 40% FYA | Any (route for unincorporated + leasing) | New & unused, on/after 1 Jan 2026 | FA 2026 s.29 / CAA 2001 s.45U |
   | Main pool WDA | 14% reducing balance (from Apr 2026) | All | n/a | CAA 2001 s.56 (FA 2026 s.28) |
   | Special-rate pool WDA | 6% reducing balance | All | n/a | CAA 2001 s.104D / s.33A |
   | Zero-emission car FYA | 100% FYA (0 g/km only) | All | New & unused | CAA 2001 s.45D |

   Body must state: full expensing is **company-only** (not individuals); the **40% FYA** is the practical route for unincorporated landlords/leasing (NOT "unincorporated-only" — no incorporation test in s.45U); super-deduction EXPIRED 31 Mar 2023; special rate UNCHANGED at 6% (never "falls to 4%").

10. **Cars, vans and the AIA exclusion (~180 w).** Cars excluded from AIA (s.38B) and from the 40% FYA. Vans/motorcycles/lorries are not cars → can be AIA'd. Only the 100% FYA for new, unused **zero-emission (0 g/km)** cars (s.45D, to 31 Mar 2027 CT / 5 Apr 2027 IT). Cars ≤50 g/km → main pool (14%); >50 g/km → special rate (6%).

11. **When you can claim + the timing rule (~200 w).** Claim in the period of incurring; date incurred = contract date if payment due within 4 months. Asset must be in use / available for the qualifying activity. Year-end planning note (no pricing).

12. **How to claim + record-keeping (~200 w).** Self-assessment (individuals) / CT600 (companies); pool by main/special rate; keep invoices, contracts, dates. Forward-link `what-does-a-property-accountant-do`. **Inline CTA #1** after this section.

13. **A note on the April 2027 rate change (~120 w) — TRIMMED + ENACTED-CITED.** ONE short paragraph: from 6 April 2027 property income in England, Wales and NI is taxed at **22% / 42% / 47%** (FA 2026 ss.6-7, ENACTED, Royal Assent 18 March 2026; Scotland carved out). State as current law, NOT as a proposal. Note only the tangential relevance (allowances reduce taxable property profit at whatever rate applies) and forward-link the 2027 pillar. Do NOT expand into Section 24 wedge depth (off-topic for a capital-allowances page).

14. **Common mistakes (~220 w).** (i) Assuming AIA covers items inside a let dwelling (the s.35 trap — the live page's own error, now reframed as the headline mistake); (ii) confusing capital vs revenue (boiler replacement: improvement = capital + s.35-barred for dwellings; like-for-like = s.311A revenue relief); (iii) thinking full expensing is open to individuals; (iv) claiming on an asset before the property is available to let. **Inline CTA #2** at the conversion moment after the s.35 mistake.

15. **Final thoughts + Sources (~140 w + sources list).** Recap the qualification gate. Forward-link the pillar + allocation sibling. Rebuild the Sources list with live legislation.gov.uk + gov.uk citations (drop the dead aka.hmrc link).

---

## Statute spine (every section number + Act — VERIFY each at write time)

- **CAA 2001 s.35** — dwelling-house exclusion (plant in a dwelling-house barred from P&M allowances in a property business). [§25.2 + §25.10 + §38] — `https://www.legislation.gov.uk/ukpga/2001/2/section/35`
- **CAA 2001 s.33A** — integral features (5 categories), special-rate pool. [§25.2] — `.../section/33A`
- **CAA 2001 s.38B** — AIA General Exclusion 2 (cars excluded from AIA). [§38] — `.../section/38B`
- **CAA 2001 s.45D** — 100% FYA for new, unused zero-emission (0 g/km) cars; sunset 31 Mar 2027 (CT) / 5 Apr 2027 (IT). [§25.5 + §38] — `.../section/45D`
- **CAA 2001 s.45S** — full expensing, companies only, new & unused, permanent (inserted by F(No.2)A 2023). [§25.5 + §38] — `.../section/45S`
- **CAA 2001 s.45U** — companion to the new 40% main-rate FYA (inserted by FA 2026 s.29; no incorporation test). [§38] — `.../section/45U` (verify section exists on legislation.gov.uk at write time)
- **CAA 2001 s.51A** — AIA entitlement; s.51A(5) maximum £1,000,000, permanent from 1 April 2023. [§25.3 + §38] — `.../section/51A`
- **CAA 2001 s.56** — main-pool WDA, substituted to 14% by FA 2026 s.28 (from Apr 2026; hybrid time-apportioned rate for straddling periods). [§38] — `.../section/56`
- **CAA 2001 s.104D** — special-rate pool WDA 6% (UNCHANGED). [§38] — `.../section/104D`
- **CAA 2001 s.21 / s.22 / s.23** — buildings (List A) / structures (List B) exclusions + List C carve-back (high-level pointer only; forward-link pillar). [§25.2] — `.../section/21`, `/22`, `/23`
- **CAA 2001 s.198** — fixtures election on sale of qualifying interest (one-sentence pointer + forward-link; not full depth). [§25.2 + §25.11] — `.../section/198`
- **FA 2026 (c.11) s.28** — substitutes 14% main-pool WDA into CAA 2001 s.56. **Royal Assent 18 March 2026 — ENACTED (verify RA date at write time; F-37 pattern).** [§38]
- **FA 2026 (c.11) s.29** — new 40% main-rate FYA, expenditure on/after 1 Jan 2026; inserts CAA 2001 s.45U. [§38]
- **FA 2026 (c.11) ss.6-7** — April 2027 property income rates 22/42/47 (England, Wales, NI; Scotland out). ENACTED. [§7] (§13 only — single hedged sentence)
- **F(No.2)A 2023 (c.30) s.8** — made AIA £1m permanent from 1 April 2023 (RA 11 July 2023). [§25.3 + §38]
- **ITTOIA 2005 s.311A** — replacement of domestic items relief (revenue deduction for like-for-like replacements in a dwelling; the correct route where AIA is s.35-barred). **NOT in house_positions — VERIFY independently at legislation.gov.uk at write time.** — `https://www.legislation.gov.uk/ukpga/2005/5/section/311A`
- **FA 2025 (c.8) Sch 5** — FHL abolition (P&M FHL route gone from 6 Apr 2025 IT / 1 Apr 2025 CT); one-sentence note only. [§25.7 + §38]

---

## Competitor depth benchmark (Stage 2 — verify liveness at execution)

**Diagnosis-supplied competitor targets (re-fetch + status-check at write time per §16.31 / URL-liveness discipline):**

| URL | Use case | Verify at execution |
|---|---|---|
| https://www.gov.uk/capital-allowances/annual-investment-allowance | AIA consumer baseline (already cited as ref-1 on the live page — keep, re-verify) | 200 + content |
| https://www.protaxaccountant.co.uk/post/aia-allowance | Competitor AIA explainer (depth comparator) | 200 + content + word count |

**Expected competitor depth ceiling for this query class:** generic AIA explainers run ~1,200-2,000 words, 0 FAQs, 0 statute citations, and — critically — almost universally REPEAT the s.35 error (they tell landlords AIA covers in-dwelling plant). Our differentiator is being the ONE page that correctly walks the dwelling-house bar with a qualification decision table + the s.311A alternative + the FA 2026 floor. The 3,200-word target with 12-14 FAQs + 2 decision/reference tables + 6-8 verified statute citations puts us decisively best-in-class on the qualification intent — not catch-up. **What to borrow:** gov.uk's plain "what counts as plant and machinery" list structure. **What to differentiate against:** every competitor that says residential landlords can AIA boilers/kitchens/white goods — that is the wrong advice this rewrite exists to correct.

---

## Internal-link targets (within the live corpus — all filesystem-confirmed 2026-06-02)

Forward-links (this page → sibling), reciprocal where the sibling is a pillar:
- `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — **UP-link to the pillar** (four-axis framework); from §1 intro + §15.
- `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` — allocation / £1m-cap / association depth; from §2 + §15.
- `what-is-aia-in-tax` — definitional deep-dive; from §2.
- `annual-investment-allowance-uk` — generalist AIA + short-period depth; from §2 (light).
- `annual-investment-allowance-landlords-uk` — sibling landlord page (Batch-4 canonical); from §3 (light, role-distinct).
- `writing-down-allowance-rates` — WDA depth; from §9.
- `capital-allowances-on-property` — property CA overview; from §7.
- `landlord-tax-deductions-uk-2026-complete-list` — for the s.311A / revenue-vs-capital alternative; from §5 (replaces live line-105 link target context).
- `hmo-vs-standard-buy-to-let-tax-comparison` — for common-parts exception; from §6.
- `buy-to-let-limited-company-complete-guide-uk` — for full-expensing company-only point; from §9 (keep existing link).
- `what-does-a-property-accountant-do` — from §12 (keep existing).
- 2027 property income rates pillar — from §13 (single hedged forward-link).
- `/services` + `/contact` — soft CTA targets (no pricing).

**Do NOT internal-link** the 2 dead-duplicate landlord siblings (`aia-capital-allowance-property-landlords`, `capital-allowance-aia-property-landlords`) — they are flagged for collapse; linking would entrench them.

---

## Meta plan

- **metaTitle (≤62):** `Does AIA Apply to Your Rental Property? | s.35 Explained` (56 chars). Leads with the qualification intent the canonicals do not own.
- **metaDescription (≤158):** `Can landlords claim AIA on a let property? Usually not, the s.35 dwelling-house bar blocks it. See what qualifies: commercial, common parts and integral features.` — trim to ≤158 at write time (currently ~159; cut "and integral features" if over).
- **h1:** `AIA for Landlords: Does It Apply to Your Rental Property?`
- **summary (frontmatter):** `Most residential landlords cannot claim AIA on plant inside a let dwelling, the CAA 2001 s.35 bar blocks it. This guide shows exactly what qualifies (commercial property, HMO common parts, integral features), the alternative reliefs for residential lets, and how AIA, full expensing and the new 40% FYA differ under current law.`

---

## Schema plan

- **reviewer name:** `ICAEW Qualified Senior Reviewer` (house-standard anonymised role-based reviewer, consistent with the lead-gen handoff model — matches the established frontmatter pattern across the corpus).
- **reviewer credentials:** `Chartered Accountant (ACA, ICAEW), Property Tax Specialist`.
- **howTo:** `false` (this is a qualification/decision/explainer page, not a step-by-step procedure — no HowTo block).
- **dateModified:** `2026-05-30` (per brief instruction).
- **JSON-LD blocks to emit:** `Article` + `FAQPage` (FAQPage count MUST equal the frontmatter `faqs:` length, target 12-14). **No HowTo block.**
- **Frontmatter hygiene at write:** add `reviewedBy` / `reviewerCredentials` / `reviewedAt`; bump `date` to write date; set `dateModified: '2026-05-30'`; set `sourcesVerifiedAt` to write date; remove `aka.hmrc.gov.uk` from `sourceDomains` (add `legislation.gov.uk`).

---

## Query-coverage plan

One row per `target_queries[]` item; each query assigned exactly once.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| aia capital allowances | adjacent | 0 | 0 | H1 |
| can landlords claim aia on rental property | adjacent | 0 | 0 | metaDescription |
| aia capital allowances rental property | adjacent | 0 | 0 | H2#3 (qualification gate) |
| annual investment allowance | bing | 56 | 70.9 | body§2 (one-paragraph definition, light) |
| annual investment allowance uk | bing | 56 | 70.9 | FAQ#11 |
| annual investment allowance landlords uk | bing | 32 | 63.9 | H2#8 (who can claim) |
| aia allowance uk property investors | bing | 8 | 25.3 | FAQ#12 |
| annual investment allowance 2024-25 | bing | 15 | 42.6 | FAQ#13 (limit history / £1m permanent) |
| capital allowance aia property landlords | bing | 1 | 81 | body§7 (commercial / mixed-use) |
| aia capital allowance property landlords | bing | 2 | 86 | FAQ#1 (does AIA apply to my let property) |
| capital allowances property investors caa 2001 | bing | 1 | 3 | H2#9 (allowance routes / statute spine) + body§3 |
| does aia apply to residential property | adjacent | 0 | 0 | metaTitle |
| capital allowances residential vs commercial property | adjacent | 0 | 0 | H2#3 table caption (Table 1) |
| s35 dwelling house capital allowances | adjacent | 0 | 0 | H2#4 (the s.35 bar explained) |
| what plant and machinery qualifies for aia landlord | adjacent | 0 | 0 | FAQ#2 |

---

## House-position references (Stage 1)

- **§25.1-§25.3 (CAA 2001 qualifying activity, P&M allowances, AIA)** [LOCKED, verified 2026-05-23]: s.15 qualifying activity; s.21/22/23 buildings/structures/List C; s.33A integral features; s.35 dwelling-house bar; s.51A AIA £1m. Primary lock for the qualification spine.
- **§25.5 (FYAs)** [LOCKED]: s.45D zero-emission cars; s.45S full expensing company-only; s.46 exclusions; super-deduction expired 31 Mar 2023.
- **§25.7 (FHL transitional, FA 2025 Sch 5)** [LOCKED]: one-sentence note — FHL P&M route gone from Apr 2025.
- **§25.10 (Do-not-write)** [LOCKED]: "Plant in a residential dwelling is claimable under AIA" = FALSE (s.35); "Cars are AIA-qualifying" = FALSE; "Full expensing available to individuals" = FALSE; "AIA cap £200k / temporary" = FALSE.
- **§38 (FA 2026 capital allowances reform floor)** [LOCKED, manager source-verified 2026-05-30]: WDA 14% (s.28); 40% FYA (s.29/s.45U); special rate 6% unchanged; AIA £1m permanent; FA 2026 c.11 RA 18 Mar 2026 ENACTED. **Do-not-write:** "WDA is 18%"; "special rate falls to 4%"; "40% FYA is unincorporated-only"; "cars qualify for AIA or 40% FYA"; "landlords can claim AIA on furnishings/boilers inside a let dwelling".
- **§7 (April 2027 property income surcharge)** [LOCKED, verified 2026-05-30 ENACTED]: 22/42/47 from 6 Apr 2027 (England/Wales/NI; Scotland out); state as enacted law, single sentence only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — STALE_FACTS / BANNED s.35 violation (HIGH).** The live "What Qualifies" list (body lines 55-56) tells residential landlords AIA covers in-dwelling kitchens, bathrooms, heating systems, furniture and white goods, with no mention of the s.35 dwelling-house bar. Per §25.10 + §38 this is actively wrong advice and the load-bearing fix.

Raise to `track2_site_wide_flags.md`:
- **F-A | 2026-06-02 | HIGH | aia-capital-allowances | STALE_FACTS (s.35 violation) | "What Qualifies" list + FAQ framing tell residential landlords AIA covers in-dwelling plant; barred by CAA 2001 s.35 per §25.10 + §38. Correct at execution.**
- **F-B | 2026-06-02 | MEDIUM | aia-capital-allowances | STALE_FACTS (FYA) | Body line 83 conflates expired super-deduction, full expensing and 50% FYA; omits FA 2026 40% FYA (s.29) + WDA 18%→14% (s.28). Insert §38 floor.**
- **F-C | 2026-06-02 | LOW | aia-capital-allowances | DEAD-LINK | ref-2 aka.hmrc.gov.uk dead; replace with legislation.gov.uk; strip from sourceDomains.**
- **F-D | 2026-06-02 | MEDIUM | aia cluster | CANNIBAL | 2 dead-duplicate landlord pages (aia-capital-allowance-property-landlords + capital-allowance-aia-property-landlords) collide on the head keyword; both 0/near-0 equity. Queue for a SEPARATE cluster-collapse pass (NOT this brief).**

**Same-pattern audit hypothesis:** the s.35-violation pattern likely recurs across the other ~12 untouched AIA/CA cluster pages; recommend a cluster s.35-sweep at the next AIA-cluster batch.

---

## Per-page work-log (for execution session)

### House-position alignment
- §25.3 AIA (£1m permanent, s.51A): __
- §25.10 s.35 dwelling-house bar (the load-bearing correction): __ corrected
- §38 FA 2026 floor (WDA 14% s.28; 40% FYA s.29/s.45U; special rate 6%; full expensing company-only s.45S): __
- §7 April 2027 (22/42/47 enacted, single sentence): __
- ITTOIA 2005 s.311A (replacement of domestic items, verify-required cite): __ verified at __ / URL

### Comparison: before vs after
- Word count: 1,436 → __
- H2 count: 13 → __
- FAQ count: 4 → __
- Decision/reference tables: 0 → 2
- Worked examples / qualification scenarios: 0 → __
- Authority links (legislation.gov.uk): 0 → __
- Inline CTAs: 0 → 2
- Reviewer byline added: __ (Y/N)
- Dead aka.hmrc link removed: __ (Y/N)

### Flags raised
- F-A / F-B / F-C / F-D carried from brief — confirmed actioned: __
- Any new flags at execution: __

### 2-3 sentence summary
- (populated at execution time)
