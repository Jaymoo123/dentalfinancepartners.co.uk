# Track 2 brief: writing-down-allowance-cars

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (Batch 4, capital-allowances cluster)
**Source markdown path:** `Property/web/content/blog/writing-down-allowance-cars.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/writing-down-allowance-cars
**Stage 1 priority:** M-H — uniquely owns the car-specific capital-allowance query universe (sole property page taking car-allowance impressions: 11 aggregated), and the live page carries MATERIAL WRONG ADVICE that misleads on a tax-compliance question. Correctness-fix priority elevates this above raw impression volume.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (statute spine re-verified against legislation.gov.uk + gov.uk official measure + HMRC CA manual at brief-drafting time)
**Cannibalisation status:** REWRITE in place (deterministic equity guard would correctly REJECT any collapse — see §"Cannibalisation universe check")

> **Diagnosis carried in:** `{"decision":"rewrite","gap_modes":["STALE_FACTS","WRONG_ADVICE","INVISIBLE","THIN_DEPTH","CTR_FAIL"],"primary_query":"capital allowances on cars / writing down allowance cars","current_word_count":1574,"target_word_count":3200}`. This brief expands that diagnosis into an execution-ready plan at the depth of the gold-reference (`briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `writing-down-allowance-cars`. The slug is the exact-match owner of the car-specific capital-allowance intent ("capital allowances on cars", "car capital allowance", "writing down allowance cars"). No redirect. A 301 here would point a unique-intent page that owns the only car-allowance impressions into a non-competing page that receives zero — reversing the equity gradient and destroying the query universe. Slug stays.
- **Category:** kept as `Section 24 & Tax Relief` (canonical path `/blog/section-24-and-tax-relief/writing-down-allowance-cars`). NOTE: the capital-allowances cluster siblings sit under `Property Types & Specialist Tax` (rates sibling + pillar). The car page is historically filed under S24 & Tax Relief, and the canonical already resolves there. **Do NOT change the category or canonical** — changing the slug path would orphan the indexed URL and forfeit the 11 owned impressions. Keep the existing canonical exactly; the cluster cross-links bridge the two categories.
- **Gap-mode tag (multi):** `WRONG-ADVICE` (PRIMARY — material, must correct first) + `STALE-FACTS` (the 18%→14% / 40% FYA / ZEV framing is out of date as of the FA 2026 enactment) + `DEPTH` (1,574 → ~3,200 words; competitor + property-relevance depth missing) + `CTR-FAIL` (template-generic meta; INVISIBLE on most car-allowance queries despite owning the intent) + `STRUCTURE` (4 FAQs, no rates/CO2-band table at top, one dead/insecure citation).
- **"Why this rewrite" angle:** This is not a CTR-led rewrite like Birmingham, nor an intent-mismatch rewrite like the CGT-rates gold reference. It is a **correctness-led rewrite**. The live page gives readers advice that is wrong in two ways that change the tax outcome: (1) it tells readers that cars at 50g/km or less get a "100% first-year allowance then 18%" (line 56 + frontmatter FAQ) — they do NOT; only NEW + unused ZERO-emission cars (0 g/km) get the 100% FYA, and 1-50 g/km cars go straight to the MAIN POOL at 14% WDA with no FYA at all; (2) it frames the new 40% FYA (from 1 January 2026) as an incentive for car buyers (lines 21/62/FAQ) when the gov.uk measure EXPLICITLY EXCLUDES cars. A property investor reading the live page could buy a 45 g/km hybrid expecting a full first-year write-off, get an 14% reducing-balance deduction instead, and overstate their relief on a return. Fixing wrong advice is the load-bearing job; the depth and meta lift ride on top of it.

---

## Current page snapshot (Stage 2 — filesystem read 2026-05-30)

**Frontmatter:**
- `title` / `h1`: "Writing Down Allowance on Cars: A Guide for UK Property Investors"
- `metaTitle`: "Writing Down Allowance Cars: UK Property Investor Guide" (54 chars — OK length, template-generic, no differentiator, no year, no CO2 hook)
- `metaDescription`: "Learn how writing down allowance on cars works for UK property investors. Rates, electric car rules, and claiming capital allowances explained." (141 chars — generic; no specific number, no correctness hook)
- `faqs:` array length = **4** (target 12-14)
- `category`: "Section 24 & Tax Relief"
- `date` / `dateModified` / `sourcesVerifiedAt`: all `2026-05-20`
- `sourceDomains`: accaglobal.com, **aka.hmrc.gov.uk** (dead/insecure host — see ref [3] below), gov.uk, icaew.com

**Body (read in full):**
- **Word count:** ~1,574 body words (frontmatter-excluded; `wc -w` of full file = 2,074 incl. frontmatter + sources).
- **11 H2 sections:** What Is WDA on Cars / How Does WDA Work / Current WDA Rates for Cars / Major Changes From April 2026 / WDA vs AIA / Claiming WDA as a Property Investor / Electric Cars and WDA / Practical Example / Common Mistakes / WDA and Section 24 / MTD and Car Allowances / Summary.
- **2 worked examples** (both currently OK in arithmetic but BUILT ON WRONG RATE FRAMING — see below).
- **Outbound authority links:** 5 numbered refs, but ref [3] = `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` (HTTP not HTTPS, dead legacy host, mislabelled as "Overview"). One dead+insecure citation = correctness + trust failure.
- **Internal links:** 5 (landlord-tax-deductions, buy-to-let-limited-company-complete-guide-uk, section-24 complete guide, /incorporation, /services, /contact, MTD page) — none to the capital-allowances pillar or the WDA-rates sibling.
- **Schema:** FAQPage auto-emitted from frontmatter (4 Q&A).
- **No rates/CO2-band table** at top (snippet-bait gap).
- **Pricing leak check:** CLEAN. The only `£` figures are asset values and WDA amounts inside worked examples (£20,000 car, £3,600 WDA, etc.) — these are illustrative arithmetic, NOT fees or service pricing. No fee ranges, no soft "general-market £800-£1,500" comparisons. Lead-gen handoff model intact. Keep it that way.

**Confirmed factual errors on the live page (the rewrite's first job):**

| # | Live page location | What it says | Correct position (verified 2026-05-30) | Severity |
|---|---|---|---|---|
| E1 | Body line 56 + frontmatter FAQ #1 | Cars at 50g/km or less get "100% first-year allowance then 18%" | WRONG. Only NEW + unused ZERO-emission cars (0 g/km) get the 100% FYA (CAA 2001 s.45D). Cars at 1-50 g/km get NO FYA — they go straight to the MAIN POOL and are written down at the main rate (now 14%). | **WRONG-ADVICE (HIGH)** |
| E2 | Body lines 21/62 + FAQ #3 | New 40% FYA (from 1 Jan 2026) is relevant to car buyers / "preserve incentives to invest" framing applied to cars | WRONG. gov.uk official measure: "Cars will also be excluded from the scope of the new FYA." Must be stated as an EXCLUSION, not an incentive. | **WRONG-ADVICE (HIGH)** |
| E3 | Throughout (lines 17, 51, 56, 61, 80, 98, 115) | 18%→14% treated as a FUTURE "from April 2026" change | STALE. 14% is now the CURRENT main rate (1 Apr 2026 CT / 6 Apr 2026 IT, enacted FA 2026). 18% is now only the pre-April-2026 / brought-forward-balance rate, plus the hybrid rate for straddling periods. | **STALE-FACTS (HIGH)** |
| E4 | Body line 68 + FAQ implied | "cars are generally excluded from AIA unless they are zero-emission vehicles" | WRONG. ALL cars are excluded from AIA (CAA 2001 s.38B General Exclusion 2; car defined s.268A). Zero-emission cars get the FYA (s.45D), they do NOT get AIA. The "unless ZEV" carve-out is a misconception (§25.10 do-not-write list). | **WRONG-ADVICE (MEDIUM)** |
| E5 | Ref [3] | `http://aka.hmrc.gov.uk/.../water.htm` | Dead, insecure (HTTP), mislabelled. Replace with live https gov.uk / legislation.gov.uk URL. | **CITATION (MEDIUM)** |
| E6 | Worked example (line 85) + FAQ | Petrol car at 120g/km "special rate pool at 6%" | The 6% special rate is CORRECT and UNCHANGED for cars per gov.uk ("This measure does not change the WDA on the special rate pool which is currently 6%"). RETAIN the 6%. But re-base the main-pool worked examples on 14%, not 18%. | RETAIN 6% / re-base main-pool examples |

---

## GSC angle (last 90 days) — diagnosis-supplied + Stage 2 reasoning

**Aggregate (carried from diagnosis, GSC-derived):** ~11 impressions aggregated to this URL across the car-allowance query set ("capital allowances on cars", "car capital allowance", "writing down allowance cars"). This page is the **SOLE property page** receiving those impressions. Low absolute volume, but a clean, uncontested intent ownership.

**Sibling contrast (proves distinctiveness):**
- `writing-down-allowance-rates` (general P&M WDA rates): 19 impr / avg pos 28.6 / 0 clicks — generic "writing down allowances / wda calculation" queries, NOT car-specific.
- `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`: ZERO impressions in the sibling pull; mentions cars only inside one FAQ (the four-axis framework, not a car explainer).

**Gap-mode read from GSC:** the page is INVISIBLE on most car-allowance queries (low impression count at the page level despite owning the intent — likely buried below gov.uk + accountancy-firm explainers). The CTR-fail factor is real but secondary to the correctness problem; with so few impressions, the realistic post-rewrite target is **modest (capture the car-allowance intent durably + start ranking the long-tail "company car capital allowances landlord" / "electric car writing down allowance property" queries the depth lift will earn), NOT a 10x click multiplier.** This is a DEPTH + CORRECTNESS play that should also lift impressions as the page becomes the best car-specific answer.

**Execution note:** re-pull `gsc_query_data` for this slug at execution (the diagnosis count is a point-in-time aggregate); confirm no new sibling has started competing for the car-allowance queries since 2026-05-30.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 verification)

**Primary: WRONG-ADVICE.** Two HIGH-severity errors (E1, E2) plus one MEDIUM (E4) actively mislead a reader making a real purchase decision. A landlord could read the live page, buy a 45 g/km plug-in hybrid believing they get a 100% first-year write-off, and instead receive a 14% reducing-balance deduction — overstating year-one relief by an order of magnitude and risking an inaccurate return. This is the load-bearing fix. The deterministic-floor principle (§16.T1) applies: every rate, threshold, and statutory claim in the rewrite must be checked against the verified spine in this brief (legislation.gov.uk + gov.uk measure), never asserted from the writer's prior.

**Secondary: STALE-FACTS.** The entire page is written in a pre-FA-2026 "April 2026 is coming" tense (E3). FA 2026 (c.11) received Royal Assent 18 March 2026 (F-37 lock; 13 consecutive Bill-vs-enacted catches across the program — this one is PASS/enacted, NOT a hedge). 14% is CURRENT. The rewrite must flip the tense: 14% is the rate you claim now; 18% is the historic rate that still applies to balances brought forward and inside the hybrid rate for straddling periods.

**Tertiary: DEPTH.** 1,574 → ~3,200 words. Competitor ceiling for this query class is ~1,500-2,500 words, 0 statute citations, 0-2 FAQs (see §"Competitor URLs"). The depth differentiators that make us best-in-class AND property-relevant: the full 0 / 1-50 / >50 g/km CO2-band → pool mapping; the s.45D zero-emission FYA with second-hand-electric carve-out; double-cab pickups now treated as cars from April 2025 (losing AIA + full expensing); the s.35 dwelling-house restriction framed correctly (the car is a separate business asset, NOT plant in a dwelling — common confusion to defuse); private-use apportionment + mileage records + the single-asset-pool consequence of private use; cash-basis interaction; company vs individual treatment (full expensing s.45S does NOT apply to cars; company-car BIK note as a forward-link, out of scope here).

**Quaternary: CTR-FAIL / INVISIBLE + STRUCTURE.** Generic meta, no CO2-band table at top, 4 FAQs, one dead citation. Fix with a CO2-band-table-at-top (snippet bait), 12-14 FAQs each targeting a real car-allowance query verbatim, a year + correctness-hook meta, and 4-6 verified authority citations.

**Load-bearing fix sequence (ordered by ROI):**
1. **Correct E1 + E2 + E4** (the wrong advice) — non-negotiable, first.
2. **Flip the tense on E3** — 14% is current; 18% is historic/brought-forward/hybrid.
3. **Add the CO2-band → pool table at top** (snippet bait + the single clearest correction of the live page's confusion).
4. **Body lift to ~3,200 words** with the depth differentiators above.
5. **FAQ 4 → 12-14**, each targeting a verbatim car-allowance query.
6. **Replace dead ref [3]** + add 4-6 verified authority links (statute spine below).
7. **Meta rewrite** — lead with the year + the corrected mechanic (CO2 bands / 14% / electric-car FYA).
8. **Add 1-2 inline `<aside>` CTAs** at conversion moments (after the worked examples; after the private-use / company-vs-individual section).

---

## Competitor URLs (Stage 2 — to re-verify live at execution per §16.31)

The diagnosis supplied four competitor targets. All should be re-fetched (200-check + date-stamp) at execution; status notes below are the planning read.

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/capital-allowances/business-cars | Authority / source-of-truth (verified live 2026-05-30) | The clean 0 g/km → 100% FYA / ≤50 g/km → main pool / >50 g/km → special rate band structure. Cross-LINK to it (controlled link-out, same play as the CGT gold reference uses for gov.uk). | gov.uk gives the bands but NO worked examples, NO property-business framing, NO s.35 / dwelling-house nuance, NO double-cab-pickup detail, NO private-use single-asset-pool mechanics. These are our differentiators. |
| https://www.theaccountancy.co.uk/expenses/vehicles/your-guide-to-capital-allowances-for-cars-281138.html | Competitor explainer | General "guide to capital allowances for cars" structure; consumer-readable tone. | Re-verify it is up to date on 14% + the 40%-FYA car exclusion; many third-party guides still carry the 18% rate and the wrong "≤50g/km = FYA" framing the live page has. Beat on currency + property relevance. |
| https://lanop.co.uk/capital-allowances-on-cars-uk-businesses-tax-guide/ | Competitor explainer | Business-buyer framing, FYA + pool walkthrough. | Likely general-business not property-specific; no landlord / s.35 / portfolio-vehicle framing. Differentiate on property-investor application. |
| https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances | Authority / the 40%-FYA + 14% measure (verified live 2026-05-30) | The exact exclusion wording ("Cars will also be excluded from the scope of the new FYA") + the hybrid-rate-for-straddling-period rule + "does not change the WDA on the special rate pool which is currently 6%". CITE this for E2 + E3 + E6. | This is the measure document; we add the property-investor application + worked examples it does not have. |

**Competitor depth ceiling for this query class:** ~1,500-2,500 words, 0 statute citations, 0-2 FAQs, 1 generic worked example, and (critically) MANY are STALE on the 14% rate and the 40%-FYA car-exclusion. Our ~3,200-word target with 12-14 FAQs + 4-5 worked examples re-based on 14% + 6-section CO2-band table + 4-6 verified statute citations + property-business framing puts us **decisively best-in-class AND more current than the competition** — not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index:** consult `docs/property/track2_cannib_index_2026-05-23.md` (refresh §4 at batch start per §7). The capital-allowances cluster was largely built by Wave 6 (Session C) + Wave 7; this brief sits in Batch 4 of Track 2A.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | **writing-down-allowance-cars** | REWRITE | self — rewrite in place. Uniquely owns the car-specific car-allowance intent (11 impr; sole property page). |
| Sibling (residual) | writing-down-allowance-rates | DISTINCT intent | General P&M WDA rates (main pool / special rate / AIA comparison). WEAKER (19 impr / pos 28.6 / 0 clicks) and NON-car-specific. **NO collision.** Reciprocal link. **⚠ This sibling carries a likely factual ERROR — see house-position conflict flag F-A below (asserts special rate dropped to 4%).** Flag, do not fix from this brief. |
| Pillar (Wave 6/7) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | Pillar | Four-axis "who claims / what property / what spend / which vehicle" framework. ZERO car-allowance impressions; mentions cars in one FAQ only. **NO collision.** Forward-link cars to the pillar's framework; the pillar back-links the car detail here. Defer the four-axis framework TO the pillar (do not duplicate it here). |
| Cluster sibling | landlord-capital-allowances-tax-relief | General landlord CA relief | NO collision (general, not car-specific). Cross-link. |
| Cluster sibling | aia-capital-allowance-property-landlords / aia-capital-allowances / annual-investment-allowance-* | AIA depth | NO collision. This page references that cars are AIA-EXCLUDED (s.38B) and forward-links AIA depth elsewhere; does NOT duplicate AIA mechanics. |
| Cluster sibling | full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 | Full expensing s.45S | NO collision. This page notes full expensing does NOT apply to cars (and is company-only); forward-links the full-expensing page for the non-car case. |
| Cluster sibling | capital-allowances-on-vans / capital-allowances-second-hand-vans | Vans (goods vehicles) | NO collision (vans = goods vehicles, s.45DA territory, NOT cars). **Useful contrast link** — the double-cab-pickup section explains why a 1-tonne+ DCPU is now treated as a CAR not a van. |
| Cluster sibling | integral-features-capital-allowances / structures-and-buildings-allowance-sba-3-percent-* | Integral features / SBA | NO collision. Out of scope (not vehicles). |
| Sibling (cars adjacent) | balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics | Disposal mechanics | NO collision; cross-link for the disposal/balancing-charge consequence when a car is sold or moves to private use (single-asset pool crystallisation per s.55/s.61). |

**Collapse-direction check (deterministic equity guard, §16.T2):** a 301 from this page would point a UNIQUE-intent page that owns the only 11 car-allowance impressions INTO a non-competing page (rates sibling = 0 car-allowance impr; pillar = 0 impr). That REVERSES the equity gradient (stronger-on-this-intent → weaker-on-this-intent) and destroys the only equity for the car-allowance query universe. `scripts/track2_collapse_guard.py` would (correctly) REJECT any collapse here. **Decision is firmly REWRITE in place.**

**Conclusion:** REWRITE. No REDIRECT-PROPOSED. One FLAG-MANAGER item: the rates sibling's special-rate-4% error (F-A below, separate page, do not back-patch from this brief).

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page). Verify each path resolves at execution.

- **Pillar (up-link):** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — forward-link from the intro + the "which vehicle" / framework moment; defer the four-axis framework to it. Add reciprocal back-link request to the pillar (manager-tracked; do not edit the pillar from this brief).
- **WDA rates sibling (lateral):** `writing-down-allowance-rates` — link from the "main rate vs special rate" section as the general-P&M companion; this page is the CAR-specific one. (Sibling carries the 4% error — F-A; link to it but the rewrite must state the CAR special rate as 6% explicitly so the reader is not confused if they click through.)
- **Landlord deductions (lateral):** `landlord-tax-deductions-uk-2026-complete-list` (rewritten; `dateModified` 2026-05-30) — the live page already links here; keep + tighten as the "full allowable-deductions context" link.
- **AIA cluster:** `aia-capital-allowance-property-landlords` (or `annual-investment-allowance-landlords-uk`) — forward-link from the "cars are excluded from AIA (s.38B)" point.
- **Full expensing:** `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — forward-link from the "full expensing does not apply to cars / company-only" point.
- **Vans contrast:** `capital-allowances-on-vans` — forward-link from the double-cab-pickup section (DCPU treated as car, not van/goods vehicle).
- **Disposal mechanics:** `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` — forward-link from the disposal / private-use single-asset-pool crystallisation point.
- **Section 24:** `section-24-tax-relief-complete-guide` (or the rewritten `claim-mortgage-interest-rental-property-uk-section-24`) — the live page already links S24; keep the "capital allowances are not restricted by S24" point with a forward-link.
- **Incorporation / company structures:** `buy-to-let-limited-company-complete-guide-uk` (rewritten) — forward-link from the company-vs-individual treatment section.
- **MTD:** `making-tax-digital-landlords-april-2026-deadline` — keep the digital-records forward-link.
- **Service page:** `/services` + `/contact` — keep (lead-gen), but route conversion through the LeadForm (auto-injected) + 1-2 inline `<aside>` CTAs; do NOT add pricing.

---

## House-position references (Stage 1)

All from `house_positions.md` §25 (Capital allowances for property businesses, CAA 2001 — Wave 6 extension, LOCKED 2026-05-23) unless noted. Cite the §N.M number, never paraphrase the lock.

- **§25.1 [LOCKED 2026-05-23]** — Qualifying activity (CAA 2001 s.15 + s.270CA). Frame: a car is a separate business asset of a qualifying activity (UK property business); the car is NOT "plant in a dwelling" — the s.35 dwelling-house restriction does NOT bite on the car itself. Surface this to defuse the common confusion.
- **§25.2 [LOCKED 2026-05-23]** — Plant and machinery allowances; **s.35 dwelling-house restriction**. Frame correctly: s.35 bars P&M *inside a dwelling-house*, but a business car used to run the property business is not plant in a dwelling, so the car can qualify even for an ordinary residential landlord (subject to qualifying activity + business-use apportionment). Do NOT over-claim: the standard P&M-in-dwelling bar still applies to fixtures inside the let property.
- **§25.3 [LOCKED 2026-05-23]** — AIA (ss.51A-51N). Cars are EXCLUDED from AIA. **§25.10 do-not-write:** "Cars are AIA-qualifying" is false; separate FYA mechanism at s.45D for low-emission cars. Corrects live-page E4.
- **§25.5 [LOCKED 2026-05-23]** — First-Year Allowances (ss.39-51). **s.45D low-CO2 cars FYA**: HP lock records the current test as **zero g/km** (the FA 2021 reduction; pre-1-April-2025 threshold was 50 g/km). Sunset **31 March 2027 (CT) / 5 April 2027 (IT)**, Treasury-extendable. **s.45S full expensing is company-only and does NOT apply to cars** (s.46 excludes cars from the general FYA route). This is the spine for E1.
- **§25.6 [LOCKED 2026-05-23]** — Disposal mechanics (ss.55-67 + s.61). **Pool concept:** main pool (now 14% WDA), special-rate pool (6% WDA), single-asset pools (cars with private use / cars over emissions threshold per the historic single-asset-pool treatment). Disposal / move-to-private-use → disposal value → balancing allowance or charge. Spine for the private-use + disposal section.
- **§25.8 / §25.9 [LOCKED 2026-05-23]** — Recent reforms + citations. **EV-related FYAs (s.45D cars, s.45DA goods vehicles, s.45EA charging points) all in force with 31 Mar 2027 / 5 Apr 2027 sunsets.** Citation list anchor.
- **§7 [LOCKED — verify enacted status at write; F-37 resolved ENACTED]** — FA 2026 enacted (Royal Assent 18 March 2026). The 14% main rate is CURRENT, not "upcoming". Assert as current with FA 2026 citation; do NOT hedge as Bill-form (F-37 PASS — the 13th consecutive Bill-vs-enacted catch resolved enacted).

> **NOTE for execution:** §25 was locked 2026-05-23, BEFORE the FA 2026 main-rate change to 14% was on the radar in §25 (§25.6 in the lock says "main pool (18% WDA)"). The 14% rate is established by §7 (FA 2026 enacted) + the gov.uk measure verified in this brief. There is NO conflict — §25.6's "18%" was the rate at lock date; the FA 2026 14% supersedes it from 1/6 April 2026. Flag F-B below recommends the Wave-N manager update §25.6's headline rate to 14% (current) / 18% (brought-forward + hybrid). Track 2 cannot edit house_positions; flag only.

---

## House-position conflict flag (Stage 2)

**F-A | 2026-05-30 | MEDIUM | writing-down-allowance-rates (SIBLING, not this page) | STALE/WRONG-FACTS | Special-rate-pool 4% assertion.** The sibling `writing-down-allowance-rates.md` asserts (frontmatter line 9/13, body lines 39/55) that the special rate pool dropped from 6% to 4% from April 2026. The gov.uk official measure (verified 2026-05-30) states: **"This measure does not change the WDA on the special rate pool which is currently 6%."** The sibling is also internally contradictory (line 55 says special rate is 6% then 4%; line 57 says main rate "remains at 18% for 2026/27"). For CARS, the special rate is **6%, unchanged** — this brief keeps 6%. **Action:** raise F-A in `track2_site_wide_flags.md`; the sibling rewrite (separate brief) corrects the 4% error. Do NOT back-patch the sibling from this brief (scope discipline).

**F-B | 2026-05-30 | LOW | house_positions.md §25.6 | RATE-CURRENCY | §25.6 headline "main pool (18% WDA)".** §25.6 was locked 2026-05-23 stating "main pool (18% WDA)". FA 2026 reduced the main rate to 14% (1 Apr 2026 CT / 6 Apr 2026 IT). No conflict (lock predates the change-effective tense), but the Wave-N HP manager should refresh §25.6's headline to "main pool 14% WDA (from 1/6 April 2026; 18% on balances brought forward + hybrid rate for straddling periods)". Track 2 flags only; cannot edit house_positions per §6 deference rule.

**This page (writing-down-allowance-cars) vs house positions:** the LIVE page CONTRADICTS §25.3/§25.10 (E4: "AIA unless ZEV" is the §25.10 do-not-write misconception) and §25.5 (E1: ≤50 g/km FYA is wrong — only 0 g/km gets s.45D FYA). Correcting these is the rewrite's first job (already in the fix sequence).

---

## Authority links worth considering (Stage 2 — verified 2026-05-30 unless noted)

Execution session selects 4-6 to actually cite in body (replacing the dead ref [3]).

| URL | Verification status (2026-05-30) | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/45D | 200 OK, content verified: 100% FYA, "does not exceed 0 grams per kilometre", unused + not second-hand, 31 Mar 2027 (CT) / 5 Apr 2027 (IT), Treasury-extendable; dates amended by FA 2025 + FA 2026 | s.45D zero-emission car FYA (E1 fix spine) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/38B | 200 OK, content verified: "General Exclusion 2 — expenditure incurred on the provision of a car (as defined by section 268A)" | s.38B cars-excluded-from-AIA (E4 fix) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/268A | 200 OK, content verified: "car" = mechanically propelled road vehicle other than (a) motorcycle, (b) goods/burden-construction vehicle, (c) vehicle not commonly used / unsuitable as private vehicle | s.268A definition of "car" (DCPU + van-vs-car boundary) |
| https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances | 200 OK, content verified: 40% FYA from 1 Jan 2026 EXCLUDES cars + second-hand ("Cars will also be excluded"); main rate 18%→14% (1 Apr 2026 CT / 6 Apr 2026 IT) + hybrid rate for straddling periods; "does not change the WDA on the special rate pool which is currently 6%" | E2 (40% FYA car exclusion) + E3 (14% current) + E6 (6% special rate retained) |
| https://www.gov.uk/capital-allowances/business-cars | 200 OK, content verified: 0 g/km → 100% FYA; ≤50 g/km → main rate (now 14%); >50 g/km → special rate 6%; cars excluded from AIA | Cross-reference + CO2-band table source (replace dead ref [3]) |
| https://www.legislation.gov.uk/ukpga/2026/11/contents | 200 OK; confirmed "2026 c. 11" = Finance Act 2026. Royal Assent date NOT shown on contents page — use F-37 program lock (18 March 2026); re-verify the dated commencement on the relevant section at execution | FA 2026 citation for 14% current rate |
| HMRC CA Manual CA23510 (car definition) / CA23535 (CO2-emission pooling) | CA23510 verified live 2026-05-30 (car definition + private-use); CA23535 to verify at execution | HMRC interpretive overlay on car definition + emissions pooling |
| gov.uk double-cab-pickup measure (April 2025 reclassification) | **BOTH candidate URLs 404'd at brief time** (`/income-tax-and-corporation-tax-treatment-of-double-cab-pick-ups` and `...-dcpus`). **Execution MUST find the live URL** (HMRC AEA 30 Oct 2024 / Budget 2024 DCPU measure) before citing. If not found, cite the statutory basis (s.268A "goods/burden-construction" boundary) + ICAEW/ACCA secondary, and state the April 2025 effective date as HMRC-announced. | Double-cab-pickup section |

**§16.31 + F-37 + F-8 discipline:** every cited URL re-fetched (200-check + date-stamp) at execution; statute content re-read (a live URL can have operative wording substituted — the TCGA s.4 / FA 2019 canonical case). The s.45D dates were amended by FA 2025 AND FA 2026 — confirm the in-force text shows 31 Mar 2027 / 5 Apr 2027 at write time.

---

## Section-by-section content plan (~3,200 words)

Target ~3,200 body words, 12-14 H2/H3 sections, CO2-band table at top, 4-5 worked examples re-based on 14%, 12-14 FAQs, 1-2 inline `<aside>` CTAs. Raw HTML body (`<p>`, `<h2>`, `<table>`) per the blog-rendering memory note — NO markdown headings in the body, NO Tailwind classes.

1. **Intro + CO2-band → pool table at top (snippet bait) (~250 words).** One-paragraph correct summary (the live page's central confusion, fixed up front), then the table:

   | Car CO2 emissions | Capital allowance treatment | Rate |
   |---|---|---|
   | 0 g/km (new + unused, fully electric) | 100% first-year allowance (CAA 2001 s.45D) | 100% in year 1 |
   | 0 g/km (second-hand electric) | Main pool — no FYA | 14% WDA (reducing balance) |
   | 1-50 g/km | Main pool — no FYA | 14% WDA (reducing balance) |
   | Over 50 g/km | Special rate pool | 6% WDA (reducing balance) |
   | Any car | Excluded from AIA (s.38B) and from the new 40% FYA and full expensing | n/a |

   Forward-link to the pillar for the full four-axis framework.

2. **What writing down allowance on cars is, and why cars are different (~250 words).** Define WDA on the reducing balance; define "car" (s.268A) and why cars get their own rules (excluded from AIA, full expensing, and the 40% FYA). §25.1 qualifying-activity framing: the car is a separate business asset of your property business.

3. **The 0 / 1-50 / >50 g/km CO2 bands explained (~350 words).** The corrected E1 detail. Only NEW + unused ZERO-emission cars get the 100% FYA (s.45D). 1-50 g/km → main pool, no FYA. >50 g/km → special rate 6%. Second-hand electric → main pool, NOT FYA (the carve-out the live page misses). Cite s.45D + gov.uk business-cars.

4. **Current writing down allowance rates: 14% main pool, 6% special rate (~300 words).** The corrected E3 tense. 14% is CURRENT (FA 2026, 1 Apr 2026 CT / 6 Apr 2026 IT). 18% applies only to balances brought forward before the change + inside the hybrid rate for chargeable periods straddling the change date (explain the hybrid rate with the gov.uk measure wording). Special rate UNCHANGED at 6% (cite the measure's exact sentence). Cite FA 2026 + the measure.

5. **Cars are excluded from AIA, full expensing, and the new 40% FYA (~300 words).** The corrected E2 + E4. s.38B General Exclusion 2 (AIA). The 40% FYA (1 Jan 2026) EXPLICITLY excludes cars (quote the measure). Full expensing (s.45S) is company-only AND excludes cars (s.46). Net: for cars, your routes are the s.45D 100% FYA (zero-emission only) OR pool WDA — nothing else. This is the section that most directly fixes the wrong advice.

6. **Electric and zero-emission cars: the s.45D 100% first-year allowance (~350 words).** New + unused + 0 g/km only. Sunset 31 March 2027 (CT) / 5 April 2027 (IT), Treasury-extendable (§25.5). Second-hand electric → main pool (no FYA). After year 1, a 100%-FYA car that is later sold or used privately triggers a disposal value / balancing charge (forward-link disposal mechanics page). Note the eVED/mileage-charge point (April 2028) factually but keep it brief (it is running-cost not capital-allowance). Cite s.45D.

7. **Double-cab pickups now treated as cars (from April 2025) (~300 words).** DCPUs with a payload of one tonne or more are treated as CARS (not goods vehicles) for capital allowances from 1 April 2025 (CT) / 6 April 2025 (IT), HMRC-announced (AEA 30 Oct 2024 / Budget 2024). Consequence: they LOSE AIA + full expensing and fall into the car pools by CO2. Contrast with vans (goods vehicles, s.45DA territory) — forward-link the vans page. Note transitional rules for vehicles ordered/purchased before the change. (Cite the live DCPU measure URL once found, else s.268A + secondary.)

8. **Private use, apportionment, and mileage records (~300 words).** Business-proportion only; private use → single-asset pool (§25.6) so the private portion is tracked and a balancing adjustment crystallises on disposal. Mileage records are the evidence base (HMRC requires it). Note the alternative simplified mileage rate (45p/25p) is NOT compatible with claiming capital allowances on the same car (one or the other) — forward-link landlord-tax-deductions for the mileage-method option.

9. **The s.35 dwelling-house restriction: why it does NOT block your car (~250 words).** §25.2 framing. s.35 bars P&M *inside a dwelling-house* (fixtures in the let property), but a car used to run the property business is not plant in a dwelling — so even an ordinary residential landlord can claim car capital allowances (subject to qualifying activity + business use). Defuse the common over-reading that "residential landlords can't claim any capital allowances".

10. **Company vs individual: how the rules differ (~250 words).** Rates apply from 1 April (CT) vs 6 April (IT). Full expensing (s.45S) is company-only but does NOT extend to cars, so it is irrelevant for company cars (point this out — companies do not get a better car deal than individuals on the capital-allowance side; the company-car advantage is BIK/EV, out of scope — forward-link). Hybrid rate for straddling periods. Cite §25.5/§25.6.

11. **Worked examples (re-based on 14%) (~350 words).** (a) New electric car £35,000, 0 g/km → 100% FYA £35,000 year 1 (s.45D). (b) New plug-in hybrid £25,000 at 45 g/km → MAIN POOL (NO FYA — the live page's error made explicit-and-corrected), 14% WDA = £3,500 year 1, then 14% reducing balance. (c) Petrol car £25,000 at 120 g/km → special rate 6% = £1,500 year 1 (retain the live example, confirm 6%). (d) Private-use example: car used 60% business → claim 60% of the WDA, single-asset pool, balancing adjustment on disposal. Include an inline `<aside>` CTA after the examples.

12. **Common mistakes (corrected) (~200 words).** Re-cast the live page's mistakes list: assuming ≤50 g/km gets the FYA (it doesn't); assuming the 40% FYA or full expensing covers cars (it doesn't); using 18% for current-year additions (it's 14%); assuming second-hand electric gets the FYA (it doesn't); claiming AIA on a car (s.38B bars it); double-claiming mileage AND capital allowances; no mileage records.

13. **How a property accountant helps (lead-gen, no pricing) (~150 words).** Anonymised framing only (e.g., "a landlord we worked with…", no names, no fees). Inline `<aside>` CTA / route to LeadForm + /contact. NO pricing, NO soft fee comparison.

14. **FAQs (12-14, frontmatter array).** Each targets a verbatim car-allowance query. Draft set:
    - What is the writing down allowance rate for cars in 2026/27? (14% main pool / 6% special rate — CORRECTED)
    - Do cars with CO2 emissions of 50g/km or less get a 100% first-year allowance? (NO — only 0 g/km; 1-50 g/km go to the main pool at 14% — the direct correction)
    - Can I claim the new 40% first-year allowance on a car? (NO — cars are excluded)
    - Can I claim AIA on a business car? (NO — s.38B)
    - Do electric cars qualify for 100% first-year allowances? (Yes, new + unused + 0 g/km, s.45D, to 31 Mar / 5 Apr 2027)
    - Do second-hand electric cars get the 100% first-year allowance? (NO — main pool)
    - What is the special rate for cars over 50g/km? (6%, unchanged)
    - Can a residential landlord claim capital allowances on a car? (Yes — the car is not plant in a dwelling; s.35 does not block it)
    - Can I claim WDA on a car used partly privately? (Business proportion only; single-asset pool; mileage records)
    - Can I claim mileage AND capital allowances on the same car? (No — one method or the other)
    - Are double-cab pickups treated as cars now? (Yes, 1-tonne+ payload, from April 2025; lose AIA + full expensing)
    - Does full expensing apply to company cars? (No — s.45S excludes cars; company-only and car-excluded)
    - What happens to the allowance when I sell the car or start using it privately? (Disposal value → balancing allowance/charge)
    - Is the 14% rate live now or coming in future? (Live now — FA 2026, from 1/6 April 2026; 18% only on brought-forward balances + hybrid straddling rate)

15. **Summary + sources (~150 words).** Corrected key-points bullets. Sources = 4-6 verified authority URLs (replace dead ref [3]).

---

## Statute spine (every citation — verify at write time per F-8 + §16.31)

All verified against legislation.gov.uk / gov.uk on 2026-05-30 at brief-drafting time. Re-verify the in-force text at execution (s.45D dates were amended by FA 2025 + FA 2026).

| Citation | Provision | Status (2026-05-30) | Used for |
|---|---|---|---|
| **CAA 2001 s.15** | Qualifying activities (UK property business) | LOCKED §25.1; verified | Car is a separate business asset of a qualifying activity |
| **CAA 2001 s.35** | Dwelling-house P&M restriction | LOCKED §25.2; verified | Why s.35 does NOT block the car (it bars plant *in* a dwelling, not a business car) |
| **CAA 2001 s.38B** | General exclusions to AIA — General Exclusion 2: cars (as defined by s.268A) | Verified verbatim 2026-05-30 | Cars excluded from AIA (E4 fix) |
| **CAA 2001 s.39** | FYA gateway (FYA only for specified expenditure) | LOCKED §25.5; verified | Cars only get FYA via s.45D |
| **CAA 2001 s.45D** | 100% FYA, low-CO2 cars: 0 g/km, unused + not second-hand, to 31 Mar 2027 (CT) / 5 Apr 2027 (IT) | Verified verbatim 2026-05-30 (dates amended FA 2025 + FA 2026) | Zero-emission car FYA (E1 fix spine) |
| **CAA 2001 s.45S** | Full expensing (company-only) | LOCKED §25.5; verified | Full expensing does NOT apply to cars |
| **CAA 2001 s.46** | General FYA exclusions (incl. cars) | LOCKED §25.5; verify at execution | Cars excluded from the general FYA route |
| **CAA 2001 s.51A** | AIA £1m maximum (permanent) | LOCKED §25.3; verify | AIA context (cars excluded from it) |
| **CAA 2001 s.55** | Entitlement / balancing events (AQE vs TDR) | LOCKED §25.6; verify | Disposal / private-use balancing adjustment |
| **CAA 2001 s.61** | Disposal events and values | LOCKED §25.6; verify | Disposal value on sale / move to private use |
| **CAA 2001 s.268A** | Definition of "car" (and the goods/burden boundary) | Verified verbatim 2026-05-30 | "Car" definition + DCPU/van-vs-car boundary |
| **Finance Act 2026 (c.11)** | Main-rate WDA 18%→14% (1 Apr 2026 CT / 6 Apr 2026 IT) + hybrid rate; s.45D date extension | c.11 confirmed; Royal Assent 18 Mar 2026 (F-37 lock); re-verify dated commencement at execution | 14% current rate (E3 fix) |
| **gov.uk measure (new 40% FYA + 14% WDA)** | 40% FYA from 1 Jan 2026 EXCLUDES cars + second-hand; 18%→14%; special rate unchanged at 6% | Verified verbatim 2026-05-30 | E2 + E3 + E6 |
| **gov.uk /capital-allowances/business-cars** | 0 / ≤50 / >50 g/km band → pool mapping; cars excluded from AIA | Verified 2026-05-30 | CO2-band table; cross-reference |
| **HMRC double-cab-pickup measure (April 2025)** | DCPU 1-tonne+ payload treated as car from 1 Apr 2025 (CT) / 6 Apr 2025 (IT) | Both candidate URLs 404'd; FIND live URL at execution, else cite s.268A + secondary | Double-cab-pickup section |
| **HMRC CA Manual CA23510 / CA23535** | Car definition + private use; CO2-emission pooling | CA23510 verified 2026-05-30; CA23535 verify at execution | Interpretive overlay |

---

## metaTitle / metaDescription / h1 plan

Test 2-3 candidates against the highest-impression query word order ("capital allowances on cars" / "writing down allowance cars") at execution. Lead with the year + the corrected mechanic (CO2 bands / 14% / electric FYA). Keep metaTitle <= 60 chars, metaDescription <= 158 chars. No em-dashes. No pricing.

**metaTitle candidates:**
- `Capital Allowances on Cars 2026/27: CO2 Bands & 14% WDA` (54 chars) — leads with the head query + the corrected rate
- `Writing Down Allowance on Cars 2026/27: Rates & EV Rules` (55 chars) — slug-aligned + currency
- `Car Capital Allowances for Landlords: 14% WDA + EV FYA` (53 chars) — property-investor angle

**metaDescription candidates:**
- `Capital allowances on cars for UK property investors in 2026/27: which CO2 bands get the 14% main rate, 6% special rate, or the 100% electric-car first-year allowance.` (trim to <=158)
- `How writing down allowance on cars works for landlords now: 14% main pool, 6% special rate, 100% FYA only for new electric cars. Cars are excluded from AIA and the 40% FYA.` (trim to <=158 — leads with the correction)

**h1:** keep close to the slug for relevance, refresh for currency: `Capital Allowances on Cars 2026/27: A Guide for UK Property Investors` (or retain "Writing Down Allowance on Cars" if execution prefers slug-exact h1; the metaTitle can carry the head-query variant).

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4` section 13: voice rules (NETNEW §4 + `competitor_rewrite_playbook.md §5`), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs), CSS-in-markdown (semantic HTML only, no Tailwind classes), FAQs + schema (frontmatter `faqs:` array 10-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema), anti-templating discipline, six-check quality bar, statute-citation discipline (F-8: live URL can have substituted wording — re-read content), §16 lessons (esp. §16.18, §16.31, §16.T1 deterministic floor, F-37 Bill-vs-enacted = ENACTED here).

**Critical for THIS brief:** NO em-dashes (use commas, parentheses, full stops, middle dots). NO pricing / no soft fee comparisons (the page is clean — keep it). NO real client names (anonymised social proof only). Raw HTML body, NOT markdown headings. Every rate / threshold / statute checked against the verified spine above — this is a WRONG-ADVICE rewrite, so the deterministic-floor discipline (§16.T1) is the whole point.

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4` section 14: inherits the full 19-step legacy-rewrite workflow. Track 2 deltas: Step 9 = rewrite markdown at existing path (preserve `slug` + `canonical` + `category` + `date`; update `dateModified` to execution date + `sourcesVerifiedAt`); Step 12 = confirm no redirect needed (NONE — REWRITE in place, equity guard rejects collapse); Step 13 = insert/update `monitored_pages` row (this page may be freshly monitored from this rewrite — insert with 90-day window from merge; given low baseline impressions, consider the 180-day INVISIBLE-baseline window per F-11).

**Brief-specific pre-execution steps:**
1. Read `house_positions.md` §25.1, §25.2, §25.3, §25.5, §25.6, §25.8-§25.9, §7 in full.
2. Re-verify the statute spine: s.45D (in-force text + dates), s.38B, s.268A, the gov.uk 40%-FYA-and-14% measure, gov.uk business-cars, FA 2026 c.11 dated commencement. FIND the live double-cab-pickup measure URL (both candidates 404'd).
3. Re-pull `gsc_query_data` for this slug (confirm car-allowance intent still uncontested by siblings).
4. Re-fetch the 4 competitor URLs (200-check + date-stamp).
5. Rewrite at existing path; CO2-band table at top; ~3,200 words; 12-14 FAQs; 4-5 worked examples re-based on 14%; 4-6 verified citations (replace dead ref [3]); 1-2 inline `<aside>` CTAs.
6. Run the mandatory per-batch chain (§16.T5): writer → `qa_verdict.py pending` → `track2_independent_qa.wf.js` → `qa_verdict.py record` → `predeploy_gate.py` → `cd Property/web && npm run build` → deploy (`deploy-and-index.ps1 -Site property -QaBatch batch4`) → monitored_pages + IndexNow.
7. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle <= 60; metaDescription <= 158; all internal links resolve; pricing grep returns only worked-example arithmetic (no fees).
8. Raise F-A (sibling 4% error) + F-B (§25.6 rate currency) in `track2_site_wide_flags.md`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §25.1 qualifying activity (car as separate business asset): __
- §25.2 s.35 dwelling-house (does NOT block the car): __
- §25.3 / §25.10 AIA exclusion (s.38B): __
- §25.5 s.45D zero-emission FYA + s.45S/s.46 car exclusion: __
- §25.6 disposal / private-use single-asset pool: __
- §7 FA 2026 14% current (ENACTED, not hedged): __

### Comparison: before vs after
- Word count: 1,574 → __
- H2/H3 count: 11 → __
- FAQ count: 4 → __
- Authority links: 5 (1 dead) → __ (all live)
- Inline CTAs: 0 → __
- Worked examples: 2 (wrong-framed) → __ (re-based on 14%)
- CO2-band table at top: 0 → __ (1 expected)

### Wrong-advice corrections shipped
- E1 (≤50 g/km FYA myth): __ corrected
- E2 (40% FYA car exclusion): __ corrected
- E3 (14% current tense): __ corrected
- E4 (AIA "unless ZEV"): __ corrected
- E5 (dead ref [3]): __ replaced
- E6 (special rate 6% retained, main-pool examples re-based): __

### Flags raised
- F-A (sibling rates 4% error): __
- F-B (§25.6 rate currency): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
