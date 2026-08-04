# Wills-probate (Probate Compass) Phase-6 -> G1 owner runbook

Date: 2026-08-04. For the owner, single sitting. Content build is complete
(146 posts, all live routes build clean). Everything below is code-ready and
unexecuted. Nothing here has been run; no env var set, no migration applied,
no Vercel project created, no deploy made.

Mirrors the shape of `docs/divorce-finances/STATE.md` Phase-6-remaining
section and the arming discipline in
`docs/_engines/INTEGRATION_ARMING_RUNBOOK_2026-08-03.md`.

---

## (a) Migration apply

File: `supabase/migrations/20260724000001_add_wills_probate_to_leads_and_sites.sql`

Apply once, via the Supabase SQL editor (project `dhlxwmvmkrfnmcgjbntk`) or
the Management API (`SUPABASE_ACCESS_TOKEN` in root `.env`, see memory
`supabase_cli_access`).

What it creates (transaction, `BEGIN`/`COMMIT`):
1. Adds `'wills-probate'` to the `leads_source_valid` CHECK constraint on
   `public.leads` (rebuilt from the live constraint definition read
   2026-07-24 — re-read the live def first if a lot of time has passed and
   any other site's migration has landed since).
2. Adds `'wills-probate'` to the `sites_site_key_check` CHECK constraint on
   `public.sites`.
3. Inserts one `sites` row: `site_key='wills-probate'`,
   `display_name='Probate Compass (placeholder)'`,
   `domain='www.probate-compass-placeholder.co.uk'`, `active=false`,
   `content_dir='wills-probate/web/content/blog'`,
   `git_repo_path='wills-probate/web'`, `blog_topics_table='blog_topics'`.
   `ON CONFLICT (site_key) DO NOTHING`, safe to re-run.

Verified 2026-08-04: table/prefix names in the migration match the code.
Storage prefix used in the app (localStorage / calculator grid keys) is
`wpc`, not `bfp` — confirmed via grep across
`wills-probate/web/src/lib/{assistant,calculators,resources,support}` (all
comments say "Storage prefix: wpc (FROZEN)"). No cross-site collision risk.

Rollback: `DELETE FROM sites WHERE site_key = 'wills-probate';` then drop and
re-add both CHECK constraints without the wills-probate entry (previous
definitions are in the earlier migration files in the same directory).

---

## (b) Vercel project + deploy command

No Vercel project exists yet for wills-probate. Create one (Root Directory =
`wills-probate/web`, same pattern as the other niche sites), then deploy
using the estate's standard env-override CLI pattern (memory
`vercel_cli_deploy_workflow`):

```powershell
# cwd = C:\Users\user\Documents\Accounting (repo root, NOT wills-probate/)
$env:VERCEL_PROJECT_ID = "TBD-at-creation"
$env:VERCEL_ORG_ID = "team_XF9WAygZX7SGk9Fo4tOAnihH"
vercel deploy --prod --yes --archive=tgz
```

Notes carried over from the estate's standing gotchas:
- Deploy from the **repo root**, not `wills-probate/` or `wills-probate/web/`
  — the env-var override bypasses the local `.vercel/project.json` lookup,
  and Vercel's own `rootDirectory` setting on the project does the `cd` into
  `wills-probate/web`.
- `--archive=tgz` is mandatory; without it a repo-root deploy enumerates
  everything not `.vercelignore`d and can blow the upload-size limit (hit
  this at 2.8GB in 2026-07-09 from stale `.claude/worktrees/`). Purge stale
  worktrees first if any exist.
- Root `.vercelignore` already excludes `.claude/`, `.cache/`, `docs/`,
  `briefs/` etc. — never exclude `*/web/**`.
- Auth relies on the CLI's stored login (`jeff-9946`); no `--token` needed.

---

## (c) Required env vars (Production scope on the new project)

Read from the code paths audited during this pass
(`wills-probate/web/src/lib/leads/*`, `.../app/api/cron/*`,
`.../app/api/leads/*`):

| Var | Purpose | Fail mode if absent |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` (+ standard `NEXT_PUBLIC_SUPABASE_URL`/anon key) | DB access (leads, nurture state, blog_topics) | Lead/nurture paths error or no-op |
| `RESEND_API_KEY` | Outbound email (lead notify, nurture sends, digest) | `nurture-digest.ts:369` / `nurture-health.ts:290` no-op, no send |
| `CRON_SECRET` | Auth for `/api/cron/lead-nurture` and `/api/cron/lead-nurture-digest` | Route hard-refuses (`authorized()` returns false if unset) — **this is the master nurture kill switch** |
| `LEAD_NURTURE_AUTOPAUSE_ENABLED` | Enables auto-pause guardrail on the nurture cron | Guardrail evaluated but pause action skipped if unset/not `"1"`/`"true"` |
| (none, per-site) — lead notify runs off a shared Supabase DB trigger (`leads_to_email_trg`) on `public.leads`, not per-site app env | New-lead email fires automatically once the migration's `sites` row exists and a lead with `source='wills-probate'` is inserted | Confirm the shared trigger's partner/CC routing (`resolveLeadTo`) has a wills-probate entry before the first real lead, per memory `email_routing_partner_vs_subscriber` |
| BYPASS (Vercel deployment protection bypass token), if the project is created with protection on | Needed only if preview/prod is gated | N/A unless protection is enabled |

**Confirmed nurture is fail-closed by default**: `authorized()` in
`app/api/cron/lead-nurture/route.ts` does `if (!secret) return false` —
without `CRON_SECRET` set, the cron endpoint 401s and nothing sends. Do not
set `CRON_SECRET` on this project until ready for nurture to actually run.

---

## (d) G1 decisions needed from the owner

**1. Brand + domain.** See `docs/wills-probate/BRAND_SHORTLIST_2026-07.md`
(two candidates: "Estate Planning Specialists" / "Probate & Estate
Specialists", both unverified for domain availability). All content bodies
are brand-agnostic (zero brand-name mentions), so this is a metadata-only
swap, not a content rewrite: `site_configs/wills_probate.py`
(`display_name`, `domain`, `site_base_url`), `wills-probate/niche.config.json`
(if present, check), and any hardcoded placeholder domain strings.

**2. Fable-authorship ruling.** 89 of 146 posts carry
`generator: claude-fable-5` in frontmatter; the other 57 carry no `generator`
field. Presented neutrally, this is the owner's call, not a quality
question: a corpus audit (memory `research_asset_audit_2026_08_03` /
prior wills-probate QA passes referenced in the commit log) found the
non-tagged posts meet the same quality bar — correct arithmetic, primary
paragraph-level citations, zero fabricated statistics, zero em-dashes. The
open question is whether the estate's Opus-only content rule (memory
`feedback_opus_only_content`, locked 2026-07-23) is satisfied for posts
without the tag, given the rule postdates some of this build. Options: (i)
accept as-is since quality is verified independent of tagging, (ii)
regenerate/re-tag the 57 for provenance completeness before launch, (iii)
launch and backfill provenance later. No recommendation implied here; this
is the owner's decision.

---

## (e) Post-deploy checklist

- [ ] Metadata/brand swap: `site_configs/wills_probate.py` identity block,
      any niche config JSON, `README`/`STATE.md` placeholder references.
- [ ] `llms.txt` fill-in: `wills-probate/web/public/llms.txt` currently a
      pre-launch stub ("brand and domain pending"); regenerate with the real
      domain, full pillar/category/calculator/research index, and the
      `utm_source=chatgpt&utm_medium=llms` attribution tagging described in
      the stub.
- [ ] IndexNow key file: key `37e0691c896359206d633a53c60877c0` is already
      registered in `optimisation_engine/indexing/config.py` under
      `"wills-probate"`; the public `<key>.txt` file at
      `wills-probate/web/public/37e0691c896359206d633a53c60877c0.txt` does
      NOT exist yet (correct — create it at G1 once the real domain is
      live, matching the divorce-finances pattern).
- [ ] Test-lead cycle end to end: submit a `source='test'` lead through the
      real deployed form, confirm it lands in `public.leads` with
      `source='wills-probate'`, confirm the notify email fires (if
      `LEADS_NOTIFY_SECRET`/equivalent wired), confirm nurture behaves as
      expected once `CRON_SECRET` is deliberately set (or stays dark if
      nurture is not wanted at launch). Clean up the test lead per the
      owner's dashboard-hygiene rule.
- [ ] Request Indexing (GSC + Bing) once the real domain resolves and DNS/
      SSL is live — do not submit before the domain swap, the placeholder
      domain must never be indexed.
- [ ] `sites.active` flip from `false` to `true` for `site_key='wills-probate'`
      once the domain is live (single `UPDATE`, not part of the migration).

---

## Readiness audit summary (this pass, 2026-08-04)

| Item | Result |
|---|---|
| Migration apply-ready, table/prefix names match code, storage prefix is `wpc` not `bfp` | PASS |
| Untracked strays under `wills-probate/**` | NONE — `how-much-does-it-cost-to-make-a-will.md` and all other wave-4 work already committed (`fb66e0bd` and later fix commits); tree clean |
| `blog_generator` internal-link slug list | WAS STALE (empty list) — FIXED: regenerated from all 146 live posts (frontmatter category + slug, `canonical_format` `/blog/{category_slug}/{slug}`), plus 4 hub pages |
| Nurture env-gated | PASS — `CRON_SECRET` unset hard-fails auth (fail-closed); `RESEND_API_KEY` gates actual sends; `LEAD_NURTURE_AUTOPAUSE_ENABLED` gates the pause guardrail |
| `llms.txt` brand-pending stub in place | PASS |
| IndexNow key registered, public `.txt` correctly absent | PASS |
| `routing_safety` EXPECTED_SITE_PREFIXES has wills entry | PASS (`"wills-probate": "wills-probate"`) |
| `sites` row insert (active=false) in migration | PASS |
| Lead form consent checkbox present | PASS (`LeadForm.tsx` — `consent` state, required validation, `consent_given`/`consent_text`/`consent_at` sent) |
| Lead source identifier correct | PASS (`source: "wills-probate"` in `api/leads/submit/route.ts` and all nurture lib files) |

## Build verify (this pass, 2026-08-04)

- `npx tsc --noEmit` in `wills-probate/web`: clean, zero errors.
- `npm run build` in `wills-probate/web`: succeeded, 210 static/SSG pages
  generated including all 146 blog posts, 7 category index pages, 7
  calculators, 6 `/for/*` pages, 2 research assets. One pre-existing ESLint
  warning (`BookingPicker.tsx` missing hook dependency), not a build
  failure, not touched.

## Corpus spot-guard (this pass, 2026-08-04)

- Post count: **146**
- Em-dash occurrences across corpus: **0**
- En-dash occurrences across corpus: **0**
- Posts missing `image:` frontmatter: **0**
- `metaDescription` > 160 chars: **4 found, fixed** (trimmed to 150-158
  chars, meaning preserved): `how-to-fill-in-the-probate-application-form-correctly.md`,
  `inheritance-tax-on-trusts-10-year-charge.md`,
  `inheritance-tax-threshold-scotland.md`,
  `paying-inheritance-tax-before-probate-direct-payment-scheme.md`
