# Track 2 brief: cgt-inherited-rental-property-calculation-uk

**Site:** property
**Brief type:** Legacy rewrite (Track 2A, Batch 1 Sub-bucket C, page B1-C2)
**Source markdown path:** `Property/web/content/blog/cgt-inherited-rental-property-calculation-uk.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-inherited-rental-property-calculation-uk
**Stage 1 priority:** **H** (page has a substantive factual error on 60-day reporting threshold + missing PR-level CGT during administration + zero statute citations; Wave 2 A7 sibling shipped 2026-05-22 already cross-links INTO this page, so the cluster pairing is already half-built)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE (clean against Wave 2 A7 sibling — A7 is the executor / PR-side walkthrough, this page is the **beneficiary-side CGT computation** depth page; the two are intentional siblings with reciprocal forward-links)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-inherited-rental-property-calculation-uk`. The slug carries the dominant query intent (CGT + inherited + rental + calculation) and the post-Wave-2 cluster positioning already routes the executor / PR-side intent to Wave 2 A7. No redirect.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary — page lacks PR-level CGT depth, lacks beneficiary-side rate-band stacking depth, lacks the multi-beneficiary worked example) + `STRUCTURE` (secondary — 4 FAQs, 0 statute cites, 0 outbound HMRC links) + **factual error on the 60-day rule** (the "if gain exceeds £6,000" framing is incorrect — the rule is "where CGT is due" for UK residents and "every disposal" for non-residents).
- **"Why this rewrite" angle:** the source page is currently a 1,500-word consumer-grade overview that gets the **stepped-up-base-cost** mechanic correct but misses the practitioner depth that distinguishes us from every retail competitor (WithFarra, Pocketwise, GoFile). Wave 2 A7 (the executor walkthrough) already shipped and explicitly forward-links into this page as "the CGT calculation focus" — meaning the cluster positioning REQUIRES this page to deliver the depth that A7's editorial note promises. Three load-bearing rewrites: (a) **TCGA 1992 s.62 statutory anchor** (the page currently calls it the "stepped-up basis rule" — an American term; the UK statute is s.62 and the mechanic is the death-uplift); (b) **the appropriation / PR-sale-vs-assent decision tree** (the executor's most consequential CGT decision; rate differential between 24% PR rate and basic-rate beneficiary 18% is the entire planning lever); (c) **fix the 60-day "gain exceeds £6,000" error**. Differentiator vs Wave 2 A7: A7 is process-led (the 7 executor steps); this page is calculation-led (5 worked examples covering inherited-then-sold-by-PR, inherited-then-assented-then-sold-by-beneficiary, inherited-then-kept-as-let, multi-beneficiary inherited, and inherited-by-non-resident-beneficiary).

---

## Current page snapshot (Stage 2 — source markdown + frontmatter read)

**Filesystem source read (2026-05-23):**
- Frontmatter `date`: 2026-04-10
- `dateModified`: not present (missing)
- `reviewedBy` / `reviewerCredentials` / `reviewedAt`: NONE (missing — vs Wave 2 A7 which has full reviewer-byline frontmatter)
- `metaTitle`: "CGT on Inherited Rental Property: UK Tax Calculation Guide" (58 chars; OK, but generic)
- `metaDescription`: "Learn how CGT is calculated on inherited rental properties in the UK. Covers probate value, base cost, reliefs, and tax rates for inherited buy to let." (152 chars; under 158 limit, OK)
- `faqs`: 4 entries (target 12-14)
- `h1`: "How Is CGT Calculated on an Inherited Rental Property?" (good — direct question form)
- Body word count: ~1,500 (target 2,800-3,200)
- H2 sections: 7 (stepped-up basis + CGT calc; multiple/jointly inherited; allowable costs; rental income vs CGT; record keeping; tax planning; related reading) plus 3 H3s
- Internal links: 3 (CGT property pillar, rental income tax, property accountant services) PLUS 1 already-shipped cross-link to Wave 2 A7 in the "Related reading" section at line 120-121
- **Wave 2 A7 cross-link IS already present at execution** — good baseline; rewrite must keep + strengthen
- Outbound authority links: 0 (no gov.uk / legislation.gov.uk / HMRC manual citation in body)
- Worked examples: 1 (Sarah inherits £320k probate value, sells £350k for £30k gain) — single basic-rate scenario, no PR-sale / no multi-beneficiary / no assent / no kept-as-let scenarios
- Statute cites in body: NONE. TCGA 1992 s.62 NOT named. "Stepped-up basis" used (American terminology — UK readers expecting "death uplift" or "base cost on death" will not find the term they know).
- **Substantive content errors (at least 2):**
  - **Error 1 (body line 102):** "60-day reporting: If the gain exceeds £6,000, you must report and pay CGT within 60 days of completion using the online service." — incorrect. The rule per §5 + verified gov.uk 2026-05-23: UK residents must file the 60-day return **where CGT is due** (not "where gain exceeds £6,000"). The £6,000 figure appears to be an outdated reference to a previous AEA (£6,000 was AEA for 2023/24, dropped to £3,000 from 6 April 2024) — but AEA is the de-facto threshold below which no CGT is due; the rule itself is "CGT due" not "gain > £6,000". Non-residents must file for EVERY UK land disposal regardless of tax due.
  - **Error 2 (frontmatter FAQ 4 + body line 110-114):** "Several strategies can help: time the sale to use your annual exempt amount effectively" — generic, repeats what the gov.uk page already says. Missed the **operational** strategies: appropriation by PRs to beneficiary BEFORE sale (CG30810/CG30820), PR sale during admin period vs assent then beneficiary sale, AEA across 3 PR tax years (s.3(7)), capital-loss interaction with PR gains.
  - **Sub-error (FAQ 3 body):** "If adding the capital gain pushes you into the higher rate band, the excess is taxed at 24%" — correct in principle but **misses the s.4 (post-FA-2019 rewrite) rate-band-stacking complexity** for individual taxpayers (gains stack on top of income; PR rate is flat 24% with no basic-rate slice; cross-link to gold-reference T4 rates page where stacking is explained).

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 PM via `python -m optimisation_engine.track2.pull_page_data --slug cgt-inherited-rental-property-calculation-uk --days 90`.**

**Aggregate:** **ZERO GSC rows** in 90-day window. ZERO `competitor_serps`; ZERO `page_content_map`; ZERO `competitor_gap_reports`.

**Pattern read:** TAIL-SIGNAL case (same pattern as B1-C1). Page is indexed but daily impressions fall below GSC's per-day reporting floor across the 90-day aggregation. Distinct from the airbnb INVISIBLE case (which had GA4 evidence of a single session); we cannot infer engagement either way.

**Important context:** Wave 2 A7 shipped 2026-05-22 and forward-links into this page. Wave 2 A7 likely has some early GSC signal that this page will inherit / share over the post-rewrite 90-day window. Cluster effect should lift this page's first-90-day GSC presence post-rewrite even without query-pattern-driven optimisation.

**Strategic conclusion:** rewrite proceeds on (a) content-correctness reasoning (fix the 60-day error), (b) cluster-positioning reasoning (deliver the calculation depth Wave 2 A7's editorial note promises), (c) competitor coverage gap (rental-specific scenarios missing across all 4 verified competitors). Post-rewrite, monitor via `monitored_pages` + watch for tail-signal lift over 90 days.

### GA4 engagement signal (real data from `ga4_page_data`)

- ZERO rows. Page never received enough sessions in the window to register in GA4 aggregation.

**Implication for the brief:** no engagement signal to triangulate. Rewrite proceeds on content-correctness + cluster-positioning logic, leveraging the Wave 2 A7 cross-link to inherit traffic.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source-page review)

**Primary: DEPTH on the BENEFICIARY-side CGT computation.** Every accessible competitor (WithFarra ~3,500 words but no TCGA s.62 + no PR-CGT + no rental focus; Pro Tax Accountant ~4,500 words with strong s.62 anchor but no PR-CGT discussion + no 60-day-reporting coverage + no specific rental scenarios; GoFile + Pocketwise generic consumer overviews) gives the basic mechanic but skips the practitioner depth: PR rate vs beneficiary rate, AEA across 3 PR tax years (s.3(7)), appropriation mechanic to time-shift the gain into the beneficiary's hands BEFORE sale, capital-loss interaction. Wave 2 A7 (executor walkthrough) ships the PR-side process; this page must deliver the CGT-computation depth that A7 cross-links INTO. The cluster gap = beneficiary-side calculation depth for the rental-property-specifically context.

**Secondary: FACTUAL ERROR on 60-day reporting.** The £6,000 threshold framing is wrong. Replace with the per-§5 rule: UK residents file where CGT is due; non-residents file for every disposal. Cross-link Wave 5 sibling on Form 17 NOT relevant; cross-link Wave 2 A7 + the dedicated 60-day page (residual Batch 1 sub-bucket B candidate `cgt-reporting-deadlines-property-2026` or rewritten `cgt-payment-deadlines-property-sales-2026`).

**Tertiary: STRUCTURE + STATUTORY ANCHOR.** No TCGA s.62 cite. No HMRC CG30700-series cite. No IHTM35000-series cite for the deed-of-variation interaction. "Stepped-up basis" is American terminology; the UK term is "death uplift" or "base cost reset under TCGA 1992 s.62". This is a discoverability + authority gap (readers searching for "TCGA 62 death" or "death uplift base cost" will not find our page).

**Load-bearing fix sequence (ordered by reader-impact ROI):**

1. **Fix the 60-day-£6,000 factual error** — non-negotiable; the page currently gives wrong tax-compliance advice. Replace with verified §5 rule.
2. **Anchor on TCGA 1992 s.62** — replace "stepped-up basis" with "death uplift under TCGA 1992 s.62" throughout. The American term may even hurt SEO for UK readers searching the UK term.
3. **Add the PR-sale-vs-assent decision tree** (~500 words) as a new H2 covering: PR rate 24%, beneficiary rate 18% (basic) / 24% (higher), PR AEA £3,000 for year of death + 2 following tax years under s.3(7), beneficiary AEA + own losses + own band stacking. This is the load-bearing planning section that Wave 2 A7 alludes to without computing.
4. **Add 4 new worked examples** (the source has 1): (i) PR sale during admin (PR rate, 3 PR tax years AEA, no PRR); (ii) assent then basic-rate beneficiary sale (18% rate, beneficiary AEA, capital-loss offset); (iii) multi-beneficiary inheritance with cash settlement vs property settlement; (iv) inherit-and-keep-as-let, 5 years later sell (death uplift + 5 years of further appreciation; if the beneficiary moves in for some period, partial PRR per s.223); (v) non-resident beneficiary disposal (60-day rule for non-residents on every disposal + NRL forward-link).
5. **Body lift to 2,800-3,200 words** with the new section + worked examples + 10-12 more FAQs.
6. **Authority links: 5-7 verified citations** (s.62 legislation.gov.uk; gov.uk/capital-gains-tax/inherited-property; HMRC CG30700-series for PR mechanics; HMRC CG30810/30820 for appropriation; IHTM35001-series for deed of variation cross-link; gov.uk on 60-day reporting).
7. **Frontmatter hygiene:** add `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`. Strengthen the metaTitle (current "CGT on Inherited Rental Property: UK Tax Calculation Guide" is generic; test "Inherited Rental Property CGT: Death Uplift + 5 Calculation Examples" or "CGT on Inherited Rental Property UK: s.62 Uplift + Worked Examples").
8. **Strengthen the existing Wave 2 A7 cross-link** — current single link in "Related reading" should be promoted to inline forward-links at 2-3 contextual points + a "process companion" reference at the top.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Rental-property focus | What to borrow / differentiate |
|---|---|---|---|---|---|---|
| https://withfarra.co.uk/guides/capital-gains-tax-inherited-property-uk | 200 OK; verified 2026-05-23 | ~3,500 | 4 | NONE (no s.62 cite; no PR-CGT discussion) | Light (covers "rented for part of ownership" briefly; not dedicated rental-property treatment) | **Borrow:** 9 H2 structure; clear "uplift" explanation with £220k-gain-wiped-out illustration. **Differentiate:** add s.62 statute anchor + PR-CGT depth + dedicated rental scenarios. |
| https://www.protaxaccountant.co.uk/post/probate-value-and-cgt-cost | 200 OK; verified 2026-05-23 | ~4,500 | 7 | **TCGA 1992 s.62 + s.38** explicitly | NONE (no rental coverage; no PR-CGT discussion; no 60-day-reporting coverage) | **Borrow:** s.62 statute anchor framing + Section 38 enhancement-expenditure depth + worked example with numerical calculations. **Differentiate:** add rental-specific scenarios + PR-CGT discussion + 60-day reporting; tribunal-perspective the source provides is overkill for our reader. |
| https://pocketwise.co.uk/tax/capital-gains/capital-gains-tax-on-inherited-property/ | 200 OK (not deep-fetched; surface signal from SERP) | ~2,000 (est) | Unknown | Unknown | Light | **Borrow:** 2026/27 framing date discipline. **Differentiate:** add s.62 anchor + PR-CGT + dedicated rental scenarios. |
| https://gofile.co.uk/knowledgebase/capital-gains-tax/cgt-inherited-property/ | 200 OK (not deep-fetched; surface signal from SERP) | ~2,000 (est) | Unknown | Unknown | Light | **Borrow:** knowledgebase factoid structure. **Differentiate:** add depth on every dimension. |

**Competitor depth ceiling:** ~3,500-4,500 words, ≤7 FAQs, statute cites either absent (WithFarra) or strong (Pro Tax) but never including PR-level CGT or rental-specific worked examples. Our 2,800-3,200 word target with 12-14 FAQs + 5-7 statute citations + 5 worked examples (4 of which are rental-scenario-specific) + cluster pairing with Wave 2 A7 puts us **decisively best-in-class on the rental angle specifically**.

**What to differentiate against:** every competitor either skips the PR-level CGT or covers it generically. None pairs CGT computation with an explicit executor-process companion page (we have Wave 2 A7 for that). The cluster pair is the durable differentiator.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (PM refresh, post-Wave-5 merge).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (self) | cgt-inherited-rental-property-calculation-uk | REWRITE | self |
| Excluded (**Wave 2 A7 SHIPPED 2026-05-22**) | inheriting-uk-rental-property-executors-step-by-step | **Mandatory cross-link target per launch prompt + already linked back from A7's "Related reading"** | **NOT a collision — intentional sibling pair.** A7 is the 7-step executor walkthrough (process); this page is the calculation-depth companion. A7's editorialNote explicitly calls this page "the CGT on inherited rental property calculation guide"; A7's body contains 2 inline forward-links to this page at lines 56 + 188. This rewrite must add reciprocal inline forward-links to A7 at 2-3 contextual points (the introduction, the PR-sale-vs-assent section, and the multi-beneficiary worked example) and a "process companion" pointer at the top of the body. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar | No collision; forward-link from intro to pillar. |
| Excluded (Wave 5 C-bucket SHIPPED 2026-05-23) | iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt | Wave 5 C8 IHT joint ownership | No collision (IHT angle on inherited property not the CGT-computation focus); forward-link from §"IHT context on inherited rental" sidebar. |
| Excluded (Wave 2 SHIPPED) | Other Wave 2 IHT pages (BPR, APR, NRB) | — | No collision; forward-link from §"Death uplift + the IHT side" sidebar. |
| Excluded (Wave 4 SHIPPED) | iht-property-investors-decision-framework-2026-onwards (per A7 cross-link list) | Wave 4 decision pillar | No collision; forward-link from "wider planning context" footer. |
| Residual (intra-Batch-1) | B1-C1 cgt-divorce-property-transfer-tax-implications | Sub-bucket C sibling | No collision (different life event); forward-link only in §"Related life events". |
| Residual (intra-Batch-1) | B1-C3 cgt-property-transfer-spouse | Sub-bucket C sibling | No collision; forward-link only in §"Related life events". |
| Residual (intra-Batch-1) | B1-B1 / B1-B2 / B1-B3 (60-day reporting cluster) | Sub-bucket B 60-day cluster | **Functional dependency** — this rewrite must cite the 60-day rule correctly; sub-bucket B sub-agent will rewrite the 60-day pages in parallel. **Coordination:** for cite purposes, use the verified gov.uk URL `https://www.gov.uk/capital-gains-tax-property-uk` (or equivalent), NOT a forward-link to the sub-bucket B pages (which may still be unfinished at execution time). Once B-bucket pages ship, an inter-batch forward-link sweep can add them. |
| Residual (other) | capital-gains-tax-selling-rental-property-uk | Generic CGT-on-sale residual | Adjacent (semantic overlap on "rental property + CGT") but slug is generic; this page (inherited-specific) is the canonical for the inheritance case. Phase 2 cluster audit will resolve the wider rental-CGT cluster. |
| Wave 6 (in-flight) | Bucket B trusts (settlor-interested, GROB, bare-trust) | — | Forward-link target for the "what if the rental was held in trust" sidebar — once Wave 6 Bucket B pages ship. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. The Wave 2 A7 cluster pair is the highest-value structural asset for this page and the rewrite must strengthen it.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page after rewrite):

- **Wave 2 A7** `inheriting-uk-rental-property-executors-step-by-step` — **the process companion**; inline forward-links at 2-3 contextual points + a "process companion" reference at the top of the body. A7 already cross-links back at lines 56 + 188 of its body. Reciprocal pattern locked.
- **B1-C1 sibling** `cgt-divorce-property-transfer-tax-implications` — one-way mention in "related life events" footer
- **B1-C3 sibling** `cgt-property-transfer-spouse` — one-way mention in "related life events" footer
- **CGT pillar (rewritten 2026-05-21)** `capital-gains-tax-property-complete-guide-uk` — back-link from intro
- **CGT rates (Track 2 trial gold reference)** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from rates table at top + from the "your CGT rate depends on your other income" FAQ
- **AEA depth (rewritten 2026-05-21)** `cgt-annual-exempt-amount-3000-allowance-2026-27` — forward-link from §"Annual exempt amount: yours + the PRs'"
- **60-day deadlines (rewritten 2026-05-21)** `cgt-payment-deadlines-property-sales-2026` — forward-link for the 60-day mechanic depth (replacing the wrong "£6,000" framing)
- **NRCGT residual page** `60-day-cgt-reporting-property-sales-complete-guide` (Batch 1 sub-bucket B, in-flight) — forward-link if non-resident beneficiary scenario applies; add at execution if B-bucket ships first
- **PRR landlords (residual)** `principal-private-residence-relief-landlords` — forward-link from §"What if you move in" sidebar
- **Wave 5 C8 IHT** `iht-joint-ownership-property-spouse-exemption-transferable-allowances-jointly-tic-vs-jt` — forward-link from §"IHT side: what the death uplift sits on top of"
- **Wave 4 IHT decision pillar** `iht-property-investors-decision-framework-2026-onwards` — forward-link from §"Wider planning context" footer
- **Rental income tax (existing)** `rental-income-tax-uk-complete-guide-landlords` — forward-link from §"Inheriting and keeping as a let" worked example (the rental income on the inherited property is the beneficiary's from the assent date)

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified gov.uk 2026-05-23]: 18% basic, 24% higher, £3,000 AEA, trustee/PR rate 24% throughout. Primary anchor.
- **§5 60-day reporting rule** [LOCKED — verified 2026-05-23]: UK residents file where CGT is due; non-residents file for every UK land disposal regardless of tax due; £100 fixed + £10/day from day 91 + 5% at 6 + 12 months. **The source page error fix anchors here.**
- **§7 April 2027 property income tax surcharge** [LOCKED — applies to property INCOME not CGT]: does NOT affect this brief; confirm at execution no drift.
- **§13 do-not-write list** [LOCKED]: no em-dashes; no real client names; no pricing; no specific surveyor / law firm names.
- **§15.1 NRB / RNRB and freezes** [LOCKED 2026-05-22]: forward-link to A7 for the IHT side; this brief mentions IHT only as the context that produces the death uplift (TCGA s.62 sits on top of the IHT death event).
- **§17.4 NRCGT — non-resident CGT on UK land** [LOCKED 2026-05-22]: anchor for the non-resident-beneficiary worked example. 60-day for every disposal; rebasing at 5 April 2015 (residential) / 5 April 2019 (non-residential) for non-residents — but **for inherited property the base cost is the s.62 death-uplift value, not the rebasing date**, because the death is a fresh acquisition event. Cite carefully.
- **§22.2 Deed of variation (s.142 IHTA 1984)** [LOCKED 2026-05-23]: forward-link for the "beneficiary refuses the inheritance" sidebar — but this brief's primary focus is CGT calculation, not the IHT route; cite once and forward-link to A7 + Wave 4 IHT decision pillar for depth.
- **§24.4 TCGA 1992 s.58** [LOCKED 2026-05-23]: not directly used in this brief (no inter-spouse mechanic in inherited-property), but cross-referenced once for "transferring the inherited property to a spouse AFTER inheriting" which is a fact pattern some readers will hit. Forward-link B1-C3.

---

## House-position conflict flag (Stage 2)

**No house-position conflict.** The source page is wrong about the 60-day £6,000 threshold but the correct rule is exactly what §5 says — the rewrite restores alignment with §5, no house-position fix needed.

**Carries the F-18 brief-level drift catch from B1-C1** (house-position §24.4 cites s.58 as inserted by "FA 2023"; verified Act is F(No.2)A 2023). Not relevant to this brief's content; recorded once in discovery log; flagged at site-wide level by B1-C1.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/62 | 200 OK + content verified 2026-05-23 (s.62(1)(a) "deemed to be acquired on his death by the personal representatives or other person on whom they devolve for a consideration equal to their market value at the date of the death"; s.62(6) 2-year deed-of-variation read-back; "up to date with all changes known to be in force on or before 23 May 2026") | s.62 statute anchor — primary load-bearing cite |
| https://www.gov.uk/capital-gains-tax-property | Likely 200 OK (verify at execution; same URL family as the gov.uk gifts page verified 2026-05-23) | gov.uk consumer baseline on 60-day reporting + rates |
| https://www.gov.uk/inherits-someone-dies | Verify at execution | gov.uk consumer baseline on inheriting property |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg30700 | 200 OK but page itself only covers "period of administration" definition; verified 2026-05-23 — the depth on PR base cost + PR rate + s.3(7) AEA sits in different CG-manual pages (verify exact CG numbers at execution; CG30530 / CG30940 / CG30820 are candidates) | HMRC CG manual on PR + administration period — practitioner-side cite |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg30810 | Verify at execution — should cover appropriation by PRs to beneficiary | The CG-manual page on appropriation (the under-used planning lever) |
| https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm35001 | 200 OK but only intro content; the s.142 depth sits in IHTM35020+ (verify exact at execution) | IHTM cite for deed-of-variation cross-link |
| Finance Act 2019 c.1 s.13 + Sch 1 (TCGA rewrite) | Verify URL at execution if needed for the s.62 amendment history note | F-8 lesson: cite the AMENDING Act if §62 sub-section numbering used in body was inserted post-FA 2019 |

**(Execution session selects 5-7 to actually cite in body. s.62 + gov.uk/capital-gains-tax-property + HMRC CG30700-family + IHTM35001-family are the 4 load-bearing; pick 1-3 supplementary.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: see B1-C1 brief for the full pointer block. Identical inheritance.

**Brief-specific reminders within those universals:**
- The £3,000 AEA + 18%/24% rates + 60-day reporting rule are the §16.35 type of figures requiring gov.uk verification at write time.
- The PR-rate of 24% under s.1H + the PR AEA mechanic under s.3(7) are the kind of practitioner-depth claims that benefit from a CG-manual cite per §16.36; verify CG-manual section numbers at write time (do NOT trust the brief's CG30530 / CG30810 guesses — Stage 1a hallucination risk per §16.40).
- The Wave 2 A7 cross-link IS already in the source; the rewrite must KEEP it (do not accidentally remove during full-file rewrite) and STRENGTHEN it (inline + reciprocal verified).
- "Stepped-up basis" terminology is American; UK = "death uplift" or "uplift to market value at death under s.62". Remove the Americanism throughout.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: see B1-C1 brief for the full pointer + delta block.

**Brief-specific call-outs within those workflow steps:**
- **Step 4 (pre-rewrite verification):** re-WebFetch s.62 + gov.uk/capital-gains-tax + HMRC CG30530 / CG30810 / CG30820 (verify exact numbers; one or more may have been renumbered) + IHTM35001 to confirm at execution.
- **Step 7 (read closest existing):** re-read **Wave 2 A7 in full** before drafting (the cross-link discipline requires the writer to know A7's body in detail, not just its title; the editorial note + lines 56 + 188 cross-link targets must align with the new body).
- **Step 9 (rewrite):** preserve frontmatter `slug` + `canonical`. Add `dateModified` + `reviewedBy` + `reviewerCredentials` + `reviewedAt` (mirror Wave 2 A7 frontmatter for stylistic consistency).
- **Step 11 (six checks):** explicit check for the £6,000 error — it must not survive paraphrase; the rule is "where CGT is due" for UK residents and "every disposal" for non-residents. Also: meta title test (2-3 candidates against a verified GSC-floor reading), meta description ≤158 chars, em-dash count = 0, FAQ schema count = `faqs:` array length, all internal links resolve (especially the Wave 2 A7 cross-links).
- **Step 13 (monitored_pages):** this slug is likely NOT yet in `monitored_pages` (the table seeds from the 2026-05-21 rewrite pass + Wave-N net-new). Insert new row with `rewrite_date = today`, `monitoring_window_days = 90`, `expected_lift = "fix 60-day £6,000 error + add PR-CGT depth + strengthen Wave 2 A7 cluster pair; expect first 90-day GSC visibility from tail-signal floor, leveraging A7 cluster traffic"`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA, trustee/PR 24%): __
- §5 60-day rule (where CGT due for UK res; every disposal for non-res): __
- §13 do-not-write (no em-dashes, no pricing, no firm names): __
- §15.1 NRB / RNRB cross-link to A7: __
- §17.4 NRCGT 60-day for non-resident beneficiary: __
- §22.2 deed of variation forward-link: __
- §24.4 spouse-transfer-of-inherited-property cross-link to B1-C3: __

### Comparison: before vs after
- Word count: ~1,500 → __
- H2 count: 7 + 3 H3 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 1 → __
- Wave 2 A7 cross-links: 1 (Related reading footer only) → __ (target: 3 inline + 1 footer)
- Frontmatter `dateModified` / `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent → __

### Factual-error removal verification
- 60-day "£6,000" threshold framing: __ REMOVED / NOT FOUND
- "Stepped-up basis" Americanism: __ REPLACED with "death uplift" throughout
- Generic "use your AEA" planning bullet: __ REPLACED with PR-vs-beneficiary AEA mechanic

### Statute-cite verification at write time (per §16.35)
- TCGA 1992 s.62(1)(a) "deemed acquired at MV at date of death" — verified at write time: __ DATE / source URL
- TCGA 1992 s.62(6) deed-of-variation read-back — verified at write time: __ DATE / source URL
- TCGA 1992 s.3(7) PR AEA for 3 tax years — verified at write time: __ DATE / source URL
- TCGA 1992 s.1H PR rate 24% residential — verified at write time: __ DATE / source URL
- 18%/24% rates + £3,000 AEA — verified gov.uk at write time: __ DATE / source URL
- 60-day rule — verified gov.uk at write time: __ DATE / source URL
- HMRC CG manual section for appropriation (CG30810 / CG30820 / verify exact number) — verified at write time: __

### Cross-link verification at write time
- Wave 2 A7 cross-link strengthened (3 inline + 1 footer): __
- A7 reciprocal back-link still present at lines 56 + 188 (verify in case A7 was edited): __
- CGT pillar back-link: __
- CGT rates trial brief forward-link from rates table: __
- 60-day deadlines page forward-link (rewritten sibling): __
- Wave 5 C8 IHT joint ownership forward-link from IHT sidebar: __

### Flags raised at execution
- F-18 (carried from B1-C1 brief): house-position §24.4 cite drift — NOT directly applicable to this brief but record discovery once: __
- F-19 (raised at this brief): 60-day "£6,000 gain threshold" framing error — confirm REMOVED at rewrite: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
