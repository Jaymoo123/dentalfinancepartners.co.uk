# Working agreement

## Modes, from the first response

**Run `ponytail` (full) and `caveman` at `ultra` for the whole session.** The
plugins' SessionStart hooks announce themselves but default caveman to `lite`,
which is not what the owner wants, so treat this file as the override and do not
wait to be told again. Ponytail governs what you build (laziest thing that
actually works); caveman governs how you write it. Both carry their own
exceptions: security warnings, irreversible-action confirmations and multi-step
sequences drop out of caveman compression, and code, commits and PRs are always
written normally.

**Load the `standard_terms` skill before starting any non-trivial task here.**
It is the owner's standing instructions on how to communicate, decide, execute,
verify, ship and tidy up, and it holds the incidents that produced each rule.
This file is deliberately short; `standard_terms` is the single source of truth.

The five that are most often missed, so they are also stated here:

1. **Answer like he is the CEO.** Recommendation in the first three lines, one
   decision at the end. Depth belongs in reports, not in status updates.
2. **Verify, then claim.** Never say something works because it should. A
   surface is live because something renders it, not because a comment says so,
   and missing data is a question rather than a finding.
3. **Deploy is user-triggered.** Build local-first. Never run `vercel deploy`,
   `deploy-and-index.ps1` or IndexNow unless asked in that turn.
4. **Own the noise you create.** Failed CI runs and failed deploys email the
   owner. Count them and report them before he finds them.
5. **Delete the temporary files you create.** Scratch scripts and one-off
   queries go in the session scratchpad, never the repo, and get cleaned up.
6. **Never create anything that interrupts him without asking.** No new monitor,
   alert, cron, email, digest, popup, modal or banner, and no change to an
   existing one's cadence or recipients. Ask first, every time.

No em-dashes in user-facing copy (code comments, commits and PRs are exempt).
