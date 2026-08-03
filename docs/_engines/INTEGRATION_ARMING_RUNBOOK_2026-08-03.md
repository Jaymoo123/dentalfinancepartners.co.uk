# Integration arming runbook, 2026-08-03

Prepared, NOT executed. Nothing in this document has been run. No env var was set, no
webhook created, no migration applied, no deploy made, no flag flipped.

Scope: eight built-but-dark integrations on the Property project
(`property-tax-partners`, `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`, team
`team_XF9WAygZX7SGk9Fo4tOAnihH`).

House rules observed: no em-dashes, British English, no secret values printed.

---

## 0. Ground truth pulled for this runbook (read-only)

**Live Vercel Production env (names only, `vercel env ls production`, 2026-08-03):**

Present: `CRON_SECRET`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`LEAD_NURTURE_ENABLED`, `LEAD_NURTURE_EMAIL_ENABLED`, `LEAD_NURTURE_SMS_ENABLED`,
`LEAD_NURTURE_TOKEN_SECRET`, `LEAD_RESEND_INBOUND_SECRET`, `LEAD_SERVICE_FROM_EMAIL`,
`LEAD_SERVICE_FROM_NAME`, `LEAD_SERVICE_REPLY_TO`, `LEADS_NOTIFY_SECRET`,
`LEADS_NOTIFY_CC_EXCLUDE_SOURCES`, all 5 Twilio vars, `ADMIN_DASHBOARD_KEY`,
`NEXT_PUBLIC_*`, `NURTURE_*`, `NEXT_PUBLIC_MINIFORMS_MULTISTEP`.

Absent (confirms all eight are genuinely dark): `LEADS_SYNC_SECRET`,
`GOOGLE_SERVICE_ACCOUNT_B64`, `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_TAB`,
`LEAD_RESEND_WEBHOOK_SECRET`, `LEAD_RETENTION_PURGE_ENABLED`, `LEAD_RECONCILE_ENABLED`,
`LEAD_NURTURE_AUTOPAUSE_ENABLED`, `LEAD_COPY_AI_ENABLED`, `LEAD_CONCIERGE_ENABLED`,
`LEAD_INTERNAL_SECRET`, **`ANTHROPIC_API_KEY`**.

**Live DB triggers on `public.leads` (prod `dhlxwmvmkrfnmcgjbntk`):**
`leads_to_email_trg`, `leads_to_enrich_trg`, `stitch_lead_to_session_trg`.
`leads_to_sheets_trg` is **NOT** present, matching the 2026-06-01 note.

**Live nurture health (`vw_lead_nurture_health`, site_key='property'):**
sends_24h 17, sent_24h 11, failed_24h 2, skipped_24h 4, sends_1h 1, failed_1h 0,
complaints_24h 0, complaints_7d 0, bounces_24h 0, bounces_7d 0, optouts_7d 2,
replies_24h 2, booked_24h 1, active_leads 8, stuck_leads 0, contactable 45,
unreachable 9, forwarded 0, opened/clicked all 0.
`lead_nurture_control` id=1 (site_key='property'): paused=false,
last_alert_key='optouts_7d' from 2026-07-20, last_cron_run_at 2026-08-03 16:01 UTC
(cron is alive).

The system is LIVE and sending to real people right now. Nothing here is a rehearsal.

---

## 0b. BLOCKER THAT APPLIES TO SEVEN OF THE EIGHT: the working tree is dirty

Every arming step except the pg_net trigger requires a Vercel redeploy for the new env
var to take effect. Vercel CLI deploys upload the **working tree**, not a git ref. The
tree currently carries four uncommitted Property source files:

| File | What deploying it would change in production |
|---|---|
| `Property/web/src/config/site.ts` | Lead-form consent wording on every phone-capturing form. Adds an onward re-referral disclosure ("if that firm is unable to help, your details may be passed to another firm in the network"). Legally material, unreviewed. |
| `Property/web/src/app/privacy-policy/page.tsx` | Matching partner-network and re-referral section. |
| `Property/web/src/lib/leads/aux-cron.ts` | T-24 reminder email copy: "one of our property tax specialists" becomes "the partner firm we introduce you to". |
| `Property/web/src/lib/leads/reply-ack.ts` | Post-YES SMS and email ack copy, same correction. |

Plus 30 other changed paths elsewhere in the repo (blogs, invoicing, legal, other
sites) which are inert for a Property deploy but ride along in the upload.

**Decide this before arming anything:** either commit and sign off this copy pass, or
stash it, or accept that arming ships it. Do not discover it after the fact. Also purge
stale `.claude/worktrees/` before deploying (2026-07-09 upload-size gotcha) and keep
`--archive=tgz`.

**Canonical deploy command (repo root, PowerShell):**

```powershell
# cwd = C:\Users\user\Documents\Accounting
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
vercel deploy --prod --yes --archive=tgz
```

**Canonical env add / remove (same two env vars set first):**

```powershell
"1" | vercel env add LEAD_EXAMPLE_FLAG production
vercel env rm LEAD_EXAMPLE_FLAG production --yes
```

Arm flags must be **Production-only**. Preview deployments write to the same prod
Supabase, so a Preview-scoped flag arms the flag against real data.

**Universal rollback for any env-var arming:** `vercel env rm <NAME> production --yes`
then redeploy. Faster emergency route: `vercel rollback` promotes the previous
deployment instantly.

---

## 1. Leads to Google Sheets sync

**Code state: COMPLETE on the app side, HALF-BUILT end to end.** The route and the
Google client exist and typecheck. The database trigger does not exist in prod, and none
of the four env vars is set. This is the only one of the eight that needs a DB change as
well as env.

- Route: `Property/web/src/app/api/leads/sync/route.ts`
- Gate: `route.ts:71-75` (`LEADS_SYNC_SECRET` unset returns 503) and `route.ts:77-79`
  (timing-safe `x-webhook-secret` compare, 401 on mismatch)
- Health probe: `route.ts:62-68` returns `{ok, secretSet, sheetsConfigured}` and leaks
  no values
- Credentials resolver: `Property/web/src/lib/leads/google-sheets.ts:74-102`
- Sanitised migration (placeholders, deliberately not applied verbatim):
  `supabase/migrations/20260529000000_leads_to_sheets_webhook.sql`
- Runbook: `docs/leads-to-google-sheets.md`

Google side is confirmed done per memory: sheet `Web_Leads`, id
`1i3v-eK6sBYM7v28vpmWe9AvGuMToCQlV2GvsKxvxcLY`, tab `Sheet1`, shared with the
`air-fryer-bot@vernal-tracer-466910-g3.iam.gserviceaccount.com` service account as
Editor, 11-column header already written. The service-account key file still exists at
`C:\Users\user\Documents\Emplifex\your-service-account.json` (verified present).

**Secret availability:** `LEADS_SYNC_SECRET` is NOT in root `.env` and NOT in Vercel. It
must be generated fresh. `GOOGLE_SERVICE_ACCOUNT_B64` is not in root `.env` either but
is derivable locally from the key file above.

### Arming steps

```powershell
# cwd = C:\Users\user\Documents\Accounting
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"

# 1. Generate a 48-byte secret. Keep it out of the transcript; write it straight to a
#    local scratch file that is never committed.
$secret = [Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Max 256 }))

# 2. Base64 the service-account JSON.
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\Users\user\Documents\Emplifex\your-service-account.json"))

# 3. Four Production-only env vars.
$secret | vercel env add LEADS_SYNC_SECRET production
$b64    | vercel env add GOOGLE_SERVICE_ACCOUNT_B64 production
"1i3v-eK6sBYM7v28vpmWe9AvGuMToCQlV2GvsKxvxcLY" | vercel env add GOOGLE_SHEETS_SPREADSHEET_ID production
"Sheet1" | vercel env add GOOGLE_SHEETS_TAB production

# 4. Redeploy (see section 0b first).
vercel deploy --prod --yes --archive=tgz
```

Then, and only after the probe in the pre-flight section below returns
`secretSet:true, sheetsConfigured:true`, create the trigger. Take
`supabase/migrations/20260529000000_leads_to_sheets_webhook.sql`, substitute
`__ENDPOINT_URL__` with `https://www.propertytaxpartners.co.uk/api/leads/sync` and
`__LEADS_SYNC_SECRET__` with the generated secret, and POST it to the Management API
(the substituted SQL must never be written back into the repo):

```bash
curl -s -X POST "https://api.supabase.com/v1/projects/dhlxwmvmkrfnmcgjbntk/database/query" \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "User-Agent: arming-runbook/1.0" \
  -d @/path/to/scratch/sheets_trigger.json
```

Custom User-Agent is mandatory: Cloudflare 403s the default Python and urllib UAs on
both the Supabase Management API and the Resend API.

**What happens the moment it is armed:** every future INSERT into the shared `leads`
table, from all seven sites, synchronously fires a 5-second pg_net POST that appends one
row to the Google Sheet. No email, no SMS, no deletion. Nothing irreversible: the sheet
is append-only and the lead is already durable in Supabase before the trigger runs
(`route.ts` header comment, lines 10-11).

**Non-obvious risk:** this is the third INSERT trigger on `leads`. If the endpoint is
slow or down, the pg_net call is fire-and-forget with a 5s timeout, so a lead insert is
not blocked, but you are adding load to the hottest write path on the estate.

**Rollback:**
```sql
drop trigger if exists leads_to_sheets_trg on public.leads;
drop function if exists public.leads_to_sheets();
```
Then optionally `vercel env rm LEADS_SYNC_SECRET production --yes` and redeploy. Rows
already written to the sheet stay written, which is the only permanent effect and is
harmless. Note `LEADS_NOTIFY_SECRET` currently falls back to `LEADS_SYNC_SECRET`
(`notify/route.ts:294`); `LEADS_NOTIFY_SECRET` is explicitly set, so adding
`LEADS_SYNC_SECRET` does not disturb the email trigger. Removing it later is likewise
safe for the same reason.

**Pre-flight check (exists, run it between the deploy and the trigger):**
```bash
curl -s https://www.propertytaxpartners.co.uk/api/leads/sync
# expect {"ok":true,"secretSet":true,"sheetsConfigured":true}
```
Then exercise the append path once with a synthetic payload before wiring the trigger,
so the first real lead is not the first test:
```bash
curl -s -X POST https://www.propertytaxpartners.co.uk/api/leads/sync \
  -H "Content-Type: application/json" -H "x-webhook-secret: <secret>" \
  -d '{"type":"INSERT","table":"leads","record":{"id":"probe","email":"probe@example.com","source":"test","full_name":"Probe row"}}'
```
Delete the probe row from the sheet afterwards (owner's clean-dashboard rule).

**Risk: arm after a pre-flight read.** Low blast radius, but it touches a shared
multi-site write path and needs a DB change, so it is not fire-and-forget.

---

## 2. Resend bounce and complaint webhook (H3)

**Code state: COMPLETE.** The route is fully implemented and has been sitting behind an
unset secret since 2026-07-02.

- Route: `Property/web/src/app/api/leads/events/route.ts`
- Gate: **`events/route.ts:134-138`**, `LEAD_RESEND_WEBHOOK_SECRET` unset returns 503
  (SEC-05 posture, refuse rather than accept unsigned)
- Signature verification: `route.ts:149-151` (Svix, timing-safe, replay-protected)
- Handlers: opened `route.ts:185`, clicked `:191`, bounced `:201`, complained `:210`
- Throttled complaint alert: `route.ts:112-128` and `:219-230`, at most one operator
  email per lead per 24h, and never for `source='test'`
- Tests: `Property/web/src/tests/lead-events.test.ts` (including the 503 case at :120)

The health view proves the blind spot is real: `opened_24h`, `clicked_24h`,
`bounces_24h`, `complaints_24h` are all 0 against 11 delivered sends in 24h. Those zeros
are not good news, they are no data. The `complaints_24h >= 2` auto-pause rule is
currently reading a dead sensor, which matters for item 5.

**Secret availability:** `LEAD_RESEND_WEBHOOK_SECRET` is NOT in root `.env`. The
*inbound* secret (`LEAD_RESEND_INBOUND_SECRET`, a different webhook) is. A full-access
Resend API key IS in root `.env`, so the webhook can be created by API and the response
returns the `whsec_` secret directly, no dashboard needed.

### Arming steps

```bash
# 1. Create the webhook. Response body contains the whsec_ signing secret.
curl -s -X POST https://api.resend.com/webhooks \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -H "User-Agent: arming-runbook/1.0" \
  -d '{"endpoint":"https://www.propertytaxpartners.co.uk/api/leads/events",
       "events":["email.opened","email.clicked","email.bounced","email.complained"]}'
```

```powershell
# 2. Set the returned whsec_ value, Production only, then redeploy.
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
"<whsec_...>" | vercel env add LEAD_RESEND_WEBHOOK_SECRET production
vercel deploy --prod --yes --archive=tgz
```

Order matters and is deliberately safe: creating the webhook first means Resend
delivers into a 503 until the env lands, which is a no-op with retries, not a failure.

**What happens the moment it is armed:** Resend starts delivering engagement events, the
route writes `opened` / `clicked` / `send_failed` rows into `lead_contact_events`, and a
spam complaint on a non-test lead sends one operator email to the internal inbox.

Real email to a real person: yes, but only to the operator inbox (`resolveLeadTo`,
`lead-routing.ts`), never to a lead and never to the partner CC. Consistent with the
partner-CC rule. Nothing deleted, nothing irreversible.

**Second-order effect worth stating plainly:** once bounce and complaint data starts
flowing, previously inert guardrail rules wake up. `complaints_24h >= 2` is a
*pause*-severity rule. It cannot pause anything today because autopause is off, but if
you arm item 5 first and item 2 second, you have armed a brake and then connected the
sensor in the same week. Arm 2 before 5, and watch a few days of real bounce numbers in
between.

**Rollback:** `vercel env rm LEAD_RESEND_WEBHOOK_SECRET production --yes` and redeploy
returns the route to 503. Optionally delete the webhook via
`DELETE https://api.resend.com/webhooks/{id}`. Event rows already written to
`lead_contact_events` persist, which is desirable audit data, not damage.

**Pre-flight check (partial, and honestly so):** there is no GET handler and no dry-run.
What you can do before and after:
```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://www.propertytaxpartners.co.uk/api/leads/events -d '{}'
# now: 503.  after arming: 401 (invalid_signature), which proves the secret landed
```
A 401 after arming is the success signal. A 503 after arming means the env did not take
and you need to redeploy again.

**Risk: safe to arm unattended.** It is a read-only sensor with one throttled internal
email. This is the highest value per unit of risk of the eight.

---

## 3. Lead retention purge (M1)

**Code state: COMPLETE, and the cron is registered.**

- Cron route: `Property/web/src/app/api/cron/lead-retention/route.ts`
- Registered in `Property/web/vercel.json:9`, schedule `30 3 * * *`
- Auth gate: `route.ts:27-40, 46-48` (CRON_SECRET bearer, constant-time, 401)
- **Dry-run gate: `route.ts:50-54`**, `dryRun` is true unless
  `LEAD_RETENTION_PURGE_ENABLED` is exactly `"1"` or `"true"`
- Purge logic: `Property/web/src/lib/leads/retention.ts:84-193`; dry-run early return at
  `:133-135` before any mutation
- Tests: `Property/web/src/tests/retention.test.ts`

Retention window: `enquiry_retention_months = 3` (`Property/niche.config.json:15`), read
through `siteConfig.company.enquiryRetentionMonths` (`site.ts:68`), with a hardcoded
3-month fallback at `retention.ts:94`.

**This one is arguably overdue rather than risky.** The live privacy policy
(`privacy-policy/page.tsx:192-197`) tells every enquirer "we keep enquiry data for 3
months from the date of your enquiry, after which it is deleted". Nothing currently
deletes anything. The promise has been running ahead of the code since launch.

### Arming steps

```powershell
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
"1" | vercel env add LEAD_RETENTION_PURGE_ENABLED production
vercel deploy --prod --yes --archive=tgz
```

**What happens the moment it is armed:** at the next 03:30 UTC tick, up to 500 Property
leads older than 3 months are **irreversibly anonymised in place**: `full_name` becomes
`[redacted]`, `email` becomes `redacted-<id>@invalid`, `phone` becomes empty, `message`
becomes `[redacted]`, `extras.role_detail` is deleted, `lead_verification.phone_e164` /
`phone_carrier` / `raw` are nulled, and every `lead_contact_events.meta` for that lead
is nulled (which destroys verbatim reply bodies).

**This is the only one of the eight that destroys data, and it cannot be undone.**
Preserved deliberately: `consent_text`, `consent_at`, `status`, `source`, `created_at`,
plus event `event_type` / `channel` / `ts`. That is the lawful-basis audit trail. There
is no soft-delete and no backup step in the code. If prod PITR is not enabled and
retained for the relevant window, an over-broad purge is unrecoverable.

**Rollback:** `vercel env rm LEAD_RETENTION_PURGE_ENABLED production --yes` and
redeploy stops future runs within a day. **Already-anonymised rows are permanent.**
Rerunning is idempotent (`extras.anonymised_at` filters them out,
`retention.ts:120-123`), so no double damage, but no repair either.

**Pre-flight check (exists, and it is genuinely good):** the cron reports a truthful
candidate count while still in dry-run. Two ways.

Option A, no secrets needed, read-only SQL against prod. **Already run for this
runbook, result: 2 candidates out of 112 Property leads.**
```sql
select count(*) filter (
         where created_at < now() - interval '3 months'
           and (extras is null or not (extras ? 'anonymised_at'))
       ) as candidates,
       count(*) as total_property
from public.leads where source = 'property';
```

Option B, exercise the real code path (needs `CRON_SECRET`, which is in Vercel, not in
root `.env`):
```bash
curl -s -H "Authorization: Bearer $CRON_SECRET" \
  https://www.propertytaxpartners.co.uk/api/cron/lead-retention
# expect {"ok":true,"dryRun":true,"cutoff":"...","months":3,"candidates":N,"anonymised":0}
```

Two candidates is a small, verifiable first blast radius. Before arming, list those two
leads by id and eyeball them, because the first armed run is the only chance to look.

**Risk: needs owner present.** Small volume, but it is permanent destruction of customer
PII on a live system, and it interacts with a legal promise. Owner should see the
candidate list and say go.

---

## 4. Lead reconcile re-arm

**Code state: COMPLETE and hardened. The cron is registered and running in dry-run.**

- Cron route: `Property/web/src/app/api/cron/lead-reconcile/route.ts`
- Registered in `Property/web/vercel.json:10`, schedule `30 4 * * *`
- Auth gate: `route.ts:99-112, 149-151`
- **Dry-run gate: `route.ts:72-75`** (`reconcileEnabled()`, `"1"` or `"true"`), consumed
  at `route.ts:286-321`
- Tests: `Property/web/src/tests/leads-reconcile.test.ts`, including the dry-run default
  cases from `:341`

### The 2026-07-04 incident, because the risk note depends on it

Someone or some session set `LEAD_RECONCILE_ENABLED` in prod around 2026-07-03. It was
meant to stay dry-run. Consequences at the 04:30 tick:

1. The sweep **live-enrolled 7 old leads** dated 06-27 to 07-02.
2. `enrollLead`'s instant path bypassed the send window, so it **fired email and SMS at
   04:30 in the morning** at seven real people, several of them a week stale and not
   expecting contact.
3. Four had non-UK or invalid phone numbers. Twilio returned permanent errors 21408 and
   21211, which the retry logic treated as transient and **retried hourly**, tripping the
   `failed_send_rate_1h` guardrail at 05:01.
4. One person (two lead rows sharing an email address) **received everything twice**.

It also produced the "8 active, 22 attempts" digest confusion the owner queried, since
22 included 7 skipped-WhatsApp claim rows.

Remediation shipped in `2a341ae5`: the six still-active retro-enrolled sequences were
stopped and those leads reverted to `new`, `LEAD_RECONCILE_ENABLED` was removed from
prod, and the sweep was hardened with four specific guards, each of which is present in
the current code:

| Incident cause | Hardening | Where |
|---|---|---|
| 04:30 instant blast | `enrollLead({deferFirstTouch:true})` schedules step 0 into the send window | `route.ts:306-310` |
| Same person messaged twice | in-sweep lowercased email dedupe, plus a cross-row sibling-state query | `route.ts:185-253` |
| Week-old leads contacted cold | 72h `MAX_LIVE_ENROL_AGE_HOURS` guard, older ones alert-only | `route.ts:69, 255-269` |
| Hourly retry burst on dead numbers | Twilio 21211/21408/21610/21614 raise `PermanentSendError`, one failure event then immediate advance | `packages/web-shared/lead-nurture/config.ts` |

The hardening is real and it addresses each observed failure mode. Memory records the
owner's position that re-arming is now safe post-hardening and is his call.

**Residual gap the hardening does not close:** the cross-row sibling dedupe query is
exact-case on the stored email while the in-sweep set is lowercased
(`route.ts:204-208`, acknowledged in the code comment). `Jane@x.com` versus `jane@x.com`
across two rows can still slip through. That is exactly the shape of the duplicate that
caused the 07-04 double-message.

### Arming steps

```powershell
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
"1" | vercel env add LEAD_RECONCILE_ENABLED production
vercel deploy --prod --yes --archive=tgz
```

**What happens the moment it is armed:** at the next 04:30 UTC tick, any Property lead
from the last 72 hours that is status `new` or `nurturing`, not `source='test'`, not
`role='resource'`, and has no `lead_nurture_state` row, gets enrolled into a nurture
sequence, with its first touch **scheduled into the send window rather than fired
immediately**. That first touch is a real email and, if the lead has a phone, a real SMS
to a real person.

**Rollback:** `vercel env rm LEAD_RECONCILE_ENABLED production --yes` and redeploy
returns it to dry-run. **Messages already sent cannot be recalled.** An erroneously
enrolled lead needs the same manual remediation as 07-04: stop the sequence, revert
`leads.status` to `new`, leave the state row in place so it cannot re-enrol.

**Pre-flight check (exists, two forms).**

Option A, read-only SQL replicating the eligibility logic. **Already run for this
runbook, result: `missing_7d = 0`, `would_enrol_72h = 0`.** There is currently nothing
for it to do.
```sql
select count(*) as missing_7d,
       count(*) filter (where l.created_at >= now() - interval '72 hours') as would_enrol_72h
from public.leads l
left join public.lead_nurture_state s on s.lead_id = l.id
where l.source = 'property'
  and coalesce(l.role,'') <> 'resource'
  and l.status in ('new','nurturing')
  and l.created_at >= now() - interval '7 days'
  and s.lead_id is null;
```

Option B, the dry-run cron itself, which reports `wouldEnrol` truthfully after dedupe
and the age guard (`route.ts:291-293`):
```bash
curl -s -H "Authorization: Bearer $CRON_SECRET" \
  https://www.propertytaxpartners.co.uk/api/cron/lead-reconcile
# expect {"ok":true,"dryRun":true,"scanned":N,"missing":0,"wouldEnrol":0,...}
```

Re-run the pre-flight on the same day you arm, not a week earlier. `wouldEnrol` is a
live number.

**Risk: arm after a pre-flight read, on a day when `wouldEnrol` is 0 or 1 and you have
looked at the actual lead.** It sends real email and SMS to real people and it has
already misfired once. Do not arm it blind, and do not arm it the same day as any other
change to the send path.

---

## 5. Nurture auto-pause

**Code state: COMPLETE.**

- **Gate: `Property/web/src/app/api/cron/lead-nurture/route.ts:100-110`**, the flag is
  read at `:104-105` and passed as `autopauseEnabled` into `runNurtureGuardrails`
- Guardrail evaluation: `Property/web/src/lib/leads/nurture-health.ts:135-210` (pure,
  no I/O, fully tested)
- Thresholds: `nurture-health.ts:86-95`
- Pause action: `nurture-health.ts:377-385`, only when enabled AND a pause-severity
  breach AND not already paused
- Kill switch table writes: `Property/web/src/lib/leads/nurture-control.ts:99-120`
- Console pause/resume button: `console/web/src/app/api/nurture-control/route.ts`

Pause-severity rules: `complaints_24h >= 2`, `complaints_7d >= 3`, and
`failed_send_rate_1h > 25%` given at least 4 real (non-skipped) attempts in the hour.
Alert-only rules: hard bounce rate, opt-outs 7d, stuck leads.

**Wart worth knowing:** Property's `nurture-control.ts` hardcodes `id: 1` /
`id: "eq.1"`. The table has since grown a `site_key` column and seven rows. Row id=1 is
`site_key='property'`, so today the hardcode is correct by luck and a pause affects only
Property. If rows are ever renumbered, Property would pause the wrong site. Not a
blocker, but do not "tidy" that table.

### Arming steps

```powershell
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
"1" | vercel env add LEAD_NURTURE_AUTOPAUSE_ENABLED production
vercel deploy --prod --yes --archive=tgz
```

**What happens the moment it is armed:** nothing changes until a pause-severity
threshold is crossed, at which point the next hourly cron sets `paused=true` in
`lead_nurture_control` and **all Property nurture sending halts until a human resumes
it**. It sends no new email of its own beyond the guardrail alert that already fires
today.

The failure mode is not "it sends something bad", it is "it silently stops sending". A
run of four failed sends in one hour, which the 07-04 incident produced in minutes, is
enough to halt the whole pipeline. Leads mid-sequence stall rather than progress.

**Rollback:** two independent routes, both fast and neither needing a deploy to
un-pause. Console "Lead contactability" panel Resume button, or direct SQL:
```sql
update public.lead_nurture_control
set paused = false, paused_reason = null, paused_at = null, paused_by = 'manual'
where id = 1;
```
To disarm the mechanism entirely,
`vercel env rm LEAD_NURTURE_AUTOPAUSE_ENABLED production --yes` and redeploy. Nothing is
permanent. Sends missed during a pause window are delayed, not lost, because the cron
picks up due steps on resume.

**Pre-flight check (exists, read-only).** The evaluator is pure, so you can score the
current snapshot by hand against the thresholds:
```sql
select * from public.vw_lead_nurture_health where site_key = 'property';
```
**Already run for this runbook. Against `DEFAULT_THRESHOLDS`, today's snapshot produces
zero breaches and would not pause:** complaints_24h 0 (need 2), complaints_7d 0 (need
3), real attempts in the last hour 1 (need 4 before the rate rule can fire), optouts_7d
2 (alert at 3, and it is close), stuck_leads 0.

`Property/web/src/tests/lead-nurture.playground.test.ts` also runs scenarios locally
with no DB and no sends.

**Big caveat, and the reason for the ordering below:** `complaints_24h` and
`complaints_7d` are structurally 0 right now because item 2 is unarmed. Arming the brake
before the sensor gives you a brake whose two most important rules are wired to a dead
input, and whose third rule (`failed_send_rate_1h`) is the one that misfired during the
07-04 incident. Arm item 2 first, watch real bounce and complaint numbers for a few
days, then arm this.

**Risk: arm after a pre-flight read, and only after item 2 has been live for several
days.**

---

## 6. AI copy layer

**Code state: COMPLETE, but it is blocked by two things, not one.**

- **Gate: `Property/web/src/lib/leads/sequence-gen.ts:591-595`**, `copyAiEnabled()`
  requires `LEAD_COPY_AI_ENABLED === "true"` **exactly** (the string `"1"` will NOT work
  here, unlike the cron flags) AND `anthropicConfigured()`
- `anthropicConfigured()`: `Property/web/src/lib/ai/anthropic.ts:40-42`, just
  `Boolean(process.env.ANTHROPIC_API_KEY)`
- Call sites: submit route fire-and-forget at
  `Property/web/src/app/api/leads/submit/route.ts:289-308`; also gates the inbound-email
  classify and the call brief (M4)
- Generation entry point: `sequence-gen.ts:604-607`, returns `{status:"disabled"}` when
  the gate is closed
- Tests: `Property/web/src/tests/sequence-gen.test.ts`, `call-brief.test.ts`,
  `inbound-email.test.ts`

**Blocker 1, the known one:** the privacy notice must name Anthropic as a processor
before any lead PII is sent to it. Verified today: `privacy-policy/page.tsx:183-188`
lists exactly three processors, Supabase, Google Analytics and Vercel. Anthropic is
absent. **So are Resend and Twilio**, which are already processing lead PII today. That
is a pre-existing gap in its own right and the fix should cover all three, not just
Anthropic. `ANTHROPIC_API_KEY` is in root `.env`, so the temptation to just set it is
real. Do not.

**Blocker 2, not previously flagged:** `ANTHROPIC_API_KEY` **is not set on the Property
Vercel project at all**. Setting `LEAD_COPY_AI_ENABLED=true` alone would be an
expensive-looking no-op: `copyAiEnabled()` stays false, `generateLeadSequenceCopy`
returns `{status:"disabled"}`, and nothing changes. Anyone arming this needs to set two
vars, which means two chances to arm the API key without the privacy notice.

**Third issue, from memory and worth surfacing:** the AI copy layer predates the
reply-based email rewrite. `qa-gate.ts` still contains a `requireBookingCta` rule, and
the sequences it generates were written for the link-bearing era. Arming it as-is risks
generating copy that contradicts the deliberate no-links posture. It needs a
reply-based pass before it is fit to arm even once the legal blocker clears.

### Arming steps (for completeness, NOT recommended yet)

```powershell
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
"<anthropic key>" | vercel env add ANTHROPIC_API_KEY production
"true" | vercel env add LEAD_COPY_AI_ENABLED production   # must be "true", not "1"
vercel deploy --prod --yes --archive=tgz
```

**What happens the moment it is armed:** every new contactability-sequence lead has its
enquiry text, name and on-site journey **sent to Anthropic** immediately after
submission, and the QA-gated generated copy is stored on
`lead_nurture_state.generated_copy` and used for later touches, which are real emails
and SMS to real people. The disclosure breach is instantaneous and applies to every lead
processed while it is on.

**Rollback:** `vercel env rm LEAD_COPY_AI_ENABLED production --yes` and redeploy stops
future generation. **The transmission of PII to a third-party processor without notice
cannot be undone**, and already-generated copy stays on the state rows until manually
cleared. There is a static fallback per step, so disarming degrades gracefully.

**Pre-flight check: none exists in production.** There is no dry-run, no preview-only
mode, no "generate but do not send" switch. The only safe rehearsal is the local test
suite (`npx vitest run sequence-gen call-brief inbound-email` from `Property/web`),
which mocks the model. Say it plainly: you cannot see what this does to real leads
without doing it to real leads.

**Risk: do not arm. Blocked.**

---

## 7. Concierge

**Code state: COMPLETE, including an adversarial test suite.**

- **Gate: `Property/web/src/lib/leads/concierge.ts:48-52`**, `conciergeEnabled()`
  requires `LEAD_CONCIERGE_ENABLED === "true"` exactly AND `anthropicConfigured()`
- Wiring: `Property/web/src/app/api/leads/inbound/twilio/route.ts:181-184`, when
  enabled, inbound SMS and WhatsApp replies route to `handleInboundReply` instead of the
  single static ack
- Safety architecture (`concierge.ts:7-20`): the model classifies intent only and never
  generates outbound text, every reply comes from a fixed template set, tax and finance
  questions always escalate, turn cap 6 (`concierge.ts:44`), operator escalation cap 3
- Tests: `Property/web/src/tests/concierge.test.ts`, roughly 1000 lines including prompt
  injection cases at `:774-805` and a bulk adversarial sweep at `:846`

The design is careful and the closed-template architecture is the right one. That is not
the same as being ready.

**Blocked, per the standing gate, on two things neither of which has happened:** a live
red-team with a real API key, and owner review of a real reply transcript. It inherits
**both** of item 6's blockers as well, since it needs the same `ANTHROPIC_API_KEY` that
is neither set on the project nor disclosed in the privacy notice. Lead reply text going
to a model is the same disclosure problem as item 6, and arguably worse, because inbound
replies are free text the lead did not expect to be machine-read.

### Arming steps (for completeness, NOT recommended)

```powershell
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
"<anthropic key>" | vercel env add ANTHROPIC_API_KEY production
"true" | vercel env add LEAD_CONCIERGE_ENABLED production
vercel deploy --prod --yes --archive=tgz
```

**What happens the moment it is armed:** the next inbound SMS from any Property lead
starts a multi-turn automated conversation with a real person, over SMS, on the
business's phone number, with up to 6 turns before escalation, and their message text
goes to Anthropic for classification.

**Rollback:** `vercel env rm LEAD_CONCIERGE_ENABLED production --yes` and redeploy
returns the route to the single static ack (`acknowledgeReply`). Any conversation
already sent to a lead is permanent, and any mid-conversation lead is left with an
unanswered thread.

**Pre-flight check: none exists in production, and this is the honest answer.** The
route branches on the flag, so there is no way to exercise the live path without arming
it. The suite in `concierge.test.ts` is a good offline red-team, but the standing gate
explicitly requires a **live** red-team, and the only way to run one is to arm the flag
and message the number from a test handset. That is not a pre-flight, that is arming
with a supervised first customer.

If it is ever done, the closest thing to a controlled rehearsal is: arm it, immediately
submit a `source='test'` lead through the real form using `LEAD_PROBE_SECRET` (note:
that var is in root `.env` but is **not** set on Property's Vercel project, so it would
need setting first), red-team it from a handset, review the transcript, then disarm the
same session and clean the test lead per the owner's dashboard rule.

**Risk: do not arm. Needs owner present even for the red-team, and blocked before
that.**

---

## 8. LEAD_INTERNAL_SECRET in production

**Code state: COMPLETE, and currently inert.**

- Consumers, all using the identical fallback chain
  `LEAD_INTERNAL_SECRET || LEAD_NURTURE_TOKEN_SECRET || ""`:
  - `Property/web/src/app/api/leads/generate-sequence/route.ts:39` (constant-time
    compare at `:23-32`, 401 at `:42-44`)
  - `Property/web/src/app/api/leads/enroll/route.ts:60`
  - `Property/web/src/app/api/leads/handoff/resend/route.ts:36`
  - `Property/web/src/app/api/leads/submit/route.ts:297` (the caller side)
- Tests: `leads-reconcile.test.ts:158`, `lead-handoff.test.ts:333-358`

This was GAP-8 from the 2026-07-02 audit: replace a plain `token !== secret` comparison
over the master token-signing secret with a constant-time compare over a dedicated
secret. The constant-time part already shipped. Only the dedicated-secret part is
outstanding, and it currently falls back to `LEAD_NURTURE_TOKEN_SECRET`, which is set.

**Honest assessment: setting this today changes nothing observable.** Caller and callee
read the same fallback chain from the same deployment, so they flip together
atomically. And the one automatic caller (`submit/route.ts:298`) only fires when
`copyAiEnabled()` is true, which it is not. The value is defence in depth: it stops the
internal endpoints from sharing a secret with the token-signing key, so a leak of one
does not compromise the other.

### Arming steps

```powershell
$env:VERCEL_PROJECT_ID="prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
$env:VERCEL_ORG_ID="team_XF9WAygZX7SGk9Fo4tOAnihH"
# Generate a fresh 48-byte secret, do not reuse LEAD_NURTURE_TOKEN_SECRET.
$s = [Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Max 256 }))
$s | vercel env add LEAD_INTERNAL_SECRET production
vercel deploy --prod --yes --archive=tgz
```

**What happens the moment it is armed:** the three internal routes begin requiring the
new secret instead of the master token secret. No email, no SMS, no deletion, no
customer-visible change.

**The one thing that breaks:** any operator script or saved command that calls
`/api/leads/enroll`, `/api/leads/handoff/resend` or `/api/leads/generate-sequence` with
the old `LEAD_NURTURE_TOKEN_SECRET` value in the `x-internal-token` header starts
returning 401. `handoff/resend` in particular has been used manually at least three
times (Emily Crease twice, Pawel West once) and is the tool you reach for under
pressure. Record the new value somewhere you will find it during an incident, not just
in Vercel where it is write-only.

**Rollback:** `vercel env rm LEAD_INTERNAL_SECRET production --yes` and redeploy
restores the fallback. Nothing permanent.

**Pre-flight check (exists, weak but real):** confirm the gate rejects a wrong token
now, and confirm it still rejects afterwards.
```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  https://www.propertytaxpartners.co.uk/api/leads/generate-sequence \
  -H "x-internal-token: wrong" -H "Content-Type: application/json" -d '{"leadId":"x"}'
# expect 401 before and after
```
Post-arming, verify the positive path with the new secret against a non-existent lead id
so nothing is mutated.

**Risk: safe to arm unattended**, on the standing caveat that the redeploy ships the
uncommitted tree (section 0b).

---

## Proposed arming order, lowest risk first

| # | Item | Risk | Why here |
|---|---|---|---|
| 1 | **8. `LEAD_INTERNAL_SECRET`** | safe unattended | Zero customer-visible effect, zero data effect, fully reversible. Good first exercise of the deploy path and confirms the section 0b tree decision was made deliberately. |
| 2 | **2. Resend bounce/complaint webhook (H3)** | safe unattended | Read-only sensor, one throttled internal email, instantly reversible, and it is the prerequisite for item 5 being meaningful. Highest value per unit of risk. |
| 3 | **1. Google Sheets sync** | pre-flight read | Append-only mirror, cannot lose a lead, has a genuine health probe and a synthetic-payload rehearsal. Ranked third only because it touches a shared multi-site write path and needs a DB trigger. |
| 4 | **5. Nurture auto-pause** | pre-flight read, **after item 2 has run several days** | Reversible without a deploy, but do not arm a brake whose two main sensors are dead. Needs real complaint and bounce data first. |
| 5 | **3. Retention purge (M1)** | **needs owner present** | Only 2 candidates today, so the blast radius is small and inspectable, but the effect is permanent PII destruction. Owner sees the two lead ids and says go. |
| 6 | **4. Reconcile re-arm** | **needs owner present**, arm on a day `wouldEnrol` is 0 or 1 | Sends real email and SMS. Genuinely hardened against every observed 07-04 failure mode, but it has misfired at real customers once and the case-sensitivity residual is unclosed. Last of the armable six, and never on the same day as any other send-path change. |

### Should not be armed at all yet

**6. AI copy layer (`LEAD_COPY_AI_ENABLED`).** Blocked, and by more than was recorded.
The privacy notice names three processors and Anthropic is not among them (nor are
Resend and Twilio, which is a live gap needing the same fix). `ANTHROPIC_API_KEY` is not
even set on the project, so arming the flag alone is a no-op that invites someone to
"fix" it by adding the key. And the generator plus its `requireBookingCta` QA rule
predate the deliberate reply-only, link-free email rewrite, so it would produce copy
that contradicts current policy. Three independent reasons, any one of which is
sufficient. Fix the processor list first, then do the reply-based pass, then reconsider.

**7. Concierge (`LEAD_CONCIERGE_ENABLED`).** Blocked, and it inherits both of item 6's
blockers on top of its own. It also has no possible production pre-flight: the route
branches on the flag, so the mandated "live red-team" cannot happen without arming
automated multi-turn SMS conversations with real people on the business's real number.
The offline adversarial suite is genuinely good, but the gate asks for a live test, and
there is no way to satisfy it that is not itself the risky act. If it is ever done, it
needs the owner in the room, a `source='test'` lead through the real form, and disarming
in the same session.

**Also flagged, not one of the eight:** section 0b. Seven of the eight require a
redeploy, and the working tree carries an unreviewed change to live lead-form consent
wording, the privacy policy, and two customer-facing email templates. That decision
should be made once, deliberately, before the first arming, not seven times by
accident.
