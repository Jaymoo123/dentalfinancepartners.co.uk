# Leads to Google Sheets (live sync)

Mirrors every new lead from the shared Supabase `leads` table into the **Lead
Tracker** Google Sheet within a second or two of submission, so whoever is
triaging works from one list. Covers **all sites**, because they all write to the
same `leads` table; the `Site` column says which site each lead came from.

**LIVE since 2026-08-26**, verified end to end with a real insert: the row
reached the sheet, landed in the right columns, and pushed the previous top lead
down with its notes intact.

```
Lead form submit  ->  row inserted into Supabase `leads`
  ->  leads_to_sheets_trg (pg_net) POSTs the row with a secret header to
      https://www.propertytaxpartners.co.uk/api/leads/sync
  ->  endpoint verifies the secret, inserts the lead as row 2 of the Sheet
```

`leads_to_sheets_trg` carries the same `WHEN` guard as `leads_to_email_trg` and
`leads_to_enrich_trg`, so resource-gate signups (someone downloading a guide
rather than enquiring) never reach the tracker. It was created without that guard
on 2026-08-26 and corrected the same day.

The lead is durably stored in Supabase **before** this fires, and the separate
`leads_to_email_trg` notification is unaffected by it, so a Sheets failure never
loses a lead or an alert. The Sheet is a working copy, not the record.

## Two accepted gaps (owner decision, 2026-08-26)

Recorded so nobody mistakes them for oversights, and so nobody re-opens them
unasked:

1. **Google is not named as a processor in any site's privacy policy**, so this
   sharing is undisclosed. Closing it means one line in the privacy policies,
   which can ride along with the partner-firm line already queued from the
   Aswatax work.
2. **The Sheet sits outside the retention purge**, so rows outlive the retention
   period the sites publish. There is no deletion path for it in this repo.

Both were put to the owner and he elected to proceed and to own the disclosure
and sheet-access questions himself.

## Why row 2, and not the bottom

Sheets' `values:append` only ever adds after the last populated row. The tracker
is read top-down and is seeded newest-first, so appending would bury each new
lead under 147 older ones. `prependLeadRow()` instead inserts a whole new row at
index 1 and writes into it.

Inserting a **row** rather than writing over cells is what keeps a triager's
hand-typed columns attached to their own lead: Sheets moves the entire row's
contents down together. The two API calls are not atomic, and the order is
chosen so the failure mode is harmless. If the insert lands and the write fails
you get one visible blank row; the reverse order could overwrite a real lead.

## The column contract

Columns **A-I are written by the webhook** on every new lead. They are defined in
two places that must agree:

- `Property/web/src/app/api/leads/sync/route.ts`, the `row` array
- `proposal_engine/export_raw_leads.py`, `SHEET_WEBHOOK_COLS`, which seeds the sheet

| A | B | C | D | E | F | G | H | I |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Received | Site | Name | Email | Phone | Type | Message | Page | Lead ID |

Columns **J-M** (Verified, Nurture status, Booked call slots, Contact trail) are
history that does not exist yet when a form is submitted, so they stay blank on a
new arrival and are filled by a re-seed. Columns **N-Q** (Sent to Omar or kept
in-house, Contacted on, Next action, Notes) belong to the triager and nothing
automatic ever writes them.

**Reorder either list without the other and every future lead silently lands one
column out**, in a sheet people are already working from. `proposal_engine/test_export_wash.py`
parses the route's row array and fails on drift. Run it after touching either file:

```
python proposal_engine/test_export_wash.py
```

## Live configuration

- Sheet: **Lead Tracker**, id `1MPxu7utofikLFK60nvDEPs9Y_wjLrbRAEpxKIbv-itM`, tab `Sheet1`
- Service account (pre-existing, Sheets API already enabled, needs Editor on the
  sheet): `air-fryer-bot@vernal-tracer-466910-g3.iam.gserviceaccount.com`,
  key at `C:\Users\user\Documents\Emplifex\your-service-account.json`
- Vercel project: `property-tax-partners` (`prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`)
- Env vars set 2026-08-26: `LEADS_SYNC_SECRET`, `GOOGLE_SERVICE_ACCOUNT_B64`,
  `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_TAB`

**Do not rename the tab.** The webhook resolves the sheet by that exact name and
fails on every lead if it changes.

## Seeding or re-seeding the sheet

```
python proposal_engine/export_raw_leads.py --triage <already-contacted.csv>
```

Writes `proposal_engine/out/leads_triage_<date>.csv`, laid out to match the sheet
column for column, newest first. It drops opted-out leads, leads already supplied
to a partner, older duplicate enquiries, anyone in the contacted CSV, and anyone
whose reply used opt-out or complaint language.

**Re-seeding overwrites the triager's columns**, which exist nowhere else. Copy
N-Q out first, or only re-seed before the sheet is in use.

## Reaching api.supabase.com: use curl, not Python

Cloudflare fronts `api.supabase.com` and blocks Python's `urllib` on its
TLS/User-Agent fingerprint. Every endpoint, including `/v1/projects`, returns a
bare **403 whose body is `error code: 1010`**, which reads exactly like an
expired or unscoped access token. It is not. The identical request through `curl`
returns 200.

This cost an unnecessary token rotation on 2026-08-26. Before concluding a
Supabase token is dead, retry the call with curl.

## Testing it without emailing anyone

A real insert into `leads` is the only way to exercise the trigger, but it also
fires `leads_to_email_trg`, putting a fake lead in the owner's inbox. Insert with
`extras = '{"resource_gate":"true"}'::jsonb` and `is_test = true`: the email and
enrich triggers skip it and it stays out of exports and KPIs.

Note this now also means the **sheets** trigger skips it, so that trick tests the
insert path but no longer reaches the sheet. To test the endpoint and the sheet
write on their own, POST a payload shaped like the trigger's directly at the
endpoint with the `x-webhook-secret` header.

Whichever route, delete the sheet row afterwards **by checking its contents
first**, never by position alone. Row 2 is wherever the newest real lead lives.

## Health check

A GET is a safe probe and leaks no secret values:

```
https://www.propertytaxpartners.co.uk/api/leads/sync
```

Expect `{"ok":true,"secretSet":true,"sheetsConfigured":true}`.

## Troubleshooting

- **`sheetsConfigured:false`** — env vars not set on Production, or set but not
  yet redeployed. Vercel only picks up env changes on a new deployment.
- **`Sheets tab "X" not found`** in the logs — the tab was renamed. Either rename
  it back or update `GOOGLE_SHEETS_TAB` and redeploy.
- **403 from Sheets** — the sheet is no longer shared with the service account.
- **A lead is in Supabase but not the Sheet** — the trigger is missing or points
  at the wrong URL, or the endpoint returned non-2xx. `pg_net` does not retry.
  Check the Vercel function logs for `/api/leads/sync`.
- **Leads with no email address never arrive.** The endpoint rejects records
  without one (400). All 147 seeded leads had an email, so this has never bitten,
  but a phone-only lead would be silently absent.
- **A blank row 2** — the insert succeeded and the value write failed. Safe to
  delete; the lead is still in Supabase.
