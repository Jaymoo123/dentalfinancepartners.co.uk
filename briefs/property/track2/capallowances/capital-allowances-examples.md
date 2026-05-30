# Track 2 brief: capital-allowances-examples

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (worked-example hub repositioning)
**Source markdown path:** `Property/web/content/blog/capital-allowances-examples.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/capital-allowances-examples
**Stage 1 priority:** M-H (mechanics-led page in a dense, recently-locked CAA 2001 cluster; carries multiple STALE_FACTS that contradict the §38 FA 2026 lock — correctness risk elevates it)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (in place — the page stays DISTINCT as the numbers-led worked-example hub of the cluster; pillar is the consolidation anchor, this page links UP to it and DOWN to the mechanics depth pages; no REDIRECT-PROPOSED)

> **This is a gold-reference depth brief.** It matches the structure and depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The load-bearing job is twofold: (a) correct six STALE/INCOMPLETE-FACT errors that now contradict the §38 FA 2026 lock and the §25 CAA 2001 lock, and (b) reposition the page from a generic "what are capital allowances" overview (which duplicates the guide siblings) into the cluster's worked-example hub, where every section is anchored on a concrete computation.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowances-examples`. The slug carries the worked-example / numbers-led intent ("capital allowances examples", "worked capital allowances example UK landlord"), which is distinct from the cluster's guide-intent and mechanics-depth pages. No redirect proposed.
- **Category:** `Property Types & Specialist Tax` (kept — frontmatter `category` + canonical path `property-types-and-specialist-tax/` preserved).
- **Gap-mode tag:** `STALE_FACTS` (primary — load-bearing) + `THIN_DEPTH` (secondary, 1,258 words vs ~3,400 target + competitor 40% FYA coverage absent) + `INVISIBLE` (tertiary — weak/no GSC signal, generic-suffix page) + `STRUCTURE` (no rates table, no s.198 worked example, FAQ count low, generic overview that duplicates siblings).
- **"Why this rewrite" angle:** This page has six material factual errors that now contradict the LOCKED house positions §38 (FA 2026 capital-allowances floor, manager-verified 2026-05-30) and §25 (CAA 2001 cluster, locked 2026-05-23 + §25.11 s.198 depth locked 2026-05-24). The most serious: the body OMITS the main-pool WDA rate entirely and only gives the special-rate "6% per year reducing balance"; the main-pool WDA was **CUT from 18% to 14%** by FA 2026 s.28 effective April 2026 (§38). The page also misses the entire modern FYA layer (company-only full expensing s.45S + the new 40% FYA at FA 2026 s.29 — which competitor propertytaxservices already covers), frames the £1m AIA as a "2025/26" figure rather than permanent, cites the FHL transitional too thinly, conflates the SBA allowance statement with the s.198 fixtures election, and understates the s.35 dwelling-house bar. Correcting these is the first job. The second job is repositioning: drop the generic "what are capital allowances" overview (which duplicates `capital-allowances-on-property`, `landlord-capital-allowances-tax-relief`, `what-is-aia-in-tax` and the pillar), keep only a one-line definition, then go straight into worked computations — making this the example hub the rest of the cluster links into, not a competing guide.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`Property/web/content/blog/capital-allowances-examples.md`, dateModified 2026-05-20):**
- **Word count:** ~1,258 body words.
- **H2 outline (9 sections):**
  1. What Are Capital Allowances? (generic overview — duplicates guide siblings; cut to a one-line definition)
  2. Capital Allowances Example: Commercial Property (Sarah / Manchester office — £75k AIA claim, £30k saving)
  3. Capital Allowances Example: Furnished Holiday Let (Pre-Abolition) (James / Lake District cottage — £13k claim, £2,600 saving)
  4. Capital Allowances Example: Mixed-Use Property (shop-with-flat-above, 60/40 floor-area apportionment, £6k boiler)
  5. What Does Not Qualify for Capital Allowances? (list)
  6. How to Claim Capital Allowances (self-assessment + "ask the seller for a capital allowances statement" — CONFLATES SBA statement with s.198 election)
  7. Capital Allowances and Incorporation (companies, "19% to 25%" CT range)
  8. Common Mistakes Landlords Make (list)
  9. Frequently Asked Questions
- **Meta title:** "Capital Allowances Example: Claiming Tax Relief on Property" (57 chars; generic; no differentiator and no year anchor).
- **Meta description:** "See a capital allowances example for UK landlords. Learn what fixtures qualify, how to claim, and the rules for commercial and furnished property." (146 chars).
- **H1:** "Capital Allowances Examples for UK Landlords: What You Can Claim".
- **FAQ count (frontmatter `faqs:` array):** 4 (target 12-14). FAQ #2 is year-stamped "2025/26" and frames AIA as a year-specific figure; FAQ #4 carries the "19% to 25%" CT range.
- **Worked examples present:** 3 (commercial office, FHL cottage, mixed-use). These are good bones to keep and EXPAND — the £30k and £2,600 savings are legitimate computation outputs (NOT pricing leaks per Decision E).
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations).
- **Internal links:** 5 (landlord-tax-deductions list, /services, what-does-a-property-accountant-do, how-to-choose-a-property-accountant, how-much-does-a-property-accountant-cost). NONE link UP to the cluster pillar or DOWN to the mechanics depth pages — the central structural defect for a hub page.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit:** 2026-05-20 (frontmatter `dateModified`).
- **Named personas:** "Sarah" (Manchester office), "James" (Lake District cottage) — illustrative personas, acceptable per house norm (not real client names).

---

## GSC angle (last 90 days) (Stage 2 — pull at execution)

**Status:** diagnosis flags `INVISIBLE` as a gap mode and the cannibalisation note describes this as a generic-suffix page in a dense cluster. Treat as **low/no measurable GSC signal** (consistent with the `INVISIBLE` + generic-suffix-invisibility pattern, D-9 from Batch 1). The page was last touched 2026-05-20, so the 90-day window is short.

**Execution session MUST pull fresh data** before finalising the meta rewrite:
```
python -m optimisation_engine.track2.pull_page_data --slug capital-allowances-examples
```
(or `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90` then query `gsc_query_data` for this page URL; also check `bing_query_data` per the memory note that legacy pages often rank page-1 on Bing while page 4-8 on Google.)

**Expected query class (reasoning, verify at execution):**
- "capital allowances examples", "capital allowances example uk", "worked capital allowances example", "capital allowances example landlord", "capital allowances example commercial property".
- Likely competing internally with the guide siblings on the broad "capital allowances on property" head term (see Cannibalisation section) — the rewrite's distinctiveness work is what protects this page from cannibalising the pillar.

**Decision rule:** if the page has genuinely zero GSC + zero Bing signal at execution, this is an `INVISIBLE` page; the rewrite still proceeds (it is a correctness fix — six stale facts must be removed regardless of traffic) but the success metric shifts from CTR-lift to (a) factual correctness against §38/§25 and (b) cluster-link-equity routing into the hub. If there IS signal, capture the highest-impression queries as verbatim FAQ leads.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS — this is a correctness fix first, a depth fix second.** Six material errors, each verified against the LOCKED house positions and to be re-verified against legislation.gov.uk at write time per §16.31 / F-37:

1. **Main-pool WDA rate is MISSING and the only WDA figure given is stale-framed.** Body line ("For integral features, the rate is 6% per year on a reducing balance basis") gives ONLY the special-rate pool and omits the main pool entirely. Per §38 [LOCKED 2026-05-30]: main-pool WDA is **14%** (cut from 18% by **FA 2026 s.28**, effective chargeable periods beginning on or after 1 April 2026 CT / 6 April 2026 IT; straddling periods use a hybrid time-apportioned rate per s.28(2)-(6)). Special-rate pool stays **6%** (CAA 2001 s.104D — UNCHANGED). The rewrite must state **14% main pool / 6% special rate**, never 18%.
2. **Entire modern FYA layer is missing.** Page covers AIA only. Per §38 + §25.5: (a) **full expensing** — 100% main-rate FYA, **companies only** (CAA 2001 s.45S), new and unused, permanent; (b) the 50% special-rate FYA companion; (c) the **new 40% FYA** (**FA 2026 s.29**) on main-rate new-and-unused plant, expenditure on or after 1 January 2026, deliberately available to **unincorporated businesses (sole traders, partnerships, individual landlords) and to leasing**, excluding cars / second-hand / overseas-leased assets. Competitor propertytaxservices already covers the 40% FYA — omitting it is a depth + freshness gap.
3. **AIA framed as a year-specific figure.** FAQ #2 ("What is the Annual Investment Allowance (AIA) limit for 2025/26?") frames £1m as a 2025/26 figure. Per §25.3 + §38: £1m is **PERMANENT from 1 April 2023** (**F(No.2)A 2023 s.8**, RA 11 July 2023). The "temporary until 31 March 2026 / reverts to £200,000" framing is stale; the rewrite states the £1m as permanent.
4. **FHL section is thin and the transitional is under-explained.** Abolition date (April 2025) is correct, but the page must cite **FA 2025 Sch 5 Part 3** (NOT FA 2024 Sch 5 — that is museum/gallery exhibitions). Commencement is 1 April 2025 (CT) / 6 April 2025 (IT) per FA 2025 Sch 5 Part 5 para 12. The current "speak to a specialist about transitional rules" line is too thin — the rewrite must walk the **grandfathered-pool roll-forward** (§25.7): pre-abolition FHL P&M pool balances transfer into the ordinary property-business pool and continue to be written down (at 14% main / 6% special), but **no new FHL P&M expenditure qualifies** post-commencement.
5. **s.35 dwelling-house restriction understated.** Page says capital allowances are "generally not available" on standard BTL. Per §38 + §25.1 + §25.2: this must be statute-anchored to **CAA 2001 s.35** (no P&M allowances for plant for use in a dwelling-house within a property business), with the **common-parts carve-out** (communal boiler / lift / lighting in a block) and the **integral-features carve-out** (CAA 2001 s.33A, five categories) in qualifying non-dwelling areas. Pair it with the actual residential route: **Replacement of Domestic Items Relief (ITTOIA 2005 s.311A)**.
6. **s.198 fixtures election is missing; the SBA allowance statement is conflated with it.** The "ask the seller for a capital allowances statement" line conflates the **SBA allowance statement** (CAA 2001 s.270IA — SBA-side, no statement → nil claim) with the **s.198 fixtures election** (CAA 2001 s.198 — the buyer-side make-or-break mechanism on a commercial purchase). Per §25.11 [LOCKED 2026-05-24]: the buyer faces the **two-gate test** — pooling requirement (s.187B; past owner must have pooled or the fixtures are permanently stranded) + fixed-value requirement (s.187A; value FIXED within **2 years** via joint s.198 election, tribunal determination under s.563, or written statements; failure → s.187A(3) treats new expenditure as nil). The rewrite must separate these two mechanisms cleanly and add a worked s.198 buyer-side example.

**Secondary: THIN_DEPTH.** 1,258 words vs ~3,400 target. The page is a thin overview-plus-three-examples; the cluster pillar is 4,918 words and competitor propertytaxservices/PKF/Apex go deeper on the FYA layer and the s.198 mechanism. The lift is to ~3,400 words of MORE worked examples (every section a computation), not more prose.

**Tertiary: INVISIBLE + STRUCTURE.** Likely weak/no GSC signal (generic suffix "-examples"); no rates table; no s.198 worked example; FAQ count 4 vs 12-14 floor; zero authority citations; zero UP/DOWN cluster links. The structural fix (rates table at top + per-section worked computations + cluster hub linking + 12-14 FAQs + authority citations) is what makes this the distinct example hub rather than a fourth competing guide.

**Load-bearing fix sequence (ordered by ROI / consequence):**

1. **Correct the six stale facts** (above). Highest consequence — a tax page asserting "WDA 6%" with no main-pool rate, "AIA temporary 2025/26", missing the 40% FYA, and conflating SBA statements with s.198 elections is reader-misleading. Verify each against legislation.gov.uk at write time per F-37.
2. **Reposition to the worked-example hub.** Cut the generic "What Are Capital Allowances?" overview to a single one-line definition + a forward-link to the pillar. Replace with a short "How to read these examples" framing pointing UP to the pillar (full framework) and DOWN to the mechanics depth pages.
3. **Add a rates/allowances reference table at top** (snippet-bait): main pool 14% WDA / special rate 6% WDA / AIA £1m permanent / full expensing 100% companies-only / 40% FYA unincorporated+leasing / SBA 3%. Every figure cited with its statute (§ spine below).
4. **Expand the worked-example spine to ~6 computations**, each anchored on a concrete number: (a) commercial P&M claim with AIA + main-pool WDA tail; (b) integral-features split with special-rate 6% AND a 50% special-rate FYA company variant; (c) AIA-cap-bites scenario (spend > £1m, excess into the pools at 14%/6%); (d) mixed-use floor-area apportionment (keep + sharpen the s.35 line); (e) grandfathered-FHL pool roll-forward post-April-2025; (f) s.198 buyer-side fixtures claim with numbers + the 2-year deadline + pooling gate.
5. **Add the 40% FYA worked figure for the unincorporated landlord** (the route that replaces full expensing for individuals) — directly answers the competitor-covered freshness gap.
6. **FAQ count 4 → 12-14**, each targeting a specific worked-example or stale-fact question (WDA 14%/6%, AIA permanent £1m, can individuals use full expensing, what is the 40% FYA, s.198 2-year deadline, s.35 dwelling-house bar, common parts, integral features, mixed-use apportionment, grandfathered FHL pool, RDIR vs capital allowances, capital allowances review on a property already owned).
7. **Authority links: 5-7 verified legislation.gov.uk / HMRC citations** (s.21, s.33A, s.35, s.51A, s.56, s.198, s.270AA; FA 2026 s.28 + s.29; FA 2025 Sch 5; ITTOIA 2005 s.311A).
8. **Meta title + description rewrite** leading with the worked-example differentiator + current rates anchor.

---

## Competitor URLs (Stage 2 — verify live at execution per §16.31)

**For execution session — WebFetch each, confirm 200 status + date-stamp; reject + replace any non-200. F-36 carry-forward: if WebFetch permission is denied on a URL, carry forward the prior status note and flag.**

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.propertytaxservices.co.uk/blog/capital-allowances-for-rental-property-clearing-up-landlord-confusion-over-capital-allowances/ | The 40% FYA coverage (this competitor already carries it — match + beat with a worked unincorporated figure); the "clearing up confusion" landlord-confusion framing for the s.35 residential restriction | Likely no s.198 two-gate worked example; likely no AIA-cap-bites computation; we beat on numbers-led depth |
| https://pkf-francisclark.co.uk/insights/capital-allowances-for-property-investors-what-you-can-and-cant-claim-in-2025/ | The "what you can and can't claim" can/can't structure for the integral-features vs building-shell distinction (s.21 List A vs s.33A) | Year-stamped "2025"; check whether it carries the FA 2026 14% WDA cut and the new 40% FYA — if not, we win on freshness |
| https://apexaccountants.tax/how-to-claim-capital-allowances-on-commercial-property-in-the-uk/ | The commercial-purchase claim process framing (pooling + fixtures); good for the s.198 buyer-side section structure | Verify it does not conflate SBA statement with s.198 election (the same error our current page makes); we differentiate by separating them cleanly with the two-gate test |
| https://fhpaccounting.co.uk/capital-allowances-on-property/ | General property-applied framing + the commercial vs residential split | Likely overview-level; we differentiate on the worked-computation hub positioning |

**Competitor depth ceiling for this query class:** general-practice insight pages, mostly prose, light on worked numbers, variable freshness on the FA 2026 14% WDA cut and the 40% FYA. Our ~3,400-word target with 6 worked computations + 12-14 FAQs + 5-7 verified statute citations + clean s.198 two-gate treatment puts us decisively best-in-class, and the §38 freshness (14% WDA + 40% FYA) is a moat where most competitors are still on 18% / pre-FA-2026 framing.

**What to borrow overall:** propertytaxservices' 40% FYA inclusion (freshness parity) + PKF's can/can't structure (clarity).
**What to differentiate against:** none of the four is a numbers-led worked-example HUB that links a whole cluster; that is our distinct position.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed in-place through Batch 2; re-read fresh at execution per §15 gate 3). Cross-track interlock noted at Batch 1 prep #4: Wave 6 Bucket C (capital allowances) ↔ residual AIA cluster (~12 pages). This page sits inside that interlock.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | capital-allowances-examples | REWRITE | self — rewrite in place as the worked-example HUB |
| Cluster pillar (Wave 6) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework (4,918w) | Consolidation anchor | **Designated pillar.** This page links UP to it for the full CAA 2001 decision framework; the pillar forward-links DOWN to this page for the worked examples. No collision — different intent (framework vs numbers). |
| Sibling guide | capital-allowances-on-property (2,031w, "complete guide" intent, 15 GSC impr @ avg pos 61) | Guide | Distinct intent (guide vs worked examples). Drop our generic overview so we stop duplicating its "what are capital allowances" coverage. Cross-link. **Note:** §38 records this page was a DROPPED collapse-into-pillar candidate (pillar has zero ranking equity; collapse guard R6 blocks collapse into unproven target). It stays a live sibling. |
| Sibling guide | landlord-capital-allowances-tax-relief (1,421w) | Guide | Distinct (relief-overview intent). Cross-link; do not duplicate. |
| Sibling guide | capital-allowances-commercial-property-what-can-claim (1,150w) | Guide | Distinct (commercial scope-of-claim). Our commercial WORKED example forward-links here for the scope detail. |
| Sibling guide | capital-allowance-aia-property-landlords (1,456w) | Guide | Distinct (AIA-specific). Our AIA-cap-bites worked example forward-links here. |
| Sibling guide | what-is-aia-in-tax (1,850w) | Definition | Distinct (AIA definition). Cross-link from the AIA example. |
| Mechanics depth | integral-features-capital-allowances | Depth | DOWN-link from the integral-features worked example. |
| Mechanics depth | hmo-common-parts | Depth | DOWN-link from the s.35 common-parts line. |
| Mechanics depth | balancing-allowance | Depth | DOWN-link from any disposal / pool-tail reference. |
| Mechanics depth | commercial-property-fixtures-claim-s198-election | Depth | DOWN-link from the s.198 buyer-side worked example (the canonical s.198 depth page; this hub gives the worked numbers, that page gives the mechanism depth). |
| Mechanics depth | fhl-capital-allowances-post-april-2025-grandfathered-claims | Depth | DOWN-link from the grandfathered-FHL pool roll-forward worked example. |
| Mechanics depth | aia-1m-cap | Depth | DOWN-link from the AIA-cap-bites worked example. |
| Mechanics depth | full-expensing-50-percent-fya | Depth | DOWN-link from the full-expensing / 50% special-rate FYA company variant. |
| Mechanics depth | structures-and-buildings-allowance-sba | Depth | DOWN-link from the SBA reference (kept brief — SBA is not P&M; clarify the boundary, link out). |

**Conclusion:** **REWRITE in place — no REDIRECT-PROPOSED, no FLAG-MANAGER on cannibalisation.** The page's distinctiveness is preserved by (a) dropping the generic overview that duplicates the guide siblings, (b) anchoring every section on a worked computation (the numbers-led intent no sibling owns), and (c) wiring it as the cluster's example hub — UP to the pillar, DOWN to the mechanics depth pages. The collapse guard (R6) and §38's explicit DROP of the `capital-allowances-on-property` collapse confirm the cluster is being kept as distinct pages, not consolidated, so this page must hold its distinct hub role rather than redirect.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page) — the hub wiring is the structural fix:

**UP-link (the consolidation anchor):**
- `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — prominent canonical-style UP-link near the top ("For the full CAA 2001 decision framework, see our complete pillar guide"). The pillar must forward-link back to this hub for the worked examples (reciprocal).

**DOWN-links (mechanics depth — one per worked example):**
- `commercial-property-fixtures-claim-s198-election` — from the s.198 buyer-side worked example
- `integral-features-capital-allowances` — from the integral-features worked example
- `aia-1m-cap` — from the AIA-cap-bites worked example
- `full-expensing-50-percent-fya` — from the full-expensing / 50% FYA company variant
- `fhl-capital-allowances-post-april-2025-grandfathered-claims` — from the grandfathered-FHL pool example
- `hmo-common-parts` — from the s.35 common-parts carve-out line
- `balancing-allowance` — from the disposal / pool-tail reference
- `structures-and-buildings-allowance-sba` — from the SBA-boundary clarification

**SIDE-links (guide siblings, cross-reference not duplicate):**
- `capital-allowances-on-property`, `landlord-capital-allowances-tax-relief`, `capital-allowances-commercial-property-what-can-claim`, `capital-allowance-aia-property-landlords`, `what-is-aia-in-tax`

**Cross-category:**
- `landlord-tax-deductions-uk-2026-complete-list` (RDIR / revenue-vs-capital boundary) — keep existing link
- Incorporation pillar (`buy-to-let-limited-company-complete-guide-uk` or the `/incorporation` route) — from the full-expensing company variant (companies-only relief is an incorporation lever; cross-link, do not over-claim)
- `what-does-a-property-accountant-do` / `how-much-does-a-property-accountant-cost` — keep (service-context, no pricing in body)

---

## House-position references (Stage 1)

Every section number below exists in current `house_positions.md` (verified at brief-drafting 2026-05-30). Cite by `§N.M`; never paraphrase the number.

- **§38 Capital allowances — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified]: the authoritative rate floor. Main pool 14% WDA (FA 2026 s.28, from Apr 2026, hybrid straddling); special rate 6% (s.104D, unchanged); new 40% FYA (FA 2026 s.29, from 1 Jan 2026, unincorporated + leasing, ex-cars/second-hand); full expensing 100% companies-only (s.45S); AIA £1m permanent (F(No.2)A 2023 s.8); SBA 3% (FA 2021 Sch 22 para 7(4)); s.35 dwelling-house bar + common-parts + integral-features carve-outs; cars excluded from AIA and 40% FYA. **Primary lock — the page must match exactly.**
- **§25.1 Qualifying activity (CAA 2001 s.15 + s.270CA)** [LOCKED 2026-05-23]: post-FA-2025 omission of s.15(1)(c)/(da) is the FHL pivot. Use the post-omission framework.
- **§25.2 Plant and machinery (CAA 2001 Part 2, ss.21-204)** [LOCKED 2026-05-23]: s.21 building shell (List A) excluded; s.22 structures (List B) excluded; s.23 List C carve-back; s.33A integral features (special rate); s.198 fixtures election; the four-way distinction (shell / structures / integral features / remaining plant).
- **§25.3 AIA (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23]: £1m permanent from 1 Apr 2023 (s.51A(5) + F(No.2)A 2023 s.8); single allowance per company / related group (s.51E + s.51G); cars excluded; s.35 bars residential.
- **§25.4 SBA (CAA 2001 Part 2A, ss.270AA-270IH)** [LOCKED 2026-05-23]: 3% straight-line, 29-Oct-2018 gate, allowance statement requirement (s.270IA — distinct from s.198), residential exclusion (s.270CF), s.37B TCGA add-back. Keep SBA treatment brief + boundary-clarified (SBA is not P&M).
- **§25.5 First-Year Allowances (CAA 2001 ss.39-51)** [LOCKED 2026-05-23]: full expensing s.45S (companies only, 100% main-rate, permanent); 50% special-rate FYA companion; s.45D zero-emission cars FYA; s.46 general exclusions (leasing carve-out).
- **§25.6 Disposal mechanics (CAA 2001 ss.55-67 + s.61)** [LOCKED 2026-05-23]: pool concept (main 14% / special 6%); balancing charge where TDR > AQE; s.196 seller-side fixtures Table (companion to s.198).
- **§25.7 FHL transitional (FA 2025 Sch 5)** [LOCKED 2026-05-23]: FA 2025 Sch 5 Part 3 (NOT FA 2024 Sch 5); commencement 1 Apr 2025 CT / 6 Apr 2025 IT; grandfathered-pool roll-forward; no new FHL P&M qualifies post-commencement.
- **§25.11 s.198 fixtures election — purchase-side depth (CAA 2001 s.187A/s.187B/s.198/s.199/s.201/s.563)** [LOCKED 2026-05-24]: the two-gate test (pooling s.187B + fixed-value s.187A); 2-year deadline (s.201(1)); s.198(3) maximum apportioned amount; failure → s.187A(3) nil treatment; tribunal route s.563.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only; no FHL-as-still-alive framing.
- **§25.10 + §25.12 Do-not-write (CAA-specific)** [LOCKED]: never "AIA £200k", never "AIA temporary", never "full expensing for individuals", never "super-deduction is current", never "SBA 2%", never "FHL still a separate qualifying activity", never "FHL abolition is FA 2024 Sch 5", never "buyer can claim fixtures without a s.198 election", never "s.198 applies to residential fixtures".

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts — this is the load-bearing pre-rewrite work. Six published statements contradict the LOCKED house positions:**

1. **STALE_FACTS — main-pool WDA missing + special-rate-only framing.** Body line "For integral features, the rate is 6% per year on a reducing balance basis" gives no main-pool rate. Contradicts §38 (main pool 14% from Apr 2026; never assert 18%). **First job.**
2. **STALE_FACTS — AIA framed as 2025/26-specific.** FAQ #2 frames £1m as a 2025/26 figure. Contradicts §25.3 / §38 (permanent from 1 Apr 2023, F(No.2)A 2023 s.8). On the §25.10 do-not-write list.
3. **INCOMPLETE — modern FYA layer absent.** No full expensing (s.45S) and no 40% FYA (FA 2026 s.29). Contradicts §38 + §25.5 (and the competitor already covers the 40% FYA).
4. **THIN — FHL transitional under-explained + citation risk.** "Speak to a specialist about transitional rules" is too thin; must cite FA 2025 Sch 5 Part 3 and walk the grandfathered-pool roll-forward per §25.7. (Risk: a sub-agent could mis-cite FA 2024 Sch 5 — explicitly on the §25.10 do-not-write list.)
5. **UNDERSTATED — s.35 dwelling-house bar.** "Generally not available" is not statute-anchored. Contradicts §38 + §25.1/§25.2 framing (cite CAA 2001 s.35; common-parts + integral-features carve-outs; pair with ITTOIA 2005 s.311A RDIR).
6. **CONFLATION — SBA allowance statement vs s.198 fixtures election.** "Ask the seller for a capital allowances statement" conflates s.270IA (SBA) with s.198 (fixtures). Contradicts §25.4 vs §25.11 boundary; on the §25.12 do-not-write list ("buyer can claim allowances on fixtures without a s.198 election").

**Also correct (not a hard conflict, but sharpen):** the "19% to 25%" CT range in FAQ #4 should be framed as the 2026/27 **25% main rate / 19% small-profits rate / marginal relief band** (per the §31/small-profits framing surfaced repeatedly in Batch 2 F-31), not a vague range.

**NO PRICING LEAK (Decision E clear):** the worked tax-saving figures (£30,000 saved, £2,600 saved) are legitimate computation OUTPUTS, not fee/price quotes; there are no soft fee-range comparisons. Keep and expand them. **NO real client names** ("Sarah"/"James" are illustrative personas — acceptable). **NO em-dashes** present in current copy — keep it that way.

**Execution session MUST**, per §16.31 / F-37 (the 13-consecutive Bill-vs-enacted catch pattern):
- Re-verify **FA 2026 (c.11) Royal Assent 18 March 2026 = ENACTED** at legislation.gov.uk before asserting 14% WDA / 40% FYA as current law (§38 confirms enacted; verify the annotation on CAA 2001 s.56 still reads "substituted ... by Finance Act 2026 (c. 11), s. 28(1)", and confirm the s.29 40% FYA commencement).
- Verify every cited section is the operative current text (the F-8 / TCGA s.4 "URL live but wording removed by later amendment" failure mode applies to CAA sections too — e.g. confirm s.56 reads 14%, s.51A(5) reads £1,000,000).

Flag to `track2_site_wide_flags.md` (next free F-number at execution) as a **HIGH-severity STALE_FACTS** entry: *capital-allowances-examples — six published statements contradict LOCKED §38/§25 (missing 14% main-pool WDA; AIA framed 2025/26-temporary; FYA layer absent incl. FA 2026 s.29 40% FYA; FHL transitional thin; s.35 understated; SBA statement conflated with s.198 election). Part of the ~15-page CAA cluster anchored to §38; same stale-WDA pattern likely site-wide — feeds the §38 back-patch sweep.*

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31)

Session selects 5-7 to actually cite in body. Verify each resolves AND that the section's operative wording is current (F-8 amendment-removal failure mode).

| URL | Use case |
|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | s.35 dwelling-house restriction (the residential bar) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/33A | s.33A integral features (five categories, special rate 6%) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | s.56 main-pool WDA — confirm it now reads **14%**, annotated "substituted by Finance Act 2026 (c. 11), s. 28(1)" |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | s.51A(5) AIA maximum — confirm **£1,000,000** (permanent) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | s.45S full expensing (companies only, post-1-Apr-2023) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/198 | s.198 fixtures election (buyer-side) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/187A | s.187A fixed-value requirement (the s.198 gate; nil treatment on failure) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270AA | s.270AA SBA (3%, 29-Oct-2018 gate) — for the SBA-boundary clarification |
| FA 2026 (c.11) s.28 + s.29 — verify exact legislation.gov.uk path at execution | FA 2026 s.28 (14% WDA cut) + s.29 (new 40% FYA); cite as ENACTED 18 March 2026 |
| https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 | FA 2025 Sch 5 (FHL abolition — Part 3 capital allowances; NOT FA 2024 Sch 5) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | ITTOIA 2005 s.311A Replacement of Domestic Items Relief (the residential route) |
| https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual | HMRC CA Manual (CA21000+ P&M; CA22000+ integral features; CA23000+ AIA; CA26450+ s.198; CA90000+ SBA) — verify exact paths, do not guess section numbers (PIM4101-style hallucination risk) |

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules (`NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5`), lead-gen architecture, CSS-in-markdown (semantic HTML only, no Tailwind classes), FAQs-and-schema (frontmatter `faqs:` array → auto-emitted FAQPage; never hand-add FAQ schema in body), anti-templating, six-check quality bar, statute-citation discipline (F-8: live URL ≠ live wording), and all §16 lessons (esp. §16.18 reasoning-first, §16.31 URL liveness, §16.22/§16.27/§16.30/§16.33/§16.40+ + F-37 Bill-vs-enacted-Act discipline).

**Critical for THIS brief:** NO em-dashes (use commas, parentheses, full stops, middle dots). NO pricing / fee numbers — the £30k / £2,600 worked tax-SAVINGS are computation outputs and stay; any fee/charge figure must not appear. NO real client names (personas only). LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; use 1-3 inline `<aside>` CTAs at conversion moments (after the commercial worked example; after the s.198 buyer-side example). Body must be raw HTML (`<p>`, `<h2>`, `<ul>`), never markdown syntax (per memory `blog_page_rendering_html_in_frontmatter`).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow from `NETNEW_PROGRAM.md §7` + the gold-reference workflow in the trial brief. Track 2 deltas (Step 9 rewrite-in-place; Step 12 confirm-no-redirect; Step 13 update-existing-or-insert `monitored_pages`). Brief-specific notes:

1. Read `house_positions.md` **§38, §25.1-§25.7, §25.11, §13** in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / phase3_in_progress at execution).
3. Read this brief end-to-end.
4. **Verify FA 2026 (c.11) ENACTED status + the 14% WDA (s.28) + 40% FYA (s.29) + AIA £1m (s.51A) + s.198/s.187A operative wording against legislation.gov.uk.** This is the load-bearing pre-rewrite verification step (F-37).
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx with proper User-Agent); F-36 carry-forward on any permission denial.
6. Read the current `capital-allowances-examples.md` source in full + the cluster pillar + the 8 mechanics depth DOWN-link targets (for accurate cross-linking and to avoid duplicating their depth).
7. Plan rewrite outline: ~11-13 H2s, ~3,400 body words, 12-14 FAQs, rates/allowances table at top, 6 worked computations.
8. **Rewrite markdown at existing path** (NOT a new file). Preserve frontmatter slug + canonical + category + image; update `dateModified` + `sourcesVerifiedAt` to execution date; populate `sourceDomains` with the verified competitor/authority domains. Rewrite metaTitle (lead with worked-example differentiator + rates anchor) + metaDescription (named computation promise + current 14% WDA / £1m AIA anchor + free-call hook).
9. Run site build: `cd Property/web && npm run build`. Must pass.
10. Run six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve; **plus a stale-fact check: grep for "18%" near WDA, "200,000" near AIA, "2025/26" framing of AIA, "FA 2024 Sch 5" — all should be absent.**
11. Confirm no redirect needed (none — slug kept; this is the intentional worked-example hub).
12. Update `monitored_pages` Supabase row (insert if not tracked; if INVISIBLE-baseline per Stage 2 pull, use the 180-day window per F-11; rewrite_type = `rewrite`).
13. Commit on `main`: `git commit -m "Track 2: rewrite capital-allowances-examples (FA 2026 stale-fact fix + worked-example hub repositioning)"`.
14. Update `track2_page_tracker.md`: mark ✅ executed (main repo file, absolute path, never a branch commit).
15. Append discoveries + the HIGH STALE_FACTS flag to `track2_site_wide_flags.md`.
16. Update `TRACK2_PROGRAM.md §3 heartbeat.
17. Log discoveries for inter-batch awareness (esp. the site-wide stale-WDA pattern feeding the §38 back-patch sweep).
18. Deploy per `deploy-and-index.ps1 -Site property -QaBatch <name>` on explicit user authorisation (no auto-deploy).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §38 main pool 14% WDA (FA 2026 s.28) + special rate 6%: __
- §38 + §25.5 FYA layer (s.45S full expensing companies-only + 50% special-rate FYA + FA 2026 s.29 40% FYA unincorporated/leasing): __
- §25.3 AIA £1m PERMANENT (F(No.2)A 2023 s.8) — not "2025/26": __
- §25.1 + §25.7 FHL grandfathered-pool roll-forward (FA 2025 Sch 5 Part 3 — NOT FA 2024): __
- §25.1/§25.2 + §38 s.35 dwelling-house bar + common-parts + integral-features carve-outs; ITTOIA 2005 s.311A RDIR pair: __
- §25.11 s.198 two-gate (pooling s.187B + fixed-value s.187A) + 2-year deadline (s.201) — separated from SBA s.270IA statement: __
- CT framing: 25% main / 19% small-profits / marginal relief (not "19% to 25%" range): __
- FA 2026 enacted-status re-verified at write time (F-37): __

### Comparison: before vs after
- Word count: 1,258 → __ (target ~3,400)
- H2 count: 9 → __
- FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 5-7)
- Inline CTAs: 0 → __ (target 1-3)
- Worked examples: 3 → __ (target 6)
- Rates/allowances table at top: 0 → __ (1 expected)
- UP-link to pillar: 0 → __ (1 prominent)
- DOWN-links to mechanics depth pages: 0 → __ (target 6-8)

### Flags raised
- HIGH STALE_FACTS (carried from brief — six §38/§25 contradictions): confirmed fixed __
- Site-wide stale-WDA pattern feeding §38 back-patch sweep: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
