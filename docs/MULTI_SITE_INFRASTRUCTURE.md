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

**Status**: ✅ Created 2026-05-20. Schema sync to staging deferred until Phase 3/4 prep.

**Project details**:
- URL: `https://fyabqbuklfrjqjxaofcx.supabase.co`
- Project ref: `fyabqbuklfrjqjxaofcx`
- Publishable (anon) key: in `.env` as `SUPABASE_STAGING_KEY`
- DB connection: `postgresql://postgres:[PASSWORD]@db.fyabqbuklfrjqjxaofcx.supabase.co:5432/postgres` — postgres password held by owner; needed for `pg_dump`-based sync if used
- REST API verified responding (`PGRST205` = expected empty schema)

**Required for**: Phase 4 (DB table consolidation) dry-runs, Phase 6 migration runner safety, Phase 7 RLS policy testing.

**Outstanding owner actions before staging is usable for migrations**:
1. `supabase login` (interactive — opens browser, captures access token to `~/.supabase`)
2. `supabase link --project-ref fyabqbuklfrjqjxaofcx`
3. Decide schema-sync approach:
   - **Option A (recommended)**: replay committed migrations against staging via `npx supabase db push --linked`. Works if prod schema was 100% created via committed migrations. We need to verify this in Phase 1.5.
   - **Option B**: pg_dump from prod (needs prod postgres password) + psql into staging.
4. Capture staging service_role key if Phase 7 needs admin operations (currently the publishable key is enough for read tests).

**Supabase CLI** available via `npx supabase` (version 2.100.1+, no global install needed).

---

## Supabase Tables — Phase 1 Audit Results (2026-05-20)

Project: `https://dhlxwmvmkrfnmcgjbntk.supabase.co`. Audited via `scripts/phase1_supabase_audit.py` and `scripts/phase1_supabase_deeper.py`. Raw output saved to `docs/phase1_supabase_audit.json` + `docs/phase1_supabase_deeper.json`.

### Shared tables (already multi-site clean)

| Table | Rows | Key columns | Notes |
|---|---|---|---|
| `sites` | 4 | `site_key`, `display_name`, `domain`, `gsc_property_url`, `bing_property_url`, `niche`, `target_buyer_persona`, `brand_voice_notes`, `content_dir`, `git_repo_path`, `blog_topics_table`, `active`, `created_at`, `updated_at` | Source-of-truth registry. **Missing 2 sites** (see below) |
| `leads` | **11 total** | `id`, `created_at`, `full_name`, `email`, `phone`, `role`, `practice_name`, `message`, `source_url`, `status`, `source` | Sources represented in 11 leads: `dentists`, `medical`, `property` only. Solicitors, Agency, Generalist have produced **zero leads ever**. |
| `gsc_query_data` | 2,146 | `site_key`, `page_url`, `query`, `date` + more | |
| `bing_query_data` | 0 | schema-only | Not actively used |
| `dataforseo_keyword_data` | 1,644 | `site_key`, `seed_keyword`, etc. | |
| `dataforseo_competitor_data` | 68 | `site_key`, `competitor_domain`, etc. | |
| `api_cost_log` | 3,835 | `api_provider`, `site_key`, `niche`, etc. | Heavy usage. Per-niche cost rollup query target. |
| `optimisation_changes` | 160 | `site_key`, `change_type`, `target_url`, `target_slug` + 18 more | |
| `optimisation_opportunities` | 542 | `site_key`, `opportunity_type`, `target_url` + 18 more | |
| `apply_attempts` | 0 | empty | Recently created, expected to populate as walker runs |
| `meta_performance` | 0 | empty | Recently created |
| `gsc_page_performance` | 1,929 | `niche`, `site_url`, `page_url`, `date` + more | |
| `blog_optimizations` | 111 | wide table, 53+ columns | Lifecycle tracking |
| `gsc_indexing_issues` | 0 | empty | |

### Per-site tables (Phase 4 will consolidate)

**Three divergent schemas across the six tables**:

| Table | Rows | Columns | Schema family | Primary keyword col |
|---|---|---|---|---|
| `blog_topics_medical` | 62 | 13 | **"Old simple"** | `keyword` |
| `blog_topics_solicitors` | 65 | 13 | **"Old simple"** | `keyword` |
| `blog_topics_property` | 474 | 23 | **"Property-style"** | `topic` + `secondary_keywords` (JSON) |
| `blog_topics_dentists` | 146 | 31 | **"Property-style"** | `topic` + 10 separate `secondary_keyword_1..10` columns |
| `blog_topics_agency` | 314 | 25 | **"Modern"** | `topic` + has `suggested_slug` |
| `blog_topics_generalist` | 289 | 25 | **"Modern"** | `topic` + has `suggested_slug` |

**Phase 4 union schema design (provisional)**: model on Modern (agency/generalist) since it's the most evolved. Map:
- `medical.keyword` / `solicitors.keyword` → `topic`
- `dentists.secondary_keyword_1..10` → JSON-collapsed into `secondary_keywords`
- Missing pillar/tier/intent on medical+solicitors → set to defaults (`pillar_topic=NULL`, `content_tier='supporting'`, `user_intent='informational'`) and queue Phase 1.5 enrichment if desired

### Sites registry — gap analysis

```
Registered in sites table: ['agency', 'dentists', 'generalist', 'property']
Expected (active sites):   ['agency', 'dentists', 'generalist', 'property', 'medical', 'solicitors']
MISSING:                   ['medical', 'solicitors']
```

Both Medical and Solicitors need rows added to `sites` during Phase 1 closeout. Source data:

```
medical:    site_key=medical, display_name='Medical Accountants', domain='www.medicalaccounts.co.uk',
            gsc_property_url='sc-domain:medicalaccountantsuk.co.uk' (mismatched, see config drift note),
            niche='medical', content_dir='Medical/web/content/blog', git_repo_path='Medical/web',
            blog_topics_table='blog_topics_medical', active=True
solicitors: site_key=solicitors, display_name='Accounts For Lawyers', domain='www.accountsforlawyers.co.uk',
            gsc_property_url='sc-domain:accountsforlawyers.co.uk',
            niche='solicitors', content_dir='Solicitors/web/content/blog', git_repo_path='Solicitors/web',
            blog_topics_table='blog_topics_solicitors', active=True
```

### Missing tables (planned, not yet created)

- `engine_flags` — runtime feature-flag table; created in Phase 5

### Lead-flow finding

Only 3 sites have ever produced a lead: Dentists, Medical, Property. **Solicitors, Agency, Generalist have produced zero leads** as of this audit despite Agency having 306 posts and Generalist 366 posts. Possible causes:
- Form code wired but not actually working on those sites
- Form working but not yet finding visitors (Agency and Generalist have most content but perhaps not most search demand)
- Different conversion paths on those sites (newsletter signup instead of form on Generalist + Agency?)

Worth flagging as a Phase 1 sub-investigation: confirm the LeadForm submit path is functional on Solicitors, Agency, Generalist (can be a curl-based test against the Supabase REST endpoint).

---

## RLS Policies — Phase 1 Findings (2026-05-20)

**Policies committed in migration history** (read via `supabase/migrations/*.sql`):

### From `003_add_rls_policies.sql` (2026-03-29)

Security model:
- `anon` role (public website visitors): **INSERT-only on `leads`**, **SELECT-only on `blog_topics` + `blog_topics_property`**, **explicit DENY on `agent_executions`, `agent_costs`, `published_content`, `niche_metrics`, `seo_rankings`**
- `authenticated` role: reserved for future admin features (read all)
- `service_role`: bypasses RLS (Python agents + GitHub Actions)

### From `20260331000002_fix_leads_rls_policies.sql` (2026-03-31)

Tightened leads policies:
- `anon_can_only_insert_leads`: anon may INSERT
- `anon_cannot_select_leads`: anon may NOT SELECT (privacy)
- `anon_cannot_update_leads`, `anon_cannot_delete_leads`: anon may NOT UPDATE/DELETE
- `authenticated_can_{read,update,delete}_leads`: future admin paths

### Tables with committed RLS policies
- `leads` ✓ (most restrictive — anon insert only)
- `blog_topics` ✓ (anon read)
- `blog_topics_property` ✓ (anon read)
- `agent_executions`, `agent_costs`, `published_content`, `niche_metrics`, `seo_rankings` ✓ (deny anon)

### Tables with NO committed RLS policy (gap)

The following tables were created by later migrations and **may or may not** have RLS policies — committed migrations don't show them. To be verified via dashboard or pg_policies query:

- `blog_topics_dentists`, `blog_topics_medical`, `blog_topics_solicitors`, `blog_topics_agency`, `blog_topics_generalist`
- `sites`
- `gsc_query_data`, `bing_query_data`, `dataforseo_keyword_data`, `dataforseo_competitor_data`
- `api_cost_log`
- `optimisation_changes`, `optimisation_opportunities`
- `apply_attempts`, `meta_performance`
- `gsc_page_performance`, `blog_optimizations`, `gsc_indexing_issues`

**Phase 1 sub-task** (post-staging-link): create a SECURITY DEFINER RPC that returns `pg_policies` rows, or use Supabase dashboard, to enumerate live RLS on every table and verify nothing is missing for the newer tables. This is the gate before Phase 4 table consolidation.

### Verification gate before Phase 4

Before any table consolidation, the negative test must pass on staging: "Given a row written with `source='dentists'` (or `site_key='dentists'`), can a query made under `source='property'` context read it?" — must be **No** for `leads`, `blog_topics_*`, `optimisation_*`, etc.

If RLS is found missing on any cross-site-isolation table, Phase 4 must include adding those policies before consolidating.

---

## Pipeline Scripts — Phase 1 Findings (2026-05-20)

Audit of `{site}/pipeline/*.py` across all 6 sites:

### Universal (in all 6 — top centralisation candidates for Phase 3)

- `config_supabase.py` — per-site configuration constants. Already partly replaced by `optimisation_engine/blog_generator/site_configs/{site}.py`. The remaining per-site copies are legacy from before blog-generator consolidation.
- `generate_blog_supabase.py` — per memory `blog_generator_consolidation`, these are now thin shims delegating to `optimisation_engine/blog_generator/`. Confirmed in 5 of 6 niche sites + Digital Agency. Solicitors has both this and `generate_blog_deepseek.py` (legacy variant).
- `submit_indexnow.py` — confirmed in Dentists, Property, generalist, Digital Agency. Should be in all 6 (Medical + Solicitors are gaps to verify). Phase 3 destination: `optimisation_engine/indexing/submit_indexnow.py` taking `--site` arg.

### Common in 3+ sites (Phase 3 candidates with adaptation)

- `ideate_topics.py`, `mine_keywords.py`, `serper_*.py`, `seed_*.py` — keyword research helpers; some already in `optimisation_engine/ingestion/`. Phase 3 should consolidate the remaining per-site copies.
- `fetch_image.py`, `backfill_images.py` — Pexels image fetchers. Phase 3 destination: `optimisation_engine/images/`.
- `strip_em_dashes.py` — content cleanup utility. Phase 3 destination: `optimisation_engine/cleanup/`.
- `title_optimise.py`, `apply_title_rewrites.py`, `rewrite_meta_for_ctr.py`, `measure_optimization_impact.py` — optimisation helpers; some logic overlaps with the `optimisation_engine/apply/` walker. Phase 3 to reconcile.

### Legacy "numbered" pipeline scripts (in Dentists + Property only)

`01_sheets_find_row.py` → `09_md_exporter.py` plus `06_sanity_publisher.py`, `06_webflow_uploader.py`. These are from the **pre-Next.js era** when content flowed through Google Sheets → Sanity/Webflow. **Recommend archiving in Phase 3** (move to `archive/legacy_sheets_pipeline/` or delete after verifying nothing references them). Total: ~13 scripts × 2 sites = 26 files.

### Site-unique scripts (NOT centralised — legitimate per-site work)

- **generalist/pipeline/**: 30+ scripts unique to generalist (bulk_generate, glossary/guides generators, town_pages, GSC cross-niche analysis, SE Ranking integration, fix_cannibalisation, fix_tax_rates, etc.). These represent the most evolved per-site engineering. Phase 3 should identify which deserve promotion to `optimisation_engine/` for reuse on other sites.
- **Digital Agency/pipeline/**: dubai_*, founder_stories, seed_rd_vertical — domain-specific content generation. Keep per-site.
- **Solicitors/pipeline/**: build_phase2_worksheet, keyword_intelligence — Solicitors-specific keyword work.

### Gaps

- **Medical/pipeline/** is minimal: only `config_supabase.py` + `generate_blog_supabase.py`. No `submit_indexnow.py` script exists for Medical. May explain why Medical's indexing coverage is weak. Phase 3 must ensure all sites have indexing capability (centralised script reads from `sites` table).

Phase 3 destination structure (planned):

```
optimisation_engine/
├── indexing/
│   └── submit_indexnow.py       # --site X / --all
├── images/
│   ├── fetch_image.py
│   └── backfill_images.py
├── cleanup/
│   └── strip_em_dashes.py
├── ingestion/                    # already exists
│   └── (keyword research)
└── ops/                          # Phase 6
    └── (deploy, health, migrate, backup, pause-site)
```

---

## Shared Web Components — Phase 1 Findings (2026-05-20)

**Surprise finding**: `shared/web-core/` already exists at the repo root with 15 files, but **no package.json and zero sites currently import from it**. The directory is orphaned scaffolding from earlier work that wasn't completed.

```
shared/web-core/
├── components/
│   ├── blog/BlogPostRenderer.tsx
│   ├── forms/LeadForm.tsx
│   ├── layout/PageShell.tsx
│   ├── layout/SiteFooter.tsx
│   ├── layout/SiteHeader.tsx
│   └── ui/{Breadcrumb,CTASection,StickyCTA,layout-utils}.tsx
├── lib/{blog,local-business-schema,organization-schema,schema,supabase-client}.ts
└── types/niche-config.ts
```

Per-site copies have likely diverged from `shared/web-core/` since extraction. Five out of six niche sites have their own `LeadForm.tsx` + `supabase-client.ts` + `SiteHeader.tsx` + `SiteFooter.tsx`:

| Component | Dentists | Property | Medical | Solicitors | Generalist | Digital Agency |
|---|---|---|---|---|---|---|
| LeadForm.tsx | ✓ | ✓ | ✓ | ✓ | ✓ | (separate repo) |
| supabase-client.ts | ✓ | ✓ | ✓ | ✓ | ✓ | (separate repo) |
| SiteHeader.tsx | ✓ | ✓ | ✓ | ✓ | ✓ | (separate repo) |
| SiteFooter.tsx | ✓ | ✓ | ✓ | ✓ | ✓ | (separate repo) |
| schema.ts / schema/ dir | ✓ | ? | ? | ? | ✓ (rich, 10+ files) | (separate repo) |

**Phase 2 implication**: The work is now "reconcile orphan + divergent per-site copies" rather than "build from scratch."

Recommended Phase 2 approach:
1. **Diff** each `shared/web-core/` file against the corresponding per-site files to identify divergence
2. **Choose canonical version** — usually the most recent per-site (Generalist or Digital Agency) which has had more development attention
3. **Move canonical version** into `packages/web-shared/` (pnpm workspace) with prop-based per-site customisation
4. **Delete** `shared/web-core/` (the orphan)
5. **Migrate** one site at a time, with smoke test between each
6. **Delete** per-site copies after migration verified

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

## Open Manual Gates for Phase 0/1 Completion

These items require owner action:

- [x] ~~Create staging Supabase project~~ ✅ Done 2026-05-20 (`fyabqbuklfrjqjxaofcx`)
- [x] ~~Reconcile Medical site domain drift~~ ✅ Done 2026-05-20 — `Medical/niche.config.json`, `Medical/pipeline/config_supabase.py`, `agents/config/gsc_config.py` all updated to `medicalaccounts.co.uk`
- [x] ~~Populate sites table for medical + solicitors~~ ✅ Done 2026-05-20 — all 6 rows now in registry
- [ ] **Apply RLS audit RPC migration** (`supabase/migrations/20260520000003_add_rls_audit_rpc.sql`) to prod Supabase via dashboard SQL editor or `npx supabase db push --linked`. Then run `python scripts/phase1_rls_audit.py` to enumerate RLS gaps.
- [ ] **Re-verify Medical GSC property** on new domain (`sc-domain:medicalaccounts.co.uk`) — old verification was tied to `medicalaccountantsuk.co.uk`. Without this, GSC data won't flow for Medical.
- [ ] **Decide on Medical blog content** — 48 .md files reference the old `medicalaccountantsuk.co.uk` domain. Options: (a) batch find-replace, (b) re-generate via engine, (c) leave as-is and let new content use correct domain. Recommend (a) for SEO hygiene.
- [ ] Optional: commit Digital Agency repo's untracked AIA blog posts + IndexNow key (separate repo)
- [ ] Optional: investigate Solicitors zero-lead status (Agency + Generalist are <3 days old so expected; Solicitors is older and worth a sub-investigation)
- [ ] Optional: verify Vercel framework preset on Digital Agency project (`"framework": null` is in project.json; routes other than homepage may 404)

## Phase 1 Closeout Status (2026-05-20)

| Item | Status |
|---|---|
| sites table populated for all 6 sites | ✅ Done |
| Medical config drift fixed | ✅ Done |
| Supabase table inventory + row counts | ✅ Done |
| blog_topics_* schema divergence documented | ✅ Done |
| Lead-flow distribution audited | ✅ Done (3 of 6 sites have ever produced leads) |
| RLS migration coverage audited | ✅ Done (gap identified: 15+ newer tables) |
| Live RLS state enumerated | ⏳ Pending RPC application |
| shared/web-core/ orphan identified | ✅ Done |
| Per-site pipeline script duplication catalogued | ✅ Done |
| Component duplication catalogued | ✅ Done (LeadForm, supabase-client, SiteHeader/Footer in 5 of 6) |
