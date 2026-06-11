# Standardisation — Phase F: Property adoption (the donor comes onto the grid)

**Status:** CLOSED 2026-06-11. All three clusters merged + deployed + live-verified same day (F1 PR #16, F2 PR #17, F3 PR #19; post-merge main CI green each). Property — the donor and revenue site — is fully on the shared machinery with 95 tests guarding it (from zero), visitor continuity intact, embeds proven live from a third-party page, and its five latent nurture defects dead by construction.

**F3 DEPLOY BATTERY (manager, 2026-06-11) — ALL GREEN:** pages 200 · lead pipeline alive (notify 401) · track 204 · SEC-05 proven live (events 503 without webhook secret, send 401 without CRON_SECRET = dormant posture confirmed in prod) · subscribe validates (400 without consent) · **user-reported CTA contrast defect fixed and re-probed live** (blog-page calculator CTA was emerald-on-emerald because `.prose-blog a` outspecified `.text-white`; fixed via `:not([data-cta])` exemption; post-deploy computed colour rgb(255,255,255) on emerald). NURTURE_FROM_*/TOKEN_SECRET set in Vercel; CRON_SECRET + NURTURE_WEBHOOK_SECRET deliberately absent (parked with the estate newsletter posture).

**Status history:** EXECUTING — opened 2026-06-11 on user go ("let's move on to the property adoption as long as it's safe"). Safety is the design constraint: **three small clusters, each with its own branch, PR, deploy, live battery, and instant rollback point.** Property's READ-ONLY rule is hereby lifted ONLY within this phase's explicit scope; everything not named below stays untouched.

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

**F1 + F2 DEPLOYED + LIVE-VERIFIED (manager, 2026-06-11).**
- F1 (merged PR #16, CI 10/10): deploy battery green — pages 200, `api/leads/notify` 401 (alive), track 204, an01 pass on ptp prefix (opt-out stops beacons live), property ingest confirmed, test session cleaned. Strays note: parallel console work left uncommitted duplicates of its own committed changes in the main tree — verified byte-identical to the branch versions and discarded.
- F2 (merged PR #17, CI 10/10): deploy battery green — calculator + embed pages 200, JSON-LD block types match local build (WebApplication + BreadcrumbList), **embed FROZEN contract proven on PROD from a genuine third-party HTTP page** (`scripts/f2_http_harness.mjs` + `f2_direct_probe.mjs`: parent received `{type:"ptp-embed-height",height}` ×2; the first file://-host harness failure was a harness artifact — file:// parents are unreliable for iframe message tests, use the HTTP harness). 71 goldens now guard the fleet; zero stale figures found (Property constants all current incl. 2027/28 22% reducer note).

## Why this is safe (the user's condition, answered)

- **Visitor continuity verified pre-flight (manager, 2026-06-11):** the shared SDK with `storagePrefix: "ptp"` produces byte-identical localStorage keys (`ptp_vid`/`ptp_sid`/`ptp_sid_ts`/`ptp_consent`) to Property's local `lib/analytics/ids.ts`. Returning visitors keep identity + consent with zero migration. No `legacyPrefix` needed.
- **Nurture is already DORMANT in prod:** Property's Vercel env has NO `CRON_SECRET` (verified 2026-06-11) and the `subscribers` table holds 0 Property rows — the engine swap cannot change live email behaviour.
- **Schema stays LOCAL** (estate-wide STOP posture carried): Property's JSON-LD — its most SEO-sensitive surface — is not re-pointed in this phase at all.
- **The central lead pipeline (`api/leads/{notify,sync,enrich}`) is NOT touched** in any cluster; its survival is probed after every deploy (expect 401/405, never 404 — per `CENTRAL_LEAD_PIPELINE.md`).
- **Homepage and ALL content files untouched** (HP-lock respected; the humanise program runs on parallel branches over content — adoption keeps to lib/app/component code so no collision).
- **Golden tests pinned to current outputs before any tool is re-pointed** — Property today has ZERO tests; this phase is where the revenue site finally gets its regression net.
- **Each cluster deploys alone.** A defect in any cluster rolls back one small deploy, not the adoption.

**Live-DB / env facts (manager-verified 2026-06-11):** Property Vercel env: SUPABASE keys + ADMIN_DASHBOARD_KEY + LEADS_NOTIFY_SECRET + RESEND_API_KEY + NEXT_PUBLIC_CLARITY_ID + SITE_URL (+ oversized-fallback bypass). No CRON_SECRET, no NURTURE_*. Project: `property-tax-partners` (prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU, rootDirectory `Property/web`, workspace-root installCommand).

### F2 — tools platform — COMPLETE 2026-06-11 (branch `property-adopt-2`)

**Executor:** Claude Sonnet (claude-sonnet-4-6). Full re-point executed + all acceptance checks green.

**Fleet audit:**
- 16 tools total: 5 bespoke + 11 generic (all generic: config-driven, no bespoke component)
- 6 premium tools registered separately in `lib/calculators/premium/registry.ts` (bespoke kind, surfaced as client islands only; not in main fleet registry)
- Gallery, sitemap, embed gallery all derive from `allTools()` -- TL-01 confirmed

**Embed contract (STOP check):**
- Local `EmbedAutoResize` pre-F2: `postMessage({ type: "ptp-embed-height", height }, "*")` (hardcoded, no props)
- Shared `EmbedAutoResize`: `postMessage({ type: messageType, height }, "*")` (prop-driven)
- Composition: `<SharedEmbedAutoResize messageType="ptp-embed-height" />` inside a local shim
- Verdict: IDENTICAL wire format. Third-party embed listeners unaffected. **STOP NOT triggered.**

**Golden tests written (before re-pointing):**
71 tests across 13 suites pinning current compute outputs:
- Registry contract (9): 16 total tools, 5 bespoke, 11 generic, all slugs present
- Format helpers (2): gbp/pct formatting
- CGT compute (7): gain=108000, AEA=3000, headline=£25,184, effective rate 20-25%
- Rental income tax (5): profit=15000, headline=£4,800, take-home=£4,200; note confirms 22%/2027-28 (FA 2026 ground truth)
- Rental yield (4): gross 6.0%, net 4.4%, monthly £917
- BTL cashflow (3): £350/mo, £4,200/yr, tone=good
- LBTT Scotland (5): main=£2,100, ADS=£20,000 (8%), total=£22,100
- LTT Wales (4): higher rates £14,950, main rates £1,500
- FTB SDLT (4): £2,500 with relief, £7,500 standard, £5,000 saving; relief withdrawn above £500k
- Corporation Tax (5): £5,700 (19%) at £30k; boundary/marginal cases
- Dividend Tax (2): all basic-band, £1,706 tax
- Rent-a-Room (3): scheme £600 beats normal £2,800
- Property Allowance (4): allowance £600 beats actual £760; covers at £1,000
- Stale-figure sentinels (8): AEA £3,000, SDLT 5%, LBTT ADS 8%, CT 19%/25%

**No stale figures found.** All ground truths match locked constants in lib/*.ts.

**Re-points executed:**
- `lib/calculators/types.ts` -- re-export from shared types (shim, keeps all downstream working)
- `lib/calculators/format.ts` -- re-export from shared format (shim)
- `lib/calculators/registry.ts` -- adopts `makeRegistryHelpers` from shared (TL-01); TOOLS array stays local
- `components/calculators/fields/Field.tsx` -- re-export from shared Field
- `components/embed/EmbedAutoResize.tsx` -- composes shared with frozen `messageType="ptp-embed-height"`
- `components/embed/EmbedSnippet.tsx` -- re-export from shared
- `components/calculators/CalculatorClient.tsx` (NEW) -- RSC boundary wrapper; resolves tool from local registry, passes GenericTool to shared Calculator
- `app/calculators/[slug]/page.tsx` -- `<Calculator slug>` replaced with `<CalculatorClient slug>`
- `app/embed/[slug]/page.tsx` -- same

**Deleted:** `components/calculators/Calculator.tsx` (zero remaining importers after re-point)

**TL-01:** gallery/sitemap/embed gallery all call `allTools()` from local registry -- confirmed unchanged post re-point.
**TL-03:** No inline tax compute in components; all compute lives in pure `lib/*.ts` files.
**TL-06:** Generic tools: `CalculatorClient -> shared Calculator -> track()` (one path). Premium tools: `PremiumCalculator -> track()` (separate path). No double-emit.
**JSON-LD (STOP check):** `buildCalculatorJsonLd` and `buildFaqPageJsonLd` stay in local `lib/calculator-schema.ts` and `lib/faq-page-schema.ts`. Tool-page structured data unchanged. STOP not triggered.
**Premium tier:** `components/calculators/premium/` exceeds the shared GenericTool contract (has sliders, charts, scenario comparison, mini-grid). Registered as bespoke (kind:"bespoke") in the main fleet. Premium compute still lives in pure `lib/*.ts` (section24, sdltScenarios, etc.). No STOP.

**Acceptance (all green):**
- `npx vitest run` (Property/web): 76/76 (5 niche-config + 71 goldens)
- web-shared suite: 254/254
- `tsc --noEmit` (7 sites): zero errors
- `next build` (Property): green, 767 pages (matches F1 baseline)
- TL-01 grep: confirmed
- TL-03 grep: confirmed (no tax rates in components)
- TL-06 parity: confirmed
- Zero remaining imports of deleted Calculator.tsx: confirmed
- Embed contract diff: documented, STOP not triggered

**Deferred to manager:** Nothing deferred. No STOPs triggered. Manager to: verify + merge branch, run deploy gate (embed battery + embed resize message spot-check + JSON-LD diff on one tool page), confirm lead-pipeline probe returns 401/405.

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

### F3 — nurture re-point — COMPLETE 2026-06-11 (branch `property-adopt-3`)

**Executor:** Claude Sonnet (claude-sonnet-4-6). All items executed + acceptance-checked green.

**Audit findings (committed as this log entry):**

1. **Routes found:** `api/subscribe` (subscribe), `api/nurture/send` (cron), `api/nurture/events` (webhook), `api/unsubscribe` (old UUID-token unsubscribe). Missing from the engine standard: `api/nurture/subscribe`, `api/nurture/confirm/[token]`, `api/nurture/unsubscribe`.
2. **PF-07:** `const SITE_KEY = "property"` literal in `api/subscribe/route.ts` line 21. Eliminated.
3. **EN-06:** `NURTURE_FROM_NAME` and `NURTURE_FROM_EMAIL` had hardcoded fallback strings in `lib/nurture/send.ts`. Eliminated. `requireEnv` throws if absent.
4. **SEC-05 (events):** Old `api/nurture/events` used plain `=== secret` comparison, no Svix. Replaced with `verifyResendWebhook` (timing-safe, replay-protected).
5. **SEC-05 (send):** Old `api/nurture/send` plain `=== secret`. Replaced with `timingSafeEqual` + padded buffers.
6. **SEC-05 (unsubscribe):** Old `api/unsubscribe` used raw UUID token (no HMAC, no expiry). Replaced with HMAC-signed token via `verifyNurtureToken`.
7. **LD-09 FOUND AND FIXED:** `CONSENT_TEXT` in SubscribeForm said "I understand these are general information..." but the visible label rendered "These are general information... See our Privacy Policy." (word difference + missing Privacy Policy clause). Fixed: `CONSENT_TEXT` now byte-identical to the rendered label. `defaultConsentText` in config matches too. The LD-09 test catches any future drift.
8. **vercel.json:** Already pointed at `/api/nurture/send`. No change needed.

**Sequence mapping (old delayDays -> engine after-previous-step semantics):**
| Step | Key | Old cumulative day | delayDays (after prev) |
|------|-----|--------------------|------------------------|
| 0 | welcome | 0 | 0 |
| 1 | section24 | 3 | 3 |
| 2 | incorporation | 8 | 5 |
| 3 | cgt | 14 | 6 |
| 4 | allowances_mileage | 21 | 7 |

Note: the old `lib/nurture/sequence.ts` already used after-previous-step semantics for `delayDays`. The engine semantics are identical. No schedule change.

**Env mapping (manager must set at deploy gate):**

| Old env name | New env name | Notes |
|---|---|---|
| `NURTURE_FROM_NAME` | `NURTURE_FROM_NAME` | Same name; was a fallback default, now required |
| `NURTURE_FROM_EMAIL` | `NURTURE_FROM_EMAIL` | Same name; was a fallback default, now required |
| `NURTURE_REPLY_TO` | `NURTURE_REPLY_TO` | Same name; was a fallback default, now required |
| `NURTURE_WEBHOOK_SECRET` | `NURTURE_WEBHOOK_SECRET` | Same name; now Svix whsec_ format required |
| (none) | `NURTURE_TOKEN_SECRET` | New: 32+ char secret for HMAC tokens; if unset = single opt-in mode |
| `CRON_SECRET` | `CRON_SECRET` | Unchanged; unset = dormant (no emails leave) |

Suggested values for the deploy gate: NURTURE_FROM_NAME="Property Tax Partners", NURTURE_FROM_EMAIL="updates@propertytaxpartners.co.uk", NURTURE_REPLY_TO="hello@propertytaxpartners.co.uk". Generate NURTURE_TOKEN_SECRET with `openssl rand -hex 32`.

**Files created:**
- `Property/web/src/config/nurture.ts` (Property NurtureConfig + 5 buildBody step functions)
- `Property/web/src/lib/nurture-provider.ts` (Resend EmailProvider adapter)
- `Property/web/src/app/api/nurture/subscribe/route.ts` (shared handleSubscribe)
- `Property/web/src/app/api/nurture/confirm/[token]/route.ts` (HMAC token + confirmSubscriber)
- `Property/web/src/app/api/nurture/unsubscribe/route.ts` (HMAC token + unsubscribeByEmail, RFC 8058)
- `Property/web/src/tests/nurture-f3.test.ts` (19 acceptance tests)

**Files replaced (same path, new content):**
- `Property/web/src/app/api/nurture/send/route.ts` (timing-safe compare, shared runNurtureCron)
- `Property/web/src/app/api/nurture/events/route.ts` (Svix verifyResendWebhook, SEC-05)
- `Property/web/src/app/api/subscribe/route.ts` (thin proxy to /api/nurture/subscribe)

**Files deleted:**
- `Property/web/src/lib/nurture/send.ts` (fork orchestration)
- `Property/web/src/lib/nurture/sequence.ts` (fork sequence content; content carried verbatim into config/nurture.ts)
- `Property/web/src/app/api/unsubscribe/route.ts` (old UUID-token unsubscribe; replaced by /api/nurture/unsubscribe with HMAC)

**Modified:**
- `Property/web/src/components/forms/SubscribeForm.tsx`: fetch re-pointed to `/api/nurture/subscribe`; `CONSENT_TEXT` fixed to match visible label (LD-09)

**No STOPs triggered.** 0 subscribers in prod, dormant cron, no data migration. Lead pipeline untouched.

**Acceptance (all green):**
- `npx vitest run` (Property/web): 95/95 (5 niche-config + 71 goldens + 19 nurture-f3)
- web-shared suite: 254/254
- `tsc --noEmit` (6 sites + console): zero errors
- `next build` (Property): green, 767 pages
- PF-07 grep: clean
- Fork module refs grep: clean
- SEC-05: events route returns 503 when NURTURE_WEBHOOK_SECRET unset (code verified); send route returns 401 when CRON_SECRET unset (timing-safe compare, code verified)

**Deferred to manager:** Nothing deferred. No STOPs triggered. Manager to: set NURTURE_FROM_NAME, NURTURE_FROM_EMAIL, NURTURE_REPLY_TO, NURTURE_TOKEN_SECRET in Vercel env (NURTURE_WEBHOOK_SECRET intentionally NOT set = parked posture). Then verify + merge branch, run deploy gate (lead-pipeline probe 401/405, key pages 200, consent checkbox present on subscribe form, `api/nurture/subscribe` POST with valid body returns `{ok:true}`).

---

*(original cluster brief, for reference)*
- `api/subscribe` + `api/nurture/*` + `lib/nurture/*` to shared engine composed with Property's config (its sequence content carried verbatim; UTM/from-identity from env). Fixes by construction: PF-07 literal, EN-06 hardcoded fallbacks, SEC-05 plain `===`.
- Stays DORMANT: no CRON_SECRET (current state preserved). Env before deploy: NURTURE_FROM_*/REPLY_TO (Property identity), fresh NURTURE_TOKEN_SECRET; NURTURE_WEBHOOK_SECRET unset (events 503 per SEC-05 -- same parked posture as agency; Resend re-point is the same parked user item).
- 0 subscribers -> no data migration.

## Per-cluster deploy gate (manager)
Deploy → live battery: `an01_browser_pass.mjs <url> ptp` · key pages 200 (home, a blog post, a tool page, /calculators) · **lead-pipeline probe: `api/leads/notify` returns 401/405 (NOT 404)** · embeds 200 + resize message intact (F2) · one golden figure spot-checked against the live page (F2) · structured-data byte-diff on one tool + one blog page vs pre-deploy capture (F1/F2) · ingest: property sessions still landing. Any failure → `vercel rollback`, investigate on the branch.

## Cross-cluster rules
Executor Sonnet (read spec first; STOP conditions hard; log entries in-commit; Co-Authored-By; no em-dashes). Manager verifies + merges + deploys between clusters. `next build` is the gate. Anything outside a cluster's named scope stays READ-ONLY — especially `api/leads/*`, `lib/schema*`, homepage, content files.
