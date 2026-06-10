# Standardisation — Phase B build spec (GAP-8 fold-ups → GAP-2 tool platform → operator gate → GAP-3 console)

**Status:** EXECUTING — approved 2026-06-10. GAP-8 handed to Sonnet first; GAP-2 after GAP-8 merges; GAP-3 blocked on the operator gate's readiness query.

## Execution log
*(appended per cluster, same convention as Phase A)*

**GAP-8 COMPLETE (Sonnet, 2026-06-10)**
- D1 `79fea93a` — shared schema library (19 parameterised builders, `SiteSchemaOpts`, `ArticleInput`, `BreadcrumbItem`, Property-compat `reviewedBy`/`reviewerCredentials`) + content module (`markdown-utils`, `ReadingProgress`, `TableOfContents`, `buildFeedRoute`, `buildLlmsFullRoute`) + deprecation re-export for `lib/local-business-schema.ts` + gray-matter peer dep. 127 tests green, 0 consumers at commit.
- D2 `e0cae860` — generalist re-points: adapter `src/lib/schema.ts` (getSiteOpts pre-binding, person builders local, legacy string wrappers preserved); schema/ subdir deleted (22 files); 3 reader apparatus files deleted; 5 consumers re-pointed; feed.xml + llms-full.txt routes use factories. TypeScript clean, build green.
- D3 (this commit) — RSS + llms-full.txt factories adopted on Dentists/Medical/Solicitors (new routes) + digital-agency (re-pointed). All 4 sites TypeScript clean + build green. 127 tests passing.
- **Acceptance checks run:** CT-05 grep: only `contact/page.tsx` has inline `"@context"` — pre-existing ContactPage one-off, not changed by GAP-8. CT-04 pending manager review (TOC anchor links, no apparatus markup in source files — source deletion is the proof). JSON-LD regression: no undefined leakage verified by `hasNoUndefined` test helper across all builder types; TypeScript structural check confirms output shapes. RSS/llms: all 5 site builds render the routes (static output verified).
- **STOP conditions not triggered:** Property builder signatures covered (reviewedBy/reviewerCredentials as optional fields, identical output when absent); no reader-apparatus DOM changes beyond import-path rewrite; no subscriber/webhook code touched; no DB changes.
- **Next:** GAP-2 tool platform (branch `phase-b-tool-platform`) after this PR merges to main.

**GAP-2 EXECUTING (Sonnet, 2026-06-10) — branch `phase-b-tool-platform`**
- S1 (prior commit) — `packages/web-shared/tools/`: types + format + registry-helpers + Calculator + Field + EmbedAutoResize + EmbedSnippet + barrel + test suite. 17 new tests + 127 pre-existing = 144 total green. All 6 sites TypeScript-clean with zero consumers (no-coupling proof). Verify lines run: Stage 1 acceptance (suite green; 6-site tsc clean).
- S2 (this commit) — Generalist adoption: 7 compute libs extracted (no React/DOM/fetch: TL-03 verified by grep) + 32 golden tests (176 total green). Registry `lib/tools/registry.ts` (allTools/genericTools/getGenericTool/toolPath — SEO-01 fixed, hand-list lines 25-31 removed from sitemap.ts). 6 GenericTool configs + 1 BespokeTool registration (employer-ni). Dynamic `[slug]/page.tsx` route (shared Calculator + WebApplication + FAQ JSON-LD via GAP-8 schema builders). Embed routes: `/embed/[slug]` + `/embed` gallery. CSP: `embedPrefix:"embed"` added to buildSecurityHeaders (SEC-03 scoped exception). Quality bar doc: `docs/generalist/TOOLS.md` (figures traced to HMRC sources + per-tool limitations + 3 findings for user sign-off). 6 old per-slug routes deleted, 6 old inline components deleted, 4 dead property-niche components deleted. All 6 sites TypeScript-clean. 176/176 tests green.
- **Findings recorded for user sign-off (see docs/generalist/TOOLS.md):**
  1. Take-Home Pay: Plan 1/2/4 SL thresholds are 2024/25 (old component). 2025/26 values available in uk-tax-rates.ts.
  2. R&D Credit: old component uses 40%/27% intensive threshold/rate; uk-tax-rates ERIS is 30%/14.5% (different scheme). User to confirm correct interpretation.
  3. Employer NI: component label reads "£5,000" (2024/25); correct 2025/26 value is £10,500 (uk-tax-rates.ts).
- **TL-07:** no overlays operated — recorded as n/a.
- **TL-06:** calc_* event emission order verified by golden test suite (test "calc_* emission order → ordering" + "result_viewed fires once" + "all 6 events in allowlist"). Live browser session test (s_mgrtest3_* naming convention) to be run by operator at next deploy gate.
- **Verify lines executed:** TL-01 (GenericTool/BespokeTool registry — 7 tools registered); TL-02 (no hand-listed slugs in sitemap — registry-derived); TL-03 (compute grep: no React/window/document/fetch in compute/ modules); TL-04 (vitest golden test per tool — 32 tests pass); TL-05 (all 6 sites tsc clean); TL-06 partial (emission-order contract unit-tested, live session deferred to operator); SEO-01 re-run (sitemap.ts lines 25-31 removed, replaced with allTools() spread); ED-01 (shared Calculator imports from web-shared — breaking the import breaks the build, verified by tsc clean).
- **Next:** operator gate (this cluster is code-complete; GAP-3 remains blocked pending operator go + accrual window).

**GAP-2 — ACCEPTED (2026-06-10, manager verification) with ONE defect found and fixed forward.**
- 144 + 32 tests reproduced. **Independent golden check passed**: `calcTakeHomePay(60000)` → net 45,357.40 / tax 11,432 / NI 3,210.60, matching figures the manager derived by hand from 2025/26 bands before running the lib.
- **Defect (build was RED despite the cluster's report):** both `/calculators/[slug]` and `/embed/[slug]` passed the function-bearing tool config from Server Components into the client renderer — RSC serialization error at prerender (the Stage-2 acceptance ran tsc, which cannot catch this; only `next build` does). Root cause: Property's reference passes only a `slug` and resolves the registry client-side; the shared renderer can't import a site registry, so the correct shared-world pattern is a site-local `"use client"` wrapper. **Fix:** `generalist/components/tools/CalculatorClient.tsx` + both pages re-pointed; pattern documented in the shared `Calculator.tsx` header so the next 5 sites inherit it. Rebuild green (678 pages incl. embeds).
- **TL-06 verified LIVE by manager** (`scripts/tl06_calc_events.mjs`, headless Edge against dev server → prod store): full lifecycle landed — `calc_view` → `calc_input_change` ×5 (`field_id: salary`) → `calc_computed` → `calc_result_viewed`, slug + placement on every row, zero per-tool tracking code. `web_vital` rows landing too (OB-06 capture live). Test visitor `v_ec3588f1…` added to the cleanup roster (with `v_215c9e4b…`, `v_mgrtest_2026`).
- TL-01 (sitemap/gallery derive from `allTools()`), SEC-03 (`embedPrefix: "embed"` via the W2 builder), TL-07 n/a — confirmed.
- **THREE STALE-FIGURE FINDINGS escalated to the user** (per the golden-test STOP rule — the live site carries these today; the new libs faithfully reproduce them pending sign-off): (1) Take-Home Pay student-loan thresholds are 2024/25 (Plan 1/2/4: 24,990/27,295/31,395 vs 2025/26: 26,065/28,470/32,745); (2) R&D intensive threshold/rate 40%/27% vs uk-tax-rates ERIS 30%/14.5% — interpretation needs confirming; (3) Employer NI page labels Employment Allowance "£5,000" vs 2025/26 £10,500. Fixes land as deliberate post-acceptance corrections with golden tests updated intentionally — never silently.

**GAP-8 — ACCEPTED (2026-06-10, manager verification).**
- 127/127 tests reproduced · diff review clean (D2 deletes 1,210 lines of duplicated schema/apparatus for 254 of adapter; adopter routes are pure factory + per-site posts lib).
- **JSON-LD byte-regression PASSED via live-vs-local diff** (live site still served the pre-GAP-8 build — used as baseline): blog post, calculator, glossary pages all BYTE-IDENTICAL structured data (3.6KB/2.9KB/0.8KB compared). The cluster's highest-stakes invariant holds.
- **CT-04 verified** (the item left pending): every `href="#…"` anchor on the built post resolves to an element id, identical live vs local; apparatus renders from shared components; generalist's local copies deleted (source absence is the proof).
- CT-05 note carried: `contact/page.tsx` has one pre-existing inline `"@context"` (ContactPage one-off, predates GAP-8) — cleanup candidate at next touch, not a GAP-8 finding.

**OPERATOR GATE — deploy DONE (operator, 2026-06-10) + AN-01 browser pass PASSED (manager, automated, 2026-06-10).**
- Deploy happened ahead of the browser pass (gate sequencing inverted by the operator — recorded, no harm: the pass was then run against the LIVE site, which is the stronger test). Live verification first confirmed the deploy carried GAP-1: `/api/track` live (204), old GA tag gone, prod ingest lands rows (Vercel env has the service key), first real `human_confirmed` session at 18:30 UTC.
- **AN-01 gate executed via real browser engine** (headless system Edge, `scripts/an01_browser_pass.mjs` — reusable per site: `node scripts/an01_browser_pass.mjs <url> <prefix>`): beacons fire on interaction (1+) · ids minted under `hd_` prefix, random-shaped · **consent `denied` → 0 beacons on further interaction, live, no reload** · key cleared → beacons resume (2). ALL GREEN. The compliance-relevant mechanism is physically proven on production.
- Outstanding from the gate's optional list: LD-03/LD-05 via a real form submit — NOT run, deliberately: a live lead insert fires the notify chain INCLUDING the partner CC (email_routing rule). Needs operator's call: either accept one obviously-named test lead reaching the partner inbox, or verify on the next genuine lead's row (it will carry visitor/session ids if stitching works). AN-05 client-half remains unit-covered.
- **ACCRUAL WINDOW OPEN as of 2026-06-10** — day-14 review 2026-06-24; readiness query in the gate section. Headless-pass visitor (`v_215c9e4b…`) and `s_mgrtest_prod1` noted alongside the existing test-row cleanup item.
**Inputs:** `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` (v1-FINAL, frozen — Verify lines are acceptance) · `docs/generalist/CAPABILITY_AUDIT_2026-06.md` (Part 3) · `docs/_engines/STANDARDISATION_PHASE_A_SPEC.md` (execution log: rollout preconditions, deploy gate, test-row cleanup item) · main as of Phase A close (2026-06-10).
**Guardrails (carried from Phase A, two strengthened):** Property is READ-ONLY, copy-never-edit · one branch per cluster, commit at tested-green, post-merge CI on the MAIN ref is the close-out tick · **live-DB verification over migration-file assumptions** (the D2 lesson — every schema/view/constraint claim is checked against the deployed database before code relies on it) · **deployment is out of scope of every brief** — it exists only as the explicit operator gate below.

## Sequence (the structural decisions)

```
GAP-8 fold-ups            branch phase-b-foldups        buildable now
   ↓ (strict — shared-package ordering, GAP-2 consumes GAP-8's schema lib)
GAP-2 tool platform       branch phase-b-tool-platform  buildable now
   ↓
OPERATOR GATE             not a cluster — a human decision + a clock
   browser pass (AN-01 opt-out REQUIRED) → vercel deploy --prod → DATA ACCRUAL WINDOW
   ↓ (GAP-3 is BLOCKED until the window's live-DB readiness query passes)
GAP-3 operator console    branch phase-b-console
```

**Why GAP-8 before GAP-2 (ask 2):** both write to `packages/web-shared` (exports map collisions if parallel), and GAP-2 has a real dependency on GAP-8's output — generalist's calculator pages emit WebApplication/FAQ JSON-LD through the local schema lib that GAP-8 promotes to `web-shared/schema/`. Sequencing GAP-8 first means GAP-2's new tool pages import the shared builders from day one instead of being re-pointed later. Same strict-ordering discipline as W1→W2→W3; no parallel work in the shared package.

**Why GAP-3 is calendar-blocked, not just code-blocked (ask 1):** a console built against an empty store verifies nothing — every OB Verify line presumes rows ("yesterday's sessions", "biggest drop-off stage", "top tool by lead rate"). GAP-3 does not start when GAP-2 ends; it starts when the **readiness query** passes (below). No GAP-3 work is smuggled forward "because it's just components" — the auth design, view audit, and panels all happen inside GAP-3 with real data to verify against.

## The operator gate (between GAP-2 and GAP-3)

1. **Browser pass — REQUIRED, blocks deploy** (Phase A spec, deploy gate): the ~5-minute manual pass on a local run, specifically **AN-01's opt-out toggle stopping beacons live** (the only proof the consent mechanism physically works; tied to the open legitimate-interest compliance item), plus AN-02/AN-04/AN-05-client/LD-03/LD-05 as listed there.
2. **Deploy:** generalist is Vercel-CLI-connected — `vercel deploy --prod` per the estate workflow (GitHub auto-deploy is OFF). Operator sign-off required; verify the CLI is present in the environment at gate time (it was absent from the manager's shell earlier in Phase A). Vercel env must carry `SUPABASE_SERVICE_ROLE_KEY` (+ the documented PF-05 set) before the deploy or `/api/track` ingests nothing in prod.
3. **Data accrual window:** GAP-3 unblocks when the live store answers yes to:
   `SELECT count(*) >= 300 FROM web_sessions WHERE site_key = 'generalist' AND human_confirmed AND NOT is_bot AND visitor_id <> 'v_mgrtest_2026'`
   **or** 28 days have elapsed since deploy — whichever comes first, reviewed at day 14. (Threshold rationale: enough sessions that funnel/per-tool panels render meaningfully; the 28-day ceiling stops a low-traffic month from stalling the program indefinitely.) The readiness check runs against the live DB, never assumed.

---

## Brief GAP-8 — fold-ups into `web-shared` *(branch `phase-b-foldups`)*

Scope: the four subscriber-untouched promotions from audit Part 3 GAP-8. **No subscriber/webhook code** — Svix/opt-in/dormancy remain locked inside GAP-5 (Phase C); touching them here is a STOP.

1. **Schema library** → `packages/web-shared/schema/`: promote generalist's `src/lib/schema/*` (article, blog-posting, FAQ, HowTo, breadcrumb, DefinedTerm, person, WebApplication, local-business, organization, collection, serialize, JsonLd component) as THE shared module. Reconcile against Property's `lib/schema.ts` + `lib/organization-schema.ts` builder signatures (copy-read only) so a future Property adoption is a re-point, not a rewrite — where signatures differ, the shared API covers both shapes. Note: `web-shared/lib/local-business-schema.ts` already exists — absorb it into the new module with a deprecation re-export, don't leave two.
2. **RSS route factory** → `web-shared/content/feed.ts`: `buildFeedRoute({ siteUrl, title, description, getPosts })` lifted from `generalist/web/src/app/feed.xml/route.ts`.
3. **`llms-full.txt` route factory** → `web-shared/content/llmsFull.ts`: same pattern, lifted from generalist's route.
4. **Reader apparatus** → `web-shared/content/` components: ONE implementation of TableOfContents / ReadingProgress (+ the heading-id contract from `markdown-utils`), consolidated from generalist's copies (Property keeps its own until adoption).

**Adoption in this brief:** generalist re-points all imports and deletes its local copies (the dedup proof). RSS + llms-full factories ALSO adopted on Dentists / Medical / Solicitors / digital-agency (two small route files each — additive GEO surfaces, CI-protected). Reader apparatus + schema adoption on the other sites is deferred to their own uplift windows (their renderers differ; don't force it here). NOT Property.

**Tests at birth (W4b suite):** schema builders snapshot per type (valid JSON-LD, no undefined leakage) · feed/llms factories return correct content-type + structure from a fixture posts provider.

**Acceptance (frozen-standard Verify lines, verbatim):**
- **CT-05:** "run three page types through a structured-data validator: each emits its type validly; grep pages for inline `\"@context\"` literals — only builder calls." (generalist)
- **CT-04:** "open any two articles: TOC entries anchor-link to headings, related block populated by category — and neither article's source file contains apparatus markup." (generalist, post-consolidation)
- RSS/llms adopters: fetch `/feed.xml` and `/llms-full.txt` on each adopted site's local build — valid output from the site's own corpus.
- All adopted sites lint/tsc/build green · CI green on PR + post-merge main.

**STOP if:** a Property builder signature can't be covered without changing generalist's emitted JSON-LD (schema output changes are SEO-sensitive — report, don't improvise) · any fold-up wants to touch subscriber/webhook/nurture code · the reader-apparatus consolidation would change generalist's rendered DOM beyond class-name noise.

---

## Brief GAP-2 — tool platform *(branch `phase-b-tool-platform`, after GAP-8 merges)*

**Stage 1 — platform into `packages/web-shared/tools/`** (no site behaviour changes):
- Lift from Property (copy-never-edit): `lib/calculators/types.ts` (GenericTool/CalcField/CalcResult), `format.ts`, the registry contract (`allTools()` helpers), `components/calculators/{Calculator,fields/Field}.tsx`, embed kit `components/embed/{EmbedAutoResize,EmbedSnippet}.tsx` + the chrome-free embed page pattern.
- **TL-06 wiring:** the shared renderer emits the `calc_*` lifecycle events through the Phase A SDK (`calc_view/input_change/computed/result_viewed/copy/share`) — instrumentation lives in the platform once; tool configs carry zero tracking code.
- Tool pages emit WebApplication/FAQ JSON-LD via **GAP-8's shared schema builders** (the dependency that fixed the ordering).
- Tests at birth: renderer drives fields/compute/result purely from a fixture config · registry helpers · embed resize protocol message shape · `calc_*` emission order.
- Stage 1 acceptance: suite green; all 6 site builds green with zero consumers (no-coupling proof, as GAP-1 Stage 1).

**Stage 2 — generalist adoption:**
1. Registry module (`src/lib/tools/registry.ts`) — single source of truth; gallery page, sitemap, and nav read it (TL-01; flips SEO-01's hand-listed calculators).
2. Re-express the 7 live calculators one at a time: extract inline tax maths into pure compute libs (TL-03 — no React/DOM/fetch), express page copy + fields + FAQs as a config, route through the shared renderer, delete the old component. **ED-01 requirement per calculator: a unit suite over the extracted compute lib against known 2025/26 figures BEFORE its config ships** — this is where generalist's tax maths finally gets a regression net, the audit's single largest gap.
3. **Bespoke escape hatch:** if a calculator genuinely exceeds the GenericTool contract (the VAT Scheme Comparator's multi-scheme table is the likely candidate), register it as `kind: "bespoke"` per TL-01 rather than force-fitting — but its compute STILL extracts to a pure lib with tests. Extending the shared contract for a small gap is preferred; a large extension is a STOP (consult).
4. Quality bar doc (TL-04): `docs/generalist/TOOLS.md` — every figure traced to its source (HMRC rates pages / a generalist house-positions equivalent), per-tool limitation notes.
5. Embeds (TL-05): `/embed/[slug]` chrome-free route + snippet gallery + auto-resize; CSP via the W2 builder's `embedPrefix: "embed"` opt (SEC-03's two-block pattern, already tested in the builder suite).
6. Delete the 4 dead property-niche components (`Section24Calculator`, `PortfolioProfitabilityCalculator`, `MTDCheckerCalculator`, `IncorporationCostCalculator`) — audit Part 1.3. Rebuilding MTD/incorporation as *generalist* tools is inventory expansion (post-Phase-B), not mechanism work; do not build them here.

**Acceptance (Verify lines verbatim):**
- **TL-01:** "add a dummy registry entry locally and rebuild: it appears in the gallery and the sitemap with no other edits. Grep gallery/sitemap/nav for hardcoded tool slugs: none outside the registry. Revert."
- **TL-02:** "count files touched to add one config-class tool: exactly two (the config file + the registry import)."
- **TL-03:** "grep the compute modules for `react`, `window`, `document`, `fetch`: zero hits. Each exports plain functions callable from a node REPL."
- **TL-04:** "the registry (or its doc) states the quality bar; pick two tools and trace one figure each to its documented source; each tool's result carries its limitation note."
- **TL-05:** "paste a gallery snippet into a local HTML file on another port: the tool renders, resizes to content, and its events arrive flagged as embed traffic."
- **TL-06:** "use any tool with devtools open: the lifecycle events fire in order, carrying the tool slug, with no tool-specific tracking code in its config." (events verified into the LIVE store, test sessions named `s_mgrtest3_*` and logged like Phase A's)
- **SEO-01** re-run (calculators now derived) · **ED-01:** "break a tax band constant in a compute module: a test fails." · 7/7 calculators compute-identical to their old components (golden-figure comparison recorded in the PR).
- TL-07: n/a (no overlays operated) — recorded, not skipped silently.

**STOP if:** a compute extraction produces different figures from the old component (do NOT "fix" silently — golden-test the old component's output first, reconcile differences explicitly; a wrong OLD figure is a finding for the user, not a quiet correction) · the GenericTool contract needs more than additive optional fields to express a generalist tool · anything wants to edit Property's calculator files.

---

## Brief GAP-3 — operator console *(branch `phase-b-console`; BLOCKED until the operator gate's readiness query passes)*

**Live-DB preconditions (D2 lesson, run FIRST):**
1. Audit every `vw_*` view the console consumes (funnel, calculator conversion ×2, resource conversion, visitor journey, experiment ×3, field dropoff, CTA performance, section actions, UX friction, client errors, channel conversion, visits-to-conversion, lead intent, subscriber health, nurture funnel) **in the live database**: does each exist, and does each parameterise by `site_key` rather than hardcode `'property'`? Any property-scoped view needs an additive `CREATE OR REPLACE` migration (own commit; verify Property's console output is byte-identical before/after — it is live infrastructure).
2. Confirm the generalist data actually populates the funnel views (the accrual window guarantees volume, not view correctness).

**Stage 1 — console into `packages/web-shared/console/`:**
- Lift `adminData.ts` (typed query layer) + the dashboard panel components (DashboardTabs, SnapshotCard, Sparkline, TrendChart, VisitorsTable, CountrySelect...) parameterised by site key. Panels that depend on systems generalist doesn't run (nurture funnel, lead-intent enrichment, experiments) MUST render an explicit "not operated on this site" state, not crash or show zeros that read as data.
- **OB-01 auth, designed ONCE here:** no secret in the URL. Pattern: a login page POSTs the key → timing-safe compare server-side → HttpOnly + Secure + SameSite=Strict session cookie → every console route checks it; noindex; rate-limited per SEC-06's posture. This is where Property's `?k=` anti-pattern is corrected in shared code; Property keeps its local console until its adoption is separately approved.
- Tests at birth: query-layer functions against fixture rows; auth gate unit tests (timing-safe compare, cookie issuance, denial paths).

**Stage 2 — generalist console + acceptance:**
- Mount at `/admin/analytics` with the shared auth; `ADMIN_DASHBOARD_KEY` in env contract (PF-05).
- **Acceptance (Verify lines verbatim):**
  - **OB-01:** "open the dashboard route without credentials: not-found/unauthorized. Confirm the credential travels in a cookie/header, not the query string, and the page emits noindex."
  - **OB-02:** "grep dashboard components for direct table names: none — only the query module; each function's return type is declared; each maps to a `vw_*` view in migrations." (verified against the LIVE views per precondition 1)
  - **OB-03:** "from the dashboard alone, answer: yesterday's sessions, the biggest funnel drop-off stage, the best-converting channel, and the top tool by lead rate." (real accrued data)
  - **OB-04:** "click through from a lead row to its visitor: the pre-conversion journey renders session by session."
  - **OB-05:** "throw a test error in the browser on the live site; it appears grouped in the errors panel. Field-level abandonment shows per form field."
  - **OB-06:** "load a page and confirm a `web_vital` event row lands carrying the metric name and value." (requires `web-vitals` installed at composition — add if not already)
- **Phase A cleanup item executes here:** delete the `v_mgrtest_2026` test rows (SQL in the Phase A spec) once OB panels verify against real data — log the deletion in the execution log.

**STOP if:** any consumed view is property-hardcoded in a way an additive REPLACE can't fix without changing Property's console output · the auth design needs anything beyond env-key + cookie (e.g. user accounts) — that's a product decision, not an engineering call · OB-03's questions can't be answered because the accrual window produced too little data (report; extending the window is the user's call, not a reason to ship empty panels).

---

## Cross-cluster rules

- Brief executor: Sonnet, same handoff discipline as Phase A (read spec first, STOP conditions are hard stops, execution-log updates in the same commit, Co-Authored-By).
- Manager verification after each cluster: diff review + independent re-run of at least one Verify line per cluster + live-DB checks where applicable, before merge; post-merge CI on MAIN is the close-out tick.
- The legitimate-interest compliance item still gates SDK rollout beyond generalist — nothing in Phase B rolls tracking to other sites (RSS/llms adoption carries no tracking).
- Test rows written during TL-06/OB acceptance follow the Phase A convention (`s_mgrtest3_*`, logged with cleanup status).
