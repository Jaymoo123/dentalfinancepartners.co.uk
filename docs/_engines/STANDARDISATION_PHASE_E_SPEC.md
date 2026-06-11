# Standardisation — Phase E: dashboard reconciliation (unified estate console)

**Status:** CLOSED 2026-06-11. Merged (PR #14, post-merge main CI green run 27364472392 — 10 jobs incl. the new Build console). DEPLOYED: Vercel project `estate-console` (prj_6GGcP8azGfURciTo2YKr9XD3ft2U, rootDirectory console/web, Property-pattern workspace install), production at https://estate-console.vercel.app. Live verification: no-cred 307 → /login · X-Robots-Tag noindex · login → HttpOnly+SameSite=Strict+Secure cookie · authenticated estate overview serving LIVE data (943 sessions 7d, all 6 sites). One CI defect fixed forward: console eslint flat-config lacked the W4a global-ignores block (generated next-env.d.ts got linted). ADMIN_DASHBOARD_KEY (console-specific) given to user. Per-site console retirement deferred (user decision later).

**Status history:** EXECUTING — opened 2026-06-11 on user go ("spec the dashboard reconciliation and put sonnet to work"). User intent: "move every single dashboard — or at least the data — into a single consolidated site so I don't have to [visit] 6 separate site pages."

## Execution log

### Stage 1 -- 2026-06-11 (Sonnet, branch phase-e-unified-console, commit de2c24a0)
- `packages/web-shared/console/estateData.ts`: 9 exported async functions:
  `getSitesRegistry`, `getActiveSites`, `getEstateOverview(days=7)`,
  `getEstateFunnel(days=28)`, `getEstateChannels`, `getEstateErrors`,
  `getEstateVitals`, `getEstateLatestLeads(limit=50)`, `getEstateTopTools`.
  Reads: `sites`, `vw_web_funnel_daily_v2`, `leads`, `vw_channel_conversion_geo`,
  `vw_client_errors`, `vw_web_vitals_summary` (graceful [] if absent),
  `vw_calculator_conversion_geo`. No SQL/migrations. Additive only.
- `console/estateData.test.ts`: 25 tests (type shapes, no-cred graceful returns,
  pure aggregation logic, registry-driven fixture row proof).
- `console/index.ts`: barrel addition for estateData.
- `package.json` exports: `./console/estateData` added.
- Suite: 254 passing (was 229, +25).

### Stage 2 -- 2026-06-11 (Sonnet, branch phase-e-unified-console)
- `console/web` app created as a workspace member.
- Routes: `/` (estate overview), `/login`, `/api/login`, `/site/[siteKey]`,
  `/site/[siteKey]/trends`, `/site/[siteKey]/leads`,
  `/site/[siteKey]/visitor/[visitorId]`.
- `src/config/capabilities.ts`: per-site capability map (property=full,
  digital-agency=nurture, all others=defaults).
- `src/lib/checkAuth.ts`: reuses `consoleAuth` exactly (no new auth design).
- `src/components/SiteSwitcher.tsx`: registry-driven client component.
- `next.config.ts`: `X-Robots-Tag: noindex` header on `/(.*)`; `transpilePackages`.
- `vitest.config.ts` + `"test"` script from day one (Phase D lesson).
- `src/tests/console.test.ts`: 15 tests (capabilities, registry-driven fixture,
  auth reuse, OB-01 design, cookie path override).
- `package.json` (root): `console/web` added to workspaces.
- `.github/workflows/ci-build-test.yml`: console matrix entry added.

### Acceptance outcomes (2026-06-11)
- OB-01: CONSOLE_NOINDEX_META on every route + X-Robots-Tag header in next.config.ts.
  No NEXT_PUBLIC_* in app source (server-only). auth gate on every route (redirect /login).
  Cookie built via shared consoleAuth with HttpOnly + SameSite=Strict; Path=/ override.
- OB-02: grep of console/web/src finds no vw_*/table references outside query layer
  (comment strings only). All data access via estateData.ts / adminData.ts.
- Switcher test: fixture row test in console.test.ts and estateData.test.ts.
- Suite: web-shared 254 passing; console/web 15 passing.
- tsc: all 6 sites + console/web clean (no errors).
- next build: console/web green (0 errors, 0 warnings post-fix).
- CI entry added (manager to verify on PR).
- vw_web_vitals_summary: no STOP needed -- rest() returns [] gracefully if view absent.
- Manager-owned: Vercel project creation, env vars, deploy, live OB-03 verification.

### Manager acceptance — 2026-06-11

**PHASE E BUILD — ACCEPTED (manager verification).**
- 254 + 15 tests reproduced via both runners · console `next build` reproduced green.
- **`vw_web_vitals_summary` gap closed properly:** the view did not exist live (graceful-[] fallback was correct executor behaviour); manager created it additively (migration `20260612000004`, applied + recorded) — per-event projection (web_vital, 28d, non-bot) matching the estateData contract; verified returning real rows (dentists/generalist metrics).
- **OB-01 verified at RUNTIME** (built server on :3460 against the PROD store): no-cred → 307 /login · `X-Robots-Tag: noindex, nofollow` on responses · login → HttpOnly+SameSite=Strict+Secure sha256-token cookie (Path=/).
- **Estate overview verified against LIVE data, one login:** all 6 sites in the comparison table (Property 900 sessions / 510 human / 5 leads / 0.6% vs the rest), estate totals (942 sessions, 5 leads, 0.5%), estate funnel (942 → 532 engaged, 56%), channels/errors/latest-leads panels rendering. Agency correctly shows "-" (its only recent session was the deleted AN-01 test row). OB-03's estate questions are answerable from the home page alone.
- `/site/property` renders the full per-site dashboard from Property's live data — Property covered with zero Property code touched.
- OB-02: only query-layer files touch the store; view names elsewhere are user-visible data-provenance captions (accepted pattern).
- Remaining (manager): Vercel project + env + deploy + post-deploy re-check.

## Design decisions (manager, 2026-06-11)

1. **A new internal app, not a mount on any site.** Workspace `console/web` (Next.js, App Router), deployed as its own Vercel project. It READS the shared store; it ships zero public pages, zero SEO surface, zero tracking of its own. **No live site's code is touched in this phase** — the per-site `/admin/analytics` consoles stay exactly as they are (retirement is a later cleanup decision, not this phase).
2. **Property is included via its DATA only.** Property writes to the same site-keyed store and views, so the unified console covers Property without violating READ-ONLY — its code, its local console, its `?k=` page are untouched. This is how Property gets a modern dashboard before its adoption window.
3. **One login.** A single `ADMIN_DASHBOARD_KEY` for the console app, with the existing shared cookie auth (`web-shared/console/consoleAuth`) — that's the entire point of the reconciliation. Per-site keys stay valid on the per-site consoles.
4. **Registry-driven site list.** The site switcher derives from the live `sites` table (site_key, display_name, domain, active) — no hardcoded site list anywhere (PF-07 spirit). A new site appears in the console by being registered, with zero console edits.
5. **Panel availability is config-per-site, explicit.** Systems a site doesn't operate (nurture, experiments, lead-intent, personalisation) render the established "not operated on this site" state. A small per-site capability map in the console app (data, not code branches) drives this.
6. **No DB changes expected.** Every consumed view is already site_key-parameterised (Phase B audit). Estate aggregates = the same views grouped by site_key. If any aggregate genuinely needs a new view, that is a STOP → manager designs it (additive CREATE only).

## Architecture

```
console/web                    new workspace app (bare Next; NOT a niche site — no niche.config,
                               no validateNicheConfig, no analytics SDK, no sitemap/robots surface
                               beyond a global noindex)
packages/web-shared/console/   gains an ADDITIVE estate module:
  estateData.ts                cross-site query layer (group-by-site_key over existing vw_*),
                               typed like adminData.ts; sites-registry reader for the switcher
  (existing per-site panels reused as-is, parameterised by siteKey)
```

**Routes (all behind the cookie gate):**
- `/` — estate overview: per-site comparison strip (sessions / humans / leads / conversion, last 7 + 28 days), estate funnel, channel comparison across sites, latest leads across all sites (site-tagged), error groups across sites, web-vitals summary per site.
- `/site/[siteKey]` — the full per-site dashboard (same panels as the per-site consoles: overview/visitors/behaviour/conversion tabs, trends, leads, visitor journey drill-down `/site/[siteKey]/visitor/[visitorId]`).
- `/login` + `/api/login` — shared auth pattern (timing-safe compare, HttpOnly + Secure + SameSite=Strict cookie, in-process rate limiting, noindex everywhere; `X-Robots-Tag: noindex` header app-wide).

## Brief (executor: Sonnet, branch `phase-e-unified-console`)

**Stage 1 — estate module into `web-shared/console/` (additive only):**
- `estateData.ts`: typed functions — `getSitesRegistry()` (from `sites` table), `getEstateOverview(days)` (sessions/humans/leads/conversion per site_key from `vw_web_funnel_daily_v2` + leads), `getEstateChannels(days)`, `getEstateErrors()`, `getEstateVitals()`, `getEstateLatestLeads(limit)` (cross-site, site-tagged), `getEstateTopTools()` (from vw_calculator_conversion grouped by site_key + slug).
- Tests at birth against fixture rows (the established console.test.ts pattern). NO changes to existing adminData/auth/panel exports beyond new additions to the barrel.

**Stage 2 — the app:**
- `console/web`: package.json (workspace member, `"test": "vitest run"`, vitest.config.ts from day one — the Phase D lesson), tsconfig, next.config (noindex headers app-wide; no public assets), the routes above composing the EXISTING shared panels + new estate panels (SnapshotCard/Sparkline/TrendChart/VisitorsTable reused).
- Per-site capability map (`config/capabilities.ts`): which sites operate experiments/nurture/lead-intent/personalisation — currently: property = {experiments: true, nurture: true, leadIntent: true, personalization: true}, all others false (agency nurture = true). Not-operated panels render the explicit state.
- Site switcher in the chrome on every page, derived from `getSitesRegistry()`; active-site highlight; estate overview is home.
- Env contract: `.env.local.example` with `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_DASHBOARD_KEY` (note: server-only app — no NEXT_PUBLIC_* needed).
- CI: add `console/web` to the build matrix in `.github/workflows/ci-build-test.yml` (same pattern as the 6 sites) — the test step picks up via `--if-present`.

**Hard rules:** NO edits to any site directory (`Property/`, `Dentists/`, `Medical/`, `Solicitors/`, `generalist/`, `digital-agency/`, `contractors-ir35/`) — zero exceptions; this phase's risk profile depends on it. NO SQL/migrations (any view gap is a STOP → report). NO new auth design — reuse `consoleAuth` exactly. Additive-only in web-shared. `next build` is the gate, not tsc (RSC lesson — server components passing functions to client components will bite here too; panels are mostly server-rendered, keep client components leaf-level).

**Acceptance (Verify lines):**
- **OB-01 (unified):** no-credential request to any console route → redirected/unauthorized; credential travels only in the HttpOnly cookie; every response carries noindex (meta AND X-Robots-Tag).
- **OB-02:** grep app + estate module for direct table names outside the query layer — only `estateData.ts`/`adminData.ts` touch the store.
- **OB-03 (estate):** "from ONE login, answer: yesterday's sessions for every site, the biggest funnel drop-off on any chosen site, the best-converting channel estate-wide, and the top tool by lead rate estate-wide." (run against live data at manager verification)
- **Switcher test:** a fixture sites-registry row appears in the switcher with no code edits (registry-driven proof).
- Suite green (existing + estate tests) · all 6 sites + console tsc clean · `console/web` `next build` green · CI green on PR + post-merge main.

**Manager-owned (not in the brief):** Vercel project creation + env + deploy + live OB-03 verification + the per-site-console retirement decision (deferred, user's call later).

### Experiments parity restoration -- 2026-06-11 (Sonnet, branch console-experiments-parity)

Gap: the unified console experiments tab showed only a flat results table. Property's deleted admin console had a rich card view: BuildingBlockCard (exposure-scoped funnel, acted/exposed) for the 5 CRO tests + ConversionCard (conversion-only) for personalisation, significance badge, "awaiting exposure" empty state.

**Work done:**

1. `packages/web-shared/console/adminData.ts` (additive):
   - New types: `ExperimentArm`, `ExperimentArms`, `ExperimentFunnelArm`, `ExperimentFunnelArms`, `ExperimentFunnelRow` (exported).
   - New pure parsing functions: `parseExperimentArms(rows)`, `parseExperimentFunnel(rows)` (exported for testing, logic identical to recovered Property implementation).
   - New async functions: `getExperimentArms(siteKey)`, `getExperimentFunnel(siteKey)` (site-agnostic, read vw_experiment_results + vw_experiment_funnel, no SQL).
   - Nothing existing modified.

2. `packages/web-shared/console/components/experimentMetaTypes.ts` (new):
   - `ExperimentPrimary` + `ExperimentMeta` types -- shared so `ExperimentCards.tsx` can import them without creating a dependency on any site-local registry.

3. `packages/web-shared/console/components/ExperimentCards.tsx` (new, "use client"):
   - `ExperimentCard` dispatcher (routes on `meta.primary` presence), `BuildingBlockCard`, `ConversionCard`.
   - Site-agnostic: depends only on shared types + adminData types, no Property imports.
   - Placed in web-shared (not console-app-local) because the card rendering logic is data-model-agnostic and could be reused if experiments spread to other sites.

4. `console/web/src/config/experimentMeta.ts` (new):
   - Data-only copy of Property's `EXPERIMENT_META` + `getExperimentMeta(key)` (fallback for unknown ids).
   - Header comment names `Property/web/src/lib/experiments/registry.ts` as source of truth; accepted documented duplication.
   - Unknown ids: `getExperimentMeta` returns a title-cased label + generic control/treatment so no data is ever hidden.

5. `console/web/src/app/site/[siteKey]/page.tsx`:
   - Imports `getExperimentArms`, `getExperimentFunnel`, `ExperimentArms`, `ExperimentFunnelArms`, `ExperimentCard`, `getExperimentMeta`.
   - Capability-conditional fetch of arms + funnel (only when `caps.experiments`).
   - Experiment keys derived from union of arms + funnel maps (catches unknown ids from new experiments not yet in meta config).
   - experimentsSection replaced: `Live A/B tests` heading + `ExperimentCard` per key + secondary raw ledger table below.

6. `packages/web-shared/package.json`: exports added for `ExperimentCards` + `experimentMetaTypes`.

**Tests added:**
- web-shared `console.test.ts`: +20 tests (10 `parseExperimentArms` + 10 `parseExperimentFunnel`): control/treatment slot placement, conversion_rate preservation, partial arm (null treatment), malformed exp row (no colon), empty input, unknown-id graceful-no-throw (the meta-fallback test).
- console/web `console.test.ts`: +9 tests (`getExperimentMeta`): known id label/desc, primary present for building-block tests, primary absent for personalisation, guardrail present for lead_form_length, unknown-id fallback (no throw, generic labels, title-case), all EXPERIMENT_META entries have required fields.

**Results:** web-shared 267 tests passing (+20 from 247); console/web 22 tests passing (+9 from 13). console/web `next build` green. tsc Property/web + console/web clean.

## Sequencing note
After this phase: Property adoption window (its local console can then be DELETED rather than upgraded — one of the reasons this phase goes first), then estate-wide experiments. Newsletter remains PARKED per user (2026-06-11): revisit when signups/traffic warrant; Resend webhook re-point + generalist NURTURE_* env stay open-but-parked.
