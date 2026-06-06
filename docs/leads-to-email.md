# Leads → email notification

When a lead hits the shared Supabase `leads` table, an `INSERT` trigger POSTs the
row to `/api/leads/notify` on the Property site, which emails a pre-formatted HTML
table to the internal inbox. Open the email, forward it to the partner firm, done.
No Supabase export, no spreadsheet.

The lead is never emailed and their address is never placed in a reply-to header.
The only recipient is the internal notification inbox.

This runs independently of the Google Sheets sync (`/api/leads/sync`,
`leads_to_sheets_trg`): separate trigger, separate endpoint, so one failing never
affects the other.

## Pieces

- `Property/web/src/app/api/leads/notify/route.ts` — endpoint. Verifies the
  `x-webhook-secret` header, formats the lead, sends via Resend.
- `Property/web/src/lib/resend.ts` — Resend client + from-address helper.
- `supabase/migrations/20260601000000_leads_to_email_webhook.sql` — sanitised
  record of the trigger (placeholders for URL + secret; applied via Management API).

## Columns

Controlled by the `FIELDS` array in `route.ts` (single source of truth). Default
order: Received, Name, Email, Phone, Role, Company / practice, Message, Site,
Submitted from, Lead ID. Empty fields are skipped. To drop a column, delete its
line; to reorder, move it.

## Setup (one-time)

1. **Vercel env vars on the Property project** (Production):
   - `RESEND_API_KEY` — Resend API key.
   - `RESEND_FROM_EMAIL` — from-address on a Resend-verified domain
     (default `leads@propertytaxpartners.co.uk`; must be verified in Resend).
   - `RESEND_FROM_NAME` — optional display name (default "JM Lead Notification").
     Site-agnostic on purpose: one endpoint serves every site, so the originating
     site is shown in the subject line and the "Site" body row, not the sender name.
     If this env var is set on the Property project it overrides the default, so to
     adopt the new default make sure it is unset (or set it to "JM Lead Notification").
   - `LEADS_NOTIFY_TO` — recipient inbox (default `junaydmoughal@hotmail.co.uk`).
   - `LEADS_NOTIFY_CC` — optional CC, comma-separated for multiple
     (default `ahmadtirmizey@reflexaccounting.co.uk`). Set to an empty string to
     disable the CC entirely.
   - `LEADS_NOTIFY_SECRET` — optional; falls back to the existing `LEADS_SYNC_SECRET`.

2. **Deploy** the Property site so `/api/leads/notify` is live.
   Health check: `GET /api/leads/notify` → `{ secretSet, resendSet, notifyTo, ccSet }`.

3. **Create the trigger** via the Supabase Management API, substituting the real
   endpoint URL (`https://www.propertytaxpartners.co.uk/api/leads/notify`) and the
   shared secret into the migration's placeholders.

## Test

Insert a test row into `leads` (or submit a real form). The email should arrive
within a few seconds. The lead is stored in Supabase first, so a send failure
never loses data — it just needs a re-send.
