# Track 2 Batch 1 — Sub-bucket C discovery log

Append-only. Format + tags identical to Sub-bucket A discovery log.

**Critical:** edits via ABSOLUTE PATH `C:/Users/user/Documents/Accounting/docs/property/track2_discovery_log_batch1_sub_c.md` only.

---

## Session entry: 2026-05-23 23:30Z — Sub-bucket C sub-agent complete

**Briefs drafted:** 3 of 3 (B1-C1 divorce, B1-C2 inherited rental, B1-C3 spouse). All ⬜ → 🟢 in tracker. All in `briefs/property/track2/batch1_cgt/sub_c/`.

**Approach:** all 3 briefs are REWRITE (no REDIRECT-PROPOSED — clean cannib resolution against Wave 5 C-cluster + 2026-05-21 rewrites + intra-batch siblings). Gold-reference depth attempted on every section, with two important contextual differences from the cgt-rates trial gold reference:

1. **TAIL-SIGNAL pattern (all 3 pages):** `python -m optimisation_engine.track2.pull_page_data` returned ZERO GSC + ZERO GA4 + ZERO competitor_serps + ZERO page_content_map rows for all 3 slugs. Pages are indexed (URLs resolve) but daily impressions sub-floor for GSC aggregation. **Distinct from airbnb's INVISIBLE case (T1 trial)** which had GA4 evidence of one session; these have zero GA4 too — pure tail signal. **Implication for gap-mode diagnosis:** could not ground diagnosis in query-pattern reasoning (no queries to read); diagnosed on (a) content-correctness reasoning against source-page review, (b) cluster-positioning reasoning against Wave 5 C-cluster shipped 2026-05-23, (c) competitor coverage gap from WebFetch on accessible competitors. Adds a 4th explicit case for Phase 2 gap-mode taxonomy alongside CTR-FAIL / INTENT-MISMATCH / INVISIBLE: **TAIL-SIGNAL** = page is below GSC reporting floor with zero corroborating GA4, diagnosis on content + cluster + competitor.

2. **Cluster-gateway role (acute for B1-C3):** Wave 5 C-cluster shipped 10 operational mechanic pages 2026-05-23; B1-C3's primary structural job is to become the gateway routing readers into them. The brief identifies 9 mandatory Wave 5 C-cluster forward-links (C1, C2, C3, C4, C5, C6, C7, C8, C9). This is the largest cross-link saturation any Track 2A brief has carried so far. Wave 5 C-cluster reciprocal back-links from C2 + C7 are recommended as a future-batch back-patch (out of this sub-bucket's lane — read-only against Wave 5 per §0).

**Statute verification (per §16.35 + §16.36):**
- TCGA 1992 s.58 — WebFetched legislation.gov.uk 2026-05-23; subsections 1A-1D verified present; amendment history confirms inserting Act is **Finance (No. 2) Act 2023 (c.30) s.41(2)(6)**, in force 6 April 2023. **Note FA 2025 c.8 modification pending — not yet in force at brief date.**
- TCGA 1992 s.225B — WebFetched 2026-05-23; inserted by SI 2009/730 6 April 2009; amended by F(No.2)A 2023 effective 6 April 2023 (insertion of "someone other than" in 2 places).
- TCGA 1992 s.62 — WebFetched 2026-05-23; s.62(1)(a) "deemed to be acquired on his death by the personal representatives or other person on whom they devolve for a consideration equal to their market value at the date of the death" verified; s.62(6) 2-year deed-of-variation read-back verified; page up to date with all changes known to be in force on or before 23 May 2026.
- IHTA 1984 s.142 — WebFetched 2026-05-23; 2-year window confirmed; FA 2002 election-statement requirement confirmed; no-consideration rule confirmed.
- HMRC HS281 (gov.uk 2024 helpsheet) — WebFetched 2026-05-23; s.58 + s.225B language verified; **NOTE: no rental property examples — all PPR / family-home illustrations.**
- HMRC CG65356 — WebFetched 2026-05-23; Conditions A/B/C for s.225B verified.
- gov.uk/capital-gains-tax/gifts — WebFetched 2026-05-23; consumer page does NOT yet reflect F(No.2)A 2023 6-April-2023 changes (still uses pre-2023 phrasing). Citable for basic spouse-exemption authority only; NOT for post-separation rules.

**Competitor URL liveness (per §16.31):**
- Verified live 2026-05-23: gov.uk HS281; gov.uk/capital-gains-tax/gifts; connaughtlaw.com; weightmans.com; withfarra.co.uk; protaxaccountant.co.uk.
- **403 Forbidden 2026-05-23**: LITRG (litrg.org.uk/savings-property/capital-gains-tax/capital-gains-tax-separation-and-divorce); Tax Adviser Magazine (taxadvisermagazine.com/article/calculating-capital-gains-tax-property-cases-separation-or-divorce). Possibly UA-block; flagged for execution-session re-fetch with browser User-Agent. Likely high-quality cites (LITRG = Low Incomes Tax Reform Group; Tax Adviser = CIOT practitioner magazine) — worth recovering.
- Defer-to-execution (surface-fetched only, not deep-fetched): pocketwise.co.uk; gofile.co.uk; propertypassport.uk; library.croneri.co.uk (paywalled practitioner library).
- HMRC CG30700 page reached only narrow definitional content (period of administration); the PR-CGT depth + s.3(7) AEA mechanic + assent depth sit elsewhere in CG-manual (verify exact CG numbers at execution; CG30530 / CG30810 / CG30820 are educated guesses, NOT verified — execution-session must verify before citing).
- HMRC IHTM35001 page reached only intro content; the s.142 depth sits in IHTM35002+ pages.

**Tags raised:**
- **F-18 (HIGH, HOUSE_POSITION_CONFLICT + STATUTE_CITATION_HALLUCINATION):** §24.4 cites s.58 extension as inserted by "FA 2023"; verified Act = **F(No.2)A 2023 c.30 s.41(2)(6)**. Same-year-different-Act drift sub-pattern. Eleventh-consecutive program drift catch. All 3 briefs use the verified F(No.2)A 2023 cite. Manager fix recommended for `house_positions.md §24.4` body + `§24.9` citation list before next batch touches §24.
- **F-19 (MEDIUM, STALE_FIGURES, cluster audit):** the "60-day reporting if gain exceeds £6,000" framing on B1-C2 source page (line 102) is incorrect per §5 LOCKED. Likely pre-Autumn-Budget-2024 vintage pattern site-wide across legacy 60-day / inherited-property / disposal-mechanics pages. Adjacent to Sub-bucket B's F-13 (which is a manager-prompt hallucination on the rewritten canonical) but a different drift pattern. Cluster audit recommended.
- **F-20 (MEDIUM, STALE_FIGURES + HOUSE_POSITION_CONFLICT, cluster audit):** "non-UK-resident spouse" framing on B1-C3 source page (lines 39-40, 42-43) is pre-FA-2025 vintage; conflicts with §17.6 + §22.5 + §24.4 (s.58 turns on "living together" not residence; IHT spouse exemption now turns on long-term-resident status not domicile). Also: mixed-use carve-out at lines 44-45 is wrong (s.58 applies to any asset). Cluster audit recommended across spouse-transfer + IHT-spouse + NRL pages.

**Cross-batch topic adjacency (per launch prompt instruction for B1-C1):**
- B1-C1 (cgt-divorce-property-transfer-tax-implications) has topic adjacency to Track 2B candidate #2 SDLT-on-divorce (per Track 2B output addendum). Wave 7+ planning should commission the SDLT-on-divorce page as a sibling to this CGT-side page; cross-link target reserved for then. Not actionable in this batch.

**Cross-link verification notes for execution session:**
- Wave 2 A7 (`inheriting-uk-rental-property-executors-step-by-step`) already cross-links INTO B1-C2 at body lines 56 + 188. B1-C2 rewrite must KEEP (do not accidentally remove during full-file rewrite) + STRENGTHEN (target 3 inline + 1 footer reciprocal link).
- Wave 5 C2 + C8 + C9 live under category `landlord-tax-essentials` (per their frontmatter), NOT `capital-gains-tax`. Forward-link slugs in the briefs must use the correct canonical paths; verify at execution.

**Q&A discipline note (§16.15 + §16.37 critical, per launch prompt):**
- Sub-bucket C raised ZERO questions to manager. All findings are either (a) actionable in the brief itself, (b) cross-residual cluster audit recommendations (F-19, F-20), or (c) house-position cite-drift catches (F-18). All non-blocking. No `Q-N` headings appended to `track2_questions_batch1_sub_c.md`.

**Time spent:** ~90 minutes (well inside launch-prompt 90-120 min estimate). Within budget.

**Self-assessment vs gold-reference depth target:**
- All 14 required sections present in each brief
- Real verified statutes (5+ per brief, all with WebFetch dates)
- Real competitor URLs with WebFetch status (3-6 per brief, 2 flagged as 403 for execution re-fetch)
- Cannibalisation table with cluster-snapshot timestamp (2026-05-23 PM)
- Explicit intra-batch boundary policing (B1-C1 vs B1-C3 cohabiting-vs-separating split; B1-C2 vs Wave 2 A7 PR-vs-beneficiary split)
- Anti-templating PASS: 3 briefs have visibly distinct gap-mode diagnoses (B1-C1 DEPTH + VOICE-FRESHNESS + STRUCTURE with 3 factual errors; B1-C2 DEPTH on beneficiary-side CGT + 60-day £6k error fix + Wave 2 A7 cluster pair; B1-C3 STRUCTURE-acute + Wave 5 C-cluster gateway role + stale non-dom + mixed-use refresh)
- Gap vs gold reference: cannot match cgt-rates trial brief's data-richness (which had 25 real GSC queries) because the 3 Sub-bucket C slugs are TAIL-SIGNAL. The brief substitutes content-correctness + cluster-positioning + statute liveness depth for query-pattern depth.
