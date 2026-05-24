# Track 2 brief: capital-gains-tax-selling-rental-property-uk

**Site:** property
**Brief type:** Legacy rewrite — Batch 2 Sub-bucket A (CGT cluster-collapse continuation, F-16 — DIFFERENT canonical from B2-A1/A2)
**Source markdown path:** `Property/web/content/blog/capital-gains-tax-selling-rental-property-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/capital-gains-tax-selling-rental-property-uk
**Stage 1 priority:** L (6 imp / 0 clicks / 6 distinct queries / avg pos 49-85 = below page 5 territory; cluster cannibalisation against rewritten BTL-CGT calculation canonical that already owns the rental-property-CGT query family; recent `dateModified` 2026-05-18 indicates a prior touch-up but no GSC traction)
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24
**Cannibalisation status:** **REDIRECT-PROPOSED → `cgt-selling-buy-to-let-property-calculation-guide`** (the rewritten Session B #14 sibling, shipped 2026-05-21, per Cannib Index §6 cross-source pair list line 231: *"capital-gains-tax-selling-rental-property-uk (residual) vs cgt-selling-buy-to-let-property-calculation-guide (rewritten 2026-05-21)"*). **DIFFERENT canonical from the 60-day-reporting cluster** (B2-A1/A2 redirect to `cgt-payment-deadlines-property-sales-2026`); this is the BTL-CGT-calculation cluster.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** propose retire via 301 redirect to `cgt-selling-buy-to-let-property-calculation-guide`. The slug `capital-gains-tax-selling-rental-property-uk` carries the verbose-generic framing ("Capital Gains on Selling a Rental Property") whose intent is materially identical to the rewritten canonical's *"How Is CGT Calculated When Selling a Buy-to-Let Property? Step-by-Step Guide"*. Both pages walk: rates (18%/24%), AEA (£3,000), allowable deductions (purchase + sale + improvement costs), worked CGT calculation example, PRR + Lettings Relief overview, joint-ownership AEA pooling, non-resident note, 60-day reporting cross-reference. The canonical is newer, structurally better (Session B #14 rewritten), and intentionally owns the BTL-CGT calculation query family at the 2026-05-21 rewrite pass.
- **Category:** `capital-gains-tax` (unchanged at redirect).
- **Gap-mode tag:** `CANNIBAL` (primary, against rewritten Session B #14 canonical) + `INVISIBLE-ADJACENT` (secondary — 6 imp at avg pos 49-85 is below the F-11 "invisible" threshold's strict definition but functionally equivalent: page-5+ rankings produce zero clicks regardless; not strictly zero-imp but effectively unreachable) + `STALE_FACTUAL` (tertiary — multiple 2025/26 year-stamps on a page that received a `dateModified` touch-up on 2026-05-18 but kept stale framings + missing post-FA-2024 24% emphasis on the AEA pooling angle).
- **"Why this rewrite" angle:** there is no rewrite worth doing. The canonical at `cgt-selling-buy-to-let-property-calculation-guide` already owns the BTL-CGT calculation intent. The legacy page is shadowed at depth-30-50+ positions on its own primary queries (`capital gains on rental property sold` pos 13, `taxes on sale of rental property` pos 76, etc.). Position 49-85 is essentially "not in the index for that query"; 6 impressions across 6 queries is below the consolidation-decision-noise threshold. Rewriting in place would re-create cannibalisation against the canonical. Redirect consolidates.

---

## Current page snapshot (Stage 2 — pulled from filesystem + Supabase)

**Supabase `page_content_map`:** no row — same INVISIBLE-page pattern; pages without `page_content_map` rows weren't selected by the SERP-runner.

**Filesystem source read (`Property/web/content/blog/capital-gains-tax-selling-rental-property-uk.md`):**
- Date 2026-04-10. **`dateModified` 2026-05-18** — interesting signal: page received an editorial touch-up **3 days before the 2026-05-21 rewrite pass** that shipped the canonical. This is the prior-rewrite-attempt pattern noted at Batch 1 B1-B2 (`metaTitle_prev` / `metaDescription_prev` evidence of failed CTR-fix attempt before redirect decision). Pattern hypothesis: this page got its `dateModified` 2026-05-18 touch-up as part of the same pre-rewrite-pass curation that produced the canonical — and the team chose to write a fresh canonical rather than rewrite-in-place. The legacy page was left as a sibling — but now warrants redirect because Google has not promoted it post-touch-up.
- Title: "Capital Gains on Selling a Rental Property: 2025/26 UK Guide" (note: title carries **2025/26 year-stamp** despite 2026-05-18 dateModified — partial-touch only, year-stamp wasn't refreshed).
- metaTitle: "CGT on Selling a Rental Property: 2025/26 UK Guide" (49 chars — same 2025/26 stale year-stamp).
- metaDescription: "Capital gains on selling a rental property in 2025/26: 18% basic rate, 24% higher rate, £3,000 allowance, 60-day reporting. Full guide for UK landlords." (155 chars — at cap; rates correct per §5 LOCKED but year-stamp stale).
- h1: "Capital Gains on Selling a Rental Property: 2025/26 UK Guide" (matches title).
- Body word count: ~2,000 words.
- 12 H2 sections (`What Is Capital Gains Tax When Selling a Rental Property?`, `How Is Capital Gains Tax Calculated on a Rental Property?`, `What Deductions Can You Claim Against Capital Gains?`, `When Do You Need to Report and Pay CGT?`, `What About Principal Private Residence Relief?`, `How Does Joint Ownership Affect CGT?`, `Can You Reduce CGT by Incorporating?`, `What If You Sell at a Loss?`, `Non-Resident Landlords and CGT`, `Making Tax Digital and CGT Reporting`, `Common Mistakes Landlords Make with CGT`, `When Should You Get Professional Advice?`, `Summary of Key Points for 2025/26`).
- 4 FAQs in frontmatter.
- 1 worked example: £400k sale / £250k purchase / £8k allowable deductions / £62k net / £59k taxable / £14,160 CGT at higher rate. Uses 2025/26 framing.
- 7 internal links (Section 24 guides x2, PRR pillar, BTL ltd-co pillar, MTD landlords page, property accountant services page, complete property investment tax guide). Heavier internal-link footprint than B2-A1/A2.
- 0 outbound authority links.
- No schema-attached reviewer or sourcesVerifiedAt.

**House-position drift visible in source:**
- **Title + metaTitle + metaDescription + h1 + Summary section all carry 2025/26 year-stamp** despite 2026-05-18 dateModified. Partial-touch — the body section headings and the worked example all use 2025/26 framing; the metaDescription rates (18% / 24% / £3,000 AEA) are correct per §5 LOCKED for 2026/27, so the figures are valid carrying forward but the **year-stamps are pervasively stale across 5+ surface locations**. This is the most acute year-stamp drift among the 3 Sub-bucket A briefs.
- **§"Can You Reduce CGT by Incorporating?"** (line 94) asserts: *"When you sell a property owned by a company, the gain is subject to corporation tax at 19% or 25%, rather than CGT at 18% or 24%."* Same wrong-tax-term-AND-wrong-threshold pattern as B1-A2 F-9 caught: companies pay **Corporation Tax** on chargeable gains (not CGT); 19% applies up to £50k profits, 25% from £250k, marginal relief between. The legacy page conflates the rate range (19% OR 25% without explaining the threshold) and uses the right tax name once but then loops back to CGT framing implicitly. Resolved by redirect (canonical handles incorporation as a separate page-link reference; doesn't repeat the rate confusion).
- **§"Lettings Relief"** paragraph (line 80): *"Lettings relief was significantly restricted from April 2020 and now only applies if you lived with your tenant."* Correct per §5 LOCKED post-2020 shared-occupation rule. Not flagged.
- **§"Non-Resident Landlords and CGT"** (line 108): *"If you are a non-resident landlord selling UK property, you are still liable for UK capital gains tax. The same rates apply: 18% basic rate and 24% higher rate. However, you have a 60-day reporting requirement that applies from the date of completion, just like UK residents."* Correct per §17.4 LOCKED on rates + reporting, **but missing the non-resident-must-report-every-disposal rule** (UK residents file only where tax is due; non-residents file for every disposal). Same drift pattern as B2-A1/A2 + B1-B1/B2 FAQ #1/2. Resolved by redirect — canonical at `cgt-selling-buy-to-let-property-calculation-guide` handles non-resident framing per its FAQ #3 line 20 (*"all residential property disposals must be reported to HMRC within 60 days of completion, even if you've made a loss"*).
- **§"What If You Sell at a Loss?"** (line 106): *"Losses must be reported to HMRC within 4 years of the end of the tax year in which they occurred. If you miss this deadline, the loss is lost."* This is **correct per TMA 1970 s.43** (verified 2026-05-24 via WebFetch of legislation.gov.uk/ukpga/1970/9/section/43: *"no claim for relief in respect of income tax or capital gains tax may be made more than 4 years after the end of the year of assessment to which it relates"*). One of the few correctly-framed paragraphs in the source. Aligns with the open recommendation in Decision #2 (TMA 1970 s.43 house-position lock pending Wave 7+) — flagged below as D-12 because this paragraph is actually correct and could be **lifted** to the canonical at execution time as a side-task (canonical's worked example doesn't carry the 4-year claim deadline; B2-A3 source has it correct).
- **§"Making Tax Digital and CGT Reporting"** (line 116) asserts: *"From April 2026, Making Tax Digital for Income Tax becomes mandatory for landlords with qualifying income over £50,000 (the MTD-for-ITSA threshold from 6 April 2026, falling to £30,000 from 6 April 2027 and £20,000 from 6 April 2028 per §3)."* Correct per §3 LOCKED MTD schedule. Not flagged.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-24 PM from Supabase via `python -m optimisation_engine.track2.pull_page_data --slug capital-gains-tax-selling-rental-property-uk --days 90`.**

**Aggregate: 6 impressions / 0 clicks / 6 distinct queries / avg position 13.00-85.00 across queries** in 90-day window. All 6 queries are 1-impression noise at page-5+ depth.

### All 6 queries (full)

| imp | clk | avg pos | CTR | query |
|---:|---:|---:|---:|---|
| 1 | 0 | 65.00 | 0.00% | capital gains on rental properties |
| 1 | 0 | 13.00 | 0.00% | capital gains on rental property sold |
| 1 | 0 | 64.00 | 0.00% | capital gains tax for rental property |
| 1 | 0 | 55.00 | 0.00% | capital gains tax when selling investment property |
| 1 | 0 | 85.00 | 0.00% | rental property capital gains tax |
| 1 | 0 | 76.00 | 0.00% | rental property capital gains tax |

(Note: the 5th and 6th rows appear as separate entries in the data pull but both anchor on `rental property capital gains tax` with different avg positions — likely two separate impression events on the same query with Google rotating position between snapshots.)

**GA4 engagement signal (REAL data from `ga4_page_data`):** no GA4 rows in 90-day window. Same as B2-A2 — zero internal-link traffic.

**Comparison with the redirect target `cgt-selling-buy-to-let-property-calculation-guide` (real GSC data, same 90-day window, pulled at the same time):**

| Metric | This page (B2-A3) | Redirect target |
|---|---|---|
| Total impressions | 6 | **(none)** — also zero GSC rows in 90-day window |
| Total clicks | 0 | 0 |
| Distinct queries | 6 | 0 |
| Top query | `rental property capital gains tax` pos 76-85 | (none) |
| Number of queries at top-10 positions | 0 | 0 |
| GA4 sessions | 0 | (no GA4 rows) |

**Critical observation:** the redirect target ALSO has zero GSC signal in the 90-day window — both pages are effectively invisible. **This is a different cluster-collapse story than the 60-day-reporting cluster** (where the canonical had 262 imp dominating the cluster). Here, **neither page is winning** — both are too new / too undifferentiated for Google to surface in the BTL-CGT calculation SERP. The dominant SERP holders for the BTL-CGT calculation query family are external (taxfix, capitalgainstax, simplybusiness, hmrcsuccess types) per the gold-reference T4 brief's competitor analysis.

**Pattern analysis — why redirect anyway despite both pages being invisible:** the cannibalisation is real even when neither page ranks. Two pages on the same topic split Google's crawl-budget signal, dilute internal link equity, and confuse internal-link routing decisions. The canonical is the structurally newer (Session B #14 rewritten 2026-05-21) and intentionally chosen sibling per the 2026-05-21 rewrite pass topology. Redirecting the legacy to the canonical:
- Consolidates internal link signal (this page has 7 internal links, the canonical likely has ~5-6 — combined cluster-link concentration goes to one URL)
- Removes a dead-weight cannibalisation candidate from the crawl
- Honours the 2026-05-21 rewrite pass intent (the team chose the canonical as the cluster's owner; the legacy was left as a pending-decision)
- Costs nothing on the GSC side (zero impressions to consolidate; zero clicks lost)
- Aligns with the F-16 cluster-collapse continuation principle: where a 2026-05-21-rewrite canonical exists and a legacy near-duplicate also exists, redirect the legacy

**Distinct from B2-A1/A2:** B2-A1/A2 redirect to a canonical that has 262 imp (where consolidation banks measurable cluster lift). B2-A3 redirects to a canonical that has 0 imp (where consolidation is purely housekeeping). Both are right calls; the second is lower-stakes.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CANNIBAL (cross-source — different canonical from sibling B2-A1/A2).** This page targets the BTL-CGT calculation intent; the rewritten Session B #14 canonical `cgt-selling-buy-to-let-property-calculation-guide` was written 2026-05-21 to own that intent. Both pages cover essentially identical scope (rates, AEA, deductions, worked example, PRR/Lettings, joint ownership, non-resident, MTD note). Keeping both perpetuates the split-equity issue + confuses internal-link routing.

**Secondary: INVISIBLE-ADJACENT (functionally invisible despite 6 imp).** 6 impressions at positions 13-85 across 6 distinct queries is a noise-level signal — every one of those queries puts our page below where any rational user clicks. Position-49-to-85 is "not in the SERP" territory. Effectively the same outcome as B2-A1/A2 zero-imp pages, just with a touch of background-noise instead of complete silence.

**Tertiary: STALE_FACTUAL (pervasive year-stamp drift + wrong corporation-tax framing).** Two discrete drift issues catalogued in Section 4 above: (1) 2025/26 year-stamp pervasive across 5+ surface locations including title + metaTitle + metaDescription + h1 + Summary section + multiple body section headings despite a 2026-05-18 `dateModified` touch-up that should have refreshed them, (2) §"Can You Reduce CGT by Incorporating?" conflates CGT with corporation tax and omits the marginal-relief threshold mechanic (same wrong-tax-term-AND-wrong-threshold pattern as B1-A2 F-9 caught). None require body fixing because the page is going away.

**Load-bearing fix (ordered by ROI):**

1. **Add 301 redirect** from `/blog/capital-gains-tax/capital-gains-tax-selling-rental-property-uk` → `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide` in `Property/web/src/middleware.ts`.
2. **Delete (or move to `_redirected/`) the source markdown** at execution time.
3. **Update or insert `monitored_pages` Supabase row** with `tracking_type = redirect_post` for the 90-day post-redirect regression detector. 6 baseline imp + 0 baseline clicks + 0 baseline GA4 sessions makes this row a low-stakes sentinel — primarily tracks the canonical's future signal accrual rather than meaningful traffic-loss risk.
4. **Internal-link survey at this slug — moderate footprint expected** given 7 outbound internal links on this page suggest a bi-directional cluster topology with corresponding inbound links from related pages. Grep `Property/web/content/blog/*.md` + `Property/web/src/**/*.tsx` for `capital-gains-tax-selling-rental-property-uk`. Likely 2-5 survivors based on the cluster's internal topology (CGT pillar, PRR pillar, BTL ltd-co pillar likely link to it; Section 24 guides may too). Update each survivor to the canonical slug.
5. **DO NOT bundle with B2-A1/A2 commit** — this redirects to a different canonical, so requires a separate commit per the Sub-bucket A bundling discipline.
6. **Side-task at execution (D-12 flag — manager decision):** consider lifting the source's §"What If You Sell at a Loss?" 4-year-claim-deadline paragraph (which is correctly framed per TMA 1970 s.43) into the canonical's body before deleting the source. The canonical's worked example doesn't carry the 4-year claim deadline; this is a depth-up opportunity at the canonical that the legacy already has correctly written. Separate brief + separate commit if yes.

**No body rewrite, no FAQ expansion, no metaTitle test.** All of those efforts at the canonical, not here.

---

## Competitor URLs (Stage 2 — different cluster from B2-A1/A2; BTL CGT calculation cluster)

The BTL-CGT calculation cluster competitors were analysed during the gold-reference T4 trial brief 2026-05-23. Three URLs verified at that exercise:

| URL | Status | Word count | FAQs | Statute cites | Rates table | Notes |
|---|---|---|---|---|---|---|
| https://capitalgainstax.co.uk/capital-gains-tax-rates-uk | Verified 200 OK at T4 trial 2026-05-23 (gold-reference brief). Re-verification at Batch 2 blocked by WebFetch permission denial — flagged for manager 5% sample re-check. | ~1,900 | 0 | 0 | No (prose only) | 18%/24% correct, £3k AEA correct, PPR; missing joint ownership planning, April 2027, BADR. |
| https://uklandlordtax.co.uk/cgt-on-residential-property/ | Verified at T4 trial — redirected to PRR page; not a rates/calc comparator | ~550 | 0 | 0 (1 case law) | No | Niche PRR scenario only. |
| https://taxfix.com/en-uk/the-tax-basics/capital-gains-tax-rates-uk/ | Verified 200 OK at T4 trial 2026-05-23. | ~1,200 | 0 | 0 | **Yes (2 tables)** | 18%/24% correct, £3k AEA, BADR; missing joint ownership, April 2027. |
| https://www.gov.uk/capital-gains-tax/rates | **200 OK + content verified 2026-05-24** (fresh WebFetch at Batch 2 brief drafting). Confirms 18%/24% from 6 April 2026 + £3,000 AEA for 2026/27 + BADR at 18% (post-FA-2024 alignment). | shallow narrative + worked examples (no rates table) | 0 | None on consumer page | Authoritative gov.uk reference; matches §5 LOCKED. |

**Competitor depth context:** the BTL-CGT calculation cluster competitors are 1,200-1,900 words / 0 FAQs / 0 statute citations — mid-shallow. The canonical at `cgt-selling-buy-to-let-property-calculation-guide` (which is the redirect target) is structurally similar mid-depth per the source read 2026-05-24. The cluster doesn't currently have a best-in-class authority comparator like ATT's 8,500-word guide for the 60-day-reporting cluster — opportunity flagged as D-13 for future canonical-level depth-up consideration (separate workstream).

**No competitor URLs to borrow for this brief specifically** because the recommendation is REDIRECT, not REWRITE. Listed above for context on the cluster's competitive depth ceiling.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-24 PM for Batch 2 prep). Section §6 cross-source pair list line 231 explicitly pairs this slug with the canonical: *"capital-gains-tax-selling-rental-property-uk (residual) vs cgt-selling-buy-to-let-property-calculation-guide (rewritten 2026-05-21)"*.

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | capital-gains-tax-selling-rental-property-uk | REDIRECT-PROPOSED (this brief) | redirect to BTL-CGT calculation canonical |
| Excluded (rewritten 2026-05-21) | cgt-selling-buy-to-let-property-calculation-guide (Session B #14) | **CANONICAL** | absorbs this redirect (different canonical from B2-A1/A2's `cgt-payment-deadlines-property-sales-2026`) |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk (Session C #47) | CGT pillar | Unaffected |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances (Session C #17) | Disposal mechanics sibling | Unaffected — disposal mechanics is distinct from BTL calculation |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step (Session C #35) | Calculation walkthrough | **Potential adjacent cluster** — sibling Session C #35 also covers "calculation walkthrough" for BTL CGT. Both #14 and #35 exist in the rewrite pass — implies the team intentionally maintained two angles (`cgt-selling-buy-to-let-property-calculation-guide` vs `cgt-calculation-selling-buy-to-let-property-step-by-step`). Per Cannib Index §6, pair is `capital-gains-tax-selling-rental-property-uk vs cgt-selling-buy-to-let-property-calculation-guide` — the team named #14 as the redirect target, not #35. Respecting that choice. |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | 60-day deadlines canonical (B2-A1/A2 target) | Unaffected — different cluster |
| Trial (gold reference) | cgt-rates-property-2026-27-current-rates-explained (T4) | Rates+planning sibling | Unaffected — different cluster (rates explainer vs BTL calculation) |
| Residual (related) | (no other residual BTL-CGT calculation slugs identified at brief drafting) | — | Single-page collapse rather than multi-page cluster collapse |
| Wave 5 (shipped) | — | — | No collisions — BTL-CGT calculation cluster orthogonal to VAT/Devolved/Form 17 |
| Wave 6 (shipped) | — | — | No collisions — Wave 6 buckets orthogonal to BTL-CGT calculation. **Note:** Wave 6 A4 (`mvl-members-voluntary-liquidation-property-company-cgt-vs-income-treatment`) touches LtdCo CGT angle but that's company-final-distribution CGT, distinct from BTL individual CGT calculation. |
| Wave 7 (in prep) | — | — | No collisions — Wave 7 buckets don't touch BTL CGT calculation |

**Conclusion:** REDIRECT-PROPOSED to `cgt-selling-buy-to-let-property-calculation-guide` (DIFFERENT canonical from B2-A1/A2). No FLAG-MANAGER. Single-page redirect rather than multi-page cluster collapse — unlike the F-16 5-page collapse, this is a 1-to-1 redirect that completes a pair-resolution per Cannib Index §6.

---

## Closest existing pages (Stage 2)

After redirect, the survivor sibling map for the BTL-CGT calculation topic on `propertytaxpartners.co.uk`:

- **Canonical (this redirect's target):** `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide`
- **Parent pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`
- **Calculation walkthrough sibling:** `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step` (separate angle: step-by-step calculation; coexists with the canonical per 2026-05-21 rewrite pass intent)
- **Disposal mechanics sibling:** `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances`
- **60-day deadlines canonical (B2-A1/A2 target):** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`
- **AEA depth sibling:** `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27`
- **Rates + planning sibling:** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (trial gold reference)
- **Gifting reliefs sibling:** `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk`
- **PRR sibling:** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (residual; B2-B1 REWRITE in flight at this batch)
- **Incorporation sibling:** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` (rewritten; the canonical already cross-references this)

**Internal-link survey at this slug** (to be verified at execution): expect **2-5 internal-link survivors** based on the cluster's internal topology. This page has 7 outbound internal links suggesting bi-directional cluster topology with corresponding inbound. Likely inbound sources to check: CGT pillar, PRR pillar, BTL ltd-co pillar, Section 24 guides, property accountant services. Moderate execution task — heavier than B2-A2's zero-GA4 light footprint, lighter than B2-A1's 12-GA4-session footprint.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: governs rates (18%/24%), AEA (£3,000), Lettings Relief (post-2020 shared-occupation only), s.58 spouse no-gain-no-loss, 60-day return UK-resident-only-where-tax-due rule. Page asserts most correctly but year-stamps 2025/26 throughout and §"Non-Resident" misses the every-disposal rule for non-residents per §17.4.
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22]: §17.4 NRCGT 60-day return — every non-resident UK land disposal regardless of tax due. Page §"Non-Resident Landlords and CGT" partially covers but lacks the "regardless of tax due" assertion. Resolved by redirect.
- **§19 MTD for ITSA** [LOCKED 2026-05-22]: §3 MTD schedule (£50k from 6 April 2026, £30k from 6 April 2027, £20k from 6 April 2028). Page §"Making Tax Digital and CGT Reporting" is correctly framed. Not flagged.
- **§7 April 2027 property income tax surcharge** [LOCKED — REMAINS Bill-form-hedge]: this page does NOT touch the April 2027 surcharge in body (correct scope discipline — page is CGT-focused, surcharge is income-tax). Not in scope.
- **§21 LtdCo + corporation tax mechanics**: relevant to the page's §"Can You Reduce CGT by Incorporating?" stale framing. Same drift pattern as B1-A2 F-9 caught: conflates CGT with corporation tax + misstates the 19%/25% threshold structure. Resolved by redirect (canonical at `cgt-selling-buy-to-let-property-calculation-guide` cross-links to the incorporation guide rather than re-summarising the rates inline).
- **§13 Do-not-write list** [LOCKED]: relevant to F-1 lesson on pricing (legacy page doesn't carry pricing leaks — checked at source read). No conflict.

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts in source (mixed severity, all resolved by REDIRECT not REWRITE):**

1. **Pervasive 2025/26 year-stamp drift** (HIGH — title + metaTitle + metaDescription + h1 + body Summary section + multiple body section headings) — figures correct numerically per §5 LOCKED, year-stamps obsolete on a page touched 2026-05-18 that should have been year-bumped to 2026/27. Resolved by redirect (canonical uses 2025/26 year-stamp at lines 28-29 + 34 + 69 + 100-103 in the canonical source — **also stale year-stamp**; raised as D-14 for canonical depth-up consideration).
2. **§"Can You Reduce CGT by Incorporating?"** (line 94) — CGT vs corporation tax conflation + missing marginal relief threshold detail. Same drift pattern as B1-A2 F-9 caught. Resolved by redirect (canonical cross-links to incorporation guide rather than inlining the rate framing).
3. **§"Non-Resident Landlords and CGT"** (line 108) — missing "regardless of tax due" for non-residents per §17.4 LOCKED. Resolved by redirect (canonical FAQ #3 explicitly covers "all residential property disposals must be reported to HMRC within 60 days of completion, even if you've made a loss" — substantially correct).
4. **§"What If You Sell at a Loss?"** (line 106) — **CORRECTLY framed** per TMA 1970 s.43 (4-year claim deadline, verified 2026-05-24 via WebFetch of legislation.gov.uk/ukpga/1970/9/section/43). Not a conflict; flagged as a **lift opportunity** (D-12) — this paragraph is materially better than the canonical's current loss-treatment framing and could be lifted to the canonical's body as a side-task at execution.

These conflicts are flagged as discovery for the manager. Spot-check of the canonical (from `cgt-selling-buy-to-let-property-calculation-guide.md` body read 2026-05-24) confirms it handles #2, #3 via cross-link routing (rather than inlining). #1 is NOT resolved by redirect — **the canonical also carries 2025/26 year-stamps** (D-14 raised for canonical depth-up). #4 is a lift opportunity.

**No F-13-equivalent statute-citation drift catch at this canonical** — verified via source read 2026-05-24 that the canonical does not assert any Finance Act citations (uses general references to "18%/24% post-FA-2024" framing in body but does NOT cite specific statute sections that could carry the §16.36 statutory-cite-gate hallucination risk). Clean on F-8/F-13 patterns.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification 2026-05-24)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/capital-gains-tax/rates | **200 OK + content verified 2026-05-24** (fresh WebFetch at Batch 2 brief drafting). Confirms 18%/24% from 6 April 2026 + £3,000 AEA for 2026/27 + BADR at 18%. | Authoritative consumer-page reference; matches §5 LOCKED. Could be linked from the canonical at depth-up. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | **200 OK + content verified 2026-05-24** (fresh WebFetch at Batch 2 brief drafting). Confirms PRR mechanics; s.222(5) main residence election; subsection 5A late-election route inserted by FA 2020. | TCGA 1992 s.222 PRR statute. Relevant to canonical's PRR cross-link routing (canonical mentions PRR; this URL would be the depth-up citation). Not directly needed for this redirect brief. |
| https://www.legislation.gov.uk/ukpga/1970/9/section/43 | **200 OK + content verified 2026-05-24** (fresh WebFetch at Batch 2 brief drafting). 4-year claim deadline verbatim: *"no claim for relief in respect of income tax or capital gains tax may be made more than 4 years after the end of the year of assessment to which it relates."* | TMA 1970 s.43 4-year claim deadline. Relevant to D-12 lift opportunity (canonical could absorb this paragraph from the legacy). Per launch prompt directive (Decision #2 PARTIALLY RESOLVED via wave6 flags addendum). |

**(Execution session for the redirect commit doesn't need to cite any of these in body — there is no body. Listed for completeness against the §4 brief template + per launch prompt §7 directive to cite TMA 1970 s.43 directly from legislation.gov.uk where relevant.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: same restricted REDIRECT-case subset as B1-B1 / B1-B2 / B1-B3 / B2-A1 / B2-A2 briefs.

- **§16.14** absolute-path tracker edits.
- **§16.31** URL liveness — 3 authority URLs verified live at Batch 2 brief drafting via fresh WebFetch (legislation.gov.uk x2 + gov.uk x1); 3 competitor URLs verified at T4 trial 2026-05-23 carrying-forward (re-verification at Batch 2 blocked by WebFetch permission denial — flagged).
- **§16.18** reasoning-first cannib decision — applied (semantic comparison vs canonical + cross-source pair list in Cannib Index §6).
- **§16.36** statute citation cross-check gate — applied; no statute-citation drift identified at this canonical (no F-13 equivalent).
- **§16.42** EXISTING_PAGE_STALE density at adjacent residual pages — three discovery items raised below. **Notable cross-source surface area:** the canonical itself carries the same 2025/26 year-stamp drift as this legacy (D-14) — Wave 6 close lesson §16.42 confirmed (stale density tracks statutory novelty + adjacent-content age; the pre-2026-05-21-rewrite-pass canonical generation didn't year-bump even though it shipped 2026-05-21).
- **§16.44** WebFetch summarizer table-content trust — not applicable to this brief.
- **No em-dash discipline** — not applicable; no body content authored.
- **Quality bar §4.3 six-check** — applied (no redirect loop; moderate internal-link footprint expected at execution; no broken links if grep returns expected 2-5 hits).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: same compressed REDIRECT workflow as B1-B1 / B1-B2 / B1-B3 / B2-A1 / B2-A2, with this slug + different canonical substituted:

**REDIRECT execution workflow (compressed):**

1. Read this brief end-to-end.
2. Claim the row in `track2_page_tracker.md` (mark 🟡 stage2_executing → ✅ executed) via absolute path.
3. Verify the canonical (`cgt-selling-buy-to-let-property-calculation-guide`) still exists and is the right redirect target. Re-check Cannib Index §6 cross-source pair list at execution; confirm no Wave 7+ touched the canonical.
4. Add 301 redirect in `Property/web/src/middleware.ts`: `/blog/capital-gains-tax/capital-gains-tax-selling-rental-property-uk` → `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide`.
5. Delete (or move to `_redirected/`) the source markdown at `Property/web/content/blog/capital-gains-tax-selling-rental-property-uk.md`.
6. **Grep for internal links** pointing to this slug across `Property/web/content/blog/*.md` and `Property/web/src/**/*.tsx`. Expect 2-5 survivors based on the cluster's bi-directional topology. Update each to the canonical slug.
7. Build site (`cd Property/web && npm run build`). Must pass. Confirm sitemap regenerates without the old slug.
8. Insert a `monitored_pages` row with `tracking_type = redirect_post`, `redirect_date = today`, `redirect_source_slug = capital-gains-tax-selling-rental-property-uk`, `redirect_target_slug = cgt-selling-buy-to-let-property-calculation-guide`, 90-day window.
9. **Commit (SEPARATE from B2-A1/A2 bundle — different canonical)** on `main`: `git commit -m "Track 2A: redirect legacy capital-gains-tax-selling-rental-property-uk to BTL-CGT calculation canonical (CANNIBAL pair resolution per Cannib Index §6)"`. Tracker edits to main repo file via absolute paths only.
10. Mark tracker ✅ executed for B2-A3.
11. Log any execution-time surprises to `track2_site_wide_flags.md`.

**Coordinate with parallel B2-A1/A2 redirects:** B2-A1 + B2-A2 bundle into one commit (60-day-CGT canonical); B2-A3 lands in a separate commit (BTL-CGT calculation canonical). Both commits can land in the same Phase 3 batch deploy — separating commits keeps monitored_pages signal disaggregation clean across the two clusters.

**Side-task at execution (manager decision, per D-12 below):** consider whether to lift the legacy page's §"What If You Sell at a Loss?" 4-year-claim-deadline paragraph (TMA 1970 s.43, correctly framed) into the canonical's body as a depth-up before deletion. The canonical's worked example doesn't carry the 4-year claim deadline; B2-A3 source has it correct. Separate brief + separate commit if yes; do not bundle with the redirect commit.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-redirect verification

- Canonical still at expected path: __
- Canonical's content factually current (cross-check 2025/26 → 2026/27 year-stamp drift per D-14): __
- Cannib Index §6 cross-source pair still recommends this redirect target: __
- monitored_pages baseline for canonical pulled: __ imp / __ clicks / __ queries (expect: 0 imp / 0 clicks / 0 queries — same INVISIBLE state as the legacy)

### Redirect commit (separate from B2-A1/A2)

- Middleware rule landed: __
- Source markdown removed/moved: __
- Internal-link survivors patched (file:line list — expect 2-5 hits): __
- Build pass: __
- monitored_pages row inserted: __
- Commit hash: __

### Side-task: 4-year-claim-deadline lift to canonical (D-12)

- Manager decision: lift §"What If You Sell at a Loss?" paragraph to canonical? __ Yes / __ No
- If yes: separate brief drafted at: __
- If yes: separate commit hash: __

### Post-redirect monitoring

- 30-day check: canonical's signal accrual on `rental property capital gains tax` query family: __
- 60-day check: canonical's BTL-CGT calculation cluster total impressions trended +/-: __
- 90-day check: monitored_pages detector firing or quiet: __

### Flags raised during execution

- D-12 (4-year-claim-deadline lift opportunity): actioned / queued / dismissed: __
- D-13 (canonical depth-up needed — no best-in-class authority comparator yet for this cluster): queued for future-batch consideration: __
- D-14 (canonical 2025/26 year-stamp drift — same drift as the legacy; not resolved by redirect): queued for canonical depth-up: __
- Any new flags: __

### 2-3 sentence summary

- (populated at execution time)
