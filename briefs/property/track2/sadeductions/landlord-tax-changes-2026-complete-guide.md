# Track 2 brief: landlord-tax-changes-2026-complete-guide

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file, hub/roundup intent; STALE-FACTS + INVISIBLE dominant)
**Source markdown path:** `Property/web/content/blog/landlord-tax-changes-2026-complete-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/landlord-tax-essentials/landlord-tax-changes-2026-complete-guide
**Stage 1 priority:** H (high — the page carries multiple live wrong-advice errors that mislead readers on enacted law; corrective rewrite has real reader value even though the page is currently invisible on GSC)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (no collapse — this page owns the distinct cross-cluster "what is changing for UK landlords in 2026" hub/roundup intent; no sibling owns that hub intent; every candidate collapse target is also near-zero on GSC, so collapsing would be reversed-or-equal-equity and would abandon the hub intent)

> **Tag/category note for execution.** The task-assigned cluster tag is `SelfAssessmentDeductions` (hence the `sadeductions/` brief folder) but the live page is a cross-cluster roundup in category `Landlord Tax Essentials`. This is a cluster-tag/category mismatch. **Keep the category as `Landlord Tax Essentials`** (correct for a hub page); the brief folder tag is an artefact of the dispatch worklist, not a signal to recategorise. Flagged to execution below.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `landlord-tax-changes-2026-complete-guide`. The slug carries the year identifier and the roundup framing ("landlord tax changes 2026"). It is the natural hub URL for the "what is changing this year" intent. No redirect proposed; no slug change.
- **Category:** `Landlord Tax Essentials` (kept). Do NOT move to a Section 24 / Self Assessment cluster despite the `sadeductions` dispatch tag. A changes-hub belongs in the essentials cluster alongside the tax calendar and the income-tax-rates explainer.
- **Gap-mode tag:** `STALE_FACTS` (primary, multiple live wrong-advice errors) + `INVISIBLE` (secondary, 0 impressions / 0 clicks on both Google and Bing) + `THIN_DEPTH` (tertiary, 959 words vs a ~2,700-word hub target) + `STRUCTURE` (no key-dates table, only 4 FAQs, no per-change action points) + `PRICING_LEAK` (one soft fee/value line to strip).
- **"Why this rewrite" angle:** This is NOT a CTR-fail micro-optimisation like the gold-reference CGT-rates page. The dominant problem is that the page (dated 2026-04-10) was written BEFORE the §7 lock update and now states enacted law incorrectly on the single highest-consequence topic on the page: the April 2027 property income tax rates and the Section 24 finance-cost reducer. It frames the 22/42/47 rates as a future "on the horizon" proposal ("scheduled", "coming") when Finance Act 2026 received Royal Assent on 18 March 2026 and enacted them as law (ss.6-7), AND it asserts a higher-rate landlord receives "only 20% relief on mortgage interest" when FA 2026 Sch 1 RAISES the reducer to 22% from 2027/28. The page also carries a wrong MTD quarterly-deadline set, a mis-stated MTD penalty figure, a loose FHL date, and a soft pricing-leak line. The rewrite's first job is correctness; its second is to convert a thin, generic roundup into a genuine curated hub that forward-links the deeper sibling pages (rates, MTD deadline, S24, CGT, SDLT, FHL, Renters' Rights) with a key-dates table and per-change action points, rather than duplicating their depth.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (2026-05-30):**
- **Word count:** ~959 (body).
- **H2 outline (7 sections):**
  1. Making Tax Digital (MTD) for Income Tax
  2. Property Income Tax Rates and Section 24
  3. Capital Gains Tax (CGT) on Property
  4. Stamp Duty Land Tax (SDLT) Surcharge
  5. Operating Through a Limited Company
  6. Abolished Regimes and Legislative Changes
  7. Cash Flow and Professional Support
  8. Key Deadlines and Action Points (closing list, not a table)
- **Meta title:** "Landlord Tax Changes 2026: Every Major Update Explained" (54 chars).
- **Meta description:** "Complete guide to all landlord tax changes 2026 including MTD compliance, new rates, and key deadlines. Essential reading for UK property investors." (146 chars).
- **h1:** "What Are the Major Landlord Tax Changes Coming in 2026?"
- **FAQ count (frontmatter `faqs:`):** 4. (Target 10-14.)
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations anywhere).
- **Internal links:** 5 (MTD deadline page, Section 24 complete guide, CGT complete guide, BTL ltd-co complete guide, /services, /contact, what-does-a-property-accountant-do).
- **Schema present:** Y (FAQPage auto-emitted from the 4-entry frontmatter `faqs:` array).
- **Worked examples / tables:** 0 worked examples, 0 data tables (the key-dates closing block is a bullet list, not a table).
- **Inline CTAs (`<aside>`):** 0.
- **Last meaningful edit (`date`):** 2026-04-10 (predates the §7 FA 2026 enactment lock and the §19/§20 MTD + Renters' Rights verification passes).

**Verbatim error inventory (load-bearing — these are the rewrite's first job):**
- **Line 50 (body) + FAQ #3 + FAQ #4:** asserts 22/42/47 as future ("on the horizon", "scheduled for April 2027", "rates rising to 22%/42%/47% from 2027") AND states a higher-rate landlord "will pay 42% tax on rental profits while only receiving 20% relief on mortgage interest". Both wrong post-FA-2026.
- **Line 39 (body):** MTD quarterly deadlines stated as "5 May, 5 August, 5 November, and 5 February". Wrong filing dates.
- **Line 39 (body):** MTD penalties "starting at £200 per quarter". Wrong penalty mechanic.
- **Line 36 (body):** lists "end-of-period statement (EOPS)" as a discrete obligation — reframe (see §19.6).
- **Line 75 (body):** Renters' Rights "commencement 1 May 2026 (per SI 2026/421)" and "Renters' Rights Act 2025" — date and SI are correct, but the Act-year citation form needs tightening to "2025 c. 26".
- **Line 74 (body):** FHL "abolished from April 2025" — tighten to "6 April 2025".
- **Line 79 (body):** "The cost of professional support is typically outweighed by the tax savings" — PRICING-LEAK (Decision E soft fee/value framing). Strip.

---

## GSC angle (last 90 days) — INVISIBLE page

**Diagnosis-supplied signal (no Supabase pull adds value here — the page is genuinely invisible):**
- **0 impressions / 0 clicks on Google** in the 90-day window.
- **0 impressions / 0 clicks on Bing** (`bing_query_data`).
- Closest-candidate canonicals are themselves near-zero, confirming the whole micro-cluster is low-signal:
  - `income-tax-rates-landlords-2026-27-complete-guide`: 4 impr / pos 2.8 / 0 clk
  - `2027-property-income-tax-rates-landlords-uk` (pillar): 1 impr / pos 83 / 0 clk
  - `making-tax-digital-landlords-april-2026-deadline`: 1 impr / pos 61 / 0 clk
  - `landlord-tax-calendar-2026-27-key-dates`: 12 impr / pos 60.6 / 0 clk
  - `landlord-tax-deductions-uk-2026-complete-list`: 84 impr / pos 51.1 / 0 clk

**Read:** because the page is INVISIBLE, there is no CTR lever to pull and no equity to lose by rewriting in place. The value of this rewrite is (a) correctness — removing live wrong-advice on enacted law that any reader who DOES land here would be misled by — and (b) building a genuine hub that can accrue "what's changing for landlords" roundup impressions over a longer horizon as the corpus matures. Per §16.T2/§16.T4 and the diagnosis equity-guard, INVISIBLE-baseline pages get a longer monitoring window (recommend 180 days from rewrite date, per the F-11 INVISIBLE-baseline convention) because their GSC reads are noise until traffic accrues.

**GA4 engagement signal:** not pulled; on an invisible page GA4 sessions will be ~0 and add no diagnostic value. Skip.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS at high consequence.** The page is a roundup whose entire reason to exist is summarising current law for landlords, and its single most important section (April 2027 rates + Section 24 reducer) states enacted law as a future proposal AND understates the reducer. This is the F-37 Bill-vs-enacted pattern inverted: where prior catches were "do not assert a Bill as enacted", this page does the opposite mistake — it hedges as future/"scheduled" what FA 2026 has actually enacted (Royal Assent 18 March 2026). A reader using this page to plan would conclude (i) the rates are still avoidable/uncertain, and (ii) their finance-cost relief is frozen at 20%. Both conclusions are wrong and would distort incorporation-timing and cash-flow decisions. This dominates the rewrite.

**Secondary: INVISIBLE.** 0/0 on Google and Bing. This shapes the success metric (no CTR target; longer monitoring window) and confirms the cannibalisation safety of an in-place rewrite (no equity to lose, no stronger pair-member to collapse into).

**Tertiary: THIN_DEPTH + STRUCTURE.** 959 words, 4 FAQs, 0 tables, 0 worked figures, 0 authority links, 0 inline CTAs. A credible hub for "what is changing for UK landlords in 2026" needs ~2,700 words, a key-dates table, per-change action points, 10-14 FAQs, 4-7 authority links, and 2 inline CTAs — but as a HUB it forward-links the deeper siblings rather than out-depthing them.

**Quaternary: PRICING_LEAK.** One soft fee/value line (line 79). Strip per Decision E.

**Load-bearing fix sequence (ordered by ROI):**
1. **Correct the April 2027 rates + Section 24 reducer framing** to enacted law per §7. State 22/42/47 as enacted by FA 2026 (Royal Assent 18 March 2026, ss.6-7), England + NI only (Scotland/Wales set their own rates, FA 2026 s.8 / Sch 2), reducer rises 20%→22% from 2027/28 (FA 2026 Sch 1 amending ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B), basic-rate landlords see no new wedge, higher/additional-rate wedge stays 20pp/25pp (does not widen). Delete the "only 20% relief" / "on the horizon" / "scheduled" framing.
2. **Correct the MTD facts:** quarterly filing deadlines are 7 August / 7 November / 7 February / 7 May (§19.6); the £200 penalty is a single fixed penalty at the 4-point threshold under the points-based regime, NOT £200 per quarter (§19.7); reframe EOPS (the End-of-Period Statement and Final Declaration are both due 31 January following year-end per §19.6 — do not present EOPS as a separate mid-year filing the way the page implies; describe it as the year-end true-up alongside the final declaration).
3. **Reposition as a curated hub:** add a key-dates table (the snippet-bait + scannability win) and per-change action points, each forward-linking the deeper sibling page rather than duplicating it.
4. **Body lift to ~2,700 words** with the hub structure: one short section per change (MTD, income-tax rates + S24, CGT, SDLT, incorporation, FHL, Renters' Rights), each ending with a "what to do" action point and a forward link.
5. **FAQ count 4 → 10-14**, each FAQ correcting one of the specific stale errors verbatim (the 22/42/47 enacted-status FAQ, the reducer-rises-to-22% FAQ, the quarterly-deadline FAQ, the £200-penalty FAQ, the Scotland/Wales scope FAQ).
6. **Authority links: 4-7 verified citations** (FA 2026 on legislation.gov.uk for ss.6-8 + Sch 1; gov.uk MTD for Income Tax; gov.uk SDLT residential rates; RRA 2025 on legislation.gov.uk).
7. **Strip the pricing-leak line;** replace with a non-fee "professional support helps you stay compliant and plan ahead" framing that routes to the discovery-call CTA without value/fee comparison.
8. **2 inline `<aside>` CTAs** at conversion moments (after the income-tax-rates/incorporation section; after the key-dates table).

---

## Competitor URLs (Stage 2 — verify live at execution per §16.31)

Targets supplied by diagnosis. Execution session must WebFetch each, confirm 200 status, date-stamp, and replace any dead/permission-denied URL (carry-forward the §16.31 + F-36 discipline; manager 5% sample re-check at quality-gate close).

| URL | What to borrow | What to differentiate against |
|---|---|---|
| https://www.rhodiumaccounting.co.uk/uk-landlord-tax-guide-2026 | Hub structure (one section per change), scannable roundup framing | Likely carries the same stale "April 2027 proposal" framing; we differentiate by stating enacted FA 2026 law + the reducer-rises-to-22% nuance no competitor gets right |
| https://www.simplybusiness.co.uk/knowledge/landlord-tax/buy-to-let-tax-changes/ | Consumer-friendly change list, plain-English action points | Generalist insurer content, no statute spine; we add legislation.gov.uk citations + the England/NI-vs-Scotland/Wales scope split |
| https://sterlingandwells.com/blogs/what-are-the-uk-landlord-tax-changes-2026/ | Topic coverage checklist (confirm we cover every change they do) | Verify their MTD deadline/penalty figures against §19 before borrowing — they are a likely source of the wrong 5th-of-month deadlines |
| https://iwnaccountancy.co.uk/knowledge-hub/uk-landlord-tax-relief-2026-whats-changed-what-still-works/ | "What's changed vs what still works" angle (good hub framing for action points) | Differentiate on the reducer-to-22% correction and the no-new-basic-rate-wedge point, which most relief commentary gets wrong |

**Competitor depth ceiling for this hub class:** roundup guides, generally 1,200-2,200 words, 0-2 statute citations, frequently carrying the stale "April 2027 proposal" framing and/or wrong MTD deadlines. Our ~2,700-word hub with a key-dates table, 10-14 FAQs, 4-7 verified citations, and the correct enacted-law framing is decisively best-in-class on correctness, which is the differentiator that matters on a changes-hub.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (latest refresh; re-read at batch start per §7).

| Source | Slug | Owns intent | Resolution |
|---|---|---|---|
| Residual (own) | landlord-tax-changes-2026-complete-guide | "What is changing for UK landlords in 2026" (cross-cluster roundup/hub) | REWRITE in place — no sibling owns the hub intent |
| Candidate canonical | income-tax-rates-landlords-2026-27-complete-guide (4 impr / pos 2.8 / 0 clk) | "What is the rate" number (2026/27 income tax) | NO collapse — narrower intent, near-zero equity. Forward-link from the income-tax section. |
| Candidate canonical | 2027-property-income-tax-rates-landlords-uk (pillar, 1 impr / pos 83 / 0 clk) | The 2027 rate-rise narrative | NO collapse — narrower intent, near-zero equity. Forward-link from the April 2027 paragraph. |
| Candidate canonical | making-tax-digital-landlords-april-2026-deadline (1 impr / pos 61 / 0 clk) | MTD deadline mechanics | NO collapse — narrower; this page already forward-links it. Keep + deepen the link. |
| Candidate canonical | landlord-tax-calendar-2026-27-key-dates (12 impr / pos 60.6 / 0 clk) | The dated calendar | NO collapse — different intent (full dated calendar vs a changes hub). Forward-link reciprocally; the hub's key-dates table is a SUBSET (the changes only), not the full calendar. |
| Candidate canonical | landlord-tax-deductions-uk-2026-complete-list (84 impr / pos 51.1 / 0 clk) | The deductions checklist | NO collapse — different intent entirely. Forward-link from the income-tax section. |
| Residual (intra) | section-21-abolition-uk-landlord-possession-guide-2026 + renters-rights-act-2026-tax-implications-landlords | Renters' Rights mechanics / tax implications | No collision — this hub references RRA briefly + forward-links the deeper page. |
| Excluded (rewritten / pillar) | section-24-tax-relief-complete-guide / capital-gains-tax-property-complete-guide-uk / buy-to-let-limited-company-complete-guide-uk | S24 / CGT / incorporation depth | No collision — hub references each briefly + forward-links. |

**Equity-guard direction (per §16.T2/§16.T3 deterministic-floor discipline):** there is NO valid collapse target. Every candidate canonical is also near-zero on GSC, so a 301 in any direction would be reversed-or-equal-equity AND would abandon the hub intent (no sibling owns "what is changing this year"). The collapse guard, if run, would return REWRITE for this page. **Conclusion: REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER on cannibalisation** (the only manager flag here is the cluster-tag/category mismatch, noted at top and in flags below — that is a categorisation note, not a cannibalisation conflict).

**Distinctness maintained by** repositioning as a curated changes-hub: a key-dates table (changes only) + per-change action points that forward-link the deeper sibling pages, rather than duplicating their depth. The hub answers "what changed and what do I do about each", the siblings answer "how does change X work in detail".

---

## Closest existing pages (Stage 2 — internal-link targets, all verified live in corpus 2026-05-30)

Forward-link partners (the hub links OUT to each deeper page from the relevant per-change section; reciprocal back-links optional, set by the deeper pages):

- **MTD deadline mechanics:** `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — from the MTD section (already linked; keep + deepen).
- **2026/27 income-tax rates explainer:** `/blog/landlord-tax-essentials/income-tax-rates-landlords-2026-27-complete-guide` — from the income-tax section.
- **2027 rate-rise pillar:** `/blog/landlord-tax-essentials/2027-property-income-tax-rates-landlords-uk` — from the April 2027 paragraph.
- **Section 24 complete guide:** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` — from the S24 paragraph (note: the source links to a non-existent `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` anchor text "Section 24 restrictions" via a different URL — verify the link resolves at execution; this is the correct live target).
- **Landlord tax deductions list:** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` — from the income-tax / "what you can still claim" action point.
- **CGT pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk` — from the CGT section (already linked; keep).
- **Incorporation pillar:** `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk` — from the limited-company section (already linked; keep).
- **FHL abolition:** `/blog/property-types-and-specialist-tax/end-of-the-furnished-holiday-letting-regime` — from the abolished-regimes section (NEW forward-link).
- **Renters' Rights / Section 21 abolition:** `/blog/landlord-tax-essentials/section-21-abolition-uk-landlord-possession-guide-2026` — from the Renters' Rights section (NEW forward-link).
- **Tax calendar:** `/blog/landlord-tax-essentials/landlord-tax-calendar-2026-27-key-dates` — from the key-dates table caption ("for every dated deadline, not just the changes, see the full calendar").
- **SDLT 5% surcharge refunds:** `/blog/property-types-and-specialist-tax/a-complete-guide-to-5-sdlt-surcharge-refund-claims` — optional forward-link from the SDLT section.

---

## House-position references (Stage 1)

Thread these `house_positions.md` sections; cite by §N, never paraphrase the contract. All LOCKED as of the 2026-05-30 read.

- **§3 + §19 MTD for ITSA** [LOCKED; §19 verified vs gov.uk 2026-05-22] — threshold schedule £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028); §19.6 quarterly cycle (7 Aug / 7 Nov / 7 Feb / 7 May; EoPS + Final Declaration both 31 Jan); §19.7 penalty regime (£200 single fixed penalty at the 4-point threshold; late-payment 3%/3%/10% at days 15/30/31 for MTD ITSA).
- **§4 Section 24 finance-cost restriction** [LOCKED] — 20% credit for 2026/27; reducer RISES to 22% from 2027/28 (FA 2026 Sch 1 amending ITTOIA 2005 ss.274AA/274C and ITA 2007 s.399B); basic-rate landlord sees no new wedge; higher/additional-rate relief rises 20%→22% but stays below their rate.
- **§5 CGT on UK residential property 2026/27** [LOCKED] — 18% basic / 24% higher; £3,000 AEA; unchanged for 2026/27. Page is currently correct here; keep.
- **§6 FHL abolition transition** [LOCKED] — abolished 6 April 2025 (tighten the page's loose "April 2025"); former FHL now taxed as standard residential, S24 applies.
- **§7 April 2027 property income tax rates** [LOCKED — but re-verify Royal Assent at write time per F-37 discipline] — 22/42/47 enacted by FA 2026 (Royal Assent 18 March 2026, ss.6-7), effective 6 April 2027, England + NI only (Scotland/Wales set own rates per FA 2026 s.8 / Sch 2). State as enacted law, NOT a proposal/surcharge-to-come/draft. This is the load-bearing correction.
- **§1 SDLT rates and surcharges** [LOCKED] — 5% additional-dwellings surcharge from 31 October 2024 (Finance (No.2) Act 2024 / Autumn Budget 2024); Sch 4ZA FA 2003. Page is currently correct; keep + cite the statute.
- **§12 + §20 Renters' Rights Act 2025** [LOCKED; §20 verified vs legislation.gov.uk 2026-05-22] — Act is the Renters' Rights Act 2025 (2025 c. 26), Royal Assent 27 October 2025; Section 21 abolition + reformed Section 8 in force 1 May 2026 per SI 2026/421 reg.2. Tighten the page's Act-year citation form; the 1 May 2026 date and SI 2026/421 are correct per §20.12.
- **§13 Do-not-write list** [LOCKED] — no pricing, no real client names, no em-dashes, anonymised personas only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict — STALE_FACTS, multiple instances. This is the rewrite's first job.**

1. **§7 conflict (CRITICAL, highest consequence):** body line 50 + FAQ #1/#3/#4 frame 22/42/47 as future/"scheduled"/"on the horizon" and state higher-rate landlords get "only 20% relief on mortgage interest". §7 (and §4) lock these as ENACTED by FA 2026 (Royal Assent 18 March 2026), with the reducer rising to 22% from 2027/28. The page is wrong on both enacted-status AND the relief rate. This is the F-37 Bill-vs-enacted pattern (here the inverse error: hedging as future what is enacted) plus the dividend/wedge-correction pattern.
2. **§19.6 conflict:** MTD quarterly deadlines stated as 5 May / 5 Aug / 5 Nov / 5 Feb. §19.6 locks 7 Aug / 7 Nov / 7 Feb / 7 May.
3. **§19.7 conflict:** penalties "starting at £200 per quarter". §19.7 locks the £200 as a single fixed penalty at the 4-point threshold under the points-based regime.
4. **§19.6 reframe (not a hard conflict):** EOPS is still part of the design (§19.6 lists EoPS + Final Declaration, both 31 Jan year-end). The page's error is presenting EOPS as a separate mid-year obligation; reframe to the year-end true-up, do NOT simply delete the concept.
5. **§6 tightening:** "abolished from April 2025" → "6 April 2025".
6. **§20 tightening:** Act-year citation form → "Renters' Rights Act 2025 (2025 c. 26)"; keep the correct 1 May 2026 / SI 2026/421 detail.

**Flag to `track2_site_wide_flags.md`** as a HIGH-severity STALE_FACTS entry: this is the inverse-F-37 (future-hedge of enacted law) on the April 2027 rates, plus a wrong MTD deadline set that may be a site-wide pattern inherited from a pre-§19-verification cohort — recommend a cluster check of other roundup/calendar pages for the 5th-of-month deadline drift. Also flag the **cluster-tag/category mismatch** (dispatch tag `SelfAssessmentDeductions` vs correct category `Landlord Tax Essentials`) as a categorisation note for execution — keep the essentials category.

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31)

Execution session selects 4-7 to actually cite in body. Re-verify each (200 status + that the operative wording is present, per F-8: statute content can be removed by amendment even when the URL is live; and per F-37: confirm the FA 2026 Royal Assent date on the legislation.gov.uk page).

| URL | Use case | Verify |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2026/[c.11]/section/6 (and /section/7, /section/8) | FA 2026 ss.6-7 (property income rates) + s.8 (Scotland/Wales scope) | Confirm Act chapter number (memory: FA 2026 c.11), Royal Assent 18 March 2026, and that ss.6-8 carry the rate + scope provisions at write time |
| https://www.legislation.gov.uk/ukpga/2026/[c.11]/schedule/1 | FA 2026 Sch 1 (Section 24 reducer to 22%; amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B) | Confirm Sch 1 amends the named sections |
| https://www.gov.uk/government/collections/making-tax-digital-for-income-tax | MTD for Income Tax (threshold, quarterly updates, penalties) | Confirm £50k Apr-2026 threshold + quarterly cycle |
| https://www.gov.uk/stamp-duty-land-tax/residential-property-rates | SDLT residential rates + 5% additional-dwellings surcharge | Confirm 5% surcharge live |
| https://www.legislation.gov.uk/ukpga/2025/26/contents | Renters' Rights Act 2025 (2025 c. 26) | Confirm 2025 c. 26 + s.2 (s.21 abolition) |
| https://www.legislation.gov.uk/uksi/2026/421/contents | SI 2026/421 (commencement, 1 May 2026) | Confirm appointed day 1 May 2026 |
| https://www.gov.uk/government/publications/autumn-budget-2025 (or the property-income-rates measure page) | Source for the Autumn Budget 2025 announcement (26 November 2025) of the 22/42/47 rates | Verify the announcement date is Budget 2025, NOT Budget 2024 (per §7 do-not-write) |

**Do NOT cite** the 30 October 2024 Autumn Budget for the property income rates — that budget did the SDLT 5% surcharge and the CGT 18/24, not the 22/42/47 property income rates (§7 do-not-write). The 22/42/47 announcement was Autumn Budget 2025 (26 November 2025), enacted by FA 2026.

---

## Universal rules — inherited from parent program (do not restate)

Pointer block per §4 section 13. Read `NETNEW_PROGRAM.md §4` voice block + `docs/competitor_rewrite_playbook.md §5`. **Critical for THIS brief:**
- **NO pricing / fee / value-comparison framing** anywhere (strip the line-79 "cost outweighed by savings" leak; Decision E bars even soft "£800-£1,500 general-market" style comparisons).
- **NO em-dashes** (commas, parentheses, full stops, middle dots).
- **Anonymised social proof only**, no real client names.
- **LeadForm auto-injected** by `BlogPostRenderer.tsx` — never duplicate; 1-2 inline `<aside>` CTAs at conversion moments only.
- **HTML body, not markdown** (raw `<p>`, `<h2>`, `<ul>`, `<table>`); FAQs in frontmatter `faqs:` array only (auto-emits FAQPage; never hand-add FAQ schema in body).
- **Every statute citation verified against legislation.gov.uk at write time, including the FA 2026 Royal Assent date** (F-37 Bill-vs-enacted discipline; F-8 amended-content discipline).

---

## 19-step workflow — inherited from parent program with Track 2 deltas (do not restate)

Inherits the full workflow from `NETNEW_PROGRAM.md §7` + `competitor_rewrite_playbook.md`. Track 2 deltas + brief-specific load-bearing steps:

1. Read `house_positions.md` §1, §3, §4, §5, §6, §7, §12, §19, §20 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / phase-execution status as applicable).
3. Read this brief end-to-end.
4. **Verify FA 2026 Royal Assent + ss.6-8 + Sch 1** against legislation.gov.uk (the load-bearing pre-rewrite correctness step). Verify the MTD quarterly deadlines + £200-penalty mechanic against gov.uk MTD pages + §19. Verify RRA 2025 c. 26 + SI 2026/421.
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx with proper User-Agent); replace any non-200.
6. Read the current `landlord-tax-changes-2026-complete-guide.md` source in full.
7. Read the forward-link target siblings listed above (confirm each URL resolves).
8. Plan the hub outline: 7-9 H2s (one per change + key-dates table + intro/action), ~2,700 body words, 10-14 FAQs, a key-dates table, per-change action points + forward links.
9. **Rewrite markdown at the existing path** (NOT a new file). Preserve frontmatter slug + canonical; keep category `Landlord Tax Essentials`; update `dateModified`/`date` to today. Rewrite metaTitle/metaDescription per the plan below.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; em-dash count = 0; Tailwind class count = 0; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve; pricing-leak check (`£[0-9]` in fee-discussion lines = 0).
12. Confirm no redirect needed (none — slug kept; this is the intentional hub).
13. Insert/update `monitored_pages` row; INVISIBLE-baseline → 180-day monitoring window from today (per §16.T4 + F-11 convention).
14. Commit on `main` (or worktree branch per execution dispatch): `Track 2: rewrite landlord-tax-changes-2026-complete-guide (FA 2026 enacted-law correction + MTD facts + hub rebuild)`.
15-19. Tracker → flags → §3 heartbeat → discovery log → next page.

---

## metaTitle / metaDescription / h1 plan

- **metaTitle (test 2-3, ≤ 62 chars):**
  - "Landlord Tax Changes 2026 and 2027: What Is Changing" (52)
  - "UK Landlord Tax Changes 2026-27: Every Update Explained" (55)
  - Keep the existing if it still tests best, but lead with the dual-year framing so the hub signals it covers both the 2026 MTD change AND the enacted 2027 rates.
- **metaDescription (≤ 158 chars, no pricing, name the corrected facts):**
  - "Every UK landlord tax change for 2026 and 2027: Making Tax Digital from April 2026, the enacted 22/42/47 property income rates from 2027, CGT, SDLT and Renters' Rights, with action points and key dates." (trim to ≤ 158 at execution).
- **h1:** keep the question form but make it cover both years: "What Are the Major UK Landlord Tax Changes for 2026 and 2027?" (signals the hub spans the MTD-2026 and rates-2027 horizon, matching the corrected content).

---

## Section-by-section content plan (~2,700 words)

| # | H2 | ~Words | Content + the correction it carries | Forward link |
|---|---|---:|---|---|
| 1 | Intro (no H2) | 120 | One-paragraph hub framing: 2026 brings MTD; 2027 brings enacted new property income rates. Both are now law, not proposals. | — |
| 2 | Making Tax Digital for Income Tax from April 2026 | 380 | Threshold £50k (Apr 2026) → £30k (Apr 2027) → £20k (Apr 2028), gross-income test, per-owner share for joint owners. **CORRECT** quarterly deadlines to 7 Aug / 7 Nov / 7 Feb / 7 May. **CORRECT** penalty to a single £200 fixed penalty at the 4-point threshold (points-based), not £200 per quarter. **REFRAME** EOPS as the year-end true-up (EoPS + Final Declaration, both 31 Jan), not a separate mid-year filing. | MTD deadline page |
| 3 | Property Income Tax Rates from 2027 and Section 24 | 480 | **LOAD-BEARING CORRECTION.** 22/42/47 ENACTED by FA 2026 (Royal Assent 18 March 2026, ss.6-7), effective 6 April 2027, England + NI only (Scotland/Wales own rates, s.8/Sch 2). Section 24 reducer RISES 20%→22% from 2027/28 (FA 2026 Sch 1). Basic-rate landlords: no new wedge. Higher/additional-rate: relief rises to 22% but wedge stays 20pp/25pp (does not widen). For 2026/27, rates remain 20/40/45 + 20% reducer. DELETE the "only 20% relief" and "on the horizon" framing. | 2027 pillar + income-tax explainer + S24 guide |
| 4 | Capital Gains Tax on Property (2026/27) | 250 | 18% / 24%; £3,000 AEA; unchanged for 2026/27 (correct on page — keep, add statute cite + 60-day reporting one-liner). | CGT pillar |
| 5 | Stamp Duty Land Tax: the 5% Additional-Dwellings Surcharge | 250 | 5% from 31 October 2024 (Finance (No.2) Act 2024, Sch 4ZA FA 2003); England + NI; Scotland ADS 8% / Wales higher rates differ. Correct on page — keep, add statute + devolved note. | SDLT surcharge refunds page |
| 6 | Operating Through a Limited Company | 280 | CT 19% small-profits / 25% main / marginal relief £50k-£250k (correct — keep). Reframe the incorporation-attractiveness line around the ENACTED 22/42/47 + reducer-to-22%, not a "proposal". No fee/value claims. | Incorporation pillar |
| 7 | Abolished and Reformed Regimes: FHL and Renters' Rights | 360 | FHL abolished **6 April 2025** (tighten), former FHL now standard residential. Renters' Rights Act **2025 (2025 c. 26)**, Section 21 abolition + reformed Section 8 in force **1 May 2026** per SI 2026/421; tax angle = cash-flow/possession-timing + CGT-disposal timing, not a direct tax change. | FHL page + Section 21 abolition page |
| 8 | Key Dates and Action Points (TABLE) | 200 | Replace the bullet list with a 2-column key-dates TABLE (date · what changes), changes-only. Caption forward-links the full tax calendar. Each row pairs to a one-line action point. | tax calendar page |
| 9 | Planning Ahead (close, no pricing) | 100 | Non-fee close: professional support helps you stay MTD-compliant and plan around the enacted rates. Route to discovery-call CTA. NO cost/value comparison. | /services + /contact via LeadForm |

**FAQ plan (10-14, each correcting a specific error or answering a hub query):**
1. When do the 2026 landlord tax changes take effect? (MTD 6 Apr 2026; rates 6 Apr 2027 — both enacted)
2. Are the 22%/42%/47% property income rates definitely happening? (Yes — enacted by FA 2026, Royal Assent 18 March 2026; England + NI)
3. Does Section 24 relief stay at 20% after 2027? (No — reducer rises to 22% from 2027/28; basic-rate landlords see no new wedge)
4. Do the new property income rates apply in Scotland and Wales? (No — they set their own rates; FA 2026 s.8/Sch 2)
5. What are the MTD quarterly filing deadlines? (7 Aug / 7 Nov / 7 Feb / 7 May)
6. What is the MTD late-submission penalty? (Points-based; single £200 fixed penalty at the 4-point threshold, not per quarter)
7. Who has to use Making Tax Digital from April 2026? (Qualifying income > £50k; gross; per-owner share)
8. Did CGT rates on property change for 2026/27? (No — 18%/24%, £3,000 AEA unchanged)
9. Is the SDLT additional-dwellings surcharge still 5%? (Yes — since 31 October 2024)
10. When was the Furnished Holiday Lettings regime abolished? (6 April 2025)
11. When does the Renters' Rights Act 2025 abolish Section 21? (1 May 2026 per SI 2026/421)
12. Should I incorporate before the 2027 rate changes? (Depends; route to incorporation guide; no fee framing)
13-14. (execution may add: MTD voluntary opt-in; what counts as qualifying income.)

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §7 April 2027 rates — Royal Assent re-verified at write: __ (enacted FA 2026 18 Mar 2026 / hedge if legislation.gov.uk shows otherwise)
- §4 Section 24 reducer 22% from 2027/28: __
- §19.6 MTD deadlines 7 Aug/7 Nov/7 Feb/7 May: __
- §19.7 £200 single penalty at 4-point threshold: __
- §6 FHL 6 April 2025: __
- §20 RRA 2025 c. 26 + SI 2026/421 1 May 2026: __
- §1 SDLT 5% surcharge cited: __
- §5 CGT 18/24 + £3k AEA kept: __
- §13 pricing leak removed: __ (Y/N)

### Comparison: before vs after
- Word count: 959 → __
- H2 count: 7 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Key-dates table: 0 → __ (1 expected)
- Stale-fact corrections applied: __ / 6

### Flags raised
- STALE_FACTS (carried from brief): §7 enacted-law correction + MTD deadlines/penalty + EOPS reframe + FHL/RRA tightening: __
- Cluster-tag/category mismatch (kept Landlord Tax Essentials): __
- Site-wide MTD 5th-of-month deadline cluster check recommended: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
