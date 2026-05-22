# Property Wave 2 — session launch prompts

Three paste-verbatim launch prompts. Open a fresh Claude Opus 4.7 session in each of the three Wave 2 worktrees, then paste the corresponding prompt as the first message.

Worktree paths:
- Session A: `C:/Users/user/Documents/Accounting-wt-property-wave2-a/`
- Session B: `C:/Users/user/Documents/Accounting-wt-property-wave2-b/`
- Session C: `C:/Users/user/Documents/Accounting-wt-property-wave2-c/`

Before pasting:
- Confirm `git status` in each worktree shows a clean tree on the right branch (`property-wave2-{a,b,c}`).
- Confirm `.env` and `optimisation_engine/competitor/_db.py` are present in each worktree (both are gitignored / untracked; the prep agent copied them in but verify).
- Confirm the manager-side watcher is armed on the three Q&A files in the main repo (`docs/property/wave2_questions_session_{A,B,C}.md`) — Monitor task polling every 20s for new `STATUS: open` lines. Persistent: true.
- Do NOT deploy. Wave 2 sessions write to `Property/web/content/blog/` and commit on their branches; deploy is held until the user explicitly authorises.

---

## Session A launch prompt (IHT)

```
You are Property Wave 2 Session A. Your assignment is 10 net-new IHT pages.

You are inside worktree C:/Users/user/Documents/Accounting-wt-property-wave2-a/ on branch property-wave2-a.

Read in this order (use absolute paths, all rooted at the main repo C:/Users/user/Documents/Accounting/):

1. C:/Users/user/Documents/Accounting/docs/sessions/property/WAVE2_SESSION_A_START_HERE.md (your task brief)
2. C:/Users/user/Documents/Accounting/docs/property/house_positions.md — full read, with particular attention to §9 (headline IHT) and §15 (Wave 2 IHT extension covering NRB/RNRB freezes, PETs/CLTs/taper, GROB under s.102 FA 1986, April 2026 BPR/APR cap, April 2027 pension IHT, April 2025 residence-based IHT regime)
3. C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md — §4 brief anatomy, §7 19-step workflow, §8.4 session-side watcher (new for Wave 2)
4. Your first brief: C:/Users/user/Documents/Accounting/briefs/property/wave2/iht-property-investors-decision-framework-2026-onwards.md (A1, the pillar — start here)
5. C:/Users/user/Documents/Accounting/docs/property/wave2_page_tracker.md (your assignments are in "Session A pages")

Critical discipline for Wave 2:
- Step 14 (commit on branch) MUST happen BEFORE step 16 (mark tracker ✅ done). Wave 1 had repeated drift here; Wave 2 calibrates the discipline up front.
- Session-side watcher: after appending any STATUS: open question to wave2_questions_session_A.md, spawn a Monitor task watching for the STATUS: answered flip, and keep working on another page or step while waiting. Pattern in the START_HERE doc and brief workflow.
- Anti-templating: 10 IHT pages must not read like 10 versions of the same page. Each brief's framing differentiator pins the distinct angle. Honour it.
- House positions §15 is "verified against legislation.gov.uk on 2026-05-22" stamped. If a competitor source contradicts a position, flag HOUSE_POSITION_CONFLICT in wave2_site_wide_flags.md and continue.
- Do NOT deploy. Per-page commits on your branch only. Orchestrator merges and deploys.

Begin with A1 (iht-property-investors-decision-framework-2026-onwards). Acknowledge with one short status line then start.
```

---

## Session B launch prompt (DTAs)

```
You are Property Wave 2 Session B. Your assignment is 10 net-new DTA (tax treaty) pages.

You are inside worktree C:/Users/user/Documents/Accounting-wt-property-wave2-b/ on branch property-wave2-b.

Read in this order (use absolute paths, all rooted at the main repo C:/Users/user/Documents/Accounting/):

1. C:/Users/user/Documents/Accounting/docs/sessions/property/WAVE2_SESSION_B_START_HERE.md (your task brief)
2. C:/Users/user/Documents/Accounting/docs/property/house_positions.md — full read, with particular attention to §10 (headline DTAs) and §16 (Wave 2 DTAs extension covering OECD Model 2017 article map, Art 6 / Art 13 detail, NRCGT statutory override over treaty allocations, Art 4 tie-breaker cascade, specific UK bilateral treaties US/France/Spain/India/UAE/Italy/Crown Dependencies, NRL is statutory not treaty)
3. C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md — §4 brief anatomy, §7 19-step workflow, §8.4 session-side watcher (new for Wave 2)
4. Your first brief: C:/Users/user/Documents/Accounting/briefs/property/wave2/tax-treaties-property-investors-treaty-framework-guide.md (B1, the framework pillar — start here)
5. C:/Users/user/Documents/Accounting/docs/property/wave2_page_tracker.md (your assignments are in "Session B pages")

Critical discipline for Wave 2:
- Step 14 (commit on branch) MUST happen BEFORE step 16 (mark tracker ✅ done).
- Session-side watcher: after appending any STATUS: open question to wave2_questions_session_B.md, spawn a Monitor task and keep working in parallel.
- Anti-templating: 10 DTA pages must not read like 10 country-by-country treaty walks. The framework pillar (B1), bilateral-applied (B2-B7), tie-breaker (B7+B8), credit relief (B9), and consolidated Crown Dependencies (B10) each have distinct angles. Honour each brief's framing differentiator.
- Cannibalisation watch: B1 (tax-treaties framework pillar) was retitled from "dtas-uk-property-non-resident-landlord-overview" to reduce token overlap with existing non-resident-landlord-scheme-uk-complete-guide (0.44 score). Frame B1 around treaty allocation + credit relief; link to the existing NRL guide for the statutory withholding side; do NOT re-cover NRL mechanics.
- Do NOT deploy. Per-page commits on your branch only.

Begin with B1 (tax-treaties-property-investors-treaty-framework-guide). Acknowledge with one short status line then start.
```

---

## Session C launch prompt (Expat / Leaving the UK)

```
You are Property Wave 2 Session C. Your assignment is 10 net-new Leaving the UK / expat landlord tax pages.

You are inside worktree C:/Users/user/Documents/Accounting-wt-property-wave2-c/ on branch property-wave2-c.

Read in this order (use absolute paths, all rooted at the main repo C:/Users/user/Documents/Accounting/):

1. C:/Users/user/Documents/Accounting/docs/sessions/property/WAVE2_SESSION_C_START_HERE.md (your task brief)
2. C:/Users/user/Documents/Accounting/docs/property/house_positions.md — full read, with particular attention to §5 (CGT including NRCGT timeline), §10 (DTAs headline — interacts with your work), AND §17 (Wave 2 Expat extension covering SRT cascade, split-year Cases 1-8, s.10A TCGA 1992 "5 years or less" temporary non-residence verified HMRC CG26540, NRCGT regime mechanics + 60-day reporting, NRL operational mechanics NRL1-6, April 2025 non-dom reform with 4-year FIG regime + 12% TRF)
3. C:/Users/user/Documents/Accounting/docs/property/NETNEW_PROGRAM.md — §4 brief anatomy, §7 19-step workflow, §8.4 session-side watcher (new for Wave 2)
4. Your first brief: C:/Users/user/Documents/Accounting/briefs/property/wave2/leaving-uk-landlord-12-month-pre-departure-checklist.md (C1, the pillar — start here)
5. C:/Users/user/Documents/Accounting/docs/property/wave2_page_tracker.md (your assignments are in "Session C pages")

Critical discipline for Wave 2:
- Step 14 (commit on branch) MUST happen BEFORE step 16 (mark tracker ✅ done).
- Session-side watcher: after appending any STATUS: open question to wave2_questions_session_C.md, spawn a Monitor task and keep working in parallel.
- Anti-templating: 10 expat pages must not read as 10 versions of "here's the SRT, fetch NRL1, file 60-day". The pillar (C1), test mechanics (C2 SRT, C3 split-year, C4 s.10A), agent-side (C5), destination pathways (C6 Dubai, C7 Australia), reform (C8 non-dom April 2025), return-arc (C9), and indirect-disposal NRCGT (C10) are each distinct.
- Cannibalisation watch: C5 (NRL agent-side) complements three existing landlord-side NRL pages on main — link out, do NOT re-cover landlord-side mechanics. C10 (NRCGT indirect-disposal) is genuinely new; existing NRCGT pages cover direct disposals only.
- Verified statute (2026-05-22): s.10A TCGA 1992 threshold is "5 years or less" of non-residence (not 4 years). HMRC CG26540 confirms.
- Do NOT deploy. Per-page commits on your branch only.

Begin with C1 (leaving-uk-landlord-12-month-pre-departure-checklist). Acknowledge with one short status line then start.
```

---

## After all three sessions are launched

- Arm the manager-side Monitor watcher in the main repo (per §8.3 of NETNEW_PROGRAM.md), polling `docs/property/wave2_questions_session_{A,B,C}.md` every 20s for new `STATUS: open` lines. Persistent: true.
- Spot-check each session after page 2-3 for anti-templating drift (matching openings, matching H2 outlines, matching FAQ phrasings).
- Watch tracker for the step-14-before-16 discipline holding. If a row shows `✅ done` without a corresponding commit on the branch, calibrate via M-note immediately.
- Wave 2 budget: ~30 pages × 3 sessions in parallel. Wave 1 ran ~31 pages across ~14 hours of elapsed time; Wave 2 should run similar.

## Stop conditions

- All 30 pages ✅ done and committed → `[SESSION_X_COMPLETE]` paragraphs in `wave2_site_wide_flags.md`. Manager merges branches to main, updates NETNEW_PROGRAM §3, queues any post-merge cleanups.
- A session reports "finished" while tracker shows <10/10: that means context-burn, not actual completion. User relaunches a fresh session with the same START_HERE + tracker; new session picks up the remaining `⬜ todo` rows.
