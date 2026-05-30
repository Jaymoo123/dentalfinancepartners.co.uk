# Track 2 brief: how-to-switch-self-assessment-mtd-property-income

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; STALE_FACTS + PRICING_LEAK dominant, THIN_DEPTH + STRUCTURE + INVISIBLE secondary)
**Source markdown path:** `Property/web/content/blog/how-to-switch-self-assessment-mtd-property-income.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/how-to-switch-self-assessment-mtd-property-income
**Stage 1 priority:** H (high — the migration/transition intent has proven query demand in the MTD cluster, the source carries multiple load-bearing statute errors that are actively misleading, and a confirmed Decision-E pricing leak)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30
**Cannibalisation status:** REWRITE (confirmed distinct procedural intent within a ~25-page MTD cluster; no rankable equity to collapse; see §"Cannibalisation universe check")

> This is a gold-reference depth brief matching `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The load-bearing job is NOT polish: it is the correction of seven distinct statute/factual errors and one pricing leak, executed inside a repositioning that makes the page own the one-time migration-project intent the rest of the cluster does not serve.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `how-to-switch-self-assessment-mtd-property-income`. The slug carries the distinct "switch / transition" procedural intent (how do I MOVE from one regime to the other), which is genuinely separate from the cluster's comparison, deadline, quarterly-filing, register, and HMRC-letter pages. No redirect proposed (see cannibalisation conclusion).
- **Category:** `Making Tax Digital (MTD)` (kept; canonical path `/blog/making-tax-digital-mtd/`).
- **Gap-mode tags (in load-bearing order):** `STALE_FACTS` (primary — wrong quarterly deadlines, wrong threshold examples, invented penalty regime) + `PRICING_LEAK` (primary — Decision-E violation in FAQ + body) + `THIN_DEPTH` (secondary — 1,356 words against ~3,500-word competitor ceiling) + `STRUCTURE` (secondary — no EoPS/Final Declaration framing, no sign-up mechanics, no scope carve-outs) + `INVISIBLE` (context — 0 impressions for the exact URL; no equity at risk, so the rewrite is a pure lift with no downside).
- **"Why this rewrite" angle:** The page is the only one in the MTD cluster framed as the **one-time switch-over project** — assess records → choose and authorise software → sign up with HMRC → migrate data → run parallel → go live. That sequenced-migration intent is real and unserved by the comparison/deadline/quarterly-filing/letter pages. But the page cannot ship as-is: it tells landlords with £12,000 and £15,000 portfolios they "must switch" (they are nowhere near mandate), gives the wrong quarterly deadlines in two mutually contradictory places, invents a "£200 per quarter" + "£400 digital-records" penalty regime that does not exist, hard-codes named software products, and leaks software pricing and a cost-of-accountant link. The rewrite fixes every one of those at source, reframes around the End-of-Period Statement and Final Declaration that actually replace the annual SA105 reporting, adds the Government Gateway / Agent Services Account sign-up mechanics, states the Ltd-co / partnership / SIPP scope carve-outs so out-of-scope readers self-select, and cross-links OUT (rather than re-explaining) to the four to six sibling pages that own the adjacent intents.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (`Property/web/content/blog/how-to-switch-self-assessment-mtd-property-income.md`, 199 lines):**
- **Body word count:** ~1,356 (diagnosis figure; confirmed in the same range on read — short-form for a procedural how-to).
- **H2 outline (7 H2s + 5 H3s):**
  1. Understanding MTD for Property Income vs Traditional Self Assessment (duplicates the comparison sibling's intent — trim hard)
  2. Who Must Switch to MTD for Property Income? (carries the £12,000 / £15,000 WRONG threshold examples)
  3. Key Deadlines and Timeline (carries the WRONG 5 Aug / 5 Nov / 5 Feb / 5 May quarterly deadlines)
  4. Step-by-Step Guide to Switching (H3 Steps 1-5 — the load-bearing migration spine; keep and deepen)
  5. What Changes in Your Tax Reporting Process (H3 Quarterly / Record-Keeping / Integration — wrongly says "still complete SA100 by 31 January", no EoPS/Final Declaration)
  6. Common Challenges and Professional Support (contains the cost-of-accountant pricing link)
  7. Impact on Tax Planning, Penalties and Compliance (carries the INVENTED penalty regime: £200/quarter, £400 digital-records, software penalties)
  8. Preparing for a Successful Transition (closing checklist)
- **Meta title:** "Switch Self Assessment MTD Property: Step-by-Step Guide 2026" (58 chars — within limit, but generic and not differentiated from the register/quarterly siblings).
- **Meta description:** "Learn how to transition from Self Assessment to Making Tax Digital for property income. Complete guide covering deadlines, software, and compliance steps." (151 chars — paraphrasey, no specific hook, and promises "deadlines"/"software" that are currently WRONG on-page).
- **FAQ count (frontmatter `faqs:` array):** 4. FAQ #3 wrongly says "still complete an annual Self Assessment return by 31 January" (no EoPS/Final Declaration framing). FAQ #4 is the PRICING LEAK ("£10-£50 per month... some basic packages start from free... investment is usually offset").
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual citations anywhere on the page).
- **Internal links:** 5 — to the April-2026-deadline sibling (good), `what-does-a-property-accountant-do`, the cost-of-accountant page (**pricing-leak link, strip**), a section-24 page at `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` (verify path at write — the section-24 slug in-corpus is `section-24-tax-relief-complete-guide.md`), and a **broken `/incorporation` link** (no such route; correct target is `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`).
- **Schema present:** Y (FAQPage auto-emitted from frontmatter by `BlogPostRenderer.tsx`; do not hand-add).
- **Last meaningful edit (`date`):** 2026-04-10.

---

## GSC angle (last 90 days)

**INVISIBLE baseline — confirmed in diagnosis.** The exact URL has **0 Google impressions** in the 90-day window. Within the wider cluster, only `making-tax-digital-landlords-april-2026-deadline` registered any signal at all (1 Google impression at pos 61, 1 Bing impression). There is therefore **no rankable equity on this page to protect or destroy** — the collapse-equity guard (§16.T2) is moot in either direction, which is precisely why the diagnosis confirmed REWRITE-and-lift over collapse.

**Implication for the rewrite (per the INTENT-MISMATCH / INVISIBLE handling in §20 glossary):** there is no CTR-lift hypothesis to test against a baseline. The play is pure topical-authority build: the page is too new to have organic signal, the procedural-switch query demand is documented (the diagnosis cluster: "mtd for property income" / "landlord mtd" / "do landlords need to register for mtd" / "how to switch from self assessment to MTD"), and the corpus already ranks for adjacent MTD terms via the deadline page. Target metric at +90 days: any non-zero impression accrual on switch/transition long-tail queries, plus internal-link equity passed from the deeper sibling pages. **Set the `monitored_pages` window to 180 days from rewrite (INVISIBLE-baseline pages need the longer window per F-11 recommendation), not the standard 90.**

**GA4 engagement signal (`ga4_page_data`):** expect near-zero sessions (consistent with 0 GSC impressions). No engagement read is meaningful at this traffic level; do not over-fit the rewrite to a non-existent behavioural signal.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS — at the level of "the page is actively misleading", not "slightly dated".** Three independent factual failures, each load-bearing:

1. **Wrong quarterly deadlines, stated twice, inconsistently.** The body timeline (lines 60-63) lists **5 Aug / 5 Nov / 5 Feb / 5 May**; the frontmatter/FAQ history elsewhere in the cluster used **5 July / 5 Oct / 5 Jan / 5 April**. Per `house_positions.md §19.6` the cumulative-quarter submission deadlines are **7 August / 7 November / 7 February / 7 May** (periods 6 Apr-5 Jul, 6 Jul-5 Oct, 6 Oct-5 Jan, 6 Jan-5 Apr). Both the body and the FAQ are wrong, and they contradict each other. This is the single most reader-damaging error on the page — a landlord acting on it would file late.
2. **Wrong threshold examples that contradict the page's own £50,000 threshold.** The "Who Must Switch" section (lines 48-49) lists a "£12,000 annual rent" landlord and "£15,000+ gross rent" portfolios as **"must switch"** — both are nowhere near the £50,000 April-2026 mandate (§3 / §19.1 / §19.2). These examples will frighten out-of-scope landlords into unnecessary cost and contradict the article's own stated threshold three lines earlier. Strip and replace with correct gross-income worked examples (a £52,000-gross / £12,000-net landlord IS in scope per §19.2; a £30k-trade + £25k-rent aggregation IS in scope; a £40,000-gross landlord is NOT).
3. **Invented penalty regime.** Lines 181-183 assert "£200 per quarter after the deadline", "Failure to keep digital records: up to £400 per tax year", and "Non-compliant software: penalties". None of this is real. Per §19.7 / §19.19 the late-submission regime is **points-based**: 1 point per missed quarterly update, **£200 fixed penalty only at the 4-point threshold** (quarterly filers), points reset on the dual-condition test (12-month compliance period AND all submissions due in the preceding 24 months made). The "£400 digital-records" and "software penalty" figures are unsupported inventions — remove entirely. Late *payment* (separate from late submission) is the Spring Statement 2025 accelerated schedule: **3% from day 15, +3% from day 30, +10% per annum from day 31** (§19.7) — verify enacted status at write (see house-position conflict flag).

**Primary (co-equal): PRICING_LEAK — Decision-E violation.** FAQ #4 answers "How much will MTD-compatible software cost me" with "£10-£50 per month... some basic packages start from free... the investment is usually offset". The body (line 166) links to `/blog/property-accountant-services/how-much-does-a-property-accountant-cost` with cost-of-accountant framing. Both violate the lead-gen handoff model (memory `agency_lead_gen_model.md`: anonymised social proof only, no pricing, no client names) and Decision E (even soft fee ranges are a leak). Strip the £ figures and the cost-of-accountant link; replace the software-cost FAQ with a neutral "How do I know which software qualifies?" answer that points to the HMRC compatible-software list (§19.6 — do not hard-code product names; the body currently hard-codes QuickBooks / Xero / FreeAgent / Sage / Property Log at lines 83-87, which also goes).

**Secondary: THIN_DEPTH.** 1,356 words against a competitor ceiling of ~3,500 words / 11 H2s (Sage) and ~3,500-4,000 words (The Independent Landlord). The migration journey is under-built: no EoPS/Final Declaration, no Government Gateway/ASA sign-up mechanics, no scope carve-outs, no parallel-running detail, no worked migration example.

**Secondary: STRUCTURE.** The page never names the **End-of-Period Statement (EoPS)** or **Final Declaration** as the obligations that replace the annual SA105 reporting — it wrongly implies the landlord "still completes an SA100 / annual SA return by 31 January" unchanged (§19.6 deadlines table: EoPS + Final Declaration both due 31 January following year-end; the SA105 property pages are subsumed into the quarterly-update + EoPS + Final Declaration cycle). It also omits the HMRC pre-mandate letter context (cross-link to the letter sibling) and the sign-up-with-HMRC mechanics (Government Gateway authorisation; Agent Services Account route for accountant-filed clients, §19.10).

**Context: INVISIBLE.** 0 impressions for the exact URL; no equity to protect. This *de-risks* the rewrite entirely — there is no ranking to disturb, so the only direction is up.

**Load-bearing fix sequence (ordered by reader-harm and ROI):**

1. **Correct the three statute errors** (deadlines 7 Aug/Nov/Feb/May; strip £12k/£15k examples and replace with correct gross-test examples; replace the invented penalty regime with the §19.7/§19.19 points-based + accelerated-late-payment regime, enacted-status-verified at write). This is the load-bearing job — it is why the page is a REWRITE and not a polish.
2. **Strip the pricing leak** (software £ figures, "investment is offset" framing, cost-of-accountant link, hard-coded product names) and replace with HMRC-compatible-software-list pointer.
3. **Reframe around EoPS + Final Declaration** as the things that replace the SA105 reporting; correct the "still file SA100 unchanged" claim.
4. **Add the missing sign-up mechanics** (Government Gateway authorisation; ASA route, §19.10) — and cross-link OUT to the dedicated register sibling rather than fully re-explaining (cannibalisation discipline).
5. **Add scope carve-outs** (Ltd companies outside MTD ITSA entirely, §19.3; GP partnerships deferred to TBC, §19.3; trustees/SIPP-held property separate, §19.12) so out-of-scope readers self-select correctly.
6. **Body lift to ~3,400 words** as a sequenced switch-over project plan: pre-switch assessment → software choice + authorisation → HMRC sign-up → data migration → parallel-running dress rehearsal → go-live → first-quarter-and-beyond. One worked migration timeline example.
7. **FAQ count 4 → 12-14**, each targeting a switch/transition long-tail query verbatim; pricing FAQ removed.
8. **Authority links: 5-6 verified citations** (FA 2017 primary power; SI 2026/336 operative instrument; gov.uk sign-up + compatible-software pages; Spring Statement 2025 late-payment document if hedging penalties).
9. **Meta title + description rewrite** leading with the distinct "switch / migration project" angle, differentiated from the register and quarterly-filing siblings.

---

## Competitor URLs (Stage 2 — RE-FETCH + status-check at write time per §16.31)

| URL | Diagnosis-time status | Depth signal | Borrow / differentiate |
|---|---|---|---|
| https://www.sage.com/en-gb/blog/self-assessment-making-tax-digital-income-tax-landlords/ | LIVE 200 | ~3,500 words, 11 H2s | **Borrow:** the 11-H2 breadth as a depth ceiling and the SA-vs-MTD transition framing. **Differentiate:** Sage is a software vendor and pushes its own product; we are vendor-neutral (HMRC list pointer, no product names) and we add the EoPS/Final-Declaration + ASA + scope-carve-out depth and the lead-gen handoff. |
| https://theindependentlandlord.com/mtd-landlords/ | LIVE 200, updated 2026-03-08 | ~3,500-4,000 words | **Borrow:** landlord-practitioner tone and the "what actually changes for a landlord" pragmatism; the freshness (Mar 2026) means it likely reflects the SI 2026/336 in-force position — sense-check our reg cites against it. **Differentiate:** it is a single mega-page; we own the *switch-over project plan* sub-intent and cross-link the cluster. |
| https://www.xero.com/uk/programme/making-tax-digital/landlords-property-income/ | 503 at diagnosis fetch | Brand hub (unknown depth) | **RETRY at write before citing.** If still 503, drop it — do not cite an unreachable URL (§16.31). If live, treat as vendor hub (same vendor-neutrality differentiation as Sage). |
| https://www.sage.com/en-gb/blog/mtd-income-tax-landlords-need-to-know/ | LIVE | SERP-leader FAQ hub for the query | **Borrow:** the FAQ shape (this is the query's FAQ leader — mine it for the 12-14 verbatim-query FAQ set). **Differentiate:** vendor-neutral + correct points-based penalty regime + correct 7th-of-month deadlines (vendor pages sometimes carry the old 5th-of-month or the legacy penalty framing — do NOT copy their figures; cite §19 and verify). |

**Competitor depth ceiling for this query class:** ~3,500-4,000 words, vendor-led, generally 0 statute citations and product-pushing. Our ~3,400-word target with 12-14 FAQs, 5-6 verified statute citations, correct points-based penalty regime, correct 7th-of-month deadlines, EoPS/Final-Declaration framing, ASA mechanics, and scope carve-outs is **decisively best-in-class and more accurate than the vendor leaders** — not catch-up. The differentiator is accuracy + vendor-neutrality + the migration-project framing, not raw length.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refresh-read at batch start). The MTD cluster on disk now numbers ~38 `mtd*` / `making-tax-digital*` files (verified by directory listing 2026-05-30); the diagnosis named ~25 — the cluster has grown via MW3 Bucket A. The distinctness discipline below is therefore MORE important, not less.

| Sibling slug (all category `Making Tax Digital (MTD)`, path `/blog/making-tax-digital-mtd/`) | Owns intent | Overlap risk | Resolution |
|---|---|---|---|
| how-to-switch-self-assessment-mtd-property-income (this page) | One-time **migration / switch-over project plan** | self | REWRITE in place; tighten to the sequenced-switch intent. |
| mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle (2,506 words, 2026-05-23) | "SA vs MTD side-by-side / what changes" | HIGH if we re-explain the comparison | **Trim H2 #1 hard.** Do NOT rebuild the side-by-side; give a 2-3 sentence orientation then **forward-link** here for "what changes". |
| making-tax-digital-landlords-april-2026-deadline (1,519 words) | "April 2026 deadline / who is affected / thresholds" | MEDIUM (our "who must switch" section) | Keep our scope section short + correct; **forward-link** here for the threshold/deadline detail. (Already linked in source — preserve + fix the section's wrong examples.) |
| mtd-quarterly-reporting-landlords-step-by-step-guide (1,331 words) | "how to **file** a quarterly update" (the per-quarter mechanics) | MEDIUM (our go-live section) | Our page ends at go-live; **forward-link** here for the recurring per-quarter filing mechanics. Do not rebuild the quarterly-filing walkthrough. |
| mtd-itsa-letter-from-hmrc-what-to-do-next (1,964 words) | inbound **HMRC pre-mandate letter** recipients | LOW | One-line "if you have had an HMRC letter" pointer + **forward-link**. |
| **how-to-register-mtd-landlord-step-by-step-guide** (NOT named in diagnosis — surfaced at Stage 2) | "how to **register / sign up** with HMRC" (Government Gateway + MTD sign-up mechanics) | **HIGH — diagnosis missed this one** | **Critical differentiator.** The register page owns the HMRC sign-up sub-step in depth (Government Gateway, UTR, software linkage). THIS page must treat sign-up as ONE step in the wider migration project and **forward-link** to the register page for the sign-up detail, rather than re-explaining it. Frame the difference explicitly: "switch" = the whole transition project (records → software → sign-up → migrate → parallel → go-live); "register" = the HMRC sign-up step within it. **NB:** the register page itself carries two errors to flag (claims "cannot opt out" — contradicts §19.5 exit rule; lists "property partnerships in scope" — contradicts §19.3 deferral). Raise as a flag for a future back-patch; do NOT fix it in this brief (out of scope), but do NOT replicate either error here. |
| mtd-itsa-agent-services-account-asa-authorisation-walkthrough | ASA authorisation deep-dive | LOW | One paragraph on the ASA route for accountant-filed clients (§19.10) + **forward-link** for the walkthrough. |
| mtd-record-keeping-landlords-digital-requirements | digital-records evidence rules | LOW | Brief "what counts as a digital record" in the assess-records step + **forward-link** (§19.16). |
| best-mtd-software-landlords-2026 / mtd-software-landlords-free-vs-paid-options-compared | software selection | LOW-MEDIUM (our software-choice step) | Vendor-neutral "check the HMRC compatible-software list" + **forward-link** to the software-comparison sibling for the selection discussion. Keeps this page out of pricing entirely. |
| heres-how-you-can-exit-mtd-if-your-income-falls / mtd-itsa-exit-rule-income-drops-three-year-test | exit / income-drop rule | LOW | One-line "you can exit if income falls below threshold for three consecutive years" (§19.5) + **forward-link**. |

**COLLAPSE-DIRECTION CHECK (§16.T2):** moot. This page is INVISIBLE (0 impressions) and the nearest comparison sibling is equally invisible (0 impressions); no page in the cluster has rankable equity to destroy (only the deadline page logged a single pos-61 Google impression). With no equity differential AND a genuinely distinct procedural intent AND documented switch-query demand, the deterministic floor confirms **REWRITE-and-lift, not collapse**. Run `scripts/track2_collapse_guard.py` at execution to re-confirm the data-gated verdict before any commit, per §16.T2.

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. The distinctness is held by (a) framing strictly as a sequenced switch-over project plan (NOT a comparison, NOT per-quarter filing mechanics, NOT the standalone HMRC-registration walkthrough), and (b) cross-linking OUT to the comparison / deadline / quarterly-filing / register / letter / ASA / software / exit siblings rather than re-explaining them.

---

## Closest existing pages (Stage 2 — internal-link plan)

**Forward-links FROM this page (the cluster spokes this migration-hub page routes to):**
- `mtd-itsa-comparison-current-self-assessment-vs-mtd-cycle` — from the orientation H2 ("what actually changes").
- `making-tax-digital-landlords-april-2026-deadline` — from the scope/threshold section (already linked; preserve, fix the wrong examples around it).
- `how-to-register-mtd-landlord-step-by-step-guide` — from the HMRC sign-up step (the key differentiator forward-link).
- `mtd-quarterly-reporting-landlords-step-by-step-guide` — from the go-live / first-quarter section (the recurring filing mechanics live there).
- `mtd-itsa-agent-services-account-asa-authorisation-walkthrough` — from the "if your accountant files for you" paragraph.
- `mtd-itsa-letter-from-hmrc-what-to-do-next` — from a one-line "had a letter from HMRC?" pointer.
- `best-mtd-software-landlords-2026` (or `mtd-software-landlords-free-vs-paid-options-compared`) — from the software-choice step (vendor-neutral, replaces hard-coded product names).
- `mtd-record-keeping-landlords-digital-requirements` — from the assess-records step.
- `mtd-itsa-qualifying-income-test-gross-vs-net` — from the corrected gross-test worked examples.
- `heres-how-you-can-exit-mtd-if-your-income-falls` — from a one-line exit-rule pointer.

**Cross-category context links (keep sparing, 1-2):**
- `section-24-tax-relief-complete-guide` (category `section-24-and-tax-relief`) — light "Section 24 still applies inside MTD; track finance costs in your software" pointer (verify exact path at write; the source's `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` resolves to the in-corpus `section-24-tax-relief-complete-guide.md`).
- `buy-to-let-limited-company-complete-guide-uk` (category `incorporation-and-company-structures`) — **fix the broken `/incorporation` link.** Correct target: `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`. Use from the Ltd-co scope carve-out ("companies are outside MTD ITSA — if you are weighing incorporation, see ...").

**Back-link opportunities INTO this page** (note for execution; do not edit sibling files in this brief): the comparison, deadline, and register siblings should each gain a reciprocal "planning your switch? see the step-by-step migration guide" link at execution time.

---

## House-position references (Stage 1)

- **§3 MTD for ITSA — applicability** [LOCKED]: headline schedule — £50,000 (6 Apr 2026) / £30,000 (6 Apr 2027) / £20,000 (6 Apr 2028); Ltd cos outside; GP partnerships deferred to TBC; joint owners test their share of gross.
- **§19.1 Mandate timeline** [LOCKED 2026-05-22]: threshold tested against the relevant prior-year SA return (2024/25 return for the Apr-2026 cohort); the obligation is the taxpayer's regardless of whether HMRC's letter arrives.
- **§19.2 Qualifying income (gross, aggregated)** [LOCKED]: the load-bearing correction for the wrong £12k/£15k examples — gross turnover + gross rent before deductions; a £52,000-gross / £12,000-net landlord IS in scope.
- **§19.3 Excluded categories** [LOCKED]: Ltd cos outside MTD ITSA entirely; GP partnerships + LLPs deferred to TBC; trustees outside (SA900). The scope-carve-out section threads this.
- **§19.4 Joint-property owners** [LOCKED]: each tests their share of gross; Form 17 split can bring one spouse in earlier.
- **§19.5 Exit / income-drop + voluntary opt-in** [LOCKED]: exit after three consecutive years below threshold; voluntary opt-in from 6 Apr 2025 (pilot) / 6 Apr 2026 (general). **NB the register sibling's "cannot opt out" claim contradicts this — do not replicate.**
- **§19.6 Software requirements + quarterly cycle (the deadlines table)** [LOCKED]: HMRC-recognised compatible software (do NOT hard-code product names); software must support digital records, quarterly updates, EoPS, Final Declaration; **deadlines 7 Aug / 7 Nov / 7 Feb / 7 May; EoPS + Final Declaration both 31 January following year-end.** This is the spine that corrects the wrong deadlines AND adds the EoPS/Final-Declaration framing.
- **§19.7 Penalty regime** [LOCKED, VERIFY ENACTED STATUS at write per §16.22 Bill-vs-enacted]: points-based late submission (1 point/miss, £200 at 4-point threshold); late payment 3% day-15 / +3% day-30 / +10% p.a. day-31 (Spring Statement 2025; cite the SS2025 HTML or the FA 2025 amendments to FA 2021 Sch 26 once enacted — verify).
- **§19.10 Agent Services Account (ASA)** [LOCKED 2026-05-23]: ASA is the mandatory agent route from 6 Apr 2026; client authorises via Government Gateway through the gov.uk authorisation portal; joint owners each authorise separately.
- **§19.12 Pension funds + rental property** [LOCKED 2026-05-23]: SIPP/SSAS-held property is outside the personal MTD ITSA cycle and must NOT be combined with the personal portfolio for the threshold test.
- **§19.16 Digital-records evidence discipline** [LOCKED 2026-05-23]: app-captured receipts, bank-feed extracts, software entries count; shoeboxed paper does not — informs the "assess your records" step and corrects the source's vague "shoe boxes won't work" line.
- **§19.18 SI 2021/1076 → SI 2026/336 migration** [LOCKED 2026-05-27]: the operative instrument is now **The Income Tax (Digital Obligations) Regulations 2026 (SI 2026/336)**, in force 1 April 2026 — SI 2021/1076 was REVOKED. **Any operative reg cite MUST use SI 2026/336**; SI 2021/1076 only in historical/migration context. (This page is unlikely to need a granular reg number, but if it cites the operative instrument it must be SI 2026/336.)
- **§19.19 Points-based late-submission detail** [LOCKED 2026-05-27]: regime sits at **FA 2021 Schedule 24** (NOT FA 2007 Sch 24, the inaccuracy regime — naming collision); reset is the dual-condition test (12-month compliance period AND all submissions due in the preceding 24 months made).
- **§13 Do-not-write list** [LOCKED]: NO pricing; NO real client names; anonymised social proof only. Governs the pricing-leak strip.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflicts — the published page contradicts locked house positions in five places. These are the rewrite's first job, ahead of any depth work.**

1. **§19.6 deadlines.** Source body lists 5 Aug / 5 Nov / 5 Feb / 5 May; locked deadlines are **7 Aug / 7 Nov / 7 Feb / 7 May**. Body + FAQ both wrong and mutually inconsistent.
2. **§3 / §19.2 threshold.** Source's "Who Must Switch" lists £12,000 and £15,000 portfolios as "must switch" — below the £50,000 mandate; reader-misleading; strip and replace with correct gross-test examples.
3. **§19.7 / §19.19 penalties.** Source asserts "£200 per quarter", "£400 digital-records", "software penalties" — the regime is points-based (£200 only at the 4-point threshold); the £400 and software-penalty figures are invented. Remove.
4. **§19.6 EoPS / Final Declaration.** Source says the landlord "still completes an SA100 / annual SA return by 31 January" unchanged — it omits the EoPS + Final Declaration that replace the SA105 reporting. Reframe.
5. **§13 pricing.** FAQ #4 + body cost-of-accountant link leak fees. Strip per Decision E.

**FLAG to `track2_site_wide_flags.md` (numbering continues from the live sequence at execution):**
- **MTD-switch STALE_FACTS triple** | 2026-05-30 | HIGH | how-to-switch-self-assessment-mtd-property-income | wrong quarterly deadlines (5th vs 7th), below-mandate threshold examples (£12k/£15k), invented penalty regime (£200/quarter + £400 digital + software). Fix at rewrite. **Audit follow-up: the 5th-vs-7th-of-month deadline error and the invented-penalty pattern are corpus-wide risks across the ~38-page MTD cluster — recommend a §16.43 STALE-sweep of every MTD page's deadline table + penalty section.**
- **MTD-switch PRICING_LEAK** | 2026-05-30 | HIGH | how-to-switch-self-assessment-mtd-property-income | software £10-£50/mo FAQ + cost-of-accountant link + hard-coded product names. Decision-E violation. Strip at rewrite.
- **Register-sibling errors (cross-page, for future back-patch — NOT fixed in this brief)** | 2026-05-30 | MEDIUM | how-to-register-mtd-landlord-step-by-step-guide | claims "cannot opt out of MTD" (contradicts §19.5 exit rule) and lists "property partnerships in scope" (contradicts §19.3 deferral). Flag for a future MTD-cluster back-patch.

---

## Authority links worth considering (Stage 2 — VERIFY all at write time per §16.31, incl. Royal-Assent dates per the F-37 Bill-vs-enacted discipline)

| URL / source | Verification note | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2017/32/section/60 (Finance (No. 2) Act 2017, ss.60-62 + Sch A1 TMA 1970) | VERIFY at write — FA 2017 is the primary power that inserts the MTD digital-reporting obligation into TMA 1970. Confirm section is still operative (not substituted) and confirm the exact section/schedule for the landlord digital-record obligation. | Primary statutory power for MTD ITSA |
| https://www.legislation.gov.uk/uksi/2026/336/contents (The Income Tax (Digital Obligations) Regulations 2026, SI 2026/336) | VERIFY in force from 1 April 2026 (§19.18 confirms; re-fetch to confirm the page header does not show a later revocation). **This is the operative instrument — NOT SI 2021/1076, which is revoked.** | Operative MTD ITSA regulations (cite if a reg-level cite is used) |
| https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax (or the current "sign up for MTD for Income Tax" guidance) | VERIFY exact live URL at write (gov.uk guidance URLs change). | The HMRC sign-up step (Government Gateway) — link-out for the sign-up mechanics |
| https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax | VERIFY exact live URL at write. | Compatible-software list (replaces hard-coded product names; §19.6) |
| https://www.gov.uk/guidance/get-an-hmrc-agent-services-account | VERIFY at write. | ASA route for accountant-filed clients (§19.10) |
| https://www.gov.uk/government/publications/spring-statement-2025-document/spring-statement-2025-html | VERIFY at write — the verbatim source for the 3%/3%/10% on 15/30/31 day-triggers (§19.7). | Late-payment penalty figures (cite the SS2025 HTML, or FA 2025 amendments to FA 2021 Sch 26 once that enactment is confirmed) |

**Royal-Assent / Bill-vs-enacted discipline (mandatory):** before asserting the 3% / 3% / 10% late-payment figures as *enacted*, verify the FA 2025 amendment status on legislation.gov.uk at write (the §16.22 / F-37 pattern). If the amendments are not yet enacted, cite the Spring Statement 2025 HTML as the announced-and-effective-for-MTD-ITSA source rather than asserting an unenacted Finance Act section. The points-based late-submission regime (FA 2021 Sch 24, §19.19) is in force — assert with citation. **(Execution session selects 5-6 to actually cite in body.)**

---

## metaTitle / metaDescription / h1 plan (Stage 2)

The page is INVISIBLE, so there is no prior-meta-failure to diagnose — the job is to differentiate sharply from the register/quarterly/comparison siblings on the distinct "switch / migration project" angle. Lead with the transition-as-a-project framing, not "register" (owned by the register sibling) and not "deadlines" (owned by the deadline sibling).

- **metaTitle candidates** (≤ 62 chars; pick one at write, test against the switch/transition query phrasing):
  1. "Switching to MTD for Property Income: A Landlord's Plan" (54)
  2. "How to Move from Self Assessment to MTD: Landlord Guide" (55)
  3. "MTD for Landlords: The Switch-Over Plan, Step by Step" (53)
  - Avoid "register" and "deadline" in the title to hold cluster distinctness.
- **metaDescription** (≤ 158 chars; specific, names the migration milestones, no pricing, soft handoff hook): "The step-by-step plan to move your property income from Self Assessment to MTD: check your records, choose software, sign up with HMRC, migrate and go live."  (154 chars — verify count at write.)
- **h1:** "How to Switch from Self Assessment to MTD for Property Income" (drop the "in 2026" year-stamp to reduce annual-staleness; the body carries the dated schedule). Keep aligned to the slug's "switch" intent.

---

## Section-by-section content plan to ~3,400 words

Target: 11-13 H2s, ~3,400 body words, 12-14 FAQs, rates/deadline table, 1 worked migration-timeline example, 2 inline `<aside>` CTAs (after the sign-up section and after the go-live section), 5-6 verified authority links. Raw HTML body (`<p>`, `<h2>`, `<ul>` — no markdown syntax, per the HTML-in-frontmatter memory note). No em-dashes anywhere.

1. **Intro (~150 words)** — who this is for (a landlord already on Self Assessment who is now over, or approaching, the £50,000 mandate) and what the page is (the one-time switch-over plan, not a comparison and not the per-quarter filing guide). One-line forward-links to the comparison sibling ("what actually changes") and the deadline sibling ("am I in scope and by when").
2. **H2: Are you actually in scope? (the gross-income test) (~300 words)** — corrects error #2. The £50,000 (Apr 2026) / £30,000 (Apr 2027) / £20,000 (Apr 2028) schedule (§3); the **gross** test (§19.2) with two correct worked examples: (a) £52,000 gross / £12,000 net = IN scope; (b) £30k trade + £25k rent aggregated = IN scope; (c) £40,000 gross = NOT yet in scope. Joint-owner share-of-gross note (§19.4) + forward-link to the qualifying-income sibling. Forward-link to the deadline sibling. **Strip the £12k/£15k "must switch" examples entirely.**
3. **H2: Who is NOT switching (scope carve-outs) (~250 words)** — §19.3: limited companies are outside MTD ITSA entirely (forward-link to the BTL Ltd-co guide — fix the broken `/incorporation` link); GP partnerships + LLPs deferred to TBC; trustees outside (SA900); SIPP/SSAS-held property separate and not combined for the threshold test (§19.12). Lets out-of-scope readers self-select and stops the page frightening sub-threshold landlords.
4. **H2: What the switch actually changes (orientation, kept short) (~200 words)** — the high-level before/after in 3-4 sentences, then forward-link to the comparison sibling. Introduces the EoPS + Final Declaration as the obligations that replace the SA105 reporting (§19.6) — corrects error #4. Do NOT rebuild the side-by-side (cannibalisation).
5. **H2: Step 1 — Assess your current records (~300 words)** — what counts as a digital record (§19.16: app receipts, bank-feed extracts, software entries) vs what does not (shoeboxed paper, memory notes); the digital-link rule in one sentence (§19.14) + forward-link to the record-keeping sibling. Frame as the audit you do before choosing software.
6. **H2: Step 2 — Choose compatible software (vendor-neutral) (~250 words)** — software must support digital records + quarterly updates + EoPS + Final Declaration (§19.6); **point to the HMRC compatible-software list (no product names)**; spreadsheet-plus-bridging is allowed if the bridging tool is on the list (§19.6/§19.14) + forward-link to the software-comparison sibling. **Strip the QuickBooks/Xero/FreeAgent/Sage/Property Log list and all £ figures.** Corrects error #5 (pricing).
7. **H2: Step 3 — Sign up with HMRC (~300 words)** — the Government Gateway route; you sign up *after* choosing software (you link the software during sign-up); the obligation is yours regardless of whether HMRC's letter arrives (§19.1); one-line "had a letter from HMRC?" pointer to the letter sibling. **Keep this a step, not a full walkthrough — forward-link to the register sibling for the granular sign-up screens** (the key cannibalisation differentiator). Inline `<aside>` CTA #1 here (handoff to discovery call for "want this done for you").
8. **H2: Step 3a — If your accountant files for you (ASA) (~200 words)** — the Agent Services Account route (§19.10): agent raises an authorisation request, client approves via Government Gateway, joint owners each authorise separately, authorisations do not transfer on agent change. Forward-link to the ASA walkthrough sibling.
9. **H2: Step 4 — Migrate your data (~300 words)** — opening balances, historical income/expense by property, bringing the current part-year in; categorise into the SA105 categories so quarterly-update lines map cleanly (§19.13/§19.14); the trap of reporting "net of agent fees" as gross (§19.13). Worked migration-timeline example here (see below).
10. **H2: Step 5 — Run parallel before go-live (~250 words)** — the dress-rehearsal quarter: keep your existing method running while you practise a quarterly update in the new software during the run-up; what "good" looks like before April; how to spot reconciliation gaps. Vendor-neutral.
11. **H2: Go-live and your first year on MTD (~350 words)** — the quarterly cycle with the **correct deadlines table** (§19.6: 7 Aug / 7 Nov / 7 Feb / 7 May; EoPS + Final Declaration both 31 January following year-end). Corrects error #1 and #4. Quarterly updates are cumulative and not the final figure; the EoPS + Final Declaration replace the old SA105 annual reporting; forward-link to the quarterly-filing sibling for the per-update mechanics. Inline `<aside>` CTA #2 here. Worked timeline example continues.
12. **H2: Penalties if you slip (the real regime) (~300 words)** — corrects error #3. Points-based late submission (§19.7/§19.19): 1 point per missed quarterly update, £200 fixed penalty only at the 4-point threshold, reset on the dual-condition test; FA 2021 Sch 24 (not FA 2007 Sch 24). Late *payment* is separate: 3% day-15 / +3% day-30 / +10% p.a. day-31 (§19.7) — **hedge or assert per the write-time enactment check.** Explicitly state there is no "£200 per quarter" and no "£400 digital-records" penalty (kills the source's invented figures so the corrected framing displaces them in any cached snippet).
13. **H2: If your income later falls (the exit route) + getting help (~250 words)** — exit after three consecutive years below threshold (§19.5); voluntary opt-in note; forward-link to the exit sibling. Close with an anonymised social-proof handoff line (no client name, no fee) and the auto-injected LeadForm context. No pricing.

**Worked migration-timeline example (runs across Steps 4-5 + go-live):** an anonymised single landlord, ~£60,000 gross rent across three properties, currently on spreadsheets, mapping a realistic run-up: records audit (early) → software choice + HMRC sign-up (mid) → data migration of opening balances + part-year (later) → a parallel dress-rehearsal quarter before 6 April → first real quarterly update due 7 August → EoPS + Final Declaration the following 31 January. No fees, no product names, no real name.

**FAQ set (12-14, each a verbatim switch/transition long-tail; pricing FAQ removed):** e.g. "Do I have to switch if my income is below the threshold?" (no — voluntary, §19.5); "When is my first quarterly update due after I switch?" (7 August for the 6 Apr-5 Jul quarter, §19.6); "Does MTD replace my Self Assessment return?" (the quarterly updates + EoPS + Final Declaration replace the SA105 reporting; you still report non-property income, §19.6); "Do I still file an SA100 by 31 January?" (the Final Declaration is the year-end obligation, due 31 January, §19.6); "How do I know which software qualifies?" (HMRC compatible-software list, no products, §19.6 — **replaces the pricing FAQ**); "Can my accountant do this for me?" (yes, via ASA, §19.10); "I run a limited company — do I switch?" (no, Ltd cos are outside MTD ITSA, §19.3); "Do partnerships have to switch in April 2026?" (no, deferred to TBC, §19.3); "What if I miss a quarterly update?" (points-based, £200 only at 4 points, §19.7); "Can I leave MTD if my income drops?" (after three consecutive years below threshold, §19.5); "How long does HMRC sign-up take / when should I start?"; "Do joint owners each switch separately?" (each tests share of gross + each authorises separately, §19.4/§19.10); "What records do I need before I start?" (digital records, §19.16); "Had a letter from HMRC about MTD?" (pointer to letter sibling).

---

## Universal rules (do not skip)

(Inherited per §4 section 13 pointers — `NETNEW_PROGRAM.md §4` voice block + `competitor_rewrite_playbook.md §5`. **Critical for this brief:** NO em-dashes anywhere (use commas, parentheses, full stops, middle dots). NO pricing numbers in body or FAQs (Decision E — no software £ figures, no "investment is offset", no cost-of-accountant link). NO hard-coded software product names (HMRC list pointer only, §19.6). NO real client names; anonymised social proof only. LeadForm auto-injected by `BlogPostRenderer.tsx` — do not duplicate; 1-2 inline `<aside>` CTAs at conversion moments only. FAQs in frontmatter `faqs:` array (target 12-14); never hand-add FAQ schema in body. Body is raw HTML, not markdown syntax. Every statute cite verified against legislation.gov.uk at write, including Royal-Assent date of any cited Finance Act.)

---

## 19-step workflow (legacy-rewrite adaptation)

1. Read `docs/property/house_positions.md` §3, §13, §19 (all sub-sections, esp. §19.1/.2/.3/.4/.5/.6/.7/.10/.12/.16/.18/.19) in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting / execution status as appropriate).
3. Read this brief end-to-end.
4. **Verify the §19.7 late-payment enactment status** (FA 2025 amendments to FA 2021 Sch 26) against legislation.gov.uk — hedge to the Spring Statement 2025 HTML source if not yet enacted; assert with citation if enacted. **Also re-confirm SI 2026/336 is in force and SI 2021/1076 remains revoked** (§19.18). This is the load-bearing pre-rewrite verification.
5. Re-fetch the 4 competitor URLs to confirm liveness (retry the Xero 503; drop any non-200 per §16.31).
6. Read the current source file in full + the 6 closest siblings (comparison, deadline, quarterly-filing, register, letter, ASA) for cross-link anchors and distinctness.
7. Plan the rewrite outline per the section-by-section plan above (11-13 H2s, ~3,400 words, 12-14 FAQs, correct deadlines table).
8. **Rewrite markdown at the existing path** (NOT a new file). Preserve frontmatter slug + canonical + category; update `dateModified`/`date` to write date. Apply the new metaTitle/metaDescription/h1.
9. Fix the broken `/incorporation` link → `/blog/incorporation-and-company-structures/buy-to-let-limited-company-complete-guide-uk`; verify the section-24 link path; strip the cost-of-accountant link.
10. Run `scripts/track2_collapse_guard.py` to re-confirm REWRITE (data-gated, §16.T2) — expected verdict REWRITE (no equity).
11. Run site build: `cd Property/web && npm run build`. Must pass.
12. Run six checks + the per-batch QA chain (§16.T5): em-dash count = 0; pricing-figure check (`£[0-9]` returns 0 fee-discussion matches in body/FAQs); hard-coded-software-product check = 0; FAQ schema count = frontmatter `faqs:` length; meta title ≤ 62 chars; meta description ≤ 158 chars; all internal links resolve; every statute cite WebFetched and verified (incl. FA Royal-Assent date).
13. Confirm no redirect needed (none — REWRITE in place).
14. Update `monitored_pages` Supabase row — insert if not tracked; **180-day window from rewrite date (INVISIBLE baseline, per F-11)**, `rewrite_type = 'rewrite'`.
15. Commit on `main`: `git commit -m "Track 2: rewrite how-to-switch-self-assessment-mtd-property-income (STALE_FACTS deadlines+penalties+threshold, pricing-leak strip, EoPS/ASA depth lift)"`.
16. Update `track2_page_tracker.md`: mark ✅ executed.
17. Update `track2_site_wide_flags.md` with the three flags above (STALE_FACTS triple, PRICING_LEAK, register-sibling cross-page errors).
18. Update `TRACK2_PROGRAM.md` §3 heartbeat.
19. Log discoveries (esp. the corpus-wide MTD deadline + penalty audit recommendation) for inter-batch awareness; next page in batch or end.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §3 / §19.1 / §19.2 threshold + gross test (wrong £12k/£15k examples removed): __
- §19.3 scope carve-outs (Ltd co / partnership / trustee / SIPP): __
- §19.6 deadlines corrected to 7 Aug / 7 Nov / 7 Feb / 7 May + EoPS/Final Declaration framing: __
- §19.7 / §19.19 penalty regime corrected (points-based; invented £200/quarter + £400 + software penalties removed): __ ; late-payment enacted status at write: __ Spring Statement 2025 HTML (hedge) / __ FA 2025 enacted (assert with citation)
- §19.10 ASA + Government Gateway sign-up added: __
- §19.18 operative instrument = SI 2026/336 (not SI 2021/1076): __
- §13 pricing leak removed (software £ figures + cost-of-accountant link + product names): __

### Comparison: before vs after
- Word count: 1,356 → __ (target ~3,400)
- H2 count: 7 (+5 H3) → __ (target 11-13)
- FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 5-6)
- Inline CTAs: 0 → __ (target 2)
- Deadlines table corrected: __ (Y/N)
- Pricing leak removed: __ (Y/N) ; hard-coded product names removed: __ (Y/N)
- Broken `/incorporation` link fixed: __ (Y/N)

### Flags raised
- STALE_FACTS triple (carried from brief): __ resolved
- PRICING_LEAK (carried from brief): __ resolved
- Register-sibling cross-page errors (carried — NOT fixed here, logged for future back-patch): __
- Corpus-wide MTD deadline + penalty audit recommendation logged: __
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
