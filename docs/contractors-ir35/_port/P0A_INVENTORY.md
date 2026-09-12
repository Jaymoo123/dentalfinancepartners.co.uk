# P0-A Inventory — contractors-ir35/web

All commands run from `contractors-ir35/web` unless stated. Anything not verified by a command below is marked UNVERIFIED.

## 0. Brief corrections (verify-against-source pushback)

- **§5/§6 of the brief assume `niche.config.json` lives inside `web/`. It does not.**
  `find . -iname "niche.config.json"` inside `web/` returns nothing; the file is at
  `contractors-ir35/niche.config.json` (site root, one level above `web/`), same pattern as
  every other niche site (`find C:\Users\user\Documents\Accounting -maxdepth 3 -iname niche.config.json`
  shows 18 sibling sites all with root-level `niche.config.json`). Loaded via `src/config/niche-loader.ts`.
- **§5 assumes a local `siteConfig` that duplicates values from `niche.config.json` and could disagree with it.**
  It does not. `src/config/site.ts` (`siteConfig`) is a thin derived object that reads every field
  straight off `niche` (from `niche-loader`) — there is no hardcoded second copy of any value, so
  there is nothing that can "disagree." No duplicated-value table is possible; this is a pass-through, not a fork.
- **My own first-pass importer grep (name-substring match) reported `ExitIntentModal` with
  importers=3.** Those 3 hits were comments/strings mentioning the name, not imports —
  `grep -rn "import.*ExitIntentModal" src` returns zero results and `<ExitIntentModal` (JSX mount)
  returns zero results. **`ExitIntentModal.tsx` is dead code** (see §2).

## 1. Routes — `src/app`

Command: `find src/app -type f | sort` (contractors-ir35/web)

### Public pages (`page.tsx`)
| Route | Renders |
|---|---|
| `/` | `src/app/page.tsx` — home; imports `@accounting-network/web-shared/components/ServiceTiers`, `StatsBar` |
| `/about` | About page |
| `/services` | Services; same shared `ServiceTiers`/`StatsBar` |
| `/ir35-status` | IR35 status page |
| `/for` (+ `/for/[slug]`) | Audience/persona pages |
| `/contact` | Contact page |
| `/blog`, `/blog/[category]`, `/blog/[category]/[slug]` | Blog index/category/post; post renders via `BlogPostRenderer` |
| `/calculators`, `/calculators/[slug]` | Calculator index/detail; detail mounts `CalculatorClient`, `CalculatorPageResources` |
| `/book` | Booking page (uses `BookingPicker`) |
| `/complete` | Post-booking completion, uses web-shared `lead-nurture/tokens` + `lead-nurture-shared` |
| `/thank-you` | Post-submit thank-you, uses web-shared `leads/capture-steps` |
| `/embed`, `/embed/[slug]` | Embeddable widget pages (`EmbedSnippet`, `EmbedAutoResize`) |
| `/glossary`, `/glossary/[slug]` | Glossary index/entry; data from local `data.ts` (raw-HTML entries) |
| `/locations`, `/locations/[slug]` | City pages; `data.ts` explicitly notes site is **remote/national, no physical office** |
| `/research` + 3 index pages (`uk-contractor-index`, `uk-contractor-insolvency-index`, `uk-contractor-survival-index`) | Data-journalism pages, each with its own `data/route.ts` API and its own chart component |
| `/resources/[topic]` | Gated resource page, mounts `ResourceGate` |
| `/privacy-policy`, `/terms`, `/cookie-policy` | Legal pages |
| `/admin/analytics`, `/admin/analytics/leads`, `/admin/analytics/login`, `/admin/analytics/trends`, `/admin/analytics/visitor/[visitorId]` | Internal admin console, entirely `@accounting-network/web-shared/console/*` |
| `/not-found` | 404 |

### Non-page routes
- `layout.tsx` — root layout; mounts `ReturningBar`, `DeepScrollModal` (intent surfaces, see §4), web-shared `ConsentProvider`/`AnalyticsProvider`/`ConsentedScripts`
- `sitemap.ts`, `robots.ts` — both read `siteConfig`
- `feed.xml/route.ts` — RSS via web-shared `content/feed`
- `llms-full.txt/route.ts` — via web-shared `content/llmsFull`
- `api/og/route.tsx` — OG image generation
- `api/track/route.ts` — web-shared `analytics/server/createTrackHandler`
- `api/admin/login/route.ts` — web-shared `console/consoleAuth`
- `api/leads/*` (book, booking-viewed, complete, confirm/[token], events, forwarded/[token], ics, inbound/email, inbound/twilio, optout/[token], submit) — all lead-lifecycle endpoints, all backed by `@accounting-network/web-shared/lead-nurture/*` and `/leads/server`
- `api/cron/*` (lead-nurture, lead-nurture-digest, lead-reconcile, lead-retention) — scheduled jobs, web-shared `lead-nurture/*`
- `research/*/data/route.ts` (x3) — JSON data endpoints backing the research pages

Route file count: `find src/app -type f | wc -l` = 60 (includes `globals.css`, which is not a route).

## 2. Components — `src/components`

Command per component: `grep -rl "<ComponentName" src --include=*.tsx` for mount points (JSX tag, not name-substring — see §0 correction), plus `grep -rn "import.*ComponentName" src` for importers.

35 files under `src/components` (`find src/components -type f | wc -l`).

| File | Importer(s) | Mount point(s) | Disposition |
|---|---|---|---|
| `analytics/ConsentToggle.tsx` | `layout/SiteFooter.tsx` | Footer | live |
| `blog/BlogListWithSearch.tsx` | blog index/category pages | blog list UI | live |
| `blog/BlogPostRenderer.tsx` | blog `[category]/[slug]` page (+ re-exports) | full post body | live, central renderer (see §7) |
| `blog/ExitIntentModal.tsx` | **none** | **none** — `grep -rn "import.*ExitIntentModal" src` = 0 hits, `grep -rn "<ExitIntentModal" src` = 0 hits | **DEAD** — defined, never mounted or imported. Referenced only in comments in `MiniCapture.tsx`, `DeepScrollModal.tsx`, `SpecialistWidget.tsx` describing a "shared session cap" that in this codebase is not actually wired to it |
| `blog/InlineMiniLeadForm.tsx` | `BlogPostRenderer.tsx` (3 call sites) | inline in post body | live |
| `blog/ToolIsland.tsx` | `BlogPostRenderer.tsx` | inline in post body | live |
| `brand/BrandWordmarkHomeLink.tsx` | `layout/SiteHeader.tsx` | header logo/home link | live |
| `calculators/CalcResultCta.tsx` | calculator result flow | mounts `MiniCapture` | live |
| `calculators/CalculatorClient.tsx` | `/calculators/[slug]` page | calculator shell | live |
| `calculators/premium/MobileToolSlot.tsx` | `PremiumCalculator.tsx` | mobile tool slot, mounts `MiniCapture` | live |
| `calculators/premium/PremiumBarChart.tsx` | `PremiumCalculator.tsx` | chart in premium calc | live |
| `calculators/premium/PremiumCalculator.tsx` | `CalculatorClient.tsx` | premium calc engine | live |
| `calculators/premium/PremiumUpgrade.tsx` | multiple calc surfaces | upgrade CTA | live |
| `calculators/premium/ResultGateModal.tsx` | `PremiumCalculator.tsx` | gate modal, mounts `MiniCapture` | live (capture surface, §4) |
| `embed/EmbedAutoResize.tsx` | `app/embed/[slug]/page.tsx` | embed iframe resize script | live |
| `embed/EmbedSnippet.tsx` | `app/embed/page.tsx` | embed snippet generator | live |
| `forms/BookingPicker.tsx` | `/book` page + booking flow | booking widget | live |
| `forms/DetailsForm.tsx` | booking/lead flow | contact-details step | live |
| `forms/LeadForm.tsx` | 12 importers across pages | primary lead form | live, core |
| `forms/MiniCapture.tsx` | 7 importers (`ExitIntentModal`(dead caller), `InlineMiniLeadForm`, `CalcResultCta`, `MobileToolSlot`, `ResultGateModal`, `ResourceGate`) | mini capture forms — see §4 | live |
| `intent/DeepScrollModal.tsx` | `app/layout.tsx` | global, mounted in root layout | live (capture surface, §4) |
| `intent/IntentProvider.tsx` | 7 importers | context/provider wiring intent state | live |
| `intent/NextStepOffer.tsx` | `BlogPostRenderer.tsx` | end-of-post offer | live |
| `intent/ReturningBar.tsx` | `app/layout.tsx` | global, mounted in root layout | live (capture surface, §4) |
| `layout/PageShell.tsx` | page wrapper used site-wide | mounts `SiteHeader`, `SiteFooter`, `StickyCTA`, `SpecialistWidget` | live, central shell |
| `layout/SiteFooter.tsx` | `PageShell.tsx` | global footer | live |
| `layout/SiteHeader.tsx` | `PageShell.tsx` | global header | live |
| `research/ContractorIndexCharts.tsx` | `research/uk-contractor-index/page.tsx` | index page charts | live |
| `research/ContractorInsolvencyCharts.tsx` | `research/uk-contractor-insolvency-index/page.tsx` | insolvency index charts | live |
| `research/SurvivalIndexCharts.tsx` | `research/uk-contractor-survival-index/page.tsx` | survival index charts | live |
| `resources/CalculatorPageResources.tsx` | `/calculators/[slug]` page | resource block on calc page, mounts `ResourceGate` | live |
| `resources/ResourceGate.tsx` | `/resources/[topic]` page + `CalculatorPageResources.tsx` | gated resource form, mounts `MiniCapture` | live (capture surface, §4) |
| `support/SpecialistWidget.tsx` | `PageShell.tsx` | global widget | live (capture-adjacent, §4) |
| `ui/Breadcrumb.tsx` | 15 importers | page breadcrumbs | live |
| `ui/StickyCTA.tsx` | `PageShell.tsx` | global sticky CTA | live (capture surface, §4) |
| `ui/layout-utils.ts` | 38 importers | shared layout helper (not a component) | live, heavily used utility |

**Dead components found: 1 (`blog/ExitIntentModal.tsx`)**. All other components have at least one real import + JSX mount.

## 3. `@accounting-network/web-shared` vs local

Command: `grep -rln "@accounting-network/web-shared" src` → 72 hits across route/component files (`grep -c` on the raw import lines above); files importing it: admin console pages, all `api/leads/*` and `api/cron/*` routes, `layout.tsx`, `page.tsx`, `services/page.tsx`, `thank-you/page.tsx`, `complete/page.tsx`, `feed.xml`, `llms-full.txt`, `track` route, and several components (`ConsentToggle`, `BlogPostRenderer`, `ExitIntentModal`).

Shared modules used: `console/*` (admin dashboard — entirely shared, no local admin UI), `lead-nurture/*` and `nurture/*` (entire lead lifecycle backend), `analytics/*` (consent, tracking, react providers), `content/*` (feed, llmsFull, TableOfContents, ReadingProgress, blog-splits), `components/ServiceTiers`, `components/StatsBar`, `leads/server`, `leads/capture-steps`.

**No local component duplicates a shared one by name** — `ServiceTiers`/`StatsBar` have no local counterpart under `src/components` (`grep -rl "ServiceTiers\|StatsBar" src/components` = no hits), confirmed by absence in the §2 component table. All 35 local components are functionally distinct from shared modules (lead forms, calculators, intent/capture surfaces, research charts, embed) — none is a same-named fork. No feature-by-feature fork comparison was needed because no name collision exists.

## 4. Capture / interruptive surfaces (baseline — do not add to this list without owner sign-off)

Command: `grep -rn "<ComponentName" src --include=*.tsx` per surface.

| Surface | Mount point | Status |
|---|---|---|
| `StickyCTA` | `PageShell.tsx:25` — global, every page using `PageShell` | live |
| `SpecialistWidget` | `PageShell.tsx:26` — global | live |
| `ReturningBar` | `app/layout.tsx:103` — root layout, global | live |
| `DeepScrollModal` | `app/layout.tsx:104` — root layout, global | live |
| `InlineMiniLeadForm` (wraps `MiniCapture`) | `BlogPostRenderer.tsx` lines 230/241/257 — 3 inline slots per blog post | live |
| `NextStepOffer` | `BlogPostRenderer.tsx:308` — end of blog post | live |
| `CalcResultCta` (wraps `MiniCapture`) | calculator result flow | live |
| `MobileToolSlot` (wraps `MiniCapture`) | `PremiumCalculator.tsx` — mobile only | live |
| `ResultGateModal` (wraps `MiniCapture`) | `PremiumCalculator.tsx:676` | live |
| `ResourceGate` (wraps `MiniCapture`) | `/resources/[topic]` page, `CalculatorPageResources.tsx` | live |
| `ExitIntentModal` (wraps `MiniCapture`) | **none — dead, not mounted anywhere** | **DEAD, do not treat as an existing surface** |

Note: `ExitIntentModal` being dead means this site currently has **no true exit-intent surface live**, despite the component existing in the tree. Per the working agreement, reviving/mounting it would be "adding a surface the site lacks" and needs owner sign-off — it is not currently part of the live baseline.

## 5. Config: local `siteConfig` vs `niche.config.json`

- `niche.config.json` lives at `contractors-ir35/niche.config.json` (site root, **not** under `web/` — brief was wrong, see §0).
- `src/config/site.ts` exports `siteConfig`, a derived pass-through of `niche` (loaded via `src/config/niche-loader.ts`) — every field (`name`, `legalName`, `domain`, `tagline`, `description`, `locale`, `url`, `contact`, `nav`, `footer`, `locations`, `company.*`) is read directly off `niche.*`, none hardcoded a second time.
- **There is no duplicated-value table to produce** — by construction they cannot disagree; `site.ts` has zero literal values sourced independently of `niche.config.json` (verified by reading the full file, `Read src/config/site.ts`).
- Test files consuming config: `src/lib/niche-config.test.ts` (asserts `niche.content_strategy.site_key === "contractors-ir35"`, `niche.brand.primary_color` starts with `#`, non-empty `domain`/`display_name`) and `src/lib/resources/resources.test.ts` (asserts the `ResourceGate` consent string equals `siteConfig.resourceConsentText` exactly — `grep -n siteConfig src/lib/resources/resources.test.ts`).

## 6. Navigation — `niche.config.json`

Command: `cat contractors-ir35/niche.config.json` (site root).

```json
"navigation": [
  { "label": "Services", "href": "/services" },
  { "label": "IR35 Status", "href": "/ir35-status" },
  { "label": "Who we help", "href": "/for" },
  { "label": "Blog", "href": "/blog" },
  { "label": "Contact", "href": "/contact" }
]
```

**Flat, 5 items, no children/groups.** `footer_links` is a separate flat list of 9 items (adds About, Privacy, Terms, Cookie policy). No IA authoring work is needed for a design port — nav is already flat and minimal; a redesign only needs to re-skin these 5 items, not restructure information architecture.

## 7. Blog frontmatter — `content/blog/*.md`

Command: `content/blog` file count via `ls content/blog/*.md | wc -l` = **62 posts**.

Non-empty-value counts (script parsed YAML frontmatter block per file, checked scalar values for empty-string/null/`[]`/`{}`, and for block-valued keys — `faqs`, `keyTakeaways`, `imageCredit`, `schema` — checked whether the following indented block actually has content):

| Key | Present (files) | Non-empty (files) |
|---|---|---|
| title | 62 | 62 |
| slug | 62 | 62 |
| date | 62 | 62 |
| updatedDate | 62 | 62 |
| author | 62 | 62 |
| image | 62 | 62 |
| altText | 62 | 62 |
| imageCredit | 62 | 62 (real photographer/source sub-fields) |
| category | 62 | 62 |
| metaTitle | 62 | 62 |
| metaDescription | 62 | 62 |
| h1 | 62 | 62 |
| summary | 62 | 62 |
| keyTakeaways | 62 | 62 (real list items) |
| sourcesVerifiedAt | 62 | 62 |
| **schema** | 61 | **0** — key present in 61 of 62 posts, value is always `''` (empty string) |
| faqs | 62 | 62 (real Q&A pairs) |
| primaryKeyword | 13 | 13 |

**This site does not repeat the previous port's `schema` trap.** `post.schema?.trim() || <computed FAQ JSON-LD>` in `BlogPostRenderer.tsx:57-61` correctly falls through to auto-generated FAQ structured data whenever `schema` is empty (which is always, on this site) — verified by reading `BlogPostRenderer.tsx` lines 41-67 and `src/lib/blog.ts:36` (`schema: fm.schema`). No duplicate structured data risk here, but flagging because the trap pattern (key "present" ≠ key "used") is the same shape — future edits to `BlogPostRenderer.tsx` around line 57 must preserve the `?.trim() ||` fallback or every post will silently lose its FAQ schema.

Renderer features keyed off frontmatter (`BlogPostRenderer.tsx`):
- `schema` → JSON-LD `<script>` (falls back to generated FAQ schema, see above)
- `faqs` → rendered FAQ accordion + feeds JSON-LD
- `keyTakeaways` → rendered "key takeaways" callout block
- `imageCredit.*` → photographer/source attribution line under hero image
- `sourcesVerifiedAt` → "verified" date line (via `formatUkDate`)
- `category` → breadcrumb, heading, and passed to `InlineMiniLeadForm` as `topic`
- `h1`, `summary` → page heading and lede
- `primaryKeyword` — only on 13/62 posts; **not observed to be read by `BlogPostRenderer.tsx`** in the grep above (only `blog.ts` maps it through as a field) — UNVERIFIED whether anything consumes it; likely metadata-only/unused field, would need a full-file read of `src/lib/blog.ts` and any SEO/schema builder to confirm before treating as load-bearing.
