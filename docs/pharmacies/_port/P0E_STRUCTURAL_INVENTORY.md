# P0E — pharmacies port, structural and disposition inventory

Instrument: `next start` on http://localhost:3111 (curl only, read-only). Repo
root git read-only, nothing run. No edits outside this file. No subagents used.

---

## 0. False premises in this brief

1. **`storagePrefix` is `"pfp"`, not `"phfp"`.** Confirmed in `src/app/layout.tsx`:
   `<AnalyticsProvider ... storagePrefix="pfp" ...>`. The brief's "storage prefix
   phfp" is wrong; carry `pfp` into section 8 and phase 1, do not rename it
   mid-port (that would split the site's local-storage history at the cutover).
2. **"22 markdown posts" — true**, but the distribution is lopsided and does not
   match the config: 7 Buying, 7 NHS Contract and Income, 3 Selling, 3 Locum, 2
   VAT. `niche.config.json` `content_strategy.categories` lists **7** category
   names; only **5** are used by any live post. "Pharmacy Payroll" and "Business
   Structure and Incorporation" have zero posts. Not a defect in this brief, but
   corrects an implicit assumption that categories ≈ posts 1:1.
3. **"3 calculators ... on a local CalculatorClient" — true but it understates
   kit adoption.** `CalculatorClient.tsx` imports the kit
   `@accounting-network/web-shared/tools/components/Calculator` directly; all
   three tools route through the kit's own `Calculator` render, same as
   hospitality's pattern. This is a design-kit import, not purely local, and
   should be read that way in phase 4 scoping (narrower: styling parity, not
   first adoption).
4. **"2 research pages" — true** (`pharmacy-density-and-workload-index`,
   `pharmacy-openings-closures-index`), both in the sitemap.
5. **"26 page.tsx (21 public incl. dynamic, 5 admin)" — the total and admin
   count are right (26, 5), but the public breakdown is off by one static vs
   dynamic split worth stating plainly**: 15 static public routes + 6 dynamic
   public templates (`for/[slug]`, `services/[slug]`, `calculators/[slug]`,
   `blog/[category]`, `blog/[category]/[slug]`, `embed/[slug]`) = 21 public
   file-routes, matching the brief's "21". Confirmed by `find src/app -name
   page.tsx` → 26 total.
6. **Data record counts in the brief were not given, but a naive `grep -c
   "slug:"` on the data files over-counts** (10 hits in services, 7 in hubs) —
   those files also declare `slug: string` in a type alias line 2. The real
   counts, read from the actual array literals and confirmed against rendered
   `/services` and `/for` link lists, are **8 services, 5 hubs** (see §2).
7. No other false premise found; "local SiteHeader, SiteFooter, StickyCTA added
   2026-09-28" is close but the files are dated **2026-10-02** by `git log`
   (last-touch date), not 09-28 — minor, noted for the record, not acted on.

---

## 1. Route census

| Route | Pattern | Concrete URLs | In sitemap? | Family |
|---|---|---|---|---|
| `/` | static | 1 | yes | home |
| `/services` | static | 1 | yes | hub |
| `/services/[slug]` | dynamic, `pharmacies-services.ts` (8 records) | 8 | yes (8) | detail |
| `/for` | static | 1 | yes | hub |
| `/for/[slug]` | dynamic, `pharmacies-hubs.ts` (5 records) | 5 | yes (5) | detail |
| `/blog` | static | 1 | yes | blog list |
| `/blog/[category]` | dynamic, derived from post frontmatter (5 live categories) | 5 | yes (5) | blog hub |
| `/blog/[category]/[slug]` | dynamic, `content/blog/*.md` (22 posts) | 22 | yes (22) | blog post |
| `/calculators` | static | 1 | yes | calculator hub |
| `/calculators/[slug]` | dynamic, `registry.ts` (3 tools) | 3 | yes (3) | calculator |
| `/research/pharmacy-openings-closures-index` | static | 1 | yes | research |
| `/research/pharmacy-density-and-workload-index` | static | 1 | yes | research |
| `/embed/[slug]` | dynamic, calculator registry | 3 | **no** | embed (bare, by design) |
| `/about` | static | 1 | yes | funnel-adjacent |
| `/contact` | static | 1 | yes | funnel |
| `/book` | static | 1 | **no** | funnel |
| `/thank-you` | static | 1 | **no** | funnel (noindex) |
| `/complete` | static | 1 | **no** | funnel (noindex) |
| `/privacy-policy`, `/cookie-policy`, `/terms` | static | 3 | yes (3) | legal |
| `/admin/analytics`(+login/leads/trends/visitor/[id]) | static x4 + dynamic x1 | 5 (admin, noindex-gated) | no | admin |

**Sitemap total: 55** (curl-confirmed, `<loc>` count). Breakdown:
12 static + 8 services + 5 hubs + 3 tools + 5 category hubs + 22 posts = 55. Matches
exactly, no discrepancy.

**Served-but-not-sitemapped** (by design, same pattern as hospitality): `/book`,
`/thank-you`, `/complete` (funnel/noindex), `/embed/[slug]` (bare embed surface).

**26 `page.tsx` total**: 21 public file-routes (15 static + 6 dynamic families)
+ 5 admin, confirmed by `find src/app -name page.tsx`.

---

## 2. Content model

**22 posts by category** (frontmatter `category:`, confirmed by grep):

| Category | Count |
|---|---|
| Buying a Pharmacy | 7 |
| NHS Contract and Income | 7 |
| Selling a Pharmacy | 3 |
| Locum Pharmacists | 3 |
| VAT and Retail Schemes | 2 |
| **Total** | **22** |

`niche.config.json` `content_strategy.categories` declares **7** names; two
(`Pharmacy Payroll`, `Business Structure and Incorporation`) have **zero** live
posts — config/content drift, same shape as the hospitality finding, not a
routing defect today (category pages derive from frontmatter, not the config
array).

**`src/data/*` record counts** (actual array literals, not grep-c):

| File | Records |
|---|---|
| `pharmacies-services.ts` | 8 (`pharmacy-purchase-accounting`, `pharmacy-sale-cgt-badr`, `pharmacy-valuation-goodwill`, `nhs-payment-reconciliation-fp34`, `pharmacy-vat-retail-schemes`, `pharmacy-payroll-workforce`, `pharmacy-incorporation-structure`, `pharmacy-benchmarking-margin`) |
| `pharmacies-hubs.ts` | 5 (`pharmacy-owners`, `buying-a-pharmacy`, `selling-a-pharmacy`, `pharmacy-groups`, `locum-pharmacists`) |
| `pharmacy-ch-formations-index.{csv,json}`, `pharmacy-density-by-region.json`, `pharmacy-dispensing-workload.json`, `pharmacy-openings-closures-{index,monthly}.json` | research datasets, not page-generating records |

**`niche.config.json` keys relevant to the port:**

| Key | Value |
|---|---|
| `display_name` | `"Pharmacy Tax"` |
| `domain` | `www.pharmacytax.co.uk` |
| `brand.primary_color` | `#0f3a4a` |
| `brand.logo_path` | `/brand/logo.png` (asset missing, see §5) |
| `cta.sticky_primary` | `"Speak to a pharmacy finance specialist"` |
| `cta.sticky_secondary` | `"Free, no-obligation reply within 24 hours"` |
| `cta.sticky_button` | `"Get in touch"` |
| `blog.cta_heading` | `"Need help with your pharmacy finances?"` |
| `blog.cta_body` | `"Tell us about your situation and we will come back within 24 hours."` |
| `blog.cta_button` | `"Get in touch"` |
| `footer_links` | Contact, Blog, Privacy Policy, Cookie Policy, Terms (5 items) |
| `navigation` | Services, For, Research (→ `/research/pharmacy-openings-closures-index`, NOT `/research`), Blog, About, Contact (6 items) |
| `entity.firm` | full "Pharmacy Tax is a UK accounting practice..." firm-voice paragraph, names Ashfield Trading Ltd, co. no. 16358723 |
| `content_strategy.source_identifier` | `"pharmacies"` — confirmed consumed at `LeadForm.tsx:148` (`source: niche.content_strategy.source_identifier`), not stale |
| `locations` | `[]` (empty, same as hospitality — any `companyItems`/`navigation` default carrying `/locations` 404s) |
| `contact.phone` | `+44 20 0000 0000` (placeholder, same pattern flagged on other ports) |

---

## 3. Component inventory and disposition

| File | Role | Disposition |
|---|---|---|
| `src/components/layout/SiteHeader.tsx` | local header, desktop nav + mobile drawer toggle, own CTA | **ADOPT-KIT** → `packages/web-shared/design/chrome/SiteHeader.tsx`. Local file is a self-contained reimplementation (own `focusRing`, own drawer state, own brand-hex-literal `#0f3a4a` styling) with no kit focus trap, no `wordmarkAccentColor` prop wiring. Replace in phase 1. |
| `src/components/layout/SiteFooter.tsx` | local footer, 2-column (brand + quick links), legal line | **ADOPT-KIT** → `packages/web-shared/design/chrome/SiteFooter.tsx`. Single flat `siteConfig.footer` list (5 items), no Resources/Company split today — straightforward to re-key onto kit's `resourcesHref`/`companyItems` props (see §5). |
| `src/components/ui/StickyCTA.tsx` | bottom sticky bar, scroll-triggered (>30%), dismissible | **OWNER-DECISION**. This is the site's only one of the four owner-decided interruptive surfaces (SpecialistWidget, DeepScrollModal, ReturningBar, StickyCTA) that exists today, and it exists in a bespoke local form, not the kit shape. No `SpecialistWidget`, `DeepScrollModal`, or `ReturningBar` found anywhere (`grep` for all four names and for `Modal\|Banner\|Popup\|ExitIntent` → 0 hits besides StickyCTA itself). Flag for owner: keep local, restyle, or adopt a kit sticky-CTA equivalent if one exists. |
| `src/components/ui/Breadcrumb.tsx` | local breadcrumb primitive | **ADOPT-KIT** → `packages/web-shared/design/primitives/Breadcrumb.tsx` (has `tone` prop added 2026-09-29 for on-brand/on-dark grounds — check `#0f3a4a` contrast if adopted on a dark band). Only 1 live breadcrumb hit observed (`/privacy-policy`), so usage is thin; confirm other routes before assuming parity. |
| `src/components/ui/layout-utils.ts` | local `focusRing`, `siteContainerLg`, `btnPrimary` helpers | **RETIRE in favour of kit** → `packages/web-shared/design/layout-utils.ts` exists and is the canonical source; local file duplicates the pattern (same shape as every other port's finding on this file). Confirm the kit's `focusRing` string matches before a blind swap (it carries the shared `--kit-focus-ring` custom property per playbook §8). |
| `src/components/calculators/CalculatorClient.tsx` | thin client wrapper mounting kit `Calculator` | **KEEP** (already ADOPT-KIT for the inner component; wrapper itself is the per-site glue every port keeps). |
| `src/components/calculators/MiniCapture.tsx` | local capture form shown after a calculator result | **OWNER-DECISION / flag for phase-4 grep**, fork-vs-shared status not confirmed this pass (same open item hospitality logged for its own `MiniCapture.tsx`) — imports `web-shared/analytics/ids` only, not a kit MiniCapture component by that exact name found under `packages/web-shared`. |
| `src/components/calculators/CalcResultCta.tsx` | thin wrapper around local `MiniCapture` | **KEEP**, local glue, same shape as hospitality. |
| `src/components/forms/LeadForm.tsx` | main contact-page lead form | **KEEP-AND-RESTYLE**. Imports kit `useFormTracking`, `track`, `getVisitorId`/`getSessionId`, `buildThankYouUrl` — plumbing-adopted already; no kit design component replaces the form markup itself. |
| `src/components/forms/BookingPicker.tsx`, `DetailsForm.tsx` | `/book` funnel steps | **OWNER-DECISION**, not checked against kit `leads/capture-steps` (imported elsewhere in the codebase) for overlap — flag for phase 1 grep, same open item hospitality logged. |
| `src/components/blog/InlineMiniLeadForm.tsx` | wrapper around... (see note) | **KEEP**, thin wrapper pattern, cross-site convention. Note: not confirmed this pass whether it wraps `MiniCapture` or `LeadForm` directly — flag for phase 2. |
| `src/components/research/PharmacyIndexCharts.tsx` | charts for both research pages | **KEEP (T12 decline candidate)**, site-specific data visualisation, no kit "Dataset" component matches by name (same finding as hospitality's `FsaHygieneCharts`/`HospitalityInsolvencyCharts`). |

**Zero `web-shared/design/**` imports confirmed** (`grep -rn "web-shared/design" src` → 0 hits). The only design-adjacent kit import anywhere is `tools/components/Calculator`. No `PageShell`, no blog-kit components (`BlogListWithSearch`, `HubArticleList`, `BlogCategoryHub`, `TableOfContents`, `BlogSidebarCta`), no `ComparisonTable`/`ProblemStatement`/`NumberedReasons`/`FaqSection`/`StatsCounter`/`RelatedArticles`/`SpecialistWidget` anywhere. This matches the brief's claim exactly.

---

## 4. Capture-surface inventory

| Surface | Mounts on | `data-cta`/placement | Source identifier | Posts to |
|---|---|---|---|---|
| `LeadForm` (main) | `/contact`, `/about` (per route family convention, not independently re-verified for `/about` this pass) | none on the form itself (no `data-cta=` attribute found inside `LeadForm.tsx` or `MiniCapture.tsx`) | `niche.content_strategy.source_identifier` = `"pharmacies"` | `/api/leads/submit` (via `MiniCapture`'s fetch; `LeadForm` not independently traced to the same endpoint this pass — flag) |
| `LeadCTAPanel`-equivalent / service & hub detail CTAs | `/services/[slug]`, `/for/[slug]` | not probed this pass | — | — |
| `MiniCapture` (post-calculator) | `/calculators/[slug]` via `CalcResultCta` | none | — | `/api/leads/submit` (confirmed, `MiniCapture.tsx:78`) |
| `InlineMiniLeadForm` | blog post template | not probed | — | — |
| Header CTA | `SiteHeader.tsx:32` (desktop), `:69` (mobile drawer) | `data-cta-placement="header"` / `"header_mobile_menu"` | — | links to `/contact` |
| Sticky bar CTA | `StickyCTA.tsx:43` (go), `:51` (dismiss) | `data-cta-placement="sticky"` | — | links to `/contact` |
| Thank-you page | `thank-you/page.tsx:109` | `data-cta-placement="thank_you"` | — | n/a (post-submit) |

**Total `data-cta-*` instrumentation: 5 hits site-wide**, all `data-cta-placement`
only — **zero `data-cta-goal` attributes anywhere** (`grep -rn 'data-cta-goal'
src` → 0 hits). This is the single most consequential finding for playbook §8
item 11: there is no pre-port `data-cta-goal` to preserve, so the kit default
`"form"` is safe to take as-is — but it must be an explicit, deliberate choice
in the phase-1 prompt, not a silent inheritance.

**Four owner-decided interruptive surfaces — status today:**
- `SpecialistWidget` — absent.
- `DeepScrollModal` — absent.
- `ReturningBar` — absent.
- `StickyCTA` — **exists, local, bespoke** (`src/components/ui/StickyCTA.tsx`): scroll-percent trigger (>30%), dismissible, reads `niche.cta.sticky_primary/secondary/button`. Not kit-shaped; this is the one surface a phase-1/6 pass has a concrete local artefact to decide about (restyle vs retire vs replace with a kit equivalent).

---

## 5. Section 8 parameters — intended values for this site

| Param | Intended value | Basis |
|---|---|---|
| `SiteHeader.ctaContactGoal` | `"form"` (kit default) | zero pre-port `data-cta-goal` anywhere; nothing to preserve, so take the default deliberately |
| `SiteHeader.ctaMobilePlacement` | `"header_mobile_menu"` (the site's own current value, NOT the kit default `"mobile_menu"`) | `SiteHeader.tsx:69` already emits `data-cta-placement="header_mobile_menu"`; passing the kit default instead would split the live `cta_click` series at cutover — playbook §8 item 11's exact warning |
| `SiteFooter.resourcesHref` | **must be set explicitly, not left to the kit default `/landlord-tax`** (404s here, confirmed no `/landlord-tax` route exists). No single obvious hub exists on this site either (`/research/pharmacy-openings-closures-index` is one specific research page, not a hub; `/blog`, `/for`, `/services` are all real). Recommend `/for` (pharmacy-owners/buyers/sellers hub) as the best-fit Resources column target, but this is an **owner call**, flag it as such |
| `SiteFooter.companyItems` | `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` — the site's own 5 routes. Kit default includes `/locations`, which 404s (`niche.config.json` `locations: []`) |
| `SiteFooter.showBuilderCredit` | `true` (owner-standing, estate-wide; kit default is already `true`, pass nothing or pass `true` explicitly, never `false`) |
| `SiteHeader.wordmarkAccentColor` | `#0f3a4a` (brand primary) — confirm against the kit's shipped `primary` ramp before assuming it's already a step; not verified this pass (edit forbidden). Currently the local header hardcodes this hex directly in 3 places (`text-[#0f3a4a]`, `bg-[#0f3a4a]`, hover state) rather than through a prop |
| `storagePrefix` | **`pfp`** (confirmed in `layout.tsx`; the brief's "phfp" is wrong, see §0.1) |
| `nav` (SiteHeader) | site's own category-shaped groups: Services, For, Research, Blog, About, Contact — matches `niche.config.json.navigation` exactly today (6 items); local header currently reads `siteConfig.nav`, not `niche.navigation` directly — confirm these two sources agree before wiring |
| Logo/wordmark | `niche.config.json` `brand.logo_path` = `/brand/logo.png`; `public/brand/` **does not exist** (confirmed, `ls public/brand` → No such file or directory). Same as hospitality: not currently a rendering defect because the local header renders a TEXT wordmark (`siteConfig.name`, no `<img>`/`<Image>` anywhere in `src`), but the config key is stale and should be corrected or the asset supplied in phase 1 |

---

## 6. Chrome today

`layout.tsx` renders, in order: `<html>` → inline Organization JSON-LD `<script>`
in `<head>` (hand-rolled, `@type: ["ProfessionalService","AccountingService"]`,
NOT the kit `schema` helper used elsewhere in the codebase per the plumbing
import census) → `<body>` → `ConsentProvider` → `AnalyticsProvider`
(`siteKey=niche.content_strategy.site_key` = `"pharmacies"`,
`storagePrefix="pfp"`, `posture="opt-out"`, `noTrackPrefixes=["/admin"]`) →
`ConsentedScripts` (`gaMeasurementId=""` empty, `adsenseClientId="ca-pub-
3756285576371279"`) → local `SiteHeader` → `<main id="main">{children}</main>`
→ local `SiteFooter` → local `StickyCTA`.

**Local `SiteHeader` nav** (`siteConfig.nav`, consumed via `src/config/site.ts`,
not independently re-read against `niche.config.json.navigation` this pass —
flag for phase 1) renders a `hidden lg:flex` desktop row plus a working mobile
drawer toggle (`useState`, hamburger/close SVG swap) — **mobile nav IS present**,
unlike some other ports' pre-port headers. No kit focus trap on the drawer (kit
added one 2026-09-29, local header predates/doesn't use it).

**Local `SiteFooter`** renders a 2-column grid (brand/description + a single
flat "Quick links" list from `siteConfig.footer`, 5 items, no Resources/Company
split) + legal disclosure + copyright line. Does not import the kit `SiteFooter`
at all.

---

## 7. Structural live defects (curl, one URL per template family)

| Route | `<main>` count | `<h1>` count | Skip link | Breadcrumb |
|---|---|---|---|---|
| `/` (home) | 1 | 1 | 0 | 0 |
| `/services` (hub) | **2 (nested)** | 1 | 0 | 0 |
| `/for` (hub) | **2 (nested)** | 1 | 0 | 0 |
| `/blog` (blog list) | **2 (nested)** | 1 | 0 | 0 |
| `/blog/buying-a-pharmacy` (blog hub) | **2 (nested)** | 1 | 0 | 0 |
| `/blog/buying-a-pharmacy/buying-a-pharmacy-uk-checklist` (blog post) | **2 (nested)** | 1 | 4 (false positive, see note) | 0 |
| `/calculators` (calculator hub) | **2 (nested)** | 1 | 0 | 0 |
| `/calculators/pharmacy-purchase-affordability` (calculator) | **2 (nested)** | 1 | 0 | 0 |
| `/research/pharmacy-openings-closures-index` (research) | **2 (nested)** | 1 | 0 | 0 |
| `/about` | 1 | 1 | 0 | 0 |
| `/contact` (funnel) | **2 (nested)** | 1 | 0 | 0 |
| `/privacy-policy` (legal) | 1 | 1 | 0 | 1 |
| `/book` (funnel) | 1 | 1 | 0 | 0 |
| `/thank-you` (funnel) | **2 (nested)** | 1 | 0 | 0 |

**Landmark defect — NESTED `<main>` on the majority of routes**, same genus as
hospitality's finding: `layout.tsx` supplies the outer `<main id="main">`, and
most per-page templates additionally render their own inner `<main>`. Confirmed
on 10 of 14 probed routes (`/services`, `/for`, `/blog`, `/blog/[category]`,
`/blog/[category]/[slug]`, `/calculators`, `/calculators/[slug]`, `/research/*`,
`/contact`, `/thank-you`). Only `/`, `/about`, `/privacy-policy`, `/book` render
a single `<main>`. **This is broader than hospitality's 4-route finding** —
phase 1 must strip the inner `<main>` tag across most page templates, not a
handful, when it wires the kit chrome.

**Skip link:** zero genuine skip-to-content links anywhere (the "4" on the blog
post route is the word "skip" appearing inside the article's own prose/FAQ
content, a false-positive marker, not a skip-nav element — confirmed by
re-grepping for `href="#main"` / `class.*skip-link` → 0 hits on that route).

**Breadcrumb:** only 1 route (`/privacy-policy`) shows any "breadcrumb" string
server-side, and the local `Breadcrumb.tsx` component's actual usage across the
other 13 probed routes was not confirmed present — flag for phase 1 (same open
item hospitality logged for its own breadcrumb coverage).

**One `<h1>` per route:** confirmed 1 on every probed route, no duplicate-h1
defect.

**No internal 404s found** on the calculator-card pattern that broke
hospitality's homepage (all 3 calculator links on `/`, `/calculators`, and the
registry agree on slugs: `pharmacy-purchase-affordability`,
`pharmacy-fp34-cash-flow-estimator`, `locum-take-home-comparator`). All 8
service slugs and 5 hub slugs on their respective index pages resolve 200.

---

## 8. Tests

**5 test files confirmed** (`*.test.*`/`*.spec.*`, excluding `node_modules`):

| File | Guards |
|---|---|
| `src/lib/calculators/tools/pharmacy-purchase-affordability.test.ts` | calc math |
| `src/lib/calculators/tools/pharmacy-fp34-cash-flow-estimator.test.ts` | calc math |
| `src/lib/calculators/tools/locum-take-home-comparator.test.ts` | calc math |
| `src/tests/lead-contactability-bridge.test.ts` | lead contactability bridge |
| `src/tests/lead-submit-verify.test.ts` | lead submit verification |

Runner: `vitest` (package script, not re-confirmed by name this pass — assumed
same convention as hospitality/startups-tech). Not executed (read-only, no
dev/build command run). `npx tsc --noEmit`: **clean, zero errors.**

**No focus-ring repo-walk guard test found** under `src/tests` — same gap every
other port has logged; phase 6 will need to add one. 3 `outline-none` hits exist
in `src` (not individually enumerated by file this pass — flag for phase-1
spot-check, same open item as hospitality's).

---

## Ranked live-defect list

**Serious:**
1. **Nested `<main>` landmark on 10 of 14 probed routes** — broader than any
   prior port's finding of this shape. Phase 1 must strip the inner tag site-wide
   when it wires kit chrome, not just on a short list.
2. No skip-to-content link anywhere.
3. `SiteFooter.resourcesHref` has no obvious good default on this site (no
   `/resources`, `/landlord-tax`, or single clear hub) — **owner call required**
   before phase 1 wires the kit footer, flagged explicitly at §5.
4. `storagePrefix` is `pfp` — carry this forward correctly; do not let a
   phase-1 prompt inherit the brief's wrong "phfp" value, which would silently
   orphan existing local-storage state under a new key.
5. No logo/wordmark asset (`public/brand/logo.png` missing) despite
   `niche.config.json` declaring one — not a current rendering defect (text
   wordmark in use) but a stale config key.

**Minor:**
6. `content_strategy.categories` (7 names) vs 5 live blog category slugs —
   config drift, not consumed by routing today.
7. `MiniCapture.tsx` and `BookingPicker.tsx`/`DetailsForm.tsx` fork-vs-shared
   status against kit equivalents unconfirmed — flag for phase-1 grep.
8. Breadcrumb component's actual route coverage unconfirmed beyond
   `/privacy-policy`.
9. `aria-label`/`outline-none` focus-ring replacements not individually
   spot-checked.
10. `LeadForm`'s posting endpoint not independently traced (only `MiniCapture`'s
    `/api/leads/submit` confirmed by grep).
11. Local header reads `siteConfig.nav`; whether this agrees byte-for-byte with
    `niche.config.json.navigation` not independently diffed.

## False premises in this brief

1. `storagePrefix` is `pfp`, not `phfp` — see §0.1, the only materially wrong
   fact handed in; carried through §5 and the defect list above.
2. The "10 services / 7 hubs" implied by a naive `grep -c "slug:"` undercounts
   the correction needed: actual records are 8 services, 5 hubs (type-alias
   lines inflate the naive count) — see §0.6/§2.
3. No other false premise found in the brief's own claims; the component,
   capture-surface, and chrome descriptions otherwise verified true.
