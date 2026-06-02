# Track 2 brief: capital-allowance-aia-property-landlords

**Site:** property
**Brief type:** Legacy rewrite - gold-reference data-complete brief (Track 2, AIA / capital-allowances cluster)
**Source markdown path:** `Property/web/content/blog/capital-allowance-aia-property-landlords.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/capital-allowance-aia-property-landlords
**Stage 1 priority:** M (thin Google equity: primary head term `can you claim capital allowances on investment property` pos 81 / 1 impr; a band of 0-4-impression adjacent eligibility queries; the load-bearing reason to rewrite is the **eligibility-gateway repositioning + STALE_FACTS correctness + PRICING_LEAK strip**, not raw click volume)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (house positions §25 + §38 read in full; current source markdown read; sibling slugs + canonical paths verified on disk; reviewer-credential convention verified from live frontmatter + `schema.ts` emit logic; competitor targets carried from diagnosis pending live re-fetch at execution)
**Cannibalisation status:** REWRITE with sharp differentiation (NOT a 301). The adjacent batch-4 brief `annual-investment-allowance-uk.md` flagged THIS slug as a "COLLAPSE-CANDIDATE (later)"; that flag is **superseded** by this diagnosis, which assigns this page a **distinct primary intent** the cluster does not own (the can-I-claim-by-property-type eligibility decision). REWRITE-ONLY is mandatory per the memory-locked rewrite-only rule and §38 (the pillar collapse was deliberately DROPPED; collapse guard R6 blocks collapsing an indexed page into an unproven target).

> This brief is drafted to the depth of the gold-reference `cgt-rates-property-2026-27-current-rates-explained.md` and the `birmingham-property-accountant.md` city-rewrite template (whose F-1 pricing-leak fix is the model for this page's Decision-E strip). The load-bearing job here is threefold: (1) **reposition** the page from a generic "what is AIA" explainer (intent owned by `annual-investment-allowance-uk` + `capital-allowances-on-property`) into the **property-type eligibility-decision gateway**; (2) **correct six stale/wrong facts** against the FA 2026 reform floor (§38) and CAA 2001 (§25); (3) **strip the Decision-E pricing leak** in FAQ #4.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowance-aia-property-landlords`. It is already indexed (pos 81) against the eligibility head term and the slug reads as the property-type-eligibility cut. No redirect of THIS page (REWRITE-ONLY locked; reversed-equity collapse blocked).
- **Category:** `Property Types & Specialist Tax` (kept; matches canonical and the modern CA cluster home).
- **Gap-mode tag:** `INVISIBLE` (primary - pos 81 head term, the page is not seen) + `STALE_FACTS` (primary, load-bearing - seven concrete wrong/stale statements) + `THIN_DEPTH` (secondary - 1,456 words vs ~2,600 target, no worked examples, no decision table) + `STRUCTURE` (secondary - 4 FAQs, 0 authority links, 0 legislation.gov.uk cites, no decision/triage table) + `CANNIBALISATION` (structural - sits inside a heavy AIA/CA cluster; the distinctness plan is the management mechanism) + `CTR_FAIL` (tertiary - generic meta with no eligibility-answer hook) + `PRICING_LEAK` (Decision E - FAQ #4 "the cost of advice is usually far less than the tax saved").
- **"Why this rewrite" angle:** the cluster already has a head-term AIA owner (`annual-investment-allowance-uk`, the £1m-mechanics canonical) and a broad hub (`capital-allowances-on-property`). This page must stop competing with them on "what is AIA" and instead **own the eligibility-DECISION intent**: a landlord arriving with "can I, as a landlord, actually claim anything, and on which property type?" The rewrite leads every section with the can-I-claim test by **property type** (standard residential BTL; common parts of a multi-unit block; commercial; mixed-use apportionment; HMO / serviced-accommodation grey area; former-FHL post-abolition), routes OUT to the mechanics siblings for the rates/AIA/FYA/SBA/WDA maths, and corrects the stale facts. It is the triage page that answers "do I even have a claim?" before sending the reader to the page that computes it.

---

## Current page snapshot (Stage 2 - filesystem read 2026-05-30)

- **Source word count:** 1,456 (diagnosis figure; 9 H2 sections, list-led, no end-to-end worked example, no decision/triage table).
- **Current H2 outline (9):**
  1. What Are Capital Allowances? (gateway prose)
  2. What Is the Annual Investment Allowance (AIA)? (carries the STALE "For the 2025/26 tax year, the AIA limit is £1 million" framing, line 45)
  3. Can Residential Landlords Claim Capital Allowance AIA? (mis-anchored "in place since April 2016" + loose "HMRC treats... not a trade", lines 53-55)
  4. Can Commercial Landlords Claim Capital Allowance AIA? (asserts commercial letting "is treated as a business activity"/"carrying on a trade" - over-stated framing, line 65)
  5. How Does the AIA Work for Mixed-Use Properties? (apportionment - broadly right, keep + deepen)
  6. What About Serviced Accommodation and HMOs? (grey-area - broadly right, keep + deepen with common-parts carve-out)
  7. What Is Not Covered by the AIA? (list; contains the WRONG "AIA cannot create or increase a loss for most unincorporated businesses", line 108)
  8. How to Claim Capital Allowance AIA (claim process)
  9. Capital Allowances vs. Repairs and Maintenance / What Happens When You Sell / Key Takeaways (disposal section is vague on s.198 + 2-year deadline, lines 126-132)
- **Current metaTitle:** "Capital Allowance AIA: Can Landlords Claim It?" (47 chars; the "Can Landlords Claim It?" hook is actually on-intent - keep the spirit, sharpen).
- **Current metaDescription:** "Capital allowance AIA explained for UK landlords. Find out if you can claim the Annual Investment Allowance on rental property fixtures and fittings." (147 chars; on-intent but no property-type-answer specificity).
- **Current h1:** "Capital Allowance and the Annual Investment Allowance (AIA) for UK Landlords".
- **Current FAQs (frontmatter count):** 4 (target 10-12). FAQ #1 carries the "for 2025/26" temporary-flavoured framing; FAQ #2 carries the loose "HMRC treats residential letting as an investment, not a trade" + "abolished from April 2025"; **FAQ #4 carries the Decision-E PRICING LEAK** ("The cost of advice is usually far less than the tax saved").
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. `sourceDomains: []` (empty). Internal links: 4 (`/services`, `what-does-a-property-accountant-do`, `how-to-choose-a-property-accountant`, `landlord-tax-deductions-uk-2026-complete-list`) + `/contact`.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` via `buildBlogPostingJsonLd`). NO `reviewedBy` / `reviewerCredentials` set (the page is missing the E-E-A-T reviewer block the corpus convention now uses).
- **Last meaningful edit:** `dateModified: 2026-05-20`; `sourcesVerifiedAt: 2026-05-20` (pre-dates the §38 FA 2026 lock of 2026-05-30 - last verified before the reform floor).

---

## GSC angle (last 90 days) - from diagnosis payload (verify with a fresh `python -m optimisation_engine.track2.pull_page_data --slug capital-allowance-aia-property-landlords` at execution)

**Google aggregate (diagnosis):** the page itself surfaces on the primary head term at pos 81; the adjacent/target band is a set of eligibility-shaped queries with 0-4 impressions at pos 24-91. Effectively **INVISIBLE** on Google.

### Target query band (from diagnosis `target_queries[]`)

| imp | pos | query | source |
|---:|---:|---|---|
| 1 | 81 | can you claim capital allowances on investment property | gsc (primary) |
| 3 | 43 | capital allowances on investment property in uk | adjacent |
| 4 | 51.3 | property capital allowances | adjacent |
| 2 | 48.5 | capital allowances property | adjacent |
| 1 | 67 | rental capital allowances | adjacent |
| 1 | 76 | capital allowances for commercial property owners | adjacent |
| 1 | 91 | capital allowance claim on commercial property | adjacent |
| 1 | 69 | capital allowances on leasehold property improvements | adjacent |
| 1 | 75 | capital allowances property improvements | adjacent |
| 2 | 24 | aia capital allowances | adjacent |
| 0 | 0 | can landlords claim capital allowances on residential property | adjacent (distinct long-tail) |
| 0 | 0 | capital allowances furnished holiday let | adjacent (distinct long-tail) |
| 0 | 0 | capital allowances hmo common parts | adjacent (distinct long-tail) |
| 0 | 0 | can a landlord claim aia on rental property | adjacent (distinct long-tail) |
| 0 | 0 | capital allowances mixed use property apportionment | adjacent (distinct long-tail) |

### Pattern analysis

- **The page is buried** (pos 81 head term). There is no CTR-fail lever at pos 81 - nothing is being seen. The diagnosis correctly orders the gap modes: reposition + fix facts + deepen first; meta is downstream hygiene.
- **The distinct intent the cluster siblings do NOT own** is the eligibility/property-type triage. The four zero-impression long-tails (`can landlords claim capital allowances on residential property`, `capital allowances hmo common parts`, `capital allowances mixed use property apportionment`, `can a landlord claim aia on rental property`) are the page's whitespace: gov.uk gives no property-type-specific answer, and the AIA-mechanics siblings answer "how much / how to allocate", not "am I eligible at all".
- **Drop generic AIA-definition queries** (`aia allowance`, `what is aia`) - owned by `annual-investment-allowance-uk` + `what-is-aia-in-tax`. `aia capital allowances` (pos 24, 2 impr) is retained here only as a body/FAQ touch because it is the bridge between "AIA" and "capital allowances on property"; do not build AIA-limit-mechanics depth for it (link OUT).
- **GA4:** pull `ga4_page_data` at execution; expect near-zero sessions consistent with the impression volume. Do not gate on GA4.

**Strategic conclusion:** REWRITE as an eligibility-gateway repositioning + correctness + depth job. Realistic post-rewrite target over 90-180 days: move the head term off pos 81 toward page 2-3 and capture the zero-impression eligibility long-tail where neither gov.uk nor the mechanics siblings give a property-type answer. Set the `monitored_pages` window to **180 days** (INVISIBLE-baseline page per the F-11 long-window rule).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary 1 - INVISIBLE.** Head term pos 81; the page never surfaces. The fix is repositioning + depth + freshness + a statute spine, not a meta tweak.

**Primary 2 - STALE_FACTS (the correctness job; resolve against §38 + §25 at write time).** Seven concrete corrections are load-bearing:

1. **AIA framed "for the 2025/26 tax year, £1 million" (line 45; FAQ #1 "for 2025/26").** This implies a year-specific / temporary cap. §38 + §25.3: £1,000,000 is **permanent** under CAA 2001 **s.51A(5)**, made permanent by **F(No.2)A 2023 (c.30) s.8** (RA 11 July 2023) from 1 April 2023. Strip every "for the 2025/26 tax year" framing and any "expected to revert to £200,000" framing that infects sibling pages. State £1m permanent.
2. **WDA rates entirely absent.** The page never states the writing-down-allowance rates. §38: main-pool WDA is **14% from April 2026** (cut from 18% by **FA 2026 s.28**, which substitutes "14%" into CAA 2001 **s.56(1)**); a chargeable period straddling 1 April 2026 (CT) / 6 April 2026 (IT) uses a **hybrid, time-apportioned rate** between 18% and 14% under **s.28(2)-(6)**; the **special-rate pool stays 6%** (CAA 2001 **s.104D**). Add a short rates touch + link OUT to `writing-down-allowance-rates` (do NOT re-derive pool maths at pillar depth).
3. **The new 40% first-year allowance is absent.** §38: **FA 2026 s.29** introduced a **40% FYA** (inserted as CAA 2001 **s.45U**) on **new-and-unused main-rate** plant and machinery, expenditure **on or after 1 January 2026**, **excluding cars, second-hand/used assets, and assets for leasing overseas**. It is **NOT incorporation-restricted** - frame it as the **practical route for unincorporated landlords** (sole traders, partnerships, individual landlords with qualifying commercial plant) and for leasing, because a company buying qualifying new main-rate plant will normally claim **100% full expensing** (s.45S) instead. **Do NOT write that the 40% FYA is "unincorporated-only" or that "companies cannot claim it"** (wrong law).
4. **Residential restriction mis-anchored to "since April 2016" + loose "HMRC treats letting as investment not a trade" (lines 53-55; FAQ #2).** Re-ground on the **statutory CAA 2001 s.35 dwelling-house bar** (no plant-and-machinery allowances for plant for use in a dwelling-house within a property business), with the **common-parts carve-out** (communal boiler / lift / lighting in multi-unit blocks still qualify because those areas are not the dwelling) and **integral features s.33A** in qualifying non-dwelling areas. Drop the "2016 / HMRC view" date framing.
5. **Commercial framing over-states the position (line 65: commercial letting "is treated as a business activity"/"carrying on a trade").** Capital allowances on commercial property are available because the property is held for a **qualifying activity** (a UK property business is a qualifying activity per CAA 2001 **s.15(1)(b)**); the building need NOT be a trade. Correct the "it is a trade" framing to "a UK property business is itself a qualifying activity; the s.35 dwelling-house bar simply does not bite on non-dwelling commercial space".
6. **FAQ/body claim "the AIA cannot create or increase a loss for most unincorporated businesses" (line 108) is WRONG.** That is not an AIA rule (AIA can create or augment a loss; the restriction the page is half-remembering relates to certain sideways loss-relief caps, not to AIA itself). **Strip or correct.**
7. **FHL handling is mostly right but mis-cites the law and is thin (lines 57, 139; FAQ #2).** Abolition is **6 April 2025 (IT) / 1 April 2025 (CT)** under **FA 2025 (c.8) Sch 5** (NOT FA 2024 Sch 5, which is museum/gallery exhibitions). Add that **grandfathered pools** built up while the property was an FHL **continue to be written down** in the ordinary residential property business; **no new FHL plant qualifies** (the s.35 bar now bites). Cross-ref §6 + §25.7.
8. **Disposal section vague on s.198 + 2-year deadline (lines 126-132).** For commercial buyers, reference the **s.198 fixtures election** + the **pooling requirement (s.187B / s.187A fixed-value requirement)** + the **two-year deadline** (without the election and prior pooling the buyer's fixtures claim can be barred entirely under s.187A(3)). Touch only; link OUT to the s.198 deep-dive.

**Primary 3 - PRICING_LEAK (Decision E, MANDATORY strip).** FAQ #4 line 23: "The cost of advice is usually far less than the tax saved." This is a soft fee/value comparison and violates the lead-gen handoff model (anonymised social proof only, no pricing/fees). **Strip it; replace with a neutral "speak to a specialist" CTA**, no pricing, no fees. (Same Decision-E pattern as the birmingham city-page F-1 fix.)

**Secondary - THIN_DEPTH + STRUCTURE.** 1,456 words, zero end-to-end worked examples, no decision/triage table, 4 FAQs, 0 authority links. Lift to ~2,600 words with 2-3 worked examples, a property-type decision table, 10-12 FAQs, and a legislation.gov.uk-anchored statute spine. Add the `reviewedBy` / `reviewerCredentials` E-E-A-T block (currently absent).

**Tertiary - CTR_FAIL + CANNIBALISATION.** The meta is generic; the page sits in a crowded cluster. The cannibalisation fix is the distinctness plan (lead with the property-type eligibility test, not the allowance type); the CTR fix is a meta that answers "can I claim, and on what" in the title.

**Load-bearing fix sequence (ordered by ROI):**
1. **Reposition** as the property-type eligibility gateway: lead every section with the can-I-claim test by property type, route OUT to mechanics siblings.
2. **Correct the seven stale/wrong facts** + **strip the pricing leak** against §38 + §25 + legislation.gov.uk.
3. **Add the property-type decision table** (the snippet-bait + the page's distinctive asset).
4. **Add 2-3 worked examples** + lift to ~2,600 words.
5. **FAQ 4 → 10-12**, each on a verbatim eligibility query; remove the pricing FAQ, add the long-tail eligibility FAQs.
6. **Statute spine** anchored on legislation.gov.uk (s.35, s.15, s.33A, s.51A, s.56, s.104D, s.45S, s.45U / FA 2026 s.29, FA 2026 s.28, FA 2025 Sch 5, s.198 / s.187A).
7. **Add the `reviewedBy` reviewer block** (E-E-A-T) per the corpus convention.
8. **Meta rewrite** (hygiene + the eligibility-answer hook).

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refresh-read at execution). Heavy intra-site overlap inside the AIA / capital-allowances cluster. **The distinctness mechanism is intent-segmentation, not collapse.**

| Source | Slug | Equity (diagnosis) | Status | Resolution |
|---|---|---|---|---|
| Residual (own) | capital-allowance-aia-property-landlords | head term pos 81; eligibility long-tail 0-4 impr | **REWRITE in place** | Self - re-cut as the **property-type eligibility-decision gateway**. Keep slug + canonical + category. |
| Cluster (strongest) | capital-allowances-on-property | 16 impr, 9 queries, avg pos 59.1, 3,284 words, FA-2026 compliant; ranks best for the shared head term (pos 59 vs this page pos 81) | **HUB - link UP** | The broad hub answer + four-axis routing. This page is NARROWER: the eligibility decision by property type. Reciprocal forward-link; do NOT re-derive the hub's full menu. |
| Cluster (AIA head term) | annual-investment-allowance-uk | the AIA-mechanics canonical; Bing page-1 | **MECHANICS - link OUT** | Owns "what is AIA / £1m cap / allocation". This page mentions AIA permanence briefly + links OUT for the limit mechanics. Do NOT re-explain AIA limit mechanics. |
| Cluster (generic AIA) | aia-allowance-uk-property-investors (8 impr, owns "aia allowance"/"aia tax") | low equity | leave | Owns generic "aia allowance" intent. This page **drops** those generic AIA queries. |
| Cluster (commercial depth) | capital-allowances-commercial-property-what-can-claim | commercial deep-dive | **link OUT** | This page touches "commercial = yes, here is why (s.15 qualifying activity, s.35 does not bite)" then routes OUT for the qualifying-asset list. |
| Cluster (WDA) | writing-down-allowance-rates | WDA-rate depth | **link OUT** | 14%/6% + straddling hybrid touched briefly; link OUT for the rate detail. |
| Cluster (FYA) | full-expensing-capital-allowances | company full expensing | **link OUT** | Distinguish company-only full expensing (s.45S) from the unincorporated 40% FYA (FA 2026 s.29); link OUT. |
| Cluster (integral features) | integral-features-capital-allowances | s.33A depth | **link OUT** | Name integral features (special-rate, s.33A); link OUT. |
| Cluster (HMO common parts) | hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | s.35 common-parts depth | **link OUT** | The HMO/common-parts section touches the carve-out then routes OUT. |
| Cluster (fixtures election) | commercial-property-fixtures-claim-s198-election-purchase-mechanics | s.198 buyer-side depth | **link OUT** | The disposal/sale section touches s.198 + 2-year deadline then routes OUT. |
| Adjacent (upstream) | capital-vs-revenue-expenditure-landlord-uk | the capital-vs-revenue line (the gateway before CA even apply) | **link IN-text** | Link as the upstream decision (is this even capital?). |
| Adjacent (residential alternative) | replacement-domestic-items-relief-uk-landlords-guide | the relief residential landlords use INSTEAD of CA | **link from residential section** | When the answer is "no CA on the dwelling", point to the relief residential landlords actually use. |

**Distinct primary intent this page owns (and the pillar / AIA-mechanics pages do NOT):** the eligibility-DECISION gateway - "can I, as a landlord, claim at all, and on which property type?" A property-type triage: standard residential BTL barred by CAA 2001 s.35; common parts of multi-unit blocks; commercial; mixed-use apportionment; HMO / serviced-accommodation grey area; former-FHL post-abolition. It ends with an explicit hand-off to `capital-allowances-on-property` (full rates/AIA/FYA/SBA/WDA mechanics), to `annual-investment-allowance-uk` (AIA computation), and to `capital-allowances-commercial-property-what-can-claim` (commercial deep-dive).

**Differentiation guardrails (HARD):**
- Do **NOT** re-explain AIA limit mechanics or WDA/FYA pool maths at pillar depth - link OUT.
- Lead **every** section with the can-I-claim eligibility test by **property type**, not by allowance type.
- Distinct long-tail target set: `can landlords claim capital allowances on residential property`, `capital allowances hmo common parts`, `capital allowances mixed use property apportionment`, `can a landlord claim aia on rental property`.
- Drop generic `aia allowance` / `what is aia` (owned by siblings).

**Conclusion:** REWRITE in place as the eligibility gateway. No REDIRECT-PROPOSED. The prior "collapse-candidate" flag from `annual-investment-allowance-uk.md` is superseded - the distinct eligibility intent + the indexed pos-81 equity make this a sharp-differentiation rewrite, blocked from collapse by guard R6 + §38 in any case.

---

## Section-by-section content plan (~2,600 words)

Target ~2,600 body words across 9-10 H2s. Lead each property-type section with the eligibility verdict (Yes / No / It depends), then the statutory reason, then the route OUT. 2-3 inline `<aside>` CTAs at conversion moments (after the decision table; after the commercial worked example). All body is raw HTML (`<p>`, `<h2>`, `<table>`), never markdown.

1. **Intro (~150 words).** Frame the single question this page answers: "before you work out *how much*, work out *whether you can claim at all* - and that turns almost entirely on what type of property you let." Set up the property-type triage. Link in-text to `capital-vs-revenue-expenditure-landlord-uk` (the upstream is-this-even-capital question).

2. **H2: Can landlords claim capital allowances? The short answer by property type (~250 words) - CONTAINS THE DECISION TABLE.** State the gateway rule: allowances need a **qualifying activity** (a UK property business is one, CAA 2001 s.15(1)(b)), but the **s.35 dwelling-house bar** removes plant in a dwelling. Then the decision table (see TABLE 1 below). This is the snippet-bait + the page's distinctive asset. Serves `can landlords claim capital allowances on residential property`, `can a landlord claim aia on rental property`, `rental capital allowances`.

3. **H2: Standard residential buy-to-let - why the answer is usually no (~300 words).** Re-anchor on CAA 2001 **s.35** (statutory, not a "2016 HMRC view"). What residential landlords use instead: **replacement of domestic items relief** + revenue repairs (link OUT to `replacement-domestic-items-relief-uk-landlords-guide`). Make the boundary clean vs Section 24 (interest relief, different regime). Serves `can landlords claim capital allowances on residential property`.

4. **H2: Common parts of a block or HMO - the carve-out that does qualify (~250 words).** The narrow exception: plant in **common parts** of a multi-unit building (communal boiler, lift, shared-area lighting) is not "in a dwelling-house", so it can qualify; integral features (s.33A) in those non-dwelling areas. Link OUT to `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`. Serves `capital allowances hmo common parts`.

5. **H2: Commercial property - the full claim base (~300 words).** Yes, because a UK property business holding non-dwelling commercial space is a qualifying activity and s.35 does not bite (correct the over-stated "it is a trade" framing). What qualifies: heating/ventilation, lifts, electrical, fire/security, sanitary, kitchen, air-con; integral features at special rate. Touch AIA (£1m permanent), the 40% FYA route, full expensing for companies - then link OUT to `capital-allowances-commercial-property-what-can-claim` + `annual-investment-allowance-uk`. **Worked example 1** (below). Serves `capital allowances for commercial property owners`, `capital allowance claim on commercial property`. Inline CTA after the worked example.

6. **H2: Mixed-use property - how to apportion (~250 words).** Shop-with-flat-above pattern: claim on the commercial part, not the dwelling part; apportion shared assets (a boiler heating both) on a just-and-reasonable basis (floor area / heat output). **Worked example 2** (apportionment). Serves `capital allowances mixed use property apportionment`.

7. **H2: HMOs and serviced accommodation - the grey area after FHL abolition (~250 words).** When the level of service tips a let toward a trade (the *Pawson*-distinguishing fact pattern: managed kitchen, daily cleaning, breakfast, concierge), a broader claim base can open; but most serviced lets are now ordinary property businesses post-FHL-abolition, with the s.35 bar biting on plant inside the dwelling. Get advice; do not assume trade status. Serves `capital allowances furnished holiday let` (partial; main FHL coverage in next section).

8. **H2: Former furnished holiday lets - what changed in April 2025 (~250 words).** Abolition 6 Apr 2025 (IT) / 1 Apr 2025 (CT) under **FA 2025 (c.8) Sch 5**. No new FHL plant qualifies (the property is now an ordinary residential business; s.35 bites). **Grandfathered pools** built up while it was an FHL continue to be written down in the ordinary property business (cross-ref §6 + §25.7). Disposal of a former FHL can still trigger a balancing charge on those pools. Serves `capital allowances furnished holiday let`.

9. **H2: Leasehold and property improvements - does fitting-out qualify? (~250 words).** Tenant/leaseholder fit-out of commercial space: plant and integral features installed by the lessee can qualify (the lessee incurs the expenditure on plant for the qualifying activity); the building shell / structural alterations do not (s.21/s.22 buildings-and-structures exclusion), though new non-residential construction may attract the SBA at 3% (touch only, link to hub). Improvements to a residential dwelling remain barred by s.35. Serves `capital allowances on leasehold property improvements`, `capital allowances property improvements`.

10. **H2: Selling the property - balancing charges and the s.198 election (~200 words).** On sale, disposal values on plant pools (s.61 / s.196 fixtures Table) can create a balancing charge. For a commercial buyer, the **s.198 fixtures election** + the **pooling requirement** + the **two-year deadline** are make-or-break (without them the buyer's fixtures claim can be barred under s.187A(3)). Touch only; link OUT to `commercial-property-fixtures-claim-s198-election-purchase-mechanics`. Inline CTA / close. Serves `capital allowances property` (broad).

**Worked examples (anonymised, relief arithmetic only - NO fees):**
- **Example 1 (commercial AIA, ~within cap):** "A landlord letting a small retail unit (held in an unincorporated property business) spends £40,000 fitting out qualifying plant and integral features." Show the AIA covering the £40,000 in the year of spend (within the £1m cap), the saving tracking the landlord's marginal rate. Note the 40% FYA / full-expensing alternatives by structure.
- **Example 2 (mixed-use apportionment):** "A landlord owns a building with a shop on the ground floor and a let flat above, and installs a £12,000 boiler serving both." Apportion on floor area: claim on the commercial proportion only; the flat proportion is barred by s.35.
- *(Optional Example 3 if word budget allows - former-FHL grandfathered pool continuing WDA at 14%.)*

### TABLE 1 (REQUIRED - property-type eligibility decision table; plain HTML, no pricing)

This is a comparison/decision page, so it MUST carry a side-by-side decision table. Place it in H2 #2 as the snippet-bait answer block.

**Columns:** Property type | Can you claim plant & machinery allowances? | Statutory reason | What to claim / use instead

**Rows:**
- Standard residential buy-to-let (in the dwelling) | No | CAA 2001 s.35 dwelling-house bar | Replacement of domestic items relief + revenue repairs
- Common parts of a block of flats / HMO | Yes (common parts only) | s.35 carve-out - common parts are not "in a dwelling-house" | AIA / WDA on communal plant + integral features (s.33A)
- Commercial property (offices, shops, warehouses) | Yes (full base) | UK property business is a qualifying activity (s.15(1)(b)); s.35 does not bite on non-dwelling space | AIA, 40% FYA (s.45U), full expensing for companies (s.45S), WDA, SBA
- Mixed-use (e.g. shop with flat above) | Partly | s.35 bars the dwelling part; commercial part qualifies | Apportion on a just-and-reasonable basis (floor area / heat output)
- HMO / serviced accommodation with substantial services | It depends | May be a trade if services are substantial (Pawson-distinguishing facts); otherwise ordinary property business + s.35 | Get advice on trade status before claiming
- Former furnished holiday let (post-April 2025) | No new claims | FHL regime abolished, FA 2025 Sch 5; now ordinary residential, s.35 bites | Grandfathered pools continue WDA; no new FHL plant qualifies

### TABLE 2 (OPTIONAL - rates/thresholds reference touch; plain HTML, no pricing)

A short reference touch where it aids scanning (the rates this page references but does not deep-dive - full detail lives in the siblings). Keep it to a 4-row reference, then link OUT.

**Columns:** Allowance | Rate / amount | Key condition | Where to go for the detail

**Rows:**
- Annual Investment Allowance (AIA) | £1,000,000 (permanent) | 100% in year of spend on qualifying plant; per business not per property | annual-investment-allowance-uk
- Main-pool writing-down allowance | 14% reducing balance (from April 2026; was 18%) | FA 2026 s.28; straddling-period hybrid rate | writing-down-allowance-rates
- Special-rate pool WDA | 6% reducing balance (unchanged) | Integral features (s.33A) | writing-down-allowance-rates
- 40% first-year allowance | 40% in year of spend | New/unused main-rate plant on/after 1 Jan 2026; excludes cars, second-hand, overseas leasing | full-expensing-capital-allowances

---

## Statute spine (every section with its Act - VERIFY each against legislation.gov.uk at write time; F-37 Bill-vs-enacted discipline)

| Statute citation | What it anchors in the rewrite | Verify (legislation.gov.uk) |
|---|---|---|
| CAA 2001 s.35 | Dwelling-house bar - no P&M allowances for plant for use in a dwelling-house in a property business; common-parts carve-out (the page's central correction, replacing "since April 2016 / HMRC view") | .../ukpga/2001/2/section/35 |
| CAA 2001 s.15(1)(b) | A UK property business is a qualifying activity (corrects the "commercial letting is a trade" over-statement); (c)/(da) FHL paragraphs OMITTED from 1 Apr / 6 Apr 2025 | .../ukpga/2001/2/section/15 |
| CAA 2001 s.33A | Integral features (5 categories) - special-rate pool, the qualifying base in common parts + commercial | .../ukpga/2001/2/section/33A |
| CAA 2001 s.21 / s.22 | Buildings (List A) / structures (List B) excluded from plant (the leasehold-improvements / building-shell boundary) | .../ukpga/2001/2/section/21, /22 |
| CAA 2001 s.51A(5) | AIA maximum £1,000,000 (verbatim "The maximum allowance is £1,000,000") | .../ukpga/2001/2/section/51A |
| Finance (No. 2) Act 2023 (c.30) s.8 | Made the £1m AIA cap PERMANENT from 1 April 2023 (kills the "for 2025/26 / reverts to £200,000" framing). **Verify RA 11 July 2023.** | F(No.2)A 2023, s.8 |
| CAA 2001 s.56(1) | Main-pool WDA now reads "14%" (substituted by FA 2026 s.28(1)) | .../ukpga/2001/2/section/56 |
| Finance Act 2026 (c.11) s.28 | Cuts main-pool WDA 18%→14%; s.28(2)-(6) straddling-period hybrid rate. **Verify RA 18 March 2026, ENACTED.** | .../ukpga/2026/11/section/28 |
| CAA 2001 s.104D | Special-rate pool WDA stays 6% (unchanged) | .../ukpga/2001/2/section/104D |
| Finance Act 2026 (c.11) s.29 / CAA 2001 s.45U | New 40% FYA on new/unused main-rate plant, expenditure on/after 1 Jan 2026; excludes cars, second-hand, overseas leasing; NOT incorporation-restricted. **If a consolidated CAA inserted-section number (s.45U) is confirmed on legislation.gov.uk, cite it; else cite FA 2026 s.29 - never invent.** | .../ukpga/2026/11/section/29 |
| CAA 2001 s.45S | Full expensing - 100% main-rate FYA, **companies only**, new/unused (distinguish from the 40% FYA) | .../ukpga/2001/2/section/45S |
| Finance Act 2025 (c.8) Sch 5 | FHL abolition (6 Apr 2025 IT / 1 Apr 2025 CT); grandfathered pools continue WDA. **NOT FA 2024 Sch 5.** | .../ukpga/2025/8/schedule/5 |
| CAA 2001 s.198 (+ s.187A / s.187B / s.196 / s.61) | Fixtures election on sale; pooling + fixed-value requirements; 2-year deadline; balancing charge on disposal (touch only, link OUT) | .../ukpga/2001/2/section/198 |
| CAA 2001 s.270AA | SBA 3% on non-residential construction (touch only, for the leasehold/fit-out section) | .../ukpga/2001/2/section/270AA |

**Authority / cross-reference URLs (link in body, verify 200 at execution):**
- https://www.gov.uk/capital-allowances (consumer overview cross-link)
- https://www.gov.uk/capital-allowances/annual-investment-allowance (AIA authority cross-link)
- https://www.legislation.gov.uk/ukpga/2001/2/section/35 (the load-bearing residential-bar cite)
- https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual (HMRC interpretive overlay - CA23000+ AIA, CA21000+ P&M; anchor on legislation, manuals as overlay only)

*(Execution session selects 5-7 to actually cite in body.)*

---

## Competitor depth benchmark (Stage 2 - RE-FETCH + status-check at execution per §16.31)

| URL | Re-fetch status | What to borrow | What to differentiate against |
|---|---|---|---|
| https://pkf-francisclark.co.uk/insights/capital-allowances-for-property-investors-what-you-can-and-cant-claim-in-2025/ | __ verify 200 | The "what you can and can't claim" eligibility framing (matches our intent) | "in 2025" dating + likely pre-FA-2026 rate framing (18% WDA, no 40% FYA). Our differentiator: FA-2026-current + the property-type decision table. |
| https://taxeezy.co.uk/resources/tax-guides/capital-allowances-for-landlords-letting-out-uk-property/ | __ verify 200 | Landlord-specific residential-vs-commercial gateway angle | Check FHL handling (likely stale pre-abolition) + likely loose "not a trade" framing instead of the s.35 anchor. |
| https://www.rossmartin.co.uk/property-income/810-capital-expenditure-allowances | __ verify 200 (may be subscriber-gated) | Practitioner-grade statute anchoring | If gated, do not cite; use only as a depth benchmark. |
| https://www.optimiseaccountants.co.uk/property-capital-allowances/tax-benefits-of-capital-allowances/ | __ verify 200 | Benefits/tax-saving framing for the worked examples | Watch for any pricing/fee framing (do NOT mirror - Decision E) + likely stale rates. |

**Competitor depth ceiling for this query class:** roughly 1,200-2,500 words, generally 0-4 FAQs, mostly pre-FA-2026 rate framing (the reform floor is recent, RA 18 March 2026), loose "not a trade" framing rather than the s.35 statutory anchor, and rarely a clean property-type decision table. Our ~2,600-word target with a property-type decision table + FA-2026-current rates + the s.35 statutory anchor + 10-12 eligibility FAQs + a legislation.gov.uk spine puts the page decisively best-in-class on **currency, correctness, and the eligibility-decision cut** - not catch-up.

**What to borrow:** pkf-francisclark's "can and can't claim" eligibility framing; optimiseaccountants' benefit framing for the worked examples.
**What to differentiate against:** every competitor is likely to carry at least one stale fact (AIA-temporary, 18% WDA, no 40% FYA) or the loose "not a trade" framing. Our distinctiveness is the property-type decision table + FA-2026-current law + the strict s.35 anchor.

---

## Internal-link targets within the live corpus (Stage 2 - all paths verified on disk 2026-05-30; path = `/blog/<category-slug>/<slug>`)

**Route OUT to (mechanics deep-dives - this page is the eligibility gateway that hands off):**
- `/blog/property-types-and-specialist-tax/capital-allowances-on-property` - the broad hub (reciprocal forward-link).
- `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` - AIA computation / £1m mechanics (note category `section-24-and-tax-relief`).
- `/blog/property-types-and-specialist-tax/capital-allowances-commercial-property-what-can-claim` - commercial qualifying-asset deep-dive.
- `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` - WDA 14%/6% + straddling hybrid detail.
- `/blog/property-types-and-specialist-tax/full-expensing-capital-allowances` - full expensing (companies) vs the 40% FYA.
- `/blog/property-types-and-specialist-tax/integral-features-capital-allowances` - integral features (s.33A).
- `/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` - common-parts carve-out.
- `/blog/property-types-and-specialist-tax/commercial-property-fixtures-claim-s198-election-purchase-mechanics` - s.198 fixtures election on sale/purchase.

**Upstream gateway + residential alternative + supporting (link from the relevant section):**
- `/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk` - the capital-vs-revenue line (link from intro; the upstream question).
- `/blog/section-24-and-tax-relief/replacement-domestic-items-relief-uk-landlords-guide` - what residential landlords use instead of CA (link from the residential section).
- `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` - company-structure context (full expensing as a company lever; link from the commercial section).
- `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` - broader deductions (keep the existing link).

**Keep / repoint existing links:** the current `/services` + `/contact` site routes are fine; the existing `what-does-a-property-accountant-do` + `how-to-choose-a-property-accountant` links may be kept (one each max) for the professional-advice close - but ensure the close carries NO pricing.

---

## Query-coverage plan

One row per `target_queries[]` item; each query assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| can you claim capital allowances on investment property | gsc | 1 | 81 | H1 + metaTitle |
| capital allowances on investment property in uk | adjacent | 3 | 43 | H2#2 (decision-table intro) |
| property capital allowances | adjacent | 4 | 51.3 | metaDescription |
| capital allowances property | adjacent | 2 | 48.5 | H2#10 (selling / broad body §) |
| rental capital allowances | adjacent | 1 | 67 | H2#2 (short-answer body §) |
| capital allowances for commercial property owners | adjacent | 1 | 76 | H2#5 (commercial) |
| capital allowance claim on commercial property | adjacent | 1 | 91 | FAQ#5 |
| capital allowances on leasehold property improvements | adjacent | 1 | 69 | H2#9 (leasehold / improvements) |
| capital allowances property improvements | adjacent | 1 | 75 | FAQ#9 |
| aia capital allowances | adjacent | 2 | 24 | FAQ#1 |
| can landlords claim capital allowances on residential property | adjacent | 0 | 0 | H2#3 (residential BTL) |
| capital allowances furnished holiday let | adjacent | 0 | 0 | H2#8 (former FHL) |
| capital allowances hmo common parts | adjacent | 0 | 0 | H2#4 (common parts / HMO) |
| can a landlord claim aia on rental property | adjacent | 0 | 0 | FAQ#2 |
| capital allowances mixed use property apportionment | adjacent | 0 | 0 | H2#6 (mixed-use) |

---

## Meta plan

- **metaTitle (≤ 62 chars; lead with the eligibility-answer hook + property cut):**
  - "Can Landlords Claim Capital Allowances? Property-Type Guide" (58) - recommended
  - alt: "Capital Allowances for Landlords: Can You Claim by Property" (58)
  - alt: "Can Landlords Claim Capital Allowances & AIA? (2026)" (52)
  (Keep the on-intent "Can Landlords Claim" spirit of the current title; add the property-type-answer differentiator.)
- **metaDescription (≤ 158 chars; eligibility-by-property-type + no pricing):**
  - "Can landlords claim capital allowances? It depends on the property. Residential, commercial, HMO common parts, mixed-use and former FHLs explained for 2026." (155) - recommended
- **h1:** "Can Landlords Claim Capital Allowances and the Annual Investment Allowance?" (keeps the exact eligibility head-term phrase at the front while signalling the property-type decision cut).
- **summary (frontmatter):** "Whether a landlord can claim capital allowances or the Annual Investment Allowance turns almost entirely on the type of property let. This guide gives the eligibility verdict by property type, standard residential buy-to-let, common parts of a block or HMO, commercial, mixed-use, serviced accommodation and former furnished holiday lets, grounded in the CAA 2001 s.35 dwelling-house rule and the Finance Act 2026 allowance changes, then points you to the right page to work out the amount."

---

## Schema plan

- **reviewer (E-E-A-T; REAL convention from the live corpus + `Property/web/src/lib/schema.ts` emit logic):**
  - `reviewedBy: "ICAEW Qualified Senior Reviewer"`
  - `reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"`
  (This is the established corpus reviewer convention used across the property blog; `schema.ts` emits it as a `reviewedBy` Person with `jobTitle` = credentials inside the BlogPosting. The current page is MISSING this block - add it.)
- **howTo:** **false.** This is an eligibility-decision / comparison page, not a step-by-step procedure. Do NOT populate `howToSteps`; no HowTo JSON-LD.
- **dateModified:** `2026-05-30`. Also update `sourcesVerifiedAt: 2026-05-30` and populate `sourceDomains` (add `legislation.gov.uk`, `gov.uk`).
- **JSON-LD blocks emitted:** **Article (BlogPosting)** (auto, via `buildBlogPostingJsonLd`, now carrying `reviewedBy`) + **FAQPage** (auto, from the frontmatter `faqs:` array - target 10-12; never hand-add FAQ schema in body). **No HowTo block.**

---

## House-position references (Stage 1)

- **§38 Capital allowances (CAA 2001) - FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified at legislation.gov.uk]: the **primary spine**. WDA 14% main / 6% special (FA 2026 s.28); 40% FYA (FA 2026 s.29 / CAA 2001 s.45U; on/after 1 Jan 2026; excludes cars + second-hand + overseas-leasing; NOT incorporation-restricted); AIA £1m permanent (s.51A(5) / F(No.2)A 2023 s.8); full expensing 100% companies-only (s.45S); s.35 dwelling-house bar + common-parts/integral-features carve-out; FHL abolition (FA 2025 Sch 5). **FA 2026 (c.11) RA 18 March 2026 - ENACTED. State as current law, never Bill-form.**
- **§25.1-§25.11 CAA 2001 cluster** [LOCKED 2026-05-23]: deep statutory detail. Thread §25.1 (qualifying activity, s.15 post-FHL omission), §25.2 (P&M + s.35 + s.21/22/23 + s.33A), §25.3 (AIA, s.51A), §25.6 (disposal mechanics, s.55/s.61/s.196 balancing charge), §25.7 (FHL transitional, FA 2025 Sch 5 grandfathered pools), §25.11 (s.198 + s.187A/s.187B pooling + 2-year deadline).
- **§6 FHL abolition transition** [LOCKED]: narrative spine for the FHL section (former FHL now taxed as standard residential; pooled allowances brought forward continue WDA; no new FHL P&M qualifies).
- **§4 Section 24** [LOCKED]: boundary - §4 is interest-cost relief; §38 is capital allowances. Keep the boundary clean (the source touches it; do not conflate).
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees (the Decision-E FAQ #4 strip); NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts - STALE_FACTS (seven) + PRICING_LEAK (one), all resolvable at write time against §38 + §25 + legislation.gov.uk.** Itemised in the gap-mode diagnosis above (AIA-permanent vs "for 2025/26"; absent WDA rates; absent 40% FYA; s.35 re-anchor vs "since April 2016 / HMRC view"; commercial "is a trade" over-statement → s.15 qualifying activity; the WRONG AIA-loss claim at line 108; FHL law mis-cite + thin; vague disposal/s.198). Plus the FAQ #4 pricing leak.

**Bill-vs-enacted verification (F-37 pattern, MANDATORY at write time):** §38 records **Finance Act 2026 (c.11), Royal Assent 18 March 2026, ENACTED.** State FA 2026 s.28 and s.29 as **current law** - never "Finance Bill 2026", "proposed", or "subject to Royal Assent". The execution session MUST nonetheless re-verify the FA 2026 c.11 Royal Assent date and the operative wording of CAA 2001 s.56(1) (now "14%", annotated as substituted by FA 2026 s.28(1)) directly on legislation.gov.uk before committing - this is the next instance of the program's Bill-vs-enacted discipline, run even when §38 already records ENACTED status. Also re-verify the consolidated inserted-section number for the 40% FYA (s.45U) before citing it; if not confirmed, cite FA 2026 s.29 only - never invent a section number.

**Flag to `track2_site_wide_flags.md`** (next available F-number at execution) as: `HIGH | capital-allowance-aia-property-landlords | STALE_FACTS + PRICING_LEAK | seven FA-2026/CAA-2001 corrections (AIA-permanent s.51A(5)/F(No.2)A 2023 s.8; add WDA 14%/6% FA 2026 s.28 + s.104D; add 40% FYA FA 2026 s.29/s.45U; re-anchor residential bar to s.35 not "April 2016 / HMRC view"; correct commercial "is a trade" to s.15(1)(b) qualifying activity; STRIP the wrong "AIA cannot create a loss" line; correct FHL cite to FA 2025 Sch 5 + grandfathered pools; firm up disposal/s.198 + 2-year deadline) PLUS Decision-E pricing-leak strip in FAQ #4. All resolvable against §38 + §25 + legislation.gov.uk at write time.`

---

## Universal rules - inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules (**NO em-dashes anywhere** - use commas, parentheses, full stops, middle dots; **anonymised social proof only; NO pricing/fees; exact figures + named statute**), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind utility classes in body; `<table>` is plain HTML), FAQs-and-schema (frontmatter `faqs:` array, target 10-12; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema in body), statute-citation discipline (F-8: statute content can be removed by amendment even when the URL is live - verify current wording).

**Critical for THIS brief:** **STRIP the Decision-E pricing leak** in FAQ #4 ("the cost of advice is usually far less than the tax saved") and ensure the professional-advice close carries NO pricing/fee language. **NO em-dashes.** FA 2026 s.28/s.29 stated as ENACTED law (RA 18 Mar 2026), never Bill-form. Lead-with-property-type-eligibility discipline: link OUT, do not re-derive sibling AIA/WDA/FYA mechanics.

---

## 19-step workflow - inherited from parent program with Track 2 deltas (do not restate)

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full 19-step legacy-rewrite workflow. **Track 2 deltas for this page:**
- Step 1: read house_positions §38 + §25 (all sub-sections) + §6 + §13 in full at session start.
- Step 4 (load-bearing): **verify FA 2026 c.11 RA 18 Mar 2026 + CAA 2001 s.56(1) = 14% (substituted by FA 2026 s.28(1)) + the FA 2026 s.29 40% FYA exclusions + the s.45U inserted-section number + s.51A(5) £1m + s.35 dwelling-house wording** on legislation.gov.uk before any rate or rule is written.
- Step 5: re-fetch the 4 competitor URLs; reject non-200; do not cite gated pages.
- Step 6: read the current `capital-allowance-aia-property-landlords.md` source in full.
- Step 7: read the cluster siblings to differentiate (link OUT, not duplicate): `capital-allowances-on-property`, `annual-investment-allowance-uk`, `capital-allowances-commercial-property-what-can-claim`, `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`, `commercial-property-fixtures-claim-s198-election-purchase-mechanics`.
- Step 8: plan outline: 9-10 H2s, ~2,600 body words, 10-12 FAQs, 2-3 worked examples, the property-type DECISION TABLE near the top + the optional 4-row rates reference table.
- Step 9: **rewrite markdown at existing path** (NOT a new file). Keep slug + canonical + category + image. Update `dateModified` + `sourcesVerifiedAt` to 2026-05-30; populate `sourceDomains` (add `legislation.gov.uk`, `gov.uk`). Add `reviewedBy` + `reviewerCredentials`. Rewrite metaTitle + metaDescription + h1 + summary per the Meta plan. **Remove the pricing FAQ; remove the wrong AIA-loss line.**
- Step 10: run site build: `cd Property/web && npm run build`. Must pass.
- Step 11 six-checks (+ deltas): FAQ schema count = frontmatter length (10-12); em-dash count = 0; Tailwind class count = 0; meta title ≤ 62; meta description ≤ 158; all internal links resolve; **+ pricing-check** (`£[0-9]` returns 0 fee-discussion matches; worked-example relief arithmetic is fine, fee/value comparison is not); **+ stale-fact scan** (`grep "April 2016"` = 0; `grep "for the 2025/26"` / `"for 2025/26"` re AIA cap = 0; `grep "cannot create or increase a loss"` = 0; `grep "FA 2024"` / `"Finance Act 2024"` re FHL = 0).
- Step 12: confirm NO redirect (REWRITE in place; the prior collapse-candidate flag is superseded).
- Step 13: insert/update `monitored_pages` row - **180-day window** (INVISIBLE-baseline page per F-11).
- Step 14: commit on `main`: `git commit -m "Track 2: rewrite capital-allowance-aia-property-landlords (eligibility-gateway reposition + 7 STALE_FACTS fixes + Decision-E pricing-leak strip)"`.

---

## Per-page work-log (for execution session - empty template)

### House-position alignment
- §38 / §25.3 AIA £1m permanent (s.51A(5) + F(No.2)A 2023 s.8): __
- §38 WDA 14%/6% (FA 2026 s.28 + s.104D) + straddling hybrid: __
- §38 40% FYA (FA 2026 s.29 / s.45U, exclusions, NOT incorporation-restricted): __
- §38 full expensing companies-only (s.45S) distinguished from 40% FYA: __
- §25.2 / s.35 dwelling-house bar + common-parts carve-out (replacing "April 2016 / HMRC view"): __
- §25.1 commercial = s.15(1)(b) qualifying activity (corrected from "is a trade"): __
- §6 + §25.7 FHL abolition (FA 2025 Sch 5; grandfathered pools): __
- §25.11 disposal / s.198 + pooling + 2-year deadline (touch + link OUT): __
- Wrong "AIA cannot create or increase a loss" line removed: __ (Y/N)
- FA 2026 c.11 RA 18 Mar 2026 + s.56(1)=14% + s.45U re-verified on legislation.gov.uk: __ (Y/N + date)

### Comparison: before vs after
- Word count: 1,456 → __ (target ~2,600)
- H2 count: 9 → __ (target 9-10)
- FAQ count: 4 → __ (target 10-12)
- Worked examples: 0 → __ (target 2-3)
- Decision/triage table: 0 → 1 (property-type eligibility) + optional rates reference
- Authority links: 0 → __ (target 5-7, legislation.gov.uk-anchored)
- Internal OUT-links to cluster deep-dives: __ (eligibility-gateway routing)
- Reviewer block (reviewedBy / reviewerCredentials): absent → added
- Pricing-leak FAQ removed: __ (Y/N)
- Meta title: "Capital Allowance AIA: Can Landlords Claim It?" → __
- Meta description: __

### Flags raised
- STALE_FACTS seven-correction flag (carried from brief): __ confirmed applied
- PRICING_LEAK Decision-E strip (carried from brief): __ confirmed applied
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
