# Track 2 brief: mtd-quarterly-reporting-landlords-step-by-step-guide

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (MTD cluster)
**Source markdown path:** `Property/web/content/blog/mtd-quarterly-reporting-landlords-step-by-step-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-quarterly-reporting-landlords-step-by-step-guide
**Stage 1 priority:** **H** — uniquely positioned to own the OPERATIONAL "how do I actually submit a quarterly update / what goes in it" intent in a ~30-page MTD cluster; currently INVISIBLE on both Google and Bing, so there is no equity to protect and the entire upside is net-new. Several adjacent queries ("mtd quarterly update what to include", "how to submit mtd quarterly update", "uk quarterly tax on rental income", "hmrc quarterly reporting of property income" at Bing pos 9) are liftable and owned by no sibling.
**Stage 1 date:** 2026-05-31
**Stage 2 enrichment date:** 2026-05-31 (source read in full; diagnosis payload integrated; deadline + penalty + scope facts re-grounded against §3 / §19 locks; SI 2026/336 reg 11 calendar-quarter election noted live per diagnosis)
**Cannibalisation status:** REWRITE (in place — rewrite-only mode, collapse out of scope per [[feedback_rewrite_only_no_collapse]]; this page becomes the operational how-to-submit spoke and forward-links the three live MTD siblings rather than re-owning their intents)

> **This is a gold-reference brief.** Every section below is populated with real source-page facts and the live diagnosis signal. Execution sub-agents should produce the rewrite at the depth of `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` and the discipline of `briefs/property/track2/trial/birmingham-property-accountant.md` + the cluster-sibling `briefs/property/track2/mtd/how-to-register-mtd-landlord-step-by-step-guide.md`. The two load-bearing facts about this page: **its penalty regime is wrong (time-based, not points-based)** and **its scope is wrong (partnerships + trustees stated in scope)** — those two LOCKED-position violations are the primary rewrite drivers, not depth alone.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `mtd-quarterly-reporting-landlords-step-by-step-guide`. The slug carries the operational verb the page must own ("quarterly reporting ... step-by-step"), which is distinct from the sibling deadline-calendar slug and the pillar slug. No redirect proposed (rewrite-only mode; this page is the enrichment TARGET, never a collapse source).
- **Category:** `Making Tax Digital (MTD)` (kept; canonical route `/blog/making-tax-digital-mtd/`).
- **Gap-mode tag (from diagnosis):** `STALE_FACTS` (primary — wrong penalty regime + wrong scope) + `THIN_DEPTH` (1,331 words vs ~2,400 target) + `INVISIBLE` (Google AND Bing) + `STRUCTURE` (4 FAQs, zero outbound authority, no reference tables) + `PRICING_LEAK` (closing fee-vs-penalty comparison).
- **"Why this rewrite" angle:** This is the canonical "the quarterly submission walkthrough" page for the whole MTD cluster, and it is **actively wrong on two LOCKED positions at the exact moment a landlord acts**. (1) The penalty section and FAQ describe a TIME-BASED regime ("warning letter 1-3 months / £200 over 3 months / additional £200 over 6 months / up to £400 over 12 months"). The correct regime is POINTS-BASED (§19.7 / §19.19): one point per missed quarterly update, a single £200 fixed penalty only once the 4-point threshold is reached in a rolling 24-month window. §19.9 explicitly forbids "Late submission produces an immediate £200 penalty." (2) The page states the system "applies to individual landlords, partnerships, and trustees" and carries a "Property Partnerships" section describing partnership quarterly returns. Per §3 / §19.3, GENERAL PARTNERSHIPS ARE DEFERRED (no confirmed date) and TRUSTEES ARE OUTSIDE MTD ITSA (SA900 trust return unchanged). The page also (3) treats EOPS as the single annual finalisation replacing Self Assessment, when §19.6 has TWO annual obligations (End-of-Period Statement AND Final Declaration, both 31 January, HMRC guidance leading with "final declaration"); (4) carries a PRICING_LEAK in the closing paragraph ("Professional support typically costs less than potential penalties"); and (5) hard-codes a fixed list of software products as if "HMRC-approved." The rewrite corrects all five, lifts to ~2,400 words, and re-points the page at the operational wedge that no sibling owns: a clear submission walkthrough plus a "what data goes in each quarterly update vs what waits for the final declaration" section (the cumulative-year-to-date summary mechanic, with Section 24 / capital allowances / reliefs deferred to the final declaration). It links OUT to the deadline-calendar sibling for the date table, OUT to the penalty sibling for the full regime, and UP to the pillar for "what is MTD/who is in scope" rather than re-owning any of those.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read 2026-05-31 (`Property/web/content/blog/mtd-quarterly-reporting-landlords-step-by-step-guide.md`):**
- **Word count:** ~1,331 (body) — confirmed against diagnosis payload.
- **H2 / H3 outline (1-line each):**
  1. H2 *What Is MTD Quarterly Reporting for Landlords?* — overview + the **scope error** ("applies to individual landlords, partnerships, and trustees", body line 31).
  2. H2 *MTD Quarterly Deadlines and Submission Process* with H3 *Standard Tax Year Quarterly Deadlines*, H3 *Alternative Quarterly Periods (Calendar-Quarter Election)* (cites SI 2026/336 reg 11 — verified-OK per diagnosis), H3 *Step-by-Step Submission Process* (Steps 1-4 — the operational core to keep + sharpen).
  3. H2 *What Information Goes in Each Quarterly Submission* — the wedge section; currently thin and does NOT make the cumulative-vs-discrete distinction or the "what waits for final declaration" point.
  4. H2 *End of Period Statement (EOPS)* — the **terminology error** (treats EOPS as the single finalisation; misses the Final Declaration, §19.6).
  5. H2 *MTD Quarterly Reporting vs Traditional Self Assessment* — keep as a short comparison; feed the comparison table.
  6. H2 *Penalties for Late Submissions* with H3 *Late Submission Penalties* (the **WRONG time-based regime**, body lines 109-114) + H3 *Reasonable Excuse Defence*.
  7. H2 *Special Situations and Exceptions* with H3 *Property Partnerships and Joint Ownership* (the **partnership scope error**, body lines 119-120), H3 *Non-Resident Landlords*, H3 *Mixed Property Businesses*.
  8. H2 *Preparing for and Getting Help with MTD* — closing section carrying the **PRICING_LEAK** ("Professional support typically costs less than potential penalties", body line 143).
- **metaTitle:** "MTD Quarterly Reporting Landlords: Step-by-Step Guide 2026" (57 chars; OK length, generic, no operational differentiator).
- **metaDescription:** "Guide to MTD quarterly reporting for landlords. Deadlines, software, submission process, and penalties. Mandatory from April 2026." (131 chars; serviceable but generic, promises "penalties" the page currently gets wrong).
- **h1 / title:** "MTD Quarterly Reporting for Landlords: Step-by-Step Guide 2026".
- **FAQ count (frontmatter `faqs:`):** 4. FAQ #3 ("What happens if I miss an MTD quarterly deadline?") **propagates the wrong time-based penalty regime** — must be rewritten, not supplemented. FAQ #1 (deadlines), #2 (software, names products), #4 (EOPS-only terminology) all need correction/sharpening.
- **Outbound authority links:** 2 (legislation.gov.uk SI 2026/336/made for reg 11; gov.uk send-quarterly-updates guidance) — better than zero; keep + add 2-3 more.
- **Internal links:** 3 (making-tax-digital-landlords-april-2026-deadline; landlord-tax-deductions list; section-24 guide). Target 6-9.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:`; Article auto-emitted). No reviewer byline yet; no HowTo. Add both.
- **Inline CTAs:** 0 `<aside>` (LeadForm auto-injected by `BlogPostRenderer.tsx`; target 1-2 inline `<aside>` at conversion moments).
- **Last meaningful edit:** frontmatter `date: 2026-04-10`.

**Concrete defects to fix (carried from diagnosis, verified against source lines):**
- **WRONG penalty regime (body lines 106-114 + FAQ #3):** time-based "warning letter 1-3 months / £200 over 3 months / additional £200 over 6 months / up to £400 over 12 months." Replace with §19.7 / §19.19 points-based regime + first-year soft-landing.
- **MISSING first-year soft-landing:** HMRC confirmed no penalty points for the first four quarterly updates in 2026/27 (confirmed via FreeAgent live source 2026-02-25 per diagnosis; re-verify at write time). Page omits this entirely — add it.
- **WRONG scope — partnerships + trustees (body lines 31, 119-120):** "applies to individual landlords, partnerships, and trustees" + a "Property Partnerships" section. Per §3 / §19.3: GP partnerships + LLPs DEFERRED to TBC; trustees OUTSIDE MTD ITSA (SA900 unchanged). Correct to "individuals / sole-trader landlords in scope; partnerships deferred; trustees outside"; disentangle joint ownership (individuals testing their share, §19.4) from partnership.
- **EOPS-only terminology error (body lines 79-88 + FAQ #4):** treats EOPS as the single annual finalisation replacing SA. §19.6 has TWO annual obligations (End-of-Period Statement AND Final Declaration, both due 31 January). HMRC current guidance leads with "final declaration." Add concrete dates: for 2026/27 the final declaration deadline is **31 January 2028**.
- **PRICING_LEAK (body line 143):** "Professional support typically costs less than potential penalties" is a soft value/fee comparison. Strip per Decision E + lead-gen no-pricing rule; replace with a neutral "a specialist property accountant can manage the full quarterly cycle" framing + CTA, no cost claim.
- **Hard-coded software product list (body lines 19, 61):** "Xero, QuickBooks, FreeAgent, Arthur Online, Landlord Vision" framed as the HMRC-approved set. Per §19.6, do NOT present a fixed product list as authoritative; frame as "examples; always check the gov.uk compatible-software finder" and link the finder.
- **Late-payment percentages:** the current page does not state late-payment percentages, but IF the rewrite adds them they MUST use the 15/30/31-day triggers at 3% / 3% / 10% (§19.7), never the legacy 31/46/91 at 2% / 2% / 4% (§19.9 trap).

---

## GSC / Bing equity angle (last 90 days) — from diagnosis payload

**Google GSC + Bing Webmaster combined target_queries (the page is INVISIBLE on both — these are the impression-class signals the rewrite is built to capture, not a current-ranking baseline):**

| Query | source | impr | pos |
|---|---:|---:|---:|
| mtd for property income | gsc | 15 | 63.1 |
| nrl quarterly return | gsc | 12 | 44.4 |
| quarterly nrl return | gsc | 8 | 38 |
| do landlords need to register for mtd | gsc | 7 | 85 |
| landlord mtd | gsc | 9 | 56.7 |
| mtd software for landlords | gsc | 9 | 82.7 |
| mtd deadline 2026 | gsc | 2 | 78 |
| mtd deadlines 2026 | gsc | 1 | 17 |
| mtd quarterly deadlines | gsc | 1 | 25 |
| mtd for non resident landlords | gsc | 1 | 38 |
| mtd qualifying income gross or net | gsc | 2 | 10 |
| mtd thresholds | gsc | 2 | 63 |
| mtd itsa landlords | gsc | 2 | 73 |
| mtd itsa penalty holiday | gsc | 1 | 22 |
| mtd if rental starting oct 2026 | bing | 1 | 1 |
| hmrc - quarterly reporting of property income | bing | 1 | 9 |
| uk quarterly tax on rental income | bing | 1 | 3 |
| making tax digital reporting requirements property costs | bing | 2 | 2 |
| uk mtd how to get ready landlord without accountant | bing | 1 | 10 |
| mtd rental income | bing | 2 | 2 |
| when is the first year mtd will apply for non residents landlords | bing | 3 | 1 |
| mtd and non resident landlords | bing | 2 | 6 |
| how to sign up for mtd in property and landlords scotland | bing | 2 | 1 |
| when should we register for rentsal properties mtd | bing | 2 | 2 |
| mtd registration | bing | 15 | 6 |
| free mtd tax software | bing | 1 | 3 |
| mtd quarterly update what to include | adjacent | 0 | 0 |
| how to submit mtd quarterly update | adjacent | 0 | 0 |
| mtd first quarterly update soft landing penalty | adjacent | 0 | 0 |
| mtd end of period statement vs final declaration | adjacent | 0 | 0 |
| calendar quarter election mtd landlords | adjacent | 0 | 0 |

**Pattern analysis:**
- **Bing shows real positions but the page is functionally invisible** (1-3 impressions on most queries; nothing converting). The "mtd registration" query at Bing pos 6 / 15 impr is owned more squarely by the sibling `how-to-register-mtd-landlord-step-by-step-guide` (pos 1-4 there) — this page should NOT chase registration; forward-link it.
- **The sharp, uncontested wedge is the OPERATIONAL "what / how to submit" cluster** (the `adjacent` rows + the Bing "hmrc quarterly reporting of property income" pos 9, "uk quarterly tax on rental income" pos 3, "making tax digital reporting requirements property costs" pos 2, "mtd rental income" pos 2). No sibling owns "what goes in each quarterly update vs what waits for final declaration." That is the rewrite's primary territory.
- **Penalty-holiday / soft-landing intent surfaces** ("mtd itsa penalty holiday" gsc pos 22; "mtd first quarterly update soft landing penalty" adjacent). The current page omits the first-year soft-landing entirely; adding it directly serves this intent.
- **Non-resident quarterly intent** ("nrl quarterly return", "quarterly nrl return", "mtd for non resident landlords", "when is the first year mtd will apply for non residents landlords" Bing pos 1) — give it one tight section that correctly distinguishes the letting-agent **NRLQ** quarterly return (the agent's NRL withholding return, §17.5) from the landlord's **MTD quarterly update**, and forward-links the NRL sibling. (House-position note: NRLQ is the agent's quarterly return; do NOT conflate it with MTD.)

**Strategic conclusion:** the rewrite's job is to BECOME eligible (depth + accuracy + correct penalty/scope + reference tables + FAQ schema + HowTo) on an operational "how do I actually submit, and what goes in it" page that currently scores zero on both engines. Realistic target: open a non-zero Google entry on the operational + soft-landing + final-declaration queries, and lift the Bing operational queries (pos 2-9) toward page-1 conversion. Per the F-11 INVISIBLE-baseline rule, use a 180-day monitoring window.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (two LOCKED-position violations).** (a) The penalty regime is time-based and wrong (§19.7 / §19.9 — points-based, £200 only at the 4-point threshold); (b) the scope wrongly includes partnerships and trustees (§3 / §19.3 — partnerships deferred, trustees outside). Both are high-consequence: the page ranks-eligible on the exact moment a landlord acts and would mislead them. Per the deterministic-floor principle ([[track2_ranking_grade_engine]], §16.T-series), neither claim is gated on LLM plausibility — the penalty mechanics and the scope list must be re-grounded against §3 / §19 + gov.uk at write time.

**Secondary: THIN_DEPTH.** 1,331 words vs ~2,400 target. The operational wedge (what goes in each update, cumulative-vs-discrete, what waits for the final declaration) is under-developed, which is precisely the territory no sibling owns.

**Tertiary: INVISIBLE (Google + Bing).** No meaningful ranking on either engine. The rewrite is an eligibility play on the operational intent.

**Quaternary: STRUCTURE + PRICING_LEAK.** 4 FAQs, no reference tables, only 3 internal links; closing fee-vs-penalty comparison violates the no-pricing rule.

**Load-bearing fix sequence (ordered by ROI):**
1. **Correct the penalty regime** to §19.7 / §19.19 points-based (1 point per missed quarterly update; £200 fixed penalty only at the 4-point threshold within a rolling 24-month window; reset requires the dual-condition test — 12-month compliance AND all prior-24-month submissions made) and **add the first-year soft-landing** (no penalty points for the first four quarterly updates in 2026/27 — re-verify at write time). Keep penalty coverage BRIEF and forward-link the penalty sibling for the full regime + worked late-payment figures.
2. **Correct the scope** (§3 / §19.3): individuals / sole-trader landlords in scope; GP partnerships + LLPs DEFERRED to TBC; trustees OUTSIDE (SA900 unchanged); non-resident individuals IN where threshold met. Delete the "Property Partnerships" quarterly-returns section; disentangle joint ownership (individuals, §19.4) from partnership.
3. **Fix the EOPS/final-declaration terminology** (§19.6): TWO annual obligations — End-of-Period Statement AND Final Declaration, both due 31 January following year-end; for 2026/27 the final declaration deadline is **31 January 2028**. Lead with "final declaration" per current HMRC guidance.
4. **Build the operational wedge:** a sharp "what data goes in each quarterly update vs what waits for the final declaration" section with the **cumulative year-to-date** mechanic (Q2 includes Q1, etc.) and the rule that Section 24 finance-cost restriction, capital allowances, and reliefs are applied at the final declaration, NOT in the quarterly updates.
5. **Software framing** (§19.6): remove the fixed product list as "HMRC-approved"; frame named tools as examples and link the gov.uk compatible-software finder; note spreadsheet + bridging is acceptable.
6. **Strip the PRICING_LEAK** (Decision E): delete "costs less than potential penalties"; replace with neutral specialist framing + CTA.
7. **Body lift to ~2,400 words**, 10-12 FAQs (each targeting a verbatim target query), 1-2 inline `<aside>` CTAs, 4-6 outbound authority links, two reference tables (quarterly-cycle + quarterly-vs-final-declaration), `howToSteps` for the HowTo schema.
8. **metaTitle / metaDescription refresh** leading with the operational "how to submit / what to include" differentiator.

---

## Cannibalisation / distinctiveness statement (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed per latest Track 2 heartbeat). Large MTD cluster (~30 live pages under `/making-tax-digital-mtd/`). **Rewrite-only mode: collapse is out of scope** ([[feedback_rewrite_only_no_collapse]]). Because this page is INVISIBLE on both engines it has no equity to protect and cannot be a collapse target; the resolution is pure differentiation by intent.

| Source | Slug | Intent owned | Resolution |
|---|---|---|---|
| Residual (own) | mtd-quarterly-reporting-landlords-step-by-step-guide | **OPERATIONAL "how do I submit a quarterly update + what goes in it"** | REWRITE in place. Owns the submission mechanics + the "what's in each update vs the final declaration" wedge. |
| Sibling (live) | mtd-quarterly-deadlines-2026-2027-landlords (1,831w; the only sibling with any GSC; owns "mtd quarterly deadlines" / "mtd deadlines 2026") | the deadline CALENDAR + calendar-quarter election | DISTINCT. This page states the four headline deadlines once + **forward-links the deadline sibling for the full date table and the calendar-quarter election detail**; does NOT re-own the calendar. |
| Sibling (live) | mtd-penalties-landlords-miss-deadline (1,219w) | the full penalty REGIME | DISTINCT. This page covers penalties BRIEFLY (correct points-based headline + first-year soft-landing) then **forward-links the penalty sibling** for the full regime + worked late-payment figures. |
| Sibling (live) | making-tax-digital-property-income-2026-complete-guide (1,532w; pillar) | top-of-funnel "what is MTD / who is in scope" | DISTINCT. This page sits BELOW it as the operational how-to; **up-links to the pillar** for scope/eligibility; the pillar links down to this for "how to submit." |
| Sibling (live) | how-to-register-mtd-landlord-step-by-step-guide | transactional "sign up / register" (owns "mtd registration" Bing pos 1-4) | DISTINCT (pre-submission). This page **forward-links the register sibling** for sign-up; does NOT chase registration queries. |
| Sibling (live) | mtd-itsa-late-submission-points-late-payment-15-30-31-worked | worked late-payment penalty figures | DISTINCT. Penalty section forward-links it for the 15/30/31 worked detail. |
| Sibling (live) | mtd-itsa-foreign-property-income-quarterly-reporting-rules / non-resident-landlord-scheme-uk-complete-guide | NRL + foreign-property quarterly mechanics | DISTINCT. The NR section here distinguishes the agent's **NRLQ** from the landlord's MTD quarterly update + forward-links these. |

**Distinct query targets this page owns that NO sibling owns well:** "mtd quarterly update what to include", "how to submit mtd quarterly update", "mtd first quarterly update soft landing penalty", "uk quarterly tax on rental income", "making tax digital reporting requirements property costs", "hmrc quarterly reporting of property income" (Bing pos 9 — liftable), "mtd end of period statement vs final declaration", "calendar quarter election mtd landlords" (covered briefly + linked out for the full table).

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED out of this page (rewrite-only; if anything, weaker siblings later 301 INTO this enriched page, never the reverse). No FLAG-MANAGER on cannibalisation. The cluster stays clean because this page owns the operational submission mechanics + the "what's in each update vs the final declaration" wedge and forward-links the distinct sibling intents.

---

## Closest existing pages (Stage 2)

Internal-link partners (all under `/blog/making-tax-digital-mtd/` unless noted). Use category-route hrefs:

- **Pillar (up-link):** `/blog/making-tax-digital-mtd/making-tax-digital-property-income-2026-complete-guide` (for "what is MTD / who is in scope")
- **Deadline calendar (forward-link for the date table + calendar-quarter election):** `/blog/making-tax-digital-mtd/mtd-quarterly-deadlines-2026-2027-landlords`
- **Penalty regime (forward-link for the full regime):** `/blog/making-tax-digital-mtd/mtd-penalties-landlords-miss-deadline`
- **Worked late-payment figures:** `/blog/making-tax-digital-mtd/mtd-itsa-late-submission-points-late-payment-15-30-31-worked`
- **Register/sign-up sibling (forward-link for sign-up, not duplicated):** `/blog/making-tax-digital-mtd/how-to-register-mtd-landlord-step-by-step-guide`
- **Software selection:** `/blog/making-tax-digital-mtd/mtd-software-landlords-free-vs-paid-options-compared`
- **Qualifying income (gross vs net):** `/blog/making-tax-digital-mtd/mtd-itsa-qualifying-income-test-gross-vs-net`
- **Joint owners:** `/blog/making-tax-digital-mtd/mtd-itsa-joint-property-owners-quarterly-filing-mechanics-each-spouse`
- **Non-resident / foreign property:** `/blog/making-tax-digital-mtd/mtd-itsa-foreign-property-income-quarterly-reporting-rules` + `/blog/non-resident-landlords/non-resident-landlord-scheme-uk-complete-guide` (verify live route at write time)
- **Section 24 (for "what waits for final declaration"):** `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` (keep; already on page)
- **Allowable expenses list (for "what goes in expenses"):** `/blog/section-24-and-tax-relief/landlord-tax-deductions-uk-2026-complete-list` (keep; already on page)
- **Accountant services (CTA target, LINK ONLY, no fee numbers per Decision E):** `/blog/property-accountant-services/what-does-a-property-accountant-do`

Target: 6-9 internal links (up from 3), each a distinct intent so the page reads as the operational hub of the submission moment.

---

## House-position references (Stage 1)

- **§3 MTD for ITSA applicability** [LOCKED] — headline schedule: mandatory 6 Apr 2026 (>£50,000), 6 Apr 2027 (>£30,000), 6 Apr 2028 (>£20,000); **Ltd cos OUT**; **GP partnerships DEFERRED to TBC**; joint owners test their share; **"Do not write": MTD applies to GP partnerships from April 2026 / £10,000 threshold / MTD applies to limited companies.** Primary spine for the scope correction.
- **§19.1 Mandate timeline** [LOCKED 2026-05-22] — the threshold table; tested against the relevant prior-year SA return per cohort.
- **§19.2 Qualifying income (gross, both streams aggregated)** [LOCKED] — the gross-vs-net basis underpinning who has to submit; supports the "uk quarterly tax on rental income" / "qualifying income gross or net" intent.
- **§19.3 Excluded categories** [LOCKED] — **Ltd cos out; GP partnerships + LLPs DEFERRED; TRUSTEES OUTSIDE (SA900 unchanged); non-resident individuals IN where threshold met.** This is the spine for correcting the body-line-31 + 119-120 scope error.
- **§19.4 Joint-property owners** [LOCKED] — each owner tests their share and files their own quarterly updates; joint ownership is NOT a partnership. Corrects the conflated "Property Partnerships and Joint Ownership" section.
- **§19.6 Software + quarterly cycle table + the TWO annual obligations** [LOCKED 2026-05-22] — HMRC-recognised compatible software; spreadsheet + bridging acceptable; **do NOT hard-code product names**; the four quarterly deadlines (7 Aug / 7 Nov / 7 Feb / 7 May); **End-of-Period Statement AND Final Declaration both due 31 January following year-end** (corrects the EOPS-only error); calendar-quarter elections available from 6 Apr 2026.
- **§19.7 Penalty regime** [LOCKED 2026-05-22, verified] — **points-based late submission** (1 point per missed quarterly update; £200 fixed penalty only at the 4-point threshold; reset after 24 months compliance); annual EoPS/final declaration counts as a separate annual obligation (2-point threshold); late-payment **3% day 15 / +3% day 30 / +10% p.a. day 31** (MTD ITSA). The spine for the penalty correction.
- **§19.9 Do-not-write list** [LOCKED] — **NOT "immediate £200 penalty"; NOT "2%/2%/4%"; NOT "joint owners test the property's total"; NOT "MTD applies to GP partnerships from April 2026"; NOT "£10,000 threshold."**
- **§19.18 SI 2021/1076 → SI 2026/336 migration** [LOCKED 2026-05-27] — the live operative instrument is **SI 2026/336** (Income Tax (Digital Obligations) Regulations 2026, in force 1 Apr 2026); SI 2021/1076 was **REVOKED 1 Apr 2026**. Calendar-quarter election = **reg 11** (verified live per diagnosis; re-confirm at write time). Cite SI 2026/336, not SI 2021/1076, as the live instrument.
- **§19.19 Points-based late submission** [LOCKED 2026-05-27] — sits at **FA 2021 Schedule 24** (NOT FA 2007 Sch 24, the inaccuracy regime — naming collision); reset is a dual-condition test (12-month compliance AND all prior-24-month submissions made). First-year soft-landing (no points for the first four quarterly updates in 2026/27) is the diagnosis-added fact to re-verify.
- **§17.5 NRL scheme** [LOCKED] — the letting agent's **NRLQ** is the agent's quarterly NRL withholding return; **NRLY** is the annual information return. These are NOT the landlord's MTD quarterly update. Keep the two distinct in the NR section.
- **§4 Section 24** [LOCKED] — the 20% finance-cost reducer (22% from 2027/28 per FA 2026) is applied at the **final declaration**, not in the quarterly updates — load-bearing for the "what waits for final declaration" wedge.
- **§13 Do-not-write list** [LOCKED] — **no pricing/fees; no real client names; anonymised social proof only.** Spine for the PRICING_LEAK strip.

---

## House-position conflict flags (Stage 2)

**CONFIRMED conflict #1 — STALE_FACTS / wrong penalty regime (primary).** Body lines 106-114 + FAQ #3 describe a time-based regime ("warning letter 1-3 months / £200 over 3 months / additional £200 over 6 months / up to £400 over 12 months"). This is on the §19.9 do-not-write list ("Late submission produces an immediate £200 penalty"). The correct regime is §19.7 / §19.19 points-based. Execution MUST strip and replace, AND add the first-year soft-landing (re-verify at write time).

**CONFIRMED conflict #2 — STALE_FACTS / wrong scope (partnerships + trustees).** Body line 31 ("applies to individual landlords, partnerships, and trustees") + the "Property Partnerships and Joint Ownership" section (lines 119-120) violate §3 / §19.3 (GP partnerships + LLPs DEFERRED; trustees OUTSIDE). Execution MUST correct to "individuals / sole-trader landlords in scope; partnerships deferred; trustees outside" and disentangle joint ownership (§19.4) from partnership.

**CONFIRMED conflict #3 — terminology (EOPS-only).** Body lines 79-88 + FAQ #4 treat EOPS as the single annual finalisation. §19.6 has TWO annual obligations (EoPS AND Final Declaration, both 31 January). Add concrete dates (final declaration for 2026/27 = 31 January 2028) and lead with "final declaration."

**CONFIRMED conflict #4 — PRICING_LEAK (Decision E).** Body line 143 ("Professional support typically costs less than potential penalties"). Strip per §13 + lead-gen no-pricing rule.

**CONFIRMED conflict #5 — software product list framed as authoritative.** Body lines 19 + 61 present a fixed product list. Per §19.6, frame as examples + link the gov.uk compatible-software finder; do not hard-code as "HMRC-approved."

**Flags to `track2_site_wide_flags.md`:**
- **F-NN | 2026-05-31 | HIGH | mtd-quarterly-reporting-landlords-step-by-step-guide | STALE_FACTS | Time-based penalty regime (body lines 106-114 + FAQ #3) violates §19.7 / §19.9 (points-based; £200 only at 4-point threshold; 24-month window). First-year soft-landing (no points for first four 2026/27 updates) omitted. Strip + replace + add soft-landing; re-verify soft-landing at write time. Cluster-audit candidate: check other MTD pages for the same time-based regime.**
- **F-NN | 2026-05-31 | HIGH | mtd-quarterly-reporting-landlords-step-by-step-guide | HOUSE_POSITION_CONFLICT | "applies to individual landlords, partnerships, and trustees" (line 31) + "Property Partnerships" section (lines 119-120) violate §3 / §19.3 (GP partnerships DEFERRED; trustees OUTSIDE). Correct scope + disentangle joint ownership from partnership. Cluster-audit candidate.**
- **F-NN | 2026-05-31 | MEDIUM | mtd-quarterly-reporting-landlords-step-by-step-guide | PRICING_LEAK | "Professional support typically costs less than potential penalties" (line 143). Strip per Decision E.**

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31, including any SI/Act dates)

| URL | Verification note | Use case |
|---|---|---|
| https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates | Already cited on page; re-verify 200 + the cumulative-summary + categorised-figures framing. | The "how to submit + what goes in each update" source-of-truth (the wedge). |
| https://www.legislation.gov.uk/uksi/2026/336/made | Already cited (reg 11 calendar-quarter election); re-verify SI number, in-force date (1 Apr 2026) + reg 11 at write time. Cite SI 2026/336, NOT SI 2021/1076 (revoked). | Operative MTD ITSA digital-obligations instrument; calendar-quarter election (§19.18). |
| https://www.legislation.gov.uk/ukpga/2021/26/schedule/24 | Verify FA 2021 Sch 24 is the points-based late-submission location (NOT FA 2007 Sch 24). | Penalty regime statute (§19.7 / §19.19). |
| https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax | Re-verify 200; do NOT name products (§19.6). | The "choose compatible software" framing (product-neutral link-out). |
| https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/submit-your-tax-return | Re-verify 200 + that it leads with "final declaration." | The TWO-annual-obligations / final-declaration correction (§19.6). |
| HMRC first-year soft-landing source (the FreeAgent live source cited in diagnosis 2026-02-25 points to HMRC confirmation) | **Re-verify at write time on gov.uk / HMRC** that no penalty points accrue for the first four quarterly updates in 2026/27; cite the HMRC source, not a vendor blog. | First-year soft-landing fact (§19.19 add). |
| https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html | Verify the 15/30/31-day 3%/3%/10% wording IF late-payment figures are added. | Accelerated late-payment penalty source (§19.7). |

**Execution selects 4-6 to actually cite in body.** Render as legislation.gov.uk / gov.uk hyperlinks. **F-37 Bill-vs-enacted discipline:** if any Finance Act is cited, verify its Royal Assent date at write time; FA 2026 (c.11) Royal Assent confirmed 18 March 2026 per the program's 13th catch. **Highest-risk items:** the first-year soft-landing (re-verify on an HMRC source, not a vendor blog) and the SI 2026/336 reg-11 + revocation note (§19.18 13th-catch pattern).

---

## Section-by-section content plan (~2,400 words)

Target ~2,400 body words, 9-11 H2s, 10-12 FAQs, 1-2 inline `<aside>` CTAs, 4-6 outbound authority links, raw HTML body (`<p>`, `<h2>`, `<ul>`, `<table>` — never markdown `##` or `|`-tables; per memory `blog_page_rendering_html_in_frontmatter`). All tables plain HTML, NO pricing.

1. **Intro (~130w)** — frame the page as the operational "how do I actually submit a quarterly update, and what goes in it" guide. State up front: from 6 April 2026 in-scope landlords send four cumulative quarterly updates plus a year-end final declaration; the quarterly update is a categorised summary, not a tax bill; reliefs are sorted at the final declaration. Up-link the pillar for "what is MTD / who is in scope."
2. **H2 Who has to submit quarterly updates (and who does not) (~230w)** — the scope correction. Individuals / sole-trader landlords with qualifying income over the §19.1 threshold are in scope; **GP partnerships + LLPs DEFERRED to a date TBC; trustees OUTSIDE MTD ITSA (SA900 unchanged); limited companies OUT (CT600)**; joint owners each test their share and file their own updates (§19.4 — NOT a partnership); non-resident individuals IN where threshold met. ONE compact threshold table (Apr 2026 >£50k / Apr 2027 >£30k / Apr 2028 >£20k). Forward-link the pillar + qualifying-income sibling. **REFERENCE TABLE #1 (threshold/scope).**
3. **H2 The quarterly cycle: dates and the calendar-quarter election (~200w)** — state the four standard deadlines once (7 Aug / 7 Nov / 7 Feb / 7 May), note the calendar-quarter election (SI 2026/336 reg 11) briefly, then **forward-link the deadline-calendar sibling for the full date table and the election detail** (do NOT re-own the calendar). **REFERENCE TABLE #2 (quarterly cycle: period → standard deadline).**
4. **H2 How to submit an MTD quarterly update: step by step (~360w)** — the operational core + the HowTo spine. Step 1: have HMRC-recognised compatible software in place (product-neutral; link the gov.uk finder; spreadsheet + bridging acceptable). Step 2: keep digital records throughout the quarter, categorised to HMRC's schema. Step 3: at quarter-end, review the cumulative year-to-date figures for completeness and correct categorisation. Step 4: submit via the software's MTD connection and keep the confirmation receipt. Stress it is a summary submission, not every transaction. Inline `<aside>` CTA #1 here. Each step becomes a `howToSteps` entry.
5. **H2 What goes in each quarterly update vs what waits for the final declaration (~330w)** — THE WEDGE. The quarterly update is a **cumulative** categorised summary of property income and allowable expenses year-to-date (Q2 includes Q1, etc.). What goes IN: rent received, and allowable expenses by category (finance costs, repairs and maintenance, insurance, professional fees, agent fees, utilities where landlord-paid). What WAITS for the final declaration: the **Section 24 finance-cost restriction** (§4), **capital allowances**, **reliefs/adjustments**, and the actual tax calculation. This is the section that owns "mtd quarterly update what to include" + "making tax digital reporting requirements property costs." **REFERENCE TABLE #3 (what goes in each quarterly update vs what is handled at the final declaration).**
6. **H2 End-of-period statement and final declaration (~220w)** — the terminology fix. TWO annual obligations under §19.6: the End-of-Period Statement AND the Final Declaration, both due **31 January** following year-end; for 2026/27 the final declaration deadline is **31 January 2028**. Lead with "final declaration" per current HMRC guidance; note it pulls in all income sources and applies the year-end adjustments (S24, capital allowances, reliefs). Owns "mtd end of period statement vs final declaration."
7. **H2 Quarterly updates vs the old annual Self Assessment (~180w)** — short comparison feeding the side-by-side table; old: one annual SA return by 31 Jan; new: four cumulative quarterly updates + EoPS + final declaration. Note payments on account (31 Jan / 31 Jul) are unchanged. **REFERENCE TABLE #4 (old SA vs new MTD cycle, side-by-side).**
8. **H2 Penalties for late quarterly updates (and the first-year soft-landing) (~230w)** — BRIEF + correct. Points-based (§19.7 / §19.19): one point per missed quarterly update; a single £200 fixed penalty only once you reach 4 points in a rolling 24-month window; points reset after the dual-condition test (12-month compliance AND all prior-24-month submissions made). **First-year soft-landing:** HMRC has confirmed no penalty points for the first four quarterly updates in 2026/27 (re-verify at write time on an HMRC source). Then **forward-link the penalty sibling + the 15/30/31 worked sibling** for the full regime + late-payment figures. Do NOT restate the legacy time-based regime; do NOT add 2%/2%/4% on 31/46/91. Inline `<aside>` CTA #2 optional here.
9. **H2 Non-resident landlords and the quarterly returns trap (~190w)** — distinguish the agent's **NRLQ** (the letting agent's quarterly NRL withholding return, §17.5) from the landlord's **MTD quarterly update** (these are different obligations that can both apply). Non-resident individuals are IN MTD where threshold met; software must support non-resident reporting. Owns "nrl quarterly return" / "quarterly nrl return" / "mtd for non resident landlords." Forward-link the NRL + foreign-property siblings.
10. **H2 Getting ready and getting help (~150w)** — neutral, no pricing: get compatible software in place, digitise records, decide on the quarter basis, run a trial quarter. A specialist property accountant can manage the full quarterly cycle and the year-end final declaration. **NO fee-vs-penalty comparison** (strip the leak). CTA target: what-does-a-property-accountant-do (link only).
11. **FAQs (10-12)** — each targets a verbatim target query:
    - "How do I submit an MTD quarterly update?" (the operational primary)
    - "What do I include in each MTD quarterly update?" ("mtd quarterly update what to include" — cumulative income + expenses by category)
    - "What property costs do I report under Making Tax Digital?" ("making tax digital reporting requirements property costs")
    - "Is the rental income tax now quarterly in the UK?" ("uk quarterly tax on rental income" — clarify: quarterly UPDATES, not quarterly tax payments; payments on account unchanged)
    - "What is the difference between the end-of-period statement and the final declaration?" ("mtd end of period statement vs final declaration")
    - "What happens if I miss an MTD quarterly deadline?" (**rewrite the wrong FAQ #3** — points-based; £200 only at 4 points)
    - "Is there a penalty holiday for the first year of MTD?" ("mtd itsa penalty holiday" / "mtd first quarterly update soft landing penalty" — first-year soft-landing)
    - "Do partnerships have to submit MTD quarterly updates from April 2026?" (NO — deferred to TBC, §19.3)
    - "Do non-resident landlords have to file MTD quarterly updates?" (yes where threshold met; distinct from the agent's NRLQ)
    - "Can I align my MTD quarters to calendar months?" ("calendar quarter election mtd landlords" — yes, SI 2026/336 reg 11; forward-link the deadline sibling)
    - "What software do I need to submit quarterly updates?" ("mtd software for landlords" / "free mtd tax software" — compatible software from the gov.uk finder; spreadsheet + bridging acceptable; no product list as authoritative)
    - "Do I still need Self Assessment if I file quarterly?" (the final declaration replaces the SA return for in-scope income; payments on account unchanged)

---

## Tables this page must include (plain HTML, NO pricing)

- **REFERENCE TABLE #1 — Who is in scope (threshold/scope).** Columns: *Taxpayer type | In MTD ITSA from April 2026? | Note*. Rows: Sole-trader / individual landlord (Yes, if gross qualifying income over the year's threshold), Joint owner (Yes — each tests their share, files own updates), General partnership / LLP (No — deferred to a date to be confirmed), Trustee (No — SA900 trust return unchanged), Limited company (No — files CT600), Non-resident individual landlord (Yes — where threshold met).
- **REFERENCE TABLE #2 — Standard quarterly cycle (deadlines).** Columns: *Quarter (standard period) | Submission deadline*. Rows: 6 Apr to 5 Jul → 7 Aug; 6 Jul to 5 Oct → 7 Nov; 6 Oct to 5 Jan → 7 Feb; 6 Jan to 5 Apr → 7 May; End-of-Period Statement → 31 Jan following year-end; Final declaration → 31 Jan following year-end (for 2026/27: 31 Jan 2028).
- **REFERENCE TABLE #3 — Quarterly update vs final declaration (the wedge).** Columns: *Item | Goes in the quarterly update? | Handled at the final declaration?*. Rows: Rent received (Yes, cumulative / No), Allowable running expenses by category (Yes, cumulative / No), Section 24 finance-cost reducer (No / Yes), Capital allowances (No / Yes), Reliefs and year-end adjustments (No / Yes), Final tax calculation (No / Yes).
- **COMPARISON TABLE #4 — Old annual Self Assessment vs new MTD cycle (side-by-side).** Columns: *Stage | Old Self Assessment (pre-Apr 2026) | New MTD cycle (from Apr 2026)*. Rows: During the year (keep records / keep digital records + categorise), Quarterly (nothing / four cumulative quarterly updates), Year-end finalisation (one SA return by 31 Jan / EoPS + final declaration by 31 Jan), Payments on account (31 Jan + 31 Jul / 31 Jan + 31 Jul, unchanged).

---

## Statute / instrument spine (every citation to be VERIFIED against legislation.gov.uk + gov.uk at write time)

| Citation | Governs | House position | Verify note |
|---|---|---|---|
| **SI 2026/336** — Income Tax (Digital Obligations) Regulations 2026, **reg 11** (calendar-quarter election) | Live operative MTD ITSA instrument; calendar-quarter election | §19.18 | In force 1 Apr 2026; REPLACES SI 2021/1076 (revoked 1 Apr 2026). Cite SI 2026/336, NOT SI 2021/1076. reg 11 = calendar-quarter election (verified live per diagnosis; re-confirm). |
| **SI 2026/336 reg 25** (qualifying income) + **reg 27** (threshold) | Who is in scope / qualifying-income basis | §19.18 / §19.2 | Verify reg numbers at write time per migration table (qualifying income migrated from old reg 20 to new reg 25). |
| **SI 2021/1076** — Income Tax (Digital Requirements) Regulations 2021 (**revoked**) | Historical/migration context only | §19.18 | Only valid when explicitly describing the 2021→2026 migration; NEVER as the live instrument. |
| **FA 2021 Schedule 24** | Points-based late-submission penalty regime | §19.7 / §19.19 | NOT FA 2007 Sch 24 (the inaccuracy regime — naming collision). Verify the Schedule at write time. |
| **FA 2021 Schedule 26** (as amended) + Spring Statement 2025 | Late-payment penalties (3% day 15 / +3% day 30 / +10% p.a. day 31 for MTD ITSA) | §19.7 | Only if late-payment figures are added; cite the Spring Statement 2025 HTML (verbatim 15/30/31 wording). NOT legacy 31/46/91 at 2%/2%/4%. |
| **ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B** | Section 24 finance-cost reducer applied at the final declaration | §4 | If S24 is named in the "what waits for final declaration" wedge; 20% for 2026/27 (22% from 2027/28 per FA 2026 Sch 1). Verify FA 2026 Royal Assent (18 Mar 2026) if 22% is referenced. |
| **TMA 1970 s.12B** | 7-year digital-records retention | §19.16 | Only if the record-keeping point is made; verify section. |
| **FA 2026 (c.11)** | Only if any FA 2026 provision (e.g. the 22% reducer) is relied upon | F-37 pattern | Royal Assent 18 Mar 2026 (program's 13th Bill-vs-enacted catch) — re-confirm at write time. |

**Hard rule:** no citation goes into the body unverified. The SI 2026/336 reg-11 + revocation note and the **first-year soft-landing** (re-verify on an HMRC source, not a vendor blog) are the highest-risk items (the §19.18 13th-catch pattern + the F-37 discipline) — re-fetch at write time.

---

## Competitor depth benchmark (Stage 2 — fetch + status-check + date-stamp at execution per §16.31)

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.freeagent.com/blog/mtd-for-income-tax-first-year-explained/ | First-year framing + soft-landing source. | The first-year soft-landing detail (re-verify the underlying HMRC source, do NOT cite the vendor blog as authority). | Vendor-led (steers to product); thin on the cumulative-vs-discrete + final-declaration distinction; no statute. |
| https://www.landlordstudio.com/uk-blog/mtd-quarterly-updates | Landlord-specific quarterly-update walkthrough. | The "what goes in a quarterly update" categorised-summary framing. | Vendor-led; no penalty-regime correctness check; no NRL/joint-owner depth; no statute. |
| https://mtd.digital/mtd-income-tax/first-mtd-quarterly-update/ | First-quarterly-update specific. | The first-update mechanics + soft-landing angle. | Thin; no scope correctness; no final-declaration distinction. |
| https://theindependentlandlord.com/mtd-landlords/ | Independent landlord-blogger overview. | Plain-English landlord framing + common-pitfall list. | Overview, not operational; risk of stale penalty/scope claims to differentiate against. |

**Competitor depth ceiling for this query class:** ~900-1,600 words, 0-3 FAQs, 0 statute citations, mostly vendor-led, no rigorous penalty/scope correctness, no quarterly-vs-final-declaration table. A ~2,400-word, 10-12 FAQ, correct points-based + correct scope + four-reference-table + statute-cited + HowTo-schema operational walkthrough is decisively best-in-class for the "how do I submit / what to include" query, not catch-up.

**Verification mandate:** re-fetch all four at execution (httpx, proper User-Agent), confirm 200, and treat any penalty/scope/threshold claim in them as suspect (verify against §3 / §19 + gov.uk, not the competitor).

---

## Query-coverage plan

One row per `target_queries[]` item from the diagnosis; each query assigned exactly once to where it is served.

| Query | source | impr | pos | served-in |
|---|---:|---:|---:|---|
| mtd quarterly updates landlords (how to submit / step-by-step) (PRIMARY) | diagnosis | n/a | n/a | metaTitle + H1 |
| how to submit mtd quarterly update | adjacent | 0 | 0 | H2#4 (How to submit ... step by step) |
| mtd quarterly update what to include | adjacent | 0 | 0 | H2#5 (What goes in each update vs final declaration) |
| making tax digital reporting requirements property costs | bing | 2 | 2 | H2#5 (body — expenses by category) |
| uk quarterly tax on rental income | bing | 1 | 3 | FAQ#4 (quarterly updates, not quarterly tax) |
| hmrc - quarterly reporting of property income | bing | 1 | 9 | H2#3 (the quarterly cycle) |
| mtd rental income | bing | 2 | 2 | Intro (body) |
| mtd for property income | gsc | 15 | 63.1 | H1 / metaDescription |
| mtd end of period statement vs final declaration | adjacent | 0 | 0 | H2#6 (EoPS and final declaration) |
| mtd first quarterly update soft landing penalty | adjacent | 0 | 0 | H2#8 (penalties + first-year soft-landing) |
| mtd itsa penalty holiday | gsc | 1 | 22 | FAQ#7 (penalty holiday / soft-landing) |
| calendar quarter election mtd landlords | adjacent | 0 | 0 | FAQ#10 (calendar-month election) |
| mtd quarterly deadlines | gsc | 1 | 25 | H2#3 (deadlines; forward-link sibling) |
| mtd deadline 2026 | gsc | 2 | 78 | Reference Table #2 (body) |
| mtd deadlines 2026 | gsc | 1 | 17 | Reference Table #2 (body) |
| do landlords need to register for mtd | gsc | 7 | 85 | H2#2 (who is in scope; forward-link register sibling) |
| when should we register for rentsal properties mtd | bing | 2 | 2 | H2#2 (body — in-scope timing) |
| landlord mtd | gsc | 9 | 56.7 | metaDescription |
| mtd itsa landlords | gsc | 2 | 73 | H2#2 (body) |
| mtd registration | bing | 15 | 6 | FAQ (forward-link to register sibling; not chased here) |
| mtd if rental starting oct 2026 | bing | 1 | 1 | H2#2 (body — mid-year start) |
| mtd thresholds | gsc | 2 | 63 | Reference Table #1 (threshold/scope) |
| mtd qualifying income gross or net | gsc | 2 | 10 | H2#2 (body — gross basis; forward-link qualifying-income sibling) |
| mtd software for landlords | gsc | 9 | 82.7 | H2#4 Step 1 (software) |
| free mtd tax software | bing | 1 | 3 | FAQ#11 (software; spreadsheet + bridging) |
| uk mtd how to get ready landlord without accountant | bing | 1 | 10 | H2#10 (getting ready and getting help) |
| nrl quarterly return | gsc | 12 | 44.4 | H2#9 (NRLQ vs MTD update) |
| quarterly nrl return | gsc | 8 | 38 | H2#9 (NRLQ vs MTD update) |
| mtd for non resident landlords | gsc | 1 | 38 | FAQ#9 (non-resident landlords) |
| mtd and non resident landlords | bing | 2 | 6 | H2#9 (body) |
| when is the first year mtd will apply for non residents landlords | bing | 3 | 1 | H2#9 (body — non-resident first year) |
| how to sign up for mtd in property and landlords scotland | bing | 2 | 1 | H2#2 (body — UK-wide; one line; forward-link register sibling) |

---

## Meta plan

- **metaTitle (≤62 chars):** "How to Submit MTD Quarterly Updates: Landlord Guide 2026" (56 chars). Leads with the operational verb the page must own ("submit ... quarterly updates"). Alternative if A/B preferred: "MTD Quarterly Updates for Landlords: How to Submit 2026" (54). Verify char count at write time.
- **metaDescription (≤158 chars):** "How UK landlords submit MTD quarterly updates: what goes in each update, what waits for the final declaration, deadlines, penalties and the first-year soft-landing." (157 chars; verify at write time, trim to ≤158 if needed.)
- **h1:** "How to Submit MTD Quarterly Updates: A Step-by-Step Guide for Landlords (2026)".
- **summary (frontmatter):** "From 6 April 2026, in-scope landlords send four cumulative quarterly updates plus a year-end final declaration. This guide covers exactly what goes in each quarterly update, what waits for the final declaration, the deadlines, the points-based penalty regime and the first-year soft-landing."

---

## Schema plan

- **reviewedBy (frontmatter `reviewedBy`):** "ICAEW Qualified Senior Reviewer" — the REAL reviewer byline used across the rewritten property corpus (consistent with the live `reviewedBy` field on existing pages; renders in `BlogPostRenderer.tsx` "Reviewed by" block and emits as `reviewedBy` Person in the BlogPosting JSON-LD per `Property/web/src/lib/schema.ts`).
- **reviewerCredentials (frontmatter `reviewerCredentials`):** "ICAEW Chartered Accountant" (emits as `jobTitle` on the reviewer Person). Keep consistent with the corpus convention.
- **howTo:** **true** — this IS a step-by-step submission page. Populate frontmatter `howToSteps` with the four submission steps from H2#4 (Step 1 software in place; Step 2 keep digital categorised records; Step 3 review cumulative year-to-date figures; Step 4 submit via software + keep the receipt). `buildHowToJsonLd` emits the HowTo block only when `howToSteps` is present.
- **dateModified:** 2026-05-30.
- **JSON-LD blocks that emit:** **Article (BlogPosting)** with `reviewedBy` Person (auto from frontmatter) + **FAQPage** (auto from frontmatter `faqs:`, 10-12 questions) + **HowTo** (auto from frontmatter `howToSteps:`). Never hand-add JSON-LD in the body; all three blocks are emitted by `Property/web/src/lib/schema.ts` from frontmatter.

---

## Universal rules (do not skip)

(Inherited per §13/§14 pointers. Critical for THIS brief: **NO em-dashes** anywhere — use commas, parentheses, full stops, middle dots. **NO pricing/fees** on-page; strip the closing "costs less than potential penalties" leak (Decision E) and add no fee figures, no third-party software price bands. **No real client names**; any case study anonymised (e.g. "a higher-rate landlord with two BTL flats and £58,000 gross rent"). **Raw HTML body**, never markdown `##` or `|`-tables; all four reference tables are plain HTML `<table>`. **LeadForm auto-injected** by `BlogPostRenderer.tsx` — never duplicate; 1-2 inline `<aside>` CTAs only. **FAQ + HowTo schema auto-emitted** from frontmatter `faqs:` / `howToSteps:` — never hand-add JSON-LD in body. **Every statute/SI verified at write time**, including the SI 2026/336 reg-11 + revocation note, the first-year soft-landing on an HMRC source, and any Finance Act Royal Assent date per F-37.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `house_positions.md` §3, §19 (esp. §19.1-§19.7, §19.18, §19.19), §4, §17.5, §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution-claimed).
3. Read this brief end-to-end.
4. **Re-verify the load-bearing facts** at write time (deterministic floor — do not trust prior memory): (a) the points-based penalty regime + the **first-year soft-landing** on an HMRC source (the FreeAgent source in diagnosis points to HMRC confirmation — find and cite the HMRC source); (b) SI 2026/336 reg 11 (calendar-quarter election) + the SI 2021/1076 revocation note at legislation.gov.uk; (c) the TWO annual obligations (EoPS + final declaration) on gov.uk; (d) the scope (partnerships deferred, trustees outside) against §3 / §19.3.
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx, proper User-Agent); treat their penalty/scope claims as suspect.
6. Read the current source file in full.
7. Read the closest siblings (pillar, deadline-calendar, penalty, register, software, joint-owner, NRL) for cluster boundaries.
8. Plan outline: 9-11 H2s, ~2,400 body words, 10-12 FAQs, FOUR plain-HTML reference tables (scope, quarterly cycle, quarterly-vs-final-declaration, old-vs-new), `howToSteps`, 1-2 inline `<aside>`, 4-6 authority links.
9. **Rewrite markdown at existing path** (NOT new file). Preserve frontmatter slug + canonical + category; set `dateModified: 2026-05-30`. Update metaTitle/metaDescription/h1/summary per the Meta plan; add `reviewedBy`, `reviewerCredentials`, `howToSteps`. **Strip** the time-based penalty regime + FAQ #3 version; **strip** the "Property Partnerships" section + the "partnerships and trustees in scope" line; **strip** the PRICING_LEAK; **add** the points-based regime + first-year soft-landing + the final-declaration distinction + the four tables; **reframe** software as examples + gov.uk finder.
10. Run build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length; `howToSteps` present + HowTo emits; em-dash count = 0; Tailwind class count = 0; metaTitle ≤62; metaDescription ≤158; all internal links resolve; pricing check (`£[0-9]` returns 0 fee-discussion matches in body; threshold figures like £50,000 are fine).
12. Confirm no redirect needed (none — rewrite-only; this page is the enrichment target; slug kept).
13. Update / insert `monitored_pages` Supabase row. **F-11 INVISIBLE-baseline rule:** Google + Bing both empty, so use the 180-day monitoring window and record the Bing operational-query baseline (pos 2-9) so the lift is measurable.
14. Commit on `main`: `git commit -m "Track 2: rewrite mtd-quarterly-reporting-landlords (wrong penalty regime + wrong scope + EOPS terminology + pricing leak; operational what-to-include wedge + depth lift)"`. Tracker edits to main repo file via absolute paths only.
15. Update `track2_page_tracker.md`: mark ✅ executed.
16. Update `track2_site_wide_flags.md` with the three flags + any new discoveries (cluster-audit candidate: other MTD pages carrying the time-based penalty regime or the partnership/trustee scope error).
17. Update `TRACK2_PROGRAM.md` §3 heartbeat.
18. Log discoveries for inter-batch awareness.
19. Next page in batch (or end batch).

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §3 / §19.1 mandate table (50k/30k/20k): __
- §19.3 scope corrected (partnerships DEFERRED + trustees OUTSIDE; body lines 31 + 119-120): __
- §19.4 joint owners file own updates (not a partnership): __
- §19.6 software product-neutral + the TWO annual obligations (EoPS + final declaration, 31 Jan; 2026/27 final declaration = 31 Jan 2028): __
- §19.7 / §19.19 penalties (points-based; £200 at 4-point threshold; 24-month window; FA 2021 Sch 24) + first-year soft-landing verified: __
- §4 Section 24 reducer handled at final declaration (not quarterly): __
- §17.5 NRLQ (agent quarterly) vs MTD quarterly update kept distinct: __
- §19.18 SI 2026/336 reg 11 (NOT SI 2021/1076): __
- §13 pricing leak stripped: __

### Comparison: before vs after
- Word count: 1,331 → __ (target ~2,400)
- H2 count: 8 → __ (target 9-11)
- FAQ count: 4 → __ (target 10-12)
- Reference/comparison tables: 1 (deadlines, prose-ish) → __ (target 4: scope, cycle, quarterly-vs-final, old-vs-new)
- Authority links: 2 → __ (target 4-6)
- Inline CTAs: 0 → __ (target 1-2)
- HowTo schema: absent → __ (present, Y/N)
- Reviewer byline: absent → __ (ICAEW Qualified Senior Reviewer, Y/N)
- Wrong time-based penalty regime removed: __ (Y/N)
- First-year soft-landing added + HMRC-source-verified: __ (Y/N)
- Partnerships/trustees scope error corrected: __ (Y/N)
- EOPS-only terminology corrected (final declaration added): __ (Y/N)
- PRICING_LEAK stripped: __ (Y/N)
- Software product list reframed as examples + gov.uk finder: __ (Y/N)

### Visibility hypothesis test
- Pre-rewrite Google GSC: INVISIBLE (target_queries pos 17-85)
- Pre-rewrite Bing: INVISIBLE-functional (1-3 impr; operational queries pos 2-9)
- Post-rewrite target: open a non-zero Google entry on the operational + soft-landing + final-declaration queries; lift the Bing operational queries toward page-1 conversion
- Verify at +30 / +60 / +90 / +180 days via monitored_pages (180-day window per F-11 INVISIBLE rule)

### Flags raised
- F-NN STALE_FACTS (wrong penalty regime) — resolution recorded: __
- F-NN HOUSE_POSITION_CONFLICT (partnerships/trustees scope) — resolution recorded: __
- F-NN PRICING_LEAK — resolution recorded: __
- Any new flags (cluster-audit candidates: other MTD pages with the time-based regime or partnership/trustee scope error): __

### 2-3 sentence summary
- (populated at execution time)
