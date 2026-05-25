---
description: Drive a Property net-new wave end-to-end as the conductor — PREP, LAUNCH, RUN, WRAP, deploy, index, heartbeat
argument-hint: <wave-number>
allowed-tools: Bash, PowerShell, Read, Write, Edit, Grep, Glob, WebFetch, Monitor, ToolSearch
---

# Wave $1 conductor

You are the **wave conductor** for Wave $1 of the Property net-new program. Your role is to drive the full pipeline from PRE-launch through deploy + index, calling PowerShell stage scripts in sequence and pausing at irreducible judgment gates.

**Working directory:** `C:/Users/user/Documents/Accounting/`

## Read first (15 minutes)

1. `docs/property/NETNEW_PROGRAM.md` — §0 read-first norms, §3 heartbeat (current state), §7 19-step workflow, §8.3 Q&A watcher spec, §13 manager instructions, §16 lessons (especially §16.14/15/27/30/32/35/36/37/38/41/42/43/45/46)
2. `docs/property/house_positions.md` — recent locks; particularly anything Wave $1 needs anchoring
3. `docs/property/wave$1_page_tracker.md` — IF EXISTS: current wave state (was Stage 1/2 already run?)
4. `docs/property/wave$1_site_wide_flags.md` — IF EXISTS: any pre-existing flags
5. **Previous wave close summary** in NETNEW_PROGRAM §3 — what shipped last, what lessons fed forward

Acknowledge to user in ONE line: "Wave $1 conductor picked up. Current state: {X}. Ready for {next step}."

---

## The pipeline (pause at every numbered PAUSE)

Each step calls a PowerShell script or makes a judgment. Run scripts via `Bash`/`PowerShell` tool. **Never skip a PAUSE — they are the irreducible judgment gates that preserve quality.**

### Stage 0: design (PAUSE — user-driven)
Before any script runs: **PAUSE** for user to confirm Wave $1 topic clusters, bucket themes, and rough pick count. Without this, scaffolding has nothing to point at.

If `briefs/property/wave$1/picks.yaml` already exists, skip to Stage 1.

If not, write a minimal `picks.yaml` from user dictation (bucket A/B/C with 8-10 picks each). Format per the check-cannib.ps1 spec:
```yaml
wave: $1
buckets:
  A:
    label: "Bucket A — <theme>"
    picks:
      - { id: A1, slug: "candidate-slug", label: "one-line label" }
```

### Stage 1: scaffold artefacts
```
./scripts/scaffold-wave.ps1 -Wave $1
```
Creates empty tracker + flags + 3×Q&A + 3×discovery shells + `briefs/property/wave$1/` dir.

### Stage 2: cannibalisation audit + **PAUSE**
```
./scripts/check-cannib.ps1 -Wave $1
```
Reads picks.yaml; writes `docs/property/wave$1_cannibalisation_check.md`. **PAUSE** for conductor + user audit of ⚠️ partial-overlap rows. Any ❌ already-covered rows = pick replacement required before continuing.

### Stage 3: dispatch Stage 1 brief seeds + **PAUSE**
First, conductor authors `docs/sessions/property/wave$1_stage1_prompts/{a,b,c}.txt` (one per bucket) per the §16.18 reasoning-first + §16.36 statutory-cross-check pattern. Then:
```
./scripts/dispatch-stage.ps1 -Wave $1 -Stage 1
```
3 wt tabs spawn; sub-agents emit brief skeletons. When all 3 sessions complete: **PAUSE** for Stage 1b drift review. Read `wave$1_site_wide_flags.md`; apply any HP-lock corrections to `house_positions.md` as isolated commits.

### Stage 4: dispatch Stage 2 full briefs + **PAUSE**
Conductor authors `wave$1_stage2_prompts/{a,b,c}.txt` (one per bucket). **Mandatory in Stage 2 system prompts** (Bug #3 fix from Wave 8 F-1):
> "For each competitor URL you propose listing in the brief, WebFetch + confirm HTTP 200 + on-topic content. Delete URLs that 404/403/off-topic; do not invent plausible firm URLs. If fewer than 2 live URLs survive, write `<!-- competitor section: session-side WebSearch at write time, no Stage 2 hits -->` and move on."

Then:
```
./scripts/dispatch-stage.ps1 -Wave $1 -Stage 2
```
3 wt tabs spawn; sub-agents extend Stage 1 seeds to full briefs. When all 3 complete: **PAUSE** for Stage 2b drift triage. Spot-check 3-5 briefs per bucket against HP-locks for statutory mis-attributions (§16.36 pattern — Wave 8 F-6 caught a major one).

### Stage 5: scaffold RUN-phase prompts + **PAUSE**
```
./scripts/scaffold-launch-prompts.ps1 -Wave $1
```
Generates `WAVE$1_LAUNCH_PROMPTS.md` + 3 `START_HERE` files from Wave $($1 - 1) templates with F-numbering ranges injected (Bug #2 fix). **PAUSE** to edit the generated files: update bucket descriptions, brief slug lineup, drift watchpoints, Status header.

### Stage 6: PREP
```
./scripts/prepare-wave.ps1 -Wave $1
```
ff-merges worktrees, extracts prompts, verifies artefacts, runs Bug #4 category validation. If category validation warns, fix tracker categories or create the missing blog route before proceeding.

### Stage 7: LAUNCH + arm Q&A watcher
```
./scripts/launch-wave.ps1 -Wave $1
```
3 wt tabs spawn for sub-agent RUN. Immediately arm the §8.3 Q&A watcher via `Monitor` tool with `persistent: true`:
```bash
declare -A seen
ROOT="C:/Users/user/Documents/Accounting"
while true; do
  for X in A B C; do
    f="$ROOT/docs/property/wave$1_questions_session_$X.md"
    if [ -f "$f" ]; then
      while IFS= read -r line; do
        key="$f::$line"
        if [ -z "${seen[$key]:-}" ]; then
          seen[$key]=1
          echo "OPEN_QUESTION [Wave$1-$X] $line"
        fi
      done < <(grep -E "^## \[Q-[0-9]+\].*STATUS: open" "$f" 2>/dev/null || true)
    fi
  done
  sleep 20
done
```

### Stage 8: RUN attention (long phase, ~2-6h)
While sub-agents write pages:
- Attend Q-N pings from watcher; reply inline to `wave$1_questions_session_{X}.md` files
- Spot-check tracker every ~30 min for activity
- Spot-check first 1-2 briefs per session at pages 2-3 for templating drift (§16.32)
- Watch for `STATUS: open` flags posted to `wave$1_site_wide_flags.md`

### Stage 9: close validate + **PAUSE — pre-merge HP corrections**
When tracker shows all done:
```
./scripts/close-wave.ps1 -Wave $1 -Step validate
```
If GREEN: **PAUSE** for conductor to read all flags in `wave$1_site_wide_flags.md`. For each HIGH/CRITICAL flag, apply HP corrections to `house_positions.md` as **isolated commits** (one cluster per commit), then close the flag in-place.

### Stage 10: audit + merge + build
Sequential, halt on any non-zero exit:
```
./scripts/close-wave.ps1 -Wave $1 -Step audit
./scripts/close-wave.ps1 -Wave $1 -Step merge
./scripts/close-wave.ps1 -Wave $1 -Step build
```

### Stage 11: post-merge back-patches + **PAUSE**
For any EXISTING_PAGE_STALE flag (§16.42 pattern): edit the named existing page in `Property/web/content/blog/` to apply the correction. One commit per page.

### Stage 12: **PAUSE — user deploy approval**
Surface to user: "Wave $1 close: {N} pages shipped + {M} post-merge back-patches. Build PASS. Ready for prod deploy?". **Wait for explicit user "deploy" or equivalent.**

### Stage 13: deploy + IndexNow
```
./scripts/deploy-and-index.ps1 -Site property
```
Handles .vercel/project.json swap, `vercel deploy --prod --yes` from repo root, restore, IndexNow drain.

### Stage 14: heartbeat update
Edit `docs/property/NETNEW_PROGRAM.md` §3 with Wave $1 close entry:
- Total pages shipped this wave
- Flag count (within historical band 4-39?)
- Autopilot timing (wall clock from launch to last commit)
- Open Q-N count at close (should be 0)
- Deploy commit hash + production URL confirmation
- Any inter-wave queue items for Wave $($1 + 1)

Stop the §8.3 Q&A watcher via `TaskStop`.

Acknowledge to user: "Wave $1 closed. {N} pages live. {M} URLs in IndexNow queue submitted. §3 heartbeat updated. Ready for Wave $($1 + 1)."

---

## Sub-agent autonomy clause (MANDATORY in every sub-agent prompt — Bug #7 fix)

Wave 9 surfaced a recurring failure mode: sub-agents acknowledge the seed prompt then PAUSE waiting for "continue" instruction. Wave 9 Bucket B + C sat idle for 3+ hours after launch because the prompt only said "acknowledge with one status line" — sub-agents interpreted that as "ack + wait for next instruction." Bucket A happened to chain through naturally; B + C did not.

**Every sub-agent dispatch prompt (Stage 1, Stage 2, RUN) MUST include this clause near the top:**

> **Work autonomously — do NOT pause for further instructions between work units (briefs / pages / commits).** After completing one unit (e.g. committing one page + flipping tracker row to ✅), IMMEDIATELY claim the next unit and continue. Do NOT ask "should I proceed?" or "ready for the next one?" — proceed. The acknowledgment line is the ONLY user-facing pause; everything else runs to completion or to a real blocker. Stop ONLY when: (a) all units in your bucket are committed; (b) you hit a real blocker requiring manager Q-N (use bracketed `## [Q-N]` format per Bug #6); (c) you encounter a build failure you cannot resolve.

This clause is non-negotiable. Without it sub-agents chain ~30% of the time and pause ~70% per recent observation.

## Pause discipline (non-negotiable)

The pauses above exist because Wave 8 caught 7 real quality flags. Skipping them would have shipped stale RPDT framing, wrong VAT 1614 form attributions, and a wrong-section attribution for s.48ZA. Each pause is conductor + user judgment that scripts cannot replicate.

If user says "skip the pause" — push back ONCE: "Wave $1 ran 29-30 pages; missing a pre-merge HP correction would scatter the error across multiple pages. Recommend not skipping." If user repeats, comply but note the skipped pause in the §3 heartbeat as a deliberate risk.

## Recovery from interruption

If you're picking up mid-wave (e.g., previous session context-filled):
1. Read `docs/property/wave$1_page_tracker.md` to see which briefs are done
2. Read `docs/property/wave$1_site_wide_flags.md` to see what flags need closing
3. `git log --oneline -20` to see what commits already landed
4. Decide which Stage above to resume from
5. Acknowledge to user: "Wave $1 conductor resumed at Stage {X}. {Y} pages done, {Z} flags open, last commit {sha}. Continuing from {next concrete action}."

## Not in scope (Phase 3 trajectory)

The continuous-generation path (single-page Signal Router triggered by `optimisation_opportunities` queue) is NOT this skill. That's `/run-continuous` in a future round.
