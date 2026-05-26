# Round 6 + 7 Sequencing — Property pool drain → cross-site

**Created:** 2026-05-26 (post MW1 Stage 1 close)
**Authoritative against:** `~/.claude/plans/we-re-in-plan-mode-parallel-shamir.md`
**Pickup pattern:** Read this doc + `MEMORY.md` rolling architecture entry. They are the canonical state.

---

## Status snapshot (2026-05-26 ~12:00)

- **MW1 Stage 1 CLOSED CLEAN** — 53/53 ✅ shipped to main across A/B/C lanes
- **5 high-quality F-flags + 1 Q-N** raised, awaiting conductor Stage 1b review
- **3 worktrees preserved:** `Accounting-wt-property-megawave1-{a,b,c}`
- **Launcher pattern locked:** `claude --allow-dangerously-skip-permissions --dangerously-skip-permissions -- $prompt` (commit `852cc0e`)
- **batch-detect.ps1 substring bug FIXED:** commit `f01d3ef`
- **Plan rounds 0-5 closed.** Round 6 in flight. Round 7 not started.

---

## Round 6 — Property pool drain

### MW1 remaining stages (53 picks)

Sequenced; each stage's output gates the next.

#### Stage 1b — HP-lock review **(CONDUCTOR — ~60-120 min irreducible)**

Inputs to read:
- All 53 brief seeds at `briefs/property/megawave1/*.md`
- 5 F-flags at `docs/property/megawave1_site_wide_flags.md`
- 1 Q-N at `docs/property/megawave1_questions_session_A.md`

Decisions to make:
1. **F-1 BRIEF_DRIFT** — Apply verbatim correction to `briefs/property/megawave1/abolishment-of-multiple-dwelling-relief.md` (Q5 wording + Framing differentiator paragraph). Wording is in the flag entry. This is the Wave-9 brief A1 mis-stating Scottish LBTT MDR position.
2. **F-50 CROSS_BUCKET** — Sanity-check B9 against the Wave 5 page it soft-cannibalises. Decide: differentiate, redirect, or kill.
3. **F-51 CROSS_BUCKET** — Decide whether B12 stays in Bucket B (lane-misclustered) or moves. Implication for Stage 2.
4. **F-100 HOUSE_POSITION_EXTENSION** — Write §30 Council-tax framework HP-lock (or extend existing structure). Anchors lane C picks.
5. **F-101 HOUSE_POSITION_EXTENSION** — Write Lease-extension / enfranchisement HP-lock (§1.K-candidate or new §X). Anchors related lane B/C picks.

Independently raised by A7 brief (not in flag file):
6. **§1.K** — First-Time Buyers' Relief HP-lock (FA 2003 s.57B + Sch 6ZA, current £300k/£500k thresholds + 1 April 2025 reversion + joint-purchase + bare-trust mechanics). Anchors A7+A10+A11+A12 cluster. Verified statute citations are in A7's seed brief.

Output:
- HP-lock entries committed to `docs/property/house_positions.md`
- F-1 brief correction committed
- `New-Item briefs/property/megawave1/_signals/stage1b_signed_off.flag -Type File`

#### Stage 2 — Brief extensions **(AUTONOMOUS — ~45 min unattended)**

Dispatch (3 lanes in parallel, foreground OK or background):

```powershell
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage2 -Lane a -BatchTimeoutMin 180
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage2 -Lane b -BatchTimeoutMin 180
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage2 -Lane c -BatchTimeoutMin 180
```

Each sub-agent extends each brief from Stage 1 seed → full Stage 2 form (competitor URLs verified, FAQs drafted, full sectioning, universal rules + workflow stubs populated from §4 of NETNEW_PROGRAM).

Expected output:
- 53 briefs extended in place at `briefs/property/megawave1/*.md`
- ~53 commits on main with subject `MegaWave 1 Stage 2 {LANE}: <slug> extension ({batch_id})`
- 3 × `lane_{X}_done.flag` files
- F-flags + Q-N continue accumulating into the same files

#### Stage 2b — Drift triage **(CONDUCTOR — ~30-60 min)**

Read through Stage 2 extensions, spot-check 3-5 per bucket against the HP-locks committed at Stage 1b. Catch any drift before it propagates to RUN. Apply HP corrections as isolated commits.

#### RUN phase — Page generation **(AUTONOMOUS — ~60-90 min unattended)**

Dispatch (gated by `stage1b_signed_off.flag` already present):

```powershell
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase run -Lane a
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase run -Lane b
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase run -Lane c
```

Sub-agents generate full blog pages from briefs into the **worktree branches** (not main):
- `Accounting-wt-property-megawave1-a/Property/web/src/content/blog/<slug>.md`
- Same for `-b` and `-c`

This is the only stage that writes to worktree branches. Stage 1 + 2 wrote briefs to main.

#### Close-wave **(MECHANICAL — ~10 min)**

```powershell
./scripts/close-wave.ps1 -Wave 1 -Step megawave-batch-merge   # merges 3 lane branches to main
./scripts/close-wave.ps1 -Wave 1 -Step validate                # build sanity
./scripts/close-wave.ps1 -Wave 1 -Step audit                   # cannib + drift audit
./scripts/close-wave.ps1 -Wave 1 -Step build                   # npm run build, +53 pages expected
```

#### Pre-merge HP corrections **(CONDUCTOR — ~30 min if needed)**

Read all RUN-phase F-flags. Apply HP corrections to `house_positions.md` as isolated commits BEFORE deploy.

#### Deploy gate **(USER — ~5 min)**

```powershell
./scripts/deploy-and-index.ps1 -Site property
```

Returns production URL + IndexNow 200/202. Update `docs/property/NETNEW_PROGRAM.md` §3 heartbeat: "MW1 closed; 53 net-new shipped via rolling orchestrator; total net-new on main: 209 (W1-7) + 30 (W8) + 9 (W9, not deployed) + 53 (MW1) = 301."

---

### MW2 — Entity / incorporation family

After MW1 deployed + heartbeat updated.

Affinity (pre-authored in `sites/property.megawave-affinity.json`): Limited company/BTL (27), FICs (25), Companies House/ECCTA/RoE (7), partnerships/LLPs (9), IHT/estate planning (20), trusts (7), joint ownership (4), pension-funded (3), payroll (6), bookkeeping (5) ≈ 113 picks total.

**Plus** 21 SDLT-relief overflow picks rolled from MW1's Bucket A cap.

Total potential: ~134. **Cap at 60 per plan §"Mega-wave slicing"**; overflow rolls to MW3 or MW4.

Slice + check-cannib:
```powershell
./scripts/slice-megawave.ps1 -MegaWave 2
./scripts/check-cannib.ps1 -Wave 2 -Site property -PicksYaml briefs/property/megawave2/picks.yaml
```

Then same 6-stage cycle: 1 → 1b → 2 → 2b → RUN → close-wave → deploy.

Worktrees needed:
```powershell
git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave2-a -b property-megawave2-a
git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave2-b -b property-megawave2-b
git worktree add C:/Users/user/Documents/Accounting-wt-property-megawave2-c -b property-megawave2-c
```

### MW3 — Compliance / operations family

Clusters: MTD for ITSA (12), penalties & enquiries (9), Let Property Campaign (6), NRL (11), ATED (20), anti-avoidance (4), planning/change-of-use (1), capital-vs-revenue (1), pre-letting (1), property finance (1) ≈ 66 picks.

Plus any overflow from MW2.

Same 6-stage cycle.

### Round 6 completion criteria

- MW1 + MW2 + MW3 all deployed
- Property pool (`docs/property/topic_gaps_final.md`) drained to <10 residual picks
- NETNEW_PROGRAM §3 heartbeat updated 3 times
- `sites/property.json` cumulative net-new count: 209 (W1-7) + 30 (W8) + 9 (W9, NOT deployed) + 53 (MW1) + ~60 (MW2) + ~60 (MW3) ≈ **420 net-new pages on Property**

---

## Round 7 — Cross-site bootstrap

Triggered after Property pool drained. Replicates the rolling architecture to other niche sites.

### Bootstrap order

1. **Dentists** — first target. Lowest friction because `Dentists/niche.config.json` already exists.
2. **Medical** — scaffold partially built per memory (`medical_parked.md`). Decision: revive or restart from bootstrap-site.ps1.
3. **Solicitors** — structural parity already shipped.
4. **contractors-ir35** — newer, manual gates per memory (`contractors_ir35_pending.md`).
5. **generalist (Holloway Davies)** — distinct design system; brand-separate from niche sites.
6. **agency-founder-finance** — last (smaller pool).

### Per-site bootstrap

```powershell
./scripts/bootstrap-site.ps1 -Site dentists
```

This will:
- Create `sites/dentists.json` from template
- Scaffold `docs/dentists/` + `briefs/dentists/`
- Verify `Dentists/.vercel/project.json` exists
- Baseline `npm run build` sanity-check
- **Prompt conductor for `housePositions` content** — the irreducible per-site judgment work (~30-60 min per site)

Then conductor authors `sites/dentists.megawave-affinity.json` (manual cluster → mega-wave grouping; ~30-60 min one-time per site).

Then same MegaWave pattern as Property:
```powershell
./scripts/slice-megawave.ps1 -MegaWave 1 -Site dentists
./scripts/check-cannib.ps1 -Wave 1 -Site dentists ...
# ... worktrees ...
./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage1 -Lane a -Site dentists
# ... etc
```

### Round 7 completion criteria

- All 6 niche sites bootstrapped + at least 1 mega-wave deployed per site
- `sites/<site>.json` exists for each
- Cross-site reusability proven; new sites can be added in ~4-6h bootstrap + per-mega-wave cost

---

## Stage gate matrix — what's user vs auto

| Stage | Manual / Auto | Time | Why |
|---|---|---|---|
| Slice mega-wave | Mechanical (script) | 5 min | One-time pool slicing |
| Cannib check | Mechanical (script) | 5 min | Cross-source overlap audit |
| Stage 1 dispatch | Auto (rolling orchestrator) | ~45 min unattended | Sub-agents draft seeds |
| **Stage 1b HP-lock review** | **Conductor** | 60-120 min | §16-discipline judgement irreducible |
| Stage 2 dispatch | Auto | ~45 min unattended | Sub-agents extend briefs |
| **Stage 2b drift triage** | **Conductor** | 30-60 min | Spot-check against HP-locks |
| RUN dispatch | Auto | ~60-90 min unattended | Sub-agents write blog pages |
| close-wave | Mechanical (script) | 10 min | Merge + validate + build |
| **Pre-merge HP corrections** | **Conductor** | 0-30 min | If RUN-phase flags raised |
| **Deploy gate** | **User** | 5 min | Final prod approval |

Total per mega-wave: **~3-4 hours active conductor work** + **~3-4 hours autonomous** (machine doing the heavy lift).

---

## Quality signals to watch

Per-mega-wave benchmarks (calibrated against MW1):

| Signal | Target | MW1 actual |
|---|---|---|
| F-flag count | 4-10 per 60 picks | 5 per 53 picks (good) |
| Q-N count | < 3 per mega-wave | 1 (clean) |
| Brief production-grade rate | 100% (sampled) | 100% on A7, A12 spot-checks |
| Build pass rate post-Stage 2 | 100% first try | n/a yet |
| HP-lock additions per mega-wave | 2-5 per 60 picks | 3 candidates (F-100, F-101, §1.K) |
| BRIEF_DRIFT catches against prior work | 0-2 per mega-wave | 1 (F-1 against A1) |
| Sub-agent CPU efficiency | ~6-10% utilization | Confirmed (B1 sub-agent ~6% over 16 min) |
| Wall-clock per pick (autonomous) | ~1.5-2.5 min | A20 case = 4 min; B1 average = 2.5 min |

Drift watchpoints (per §16 discipline):
- Bill-vs-enacted-Act statutory citations
- Cross-jurisdictional facts (England/Wales/Scotland/NI)
- Date-sensitive thresholds (e.g. 1 April 2025 SDLT reversion)
- HP-lock cluster coherence

---

## Failure modes + recovery

| Mode | Detection | Recovery |
|---|---|---|
| Sub-agent dies mid-batch | Orchestrator timeout → batch-detect returns incomplete | `batch-reclaim.ps1` flips claimed → pending; re-dispatch |
| Marker file mismatch | batch-detect WARNING in poll loop | Manual conductor review; usually sub-agent committed partial work |
| HP-lock conflict mid-mega-wave | Stage 2b detects drift against HP locks | Manual HP correction commit; Stage 2b is the gate |
| batch-detect false-positive (FIXED) | n/a — bug fixed at `f01d3ef` | Backtick-wrapped slug matching prevents substring collisions |
| Lane-done flag false-positive | Cross-check: count(briefs) vs lane queue | Delete flag, reclaim pending picks, re-dispatch |
| Two orchestrators race on queue | `batch-claim.ps1` FileShare::None lock with retry | Atomic by design |
| Build failure post-close-wave | `close-wave.ps1 -Step build` returns non-zero | Pre-merge HP corrections gate catches; isolated revert commits if needed |
| Sub-agent spawns sub-sub-agent | Prompt template forbids ("leaf agent"); verified at Stage 1 | If observed, kill + audit prompt |
| Lane mis-clustering | Sub-agent raises CROSS_BUCKET flag (e.g. F-51) | Conductor Stage 1b decision: move pick, or annotate cluster |

---

## Out of scope (deferred until Property + cross-site complete)

Per plan §"Out of scope":
- **Continuous-generation Signal Router** (`dispatch-opportunity.ps1`) — Phase 3a from autopilot plan
- **Auto-applied HP corrections** — sub-agent proposes + commits HP edits directly; too risky
- **Parallel multi-mega-wave execution** (MW1 + MW2 running simultaneously) — quality risk
- **Cross-site multi-tenancy in one orchestrator run** — each site runs sequentially
- **Refactoring `optimisation_engine.blog_generator`** — separate queue-driven path; not blocked by rolling architecture

---

## Estimated calendar timeline

Assuming reasonable continuity (not every-day work but ~half-time):

- MW1 complete (Stage 1b → deploy): **1-2 days** (mostly conductor time on Stage 1b + 2b)
- MW2 (~60 picks): **1-2 days**
- MW3 (~60 picks): **1-2 days**
- Property pool drained: **~1 week calendar** total
- Round 7 per cross-site: **~1 day bootstrap + per-mega-wave cost** = **~2-3 days per site**
- All 6 niche sites with at least 1 mega-wave: **~2-3 weeks calendar**

---

## Companion references

- `~/.claude/plans/we-re-in-plan-mode-parallel-shamir.md` — original architectural plan
- `docs/sessions/property/MANAGER_HANDOVER_2026-05-26_rolling_arch.md` — Round 5 mid-flight handover (snapshot, superseded by MEMORY.md)
- `docs/property/NETNEW_PROGRAM.md` §16 — discipline catalogue inherited by all sub-agents
- `docs/property/megawave1_*` — MW1 artefacts (tracker, flags, Q&A, discovery)
- `sites/property.json` + `sites/property.megawave-affinity.json` — site-config + affinity grouping
