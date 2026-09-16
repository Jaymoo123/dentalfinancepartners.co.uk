# Execution protocol

How phases actually get built. Written 2026-08-22, after the owner asked for phases to be
shipped by instructed subagents with the orchestrator's context kept clean.

**Reading order for a phase agent: `CONTEXT.md` → this file → your phase in `PLAN.md` →
only the reports your phase's *Evidence* line names.** Do not read all 14 reports. Do not
read other phases.

---

## 1. Roles

**The orchestrator** (main thread) owns sequencing, gates, owner comms and judgment. It
does not write feature code. It launches one phase agent at a time, reads the handback,
runs or verifies the gate, and decides whether the phase is tagged or sent back.

**A phase agent** owns exactly one phase. It reads its brief, does the work, commits it,
runs the gate, writes a phase log, and hands back a short structured summary. It does not
start the next phase, does not deploy, and does not widen its own scope.

**A fidelity reviewer** runs after each phase agent, read-only, and never the same agent
that built it. It checks the result against the designer's intention and returns a verdict
that decides whether the phase gets tagged. Full brief in §8.

**Why one at a time:** all phase agents work in the same working tree on the same branch.
Concurrent agents would collide on the git index. Parallelism inside a phase is fine only
where the file sets are provably disjoint and the agent serialises its own commits.

## 2. Branch and commit discipline

- One branch for the whole migration, off `expansion/new-sites-2026-08`:
  `design/property-redesign-port`.
- **One commit per logical item**, not one per phase and not one per file. A phase with ten
  defects produces ten commits. This is what makes a single item revertible without losing
  the phase.
- Commit messages: normal prose, conventional-commit prefix, no caveman compression.
  Reference the phase and item: `fix(property): phase 0.3 - remove middleware slug
  shadowing so /blog/property-accountant-services renders`.
- **Tag at phase end:** `design-port-phase-<N>`. Rollback for a phase is reverting the
  tagged range; rollback for an item is reverting its commit.
- **No push and no deploy** unless the owner asks in that turn. Batch locally.
- Never `git push --force`. Never skip hooks.

## 3. The gate

Full definition and today's measured baselines: `reports/11_verification_harness.md`.

**Tier 1 — every commit, ~75s**
```
cd Property/web && npx tsc --noEmit          # baseline 0 errors
npx eslint <touched files>                   # baseline 0 errors, 32 warnings repo-wide
npx vitest run                               # baseline 49 files, 1484 tests, all pass
```
**Tier 2 — phase end, ~4m30s**
```
cd Property/web && npx eslint .              # 0 errors / 32 warnings
npx next build                               # exit 0, 902 static pages
python scripts/check_dependency_closure.py   # OK across 19 sites
python scripts/predeploy_gate.py --site property
node tmp/design_migration/scripts/sweep.mjs          # 98 URLs, 712 links, 0 dead
node tmp/design_migration/scripts/browser_check.mjs  # 0 overflow at 390px
```

**The typecheck baseline is zero.** Any tsc failure in a ported file is a defect, not
pre-existing noise. The designer's handoff mentions 325 pre-existing errors — that is true
of their copy, not ours. Do not adopt their baseline.

**Green tests prove almost nothing here.** 1484 tests pass and **none of them assert page
JSX, copy or metadata**. Treat the browser and sweep checks as the real page gate.

**Re-baselining a script's baseline requires a written reason in the phase log.** A gate
that gets silently re-baselined is not a gate.

**Run `browser_check.mjs` against `next start`, NEVER `next dev`.** Its ignore pattern only
matches the production `_vercel/speed-insights` path, so a dev-server run flags 140 of 140
pages on CSP console noise and exits 1. The same cause produces transient 500s that clear on
re-run. Established Phase 8, after it cost one agent a false red. `next dev` is fine for
eyeballing the site; it is not fine for the gate.

**Pass `--out` when running it, or it overwrites the per-run detail dump** at its default
path. Two agents have clobbered artefacts here; one had to be restored by a later run.

## 4. The four checks that apply to every ported file

These are not optional and they are not covered by the build.

1. **Facts pass** against `docs/Property/house_positions.md`. Their tree is a July fork.
   The proof case: their first-time-buyer relief still says £6,250; correct is £5,000,
   fixed in `f7794767`. **The golden suite does not catch copy figures.**
2. **"Did we change this after 16 July?"** — `git log --oneline 1d68a570..HEAD -- <path>`.
   Anything we deliberately deleted or fixed since is sitting in their tree, restyled and
   looking current.
3. **Link floor** — unique outbound internal links per page must be **≥ the current live
   count**. Their layout drops links as a recurring class (135→52 on pillar pages, 749→108
   on hubs, and every `CalculatorTabs` page). This check is binding.
4. **Carve-out check** — re-read `CONTEXT.md` §2 and confirm none of the seven applies
   before taking a file wholesale.

## 5. Standing prohibitions for phase agents

- **No deploy, no push, no IndexNow, no monitored-page registration, no production
  writes.** Local only. Production is Phase 9 and it is owner-triggered.
- **No new monitor, alert, cron, email, digest, webhook, popup, modal, toast or banner**,
  and no change to an existing one's cadence, thresholds or recipients. This covers on-site
  interruptive UI as well as ops alerting. If you think something needs watching, say so in
  the handback in one line and let the owner decide.
- **The verification scripts must never be scheduled, must never notify, and must never be
  promoted into `scripts/` or CI.** They live in gitignored `tmp/` deliberately.
- **Never point `browser_check.mjs` at the production domain.** It executes JavaScript.
- **No scope widening.** If you find something outside your phase, write it in the handback
  under "Found, not fixed". Do not fix it.
- **Do not relitigate a design decision.** Rule Zero: their design wins. If you think a
  design choice is wrong, note it in the handback; do not quietly substitute your own.
- Keep scratch files in `tmp/design_migration/`, never in the repo proper, and delete them
  before handing back.
- No em-dashes in user-facing copy. Code, commits and PRs are exempt.

## 6. The phase log

Every phase agent writes `tmp/design_migration/logs/phase_<N>.md` before handing back:

```markdown
# Phase <N> — <title>
Branch: design/property-redesign-port   Tag: design-port-phase-<N>
Agent run: <date>

## Commits
<sha> <subject>            # one line each, in order

## Items
| Item | Status | Files | Notes |
DONE / PARTIAL / BLOCKED / NOT-NEEDED, one row per item in the phase.

## Gate
Tier 1: <result>
Tier 2: <each check, measured, against baseline>
Any baseline changed, and the written reason.

## Carve-outs applied
Which of the seven, on which files, and what we kept instead of theirs.

## Dispositions changed
Any row of reports/14_completeness_audit.md this phase moved, and to what.

## Found, not fixed
Anything outside scope. One line each.

## Owner questions raised
Only genuine forks with no safe default.
```

## 6b. Reporting discipline

Added 2026-08-22, after a run of reporting errors. Every one was caught by the fidelity
review before tagging and none changed shipped code, but they cost review time and they
put wrong numbers in front of the owner. The pattern: agents run 35-70 minutes across
100-250 tool calls, then write the summary at the end, and some figures get recalled
instead of re-read.

**Rule 1 - measure, write, then quote. Never quote from memory.**
The moment you take a measurement that will appear in a log or handback - a link count, a
contrast ratio, a test total, a page count, a diff size - append it to
`tmp/design_migration/logs/<phase>_measurements.txt` with the command that produced it.
Your log and handback must quote that file. If a number is not in the file, it does not go
in the report. Re-run the measurement rather than recalling it.

Errors this rule exists to prevent, all real:
- "+43 crawlable header links" (actual prerendered: 0)
- article label contrast "8.12:1" (actual: ~17.9:1)
- three `data-cta` "verified in the rendered DOM" (actually config-gated, never rendered)
- a page listed among the original 18 `footer_links` that was never one of them

**Rule 2 - you may only assert what you verified in your own scope.**
Anything about a file, page or behaviour outside your scope is written as
`UNVERIFIED, for <phase> to confirm`, never as a finding. Cross-scope claims are the most
expensive kind of error because the next agent inherits them as established fact.

Example of the right form: 6C changed a shared component and wrote "6.7 sees byte-identical
rendering". That page was outside its scope, so the correct phrasing was "UNVERIFIED: 6.7
should render byte-identically, 6E to confirm."

**Rule 3 - state your instrument.**
If a number comes from a tool, name the tool and its version state. `browser_check.mjs` has
been materially wrong three times (inverted contrast logic, unnormalised `oklch`, no alpha
compositing), each time producing confident numbers. A measurement is only as good as the
instrument, and the instrument is not above suspicion.

**Rule 4 - the fidelity reviewer checks the log against the artefact.**
Reviewers already verify code. They must also spot-check the phase log's headline numbers
against reality and report any that do not reconcile, as a named gap. A log is a deliverable.

## 7. Handback format

The orchestrator's context is the scarce resource. **Hand back at most 25 lines**, in this
shape, and nothing else:

```
PHASE <N> — DONE | PARTIAL | BLOCKED
Commits: <n>, tag <tag or "not tagged, reason">
Gate: Tier1 <pass/fail>, Tier2 <pass/fail>, deltas from baseline: <one line>
Items: <n> done, <n> partial, <n> blocked  (name only the not-done ones)
Carve-outs applied: <one line>
Found, not fixed: <up to 3 lines>
Owner questions: <up to 3 lines, or "none">
Log: tmp/design_migration/logs/phase_<N>.md
```

Do not paste diffs, file contents, full command output or the phase log body into the
handback. The orchestrator reads the log if it needs detail.

## 8. The design fidelity review — mandatory, every phase

Owner instruction, 2026-08-22: *"every phase should be checked and verified against the
designer's intention."*

The build gate proves the site still works. It says nothing about whether we actually
delivered the design. Those are different failures and they need different eyes.

**Every phase gets a second, independent agent** that did not write the code, running
read-only after the builder tags. Its job is adversarial: assume the port diluted the
design and go looking for where.

**It is not a design critic.** Rule Zero stands — the designer's decisions are approved and
are not up for review. The reviewer's only question is *did we faithfully deliver what they
designed*, never *was their design right*.

**Sources of intent, in priority order:**
1. The designer's actual code in `Property_zip/` — the implementation is the spec.
2. `Property_zip/web/DESIGN_GUIDELINES.md` and `web/CLASS_NAMING_CONVENTIONS.md`.
3. The `CONTEXT_SUMMARY_SESSION*.md` sections covering the phase's surfaces — these record
   the reasoning, including decisions tuned over several rounds.
4. `reports/12_designer_decision_register.md` — 51 decisions, 60 standing rules, 37
   deliberate non-actions. **The non-actions matter as much as the actions:** a porting
   agent undoing something the designer deliberately chose not to do is a fidelity failure.

**What it must check:**
- **Delivered, diluted or dropped.** For every design change in the phase's scope, is it
  actually in our tree and actually rendering? Not "the class is present" — rendering.
- **Silent substitution.** Did the builder quietly use our old pattern where theirs
  differed? This is the most common failure and it never shows in a diff review.
- **The standing rules.** `LeadForm` on a white or light surface. The one-form rule. The
  adjacency rule (light section between a navy panel and the navy footer). No `font-serif`.
  Category labels via `categoryDisplayName()`. Counts derived from the registry, never
  hand-typed. Full list in report 12 §3.
- **Cross-file couplings.** Report 14 §7 lists them: the nav mega-menu spans 5 files, the
  blog `aside-cta` CSS and renderer are a pair, the sticky TOC is a pair, `.logo-house` is
  a component plus a CSS animation, the `<noscript>` release block backs seven animated
  components. Porting one half silently loses the design.
- **Rendered reality, not source.** Use `browser_check.mjs` against a local dev server.
  Because of the unlayered `h1..h6` rule in `globals.css:155-159`, heading typography must
  be verified with `getComputedStyle` and never from screenshots or class names — the
  designer lost most of a session to exactly this.
- **Carve-outs are legitimate divergence.** Where the phase applied one of the seven, the
  reviewer confirms it was applied narrowly: we kept our facts, links, schema or compliance
  posture, and did *not* use the carve-out as cover for keeping our old design.

**Verdict:** FAITHFUL, FAITHFUL-WITH-GAPS, or DILUTED. Anything other than FAITHFUL sends
the phase back to a builder before it is tagged.

**Output:** `tmp/design_migration/logs/fidelity_<N>.md` with per-item findings and
file:line. **Handback capped at 20 lines**: verdict, counts delivered/diluted/dropped, the
named gaps, and nothing else.

## 9. Definition of done for a phase

1. Every item in the phase is DONE, or explicitly BLOCKED with a named owner decision.
2. Tier 2 gate green, every number at or better than baseline.
3. Phase log written.
4. **Design fidelity review returns FAITHFUL** (§8). FAITHFUL-WITH-GAPS or DILUTED sends
   the phase back before tagging.
5. `reports/14_completeness_audit.md` updated for any disposition this phase changed.
6. Tag applied.
7. Scratch files deleted, `git status` clean apart from intended commits.

A phase that cannot meet 1 to 6 hands back PARTIAL with the reason. That is a good outcome,
not a failure. Reporting a phase done when it is not is the only unrecoverable error here.
