# Track 2 brief: rental-yield-vs-roi-property-investors-uk

**Site:** property
**Brief type:** Legacy rewrite — gold-reference depth (yield-cluster repositioning to the comparison/leverage head term)
**Source markdown path:** `Property/web/content/blog/rental-yield-vs-roi-property-investors-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/portfolio-management/rental-yield-vs-roi-property-investors-uk
**Stage 1 priority:** M-H (owns the only "yield vs roi" / "buy to let roi" comparison head-term surface in a 5-page yield cluster; repositioning protects the cluster from a self-cannibalising collapse)
**Stage 1 date:** 2026-05-29
**Stage 2 enrichment date:** 2026-05-29
**Cannibalisation status:** REWRITE (decisive reposition — no redirect-collapse; this is the only cluster page anchored to the comparison/leverage/ROI intent)

> This brief matches the gold-reference depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the city-rewrite structure of `briefs/property/track2/trial/birmingham-property-accountant.md`. The dominant move is NOT a depth-add of yield formulas (the cluster already owns those, better) — it is a DECISIVE REPOSITION away from yield-calculation duplication toward the comparison + leverage / cash-on-cash / total-return dimension that no existing page owns.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `rental-yield-vs-roi-property-investors-uk`. The slug carries the "X vs Y" head term and is the only page in the yield cluster anchored to the comparison intent. Collapsing it would discard the "yield vs roi" / "buy to let roi" / "roi on property" / "cash on cash return uk" query surface. No redirect proposed.
- **Category:** `Portfolio Management` (kept). Canonical kept (`/blog/portfolio-management/...`).
- **Gap-mode tag:** `INVISIBLE` (primary — page duplicates better-covered siblings and owns no distinct intent in its current form) + `THIN_DEPTH` (1,047 words vs a 3,000 target and vs longer siblings) + `STRUCTURE` (4 FAQs vs 12-14, no comparison table, 0 authority citations, 2 worked examples) + `STALE_FACTS` (incomplete April-2027 framing) + `CTR_FAIL` (generic-led metaTitle on a high-intent "X vs Y" query).
- **"Why this rewrite" angle:** The page currently re-explains gross-yield and net-yield formulas and a single ROI example — content the calculator sibling (`rental-yield-calculator-guide-uk-landlords`), the net-income sibling (`how-to-calculate-net-rental-income-after-all-costs-uk-guide`), and the two benchmark siblings already cover, and cover at greater length. In its present form the page is INVISIBLE: it has no distinct intent the cluster does not already serve better, so it competes with its own siblings for yield-calculation queries it cannot win and contributes nothing to the comparison query surface it is best placed to own. The rewrite repositions it decisively as **the yield-vs-ROI comparison + leverage / cash-on-cash / total-return explainer**: when to use which metric, how mortgage leverage diverges ROI from yield, income-return vs total-return, and a tax-adjusted comparison of the two metrics. Yield-formula depth is stripped to a brief recap with forward-links to the calculation and benchmark siblings; the four siblings reciprocally stop re-explaining ROI/leverage and forward-link here. This is a cluster-coherence move as much as a single-page lift.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`rental-yield-vs-roi-property-investors-uk.md`, 110 lines):**
- **Word count:** ~1,047 (body, per diagnosis; confirmed thin against 3,000 target).
- **H2 outline (9 H2 + 4 H3):**
  1. Understanding Rental Yield (H3 Gross Rental Yield, H3 Net Rental Yield) — **duplicates calculator + net-income siblings**
  2. Understanding Return on Investment (ROI) (H3 ROI Rental Property Example) — distinct, the keep-and-expand core
  3. Key Differences Between Rental Yield and ROI (H3 Capital vs Income Focus, H3 Leverage Impact, H3 Time Horizon) — distinct, the keep-and-expand core
  4. Tax Implications for Both Metrics (H3 Individual Landlord Considerations, H3 Company Structure Benefits)
  5. Common Calculation Mistakes (H3 Purchase Price vs Current Value, H3 Ignoring Hidden Costs, H3 Overlooking Tax Implications)
  6. Portfolio Management Using Both Metrics (the 4-quadrant high/low matrix — strong, keep + expand)
  7. Future Considerations
  8. Getting Professional Support
- **Meta title:** "Rental Yield vs ROI: Key Differences UK Property Investors" (56 chars; leads generic "Key Differences", no snippet-bait differentiator).
- **Meta description:** "Rental yield vs ROI explained for UK landlords. Learn gross yield, net yield, and return on investment calculations with practical examples." (138 chars; reinforces the yield-calculation framing we are moving AWAY from).
- **FAQ count (frontmatter `faqs:`):** 4 (target 12-14). FAQ #3 contains a worked ROI figure inline (28%) that duplicates a body example.
- **Outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals.
- **Internal links:** 6 (Section 24 guide, rental-income-tax guide, BTL ltd-co guide, property-investment-tax guide, MTD April-2026 page, what-does-a-property-accountant-do). None point to the yield-calculation or benchmark siblings — the cluster is not yet interlinked.
- **Worked examples:** 2 (a £200k property gross/net-yield pair at lines 36/40, and a single leveraged-ROI example at lines 48-58 yielding 27.9%).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`).
- **Last meaningful edit:** `date: 2026-04-10` (no `dateModified` field present; add at execution).
- **Comparison table:** none (the single highest-value snippet-bait addition for an "X vs Y" query is absent).

---

## GSC angle (last 90 days) (Stage 2 — pull at execution before drafting body)

**Pull command at execution:** `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90`, then read `gsc_query_data` filtered to this page URL. **Not pulled at brief-draft time** — populate the table below at Stage 2 execution. This brief sets the EXPECTED signal shape so the execution session can confirm or refute the INVISIBLE diagnosis.

**Expected signal shape (reasoning, to verify):**
- Primary query: "yield vs roi" / "rental yield vs roi" / "buy to let roi" / "roi on property uk". Expect low impressions and a poor position because the page does not currently own the comparison intent in its structure (no table, generic meta, thin body).
- Secondary surface to confirm: "cash on cash return uk", "leveraged property returns", "total return property investment", "high yield low roi".
- **INVISIBLE confirmation test:** if impressions are very low across the board (not just CTR-poor at a good position), the INVISIBLE diagnosis holds and the load-bearing fix is repositioning + structure, not a meta-only rewrite. If the page already ranks 5-15 on "yield vs roi" with low CTR, CTR_FAIL is co-primary and the meta + comparison-table fix carries extra weight.
- **Cannibalisation cross-read:** at execution, also pull the four siblings' top queries to confirm they are NOT ranking for "yield vs roi" / "buy to let roi" (they should be ranking for calculation + benchmark queries). If a sibling is ranking for the comparison term, surface a cluster-cannibalisation flag before drafting.

**GA4 engagement signal (pull `ga4_page_data` at execution):** record sessions / engaged sessions / avg duration / conversions. Likely low-traffic; if avg duration is non-trivial for the few who arrive, content quality is acceptable and the limiter is discoverability (consistent with INVISIBLE).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: INVISIBLE.** In its current form this page has no distinct intent the cluster does not already serve better. Roughly the first third of the body (gross-yield formula + net-yield formula + a £200k worked yield pair) is a weaker restatement of content the calculator sibling and net-income sibling own at greater depth. A page that duplicates better siblings competes with itself for queries it cannot win and adds nothing to the one query surface it is uniquely placed to own (the comparison head term). The load-bearing fix is therefore NOT "add more yield depth" — it is **subtract the duplicated yield-calculation depth and rebuild the page around the comparison/leverage/total-return axis** that no sibling covers.

**Secondary: THIN_DEPTH.** 1,047 words against a 3,000 target, and shorter than all four siblings (1,246 / 1,310 / 1,436 / 1,780 words). But note the asymmetry: the thinness must be cured by NEW comparison/leverage/cash-on-cash/tax-adjusted material, not by re-padding yield formulas. Depth added in the wrong place would deepen the cannibalisation.

**Tertiary: STRUCTURE.** No comparison table (the single highest-value snippet-bait for an "X vs Y" query — this is the first structural add). 4 FAQs vs the cluster's 4-6 and the 12-14 target. 0 outbound authority citations. 2 worked examples vs a 4-5 target including a tax-adjusted comparison and a high-yield-low-ROI vs low-yield-high-ROI pair.

**Quaternary: STALE_FACTS (incomplete, NOT wrong-direction).** Body line 75 asserts "From April 2027, property income will face separate tax rates of 22% (basic), 42% (higher), 47% (additional)". Per `house_positions.md §7` [LOCKED 2026-05-29] these rates are now **enacted law** (Finance Act 2026, Royal Assent 18 March 2026, ss.6-7, effective 6 April 2027), so the direction is correct and **NO Bill-form hedge is needed** — this supersedes the gold-reference cgt brief's earlier "hedge as Bill-form" instruction. The assertion is stale-INCOMPLETE because it omits: (a) **England + NI scope only** (Scotland and Wales set their own property income rates, FA 2026 s.8 / Sch 2); (b) the **Section 24 finance-cost reducer RISES 20% to 22%** (FA 2026 Sch 1, amending ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B) so **no new basic-rate wedge opens**; (c) any FA 2026 / Royal Assent citation. Fix at rewrite: assert as enacted with citation and add the no-new-wedge / reducer-to-22% nuance per §7.

**Quinary: CTR_FAIL.** metaTitle leads generic ("Key Differences"). For a high-intent "X vs Y" query, the title should lead the head term plus a snippet-bait differentiator (comparison table / worked examples). The metaDescription currently reinforces the yield-calculation framing we are leaving behind.

**Load-bearing fix sequence (ordered by ROI):**

1. **Reposition (the spine).** Demote the standalone gross/net-yield formula H3s to a single brief recap ("Yield in one minute") that states each formula once and forward-links to the calculator + net-income + benchmark siblings for depth. Reclaim the freed body budget for the comparison/leverage/total-return core.
2. **Add the yield-vs-ROI comparison table at/near the top** (snippet-bait for "yield vs roi"). Columns: metric, what it measures, formula (one line), what it ignores, best used for, sensitive to leverage (Y/N). This is the highest-value single structural add.
3. **Expand the leverage / cash-on-cash core** — a new H2 on how mortgage leverage diverges ROI from yield, with cash-on-cash return defined as a named sub-metric, and a cash-buyer-vs-mortgaged worked comparison on the same property.
4. **Add total-return vs income-return framing** — capital growth + income, why a low-yield-high-ROI property and a high-yield-low-ROI property can both be "right" depending on the investor's objective; tie to the existing 4-quadrant matrix (keep + expand).
5. **Add a tax-adjusted comparison** — the after-tax divergence of the two metrics under individual (Section 24, 22/42/47 from 2027/28) vs corporate ownership; this is the genuine specialist differentiator competitors lack.
6. **Body to ~3,000 words**, all of the net-new depth on the comparison/leverage/tax-adjusted axis (never re-padding yield formulas).
7. **FAQ count 4 to 12-14**, each FAQ targeting a distinct comparison/leverage query verbatim (yield vs roi; cash on cash; why low yield high roi; does leverage change yield; how does April 2027 change after-tax ROI; etc.). Strip the duplicated inline 28% figure from FAQ #3 or recast it.
8. **Authority links: 4-7 verified citations** (gov.uk capital-gains-tax/rates for the capital-growth/CGT touchpoint; HMRC PIM for property income; FA 2026 + ITA 2007 s.399B for the 2027/28 reducer; CTA 2009/2010 anchors for the corporate-structure touchpoint).
9. **Meta title rewrite** — lead the head term + differentiator: e.g. "Rental Yield vs ROI 2026: Comparison Table + Worked Examples" or "Yield vs ROI for UK Property: Leverage, Tax + Examples".
10. **Internal interlink the cluster** — forward-link the 4 siblings for calc/benchmark/net-income; request (via flag) that the 4 siblings reciprocally forward-link here for ROI/leverage and stop re-explaining it.

---

## Competitor URLs (Stage 2 — RE-VERIFY liveness at execution per §16.31)

URLs carried from diagnosis; re-fetch with a proper User-Agent and confirm 200 + date-stamp at execution. Reject and replace any non-200.

| URL | Status (from diagnosis) | Est. words | FAQs | Table | Coverage signals |
|---|---|---|---|---|---|
| https://knightknox.com/rental-yield-explained/ | live 200 | ~2,500-2,800 | none | gross-vs-net comparison table | Yield-heavy, ROI brief; borrow the comparison-table form, beat on ROI/leverage depth |
| https://millerrose.co.uk/news/what-is-a-good-return-on-investment-for-rental-property/ | live 200 | ~1,800-2,000 | none | none | ROI-led, covers both metrics; borrow the ROI-first framing, beat on structure + tax-adjusted layer |
| https://www.nockdeighton.co.uk/blog/what-is-the-difference-between-yield-and-roi-return-on-investment | live 200 | ~650-700 (thin) | none | none | Two worked examples on a £150k property; the direct head-term competitor and beatable on depth |
| https://forestknight.co.uk/blog/understanding-the-difference-between-return-on-investment-and-rental-yield/ | live but 403 to bot fetch | unknown | unknown | unknown | Ranks top-3 for the primary query; verify manually at execution, do not cite content we cannot fetch |

**Competitor depth ceiling for this query class:** ~650-2,800 words, 0 FAQs across all four, at most one comparison table, no statute citations, no tax-adjusted layer. Our ~3,000-word target with a comparison table + 12-14 FAQs + 4-5 worked examples (including a tax-adjusted yield-vs-ROI comparison) + 4-7 verified statute/HMRC citations is decisively best-in-class, not catch-up.

**What to borrow:** Knight Knox's gross-vs-net comparison-table form (adapt to a yield-vs-ROI table, our snippet-bait); Nock Deighton's clean two-worked-example pattern (match clarity, beat depth).

**What to differentiate against:** all four competitors skip cash-on-cash as a named metric, total-return vs income-return framing, the tax-adjusted after-tax divergence, the April-2027 enacted-rates layer, and the corporate-vs-individual comparison. These are our differentiators.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (re-read fresh at execution; confirm timestamp matches batch-start snapshot per §15.3).

| Source | Slug | Owns intent | Resolution |
|---|---|---|---|
| Residual (own) | rental-yield-vs-roi-property-investors-uk | yield-vs-ROI **comparison** + leverage/ROI | self — REWRITE in place; reposition to comparison/leverage head term |
| Sibling (live, Landlord Tax Essentials, 1,246w) | rental-yield-calculator-guide-uk-landlords | gross/net yield **FORMULAS** + calculation walkthrough + expense list | No collision after reposition. **This page strips its yield-calc depth and forward-links here.** Request reciprocal: sibling stops re-explaining ROI/leverage, forward-links here. |
| Sibling (live, Portfolio Management, 1,310w) | what-is-good-gross-yield-buy-to-let-property-2026 | gross-yield **BENCHMARK** ("what's good") | No collision. Forward-link from the yield recap for "is my yield any good". |
| Sibling (live, Portfolio Management, 1,436w) | property-investment-benchmarks-uk-2026-good-yield | **REGIONAL** yield benchmarks | No collision. Forward-link from the comparison/total-return section. |
| Sibling (live, freshly rewritten 2026-05-21, 1,780w) | how-to-calculate-net-rental-income-after-all-costs-uk-guide | net-income / **Section 24 cash-flow** calculation | No collision after reposition. Forward-link from the tax-adjusted section; do NOT re-derive net income here. |
| Excluded (rewritten) | claim-mortgage-interest-rental-property-uk-section-24 | Section 24 applied mechanics | No collision. Forward-link from the tax-adjusted section. |
| Excluded (rewritten) | buy-to-let-limited-company-complete-guide-uk | incorporation pillar | No collision. Forward-link from the corporate-vs-individual comparison. |
| Excluded (rewritten) | 2027-property-income-tax-rates-landlords-uk | 2027 rates pillar | No collision. Forward-link from the April-2027 paragraph. |
| Excluded (rewritten) | cgt-rates-property-2026-27-current-rates-explained | CGT rates explainer | No collision. Forward-link from the capital-growth / total-return section (capital gains on disposal). |

**Conclusion: REWRITE in place — decisive reposition. No REDIRECT-COLLAPSE.** Collapsing would discard the only cluster page anchored to the comparison head term and lose the "yield vs roi" / "buy to let roi" / "roi on property" query surface. The cluster's five pages become non-overlapping after reposition: calculator owns formulas, two benchmark pages own "what's good" + regional, net-income page owns S24 cash-flow, and THIS page owns the comparison + leverage + total-return + tax-adjusted axis. **Cross-page flag (raise at execution):** the four siblings should reciprocally forward-link here for ROI/leverage and NOT re-explain it — this is a cluster-coherence action item for the execution session, surfaced to `track2_site_wide_flags.md`.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page). The reposition makes interlinking load-bearing, not decorative.

- **Yield-calculation sibling:** `rental-yield-calculator-guide-uk-landlords` — forward-link from the "Yield in one minute" recap; this page stops owning the formula walkthrough.
- **Gross-yield benchmark sibling:** `what-is-good-gross-yield-buy-to-let-property-2026` — forward-link for "is my yield any good".
- **Regional benchmark sibling:** `property-investment-benchmarks-uk-2026-good-yield` — forward-link from the total-return / capital-growth section.
- **Net-income / S24 sibling:** `how-to-calculate-net-rental-income-after-all-costs-uk-guide` — forward-link from the tax-adjusted section; do not re-derive net income.
- **Section 24 applied:** `claim-mortgage-interest-rental-property-uk-section-24` — forward-link from the tax-adjusted section.
- **Incorporation pillar:** `buy-to-let-limited-company-complete-guide-uk` — forward-link from the corporate-vs-individual comparison.
- **2027 rates pillar:** `2027-property-income-tax-rates-landlords-uk` — forward-link from the April-2027 paragraph.
- **CGT rates explainer:** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from the capital-growth / total-return section (CGT on disposal is part of realised total return).
- **MTD (retain existing):** `making-tax-digital-landlords-april-2026-deadline` — keep the existing record-keeping link in the tax/future section.
- **Property accountant (retain existing CTA target):** `what-does-a-property-accountant-do` — keep as the soft handoff at close.

---

## House-position references (Stage 1)

- **§4 Section 24 finance-cost restriction** [LOCKED 2026-05-29]: 20% basic-rate credit for 2026/27; reducer RISES to **22%** from 2027/28 (FA 2026 Sch 1; ITTOIA 2005 ss.274AA/274C; ITA 2007 s.399B). Three-part cap computed at 22% from 2027/28. The tax-adjusted ROI section must thread this exactly.
- **§7 April 2027 property income tax rates** [LOCKED 2026-05-29 — assert as ENACTED, no Bill-form hedge]: 22% basic / 42% higher / 47% additional, **England + NI only** (FA 2026 ss.6-7, Royal Assent 18 March 2026, effective 6 April 2027; Scotland + Wales set own rates per FA 2026 s.8 / Sch 2). **No new basic-rate wedge** (reducer tracks 22%). This supersedes the gold-reference cgt brief's Bill-form-hedge instruction.
- **§21 / CT rates** [LOCKED, per house_positions line 1183, confirmed gov.uk 2026-05-23]: corporation tax 2026/27 = **19% small profits rate (profits ≤ £50k), 25% main rate (profits ≥ £250k), marginal relief in the £50k-£250k band (effective ~26.5%)**. The page's existing corporate-structure framing (line 78) is CORRECT; preserve it, optionally add the marginal-relief effective-rate nuance. CIHC framing if used = CTA 2010 s.18N, never s.34 (per §16.3 / §21.7 do-not-write list).
- **§5 CGT on UK residential property (2026/27)** [LOCKED]: 18% / 24% + £3,000 AEA — relevant only as a light touchpoint in the total-return / capital-growth section (CGT on disposal reduces realised total return). Do NOT build CGT depth here; forward-link the CGT rates sibling.
- **§13 Do-not-write list** [LOCKED]: NO pricing / fees on-page (Decision E: even soft "£800-£1,500 general-market" fee comparisons are a pricing-leak — flag/strip if any appear). NO real client names. Anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — STALE_FACTS (incomplete, not wrong-direction).** Body line 75 asserts the April-2027 22/42/47 rates without the three required nuances. Per `house_positions.md §7` [LOCKED 2026-05-29] the direction is correct and the rates are ENACTED, so this is NOT a Bill-vs-enacted hedge case (it is the inverse of the recurring F-2/F-5/F-22/F-37 pattern — here the page is correctly enacted-direction but omits scope + reducer nuance + citation).

Execution session MUST:
- Assert the 22/42/47 rates as enacted law with an FA 2026 (Royal Assent 18 March 2026, ss.6-7) citation.
- Add the **England + NI scope only** qualifier (Scotland + Wales set own rates, FA 2026 s.8 / Sch 2).
- Add the **Section 24 reducer rises 20% to 22%** point and state explicitly that **no new basic-rate wedge** opens (reducer tracks the 22% property basic rate).

**Secondary fix (not a house-position conflict, but a freshness/vagueness defect).** Body line 104 "Rising interest rates continue to affect mortgage costs" is undated hand-waving. Rephrase to a current, dateable statement (e.g. tie the leverage point to the cost-of-finance dimension of ROI without an undated trend claim) or drop it. Do NOT introduce a speculative rate forecast.

**No pricing leak found** in the current page (no fees / £-rates for services). **No real client names.** If the rewrite adds an anonymised case figure, keep it a worked illustration (e.g. "a higher-rate landlord with a £50k deposit"), never a fee quote.

Flag to `track2_site_wide_flags.md` as: **F-NN | 2026-05-29 | MEDIUM | rental-yield-vs-roi-property-investors-uk | STALE_FACTS (incomplete) | April-2027 22/42/47 asserted without England+NI scope, without reducer-to-22%/no-new-wedge nuance, without FA 2026 citation. Direction correct + enacted per §7 (NOT a Bill-form hedge case). Fix at rewrite.**

---

## Authority links worth considering (Stage 2 — verify liveness + content at execution per §16.31)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/government/publications/rates-and-allowances-hmrc-tax-rates-and-allowances / https://www.gov.uk/capital-gains-tax/rates | Verify 200 + content at execution (gov.uk CGT rates page was 200 + content-verified 2026-05-23 in the gold-reference brief) | Capital-growth / total-return touchpoint (CGT on disposal) + cross-reference for the tax-adjusted section |
| https://www.gov.uk/hmrc-internal-manuals/property-income-manual | Verify 200 at execution | HMRC PIM — property income basis for the income-return / net-yield touchpoint |
| https://www.legislation.gov.uk/ukpga/2007/3/section/399B | Verify 200 + operative wording at execution (the FA 2026 amendment inserts the 2027/28 reducer rate — confirm the substituted text reflects 22%) | ITA 2007 s.399B — Section 24 reducer statute (post-FA 2026) |
| Finance Act 2026 (verify exact c.NN + ss.6-7 path at legislation.gov.uk) | Verify exact citation at execution (the gold-reference Phase 3 catch logged FA 2026 c.11 s.7 enacted 18 March 2026 — confirm) | April-2027 rates statute (assert-as-enacted) |
| https://www.legislation.gov.uk/ukpga/2010/4 (CTA 2010, marginal relief Part 3 Ch 3A) | Verify exact section at execution | Corporation tax marginal-relief touchpoint for the corporate-vs-individual ROI comparison |
| https://www.legislation.gov.uk/ukpga/2009/4 (CTA 2009, company property income) | Verify at execution | Corporate ownership income-tax-vs-CT framing in the tax-adjusted section |

**(Execution session selects 4-7 to actually cite in the body. Do NOT cite any URL we could not fetch; the forestknight.co.uk competitor URL is 403-to-bot and must not be content-cited.)**

---

## Universal rules — inherited from parent program (do not restate)

Pointer block per `TRACK2_PROGRAM.md §4` section 13. Inherit in full:
- **Voice rules** — `NETNEW_PROGRAM.md §4` voice block + `competitor_rewrite_playbook.md §5` Universal site rules. **Critical for this brief: NO em-dashes anywhere; anonymised social proof only; NO pricing (Decision E covers even soft general-market fee ranges); exact figures + named statute.**
- **Lead-gen architecture** — `competitor_rewrite_playbook.md §5` (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments — after the leverage worked example and after the tax-adjusted section are the natural placements).
- **CSS in markdown** — semantic HTML only, no Tailwind utility classes in body; `.prose-blog aside` handles inline-CTA styling. The comparison table must be a semantic `<table>`.
- **FAQs and schema** — frontmatter `faqs:` array, target 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never manually add FAQ schema in body.
- **Anti-templating discipline** — `NETNEW_PROGRAM.md §10`; this brief's gap-mode spine (INVISIBLE-via-cluster-duplication, cured by SUBTRACTION + reposition, not depth-add) is deliberately distinct from the gold-reference cgt brief (CTR_FAIL/INTENT-MISMATCH) and the birmingham brief (CTR_FAIL/pricing-leak).
- **Quality bar** — `competitor_rewrite_playbook.md §4.3` six-check verification.
- **Statute citation discipline** — Track 2 flag F-8 (statute content can be removed by amendment even when the URL is live — verify operative wording, not just 200 status; ITA 2007 s.399B must be confirmed to carry the FA 2026 22% amendment at write time).
- **§16 lessons** (all) — particularly §16.18 (reasoning-first selection), §16.31 (URL liveness mandatory), §16.22/§16.27/§16.30/§16.37 (Bill-vs-enacted pattern — note this page is the INVERSE: assert-as-enacted per §7, do NOT hedge), §16.14/§16.15 (tracker hygiene).

---

## 19-step workflow — inherited from parent program with Track 2 deltas

Inherits the full 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas (supersede where listed):
- **Step 1:** Read `house_positions.md` §4, §7, §21 (CT line 1183), §5, §13 in full at session start.
- **Step 2:** Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting).
- **Step 4 (load-bearing pre-rewrite verification):** Verify ITA 2007 s.399B operative wording reflects the FA 2026 22% reducer, and confirm FA 2026 ss.6-7 Royal Assent 18 March 2026, both against legislation.gov.uk. §7 is assert-as-enacted, NOT a hedge.
- **Step 5:** Re-fetch the 3 fetchable competitor URLs (reject non-200); do not content-cite the 403 forestknight URL.
- **Step 6:** Read the current source file in full (done in this brief).
- **Step 7:** Read the 4 yield-cluster siblings to confirm the post-reposition non-overlap boundary before drafting.
- **Step 8:** Plan outline: ~11-13 H2s, ~3,000 body words, 12-14 FAQs, comparison table near top, 4-5 worked examples (incl. cash-buyer-vs-mortgaged + high-yield-low-ROI vs low-yield-high-ROI + a tax-adjusted comparison).
- **Step 9 (Track 2 delta — rewrite at existing path):** Rewrite markdown at the existing path. Preserve frontmatter slug + canonical + category. Update `metaTitle` (lead head term + differentiator), `metaDescription` (comparison/leverage/tax-adjusted angle, not yield-calculation), add `dateModified`. **Subtract** the duplicated gross/net-yield formula depth to a brief recap; **add** the comparison/leverage/total-return/tax-adjusted core.
- **Step 10:** `cd Property/web && npm run build`. Must pass.
- **Step 11 (six checks):** FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve; **pricing-check** (`£[0-9]` returns no fee-discussion lines — worked-example figures are fine, fee quotes are not).
- **Step 12 (Track 2 delta):** Confirm no redirect needed (none — slug kept; decisive reposition, not collapse).
- **Step 13 (Track 2 delta):** Insert or update `monitored_pages` Supabase row; given the INVISIBLE baseline, use the longer (180-day) monitoring window per the F-11 INVISIBLE-baseline recommendation.
- **Step 14:** Commit on `main`: `Track 2: rewrite rental-yield-vs-roi-property-investors-uk (INVISIBLE reposition to comparison/leverage head term)`.
- **Steps 15-19:** Update tracker (✅ executed), flags log (STALE_FACTS resolution + cluster-interlink action item), §3 heartbeat, discovery log; raise the reciprocal-forward-link action item for the 4 siblings.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §4 Section 24 (reducer 20% 2026/27, 22% from 2027/28): __
- §7 April 2027 (22/42/47, England + NI only, no new wedge, FA 2026 citation): __
- §21 CT rates (19% / 25% / marginal relief £50k-£250k): __
- §5 CGT touchpoint (18%/24%, forward-link only): __
- §13 do-not-write (no pricing, no client names): __

### Comparison: before vs after
- Word count: ~1,047 → __
- H2 count: 8 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 2 → __
- Comparison table: 0 → __ (1 expected)
- Cluster forward-links added (calc / 2x benchmark / net-income siblings): __

### Reposition test
- Duplicated gross/net-yield formula depth subtracted to recap + forward-link: __ (Y/N)
- Comparison/leverage/total-return/tax-adjusted core is the body majority: __ (Y/N)
- 4 siblings' reciprocal forward-links to here requested via flag: __

### Flags raised
- STALE_FACTS (carried from brief): resolved with §7 enacted assertion + scope + reducer nuance + citation: __
- Cluster-interlink action item raised for the 4 siblings: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
