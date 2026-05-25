# Rolling-Architecture Manager Handover — paste verbatim into a fresh Claude Opus 4.7 session at C:/Users/user/Documents/Accounting/

**Last refreshed:** 2026-05-26 ~00:30 local (mid-Round 5 Tier-3 micro-run on MW1 Bucket A batch 1; sub-agent live in wt tab; monitor armed).

**START HERE:** Round 4 (rolling-orchestrator + reclaim + slicer artefact-scaffolding) is SHIPPED on main at commits `b913060` + `9b06934`. Round 5 (Tier-3 micro-run on MW1 Bucket A batch 1 = 6 picks) is IN-FLIGHT — a sub-agent is running in a wt tab titled `MW1-stage1-A-B1`, working in worktree `C:\Users\user\Documents\Accounting-wt-property-megawave1-a` on branch `property-megawave1-a`. The plan doc at `C:\Users\user\.claude\plans\we-re-in-plan-mode-parallel-shamir.md` is the canonical architectural plan. You are taking over mid-validation, NOT mid-design.

**Working directory:** `C:\Users\user\Documents\Accounting\` (Windows 11, PowerShell 5.1 + Bash both available via the harness).

**Acknowledge the user with one short message:** *"Rolling-arch manager picked up. State: Round 4 shipped (`9b06934` HEAD), Round 5 Tier-3 in-flight on MW1 Bucket A batch 1 (6 picks). Sub-agent live in wt tab `MW1-stage1-A-B1`. Plan at `~/.claude/plans/we-re-in-plan-mode-parallel-shamir.md`. Next gate: batch 1 done-marker → assess work-product → if clean, dispatch batch 2 with `--dangerously-skip-permissions` and expand to lanes B + C. Ready for next instruction."*

---

## 0. Read first, in this order (~20 minutes)

1. **This doc** end to end.
2. **The architectural plan:** `C:\Users\user\.claude\plans\we-re-in-plan-mode-parallel-shamir.md` — full 7-round build order, mega-wave slicing, batch-detection mechanism, failure modes, verification ladder. The plan is authoritative; this handover is the snapshot.
3. **`docs/property/NETNEW_PROGRAM.md` §3 heartbeat** — current Property net-new state (Wave 7 closed; W4 + W5 + W6 + W7 held for deploy). The rolling architecture is a NEW execution surface that runs in parallel to (and will eventually subsume) the wave-mode scripts.
4. **`sites/property.json` + `sites/property.megawave-affinity.json`** — single source of truth per site (paths, vercel, wave conventions) + the 3-mega-wave affinity grouping (MW1 SDLT family / MW2 Entity family / MW3 Compliance family).
5. **`scripts/rolling-orchestrator.ps1`** — read top-of-file doc block + the main loop (lines ~146-233). Then read its companions:
   - `scripts/slice-megawave.ps1` (one-time slicer per mega-wave)
   - `scripts/batch-claim.ps1` (atomic queue claim)
   - `scripts/batch-detect.ps1` (marker + tracker cross-check + safety net)
   - `scripts/batch-reclaim.ps1` (flip claimed-but-incomplete back to pending)
   - `scripts/make-batch-prompt.ps1` (template hydrator)
6. **`templates/rolling/{stage1,stage2,run}.tmpl.md`** — per-phase prompt templates. These inherit Wave 8/9 hand-authored content; substitution tokens documented in make-batch-prompt.ps1.
7. **`docs/property/megawave1_*.md`** — MW1 starter state (tracker / flags / 3× Q&A / 3× discovery; all scaffolded by slice-megawave.ps1's step 6/6).
8. **`briefs/property/megawave1/queue_A.jsonl`** — Bucket A queue (20 picks, 6 currently `status:claimed` by the live sub-agent under agent ID `c439efd2-f152-4f99-b474-4dd180d2ea6d`).

---

## 1. Critical norms before you do anything

- **The wave-mode scripts and the rolling orchestrator COEXIST.** `launch-wave.ps1 / dispatch-stage.ps1` continue working for ad-hoc small scopes (9-30 picks). `rolling-orchestrator.ps1` is the path for 60-pick mega-waves. Per-user decision documented in plan §"Coexistence decision".
- **§16.x discipline catalogue from NETNEW_PROGRAM is FULLY INHERITED by rolling sub-agents.** The templates at `templates/rolling/*.tmpl.md` already reference §16.35 (per-write statute verify), §16.36 (Stage 2 brief gate), §16.37 (absolute-path tracker edits), §16.45 (HP-lock cadence). Do NOT relax these in the templates.
- **PS 5.1 source-encoding bug bites multi-byte chars in `.ps1` source.** Em-dashes, `§`, emoji literals get mojibake'd by PS 5.1's ANSI parser. Pattern: construct symbols via codepoint (`[char]0x2705` for ✅, `[System.Char]::ConvertFromUtf32(0x1F501)` for 🔁, `[string][char]0x00A7` for §). Slice-megawave.ps1 and tracker-utils.ps1 already follow this. If you add a new PS script and the parser screams "Unexpected token", check for stray multi-byte chars first.
- **PS 5.1 parses `$Var:` as drive-qualified.** Use `${Var}:` in error messages. batch-reclaim.ps1 hit this 2026-05-26 (fixed at `9b06934`).
- **Wave 8 + Wave 9 are NOT deployed to prod.** Wave 9 was a 9-pick TEST wave proving the orchestration pattern; held for audit. Wave 8 was deployed to **preview** only (per task #13). Decisions on prod deploy are the USER's, not the rolling-arch manager's.
- **Tracker edits go to MAIN via ABSOLUTE PATH (§16.14 / §16.15 / §16.37).** Even sub-agents working in worktrees must edit `C:\Users\user\Documents\Accounting\docs\property\megawave1_page_tracker.md` directly (NOT the worktree's copy). This avoids the wave-9-class "tracker rows on worktree, never propagated to main" failure mode.
- **Stage 1 + Stage 2 briefs LIVE ON MAIN, not worktree branches.** Per `templates/rolling/stage1.tmpl.md` line 34: "write to main absolute path, NOT worktree relative path - main is the canonical brief location." Sub-agents commit briefs DIRECTLY TO MAIN via the absolute path in the prompt. Worktrees exist for the RUN phase only (page output to `Property/web/src/content/blog/<slug>.md`). The orchestrator's preflight currently requires a worktree even for Stage 1 — wasteful but not broken (architectural cleanup: relax preflight worktree-check when Phase = stage1/stage2). Confirmed working at Round 5 batch 1: 4 briefs committed to main with verified statute citations + anti-cannibalisation framing.
- **Q-N format must be bracketed `## [Q-N]` (§8.3 watcher fix, NETNEW_PROGRAM Bug #6).** Templates already do this.
- **§16.38 manager-prompt-drift discipline.** Any statutory citation YOU write into a sub-agent dispatch prompt or HP-lock must be verified at write time. Wave 9 caught 7 conductor errors in HP mini-locks via §16.36 brief-citation gate.

---

## 2. What's been done (Round-by-round state)

### Round 0 — Wave 9 closed (2026-05-25)
- Wave 9 TEST scope (9 picks across A/B/C) merged to main; F-5 + F-6 HP corrections applied (§22.X.4 s.48ZA + §22.X.5 2032 deferred repeal + §29.3 / §29.9 VAT1614 form mappings).
- close-wave.ps1 validate/audit/merge/build PASS. NOT deployed. Audit trail at `docs/property/wave9_*.md`.

### Round 1 — Site-config refactor (commit `27b5d7b`)
- `sites/property.json` is single source of truth per site (paths, vercel, wave conventions, naming templates).
- `scripts/_lib/site-config.ps1` exposes `Get-SiteConfig $Site` returning a hashtable. Token substitution helpers: `Resolve-SitePath`, `Resolve-WorktreePath`, `Resolve-BranchName`, `Get-WaveArtefactPath`.
- All 9 wave-mode scripts patched with `[string]$Site = 'property'` default + config lookups. Regression-tested via dry-run on Wave 9; output identical to pre-change baseline.

### Round 2 — Primitives + tests (commit `a99517c`)
- `scripts/batch-claim.ps1` (atomic claim, FileShare::None + retry).
- `scripts/batch-detect.ps1` (marker poll + tracker cross-check + safety net).
- `scripts/_tests/test-rolling-primitives.ps1` — 9 unit tests including parallel claim race; ALL 9 PASSED.

### Round 3 — Slicer + templates (commit `9ffb66e`)
- `scripts/slice-megawave.ps1` reads `docs/property/topic_gaps_final.md`, excludes shipped slugs, applies `sites/property.megawave-affinity.json` clustering, emits `picks.yaml` + `queue_{A,B,C}.jsonl`.
- `scripts/make-batch-prompt.ps1` hydrates `templates/rolling/<phase>.tmpl.md` with ~30 tokens.
- `templates/rolling/{stage1,stage2,run}.tmpl.md` — per-phase prompt templates inheriting Wave 8 + Wave 9 hand-authored content. Include Bug #2 F-range, Bug #3 URL liveness, Bug #6 bracketed Q-N, Bug #7 autonomy clause.

### Round 4 — Orchestrator (commits `b913060` + `9b06934`)
- `scripts/rolling-orchestrator.ps1` — per-lane orchestrator. Preflight (queue + tracker + worktree + signOff-flag for run-phase) → batch-claim loop → make-prompt → spawn wt tab via per-batch launcher.ps1 → batch-detect polling → batch-reclaim on incomplete. `-DryRun` walks queue in-memory (tracks simulated claims) so successive batches show distinct picks. `-MaxBatches N` caps iteration count for Tier-3 micro-runs. `-Phase run` refuses without `stage1b_signed_off.flag`.
- `scripts/batch-reclaim.ps1` — atomic reclaim. Flips claimed-but-incomplete rows back to pending; rows already ✅ in tracker stay claimed (they shipped). Same FileShare::None semantics as batch-claim.
- `slice-megawave.ps1` extended with step 6/6 artefact-scaffolding (tracker + flags + 3× Q&A + 3× discovery shells). All multi-byte symbols built via codepoint construction.
- **MW1 sliced:** 53 picks across A:20 B:18 C:15. Bucket A overflow 21 rolled to MW2 (cluster `SDLT — surcharges and reliefs` had 41 picks; capped at 20 per `MaxBucketSize`).
- **MW1 cannib check GREEN** (49 net-new / 4 partial / 0 covered) at `docs/property/wave1_cannibalisation_check.md`.

### Round 4 followup (commit `9b06934`)
- Two post-commit bugs caught during first live dispatch:
  - **Spawn-command bug:** Original inner cmd `claude --name '$sessionName' (Get-Content ...)` had both a bogus `--name` flag AND backtick-escaped `$p` that didn't survive Windows command-line serialization. Sub-agent received literal `$p` as first message; claude replied "The $p doesn't match anything I recognize". **Fix:** orchestrator now writes a per-batch launcher `.ps1` at `briefs/property/megawave1/_signals/launch_<batchId>.ps1` containing `$prompt = Get-Content -Raw '...'; claude $prompt`, spawned via `powershell -NoExit -Command "& 'launcher.ps1'"`.
  - **batch-reclaim parse bug:** `"Lock acquire failed after $MaxRetries: $_"` — PS 5.1 interpreted `$MaxRetries:` as drive-qualified variable. **Fix:** `${MaxRetries}:`.

### Round 5 — Tier-3 micro-run (BATCH 1 CLOSED CLEAN as of 2026-05-26 00:27:50)
- `git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave1-a -b property-megawave1-a` (created cleanly off main).
- `./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage1 -Lane a -MaxBatches 1 -BatchTimeoutMin 120` dispatched (after launcher fix). Spawned wt tab `MW1-stage1-A-B1`. First dispatch (pre-launcher-fix) was reclaimed via `batch-reclaim.ps1 -BatchId M1-A-B1`.
- 6 picks claimed by agent `c439efd2-f152-4f99-b474-4dd180d2ea6d`. Sub-agent at permission prompts; user click-through model for this Tier-3 validation batch.
- **As of last heartbeat (00:25):** 4 of 6 briefs committed to MAIN at commits `f7ad0d6` / `3b128c5` / `75a2acf` / `e82eb4c`. Tracker shows 4 ✅. Quality spot-check on first brief (`abolishment-of-multiple-dwelling-relief.md`) confirms verified statute citations (F(No.2)A 2024 s.7 with legislation.gov.uk URL verified 2026-05-26), anti-cannibalisation framing citing Wave 9 deep page + Welsh cross-border page, HP refs to §1.H Wave 9 lock + §1.A Wave 7 lock. Production-quality.
- **NOTE: My Round 4 followup commit `9b06934` is interleaved between sub-agent commits 2 and 3.** This is harmless — sub-agent's commits are individually atomic; my commit touched orchestrator scripts only. If close-tooling later wants a contiguous range, filter by commit message prefix `MegaWave 1 Stage 1 A:`.
- Monitor task running on conductor side; heartbeat every 90s shows brief count (against MAIN path) / commit count / tracker ✅+🟦 / flags / Q-N. **Monitor v1+v2 had wrong grep paths; v3 (`task b8i0vnqeb`) checks main correctly.**

**Batch 1 close summary (00:27:50, all acceptance criteria met):**
- **6 briefs on main** at SHAs `f7ad0d6` / `3b128c5` / `75a2acf` / `e82eb4c` / `6fcbdb5` / `c66581b` (+ tracker-flip `3818c2c` for A6). Wall-clock ~12 min from launcher-fix dispatch to marker write = ~2 min per pick.
- **Tracker:** 6 ✅, 0 🟦, 0 ⬜, 0 ⚠.
- **Flags:** zero raised. **Q-N:** zero raised. Both indicate the prep + template was clean.
- **Quality spot-check (pick 6 `a-complete-guide-to-stamp-duty-relief-for-probate-properties`):** Cites FA 2003 Sch 3 para 3A + Sch 4 para 4 + Sch 6A + Sch 4ZA para 16, each with legislation.gov.uk verification URLs marked for Stage 2 verify. Names the complementary existing site page (`sdlt-on-probate-property-transfers`) and explicitly distinguishes lane (reliefs-led vs transfer-type-led). Surfaces a NEW HP-lock candidate `§1.O "Probate SDLT reliefs and Sch 4ZA carve-out"` for Stage 1b conductor decision. 6 relief architectures itemised. Target length 2,600-3,200 words. Production-grade — comparable to Wave 9 hand-authored briefs.
- **Marker JSON written cleanly** at `briefs/property/megawave1/_signals/batch_M1-A-B1_done.json`. Orchestrator detected → exited per `-MaxBatches 1` cap.

**Round 5 next steps (waiting on user decision):** see Section 3 decisions #1 + #2 + #3. Recommend: flip orchestrator launcher template to `claude --dangerously-skip-permissions $prompt` (worktree isolation + read-only main-tracker discipline provides safety bound), then dispatch batch 2 (next 6 Bucket A picks). If batch 2 also clean, expand to lanes B + C in parallel.

---

## 3. Open decisions (numbered, one-line summary)

| # | Decision | Notes |
|---|---|---|
| 1 | **Tier-3 acceptance criteria for batch 1?** | Plan §"Tier 3" requires "all 6 brief seeds committed clean + tracker ✅ + zero conductor escalation". Practical bar: 6 briefs in `briefs/property/megawave1/`, 6 commits on `property-megawave1-a`, 6 ✅ table rows on the tracker, < 3 flags, < 1 Q-N. If clean, dispatch batch 2 WITH `--dangerously-skip-permissions` (next decision). |
| 2 | **Switch to `--dangerously-skip-permissions` for batches 2+?** | The whole "closed loop" goal requires this. Bounded blast radius: sub-agents run in isolated worktree on feature branch, no main writes outside tracker, no `git push`. Recommend YES if batch 1 work product is clean. Update orchestrator's launcher template to: `claude --dangerously-skip-permissions $prompt`. |
| 3 | **Expand to lanes B + C in parallel?** | After Stage 1 Bucket A is clean, plan says all 3 lanes go in parallel. Need to create 2 more worktrees (`-wt-property-megawave1-b`, `-wt-property-megawave1-c`) + run two more orchestrator instances. |
| 4 | **Stage 1b HP-lock review** | Manual conductor gate. After all 3 lanes write their `_signals/lane_{A,B,C}_done.flag`, conductor reads the 53 brief seeds, writes HP-lock entries to `docs/property/house_positions.md`, then `touch _signals/stage1b_signed_off.flag` to unlock Stage 2. The `rolling-orchestrator.ps1 -Phase run` refuses without this flag (preflight check). |
| 5 | **MW2 + MW3 sequencing** | Per plan, mega-waves run sequentially (MW1 close → MW2 slice + run → MW3). MW1 overflow (21 SDLT-relief picks) rolls into MW2. MW2 affinity already authored in `sites/property.megawave-affinity.json` (Entity/incorporation family: 27+25+7+9+20+7+4+3+6+5 = ~113 picks; will need cap). |
| 6 | **Wave 8 + Wave 9 prod deploy** | Held per user instruction. Wave 8 preview deployed (task #13). Wave 9 NOT deployed. Both await user-triggered `deploy-and-index.ps1 -Site property`. NOT a rolling-arch manager decision — flag to user when surfaced. |
| 7 | **NETNEW_PROGRAM §3 heartbeat update** | Plan §"Sequencing" + Property §3 currently say "Wave 7 closed; Wave 8 in prep". Once MW1 lands, §3 needs a new entry: "MW1 closed; 53 net-new shipped via rolling orchestrator; total net-new on main: 209 + 28 (W7) + 53 (MW1) = 290". Pattern for the entry is in §3 already. |

---

## 4. Workflow patterns

### Rolling-orchestrator dispatch (per lane)

```powershell
# One-time per mega-wave:
./scripts/slice-megawave.ps1 -MegaWave N                    # emits picks.yaml + queue_{A,B,C}.jsonl + tracker/flags/Q&A/discovery shells
./scripts/check-cannib.ps1 -Wave N -Site property -PicksYaml "...\megawave{N}\picks.yaml"

# Worktrees: orchestrator preflight requires one per lane (current limitation).
# Stage 1/2 briefs commit DIRECTLY TO MAIN regardless, so the worktree-branch
# stays empty until RUN phase. Create them early to satisfy preflight:
git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave{N}-a -b property-megawave{N}-a
git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave{N}-b -b property-megawave{N}-b
git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave{N}-c -b property-megawave{N}-c

# Per lane (3 parallel powershell instances OR background jobs):
./scripts/rolling-orchestrator.ps1 -Wave N -Phase stage1 -Lane a            # all batches in lane A
./scripts/rolling-orchestrator.ps1 -Wave N -Phase stage1 -Lane b            # all batches in lane B
./scripts/rolling-orchestrator.ps1 -Wave N -Phase stage1 -Lane c            # all batches in lane C

# Conductor gate:
# After all 3 lanes write _signals/lane_{X}_done.flag, conductor does Stage 1b HP-lock review
# Then: New-Item briefs/property/megawave{N}/_signals/stage1b_signed_off.flag -Type File

# Then Stage 2 + RUN, same pattern with -Phase stage2 and -Phase run.
# Stage 2 briefs ALSO commit to main (extend the Stage 1 seed). RUN-phase
# page output goes to the worktree branch.

# Close-out (RUN-phase merge only — Stage 1/2 briefs are already on main):
./scripts/close-wave.ps1 -Wave N -Step megawave-batch-merge
./scripts/close-wave.ps1 -Wave N -Step validate
./scripts/close-wave.ps1 -Wave N -Step audit
./scripts/close-wave.ps1 -Wave N -Step build
```

### Per-batch lifecycle (inside the orchestrator loop)

1. Atomic claim N pending rows from `queue_<Lane>.jsonl` (FileShare::None lock).
2. Hydrate `templates/rolling/<phase>.tmpl.md` → `_signals/prompt_<batchId>.txt`.
3. Write per-batch launcher `_signals/launch_<batchId>.ps1` (loads prompt + invokes claude).
4. Spawn wt tab `MW{N}-{phase}-{Lane}-B{n}` running the launcher.
5. Poll every 30s for `_signals/batch_<batchId>_done.json` marker.
6. Cross-check marker against tracker (every slug has ✅).
7. On complete → loop to next batch. On incomplete + timeout → `batch-reclaim` + exit with WARNING.

### Monitor (conductor-side)

```bash
until [ -f "C:/Users/user/Documents/Accounting/briefs/property/megawave{N}/_signals/batch_<id>_done.json" ]; do
  sleep 90
  briefs=$(ls C:/Users/user/Documents/Accounting-wt-property-megawave{N}-<lane>/briefs/property/megawave{N}/*.md 2>/dev/null | wc -l)
  commits=$(git -C C:/Users/user/Documents/Accounting-wt-property-megawave{N}-<lane> log property-megawave{N}-<lane> ^main --oneline 2>/dev/null | wc -l)
  done_rows=$(grep -cE "^\| ✅" "C:/Users/user/Documents/Accounting/docs/property/megawave{N}_page_tracker.md" 2>/dev/null)
  inprog_rows=$(grep -cE "^\| 🟦" "C:/Users/user/Documents/Accounting/docs/property/megawave{N}_page_tracker.md" 2>/dev/null)
  echo "[$(date +%H:%M:%S)] briefs:$briefs/<batch_size> commits:$commits tracker:${done_rows}✅/${inprog_rows}🟦"
done
```

**Critical:** the grep MUST be `^\| ✅` (table-row only). Plain `✅` will false-positive on the status-legend line and lie to you about progress.

---

## 5. Key files reference

### Manager-owned (do not let sub-agents edit)
- `docs/property/NETNEW_PROGRAM.md` — §3 heartbeat is manager-write-only.
- `docs/property/house_positions.md` — HP edits at Stage 1b gate by conductor.
- `sites/property.json` + `sites/property.megawave-affinity.json` — schema + clustering authored by conductor.
- This handover doc.

### Sub-agent-owned (per-batch worktree commits)
- `briefs/property/megawave{N}/<slug>.md` — Stage 1 seeds → Stage 2 extensions.
- `Property/web/src/content/blog/<slug>.md` — RUN phase blog page output (NOT used at Stage 1 / Stage 2).
- Per-bucket branch commits on `property-megawave{N}-<lane>`.

### Cross-cutting (read by templates)
- `docs/property/megawave{N}_page_tracker.md` — sub-agents flip rows; conductor reads to verify.
- `docs/property/megawave{N}_site_wide_flags.md` — sub-agents append F-flags in their per-bucket range (A: F-1..49, B: F-50..99, C: F-100..149).
- `docs/property/megawave{N}_questions_session_{A,B,C}.md` — sub-agents append `## [Q-N]` for real blockers.
- `docs/property/megawave{N}_discovery_log_session_{A,B,C}.md` — sub-agents append discoveries.

### Read-only references for sub-agents
- `docs/property/NETNEW_PROGRAM.md` (§7 19-step workflow + §16.x discipline catalogue).
- `docs/property/house_positions.md` (per-bucket HP cluster pointers).
- Stage 2 briefs at `briefs/property/megawave{N}/<slug>.md` (during RUN phase).

---

## 6. Known landmines

- **PS 5.1 multi-byte source-encoding bug** — section 1 above. Always build symbols via codepoint.
- **PS 5.1 `$Var:` parse trap** — use `${Var}:`.
- **`ConvertTo-Json -AsArray` missing in PS 5.1** — batch-claim.ps1 manually brackets single-element arrays.
- **`& npm run build` mangles argv on PS 5.1** — close-wave.ps1 uses `& npm.cmd run build`.
- **`2>&1` on native exes under PS 5.1 wraps stderr as ErrorRecord** — close-wave merge step dropped `2>&1` + checks `$LASTEXITCODE` directly.
- **`sites/*.json` was gitignored** — `.gitignore` line 34 generic `*.json`; negation `!sites/*.json` added.
- **Get-Content displays UTF-8 as Windows-1252 mojibake** — file is fine, display is wrong. Use Read tool (UTF-8 by default) to verify file content.
- **Worktree creation is heavy** (~4624 files updated) — ~30s on first create. Plan for this if dispatching all 3 lanes back to back.
- **wt-tab `claude` CLI has NO `--name` flag** — use the wt tab `--title` for identification.
- **Sub-agent permission prompts** — without `--dangerously-skip-permissions`, every Read/Edit/WebFetch/Bash needs user approval. 6-pick × 19-step × ~5 tool-calls = ~570 approval clicks per batch. Switch to skip-permissions after Tier-3 validation; the worktree isolation provides the safety bound.
- **Template path inconsistency** — `templates/rolling/stage1.tmpl.md` line 34 instructs "write to main absolute path", but line 83 has relative-path `git add briefs/...`. Sub-agent reconciles by cd-ing to main repo OR using `git -C C:\Users\user\Documents\Accounting` for add+commit. Both produce correct commits on main. Worth tidying the template to be consistent (use absolute paths throughout) but not currently broken.
- **Conductor must check MAIN's brief path** (not the worktree's) when monitoring Stage 1/2 progress. The brief files land in `C:\Users\user\Documents\Accounting\briefs\property\megawave{N}\<slug>.md`, NOT `Accounting-wt-property-megawave{N}-a\briefs\...`. The worktree branch shows ZERO new commits during Stage 1/2 by design.
- **Background tasks interleaving with sub-agent commits on main** — if you commit on main while a sub-agent is committing (e.g. unrelated script fixes), your commit lands in between the sub-agent's commits. Harmless but messy if close-tooling expects a contiguous range. Avoid main commits during active mega-wave runs OR filter close-tooling by commit-message prefix.

---

## 7. What this program does NOT do

- Does NOT touch Wave-mode artefacts (`wave*_page_tracker.md`, `wave*_site_wide_flags.md`, Wave 4-9 brief files). Wave-mode is a parallel program.
- Does NOT deploy to prod. `deploy-and-index.ps1` is user-triggered; Wave 8/9/MW1 deploys all on hold.
- Does NOT modify `docs/property/topic_gaps_final.md` (canonical pool source).
- Does NOT touch the optimisation engine pipeline (`optimisation_engine/blog_generator/`) — that's the queue-driven path, distinct from this orchestrator.
- Does NOT auto-promote HP-lock proposals from sub-agents. Conductor judgment at Stage 1b is irreducible.

---

## 8. Common mistakes to avoid

1. **Don't trust plain `grep ✅`** for tracker progress — false-positives on the status-legend line. Use `^\| ✅`.
2. **Don't relax the §16.36 brief-citation gate** in `templates/rolling/stage2.tmpl.md`. It's the most load-bearing piece — 7 conductor HP errors caught at Wave 9.
3. **Don't add em-dashes / `§` / emoji literals** to PS scripts. Use codepoint construction.
4. **Don't commit on the wrong branch.** Sub-agents are in worktrees on feature branches; tracker edits go to MAIN (absolute path).
5. **Don't dispatch `-Phase run` without `stage1b_signed_off.flag`** — orchestrator refuses preflight, but don't try to bypass. Conductor judgment at Stage 1b is non-negotiable.
6. **Don't dispatch all 3 lanes simultaneously on Tier-3 batch 1.** Validate Bucket A first; expand to B+C only after work product is clean.

---

## 9. The user

- **Email:** jeff@emplifex.com.
- **Style:** terse, checkpoint-driven; deeply prefers infrastructure / engine work over per-page hand-crafting (per `feedback_infrastructure_first.md`).
- **Strong preference:** "press go and we're just generating" (per multiple session quotes captured in memory). The whole rolling architecture exists to deliver this.
- **No em-dashes in user-facing copy** (`feedback_no_em_dashes.md`).
- **All five niche sites are lead-gen handoffs to partner firms** (`agency_lead_gen_model.md`) — no pricing, no client names.

---

## 10. Cross-program awareness

- **Wave-mode state:** Waves 1-7 (209 net-new pages) on main; W1-3 deployed; W4-7 held. Wave 8 (30 picks) merged + preview-deployed only. Wave 9 (9-pick TEST) merged, NOT deployed. NETNEW_PROGRAM.md §3 has authoritative state.
- **Track 2 (legacy rewrite):** 22 briefs DRAFTED + EXECUTED across Trial + Batch 1 + Batch 2 + Phase 3; ~211 residual remaining. Canonical pickup at `docs/property/TRACK2_MANAGER_PICKUP.md`. This program is parallel to both Wave-mode AND the rolling architecture.
- **The §16 lessons cumulative count is now ~46** (§16.1 through §16.46). All inherit into rolling sub-agent templates by reference, not by paste.
- **Bill-vs-enacted-Act drift catches: 13+ consecutive** across both programs. The §16.27 / §16.30 / §16.35 / §16.36 / §16.38 / §16.40 / §16.42 / §16.45 pattern family is firmly load-bearing. Rolling sub-agents inherit this via stage1/stage2/run templates.

---

## 11. Next session expected actions

1. **Read this doc + the plan** (~20 min).
2. **Check Round 5 batch 1 status:** look for `briefs/property/megawave1/_signals/batch_M1-A-B1_done.json` marker + count files in `Accounting-wt-property-megawave1-a/briefs/property/megawave1/`.
3. **If batch 1 complete + clean:** decision #1 + #2 + #3 above (acceptance / switch-to-skip-perms / expand-to-B+C).
4. **If batch 1 incomplete:** `batch-reclaim` + investigate launcher / prompt / permission flow.
5. **Steady-state:** drain MW1 across all 3 lanes Stage 1 → Stage 1b → Stage 2 → RUN → close. Then MW2, then MW3.
6. **End-state (~1.5-2 weeks):** Property pool drained; user gates each mega-wave deploy. Then Round 7 (cross-site bootstrap, Dentists first).
