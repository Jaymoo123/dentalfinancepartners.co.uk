# Leads → Google Sheets (live sync)

Mirrors every new lead from the shared Supabase `leads` table into a Google
Sheet within ~1–2 seconds of submission, so leads are readable on your phone
via the Google Sheets app. Covers **all sites** (property, dentists, medical,
solicitors, generalist, agency, contractors-ir35) because they all write to the
same `leads` table; the `source` column tells you which site each lead is from.

```
Lead form submit → row inserted into Supabase `leads`
  → pg_net trigger POSTs the row (with a secret header) to:
     https://www.propertytaxpartners.co.uk/api/leads/sync
  → endpoint verifies the secret, appends a row to the Google Sheet
```

The lead is durably stored in Supabase **before** this fires, so a Sheets
hiccup never loses a lead. The Sheet is a convenience mirror.

## What is already built (in the repo)

- `Property/web/src/app/api/leads/sync/route.ts` — the webhook endpoint.
- `Property/web/src/lib/leads/google-sheets.ts` — service-account append helper
  (zero extra npm dependencies; signs the Google JWT with Node `crypto`).
- `supabase/migrations/20260529000000_leads_to_sheets_webhook.sql` — sanitised
  record of the trigger (the live one is created via the Management API with the
  real URL + secret, so the secret is never committed).

## What you need to do (one-time, ~10 minutes)

### 1. Create the Google Sheet

1. Create a new Google Sheet (e.g. "Leads — all sites").
2. Rename the first tab to `Leads`.
3. Put these headers in row 1 (column order must match the endpoint):

   | Received | Site | Name | Email | Phone | Type | Practice | Message | Page | Status | Lead ID |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

4. Note the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/`**`<THIS>`**`/edit`.

### 2. Service account (reuse the existing one)

No need to create a new service account or enable any API. The existing key at
`C:\Users\user\Documents\Emplifex\your-service-account.json` was probed on
2026-05-29 and works for the Sheets API (token + read both returned 200):

- email: `air-fryer-bot@vernal-tracer-466910-g3.iam.gserviceaccount.com`
- project: `vernal-tracer-466910-g3` (Sheets API already enabled)

So the only Google-side step is: **Share your Sheet (step 1) with that email as
Editor.** Without this, the API returns 403. (If you'd rather keep finance
separate from the airfryer project, create a fresh service account instead and
share the Sheet with its email; everything below is otherwise identical.)

### 3. Set environment variables on the Property Vercel project

In the Vercel dashboard → Property project → **Settings → Environment Variables**
(Production, and optionally Preview). Add three single-line values:

| Variable | Value |
| --- | --- |
| `LEADS_SYNC_SECRET` | a long random string (40+ chars) — also give this to me to wire the trigger |
| `GOOGLE_SERVICE_ACCOUNT_B64` | the whole service-account JSON, base64-encoded (one paste-safe line) |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | the sheet ID from step 1.4 |
| `GOOGLE_SHEETS_TAB` | `Leads` (optional; this is the default) |

Generate the base64 value locally (keeps the private key out of any chat/logs);
run this in PowerShell and paste the output into `GOOGLE_SERVICE_ACCOUNT_B64`:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\Users\user\Documents\Emplifex\your-service-account.json"))
```

This single base64 var replaces the older `GOOGLE_SHEETS_CLIENT_EMAIL` +
`GOOGLE_SHEETS_PRIVATE_KEY` pair (which still work as a fallback if set), and
avoids the multi-line-PEM paste problems that cause 400s from Google.

### 4. Deploy the Property site

GitHub auto-deploy is off for the niche sites, so deploy manually from the repo
root (install the Vercel CLI first if needed, `npm i -g vercel`):

```powershell
cd Property; vercel deploy --prod
```

### 5. Verify the endpoint is live

Open in a browser (a GET is a safe health probe, no secret needed):

```
https://www.propertytaxpartners.co.uk/api/leads/sync
```

Expect: `{"ok":true,"secretSet":true,"sheetsConfigured":true}`. If either flag
is `false`, the env vars didn't take (re-check, then redeploy).

### 6. Tell me, and I'll finish the wiring

Once steps 1–5 are done, give me the `LEADS_SYNC_SECRET` value and I will:
- create the Supabase trigger via the Management API (real URL + secret),
- fire a test lead and confirm a row lands in the Sheet,
- (optional) backfill your existing leads into the Sheet by replaying them
  through the live endpoint.

## Want a phone notification too?

The Sheet is a log, not an alert. If you also want a ping the moment a lead
arrives (email / WhatsApp / Telegram), say so and I'll add it to the same
endpoint (a few lines; email needs no extra service, WhatsApp/Telegram need a
free bot token).

## Troubleshooting

- **GET shows `sheetsConfigured:false`** → env vars not set on Production / not redeployed.
- **403 from Sheets in logs** → the Sheet isn't shared with the service account email.
- **400 from Google token endpoint** → malformed `GOOGLE_SHEETS_PRIVATE_KEY` (whitespace/newlines).
- **Nothing appears but no errors** → the Supabase trigger isn't created yet (step 6) or points at the wrong URL.
- Endpoint logs: Vercel dashboard → Property → the function logs for `/api/leads/sync`.
