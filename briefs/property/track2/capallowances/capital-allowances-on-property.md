# Track 2 brief: capital-allowances-on-property

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (Track 2 batch 4, capital-allowances cluster)
**Source markdown path:** `Property/web/content/blog/capital-allowances-on-property.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/capital-allowances-on-property
**Stage 1 priority:** M (low-volume but real signal: 15 Google impressions across 9 indexed queries, pos 48-91; the load-bearing reason to rewrite is STALE_FACTS correctness + hub-routing, not raw click volume)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (house positions §25 + §38 read in full; current source markdown read; sibling slugs verified on disk; competitor targets carried from diagnosis pending live re-fetch at execution)
**Cannibalisation status:** REWRITE (collapse into the brand-new pillar was DIAGNOSED then DROPPED — see §"Cannibalisation universe check"; reversed-equity 301 blocked by `scripts/track2_collapse_guard.py` R6 and recorded as dropped in house_positions §38)

> This brief is drafted to the depth of the gold-reference `cgt-rates-property-2026-27-current-rates-explained.md`. The load-bearing difference vs that brief: this page's dominant gap mode is **STALE_FACTS** (six concrete wrong/stale facts the FA 2026 reform floor invalidated), not CTR-fail. The rewrite is primarily a correctness + repositioning job: turn a thin, partly-wrong "complete guide" into the accurate **hub answer** that routes to the cluster's deep-dive mechanics pages.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `capital-allowances-on-property`. It is the broad consumer-intent gateway phrase ("capital allowances on property") and the page is already indexed against that exact query family. Do NOT redirect — see cannibalisation block.
- **Category:** `property-types-and-specialist-tax` (kept; matches canonical and the cluster siblings).
- **Gap-mode tag:** `STALE_FACTS` (primary) + `THIN_DEPTH` (secondary, 2,043 words vs ~3,400 target and no worked examples) + `STRUCTURE` (tertiary: duplicate `id` attributes, empty `<h2>Frequently Asked Questions</h2>` placeholder, only 4 FAQs, only 2 authority sources) + `INVISIBLE`/`CTR_FAIL` (quaternary: pos 48-91 = effectively unranked; depth + correctness is the prerequisite to any ranking lift, so treat visibility as a downstream consequence not a meta-rewrite target).
- **"Why this rewrite" angle:** This is the broad-intent **hub** page for capital allowances on property. After the FA 2026 reform floor (house_positions §38, locked 2026-05-30), the live page now carries six materially wrong or stale statements (AIA framed as temporary; residential bar mis-anchored to a "2016 HMRC view" instead of CAA 2001 s.35; 40% FYA thin/uncited; FHL abolition not mentioned at all; SBA cited only to ICAEW; duplicate HTML ids). A page that misstates current law on a high-consideration topic is a credibility liability for a lead-gen handoff site, regardless of traffic. The rewrite (a) corrects every stale fact against legislation.gov.uk, (b) lifts to ~3,400 words with worked examples and 12-14 FAQs, and (c) **repositions the page as the routing hub** that links OUT to the canonical deep-dives (AIA, WDA rates, SBA, full-expensing/40% FYA, integral features, fixtures s.198) rather than re-deriving their detail. It must stay distinct from the four-axis decision-framework pillar.

---

## Current page snapshot (Stage 2 — filesystem read 2026-05-30)

- **Source markdown path:** `Property/web/content/blog/capital-allowances-on-property.md`
- **Current word count:** 2,043 (diagnosis figure; body is ~13 H2 sections of mostly short prose, no worked examples beyond the single £1m SBA illustration and the £10k WDA reducing-balance illustration)
- **Current H2 outline (13):**
  1. What Are Capital Allowances on Property? (gateway; links to capital-vs-revenue guide)
  2. Residential Property: Limited Scope for Capital Allowances (mis-anchored "Since 2016, HMRC has taken the view")
  3. Commercial Property: Full Capital Allowances Available (P&M list + integral features mention)
  4. Structures and Buildings Allowance (SBA) (3%/33y4m; cited only to ICAEW [ref-2])
  5. Annual Investment Allowance (AIA) (£1m — but framed as **temporary** "until at least 31 March 2026")
  6. Full Expensing and First-Year Allowances (40% FYA thin + uncited; s.45S not named)
  7. Writing-Down Allowances: Main Pool and Special Rate Pool (14%/6% — CORRECT, keep)
  8. How to Claim Capital Allowances on Property (two-year deadline)
  9. Capital Allowances and Property Sales (balancing charge; pool transfer)
  10. Common Mistakes and Pitfalls
  11. Capital Allowances for Limited Companies (full expensing company-only — correct)
  12. Capital Allowances and Making Tax Digital (MTD) (£50k April 2026 — correct)
  13. When to Get Professional Advice
  + empty `<h2>Frequently Asked Questions</h2>` placeholder (FAQs render from frontmatter via schema — this empty body heading is dead structure, remove or repurpose)
- **Current metaTitle:** "Capital Allowances on Property: A Complete Guide for UK" (truncated/awkward — ends mid-phrase "for UK"; 53 chars but reads as cut off)
- **Current metaDescription:** "Learn how capital allowances on property work for UK landlords. Discover what qualifies, how to claim, and key rules for residential and commercial" (147 chars; truncated mid-phrase, no differentiator/number hook)
- **Current h1:** "Capital Allowances on Property: A Complete Guide for UK Landlords"
- **Current FAQs (frontmatter count):** 4 (target 12-14). FAQ #1 carries the mis-anchored "Since 2016, HMRC restricts" framing; FAQ #3 asserts the two-year claim deadline; FAQ #4 covers LtdCo full expensing + 50% FYA + the residential restriction.
- **Current outbound authority links:** 2 only (`ref-1` gov.uk/capital-allowances overview; `ref-2` icaew.com capital allowances). No legislation.gov.uk citations at all.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` array).
- **Last meaningful edit date:** `dateModified: 2026-05-20`; `sourcesVerifiedAt: 2026-05-20` (pre-dates the §38 FA 2026 lock of 2026-05-30 — the page was last verified before the reform floor was locked).
- **HTML hygiene defect:** duplicate `id` attributes — `id="cite-1"` appears on multiple `<sup><a>` citation anchors (lines 37, 43, 49, 74, 80, 82, 121, 125 etc.), and `id="cite-2"` is likewise repeated. Duplicate ids are invalid HTML and break in-page anchor jumps. Clean at rewrite (each citation anchor needs a unique id, or switch to a single numbered-source pattern matching the gold-reference rendering).

---

## GSC angle (last 90 days)

**From diagnosis payload (verify with a fresh `python -m optimisation_engine.track2.pull_page_data --slug capital-allowances-on-property` at execution):**

- **Aggregate:** 15 Google impressions across 9 indexed queries, average position band **48-91** (page 5-9). Effectively **INVISIBLE** on Google for the head term.
- **Bing/cross-engine:** the diagnosis records the brand-new pillar at 0 Google + 0 Bing; this page is the one with the (small) measurable equity. Per memory `bing_webmaster_data.md`, legacy capital-allowance pages sometimes rank page-1 on Bing while page 4-8 on Google — at execution, pull `bing_query_data` for this slug to see whether Bing visibility justifies a snippet-bait table near the top.
- **Read:** there is no CTR-fail lever here (you cannot fail CTR at position 48-91 — nothing is being seen). The diagnosis correctly orders the gap modes: **fix the facts and deepen first** (STALE_FACTS + THIN_DEPTH), which is the prerequisite for any future ranking; meta optimisation is a secondary downstream step, not the load-bearing fix.
- **GA4:** pull `ga4_page_data` for this slug at execution; expect near-zero sessions consistent with the impression volume. Do not gate the rewrite on GA4 — this is a correctness rewrite.

**Strategic conclusion:** REWRITE as a correctness-and-depth job, positioned as the cluster hub. Realistic post-rewrite target: move off page 5-9 onto page 1-3 for the broad "capital allowances on property" family over 90-180 days, on the strength of accurate FA-2026-current content + internal-link authority flowing in from the deep-dive siblings. Set the monitored_pages window to **180 days** (INVISIBLE-baseline page per the F-11 long-window rule).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: STALE_FACTS.** The FA 2026 reform floor (house_positions §38, locked 2026-05-30, manager-source-verified at legislation.gov.uk) invalidated several statements on the live page. Six concrete corrections are load-bearing (see the statute-spine and conflict-flag sections for the exact fixes):

1. **AIA framed as temporary.** Live line 77: "The £1 million AIA limit is temporary ... currently set at £1 million until at least 31 March 2026. Check current limits." This is STALE. AIA £1m is **permanent**: CAA 2001 s.51A(5) made permanent by **F(No.2)A 2023 (c.30) s.8** (RA 11 July 2023) from 1 April 2023 (§38, §25.8). Strip the "temporary/reverts/check current limits" framing entirely.
2. **Residential bar mis-anchored.** Live line 42: "Since 2016, HMRC has taken the view that residential property is not a qualifying activity." This is a loose HMRC-view framing of a statutory rule. Re-anchor to the **CAA 2001 s.35 dwelling-house bar** (§38, §25.7), with the carve-out being **common parts** of a multi-dwelling building (communal boiler/lift/lighting) and integral features in qualifying non-dwelling areas. Drop the "2016/HMRC view" date framing; cite s.35.
3. **40% FYA thin + uncited.** Live lines 82, 121: bare "From 1 January 2026, a 40% first-year allowance is available ... applies to both companies and unincorporated businesses." Must cite **FA 2026 s.29**, state new-and-unused **main-rate** plant and machinery, expenditure **on or after 1 January 2026**, **excludes cars, second-hand/used assets, and assets for leasing overseas**, and flag it as the **unincorporated route** distinct from company-only full expensing (s.45S). (§38, §25.5.)
4. **FHL not mentioned at all.** The page is silent on furnished holiday lets despite being directly material to "residential" capital allowances. Add the **FA 2025 (c.8) Sch 5** abolition (6 Apr 2025 IT / 1 Apr 2025 CT): no new FHL P&M qualifies; **grandfathered pools continue to be written down** in the ordinary property business under the s.35 regime (§38, §25.7, §6).
5. **SBA cited only to ICAEW.** Live §"SBA" cites `ref-2` (icaew.com) only. Re-anchor to **CAA 2001 Part 2A / s.270AA**, add the **29 October 2018** construction-date gate, the **allowance-statement requirement** (s.270IA(2): no statement = expenditure treated as nil, including for a successor owner), and the **no-balancing-event-on-disposal + TCGA 1992 s.37B add-back** to CGT base cost (§25.4). Also surface the **residential exclusion at s.270CF** (not s.270BG, which is the land-acquisition exclusion).
6. **WDA 14%/6% is CORRECT — keep.** Live lines 76, 89-92 already state main pool 14% (from April 2026, was 18%) and special rate 6%. This matches §38. **Keep, but add the citation** (FA 2026 **s.28** substitutes 14% into CAA 2001 s.56(1)) and add the **hybrid time-apportioned rate** for chargeable periods straddling the 1 Apr 2026 / 6 Apr 2026 start date (FA 2026 s.28(2)-(6)).

**Secondary: THIN_DEPTH.** 2,043 words, zero numerical worked examples that a reader can follow end-to-end (the £1m SBA line and the £10k WDA line are illustrations, not full examples). Competitor depth ceiling for this query class is ~2,500-4,500 words with claim-process detail. Target ~3,400 words with 3-4 worked examples (commercial fixtures AIA claim; residential common-parts vs in-dwelling bar; 40% FYA on a sole-trader commercial unit; WDA straddling-period hybrid rate).

**Tertiary: STRUCTURE.** Duplicate `id="cite-1"`/`id="cite-2"` (invalid HTML); empty `<h2>Frequently Asked Questions</h2>` body placeholder; only 4 FAQs; only 2 authority sources (no legislation.gov.uk). Fix all at rewrite.

**Quaternary: INVISIBLE / CTR_FAIL.** Position 48-91 means the page is not seen. This is downstream of the above — accurate, deep, well-linked content is the route back onto page 1-3, not a meta tweak. Do the meta rewrite (the current one is literally truncated mid-phrase) but treat it as hygiene, not the load-bearing lever.

**Load-bearing fix sequence (ordered by ROI):**

1. **Correct the six stale/wrong facts** against legislation.gov.uk (this is the whole point of the rewrite).
2. **Reposition as the hub:** add a short "where to go next" routing logic so the page answers the broad question, then links OUT to the canonical deep-dives instead of re-deriving them. Keep the page broad-gateway in altitude; do not duplicate the pillar's four-axis architecture or the siblings' mechanics.
3. **Add FHL section** (currently absent; directly material to the residential framing).
4. **Add 3-4 worked examples** + lift to ~3,400 words.
5. **FAQ count 4 → 12-14**, each correcting a stale belief or answering a specific sub-question (residential bar, AIA permanence, 40% FYA vs full expensing, SBA allowance statement, balancing charge on sale, FHL grandfathered pools, two-year claim window).
6. **Authority links: re-anchor to legislation.gov.uk** (s.35, s.51A, s.56, s.33A, Part 2A/s.270AA, s.270IA, s.270CF, s.45S, FA 2026 s.28, FA 2026 s.29, FA 2025 Sch 5, TCGA s.37B) + keep gov.uk overview + HMRC CA manual anchors.
7. **HTML hygiene:** unique citation ids; remove the dead empty FAQ heading.
8. **Meta rewrite** (hygiene): the current title/description are truncated mid-phrase — fix to clean, full, differentiated copy.

---

## Competitor URLs (Stage 2 — carried from diagnosis; RE-FETCH + status-check at execution per §16.31)

| URL | Re-fetch status (execution) | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.ukpropertyaccountants.co.uk/complete-guide-on-capital-allowances-for-property-business/ | __ verify 200 | Comprehensive structure + property-business framing; claim-process clarity | Likely pre-FA-2026 (WDA 18% / AIA-temporary framing). Our differentiator: FA-2026-current 14% WDA + 40% FYA s.29 + AIA permanent. |
| https://taxeezy.co.uk/resources/tax-guides/capital-allowances-for-landlords-letting-out-uk-property/ | __ verify 200 | Landlord-specific residential-vs-commercial gateway angle (matches our consumer intent) | Check FHL handling (likely stale pre-abolition); we add FA 2025 Sch 5 + s.35 anchor. |
| https://www.rossmartin.co.uk/property-income/810-capital-expenditure-allowances | __ verify 200 (may be paywalled/subscriber) | Authoritative practitioner depth; statute anchoring style | If gated, do not cite; use only as depth benchmark. |
| https://www.eddisons.com/insights/a-guide-to-capital-allowances-for-commercial-property | __ verify 200 | Commercial-property surveyor angle (fixtures/embedded P&M survey framing) | Commercial-only; our page is the residential-and-commercial gateway. We add the residential s.35 bar + common-parts carve-out they omit. |

**Competitor depth ceiling for this query class:** ~2,500-4,500 words, generally 0-4 FAQs, mostly pre-FA-2026 rate framing (the reform floor is recent — 18 March 2026 RA), light on the s.270IA allowance-statement trap and the s.37B SBA add-back. Our ~3,400-word target with 12-14 FAQs + FA-2026-current rates + the s.270IA/s.37B nuances + the FHL transitional puts us decisively best-in-class on **currency and correctness**, not just length.

**What to borrow:** ukpropertyaccountants' property-business structure + eddisons' fixtures-survey framing for the commercial section.
**What to differentiate against:** every competitor is likely to carry at least one of the six stale facts we are correcting. Our distinctiveness is "current as of FA 2026, RA 18 March 2026" + the hub-routing to deeper siblings.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refresh-read at execution). Cluster scan (per diagnosis) found ~20 capital-allowance pages. **Collapse-direction check (mandatory) was run and the collapse was DROPPED.**

| Source | Slug | Status / overlap | Resolution |
|---|---|---|---|
| Residual (own) | capital-allowances-on-property | self — broad consumer-intent gateway ("capital allowances on property") | **REWRITE in place.** |
| Cluster (brand-new pillar) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | Intent-overlap candidate; four-axis who/what/spend/vehicle decision framework | **COLLAPSE DROPPED.** This page = 15 Google impressions / 9 queries (pos 48-91); the pillar = **0 Google + 0 Bing impressions, 0 queries** (live only days). Collapsing this indexed page into the zero-equity pillar is a **reversed-equity 301** that `scripts/track2_collapse_guard.py` R6 hardening blocks, and house_positions §38 records this exact collapse as diagnosed-then-dropped. **Distinctness:** this page = broad gateway answer (residential-vs-commercial, general landlord audience); the pillar = the four-axis decision architecture. If anything, the zero-equity pillar should LATER 301 into this page, not the reverse. Reciprocal forward-link only. |
| Cluster (AIA siblings) | annual-investment-allowance-uk, annual-investment-allowance-landlords-uk, aia-allowance-uk-property-investors, capital-allowance-aia-property-landlords, what-is-aia-in-tax, aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 | AIA mechanics depth | No collision. This page mentions AIA briefly (permanent £1m, commercial-only via s.35) and **links OUT** to the AIA siblings as the canonical deep-dives. Do NOT re-derive AIA allocation/association rules. |
| Cluster (WDA siblings) | writing-down-allowance-rates, writing-down-allowance-cars | WDA-rate depth | No collision. Mention 14%/6% + straddling hybrid briefly; **link OUT** to writing-down-allowance-rates for the rate detail and writing-down-allowance-cars for the car-emissions pooling. |
| Cluster (SBA sibling) | structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward | SBA claim-mechanics depth | No collision. Give the SBA gateway (3%, 29 Oct 2018 gate, allowance statement, s.37B add-back) then **link OUT** to the SBA mechanics page. Do NOT re-derive the full s.270 sub-section walk. |
| Cluster (full-expensing / FYA siblings) | full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023, full-expensing-capital-allowances | Company full-expensing + 50% special-rate FYA mechanics | No collision. Distinguish company-only full expensing (s.45S) from the unincorporated 40% FYA (FA 2026 s.29) clearly, then **link OUT** for the SPV mechanics. |
| Cluster (integral features) | integral-features-capital-allowances | s.33A five-category depth | No collision. Name integral features (special-rate pool, s.33A) and **link OUT**. |
| Cluster (commercial what-can-claim) | capital-allowances-commercial-property-what-can-claim | Commercial P&M list depth | No collision; **link OUT** from the commercial section. |
| Cluster (fixtures election) | (s.198 fixtures election — confirm live slug at execution; §25.2/§25.11) | Buyer-side s.198 election on sale of qualifying interest | No collision. Touch the pooling-requirement (s.187B) + s.198 election at the "property sales" section and **link OUT** to the fixtures page. |
| Cluster (HMO/common-parts) | (hmo + common-parts siblings — confirm live slugs at execution) | Common-parts carve-out depth | No collision; reference the common-parts carve-out and **link OUT** if a live sibling exists. |
| Adjacent (gateway) | capital-vs-revenue-expenditure-landlord-uk | The revenue-vs-capital line (the gateway question before capital allowances even apply) | No collision; already linked from the page intro. Keep + strengthen the forward-link (this is the upstream decision). |

**Conclusion:** REWRITE in place as the **broad-intent hub**. No REDIRECT-PROPOSED (reversed-equity collapse blocked by guard R6 + §38). No FLAG-MANAGER beyond the standard stale-fact corrections. The hub discipline is the cannibalisation-management mechanism: this page stays broad and routes OUT; the siblings own the mechanics.

---

## Closest existing pages (Stage 2) — internal-link targets within the live corpus

All paths verified to exist on disk 2026-05-30 (`Property/web/content/blog/`). Path = `/blog/<category-slug>/<slug>`.

**Route OUT to (canonical deep-dives — this page is the hub):**
- `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — the decision-framework pillar; reciprocal forward-link (and the zero-equity pillar should later 301 here, not vice-versa).
- `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` — AIA deep-dive (canonical AIA page; note category is `section-24-and-tax-relief`).
- `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` — WDA rates deep-dive.
- `/blog/section-24-and-tax-relief/writing-down-allowance-cars` — WDA on cars / emissions pooling.
- `/blog/property-types-and-specialist-tax/structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward` — SBA mechanics deep-dive.
- `/blog/property-types-and-specialist-tax/full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — company full-expensing + 50% FYA SPV mechanics.
- `/blog/property-types-and-specialist-tax/integral-features-capital-allowances` — integral features (s.33A) deep-dive.
- `/blog/property-types-and-specialist-tax/capital-allowances-commercial-property-what-can-claim` — commercial qualifying-asset list.

**Upstream gateway + supporting (link from the relevant section):**
- `/blog/landlord-tax-essentials/capital-vs-revenue-expenditure-landlord-uk` — the capital-vs-revenue line (already linked in intro; keep + strengthen).
- `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — for residential landlords whose route is deductions/replacement-of-domestic-items, not capital allowances (already linked; keep).
- `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — incorporation comparison (full expensing as an incorporation lever; already linked; keep).
- `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — MTD section forward-link (already linked; **verify the slug is live at execution** — confirm exact MTD page slug, the source links to this path).

**Confirm-at-execution (slugs not yet verified in this brief pass):** the s.198 fixtures-election page slug and any HMO/common-parts page slug (§25.2/§25.11 + §25.7). Verify live before linking; do not invent.

---

## House-position references (Stage 1)

- **§38 Capital allowances (CAA 2001) — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified at legislation.gov.uk]: the **primary spine**. Every rate and reform statement on the rewritten page must match §38 exactly. Specifically: WDA 14% main / 6% special (FA 2026 s.28); 40% FYA (FA 2026 s.29, unincorporated route, on/after 1 Jan 2026, excludes cars + second-hand + overseas-leasing); AIA £1m permanent (s.51A(5) / F(No.2)A 2023 s.8); full expensing 100% companies-only (s.45S); SBA 3% (FA 2021 Sch 22 para 7(4)); s.35 dwelling-house bar + common-parts/integral-features carve-out; FHL abolition (FA 2025 Sch 5); car FYA only 0 g/km (s.45D).
- **§25.1-§25.11 CAA 2001 cluster** [LOCKED 2026-05-23]: the deep statutory detail. Thread §25.1 (qualifying activity, s.15 post-FHL omission), §25.2/§25.11 (fixtures, s.198 + s.187B pooling requirement), §25.3 (AIA, s.51A), §25.4 (SBA, Part 2A / s.270AA / s.270BA / s.270CF / s.270IA / s.37B), §25.5 (FYAs, s.39 gateway + s.45D + s.45S + s.46 exclusions), §25.6 (disposal mechanics, s.55 entitlement + s.61 disposal values + s.196 fixtures Table + balancing charge), §25.7 (FHL transitional, FA 2025 Sch 5 grandfathered pools).
- **§6 FHL abolition transition** [LOCKED]: narrative spine for the FHL section (former FHL now taxed as standard residential; pooled allowances brought forward continue WDA; no new FHL P&M qualifies).
- **§4 Section 24** [LOCKED]: boundary — §4 is interest-cost relief; §38 is capital allowances. Cross-link, do not conflate (the source already cross-references Section 24 — keep the boundary clean).
- **§21 LtdCo / FIC mechanics + §21.5 (FIC-level SBA)** [LOCKED]: the company section threads here (full expensing as a company lever; FIC commercial-property SBA availability).
- **§19 MTD ITSA** [LOCKED]: MTD threshold schedule (£50k Apr 2026 / £30k Apr 2027 / £20k Apr 2028) for the MTD section — the source's "£50,000 from April 2026" is correct; preserve and optionally add the later thresholds.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts — STALE_FACTS (multiple), all resolvable at write time against legislation.gov.uk + §38.** This is the rewrite's first job. Six items:

1. **AIA temporary framing** (line 77) contradicts §38 (AIA £1m permanent, F(No.2)A 2023 s.8). **Strip.**
2. **Residential bar mis-anchored to "2016 HMRC view"** (line 42) — §38 anchors to **CAA 2001 s.35**. **Re-anchor.**
3. **40% FYA thin/uncited** (lines 82, 121) — §38 requires FA 2026 s.29 + the exclusions (cars, second-hand, overseas-leasing) + the unincorporated-vs-company-full-expensing distinction. **Cite + expand.**
4. **FHL absent** — §6 + §25.7 + §38 require the FA 2025 Sch 5 abolition + grandfathered-pools treatment. **Add.**
5. **SBA cited only to ICAEW** (line 63) — §25.4 requires Part 2A / s.270AA anchor + 29 Oct 2018 gate + s.270IA allowance statement + s.37B add-back + s.270CF residential exclusion. **Re-anchor + expand.**
6. **Duplicate `id` attributes** (HTML validity) — clean at rewrite.

**Bill-vs-enacted verification (F-37 pattern, MANDATORY at write time):** FA 2026 is recorded in §38 as **Finance Act 2026 (c.11), Royal Assent 18 March 2026, ENACTED**. State FA 2026 s.28 and s.29 as **current law** — never "Finance Bill 2026", "proposed", or "subject to Royal Assent". The execution session MUST nonetheless re-verify the FA 2026 c.11 Royal Assent date and the operative wording of CAA 2001 s.56 (now "14%", annotated as substituted by FA 2026 s.28(1)) directly on legislation.gov.uk before committing — this is the 14th instance of the program's Bill-vs-enacted verification discipline, run even when §38 already records ENACTED status.

**Flag to `track2_site_wide_flags.md`** (next available F-number at execution) as: `HIGH | capital-allowances-on-property | STALE_FACTS | six FA-2026-reform-floor corrections (AIA-permanent, s.35 residential bar, FA 2026 s.29 40% FYA, FHL FA 2025 Sch 5, SBA Part 2A/s.270IA/s.37B re-anchor, duplicate HTML ids). All resolvable against §38 + legislation.gov.uk at write time.`

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31; cite the substituted/current wording, not a dead historic section)

| URL | Verification note (execution) | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | __ verify dwelling-house bar wording | Residential P&M restriction (re-anchor from "2016 HMRC view") |
| https://www.legislation.gov.uk/ukpga/2001/2/section/33A | __ verify integral-features 5 categories | Special-rate-pool integral features |
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | __ verify s.51A(5) £1m permanent | AIA permanence (kill the temporary framing) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | __ verify now reads "14%", annotated substituted by FA 2026 s.28(1) | Main-pool WDA 14% |
| https://www.legislation.gov.uk/ukpga/2001/2/section/104D | __ verify special rate 6% unchanged | Special-rate WDA 6% |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | __ verify company-only full expensing | Full expensing (companies only) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270AA | __ verify SBA 3% + 29 Oct 2018 | SBA gateway |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270IA | __ verify allowance-statement = nil rule (s.270IA(2)) | SBA allowance-statement trap |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270CF | __ verify SBA residential exclusion | SBA residential bar (NOT s.270BG) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/198 | __ verify fixtures election on sale | Fixtures election (link to deep-dive) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/37B | __ verify SBA cumulative add-back to CGT base cost | SBA-disposal CGT interaction |
| FA 2026 (c.11) s.28 — https://www.legislation.gov.uk/ukpga/2026/11/section/28 | __ verify path + RA 18 Mar 2026 + s.28(2)-(6) hybrid | WDA 14% enabling section + straddling hybrid |
| FA 2026 (c.11) s.29 — https://www.legislation.gov.uk/ukpga/2026/11/section/29 | __ verify path + the 40% FYA exclusions; if a consolidated CAA inserted-section number exists, verify it, else cite FA 2026 s.29 (never invent) | 40% FYA (unincorporated) |
| FA 2025 (c.8) Sch 5 — https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 | __ verify Part 3 (CA) + Part 5 commencement 1 Apr / 6 Apr 2025 | FHL abolition |
| https://www.gov.uk/capital-allowances | keep (existing ref-1) | Consumer overview cross-reference |
| https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual | __ verify CA21000+ / CA23000+ / CA90000+ paths | HMRC interpretive overlay (anchor on legislation, manuals as overlay) |

**(Execution session selects 6-9 to actually cite in body; anchor statutory positions on legislation.gov.uk, use HMRC CA manual as overlay only.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules (NO em-dashes anywhere; anonymised social proof only; NO pricing/fees; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind utility classes in body), FAQs-and-schema (frontmatter `faqs:` array, target 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema in body), anti-templating discipline, six-check quality bar, statute-citation discipline (F-8: statute content can be removed by amendment even when the URL is live — verify current wording).

**Critical for THIS brief:** NO pricing (the source has none — keep it that way; the "how do accountants charge" temptation in the professional-advice section must stay number-free per Decision E). NO em-dashes. FA 2026 s.28/s.29 stated as ENACTED law (RA 18 Mar 2026), never Bill-form. Hub-discipline: link OUT, do not re-derive sibling detail.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas (do not restate)

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full 19-step legacy-rewrite workflow. **Track 2 deltas for this page:**
- Step 1: read house_positions §38 + §25 (all sub-sections) + §6 in full at session start.
- Step 4 (load-bearing): **verify FA 2026 c.11 RA 18 Mar 2026 + CAA 2001 s.56 = 14% (substituted by FA 2026 s.28(1)) + the FA 2026 s.29 40% FYA exclusions** on legislation.gov.uk before any rate is written.
- Step 9: **rewrite markdown at existing path** (not a new file). Preserve frontmatter slug + canonical + category; update `dateModified` + `sourcesVerifiedAt` to today. Clean duplicate `id` attributes. Remove the dead empty FAQ `<h2>`.
- Step 11 six-checks: FAQ schema count = frontmatter length (12-14); em-dash count = 0; Tailwind class count = 0; meta title clean + complete (not truncated mid-phrase) ≤ ~62 chars; meta description complete ≤ 158 chars; all internal links resolve; **+ pricing-check** (`£[0-9]` returns 0 fee-discussion matches); **+ unique-id check** (no duplicate `id=` in body).
- Step 12: confirm NO redirect (collapse dropped; REWRITE in place).
- Step 13: insert/update `monitored_pages` row — **180-day window** (INVISIBLE-baseline page per F-11).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §38 WDA 14%/6% (FA 2026 s.28) + straddling hybrid: __
- §38 40% FYA (FA 2026 s.29, unincorporated, exclusions): __
- §38 AIA £1m permanent (s.51A(5) / F(No.2)A 2023 s.8): __
- §38 full expensing companies-only (s.45S): __
- §38 s.35 dwelling-house bar + common-parts carve-out: __
- §25.4 SBA (s.270AA / 29 Oct 2018 / s.270IA allowance statement / s.270CF residential exclusion / s.37B add-back): __
- §6 + §25.7 FHL abolition (FA 2025 Sch 5; grandfathered pools): __
- FA 2026 c.11 RA 18 Mar 2026 re-verified on legislation.gov.uk: __ (Y/N + date)

### Comparison: before vs after
- Word count: 2,043 → __ (target ~3,400)
- H2 count: 13 → __
- FAQ count: 4 → __ (target 12-14)
- Worked examples: ~2 illustrations → __ (target 3-4)
- Authority links: 2 (gov.uk + icaew) → __ (target 6-9, legislation.gov.uk-anchored)
- Internal OUT-links to cluster deep-dives: __ (hub-routing)
- Duplicate HTML ids removed: __ (Y/N)
- Empty FAQ `<h2>` removed: __ (Y/N)
- Meta title: "...A Complete Guide for UK" (truncated) → __
- Meta description: (truncated) → __

### Flags raised
- STALE_FACTS six-correction flag (carried from brief): __ confirmed applied
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
