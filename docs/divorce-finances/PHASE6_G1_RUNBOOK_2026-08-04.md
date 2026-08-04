# divorce-finances Phase-6 -> G1 owner runbook

Date: 2026-08-04. For the owner, single sitting. Content build is complete
(45 live posts: 4 pillars + 41 spokes, waves 1-4 done). Everything below is
code-ready and unexecuted. Nothing here has been run; no env var set, no
migration applied, no Vercel project created, no deploy made.

Mirrors the shape of `docs/wills-probate/PHASE6_G1_RUNBOOK_2026-08-04.md`
and the arming discipline in
`docs/_engines/INTEGRATION_ARMING_RUNBOOK_2026-08-03.md`.

---

## (a) Migration apply

File: `supabase/migrations/20260803000002_add_divorce_finances_to_leads_and_sites.sql`

Apply once, via the Supabase SQL editor (project `dhlxwmvmkrfnmcgjbntk`) or
the Management API (`SUPABASE_ACCESS_TOKEN` in root `.env`, memory
`supabase_cli_access`).

What it creates (transaction, `BEGIN`/`COMMIT`):
1. Adds `'divorce-finances'` to the `leads_source_valid` CHECK constraint on
   `public.leads` (rebuilt list, includes `'wills-probate'` and `'ashfield'`
   too — the migration file's own header documents the ordering hazard
   between the ashfield and wills-probate migrations; re-read the live
   constraint def first if either has changed since 2026-08-03).
2. Adds `'divorce-finances'` to the `sites_site_key_check` CHECK constraint
   on `public.sites`.
3. Inserts one `sites` row: `site_key='divorce-finances'`,
   `display_name='Divorce Finances (placeholder)'`,
   `domain='www.divorce-finances-placeholder.co.uk'`, `active=false`,
   `content_dir='divorce-finances/web/content/blog'`,
   `git_repo_path='divorce-finances/web'`, `blog_topics_table='blog_topics'`.
   `ON CONFLICT (site_key) DO NOTHING`, safe to re-run.

Verified 2026-08-04: file exists, is apply-ready, `active=false` is set
correctly (site stays out of scheduled jobs pending G1). Storage/lead
prefix used throughout the app code is `dvf` (grep-confirmed across
`divorce-finances/web/src/lib/{assistant,calculators,resources,support}`),
NOT `bfp` or `wpc` — no cross-site collision with either sibling build.
Lead source string is `"divorce-finances"` (`api/leads/submit/route.ts`),
matching the migration's CHECK entry.

Rollback: see the migration's own trailing comment block (`DELETE FROM
sites ...` + re-run the two ALTERs with the site removed from both arrays;
only safe if no divorce-finances lead rows exist yet).

---

## (b) Vercel project + deploy command

No Vercel project exists yet for divorce-finances. Create one (Root
Directory = `divorce-finances/web`, same pattern as the other niche
sites), then deploy using the estate's standard env-override CLI pattern
(memory `vercel_cli_deploy_workflow`):

```powershell
# cwd = C:\Users\user\Documents\Accounting (repo root, NOT divorce-finances/)
$env:VERCEL_PROJECT_ID = "TBD-at-creation"
$env:VERCEL_ORG_ID = "team_XF9WAygZX7SGk9Fo4tOAnihH"
vercel deploy --prod --yes --archive=tgz
```

Notes carried over from the estate's standing gotchas:
- Deploy from the **repo root**, not `divorce-finances/` or
  `divorce-finances/web/` — the env-var override bypasses the local
  `.vercel/project.json` lookup, and Vercel's own `rootDirectory` setting
  on the project does the `cd` into `divorce-finances/web`.
- `--archive=tgz` is mandatory; without it a repo-root deploy enumerates
  everything not `.vercelignore`d and can blow the upload-size limit.
  Purge stale worktrees first if any exist.
- Root `.vercelignore` already excludes `.claude/`, `.cache/`, `docs/`,
  `briefs/` etc. — never exclude `*/web/**`.
- Auth relies on the CLI's stored login; no `--token` needed.
- The 2026-07-24 build handoff noted the Vercel CLI was not installed on
  that machine at the time (`npm i -g vercel` first) and referenced a
  `sitenudge-projects` team — that predates the confirmed estate-standard
  org `team_XF9WAygZX7SGk9Fo4tOAnihH` used above and by every other niche
  site; use the org ID in this runbook, not the handoff's team name.

---

## (c) Required env vars (Production scope on the new project)

Read from `divorce-finances/web/src/lib/leads/*`,
`.../app/api/cron/*`, `.../app/api/leads/*`, `.../.env.local.example`:

| Var | Purpose | Fail mode if absent |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` (+ `NEXT_PUBLIC_SUPABASE_URL`/anon key) | DB access (leads, nurture state, blog_topics) | Lead/nurture paths error or no-op |
| `RESEND_API_KEY` | Outbound email (lead notify, nurture sends, digest, guardrail alert) | `nurture-digest.ts:369` / `nurture-health.ts:290` no-op, no send |
| `CRON_SECRET` | Auth for `/api/cron/lead-nurture` and `/api/cron/lead-nurture-digest` | Route hard-refuses (`authorized()` returns false if unset) — **master nurture kill switch #1** |
| `LEAD_NURTURE_ENABLED` | Master arm for real nurture sends across both sequences (`leadNurtureArmed()` in `channels.ts`) | Dormant: cron runs, records state, sends nothing — **master nurture kill switch #2** |
| `LEAD_NURTURE_EMAIL_ENABLED` / `LEAD_NURTURE_SMS_ENABLED` / `LEAD_NURTURE_WHATSAPP_ENABLED` | Per-channel sub-gates (SMS/WhatsApp also require Twilio creds) | Channel silently skipped if unset |
| `LEAD_NURTURE_AUTOPAUSE_ENABLED` | Enables auto-pause guardrail on the nurture cron | Guardrail evaluated but pause action skipped if unset/not `"1"` |
| `LEAD_NURTURE_TOKEN_SECRET` | Opt-out link token signing | Present in `.env.local.example`; needed once nurture is armed |
| (none, per-site) — lead notify runs off the shared Supabase DB trigger `leads_to_email_trg` on `public.leads`, not per-site app env | New-lead email fires automatically once the migration's `sites` row exists and a lead with `source='divorce-finances'` is inserted | Confirm `resolveLeadTo` has a divorce-finances entry before the first real lead (memory `email_routing_partner_vs_subscriber`) |
| BYPASS (Vercel deployment protection bypass token), if the project is created with protection on | Needed only if preview/prod is gated | N/A unless protection is enabled |

**Two independent kill switches confirmed**: `CRON_SECRET` unset 401s the
route before any lead is touched; `LEAD_NURTURE_ENABLED` unset lets the
cron run (heartbeat, guardrails) but `leadNurtureArmed()` blocks every
actual send. Both sequences (`divorce_contactability` and
`divorce_detail_capture`, `src/config/lead-nurture.ts`) sit behind the
same two gates — there is no way to arm one sequence without the other.
Do not set `CRON_SECRET` or `LEAD_NURTURE_ENABLED` on this project until
ready for nurture to actually run.

---

## (d) G1 decisions needed from the owner

**1. Brand + domain.** See `docs/divorce-finances/BRAND_SHORTLIST_2026-08.md`
(recommended: **Divorce Finance Specialists** /
divorcefinancespecialists.co.uk, confirmed AVAILABLE via Nominet RDAP as
of 2026-08-03; runner-up Divorce Settlement Specialists). All content
bodies are brand-agnostic (zero brand-name mentions, `{{BRAND}}` token
throughout core copy), so this is a metadata-only swap, not a content
rewrite: `optimisation_engine/blog_generator/site_configs/divorce_finances.py`
(`display_name`, `domain`, `site_base_url` equivalents), any niche config
JSON under `divorce-finances/`, and the placeholder domain string
`www.placeholder-divorce-domain.example` / `www.divorce-finances-placeholder.co.uk`
wherever it appears (config, migration's `sites` row via `UPDATE`, env vars).

**2. MoneyHelper / FMCA external-link allowlist.** The
`LEAD_REGULATORY_POSITION_2026-07-24.md` verdict requires MIAM-bound
referrals to route to FMCA-accredited mediators, and the pillar/pension
content links out to gov.uk and MoneyHelper tools as anchor citations.
Presented neutrally: does the owner want a fixed allowlist of external
domains (moneyhelper.org.uk, familymediationcouncil.org.uk, gov.uk) baked
into the site's outbound-link policy before launch, or is per-post
citation judgement (current state) sufficient? No recommendation implied;
this is the owner's call, same posture as the wills-probate
Fable-authorship question in its own runbook.

---

## (e) Post-deploy checklist

- [ ] Metadata/brand swap: blog-generator site_config identity block, any
      niche config JSON, `README`/`STATE.md` placeholder references,
      `sites.domain` (separate `UPDATE`, not part of the migration).
- [ ] `llms.txt` fill-in: `divorce-finances/web/public/llms.txt` exists as
      a pre-launch stub; regenerate with the real domain, full
      pillar/spoke/calculator/research index, and attribution tagging,
      mirroring the wills-probate pattern.
- [ ] IndexNow key file: key `4d2abeb261e1ca7875c6f16ee1257ac4` is already
      registered in `optimisation_engine/indexing/config.py` under
      `"divorce-finances"`; the public
      `4d2abeb261e1ca7875c6f16ee1257ac4.txt` file does NOT exist yet under
      `divorce-finances/web/public/` (correct — create it at G1 once the
      real domain is live).
- [ ] Test-lead cycle end to end: submit a `source='test'` lead through the
      real deployed form, confirm it lands in `public.leads` with
      `source='divorce-finances'`, confirm the notify email fires,
      confirm nurture behaves as expected once `CRON_SECRET` +
      `LEAD_NURTURE_ENABLED` are deliberately set (or stays dark if
      nurture is not wanted at launch). Clean up the test lead per the
      owner's dashboard-hygiene rule.
- [ ] Request Indexing (GSC + Bing) once the real domain resolves and
      DNS/SSL is live — do not submit before the domain swap.
- [ ] `sites.active` flip from `false` to `true` for
      `site_key='divorce-finances'` once the domain is live (single
      `UPDATE`, not part of the migration).

---

## Verification results (this pass, 2026-08-04)

| Item | Result |
|---|---|
| Migration `20260803000002_add_divorce_finances_to_leads_and_sites.sql` exists, apply-ready, `active=false` | PASS |
| Storage/lead prefix is `dvf`, not `bfp`/`wpc` | PASS (grep across `lib/{assistant,calculators,resources,support}`) |
| Lead source identifier `"divorce-finances"` matches migration CHECK entry | PASS (`api/leads/submit/route.ts`) |
| Nurture env-gated (two independent kill switches) | PASS — `CRON_SECRET` unset hard-fails `authorized()`; `LEAD_NURTURE_ENABLED` gates `leadNurtureArmed()` for both sequences; `LEAD_NURTURE_AUTOPAUSE_ENABLED` gates the pause guardrail |
| Two nurture sequences identified | `divorce_contactability` + `divorce_detail_capture` (`src/config/lead-nurture.ts`), both behind the same gates |
| IndexNow key `4d2abeb261e1ca7875c6f16ee1257ac4` registered in `optimisation_engine/indexing/config.py` | PASS, under `"divorce-finances"` |
| Public IndexNow `.txt` correctly absent pre-G1 | PASS (only `llms.txt` present in `public/`) |
| `routing_safety` EXPECTED_SITE_PREFIXES has divorce-finances entry | PASS (`"divorce-finances": "divorce-finances"`) |
| Lead form consent checkbox | PASS (`LeadForm.tsx` — `consent` state, required validation, `consent_given`/`consent_text`/`consent_at` sent) |
| `npx tsc --noEmit` in `divorce-finances/web` | PASS, clean, zero errors |
| Aux-cron compliance line (booking-reminder T-24 email) | ALREADY CORRECT — `aux-cron.ts:229` reads "The partner firm we introduce you to will ring you then", already partner-firm framing, not in-house. No edit made; the handoff's "our specialists will ring" wording was not found in the current file (may have been fixed in an earlier pass, or the handoff described an intended risk rather than the shipped text). |

No code changes were required this pass — every item audited PASS on
first read. Handoff note that flagged the aux-cron wording as
Phase-6-deferred appears to have already been resolved before this
session (line already reads correctly); reported here rather than
silently assumed, per the task's explicit ask to reword "NOW" if found.

---

## Files changed this pass

- `docs/divorce-finances/PHASE6_G1_RUNBOOK_2026-08-04.md` (new, this file)
- `docs/divorce-finances/STATE.md` (Phase 6 section updated to point here)

No content or code under `divorce-finances/web/**` or `wills-probate/**`
was touched.
