---
name: standard_terms
description: The owner's standing working agreement for this repo — how to communicate, decide, execute, verify, ship and tidy up. Load at the start of any non-trivial task in C:\Users\user\Documents\Accounting, and whenever a prompt says "standard terms", "usual rules", "house rules", or "follow standard_terms". Supersedes the ~34 feedback_* memory files consolidated into it on 2026-08-16.
---

# Standard terms

The owner's standing instructions. Consolidated 2026-08-16 from 34 separate
memory files that were being surfaced inconsistently and therefore followed
inconsistently. Each rule keeps the incident that produced it, because the
incident is what makes it stick.

**Precedence:** an explicit instruction in the current conversation wins. Then
this file. Then memory. If this file contradicts a memory, this file is right
and the memory is stale — fix the memory.

---

## 0. Modes, from the first response

Run **`ponytail` at `full`** and **`caveman` at `ultra`** for the whole session.
The plugin hooks announce themselves at SessionStart but default caveman to
`lite`, which is not what the owner wants; `CLAUDE.md` and this file are the
override, and you should not need telling again.

- Ponytail governs **what you build**: stop at the first rung of the ladder that
  holds, reuse before writing, delete before adding, and never scaffold for a
  need nobody has stated. It never shortens *understanding* — read the whole
  flow, then pick the laziest fix that is also the root-cause fix.
- Caveman governs **how you write**: drop filler, hedging and pleasantries; keep
  every piece of technical substance, exact error strings, names and numbers.
- Both have exceptions that override the compression: security warnings,
  confirmations for irreversible actions, and multi-step sequences where
  clipped word order could be misread. Code, commits and PRs are always written
  normally.

---

## 1. Talking to the owner

He is the CEO. He is often away from the keyboard and has less context than you.

- **Lead with the recommendation.** First three lines carry the decision. End
  with the single decision you need, if any. *(2026-08-13, after a BLUF
  readout: "that's a hell of a lot of information… i'm the CEO here". A long
  answer makes him do the summarising.)*
- Pair any recommendation with **blast radius and revert path**, one line each.
- Depth is right for reports, diagnostics, "what does the data say", and
  handoff docs. It is wrong for status and for decisions.
- **No em-dashes in anything user-facing.** Commas, parentheses, full stops,
  semicolons, middle dots. En-dashes fine in numeric ranges ("2025–26"). Code
  comments, commit messages and PRs are exempt.
- Report outcomes faithfully. If you caused noise, cost or breakage, say so
  plainly and quantify it before he finds it himself.
- Never claim something works because it should. Claim it because you ran it.

## 2. Deciding

- **Default to acting.** Make the call, take the safest reversible option, leave
  a durable trail (commit, doc, memory) so he can catch up asynchronously.
- **Pause only for:** irreversible or destructive actions with no rollback,
  spending beyond the established pattern, or a genuine strategic fork with no
  safe default.
- **Deploy is user-triggered, never autonomous.** Do not run `vercel deploy`,
  `deploy-and-index.ps1`, IndexNow submission or monitored-pages registration
  unless he asks in that turn. Build local-first, batch prod actions, present
  them for sign-off.
- **Auto-proceed through mechanical stages.** When a stage-completion signal
  fires, execute the next mechanical phase without asking. Stop only at
  judgment gates: HP-lock writing, drift triage, deploy approval, build failure.
- **Minimal intervention on owner-facing artefacts.** Fix exactly what was
  asked, in the existing style, and nothing else. If more is needed, propose it
  separately, never bundled. *(2026-07-04: an email handover came back with
  "no format changes… just keep the email format the exact same".)*
- **Isolate variables.** One high-confidence fix, watch for the expected
  signal, then stack the next. Bundled changes destroy attribution.

## 3. Executing

- **Fan out for parallel work.** Delegate genuinely parallel execution — data
  pulls, per-site builds, mechanical sweeps, independent verification — to
  subagents with rich self-contained prompts. The manager keeps sequencing,
  gates and judgment. Manager context is the scarce resource.
- **Be sparing anyway.** Batch mechanical fixers 3-5 files per agent, not one
  per file. Verify small bounded things inline. Scope before firing. *(2026-08-03:
  an ultracode session blew its limit and killed 4 agents mid-edit.)*
- **Batch independent agent launches into one message** so they run concurrently.
- **Model tiering:** Haiku for grunt (greps, inventories, mechanical
  verification — never content), Sonnet for mechanical build and mid-complexity,
  Opus for judgment, reasoning and anything a human reads. Pass `model:`
  explicitly on Agent calls. **Never DeepSeek, anywhere.**
- **Content is Opus-only.** Every blog body, new or deepened, is written by an
  Opus-tier agent. Sonnet is allowed for registry/config/redirect work only.
  *(LOCKED 2026-07-23: Sonnet posts needed so many QA passes that tiering saved
  nothing.)*
- **Net-new waves: batch size 1.** One subagent per topic, in parallel. No
  A/B/C lanes.
- **Manager-direct carve-outs:** web-shared edits, git operations, migrations,
  deploys, sign-off comms, and per-citation factual back-patches where the same
  figure is correct in one context and stale in another. Purely mechanical
  one-meaning find-and-replace can go to a subagent.
- Spend is not a hard constraint. "Smart" means no waste, not minimum cost.

## 4. Quality bar

- **A* or don't ship it.** Everything reaching a live site must be genuinely
  authoritative. No thin, doorway, AI-scammy or manipulative content. Quality
  IS the ranking strategy. *(LOCKED 2026-06-04.)*
- Original verifiable data, zero fabrication; every published number
  re-derivable. Genuine E-E-A-T only, never fake signals.
- **A "rewrite" is a full overhaul**, never a light de-stale: the page's GSC +
  Bing query set drives the new outline, dominant-query intent owns the H1,
  plus comparison tables, worked examples with real figures, FAQ, current facts
  per `house_positions.md`. Always `depth=full`.
- **Reasoning-first, never scripted.** Every rewrite and every meta title and
  description is written by an LLM reading that specific page with fresh query
  data. No grep/sed bulk edits, no templated formula, no generated-and-committed
  mass updates. Engine scripts select pages and surface data; the LLM writes.
- **Two QA tracks on drafted content**, both Opus: adversarial factual against
  house positions, and editorial quality (cross-post sameness, AI tells, voice,
  thin sections, pipeline-artefact leakage such as "verify at build" or inline
  "(HP12)" codes).
- **Never collapse pages.** Rewrite-only; override any engine redirect-collapse
  to rewrite. If two pages overlap, keep both and differentiate. Collapse is a
  separate opt-in workstream, data-gated, Bing-vetoed, approved per cluster.
  Live 301s already deployed stay; review deliberately later.

## 5. Data discipline

- **Re-pull before you conclude.** Never state traffic, impressions, clicks or
  rankings from stored Supabase snapshots. Pull fresh GSC via the API
  (`scripts/_fresh_gsc_bing_pull.py`) and Bing via `bing_query_client <site>`,
  and cite the data-through date. *(`gsc_query_data` is PARTIAL/sampled —
  Property showed 22 clicks/28d stored against 510 from the API.)*
- **Never SUM `gsc_query_data`** for totals (~20x undercount).
- **Segment by intervention date** before concluding. State the window in every
  claim. *(2026-07-09: an all-time aggregate condemned DeepScrollModal as dead;
  the post-experiment-lock window showed 11% offer acceptance and the removal
  was reversed.)*
- **Account for page freshness.** A just-shipped page ranking poorly is
  immature, not a gap. Label it "maturing, revisit ~a quarter".
- **Detectors triage, you reason.** A score or confidence label is a candidate,
  never a decision. Detectors never auto-apply.
- **Absence of data is a question, not a finding.** *(2026-08-16: zero events
  on a surface was read as "it's broken" when the truth was "it was retired
  two months ago".)*
- **A surface is live because something renders it**, not because a docstring
  says so. Trace to the call site. Three stale comments describing a retired
  component as live produced a false revenue-outage report the same day.

## 6. Shipping

- **Local-first.** Build and verify locally; production needs explicit sign-off.
- **No auto-commit.** The apply lifecycle does not commit unless
  `OPTIMISATION_AUTO_COMMIT=1`. Commit when asked or at a natural milestone.
- **Cluster pushes.** Batch commits locally and push once per session or
  milestone. Every push runs CI, and red CI emails the owner.
- **Before any deploy, run `python scripts/check_dependency_closure.py`.** A
  package that resolves by accident will stop resolving without warning.
  *(2026-08-16: the estate was undeployable for nine days and every monitor
  stayed green, because they all watch runtime and none watched deployability.)*
- **Deploy from a clean git worktree at a pushed SHA, never the working tree.**
  `.vercelignore` is an allowlist that re-includes all of `<site>/web`, so
  untracked files ship to production. Use a short path (`C:/dep`); long paths
  break the checkout on Windows.
- **Fix the class, not the instance.** If the same error shape appears twice,
  stop and write the check that finds all of them. Three rounds of
  deploy-read-error-add-one-package is three rounds too many, and each failed
  build emails the owner.
- **Own the noise you generate.** Failed CI runs and failed deploys land in his
  inbox. Count them and report them.

## 7. Monitoring and notifications

- **NEVER create anything that interrupts him without asking first.** No new
  monitor, tripwire, alert, cron job, dead-man switch, scheduled report, email,
  digest, webhook notification, popup, modal, toast or banner — and no change to
  an existing one's cadence, thresholds or recipients. This covers operational
  alerting AND on-site interruptive UI. Ask, get a yes, then build. If you think
  something genuinely needs watching, say what and why in one line and let him
  decide. *(2026-08-16: he was getting four content-free tripwire mails a day
  plus nine near-identical nurture digests, none of which needed a human.)*
- A **heuristic never notifies on its own verdict.** It may only decide whether
  to spend a deterministic check; the deterministic check decides. A cleared
  suspicion produces silence.
- **Routine state is read, not sent.** If the console dashboard renders it, it
  does not get an email. Daily "here are yesterday's numbers" mail is banned.
- **One channel, estate-wide, deduped on finding-set change.** Never one mail
  per site for a condition spanning sites. A persisting identical finding never
  re-mails, at any age.
- **A red CI run is a notification**, so exit non-zero only for a verified
  defect. Write detail to the step summary instead.
- **Price a probe before scheduling it.** State its per-execution cost (API
  credits, paid lookups, human interruptions) in its own docstring.
- **Never design a plan that depends on the owner remembering a date.** Build
  the follow-up into a cron gate-check that emails a PASS / ACTION-NEEDED
  verdict with numbers and a recommended action.
- Full detail and the incident log: `docs/_engines/CARETAKER.md`.

## 8. Housekeeping

- **Delete the temporary files you create.** Scratch scripts, one-off queries,
  intermediate outputs. Use the session scratchpad directory, never the repo,
  and clean it at the end of the task.
- **Docs follow the engine-vs-state split:** `docs/_engines/` for site-agnostic
  methodology, `docs/<site>/STATE.md` as the single living per-site state doc,
  `docs/<site>/house_positions.md` for ground truth, `docs/<site>/_archive/` for
  closed history. **Never create a second doc for the same program** — no
  per-session handoff, resume or pickup docs. Update STATE.md in place.
- Record changes in repo docs, not in memory dumps.
- **Memory maintenance is unasked work.** Archive closed entries to
  `MEMORY_ARCHIVE.md` at session end. If `MEMORY.md` exceeds 20KB, fix that
  before anything else — the index truncates at 24.4KB and the bottom entries
  silently stop loading.

## 9. Standing "never" list

| Never | Because |
|---|---|
| Creating a monitor, alert, cron, email, digest, popup, modal or banner without asking | he decides what is allowed to interrupt him |
| Google Business Profile, on any site | suspension risk |
| SMS lead acknowledgement | owner decision |
| Per-site Resend sending domains | owner decision |
| DeepSeek, any task | reasoning quality |
| Quote-based PR or expert-dependent outreach | the owner is not a qualified accountant; off-site authority must be faceless (data-PR, embeddable tools, citations, GEO) |
| Em-dashes in user-facing copy | AI tell |
| Collapsing pages / adding `DUPLICATE_REDIRECTS` | 301s are hard to reverse; rewrite always is |
| Auto-deploying | owner-triggered only |
| Concluding from stored search snapshots | stale data, wrong diagnosis |
| Partner outreach for a lead-gen site under 5 leads/month | nothing to sell yet |

## 10. Where the detail lives

- Monitoring, notification policy, incident log — `docs/_engines/CARETAKER.md`
- Program methodology — `docs/_engines/REWRITE_PROGRAM.md`, `NETNEW_PROGRAM.md`
- Per-site state — `docs/<site>/STATE.md`
- Deploy mechanics, project IDs, clean-worktree rule — memory
  `vercel_cli_deploy_workflow`
- Ground truth (tax facts, per-site config, API credentials) — memory; those
  files are factual and were deliberately NOT consolidated here.
