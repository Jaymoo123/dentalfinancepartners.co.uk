# Track 2 brief: cgt-main-residence-election-two-properties

**Site:** property
**Brief type:** Legacy rewrite (Track 2A, Batch 2 Sub-bucket C, page B2-C2)
**Source markdown path:** `Property/web/content/blog/cgt-main-residence-election-two-properties.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/cgt-main-residence-election-two-properties
**Stage 1 priority:** **M** (page covers a load-bearing CGT mechanic but with TWO stale-figure errors and a structurally-confused framing — needs rewrite-with-differentiator)
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24
**Cannibalisation status:** REWRITE-with-differentiator (clean against shipped Wave 1-6 net-new + 2026-05-21 rewrites; intra-batch coordination with B2-B1 RESOLVED — see Manager pre-decisions below)

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `cgt-main-residence-election-two-properties`. The slug carries the topical intent (`cgt-main-residence-election` + `two-properties`) and matches the single-owner-with-2-residences query class. No redirect proposed.
- **Category:** `capital-gains-tax` (kept).
- **Gap-mode tag:** `DEPTH` (primary — page misses the variation-of-nomination mechanic, the "flag" technique, the deemed-second-residence-via-PPR-election point, the qualifying-residence test, the interaction with PRR's deemed-occupation periods) + `STALE_FIGURES` (secondary — pre-2020 Lettings Relief framing presented as live + wrong "4 years employment elsewhere in the UK" framing presented in isolation without the 3-years-any-reason or final-9-months mechanics) + `STRUCTURE` (tertiary — 4 FAQs, 0 statute citations in body, no rates table, missing reviewer frontmatter).
- **"Why this rewrite" angle:** the source page predates the post-FA-1996 statutory reorganisation of the joint-signing rule (s.222(5)(b) joint-signing was repealed by FA 1996; the joint-signing rule is now in s.222(6)(a) per legislation.gov.uk verification 2026-05-24 — the source page cites "Section 222(5) TCGA 1992" generally without disambiguating sub-sections). More critically, the page asserts post-2020 Lettings Relief as if the pre-2020 £40,000-on-letting-after-moving-out regime is still alive ("you may qualify for letting relief if you rent out your elected main residence ... up to £40,000 of additional CGT relief, subject to certain conditions") — the §5 LOCKED position is that Lettings Relief was restricted from 6 April 2020 to shared-occupation only; for the typical landlord-with-2-properties reader (who elects a former main residence then lets it after moving out), Lettings Relief is NOT available. The page also asserts "Up to 4 years of employment elsewhere in the UK" as a deemed-occupation extension without naming the 3-years-any-reason or the final-9-months automatic relief, which are equally load-bearing for the elected-main-residence + later-let scenario. Rewrite must (a) anchor on the post-FA-1996 statutory structure (s.222(5)(a) for the election + s.222(6)(a) for the joint-signing for couples) with verbatim citations, (b) make the single-owner-with-2-residences scenario load-bearing (this is the page's distinct angle vs Wave 5 C7's couples-with-2-residences angle), (c) cover the variation mechanic + the "flag" technique (variation of nomination to capture the final-9-months on a property the owner has briefly nominated), (d) correct the Lettings Relief framing per §5 LOCKED, (e) integrate the deemed-occupation periods properly (final-9-months + 3-years-any-reason + 4-years-UK-work + employment-abroad), (f) define the qualifying-residence test (HMRC's working position: a "residence" requires actual occupation as a home, even if intermittent; never-occupied BTL cannot be elected).
- **INTRA-BATCH COORDINATION RESOLVED:** read Sub-bucket B's tracker row for B2-B1 (`principal-private-residence-relief-landlords`) at 2026-05-24 PM. B2-B1 is positioned as the general-PRR-survey + post-2020-Lettings-Relief carve-out page. Wave 5 C7 (`cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics`, SHIPPED 2026-05-23) is positioned as the joint-ownership / couples / one-residence-per-couple s.222(6) page; it already covers s.222(5)(a) election + 2-year deadline + variation in the JOINT-OWNERSHIP context. B2-C2 (this brief) owns the SINGLE-owner-with-2-residences scenario (landlord living in property A, owning property B that they sometimes occupy — e.g., second home / let-occasionally / use-during-renovation pattern). The differentiator is clean: W5 C7 = couples; B2-B1 = general PRR survey; B2-C2 = single-owner-with-2-properties election mechanics. **REWRITE with explicit differentiator chosen.** No Q&A to Sub-bucket B required (scope decision is unambiguous on the differentiator).

---

## Current page snapshot (Stage 2 — source markdown + frontmatter read)

**Filesystem source read (2026-05-24):**
- Frontmatter `date`: 2026-04-10 — bumped at a meta-rewrite pass without content refresh.
- `dateModified`: absent.
- `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent.
- `metaTitle`: "CGT Main Residence Election Two Properties | UK Tax Guide 2026" (62 chars — at limit, OK).
- `metaDescription`: "Learn how to nominate main residence for CGT when you own two properties. Deadlines, election process, and tax implications explained for UK landlords." (153 chars — OK).
- `faqs`: 4 entries (target 12-14).
- `h1`: "CGT Main Residence Election for Landlords with Two Properties: Complete Guide" (good — landlord-specific).
- Body word count: ~1,400 (target 2,800-3,200).
- H2 sections: 8 (What Is a CGT Main Residence Election; Eligibility, Timing + How to Make; Changing Your Election; Tax Implications + Strategic Planning; Partial Relief, Letting Relief + Deemed Occupation; Common Mistakes; Special Considerations for Landlords; Record Keeping; Professional Advice). Plus 6 H3s.
- Internal links: 5 (PPR landlords, Section 24 complete guide, rental income tax, BTL ltdco complete guide, property accountant services).
- Outbound authority links: **0** (no gov.uk / legislation.gov.uk / HMRC manual cite in body).
- Worked examples: 1 (Sarah with two properties, £200k saved vs £150k saved by electing higher-gain property).
- Statute cites in body: "Section 222(5) TCGA 1992" mentioned once in the sample election letter (line 50), without disambiguating sub-sections (s.222(5)(a) is the election; s.222(6)(a) is the joint-signing for couples). s.223 deemed-occupation periods NOT named. s.222(6) one-residence-per-couple NOT named.
- **Substantive content errors (document and correct at rewrite):**
  - **Error 1 (line 78, "Partial Relief, Letting Relief and Deemed Occupation"):** "you may qualify for letting relief if you rent out your elected main residence. This can provide up to £40,000 of additional CGT relief, subject to certain conditions". This is the pre-April-2020 Lettings Relief framing. The §5 LOCKED position (verified gov.uk HS283 2026-05-24): Lettings Relief was restricted from 6 April 2020 to shared-occupation only — for the elected-main-residence + later-let scenario the page describes (landlord elects a property, then lets it after moving out), Lettings Relief is NOT available because the owner does not share occupation with the tenant. This is the same F-9 stale-figure pattern caught on Batch 1 Sub-bucket A's reduce-cgt-property-disposal page; the elected-main-residence Lettings Relief framing here is identically wrong. Cross-residual cluster pattern confirmed.
  - **Error 2 (line 83, "Up to 4 years of employment elsewhere in the UK"):** correct per HMRC HS283 (verified 2026-05-24) but presented in isolation. The actual deemed-occupation pattern under TCGA 1992 s.223(3) is: (a) the final 9 months always count regardless of occupation; (b) up to 3 years of any-reason absence (provided owner reoccupies after); (c) up to 4 years of UK-work-relocation absence; (d) any period of employment abroad. The source page lists 4-years-UK-work, the final-9-months, and "Periods of employment abroad" + "Periods when prevented from occupying due to work conditions" but MISSES the 3-years-any-reason rule entirely. For a single-owner-with-2-residences scenario this is load-bearing: a landlord who elects property B and lives in it for a couple of years, then moves elsewhere for a sabbatical or family reason (not work) for 2 years before selling property B will rely on the 3-years-any-reason rule for the absence period.
  - **Error 3 (line 41, "two years from the date you first have two residences"):** correct rule per s.222(5)(a) — but the page elsewhere (line 53) asserts "the change only takes effect from the date of your new election. You cannot backdate elections" which is incomplete. Per s.222(5)(a) wording (verified legislation.gov.uk 2026-05-24) + CG64485 / CG64500 + HMRC's working position, a VARIATION of an existing nomination can apply to periods beginning no earlier than 2 years before the further notice. This is the "flag" technique — vary the nomination briefly to capture the final-9-months on a property the owner has had as a residence at some point. The page's "you cannot backdate elections" framing is too restrictive and misses the variation mechanic that is the actual planning lever for the elected-main-residence + later-let scenario.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-24 PM via `python -m optimisation_engine.track2.pull_page_data --slug cgt-main-residence-election-two-properties --days 90`.**

**Aggregate:** **ZERO GSC rows** for this slug in the 90-day window. ZERO `competitor_serps` rows; ZERO `page_content_map` rows (never parsed); ZERO `competitor_gap_reports`.

**Pattern read:** the page exists and is indexed but **gets sub-threshold daily traffic** so it never crosses GSC's per-day reporting floor. This is now the 8th invisible page among the first 14 Track 2A residual pages investigated (F-11 cross-residual pattern confirmed).

### GA4 engagement signal (real data from `ga4_page_data`)

- ZERO rows. Page never received enough sessions in the window to register in GA4 aggregation.

**Implication for the brief:** no engagement signal to triangulate. Rewrite proceeds on content-correctness + cluster-positioning + statutory-anchor logic. Post-rewrite, monitor via `monitored_pages` for whether the content fix lifts the page across the GSC reporting floor; this is a moderately niche query class (single-owner with 2 properties wanting to nominate) so expected lift is modest (2-5 clicks / 90 days achievable; not a high-volume page).

**Strategic conclusion:** the rewrite cannot ground gap-mode diagnosis in query-pattern data. The DEPTH + STALE_FIGURES + STRUCTURE diagnosis above is built from (i) source-page content review (3 verified errors), (ii) authority-page verification (legislation.gov.uk s.222 + HMRC HS283 + CG64485 — verified 2026-05-24), (iii) house-position alignment (§5 + §24.5 + cross-reference Wave 5 C7), (iv) competitor coverage signals (below).

**Note on the intra-batch coordination:** the scope-decision (REWRITE-with-differentiator vs REDIRECT into B2-B1) does NOT turn on this brief's thin GSC signal. The justification for REWRITE is the distinct intent — the page covers the single-owner-with-2-residences scenario which is genuinely different from B2-B1's general-PRR-survey angle and Wave 5 C7's couples angle. Even with zero GSC, the page is the only on-site source for the single-owner election scenario; collapsing it into B2-B1 would orphan that intent.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 source-page review)

**Primary: DEPTH.** The page covers the election existence + the 2-year deadline + a worked example, but misses every mechanic that determines whether the election is actually useful. Missing or under-developed: the variation mechanic + the "flag" technique (the actual planning lever); the qualifying-residence test (HMRC's working position that a "residence" requires actual occupation as a home, even if intermittent — never-occupied BTL cannot be elected; brief / occasional / weekends-only occupation is borderline and fact-sensitive per Goodwin v Curtis); the deemed-occupation periods integration (final-9-months + 3-years-any-reason + 4-years-UK-work + employment-abroad as a connected sequence, not isolated bullet points); the s.222(6)(a) couples joint-signing rule cross-reference (forward-link to Wave 5 C7 for couples; this page is for singles); the interaction between the s.222(5) election and the s.222 "two-or-more residences" test (HMRC may challenge whether the second property is really a "residence" — the election only works if HMRC accepts both are residences); the deemed-second-residence point (where an owner takes the lease of a furnished holiday let for 12+ months that becomes a "residence" within s.222 by occupation pattern, opening a brief flag opportunity); the post-disposal record-keeping for the elected period (the election effective date must be evidenced); the rate-table at top showing what PRR actually saves (a fully-relieved property saves £X at 24%; a partially-relieved property saves £X × qualifying-occupation-fraction; this is the actual reader payoff).

**Secondary: STALE_FIGURES.** Two identified factual errors above (the pre-2020 Lettings Relief framing presented as live, the missing 3-years-any-reason deemed-occupation rule). These are wrong content that gives reader-facing tax-planning advice that fails post-April-2020 reform. The Lettings Relief error in particular is high-stakes because it changes the arithmetic of the elected-main-residence + later-let scenario: a reader who expects £40k of Lettings Relief on top of PRR will materially under-estimate their CGT liability on disposal.

**Tertiary: STRUCTURE.** 4 FAQs (target 12-14); 0 outbound authority cites in body; no rates table at top; missing the Wave 2+ reviewer-byline frontmatter; missing `dateModified`; only 1 worked example (target 3-4 covering the canonical single-owner scenarios — second-home + occasional-use + post-let-pre-sale + variation-of-nomination); no §"What to do this week" practical action block.

**Load-bearing fix sequence (ordered by reader-impact ROI):**

1. **Excise the 2 factual errors** and replace with verified post-April-2020 framework: (a) Lettings Relief restricted to shared-occupation per §5 LOCKED — for the elected-main-residence + later-let scenario the page describes, the relief is NOT available; replace with explicit note that final-9-months is the actual relief mechanism for the post-move-out period; (b) deemed-occupation periods integrated: final-9-months (auto, no conditions) + 3-years-any-reason (must reoccupy after) + 4-years-UK-work-relocation (must reoccupy after) + any period of employment abroad (must reoccupy after — strict). This is the load-bearing fix.
2. **Add the variation-of-nomination section as a new H2** — this is the actual planning lever for the elected-main-residence + later-let scenario. Cover the 2-years-before-further-notice rule, the "flag" technique (vary the nomination briefly to capture the final-9-months on a property), the HMRC anti-avoidance posture (Sansom v Peay-style challenges to manifestly-tax-motivated short flags), the practical mechanics (notify HMRC in writing, retain copy + signed-and-dated original).
3. **Add the qualifying-residence test as a new H2** — HMRC's working position per CG64427 et seq.: a "residence" requires actual occupation as a home, even if intermittent; case law (Goodwin v Curtis [1998] STC 475 + Moore v HMRC + Frosh v HMRC) for the fact-sensitive test; the never-occupied-BTL exclusion (cannot be elected even if owned for years).
4. **Add 3 new worked examples**: (i) Single landlord with main residence + holiday-cottage second-home occupied 8 weeks / year — does the election work? (Likely yes if HMRC accepts the cottage as a residence; election may be useful if cottage has higher £ / year gain than main residence.) (ii) Landlord who elects property B as main residence, lives in it 3 years, moves out, lets it for 5 years, sells — what relief is available? (Final-9-months + nominated-occupation-period; NO Lettings Relief; partial PRR fraction.) (iii) Landlord with main residence + BTL where they spent 6 months living during renovation pre-let — does the BTL qualify as a residence for s.222 purposes? (Borderline; depends on intention + facts; cite Goodwin v Curtis.)
5. **Body lift to 2,800-3,200 words** with the above 3 new sections + statute anchors + worked examples.
6. **FAQ count 4 → 12-14** with each FAQ targeting a specific reader question (when does the 2-year clock start? what if I miss it? can I vary the nomination? does a BTL qualify? what about a holiday cottage? how is PRR calculated for the elected property? what's the difference between this and PRR for couples? etc).
7. **Authority links: 5-7 verified citations** (legislation.gov.uk s.222 + s.223 + s.224; HMRC HS283 helpsheet; HMRC CG64485 + CG64500 + CG64427; gov.uk/government/publications/private-residence-relief).
8. **Frontmatter hygiene:** add `dateModified`, `reviewedBy`, `reviewerCredentials`, `reviewedAt`. Trim meta description as needed. Bump `date` to actual write date.
9. **Rates table at top** showing PRR fraction examples (full-relief save £X at 24% / partial-relief save £X × fraction at 24% / deemed-occupation extensions list).
10. **Explicit cross-link disambiguation** at top of page: "Looking for PRR for couples / spouses? See [Wave 5 C7]. Looking for general PRR theory? See [B2-B1 PRR for landlords]. You are at the single-owner-with-2-residences election page."

---

## Competitor URLs (Stage 2 — verified live 2026-05-24 via WebFetch)

| URL | Status | Word count | FAQs | Statute cites | Coverage signals | What to borrow / differentiate |
|---|---|---|---|---|---|---|
| https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2024 | 200 OK; content verified 2026-05-24 | ~3,500 | 0 | s.222 + s.223 + s.224 implied | HS283 covers s.222(5) election (2-year window verbatim), deemed-occupation periods (final-9-months + employment-abroad + 4-years-UK-work + 3-years-any-reason), Lettings Relief shared-occupation restriction post-April-2020. Verified verbatim quote: "You can nominate which residence is to be treated as your main residence for any period. Your nomination must be made within 2 years of the date you first have a particular combination of residences." | **Borrow:** the verbatim 2-year-window quote, the deemed-occupation periods structure. **Differentiate:** translate from helpsheet plain-English into landlord-specific worked examples HS283 doesn't have; add the variation-of-nomination "flag" technique HS283 doesn't cover. |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64485 | 200 OK; content verified 2026-05-24 | ~700 (single manual page) | 0 | s.222(5) named | Confirms "S222(5) TCGA92 gives an individual the right to choose which of his or her two or more residences is to be treated as the main residence for private residence relief purposes" and that "an individual is not obliged to nominate the residence which is factually his or her main residence" — the latter is load-bearing for the planning angle. | **Borrow:** the "not-obliged-to-nominate-factual-main-residence" point as the planning hook. **Differentiate:** combine with CG64500 variation mechanics + worked examples + HMRC anti-avoidance posture; CG64485 alone doesn't give the reader the full planning lever. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | 200 OK + content verified 2026-05-24 (per legislation.gov.uk amendment table) | n/a | n/a | s.222(5)(a) election + s.222(6)(a) joint-signing for couples (post-FA-1996; original s.222(5)(b) joint-signing was repealed by FA 1996); s.222(6) one-residence-per-couple | Statutory anchor for the election + the disambiguation between (5)(a) election and (6)(a) couples-joint-signing | **Borrow:** the post-FA-1996 sub-section disambiguation. **Differentiate:** cite the specific sub-sections rather than the loose "s.222(5)" framing the source page uses — practitioners and HMRC challenge briefs that mis-cite sub-sections. |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223 | 200 OK; verify content at execution | n/a | n/a | s.223(3) deemed-occupation periods + s.223(2)(a) final-9-months | Statutory anchor for deemed-occupation | **Borrow:** verbatim citation of the final-9-months rule (s.223(2)(a)) and the deemed-occupation periods (s.223(3)). **Differentiate:** integrate with the worked examples. |
| (3-5 commercial accountant competitors blocked by WebFetch UA — Tax Insider, Cooper & Co, Tax Adviser Magazine all 403 / 404 at 2026-05-24 fetch) | 403 / 404 across multiple attempts | Unknown | Unknown | Unknown | Tax Insider's "Two Homes and CGT" article is the canonical practitioner-level coverage of the variation-of-nomination "flag" technique; Cooper & Co + Tax Adviser likely cover similar mechanics. Execution session should re-fetch with browser User-Agent before quote-citing. | **Flag at execution:** re-fetch with browser UA per F-12 lesson. Likely high-quality coverage of the variation mechanic that we want to scan for depth-comparison. NOT URL-dead; just fetch-blocked. |

**Competitor depth ceiling:** HS283 (~3,500 words) + CG64485 (700 words) are the load-bearing authorities; the rest of the competitor landscape is fragmented across Tax Insider / accountancy-firm blogs covering specific sub-mechanics. Our 2,800-3,200 word target with 12-14 FAQs + 5-7 statute citations + 4 worked examples puts us best-in-class on the integrated single-owner-with-2-residences treatment specifically.

**What to differentiate against:** HS283 is helpsheet (statutory accurate but no planning angle); CG64485 is manual (correct but narrow). No accessible competitor combines the election + variation + qualifying-residence test + deemed-occupation integration + landlord-specific worked examples in one page. That is our opening.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (REFRESHED 2026-05-24 PM, post-Wave-6 close).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (self) | cgt-main-residence-election-two-properties | REWRITE-with-differentiator | self — rewrite in place; explicit single-owner-with-2-residences angle as differentiator |
| Excluded (Wave 5 C7, SHIPPED 2026-05-23) | cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics | PRR + JOINT-OWNERSHIP / COUPLES (Wave 5 C7) | **CRITICAL ADJACENCY — define boundary explicitly.** W5 C7 covers s.222(5) in the JOINT-OWNERSHIP / COUPLES context (the s.222(6) one-residence-per-couple rule + s.222(6)(a) joint-signing). B2-C2 (this brief) covers s.222(5) in the SINGLE-OWNER WITH 2 RESIDENCES context (no couples; the owner is the only individual making the election). Both pages cite s.222(5)(a) but for different reader scenarios. Mandatory bidirectional forward-link with explicit boundary line at top of each page: "Looking for the spouse / couples version where you and your partner own two residences between you? See [W5 C7]. Looking for the single-owner version where YOU alone own two residences? You are here." |
| Residual (intra-batch sibling, in-progress) | **B2-B1 principal-private-residence-relief-landlords** | Sub-bucket B sibling | **Adjacent — define boundary explicitly.** B2-B1 covers the GENERAL PRR survey for landlords (TCGA ss.222-226 + Lettings Relief carve-out + post-2020 shared-occupation restriction + final-9-months + 4-years-UK-work + 3-years-any-reason). B2-C2 (this brief) covers the SINGLE-OWNER ELECTION mechanic specifically (the s.222(5)(a) nomination + the variation + the "flag" technique + the qualifying-residence test). Boundary: B2-B1 is the survey-level page covering all PRR mechanics; B2-C2 is the deep-dive on one specific mechanic (the election). Bidirectional forward-link required. Likely reciprocal: B2-B1 mentions the election briefly + forward-links to B2-C2 for depth; B2-C2 references the general PRR mechanics briefly + forward-links to B2-B1 for the survey. **NO Q&A needed to Sub-bucket B** — boundary is clean enough that scope-decision is unambiguous. |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar | No collision — pillar covers policy at top level. This page is the election-specific mechanic. Reciprocal forward-link required. |
| Excluded (rewritten 2026-05-21) | cgt-rates-property-2026-27-current-rates-explained | Rates explainer (trial gold reference) | No collision — forward-link from rates table at top. |
| Residual (intra-Batch-2 Sub-bucket C) | B2-C1 non-resident-cgt-uk-property-rates-reporting | Adjacent (different scenario class) | No collision (NRCGT page is for non-residents; this page is for UK residents). Forward-link from "what if I leave the UK after making the election?" FAQ. |
| Residual (intra-Batch-2 Sub-bucket C) | B2-C3 cgt-commercial-property-different-residential | Adjacent (different property class) | No collision (commercial-vs-residential page is for commercial gain rate framing; this page is for PRR on residential main residence). Forward-link from rates table at top for the cross-property-class framing. |
| Residual (intra-Batch-2 Sub-bucket B) | B2-B2 rollover-relief-property-landlords | Adjacent (different relief) | No collision (rollover relief is for trading-asset commercial property; PRR is for residential main residence). No forward-link needed. |
| Residual (intra-Batch-2 Sub-bucket B) | B2-B3 letting-relief-landlords-2026-changes | Adjacent (different relief) | No direct collision but topical adjacency on the "what about Lettings Relief on the elected property?" question. Forward-link from this brief's "Lettings Relief no longer applies post-April-2020" correction note to B2-B3 for depth on the post-restriction position. |
| Batch 1 Sub-bucket C (B1-C1 divorce + B1-C2 inherited + B1-C3 spouse) | All REWRITE | No collision (life-event-specific scenarios) | Forward-link from "what about the election on separation / divorce" FAQ to B1-C1 (which covers s.225B post-separation extension). |
| Wave 4 LtdCo + FIC | Various | No collision | Forward-link from "what if I own through a limited company?" FAQ (source page line 102-103 already has this — keep but refresh). |
| Wave 6 (LtdCo extraction + Trusts + CAA — SHIPPED 2026-05-24) | None directly relevant | No collision | Wave 6 buckets don't overlap PRR mechanics. |
| Wave 7 in-prep | RRA + HMRC enquiry + trust depth | No collision | Wave 7 confirmed zero CGT cluster work; no collision risk. |

**Conclusion:** REWRITE-with-differentiator in place. No REDIRECT-PROPOSED. No FLAG-MANAGER. Three-way cluster cleanly carved: W5 C7 (couples) + B2-B1 (general PRR) + B2-C2 (single-owner election). Each page has a distinct reader scenario; each forward-links to the others for the adjacent scenarios.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page after rewrite):

- **W5 C7 (CRITICAL adjacency)** `cgt-main-residence-relief-joint-ownership-pra-election-spouses-mechanics` — bidirectional with explicit boundary line at top of each page (couples vs single-owner)
- **B2-B1 (intra-batch sibling, in-progress)** `principal-private-residence-relief-landlords` — bidirectional (survey vs deep-dive)
- **B2-B3 (intra-batch sibling, in-progress)** `letting-relief-landlords-2026-changes` — forward-link from Lettings Relief correction note
- **B1-C1 (Batch 1 sibling, brief drafted)** `cgt-divorce-property-transfer-tax-implications` — forward-link from "election on separation / divorce" FAQ (B1-C1 covers s.225B post-separation extension)
- **CGT pillar (rewritten 2026-05-21)** `capital-gains-tax-property-complete-guide-uk` — back-link target
- **Trial gold reference** `cgt-rates-property-2026-27-current-rates-explained` — forward-link from rates table at top
- **B2-C1 (intra-batch sibling, in-progress)** `non-resident-cgt-uk-property-rates-reporting` — forward-link from "what if I leave the UK after the election?" FAQ
- **B2-C3 (intra-batch sibling, in-progress)** `cgt-commercial-property-different-residential` — forward-link from rates table at top
- **Wave 4 LtdCo / FIC pages** — forward-link from "what if I own through a company?" FAQ (refresh the existing source-page link)
- **Section 24 pillar (rewritten)** `section-24-tax-relief-complete-guide` — forward-link from "election does not affect rental income tax / S24" FAQ (keep existing source-page link)

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED — verified gov.uk + legislation.gov.uk s.1H 2026-05-24]: 18% basic / 24% higher; £3,000 AEA; PRR per s.222-226 with final 9 months of ownership always qualifying as deemed occupation; Lettings Relief restricted from 6 April 2020 to shared-occupation only. **Spine for this brief.**
- **§13 do-not-write list** [LOCKED]: no em-dashes anywhere; no real client names; no pricing; no specific firm names.
- **§24.5 cross-mechanism interactions** [LOCKED 2026-05-23 — verified 2026-05-24]: contains the s.222(5) election + s.222(6) one-residence-per-couple rule + interaction notes. Specifically: "Where the couple owns two residences, a joint s.222(5) election nominates which one is the main residence. The election must be in writing and signed by BOTH spouses (TCGA 1992 s.222(5))". **Note for execution:** the §24.5 cite of "signed by BOTH spouses (TCGA 1992 s.222(5))" is slightly imprecise — per legislation.gov.uk verification 2026-05-24, the original s.222(5)(b) joint-signing was repealed by FA 1996; the current joint-signing rule is in s.222(6)(a). This is a minor cite-precision issue in §24.5, not a substantive house-position contradiction. The §24 scope is COUPLES; this brief's scope is SINGLE-OWNER; no substantive overlap. Flagging as **F-27** (LOW, manager attention) to refine §24.5 cite precision (s.222(5) → s.222(5)(a) for election, s.222(6)(a) for couples joint-signing) — non-blocking for this brief.
- **§24.9 citations** [LOCKED 2026-05-23]: cites "TCGA 1992 s.222 (main residence; sub-s.222(5) election; sub-s.222(6) one-residence-per-couple)". Adequate for the residential-elections cluster; could be refined to (5)(a) / (6)(a) granularity per F-23 above.

---

## House-position conflict flag (Stage 2)

**Confirmed conflict — F-27 (NEW) — §24.5 + §24.9 cite-precision drift.**

§24.5 cites "the election must be in writing and signed by BOTH spouses (TCGA 1992 s.222(5))". Per legislation.gov.uk verification 2026-05-24 of TCGA 1992 s.222, the original s.222(5)(b) joint-signing for spouses was **repealed by Finance Act 1996**; the current joint-signing rule is at s.222(6)(a). Wave 5 C7 (the shipped joint-ownership PRR page) uses "s.222(5)(b)" in some FAQs (FAQ #3 specifically) — this may carry the same drift. **Non-blocking** for this brief (this brief covers the SINGLE-OWNER scenario; the joint-signing rule is not in this brief's scope), but recommended manager fix in `house_positions.md §24.5` body + `§24.9` citation list to read "s.222(5)(a) election + s.222(6)(a) joint-signing for couples" instead of the loose "s.222(5)". Same pattern as F-18 (Batch 1 Sub-bucket C's drift catch on §24.4 FA 2023 vs F(No.2)A 2023) — sub-section cite-precision is the kind of Stage 2 brief-time catch the §16.36 statutory-citation cross-check gate is designed to surface.

Also raising **F-28 (MEDIUM) — cross-residual cluster audit recommendation on Lettings Relief**. Pattern hypothesis (extends F-9 + F-21 from Batch 1 Sub-bucket A + Batch 2 Sub-bucket B): any residual PRR-adjacent page or main-residence-election page authored pre-April-2020 likely carries similar pre-restriction Lettings Relief framing ("up to £40,000 of additional relief if you let your main residence"). This brief's source page is the FOURTH confirmed instance (F-9 + B1-A2's reduce-cgt page + F-21 B2-B1 PRR page + this page). Recommend Phase 2 cluster pass across the residual PRR + main-residence + landlord-tax-planning pages to identify and refresh against §5 LOCKED. Likely 4-8 pages on hypothetical audit.

No other conflicts. The source page contains the 2 substantive content errors but neither contradicts a house-position (both are corrections within §5 LOCKED scope).

---

## Authority links worth considering (Stage 2 — partial WebFetch verification done)

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/1992/12/section/222 | 200 OK + content verified 2026-05-24 (s.222(5)(a) election; s.222(6) one-residence-per-couple; s.222(6)(a) joint-signing for couples post-FA-1996; original (5)(b) joint-signing repealed FA 1996) | Statutory anchor for the election; cite specific sub-sections, not loose s.222(5) |
| https://www.legislation.gov.uk/ukpga/1992/12/section/223 | 200 OK; verify content at execution per F-8 discipline (URL liveness ≠ content correctness) | Statutory anchor for s.223(3) deemed-occupation periods + s.223(2)(a) final-9-months |
| https://www.legislation.gov.uk/ukpga/1992/12/section/224 | 200 OK; verify content at execution | Statutory anchor for s.224 (apportionments where part of the dwelling is used non-residentially) |
| https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2024 | 200 OK + content verified 2026-05-24 — verbatim 2-year-window quote: "Your nomination must be made within 2 years of the date you first have a particular combination of residences"; deemed-occupation periods integrated | HMRC consumer helpsheet — load-bearing cite for the 2-year window |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64485 | 200 OK + content verified 2026-05-24 — confirms s.222(5) election right and the "not-obliged-to-nominate-factual-main-residence" planning hook | HMRC manual — load-bearing for the planning angle |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64500 | Verify at execution — referenced by CG64485 for variation-of-nomination mechanics | HMRC manual — load-bearing for the variation mechanic + "flag" technique |
| https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64427 | Verify at execution — HMRC's working position on the qualifying-residence test | HMRC manual — load-bearing for the qualifying-residence section |
| Goodwin v Curtis [1998] STC 475 + Moore v HMRC [2010] case-law citation (verify exact citations at execution) | Verify at execution | Case law for the qualifying-residence test (whether brief / occasional occupation makes a property a "residence" for s.222 purposes) |

**(Execution session selects 5-7 to actually cite in body. Load-bearing 4: s.222 + s.223 + HS283 + CG64485. Planning depth 2: CG64500 + CG64427. Case-law 1: Goodwin v Curtis.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: voice rules + lead-gen architecture + CSS-in-markdown + FAQs and schema + anti-templating + quality bar + statute citation discipline + all §16 lessons (especially §16.18 reasoning-first, §16.31 URL liveness, §16.35 per-write rate verification, §16.36 + §16.40 statutory cross-check at sub-section level per F-23). The execution session reads `NETNEW_PROGRAM.md §4` + `docs/competitor_rewrite_playbook.md §5` once at session start.

**Brief-specific reminders within those universals:**
- The 18%/24% rate (and the no-Lettings-Relief-post-2020-unless-shared-occupation framing) is the §16.35 type of figure that needs gov.uk verification at write time (verified live 2026-05-24 but re-verify at execution).
- The "s.222(5)(b) joint-signing was repealed by FA 1996; current joint-signing is s.222(6)(a)" finding is the §16.40 type of finding that the brief surfaces but the writer also independently verifies — the substituted-section wording must be checked, not just URL liveness.
- The 2 factual errors in the source page (post-2020 Lettings Relief, missing 3-years-any-reason) are non-negotiable removals; the writer should not accidentally retain them by paraphrase.
- The variation-of-nomination "flag" technique is a specific planning lever — execution session must verify HMRC's current anti-avoidance posture (CG64500 + any recent guidance updates) before writing the planning section, to avoid presenting an aggressive flag as if it's a safe routine technique.

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: inherits the full Wave 5 19-step workflow from `NETNEW_PROGRAM.md §7`. Track 2 deltas: step 9 rewrites at existing path; step 12 may propose REDIRECT (this brief proposes REWRITE-with-differentiator so step 12 is "no redirect required, slug preserved"); step 13 updates existing `monitored_pages` row OR inserts new if not yet tracked.

**Brief-specific call-outs within those workflow steps:**
- **Step 4 (pre-rewrite verification):** re-WebFetch s.222 + s.223 + HS283 + CG64485 + CG64500 + CG64427 at execution to confirm no statute change between brief date (2026-05-24) and execution date. Re-WebFetch the 3-5 fetch-blocked competitor URLs (Tax Insider "Two Homes and CGT" specifically) with browser User-Agent before quote-citing.
- **Step 9 (rewrite):** preserve frontmatter `slug` + `canonical`. Add `dateModified` + `reviewedBy` + `reviewerCredentials` + `reviewedAt`. Bump `date` to actual write date (substantive rewrite). Add the explicit cross-link disambiguation block at top of page (W5 C7 for couples; B2-B1 for general PRR; B2-C2 / this page for single-owner with 2 residences).
- **Step 11 (six checks):** explicit check for the 2 factual errors — none must survive paraphrase. Also: em-dash count = 0; FAQ schema count = `faqs:` array length; meta description ≤158 chars; all internal links resolve; statute citations cite specific sub-sections (s.222(5)(a) for election, s.222(6) for one-residence, s.223(3) for deemed-occupation — not loose s.222 / s.223).
- **Step 13 (monitored_pages):** insert new row with `rewrite_date = today`, `monitoring_window_days = 180` (per F-11 INVISIBLE-page recommendation), `expected_lift = "DEPTH-fix + variation-mechanic addition + Lettings-Relief correction; modest GSC-floor visibility lift expected (2-5 clicks / 90 days achievable); engagement-rate target shift from 0% (no GA4 baseline) to ≥40% if any sessions arrive"`.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §5 CGT 2026/27 (18%/24% + £3k AEA + final-9-months + Lettings Relief restricted to shared-occupation post-April-2020): __
- §13 do-not-write (no em-dashes, no pricing, no firm names): __
- §24.5 + §24.9 sub-section cite precision (s.222(5)(a) election + s.222(6)(a) joint-signing for couples) — used in this brief consistently: __

### Comparison: before vs after
- Word count: ~1,400 → __
- H2 count: 8 (+ 6 H3) → __
- FAQ count: 4 → __
- Authority links: 0 → __ (5-7 expected)
- Inline CTAs: 0 → __
- Worked examples: 1 → __ (4 expected)
- Rates table at top: 0 → __ (1 expected)
- Frontmatter `dateModified`: absent → __
- Frontmatter `reviewedBy` / `reviewerCredentials` / `reviewedAt`: absent → __
- Cross-link disambiguation block (W5 C7 / B2-B1 / this page): absent → __ (1 expected)

### Factual-error removal verification
- Error 1 (post-2020 Lettings Relief framing, line 78): __ REMOVED / NOT FOUND
- Error 2 (missing 3-years-any-reason deemed-occupation rule, line 83): __ REMOVED / NOT FOUND
- Error 3 (incomplete variation-of-nomination "you cannot backdate" framing, line 53): __ CORRECTED to include the 2-years-before-further-notice variation rule

### Statute-cite verification at write time (per §16.35 + §16.36 sub-section precision)
- s.222(5)(a) election (NOT loose s.222(5)) — verified at write time: __ DATE / source URL
- s.222(6) one-residence-per-couple — verified at write time: __ DATE / source URL
- s.222(6)(a) joint-signing for couples (NOT s.222(5)(b) which was repealed FA 1996) — verified at write time: __ DATE / source URL (cross-references W5 C7's FAQ #3 framing for consistency)
- s.223(3) deemed-occupation periods + s.223(2)(a) final-9-months — verified at write time: __ DATE / source URL
- Lettings Relief shared-occupation restriction post-April-2020 — verified gov.uk + HS283 at write time: __ DATE / source URL

### Cross-link verification at write time
- W5 C7 (couples PRR + joint-ownership): forward-link added + boundary line at top of THIS page + reciprocal back-link from W5 C7: __ (W5 C7 may need a back-link patch as part of execution if not already pointing here)
- B2-B1 (general PRR survey): forward-link added + reciprocal back-link from B2-B1: __ (B2-B1 in-flight; reciprocal landed at B2-B1 execution time)
- B2-B3 (Lettings Relief post-restriction): forward-link added: __
- B1-C1 (separation s.225B): forward-link added: __
- CGT pillar: forward-link added + reciprocal: __
- Trial gold reference: forward-link added: __
- B2-C1 (NRCGT) + B2-C3 (commercial vs residential): forward-links added: __

### Flags raised at execution
- F-27 (carried from brief): §24.5 + §24.9 sub-section cite precision — surface to manager for `house_positions.md` patch: __ confirmed at write
- F-28 (carried from brief): cross-residual Lettings Relief cluster audit recommendation — surface to Phase 2 manager: __
- Any new flags surfaced: __

### 2-3 sentence summary
- (populated at execution time)
