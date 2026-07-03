# Lead Nurture Observability Layer

*Built 2026-07-02 (architect + 6 parallel Sonnet builders, adversarial Opus review, one fix pass). Staging-applied and verified. DORMANT, uncommitted. Prod apply + deploy are owner-gated. Companion to `LEAD_NURTURE_SYSTEM.md` and `LEAD_NURTURE_HANDOFF.md`.*

## Why this exists
The nurture system auto-messages real leads once `LEAD_NURTURE_ENABLED` is set. Before flipping that flag you need to (1) see the funnel and where leads stick, (2) catch failed sends and bad deliverability signals early, (3) get a daily digest, and (4) be able to pause the whole system without a redeploy. This layer delivers all four. It reads only existing tables plus one small control table; it does not touch the hardened send path.

## Components

### 1. Migration `supabase/migrations/20260702000001_lead_nurture_observability.sql`
Additive + idempotent (drop-then-create for the reshaped views). Adds:
- **`lead_nurture_control`** — single-row (`id=1`) control plane: `paused`, `paused_reason`, `paused_at`, `paused_by`, `last_alert_at`, `last_alert_key`, `updated_at`. RLS on, no policies (service-role only). Seeded `paused=false`.
- **`vw_lead_nurture_health`** — per `site_key`, counts only (no PII): 24h/1h send volume (`sends/sent/failed/skipped`), `complaints_24h/7d`, `bounces_24h/7d`, `optouts_7d`, `replies_24h`, `booked_24h`, `active_leads`, `stuck_leads` (active + overdue > 3h), `contactable/unreachable/forwarded`. Built from independent per-table CTEs LEFT JOINed to a distinct-site base, so no join fan-out. Lead counts are `count(distinct lead_id)`.
- **`vw_lead_nurture_step_health`**: per `(site_key, sequence, step)` wide: `sent/failed/skipped`. Spots a step that consistently fails or is skipped. (Originally `(site_key, step)`; the `sequence` dimension was added 2026-07-03, see the multi-sequence note below.)
- **`vw_lead_nurture_stuck`**: actionable list of active leads overdue > 3h (`lead_id`, `full_name`, `sequence`, `created_at`, `step`, `next_action_at`, `overdue_hours`). Service-role only (same PII gating as `leads`). One row per `(lead, sequence)`; the `sequence` column (added 2026-07-03) shows which primary flow a lead is stuck in.

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

## EMERGENCY PAUSE (no redeploy) — runbook (GAP-4)
Three ways to stop all sends immediately, fastest first. Pausing sets `lead_nurture_control.paused=true`; the hourly cron reads it every run and short-circuits the main run + aux scans (guardrail alerting still runs). Un-pausing is the reverse. **No redeploy needed for any of these.**

1. **Console button (preferred).** Estate-console → the site's page → Lead contactability → **Pause sends**. Gated by the console login cookie. Requires the console deployment to be live (Wave 2 redeploy).
2. **SQL (always works, even if the console is down).** In the Supabase dashboard SQL editor for the Property project (`dhlxwmvmkrfnmcgjbntk`):
   ```sql
   -- PAUSE everything now:
   update public.lead_nurture_control
     set paused = true, paused_reason = 'manual emergency pause', paused_at = now(), paused_by = 'owner-sql', updated_at = now()
   where id = 1;
   -- RESUME:
   update public.lead_nurture_control
     set paused = false, paused_reason = null, paused_at = null, paused_by = 'owner-sql', updated_at = now()
   where id = 1;
   -- CONFIRM current state:
   select paused, paused_reason, paused_at, last_cron_run_at from public.lead_nurture_control where id = 1;
   ```
   Effect is immediate on the next hourly cron tick (at most ~1 hour). To also stop the instant step-0 send at submit time, additionally flip the env flag (option 3).
3. **Env kill (stops instant sends too, needs a redeploy to take effect).** Set `LEAD_NURTURE_ENABLED` to empty/`0` in Vercel prod and redeploy. This is the master arm; it stops both the cron AND the synchronous submit-time touch. Slower (redeploy) but total. Deploy from repo root: `VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU npx vercel --prod --yes`.

Note: the kill switch fails OPEN (a DB read error returns "not paused") so sends are never blocked by a bad DB state; this means a paused state must be confirmed from the row above, not inferred from behaviour.

## Wave 2 observability additions (2026-07-02)
Migration `supabase/migrations/20260702000003_lead_nurture_observability_v2.sql` (additive + idempotent):
- **Cron heartbeat (GAP-3):** `lead_nurture_control` gains `last_cron_run_at` / `last_digest_run_at`. The hourly cron and the daily digest stamp their column every authorised run. The console shows a live/amber/**STALE** badge (hourly red if > 2h, digest red if > 25h) and the daily digest carries a "CRON LIVENESS" line, so a dead cron is now distinguishable from a genuinely quiet day. **Owner action recommended:** wire an EXTERNAL dead-man's-switch (e.g. an uptime monitor or a healthchecks.io ping the cron hits) so a total outage is caught even if the whole app is down. The internal heartbeat + digest liveness line are the in-app signal; they cannot catch "the app is entirely offline".
- **Funnel cohort (GAP-7):** `vw_lead_contactability_funnel` now counts only the ENROLLED cohort (leads with a `lead_nurture_state` row), so the 47 pre-go-live leads no longer dilute every rate. Enrolment is the go-live cohort filter (no hardcoded date).
- **Step-health accuracy:** `vw_lead_nurture_step_health` excludes the aux sequences (`booking_reminder:*`, `abandoned_booking`) so reminder/nudge sends no longer inflate the primary sequences' step 0/1. (As of 2026-07-03 the view also splits by `sequence`, so the two primary flows read apart; see the multi-sequence note.)
- **Open/click (AN-5):** `vw_lead_nurture_health` now returns `opened_24h/clicked_24h/opened_7d/clicked_7d` (populate once the Resend engagement webhook secret, H3, is set).
- **T0 experiment readout (AN-6):** console computes the branded-vs-personal split by recomputing `t0Variant(leadId)` (shared `@accounting-network/web-shared/lead-nurture/t0`) over the enrolled cohort; no persisted variant column needed.
- **Windowed contactability rate (AN-7):** console shows the contactable rate for 7d / 28d / all-time over the enrolled cohort, so week-over-week movement against the 3-of-9 baseline is readable.

Apply: `python scripts/apply_web_analytics_migrations.py staging 20260702000003` then `... prod 20260702000003` (owner-gated; requires 20260702000001 first). Then redeploy Property (heartbeat writes + digest line) and the estate-console (new panels + pause button).

## Multi-sequence observability additions (2026-07-03)
A second PRIMARY sequence, `property_detail_capture`, now runs ALONGSIDE `property_contactability` (it chases email-only leads for a missing name and/or phone; full design in `docs/property/LEAD_DETAIL_CAPTURE.md`). The system is no longer single-sequence, so the per-step / stuck views gained a `sequence` dimension in `supabase/migrations/20260703000001_lead_nurture_multi_sequence_views.sql` (additive + idempotent):
- **`vw_lead_nurture_step_health`** is now grouped by `(site_key, sequence, step)`. Previously `(site_key, step)`, which would have SUMMED both primary sequences into a single step row once detail-capture went live. The aux-sequence exclusions and the sent/failed/skipped counts are unchanged.
- **`vw_lead_nurture_stuck`** now exposes `sequence`, so an operator sees which primary flow a stuck lead is stuck in. All other columns and the >3h overdue filter are identical.
- The **funnel** (`vw_lead_contactability_funnel`) and **health** (`vw_lead_nurture_health`) views are deliberately NOT split: they count a lead once (`count(distinct lead_id)`) and a lead is in exactly one primary sequence at a time, so their totals stay correct.
- **Console:** `NurtureStepHealth` gains a `sequence` field; `StuckLead` gains an optional `sequence`. `getNurtureStepHealth` filters to `sequence=eq.property_contactability` so the live "Where leads get stuck" panel is byte-for-byte unchanged (a detail-capture panel can drop the filter later). `getStuckLeads` includes `sequence` in the select (backward-compatible).

Apply: `python scripts/apply_web_analytics_migrations.py staging 20260703000001` then `... prod 20260703000001` (owner-gated; requires 20260702000001 first). Rollback = re-run 20260702000003 (step_health) and 20260702000001 (stuck) to drop the `sequence` column.

## Deferred (documented, not built)
- Per-lead hard-bounce auto-stop (currently a hard bounce is recorded but the lead is not auto-stopped; the system-level bounce alert covers it).
- Attempt-count / send-latency columns on `lead_nurture_sends` (would enable retry-loop and claim-to-confirm latency views; kept off to avoid touching the hardened send path).
- Estate-wide (non-Property) health surfacing.
