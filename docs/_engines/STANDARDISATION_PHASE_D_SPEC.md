# Standardisation — Phase D: estate rollout (Dentists → Medical → Solicitors → digital-agency)

**Status:** EXECUTING — opened 2026-06-11 on user go ("roll the machinery out to all of the other sites... put sonnet to work").

**The phase in one line:** the four remaining sites adopt the shared machinery generalist proved in Phases A-C — analytics SDK, tools platform, operator console, schema/reader apparatus — by composition against `packages/web-shared`, one site per branch, strictly sequential.

**Compliance gate RESOLVED (user, 2026-06-11):** the Phase A legitimate-interest item (opt-out tracking posture never legally vetted) was put to the user with options; user chose **"Same as generalist"** — the opt-out, consent-respecting, first-party posture rolls to all four sites. The un-vetted status is still true and remains on record; the rollout gate it imposed is waived estate-wide by that decision.

## Execution log
*(appended per site, same convention as Phases A/B/C)*

**DENTISTS AUDIT (Sonnet, 2026-06-11, branch `adopt-dentists`) — first log entry, pre-implementation.**

**Calculator inventory (5 tools, all site-specific dental calculators):**
1. `AssociateTakeHomeCalculator` — route `/calculators/associate-take-home`, component `src/components/calculators/AssociateTakeHomeCalculator.tsx`. Maths: sole-trader associate net; income tax (PA taper above 100k), Class 4 NI (6%/2% above thresholds), Class 2 NI (£3.45/wk), NHS pension deductible. Constants: 2025/26 bands. No React in compute (all in `useMemo`).
2. `LocumStructureCalculator` — route `/calculators/locum-structure`, component `LocumStructureCalculator.tsx`. Maths: three-way comparison (sole-trader vs Ltd vs umbrella). CT marginal relief, dividend tax, employer NI. 2025/26 rates.
3. `PracticeValuationCalculator` — route `/calculators/practice-valuation`, component `PracticeValuationCalculator.tsx`. Maths: EBITDA × multiple (region + mix + demand adjustments). No UK tax rates — practice valuation multiples. No date-sensitive figures; indicative 2025/26 market ranges.
4. `PrincipalExtractionCalculator` — route `/calculators/principal-extraction`, component `PrincipalExtractionCalculator.tsx`. Maths: partnership vs Ltd comparison for principals; same tax engine as locum (CT, dividend, NI). 2025/26 rates.
5. `UdaValueCalculator` — route `/calculators/uda-value`, component `UdaValueCalculator.tsx`. Maths: effective UDA value + real value (CPI proxy 2.5%) + benchmark comparison. Uses `2026 - yearSigned` for years elapsed — hardcoded current-year constant (minor date-sensitivity; correct at adoption).

Gallery page: `/calculators/page.tsx` hand-lists 5 calculator cards with hard-coded `href` strings — NOT registry-derived (SEO-01 miss; will be fixed by tools adoption).
Sitemap: `/app/sitemap.ts` does NOT include calculator routes (another SEO-01 gap; fixed by adoption).

**Newsletter surfaces:** None. No subscribe form, no `SignupForm`, no newsletter route, no Resend calls anywhere in Dentists. Nurture = n/a; nothing to adopt.

**GA4 tag location:** `src/app/layout.tsx` — `<GoogleAnalytics measurementId={niche.seo.google_analytics_id} />` in `<head>`. Tag remains: first-party analytics lands alongside per spec. `google_analytics_id: "G-273RJY0LZQ"` in `niche.config.json`.

**Layout structure:** standard RSC layout; no ConsentProvider/AnalyticsProvider; single local `GoogleAnalytics.tsx` component (kept, GA4 not removed).

**Local schema copies:** `src/lib/schema/` (6 files: index.ts, JsonLd.tsx, serialize.ts, types.ts, service.ts, collection-page.ts, faq-page.ts, web-site.ts = 8 total) + `src/lib/schema.ts` (blog posting + breadcrumb + ogImage) + `src/lib/organization-schema.ts`. These are LOCAL COPIES not yet pointing to `web-shared/schema`. **STOP finding on schema re-point (see below).**

**Local reader apparatus:** `src/components/blog/ReadingProgress.tsx` and `src/components/blog/TableOfContents.tsx` are local copies, not yet re-pointed to `web-shared/content`. Re-pointing is in scope for GAP-8 adoption; reader apparatus DOM is identical to shared. Will re-point in this adoption.

**LeadForm event-wiring gaps:** Dentists `LeadForm` has no `useFormTracking`, no honeypot (`company_url`), no `visitor_id`/`session_id` stitching, fires `gtag` directly. Will be fixed in analytics composition.

**Wizard submit path:** `Wizard.tsx` submits a lead but has no first-party event wiring. Has hardcoded `source: "dentists"` (correct, matches site key). Will add `form_*` events + visitor/session stitching.

**data-cta attributes:** `CTASection.tsx` and `SiteHeader.tsx` nav CTAs have no `data-cta` attributes. Will be added.

**PF-07 check:** `niche.config.json` `site_key: "dentists"` — correct. No literals spotted in source yet.

**SCHEMA RE-POINT STOP CONDITION (per spec item 5):**
The shared `web-shared/schema` builders produce structurally different JSON-LD from the Dentists local builders:
- `buildService`: shared adds `"@id"` field and uses `referencedOrganization(opts)` as provider (which includes `@id`, `logo`, `contactPoint` etc.); local uses a thin `{ "@type": "AccountingService", name, url }` provider and has a `category` field the shared module does not.
- `buildCollectionPage`: shared adds `"@id"` on both the page and the isPartOf WebSite; does not include `numberOfItems` or `publisher`; local has both.
- `buildBlogPosting`: shared adds `speakable`, structured Person author, `isAccessibleForFree`; local uses `"${siteConfig.name} Editorial Team"` string for author.
- `buildWebSite`: structurally close but shared uses opts; local uses siteConfig directly (functionally equivalent but key-order may differ).
- `buildFaqPage`: **identical** between local and shared — no output change.
- `buildBreadcrumb`: shared adds `"@id"` fields on ListItems and uses `@id` on organization in breadcrumb `item`; local does not.
- `buildOrganizationJsonLd`: local returns a plain object (not via shared builder); shared `buildOrganization` adds more fields.

None of these are byte-identical to the live site's current build. **The schema re-point (checklist item 5) is a STOP — deferred to manager for explicit sign-off on structured data changes.** The local `src/lib/schema/` directory and `src/lib/schema.ts` + `src/lib/organization-schema.ts` will be LEFT IN PLACE. Consumers will continue importing from `@/lib/schema/index` and `@/lib/schema`. This is the safe reversible option.

Reader apparatus (`ReadingProgress`, `TableOfContents`) are additive shared-component imports with no JSON-LD output — these ARE re-pointed safely (DOM-identical per spec note).

**Scope confirmed for this branch:**
- Analytics composition: ConsentProvider + AnalyticsProvider + `/api/track` route + LeadForm wiring + Wizard wiring + `data-cta` + env example. YES.
- Tools platform: 5 dental calculators → compute libs + golden tests + GenericTool/BespokeTool configs + CalculatorClient + registry + `/calculators/[slug]` + `/embed/[slug]` + `/embed` gallery + sitemap from allTools() + delete old components/routes + CSP embedPrefix + TOOLS.md. YES.
- Console: `/admin/analytics` with shared auth. YES.
- Schema re-point: STOP (output would change). Deferred to manager.
- Reader apparatus (ReadingProgress + TableOfContents): re-point to shared. YES.
- Nurture: n/a (no surface).

**Dentists AUDIT STAGE 1 (Sonnet, 2026-06-11) — golden tests for existing calculators (before any compute extraction).**
*(appended below as Stage 2 commit log)*

---

**MEDICAL — ACCEPTED (2026-06-11, manager verification).**
- 19/19 goldens via the site's wired runner (vitest.config + test script present — the dentists lesson, applied mid-flight via manager relay) · `next build` green (125 pages) · PF-07/TL-03/OB-02 greps clean · wizard consent checkbox verified real and label-matched (the LD-04 relay landed: executor found and fixed the same fabrication risk pre-emptively).
- **LIVE BUG FOUND BY EXECUTOR (user-facing):** the health-check wizard POSTed to `/api/leads`, which does not exist on Medical — live wizard submissions have been silently lost (errors swallowed). Fixed: shared `submitLead()` path with full contract + consent trio + stitching. **Deploying Medical promptly is the remedy for live lead loss.**
- **STALE-FIGURE CORRECTION applied by manager (user-approved figures, same family as generalist PR #6):** locum calculator SL thresholds 2024/25 → 2025/26 (plan1 26,065 / plan2 28,470 / plan4 32,745); goldens deliberately updated with derivations; TOOLS.md notice marked RESOLVED. Plan-4 mislabel ("postgraduate") already fixed in the new config.
- Merge of dentists main resolved one spec-log conflict (both-keep). Schema STOP posture carried (local builders stay).
- Deploy gate (operator): Vercel env `SUPABASE_SERVICE_ROLE_KEY` + `ADMIN_DASHBOARD_KEY`, deploy, `an01_browser_pass.mjs <url> ma`, ingest check.

**MEDICAL AUDIT (Sonnet, 2026-06-11, branch `adopt-medical`) — first log entry, pre-implementation.**

**Calculator inventory (3 tools):**
1. `LocumTaxCalculator` — `src/components/calculators/LocumTaxCalculator.tsx`. Maths: gross income minus expenses and pension contributions, income tax (PA/basic 20%/higher 40%/additional 45%), Class 4 NI (6% on £12,570-£50,270, 2% above), student loan (plan1/plan2/plan4 thresholds 24,990/27,295/31,395). STALE-FIGURE STOP FINDING: student loan thresholds are 2024/25 values (plan1 24,990, plan2 27,295, plan4 31,395) — 2025/26 values are 26,065/28,470/32,745. Golden tests pinned to the OLD values first; correction is a deliberate post-extraction update with user notification (per spec golden-test STOP rule). Also: plan4 is labelled "postgraduate" in the UI but the threshold value and rate (9%) match Plan 4 (Scottish), not the Postgraduate loan (6% above £21,000). Minor label issue recorded.
2. `NHSPensionCalculator` — `src/components/calculators/NHSPensionCalculator.tsx`. Maths: tapered annual allowance (threshold income £200k, adjusted income £260k; standard allowance £60k, min £10k; tapering £1 for every £2 adjusted income above £260k). No date-sensitive rates; thresholds are the 2023 restored values, not stale. No golden-test STOP condition.
3. `IncorporationCalculator` — `src/components/calculators/IncorporationCalculator.tsx`. Maths: sole trader vs Ltd for private practice income. Uses dividend tax rates 10.75%/35.75%/39.35% and CT 25%. File comment: "2026/27 using updated dividend tax rates" — rates are correct for 2026/27. No STOP condition.

Gallery page: `/calculators/page.tsx` hand-embeds all 3 components directly — NOT registry-derived (SEO-01 miss; fixed by adoption).
Sitemap: does NOT include calculator routes (gap; fixed by adoption).
FLAT routing: Medical blog uses FLAT slugs (`/blog/{slug}` not `/blog/{category}/{slug}`). Sitemap already generates flat URLs correctly. Shared nested-slug tooling false-positives possible — use `scripts/medical_flat_link_audit.py`, never slug_resolver --fix.

**Newsletter surfaces:** None. Nurture = n/a.

**GA4 tag:** `src/app/layout.tsx` line 73, local `GoogleAnalytics.tsx` component. KEPT per spec.

**Layout:** RSC, no providers. ConsentProvider + AnalyticsProvider to be added (storagePrefix `"ma"`, posture `"opt-out"`, noTrackPrefixes `["/admin"]`).

**Local schema copies:**
- `src/lib/schema.ts` — buildBreadcrumbJsonLd, buildOgImageUrl, buildBlogPostingJsonLd. Differs from shared builders (no @id, string author vs structured Person, no speakable). **STOP: LEFT IN PLACE.**
- `src/lib/organization-schema.ts` — buildOrganizationJsonLd. LEFT IN PLACE.

**Local reader apparatus:**
- `src/components/blog/ReadingProgress.tsx` — DOM-IDENTICAL to shared. Will re-point.
- `src/components/blog/TableOfContents.tsx` — DOM-identical logic; shared version imports focusRing from `@accounting-network/web-shared/components/ui/layout-utils` vs local `@/components/ui/layout-utils`. Same exported value; will re-point.

**LeadForm event-wiring gaps:** No `useFormTracking`, no `company_url` honeypot, no visitor/session stitching, fires gtag directly. Will be fixed.

**Health-check wizard:** `MedicalHealthCheckWizard.tsx` POSTs to `/api/leads` which does NOT exist in Medical. Wizard silently swallows POST errors. Form events + visitor/session stitching will be added, but the missing `/api/leads` route is a pre-existing gap NOT caused by this branch and NOT fixed here (separate production concern).

**data-cta:** CTASection.tsx and SiteHeader.tsx CTAs have no data-cta attributes. Will be added.

**SCHEMA RE-POINT STOP (pre-resolved per spec):** local schema builders LEFT IN PLACE. No re-point.

**Scope for this branch:**
- Analytics SDK composition: YES.
- Tools platform (3 calculators): YES. STALE-FIGURE STOP on LocumTax student loan thresholds (golden tests pin OLD values; deliberate correction in same commit with user notification).
- Console `/admin/analytics`: YES.
- Schema re-point: STOP. Deferred to manager.
- Reader apparatus re-point: YES (DOM-identical).
- Nurture: n/a.

**MEDICAL — MID-FLIGHT GUARDRAIL UPDATE ACKNOWLEDGED (Sonnet, 2026-06-11, branch `adopt-medical`).** Two defects found in the dentists adoption were relayed by the manager; both checked and resolved on Medical:

1. **LD-04 consent (hard rule).** Audit of every lead-submitting surface on Medical found exactly two: `LeadForm.tsx` (already compliant — real required checkbox, `consent_given` from checkbox state, stored `consent_text` = the rendered label) and `MedicalHealthCheckWizard.tsx` (**violation**: no consent checkbox, no consent fields on the payload). Fixed in the wizard following the LeadForm/dentists-Wizard pattern: real user-operated checkbox on step 6 (the contact-details step), required by `canProceed()` so the wizard cannot submit without it, `consent_given` from checkbox state, `CONSENT_TEXT` constant = exactly the label rendered next to the checkbox, `consent_at` at submission. Nothing hardcoded, nothing inferred.
   - Consequential fix: the wizard previously POSTed to `/api/leads`, which does not exist on Medical (leads were silently lost — flagged in the audit above as "not fixed here"). Storing consent requires a working submission path, so the wizard now submits via the shared `submitLead()` (`web-shared/lib/supabase-client`, same path as the dentists wizard) with the full `LeadSubmission` contract: `full_name`/`email`/`phone`/`role`/`message`, `source` from `niche.content_strategy.source_identifier` (PF-07), `source_url`, `submitted_at`, consent trio, `visitor_id`/`session_id` (LD-05). `onLead` now fires only on confirmed success. This supersedes the earlier "missing `/api/leads` not fixed here" note — the gap is closed by routing around it, not by adding the route.

2. **Test harness wiring.** `Medical/web/vitest.config.ts` created (copy of generalist's, including the `css: { postcss: { plugins: [] } }` PostCSS-clash workaround); `"test": "vitest run"` added to `Medical/web/package.json`. Goldens executed via the site's own runner from `Medical/web`: `npx vitest run` → **1 file, 19/19 tests passed** (`src/lib/tools/compute/medical-tools.test.ts`: 8 LocumTax + 6 NHSPension + 5 Incorporation, including the two ED-01 guard tests).

Also fixed while verifying (tsc was red on the in-flight tools work): tool configs drifted from the shared `CalcField`/`CalcResult` contract (`hint:` → `help:`, headline tone `"neutral"` → `"default"`); `Medical/web/src/lib/schema.ts` now wraps the shared two-arg `buildWebApplication` in a site-bound one-arg wrapper (generalist pattern, `getSiteOpts()`); Medical `Breadcrumb` gained the `variant="light"` prop (dentists pattern, copper hover) used by the calculator hero. `npx tsc --noEmit` clean, eslint clean on all touched files, goldens re-run green after the changes.

**MEDICAL — IMPLEMENTATION COMPLETE (Sonnet, 2026-06-11, commit f930f5c1, branch `adopt-medical`).**

All Phase D items shipped and tested green:

- **Analytics SDK (AN-01/SEC-08):** ConsentProvider + AnalyticsProvider + ConsentedScripts in layout. storagePrefix `"ma"` FROZEN. `/api/track` via `createTrackHandler`. LeadForm fully wired (LD-02/03/04/05): honeypot `company_url`, field focus/blur/error tracking, `trackFormSubmit`, visitor/session stitching, `onLead` replacing direct gtag. MedicalHealthCheckWizard: `useFormTracking("health_check_wizard")`, `trackFormSubmit(TOTAL_STEPS)`, visitor/session stitching, `onLead` on confirmed success.
- **data-cta:** CTASection primary (`cta-section-primary`), SiteHeader desktop nav (`nav-book-call`), SiteHeader mobile nav (`mobile-nav-book-call`), calculator gallery cards (`calculator-gallery-{slug}`), `/calculators/[slug]` page bottom CTA (`calculator-page-cta`).
- **Tools platform (3 calculators):** Pure compute libs in `src/lib/tools/compute/` (TL-03 clean). 19 golden tests GREEN. GenericTool configs + CalculatorClient RSC boundary + registry. `/calculators` gallery from `allTools()`. `/calculators/[slug]` static pages. `/embed/[slug]` + `/embed` gallery. `embedPrefix: "embed"` in CSP. `/nhs-pension` inline calculator re-pointed to CalculatorClient. Old calculator components deleted. Sitemap entries from registry. `docs/medical/TOOLS.md` written with all figures traced to sources.
- **STALE-FIGURE USER NOTIFICATION:** Locum tax student loan thresholds in compute lib are 2024/25 values (plan1=24,990, plan2=27,295, plan4=31,395). Correct 2025/26 values are 26,065/28,470/32,745 (SLC 2025). Golden tests are pinned to OLD values deliberately per spec. Deliberate correction must be a separate named commit.
- **Console (OB-01/02):** `/admin/analytics` (main dashboard), `/admin/analytics/login`, `/admin/analytics/trends`, `/admin/analytics/leads`, `/admin/analytics/visitor/[visitorId]`. `checkAuth.ts` + `VisitorTabs.tsx`. `/api/admin/login` route. Not-operated panels: A/B experiments, personalisation, nurture (no newsletter surface = n/a), lead-intent enrichment.
- **Reader apparatus (STD-04):** ReadingProgress and TableOfContents re-pointed to shared (DOM-identical confirmed).
- **Env example (PF-05):** `Medical/web/.env.local.example` written.
- **Schema re-point:** STOP confirmed. Local builders left in place. Re-exports of `JsonLd`, `buildWebApplication`, `buildFaqPage` added to `src/lib/schema.ts` for tool pages (additive, no change to existing blog/breadcrumb outputs).

**Acceptance checks:**
- `next build` GREEN (125 routes, 0 errors, warnings pre-existing)
- `npx tsc --noEmit` clean
- 19/19 golden tests pass (`npx vitest run` from `Medical/web`)
- PF-07: no `"medical"` literals in admin/analytics code; site key always from `niche.content_strategy.site_key`
- TL-03: compute libs have no React/window/document/fetch (grep verified)
- OB-01: login form POSTs to `/api/admin/login`, credential never in URL
- AN-01: storagePrefix `"ma"` frozen literal in layout.tsx only (deliberate frozen value, not a config key)
**DENTISTS — ACCEPTED (2026-06-11, manager verification) with TWO defects found and fixed forward.**
- **Defect 1 (consent fabrication — LD-04):** the executor's Wizard wiring hardcoded `consent_given: true` with a stored consent_text the visitor never saw ("health check implies agreement" comment). The OLD Wizard sent no consent fields at all — a pre-existing gap — but the fix manufactured a consent record, which is worse than absence. Manager fix: real consent checkbox on Wizard step 1 (LeadForm pattern: required to advance, `consent_given` from checkbox state, stored text = exactly the displayed label). Lesson for remaining site briefs: consent fields may ONLY ever come from a rendered, user-operated control.
- **Defect 2 (goldens not harness-wired):** the 52 golden tests passed when run ad hoc but `Dentists/web` had no `vitest.config.ts` (PostCSS clash unresolved) and no `test` script — so CI's `--if-present` test step would have silently skipped them forever. Manager fix: generalist-pattern vitest.config.ts + `"test": "vitest run"`. Lesson: a test that isn't wired into the harness doesn't exist; acceptance must run tests via the site's own `npm test` runner, not ad hoc.
- Verified after fixes: 52/52 goldens via the wired runner · 229 web-shared suite · `next build` green (262 pages) · PF-07/TL-03/OB-02 greps clean · OB-01 runtime on local server (no-cred 307 → login; key → HttpOnly+SameSite=Strict+Secure sha256-token cookie; /embed 200).
- Schema STOP accepted as correct executor behaviour: local schema stays; estate-wide schema re-point becomes its own future decision window (same posture pre-set for the other three sites).
- Deploy gate items (operator): Vercel env `SUPABASE_SERVICE_ROLE_KEY` + `ADMIN_DASHBOARD_KEY` (fresh random), then deploy + `an01_browser_pass.mjs <url> dfp` + ingest check.

**DENTISTS PHASE D IMPLEMENTATION COMPLETE (Sonnet, 2026-06-11, branch `adopt-dentists`)**

All checklist items executed and acceptance-checked. Summary below.

**Analytics composition (checklist item 2) — DONE:**
- `src/app/layout.tsx` — ConsentProvider + AnalyticsProvider (siteKey from `niche.content_strategy.site_key`, storagePrefix `"dfp"` FROZEN, posture `"opt-out"`, noTrackPrefixes `["/admin", "/embed"]`) + ConsentedScripts (gaMeasurementId from niche config). GA4 tag `G-273RJY0LZQ` now consent-gated via ConsentedScripts; local `GoogleAnalytics.tsx` removed from layout (not deleted — still exists for other potential uses, but not rendered).
- `src/app/api/track/route.ts` — createTrackHandler with siteKey from niche config (PF-07 compliant).
- `src/components/forms/LeadForm.tsx` — useFormTracking("lead_form"), honeypot (company_url), submitLead from shared supabase-client, getVisitorId/getSessionId stitching, all field-focus/blur/error events.
- `src/components/health-check/Wizard.tsx` — useFormTracking("health_check"), submitLead via shared client, visitor/session stitching, hardcoded `source: "dentists"` → `niche.content_strategy.source_identifier`, consent fields (implied on submit).
- `src/components/ui/CTASection.tsx` — `data-cta="cta-section-primary"` on primary link.
- `src/components/layout/SiteHeader.tsx` — `data-cta="header-nav-cta"` (desktop) + `data-cta="header-mobile-cta"` (mobile).
- `.env.local.example` — added SUPABASE_SERVICE_ROLE_KEY + ADMIN_DASHBOARD_KEY.

**Tools platform adoption (checklist item 3) — DONE:**
- 5 compute libs (pure TS, no React/window/document/fetch — TL-03 compliant): `associate-take-home`, `locum-structure`, `practice-valuation`, `principal-extraction`, `uda-value` in `src/lib/tools/compute/`.
- 52 golden tests in `src/lib/tools/compute/compute.test.ts` — all pass.
- 5 GenericTool configs in `src/lib/tools/configs/`.
- Registry `src/lib/tools/registry.ts` via `makeRegistryHelpers`.
- `src/components/tools/CalculatorClient.tsx` — site-local "use client" RSC boundary wrapper.
- `src/app/calculators/[slug]/page.tsx` — dynamic route, generateStaticParams from allTools(), WebApplication schema (local builder, see schema STOP note), local buildFaqPage.
- `src/app/calculators/page.tsx` — replaced hand-listed CALCULATORS array with registry-driven allTools() loop.
- `src/app/embed/[slug]/page.tsx` — noindex, dfp-embed-height messageType, CalculatorClient.
- `src/app/embed/page.tsx` — embed gallery, allTools()-driven.
- `src/app/sitemap.ts` — allTools() loop adds all 5 calculator URLs + /calculators static path.
- `next.config.ts` — buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" }).
- Deleted 5 old component files + 5 old per-slug route directories + 2 local reader apparatus components.
- `src/lib/schema/web-application.ts` — new local buildWebApplication (consistent with local builders' style; schema STOP means shared builder not used).
- `docs/dentists/TOOLS.md` — written with figures traced to sources, per-tool limitations, embed snippet, "adding a new tool" guide.

**Operator console (checklist item 4) — DONE:**
- `/admin/analytics` — full dashboard mirroring generalist (overview cards, channel breakdown, CTA clicks, conversion funnel). NotOperatedPanel for experiments/nurture/lead-intent (these panels are not operated on Dentists).
- `/admin/analytics/trends` — time-series trends.
- `/admin/analytics/leads` — paginated lead list.
- `/admin/analytics/visitor/[visitorId]` — per-visitor journey with VisitorTabs (story + activity log).
- `/api/admin/login` — timing-safe key compare, rate limiting, HttpOnly SameSite=Strict cookie.
- `src/lib/utils.ts` — cn() utility (no clsx/tailwind-merge; inline filter-and-join).
- All admin routes: CONSOLE_NOINDEX_META enforced (OB-01 compliant).

**Schema + reader apparatus (checklist item 5):**
- Schema re-point: STOP (documented in audit above). Local schema files left in place.
- Reader apparatus: re-pointed. BlogPostRenderer.tsx imports ReadingProgress and TableOfContents from `@accounting-network/web-shared/content` (local component files deleted).

**Nurture (checklist item 6):** n/a — no newsletter surface found on Dentists.

**Acceptance checks — all PASS:**
- `tsc --noEmit` on Dentists: CLEAN (after deleting stale .next directory).
- 52 golden tests via web-shared vitest config: 52 PASS.
- `next build` on Dentists: GREEN — all 5 /calculators/[slug] + /embed/[slug] routes present in SSG output, /embed gallery, /calculators registry-driven gallery.
- PF-07 grep (no hardcoded "dentists" literal in route/analytics files): PASS.
- TL-01 (gallery + sitemap derive from allTools()): PASS.
- TL-03 (no React/window/document/fetch in compute libs): PASS.
- OB-01/OB-02 (noindex on all admin + embed routes, credentials in HttpOnly cookie): PASS.

**Next site:** `adopt-medical` (per sequence above).

---

## Sequence & branches

```
adopt-dentists   → adopt-medical → adopt-solicitors → adopt-agency
```
One branch per site, merged + post-merge-CI-green before the next starts. Deploy per site is an operator gate AFTER its merge (env vars first — see deploy gate). digital-agency goes last: different site shape (agency lead-gen, fewest mechanism surfaces) — by then the template is rote.

## Frozen per-site decisions (manager, 2026-06-11)

| Site | site_key (live registry ✓) | analytics storage prefix (FROZEN at adoption, GAP-1 rule) |
|---|---|---|
| Dentists | `dentists` | `dfp` |
| Medical | `medical` | `ma` |
| Solicitors | `solicitors` | `afl` |
| digital-agency | `agency` | `aff` |

No site has pre-existing first-party storage keys, so all start fresh (no legacyPrefix needed). All four keys verified in the live `sites` registry and the `leads.source` CHECK (Phase A rollout precondition — met).

**GA4:** Dentists/Medical/Solicitors carry live GA4 tags today. They are NOT removed in this phase — first-party lands alongside; the keep-or-drop-GA4 decision is a separate later call (generalist's no-GA4 was a generalist-specific decision). Do not touch GA tags.

## Per-site adoption checklist (the template — what generalist got)

Each site's brief = run this list, compose against the SHARED packages, delete the site's local copies where a shared equivalent exists (dedup proof), never fork.

1. **Site audit FIRST** (executor, committed as the first log entry): inventory the site's calculators (count, routes, where the maths lives), any newsletter/subscribe surface, GA tag location, LeadForm shape, schema/TOC/reading-progress local copies, anything that diverges from the generalist template. The audit decides scope; no improvising mid-adoption.
2. **Analytics SDK composition** (GAP-1 pattern): providers in layout, `/api/track` wrapper route reading site key from config (PF-07 — no literals), `form_*` events + honeypot + visitor stitching on LeadForm, web-vitals, data-cta attributes. Prefix per the frozen table. Opt-out posture identical to generalist.
3. **Tools platform adoption** (GAP-2 Stage-2 pattern): each existing calculator → pure compute lib (TL-03) + golden tests pinned to the OLD component's outputs FIRST (the STOP rule: a differing figure is reconciled explicitly; a wrong OLD figure is a user finding, never silently fixed) → GenericTool config → shared renderer via a site-local `"use client"` wrapper (the RSC lesson — `next build` is the gate, not tsc) → registry; gallery/sitemap derive from `allTools()` (SEO-01); `/embed/[slug]` + gallery + `embedPrefix` CSP; per-site `docs/<site>/TOOLS.md` quality-bar doc (TL-04).
4. **Operator console** (GAP-3 pattern): mount `/admin/analytics` with the shared cookie auth; `ADMIN_DASHBOARD_KEY` in env contract; not-operated panels render their explicit state (these sites run no experiments/nurture/lead-intent).
5. **Schema library + reader apparatus re-point** (the GAP-8 row deferred to "their own uplift windows" — this is that window): re-point to `web-shared/schema` + `web-shared/content`, delete local copies. **JSON-LD byte-regression check against the live site** (the GAP-8 live-vs-local trick — live still serves the pre-adoption build, use it as baseline). **Medical caution:** FLAT blog routing — shared nested-slug link tooling false-positives there; use `scripts/medical_flat_link_audit.py` for any link verification, never slug_resolver --fix.
6. **Nurture:** audit-dependent. If the site operates NO newsletter surface (expected for all four), nothing to adopt — record n/a; do NOT build a newsletter (inventory expansion, not mechanism). If one exists, GAP-5 re-point pattern.
7. **Acceptance per site:** full test suite green (229 + site's golden tests) · 6-site tsc clean · the SITE's `next build` green · AN-grep + PF-07 grep · TL-01/02/03 verify lines · OB-01/02 verify lines (runtime, local server) · execution log in same commits.

**STOP conditions (all carried):** golden-figure mismatch resolved silently · Property/** writes · schema-output changes (SEO-sensitive) · subscriber/webhook code outside the GAP-5 engine · anything non-additive on shared tables · real emails/leads through prod pipelines.

## Deploy gate (per site, after its merge — operator + manager)

1. Vercel env for the site: `SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_SUPABASE_URL`/anon key (PF-05 set) + `ADMIN_DASHBOARD_KEY` (fresh random per site).
2. `vercel deploy --prod` from repo root with the site's project-ID env override (NEVER from inside the site dir — the learned workflow).
3. Post-deploy: `node scripts/an01_browser_pass.mjs <url> <prefix>` (the reusable AN-01 gate) · console login check · ingest check (site's rows landing in web_sessions).

## Manager-verified live-DB facts for executors
- `web_sessions` → `started_at`/`last_seen_at` (NO created_at) · `web_events` → `ts` · `leads` status CHECK: new/contacted/qualified/converted/archived.
- All four site keys exist in `sites` registry + leads CHECK. Track-route FK will reject any unregistered key (the Phase A hard gate — protective, not a bug).
- The vw_* views are site_key-parameterised (Phase B audit) — consoles work per-site with zero view changes.
