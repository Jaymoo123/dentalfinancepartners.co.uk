# Track 2 brief: annual-investment-allowance-2024-25

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; STALE_FACTS + THIN_DEPTH + INVISIBLE + CANNIBAL + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/annual-investment-allowance-2024-25.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/annual-investment-allowance-2024-25
**Stage 1 priority:** M (genuine retrospective intent + exact-match query at pos 9.0, but near-zero equity; rewrite-to-distinguish, not collapse)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (diagnosis data carried from the engine DIAGNOSE pass; statutes re-anchored to house_positions §25 + §38; corpus link-targets resolved at brief time)
**Cannibalisation status:** REWRITE (distinct year-anchored retrospective; valid future 301 SOURCE into `annual-investment-allowance-uk` if the AIA-cluster collapse batch runs — FLAG-MANAGER for that audit, see cannibalisation block)

> **Depth target:** match the gold-reference brief `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (full 15-section template, real data, statute spine verified at write time). The load-bearing pivot here is **distinctiveness**: this page must NOT re-duplicate the evergreen "who can claim AIA" explainer that `annual-investment-allowance-uk` already owns. It must be a **2024/25-in-review retrospective** that funnels UP to the evergreen page and the CAA 2001 pillar.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `annual-investment-allowance-2024-25`. The year-stamp is a genuinely distinct *retrospective* intent. Per the DIAGNOSE pass this page still pulls the exact-match query "annual investment allowance 2024/25" at position 9.0 — a real, if thin, tail. Renaming or collapsing would forfeit that exact-match anchor before the cluster-collapse batch decision is made at manager level.
- **Category:** `Section 24 & Tax Relief` (kept — confirmed by current canonical `/blog/section-24-and-tax-relief/annual-investment-allowance-2024-25`).
- **Gap-mode tag:** `STALE_FACTS` (primary — the page predates the FA 2026 reform floor and omits the new 40% FYA entirely) + `THIN_DEPTH` (secondary — 1,199 words vs 3,200-4,900 competitor/sibling band) + `CANNIBAL` (tertiary — dense intra-cluster overlap, ~12 AIA/CA siblings) + `INVISIBLE` (15 impr / 0 clicks / pos 42.6 on Google; zero Bing equity; zero inbound internal links) + `STRUCTURE` (4 FAQs vs 10-14 floor; 0 outbound authority links).
- **"Why this rewrite" angle:** The page is structurally and factually behind. It (a) omits the **new 40% main-rate FYA** (FA 2026 s.29, expenditure from **1 January 2026**, the unincorporated-landlord route), (b) states the WDA cut awkwardly as a parenthetical hedge rather than cleanly as enacted law (FA 2026 s.28, Royal Assent **18 March 2026**), (c) gives **no statute citations at all** for the FHL abolition, the s.35 dwelling-house bar, or the ss.51A-51N association rules, and (d) duplicates the evergreen who-can-claim explainer instead of doing something the evergreen page cannot. **The rewrite's distinctiveness lever is the retrospective frame:** "2024/25 in review + what carried into 2025/26 + what changes from April 2026 (WDA 18%→14%) and 1 January 2026 (new 40% FYA)". It positions this page as the *time-anchored bridge* page that hands the reader UP to the evergreen `annual-investment-allowance-uk` and the CAA 2001 pillar for the durable how-to-claim detail. Body lift to ~3,200 words; FAQs 4 → 12; outbound authority links 0 → 5-6 (verified at write time).

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`annual-investment-allowance-2024-25.md`, frontmatter `date`/`dateModified` 2026-05-20):**
- **Word count:** ~1,199 (body).
- **H2 outline (10 H2s, 1-line each):**
  1. What Is the Annual Investment Allowance? (£1m permanent cap, 100% relief)
  2. Who Can Claim the AIA as a Landlord? (residential vs commercial; FHL pre-April-2025; mixed-use; development trade)
  3. What Qualifies as Plant and Machinery for the AIA? (fixtures, integral features, exclusions; "no buildings")
  4. How Much Can You Claim? (£1m; excess to WDA "6% or 14% per year from April 2026 (was 18%)" — parenthetical hedge)
  5. How to Claim the AIA (SA103/SA104/CT600; no separate form)
  6. Interaction with Section 24 (capital allowance vs revenue expense framing)
  7. What About the 2025/26 Tax Year? (cap permanent; FHL gone from April 2025)
  8. Common Mistakes Landlords Make (residential AIA; building costs; home-office kit; records)
  9. Example: Claiming the AIA on a Commercial Property (Sarah, Manchester retail unit, £40k, £8k saving at 40%)
  10. Frequently Asked Questions (intro paragraph only; 4 FAQs in frontmatter)
- **Meta title (current):** "Annual Investment Allowance 2024/25: Landlord Guide" (51 chars).
- **Meta description (current):** "Annual Investment Allowance 2024/25: UK landlords can claim 100% relief on qualifying plant & machinery. Find out who qualifies and how to claim." (143 chars) — generic; mirrors the evergreen explainer, which is exactly the cannibalisation problem.
- **H1 (current):** "Annual Investment Allowance 2024/25: What UK Landlords Need to Know".
- **FAQ count (frontmatter `faqs:`):** 4 (target 12).
- **Outbound authority links:** 0 (no legislation.gov.uk / gov.uk / HMRC manual). Internal links: 3 (`/services`, Section 24 complete guide, `/contact`).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` — never hand-add in body).
- **Last meaningful edit:** 2026-05-20 (frontmatter `dateModified`).

**Already-correct content to preserve (do NOT re-flag as stale):**
- WDA framing "14% from April 2026 (was 18%)" in §"How Much Can You Claim?" and FAQ #4 is **factually correct** per FA 2026 s.28 / §38 / §25.2. The fix is *presentation* (state it cleanly as enacted law, drop the awkward parenthetical), not correction.
- FHL "abolished from 6 April 2025" is correct — but currently carries **no statute cite**; add **FA 2025 Sch 5 Part 3** (NOT FA 2024 Sch 5 — that is museum/gallery exhibitions; §25.7 / §25.10 do-not-write).
- The Sarah worked example quotes a **tax saving** (£8,000 at 40%), an illustrative tax-relief figure, NOT a fee for services — **compliant with Decision E** (no pricing leak). Keep the worked-example pattern; expand to 2-3 examples.
- No em-dashes in current body; no real client names (Sarah is a generic persona). Both compliant — keep.

---

## GSC angle (last 90 days) — data from the DIAGNOSE pass

**Aggregate (Google):** ~15 impressions / **0 clicks** / position **42.6** / 90-day window. **INVISIBLE** baseline.

**Bing:** ZERO equity (no impressions, no queries). Contrast the cannibalisation competitors below, which DO have Bing equity.

**Inbound internal links:** ZERO. A corpus grep finds the slug `annual-investment-allowance-2024-25` only in its own file — no sibling links to it. This is a structural cause of the page-4 Google position: no internal equity flows in.

**Exact-match tail anchor:** the page still surfaces for **"annual investment allowance 2024/25"** at **position 9.0** — the one query where the year-stamp earns the page its keep. This is the retrospective intent the rewrite must defend and deepen.

### Pattern analysis
- **INVISIBLE, not CTR-FAIL.** Unlike the gold-reference cgt-rates page (page-1 with broken CTR), this page is page-4 on its general queries. The limiter is *ranking*, not click-through. The levers are different: (1) earn inbound internal links from the AIA cluster siblings and the pillar; (2) differentiate the page so it stops competing head-to-head with the stronger evergreen sibling (which buries it); (3) deepen to the cluster word-count floor so it is not the thinnest page in a 12-page cluster.
- **Equity direction is settled (collapse-direction rule, §16.T2).** This 2024/25 page is the WEAKER of the AIA-named trio (15 impr / pos 42.6 / zero Bing / zero inbound) vs `annual-investment-allowance-uk` (55 impr / pos 70.9 Google, **18 impr / pos 5.0 / 12 queries on Bing**, HAS inbound links). A 301 could only ever point THIS page INTO the evergreen page, never the reverse — directionally equity-safe. Decision is REWRITE not collapse only because the cluster-collapse direction for ~12 near-dupes + a Wave 6 pillar is a **manager-level batch call**, not a single-page decision. See cannibalisation block + FLAG-MANAGER.

### GA4 engagement signal
- No meaningful GA4 signal at this traffic level (INVISIBLE-baseline page). Per §16.T2 monitored-aware rule, treat post-rewrite reads conservatively; this is an INVISIBLE-baseline page so use a **180-day** monitored window (F-11 recommendation), not 90.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (incomplete-as-of-FA-2026, not wrong).** The page was last touched 2026-05-20, days before the §38 FA 2026 reform floor was locked (2026-05-30). It omits the **new 40% FYA (FA 2026 s.29, from 1 January 2026)** entirely — the single most material capital-allowances change for *unincorporated* landlords since full expensing, and precisely the route that fills the gap where company-only full expensing (s.45S) does not reach. A 2024/25-in-review page that does not tell the reader "here is what changed after the year you are reading about" is failing its retrospective purpose.

**Secondary: THIN_DEPTH.** 1,199 words against a competitor band of 1,900-4,918 and an on-site cluster band where the closest direct siblings run 3,250-3,426 words and the Wave 6 pillar runs 4,918. This page is the thinnest in its own cluster. Target ~3,200 words (matched to the gold-reference target; deeper than the two direct AIA competitors, shorter than the pillar by design — the pillar owns comprehensive policy, this page owns the *time-anchored retrospective*).

**Tertiary: CANNIBAL (dense).** ~12 AIA/capital-allowance siblings target adjacent intent (full list in cannibalisation block). The closest direct competitors are the evergreen `annual-investment-allowance-uk` and `annual-investment-allowance-landlords-uk`. The current page's generic meta + generic who-can-claim body is a near-clone of the evergreen explainer, which is why the stronger evergreen page wins and buries this one. The fix is **intent differentiation by year-anchoring**, not deletion.

**Also present: INVISIBLE + STRUCTURE.** Zero Google clicks, zero Bing equity, zero inbound internal links, 4 FAQs, 0 authority links. Structural floor: 12 FAQs, 5-6 authority links, inbound links earned from cluster siblings + pillar at execution.

**Load-bearing fix sequence (ordered by ROI):**

1. **Reframe to a retrospective.** Recast the page from "AIA explainer (same as the evergreen)" to "**AIA 2024/25 in review → what carried into 2025/26 → what changed from April 2026 / 1 January 2026**". New H1 + new meta + new opening that signals the time-anchored angle in the first sentence. This is the distinctiveness fix and the single most important change.
2. **Surface the FA 2026 reform floor** as the spine of the "what changed" section: WDA main pool **18%→14%** (FA 2026 s.28, 1 Apr 2026 CT / 6 Apr 2026 IT, hybrid time-apportioned straddle), special-rate pool **6% unchanged**, and the **new 40% FYA** (FA 2026 s.29, from 1 January 2026, unincorporated + leasing, excludes cars / second-hand / overseas-leasing). State all as **enacted current law** (RA 18 March 2026), never as Bill-form (F-37 pattern: verify Royal Assent at write time).
3. **Add the statute spine.** Cite ss.51A-51N (AIA + association rules), s.35 (dwelling-house bar), s.33A (integral features), FA 2025 Sch 5 Part 3 (FHL abolition), FA 2026 ss.28-29. The current page is a load-bearing-statute desert.
4. **Funnel UP, do not duplicate.** Every "how do I actually claim / who qualifies in detail" thread should be a *forward-link* to the evergreen `annual-investment-allowance-uk` and the CAA 2001 pillar, not a re-explanation. This is both the cannibalisation cure and the internal-equity builder.
5. **Body to ~3,200 words; FAQs 4 → 12** (each FAQ targets a distinct retrospective or "what-changed" intent; keep and improve the 4 existing).
6. **Authority links 0 → 5-6** (legislation.gov.uk ss.51A / 56 / 35 / 39, gov.uk new-FYA measure page, FA 2025 Sch 5 — all verified at write time).
7. **Meta title + description rewrite** to lead with the year-anchored differentiator (candidates in the meta block below).

---

## Competitor URLs (Stage 2 — VERIFY LIVE at execution per §16.31)

These are the DIAGNOSE-pass competitor targets. Re-fetch each at execution (httpx + real User-Agent); reject non-200; date-stamp.

| URL | Expected role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://pkf-francisclark.co.uk/insights/capital-allowances-for-property-investors-what-you-can-and-cant-claim-in-2025/ | Specialist "what you can/can't claim" framing | The can/can't claim clarity for property investors; residential-vs-commercial split | They are a 2025 snapshot; we are year-anchored 2024/25 + forward to FA 2026. Add the 40% FYA they likely omit. |
| https://blog.shorts.uk.com/annual-investment-allowance-capital-allowances | AIA + capital-allowances overview | Plain-English AIA-vs-WDA-vs-FYA hierarchy | No property-specific s.35 dwelling-house bar depth; no year-anchoring. |
| https://www.ukpropertyaccountants.co.uk/what-is-the-tax-allowance-for-2024-25/ | Direct 2024/25 allowance retrospective (closest intent match) | The 2024/25 retrospective frame itself; allowance-by-allowance structure | This is our nearest intent rival — beat it on AIA depth, statute citation, and the forward-look to April 2026 / Jan 2026 changes. |
| https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances | The PRIMARY authority for the 40% FYA + WDA cut | Cite as the gov.uk measure for the new 40% FYA and the WDA 18%→14%; LINK to it (controlled link-out for users who want gov.uk) | This is gov.uk — do not try to out-rank it; cite + link it and add the specialist landlord application it lacks. |

**Competitor depth ceiling for this query class:** the two direct AIA siblings on-site run 3,250-3,426 words; the gov.uk measure is authoritative but narrow. A ~3,200-word year-anchored retrospective with 12 FAQs, 2-3 worked examples, the new-40%-FYA coverage none of the 2024/25-vintage competitors have, and 5-6 verified statute citations puts this page decisively best-in-class for the *retrospective* intent without head-to-head competing with the evergreen explainer.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index:** DENSE intra-cluster overlap, F-4 confirmed. The AIA / capital-allowance cluster is the densest on the site (~12+ pages). Confirmed siblings on disk at brief time:

| Slug | Category | Equity / role | Resolution vs this page |
|---|---|---|---|
| **annual-investment-allowance-uk** | Section 24 & Tax Relief | 55 impr / pos 70.9 Google + **18 impr / pos 5.0 / 12 queries Bing**; HAS inbound links; FA 2026 batch-4 rewrite anchor (§38) | **Evergreen who-can-claim explainer = the canonical UP-funnel target.** This page forward-links to it for durable how-to-claim detail. Valid future 301 SOURCE direction is THIS → evergreen. |
| **annual-investment-allowance-landlords-uk** | Section 24 & Tax Relief | 32 impr / pos 63.9; FA 2026 batch-4 anchor (§38) | Owns the "can landlords claim?" question. This page references the residential-vs-commercial distinction briefly + forward-links; does NOT re-explain it. |
| **capital-allowances-property-investors-complete-pillar-2026-27-...** | Property Types & Specialist Tax | 4,918-word Wave 6 pillar | **Pillar = secondary UP-funnel target** for the comprehensive CAA 2001 decision framework. Forward-link; do not duplicate the pillar's breadth. |
| **aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010** | Property Types & Specialist Tax | 3,185 words | Owns the £1m-cap group-allocation / association-rules depth (ss.51E/51G). This page mentions the single-allowance rule briefly + forward-links here for the deep allocation strategy. |
| annual-investment-allowance-2025 | Landlord Tax Essentials | year-stamped sibling (2025) | Near-dupe by year. This page is the 2024/25 retrospective; the 2025 page is its forward-neighbour. Flag both to the AIA-cluster collapse audit. |
| what-is-aia-in-tax | Section 24 & Tax Relief | Bing pos 5.1 | Definitional "what is AIA" — this page does NOT re-do the definition; one-line + forward-link. |
| aia-allowance-uk-property-investors | Property Types & Specialist Tax | near-dupe | Cluster-collapse audit candidate. |
| aia-capital-allowance-property-landlords | Section 24 & Tax Relief | near-dupe | Cluster-collapse audit candidate. |
| capital-allowance-aia-property-landlords | Property Types & Specialist Tax | near-dupe | Cluster-collapse audit candidate. |
| writing-down-allowance-rates | Property Types & Specialist Tax | FA 2026 batch-4 anchor (14%/6%) | Owns WDA-rate depth. This page references the 18%→14% cut briefly + forward-links here. |
| full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023 | Property Types & Specialist Tax | full-expensing depth | Owns company-only full expensing (s.45S). This page contrasts the new 40% FYA (unincorporated) against full expensing (company-only) + forward-links. |
| fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics | Property Types & Specialist Tax | FHL transitional depth | Owns the grandfathered-pool mechanics. This page notes FHL abolition + forward-links here. |
| hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | Property Types & Specialist Tax | s.35 common-parts depth | Owns the HMO common-parts s.35 carve-out. This page references s.35 + forward-links here. |

**Conclusion:** **REWRITE in place**, distinct by year-anchored retrospective framing that funnels UP rather than duplicating. **No REDIRECT now** (collapse direction for the ~12-page cluster + pillar is a manager-level batch decision, not a single-page call). **FLAG-MANAGER:** add this slug to the AIA-cluster collapse audit as a **valid 301 SOURCE into `annual-investment-allowance-uk`** (stronger Google + Bing + inbound equity) if/when that batch runs. Equity direction is pre-verified safe per §16.T2.

---

## Closest existing pages (Stage 2) — internal-link plan

This page is currently an internal-link island (zero inbound). The rewrite must (a) forward-link UP to stronger pages, and (b) at execution, the manager should add 2-3 *inbound* links from cluster siblings so equity flows in. URL paths verified against canonicals at brief time.

**Forward-links FROM this page (UP-funnel + cluster siblings):**
- **Evergreen canonical (primary UP-funnel):** `/blog/section-24-and-tax-relief/annual-investment-allowance-uk` — from the opening retrospective frame and the "how to claim in detail" thread.
- **CAA 2001 pillar (secondary UP-funnel):** `/blog/property-types-and-specialist-tax/capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` — from the "where this sits in the wider capital-allowances picture" section.
- **Can landlords claim:** `/blog/section-24-and-tax-relief/annual-investment-allowance-landlords-uk` — from the residential-vs-commercial paragraph.
- **WDA rates:** `/blog/property-types-and-specialist-tax/writing-down-allowance-rates` — from the "what changed from April 2026 (18%→14%)" section.
- **New-FYA / full-expensing contrast:** `/blog/property-types-and-specialist-tax/full-expensing-50-percent-fya-commercial-property-spvs-mechanics-fa-2023` — from the "40% FYA vs company-only full expensing" contrast.
- **£1m cap allocation depth:** `/blog/property-types-and-specialist-tax/aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010` — from the single-allowance / association-rules paragraph.
- **FHL grandfathered pools:** `/blog/property-types-and-specialist-tax/fhl-capital-allowances-post-april-2025-grandfathered-claims-mechanics` — from the FHL-abolition paragraph.
- **HMO common parts s.35:** `/blog/property-types-and-specialist-tax/hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property` — from the s.35 dwelling-house-bar paragraph.
- **Section 24 (kept):** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` — from the "interaction with Section 24" section (verify exact slug at execution; the current page links to it).

**Inbound-link survey FOR the manager at execution (earn equity in):** add a contextual link to this 2024/25 retrospective from `annual-investment-allowance-uk`, `annual-investment-allowance-2025`, and the pillar (where a "for the 2024/25 year specifically, see…" pointer is natural). This directly addresses the zero-inbound INVISIBLE root cause.

---

## House-position references (Stage 1)

All `§N.M` resolve to current `house_positions.md`. Lock-date stamps from the doc.

- **§38 Capital allowances — FA 2026 reform floor** [LOCKED 2026-05-30, manager source-verified at legislation.gov.uk + GOV.UK measure]: the **primary spine**. FA 2026 (c.11), **Royal Assent 18 March 2026, ENACTED** — state as current law. Main pool WDA **18%→14%** (s.28; 1 Apr 2026 CT / 6 Apr 2026 IT; hybrid straddle s.28(2)-(6)). Special rate pool **6% unchanged** (s.104D). **New 40% FYA** (s.29; from **1 January 2026**; unincorporated + leasing; excludes cars/second-hand/overseas-leasing). AIA **£1m permanent**. Full expensing **company-only** (s.45S), distinct from the 40% FYA. Cars excluded from both AIA and 40% FYA.
- **§25.3 Annual Investment Allowance (CAA 2001 ss.51A-51N)** [LOCKED 2026-05-23]: £1m cap (s.51A(5), permanent from 1 Apr 2023 via F(No.2)A 2023 s.8); single-allowance rule for related corporate groups (**s.51E + s.51G** shared-premises / similar-activities tests); cars excluded; AIA unavailable for residential lettings under the s.35 dwelling-house restriction.
- **§25.1 / §25.2 Plant & machinery + s.35 dwelling-house bar + s.33A integral features** [LOCKED 2026-05-23]: the **s.35 dwelling-house restriction** is the cluster's central misconception — no P&M allowances for plant in a dwelling-house; narrow exception for **common parts** of a multi-let building. Integral features (s.33A, five categories) are special-rate (6%).
- **§25.5 First-Year Allowances (CAA 2001 ss.39-51)** [LOCKED 2026-05-23]: FYA gateway s.39; full expensing s.45S (company-only, from 1 Apr 2023). Provides the contrast frame for the new s.29 40% FYA.
- **§25.7 FHL transitional (FA 2025 Sch 5)** [LOCKED 2026-05-23]: FHL regime abolished **6 April 2025 (IT) / 1 April 2025 (CT)** by **FA 2025 Sch 5 Part 3** (NOT FA 2024 Sch 5). Grandfathered pools continue writing down in the ordinary property business; no NEW FHL P&M qualifying post-commencement.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees on-page (Decision E: even soft fee comparisons are a leak); NO real client names; anonymised illustrative personas only.

**§7 note:** the page touches the "April 2027 property income tax" boundary only if the rewrite references the wider 2026-27 landlord landscape. If it does, hedge/assert per §7 + the F-37 pattern (verify FA 2026 Royal Assent and the April-2027 reducer position at write time). Prefer to keep this page narrowly on capital allowances and forward-link income-tax-rate detail elsewhere — do NOT pull the income-tax-rate change into this capital-allowances page beyond a one-line cross-reference.

---

## House-position conflict flag (Stage 2)

**No hard CONTRADICTION of a locked position** in the current published page (distinguishes this from the gold-reference F-5 case). The WDA "14% from April 2026 (was 18%)" framing is *correct* per §38 / §25.2 — the issue is presentation and **omission**, not wrong assertion.

**Confirmed STALE-BY-OMISSION (the rewrite's first job):**
1. **Omits the new 40% FYA entirely** (FA 2026 s.29). For a capital-allowances page touching 2025/26 and beyond, this is the single most material omission. MUST be added. (Cite FA 2026 s.29; if a consolidated CAA 2001 inserted-section number is needed, **verify it at legislation.gov.uk at write time, otherwise cite FA 2026 s.29 — never invent a section number**, per §38.)
2. **FHL abolition has no statute cite.** Add **FA 2025 Sch 5 Part 3** (NOT FA 2024 Sch 5). §25.7 / §25.10 do-not-write explicitly flags the FA-2024-vs-FA-2025 confusion.
3. **Under-states the s.35 dwelling-house bar mechanism** and never cites **CAA 2001 ss.51A-51N** nor the **s.51E / s.51G** associated-companies single-allowance rule (§25.3). Add the load-bearing statute.
4. **Presentation fix:** restate the WDA cut cleanly as enacted FA 2026 s.28 law (RA 18 March 2026), dropping the awkward parenthetical hedge.

**No pricing leak** (Decision E compliant — Sarah example quotes a tax *saving*, not a fee). **No em-dashes.** **No real client names.** All three confirmed compliant in the current body; the rewrite must preserve that compliance.

**Flag to `track2_site_wide_flags.md` at execution:** `<F-N> | 2026-05-30 | MEDIUM | annual-investment-allowance-2024-25 | STALE_FACTS(omission) + CANNIBAL | New 40% FYA (FA 2026 s.29) omitted; FHL cite missing (must be FA 2025 Sch 5 Part 3 not FA 2024); ss.51A-51N/s.51E/s.51G uncited; zero inbound internal links (INVISIBLE root cause). Valid future 301 SOURCE into annual-investment-allowance-uk — add to AIA-cluster collapse audit.`

---

## Authority links worth considering (Stage 2 — VERIFY each at execution, F-37/§16.31)

Execution session selects 5-6 to actually cite as inline hyperlinks. Every legislation.gov.uk cite must be checked for *operative wording* (the s.4-substituted-by-FA-2019 / F-8 pattern), and any Finance Act cite must have Royal Assent confirmed (F-37 pattern — FA 2026 RA 18 March 2026 already confirmed at §38 lock, but re-verify the s.29 consolidated section number is/ is not yet inserted into CAA 2001).

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2001/2/section/51A | Verified 2026-05-23 (§25.3) — reads "The maximum allowance is £1,000,000" | AIA £1m cap statute |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | Verified 2026-05-30 (§38) — now reads 14%, annotated "substituted ... by Finance Act 2026 (c. 11), s. 28(1)" | Main-pool WDA 14% statute |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Verify at execution | Dwelling-house P&M restriction |
| https://www.legislation.gov.uk/ukpga/2001/2/section/39 | Verified 2026-05-23 (§25.5) | FYA gateway (frames the new 40% FYA) |
| https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances | Verify content at execution | gov.uk measure: the new 40% FYA + WDA 18%→14% (controlled link-out) |
| https://www.legislation.gov.uk/ukpga/2025/8/schedule/5 | Verified 2026-05-23 (§25.7) | FA 2025 Sch 5 — FHL abolition |
| https://www.gov.uk/government/publications/finance-act-2026 (or the legislation.gov.uk FA 2026 c.11 s.29 page) | Verify s.29 + any inserted CAA section at execution | 40% FYA enabling provision (RA 18 Mar 2026) |
| https://www.legislation.gov.uk/ukpga/2001/2/section/45S | Verified 2026-05-23 (§25.5) | Company-only full expensing (the contrast against the 40% FYA) |

---

## Section-by-section content plan (~3,200 words)

Target ~3,200 body words, 12-13 H2s, 12 FAQs, 2-3 worked examples, 1-2 inline `<aside>` CTAs at conversion moments (LeadForm auto-injected by `BlogPostRenderer.tsx` — never duplicate). Word budget per section is indicative.

1. **H1 + opening (retrospective frame)** (~180w) — open in the FIRST sentence with the year-anchored angle: "the 2024/25 tax year, what it meant for AIA, and what has changed since." Signal immediately that this is a *retrospective + forward-look*, not a generic explainer. Forward-link the evergreen `annual-investment-allowance-uk` for the durable who-can-claim detail.
2. **H2 — AIA in 2024/25 at a glance** (~220w) — snippet-bait summary: £1m permanent cap (s.51A(5)), 100% first-year write-off, who it reached in 2024/25. Small table: allowance / 2024/25 position / what changed since. (Table is the snippet-bait lever for the INVISIBLE page.)
3. **H2 — Who could (and could not) claim AIA in 2024/25** (~280w) — residential-vs-commercial; the s.35 dwelling-house bar (cite CAA 2001 s.35); FHL still qualifying *before* 6 April 2025; commercial / mixed-use / development trade. Forward-link `annual-investment-allowance-landlords-uk` for depth; do NOT re-explain in full.
4. **H2 — What counted as plant and machinery** (~260w) — qualifying fixtures, integral features (s.33A, five categories, special-rate 6%), exclusions (buildings shell, cars). Keep concise; this is the evergreen page's territory — summarise + forward-link.
5. **H2 — The £1m cap and the single-allowance rule** (~280w) — £1m per business not per property; aggregation; **the associated-companies single-allowance rule (ss.51E + 51G, shared-premises / similar-activities tests)**. Forward-link the `aia-1m-cap-...-association-rules-cta-2010` page for the deep allocation strategy.
6. **H2 — How AIA interacted with Section 24 in 2024/25** (~220w) — capital allowance vs revenue expense; AIA reduces taxable profit directly (not caught by the s.24 finance-cost restriction). Keep the existing correct framing; tighten. Forward-link Section 24 complete guide.
7. **H2 — What carried into 2025/26** (~240w) — £1m cap permanent and unchanged; **FHL regime abolished 6 April 2025 (IT) / 1 April 2025 (CT)** — cite **FA 2025 Sch 5 Part 3**; grandfathered FHL pools continue writing down in the ordinary property business (forward-link the FHL-grandfathered-pools page). No new FHL P&M qualifying.
8. **H2 — What changed from April 2026: the WDA cut** (~240w) — main-pool WDA **18%→14%** (FA 2026 s.28, RA 18 March 2026, ENACTED; 1 Apr 2026 CT / 6 Apr 2026 IT; **hybrid time-apportioned rate** for straddling periods, s.28(2)-(6)); special-rate pool **6% unchanged**. State as current law. Forward-link `writing-down-allowance-rates`.
9. **H2 — The new 40% first-year allowance (from 1 January 2026)** (~320w) — THE differentiator section. FA 2026 s.29: 40% FYA on **new and unused main-rate** plant and machinery, expenditure from **1 January 2026**; **deliberately available to unincorporated businesses (sole traders, partnerships, individual landlords) and to leasing** — the route where company-only full expensing does not reach. Excludes **cars, second-hand/used, and assets for overseas leasing**. Contrast with company-only full expensing (s.45S — forward-link the full-expensing page). Note the s.35 dwelling-house bar still applies (so residential dwelling plant remains barred; commercial / common-parts only).
10. **H2 — Worked examples** (~360w) — (a) keep/expand the Sarah commercial-unit AIA example (£40k qualifying, £8k tax *saving* at 40% — illustrative relief, NOT a fee). (b) NEW: an unincorporated landlord with commercial plant incurred *after 1 January 2026* contrasting AIA vs the new 40% FYA where the £1m cap is already used. (c) optional: a straddling-period WDA example showing the hybrid 18%/14% time-apportionment. All anonymised generic personas; tax-relief figures only, no fees.
11. **H2 — How to claim and keep records** (~200w) — SA103/SA104/CT600; no separate form; record-keeping (invoices, asset schedule). Concise; forward-link the evergreen page for the full how-to.
12. **H2 — Common mistakes (2024/25 and beyond)** (~220w) — claiming AIA on residential dwelling plant (s.35 bar); including building shell costs; assuming FHL still qualifies post-April-2025; missing the new 40% FYA on post-Jan-2026 unincorporated spend; cars treated as AIA-qualifying (excluded). Each tied to a statute/position.
13. **H2 — Frequently Asked Questions** (intro line; 12 FAQs in frontmatter — see below).

**FAQ plan (12 — keep/improve the 4 existing, add 8):**
1. Can I claim the AIA on a buy-to-let residential property in 2024/25? (keep; add s.35 cite)
2. What was the AIA threshold for 2024/25? (keep; £1m, s.51A(5), permanent from 1 Apr 2023)
3. Did the AIA apply to furnished holiday lettings after April 2025? (keep; add FA 2025 Sch 5 Part 3 cite — NOT FA 2024)
4. Can I claim the AIA on a car used for my property business? (keep; cars excluded; correct WDA to 14% main / 6% special clean-stated)
5. NEW — What is the new 40% first-year allowance, and can individual landlords use it? (FA 2026 s.29, from 1 Jan 2026, unincorporated + leasing, excl cars/second-hand/overseas-leasing)
6. NEW — Did the writing-down allowance change after 2024/25? (yes; 18%→14% main pool from April 2026, FA 2026 s.28; special rate stays 6%)
7. NEW — Is the £1m AIA cap still £1m, or has it reverted to £200,000? (still £1m, permanent; the reversion framing is stale)
8. NEW — How does AIA differ from full expensing for a property company? (s.45S company-only 100% vs AIA-for-all; forward-link)
9. NEW — Do associated companies get a full £1m AIA each? (no; single shared allowance, ss.51E/51G)
10. NEW — Can I claim AIA on plant in the communal areas of an HMO or block of flats? (yes, common parts only; s.35 exception; forward-link HMO common-parts page)
11. NEW — Does AIA cover the cost of buying or building the property itself? (no; plant and machinery only, not the building shell)
12. NEW — I had qualifying FHL spend in 2024/25 — can I still claim it? (yes, claim in the 2024/25 return before the regime ended; grandfathered pool continues writing down afterwards)

---

## Statute spine (every section number with its Act — VERIFY each at write time)

- **CAA 2001 s.35** — dwelling-house P&M restriction (residential lets barred; common-parts exception). [§25.1/§25.2/§38]
- **CAA 2001 s.33A** — integral features, five categories, special-rate (6%). [§25.2]
- **CAA 2001 s.39** — first-year allowance gateway. [§25.5]
- **CAA 2001 s.45S** — full expensing, company-only, from 1 April 2023 (contrast against the new 40% FYA). [§25.5/§38]
- **CAA 2001 s.51A(5)** — AIA maximum £1,000,000 (permanent). [§25.3/§38]
- **CAA 2001 ss.51B-51N** — single-allowance rules; **s.51E** (common-control + related), **s.51F** (control), **s.51G** (related: shared-premises / similar-activities NACE test), **s.51K** (allocation). [§25.3]
- **CAA 2001 s.56** — main-pool WDA, now 14% (substituted by FA 2026 s.28(1)). [§38]
- **CAA 2001 s.104D** — special-rate pool WDA, 6% unchanged. [§38]
- **Finance (No. 2) Act 2023 (c.30) s.8** — made the £1m AIA cap permanent from 1 April 2023 (RA 11 July 2023). [§25.3/§38]
- **Finance Act 2025 (c.8) Sch 5 Part 3** — FHL regime abolition; commencement 6 April 2025 (IT) / 1 April 2025 (CT). (NOT FA 2024 Sch 5.) [§25.7/§38]
- **Finance Act 2026 (c.11) s.28** — main-pool WDA 18%→14% (1 Apr 2026 CT / 6 Apr 2026 IT; hybrid straddle s.28(2)-(6)). Royal Assent 18 March 2026, ENACTED. [§38]
- **Finance Act 2026 (c.11) s.29** — new 40% main-rate FYA from 1 January 2026 (unincorporated + leasing; excludes cars / second-hand / overseas-leasing). Verify any consolidated CAA 2001 inserted-section number at write time; otherwise cite FA 2026 s.29 — never invent a number. [§38]

---

## Competitor depth benchmark (Stage 2)

| Source | Words | FAQs | Statute cites | Year-anchored | New 40% FYA covered |
|---|---|---|---|---|---|
| pkf-francisclark (2025 snapshot) | mid (verify) | likely 0 | few | partial (2025) | likely no |
| blog.shorts.uk.com (AIA overview) | mid | 0 | 0-few | no | likely no |
| ukpropertyaccountants 2024/25 allowance page | mid | low | few | **yes (closest rival)** | likely no |
| gov.uk new-FYA measure | narrow | 0 | n/a (is the source) | no | **yes (authority)** |
| On-site `annual-investment-allowance-uk` (evergreen) | 3,426 | mid | yes (FA 2026 anchor) | no (evergreen) | yes |
| On-site `annual-investment-allowance-landlords-uk` | 3,250 | mid | yes | no | yes |
| On-site Wave 6 pillar | 4,918 | high | high | no (pillar) | yes |
| **This rewrite (target)** | **~3,200** | **12** | **12-13 verified** | **YES (the differentiator)** | **YES + unincorporated-route depth** |

**Read:** the competitive whitespace is the *year-anchored retrospective that also carries the FA 2026 forward-look*. No competitor (and no current on-site sibling) occupies "2024/25 in review → what changed by April 2026 / Jan 2026" cleanly. That is the distinct intent this page should own.

---

## metaTitle / metaDescription / h1 plan

Test 2-3 metaTitle candidates at execution; lead with the year-anchored differentiator (the exact-match query "annual investment allowance 2024/25" sits at pos 9.0 — keep the year-string near the front).

**metaTitle candidates (≤ 62 chars):**
- "Annual Investment Allowance 2024/25: Review + What Changed" (57)
- "AIA 2024/25 Landlords: £1m Cap, FHL End + 2026 Changes" (53)
- "Annual Investment Allowance 2024/25 + April 2026 Changes" (55)

**metaDescription (≤ 158 chars):**
- "Annual Investment Allowance for 2024/25: the £1m cap, who could claim, the FHL cut, and what changed by April 2026, including the new 40% first-year allowance." (157)

**h1:**
- "Annual Investment Allowance 2024/25: What It Meant and What Has Changed Since" (year-anchored retrospective; distinct from the evergreen explainer's H1).

(All copy: no em-dashes, no pricing, anonymised personas only.)

---

## Universal rules — inherited from parent program (do not restate)

Per §4 section 13 pointer: NETNEW_PROGRAM §4 voice block + `competitor_rewrite_playbook.md §5` (no em-dashes anywhere; lead-gen architecture; no pricing; CSS-in-markdown semantic HTML only; frontmatter `faqs:` array target 10-14, FAQPage schema auto-emitted; anti-templating; six-check verification; statute-citation discipline F-8; §16 lessons incl. §16.18 reasoning-first, §16.31 URL-liveness, §16.27/§16.30+ Bill-vs-enacted, §16.T1 deterministic floor, §16.T2 collapse-direction). **Critical for this brief:** NO pricing (Decision E — even soft fee comparisons); anonymised social proof only; NO em-dashes; FA 2026 cited as ENACTED (RA 18 March 2026); never invent the s.29 consolidated CAA section number.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per §4 section 14 pointer: inherits the full 19-step workflow from NETNEW_PROGRAM §7. Track 2 deltas: Step 9 rewrites the markdown at the existing path (preserve frontmatter slug + canonical + category; update `dateModified` + `sourcesVerifiedAt` to execution date); Step 12 confirms no redirect now (REWRITE; flag the cluster-collapse audit per cannibalisation block); Step 13 inserts/updates the `monitored_pages` row with a **180-day** window (INVISIBLE baseline, F-11). Load-bearing pre-rewrite steps for THIS page: (1) re-verify FA 2026 s.28/s.29 status + the s.29 consolidated CAA section number at legislation.gov.uk; (2) re-fetch the 4 competitor URLs; (3) survey + add 2-3 inbound internal links from cluster siblings (the INVISIBLE root cause). Run `cd Property/web && npm run build` + the six checks (FAQ count = frontmatter length; em-dash = 0; Tailwind classes = 0; metaTitle ≤ 62; metaDescription ≤ 158; all internal links resolve) + the mandatory per-batch QA chain (§16.T5).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §38 FA 2026 (WDA 14% s.28 + 40% FYA s.29, RA 18 Mar 2026 re-verified): __
- §25.3 AIA ss.51A-51N + s.51E/s.51G single-allowance: __
- §25.1/25.2 s.35 dwelling-house bar + s.33A integral features: __
- §25.5 s.45S full expensing contrast: __
- §25.7 FHL abolition FA 2025 Sch 5 Part 3 (NOT FA 2024): __
- §13 do-not-write (no pricing / no real names): __

### Comparison: before vs after
- Word count: 1,199 → __
- H2 count: 10 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inbound internal links: 0 → __ (target 2-3 added from cluster siblings)
- Worked examples: 1 → __
- New 40% FYA (FA 2026 s.29) covered: N → __

### Visibility-lift hypothesis test
- Pre-rewrite GSC: 15 impr / 0 clicks / pos 42.6; Bing zero; zero inbound links
- Post-rewrite expected: page-2/3 movement on general queries + defended exact-match "annual investment allowance 2024/25" pos 9.0; track over 180 days
- Verify at +60 / +120 / +180 days via monitored_pages detector

### Flags raised
- Carried from brief: STALE_FACTS(omission) + CANNIBAL; AIA-cluster collapse audit flag (valid 301 source into annual-investment-allowance-uk): __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
