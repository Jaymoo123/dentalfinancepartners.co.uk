# Track 2A — Legacy rewrite brief tracker

**Last consolidated update:** 2026-05-24 PM (Batch 2 prep — Wave 6 closed reconciliation + Cannib Index post-W6 refresh + Decision #1+#2 resolved).

**Total pages in residual universe:** 233 (unchanged at Wave 6 merge — Wave 6 was net-new additive, not rewrites: 466 total blog .md files − 31 W1 − 30 W2 − 30 W3 − 30 W4 − 30 W5 − 30 W6 − 52 rewrites = 233 residual)
**Trial phase:** ✅ closed — 3 structure-only + 1 gold-reference brief
**Batch 1:** ✅ closed 2026-05-24 00:30Z — 9 CGT-cluster briefs in 3 sub-buckets of 3
**Batch 2:** open — 9 CGT-cluster continuation briefs in 3 sub-buckets of 3 (this batch)
**Phase 2 full-scale target:** TBD (separate decision after Batch 2 review; ~215 residual remaining after Batch 2 if all 9 ship as 🟢)

**Source-of-truth files:**
- `docs/property/track2_universe_2026-05-23.md` — residual universe
- `docs/property/track2_cannib_index_2026-05-23.md` — Cannibalisation Index (refreshed)
- `docs/property/TRACK2_PROGRAM.md` — manager doc

**Inherited rules:** see `TRACK2_PROGRAM.md §10` for the full tracker convention pointer into `NETNEW_PROGRAM.md §16.14`, §16.15, §15 + wave tracker pattern.

## Status legend (7 codes, multi-stage pipeline)

- ⬜ todo — in universe, not yet Stage 1'd
- 🟦 stage1_done — Stage 1 stub drafted
- 🟡 stage2_drafting — claimed by a Stage 2 sub-agent (or manager hand-drafting)
- 🟢 brief_drafted — full brief at `briefs/property/track2/<batch>/<slug>.md`, passed quality gates
- ⏭️ skip — page should not be rewritten (TSX / dead / redirect candidate); reason in Notes
- ✅ executed — future wave shipped the rewrite (back-filled later with Branch + Commit)
- ⚠️ collision — Wave N touched this page; needs re-reasoning before brief is usable

## Coordination rules (read before editing this file)

1. **Only edit your own assigned rows.** If a slug is in your sub-bucket, you edit its row. If not, do NOT touch.
2. **Mark 🟡 BEFORE starting work** so other sub-agents see it.
3. **Mark 🟢 immediately after** the brief passes quality gates + manager spot-check.
4. **If a discovery affects another row**, append to `track2_site_wide_flags.md` (append-only), never edit out-of-batch rows.
5. **Tracker edits go to THIS file in the main repo** via absolute path (per `NETNEW_PROGRAM.md §16.14`). NEVER commit tracker edits on a worktree branch.

---

## Sub-agent / sub-bucket assignment table (Batch 1 — CGT cluster)

Mirrors the wave5 tracker's worktree-map section. For brief drafting (Stage 2), sub-agents work on `main` (no worktrees needed since they only write new files into `briefs/property/track2/batch1_cgt/<sub_bucket>/`). Worktrees become necessary only at Phase 3 execution.

| Sub-bucket | Sub-agent | Output directory | Pages |
|---|---|---|---|
| A — Reliefs / planning | Sub-agent 1 | `briefs/property/track2/batch1_cgt/sub_a/` | 3 |
| B — Disposal + reporting | Sub-agent 2 | `briefs/property/track2/batch1_cgt/sub_b/` | 3 |
| C — Scenarios | Sub-agent 3 | `briefs/property/track2/batch1_cgt/sub_c/` | 3 |

---

## Pre-flight checklist (Batch 1 — manager-completed before dispatch)

Mirrors wave5 tracker's "Pre-flight (orchestrator-completed)" section.

- [x] **Wave state reconciled:** Wave 5 merged to main 2026-05-23 (3 merge commits); blog .md count 406 → 436; universe recalculated 234 → 233 residual.
- [x] **Cannibalisation Index refreshed:** `track2_cannib_index_2026-05-23.md` §1 grew by 30 (Wave 5 net-new now on `main`); §4 reshaped from Wave 5 candidates to Wave 6 candidates (the new volatile list); §2 net-new-shipped pool grew by 30 to 151 total.
- [x] **House positions snapshot:** §1-§24 LOCKED including Wave 5 §23 + §24 (2026-05-23). New Wave 6 extensions §22.9-§22.15 + new §25 CAA 2001 cluster LOCKED 2026-05-23. New lesson §16.41 (Q&A shell template hygiene) added.
- [x] **Fresh data ingestion:** `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90` ran 2026-05-23 PM (3,829 rows). `ingest_ga4 property --days 90` ran (251 rows).
- [x] **Folder structure upgraded:** `briefs/property/track2/trial/` for trial briefs, `briefs/property/track2/batch1_cgt/` for Batch 1.
- [x] **Rule propagation refactored:** `TRACK2_PROGRAM.md §10` (tracker) + §4 sections 13 + 14 (universal rules + workflow) all converted to pointers into `NETNEW_PROGRAM.md` + `competitor_rewrite_playbook.md` — no duplication of parent rules.
- [x] **Statute-drift discipline:** Batch 1 sub-agents instructed to verify statute content not just URL liveness (F-8 lesson: TCGA 1992 s.4 substituted by FA 2019, URL live but content gutted).
- [x] **Bill-vs-enacted check pre-batch:** Wave 6 F-9 catch (s.455 rate 33.75% → 35.75% per FA 2026) means FA 2026 is now enacted. Phase 2 sub-agents must verify §7 April 2027 lock status against the freshest legislation.gov.uk pull — may now be ENACTED rather than Bill-form.
- [x] **Track 2B output filed:** `topic_gaps_final.md` addendum landed (65 NEW candidates added to combined pool of ~494). Wave 6 is already consuming addendum candidates.
- [x] **Cross-track interlock:** Wave 6 actively executing on feature branches (10 of 30 shipped, others in flight). Batch 1 CGT cluster has NO known Wave 6 collisions (Wave 6 buckets are LtdCo extraction + Trusts + Capital allowances; none of the 9 Batch 1 CGT pages are in those buckets).

---

## Trial phase (complete)

3 hand-drafted structure-only briefs + 1 gold-reference data-complete brief. All 🟢.

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Topic cluster | Gap-mode | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| T1 | trial | — | airbnb-tax-uk-short-term-rental-income-taxed | How short-term rental income is taxed in the UK post-FHL abolition | FHL / serviced accom / STL | DEPTH (structure-only — page has 0 GSC + 1 GA4 session in 90d, effectively invisible) | `briefs/property/track2/trial/airbnb-tax-uk-short-term-rental-income-taxed.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | Hand-drafted by manager. Trial pick #1. Surfaced: airbnb has zero GSC = INVISIBLE case (new gap-mode finding, see F-6). |
| T2 | trial | — | birmingham-property-accountant | Specialist property accountancy for West Midlands landlords | City accountant | CTR-FAIL (structure-only) | `briefs/property/track2/trial/birmingham-property-accountant.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | Hand-drafted. Trial pick #2. F-1 pricing leak caught (likely site-wide pattern on residual city pages). |
| T3 | trial | — | 2027-property-tax-rates-section-24-relief-uk-landlords | Section 24 × 22% basic-rate-property-tax wedge from April 2027 | 2027 surcharge / Section 24 | CANNIBAL (structure-only) | `briefs/property/track2/trial/2027-property-tax-rates-section-24-relief-uk-landlords.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | Hand-drafted. Trial pick #3. F-2 Bill-vs-enacted hedging + F-3 cluster REDIRECT-PROPOSED for 2 siblings. |
| T4 | trial | — | cgt-rates-property-2026-27-current-rates-explained | UK CGT rates on residential property 2026/27 + applied planning | Capital Gains Tax | CTR-FAIL + INTENT-MISMATCH + STRUCTURE (data-complete gold reference) | `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md` | — | — | 🟢 brief_drafted (GOLD REFERENCE) | 2026-05-23 | 2026-05-23 | **Gold-reference brief — fully data-populated.** Real GSC (25 queries, 895 imp, 1 click, pos 5.4), GA4 (3 sessions, 161s avg duration), 3 verified competitor URLs, gov.uk authority verified. F-5 (5th Bill-vs-enacted) + F-6 (new INTENT-MISMATCH gap-mode code) + F-7 (PIM4101 hallucination caught) + F-8 (TCGA 1992 s.4 substituted by FA 2019) raised. **Phase 2 sub-agent depth match-target.** |

---

## Batch 1 — CGT cluster continuation (2026-05-23)

**Why CGT continuation:** the trial gold reference was a CGT page (`cgt-rates-property-2026-27-current-rates-explained`). Continuing the same cluster validates that the gold-reference approach scales within a known cluster before broadening to unfamiliar clusters.

**Cluster cannibalisation note:** all 9 Batch 1 candidates have rewritten CGT siblings (the 2026-05-21 rewrite pass shipped 6 CGT pages: pillar, AEA, calculation walkthrough, payment deadlines, 60-day reporting, gifting). Sub-agents must cannibalisation-check against the rewritten siblings AND against each other within the same sub-bucket (intra-batch in-flight checks).

### Sub-bucket A — Reliefs / planning (3 pages)

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Gap-mode (Stage 1 hypothesis — verify with real GSC at Stage 2) | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B1-A1 | 1 | A | cgt-deferral-strategies-property-investors-uk | CGT deferral tactics (rollover, holdover, EIS, gifting timing) for property investors | DEPTH + VOICE-FRESHNESS (confirmed Stage 2: 0 GSC = invisible page) | `briefs/property/track2/batch1_cgt/sub_a/cgt-deferral-strategies-property-investors-uk.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | REWRITE clean. Sch 5B + s.152 + s.165 + s.58 + s.162 statute spine verified live; 4 competitor URLs WebFetched (1 returned truncated, flagged F-12). Cross-links to Wave 6 B18 + B6-C2 noted in discovery log. |
| B1-A2 | 1 | A | reduce-cgt-property-disposal-uk | Reduce CGT on property disposal — relief stack + timing | DEPTH + VOICE-FRESHNESS + STRUCTURE (confirmed Stage 2: 0 GSC = invisible page; 3 stale-figure issues including Companies-pay-19%-CGT error) | `briefs/property/track2/batch1_cgt/sub_a/reduce-cgt-property-disposal-uk.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | REWRITE with manager spot-check on survey-as-router framing. F-9 raised (3 stale-figure issues across body — likely site-wide pattern). 3 competitor URLs WebFetched (UKPA competitor carries 28% stale rate, signal for D-1 discovery). |
| B1-A3 | 1 | A | cgt-property-sold-loss-claim-capital-losses | Capital loss claim mechanics on property sale + offset rules | DEPTH + STALE_FIGURES (confirmed Stage 2: 0 GSC = invisible page; 4 depth additions needed, F-10 4-year claim-deadline gap raised) | `briefs/property/track2/batch1_cgt/sub_a/cgt-property-sold-loss-claim-capital-losses.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | REWRITE clean. s.16 + s.24 + s.38 + s.58 + TMA 1970 s.43 statute spine planned (s.16 verified live; others verify-at-execution per F-7/F-8 discipline). F-10 (4-year claim deadline gap), D-7 (TMA s.43 house-position lock recommendation), D-8 (negligible value adjacent topic) raised. |

### Sub-bucket B — Disposal + reporting (3 pages)

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Gap-mode (Stage 1 hypothesis) | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B1-B1 | 1 | B | 60-day-cgt-reporting-property-sales-complete-guide | 60-day CGT reporting — complete guide to the disposal-to-payment cycle | **CANNIBAL + INVISIBLE** (zero GSC; 3-way cluster collapse to rewritten canonical) | `briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-complete-guide.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (rewritten Session C #23). Zero GSC + 2 bounced GA4 sessions. Three-way cluster collapse with B1-B2 + B1-B3. Bundle redirects in one commit. |
| B1-B2 | 1 | B | 60-day-cgt-reporting-property-sales-rule | 60-day CGT reporting — the rule + when it applies | **CANNIBAL + STALE_FACTUAL** (107 imp pos 17-18; page-internal contradiction in FAQ + body) | `briefs/property/track2/batch1_cgt/sub_b/60-day-cgt-reporting-property-sales-rule.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | **REDIRECT-PROPOSED → same canonical.** Intra-pair: B1-B2 stronger than B1-B1 (107 imp vs 0; full schema + ICAEW reviewer + 4 FAQs) but neither displaces the canonical (262 imp at pos 1-11). Bundle in single commit. |
| B1-B3 | 1 | B | cgt-reporting-deadlines-property-2026 | All CGT reporting deadlines (60-day, SA, NRCGT) for 2026/27 | **CANNIBAL + STALE_FACTUAL (CRITICAL)** (Summary asserts "Non-residents have a 30-day deadline" — direct §17.4 contradiction AND page-internal contradiction with own body) | `briefs/property/track2/batch1_cgt/sub_b/cgt-reporting-deadlines-property-2026.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | **REDIRECT-PROPOSED → same canonical.** Top query identical to canonical's top query (`hmrc cgt reporting deadlines 2026`); canonical wins 85 imp vs 5 imp at adjacent positions. Side-discovery: page's band-stacking worked example richer than canonical's flat-rate example — manager to decide whether to lift to calculation-walkthrough sibling. |

### Sub-bucket C — Scenarios (3 pages)

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Gap-mode (Stage 1 hypothesis) | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B1-C1 | 1 | C | cgt-divorce-property-transfer-tax-implications | CGT on property transfers during divorce / separation | DEPTH + VOICE-FRESHNESS + STRUCTURE + TAIL-SIGNAL (3 source factual errors; post-F(No.2)A 2023 reform not reflected; BTL portfolio split missing; zero GSC/GA4) | `briefs/property/track2/batch1_cgt/sub_c/cgt-divorce-property-transfer-tax-implications.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | REWRITE. F-18 raised (§24.4 cite drift FA 2023 → F(No.2)A 2023). Topic adjacency to Track 2B candidate #2 SDLT-on-divorce — Wave 7+ sibling. |
| B1-C2 | 1 | C | cgt-inherited-rental-property-calculation-uk | CGT calculation for inherited rental property (uplift basis, disposal mechanics) | DEPTH + STRUCTURE + 60-DAY-£6K FACTUAL ERROR + TAIL-SIGNAL | `briefs/property/track2/batch1_cgt/sub_c/cgt-inherited-rental-property-calculation-uk.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | REWRITE. Wave 2 A7 already cross-links INTO this page; rewrite must STRENGTHEN (3 inline + 1 footer target). F-19 raised (cross-residual £6k threshold drift cluster audit). |
| B1-C3 | 1 | C | cgt-property-transfer-spouse | CGT on inter-spouse property transfers — TCGA s.58 mechanics + planning | STRUCTURE (acute, 1,000 words / 2 FAQs) + DEPTH + VOICE-FRESHNESS + TAIL-SIGNAL | `briefs/property/track2/batch1_cgt/sub_c/cgt-property-transfer-spouse.md` | — | — | 🟢 brief_drafted | 2026-05-23 | 2026-05-23 | REWRITE. Biggest structural uplift of 3 (target 2,800-3,200 words + 12-14 FAQs). 9 mandatory Wave 5 C-cluster forward-links (C1-C9 except own slot). Cross-link Wave 5 C7 + C2 per launch prompt. F-20 raised (stale FA-2025 non-dom framing cluster). |

---

## Batch 2 — CGT cluster continuation (2026-05-24)

**Why CGT continuation:** Batch 1 proved the cluster-collapse pattern works at 3-way collapse to a rewritten canonical (sub-bucket B). Batch 2 banks the F-16-named continuation candidates (3 more 60-day-CGT collapse candidates) + drains the remaining residual CGT cluster (reliefs + applied mechanics). After Batch 2 the cluster is largely complete (~22 of ~25 residual CGT pages briefed across Trial + Batch 1 + Batch 2). User picked CGT continuation over Section 24 / AIA / city alternatives at 2026-05-24 PM checkpoint.

**Cluster cannibalisation note:** Batch 1 already collapsed 3 residual into the `cgt-payment-deadlines-property-sales-2026` rewritten canonical (sub-bucket B). Batch 2 sub-bucket A continues that cluster collapse with the 3 named F-16 candidates — likely 2 more REDIRECTs to the same canonical + 1 REDIRECT to `cgt-selling-buy-to-let-property-calculation-guide` (different rewritten canonical). Sub-bucket B (reliefs) and Sub-bucket C (applied mechanics) are mostly REWRITE territory with intra-batch CANNIBAL risk between B2-B1 (PRR general) and B2-C2 (PRR election) — sub-agents coordinate via Q&A or in-flight cannib log.

### Sub-bucket A — CGT reporting cluster-collapse (3 pages — F-16 continuation)

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Gap-mode (Stage 1 hypothesis — verify with real GSC at Stage 2) | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B2-A1 | 2 | A | how-to-report-property-sale-hmrc-60-days | How to report a UK residential property sale to HMRC under the 60-day rule | CANNIBAL + INVISIBLE (confirmed Stage 2: 0 GSC + 12 GA4 sessions at 65.8% bounce + 20.6s avg duration) — cluster-collapse continuation | `briefs/property/track2/batch2_cgt/sub_a/how-to-report-property-sale-hmrc-60-days.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (same canonical as Batch 1 sub-bucket B trio). F-16 5-page cluster collapse continuation. 4 HIGH-severity STALE_FACTUAL issues at source (penalty schedule conflation, wrong CT-£250k threshold framing, AEA year-stamp 2025/26, FAQ #2 absolute no-paper-forms claim). 4 URLs verified live 2026-05-24 (legislation.gov.uk x2 + gov.uk + ATT). F-21 + D-9 + D-10 + D-11 raised. |
| B2-A2 | 2 | A | report-property-sale-hmrc-60-days-guide | 60-day CGT property sale reporting — practitioner guide | CANNIBAL + INVISIBLE (confirmed Stage 2: 0 GSC + **0 GA4** — most-invisible of F-16 cohort) | `briefs/property/track2/batch2_cgt/sub_a/report-property-sale-hmrc-60-days-guide.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | **REDIRECT-PROPOSED → `cgt-payment-deadlines-property-sales-2026`** (same canonical). Intra-pair near-textual-duplicate of B2-A1 — identical metaTitle character-for-character, identical h1 up to "2026" suffix, same publish date 2026-04-10. B2-A1 structurally richer (1,800 vs 1,500 words); neither displaces canonical. Bundle redirect with B2-A1 in one commit. 4 HIGH-severity STALE_FACTUAL issues at source (FAQ #2 loss-reporting wrong for non-residents, AEA year-stamp, §"Future Changes" 2027 framing too assertive for Bill-form, FAQ #3 Form 17 depth gap). |
| B2-A3 | 2 | A | capital-gains-tax-selling-rental-property-uk | CGT on selling a UK rental property | CANNIBAL (CRITICAL — cluster-collapse to DIFFERENT canonical) + INVISIBLE-ADJACENT (confirmed Stage 2: 6 imp at pos 49-85 = functionally invisible) | `briefs/property/track2/batch2_cgt/sub_a/capital-gains-tax-selling-rental-property-uk.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | **REDIRECT-PROPOSED → `cgt-selling-buy-to-let-property-calculation-guide`** (rewritten Session B #14 on 2026-05-21 per Cannib Index §6 cross-source pair list line 231). DIFFERENT canonical from A1+A2; separate commit at execution. Both pages currently zero-imp at the canonical too (cluster collapse here is housekeeping rather than equity consolidation). Source has correctly-framed TMA 1970 s.43 4-year-claim paragraph — lift opportunity D-12. **3 new D-flags raised: D-12 (lift opportunity), D-13 (canonical depth-up gap — no ATT-class authority comparator in this cluster), D-14 (canonical also carries 2025/26 year-stamp drift — not resolved by redirect).** |

### Sub-bucket B — CGT reliefs cluster (3 pages — REWRITE)

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Gap-mode (Stage 1 hypothesis) | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B2-B1 | 2 | B | principal-private-residence-relief-landlords | PRR for landlords — TCGA ss.222-226 + Lettings Relief carve-out (post-2020) | DEPTH + STALE_FIGURES (F-9 pattern CONFIRMED — pre-2020 Lettings Relief framing in body H2 + FAQ #3 + 2 tax-year drift refs) + STRUCTURE | `briefs/property/track2/batch2_cgt/sub_b/principal-private-residence-relief-landlords.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | REWRITE clean. **§5 LOCKED post-2020 shared-occupation rule + s.223B statute spine.** 4 imp/90d (3 queries — 2 are Irish-jurisdiction wrong-intent). 4 verified authority URLs (s.222/s.223/s.223B/s.224 + CG64200/CG64710/CG64985 + gov.uk consumer). Explicit cross-link to W5 C7 (joint-ownership PRR — complementary) and reciprocal to B2-C2 (s.222(5) election — intra-batch CANNIBAL differentiator resolved: B2-B1 = general PRR theory + Lettings carve-out; B2-C2 = election mechanics specialist). F-21 raised (HIGH — F-9 pattern continuation, 3rd confirmed instance). |
| B2-B2 | 2 | B | rollover-relief-property-landlords | Business-asset rollover relief on property disposal — TCGA s.152 mechanics for landlords | DEPTH + STALE_FIGURES (F-2/F-5 pattern at line 96 — unhedged April 2027 22/42/47 assertion) + STRUCTURE | `briefs/property/track2/batch2_cgt/sub_b/rollover-relief-property-landlords.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | REWRITE clean. s.152 + s.153 + s.155 Class 1 Head A statute spine verified live; CG60250 + CG60280 + CG60290 manual cross-references verified. 0 imp/90d (invisible page, B1-A1 cohort). Most landlords don't qualify (rental = investment not trade per s.155 Class 1 Head A "occupied AND used"); FHL post-abolition further narrows. F-22 raised (HIGH — F-2/F-5 sixth instance; unhedged April 2027 rate assertion at body line 96). |
| B2-B3 | 2 | B | letting-relief-landlords-2026-changes | Lettings Relief for landlords — post-April-2020 shared-occupation restriction | DEPTH + STATUTE_CITATION_DRIFT (dispatch s.224 cite wrong → s.223B correct) + STALE_FACTUAL (substantive transitional-rule error in body) + STRUCTURE | `briefs/property/track2/batch2_cgt/sub_b/letting-relief-landlords-2026-changes.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | REWRITE clean. **2 imp/90d at pos 3 (page holds the SERP slot for "lettings relief" but topic-volume intrinsically low post-restriction).** Substance largely correct (8/8 H2s correctly post-2020-framed) — REWRITE = depth-add + statute-anchor + structure-lift, NOT factual-fix on the lettings-relief substance itself. But TWO substantive errors caught: (a) line 96-99 transitional-rule cut-off is date-of-DISPOSAL not date-of-letting per CG64710 verified 2026-05-24; (b) line 119 em-dash + line 129 F-9-adjacent corporate framing. F-23 (HIGH — statute-citation-drift on dispatch prompt; s.224 cited but s.223B is correct) + F-24 (HIGH — substantive transitional-rule body error) raised. NOT REDIRECT-PROPOSED — page owns SERP intent + slug + position-3 holds. |

### Sub-bucket C — CGT applied mechanics (3 pages — REWRITE)

| # | Batch | Sub-bucket | Slug | Framing 1-liner | Gap-mode (Stage 1 hypothesis) | Brief path | Branch | Commit | Status | Stage 1 date | Stage 2 date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B2-C1 | 2 | C | non-resident-cgt-uk-property-rates-reporting | NRCGT on UK property — rates + reporting mechanics for non-resident landlords | DEPTH + STALE_FIGURES (confirmed Stage 2: 0 GSC + 4 GA4 sessions all bounced; 4 source factual errors — false conveyancer-withholding claim, residual ATED-related CGT framing on company section, 60-day framing presented as same-as-residents not for-every-disposal, wrong small-profits-rate company gains framing) + INVISIBLE | `briefs/property/track2/batch2_cgt/sub_c/non-resident-cgt-uk-property-rates-reporting.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | REWRITE clean. **§17.4 LOCKED NRCGT 60-day rule + post-FA-2019 rates verified live + gov.uk every-disposal rule verified verbatim.** F-25 raised (HIGH — 3-error confluence including the FALSE conveyancer-withholding-from-sale-proceeds claim; UK has no FIRPTA-style mandatory withholding regime; high-stakes reader-misleading). F-26 raised (LOW — cross-residual cluster audit for NRCGT pages with stale 30-day-not-60-day or ss.14B-14H architecture). 5 authority URLs verified live; 6 competitor URLs blocked by WebFetch UA — flagged for execution re-fetch. |
| B2-C2 | 2 | C | cgt-main-residence-election-two-properties | s.222(5) PRR election for SINGLE-owner landlord with main residence + BTL with periods of personal use | DEPTH + STALE_FIGURES (confirmed Stage 2: 0 GSC + 0 GA4; pre-2020 Lettings Relief framing presented as live + missing 3-years-any-reason deemed-occupation rule + incomplete variation-of-nomination framing) + STRUCTURE | `briefs/property/track2/batch2_cgt/sub_c/cgt-main-residence-election-two-properties.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | REWRITE-with-differentiator. **INTRA-BATCH COORDINATION RESOLVED at brief-start:** Wave 5 C7 covers s.222(5) in JOINT-OWNERSHIP/COUPLES context (one-residence-per-couple s.222(6)). B2-B1 covers general PRR + Lettings Relief carve-out (now 🟢 — sub-bucket B explicitly aligned: B2-B1 = general PRR theory + Lettings carve-out; B2-C2 = election mechanics specialist). B2-C2 owns SINGLE-owner landlord with 2 properties scenario. Differentiator clean — no scope-Q to Sub-bucket B needed. F-27 raised (LOW — §24.5+§24.9 sub-section cite-precision drift; s.222(5)(b) joint-signing was repealed FA 1996; current is s.222(6)(a); minor manager-side cite-refinement opportunity). F-28 raised (MEDIUM — cross-residual Lettings-Relief cluster audit recommendation; extends F-9/F-21 pattern; 4th confirmed instance of pre-2020 Lettings Relief framing on residual pages including this brief). 4 authority URLs verified live (s.222, HS283, CG64485, gov.uk rates); 3 competitor URLs blocked by WebFetch UA. |
| B2-C3 | 2 | C | cgt-commercial-property-different-residential | CGT rates 18%/24% now cover BOTH residential AND non-residential per FA 2024 + §5 LOCKED; reframed differentiator is RELIEFS (BADR/rollover/holdover) + capital-allowances clawback | **STALE_FIGURES-CRITICAL (confirmed Stage 2: 0 GSC + 0 GA4; CORE FRAMING wrong — "commercial CGT 10/20% vs residential 18/24%" out of date post-30-October-2024 per §5 LOCKED + verified legislation.gov.uk s.1H 2026-05-24; £4k saving worked-example wrong; BADR 10% wrong [now 14%/18%]; small-profits-rate-via-company-CT wrong [3rd occurrence of pattern])** + DEPTH + STRUCTURE | `briefs/property/track2/batch2_cgt/sub_c/cgt-commercial-property-different-residential.md` | — | — | 🟢 brief_drafted | 2026-05-24 | 2026-05-24 | REWRITE — load-bearing reframe from "different rates" to "different reliefs + different mechanics". **HIGHEST-STAKES STALE FRAMING caught in Track 2 to date.** F-29 raised (HIGH — core framing direct §5 LOCKED contradiction with reader-misleading commercial vs residential investment-choice arithmetic). F-30 raised (HIGH — cross-residual cluster audit for 10/20% commercial framing; specifically targets Budget-2024-change cluster). F-31 raised (LOW — 3rd occurrence of wrong-tax-term-via-small-profits-rate pattern across Track 2 after F-9 + F-25; cross-residual corporate-ownership audit recommendation). 5 authority URLs verified live (s.1H, s.1I, gov.uk rates, s.222 verification spillover); 6 competitor URLs blocked by WebFetch UA. Densest Wave-6-cross-link integration of any Track 2 brief drafted so far: 5 W6 Bucket C forward-links (C2 balancing, C3 SBA, C5 FYA, C6 fixtures, C8 FHL-grandfathered) + 2 W6 other (A series MVL, B4 holdover-blocking). |

---

## Pre-flight checklist (Batch 2 — manager-completed before dispatch)

Mirrors Batch 1 pre-flight pattern.

- [x] **Wave state reconciled:** Wave 6 closed to main 2026-05-24 (10 close commits `3808019` → `0805d07`); blog .md count 436 → 466; universe recalculated stays at 233 residual (W6 was net-new additive, not rewrites).
- [x] **Cannibalisation Index refreshed:** `track2_cannib_index_2026-05-23.md` updated 2026-05-24 PM. §0 new entry; §1 466 count; §2 grew by 30 with full Wave 6 slug list; §4 reshaped from "Wave 6 in-flight" to "Wave 7 in-prep candidates" (zero CGT collision noted); §5 inter-wave queue marked F-9/F-3/F-1/F-10 as POST-WAVE-6-RESOLVED; §6 60-day cluster pairs updated to reference Batch 1 + Batch 2 disposition; §7 Batch 1 in-flight section closed + new Batch 2 in-flight stub added.
- [x] **House positions snapshot:** §1-§25 LOCKED including Wave 6 close patches §21.1 s.455 = 35.75%, §22.x NRB freeze 2031, §22.12 s.169E (NOT s.169G), §25 CAA 2001 cluster (locked 2026-05-23 at Wave 6 prep; held through Wave 6 close).
- [x] **Fresh data ingestion:** `python -m optimisation_engine.ingestion.ingest_gsc_queries property --days 90` ran 2026-05-24 PM (3,829 rows refreshed; same count as Batch 1 prep — stable structure). GA4 deferred (sub-agents pull per-slug via `pull_page_data.py`).
- [x] **Folder structure:** `briefs/property/track2/batch2_cgt/sub_{a,b,c}/` to be created by first sub-agent that lands a brief (no manager pre-creation; per Batch 1 pattern).
- [x] **Statute-drift discipline:** Batch 2 sub-agents instructed to verify statute content not just URL liveness (F-8 lesson + Wave 6 close-cycle's §16.42 EXISTING_PAGE_STALE pattern; Batch 2 sub-agents working on residual CGT pages should EXPECT to surface adjacent-content STALE flags per the §16.42 density pattern).
- [x] **Bill-vs-enacted check pre-batch:** Wave 6 close confirmed FA 2026 IS enacted (s.455 substitution to 35.75% locked in §21.1). Trial F-5's April 2027 surcharge §7 lock status REMAINS Bill-form-hedge — Wave 6 F-9 was about s.455 (corporation-tax dividend rate), NOT the April 2027 income-tax/CGT surcharge on property. Sub-bucket A briefs touching April 2027 territory must hedge per §7 LOCKED.
- [x] **§16 lessons inheritance:** Batch 2 sub-agents read §16.18 / §16.31 / §16.22+§16.27+§16.30+§16.33+§16.40 / §16.14+§16.15+§16.37 / §16.36 statutory-cite gate / §16.38 manager-prompt-drift / **§16.41 + §16.42 + §16.43 + §16.44** (new Wave 6 lessons since Batch 1 dispatch).
- [x] **Decisions resolved pre-batch:** Decision #1 back-patch on `incorporate-rental-property-without-cgt.md` FAQ #4 (28% → 24%) committed `5316bea`. Decision #2 TMA 1970 s.43 recommendation appended to wave6 flags committed `6769942`. Both surgical, both clean.
- [x] **Cross-track interlock:** Wave 6 CLOSED (commits `3808019` → `0805d07`). Wave 7 IN PREP (HP-lock + Stage 1 pending fresh manager pickup) — bucket-mix is RRA + HMRC enquiry + trust depth; ZERO CGT collision risk for Batch 2.

---

## Sub-agent / sub-bucket assignment table (Batch 2 — CGT cluster continuation)

For brief drafting (Stage 2), sub-agents work on `main` (no worktrees needed since they only write new files into separate sub-bucket subdirs). Worktrees become necessary only at Phase 3 execution.

| Sub-bucket | Sub-agent | Output directory | Pages |
|---|---|---|---|
| A — CGT reporting cluster-collapse (F-16 continuation) | Sub-agent 1 | `briefs/property/track2/batch2_cgt/sub_a/` | 3 |
| B — CGT reliefs (PRR / Rollover / Lettings) | Sub-agent 2 | `briefs/property/track2/batch2_cgt/sub_b/` | 3 |
| C — CGT applied mechanics (NRCGT / two-prop election / commercial vs residential) | Sub-agent 3 | `briefs/property/track2/batch2_cgt/sub_c/` | 3 |

---

## Universe at a glance (post-Wave-6 merge)

| Pool | Count | Source |
|---|---|---|
| Total blog .md on `main` | 466 | `Property/web/content/blog/*.md` (Wave 6 merged 2026-05-24) |
| Wave 1 net-new (SDLT + LtdCo + VAT/FIC/ATED) | 31 | `track1_page_tracker.md` |
| Wave 2 net-new (IHT + DTAs + Expat) | 30 | `wave2_page_tracker.md` |
| Wave 3 net-new (ATED + MTD ITSA + RRA 2025) | 30 | `wave3_page_tracker.md` |
| Wave 4 net-new (LtdCo+FIC + MTD ops + IHT estate) | 30 | `wave4_page_tracker.md` |
| Wave 5 net-new (VAT + Devolved + Form 17) | 30 | `wave5_page_tracker.md` (shipped 2026-05-23) |
| Wave 6 net-new (LtdCo extraction + Trusts + CAA 2001) | 30 | `wave6_page_tracker.md` (shipped 2026-05-24) |
| 2026-05-21 rewrites | 52 | `page_rewrite_tracker.md` |
| **Residual legacy (Track 2A pool)** | **233** | 466 − 31 − 30 − 30 − 30 − 30 − 30 − 52 (unchanged — W6 was net-new) |
| **Wave 7 in-prep candidates** | **~30** | `NETNEW_PROGRAM.md` §3 Wave 7 prep subsection — user-approved bucket selection 2026-05-24 PM (RRA/EPC/BSA + HMRC enquiry + trust depth continuation). HP-lock + Stage 1 pending fresh manager pickup. **Zero CGT collision with Batch 2.** |

## Summary (across all batches)

| Phase | Briefs drafted | Status |
|---|---|---|
| Trial | 4 (3 structure-only + 1 gold-reference) | ✅ closed 2026-05-23 PM |
| Batch 1 — CGT cluster | 9 (3 sub-buckets × 3) | ✅ closed 2026-05-24 00:30Z (6 REWRITE + 3 REDIRECT-PROPOSED) |
| Batch 2 — CGT cluster continuation | 9 (3 sub-buckets × 3 — reporting collapse + reliefs + applied mechanics) | ⬜ dispatch pending |
| Phase 2 full-scale | TBD (~215 remaining residual after Batch 2 if all 9 ship 🟢) | Decision after Batch 2 review |

**Aggregate (cumulative through end of Batch 1):** 13 briefs drafted / 233 residual / ~220 remaining. **After Batch 2 (if all 9 ship as 🟢):** 22 briefs drafted / ~211 remaining.

---

## How to update this file safely

- **Each sub-agent / manager pass edits only the rows it claimed.** This is the source of concurrency safety.
- **One status change per edit** — set 🟡 when starting, 🟢 when done. Add the date.
- **Do NOT edit other batch rows.** Cross-batch coordination via `track2_site_wide_flags.md`.
- **Do NOT touch the trial-phase rows** unless you are the Track 2 manager.
- **Tracker edits to this file in main repo via ABSOLUTE PATH only** (per `NETNEW_PROGRAM.md §16.14`). NEVER as a branch commit.
