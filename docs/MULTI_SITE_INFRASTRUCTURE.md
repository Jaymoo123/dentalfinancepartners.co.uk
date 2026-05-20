# Multi-Site Infrastructure Reference

The single source of truth for how the niche-site portfolio is organised. Read this before adding a new site, touching shared code, running a migration, or making infrastructure changes. Update this doc as part of every phase of the infrastructure refactor.

**Plan file**: `~/.claude/plans/elegant-wibbling-muffin.md`
**Started**: 2026-05-20
**Operating procedure**: each phase commits to a `infra-refactor/phase-N-*` branch, passes a verification gate, then merges to main with a `infra-refactor/phase-N-complete` tag. Rollback target: `infra-refactor/baseline` tag.

---

## Phase Status

| Phase | Description | Status | Tag |
|---|---|---|---|
| baseline | Pre-refactor snapshot of working tree | ✅ Tagged | `infra-refactor/baseline` |
| 0 | Foundation + checkpoint setup, staging Supabase, env var matrix, this doc | 🟡 In progress | — |
| 1 | Inventory + sites registry | ⬜ Pending | — |
| 2 | Shared web component package via pnpm workspaces | ⬜ Pending | — |
| 3 | Centralise pipeline scripts | ⬜ Pending | — |
| 4 | Unify per-site DB tables (highest risk) | ⬜ Pending | — |
| 5 | Health dashboard + monitoring | ⬜ Pending | — |
| 6 | Ops + maintenance tooling | ⬜ Pending | — |
| 7 | Safety nets (feature flags, smoke tests, rollback) | ⬜ Pending | — |
| 8 | spinup-site automation | ⬜ Pending | — |
| 9 | Launch new niche sites | ⬜ Pending | — |

---

## Sites Registry

The active site portfolio as of Phase 0 baseline (2026-05-20).

| Site key | Brand | Production domain | Vercel project | Vercel project ID | Posts | Lead source | Notes |
|---|---|---|---|---|---|---|---|
| dentists | Dental Finance Partners | www.dentalfinancepartners.co.uk | `web` | `prj_f3tGDR4zozATcYOSLMmCqO2ZInNV` | 150 | `dentists` | Project name "web" is generic, should be renamed |
| property | Property Tax Partners | www.propertytaxpartners.co.uk | `property-tax-partners` | `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU` | 289 | `property` | |
| medical | Medical Accountants | www.medicalaccounts.co.uk | `medicalaccounts.co.uk` | `prj_50vByZ3rqXQQwCUeENUTBbNBB41n` | 46 | `medical` | **Config drift**: `Medical/niche.config.json` declares `medicalaccountantsuk.co.uk` but production is `medicalaccounts.co.uk`. Lowest post count. Reconcile in Phase 1. |
| solicitors | Accounts For Lawyers | www.accountsforlawyers.co.uk | `solicitors` | `prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9` | 149 | `solicitors` | |
| generalist | Holloway Davies | www.hollowaydavies.co.uk | `holloway-davies` | `prj_rMK56yY2qcCPTObgwkQjVXQl8yl3` | 366 | `general` | Largest post count, generalist (not niche). James Holloway reviewer byline (per memory). |
| agency | Agency Founder Finance | www.agencyfounderfinance.co.uk | `agency-founder-finance` | `prj_roTeeTjzABAR7D649dTkq2ta4rQi` | 306 | `agency` | **Lives in its own git repo**: github.com/Jaymoo123/agency-founder-finance. Monorepo unification deferred to Phase 2 prep. **Framework preset = null** in Vercel — risk noted in `~/.claude/projects/.../memory/vercel_framework_preset_404.md`. Verify routes resolve, not just homepage. |

All 6 share Vercel team: `team_XF9WAygZX7SGk9Fo4tOAnihH`.

---

## Phase 0 Baseline Verification (2026-05-20)

Captured at the moment the `infra-refactor/baseline` tag was set.

### Homepage smoke test

| Site | URL | HTTP status |
|---|---|---|
| Dentists | https://www.dentalfinancepartners.co.uk | 200 ✓ |
| Property | https://www.propertytaxpartners.co.uk | 200 ✓ |
| Medical | https://www.medicalaccounts.co.uk | 200 ✓ |
| Solicitors | https://www.accountsforlawyers.co.uk | 200 ✓ |
| Generalist | https://www.hollowaydavies.co.uk | 200 ✓ |
| Digital Agency | https://www.agencyfounderfinance.co.uk | 200 ✓ |

### Latest content per site

| Site | Latest blog post (file) | Total posts |
|---|---|---|
| Dentists | `dental-practice-software-accounting-integration.md` | 150 |
| Property | `property-accountant-nottingham-landlords.md` | 289 |
| Medical | `gp-vat-registration.md` | 46 |
| Solicitors | `uk-llp-tax-non-resident-members.md` | 149 |
| Generalist | `capital-allowances-second-hand-vans.md` | 366 |
| Digital Agency | (separate repo, 306 posts confirmed via filesystem) | 306 |

### Repo state at baseline

- Main repo (`Accounting/`): remote `github.com/Jaymoo123/dentalfinancepartners.co.uk`
- Branch: `main`, last commit before refactor: `5da8276 chore: pre-refactor baseline snapshot of working-tree state`
- Tag: `infra-refactor/baseline` points here
- Digital Agency separate repo: remote `github.com/Jaymoo123/agency-founder-finance`, last commit `0697ef2 next.config: allow images.pexels.com`
- Digital Agency repo working tree still has untracked files (AIA blog posts + IndexNow key) — owner action item; not blocking the main refactor

---

## Environment Variables (template)

To be populated in Phase 1 by querying Vercel API per project. User confirmed env vars are "likely uniform across projects."

Expected set (from typical Next.js + Supabase + DeepSeek stack):

| Variable | Purpose | Where set | Sensitive? |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Vercel env | No (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon JWT | Vercel env | No (public, scoped by RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase admin key | Vercel env (server) | YES |
| `DEEPSEEK_API_KEY` | Blog generator LLM | Local `.env` + scripts | YES |
| `ANTHROPIC_API_KEY` | Haiku verifier | Local `.env` + scripts | YES |
| `SERPER_API_KEY` | SERP research | Local `.env` + scripts | YES |
| `DATAFORSEO_LOGIN` / `DATAFORSEO_PASSWORD` | Keyword research | Local `.env` + scripts | YES |
| `RESEND_API_KEY` | Newsletter on Generalist + Digital Agency | Vercel env (server) | YES |
| `GSC_*` (token pickle + creds) | Google Search Console API | Local `.env` + scripts | YES |
| `PEXELS_API_KEY` | Blog hero image fetch | Local `.env` + scripts | YES |

**To verify in Phase 1**: actual env var set per Vercel project, plus any divergence across projects.

---

## Staging Supabase Project

**Status**: Not yet set up (manual gate — requires Supabase dashboard).

**Required for**: Phase 4 (DB table consolidation) dry-runs, Phase 6 migration runner safety, Phase 7 RLS policy testing.

**Setup steps (owner action):**
1. Log in to https://supabase.com/dashboard
2. Create new project. Name: `accounting-staging`. Region: same as production (likely `eu-west-1`/London).
3. Free tier is fine — schema-only sync, minimal data.
4. Capture URL + service role key → add as new env vars: `SUPABASE_STAGING_URL`, `SUPABASE_STAGING_SERVICE_ROLE_KEY`.
5. After created, sync schema from prod:
   ```bash
   # Replace with actual URLs
   pg_dump --schema-only --no-owner "$PROD_SUPABASE_DB_URL" > schema_snapshot.sql
   psql "$STAGING_SUPABASE_DB_URL" < schema_snapshot.sql
   ```
6. Verify staging has same tables + RLS policies as prod (Phase 1 captures the inventory of both).

---

## Supabase Tables (Phase 1 will populate)

Audit deferred to Phase 1. Known tables from memory + commit log:

- Already multi-site (with `source` or `site_key`): `leads`, `gsc_query_data`, `dataforseo_keyword_data`, `dataforseo_competitor_data`, `api_cost_log`, `optimisation_changes`, `optimisation_opportunities`, `apply_attempts`, `meta_performance`, `sites`, `vw_change_performance` view
- **Per-site (need consolidation in Phase 4)**: `blog_topics_generalist`, `blog_topics_agency` (created by migrations 20260516000001 and 20260517000001)
- Phase 1 to query `pg_tables` exhaustively + identify any other per-site tables

---

## RLS Policies (Phase 1 will populate)

User confirmed RLS policies are in place. Phase 1 must:

1. Query Supabase for all RLS policies per table
2. Capture policy definitions verbatim into a new section here
3. Establish negative test: "Can a query made under site_key=X return any row with site_key=Y?" — must be **No** for cross-site-isolation tables (e.g. leads, blog_topics).

No table consolidation in Phase 4 proceeds until the RLS verification gate passes on staging.

---

## Pipeline Scripts (Phase 1 will populate, Phase 3 will centralise)

Known duplicates across sites (memory + commit log):
- `submit_indexnow.py` — known to exist in each site's `pipeline/`
- Likely others (config_supabase.py, fetch_image.py, etc.)

Phase 1 audit will produce the full list.

Phase 3 destination: `optimisation_engine/indexing/` and other appropriate subdirs of `optimisation_engine/`. Old per-site scripts become 5-line shims for backward compatibility.

---

## Shared Web Components (Phase 1 will populate, Phase 2 will extract)

Known candidates for extraction (from Phase 1 conversation audit):
- `LeadForm` — near-identical across sites, role options differ per niche (should become a prop)
- `Header`, `Footer` — differ in branding only
- `BlogPostLayout`, `RelatedPosts`
- `schema.ts` JSON-LD helpers
- `supabase-client.ts` (`submitLead` helper)
- Newsletter signup form (where it exists — Generalist + Digital Agency only)

Phase 2 destination: `packages/web-shared/` via pnpm workspaces.

---

## Ops Commands (Phase 6 will build)

Planned interface:

| Command | Purpose |
|---|---|
| `python -m optimisation_engine.ops.deploy --site X` / `--all` | Wraps `vercel deploy --prod` for one or all sites |
| `python -m optimisation_engine.ops.health --site X` / `--all` | Per-site health snapshot (deploy status, latest post, GSC index, lead count) |
| `python -m optimisation_engine.ops.migrate --env staging --dry-run` | Pending DB migrations with dry-run-first pattern |
| `python -m optimisation_engine.ops.backup --table X` | pg_dump a table to Supabase storage bucket |
| `python -m optimisation_engine.ops.pause-site --site X` | Sets `sites.status='paused'`; engine skips paused sites |
| `python -m optimisation_engine.ops.spinup-site --niche X --domain Y --brand Z` | New-site spinup (Phase 8) |

---

## Rollback Procedures (Phase 7 will document)

Planned procedures, each tested by intentional trigger:

| Failure | Rollback |
|---|---|
| Bad migration | `pg_restore` from backup; documented rollback SQL in migration file |
| Bad Vercel deploy | `vercel rollback` for the affected project |
| Bad shared web component | Revert the PR; redeploy each site to roll back the dependency |
| Bad blog_generator change | Flip feature flag in `site_configs` to disable, re-run weekly_run |
| Emergency: refactor went sideways | `git checkout infra-refactor/baseline` (tag captures the pre-refactor state) |

---

## Open Manual Gates for Phase 0 Completion

These items require owner action before Phase 0 can be tagged complete:

- [ ] Create staging Supabase project per "Staging Supabase Project" section above
- [ ] Reconcile Medical site domain drift (`niche.config.json` says `medicalaccountantsuk.co.uk`, production runs on `medicalaccounts.co.uk`)
- [ ] Optional: commit Digital Agency repo's untracked AIA blog posts + IndexNow key (separate repo, separate hygiene; not blocking)
- [ ] Verify Vercel framework preset on Digital Agency project is correctly set (`"framework": null` is in project.json; known risk per memory)
