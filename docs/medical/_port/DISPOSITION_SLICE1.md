# PORT BLUEPRINT — SLICE 1: CHROME, HOMEPAGE, BLOG SUBSYSTEM

Medical (`Medical/web`, Medical Accountants UK, `www.medicalaccounts.co.uk`, `source_identifier: medical`, verified `Medical/niche.config.json:140`) to the Property standard.

Binding spec: `docs/property/DESIGN_SYSTEM.md` §0 (the ten-part page contract), §4, §4b, §4c, §7, §7a, §9; `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` §4.1, §4.2, §4.6 and appendices A, B, C, E, F.1-F.4; `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Prior art followed for structure: `docs/solicitors/_port/DISPOSITION_SLICE1.md` (site 2). Nothing in that file is treated as ground truth for Medical; every Medical fact below was derived from the Medical tree in this session.

Investigated 2026-09-10, read-only, every file in scope opened. **No production server was available to me**, so every claim below is source-derived; rows that would need a rendered-DOM check to close are marked `[DOM-CHECK]` and must be re-verified by the Phase 1 builder or the adversarial reviewer against `next start`. **`docs/medical/_port/link_baseline.json` does not exist yet** (the Phase 0 baseline agent owns it), so no numeric link floor is quoted anywhere in this file; where a floor is load-bearing the row says so and names the route.

---

## Standing conversions applied in every row below (stated once, never repeated)

- **Brand ramp.** Navy `--navy #001b3d` and copper `--copper #b87333` STAY (owner decision 1). `globals.css:15,21` are the true values; `niche.config.json:22` `brand.primary_color: "#0891b2"` and `:154` `seo.theme_color: "#0891b2"` are stale cyan that renders nowhere and gets reconciled to the CSS. Navy is the **ground** (Property's slate-900 role); copper is the **primary/accent** ramp (`globals.css:39-41` already binds `--accent: var(--copper)` and `:54-55` `--brand-primary: var(--copper)`, which is what the kit reads). Every `emerald-N` in a quoted Property class becomes `primary-N` = a copper ramp that must be authored as `--color-primary-50..950` in `@theme` and **contrast-measured by hand** before use: `#b87333` on white measures roughly 3.4:1, i.e. **below the 4.5:1 floor for text and below the fill threshold under white text**, so the button ground must be at the 700 step or darker (`--copper-strong #a0622b` is also short of it). Slice 3 owns the derivation; slice 1 consumes `--btn-ground` / `--btn-ground-hover` / `--btn-ground-active` and does not hardcode.
- **Warning ramp.** Copper currently carries duty / deadline / warning semantics all over the site (every `border-l-4 border-[var(--copper)]` notice). Warning meaning moves OFF copper onto a non-brand ladder that slice 3 derives. **No row in this file assigns warning meaning to copper.** Slate stays neutral / does-not-apply.
- **Second typeface dropped** (owner decision 2). Cormorant Garamond retires: `layout.tsx:2,23-27,80`, `globals.css:70` (`--font-serif: var(--font-cormorant)`) and `globals.css:159-163` (`.display-serif`). Plus Jakarta Sans only. **131 `font-serif` / `display-serif` uses across 29 files in `Medical/web/src`** (`grep -rn "font-serif\|display-serif" src/ | wc -l` → 131; `-l | wc -l` → 29) go with it; headings take the A.3 scale with `font-bold` and the base-layer letter-spacing.
- **Radius.** `--radius: 0rem` and `--btn-radius: var(--radius-xl)` get declared; `rounded-xl` renders 4px and is the only card/button radius. Today `layout-utils.ts:20,24,28` ship `rounded-full` buttons and the tree is full of `rounded-2xl` / `rounded-lg` cards. All A.2 defects.
- **Grounds.** `--background` moves `#f4f6f9` → `#ffffff` (`globals.css:27`). Sections set `bg-white` / `bg-slate-50` / `bg-slate-900` explicitly and oscillate. The `.hero-brand` CSS gradient is not a ground vocabulary; navy replaces it.
- **Containers.** `siteContainerLg` (`max-w-6xl`) is the page measure. `siteContainerXl` is **added** to `layout-utils.ts` (absent today) and used by the header bar only. Every `max-w-2xl/3xl/4xl/5xl` wrapper round a page body, table, FAQ or list is a §0.1 defect and comes out. `contentNarrow` survives on hero copy and section-head blocks only.
- **Spacing.** `sectionY` becomes `py-12 sm:py-16 lg:py-20` (`layout-utils.ts:15` is `md:py-20`, off the A.4 rhythm). Blog/hub sections `py-16 sm:py-20`. `sectionYLoose` (`:17`) is RETIRED.
- **Instrumentation.** Existing `data-cta` ids pass through, never renamed (live `vw_cta_performance` series). Slice-1 inventory, complete: `hero_primary`, `hero_secondary`, `home_cta_primary`, `home_cta_secondary` (`page.tsx:255,264,536,545`), `nav-book-call`, `mobile-nav-book-call`, `header_nav_secondary`, `header_mobile_secondary` (`SiteHeader.tsx:104,185,196,95`). **The blog subsystem carries zero `data-cta` today** across all 88 posts, 8 hubs and the index. `data-cta-placement` and `data-cta-goal` move with every CTA.
- **Copy.** British English (the config carries US spellings: `niche.config.json:157` "optimization", `:255` "specialize"). No pricing for our services including comparative claims. **No turnaround promises** (Medical breaches this in five places, itemised below). No client-behaviour, client-count or aggregate-performance claims. No "most doctors qualify" framing. Every figure re-derivable from `docs/medical/house_positions.md`. No em-dashes.

---

## A. SITE CHROME

### A.0 Nav reality and the IA to author

Nav is **flat today**: 6 items, no `children`, no `groups` (`Medical/niche.config.json:30-56` → Services `/services`, Guides `/medical-guides`, Free health check `/free-practice-health-check` (`hide_in_packages`), About `/about`, Blog `/blog`, Contact `/contact`). Authoring the grouped IA is port work in this slice (rollout §4.6.10). Build it in a new server-only **`src/lib/nav.ts`** consuming `packages/web-shared/design/chrome/nav.ts` `buildPrimaryNav(nav, calculatorGroups)`.

**Calculator groups must be derived, not read.** `src/lib/tools/registry.ts:34` exports only `allTools / genericTools / getGenericTool / toolPath` via `makeRegistryHelpers`; there is no `calculatorNavGroups()`. Deriving command: `grep -h "category:" src/lib/tools/configs/*.ts | sort | uniq -c`. **10 tools in 4 categories**: Income Tax (5), NHS Pension (3), Expenses (1), Incorporation (1). Group in `src/lib/nav.ts` in that order.

**Proposed `navigation[]` group structure for Medical**, built from routes that actually exist (`ls src/app`, verified):

| Top-level item | href | children (all verified routes) |
|---|---|---|
| Who we help | `/services` | All services `/services` (self-referential first child, required because the trigger is a `<button>`) · For GPs `/for-gps` · For consultants `/for-consultants` · For locum doctors `/for-locum-doctors` · For junior doctors `/for-junior-doctors` |
| Guides | `/medical-guides` | All guides `/medical-guides` · the 6 guide slugs from `src/lib/medical-guides-data.ts` (`nhs-pension-annual-allowance`, `consultant-private-practice-tax`, `gp-partnership-accounts`, `locum-limited-company-vs-umbrella`, `medical-expenses-tax-treatment`, `ir35-for-locums`) · NHS pension `/nhs-pension` · Research `/research` |
| Calculators | `/calculators` | All calculators `/calculators` + the 4 registry categories above, built server-side by `buildPrimaryNav()` |
| Blog | `/blog` | All articles `/blog` + the 8 category hubs (C.0) |
| About | `/about` | — |
| Contact | `/contact` | — |

`Free practice health check` (`/free-practice-health-check`) moves out of the top-level bar into the **Who we help** group, keeping its `hide_in_packages` flag. Six top-level items with two-word labels plus a CTA will not fit the bar at 1024px, and this is the item with the lowest top-level claim.

**`/locations` and `/resources/[topic]` are deliberately not in the header.** They keep their footer and in-body links; adding them to the nav would be an IA change, not a port.

### A.1 `SiteHeader.tsx` (208 lines, `"use client"`, `md:` breakpoint band, no dropdowns)

Role derived: `grep -rn "SiteHeader" src/ -l` → **one importer, `src/components/layout/PageShell.tsx`**. It is the site's only header.

| # | New (standard classes/component) | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Bar `sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm` + inline `paddingTop: max(0px, env(safe-area-inset-top))` | `SiteHeader.tsx:57-62` translucent `bg-[var(--surface)]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--surface)]/85` | ADOPT-STANDARD | appendix B exact. `--surface` is already `#ffffff` (`globals.css:28`) so the translucency buys nothing today and becomes a visible seam once `--background` goes white | the `env(safe-area-inset-top)` inline style is already correct; keep |
| 2 | Inner `siteContainerXl flex min-h-[3.25rem] sm:min-h-16 items-center justify-between gap-3 sm:gap-4 py-3` | `:63-65` `siteContainer` (`max-w-5xl`) + `sm:min-h-14` + `py-2.5 sm:py-3` | ADOPT-STANDARD | the header bar is the one `max-w-7xl` surface (A.4); `min-h-14` is 56px against the 64px contract | **add `siteContainerXl` to `layout-utils.ts`; it does not exist there today** |
| 3 | Nav list `hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1`; item `px-3 py-2 text-sm font-bold border-b-2 xl:px-4`; active `border-primary-600 text-primary-700`; idle `border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300` | `:68-88` `md:flex`, pill `rounded-full bg-[var(--copper-soft)]`, `font-medium` | ADOPT-STANDARD | **breakpoint band collision, live.** Nav appears at `md:` (`:70`) while the burger hides at `md:` (`:113`), and the primary CTA arrives at `sm:` (`:103`) while `BrandWordmarkHomeLink`'s width cap lifts at `sm:` (`BrandWordmarkHomeLink.tsx:152` `max-w-[11rem] sm:max-w-none`). That is **the exact 2026-08-23 incident pattern** (DS §7a, §0.8): a sibling appearing at the same breakpoint a neighbour's cap lifts. Spec puts nav, burger and CTA all at `lg:` | none |
| 4 | Grouped dropdowns: click-toggled `<button>`, grouped panel `w-[38rem] max-h-[70vh] columns-2 rounded-xl border bg-white p-4 shadow-lg` + "View all" footer link; simple panel `w-64 rounded-xl py-2`; self-referential first child per group; closes on Esc / outside mousedown / route change | no dropdown exists (`:72-87` renders 6 flat links) | ADOPT-STANDARD | 10 calculators, 6 guides and 4 audience pillars cannot be flat nav items and must not be hand-listed; hover-only triggers are unreachable on the tablets that sit at `lg:` | groups from `src/lib/nav.ts` (A.0) |
| 5 | Primary CTA `${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`, `data-cta="nav-book-call"` retained | `:101-109` `sm:inline-flex`, `min-h-11 md:min-h-12`, `rounded-full`, `px-4` | ADOPT-STANDARD | `sm:` is the incident breakpoint (row 3); `min-h-11` is 44px, under the 48px primary floor (A.8), and the `md:min-h-12` step means the bar changes height twice | pass `ctaIds={{ primary: "nav-book-call", mobilePrimary: "mobile-nav-book-call", secondary: "header_nav_secondary" }}`; label from `getActiveCta(niche).header_primary` (`/contact`, "Book a call") |
| 6 | Secondary link at `xl:` only, `data-cta="header_nav_secondary"`; the nav's own Contact item goes `xl:hidden` | `:91-100` `md:inline-flex`, always on from 768px, while `/contact` is ALSO nav item 6 (`niche.config.json:52-55`) | ADOPT-STANDARD | live duplicate-link defect from 768px up: two links to `/contact` in one 56px bar | none |
| 7 | Burger `h-12 w-12 touch-manipulation rounded-xl border-2 border-slate-200 bg-white lg:hidden` | `:111-120` `rounded-lg`, `border` (1px), `md:hidden` | ADOPT-STANDARD | `md:hidden` is the band collision in row 3; `rounded-lg` + 1px border is the pre-redesign recipe. Size and `touch-manipulation` are already right | icon colour → `text-slate-700`; `MenuIcon` (`:14-31`) is a local 2-path SVG and ports as-is or is dropped for the kit's |
| 8 | Drawer: root `fixed inset-0 z-50 lg:hidden`; scrim `bg-slate-900/50 backdrop-blur-[2px]`; panel `absolute right-0 top-0 h-[100dvh] w-[min(20rem,92vw)] border-l-4 border-primary-600 bg-white shadow-2xl`; nav children active `border-l-4` + `bg-primary-50 text-primary-900`; groups `ml-4 border-l border-slate-200`, labels `text-[11px] font-bold uppercase tracking-wider text-slate-500`; footer `border-t border-slate-200 p-3` with `${btnPrimary} w-full` | `:124-205` `md:hidden`, panel `border-l` 1px with no brand edge, no groups, footer button inherits `rounded-full` | ADOPT-STANDARD | the drawer is the only navigation below `lg:` and must carry the grouped IA. Scrim `bg-[var(--navy)]/50` (`:133`) is already navy-at-50%, which is what the spec asks for; keep the value, restate it as `bg-slate-900/50` | keep the drawer secondary link, `data-cta="header_mobile_secondary"` (`:196`), and its `data-cta-placement="header_mobile"` |
| 9 | Drawer close `h-11 w-11 rounded-xl border-2` | `:150-157` `h-11 w-11 rounded-lg border` | ADOPT-STANDARD | appendix B exact | none |
| 10 | Active-state: top-level trigger PREFIX match, dropdown/drawer children EXACT match | `:73` and `:163`, prefix on both | ADOPT-STANDARD | guarded by `packages/web-shared/design/guards/nav-active-state.test.ts`; prefix on children lights every sibling of a shared stem, and Medical has three shared stems (`/blog/*`, `/medical-guides/*`, `/for-*`) | wire the guard test into `Medical/web` |
| 11 | Nav from `niche.config.json navigation[]` via `getActiveNav(niche)`, calculator group attached server-side by `buildPrimaryNav()`, passed down as a `nav` prop | `:8,72,162` reads `siteConfig.nav` inside a `"use client"` component | ADOPT-STANDARD | the tool registry must never reach a client bundle; the footer derives its columns from the same prop | `src/lib/nav.ts` is new |
| 12 | Body-scroll lock on drawer open | `:42-54` sets `document.documentElement.style.overflow = "hidden"` and restores | KEEP-PAYLOAD-RESTYLE | correct behaviour, kit-equivalent; verify the kit header does the same before deleting the local one, and do not regress it | `[DOM-CHECK]` |
| — | Mono/uppercase "Menu" eyebrow (`:147-149`) | | RETIRE | retired idiom; the drawer header row is label + close + wordmark |
| — | Local `SiteHeader.tsx` in full | `src/components/layout/SiteHeader.tsx` | RETIRE (delete) | replaced by `@accounting-network/web-shared/design/chrome/SiteHeader`, which is fully parameterised (`nav`, `fallbackNav`, `ctaPrimary`, `ctaSecondary`, `ctaVariant`, `ctaIds`, `wordmarkIcon/Top/Bottom`, verified `chrome/SiteHeader.tsx:45-68`) |

**Wiring:** `nav-book-call` (`activeCta.header_primary.href` = `/contact`, placement `header`) · `mobile-nav-book-call` · `header_nav_secondary` (goal `contact`, placement `header`, `xl:` only) · `header_mobile_secondary` (placement `header_mobile`). All four carry `data-cta-variant={niche.cta.variant}`. **Note a live inconsistency to preserve, not fix:** `:105` and `:186` compute `data-cta-goal` as `"contact"` or `"pricing"` from the href, and `:104` / `:185` emit **no `data-cta-placement` at all**. Adding the missing placement is a new column value on a live series; see GATE M2.

**JSON-LD:** none (chrome emits none; Organization + WebSite ship from `layout.tsx:85`).

### A.2 `SiteFooter.tsx` (72 lines, navy ground, sister-site block, flat 11-link row)

Role derived: `grep -rn "SiteFooter" src/ -l` → `src/components/layout/PageShell.tsx` (the mount) and `src/app/layout.tsx` (a comment reference at `:89` only, not an import). One real importer.

| # | New (standard classes/component) | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | `relative overflow-hidden bg-slate-900 text-white` + `backdrop` motif slot; `siteContainerLg relative z-10 py-12 sm:py-16`; `grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16` | `:10-11,37` `bg-[var(--navy)]` + `siteContainer` (`max-w-5xl`) + `min-[480px]:grid-cols-2` | ADOPT-STANDARD | appendix C exact. The ground is already navy, which is the one thing this footer gets right. `min-[480px]` is an off-scale arbitrary breakpoint (A.4: stock Tailwind only) and the two-column split it drives puts every link in one right-aligned row |
| 2 | Left: footer-variant wordmark (primary-400 icon + rule, white text) + `siteConfig.description` in `max-w-md text-sm text-slate-300` | `:38-43` wordmark boxed inside `inline-block rounded-lg bg-white px-4 py-2.5 shadow-sm` | ADOPT-STANDARD | the white chip exists only because `BrandWordmarkHomeLink` hardcodes `text-[var(--navy)]` (`BrandWordmarkHomeLink.tsx:156,163`) and is therefore invisible on the navy ground. The kit footer renders its own footer-size lockup in white and the chip goes with it. `siteConfig.description` is already correct payload |
| 3 | Right: `<nav aria-label="Footer"> grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4`, columns **derived from the same `nav` prop as the header** via the kit's `buildFooterColumns`: Who we help = `children` of `/services`; Resources = `children` of `/medical-guides` (`resourcesHref="/medical-guides"`); Calculators = first tool of each of the 4 registry categories + "All calculators"; Company = `companyItems`. Heading `text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400 mb-4`; links `inline-flex py-0.5 text-sm font-semibold text-slate-300 hover:text-white` in `ul.space-y-2` | `:44-56` flat `siteConfig.footer` = all **11** `niche.config.json:57-101` items in one right-aligned wrapped row, no headings, `underline decoration-[var(--copper)]` | ADOPT-STANDARD | a hand-listed flat row goes stale silently and gives an 11-link wall no information hierarchy. Derivation renders only routes that exist. **Owner decision 3 binds this row: derived, never hand-listed** |
| 4 | Legal row `mt-10 pt-6 border-t border-white/10 space-y-4`: `footerLinks` reduced to Privacy policy / Terms / Cookie policy at `text-xs text-slate-400`, then `legalDisclosure`, then `© {year} {legalName} t/a {tradingName}` + domain, then `ConsentToggle` | `:57-66` | ADOPT-STANDARD + KEEP payload | `siteConfig.company.legalDisclosure` (`site.ts:53-56`) and the `ConsentToggle` are compliance payload and port verbatim. The ConsentToggle is the "Do not track me" control the opt-out posture depends on (`layout.tsx:87-90`), so it is load-bearing, not decoration |
| 5 | `resourcesHref="/medical-guides"`, `companyItems=[About /about, Contact /contact, Locations /locations, Free practice health check /free-practice-health-check]` | kit defaults `DEFAULT_RESOURCES_HREF = "/landlord-tax"` and `DEFAULT_COMPANY_ITEMS` (which includes `/book`) | ADOPT-STANDARD | both are already props on the kit footer (verified `chrome/SiteFooter.tsx:48,54`), so **no local mirror is needed and the kit is not edited**. `/book` exists (`src/app/book/`) but is a post-submit token surface (F.6) and is not a public footer destination |
| 6 | The 8 non-legal `footer_links` (`/for-gps`, `/for-consultants`, `/for-locum-doctors`, `/for-junior-doctors`, `/medical-guides`, `/nhs-pension`, `/calculators`, `/locations`) | `niche.config.json:57-89` | RETIRE from `footer_links`, RE-HOME in the derived columns | leaving them in `footer_links` after derivation renders each one twice. `footer_links` keeps only Privacy policy / Terms / Cookie policy (`:90-101`) |
| — | Sister-site block: `<h2>` "Our Specialist Accounting Services" + outbound cards to `dentalfinancepartners.co.uk` and `accountsforlawyers.co.uk` | `:12-35` | RETIRE | **owner decision 3.** Two `rel="noopener noreferrer"` outbound links on every page of the site, and an `<h2>` in the footer that competes with each page's own h2 for document outline. Note the link delta is **zero internal links** (both are external), so no link floor is touched |
| — | `underline decoration-[var(--copper)] decoration-1 underline-offset-4` link treatment (`:50`) | | RETIRE | retired idiom; footer links are `font-semibold text-slate-300 hover:text-white` |
| — | Local `SiteFooter.tsx` in full | `src/components/layout/SiteFooter.tsx` | RETIRE (delete) | replaced by the kit footer |

**Wiring:** none (the footer carries no `data-cta` today and gains none).
**JSON-LD:** none.

### A.3 `PageShell.tsx` (32 lines) + `layout.tsx` (127 lines)

Role derived: `grep -rn "PageShell" src/ -l` → `src/app/layout.tsx` (the mount, `:116`) and `src/components/ui/StickyCTA.tsx` (a comment). One real consumer.

| # | New (standard classes/component) | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | Kit `PageShell` with `nav`, `header`, `footer` props | `src/components/layout/PageShell.tsx` whole file, mounted `layout.tsx:116` | ADOPT-STANDARD → RETIRE local | shell ground `bg-[var(--background)]` (`PageShell.tsx:15`) becomes `bg-white`; skip link `focus:bg-[var(--accent)]` (`:18`) becomes `focus:bg-primary-700` (copper at the 600 step does not clear 4.5:1 under white text). `flex min-h-dvh min-w-0 flex-col overflow-x-clip` and `<main id="main">` are already the contract |
| 2 | `/embed/` early return, chrome-free | local shell has no bypass | ADOPT-STANDARD (id = **GATE M3**) | `src/app/embed/[slug]/page.tsx` + `src/app/embed/page.tsx` exist, and analytics already treats `/embed` as no-track (`layout.tsx:112` `noTrackPrefixes={["/admin", "/embed"]}`) while `StickyCTA.tsx:92` excludes it. Nothing strips the header and footer, so **10 partner-iframe URLs (one per registry tool, from ONE file) currently ship the full site chrome inside a partner's page.** `[DOM-CHECK]` the rendered `/embed/<slug>` before building. `/embed` itself (the gallery) keeps chrome; the trailing slash in `startsWith("/embed/")` is load-bearing |
| 3 | `<StickyCTA />` mounted **once**, site-wide, from `layout.tsx` as a sibling of `PageShell` | `PageShell.tsx:25` **and** `page.tsx:224` | KEEP-PAYLOAD-RESTYLE (**live defect fix**, id = **GATE M1** for cadence only) | **`StickyCTA` is mounted TWICE on the homepage.** `PageShell` mounts it for every route (`:25`) and `src/app/page.tsx:224` mounts a second instance. Deriving command: `grep -rn "StickyCTA" src/`. `StickyCTA.tsx:91-93` excludes only `/admin`, `/embed` and packages-mode `/pricing`; there is no singleton guard, so `/` renders two identical fixed bottom bars stacked on each other, and a dismissal of one leaves the other. `[DOM-CHECK]` count the rendered instances on `/`. De-duplicating is a defect fix, not a cadence change, so it is not itself gated. The **cadence** question (kit `PageShell` mounts none; Property mounts it on the homepage only; Medical shows it on every page) IS a gate |
| 4 | `<SpecialistWidget />` | `PageShell.tsx:29`, comment `:26-28` | KEEP | port as-is, change no threshold or cadence (appendix D.2). It is an existing capture surface |
| 5 | A.7 `<noscript>` `data-draw="off"` release block | **absent** (`layout.tsx`, 127 lines, zero `noscript`, zero `data-draw`; `grep -n "noscript\|data-draw" src/app/layout.tsx` → no matches) | ADOPT-STANDARD | load-bearing for every kit component that draws on IntersectionObserver (EyebrowRule, DrawnTickList, ProcessTimeline, StatsCounter, ScrollGlowGroup). Without it, no-JS and reduced-motion land on "undrawn", i.e. empty |
| 6 | `@theme` gains the full `--color-primary-50..950` copper ramp; `:root` gains `--radius: 0rem`, `--btn-radius: var(--radius-xl)`, `--btn-ground/-hover/-active`, `--hero-cream` | `globals.css:66-77` (`@theme inline` maps background, foreground, font-sans, font-serif and `--color-chart-1..5` only; **no Tailwind primary ramp, no radius token**) | ADOPT-STANDARD | the kit's `primary-*` utilities do not resolve without the ramp, and `--btn-radius` is what makes web-shared's `rounded-[var(--btn-radius,9999px)]` pill default render as the 4px house radius |
| 7 | `@source "../../../../packages/web-shared"` in `globals.css` | `globals.css:3` — **already present, verified** | KEEP | deleting or omitting it strips every kit component's classes from the Tailwind v4 build |
| 8 | Cormorant Garamond import + `--font-cormorant` + `--font-serif` + `.display-serif` | `layout.tsx:2,23-27,80`; `globals.css:70,159-163` | RETIRE | owner decision 2. The 131 `font-serif` / `display-serif` uses go with it |
| 9 | `src/config/site.ts:8` `const office = niche.company.registered_office;` | | KEEP-PAYLOAD-RESTYLE (**defect fix**) | Property guards the identical read at `Property/web/src/config/site.ts:20-25` after production `client_error` rows showed `niche.company` undefined under a partial chunk load. Port the guard verbatim. A defect, not a preference (playbook §1), so no gate |
| 10 | Every other `layout.tsx` provider and interruptive mount: `ConsentProvider`, `AnalyticsProvider` (`storagePrefix="ma"`, FROZEN, `:110`), `ConsentedScripts`, `IntentProvider`, `ReturningBar`, `DeepScrollModal`, `SpeedInsights` | `layout.tsx:106-123` | KEEP | port all, add none (appendix D.2). Do not change any threshold, cadence or the frozen storage prefix. **The GA4 mounting comment at `:91-94` describes a real compliance fix (GA4 only via `ConsentedScripts`); do not undo it** |
| — | `src/components/ui/layout-utils.ts` (29 lines, partial copy of the kit's) | | RETIRE → re-export | replace the file body with `export * from "@accounting-network/web-shared/design/layout-utils";`. **This is the smallest edit point in the whole slice: 55 files import from it** (deriving command: `grep -rn "layout-utils" src/ -l | wc -l` → 55, of which 1 is the file itself). One edit moves `btnPrimary/btnSecondary/btnOnDark/focusRing/siteContainer*/contentNarrow/sectionY` to the standard for every call site at once and adds the missing `siteContainerXl`, `btnOnCream`, `heroCreamSurface`. It also deletes `sectionYLoose` (`:17`), which is used on the homepage and must be swapped there in the same commit or the build breaks |

**JSON-LD (site-wide, `layout.tsx:85`):** `buildOrganizationJsonLd()` + `buildWebSite()`. KEEP as-is.

### A.4 Wordmark — `src/components/brand/BrandWordmarkHomeLink.tsx` (41 lines)

Renders **text only**: two spans ("MEDICAL ACCOUNTANTS" / rule / "UK") plus an `sr-only` tagline, no raster and no icon. Importers derived: `SiteHeader.tsx:6`, `SiteFooter.tsx:2`. Both go away with their hosts.

- The kit header and footer render the lockup themselves from `wordmarkIcon` / `wordmarkTop` / `wordmarkBottom` props (`chrome/SiteHeader.tsx:62-67`). Pass `wordmarkTop="Medical Accountants"`, `wordmarkBottom="UK"` — the current visible strings, kept verbatim.
- **`wordmarkIcon` has no candidate on this site.** `grep -rn "Backdrop\|Motif" src/` returns zero; `src/app/icon.svg` exists but is a favicon, not a component. **GATE M4** covers the mark and the motif together.
- The kit builds `aria-label` from the visible strings (WCAG 2.5.3) and applies the `max-w-[13rem] sm:max-w-none` cap. Medical's local cap is `max-w-[11rem] sm:max-w-none` (`:152`); the kit value lands automatically and is what the A.1 row-3 breakpoint fix assumes.
- `src/components/brand/BrandLogoHero.tsx` (26 lines, one importer: `page.tsx:239`) does **not** survive. See B.3.

### A.5 Backdrop motif

**Does not exist as a component.** The nearest thing is `globals.css:113-131`: `.hero-brand::before` (two copper radial gradients) and `.hero-brand::after` (a 60x60 white grid SVG data-URI at 0.05 stroke-opacity, 0.3 element opacity). That is a CSS texture, not the appendix E motif, and it dies with `.hero-brand`.

Build one local component, `src/components/layout/MedicalBackdrop.tsx`, mirroring `Property/web`'s `HeroBrickBackdrop`: `aria-hidden` inline SVG, `absolute inset-y-0 right-0 w-[55%] hidden sm:block`, navy tone `stroke-opacity .18` with mask `to left, black 35% → transparent 92%`; cream tone `.1` / 45% / 97%. Host must be `relative overflow-hidden` with content at `relative z-10`. Consumed by: the kit footer's `backdrop` prop, the homepage navy hero, the homepage `#book` band, the blog `#enquiry-form` band, the 8 hub heroes. **GATE M4** sets the motif subject.

---

## B. HOMEPAGE — `src/app/page.tsx` (618 lines)

**Link floor: not yet captured** (`link_baseline.json` absent). The Phase 1 builder must read `/`'s floor from the baseline before writing, and the sections below add links (calculator bridge, insights rows, derived footer columns) rather than remove them. Measured in source: **0 em-dashes** on this file (`grep -c "—" src/app/page.tsx` → 0), **4 `data-cta` attributes**.

Final rendered order, **15 sections**, mapping F.2 onto what Medical has today:

1. **`<StickyCTA />` is NOT mounted here.** It ships site-wide from `layout.tsx` (A.3 row 3). This removes the duplicate mount at `:224`. Deliberate divergence from F.2 in this list, and it is a defect fix.

2. **JSON-LD set.** Today the page emits `FAQPage` via `buildFaqPage(HOMEPAGE_FAQS)` (`:219,226-231`) and a homepage service schema (`:220,232-235`), and a comment at `:225` records that Organization moved to the root layout. **ADD** `WebPage`, `BreadcrumbList` and `AccountingService` in the same `<script>`; **KEEP** `FAQPage` bound to `HOMEPAGE_FAQS`, which is already the same array the FAQ section renders (`:599`). The same-array rule is already satisfied here (T17 clean).

3. **NAVY MOTIF HERO** — `relative flex items-center overflow-hidden bg-slate-900 py-10 sm:py-12 lg:py-14 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]` + `<MedicalBackdrop />`, content `relative z-10`, copy block `max-w-3xl`. `<Eyebrow onDark>` + live-pulse badge (**GATE M5**) → `<h1>` `text-3xl leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl` → standfirst `mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/90` → CTA row `flex flex-col sm:flex-row gap-3 sm:gap-4` → 5 trust badges.
   Replaces `:236-272`: a `.hero-brand` CSS-gradient band with `sectionYLoose`. **Better than the solicitors equivalent in one respect and worse in another:** there is no third-party image hotlink here (the texture is an inline data-URI, `globals.css:129`), but **`BrandLogoHero` sits above the `<h1>` at `:239` and repeats the wordmark at hero scale**, so the first thing on the page is the brand name in 20px tracked caps, twice (the header lockup is 30px above it). The `<h1>` itself does exist (`:241-244`), unlike on solicitors, and it is `display-serif` + `max-w-4xl` + `text-[1.75rem] md:text-[2.75rem]` — an off-scale custom size that tops out at 44px against the contract's 72px.
   Trust badges (all re-derivable, no promise, no count): "NHS Pension annual allowance and the taper" · "GP partnership accounts and superannuation certificates" · "Locum IR35, status per engagement" · "Private practice incorporation modelled, not assumed" · "UK-wide, with the four-nation contract differences accounted for".

4. **Hero primary CTA** → `href="#book"`, `data-cta="hero_primary"`, `${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`. Currently `activeCta.hero_primary.href` = `/contact` (`:252-259`, config `niche.config.json:245-248`). Requires `cta.variants.leadgen.hero_primary.href` → `#book` (DS §7: the hero primary comes from the config; only the header CTA and StickyCTA leave for `/contact`).

5. **Hero secondary** → `href="#calculators"`, `${btnOnDark}`, `data-cta="hero_secondary"`. Currently `/free-practice-health-check` via a bespoke inline class stack (`:263`) that duplicates `btnOnDark` at 1px border and `rounded-full`. **The health check is a live capture surface**, so moving the hero secondary off it is a funnel change, not a restyle. `[DOM-CHECK]` its click volume with the funnel-baseline agent before the swap; if it carries volume, keep `/free-practice-health-check` as the hero secondary and put `#calculators` on a third link in the stats strip. Recorded as **GATE M6**.

6. **STATS STRIP** `border-b border-slate-200 bg-white py-5 sm:py-7` + kit `StatsCounter` (`grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4`). Replaces `<StatsBar stats={siteStats} />` at `:284`.
   **Copy fixes, mandatory.** `src/config/service-tiers.ts:72-77` ships `{ value: "1 day", label: "Response time" }` with the comment "Claimed on homepage and contact page: We respond within one working day". That is a **turnaround promise** and comes out (**GATE M7** picks the replacement). `:66-71` `"9+"` "Specialist guides" is **wrong on its own evidence**: the source comment says "9 subdirectories under src/app/blog", but `ls src/app/blog` returns 8 hub directories plus `[slug]`, so the count is the dynamic route counted as a guide. There are **8** category hubs and **6** medical guides (`grep -c "slug:" src/lib/medical-guides-data.ts` → 8 lines, of which 6 are entries and 2 are the type and the helper). Derive from `getAllCategories().length` and `MEDICAL_GUIDES.length`; never type a count. `:54-59` "10 Free calculators" is correct (`registry.ts:22-32`, 10 tools) and stays. `:60-65` "6 Service areas" matches `services/page.tsx` and stays.
   **T15 applies**: `StatsCounter` counts from 60% of target, so the true value must be in the pre-hydration HTML.

7. **PROBLEM STATEMENT + PROMPT MARQUEE** on `bg-slate-50`. Argument left, `PromptMarquee` right. **T12: the kit `marketing/ProblemStatement.tsx` hardcodes Property's landlord copy with no copy props.** Mirror it locally as `src/components/marketing/ProblemStatement.tsx`, structure copied, copy ours; do not edit the kit. Same for `marketing/ComparisonTable.tsx`.
   Replaces the four `realityPoints` cards (`:99-116`, rendered `:308-327`, "Most GPs and consultants face avoidable tax complications"). Prompt set in §D.2.

8. **WHO WE ARE** on white — Eyebrow + h2 + `Prose` + `DrawnTickList` (`tickClassName` at the copper 700 step; the kit default 400-step tick is tuned for navy and fails on white). Re-sets `whySpecialistItems` (`:190-203`, rendered `:329-344`). Currently three prose cards in a `card-flat` grid with no visual.

9. **WHY CHOOSE US** on `bg-slate-50` — re-sets `trustItems` (`:172-188`, rendered `:288-306`) and the `specialistRows` table (`:205-212`, rendered `:422-446`) via the **locally mirrored `ComparisonTable`**: stacked below `md:`, `<table min-w-[36rem]>` inside `overflow-x-auto` above, our column primary-edged, neutral slate minus for the other side, plus `ExampleFigureNote`.
   **Copy fixes, mandatory.** `:173-177` `trustItems[0]` "Medical work only / **100%** / No general practice clients from outside medicine. Every enquiry that comes through this site is from a GP, consultant, locum..." is a **fabricated statistic attached to a client-composition claim** and an assertion about every enquiry that no data supports. `:183-187` "Answered by a working day / **1 day** / Enquiries sent through this site get a reply within one working day" is a **turnaround promise**. Both come out.
   **The comparison table has ONE data column** (`:426-433`: "Area" and "{siteConfig.name}") and therefore compares nothing, exactly as on solicitors. It needs a real "with a generalist accountant" column or it is not a comparison. **GATE M8.** Its six `detail` strings are also unfalsifiable capability assertions ("Handled with specialist knowledge", "Maximised correctly", "Prepared accurately") that read as quality claims; rewrite them as statements of what the work is.

10. **SERVICES GRID** on `bg-primary-50/60`, 6 glow cards `rounded-xl border border-primary-100 bg-white p-6` + icon badges, on `ScrollGlowGroup`. Re-sets `howWeWorkItems` (`:139-170`, rendered `:371-403`).
    The numerals `01`-`06` (`:141` etc., rendered `:384-389` in `font-serif` copper) go: these are **six equivalent service areas, not a sequence**, and the `<ol>` at `:381` actively asserts an order that does not exist (§0.2, "the shape comes from the claim"). Each card links to its matching route so the Who-we-help footer column has children to derive from.
    **Copy fix:** `:148` is a 60-word paragraph containing a correct and re-derivable fact (lifetime allowance abolished 6 April 2024, LSA/LSDBA replacing it) sitting inside a services card; keep the fact, move it to the pillar page, and give the card a one-sentence body like its five siblings.

11. **WHO WE WORK WITH** on white — `CoverageCards` (3 col, icon badge, tone opposing the section ground), re-setting `whoWeWorkWith` (`:118-137`, rendered `:346-369`).
    **Ground collision fixed:** `:346` (`bg-[var(--background)]`) sits directly under `:329` (`bg-[var(--surface)]`) and directly above `:371` (`bg-[var(--background)]`), so sections 10 and 11 share a ground with no boundary (§0.1, §9). Three consecutive `bg-[var(--background)]` sections run `:288`, `:308`, and again at `:346`/`:371`.
    **Note the missing fourth card:** the site has `/for-junior-doctors` as a real route and a footer link, but `whoWeWorkWith` covers only GPs, consultants and locums. Adding it is a content decision, not a design one; flag it, do not invent copy.

12. **`#calculators` white + `CalculatorTabs`** with an explicit `tabs` list (max 5 of the 10: `nhs-pension-calculator`, `locum-tax-calculator`, `incorporation-calculator`, `nhs-pension-scheme-pays`, `gp-partner-drawings-planner`) + a **literal** `<a href="/calculators/nhs-pension-calculator">` and "See all 10 calculators" `data-cta="home_calculators_all"`.
    **Net-new: the homepage has no on-page tool today**, and no link to `/calculators` at all in the body (the only route to the fleet from `/` is the footer and the `ServiceTiers` card at `:19`). The literal href is not optional: `packages/web-shared/design/guards/calculator-tabs-crawl-path.ts` is a source scan and cannot see through a constant (§0.4). Derive "10" from `allTools().length`; never type it.

13. **LATEST INSIGHTS** on `bg-slate-50`, `divide-y` row list, 3 posts + "View all articles" + "Browse medical guides". Re-sets `:450-494`.
    Current cards are `card-premium` with `font-serif` titles inside a `<Link>` wrapping the whole card, so each card is one link (good) but the section sits in a `sectionYLoose` band on the same `bg-[var(--background)]` as its neighbour. `PRACTICAL_SLUGS` (`:93-97`) is a hardcoded 3-slug list resolved by `getPostBySlug`; **it silently renders fewer than 3 cards if a slug is renamed** (`:215-217` filters out nulls). Keep the hand-picked selection (it is editorial, not accidental) but add a build-time assertion that all three resolve.

14. **`#book` NAVY CLOSING** — `<div id="book" className="scroll-mt-24">` wrapping kit `LeadCTAPanel`: `relative overflow-hidden bg-slate-900` + motif, `grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16`, `<Eyebrow onDark>` + h2 + 3 proof rows with `h-12 w-12 rounded-xl` check badges left, white `rounded-xl p-6 sm:p-8 lg:p-10` card holding `<LeadForm />` right.
    Replaces `:520-592`: a two-column band on `bg-[var(--surface)]` with the copy left and `<LeadForm submitLabel="Send enquiry" />` in a `card-flat` right. It is **already the LeadCTAPanel shape** and is the closest thing on the page to the standard. What it lacks is **`id="book"` and `scroll-mt-24`**, so nothing on the page can scroll to it, which is exactly why item 4's hero CTA currently leaves for `/contact`. This is the single structural fix that makes items 4 and 12 possible.
    **Copy fixes, mandatory:** `:552` and `:574` both render "We respond within one working day." (**turnaround promise**, two instances). `:554` "usually the same working day" (**turnaround promise**). `:576` "No hard sell" is a client-behaviour framing. `:579` "You'll speak to someone who works with medical professionals every day" is a team-composition claim and carries a typographic apostrophe inconsistency with the rest of the file.
    **`:581-584` KEEP VERBATIM.** The partner-network disclosure paragraph linking `/privacy-policy` is compliance payload that matches `site.ts:19` `leadConsentText`. Do not reword it in either direction (T18).
    **`packagesMode` branch (`:523-556`) is retained**, not deleted: `isPackagesMode(niche)` is false today (`niche.config.json:233` `"variant": "leadgen"`), but `home_cta_primary` / `home_cta_secondary` are live analytics ids and the branch is the only thing that emits them.
    **D.1 invariant, `[DOM-CHECK]` required:** `LeadForm` labels are dark; it renders on the WHITE card, never on the navy. The navy-ground variant shipped invisible labels at 1.00:1 on Property and generalist. Curl the rendered form and assert the label colour.
    `consent_text` is a **carve-out**: `src/config/site.ts:19` `leadConsentText` is pinned by the 2026-08-24 conversion incident (T19). Do not touch it, in any direction, for any reason.
    Proof rows (no promise, no count): "NHS Pension input amount checked before any Scheme Pays decision" · "IR35 read per engagement, not per contract" · "One named accountant who already knows what superannuation is".

15. **FAQ white, last** — 7 items in `HOMEPAGE_FAQS` (`:25-61`), already paired with `buildFaqPage` on the same array. Replaces the `<details>` list at `:594-616`.
    **DECISION, and it is the OPPOSITE of the solicitors port: do NOT adopt kit `FaqSection` on the Medical homepage. Mirror the native `<details>` locally and restyle it.** The reason is specific and verified: `packages/web-shared/design/primitives/FaqSection.tsx:34-41` is a Radix `Accordion type="single" collapsible` with no `forceMount`, so **closed answers are not server-rendered**. Medical's current `<details>`/`<summary>` block puts all 7 answers in the pre-hydration HTML with zero JavaScript. Solicitors could adopt the kit because its homepage emitted no FAQ schema at all, so nothing was being taken away. Medical's answers are in the schema too, but swapping a fully server-rendered, no-JS, keyboard-native disclosure for a JS-dependent one that hides its own body text is a regression on the site's highest-authority page. Record it in `docs/medical/DESIGN_DELTA.md` §3 as a sanctioned deviation.
    Restyle only: `card-flat` → `rounded-xl bg-slate-50 ring-1 ring-slate-200/70`, `display-serif` heading → `text-2xl font-bold sm:text-4xl`, drop the `max-w-3xl` clamp at `:598`, keep the `+` rotate affordance, keep `open:shadow-md`.
    Keeping FAQ last also keeps the navy `#book` band off the navy footer (§9, canonical tail = panel, FAQ, footer).

**Wiring:** `hero_primary` (`#book`, placement `hero`, goal `form`) · `hero_secondary` (placement `hero`, destination per GATE M6) · `home_calculators_all` (net-new, `/calculators`, placement `home_calculators`) · `home_cta_primary` / `home_cta_secondary` retained inside the `packagesMode` branch only. All carry `data-cta-variant`.

**RETIRED on this page:** `BrandLogoHero` above the h1 (`:239`) · `btnMailOutline` (`:63-64`) · the bespoke hero-secondary inline class stack (`:263`) · `StatsBar` + `siteStats[3]` "1 day" tile · `TestimonialSlider` section (`:496-506`) — see **GATE M9** · `ServiceTiers` + `featuredBadge="Most popular"` (`:508-518`) — see **GATE M10** · the standalone `<Link href="/contact">Arrange an initial call</Link>` bare button at `:397-401` (§7: a bare button is not a CTA block) · the orphan standfirst band at `:274-280` (a single `max-w-3xl` paragraph on its own full-height section, which folds into the hero standfirst) · every `display-serif` / `font-serif` heading (11 on this file) · every `max-w-3xl` / `max-w-4xl` body clamp · `card-flat` / `card-premium` / `section-label` global CSS classes · `sectionYLoose`.

**JSON-LD:** `WebPage` + `AccountingService` + `BreadcrumbList` (all net-new) + `FAQPage` (exists, same array, keep) + the homepage service schema (`buildHomepageServiceSchema`, exists, keep and re-point at the same `howWeWorkItems` array it already reads at `:220`).

**Pricing (owner decision context).** Unlike solicitors, **the Medical homepage publishes no fee**. `src/config/service-tiers.ts` carries no monetary value; `ServiceTiers` renders three named tiers with feature lists and `/contact` or `/calculators` destinations. The `£29`/`£59` strings in `Medical/niche.config.json:213-231` sit under the **inactive** `variants.packages` block and do not render under the live `leadgen` variant. Verified by reading the file: the pound sign is stored **literally** in `niche.config.json`, not as `£`, so a plain grep finds it here (the generalist T6 trap does not transfer to this file). `[DOM-CHECK]` `/` for `£` before signing this off.

---

## C. BLOG SUBSYSTEM

### C.0 Ground truth and the smallest edit points

**Medical's blog URLs are FLAT (`/blog/<slug>`) and STAY flat** (manager decision, rollout §4.6.4). Property's nested `/blog/<category>/<slug>` shape does not come across.

| Surface | Routes | Files to touch |
|---|---|---|
| Blog posts | **88** (`ls content/blog/*.md \| wc -l` → 88) | **2**: `src/app/blog/[slug]/page.tsx` (79 lines, data only) and `src/components/blog/BlogPostRenderer.tsx` (334 lines, all markup). Do not open a single `.md`. |
| Category hubs | **8**, all hand-built | 8 page files, 252-501 lines each, converging on one kit call |
| Blog index | 1 | `src/app/blog/page.tsx` (81) + `src/components/blog/BlogListWithSearch.tsx` (260) |

**Category ground truth (verified; `grep -h "^category:" content/blog/*.md \| sort \| uniq -c`, quoted and unquoted forms summed; total 88):**

| Category (frontmatter) | Posts | `slugifyCategory` output | Hub route exists |
|---|---|---|---|
| GP Accountant Services | 17 | `gp-accountant-services` | yes |
| GP Practice Management | 20 | `gp-practice-management` | yes |
| GP Tax & Accounts | 18 | `gp-tax-and-accounts` | yes |
| Incorporation & Company Structures | 9 | `incorporation-and-company-structures` | yes |
| NHS Pension Planning | 9 | `nhs-pension-planning` | yes |
| Private Practice | 6 | `private-practice` | yes |
| Locum Tax | 6 | `locum-tax` | yes |
| Medical Expenses | 3 | `medical-expenses` | yes |

`slugifyCategory` (`src/lib/blog.ts:106-114`) lowercases, strips `()`, maps **`&` → `and`**, spaces to hyphens, collapses runs. So `GP Tax & Accounts` → `gp-tax-and-accounts`, matching the hub directory exactly. **This differs from Solicitors, where `&` is deleted.** Every CTA map, filter and guard in this slice keys on **this output**, never on the raw label.

**Two facts the brief did not carry, both load-bearing:**

1. **`niche.config.json:127-137` lists NINE categories; only EIGHT have posts.** "Consultant Tax" is configured and has zero `.md` files and no hub route. `getAllCategories()` (`blog.ts:120-136`) derives from posts, not config, so the phantom category never renders — but any code that reads `content_strategy.categories` instead would emit a dead ninth hub. Key on `getAllCategories()`.
2. **The 8 hubs and the 88 posts share one URL segment.** Hubs are static `src/app/blog/<slug>/page.tsx`; posts are `src/app/blog/[slug]/page.tsx`. Next resolves static before dynamic, so a post whose `slug` equalled a category slug would be **permanently shadowed and unreachable**. Verified: no collision today (checked each of the 8 hub slugs against `content/blog/<slug>.md`; none exists). Add a build-time guard test asserting the two sets stay disjoint. This is the structural cost of flat routing and it must be written down.

**Link floors in this family:** not yet captured. `/blog` is the highest-value route in the slice and its floor must be read from `link_baseline.json` before the C.2 work starts.

### C.1 `BlogPostRenderer.tsx` (334 lines → renders 88 pages)

Role derived: `grep -rn "BlogPostRenderer" src/ -l` → `src/app/blog/[slug]/page.tsx` (the only mount, `:76`), plus a comment in `layout.tsx:104`, a comment in `PremiumUpgrade.tsx`, and `src/tests/intent-engine.test.ts`.

**THE FAQ DECISION.** `:256-270` renders FAQs as a plain `<dl>` and — unlike Solicitors — `:265` renders `{faq.answer}` as **escaped text**, not `dangerouslySetInnerHTML`. So there is no raw-markup risk in adopting the kit. But the SSR argument still bites: the kit `FaqSection` is a Radix accordion whose closed content is not server-rendered, and Medical's `<dl>` puts every answer in the pre-hydration HTML on 88 pages. **DECISION: mirror the `<dl>` locally, restyled; do NOT consume kit `FaqSection` in the blog.** Same conclusion as Solicitors, one of the two reasons. Record in `DESIGN_DELTA.md` §3.

New reading order (F.3), adapted to flat paths:

1. `<ReadingProgress />` (`:99`). **KEEP.** `src/components/blog/ReadingProgress.tsx` is a 3-line re-export of `@accounting-network/web-shared/content/ReadingProgress`. Re-point at `design/blog/ReadingProgress` if the two differ; otherwise leave it.
2. `<article className="bg-white py-12 sm:py-16">` → `siteContainerLg` → `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12`. **Already conforming** (`:100,106-107`). KEEP. **Remove the redundant inner `max-w-4xl` at `:108`**, which double-clamps the main column inside the grid track.
3. `<Breadcrumb>` on white. Already correct (`:109-115`) and it is a **two-level trail: Home → Blog → title**, with no category level, because the URL has none. **ADAPTATION FOR FLAT PATHS: insert the category as a third crumb linking to `/blog/${categorySlug}`** (the hub route, which exists for all 8). `categorySlug` is already a prop (`:27`), so this costs nothing and adds one unique internal link to all 88 posts. **Do NOT swap in the kit `Breadcrumb`** without checking JSON-LD: the local `src/components/ui/Breadcrumb.tsx` takes a `suppressJsonLd` prop (used at `locum-tax/page.tsx:65`), so it emits a BreadcrumbList by default; the kit one emits its own and would double it (T17 class). `[DOM-CHECK]` how many `BreadcrumbList` nodes a post page emits today.
4. **HEADER CARD** `rounded-xl bg-slate-50 p-8 mt-6`: `<Eyebrow>` = `post.category`, `<h1>` `text-3xl sm:text-4xl md:text-5xl`, meta pills (`inline-flex min-h-7 rounded-full bg-white px-3 py-1 text-xs font-semibold ring-1 ring-slate-200`; the Updated pill in primary tint), summary `mt-5 text-base leading-7 text-slate-600`.
   Replaces `:116-144` (a `border-l-4 border-[var(--copper)]` header block, which is the retired left-rule idiom and also assigns brand copper to what reads as an alert bar) plus the separate summary block at `:163-167`, which is a **second** `border-l-4 border-[var(--copper)]` box immediately below the first. The `<h1>` scale at `:120` is already correct.
   **There is no photo hero to retire.** Unlike Solicitors, `post.image` already renders in-body at `:173-184` as a bounded `next/image`. **KEEP it, restyle:** `border-2 border-[var(--border)]` → `rounded-xl ring-1 ring-slate-200/70`. **Drop `priority`** (`:181`): the image is below the fold on every post, and `priority` on a below-fold image costs LCP on 88 pages for nothing.
5. **`sourcesVerifiedAt` block KEPT** (`:146-161`). This is exactly the §4.6.1 carve-out class: a sibling frontmatter feature Property lacks, which the ported renderer must keep rendering. Restyle from `border-l-4 border-[var(--copper)]/30` to a `NoticeCard`-shaped slate tone. **The copper tick icon must lose its warning reading** (owner decision 1) — it is a verification mark, so slate or the primary ramp, not the warning ladder.
6. **`keyTakeaways` block KEPT** (`:186-205`). Same carve-out class. Restyle `rounded-lg border-l-4` → `rounded-xl bg-slate-50 ring-1 ring-slate-200/70` + `EyebrowRule`, and **add `id="answer-box"`** so it becomes the GEO answer surface. The code comment at `:187` says "absent for 0/73 posts currently" — that number is **stale twice over**: there are 88 posts now, and the comment's own phrasing is ambiguous. Re-derive the count before writing copy that depends on it.
7. **Skip link** `data-cta="blog_skip_to_form"` → `#enquiry-form`, inside the header card. **Net-new.** There is nothing like it today.
8. **Body** `.article-body.prose-blog mt-10` (17px / 1.75 / 65ch; h2 28px with a 4px primary left border; h3 22px). The tiered injection logic at `:207-254` is **ahead of Property**: a 60%-depth `<h2>` split (`:36-47`), `PremiumUpgrade` island, `MiniCapture`, `InlineMiniLeadForm`, and a short-post fallback branch for posts with fewer than 4 h2s. **Port the logic unchanged, restyle only** (§4.6.3). Restyle: the two `MiniCapture` `className`s at `:228` and `:250` are `rounded-2xl border-l-4 border-[var(--copper)]` → `rounded-xl bg-slate-50 ring-1 ring-slate-200/70`.
9. **`#enquiry-form`** `<section id="enquiry-form" className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24" aria-labelledby="enquiry-form-heading">` + motif, white card `mt-8 rounded-xl bg-white p-6 sm:p-8` holding `<LeadForm redirectOnSuccess={false} />`.
   Replaces `:290-300`: already a navy panel with a heading and `LeadForm redirectOnSuccess={false}`, which is most of the shape. What it lacks: **`id`, `scroll-mt-24`, `aria-labelledby`, and the white card** — so `LeadForm` currently renders **directly on the navy ground**, which is the D.1 invariant breach that shipped invisible labels on 783 Property articles. **`[DOM-CHECK]` this first; it may be a live accessibility defect on 88 pages.** Also `rounded-2xl` (A.2 defect). And nothing on the page can anchor to it.
   One generic CTA (`activeCta.blog.cta_heading/body/button`, `niche.config.json:262-266`) is shared by all 8 categories today.
10. **Per-category CTA map** `CTA_BY_CATEGORY` in a new `src/lib/blog-cta.ts`, keyed on `slugifyCategory` output, with fallback to `getActiveCta(niche).blog.*` and the `packagesMode` bypass preserved. A guard test asserts every one of the 8 slugs has a key and that the key set equals `getAllCategories().map(c => c.slug)`. Copy map in §D.1.
11. **FAQ `<dl>`, mirrored locally, restyled.** Card `rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70` (was `border-l-4 border-[var(--copper)]`, `:263`); `<dt>` `text-base sm:text-lg font-bold text-slate-900`; `<dd>` `mt-3 text-base leading-relaxed text-slate-700`. Heading `text-2xl font-bold sm:text-4xl` (was `text-3xl`, `:258`).
    **Same-array rule, and the live bypass.** `post.faqs` feeds the `<dl>` and, via `buildBlogPostingJsonLd`, the `FAQPage` block. But **`:74-75` bypasses the builder entirely**: `post.schema?.trim() || buildBlogPostingJsonLd(...)`. Any post shipping its own `schema` frontmatter renders the `<dl>` while emitting whatever that string says. Add a guard test that no post carries both a non-empty `schema` and non-empty `faqs`, or make the renderer always append `buildFaqPage(post.faqs)` alongside a custom schema. This is T17 in its live form. Count how many of the 88 posts set `schema:` before choosing which fix.
12. **Author aside** `rounded-xl ring-1 ring-slate-200/70`. Replaces `:272-286`. **Fix the broken class stack at `:273`**: `hidden sm:block shrink-0 w-14 h-14 rounded-full ... flex items-center justify-center` sets `display:block` then `display:flex` on the same element, so the icon is not centred at any width. Same defect class as Solicitors', independently present here.
    **Copy fix:** `:283` "Learn more about our team" is a team-composition implication on a site with no named staff; "More about how we work" or a plain "About us" is the fix.
13. **Kit `RelatedArticles`** replacing the bespoke `border-l-4` row list at `:302-321`. Pills derive from the href so they cannot disagree with the destination. **FLAT-PATH ADAPTATION:** the kit component builds hrefs from the item it is given; pass `/blog/${slug}` explicitly rather than letting anything reconstruct a nested path.
    **Live defect in the data feeding it, fix in the same commit:** `getRelatedPosts` (`src/lib/blog.ts:74-104`) iterates `readdirSync` order and **breaks at `limit` before sorting** (`:87`, `:101-103`). So "related" is the first three same-category files in **alphabetical filename order**, then sorted by date among themselves. It is not the three most recent, and it is stable-but-arbitrary. Collect all matches, sort, then slice.
14. **SIDEBAR:** one `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` wrapper holding **`BlogSidebarCta`** (net-new, kit, navy `rounded-xl bg-slate-900 p-6`, anchors `#enquiry-form`, headings as `<p>` so they stay out of the TOC) then `TableOfContents`. Today the sidebar is TOC-only and its `sticky top-24` (`:325`) has **no height clamp**, so a long TOC scrolls off the bottom of the viewport with no way back. `TableOfContents` is a 4-line re-export of the shared component; keep or re-point.
    Feed `BlogSidebarCta` from the **same `CTA_BY_CATEGORY` entry** as the `#enquiry-form` heading, so the two cannot drift.
15. **`NextStepOffer`** (`:288`) renders a second closing offer immediately before the enquiry form: two consecutive asks. **GATE M11.**
16. **`TopicOverrideProvider` wrapper KEPT VERBATIM** (`:98`, `:332`). This is Medical's flat-routing compensation: `deriveTopic` returns null for flat blog paths, so the topic is resolved server-side from `post.category` via `topicFromCategory` (`:79`) and injected into the intent context, and `premiumTopic` comes from the `categorySlug` prop via `topicForBlogSlug` (`:84`). **Every intent surface on 88 pages depends on this.** The ported renderer keeps both derivations and keeps passing `categorySlug` down; nothing in this slice may read the topic from the URL. Guarded by `src/tests/intent-engine.test.ts`, which the phase plan lists as an explicit gate (§4.6.13).

**Wiring:** `blog_skip_to_form` (net-new, `#enquiry-form`, placement `blog_header`) · `blog_sidebar_book` (net-new, `#enquiry-form`, placement `blog_sidebar`) · existing `next_step` id from `NextStepOffer` retained or retired per GATE M11. **No `data-cta` exists anywhere in the blog subsystem today**, so 88 posts, 8 hubs and the index contribute zero rows to `vw_cta_performance`.
**RETIRED:** the double `border-l-4` header/summary stack (`:116-144`, `:163-167`) · the bespoke related list (`:302-321`) · the redundant inner `max-w-4xl` (`:108`) · `priority` on the in-body image (`:181`) · `rounded-2xl` on the enquiry panel (`:290`).
**JSON-LD:** `BlogPosting` (+ nested `FAQPage`) from `buildBlogPostingJsonLd`, unchanged, plus the `post.schema` bypass guard. `HowTo` from `buildPostHowToJsonLd` (`[slug]/page.tsx:71,75`) **KEEP** — another sibling feature Property lacks. **Do not add a second BreadcrumbList.**

### C.2 `/blog` index — `src/app/blog/page.tsx` (81 lines)

The slice's highest-floor route and its worst-built page.

| # | New | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | `siteContainerLg` page measure; `contentNarrow` survives on the hero copy block only | `:33` the **entire page body** is `contentNarrow` (`max-w-3xl`) | ADOPT-STANDARD | the §0.1 headline defect, applied to the route with the highest link count in the slice |
| 2 | Navy motif index hero `min-h-[300px] sm:min-h-[350px]` + breadcrumb + Eyebrow + h1 + standfirst + CTA row (`#book` / `#articles`) | `:40-45` a bare `<h1 className="font-serif …">` sitting directly on the page ground, with a `<p>` under it. No hero, no eyebrow, no CTA | ADOPT-STANDARD | F.4 / A.4. The page has no ask above the fold and no ask at all |
| 3 | ONE merged filter band: 8 category chips at the 48px `rounded-xl border-2` recipe | `:48-72` a `min-h-[120px]` card grid of all 8 categories ("Comprehensive Guides by Topic") **and**, at `:75`, whatever `BlogListWithSearch` renders from the same `categories` array | ADOPT-STANDARD | **two competing category lists on one page.** Eight 120px cards is far too heavy a treatment for a filter, and the second list makes it a duplicate |
| 4 | Kit `BlogListWithSearch` + `HubArticleList` (12 visible, the rest carried with the `hidden` attribute, never `slice()`) + `NumberedPagination` | `:75` local `BlogListWithSearch` (260 lines, `"use client"`) receiving `posts={posts}` | ADOPT-STANDARD + **PAYLOAD FIX** | **`:29` passes `getAllPosts()` straight into a client component**, and `BlogPost` carries `contentHtml` (`blog.ts:44`), so **the full HTML body of all 88 posts is serialised into the RSC flight payload of `/blog`.** Project to `{ slug, title, summary, category, categorySlug, date, readTime }` before the boundary. Also: the local list paginates at 12 (`:29` `postsPerPage = 12`) — verify whether it slices or hides; if it slices, that is a §0.6 crawl-path breach on 76 of 88 posts. `[DOM-CHECK]` |
| 5 | Net-new `#book` `LeadCTAPanel` | absent | ADOPT-STANDARD | the highest-traffic non-home page in the slice has **zero capture** today |
| 6 | Slate-50 category tail last (navy never touches navy, §9) + a literal calculator bridge link | absent | ADOPT-STANDARD | §9 and §0.6 |
| 7 | `CollectionPage` + `BreadcrumbList` JSON-LD | the page emits **none**; the local `Breadcrumb` at `:35-40` is called without `suppressJsonLd`, so `[DOM-CHECK]` whether it emits a trail on its own | ADOPT-STANDARD | exactly one of each |

**Em-dashes:** `grep -c "—" src/app/blog/page.tsx` → **0 in source**. But the client payload inlines 88 post summaries, so the **rendered** `/blog` will carry every em-dash in every summary. On Solicitors this made the recorded baseline (0) diverge from the live page (149). **Re-derive `/blog`'s dash count against the rendered page before treating the baseline as a gate**, or the payload projection in row 4 will read as a large dash improvement and any real regression will be invisible underneath it. Site-wide source count: **147 em-dashes across `Medical/web/src`**.

### C.3 The 8 hand-built category hubs — `src/app/blog/<slug>/page.tsx`

All eight share one shape (verified in full on `locum-tax/page.tsx`, 263 lines; the other seven were read at their structural anchors and differ only in copy and length: `gp-accountant-services` 254, `gp-practice-management` 252, `gp-tax-and-accounts` 253, `incorporation-and-company-structures` 260, `medical-expenses` 257, `private-practice` 262, `nhs-pension-planning` **501** — the outlier, roughly double, and it must be read in full before it is converted).

| # | New | Replaces (file:line, `locum-tax` as the exemplar) | Verdict | Why |
|---|---|---|---|---|
| 1 | Converge all eight on kit `blog/BlogCategoryHub`, passing the existing hand-written prose as `sections: HubSection[]` | `:56-262` in each of 8 files | ADOPT-STANDARD | eight 250-to-500-line hand-rolled layouts collapse to eight data files. **The prose is the asset and it is kept verbatim**; only the layout goes |
| 2 | Cream motif hero (`heroCreamSurface`, `min-h-[360px] sm:min-h-[420px] lg:min-h-[440px]`) + breadcrumb + Eyebrow + h1 + standfirst + CTA row (`#enquiry-form` / `#articles`) | `:62-82`: `contentNarrow` page wrapper + a `border-l-4 border-[var(--primary)]` header block | ADOPT-STANDARD | `contentNarrow` clamps the whole page body (§0.1); there is no hero and no CTA above the fold. Note `:71` uses `var(--primary)`, which resolves to **navy**, not copper, so these hubs and the post renderer use two different left-rule colours for the same idiom |
| 3 | Each `HubSection` gets a figure or a card set; none ships as prose alone | `:84-204` five prose-only `<section>`s of h2 + `<p>` | ADOPT-STANDARD | §0.2. A wall of paragraphs is the pre-redesign template. This is the largest content deliverable in the slice: **8 hubs × 3 to 4 sections needing a visual** |
| 4 | Filter on `slugifyCategory(p.category) === "<slug>"` | `:33` `allPosts.filter((p) => p.category === "Locum Tax")` | ADOPT-STANDARD | **raw-label keying in all 8 hubs**, the exact pattern that produced Property's 57-posts-wrong-CTA and 228-pages-wrong-related bugs. One spelling variant in one frontmatter block silently empties a hub. The frontmatter already carries both quoted and unquoted forms of the same labels, so the surface area for a drift is real. Key on the slug |
| 5 | `#enquiry-form` `LeadCTAPanel` with the category's `CTA_BY_CATEGORY` entry, white card holding `LeadForm redirectOnSuccess={false}` | `:245-259`: a `rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5` card holding a bare `LeadForm`, with no `id` and no `scroll-mt-24` | ADOPT-STANDARD | §0.5: no bare `LeadForm` in a coloured card, and nothing can anchor to it. The gradient is a retired idiom |
| 6 | `HubArticleList`, 12 visible / rest `hidden`, all crawlable | `:206-243` a bespoke `rounded-2xl` `font-serif` card list rendering **every** post in the category with no pagination | ADOPT-STANDARD | one article-card component estate-wide (§0.6). No slicing today, so no crawl-path regression to fix here, only a component swap |
| 7 | Other-topics chip tail LAST, all 8 minus self | **absent in all 8** | ADOPT-STANDARD | the hubs have no sibling navigation at all, so each is a crawl cul-de-sac back to `/blog`. Adding it raises every hub's unique internal link count and cushions the floors |
| 8 | `BreadcrumbList` + `CollectionPage` at `:36-54`, with `suppressJsonLd` on the local `Breadcrumb` at `:65` | | KEEP | already correct and already de-duplicated, which is the pattern the post renderer should copy. **Make sure `BlogCategoryHub` does not emit a second `CollectionPage`**; check the kit component's own schema output and pass through, or drop the page-level copy. Exactly one of each |
| 9 | `metadata.description` referenced inside the JSON-LD (`:47`) | | KEEP | same-source pattern, and it works |
| — | 48 em-dashes across 5 of the 8 hubs | `gp-tax-and-accounts` 14 · `private-practice` 11 · `gp-accountant-services` 8 · `incorporation-and-company-structures` 8 · `gp-practice-management` 7 (`locum-tax`, `medical-expenses`, `nhs-pension-planning` are clean) | RETIRE | §I. These are in hand-written hub prose, so they are fixed by rewriting the sentence, not by substituting a character |

### C.4 Blog components not otherwise covered

| File | Lines | Importers (derived) | Verdict | Why |
|---|---|---|---|---|
| `src/components/blog/ExitIntentModal.tsx` | 186 | **ZERO.** `grep -rn "from .*ExitIntentModal\|import.*ExitIntentModal" src/` → no matches. The only mentions are three code comments (`DeepScrollModal.tsx:9,47`, `SpecialistWidget.tsx:22-25`) that reference a shared `sessionStorage` key, and `PageShell.tsx:26-28` which says it is retired | **RETIRE (delete)** | This is the rollout §4.6.2 case exactly, and it fires the same way it did on construction-cis: a comment in `SpecialistWidget.tsx:25` reads "Do NOT re-edit ExitIntentModal (minimal-intervention rule)", which reads as a protection order but protects dead code. Nothing mounts it. Appendix D.2 also says deleted 2026-07-09, do not port, do not rebuild. **The `ma_assistant_active` sessionStorage key its siblings still write is a harmless no-op and stays** |
| `src/components/blog/InlineMiniLeadForm.tsx` | 25 | `BlogPostRenderer.tsx:13` | **KEEP** | live capture surface (appendix D.2), port as-is, change no threshold |
| `src/components/blog/ReadingProgress.tsx` | 3 | `BlogPostRenderer.tsx:10` | KEEP-PAYLOAD-RESTYLE | a re-export shim to `web-shared/content/ReadingProgress`. Re-point at `design/blog/ReadingProgress` only if the two differ; otherwise leave it alone |
| `src/components/blog/TableOfContents.tsx` | 4 | `BlogPostRenderer.tsx:9` | KEEP-PAYLOAD-RESTYLE | same shim pattern. The sidebar wrapper, not this file, owns the stickiness fix (C.1 item 14) |
| `src/components/blog/BlogListWithSearch.tsx` | 260 | `src/app/blog/page.tsx:79` | ADOPT-STANDARD (keep the file, swap the body) | keep the file as the projection boundary, replace its internals with the kit list. Its pre-hydration branch (`:22-32`) is a deliberate hydration-mismatch guard and the equivalent behaviour must survive the swap |

---

## D. COPY DELIVERABLES

### D.1 Category → CTA copy map (keyed on `slugifyCategory` output; a guard test asserts all 8 keys exist and that the key set equals `getAllCategories().map(c => c.slug)`)

Authored fresh for Medical's own categories (rollout §4.6.8), never copied from Property or Solicitors. Feeds three consumers from one object: the post `#enquiry-form`, `BlogSidebarCta`, and the hub `LeadCTAPanel`.

| Slug | Heading | Body | Button |
|---|---|---|---|
| `gp-accountant-services` | Want a second read on how the practice and your own return fit together? | Practice accounts, the profit allocation and each partner's personal position are one piece of work, not three. We look at them together so the figures agree with each other. | Book a practice review |
| `gp-practice-management` | Not sure the practice figures are telling you the right thing? | Global sum, Carr-Hill, QOF, enhanced services and PCN income all arrive differently and land in different places. We read the practice accounts against the PCSE statements rather than beside them. | Book a practice finance call |
| `gp-tax-and-accounts` | Partnership accounts and your own return, prepared as one job | The superannuation certificate, the profit share, notional rent and the partner return move together, and a partner joining or leaving mid-year moves all of them at once. | Book a GP tax review |
| `nhs-pension-planning` | Want the annual allowance position checked before the charge lands? | The pension input amount grows with pensionable pay whether or not you pay in more. We check the input figure, test the taper, look at carry-forward and only then decide whether Scheme Pays is worth electing. | Book a pension review |
| `locum-tax` | Working as a locum and want the status question settled? | IR35 is decided by the engagement rather than the contract, and the limited company, umbrella or sole trader answer depends on your actual sessions. We model it on your figures and file Forms A and B so the work counts towards pensionable service. | Book a locum tax review |
| `private-practice` | NHS post, private fees and medico-legal work in one tax position | Three income streams, three treatments, and the errors happen where they meet. We look at the split, the expenses that hold up, and whether incorporating the private side is worth what it costs in pension accrual. | Book a private practice call |
| `incorporation-and-company-structures` | Thinking about incorporating the private side? | Incorporation is modelled, not assumed. For a partner with only NHS income it is usually the wrong answer, and the useful version of this conversation starts from your income mix rather than from the idea. | Book an incorporation review |
| `medical-expenses` | Want the expense claim to survive an HMRC look? | Professional subscriptions, indemnity, examination fees, equipment and travel are each treated differently, and doctors' claims are challenged in predictable places. We review what is claimed against what is defensible. | Book an expenses review |

Rules honoured: no fee or comparative fee claim, no turnaround promise, no client count or client-behaviour assertion, no "most doctors qualify" framing, British English, no em-dashes. **Every figure named here must be re-checked against `docs/medical/house_positions.md` with a §-ref before it ships**; I deliberately wrote these to name mechanisms rather than numbers so that no unsourced figure enters through the CTA map.

### D.2 `PromptMarquee` set (10, unattributed self-identification cues, NOT testimonials; even length; FT-plain)

1. NHS Pension: "My pension savings statement arrived, the input amount looks enormous, and I have no idea whether it is right."
2. Taper: "I went over £200,000 last year and nobody has ever explained what the taper actually does to me."
3. Locum status: "I work through an agency and directly for two practices, and I could not tell you which of those is inside IR35."
4. Forms A and B: "I have been locuming for three years and I am not certain any of it has counted towards my pension."
5. Partnership: "A partner left in October and I do not understand how the profit share is supposed to work for that year."
6. PCSE: "The practice statement and our accounts have never quite agreed and we have stopped asking why."
7. Private practice: "The private clinic has grown and everyone keeps telling me to incorporate, but nobody has shown me the numbers."
8. Consultant income: "NHS salary, private patients and expert-witness work, and the tax bill is a surprise every January."
9. Expenses: "I claim my indemnity and my subscriptions and I assume I am missing things, but I do not know what."
10. Accountant fit: "Our accountant is perfectly good and has never once asked me about the NHS Pension."

---

## E. KIT-VS-LOCAL SOURCING (slice 1)

**`Medical/web` imports NOTHING from `packages/web-shared/design/` today** (`grep -rn "web-shared/design" src/ | wc -l` → 0). It imports **146 other `web-shared` references** across `analytics` (33), `lead-nurture` (43), `tools` (26), `console` (19), `lib` (8), `components` (6), `content` (4), `leads` (4), `nurture` (4), `schema` (3), `experiments` (1), so package resolution already works. Medical would be the design kit's third consumer after generalist and solicitors.

**KIT (consume as-is):** `chrome/PageShell` · `chrome/SiteHeader` (with `nav`, `ctaIds`, `wordmarkIcon/Top/Bottom`) · `chrome/SiteFooter` (with `resourcesHref`, `companyItems`, `backdrop`, `consentToggle`) · `chrome/nav` (`buildPrimaryNav`) · `layout-utils` (re-exported through the local file) · `cn` · `globals-standard.css` tokens · `blog/BlogCategoryHub` (pass our `proofPoints`; the default is Property's) · `blog/HubArticleList` · `blog/BlogListWithSearch` (projected items only) · `blog/BlogSidebarCta` · `blog/RelatedArticles` · `blog/TableOfContents` and `blog/ReadingProgress` (already consumed via `web-shared/content/`; re-point only if they differ) · `primitives/page-blocks` (Prose / Eyebrow / InlineLink / CardStack) · `primitives/EyebrowRule` · `primitives/ExampleFigureNote` · `primitives/NoticeCard` · `primitives/NumberedPagination` · `primitives/SlimHero` · `primitives/Breadcrumb` **only if** the local one's JSON-LD is removed in the same commit · `marketing/LeadCTAPanel` · `marketing/StatsCounter` · `marketing/PromptMarquee` · `marketing/CoverageCards` · `marketing/DrawnTickList` (with `tickClassName`) · `marketing/NumberedReasons` · `marketing/WhyUsList` · `marketing/TopicSection` · `marketing/ProcessTimeline` · `marketing/ScrollGlowGroup` · `marketing/WhatToExpectCard` · all four `guards/*.test.ts`.

**Explicitly NOT consumed from the kit, with the reason:**

| Component | Why not |
|---|---|
| `primitives/FaqSection` + `primitives/accordion` | Radix `Accordion type="single" collapsible`, no `forceMount` (`FaqSection.tsx:34-41`), so closed answers are **not server-rendered**. The homepage's 7 `<details>` answers and the blog's 88 `<dl>` answer sets are all in the pre-hydration HTML today. Adopting it strips them. Sanctioned deviation, `DESIGN_DELTA.md` §3 |
| `marketing/ProblemStatement` | T12: hardcodes Property's landlord copy with no copy props. Mirror locally |
| `marketing/ComparisonTable` | T12: forces a "Most recommended" pill. Mirror locally |
| `marketing/StickyCTA` | Medical's local `StickyCTA` is intent-personalised (`useIntent`) and carries its own route exclusions. Keep local, de-duplicate the mount |

**LOCAL build (mirror or write; never edit the kit):** `src/lib/nav.ts` (grouped IA + the 4 calculator categories) · `src/lib/blog-cta.ts` (`CTA_BY_CATEGORY`, 8 keys) · `src/components/layout/MedicalBackdrop.tsx` (net-new; no motif exists) · `src/components/marketing/ProblemStatement.tsx` (T12 mirror) · `src/components/marketing/ComparisonTable.tsx` (T12 mirror) · a local restyled `<details>` FAQ block, shared by the homepage and the blog `<dl>` treatment · `BlogPostRenderer.tsx` rewrite keeping the local `<dl>` · `src/lib/page-summaries.ts` (net-new, one sentence per non-article route, guarded by `guards/first-sentence.test.ts`) · `src/components/ui/layout-utils.ts` becomes a one-line re-export of the kit's.

**LOCAL retire / delete:** `src/components/layout/SiteHeader.tsx` (208) · `src/components/layout/SiteFooter.tsx` (72) · `src/components/layout/PageShell.tsx` (32) · `src/components/blog/ExitIntentModal.tsx` (186, zero importers) · `src/components/brand/BrandWordmarkHomeLink.tsx` (41, both importers deleted) · `src/components/brand/BrandLogoHero.tsx` (26, sole importer is the hero slot it must vacate) · `src/components/medical/TestimonialSlider.tsx` (GATE M9) · `src/config/service-tiers.ts` `siteStats[3]` "1 day" tile (unconditional) and the `serviceTiers` export (GATE M10) · `sectionYLoose` · `btnMailOutline` · the `card-flat` / `card-premium` / `section-label` / `.hero-brand` / `.display-serif` global CSS classes · the Cormorant wiring and all 131 `font-serif` / `display-serif` uses. **`src/components/ui/CTASection.tsx` is out of this slice's scope but is a `layout-utils` consumer; check for live `data-cta` ids on it before any later slice removes it.**

**KEEP untouched:** `LeadForm`, `MiniCapture`, `InlineMiniLeadForm`, `ResourceGate`, `PremiumUpgrade`, `PremiumCalculator`, `BookingPicker`, `DetailsForm`, `SpecialistWidget`, `DeepScrollModal`, `ReturningBar`, `IntentProvider`, `TopicOverrideProvider`, `NextStepOffer` (pending GATE M11), `ConsentToggle`, `ConsentedScripts`, `siteConfig.leadConsentText`, `storagePrefix="ma"`. Port all, add none, change no threshold or cadence.

---

## F. FALSE PREMISES IN THE BRIEF

Six corrections. Everything else in the brief verified true.

1. **"`Medical/web/src/app/page.tsx` (618 lines)" — correct, but "section by section" understates what is there.** The file renders **13 top-level `<section>`s**, of which two (`:274-280` and `:496-506`) are single-element bands and one (`:520-592`) contains the whole closing funnel. Mapping F.2's 15-16 sections onto it is a net **addition** of a stats-counter strip, a problem/marquee pairing, an on-page calculator block and a real hero, not a rearrangement.

2. **"all 8 static category hub routes under `app/blog/`" — the route count is right, but `niche.config.json:127-137` declares NINE categories.** "Consultant Tax" is configured with zero posts and no hub. Any port work that reads `content_strategy.categories` rather than `getAllCategories()` will emit a ninth, empty hub. Key on `getAllCategories()`, and treat the config list as stale metadata to reconcile (§4.6.9), not as the category set.

3. **"`BlogPostRenderer.tsx` 334 lines and siblings" is right, but the brief's implied parallel to the Solicitors run does not hold on the two decisions that matter.** (a) There is **no photo hero** to retire: `post.image` already renders as a bounded in-body `next/image` at `:173-184`. (b) FAQ answers are rendered as **escaped text** (`:265` `{faq.answer}`), not through `dangerouslySetInnerHTML`, so the "raw markup would print" argument for keeping the local `<dl>` does not apply here. The decision to keep the local `<dl>` still stands, on the SSR argument alone.

4. **"`components/blog/*`" as a scope line silently includes `ExitIntentModal.tsx`, and its disposition is not the one its comments suggest.** Deriving command: `grep -rn "from .*ExitIntentModal\|import.*ExitIntentModal" src/` → **zero matches**. It has no importers and no mount. `SpecialistWidget.tsx:25` says "Do NOT re-edit ExitIntentModal (minimal-intervention rule)", which reads as a protection order over live code and is not. This is the §4.6.2 trap firing for a second time on a second site with the same file name; the correct disposition is DELETE.

5. **Owner decision 3 says the footer sister-site block is at "`SiteFooter.tsx:14-34`". The block is `:12-35`** (`{/* Sister Sites */}` at `:12`, the wrapping `<div>` closing at `:35`). The two outbound links are at `:16-24` and `:25-33`. The substance of the decision is unaffected. Also worth recording against the decision: removing it costs **zero internal links**, because both links are external.

6. ~~**Owner decision 4 says "a skippable calculator ResultGate ships (slice 2 owns it)". There is no ResultGate on this site to modify.**~~

   **MANAGER CORRECTION 2026-09-10: this item is itself wrong and is struck.** A result gate
   does exist on Medical. `src/components/tools/premium/ResultGateModal.tsx` is a complete
   working gate with `formId="calc_result_gate"` and a skip path firing `cta_click` with
   `cta_id="result_gate_skip"`; it is mounted at
   `src/components/tools/premium/PremiumCalculator.tsx:676` with its reveal CTA at `:658`.
   It is live in the event data (window 2026-08-23 to 2026-09-10: `see_result` 13,
   `result_gate_skip` 11, a 54% skip rate, the busiest interaction on the site). The gate
   covers the 8 PREMIUM calculators only; the 10 generic ones are ungated. So the port
   EXTENDS an existing surface rather than adding a new one, which is a materially weaker
   appendix-D.2 question than this item implies. The search that produced the wrong answer
   looked for `src/lib/calculators`, a Property path, rather than deriving the component
   from its importers. Slice 2 has the correct account, including the finding that the
   existing gate has no persistence key at all. Original text preserved below, struck, so
   the reasoning error stays visible.

   ~~`ls src/lib/calculators` → no such directory; Medical consumes `@accounting-network/web-shared/tools` (26 imports) and is therefore **ahead of Property on the extraction path** (§4.6.3), so its calculator shape is kept as-is. `src/components/resources/ResourceGate.tsx` exists but is the blog resource gate, a different surface. Slice 2 is adding a capture surface to the calculator fleet, not restyling one, and that is an appendix-D.2 "add none" question the owner decision should be read as having answered. Flagging it so slice 2 does not go looking for a component that is not there.~~

**Also recorded, found while verifying and outside this slice's build scope:** `src/app/nhs-pension/page.tsx:192` hotlinks `images.unsplash.com` as a page background (`next.config.ts:15-16` allows unsplash and pexels as remote hosts). That is the Solicitors hero defect, present on Medical at a different route. Not slice 1, but it belongs in the port ledger.

---

## G. SLICE 1 OWNER GATES

**M1. `StickyCTA` cadence.** It is mounted in `PageShell` (every page) **and again** on the homepage (`page.tsx:224`), so `/` renders two. De-duplicating is a defect fix and needs no permission. What needs the owner's word is the resulting cadence: the kit `PageShell` mounts none and Property mounts it on the homepage only, so keeping Medical's every-page behaviour means deliberately re-mounting it in `layout.tsx` as a sibling of `PageShell`. Owner default = keep every-page. Narrowing it would be a cadence change to a live capture surface.

**M2. `data-cta` placement and goal values.** Ids pass through unrenamed. But the local header emits **no `data-cta-placement` at all** on `nav-book-call` and `mobile-nav-book-call` (`SiteHeader.tsx:104-106,185-187`) and computes `data-cta-goal` from the href, while the kit header writes fixed `placement`/`goal` values. Both feed `vw_cta_performance`. Owner picks: accept the kit's values (cleanest, but splits two live series at the cutover) or pass the existing shape through, which needs props the kit does not have and is therefore a kit change.

**M3. `/embed/*` goes chrome-free.** 10 partner-iframe URLs (one per registry tool, from one file) currently ship the full header and footer inside a partner's page. Owner default = adopt. Consequence: those 10 lose their chrome links; they are `noindex` and analytics already excludes them, so no baseline route is affected. Confirm against `link_baseline.json` once it exists.

**M4. Wordmark mark and motif subject.** The site has no brand icon and no backdrop motif of any kind. The kit header and footer both require a `wordmarkIcon`, and the backdrop needs a subject. One decision covers both. For a navy-and-copper medical brand the honest candidates are a caduceus-free abstraction (a rod, a pulse line, a shield) rather than anything that could read as a clinical or regulatory badge.

**M5. Hero live-pulse badge subject.** The only perpetual animation the standard allows on a page, and it must name a live duty. Candidates to be checked against `docs/medical/house_positions.md`: the NHS Pension annual allowance taper threshold, the January self-assessment deadline for locums, MTD for Income Tax from April 2026.

**M6. Hero secondary destination.** Today it is `/free-practice-health-check`, a live capture surface (`niche.config.json:249-252`). The standard puts `#calculators` there. Moving it is a funnel change, not a restyle. Needs a click-volume read from the funnel-baseline agent before the swap; if the health check carries volume, it stays and `#calculators` goes elsewhere.

**M7. Fourth stats tile.** "1 day / Response time" (`service-tiers.ts:72-77`) is a turnaround promise and is removed unconditionally. What replaces it: an evidenced enquiry count, a fourth derived content count (8 category hubs, 6 medical guides, 88 articles are all derivable), or three tiles. Separately and not a gate: "9+ Specialist guides" is factually wrong and is corrected to a derived count either way.

**M8. Specialist-vs-generalist comparison.** The table at `page.tsx:422-446` has one data column and compares nothing, and its six `detail` strings are unfalsifiable quality claims. Owner picks: author a real "with a generalist accountant" column, or retire the comparison and keep the six rows as a plain capability list with the copy rewritten to describe the work rather than rate it.

**M9. `TestimonialSlider`** (`page.tsx:503`, `src/components/medical/TestimonialSlider.tsx`). Presented under the heading "Four situations medical accountants see repeatedly", which is the `PromptMarquee` shape rather than the testimonial shape. Owner picks: fold the copy into `PromptMarquee` (recommended), or keep it as a static `TestimonialsSection`. Do not keep an auto-rotating carousel. **Check its `prefers-reduced-motion` handling before deciding** — I did not open the file, so this row is a scope note, not a finding.

**M10. `ServiceTiers` on the homepage** (`page.tsx:508-518`). It publishes no fee, so this is not a pricing gate. It is a scope gate: three named tiers with a `featuredBadge="Most popular"` is a client-behaviour claim, and **T13 applies** — removing the prop does not remove the shared component's default badge, so the fix is removal of the section, not of the prop. Owner picks: remove and let the services grid (homepage section 10) carry the scope, or keep the tiers with the badge removed at the component level. Note `service-tiers.ts:30` "Responds within one working day" is a turnaround promise inside the Assisted tier and comes out either way. `ServiceTiers` also renders on `/services`, which is out of this slice.

**M11. `NextStepOffer` on 88 article pages.** `BlogPostRenderer.tsx:288` renders a second closing offer immediately before the enquiry form: two consecutive asks. Owner picks: read the `next_step` series out and kill it, or keep it and move it above the FAQ.

**M12. `/blog` em-dash baseline.** Source has 0; the rendered page will carry every em-dash in 88 inlined post summaries. Before the C.2 payload projection lands, someone decides whether `/blog`'s dash baseline is re-derived from the rendered page (recommended) or the route is exempted from the dash gate for this slice. Left as-is, the gate is meaningless on the slice's highest-value route.

---

## H. EXECUTION ORDER FOR SLICE 1

Smallest surfaces first, retirements last, so the tree stays bisectable at every step.

1. **Tokens and the one-line re-export.** `globals.css` `@theme` primary ramp + radius + button ground tokens; `layout-utils.ts` becomes `export * from "@accounting-network/web-shared/design/layout-utils";`. **55 files change behaviour on this one edit**, so it lands alone, `tsc` clean, tests green, before anything else. The `sectionYLoose` call sites on `page.tsx` must be swapped in the same commit or the build breaks.
2. **`layout.tsx` foundation.** `<noscript>` `data-draw="off"` release block; the `niche.company` read guard in `site.ts`; drop the Cormorant import and `--font-cormorant` / `--font-serif` / `.display-serif`. Do not touch a single `font-serif` call site yet; they degrade to the sans stack and the page still builds.
3. **`src/lib/nav.ts`** + the grouped `navigation[]` in `niche.config.json` + the `nav-active-state` guard test. Server-only, no rendering change until step 4 consumes it.
4. **Chrome swap.** Kit `PageShell` + `SiteHeader` + `SiteFooter` mounted from `layout.tsx` with the nav prop, `ctaIds`, `resourcesHref`, `companyItems`, `backdrop`. `MedicalBackdrop.tsx` built here because the footer needs it. The `/embed/` bypass and the single `StickyCTA` mount land in the same commit. `footer_links` trimmed to the three legal routes.
5. **Blog post renderer.** `BlogPostRenderer.tsx` rewrite: header card, category breadcrumb crumb, skip link, `#enquiry-form` with `id` + `scroll-mt-24` + white card, sidebar wrapper with `BlogSidebarCta`, local `<dl>` restyle, `RelatedArticles`, the `getRelatedPosts` sort fix, the `post.schema` bypass guard. 88 pages from two files.
6. **`src/lib/blog-cta.ts`** + its guard test, then wire it into step 5's three consumers.
7. **`/blog` index.** Container fix, hero, one merged filter band, the client-payload projection, the `#book` panel, `CollectionPage` + `BreadcrumbList`. The projection is the highest-risk edit in the slice; it lands with a rendered-payload measurement before and after.
8. **The 8 category hubs.** Convert to `BlogCategoryHub` data files, slug-keyed filters, `#enquiry-form` panels, other-topics tails, em-dash rewrites. `nhs-pension-planning` (501 lines) goes last of the eight and is read in full first.
9. **Homepage.** All 15 sections, in the F.2 order. Largest single surface, and it depends on steps 1, 4 and 6 being green.
10. **Retirements, last.** Delete `SiteHeader.tsx`, `SiteFooter.tsx`, `PageShell.tsx`, `ExitIntentModal.tsx`, `BrandWordmarkHomeLink.tsx`, `BrandLogoHero.tsx`; strip `card-flat` / `card-premium` / `section-label` / `.hero-brand` from `globals.css`; sweep the remaining `font-serif` / `display-serif` uses by rule with a pattern list, proving zero hits per rule (T6), not by chasing the number 131.

Gates M1 to M12 are answered before step 4 (M1, M2, M3, M4), before step 9 (M5, M6, M7, M8, M9, M10) and before steps 5 and 7 (M11, M12).
