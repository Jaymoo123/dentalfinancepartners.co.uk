# Standardisation — Phase F: Property adoption (the donor comes onto the grid)

**Status:** EXECUTING — opened 2026-06-11 on user go ("let's move on to the property adoption as long as it's safe"). Safety is the design constraint: **three small clusters, each with its own branch, PR, deploy, live battery, and instant rollback point.** Property's READ-ONLY rule is hereby lifted ONLY within this phase's explicit scope; everything not named below stays untouched.

## Execution log
*(appended per cluster)*

### F1 — plumbing — COMPLETE 2026-06-11 (branch `property-adopt-1`)

**Executor:** Claude Sonnet (claude-sonnet-4-6). All 6 items executed + acceptance-checked green.

**Event-parity diff (STOP check, F1 item 1):**
Ran a line-by-line comparison of Property's local `lib/analytics/*.ts` against the shared SDK before deletion.
- EVENT_NAMES (31 events): identical.
- INTERACTION_EVENTS set: identical.
- autoCapture event list: identical.
- client_error / web_vital capture: both present in shared SDK.
- calc_* events: present in shared SDK.
- Consent key with `storagePrefix:"ptp"` = `ptp_consent`: byte-identical to local hardcoded key.
- visitor/session keys `ptp_vid`/`ptp_sid` with `storagePrefix:"ptp"`: byte-identical to local hardcoded keys.
- `journey.ts` (admin-only CTA labels/journeys): used only in deleted console pages — no event surface loss.
- `ctaLabels.ts`, `adminData.ts`, `bots.ts`: likewise admin-console-only, safely deleted with the console.
- **No STOP conditions triggered.** Shared SDK is a superset of Property's local event surface.

**LD-04 consent check:**
All 6 forms verified. Consent state in every form flows from a rendered `<input type="checkbox">` element with `useState(false)` default. No auto-consent, no STOP.

**Singleton fix applied:**
All callers of `setActiveExperiment` re-pointed from local `@/lib/experiments/active` to `@accounting-network/web-shared/analytics/experiments/active`. This ensures experiment assignment is read by the shared `track.ts`'s own module instance so experiment tags stamp correctly on events.

**RSC boundary fix:**
`layout.tsx` passes only serializable props (`siteKey`, `siteName`) to the local `"use client"` wrapper `components/analytics/AnalyticsProvider.tsx`. The wrapper imports `deriveTopic` in the client bundle and forwards it to the shared `SharedAnalyticsProvider`. This avoids the "Functions cannot be passed directly to Client Components" RSC error.

**Items executed:**

1. **Analytics SDK composition** — Shared providers (`ConsentProvider`, `ConsentedScripts`) composed in `layout.tsx`. Local `"use client"` wrapper handles RSC boundary for `deriveTopic`. `/api/track` replaced with `createTrackHandler` factory (site key from config). All 14+ components re-pointed to shared SDK imports. Local `lib/analytics/*` (8 files + server/ subdir) deleted after parity confirmed.

2. **W2 security headers** — `next.config.ts` replaced inline CSP blocks with `buildSecurityHeaders({ ga: true, supabase: true, clarity: true, embedPrefix: "embed" })`.

3. **W3 frontmatter validation** — `lib/blog.ts` now calls `assertFrontmatter(data, STANDARD_MANIFEST, filePath)`. Non-null assertions added for type narrowing (`fm.title!`, `fm.slug!`, etc.).

4. **GAP-4 sentinel retirement** — Removed all `"—"` filler strings from 6 forms. `full_name: ""` (empty string) used where `LeadSubmission.full_name` is required by type; `practice_name` removed entirely (optional key). Consent logic untouched.

5. **Local console deleted** — `app/admin/analytics/**` (8 files), `components/admin/**` (3 files) deleted. No external nav links to the console existed (verified by grep). OB-01 `?k=` auth surface gone by deletion.

6. **Test harness** — `Property/web/vitest.config.ts` created with PostCSS workaround + `@` path alias. `"test": "vitest run"` added to `package.json`. 5-test niche-config smoke test created at `src/tests/niche-config.test.ts`.

**Acceptance checks (all green):**
- `npx vitest run` (Property/web): 5 tests pass.
- web-shared suite: all green (pre-existing generalist failure unrelated to F1).
- `tsc --noEmit` across all 7 sites + console: zero errors.
- `next build` (Property): green, 767 pages generated.
- Grep for local analytics imports (`from.*lib/analytics`): clean.
- Grep for site-key literals (PF-07): clean.

**Files changed:** `Property/web/next.config.ts`, `Property/web/package.json`, `Property/web/vitest.config.ts` (new), `Property/web/src/app/layout.tsx`, `Property/web/src/app/api/track/route.ts`, `Property/web/src/lib/blog.ts`, `Property/web/src/lib/experiments/exposure.ts`, `Property/web/src/components/analytics/AnalyticsProvider.tsx`, `Property/web/src/components/analytics/ConsentProvider.tsx` (shim), `Property/web/src/components/analytics/ConsentedScripts.tsx` (shim), `Property/web/src/components/analytics/WebVitals.tsx` (shim), `Property/web/src/components/analytics/ConsentToggle.tsx`, `Property/web/src/components/analytics/useFormTracking.ts`, `Property/web/src/components/blog/ExitIntentModal.tsx`, `Property/web/src/components/blog/InlineMiniLeadForm.tsx`, `Property/web/src/components/calculators/Calculator.tsx`, `Property/web/src/components/calculators/premium/MobileToolSlot.tsx`, `Property/web/src/components/calculators/premium/PremiumCalculator.tsx`, `Property/web/src/components/experiments/useExperiment.ts`, `Property/web/src/components/forms/LeadForm.tsx`, `Property/web/src/components/forms/MiniCapture.tsx`, `Property/web/src/components/forms/SubscribeForm.tsx`, `Property/web/src/components/intent/IntentProvider.tsx`, `Property/web/src/components/resources/ResourceGate.tsx`, `Property/web/src/components/support/SpecialistWidget.tsx`, `Property/web/src/tests/niche-config.test.ts` (new).

**Files deleted:** `Property/web/src/lib/analytics/autoCapture.ts`, `consent.ts`, `ctaLabels.ts`, `ids.ts`, `journey.ts`, `track.ts`, `types.ts`, `useInViewOnce.ts`, `server/adminData.ts`, `server/bots.ts`; `Property/web/src/app/admin/analytics/page.tsx`, `leads/page.tsx`, `trends/page.tsx`, `visitor/[visitorId]/page.tsx`, `visitor/[visitorId]/VisitorTabs.tsx`, `VisitorsTable.tsx`, `DashboardTabs.tsx`, `CountrySelect.tsx`; `Property/web/src/components/admin/TrendChart.tsx`, `SnapshotCard.tsx`, `Sparkline.tsx`.

**Deferred to manager:** Nothing deferred. No STOPs triggered. Manager to: verify + merge branch, run deploy gate (per spec), confirm live sessions still landing in Supabase before opening F2.

## Why this is safe (the user's condition, answered)

- **Visitor continuity verified pre-flight (manager, 2026-06-11):** the shared SDK with `storagePrefix: "ptp"` produces byte-identical localStorage keys (`ptp_vid`/`ptp_sid`/`ptp_sid_ts`/`ptp_consent`) to Property's local `lib/analytics/ids.ts`. Returning visitors keep identity + consent with zero migration. No `legacyPrefix` needed.
- **Nurture is already DORMANT in prod:** Property's Vercel env has NO `CRON_SECRET` (verified 2026-06-11) and the `subscribers` table holds 0 Property rows — the engine swap cannot change live email behaviour.
- **Schema stays LOCAL** (estate-wide STOP posture carried): Property's JSON-LD — its most SEO-sensitive surface — is not re-pointed in this phase at all.
- **The central lead pipeline (`api/leads/{notify,sync,enrich}`) is NOT touched** in any cluster; its survival is probed after every deploy (expect 401/405, never 404 — per `CENTRAL_LEAD_PIPELINE.md`).
- **Homepage and ALL content files untouched** (HP-lock respected; the humanise program runs on parallel branches over content — adoption keeps to lib/app/component code so no collision).
- **Golden tests pinned to current outputs before any tool is re-pointed** — Property today has ZERO tests; this phase is where the revenue site finally gets its regression net.
- **Each cluster deploys alone.** A defect in any cluster rolls back one small deploy, not the adoption.

**Live-DB / env facts (manager-verified 2026-06-11):** Property Vercel env: SUPABASE keys + ADMIN_DASHBOARD_KEY + LEADS_NOTIFY_SECRET + RESEND_API_KEY + NEXT_PUBLIC_CLARITY_ID + SITE_URL (+ oversized-fallback bypass). No CRON_SECRET, no NURTURE_*. Project: `property-tax-partners` (prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU, rootDirectory `Property/web`, workspace-root installCommand).

## Clusters

### F1 — plumbing *(branch `property-adopt-1`)*
1. **Analytics SDK composition** (replace local copies with the shared SDK Property donated): providers in layout composed with `storagePrefix: "ptp"` (FROZEN), Property's intent/deriveTopic injected per the Phase A coupling notes, ConsentedScripts carrying its Clarity id; `/api/track` → `createTrackHandler` reading site key from config (kills any literal); delete `lib/analytics/*` local copies ONLY after parity is verified (the shared SDK is the lifted superset — diff the event surface first; any event type Property emits that the shared SDK lacks is a STOP).
2. **W2 security headers** via `buildSecurityHeaders` (+ `embedPrefix: "embed"` — Property runs embeds): prod drops unsafe-eval like the other five sites. The documented SEC-02 exception applies as-is.
3. **W3 frontmatter validation** wired (corpus pre-flighted clean in Phase A).
4. **GAP-4 sentinel retirement:** the six `"—"` filler components (LeadForm, MiniCapture, InlineMiniLeadForm, ExitIntentModal, ResourceGate, SpecialistWidget) move to conditional spread (key absent when empty). Consent rules: LD-04 binding — consent only from rendered checkboxes (Property's forms already comply; verify, don't assume).
5. **Local console DELETED** (`app/admin/analytics/**` + its `?k=` auth surface): the unified estate console covers Property. This removes the estate's worst auth pattern (OB-01 non-compliance) by deletion, not repair.
6. **Test harness wiring** (the Phase D lesson): `Property/web/vitest.config.ts` + `"test": "vitest run"` land in F1 so F2's goldens are CI-run from birth.

### F2 — tools platform *(branch `property-adopt-2`, after F1 merges + deploys clean)*
- Property's calculator fleet is the shared platform's ancestor — this is a RE-POINT, not a re-expression: registry/types/renderer imports move to `web-shared/tools`, pages adopt the `CalculatorClient` RSC pattern, local ancestor copies deleted.
- **Golden tests FIRST, per tool, pinned to current outputs** (audit counts the fleet; every live tool gets a suite before its imports move). A differing figure post-re-point is a STOP. Stale OLD figures = user findings (ground truths: 2025/26 SL 26,065/28,470/32,745 · EA £10,500 · FA-2026 WDA 14% + 40% FYA · AMAP 55p from 2026/27 · April-2027 reducer 22%).
- Tool pages keep LOCAL schema builders (WebApplication JSON-LD byte-stable); embed routes keep the `ptp` message prefix their existing embed consumers expect (embeds are deployed on third-party pages — the resize message contract is FROZEN; breaking it breaks live embeds silently: treat as a STOP surface).
- TL-01/02/03/05/06 verify lines re-run on Property.

### F3 — nurture re-point *(branch `property-adopt-3`, after F2 merges + deploys clean)*
- `api/subscribe` + `api/nurture/*` + `lib/nurture/*` → shared engine composed with Property's config (its sequence content carried verbatim; UTM/from-identity from env). Fixes by construction: PF-07 literal, EN-06 hardcoded fallbacks, SEC-05 plain `===`.
- Stays DORMANT: no CRON_SECRET (current state preserved). Env before deploy: NURTURE_FROM_*/REPLY_TO (Property identity), fresh NURTURE_TOKEN_SECRET; NURTURE_WEBHOOK_SECRET unset (events 503 per SEC-05 — same parked posture as agency; Resend re-point is the same parked user item).
- 0 subscribers → no data migration.

## Per-cluster deploy gate (manager)
Deploy → live battery: `an01_browser_pass.mjs <url> ptp` · key pages 200 (home, a blog post, a tool page, /calculators) · **lead-pipeline probe: `api/leads/notify` returns 401/405 (NOT 404)** · embeds 200 + resize message intact (F2) · one golden figure spot-checked against the live page (F2) · structured-data byte-diff on one tool + one blog page vs pre-deploy capture (F1/F2) · ingest: property sessions still landing. Any failure → `vercel rollback`, investigate on the branch.

## Cross-cluster rules
Executor Sonnet (read spec first; STOP conditions hard; log entries in-commit; Co-Authored-By; no em-dashes). Manager verifies + merges + deploys between clusters. `next build` is the gate. Anything outside a cluster's named scope stays READ-ONLY — especially `api/leads/*`, `lib/schema*`, homepage, content files.
