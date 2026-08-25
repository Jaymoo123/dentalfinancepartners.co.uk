# Wave 11 Q&A — Session A

**Created:** 2026-08-15.

**§16.15 / §16.37 critical Q&A discipline:** when raising a Q to manager, append HERE via ABSOLUTE PATH from your worktree: `C:/Users/user/Documents/Accounting/docs/property/wave11_questions_session_A.md`. NEVER append to your worktree relative-path copy of this file. Manager polls main path only; questions written to the worktree relative-path copy are NOT seen by the monitor and require manual user-side propagation.

Q&A format (one block per Q):
```
## Q-N — {one-line headline}
**STATUS:** <open initially; manager flips to: answered>
**Asked:** {timestamp}
**Page:** {slug, or "general" if cross-page}
**Step:** {which step of 19-step workflow}
**Question:** {what you need decided to proceed}
**Context:** {what you have tried, what the brief says, what the house position says, why your own judgement is not sufficient}

---

(Manager answers below by adding A-N block + changing STATUS to "answered".)
```

When to use Q&A (per §8.5):
- Cannot make progress without manager decision AND
- Answer is not in brief, house positions, or your own judgement

For everything else, use flags (`wave11_site_wide_flags.md`) or discovery log (`wave11_discovery_log_session_A.md`). Flags do not block; questions block; discovery logs are FYI.

**Watcher arming pattern (§16.41(d), Wave 7+):** the manager-side watcher counts `## Q-\d+` heading occurrences (monotonic; template-immune). Adding a real Q-N heading triggers a notification; the example block above does NOT match the pattern (no leading `## ` on the inline format-spec block).

---

(Sessions append Q&A below this line. Manager appends A-N answers in-place.)

## [Q-1] wave11_page_tracker.md describes a DIFFERENT Wave 11 — stale header + no rows for the live picks

**MANAGER ANSWER (2026-08-15): resolved.** Correct call not to touch the manager-owned header; it cloned an abandoned 2026-07 plan. Header now rewritten by the conductor for the live 19-pick wave; your cluster-B section stands as-is. STATUS: closed
**STATUS:** open
**Asked:** 2026-08-15 (Stage 1, cluster B)
**Page:** general
**Step:** Stage 1 wrap (tracker flip)
**Question:** The tracker's header and checklist describe the abandoned "gap discovery 2026-07 batch" Wave 11 (12 picks, portfolio-landlord pillar A1, NRL IHT A3, "A4 + A8 dropped as duplicates") — not the live 19-pick compliance/leasehold/commercial wave from WAVE11_HANDOFF.md. The Session A table was empty, so there were no rows to flip. I appended a new cluster-B section with A1-A8 rows at Stage1 ✅ and did NOT touch the stale header/checklist or other clusters' space. Manager should replace the stale header/checklist (or confirm the old batch is superseded) before Stage 2, or downstream scripts keyed on the tracker may mis-read the wave shape.
**Context:** Dispatch prompt says "flip ONLY your cluster's rows"; rows did not exist. Adding rows was the non-blocking reversible action; rewriting the manager-authored header was out of my lane.
