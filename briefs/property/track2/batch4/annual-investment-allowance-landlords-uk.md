# Track 2 brief: annual-investment-allowance-landlords-uk

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (BATCH 4)
**Source markdown path:** `Property/web/content/blog/annual-investment-allowance-landlords-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk
**Stage 1 priority:** H — strongest GSC node in a heavily duplicated 12+ page AIA cluster (32 impr / pos 63.9 / 90d on the exact head terms), and the page carries a CRITICAL WRONG-ADVICE defect that must be corrected on equity grounds.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source file read line-by-line; house positions §25.1-§25.10 confirmed; corpus link targets resolved to real canonical paths; competitor structure confirmed from diagnosis fetch)
**Cannibalisation status:** REWRITE (equity guard satisfied — see §8) + FLAG-MANAGER (cluster over-fragmentation, extends F-4; recommend a dedicated AIA cluster-collapse batch)

> **This is a gold-reference-depth brief.** Every load-bearing claim below was verified against the actual source markdown and `house_positions.md §25` at drafting time. The execution session must still re-verify every statute citation against legislation.gov.uk at write time (the F-37 Bill-vs-enacted pattern is live on this page — see §11).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** KEPT as `annual-investment-allowance-landlords-uk`. The slug carries the only Google equity in the cluster (32 impr / pos 63.9). Changing it forfeits that signal. The canonical path stays `/blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk` even though this is a capital-allowances topic, because the 32-impression equity is attached to that URL. (Category-vs-topic mismatch noted; do NOT re-slug to fix it — preserve the equity. See category note below.)
- **Category:** `Section 24 & Tax Relief` (KEPT for URL stability). The topic is properly capital-allowances, but the canonical URL path `/section-24-and-tax-relief/` is load-bearing for the 32-impression equity. Do not move it. The page funnels UP to the capital-allowances pillar (which lives under `/property-types-and-specialist-tax/`); cross-category internal links handle the topical home.
- **Gap-mode tag:** `WRONG-ADVICE` (PRIMARY — load-bearing) + `STALE_FACTS` (secondary) + `THIN_DEPTH` (tertiary) + `INVISIBLE` + `CANNIBAL` (cluster-level, flag only). PRICING_LEAK: none present (clean — confirmed by source read; flagged in the schema only because the field is mandatory).
- **"Why this rewrite" angle:** The page is BOTH factually wrong AND uncompetitive on the same axis. The entire current premise — that a residential BTL landlord can claim AIA on "boilers, heating systems" (line 54), "kitchen and bathroom fittings" (line 55), "furniture, white goods and furnishings in furnished lettings" (line 56), with a £50,000 boiler worked example inside a let block (line 38), and FAQ #1 in frontmatter ("Yes, you can claim the AIA on qualifying plant and machinery in a personally owned buy-to-let property") — directly contradicts LOCKED house position §25.7 + §25.3 + the §25.10 false-claims list, which states verbatim that "Plant in a residential dwelling is claimable under AIA" is FALSE: CAA 2001 s.35 bars plant-and-machinery allowances on plant in a dwelling-house. Both live SERP leaders (rossmartin, pkf-francisclark) LEAD with this exact bar. So we are giving wrong advice that would, if followed, expose a landlord to an incorrect AIA claim AND we rank poorly because we miss the question competitors answer first. **The rewrite inverts the premise:** residential lets = BLOCKED (s.35), with narrow carve-outs for (a) multi-let common parts, (b) commercial property / SPVs, (c) grandfathered FHL pools (FHL abolished 1 Apr 2025 CT / 6 Apr 2025 IT). The page becomes the landlord-facing APPLIED node ("can a landlord claim AIA? almost never on the dwelling — here's what to claim instead") funnelling up to the s.35-led pillar.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

- **Current word count:** ~1,632 body words (11 H2 sections + empty FAQ heading + sources list).
- **Current H2 outline:**
  1. What Is the Annual Investment Allowance?  *(line 36 — sets the wrong premise immediately, £50k boiler-in-a-let-block example at line 38)*
  2. Who Can Claim the Annual Investment Allowance?  *(line 41 — lists "Limited companies that own buy-to-let properties" + "Sole traders and partnerships running a property rental business" without the s.35 dwelling bar)*
  3. What Qualifies for the Annual Investment Allowance?  *(line 51 — THE WRONG-ADVICE CORE: lists boilers/heating/lifts/AC/kitchen/bathroom/furniture/white goods "in a rental property")*
  4. How Much Can You Claim?  *(line 63 — muddled AIA history at line 67: "£1m from January 2019... having been £200,000 for 2018/19")*
  5. When Can You Claim the AIA?  *(line 69 — broadly OK on timing mechanics)*
  6. How Does the AIA Interact with Other Capital Allowances?  *(line 78 — STALE: 18% WDA asserted as current at line 87; unhedged "40% first-year allowance ... after 1 January 2026" at line 84; backward-looking super-deduction clutter at line 86)*
  7. AIA for Limited Companies vs Sole Traders  *(line 89)*
  8. Common Mistakes Landlords Make with the AIA  *(line 97 — ironically omits the single biggest mistake: claiming on dwelling plant at all)*
  9. How to Claim the Annual Investment Allowance  *(line 108)*
  10. Planning Your Capital Expenditure to Maximise the AIA  *(line 119)*
  11. What Happens If You Sell an Asset on Which You Claimed AIA?  *(line 125 — balancing-charge mechanics, broadly OK)*
  - Plus bare `<h2>Frequently Asked Questions</h2>` (line 130) with NO body (FAQ schema is frontmatter-driven; delete the bare heading).
- **Current meta title:** "Annual Investment Allowance: Guide for UK Landlords" (51 chars).
- **Current meta description:** "Learn how the annual investment allowance works for UK landlords. Claim up to £1m on plant and machinery. Includes rules for companies and sole traders." (149 chars — reinforces the wrong premise: implies landlords broadly can claim).
- **Current FAQ count (frontmatter `faqs:` array):** 4 (FAQ #1 is WRONG — repeats the dwelling-plant error). Target 12-14.
- **Current outbound authority links:** 3 sources, all defective for purpose: ref-1 gov.uk AIA overview (live but does NOT mention the s.35 residential bar — the exact gap); ref-2 = DEAD/PARKED `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` carrying load-bearing FYA/cash-basis/full-expensing claims; ref-3 ICAEW capital allowances hub (generic). Zero legislation.gov.uk citations.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`). Do NOT hand-add FAQ schema in body.
- **HTML defects (invalid markup):** duplicate `id` attributes — `id="cite-1"` reused at lines 37, 64, 65, 66, 70, 73, 75, 76; `id="cite-2"` reused at lines 48, 82, 83, 84, 86, 93, 112; `id="cite-3"` at line 67. IDs must be unique. Rebuild the citation/superscript scheme cleanly on rewrite.
- **Last meaningful edit date:** `dateModified: '2026-05-20'`.

---

## GSC angle (last 90 days) — from diagnosis equity ranking

**This page (the rewrite target):** 32 impressions / 0 clicks / avg position 63.9 / 90-day window, on the exact head terms "annual investment allowance" + "annual investment allowance calculator" + "capital allowances on investment property in uk". INVISIBLE on Google (page 6+).

**Head cluster (primary + adjacent queries this page should own after rewrite):**
- "annual investment allowance landlords" (primary)
- "annual investment allowance calculator" (head)
- "capital allowances on investment property uk" (head)
- "can you claim capital allowances on investment property" (the question competitors LEAD with — and our current page answers WRONG)

**Cluster equity ranking (all 0 clicks, all INVISIBLE on Google — from diagnosis):**

| Slug | Impr | Avg pos | Disposition |
|---|---:|---:|---|
| annual-investment-allowance-uk | 55 | 70.9 | KEEP — second surviving landlord-facing applied node (see §8 collapse recommendation) |
| **annual-investment-allowance-landlords-uk (THIS)** | **32** | **63.9** | **REWRITE — primary surviving applied node** |
| annual-investment-allowance-2024-25 | 15 | 42.6 | Year-stamped stale title — later 301 INTO this page or pillar |
| capital-allowances-on-property | 15 | 61.3 | Later 301 candidate |
| aia-allowance-uk-property-investors | 8 | 25.3 | Best position, tiny vol — later 301 candidate |
| aia-capital-allowance-property-landlords | 2 | — | Near-zero equity — 301 candidate |
| capital-allowance-aia-property-landlords | 1 | — | Near-zero equity — 301 candidate |

**Read:** the cluster's only Google signal is split across this page (32) and `annual-investment-allowance-uk` (55), both INVISIBLE on position. The natural CANONICAL is the pillar (`capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`) but it has ZERO impressions (built 2026-05-23, too new for signal). **Collapsing impression-bearing pages into a zero-impression pillar is BARRED by the equity guard.** Therefore REWRITE this page in place, add the missing reciprocal internal links it lacks (only 2 self-citation hits in its own file = effectively ZERO inbound internal links vs the pillar's 9+), and funnel it UP to the pillar so the cluster's link equity consolidates the correct direction.

**GA4 engagement signal:** not separately pulled at draft time (page is INVISIBLE — negligible sessions expected). Execution session pulls `ga4_page_data` at write time if a row exists; otherwise note "no traffic, INVISIBLE, signal is impression-only".

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**PRIMARY: WRONG-ADVICE (load-bearing — this is the reason the rewrite exists).** The published page tells residential BTL landlords they CAN claim AIA on plant inside let dwellings (boilers, heating, kitchen/bathroom fittings, furniture, white goods). This is false and contradicts LOCKED §25.10 ("Plant in a residential dwelling is claimable under AIA" — listed as a FALSE claim) and §25.3 (AIA "is unavailable for residential lettings under the s.35 dwelling-house restriction"). The statutory mechanism is CAA 2001 s.35, which excludes plant in a dwelling-house from qualifying expenditure for a property business. A landlord who follows the current page would make an incorrect HMRC claim. This must be inverted as the rewrite's FIRST job.

**SECONDARY: STALE_FACTS (four distinct staleness defects):**
1. Line 87 asserts main-pool WDA "18% per year" as the settled current rate. This is about to be STALE: the main-rate WDA is announced to fall 18% → 14% from 1 Apr 2026 (CT) / 6 Apr 2026 (IT). **Bill-vs-enacted hazard (F-37):** this is a Finance Bill 2026 measure. House position §25.8 documents NO 18%→14% WDA cut — meaning it is NOT yet locked as enacted. VERIFY at write time; HEDGE as "announced / Finance Bill 2026, subject to Royal Assent" unless legislation.gov.uk confirms enactment.
2. Line 84 asserts a flat "40% first-year allowance for ... plant ... purchased after 1 January 2026" as settled fact, citing the dead `aka.hmrc.gov.uk` URL. **Bill-vs-enacted hazard (F-37):** the 40% main-pool FYA (from 1 Jan 2026) is a Finance Bill 2026 measure, NOT in §25 as enacted. House position §25.5 documents full expensing (s.45S, 100% company-only) and the EV/Freeport FYAs but NO 40% general FYA. VERIFY against legislation.gov.uk at write time; HEDGE or omit if not enacted.
3. Line 67 muddles AIA history ("temporarily set at £1m from January 2019 ... having been £200,000 for 2018/19"). §25.3 / §25.8 is cleaner and correct: the £1m cap was made PERMANENT from 1 April 2023 by Finance (No. 2) Act 2023 s.8 (CAA 2001 s.51A(5): "The maximum allowance is £1,000,000"). Replace the muddle with the permanent-cap framing.
4. Line 86 super-deduction paragraph is backward-looking clutter. Per §25.5 / §25.8 the 130% super-deduction (FA 2021 ss.9-10) EXPIRED 31 March 2023 and is relevant only for ongoing disposal-value clawback. Trim to one sentence at most.

**TERTIARY: THIN_DEPTH + INVISIBLE.** 1,632 words, position 63.9. The competitor depth ceiling is ~1,500-2,500 words but with the correct s.35-led framing the page is currently neither deep enough nor correctly framed. Lift to ~3,400 words with: the s.35 bar explained up front, the three carve-outs (common parts / commercial / grandfathered FHL), an AIA-eligibility decision flow, RDIR as the relief residential landlords actually use, an SPV/commercial worked example that IS legitimate, the §51E related-company single-AIA trap, and 12-14 FAQs each targeting a verbatim cluster query.

**CANNIBAL (cluster-level — flag only, not a per-page blocker).** 12+ page AIA cluster, materially over-fragmented (extends F-4). Equity guard bars collapsing this impression-bearing page into the zero-impression pillar. Recommendation: a dedicated cluster-collapse batch where THIS page + `annual-investment-allowance-uk` survive as the two landlord-facing applied nodes under the pillar, and the weaker siblings 301 in. The rewrite must add the reciprocal internal links the page currently lacks.

**PRICING_LEAK: NONE.** Source read confirms no fees, no £800-1,500-style comparisons, no Decision-E soft fee ranges. Clean. (Field present only because the schema mandates it.)

**Load-bearing fix sequence (ordered by ROI):**
1. **Invert the premise** — open with the s.35 dwelling-house bar (residential plant is NOT claimable under AIA). This is correctness AND competitiveness in one move.
2. **Strip every wrong "qualifying" claim** — remove boilers/heating/kitchen/bathroom/furniture/white-goods-in-a-let-dwelling list (lines 53-59) and the £50k boiler-in-a-let-block example (line 38).
3. **Re-home FAQ #1** — rewrite the frontmatter FAQ #1 from "Yes you can" to the correct "Almost never on the dwelling itself — here's why and what to claim instead".
4. **Add the three legitimate carve-outs** — (a) multi-let COMMON PARTS (block-of-flats communal boilers/lifts/lighting; §25.7 + the HMO common-parts page); (b) COMMERCIAL property / mixed-use commercial portion / commercial SPV (§25.2 List C, §25.3); (c) grandfathered FHL pools (FHL abolished, §25.7 / §6) — continued WDA only, no new FHL expenditure.
5. **Signpost RDIR** — the relief residential landlords actually use for furniture/white-goods replacement is Replacement of Domestic Items Relief (ITTOIA 2005 s.311A / CTA 2009 s.250A), an income/CT deduction, NOT a capital allowance. Link the RDIR guide.
6. **Fix the staleness** — permanent £1m cap (F(No.2)A 2023 s.8); hedge the 18%→14% WDA cut and the 40% FYA as Finance Bill 2026 / subject to Royal Assent (F-37); trim super-deduction.
7. **Citation rebuild** — replace the dead `aka.hmrc.gov.uk` URL; add legislation.gov.uk s.35 / s.51A / s.39 / s.45S + the gov.uk AIA page; unique IDs; delete the bare FAQ `<h2>`.
8. **Depth + structure lift** to ~3,400 words, 12-14 FAQs, 1-3 inline `<aside>` CTAs at conversion moments, reciprocal internal links to the pillar + RDIR + HMO common parts + full expensing + SBA.
9. **Meta rewrite** to lead with the corrected, differentiated intent.

---

## Competitor URLs (Stage 2 — from diagnosis, all confirmed LIVE 200)

| URL | Status | Structure signal | Borrow / differentiate |
|---|---|---|---|
| https://www.rossmartin.co.uk/property-income/810-capital-expenditure-allowances | 200 (upd 20 May 2024) | LEADS with the dwelling-house bar + Replacement of Domestic Items Relief signpost | **Gold structure target.** Borrow the "bar first, carve-outs second, RDIR signpost third" ordering. Differentiate by adding the SPV/commercial worked example + §51E related-company trap + decision flow they lack. |
| https://pkf-francisclark.co.uk/insights/capital-allowances-for-property-investors-what-you-can-and-cant-claim-in-2025/ | 200 | "what you can and can't claim" framing; dwelling-house bar + FHL April-2025 abolition + SBA 3% + cash-basis limit | Borrow the "can / can't" two-column mental model. Differentiate with our verified statute spine (they cite few sections) + grandfathered-FHL-pool transitional depth. |
| https://www.taxinsider.co.uk/capital-allowances-and-residential-property-ta | 200 | Residential-specific angle, common-parts carve-out | Borrow the common-parts framing. Differentiate by tying it to §25.7 + our HMO-common-parts page + the HMO-vs-standard-BTL comparison. |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | 200 | Statutory anchor — states £1m but does NOT mention the s.35 residential bar | This is the GAP. gov.uk omits the dwelling bar entirely — exactly what competitors fill and what our current page got backwards. Link to it for the £1m/timing mechanics; our differentiator is the s.35 layer gov.uk skips. |

**Competitor depth ceiling for this query class:** ~1,500-2,500 words, 0-few statute citations, strong on the dwelling-house bar + RDIR signpost. Our ~3,400-word target with the full verified §25 statute spine (s.35 / s.51A-51N / s.39 / s.45S / s.270CF / s.311A), 12-14 FAQs, a legitimate SPV worked example, and the §51E related-company trap puts us decisively best-in-class — and finally CORRECT.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index reference:** `docs/property/track2_cannib_index_2026-05-23.md` (cluster context per diagnosis; refresh §4 at execution).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | annual-investment-allowance-landlords-uk | self | **REWRITE in place** — equity guard satisfied (32 impr; barred from collapse into 0-impr pillar) |
| Cluster CANONICAL (pillar) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | Owns the 4-axis CAA 2001 decision framework | NO collision — pillar owns the framework; THIS page owns the narrow landlord "can I claim AIA / dwelling bar / what to claim instead" intent. Funnel UP. Reciprocal link mandatory. |
| Cluster sibling (KEEP) | annual-investment-allowance-uk | 55 impr / pos 70.9 | Second surviving landlord-facing applied node. NO collision at rewrite time; differentiate by intent (this page = landlord/dwelling-bar applied; that page = general AIA mechanics). Both later sit under the pillar. |
| Cluster siblings (301 candidates) | annual-investment-allowance-2024-25, capital-allowances-on-property, aia-allowance-uk-property-investors, aia-capital-allowance-property-landlords, capital-allowance-aia-property-landlords, aia-capital-allowances, capital-allowances-examples | Year-stamped / near-duplicate AIA pages | Weaker / near-zero equity. **Later 301 INTO this page or the pillar** (reverse direction is correct — do NOT redirect this page into them). Not actioned in this brief; flagged for the cluster-collapse batch. |
| Adjacent (link, no collision) | hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property; hmo-capital-allowances-multi-tenant-landlords-claim | Common-parts carve-out depth | NO collision — these own the HMO common-parts mechanics; THIS page references + forward-links. |
| Adjacent (link, no collision) | replacement-domestic-items-relief-uk-landlords-guide | The relief residential landlords actually use | NO collision — RDIR is an income/CT deduction, not a capital allowance. This page signposts it as the correct alternative. |
| Adjacent (link, no collision) | full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023; structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward | Company FYA + SBA mechanics | NO collision — these own the company-side FYA / SBA depth; THIS page references the commercial/SPV route + forward-links. |
| Adjacent (link, no collision) | balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics | Disposal/balancing-charge depth | NO collision — forward-link from the disposal section. |
| Adjacent (link, no collision) | fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | Grandfathered FHL pools | NO collision — forward-link from the FHL carve-out paragraph. |

**Conclusion:** REWRITE in place (equity guard satisfied). FLAG-MANAGER on cluster over-fragmentation (extends F-4): recommend a dedicated AIA cluster-collapse batch where this page + `annual-investment-allowance-uk` survive under the pillar and the 5-7 weaker siblings 301 in. NO redirect of THIS page.

---

## Closest existing pages (Stage 2) — internal-link targets within the live corpus

All verified to exist with these exact canonical paths at draft time. Use the full `/blog/<category>/<slug>` path for each.

- **Pillar (funnel UP — reciprocal link MANDATORY):** `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — link from the intro AND from a closing "where this sits" line. The pillar owns the 4-axis CAA 2001 framework; this page is its landlord-applied AIA node.
- **RDIR (the correct residential alternative):** `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide` — link from the "what to claim instead" section (replacing furniture/white goods in a let dwelling is RDIR, not AIA).
- **HMO common parts (carve-out (a)):** `/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` — link from the common-parts carve-out paragraph.
- **Full expensing / 50% FYA (carve-out (b), company route):** `/blog/property-types-and-specialist-tax/full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — link from the commercial/SPV section (s.45S company-only full expensing companion to AIA).
- **SBA (commercial structures):** `/blog/property-types-and-specialist-tax/structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` — link from the commercial section (SBA covers the structure where AIA/P&M does not).
- **FHL grandfathered pools (carve-out (c)):** `/blog/property-types-and-specialist-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — link from the FHL transitional paragraph.
- **Balancing charge on disposal:** `/blog/property-types-and-specialist-tax/balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` — link from the disposal/clawback section.
- **Landlord deductions (cash vs accruals context):** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — already linked at current line 49; keep (cash-basis capital-allowance restriction context).
- **Sibling applied node (light cross-link):** `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` — optional single cross-link as co-surviving applied node.
- **TSX routes already in the current file (keep if still valid):** `/incorporation` (line 95) and `/services` (line 106) — verify resolve at build; replace `/incorporation` with the BTL ltd-co incorporation pillar if the bare route 404s.

**Reciprocity note:** the page currently has effectively ZERO inbound internal links (only 2 self-citation hits in its own file). The rewrite must both ADD the outbound links above AND the execution session should note for the cluster-collapse batch that inbound links from the pillar + HMO + RDIR pages back to this node would consolidate equity.

---

## House-position references (Stage 1) — thread these; cite §N.M, never paraphrase

- **§25.1 Qualifying activities (CAA 2001 s.15 / s.270CA)** [LOCKED 2026-05-23]: AIA needs a qualifying activity (UK property business / overseas property business / trade); s.15(1)(c)/(da) FHL paragraphs OMITTED by FA 2025 Sch 5 Part 3 from 1 Apr 2025 (CT) / 6 Apr 2025 (IT).
- **§25.2 Plant and machinery (CAA 2001 ss.21-204)** [LOCKED 2026-05-23]: s.21 buildings exclusion (List A), s.22 structures (List B), s.23 List C carve-back, s.33A integral features (special rate 6%). The s.35 dwelling-house restriction is the operative bar for residential lets.
- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23 — PRIMARY LOCK]: s.51A(5) "The maximum allowance is £1,000,000"; £1m PERMANENT from 1 April 2023 (Finance (No. 2) Act 2023 s.8); cars excluded; AIA UNAVAILABLE for residential lettings under s.35; §51E + §51G related-company single-AIA trap (shared premises / similar activities NACE test).
- **§25.5 First-Year Allowances (CAA 2001 ss.39-51)** [LOCKED 2026-05-23]: s.45S full expensing 100% main-rate, COMPANY-ONLY, from 1 April 2023 (permanent); 50% special-rate FYA companion; s.45D EV cars; s.45O Freeport. NOTE: §25.5 documents NO 40% general FYA — the page's "40% from 1 Jan 2026" claim is NOT house-position-backed; treat as Finance Bill 2026 (F-37 hedge).
- **§25.7 FHL transitional (FA 2025 Sch 5)** [LOCKED 2026-05-23]: grandfathered FHL pools transfer to the ordinary property-business pool, continued WDA permitted, NO new FHL expenditure qualifies; cite FA 2025 Sch 5 (NOT FA 2024 Sch 5).
- **§25.8 Recent reforms + verification anchors** [LOCKED 2026-05-23]: confirms £1m permanent (s.51A(5)); full expensing permanent (s.45S); super-deduction EXPIRED 31 Mar 2023. CONTAINS NO 18%→14% WDA cut and NO 40% FYA — both must be treated as Finance Bill 2026 / verify-at-write (F-37).
- **§25.10 Do-not-write list** [LOCKED 2026-05-23]: "Plant in a residential dwelling is claimable under AIA" = FALSE (s.35 bar; narrow exception for communal common parts of a multi-let building). "Full expensing is available to individual landlords" = FALSE (s.45S company-only). "SBA is available on residential property" = FALSE (s.270CF residential-use exclusion).
- **§6 FHL abolition transition** [LOCKED]: former FHLs now taxed as standard residential; FHL-specific capital allowances no longer available for new spend; pooled allowances brought forward continue to receive WDA.
- **§21.5 FIC / SPV capital-allowance availability** [LOCKED]: where the FIC/SPV owns COMMERCIAL property, AIA available; where a pure-investment FIC owns BTL, AIA blocked by s.35.
- **§13 Do-not-write (lead-gen discipline)** [LOCKED]: NO pricing; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — WRONG-ADVICE (this rewrite's first job).** The published page directly contradicts LOCKED §25.10, §25.3, §25.7:
- Line 38: £50,000 boiler "for a block of flats you let out" presented as a clean AIA claim (only correct if it is genuinely a communal common-part installation — the page does not make that distinction and presents it as ordinary dwelling plant).
- Lines 53-59: lists boilers, heating systems, kitchen/bathroom fittings, furniture, white goods "in furnished lettings" as AIA-qualifying — DIRECTLY false per §25.10.
- Frontmatter FAQ #1 ("Yes, you can claim the AIA on qualifying plant and machinery in a personally owned buy-to-let property") — false per §25.3 + §25.10.

Flag to `track2_site_wide_flags.md` as:
**F-[next] | 2026-05-30 | CRITICAL | annual-investment-allowance-landlords-uk | WRONG-ADVICE + STALE_FACTS | Published page asserts residential dwelling plant (boilers/heating/kitchen/bathroom/furniture/white goods) is AIA-claimable, contradicting LOCKED §25.10 + §25.3 (CAA 2001 s.35 dwelling-house bar). FAQ #1 repeats the error. Also: unhedged Finance Bill 2026 measures (18%→14% WDA at body line 87; 40% FYA from 1 Jan 2026 at line 84) asserted as enacted — F-37 Bill-vs-enacted pattern. Dead aka.hmrc.gov.uk citation + duplicate cite-1/cite-3 IDs. Rewrite inverts the premise (s.35 bar first) + hedges Finance Bill 2026 measures + rebuilds citations.**

**Cluster flag (extends F-4):** the AIA cluster is 12+ pages, materially over-fragmented. Recommend a dedicated cluster-collapse batch — this page + `annual-investment-allowance-uk` survive as landlord-facing applied nodes under the pillar; the 5-7 weaker siblings 301 in.

---

## Authority links worth considering (Stage 2 — VERIFY EVERY ONE at write time against legislation.gov.uk, including any Finance Act Royal Assent date)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Per §25 verified 2026-05-23 — RE-VERIFY at write | THE dwelling-house exclusion — the page's central correction |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | Per §25.3 verified 2026-05-23 (s.51A(5) "£1,000,000") — RE-VERIFY | AIA £1m maximum |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51E | Per §25.3 — RE-VERIFY | Related-company single-AIA trap |
| https://www.legislation.gov.uk/ukpga/2001/2/section/39 | Per §25.5 — RE-VERIFY | FYA gateway |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Per §25.5 (company-only full expensing, from 1 Apr 2023) — RE-VERIFY | Commercial/SPV company route |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270CF | Per §25.4 (SBA residential-use exclusion) — RE-VERIFY | Why SBA also fails on dwellings |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | RDIR income-tax base — VERIFY exact section + current wording (ITTOIA 2005 s.311A) | The correct residential alternative relief |
| https://www.legislation.gov.uk/ukpga/2009/4/section/250A | RDIR corporation-tax companion — VERIFY (CTA 2009 s.250A) | RDIR for company landlords |
| https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 | Per §25.7 (FA 2025 Sch 5, FHL abolition) — RE-VERIFY Royal Assent (FA 2025 = c.8) | Grandfathered FHL pools |
| https://www.legislation.gov.uk/ukpga/2023/30 (Finance (No. 2) Act 2023) s.8 | Per §25.8 (£1m permanent) — RE-VERIFY exact section | Permanent £1m cap |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Per diagnosis live 200 (omits s.35 bar) | Link for £1m + timing mechanics; our differentiator is the s.35 layer |
| Finance Bill 2026 / Finance Act 2026 — 18%→14% WDA cut + 40% FYA | **NOT in §25 as enacted — F-37 HAZARD** | If still Bill-form at write: HEDGE "announced, Finance Bill 2026, subject to Royal Assent". If enacted by write date: cite the exact FA 2026 section + Royal Assent date. DO NOT assert as enacted without verification. |

**REPLACE the dead `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` citation entirely.** Execution session cites 5-7 of the above in body.

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 item 13`. Critical for THIS brief: NO em-dashes (commas, parentheses, full stops, middle dots only). NO pricing / fees / soft fee ranges (Decision E). NO real client names — anonymised proof only (e.g., "a portfolio landlord we advised who owns a converted block with communal heating..."). LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; use 1-3 inline `<aside>` CTAs at conversion moments. No Tailwind utility classes in markdown body — semantic HTML only. FAQ schema is frontmatter-driven (`faqs:` array, target 12-14) — never hand-add FAQ schema in body. EVERY statute citation verified against legislation.gov.uk at write time, including the Royal Assent date of any cited Finance Act (F-37 pattern is LIVE on this page).

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 item 14`. Page-specific deltas:

- **Step 1 (read house positions):** read §25.1, §25.2, §25.3, §25.5, §25.7, §25.8, §25.10, plus §6 and §21.5, in full at session start.
- **Step 4 (load-bearing pre-rewrite verification):** VERIFY (a) the s.35 dwelling-house bar wording at legislation.gov.uk; (b) the Finance Bill 2026 status of the 18%→14% WDA cut AND the 40% FYA (F-37) — decide HEDGE vs ASSERT and record it; (c) the RDIR section numbers (ITTOIA 2005 s.311A / CTA 2009 s.250A).
- **Step 6 (read source):** the current file at `Property/web/content/blog/annual-investment-allowance-landlords-uk.md` (read in full — the wrong-advice is spread across lines 36-67 + FAQ #1).
- **Step 7 (read siblings):** read the pillar + RDIR + HMO-common-parts + full-expensing + SBA pages for accuracy alignment and reciprocal-link wording.
- **Step 8 (outline):** 11-13 H2s, ~3,400 body words, 12-14 FAQs, decision-flow block, s.35-bar-first ordering.
- **Step 9 (rewrite at existing path):** preserve frontmatter slug + canonical + category (URL stability for the 32-impr equity); update `dateModified` to today + `sourcesVerifiedAt`. Rewrite metaTitle/metaDescription (see plan below). Rewrite frontmatter FAQ #1 (currently wrong). Rebuild citation IDs to be unique. Delete the bare `<h2>Frequently Asked Questions</h2>`.
- **Step 10 (build):** `cd Property/web && npm run build` must pass.
- **Step 11 (six checks + extras):** FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title <= 62 chars; meta description <= 158 chars; ALL internal links resolve; PLUS no duplicate `id` attributes; PLUS no residential-dwelling-AIA-claimable assertion survives (grep the body for "boiler"/"furniture"/"white goods" and confirm each appears only in a BARRED context); PLUS no unhedged Finance Bill 2026 rate assertion.
- **Step 12:** confirm no redirect of THIS page (slug kept). Record the cluster-collapse recommendation for the manager (the weaker siblings 301 INTO this page later).
- **Step 13:** insert/update `monitored_pages` row (rewrite_date = today; 90-day window; this is a WRONG-ADVICE correction — flag as high-watch).
- **Steps 14-19:** commit on main; update `track2_page_tracker.md` to executed; log the WRONG-ADVICE catch + F-37 hedge decision in `track2_site_wide_flags.md`; heartbeat `TRACK2_PROGRAM.md §3`; log cluster-collapse recommendation for the manager.

---

## Section-by-section content plan (~3,400 words)

1. **H2 "Can a UK landlord claim the Annual Investment Allowance? Start with the dwelling-house bar"** (~350w). Invert the premise immediately. State plainly: for an ordinary residential let, AIA on plant inside the dwelling is BLOCKED by CAA 2001 s.35. Define AIA briefly (100% write-off up to £1m, §25.3) but front-load the bar. Link the pillar. *(corrects lines 36-39)*
2. **H2 "Why s.35 blocks plant-and-machinery allowances in a dwelling-house"** (~300w). Explain s.35: plant provided for use in a dwelling-house is not qualifying expenditure for a property business. Tie to §25.2 + §25.10. Name the items landlords WRONGLY think they can claim (boilers, kitchen/bathroom fittings, furniture, white goods inside the let dwelling) and state clearly they are barred here. *(corrects lines 53-59)*
3. **H2 "The three situations where a landlord CAN claim AIA"** (~250w intro + the three H3s). Decision-flow framing.
   - **H3 "(a) Communal common parts of a multi-let building"** (~250w): block-of-flats communal boilers, lifts, lighting, stairwell heating are NOT in any single dwelling-house, so the s.35 bar does not bite (§25.7). Link the HMO-common-parts page. Anonymised example.
   - **H3 "(b) Commercial property, mixed-use commercial portion, and commercial SPVs"** (~300w): commercial property carries the broader claim base (§25.2 List C, §25.3); AIA available; company SPVs can ALSO use full expensing (s.45S, company-only) and SBA on the structure. Link full-expensing + SBA pages. LEGITIMATE worked example here (commercial unit fit-out / SPV).
   - **H3 "(c) Grandfathered furnished-holiday-let pools"** (~250w): FHL abolished 1 Apr 2025 (CT) / 6 Apr 2025 (IT) by FA 2025 Sch 5 (§25.7 / §6). Pre-abolition FHL P&M pools transfer to the ordinary property-business pool and continue to receive WDA, but NO new FHL expenditure qualifies. Link FHL-grandfathered page. F-37 caution on FA 2025 Royal Assent.
4. **H2 "What residential landlords claim instead: Replacement of Domestic Items Relief"** (~300w). RDIR (ITTOIA 2005 s.311A / CTA 2009 s.250A) is an income/CT deduction (not a capital allowance) for replacing furniture, white goods and furnishings in a let dwelling. Contrast with AIA. Link the RDIR guide. *(this is the "what to claim instead" the current page omits)*
5. **H2 "How much is the AIA, and the permanent £1m cap"** (~250w). s.51A(5) £1m; PERMANENT from 1 April 2023 (Finance (No. 2) Act 2023 s.8). Period-proration (short/long accounting periods). *(corrects the muddled history at line 67)*
6. **H2 "The related-company trap: one AIA shared across a group (s.51E)"** (~250w). Portfolio landlords running multiple SPVs under common control + related (shared premises / similar-activities NACE test, §51E/§51G) share a SINGLE £1m AIA. A genuine differentiator competitors skip. Anonymised SPV-group example.
7. **H2 "How AIA sits alongside full expensing, WDAs and FYAs (companies)"** (~350w). Company route: s.45S full expensing (100%, company-only, from 1 Apr 2023) + 50% special-rate FYA. Main pool / special-rate pool (18% / 6%) for spend above the cap. **HEDGE the 18%→14% main-pool WDA cut and the 40% FYA as Finance Bill 2026 / subject to Royal Assent (F-37) — verify at write.** Trim super-deduction to one sentence (expired 31 Mar 2023). *(corrects lines 78-87)*
8. **H2 "When you can claim: timing, payment dates and hire purchase"** (~250w). Keep the broadly-correct timing mechanics (contract date vs payment-due-4-month rule; HP; final-period bar). Re-cite to gov.uk + legislation. *(keeps lines 69-76, re-sourced)*
9. **H2 "Buying a property with existing fixtures: apportionment and the s.198 election"** (~250w). For COMMERCIAL purchases, fixtures apportionment + s.198 fixed-value election (two-year deadline, pooling gate). Make clear this is commercial, not residential dwellings. Link balancing-charge page.
10. **H2 "Selling an asset you claimed AIA on: disposal values and balancing charges"** (~250w). Pool reduction, balancing charge if proceeds exceed pool, balancing allowance if lower. Link the balancing-allowance/charge page. *(tightens lines 125-128)*
11. **H2 "Common AIA mistakes landlords actually make"** (~250w). Re-frame the mistakes list to LEAD with the real biggest mistake: claiming AIA on dwelling plant at all. Then: assuming cash-basis landlords get AIA beyond cars; missing the §51E single-AIA group trap; treating RDIR spend as AIA or vice versa; over-claiming on a commercial mixed-use building's residential portion. *(replaces lines 97-105)*
- Inline `<aside>` CTAs at ~2 conversion moments (after the commercial/SPV H3, and after the §51E trap section).
- **FAQ (frontmatter, 12-14):** rewrite FAQ #1 to the corrected answer; add verbatim-query FAQs: "Can you claim capital allowances on investment property in the UK?"; "Can a buy-to-let landlord claim the annual investment allowance?"; "What is the annual investment allowance for 2026/27?"; "Can I claim AIA on a new boiler in my rental property?" (answer: not in the dwelling — s.35 — but yes for communal common parts); "Is there an annual investment allowance calculator?"; "Can I claim AIA on furniture in a furnished let?" (no — RDIR instead); "Does the AIA apply to commercial property?"; "Can a property SPV claim full expensing?"; "Do multiple SPVs each get their own £1m AIA?" (no — §51E); "Can I still claim capital allowances on a former furnished holiday let?"; "Does AIA apply to second-hand plant?"; "Can I claim AIA if my property business makes a loss?".
- **Delete** the bare `<h2>Frequently Asked Questions</h2>`.
- **Sources:** rebuild as 6-7 numbered legislation.gov.uk + gov.uk citations with UNIQUE IDs; remove the dead aka.hmrc.gov.uk URL.

---

## Statute spine (every section number with its Act — VERIFY each at write time)

- **CAA 2001 s.15** — qualifying activities (FHL paras (c)/(da) omitted by FA 2025 Sch 5 Part 3)
- **CAA 2001 s.21** — buildings exclusion (List A)
- **CAA 2001 s.22** — structures exclusion (List B)
- **CAA 2001 s.23** — List C carve-back
- **CAA 2001 s.33A** — integral features (special-rate 6%)
- **CAA 2001 s.35** — dwelling-house exclusion (THE central correction)
- **CAA 2001 s.39** — first-year allowance gateway
- **CAA 2001 s.45S** — full expensing (company-only, from 1 April 2023)
- **CAA 2001 s.51A** — AIA entitlement; s.51A(5) "£1,000,000"
- **CAA 2001 s.51E / s.51F / s.51G** — related-company single-AIA (control + shared-premises / similar-activities tests)
- **CAA 2001 s.196** — fixtures disposal-value Table
- **CAA 2001 s.198** — fixtures election on sale of qualifying interest (commercial)
- **CAA 2001 s.270CF** — SBA residential-use exclusion (why SBA also fails on dwellings)
- **ITTOIA 2005 s.311A** — Replacement of Domestic Items Relief (income tax)
- **CTA 2009 s.250A** — Replacement of Domestic Items Relief (corporation tax)
- **Finance (No. 2) Act 2023 s.8** — £1m AIA cap made permanent from 1 April 2023
- **Finance Act 2025 (c.8) Schedule 5** — FHL abolition (1 Apr 2025 CT / 6 Apr 2025 IT)
- **Finance Bill / Finance Act 2026** — 18%→14% main-pool WDA cut + 40% FYA (F-37: NOT in §25 as enacted; VERIFY Royal Assent; HEDGE if Bill-form)

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (test 2-3 against <= 62 chars; lead with the corrected, differentiated intent):**
  - Candidate A: "AIA for Landlords: Can You Claim It on a Rental? | s.35 Bar" (58)
  - Candidate B: "Annual Investment Allowance for Landlords: What You Can Claim" (60)
  - Candidate C: "Can Landlords Claim the Annual Investment Allowance?" (51)
  - Lead recommendation: Candidate A or C — both signal the question competitors lead with and our current page answers wrong. Avoid the current title's implied "yes you can broadly claim".
- **metaDescription (<= 158 chars, correct premise + differentiator + soft hook, NO pricing):**
  - "Most residential landlords cannot claim the annual investment allowance on dwelling plant (CAA 2001 s.35). See the three exceptions and what to claim instead." (157)
- **h1:** "Annual Investment Allowance for UK Landlords: Who Can Actually Claim It" (replaces the current "A Complete Guide" framing with the corrected, distinguishing intent; keep "UK Landlords" for query match).

---

## Per-page work-log (for execution session)

### House-position alignment
- §25.3 AIA £1m permanent (s.51A(5) + F(No.2)A 2023 s.8): __
- §25.10 / §25.3 s.35 dwelling-house bar applied (residential plant BARRED): __
- §25.7 / §6 FHL grandfathered pool framing (FA 2025 Sch 5, not FA 2024): __
- §25.5 s.45S full expensing company-only (NOT individual landlords): __
- §21.5 SPV: commercial-owning SPV = AIA available; pure-investment BTL SPV = blocked: __
- §13 do-not-write (no pricing, no client names): __

### F-37 Bill-vs-enacted decision (LOAD-BEARING)
- 18%→14% main-pool WDA cut — status at write: __ Bill-form (hedge) / __ enacted FA 2026 s.__ (assert with Royal Assent date)
- 40% FYA from 1 Jan 2026 — status at write: __ Bill-form (hedge/omit) / __ enacted FA 2026 s.__ (assert)

### Comparison: before vs after
- Word count: 1,632 → __ (target ~3,400)
- H2 count: 11 (+ bare FAQ heading) → __ (target 11-13, bare FAQ heading deleted)
- FAQ count: 4 (FAQ #1 wrong) → __ (target 12-14, FAQ #1 corrected)
- Authority links: 3 (1 dead) → __ (target 6-7 legislation.gov.uk + gov.uk, unique IDs)
- Inline CTAs: 0 → __ (target 2)
- Internal links: 2 self-cites → __ (pillar + RDIR + HMO common parts + full expensing + SBA + FHL + balancing + deductions)
- Wrong-advice claims removed: __ (boilers/heating/kitchen/bathroom/furniture/white-goods-in-dwelling list + £50k boiler example + FAQ #1)
- Duplicate `id` attributes: 8+ → 0
- Dead citation removed (aka.hmrc.gov.uk): __ (Y/N)

### Flags raised
- F-[next] CRITICAL WRONG-ADVICE (carried from this brief — confirmed corrected): __
- F-37 hedge/assert decision recorded: __
- Cluster-collapse recommendation logged for manager (extends F-4): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
