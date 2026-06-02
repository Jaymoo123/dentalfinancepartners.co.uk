# Track 2 brief: aia-capital-allowance-property-landlords

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (AIA cluster, disposal/exit + claim-process differentiation lane)
**Source markdown path:** `Property/web/content/blog/aia-capital-allowance-property-landlords.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/aia-capital-allowance-property-landlords
**Stage 1 priority:** M — near-zero own equity (2 GSC impr / 0 Bing) but sits in a SEVERE-overlap 7-page AIA cluster; rewritten with a sharp, currently-unowned differentiation lane (AIA disposal/exit + claim-process) it stops cannibalising the two §38 canonicals and earns a distinct intent slot.
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (source file read line-by-line; house positions §38 + §25.6 + §25.11 confirmed; corpus link targets resolved to real canonical paths; canonical-anchor positioning confirmed from the §38 batch-4 briefs)
**Cannibalisation status:** REWRITE (rewrite-only mode in force — standing non-negotiable rule overrides the pure-equity redirect-collapse call) + FLAG-MANAGER (cluster over-fragmentation; the three dead duplicates are the genuine collapse candidates for the separate collapse workstream, NOT touched here)

> **This is a gold-reference-depth brief.** Every load-bearing claim below was verified against the source markdown and `house_positions.md §38` / `§25.6` / `§25.11` at drafting time. **FA 2026 (c.11) received Royal Assent 18 March 2026 and is ENACTED (§38).** The capital-allowance rates on this page (14% main-pool WDA, 40% FYA) are therefore stated as CURRENT LAW, not Bill-form — no Bill-vs-enacted hedge applies to them. The execution session must still re-verify every statute citation against legislation.gov.uk at write time, including the FA 2026 Royal Assent date (the F-37 verify-at-write discipline).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** KEPT as `aia-capital-allowance-property-landlords`. On pure equity this page is a redirect-collapse candidate INTO `annual-investment-allowance-landlords-uk`, but REWRITE-ONLY MODE is in force (memory-locked standing rule). The slug is retained and the page is rewritten onto a sharp differentiation lane the two §38 canonicals deliberately do NOT own.
- **Category:** `Section 24 & Tax Relief` (KEPT). Canonical path `/blog/section-24-and-tax-relief/aia-capital-allowance-property-landlords` stays for URL stability. The topic is properly capital-allowances; the page funnels UP to the two §38 canonical anchors which sit in the same category, and cross-links to the capital-allowances depth pages.
- **Gap-mode tag:** `CANNIBAL` (PRIMARY — cluster-level positioning is the reason this rewrite exists) + `STALE_FACTS` (secondary, load-bearing — 18% WDA, missing 40% FYA, stale £1m framing) + `INVISIBLE` (tertiary — 2 GSC impr / 0 Bing) + `THIN_DEPTH` (1,650 words vs ~3,000 target) + `STRUCTURE` (no tables, hallucinated/dead citations, placeholder).
- **"Why this rewrite" angle:** The intent this page nominally targets is ALREADY OWNED at gold-reference depth by two §38 batch-4 rewrites: (1) `annual-investment-allowance-uk` owns the "what is AIA + £1m permanent cap + group/single-allowance" pillar intent (the cluster's strongest Google + strong Bing node); (2) `annual-investment-allowance-landlords-uk` owns the "who can actually claim + s.35 dwelling-house bar + 3 exceptions + RDIR-instead" applied intent. Both are stronger than this page on every metric and were locked as the canonical anchor pages. Rather than duplicate them a third time, this rewrite claims the **AIA DISPOSAL / EXIT mechanics + the practical CLAIM-PROCESS how-to** lane that neither canonical covers in depth. This page's own surviving GSC FAQ-intent ("what happens if I sell an asset I claimed AIA on") maps precisely to this lane. **Differentiation contract:** this is the "you have claimed AIA, now what happens on disposal, and how do you actually make and defend the claim" page; the pillar (`annual-investment-allowance-uk`) is the "what is it + how big is the cap"; the landlords page (`annual-investment-allowance-landlords-uk`) is the "can YOU claim it at all (s.35)". Forward-link to both as the upstream definitional pages.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

- **Current word count:** ~1,650 body words (16 H2 sections + 4 frontmatter FAQs + sources list).
- **Current H2 outline:**
  1. What Is the Annual Investment Allowance (AIA)? *(line 41 — sets the £1m / 100% framing; STALE "in place since 1 January 2019")*
  2. Can Property Landlords Claim the AIA? *(line 49 — H3 Personal Landlords + H3 Limited Companies; s.35 mentioned but thin)*
  3. What Qualifies for the AIA? *(line 69 — HP-vs-lease point cited to a hallucinated nature.com article)*
  4. What Does NOT Qualify for the AIA? *(line 83 — cars handling muddled: "some business cars may qualify for WDAs")*
  5. How the AIA Works for Partnerships *(line 95 — STALE "£1m for expenditure incurred between 1 January 2019 and 31 December 2020")*
  6. AIA and Limited Companies: Group Rules *(line 101 — single-allowance rule, broadly OK)*
  7. Writing Down Allowances: What Happens After the AIA *(line 107 — STALE: "main rate for WDAs is 18% per year")*
  8. AIA and Disposals: What Happens When You Sell *(line 113 — the surviving differentiation seed; thin, ~2 paras)*
  9. Practical Example: AIA for a Property Company *(line 119 — uses 18% WDA in the worked example)*
  10. AIA and Making Tax Digital (MTD) *(line 125 — contains placeholder "[source: MTD rules]")*
  11. Common Mistakes with AIA Claims *(line 131)*
  12. Should You Claim the AIA? *(line 145)*
  13. How a Property Accountant Can Help *(line 153 — generic close)*
- **Current meta title:** "AIA Capital Allowance: What UK Property Landlords Need" (53 chars; generic, no differentiator, truncated phrasing).
- **Current meta description:** "Learn how the AIA capital allowance works for UK property landlords. Claim up to £1m on qualifying plant and machinery. Read our guide." (133 chars; pure-duplicate of the canonicals' intent — reinforces the cannibalisation).
- **Current FAQ count (frontmatter `faqs:` array):** 4. FAQ #1 carries the stale "in place since 1 January 2019" framing; FAQ #3 ("What happens if I sell an asset I claimed AIA on") is the surviving differentiation seed; FAQ #4 partnership answer is broadly OK. Target 12-14.
- **Current outbound authority links:** 4 sources, two DEFECTIVE: ref-1 gov.uk AIA overview (live, fine); ref-2 = DEAD / non-HTTPS `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm`; ref-3 = HALLUCINATED, IRRELEVANT `https://www.nature.com/articles/sj.bdj.2017.234` (a British Dental Journal article used to "support" the HP-vs-lease AIA point); ref-4 ICAEW partnership clarification (live, fine). Zero legislation.gov.uk citations.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; Article auto-emitted). No reviewer byline; no HowTo. Add reviewer byline + HowTo (this becomes a step-by-step claim/disposal page).
- **Placeholder defect:** body line 127 contains a literal `[source: MTD rules]` placeholder — must be removed.
- **Last meaningful edit date:** `dateModified: '2026-05-20'`.

**Concrete defects to fix (carried from diagnosis, verified against source lines):**
- **STALE WDA (line 111 + worked example line 123):** "The main rate for WDAs is 18% per year." Per LOCKED §38, the main-pool WDA is **14% from 1 April 2026 (CT) / 6 April 2026 (IT)**, FA 2026 (c.11) s.28 substituting CAA 2001 s.56(1). Special rate stays 6%. ENACTED — state as current law, no hedge.
- **MISSING 40% FYA:** no mention of the **40% first-year allowance** (FA 2026 s.29 inserting CAA 2001 s.45U; expenditure on/after 1 January 2026; new and unused main-rate plant; NOT restricted by incorporation status; the practical route for unincorporated landlords and for leasing). Material omission vs current law. Add it; do NOT frame it as "unincorporated-only" or "companies cannot claim it" (wrong law per §38).
- **STALE £1m framing (line 45 + FAQ #1):** "in place since 1 January 2019" is imprecise/stale. Per §38, the £1m is **PERMANENT from 1 April 2023** (CAA 2001 s.51A(5), made permanent by F(No.2)A 2023 (c.30) s.8). The pre-2023 structure was temporary uplifts above a £200k baseline; drop the date-bounded framing.
- **STALE partnership framing (line 97):** "£1m for expenditure incurred between 1 January 2019 and 31 December 2020." Date-bounded and stale — the cap is now permanent £1m; remove the date window.
- **MUDDLED cars handling (line 89):** "cars... some business cars may qualify for WDAs." Tighten to: cars EXCLUDED from AIA (CAA 2001 s.38B, General Exclusion 2) AND from the 40% FYA; the only car FYA is the 100% FYA for new, unused 0 g/km zero-emission cars (s.45D). (Cars above 0 g/km go to pools: ≤50 g/km main pool 14%, >50 g/km special rate 6%.)
- **FULL-EXPENSING framing (lines 65, 149):** broadly OK but must be LOCKED as company-only (s.45S) and clearly DISTINGUISHED from the 40% FYA (s.45U).
- **HALLUCINATED + DEAD citations:** remove ref-2 (dead aka.hmrc.gov.uk) and ref-3 (nature.com British Dental Journal) entirely; replace with verified gov.uk / legislation.gov.uk citations.
- **PLACEHOLDER:** remove `[source: MTD rules]` (line 127).
- **PRICING_LEAK:** NONE found on this page (no fee figures present; no Decision-E soft fee ranges). Clean.

---

## GSC angle (last 90 days) — from diagnosis equity ranking

**This page (the rewrite target):** 2 GSC impressions / 0 Bing impressions, on "aia capital allowances" (1 impr, pos 78) and "can you claim capital allowances on investment property" (1 impr, pos 94). Effectively INVISIBLE.

**Cluster equity context (the two §38 canonicals own the strong nodes):**

| Slug | GSC impr / pos | Bing impr / pos | Disposition |
|---|---|---|---|
| annual-investment-allowance-uk | 56 / 70.9 (12 queries) | 18 / 5.0 | CANONICAL anchor — "what is AIA + £1m cap + group/single-allowance" pillar intent (strongest Google + strong Bing node in cluster) |
| annual-investment-allowance-landlords-uk | 32 / 63.9 (7 queries) | — | CANONICAL anchor — "who can claim + s.35 bar + 3 exceptions + RDIR-instead" applied intent |
| aia-allowance-uk-property-investors | 8 / 25.3 | — | dead duplicate — future collapse candidate (NOT touched here) |
| **aia-capital-allowance-property-landlords (THIS)** | **2 / ~78-94** | **0** | **REWRITE onto the disposal/exit + claim-process lane** |
| capital-allowance-aia-property-landlords | 1 / near-zero | — | dead duplicate — future collapse candidate (NOT touched here) |
| aia-capital-allowances | 0 / — | — | dead duplicate — future collapse candidate (NOT touched here) |

**Adjacent-query opportunity (the lane this rewrite claims):** the diagnosis surfaces a set of disposal + claim-process queries that NEITHER canonical owns and that map to this page's surviving FAQ-intent:
- "what happens if i sell an asset i claimed aia on" (this page's own surviving FAQ-intent)
- "aia balancing charge on disposal property"
- "how to claim annual investment allowance property"
- "aia partnership property landlords"
- "aia hire purchase plant and machinery"
- "aia second hand plant and machinery" (adjacent, 10 impr / pos 2.9 — strong adjacent signal)

**Read:** the cluster's head intent is owned. This page's only defensible future is a DISTINCT intent slot. The disposal/exit + claim-process lane is unclaimed corpus-wide, is exactly what this page's surviving FAQ targets, and converts the page from a third near-duplicate into a complementary node that forward-links UP to both canonicals.

**GA4 engagement signal:** not separately pulled at draft time (page is INVISIBLE; negligible sessions expected). Execution session pulls `ga4_page_data` at write time if a row exists; otherwise note "no traffic, INVISIBLE, signal is impression-only" and use the F-11 180-day monitoring window.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**PRIMARY: CANNIBAL (cluster positioning — the reason this rewrite exists).** This slug sits in a ~7-page AIA cluster, four of which are near-identical word-order duplicates. The head intent ("what is AIA" + "can a landlord claim it") is owned at gold-reference depth by the two §38 canonical anchors. Producing a third "what is AIA for landlords" page would deepen the cannibalisation. The load-bearing move is to REPOSITION this page onto the AIA disposal/exit + claim-process lane that neither canonical covers, so the cluster gains a complementary intent slot rather than another duplicate. The page must forward-link UP to both canonicals (this is the downstream "now what / how-to" node; they are the upstream "what is it / can I claim it" nodes).

**SECONDARY: STALE_FACTS (load-bearing, five distinct defects — all resolvable against ENACTED FA 2026 §38).** 18% WDA asserted as current (now 14%, FA 2026 s.28); 40% FYA omitted entirely (FA 2026 s.29 / CAA 2001 s.45U); £1m framed as "since January 2019" (permanent from 1 April 2023, F(No.2)A 2023 s.8); partnership cap date-bounded to 2019-2020 (now permanent); cars muddled ("some may qualify for WDAs"). FA 2026 is ENACTED (Royal Assent 18 March 2026) so these are stated as current law, NOT Bill-form — the §7 April-2027 income-tax Bill-form hedge does NOT apply to §38 capital-allowance rates.

**TERTIARY: INVISIBLE + THIN_DEPTH + STRUCTURE.** 2 GSC impr / 0 Bing; 1,650 words vs ~3,000 target; no reference tables; dead + hallucinated citations; an MTD placeholder. The disposal/exit + claim-process lane is genuinely deeper than the canonicals go, so the depth lift is content the corpus does not already hold (not catch-up).

**Load-bearing fix sequence (ordered by ROI):**
1. **Reposition onto the disposal/exit + claim-process lane.** Open by acknowledging the upstream questions (briefly, with forward-links to the two canonicals) then pivot fast to "you have claimed AIA, here is the exit + the how-to". This is the cannibalisation fix AND the depth differentiator in one move.
2. **Build the disposal spine (§25.6).** s.55 entitlement / balancing events; s.61 disposal values; s.196 fixtures Table; balancing charge vs balancing allowance on sale of a property carrying claimed fixtures. This is the central new content.
3. **Build the claim-process how-to (§38 + §25.6 + §25.11).** Timing of incurral; hire-purchase vs lease (s.67); short-accounting-period pro-rating; partnership allocation; record-keeping + HMRC-enquiry defence. Emit as `howToSteps` (HowTo schema).
4. **Fix the staleness.** 14% WDA (FA 2026 s.28); add the 40% FYA (FA 2026 s.29 / s.45U); permanent £1m (F(No.2)A 2023 s.8); de-date the partnership cap; tighten cars (s.38B + s.45D).
5. **Deepen the s.35 dwelling-house bar** (currently thin but correct) — retain and expand, threading the §38 carve-outs (common parts, integral features in non-dwelling areas, commercial/mixed-use).
6. **Citation rebuild.** Remove the dead aka.hmrc.gov.uk URL and the hallucinated nature.com British Dental Journal article; add legislation.gov.uk s.35 / s.38B / s.51A / s.55 / s.56 / s.61 / s.67 / s.196 / s.45U / s.45S + the gov.uk AIA page. Remove the `[source: MTD rules]` placeholder.
7. **Depth + structure lift** to ~3,000 words, 12-14 FAQs, 3 plain-HTML reference tables, `howToSteps`, 1-2 inline `<aside>` CTAs, reciprocal forward-links to both canonicals + balancing-charge + s.198-fixtures pages.
8. **Meta rewrite** to lead with the disposal/claim-process differentiator (NOT the "what is AIA" intent the canonicals own).

---

## Competitor URLs (Stage 2 — from diagnosis; RE-FETCH + status-check at execution per §16.31)

| URL | Expected structure signal | Borrow / differentiate |
|---|---|---|
| https://pkf-francisclark.co.uk/insights/capital-allowances-for-property-investors-what-you-can-and-cant-claim-in-2025/ | "what you can and can't claim" framing; dwelling-house bar + FHL April-2025 abolition + SBA | Borrow the can/can't mental model. Differentiate on the DISPOSAL side (s.61 disposal values + s.196 fixtures Table + balancing charge) which the can/can't framing skips. |
| https://www.rossmartin.co.uk/property-income/810-capital-expenditure-allowances | Leads with the dwelling-house bar; practitioner depth | Borrow the bar-first ordering for the s.35 section. Differentiate with the claim-process how-to (timing of incurral, HP vs lease s.67, partnership allocation, enquiry defence) they do not lay out step-by-step. |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Statutory anchor — states £1m, short-period proration, group rules; does NOT cover disposal/balancing-charge depth | This is the GAP. gov.uk gives the cap + timing but not the seller-side disposal mechanic. Link it for the £1m/timing baseline; our differentiator is the disposal + how-to layer. |
| https://taxeezy.co.uk/resources/tax-guides/capital-allowances-for-landlords-letting-out-uk-property/ | Landlord-letting angle; dwelling-house bar | Borrow the landlord framing; differentiate with the SPV/commercial worked example + the balancing-charge-on-property-sale scenario + verified statute spine. |

**Competitor depth ceiling for this query class:** ~1,200-2,500 words, 0-few statute citations, strong on the can/can't bar, weak-to-absent on disposal-value mechanics and the step-by-step claim/enquiry process. Our ~3,000-word target with the full verified §25.6 + §38 spine, the s.61/s.196 disposal-value reference table, the balancing-charge-vs-allowance decision table, a `howToSteps` claim process, and 12-14 FAQs puts us decisively best-in-class on the disposal/exit + claim-process lane.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index reference:** `docs/property/track2_cannib_index_2026-05-23.md` (cluster context per diagnosis + §38 lock; refresh §4 at execution).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | aia-capital-allowance-property-landlords | self | **REWRITE in place** onto the disposal/exit + claim-process lane (rewrite-only mode overrides the pure-equity redirect-collapse call) |
| Cluster CANONICAL (anchor 1) | annual-investment-allowance-uk | "what is AIA + £1m cap + group single-allowance" pillar intent | NO collision after repositioning — that page owns the definitional pillar; THIS page owns disposal/exit + how-to. **Forward-link UP (mandatory).** |
| Cluster CANONICAL (anchor 2) | annual-investment-allowance-landlords-uk | "who can claim + s.35 bar + 3 exceptions + RDIR-instead" applied intent | NO collision after repositioning — that page owns "can YOU claim at all"; THIS page assumes you have claimed and covers disposal + how-to. **Forward-link UP (mandatory); both should later reciprocally link back in.** |
| Cluster duplicates (future collapse, NOT touched here) | aia-allowance-uk-property-investors (8 impr / pos 25.3), capital-allowance-aia-property-landlords (1 impr), aia-capital-allowances (0 signal) | Near-duplicate word-order pages | These are the genuine future collapse-into-this-or-the-canonicals candidates for the SEPARATE collapse workstream. Do NOT redirect, edit, or touch them in this brief. Flag for the cluster-collapse batch. |
| Adjacent (link, no collision) | balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics | Disposal/balancing-charge depth | NO collision — that page owns the standalone balancing-charge mechanics; THIS page references the AIA-specific disposal value and forward-links for the full mechanics. Boundary: this page = "AIA you claimed, now disposed"; that page = general balancing-allowance/charge computation. |
| Adjacent (link, no collision) | commercial-property-fixtures-claim-s198-election-purchase-mechanics | Buyer-side s.198 fixtures election | NO collision — that page owns the buyer-side election; THIS page covers the SELLER-side s.196 Table + forward-links for the buyer-side election. |
| Adjacent (link, no collision) | making-tax-digital-landlords-april-2026-deadline | MTD digital-records context | NO collision — link from the record-keeping section (digital records support the claim/enquiry defence). |

**Conclusion:** REWRITE in place onto a distinct intent lane (rewrite-only mode). FLAG-MANAGER on cluster over-fragmentation (extends F-4): the three dead duplicates remain genuine collapse candidates for the dedicated AIA cluster-collapse batch; NOT actioned here. NO redirect of THIS page.

---

## Closest existing pages (Stage 2) — internal-link targets within the live corpus

All verified to exist with these exact canonical paths at draft time. Use the full `/blog/<category>/<slug>` path for each.

- **Canonical anchor 1 (funnel UP — reciprocal link MANDATORY):** `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` — link from the intro ("what AIA is and the £1m cap") AND from a closing "where this sits" line. That page is the definitional pillar.
- **Canonical anchor 2 (funnel UP — reciprocal link MANDATORY):** `/blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk` — link from the s.35 dwelling-house section ("can a landlord claim it at all"). That page owns the eligibility/s.35 intent.
- **Balancing charge on disposal (forward-link for full mechanics):** `/blog/property-types-and-specialist-tax/balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics` — link from the disposal/balancing-charge section.
- **Commercial fixtures s.198 election (buyer-side counterpart):** `/blog/property-types-and-specialist-tax/commercial-property-fixtures-claim-s198-election-purchase-mechanics` — link from the "selling a property with claimed fixtures" section (seller-side s.196 here; buyer-side s.198 there).
- **MTD digital records context:** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — link from the record-keeping / enquiry-defence section (replace the current bare `/blog/making-tax-digital-mtd/...` link only if it 404s at build).
- **BTL incorporation pillar (replaces bare `/incorporation` route):** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — link from the company-route paragraph (full expensing s.45S company-only context). The current source uses a bare `/incorporation` route at line 67 — verify it resolves at build; replace with this pillar if it 404s.
- **Property accountant services (TSX route, keep):** `/services` (current line 143) — verify resolve at build.

**Reciprocity note:** the page currently has effectively ZERO inbound internal links. The rewrite must ADD the outbound links above. Note for the cluster-collapse batch that the two canonicals should later add a reciprocal forward-link to this disposal/how-to node so the cluster's link equity consolidates in the correct direction.

---

## House-position references (Stage 1) — thread these; cite §N.M, never paraphrase

- **§38 Capital allowances (CAA 2001) — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified at legislation.gov.uk + GOV.UK measure page]: **PRIMARY LOCK.** FA 2026 (c.11) ENACTED 18 March 2026. Main-pool WDA **14%** (s.28 substituting CAA 2001 s.56(1)), effective 1 Apr 2026 (CT) / 6 Apr 2026 (IT), hybrid time-apportioned rate for straddling periods. Special rate **6% unchanged** (s.104D). **40% FYA** (s.29 inserting CAA 2001 s.45U), expenditure on/after 1 Jan 2026, new and unused main-rate plant, NOT restricted by incorporation status; excludes cars, second-hand/used, and assets for overseas leasing. AIA **£1m permanent** (s.51A(5), made permanent by F(No.2)A 2023 (c.30) s.8 from 1 Apr 2023). Full expensing **100% FYA company-only** (s.45S), distinct from the 40% FYA. SBA **3%** (s.270AA(5)). **s.35 dwelling-house bar**: no P&M allowances for plant for use in a dwelling-house; carve-outs are common parts + integral features (s.33A) in non-dwelling areas. **Cars**: excluded from AIA (s.38B General Exclusion 2) AND the 40% FYA; only car FYA is 100% FYA for new unused 0 g/km cars (s.45D).
- **§38 do-not-write list** [LOCKED 2026-05-30]: "WDA is 18%" = FALSE (14% from April 2026); "special rate falls to 4%" = FALSE (stays 6%); "landlords can claim AIA on furnishings/boilers inside a let dwelling" = FALSE (s.35); "full expensing is available to individual landlords" = FALSE (company-only; unincorporated use the 40% FYA, which is itself NOT unincorporated-only); "cars qualify for AIA or the 40% FYA" = FALSE.
- **§25.6 Disposal mechanics (CAA 2001 ss.55-67 + s.61)** [LOCKED 2026-05-23 — CENTRAL LANE LOCK]: s.55 entitlement / balancing events (AQE vs TDR; balancing charge where TDR exceeds AQE; balancing allowance where AQE exceeds TDR in the final chargeable period per s.65); s.61 disposal events + eight disposal-value rules; pool concept (main 14% / special 6% / single-asset); s.196 12-item fixtures disposal-value Table (seller-side); SBA disposal = no balancing event (s.37B TCGA add-back instead).
- **§25.11 Section 198 fixtures election — purchase-side depth** [LOCKED 2026-05-24]: the buyer-side counterpart to the seller-side s.196 Table; s.187A fixed-value gate; s.187B pooling gate; s.198 election (in writing, fixed amount, 2-year deadline s.201(1)); s.563 tribunal route. THIS page covers the SELLER side (s.196) and forward-links to the s.198 buyer-side page.
- **§25.7 FHL transitional (FA 2025 (c.8) Sch 5)** [LOCKED 2026-05-23]: FHL abolished 1 Apr 2025 (CT) / 6 Apr 2025 (IT); grandfathered FHL P&M pools transfer to the ordinary property-business pool, continued WDA only, NO new FHL expenditure qualifies. Cite FA 2025 Sch 5 (NOT FA 2024 Sch 5). Used to correct the source's loose "FHL abolished from April 2025" line.
- **§13 Do-not-write (lead-gen discipline)** [LOCKED]: NO pricing / fees / soft fee ranges; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — STALE_FACTS (this rewrite's secondary load-bearing job).** The published page contradicts LOCKED §38 on enacted FA 2026 capital-allowance rates:
- Line 111 + worked example line 123: "main rate for WDAs is 18% per year" — FALSE per §38 (14% from April 2026, FA 2026 s.28).
- No mention of the 40% FYA (FA 2026 s.29 / s.45U) — a material omission vs current law per §38.
- Line 45 + FAQ #1: "£1m limit in place since 1 January 2019" — stale framing; permanent from 1 April 2023 (F(No.2)A 2023 s.8) per §38.
- Line 97: partnership cap "between 1 January 2019 and 31 December 2020" — stale date-bounded framing; now permanent £1m.
- Line 89: cars "some business cars may qualify for WDAs" — muddled; cars excluded from AIA (s.38B) AND the 40% FYA; only car FYA is 0 g/km s.45D per §38.

**Plus citation-reality defects:** dead non-HTTPS aka.hmrc.gov.uk (ref-2); hallucinated nature.com British Dental Journal article (ref-3); `[source: MTD rules]` placeholder (line 127).

Flag to `track2_site_wide_flags.md` as:
**F-[next] | 2026-06-02 | HIGH | aia-capital-allowance-property-landlords | STALE_FACTS + CITATION-DEFECT | Published page asserts 18% main-pool WDA (now 14%, FA 2026 c.11 s.28, ENACTED 18 Mar 2026), omits the 40% FYA (FA 2026 s.29 / CAA 2001 s.45U), carries stale "£1m since January 2019" + date-bounded partnership-cap framing (permanent since 1 Apr 2023, F(No.2)A 2023 s.8), and muddles cars. Citation defects: dead aka.hmrc.gov.uk + hallucinated nature.com BDJ article + `[source: MTD rules]` placeholder. FA 2026 §38 rates stated as ENACTED law (no Bill-form hedge — the §7 April-2027 income-tax hedge does NOT apply to §38 capital-allowance rates). Rewrite repositions onto the disposal/exit + claim-process lane (CANNIBAL fix), fixes the rates, rebuilds citations. PRICING_LEAK: none (clean).**

**Cluster flag (extends F-4):** the AIA cluster is 7 pages, materially over-fragmented; three are dead near-duplicates. Recommend the dedicated AIA cluster-collapse batch where the two §38 canonicals + this repositioned disposal/how-to node survive and the three dead duplicates 301 in. NOT actioned here.

---

## Authority links worth considering (Stage 2 — VERIFY EVERY ONE at write time against legislation.gov.uk, including the FA 2026 Royal Assent date)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Per §38 / §25.2 verified 2026-05-30 — RE-VERIFY | Dwelling-house exclusion (the s.35 section) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/38B | Per §38 (General Exclusion 2, cars) — VERIFY | Cars excluded from AIA |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | Per §38 (s.51A(5) "£1,000,000") — RE-VERIFY | AIA £1m permanent maximum |
| https://www.legislation.gov.uk/ukpga/2001/2/section/55 | Per §25.6 verified 2026-05-23 — RE-VERIFY | Entitlement + balancing events (AQE/TDR) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | Per §38 (now reads 14%, annotated "substituted by FA 2026 s.28(1)") — RE-VERIFY | Main-pool WDA 14% |
| https://www.legislation.gov.uk/ukpga/2001/2/section/61 | Per §25.6 verified 2026-05-23 — RE-VERIFY | Disposal events + disposal values |
| https://www.legislation.gov.uk/ukpga/2001/2/section/67 | VERIFY (hire-purchase / deemed-ownership for AIA) | HP vs lease claim timing |
| https://www.legislation.gov.uk/ukpga/2001/2/section/196 | Per §25.6 verified 2026-05-23 — RE-VERIFY | Fixtures disposal-value Table (seller-side) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Per §38 (full expensing, company-only, from 1 Apr 2023) — RE-VERIFY | Company full-expensing route (distinguish from 40% FYA) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45D | Per §38 (0 g/km car FYA) — VERIFY | The only car FYA |
| FA 2026 (c.11) s.28 — main-pool WDA 14% | **ENACTED 18 Mar 2026 per §38** — RE-VERIFY Royal Assent + section at write | The 18%→14% substitution into s.56(1) |
| FA 2026 (c.11) s.29 / CAA 2001 s.45U — 40% FYA | **ENACTED 18 Mar 2026 per §38** — RE-VERIFY the inserted s.45U at write | The 40% FYA on new/unused main-rate plant |
| Finance (No. 2) Act 2023 (c.30) s.8 — £1m AIA permanent | Per §38 — RE-VERIFY exact section + Royal Assent (11 Jul 2023) | Permanent £1m cap |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | Per diagnosis live 200 | Link for £1m + short-period proration + group baseline |

**REMOVE entirely:** the dead `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` (ref-2) and the hallucinated `https://www.nature.com/articles/sj.bdj.2017.234` British Dental Journal article (ref-3). Execution session cites 6-8 of the above in body. The ICAEW partnership-clarification ref-4 may be kept as a supporting source for the partnership-allocation section.

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 item 13`. Critical for THIS brief: NO em-dashes (commas, parentheses, full stops, middle dots only). NO pricing / fees / soft fee ranges (Decision E) — this page is clean, keep it clean. NO real client names — anonymised proof only (e.g., "a portfolio landlord we advised who sold a commercial unit carrying claimed integral-features fixtures..."). LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate; use 1-2 inline `<aside>` CTAs at conversion moments. No Tailwind utility classes in markdown body — semantic HTML only; tables are plain HTML `<table>`. FAQ schema is frontmatter-driven (`faqs:` array, target 12-14) — never hand-add FAQ schema in body. HowTo schema is frontmatter-driven (`howToSteps:`) — never hand-add. EVERY statute citation verified against legislation.gov.uk at write time, including the FA 2026 Royal Assent date (F-37 verify-at-write discipline; FA 2026 is ENACTED per §38, so assert with the section + Royal Assent date, do NOT Bill-hedge the §38 rates).

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 item 14`. Page-specific deltas:

- **Step 1 (read house positions):** read §38 in full, plus §25.6, §25.11, §25.7, and §13, at session start.
- **Step 4 (load-bearing pre-rewrite verification):** VERIFY at legislation.gov.uk: (a) CAA 2001 s.56 now reads 14% (annotated substituted by FA 2026 s.28); (b) the inserted CAA 2001 s.45U (40% FYA, FA 2026 s.29); (c) FA 2026 (c.11) Royal Assent date 18 March 2026; (d) CAA 2001 s.55 / s.61 / s.196 disposal-value wording; (e) s.67 HP / deemed-ownership; (f) s.38B General Exclusion 2 (cars). Record that FA 2026 §38 rates are ENACTED (assert, do NOT hedge).
- **Step 6 (read source):** the current file at `Property/web/content/blog/aia-capital-allowance-property-landlords.md` (read in full — staleness at lines 45/89/97/111/123; placeholder at 127; dead/hallucinated citations at ref-2/ref-3).
- **Step 7 (read siblings):** read the two §38 canonicals (`annual-investment-allowance-uk`, `annual-investment-allowance-landlords-uk`) for boundary alignment + reciprocal-link wording; read the balancing-charge page + the s.198 fixtures page for forward-link wording and to avoid duplicating their depth.
- **Step 8 (outline):** 11-13 H2s, ~3,000 body words, 12-14 FAQs, THREE plain-HTML reference tables (disposal-value rules; balancing-charge-vs-allowance decision; AIA/40%FYA/full-expensing/WDA options comparison), `howToSteps` (claim process), 1-2 inline `<aside>`, 6-8 authority links. Disposal/exit + claim-process lane is the spine; the "what is AIA / can I claim" material is brief with forward-links to the canonicals.
- **Step 9 (rewrite at existing path):** preserve frontmatter slug + canonical + category (URL stability). Update `dateModified` to 2026-05-30 + `sourcesVerifiedAt`. Rewrite metaTitle / metaDescription / h1 / summary (see Meta plan). Rewrite frontmatter FAQ #1 (de-stale the £1m framing). Add `reviewedBy` + `reviewerCredentials` + `howToSteps`. Rebuild citation IDs to be unique; remove ref-2 + ref-3; remove the `[source: MTD rules]` placeholder.
- **Step 10 (build):** `cd Property/web && npm run build` must pass.
- **Step 11 (six checks + extras):** FAQ schema count = frontmatter `faqs:` length; `howToSteps` present + HowTo emits; em-dash count = 0; Tailwind class count = 0; metaTitle <= 62 chars; metaDescription <= 158 chars; ALL internal links resolve; PLUS no "18%" main-pool-WDA assertion survives; PLUS no unique-`id` collisions; PLUS pricing check (`£[0-9]` returns 0 fee-discussion matches; threshold/example figures like £1,000,000 / £800,000 are fine); PLUS the dead aka.hmrc.gov.uk + nature.com citations are gone; PLUS the `[source: MTD rules]` placeholder is gone.
- **Step 12:** confirm no redirect of THIS page (slug kept; rewrite-only mode). Record the cluster-collapse recommendation for the manager (the three dead duplicates 301 INTO the canonicals later; NOT actioned here).
- **Step 13:** insert/update `monitored_pages` row (rewrite_date = today; F-11 INVISIBLE-baseline 180-day window; record the disposal/claim-process query baseline so the lift is measurable).
- **Steps 14-19:** commit on main; update `track2_page_tracker.md` to executed; log the STALE_FACTS + citation-defect catch in `track2_site_wide_flags.md`; heartbeat `TRACK2_PROGRAM.md §3`; log the cluster-collapse recommendation for the manager.

---

## Section-by-section content plan (~3,000 words)

1. **H2 "AIA for property landlords: what changes when you claim it, sell it, or get enquired into"** (~250w). Reposition the page immediately. Brief one-paragraph recap of what AIA is (100% write-off up to £1m, §38) WITH forward-links to `annual-investment-allowance-uk` ("what AIA is + the cap") and `annual-investment-allowance-landlords-uk` ("can a landlord claim it at all, s.35"). Then pivot: "this page assumes you have (or are about to) claim AIA, and covers the exit (disposal) and the practical claim/defence process those pillar pages do not." Sets the differentiation contract for the reader.
2. **H2 "Quick recap: who can claim, and the s.35 dwelling-house bar"** (~300w). Deepen the (correct but thin) s.35 material. State plainly: plant inside a residential dwelling-house is BARRED (CAA 2001 s.35); carve-outs are common parts of a multi-let block (communal boilers/lifts/lighting) and integral features (s.33A) in non-dwelling areas (commercial / mixed-use commercial portion). Forward-link the landlords canonical for the full eligibility treatment. *(corrects + deepens lines 49-67)*
3. **H2 "What happens when you sell an asset you claimed AIA on: the disposal mechanic"** (~350w). THE CORE NEW CONTENT. s.55: entitlement is determined per pool by comparing available qualifying expenditure (AQE) against total disposal receipts (TDR). When you dispose of an asset, its disposal value is brought into the pool (reduces it). If TDR exceeds AQE, a balancing charge arises (a taxable receipt added to profits). s.61 sets the disposal value by the type of event. Forward-link the balancing-charge page for the full computation. *(replaces + deepens lines 113-117)*
   - **REFERENCE TABLE 1 — Disposal values under CAA 2001 s.61** (see table spec below).
4. **H2 "Balancing charge or balancing allowance? How to tell which you face"** (~300w). The decision: TDR exceeds AQE = balancing CHARGE (extra tax); AQE exceeds TDR = balancing ALLOWANCE (only in the final chargeable period when the activity ceases, s.65; otherwise the excess simply continues as WDA at 14% main / 6% special). Anonymised example: a landlord sells a commercial unit; fixtures previously claimed must bring in a disposal value, creating a balancing charge.
   - **REFERENCE TABLE 2 — Balancing charge vs balancing allowance decision** (see table spec below).
5. **H2 "Selling a property that carries claimed fixtures: the s.196 Table and the s.198 election"** (~300w). When you sell a property whose fixtures you claimed allowances on, the sale price must be apportioned to the fixtures. The seller-side disposal value follows the s.196 fixtures Table; the buyer-side claim is gated by the s.198 election (2-year deadline, pooling gate). Make clear this bites on COMMERCIAL property (the s.35 bar means dwelling fixtures were never claimable). Forward-link the s.198 commercial-fixtures page for the buyer-side depth. *(net-new; §25.6 + §25.11)*
6. **H2 "How to make the AIA claim: a step-by-step process"** (~350w + `howToSteps`). The claim-process how-to (HowTo schema spine). Step 1: confirm the expenditure is qualifying P&M for a qualifying activity (not barred by s.35). Step 2: confirm the timing of incurral (generally the date the obligation becomes unconditional, with the 4-month payment-due rule). Step 3: pro-rate the £1m cap for short accounting periods (e.g. a 9-month period = 9/12 x £1,000,000 = £750,000). Step 4: allocate within a partnership / across related companies (single shared allowance). Step 5: enter the claim on the return (SA / CT600 capital-allowances pages) and keep the digital records. *(replaces + structures lines 69-81 + 95-105)*
7. **H2 "Hire purchase vs leasing: when the timing of the claim differs"** (~250w). AIA is available on plant bought outright, on a loan, or under hire purchase (s.67 deems the HP buyer the owner once the plant is brought into use), but NOT on plant you merely lease (you do not own it). Correct the source's HP-vs-lease point and RE-CITE to s.67 + gov.uk (removing the hallucinated nature.com article). *(corrects line 81 + the ref-3 hallucination)*
8. **H2 "When AIA runs out: the 40% FYA, full expensing, and writing-down allowances"** (~350w). Above the £1m cap, or for spend that does not suit AIA, the options diverge by structure. The 40% FYA (FA 2026 s.29 / CAA 2001 s.45U) is available on new and unused main-rate plant from 1 January 2026, NOT restricted by incorporation status (the practical route for unincorporated landlords and for leasing). Full expensing (s.45S, 100%) is COMPANY-ONLY. Otherwise spend goes into the pools: main pool 14% WDA (FA 2026 s.28), special-rate pool 6%. *(corrects lines 107-111 + 149; adds the omitted 40% FYA; LOCKS full expensing as company-only and distinct from the 40% FYA)*
   - **REFERENCE TABLE 3 — AIA vs 40% FYA vs full expensing vs WDA: which relief applies** (see table spec below).
9. **H2 "Partnerships and groups: how the single £1m is shared"** (~250w). For partnerships the £1m AIA is a single partnership allowance (NOT one per partner) allocated across the partners' shares; for companies under common control + related, a single £1m is shared across the group. De-stale the source's "2019-2020" partnership window (permanent £1m). *(corrects lines 95-105; keep the ICAEW partnership source)*
10. **H2 "Cars: excluded from AIA and the 40% FYA"** (~200w). Tighten the muddled cars handling: cars are excluded from AIA (s.38B General Exclusion 2) AND the 40% FYA; the only car FYA is the 100% FYA for new, unused 0 g/km zero-emission cars (s.45D). Cars above 0 g/km go to the pools (<=50 g/km main pool 14%, >50 g/km special rate 6%). *(corrects line 89)*
11. **H2 "Record-keeping and defending an AIA claim on HMRC enquiry"** (~300w). The enquiry-defence angle competitors skip: keep purchase invoices, evidence of bringing-into-use, the qualifying-activity link, the s.35 carve-out evidence (e.g. that fixtures are communal common parts or commercial), and the s.196/s.198 apportionment documents on any property sale. Digital records under MTD support this. Link the MTD page. Anonymised example of an enquiry where the documentation carried the claim. *(replaces the MTD placeholder section + the generic close)*
- Inline `<aside>` CTAs at ~2 conversion moments (after the disposal/balancing-charge section, and after the claim-process how-to).
- **Delete** any bare `<h2>Frequently Asked Questions</h2>` if present (FAQ schema is frontmatter-driven).
- **Sources:** rebuild as 6-8 numbered legislation.gov.uk + gov.uk citations with UNIQUE IDs; remove the dead aka.hmrc.gov.uk URL and the hallucinated nature.com article; keep the ICAEW partnership source if still live.

### Reference table specifications (plain HTML `<table>`, no pricing)

**TABLE 1 — Disposal values under CAA 2001 s.61 (seller-side, when you dispose of claimed plant)**
- Columns: **Disposal event** | **Disposal value brought into the pool**
- Rows: Sold at market value -> net sale proceeds (plus insurance/compensation); Sold below market value (connected party) -> market value; Demolition / destruction -> net proceeds from remains plus compensation; Permanent loss -> insurance and compensation; Plant begins non-qualifying / private use -> market value at that time; Property sold with fixtures -> amount apportioned to fixtures (s.196 Table); Other events -> market value at the time of the event.

**TABLE 2 — Balancing charge vs balancing allowance: which you face**
- Columns: **Situation** | **Comparison** | **Result**
- Rows: Disposal value exceeds the pool balance -> TDR > AQE -> Balancing CHARGE (taxable receipt added to profits); Pool balance exceeds disposal value, activity continuing -> AQE > TDR (not final period) -> No balancing event; excess continues as WDA (14% main / 6% special); Pool balance exceeds disposal value, activity ceasing -> AQE > TDR in final chargeable period (s.65) -> Balancing ALLOWANCE (extra deduction).

**TABLE 3 — AIA vs 40% FYA vs full expensing vs WDA: which relief applies**
- Columns: **Relief** | **Rate** | **Who can claim** | **Asset condition** | **Statute**
- Rows: AIA -> 100% up to £1m -> any qualifying business (sole trader / partnership / company) -> new or used qualifying P&M -> CAA 2001 s.51A; 40% FYA -> 40% -> any business (not incorporation-restricted) -> new and unused main-rate plant, on/after 1 Jan 2026; excludes cars -> FA 2026 s.29 / CAA 2001 s.45U; Full expensing -> 100% -> companies only -> new and unused main-rate plant -> CAA 2001 s.45S; Main-pool WDA -> 14% reducing balance -> any business -> spend above the cap / not on FYA -> CAA 2001 s.56 (FA 2026 s.28); Special-rate WDA -> 6% reducing balance -> any business -> integral features / long-life assets -> CAA 2001 s.104D.

---

## Statute spine (every section number with its Act — VERIFY each at write time)

- **CAA 2001 s.33A** — integral features (special-rate 6% pool)
- **CAA 2001 s.35** — dwelling-house exclusion (the residential bar; retain + deepen)
- **CAA 2001 s.38B** — General Exclusion 2: cars excluded from AIA
- **CAA 2001 s.45D** — 100% FYA for new, unused 0 g/km zero-emission cars (the only car FYA)
- **CAA 2001 s.45S** — full expensing (100%, COMPANY-ONLY, from 1 April 2023)
- **CAA 2001 s.45U** — 40% first-year allowance (inserted by FA 2026 s.29; expenditure on/after 1 Jan 2026; new and unused main-rate plant; not incorporation-restricted)
- **CAA 2001 s.51A** — AIA entitlement; s.51A(5) "£1,000,000" (permanent from 1 April 2023)
- **CAA 2001 s.55** — determination of entitlement / balancing events (AQE vs TDR)
- **CAA 2001 s.56** — main-pool WDA, now 14% (substituted by FA 2026 s.28(1))
- **CAA 2001 s.61** — disposal events and disposal values (the disposal-value table spine)
- **CAA 2001 s.65** — the final chargeable period (when a balancing allowance arises)
- **CAA 2001 s.67** — hire-purchase / deemed-ownership for capital-allowances purposes
- **CAA 2001 s.104D** — special-rate pool WDA, 6% (unchanged)
- **CAA 2001 s.196** — fixtures disposal-value Table (seller-side)
- **CAA 2001 s.198** — fixtures election on sale of qualifying interest (buyer-side; forward-link only)
- **CAA 2001 s.201** — s.198 election procedure + 2-year time limit
- **Finance Act 2026 (c.11) s.28** — main-pool WDA 18%->14% (substituting CAA 2001 s.56(1)); ENACTED 18 March 2026
- **Finance Act 2026 (c.11) s.29** — inserts CAA 2001 s.45U (40% FYA); ENACTED 18 March 2026
- **Finance (No. 2) Act 2023 (c.30) s.8** — £1m AIA cap made permanent from 1 April 2023 (Royal Assent 11 July 2023)
- **Finance Act 2025 (c.8) Schedule 5** — FHL abolition (1 Apr 2025 CT / 6 Apr 2025 IT); cite for the FHL-grandfathered correction only

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis; each query assigned exactly once to where it is served.

| Query | source | impr | pos | served-in |
|---|---:|---:|---|---|
| aia capital allowances property landlords (disposal/balancing-charge + claim-process angle) (PRIMARY) | diagnosis | n/a | n/a | metaTitle + H1 |
| aia capital allowances | gsc | 1 | 78 | H2#1 (intro recap, body) |
| can you claim capital allowances on investment property | gsc | 1 | 94 | H2#2 (s.35 recap) |
| aia capital allowances | adjacent | 18 | 5 | H2#8 (when AIA runs out, body — AIA framing) |
| annual investment allowance uk | adjacent | 56 | 70.9 | H2#1 (intro recap, body — forward-link to pillar) |
| annual investment allowance landlords | adjacent | 32 | 63.9 | H2#2 (s.35 recap — forward-link to landlords canonical) |
| what happens if i sell an asset i claimed aia on | adjacent | 0 | 0 | H2#3 (the disposal mechanic) + FAQ#1 |
| aia balancing charge on disposal property | adjacent | 0 | 0 | H2#4 (balancing charge vs allowance) + FAQ#2 |
| how to claim annual investment allowance property | adjacent | 0 | 0 | H2#6 (step-by-step claim process / howTo) |
| aia partnership property landlords | adjacent | 0 | 0 | H2#9 (partnerships and groups) + FAQ#5 |
| aia second hand plant and machinery | adjacent | 10 | 2.9 | H2#8 (AIA vs 40% FYA — AIA allows used; FYA does not) + FAQ#6 |
| what is aia in tax | adjacent | 30 | 5.1 | H2#1 (intro recap, body) |
| aia hire purchase plant and machinery | adjacent | 0 | 0 | H2#7 (hire purchase vs leasing) + FAQ#7 |

**Additional FAQ coverage (verbatim-query FAQs beyond the table rows, to reach 12-14):** "Do I pay a balancing charge when I sell my rental property?"; "Can I claim AIA on fixtures in a commercial property I'm selling?" (s.196 / s.198); "How do I work out the AIA for a short accounting period?"; "Can a property partnership claim more than £1m of AIA?" (no — single allowance); "Can I claim AIA on a car for my property business?" (no — s.38B); "What is the writing-down allowance rate from April 2026?" (14% main / 6% special, FA 2026 s.28).

---

## Meta plan

- **metaTitle (<= 62 chars; lead with the disposal/claim-process differentiator the canonicals do NOT own):**
  - Candidate A: "AIA for Landlords: Disposal, Balancing Charges & Claiming" (57)
  - Candidate B: "AIA Capital Allowance: Selling Up & How to Claim (Landlords)" (59)
  - Candidate C: "AIA Disposal & Claim Process for Property Landlords" (51)
  - Lead recommendation: Candidate A or C. Both signal the disposal/exit + claim-process lane and avoid duplicating the canonicals' "what is AIA" intent. Verify char count at write time.
- **metaDescription (<= 158 chars, disposal + claim-process angle, NO pricing):**
  - "What happens to your AIA claim when you sell: balancing charges, disposal values (CAA 2001 s.61), the s.196 fixtures Table, and how to make and defend the claim." (157)
- **h1:** "AIA Capital Allowance for Property Landlords: Disposal, Balancing Charges and the Claim Process" (replaces the generic "What Is the AIA Capital Allowance" framing with the distinguishing intent).
- **summary (frontmatter):** "Once you have claimed the Annual Investment Allowance, selling the asset (or the property carrying its fixtures) can trigger a balancing charge. This guide covers the disposal-value rules under CAA 2001 s.61, the s.196 fixtures Table, balancing charge versus balancing allowance, and the step-by-step process for making and defending an AIA claim, including hire purchase, short accounting periods and partnership allocation."

---

## Schema plan

- **reviewedBy (frontmatter `reviewedBy`):** "ICAEW Qualified Senior Reviewer" — the REAL reviewer byline used across the rewritten property corpus (renders in the `BlogPostRenderer.tsx` "Reviewed by" block and emits as a `reviewedBy` Person in the BlogPosting JSON-LD per `Property/web/src/lib/schema.ts`). Keep consistent with the corpus convention.
- **reviewerCredentials (frontmatter `reviewerCredentials`):** "ICAEW Chartered Accountant" (emits as `jobTitle` on the reviewer Person).
- **howTo:** **true** — this page now carries a genuine step-by-step claim process (H2#6). Populate frontmatter `howToSteps` with the five claim steps (confirm qualifying P&M not barred by s.35; confirm timing of incurral; pro-rate the cap for short periods; allocate across partnership/related companies; enter on the return + keep digital records). `buildHowToJsonLd` emits the HowTo block only when `howToSteps` is present.
- **dateModified:** 2026-05-30.
- **JSON-LD blocks that emit:** **Article (BlogPosting)** with `reviewedBy` Person (auto from frontmatter) + **FAQPage** (auto from frontmatter `faqs:`, 12-14 questions) + **HowTo** (auto from frontmatter `howToSteps:`). Never hand-add JSON-LD in the body; all three blocks are emitted by `Property/web/src/lib/schema.ts` from frontmatter.

---

## Per-page work-log (for execution session)

### House-position alignment
- §38 main-pool WDA 14% (FA 2026 s.28; ENACTED, no hedge): __
- §38 40% FYA added (FA 2026 s.29 / CAA 2001 s.45U; not incorporation-restricted): __
- §38 AIA £1m permanent (s.51A(5) + F(No.2)A 2023 s.8): __
- §38 full expensing company-only (s.45S; distinct from 40% FYA): __
- §38 cars excluded from AIA + 40% FYA (s.38B; only s.45D 0 g/km car FYA): __
- §38 / §25.2 s.35 dwelling-house bar retained + deepened: __
- §25.6 disposal mechanics (s.55 AQE/TDR; s.61 disposal values; s.196 Table; balancing charge/allowance): __
- §25.11 s.196 seller-side vs s.198 buyer-side boundary (forward-link only): __
- §13 do-not-write (no pricing, no client names): __

### FA 2026 enacted-status confirmation (LOAD-BEARING — assert, do NOT Bill-hedge)
- CAA 2001 s.56 confirmed reading 14% (annotated substituted by FA 2026 s.28(1)): __
- CAA 2001 s.45U confirmed inserted by FA 2026 s.29 (40% FYA): __
- FA 2026 (c.11) Royal Assent date confirmed 18 March 2026: __

### Comparison: before vs after
- Word count: 1,650 -> __ (target ~3,000)
- H2 count: 13 -> __ (target 11-13)
- FAQ count: 4 -> __ (target 12-14, FAQ #1 de-staled)
- Reference tables: 0 -> __ (target 3, plain HTML)
- HowTo schema: absent -> __ (present, Y/N)
- Reviewer byline: absent -> __ (ICAEW Qualified Senior Reviewer, Y/N)
- Authority links: 4 (2 defective) -> __ (target 6-8 legislation.gov.uk + gov.uk, unique IDs)
- Inline CTAs: 0 -> __ (target 2)
- Internal links: ~5 (some bare routes) -> __ (both §38 canonicals + balancing-charge + s.198-fixtures + MTD + BTL ltd-co pillar)
- 18% WDA assertion removed (now 14%): __ (Y/N)
- 40% FYA added: __ (Y/N)
- Stale £1m "since January 2019" + partnership "2019-2020" framing removed: __ (Y/N)
- Cars handling tightened (s.38B + s.45D): __ (Y/N)
- Dead aka.hmrc.gov.uk citation removed: __ (Y/N)
- Hallucinated nature.com BDJ citation removed: __ (Y/N)
- `[source: MTD rules]` placeholder removed: __ (Y/N)

### Flags raised
- F-[next] HIGH STALE_FACTS + CITATION-DEFECT (carried from this brief — confirmed corrected): __
- Cluster-collapse recommendation logged for manager (extends F-4; three dead duplicates 301 INTO canonicals later): __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
