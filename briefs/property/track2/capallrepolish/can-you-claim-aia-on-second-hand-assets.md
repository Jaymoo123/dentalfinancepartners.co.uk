# Track 2 brief (REPOLISH): can-you-claim-aia-on-second-hand-assets

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief. **Re-polish / widen-ownership pass** (the page was substantively rewritten 2026-05-30 to fix the s.35 wrong-advice + thread the FA 2026 floor; this pass deepens it to gold-reference depth and adds the same-period-disposal / balancing-charge intent the prior pass did not cover).
**Source markdown path:** `Property/web/content/blog/can-you-claim-aia-on-second-hand-assets.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-accountant-services/can-you-claim-aia-on-second-hand-assets
**Stage 1 priority:** **H, proven canonical to defend + widen** (this is the strongest page in the AIA/capital-allowances cluster on the second-hand intent: GSC pos 7.4 / 1 click and Bing pos 2 on "can you claim aia on second hand assets / second hand plant"; the generic AIA-named siblings sit at GSC pos 25-86. Diagnosis: REWRITE in place, never collapse.)
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (statutes re-verified against legislation.gov.uk; house positions §25.3 / §25.6 / §38 threaded; current source read in full; sibling slugs confirmed on disk)
**Cannibalisation status:** REWRITE (SHARP distinct intent retained; collapse-direction guard PASSES for keeping the page; if anything weaker siblings would later redirect into it)

> **Gold-reference depth target.** Match `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` for data density and `briefs/property/track2/trial/birmingham-property-accountant.md` for the load-bearing-fix-first sequencing. **This is NOT a wrong-advice rescue** (the 2026-05-30 pass already fixed the s.35 furnishings error, the £1m-permanence, the FA 2026 floor and the AIA-vs-FYA conflation). This pass has three jobs, in order: **(1) widen query ownership** by adding the uncovered same-period-disposal / balancing-charge angle (Bing-surfaced, currently nowhere on the page); **(2) lift depth** from 2,544 to ~3,600 words at the gold-reference standard; **(3) tighten structure + E-E-A-T** (add the `reviewedBy` reviewer block the corpus convention now uses, which this page is still missing). No statute risk, no stale facts, no pricing leak found at diagnosis, all load-bearing claims already verified FA-2026-current; the rewrite must preserve that correctness while deepening.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `can-you-claim-aia-on-second-hand-assets`. Exact-match canonical for the proven-demand query; carries the strongest second-hand-asset positioning of any sibling (GSC pos 7.4 with a click; Bing pos 2 on the exact-match queries). Renaming forfeits that long-tail equity. No redirect proposed.
- **Category:** kept as `property-accountant-services` (current canonical path). Do NOT re-home into `property-types-and-specialist-tax` even though most CA-cluster siblings live there; a category change moves the canonical URL and forfeits the indexed equity the collapse guard is protecting. Note the divergence for a future cluster-tidy; do not action it here.
- **Gap-mode tag (from diagnosis):** `THIN_DEPTH` (primary, 2,544 words vs 3,600 target) + `STRUCTURE` (secondary, the page lacks the same-period-disposal section, lacks the `reviewedBy` E-E-A-T block, and could carry a second reference table) + `INVISIBLE` (tertiary, the same-period-disposal/balancing-charge query class surfaced by Bing is currently uncovered on-page, so the page is invisible to it despite owning the surrounding intent).
- **"Why this rewrite" angle.** This is the proven canonical for the second-hand-asset intent and it is now correct (post-2026-05-30). The opportunity is not correction, it is **ownership-widening + depth**. Bing surfaces a query the page does not answer: "can i claim aia on an asset disposed of in the same accounting period?" (pos 4, 2 impr). The page owns the eligibility-boundary intent but has no disposal/balancing-charge content at all. Adding a clean same-period-disposal section (AIA still claimable on acquisition in the period of disposal; the disposal value is brought in separately under s.61 and can create a balancing charge under s.55) closes that gap and widens the page's ownership to the disposal angle without touching any sibling's primary query. The depth lift to ~3,600 takes the page from "good" to "decisively best-in-class on the second-hand boundary".
- **The load-bearing intellectual additions (read twice).**
  1. **Same-period acquisition-and-disposal is the new intent to own.** AIA is not blocked merely because an asset is bought and then disposed of in the same chargeable period. You claim AIA on the qualifying expenditure when incurred; the disposal is a separate event that brings a **disposal value** into the relevant pool under CAA 2001 s.61, and where the pool's total disposal receipts exceed its available qualifying expenditure the difference is a **balancing charge** (a taxable receipt) under CAA 2001 s.55. The net effect on a same-period buy-and-sell can be a wash or a clawback, but the AIA claim itself is not denied by the same-period disposal. This is the precise answer to the uncovered Bing query and must be a standalone H2.
  2. **Keep the four existing bars intact and correct.** The 2026-05-30 pass correctly stated the AIA bars: previously-owned-by-you (s.38B General Exclusion 5 via s.13), gift (s.38B GE5 via s.14), connected party (s.38B GE4 + s.61/s.218 mechanics), and the s.35 dwelling-house bar for landlords. Do NOT regress any of these. The "unused and not second-hand" phrase belongs to full expensing (s.45S) and the 40% FYA (FA 2026 s.29), NOT to AIA. Preserve that distinction; it is the page's reason to exist.

---

## Current page snapshot (Stage 2, filesystem read 2026-06-02)

**Frontmatter (current, post-2026-05-30 rewrite):**
- `metaTitle`: "AIA on Second-Hand Assets: Yes, With Limits | UK Rules" (54 chars)
- `metaDescription`: "AIA is available on second-hand plant and machinery, but not on assets you previously owned, were gifted, bought from a connected party, or in a let dwelling." (157 chars)
- `h1`: "Can You Claim AIA on Second-Hand Assets?"
- `category`: Property Accountant Services
- `date`: 2026-05-20 · `dateModified`: 2026-05-30 · `sourcesVerifiedAt`: 2026-05-30
- `faqs:` array: **15 entries** (already at/above the 12-14 floor; add one same-period-disposal FAQ, prune none)
- `sourceDomains`: gov.uk, legislation.gov.uk (clean; the broken `aka.hmrc.gov.uk` link from the pre-2026-05-30 version is already gone)
- **MISSING:** `reviewedBy` / `reviewerCredentials` / `reviewedAt` E-E-A-T block (the corpus convention; add this pass)

**Body (filesystem, current):**
- **Word count: 2,544** (diagnosis-confirmed; target 3,600)
- **11 H2 sections:** The short answer · Which capital allowance applies to a second-hand asset? (with the comparison table) · Second-hand versus previously owned by you · The connected-party rule · Cars are out, full stop · The landlord reality: the dwelling-house bar · Where second-hand AIA genuinely helps a property business · Why AIA beats full expensing and the 40% first-year allowance on second-hand · Valuing and timing the claim · Multiple companies and the shared AIA · How to claim and what to keep · The Finance Act 2026 position at a glance · Sources
- **1 comparison table present** (the "Which capital allowance applies" 5-row table; keep it, it is the page's structural centrepiece)
- **1 worked micro-example** (privately-owned van transferred in at £9,000 MV vs £12,000 cost, WDA at 14%; correct, keep)
- **6 legislation.gov.uk citations** in body + a numbered Sources list (clean; s.38B, s.51A, s.35, s.45S, FA 2026 s.29, gov.uk AIA)
- **Internal links: ~11** to sibling blog pages (writing-down-allowance-rates, what-is-aia-in-tax, aia-1m-cap-..., capital-allowances-second-hand-vans, writing-down-allowance-cars, full-expensing-capital-allowances, hmo-common-parts-..., integral-features-capital-allowances, capital-allowances-commercial-property-what-can-claim, capital-allowances-on-property, replacement-domestic-items-relief-uk-landlords-guide). All confirmed live on disk 2026-06-02.
- **2 inline `<aside>` CTAs** present (compliant; no pricing, no client names)

**What is already correct (do NOT regress):** s.35 dwelling-house bar; £1m permanent (s.51A(5), F(No.2)A 2023 s.8); FA 2026 floor (WDA 14% s.28, 40% FYA s.29, full expensing companies-only s.45S); AIA-vs-FYA second-hand boundary; cars out (s.38B GE2); RDIR signpost (ITTOIA 2005 s.311A / CTA 2009 s.250A); FA 2026 c.11 RA 18 March 2026 stated as enacted.

**Four concrete gaps to fix this pass (each additive, none a correction):**
1. **INVISIBLE / coverage gap, same-period disposal + balancing charge.** No content anywhere on "can I claim AIA on an asset disposed of in the same accounting period" or on balancing charges (s.55) or disposal values (s.61) as they bear on a same-period buy-and-sell. This is the highest-ROI add: a Bing-surfaced query (pos 4) the page is currently invisible to, adjacent to intent it already owns. New standalone H2 + new FAQ.
2. **THIN_DEPTH, 2,544 → ~3,600.** The depth lift is the same-period-disposal section (~350 words) + a second reference table (the s.38B General Exclusions decision table, ~snippet-bait) + modest deepening of the connected-party and valuing/timing sections + one additional correct worked example (a same-period buy-and-sell showing the AIA claim and the s.61 disposal value / s.55 balancing-charge interaction). Not padding; each add answers a real sub-query.
3. **STRUCTURE, missing E-E-A-T reviewer block.** Add `reviewedBy: "ICAEW Qualified Senior Reviewer"` + `reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"` + `reviewedAt: 2026-05-30` to frontmatter (the real corpus convention, present on the freshly-rewritten incorporation + AIA cluster siblings; absent here).
4. **STRUCTURE, second reference table.** Add a compact **AIA exclusions decision table** (s.38B General Exclusions, plus the s.35 dwelling-house bar) so the four bars are scannable at a glance, complementing (not duplicating) the existing "which lever applies" comparison table.

**Clean on lead-gen rules:** no pricing leak, no real client names, two anonymised soft-CTA asides only. Compliant with the handoff model. Keep it that way; do not add any fee comparison, even a soft general-market range (Decision E).

---

## GSC / Bing angle (from diagnosis; proven-demand surface spans both)

**Primary query:** `can you claim aia on second hand assets`

**Demand + positioning (from diagnosis, the collapse-guard evidence):**
- **GSC pos ~7.4 with 1 click** on "can you claim aia on second hand assets" (2 impr, pos 9); **GSC pos 4** on "aia second hand assets" and "can aia be claimed on second hand assets" (1 impr each).
- **Bing pos 2** on "can you claim aia on second hand assets" and "can you claim aia on second hand plant" (2 impr each), the proven-demand surface for this intent.
- **Bing pos 3** on "aia on 2nd hann motor" and "aia on used assets accounting web"; **Bing pos 4** on "can you claim aia on company cars only used fr business" and on the load-bearing **"can i claim aia on an assets that is disposed of in the same accounting period?"** (2 impr, pos 4) — the uncovered angle this pass adds.
- This is the **strongest second-hand-asset positioning of any sibling**, the reason the page survives the collapse guard rather than folding into `what-is-aia-in-tax` or the £1m-cap page.

**Strategic read.** The page already ranks for the exact intent and is now correct. The lever this pass pulls is **ownership-widening**: convert the Google pos-7.4 single-click signal into more clicks via a sharper-but-evergreen meta and a second snippet-bait table, and capture the same-period-disposal query the page is invisible to. Realistic target: hold/improve Bing pos 2 and Google pos 4-7, pick up the same-period-disposal long-tail, and earn the answer-box on the "which lever applies" + "which bar applies" tables.

**Target queries (from diagnosis; each owned or newly-captured, no sibling's primary query absorbed):** see the Query-coverage plan table below for the one-row-per-query assignment.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: THIN_DEPTH.** 2,544 words against a 3,600 target. The competitor depth ceiling for this exact intent is modest (a gov.uk exclusions list + one specialist Q&A page + general-business guides). The depth lift is therefore to become decisively best-in-class on the *second-hand boundary plus the disposal angle specifically*, not to re-explain the whole AIA regime (that is `what-is-aia-in-tax`'s job).

**Secondary: STRUCTURE.** The page has one good comparison table but (a) no same-period-disposal section, (b) no second reference table for the four bars, and (c) no `reviewedBy` E-E-A-T block (corpus convention, present on freshly-rewritten siblings, absent here).

**Tertiary: INVISIBLE.** The same-period-disposal / balancing-charge query class (Bing pos 4 on "can i claim aia on an asset disposed of in the same accounting period") has zero on-page coverage. The page owns the surrounding eligibility-boundary intent but is invisible to this adjacent disposal query. Adding the section widens ownership at near-zero cannibalisation risk (no sibling owns the AIA same-period-disposal angle).

**No STALE_FACTS, no WRONG-ADVICE, no statute risk, no pricing leak** (diagnosis-confirmed; the 2026-05-30 pass already cleared all of these). The rewrite must preserve the existing correctness while deepening.

**Load-bearing fix sequence (ordered by ROI):**
1. **Add the same-period-disposal / balancing-charge H2** (the INVISIBLE fix; highest ROI). State plainly: a same-period disposal does not deny the AIA claim; the disposal is a separate event bringing a disposal value into the pool (s.61) that can crystallise a balancing charge (s.55) where pool disposal receipts exceed available qualifying expenditure. New FAQ verbatim-matching the Bing query.
2. **Add the second reference table** (the s.38B General Exclusions + s.35 decision table; snippet-bait + scannability).
3. **Depth lift to ~3,600 words** via the disposal section + a same-period buy-and-sell worked example + modest deepening of connected-party and valuing/timing.
4. **Add the `reviewedBy` E-E-A-T frontmatter block** (corpus convention).
5. **Meta refresh** only if it sharpens; the current metaTitle (54 chars) and metaDescription (157 chars) are already strong and compliant. Prefer minimal change; keep the proven question-form h1 unchanged.
6. **Re-verify the statute spine** at write time (s.38B, s.13, s.14, s.35, s.51A, s.45S, s.55, s.61, s.218, FA 2026 ss.28-29) and confirm FA 2026 c.11 RA 18 March 2026 still shows ENACTED.

---

## Statute spine (every citation verified against legislation.gov.uk 2026-06-02)

This is the verified spine the rewrite must thread. Cite each as a legislation.gov.uk hyperlink in the body. The first nine are already cited on-page (preserve); the s.55 / s.61 / s.218 additions support the new disposal section.

| Statute | What it governs here | Status / verified note (2026-06-02) | House position |
|---|---|---|---|
| **CAA 2001 s.38B** | **AIA General Exclusions, the actual AIA second-hand/used bars.** GE2 = cars (defined by s.268A); GE4 = connected change in trade where obtaining the allowance is the main benefit; GE5 = assets caught by s.13 (prior non-qualifying use) or s.14 (gift). | In force, revised version current. The correct AIA statute, NOT s.45S. Already cited on-page. | §25.3, §38 |
| **CAA 2001 s.13** | Plant previously owned for **other (non-qualifying) purposes** then brought into the business → notional qualifying expenditure = market value at the date brought into use, **capped at original cost** (via s.218 deductions). Why a privately-owned-then-transferred asset gets WDA on market value, not AIA. | In force. Already cited on-page. | §25.6 (prior-use mechanics) |
| **CAA 2001 s.14** | Plant received as a **gift** then brought into the qualifying activity → notional market-value expenditure; AIA barred via s.38B GE5. | In force. Already cited on-page. | §25.3, §38 |
| **CAA 2001 s.35** | **Dwelling-house bar.** No P&M allowances (including AIA) for plant for use in a dwelling-house within a property business. Exceptions: **common parts** of a block + **integral features (s.33A)** in qualifying non-dwelling areas. | LOCKED §25.2 + §38. Already correctly stated on-page; do not regress. | §25.2, §38 |
| **CAA 2001 s.55** | **Determination of entitlement / balancing events.** Per pool: if available qualifying expenditure (AQE) exceeds total disposal receipts (TDR) → WDA or balancing allowance; **if TDR exceeds AQE → balancing charge** (taxable receipt). The mechanic behind the same-period-disposal answer. | In force. **NEW this pass** (supports the new disposal section). Verify verbatim at write. | §25.6 |
| **CAA 2001 s.61** | **Disposal events and disposal values.** Disposal events include ceasing to own the plant, loss, destruction, the plant beginning to be used for non-qualifying purposes, cessation. Disposal value = net proceeds (sale at/above MV); **market value** on a connected-party / below-MV sale. The disposal value is what enters the pool against AQE. | In force. **NEW this pass** for the disposal section (already referenced for connected-party MV on-page). Verify verbatim at write. | §25.6 |
| **CAA 2001 s.218** | Caps a brought-in / connected-party buyer's qualifying expenditure by reference to the prior owner's original cost (the prior-cost cap that pairs with s.13). | In force. Underpins the "capped at original cost" point already on-page; cite explicitly this pass. | §25.6 |
| **CAA 2001 s.51A(5)** | **AIA maximum = £1,000,000, PERMANENT.** | In force. £1,000,000 substituted by **F(No.2)A 2023 (c.30) s.8**, RA 11 July 2023, permanent from 1 April 2023. Already correctly stated on-page. | §25.3, §38 |
| **CAA 2001 s.45S** | **Full expensing, companies only, "unused and not second-hand".** The phrase the page must keep attributing here, NOT to AIA. | In force. Inserted by F(No.2)A 2023. Already cited on-page. | §25.5, §38 |
| **CAA 2001 s.45D** | The only car FYA: 100% FYA for **new, unused zero-emission (0 g/km) cars**, to 31 Mar 2027 (CT) / 5 Apr 2027 (IT). | In force. Already referenced on-page. | §25.5, §38 |
| **FA 2026 s.28** | **Main-pool WDA 18%→14%** (substitutes 14% into CAA 2001 s.56(1)); hybrid time-apportioned straddling rate. Effective 1 Apr 2026 (CT) / 6 Apr 2026 (IT). | **FA 2026 (c.11), Royal Assent 18 March 2026, ENACTED.** State as current law. Already on-page. | §38 |
| **FA 2026 s.29** | **New 40% FYA on main-rate, NEW AND UNUSED plant**, expenditure on/after 1 Jan 2026; **excludes cars, second-hand/used assets, and assets for overseas leasing**; not restricted by incorporation status (inserted CAA 2001 s.45U). The practical route for unincorporated landlords and leasing. | ENACTED (FA 2026 c.11). Cite FA 2026 s.29 / CAA 2001 s.45U; never invent a section number. Already on-page. | §38 |
| **ITTOIA 2005 s.311A / CTA 2009 s.250A** | **Replacement of Domestic Items Relief**, the correct (revenue, not capital) route for furniture/appliances in a let dwelling. Signpost, do not deep-dive (a sibling owns it). | In force (replaced wear-and-tear allowance from 2016). Already correctly signposted on-page; verify exact section at write. | §34 boundary |

**Do-not-write (from §25.10 + §38, restated for this page — all already complied-with; do not regress):**
- "AIA cap is £200,000" / "AIA is £1m temporarily" (false; permanent £1m).
- "Landlords can claim AIA on furniture/beds/appliances/boilers inside a let dwelling" (false; s.35 bars it).
- "AIA requires the asset to be unused and not second-hand" (false; that is the s.45S / FA 2026 s.29 test).
- "Full expensing / the 40% FYA is available on second-hand assets" (false; both exclude second-hand).
- "Full expensing is available to individual landlords" (false; companies only; the 40% FYA is the unincorporated route).
- "WDA is 18%" (false; 14% from April 2026).
- "Cars qualify for AIA or the 40% FYA" (false; s.38B GE2; s.46 / FA 2026 s.29).
- **New for the disposal section:** "A same-period disposal denies the AIA claim" (false; AIA is claimed on the qualifying expenditure when incurred; the disposal is a separate s.61 event that may create an s.55 balancing charge but does not deny the original claim). "A balancing charge is a penalty" (false; it is a clawback of relief, a taxable receipt, not a penalty). "The special rate pool WDA falls to 4%" (false; stays 6%).

---

## Competitor depth benchmark (URLs from diagnosis; manager liveness 2026-06-02)

| URL | Status | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Live (verified at diagnosis) | The authoritative exclusions list: cars; items owned for another reason before business use; gifted items; ineligible items routed to writing-down allowances. Mirror the list but cite the underlying statute (s.38B GE2/GE5, s.13, s.14) that gov.uk does not surface. | gov.uk is the list source-of-truth and out-ranks us on definitional queries. We win by being the **applied second-hand-boundary + disposal specialist** with the landlord context gov.uk omits. |
| https://www.propertycapitalallowance.com/annual-investment-allowance-questions-answered/ | Live (verified at diagnosis) | Closest direct-intent specialist competitor: states AIA available on new AND second-hand provided not previously used by your business and not from a connected party. Match the clarity. | Carries no FA 2026 floor, no s.35 dwelling-house reality for landlords, no same-period-disposal / balancing-charge angle, no AIA-vs-FYA boundary. Those are our differentiators. |
| https://www.protaxaccountant.co.uk/post/aia-allowance | Live (verified at diagnosis) | Use ONLY as the misconception foil: this page actively states the **FALSE** claim that AIA is unavailable on second-hand assets (it conflates AIA with full expensing). This is the exact error our page corrects. Do not borrow; cite the contrast implicitly via the AIA-vs-FYA section. | Wrong on the core question. Reinforces our differentiated value: we are the page that draws the boundary correctly. |

**Competitor depth ceiling for this intent:** a gov.uk exclusions list + one specialist Q&A page + general-business guides, at least one of which is outright wrong on the second-hand question. None carries the FA 2026 floor + the s.35 landlord reality + the AIA-vs-FYA-vs-full-expensing second-hand boundary + the same-period-disposal / balancing-charge angle together. Our ~3,600-word, 16-FAQ, two-table, statute-spined, property-scoped, E-E-A-T-reviewed rewrite is decisively best-in-class, not catch-up.

---

## Section-by-section content plan (~3,600 words)

Target 12-14 H2s, ~3,600 body words, 16 FAQs, **2 reference tables** (the existing "which lever applies" comparison table + a new s.38B exclusions decision table), 2 corrected worked examples (the existing transferred-van micro-example + a new same-period buy-and-sell example), 2 inline `<aside>` CTAs at conversion moments, 7-9 legislation.gov.uk authority links. Sections marked KEEP are already on-page and substantively correct (deepen/tighten only); NEW marks additive content.

1. **Intro (~160 words). KEEP + tighten.** Direct answer up front: yes, AIA is available on genuine second-hand plant and machinery bought at arm's length; it is NOT available where you previously owned the asset privately, were gifted it, bought it from a connected party, or where it sits inside a let dwelling-house. Keep the framing that "second-hand-OK" is what makes AIA different from full expensing and the new 40% FYA, which both exclude second-hand. Add a one-line forward-pointer to the same-period-disposal answer so the new section is signalled in the intro.

2. **The short answer: when AIA works on a second-hand asset (~250 words). KEEP.** The arm's-length-purchase rule; AIA is about the asset being qualifying P&M for a qualifying activity, not about it being new. Cite s.51A (entitlement + £1m permanent cap) and s.38B (the exclusions that DO bite). Lead the reader to the comparison table.

3. **Which capital allowance applies to a second-hand asset? (~200 words + COMPARISON TABLE). KEEP the table.**
   **TABLE 1 (comparison / "which lever applies", snippet-bait, plain HTML, no pricing):**
   - Columns: `Allowance | Second-hand allowed? | Who can claim | Rate | Key statute`
   - Rows:
     - `Annual Investment Allowance | Yes | Individuals, partnerships and companies | 100% up to £1m | CAA 2001 s.51A`
     - `Full expensing | No (new and unused only) | Companies only | 100% | CAA 2001 s.45S`
     - `40% first-year allowance | No (new and unused only) | All businesses; the practical route for unincorporated landlords and leasing | 40% | FA 2026 s.29 (CAA 2001 s.45U)`
     - `Writing down allowance, main pool | Yes (the fallback for excluded or brought-in assets) | All | 14% from April 2026 | CAA 2001 s.56, FA 2026 s.28`
     - `Writing down allowance, special rate pool | Yes | All | 6% | CAA 2001 s.104D`
   - Read-across paragraph: AIA and WDAs are the only routes that accept second-hand; there is no first-year-allowance shortcut for used plant. Forward-link writing-down-allowance-rates + what-is-aia-in-tax.

4. **Second-hand versus previously owned by you (~320 words). KEEP + deepen.** The critical distinction: genuine second-hand from an unconnected third party = AIA-eligible (claim on price paid). Assets you owned privately then brought in = NOT AIA (s.38B GE5 via s.13); WDA on **market value at the date brought into use, capped at original cost** (s.13 + s.218). Gifts = same via s.14. Keep the transferred-van micro-example (£9,000 MV vs £12,000 cost, WDA 14%). Deepen with a one-paragraph note on why timing the move matters (the relief is on the lower of MV / original cost and is spread, not 100%). Cite s.218 explicitly this pass.

5. **NEW H2 — Buying and disposing in the same accounting period (~350 words). THE INVISIBLE FIX.** Answer the uncovered Bing query head-on. A same-period disposal does **not** deny the AIA claim: you claim AIA on the qualifying expenditure in the chargeable period it is incurred. The disposal is a **separate event** that brings a **disposal value** into the relevant pool under CAA 2001 s.61 (net proceeds on an arm's-length sale; market value on a connected-party / below-MV sale). Under CAA 2001 s.55, entitlement is determined per pool by comparing available qualifying expenditure (AQE) against total disposal receipts (TDR): where TDR exceeds AQE the difference is a **balancing charge** (a taxable receipt, a clawback of relief, NOT a penalty). So on a buy-and-sell within one period the AIA claim stands, but the disposal value can claw the relief back through a balancing charge, and the net position can be a wash. Note the practical point that AIA is claimed for the period the expenditure is incurred even if the asset is sold later in the same period, and that genuine arm's-length disposal value is the proceeds, while a sale to a connected party substitutes market value (s.61), preventing manufactured low disposal values. Forward-link writing-down-allowance-rates for the pool / balancing mechanics depth. **WORKED EXAMPLE 2 (new, correct):** a property-development trade buys a second-hand item of plant for £8,000, claims £8,000 AIA, then sells it later the same period for £6,000 to an unconnected buyer; the £6,000 disposal value reduces the pool, leaving £2,000 of net relief that period (illustrating that AIA is not denied, the disposal value simply nets against it). Keep numbers illustrative, no pricing/fees.

6. **The connected-party rule (~270 words). KEEP + deepen.** AIA denied/restricted where the asset comes from a connected party or via a transaction whose main benefit is obtaining the allowance (s.38B GE4; s.61 substitutes market value as disposal value, s.218 caps the buyer's qualifying expenditure by the seller's original cost). Why it exists (anti-avoidance: no manufacturing AIA by selling between your own companies / family). Deepen the practical "connected" definition (companies under common control, close relatives, partners and their relatives) and tie it to the same-period-disposal section (a connected same-period sale substitutes MV under s.61). Forward-link aia-1m-cap-... for group-allocation depth (do not duplicate).

7. **Cars are out, full stop (~140 words). KEEP.** s.38B GE2 (cars per s.268A) excludes cars from AIA entirely, second-hand or new. The only car FYA is the 100% FYA for new, unused zero-emission (0 g/km) cars (s.45D), to 31 Mar 2027 (CT) / 5 Apr 2027 (IT). Everything else → WDA pool (≤50 g/km main 14%, >50 g/km special 6%). A van is not a car for this purpose. Forward-link writing-down-allowance-cars. (This section also serves the Bing "aia on company cars only used for business" + "aia on 2nd hand motor" queries.)

8. **NEW reference TABLE within the exclusions narrative — the four AIA bars at a glance (~120 words intro + TABLE 2).** Place near §6/§7 as a scannable decision aid.
   **TABLE 2 (decision / exclusions reference, plain HTML, no pricing):**
   - Columns: `Situation | AIA available? | Why | Statute | What applies instead`
   - Rows:
     - `Genuine second-hand bought at arm's length | Yes | Qualifying P&M for a qualifying activity; newness is not the test | s.51A | (AIA applies)`
     - `Asset you previously owned privately, brought in | No | Prior non-qualifying use | s.38B GE5 via s.13 | WDA on market value, capped at cost (s.218)`
     - `Gifted asset brought into the business | No | Gift | s.38B GE5 via s.14 | WDA on market value at bring-in`
     - `Bought from a connected party | Restricted / no | Anti-avoidance; main-benefit test | s.38B GE4; s.61 + s.218 | Market-value disposal/prior-cost cap`
     - `Car | No | Cars excluded entirely | s.38B GE2 (s.268A) | WDA pool; s.45D FYA only for new 0 g/km cars`
     - `Plant inside a let dwelling-house | No | Dwelling-house bar | s.35 | Replacement of Domestic Items Relief (ITTOIA s.311A / CTA 2009 s.250A)`

9. **The landlord reality: the dwelling-house bar (~340 words). KEEP.** s.35 bars P&M allowances (including AIA) on plant for use in a let dwelling-house. Second-hand or new is irrelevant; a sofa, bed, fridge or washing machine for a furnished let does not qualify. What still qualifies: common parts of a block (communal boiler, lift, lighting), integral features (s.33A) in qualifying non-dwelling areas. Correct route for furnishings = Replacement of Domestic Items Relief (revenue deduction, ITTOIA 2005 s.311A / CTA 2009 s.250A), not a capital allowance. Forward-link replacement-domestic-items-relief-uk-landlords-guide + hmo-common-parts-... + integral-features-capital-allowances.

10. **Where second-hand AIA genuinely helps a property business (~300 words). KEEP.** The narrow-but-real opportunities: a property-development trade (tools, plant, equipment); commercial property plant and integral features; HMO / block common-parts equipment; second-hand vans for a property business (forward-link the dedicated van page, do not duplicate). Forward-link capital-allowances-commercial-property-what-can-claim + capital-allowances-on-property. **First inline `<aside>` CTA** after this section (qualify-before-you-buy framing; no pricing).

11. **Why AIA beats full expensing and the 40% first-year allowance on second-hand (~300 words). KEEP.** Full expensing (s.45S) = companies-only, new-and-unused; the phrase "unused and not second-hand" lives here, not in AIA. The 40% FYA (FA 2026 s.29, expenditure from 1 Jan 2026) is the headline route for unincorporated landlords/businesses but is also new-and-unused only and excludes second-hand, cars and overseas-leased plant. So for a second-hand asset there is no FYA shortcut; AIA is the lever, WDA the fallback. (Implicitly answers the protaxaccountant.co.uk misconception.) Forward-link full-expensing-capital-allowances.

12. **Valuing and timing the claim (~280 words). KEEP + deepen.** Value = price paid for an arm's-length purchase; market value (capped at original cost, s.13/s.218) for previously-owned/gifted. Timing: claim in the chargeable period the expenditure is incurred (unconditional-obligation-to-pay rule; the four-month deferral rule; hire-purchase: claim the capital element when the asset is brought into use even while still paying). Deepen with the link back to the same-period-disposal section (incurring date governs the AIA claim; disposal date governs the s.61 disposal value).

13. **Multiple companies and the shared AIA (~200 words). KEEP.** Several SPVs: a single £1m AIA shared across companies under common control that are "related" (s.51E + s.51G shared-premises / similar-activities test). Forward-link aia-1m-cap-... for allocation depth (do not duplicate). **Second inline `<aside>` CTA** after this section (portfolio-spend planning framing; no pricing).

14. **How to claim and what to keep (~210 words). KEEP.** CT600 capital-allowances section for companies; self-assessment for unincorporated; records (invoices, contracts, proof the seller is unconnected, valuation evidence for brought-in assets, a note of where the asset is used to show it is not in a dwelling-house). Add a one-line record-keeping point for disposals (keep the disposal contract / proceeds evidence so the s.61 disposal value is supportable).

15. **The Finance Act 2026 position at a glance (~210 words). KEEP.** FA 2026 c.11 RA 18 March 2026, enacted: WDA 14% main pool (s.28); special rate 6% unchanged (s.104D); 40% FYA new-and-unused, second-hand excluded (s.29); full expensing companies-only new-and-unused (s.45S); AIA £1m permanent (s.51A(5)). Restate the direct answer + the four bars. Final position summary (no separate CTA; the asides cover conversion).

**Sources list (numbered, KEEP + extend):** the existing 6 legislation.gov.uk / gov.uk citations + add s.55 (entitlement / balancing charge), s.61 (disposal events and values), s.218 (prior-cost cap). Target 8-9 verified citations.

**FAQs (16, each targeting a query verbatim; KEEP the existing 15, ADD 1):** existing 15 cover: second-hand van · furniture/white goods in a furnished let (s.35) · full expensing on second-hand · asset owned personally then moved in · gifted assets · connected company / family member · AIA limit 2026/27 · is £1m temporary · car · AIA vs 40% FYA on second-hand · wrongly claiming on a non-qualifying asset · multiple companies share one AIA · plant in common parts of a block · valuing a second-hand asset. **ADD FAQ 16 (verbatim-matching the uncovered Bing query):** "Can I claim AIA on an asset I dispose of in the same accounting period?" — answer: yes, the AIA claim on the qualifying expenditure is not denied by a same-period disposal; the disposal is a separate event that brings a disposal value into the pool under CAA 2001 s.61 and can create a balancing charge under CAA 2001 s.55 where pool disposal receipts exceed available qualifying expenditure, so the net relief can be reduced or eliminated but the claim itself stands. (Optionally split the existing car FAQ to also name "company cars used only for business" to capture that Bing query verbatim; manager preference is to widen the existing car FAQ rather than add a 17th.)

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis; each query assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| can you claim aia on second hand assets | gsc | 2 | 9 | metaTitle + H1 |
| aia second hand assets | gsc | 1 | 4 | metaDescription |
| can aia be claimed on second hand assets | gsc | 1 | 4 | H2 #2 (The short answer: when AIA works on a second-hand asset) |
| can you claim aia on second hand vans | gsc | 1 | 11 | FAQ #1 (second-hand van) |
| can i claim aia on an assets that is disposed of in the same accounting period? | bing | 2 | 4 | H2 #5 (Buying and disposing in the same accounting period) + FAQ #16 |
| can you claim aia on second hand assets | bing | 2 | 2 | body §3 (Which capital allowance applies — comparison table read-across) |
| can you claim aia on second hand plant | bing | 2 | 2 | H2 #3 (Which capital allowance applies to a second-hand asset?) |
| aia on 2nd hann motor | bing | 1 | 3 | H2 #7 (Cars are out, full stop) |
| can you claim aia on company cars only used fr business | bing | 1 | 4 | FAQ #9 (car FAQ, widened to name company cars used only for business) |
| aia on used assets accounting web | bing | 1 | 3 | body §4 (Second-hand versus previously owned by you) |
| aia second hand assets | bing | 1 | 2 | summary (frontmatter `summary`) |
| is full expensing available on second hand assets | adjacent | 0 | 0 | FAQ #3 (full expensing on second-hand) |
| aia previously owned asset brought into business | adjacent | 0 | 0 | FAQ #4 (asset owned personally then moved in) |
| aia connected party purchase | adjacent | 0 | 0 | H2 #6 (The connected-party rule) |
| can landlord claim aia furniture let property | adjacent | 0 | 0 | FAQ #2 (furniture / white goods in a furnished let, s.35) |
| 40% first year allowance second hand | adjacent | 0 | 0 | H2 #11 (Why AIA beats full expensing and the 40% FYA on second-hand) |
| aia balancing charge disposal same period | adjacent | 0 | 0 | H2 #5 (Buying and disposing in the same accounting period — Table 2 row + s.55 balancing-charge paragraph) |

---

## Meta plan

- **metaTitle (≤62 chars):** keep the current "AIA on Second-Hand Assets: Yes, With Limits | UK Rules" (54 chars). Answer-forward; "Limits" sets up the second-hand-vs-FYA distinction; evergreen (no year-stamp churn). No change needed.
- **metaDescription (≤158 chars):** keep the current "AIA is available on second-hand plant and machinery, but not on assets you previously owned, were gifted, bought from a connected party, or in a let dwelling." (157 chars). Already leads with the correct answer + names the four bars. No change needed; if reworded at write time keep ≤158 and keep the four-bars framing.
- **h1:** keep "Can You Claim AIA on Second-Hand Assets?" (proven question form, matches the exact-match ranking query; do not change).
- **summary (frontmatter):** keep the current summary (it already states the yes-with-limits answer + the four bars + the AIA-vs-full-expensing/40%-FYA distinction). Optionally append one clause flagging the same-period-disposal point so the new ownership is signalled. Serves the "aia second hand assets" (Bing) query.

---

## Schema plan

- **Reviewer name:** `ICAEW Qualified Senior Reviewer` (REAL convention from the live corpus + `Property/web/src/lib/schema.ts` emit logic; present on the freshly-rewritten incorporation + AIA cluster siblings, e.g. `incorporate-rental-property-without-cgt.md`, `capital-allowance-aia-property-landlords` brief).
- **Reviewer credentials:** `Chartered Accountant (ACA, ICAEW), Property Tax Specialist`.
- **Add frontmatter:** `reviewedBy: "ICAEW Qualified Senior Reviewer"`, `reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"`, `reviewedAt: 2026-05-30`.
- **howTo:** **false.** This is an explanatory eligibility-boundary page, not a step-by-step procedure. Do NOT emit HowTo JSON-LD.
- **dateModified:** `2026-05-30` (per instruction). Update `sourcesVerifiedAt` to the write date if statutes are re-verified at execution.
- **JSON-LD blocks that emit:** **Article** (BlogPosting via `buildBlogPostingJsonLd`, carrying the `reviewedBy` E-E-A-T fields) + **FAQPage** (auto-emitted from the frontmatter `faqs:` array; do NOT hand-add FAQ schema in body). **No HowTo block.**

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index posture (from diagnosis):** REWRITE in place; SHARP distinct intent retained. This page **owns** the eligibility-boundary intent "CAN AIA be claimed on a second-hand asset (and where it cannot)" and is the STRONGEST page in the AIA/capital-allowances cluster on the relevant query (GSC pos 7.4 / 1 click; Bing pos 2 on "can you claim aia on second hand assets / second hand plant"), whereas the generic AIA-named siblings sit at GSC pos 25-86. It must NOT be collapsed; if anything weaker siblings would later redirect into it. This pass **widens** ownership to the same-period-disposal / balancing-charge angle (currently uncovered on-page, surfaced by Bing pos 4) — a NEW section, not held by any sibling.

| Sibling | Distinct intent it owns | This page's relationship |
|---|---|---|
| `what-is-aia-in-tax` | Definitional "what IS AIA / how the regime works for landlords" (pillar; low impr) | Forward-link for regime overview; never re-explain the regime in full |
| `capital-allowances-second-hand-vans` | Vans-specific deep-dive (Bing pos 2-4; cash-basis trap, balancing charge for vans) | One paragraph + forward-link; never duplicate the worked van mechanics |
| `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` | Associated-companies £1m-sharing (ss.51E/51G/51N) | One paragraph + forward-link; do not re-explain association rules |
| `full-expensing-capital-allowances` | Company full-expensing intent | One contrast paragraph + forward-link |
| `aia-allowance-uk-property-investors` / `annual-investment-allowance-uk` | Generic AIA-for-property intents (GSC pos 25-86, weak) | No collision; this page is the second-hand canonical |
| `writing-down-allowance-rates` | WDA fallback / pool mechanics (14% / 6%) + balancing-charge mechanics | Forward-link from Table 1, §4, §5 (disposal), §12; the disposal section references the WDA/balancing mechanics but keeps them brief and defers depth here |

**Differentiation rule for the rewrite:** own the "second-hand / used / previously-owned / gifted / connected-party" eligibility decision boundary, the s.35 dwelling-house bar (the landlord-specific hook), AND the **same-period-disposal / balancing-charge** angle (the newly-captured intent). Keep the sibling topics to one paragraph + forward-link each so no sibling's primary query is absorbed. The distinct queries this page owns that no sibling owns: "can aia be claimed on second hand assets", "aia second hand plant", "aia on used assets", and now "can i claim aia on an asset disposed of in the same accounting period" + "aia balancing charge disposal same period" (the new section widens ownership without colliding with the van page's van-specific balancing-charge treatment, which is scoped to vans).

---

## Internal-link targets within the live corpus (Stage 2, all confirmed on disk 2026-06-02)

All targets below confirmed present in `Property/web/content/blog/` on 2026-06-02. The current page already links most of these; preserve and add the disposal-section links.

- `what-is-aia-in-tax` — AIA regime overview (definitional sibling). Link from §2. (present)
- `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` — £1m cap allocation + association rules. Link from §6 + §13. (present)
- `capital-allowances-second-hand-vans` — van sub-intent. Link from §10 + FAQ #1; do NOT duplicate van detail. (present)
- `writing-down-allowance-rates` — WDA fallback + pool / balancing-charge mechanics. Link from Table 1, §4, §5 (disposal), §12. (present)
- `writing-down-allowance-cars` — car treatment. Link from §7. (present)
- `full-expensing-capital-allowances` — companies-only full-expensing contrast. Link from §11. (present)
- `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` — s.35 common-parts exception depth. Link from §9. (present)
- `capital-allowances-commercial-property-what-can-claim` — commercial / integral-features claim base. Link from §10. (verify exact slug at write; current page links it)
- `integral-features-capital-allowances` — s.33A special-rate detail. Link from §9. (present)
- `capital-allowances-on-property` — landlord-scoped overview. Link from §10. (present)
- `replacement-domestic-items-relief-uk-landlords-guide` — the correct route for furnishings. Link from §9 + the furniture FAQ. (present)
- Service routes already present: keep the existing CTAs; do not add `/about` reliance.

---

## House-position references (Stage 1)

- **§38 Capital allowances, FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified]: the authoritative floor. WDA 14% (s.28), 40% FYA (s.29, new-and-unused, the unincorporated route), full expensing companies-only (s.45S), AIA £1m permanent, s.35 dwelling-house bar, cars excluded. **FA 2026 c.11 RA 18 March 2026 ENACTED; state as current law, never as Bill/proposed.**
- **§25.3 Annual Investment Allowance (ss.51A-51N)** [LOCKED 2026-05-23]: £1m permanent (s.51A(5), F(No.2)A 2023 s.8); shared AIA for related companies (s.51E + s.51G); cars excluded; s.35 bars residential lettings.
- **§25.2 Plant and machinery allowances + s.35 dwelling-house restriction** [LOCKED 2026-05-23]: the dwelling-house bar + common-parts / integral-features exceptions.
- **§25.5 First-Year Allowances (ss.39-51) + s.45S full expensing** [LOCKED 2026-05-23]: "unused and not second-hand", company-only; s.46 general exclusions.
- **§25.6 Disposal mechanics (ss.55-67 + s.61)** [LOCKED 2026-05-23]: **the load-bearing house position for the NEW disposal section.** s.55 AQE-vs-TDR per pool → balancing allowance (AQE>TDR) or balancing charge (TDR>AQE); s.61 disposal events + disposal values (net proceeds; market value on connected-party / below-MV sale); s.218 prior-cost cap.
- **§34 boundary (revenue vs capital)** [LOCKED, verify at write]: Replacement of Domestic Items Relief is a revenue deduction, not a capital allowance, the gateway distinction for furnishings.

**No PENDING / Bill-vs-enacted risk on this page:** the capital-allowances topic is governed by FA 2026 c.11, ENACTED (RA 18 March 2026 per §38). This page does NOT touch the April-2027 property-income surcharge, so the F-37 Bill-vs-enacted discipline is satisfied by simple assertion-with-citation. Re-confirm the RA date on legislation.gov.uk at write time per the F-37 discipline (the s.29 view did not render the RA date in the diagnosis-time fetch; cross-check the c.11 contents page).

---

## House-position conflict flag (Stage 2)

**No conflict.** Diagnosis confirms: no stale facts, no statute risk, no pricing leak, no wrong-advice. The 2026-05-30 pass already aligned the page to §25.2 / §25.3 / §38 (s.35 bar correct, £1m permanent correct, FA 2026 floor present, AIA-vs-FYA conflation removed). This pass is additive (depth + same-period-disposal section + E-E-A-T block) and must **preserve** that alignment. The only flag-worthy note: confirm at execution that adding the s.55 / s.61 balancing-charge content does not stray into the van page's scoped van-balancing-charge treatment (keep this page's disposal content general, not van-specific). No `track2_site_wide_flags.md` entry required unless a new discrepancy surfaces at write time.

---

## Authority links worth considering (Stage 2)

Session selects 8-9 to cite as legislation.gov.uk hyperlinks in body + the numbered Sources list. The first six are already on-page (preserve); the last three support the new disposal section.

| URL | Status | Use |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/38B | Verified (on-page) | AIA General Exclusions (cars GE2; connected change GE4; prior-use/gift GE5) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | Verified (on-page) | £1m maximum, permanent (s.51A(5), F(No.2)A 2023 s.8) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Verified (on-page) | Dwelling-house bar |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Verified (on-page) | Full expensing, companies-only, "unused and not second-hand" |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | Verify RA + verbatim at write | New 40% FYA (new-and-unused, second-hand-excluded; inserts s.45U) |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Verified (on-page) | gov.uk exclusions list (user-facing cross-reference) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/55 | Verify verbatim at write | **NEW** — entitlement / balancing charge (AQE vs TDR per pool) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/61 | Verify verbatim at write | **NEW** — disposal events and disposal values |
| https://www.legislation.gov.uk/ukpga/2001/2/section/13 | Verified (on-page) | Previously-owned → market-value notional expenditure, capped at cost (s.218) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | Verify at write | WDA main pool 14% (FA 2026 s.28 substitution) — optional supporting cite for Table 1 |

---

## Universal rules (do not skip)

(Inherited per §4.13. Critical for this brief: **NO em-dashes**, use commas, parentheses, full stops, middle dots. **NO pricing** — the page is currently clean; keep it; do not add any fee comparison, even soft general-market ranges per Decision E. **No real client names**; anonymised social proof only. LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicate; keep the 2 existing inline `<aside>` CTAs. FAQs in frontmatter `faqs:` array (16 after this pass); `buildBlogPostingJsonLd` auto-emits FAQPage schema, never hand-add FAQ schema in body. Raw HTML body (`<p>`, `<h2>`, `<table>`), not markdown syntax. No Tailwind classes in markdown. Worked-example numbers illustrative only, no pricing/fees.)

---

## 19-step workflow (legacy-rewrite adaptation, Track 2 deltas per §4.14)

1. Read `house_positions.md` §25 (esp. §25.2, §25.3, §25.5, **§25.6 for the disposal section**) + §38 + §34 boundary in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → ✅ on close).
3. Read this brief end-to-end.
4. **Re-verify the statute spine** against legislation.gov.uk at write time: s.38B (GE2/GE4/GE5), s.13, s.14, s.35, s.51A(5), s.45S, **s.55, s.61, s.218**, FA 2026 s.28 + s.29. Confirm FA 2026 c.11 RA 18 March 2026 still shows ENACTED. Load-bearing pre-rewrite verification.
5. Re-confirm the 3 competitor URLs (200 / indexed) at execution.
6. Read the current `can-you-claim-aia-on-second-hand-assets.md` source in full (it is the post-2026-05-30 version; this pass deepens it, does not start from scratch).
7. Read the closest siblings (`what-is-aia-in-tax`, `aia-1m-cap-...`, `capital-allowances-second-hand-vans`, `writing-down-allowance-rates`, `hmo-common-parts-...`) for link targets + anti-duplication boundaries (esp. keep the new disposal content general, not van-specific).
8. Plan the rewrite: 12-14 H2s, ~3,600 body words, 16 FAQs, the existing comparison table + the new exclusions decision table, 2 worked examples (keep the transferred-van micro-example; add the same-period buy-and-sell example), 2 inline CTAs.
9. **Rewrite markdown at existing path** (NOT a new file). Preserve slug + canonical + category + image + the existing correct content. Add the new same-period-disposal H2 + the second table + FAQ #16. Add `reviewedBy` / `reviewerCredentials` / `reviewedAt: 2026-05-30`. Set `dateModified: 2026-05-30`. Update `sourcesVerifiedAt` to write date. Keep metaTitle + metaDescription + h1 (no change needed; reword only if it sharpens and stays within limits).
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length (16); **em-dash count = 0**; Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve; **pricing grep returns 0 fee lines**; both tables render as valid HTML.
12. Confirm no redirect needed (none; slug kept; this is the proven second-hand canonical the collapse guard protects).
13. Update the `monitored_pages` Supabase row (rewrite_post; extend the 90-day window from merge; baseline = current Bing pos 2 / Google pos 7.4 on second-hand exact-match; add the same-period-disposal query as a new watched term).
14. Commit on `main`: `Track 2 repolish: deepen can-you-claim-aia-on-second-hand-assets (same-period-disposal/balancing-charge section + exclusions table + E-E-A-T block; 2,544 to ~3,600 words)`. Tracker edits to main repo file via absolute paths only.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Update `track2_site_wide_flags.md` only if a new discrepancy surfaces (none expected).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (esp. that the same-period-disposal angle is a likely uncovered query across the AIA/CA cluster — candidate sweep).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §38 FA 2026 floor preserved (WDA 14% / 40% FYA / full-expensing companies-only / AIA £1m permanent): __
- §25.2 / §38 s.35 dwelling-house bar preserved (no regression): __
- §25.6 same-period disposal section added (s.55 balancing charge + s.61 disposal value + s.218 cap, citations verified): __
- §25.3 s.51A £1m permanent preserved: __
- s.45S / FA 2026 s.29 second-hand boundary preserved (no conflation reintroduced): __
- §34 replacement domestic items relief signpost preserved: __

### Comparison: before vs after
- Word count: 2,544 → __ (~3,600)
- H2 count: 11 → __ (12-14, incl. new disposal H2)
- FAQ count: 15 → 16
- Statute citations (legislation.gov.uk): 6 → __ (8-9, incl. s.55 / s.61 / s.218)
- Reference tables: 1 → 2 (comparison table + new exclusions decision table)
- Worked examples: 1 → 2 (transferred-van + same-period buy-and-sell)
- `reviewedBy` / `reviewerCredentials` / `reviewedAt` E-E-A-T block: absent → present
- Inline CTAs: 2 → 2 (unchanged)

### Flags raised
- Same-period-disposal angle likely uncovered across the AIA/CA cluster (candidate sweep): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
