# Track 2 brief: capital-vs-revenue-expenditure-landlord-uk

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (decision-hub repositioning)
**Source markdown path:** `Property/web/content/blog/capital-vs-revenue-expenditure-landlord-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk
**Stage 1 priority:** **H** — Bing page-1 equity-holder (positions 3-8) on the capital-vs-revenue distinction query class; STALE_FACTS (HIGH) on a high-consequence classification page; orphan with 0 internal inbound links
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source read in full; house_positions §5/§34/§38 verified; sibling/pillar URL paths confirmed on-disk)
**Cannibalisation status:** **REWRITE** (collapse-guard direction: this page is the Bing equity-holder; both candidate siblings are Google-invisible AND not Bing-stronger, so a 301 either way would reverse equity and is rejected per §16.T2)

> Gold-reference target. This brief matches the depth and 15-section structure of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-rewrite template `birmingham-property-accountant.md`. Every statute cite below is marked verify-at-write-time per HARD RULE; the executing session re-checks each against legislation.gov.uk, including any Finance Act Royal Assent date (the F-37 Bill-vs-enacted pattern).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-vs-revenue-expenditure-landlord-uk`. The slug carries the exact decision-framework intent ("how do I tell whether a landlord cost is capital or revenue, repair vs improvement") and is the Bing equity-holder. No redirect.
- **Category:** `Landlord Tax Essentials` (kept). URL path `/blog/landlord-tax-essentials/...`.
- **Gap-mode tag:** `STALE_FACTS` (primary, HIGH — Renewals Allowance abolished 2016; integral-features framing wrong; CGT enhancement cite missing) + `THIN_DEPTH` (1,245 words vs 3,000 target) + `STRUCTURE` (4 FAQs, no decision table, 0 outbound authority links) + `INVISIBLE`/`CTR_FAIL` (Google orphan — 0 internal inbound links so the page never accrued Google equity; CTR cannot be measured because impressions are near-zero on Google despite Bing page-1).
- **"Why this rewrite" angle:** This page must become the **canonical DECISION HUB** for the capital-vs-revenue classification. It owns the distinction intent (Bing positions 3-8); its two closest on-site siblings each cover only ONE side (`what-repairs-can-landlords-deduct-from-rental-income` = revenue/repairs side; `property-improvements-reduce-cgt-enhancement-expenditure` = capital/CGT-enhancement side) and both are Google-invisible (0 GSC impressions). The rewrite (a) strips the three STALE_FACTS errors, (b) builds the top-of-page classification decision table + the four HMRC tests + the initial-repairs/Law Shipping trap + mixed-expenditure apportionment, then (c) forward-links OUT to each sibling for the deep-dive and (d) closes the orphan problem by commissioning reciprocal inbound links from the repairs page, the enhancement page, the deductions pillar and the capital-allowances page. The load-bearing job is the STALE_FACTS correction (a wrong-advice page on a £-consequential classification), not a meta tweak.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (2026-05-30):**
- **Word count (body):** ~1,245 (target ~3,000).
- **H2 outline (1-line each):**
  1. *Understanding Capital and Revenue Expenditure* (+ H3 capital examples, H3 revenue examples) — definitions + bulleted examples + £25k kitchen / £800 boiler illustrations.
  2. *The Improvement vs Repair Test* (+ H3 "HMRC's Key Tests" listing 3 tests, H3 kitchen-replacement example) — three tests only (like-for-like, entirety, restoration-vs-enhancement); **the character-of-the-asset test is missing**.
  3. *Special Rules and Exceptions* (+ H3 Initial Repairs, H3 **Renewals Allowance [STALE]**, H3 **Integral Features [STALE/MISLEADING]**) — see house-position conflict flag.
  4. *Tax Treatment and Implications* — revenue same-year deduction; capital → CGT base cost; line 104 "CGT relief at 24% vs income tax relief at 40%" (correct rate, but no statute tie).
  5. *Record Keeping Requirements* (+ H3 essential records).
  6. *Common Mistakes Landlords Make* (3 H3s).
  7. *Planning Strategies for Landlords* (+ H3 Timing, H3 Company vs Individual).
  8. *When to Seek Professional Advice*.
- **Meta title:** "Capital vs Revenue: Landlord Tax Examples 2026" (46 chars). Has `metaTitle_prev` ("Capital vs Revenue Expenditure Landlord: UK Tax Guide 2026") — evidence of a prior meta rewrite.
- **Meta description:** "Stop guessing which costs you can deduct. See clear capital vs revenue examples for UK landlords and cut your tax bill. Read the worked guide." (140 chars). Has `metaDescription_prev`.
- **FAQ count (frontmatter `faqs:`):** **4** (improvements/CGT; repair-vs-improvement; initial repairs; documentation). Target 12-14.
- **Outbound authority links:** **0** (no gov.uk / legislation.gov.uk / HMRC manual).
- **Internal links:** 4 outbound (landlord-tax-deductions pillar; CGT pillar; section-24 guide; MTD deadline page; what-does-a-property-accountant-do). **Inbound internal links: 0 (ORPHAN).**
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).
- **Worked examples present:** 3 illustrative amounts (£25k kitchen extension = capital; £800 boiler repair = revenue; £180k-reduced-purchase + £8k roof = initial-repairs capital). **These are worked-example amounts, not fee quotes — acceptable, NOT a pricing leak** (Decision E confirmed: no soft fee-comparison language present).

---

## GSC angle (last 90 days) (Stage 2)

**Google signal:** effectively INVISIBLE. The diagnosis records this page as a Google orphan (0 internal inbound links) — Google equity never accrued, so Google impressions are near-zero. **There is no Google CTR-fail to fix here; the fix is to MAKE the page Google-visible by closing the orphan problem and lifting depth + structure.**

**Bing signal (the live equity that pins the REWRITE decision):** page-1, positions 3-8, on the distinction query class:
- `hmrc capital and revenue expenditure`
- `revenue expenditure vs capital expenditure uk`
- `capital expenditure on rental property`

**Strategic conclusion:** the rewrite must (1) NOT damage the Bing equity (keep the slug, keep the distinction-framework framing the queries reward), and (2) build Google visibility from a standing start via reciprocal inbound links (orphan fix) + a snippet-baitable decision table + verbatim-query FAQs. Post-rewrite, re-pull GSC at +30/+60/+90 days via `monitored_pages`; expect Google impressions to start from ~0 and grow (an INVISIBLE-baseline page, so a 180-day monitoring window per the F-11 recommendation, not 90).

**Verify at execution:** re-pull `bing_query_data` for the slug (`python -m optimisation_engine.clients.bing_query_client property`) to confirm the page-1 Bing positions still hold before committing, and pull `gsc_query_data` + `ga4_page_data` to capture the true Google/engagement baseline at write time.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (HIGH — wrong advice on a high-consequence classification page).** Three discrete errors, each capable of misleading a landlord into an incorrect return:

1. **"Renewals Allowance" presented as current law (source H3 line ~85).** The renewals basis for furnished lettings was **abolished from April 2016** and replaced by **Replacement of Domestic Items Relief (RDIR)**. The current text ("renewals allowance ... even if the replacement is slightly better quality") is doubly wrong: the allowance no longer exists, AND RDIR is a strict **like-for-like** relief — a *better-quality* replacement is restricted to the cost of the nearest modern equivalent of the old item, not given in full. Rewrite to RDIR mechanics and forward-link `replacement-domestic-items-relief-uk-landlords-guide`.
2. **"Integral features ... typically capital for companies, individual landlords may have more flexibility" (source line ~98).** Misleading. Integral-features rules (special-rate pool, CAA 2001 s.33A) apply to property businesses generally, not just companies; and **the dwelling-house bar (CAA 2001 s.35) denies plant-and-machinery allowances inside a let dwelling for everyone** (individual or company). The only qualifying integral-features spend is in non-dwelling areas (common parts, commercial/mixed-use). Align to house_positions §38: **main-pool WDA cut 18% → 14% (FA 2026 s.28, hybrid straddling rate), special-rate pool unchanged at 6%, new 40% FYA (FA 2026 s.29) for unincorporated landlords from 1 January 2026** (excludes cars/second-hand/overseas-leasing). FA 2026 (c.11) is ENACTED, Royal Assent 18 March 2026 — state as current law.
3. **CGT framing untethered to statute (source line ~104).** "Capital expenditure gives CGT relief at 24% rather than income tax relief at 40%" — the 24% residential higher rate is correct per §5, but the relief mechanism has no statute anchor. Tie capital enhancement expenditure to **TCGA 1992 s.38(1)(b)** (enhancement expenditure reflected in the state/nature of the asset at disposal) and forward-link `property-improvements-reduce-cgt-enhancement-expenditure`.

**Secondary: THIN_DEPTH.** 1,245 words against a 3,000 target and against competitor depth that runs to PIM2030/PIM2025 territory. Missing: the **fourth HMRC test (character of the asset / Law Shipping line)**, the **entirety doctrine worked through** (*Conn v Robins*, *Brown v Burnley FC*-style reasoning), **mixed/apportioned expenditure**, **notional repairs**, and the RDIR/capital-allowances boundary.

**Tertiary: STRUCTURE + INVISIBLE/ORPHAN.** No top-of-page decision table (snippet-bait); 4 FAQs vs 12-14; 0 outbound authority links; **0 inbound internal links** (the orphan problem — the single biggest reason this page is Google-invisible despite Bing page-1). The rewrite is wasted unless the four reciprocal inbound links are commissioned.

**Load-bearing fix sequence (ordered by ROI / consequence):**

1. **Strip + correct the three STALE_FACTS errors** (Renewals → RDIR like-for-like; integral-features → s.35 dwelling-house bar + §38 FA 2026 rates; CGT → s.38 enhancement anchor). This is wrong-advice removal and goes first.
2. **Add the top-of-page classification decision table** (capital vs revenue, with the test that decides each row) — snippet-bait + the decision-hub spine.
3. **Add the fourth HMRC test (character of the asset) + the initial-repairs / Law Shipping trap properly + mixed-expenditure apportionment + notional repairs.** Lift body to ~3,000 words.
4. **Forward-link OUT to the two siblings + RDIR + capital-allowances** as the deep-dive layer (decision-hub architecture).
5. **Close the orphan: commission reciprocal inbound links** from `what-repairs-can-landlords-deduct-from-rental-income`, `property-improvements-reduce-cgt-enhancement-expenditure`, `landlord-tax-deductions-uk-2026-complete-list`, and `capital-allowances-on-property`. (Execution session edits those four source files to add the inbound link — this is a Track 2 delta: the rewrite is incomplete without it.)
6. **FAQ count 4 → 12-14**, each targeting a distinct distinction query (the three Bing query strings become FAQs verbatim).
7. **Authority links: add PIM2030 + PIM2025** (confirmed live, last updated 21 May 2026 per diagnosis; re-verify at write) + legislation.gov.uk anchors for s.272/s.34, s.311A, s.38, s.33A/s.35.
8. **Meta title/description rewrite #2** toward the decision-framework angle (see §metaTitle plan).

---

## Competitor URLs (Stage 2 — verify 200 + date-stamp at execution per §16.31)

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2030 | HMRC authority (repairs vs improvements / capital vs revenue) | The four-test framing + "entirety" + "character of the asset" language; cite as authority | gov.uk is the source-of-truth, not the application layer — we add the decision table, worked examples, and the sibling deep-dive routing gov.uk doesn't have |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2025 | HMRC authority (revenue/capital general + initial repairs) | Initial-repairs / Law Shipping framing; notional-repairs concept | Same — borrow the doctrine, beat the depth and add the cross-links |
| https://uklandlordtax.co.uk/improvement-vs-repair/ | Specialist competitor | Plain-English repair-vs-improvement examples | Likely no decision table, no RDIR like-for-like nuance, no FA 2026 capital-allowances alignment |
| https://heightsaccountancy.co.uk/2026/03/30/capital-costs-vs-revenue-costs-property-tax-uk/ | Specialist competitor (2026-dated) | Recency framing; check whether it carries the FA 2026 WDA 14% change | Verify it isn't itself stale on Renewals Allowance / WDA 18%; differentiate on statute-anchored depth |
| https://blackandwhiteaccounting.co.uk/revenue-vs-capital-expenses-for-property-businesses-understanding-the-tax-treatment/ | Specialist competitor | Tax-treatment split structure | Add the four tests, the initial-repairs trap worked through, mixed-expenditure apportionment, and sibling routing |

**Competitor depth ceiling (expected):** specialist pages ~800-1,600 words, 0-few FAQs, 0-1 statute citations, no decision table, no FA-2026 capital-allowances alignment. Our ~3,000-word decision hub with a top-of-page table, four tests worked through, 12-14 verbatim-query FAQs, and 5+ verified statute anchors is decisively best-in-class. PIM2030/PIM2025 are the authority ceiling — we cite and route to them, we do not try to out-authority gov.uk.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (re-read at batch start; refresh §4 per §7 cadence).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | capital-vs-revenue-expenditure-landlord-uk | self | **REWRITE in place** — decision hub; Bing equity-holder |
| Sibling (revenue side) | what-repairs-can-landlords-deduct-from-rental-income | Covers ONLY the revenue/repairs side; 0 GSC impressions; ~1,123 words | **Not a stronger canonical** (Google-invisible, not Bing-stronger on the distinction query). Forward-link OUT to it for the repairs deep-dive; commission reciprocal inbound link. |
| Sibling (capital side) | property-improvements-reduce-cgt-enhancement-expenditure | Covers ONLY the capital/CGT-enhancement side; 0 GSC impressions; ~1,181 words | **Not a stronger canonical** (same reasoning). Forward-link OUT for the CGT-enhancement deep-dive; commission reciprocal inbound link. |
| Adjacent (allowance mechanic) | replacement-domestic-items-relief-uk-landlords-guide | RDIR like-for-like mechanic | Non-competing. Forward-link from the corrected Renewals→RDIR section. |
| Adjacent (pillar) | landlord-tax-deductions-uk-2026-complete-list | Broad allowable-expenses pillar; 84 impr / pos 51 / "complete list" intent | Non-competing (different intent). Forward-link + commission reciprocal inbound link from the pillar. |
| Adjacent (capital allowances) | capital-allowances-on-property | P&M / integral-features allowances | Non-competing. Forward-link from the corrected integral-features section; commission reciprocal inbound link. |

**COLLAPSE-DIRECTION CHECK (§16.T2 deterministic floor):** this page is the **equity-holder** of the intent on Bing (page-1, positions 3-8). Both candidate siblings are **Google-invisible AND not Bing-stronger** on the distinction query. Collapsing this page into either would **reverse the equity direction the collapse guard rejects** (weaker→stronger only) and destroy live Bing ranking equity. **No REDIRECT. No FLAG-MANAGER.** Run `scripts/track2_collapse_guard.py` at execution to confirm REWRITE (it will, given the equity direction).

**Conclusion:** REWRITE in place as the canonical decision hub; both siblings stay distinct as deep-dive endpoints; orphan closed via four reciprocal inbound links.

---

## Closest existing pages (Stage 2) — internal-link targets within the live corpus

All paths verified on-disk 2026-05-30 (category → URL path confirmed from existing corpus links).

**Forward-links OUT (this page → others), placed at the named section:**
- **Repairs deep-dive (revenue side):** `/blog/landlord-tax-essentials/what-repairs-can-landlords-deduct-from-rental-income` — from the decision table + the revenue-side section.
- **CGT enhancement deep-dive (capital side):** `/blog/capital-gains-tax/property-improvements-reduce-cgt-enhancement-expenditure` — from the "capital → CGT base cost" section (tie to TCGA 1992 s.38).
- **RDIR allowance mechanic:** `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide` — from the corrected Renewals→RDIR section.
- **Allowable-expenses pillar:** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — from the revenue-side / "what counts as deductible" section (keep existing link; it already points here).
- **Capital allowances:** `/blog/property-types-and-specialist-tax/capital-allowances-on-property` — from the corrected integral-features section.
- **CGT pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` — keep existing link from the tax-treatment section.
- **Section 24 (context):** `/blog/section-24-and-tax-relief/section-24-mortgage-interest-restriction-uk-landlords` — keep, but ensure framing is "finance-cost restriction is a separate mechanic" (do not conflate with capital/revenue).
- **PRR (context, optional):** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` — only if the rewrite touches owner-occupier conversion.

**Inbound links IN (close the orphan — execution session edits these four source files to add a link back to this page):**
- `what-repairs-can-landlords-deduct-from-rental-income.md` → add "Not sure if your cost is even a repair? Start with our capital vs revenue decision guide" link.
- `property-improvements-reduce-cgt-enhancement-expenditure.md` → add a back-link from its intro ("first decide whether the cost is capital or revenue").
- `landlord-tax-deductions-uk-2026-complete-list.md` → add a back-link from its repairs/capital row.
- `capital-allowances-on-property.md` → add a back-link from its capital-vs-revenue gateway paragraph.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED 2026 — verify 18%/24% + £3,000 AEA still current at write]: residential CGT higher rate 24% is the relief rate for capital enhancement expenditure framing. Page must match §5 exactly.
- **§34 Landlord allowable expenses architecture** [LOCKED 2026-05-27]: **ITTOIA 2005 s.272** is the operative import gateway (trading rules → property business GAAP); **s.34 wholly-and-exclusively** test imported; revenue deductions live here. §34 explicitly names "capital-vs-revenue deep-dives cross-reference" — this page threads §34.
- **§38 Capital allowances (CAA 2001) — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified]: **WDA main pool 14% (FA 2026 s.28, hybrid straddling), special-rate pool 6% unchanged, new 40% FYA (FA 2026 s.29) for unincorporated landlords from 1 Jan 2026; s.35 dwelling-house bar; s.33A integral features.** FA 2026 (c.11) ENACTED, RA 18 March 2026 — state as current law, never "Bill"/"proposed". The §38↔§34 boundary note: "the revenue-vs-capital line is the gateway" — this page IS that gateway page.
- **§26.7 capital/revenue split for MEES + Decent Homes spend** [LOCKED]: like-for-like boiler = repair (revenue); spec-improving works = capital (CGT base cost); grants reduce CGT base cost. Use as the energy-efficiency worked example.
- **No dedicated RDIR house-position section exists.** RDIR (ITTOIA 2005 s.311A) is NOT a locked §N — cite it as a verify-at-write-time legislation.gov.uk anchor, and forward-link the `replacement-domestic-items-relief-uk-landlords-guide` page for the mechanic. **Do NOT invent a §N for RDIR.** (Candidate flag: recommend Wave/MW manager lock an RDIR house position; surface to `track2_site_wide_flags.md` if drafting confirms the gap matters — Track 2 cannot lock house positions.)

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — STALE_FACTS (HIGH), three instances.** The published page contradicts locked positions and abolished law; correcting them is the rewrite's first job:

1. **Renewals Allowance presented as current (source ~line 85).** Conflicts with current law (renewals basis abolished April 2016; RDIR per ITTOIA 2005 s.311A is the like-for-like replacement). No house position locks RDIR, but the page asserts abolished law as fact. **Action:** rewrite to RDIR like-for-like; forward-link the RDIR guide.
2. **Integral-features "capital for companies, individuals more flexibility" (source ~line 98).** Conflicts with **§38** (s.35 dwelling-house bar applies to all; special-rate pool 6%; WDA 14% from April 2026; not a company-only rule). **Action:** rewrite to align with §38; remove the company-only framing.
3. **CGT enhancement relief untethered (source ~line 104).** 24% rate correct per §5 but no statute anchor. **Action:** tie to TCGA 1992 s.38(1)(b); forward-link the CGT-enhancement sibling.

**Flag to `track2_site_wide_flags.md`** at execution as:
- **F-<n> | 2026-05-30 | HIGH | capital-vs-revenue-expenditure-landlord-uk | STALE_FACTS | Renewals Allowance presented as current (abolished April 2016 → RDIR s.311A like-for-like). Wrong advice on a £-consequential classification. Cluster-audit candidate: other landlord-expense pages may repeat the Renewals Allowance error.**
- **F-<n+1> | 2026-05-30 | HIGH | capital-vs-revenue-expenditure-landlord-uk | STALE_FACTS | Integral-features framed as company-only; contradicts §38 s.35 dwelling-house bar + WDA 18%→14% (FA 2026 s.28). Verify no sibling repeats "WDA 18%".**

**No pricing leak** (the £25k / £800 / £8k / £180k figures are illustrative worked-example amounts, not fee quotes — acceptable per Decision E). **No em-dashes** detected in current body (preserve that — HARD RULE). **No April-2027 Bill-vs-enacted assertion** on this page (low income-tax-rate drift risk), but FA 2026 s.28/s.29 are the live enactment cites and must be stated as current law (RA 18 March 2026), never hedged as "Bill".

---

## Authority links worth considering (Stage 2 — verify 200 + currency at execution)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2030 | Confirmed live per diagnosis (last updated 21 May 2026) — re-verify | Repairs vs improvements / capital vs revenue — primary authority for the four tests |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2025 | Confirmed live per diagnosis (last updated 21 May 2026) — re-verify | Revenue/capital general + initial repairs (Law Shipping line) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | Verify 200 + operative wording | ITTOIA 2005 s.272 — trading-rules import gateway for property business (§34) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/34 | Verify 200 + operative wording | ITTOIA 2005 s.34 wholly-and-exclusively (imported) — revenue-deduction test |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | Verify 200 + that s.311A is the in-force RDIR section (inserted by FA 2016) | RDIR like-for-like statute anchor (replaces Renewals Allowance) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/38 | Verify 200 + s.38(1)(b) operative | TCGA 1992 s.38 enhancement expenditure — capital → CGT base cost |
| https://www.legislation.gov.uk/ukpga/2001/2/section/33A | Verify 200 | CAA 2001 s.33A integral features (special-rate pool) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Verify 200 | CAA 2001 s.35 dwelling-house bar (no P&M allowances inside a let dwelling) |
| https://www.legislation.gov.uk/ukpga/2026/11/section/28 | Verify 200 + "14%" substituted into CAA 2001 s.56(1); RA 18 March 2026 | FA 2026 s.28 WDA 18%→14% (hybrid straddling) |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | Verify 200 (cite FA 2026 s.29 directly; never invent a consolidated CAA inserted-section number) | FA 2026 s.29 new 40% FYA (unincorporated, from 1 Jan 2026) |

**(Execution session cites PIM2030 + PIM2025 as the minimum authority pair per diagnosis, plus the relevant legislation.gov.uk anchors for each statute it actually relies on. Do not cite a statute the body does not use. Apply F-8 discipline: a live URL can still have its operative wording removed by amendment — confirm the section content, not just the 200.)**

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤ 62 chars):** lead with the decision-framework intent the Bing queries reward, not "examples". Candidates to test against the highest-equity query word order at write:
  - `Capital vs Revenue Expenditure: Landlord Tax Decision Guide` (58)
  - `Capital or Revenue? UK Landlord Repair vs Improvement Test` (57)
  - Keep `capital vs revenue` front-loaded (matches `revenue expenditure vs capital expenditure uk` + `capital expenditure on rental property` Bing queries). Avoid a third year-stamp-led title (the prior two metaTitles did not lift Google CTR; reposition to the decision/test angle).
- **metaDescription (≤ 158 chars):** decision-hub promise + the test + statute-anchored credibility + soft hook, NO pricing, NO em-dash. Candidate:
  - `Is your landlord cost capital or revenue? Use the repair vs improvement test, the four HMRC tests and a clear decision table, with worked examples.` (147)
- **h1:** keep aligned to the decision-hub framing. Candidate: `Capital vs Revenue Expenditure for UK Landlords: The Repair vs Improvement Decision Guide` (keep "capital vs revenue expenditure" + "landlord" + "repair vs improvement" in the H1 for query coverage; the current H1 "How to Tell the Difference" can stay as a sub-clause if length allows).

---

## Section-by-section content plan to ~3,000 words

Target: 11-13 H2s, ~3,000 body words, 12-14 FAQs, 1 top-of-page decision table, 2 inline `<aside>` CTAs at conversion moments, 5+ verified authority links. Decision-hub architecture (classify here, deep-dive via forward-links).

1. **Intro (~120w):** the classification is the gateway to your entire tax position (revenue = same-year deduction; capital = CGT base cost). One wrong classification can cost thousands or trigger an enquiry. State this page is the decision hub; the deep-dives live on the linked siblings.
2. **The decision at a glance — classification decision table (~180w + table):** snippet-bait `<table>`. Columns: *Cost example | Capital or revenue? | Which test decides it | Where the relief lands*. Rows span like-for-like boiler (revenue/like-for-like/same-year), re-roof with upgrade (capital/entirety+character/CGT base cost), new central heating where none existed (capital/character-of-asset/CGT base cost + check s.35 if dwelling), replacement domestic items (revenue via RDIR/like-for-like cap/same-year), initial pre-let repairs on a run-down purchase (capital/Law Shipping/CGT base cost). Forward-link from rows.
3. **Capital vs revenue — the core definitions (~250w):** revenue = maintaining current condition (ITTOIA 2005 s.272 imports the s.34 wholly-and-exclusively trading test); capital = acquiring/improving/enhancing the asset. Where each relief lands (income vs CGT). Cite s.272/s.34.
4. **The four HMRC tests (~450w):** like-for-like; **entirety** (the asset as a whole — re-roofing vs a few tiles; reference the entirety doctrine); **restoration vs enhancement**; **character of the asset** (the test the source OMITS — change in the nature/character = capital even if it looks like a replacement, e.g. single-glaze → double-glaze nuance, modern-equivalent allowance). Tie to PIM2030. This is the depth differentiator.
5. **Worked example — kitchen replacement (~200w):** keep/upgrade the source's kitchen example; split clearly into the repair limb and the improvement limb; show the modern-equivalent principle (replacing like-with-nearest-modern-equivalent is still repair).
6. **Initial repairs and the Law Shipping trap (~280w):** properly worked. Keep the £180k-reduced-purchase + £8k-roof illustration but correct/sharpen it to the *Law Shipping* and *Odeon Cinemas* line — repairs reflected in a reduced purchase price, or needed to make a newly bought property fit to let, are capital; repairs to a property already in use are revenue (notional-repairs concept). Cite PIM2025. Forward-link the repairs sibling.
7. **Replacement of Domestic Items Relief (corrected Renewals section) (~250w):** **STALE_FACTS FIX.** State plainly that the old Renewals Allowance was abolished from April 2016 and replaced by RDIR (ITTOIA 2005 s.311A). RDIR is **like-for-like**: a better replacement is restricted to the cost of the nearest modern equivalent; relief is net of any proceeds from the old item; available for furnished, part-furnished and unfurnished residential lets (not FHL, abolished from April 2025); not for the initial provision of an item. Forward-link the RDIR guide.
8. **Capital allowances and integral features (corrected section) (~280w):** **STALE_FACTS FIX.** The **s.35 dwelling-house bar** denies plant-and-machinery allowances inside a let dwelling for everyone (individual or company) — so most BTL fixtures get no capital allowances; the route for replacing furnishings is RDIR, not allowances. Where allowances DO apply (common parts of a block, commercial/mixed-use, HMO communal areas): **main-pool WDA 14% (FA 2026 s.28, hybrid straddling rate for periods spanning the start date), special-rate pool 6% (integral features, CAA 2001 s.33A), new 40% FYA for unincorporated landlords on new/unused main-rate plant from 1 January 2026 (FA 2026 s.29; excludes cars/second-hand/overseas-leasing)**. FA 2026 enacted (RA 18 March 2026) — state as current law. Forward-link capital-allowances page.
9. **Mixed and apportioned expenditure (~200w):** a single project often has both limbs (repair the old + improve the new); HMRC accepts a reasonable apportionment on the facts; document the split. New depth not in the source.
10. **Tax treatment and where the relief lands (~220w):** revenue → same-year income deduction; capital → **TCGA 1992 s.38(1)(b) enhancement expenditure** added to CGT base cost, relieved at the residential CGT rate (24% higher / 18% basic per §5) on eventual disposal. Note s.24 finance-cost restriction is a *separate* mechanic (do not conflate). Forward-link CGT-enhancement sibling + CGT pillar. **Inline CTA #1** here.
11. **Record-keeping and MTD (~180w):** keep the source's records list; tie to the heightened scrutiny under MTD for ITSA (by-reference, no rate assertions); before/after photos, contractor scope letters, purchase-condition evidence for the initial-repairs question.
12. **Common mistakes (~180w):** keep the three from the source (treating everything as deductible; inconsistent classification; ignoring purchase context) + add a fourth: assuming a *better* replacement is fully deductible (RDIR like-for-like cap).
13. **When to get this checked (~140w):** decision points (major refurb, run-down purchase, HMRC query, portfolio consistency). **Inline CTA #2** → free discovery call (lead-gen handoff; anonymised proof only; no pricing). Forward-link `what-does-a-property-accountant-do`.

**FAQ plan (12-14, each a distinct distinction query; the three Bing query strings verbatim as FAQ #1-#3):**
1. What is the difference between capital and revenue expenditure for a UK landlord? (`revenue expenditure vs capital expenditure uk`)
2. How does HMRC tell capital and revenue expenditure apart? (`hmrc capital and revenue expenditure`)
3. Is expenditure on a rental property capital or revenue? (`capital expenditure on rental property`)
4. Can I claim tax relief on property improvements? (keep, tie to s.38 CGT base cost)
5. What is the difference between a repair and an improvement for tax? (keep)
6. Are initial repairs to a newly purchased property deductible? (keep, sharpen to Law Shipping)
7. Is replacing a boiler a repair or an improvement?
8. Is the Renewals Allowance still available? (NO — abolished April 2016; RDIR like-for-like now)
9. Can I claim Replacement of Domestic Items Relief on a better replacement? (only up to the nearest-modern-equivalent cost)
10. Can landlords claim capital allowances on fixtures inside a let dwelling? (NO — s.35 dwelling-house bar; common parts / commercial only)
11. What is the writing-down allowance rate for landlords now? (14% main pool from April 2026, FA 2026 s.28; 6% special rate)
12. Does capital expenditure reduce my Capital Gains Tax? (yes — s.38 enhancement, relieved at 18%/24%)
13. How do I split a project that is part repair and part improvement? (reasonable apportionment)
14. How should I document expenses to support my classification? (keep)

---

## Universal rules — inherited from parent program (do not restate)

Pointer block per TRACK2_PROGRAM §4 section 13. Critical for THIS brief: **NO em-dashes anywhere** (use commas/parentheses/full stops/middle dots); **NO pricing or fees** (lead-gen handoff; the £-figures here are worked-example amounts only, never fee quotes); **anonymised social proof only, no real client names**; **LeadForm auto-injected by `BlogPostRenderer.tsx`** (never duplicate); 1-2 inline `<aside>` CTAs at conversion moments; HTML body (`<p>`, `<h2>`), not markdown syntax; `faqs:` frontmatter array (FAQPage auto-emitted — never hand-add FAQ schema); statute-citation discipline (F-8: a live URL can still have its operative wording amended — verify content, not just the 200); **FA 2026 s.28/s.29 stated as current law (RA 18 March 2026), never "Bill"/"proposed"** (the F-37 Bill-vs-enacted discipline).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow from `NETNEW_PROGRAM.md §7` + `competitor_rewrite_playbook.md`. Track 2 deltas for THIS page:

- **Step 1:** read `house_positions.md` §5, §34, §38, §26.7 in full at session start.
- **Step 4 (load-bearing pre-rewrite):** verify FA 2026 s.28 + s.29 are enacted (RA 18 March 2026) and the WDA-14% substitution + 40% FYA are in force; verify ITTOIA 2005 s.311A is the in-force RDIR section; verify TCGA 1992 s.38(1)(b) operative wording; re-fetch PIM2030 + PIM2025 (200 + currency).
- **Step 6:** read the source file in full + the four sibling/pillar files you will edit for inbound links.
- **Step 8:** plan 11-13 H2s, ~3,000 words, 12-14 FAQs, decision table at top.
- **Step 9 (Track 2 delta — rewrite in place):** rewrite markdown at the existing path; preserve frontmatter slug + canonical + category; update `dateModified` to write date; rewrite metaTitle/metaDescription/h1 per the plan.
- **Step 9b (Track 2 delta — orphan close):** edit the four sibling/pillar source files to add reciprocal inbound links to this page. The rewrite is INCOMPLETE without this — it is the load-bearing visibility fix.
- **Step 10:** `cd Property/web && npm run build` must pass.
- **Step 11 (six checks):** FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62; meta description ≤ 158; all internal links resolve (incl. the 4 new inbound links). Plus the mandatory per-batch chain (§16.T5): `qa_verdict.py pending` → `track2_independent_qa.wf.js` (recomputes every worked example + WebFetches every cite) → `qa_verdict.py record` → `predeploy_gate.py` HARD-block.
- **Step 12:** confirm no redirect needed (none — slug kept; Bing equity-holder; collapse guard confirms REWRITE).
- **Step 13 (Track 2 delta):** insert/update `monitored_pages` row — `rewrite_type='rewrite'`, **180-day window** (INVISIBLE Google baseline per F-11), record Bing baseline positions too.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA) at write: __
- §34 ITTOIA s.272/s.34 import gateway: __
- §38 WDA 14% (FA 2026 s.28) + 40% FYA (s.29) + s.35 bar + s.33A: __ (enacted-status verified: __)
- §26.7 MEES/Decent-Homes capital-vs-revenue split: __
- RDIR s.311A (no house position — verified against legislation.gov.uk): __

### Comparison: before vs after
- Word count: 1,245 → __
- H2 count: ~8 (incl H3s) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inbound internal links (orphan fix): 0 → __ (target 4)
- Inline CTAs: 0 → __
- Decision table at top: 0 → __ (1 expected)
- Worked examples: 3 → __

### STALE_FACTS corrections recorded
- Renewals Allowance → RDIR s.311A like-for-like: __
- Integral features → §38 s.35 bar + WDA 14% (FA 2026 s.28): __
- CGT enhancement → TCGA 1992 s.38(1)(b): __

### Flags raised
- F-<n> Renewals Allowance STALE_FACTS (cluster-audit candidate): __
- F-<n+1> Integral-features / WDA-18% STALE_FACTS (sibling sweep): __
- RDIR house-position lock recommendation (Track 2 cannot lock; surface to manager): __
- Any new flags: __

### Visibility hypothesis test
- Pre-rewrite Google baseline: ~0 impressions (orphan); Bing page-1 positions 3-8 on distinction queries
- Post-rewrite expected: Google impressions grow from ~0 once orphan closed + depth lifted; Bing equity preserved
- Verify at +30 / +60 / +90 days via monitored_pages (180-day window)

### 2-3 sentence summary
- (populated at execution time)
