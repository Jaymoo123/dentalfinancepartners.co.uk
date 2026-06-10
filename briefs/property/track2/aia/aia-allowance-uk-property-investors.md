# Track 2 brief: aia-allowance-uk-property-investors

**Site:** property
**Brief type:** Legacy rewrite - gold-reference data-complete brief (Track 2A; cluster: capital allowances / AIA)
**Source markdown path:** `Property/web/content/blog/aia-allowance-uk-property-investors.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/aia-allowance-uk-property-investors
**Stage 1 priority:** H - best-RANKED of the AIA duplicate cohort (Google pos 25.3 on the property-investor variant; 8 GSC impr) but the WEAKEST property-investor sibling on equity. The diagnosis flagged it RE-DIAGNOSE-SEPARATELY in the batch-4 `annual-investment-allowance-uk` brief precisely because its pos-25 equity must NOT be collapsed blind (the §16.T2 reversed-equity hazard). REWRITE-only is the standing rule.
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (GSC + adjacency from diagnosis; source markdown + frontmatter read; house_positions §25.3 / §25.7 / §38 + §7 verified; statute spine WebFetched against legislation.gov.uk at brief time)
**Cannibalisation status:** REWRITE (REPOSITION to the post-FA-2026 ALLOCATION-DECISION page for COMMERCIAL / MIXED-USE property investors. Differentiate AWAY from every sibling: cross-link s.35 dwelling-house detail into `annual-investment-allowance-landlords-uk`; cross-link group-sharing into `aia-1m-cap-...-association-rules-cta-2010`; point definitional "what is AIA" intent to `annual-investment-allowance-uk`. No 301 of THIS page outward - any later collapse runs weaker → stronger and is a deferred workstream, out of scope here.)

> **Gold-reference depth target.** This brief matches the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the batch-4 sibling `briefs/property/track2/batch4/annual-investment-allowance-uk.md`. The rewrite must hit ~3,200 body words at this section + citation density. Every statute fact below was verified at legislation.gov.uk on 2026-06-02 (see Statute spine).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `aia-allowance-uk-property-investors`. The pos-25 equity sits on a real exact-ish-match query family ("aia allowance", "aia capital allowances", "aia hmrc", "aia tax"). A path change would force a 301 and reset the only Google equity in the cohort. Keep slug + canonical + category (`Property Types & Specialist Tax`).
- **Category:** kept as `Property Types & Specialist Tax` (canonical path `/blog/property-types-and-specialist-tax/aia-allowance-uk-property-investors`). This is also the Wave 6 modern-cluster home, which reinforces the commercial/mixed-use repositioning (the modern pillar + s.51 group page sit in the same category).
- **Gap-mode tag:** `STALE_FACTS` (primary, load-bearing - four false "£1m until 31 March 2026 / reverts to £200k" assertions + zero FA 2026 coverage + a reader-misleading s.35 residential claim) + `CANNIBAL` (structural - 7+ live near-duplicate AIA slugs; this is the weakest variant and currently overlaps every sibling) + `THIN_DEPTH` (1,641 words vs 3,200 target) + `INVISIBLE` (pos 24-28 on its own head queries; 0 Bing) + `STRUCTURE` (no statute spine, hallucinated/dead sources, no comparison/decision table, 4 FAQs).
- **"Why this rewrite" angle:** The page is materially WRONG on its core fact AND two generations stale on the allowance menu. It frames the £1m cap as temporary, "confirmed until 31 March 2026 ... expected to revert to £200,000", in FOUR places (frontmatter FAQ #1 + FAQ #4 + body "AIA Limit" section + the entire H2 "Planning for the AIA Limit Change"). The £1m is PERMANENT from 1 April 2023 (CAA 2001 s.51A(5), made permanent by F(No.2)A 2023 c.30 s.8, RA 11 July 2023 - verified). The whole "plan before the limit drops" H2 is built on a false premise. Separately, the page predates FA 2026 entirely: no 40% FYA (FA 2026 s.29 / CAA 2001 s.45U, from 1 January 2026) and no main-pool WDA cut (18% → 14%, FA 2026 s.28 into CAA 2001 s.56(1)). Its "AIA vs full expensing" section is therefore two generations stale. And it carries a reader-misleading s.35 error (says installing heating / solar / security in a residential BTL "may qualify" - the s.35 dwelling-house bar blocks that). The rewrite does NOT just de-stale: it REPOSITIONS the page into the one intent NO sibling owns - the **allocation / sequencing decision** for commercial and mixed-use investors: *which capital allowance do I actually claim, and in what order: 100% full expensing (s.45S, companies only) vs the new 40% FYA (s.29/s.45U) vs the £1m AIA (s.51A) vs main-pool WDA at 14% (s.56) / special-rate 6% (s.104D)*. That decision-tree is the differentiator gov.uk, the specialist competitors, and every on-site sibling lack.

---

## Current page snapshot (Stage 2 - read from filesystem + frontmatter)

- **Source word count:** ~1,641 body words (diagnosis figure; broadly confirmed on read - list-led, light per-section depth).
- **Current H2 outline (read from source):**
  1. What Is the AIA Allowance? - definition + the STALE "£1m ... since 1 January 2019" framing (frontmatter FAQ #1 carries the "confirmed until 31 March 2026 ... revert to £200,000" wording).
  2. How Does the AIA Work for Property Investors? - asset list; period-of-purchase rule; short-period pro-rating (9/12 × £1m = £750k example); HP contracts. Mentions FHL "abolished from April 2025" (correct date, but no transitional nuance).
  3. What Qualifies for the AIA? - plant-vs-building distinction; "choose which allowance" line. **READER-MISLEADING:** the residential-property section says installing a new heating / solar / security system in a residential BTL "may qualify" - contradicts the s.35 dwelling-house bar.
  4. AIA Limit (body section) - asserts the temporary-cap framing again.
  5. AIA and Residential Property - the s.35 error above.
  6. AIA vs Full Expensing - two generations stale (no 40% FYA, no FA 2026 context; treats full expensing as the only "above the cap" route).
  7. Planning for the AIA Limit Change (entire H2) - built on the FALSE premise that the £1m drops on 31 March 2026; "bring investment forward before the cliff".
  8. How to Claim the AIA - claim list.
  9. (tail sections / Final Thoughts) - repeats the stale deadline.
- **Current meta title:** "AIA Allowance: Claim £1m on Property Plant & Machinery" (53 chars; generic, no permanent-cap hook, no allocation-decision differentiator).
- **Current meta description:** "The AIA allowance lets property investors claim up to £1m on plant and machinery. Learn how it works for buy-to-let and commercial property." (139 chars; the "buy-to-let" promise actively invites the s.35-barred reader and reinforces the wrong residential framing).
- **Current FAQ count (frontmatter `faqs:` array):** 4 (target 12-14). FAQ #1 + FAQ #4 are STALE (both assert "confirmed until 31 March 2026 ... expected to revert to £200,000"). FAQ #2 ("Can I claim AIA on a rental property?") answers "Yes ... heating systems, lifts, security systems, and solar panels" - the s.35 error in FAQ form.
- **Outbound authority links:** `sourceDomains` = `aka.hmrc.gov.uk` (DEAD legacy redirect domain - strip), `bankofengland.co.uk` (filler "business investment ~10% of GDP" - strip), `gov.uk` (keep), `icaew.com` (verify 200, keep if live), `nature.com` (HALLUCINATED - British Dental Journal, irrelevant to UK capital allowances - strip). Zero legislation.gov.uk citations.
- **Internal links:** to be surveyed at execution; current set is thin and does not cross-link to the canonical head-term page or the s.51 group page.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`). Do NOT hand-add FAQ schema in body.
- **Last meaningful edit:** `dateModified: '2026-05-20'` (recent stamp, stale content - a partial-touch artefact, not a genuine refresh).

---

## GSC angle (last 90 days) - REAL DATA from the diagnosis pull

**Source: diagnosis `target_queries[]` (GSC + adjacency). Google query-page-day grain.**

**Aggregate:** weakest property-investor variant in the cluster - **8 GSC impr, average position ~25.3, 0 Bing**. The page ranks page-3 on its own acronym head terms and never converts.

### Own-page GSC queries (direct, from diagnosis)

| imp | avg pos | query | source |
|---:|---:|---|---|
| 4 | 24.3 | aia allowance | gsc |
| 2 | 24.0 | aia capital allowances | gsc |
| 1 | 27.0 | aia hmrc | gsc |
| 1 | 28.0 | aia tax | gsc |

### Adjacent cluster demand the rewrite can reach (from diagnosis)

| imp | avg pos | query | source |
|---:|---:|---|---|
| 15 | 77.9 | annual investment allowance | adjacent |
| 11 | 67.8 | annual investment allowance calculator | adjacent |
| 7 | 82.2 | can you claim capital allowances on investment property | adjacent |
| 7 | 57.9 | investment allowance | adjacent |
| 5 | 72.3 | capital allowances on investment property in uk | adjacent |
| 2 | 5.0 | aia company different accounting periods | adjacent |
| 2 | 47.0 | what is annual investment allowance | adjacent |
| 2 | 70.0 | annual investment allowance uk | adjacent |
| 1 | 62.0 | aia limit | adjacent |
| 1 | 5.0 | are there capital allowances on investment property | adjacent |
| 1 | 7.0 | how does annual investment allowance work | adjacent |

### Pattern analysis

- **Own equity is acronym-led, not generic.** "aia allowance" / "aia capital allowances" / "aia hmrc" / "aia tax" (pos 24-28) is the page's defensible niche. Keep the acronym front-and-centre in metaTitle + H1.
- **The generic "annual investment allowance" head term (pos 70-82) is NOT this page's to win** - the batch-4 `annual-investment-allowance-uk` rewrite is the canonical head-term owner (Bing pos 3-7 + 56 GSC impr) and must not be cannibalised. Point that intent there.
- **Two adjacent queries already sit page-1 (pos 5-7)** - "aia company different accounting periods" (pos 5) and "are there capital allowances on investment property" (pos 5) / "how does annual investment allowance work" (pos 7). The accounting-periods query is a PRO-RATING + s.51 group-share intent; the "capital allowances on investment property" pair is the s.35 dwelling-house question. The repositioned page serves the first directly (short-period AIA mechanics within the allocation tree); the second is cross-linked into the landlords-uk sibling (do not re-own it).
- **"annual investment allowance calculator" (11 imp, pos 67.8)** is a tool intent. Satisfy it WITHOUT a JS tool via an answer-shaped allocation/decision table + a worked allocation walkthrough (the page's signature differentiator).

### GA4 engagement signal

- Not separately pulled at brief time (diagnosis carried GSC + adjacency only). At execution, pull via `optimisation_engine.track2.pull_page_data --slug aia-allowance-uk-property-investors`; expect near-zero readership (8 impr / 0 clicks). Limiter is upstream visibility + a wrong-fact page Google can verify against gov.uk, not engagement.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary - STALE_FACTS (load-bearing, must fix first; multiple).**
1. The £1m cap is framed as temporary, expiring 31 March 2026 and reverting to £200,000, in FOUR places (frontmatter FAQ #1 + FAQ #4 + the body "AIA Limit" section + the entire H2 "Planning for the AIA Limit Change"). FALSE per §38 + §25.3: £1m is PERMANENT from 1 April 2023 (CAA 2001 s.51A(5), made permanent by F(No.2)A 2023 c.30 s.8, RA 11 July 2023). §25.10 expressly lists "AIA is £1m temporarily" and "AIA cap is £200,000" as do-not-write. The "plan before the cliff" H2 must be DEMOLISHED and reframed: the genuine bring-forward urgency is now the **WDA cut (18% → 14% from April 2026) + the 40% FYA window**, not an AIA cliff.
2. Zero FA 2026 coverage. The new **40% FYA** on new/unused main-rate P&M from 1 January 2026 (FA 2026 c.11 s.29 / CAA 2001 s.45U - NOT incorporation-restricted) and the **main-pool WDA cut 18% → 14%** from 1 April 2026 (CT) / 6 April 2026 (IT) (FA 2026 s.28 into CAA 2001 s.56(1); special rate stays 6% per s.104D) are both absent. The "AIA vs full expensing" section is two generations stale.
3. **F-37 enacted-not-Bill discipline:** the GOV.UK measure page (published 26 November 2025) still says "Finance Bill 2025-26". The rewrite MUST state FA 2026 as **ENACTED** - Finance Act 2026 (c.11), Royal Assent **18 March 2026** (per §38; confirmed at brief time by the s.45U annotation "inserted (18.3.2026)"). Never "Finance Bill" / "proposed" / "subject to Royal Assent". Re-verify Royal Assent at write time per §16.T1.
4. **READER-MISLEADING s.35 error.** The "AIA and Residential Property" section (and FAQ #2) says installing a new heating / solar / security system in a residential BTL "may qualify". FALSE per §38 + §25.2 do-not-write list: the s.35 dwelling-house bar blocks P&M allowances on plant inside a let dwelling. Only **common parts** of a multi-let block (communal boiler, lift, lighting) + **integral features** (s.33A) in non-dwelling areas (offices, commercial units in mixed-use) qualify. Reframe to "standard residential BTL = blocked; here is the narrow carve-out", and cross-link the deep s.35 treatment to the landlords-uk sibling.

**Structural - CANNIBAL (dominant structural problem).** This slug sits in a crowded 7+-page AIA cluster and currently overlaps every sibling. The batch-4 brief already named the cluster's intent ownership:
- `annual-investment-allowance-uk` = generic "annual investment allowance" + "capital allowances on investment property" definitional intent (canonical head-term owner; Bing pos 3-7).
- `annual-investment-allowance-landlords-uk` = "who can actually claim / s.35 dwelling-house bar" intent.
- `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` = the deep s.51A-51N group-allocation / associated-companies sharing intent.
- `can-you-claim-aia-on-second-hand-assets` = the second-hand-assets sub-intent (best cluster CTR: 1 click, pos 7.4 GSC).
- `what-is-aia-in-tax` = the generic acronym-definition intent (30 Bing impr).

THIS page must own the one intent NO sibling owns: the **post-FA-2026 allocation / sequencing decision for commercial + mixed-use investors** ("which allowance, in what order"). Keep s.35 detail to a short cross-link into landlords-uk (do not re-own); keep group-sharing to a short cross-link into the 1m-cap page; point definitional traffic to annual-investment-allowance-uk.

**Secondary - THIN_DEPTH + INVISIBLE + STRUCTURE.** 1,641 words vs 3,200 target; 4 FAQs vs 12-14; no statute spine; hallucinated/dead sources (nature.com British Dental Journal, dead aka.hmrc.gov.uk, Bank of England filler); pos 24-28 on its own head terms; no comparison/decision table (the signature asset this page needs).

**PRICING-LEAK: none.** Diagnosis confirms no £-fees or fee-comparison language (generic "reduce corporation tax" only). Decision E clean - keep it that way. The worked examples may keep tax-saving arithmetic (a relief calculation, not a fee quote); no "we charge / typical accountant fee" language.

**Load-bearing fix sequence (ordered by ROI):**

1. **Strip every STALE fact.** Remove all four "until 31 March 2026 / reverts to £200,000 / temporary" assertions; reframe £1m as permanent from 1 April 2023 (F(No.2)A 2023 s.8 → CAA 2001 s.51A(5)). Demolish the "Planning for the AIA Limit Change" H2 and rebuild it as "The real FA 2026 timing decision" (WDA cut + 40% FYA window).
2. **Fix the s.35 error** (FAQ #2 + the residential section): standard residential BTL plant = blocked; narrow carve-out for common parts + non-dwelling integral features; cross-link the deep treatment to landlords-uk.
3. **Reposition to the allocation decision.** Build the central differentiator: an answer-shaped comparison/decision TABLE (full expensing vs 40% FYA vs AIA vs WDA) + a decision-order narrative + 3-4 worked allocation examples for commercial / mixed-use fact patterns.
4. **Build the FA 2026 floor** (40% FYA s.29/s.45U from 1 Jan 2026; WDA 14% s.28/s.56; special-rate 6% s.104D) as enacted law with inline legislation.gov.uk citations.
5. **Build the CAA 2001 statute spine** (s.51A, s.45S, s.45U, s.56, s.104D, s.35, s.33A, s.198/s.187B/s.201 fixtures, s.15) - strip the dead/hallucinated sources.
6. **Body lift to ~3,200 words** with the decision table + 3-4 worked examples.
7. **FAQ 4 → 12-14**, each on a verbatim GSC/adjacent query, with the acronym queries ("aia allowance", "aia hmrc", "aia limit", "aia company different accounting periods") front-loaded.
8. **Cross-link OUT** to the four siblings per the distinctness plan; do NOT duplicate their depth.
9. **Meta title + description + H1 rewrite** leading with the acronym + the allocation-decision hook.

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest refreshed snapshot at brief time) + the batch-4 cluster map in `briefs/property/track2/batch4/annual-investment-allowance-uk.md` (which flagged THIS page RE-DIAGNOSE-SEPARATELY, pos-25, "do NOT collapse blind - collapse guard must run before any 301 per §16.T2").

| Source | Slug | Owns intent | Status | Resolution for THIS page |
|---|---|---|---|---|
| Residual (own) | aia-allowance-uk-property-investors | acronym head ("aia allowance/hmrc/tax") + (to-be) allocation decision | **REWRITE** | Self - reposition to the post-FA-2026 allocation / sequencing decision for commercial + mixed-use investors. Keep slug + canonical + category. |
| Sibling (batch-4 REWRITE drafted) | annual-investment-allowance-uk | generic "annual investment allowance" + "capital allowances on investment property" definitional | LINK DEFINITIONAL OUT | Point "what is AIA" + generic head-term traffic here. Do NOT reproduce its £1m-permanent definitional lead. |
| Sibling (batch-4 brief) | annual-investment-allowance-landlords-uk | "who can claim / s.35 dwelling-house bar" | LINK s.35 OUT | Keep s.35 to a short carve-out + cross-link; do NOT re-own the dwelling-house deep-dive. |
| Wave 6 (modern, live) | aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 | deep s.51A-51N group-allocation / associated companies | LINK GROUP-SHARING OUT | Introduce single-AIA-for-related-companies briefly in the allocation tree + forward-link for s.51B-N depth. Do NOT reproduce. |
| Residual (best cluster CTR) | can-you-claim-aia-on-second-hand-assets | second-hand-assets sub-intent (1 click, pos 7.4) | LINK OUT | Note in the decision table that full expensing + 40% FYA require new/unused, AIA allows second-hand; cross-link the deep treatment. Do NOT re-own. |
| Residual | what-is-aia-in-tax | generic acronym-definition (30 Bing impr) | LINK OUT (definitional) | Point pure "what is aia" definitional traffic to annual-investment-allowance-uk; this page is the applied allocation page, not the definition page. |

**Conclusion:** REWRITE in place with a SHARP repositioning. Distinctness is achieved by owning the allocation/sequencing decision (no sibling owns it) and cross-linking - not duplicating - every adjacent intent. **No REDIRECT-PROPOSED. No FLAG-MANAGER beyond the documented STALE_FACTS flag.** If anything, the weaker generic siblings should later 301 INTO the strong canonical (`annual-investment-allowance-uk`), never this page outward - but that is a deferred collapse workstream, out of scope here, and any such 301 runs only after the collapse guard (`scripts/track2_collapse_guard.py`, R6) clears it.

---

## Section-by-section content plan (~3,200 body words)

Target: 12-13 H2s, ~3,200 body words, 12-14 FAQs (frontmatter), 1 comparison/decision TABLE near the top + 1 reference table, 3-4 worked examples, 1-2 inline `<aside>` CTAs, 5-7 inline legislation.gov.uk citations.

1. **`<h2>` AIA and the FA 2026 allowance menu: which allowance, in what order** (intro + decision frame, ~300w). Open on the acronym ("AIA - the Annual Investment Allowance"), state the permanent £1m cap up front (corrected fact), then pivot to the page's job: for a commercial or mixed-use property investor the AIA is now ONE of four routes, and the question that actually matters post-FA-2026 is the allocation order. Forward-link the definitional "what is AIA" intent to `annual-investment-allowance-uk`. Place the decision TABLE immediately after this section.

2. **`<h2>` The four routes at a glance (DECISION TABLE)** (~250w + the table). This is the signature asset (a comparison/"vs"/options page MUST carry a side-by-side table). Plain HTML `<table>`, no pricing.

   **Decision table columns:** Route | Statute | Rate | Who can claim | New/unused only? | Cap | Best when
   **Decision table rows:**
   - 100% Full expensing | CAA 2001 s.45S (F(No.2)A 2023) | 100% in year | Companies only | Yes (new + unused) | No cap | Company, new main-rate plant, want full relief now
   - 50% special-rate FYA (full-expensing companion) | CAA 2001 s.45S framework | 50% year 1, then 6% | Companies only | Yes | No cap | Company, new integral features
   - 40% FYA | FA 2026 s.29 / CAA 2001 s.45U (from 1 Jan 2026) | 40% year 1, then 14% | Any (not incorporation-restricted) | Yes (new + unused) | No cap | Unincorporated landlord/partnership, OR plant for leasing (full expensing unavailable)
   - AIA | CAA 2001 s.51A (£1m permanent from 1 Apr 2023) | 100% in year | Any | No (second-hand OK) | £1,000,000/yr | Second-hand plant, or any business up to £1m
   - Main-pool WDA | CAA 2001 s.56 (14% from Apr 2026, FA 2026 s.28) | 14% reducing balance | Any | n/a | n/a | Spend above the cap / not FYA-eligible
   - Special-rate WDA | CAA 2001 s.104D | 6% reducing balance | Any | n/a | n/a | Integral features above cap / not FYA-eligible

3. **`<h2>` The AIA itself: £1m, permanent, applied to property** (~280w). Correct the headline fact: £1m permanent from 1 April 2023 (s.51A(5) + F(No.2)A 2023 s.8, RA 11 July 2023). 100% write-off in the chargeable period of incurring; spend above the cap rolls into the main pool (14%) or special-rate pool (6%). Period-of-purchase rule. Cross-link group-sharing OUT (one sentence + link to the s.51 group page).

4. **`<h2>` What plant actually qualifies on commercial / mixed-use property** (~300w). The s.21/s.22/s.23 plant-vs-building-vs-structure boundary applied to a commercial fit-out: building shell (s.21 List A, excluded), structures (s.22 List B, excluded), integral features (s.33A special-rate, five categories), main-pool plant (List C). This is the commercial-investor depth gov.uk lacks.

5. **`<h2>` The dwelling-house bar: why standard residential BTL is blocked** (~240w). FIX the reader-misleading error. s.35: no P&M allowances on plant in a let dwelling (heating, solar, security inside a flat/house do NOT qualify - correct the old page's claim explicitly). Carve-out: common parts of a multi-let block (communal boiler/lift/lighting) + integral features in non-dwelling areas of mixed-use. Cross-link the deep "who can claim" treatment to `annual-investment-allowance-landlords-uk` (do not re-own).

6. **`<h2>` The new 40% first-year allowance (FA 2026): the route that changed the decision** (~300w). Enacted law: FA 2026 c.11 s.29 inserted CAA 2001 s.45U (and s.45V anti-avoidance), 40% FYA on new/unused main-rate plant incurred on or after 1 January 2026. NOT incorporation-restricted (do NOT write "unincorporated-only" or "companies cannot claim it" - wrong law). Excludes cars, second-hand/used assets, assets for leasing overseas. Practical framing: it is the route for unincorporated landlords/partnerships and for leasing (because a company normally takes 100% full expensing, which is unavailable for leasing). State as enacted, RA 18 March 2026; re-verify at write time.

7. **`<h2>` Full expensing vs the 40% FYA vs AIA: the allocation order** (~320w). The decision narrative behind the table. For a company with new main-rate plant: full expensing (100%, no cap) usually beats AIA - reserve AIA headroom for second-hand plant and special-rate items, then 40% FYA for leasing plant, then WDA on the remainder. For an unincorporated landlord: no full expensing; the 40% FYA + AIA + WDA stack is the toolkit. Note new/unused gating: full expensing + 40% FYA require new+unused; AIA allows second-hand (cross-link `can-you-claim-aia-on-second-hand-assets`).

8. **`<h2>` The FA 2026 WDA cut and what it means for spend above the cap** (~240w + REFERENCE TABLE). Main-pool WDA 18% → 14% (FA 2026 s.28 into CAA 2001 s.56(1)), chargeable periods beginning on/after 1 April 2026 (CT) / 6 April 2026 (IT); straddling periods use a hybrid time-apportioned rate (s.28(2)-(6)). Special rate UNCHANGED at 6% (s.104D - any "falls to 4%" claim is false). This is where the genuine bring-forward urgency lives (the slower WDA makes front-loaded reliefs more valuable), NOT an AIA cliff.

   **Reference table (rates/thresholds - aids scanning):** columns Pool / route | Rate | Statute | Effective from
   Rows: AIA | £1,000,000 (100% in year) | CAA 2001 s.51A(5) | permanent, 1 Apr 2023 · 40% FYA | 40% year 1 | FA 2026 s.29 / s.45U | 1 Jan 2026 · Full expensing | 100% | CAA 2001 s.45S | 1 Apr 2023 (companies) · Main-pool WDA | 14% | CAA 2001 s.56 (FA 2026 s.28) | 1 Apr 2026 CT / 6 Apr 2026 IT · Special-rate WDA | 6% | CAA 2001 s.104D | unchanged · SBA | 3% | CAA 2001 s.270AA | 1 Apr/6 Apr 2020.

9. **`<h2>` Worked example 1: a company fitting out a commercial unit** (~260w). New main-rate plant within the year. Show full expensing taking the main-rate plant (100%), AIA reserved for second-hand items, integral features to special-rate (50% FYA companion or 6% WDA), remainder to WDA at 14%. Tax-saving arithmetic at CT (relief calculation, not a fee).

10. **`<h2>` Worked example 2: an unincorporated landlord with a mixed-use building** (~260w). No full expensing available. 40% FYA on new main-rate plant in the commercial/non-dwelling portion, AIA for second-hand, s.35 blocks plant in the residential flats above - only common parts + non-dwelling integral features qualify. Shows the s.35 boundary in numbers.

11. **`<h2>` Worked example 3: short accounting period + the £1m pro-rating** (~220w). 9-month period → 9/12 × £1m = £750,000 AIA. Serves the page-1 "aia company different accounting periods" query (pos 5). One sentence + cross-link on the related-companies single-AIA rule (s.51E) to the s.51 group page; do NOT reproduce the group-allocation depth.

12. **`<h2>` Buying a commercial property with fixtures: the s.198 election trap** (~260w). DEPTH the diagnosis flagged as missing (§25.7/§25.11). On a commercial purchase the buyer's fixtures claim needs: the past owner to have pooled (s.187B - non-pooled fixtures permanently stranded), a joint s.198 election (or tribunal determination), made within the **2-year limit** (s.201(1)). Without it, s.187A treats the buyer's fixtures expenditure as nil. This is the operationally material commercial-investor point no sibling carries.

13. **`<h2>` How to claim, and getting the allocation right** (~200w + 1 inline `<aside>` CTA). Claim mechanics (capital allowances computation in the return; choose which allowance where an item qualifies for more than one). Close on the allocation-order discipline + a soft handoff CTA (no pricing).

**FAQ plan (frontmatter `faqs:`, 12-14, each a verbatim query):** What is the AIA allowance / aia allowance? · What is the current AIA limit (£1m permanent - corrects the old FAQ)? · Did the AIA revert to £200,000 in March 2026 (NO - permanent, kills the stale FAQ head-on)? · Can you claim AIA on a rental property (s.35 - corrects the old FAQ #2)? · Can you claim capital allowances on investment property in the UK? · What is the difference between AIA and full expensing? · What is the new 40% first-year allowance (FA 2026)? · Can companies claim the 40% FYA (yes - not incorporation-restricted)? · How does the AIA work with different accounting periods (pro-rating + s.51E)? · What is the AIA limit for a short accounting period? · Does AIA apply to second-hand assets (yes - unlike full expensing/40% FYA; cross-link)? · What capital allowance should a property company claim first (the allocation order)? · What is the writing-down allowance rate now (14% main / 6% special, FA 2026)? · Does AIA apply to cars (no - excluded)?

---

## Statute spine (every section with its Act - VERIFIED at legislation.gov.uk 2026-06-02)

| Statute citation | What it anchors in the rewrite | Verify status (brief time) |
|---|---|---|
| CAA 2001 s.51A(5) | "The maximum allowance is £1,000,000" - the permanent AIA cap | VERIFIED 2026-06-02: reads £1,000,000; annotation "substituted ... by Finance (No. 2) Act 2023 ... s. 8(2)(a)", effective 11 July 2023. https://www.legislation.gov.uk/ukpga/2001/2/section/51A |
| Finance (No. 2) Act 2023 (c.30) s.8 | Made the £1m cap PERMANENT (substituted s.51A(5)); RA 11 July 2023 - the load-bearing correction | VERIFIED 2026-06-02 (via s.51A annotation). Re-confirm RA at write time. |
| CAA 2001 s.45S | Full expensing - company-only, 100% main-rate FYA, new+unused, from 1 Apr 2023 | Verify live: https://www.legislation.gov.uk/ukpga/2001/2/section/45S |
| Finance (No. 2) Act 2023 (insertion of s.45S) | Full expensing enacted + permanent (no sunset) | Verify (F(No.2)A 2023) |
| **FA 2026 (c.11) s.29** | Inserts CAA 2001 s.45U + s.45V; sets the **40% rate** via s.29(5) amending CAA 2001 s.52; from 1 Jan 2026 | VERIFIED 2026-06-02: s.29(5) "Expenditure qualifying under section 45U ... 40%"; s.29(3) inserts ss.45U, 45V. https://www.legislation.gov.uk/ukpga/2026/11/section/29 |
| **CAA 2001 s.45U** | 40% FYA qualifying conditions: new + unused, incurred on/after 1 Jan 2026; **no incorporation test** | VERIFIED 2026-06-02: annotation "Ss. 45U, 45V inserted (18.3.2026) by Finance Act 2026 (c. 11), s. 29(3)"; date "on or after 1 January 2026"; no company/unincorporated restriction. https://www.legislation.gov.uk/ukpga/2001/2/section/45U |
| **CAA 2001 s.56(1)** | Main-pool WDA now **14%** (cut from 18%) | VERIFIED 2026-06-02: reads "14% of the amount by which AQE exceeds TDR"; annotation "substituted (with effect in accordance with s. 28(2)-(6)) by Finance Act 2026 (c. 11), s. 28(1)". https://www.legislation.gov.uk/ukpga/2001/2/section/56 |
| **FA 2026 (c.11) s.28** | Substitutes 14% into s.56(1); effective chargeable periods beginning on/after 1 Apr 2026 (CT) / 6 Apr 2026 (IT); straddling periods hybrid-apportioned (s.28(2)-(6)) | VERIFIED 2026-06-02 (via s.56 annotation). |
| CAA 2001 s.104D | Special-rate pool WDA 6%, UNCHANGED | Verify live: https://www.legislation.gov.uk/ukpga/2001/2/section/104D |
| CAA 2001 s.35 | Dwelling-house restriction: "expenditure is not qualifying ... if it is incurred in providing plant or machinery for use in a dwelling-house" | VERIFIED 2026-06-02 (verbatim). https://www.legislation.gov.uk/ukpga/2001/2/section/35 |
| CAA 2001 s.21 / s.22 / s.23 | Buildings (List A) / structures (List B) excluded; List C carve-back restores plant-like items | Verify: .../section/21, /22, /23 |
| CAA 2001 s.33A | Integral features (electrical, cold water, heating/ventilation, lifts, external solar shading) - special-rate 6%, AIA-eligible | Verify: .../section/33A |
| CAA 2001 s.51B / s.51E / s.51F / s.51G | Single AIA per company; related-companies single AIA; control; "related" test - the group-share rule (cross-link, not deep) | Verify: .../section/51B etc. |
| CAA 2001 s.15 | Qualifying-activity gateway (UK/overseas property business, trade); FHL (c)/(da) omitted from 1 Apr/6 Apr 2025 | Verify: .../section/15 |
| CAA 2001 s.187A / s.187B / s.198 / s.201 | Commercial-purchase fixtures: fixed-value (s.187A), pooling gate (s.187B), apportionment election (s.198), 2-year limit (s.201(1)) | Verify: .../section/187A, /187B, /198, /201 |
| FA 2025 Sch 5 (c.8) | FHL abolition - 1 Apr 2025 (CT) / 6 Apr 2025 (IT); grandfathered pools continue. NOT FA 2024 Sch 5. | Verify (FA 2025 Sch 5) |
| FA 2026 (c.11) ss.6-7 (RA 18 Mar 2026) | (Only if April-2027 rate context is touched) property income 22/42/47, England + NI; s.24 reducer to 22%. State as enacted; re-verify RA. | Verify (FA 2026 c.11) |

**Authority / cross-reference URLs (link in body, verify 200 at execution):**
- https://www.gov.uk/capital-allowances/annual-investment-allowance (live, correct £1m-permanent-from-1-April-2023; user-facing authority cross-link)
- https://www.gov.uk/capital-allowances (allowance-menu overview)
- https://www.legislation.gov.uk/ukpga/2001/2/section/51A (primary AIA cite)
- https://www.legislation.gov.uk/ukpga/2026/11/section/29 (40% FYA enacting section)
- **STRIP** the dead `http://aka.hmrc.gov.uk/...` source, the `nature.com` British Dental Journal hallucination, and the `bankofengland.co.uk` GDP filler entirely. Keep `gov.uk`; verify `icaew.com` 200 and keep if live.

---

## Competitor depth benchmark (Stage 2 - VERIFY LIVE at execution per §16.31)

| Dimension | cpatax.co.uk (commercial-property AIA guide) | rck.partners (AIA + fixtures + full expensing) | gov.uk / GOV.UK measure page | THIS rewrite target |
|---|---|---|---|---|
| Word count | ~1,200 | ~1,200 | ~600-900 (generic) | ~3,200 |
| 2026 changes (40% FYA / WDA 14%) | None | None | Measure page only (still "Finance Bill 2025-26") | Full, stated as ENACTED FA 2026 (c.11) |
| Allocation/decision table (which allowance, in what order) | None | None | None | Lead asset - the differentiator no one has |
| Worked example | £400k commercial example | £750k commercial example | 1 (pro-rating) | 3-4 (company fit-out; unincorporated mixed-use; short-period pro-rating) |
| s.35 dwelling-house treatment | None | Partial | None | Corrected + cross-linked |
| s.198 fixtures election + 2-year limit | None | Mentions fixtures | None | Full (s.187B pooling gate + s.201 deadline) |
| Statute section numbers | Sparse | Sparse | None | Full CAA 2001 + FA 2026 spine (15+ cites) |
| FAQs / FAQ schema | None | None | None | 12-14, each a verbatim query, FAQPage schema |

**Decisive-best-in-class, not catch-up:** no competitor combines the post-FA-2026 allocation/decision table + a full CAA + FA 2026 statute spine + corrected s.35 treatment + the s.198 commercial-fixtures trap + 3-4 worked allocation examples + 12-14 query-matched FAQs. The two specialist competitors are stuck two generations back (no 40% FYA, no WDA cut); gov.uk gives no property application and no allocation guidance.

---

## Internal-link targets within the live corpus (Stage 2)

Cross-link OUT per the distinctness plan (differentiate, do not duplicate):

- **Definitional / head-term (link OUT):** `annual-investment-allowance-uk` - for "what is AIA" + generic "annual investment allowance" intent. Place in the intro.
- **s.35 / who-can-claim (link OUT):** `annual-investment-allowance-landlords-uk` - from the dwelling-house section for the deep "who can claim" treatment.
- **Group-sharing (link OUT):** `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` - from the AIA + short-period sections for s.51B-N association-rules depth.
- **Second-hand assets (link OUT):** `can-you-claim-aia-on-second-hand-assets` - from the allocation-order section (AIA allows second-hand; full expensing + 40% FYA do not).
- **Wave 6 pillar (link UP):** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` - the master forward-link for the full CAA framework.
- **Full expensing sibling:** `full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` - from the allocation table / full-expensing section.
- **Commercial fixtures / s.198:** `capital-allowances-commercial-property-what-can-claim` (and any s.198-fixtures-election sibling) - from the s.198 section.
- **HMO common-parts s.35 carve-out:** `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` - from the dwelling-house carve-out.
- **FHL transitional:** `fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` - from the FHL mention (correct the bare "abolished from April 2025" line).
- **BTL ltd-co guide:** `buy-to-let-limited-company-complete-guide-uk` - from the company-structure context (full expensing is company-only).

(Survey actual link presence + add reciprocal links at execution; flag, do not edit, the Wave 6 pages.)

---

## House-position references (Stage 1)

- **§38 Capital allowances - FA 2026 reform floor** [LOCKED 2026-05-30] - the primary spine. Main-pool WDA 14% (s.28/s.56); special-rate 6% unchanged (s.104D); 40% FYA (s.29/s.45U, from 1 Jan 2026, NOT incorporation-restricted); AIA £1m permanent (s.51A(5) / F(No.2)A 2023 s.8); full expensing company-only (s.45S); s.35 dwelling-house bar; cars excluded from AIA + 40% FYA. FA 2026 (c.11) RA 18 March 2026 - state as enacted, never "Finance Bill". Do-not-write list applies verbatim.
- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23] - £1m permanent (s.51A(5)); single AIA per company (s.51B); related-companies single AIA (s.51E + s.51F control + s.51G shared-premises/similar-activities test); allocation (s.51K); cars excluded; AIA blocked by s.35 for dwelling-house plant.
- **§25.2 Plant and machinery + s.35 dwelling-house restriction** [LOCKED 2026-05-23] - s.21/s.22/s.23 plant-vs-building boundary; s.33A integral features (special-rate 6%); the load-bearing s.35 dwelling-house exclusion (plant in a let dwelling barred; common-parts carve-out).
- **§25.7 FHL transitional (FA 2025 Sch 5)** [LOCKED 2026-05-23] - FHL abolition 1 Apr 2025 (CT) / 6 Apr 2025 (IT); grandfathered pools continue to be written down; no new FHL P&M qualifying. FA 2025 Sch 5, NOT FA 2024 Sch 5.
- **§25.11 / §25.12 s.198 fixtures election** [LOCKED 2026-05-24] - two-gate test (pooling s.187B + fixed-value s.187A); s.198 joint election; 2-year limit (s.201(1)); s.198 has NO application to residential-only property (s.35). Do-not-write: "s.198 up to 4 years" (it is 2), "buyer claims at market value without election" (treated as nil).
- **§25.5 First-Year Allowances** [LOCKED 2026-05-23] - full expensing s.45S company-only; 50% special-rate companion; EV/Freeport FYAs sunset 31 Mar 2027 (CT) / 5 Apr 2027 (IT).
- **§7 April 2027 property income tax** [LOCKED 2026-05-30 - ENACTED] - only if the page touches the 2027 marginal-rate interaction with an AIA deduction's value: FA 2026 (RA 18 Mar 2026) - 22/42/47, England + NI, from 6 Apr 2027. Keep light; the allocation page is a capital-allowances page, not an income-rate page.
- **§21.5 FIC mechanics (FIC-side AIA availability)** [LOCKED, Wave 4] - FIC owning commercial property → AIA available; pure-investment FIC owning residential BTL → blocked by s.35. Cross-reference in the company-structure context.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict 1 - STALE_FACTS (the load-bearing rewrite job).** The published page contradicts §38 + §25.3 + §25.10 directly: it frames the £1m cap as temporary, "confirmed until 31 March 2026 ... expected to revert to £200,000", in FOUR places (frontmatter FAQ #1 + FAQ #4 + the body "AIA Limit" section + the entire H2 "Planning for the AIA Limit Change"). §25.10 expressly lists "AIA is £1m temporarily" and "AIA cap is £200,000" as do-not-write. £1m is permanent from 1 April 2023 (CAA 2001 s.51A(5) / F(No.2)A 2023 s.8, RA 11 July 2023 - verified). First job: remove every temporary/deadline assertion and demolish the "Planning for the AIA Limit Change" H2.

**CONFIRMED conflict 2 - STALE_FACTS (two generations stale on the menu).** No FA 2026 coverage: the 40% FYA (s.29/s.45U, from 1 Jan 2026) and the WDA cut (18% → 14%, s.28/s.56) are absent; "AIA vs full expensing" treats full expensing as the only above-cap route. Per §38, both must be stated as ENACTED law (FA 2026 c.11, RA 18 March 2026), never "Finance Bill" (the GOV.UK measure page still says "Finance Bill 2025-26" - the F-37 inverse-stale trap). Re-verify Royal Assent at write time per §16.T1.

**CONFIRMED conflict 3 - READER-MISLEADING s.35 error.** The "AIA and Residential Property" section + FAQ #2 say installing heating / solar / security in a residential BTL "may qualify". FALSE per §38 + §25.2 do-not-write ("Landlords can claim AIA on furnishings/boilers inside a let dwelling" - barred by s.35). Reframe to the dwelling-house bar + the narrow common-parts / non-dwelling-integral-features carve-out.

**CONFIRMED conflict 4 - HALLUCINATED / BAD CITATIONS.** `sourceDomains` includes `nature.com` (British Dental Journal - fabricated, irrelevant), `aka.hmrc.gov.uk` (dead redirect domain), and `bankofengland.co.uk` (GDP filler). Strip all three; build the legislation.gov.uk spine instead.

**PRICING-LEAK: none (Decision E clean).** No £-fees or fee-comparison language on the page; keep it that way (worked-example tax-saving arithmetic is a relief calculation, not a fee quote).

**Flag to `track2_site_wide_flags.md`** (next available F-number) as: **HIGH | aia-allowance-uk-property-investors | STALE_FACTS | Quadruple "£1m temporary until 31 March 2026 / reverts to £200k" assertion (FAQ#1 + FAQ#4 + body "AIA Limit" + "Planning for the AIA Limit Change" H2) contradicts §38/§25.10; permanent per F(No.2)A 2023 s.8. PLUS zero FA 2026 coverage (40% FYA s.29/s.45U + WDA 14% s.28/s.56). PLUS reader-misleading s.35 residential claim. PLUS hallucinated nature.com + dead aka.hmrc.gov.uk + Bank of England filler sources. FA 2026 RA 18 Mar 2026 - state as enacted, re-verify at write time.** (This corroborates the batch-4 cross-cluster STALE-sweep recommendation across the ~9 legacy AIA duplicates.)

---

## Query-coverage plan

One row per `target_queries[]` item; each assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| aia allowance | gsc | 4 | 24.3 | metaTitle |
| aia capital allowances | gsc | 2 | 24.0 | H1 |
| aia hmrc | gsc | 1 | 27.0 | FAQ "How do I claim AIA with HMRC / on my return?" |
| aia tax | gsc | 1 | 28.0 | H2#1 (AIA and the FA 2026 allowance menu) |
| annual investment allowance | adjacent | 15 | 77.9 | body§ intro (definitional sentence, then link OUT to annual-investment-allowance-uk) |
| annual investment allowance calculator | adjacent | 11 | 67.8 | H2#2 (decision table) + Worked example 3 (answers the "calculator" intent without a JS tool) |
| can you claim capital allowances on investment property | adjacent | 7 | 82.2 | FAQ "Can you claim capital allowances on investment property?" |
| investment allowance | adjacent | 7 | 57.9 | H2#3 (The AIA itself: £1m, permanent, applied to property) |
| capital allowances on investment property in uk | adjacent | 5 | 72.3 | H2#5 (The dwelling-house bar) |
| aia company different accounting periods | adjacent | 2 | 5.0 | H2#11 (Short accounting period + £1m pro-rating) |
| what is annual investment allowance | adjacent | 2 | 47.0 | FAQ "What is the AIA allowance?" |
| annual investment allowance uk | adjacent | 2 | 70.0 | metaDescription |
| aia limit | adjacent | 1 | 62.0 | FAQ "What is the current AIA limit (and did it revert to £200,000)?" |
| are there capital allowances on investment property | adjacent | 1 | 5.0 | H2#4 (What plant actually qualifies on commercial / mixed-use property) |
| how does annual investment allowance work | adjacent | 1 | 7.0 | FAQ "How does the Annual Investment Allowance work?" |

---

## Meta plan

- **metaTitle (≤ 62 chars; lead with the acronym - the page's own equity - plus the allocation hook):**
  - "AIA Allowance UK: Which Capital Allowance to Claim First" (56)
  - "AIA vs Full Expensing vs 40% FYA: Property Allowance Guide" (58)
  - "AIA Allowance: £1m Cap + the FA 2026 Allowance Decision" (55)
  (Lead candidate: option 1 - keeps "AIA allowance" at the front for the pos-24 query and signals the allocation-decision differentiator. Avoid the old generic "Claim £1m on Property Plant & Machinery".)
- **metaDescription (≤ 158 chars; acronym + allocation-decision hook + corrected fact; no pricing):**
  - "AIA, full expensing or the new 40% first-year allowance? A property investor's guide to the £1m permanent cap and which allowance to claim first under FA 2026." (157)
  (Drop the old "buy-to-let" promise that invited the s.35-barred reader; lead with the allocation decision + the corrected permanent-cap fact.)
- **h1:** "AIA Allowance for UK Property Investors: Which Capital Allowance to Claim, and in What Order" - keeps "AIA allowance" + "property investors" at the front (matches the pos-24 own queries) while signalling the repositioned allocation-decision intent.
- **summary (frontmatter):** "The Annual Investment Allowance (AIA) gives a permanent £1 million 100% write-off on qualifying plant and machinery. For commercial and mixed-use property investors it is now one of four routes, alongside full expensing, the new 40% first-year allowance, and writing-down allowances. This guide explains which to claim, in what order, under Finance Act 2026."

---

## Schema plan

- **Reviewer (real reviewer convention in the corpus - anonymised role-title per the lead-gen handoff model, no personal name):**
  - `reviewedBy: "ICAEW Qualified Senior Reviewer"`
  - `reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"`
  - `reviewedAt: "2026-05-30"`
- **howTo:** **false.** This is a decision / comparison + reference page, not a numbered step-by-step procedure. (The "How to claim" section is a short narrative, not a HowTo schema target.)
- **dateModified:** `2026-05-30`
- **JSON-LD blocks emitted:** **Article** (BlogPosting via `buildBlogPostingJsonLd`) + **FAQPage** (auto-emitted from the frontmatter `faqs:` array; do NOT hand-add FAQ schema in body). **No HowTo block** (howTo: false).

---

## Universal rules (do not skip)

(Inherited - see `TRACK2_PROGRAM.md` §4 section 13 pointer block + `docs/competitor_rewrite_playbook.md` §5.) **Critical for this brief:** NO em-dashes anywhere (use commas, parentheses, full stops, middle dots). NO pricing / fees (Decision E - the page is currently clean; keep it clean; worked-example tax-saving arithmetic is a relief calculation, not a fee quote; no "we charge / typical accountant fee" language, including no soft "general-market fee" comparisons). NO real client names; anonymised social proof only (e.g., "a Manchester commercial-unit investor"). LeadForm auto-injected by `BlogPostRenderer.tsx` - never duplicate; 1-2 inline `<aside>` CTAs at conversion moments only. Body is raw HTML (`<p>`, `<h2>`, `<table>`), never markdown `##`. FAQs in frontmatter `faqs:` array only; FAQPage schema auto-emitted; never hand-add FAQ schema in body. NO Tailwind utility classes in markdown body; semantic HTML only. Every statute citation verified against legislation.gov.uk at write time, including the Royal Assent date of FA 2026 (F-37 Bill-vs-enacted discipline).

---

## 19-step workflow (legacy-rewrite adaptation - inherits NETNEW §7 with Track 2 deltas)

1. Read `house_positions.md` §38 + §25.1-§25.3 + §25.5 + §25.7 + §25.11/§25.12 + §7 + §21.5 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution).
3. Read this brief end-to-end.
4. **Verify the statute spine against legislation.gov.uk** - every CAA 2001 section + FA 2026 ss.28/29 + the FA 2026 Royal Assent date (18 March 2026) + F(No.2)A 2023 s.8 RA (11 July 2023). §16.T1 deterministic-floor; F-37 Bill-vs-enacted discipline. Load-bearing pre-rewrite step. (Brief-time WebFetch already confirmed s.51A=£1m, s.56=14%, s.45U inserted 18.3.2026 with 40% rate via s.29(5), s.35 verbatim - re-confirm at write.)
5. Re-fetch the competitor + authority URLs; reject non-200; STRIP the dead `aka.hmrc.gov.uk`, the `nature.com` hallucination, and the `bankofengland.co.uk` filler.
6. Read the current `aia-allowance-uk-property-investors.md` source in full.
7. Read the four siblings (annual-investment-allowance-uk, annual-investment-allowance-landlords-uk, the s.51 group page, can-you-claim-aia-on-second-hand-assets) to differentiate AWAY, not duplicate.
8. Plan outline: 12-13 H2s, ~3,200 body words, 12-14 FAQs, the decision table + a reference table near the top, 3-4 worked examples.
9. **Rewrite markdown at existing path** (NOT new file). Keep slug + canonical + category + image. Update `dateModified` to 2026-05-30 + `sourcesVerifiedAt` to write date; update `sourceDomains` (remove aka.hmrc.gov.uk + nature.com + bankofengland.co.uk; add legislation.gov.uk). Rewrite metaTitle + metaDescription + h1 + summary per the Meta plan. Rewrite frontmatter FAQs #1 + #4 (stale) + #2 (s.35 error).
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62; meta description ≤ 158; all internal links resolve. Plus: grep "31 March 2026" → 0; grep "£200,000" / "200,000" → 0 stale-cliff matches; grep "Finance Bill" → 0; grep "aka.hmrc" / "nature.com" → 0; grep for £-fee patterns → 0.
12. Confirm no redirect for THIS page (none - slug kept). Do NOT 301 any sibling here (deferred collapse workstream; collapse runs weaker → stronger only after the collapse guard clears).
13. Update / insert `monitored_pages` Supabase row: 180-day window from write date (INVISIBLE/low-equity baseline - pos 24-28 reads artificially low; needs the longer window per F-11).
14. Commit on `main`: `git commit -m "Track 2A: rewrite aia-allowance-uk-property-investors (STALE £1m-permanent + FA 2026 40% FYA/WDA fix + reposition to commercial allocation decision)"`.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the STALE_FACTS flag + reinforce the cluster STALE-sweep recommendation.
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session - empty template)

### House-position alignment
- §38 / §25.3 AIA £1m permanent (s.51A(5) + F(No.2)A 2023 s.8): __
- §38 40% FYA (FA 2026 s.29 / CAA 2001 s.45U, from 1 Jan 2026, not incorporation-restricted): __
- §38 main-pool WDA 14% (FA 2026 s.28 / s.56); special-rate 6% (s.104D) unchanged: __
- §38 / §25.5 full expensing company-only (s.45S): __
- §25.2 / s.35 dwelling-house bar surfaced + residential error corrected: __
- §25.11 s.198 fixtures election (pooling s.187B + 2-year s.201 limit): __
- §7 April 2027 - enacted status re-verified at write (FA 2026 RA 18 Mar 2026), kept light: __
- §25.10 do-not-write scan (no "temporary" / "£200k" / "cars qualify" / "individual full expensing" / "WDA 18%" / "special rate 4%"): __

### Comparison: before vs after
- Word count: 1,641 → __ (target ~3,200)
- H2 count: ~8 → __ (target 12-13)
- FAQ count: 4 → __ (target 12-14)
- Authority links: 5 sourceDomains (2 hallucinated/dead, 1 filler) → __ (target 4-5, all 200, with legislation.gov.uk)
- Statute citations: 0 → __ (target 15+)
- Worked examples: ~1 → __ (target 3-4)
- Comparison/decision table: 0 → 1; reference (rates) table: 0 → 1
- Inline CTAs: 0 → __ (target 1-2)
- Stale "31 March 2026 / £200,000" assertions: 4 → 0
- s.35 residential error: present → corrected
- Hallucinated/dead/filler sources: 3 → 0

### Visibility-lift hypothesis test
- Pre-rewrite GSC baseline: own acronym head terms pos 24-28 (8 impr, 0 clicks); 0 Bing.
- Post-rewrite target: own acronym terms toward page 1-2; capture the page-1 adjacent intents ("aia company different accounting periods" pos 5, "how does annual investment allowance work" pos 7) via the allocation + pro-rating sections; first non-zero clicks. Verify at +30 / +60 / +90 / +180 days via monitored_pages detector (180-day window).

### Flags raised
- STALE_FACTS (carried from brief): __ resolved
- Cluster STALE-sweep recommendation reinforced: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
