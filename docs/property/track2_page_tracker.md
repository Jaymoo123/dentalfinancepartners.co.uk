# Track 2A — Legacy rewrite brief tracker

**Last consolidated update:** 2026-05-23 PM (Batch 1 prep — schema upgrade + Wave 5 shipped reconciliation + Wave 6 candidate section refresh).

**Total pages in residual universe:** 233 (recalculated after Wave 5 merge: 436 total blog .md files − 31 W1 − 30 W2 − 30 W3 − 30 W4 − 30 W5 − 52 rewrites)
**Trial phase target:** 3 structure-only briefs + 1 gold-reference brief (closed)
**Batch 1 target:** 9 CGT-cluster briefs in 3 sub-buckets of 3 (this batch)
**Phase 2 full-scale target:** TBD (separate decision after Batch 1 review)

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

## Universe at a glance (post-Wave-5 merge)

| Pool | Count | Source |
|---|---|---|
| Total blog .md on `main` | 436 | `Property/web/content/blog/*.md` (Wave 5 merged 2026-05-23) |
| Wave 1 net-new (SDLT + LtdCo + VAT/FIC/ATED) | 31 | `track1_page_tracker.md` |
| Wave 2 net-new (IHT + DTAs + Expat) | 30 | `wave2_page_tracker.md` |
| Wave 3 net-new (ATED + MTD ITSA + RRA 2025) | 30 | `wave3_page_tracker.md` |
| Wave 4 net-new (LtdCo+FIC + MTD ops + IHT estate) | 30 | `wave4_page_tracker.md` |
| Wave 5 net-new (VAT + Devolved + Form 17) | 30 | `wave5_page_tracker.md` (shipped 2026-05-23) |
| 2026-05-21 rewrites | 52 | `page_rewrite_tracker.md` |
| **Residual legacy (Track 2A pool)** | **233** | 436 − 31 − 30 − 30 − 30 − 30 − 52 |
| **Wave 6 in-flight candidates** | **30** | `wave6_page_tracker.md` — VOLATILE; 10 shipped on feature branches, 20 in flight |

## Summary (across all batches)

| Phase | Briefs drafted | Status |
|---|---|---|
| Trial | 4 (3 structure-only + 1 gold-reference) | ✅ closed |
| Batch 1 — CGT cluster | 9 (planned: 3 sub-buckets × 3) | ⬜ dispatch pending |
| Phase 2 full-scale | TBD (~220 remaining residual after Batch 1) | Decision after Batch 1 review |

**Aggregate (cumulative):** 4 briefs drafted / 233 residual / ~229 remaining after Batch 1 (if all 9 ship as 🟢).

---

## How to update this file safely

- **Each sub-agent / manager pass edits only the rows it claimed.** This is the source of concurrency safety.
- **One status change per edit** — set 🟡 when starting, 🟢 when done. Add the date.
- **Do NOT edit other batch rows.** Cross-batch coordination via `track2_site_wide_flags.md`.
- **Do NOT touch the trial-phase rows** unless you are the Track 2 manager.
- **Tracker edits to this file in main repo via ABSOLUTE PATH only** (per `NETNEW_PROGRAM.md §16.14`). NEVER as a branch commit.
