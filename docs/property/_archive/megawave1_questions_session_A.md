# MegaWave 1 Q&A - Session A

Use bracketed ## [Q-N] format so the §8.3 watcher catches new posts (Bug #6 fix).

Q&A format:

    ## [Q-N] - one-line headline
    **STATUS:** <open initially; manager flips to: answered>
    **Asked:** <timestamp>
    **Page:** <slug>
    **Step:** <which step>
    **Question:** <what you need decided>
    **Context:** <what you tried>

---

(Sessions append Q&A below. Manager appends A-N answers in-place.)

## [Q-1] - M1-A-B4 re-dispatched after work already complete; queue rows still flagged pending

**STATUS:** open
**Asked:** 2026-05-26T11:24Z
**Page:** multiple-dwellings-relief (A20) — and by extension A19 land-and-buildings-transaction-tax-multiple-dwellings-relief
**Step:** Stage 1 seed claim / pre-write state check
**Question:** Batch M1-A-B4 was dispatched to me as a 1-pick bounded batch for `multiple-dwellings-relief`, but the artifacts show the batch is already complete from an earlier run: brief at `briefs/property/megawave1/multiple-dwellings-relief.md` exists (3K+ word canonical three-jurisdiction hub); tracker row A20 shows ✅ with note "Stage 1 seed (M1-A-B4); canonical three-jurisdiction hub; reinforces F-1 HP-extension need"; `_signals/batch_M1-A-B4_done.json` exists with completed_at 2026-05-26T10:05:34Z and commit SHAs 3d7e16e + 06b9540 covering both A19 + A20; `_signals/lane_A_done.flag` is also present. However, `queue_A.jsonl` still shows `status: "pending"` for A19 and A20 — which is presumably why the orchestrator re-claimed and re-dispatched. I have NOT overwritten the existing brief, NOT added a duplicate commit, and NOT written a fresh batch-done marker (the existing one is authoritative). Need conductor decision on: (a) why the queue rows were flipped pending despite the work being done (batch-reclaim glitch? manual reset? batch-detect race?); (b) whether to flip the queue rows to "claimed"/"done" to stop further re-dispatches; (c) whether this affects the F-1 BRIEF_DRIFT flag against A1 that A19+A20 both raised.
**Context:** Worktree `C:/Users/user/Documents/Accounting-wt-property-megawave1-a` clean (no local edits). Verified all four artefacts present on main via absolute paths: brief, tracker row, batch-done.json, lane-done flag. Per Stage 1 template's "two batches conflict on tracker row → latest write wins" guidance the existing ✅ stands; per the autonomy clause I would normally proceed, but proceeding here means overwriting a fully-developed comprehensive seed with a fresh one which would be destructive (the existing seed is substantially better than the ~800-1200 word template-default would yield). Exiting cleanly without writes pending conductor reconciliation of the queue-vs-artefact state divergence.

---

