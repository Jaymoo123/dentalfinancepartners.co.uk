# Track 2 brief: cgt-divorce-property-transfer-tax-implications

**Site:** property
**Brief type:** Legacy rewrite (Track 2A, Batch 1 Sub-bucket C, page B1-C1)
**Source markdown path:** `Property/web/content/blog/cgt-divorce-property-transfer-tax-implications.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-divorce-property-transfer-tax-implications
**Stage 1 priority:** **H** (page has SUBSTANTIVELY OUTDATED content post-F(No.2)A 2023 enactment and post-6-April-2024 rate cut, plus a wrong "four-year PRR" claim; depth gap on BTL portfolio splitting is the cluster gap)
**Stage 1 date:** 2026-05-23
**Stage 2 enrichment date:** 2026-05-23
**Cannibalisation status:** REWRITE (clean against shipped Wave 1-5 net-new + 2026-05-21 rewrites; intra-batch checks against B1-C3 spouse and Wave 5 C7 PRR-joint-ownership listed below)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-divorce-property-transfer-tax-implications`. Slug carries the topical intent ("CGT" + "divorce" + "property transfer") and matches the dominant query pattern in this niche. No redirect proposed.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary — page misses the BTL portfolio playbook; main-residence framing dominates) + `VOICE-FRESHNESS` (secondary — page asserts pre-F(No.2)A 2023 "reasonable time" framing and a wrong "four-year" PRR election cap) + `STRUCTURE` (tertiary — only 4 FAQs; no statute cites in body; no rates table; no rental-specific worked example).
- **"Why this rewrite" angle:** the source page predates the F(No.2)A 2023 statutory reform that fundamentally rewrote s.58 for separating couples. It still leads with "transfers under court orders / formal agreements made within a reasonable time, typically interpreted as within one year" (line 19) — the actual rule post-6 April 2023 is a **three-tax-year statutory window from end of the tax year of permanent separation, OR an unlimited window where the disposal is under a formal court order or written separation agreement** (s.58(1A)-(1D), inserted by F(No.2)A 2023 c.30 s.41). The page also asserts a wrong "four-year main residence election" at line 21/70 — there is no four-year cap; the correct mechanic is s.225B (extended by F(No.2)A 2023) for sales under formal divorce order/agreement, or s.223(3) absence relief (a different mechanism with its own conditions). The page is unsafe to read in 2026. Rewrite must (a) anchor on the post-6-April-2023 statutory window with verbatim citations, (b) carry the **BTL portfolio splitting playbook** (the differentiator vs main-residence-heavy competitor coverage), (c) integrate the Mesher / deferred trust of land mechanic with s.225B PRR retention, (d) add the **dwelling-rate change** (28% → 24% from 6 April 2024) which the page does mention correctly at line 81-83 but without context. Cluster framing: this page is the **divorce-scenario sibling** to the **inter-spouse mechanic** sibling (B1-C3) and the **PRR + joint ownership** sibling (Wave 5 C7) — the three should triangulate rather than overlap.

---

## Current page snapshot (Stage 2 — source markdown + frontmatter read)

**Filesystem source read (2026-05-23):**
- Frontmatter `date`: 2026-04-10 — but content predates the F(No.2)A 2023 change; the `date` field was bumped at some previous edit pass without content refresh
- `dateModified`: not present (the source carries no `dateModified` field at all — missing reviewer / dateModified / reviewedBy / reviewedAt vs the Wave 2+ frontmatter template; this is a separate structural gap from `BlogPostingJsonLd` enrichment)
- `reviewedBy` / `reviewerCredentials` / `reviewedAt`: NONE (vs the Wave 2+ ICAEW reviewer pattern — adds E-E-A-T gap)
- `metaTitle`: "CGT Divorce Property Transfer: UK Tax Implications Guide" (52 chars; OK)
- `metaDescription`: "Comprehensive guide to CGT divorce property transfer rules, no-gain no-loss transfers, principal residence relief, and timing strategies for divorcing landlords." (165 chars; over 158 limit — overflow)
- `faqs`: 4 entries (target 12-14)
- `h1`: "CGT and Divorce: Property Transfer Tax Implications for UK Landlords" (good — landlord-specific)
- Body word count: ~1,500 (target 2,800-3,200)
- H2 sections: 6 (How CGT applies; PRR + family home; BTL + investment; CGT rates + planning; Record keeping; When to seek advice + post-divorce) plus 6 H3s
- Internal links: 4 (PRR landlords, BTL ltdco complete guide, rental income tax, MTD 2026)
- Outbound authority links: **0** (no gov.uk / legislation.gov.uk / HMRC manual citation in body)
- Worked examples: 2 (one £200k → £300k BTL transfer, one notional saving "£720/yr"). Neither is a multi-property BTL portfolio split worked example.
- Statute cites in body: TCGA 1992 s.58 NOT named in body (mentioned only by description "no gain, no loss"); s.225B NOT named; F(No.2)A 2023 NOT named. The page reads as pre-reform content.
- **Substantive content errors (≥3, document and correct at rewrite):**
  - **Error 1 (line 19):** "HMRC typically accepts transfers within one year as being within a 'reasonable time'" — false post-F(No.2)A 2023. Correct rule: statutory 3-tax-year window from end of tax year of permanent separation under s.58(1A)-(1C); unlimited where the disposal is under a court order or written separation agreement under s.58(1D).
  - **Error 2 (line 21 FAQ + line 70 body):** "elect to treat the former family home as your main residence for up to four years" — there is no four-year cap. The page conflates s.223(3) absence relief (which has internal time conditions but no four-year cap), s.225B (no time cap; conditions A/B/C only), and s.222(5) nomination (no four-year cap; the 2-year is the nomination *deadline* not the relief window). Correct mechanic: s.225B extends PRR for the departing spouse where (A) disposal under a formal order or agreement, (B) the property continues as the other party's only or main residence between separation and disposal, (C) no competing s.222(5) nomination has been made for another property in that period. Verified against HMRC CG65356 on 2026-05-23.
  - **Error 3 (frontmatter FAQ line 18):** "There's no fixed time limit, but transfers must be made under a court order or formal separation agreement to qualify for no-gain no-loss treatment after divorce. HMRC typically accepts transfers within one year as being within a 'reasonable time'" — runs together the "no time limit" rule (which IS the post-F(No.2)A 2023 position for court-ordered disposals) with a deprecated "reasonable time" framing. The two are contradictory.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-23 PM via `python -m optimisation_engine.track2.pull_page_data --slug cgt-divorce-property-transfer-tax-implications --days 90`.**

**Aggregate:** **ZERO GSC rows** for this slug in the 90-day window. ZERO `competitor_serps` rows; ZERO `page_content_map` rows (never parsed); ZERO `competitor_gap_reports`.

**Pattern read:** the page exists on the site and is indexed (verified, the URL resolves) but **gets sub-threshold daily traffic** so it never crosses GSC's per-day reporting floor. This is the **TAIL-SIGNAL** case (distinct from airbnb's INVISIBLE case in trial brief 1 — airbnb had 0 GSC + 1 GA4 session; this page is presumably picking up sporadic non-aggregated impressions across the window).

**Strategic conclusion:** unlike the gold-reference `cgt-rates-property-2026-27-current-rates-explained` brief (which had 25 queries + 895 impressions of CTR-fail signal to ground gap-mode diagnosis), this brief proceeds on **content-quality reasoning** rather than query-pattern reasoning. The DEPTH + VOICE-FRESHNESS + STRUCTURE diagnosis above is built from (i) source-page content review (3 verified factual errors above), (ii) competitor coverage signals (below), (iii) house-position alignment (§5 + §24 + §17). Post-rewrite, monitor via `monitored_pages` for whether the content fix lifts the page across the GSC reporting floor.

### GA4 engagement signal (real data from `ga4_page_data`)

- ZERO rows. Page never received enough sessions in the window to register in GA4 aggregation.

**Implication for the brief:** no engagement signal to triangulate. Rewrite proceeds on content-correctness + cluster-positioning logic.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source-page review)

**Primary: DEPTH (with BTL-portfolio focus as the load-bearing gap).** Every competitor in the SERP for "CGT divorce property" — HS281 helpsheet (gov.uk; verified 2026-05-23; no rental examples), Connaught Law (~3,800 words, 8 sections; 70% main-residence-focused, 15% BTL), Weightmans (~2,200 words; minimal BTL), Tax Adviser magazine (verification 403-blocked — note as inaccessible at execution rather than absent) — covers main residence well and underweights BTL portfolio division. The structural gap on rental-property splitting between divorcing spouses is the cluster's unsolved problem. Our differentiator: a full BTL-portfolio-splitting playbook covering (a) whether to transfer-then-sell (each spouse uses their own AEA + rate band) or sell-then-split-cash (one spouse takes the tax hit), (b) the s.58(1D) court-order route for staged-over-time disposals, (c) the Mesher + s.225B retention for the former family home where one BTL was previously a main residence, (d) the SDLT-on-mortgage-assumption trap (FA 2003 Sch 4 para 8) when reorganising mortgaged portfolios mid-divorce, (e) interaction with §17 NRCGT 60-day if either spouse leaves the UK during the divorce process.

**Secondary: VOICE-FRESHNESS / SUBSTANTIVE FACTUAL ERROR.** Three identified factual errors above (the "one year reasonable time" framing, the "four-year PRR election" claim, the contradiction within the no-time-limit FAQ). These are not stylistic drift — they are **wrong content** that gives reader-facing tax advice that fails post-6-April-2023 statutory reform. Rewrite must (i) excise all three errors, (ii) anchor every claim on the post-F(No.2)A 2023 verified statute, (iii) date-stamp the rate-cut anchor (28% → 24% from 6 April 2024) which the page does include but without provenance.

**Tertiary: STRUCTURE.** 4 FAQs (target 12-14); 0 outbound authority cites in body; no rates table at top; no §"What to do this week" practical action block; missing the Wave 2+ reviewer-byline frontmatter (`reviewedBy`, `reviewerCredentials`, `reviewedAt`); missing `dateModified`; meta description over 158-char limit.

**Load-bearing fix sequence (ordered by reader-impact ROI):**

1. **Excise the 3 factual errors** and replace with verified post-F(No.2)A 2023 statutory framework (s.58(1A)-(1D); s.225B as amended by F(No.2)A 2023; CG65356 conditions A/B/C). This is the load-bearing fix — without it the page is misleading.
2. **Add BTL portfolio splitting playbook** as a new ~600-word section, covering the 5 angles above. This is the cluster differentiator.
3. **Add 2 new worked examples**: (i) 4-BTL portfolio split where each spouse takes 2 properties under s.58(1D) court order; (ii) former main residence with 3-year letting interlude pre-separation, Mesher in place, sale 5 years after separation under court order — full s.225B calculation.
4. **Body lift to 2,800-3,200 words** with the BTL playbook + statute anchors + 8-10 more FAQs.
5. **Authority links: 5-7 verified citations** (s.58 legislation.gov.uk; s.225B legislation.gov.uk; HS281 helpsheet; CG65356; F(No.2)A 2023 c.30 s.41; gov.uk/capital-gains-tax/gifts for the spouse exemption baseline).
6. **Frontmatter hygiene:** add `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`. Trim meta description to ≤158 chars. Bump `date` to actual write date if substantive rewrite.
7. **Rates table at top** (snippet-bait optimisation): the 18% / 24% rates + AEA £3,000 + 60-day deadline + spouse-exemption window in a 4-row table; competitor coverage rarely has this and it captures snippet pulls.

---

## Competitor URLs (Stage 2 — verified live 2026-05-23 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | BTL coverage | What to borrow / differentiate |
|---|---|---|---|---|---|---|
| https://www.gov.uk/government/publications/husband-and-wife-civil-partners-divorce-dissolution-and-separation-hs281-self-assessment-helpsheet/hs281-capital-gains-tax-civil-partners-and-spouses-2024 | 200 OK; verified 2026-05-23 | ~2,500 | 0 | s.58, s.225B explicitly | NONE (all examples PPR/family home) | **Borrow:** Example 3 Mesher structure (deferred sale until children 18, proceeds split). **Differentiate:** add BTL-portfolio coverage HS281 entirely omits. |
| https://www.connaughtlaw.com/capital-gains-tax-divorce-uk-cgt-legal-guide/ | 200 OK; verified 2026-05-23 | ~3,800 | 8 | Limited (FA 2023 by name only; no s.58/s.225B section refs) | ~15% (light) | **Borrow:** 3 real-world scenarios structure. **Differentiate:** add the F(No.2)A 2023 section-level citations Connaught omits; depth on BTL portfolio split. |
| https://www.weightmans.com/media-centre/news/changes-to-capital-gains-tax-rules-on-divorce-and-dissolution/ | 200 OK; verified 2026-05-23 | ~2,200 | 0 | s.58 + s.225B named | Minimal | **Borrow:** before/after structure (pre-6-April-2023 vs post-6-April-2023). **Differentiate:** add FAQ block (Weightmans has none) + multi-BTL worked example. |
| https://www.litrg.org.uk/savings-property/capital-gains-tax/capital-gains-tax-separation-and-divorce | **403 Forbidden** at 2026-05-23 fetch | Unknown | Unknown | Unknown | Unknown | LITRG typically reliable for consumer angle; **flag execution-session re-fetch** (may be UA-block; try with browser User-Agent). Cite as "execution-session to verify" per §16.31. |
| https://www.taxadvisermagazine.com/article/calculating-capital-gains-tax-property-cases-separation-or-divorce | **403 Forbidden** at 2026-05-23 fetch | Unknown | Unknown | Unknown (CIOT magazine; expected high-quality cite) | Unknown | Tax Adviser is CIOT's practitioner magazine — typically rigorous on statute. **Flag execution-session re-fetch.** |

**Competitor depth ceiling:** ~2,500-3,800 words, ≤8 FAQs, statute citations selective. Our 2,800-3,200 word target with 12-14 FAQs + 5-7 statute citations + 2 multi-BTL worked examples + rates table puts us best-in-class on the BTL angle specifically, which is where the cluster gap lives.

**What to differentiate against:** all four accessible competitors are main-residence-heavy and either (a) reach the BTL angle in one paragraph or (b) skip it entirely. None has a multi-BTL portfolio worked example showing the s.58(1D) staged-disposal mechanic. That is the open cluster opportunity.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (PM refresh, post-Wave-5 merge).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (self) | cgt-divorce-property-transfer-tax-implications | REWRITE | self — rewrite in place |
| Excluded (Wave 5 C-bucket SHIPPED 2026-05-23) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics | PRR + joint ownership pillar (Wave 5 C7) | **No collision** — Wave 5 C7 covers the PRR mechanic + s.222(5) nomination + s.225B post-separation extension as a PRR-focused page. This rewrite (B1-C1) covers the divorce *transfer* mechanic + BTL portfolio + Mesher in the BTL context, with a brief s.225B mention forward-linking to Wave 5 C7 as the PRR depth source. Reciprocal forward-link required at execution. |
| Excluded (Wave 5 C-bucket SHIPPED 2026-05-23) | joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords | JT vs TIC foundational (Wave 5 C2) | No collision — covers severance + structural choice. This brief references TIC in passing for the Mesher mechanic and forward-links. |
| Excluded (Wave 5 C-bucket SHIPPED 2026-05-23) | form-17-declaration-beneficial-interest-property-mechanics-filing-revocation | Form 17 pillar (Wave 5 C1) | No collision (Form 17 not a divorce mechanic). Forward-link only for reader who lands here looking for the wrong mechanic. |
| Excluded (Wave 5 C-bucket SHIPPED 2026-05-23) | retirement-planning-spousal-rental-income-shift-form-17-marginal-rate-restructure | Wave 5 C10 — spousal income shift pre-retirement | No collision (different life event). |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar (Session C #47) | No collision — pillar covers policy at top level. This page is the divorce-specific application. Reciprocal forward-link required. |
| Excluded (rewritten 2026-05-21) | cgt-gifting-property-family-members-uk | Gifting reliefs (Session B #46) | Adjacent. Gifting page covers `s.165 holdover` and `s.260 trust holdover` for gifts; this page is non-gift inter-spouse mechanic. Forward-link from this page's "spouse transfers vs gifts to other family members" comparison section. |
| Excluded (rewritten 2026-05-21) | principal-private-residence-relief-landlords | PRR landlord pillar | Forward-link from §"Family home: PRR and the s.225B extension" — both ways. |
| Residual (intra-Batch-1) | **B1-C3 cgt-property-transfer-spouse** | Sub-bucket C sibling | **Critical adjacency — define boundary explicitly**. B1-C3 covers spouse transfers in normal (non-separation) life: s.58(1A)-(1B), Form 17, declaration-of-trust + SDLT debt trap, planning for portfolio rebalancing. B1-C1 (this brief) covers transfers in the separation / divorce specific case: s.58(1C)-(1D), s.225B, Mesher mechanics, BTL portfolio split under court order. The boundary: B1-C3 is the "happily-married rebalancing" page; B1-C1 is the "separating / divorcing" page. Both forward-link to each other once with explicit framing ("Looking for transfers between living-together spouses? See [B1-C3]. Looking for transfers in the divorce / separation context? You are here."). |
| Residual (intra-Batch-1) | B1-C2 cgt-inherited-rental-property-calculation-uk | Sub-bucket C sibling | No collision (different life event — death not divorce). Forward-link only in §"Related life events". |
| Wave 6 (in-flight) | Bucket A / B / C (LtdCo extraction, Trusts, CAA) | — | No collision (none of W6 buckets are divorce). |
| Track 2B candidate #2 (Wave 7+ planning) | SDLT-on-divorce (sibling topic) | — | **Note adjacency** — when Wave 7+ commissions an SDLT-on-divorce page, it should be the SDLT-side sibling to this CGT-side page. Forward-link target reserved for then. Logged in discovery log per launch-prompt instruction. |

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Clean cluster positioning; the three Sub-bucket C pages (B1-C1 divorce, B1-C2 inherited, B1-C3 spouse) carve up the cluster cleanly across three distinct life events.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page after rewrite):

- **B1-C3 sibling** `cgt-property-transfer-spouse` — bidirectional with explicit boundary line per cannib table
- **B1-C2 sibling** `cgt-inherited-rental-property-calculation-uk` — one-way mention in "related life events"
- **Wave 5 C7** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — forward-link from §"Family home: PRR and the s.225B extension"; back-link reciprocal at execution
- **Wave 5 C2** `joint-tenants-vs-tenants-in-common-property-tax-consequences-uk-landlords` — forward-link from §"Restructuring the title at separation" (severance route for Mesher)
- **Wave 5 C1** `form-17-declaration-beneficial-interest-property-mechanics-filing-revocation` — forward-link from "looking for non-separation spouse rebalancing?" disambiguation
- **CGT pillar (rewritten 2026-05-21)** `capital-gains-tax-property-complete-guide-uk` — back-link target
- **CGT gifting (rewritten 2026-05-21)** `cgt-gifting-property-family-members-uk` — forward-link from "spouse transfer vs gift to other family member" comparison
- **CGT rates (Track 2 trial gold reference)** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from rates table at top
- **PRR landlords (residual)** `principal-private-residence-relief-landlords` — forward-link from §"Family home: PRR and the s.225B extension"
- **NRCGT 60-day (residual)** any of `60-day-cgt-reporting-property-sales-complete-guide` / `cgt-reporting-deadlines-property-2026` (Batch 1 sub-bucket B) — forward-link for the spouse-leaves-UK-mid-divorce subcase

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified gov.uk 2026-05-23]: 18% basic, 24% higher, £3,000 AEA, trustee/PR rate 24% throughout. This rewrite cites these as the per-spouse-share post-transfer figures.
- **§7 April 2027 property income tax surcharge** [LOCKED — but **the surcharge is on property INCOME, not on CGT**. Does NOT affect this brief.] Confirm at execution that no part of the rewrite drifts into an unhedged 22/42/47 assertion (e.g., in the "post-divorce income tax planning" forward-link section).
- **§13 do-not-write list** [LOCKED]: no em-dashes anywhere; no real client names; no pricing; no specific letting agency or law firm names.
- **§15 IHT — Wave 2 extension** [LOCKED 2026-05-22]: s.18 spouse exemption (s.18(2) limited where one spouse is not long-term-resident). Touched briefly for "what happens to IHT exposure between separation and divorce" sidebar.
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22]: §17.4 NRCGT 60-day. Touched for the "if either spouse leaves the UK mid-divorce" subcase (uncommon but high-stakes).
- **§17.6 Domicile reform and the residence-based regime (April 2025+)** [LOCKED 2026-05-22, F-correction-logged 2026-05-22]: **the current source page B1-C3 (sibling) still uses pre-FA-2025 "non-UK-resident spouse" framing**. This brief should NOT touch the non-dom angle except by forward-linking to the corrected B1-C3 sibling once that is rewritten.
- **§24.4 TCGA 1992 s.58 no-gain-no-loss spouse transfer** [LOCKED 2026-05-23]: anchor for this rewrite. **Drift catch (see flag F-18 below):** §24.4 cites the s.58(1A)-(1D) extension as "(inserted by FA 2023)" but legislation.gov.uk amendment history confirms the inserting Act is **Finance (No. 2) Act 2023 (c.30) s.41(2)(6)** (in force 6 April 2023), NOT Finance Act 2023. Verified 2026-05-23 via legislation.gov.uk s.58 amendment table. The brief uses the verified F(No.2)A 2023 citation; flag raised to track2_site_wide_flags.md as F-18 (drift catch in locked §24.4) for manager fix in §24.4 + §24.9 citation list.
- **§24.5 cross-mechanism interactions** [LOCKED 2026-05-23]: forward-link path for the "spouse transfers and the s.222(6) one-residence rule" reader question — answered fully in Wave 5 C7.

---

## House-position conflict flag (Stage 2)

**Flag F-18 (NEW) — house-position §24.4 + §24.9 cite drift.** §24.4 says s.58(1A)-(1D) was "inserted by FA 2023"; legislation.gov.uk amendment history says **F(No.2)A 2023 c.30 s.41(2)(6)**. This brief uses the verified F(No.2)A 2023 cite throughout. Flag for manager-side fix in `house_positions.md §24.4` + `§24.9` citation list. **Non-blocking** for this brief (the brief cites the verified Act; the house-position citation is the artefact to correct in a future patch). Per §16.40 lesson, this is the kind of Stage 2 brief-time catch the statutory cross-check gate is designed to surface.

**No other conflicts.** The source page contains 3 factual errors (above) but those are page-content errors, not house-position contradictions; the rewrite removes them.

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/58 | 200 OK + content verified 2026-05-23 (subsections 1A-1D present; F(No.2)A 2023 c.30 s.41(2)(6) in amendment history; FA 2025 c.8 modification pending but not yet in force) | s.58 statute anchor — cite verbatim for the no-gain-no-loss framework |
| https://www.legislation.gov.uk/ukpga/1992/12/section/225B | 200 OK + content verified 2026-05-23 (inserted by SI 2009/730 6 April 2009; amended by F(No.2)A 2023 inserting "someone other than" in 2 places effective 6 April 2023) | s.225B statute anchor — Conditions A/B/C plus the 6-April-2023 clarification |
| https://www.gov.uk/government/publications/husband-and-wife-civil-partners-divorce-dissolution-and-separation-hs281-self-assessment-helpsheet/hs281-capital-gains-tax-civil-partners-and-spouses-2024 | 200 OK + content verified 2026-05-23 (the 2024 helpsheet; Example 3 Mesher pattern verified) | HMRC consumer helpsheet — link for readers who want HMRC's own framing |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65356 | 200 OK + content verified 2026-05-23 (Conditions A/B/C language quoted) | HMRC CG manual on s.225B — practitioner-side authority |
| https://www.gov.uk/capital-gains-tax/gifts | 200 OK + content verified 2026-05-23 | gov.uk consumer baseline — **NOTE: page does NOT yet reflect the 6-April-2023 3-year extension explicitly** (it says "separated and did not live together at all in that tax year" triggers CGT — pre-F(No.2)A 2023 phrasing). Cite as the BASIC spouse-exemption authority only; do NOT cite for the post-separation rules. |
| Finance (No. 2) Act 2023 c.30 s.41 | Verify URL at execution (likely `https://www.legislation.gov.uk/ukpga/2023/30/section/41`) | The inserting Act — cite once in body for the precise statutory provenance |
| HMRC CG65380 (Mesher) — verify exact CG number at execution | Defer to execution | Mesher / deferred trust mechanic |

**(Execution session selects 5-7 to actually cite in body. F(No.2)A 2023 s.41 and s.58 + s.225B + CG65356 are the load-bearing 4; the other 2-3 are secondary.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules + lead-gen architecture + CSS-in-markdown + FAQs and schema + anti-templating + quality bar + statute citation discipline (F-8 lesson) + all §16 lessons (especially §16.18 reasoning-first, §16.31 URL liveness, §16.35 per-write rate verification, §16.36 + §16.40 statutory cross-check). The execution session reads `NETNEW_PROGRAM.md §4` + `docs/competitor_rewrite_playbook.md §5` once at session start.

**Brief-specific reminders within those universals:**
- The rate-cut (28% → 24% from 6 April 2024) is the §16.35 type of figure that needs gov.uk verification at write time.
- The "F(No.2)A 2023 not FA 2023" finding is the §16.40 type of finding that the brief surfaces but the writer also independently verifies.
- The 3 factual errors in the source page are non-negotiable removals; the writer should not accidentally retain them by paraphrase.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full Wave 5 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas: step 9 rewrites at existing path; step 12 may propose REDIRECT (this brief proposes REWRITE so step 12 is "no redirect required, slug preserved"); step 13 updates existing `monitored_pages` row OR inserts new if not yet tracked.

**Brief-specific call-outs within those workflow steps:**
- **Step 4 (pre-rewrite verification):** re-WebFetch s.58 + s.225B + HS281 + CG65356 to confirm no statute change between brief date (2026-05-23) and execution date. Re-WebFetch the 4 competitor URLs for liveness.
- **Step 9 (rewrite):** preserve frontmatter `slug` + `canonical`. Add `dateModified` + `reviewedBy` + `reviewerCredentials` + `reviewedAt`. Bump `date` only if the rewrite is substantive (it is — substantively reworked).
- **Step 11 (six checks):** explicit check for the 3 factual errors — none must survive paraphrase. Also: meta description ≤158 chars; em-dash count = 0; FAQ schema count = `faqs:` array length.
- **Step 13 (monitored_pages):** this slug is likely NOT yet in `monitored_pages` (the table seeds from the 2026-05-21 rewrite pass + Wave-N net-new). Insert new row with `rewrite_date = today`, `monitoring_window_days = 90`, `expected_lift = "DEPTH-fix + voice-freshness lift; expect first 90-day GSC visibility from tail-signal floor"`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA, trustee/PR 24%): __
- §13 do-not-write (no em-dashes, no pricing, no firm names): __
- §15.x spouse exemption forward-link: __
- §17.4 NRCGT 60-day forward-link (spouse-leaves-UK subcase): __
- §17.6 long-term-resident reform — NOT touched in this brief (B1-C3 sibling owns it): __
- §24.4 s.58 — verified Act = F(No.2)A 2023 c.30 s.41: __
- §24.5 s.222(6) one-residence rule — forward-link to Wave 5 C7: __

### Comparison: before vs after
- Word count: ~1,500 → __
- H2 count: 6 + 6 H3 → __
- FAQ count: 4 → __
- Authority links: 0 → __
- Inline CTAs: 0 → __
- Worked examples: 2 → __
- Rates table at top: 0 → __ (1 expected)
- Frontmatter `dateModified`: absent → __
- Frontmatter `reviewedBy`/`reviewerCredentials`/`reviewedAt`: absent → __

### Factual-error removal verification
- Error 1 (line 19 "one year reasonable time" framing): __ REMOVED / NOT FOUND
- Error 2 (line 21+70 "four-year main residence election" claim): __ REMOVED / NOT FOUND
- Error 3 (FAQ contradiction "no time limit" + "reasonable time"): __ REMOVED / NOT FOUND

### Statute-cite verification at write time (per §16.35)
- s.58(1A)-(1D) wording — verified at write time: __ DATE / source URL
- s.225B Conditions A/B/C wording — verified at write time: __ DATE / source URL
- F(No.2)A 2023 c.30 s.41 — verified at write time: __ DATE / source URL
- 18%/24% rates — verified gov.uk at write time: __ DATE / source URL
- £3,000 AEA — verified gov.uk at write time: __ DATE / source URL

### Cross-link verification at write time
- Wave 5 C7 PRR + joint ownership: forward-link added, reciprocal back-link from C7: __
- Wave 5 C2 JT vs TIC: forward-link added: __
- B1-C3 spouse sibling: forward-link added (will be reciprocal once C3 rewrite ships): __
- CGT pillar: forward-link added + reciprocal: __

### Flags raised at execution
- F-18 (carried from brief): house-position §24.4 cite drift — flag for manager update: __ confirmed at write
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
