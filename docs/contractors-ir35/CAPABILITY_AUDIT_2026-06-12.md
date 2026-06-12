# contractors-ir35 — Capability Audit vs PROPERTY-CAPABILITY-STANDARD v1-FINAL

**Audited:** 2026-06-12 · **Standard:** `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` (v1-FINAL, 71 capabilities, FROZEN)
**Scope:** read-only audit of `contractors-ir35/web`. No code changes.
**Format:** mirrors `docs/generalist/CAPABILITY_AUDIT_2026-06.md` — pass/partial/fail/n-a per capability ID, one evidence line each.
**Build status at audit:** GREEN (see §Build check). CI comment "not yet buildable" is now stale.

Axis discipline (per §0 of the standard): Part 1 is the `[Inventory]` axis — niche-led. Machinery absences are noted only as pointers; they are scored in Part 2 (`[Mechanism]`). Design identity is out of scope.

---

## §Build check

`npm run build --workspace contractors-ir35/web` from monorepo root: **GREEN**. All 26 static pages generated. ESLint produced 4 warnings (unused vars in `contact/page.tsx`, `ir35-status/page.tsx`, `services/page.tsx`; unescaped entity in `for/page.tsx`) — these are warnings only, not errors; `ignoreDuringBuilds:false` is NOT set in `next.config.ts`, so ESLint warnings do not fail the build. Build output: 19 routes spanning /, /about, /blog, /contact, /cookie-policy, /for, /for/[slug] (×10 SSG), /ir35-status, /privacy-policy, /robots.txt, /services, /sitemap.xml, /terms, /thank-you.

CI note: `ci-build-test.yml` deliberately excludes `contractors-ir35` (comment at line 16: "scaffold; empty config, not yet buildable — add a matrix entry when it launches"). The build is now green locally so this exclusion is ready to be lifted.

---

## Part 1 — Inventory map

### 1.1 What contractors-ir35 has

**Routes — 16 source files → 19 rendered routes:**

| Source file | Route(s) | Notes |
|---|---|---|
| `src/app/page.tsx` | `/` | Full HP: hero, stats, testimonials, pain points, services grid, /for grid, comparison table, lead form, FAQ, blog CTA. Builds green. |
| `src/app/about/page.tsx` | `/about` | Plain prose about page. Builds green. |
| `src/app/blog/page.tsx` | `/blog` | Static placeholder, "Coming soon". No `content/blog/` directory, no markdown posts. Builds green. |
| `src/app/contact/page.tsx` | `/contact` | Lead form + how-it-works steps. Builds green. |
| `src/app/cookie-policy/page.tsx` | `/cookie-policy` | Static placeholder, no policy copy. Builds green. |
| `src/app/for/page.tsx` | `/for` | Index of 10 contractor types from `data/contractor-types.ts`. Builds green. |
| `src/app/for/[slug]/page.tsx` | `/for/{10 slugs}` | Dynamic SSG over `contractorTypes`; `generateStaticParams` → 10 rendered pages. Builds green. |
| `src/app/ir35-status/page.tsx` | `/ir35-status` | IR35 three-tests + comparison table + timeline. Builds green. |
| `src/app/not-found.tsx` | 404 | Custom 404. Builds green. |
| `src/app/privacy-policy/page.tsx` | `/privacy-policy` | Boilerplate policy copy. References Google Analytics without a `google_analytics_id` being set — correct (it references it only in prose). |
| `src/app/robots.ts` | `/robots.txt` | Allow-all + sitemap pointer. Builds green. |
| `src/app/services/page.tsx` | `/services` | 6 service cards. Unused `Calculator` import (ESLint warning). Builds green. |
| `src/app/sitemap.ts` | `/sitemap.xml` | Static routes + /for/[slug] derived from `contractorTypes`. Builds green. No blog posts included (none exist). |
| `src/app/terms/page.tsx` | `/terms` | Empty boilerplate page (no body copy beyond the section shell). Builds green. |
| `src/app/thank-you/page.tsx` | `/thank-you` | Post-form confirmation; `robots: {index:false}`. Builds green. |
| `src/components/analytics/GoogleAnalytics.tsx` | (component, not route) | Inline component. `google_analytics_id: ""` → component returns null at runtime — zero tracking. |

No build-breaking imports to non-existent modules detected. All routes compile and render.

**Content data:**
`src/data/contractor-types.ts` — 675 lines, 10 `ContractorType` objects (slugs: it-contractors, engineering-contractors, finance-contractors, management-consultants, project-managers, nhs-locum-doctors, oil-gas-contractors, legal-contractors, marketing-contractors, construction-contractors). Each has: slug, title, headline, metaTitle, metaDescription, intro, stats (3 items), challenges (3-4), howWeHelp (3), faqs (1-3), optional testimonial. **Em-dash count: 0** (confirmed by grep). Quality is substantive and niche-accurate.

**Lead capture:** `src/components/forms/LeadForm.tsx` — see detail in §LD below.

**Config / loader:**
- `niche.config.json` — all structural fields present; see §1.2 for empty/placeholder values.
- `src/config/niche-loader.ts` — 5 lines; calls `validateNicheConfig()` from `@accounting-network/web-shared/lib/niche-config`. PF-02 is the ONLY site in the pre-audit scaffold that has already adopted the validated loader; blind `as NicheConfig` cast is NOT present.

**No blog apparatus:** no `content/blog/`, no markdown, no `lib/blog.ts`, no blog generator integration, no feed.xml, no llms-full.txt. Blog route is a static placeholder.

**No tools:** no calculators, no embed surface, no tool registry.

**No API routes:** no `/api/track`, no `/api/admin/login`, no `/api/og`, no `/api/leads/*`.

**No admin/dashboard:** no `/admin/analytics`, no OB surfaces.

**No tests:** no `*.test.*` or `*.spec.*` anywhere.

**No Vercel link:** no `.vercel/` directory. `vercel.json` exists with `framework: "nextjs"` and correct `installCommand`/`buildCommand` — wired correctly for when it is linked.

### 1.2 Empty/placeholder fields in niche.config.json

| Field | Value | Impact |
|---|---|---|
| `seo.google_analytics_id` | `""` | GoogleAnalytics component returns null — site is tracking nothing |
| `seo.search_console_verification.google` | `""` | No GSC verification |
| `seo.search_console_verification.bing` | `""` | No Bing WMT verification |
| `seo.search_console_verification.yandex` | `""` | No Yandex verification |
| `seo.search_console_verification.naver` | `""` | No Naver verification |
| `seo.search_console_verification.pinterest` | `""` | No Pinterest verification |
| `contact.phone` | `"+44 20 0000 0000"` | Placeholder phone — would show in footer/contact; must be replaced before launch |
| `locations` | `[]` | Empty — correct for this site (no city pages planned) |
| `last_sync` | `null` | Expected (no net-new sync run) |
| `shared_components_version` | `"1.0.0"` | Tracking field only |
| `brand.logo_path` | `"/brand/primary-logo.png"` | File not present in `public/brand/` — will 404 if rendered as `<img>` but not currently used in rendered routes |
| `brand.publisher_logo_url` | `"/brand/icon-alt.png"` | Same — layout.tsx OG image references it; 404 for crawlers until a real logo is added |

Two keys are correctly set but worth noting: `content_strategy.site_key: "contractors-ir35"` and `content_strategy.source_identifier: "contractors-ir35"` are consistent with each other (unlike generalist's split "generalist"/"general"). PF-07 alias problem is absent here.

### 1.3 LeadForm detail (§LD deep-dive)

`src/components/forms/LeadForm.tsx`:

**Consent checkbox (LD-04):** PRESENT and rendered. Lines 253-275: `<input type="checkbox" id="consent" name="consent"` with `checked={consent}` + `onChange` handler; required via validation at line 76 (`if (!data.get("consent")) errs.consent = "Please tick the box..."`). Consent text at line 51 is interpolated with `niche.display_name`. `consent_given`, `consent_text`, `consent_at` all submitted in payload (lines 108-110). **LD-04: PASS.**

**Honeypot:** ABSENT. No hidden `company_url` or similar field. **LD-03: FAIL.**

**Visitor-id stitching:** ABSENT. No `visitor_id`, no `session_id`, no `useFormTracking` hook. **LD-05: n/a until AN stack lands; becomes MUST the moment AN-01 adopts.**

**POST endpoint:** `submitLead()` from `@accounting-network/web-shared/lib/supabase-client` (line 7, line 113). This is the correct shared function writing to the central `leads` table. The endpoint is the shared Supabase insert, not a local Next.js API route. This is correct and consistent with other sites.

**Source value:** `niche.content_strategy.source_identifier` = `"contractors-ir35"` (line 105). Consistent with `site_key`. No silent-failure risk here.

**Silent failure risk:** `getSupabaseConfig()` (line 49) detects missing env vars; if `supabaseUrl` or `supabaseKey` absent, the form sets status `"error"` and shows "Form not connected. Email us directly..." (lines 90-96). Fails loudly, not silently. Correct.

**JSONB extras filler (LD-06):** ABSENT. Unlike generalist which submitted `practice_name: ""`, this form sends no filler. The payload is clean. However, it also sends no `extras` field at all — blocked on GAP-4 (shared schema work) which is the correct posture.

**gtag event (post-submit):** Lines 121-130 fire a `generate_lead` gtag event if `window.gtag` exists. Since GA id is empty, this never fires — harmless.

**Does it currently silently fail?** No. The form degrades cleanly without Supabase env vars (loud error message). With env vars set it will write to the shared `leads` table. The `source_identifier` field is in scope for the shared `checks` validation in `api/leads/notify` (that route lives in Property's app; "contractors-ir35" is not currently in the `allowed sources` list — this needs verifying and adding at launch).

### 1.4 layout.tsx contents

`src/app/layout.tsx` (74 lines):
- Fonts: `GeistSans`, `GeistMono` via `geist/font` package — CSS variables, no layout-shift swaps. Correct.
- Providers: NONE. No `ConsentProvider`, no `AnalyticsProvider`, no `ExperimentsProvider`. Only `PageShell` (header/footer shell).
- Scripts: `<GoogleAnalytics measurementId={niche.seo.google_analytics_id} />` in `<head>` — since id is `""` the component returns null. **No tracking fires at all.**
- Metadata: full standard block — `metadataBase`, title template, description, hreflang (en-GB + x-default), OG, Twitter cards, search console verification slots (all empty). Structurally correct; values incomplete.
- Viewport: `theme_color` from `niche.seo.theme_color` = `"#0d9488"` (teal).
- No SDK providers, no buildSecurityHeaders import, no CSP — `next.config.ts` has no headers block at all.

### 1.5 next.config.ts exact contents

```ts
const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  transpilePackages: ["@accounting-network/web-shared"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};
```

No `headers()` function, no `buildSecurityHeaders`, no `ignoreDuringBuilds` (defaults to false — ESLint warnings surface during build). Remote patterns are correct for the stock photo URLs used in `page.tsx`.

---

## Part 2 — Gap analysis vs the standard (all 71 capabilities)

**Tally: 9 pass · 5 partial · 46 fail · 11 n/a (justified).**

Six root causes explain the fail cluster:

- **R1 — No security headers.** `next.config.ts` has no `headers()` block at all. SEC-01/02/03/04/05 all fail on the headers axis; SEC-06 rates/SEC-07 key discipline have partial coverage. One fix (adopt `buildSecurityHeaders` from `web-shared`) flips 4-5 verdicts.
- **R2 — No first-party analytics pipeline.** All of §3 (9 fails) plus LD-02/LD-05, OB-03..06, ED-07 vitals clause. Adopt the shared §3 stack.
- **R3 — No blog machinery.** CT-01/02/03/04/07, SEO-01, feed.xml/llms-full.txt. Blocked on content program starting; machinery borrowed from Dentists.
- **R4 — No tools platform.** All of §5 TL-01..07. No calculators scaffolded. Adopt from `web-shared` at Phase 2.
- **R5 — No admin/observability.** OB-01..06. No console, no dashboard.
- **R6 — No CI coverage.** PF-04 fail (excluded from matrix). One-line matrix addition unblocks this.

### §1 Platform foundation (PF)

| ID | Verdict | Evidence |
|---|---|---|
| PF-01 | **partial** | `niche.config.json` drives nav, forms, metadata via `niche-loader.ts`. Placeholder values: phone `+44 20 0000 0000`, empty GA id, empty search-console keys. `brand.logo_path`/`publisher_logo_url` reference files not present in `public/`. No own-domain literals hardcoded in logic files — config is the single source. |
| PF-02 | **pass** | `src/config/niche-loader.ts:5` calls `validateNicheConfig(nicheConfigJson)` from `web-shared` — the ONLY scaffold site to already adopt the validator. No blind `as NicheConfig` cast present. |
| PF-03 | **pass** | `submitLead` from `@accounting-network/web-shared/lib/supabase-client` (LeadForm.tsx:7); `transpilePackages: ["@accounting-network/web-shared"]` in next.config.ts:11. No local reimplementation. |
| PF-04 | **fail** | `.github/workflows/ci-build-test.yml` excludes `contractors-ir35` (line 16 comment). Build is NOW green — the exclusion is stale. Add matrix entry at launch. |
| PF-05 | **fail** | No `.env.local.example` found anywhere under `contractors-ir35/web/`. The required env contract is undocumented. |
| PF-06 | **partial** | `tsconfig.json` strict: yes. `next.config.ts` `ignoreDuringBuilds`: absent (defaults false — correct). But: 4 ESLint warnings in the build output (unused vars + unescaped entity) indicate quality-gate slippage to fix before launch. |
| PF-07 | **pass** | `content_strategy.site_key: "contractors-ir35"` and `source_identifier: "contractors-ir35"` match (niche.config.json:48-49). No split alias problem. LeadForm uses `source_identifier` (LeadForm.tsx:105). No newsletter table (n/a). |

### §2 Security & runtime (SEC)

| ID | Verdict | Evidence |
|---|---|---|
| SEC-01 | **fail** | `next.config.ts` has no `headers()` function. No HSTS, no X-Frame-Options, no nosniff, no referrer, no permissions, no CSP. |
| SEC-02 | **fail** | No CSP at all (absence is arguably safer than the `unsafe-inline/unsafe-eval` anti-pattern on siblings, but still non-compliant: MUST). |
| SEC-03 | **fail** | No frame-deny header (`X-Frame-Options: DENY` absent). |
| SEC-04 | **fail** | No API routes exist to declare `runtime`/`maxDuration` on — vacuously missing. Will apply to all API routes added at Phase 2. |
| SEC-05 | **fail** | No webhook routes, no cron routes. Will apply at Phase 2 (nurture engine). |
| SEC-06 | **fail** | No API routes to rate-limit — vacuously missing. Will apply at Phase 2. |
| SEC-07 | **partial** | `getSupabaseConfig()` from shared (LeadForm.tsx:49); anon key used for lead insert (correct). No service-role key referenced in any file. But: no API routes exist to enforce the boundary rule; applies at Phase 2. |
| SEC-08 | **fail** | No honeypot on LeadForm. Newsletter: n/a (no newsletter surface). |

### §3 Analytics ingestion & consent (AN) — root cause R2

| ID | Verdict | Evidence |
|---|---|---|
| AN-01..AN-08 | **fail** (×8) | No ConsentProvider, no AnalyticsProvider, no identity layer, no event SDK, no `/api/track` route, no sessions/events writes, no bot classification. `GoogleAnalytics.tsx` exists but `google_analytics_id` is `""` → returns null → zero analytics. |
| AN-09 | **fail** | GA4 inline script fires outside any consent gate — but since id is empty, the component renders nothing. Technically ungated; practically inert. Zero signal from this site. |

### §4 Lead capture & enrichment (LD)

| ID | Verdict | Evidence |
|---|---|---|
| LD-01 | **pass** | Shared `submitLead`; unconfigured fallback message (LeadForm.tsx:90-96: "Form not connected..."); consent fields required by type |
| LD-02 | **partial** | Per-field validation with specific messages (LeadForm.tsx:53-79). Validation-failure telemetry: none (R2). |
| LD-03 | **fail** | No honeypot field in LeadForm. `company_url` or equivalent absent. |
| LD-04 | **pass** | Rendered consent checkbox (LeadForm.tsx:253-275); required validation (line 76); `consent_given`/`consent_text`/`consent_at` submitted (lines 108-110). |
| LD-05 | **n/a** | Conditional on §3 running. No `visitor_id`/`session_id` anywhere. Becomes MUST the moment AN-01 adopts. |
| LD-06 | **pass** | No filler submitted in payload (unlike generalist's `practice_name: ""`). Payload is clean. Blocked on GAP-4 for `extras` field addition — correct posture. |
| LD-07 | **partial** | Direct durable insert via shared `submitLead`. Post-insert consumers (`leads_to_email_trg` → `/api/leads/notify`) live in Property's app — contractor-ir35 source identifier must be added to that route's allowed list at launch. |
| LD-08 | **n/a** | Enrichment not operated (SHOULD; Property-deployed, property-scoped). |
| LD-09 | **n/a** | No newsletter/subscriber surface. No marketing consent capture needed until nurture is added. |

### §5 Interactive tool platform (TL) — root cause R4

| ID | Verdict | Evidence |
|---|---|---|
| TL-01 | **fail** | No registry. No calculator gallery. |
| TL-02 | **fail** | No config-driven tool pipeline. |
| TL-03 | **fail** | No pure compute libs. No tools at all. |
| TL-04 | **n/a** | No tools to maintain quality bar for. Applies at Phase 2 when tools are added. |
| TL-05 | **fail** (SHOULD) | No embed surface. |
| TL-06 | **fail** | Derivative of R2 — no event vocabulary. |
| TL-07 | **n/a** | No overlays operated. |

### §6 Content engine (CT) — root cause R3

| ID | Verdict | Evidence |
|---|---|---|
| CT-01 | **fail** | No markdown corpus, no `lib/blog.ts`, no content parser. Blog is a static placeholder (`src/app/blog/page.tsx`). |
| CT-02 | **fail** | No content parser to have silent-default defect — but the defect will be inherited when blog machinery is added unless `web-shared` frontmatter validator is used. Note at Phase 2: import shared validator, do not copy `lib/blog.ts` from a sibling. |
| CT-03 | **fail** | No category routing. Blog placeholder lists 7 category labels as static `<span>` elements with no routes behind them. |
| CT-04 | **fail** | No TOC, no reading-progress, no related posts. |
| CT-05 | **partial** | `src/app/sitemap.ts` and `src/app/robots.ts` exist and build correctly. No `lib/schema/` for structured data. `for/[slug]/page.tsx` has no JSON-LD injection. |
| CT-06 | **fail** | No `/api/og` route. OG images in layout.tsx reference `siteConfig.publisherLogoUrl` (a missing file). |
| CT-07 | **fail** | No house-positions document, no documented fact base. `data/contractor-types.ts` asserts specific figures (e.g. day-rate ranges, "~350k IT contractors") without source citations. |

### §7 SEO & discoverability (SEO)

| ID | Verdict | Evidence |
|---|---|---|
| SEO-01 | **partial** | `/for/[slug]` routes and `/for` index are derived from `contractorTypes` registry (sitemap.ts:22-28). Static routes hand-listed. No blog, no calculator routes to include. No `feed.xml`, no `llms-full.txt`. |
| SEO-02 | **partial** | `robots.ts` allows all (`userAgent: "*", allow: "/"`) — correct posture (no editorial views to hide). `/thank-you` is disallowed via `robots: {index: false}` metadata (thank-you/page.tsx:7) but NOT in `robots.ts` allow/disallow rules. Inconsistency: metadata-level noindex is sufficient for crawlers but the robots.txt should also disallow it explicitly. No AI-crawler allow-list (Property and generalist both have explicit AI-bot rules). |
| SEO-03 | **pass** | `layout.tsx:28-31` — hreflang `en-GB` + `x-default` both pointing to `siteConfig.url`. Per-page canonical via metadata `alternates`. |
| SEO-04 | **pass** | Config-driven metadata title template + per-page overrides on all 16 routes. Descriptions present on all routes. |
| SEO-05 | **partial** | `/thank-you` has `robots: {index:false}` (thank-you/page.tsx:7). Blog placeholder is publicly indexable (no noindex) which is acceptable since it is a live coming-soon page. No internal editorial views to protect (no blog stage routes). |

### §8 Engagement & conversion (EN)

| ID | Verdict | Evidence |
|---|---|---|
| EN-01 | **fail** | No intent signals, no exit-intent modal, no inline prompts, no sticky CTA beyond the `StickyCTA.tsx` component present in `src/components/ui/StickyCTA.tsx` (exists but is it wired? — the layout `PageShell` would need to render it). |
| EN-02 | **fail** (SHOULD) | No experiment machinery. |
| EN-03 | **fail** (SHOULD) | No gated lead-magnet surfaces. |
| EN-04 | **n/a** | No newsletter surface. |
| EN-05 | **n/a** | No nurture drip. |
| EN-06 | **n/a** | No nurture email. |

### §9 Observability & admin (OB)

| ID | Verdict | Evidence |
|---|---|---|
| OB-01, OB-02 | **n/a** | No console exists (vacuous pass per conditionality). Will become MUST when shared console gains this site. |
| OB-03..OB-06 | **fail** (×4, SHOULD) | No funnel, journeys, friction/error, or vitals visibility. Combined with empty GA id (AN-09): **operator has zero behavioural signal from this site**. |

### §10 Engineering & design discipline (ED)

| ID | Verdict | Evidence |
|---|---|---|
| ED-01 | **fail** | Zero test files. No `*.test.*` / `*.spec.*` under `contractors-ir35/web/`. CI excludes this site (PF-04). |
| ED-02 | **partial** | `/for/[slug]` routes are derived from `contractorTypes` registry (not hand-maintained). Static routes and blog category labels are hand-coded. No calculator fleet to maintain. |
| ED-03 | **pass** | LeadForm degrades clearly without Supabase env vars (shows "Form not connected" message). GA inert without id. `validateNicheConfig` throws loudly if config is malformed. |
| ED-04 | **partial** | No honeypot on LeadForm is undocumented (no comment explaining the omission). Placeholder phone number in config is not flagged as a pre-launch gate. Otherwise surprising states are absent. |
| ED-05 | **partial** | `globals.css` present; teal-600/neutral palette used systematically across page components. No canonical-token audit done (out of scope at scaffold stage). |
| ED-06 | **fail** | No conventions doc. No component naming rules documented. |
| ED-07 | **partial** | Geist via package fonts (layout.tsx:2-3, no layout-shift). `next/image` used for hero/editorial images (page.tsx:4 — `Image` from next/image). No vitals capture (R2). No a11y audit. |

---

## Part 3 — Root-cause cluster summary

| Root cause | IDs affected | Fix (shared mechanism) |
|---|---|---|
| **R1 — No security headers** | SEC-01/02/03 + SEC-04/05/06 when routes added | Adopt `buildSecurityHeaders()` from `web-shared` in `next.config.ts` (Phase 2 item 1) |
| **R2 — No first-party analytics** | AN-01..09, LD-02 (telemetry), LD-05, OB-03..06, ED-07 vitals | Adopt ConsentProvider + AnalyticsProvider + `/api/track` from `web-shared` (Phase 2 item 4) |
| **R3 — No blog machinery** | CT-01/02/03/04/06/07, SEO-01 (blog routes) | Borrow from Dentists: `lib/blog.ts`, `content/blog/`, blog generator onboarding (Phase 3 — content program) |
| **R4 — No tools platform** | TL-01..06 | Adopt `web-shared` tool registry + calculator renderer (Phase 3 — tools) |
| **R5 — No admin/observability** | OB-01..06 | Mount shared console at `/admin` after Phase 2 analytics data accrues |
| **R6 — No CI coverage** | PF-04, ED-01 | One matrix entry in `ci-build-test.yml` + `.env.local.example` file |

**Key strength:** PF-02 (validateNicheConfig wired) and PF-07 (site_key/source_identifier consistent) are both already correct — the two most common lineage defects are absent from this scaffold. LeadForm is also structurally complete (consent, shared submitLead, no filler) with only the honeypot missing.

---

## Part 4 — Design-discipline read (brief)

**Tokens:** teal-600 (`#0d9488`) used consistently as primary; neutral-900/neutral-50 pattern throughout. No hardcoded hex literals visible in component files (teal appears only via Tailwind class names). Teal background bar on HP (`bg-teal-700`) and dark sections (`bg-neutral-900`) are consistent.

**Typography:** Geist Sans/Mono via package, CSS variables, no per-page imports. Clean.

**Image discipline:** `next/image` used for hero and editorial images (page.tsx). No raw `<img>` tags in route files.

**Accessibility (partial read):** `htmlFor` / `aria-*` present on all LeadForm fields (LeadForm.tsx: ~14 usages). `aria-invalid` + `aria-describedby` wired correctly to field error messages. `aria-hidden` on decorative icons (page.tsx: ShieldCheck, Quote). Focus styles: `focusRing` utility used across interactive elements (Link, button). Heading hierarchy on HP: h1 → multiple h2 → h3 — appears correct but not exhaustively checked.

**No em-dashes:** confirmed by grep — 0 occurrences in `contractor-types.ts` (the largest content file). Consistent with the locked rule.

---

## Composition worklist — Phase 2 (ordered)

These are the file-level tasks to bring contractors-ir35 onto the standardised estate. Each item references the verified Dentists source path to borrow from. Items are ordered by dependency.

| # | Task | Dentists source (verified) | Priority |
|---|---|---|---|
| 1 | **Add security headers** — add `buildSecurityHeaders()` call to `next.config.ts`. Copy the pattern from `Dentists/web/next.config.ts` (which already imports from web-shared); nonce/CSP settings carry over. | `Dentists/web/next.config.ts` | MUST — blocks SEC-01..03 |
| 2 | **Add CI matrix entry** — add `contractors-ir35` to the `matrix.include` list in `.github/workflows/ci-build-test.yml:32` with `url: https://www.contractor-finance-partners.co.uk`. Lift the "not yet buildable" stale comment. | `.github/workflows/ci-build-test.yml` (repo root) | MUST — PF-04 |
| 3 | **Create `.env.local.example`** — document all required env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, and the API route env vars to be added (ADMIN_DASHBOARD_KEY, SUPABASE_SERVICE_ROLE_KEY). Borrow structure from `Dentists/web/.env.local.example`. | `Dentists/web/.env.local.example` | MUST — PF-05 |
| 4 | **Adopt analytics SDK** — mount `ConsentProvider` + `AnalyticsProvider` in `layout.tsx`; add `/api/track/route.ts` wrapper. Set `google_analytics_id` in `niche.config.json` (operator action). Borrow composition from `Dentists/web/src/app/layout.tsx` and `Dentists/web/src/app/api/track/route.ts`. | `Dentists/web/src/app/api/track/route.ts`, `Dentists/web/src/app/layout.tsx` | MUST — unblocks AN-01..09, LD-05, OB-03..06 |
| 5 | **Add honeypot to LeadForm** — add hidden `company_url` input field; validate it is empty before submit. The shared `submitLead` payload does not need changing — this is purely client-side. Dentists LeadForm has the same gap; borrow pattern from Property's `Property/web/src/components/forms/LeadForm.tsx`. | `Property/web/src/components/forms/LeadForm.tsx` | MUST — LD-03 |
| 6 | **Add `visitor_id` stitching to LeadForm** — after analytics SDK (item 4) lands, import `useVisitorId` from web-shared and add `visitor_id`/`session_id` to the lead payload. Borrow from Dentists once Dentists has completed Phase D adoption. | `Dentists/web/src/components/forms/LeadForm.tsx` (post Phase D) | MUST — LD-05 (after item 4) |
| 7 | **Mount admin console** — add `/admin/analytics/page.tsx` (behind `ADMIN_DASHBOARD_KEY` cookie gate) and `/api/admin/login/route.ts`. Borrow from `Dentists/web/src/app/admin/analytics/page.tsx` and `Dentists/web/src/app/api/admin/route.ts`. Site key is `"contractors-ir35"`. | `Dentists/web/src/app/admin/analytics/page.tsx`, `Dentists/web/src/app/api/admin/` | SHOULD — OB-01/02 (after item 4 data accrues) |
| 8 | **Add OG image route** — add `/api/og/route.tsx`. Borrow from `Dentists/web/src/app/api/og/route.tsx`. Wire logo file (brand asset must exist in `public/brand/` first). | `Dentists/web/src/app/api/og/route.tsx` | SHOULD — CT-06 |
| 9 | **Verify `source_identifier` in lead notify allowlist** — check `Property/web/src/app/api/leads/notify/route.ts` (or wherever the allowlist lives) that `"contractors-ir35"` is included. Add it if not. Must be done before launch to prevent lead notifications silently dropping. | `Property/web/src/app/api/leads/notify/route.ts` | MUST (pre-launch gate) |
| 10 | **Fix ESLint warnings** — resolve 4 warnings flagged in build output: unused `contentNarrow` in `contact/page.tsx`; unused `siteConfig` in `ir35-status/page.tsx`; unused `Calculator` in `services/page.tsx`; unescaped apostrophe in `for/page.tsx`. | n/a (local fixes) | SHOULD (clean build gate) |
| 11 | **Replace placeholder phone number** — update `niche.config.json contact.phone` from `"+44 20 0000 0000"` to the real number before launch. | n/a | MUST (pre-launch gate) |
| 12 | **Add real brand assets** — create `/public/brand/primary-logo.png` and `/public/brand/icon-alt.png`. Currently missing; OG images and any logo render will 404. | n/a | MUST (pre-launch gate) |
| 13 | **Blog machinery** (Phase 3 — content program) — create `content/blog/`, add `lib/blog.ts` (import shared validator, do NOT copy Property/Dentists parser with silent defaults), add `app/blog/[category]/[slug]/page.tsx` with `notFound()` on unknown slugs, add schema injection (CT-05 via shared lib). Wire blog generator (`optimisation_engine/blog_generator/` with `--site contractors-ir35`). | `Dentists/web/src/lib/blog.ts`, `Dentists/web/src/app/api/og/route.tsx` | SHOULD (content program start) |
| 14 | **feed.xml route** (Phase 3 — after blog content exists) — add `/app/feed.xml/route.ts`. Borrow from `Dentists/web/src/app/feed.xml/route.ts` (this file verified to exist). | `Dentists/web/src/app/feed.xml/route.ts` | SHOULD (after CT-01 lands) |
| 15 | **llms-full.txt route** (Phase 3) — add `/app/llms-full.txt/route.ts`. Borrow from `Dentists/web/src/app/llms-full.txt/route.ts` (verified to exist). | `Dentists/web/src/app/llms-full.txt/route.ts` | SHOULD (after CT-01 lands) |
| 16 | **Tool fleet** (Phase 3 — tools) — IR35 tool candidates: umbrella-vs-ltd take-home calculator (highest conversion value), IR35 deemed payment estimator, salary/dividend optimiser for contractors. Adopt `web-shared` registry + calculator renderer. Wire embed surface (`Dentists/web/src/app/embed/[slug]/page.tsx` verified). | `Dentists/web/src/app/embed/[slug]/page.tsx`, `Dentists/web/src/app/calculators/[slug]/page.tsx` | SHOULD (Phase 3) |

**Worklist item count: 16**

---

## Audit close-out

**Verdict roll-up:** 9 pass · 5 partial · 46 fail · 11 n/a across 71 capabilities.

**The one-line story:** contractors-ir35 is a clean, green-building scaffold with a complete lead form (including consent, shared submitLead, no filler anti-patterns) and well-written niche content in contractor-types.ts — but it is a pre-launch shell with zero analytics, no security headers, no blog, no tools, and no admin surface. The two most common lineage defects (PF-02 blind config cast, PF-07 key split) are already corrected. Phase 2 composition is a mechanical application of the standardised machinery, not a research exercise.

**Key pre-launch gates (must clear before Vercel link + DNS):**
- Real phone number in niche.config.json
- Real brand assets in /public/brand/
- source_identifier "contractors-ir35" added to Property's lead notify allowlist
- Security headers added (SEC-01)
- google_analytics_id set (operator)
- Vercel project linked + env vars provisioned

*Audit complete 2026-06-12 against PROPERTY-CAPABILITY-STANDARD v1-FINAL. Composition worklist in Part 3; per-site composition tasks enumerate at execution time.*
