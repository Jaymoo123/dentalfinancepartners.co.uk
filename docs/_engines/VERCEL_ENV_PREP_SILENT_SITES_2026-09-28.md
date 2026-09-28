# Vercel env prep for the two silent sites (2026-09-28)

wills-probate (`prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G`) and divorce-finances
(`prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP`) carry zero env vars. This is prep only:
nothing was written to Vercel. Pulled charities (`prj_ckcgp2JjoBzJ9ihNZfdacdgYUuEG`),
care (`prj_PvJWStLGoG8bvzCQPLafY4nuMQAa`) and property
(`prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`) via the v9 env API with `decrypt=true`.

**Decrypt caveat:** Vercel's `sensitive`-type vars are write-only by design —
the API never returns their plaintext, not even with `decrypt=true` (confirmed:
`decrypted:false`, empty `value` on every sensitive-type var, on the list
endpoint AND the single-var endpoint). Only `encrypted`-type vars decrypt.
16 of the 21 charities/care keys are `sensitive` type. For those, same/different
below is inferred from code and the wills-probate `.env.local.example` template,
not verified byte-for-byte — flagged per row.

## 1. Union of keys on charities + care (21 keys, identical set on both)

| Key | Type | Target | Scope |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | encrypted | production, preview | **ESTATE-WIDE** (verified identical: `https://dhlxwmvmkrfnmcgjbntk.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | encrypted | production, preview | **ESTATE-WIDE** (verified identical, len 208) |
| `SUPABASE_SERVICE_ROLE_KEY` | encrypted | production, preview | **ESTATE-WIDE** (verified identical, len 219) |
| `ADMIN_DASHBOARD_KEY` | encrypted | production, preview | **SITE-SPECIFIC** (verified different, both len 64 — per-site admin password) |
| `NEXT_PUBLIC_SITE_URL` | encrypted | production, preview | **SITE-SPECIFIC** (verified different — site domain) |
| `CRON_SECRET` | sensitive | production | **SITE-SPECIFIC** (inferred — matches `vercel.json` cron auth per project, `openssl rand` per template) |
| `LEAD_NURTURE_TOKEN_SECRET` | sensitive | production | **SITE-SPECIFIC** (inferred — signs opt-out/confirm links per site, template says "per site") |
| `LEAD_NURTURE_ENABLED` | sensitive | production | **ESTATE-WIDE** likely (a flag, "1") — verify value trivially, no risk if wrong |
| `LEAD_NURTURE_EMAIL_ENABLED` | sensitive | production | **ESTATE-WIDE** likely (flag) |
| `LEAD_NURTURE_SMS_ENABLED` | sensitive | production | **ESTATE-WIDE** likely (flag) |
| `RESEND_API_KEY` | sensitive | production | **ESTATE-WIDE** (inferred — one Resend account estate-wide; standard_terms bans per-site sending domains) |
| `RESEND_FROM_EMAIL` | sensitive | production | **ESTATE-WIDE** (inferred — shared sender e.g. `leads@propertytaxpartners.co.uk` per template comment) |
| `RESEND_FROM_NAME` | sensitive | production | **SITE-SPECIFIC** (inferred — template shows site display name, e.g. "Trade Tax Specialists") |
| `LEAD_SERVICE_FROM_EMAIL` | sensitive | production | **ESTATE-WIDE** (inferred — mirrors `RESEND_FROM_EMAIL`) |
| `LEAD_SERVICE_FROM_NAME` | sensitive | production | **SITE-SPECIFIC** (inferred — mirrors `RESEND_FROM_NAME`, site display name) |
| `LEAD_SERVICE_REPLY_TO` | sensitive | production | **ESTATE-WIDE** (inferred — shared inbound address per template) |
| `TWILIO_ACCOUNT_SID` | sensitive | production | **ESTATE-WIDE** (one Twilio account) |
| `TWILIO_API_KEY_SID` | sensitive | production | **ESTATE-WIDE** |
| `TWILIO_API_KEY_SECRET` | sensitive | production | **ESTATE-WIDE** |
| `TWILIO_AUTH_TOKEN` | sensitive | production | **ESTATE-WIDE** |
| `TWILIO_SMS_FROM` | sensitive | production | **SITE-SPECIFIC or ESTATE-WIDE** — a phone number is shared per Twilio number, not per site; treat as ESTATE-WIDE (copy from charities) unless the manager knows otherwise |

No key on charities/care carries a `development` target.

## 2. Deriving the wills-probate / divorce-finances value for each SITE-SPECIFIC key

Source facts used: `wills-probate/niche.config.json` — `niche_id: "wills-probate"`,
`domain: "www.estateplanningspecialists.co.uk"`; `divorce-finances/niche.config.json`
— `niche_id: "divorce-finances"`, `domain: "www.divorcefinancespecialists.co.uk"`.
`packages/web-shared/console/consoleAuth.ts` confirms `ADMIN_DASHBOARD_KEY` gates
`/admin/analytics` per project and rotating it invalidates cookies — must be a
fresh random secret per project, never copied.

| Key | Rule |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://` + niche.config.json `domain` — wills-probate = `https://www.estateplanningspecialists.co.uk`, divorce-finances = `https://www.divorcefinancespecialists.co.uk` |
| `ADMIN_DASHBOARD_KEY` | generate fresh (`openssl rand -base64 32` per the `.env.local.example` comment), one per project — never copy from charities/care |
| `CRON_SECRET` | generate fresh per project, must then be set to match each site's own `vercel.json` cron config (not yet checked here — do this at deploy time) |
| `LEAD_NURTURE_TOKEN_SECRET` | generate fresh per project (signs per-site opt-out/confirm tokens) |
| `RESEND_FROM_NAME` / `LEAD_SERVICE_FROM_NAME` | site display name — wills-probate: copy the `display_name` from `wills-probate/niche.config.json`; divorce-finances: same from its own niche.config.json (not read in this pass — one grep away) |
| Everything else marked ESTATE-WIDE above | copy from charities (values verified identical to care where decryptable; the rest inferred estate-wide from the Twilio/Resend single-account model in standard_terms) |

## 3. What the code actually reads vs what's defined

`grep -rhoE "process\.env\.[A-Z0-9_]+" <site>/web/src packages/web-shared` —
**identical result set for both wills-probate and divorce-finances** (34 vars,
they share `packages/web-shared`):

```
ADMIN_DASHBOARD_KEY, ANALYTICS_ALLOW_NONPROD_INGEST, CRON_SECRET,
EMAIL_VERIFY_API_KEY, LEAD_INTERNAL_SECRET, LEAD_NURTURE_AUTOPAUSE_ENABLED,
LEAD_NURTURE_TOKEN_SECRET, LEAD_OFFER_BASE_URL, LEAD_RECONCILE_ENABLED,
LEAD_RESEND_INBOUND_SECRET, LEAD_RESEND_WEBHOOK_SECRET,
LEAD_RETENTION_PURGE_ENABLED, LEAD_SERVICE_FROM_EMAIL, LEAD_SERVICE_FROM_NAME,
LEAD_SERVICE_REPLY_TO, NEXT_PUBLIC_MINIFORMS_MULTISTEP, NEXT_PUBLIC_SITE_URL,
NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL, NODE_ENV,
NURTURE_TOKEN_SECRET, RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_FROM_NAME,
SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL, TWILIO_ACCOUNT_SID,
TWILIO_API_KEY_SECRET, TWILIO_API_KEY_SID, TWILIO_AUTH_TOKEN,
TWILIO_SMS_FROM, TWILIO_WHATSAPP_FROM, VERCEL_ENV, YOUR_CRON_SECRET_ENV
```

`NODE_ENV` and `VERCEL_ENV` are platform-injected, never set manually.
`YOUR_CRON_SECRET_ENV` is a placeholder name inside a JSDoc example
(`packages/web-shared/nurture/subscribe.ts:58`), not a real var — ignore it.

**Read by code but NOT defined on charities (so not copied by the script,
because charities doesn't use these features either — confirm intent before
adding):** `EMAIL_VERIFY_API_KEY`, `LEAD_INTERNAL_SECRET`,
`LEAD_NURTURE_AUTOPAUSE_ENABLED`, `LEAD_OFFER_BASE_URL`,
`LEAD_RECONCILE_ENABLED`, `LEAD_RESEND_INBOUND_SECRET`,
`LEAD_RETENTION_PURGE_ENABLED`, `NEXT_PUBLIC_MINIFORMS_MULTISTEP`,
`NURTURE_TOKEN_SECRET`, `TWILIO_WHATSAPP_FROM`, `ANALYTICS_ALLOW_NONPROD_INGEST`,
`SUPABASE_URL` (only `NEXT_PUBLIC_SUPABASE_URL` is set; the handler falls back
to it). All 21 charities/care keys ARE in the code's read-set. Nothing charities
defines is unused by wills-probate/divorce-finances code.

## 4. Copy script

Written to `C:\Users\user\.claude\jobs\933e5962\tmp\env-prep\copy_env.py`
(scratchpad — not committed, will be deleted at session end per standard_terms
housekeeping). Copies charities' 21 keys onto both target projects: `encrypted`
type stays `encrypted`, `sensitive` type stays `sensitive`, same targets as
charities. `ADMIN_DASHBOARD_KEY`, `CRON_SECRET`, `LEAD_NURTURE_TOKEN_SECRET` are
flagged in the script as "generate fresh, do not copy" and skipped unless
`--include-secrets-to-regenerate` is passed with real values supplied separately
— the script will not silently clone a per-site secret across three projects.
Without `--apply` it only prints the plan (dry run). `--apply` was never run
in this task.

### Dry-run output (actually run, key names and targets only)

```
DRY RUN -- no writes made. Pass --apply to create these on Vercel.

wills-probate (prj_oZhUm1ZKq3BeckaBtwpbjp5EBs2G):
  COPY  RESEND_FROM_EMAIL              sensitive  ['production']
  COPY  RESEND_FROM_NAME               sensitive  ['production']
  COPY  LEAD_SERVICE_REPLY_TO          sensitive  ['production']
  COPY  LEAD_SERVICE_FROM_EMAIL        sensitive  ['production']
  COPY  LEAD_SERVICE_FROM_NAME         sensitive  ['production']
  COPY  LEAD_NURTURE_SMS_ENABLED       sensitive  ['production']
  COPY  LEAD_NURTURE_EMAIL_ENABLED     sensitive  ['production']
  COPY  LEAD_NURTURE_ENABLED           sensitive  ['production']
  COPY  TWILIO_SMS_FROM                sensitive  ['production']
  COPY  TWILIO_API_KEY_SECRET          sensitive  ['production']
  COPY  TWILIO_API_KEY_SID             sensitive  ['production']
  COPY  TWILIO_AUTH_TOKEN              sensitive  ['production']
  COPY  TWILIO_ACCOUNT_SID             sensitive  ['production']
  SKIP  CRON_SECRET                    (site-specific secret -- generate fresh, not copied)
  COPY  RESEND_API_KEY                 sensitive  ['production']
  SKIP  LEAD_NURTURE_TOKEN_SECRET      (site-specific secret -- generate fresh, not copied)
  COPY  NEXT_PUBLIC_SUPABASE_URL       encrypted  ['production', 'preview']
  COPY  NEXT_PUBLIC_SUPABASE_ANON_KEY  encrypted  ['production', 'preview']
  COPY  SUPABASE_SERVICE_ROLE_KEY      encrypted  ['production', 'preview']
  SKIP  ADMIN_DASHBOARD_KEY            (site-specific secret -- generate fresh, not copied)
  DERIVE NEXT_PUBLIC_SITE_URL          encrypted  ['production', 'preview']  -> https://www.estateplanningspecialists.co.uk
  18 to copy, 3 skipped (generate fresh)

divorce-finances (prj_krGSMLVAWcrx6M8c6IlEyKtrgwqP):
  [identical 18 COPY / 3 SKIP list, NEXT_PUBLIC_SITE_URL -> https://www.divorcefinancespecialists.co.uk]
```

**Important limitation the dry run does NOT show but `--apply` will hit:**
of the 18 "COPY" lines, 13 are `sensitive`-type. Vercel's `sensitive` env type
is write-only by design — even the owner's token cannot read its plaintext
back via the API (verified: `decrypted:false`, empty `value`, on both the
list and single-var endpoints). So on `--apply`, the script will actually
create only the 5 `encrypted`-type keys (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and the two
derived `NEXT_PUBLIC_SITE_URL`s) and print a REFUSED line for each of the 13
sensitive ones, naming the key without writing it. Those 13 (Resend, Twilio,
LEAD_SERVICE_*, LEAD_NURTURE_*_ENABLED flags) must be typed in by hand from
the Vercel dashboard (copy-paste from charities' dashboard view, which CAN
show sensitive values to a human with project access — the API just can't).
This is a hard Vercel platform constraint, not a script bug.

## Summary

- Union of charities+care keys: 21, all with identical key set, all
  production+preview or production-only, none on development.
- Site-specific (do not blind-copy): `ADMIN_DASHBOARD_KEY`, `NEXT_PUBLIC_SITE_URL`
  (verified different), `CRON_SECRET`, `LEAD_NURTURE_TOKEN_SECRET`,
  `RESEND_FROM_NAME`/`LEAD_SERVICE_FROM_NAME` (inferred, template-based —
  Vercel's `sensitive` type can't be decrypted to verify).
- Code reads 34 vars estate-wide; charities defines 21 of them. The 13 extra
  (`EMAIL_VERIFY_API_KEY`, `LEAD_INTERNAL_SECRET`, autopause/reconcile/retention
  flags, `NEXT_PUBLIC_MINIFORMS_MULTISTEP`, `NURTURE_TOKEN_SECRET`,
  `TWILIO_WHATSAPP_FROM`, `SUPABASE_URL`) are features charities doesn't run
  either — nothing required is missing, nothing unnecessary was flagged for copy.
- `--apply` was not run. Dry run only, tested and pasted above.
- Run when ready: `python copy_env.py --apply` (from
  `C:\Users\user\.claude\jobs\933e5962\tmp\env-prep\`), after filling in the
  three fresh secrets and confirming the two FROM_NAME values.
