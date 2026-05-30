# Track 2 brief: full-expensing-capital-allowances

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; INVISIBLE + STALE_FACTS + THIN_DEPTH + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/full-expensing-capital-allowances.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/full-expensing-capital-allowances
**Stage 1 priority:** M (medium — near-zero GSC equity, but a structurally cheap rewrite that removes 5 confirmed wrong-advice facts and de-duplicates the full-expensing cluster without 301 churn)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (statutes WebFetch-verified against legislation.gov.uk; cluster + inbound-link map read from filesystem; GSC/Bing equity taken from diagnosis JSON)
**Cannibalisation status:** REWRITE (collapse to the deep node was BLOCKED by the data-gated collapse guard — see §"Cannibalisation universe check" and the guard reasoning below; the rewrite re-positions this page to a distinct decision-layer intent so it does NOT re-open the cannibalisation pair)

> **Why REWRITE and not REDIRECT.** The diagnosis proposed a 301 into the Wave-6 deep node `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`. The deterministic collapse guard (`scripts/track2_collapse_guard.py`, §16.T2 / R6) REVERSED that decision: the target records effectively 0 sustained GSC impressions over 0 weeks (brand-new, unproven), while this source carries marginal-but-real equity (2 impr) and 2 inbound links. Collapsing an established page into an unproven one is the wrong direction (§16.T1 deterministic floor; matches the `capital-allowances-on-property` parked-collapse precedent in house_positions §38). **Action: REWRITE the source.** The load-bearing constraint is that the rewrite must NOT re-manufacture a near-duplicate of the deep node (which would re-open the cannibalisation pair the diagnosis flagged). The distinctiveness strategy below pivots this page to a different reader intent (the investor-side decision/routing layer) so the two pages are complementary, not competing.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `full-expensing-capital-allowances`. The slug is the generic head-term ("full expensing capital allowances"); the deep node owns the long-tail SPV-mechanics term. No redirect proposed (guard-blocked). No slug change.
- **Category:** `Property Types & Specialist Tax` (kept — matches the deep node and the pillar, so internal-cluster linking stays clean).
- **Gap-mode tag:** `STALE_FACTS` (primary — 5 confirmed wrong/stale facts, several on the do-not-write list) + `STRUCTURE` (secondary — empty rendered FAQ block, dead source citation, no rates table) + `THIN_DEPTH` (tertiary — 1,408 words of generic "what is full expensing" with no investor-side routing logic) + `INVISIBLE` (context, not a fixable lever — 2 impressions / pos 51; do NOT set a position-CTR-benchmark target for this page, same temper as the INTENT-MISMATCH discipline in §20).
- **"Why this rewrite" angle:** This page is not failing on CTR (it has almost no impressions to convert). It is failing on **correctness and distinctiveness**. It currently ships five facts that contradict locked house positions (§25.7, §25.10, §38), including two phrasings on the explicit do-not-write list ("Full expensing is temporary, set to expire" and full-expensing-as-residual-company-route framing of the new FYA). Leaving wrong advice live is the real cost, not the lost clicks. The rewrite's job is therefore: (1) **correct every stale fact**; (2) **re-position the page** from a fourth "what is full expensing" explainer (which the deep node already does better, ~5,000 words, full s.45S/s.45T/s.46/s.61 treatment) to the **investor-side decision layer** the deep node does NOT own: "I am a property investor. Can *I* claim full expensing, and if the answer is no (which it usually is), what is my actual route?" The load-bearing pivot is the **s.35 dwelling-house bar plus the routing fork** (company commercial → full expensing s.45S; unincorporated or leasing → the new FA 2026 s.45U 40% FYA from 1 Jan 2026; residential dwelling plant → barred, AIA/WDA on common parts only). This is a genuinely different page from the deep node, which is a commercial-SPV mechanics deep-dive. Body lift to ~2,400 to 2,800 words with a routing/decision table at the top, a worked routing example, and a hard de-duplication boundary against the deep node (link out, do not re-explain s.45S clawback mechanics in depth).

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`full-expensing-capital-allowances.md`, dateModified 2026-05-20):**
- **Word count:** ~1,408 (body)
- **H2 outline (13 H2s):** What Is Full Expensing? / Who Can Claim Full Expensing? / What Assets Qualify? / What Is the 50% First-Year Allowance? / How Does Full Expensing Interact with Corporation Tax? / What Happens When You Sell the Asset? / Full Expensing vs AIA / Full Expensing and Property Development / Full Expensing and Furnished Holiday Lettings / How to Claim Full Expensing / Future of Full Expensing / Common Mistakes to Avoid / Getting Professional Advice
- **metaTitle:** "Full Expensing Capital Allowances: Guide for UK Property" (54 chars)
- **metaDescription:** "Full expensing capital allowances explained for UK property investors. Learn who qualifies, what assets are covered, and how to claim a 100% deduction." (150 chars)
- **h1:** "Full Expensing Capital Allowances: A Guide for UK Property Investors"
- **FAQ count (frontmatter `faqs:`):** 4. **Rendered FAQ block is EMPTY** — the body has a bare `<h2>Frequently Asked Questions</h2>` (line 99) with no Q&A under it; the FAQ content lives only in frontmatter. Structural defect: a visible "FAQ" heading with nothing beneath it.
- **Worked examples:** 0
- **Rates / routing table at top:** 0
- **Internal links:** 4 (buy-to-let-limited-company-complete-guide-uk; /services; capital-gains-tax-property-complete-guide-uk; /incorporation; /contact). NO link to the deep node or the pillar.
- **Outbound authority links:** 5 source citations, of which one is a **dead/abolished URL** (ref [3] = `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm`, the abolished water-technology ECA scheme, cited to support an AIA point it does not support).
- **Inbound internal links (from the live corpus):** 2 — the pillar (`capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`) and the deep node (`full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023`) both reference this slug. **Both are preserved (no redirect), so no inbound-link surgery is needed** — but the rewrite should make the destination worth the inbound link by giving it a distinct decision-layer role.
- **Pricing leak:** NONE found (clean on lead-gen handoff model).
- **Real client names:** NONE found.
- **Em-dashes:** NONE found.

---

## GSC angle (last 90 days) — from diagnosis JSON

**Aggregate (this page):** **2 impressions / 0 clicks / avg position 51 / 0% CTR.** Two recorded head-term GSC query fragments: "hmrc full expensing" and "can you claim capital allowances on investment property". Both are served more authoritatively by the canonical deep node (5,000 words, full statute treatment) — which is precisely why the diagnosis tried to collapse, and why the rewrite must NOT chase those exact head-terms (they belong to the deep node).

**Bing:** empty (no Bing equity to protect on either side).

**Read:** this is an **INVISIBLE** page (pos 51 = page 5+). There is no CTR lever and no AI-Overview-loss lever; the page simply does not rank. Do **not** set a "5 to 10x clicks" target. The success criterion for this rewrite is **correctness + de-duplication + a defensible distinct intent**, not a click lift. Realistic GSC expectation post-rewrite: the page may pick up long-tail "can I as a [sole trader / individual landlord] claim full expensing" and "40% first year allowance landlord" queries that the company-only deep node does not target — modest, tail-only, and only if the decision-layer pivot lands. Verify at +90 / +180 via `monitored_pages` (use the 180-day INVISIBLE-baseline window per the F-11 recommendation).

**GA4:** no engagement signal pulled (INVISIBLE page; effectively no sessions). Defer to execution-time `ga4_page_data` pull if any sessions have accrued.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (wrong-advice on a tax-compliance page).** Five confirmed defects, several on the locked do-not-write lists:

1. **STALE / do-not-write violation:** FAQ #4 and the "Future of Full Expensing" H2 both say full expensing is "available... until at least 31 March 2026" and that the government "intends to make the relief permanent, but legislation has not yet been passed." **This is false and is explicitly banned.** Full expensing is ALREADY PERMANENT: CAA 2001 s.45S has **no sunset clause** (verified at legislation.gov.uk 2026-05-30; inserted by F(No.2)A 2023 s.7(3), commencement 22 Feb 2024 per the FA 2024 s.1 amendment; permanence confirmed Autumn Statement 2023 + Autumn Budget 2024). house_positions §25.10 and §38 both ban "Full expensing is temporary, set to expire."
2. **WRONG (corporation-tax arithmetic):** the "Interaction with Corporation Tax" H2 says "the small profits rate of 19% applies for profits under £250,000." **False.** Post-FA-2021: 19% small profits rate applies under **£50,000**; 25% main rate applies above **£250,000**; marginal relief applies between £50,000 and £250,000. This conflates three post-FA-2021 changes (the F-31 / D-8 / D-10 small-profits-rate cluster pattern — this page is another instance).
3. **IMPRECISE / misleading (do-not-write adjacent):** the "Future of Full Expensing" H2 frames the "40% first-year allowance from 1 January 2026" as a **residual fallback for company assets that fail the 100%/50% test**. **Misleading.** The new 40% FYA (FA 2026 s.29, inserting new **CAA 2001 s.45U**, RA 18 March 2026, expenditure on or after 1 Jan 2026) is deliberately the **UNINCORPORATED-business / leasing route** (sole traders, partnerships, individual landlords), i.e. precisely where full expensing is NOT available. house_positions §38 do-not-write bans framing it as the company residual route. This is the single highest-value correction because it is also the **distinctiveness pivot** (see below).
4. **BROKEN CITATION:** source ref [3] is the dead `aka.hmrc.gov.uk/.../fya/water.htm` (abolished water-technology ECA scheme), cited to support an AIA point. Replace with a live gov.uk AIA reference.
5. **STRUCTURE defect:** the rendered FAQ block is empty (`<h2>Frequently Asked Questions</h2>` with no body Q&A). The frontmatter has 4 FAQs but they are not rendered visibly under the heading. Confusing for readers and weak for any FAQ snippet.

**Secondary: STRUCTURE.** No routing/decision table at top; one dead authority link; empty FAQ block; FAQ count 4 vs 10-14 target.

**Tertiary: THIN_DEPTH + de-duplication.** At 1,408 words this is a generic explainer whose intent is fully subsumed by the 5,000-word deep node. The fix is NOT "make it longer in the same direction" (that re-opens the cannibalisation pair). The fix is **re-aim it** at the investor decision/routing intent and link out to the deep node for the mechanics.

**INVISIBLE (context, not a lever):** pos 51, 2 impr. No CTR target.

**Load-bearing fix sequence (ordered by ROI):**

1. **Correct all five stale/wrong facts FIRST** (this is the reason the page is being touched at all). Permanence (no sunset), small-profits-rate £50k/£250k bands, 40% FYA = unincorporated route (s.45U), dead-link replacement, FAQ rendering.
2. **Re-position to the investor decision layer.** New lead section: a **routing table / decision tree** answering "as a property investor, which capital-allowance route applies to me?" keyed on (a) entity (company vs unincorporated), (b) property type (commercial vs residential dwelling vs HMO common parts), (c) asset use (own use vs leasing out). This is the page's distinct value; the deep node does not lead with this.
3. **De-duplication boundary against the deep node.** Cover the s.45S full-expensing route at decision-layer depth only (who/what/why-it-usually-does-not-apply-to-residential), then explicitly link out: "for the full s.45S mechanics, the 50% special-rate companion, the s.46 leasing-out exclusion and disposal-value clawback for commercial property SPVs, see [the deep node]." Do NOT re-explain s.45T disqualifying arrangements or s.61 clawback mechanics in depth here.
4. **Add the unincorporated route as a first-class section** (s.45U 40% FYA, AIA £1m, WDA pools), because this is the route that actually applies to most readers of a generic "full expensing for property investors" query and is the page's differentiator from the company-only deep node.
5. **Body lift to ~2,400 to 2,800 words**, 1 worked routing example (not a full clawback computation — that is the deep node's), 10-14 FAQs (each visible in body or correctly rendered), 4-6 verified authority links, 1-2 inline `<aside>` CTAs.
6. **Meta rewrite** to a routing/decision angle distinct from the deep node's "CAA 2001 s.45S Mechanics" angle.

---

## Competitor URLs (Stage 2 — verify liveness at execution per §16.31)

The four competitor targets carried in the diagnosis. Execution session must WebFetch each, confirm 200 status, and date-stamp; replace any non-200.

| URL | Verify at execution | What to borrow | What to differentiate against |
|---|---|---|---|
| https://lanop.co.uk/uk-full-expensing-capital-allowances/ | Status + word count + whether it states permanence correctly | The "who qualifies" clarity; a clean eligibility checklist | They write the generic explainer; we write the **investor routing decision** + the unincorporated 40% FYA route |
| https://www.ukpropertyaccountants.co.uk/capital-allowances-full-expensing-and-50-fya/ | Status + whether 50% FYA is tied correctly to special-rate pool | Their special-rate vs main-rate split framing | Differentiate: they do not lead with the s.35 dwelling-house bar that blocks most residential investors |
| https://lovellconsulting.com/property-investor/ | Status + which property-investor capital-allowance angle they take | Property-specialist framing (fixtures, surveys) | Differentiate: route-by-entity decision layer; do not copy their survey-service pitch |
| https://www.hmatax.co.uk/how-full-expensing-and-capital-allowances-work-together-in-2025 | Status + whether the "2025" framing is now stale | The "how they work together" interaction framing | Differentiate: our interaction framing routes by entity/property-type and is FA-2026-current (14% WDA, new s.45U 40% FYA), not 2025-stamped |

**Competitor depth ceiling for this query class:** generic explainers, typically 1,200 to 2,000 words, 0 to a few FAQs, usually stale on permanence and on the new 40% FYA. Our ~2,400 to 2,800-word decision-layer page with a routing table, the FA-2026-current rates, 10-14 FAQs, and 4-6 verified statute citations is best-in-class for the **investor-routing** intent (we deliberately cede the SPV-mechanics depth crown to our own deep node).

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (current Track 2 index). Cluster facts cross-checked against the live corpus 2026-05-30.

**The full-expensing intent cluster has three pages (all category `Property Types & Specialist Tax`):**

| Source | Slug | Role | Resolution |
|---|---|---|---|
| Residual (own) | full-expensing-capital-allowances | THIS page | REWRITE in place; re-aim to investor decision/routing layer |
| Live corpus (Wave 6 deep node) | full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 | Canonical s.45S mechanics deep-dive (~5,000 words; full s.45S/s.45T/s.46/s.61; 50% special-rate companion; leased-plant question; 8 inbound links) | **No collision after re-aim.** This page links OUT to it for mechanics; this page owns the investor-routing/decision intent it does not lead with. The 301-collapse was guard-BLOCKED (target unproven). |
| Live corpus (pillar / hub) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | CAA 2001 decision-framework hub; designates the deep node as the canonical full-expensing node | **No collision.** This page is a spoke; it links UP to the pillar and references the deep node as the mechanics authority. The pillar's "decision framework" is corpus-wide CAA 2001; THIS page's decision layer is narrowly the full-expensing-vs-40%-FYA-vs-AIA routing fork for the investor. |

**Guard result (the load-bearing data gate):** the diagnosis recorded a `collapse_blocked_to` verdict against the deep node with `guard_reason`: target is NOT an established ranking asset (0 clicks, 0 sustained impr over 0 weeks) while the source is more established (2 vs 0 impr); collapsing into an unproven page is the wrong direction. Per §16.T2 / §16.T3 / risk-register #9, the deterministic floor wins: **do not 301.** Rewrite the source.

**De-duplication contract for the writer (mandatory):**
- Lead with the **investor routing decision** (entity × property-type × asset-use). The deep node does not lead with this.
- Cover s.45S at decision-layer depth only; **link out** to the deep node for s.45S/s.45T/s.46/s.61 mechanics, the 50% special-rate companion, and disposal-value clawback. Do NOT re-explain those mechanics here.
- Give the **unincorporated 40% FYA route (s.45U)** first-class treatment — this is the page's differentiator (the deep node is company-only).
- Worked example must be a **routing example** ("which relief does this investor get?"), not a full clawback computation (that is the deep node's).

**Conclusion:** REWRITE in place with a hard distinctiveness pivot. No REDIRECT (guard-blocked). No FLAG-MANAGER beyond the standard stale-fact flag (raised below).

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page within the live corpus):

- **Deep node (mechanics authority):** `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — forward-link from the s.45S section ("for the full SPV mechanics, see..."). This is the most important new internal link; it both serves readers and signals the canonical for the s.45S head-terms.
- **Pillar (hub):** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — up-link from the intro / routing section ("part of our complete CAA 2001 decision framework").
- **AIA (sibling routes):** `annual-investment-allowance-uk` and `annual-investment-allowance-landlords-uk` — forward-link from the "Full Expensing vs AIA" / unincorporated-route section (these are the Track 2 batch-4 FA-2026-locked pages per house_positions §38, so they are FA-2026-current).
- **WDA pools:** `writing-down-allowance-rates` (FA-2026-locked, 14% main pool) — forward-link from the "what happens to expenditure above the cap / non-FYA assets" section.
- **Fixtures (commercial):** `commercial-property-fixtures-s198` — forward-link from the commercial-property branch of the routing table (s.198 election context for buyers).
- **HMO common parts (s.35 exception):** `hmo-common-parts-s35` — forward-link from the residential / dwelling-house-bar branch (the narrow exception that plant in communal common parts of a multi-let can qualify).
- **Incorporation (entity fork):** `buy-to-let-limited-company-complete-guide-uk` (already linked) — keep; it is the entity-choice context for "company route unlocks s.45S full expensing."
- **CGT pillar:** `capital-gains-tax-property-complete-guide-uk` (already linked) — keep only if the disposal paragraph survives the de-dup trim; otherwise drop in favour of the deep node link.

Replace the current `/services`, `/incorporation`, `/contact` bare-route links with the LeadForm-driven inline CTAs (auto-injected) plus the specific blog internal links above.

---

## House-position references (Stage 1)

- **§25 CAA 2001 capital allowances (Wave 6 cluster)** [LOCKED 2026-05-23] — the working spine. Specifically:
  - **§25.1** s.15 qualifying activity + the FHL omission of s.15(1)(c)/(da) from 1 Apr 2025 (CT) / 6 Apr 2025 (IT) by FA 2025 Sch 5 Part 3 — corrects the source's FHL paragraph.
  - **§25.2 / §25.10** s.35 dwelling-house restriction (plant in a dwelling barred; narrow common-parts exception) — the **load-bearing distinctiveness pivot** for the residential branch of the routing table.
  - **§25.5** s.45S full expensing (company-only, unused-only, no sunset); s.46 General Exclusions (GE2 cars, GE6 leasing); the leasing-out exclusion.
  - **§25.7** FHL transitional (FA 2025 Sch 5; NOT FA 2024 Sch 5).
  - **§25.10** do-not-write list (full expensing is company-only; not temporary; not for second-hand; AIA £1m permanent not £200k).
- **§38 CAA 2001 — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified] — the FA-2026-current rate layer. Specifically:
  - **Main-pool WDA 14%** (FA 2026 s.28, into CAA 2001 s.56(1); effective chargeable periods beginning on/after 1 Apr 2026 CT / 6 Apr 2026 IT; hybrid time-apportioned rate for straddling periods).
  - **Special-rate pool WDA 6%, UNCHANGED.**
  - **New 40% FYA** (FA 2026 s.29; unincorporated + leasing; ex-cars, ex-second-hand, ex-leasing-overseas; from 1 Jan 2026). **Verified at write time: FA 2026 s.29 inserts new CAA 2001 s.45U (40% FYA) + s.45V (disqualifying arrangements).** Cite FA 2026 s.29 and/or CAA 2001 s.45U.
  - **AIA £1,000,000 permanent** (CAA 2001 s.51A(5); F(No.2)A 2023 s.8, RA 11 July 2023, from 1 Apr 2023).
  - **Full expensing 100% FYA companies-only** (CAA 2001 s.45S); distinct from the new 40% FYA (s.45U).
  - **§38 do-not-write:** "WDA is 18%" (now 14%); "special rate falls to 4%" (stays 6%); "Full expensing is available to individual landlords" (companies only; the 40% FYA is the unincorporated route); "Cars qualify for AIA or the 40% FYA" (excluded from both).
- **§13 Do-not-write list** [LOCKED] — NO pricing; NO real client names; NO FHL-BADR as if alive.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — multiple stale/wrong facts contradicting locked positions.** The current published page contradicts §25.7, §25.10, and §38 in five places (enumerated in the gap-mode diagnosis): (1) full-expensing-is-temporary framing (banned by §25.10 + §38); (2) wrong £250k small-profits-rate band (should be £50k / £250k marginal-relief; the F-31/D-8/D-10 cluster pattern); (3) the new 40% FYA framed as a company residual route rather than the unincorporated route (banned by §38 do-not-write); (4) dead `aka.hmrc.gov.uk` citation; (5) empty rendered FAQ block.

Correcting these is the rewrite's **first job** (before any depth/structure work).

Flag to `track2_site_wide_flags.md` as:

> **F-[next] | 2026-05-30 | HIGH | full-expensing-capital-allowances | STALE_FACTS + HOUSE_POSITION_CONFLICT | Five defects: (1) "full expensing temporary / until 31 Mar 2026 / not yet permanent" — banned by §25.10 + §38 (s.45S has no sunset, permanent since Autumn Statement 2023). (2) "19% small profits rate under £250,000" — wrong; 19% under £50k, 25% over £250k, marginal relief between (F-31/D-8/D-10 small-profits-rate cluster, another instance). (3) "40% FYA from 1 Jan 2026 = residual route for company assets failing 100%/50%" — misleading; FA 2026 s.29 / new CAA 2001 s.45U is the UNINCORPORATED route, banned framing per §38. (4) Dead citation `aka.hmrc.gov.uk/.../fya/water.htm` (abolished water-tech ECA). (5) Empty rendered `<h2>Frequently Asked Questions</h2>` block. Collapse to deep node guard-BLOCKED (target unproven); REWRITE chosen. Cluster note: the small-profits-rate error here is the 5th+ instance — reinforces the F-31 cluster-audit recommendation.**

---

## Authority links worth considering (Stage 2 — verified live 2026-05-30 via WebFetch)

| URL | Verification status (2026-05-30) | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | **200 OK + content verified.** Operative text confirmed: expenditure on/after 1 Apr 2023, by a company within charge to CT, unused and not second-hand, not excluded by s.45T or s.46. **No sunset clause.** Inserted by F(No.2)A 2023 s.7(3) (commencement 22 Feb 2024 per FA 2024 s.1 amendment). | Full-expensing statute (companies-only; permanence) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/46 | **200 OK + content verified.** General Exclusion 2 = cars (s.268A); General Exclusion 6 = plant for leasing. | FYA general exclusions (cars + leasing) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | **200 OK + content verified.** s.56(1) WDA now reads **"14%"**, annotated "substituted ... by Finance Act 2026 (c. 11), s. 28(1)" with effect per s.28(2)-(6); timeline date 18/03/2026. | Main-pool WDA 14% (FA 2026 s.28) |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | **200 OK + content verified.** "First-year allowance for main rate expenditure on plant or machinery"; **inserts new CAA 2001 s.45U** (40% FYA, cases not within s.45S etc.) + s.45V (disqualifying arrangements); from 1 Jan 2026; new-and-unused; excludes special-rate expenditure + second-hand; s.46(4B) leasing nuance. | New 40% FYA = unincorporated/leasing route (FA 2026 s.29 / CAA 2001 s.45U) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | **200 OK + content verified.** s.51A(5) maximum = **£1,000,000**; annotated substituted 11.7.2023 by F(No.2)A 2023 s.8(2)(a) (permanent). | AIA £1m permanent (replaces the dead ref [3] water-tech link) |
| https://www.gov.uk/capital-allowances/full-expensing | **200 OK + content verified.** Title "Claim capital allowances: Full expensing and 50% first-year allowance - GOV.UK". Confirms "Only companies can claim full expensing and the 50% first-year allowance"; new-and-unused; not a car. | gov.uk plain-English cross-reference + replaces dead ref [3] |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45T | **200 OK + content verified.** "Exclusion of expenditure incurred under disqualifying arrangements"; F(No.2)A 2023. | Optional — only if the s.45S anti-avoidance point is touched (keep brief; deep node owns this) |

**(Execution session selects 4-6 to actually cite in body. The dead `aka.hmrc.gov.uk` ref [3] MUST be removed; replace with the gov.uk full-expensing landing page and/or the s.51A AIA link.)**

---

## metaTitle / metaDescription / h1 plan

The current meta and the deep node's meta must be visibly distinct (the deep node's title is "Full Expensing for Property SPVs: CAA 2001 s.45S Mechanics"). This page leads with the **investor decision/routing** angle, not the SPV-mechanics angle.

- **metaTitle (target ≤ 60 chars):** candidates for execution to test — "Full Expensing for Property Investors: Can You Claim?" (53) or "Full Expensing or 40% FYA? Property Investor Routes 2026" (57). Lead with the decision/eligibility hook, NOT "s.45S mechanics" (that is the deep node's lane).
- **metaDescription (target ≤ 158 chars):** decision-layer + the unincorporated-route differentiator + free-call hook. Candidate: "Can property investors claim full expensing? Companies can (100% FYA, s.45S); sole traders and landlords use the new 40% FYA from January 2026. Routing guide." (verify char count at write; trim to ≤ 158).
- **h1:** "Full Expensing Capital Allowances for Property Investors: Who Can Claim, and the 40% FYA Route if You Cannot" (decision/routing framing; deliberately different from the deep node's s.45S-mechanics h1).

Note: a prior generic meta did not lift this page (it is INVISIBLE, not a CTR-fail), so the meta rewrite is about **distinctiveness from the deep node** (avoiding self-cannibalisation on the s.45S head-terms), not about chasing CTR.

---

## Section-by-section content plan (~2,400 to 2,800 words)

1. **Intro (~120 words)** — frame the real reader question: "as a property investor, can *I* claim full expensing?" Short answer up front: only companies can claim full expensing (s.45S); if you are unincorporated, or your plant is in a residential dwelling, full expensing is barred, but there are other routes. Up-link to the pillar. NO em-dashes.
2. **Routing table / decision layer at the top (~200 words + table)** — the page's distinct value. A table keyed on entity (company / unincorporated) × property type (commercial / residential dwelling / HMO common parts) × asset use (own use / leasing out), mapping to the applicable relief: full expensing s.45S (company commercial, own-use, new/unused); 50% companion FYA (company special-rate); AIA £1m (most P&M, both entity types, subject to s.35); new 40% FYA s.45U (unincorporated + leasing, from 1 Jan 2026); WDA pools (14% main / 6% special). Mark residential-dwelling plant as **barred (s.35)** with the common-parts exception.
3. **What full expensing is, in one screen (~200 words)** — s.45S: 100% first-year, companies within the charge to CT, plant new and unused, not a car, not excluded by s.45T/s.46. **Permanent** (no sunset; confirmed Autumn Statement 2023 + Autumn Budget 2024). Plus the 50% special-rate companion in one sentence. **Then link OUT to the deep node** for the full mechanics. (De-dup boundary: do NOT expand s.45T/s.61 here.)
4. **Who can actually claim it — the entity fork (~250 words)** — companies only. Sole traders, partnerships, LLPs: cannot. This is where most property investors fall out. Bridge to the incorporation-choice context (link `buy-to-let-limited-company-complete-guide-uk`). Anonymised scenario allowed (e.g. "a landlord holding two flats personally").
5. **The residential dwelling-house bar — s.35 (~250 words)** — the load-bearing distinctiveness section. Plant for use *in a dwelling-house* within a property business is barred from P&M allowances (s.35), so even a company landlord usually cannot claim full expensing on a let flat's boiler/kitchen. Narrow exception: plant in **communal common parts** of a multi-let (block boiler, lift, communal lighting). Link `hmo-common-parts-s35`. FHL no longer a separate qualifying activity (s.15(1)(c)/(da) omitted by FA 2025 Sch 5 Part 3 from Apr 2025).
6. **If you cannot use full expensing: the 40% FYA route (~250 words)** — the corrected, first-class section. New 40% FYA (FA 2026 s.29 / new CAA 2001 s.45U), from 1 Jan 2026, for **main-rate, new and unused** plant, deliberately for **unincorporated businesses and leasing** (the route full expensing does not reach). Excludes cars, second-hand, leasing overseas. NOT a company residual fallback. Pair with AIA (£1m permanent) and WDA pools.
7. **Full expensing vs AIA vs 40% FYA vs WDA — how they fit (~250 words)** — interaction framing, FA-2026-current. AIA £1m available to both entity types (subject to s.35); above the cap / non-FYA assets go to the pools (main 14% / special 6% from FA 2026). When each route is the right one. (De-dup: routing logic, not a clawback computation.)
8. **Corporation-tax interaction — corrected (~180 words)** — each £1 of full-expensing relief saves CT at the company's rate: 25% main rate (profits over £250,000), 19% small profits rate (under £50,000), with marginal relief between £50,000 and £250,000. (Corrects the wrong "£250,000 = small profits" fact.)
9. **Commercial property branch (~180 words)** — where full expensing genuinely helps property investors: a company holding commercial premises for its own qualifying activity. Fixtures on purchase (s.198 election) — link `commercial-property-fixtures-s198` and the deep node; do not re-explain the election here.
10. **Worked routing example (~200 words)** — ONE example: a small portfolio investor deciding between staying personal and incorporating, and what each route yields on, say, a communal-boiler replacement in a block of flats. End: "the right route depends on entity and property type." NOT a disposal-clawback computation (that is the deep node's example). Anonymised only; no pricing.
11. **Common mistakes (~150 words)** — claiming full expensing as a sole trader; claiming on plant inside a let dwelling (s.35); treating the 40% FYA as a company route; assuming the relief is temporary. Each maps to a corrected fact.
12. **Inline `<aside>` CTA ×1-2** — placed after the routing table and after the worked example. `<aside><p>headline</p><p>body</p></aside>`, no classes.
13. **Visible FAQ section (10-14 FAQs in frontmatter; ensure they render).** Remove the bare empty `<h2>Frequently Asked Questions</h2>` and rely on the template's auto-render from frontmatter, OR render them visibly under the heading — match whatever the live template does (verify in `BlogPostRenderer.tsx` at execution). FAQ topics: can sole traders claim full expensing (no); is full expensing permanent (yes); what is the 40% FYA and who is it for (unincorporated/leasing, s.45U); can I claim on a boiler in a let flat (no, s.35; common-parts exception); full expensing vs AIA; what CT rate applies to the saving; what happens on disposal (one-line, then link deep node); does FHL still get special treatment (no, FA 2025 Sch 5); cars (excluded from full expensing, AIA and 40% FYA — only 0 g/km cars get the s.45D FYA).
14. **Sources (corrected).** Remove dead ref [3]. Cite 4-6 verified links from the authority table above.

---

## Universal rules — inherited from parent program (do not restate)

Inherits `NETNEW_PROGRAM.md §4` voice block + `docs/competitor_rewrite_playbook.md §5` universal site rules (no em-dashes anywhere; lead-gen architecture with LeadForm auto-injected and 1-3 inline `<aside>` CTAs only; no Tailwind classes in markdown, semantic HTML only; FAQs in frontmatter, FAQPage auto-emitted, never manual FAQ schema in body; anti-templating; six-check verification; statute-citation discipline per F-8 — content can be removed by amendment even when the URL is live, so verify operative wording, not just 200 status). **Critical for this brief:** NO pricing; NO real client names; anonymised proof only; NO em-dashes; every statute verified against legislation.gov.uk at write time including any cited Finance Act's Royal Assent (the F-37 Bill-vs-enacted pattern — FA 2026 c.11 RA confirmed 18 March 2026).

---

## 19-step workflow — inherited from parent program with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow from `NETNEW_PROGRAM.md §7` with Track 2 deltas (Step 9 rewrite at existing path; Step 12 confirm no redirect — already decided REWRITE, guard-blocked the collapse; Step 13 update/insert `monitored_pages` row, 180-day window for this INVISIBLE-baseline page per F-11). Load-bearing pre-rewrite steps for this page:

1. Read `house_positions.md` §25 (esp. §25.1, §25.2, §25.5, §25.7, §25.10) + §38 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (🟡 stage2_drafting → 🟢 on completion / ✅ at execution).
3. Re-verify FA 2026 enacted status (RA 18 Mar 2026) and the s.45U inserted-section number at legislation.gov.uk at write time (do NOT trust this brief's verification alone — re-confirm per §16.T1 deterministic floor + F-37).
4. Re-fetch the 4 competitor URLs (confirm 200; replace any dead).
5. Read the deep node + pillar in full to hold the **de-duplication boundary** (the writer must not duplicate the deep node's s.45S mechanics).
6. Rewrite markdown at the existing path; preserve frontmatter slug + canonical + category; update `dateModified` + `sourcesVerifiedAt` to write date; remove dead ref [3]; fix the empty FAQ block.
7. Build: `cd Property/web && npm run build` (must pass).
8. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 60 chars; meta description ≤ 158 chars; all internal links resolve; **plus**: 0 occurrences of "until at least 31 March 2026" / "temporary" / "£250,000" small-profits framing / `aka.hmrc.gov.uk`.
9. Run the mandatory per-batch QA chain (§16.T5): writer → `qa_verdict.py pending` → `track2_independent_qa.wf.js` → `qa_verdict.py record` → `predeploy_gate.py` → build → deploy → `monitored_pages` + IndexNow.
10. Commit on main; update tracker ✅; append flags; update §3 heartbeat.

---

## Per-page work-log (for execution session)

### House-position alignment
- §25.5 s.45S full expensing (company-only, permanent, no sunset): __
- §25.2 / §25.10 s.35 dwelling-house bar + common-parts exception: __
- §38 WDA 14% main / 6% special (FA 2026 s.28): __
- §38 new 40% FYA = unincorporated/leasing route (FA 2026 s.29 / CAA 2001 s.45U — RE-VERIFY inserted section at write): __
- §38 AIA £1m permanent (s.51A(5)): __
- CT bands corrected (19% <£50k / 25% >£250k / marginal between): __

### Comparison: before vs after
- Word count: 1,408 → __
- H2 count: 13 → __
- FAQ count: 4 (empty render) → __ (10-14, rendering verified)
- Authority links: 5 (1 dead) → __ (4-6 verified, 0 dead)
- Inline CTAs: 0 → __ (1-2)
- Worked examples: 0 → __ (1 routing example)
- Routing/decision table at top: 0 → __ (1)
- Internal link to deep node + pillar: 0 → __ (both)
- Dead `aka.hmrc.gov.uk` ref removed: __ (Y/N)
- Empty FAQ block fixed: __ (Y/N)

### Distinctiveness check (de-dup vs deep node)
- Page leads with investor routing decision (not s.45S mechanics): __
- s.45S mechanics linked OUT, not re-explained: __
- 40% FYA (unincorporated route) given first-class treatment: __
- No re-opened cannibalisation pair (manager spot-check at QA): __

### Flags raised
- F-[next] (carried from brief): five stale-fact corrections confirmed applied: __
- Small-profits-rate cluster (F-31/D-8/D-10) — another instance logged: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
