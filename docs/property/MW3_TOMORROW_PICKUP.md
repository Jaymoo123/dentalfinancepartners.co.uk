# MW3 — Tomorrow's manager pickup

**Status as of 2026-05-27 late evening:** MW3 Stage 2 CLOSED. Stage 2b + RUN pending.

## What just happened today

1. **MW2 closed + back-patched.** 60 pages on main + ~20-page F-102 back-patch sweep. Build green. Held for deploy.
2. **MW3 prepped:** sliced + cannib-checked + 6-pick swap to fix already-covered overlaps + worktrees up.
3. **MW3 Stage 1 closed** at ~20:40 — 60 seed briefs across A/B/C.
4. **MW3 Stage 1b sign-off** at commit `53b3eba` — 5 new HP-locks added (§19.18 SI migration, §19.19 points-reset, §19.20 CT figures, §27.10 disguised rem, §31.B commonhold, §36 prof conduct, §37 share-exchange) + 2 critical drift catches verified (F-1 CT figures + F-3 SI 2021/1076 revocation, both WebFetch-verified against legislation.gov.uk).
5. **F-3 back-patch** applied to single hit (`essential-bookkeeping-tips-for-sole-traders.md`). F-1 was clean.
6. **MW3 Stage 2 closed** at ~23:46 — 60 brief extensions, all markers + lane-done flags on main.

## Where you start tomorrow

### main HEAD at session start
- Run `git log --oneline -5` and expect `5a34d5c` ish to be the top commit ("MW3 Stage 2 M3-B-B4 batch-done marker").

### Open flags from Stage 2 (manager-decide at Stage 2b)
- **F-104** — BRIEF_DRIFT, SI title mis-citation, Bucket C, raised by M3-C-B1 Stage 2 sub-agent.
- **F-105** — BRIEF_DRIFT, LURA 2023 section mis-citation (second-home council-tax premium), Bucket C, raised by M3-C-B1 Stage 2 sub-agent.

Read each in `docs/property/megawave3_site_wide_flags.md`. Verify against legislation.gov.uk via WebFetch where needed. Decide: HP refinement, brief-side correction, or site-wide back-patch.

### Stage 2b sign-off

After deciding on F-104 + F-105:

```
> briefs/property/megawave3/_signals/stage2b_signed_off.flag
```

Body should record F-104 + F-105 resolution + any HP updates.

### RUN dispatch

Same MW2 pattern. Three things to prep first:

1. **Reset queues to pending.** Python one-liner pattern in earlier MW2 RUN dispatch (status="claimed" → "pending", strip `agent_id` + `claimed_at`). All three queue_*.jsonl files.
2. **Archive Stage 2 markers.** Move every `batch_M3-*_done.json` (without `_stage*_` infix) → `batch_M3-*_stage2_done.json`. Same for lane-done flags → `lane_*_done.stage2.flag`.
3. **ff-merge worktrees.** `cd Accounting-wt-property-megawave3-{a,b,c}; git merge --ff-only main` for each.

Then dispatch:

```powershell
foreach ($lane in @('a','b','c')) {
  Start-Process wt -ArgumentList @(
    'new-tab', '-d', 'C:\Users\user\Documents\Accounting', '--title', "MW3-RUN-$lane",
    '--', 'powershell', '-NoExit', '-Command',
    "& 'C:\Users\user\Documents\Accounting\scripts\rolling-orchestrator.ps1' -Wave 3 -Phase run -Lane $lane"
  )
  Start-Sleep -Milliseconds 500
}
```

Expected wallclock: 2-3h based on MW2 reference.

### Known drift patterns to expect at RUN

- **`cwd=worktree` is by design at RUN** (per drift-bug-fix in commit `1dba3d8`). Sub-agents commit page files to worktree branches. Manager merges per batch as marker arrives.
- **`_stage2_done.json` filename drift** is likely (3× recurrence at MW3 Stage 2). Rename to `_done.json` when seen.
- **Some sub-agents may write `_RUN_done.flag` YAML instead of canonical JSON** (one MW2 instance). Synthesise canonical JSON if seen.
- **Tracker desync** is possible (one MW3 Stage 1 instance on A-B3). Flip rows ✅ if batch-detect blocks on safety net.

### After RUN closes — deploy decision

Once all 3 RUN lane-done flags are on main:
- 60 MW2 + 60 MW3 = 120 pages held for deploy.
- Run `cd Property/web && npm run build` to verify (should be ~732 routes).
- Per user's earlier "hold + batch" preference: tomorrow may be the right time to deploy if the user wants it.
- Deploy via Vercel CLI from repo root (NOT `cd Property/web`): see `memory/vercel_cli_deploy_workflow.md`.

## Pointer files

- `docs/property/NETNEW_PROGRAM.md` §3 — full current-state narrative.
- `docs/property/house_positions.md` — all HP locks (latest additions: §19.18-§19.20, §27.10, §31.B, §36, §37).
- `docs/property/megawave3_page_tracker.md` — 60 picks with ✅ status.
- `docs/property/megawave3_site_wide_flags.md` — F-flags + resolutions.
- `briefs/property/megawave3/_signals/stage1b_signed_off.flag` — Stage 1b decisions log.
- Memory: `rolling_architecture_state.md` (updated tonight for tomorrow).
