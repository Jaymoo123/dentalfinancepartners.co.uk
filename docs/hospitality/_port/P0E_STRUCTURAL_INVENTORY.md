# P0E — hospitality port, structural live-defect and disposition inventory

Instrument: `next start` on http://localhost:3202 (curl only, read-only). Repo root git read-only, none run (not needed for this package). No edits outside this file.

**CHROME ALREADY EXISTS, PARTIALLY PORTED.** Unlike startups-tech (net-new chrome),
hospitality's `layout.tsx` already mounts the kit `SiteHeader` (via a client wrapper,
`components/layout/SiteHeaderWrap.tsx`, dated 2026-09-28) and its own local
`SiteFooter`. This is a restyle/parity job on the header and a build/adopt job on
the footer, not net-new chrome construction.

---

## 0. False premises in this brief

1. The brief frames this as if chrome may not exist yet ("verify both" header
   wrapper and local footer). **Confirmed true but already further along than a
   from-scratch site**: the header is already a thin client wrapper around the kit
   `SiteHeader` (`src/components/layout/SiteHeaderWrap.tsx`, 28 lines, dated
   "2026-09-28 parity fix" in its own header comment). Its own comment says nav is
   "intentionally omitted" pending a separate task (D1) — phase 1 must pick this up,
   not assume it is done.
2. No other false premise found in the brief's own claims.

---

## Parameters for section 8

| Param | Value | Source |
|---|---|---|
| `ctaContactGoal` | no existing `data-cta-goal` anywhere (`grep -rn 'data-cta-goal=' src` → 0 hits) | pick fresh value, kit default `"form"` is safe |
| `ctaMobilePlacement` | no existing `data-cta-placement` on a header/drawer CTA; only hit is `thank-you/page.tsx:108` (`"thank_you"`, unrelated) | kit default `"mobile_menu"` safe |
| `resourcesHref` | no single obvious hub; `/research` (4 pages), `/blog` (8 categories/23 posts), `/for` (6), `/services` (5) all real and live (200) | owner call; do not default to kit's `/landlord-tax` (404s here) |
| `companyItems` | site's own routes only: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy`. Kit default includes `/locations`, which 404s (`niche.config.json` `"locations": []`) | confirmed 404 by curl |
| `showBuilderCredit` | `true` (owner-standing, estate-wide) | playbook §8 |
| `wordmarkAccentColor` | already wired: `SiteHeaderWrap.tsx:25` passes `niche.brand.primary_color` = `#b0532f`. Not a Tailwind ramp step; phase 1 must confirm against the kit's shipped `primary` scale (not verified here, edit forbidden) | `niche.config.json` `brand.primary_color`; `SiteHeaderWrap.tsx:25` |

**Logo/wordmark:** `niche.config.json` `brand.logo_path` = `/brand/logo.png`. `hospitality/web/public/brand/` **does not exist** (confirmed, `ls` → No such file or directory). `SiteHeaderWrap.tsx` already builds a TEXT wordmark from `niche.display_name` split on the space ("HOSPITALITY" / "TAX") with a `UtensilsCrossed` lucide icon — this is the kit text-wordmark path already in use, not a gap. The declared `logo.png` is simply unused and absent; not a defect for phase 1 (the wordmark component doesn't consume it), but the stale config key should be flagged to the owner/content pass.

**Header CTA copy:** `niche.config.json` `cta.sticky_button` = `"Get in touch"` — already the label passed at `SiteHeaderWrap.tsx:21`. `cta.sticky_primary` ("Speak to a hospitality accounts specialist") is NOT currently passed anywhere in the header (only `ctaPrimary`, no `ctaSecondary`). Phone `+44 20 0000 0000` is the same placeholder pattern flagged on startups-tech — confirmed absent from the rendered header (`SiteHeaderWrap` passes no phone prop) and absent from any `<a href="tel:` in `src` (`grep -rln 'tel:' src` → 0 hits). Same owner question applies: no phone in the header while it is a placeholder.

### Nav / footer probe (niche.config.json vs :3202)

| Source | Label | href | HTTP |
|---|---|---|---|
| navigation[0] | Services | `/services` | 200 |
| navigation[1] | For | `/for` | 200 |
| navigation[2] | Calculators | `/calculators` | 200 |
| navigation[3] | Research | `/research` | 200 |
| navigation[4] | Blog | `/blog` | 200 |
| navigation[5] | About | `/about` | 200 |
| navigation[6] | Contact | `/contact` | 200 |
| footer_links[0-4] | Contact, Blog, Privacy Policy, Cookie Policy, Terms | — | 200 |

All 7 nav + 5 footer hrefs return 200. **Note**: `niche.config.json` nav labels are the raw route names ("For" not "Who we help") — `SiteHeaderWrap` does not currently consume `navigation` at all (nav intentionally omitted, see §0.1), so this table is a forward-looking check for when phase 1 wires it, not a live-defect today.

---

## 1. Chrome contract for phase 1

`layout.tsx` renders: `<html>` → JSON-LD script in `<head>` → `<body>` → `ConsentProvider` → `AnalyticsProvider` (`siteKey="hospitality"`, `storagePrefix="hfp"`, `posture="opt-out"`, `noTrackPrefixes=["/admin"]`) → `ConsentedScripts` (`gaMeasurementId=""` empty, `adsenseClientId="ca-pub-3756285576371279"`) → `SiteHeaderWrap` → `<main id="main">{children}</main>` → `SiteFooter`.

**Header (`SiteHeaderWrap.tsx`, kit `SiteHeader`):**
| Prop | Passed today | Kit type |
|---|---|---|
| `nav` | not passed (empty, falls to kit default) | `NavItem[]` optional |
| `ctaPrimary` | `{ label: niche.cta.sticky_button, href: "/contact" }` | required |
| `ctaSecondary` | not passed | optional |
| `ctaContactGoal` | not passed (kit default `"form"`) | optional |
| `ctaMobilePlacement` | not passed (kit default `"mobile_menu"`) | optional |
| `wordmarkIcon` | `UtensilsCrossed` (lucide) | required |
| `wordmarkTop`/`wordmarkBottom` | `"HOSPITALITY"` / `"TAX"` (derived from `display_name`) | required |
| `wordmarkAccentColor` | `niche.brand.primary_color` (`#b0532f`) | optional |

**Footer (`SiteFooter.tsx`, site-local, NOT the kit `SiteFooter`):** Renders its own markup entirely — `UnionJack` banner strip, brand column, three link columns split from `siteConfig.footer` (only 5 items, so `colSize = 2`, uneven 2/2/1 split), legal disclosure, copyright, `ConsentToggle`. **Does not import or use** `@accounting-network/web-shared/design/chrome/SiteFooter` at all — confirmed by the earlier grep (`SiteHeader`/`SiteFooter` search matched `SiteFooter.tsx`'s own definition and its `SiteHeaderWrap.tsx` cross-import only). This is a KEEP-then-ADOPT candidate for phase 1: kit `SiteFooter` exists and has all 6 props resolvable from `niche.config.json`/`siteConfig`, but nothing here consumes it yet.

**Kit `SiteFooter` props hospitality would pass:**
| Prop | Value to pass |
|---|---|
| `nav` / `fallbackNav` | `siteConfig.nav` (= `niche.navigation`, unfiltered, same divergence noted in the kit's own doc comment) |
| `description` | `siteConfig.description` |
| `footerLinks` | `siteConfig.footer` (5 items) |
| `legalDisclosure` | `siteConfig.company.legalDisclosure` |
| `legalName` / `tradingName` | `siteConfig.company.legalName` / `siteConfig.company.tradingName` |
| `wordmarkIcon`/`Top`/`Bottom` | same as header: `UtensilsCrossed`, `"HOSPITALITY"`, `"TAX"` |
| `backdrop` | none today (`UnionJack` banner strip is the site's own motif, sits above the footer grid, not inside a `backdrop` slot — KEEP as site-local motif, T12-shaped: it is a specific authored British-flag strip, not a generic backdrop) |
| `consentToggle` | `<ConsentToggle .../>` (already exists, site-local, KEEP) |
| `resourcesHref` | see §"Parameters" above — owner call |
| `companyItems` | `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` (NOT kit default, which includes `/locations`, 404s here) |
| `showBuilderCredit` | `true` |

**T12 note on the footer:** the site-local footer's brand column and UnionJack strip are hand-authored (not `children`-driven kit slots), so adopting the kit `SiteFooter` is a genuine port task (moving copy into props), not a decline — no raw-HTML-body T12 conflict on the footer itself.

---

## 2. Routes and templates (28 public `page.tsx` + 5 admin, confirmed)

`find src/app -name page.tsx` → 30 files total (matches the brief's expectation of a similar shape to startups-tech's 30, coincidentally).

| Family | Routes | Data source | `dangerouslySetInnerHTML` | Lead form | `<main>` (own, nested inside layout's) | Notes |
|---|---|---|---|---|---|---|
| Home | `/` (1) | hardcoded JSX | yes (`app/page.tsx`) | LeadForm | 0 | JSON-LD (FAQ + Org) |
| Services | `/services`, `/services/[slug]` (2, 5 slugs) | `src/data/hospitality-services.ts` | `[slug]` only | both (index: `ServiceTiers`+`LeadCTAPanel`; slug: `LeadCTAPanel`+`LeadForm`) | 0, 0 | |
| For | `/for`, `/for/[slug]` (2, 6 slugs) | `src/data/hospitality-hubs.ts` | `[slug]` only | `[slug]` only (`LeadCTAPanel`+`LeadForm`); index has **0** | 0, 0 | |
| Calculators | `/calculators`, `/calculators/[slug]` (2, 3 tools) | `src/lib/calculators/registry.ts` | `[slug]` only | `[slug]`: `CalculatorClient`→kit `Calculator`+`CalcResultCta`(`MiniCapture`); index has **0** | 0, 0 | kit `Calculator` component IS used here (adopted) |
| Blog | `/blog`, `/blog/[category]`, `/blog/[category]/[slug]` (3, 8 categories, 23 posts) | `content/blog/*.md` frontmatter | `[category]/[slug]` only | post only (`InlineMiniLeadForm`); index+category have **0** | 0, 0, **2 (nested)** | see §4 |
| Research | `/research`, + 3 named index pages (4) | hardcoded + JSON data files | 3 of 3 named pages, yes | 2 of 3 named pages have a form (food-hygiene-map, insolvency-index); `hospitality-openings-closures-index` has **0**; index `/research` has **0** | 0 on all 4 | see §9 |
| About/Contact/Legal | `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` (5) | hardcoded | none | About+Contact have a form; 3 legal pages have **0** (expected) | 0, **1 (nested)**, 0, 0, 0 | no JSON-LD on legal pages |
| Funnel | `/book`, `/thank-you`, `/complete` (3) | hardcoded | none | none | 0, **2 (nested, 3 mutually exclusive branches)**, 0 | `thank-you` noindex |
| Embed | `/embed/[slug]`, `/research/hospitality-openings-closures-index/embed` (2) | calculator registry / research data | none | none | not probed, by-design bare | |
| Admin | `/admin/analytics`(+login/leads/trends/visitor/[id]) (5) | console auth | none | none | n/a, noindex-gated | not part of port scope |

**Total 30 confirmed** (25 public template files + 5 admin). Sitemap agrees: 59 public URLs = 11 static + 8 blog categories + 23 blog posts + 6 `/for` slugs + 5 `/services` slugs + 3 named `/research` pages + 3 `/calculators` slugs. No discrepancy.

**Landmark defect — NESTED `<main>`, not absent (unlike startups-tech):** `layout.tsx` already supplies `<main id="main">`. Four routes render a SECOND, nested `<main>` inside it: `/contact` (`contact/page.tsx:13`), `/calculators` (`calculators/page.tsx:16`), `/blog` (`blog/page.tsx:18`), `/thank-you` (`thank-you/page.tsx:33/49/63`, one of three mutually exclusive branches, so it is 2 nested `<main>`s per render, not 3). Confirmed by curl (`main=2` on those four routes) and by grep of each file's own `<main` tag. **This is a genuine defect**, distinct from the startups-tech template's false alarm (that site had no outer `<main>` at all, so its per-page ones were the only landmark). Phase 1 must strip the inner `<main>` on these four files when it wires the kit chrome, or the site ships two `<main role="main">` landmarks on the same page.

**Skip link:** zero hits for "skip" in any probed page (`skip=0` on every route curled). No skip-to-content link exists. Same as startups-tech; kit `SiteHeader` normally carries this — confirm it renders one, since the header is already mounted here (unlike startups-tech where the whole header is still to build).

**One `<h1>` per route:** confirmed 1 on every route checked, including `/thank-you` (3 mutually exclusive branches, not a duplicate — same shape as the startups-tech false alarm, verified independently here).

---

## 3. Kit adoption today

| Import | Count | Type |
|---|---|---|
| `lead-nurture/tokens`, `/config`, `/send`, `/lead-nurture-shared`, `/opt-out`, `/cron` | 12+10+9+4+1+1 | plumbing |
| `console/consoleAuth`, `/adminData`, `/journey`, `/components/*` (5 files) | 7+4+3+5 | plumbing (admin) |
| `tools/types`, `/format`, `/registry-helpers`, `/embed/EmbedAutoResize`, `/components/Calculator` | 4+2+1+1+1 | plumbing/**design** (`Calculator` is the design surface) |
| `design/marketing/LeadCTAPanel` | 4 | **design** |
| `components/ServiceTiers` | 2 | **design** |
| `schema` | 4 | plumbing |
| `design/chrome/SiteHeader` | 1 | **design** (via `SiteHeaderWrap`) |
| `nurture/webhook`, `/admin` | 2+2 | plumbing |
| `lib/niche-config`, `/frontmatter` | 2+1 | plumbing |
| `leads/capture-steps`, `/server` | 2+1 | plumbing |
| `analytics/*` (ids, track, server/createTrackHandler, react/useFormTracking, react/ConsentedScripts, react/ConsentProvider, react/AnalyticsProvider, consent) | 2+1+1+1+1+1+1+1 | plumbing |
| `content/llmsFull`, `/feed` | 1+1 | plumbing |

**Design-kit adoption: `LeadCTAPanel` (4), `ServiceTiers` (2), `Calculator` (1, all 3 tools route through it), `SiteHeader` (1, via wrapper).** No `SiteFooter`, `PageShell`, blog kit components (`BlogListWithSearch`, `HubArticleList`, `BlogCategoryHub`, `TableOfContents`, `BlogSidebarCta`), or `ComparisonTable`/`ProblemStatement`/`NumberedReasons` imported anywhere. Phase 1 here is chrome COMPLETION (footer, nav wiring) and phase 2/3 is the first blog-kit adoption on this site, same as startups-tech.

Decline comments: `grep -rn "ADOPTION DECLINED\|declined" src` → **0 hits.** `data-cta` census: **2 hits**, both on `thank-you/page.tsx:107-108` — the entire rest of the site has zero `data-cta` instrumentation, same finding shape as startups-tech.

**Four-marker row for the homepage** (playbook §9.1): `animate-ping` **0**, `StatsCounter` mounts **0**, `Backdrop` mounts **0**, `rounded-full` **0** (all measured on rendered HTML, 182,683 bytes). None of the four markers appear anywhere in `src` either (`grep -rln 'StatsCounter\|Backdrop' src` → 0 files). This homepage carries no kit motif/stat-counter pattern at all today — confirms the same "chrome/motif adoption not yet started" reading as the import census.

**Local components with a kit-shape question:**
| Local file | Kit equivalent | Verdict |
|---|---|---|
| `components/forms/LeadForm.tsx` | no kit `leads/*` file matched by name | keep local, or confirm against `leads/server` in phase 1 |
| `components/calculators/MiniCapture.tsx` | possibly a shared `MiniCapture` (playbook §8 references 9 consumers) | not confirmed fork-vs-shared; flag for phase-1 grep |
| `components/calculators/CalcResultCta.tsx` | none found by name | keep local (thin wrapper around local `MiniCapture`) |
| `components/blog/InlineMiniLeadForm.tsx` | thin wrapper around local `MiniCapture` | keep, cross-site pattern (same shape as startups-tech's own copy) |
| `components/brand/UnionJack.tsx` | none in kit | keep, site-specific motif (British flag strip) |
| `components/forms/BookingPicker.tsx`, `DetailsForm.tsx` | not checked against kit `leads/capture-steps` (which IS imported 2x elsewhere) | flag for phase-1: confirm whether these duplicate `leads/capture-steps` |

---

## 4. Blog subsystem

- Renderer: `app/blog/[category]/[slug]/page.tsx`, raw HTML via `dangerouslySetInnerHTML` (T12 decline site for any kit body/prose component).
- Index: `app/blog/page.tsx`. Category hub: `app/blog/[category]/page.tsx`.
- Content dir: `web/content/blog/*.md`, 23 files, flat (no category subdirs) — category comes from frontmatter.
- Frontmatter fields observed (`alcohol-duty.md`): `title`, `slug`, `date`, `author` (empty), `category`, `metaTitle`, `metaDescription`, `h1`, `summary`, `keyTakeaways[]`, `faqs[]` (question/answer). No `schema:`, `howToSteps` seen in the sampled file — not swept across all 23, flag for phase-1/claims-audit.
- 8 categories confirmed via sitemap: business-rates(2), capital-allowances(1), hospitality-accounts(8), hospitality-vat(4), licensed-trade(4), making-tax-digital(1), payroll-and-employment(1), tips-and-tronc(2) = 23. **`niche.config.json` `content_strategy.categories` lists only 6 category NAMES** ("Accounts and Bookkeeping", "Food and Drink VAT", "Tronc, Tips and Payroll", "Licensed Trade and Duty", "Business Structure and Incorporation", "Margins and Cost Control") that do not match the 8 live category slugs by name or count. Not a phase-1 blocker (the live site does not read this array for routing) but a config-drift finding worth logging.
- `.prose` class check: `article className="prose prose-neutral mt-10 max-w-none"` on the post template, **35 `.prose` selectors confirmed present in the built CSS** (`grep -o '\.prose[ {,:]' .next/static/css/*.css`) — NOT the charities dead-class defect; the typography plugin is active here.
- TOC/sidebar/related: not confirmed present or absent inside the post body — out of this package's budget; flag for phase-1/blog-kit check, since none of `TableOfContents`/`BlogSidebarCta` are imported anywhere (§3).
- `InlineMiniLeadForm`: mounted on the post template only (`grep` confirms import in `blog/[category]/[slug]/page.tsx`); `formId` value not independently re-verified this pass (playbook precedent on other sites uses a single `"inline_mini"` id — confirm in phase 1, do not assume).

---

## 5. Lead surfaces

Money-page zero-form audit (measured on rendered HTML for `name="fullName"`/`name="enquiry_ref"`, the two identifying inputs of the shared `LeadForm`/`MiniCapture` shape — NOT the header CTA button text, which is a false-positive marker present on every page):

**Zero-form pages (owner/phase-1 attention):**
- `/for` (hub index) — every `/for/[slug]` has a form, the hub itself has none.
- `/calculators` (hub index) — every `/calculators/[slug]` has a form via `CalcResultCta`, the hub itself has none.
- `/research` (hub index) — none of the named pages route through it for a form.
- `/research/hospitality-openings-closures-index` — the other two named research pages (`uk-hospitality-food-hygiene-map`, `uk-hospitality-insolvency-index`) carry a form, this one does not. Same "N of M inconsistent" pattern the startups-tech template flagged on its own research family.
- `/blog`, `/blog/[category]` (index/hub) — expected, no defect.
- Legal pages, `/book`, `/thank-you`, `/complete` — expected, no defect.

`data-cta` census: **2 hits**, both `thank-you/page.tsx:107-108`. No other `data-cta` instrumentation site-wide.

Interruptive surfaces: `grep -rln 'Modal\|Banner\|Popup\|StickyBar\|ExitIntent\|ConsentBanner' src --include=*.tsx` → **zero hits.** No modal, banner, popup, sticky bar, exit-intent, or consent-UI component anywhere (consent handled non-interruptively by `ConsentProvider`/`ConsentedScripts`, opt-out posture). Floating help widget: absent, as expected (not yet ported to this site).

---

## 6. Accessibility and structure

- `<main>`: present everywhere via `layout.tsx`, but NESTED (doubled) on 4 routes — see §2.
- Skip link: absent site-wide — see §2.
- `<h1>`: exactly 1 per route, including `/thank-you`'s branches.
- `aria-label`: 8 hits across `src/components`+`src/app` — not individually audited against every icon-only button in this pass; flag for phase-1 spot-check.
- `outline-none`: present in `admin/analytics/login/page.tsx`, `error.tsx`, `components/forms/LeadForm.tsx` — confirm each has a replacement focus-ring recipe (not verified here).
- `alt=`, `<img>`, `next/image`/`<Image>`: **zero hits anywhere in `src/app` or `src/components`.** The site uses no raster/vector `<img>` content (icons are lucide SVG components) — no alt-text census applicable, no defect.
- Table wrappers: all 4 `<table>`-bearing files (`page.tsx` home, 3 research pages) wrap every `<table>` in an `overflow-x-auto` div — confirmed by grep pairing, no unwrapped table found.

---

## 7. Dead links and anchors

**Confirmed dead internal links (curl HEAD, 404):**
1. `/calculators/tronc-tips-paye-nic` — real route is `/calculators/tronc-tips-paye-nic-calculator`. Referenced at `app/page.tsx:235`.
2. `/calculators/food-drink-vat-checker` — real route is `/calculators/food-drink-vat-rate-checker`. Referenced at `app/page.tsx:236` AND `data/hospitality-services.ts:224` (inline authored `<a href>` inside a service body's raw HTML, same defect, second occurrence).
3. `/calculators/staff-cost-rota-margin` — real route is `/calculators/staff-cost-rota-margin-calculator`. Referenced at `app/page.tsx:237`.

All three are the same bug pattern: the homepage's calculator-card list (and one service body) dropped the `-calculator`/`-rate-checker` suffix that the actual routes carry. `src/config/lead-nurture.ts:95/103` and `llms-full.txt/route.ts:66/68` use the CORRECT full slugs, confirming the homepage/service-body links are the outliers, not the routes.

Anchors: exactly one `#`-anchor pattern site-wide is via in-page `id`s on research pages (`#pubs`, `#restaurants-count`, `#overview`, `#methodology`, `#by-type`, `#league-tables`, `#survival`, `#annual`, `#monthly`, `#procedures`), all with matching `scroll-mt-24` sections. `grep -rn 'href="#'` → **zero hits** — no in-page anchor links reference these ids from an `<a href="#...">`, so they are section landmarks/potential ToC targets, not currently linked-to anchors. No broken `#` anchor found.

---

## 8. Calculators

| Route | Component | Test | Uses kit `Calculator`? |
|---|---|---|---|
| `/calculators/food-drink-vat-rate-checker` | `src/lib/calculators/tools/vat-checker.ts` | `vat-checker.test.ts` | yes, via `CalculatorClient` → `@accounting-network/web-shared/tools/components/Calculator` |
| `/calculators/staff-cost-rota-margin-calculator` | `staff-cost.ts` | `staff-cost.test.ts` | yes |
| `/calculators/tronc-tips-paye-nic-calculator` | `tronc.ts` | `tronc.test.ts` | yes |

All three tests sit flat next to source in `lib/calculators/tools/` (no `__tests__/` split, unlike startups-tech). Result gate: none confirmed (`CalcResultCta`/`MiniCapture` renders unconditionally after the result, no modal gate). `/embed/[slug]` is the bare embed surface, same registry.

**This site already adopts the kit `Calculator` component** — a stronger starting position than startups-tech, which the template flagged as "not confirmed" fork-vs-shared for its own `MiniCapture`. Phase 4 here is narrower: confirm styling parity, not first adoption.

---

## 9. Research index (`/research`)

Template: `app/research/page.tsx`, hardcoded JSX pulling three pre-built JSON snapshots (`hospitality-insolvency-index.json`, `hospitality-fsa-hygiene-index.json`, `uk-hospitality-openings-closures-index.json`) via `src/lib/research/*` formatter modules — not a generic kit "Dataset" component. Each named page (`hospitality-openings-closures-index`, `uk-hospitality-food-hygiene-map`, `uk-hospitality-insolvency-index`) renders its own tables/charts (`FsaHygieneCharts.tsx`, `HospitalityInsolvencyCharts.tsx`) and its own `dangerouslySetInnerHTML` body sections — all three are T12 decline sites for a kit report-body component (§3/§4 pattern). `Dataset` JSON-LD schema presence not independently verified this pass — flag for phase-1. One embed sub-route exists: `/research/hospitality-openings-closures-index/embed`.

---

## 10. Tests

**6 test files confirmed** (`find . -iname '*.test.*' -o -iname '*.spec.*'`, excluding node_modules):

| File | Guards |
|---|---|
| `src/app/api/track/route.test.ts` | analytics track endpoint |
| `src/lib/calculators/tools/staff-cost.test.ts` | staff-cost calc math |
| `src/lib/calculators/tools/tronc.test.ts` | tronc calc math |
| `src/lib/calculators/tools/vat-checker.test.ts` | VAT checker math |
| `src/tests/lead-contactability-bridge.test.ts` | lead contactability bridge |
| `src/tests/lead-submit-verify.test.ts` | lead submit verification |

Runner: `vitest run` (`package.json` `"test"` script). Not executed in this pass (read-only, no build/dev command run per hard rules) — file presence and script only.

`npx tsc --noEmit`: **clean, zero errors.**

No focus-ring repo-walk guard test found under `src/tests` (only the two lead tests are present there) — same gap the startups-tech doc flagged; phase 6 will need to add one.

---

## Ranked live-defect list

**Serious:**
1. **3 dead internal links** on the homepage's calculator-card list (`app/page.tsx:235-237`) plus one duplicate occurrence inside a service body's raw HTML (`data/hospitality-services.ts:224`) — real calculator slugs all carry a `-calculator`/`-rate-checker` suffix the linked hrefs drop. 404 confirmed by curl. Fix is mechanical (correct the three hrefs) but is a live production defect today, independent of the port.
2. **Nested `<main>` landmark** on 4 routes (`/contact`, `/calculators`, `/blog`, `/thank-you`) — `layout.tsx` already supplies the outer `<main id="main">`; these four pages additionally render their own inner `<main>`. Two `main` landmarks on one page is an accessibility defect (screen readers announce two "main content" regions). Phase 1 must strip the inner tag on these four files when it touches chrome.
3. No skip-to-content link anywhere on the site.
4. No logo/wordmark image asset exists (`public/brand/logo.png` missing) despite `niche.config.json` declaring one — not currently a rendering defect (the header already uses a kit text-wordmark, not the image path), but the stale config key should be corrected or the asset supplied.
5. Money-page form gaps: `/for`, `/calculators`, `/research` hub pages and the `/research/hospitality-openings-closures-index` named page carry no lead-capture form while every sibling detail/named page does. Inconsistent, not necessarily wrong, but worth an owner/content-pass look given two of three research pages already have one.

**Minor:**
6. `content_strategy.categories` in `niche.config.json` (6 names) does not match the 8 live blog category slugs by name or count — config drift, not consumed by routing today.
7. `MiniCapture.tsx` fork-vs-shared status unconfirmed (§3) — needs a phase-1 grep before reuse decisions.
8. `BookingPicker.tsx`/`DetailsForm.tsx` vs kit `leads/capture-steps` overlap unconfirmed (§3).
9. Blog TOC/sidebar/related presence unconfirmed inside post body (§4).
10. Frontmatter field sweep done on one sampled post only (`alcohol-duty.md`); `schema:`/`howToSteps` presence across all 23 posts not confirmed.
11. `aria-label` icon-button coverage and `outline-none` focus-ring replacements not individually spot-checked this pass.
12. `Dataset` JSON-LD schema presence on research pages not independently verified.

## False premises in this brief

1. None found that contradict the brief's own framing. The brief's phrasing left open whether chrome exists or not; it does, partially (kit header wrapped, local footer unwrapped) — corrected in §0 and reflected throughout, not a defect in the brief itself.
