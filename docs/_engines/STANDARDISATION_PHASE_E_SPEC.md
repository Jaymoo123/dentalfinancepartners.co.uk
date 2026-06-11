# Standardisation — Phase E: dashboard reconciliation (unified estate console)

**Status:** EXECUTING — opened 2026-06-11 on user go ("spec the dashboard reconciliation and put sonnet to work"). User intent: "move every single dashboard — or at least the data — into a single consolidated site so I don't have to [visit] 6 separate site pages."

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

## Sequencing note
After this phase: Property adoption window (its local console can then be DELETED rather than upgraded — one of the reasons this phase goes first), then estate-wide experiments. Newsletter remains PARKED per user (2026-06-11): revisit when signups/traffic warrant; Resend webhook re-point + generalist NURTURE_* env stay open-but-parked.
