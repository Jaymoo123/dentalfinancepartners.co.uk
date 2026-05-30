# Track 2 brief: what-is-aia-in-tax

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; STALE-FACTS gap dominant; definitional head-term defence)
**Source markdown path:** `Property/web/content/blog/what-is-aia-in-tax.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/what-is-aia-in-tax
**Stage 1 priority:** **H** (severe wrong-advice currently published on the explicitly-banned §25.6/§25.10 patterns; also owns a unique proven Bing page-1 definitional head-term that no sibling holds)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** **REWRITE** (collapse-direction rule FORBIDS a 301 away: this page holds Bing definitional head-term equity the candidate canonicals do NOT; see §"Cannibalisation universe check")

> Gold-reference-depth brief. Match the data integration and 15-section discipline of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The s.35 dwelling-house gate is the load-bearing substantive fix; the temporary-£1m / reverts-to-£200k framing is the load-bearing stale-facts deletion. Both are explicitly-banned patterns in `house_positions.md §25.10` and §38 "Do not write".

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `what-is-aia-in-tax`. The slug carries the pure definitional head-term intent ("what is aia in tax") that the page proves out on Bing (pos 3 on that exact query, pos 2 on "aia tax", pos 4 on "aia", 30 impressions at avg pos 5.1). Changing the slug or 301ing the page would destroy that equity for proven demand. Slug stays.
- **Canonical:** kept. Current canonical sits under `/blog/section-24-and-tax-relief/`. Do NOT re-slug into a capital-allowances category mid-rewrite (the slug_resolver per §16.T1 owns category; re-categorising changes the URL and forfeits the Bing equity). Keep the existing category path. Update `dateModified` + `sourcesVerifiedAt` to write date.
- **Category:** `Section 24 & Tax Relief` (kept, per canonical above). Note this is a categorisation quirk (AIA is capital allowances, not Section 24) but the live URL is indexed and ranking on Bing under this path; re-categorising forfeits proven equity. Flag the category mismatch to `track2_site_wide_flags.md` for a later cluster-consolidation pass, do NOT fix it in this rewrite.
- **Gap-mode tag:** `STALE_FACTS` (primary, wrong-advice driver) + `INVISIBLE` (Google: zero GSC rows) + `THIN_DEPTH` (1,885 words vs ~3,200 target) + `STRUCTURE` (4 FAQs, no s.35 gate framing, no rates table, sourceDomains empty) + `CTR_FAIL` (Bing page-1 positions converting weakly; tighten meta + snippet-bait).
- **"Why this rewrite" angle:** This page is the **short-funnel definitional explainer** for "what is AIA and does it even apply to my BTL". It is currently publishing wrong advice on two explicitly-banned patterns: (1) AIA is "temporary £1m, due to revert to £200,000 from April 2026" with transitional-apportionment guidance (frontmatter FAQ #1, body lines 47, 125-131, the "AIA Limits and Timing" H2) — banned by §25.10 ("AIA is £1m temporarily" is false; permanent from 1 April 2023) and §38 ("temporary until 31 March 2026 / reverts to £200,000" is stale); (2) it tells ordinary BTL landlords they can claim AIA on boilers, heating, furniture and white goods in let dwellings with NO mention of the CAA 2001 s.35 dwelling-house restriction — banned by §25.10 ("Plant in a residential dwelling is claimable under AIA" is false) and §38 ("Landlords can claim AIA on furnishings/boilers inside a let dwelling" is barred by s.35). The rewrite keeps the page's distinct short-funnel definitional role, corrects both banned patterns, anchors the whole page on the s.35 gate (the single most important AIA point for this audience), and **link-forwards the planning/allocation depth** to `annual-investment-allowance-uk` and the cluster pillar rather than re-deriving it (intent-distinctness, not depth-duplication).

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter 2026-05-30)

- **Source markdown path:** `Property/web/content/blog/what-is-aia-in-tax.md`
- **Current word count:** 1,885 (body)
- **Current H2 outline (1-line each):**
  1. How Does Annual Investment Allowance Work? (asserts temporary £1m reverting to £200,000)
  2. What Qualifies for AIA for Landlords? (lists boilers/furniture in lets as qualifying; NO s.35 gate) + H3 What Does Not Qualify
  3. AIA for Furnished Holiday Lettings (FHL abolition 6 Apr 2025 — broadly correct, refine to §25.7 transitional)
  4. AIA for Property Companies (states 25% CT main rate above £250k; the "£250 per £1,000" relief illustration is permitted, not a fee)
  5. AIA and Section 24 Restrictions (interaction framing — keep, refine)
  6. How to Claim AIA (self-assessment vs CT600; WDA "18% or 6%" STALE)
  7. AIA Limits and Timing (entire H2 is built on the banned reverts-to-£200k premise — gut and replace with permanent-cap + true straddling)
  8. Common Mistakes Landlords Make with AIA (does NOT list the s.35 dwelling-house trap — the biggest mistake)
  9. AIA vs Other Capital Allowances (WDA "18%" STALE; should fold in 40% FYA + company-only full expensing)
  10. Planning Your AIA Claims (light; forward-link allocation depth to siblings)
  11. Non-Resident Landlords and AIA (NRL1 framing — keep; but s.35 still bites on dwelling P&M)
  12. Making Tax Digital and AIA Records (MTD thresholds £50k/£30k/£20k — correct per §3, keep)
  13. Getting Professional Advice (CTA-shaped; keep)
- **Current meta title:** "What Is AIA in Tax? UK Landlord & Investor Guide" (49 chars; OK length, generic, no differentiator, no 2026 freshness signal)
- **Current meta description:** "What is AIA in tax? Learn how Annual Investment Allowance works for UK landlords, what qualifies, and how to claim it on property investments." (139 chars; reasonable, but does not surface the s.35 BTL gate that is the page's distinct value)
- **Current FAQs (frontmatter count):** 4 (target 12-14). FAQ #1 ("What is the AIA limit for 2025/26?") asserts temporary £1m reverting to £200,000 — DELETE/REWRITE. FAQ #2 ("rental property boiler") asserts a boiler in a rental property qualifies — WRONG for a dwelling (s.35). FAQ #4 ("furniture for a rental property") asserts beds/sofas/white goods qualify — WRONG for a dwelling (s.35). FAQ #3 (second-hand assets / WDA "18% or 6%") — WDA rate STALE.
- **Current outbound authority links:** 0 to legislation.gov.uk / gov.uk / HMRC manuals. `sourceDomains: []` (empty — must be populated at write time). Internal links present: `/services`, BTL ltd-co complete guide, Section 24 complete guide, landlord tax deductions list, what-does-a-property-accountant-do, how-much-does-a-property-accountant-cost, MTD landlords deadline. All resolve.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; `schema: ''` is fine — never hand-add FAQ schema in body per playbook §5).
- **Last meaningful edit date:** `dateModified: 2026-05-20`.
- **Pricing-leak check:** NONE found. No £ fee figures, no client names. The "£250 saving per £1,000 at 25% CT" line (body line 97) is a tax-relief illustration, not a fee — permitted (Decision E concerns soft fee comparisons; this is not one). `/services` + `/blog` internal links are fine. Keep the no-pricing discipline through the rewrite.

---

## GSC angle (last 90 days) — REAL DATA

**Google `gsc_query_data`:** **ZERO rows.** This page is **INVISIBLE on Google** (no impressions, no clicks, no indexed query surface in the 90-day window). The page is too new and/or out-competed by the heavily-cannibalised sibling cluster on Google. Standard CTR-fail math does not apply on Google — the lever there is becoming indexable + distinct + correct so Google can rank it for the definitional intent the siblings frame differently.

**Bing `bing_query_data` (the load-bearing signal — this page's genuine equity):** the page uniquely owns the pure DEFINITIONAL head-term intent on Bing with page-1 equity that **no sibling matches**:

| query | Bing position |
|---|---|
| what is aia in tax | **3** |
| aia tax | **2** |
| what does aia do | **2** |
| aia | **4** |
| aia meaning in capital allowance | **6** |

Aggregate: ~30 impressions at avg position ~5.1. The candidate redirect-canonicals (`annual-investment-allowance-uk` Bing pos 5.0, the pillar, the allocation-rules page) do NOT hold this definitional head-term intent. **This is why the collapse-direction rule (§16.T2) forbids 301ing this page away:** a 301 would bury proven Bing page-1 equity for proven demand into a page that does not rank for that intent.

**Strategic conclusion:**
- **Bing (recover + convert):** keep the slug; tighten the definitional answer-shape at the top so Bing's page-1 positions convert; do not disturb the indexed URL.
- **Google (earn visibility):** the rewrite's correctness + distinct definitional framing + snippet-bait answer block is the route to a Google impression surface this page has never had. INVISIBLE is recoverable here because the topic has demonstrated demand (the siblings rank on Google) and this page can own the "what is AIA / does it apply to my BTL" angle the deeper siblings under-serve.
- **GA4 `ga4_page_data`:** not separately pulled at brief time (Google-invisible page → negligible organic sessions expected). Defer to execution-time pull; do not block the rewrite on it.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (wrong-advice, the rewrite driver).** Two explicitly-banned patterns are LIVE on the page:

1. **Temporary-AIA framing.** Frontmatter FAQ #1 + body lines 47, 125-131 + the "AIA Limits and Timing" H2 all assert AIA is a temporary £1m "due to revert to £200,000 from April 2026" and give transitional-apportionment guidance around that revert. **Banned.** Per `house_positions.md §25.3` + §25.10 + §38: AIA was made **permanently £1,000,000 by Finance (No.2) Act 2023 s.8** with effect from **1 April 2023** (CAA 2001 s.51A(5)). There is no revert to £200,000. The entire "AIA Limits and Timing" section's premise is false and must be gutted; the only true straddling apportionment left is the ordinary short/long-chargeable-period proportioning (s.51A 12-month basis), NOT a revert-date apportionment.
2. **WDA "18%" throughout.** Body lines 45, 117, 154 + FAQ #3 state main-pool WDA is 18%. **Stale.** Per §38 (Track 2 batch 4 lock, manager source-verified 2026-05-30): main-pool WDA was cut to **14%** by **FA 2026 s.28**, effective chargeable periods beginning on or after 1 April 2026 (CT) / 6 April 2026 (IT), with a hybrid time-apportioned rate for straddling periods (FA 2026 s.28(2)-(6)). Special-rate pool stays **6%** (unchanged). **F-37 Bill-vs-enacted discipline note: FA 2026 (c.11) received Royal Assent 18 March 2026 and is ENACTED** (verified in §38; re-confirm at legislation.gov.uk CAA 2001 s.56 at write time, annotated "substituted ... by Finance Act 2026 (c.11), s.28(1)"). State 14% as current law, never "proposed" or "Finance Bill 2026".

**Co-primary: SUBSTANTIVE CORRECTNESS GAP — the s.35 dwelling-house gate (the single most important AIA point for this audience).** The page tells ordinary BTL landlords they can claim AIA on boilers, heating, furniture and white goods in let dwellings (body lines 54-56, 77; FAQ #2 + #4) with **no flag** of the **CAA 2001 s.35 dwelling-house restriction**, which bars plant-and-machinery allowances (and therefore AIA) for plant in a dwelling-house within a property business. Per §25.2 + §25.3 + §25.10 + §38: P&M allowances are barred for plant in a dwelling-house; the **narrow exceptions** are (a) plant in the **common parts** of a multi-let building (communal boiler, lift, communal lighting in a block of flats / HMO common parts), and (b) **integral features** (CAA 2001 s.33A) in qualifying **non-dwelling** areas (commercial units, offices, communal areas in mixed-use). Ordinary single-let residential furnishings instead go through the **replacement of domestic items relief** (ITTOIA 2005 s.311A / CTA 2009 equivalent — a revenue deduction, NOT a capital allowance) — the page must redirect the reader there for furniture/white goods rather than promising AIA. This s.35 gate is what every competitor and the corrected sibling raise; it is the page's distinct value as the "does AIA even apply to my BTL" explainer.

**Secondary: INVISIBLE (Google) + THIN_DEPTH + STRUCTURE.** Zero Google rows; 1,885 words vs ~3,200 target; 4 FAQs vs 12-14; no s.35 framing; no AIA-qualifying-vs-excluded decision table; `sourceDomains: []`. The page reads as a generic AI explainer that happens to be wrong on the load-bearing points.

**Tertiary: CTR_FAIL (Bing).** Page-1 Bing positions (2-6) converting weakly; tighten the meta title + the top-of-page definitional answer block so the snippet wins the click.

**Load-bearing fix sequence (ordered by ROI / consequence):**

1. **Delete every temporary-£1m / reverts-to-£200k / revert-date-straddling assertion** (FAQ #1, body lines 47, 125-131, the "AIA Limits and Timing" H2). Replace with the permanent-£1m position (§25.3, F(No.2)A 2023 s.8 from 1 April 2023) + the true short/long-period apportionment only.
2. **Insert the s.35 dwelling-house gate as the page's anchor concept**, ideally a dedicated early H2 ("Does AIA Apply to My Buy-to-Let? The Dwelling-House Rule") plus correction of every qualifying-list claim. Rewrite FAQ #2 (boiler) and FAQ #4 (furniture) to the s.35-correct answer, routing single-let furnishings to replacement-of-domestic-items relief.
3. **Correct WDA 18% → 14%** at every occurrence (lines 45, 117, 154, FAQ #3); special-rate stays 6%; cite FA 2026 s.28 + the hybrid straddling rate; assert as enacted law per §38.
4. **Fold the new 40% FYA (FA 2026 s.29, unincorporated + leasing, from 1 January 2026) and company-only full expensing (CAA 2001 s.45S)** into the "AIA vs Other Capital Allowances" section per §25.5 + §38. The 40% FYA is the route that IS available to unincorporated landlords where full expensing is not — material for the audience.
5. **Refine the FHL section to the §25.7 transitional** (FA 2025 Sch 5; abolition 6 Apr 2025 IT / 1 Apr 2025 CT; grandfathered pools continue to be written down in the ordinary property business; no new FHL P&M qualifies; cite FA 2025 Sch 5, never FA 2024 Sch 5).
6. **Body lift to ~3,200 words; FAQs 4 → 12-14**; add an AIA qualifying-vs-excluded decision table (snippet-bait) near the top; add 1-3 inline `<aside>` CTAs at conversion moments.
7. **Populate `sourceDomains`** + 4-6 inline legislation.gov.uk / gov.uk / HMRC-manual citations actually used.
8. **Meta title + description rewrite** leading with the definitional head-term + the BTL s.35 distinctness (see meta plan below).
9. **Link-forward planning/allocation depth** to `annual-investment-allowance-uk` (the £1m cap + group-sharing/planning owner) and the cluster pillar, rather than re-deriving — preserves intent-distinctness.

---

## Competitor URLs (Stage 2 — verify 200 status + date-stamp at execution per §16.31)

The four diagnosis targets, with what to borrow / differentiate. **Execution session MUST WebFetch each, confirm 200, replace if dead, and date-stamp.** (URL-liveness is the §16.31 mandate; not pre-fetched at brief time.)

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.protaxaccountant.co.uk/post/aia-allowance | Clean definitional opening; AIA-qualifying lists | Likely no FA 2026 14% WDA + no 40% FYA freshness; we lead with enacted-2026 currency + the s.35 BTL gate |
| https://leyton.com/uk/insights/articles/what-is-the-annual-investment-allowance-aia/ | "What is AIA" answer-shape (snippet-bait); £1m permanent framing | Generalist (not property-specific); we anchor on the dwelling-house s.35 restriction they will not cover |
| https://pkf-francisclark.co.uk/insights/capital-allowances-for-property-investors-what-you-can-and-cant-claim-in-2025/ | The "what you can and can't claim" property-investor framing; commercial-vs-residential split | 2025-dated → likely pre-FA-2026; we carry 14% WDA + 40% FYA + permanent £1m as current |
| https://cpatax.co.uk/what-is-the-annual-investment-allowance-aia-a-guide-for-commercial-property-buyers/ | Commercial-property-buyer angle + fixtures framing | Commercial-only; we cover the residential s.35 gate AND the commercial/common-parts exception as the distinguishing axis |

**Competitor depth ceiling for this query class:** generalist + property-adjacent AIA explainers, typically 1,200-2,200 words, 0-4 FAQs, 0-2 statute citations, no FA 2026 currency. Our ~3,200-word target with 12-14 FAQs, 4-6 verified legislation.gov.uk citations, the s.35 decision table, and enacted-2026 rates (14% WDA + 40% FYA + permanent £1m) is decisively best-in-class — and, critically, **correct** where the live page and several competitors are stale.

**What to differentiate against (the spine):** the s.35 dwelling-house gate + the FA 2026 currency (14% WDA, 40% FYA s.29) + the company-only full-expensing distinction. No competitor combines all three for a property audience.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (the live frozen index for the batch). The AIA/CapitalAllowances cluster is large and heavily cannibalised (13+ pages touch AIA). Distinctness for this page is held by **INTENT**, not by topic.

| Source | Slug | Bing/Google equity | Status / resolution |
|---|---|---|---|
| Residual (own) | what-is-aia-in-tax | Google 0; Bing pos 2-4 on "aia / aia tax / what is aia in tax" (definitional head-term — UNIQUE) | **REWRITE in place.** Owns the short-funnel definitional + "does it apply to my BTL" intent. Collapse FORBIDDEN (§16.T2): no sibling holds this Bing definitional equity. |
| Sibling (live) | annual-investment-allowance-uk | Google 55 impr pos 70.9; Bing pos 5.0 | DISTINCT — owns "£1m PERMANENT cap + s.35 dwelling-house trap + group-sharing/planning" intent; already statute-correct (§38-anchored). **Forward-link the planning/cap/group-sharing depth here.** No collapse. |
| Sibling (live) | aia-allowance-uk-property-investors | Google 8 impr pos 25.3 | DISTINCT — investor framing + AIA-vs-full-expensing. Cross-link. |
| Sibling (live) | annual-investment-allowance-landlords-uk | Google 32 impr pos 63.9 | DISTINCT — landlord framing. Cross-link; watch for intent overlap at a later consolidation pass. |
| Canonical (live) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | cluster PILLAR | DISTINCT — comprehensive CAA 2001 decision framework. **Forward-link as the pillar / "full decision framework" destination.** |
| Canonical (live) | aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 | allocation/association depth | DISTINCT — £1m allocation + association rules depth. **Forward-link for allocation/association mechanics** rather than re-deriving s.51E/s.51G here. |
| Future redirect candidates (weaker generics) | aia-capital-allowance-property-landlords (pos 86), capital-allowance-aia-property-landlords (pos 81), annual-investment-allowance-2024-25, annual-investment-allowance-2025, aia-capital-allowances | weak/dated | **NOT this brief's job.** Flagged for a later cluster-consolidation pass: these are the future redirect-collapse candidates into EITHER this page OR annual-investment-allowance-uk. Do not touch in this rewrite. |

**Conclusion:** **REWRITE in place.** No REDIRECT-PROPOSED (collapse-direction rule forbids it — this page holds unique Bing definitional equity). Distinctness held by intent: this page = short-funnel "define AIA + does it apply to my BTL" explainer; siblings = planning/allocation/association/cap depth (forward-linked). Cluster-consolidation of the weak generic siblings is a separate later pass.

---

## Closest existing pages (Stage 2 — internal-link targets within the live corpus)

Forward-link the depth this page deliberately does NOT re-derive; reciprocal-link the definitional entry point back.

- **Cap + group-sharing + planning depth →** `annual-investment-allowance-uk` — `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` (link from the £1m-cap section and the planning section; this is the primary forward-link).
- **Investor framing + AIA-vs-full-expensing →** `aia-allowance-uk-property-investors` — `/blog/property-types-and-specialist-tax/aia-allowance-uk-property-investors`.
- **Landlord framing →** `annual-investment-allowance-landlords-uk` — `/blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk`.
- **Cluster PILLAR / full decision framework →** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` (link from "AIA vs Other Capital Allowances" + "Planning Your AIA Claims").
- **£1m allocation + association-rules depth →** `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` — `/blog/property-types-and-specialist-tax/aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` (link from the company/group AIA section).
- **WDA rates depth →** `writing-down-allowance-rates` — `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` (link from the WDA correction / "AIA vs Other Capital Allowances").
- **Already-linked (keep + verify resolve):** `buy-to-let-limited-company-complete-guide-uk` (incorporation), `section-24-tax-relief-complete-guide` (Section 24 interaction), `landlord-tax-deductions-uk-2026-complete-list` (repairs-vs-capital + replacement-of-domestic-items relief), `making-tax-digital-landlords-april-2026-deadline` (MTD), `what-does-a-property-accountant-do`, `how-much-does-a-property-accountant-cost`, `/services`.

---

## House-position references (Stage 1)

Thread these; cite by `§N.M` (the section number is the contract — never paraphrase, never invent a statute section):

- **§25.1 Qualifying activity (CAA 2001 s.15 / s.270CA)** [LOCKED 2026-05-23] — AIA needs a qualifying activity (UK/overseas property business or trade); s.15(1)(c)/(da) FHL paragraphs OMITTED by FA 2025 Sch 5 Part 3 from 1 Apr 2025 (CT) / 6 Apr 2025 (IT).
- **§25.2 Plant and machinery allowances (CAA 2001 Part 2)** [LOCKED 2026-05-23] — building shell (s.21 List A) and structures (s.22 List B) excluded; integral features (s.33A) special-rate; List C (s.23) carve-back; the **s.35 dwelling-house restriction** bars P&M in a dwelling, narrow common-parts exception.
- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23] — **s.51A(5) £1,000,000 maximum, PERMANENT from 1 April 2023 (F(No.2)A 2023 s.8)**; single AIA per company (s.51B), parent/subsidiary share (s.51C), common-control + related share (s.51E; control s.51F; related s.51G); cars excluded; s.35 bars residential-dwelling P&M.
- **§25.5 First-Year Allowances (CAA 2001 ss.39-51)** [LOCKED 2026-05-23] — **full expensing s.45S is COMPANY-ONLY** (from 1 Apr 2023, unused/new only); FYA gateway s.39; s.46 general exclusions.
- **§25.6 Disposal mechanics (CAA 2001 ss.55-67 + s.61)** [LOCKED 2026-05-23] — balancing charge/allowance on disposal; pool concept (main 14% / special 6%); for the AIA-on-fixtures-then-sell scenario.
- **§25.7 FHL transitional (FA 2025 Sch 5)** [LOCKED 2026-05-23] — abolition commencement 1 Apr 2025 (CT) / 6 Apr 2025 (IT); grandfathered pools continue writing down in ordinary property business; **cite FA 2025 Sch 5, NOT FA 2024 Sch 5**.
- **§38 Capital allowances — FA 2026 reform floor** [LOCKED 2026-05-30, ENACTED] — **main-pool WDA 14%** (FA 2026 s.28, from 1 Apr 2026 CT / 6 Apr 2026 IT, hybrid straddling rate); **special-rate 6% unchanged**; **new 40% FYA (FA 2026 s.29, main-rate new/unused P&M, from 1 Jan 2026, unincorporated + leasing, excludes cars/second-hand)**; AIA £1m permanent; full expensing company-only; SBA 3%; the s.35 bar; cars excluded from AIA and from the 40% FYA.
- **§25.10 + §38 "Do not write"** [LOCKED] — the banned-pattern list this page currently violates (temporary AIA; £200k revert; WDA 18%; furnishings/boilers in a let dwelling claimable; full expensing for individuals; cars AIA-qualifying).

**Verify-at-write discipline (F-37 / §16.31):** re-confirm FA 2026 (c.11) Royal Assent 18 March 2026 + CAA 2001 s.56 reads 14% (annotated "substituted ... by Finance Act 2026 (c.11), s.28(1)") at legislation.gov.uk before stating 14% as enacted. Re-confirm CAA 2001 s.51A(5) reads £1,000,000.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — TWO banned-pattern wrong-advice instances published live.** The current page directly contradicts locked house positions:

1. **§25.3 / §25.10 / §38 conflict (temporary-£1m / £200k revert).** FAQ #1 + body lines 47, 125-131 + the "AIA Limits and Timing" H2 assert AIA is temporary and reverts to £200,000 from April 2026. This is the **explicitly-banned** pattern ("AIA is £1m temporarily" / "AIA cap is £200,000" / "temporary until 31 March 2026 / reverts to £200,000"). The rewrite's FIRST job is to delete all of it.
2. **§25.2 / §25.3 / §25.10 / §38 conflict (s.35 dwelling-house).** Body lines 54-56, 77 + FAQ #2 (boiler) + FAQ #4 (furniture) tell ordinary BTL landlords plant in a let dwelling is AIA-claimable. **Explicitly banned** ("Plant in a residential dwelling is claimable under AIA" / "Landlords can claim AIA on furnishings/boilers inside a let dwelling"). The rewrite must gate every qualifying claim behind s.35 and route single-let furnishings to replacement-of-domestic-items relief.
3. **§38 conflict (WDA 18%).** Lines 45, 117, 154 + FAQ #3 state WDA 18%. Stale; correct to 14% (FA 2026 s.28) with special-rate 6% unchanged.

Flag to `track2_site_wide_flags.md` as:
**F-NN | 2026-05-30 | HIGH | what-is-aia-in-tax | STALE_FACTS + WRONG_ADVICE | Two banned §25.10/§38 patterns LIVE: (1) temporary-£1m reverting-to-£200k framing (FAQ#1 + lines 47,125-131 + "AIA Limits and Timing" H2); (2) AIA-on-boilers/furniture-in-let-dwellings with NO s.35 gate (lines 54-56,77 + FAQ#2 + FAQ#4). Plus WDA 18% stale (lines 45,117,154 + FAQ#3 → 14% FA 2026 s.28). Rewrite gated on §25.3/§25.2/§38. No pricing leak.**

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31)

Populate `sourceDomains` with the domains of the 4-6 actually cited. Re-confirm each 200 + content at write time.

| URL | Use case | Verify note |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | AIA £1m maximum (s.51A(5)) | Confirm s.51A(5) reads "£1,000,000"; confirm permanence annotation (F(No.2)A 2023 s.8) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Dwelling-house P&M restriction | The load-bearing citation; confirm operative wording at write time |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | Main-pool WDA rate (now 14%) | Confirm reads 14%, annotated "substituted ... by Finance Act 2026 (c.11), s.28(1)" — F-37 enacted-confirmation |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Full expensing (company-only) | Confirm s.45S company-only / unused-and-not-second-hand |
| https://www.legislation.gov.uk/ukpga/2026/11/section/29 | New 40% FYA (FA 2026 s.29) | Cite FA 2026 s.29; verify the consolidated CAA-inserted section number at write time, else cite FA 2026 s.29 — NEVER invent a section number |
| https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 | FHL abolition transitional | FA 2025 Sch 5 (NOT FA 2024 Sch 5) |
| https://www.gov.uk/capital-allowances/annual-investment-allowance | gov.uk consumer cross-reference | Controlled link-out for the "I want gov.uk authority" reader |
| https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual (CA23000+ AIA; CA21000+ P&M) | HMRC interpretive overlay | Verify exact CA path at execution (no hallucinated manual numbers per §16.31) |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A (or CTA 2009 equivalent) | Replacement of domestic items relief | For routing single-let furnishings away from AIA; verify section at write time |

(Execution session selects 4-6 to actually cite in body + lists their domains in `sourceDomains`.)

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4` section 13: voice rules (`NETNEW_PROGRAM.md §4` + `competitor_rewrite_playbook.md §5`), lead-gen architecture, CSS-in-markdown, FAQs-and-schema, anti-templating, quality bar (`§4.3` six-check), statute-citation discipline, and all §16 lessons (esp. §16.18 reasoning-first, §16.31 URL-liveness, §16.22/§16.27/§16.30+ Bill-vs-enacted, §16.T1 deterministic floor for high-consequence calls).

**Critical for THIS brief:** NO em-dashes (use commas, parentheses, full stops, middle dots). NO pricing / fees (the "£250 per £1,000 at 25% CT" relief illustration is permitted; do not add fee comparisons). NO real client names (anonymised social proof only, e.g. "a portfolio landlord converting a commercial unit..."). LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate. Body HTML (`<p>`, `<h2>`), not markdown syntax. FAQ schema auto-emits from frontmatter `faqs:` — never hand-add in body. Statute citations rendered as legislation.gov.uk hyperlinks, each verified at write time including FA 2026 (c.11) Royal Assent (F-37 pattern).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow from `NETNEW_PROGRAM.md §7` + the gold-reference workflow in the trial brief. Track 2 deltas + page-specific load-bearing steps:

1. Read `house_positions.md` §25.1, §25.2, §25.3, §25.5, §25.6, §25.7, §25.10, §38 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status as applicable).
3. Read this brief end-to-end.
4. **Verify FA 2026 (c.11) enacted status + the four load-bearing statute reads** at legislation.gov.uk: CAA 2001 s.51A(5) = £1,000,000; CAA 2001 s.56 = 14% (FA 2026 s.28 annotation); CAA 2001 s.35 dwelling-house bar operative; FA 2026 s.29 = 40% FYA. This is the load-bearing pre-rewrite verification (§16.31 / F-37).
5. WebFetch the 4 competitor URLs; confirm 200; date-stamp; replace any dead URL.
6. Read the current `what-is-aia-in-tax.md` source in full.
7. Read the 6 closest sibling/pillar pages listed above (for forward-link targeting + intent-distinctness confirmation, NOT to duplicate their depth).
8. Plan outline: ~12-13 H2s, ~3,200 body words, 12-14 FAQs, an AIA qualifying-vs-excluded decision table near the top, the s.35 gate as an early dedicated H2.
9. **Rewrite markdown at existing path** (NOT a new file). Preserve frontmatter `slug` + `canonical` + `category` (do NOT re-categorise — keeps Bing equity). Update `dateModified` + `sourcesVerifiedAt` to write date. Populate `sourceDomains`. Rewrite metaTitle + metaDescription per the plan below.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title within limit; meta description ≤ 158 chars; all internal links resolve. Plus banned-pattern grep: zero matches for "£200,000" revert framing, zero "18%" WDA assertions, zero "claim AIA on" furniture/boiler-in-dwelling claims.
12. Confirm no redirect needed (NONE — slug kept; collapse forbidden per §16.T2).
13. Update / insert `monitored_pages` Supabase row (INVISIBLE-baseline → 180-day window per F-11 recommendation; record the Bing definitional-equity baseline so a Bing regression is detectable).
14. Commit on `main`: `git commit -m "Track 2A: rewrite what-is-aia-in-tax (stale-facts + s.35 gate + FA 2026 14%/40% FYA)"`. Tracker edits to main repo file via absolute paths only.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the F-NN above + any new discoveries (e.g. the category-mismatch flag).
17. Update `TRACK2_PROGRAM.md §3` heartbeat.
18. Log discoveries for inter-batch awareness (the cluster-consolidation candidates list).
19. Next page in batch (or end batch).

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (test 2-3; lead with the definitional head-term Bing already ranks for + a freshness/distinctness signal; keep within length):**
  - "What Is AIA in Tax? UK Landlord Guide (2026 Rules)"
  - "What Is AIA in Tax? AIA for UK Landlords Explained 2026"
  - "What Is AIA in Tax? Does It Apply to Your Buy-to-Let?"
  - (Lead with "What Is AIA in Tax" verbatim — it is the proven Bing head-term. Add the BTL/s.35 distinctness or the 2026 currency as the differentiator.)
- **metaDescription (≤ 158 chars; surface the s.35 BTL gate that is the page's distinct value + permanent £1m + free-call hook, no pricing, no em-dash):**
  - "What is AIA in tax? How the £1m Annual Investment Allowance works for UK landlords, what qualifies, and why the dwelling-house rule blocks most BTL claims."
- **h1 (keep aligned to slug + definitional intent):**
  - "What Is AIA in Tax? A Guide for UK Landlords and Property Investors" (current h1 is fine; may tighten to "What Is AIA in Tax? AIA for UK Landlords and Property Investors Explained" if a freshness signal is wanted — keep it answer-shaped for snippet capture).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §25.3 AIA £1m permanent (delete temporary/£200k revert): __
- §25.2 / §25.3 s.35 dwelling-house gate inserted + qualifying lists corrected: __
- §38 WDA 18% → 14% (FA 2026 s.28; special-rate 6%): __ enacted-confirmed at legislation.gov.uk
- §38 40% FYA (FA 2026 s.29, unincorporated + leasing) folded in: __ section-number verified / cited as FA 2026 s.29
- §25.5 full expensing company-only (s.45S): __
- §25.7 FHL transitional (FA 2025 Sch 5, not FA 2024): __
- Replacement-of-domestic-items relief route for single-let furnishings: __

### Comparison: before vs after
- Word count: 1,885 → __ (target ~3,200)
- H2 count: 13 → __
- FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 4-6) + `sourceDomains` populated: __
- Inline CTAs: 0 → __ (1-3)
- AIA qualifying-vs-excluded decision table: 0 → __ (1 expected)
- Banned patterns removed: temporary-£1m __ / £200k-revert __ / WDA-18% __ / furniture-boiler-in-dwelling-claimable __

### Bill-vs-enacted verification (F-37)
- FA 2026 (c.11) Royal Assent 18 Mar 2026 confirmed at write time: __
- CAA 2001 s.56 reads 14% (FA 2026 s.28 annotation) confirmed: __

### Flags raised
- F-NN (carried from brief): banned-pattern corrections confirmed: __
- Category-mismatch flag (AIA under Section-24 path) logged for later consolidation: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
