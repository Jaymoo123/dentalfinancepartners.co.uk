# Track 2 brief: report-property-sale-hmrc-60-days-guide

**Site:** property
**Brief type:** Legacy rewrite — Batch 2 Sub-bucket A (CGT reporting cluster-collapse continuation, F-16)
**Source markdown path:** `Property/web/content/blog/report-property-sale-hmrc-60-days-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/report-property-sale-hmrc-60-days-guide
**Stage 1 priority:** L (zero GSC + zero GA4 in 90-day window — the most-invisible of the F-16 trio; cluster cannibalisation against rewritten canonical that holds the 60-day-CGT-reporting query space + intra-pair duplicate of B2-A1)
**Stage 1 date:** 2026-05-24
**Stage 2 enrichment date:** 2026-05-24
**Cannibalisation status:** **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (same canonical as B2-A1 + Batch 1 Sub-bucket B trio). F-16 continuation candidate per `track2_site_wide_flags.md` 2026-05-23 22:00Z.

**Intra-pair resolution (B2-A1 vs B2-A2):** these two slugs (`how-to-report-property-sale-hmrc-60-days` vs `report-property-sale-hmrc-60-days-guide`) are near-textual-duplicates of each other. Almost identical titles, identical metaTitle character-for-character, same publish date (2026-04-10), same target query family. Only meaningful difference is body composition: B2-A1 has 9 H2s + 7 H3s + 4 FAQs / ~1,800 words; this page (B2-A2) has 6 H2s + 6 H3s + 4 FAQs / ~1,500 words. **B2-A1 structurally richer; this page (B2-A2) thinner.** GSC signal: both zero. GA4 signal: B2-A1 had 12 sessions, this page has **zero**. **B2-A2 is the weakest of the F-16 5-page cluster** (Batch 1 B1-B1/B2/B3 + Batch 2 B2-A1/A2). Neither displaces the canonical (262 imp at pos 1-11). All five collapse to one canonical.

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** propose retire via 301 redirect to `cgt-payment-deadlines-property-sales-2026`. The slug `report-property-sale-hmrc-60-days-guide` is essentially the verb-rearranged duplicate of B2-A1's `how-to-report-property-sale-hmrc-60-days`. Both reach for the same operational-reporting intent. Neither carries semantic differentiation; both target the same SERPs the canonical has already won. Five pages on essentially the same topic is the textbook cluster-cannibalisation symptom; the F-16 collapse to the canonical is the resolution.
- **Category:** `capital-gains-tax` (unchanged at redirect).
- **Gap-mode tag:** `CANNIBAL` (primary, against the rewritten canonical + against intra-pair B2-A1) + `INVISIBLE` (secondary, strongest INVISIBLE signal of entire Sub-bucket A trio — zero GSC AND zero GA4) + `STALE_FACTUAL` (tertiary, wrong loss-reporting framing in FAQ #2 + AEA year-stamp + 2027 surcharge framing too assertive for Bill-form law). After redirect the body STALE issues evaporate.
- **"Why this rewrite" angle:** there is no rewrite worth doing. The canonical already holds the cluster. Rewriting either of B2-A1 or B2-A2 in place would re-create the cannibalisation that Batch 1's collapse was designed to resolve, and would compete against the canonical with thinner content. Between the two near-duplicates, B2-A1 is structurally richer but neither is strong enough to displace the canonical. The cleanest resolution is to collapse both into the canonical.

---

## Current page snapshot (Stage 2 — pulled from filesystem + Supabase)

**Supabase `page_content_map`:** no row. Same pattern as B1-B1 + B2-A1: zero-impression pages don't get SERP-runner'd.

**Filesystem source read:**
- Date 2026-04-10. No `dateModified`.
- Title + h1: "How to Report a Property Sale to HMRC Within 60 Days: Complete Guide" (B2-A1's title is identical up to the "2026" suffix — direct textual duplication signal).
- metaTitle: "Report Property Sale HMRC 60 Days: Complete Guide 2026" (53 chars — **identical to B2-A1's metaTitle character-for-character**).
- metaDescription: "Step-by-step guide to report property sale HMRC 60 days. CGT online reporting, required forms, deadlines and penalties explained for UK landlords." (148 chars).
- Body word count ~1,500-1,600 words (vs B2-A1's ~1,800-1,900).
- 6 H2 sections + 6 H3 sub-sections (`Who Must Report and What is Exempt`, `How CGT Online Reporting Works: A Step-by-Step Guide` with 6 step H3s, `Payment Deadlines and Penalties`, `Common Mistakes and Complex Situations`, `Record Keeping and Professional Advice`, `Future Changes to Property CGT Reporting`).
- 4 FAQs in frontmatter.
- 0 worked examples.
- 0 outbound authority links (no gov.uk / legislation.gov.uk citations).
- 3 internal links (CGT pillar non-resident framing; PRR pillar; property accountant services).
- No schema-attached reviewer or sourcesVerifiedAt.

**House-position drift visible in source (multiple HIGH-severity, all resolved by REDIRECT not REWRITE):**
- **FAQ #2** asserts: *"No, you don't need to report within 60 days if you made a capital loss."* Partially correct for UK residents but materially WRONG for non-UK residents per §17.4 LOCKED — same drift pattern as Batch 1 B1-B1's FAQ #1. Non-UK residents must file the 60-day return for **every** UK land disposal regardless of whether tax is due (or whether it's a loss).
- **Body §"Who Must Report and What is Exempt"** (line 37): *"The sale results in a capital gain above the annual exempt amount (£3,000 for 2025/26)"*. £3,000 figure correct per §5 LOCKED for 2026/27 but year-stamp 2025/26 obsolete on a "Complete Guide" page. Framing also imports a wrong implication: UK-resident filer needs to report when CGT is **due** (not just when gain exceeds AEA).
- **Body §"Future Changes to Property CGT Reporting"** (line 141): *"From April 2027, new separate property income tax rates will apply to rental income, though these don't directly affect CGT calculations."* The "don't directly affect CGT" parenthetical is correct per §5 + §7 LOCKED. But "new separate property income tax rates will apply" framing is too assertive for Bill-form law per §7 LOCKED Bill-vs-enacted hedge discipline. §7 framing requires "announced... scheduled... pending Finance Act 2026 Royal Assent".
- **FAQ #3** on joint ownership (line 21): structurally correct per §24.1 LOCKED 50/50 default but no reference to Form 17 displacement per §24.2 LOCKED. Not stale-fact but a depth gap.

---

## GSC angle (last 90 days) — REAL DATA from `gsc_query_data` table

**Pulled 2026-05-24 PM from Supabase via `python -m optimisation_engine.track2.pull_page_data --slug report-property-sale-hmrc-60-days-guide --days 90`.**

**Aggregate: 0 impressions / 0 clicks / 0 queries in 90-day window.** Page is functionally invisible to Google for the 60-day-CGT-reporting query cluster.

**GA4 engagement signal (REAL data from `ga4_page_data`):** **0 sessions / 0 active users / 0 engaged sessions / 0 conversions in 90-day window.** Lower than both B2-A1 (12 sessions) and Batch 1 B1-B1 (2 sessions). Matches the airbnb trial T1 pattern of complete-invisibility (zero GSC + zero GA4). **Most-invisible of the entire F-16 5-page cluster.**

**Comparison with the redirect target `cgt-payment-deadlines-property-sales-2026`:**

| Metric | This page (B2-A2) | Redirect target |
|---|---|---|
| Total impressions | 0 | ~262 |
| Total clicks | 0 | 0 |
| Distinct queries | 0 | 20 |
| Top query | (none) | "hmrc cgt reporting deadlines 2026" (85 imp / pos 10.81) |
| Number of queries at top-3 positions | 0 | 9 |
| GA4 sessions | 0 | 2 (1 engaged) |

**Pattern analysis:** the redirect target captures the queries this page never reached AND has no internal-link traffic to consolidate. Zero-GSC + zero-GA4 makes this the cleanest of all 5 cluster-collapse decisions in the F-16 cohort. No link equity at risk, no organic search position at risk, no user-engagement signal at risk. Page is effectively orphaned within the site. Redirect is pure cleanup with no downside risk. Internal-link survey at execution can be lighter than B2-A1's.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: CANNIBAL (intra-pair + cross-source).** Intra-pair near-duplicate of B2-A1 — virtually identical metaTitles + h1 + topic anchor + publish date. Cross-source duplicate of the rewritten canonical. Three pages all chasing the 60-day-CGT-reporting query space. Google has resolved by selecting the canonical (262 imp) and deduplicating both legacy pages (0 imp each). Continuing to host two near-textual-duplicate legacy slugs alongside one canonical is unsustainable; redirect both.

**Secondary: INVISIBLE (strongest signal in the F-16 cohort).** Zero GSC AND zero GA4 in 90 days. INVISIBLE pages cannot be tuned to specific queries; their improvement lever is either foundational rewrite or consolidation. Stronger sibling already exists; consolidate.

**Tertiary: STALE_FACTUAL (multiple HIGH severity but all resolved by REDIRECT not REWRITE).** Four discrete factual drift issues catalogued in Section 4 above: (1) FAQ #2 loss-reporting wrong for non-residents per §17.4, (2) AEA year-stamp 2025/26, (3) §"Future Changes" 2027 surcharge framing too assertive for Bill-form law per §7, (4) joint-ownership FAQ #3 misses Form 17 depth. None require body fixing because the page is going away.

**Load-bearing fix (ordered by ROI):**

1. **Add 301 redirect** from `/blog/capital-gains-tax/report-property-sale-hmrc-60-days-guide` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026` in `Property/web/src/middleware.ts`.
2. **Delete (or move to `_redirected/`) the source markdown** at execution time.
3. **Update or insert `monitored_pages` Supabase row** with `tracking_type = redirect_post` for the 90-day post-redirect regression detector. Zero baseline GSC + zero baseline GA4 makes this row a quiet sentinel — primarily tracks canonical regression rather than this slug's traffic loss.
4. **Internal-link survey — light footprint expected** (vs B2-A1's heavier). Zero GA4 sessions in 90 days suggests very few internal links point here. Expect 0-2 survivors at most.
5. **Bundle with B2-A1** redirect as one commit (same canonical target). B2-A3 (different canonical) gets a separate commit.

**No body rewrite, no FAQ expansion, no metaTitle test.**

---

## Competitor URLs (Stage 2 — same query cluster as B2-A1 + Batch 1 Sub-bucket B; reusing verified-2026-05-24 sweep)

Same 4-URL set as B2-A1 — same query cluster, same SERP, same WebFetch results. No re-verification needed at the per-slug level; verification stands across B2-A1 + B2-A2.

| URL | Status | Word count | FAQs | Statute cites | Notes |
|---|---|---|---|---|---|
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | **200 OK + content verified 2026-05-24** (re-verified at B2-A1 brief drafting). Last updated 7 January 2026. | ~8,500-9,000 | 0 (embedded) | FA 2019 Sch 2, Finance Bill 2021-22, TCGA 1992 | Best-in-class authority; F-14 depth-target for canonical depth-up. |
| https://www.protax.org.uk/articles/capital-gains-tax-property-60-day-rule/ | Verified 200 OK at Batch 1 2026-05-23; re-verification at Batch 2 blocked by WebFetch permission denial — flagged for manager 5% sample re-check. | not re-measured | — | — | SERP pos-1 holder. |
| https://www.ross-brooke.co.uk/what-we-do/capital-gains-tax/capital-gains-tax-reporting-residential-sales/ | Verified 200 OK at Batch 1 2026-05-23; re-verification blocked at Batch 2 — flagged. | not re-measured | — | — | SERP pos-2 holder. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax | **200 OK + content verified 2026-05-24** (fresh WebFetch at B2-A1 drafting). | shallow on overview | 0 | None on overview | Authoritative landing-page reference. |

**No competitor URLs to borrow for this brief specifically** because the recommendation is REDIRECT, not REWRITE.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (refreshed 2026-05-24 PM).

| Source | Slug | Status | Resolution |
|---|---|---|---|
| Residual (own) | report-property-sale-hmrc-60-days-guide | REDIRECT-PROPOSED (this brief) | redirect to canonical |
| Residual (intra-pair) | how-to-report-property-sale-hmrc-60-days (B2-A1) | REDIRECT-PROPOSED (B2-A1 brief, same sub-agent) | redirect to same canonical |
| Excluded (rewritten 2026-05-21) | cgt-payment-deadlines-property-sales-2026 (Session C #23) | **CANONICAL** | absorbs B2-A1 + B2-A2 + B1-B1 + B1-B2 + B1-B3 — **5-page cluster collapse** when complete |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-complete-guide-uk | CGT pillar | Unaffected |
| Excluded (rewritten 2026-05-21) | capital-gains-tax-property-sale-uk-2026-rates-allowances | Disposal mechanics sibling | Unaffected |
| Excluded (rewritten 2026-05-21) | cgt-calculation-selling-buy-to-let-property-step-by-step | Calculation walkthrough | Unaffected |
| Excluded (rewritten 2026-05-21) | cgt-selling-buy-to-let-property-calculation-guide | BTL CGT canonical for sibling B2-A3 | Unaffected — different cluster |
| Already redirected in Batch 1 | 60-day-cgt-reporting-property-sales-complete-guide (B1-B1) | REDIRECT-PROPOSED (Batch 1) | Same canonical |
| Already redirected in Batch 1 | 60-day-cgt-reporting-property-sales-rule (B1-B2) | REDIRECT-PROPOSED (Batch 1) | Same canonical |
| Already redirected in Batch 1 | cgt-reporting-deadlines-property-2026 (B1-B3) | REDIRECT-PROPOSED (Batch 1) | Same canonical |
| Wave 5 / Wave 6 / Wave 7 | — | — | No collisions; CGT-deadlines cluster orthogonal to all 3 waves. |

**Conclusion:** REDIRECT-PROPOSED to `cgt-payment-deadlines-property-sales-2026`. No FLAG-MANAGER. Combined with Batch 1's 3 redirects + B2-A1, this completes the **5-way cluster collapse** to one canonical — full F-16 cluster resolution.

---

## Closest existing pages (Stage 2)

Post-redirect cluster shape (identical to B2-A1's mapping — they share the same canonical):

- **Canonical (this redirect's target):** `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`
- **Parent pillar:** `/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk`
- **Disposal mechanics sibling:** `/blog/capital-gains-tax/capital-gains-tax-property-sale-uk-2026-rates-allowances`
- **Calculation walkthrough sibling:** `/blog/capital-gains-tax/cgt-calculation-selling-buy-to-let-property-step-by-step`
- **BTL CGT calculation canonical (sibling B2-A3 redirect target):** `/blog/capital-gains-tax/cgt-selling-buy-to-let-property-calculation-guide`
- **AEA depth sibling:** `/blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27`
- **Rates + planning sibling:** `/blog/capital-gains-tax/cgt-rates-property-2026-27-current-rates-explained` (trial gold reference)
- **Gifting reliefs sibling:** `/blog/capital-gains-tax/cgt-gifting-property-family-members-uk`
- **PRR sibling:** `/blog/capital-gains-tax/principal-private-residence-relief-landlords` (residual; B2-B1 REWRITE in flight at this batch)

**Internal-link survey at this slug** (to be verified at execution): expect very light footprint given zero GA4 sessions. Most likely 0-2 internal-link survivors.

---

## House-position references (Stage 1)

- **§5 CGT on UK residential property (2026/27)** [LOCKED]: governs the 60-day rule (line 113). FAQ #2 partially-correct-for-UK-residents-wrong-for-non-residents framing replicates the same drift caught at Batch 1 B1-B1 + B1-B2. Same §5 do-not-write violation. Resolved by redirect.
- **§17 Leaving the UK / expat** [LOCKED 2026-05-22]: §17.4 NRCGT 60-day return applies to **every** non-resident UK land disposal regardless of tax due (or loss). FAQ #2 contradicts this; resolved by redirect.
- **§19 MTD for ITSA** [LOCKED 2026-05-22]: §19.15 confirms 60-day return runs in parallel with MTD cessation reporting. Not critical for this brief.
- **§7 April 2027 property income tax surcharge** [LOCKED — REMAINS Bill-form-hedge per Batch 2 pre-flight checklist + §7 LOCKED do-not-write list]: page's §"Future Changes" framing too assertive for Bill-form. Resolved by redirect.
- **§21 LtdCo + corporation tax**: not in scope (this page doesn't carry the wrong CT-rate framing that B2-A1 has).

---

## House-position conflict flag (Stage 2)

**Confirmed conflicts (HIGH severity, all resolved by REDIRECT not REWRITE):**

1. **FAQ #2 loss-reporting wrong-for-non-residents** (line 19 of source) — direct §17.4 contradiction. Resolved by redirect.
2. **AEA year-stamp 2025/26** (line 37) — figure correct numerically, year-stamp obsolete. Resolved by redirect.
3. **§"Future Changes to Property CGT Reporting"** (line 141) — 2027 surcharge framing too assertive for Bill-form per §7 hedge discipline. Resolved by redirect.
4. **FAQ #3 joint-ownership Form 17 depth gap** (line 21) — not wrong, but undersells §24 LOCKED Form 17 mechanics. Resolved by redirect.

Spot-check of canonical (from `cgt-payment-deadlines-property-sales-2026.md` body read 2026-05-24) confirms it handles #1, #2 correctly. #3 is correctly absent from canonical. #4 is partially covered via FAQ #9 (s.58 TCGA 1992 spouse exemption) — appropriate scope discipline.

**Critical drift catch carried from Batch 1 Sub-bucket B (already RESOLVED at canonical):** F-13 RESOLVED 2026-05-24 00:15Z by manager (commit `a103a04`). Re-verified at Batch 2 brief drafting (fresh WebFetch of legislation.gov.uk/ukpga/2019/1/schedule/2). No further canonical fix needed.

---

## Authority links worth considering (Stage 2 — verified across B2-A1 + this brief)

Same 4-URL set as B2-A1; verification stands.

| URL | Verification status | Use case |
|---|---|---|
| https://www.legislation.gov.uk/ukpga/2019/1/schedule/2 | **200 OK + content verified 2026-05-24**. FA 2022 c.3 s.23(2) inserted 30→60 extension effective 24 February 2022. | Statutory anchor for 60-day return. |
| https://www.gov.uk/report-and-pay-your-capital-gains-tax | **200 OK + content verified 2026-05-24**. | Authoritative gov.uk landing-page. |
| https://www.att.org.uk/cgt-uk-property-reporting-service-users-guide | **200 OK + content verified 2026-05-24**. Last updated 7 January 2026. | F-14 best-in-class depth comparator. |
| https://www.legislation.gov.uk/ukpga/1970/9/section/43 | **200 OK + content verified 2026-05-24**. 4-year claim deadline verbatim. | Per launch prompt directive (Decision #2 open recommendation). |

**(Execution session doesn't need to cite any of these in body — there is no body.)**

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md §4 section 13`: same restricted REDIRECT-case subset as B1-B1 / B1-B2 / B1-B3 / B2-A1 briefs.

- **§16.14** absolute-path tracker edits.
- **§16.31** URL liveness — verified 2026-05-24 (carried forward from B2-A1).
- **§16.18** reasoning-first cannib decision.
- **§16.36** statute citation cross-check gate.
- **§16.42** EXISTING_PAGE_STALE density — discovery items raised consistent with Wave 6 close lesson pattern.
- **§16.44** WebFetch summarizer trust — not applicable.
- **No em-dash discipline** — not applicable; no body authored.
- **Quality bar §4.3 six-check** — applied (no redirect loop; light internal-link footprint expected).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Per `TRACK2_PROGRAM.md §4 section 14`: same compressed REDIRECT workflow as B1-B1 / B1-B2 / B1-B3 / B2-A1, with this slug substituted:

**REDIRECT execution workflow (compressed):**

1. Read this brief end-to-end.
2. Claim the row in `track2_page_tracker.md` (mark 🟡 stage2_executing → ✅ executed) via absolute path.
3. Verify the canonical still exists at expected path; F-13 back-patched language still present.
4. Add 301 redirect in `Property/web/src/middleware.ts`: `/blog/capital-gains-tax/report-property-sale-hmrc-60-days-guide` → `/blog/capital-gains-tax/cgt-payment-deadlines-property-sales-2026`.
5. Delete (or move to `_redirected/`) the source markdown.
6. Grep for internal links pointing to this slug — expect light footprint (0-2 survivors). Update any survivors to canonical.
7. Build site (`cd Property/web && npm run build`). Must pass.
8. Insert or update `monitored_pages` row with `tracking_type = redirect_post`.
9. **Commit (bundled with B2-A1 redirect)** on `main`. B2-A3 separate commit.
10. Mark tracker ✅ executed for both B2-A1 + B2-A2.
11. Log any execution-time surprises to `track2_site_wide_flags.md`.

**Coordinate with the parallel B2-A1 redirect:** bundle B2-A1 + B2-A2 in one commit (same canonical); bundle B2-A3 in separate commit (different canonical).

**Cluster-collapse milestone at this commit:** the F-16 5-page cluster collapse completes (3 from Batch 1 + 2 from Batch 2). Total cluster pre-redirect impressions ~378 (262 canonical + 107 B1-B2 + 11 B1-B3 + zeros). Monitored_pages tracks 90 days; expected lift on canonical's `hmrc cgt reporting deadlines 2026` query from pos 10.81 to pos 7-9 over 30-60 days. Will not move CTR materially absent canonical-level work — F-14 depth-up is the next intervention.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### Pre-redirect verification

- Canonical still at expected path: __
- Canonical's F-13 back-patched language still present: __
- monitored_pages baseline for canonical pulled: __

### Redirect commit (bundled with B2-A1)

- Middleware rule landed (B2-A2): __
- Source markdown removed/moved (B2-A2): __
- Internal-link survivors patched B2-A2 (file:line list — expect 0-2 hits): __
- Build pass: __
- monitored_pages row inserted (B2-A2): __
- Commit hash (bundled with B2-A1): __

### Post-redirect monitoring

- 30-day check: canonical's `hmrc cgt reporting deadlines 2026` impressions trended +/-: __
- 60-day check: canonical's deadline-cluster total impressions trended vs pre-Batch-2 baseline (~378): __
- 90-day check: monitored_pages detector firing or quiet: __

### F-16 cluster-collapse close confirmation

- 5-page cluster collapse complete (3 Batch 1 + 2 Batch 2): __
- F-16 marked RESOLVED in `track2_site_wide_flags.md` resolution log: __

### Flags raised during execution

- F-13 carried (RESOLVED 2026-05-24): re-verified at execution: __
- F-14 unresolved (separate workstream): confirmed not back-patched: __
- D-9, D-10, D-11 (B2-A1 discoveries; cross-referenced): __
- New B2-A2-specific discoveries: __

### 2-3 sentence summary

- (populated at execution time)
