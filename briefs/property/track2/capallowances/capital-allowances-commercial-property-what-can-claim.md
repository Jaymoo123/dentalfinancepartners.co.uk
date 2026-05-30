# Track 2 brief: capital-allowances-commercial-property-what-can-claim

**Site:** property
**Brief type:** Legacy rewrite — gold-reference depth (commercial-property capital-allowances BUYER hub)
**Source markdown path:** `Property/web/content/blog/capital-allowances-commercial-property-what-can-claim.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/capital-allowances-commercial-property-what-can-claim
**Stage 1 priority:** M (INVISIBLE on Google + Bing, but an established 4-inbound-link cluster node with distinct buyer-entry intent; the rewrite is a structural-authority + wrong-advice fix, not a CTR-chase)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (kept as the commercial-property capital-allowances HUB; links DOWN to the s.198 + SBA deep-dives and UP to the all-property pillar; collapse rejected by the equity guard — see §Cannibalisation)

> **Gold-reference brief.** Matches the depth and 15-section structure of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The single most important job of this rewrite is correcting a FABRICATED SBA rate change (the "2.5% over 40 years from April 2026" claim is invented — no such cut exists); the second is stripping two pricing leaks; the third is lifting ~1,150 words to ~3,400 with the FA 2026 reform floor (§38) and the buyer-side fixtures mechanics (§25.11) the current page omits entirely.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowances-commercial-property-what-can-claim`. The slug carries the focused buyer-entry intent ("what can I claim when I buy a commercial property") and holds 4 internal inbound links (from the pillar, the SBA page, the s.198 page, and the AIA page), making it an established cluster node. No redirect proposed.
- **Category:** `property-types-and-specialist-tax` (kept). All cluster siblings sit in the same category, so internal links stay intra-category.
- **Gap-mode tag:** `STALE_FACTS` (primary — the fabricated SBA 2.5%/40yr change is a wrong-advice error of the F-37/F-102 class) + `THIN_DEPTH` (secondary — 1,150 words vs a 3,400 target and a 4,918-word pillar) + `PRICING_LEAK` (Decision E — two general-market fee comparisons) + `INVISIBLE` (0 GSC + 0 Bing rows) + `STRUCTURE` (4 FAQs, 0 worked examples, no buyer-mechanics spine, 1 outbound authority link).
- **"Why this rewrite" angle:** This page should be the **commercial-property capital-allowances hub** — the focused entry page for an investor who has just bought, or is about to buy, a commercial building and wants to know what allowances are available and how to secure them. It is distinct from (a) the all-property four-axis pillar (`capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`), (b) the SBA-only mechanics deep-dive, and (c) the s.198-only buyer playbook. The rewrite keeps fixtures/s.198 and SBA at **summary depth** and links DOWN to those deep-dives, while linking UP to the pillar as the canonical all-property authority. The load-bearing content fix is the **buyer mechanics the current page entirely omits**: the s.198 fixtures election, the s.187B pooling gate (if the past owner never pooled, the buyer is permanently barred), the s.270IA(2) SBA allowance-statement requirement (nil claim without it), and the full FA 2026 reform floor (14% WDA, new 40% FYA, special-rate pool unchanged at 6%, full expensing companies-only, AIA £1m permanent).

---

## Current page snapshot (Stage 2 — filesystem read 2026-05-30)

**Frontmatter:**
- `metaTitle`: "Capital Allowances Commercial Property: What Can You Claim?" (56 chars — under limit, but flat/generic, no differentiator, no figure)
- `metaDescription`: "Guide to capital allowances on commercial property. Plant & machinery, structures & buildings allowance, and what UK investors can claim." (137 chars — generic, no hook, no figure)
- `h1`: "Capital Allowances on Commercial Property: What Can You Claim?"
- `faqs:` array: 4 entries (target 12-14)
- `schema`: empty (FAQPage auto-emitted from `faqs:` by `buildBlogPostingJsonLd`; do not hand-add)

**Body (read in full):**
- **Word count: ~1,150** (body prose).
- **8 H2 sections:** What Are Capital Allowances on Commercial Property? / Plant and Machinery Allowances (with 3 H3: What Qualifies / AIA / Writing Down Allowances) / Structures and Buildings Allowance (with 2 H3: What Qualifies for SBA / SBA Restrictions) / How to Identify and Value Allowances (with 2 H3: Capital Allowances Surveys / Pooling and Records) / Commercial vs Residential / Claiming Capital Allowances: Practical Steps (with 1 H3: When You Sell) / Common Mistakes to Avoid / Professional Advice and Specialist Support.
- **Worked examples: 0 numerical worked examples** (one inline illustrative figure at line 68: £500k property, £75k P&M, £15k saving — but no full pooled computation, no balancing-event example, no s.198 negotiation example).
- **Inline CTAs: 0** (only the auto-injected LeadForm).
- **Outbound authority links: 0** (no legislation.gov.uk / gov.uk / HMRC manual citations).
- **Internal links: 2** (Section 24 guide, BTL ltd-co guide, plus 1 to what-does-a-property-accountant-do).
- **Last meaningful edit:** `date: 2026-04-10`.

**Already-correct facts to PRESERVE (do not "fix" what is right):**
- WDA 14% main pool from April 2026 (line 72 + line 126), with the straddling-period blended-rate note — CORRECT per §38 / FA 2026 s.28. Keep, and tighten to "chargeable periods beginning on or after 1 April 2026 (CT) / 6 April 2026 (IT)".
- Special-rate pool 6% (line 127) — CORRECT per §38. Keep. (Any "4%" framing would be false; the source does not make that error.)
- AIA £1m for 2026/27 (line 66) — CORRECT but UNDER-stated; should say "permanent £1m, made permanent by F(No.2)A 2023 s.8 from 1 April 2023", not a year-specific figure.
- No real client names, no em-dashes — current page is clean on both. Keep clean.

---

## GSC angle (last 90 days) — INVISIBLE baseline

**Data state (per diagnosis):** target page has **0 GSC rows AND 0 Bing rows** in the 90-day window. The page is effectively invisible on both engines. The candidate canonical pillar **also** has 0 GSC rows; the entire commercial capital-allowances cluster is invisible on Google, with only `capital-allowances-on-property` surfacing at all (15 impressions / position 61.3).

**Read (per §16.42 + the gold-reference INVISIBLE-baseline discipline):**
- There is no CTR-fail to chase here and no query-verbatim FAQ harvest available (unlike the gold-reference CGT-rates page, which had 25 real queries). The FAQ set must be built from **anticipated buyer intent** ("can I claim capital allowances when I buy a commercial property", "what is a section 198 election", "do I need an allowance statement for SBA", "what is the WDA rate from April 2026", "can a sole-trader landlord claim full expensing"), not from harvested zero-click queries.
- Because the baseline is INVISIBLE rather than CTR-fail, the realistic post-rewrite target is **indexation + first-impressions** on long-tail buyer-mechanics queries (s.198 election, allowance statement, pooling requirement) where the cluster is currently absent — not a CTR multiple. Set the `monitored_pages` window to **180 days** (INVISIBLE-baseline convention per F-11), not 90.
- The strategic value is **topical-authority consolidation**: this hub + the two deep-dives + the pillar should interlink so the cluster reads as one authoritative commercial capital-allowances structure to the crawler. Right now the hub is thin and links to neither deep-dive nor the pillar.

**GA4 engagement signal:** no meaningful session data at INVISIBLE baseline; do not fabricate. Record "n/a — invisible baseline" at execution.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 read)

**Primary: STALE_FACTS (wrong-advice, F-37/F-102 class — the single most important correction).** Body line ~76 asserts SBA is "3% of qualifying construction or renovation costs each year for 33⅓ years **(changing to 2.5% over 40 years from April 2026)**". The parenthetical is **FABRICATED**. No such cut exists. Per §38 [LOCKED 2026-05-30] and §25.4 [LOCKED 2026-05-23], SBA is **3% over 33⅓ years**, uplifted from 2% by **Finance Act 2021 (c.26) Sch 22 para 7(4)** (effective 1 April 2020 CT / 6 April 2020 IT). The FA 2026 reform cut the **main-pool WDA from 18% to 14%** (s.28) — the writer plausibly mis-mapped that real change onto SBA and invented a "40-year" figure. This is the inverse of the WDA error: WDA genuinely changed and is stated correctly; SBA did NOT change and is stated wrongly. The rewrite's first job is to delete the fabricated parenthetical and state SBA 3% / 33⅓ years with the correct FA 2021 Sch 22 citation.

**Secondary: THIN_DEPTH.** At ~1,150 words the page covers <40% of the competitor depth (ForrestBrown / Apex / Saffery commercial CA guides run 1,800-3,000+ words) and a fraction of the 4,918-word pillar. The page entirely omits the buyer-side mechanics that are the whole point of a "what can I claim when I buy" page: the s.198 fixtures election, the s.187B pooling gate, the s.187A fixed-value requirement and its 2-year deadline, and the s.270IA(2) SBA allowance-statement requirement. It also omits the FA 2026 new **40% FYA** (s.29) for unincorporated businesses and leasing, and full expensing's company-only restriction (s.45S).

**Tertiary: PRICING_LEAK (Decision E — must strip).** Two leaks: (1) line ~110 "surveys typically cost £2,000-£5,000 but can identify allowances worth £50,000-£200,000 or more"; (2) line ~189/191 "the tax savings often exceed the professional fees". Both are general-market fee/cost comparisons and violate the lead-gen handoff model (memory `agency_lead_gen_model.md` + Decision E: even soft general-market fee framing is a pricing leak). Also the line-39 illustrative tax-saving figures ("£2,500 for a higher-rate taxpayer or £1,900-£2,500 for a company") and the line-68 "£15,000 in tax" are *allowance/tax-saving* illustrations tied to a worked example, NOT fee comparisons — those are permitted as worked-example arithmetic (the same class the gold-reference CGT brief keeps). The strip target is **fee/cost-of-service figures only**, not allowance arithmetic.

**Quaternary: INVISIBLE + STRUCTURE.** 0 GSC/0 Bing; 4 FAQs; 0 worked examples; 0 outbound authority links; links to neither deep-dive nor the pillar. The fix is topical-authority consolidation (interlink the cluster) plus structural depth (rates table, 4-5 worked examples, 12-14 FAQs, 5-7 verified authority citations).

**Load-bearing fix sequence (ordered by ROI / consequence):**

1. **Delete the fabricated SBA 2.5%/40yr parenthetical** (line ~76); restate SBA 3% / 33⅓ years with FA 2021 (c.26) Sch 22 para 7(4) citation. (Highest consequence: reader-misleading wrong-advice.)
2. **Strip the two pricing leaks** (survey-cost-vs-allowances comparison; "savings exceed fees" line). Replace with a discovery-call CTA that does not quote fees.
3. **Add the buyer-mechanics spine the page is missing:** s.198 fixtures election + s.187B pooling gate (permanent bar if past owner never pooled) + s.187A fixed-value requirement + 2-year deadline (s.201(1)), at **summary depth**, then link DOWN to `commercial-property-fixtures-claim-s198-election-purchase-mechanics` for the full playbook.
4. **Add the SBA allowance-statement requirement** (s.270IA(2): expenditure treated as nil without it, including for successor owners) and the s.270CF residential-exclusion (dwelling-house part of a mixed-use building loses SBA entirely), at summary depth, then link DOWN to the SBA mechanics page.
5. **Add the FA 2026 reform floor** per §38: 14% WDA (s.28, hybrid straddling), new **40% FYA** (s.29, unincorporated + leasing, ex-cars/2nd-hand, from 1 Jan 2026), full expensing 100% FYA companies-only (s.45S, permanent), special-rate pool 6% UNCHANGED, AIA £1m permanent (F(No.2)A 2023 s.8).
6. **Body lift to ~3,400 words** with a rates/allowances table at top (snippet-bait) + 4-5 worked examples (pooled purchase apportionment, AIA vs WDA, SBA over the allowance period, balancing charge on sale, s.198 negotiation £1-vs-market-value).
7. **FAQ count 4 → 12-14**, each targeting a specific anticipated buyer-mechanics question.
8. **Authority links: 5-7 verified legislation.gov.uk / HMRC-manual citations** (s.21, s.33A, s.198, s.187A/s.187B, s.270AA, s.270CF, s.270IA, s.45S, FA 2026 s.28/s.29, F(No.2)A 2023 s.8, FA 2021 Sch 22).
9. **Meta + h1 rewrite** (see §metaTitle/metaDescription/h1 plan).

---

## Competitor URLs (Stage 2 — VERIFY LIVE at execution per §16.31)

Carried from diagnosis `competitor_targets`. **All four must be re-fetched at write time** (httpx with a real User-Agent; reject non-200; date-stamp). This brief is drafted off the diagnosis list; liveness verification is deferred to the execution session per the §16.31 mandate.

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://forrestbrown.co.uk/claiming-capital-allowances/commercial-property/ | Buyer-journey framing ("what can you claim when you buy"); the P&M-vs-structure split presentation | They are an R&D/CA advisory selling surveys — we MUST NOT mirror their fee/survey framing (pricing-leak risk). No s.270IA allowance-statement depth; no FA 2026 14% WDA. |
| https://apexaccountants.tax/how-to-claim-capital-allowances-on-commercial-property-in-the-uk/ | The "how to claim" step sequence as a structural model | Likely stale on WDA (18%) and AIA framing; no s.187B pooling-gate depth; no 40% FYA. |
| https://www.saffery.com/insights/articles/capital-allowances-a-practical-guide-for-uk-businesses/ | Authoritative, statute-aware tone; full-expensing treatment | Business-wide (not property-specific); thin on the s.198 buyer mechanics and the s.270CF residential trap that matter for property. |
| https://www.propertycapitalallowance.com/structures-and-buildings-allowance-guide/ | SBA allowance-statement + qualifying-expenditure presentation | SBA-only; we keep SBA at summary depth and out-link; differentiate by being the COMMERCIAL HUB that also covers P&M, AIA, FYA, fixtures and disposal. |

**Competitor depth ceiling for this query class:** ~1,800-3,000 words, 0-some FAQs, few or no statute citations, survey-led commercial framing. Our ~3,400-word target with 12-14 FAQs + 4-5 worked examples + 5-7 verified statute citations + the FA 2026 reform floor + the s.187B pooling-gate and s.270IA allowance-statement gates puts us decisively best-in-class, and notably the only one with NO pricing/survey-fee leak.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (current index; refresh at batch close). Equity-guard reasoning per §16.T2 / §16.T3.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | capital-allowances-commercial-property-what-can-claim | REWRITE | self — rewrite in place; remains the commercial-property HUB |
| Cluster (pillar) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework (4,918w, Wave-6 pillar/topical authority) | UP-LINK | **Collapse REJECTED by equity guard.** The pillar has 0 GSC rows — it is NOT measurably stronger than this page (which also has 0 rows but holds 4 inbound links). A 301 into an unproven 0-equity target would fail the deterministic collapse guard (§16.T2 + R6 unproven-target block, see §38 note) and would forfeit a distinct buyer-entry intent. Keep distinct; link UP to the pillar as canonical all-property authority. |
| Cluster (deep-dive) | commercial-property-fixtures-claim-s198-election-purchase-mechanics (3,318w, s.198 buyer playbook) | DOWN-LINK | No collision. This hub covers s.198 at SUMMARY depth (the two-gate test + 2-year deadline headline) and links DOWN for the full mechanics. Dedupe rule (a): keep fixtures/s.198 at summary depth here. |
| Cluster (deep-dive) | structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward (3,264w, SBA mechanics) | DOWN-LINK | No collision. This hub covers SBA at OVERVIEW depth (3% / 33⅓ yr, allowance-statement headline, residential exclusion) and links DOWN for the full mechanics. Dedupe rule (b): keep SBA at overview depth here. |
| Cluster (broader) | commercial-property-tax-landlords-rates-reliefs-allowances (1,045w, broader commercial-landlord tax) | SIBLING-LINK | No collision. That page is the broad commercial-landlord tax overview (rates, reliefs, allowances across the board); this page is the focused capital-allowances buyer hub. Reciprocal link; no overlap of primary intent. |
| Cluster (beginner) | capital-allowances-on-property (2,031w, all-property beginner guide; 15 impr / pos 61.3 — only cluster page with any Google signal) | SIBLING-LINK | No collision. Beginner all-property primer vs commercial-buyer hub. Note: this is the only cluster page with ANY ranking equity, so it is NOT a collapse target either (collapsing the hub INTO a pos-61 page would be a weaker→? sideways move with no equity gain). Link as a sibling for readers wanting the residential/general primer. |
| Cluster (component) | annual-investment-allowance-uk / writing-down-allowance-rates (FA-2026 batch-4 rewrites, §38-anchored) | DOWN-LINK | No collision. AIA + WDA component deep-dives; this hub covers both at summary depth and links DOWN. Cite the same §38 floor so the cluster is internally consistent on 14% WDA + £1m AIA. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED (collapse rejected on equity-guard grounds: candidate canonical has 0 equity; an unproven-target 301 is the wrong direction per §16.T2 + R6). This page is intentionally the **commercial-property capital-allowances hub** — distinct buyer-entry intent, established 4-inbound-link node, dedupes by holding fixtures/s.198 + SBA at summary depth and out-linking to the deep-dives, and linking UP to the pillar.

---

## Closest existing pages (Stage 2 — internal-link targets verified live in corpus)

All URLs below verified present in `Property/web/content/blog/` with the stated category on 2026-05-30.

**Link UP (canonical authority):**
- **All-property pillar:** `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — link from the intro and from a "where this fits" line; the pillar is the canonical all-property four-axis authority.

**Link DOWN (deep-dives — keep summary here, out-link for depth):**
- **s.198 fixtures playbook:** `/blog/property-types-and-specialist-tax/commercial-property-fixtures-claim-s198-election-purchase-mechanics` — link from the new "Buying a commercial property: the fixtures election" summary section.
- **SBA mechanics:** `/blog/property-types-and-specialist-tax/structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` — link from the SBA overview section.
- **AIA component:** `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` — link from the AIA summary (note: this sibling sits in the `section-24-and-tax-relief` category, not property-types; cross-category link is fine).
- **WDA component:** `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` — link from the writing-down-allowances summary.

**Link SIDEWAYS (siblings):**
- **Broad commercial tax:** `/blog/property-types-and-specialist-tax/commercial-property-tax-landlords-rates-reliefs-allowances` — reciprocal sibling link from the intro / "commercial property tax more broadly" line.
- **Beginner primer:** `/blog/property-types-and-specialist-tax/capital-allowances-on-property` — sibling link for readers wanting the all-property primer.
- **Incorporation comparison:** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — link from the "full expensing is company-only" section (incorporation is the route to the 100% s.45S FYA).

**Existing links to PRESERVE / re-point:** the current Section 24 link (line 26) can stay as context for the commercial-vs-residential contrast; the what-does-a-property-accountant-do link (line 179) stays.

---

## House-position references (Stage 1)

- **§38 Capital allowances — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified]: the PRIMARY spine. 14% WDA main pool (s.28, hybrid straddling); special-rate pool 6% UNCHANGED; new 40% FYA (s.29, unincorporated + leasing, from 1 Jan 2026, ex-cars/2nd-hand); full expensing 100% FYA companies-only (s.45S, permanent); AIA £1m permanent (F(No.2)A 2023 s.8); SBA 3% (FA 2021 Sch 22 para 7(4), NOT FA 2020). FA 2026 (c.11) RA **18 March 2026** — ENACTED; state as current law.
- **§25.2 Plant and machinery allowances (CAA 2001 Part 2)** [LOCKED 2026-05-23]: s.21 buildings exclusion (List A), s.22 structures exclusion (List B), s.23 carve-back (List C), s.33A integral features (special-rate 6%), s.198 fixtures election, s.83 short-life assets. The building-shell / structure / integral-features / remaining-plant four-way split is the qualifying-expenditure framework.
- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23]: £1m permanent cap (s.51A(5)); single-allowance rule for related corporate groups (s.51E + s.51G); cars excluded.
- **§25.4 Structures and Buildings Allowance (CAA 2001 Part 2A)** [LOCKED 2026-05-23]: s.270AA (29 Oct 2018 gate, 3% / 33⅓ yr, 10% special tax site); s.270BG land-acquisition exclusion; **s.270CF residential exclusion** (dwelling-house mixed-use trap); **s.270IA allowance-statement requirement** (nil without it); no balancing event on disposal; s.37B TCGA add-back.
- **§25.5 First-Year Allowances (CAA 2001 ss.39-51)** [LOCKED 2026-05-23]: s.45S full expensing companies-only; s.46 general exclusions (cars, leasing); s.45D zero-emission cars.
- **§25.6 Disposal mechanics (CAA 2001 ss.55-67 + s.61 + s.196)** [LOCKED 2026-05-23]: s.55 AQE-vs-TDR balancing test; s.61 disposal values; s.196 fixtures Table (seller side); balancing charge / balancing allowance.
- **§25.11 Section 198 fixtures election — purchase-side** [LOCKED 2026-05-24]: the two-gate test — **s.187B pooling requirement** (past owner must have pooled, else buyer permanently barred) + **s.187A fixed-value requirement** (s.187A(3): nil if not fixed within 2 years); s.198 election form/content (s.201(3)); 2-year deadline (s.201(1)); s.563 tribunal route; s.199 lease-grant parallel.
- **§13 / §25.10 / §25.12 Do-not-write lists** [LOCKED]: no pricing/fees; no real client names; no "SBA at 2%"; no "WDA 18%"; no "special rate falls to 4%"; no "full expensing for individual landlords"; no "AIA temporary / reverts to £200k"; no "s.198 within 4 years"; no "buyer claims at market value without an election".

**Track 2 does NOT edit `house_positions.md`.** Cite by section number only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — F-[next] STALE_FACTS (fabricated SBA rate change).** Body line ~76 asserts SBA is "3% ... for 33⅓ years (changing to **2.5% over 40 years from April 2026**)". This directly contradicts §38 and §25.4: SBA is 3% over 33⅓ years and did NOT change in FA 2026. The "2.5%/40yr" figure is invented (no legislative basis; the do-not-write list at §25.10 / §38 does not even contemplate it because it does not exist). This is the F-37/F-102 wrong-advice pattern. **The rewrite's first job is to delete the parenthetical** and restate with the FA 2021 (c.26) Sch 22 para 7(4) citation (2% → 3% uplift, eff 1 Apr 2020 CT / 6 Apr 2020 IT).

**No conflict on WDA 14% / special-rate 6%** — both already correct on the page; the writer must NOT "correct" them.

Flag to `track2_site_wide_flags.md` as: **F-[next] | 2026-05-30 | HIGH | capital-allowances-commercial-property-what-can-claim | STALE_FACTS | Fabricated SBA "2.5% over 40 years from April 2026" parenthetical (body line ~76). No such cut exists; SBA is 3% / 33⅓ yr per FA 2021 Sch 22 para 7(4). Likely mis-mapping of the real FA 2026 s.28 WDA 18%→14% cut onto SBA. F-37/F-102 wrong-advice class. Audit sibling SBA-touching pages for the same fabrication.** Audit follow-up: check whether the same fabricated 2.5%/40yr framing leaked onto other SBA-touching residual or rewrite-cohort pages.

**Two pricing leaks confirmed (Decision E):** (1) survey-cost-vs-allowances comparison (line ~110); (2) "savings often exceed the professional fees" (line ~189/191). Strip both. Raise as **F-[next+1] | 2026-05-30 | MEDIUM | PRICING_LEAK | two general-market fee/cost comparisons.**

---

## Authority links worth considering (Stage 2 — VERIFY each at execution against legislation.gov.uk)

Per the §16.31 mandate and the HARD RULE: every statute citation, including the FA 2026 Royal Assent date (18 March 2026), must be re-verified at write time. Select 5-7 to actually cite.

| URL | Use case | Verify note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/21 | s.21 buildings exclusion (List A) | confirm List A wording |
| https://www.legislation.gov.uk/ukpga/2001/2/section/33A | s.33A integral features (special-rate 6%) | confirm 5 categories |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | s.56 main-pool WDA — confirm reads **14%**, annotated "substituted by Finance Act 2026 (c.11), s.28(1)" | the load-bearing FA 2026 verification |
| https://www.legislation.gov.uk/ukpga/2001/2/section/198 | s.198 fixtures election | buyer-side mechanism |
| https://www.legislation.gov.uk/ukpga/2001/2/section/187A | s.187A fixed-value requirement (s.187A(3): nil) | pooling/fixed-value gate |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270AA | s.270AA SBA (3% / 33⅓ yr; confirm NOT changed by FA 2026) | confirm 3% stands; uplift annotated FA 2021 |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270CF | s.270CF residential exclusion | dwelling-house mixed-use trap |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270IA | s.270IA(2) allowance-statement (nil without) | SBA evidence gate |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | s.45S full expensing (companies only) | confirm company-charge wording |
| https://www.legislation.gov.uk/ukpga/2021/26/schedule/22 | FA 2021 (c.26) Sch 22 para 7(4) — SBA 2%→3% | replaces the wrong "FA 2020" framing |
| https://www.gov.uk/government/publications/... (FA 2026 capital allowances measure) | FA 2026 s.28 / s.29 measure page (14% WDA + 40% FYA) | confirm RA 18 Mar 2026 enacted |
| https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual | HMRC CA Manual (CA21000+ P&M; CA22000+ integral; CA23000+ AIA; CA26450+ s.198; CA90000+ SBA) | interpretive overlay only |

**FA 2026 RA verification (the F-37 Bill-vs-enacted discipline):** §38 records FA 2026 (c.11) RA **18 March 2026 — ENACTED**. State 14% WDA and the 40% FYA as current law, NOT as "Finance Bill 2026" / "proposed". Re-confirm the legislation.gov.uk s.56 annotation reads "substituted ... by Finance Act 2026 (c. 11), s. 28(1)" before committing.

---

## Section-by-section content plan to ~3,400 words

Target: **~3,400 body words**, **11-13 H2s**, **12-14 FAQs**, **rates/allowances table at top**, **4-5 worked examples**, **2 inline `<aside>` CTAs**, **5-7 authority links**. All HTML body (no markdown syntax in body per `blog_page_rendering_html_in_frontmatter` memory).

1. **Intro (~150w)** — reframe as the commercial-property buyer hub. One line "where this fits": link UP to the pillar (all-property authority) and SIDEWAYS to the broad commercial-tax sibling. Set the buyer-entry promise: what you can claim and how to secure it when you buy.
2. **Rates & allowances table at top (~120w + table)** — snippet-bait table: Main-pool WDA 14% (from Apr 2026, FA 2026 s.28) | Special-rate pool WDA 6% (unchanged) | AIA £1,000,000 (permanent, F(No.2)A 2023 s.8) | Full expensing 100% FYA (companies only, s.45S) | New 40% FYA (unincorporated + leasing, FA 2026 s.29, from 1 Jan 2026) | SBA 3% / 33⅓ yr (FA 2021 Sch 22). One-line "what changed in April 2026 and what did NOT" to pre-empt the WDA-vs-SBA confusion.
3. **What capital allowances are, and why commercial beats residential (~250w)** — the revenue-vs-capital gateway; s.35 dwelling-house bar means residential gets almost nothing; commercial gets the full P&M + SBA suite. Keep the corporation-tax-vs-income-tax saving illustration (allowance arithmetic, permitted), but strip nothing that is worked-example arithmetic.
4. **The four-way split: what qualifies as plant (~350w)** — s.21 buildings exclusion (List A: shell, doors, windows, basic services), s.22 structures (List B), s.23 carve-back (List C restores plant-like equipment), s.33A integral features (5 categories → special-rate 6%). This is the qualifying-expenditure spine. **Worked Example 1:** £800k commercial purchase, apportionment into shell (excluded) / integral features (6% pool) / main-pool plant.
5. **Annual Investment Allowance (~250w)** — £1m permanent (s.51A(5), F(No.2)A 2023 s.8); 100% in year of spend; related-group single-allowance rule (s.51E/s.51G) at headline depth; cars excluded. Link DOWN to the AIA component page. **Worked Example 2:** £120k qualifying P&M fully relieved under AIA in year one.
6. **Writing-down allowances after AIA (~250w)** — main pool 14% from April 2026 (s.28, hybrid straddling — explain the time-apportioned blended rate for a straddling period), special-rate pool 6% (unchanged). Link DOWN to the WDA component page. **Worked Example 3:** main-pool reducing-balance over 3 years at 14%.
7. **First-year allowances: full expensing and the new 40% FYA (~300w)** — s.45S full expensing 100% companies-only (link to the incorporation guide as the route to it); the **new FA 2026 s.29 40% FYA** for unincorporated businesses + leasing (from 1 Jan 2026, ex-cars/2nd-hand) — this is the route for sole-trader/partnership commercial owners; s.46 leasing/cars exclusions. **Worked Example 4 (optional):** company vs sole-trader on the same £200k new plant (100% s.45S vs 40% s.29).
8. **Structures and Buildings Allowance (~350w)** — 3% / 33⅓ yr (FA 2021 Sch 22 para 7(4); **DELETE the fabricated 2.5%/40yr line**); 29 Oct 2018 construction gate; what qualifies (construction/renovation/conversion to non-residential); land excluded (s.270BG); **the allowance-statement requirement (s.270IA(2): nil without it, including for successor owners)**; **the s.270CF residential exclusion and the dwelling-house mixed-use trap**; no balancing event on disposal + s.37B TCGA add-back (so SBA is not "free"). Link DOWN to the SBA mechanics page.
9. **Buying a commercial property: the fixtures election (~350w)** — THE missing buyer-mechanics section. The two-gate test: **s.187B pooling requirement** (if the past owner never pooled, the buyer is **permanently barred** — no rescue) + **s.187A fixed-value requirement** (s.198 joint election OR s.563 tribunal, within **2 years** under s.201(1); s.187A(3): nil if not fixed). The £1-vs-market-value negotiation reality (seller wants low, buyer wants high). **Worked Example 5:** s.198 election negotiation and what each party gains/loses. Embed the SPA-flag practical point (get the election obligation into heads of terms). Link DOWN to the s.198 deep-dive. **Inline `<aside>` CTA here** (conversion moment: "buying a commercial property? a specialist can secure the s.198 election before the 2-year window closes").
10. **Selling: balancing charges and allowances (~250w)** — s.55 AQE-vs-TDR test; s.61 disposal values; s.196 fixtures Table (seller side); balancing charge if proceeds exceed pool. SBA: no balancing event, successor inherits the period, s.37B add-back on CGT.
11. **Commercial vs residential: the dividing line (~200w)** — s.35 dwelling-house bar; mixed-use buildings (commercial portion only; s.270CF dwelling trap for SBA); common-parts exception (communal boiler/lift/lighting). Why investors weigh commercial vs incorporation.
12. **How to claim, records, and common mistakes (~250w)** — the practical step sequence; pooling and records; the genuine pitfalls (missing the s.198 2-year deadline; no SBA allowance statement; failing the pooling audit on a multi-owner property; mixing pools). **Inline `<aside>` CTA** (second conversion moment). Replace the stripped pricing-leak content with a discovery-call framing that quotes NO fees.
13. **FAQs (12-14)** — examples: "Can I claim capital allowances when I buy a commercial property?" / "What is a section 198 election and why does it matter?" / "What happens if the previous owner never pooled the fixtures?" / "Do I need an allowance statement to claim SBA?" / "What is the writing-down allowance rate from April 2026?" / "Did the SBA rate change in April 2026?" (explicitly debunk the fabricated 2.5%/40yr myth) / "Can a sole-trader landlord claim full expensing?" (no — but the 40% FYA may apply) / "Is the AIA still £1 million?" / "Can I claim SBA on a mixed-use building with a flat above a shop?" / "What is a balancing charge when I sell?" / "Can I claim capital allowances on residential property?" / "How long do I have to make a claim?".

---

## Statute spine (every section with its Act — VERIFY each at write time)

**Capital Allowances Act 2001 (CAA 2001):**
- s.15 — qualifying activity (trade / property business)
- s.21 — buildings exclusion (List A)
- s.22 — structures exclusion (List B)
- s.23 — expenditure unaffected by ss.21-22 (List C carve-back)
- s.33A — integral features (5 categories; special-rate 6%)
- s.35 — dwelling-house restriction (residential bar)
- s.39 — first-year allowances available for certain expenditure only
- s.45D — 100% FYA zero-emission cars
- s.45S — full expensing (100% FYA, companies only; inserted F(No.2)A 2023)
- s.46 — general exclusions for FYAs (cars, leasing)
- s.51A — AIA entitlement (s.51A(5): £1,000,000)
- s.51E / s.51G — related-company single-allowance rule / "related" test
- s.55 — determination of entitlement (AQE-vs-TDR balancing test)
- s.56 — main-pool WDA rate (now 14%, substituted by FA 2026 s.28)
- s.61 — disposal events and disposal values
- s.83 — short-life asset election
- s.104D — special-rate pool WDA (6%, unchanged)
- s.187A — fixed-value requirement (s.187A(3): nil if not fixed)
- s.187B — pooling requirement (permanent bar if past owner never pooled)
- s.196 — fixtures Table (seller-side disposal values)
- s.198 — election to apportion sale price on sale of qualifying interest
- s.199 — election on grant of lease (parallel mechanic)
- s.201 — election procedure (s.201(1): 2-year time limit; s.201(3): form/content)
- s.270AA — SBA (3% / 33⅓ yr; 29 Oct 2018 gate; 10% special tax site)
- s.270BG — SBA land-acquisition exclusion
- s.270CF — SBA residential-use exclusion (dwelling-house mixed-use trap)
- s.270IA — SBA allowance statement (s.270IA(2): nil without)
- s.563 — tribunal determination route (where a party refuses to elect)

**Finance Acts (verify Royal Assent dates):**
- Finance Act 2026 (c.11), RA **18 March 2026 — ENACTED** — s.28 (WDA 18%→14%, hybrid straddling); s.29 (new 40% FYA, unincorporated + leasing, from 1 Jan 2026)
- Finance Act 2021 (c.26) Sch 22 para 7(4) — SBA 2%→3% (eff 1 Apr 2020 CT / 6 Apr 2020 IT) — REPLACES the wrong "FA 2020" attribution and rebuts the fabricated 2.5%/40yr claim
- Finance (No. 2) Act 2023 (c.30) s.8, RA **11 July 2023** — AIA £1,000,000 permanent (from 1 Apr 2023); same Act inserted s.45S full expensing
- Finance Act 2025 (c.8) Sch 5 — FHL abolition (6 Apr 2025 IT / 1 Apr 2025 CT) — context only, mention the residential-now-standard line if FHL comes up

**TCGA 1992:**
- s.37B — SBA cumulative add-back into CGT base cost on disposal (so SBA is not "free")

---

## Competitor depth benchmark (Stage 2)

| Dimension | Current page | Competitor ceiling | This rewrite target |
|---|---|---|---|
| Body words | ~1,150 | 1,800-3,000 | ~3,400 |
| FAQs | 4 | 0-some | 12-14 |
| Worked examples | 0 (one inline figure) | 0-1 | 4-5 |
| Rates table at top | No | sometimes | Yes |
| Statute citations | 0 | 0-few | 5-7 verified |
| Buyer fixtures mechanics (s.198/s.187B) | absent | thin | summary depth + out-link |
| SBA allowance statement (s.270IA) | absent | sometimes | summary depth + out-link |
| FA 2026 14% WDA + 40% FYA | WDA yes, FYA absent | mostly stale | full + correct |
| Pricing/fee leak | 2 leaks | survey-led (their model) | 0 (best-in-class clean) |

**Conclusion:** the rewrite is best-in-class, not catch-up — the only commercial CA guide in this set with the FA 2026 reform floor, the s.187B pooling gate, the s.270IA allowance-statement gate, AND no pricing leak.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤62 chars):** lead with the FA 2026 differentiator + buyer intent. Candidates (pick at execution):
  - "Capital Allowances Commercial Property 2026: What You Can Claim" (62)
  - "Commercial Property Capital Allowances 2026 | What to Claim" (58)
  - Prefer one that carries "2026" (the reform-floor freshness signal) + "commercial property" + "claim".
- **metaDescription (≤158 chars):** name the FA 2026 floor + the buyer-mechanics hook + a no-fee CTA. Candidate: "What you can claim on commercial property: plant, AIA, the 14% WDA from April 2026, SBA and the section 198 fixtures election when you buy. Free call." (≤158)
- **h1:** "Capital Allowances on Commercial Property: What Can You Claim?" (keep — it matches the focused buyer-entry intent and reads naturally; the differentiation lives in the body + meta, not the h1).

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM §4 section 13: voice rules (`NETNEW_PROGRAM §4` + `competitor_rewrite_playbook §5`), lead-gen architecture (LeadForm auto-injected; 1-3 inline `<aside>` CTAs; never duplicate the form), CSS-in-markdown (semantic HTML only, no Tailwind in body), FAQs+schema (frontmatter `faqs:` array 10-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema), anti-templating, six-check quality bar, statute-citation discipline (F-8: live URL does not guarantee live wording), all §16 lessons (esp. §16.31 URL liveness, §16.22/§16.27+ Bill-vs-enacted).

**Critical for THIS brief:** NO pricing/fees (strip the two leaks; keep allowance/tax-saving arithmetic). NO real client names (anonymised only). NO em-dashes (current page is clean — keep clean; use commas, parentheses, full stops, middle dots). State FA 2026 as ENACTED (RA 18 Mar 2026), not Bill-form.

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Per TRACK2_PROGRAM §4 section 14, inherits the full 19-step workflow from `NETNEW_PROGRAM §7`. Track 2 deltas: Step 9 rewrites markdown at the existing path (not a new file); Step 12 confirm no redirect (none — REWRITE in place, collapse rejected on equity grounds); Step 13 update/insert `monitored_pages` row with a **180-day window** (INVISIBLE baseline per F-11).

Key execution-time gates for this brief:
1. Read `house_positions.md` §38, §25.2, §25.3, §25.4, §25.5, §25.6, §25.11 at session start.
2. **Re-verify FA 2026 s.28 (14% WDA) on legislation.gov.uk s.56 annotation + RA 18 Mar 2026** — the load-bearing pre-write check.
3. **Delete the fabricated SBA 2.5%/40yr parenthetical** (line ~76); restate 3% / 33⅓ yr + FA 2021 Sch 22 para 7(4).
4. **Strip both pricing leaks** (line ~110 survey-cost; line ~189/191 savings-exceed-fees). `grep -E '£[0-9]'` on the body must show only worked-example allowance/tax-saving arithmetic, no fee/cost-of-service figures.
5. Re-fetch the 4 competitor URLs (reject non-200).
6. Build (`cd Property/web && npm run build`) + six checks (FAQ count = frontmatter length; em-dash = 0; Tailwind = 0; meta title ≤62; meta description ≤158; all internal links resolve).
7. Run the mandatory per-batch chain (§16.T5): writer → `qa_verdict.py pending` → `track2_independent_qa.wf.js` → `qa_verdict.py record` → `predeploy_gate.py` → build → deploy.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §38 WDA 14% (s.28, hybrid straddling) + RA 18 Mar 2026 confirmed: __
- §38 special-rate 6% unchanged (NOT 4%): __
- §38 new 40% FYA (s.29, unincorporated + leasing, from 1 Jan 2026): __
- §38 full expensing s.45S companies-only: __
- §38 AIA £1m permanent (F(No.2)A 2023 s.8): __
- §25.4 SBA 3% / 33⅓ yr (FA 2021 Sch 22 para 7(4)) — fabricated 2.5%/40yr line DELETED: __
- §25.4 s.270IA(2) allowance-statement requirement added: __
- §25.4 s.270CF residential exclusion added: __
- §25.11 s.187B pooling gate + s.187A fixed-value + 2-yr deadline added: __

### Comparison: before vs after
- Word count: ~1,150 → __
- H2 count: 8 → __ (target 11-13)
- FAQ count: 4 → __ (target 12-14)
- Worked examples: 0 → __ (target 4-5)
- Authority links: 0 → __ (target 5-7)
- Inline CTAs: 0 → __ (target 2)
- Rates table at top: 0 → __ (1 expected)
- Internal links: 3 → __ (UP to pillar, DOWN to s.198 + SBA + AIA + WDA, SIDEWAYS to commercial-tax + beginner + incorporation)
- Pricing leaks: 2 → 0
- Fabricated SBA rate: present → DELETED

### Flags raised
- F-[next] (carried from brief): fabricated SBA 2.5%/40yr — confirmed deleted: __
- F-[next+1] (carried from brief): two pricing leaks — confirmed stripped: __
- SBA-fabrication sibling audit result: __
- Any new flags surfaced: __

### Indexation hypothesis test (INVISIBLE baseline)
- Pre-rewrite: 0 GSC rows / 0 Bing rows / 90 days
- Post-rewrite expected: first impressions on long-tail buyer-mechanics queries (s.198 election, allowance statement, pooling requirement) where the cluster is currently absent
- Verify at +30 / +90 / +180 days via `monitored_pages` detector (180-day window)

### 2-3 sentence summary
- (populated at execution time)
