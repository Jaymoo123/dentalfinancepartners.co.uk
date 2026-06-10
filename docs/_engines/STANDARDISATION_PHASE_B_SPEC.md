# Standardisation — Phase B build spec (GAP-8 fold-ups → GAP-2 tool platform → operator gate → GAP-3 console)

**Status:** EXECUTING — approved 2026-06-10. GAP-8 handed to Sonnet first; GAP-2 after GAP-8 merges; GAP-3 blocked on the operator gate's readiness query.

## Execution log
*(appended per cluster, same convention as Phase A)*

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
