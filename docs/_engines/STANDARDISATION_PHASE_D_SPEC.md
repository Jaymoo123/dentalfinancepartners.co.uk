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
