# CARETAKER — how this estate watches itself

> **This map is verified against reality by the caretaker agent on the first
> Monday of each month. The latest caretaker audit (email / `caretaker-verdict`
> artifact) outranks this file. Hand-edits here without a matching monitor
> change are exactly the rot this system exists to kill.**

Built 2026-08-15 after a full audit found four revenue-relevant systems broken
for weeks with zero signal. The design cures five failure modes that all
actually happened in this repo:

| # | Rot mode (proven case) | Structural cure | Layer |
|---|---|---|---|
| 1 | **Lying monitors** — digest reported "nothing stuck" while its queries failed; enrich probe said `aiReady:true` forever | Fail-loud choke point (`admin.call()` logs every non-2xx); probes report last real OUTPUT, not config presence | L1 |
| 2 | **Monitors dying silently** — Task Scheduler snapshot job red since 21 May, unnoticed; tripwire alert email unsendable | Dead-man heartbeats: the ping comes from inside the work; silence IS the alert. Vercel gives nothing for dead crons, so this is the only cure | L0 |
| 3 | **Unread alerts** — risk-manager disabled: "re-enable when wired to a destination that gets read" | One channel (email, junayd@), and dedup: alert only when the finding SET changes, weekly reminder at most | L2/L3 |
| 4 | **Rotting checklists** — hardcoded counts, dead paths, stale docs | Self-discovering lanes (new tables/crons/env vars announce themselves as NEW/UNKNOWN); monthly monitor audit by the caretaker agent recommends KEEP/UPDATE/KILL | L2/L3 |
| 5 | **Frozen-value blindness** — a heartbeat that stops changing produces no diff | `HEARTBEAT_MAX_AGE_HOURS` rule: a stamp older than tolerance = ALARM | L2 |

Nothing watches only itself: L0 (external) catches L2/L3 dying; L2 catches
workflow and env drift; L3 audits L0/L1/L2 monthly with reasoning.

## The layers

- **L0 — silence-is-alert externals** (Better Stack free + Sentry free, £0/mo):
  heartbeats pinged from inside each cron/workflow on successful completion;
  one uptime keyword check on the Property homepage; Sentry emails on any new
  server error (captures every `console.error` via captureConsole).
- **L1 — fail-loud plumbing**: `packages/web-shared/nurture/admin.ts` logs
  every failed DB call at the single choke point ~30 callers share;
  `createTrackHandler` logs ingest failures in prod; money-path skips are
  distinct from db-errors (`handoff.ts`, `contactability.ts`).
- **L2 — daily estate walk**: `scripts/state_check.py` on GitHub Actions
  (06:00 UTC). 8 self-discovering lanes + hard rules (Twilio runway, frozen
  heartbeats, failed/stalled workflows, pipeline coverage, lead flatline
  canary, overdue deploy-watch gates, missing secrets, schema drift,
  freshness). Deduped email via `scripts/state_check_email.py`.
- **L3 — weekly reasoning**: `.github/workflows/caretaker.yml` (Mon 07:00) runs
  the end-to-end probes then `claude -p` with `.github/caretaker/PROMPT.md`:
  root-causes every ALARM/BLIND, and monthly audits every monitor against live
  sources, diffing this very file against reality.

## Monitor map (one line each; the caretaker verifies this list monthly)

| Monitor | Layer | Watches | Watched by |
|---|---|---|---|
| Better Stack heartbeat `lead-nurture` (grace 2h) | L0 | hourly nurture cron alive | caretaker monthly audit |
| Better Stack heartbeats `digest`/`retention`/`reconcile`/`deploy-watch` (grace 26h) | L0 | daily Property crons alive | caretaker |
| Better Stack heartbeat `state-check` (grace 26h) | L0 | the daily walk itself ran | caretaker |
| Better Stack heartbeat `tripwire` (grace 13h) | L0 | 6-hourly tripwire workflow alive | caretaker |
| Better Stack heartbeat `caretaker` (grace 8d) | L0 | the weekly reasoning ran | state_check workflow rules |
| Better Stack uptime check, Property homepage keyword | L0 | site up + rendering | caretaker |
| Sentry (Property/web, server-only, DSN-gated) | L0/L1 | every server `console.error` + request error | caretaker (30d-silence check) |
| `admin.call()` fail-loud log | L1 | every Supabase REST failure estate-wide | Sentry |
| `createTrackHandler` prod logging | L1 | analytics ingest failures | Sentry |
| `scripts/state_check.py` (8 lanes + rules) | L2 | money, exposure, env, schema, freshness, jobs, secrets, leads, pipeline coverage, canary | its heartbeat + red-run email |
| `scripts/state_check_email.py` | L2 | deduped alarm delivery | red-run backstop |
| `scripts/lead_capture_tripwire.py` (6-hourly) | L2 | bundle corruption + form-start-without-submit flatline, self-arbitrated by a synthetic probe. Emails nobody; red run = verified-broken capture only | its heartbeat + caretaker re-runs it into `out/probes/tripwire.log` |
| `optimisation_engine/discovery/competitor_watch.py` (weekly, `weekly_run.py` Step 1.6) | L2 | competitor sitemap diff -> `competitor_urls_seen`/`discovery_log`; free (no DFS spend on this path) | `scripts/competitor_watch_email.py` deduped digest |
| nurture guardrails + autopause (`nurture-health.ts`, hourly in-app) | L1 | complaints, failed sends, bounces, stuck leads. **The only nurture email channel**, deduped on breach-set change | state_check frozen-heartbeat rule |
| `nurture-digest.ts` daily cron, 9 sites (07:00 UTC) | L1 | same metrics, **log + dashboard only, sends no email since 2026-08-16**; keeps stamping `lastDigestRunAt` | state_check frozen-heartbeat rule |
| `deploy-watch` cron + table | L1 | post-deploy metric gates | state_check overdue-gate rule |
| `scripts/check_dependency_closure.py` (every CI run, all 19 sites) | L2 | deployability: any site importing a package nothing installs | red CI on the PR that introduces it |
| Vercel built-ins (deploy-failure email, Error Anomaly, Observability Plus) | L0 | build failures, 5xx anomalies | caretaker |
| Caretaker agent (`caretaker.yml` + PROMPT.md, Mondays) | L3 | everything above, incl. this file | its heartbeat + state_check workflow rules |

## Secrets the stack needs (GitHub repo)

`SUPABASE_ACCESS_TOKEN` `SUPABASE_URL` `SUPABASE_KEY` `SUPABASE_ANON_KEY`
`CLAUDE_CODE_OAUTH_TOKEN` (from `claude setup-token`; the Anthropic key is subscription-only, no API credits) `VERCEL_TOKEN` `VERCEL_ORG_ID` `TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN` `RESEND_API_KEY` `RESEND_FROM_EMAIL` `TRIPWIRE_NOTIFY_TO`
`LEAD_PROBE_SECRET` `BETTERSTACK_API_TOKEN` `HEARTBEAT_STATE_CHECK`
`HEARTBEAT_TRIPWIRE` `HEARTBEAT_CARETAKER`
Vercel (Property project): `SENTRY_DSN` `HEARTBEAT_LEAD_NURTURE`
`HEARTBEAT_DIGEST` `HEARTBEAT_RETENTION` `HEARTBEAT_RECONCILE`
`HEARTBEAT_DEPLOY_WATCH`
Missing secrets self-report: the `secrets` lane alarms on any of these a live
workflow references but the repo lacks.

## Incident 2026-08-16: the estate was undeployable for nine days and nothing said so

Found by trying to deploy, which is the point. Property deployed first time.
Every other site failed with `Module not found`, in three successive rounds:
`web-vitals`, then `resend`, then `botid`.

**Cause.** Sites imported packages they never declared, and npm workspace
hoisting resolved them anyway out of a SIBLING site's `package.json`, because a
deploy used to upload the whole monorepo. Only Property declared `resend`,
`web-vitals` and `botid`; only generalist declared `geist`; nobody declared
`zod`. On 2026-08-15 `.vercelignore` became an allowlist that narrows each
upload to the site being built plus `/packages` — correct in itself, and it
removed the accident that was hiding the missing declarations. Nothing had
deployed since 08-07, so the estate sat broken and silent for nine days.

**Why no monitor caught it.** Every layer was watching runtime. Nothing watched
*deployability*. `ci-build-test.yml` only builds CHANGED sites, and the change
that broke everything (`.vercelignore`) is not in any site's path filter. A
green CI and a live site are both perfectly compatible with "nothing can ship".

**Cure.** `scripts/check_dependency_closure.py`, wired into the cheap `changes`
job of `ci-build-test.yml`. It models what Vercel actually installs
(`npm ci --workspace=<site>/web --include-workspace-root`) and asserts that
every bare import in a site's `src`, plus every import in `web-shared`, is
declared by that site, by web-shared, or by the root. Whole estate, every run,
about a second, no build required — because an undeclared import is introduced
by editing site A and breaks whichever site deploys next. It immediately found
four more sites nobody had tried to deploy (charities, crypto, hospitality,
pharmacies, all importing `lucide-react` undeclared).

**The generalisable rule:** a dependency that resolves by accident is a
dependency that will stop resolving without warning. Declare what you import,
and assert it in CI rather than at deploy time.

## Notification policy (owner, 2026-08-16)

Set after a weekend in which the owner received four content-free GitHub failure
mails a day from the tripwire plus up to nine near-identical nurture digests,
none of which needed a human. The stack is allowed to watch anything; it is not
allowed to interrupt for anything a machine can adjudicate.

1. **A heuristic never notifies on its own verdict.** It may only decide whether
   to spend a deterministic check. The deterministic check decides. A heuristic
   whose suspicion is cleared produces silence, not a "probably fine" email.
2. **Routine state is read, not sent.** If the console dashboard already renders
   it, it does not get an email. Daily "here are yesterday's numbers" mail is
   banned outright; that is what `console/web` is for.
3. **One channel, estate-wide, deduped on finding-set change.** Never one mail
   per site for a condition that spans sites. A persisting identical finding
   never re-mails, at any age (owner request 2026-07-19, extended here).
4. **A red CI run is a notification.** So a workflow exits non-zero only for a
   verified defect, never for a suspicion. Exit 0 and write the detail to the
   step summary instead.
5. **Price a probe before scheduling it.** See rot mode 6 below.

Rot mode 6, added 2026-08-16: **monitors that cost money or attention per run.**
Cure: every scheduled check states its per-execution cost (API credits, paid
lookups, operator interruptions) in its own docstring, and anything that
interrupts a human must survive the question "what would he do differently on
receiving this?"

## Known false-alarm classes (diagnosed once, so nobody re-diagnoses them)

A monitor that cries wolf gets ignored, which is rot mode 3 arriving by a
different door. Each entry below is a pattern that already produced a bogus
alert, the evidence that it was bogus, and the structural change that stops it
recurring. Add to this list rather than muting a monitor.

### Weekend lead flatline (diagnosed 2026-08-16)

**Symptom.** `Lead-capture tripwire` red every 6 hours across 15-16 Aug; the
only notice reaching the owner was GitHub's content-free "all jobs have failed",
four times a day, because `RESEND_API_KEY` was never set in the repo so the
script's actual diagnosis died in the run log.

**What it saw.** 13 form-starts, 0 `lead_submitted`, 0 leads, 151 human sessions
in 24h. Last genuine lead 2026-08-14 13:07 UTC.

**Why it was bogus.** The 5-form-starts-and-zero-submits threshold was tuned
against the weekday rate (3-6 submits/day). The weekend rate is 0-1/day: Sat
07-19 was already a zero day inside the trailing 30, and 08-08/08-09 and
08-15/08-16 both sat at 0-1. Form engagement was normal throughout (71
`form_step_view` on the Saturday). A synthetic lead through
`POST /api/leads/submit` returned `success:true` with the row written and
verification running, proving the path healthy while the tripwire called it
broken.

**Structural cure.** The heuristic no longer renders a verdict; it only decides
whether to spend a probe, and the probe decides. False alarm = green run, no
mail, verdict in the step summary. The tripwire sends no email at all now, and
the weekly caretaker re-runs it so a standing flatline still gets a reader.

**Do not** raise `TRIPWIRE_FORM_START_FLOOR` to silence this. The floor is what
makes the probe cheap; the probe is what makes the answer true.

**Two things the cure itself dragged in, both now handled, both worth
remembering as a pattern:**

1. *A probe is a spender.* `/api/leads/submit` runs `verifyLead` on every
   submission, which costs a Twilio Lookup and (where `EMAIL_VERIFY_API_KEY` is
   set) a ZeroBounce credit. A monitor firing four times a day would have spent
   ~120 of each per month, invisibly, forever, against a Twilio balance that is
   itself a monitored runway. The route now honours `skip_verification`, but
   **only for a test lead**, so no real submission can dodge verification by
   setting a flag; test leads still verify by default because exercising the
   whole path is the point of a synthetic. Until that deploy lands the probe is
   capped to one run a day (`TRIPWIRE_PROBE_HOURS`, default `0`) and uses a
   phone `toE164UK` cannot parse, so Twilio is never called. Widen to
   `0,6,12,18` once Property is deployed. **Rule: before scheduling any probe,
   price one execution.**
2. *A check whose subject no longer exists must be retired, not reworded.* The
   bundle check hunts an inlined `supabase.co` in the live JS. **Every** lead
   surface now posts to `/api/leads/submit`, so no client-side Supabase config is
   shipped at all and that marker can never appear again. The check is not
   degraded, it is obsolete: the 2026-06-24 class (a bad `NEXT_PUBLIC_*` paste
   silently breaking client inserts) is no longer reachable, because there is no
   client insert. What replaced it is the synthetic probe. Keep the marker scan
   only as a regression guard against a client insert path being reintroduced.

## Corrected 2026-08-16: "ResourceGate is broken" was wrong

Recorded because the reasoning error matters more than the fact. The claim was
that ResourceGate download capture had silently died: zero `role='resource'`
leads ever, zero `resource_unlocked` events ever, `gate_view` dead since
2026-06-16, no inlined Supabase config in any reachable chunk, and
`ResourceGate.tsx:111` hard-fails to "Download not connected" without it.

Every one of those observations is true. The conclusion was not. **ResourceGate
is decommissioned, not broken.** `GateOrForm.tsx` renders `MiniCapture`, and its
docstring says why: *"replacing the email-gated Excel download that nobody
unlocked (50 views, 0 unlocks)"*. Nothing imports `ResourceGate` or
`ResourceGateLazy`; the only remaining references are prose. Zero events is the
correct reading for a retired surface.

The error came from trusting comments over call sites. Three stale docstrings
still described ResourceGate in the present tense as a live surface
(`api/leads/submit/route.ts`, `lib/leads/submit-client.ts`,
`CalculatorPageResources.tsx`), the component file still existed and still
contained a plausible failure branch, and absence-of-data was read as evidence
of breakage when "the surface was retired" explained it at least as well. Those
three comments have been corrected. **Rule: a surface is live because something
renders it, never because a docstring says so; and missing data is a question,
not a finding.**

### Consequences, all closed 2026-08-16

`scripts/property_synthetic_lead_check.mjs` inserted anonymously into PostgREST
"exactly as the live form does". No live form had done that since the move to
`/api/leads/submit`; its last caller was ResourceGate. So the caretaker's
money-path probe had been passing green while testing nothing, and PROMPT.md
called its result "the single most important finding possible" — rot mode 1
inside the caretaker itself. **Retired.** The tripwire's probe, which posts
through the real route, is now the money-path probe and the caretaker runs it.

Deleted with it: `ResourceGate.tsx`, `ResourceGateLazy.tsx` and
`/api/resources/deliver` (the gate was its only caller). Property now ships no
client-side Supabase config and has exactly one lead chokepoint.

Untouched: the other eight sites keep their own ResourceGate. Several still
render it from `app/resources/[topic]/page.tsx`, so this was a Property-only
removal — do not generalise it without checking each site's call sites.

## What was deliberately killed (do not resurrect without a reason)

- `risk-manager.yml` — deleted 2026-08-15; superseded by this stack (alerts
  went nowhere anyone read). `agents/utils/alerting.py` stays only because
  four retired agents still import it; it goes when `agents/` goes.
- Windows Task Scheduler `\SiteHealthDailySnapshot` — failed every run since
  2026-05-21; nothing scheduled lives on a laptop any more.
