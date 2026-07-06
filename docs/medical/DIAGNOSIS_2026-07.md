# Medical Diagnosis — 2026-07 (living state doc)

Program: full SEO/indexing/lead-paradox diagnosis of www.medicalaccounts.co.uk, then owner-gated fixes.
This file is the WRITE-AHEAD LEDGER and single source of truth for program state. A fresh agent with zero context resumes from HERE.

## ⚡ RESUME HERE
- Program phase: 2 (tool build + review). PHASE 1 COMPLETE (exit criteria met; see data-trust header in Findings).
- Current step(s): P2.t1 ∥ P2.t2 ∥ P2.t3 (Sonnet builders, declared fan-out)
- Next action: when all 3 builders report, run ONE Opus batch review (P2.r1-r3) against smoke outputs; on PASS, launch Phase 3 battery workflow.
- Blocked on: nothing
- Manager: Fable (quota-limited). Fallback: fresh Opus session — read this file top-to-bottom, then the plan file below. NEVER cross an [OWNER] gate autonomously.
- Plan file (the HOW/WHAT, incl. full tool specs + battery specs + guardrails): `C:\Users\user\.claude\plans\medical-site-seems-to-delegated-chipmunk.md`
- Handoff read order: (1) this file, (2) plan file, (3) `docs/medical/STATE.md` + `docs/medical/house_positions.md`, (4) memory LAST — this file overrides memory on any conflict.
- Do-not-redo rule: trust DONE/REVIEWED-PASS rows after running their one-line verify cmd (seconds). Re-run only IN-PROGRESS rows, from their "next action".

## 0. Invariants (never re-derive)
- GSC property (CANONICAL): `sc-domain:medicalaccounts.co.uk`. Site: https://www.medicalaccounts.co.uk. Vercel root `Medical/web`.
- THREE domain strings, keep separate: `medicalaccounts.co.uk` (current/correct) · `medicalaccountantsuk.co.uk` ("old" — legacy post canonicals pointed here until fixed 2026-06-17; owner says NEVER owned it → phantom-canonical hypothesis) · `medicalaccountants.co.uk` (dead typo string, bug in `optimisation_engine/snapshot/diagnostics.py` `_gsc_site_url_for`).
- `optimisation_engine/clients/gsc_page_client.py` is ALREADY CORRECT (fixed 2026-06-03). Do NOT "fix" it. Stale docs (`page_rewrite_tracker.md`, rewrite state "NOT committed" line) will tempt you — they are superseded.
- FLAT blog routing `/blog/<slug>`: NEVER run `slug_resolver --fix` or shared nested link auditors on medical. Use `scripts/medical_flat_link_audit.py`.
- NO DataForSEO spend for this program (medical out of rotation; $1.00 trial ceiling). Serper = fixed short list only; DDG free.
- Denominator warning: medical ≈ 238 sessions/30d. ALWAYS report absolute counts beside any rate; suppress rates with denominator < 20.
- Owner decisions LOCKED 2026-07-06: (1) STOP after Phase 4 synthesis — no fix applies until owner reads it; (2) every deploy is per-deploy owner sign-off; (3) owner never owned the old domain.
- Battery agents fail LOUD on 401/403/empty — never write an empty artifact as DONE.
- Raw artifacts → `.cache/medical_diag/` (uncommitted). Curated findings → this doc + `docs/medical/*.md` (committed).

## 1. Step ledger

Status enum: TODO / IN-PROGRESS / DONE / REVIEWED-PASS / BLOCKED / DROPPED.

| step | phase | status | owner-gated? | artifact | verify cmd (1 line) | next action |
|---|---|---|---|---|---|---|
| P0.a bootstrap state doc + .cache/medical_diag/ | 0 | DONE | no | this file | `git log --oneline -1 -- docs/medical/DIAGNOSIS_2026-07.md` shows a commit | — |
| P1.a staleness census + sites-row verify | 1 | DONE | no | `.cache/medical_diag/staleness.json` + `scripts/medical/00_staleness.sql` | `python scripts/_q.py scripts/medical/00_staleness.sql` re-runs census | — |
| P1.b fix `medicalaccountants` typo in optimisation_engine | 1 | DONE | no | diff in Decision log | `grep -rn "medicalaccountants\.co\.uk" optimisation_engine/` → NO match (md docs elsewhere may match; that's fine) | — |
| P1.c backfill + re-ingest (GSC queries+pages; fresh Bing snapshot; GA4 60d pass; bat log redirect) | 1 | DONE | no | `.cache/medical_diag/ingest_p1c.json` | `python scripts/_q.py scripts/medical/00_staleness.sql`: gsc max(date) ≥ today-3, bing snapshot ~today | — |
| P1.d dead-feed triage (GA4, bing_ai probe) + daily-task health | 1 | DONE | no | `.cache/medical_diag/feed_triage.json` | JSON exists w/ per-feed classification | — |
| P2.t1 build Tool 1 index-coverage sweep (`optimisation_engine/snapshot/index_coverage.py`) | 2 | IN-PROGRESS | no | tool file + smoke output | smoke run returns >0 URLs inspected | then P2.r1 |
| P2.r1 Opus review Tool 1 | 2 | TODO | no | verdict in Decision log | recorded invocation cmd runs clean | — |
| P2.t2 build Tool 2 lead attribution (`scripts/medical/40_lead_attribution.sql` + wrapper) | 2 | IN-PROGRESS | no | tool file + smoke output | smoke run returns ≥1 lead row with landing | then P2.r2 |
| P2.r2 Opus review Tool 2 | 2 | TODO | no | verdict in Decision log | recorded invocation cmd runs clean | — |
| P2.t3 build Tool 3 domain forensics (`scripts/medical/domain_forensics.py`) | 2 | IN-PROGRESS | no | tool file + smoke output | smoke run resolves DNS + ≥1 redirect chain | then P2.r3 |
| P2.r3 Opus review Tool 3 | 2 | TODO | no | verdict in Decision log | recorded invocation cmd runs clean | — |
| P3.b1 Google read (pre/mig/post segments, paired both-window) | 3 | TODO | no | `.cache/medical_diag/google_segments.json` + `docs/medical/google_read.md` | doc exists w/ data-window header | — |
| P3.b2 Bing read + IndexNow verify + SERP-feature diff | 3 | TODO | no | `bing_segments.json`, `indexnow_verify.json` + `docs/medical/bing_read.md` | doc exists w/ matched-window note | — |
| P3.b3 index-coverage sweep run (Tool 1, cache-bypass) | 3 | TODO | no | `index_coverage.json` + `docs/medical/index_coverage.md` | rollup shows urls_inspected==urls_total or quota_hit | feeds B4 |
| P3.b4 phantom-domain forensics run (Tool 3 + B3 canonicals) | 3 | TODO | no | `domain_forensics.json` + `docs/medical/old_domain_forensics.md` | doc exists w/ DNS + site: counts | — |
| P3.b5 lead attribution run (Tool 2) + Opus converting-pages judgment | 3 | TODO | no | `lead_attribution.json` + `docs/medical/lead_paradox.md` | doc has per-lead table + attributed-fraction | — |
| P3.b6 opportunity read (668-pool diff + serper/DDG head-query sample) | 3 | TODO | no | `serp_sample.json` + `docs/medical/opportunity_read.md` | doc exists w/ fixed query list recorded | — |
| P3.b7 on-page spot audit (schema via B3 rich results; inlink depth vs not-indexed buckets) | 3 | TODO | no | folded into `docs/medical/index_coverage.md` | inlink-vs-bucket correlation table present | — |
| P4.synth Opus synthesis + 5 adversarial skeptics → diagnosis + ranked fix backlog | 4 | TODO | no | §3 + §4 of this doc | §3 and §4 non-empty; doc committed | then STOP |
| P4.gate OWNER reviews diagnosis before any fix | 4 | TODO | **YES** | — | owner go recorded in Decision log | — |
| P5.* fixes (backlog populated by P4; deploys per-deploy [OWNER]) | 5 | TODO | per-class | — | — | — |

## 2. Findings ledger (headlines only; raw detail in artifacts)
- [P1.a] Feed census 2026-07-06: gsc_query_data 517 rows (04-01→06-22, STALE 14d) · gsc_page_performance 332 rows (04-01→06-22, STALE 14d; table uses column `niche` not site_key) · bing_query_data 741 rows (06-03→06-24, STALE 12d) · ga4_page_data 28 rows (dead since 05-16) · bing_ai_performance 0 rows. `sites` row VERIFIED correct (sc-domain:medicalaccounts.co.uk, active). GSC history starts 04-01 → pre-May-20 windows currently ABSENT; P1.c backfill from ~2026-02-01 is required for any pre/post claim. → `.cache/medical_diag/staleness.json`
- [P1.c] Feeds repaired 2026-07-06. **DATA-TRUST HEADER (cite in every downstream verdict):** gsc_query_data 610 rows + gsc_page_performance 403 rows, both 2026-04-01→2026-07-04 FRESH; **GSC is API-confirmed EMPTY before April 2026** (zero impressions pre-April — site young, NOT an auth artifact) so windows are: pre = Apr 1–May 19, mig(canonicals-wrong) = May 20–Jun 17, post = Jun 18–Jul 04, and any "pre" claim carries the thin-window caveat. bing_query_data 1,290 rows, snapshots 2026-06-03→2026-07-06 FRESH (rolling aggregates by design — NO pre-May-20 Bing data can ever exist; matched-window comparisons only). ga4_page_data restored: 196 rows 2026-04-18→2026-07-04 (outage was an expired OAuth token; estate-wide restored too). bing_ai_performance DEAD (404) — parked. Ingests all exit 0 → daily-task failure is INTERMITTENT; log redirect added to run_daily_snapshot.bat for next occurrence. → `.cache/medical_diag/ingest_p1c.json`
- [P1.d] Scheduler NOT the problem: task `SiteHealthDailySnapshot` fires daily (last 2026-07-05), but the Python run FAILS WITHIN-RUN (exit 0x800710E0): property reached 07-01, generalist 06-27, other sites stuck ~06-19/22 → per-site GSC credential/quota failure mid-loop; bat writes no log so exact exception unknown (fix: add `>> .cache\daily_run.log 2>&1`). GA4 = TRIVIALLY-REPAIRABLE (token was expired; agent refreshed it, live probe returned data; estate-wide all 4 sites stopped May 9–27; one ingest pass backfills). bing_ai_performance = CONFIRMED-DEAD (GetAiPerformance → HTTP 404, method name was a guess; harmless — swallowed; PARK until real endpoint known). → `.cache/medical_diag/feed_triage.json`

## 3. Synthesis (Phase 4 — Opus writes here)
(empty)

## 4. Fix backlog (Phase 4/5)
| fix id | root cause | severity | effort | confidence | class (engine/content/deploy/gsc-ui/spend) | owner-gated | signal-watched | status | watch window |
|---|---|---|---|---|---|---|---|---|---|

## 5. Decision log
- 2026-07-06: Program bootstrapped (Phase 0). Owner decisions locked: pause-at-synthesis; per-deploy gates; old domain never owned (phantom-canonical hypothesis primary).
- 2026-07-06: Declared fan-out: P1.a ∥ P1.b ∥ P1.d run in parallel (all Sonnet); P1.c serial after P1.b.
- 2026-07-06: Declared fan-out: P2.t1 ∥ P2.t2 ∥ P2.t3 (Sonnet builders) overlapped with P1.c (ingest running). Opus review will batch all 3 tools (P2.r1-r3 as one review agent).
- 2026-07-06 P1.b DONE: `optimisation_engine/snapshot/diagnostics.py:99` `_gsc_site_url_for['medical']` changed `sc-domain:medicalaccountants.co.uk` → `sc-domain:medicalaccounts.co.uk` (one line). Dead typo string now appears ONLY in .md docs (DIAGNOSIS/STATE/rewrite_program_state/solicitors STATE — historical notes, left intact). `medicalaccountantsuk.co.uk` has zero hits under optimisation_engine/. Uncommitted; commit with Phase 1 close-out.
