# Track 2 brief: writing-down-allowance-rates

**Site:** property
**Brief type:** Legacy rewrite, gold-reference data-complete brief (Batch 4)
**Source markdown path:** `Property/web/content/blog/writing-down-allowance-rates.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/property-types-and-specialist-tax/writing-down-allowance-rates
**Stage 1 priority:** **H**, this page is the top GSC owner of the "writing down allowance rate(s)" query family (14 impr, pos 26.5) AND it currently publishes a fabricated special-rate figure (6%→4%) plus s.35 wrong advice. Wrong-advice on a live tax page is the highest-consequence class to fix.
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (legislation.gov.uk + GOV.UK measure page verified at draft time; sibling slugs filesystem-confirmed; house positions §25 read in full)
**Cannibalisation status:** REWRITE (collapse-direction equity guard explicitly REJECTS a 301 into the pillar, see §"Cannibalisation universe check"; this page is the stronger page for the rate-lookup intent)

> **This is the Batch 4 gold-reference brief.** It matches the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. Every statute citation below was verified against legislation.gov.uk at draft time (2026-05-30), including the Royal Assent / enacted status of Finance Act 2026 (the F-37 Bill-vs-enacted pattern). The execution session re-verifies at write time.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `writing-down-allowance-rates`. The slug is the exact-match transactional rate-lookup string ("writing down allowance rates / rate / calculation / special rate pool rate"). It is the page's whole equity. Do not change it; do not redirect it.
- **Category:** `Property Types & Specialist Tax` (kept). Aligns with the rest of the §25 CAA 2001 capital-allowances cluster (integral features, AIA 1m cap, SBA 3%, HMO common parts, balancing allowance/charge all sit in this category).
- **Gap-mode tag (six modes, all confirmed in source):**
  - `WRONG_ADVICE` (**primary, blocking**), two reader-misleading errors: (i) the fabricated special-rate "6%→4% from April 2026" repeated across frontmatter, meta, FAQs and body; (ii) the s.35 "residential landlords can claim WDAs on boilers/heating/lifts/furniture" advice.
  - `STALE_FACTS` (**primary**), page omits the single biggest 2026 capital-allowances development (the new permanent 40% first-year allowance from 1 January 2026) and carries a stale SBA phrasing ("3% in 2020/21 (previously 2%)") and a dead 2022 ACCA Spring-Statement reference describing an abandoned 18%→20% / 6%→8% proposal as directional context.
  - `THIN_DEPTH` (secondary), 1,882 words vs a 3,200 target; no hybrid/transitional rate; no worked WDA reducing-balance schedule; empty rendered FAQ block in body.
  - `STRUCTURE` (secondary), body carries an empty `<h2>Frequently Asked Questions</h2>` with an intro line but zero rendered Q&A (relies entirely on frontmatter `faqs:`), plus a thin Sources list; no rates table at top for snippet capture.
  - `INVISIBLE` (tertiary), low absolute GSC volume (page family ~14 impr at pos 26.5); the page needs depth + correctness to climb off page 3.
  - `CTR_FAIL` (tertiary), the meta title/description currently advertise the fabricated "special rate 4% from April 2026", so even the impressions it does earn are mis-sold; a corrected, planning-led meta is needed.
- **"Why this rewrite" angle:** This is not a polish pass. The live page is publishing **wrong tax law** (a special-rate cut that never happened and a P&M-on-dwelling claim that s.35 bars), and it **omits the headline 2026 measure** (40% FYA) that is the policy quid-pro-quo for the WDA cut it does mention. The rewrite's first two jobs are correctness; the third is depth (hybrid rate, reducing-balance worked schedule, pool-allocation mechanics) so the page becomes the definitive specialist rate-lookup-plus-application page that GOV.UK's bare rate table is not.

---

## Current page snapshot (Stage 2, read source markdown + frontmatter)

**Filesystem source read (`writing-down-allowance-rates.md`, 171 lines):**
- **Word count:** ~1,882 (body)
- **H2 outline (13 H2 + 2 H3):**
  1. What Are Writing Down Allowances?
  2. Current Writing Down Allowance Rates (2026/27), *with H3 Main Pool vs Special Rate Pool*
  3. How Writing Down Allowances Apply to Property Investors, *with H3 Example Calculation*
  4. Structures and Buildings Allowance
  5. Changes to Writing Down Allowance Rates: What Changed in 2026, *with H3 Annual Investment Allowance (AIA)*
  6. First-Year Allowances for Zero-Emission Assets
  7. Practical Strategies for Property Investors
  8. Common Mistakes When Claiming Writing Down Allowances
  9. Record Keeping for Writing Down Allowances
  10. Writing Down Allowances for Different Property Types
  11. Interaction with Section 24
  12. Frequently Asked Questions *(empty, intro line only, no rendered Q&A)*
  13. Sources *(4-item list, 2 weak, see Authority links)*
- **metaTitle:** "Writing Down Allowance Rates: 2026 Guide for UK Landlords" (56 chars, OK length)
- **metaDescription:** "Understand writing down allowance rates for UK property investors. Main pool 14%, special rate 4% from April 2026. How to claim capital allowances." (**carries the fabricated "special rate 4%"**, must be corrected)
- **h1:** "Writing Down Allowance Rates: A Complete Guide for UK Property Investors"
- **frontmatter `summary`:** repeats "the special rate pool fell from 6% to 4%" (**fabricated, must be corrected**)
- **FAQ count (frontmatter):** 4 (FAQ #1 and #4 both assert the fabricated 4% special rate; FAQ #2 asserts s.35-barred residential claims). Target 12-14, all corrected.
- **Worked examples:** 1 (the £20k heating-system example, which uses the fabricated 4% rate and is internally arithmetically muddled, line 79 says "remaining balance of £19,200 (or £19,200 under the new rate)").
- **Inline CTAs:** 0 `<aside>` CTAs (only two inline `/services` + `/about` text links).
- **Outbound authority links:** 4 (ref-1 GOV.UK rates-and-pools = good; ref-2 ICAEW Feb-2026 = usable secondary; **ref-3 `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` = dead-looking shortlink, drop**; **ref-4 ACCA 2022 ezine carrying the abandoned Spring-Statement-2022 proposal = drop**).
- **Internal links:** 3 (property-investment-tax pillar; buy-to-let-limited-company pillar; `/services` + `/about`). **Zero links to the capital-allowances cluster siblings**, a structural miss given the dense §25 family on-site.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; body must NOT add manual FAQ schema).
- **Editorial leak:** literal placeholder `[from MTD article]` at body line 137 in the Record Keeping section. **Must be removed.**
- **Last meaningful edit:** 2026-05-20 (`dateModified`).

---

## GSC angle (last 90 days)

**From the diagnosis hand-off (cross-query "writing down allowance" family):**
- This page is the **top on-site owner** of the rate query family: **14 impressions, position 26.5**, ahead of sibling `writing-down-allowance-cars` (9 impr, pos 26.0).
- The cluster **pillar** (`capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework`) has **ZERO GSC presence** for any of these queries, it is a four-axis decision-framework page, not a rates page.
- **Grep for inbound internal links to this slug returned only the file itself: zero internal inbound links.** Equity is purely the organic query footprint, which this page holds.

**Read:** absolute volume is low (page 3, pre-correction) and there is no internal-link support, so this is partly an `INVISIBLE` page. But it is the family's strongest page, and the queries are dense, transactional, and rate-specific. The realistic post-rewrite target is to climb from page 3 toward page 1-2 on the exact rate-lookup queries by (a) being correct where GOV.UK is bare, (b) adding the hybrid-rate + worked-schedule depth no competitor carries, and (c) wiring inbound links from the pillar and siblings so the page stops being orphaned.

**Execution session:** pull live `gsc_query_data` for the slug (`python -m optimisation_engine.track2.pull_page_data --slug writing-down-allowance-rates`) to refresh the query list and confirm the page family still leads before committing the meta rewrite.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined Stage 2)

**Primary: WRONG_ADVICE at blocking severity (two distinct errors).**

1. **Special-rate fabrication.** The page asserts the special rate pool "fell from 6% to 4% from April 2026" in the frontmatter `summary`, the `metaDescription`, FAQ #1, FAQ #4, the example calculation, and three body paragraphs. **This is false.** The GOV.UK measure page states verbatim: "This measure does not change the WDA on the special rate pool which is currently 6%." (verified 2026-05-30). CAA 2001 **s.104D** still reads "6% of the amount by which AQE exceeds TDR" on legislation.gov.uk (verified 2026-05-30; the only special-rate change in the section's history was the FA 2019 substitution from 8% to 6%). This also contradicts **LOCKED house position §25.6** (special-rate pool 6% WDA, verified 2026-05-23). **The special rate stays at 6%. Every "4%" on the page is wrong and must be removed.**

2. **s.35 residential-claim error.** FAQ #2 ("Can residential landlords claim writing down allowances? Yes... boilers, heating systems, lifts, and furniture in furnished properties") and body line 49 ("writing down allowances apply to assets such as boilers, heating systems, lifts" for rental property) are wrong. **CAA 2001 s.35** bars plant-and-machinery allowances on plant provided for use in a **dwelling-house** in an ordinary property business. Residential in-dwelling items are relieved through **Replacement of Domestic Items Relief (ITTOIA 2005 s.311A)**, not capital allowances. The narrow exception is plant in the **communal common parts** of a multi-let building / HMO (see house position §25.10 and the on-site canonical `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`). This is the cluster's central misconception (§25.10 "do not write": "Plant in a residential dwelling is claimable under AIA" = false). The rewrite must **correct it, not propagate it.**

**Primary: STALE_FACTS (omission + dated framing).**

3. **Missing 40% FYA.** The page entirely omits the **new permanent 40% first-year allowance for main-rate plant and machinery**, effective for expenditure incurred from **1 January 2026**, available to **all businesses including unincorporated** ones, excluding **cars, second-hand assets, and overseas leasing** (GOV.UK measure page, verified 2026-05-30; enacted by **Finance Act 2026 s.29**). This is the single biggest 2026 capital-allowances development and the policy quid-pro-quo for the WDA cut. It must be added prominently, ideally a dedicated H2 and a row in the rates table.

4. **Self-contradiction on main rate.** Body line 53 says the main rate "changed from 18% to 14%"; line 57 then says "the main rate writing down allowance for general pool assets **remains at 18% for 2026/27**." Internally incoherent. The correct position: 18% before, **14% for the main pool from 1 April 2026 (CT) / 6 April 2026 (IT)**, with a **hybrid/transitional rate** for chargeable periods straddling the change date (the page mentions no hybrid rate at all). Source: CAA 2001 **s.56** (now 14%, substituted by FA 2026 s.28(1), verified 2026-05-30) + the GOV.UK measure page's hybrid-rate paragraph.

5. **Stale SBA phrasing.** "Annual rate of 3% in 2020/21 (previously 2%)" reads dated. Reframe as the current 3% straight-line rate (s.270AA(5), uplifted from 2% by FA 2020 with effect from 1 April 2020 CT / 6 April 2020 IT), unaffected by the 2026 WDA changes (house position §25.4 / §25.8).

6. **Dead directional context.** Body line 93 carries the abandoned Spring-Statement-2022 18%→20% / 6%→8% proposal (via the 2022 ACCA ezine, ref-4) as if it were live directional context. That proposal was scrapped. Remove the paragraph and the reference.

**Secondary: THIN_DEPTH + STRUCTURE.** 1,882 words; one muddled worked example; an empty body FAQ block; no rates table at top; no reducing-balance multi-year schedule; no hybrid-rate worked example; only 3 internal links and zero to the §25 cluster.

**Tertiary: INVISIBLE + CTR_FAIL.** Page 3 with a meta that advertises the fabricated 4%. Correct meta + depth + inbound links to lift visibility.

**Load-bearing fix sequence (ordered by ROI / consequence):**

1. **Strip every "4%" special-rate assertion** (frontmatter `summary`, `metaDescription`, FAQ #1, FAQ #4, example, body). State special rate **stays at 6%** with the s.104D + GOV.UK measure citation. (Correctness, highest consequence.)
2. **Correct the s.35 residential FAQ + body.** Replace with the accurate position: in-dwelling plant is barred (s.35); use Replacement of Domestic Items Relief (ITTOIA 2005 s.311A); the narrow exception is HMO/communal common parts; forward-link the HMO-common-parts canonical.
3. **Add the 40% FYA** as a prominent H2 + rates-table row (1 January 2026; all businesses; excludes cars/second-hand/overseas leasing; FA 2026 s.29).
4. **Fix the main-rate self-contradiction + add the hybrid/transitional rate** with a worked straddling-period example.
5. **Rates table at top** (snippet-bait): main pool 14% / special rate 6% / SBA 3% / AIA £1m / FYA 40% / EV FYA 100%, each with effective dates.
6. **Depth lift to ~3,200 words**: reducing-balance multi-year WDA schedule worked example; pool-allocation mechanics (main vs special, £100k long-life threshold); AIA-then-WDA interaction; balancing allowance/charge on disposal cross-link; commercial-vs-residential availability.
7. **FAQ 4 → 12-14**, each targeting a specific rate-lookup query verbatim; rebuild the body FAQ block OR remove the empty `<h2>FAQ</h2>` so the rendered page is not structurally thin.
8. **Remove the `[from MTD article]` leak.**
9. **Rebuild the Sources list**: GOV.UK measure page + GOV.UK rates-and-pools + legislation.gov.uk s.56 / s.104D / s.35 + HMRC CA manual anchors; drop the dead aka.hmrc shortlink and the 2022 ACCA ezine.
10. **Wire inbound + outbound internal links** to the §25 cluster (pillar up; cars / integral features / AIA 1m / SBA / balancing-charge / HMO-common-parts across).
11. **Meta rewrite** (corrected + planning-led).

---

## Competitor URLs (Stage 2, verified live 2026-05-30 via WebFetch)

| URL | Status | Rates table | Coverage signals | Borrow / differentiate |
|---|---|---|---|---|
| https://www.gov.uk/work-out-capital-allowances/rates-and-pools | 200 OK | Yes (prose + list) | Main pool **14% from April 2026, 18% before**; special rate **6%**; £100k long-life threshold ✓; AIA/40% FYA on sibling pages | **Borrow:** the authoritative bare rates as the correctness baseline. **Differentiate:** GOV.UK gives no worked reducing-balance schedule, no hybrid-rate example, no s.35 application to landlords, no pool-allocation walkthrough, that is our specialist layer. |
| https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances | 200 OK | No | Verbatim "does not change the WDA on the special rate pool which is currently 6%"; 14% main from 1 Apr 2026 (CT) / 6 Apr 2026 (IT); **40% FYA from 1 Jan 2026, all businesses, excludes cars/second-hand/overseas leasing**; **hybrid rate** for straddling periods | **Borrow:** the headline measure framing + the hybrid-rate concept. This is the load-bearing correction source. **Differentiate:** apply it to a property portfolio with numbers. |
| https://kpmg.com/uk/en/insights/tax/tmd-budget-new-first-year-allowance.html | (verify at execution per §16.31) | n/a | Practitioner commentary on the 40% FYA + WDA cut as a package | **Borrow:** the "quid-pro-quo" framing (FYA up, WDA down). **Differentiate:** landlord-specific, not generic-business. |
| https://hillierhopkins.co.uk/insight-posts/changes-to-capital-allowances/ | (verify at execution per §16.31) | n/a | Practitioner explainer confirming special rate unchanged at 6% + 14% main + 40% FYA | **Borrow:** corroboration that special rate is unchanged (a third independent source against the fabrication). **Differentiate:** depth + worked schedule. |

**Competitor depth ceiling for this query class:** GOV.UK is bare-rate authoritative (no worked schedules, no FAQs, no statute citations rendered); practitioner pages are 800-1,500 words, 0-2 worked examples, 0 FAQs. Our ~3,200-word target with a rates table, 3-4 worked examples (incl. a hybrid-period example and a multi-year reducing-balance schedule), 12-14 FAQs, and 5-6 verified legislation.gov.uk citations puts us decisively best-in-class, and uniquely **correct on the special rate** where the prior version of our own page was wrong.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (the §25 capital-allowances cluster mapped at Wave 6 / Wave 7; this page is residual).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | writing-down-allowance-rates | REWRITE | self, rewrite in place; slug + category kept |
| Cluster pillar (Wave 6/7) | capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework | Four-axis decision framework | **Forward-link UP.** Pillar has ZERO GSC for rate queries; this page owns them. Do NOT collapse into it (see equity guard below). |
| Sibling | writing-down-allowance-cars | Car-specific WDA (single-asset pools, emissions bands) | **Forward-link ACROSS.** Keep car depth on that page; do NOT duplicate here. (Note: cars sibling is in category `Section 24 & Tax Relief`.) That weaker page (9 impr) could later forward-link INTO this rewritten rates page. |
| Sibling | integral-features-capital-allowances | Special-rate-pool integral-features depth | **Forward-link ACROSS** from the special-rate-pool section. |
| Sibling | aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010 | AIA £1m cap + association rules | **Forward-link ACROSS** from the AIA-vs-WDA interaction section. |
| Sibling | structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward | SBA 3% claim mechanics | **Forward-link ACROSS** from the SBA section (replaces the page doing its own thin SBA explainer). |
| Sibling | balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics | Disposal / balancing event mechanics | **Forward-link ACROSS** from the reducing-balance + disposal mention. |
| Sibling | hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property | s.35 exception (HMO communal parts) | **Forward-link ACROSS** from the corrected s.35 FAQ, this is where the narrow exception is fully treated. |
| Sibling | full-expensing-capital-allowances | s.45S company-only full expensing | Optional cross-link from the FYA section (full expensing is the 100% companion to the new 40% FYA; keep depth on that page). |

**Collapse-direction equity guard (per §16.T2 / Risk register #9):** a redirect-collapse would 301 this page INTO the pillar. **REJECTED.** This page is the **stronger page for this exact intent** (it ranks for the rate queries; the pillar does not). Collapsing it would destroy the rate-query equity and merge a distinct transactional intent into a framework page, a reversed-equity 301. The deterministic floor (`scripts/track2_collapse_guard.py`) would flip such a proposal back to REWRITE. **Conclusion: REWRITE, not collapse.**

**Distinctness on rewrite:** keep this page laser-focused on the **RATE LOOKUP + 2026 changes** (14% main from Apr 2026, 6% special **unchanged**, the new 40% FYA, hybrid/transitional rate, reducing-balance mechanics, worked WDA calc for a property investor). Forward-link UP to the pillar for the four-axis framework and ACROSS to the siblings above. Cars WDA stays on the cars page; AIA depth stays on the AIA page; SBA depth stays on the SBA page; s.35 exception depth stays on the HMO-common-parts page. This page is the rate-mechanics hub.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **Pillar (up):** `capital-allowances-property-investors-complete-pillar-2026-27-caa-2001-decision-framework` (category `property-types-and-specialist-tax`), forward-link up; this rewrite should request a reciprocal inbound link from the pillar's rates section to close the orphan gap.
- **Cars sibling (across):** `writing-down-allowance-cars` (category `section-24-and-tax-relief`), link across; note the different category in the path.
- **Integral features (across):** `integral-features-capital-allowances`, from the special-rate-pool section.
- **AIA 1m cap (across):** `aia-1m-cap-property-investors-allocation-strategy-and-association-rules-cta-2010`, from the AIA-vs-WDA interaction section.
- **SBA (across):** `structures-and-buildings-allowance-sba-3-percent-claim-mechanics-fa-2018-onward`, from the SBA section.
- **Balancing allowance/charge (across):** `balancing-allowance-balancing-charge-on-disposal-property-capital-allowances-mechanics`, from the reducing-balance / disposal paragraph.
- **HMO common parts / s.35 (across):** `hmo-common-parts-capital-allowances-s35-claim-mechanics-multi-tenant-property`, from the corrected s.35 FAQ.
- **Full expensing (optional):** `full-expensing-capital-allowances`, from the FYA section.
- **Section 24 (retain):** the existing "Interaction with Section 24" section can keep an internal link, but verify the target slug (`claim-mortgage-interest-rental-property-uk-section-24` is the rewritten Section 24 applied page).
- **BTL incorporation (retain):** `buy-to-let-limited-company-complete-guide-uk`, already linked; keep for the incorporation-transfer-of-pools mention.

**All internal-link slugs must be canonicalised at write time** via the writer's Normalise stage (`slug_resolver.py`) per §16.T1 / §16.T5, a slug has exactly one real category; never guess the path prefix.

---

## House-position references (Stage 1)

- **§25.1 Qualifying activities + s.35 dwelling-house restriction** [LOCKED 2026-05-23], the s.35 bar on P&M allowances for plant in a dwelling-house is the load-bearing correction. Verify s.35 wording at write time.
- **§25.3 AIA (ss.51A-51N, £1m permanent from 1 April 2023)** [LOCKED 2026-05-23], for the AIA-vs-WDA interaction section.
- **§25.4 SBA (Part 2A, ss.270AA-270IH, 3% from 1 Apr/6 Apr 2020)** [LOCKED 2026-05-23], for the corrected SBA section (3%, not "3% in 2020/21").
- **§25.5 First-Year Allowances (ss.39-51)** [LOCKED 2026-05-23], the existing FYA structure (EV cars s.45D, EV charging s.45EA, full expensing s.45S). **NOTE: the NEW 40% FYA (FA 2026 s.29) post-dates the 2026-05-23 lock and is NOT yet recorded in §25.5/§25.8.** Flag to `track2_site_wide_flags.md` for a future-wave HP lock; cite legislation.gov.uk + GOV.UK measure page directly in the brief meanwhile.
- **§25.6 Disposal mechanics + pool concept (s.55, s.56, s.61, s.104D)** [LOCKED 2026-05-23], confirms **main pool 18% / special-rate pool 6%** at lock date. **NOTE: s.56 main rate is now 14% (FA 2026 s.28), which post-dates the lock; §25.6 records 18%.** This is a stale-but-not-wrong lock (it was correct at 2026-05-23 for pre-Apr-2026 periods); flag for HP update. Special-rate **6% is unchanged** and matches the lock exactly.
- **§13 Do-not-write list** [LOCKED], NO pricing; NO real client names; anonymised social proof only.
- **House-position deference:** Track 2 NEVER edits `house_positions.md`. The §25.5/§25.6/§25.8 updates for the 40% FYA + 14% s.56 substitution are flagged to a future-wave manager, NOT made by this brief.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict, F-(next) WRONG_ADVICE on a published page.** The live page contradicts LOCKED house position **§25.6** (special-rate pool 6% WDA) by asserting the special rate fell to 4%, and contradicts **§25.10 "do not write"** ("Plant in a residential dwelling is claimable under AIA" = false) by telling residential landlords they can claim WDAs on in-dwelling boilers/heating/lifts/furniture. Both are reader-misleading on a live tax page.

**Also surfaced, house position currency gap (NOT a page error, a lock-currency gap):**
- §25.6 records s.56 main rate at 18%; the enacted FA 2026 s.28 substitution to 14% (effective 1 Apr 2026 CT / 6 Apr 2026 IT) post-dates the 2026-05-23 lock. The lock is not wrong (18% was correct for pre-Apr-2026 periods) but needs a forward-dated update.
- §25.5 / §25.8 do not yet record the new 40% FYA (FA 2026 s.29, from 1 Jan 2026). Needs a future-wave HP lock.

Flag to `track2_site_wide_flags.md` as:

> **F-(next) | 2026-05-30 | HIGH | writing-down-allowance-rates | WRONG_ADVICE + STALE_FACTS | (1) Published page asserts special-rate WDA fell 6%→4% from Apr 2026, FALSE; GOV.UK measure page + CAA 2001 s.104D confirm special rate UNCHANGED at 6% (verified 2026-05-30); contradicts LOCKED §25.6. (2) Published page tells residential landlords they can claim WDAs on in-dwelling boilers/heating/lifts/furniture, barred by CAA 2001 s.35; contradicts §25.10 do-not-write; correct route is ITTOIA 2005 s.311A RDIR + HMO-common-parts exception. (3) Page omits the new 40% FYA (FA 2026 s.29, from 1 Jan 2026). (4) HP currency gaps: §25.6 records s.56 at 18% (now 14% per FA 2026 s.28); §25.5/§25.8 do not record the 40% FYA, recommend future-wave HP update (Track 2 cannot lock).**

**Execution session MUST:** re-verify s.56 (14%), s.104D (6%), s.35 (dwelling-house bar), and FA 2026 c.11 Royal Assent against legislation.gov.uk before asserting any rate as in-force law (the F-37 Bill-vs-enacted pattern).

---

## Authority links worth considering (Stage 2, verified at draft time where marked)

| URL | Verification status | Use case |
|---|---|---|
| https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances | **200 OK + content verified 2026-05-30** ("does not change the WDA on the special rate pool which is currently 6%"; 14% main; 40% FYA from 1 Jan 2026; hybrid rate) | The load-bearing correction source, cite for the special-rate-unchanged statement, the 40% FYA, and the hybrid rate. |
| https://www.gov.uk/work-out-capital-allowances/rates-and-pools | **200 OK + content verified 2026-05-30** (main pool 14% from April 2026 / 18% before; special rate 6%; £100k long-life threshold) | Cross-reference for the current rate table and pool-allocation threshold. |
| https://www.legislation.gov.uk/ukpga/2001/2/section/56 | **200 OK + verified 2026-05-30**, operative wording now "**14%** of the amount by which AQE exceeds TDR"; amended by **Finance Act 2026 s.28(1)** | Statutory base for the 14% main-pool WDA. |
| https://www.legislation.gov.uk/ukpga/2001/2/section/104D | **200 OK + verified 2026-05-30**, operative wording "**6%** of the amount by which AQE exceeds TDR"; title "Writing-down allowances at 6% or 10%"; last substituted FA 2019 | Statutory base for the special-rate **6% (unchanged)**, the citation that kills the fabrication. |
| https://www.legislation.gov.uk/ukpga/2001/2/section/35 | Verify operative wording at execution | Statutory base for the dwelling-house P&M bar (the s.35 correction). |
| https://www.legislation.gov.uk/ukpga/2026/11/contents | **200 OK + verified 2026-05-30**, Finance Act 2026 (2026 c. 11); **s.28 "Main rate of writing-down allowances for expenditure on plant or machinery"**; **s.29 "First-year allowance for main rate expenditure on plant or machinery"** | Enacting Act for the 14% WDA cut + 40% FYA. **Confirm Royal Assent date (18 March 2026 per program §16 catch count) at execution.** |
| https://www.legislation.gov.uk/ukpga/2001/2/section/270AA | Verified 2026-05-23 via house position §25.4 | SBA 3% statutory base (s.270AA(5)). |
| https://www.legislation.gov.uk/ukpga/2005/5/section/311A | Verify at execution | ITTOIA 2005 s.311A Replacement of Domestic Items Relief, the correct route for in-dwelling residential items. |
| https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual | Verify exact CA section at execution (CA23220 WDA rates / CA20000 P&M intro), do NOT guess manual numbers (F-7 hallucination discipline) | HMRC CA manual interpretive overlay. |

**Drop from current Sources:** ref-3 `http://aka.hmrc.gov.uk/capital-allowances/fya/water.htm` (dead-looking shortlink) and ref-4 the 2022 ACCA ezine (carries the abandoned Spring-Statement-2022 18%→20% / 6%→8% proposal). Keep ref-1 (GOV.UK rates-and-pools); ICAEW ref-2 is usable as a secondary practitioner source if its content is re-confirmed current.

**(Execution session selects 5-6 to actually cite in body as `<sup>` references.)**

---

## Section-by-section content plan to ~3,200 words

Target: **11-13 H2s, ~3,200 body words, 12-14 FAQs, rates table at top, 3-4 worked examples, 2 inline `<aside>` CTAs.**

1. **Intro (120-160 words).** What writing down allowances are and why the rate matters; state up front: main pool **14% from April 2026** (18% before), special rate pool **6% (unchanged)**, plus the new **40% first-year allowance** from 1 January 2026. Kill the fabrication in the first paragraph.
2. **Rates table at top (snippet-bait).** Allowance | Rate | From | Statute. Rows: Main pool WDA 14% (1 Apr 2026 CT / 6 Apr 2026 IT, s.56) · Special rate pool WDA 6% (unchanged, s.104D) · 40% FYA (1 Jan 2026, all businesses, excl. cars/second-hand/overseas leasing, FA 2026 s.29) · AIA 100% up to £1m (s.51A) · SBA 3% straight-line (s.270AA) · EV car / charging-point FYA 100% (s.45D / s.45EA). ~120 words around it.
3. **What are writing down allowances? (250 words).** Reducing-balance mechanism; fallback after AIA/FYA; pool concept (main / special / single-asset). Forward-link the pillar.
4. **Current main-pool rate: 18% to 14% (300 words).** The correct, non-contradictory position. 18% before, 14% from 1 Apr 2026 (CT) / 6 Apr 2026 (IT). Cite s.56 + FA 2026 s.28. **Remove the "remains at 18%" contradiction.** Explain "new additions vs existing pool" correctly: the rate change applies to the WDA computed for chargeable periods from the change date, on the whole main pool (not a per-asset vintage split, the page's "assets already in the pool continue at 18%" framing is itself muddled and should be corrected to the period-based hybrid treatment).
5. **The hybrid / transitional rate (300 words + worked example).** For chargeable periods straddling 1 Apr 2026 (CT) / 6 Apr 2026 (IT), a hybrid main-pool rate applies, time-apportioned between 18% and 14%. Worked example: a company with a 31 December year end (period 1 Jan 2026 – 31 Dec 2026) gets a blended rate. (New content, no competitor carries this.)
6. **Special rate pool: 6%, unchanged (260 words).** Integral features (s.33A), long-life assets, thermal insulation; £100k long-life threshold. **State explicitly the special rate did NOT change in 2026** and cite s.104D + the GOV.UK measure verbatim. Forward-link integral-features sibling.
7. **The new 40% first-year allowance (320 words).** From 1 January 2026; main-rate P&M; all businesses (incl. unincorporated); excludes cars, second-hand assets, overseas leasing; FA 2026 s.29. How it interacts with AIA and WDA (FYA up, WDA down, the quid-pro-quo). Cross-link full-expensing (the 100% company-only companion). **Inline `<aside>` CTA #1 here.**
8. **AIA vs writing down allowances (240 words).** £1m AIA (s.51A) gives 100% in-year; WDA spreads the balance at 14%/6%. Correct the current FAQ #3 framing. Forward-link AIA 1m-cap sibling.
9. **Worked example: reducing-balance schedule (280 words + table).** A landlord/SPV spends, say, £50,000 on qualifying main-pool P&M for a commercial unit: AIA first (or 40% FYA on the relevant tranche), then a 3-4 year reducing-balance WDA schedule at 14% showing the diminishing annual claim. (Replaces the muddled £20k example; uses the CORRECT 6% for any special-rate item.)
10. **Can residential landlords claim? The s.35 reality (300 words).** **The corrected core misconception.** s.35 bars P&M allowances on plant in a dwelling-house in an ordinary property business; in-dwelling items (boilers, white goods, furniture) go through Replacement of Domestic Items Relief (ITTOIA 2005 s.311A), not capital allowances. Narrow exception: communal common parts of an HMO / multi-let block. Forward-link HMO-common-parts sibling. **Inline `<aside>` CTA #2 here.**
11. **Structures and buildings allowance (200 words).** 3% straight-line (s.270AA), commercial only, unaffected by the 2026 WDA changes; residential excluded (s.270CF). Reframe the stale "3% in 2020/21" to current 3%. Forward-link SBA sibling.
12. **Disposal: pools, balancing allowances and charges (200 words).** Reducing-balance pools and what happens on disposal (s.55/s.61 disposal values; balancing allowance/charge). Forward-link balancing-allowance/charge sibling.
13. **Planning + timing (220 words).** Order of reliefs (AIA / 40% FYA first, then WDA on the balance); timing around the 1 Apr / 6 Apr 2026 change; pool classification accuracy; incorporation transfer of pools (link BTL Ltd-Co). NO pricing.
14. **Record keeping (160 words).** Pool register; MTD for Income Tax mandation schedule (link the MTD page). **Remove the `[from MTD article]` placeholder.**
15. **FAQ block (rebuilt) + Sources.** Either render 12-14 Q&A in body (HTML `<dl>`/`<h3>` per site convention) matching the frontmatter `faqs:` array, OR remove the empty `<h2>FAQ</h2>` so the page is not structurally thin. Rebuild Sources with the verified authority links.

---

## Statute spine (every section number with its Act, verify at write time)

| Statute | What it governs | Verified status (draft 2026-05-30) |
|---|---|---|
| **CAA 2001 s.56** | Main-pool WDA = **14%** (substituted by FA 2026 s.28(1); 1 Apr 2026 CT / 6 Apr 2026 IT) | Verified live, operative wording reads 14% |
| **CAA 2001 s.104D** | Special-rate-pool WDA = **6%** (unchanged; title "Writing-down allowances at 6% or 10%") | Verified live, operative wording reads 6%; the citation that disproves the fabrication |
| **CAA 2001 s.35** | Bars P&M allowances on plant in a **dwelling-house** (ordinary property business) | Cited in house position §25.1/§25.10; verify wording at execution |
| **CAA 2001 s.33A** | Integral features → special-rate pool | Per house position §25.6/§25.9; verify at execution |
| **CAA 2001 s.51A** | AIA maximum **£1,000,000** (permanent from 1 Apr 2023, F(No.2)A 2023 s.8) | Verified via house position §25.3 (2026-05-23) |
| **CAA 2001 s.270AA** | SBA **3%** straight-line (s.270AA(5); FA 2020 uplift from 2%; 1 Apr/6 Apr 2020) | Verified via house position §25.4 (2026-05-23) |
| **CAA 2001 s.45D / s.45EA** | EV car / EV charging-point FYA **100%** | Per house position §25.5; verify sunset dates at execution |
| **CAA 2001 s.45S** | Full expensing **100%** (company-only; companion to the 40% FYA) | Per house position §25.5 |
| **CAA 2001 s.55 / s.61** | Pool entitlement + disposal events/values (balancing allowance/charge) | Per house position §25.6 |
| **Finance Act 2026 (2026 c. 11) s.28** | Substitutes the 14% main-pool WDA into CAA 2001 s.56 | Verified, FA 2026 c.11 enacted; s.28 heading confirmed; **confirm Royal Assent 18 Mar 2026 at execution** |
| **Finance Act 2026 (2026 c. 11) s.29** | Introduces the new **40% first-year allowance** for main-rate P&M (from 1 Jan 2026) | Verified, s.29 heading confirmed on FA 2026 contents |
| **ITTOIA 2005 s.311A** | Replacement of Domestic Items Relief (correct route for in-dwelling residential items) | Verify wording at execution |
| **Finance Act 2019** | Prior special-rate substitution **8% → 6%** (the only special-rate change; context for "unchanged") | Per s.104D amendment history (verified 2026-05-30) |

**F-37 / Bill-vs-enacted discipline:** FA 2026 c.11 is confirmed enacted (Royal Assent 18 March 2026 per program §16 13-consecutive-catch count); the WDA cut (s.28) and 40% FYA (s.29) are therefore **stated as in-force law**, not Bill-form-hedged. Re-confirm at write time per §16.T1.

---

## Universal rules, inherited from parent program (do not restate)

(Pointer block per `TRACK2_PROGRAM.md` §4 section 13. Voice rules, lead-gen architecture, CSS-in-markdown, FAQs-and-schema, anti-templating, six-check quality bar, statute-citation discipline (F-8: content can be removed by amendment even when URL is live, TCGA s.4 / FA 2019 is the canonical case; here the live-and-correct analogue is s.56 substituted by FA 2026), and ALL §16 lessons, inherited from `NETNEW_PROGRAM.md §4 / §7 / §10 / §16` + `competitor_rewrite_playbook.md §4.3 / §5 / §6`.)

**Critical for THIS brief:** NO pricing / fees on-page (lead-gen handoff model; Decision E: even soft "£800-£1,500 general-market" fee comparisons are a pricing-leak, none currently on this page, keep it that way). NO real client names; anonymised social proof only. NO em-dashes anywhere (use commas, parentheses, full stops, middle dots). LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicate. House-position correctness (special rate 6%, s.35 bar) is MANDATORY and is the load-bearing job.

---

## 19-step workflow, inherited from parent program (Wave 5) with Track 2 deltas

(Inherits the full 19-step legacy-rewrite workflow from `NETNEW_PROGRAM.md §7` + the gold-reference workflow in the cgt-rates trial brief. Track 2 deltas: Step 9 = rewrite markdown at existing path; Step 12 = confirm no redirect (none, REWRITE, equity guard rejects collapse); Step 13 = update/insert `monitored_pages` row.)

**Load-bearing pre-rewrite verification (do FIRST):**
1. Read `house_positions.md` §25.1, §25.3-§25.6, §25.8-§25.10 + §13 in full.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → 🔵 at execution).
3. **Verify against legislation.gov.uk at write time:** s.56 (14%), s.104D (6%, the fabrication-killer), s.35 (dwelling-house bar), FA 2026 c.11 s.28 + s.29 + Royal Assent date. This is the load-bearing step; the whole rewrite turns on it.
4. Re-fetch the 2 GOV.UK URLs to confirm liveness + the verbatim "does not change the WDA on the special rate pool which is currently 6%" line.
5. Read the current source file in full; read the 6-8 §25 sibling pages for cross-link parity + to avoid duplicating their depth.
6. Pull live GSC for the slug to confirm the page family still leads before the meta rewrite.
7. **Rewrite markdown at existing path** (NOT new file). Preserve slug + canonical + category; update `dateModified` + `sourcesVerifiedAt` to write date.
8. Run the deterministic QA chain per §16.T5: `track2_independent_qa.wf.js` recomputes every worked example + WebFetches every cite; `scripts/qa_verdict.py` derives `all_clear`; `scripts/predeploy_gate.py` HARD-blocks on any wrong arithmetic / wrong-Act citation / 404 link / surviving "4%" special-rate string.
9. `cd Property/web && npm run build`, must pass.
10. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve via `slug_resolver.py`; **grep for "4%" near "special rate" returns 0**; **grep for `[from MTD article]` returns 0**.
11. Update `monitored_pages` (180-day window from rewrite date given the INVISIBLE baseline, per F-11 recommendation) + IndexNow.
12. Commit on `main`; update tracker (✅ executed), flags (F-(next)), §3 heartbeat.

---

## Meta plan

- **metaTitle (≤ 62 chars):** drop the fabricated "special rate 4%". Candidates:
  - "Writing Down Allowance Rates 2026/27: 14% Main, 6% Special" (57)
  - "Writing Down Allowance Rates 2026: 14% + 40% FYA Explained" (57)
  - "WDA Rates 2026/27 | 14% Main Pool, 6% Special + 40% FYA" (54)
- **metaDescription (≤ 158 chars):** corrected + planning-led. Candidate: "Writing down allowance rates for 2026/27: main pool 14% from April 2026, special rate pool 6% (unchanged), plus the new 40% first-year allowance. With worked examples." (162, trim to ≤158 at write time, e.g. drop "With worked examples").
- **h1:** keep "Writing Down Allowance Rates: A Complete Guide for UK Property Investors" (clear, intent-matched) OR tighten to lead with the rate: "Writing Down Allowance Rates 2026/27 for UK Property Investors". Execution picks one; must NOT carry "4%".
- **frontmatter `summary`:** rewrite to: main pool dropped 18%→14% from April 2026; special rate pool **unchanged at 6%**; plus the new 40% first-year allowance from 1 January 2026. (Kills the fabricated 4% in the summary.)

---

## Per-page work-log (for execution session)

(Empty template, populated at execution time.)

### House-position alignment
- §25.6 special-rate 6% (fabrication removed): __
- §25.1/§25.10 s.35 dwelling-house bar (FAQ + body corrected): __
- §25.4 SBA 3% (stale phrasing corrected): __
- §25.5 + FA 2026 s.29 40% FYA (added): __
- s.56 14% main rate (self-contradiction removed; hybrid rate added): __

### Comparison: before vs after
- Word count: 1,882 → __ (target ~3,200)
- H2 count: 13 (+2 H3) → __
- FAQ count: 4 → __ (target 12-14, all corrected)
- Worked examples: 1 (muddled, fabricated rate) → __ (target 3-4, incl. hybrid-period + reducing-balance schedule)
- Rates table at top: 0 → 1
- Inline CTAs: 0 → 2
- Authority links: 4 (2 weak/dead) → __ (5-6 verified)
- Internal links to §25 cluster: 0 → __ (6-8)
- `[from MTD article]` leak removed: __ (Y/N)
- "4%" special-rate strings remaining: __ (must be 0)

### Statute verification at write time
- s.56 = 14% (FA 2026 s.28): __
- s.104D = 6% (unchanged): __
- s.35 dwelling-house bar: __
- FA 2026 c.11 Royal Assent 18 Mar 2026: __
- s.29 40% FYA: __
- ITTOIA 2005 s.311A RDIR: __

### Flags raised
- F-(next) carried from brief (special-rate fabrication + s.35 wrong advice + 40% FYA omission + HP currency gaps): recorded
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
