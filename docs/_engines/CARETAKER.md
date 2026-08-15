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
| `scripts/lead_capture_tripwire.py` (6-hourly) | L2 | bundle corruption + form-start-without-submit flatline | its heartbeat |
| nurture guardrails + autopause (`nurture-health.ts`, hourly in-app) | L1 | complaints, failed sends, bounces, stuck leads | state_check frozen-heartbeat rule |
| `deploy-watch` cron + table | L1 | post-deploy metric gates | state_check overdue-gate rule |
| Vercel built-ins (deploy-failure email, Error Anomaly, Observability Plus) | L0 | build failures, 5xx anomalies | caretaker |
| Caretaker agent (`caretaker.yml` + PROMPT.md, Mondays) | L3 | everything above, incl. this file | its heartbeat + state_check workflow rules |

## Secrets the stack needs (GitHub repo)

`SUPABASE_ACCESS_TOKEN` `SUPABASE_URL` `SUPABASE_KEY` `SUPABASE_ANON_KEY`
`ANTHROPIC_API_KEY` `VERCEL_TOKEN` `VERCEL_ORG_ID` `TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN` `RESEND_API_KEY` `RESEND_FROM_EMAIL` `TRIPWIRE_NOTIFY_TO`
`LEAD_PROBE_SECRET` `BETTERSTACK_API_TOKEN` `HEARTBEAT_STATE_CHECK`
`HEARTBEAT_TRIPWIRE` `HEARTBEAT_CARETAKER`
Vercel (Property project): `SENTRY_DSN` `HEARTBEAT_LEAD_NURTURE`
`HEARTBEAT_DIGEST` `HEARTBEAT_RETENTION` `HEARTBEAT_RECONCILE`
`HEARTBEAT_DEPLOY_WATCH`
Missing secrets self-report: the `secrets` lane alarms on any of these a live
workflow references but the repo lacks.

## What was deliberately killed (do not resurrect without a reason)

- `risk-manager.yml` — deleted 2026-08-15; superseded by this stack (alerts
  went nowhere anyone read). `agents/utils/alerting.py` stays only because
  four retired agents still import it; it goes when `agents/` goes.
- Windows Task Scheduler `\SiteHealthDailySnapshot` — failed every run since
  2026-05-21; nothing scheduled lives on a laptop any more.
