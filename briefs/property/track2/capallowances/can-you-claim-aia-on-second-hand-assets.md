# Track 2 brief: can-you-claim-aia-on-second-hand-assets

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (capital-allowances cluster, Track 2 batch 4 floor)
**Source markdown path:** `Property/web/content/blog/can-you-claim-aia-on-second-hand-assets.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-accountant-services/can-you-claim-aia-on-second-hand-assets
**Stage 1 priority:** **H, load-bearing wrong-advice fix** (the page is the proven canonical for the second-hand/used-asset AIA intent AND it currently gives materially misleading advice on dwelling-house furnishings; both raise priority)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (statutes re-verified against legislation.gov.uk; house positions §25 + §38 threaded; competitor URLs carried from diagnosis with manager liveness stamps)
**Cannibalisation status:** REWRITE (collapse-direction guard PASSES for keeping this page; scope tightly to the second-hand/used/previously-owned question only)

> **Gold-reference depth target.** Match `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` for data density and `briefs/property/track2/trial/birmingham-property-accountant.md` for the load-bearing-fix-first sequencing. The defining feature of this rewrite is not depth-padding: it is a **wrong-advice correction**. The current page repeatedly tells landlords they can claim AIA on furniture, beds, sofas, kitchen appliances and washing machines inside furnished let dwellings. Per CAA 2001 s.35 (house_positions §25.2 + §38) that is barred. Fixing that is the rewrite's first job; the second-hand-asset depth lift is the second.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `can-you-claim-aia-on-second-hand-assets`. It is the exact-match canonical for the proven-demand query and carries the strongest second-hand-asset positioning of any sibling (Bing position 2 on the exact-match queries; Google position 4 on "can aia be claimed on second hand assets"). Renaming would forfeit that long-tail equity. No redirect proposed.
- **Category:** kept as `property-accountant-services` (current canonical path). Do NOT re-home into `property-types-and-specialist-tax` even though most CA-cluster siblings live there; a category change moves the canonical URL and forfeits the indexed equity the collapse guard is protecting. Note the divergence for a future cluster-tidy decision, do not action it here.
- **Gap-mode tag:** `STALE_FACTS` (primary, and specifically WRONG-ADVICE which is the highest-consequence sub-class) + `THIN_DEPTH` (secondary, 1,586 words vs 3,200 target) + `STRUCTURE` (no comparison table, no statute spine, 4 FAQs) + `PROPERTY_CONTEXT_MISSING` (the page treats this as a generic-business AIA question and never lands the landlord-specific dwelling-house reality).
- **"Why this rewrite" angle.** This is the proven canonical for the second-hand-asset intent, but it is giving wrong advice on the single most common landlord scenario (furnishings in a let dwelling) and it pre-dates the entire FA 2026 capital-allowances floor. The rewrite must (1) correct the s.35 dwelling-house bar and signpost replacement domestic items relief as the real route for furnishings; (2) draw the precise AIA-vs-full-expensing-vs-40%-FYA second-hand boundary that the current page blurs; (3) re-anchor every claim to a verified CAA 2001 / FA 2026 citation. The page should become the best single answer to "can I claim AIA on a used asset" by being the only one that gets the landlord context, the connected-party rule, and the post-FA-2026 position right.
- **The load-bearing intellectual correction (read this twice).** AIA **is** available on genuine arm's-length second-hand assets. The current page half-says this but then imports the phrase "unused and not previously owned" / "unused and not second-hand" as if it were the AIA test. **It is not.** "Unused and not second-hand" is the **full-expensing / first-year-allowance** test (CAA 2001 s.45S for companies; FA 2026 s.29 for the new 40% FYA), NOT the AIA test. AIA's actual bars on used/previously-owned assets are: **s.38B General Exclusion 5** (assets caught by s.13 prior-non-qualifying-use, or s.14 gift), **s.38B General Exclusion 2** (cars), and the **s.61 / s.218 connected-party and prior-cost mechanics**. The rewrite's headline answer is therefore: *yes to genuine second-hand assets bought at arm's length; no to assets you previously owned privately, were gifted, or buy from a connected party, and AIA is the right lever precisely because full expensing and the 40% FYA both exclude second-hand assets.* This distinction is the page's entire reason to exist post-rewrite.

---

## Current page snapshot (Stage 2, filesystem read 2026-05-30)

**Frontmatter:**
- `metaTitle`: "Can You Claim AIA on Second Hand Assets? UK Guide" (50 chars)
- `metaDescription`: "Can you claim AIA on second hand assets? Yes, but with key restrictions. Learn the rules for plant, machinery, and exclusions in this UK guide." (141 chars)
- `h1`: "Can You Claim AIA on Second Hand Assets?"
- `category`: Property Accountant Services
- `date` / `dateModified`: 2026-05-20
- `faqs:` array: **4 entries** (target 12-14)
- `sourceDomains`: accaglobal.com, **aka.hmrc.gov.uk** (malformed, see citation hygiene), att.org.uk, gov.uk, icaew.com

**Body (filesystem):**
- **Word count: 1,586** (diagnosis-confirmed)
- **11 H2 sections:** What Is the AIA; Can You Claim AIA on Second-Hand Assets; What Qualifies as Plant and Machinery for AIA; How to Value Second-Hand Assets; When Can You Claim AIA; Special Rules for Sole Traders and Partnerships; What About Software and Computer Hardware; Practical Example; How to Claim AIA; Common Mistakes to Avoid; Conclusion
- **0 worked numerical examples** in table form; 2 narrative scenarios (washing-machine + transferred-van)
- **5 footnoted citations** ([1] gov.uk AIA, [2] ACCA doc, [3] ICAEW full-expensing-for-SMEs, [4] **broken `aka.hmrc.gov.uk` link**, [5] ATT software costs), **zero legislation.gov.uk statute citations in the body**
- Internal links: 3 (`/incorporation`, `/services`, `/about`), all to TSX service routes, **none to sibling blog pages**
- No comparison table; no rates table; no FA 2026 content anywhere

**Five concrete defects to fix (each load-bearing):**
1. **WRONG-ADVICE, s.35 dwelling-house bar (highest priority).** Intro, "What Qualifies as Plant and Machinery", Practical Example, FAQ #1 and FAQ #3 all tell landlords they can claim AIA on furniture, beds, sofas, tables, kitchen appliances and washing machines "in furnished rental properties". CAA 2001 s.35 bars P&M allowances (including AIA) on plant for use in a let dwelling-house (house_positions §25.2, §38). The washing-machine "Practical Example" (£1,500 AIA on a machine for a furnished let) is flatly wrong and must be rebuilt.
2. **STALE_FACTS, FA 2026 floor entirely absent.** No mention of WDA 18%→14% (FA 2026 s.28), the new 40% FYA (FA 2026 s.29, the key unincorporated-landlord route, itself second-hand-excluded), or full expensing being companies-only and new-and-unused (s.45S). All locked at house_positions §38.
3. **STALE_FACTS, FAQ #2 £1m hedge.** FAQ #2 calls the £1m AIA limit "temporary ... in place for several years". It is **permanent**, CAA 2001 s.51A(5), made permanent by F(No.2)A 2023 s.8 from 1 April 2023 (house_positions §25.3, §38). Do-not-write list explicitly forbids "AIA is £1m temporarily".
4. **CITATION-CONFLATION.** The body imports "unused and not second-hand" as the AIA test. That phrase is the s.45S / FA 2026 s.29 full-expensing/FYA test, not the AIA test (see Manager pre-decisions). The page conflates two regimes and thereby understates AIA's actual reach on second-hand assets.
5. **CITATION HYGIENE.** Footnote [4] is `http://aka.hmrc.gov.uk/...` (a dead URL-shortener host, non-HTTPS). Replace with a live gov.uk / legislation.gov.uk link. The ICAEW full-expensing-for-SMEs article ([3]) is used to support general second-hand framing but full expensing EXCLUDES second-hand, keep it only if cited as the contrast source, not as support.

**Clean on lead-gen rules:** no pricing leak, no real client names found. Page complies with the handoff model as-is on those axes; keep it that way.

---

## GSC / Bing angle, from diagnosis (proven-demand surface is Bing)

**Primary query:** `can you claim aia on second hand assets`

**Demand + positioning (from diagnosis, the collapse-guard evidence):**
- **Bing position 2** for the exact-match queries "can you claim aia on second hand assets" and "can you claim aia on second hand plant" (2 impressions each), the proven-demand surface for this intent.
- **Google position 4** with clicks earned on "can aia be claimed on second hand assets".
- **Bing position 3** on "aia on used assets accounting web".
- This is the **strongest second-hand-asset positioning of any sibling**, the reason the page survives the collapse guard rather than folding into `what-is-aia-in-tax` or the £1m-cap page.

**Strategic read.** The page already ranks for the exact intent; the risk is not invisibility, it is **wrong-advice live on a ranking page** plus a depth/freshness deficit that lets thinner competitors satisfy the query. The rewrite is therefore a *correctness-and-depth defence of an asset that is already winning*, not a rescue of a dead page. Realistic target: hold/improve the Bing position, convert the Google position-4 signal into clicks via a sharper meta + a comparison table that earns the snippet, and (critically) stop publishing wrong advice.

**Secondary query targets (build FAQ + section coverage to own these verbatim):**
- "can you claim aia on second hand plant" / "aia on used assets"
- "can i claim aia on a second hand van" (forward-link the dedicated van page, do not duplicate it)
- "can i claim aia on assets i previously owned" / "aia on assets brought into business"
- "is aia available on gifted assets"
- "can you claim aia on assets from a connected party"
- "is full expensing available on second hand assets" (the contrast query, answer: no; AIA is the route)
- "can landlords claim aia on furniture" (the wrong-advice query, answer: no for plant in a let dwelling; replacement domestic items relief is the route)

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS / WRONG-ADVICE.** The dominant defect is not thinness, it is incorrectness on a ranking page. Two strands:
- **(a) The dwelling-house furnishings error** (s.35). This is reader-misleading: a landlord following the current page would claim AIA on a let-property washing machine and have the claim disallowed with interest and penalties. This must be corrected first and unambiguously, with the correct route (replacement domestic items relief, ITTOIA 2005 s.311A / CTA 2009 s.250A, a revenue relief, NOT a capital allowance) signposted.
- **(b) The FA 2026 floor + £1m-permanence + regime-conflation staleness.** WDA 14%, the 40% FYA, full-expensing scope, and the permanent £1m cap are all missing or wrong. The "unused and not second-hand" conflation actively understates AIA's reach.

**Secondary: THIN_DEPTH.** 1,586 words against a 3,200 target. The competitor depth ceiling for this exact intent is modest (gov.uk list + a specialist Q&A page), so the depth lift is to become decisively best-in-class on the *second-hand boundary specifically*, not to re-explain the whole AIA regime.

**Tertiary: STRUCTURE.** No comparison table (the single highest-ROI structural add, a "second-hand: which lever applies" table is snippet-bait and clarifies the AIA-vs-FYA-vs-full-expensing boundary at a glance), no statute spine, only 4 FAQs.

**Quaternary: PROPERTY_CONTEXT_MISSING.** The page reads as a generic-business AIA explainer. The whole point of this being a property-site page is the landlord-specific reality: most landlord plant sits inside a dwelling and is therefore s.35-barred, so the genuine AIA second-hand opportunities for property businesses are narrow and specific (commercial property, HMO/block common parts, integral features in qualifying non-dwelling areas, vans/tools for a property-development trade). Land that context or the page has no distinct reason to live on this site versus a generic accountancy blog.

**Load-bearing fix sequence (ordered by consequence, not by page order):**
1. **Correct the s.35 dwelling-house bar** across intro + plant-and-machinery section + worked example + FAQs. Replace the washing-machine-in-a-let-flat example with a *correct* one (e.g. a second-hand commercial boiler for the communal plant room of a block of flats, or tools/equipment for a property-development trade). Signpost replacement domestic items relief as the route for furnishings.
2. **Draw the second-hand boundary precisely:** AIA = yes on genuine second-hand; full expensing (s.45S) and 40% FYA (FA 2026 s.29) = no on second-hand. This is the comparison table + the page's core differentiator.
3. **Land the FA 2026 floor** (WDA 14%, 40% FYA route for unincorporated landlords, full-expensing companies-only) and **fix the £1m permanence**.
4. **Re-cite everything** to s.38B / s.13 / s.14 / s.61 / s.51A / s.35 / s.45S / FA 2026 ss.28-29, each as a legislation.gov.uk link verified at write time. Strip the broken `aka.hmrc.gov.uk` link.
5. **Depth + structure to ~3,200 words:** add the comparison table, the connected-party section, the previously-owned/gift section, the property-specific second-hand opportunities section, 12-14 FAQs targeting the secondary queries verbatim.
6. **Meta + h1 refresh** (keep the proven question-form h1; sharpen the meta to lead with the correct answer + the boundary).

---

## Statute spine (every citation verified against legislation.gov.uk 2026-05-30)

This is the verified spine the rewrite must thread. Every section was pulled and read at brief-drafting time; cite each as a legislation.gov.uk hyperlink in the body.

| Statute | What it governs here | Verified wording / status (2026-05-30) | House position |
|---|---|---|---|
| **CAA 2001 s.38B** | **AIA General Exclusions, the actual AIA second-hand/used bars.** General Exclusion 2 = cars (defined by s.268A). **General Exclusion 5 = assets caught by s.13 (prior non-qualifying use) or s.14 (gift).** | In force, revised version current. GE2 + GE5 confirmed verbatim. This is the correct AIA statute, NOT s.45S. | §25.3, §38 |
| **CAA 2001 s.13** | Plant previously owned for **other (non-qualifying) purposes** then brought into the business → treated as **notional qualifying expenditure = market value** at the date brought into use, **capped at original cost** (s.218 deductions). This is why a privately-owned-then-transferred asset gets WDA on market value, not AIA. | In force. Market-value rule + original-cost cap (via s.218) confirmed verbatim. | §25 (disposal/prior-use mechanics) |
| **CAA 2001 s.14** | Plant received as a **gift** then brought into the qualifying activity → notional market-value expenditure; AIA barred via s.38B GE5. | In force. | §25.3, §38 |
| **CAA 2001 s.35** | **Dwelling-house bar.** No P&M allowances (including AIA) for plant for use in a dwelling-house within a property business. Exceptions: **common parts** of a block + **integral features (s.33A)** in qualifying non-dwelling areas. | LOCKED §25.2 + §38. This is the page's central correction. | §25.2, §38 |
| **CAA 2001 s.61** | Disposal events + disposal values; connected-party / below-market-value sales bring in **market value** as disposal value (and the s.13/s.218 cap limits a prior-owner's qualifying expenditure). The connected-party anti-avoidance backbone. | In force. Note: the s.61 Table item 2 connected-party MV rule is narrower than "all connected sales"; the broad connected-party AIA bar runs through s.38B GE + s.217-218. Cite s.61 for disposal value, s.218 for the prior-cost cap. | §25.6 |
| **CAA 2001 s.51A(5)** | **AIA maximum = £1,000,000, PERMANENT.** | In force. £1,000,000 substituted by **F(No.2)A 2023 s.8(2)(a)**, effective 11 July 2023, removing the temporary-uplift structure (permanent from 1 April 2023 economically). Corrects FAQ #2. | §25.3, §38 |
| **CAA 2001 s.45S** | **Full expensing, companies only, "unused and not second-hand".** The phrase the current page mis-applies to AIA actually lives here. | In force. Inserted by **F(No.2)A 2023 s.7(3)**. "(b) incurred by a company within the charge to corporation tax, (c) ... plant or machinery which is unused and not second-hand". | §25.5, §38 |
| **FA 2026 s.28** | **Main-pool WDA 18%→14%** (substitutes 14% into CAA 2001 s.56(1)); hybrid time-apportioned straddling rate. Effective 1 Apr 2026 (CT) / 6 Apr 2026 (IT). | **FA 2026 (c.11), Royal Assent 18 March 2026, ENACTED.** State as current law. | §38 |
| **FA 2026 s.29** | **New 40% FYA on main-rate, NEW AND UNUSED plant**, expenditure on/after 1 Jan 2026; **excludes cars, second-hand/used assets, and assets for overseas leasing**; **available to unincorporated businesses** (the key individual-landlord route). | ENACTED (FA 2026 c.11). Cite FA 2026 s.29; do not invent a consolidated CAA section number. | §38 |
| **CAA 2001 s.46** | FYA General Exclusions (cessation, cars per s.268A, leasing, prior-use via ss.13/13A/14). Context for why FYAs are narrower than AIA. | In force. | §25.5 |
| **CAA 2001 s.51E + s.51G** | Single shared AIA for companies under common control + "related" (shared-premises / similar-activities NACE test). Relevant to landlords with multiple SPVs. | In force. | §25.3 |
| **ITTOIA 2005 s.311A / CTA 2009 s.250A** | **Replacement domestic items relief**, the correct (revenue, not capital) route for furniture/appliances in a let dwelling. Signpost, do not deep-dive (a sibling owns it). | In force (replaced the abolished wear-and-tear allowance from 2016). Verify exact section at write time. | §34 boundary |

**Do-not-write (from §25.10 + §38, restated for this page):**
- "AIA cap is £200,000" / "AIA is £1m temporarily" (false; permanent £1m).
- "Landlords can claim AIA on furniture/beds/appliances/boilers inside a let dwelling" (false; s.35 bars it).
- "AIA requires the asset to be unused and not second-hand" (false; that is the s.45S / FA 2026 s.29 full-expensing/FYA test, not the AIA test).
- "Full expensing / the 40% FYA is available on second-hand assets" (false; both exclude second-hand).
- "Full expensing is available to individual landlords" (false; companies only, the 40% FYA is the unincorporated route).
- "WDA is 18%" (false; 14% from April 2026).
- "Cars qualify for AIA" (false; s.38B General Exclusion 2).

---

## Competitor depth benchmark (URLs carried from diagnosis; manager liveness 2026-05-30)

| URL | Status | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Live (verified 2026-05-30) | The authoritative exclusions list: cars; items owned for another reason before business use; gifted items; and the routing of ineligible items to writing-down allowances. Mirror this list but cite the underlying statute (s.38B GE2/GE5, s.13, s.14) that gov.uk does not surface. | gov.uk is the rates/list source-of-truth and will out-rank us on definitional queries. We win by being the **applied second-hand-boundary specialist** with the landlord context gov.uk omits. |
| https://www.propertycapitalallowance.com/annual-investment-allowance-questions-answered/ | Live (verified 2026-05-30) | The closest direct-intent specialist competitor: states AIA available on new AND second-hand provided not previously used by your business and not from a connected party. Match the clarity. | They do not carry the FA 2026 floor, the s.35 dwelling-house reality for landlords, or the AIA-vs-FYA second-hand boundary. Those are our differentiators. |
| https://www.saffery.com/insights/articles/capital-allowances-a-practical-guide-for-uk-businesses/ | Live (verified 2026-05-30) | Confirms full expensing is new-and-unused only; the 40% FYA (new-and-unused) from Autumn Budget 2025; WDA 18% reducing to 14% from April 2026. Use to corroborate the new-vs-second-hand FYA boundary. | General-business framing, not property-specific. We add the dwelling-house bar + the property-specific second-hand opportunities. |
| https://www.litrg.org.uk/working/self-employment/calculating-self-employed-profits/business-expenses-capital-and-capital-allowances | Indexed (403 to bot fetch; in SERP) | Covers AIA vs WDA and previously-owned / private-use asset valuation for unincorporated taxpayers, corroborates the s.13 market-value mechanic. | Self-employment-generic; not landlord-scoped. |

**Competitor depth ceiling for this intent:** a gov.uk exclusions list + one specialist Q&A page + general-business guides. None carries the FA 2026 floor + the s.35 landlord reality + the AIA-vs-FYA-vs-full-expensing second-hand boundary together. Our ~3,200-word, 12-14-FAQ, statute-spined, property-scoped rewrite is decisively best-in-class, not catch-up.

---

## Section-by-section content plan (~3,200 words)

Target 11-13 H2s, ~3,200 body words, 12-14 FAQs, 1 comparison table (snippet-bait), 1-2 worked examples (correct ones), 2 inline `<aside>` CTAs at conversion moments, 6-8 legislation.gov.uk authority links.

1. **Intro (~150 words).** Direct answer up front: yes, AIA is available on genuine second-hand plant and machinery bought at arm's length; it is NOT available where you previously owned the asset privately, were gifted it, bought it from a connected party, or where it sits inside a let dwelling-house. Flag immediately that "second-hand-OK" is what makes AIA different from full expensing and the new 40% FYA, which both exclude second-hand. Set the property scope. **Correct the dwelling-house point in the opening** so no reader leaves with the old wrong advice.

2. **The short answer: when AIA works on second-hand assets (~250 words).** The arm's-length-purchase rule. AIA is about the asset being qualifying P&M for a qualifying activity, not about the asset being new. Cite s.51A (entitlement + £1m permanent cap) and s.38B (the exclusions that DO bite). Lead the reader to the comparison table.

3. **Comparison table: which lever applies to a second-hand asset (snippet-bait).** Columns: Lever | Second-hand allowed? | Who can claim | Rate | Key statute. Rows: **AIA** (yes / individuals + companies / 100% up to £1m / s.51A) · **Full expensing** (no, new and unused only / companies only / 100% / s.45S) · **40% FYA** (no, new and unused only / unincorporated + companies, the new individual-landlord route / 40% / FA 2026 s.29) · **WDA main pool** (yes, the fallback for excluded/previously-owned assets / all / 14% from Apr 2026 / FA 2026 s.28 + s.56) · **WDA special rate** (yes / all / 6% / s.104D). This table is the page's structural centrepiece and its differentiator.

4. **What counts as second-hand vs previously-owned-by-you (~300 words).** The critical distinction the current page blurs. Genuine second-hand bought from an unconnected third party = AIA-eligible. Assets you owned privately and then brought into the business = NOT AIA (s.38B General Exclusion 5 via s.13); you instead get WDA on the **market value at the date brought into use, capped at original cost** (s.13 + s.218). Gifted assets = same treatment (s.14). Worked micro-example of the privately-owned-van-transferred-in scenario, corrected to show WDA-on-market-value (the current page gets the outcome roughly right here but mis-attributes the statute, fix the citation).

5. **The connected-party rule (~250 words).** AIA is denied / restricted where the asset comes from a connected party or via a transaction whose main benefit is obtaining the allowance (s.38B General Exclusion 4; s.61 / s.218 connected-party market-value and prior-cost mechanics). Why it exists (anti-avoidance: no manufacturing AIA by selling between your own companies / family). Define "connected" at a practical level and forward-link the £1m-cap / association-rules page for the group-allocation depth.

6. **Cars are out, full stop (~120 words).** s.38B General Exclusion 2 (cars per s.268A) excludes cars from AIA entirely; second-hand or new makes no difference. The only car FYA is the 100% FYA for new, unused zero-emission cars (s.45D). Everything else → WDA pool. Forward-link `writing-down-allowance-cars`.

7. **The landlord reality: the dwelling-house bar (~350 words, the correction section).** s.35 bars P&M allowances (including AIA) on plant for use in a let **dwelling-house**. So a second-hand sofa, bed, fridge or washing machine for a furnished let does NOT qualify for AIA, second-hand or not. What DOES still qualify for a property business: **common parts** of a block (communal boiler, lift, lighting in the shared hallway), and **integral features (s.33A)** in qualifying non-dwelling areas (commercial units, offices, communal areas in mixed-use). The correct route for furniture/appliances in a let dwelling is **replacement domestic items relief** (a revenue deduction under ITTOIA 2005 s.311A / CTA 2009 s.250A), NOT a capital allowance, signpost it clearly and forward-link the sibling that owns it. Forward-link the HMO common-parts page.

8. **Where second-hand AIA genuinely helps property businesses (~300 words, property context).** The narrow-but-real opportunities: a property-development **trade** (tools, plant, equipment); **commercial property** plant and integral features; **HMO / block common-parts** equipment; second-hand **vans** for a property business (forward-link the dedicated van page rather than duplicating). This is the section that earns the page its place on a property site.

9. **Second-hand vs new: why AIA beats full expensing and the 40% FYA here (~300 words).** The boundary stated plainly. Full expensing (s.45S) is companies-only and new-and-unused. The new 40% FYA (FA 2026 s.29, expenditure from 1 Jan 2026) is the headline route for **unincorporated** landlords/businesses but is **also new-and-unused only** and excludes second-hand, cars and overseas-leased plant. So for a **second-hand** asset, AIA is the lever, there is no FYA fallback. This reframes the ICAEW full-expensing source from "support" to "contrast".

10. **Valuing and timing the claim (~250 words).** Value = price paid for an arm's-length purchase; market value (capped at original cost, s.13/s.218) for previously-owned/gifted. Timing: claim in the chargeable period the expenditure is incurred (contract/payment-date rules; hire-purchase: claim when the asset is brought into use). Keep the current page's correct HP point; re-cite to statute.

11. **Multiple companies / SPVs and the shared AIA (~200 words).** Landlords with several SPVs: a single £1m AIA is shared across companies under common control that are "related" (s.51E + s.51G shared-premises / similar-activities test). Forward-link the £1m-cap / association-rules page for the allocation depth (do NOT duplicate it, that is its job per the cannibalisation scope).

12. **How to claim + records (~200 words).** CT600 capital-allowances section for companies; self-assessment for unincorporated; record-keeping (invoices, contracts, proof the seller is unconnected, valuation evidence for brought-in assets). Inline CTA to discovery call.

13. **FA 2026 at a glance + conclusion (~200 words).** WDA now 14%; 40% FYA the new unincorporated route (new-and-unused); full expensing companies-only; AIA £1m permanent and the right lever for second-hand. Restate the direct answer. Final CTA.

**FAQs (12-14, each targeting a secondary query verbatim):** can I claim AIA on a second-hand van (yes if for a qualifying property business / trade and not a let-dwelling fixture, forward-link van page) · can I claim AIA on furniture for a furnished let (NO, s.35; use replacement domestic items relief) · is full expensing available on second-hand assets (no, AIA is the route) · can I claim AIA on an asset I owned personally then moved into the business (no AIA; WDA on market value capped at cost) · is AIA available on gifted assets (no) · can I claim AIA on assets bought from a connected company or family member (no/restricted) · what is the AIA limit for 2026/27 (£1m, permanent) · is the £1m limit temporary (no, permanent since 1 Apr 2023) · can I claim AIA on a car (no) · what's the difference between AIA and the new 40% FYA on second-hand assets (FYA is new-and-unused only) · what happens if I wrongly claim AIA on a non-qualifying asset (disallowance + interest + penalties) · do my multiple property companies share one AIA (yes if related under common control) · can I claim AIA on plant in the common parts of a block of flats (yes, s.35 common-parts exception) · how do I value a second-hand asset for AIA (price paid; market value capped at cost if brought in).

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index posture (from diagnosis):** large AIA / capital-allowances cluster (~12-15 pages) but each sibling owns a distinct intent, and **this page is the proven canonical for the second-hand/used-asset question**. The collapse-direction guard PASSES for keeping the page: on Bing (the proven-demand surface) it ranks position 2 for the exact-match second-hand queries and earned Google clicks at position 4, the strongest second-hand positioning of any sibling. REWRITE, do NOT collapse.

| Candidate canonical pulled + compared | Why it does NOT supersede this page |
|---|---|
| `what-is-aia-in-tax` (Bing pos 5.1, 30 impr, 0 clk) | Definitional "what is AIA" intent; weaker on second-hand. This page forward-links it for the regime overview instead of re-explaining it. |
| `annual-investment-allowance-uk` (Bing pos 5.0 / Google pos 70.9, near-deindexed on Google) | General-AIA intent; this is one of the Track 2 batch 4 §38-anchored rewrites. No second-hand ownership. |
| `capital-allowances-second-hand-vans` (Bing pos 3.8, 18 impr, 2 clk) | Van-specific sub-intent. This page forward-links it and does NOT duplicate the van detail. |
| `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` | Owns the £1m allocation / association-rules / connected-company-group depth. This page forward-links it for group allocation and does NOT re-explain the association rules. |
| `capital-allowances-property-investors-complete-pillar-...` | ZERO Google+Bing equity; collapse-into-pillar is the wrong direction and was dropped programme-wide per §38. |

**Distinctiveness rule for the rewrite (scope tightly):** cover the second-hand / used / previously-owned / gifted-asset question ONLY, the s.45S "unused and not second-hand" full-expensing bar, the FA 2026 s.29 40% FYA second-hand exclusion, the s.61/s.218 connected-party mechanics, the s.38B general exclusions, the s.13/s.14 previously-owned and gift cases, and the s.35 dwelling-house reality for landlords. Do **not** re-explain the whole AIA regime (that is `what-is-aia-in-tax`'s job) or the £1m cap allocation / association rules (that is the `aia-1m-cap` page's job). Internal-link to those siblings and the van page rather than duplicating.

---

## Internal-link targets within the live corpus (Stage 2, all confirmed on disk 2026-05-30)

Forward-link (and where natural, request reciprocal links at execution):

- `what-is-aia-in-tax`, AIA regime overview (the definitional sibling). Link from §2.
- `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010`, £1m cap allocation + association rules for multiple SPVs. Link from §5 (connected party) + §11 (shared AIA).
- `capital-allowances-second-hand-vans`, the van sub-intent. Link from §8 + FAQ. Do NOT duplicate van detail.
- `writing-down-allowance-rates`, the WDA fallback for excluded/previously-owned assets (14% main / 6% special, FA 2026 floor). Link from the comparison table + §4 + §10.
- `writing-down-allowance-cars`, car treatment. Link from §6.
- `full-expensing-capital-allowances`, companies-only full expensing contrast. Link from §9.
- `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`, the s.35 common-parts exception depth. Link from §7.
- `capital-allowances-commercial-property-what-can-claim`, commercial/integral-features claim base. Link from §8.
- `integral-features-capital-allowances`, s.33A special-rate detail. Link from §7/§8.
- `landlord-capital-allowances-tax-relief`, landlord-scoped overview. Reciprocal link.
- **Replacement domestic items relief sibling**, locate the live slug at execution (search `replacement-domestic-items` / `wear-and-tear` in the corpus); link from §7 + the furniture FAQ as the correct route. If no dedicated page exists, signpost the relief by name and flag the content gap.
- Service routes already present: keep `/incorporation`, `/services`, `/contact` CTAs but reduce reliance on `/about` as a link target.

---

## House-position references (Stage 1)

- **§38 Capital allowances, FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified]: the authoritative floor. WDA 14% (s.28), 40% FYA (s.29, new-and-unused, unincorporated route), full expensing companies-only (s.45S), AIA £1m permanent, s.35 dwelling-house bar, cars excluded. **FA 2026 c.11 RA 18 March 2026 ENACTED, state as current law, never as Bill/proposed.**
- **§25.3 Annual Investment Allowance (ss.51A-51N)** [LOCKED 2026-05-23]: £1m permanent (s.51A(5), F(No.2)A 2023 s.8); shared AIA for related companies (s.51E + s.51G); cars excluded; s.35 bars residential lettings.
- **§25.2 Plant and machinery allowances + s.35 dwelling-house restriction** [LOCKED 2026-05-23]: the dwelling-house bar + common-parts / integral-features exceptions.
- **§25.5 First-Year Allowances (ss.39-51) + s.45S full expensing** [LOCKED 2026-05-23]: "unused and not second-hand", company-only; s.46 general exclusions.
- **§25.6 Disposal mechanics (s.61)** [LOCKED 2026-05-23]: connected-party / below-MV disposal values.
- **§34 boundary (revenue vs capital)** [LOCKED, verify at write time]: replacement domestic items relief is a revenue deduction, NOT a capital allowance, the gateway distinction for furnishings.

**No PENDING / Bill-vs-enacted risk on this page:** the capital-allowances topic is governed by FA 2026 c.11 which is ENACTED (RA 18 March 2026 per §38). This page does NOT touch the April-2027 property-income surcharge, so the F-37 Bill-vs-enacted discipline is satisfied by simple assertion-with-citation.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict, WRONG-ADVICE (s.35 dwelling-house bar).** The current page contradicts house_positions §25.2 + §38 do-not-write list ("Landlords can claim AIA on furnishings/boilers inside a let dwelling") in the intro, the plant-and-machinery section, the practical example, and FAQs #1 and #3. This is materially misleading on a ranking page and is the rewrite's first job.

**CONFIRMED conflict, STALE (£1m hedge).** FAQ #2 ("temporary ... in place for several years") contradicts §25.3 + §38 ("AIA is £1m temporarily" is on the do-not-write list). Correct to permanent (s.51A(5), F(No.2)A 2023 s.8).

**CONFIRMED conflict, REGIME-CONFLATION.** The body's "unused and not second-hand" AIA framing imports the s.45S/FA 2026 s.29 full-expensing/FYA test into AIA. Correct to the true AIA bars (s.38B GE2/GE5, s.13, s.14).

Flag to `track2_site_wide_flags.md` at execution as a STALE_FACTS/WRONG-ADVICE entry; cross-reference the FA 2026 corpus-sweep state (≈15 remaining capital-allowance cluster pages still anchored to the old floor per §38 closing note), this page is one of them and its sibling cluster should be swept on the same pass.

---

## Authority links worth considering (Stage 2, verified 2026-05-30)

Session selects 6-8 to cite as legislation.gov.uk hyperlinks in body:

| URL | Status | Use |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/38B | Verified 200 | AIA General Exclusions (cars GE2; prior-use/gift GE5), the core second-hand statute |
| https://www.legislation.gov.uk/ukpga/2001/2/section/13 | Verified 200 | Previously-owned → market-value notional expenditure (capped at cost) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/14 | Verify at write | Gifted plant brought into business |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Verify at write | Dwelling-house bar |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | Verified 200 | £1m maximum, permanent (s.51A(5), F(No.2)A 2023 s.8) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Verified 200 | Full expensing, companies-only, "unused and not second-hand" |
| https://www.legislation.gov.uk/ukpga/2001/2/section/61 | Verified 200 | Disposal values / connected-party MV |
| https://www.legislation.gov.uk/ukpga/2026/11/section/28 | Verify at write | WDA 18%→14% |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | Verify at write | New 40% FYA (new-and-unused, second-hand-excluded) |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Verified 200 | gov.uk exclusions list (user-facing cross-reference) |

**Strip:** the broken `http://aka.hmrc.gov.uk/...` footnote [4]. **Demote:** the ICAEW full-expensing-for-SMEs link from "support" to "contrast source" (full expensing excludes second-hand, so it cannot support a second-hand-eligibility claim).

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (≤ 62 chars):** lead with the correct answer + the boundary. Candidates: "AIA on Second-Hand Assets: Yes, With Limits | UK Rules" (54) · "Can You Claim AIA on Second-Hand Assets? UK Rules 2026" (54). Prefer the first (answer-forward; the boundary word "Limits" sets up the second-hand-vs-FYA distinction). Avoid the year-stamp churn risk; keep it evergreen.
- **metaDescription (≤ 158 chars):** "AIA is available on genuine second-hand plant and machinery, but not on assets you previously owned, were gifted, bought from a connected party, or use in a let dwelling. The 2026 rules, explained." (trim to ≤158 at write time; lead with the correct answer + name the four bars + signal freshness).
- **h1:** keep the proven question form "Can You Claim AIA on Second-Hand Assets?", it matches the exact-match ranking query and should not change.

---

## Universal rules (do not skip)

(Inherited per §4.13. Critical for this brief: **NO em-dashes**, use commas, parentheses, full stops, middle dots. **NO pricing** (the page is currently clean, keep it; do not add any fee comparison, even soft general-market ranges per Decision E). **No real client names**; anonymised social proof only. LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicate; 1-2 inline `<aside>` CTAs only. FAQs in frontmatter `faqs:` array (target 12-14); `buildBlogPostingJsonLd` auto-emits FAQPage schema, never hand-add FAQ schema in body. Raw HTML body (`<p>`, `<h2>`), not markdown syntax. No Tailwind classes in markdown.)

---

## 19-step workflow (legacy-rewrite adaptation, Track 2 deltas per §4.14)

1. Read `house_positions.md` §25 (esp. §25.2, §25.3, §25.5, §25.6) + §38 + §34 boundary in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → ✅ on close).
3. Read this brief end-to-end.
4. **Re-verify the statute spine** against legislation.gov.uk at write time: s.38B (GE2 + GE5), s.13, s.14, s.35, s.51A(5), s.45S, s.61, FA 2026 s.28 + s.29. Confirm FA 2026 c.11 RA 18 March 2026 still shows ENACTED. This is the load-bearing pre-rewrite verification step.
5. Re-confirm the 4 competitor URLs (200 / indexed) at execution.
6. Read the current `can-you-claim-aia-on-second-hand-assets.md` source in full.
7. Read the closest siblings (`what-is-aia-in-tax`, `aia-1m-cap-...`, `capital-allowances-second-hand-vans`, `writing-down-allowance-rates`, `hmo-common-parts-...`) for link targets + anti-duplication boundaries; locate the live replacement-domestic-items-relief slug.
8. Plan the rewrite: 11-13 H2s, ~3,200 body words, 12-14 FAQs, the comparison table, 1-2 corrected worked examples, 2 inline CTAs.
9. **Rewrite markdown at existing path** (NOT a new file). Preserve slug + canonical + category + image. Update `dateModified` to today + `sourcesVerifiedAt`. Replace `sourceDomains` (drop `aka.hmrc.gov.uk`; add `legislation.gov.uk`). New metaTitle + metaDescription per plan; keep h1.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; **em-dash count = 0**; Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve; **pricing grep returns 0 fee lines**.
12. Confirm no redirect needed (none, slug kept; this is the proven second-hand canonical the collapse guard protects).
13. Update / insert the `monitored_pages` Supabase row (rewrite_post; 90-day window from merge; baseline = current Bing pos 2 / Google pos 4 on second-hand exact-match).
14. Commit on `main`: `Track 2 batch 4: rewrite can-you-claim-aia-on-second-hand-assets (s.35 wrong-advice fix + FA 2026 floor + AIA-vs-FYA second-hand boundary)`. Tracker edits to main repo file via absolute paths only.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Update `track2_site_wide_flags.md` with the s.35 wrong-advice + £1m-stale + regime-conflation flags and cross-reference the FA 2026 capital-allowance cluster sweep (§38 closing note).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (esp. the AIA-vs-s.45S conflation pattern, likely present on other AIA cluster pages).
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §38 FA 2026 floor (WDA 14% / 40% FYA / full-expensing companies-only / AIA £1m permanent): __
- §25.2 / §38 s.35 dwelling-house bar corrected (intro + P&M + example + FAQs): __
- §25.3 s.51A £1m permanent (FAQ #2 fixed): __
- s.45S / FA 2026 s.29 second-hand boundary stated (conflation removed): __
- §34 replacement domestic items relief signposted as the furnishings route: __

### Comparison: before vs after
- Word count: 1,586 → __
- H2 count: 11 → __
- FAQ count: 4 → __
- Statute citations (legislation.gov.uk): 0 → __
- Comparison table: 0 → 1
- Worked examples (corrected): __
- Inline CTAs: 0 → __
- Broken `aka.hmrc.gov.uk` link removed: __ (Y/N)

### Flags raised
- s.35 dwelling-house wrong-advice (confirmed corrected): __
- £1m-permanence stale (confirmed corrected): __
- AIA-vs-s.45S regime-conflation (confirmed corrected; check sibling cluster): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
