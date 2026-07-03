# Property Lead Detail Capture (second primary nurture sequence)

*Added 2026-07-03. A durable design note for future agents. Read alongside `LEAD_NURTURE_SYSTEM.md` (env / go-live runbook), `LEAD_NURTURE_PROGRAMME.md` (per-touch rationale), and `LEAD_NURTURE_OBSERVABILITY.md` (guardrails, console, migrations). Source of truth is always the code; file references below point at it.*

## The problem

The nurture spine assumed every lead arrives with a name AND a phone (the main enquiry form is qualified: name + phone + email + message). But the site also has an email-only path: the "Ask a specialist" widget (`Property/web/src/components/support/SpecialistWidget.tsx`) lets a visitor ask a question with just an email. Those leads have no phone (and sometimes no name), so they could not enter the contactability chase (which is built around proving the phone) and were effectively skipping nurture altogether. They landed in Supabase and waited for a human, which is exactly the "uncontactable lead" failure the whole system exists to fix.

## The two-sequence model

There are now TWO primary nurture sequences. A lead is in exactly one of them at a time.

| Sequence name | For | Goal | Channels |
|---|---|---|---|
| `property_contactability` | Leads that already have a name and a usable phone | Prove the lead is responsive, promote to `contactable`, hand to DJH | email + SMS + WhatsApp |
| `property_detail_capture` | Leads missing a name and/or a phone (typically email-only widget leads) | Collect the missing contact detail(s), then route into the standard flow | email only |

Both are declared once in `Property/web/src/config/lead-nurture.ts`:
- `SEQUENCE_NAME = "property_contactability"`, `DETAIL_CAPTURE_SEQUENCE_NAME = "property_detail_capture"`, surfaced via `LEAD_SEQUENCE_NAMES` and the `LeadSequenceVariant` type so no write/gate path hardcodes a string.
- `routePrimarySequence(lead)` is the single source of truth for which sequence a lead belongs in: if `computeMissingContact(lead)` returns any field, the lead goes to detail-capture, otherwise contactability. The submit route, the retro-enrol route, and the reconciliation cron all call this same function, so every entry path agrees.
- `buildPropertyLeadNurtureConfig(variant)` (and `buildPropertyLeadNurtureConfigs()` for the cron) returns the right per-sequence engine config. Detail-capture is email-only (`hasSms: false` at scheduling) and its step 1 is a scheduled +24h email (not an instant same-time step), so the cron fires later touches, not the submit path.

## Missing-field routing

`computeMissingContact` (shared: `@accounting-network/web-shared/lead-nurture/lead-nurture-shared`) returns the fields below the acceptance floor (`isNameOk` / `isPhoneOk` in `Property/web/src/lib/leads/field-floors.ts`). The copy narrows itself from the live lead row on every send (recomputed in `buildLeadMessageContext`), so a partial completion auto-tightens later touches with no per-step branching. Natural-language phrasing comes from `missingPhraseFor(missing)` and the CTA label from `ctaLabelFor(missing)`.

| Missing fields | Sequence | What the capture link asks for |
|---|---|---|
| name + phone | `property_detail_capture` | "your name and a phone number" (CTA: "Add your details") |
| phone only | `property_detail_capture` | "a phone number we can reach you on" (CTA: "Add your number") |
| name only | `property_detail_capture` | "your name" (CTA: "Add your name") |
| none (has both) | `property_contactability` | n/a (standard chase) |

## Capture-surface flow

Each detail-capture email carries a signed link to `/complete?t=<profile-token>`. The token is a `"profile"`-audience lead token (`mintLeadToken(lead.id, "profile")`, built in `buildDetailsUrl` in `lead-nurture.ts`), so the lead is identified with nothing to guess or enumerate. The page posts to `POST /api/leads/complete` (`Property/web/src/app/api/leads/complete/route.ts`), which:

1. Silently accepts a filled honeypot (`enquiry_ref`) with no writes (matches the submit route's de-fang posture).
2. Verifies the `profile` token (`410` on expiry so the UI can offer a friendly re-request path, `401` otherwise).
3. Loads the lead; if nothing is missing it is an idempotent "all set" no-op (returns a booking token so the UI can offer `/book`).
4. Builds a patch of ONLY the fields that are still missing AND supplied AND valid. It never touches the email, never overwrites a good stored name/phone, and rejects a supplied-but-invalid field with a `400` field error. The `UPDATE ... by id` is the single load-bearing write; everything after it is best-effort and wrapped so a downstream hiccup cannot `500` a request whose detail is already saved.
5. Re-verifies (Twilio Lookup) ONLY when the phone changed (a name-only completion skips the billable lookup), upserting `lead_verification`.
6. Recomputes what is still missing (patch beats stored value) and records an `operator_update` audit event (`kind: "details_completed"`).
7. Branches on completeness (see the phone-aware rules below).

Note: the capture surface is defined by the token + the `/api/leads/complete` endpoint. The `/complete` page is the thin front-end that renders the field(s) and posts to that endpoint.

## Phone-aware completeness and exhaustion rules

Supplying the LAST missing field is the moment a lead can be promoted, so a full completion runs the same contactability gate as a booking or a one-tap confirm. The phone determines what happens, because DJH call by phone:

- **Partial completion** (still short of a full contact record): do NOT record a response or promote. Leave the detail-capture chase active so its next scheduled email asks for the remaining field. Returns `{ stillMissing }`.
- **Full completion, phone known-bad** (newly verified `invalid` or `voip`): the lead is not callable, so do NOT promote. Record a `phone_recheck_needed` event, and `stop` the detail-capture state so no further "add your details" emails fire. Returns `{ invalidPhone: true }`.
- **Full completion, phone callable** (or a name-only completion over an already-good phone): run `recordResponseAndEvaluate(leadId, "confirmed", "web")`, which records the response and promotes to `contactable` (halting the chase via the gate).

Sequence exhaustion (all detail-capture touches sent, no completion) is handled by `onSequenceExhausted` on the detail-capture config in `lead-nurture.ts`:
- **No usable phone** (a phone was still missing at the end): the lead is genuinely `unreachable`; set `leads.status = 'unreachable'` (only from `new`/`nurturing`, never regressing a later status).
- **Has a usable phone** (only a name was ever missing): the lead IS reachable, so hand it to the standard `property_contactability` chase instead of marking it unreachable. This is done with a direct `lead_nurture_state` insert (not `enrollLead`, to avoid a circular import); the next cron tick fires it from step 0, and `leads.status` stays `nurturing` (still in flight).

## Cross-sequence gate fix

Because a lead can now be in one primary sequence and get moved to the other, the gate and opt-out paths were widened in `Property/web/src/lib/leads/contactability.ts`:
- **Promotion halts BOTH primary sequences.** When a lead is promoted to `contactable`, the update targets `sequence in (property_contactability, property_detail_capture)` (via `LEAD_SEQUENCE_NAMES`), so no residual chase from the other sequence keeps messaging a lead that is already handed off.
- **Opt-out halts ALL sequences.** A `STOP` / opt-out withdraws consent for every automated contact: the update targets every `lead_nurture_state` row for the lead (both primary chases and any aux booking reminders / abandoned-booking nudges), not just one.

## The two-pass cron

The hourly cron (`Property/web/src/app/api/cron/lead-nurture/route.ts`) drives each primary sequence as an INDEPENDENT pass, contactability first (so if `maxDuration` is ever hit, the higher-value flow has already completed). It iterates `buildPropertyLeadNurtureConfigs()` and calls `runLeadNurtureCron` once per config; each pass is scoped by `config.sequenceName` in the engine, so the passes never touch each other's rows. The JSON response now reports `perSequence` (a per-sequence `{ processed, dispatched }` breakdown) alongside the totals. The aux scans (booking reminders / abandoned-booking) and the guardrail scan run once, after both passes, unchanged.

## Observability change (this migration)

Migration `supabase/migrations/20260703000001_lead_nurture_multi_sequence_views.sql` (additive + idempotent) gives the two per-step / stuck views a `sequence` dimension so the two primary flows read apart:
- `vw_lead_nurture_step_health` is now grouped by `(site_key, sequence, step)` (was `(site_key, step)`, which would sum both primary sequences into one step row). The aux-sequence exclusions and the sent/failed/skipped counts are unchanged.
- `vw_lead_nurture_stuck` now exposes `ns.sequence` (so an operator sees WHICH flow a lead is stuck in); everything else is identical.
- The funnel and health views are deliberately untouched: they count a lead once (`count(distinct lead_id)`), and a lead is in exactly one primary sequence at a time, so their totals stay correct without a split.

Console (`packages/web-shared/console/adminData.ts`): `NurtureStepHealth` gains a `sequence` field and `StuckLead` an optional `sequence`. `getNurtureStepHealth` filters to `sequence=eq.property_contactability` so the LIVE "Where leads get stuck" panel stays byte-for-byte unchanged; a dedicated detail-capture panel can drop that filter later. `getStuckLeads` includes `sequence` in the select (backward-compatible; the accordion ignores it).

## Retro-enrol route and reconciliation cron

Two safety nets ensure an email-only (or any) lead never silently skips nurture, both routing through the single idempotent `enrollLead` path (`Property/web/src/lib/leads/enroll.ts`):
- **Retro-enrol route** `POST /api/leads/enroll` (`Property/web/src/app/api/leads/enroll/route.ts`): internal, `x-internal-token` shared-secret guarded (dedicated `LEAD_INTERNAL_SECRET`, master token secret as fallback, constant-time compare, never publicly linked). Given a `leadId`, it enrols that one existing lead into its `routePrimarySequence`. Idempotent, dormant-aware, sequence-aware.
- **Reconciliation cron** `/api/cron/lead-reconcile` (`Property/web/src/app/api/cron/lead-reconcile/route.ts`), registered in `vercel.json` at `30 4 * * *` (daily). It scans recent Property leads (7-day lookback, 500 cap), keeps the nurture-eligible ones (not `test`, not `resource`, not honeypot / suspected spam, status still `new`/`nurturing`), subtracts those that already have a `lead_nurture_state` row, and retro-enrols the survivors via `enrollLead`. If the un-enrolled count reaches the alert threshold (3), it `console.error`s an ALERT so a real enrolment regression surfaces in logs. `enrollLead` no-ops while dormant, so the sweep is inert (but still reports counts) until the system is armed. Auth: `CRON_SECRET` bearer, constant-time.

## Arming and rollback

- **Arming is unchanged from `LEAD_NURTURE_SYSTEM.md`.** Detail-capture rides the same master arm (`LEAD_NURTURE_ENABLED`) and per-channel flags; it is email-only so it needs `LEAD_NURTURE_EMAIL_ENABLED`. While dormant, `enrollLead` no-ops, the cron short-circuits, and the reconcile / retro-enrol paths accumulate nothing. Test isolation is unchanged (`source='test'` never messages a real provider and is never forwarded).
- **Migration apply** is owner-gated: `python scripts/apply_web_analytics_migrations.py staging 20260703000001` then `... prod 20260703000001` (requires `20260702000001` first). The filename is already in the script's `MIGRATIONS` list.
- **Rollback** for the observability migration: re-run `20260702000003` (restores `step_health` without the `sequence` column) and `20260702000001` (restores `stuck` without it). Both are drop-then-create / create-or-replace, so re-running them reverts cleanly with no data effect. The console fetchers tolerate the pre-migration view shape (the extra select columns simply would not exist), and the app-side sequence logic is inert while dormant.
