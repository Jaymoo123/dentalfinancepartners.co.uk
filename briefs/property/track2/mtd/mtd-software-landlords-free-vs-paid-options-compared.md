# Track 2 brief: mtd-software-landlords-free-vs-paid-options-compared

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (REWRITE-only mode; sharp intent narrowing, NOT a 301)
**Source markdown path:** `Property/web/content/blog/mtd-software-landlords-free-vs-paid-options-compared.md`
**Live URL (canonical-of-record):** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-software-landlords-free-vs-paid-options-compared
**Stage 1 priority:** M (weakest of three cluster siblings, low absolute impressions, but a clean, winnable distinct sub-intent the two canonicals do not own; rewrite-only mode keeps the page alive)
**Stage 1 date:** 2026-05-31
**Stage 2 enrichment date:** 2026-05-31
**Cannibalisation status:** REWRITE (sharp narrowing to the "is genuinely-free software actually viable for MY MTD obligation, and what does free truly cost?" sub-intent; NO redirect, collapse is out of scope per rewrite-only rule, and this page is the equity-loser so it could only ever be a 301 source not a target, see Cannibalisation block)

> Repositioning thesis in one line: this page stops being a third, weakest "best MTD software" / "free vs paid features" comparison and becomes **the free-tier viability and true-cost-of-free decision page**, "can I legitimately use a genuinely-free product for my MTD ITSA obligation, and what does free actually cost me in time, missing features and compliance risk?", deferring the ranked product picks to `best-mtd-software-landlords-2026` and the full five-question portfolio framework to `mtd-itsa-choosing-software-by-landlord-scenario-decision-tree`.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `mtd-software-landlords-free-vs-paid-options-compared`. The slug carries "free vs paid options compared", the rewrite leans INTO "free" specifically, narrowing the page to free-tier viability + true-cost-of-free rather than a generic feature face-off. No redirect proposed (rewrite-only mode enforced; the page is the equity-loser of the cluster so it could never be a canonical 301 target, see Cannibalisation block).
- **Category:** `Making Tax Digital (MTD)` (kept).
- **Gap-mode tag:** `STALE_FACTS` (primary, the April 2026 mandate is framed throughout as a FUTURE countdown and the page is now past go-live; plus a wrong-penalty block and a wrong April-2027 framing) + `PRICING_LEAK` (HARD-RULE conflict, explicit £ fee tiers in body and FAQ #3) + `CANNIBAL` (two stronger fresher siblings own the cluster; fix is intent-narrowing) + `INVISIBLE` (top measured query is pos 9 with 11 impressions; most targets are pos 47-94 or zero-impression adjacents) + `THIN_DEPTH` (1,250 words vs ~3,000 target) + `STRUCTURE` (4 FAQs, 0 authority links, 0 inline CTAs, no comparison table, no eligibility decision flow) + `CTR_FAIL` (page-1-adjacent on "compare mtd plans benefits" at pos 9 with 0 clicks; generic meta).
- **"Why this rewrite" angle:** the page is the weakest of three MTD-software-selection cluster pages (2 inbound internal links vs ~12 for `best-mtd-software-landlords-2026` and ~6 for the decision-tree page) and currently duplicates both: it ranks products by tier and runs a generic free-vs-paid feature face-off that the best-software page does better, and gestures at a portfolio-size decision the decision-tree page owns. Rewrite-only mode means the fix is a sharp sub-intent narrowing, not a collapse. The page is re-pointed at the one decision neither canonical owns to full depth: free-tier VIABILITY (the eligibility gates that decide whether a genuinely-free product can carry your specific obligation) + TRUE COST OF FREE (the hidden time, missing compliance features and separate-final-declaration risk that "free" hides). It defers product names to the HMRC-recognised software register on gov.uk (sidestepping the best-software page's ranked list) and forward-links OUT to both canonicals. On top of the narrowing, three hard correctness jobs: (1) flip the whole page from "before April 2026" countdown framing to "the mandate is already live" (today is 2026-05-31, six weeks past the 6 April 2026 go-live); (2) replace the wrong penalty block (no immediate £200, no £10/day for late submission; it is points-based per §19.7); (3) replace the wrong "separate property tax rates from April 2027" framing (the relevant 2027 fact for THIS page is the MTD threshold dropping to £30,000, per §3/§19.1, not income-tax rates).

---

## Current page snapshot (Stage 2, read source markdown + frontmatter)

**Filesystem source read (2026-05-31):**
- **Body word count:** ~1,250 (well below the ~1,800-2,000 competitor floor and the ~3,000 gold-reference target).
- **H2 / H3 outline (8 H2 + 9 H3):** MTD Software Requirements for Landlords · Free vs Paid MTD Software Options (H3 Free Options and Their Limitations, H3 Paid Software Features and Benefits) · Cost Analysis: Direct and Indirect Considerations (H3 Direct Costs, H3 Indirect Costs) · Choosing Software Based on Portfolio Size (H3 Small/Medium/Large Portfolios) · Detailed Feature Comparison (H3 Core, H3 Advanced) · Integration with Property Accountants (H3 Free Limitations, H3 Paid Benefits) · Compliance, Risk, and Future-Proofing (H3 Penalty Risks, H3 Future-Proofing) · Decision Framework and Implementation (H3 Making Your Choice, H3 Implementation Timeline Before April 2026).
- **metaTitle:** "MTD Software for Landlords: Free vs Paid Options 2026" (52 chars).
- **metaDescription:** "Compare free MTD software landlord options vs paid alternatives. Features, costs, and suitability for different property portfolios ahead of April 2026." (149 chars; "ahead of April 2026" is now stale, the mandate is live).
- **h1:** "MTD Software for Landlords: Free vs Paid Options Compared".
- **FAQ count (frontmatter `faqs:`):** 4 (free vs paid differences; large-portfolio free; how much paid costs; when to implement before April 2026). Target 12-14. **FAQ #3 is a PRICING LEAK** (publishes £5-£15 / £15-£30 / £30-£100+ monthly tiers). **FAQ #4 is STALE** (a "before April 2026" countdown).
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations; no link to the HMRC compatible-software finder, the single most important outbound link for this page).
- **Internal links:** 5 (`making-tax-digital-landlords-april-2026-deadline`; `section-24-tax-relief-complete-guide`; `how-much-tax-rental-income-uk-complete-guide`; `how-much-does-a-property-accountant-cost`; `what-does-a-property-accountant-do`). NO link to either cluster canonical (`best-mtd-software-landlords-2026`, `mtd-itsa-choosing-software-by-landlord-scenario-decision-tree`), which is part of the cannibalisation problem.
- **Worked examples:** 0 numerical. No comparison table. No eligibility decision flow.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter via `buildBlogPostingJsonLd`). No `reviewedBy` / `reviewerCredentials` / `reviewedAt` frontmatter.
- **Last meaningful edit:** frontmatter `date: 2026-04-10`. `author: "Property Tax Partners Editorial Team"`.

**Confirmed defects on the live page:**
- **PRICING LEAK #1 (frontmatter FAQ #3):** "Paid MTD software for landlords ranges from £5-£15 monthly for basic plans ... £15-£30 monthly for mid-tier ... £30-£100+ monthly for professional packages." Strip per HARD RULE / Decision E.
- **PRICING LEAK #2 (body, "Free vs Paid MTD Software Options"):** "pricing ranging from £5-£50+ monthly". Strip.
- **PRICING LEAK #3 (body, "Cost Analysis > Direct Costs"):** the explicit £5-£15 / £15-£30 / £30-£100+ monthly tier list. Strip.
- **STALE / WRONG-TENSE (pervasive):** "becoming mandatory from April 2026", "before the 2026 deadline", "Implementation Timeline Before April 2026", and the "12 months before / 9 months before / 6 months before / 3 months before / Deadline day" countdown. The mandate went live 6 April 2026; today is 2026-05-31. Reframe to "already live", with the relevant forward fact being the £30,000 threshold from 6 April 2027 (§19.1).
- **WRONG PENALTY FACTS (body, "Penalty Risks and Audit Trails"):** "£200 for missing quarterly update deadlines, daily penalties of £10 after initial penalty periods ... potential loss of cash basis eligibility." WRONG per §19.7/§19.9: late submission is points-based (1 point per missed quarterly update; £200 fixed penalty ONLY at the 4-point threshold within a 24-month rolling window); there is NO immediate £200 and NO £10/day; "loss of cash basis eligibility" as a penalty is fabricated. Late PAYMENT (a separate regime, omitted by the page) is 3% at day 15, +3% at day 30, +10% per annum from day 31 (§19.7, Spring Statement 2025).
- **WRONG 2027 FRAMING (body, "Future-Proofing Your Choice"):** "the separate property tax rates taking effect from April 2027." For THIS page the relevant 2027 fact is the MTD threshold dropping to £30,000 (§19.1), not income-tax rates. If the income-tax rates are mentioned at all (they need not be on a software page), they are 22/42/47 enacted via FA 2026 ss.6-7 (Royal Assent 18 March 2026), England/Wales/NI only (§7), but the cleaner fix is to drop the rate reference and replace it with the threshold-drop point.
- **CORRECT, PRESERVE:** the intro threshold line (£50,000 from 6 April 2026 / £30,000 from 6 April 2027 / £20,000 from 6 April 2028) matches §3/§19.1. The "Section 24 calculations" internal link is fine; align any Section 24 wording to the 20% basic-rate tax-reducer framing (not "relief/deduction"). The "Limited companies are outside MTD" framing implied by the Integration section is fine (§19.3); ensure no "MTD applies to limited companies" drift is introduced.

---

## GSC angle (last 90 days)

**Pulled from the diagnosis payload (this page is low-volume, the cannibalised third page of the cluster):**

| query | source | impr | avg pos | clk |
|---|---|---:|---:|---:|
| compare mtd plans benefits | gsc | 11 | 9.0 | 0 |
| compare mtd plans setup | gsc | 7 | 47.4 | 0 |
| best free mtd software for landlords | gsc | 4 | 74.2 | 0 |
| compare mtd plans guide | gsc | 4 | 88.3 | 0 |
| compare mtd plans tools | gsc | 3 | 63.5 | 0 |
| compare mtd plans platform | gsc | 2 | 91.0 | 0 |
| compare mtd plans | gsc | 2 | 87.5 | 0 |
| compare mtd plans features | gsc | 2 | 59.0 | 0 |
| compare mtd plans software | gsc | 1 | 94.0 | 0 |
| landlord vision mtd | gsc | 1 | 73.0 | 0 |
| landlords mtd | gsc | 1 | 50.0 | 0 |
| mtd for landlords free | gsc | 1 | 19.0 | 0 |
| mtd landlord software | gsc | 1 | 61.0 | 0 |
| free mtd software for landlords | adjacent | 0 | 0 | 0 |
| free landlord accounting software uk mtd ready | adjacent | 0 | 0 | 0 |
| is there free mtd software for income tax | adjacent | 0 | 0 | 0 |
| free vs paid landlord software true cost | adjacent | 0 | 0 | 0 |
| hmrc free mtd software landlords | adjacent | 0 | 0 | 0 |
| freeagent natwest mtd landlord free | adjacent | 0 | 0 | 0 |
| free mtd software for landlords with one property | adjacent | 0 | 0 | 0 |

**Read:** the page is near-INVISIBLE. The only page-1-adjacent query is "compare mtd plans benefits" (pos 9, 11 impr, 0 clk, a CTR_FAIL signal). The "compare mtd plans *" family (setup/guide/tools/platform/features/software) sits at pos 47-94, a generic-suffix invisibility signature (D-9 pattern from Batch 1), and is unlikely to be recoverable because it is a weak, intent-ambiguous head term the cluster siblings contest. The realistic win is the FREE-specific family the canonicals do NOT own: "best free mtd software for landlords" (pos 74, recoverable with a free-tier-viability angle), "mtd for landlords free" (pos 19), "landlords mtd" (pos 50), and the seven zero-impression adjacents that are pure free-tier-viability / true-cost intent ("is there free mtd software for income tax", "free vs paid landlord software true cost", "hmrc free mtd software landlords", "freeagent natwest mtd landlord free", "free mtd software for landlords with one property"). That family is low-competition, high decision-intent and matches the narrowed page, a clean intent-acquisition play, not a head-term fight against the siblings.

**GA4 engagement signal:** not separately pulled (negligible sessions expected at this impression volume). Engagement is not the limiter; distinct-intent visibility is.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS.** Three correctness failures, in descending severity: (a) the entire page frames the April 2026 mandate as a future countdown ("becoming mandatory from April 2026", a five-step "before April 2026" implementation timeline) when the mandate has been live since 6 April 2026, today is 2026-05-31, so the page reads as pre-launch advice six weeks after launch; (b) the penalty block is factually wrong (immediate £200 + £10/day + "loss of cash basis eligibility"), contradicting §19.7/§19.9; (c) the April-2027 reference points at income-tax rates when the page-relevant 2027 fact is the £30,000 threshold drop. This is the load-bearing fix, the page actively misinforms.

**HARD-RULE conflict: PRICING_LEAK.** Three explicit £ fee passages (FAQ #3 tier list; body "£5-£50+ monthly"; "Direct Costs" tier list). All violate the lead-gen handoff model (Decision E: even soft general-market fee comparisons are leaks). This creates a genuine tension with the page's free-vs-paid commercial intent, resolved by reframing the trade-off QUALITATIVELY (free tiers vs paid tiers as capability/eligibility/time categories) and deferring actual pricing to the HMRC-recognised vendor sites + a discovery call.

**CANNIBAL (via intent-narrowing).** Two stronger, fresher siblings own the cluster: `best-mtd-software-landlords-2026` (ranked product picks, ~12 inbound links) and `mtd-itsa-choosing-software-by-landlord-scenario-decision-tree` (five-question portfolio framework, ~6 inbound links). This page (2 inbound links) currently overlaps both. Fix is a sharp narrowing to free-tier viability + true-cost-of-free, a sub-intent neither canonical owns to depth, plus reciprocal forward-links.

**INVISIBLE + CTR_FAIL.** Top measured query pos 9 (0 clicks); the rest pos 19-94. Depth + distinct-intent + a comparison table and an eligibility decision flow are the route to visibility on the free-specific family, not a meta tweak on the contested "compare mtd plans" term.

**THIN_DEPTH + STRUCTURE.** ~1,250 words, 4 FAQs, 0 authority links, 0 inline CTAs, no comparison table, no eligibility flow, no worked example. All below the Track-2 rewrite floor.

**Load-bearing fix sequence (ordered by ROI):**
1. **Correctness pass first.** Flip the whole page to "the mandate is already live" framing; replace the wrong penalty block with the §19.7 points-based regime + the separate late-payment 3%/3%/10% schedule; replace the wrong April-2027 income-tax-rate reference with the £30,000 threshold-drop point. This is non-negotiable, the page is currently wrong.
2. **Strip all three pricing leaks** (HARD RULE). Reframe the free-vs-paid trade-off qualitatively; defer real pricing to vendor sites + a discovery call.
3. **Reposition** from "best/feature comparison" to "free-tier VIABILITY + TRUE COST OF FREE". Lead with the three free-tier constraint archetypes (banking-tied / transaction-or-property-cap / feature-cap); add a true-cost-of-free section; add an eligibility decision flow; defer product names to the HMRC-recognised register.
4. **Body lift to ~3,000 words** around the narrowed intent.
5. **Add a side-by-side comparison TABLE** (free-tier vs paid-tier, capability-and-eligibility columns, NO pricing) and a **threshold/deadline reference TABLE** (who is in scope when; quarterly-update deadlines).
6. **FAQ count 4 → 12-14**, each targeting a free-tier-viability / true-cost query verbatim; strip the pricing FAQ and the countdown FAQ.
7. **Authority links: 5-7 verified citations** (HMRC compatible-software finder is the must-have; plus SI 2026/336, gov.uk MTD ITSA guidance, the penalty guidance, ITTOIA 2005 s.272 for the property-business records basis).
8. **Forward-link OUT to both canonicals** (`best-mtd-software-landlords-2026` for the ranked picks; the decision-tree page for the full portfolio framework) so this page does not re-cover ranking or the generic five-question framework.
9. **metaTitle / metaDescription / h1 rewrite** to lead with "free" + "true cost", not generic "free vs paid options".

**Anti-templating note:** unlike the gold-reference CGT-rates brief (CTR-FAIL + INTENT-MISMATCH where the head term is irrecoverable) and unlike the HMO-accounting brief (CANNIBAL-via-operational-split + THIN_DEPTH), this brief's spine is STALE_FACTS-led correctness-first + a free-tier-viability intent narrowing. The page is currently actively wrong (tense, penalties, 2027) AND leaking pricing AND duplicating two stronger siblings; the fix sequence puts correctness before repositioning. Distinct gap-mode, distinct fix.

---

## Competitor URLs (Stage 2, VERIFY LIVE at execution per §16.31)

| URL | Expected coverage | Borrow / differentiate |
|---|---|---|
| https://www.landlordstudio.com/uk-blog/mtd-software-for-landlords | MTD-software overview for landlords; selection criteria; vendor-leaning | Borrow the selection-criteria vocabulary. Differentiate hard: this is a vendor breadth piece; our angle is free-tier viability + true-cost, not a vendor pitch. Do NOT mirror its product-pitch framing. |
| https://mtd.digital/mtd-income-tax/free-mtd-software/ | Free MTD software for income tax, the closest direct competitor on our exact narrowed intent | Borrow nothing structurally (it is the head-to-head); BEAT it on depth: the three constraint archetypes + a true-cost-of-free section + an eligibility decision flow + the HMRC-register-is-source-of-truth framing it will not have. This is the page to out-rank on "is there free mtd software for income tax". |
| https://www.augustapp.com/blog/cheapest-mtd-software-for-landlords-uk | Cheapest MTD software, price-led | Differentiate: we do NOT publish prices (HARD RULE). Read for which free/cheap tiers exist as a fact-check on the constraint archetypes; do NOT mirror the price tables. |
| https://www.uselatch.co.uk/blog/free-vs-paid-landlord-software-roi-analysis-2026 | Free vs paid ROI analysis, closest on the "true cost" angle | Borrow the true-cost framing (time + missing features + ROI). BEAT it with the §19.7 penalty-risk dimension done CORRECTLY and the separate-final-declaration risk it likely omits; do NOT carry over any £ ROI figures (reframe qualitatively). |

**Execution session MUST:** WebFetch each URL, confirm 200, date-stamp, capture actual word count / FAQ count / whether they carry the constraint-archetype framing, a true-cost section, or an eligibility flow. Replace any non-200 (note Batch 1/2 WebFetch permission denials, F-36; carry-forward verification if a fetch is blocked, manager 5% re-check at gate close). **Competitor depth ceiling for this query class is ~1,200-2,000 words, 0-few FAQs, price-led or vendor-led, no statute citations, no eligibility decision flow.** Our ~3,000-word target with 12-14 FAQs, the three constraint archetypes, a true-cost section, an eligibility decision flow, a non-priced comparison table, and 5-7 verified statute/HMRC citations is decisively best-in-class, not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult at execution; refresh §4 per batch).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | mtd-software-landlords-free-vs-paid-options-compared | self | **REWRITE in place**, narrow to free-tier viability + true-cost-of-free |
| Cluster canonical (STRONGER, ~12 inbound links) | best-mtd-software-landlords-2026 (2026-05-21) | Ranked product picks; FAQ "Can I use free MTD software" + free-tier caveats | **Intent split (NOT 301).** That page owns ranked picks. This page owns free-tier VIABILITY + true-cost. Forward-link to it for "which paid product". Note: best-software has more inbound links and the clearest commercial intent, so if a 301 ever happened (out of scope, rewrite-only mode) it MUST point THIS page INTO best-software, never the reverse, this page is the equity-loser and could never be a canonical target (§16.T2 weaker→stronger-only collapse rule). |
| Cluster canonical (STRONGER, ~6 inbound links) | mtd-itsa-choosing-software-by-landlord-scenario-decision-tree (2026-05-23) | Scenario / decision-tree framework; FAQ "Can I really use a free product for MTD ITSA" covering the three free-tier constraint types | **Intent split (NOT 301).** That page owns the generic five-question portfolio framework. This page expands ONE branch of it (the free-tier constraint archetypes) to full page depth. Forward-link to it for the full portfolio framework. Update its existing link to THIS page to point at the new free-tier-viability angle. |
| Pillar / deadline | making-tax-digital-landlords-april-2026-deadline | The mandate timeline pillar | No cannibal; this page applies the live mandate to the free-vs-paid software decision. Keep the existing cross-link; ensure the pillar itself is not stale (verify, raise a flag if it still reads "before April 2026"). |
| MTD threshold sibling | mtd-itsa-qualifying-income-test-gross-vs-net (Wave 3 B1) | §19.2 gross-test | No cannibal; forward-link from the eligibility-flow section for the gross-test detail. |
| MTD overview (inbound link source) | mtd-itsa-overview-six-changes-residential-landlords | One of this page's 2 current inbound links | No cannibal; keep the inbound link; verify its anchor text still fits the narrowed angle. |
| Spreadsheet sibling (inbound link source) | landlord-accounting-spreadsheet-template-free-excel-guide | One of this page's 2 current inbound links; "free" overlap | Adjacent, NOT cannibal: that page is the spreadsheet-template how-to; this page is the free-software-VIABILITY decision. Forward-link from the "spreadsheet + bridging as a free route" point (§19.6/§19.14); keep the inbound link. |

**Conclusion:** REWRITE in place. NO REDIRECT-PROPOSED (rewrite-only mode; and equity makes this page a 301 source not a target, never collapse the stronger canonicals into the weaker page). The fix is a sharp sub-intent narrowing achieved by repositioning to free-tier viability + true-cost-of-free, plus reciprocal forward-links to both canonicals and a request to repoint the canonicals' inbound links to the new narrowed angle. Net: three coexisting cluster pages with non-overlapping primary intents (ranked picks / scenario framework / free-tier viability + true-cost).

---

## Closest existing pages (Stage 2, internal-link plan)

**Forward-link OUT to the two cluster canonicals (load-bearing for the intent split, so this page does not re-cover ranking or the generic framework):**
- `best-mtd-software-landlords-2026`, for the ranked product picks. Link from the intro and from the "if free is not viable, choosing a paid product" close, with explicit "for our ranked product picks, see ...". **Reciprocal:** update best-software's existing link to this page to point at the free-tier-viability angle.
- `mtd-itsa-choosing-software-by-landlord-scenario-decision-tree`, for the full five-question portfolio framework. Link from the eligibility-flow section with "for the full portfolio decision framework across all scenarios, see ...". **Reciprocal:** update the decision-tree page's existing link to this page to point at the expanded free-tier constraint archetypes.

**Cross-link internal partners (to and from):**
- `making-tax-digital-landlords-april-2026-deadline` (pillar), keep; the mandate timeline. Verify the pillar is not itself stale ("before April 2026").
- `mtd-itsa-qualifying-income-test-gross-vs-net` (Wave 3 B1), forward-link from the eligibility flow for the §19.2 gross-test detail (the "single property + simple expenses" gate turns on gross qualifying income).
- `landlord-accounting-spreadsheet-template-free-excel-guide`, forward-link from the "spreadsheet + bridging as a free route" point (§19.6/§19.14, the genuinely-free option that is not a free software tier). Keep the existing inbound link.
- `mtd-itsa-overview-six-changes-residential-landlords`, keep the existing inbound link; one of the two current inbound links.
- `claim-mortgage-interest-rental-property-uk-section-24` (rewritten), Section 24 applied page; repoint the current `section-24-tax-relief-complete-guide` link here or keep, one-line touch, align wording to the 20% basic-rate tax-reducer framing.
- `how-much-tax-rental-income-uk-complete-guide`, keep (relevant to the complexity-gate discussion).
- `how-much-does-a-property-accountant-cost` + `what-does-a-property-accountant-do`, keep as the "when to bring in a specialist" pointers (these are the public-page treatment of cost, REPLACING the stripped pricing language; do not quote fees on THIS page).

---

## House-position references (Stage 1)

- **§3 MTD for ITSA, applicability to landlords** [LOCKED] and **§19 MTD for ITSA, Wave 3 extension** [LOCKED 2026-05-22; Wave 4 extensions §19.10-§19.18 LOCKED 2026-05-23 to 2026-05-27], the spine of the page.
  - **§3 / §19.1** mandate timeline: £50,000 (from 6 April 2026, NOW LIVE) / £30,000 (from 6 April 2027) / £20,000 (from 6 April 2028). The intro figures are already correct; preserve, but reframe the £50,000 line to "live since 6 April 2026" and make the £30,000 from 6 April 2027 the page-relevant forward fact.
  - **§19.2** qualifying income is GROSS (turnover + gross rent before deductions, aggregated). Load-bearing for the eligibility flow: the "single property + simple expenses" free-viability gate turns on gross income, not profit. MUST add.
  - **§19.3** limited companies are outside MTD ITSA entirely (CT600 route); general partnerships deferred (no confirmed date). Note so no "MTD applies to limited companies" drift is introduced (§19.9 do-not-write).
  - **§19.4** joint-property owners test the threshold against their SHARE of gross, not the property's total. Load-bearing for the eligibility flow: a "no joint-owner split" gate. MUST add.
  - **§19.6** software requirements: HMRC-recognised compatible software; the register is the source of truth; do NOT hard-code product names. Free-tier options exist but are limited (FreeAgent for NatWest customers; HMRC pilot tooling for some segments); paid options dominate the register. Spreadsheet + bridging is acceptable provided the bridging software is on the HMRC list. This is the spine of the free-tier-viability section. MUST add.
  - **§19.7** penalty regime: late SUBMISSION is points-based (1 point per missed quarterly update; £200 fixed penalty ONLY at the 4-point threshold within a 24-month rolling window; points reset after 24 months of full compliance; annual obligations have a 2-point threshold). Late PAYMENT (separate regime, MTD ITSA accelerated schedule per Spring Statement 2025): 3% from day 15, +3% from day 30, +10% per annum from day 31. MUST replace the wrong block.
  - **§19.9** do-not-write: NOT "immediate £200 penalty" (points-based); NOT "2%/2%/4%" late payment (it is 3%/3%/10% for MTD ITSA); NOT "MTD applies to limited companies"; NOT "£10,000 threshold".
  - **§19.8** the abandoned £10,000 threshold, do NOT drift to it (§19.9). Preserve the correct £50k/£30k/£20k schedule.
  - **§19.14** spreadsheet + bridging "digital link" rule, the genuinely-free spreadsheet route (vs a free software tier); cite for the "is a free spreadsheet a valid MTD route" FAQ.
  - **§19.18** SI 2021/1076 → SI 2026/336 migration, cite the LIVE instrument SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026; SI 2021/1076 revoked 1 April 2026). Do NOT cite SI 2021/1076 as live.
- **§7 April 2027 property income tax surcharge** [LOCKED 2026-05-30, FA 2026 ss.6-7, Royal Assent 18 March 2026]. For THIS page the relevant 2027 fact is the §19.1 threshold drop to £30,000, NOT the income-tax rates. If rates are mentioned at all (they need not be), assert 22/42/47 as enacted law (England, Wales and NI; Scotland carved out), date-stamped, NOT as a "surcharge to come" or "draft". Cleaner: drop the rate reference, keep the threshold-drop point. Verify §7 status fresh per F-37 Bill-vs-enacted discipline.
- **§4 Section 24** [LOCKED]: align the one-line Section 24 internal-link wording to the 20% basic-rate tax-reducer/credit framing (not "relief/deduction").
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts (two locked-position contradictions on the live page):**
1. **WRONG PENALTY FACTS vs §19.7/§19.9.** Body asserts "£200 for missing quarterly update deadlines, daily penalties of £10 ... potential loss of cash basis eligibility." §19.9 explicitly bans "Late submission produces an immediate £200 penalty" (it is points-based; £200 only at the 4-point threshold). No £10/day exists. "Loss of cash basis eligibility" is fabricated. This is the rewrite's second job (after tense).
2. **WRONG 2027 FRAMING vs §7 + §19.1.** Body says "the separate property tax rates taking effect from April 2027" on a software page; the page-relevant 2027 fact is the §19.1 £30,000 threshold drop. The income-tax-rate framing also risks the F-37 Bill-vs-enacted pattern if asserted carelessly.

**STALE (incompleteness + tense, not a single-figure contradiction):** the whole "before April 2026" countdown is now post-dated (today 2026-05-31; mandate live 6 April 2026). Not a locked-figure contradiction but a pervasive freshness failure.

**Flags to raise at execution (to `track2_site_wide_flags.md`):**
- **HIGH, PRICING_LEAK** | mtd-software-landlords-free-vs-paid-options-compared | three on-page £ fee passages (FAQ #3 tier list; body "£5-£50+ monthly"; "Direct Costs" tier list). Strip per HARD RULE / Decision E. Likely cluster-wide: check `best-mtd-software-landlords-2026` and the decision-tree page for the same £ tier pattern (cluster pricing-leak audit recommendation).
- **HIGH, STALE_FACTS (wrong penalty)** | mtd-software-landlords-free-vs-paid-options-compared | immediate-£200 + £10/day + cash-basis-loss penalty block contradicts §19.7/§19.9. Likely cluster-wide: any MTD page written before the §19.7 lock may carry the same wrong penalty framing, recommend an MTD-cluster penalty-fact audit.
- **MEDIUM, STALE_FACTS (tense)** | mtd-software-landlords-free-vs-paid-options-compared | "before April 2026" countdown framing across the page is now post-dated (mandate live since 6 April 2026). Recommend a corpus-wide MTD-cluster tense sweep (the pillar `making-tax-digital-landlords-april-2026-deadline` and any other pre-go-live MTD page).
- **LOW, STALE_FACTS (2027 conflation)** | mtd-software-landlords-free-vs-paid-options-compared | "separate property tax rates from April 2027" conflates income-tax rates (§7) with the page-relevant MTD threshold drop (§19.1). Reframe to the threshold drop.

---

## Authority links worth considering (Stage 2, VERIFY all at execution)

| URL | Use case | Verify note |
|---|---|---|
| https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax | HMRC compatible-software finder, the MUST-HAVE outbound link; the register is the source of truth for which products (free or paid) are recognised (§19.6) | 200-check; confirm live path; this is the link that lets the page defer product names per §19.6 |
| https://www.legislation.gov.uk/uksi/2026/336 | SI 2026/336, Income Tax (Digital Obligations) Regulations 2026, the LIVE MTD ITSA instrument (SI 2021/1076 REVOKED 1 Apr 2026 per §19.18) | If citing the operative MTD reg, use SI 2026/336, NOT SI 2021/1076 |
| https://www.gov.uk/guidance/penalties-for-late-submission | HMRC late-submission points-based penalty guidance (§19.7) | Confirm the page describes the points system; pair with the late-payment guidance for the 3%/3%/10% schedule |
| https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html | Spring Statement 2025, source for the 3% (day 15) / +3% (day 30) / +10% p.a. (day 31) late-payment schedule (§19.7) | Verify the verbatim percentages/days quoted in §19.7 still present |
| https://www.legislation.gov.uk/ukpga/2005/5/section/272 | ITTOIA 2005 s.272, UK property business, the records basis MTD digitises (context for the records-pack / true-cost section) | 200-check; confirm operative text not substituted |
| https://www.gov.uk/government/collections/making-tax-digital-for-income-tax | gov.uk MTD for Income Tax guidance collection, general cross-reference for the live mandate | Confirm live; use for the "mandate is live" framing |
| https://www.legislation.gov.uk/ukpga/2026/.../section/7 | FA 2026 s.7 (April 2027 property rates), ONLY if the page references 2027 income-tax rates at all; verify exact section + Royal Assent date (18 Mar 2026) per F-37 | Optional; cleaner to drop the rate reference and cite the §19.1 threshold drop instead |

**(Execution session selects 5-7 to actually cite in body; the HMRC compatible-software finder + SI 2026/336 + the late-submission penalty guidance are the three must-haves.)**

---

## Section-by-section content plan (~3,000 words)

Target: 10-12 H2s, ~3,000 body words, 12-14 FAQs, two reference TABLES (a free-vs-paid comparison table + a threshold/deadline reference table), 2 inline `<aside>` CTAs, 2-3 worked examples (including the eligibility-flow worked-through), 5-7 authority links. NO pricing anywhere.

1. **Intro (~150 words)**, frame the distinct intent explicitly and in the present tense: MTD for Income Tax has been LIVE since 6 April 2026 for landlords with gross qualifying income over £50,000 (falling to £30,000 from 6 April 2027). State the page's narrow job, helping you decide whether a genuinely-free product can carry YOUR obligation and what "free" actually costs, distinct from "which paid product is best" (forward-link to `best-mtd-software-landlords-2026` in the first 2 paragraphs) and "the full portfolio decision framework" (forward-link to the decision-tree page).
2. **H2 Is there genuinely-free MTD software for landlords? (~250 words)**, the direct answer to "is there free mtd software for income tax": yes, limited free routes exist (free tiers from some recognised vendors; FreeAgent free for eligible NatWest/RBS business-banking customers; HMRC pilot tooling for some segments; and a free spreadsheet + paid-or-free bridging route), but the HMRC-recognised register is the source of truth and free options are limited (§19.6). Defer product names to the register (link the HMRC compatible-software finder). Set up that "free" is conditional, leading into the constraint archetypes.
3. **H2 The three free-tier constraint archetypes (~450 words)**, the load-bearing section, expanding the decision-tree FAQ branch to full depth. (a) **Banking-tied** (free only while you bank with a specific provider, e.g. FreeAgent via NatWest/RBS; the free status is contingent and can lapse). (b) **Transaction-or-property-cap** (free up to N properties / N transactions / one income source, then it stops). (c) **Feature-cap** (the free tier omits bank-feed digital links, the end-of-period statement / final-declaration step, multi-property handling, or agent access, the things that make MTD low-effort and compliant). Explain why each archetype matters for compliance, not just convenience.
4. **H2 Free-tier viability: who can actually use free, and who cannot (~350 words)**, the eligibility decision flow. **Eligibility gates (free may work if ALL hold):** single property (or very few) + simple allowable expenses + no joint-owner share split complicating the threshold test (§19.4) + no foreign property income + gross qualifying income testing comfortably one side of a threshold (§19.2, gross not net) + comfortable with manual input. **Anything beyond → paid.** Present as a clear ordered flow with the §19.2 gross-test and §19.4 joint-owner-share gate spelled out. **Worked Example 1 (no pricing):** a single-property landlord, gross rent ~£18,000, simple expenses, sole owner, no foreign income, a genuinely-free route is viable; contrast a four-property landlord with a jointly-owned flat and an agent-managed HMO, free is not viable. Forward-link to `mtd-itsa-qualifying-income-test-gross-vs-net` for the gross-test detail.
5. **H2 Free vs paid: a side-by-side comparison (~300 words + TABLE)**, the qualitative capability/eligibility comparison (NO pricing). Lead with the **comparison TABLE** (see Tables block). Then a paragraph on reading the table: free tiers trade capability and eligibility headroom for zero cash cost; paid tiers buy automation, multi-property handling, agent collaboration and the compliance features that reduce error and penalty risk.
6. **H2 The true cost of free (~450 words)**, the second load-bearing section, the "free vs paid landlord software true cost" intent. Three hidden costs: (a) **Time** (manual entry, manual categorisation, manual reconciliation; quantify in qualitative terms, hours per quarter, NOT £); (b) **Missing compliance features** (no bank-feed digital link means more transcription risk and a §19.14 digital-link compliance question; weak validation increases error risk); (c) **The separate-final-declaration risk** (a free tier that handles quarterly updates but NOT the end-of-period statement / final declaration forces a second tool or a manual workaround at year-end, the single most common "free turned out not to be enough" failure). Frame the trade-off as time + compliance-risk vs cash, deferring actual pricing to vendor sites + a discovery call.
7. **H2 Is a free spreadsheet plus bridging a valid free route? (~250 words)**, the genuinely-free-without-a-vendor-tier option (§19.6/§19.14): a spreadsheet categorised into SA105 columns + HMRC-recognised bridging is acceptable, provided the data transfer is a "digital link" (cell references / formulae / CSV import, NOT copy-paste or manual re-keying, §19.14). Honest about who it suits (spreadsheet-comfortable, simple affairs) and who it does not. Forward-link to `landlord-accounting-spreadsheet-template-free-excel-guide`.
8. **H2 Penalties: what free vs paid actually changes about your risk (~300 words)**, CORRECT per §19.7. Late SUBMISSION is points-based (1 point per missed quarterly update; £200 ONLY at the 4-point threshold within 24 months; points reset after 24 months of full compliance; annual obligations have a 2-point threshold). Late PAYMENT is separate: 3% from day 15, +3% from day 30, +10% per annum from day 31 (Spring Statement 2025). The software angle: paid tiers' reminders/validation reduce missed-deadline and error risk; a free tier that lacks the final-declaration step raises year-end risk. Explicitly correct the common myth (NO immediate £200, NO £10/day). Include the **threshold/deadline reference TABLE** here or in §4 (see Tables block).
9. **H2 If free is not viable: choosing a paid product (~200 words)**, brief, qualitative (NO fees): the complexity at which paid pays for itself (multiple properties, joint ownership, agent collaboration, year-end final declaration); point to the HMRC-recognised register for the recognised list; forward-link to `best-mtd-software-landlords-2026` for the ranked picks and the decision-tree page for the full portfolio framework. Discovery-call CTA here.
10. **H2 What to do this week (~150 words)**, a present-tense action block (the mandate is LIVE): check whether your gross qualifying income crosses a threshold (§19.2); if in scope, pick a route now (free if all eligibility gates hold, else paid or spreadsheet+bridging); confirm it is on the HMRC-recognised register; set up before your next quarterly update deadline.
11. **Inline `<aside>` CTAs (2):** one after the eligibility flow (Worked Example 1), one after the true-cost section. `<aside><p>Headline</p><p>Body</p></aside>`, no classes, scroll-to-form, no duplicate LeadForm.
12. **FAQ block (12-14)**, see Query-coverage + FAQ set below. Each FAQ targets a distinct free-tier-viability / true-cost query. Strip the pricing FAQ (#3) and the "before April 2026" countdown FAQ (#4).

**FAQ set (target 12-14):** (1) Is there genuinely-free MTD software for landlords? (2) Is FreeAgent free for landlords through NatWest, and is it MTD-ready? (3) Can I use free MTD software if I have one property? (4) Is free MTD software tested on gross or net income for the threshold? (5) What does "free" MTD software actually cost me in time and risk? (6) Does free MTD software handle the end-of-period statement and final declaration? (7) Can I use a free spreadsheet plus bridging software for MTD? (8) What is a digital link, and does a free tier provide one? (9) Is free MTD software viable for a jointly-owned property? (10) What are the penalties for missing an MTD quarterly update? (11) Are there immediate £200 or daily £10 penalties for late MTD submission? (12) When does free MTD software stop being enough? (13) Where is the official list of recognised free MTD software? (14) Will free software still work when the threshold drops to £30,000 in April 2027? Preserve/upgrade the 2 non-defective existing FAQs into this set; strip the pricing FAQ and the countdown FAQ.

**Tables (REQUIRED, plain HTML, NO pricing):**

- **Comparison TABLE, "Free tiers vs paid tiers at a glance" (in §5):** columns = `Capability / consideration | Typical free tier | Typical paid tier`. Rows = Number of properties supported · Bank-feed digital link · Expense categorisation into SA105 categories · Quarterly update submission · End-of-period statement + final declaration · Multi-user / accountant access · Validation and reminders · Support level · Best suited to. (Qualitative cells only, e.g. "usually capped" / "usually included", "limited" / "automated"; NO £ figures, NO percentages-of-rent.)
- **Reference TABLE, "Who is in scope and when" + quarterly deadlines (in §8 or §4):** a two-part scan aid. Part A scope: rows = From 6 April 2026 / From 6 April 2027 / From 6 April 2028; columns = `Date | Gross qualifying income threshold | Status`, values £50,000 (live now) / £30,000 / £20,000. Part B quarterly-update deadlines (§19.6): rows = the four standard UK-tax-year quarters + EoPS + final declaration; columns = `Update period | Submission deadline` (6 Apr-5 Jul → 7 Aug; 6 Jul-5 Oct → 7 Nov; 6 Oct-5 Jan → 7 Feb; 6 Jan-5 Apr → 7 May; final declaration → 31 Jan following year-end). Note calendar-quarter election availability from 6 April 2026.

---

## Statute spine (every section number with its Act, VERIFY each at write time)

- **SI 2026/336**, Income Tax (Digital Obligations) Regulations 2026, the LIVE MTD ITSA instrument (SI 2021/1076 REVOKED 1 April 2026 per §19.18). Cite this, NOT SI 2021/1076, as the operative MTD reg. (legislation.gov.uk)
- **ITTOIA 2005 s.272**, UK property business; the records basis MTD ITSA digitises (context for the records / true-cost section). (legislation.gov.uk)
- **FA 2021 Sch 26**, late-submission points-based penalty framework + late-payment penalties (the §19.7 spine; note the Spring Statement 2025 MTD ITSA acceleration to 15/30/31 days at 3%/3%/10%, verify FA 2025 amendment status at write time). (legislation.gov.uk)
- **FA 2026 ss.6-7**, April 2027 property income tax rates (22/42/47, England/Wales/NI), Royal Assent 18 March 2026 (§7). ONLY if the page references 2027 income-tax rates at all; verify exact section + Royal Assent date per F-37. Cleaner to omit the rate reference and cite the §19.1 threshold drop. (legislation.gov.uk)
- **F(No.2)A 2017 / FA 2022 / TMA 1970 hooks for the MTD ITSA primary obligation**, the primary-law anchor for the digital-requirements regime sits in TMA 1970 (as amended) with the detail in the SI; cite only if needed and VERIFY the exact provision at write time (do NOT guess the section number, §16.31). (legislation.gov.uk)

**Non-statute authority (the must-haves, see Authority links table):** HMRC compatible-software finder (gov.uk/guidance/find-software...); HMRC late-submission penalty guidance; Spring Statement 2025 HTML (the verbatim 3%/3%/10% at 15/30/31 source); gov.uk MTD for Income Tax collection.

**Verify-at-write discipline (HARD RULE):** every statute cite checked against legislation.gov.uk at write time, including Royal Assent / commencement / revocation status. The live examples for THIS page: SI 2021/1076 → SI 2026/336 revocation (§19.18, the program's 13th Bill-vs-enacted catch) and the FA 2026 ss.6-7 Royal Assent (18 March 2026, F-37). Do NOT cite SI 2021/1076 as live. Do NOT assert 2027 rates as "draft / a proposal / a surcharge to come" (enacted) and do NOT introduce a 2027-rate assertion at all unless it earns its place (a software page does not need it).

---

## Competitor depth benchmark

| Dimension | Competitor ceiling (4 URLs) | This rewrite target |
|---|---|---|
| Word count | ~1,200-2,000 | ~3,000 |
| FAQs | 0-few | 12-14 |
| Statute / SI citations | 0 | 3-5 verified (incl. SI 2026/336) |
| Worked examples | 0-1 (prose) | 2-3 incl. the eligibility-flow worked-through (single-property free-viable vs multi-property not-viable) |
| Free-tier constraint archetypes | partial (mtd.digital touches free) | full (banking-tied / cap / feature-cap, to depth) |
| True-cost-of-free section | partial (uselatch ROI, price-led) | full (time + missing compliance features + separate-final-declaration risk), no pricing |
| Eligibility decision flow | absent | present (§19.2 gross + §19.4 joint-owner gates) |
| Non-priced comparison table | absent (competitors are price-led) | present (capability/eligibility columns, NO £) |
| Penalty facts | often wrong or absent | CORRECT (§19.7 points-based + 3%/3%/10% late payment) |
| Inline CTAs | varies | 2 (scroll-to-form) |

Result: decisively best-in-class on the free-tier-viability + true-cost-of-free intent, not catch-up, and the only page in the comparison that gets penalties right and publishes no pricing.

---

## Query-coverage plan

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| compare mtd plans benefits | gsc | 11 | 9.0 | H2 #5 (Free vs paid: a side-by-side comparison, the comparison-table H2 captures the "compare plans benefits" intent qualitatively) |
| compare mtd plans setup | gsc | 7 | 47.4 | H2 #10 (What to do this week, the present-tense setup action block) |
| best free mtd software for landlords | gsc | 4 | 74.2 | H2 #2 (Is there genuinely-free MTD software for landlords?) + defers ranked picks to best-software via forward-link |
| compare mtd plans guide | gsc | 4 | 88.3 | H1 (the page IS the free-vs-paid guide; H1 carries "guide" intent) |
| compare mtd plans tools | gsc | 3 | 63.5 | H2 #5 comparison TABLE (the tool-by-tool capability comparison) |
| compare mtd plans platform | gsc | 2 | 91.0 | body§ (§9 If free is not viable: choosing a paid product, platform-selection touch, forward-link to best-software) |
| compare mtd plans | gsc | 2 | 87.5 | metaTitle (the free-vs-paid comparison framing) |
| compare mtd plans features | gsc | 2 | 59.0 | H2 #3 (The three free-tier constraint archetypes, the feature-cap archetype) |
| compare mtd plans software | gsc | 1 | 94.0 | body§ (§7 spreadsheet + bridging, software-route comparison touch) |
| landlord vision mtd | gsc | 1 | 73.0 | FAQ#13 (Where is the official list of recognised free MTD software?, defers named products to the HMRC register per §19.6) |
| landlords mtd | gsc | 1 | 50.0 | summary (frontmatter summary carries the broad "landlords MTD" framing) |
| mtd for landlords free | gsc | 1 | 19.0 | FAQ#1 (Is there genuinely-free MTD software for landlords?) |
| mtd landlord software | gsc | 1 | 61.0 | metaDescription (MTD landlord software framing) |
| free mtd software for landlords | adjacent | 0 | 0 | H2 #2 + H2 #4 (free-tier viability, the primary narrowed intent) |
| free landlord accounting software uk mtd ready | adjacent | 0 | 0 | FAQ#7 (Can I use a free spreadsheet plus bridging software for MTD?) |
| is there free mtd software for income tax | adjacent | 0 | 0 | H2 #2 (the direct-answer H2) |
| free vs paid landlord software true cost | adjacent | 0 | 0 | H2 #6 (The true cost of free) |
| hmrc free mtd software landlords | adjacent | 0 | 0 | FAQ#13 (Where is the official list of recognised free MTD software?, HMRC compatible-software finder) |
| freeagent natwest mtd landlord free | adjacent | 0 | 0 | FAQ#2 (Is FreeAgent free for landlords through NatWest, and is it MTD-ready?) |
| free mtd software for landlords with one property | adjacent | 0 | 0 | FAQ#3 (Can I use free MTD software if I have one property?) + Worked Example 1 |

Each target_queries[] item assigned exactly once (21 rows for 21 items).

---

## Meta plan

- **metaTitle (<=62):** `Free MTD Software for Landlords: Is It Viable + True Cost` (56 chars), leads with "Free" + "viable" + "true cost" to claim the narrowed intent and separate from best-software's ranked-picks framing.
- **metaDescription (<=158):** `Is genuinely-free MTD software viable for your landlord obligation? The free-tier limits, the eligibility gates and what free really costs in time and risk.` (154 chars), names the narrowed deliverables; no pricing; no em-dash.
- **h1:** `Free MTD Software for Landlords: Viability and the True Cost of Free`, free-tier-viability led, distinct from both canonicals.
- **summary (frontmatter):** `A practical guide for landlords deciding whether genuinely-free MTD for Income Tax software can carry their obligation: the three free-tier limits, the eligibility gates that decide whether free works for you, and what free really costs in time, missing compliance features and year-end risk, now the mandate is live.`

---

## Schema plan

- **Reviewer name:** `ICAEW Qualified Senior Reviewer` (anonymised, consistent with the lead-gen handoff model and the dominant corpus convention; NO named individual, NO real client names).
- **Reviewer credentials (`reviewerCredentials`):** `Chartered Accountant (ACA, ICAEW), MTD and Compliance Specialist` (matches the corpus convention for MTD-led pages; fits this page's MTD/software/compliance focus).
- **howTo:** `false`. The page is a decision/comparison guide with an eligibility flow, worked examples and FAQs, but it is not a single linear step-by-step procedure that warrants HowTo JSON-LD; keep it as Article + FAQPage to avoid schema-spam and intent mismatch. (The "What to do this week" block is an action list, not a formal HowTo procedure; default false.)
- **dateModified:** `2026-05-30`.
- **JSON-LD blocks emitted:** `BlogPosting` (Article) + `FAQPage` (auto-emitted from the frontmatter `faqs:` array via `buildBlogPostingJsonLd`; do NOT hand-add FAQ schema in body) + `BreadcrumbList` + `Organization` + `Person` (author/reviewer) per the standard template. NO HowTo block.

---

## Universal rules (do not skip)

Inherited from parent program (`NETNEW_PROGRAM.md §4` voice + `competitor_rewrite_playbook.md §5`). **Critical for this brief:** NO pricing/fees anywhere (strip all three leaks; Decision E covers soft general-market fee comparisons too, the page must convey the free/paid trade-off QUALITATIVELY, deferring actual pricing to the HMRC-recognised vendor sites and a discovery call). NO em-dashes (commas, parentheses, full stops, middle dots). Anonymised social proof only; NO real client names. LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 2 inline `<aside>` CTAs only. No Tailwind classes in markdown body; semantic HTML; FAQs in frontmatter only. Every statute / SI cite verified at write time against legislation.gov.uk including commencement/revocation status (SI 2026/336 not SI 2021/1076; FA 2026 ss.6-7 Royal Assent 18 Mar 2026).

---

## 19-step workflow (legacy-rewrite adaptation, Track 2 deltas per §4 sections 13-14)

1. Read `docs/property/house_positions.md` §3, §19 (esp. §19.1/§19.2/§19.4/§19.6/§19.7/§19.8/§19.9/§19.14/§19.18), §7, §4, §13 in full.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status).
3. Read this brief end-to-end.
4. **Verify-at-write statute pass:** SI 2026/336 (confirm SI 2021/1076 revoked 1 Apr 2026); FA 2021 Sch 26 + the Spring Statement 2025 15/30/31 at 3%/3%/10% acceleration; ITTOIA 2005 s.272; FA 2026 ss.6-7 Royal Assent 18 Mar 2026 (only if a 2027-rate reference is kept, F-37 discipline). Confirm the penalty facts match §19.7 BEFORE writing the penalty section.
5. WebFetch the 4 competitor URLs; confirm 200; date-stamp; replace any non-200 (carry-forward verification if blocked, F-36).
6. Read the current source file in full + the two cluster canonicals (`best-mtd-software-landlords-2026`, `mtd-itsa-choosing-software-by-landlord-scenario-decision-tree`) to set forward-link anchors and confirm the intent split holds; read the spreadsheet sibling for the §19.14 forward-link anchor.
7. Plan outline: 10-12 H2s, ~3,000 words, 12-14 FAQs, 2 inline CTAs, 2 reference tables, 2-3 worked examples.
8. **Rewrite markdown at existing path** (NOT new file). Preserve slug + canonical + category `Making Tax Digital (MTD)`. Update `dateModified` to 2026-05-30. ADD `reviewedBy` + `reviewerCredentials` + `reviewedAt`. New metaTitle/metaDescription/h1/summary per Meta plan. Bump `date` to the write date (substantive rewrite).
9. Correctness pass: flip all "before April 2026" framing to "live since 6 April 2026"; replace the wrong penalty block with §19.7; replace the wrong 2027-rate reference with the §19.1 £30,000 threshold drop. Strip all three pricing leaks; replace with qualitative framing + discovery-call CTA.
10. Build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle <=62; metaDescription <=158; all internal links resolve; PRICING check `grep -E '£[0-9]|[0-9]+%' body` returns no fee/percentage-of-rent lines (statutory figures like £50,000 / £30,000 / £20,000 thresholds, 20% Section 24 credit, and the 3%/3%/10% penalty percentages are statutory, not pricing); PENALTY check that no "immediate £200" / "£10 daily" / "loss of cash basis eligibility" string survives; TENSE check that no "before April 2026" / "ahead of April 2026" countdown survives.
12. Confirm no redirect (REWRITE-only; this page is the cluster equity-loser and could only ever be a 301 source, never a target, see Cannibalisation block).
13. Update / insert `monitored_pages` Supabase row (rewrite_type=`rewrite`; 180-day window given INVISIBLE baseline per F-11 recommendation).
14. Commit on `main`. Tracker edits via absolute paths only.
15. Mark ✅ executed in `track2_page_tracker.md`.
16. Raise the PRICING_LEAK + wrong-penalty + tense + 2027-conflation flags in `track2_site_wide_flags.md` (plus the cluster-audit recommendations: cluster pricing-leak audit; MTD-cluster penalty-fact audit; MTD-cluster tense sweep).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries (cluster pricing-leak + penalty-fact + tense audits; reciprocal canonical inbound-link repointing).
19. Next page / end batch.

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §3 / §19.1 thresholds (preserve; reframe £50k to live): __
- §19.2 gross test added to eligibility flow: __
- §19.4 joint-owner share gate added: __
- §19.6 HMRC register source-of-truth + free-tier framing + spreadsheet+bridging: __
- §19.7 penalty regime CORRECT (points-based + 3%/3%/10% late payment): __
- §19.9 do-not-write checks (no immediate £200, no 2%/2%/4%, no "MTD for Ltd Cos"): __
- §19.14 digital-link rule (spreadsheet route): __
- §19.18 SI 2026/336 cited (not SI 2021/1076): __
- §7 April 2027, 2027-rate reference dropped OR asserted-as-enacted with citation: __
- §4 Section 24 wording aligned to 20% basic-rate reducer: __
- §13 do-not-write (pricing stripped, all three): __ confirmed

### Comparison: before vs after
- Word count: 1,250 → __
- H2 count: 8 (+ 9 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 0 → __
- Comparison table present: __ (Y/N)
- Threshold/deadline reference table present: __ (Y/N)
- Pricing leaks removed: __ (Y/N, all three)
- Wrong penalty block replaced: __ (Y/N)
- "Before April 2026" countdown removed: __ (Y/N)
- 2027 conflation fixed (threshold drop, not rates): __ (Y/N)
- reviewedBy / reviewerCredentials / reviewedAt added: __

### Flags raised
- PRICING_LEAK (confirmed all three stripped): __
- STALE_FACTS wrong-penalty (confirmed replaced): __
- STALE_FACTS tense (confirmed flipped): __
- STALE_FACTS 2027 conflation (confirmed reframed): __
- Cluster-audit recommendations logged (pricing / penalty / tense): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
