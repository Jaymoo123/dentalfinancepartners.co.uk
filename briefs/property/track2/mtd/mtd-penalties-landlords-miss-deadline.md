# Track 2 brief: mtd-penalties-landlords-miss-deadline

**Site:** property
**Brief type:** Legacy rewrite (existing markdown file; STALE_FACTS wrong-advice + INVISIBLE + CANNIBAL gap dominant)
**Source markdown path:** `Property/web/content/blog/mtd-penalties-landlords-miss-deadline.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/making-tax-digital-mtd/mtd-penalties-landlords-miss-deadline
**Stage 1 priority:** H (high — load-bearing wrong-advice on a compliance page; the page currently tells landlords they accrue penalty points for 2026/27 quarterly misses, which gov.uk verbatim contradicts)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (GSC pattern + WebFetched gov.uk authority + 2 verified sibling pages + verified statutes)
**Cannibalisation status:** REWRITE (rewrite-only rule is non-negotiable per memory `feedback_rewrite_only_no_collapse`; sharp repositioning to the beginner / plain-English / scenario on-ramp intent, with depth deferred downstream to the two statute-grade siblings)

> **Decision rationale recap.** This is the WEAKEST of three on-site MTD-penalty pages (0 inbound internal links, 0 GSC, 0 Bing). Equity direction means a collapse could only point THIS page INTO the catalogue, never the reverse — but collapse is forbidden by the standing rewrite-only rule. The page is therefore REWRITTEN into a sharply differentiated friendly on-ramp: "I'm a landlord, what literally happens if I miss a deadline?" Deep statute (worked numbers; exemptions; appeals case law) is DEFERRED to the two siblings via forward links. The first job of the rewrite is to fix the load-bearing wrong advice (see House-position conflict flag).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `mtd-penalties-landlords-miss-deadline`. The slug carries the consequence-and-scenario intent ("miss deadline") that the two statute-grade siblings do not target in their slugs. No redirect proposed (rewrite-only rule).
- **Category:** `Making Tax Digital (MTD)` (kept).
- **Gap-mode tag:** `STALE_FACTS` (primary, wrong-advice) + `INVISIBLE` (secondary, 0 GSC / 0 Bing / 0 inbound links) + `CANNIBAL` (tertiary, dense 3-page penalty cluster) + `THIN_DEPTH` + `STRUCTURE`.
- **"Why this rewrite" angle:** Three problems compound. (1) **Wrong advice:** the page asserts penalty points apply to 2026/27 quarterly updates and walks "Sarah misses her first three quarterly updates in 2026/27 ... three penalty points" — gov.uk states verbatim "There are no penalties for missing a quarterly update deadline for the 2026 to 2027 tax year." Points only start for quarterly updates from 2027/28. The page is actively misleading on a compliance topic. (2) **Wrong regime mixing:** the "Annual Return Penalties" section applies the legacy SA daily-penalty stack (£100 + £10/day capped £900 + 5% milestones) to the MTD final declaration; under MTD ITSA late filing is the SAME points-based system (FA 2021 Sch 24), not the old daily stack. (3) **Invisible + undifferentiated:** 0 GSC, 0 inbound links, 0 statute. The rewrite repositions this page as the BEGINNER, PLAIN-ENGLISH, CONSEQUENCE-AND-SCENARIO on-ramp (lead with the soft-landing reassurance + three landlord scenarios + a "what to do if you get a notice" decision flow), and forward-links the numeric depth and the statute/exemptions/appeals depth to the two siblings that own those intents. Body lift to ~2,600 words, 12-14 FAQs, soft-landing-first framing, one timeline reference table, one decision-flow.

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

- **Current word count:** ~1,238 (body)
- **Current H2 / H3 outline:**
  1. Understanding the MTD Penalty Structure for Landlords (H3: How the Points-Based Penalty System Works; H3: Quarterly Update Deadlines and Penalties)
  2. Annual Return and Payment Deadline Penalties (H3: Annual Return Penalties Under MTD; H3: Payment Deadline Penalties)
  3. Reasonable Excuse and Appeal Options
  4. Technology Failures and MTD Penalties
  5. Penalty Examples for Different Landlord Scenarios (H3: Single BTL Property Owner; H3: Portfolio Landlord; H3: Commercial Property Investor)
  6. How to Avoid MTD Penalties
  7. Impact on Property Investment Decisions and Professional Help
- **Current meta title:** "MTD Penalties for Landlords: Missing Deadlines Guide 2026" (56 chars)
- **Current meta description:** "MTD penalties for landlords explained: late submission fines, points-based system, appeal process. What happens if you miss MTD deadlines from April 2026." (152 chars)
- **Current h1:** "MTD Penalties for Landlords: What Happens If You Miss a Deadline?"
- **Current FAQs (frontmatter count):** 4 (target 12-14)
- **Current outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. Internal links: 4 (`/what-does-a-property-accountant-do`, `/buy-to-let-limited-company-complete-guide-uk`, `/making-tax-digital-landlords-april-2026-deadline`, `/section-24-tax-relief-complete-guide`) — note two of these may be stale/relative-root rather than canonical category paths; verify at write time.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter). No `reviewedBy` / `reviewerCredentials` / `dateModified` fields (missing E-E-A-T signals the canonical sibling carries).
- **Last meaningful edit date:** 2026-04-10 (frontmatter `date`).
- **Load-bearing defects:** (a) body line 26-28 + scenario "Sarah ... three penalty points accumulated in 2026/27" = factually wrong (no points for 2026/27 quarterly misses); (b) "Annual Return Penalties Under MTD" section + FAQ #4 apply legacy SA daily-penalty stack to MTD final declaration = wrong regime; (c) 0 statute citations on a statute-driven compliance topic.

---

## GSC angle (last 90 days) — diagnosis-supplied signal

**This page is INVISIBLE.** Per the diagnosis: 0 GSC impressions on the page-level target query, 0 Bing, 0 inbound internal links. The proven-demand signal comes from the **cluster** and from **competitor-confirmed** queries, not from this page's own history:

- `mtd deadline 2026` — 2 impr, pos 78 (cluster)
- `mtd deadlines 2026` — 1 impr, pos 17 (cluster)
- `mtd itsa penalty holiday` — 1 impr, pos 22 (cluster; this is the soft-landing query — directly served by the repositioning)
- `mtd quarterly deadlines` — 1 impr, pos 25 (cluster)
- `mtd itsa late submission points` — 1 impr, pos 22 (sibling `...15-30-31-worked` proven-demand signal)
- Adjacent, competitor-confirmed (no on-site GSC yet): "what happens if you miss an mtd quarterly deadline", "mtd late submission penalty points threshold", "mtd soft landing 2026 27 penalties", "mtd late payment penalty 15 30 days", "reasonable excuse mtd penalty appeal".

**Read:** the page has never ranked because it is thin, undifferentiated against two stronger siblings, and has no inbound link equity. The rewrite's job is not CTR-lift on an existing position; it is to BUILD a defensible position on the consequence-and-scenario intent the siblings do not chase, and to earn inbound links from the cluster (see Closest existing pages — the catalogue and the deadlines page should forward-link here on rewrite). Realistic target: move from 0 to a page-1/page-2 foothold on "what happens if I miss an MTD deadline" / "mtd soft landing first year" / "mtd itsa penalty holiday" over a 180-day INVISIBLE-baseline monitoring window.

### GA4 engagement signal

Not pulled (page is effectively pre-traffic). Defer to the +90/+180 day monitored_pages reads.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: STALE_FACTS (load-bearing wrong-advice).** The page tells a 2026/27 landlord that missing quarterly updates accrues penalty points and walks a worked scenario to "three penalty points." gov.uk (verified 2026-05-30) states verbatim "There are no penalties for missing a quarterly update deadline for the 2026 to 2027 tax year"; points only attach to quarterly updates "for tax years after 2026 to 2027" (i.e., from 2027/28). On a compliance page this is the single most important defect — it must be the first thing the rewrite fixes, and the soft landing must LEAD the page, not be a footnote. Note the soft landing does NOT cover the final declaration / tax return obligation, and does NOT switch off the late-payment regime entirely (gov.uk shows a first-year softening on late payment too, see §19.7 reconciliation below). The rewrite must surface exactly what IS and ISN'T covered.

**Secondary: INVISIBLE.** 0 GSC / 0 Bing / 0 inbound links. The page has no equity to protect, so the rewrite is a clean rebuild, not a delicate CTR tweak. The win comes from owning a distinct, un-served intent and earning cluster inbound links.

**Tertiary: CANNIBAL (dense cluster, resolved by sharp repositioning).** Three on-site pages target the penalties intent. The rewrite differentiates by intent layer:
- **THIS page** owns the **beginner / plain-English / consequence-and-scenario** layer ("what literally happens if I miss a deadline?", soft-landing reassurance, decision-flow on a notice).
- **`mtd-itsa-late-submission-points-late-payment-15-30-31-worked`** owns the **numeric calculation** layer (£2k/£10k/£30k worked late-payment maths). FORWARD-LINK for the numbers; do not reproduce the worked maths here beyond one illustrative line.
- **`mtd-penalties-exemptions-and-what-to-watch`** is the **de-facto cluster canonical** and owns the **statute + exemptions + appeals depth** layer (FA 2021 Sch 24/26 paragraph-level, SI 2026/336 reg-by-reg, Perrin/Martland). FORWARD-LINK for the depth; do not reproduce paragraph-level statute or case-law analysis here.

**Quaternary: THIN_DEPTH + STRUCTURE.** 1,238 words / 4 FAQs / 0 statute / 0 reviewer metadata vs a statute-grade sibling at ~3,000+ words / 14 FAQs / reviewer byline. The on-ramp does NOT need to match the canonical's depth (that would re-create the cannibalisation), but it does need: soft-landing-first structure, a clean year-by-year timeline reference table, three corrected scenarios, a decision-flow, 12-14 plain-English FAQs, light statute threading (named, verified, but not paragraph-deep), reviewer byline + dateModified.

**Load-bearing fix sequence (ordered by ROI):**

1. **Fix the wrong advice first.** Lead the page with the 2026/27 soft landing (gov.uk verbatim), then state precisely what it does and does not cover (covers: quarterly-update misses 2026/27; does NOT cover: the final declaration / tax return, and late payment has only a first-year softening, not a full holiday). Rework all three scenarios so none asserts 2026/27 quarterly points.
2. **Delete the legacy-SA daily-penalty stack** from the "Annual Return Penalties" section + FAQ #4. Replace with: MTD ITSA late FILING is the SAME points-based system (FA 2021 Sch 24); the final declaration / tax return is a points obligation, not the old £100 + £10/day + 5% stack.
3. **Reposition** to the beginner / scenario / decision-flow on-ramp; strip overlapping deep statute so the page is not a thin third copy of the catalogue.
4. **Add a year-by-year timeline reference table** (2026/27 vs 2027/28 onwards; quarterly-update penalties; late-payment percentages) for scannability.
5. **Add a "what to do if you get a notice" decision-flow** (plain-English, pointing to the appeals depth on the catalogue).
6. **FAQ 4 → 12-14**, each targeting a plain-English zero-click / adjacent query verbatim.
7. **Thread verified statutes lightly** (named Acts/SIs, verified at write time; not paragraph-deep — depth lives on the catalogue).
8. **Forward-link both siblings** prominently (numbers → worked page; depth → catalogue) + earn reciprocal inbound links from the cluster.
9. **Add E-E-A-T metadata** (`reviewedBy` + `reviewerCredentials` + `dateModified`) matching the cluster's reviewer.

---

## Competitor URLs (Stage 2 — verify liveness at execution per §16.31)

| URL | Status (diagnosis) | Coverage signals | Borrow / differentiate |
|---|---|---|---|
| https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax | 200 (AUTHORITY) | Verbatim "There are no penalties for missing a quarterly update deadline for the 2026 to 2027 tax year"; 4-point/£200; 15/30/31 late-payment with year-by-year % phase-in (3%/3% in 2026-27 softened first year, 4%/4% from 2027-28, 10% pa from day 31) | **Anchor authority.** Cite + link as the canonical source for the soft landing. This is the page we LINK to for users who want gov.uk; we add the specialist scenario + decision layer it does not give. |
| https://www.cottonsgroup.com/resources/blog/mtd-quarterly-deadline/ | 200, ~2,400 words | 4-point/£200 + 2026-27 soft landing + 15/30/31 late-payment | Borrow: clear soft-landing framing. Differentiate: our scenario-led + decision-flow on-ramp. |
| https://www.getcoconut.com/knowledge-hub/mtd-deadlines-explained-when-you-must-submit-and-what-happens-if-you-dont | 200, ~1,200 words | 4-point/£200 + 2026-27 soft landing + points-reset 12mo/24mo | Borrow: "what happens if you don't" framing matches our target intent. Differentiate: dual-condition reset accuracy + our forward-link depth. |
| https://www.litrg.org.uk/tax-nic/making-tax-digital-income-tax/making-tax-digital-penalties | live | Soft landing + 30-day-then-15-day grace detail | Borrow: consumer-grade plain-English tone (LITRG is a low-income-taxpayer charity; closest tonal match to our beginner intent). Differentiate: landlord-specific scenarios. |

**Competitor depth ceiling for this beginner-intent query class:** ~1,200-2,400 words, 0 statute citations, plain-English. Our ~2,600-word on-ramp with verified statute threading + three corrected scenarios + a timeline table + a decision-flow + 12-14 FAQs + two forward-links to deeper on-site siblings puts us best-in-class for the consequence intent without re-creating the cannibalisation against our own canonical.

**At execution:** re-fetch all four (httpx, proper User-Agent); reject non-200; the gov.uk authority link is mandatory regardless.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (consult the latest in-flight snapshot at execution; MTD cluster).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | mtd-penalties-landlords-miss-deadline | self | REWRITE in place; reposition to beginner / consequence / scenario layer |
| Sibling (2026-05-23) | mtd-itsa-late-submission-points-late-payment-15-30-31-worked | NUMERIC calculation intent (£2k/£10k/£30k worked maths; 9+ numeric FAQs; 1 inbound link; 1 GSC impr pos 22) | NO collision after repositioning. This page DEFERS all numeric worked examples to it. FORWARD-LINK from the late-payment section + the cumulative-cost FAQ. |
| Sibling (2026-05-28, de-facto canonical) | mtd-penalties-exemptions-and-what-to-watch | STATUTE + EXEMPTIONS + APPEALS DEPTH (FA 2021 Sch 24/26 paragraph-level; SI 2026/336 reg-by-reg; Perrin/Martland; 4 inbound links) | NO collision after repositioning. This page DEFERS all paragraph-level statute, the exemption catalogue, and the case-law appeal framework to it. FORWARD-LINK from the appeals decision-flow + the exemptions FAQ. |
| Sibling (2026-05-21) | mtd-quarterly-deadlines-2026-2027-landlords | DEADLINES calendar + who-is-in-scope | NO collision — this page references the deadline dates briefly + forward-links for the full calendar. NOTE: that page carries a SOFT hedge ("HMRC indicated a softer-touch first year ... £200 likely deferred") weaker than the gov.uk verbatim no-penalties statement — flag for possible back-patch (see House-position conflict flag). |
| Sibling | mtd-itsa-letter-from-hmrc-what-to-do-next | "received a letter/notice, what next" | Adjacent but distinct (scope letter vs penalty notice). Cross-link from the decision-flow; no collision. |
| Sibling | mtd-itsa-overview-six-changes-residential-landlords | MTD overview pillar | Up-link target (this page is downstream of the overview). |

**Conclusion:** REWRITE in place with sharp intent differentiation. No REDIRECT-PROPOSED (rewrite-only rule + this is the weaker page, so any collapse would be wrong-direction anyway). The two statute-grade siblings own the numeric and depth layers; this page owns the beginner / consequence / scenario layer and routes depth downstream.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page):

- **Numeric worked examples (DEFER numbers here):** `mtd-itsa-late-submission-points-late-payment-15-30-31-worked` — forward-link from the late-payment section + cumulative-cost FAQ. Request reciprocal inbound link on rewrite.
- **Statute / exemptions / appeals depth (DEFER depth here):** `mtd-penalties-exemptions-and-what-to-watch` (cluster canonical) — forward-link from the appeals decision-flow + exemptions FAQ. Request reciprocal inbound link on rewrite (closes the 0-inbound-link gap).
- **Deadlines calendar:** `mtd-quarterly-deadlines-2026-2027-landlords` — forward-link from the timeline table for the full quarterly calendar.
- **Scope / am-I-in:** `mtd-rental-income-threshold-exemptions`, `mtd-itsa-qualifying-income-test-gross-vs-net` — forward-link from the "are you even in scope" opener.
- **Letter from HMRC:** `mtd-itsa-letter-from-hmrc-what-to-do-next` — cross-link from the decision-flow.
- **Overview pillar (up-link):** `mtd-itsa-overview-six-changes-residential-landlords`.
- **Existing on-page links to RE-VERIFY/REPOINT at write time:** current body links `/what-does-a-property-accountant-do`, `/buy-to-let-limited-company-complete-guide-uk`, `/making-tax-digital-landlords-april-2026-deadline`, `/section-24-tax-relief-complete-guide` — confirm each resolves to a live canonical category path (the bare-root forms may be stale); the slug_resolver discipline applies (a slug has exactly one real category — never guess).

---

## House-position references (Stage 1)

- **§3 MTD ITSA applicability** [LOCKED 2026-05-22]: £50k (Apr 2026) / £30k (Apr 2027) / £20k (Apr 2028) threshold schedule; Ltd Cos + GP partnerships excluded. Page opener references scope correctly today — preserve.
- **§19.1 Mandate timeline** [LOCKED 2026-05-22]: threshold tiers + tested-against return years. Use for the "are you in scope" opener.
- **§19.6 Quarterly cycle** [LOCKED 2026-05-22]: standard quarter deadlines 7 Aug / 7 Nov / 7 Feb / 7 May; final declaration 31 January following year-end. Use for the timeline table (then forward-link the deadlines page for the full calendar).
- **§19.7 Penalty regime** [LOCKED 2026-05-22; VERIFY enacting instrument at write time]: late submission points (1 point/miss; 4-point threshold; £200 at/after threshold; reset); late payment MTD ITSA accelerated 3%/3%/10% at 15/30/31 from 6 April 2026. **RECONCILIATION REQUIRED:** §19.7 locks a flat 3%/3%/10%, but gov.uk presents a per-year phase-in (first-year softening on late payment in 2026/27; 4%/4% from 2027/28; 10% pa from day 31 throughout). The writer MUST surface gov.uk's per-year framing AND reconcile it against §19.7 at write time, and re-verify the enacting instrument (see House-position conflict flag, F-37 discipline).
- **§19.18 SI 2021/1076 → SI 2026/336 migration** [LOCKED 2026-05-27]: cite SI 2026/336 (Income Tax (Digital Obligations) Regulations 2026, in force 1 April 2026) as the live operative instrument; SI 2021/1076 only in historical/migration context. (Light touch here — the reg-by-reg depth lives on the catalogue.)
- **§19.19 Points-based late submission regime** [LOCKED 2026-05-27]: regime sits at **FA 2021 Schedule 24** (NOT FA 2007 Sch 24 — naming-collision). Dual-condition reset: (a) 12-month compliance AND (b) all preceding-24-month submissions made. State both limbs if the reset is mentioned.
- **§13 Do-not-write list** [LOCKED]: NO pricing/fees; NO real client names; anonymised personas only.

---

## House-position conflict flag (Stage 2)

**CONFIRMED conflict 1 — STALE_FACTS wrong-advice (the load-bearing rewrite job).** Source body (line 26-28) + scenarios "Sarah misses her first three quarterly updates in 2026/27 ... three penalty points accumulated" assert penalty points apply to 2026/27 quarterly misses. gov.uk verbatim (WebFetched 2026-05-30): *"There are no penalties for missing a quarterly update deadline for the 2026 to 2027 tax year"*; points attach to quarterly updates *"for tax years after 2026 to 2027"*. The page is misleading on a compliance topic. The rewrite must lead with the soft landing and rework all three scenarios.

**CONFIRMED conflict 2 — wrong-regime mixing.** Source "Annual Return Penalties Under MTD" section + FAQ #4 apply the legacy SA daily-penalty stack (£100 automatic + £10/day capped £900 + 5% milestones) to the MTD final declaration. Under MTD ITSA, late FILING (including the final declaration / tax return) is the SAME FA 2021 Sch 24 points-based regime, not the old daily stack (see §19.19 + the catalogue's "MTD vs general SA" FAQ which correctly attributes the legacy daily stack to FA 2009 Sch 55/56 for NON-MTD only). Delete the legacy stack; replace with the points framing.

**House-position GAP flag (to manager, Track 2 cannot edit house_positions.md) — F-MTD-SOFTLANDING.** §19.7 does NOT currently lock the 2026/27 soft landing for quarterly updates, NOR the per-year late-payment phase-in that gov.uk publishes (first-year late-payment softening in 2026/27; 4%/4% from 2027/28). §19.7 locks a flat 3%/3%/10% from 6 April 2026 with no year-step. gov.uk (WebFetched 2026-05-30) shows: 2026-27 late payment "3% of tax owed at day 15 (or no penalty if first year)" + "3% at day 30 + 10% pa from day 31"; **2027-28 late payment "4% at day 15 + 4% at day 30 + 10% pa from day 31."** Recommend the future-wave manager lock: (a) the 2026/27 quarterly-update soft landing (no quarterly penalties; points start 2027/28); (b) the late-payment per-year step (3%/3% in 2026/27 with first-year softening; 4%/4% from 2027/28). Flag to `track2_site_wide_flags.md` and recommend HP §19.7 amendment.

**F-37 Bill-vs-enacted discipline — enacting instrument verification (MANDATORY at write time).** The 3%/3%/10% (and 4%/4% step) acceleration is enacted by amendment to FA 2021 Sch 26, not merely "announced at Spring Statement 2025." legislation.gov.uk (WebFetched 2026-05-30) shows Sch 26 percentages were modified by **"The Finance Act 2021 (Increase in Schedule 26 Penalty Percentages) Regulations 2025"** (with a further unrelated FA 2026 amendment for CBAM/vaping). The writer MUST re-verify the exact title + SI number + in-force date of that 2025 Regulations instrument at write time and cite the enacted instrument, not the Spring Statement announcement. (FA 2021 Sch 24 + Sch 26 + TMA 1970 s.31A all verified live + in force 2026-05-30.)

**Cluster drift note (possible back-patch, manager-direct or §16.43 sweep).** `mtd-quarterly-deadlines-2026-2027-landlords` (line ~129) carries a SOFT hedge: "HMRC indicated a softer-touch first year for 2026/27, with the £200 financial penalty likely deferred where failures are not deliberate." This is weaker/less-precise than the gov.uk verbatim no-penalties-for-quarterly-misses statement. Flag for a back-patch decision (factual back-patches stay manager-direct per memory `feedback_factual_backpatch_manager_direct`).

---

## Authority links worth considering (Stage 2 — verified 2026-05-30 unless noted)

| URL | Verification | Use case |
|---|---|---|
| https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax | 200 OK + content verified (soft-landing verbatim; 4-point/£200; 15/30/31 with per-year %) | PRIMARY authority + soft-landing source; link as the gov.uk cross-reference |
| https://www.legislation.gov.uk/ukpga/2021/26/schedule/24 | 200 OK; "Penalties for failure to make returns etc"; 4-point quarterly threshold + £200; in force (phased to 1 Apr 2026) | Late-submission points statute (light cite; depth on catalogue) |
| https://www.legislation.gov.uk/ukpga/2021/26/schedule/26 | 200 OK; "Penalties for failure to pay tax"; 15/30-day triggers + 3% + 10% pa; amended by the 2025 Percentages Regulations | Late-payment statute (light cite; numbers on worked sibling) |
| The Finance Act 2021 (Increase in Schedule 26 Penalty Percentages) Regulations 2025 | **VERIFY exact SI number + in-force date at write time** (F-37) | Enacting instrument for the 3%/3%/10% (and 4%/4% step) acceleration |
| https://www.legislation.gov.uk/uksi/2026/336/contents | Verify at write time (live operative MTD instrument per §19.18) | SI 2026/336 (digital obligations); historical SI 2021/1076 only in migration context |
| https://www.legislation.gov.uk/ukpga/1970/9/section/31A | 200 OK; 30-day appeal-notice window; in force | Appeal window (light cite; Perrin/Martland depth on catalogue) |

**(Execution selects 4-6 to actually cite in body; gov.uk soft-landing link is mandatory. Keep statute threading LIGHT — paragraph-level depth belongs on the catalogue.)**

---

## Content plan (section-by-section to ~2,600 words)

Target: ~2,600 body words, 12 H2/H3 sections, one timeline reference table, one decision-flow, 12-14 FAQs, 2 inline `<aside>` CTAs, 4-6 authority links, 2 sibling forward-links.

1. **Opener (~180 words).** Plain-English hook: "you are a landlord and you have just realised you might miss (or have missed) an MTD deadline; here is exactly what happens." Immediately reassure with the 2026/27 soft landing (gov.uk verbatim) and set up the structure: what is and isn't covered, three scenarios, what to do about a notice. Light scope line (over £50k from 6 Apr 2026 per §19.1) with forward-link to the threshold pages.

2. **H2 "The good news first: the 2026/27 soft landing" (~280 words).** LEAD with gov.uk verbatim: "There are no penalties for missing a quarterly update deadline for the 2026 to 2027 tax year." State precisely what the soft landing does and does NOT cover:
   - Covers: missed quarterly UPDATE deadlines in 2026/27 (no points, no £200).
   - Does NOT cover: the final declaration / tax return (still a points obligation); late PAYMENT of tax (there is only a first-year softening, not a full holiday — see late-payment section).
   - From 2027/28 onwards, points DO attach to missed quarterly updates.
   Inline `<aside>` CTA #1 (book a discovery call to get set up before the soft landing ends). Forward-link gov.uk authority.

3. **H2 "Timeline: penalties year by year" + REFERENCE TABLE (~220 words).** A scannable plain-HTML reference table (no pricing — these are statutory penalties, not fees). Columns + rows specified below.

4. **H2 "How the points system works (in plain English)" (~260 words).** 1 point per missed quarterly update (from 2027/28); 4-point threshold; £200 at threshold and for each subsequent miss while at threshold; points drop off (below threshold: 24 months after the missed deadline; at/above threshold: dual-condition reset per §19.19 — 12 months clean AND all preceding-24-month submissions made). Keep it conceptual; forward-link the worked sibling for the maths. Name FA 2021 Sch 24 once (light).

5. **H2 "What about the annual tax return (final declaration)?" (~200 words).** CORRECT the wrong-regime defect: the final declaration is part of the SAME points system, NOT the old £100 + £10/day + 5% self-assessment daily stack. Distinguish clearly: legacy daily stack (FA 2009 Sch 55/56) applies to NON-MTD self-assessment only; once you are in MTD ITSA, late filing is points-based. Forward-link the catalogue for the full regime comparison.

6. **H2 "Late PAYMENT is different from late filing" (~240 words).** The soft landing is about late FILING of quarterly updates; PAYING late is a separate regime with only a first-year softening. Give the shape (per gov.uk per-year framing reconciled with §19.7): 2026/27 — 3% at day 15 (softened in the first year), 3% at day 30, 10% pa from day 31; 2027/28 onward — 4% at day 15, 4% at day 30, 10% pa from day 31. ONE illustrative line only (e.g., "on a £5,000 unpaid bill the day-15 charge is a few hundred pounds"); DEFER the full £2k/£10k/£30k maths to the worked sibling (forward-link). Name FA 2021 Sch 26 + the 2025 Percentages Regulations once (verified). Note interest accrues separately.

7. **H2 "Three landlord scenarios (corrected for the soft landing)" (~420 words).** Rework the three personas so NONE asserts 2026/27 quarterly points. Anonymised illustrative personas only (no real names — these are fine per §13 as illustrative):
   - **Single BTL owner, one property, ~£18k rent:** misses two 2026/27 quarterly updates. Outcome: no points, no penalty (soft landing). The real lesson: get into the habit now, because from 2027/28 the same misses would each cost a point.
   - **Portfolio landlord, five properties, ~£85k rent:** habitually 2-3 weeks late across 2026/27 AND 2027/28. Outcome: 2026/27 misses generate nothing; 2027/28 misses accrue points and, once at the 4-point threshold, £200 per subsequent miss. Forward-link the worked sibling for the cumulative number.
   - **Late-payer, owes balancing tax:** files on time but pays the year-end bill late. Outcome: the soft landing does NOT help — late-payment charges bite (3% at day 15 in 2026/27, with the first-year softening), plus interest. Forward-link the worked sibling.
   Inline `<aside>` CTA #2 (discovery call) after the scenarios.

8. **H2 "What to do if you get a penalty notice" + DECISION-FLOW (~300 words).** Plain-English ordered decision-flow (not a table — a numbered flow): (1) Check the notice is correct (is it a 2026/27 quarterly-update penalty? if so it may be wrong given the soft landing — query it). (2) Note the 30-day window (TMA 1970 s.31A, light cite). (3) Consider a reasonable-excuse appeal — HMRC accepts serious illness, bereavement, proven software failure; rejects "too busy" / "didn't understand." (4) Consider statutory review before tribunal. (5) Get specialist help where exposure is material. DEFER the Perrin/Martland framework + paragraph-level appeal mechanics to the catalogue (forward-link). Keep the rejected-excuse list (it is good plain-English content) but reframe to 2026/27 reality.

9. **H2 "Reasonable excuse: what HMRC actually accepts" (~200 words).** Salvage and tighten the source's accepted/rejected excuse lists (illness, bereavement, proven tech failure, postal delay with evidence vs too-busy, didn't-understand, accountant-unavailable, vague computer problems). Add the practical evidence tip (screenshots, provider correspondence). Forward-link the catalogue for the statutory test.

10. **H2 "How to avoid penalties altogether" (~180 words).** Calendar reminders, MTD-compatible software, monthly record-keeping, file a week early, use an accountant. Light forward-links to software + record-keeping siblings.

11. **H2 "Where this fits with the rest of the cluster" (~120 words).** Explicit signposting paragraph: numbers → worked sibling; full statute + exemptions + appeals → catalogue; deadline calendar → deadlines page; am-I-in-scope → threshold pages. (Doubles as the internal-link hub that earns this page its place in the cluster.)

12. **FAQ block (12-14 FAQs).** Each targets a plain-English query verbatim (see Query-coverage plan). Plain-English answers; defer numeric/statute depth via forward-links.

### REFERENCE TABLE (mandatory — this is a deadlines/penalties scannable page)

Plain HTML `<table>`, no Tailwind, no pricing (statutory penalties only):

**"MTD ITSA penalties: what applies, by year"**

| Year | Missed quarterly update | Late final declaration / tax return | Late payment of tax |
|---|---|---|---|
| 2026/27 (first year) | No penalty (soft landing) | Points-based (FA 2021 Sch 24) | 3% at day 15 (first-year softening), 3% at day 30, 10% pa from day 31 |
| 2027/28 onward | 1 point per miss; £200 at the 4-point threshold and each later miss | Points-based (FA 2021 Sch 24) | 4% at day 15, 4% at day 30, 10% pa from day 31 |

(Writer reconciles the day-15 "first-year softening" wording against §19.7 + the verified enacting instrument at write time per F-37; if the precise first-year mechanic cannot be verified, state the conservative version and forward-link gov.uk.)

---

## Query-coverage plan

One row per `target_queries[]` item; each assigned exactly once to where it will be served.

| Query | source | impr | pos | served-in |
|---|---|---|---|---|
| MTD penalties for landlords (what happens if you miss a quarterly / MTD deadline) — PRIMARY | (page-level intent) | 0 | 0 | H1 + metaTitle + opener |
| mtd penalties landlords miss deadline (target intent, page-level GSC) | gsc | 0 | 0 | metaDescription + opener |
| mtd deadline 2026 | gsc | 2 | 78 | Timeline reference table (H2 §3) |
| mtd deadlines 2026 | gsc | 1 | 17 | H2 §3 timeline body |
| mtd itsa penalty holiday | gsc | 1 | 22 | H2 §2 "the 2026/27 soft landing" (H2 heading + body) |
| mtd quarterly deadlines | gsc | 1 | 25 | FAQ "When are the MTD quarterly deadlines?" (+ forward-link deadlines page) |
| mtd itsa late submission points (sibling proven-demand) | gsc | 1 | 22 | H2 §4 "How the points system works" |
| what happens if you miss an mtd quarterly deadline (competitor-confirmed) | adjacent | 0 | 0 | H1 + FAQ "What happens if I miss a quarterly update?" |
| mtd late submission penalty points threshold (competitor-confirmed) | adjacent | 0 | 0 | FAQ "How many points before I get a £200 penalty?" |
| mtd soft landing 2026 27 penalties (competitor-confirmed) | adjacent | 0 | 0 | H2 §2 body + FAQ "Is there really no penalty in the first year?" |
| mtd late payment penalty 15 30 days (competitor-confirmed) | adjacent | 0 | 0 | H2 §6 "Late payment is different" + FAQ "What if I pay my tax late?" |
| reasonable excuse mtd penalty appeal (competitor-confirmed) | adjacent | 0 | 0 | H2 §9 "Reasonable excuse" + FAQ "Can I appeal an MTD penalty?" |

Additional FAQ slots (to reach 12-14) for plain-English coverage without new target queries: "Do MTD penalties replace my self-assessment penalties?" (corrected — points-based, not legacy stack); "Does the final declaration get the soft landing too?" (no); "I'm too busy — is that a reasonable excuse?" (no); "What should I do first if I get a penalty notice?" (decision-flow summary).

---

## Meta plan

- **metaTitle (<=62):** `MTD Penalties for Landlords: What If You Miss a Deadline?` (56 chars)
- **metaDescription (<=158):** `What actually happens if a landlord misses an MTD deadline. The 2026/27 soft landing, points, late-payment charges, and how to appeal a penalty notice.` (151 chars)
- **h1:** `MTD Penalties for Landlords: What Happens If You Miss a Deadline?` (kept — it already matches the consequence intent precisely)
- **summary:** `Making Tax Digital for Income Tax is mandatory for landlords with property income over £50,000 from 6 April 2026, but there are no penalties for missing a quarterly update deadline in the 2026/27 tax year. Points start for quarterly updates from 2027/28: one point per miss, a £200 penalty once you reach four points. Late payment of tax is a separate regime with only a first-year softening, and you have 30 days to appeal a penalty notice with a reasonable excuse.`

(No em-dashes anywhere; no pricing; anonymised personas only.)

---

## Schema plan

- **reviewer name:** ICAEW Qualified Senior Reviewer (the established cluster reviewer used on the de-facto canonical `mtd-penalties-exemptions-and-what-to-watch`, 2026-05-28 — use for cluster consistency).
- **reviewerCredentials:** `Chartered Accountant (ACA, ICAEW), MTD and Compliance Specialist`
- **reviewedAt:** 2026-05-30
- **howTo:** false (this is a consequence-and-scenario explainer with a decision-flow, not a step-by-step procedural HowTo; the decision-flow is narrative, not schema-grade ordered task steps).
- **dateModified:** 2026-05-30
- **JSON-LD blocks emitted:** Article (BlogPosting) + FAQPage (auto-emitted from frontmatter `faqs:` by `buildBlogPostingJsonLd`; never hand-add FAQ schema in body). No HowTo block.

---

## Universal rules — inherited from parent program (do not restate)

See `TRACK2_PROGRAM.md §4 section 13` pointer block: voice rules (NO em-dashes; anonymised social proof only; NO pricing; exact figures + named statute), lead-gen architecture (LeadForm auto-injected; 1-3 inline `<aside>` CTAs only), CSS-in-markdown (semantic HTML; no Tailwind in body), FAQs/schema (frontmatter `faqs:` 12-14; auto-emitted FAQPage), anti-templating, quality bar (six-check), statute citation discipline (content can be removed by amendment even where URL is live), §16 lessons (esp. §16.31 URL liveness, §16.22/§16.27/§16.35 Bill-vs-enacted, slug_resolver one-real-category).

**Critical for THIS brief:** the soft-landing fix is the load-bearing job — get the 2026/27 no-quarterly-penalty fact RIGHT and LEAD with it. NO em-dashes. NO pricing (the £200 / 3% / 10% figures are statutory penalties, not firm fees — keep them). Anonymised personas only. Forward-link the two siblings; do NOT reproduce their numeric or paragraph-level depth.

---

## 19-step workflow — inherited (Wave 5) with Track 2 deltas

See `TRACK2_PROGRAM.md §4 section 14`. Track 2 deltas + this-brief specifics:

1. Read `house_positions.md` §3, §19.1, §19.6, §19.7, §19.18, §19.19, §13 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting → execution).
3. Read this brief end-to-end.
4. **Verify the enacting instrument** for the 3%/3%/10% (+4%/4% step) acceleration (FA 2021 Sch 26 amending Regulations 2025 — exact SI number + in-force date) AND the gov.uk soft-landing verbatim against gov.uk + legislation.gov.uk. Load-bearing pre-rewrite step (F-37).
5. Re-fetch the 4 competitor/authority URLs (confirm 200; gov.uk soft-landing link mandatory).
6. Read the current source file + the two key siblings (`...15-30-31-worked`, `...exemptions-and-what-to-watch`) + the deadlines page (for forward-link targets + back-patch flag).
7. Plan outline: 12 sections, ~2,600 words, 12-14 FAQs, 1 timeline table, 1 decision-flow, 2 inline CTAs.
8. **Rewrite markdown at existing path** (NOT new file). Preserve slug + canonical; update `dateModified` to 2026-05-30; add `reviewedBy` + `reviewerCredentials` + `reviewedAt`. Fix the wrong advice FIRST.
9. Run build: `cd Property/web && npm run build`. Must pass.
10. Six checks: FAQ schema count = frontmatter length; em-dash count = 0; Tailwind class count = 0; metaTitle <=62; metaDescription <=158; all internal links resolve (slug_resolver-clean).
11. Confirm no redirect (slug kept; rewrite-only).
12. Update/insert `monitored_pages` row (INVISIBLE baseline → 180-day window per F-11 recommendation).
13. Commit on `main` per deploy discipline (no auto-commit unless `OPTIMISATION_AUTO_COMMIT=1`).
14. Update tracker → ✅ executed; raise F-MTD-SOFTLANDING (HP gap) + the deadlines-page back-patch flag in `track2_site_wide_flags.md`.
15. Heartbeat + discovery log.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §19.7 late-payment reconciliation (per-year vs flat 3%/3%/10%): __
- §19.7 enacting instrument verified (SI number + in-force date): __
- §19.19 FA 2021 Sch 24 (not FA 2007 Sch 24) + dual-condition reset: __
- §19.18 SI 2026/336 live / SI 2021/1076 historical only: __
- §13 no pricing / anonymised personas: __

### Comparison: before vs after
- Word count: 1,238 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Statute citations: 0 → __
- Inline CTAs: 0 → __
- Soft-landing led (Y/N): __
- Legacy SA daily-stack removed (Y/N): __
- Reviewer byline + dateModified added (Y/N): __
- Sibling forward-links added (numbers + depth): __

### Flags raised
- F-MTD-SOFTLANDING (HP §19.7 gap — soft landing + per-year late-payment step): __
- Deadlines-page hedge back-patch decision: __
- F-37 enacting-instrument verification recorded: __
- Any new flags: __

### 2-3 sentence summary
- (populated at execution time)
