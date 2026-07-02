# Lead Nurture Observability Layer

*Built 2026-07-02 (architect + 6 parallel Sonnet builders, adversarial Opus review, one fix pass). Staging-applied and verified. DORMANT, uncommitted. Prod apply + deploy are owner-gated. Companion to `LEAD_NURTURE_SYSTEM.md` and `LEAD_NURTURE_HANDOFF.md`.*

## Why this exists
The nurture system auto-messages real leads once `LEAD_NURTURE_ENABLED` is set. Before flipping that flag you need to (1) see the funnel and where leads stick, (2) catch failed sends and bad deliverability signals early, (3) get a daily digest, and (4) be able to pause the whole system without a redeploy. This layer delivers all four. It reads only existing tables plus one small control table; it does not touch the hardened send path.

## Components

### 1. Migration `supabase/migrations/20260702000001_lead_nurture_observability.sql`
Additive + idempotent (drop-then-create for the reshaped views). Adds:
- **`lead_nurture_control`** — single-row (`id=1`) control plane: `paused`, `paused_reason`, `paused_at`, `paused_by`, `last_alert_at`, `last_alert_key`, `updated_at`. RLS on, no policies (service-role only). Seeded `paused=false`.
- **`vw_lead_nurture_health`** — per `site_key`, counts only (no PII): 24h/1h send volume (`sends/sent/failed/skipped`), `complaints_24h/7d`, `bounces_24h/7d`, `optouts_7d`, `replies_24h`, `booked_24h`, `active_leads`, `stuck_leads` (active + overdue > 3h), `contactable/unreachable/forwarded`. Built from independent per-table CTEs LEFT JOINed to a distinct-site base, so no join fan-out. Lead counts are `count(distinct lead_id)`.
- **`vw_lead_nurture_step_health`** — per `(site_key, step)` wide: `sent/failed/skipped`. Spots a step that consistently fails or is skipped.
- **`vw_lead_nurture_stuck`** — actionable list of active leads overdue > 3h (`lead_id`, `full_name`, `created_at`, `step`, `next_action_at`, `overdue_hours`). Service-role only (same PII gating as `leads`). Per `(lead, sequence)`; 1:1 today because only `property_contactability` exists.

Apply: `python scripts/apply_web_analytics_migrations.py staging 20260702000001` (done + verified 2026-07-02), then `... prod 20260702000001` (owner-gated). Requires the base nurture migration `20260701000001` applied first.

### 2. Kill switch — `Property/web/src/lib/leads/nurture-control.ts`
`getNurtureControl` / `isNurturePaused` (both **fail-open**: a missing table or query error returns "not paused", so the layer can never block the cron), `pauseNurture(reason, by)`, `resumeNurture(by)`, `recordGuardrailAlert(key)` (24h alert-dedup state). Reuses the shared service-role admin client.

### 3. Detectors + digest — `nurture-health.ts` + `nurture-digest.ts`
- **`evaluateGuardrails(health)`** — pure, deterministic threshold policy (unit-tested matrix). Returns breaches + `shouldPause` + `pauseReason`.
- **`runNurtureGuardrails({ autopauseEnabled })`** — reads the health view, evaluates, sends ONE throttled operator email on any breach (deduped 24h via `last_alert_key`), and if `autopauseEnabled` and a pause-severity breach fires and not already paused, calls `pauseNurture(reason, "auto")`. Runs hourly inside the existing cron (env-armed only). A failure here is caught and never breaks the cron.
- **`runNurtureDigest()`** — daily operator email: funnel, per-step bottleneck note, stuck-lead list, failed-send list, deliverability tallies, pause state. Returns `{sent:false}` on dormant/empty days (no spam). Composed dash-free.

### 4. Cron wiring — `Property/web/src/app/api/cron/...`
- Hourly `/api/cron/lead-nurture`: now gates on `LEAD_NURTURE_ENABLED (env) AND NOT db-paused` for both the main run and aux scans; after the aux scans it calls `runNurtureGuardrails` (env-armed, regardless of db-pause so alerting continues). `guard` + `dbPaused` appear in the JSON response.
- New `/api/cron/lead-nurture-digest` at **`0 7 * * *`** (registered in `vercel.json`): CRON_SECRET bearer auth (same as the hourly route), skips when disarmed, else `runNurtureDigest()`.

### 5. Console — Property "Lead contactability" panel (`console/web` + `packages/web-shared/console/adminData.ts`)
Adds a **System health** strip (red PAUSED banner with reason/when/who, or green Active; 24h send-success, complaints, bounces, opt-outs, active/stuck tiles), a **Where leads get stuck** per-step view, and **Stuck / overdue leads** + **Failed sends** accordions. A **Pause / Resume** button POSTs to `/api/nurture-control`, which is gated by the console's own `checkAuth()` cookie (same protection as every other console page; 401 before any write). All panels degrade to a "pending" state when the views are absent (i.e. before the prod migration lands).

## Guardrail thresholds (`DEFAULT_THRESHOLDS`, low-volume-aware — tune in `nurture-health.ts`)
| Rule | Severity | Fires when |
|---|---|---|
| `complaints_24h` | pause | >= 2 spam complaints in 24h |
| `complaints_7d` | pause | >= 3 spam complaints in 7d |
| `failed_send_rate_1h` | pause | > 25% of the last hour's **real attempts** failed, with >= 4 real attempts (real attempts = `sends_1h - skipped_1h`, so skipped/test sends do not dilute the signal) |
| `hard_bounce_rate` | alert | > 5% hard-bounce rate over **emails actually sent** (`bounces_24h / sent_24h`), once `sent_24h >= 20` |
| `optouts_7d` | alert | >= 3 opt-outs in 7d |
| `stuck_leads` | alert | >= 3 active-but-overdue leads (cron not advancing them, usually all channels failing) |

Absolute counts now (rates are meaningless at ~20-lead volume); revisit toward rate-based thresholds as volume climbs. Alert-severity breaches email the operator but never pause.

## Arming sequence (graduated)
1. Prod migration `20260701000001` then `20260702000001` (owner sign-off). Console panels light up.
2. Deploy (owner). The digest cron registers automatically.
3. Flip `LEAD_NURTURE_ENABLED` + channel flags to go live (per `LEAD_NURTURE_SYSTEM.md`). Guardrails now run **alert-only** (auto-pause is off by default) and the daily digest sends.
4. After watching the alerts behave, arm auto-pause with **`LEAD_NURTURE_AUTOPAUSE_ENABLED=1`** (Vercel env). Un-pausing after an auto-pause needs no redeploy: use the console Pause/Resume button (or `resumeNurture`).

## New env var
- **`LEAD_NURTURE_AUTOPAUSE_ENABLED`** — `1`/`true` arms the automated DB pause; unset/anything else = alert-only. Default off.

## Gates at close (2026-07-02)
Property tsc PASS, console tsc PASS, Property vitest 706, web-shared vitest 326. Migration applied to staging (`fyabqbuklfrjqjxaofcx`) and all three views + control row verified queryable. Adversarial review clean after the fix pass (2 HIGH integration bugs fixed: step-health view pivoted to wide; digest `created_at`->`ts`).

## Deferred (documented, not built)
- Per-lead hard-bounce auto-stop (currently a hard bounce is recorded but the lead is not auto-stopped; the system-level bounce alert covers it).
- Attempt-count / send-latency columns on `lead_nurture_sends` (would enable retry-loop and claim-to-confirm latency views; kept off to avoid touching the hardened send path).
- Estate-wide (non-Property) health surfacing.
