# Track 2 brief: mortgage-interest-deductible-landlords-uk-2026

**Site:** property
**Brief type:** Legacy rewrite — gold-reference data-complete brief (S24-residual cluster)
**Source markdown path:** `Property/web/content/blog/mortgage-interest-deductible-landlords-uk-2026.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/section-24-and-tax-relief/mortgage-interest-deductible-landlords-uk-2026
**Stage 1 priority:** M (INVISIBLE in GSC/Bing today, but the page's own headline query "is mortgage interest deductible for uk landlords 2026" is leaking to an unrelated page at pos 4.8 / 8 impr — recovering that intent is the whole point of the rewrite)
**Stage 1 date:** 2026-06-02
**Stage 2 enrichment date:** 2026-06-02 (diagnosis-supplied GSC + on-disk cluster verification + house_positions §4/§7 re-read + on-disk sibling confirmation)
**Cannibalisation status:** REWRITE with sharp differentiation (the weakest, INVISIBLE page in a 4-page mortgage-interest cluster; per REWRITE-ONLY standing rule no 301 proposed)

> Depth match-target is `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` (gold reference). City-rewrite reference template is `briefs/property/track2/trial/birmingham-property-accountant.md` (for the F-1 pricing-leak discipline, even though this page is clean). This brief is data-complete from the diagnosis payload.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `mortgage-interest-deductible-landlords-uk-2026`. The slug is question-shaped and carries the year identifier; it maps exactly to the decision-tree / direct-answer intent this rewrite must own ("is it deductible? yes-or-no by owner type"). No redirect proposed.
- **Category:** `section-24-and-tax-relief` (kept). Canonical URL pattern `/blog/section-24-and-tax-relief/<slug>` — all three cluster siblings share it.
- **Gap-mode tag (one or more):** `INVISIBLE` (primary) + `THIN_DEPTH` (secondary, 1,018 words vs cluster siblings at 1,518–3,386) + `CANNIBAL` (tertiary, sits in a 4-page mortgage-interest cluster and must be sharply differentiated) + `STRUCTURE` (no answer-box, no decision matrix, no reference table, 4 FAQs, 0 outbound authority links) + `STALE_FACTS` (April 2027 substance is correct but the announcement is mis-stampable and there are zero statute citations).
- **"Why this rewrite" angle (distinct from a net-new "why a new page" angle):** This page already exists and already targets the exact, valuable, question-shaped intent ("is mortgage interest deductible for uk landlords 2026", 8 impr / pos 4.8) — but that headline query is being served by an UNRELATED page (`landlord-tax-deductions-uk-2026-complete-list`), and this page is INVISIBLE (zero GSC, zero Bing). The broad "mortgage interest tax relief" universe (~129 impr / 54 queries) is owned by a legacy URL with no markdown on disk (`mortgage-interest-tax-relief-changes-landlords`, orphan/redirected). Because this page is the WEAKEST in the cluster and carries no ranking equity, REWRITE carries zero equity-loss risk (collapse-guard §16.T2 is satisfied trivially — there is nothing to bury). The rewrite repositions the page as the cluster's DIRECT-ANSWER / DECISION-TREE node: lead with an unambiguous yes/no answer-box keyed to ownership type, follow with a side-by-side decision matrix, then forward-link OUT to the three siblings that own the depth (claim-guide = SA105 mechanics; restriction pillar = full policy + calculator; tax-relief-guide = the relief explainer). It deliberately does NOT duplicate the three-way cap walkthrough (claim-guide owns it) or the calculator (restriction pillar owns it).

---

## Current page snapshot (Stage 2 — read source markdown + frontmatter)

**Filesystem source read (2026-06-02):**
- **Word count:** ~1,018 (body). Below the cluster floor; thinnest of the four mortgage-interest pages.
- **H2 outline (7 sections):**
  1. How Section 24 Changed Mortgage Interest Relief (history + £2,000-on-£10k illustration)
  2. How the Mortgage Interest Tax Credit Works and How to Record It (4-bullet mechanic + Sarah £15k worked example + reporting bullets + MTD paragraph)
  3. Which Landlords Are Affected by Section 24? (applies-to / does-NOT-apply-to lists; includes the FHL "abolished in April 2025" line)
  4. Can Landlords Claim Any Mortgage-Related Costs? (arrangement fees, survey, legal, exit fees still deductible)
  5. Future Changes: Property Income Tax from 2027 (22/42/47 + reducer rises to 22% + no-wedge framing)
  6. Alternative Strategies for UK Landlords (H3 Incorporation, H3 Reducing Debt, H3 Portfolio Restructuring)
  7. Getting Professional Advice
- **metaTitle:** "Mortgage Interest Deductible UK Landlords 2026 | Tax Rules" (56 chars)
- **metaDescription:** "UK landlords can't fully deduct mortgage interest since Section 24. Learn how mortgage interest tax relief works in 2026 and alternatives." (137 chars)
- **h1:** "Is Mortgage Interest Deductible for UK Landlords in 2026?"
- **FAQ count (frontmatter `faqs:`):** 4 (target 10–14)
- **Outbound authority links:** 0 (no gov.uk / legislation.gov.uk / HMRC manual).
- **Internal links:** 3 (MTD April-2026 deadline page; BTL ltd-co complete guide; `/incorporation`; `what-does-a-property-accountant-do`). No links to the three mortgage-interest cluster siblings — this is a load-bearing gap, the forward-links are the differentiation mechanism.
- **Schema present:** Y (FAQPage auto-emitted from frontmatter `faqs:` via `buildBlogPostingJsonLd`). No `reviewedBy` / `reviewerCredentials` set yet.
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).
- **Pricing leak:** NONE found (clean — no fees, no client names, no soft fee comparisons). Confirmed against the Decision-E discipline carried from the birmingham reference.
- **Em-dashes in body:** NONE found.

---

## GSC angle (last 90 days) — REAL DATA from diagnosis payload

**Aggregate:** the page is **INVISIBLE** — zero clicks, zero Bing, and the GSC volume in the target set is mostly being served by OTHER URLs (see CANNIBAL note). Total target-query impressions ≈ 130 across 25 queries; the page itself currently captures effectively none of the high-value question-shaped traffic.

**Primary query:** `is mortgage interest deductible for uk landlords 2026` — **8 impr / pos 4.8** — but currently served by `landlord-tax-deductions-uk-2026-complete-list` (an UNRELATED deductions-list page). This is the single most important recovery target: a question-shaped, year-stamped, on-topic query landing on the wrong page.

**Three query bands in the target set:**
- **Band 1 — restriction-policy queries already at page 1 (pos ~9–10):** "mortgage interest relief restricted for individual landlords uk" (pos 9), "uk mortgage interest relief restricted for individual landlords" (pos 9.8), "mortgage interest relief restriction uk landlords" (pos 10), "uk landlord mortgage interest relief restriction" (pos 9.5), "uk landlord mortgage interest tax relief basic rate" (pos 10), "uk mortgage interest tax relief 2026" (pos 2), "uk landlord mortgage interest relief restriction basic rate" (pos 9). These reward a crisp restriction-mechanics summary + answer-box.
- **Band 2 — broad relief-universe queries stuck page 6–8 (pos ~54–75):** "tax relief on mortgage interest" (pos 72), "mortgage interest tax relief" (pos 66.2), "20 tax credit on mortgage interest" (pos 72.1), "mortgage interest tax relief calculator uk" (pos 66.7), "mortgage interest tax credit calculator" (pos 54), "mortgage interest tax deduction uk" (pos 44.3), etc. These are owned by the orphan legacy URL today; the rewrite should target them in body/FAQ but the realistic near-term win is Band 1 + the question-shaped Band 3.
- **Band 3 — question/comparison-shaped (the distinct intent this page must OWN):** "can landlords still claim tax relief on mortgage interest" (pos 71.3), "can i claim mortgage interest on rental property" (pos 70.5), "mortgage interest deduction for rental property" (pos 61.5), "mortgage interest on rental property" (pos 61.8), "rental income mortgage interest" (pos 66.3). Plus the adjacent "uk residential property held personally versus company tax guidance 2026 rental income mortgage interest" (15 impr / pos 12.9 — the personal-vs-company decision intent that the answer-box + decision matrix directly serves).

**Strategic conclusion:** the rewrite cannot rely on the page's own (non-existent) click history. The lever is (a) reclaiming the question-shaped primary query from the unrelated leakage page by being the single best yes/no-by-owner-type answer, (b) consolidating the page-1 Band-1 restriction queries with a crisp answer-box, and (c) serving the personal-vs-company decision intent (adjacent 15-impr query) that no sibling owns. **Realistic post-rewrite target: move from invisible to capturing the 8-impr primary query (pos 4.8 → click-through) + page-1 Band-1 consolidation within 90 days.**

**GA4 engagement signal:** none meaningful (INVISIBLE page; no traffic to read).

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: INVISIBLE.** Zero GSC clicks, zero Bing. The page's own exact headline query is being answered by an unrelated page. There is no equity to protect, so the rewrite is free to reposition aggressively. The deterministic-floor read (§16.T2 collapse guard): not a collapse candidate (REWRITE-ONLY standing rule + nothing to bury); if anything the orphaned `mortgage-interest-tax-relief-changes-landlords` equity should later be pointed INTO this page, never vice versa.

**Secondary: THIN_DEPTH.** 1,018 body words against a cluster where the claim-guide is ~3,386 and the restriction pillar ~2,019. The page is too thin to win the question-shaped intent against either gov.uk or its own better-developed siblings. But — load-bearing nuance — the answer to thinness here is NOT to duplicate the siblings' depth. It is to add a NEW layer they lack: the decision-tree / yes-or-no-by-owner-type direct answer plus a personal-vs-company decision matrix, lifting to ~2,600 words of genuinely distinct content + heavy forward-linking.

**Tertiary: CANNIBAL.** Four-page mortgage-interest cluster, all live, all in `section-24-and-tax-relief`:
1. `section-24-mortgage-interest-restriction-uk-landlords` — POLICY/MECHANICS pillar (restriction complete guide + calculator).
2. `claim-mortgage-interest-rental-property-uk-section-24` — PRACTICAL CLAIM guide (SA105 box 44, three-way cap, ITTOIA 2005 s.274A carry-forward), rewritten 2026-05-21 to gold depth.
3. `tax-relief-mortgage-interest-rented-property-guide` — the "how does tax relief work" explainer.
4. THIS page — must become the DIRECT-ANSWER / DECISION-TREE node and forward-link to the other three. Distinctiveness statement below is the spine of this brief.

**Quaternary: STRUCTURE + STALE_FACTS.** No answer-box, no decision matrix, no reference/comparison table, 4 FAQs, 0 outbound authority links. The April 2027 substance is correct (22/42/47, reducer rises to 22%, no new wedge) and already matches §4/§7 — but the page carries ZERO statute citations and its 2027 paragraph lacks the date-stamped enacted attribution. Per §7 [LOCKED], these property income rates were announced at the **Autumn Budget 2025 (26 November 2025)** and enacted by **Finance Act 2026 (Royal Assent 18 March 2026), ss.6-7** — the rewrite must NOT attribute them to the 30 October 2024 Budget (that Budget did the SDLT 5% surcharge + CGT 18/24, not the property income rates).

**Load-bearing fix sequence (ordered by ROI):**
1. **Answer-box at the very top**, keyed to ownership type: individual = NO full deduction, 20% basic-rate tax credit (rising to 22% from 6 April 2027); company = full deduction against rental profits before CT. This is the snippet-bait that reclaims the question-shaped primary query.
2. **Personal-vs-company decision matrix table** (side-by-side comparison — see Content plan). This is the CANNIBAL differentiator; no sibling has it.
3. **Reference table of the relief rate by tax year** (2026/27 vs 2027/28) — aids scanning, plain HTML, no pricing.
4. **Body lift to ~2,600 words** of distinct decision-tree content; forward-link OUT at each H2 to the sibling that owns the depth, rather than re-walking it.
5. **FAQ count 4 → 12**, each FAQ targeting a specific Band-1/Band-3 query verbatim.
6. **Add 5 verified legislation.gov.uk / gov.uk authority links** (statute spine below) — currently zero.
7. **April 2027 paragraph re-stamp**: add the §7 enacted citation (FA 2026 ss.6-7 + Sch 1, Royal Assent 18 March 2026, announced Autumn Budget 2025). Re-verify Royal Assent at write time per F-37 discipline.
8. **Tighten the FHL line** ("abolished in April 2025" → "abolished from 6 April 2025; former FHL interest now caught by S24" per §6).

---

## Distinctiveness / cannibalisation statement (the spine of this rewrite)

This page is the **DECISION-TREE / DIRECT-ANSWER node** of the mortgage-interest cluster. The intent it must own and the siblings do NOT: the yes-or-no-by-owner-type framing for the question-shaped and comparison queries ("is mortgage interest deductible", "can i claim mortgage interest on rental property", "can landlords still claim tax relief", "mortgage interest deduction for rental property", and the personal-vs-company decision query). It leads with an unambiguous answer-box, then a decision matrix, then forward-links OUT:
- → `claim-mortgage-interest-rental-property-uk-section-24` for SA105 box-44 mechanics + the three-way cap walkthrough (DO NOT duplicate that walkthrough here);
- → `section-24-mortgage-interest-restriction-uk-landlords` for full policy depth + the calculator (DO NOT add a calculator here);
- → `tax-relief-mortgage-interest-rented-property-guide` for the "how does relief work" explainer.

Per REWRITE-ONLY standing rule, **no 301 is proposed**. If anything, the orphaned `mortgage-interest-tax-relief-changes-landlands` equity should later be pointed INTO this rewritten page, not vice versa.

---

## Competitor URLs (Stage 2 — re-verify liveness at execution per §16.31)

| URL | Expected role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.which.co.uk/money/tax/income-tax/tax-on-property-and-rental-income/buy-to-let-mortgage-tax-relief-changes-explained-aHQIA2d4bjXj | Consumer-grade "changes explained" | Plain-English answer-box clarity; tapered-phase-out history framing | No owner-type decision matrix; no statute spine; no SA105 forward-link |
| https://www.simplybusiness.co.uk/knowledge/landlord-tax/what-is-section-24/ | SME "what is S24" explainer | Crisp restriction summary; worked-figure illustration | No 2027 enacted date-stamp; no personal-vs-company table; no carry-forward depth |
| https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies | Authority — HMRC worked-out method + case studies | The three-part cap method (cite, do not re-walk — claim-guide owns the walkthrough); HMRC case-study structure | gov.uk owns "how it's worked out"; we own the decision-tree + specialist application |
| https://www.gov.uk/government/publications/restricting-finance-cost-relief-for-individual-landlords/restricting-finance-cost-relief-for-individual-landlords | Authority — policy origin (FA 2015 measure) | Section 24 origin framing; "individual landlords" scope wording | Policy paper only; no decision aid; we add the owner-type matrix + 2027 enacted update |

**Competitor depth ceiling for this query class:** consumer/SME explainers run ~900–1,800 words, 0 FAQs, 0–1 statute citations, no owner-type decision matrix, and none carry the April-2027-enacted update with a date-stamped FA 2026 citation. Our ~2,600-word answer-box + decision-matrix + reference-table + 12 FAQs + 5 verified statute citations + 2027 enacted re-stamp puts us decisively best-in-class for the decision-tree intent — not catch-up.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (program-current snapshot; re-confirm timestamp at batch close per §15.3).

| Source | Slug | Overlap dimension | Resolution |
|---|---|---|---|
| Residual (own) | mortgage-interest-deductible-landlords-uk-2026 | self | REWRITE in place as decision-tree node |
| Cluster sibling (rewritten 2026-05-21) | claim-mortgage-interest-rental-property-uk-section-24 | SA105 box 44, three-way cap, s.274A carry-forward | No collision after repositioning. Forward-link OUT for mechanics; DO NOT duplicate the three-way cap walkthrough |
| Cluster sibling (pillar) | section-24-mortgage-interest-restriction-uk-landlords | Policy/mechanics pillar + calculator | No collision after repositioning. Forward-link OUT for policy depth + calculator; DO NOT add a calculator here |
| Cluster sibling (explainer) | tax-relief-mortgage-interest-rented-property-guide | "How does relief work" explainer | No collision after repositioning. Forward-link OUT for the relief explainer |
| Leakage page (live, on disk) | landlord-tax-deductions-uk-2026-complete-list | Currently SERVES this page's headline query (8 impr / pos 4.8) | Reclaim intent via answer-box keyed to the question-shaped query; this rewrite should out-rank it for the mortgage-specific question. Note for cluster audit: the deductions-list page should NOT be the canonical answer to a mortgage-interest-deductibility question |
| Orphan (redirected, NO markdown on disk) | mortgage-interest-tax-relief-changes-landlords | Owns broad "mortgage interest tax relief" universe (~129 impr / 54 queries) | Per REWRITE-ONLY rule, no 301 proposed. LATER: point the orphan's equity INTO this rewritten page, not vice versa. Flag for manager, do not action in this brief |

**Conclusion:** REWRITE with sharp differentiation. No REDIRECT-PROPOSED (REWRITE-ONLY standing rule + INVISIBLE page carries no equity). Distinctiveness is enforced by the answer-box + decision matrix + forward-link-out architecture above.

---

## Closest existing pages (Stage 2 — internal-link targets within the live corpus)

Internal-link partners (to and from this page). All paths use `/blog/section-24-and-tax-relief/<slug>` unless noted:

- **Cluster siblings (forward-link OUT — the differentiation mechanism):**
  - `claim-mortgage-interest-rental-property-uk-section-24` — link from the "how do I actually claim it" moment (SA105 box 44, three-way cap).
  - `section-24-mortgage-interest-restriction-uk-landlords` — link from the policy/mechanics + "want the full restriction guide and calculator" moment.
  - `tax-relief-mortgage-interest-rented-property-guide` — link from the "how does the relief actually work" explainer moment.
- **2027 rates context:**
  - `2027-property-tax-rates-section-24-relief-uk-landlords` — forward-link from the April-2027 section.
  - `section-24-higher-rate-taxpayers-changes-2027` (cluster) — optional forward-link for the higher-rate wedge.
- **Incorporation / personal-vs-company decision (the matrix payoff):**
  - `buy-to-let-limited-company-complete-guide-uk` (`/blog/incorporation-and-company-structures/`) — link from the decision matrix "company route" row.
  - `2027-tax-rates-incorporation-decision-uk-landlords` — link from the decision-matrix conclusion.
- **MTD:**
  - `making-tax-digital-landlords-april-2026-deadline` (`/blog/making-tax-digital-mtd/`) — keep the existing MTD reference (thresholds match §3/§19; keep).
- **Service:**
  - `what-does-a-property-accountant-do` (`/blog/property-accountant-services/`) — keep as the soft handoff.

---

## House-position references (Stage 1)

- **§4 Section 24 — finance cost restriction** [LOCKED]: the spine. NOT deducted from rental profit; 20% basic-rate tax credit; **three-part cap** = lower of (1) 20% of finance costs, (2) 20% of residential rental profit before finance-cost deduction, (3) 20% of total income above the personal allowance; un-credited portion carries forward indefinitely; applies to individuals/partnerships/trusts, NOT companies; FHL caught from 6 April 2025 abolition; from 2027/28 the reducer is given at the **22%** property basic rate (FA 2026 Sch 1 amends ITTOIA 2005 ss.274AA/274C + ITA 2007 s.399B). **Reference, do not re-walk** the three-part cap (claim-guide owns that walkthrough); state the cap exists and forward-link.
- **§7 April 2027 property income tax surcharge** [LOCKED — re-verify Royal Assent at write time per F-37]: rates 22/42/47 for 2027/28 (England, Wales and NI; only Scotland carved out); reducer rises 20%→22% in step; **no new wedge** for basic-rate; higher-rate wedge stays 20pp (42−22), additional 25pp (47−22). Announced **Autumn Budget 2025 (26 November 2025)**, enacted **FA 2026 (Royal Assent 18 March 2026), ss.6-7**. Do NOT attribute to 30 October 2024 Budget.
- **§6 FHL abolition transition** [LOCKED]: FHL abolished **from 6 April 2025**; former FHL interest now caught by S24 under standard residential let rules. Tighten the source's "abolished in April 2025" line to this.
- **§3 / §19 MTD for ITSA** [LOCKED]: thresholds £50k (6 Apr 2026) / £30k (6 Apr 2027) / £20k (6 Apr 2028) — the source already states these correctly; KEEP.

---

## House-position conflict flag (Stage 2)

**No hard conflict** — the published page's substance already matches §4 and §7 (correct rates, correct reducer-rises-to-22% framing, correct no-wedge consequence). Two soft `STALE_FACTS` items to fix at rewrite, both in the §16.27/§16.30 Bill-vs-enacted family:
1. **Date-stamp gap.** The 2027 section asserts the rates and the FA 2026 Sch 1 reducer rise but does NOT carry the announcement/enactment date-stamp. Add: announced Autumn Budget 2025 (26 November 2025), enacted FA 2026 (Royal Assent 18 March 2026), ss.6-7. Re-verify at write time (F-37).
2. **Zero statute citations.** A tax-deductibility decision page with no legislation.gov.uk anchors is a §16.T1 deterministic-floor weakness (statute content can be amended even when a URL is live — F-8). Add the spine below.

Do-not-write guardrails (per §4): never write "mortgage interest is 100% deductible" (only companies), "S24 is repealed", or "the credit stays at 20% in 2027/28" (it rises to 22%), or "a new basic-rate wedge opens in 2027/28" (it does not).

Flag to `track2_site_wide_flags.md` as **F-NN | 2026-06-02 | MEDIUM | mortgage-interest-deductible-landlords-uk-2026 | STALE_FACTS + STRUCTURE | 2027 section lacks date-stamped FA 2026 ss.6-7 / Sch 1 enacted citation (announced Autumn Budget 2025, Royal Assent 18 March 2026); zero outbound statute citations on a deductibility decision page. Re-verify Royal Assent at write time per F-37.**

---

## Authority links worth considering (Stage 2 — verify all at write time per §16.31 + F-37)

| URL | Verification at write time | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2005/5/section/272A | Confirm operative — "Cash basis: no deduction for finance costs" / no-deduction anchor for residential property businesses (ITTOIA 2005 s.272A) | Statutory anchor for "interest is NOT deducted from profit" |
| https://www.legislation.gov.uk/ukpga/2005/5/section/274A | Confirm operative — the finance-cost tax reducer mechanic (ITTOIA 2005 s.274A) | The 20% (rising 22%) basic-rate tax credit |
| https://www.legislation.gov.uk/ukpga/2005/5/section/274AA | Confirm operative + check FA 2026 Sch 1 amendment landed — reducer calculation / cap (s.274AA) | Three-part cap + the 22% rate from 2027/28 |
| https://www.legislation.gov.uk/ukpga/2005/5/section/274C | Confirm operative + FA 2026 Sch 1 amendment — carry-forward of unrelieved finance costs (s.274C) | Indefinite carry-forward of un-credited portion |
| https://www.legislation.gov.uk/ukpga/2015/11/section/24 | Confirm — Section 24 Finance Act 2015 (origin of the restriction; inserts the ITTOIA reducer regime, phased 2017–2020) | Section 24 origin |
| https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies | Confirm 200 + content | HMRC "how it's worked out" cross-reference (cite, do not re-walk) |
| Finance Act 2026 ss.6-7 + Sch 1 — exact legislation.gov.uk path | **Verify Royal Assent 18 March 2026 + section numbers at write time (F-37 Bill-vs-enacted discipline)** | 2027/28 rates + reducer-at-22% enacted citation |

**(Execution session cites 5 in body — prefer s.272A, s.274A/s.274AA/s.274C, FA 2015 s.24, and the FA 2026 anchor; gov.uk "how it's worked out" as the authority cross-link.)**

---

## Content plan — section-by-section to ~2,600 words

Target: **~2,600 body words**, 11–12 H2s, 12 FAQs, 1 answer-box, 1 decision/comparison table, 1 reference table, 2 inline `<aside>` CTAs, 5 outbound authority links. Forward-link to a sibling at each depth-handoff moment rather than re-walking the sibling's content.

1. **Answer-box (above the first H2)** — direct yes/no keyed to ownership type. ~120 words. "Individual landlord: NO, you cannot deduct mortgage interest from rental profit since Section 24 took full effect from April 2020; you get a 20% basic-rate tax credit instead (rising to 22% from 6 April 2027). Limited company: YES, interest is deducted in full against rental profits before corporation tax." Serves the primary query verbatim.
2. **H2 — The short answer: is mortgage interest deductible? (by owner type)** — expand the answer-box into 2 short paragraphs + the **decision matrix table** (below). ~280 words. Serves Band-3 question queries.
3. **H2 — How Section 24 changed the rules (2017–2020 phase-out)** — history, the pre-2017 full-deduction position, the tapered phase-out, FA 2015 s.24 origin (cite). ~250 words.
4. **H2 — What individual landlords get instead: the 20% basic-rate tax credit** — the credit mechanic; STATE the three-part cap exists (lower of three figures) and that un-credited amounts carry forward, then **forward-link to the claim-guide** for the SA105 box-44 walkthrough. Cite s.274A / s.274AA / s.274C. ~280 words. **Inline `<aside>` CTA #1** after this section.
5. **H2 — Why companies can still deduct mortgage interest in full** — corporate treatment; interest as a normal business expense pre-CT; sets up the matrix payoff. Forward-link to BTL ltd-co guide. ~220 words.
6. **H2 — The relief rate by tax year (2026/27 vs 2027/28)** — the **reference table** (below) + the no-wedge framing per §7; announced Autumn Budget 2025, enacted FA 2026 ss.6-7 + Sch 1 (Royal Assent 18 March 2026, re-verify). Forward-link to `2027-property-tax-rates-section-24-relief-uk-landlords`. ~260 words.
7. **H2 — Which landlords does Section 24 apply to?** — applies-to / does-NOT-apply-to lists; tighten the FHL line per §6 (abolished from 6 April 2025; former FHL interest now caught). ~220 words.
8. **H2 — Mortgage costs you CAN still deduct in full** — arrangement/broker fees, lender survey, legal fees, exit fees (these are not finance-cost-restricted; they are allowable expenses). ~200 words.
9. **H2 — Personal vs company: which route is more tax-efficient?** — read the decision matrix back as prose; the SDLT/CGT-on-transfer + profit-extraction caveats (no numbers that imply pricing); forward-link to `2027-tax-rates-incorporation-decision-uk-landlords`. ~260 words. **Inline `<aside>` CTA #2** after this section.
10. **H2 — Recording it correctly + Making Tax Digital** — report gross profit before interest, claim the credit separately; MTD thresholds £50k/£30k/£20k (keep, §3/§19); forward-link to the MTD deadline page. ~200 words.
11. **H2 — Getting specialist advice** — soft handoff; anonymised framing only (no client names, no fees). ~150 words.
12. **FAQ block (12)** — see Query-coverage plan for verbatim mapping.

### TABLE 1 (required — comparison/decision table): "Mortgage interest: individual landlord vs limited company"

Plain HTML `<table>`, no pricing, in H2 #2.

| Dimension | Individual landlord | Limited company |
|---|---|---|
| Interest deducted from rental profit? | No (since April 2020) | Yes, in full before tax |
| Relief mechanism | 20% basic-rate tax credit (rising to 22% from 6 April 2027) | Ordinary deductible expense |
| Tax the relief reduces | Income tax | Corporation tax |
| Three-part cap on relief? | Yes (lower of three figures; excess carries forward) | No cap on the deduction |
| Higher-rate landlord wedge? | Yes — relief well below 40%/42% rate | No wedge |
| Governing rule | ITTOIA 2005 s.274A (S24 / FA 2015) | Corporation Tax loan-relationship / property-business rules |

### TABLE 2 (required — reference/rates table): "Finance-cost relief rate by tax year"

Plain HTML `<table>`, no pricing, in H2 #6.

| Tax year | Property income basic rate | S24 finance-cost reducer rate | New wedge for basic-rate landlord? |
|---|---|---|---|
| 2026/27 | 20% (standard rates 20/40/45) | 20% | No |
| 2027/28 onwards (England, Wales, NI) | 22% (rates 22/42/47) | 22% (FA 2026 Sch 1) | No — reducer tracks the 22% rate |

---

## Query-coverage plan

One row per `target_queries[]` item; each query assigned exactly once to where it is served.

| Query | source | impr | pos | served-in |
|---|---|---:|---:|---|
| is mortgage interest deductible for uk landlords 2026 | gsc | 8 | 4.8 | metaTitle + H1 + Answer-box |
| tax relief on mortgage interest | gsc | 9 | 72 | H2#3 |
| mortgage interest tax relief | gsc | 8 | 66.2 | metaDescription |
| 20 tax credit on mortgage interest | gsc | 7 | 72.1 | H2#4 |
| tax relief on mortgage interest on rented property | gsc | 6 | 71.8 | H2#7 |
| mortgage interest tax relief calculator uk | gsc | 5 | 66.7 | FAQ#11 |
| mortgage interest relief restricted for individual landlords uk | gsc | 5 | 9 | H2#2 |
| can landlords still claim tax relief on mortgage interest | gsc | 4 | 71.3 | FAQ#1 |
| landlord mortgage interest tax relief in 2020-21 | gsc | 3 | 74.7 | FAQ#3 |
| rental income mortgage interest | gsc | 3 | 66.3 | H2#10 |
| mortgage interest on rental property | gsc | 3 | 61.8 | FAQ#2 |
| mortgage interest relief | gsc | 3 | 72.5 | FAQ#4 |
| can i claim mortgage interest on rental property | gsc | 3 | 70.5 | FAQ#5 |
| mortgage interest deduction for rental property | gsc | 3 | 61.5 | FAQ#6 |
| mortgage interest tax credit calculator | gsc | 3 | 54 | FAQ#11 (calculator FAQ, points to pillar calculator) |
| mortgage interest tax deduction uk | gsc | 3 | 44.3 | FAQ#7 |
| uk mortgage interest relief restricted for individual landlords | gsc | 3 | 9.8 | H2#2 (restriction summary) |
| mortgage interest relief restriction uk landlords | gsc | 2 | 10 | FAQ#8 |
| tax relief mortgage interest | gsc | 2 | 66.5 | H2#4 |
| uk landlord mortgage interest relief restriction | gsc | 2 | 9.5 | H2#7 |
| uk landlord mortgage interest tax relief basic rate | gsc | 1 | 10 | FAQ#9 |
| uk mortgage interest relief restricted for landlords | gsc | 1 | 10 | FAQ#8 |
| uk mortgage interest tax relief 2026 | gsc | 1 | 2 | H1 |
| uk landlord mortgage interest relief restriction basic rate | gsc | 1 | 9 | FAQ#9 |
| uk residential property held personally versus company tax guidance 2026 rental income mortgage interest | adjacent | 15 | 12.9 | H2#9 + Decision matrix (Table 1) |

---

## Meta plan

- **metaTitle (<=62):** `Is Mortgage Interest Deductible? UK Landlords 2026` (50 chars) — leads with the question-shaped primary query verbatim, drops the prior "Tax Rules" filler.
- **metaDescription (<=158):** `Is mortgage interest deductible for UK landlords in 2026? No for individuals (20% credit, rising to 22% in 2027), yes for companies. Owner-type decision guide.` (157 chars)
- **h1:** `Is Mortgage Interest Deductible for UK Landlords in 2026?` (kept — already exact-match to the primary query and the page's strongest asset).
- **summary (frontmatter):** `UK individual landlords cannot deduct mortgage interest from rental profit since Section 24 took full effect in April 2020; they receive a basic-rate tax credit (20%, rising to 22% from 6 April 2027 under Finance Act 2026). Limited companies still deduct interest in full. This guide answers the yes/no question by owner type and points you to the detailed claim and policy guides.`

---

## Schema plan

- **reviewer name (`reviewedBy`):** `ICAEW Qualified Senior Reviewer` (the canonical real reviewer used across the Property corpus).
- **reviewer credentials (`reviewerCredentials`):** `Chartered Tax Adviser (CTA), Landlord Tax Specialist` (matches the S24/landlord topic; the CTA-landlord credential is already in use on `/blog/.../a-complete-guide-to-periodic-tenancy` and peers).
- **`reviewedAt` / dateModified:** `2026-05-30`.
- **howTo:** `false` — this is a decision/answer page, not a step-by-step. The step-by-step SA105 claim mechanics live on the claim-guide sibling (which owns HowTo if any).
- **JSON-LD blocks emitted:** `Article` (BlogPosting via `buildBlogPostingJsonLd`, with `author` + `reviewedBy` once the frontmatter fields are set) + `FAQPage` (auto-emitted from the 12-item frontmatter `faqs:` array). NO `HowTo` block.

---

## Universal rules — inherited from parent program (do not restate)

Per TRACK2_PROGRAM.md §4 section 13: voice rules (NO em-dashes; anonymised social proof only; NO pricing/fees; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1–3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind classes in body), FAQs + schema (frontmatter `faqs:` array, target 10–14; FAQPage auto-emitted, never hand-add FAQ schema in body), anti-templating discipline, six-check verification, statute-citation discipline (F-8: statute content can be amended even when the URL is live), and §16 lessons (esp. §16.18 reasoning-first, §16.31 URL liveness, §16.27/§16.30/F-37 Bill-vs-enacted). HARD RULES re-stated for this brief because they are load-bearing: **NO pricing/fees on-page; NO real client names; anonymised social proof only (Decision E: even soft "£800–£1,500 general-market" fee comparisons are a pricing-leak — none currently present, keep it that way); NO em-dashes; every statute verified at write time including FA 2026 Royal Assent (F-37).**

---

## 19-step workflow — inherited from parent program with Track 2 deltas

Inherits the full 19-step legacy-rewrite workflow (NETNEW §7 + TRACK2_PROGRAM §4 section 14). Track-2-specific notes for this page:
1. Read `house_positions.md` §4, §7, §6, §3/§19 in full at session start.
2. Claim this brief in `track2_page_tracker.md` (mark 🟡 stage2_drafting).
3. Read this brief end-to-end.
4. **Re-verify FA 2026 Royal Assent (18 March 2026) + ss.6-7 + Sch 1 section numbers + the four ITTOIA section URLs against legislation.gov.uk** (load-bearing pre-rewrite step per F-37 / §16.T1 deterministic floor).
5. Re-fetch the 4 competitor URLs to confirm liveness (httpx + proper User-Agent).
6. Read the current source file in full.
7. Read the 3 cluster siblings for the forward-link handoffs (claim-guide, restriction pillar, tax-relief-guide) so the rewrite references rather than duplicates them.
8. Plan rewrite outline per the Content plan: 11–12 H2s, ~2,600 words, 12 FAQs, answer-box + 2 tables.
9. **Rewrite markdown at the existing path** (NOT a new file). Preserve slug + canonical + category. Update `dateModified`/`reviewedAt` to 2026-05-30. Set `reviewedBy` + `reviewerCredentials`. Apply the Meta plan.
10. Run site build: `cd Property/web && npm run build`. Must pass.
11. Six checks: FAQ schema count = frontmatter `faqs:` length (12); em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62; metaDescription ≤ 158; all internal links resolve; pricing-check (`£[0-9]` returns 0 fee-discussion matches).
12. Confirm no redirect needed (none — REWRITE-ONLY; slug kept).
13. Update/insert `monitored_pages` Supabase row (INVISIBLE baseline → 180-day window per F-11).
14. Commit on `main`.
15–19. Tracker → flags → §3 heartbeat → discovery log → next page.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §4 Section 24 (20% credit, three-part cap referenced not re-walked, FHL caught from 6 Apr 2025): __
- §7 April 2027 — Royal Assent re-verified at write: __ enacted FA 2026 ss.6-7 + Sch 1 (assert with citation) / __ (if status changed) hedge
- §6 FHL line tightened: __
- §3/§19 MTD thresholds kept correct: __

### Comparison: before vs after
- Word count: 1,018 → __ (target ~2,600)
- H2 count: 7 → __ (target 11–12)
- FAQ count: 4 → __ (target 12)
- Answer-box: 0 → __ (1)
- Tables: 0 → __ (2: decision matrix + relief-rate reference)
- Authority links: 0 → __ (5)
- Inline CTAs: 0 → __ (2)
- Forward-links to cluster siblings: 0 → __ (3)

### Flags raised
- F-NN (carried from brief): STALE_FACTS date-stamp + zero-citations — resolved: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
