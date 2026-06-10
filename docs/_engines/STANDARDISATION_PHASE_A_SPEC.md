# Standardisation — Phase A build spec (GAP-7 shared hardening + GAP-1 analytics SDK)

**Status:** EXECUTING — both sections APPROVED (ratifications: Vitest; hand-rolled validator conditional on error legibility / zod fallback; SEC-02 documented-exception confirmed original to the frozen standard, verdict capped at partial). D-decisions resolved: D1 opt-out posture ADOPTED (see compliance item below) · D2 canonical key `"general"` — **hard ordering gate: key frozen in config before the track route's first write** · D3 no GA4, first-party only — LOCKED.

## Execution log

**W4a — DONE (2026-06-10, branch `phase-a-shared-hardening`, tag `pre-phase-a` marks the baseline).**
- Finding that reshaped the workstream: the repo is a single-lockfile npm workspace; the old workflow's per-site `npm ci`/`cache-dependency-path` referenced lockfiles that don't exist, so **every CI run had been failing at install since at least 2026-05-20** (verified via `gh run list`) — the estate had no CI net at all, and digital-agency is tracked in THIS repo (the "separate repo" note in MULTI_SITE_INFRASTRUCTURE.md is stale).
- Rewritten workspace-correct: root `npm ci`, fail-fast-off matrix over 6 sites (generalist + digital-agency newly covered), `npm run test --if-present` per site, `test-web-shared` job, status-check updated. contractors-ir35 excluded (scaffold), documented in the workflow header.
- Side fix shipped with it: generalist + digital-agency `eslint.config.mjs` had flat-config `ignores` combined with `rules` (only global when standalone) so `.next/` output got linted. **Dentists/Medical/Solicitors likely carry the same bug** — harmless in CI (lint runs before build on a fresh checkout) but fix at next touch; Property's copy untouched (read-only).
- Tested-green locally: generalist lint 0 / tsc 0 / build 0 (671 pages); digital-agency lint 0 / tsc 0 / build 0; web-shared `--if-present` no-op green. **Remote CI run pending a push/PR of this branch** — first green run on GitHub is the final W4a acceptance tick.

**W4a CI run 1 result (2026-06-10, run 27274755102) — RED: 3/6 site builds failed.**
- ✓ Dentists, generalist, digital-agency, test-web-shared, test-python all green.
- ✗ **Property:** `@typescript-eslint/no-require-imports` on 6 root-level diagnostic scripts (`analyze_age.js`, `check_date_distribution.js`, `check_links.js`, `check_old_files.js`, `count_all_broken.js`, `sample_by_period.js`). Fix: `"*.js"` ignores entry in `Property/web/eslint.config.mjs` — **Read-only exception #1 (deliberate): Property eslint ignores entry for root diagnostic scripts — CI-enabling, non-behavioural, scopes out non-app scripts. Approved 2026-06-10.**
  - Combined-ignores bug audit (while in the file): Property's `ignores` IS a standalone object (only key); it does NOT have the bug. No fix needed.
- ✗ **Medical / Solicitors:** `ESLint couldn't find an eslint.config.(js|mjs|cjs) file` — these sites have NO flat config at all (W4a assumed they had the combined-ignores bug variant; they have nothing). Fix: add minimal `eslint.config.mjs` matching Dentists (approved alongside Property fix).

**D1 condition (estate posture provenance) — answered:** Property's posture IS deliberate and documented in code (`lib/analytics/consent.ts`: "Decision (updated 2026-06-05): track by DEFAULT (legitimate-interest posture)", with revert path) — it is not an accident. But **no evidence exists in-repo of a legal/compliance vetting of legitimate interest as the analytics basis**, and Property is today the only site running it. Per the user's condition this is logged as an **estate-wide compliance item: validate the legitimate-interest analytics basis (PECR/UK GDPR analytics-cookie guidance) before or alongside GAP-1 composition rollout beyond generalist**. Generalist adopts the uniform posture; the item stays open on the program board, not silently inherited.

**Next:** W1/W2/W3 build workstreams — paused for per-workstream execution handoff planning (Sonnet).
**Inputs:** `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` (v1-FINAL, frozen — Verify lines are the acceptance criteria here) · `docs/generalist/CAPABILITY_AUDIT_2026-06.md` (Part 3 clusters) · repo state as of 2026-06-10 post-Phase-0.
**Guardrails:** Property is READ-ONLY (its code is lifted as source material, never edited in place — Property *adoption* of shared modules is a separately-approved step). Tag repo before the phase branch. Commit only at tested-green.
**Phase 0 verified done:** EN-05 interim claim guard (`generalist .../newsletter-drip/route.ts:42-66`, advance-then-release), `/blog/stage/*` noindexed, robots/.env hygiene. GA4 id deliberately left empty — generalist stays dark until GAP-1 lands.

**Branches:** `phase-a-shared-hardening` (GAP-7, one commit per workstream, each tested-green) → `phase-a-analytics-sdk` (GAP-1). Both low blast radius (package code + per-site adoption); no shared-schema changes in Phase A.

**Scope cut (locking a Part 3 ambiguity):** GAP-8's subscriber-untouched fold-ups (schema library, RSS, `llms-full.txt`, reader apparatus) move to **Phase B** — they are additive with no dependency pressure, and Phase A stays: 4 hardening workstreams + 1 SDK extraction.

---

## Section 1 — GAP-7: shared hardening (four workstreams)

Lineage confirmed by sweep (2026-06-10): the blind config cast exists in **all 7** `*/web/src/config/niche-loader.ts`; the `unsafe-inline`/`unsafe-eval` CSP and the identical silent-defaulting `blog.ts` exist in **all 6** built sites. Every fix below lands once in `packages/web-shared` and is adopted per-site.

**Execution order: W4a (CI matrix) FIRST** — it is the safety net that makes W1–W3's cross-site adoption verifiable — then W1 → W2 → W3, with W4b (test harness) landing alongside W1 so the first shared module is tested at birth.

### W4a — CI matrix completion *(PF-04, first move)*

- **Change:** `.github/workflows/ci-build-test.yml` —
  1. Add a `test-generalist` job mirroring the existing four (lint → `tsc --noEmit` → build with the generalist site URL).
  2. Add `test-digital-agency` if its tree builds here (it exists at `digital-agency/web` in this checkout; memory records it as a separate git repo — **verify which is true at execution before adding the job**).
  3. Add every new job to the `status-check.needs` list.
  4. Add an `npm test` step to each site job and a `test-web-shared` job (lint + typecheck + unit tests of the package) — test steps no-op green until W4b lands suites, then become real.
- **Known risk to verify at execution:** the existing jobs run `npm ci` inside `<Site>/web` with a per-site lockfile while `@accounting-network/web-shared` is a root-workspace `*` dep. The four existing jobs pass today, so resolution works — confirm the same holds for generalist's lockfile before relying on it.
- **Acceptance (standard Verify lines):**
  - **PF-04:** a CI job exists that builds/type-checks every consumer site against the current shared package; deliberately break a `web-shared` export on a scratch branch → CI fails on all consumer jobs. Revert.
  - Generalist appears in CI with the same gate as the other sites (closes the audit's PF-04 fail).

### W4b — Test harness *(ED-01 foundation)*

- **Decision (recommended): Vitest.** TS/ESM-native, near-zero config, fast; Jest would need transform config in every consumer. One root dev-dependency + a shared `vitest.config.ts` baseline; per-package/per-site `npm test` scripts.
- **Phase A test scope:** the shared package only — every module created in W1–W3 and Section 2 ships with its unit suite at birth (validator cases, header-builder snapshots, frontmatter manifest cases, and in Section 2: consent logic, id minting, `sanitiseEvents`, bot heuristic — all pure and trivially testable).
- **Explicitly deferred:** per-site compute tests arrive with GAP-2 (generalist has no pure compute modules to test until then); a Property suite would mean writing into `Property/` and waits for an explicit read-only exemption.
- **Acceptance:** `npm test` runs green in CI for `web-shared`; **ED-01 Verify (scoped):** break a constant in any shared module → a test fails. The site-level ED-01 verdict stays open until GAP-2, by design.

### W1 — Config loader validation *(PF-02 — lineage-wide: 7 sites)*

- **New module:** `packages/web-shared/lib/niche-config.ts`
  - **One canonical `NicheConfig` interface** — today 7 hand-copied interfaces have drifted (e.g. generalist adds `search_console_verification` + nav `children`; Property has `google_site_verification` as a flat string). **Pre-flight task:** diff all 7 interfaces; canonical type = superset with site-specific extensions optional. Required core (proposed): `niche_id`, `display_name`, `legal_name`, `domain`, `description`, `brand.primary_color`, `contact.{email,phone}`, `navigation[]`, `footer_links[]`, `content_strategy.{site_key, source_identifier, categories}`, `seo.locale`, `lead_form.{role_label, role_options[], placeholders}`. Everything else optional.
  - `validateNicheConfig(json: unknown): NicheConfig` — walks the required manifest; **throws naming the exact field path** (`niche.config.json: missing required field "contact.email"`). Import-time throw = build-time failure on SSG sites.
  - **Decision (recommended): hand-rolled walker, no zod** — zero new runtime dependency across 7 sites for ~80 lines of checks; the unit suite (W4b) carries the correctness burden.
- **Per-site adoption (6 sites + contractors-ir35 scaffold; Property excluded until exemption):** each `niche-loader.ts` becomes ~3 lines: import json → `export const niche = validateNicheConfig(nicheConfigJson)` → re-export the canonical type. Site-local `NicheConfig` interfaces deleted.
- **Acceptance — PF-02 Verify, run per adopted site:** delete a required field (e.g. `domain`) from the site config → build fails naming the field. Restore. Plus: all adopted sites build green unchanged (proves the canonical superset reconciliation was right).
- **Acceptance — error legibility (ratified condition of choosing hand-rolled over zod):** the validator must FAIL LOUDLY AND LEGIBLY on malformed configs, not merely accept good ones. Unit suite must cover at minimum: missing top-level field, missing nested field (`contact.email`), wrong type (`navigation` as object not array), empty-string required field, malformed entry inside an array (`role_options[1]` missing `label`) — each producing a single clear error naming the exact field path. If error clarity can't match zod for these cases, the zero-dep saving is forfeit and zod is adopted instead.

### W2 — Security header builder *(SEC-01/02/03 — lineage-wide: 6 sites)*

- **New module:** `packages/web-shared/lib/security-headers.ts`
  - `buildSecurityHeaders(opts)` returning the `headers()` entries; opts: `{ ga?: boolean; supabase?: boolean; clarity?: boolean; embedPrefix?: string | null; extraConnectSrc?: string[]; extraScriptSrc?: string[] }`. Emits the full SEC-01 baseline (HSTS preload, XFO/frame-ancestors, nosniff, referrer, permissions, CSP) and, when `embedPrefix` is set, the scoped frameable variant (SEC-03, Property's two-block pattern).
- **Standard-integrity note (user-verified 2026-06-10):** the documented-exception path is ORIGINAL to SEC-02 at v1-FINAL (`PROPERTY-CAPABILITY-STANDARD.md:129`, untouched by the Step-1 sweep) and consistent with §0's SHOULD-tier definition. No amendment to the frozen standard is made or needed. The exception note in the builder MUST state what bounds it (SSG constraint; framework inline runtime + GA bootstrap only; revisit trigger: rendering-model change), and the resulting verdict is documented-exception *partial* — never recorded as pass. `unsafe-inline` remains a real XSS surface and SEC-02 stays open on every audit until a rendering-model change permits nonces.
- **SEC-02 scope decision (approved):** full nonce-based CSP is **incompatible with these sites' static rendering** (a per-request nonce forces dynamic rendering; the estate is deliberately SSG). Phase A therefore ships:
  1. **Drop `'unsafe-eval'` in production** (it exists for dev tooling only; builder emits it solely when `NODE_ENV !== "production"`).
  2. **Keep `'unsafe-inline'` as a documented exception** written into the builder's header comment: required by Next.js inline runtime + GA bootstrap under SSG; revisit if/when the estate moves to PPR/dynamic.
  3. Trim per-site: GA/Supabase/Clarity sources emitted only when the site actually uses them (today every site ships GA + Supabase CSP entries regardless).
  - Under **SEC-02's Verify** ("no `unsafe-*` tokens **or** the audit records the documented exception and what bounds it"), this moves all six sites from *fail* to *documented-exception partial* — and any future full fix lands in one file.
- **Per-site adoption:** each `next.config.ts` replaces its inline blocks with the builder call (generalist: `{ ga: true, supabase: true }`, no embed prefix).
- **Acceptance:** SEC-01 Verify (all six headers present on a page response, per site) · SEC-02 Verify (prod CSP has no `unsafe-eval`; `unsafe-inline` exception documented in the shared module) · SEC-03 Verify (non-embed sites: framing denied everywhere; Property's embed exception reproduced exactly when it adopts) · header-builder snapshot tests green.

### W3 — Frontmatter validation *(CT-02 — lineage-wide: 6 sites)*

- **New module:** `packages/web-shared/lib/frontmatter.ts`
  - `assertFrontmatter(data, manifest, filePath)` — manifest is the site's required-field list with per-field shape checks (`date: ISO-parseable`, `category: non-empty string`, ...); throws `content/blog/foo.md: missing required frontmatter "date"`. Sites keep their own parse code and call this after `matter()`; silent `?? ""` defaults for required fields are deleted at adoption.
- **The corpus risk (this is the workstream's real work):** enabling validation against ~1,400 legacy posts (generalist 366, Property 420, Dentists/Solicitors/Medical ~150 each) may fail builds on day one. Sequence:
  1. **Pre-flight scan (read-only script, repo `scripts/`):** run every site's corpus through the proposed manifest; emit a per-site violation report. *This also satisfies the audit's standing wish for a generalist fact-base read.*
  2. Set each site's manifest to what its corpus SHOULD satisfy (proposed: `slug, title, date, category, metaDescription` required everywhere; provenance fields validated-if-present per CT-07).
  3. Where violations exist: a backfill sweep (per [[feedback_factual_backpatch_manager_direct]]-style manager-direct edits, or scripted for mechanical fields) lands BEFORE enforcement flips on for that site. No warn-mode limbo: a site adopts only when its corpus is clean.
- **Acceptance — CT-02 Verify, per adopted site:** strip `date` from one post → build fails naming file + field. Restore. Pre-flight report archived in `docs/<site>/`.

### GAP-7 exit criteria (Section 1 done =)

- CI builds + tests web-shared and **all** sites incl. generalist; a broken shared export fails CI (PF-04 ✅).
- All adopted sites: config blind cast gone (PF-02 ✅), headers from the shared builder (SEC-02 → documented exception), frontmatter enforced with clean corpora (CT-02 ✅).
- `web-shared` has a green unit suite covering every new module (ED-01 scoped ✅).
- Generalist audit verdicts flipped: PF-02, PF-04, CT-02 → pass; SEC-02 → documented-exception; ED-01 → partial (package-level).

---

## Section 2 — GAP-1: first-party analytics SDK into `web-shared`

Branch `phase-a-analytics-sdk`, after GAP-7 merges (CI net in place; SDK modules get W4b suites at birth). No schema work: `web_sessions`/`web_events`/`ingest_web_events` are site-keyed already. Property is source material only; its adoption of the SDK is a separately-approved later step (until then Property keeps its local copy — acceptable divergence window, bounded by GAP-3 which will need the SDK everywhere).

### 2.1 Extraction map (Property source → `packages/web-shared/analytics/*`)

| Property source (`Property/web/src/`) | Target | Parameterisation needed |
|---|---|---|
| `lib/analytics/types.ts` | `analytics/types.ts` | None — event allowlist, `INTERACTION_EVENTS`, `LIMITS` are site-agnostic by design (AN-03's single shared vocabulary) |
| `lib/analytics/consent.ts` | `analytics/consent.ts` | `ptp_consent` → `${storagePrefix}_consent`; tracking POSTURE becomes an init option (`"opt-out"` \| `"opt-in"`), documented per AN-01 with revert path in the module header |
| `lib/analytics/ids.ts` | `analytics/ids.ts` | `ptp_vid/ptp_sid/ptp_sid_ts` → prefix-derived; `legacyPrefix` one-time migration added here (see 2.2) |
| `lib/analytics/track.ts` | `analytics/track.ts` | Prefix via init; Clarity bridge kept (inert without `window.clarity`); experiments import becomes internal (next row) |
| `lib/experiments/{active,assign}.ts`, `components/experiments/useExperiment.ts` | `analytics/experiments/*` | Lift whole module (~100 pure lines) — `track.ts` hard-imports `activeExperimentString()` for EN-02's auto-stamping, so it travels with the SDK rather than dangling |
| `lib/analytics/autoCapture.ts` | `analytics/autoCapture.ts` | Audit its imports at execution (not yet read); same treatment as the rest |
| `lib/intent/session.ts` (visit memory: `bumpVisits`, `isReturning`, `recordEntryTopic`, `recordTopicVisit`) | `analytics/visitMemory.ts` | Storage keys prefix-derived; **topic derivation does NOT come along** — `deriveTopic` is site-specific taxonomy, injected via init (`deriveTopic?: (path: string) => string \| null`). Sites without a taxonomy pass nothing; topic features no-op |
| `lib/analytics/server/bots.ts` | `analytics/server/bots.ts` | Verbatim incl. the dated BotID/sendBeacon decision comments (ED-04); `botid` becomes an optional peer dep behind the existing dynamic `import()` + try/catch fail-open |
| `app/api/track/route.ts` | `analytics/server/createTrackHandler.ts` | Factory (2.3). **Hardening added:** handler takes the site's expected key and drops events whose `site_key` doesn't match (today any key is accepted) |
| `components/analytics/{ConsentProvider,ConsentedScripts,GoogleAnalytics,Clarity,WebVitals}.tsx`, `useFormTracking.ts` | `analytics/react/*` | Clarity + web-vitals as optional peer deps (dynamic import, inert when absent — generalist doesn't install them until wanted) |
| `components/analytics/AnalyticsProvider.tsx` | `analytics/react/AnalyticsProvider.tsx` | Three confirmed couplings to break: (1) intent imports → `visitMemory` + injected `deriveTopic`; (2) hardcoded `"Property Tax Partners"` title-suffix strip (`AnalyticsProvider.tsx:48`) → `siteName` from init; (3) no-track routes `/embed/*`,`/admin/*` → `noTrackPrefixes` init option (same defaults) |
| `components/analytics/ConsentBanner.tsx` | `analytics/react/ConsentBanner.tsx` | Ships unmounted-by-default (posture-dependent); a site choosing `"opt-in"` mounts it |

### 2.2 SDK init contract (single per-site config, set once in layout)

```ts
initAnalytics({
  siteKey: string,            // MUST equal the site's canonical key (PF-07)
  siteName: string,           // for title-suffix stripping (from niche config)
  storagePrefix: string,      // FROZEN at adoption; never changes thereafter
  legacyPrefix?: string,      // one-time read-old-write-new (see rule below)
  posture: "opt-out" | "opt-in",  // AN-01 documented decision, per site
  noTrackPrefixes?: string[], // default ["/embed", "/admin"]
  deriveTopic?: (path: string) => string | null,  // per-site taxonomy or absent
})
```

**Prefix-freeze / `legacyPrefix` contract (ratified at Part 3 review):** a site's `storagePrefix` is frozen at adoption. **Property adopts with `storagePrefix: "ptp"`** → its visitors' stored state is untouched, zero migration events. Sites with no prior SDK start fresh (generalist proposed prefix: `"hd"`). `legacyPrefix`, when set, performs exactly one-time read-old-write-new on init for TWO values only: a stored consent **`denied`** (compliance — an opt-out must never be orphaned) and the **visitor id** (continuity); session state is never migrated (30-min expiry). After copying, the SDK writes only new-prefix keys; legacy keys are left to rot harmlessly. Unit-tested in W4b (fresh visitor / legacy-denied / legacy-vid / both / storage-blocked cases).

### 2.3 Track-route factory

Per-site route file stays ~5 declarative lines (SEC-04 stays visible per-route):

```ts
// src/app/api/track/route.ts (per site)
import { createTrackHandler } from "@accounting-network/web-shared/analytics/server";
export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";
export const POST = createTrackHandler({ siteKey: <canonical key> });
```

Factory preserves Property's route semantics verbatim (AN-03 allowlist drop, AN-04 server re-caps, AN-05 edge-geo/no-IP, AN-06 UA-heuristic + `human_confirmed` + unconditional 204, AN-07 single RPC via service role) plus the new foreign-site-key drop. Env contract per site: `SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, documented in the site's `.env.local.example` (PF-05).

### 2.4 Optional third-party bridges

`botid`, `@microsoft/clarity`, `web-vitals` become **optional peer dependencies** of `web-shared`, loaded by dynamic import inside try/catch: a consumer that hasn't installed them builds and runs clean with those bridges inert (ED-03 fail-open applied to our own SDK). Property's installs already satisfy all three; generalist installs none at adoption (`web-vitals` recommended at composition for ED-07/OB-06).

### 2.5 Generalist composition checklist (after SDK lands)

Decisions first — both block step 2:
- **D1 — posture:** recommend `"opt-out"` (track-by-default, legitimate interest) matching the estate's documented posture; written into the consent config per AN-01. Operator may choose `"opt-in"` + banner instead.
- **D2 — canonical site key (PF-07 fix rides along):** recommend **`"general"`** everywhere — it matches the `leads.source` CHECK and all existing generalist lead rows; analytics tables are unconstrained text so nothing migrates. Set `content_strategy.site_key: "general"` in `niche.config.json` (today it says `"generalist"`), retiring the dual alias. (Newsletter table stays keyless until GAP-5 — known, accepted.)
- **D3 — GA4:** the "dark until GAP-1" decision lands here: first-party becomes the system of record at this step; operator separately decides whether to also set the GA id (ConsentedScripts makes it consent-gated either way).

Steps:
1. Env: add `SUPABASE_SERVICE_ROLE_KEY` (+ document all of it in `.env.local.example`).
2. `layout.tsx`: mount `ConsentProvider` + `AnalyticsProvider` with `initAnalytics({ siteKey: "general", siteName: "Holloway Davies", storagePrefix: "hd", posture: D1, noTrackPrefixes: ["/admin"] })` — no `deriveTopic` initially (topic features no-op).
3. Add the `/api/track` route wrapper (2.3).
4. `LeadForm.tsx`: wire `useFormTracking("lead_form")` (LD-02 telemetry), add the `company_url` honeypot with silent drop (LD-03), attach `visitor_id`/`session_id` to the payload (LD-05 activates). `SignupForm`: `subscribe_view`/`subscribe_submitted` events.
5. Mount `ConsentedScripts` (+ `WebVitals` if `web-vitals` installed) — GA/Clarity render only if ids set (D3).
6. Replace the bespoke `GoogleAnalytics.tsx` mount with the shared consent-gated one; delete the local component.
7. Write the SEC-08 rationale comment at each write surface (which bot control and why — honeypot on forms, UA heuristic on beacon ingest).
8. Calculator `calc_*` instrumentation: **explicitly deferred to GAP-2** (it lives in the shared renderer); TL-06 stays open until then.

### 2.6 Acceptance — §3 Verify lines verbatim (run against generalist post-composition)

- **AN-01:** "set the consent key to `denied` in devtools, interact with the page, and confirm no further beacons leave; clear it and confirm tracking resumes without reload. The posture decision is written in the consent module, not tribal."
- **AN-02:** "read the identity module: ids are random, the idle window is a named constant, and try/catch wraps all storage access. Two ids minted for the same visitor share no derivable structure."
- **AN-03:** "POST a batch containing an invented event name to the track endpoint; confirm no row lands. Grep client code for `track(` calls — every name must resolve to the allowlist type, not a raw string the type doesn't cover."
- **AN-04:** "with devtools network open, interact then close the tab — a final beacon fires on pagehide. Confirm the first tool/page view event reaches the store on a cold load (no race loss)."
- **AN-05:** "fire a tracked event with an email address in a prop value; confirm the prop is absent from the stored row. Confirm the events/sessions schema has no IP column."
- **AN-06:** "send a batch with a curl/bot UA → session row flagged bot; send a real-browser batch containing only a page_view → `human_confirmed` false; add a click event → true. Both requests receive identical 204s."
- **AN-07:** "confirm the ingest path is a single RPC call per batch; in the database, confirm anon/authenticated cannot execute it. Two concurrent batches for one session must not lose counter increments."
- **AN-08:** "inspect the events table: partitioned, retention documented, a future-month partition already exists, and an anon-key SELECT fails." *(pre-existing infrastructure — re-verified, not rebuilt; includes confirming the partition pre-create job covers the months ahead)*
- **AN-09:** "unset the third-party ids and build/run — no errors, no script tags. Opt out of tracking — no third-party script loads. Grep: nothing reads FROM the third-party tool into the site's own tables."

Plus the riding flips, by their own Verify lines: **LD-02** (form_error events land), **LD-03** (filled honeypot → indistinguishable success, no row), **LD-05** (test lead's row carries the browser's visitor id; journey view shows the conversion), **SEC-08** (every write surface has a control + in-code rationale), **PF-07** (single key `"general"` from config end-to-end — grep for any other literal).

### 2.7 Test additions (W4b suite grows with the SDK)

Pure-unit: consent state machine per posture · id minting + idle roll + `legacyPrefix` migration matrix · `scrubProps` (email/phone shapes) · `sanitiseEvents` (allowlist, envelope, caps, foreign-site-key drop) · bot heuristic fixtures · `buildSession` aggregation (human_confirmed flip, engaged-ms summation, scroll max) · experiments stamping.

### 2.8 Execution-time verifications & risks

1. `autoCapture.ts` import audit (unread; may carry further intent/site couplings — same untangle pattern as AnalyticsProvider if so).
2. Confirm the monthly partition pre-create job (Python, per AN-08 note) is running and not Property-scoped.
3. Generalist CSP: the shared header builder (W2) must include Supabase `connect-src` for beacon ingest — already in generalist's CSP today; re-verify after W2 adoption.
4. Divergence window: Property runs its local SDK copy until its adoption is approved — freeze feature work on Property's `lib/analytics` during the window (any change would have to be made twice).
5. Dashboard joins (GAP-3, Phase B) will filter `site_key = "general"` — D2 must land before any generalist data accrues, or early rows split across two keys.

### GAP-1 exit criteria (Section 2 done =)

Generalist emits sessions + events end-to-end (visible rows, human_confirmed flipping, leads stitched); all 2.6 Verify lines pass; audit verdicts flipped: AN-01..09 → pass, LD-02/03/05 → pass, SEC-08 → pass, PF-07 → pass, ED-07 vitals clause → capturing (if `web-vitals` installed). OB-03..06 remain open for GAP-3; TL-06 for GAP-2 — by design.
