# PORT BLUEPRINT — SLICE 1: CHROME, HOMEPAGE, BLOG SUBSYSTEM

Solicitors (`Solicitors/web`, Accounts for Lawyers, `source_identifier: solicitors`) to the Property standard. Binding spec: `docs/property/DESIGN_SYSTEM.md` §0, §4b, §4c, §7, §7a, §9; `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md` appendices A, B, C, E, F, I; `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Link floors: `docs/solicitors/_port/link_baseline.json` (274 routes, sha `18b4f25f`, captured 2026-09-10T18:57Z). Investigated 2026-09-10 with every source file in scope opened on both sides and the pre-port production server at `http://localhost:3121` curled.

**Standing conversions applied in every row below** (stated once, never repeated):

- **Brand ramp.** Every emerald-`N` in a quoted Property class becomes `primary-N` = the **rose** ramp. `#c41e3a` stays the brand mark colour; `rose-700 #be123c` (6.29:1 on white) is the **button ground**, declared as `--btn-ground` / `--btn-ground-hover` / `--btn-ground-active` in `:root` so the kit `btnPrimary` shifts to the 700 step without a fork (appendix A.5 / L.2). The brand literal measures 5.84:1 and is fine for a mark and for text, not for a fill under white text at the 600 step.
- **Warning ramp.** Any red currently carrying duty / deadline / penalty / breach meaning moves to the non-brand ladder **W1 = amber-700 · orange-700 · fuchsia-700 · violet-700** (5.02 / 5.18 / 6.32 / 7.10 on white). On this site red *is* the brand, so red can no longer signal alarm. Slate stays neutral/does-not-apply.
- **Second typeface dropped.** Cormorant Garamond is retired (`layout.tsx:2,22-26`, `globals.css:65,381`). Plus Jakarta Sans only, already loaded. **194 `font-serif` uses across `Solicitors/web/src` must go**; headings take the A.3 scale with `font-bold` and the base-layer letter-spacing.
- **Radius.** `--radius: 0rem` and `--btn-radius: var(--radius-xl)` get declared; `rounded-xl` renders 4px and is the only card/button radius. The site's current `rounded-full` buttons (`layout-utils.ts:21,25,29`), `rounded-2xl` cards and `rounded-lg` boxes are all A.2 defects.
- **Grounds.** `--background` moves `#f8fafc` → `#ffffff`; sections set `bg-white` / `bg-slate-50` / `bg-slate-900` explicitly and oscillate. The crimson full-bleed band is not a ground vocabulary; navy replaces it everywhere except where a row says otherwise.
- **Containers.** `siteContainerLg` (`max-w-6xl`) is the page measure; `siteContainerXl` is added to `layout-utils.ts` and used by the header bar only. Every `max-w-3xl/4xl/5xl` wrapper round a page body, table, FAQ or list is a §0.1 defect and comes out. `contentNarrow` survives on hero copy and section-head blocks only.
- **Spacing.** `sectionY` becomes `py-12 sm:py-16 lg:py-20`; blog/hub sections `py-16 sm:py-20`. `sectionYLoose` is retired.
- **Instrumentation.** Existing `data-cta` ids are passed through, never renamed (they are live `vw_cta_performance` series and the convention is mixed by history: `header-book-call` / `mobile-menu-book-call` hyphenated, `header_nav_secondary` / `header_mobile_secondary` underscored). `data-cta-placement` and `data-cta-goal` move with every CTA.
- **Copy.** British English (`practicing certificate` → `practising certificate`). No pricing for our services or comparative fee claims. No contingent / no-win-no-fee **offers**; CFA and DBA as **subject matter** stay (house positions §4.A). No turnaround promises. No client-behaviour, client-count or aggregate-performance claims. No "most firms qualify" framing. Every figure re-derivable from `docs/solicitors/house_positions.md` with a §-ref. No em-dashes.

---

## A. SITE CHROME

Nav is **flat today**: 6 items, no `children`, no `groups` (`Solicitors/niche.config.json` `navigation[]` → Services `/services`, Pillar Guides `/solicitor-guides`, Calculators `/calculators`, Health Check `/free-firm-health-check` (`hide_in_packages`), Blog `/blog`, Contact `/contact`). Authoring the grouped IA is port work in this slice (rollout §4.6.10, appendix B). Build it in a new **`src/lib/nav.ts`**, server-only, copying `generalist/web/src/lib/nav.ts` and consuming `packages/web-shared/design/chrome/nav.ts` `buildPrimaryNav(nav, calculatorGroups)`.

**Calculator groups have to be derived, not read.** `src/lib/tools/registry.ts:40` exports only `allTools / genericTools / getGenericTool / toolPath` (`packages/web-shared/tools/registry-helpers.ts:18-32`); there is no `calculatorNavGroups()`. Each config carries a `category` string. The 13 generic tools group into **5 categories**: Practice Finance (5), LLP / Partnership (3), SRA Compliance (3), Income Tax (1), Succession & Sale (1). Group them in `src/lib/nav.ts` in that order, first tool of each category leading.

### A.1 `SiteHeader.tsx` (210 lines, client, `md:` breakpoint band, no dropdowns)

| # | New (standard classes) | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| 1 | Bar `sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm` + inline `paddingTop: max(0px, env(safe-area-inset-top))` | `SiteHeader.tsx:57-62` translucent `bg-[var(--surface)]/90 backdrop-blur-xl` | ADOPT-STANDARD | appendix B exact; a 90% translucent bar over a `#f8fafc` body reads as a seam once the body goes white | none |
| 2 | Inner `siteContainerXl flex min-h-[3.25rem] sm:min-h-16 items-center justify-between gap-3 sm:gap-4 py-3` | `:63-65` `siteContainer` (`max-w-5xl`) + `min-h-14` + `py-2.5` | ADOPT-STANDARD | the header bar is the one `max-w-7xl` surface (A.4); `max-w-5xl` is the legacy container | add `siteContainerXl` to `layout-utils.ts` |
| 3 | Nav list `hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1`; item `px-3 py-2 text-sm font-bold border-b-2 xl:px-4`; active `border-primary-600 text-primary-700`; idle `border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300` | `:68-88` `md:flex`, pill `rounded-full bg-[var(--accent-soft)]`, `font-medium` | ADOPT-STANDARD | **breakpoint band collision**: nav appears at `md:` while the burger hides at `md:`, so 768-1023px carries two navigation systems and, with the CTA at `sm:`, three controls plus the wordmark. Spec puts nav and burger BOTH at `lg:` (the 2026-08-23 incident class, DS §7a) | none |
| 4 | Grouped Calculators dropdown: click-toggled `<button>`, panel `w-[38rem] max-h-[70vh] columns-2 rounded-xl border bg-white p-4 shadow-lg` + "View all calculators" footer link; self-referential first child "All calculators" → `/calculators`; closes on Esc / outside mousedown / route change | no dropdown exists (`:72-87` renders 6 flat links) | ADOPT-STANDARD | 13 tools cannot be a flat nav item and must not be hand-listed; hover-only triggers are unreachable on the tablets that sit at `lg:` | groups from `src/lib/nav.ts`; Services gains `children` (see A.2 row 3, GATE 3) |
| 5 | Primary CTA `${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`, `data-cta="header-book-call"` retained | `:101-110` `sm:inline-flex`, `rounded-full`, outline-not-filled (`border-2 ... bg-white text-[var(--primary)]`), `min-h-11` | ADOPT-STANDARD | `sm:` is the exact incident breakpoint and `BrandWordmarkHomeLink` has no width cap to lift, so nothing truncates when the button arrives; `min-h-11` (44px) is under the 48px primary floor (A.8). Filled primary is the standard; the outline treatment is the pre-redesign recipe | pass `ctaIds={{ primary: "header-book-call", mobilePrimary: "mobile-menu-book-call", secondary: "header_nav_secondary" }}`; label from `getActiveCta(niche).header_primary` |
| 6 | Secondary link at `xl:` only, `data-cta="header_nav_secondary"`; the nav's own Contact item goes `xl:hidden` | `:91-100` `md:inline-flex`, always on from 768px, while `/contact` is ALSO nav item 6 | ADOPT-STANDARD | live duplicate-link defect from `md:` up | none |
| 7 | Burger `h-12 w-12 touch-manipulation rounded-xl border-2 border-slate-200 bg-white lg:hidden` | `:112-121` `rounded-lg`, `border` (1px), `md:hidden` | ADOPT-STANDARD | `md:hidden` is the band collision in row 3; `rounded-lg` and 1px border are the pre-redesign recipe | icon colour → `text-slate-700` |
| 8 | Drawer: root `fixed inset-0 z-50 lg:hidden`; scrim `bg-slate-900/50 backdrop-blur-[2px]`; panel `absolute right-0 top-0 h-[100dvh] w-[min(20rem,92vw)] border-l-4 border-primary-600 bg-white shadow-2xl`; nav children active `border-l-4` + `bg-primary-50 text-primary-900`; groups `ml-4 border-l border-slate-200`, labels `text-[11px] font-bold uppercase tracking-wider text-slate-500`; footer `border-t border-slate-200 p-3` with `${btnPrimary} w-full`, `data-cta="mobile-menu-book-call"` | `:125-207` `md:hidden`, scrim `bg-[var(--primary)]/50` (crimson), panel `border-l` 1px with no brand edge, no groups, footer button `rounded-full` outline | ADOPT-STANDARD | the drawer is the only navigation below `lg:` and must carry the grouped IA and the filled primary; a crimson scrim over a crimson-accented page has no separation | keep the drawer's secondary link, `data-cta="header_mobile_secondary"` |
| 9 | Drawer close `h-11 w-11 rounded-xl border-2` | `:151-158` `h-11 w-11 rounded-lg border` | ADOPT-STANDARD | appendix B exact | none |
| 10 | Active-state: top-level trigger PREFIX match, dropdown/drawer children EXACT match | `:73` and `:164` prefix on both | ADOPT-STANDARD | guarded by `packages/web-shared/design/guards/nav-active-state.test.ts`; prefix on children lights every sibling of a shared stem | wire the guard test into `Solicitors/web` |
| 11 | Nav from `niche.config.json navigation[]` via `getActiveNav(niche)`, Calculators group attached server-side by `buildPrimaryNav()`, passed down as a `nav` prop | `:8,72,163` reads `siteConfig.nav` client-side | ADOPT-STANDARD | the tool registry must never reach a client bundle; the footer derives its columns from the same prop | `src/lib/nav.ts` new |
| — | Mono/uppercase "Menu" eyebrow (`:148-150`) | | RETIRE | retired idiom; the drawer header row is label + close + wordmark | |
| — | Local `SiteHeader.tsx` in full | `src/components/layout/SiteHeader.tsx` | DELETE | replaced by `@accounting-network/web-shared/design/chrome/SiteHeader`, which is fully parameterised (`ctaPrimary`, `ctaSecondary`, `ctaVariant`, `ctaIds`, `wordmarkIcon/Top/Bottom`) | |

**Wiring:** `header-book-call` (`activeCta.header_primary.href`, placement `header`, goal `contact`) · `mobile-menu-book-call` (placement `mobile_menu` — note the kit hardcodes `mobile_menu` at `chrome/SiteHeader.tsx:540` where the local file writes `header_mobile`; see GATE 2) · `header_nav_secondary` (placement `header`, goal `contact`, `xl:` only) · `header_mobile_secondary`. All four carry `data-cta-variant={niche.cta.variant}`.

**JSON-LD:** none (chrome emits none; Organization + WebSite ship from `layout.tsx`).

### A.2 `SiteFooter.tsx` (82 lines, crimson gradient, sister-site block, flat 4-link row)

| # | New | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | `relative overflow-hidden bg-slate-900 text-white` + `backdrop` motif slot; `siteContainerLg relative z-10 py-12 sm:py-16`; `grid gap-10 lg:grid-cols-[1.4fr_3fr] lg:gap-16` | `:10-16,42` inline `linear-gradient(135deg, rgba(196,30,58,.88), rgba(160,24,41,.90))` + `siteContainer` + `min-[480px]:grid-cols-2` | ADOPT-STANDARD | appendix C exact. Owner decision 5. A dark footer is what makes "navy never touches navy" (§9) mean anything, and the arbitrary `min-[480px]` breakpoint is off the stock scale |
| 2 | Left: footer-variant wordmark (primary-400 icon + rule, white text) + `siteConfig.description` in `max-w-md text-sm text-slate-300` | `:43-48` wordmark boxed inside `rounded-lg bg-white px-4 py-2.5` because it cannot read on crimson | ADOPT-STANDARD | the white chip exists only to escape the crimson ground; on navy the lockup renders directly |
| 3 | Right: `<nav aria-label="Footer"> grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4`, columns **derived from the same `nav` prop as the header** via the kit's `buildFooterColumns`: Services = `children` of `/services` (**GATE 3: none exist today**), Resources = `children` of `resourcesHref`, Calculators = first tool of each of the 5 registry categories + "All calculators", Company = `companyItems`. Heading `text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400 mb-4`; links `inline-flex py-0.5 text-sm font-semibold text-slate-300 hover:text-white` in `ul.space-y-2` | `:49-61` flat `siteConfig.footer` (4 items: Locations, Privacy policy, Terms, Cookie policy) right-aligned in one row, no headings | ADOPT-STANDARD | a hand-listed flat row goes stale silently; derivation renders only routes that exist and raises the footer's link contribution on all 274 routes |
| 4 | Legal row `mt-10 pt-6 border-t border-white/10 space-y-4`: `footerLinks` reduced to Privacy policy / Terms / Cookie policy at `text-xs text-slate-400`, `legalDisclosure`, `© {year} {legalName} t/a {tradingName}` + domain, then `ConsentToggle` | `:62-76` | ADOPT-STANDARD + KEEP payload | `siteConfig.company.legalDisclosure` and the ConsentToggle are compliance payload and port verbatim. The cookie policy promises the "Do not track me" control (comment `:70-74`), so it is load-bearing |
| 5 | `resourcesHref="/solicitor-guides"`, `companyItems=[About /about, Contact /contact, Locations /locations, Free firm health check /free-firm-health-check]` | kit defaults `DEFAULT_RESOURCES_HREF = "/landlord-tax"` (`chrome/SiteFooter.tsx:69`) and `DEFAULT_COMPANY_ITEMS` (`:70-75`, includes `/book`) | ADOPT-STANDARD | **CORRECTION to the brief:** the kit footer does NOT need mirroring. `resourcesHref` and `companyItems` are already props (`chrome/SiteFooter.tsx:44-54`), added by the generalist port. Passing them is enough; editing the kit is still forbidden. `/book` exists on this site (`src/app/book/`) but is token-gated post-submit (F.6), so it is not a public footer destination |
| — | Sister-site cross-links to `dentalfinancepartners.co.uk` and `medicalaccounts.co.uk` | `:17-40` | RETIRE | owner decision 5. Two `rel="noopener"` outbound links and an `<h2>` "Our Specialist Accounting Services" that competes with the page's own h2 |
| — | `footer_links` item `{Locations, /locations}` | `Solicitors/niche.config.json` `footer_links[0]` | RETIRE from config | it moves into the derived Company column; leaving it in the legal row renders it twice |
| — | Local `SiteFooter.tsx` in full | `src/components/layout/SiteFooter.tsx` | DELETE | replaced by the kit footer |

**Wiring:** none (footer carries no `data-cta` today and gains none).
**RETIRED:** sister-site block, white wordmark chip, `min-[480px]` breakpoint, crimson gradient, `underline decoration-white/40` link treatment.
**JSON-LD:** none.

### A.3 `PageShell.tsx` (29 lines) + `layout.tsx`

| # | New | Replaces (file:line) | Verdict | Why |
|---|---|---|---|---|
| 1 | Kit `PageShell` with `nav`, `header`, `footer` props | `src/components/layout/PageShell.tsx` (whole file), mounted `layout.tsx:109` | ADOPT-STANDARD → DELETE local | shell ground `bg-[var(--background)]` (`:15`) becomes `bg-white`; skip link `focus:bg-[var(--accent)]` becomes `focus:bg-primary-600` |
| 2 | `/embed/` early return, chrome-free | local shell has no bypass | ADOPT-STANDARD (id = GATE 4) | **Verified live:** `curl localhost:3121/embed/client-account-interest` returns the sticky header (`sticky top-0 z-40`, 1 match) and a `<footer>`. **13 embed URLs** (one per generic tool, from ONE file `src/app/embed/[slug]/page.tsx`) currently ship full site chrome inside partner iframes. `/embed` itself (the public gallery, `src/app/embed/page.tsx`) keeps chrome — the trailing slash in `pathname.startsWith("/embed/")` is load-bearing. **Consequence:** each of the 13 loses ~40 chrome links; none is in `link_baseline.json` (absent by design, noindex, not in the sitemap), so no floor is breached |
| 3 | `<StickyCTA />` **re-mounted deliberately**, site-wide | `PageShell.tsx:26` (inside the local shell) | KEEP (id = GATE 1) | The kit `PageShell` mounts no sticky CTA and Property mounts it on the homepage only. Narrowing it here would be a cadence change to an existing capture surface, which is an owner gate under the playbook §1 hard rule. Owner default = keep every-page. Implementation: `layout.tsx` renders `<PageShell …>{children}</PageShell>` then `<StickyCTA />` as a sibling under the same providers, so it survives the chrome swap. It must NOT render on `/embed/*` — add the same `pathname.startsWith("/embed/")` guard inside `StickyCTA` |
| 4 | A.7 `<noscript>` `data-draw="off"` release block | **absent** (`layout.tsx`, 122 lines, zero `noscript`, zero `data-draw`) | ADOPT-STANDARD | load-bearing for every kit component that draws on IntersectionObserver (EyebrowRule, DrawnTickList, ProcessTimeline, StatsCounter, ScrollGlowGroup). Without it, no-JS lands on "undrawn", i.e. empty |
| 5 | `@theme` block gains the full `--color-primary-50..950` rose ramp; `:root` gains `--radius: 0rem`, `--btn-radius: var(--radius-xl)`, `--btn-ground/-hover/-active` at rose-700/800/900, `--hero-cream` | `globals.css:61-66` (`@theme inline` maps 4 tokens only; no Tailwind primary ramp, no radius token, buttons hardcode `border-radius: 9999px` at `:137,:164,:186,:209`) | ADOPT-STANDARD | the kit's `primary-*` utilities do not resolve without the ramp; `--btn-radius` is what makes web-shared's pill default render as the 4px house radius |
| 6 | `@source "../../../../packages/web-shared"` in `globals.css` | verify present | ADOPT-STANDARD | deleting or omitting it strips every kit component's classes from the Tailwind v4 build |
| 7 | Cormorant Garamond import + `--font-cormorant` + `--font-serif` | `layout.tsx:2,22-26,82`; `globals.css:65,381` | RETIRE | owner decision 2. 194 `font-serif` uses go with it |
| 8 | `src/config/site.ts:8` `const office = niche.company.registered_office;` | | KEEP-PAYLOAD-RESTYLE (defect fix) | **Live defect.** Property guards the identical read at `Property/web/src/config/site.ts:20-25` after **7 production `client_error` rows** showed `niche.company` undefined under a partial chunk load. Port the guard verbatim: `const company = (niche?.company ?? {}) as Partial<typeof niche.company>; const office = (company.registered_office ?? {}) as Partial<…>;`. This is a defect, not a preference (playbook §1), so no gate |
| 9 | Every other `layout.tsx` provider and interruptive mount (`IntentProvider`, `SpecialistWidget`, `DeepScrollModal`, `ReturningBar`, `GoogleAnalytics`) | `layout.tsx:11,114` | KEEP | port all, add none (appendix D.2). Do not change any threshold or cadence |
| — | `src/components/blog/ExitIntentModal.tsx` | | DELETE | appendix D.2 says deleted 2026-07-09 on 162 shows / 0 leads, do not port, do not rebuild. It is unmounted already (`PageShell.tsx:5-6` comment) and only the file remains |
| — | `src/components/ui/layout-utils.ts` | 29 lines, partial copy of the kit's | RETIRE → re-export | replace the file body with `export * from "@accounting-network/web-shared/design/layout-utils";`. That single edit moves `btnPrimary/btnSecondary/btnOnDark/focusRing/siteContainer*/contentNarrow/sectionY` to the standard for **every call site at once** and adds the missing `siteContainerXl`, `btnOnCream`, `heroCreamSurface`. It is the smallest edit point in the whole slice: 39 local components import from it |

**JSON-LD (site-wide, `layout.tsx`):** Organization + WebSite. KEEP as-is.

### A.4 Wordmark

`src/components/brand/BrandWordmarkHomeLink.tsx` (41 lines) renders **text only**, two spans, no raster and no icon.

- The kit header and footer render the lockup themselves from `wordmarkIcon` / `wordmarkTop` / `wordmarkBottom` props. Pass `wordmarkTop="Accounts for"`, `wordmarkBottom="Lawyers"` — or the current two lines if they differ; read them from the file and keep them, do not invent a descriptor.
- **`wordmarkIcon` has no candidate on this site.** There is no brand SVG component anywhere in `Solicitors/web/src` (grep for `Backdrop|Brick|Motif` returns zero). GATE 5 covers the mark and the motif together.
- Regardless of the gate: the kit builds `aria-label` from the visible strings (WCAG 2.5.3) and applies `max-w-[13rem] sm:max-w-none` + `min-w-0`. Both land automatically.
- `src/components/brand/BrandLogoHero.tsx` (26 lines) is used by the homepage hero (`page.tsx:163`) in place of an `<h1>`. See B.3 — it does not survive.

### A.5 Backdrop motif

**Does not exist.** Build one local component, `src/components/layout/LegalBrickBackdrop.tsx`, mirroring `Property/web`'s `HeroBrickBackdrop`: `aria-hidden` inline SVG, `absolute inset-y-0 right-0 w-[55%] hidden sm:block`, navy tone `stroke-opacity .18` with mask `to left, black 35% → transparent 92%`; cream tone `.1` / 45% / 97%. Host must be `relative overflow-hidden` with content at `relative z-10`. Consumed by: the kit footer's `backdrop` prop, the homepage navy hero, the homepage `#book` band, the blog `#enquiry-form` band, the hub heroes. **GATE 5** sets the motif subject.

---

## B. HOMEPAGE — `src/app/page.tsx` (605 lines)

**Link floor `/` = 15** (baseline). Live render measures 19 unique internal `href="/…"`; 4 `data-cta` attributes; **0 em-dashes**. Emit **15 or more**; the calculator bridge, the insights rows and the derived footer columns take it well past that on their own.

Final rendered order, 15 sections (F.2):

1. **`<StickyCTA />` is NOT mounted here.** It ships site-wide from `layout.tsx` (A.3 row 3, GATE 1). This is the one deliberate divergence from F.2 in this section list.

2. **JSON-LD set.** Today the homepage emits **none** (`page.tsx:152` is a comment saying Organization + WebSite moved to the root layout, and nothing replaced them). Add, in one `<script>`: `WebPage`, `AccountingService`, `Service`, `BreadcrumbList`, and `FAQPage` built by `buildFaqPage(HOME_FAQS)` from `src/lib/schema/faq-page.ts` on the **same array** the FAQ section renders. Note the existing `<details>` at `:585-599` carries a real Q and A with **no FAQPage schema at all**.

3. **NAVY MOTIF HERO** — `relative flex items-center overflow-hidden bg-slate-900 py-10 sm:py-12 lg:py-14 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]` + `<LegalBrickBackdrop />`, content `relative z-10`, copy block `max-w-3xl`. `<Eyebrow onDark>` + live-pulse badge (GATE 6) → **`<h1>`** `text-3xl leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.1] lg:text-7xl` → standfirst `mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/90` → CTA row `flex flex-col sm:flex-row gap-3 sm:gap-4` → 5 trust badges.
   Replaces `:154-193`: a `sectionYLoose` band whose ground is `linear-gradient(135deg, rgba(196,30,58,.75), rgba(160,24,41,.80)), url('https://images.unsplash.com/photo-1505664194779-…')`. **Three defects in one:** (a) a **third-party hotlink to images.unsplash.com** as the ground of the site's highest-authority page, uncached, unoptimised and outside our control; (b) the whole hero is `mx-auto max-w-4xl text-center` — centred hero copy is not the standard and `max-w-4xl` is not an allowed measure; (c) **there is no `<h1>` element** — `BrandLogoHero` (`:163`) occupies the h1 slot and `siteConfig.tagline` (`:164-166`) is a `<p>`. Confirm against the rendered DOM before writing; if `BrandLogoHero` does emit an `h1`, it emits the brand name rather than the page's subject, which is the same defect by a different route.
   Trust badges (all re-derivable, no promise, no count): "SRA Accounts Rules 2019, rule 8.3 five-weekly reconciliation" · "Partnership, LLP and salaried-member (FA 2014) tax" · "VAT on legal services and disbursements" · "Practice sale, goodwill and BADR timing" · "UK-wide, remote-first".

4. **Hero primary CTA** → `href="#book"`, `data-cta="hero_primary"`, `${btnPrimary} text-base sm:text-lg px-6 py-3 sm:px-10 sm:py-4`. Currently `activeCta.hero_primary.href` = `/contact` (`:171-179`) with an inline `style={{ background:"white", color:"var(--primary)" }}` override that defeats `btnPrimary` entirely. Requires `niche.config.json` `cta.variants.leadgen.hero_primary.href` → `#book` (DS §7: the hero primary comes from the config, and only the header CTA and StickyCTA leave for `/contact`).

5. **Hero secondary** → `href="#calculators"`, `${btnOnDark}`, `data-cta="hero_secondary"`. Currently `/services` via a bespoke `btnMailOutline` constant (`page.tsx:18-19`, `:180-189`) that duplicates `btnOnDark` at 1px border and `rounded-full`. RETIRE the constant.

6. **STATS STRIP** `border-b border-slate-200 bg-white py-5 sm:py-7` + kit `StatsCounter` (`grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4`). Replaces `<StatsBar stats={siteStats} />` at `:195-199`.
   **Copy fix, mandatory.** `src/config/service-tiers.ts:15` ships `{ value: "Same-day", label: "Response on regulatory questions" }`. That is a **turnaround promise** and comes out. `:12` "13 Free calculators" and `:13` "10 Pillar guides" are re-derivable and stay (13 = `registry.ts` config count; 10 = `content/solicitor-guides/*.md`). `:14` "6 Service specialisms" stays. Fourth tile replacement: GATE 7. **T15 applies** — `StatsCounter` counts from 60% of target, so the true value must be in the pre-hydration HTML.

7. **PROBLEM STATEMENT + PROMPT MARQUEE** on `bg-slate-50`. `ProblemStatement` argument left, `PromptMarquee` right. **T12: the kit `marketing/ProblemStatement.tsx` hardcodes Property's landlord copy with no copy props.** Mirror it locally as `src/components/marketing/ProblemStatement.tsx`, structure copied, copy ours; do not edit the kit. Same for `marketing/ComparisonTable.tsx` (forces a "Most recommended" pill).
   Replaces the four `realityPoints` cards at `:34-51` + `:318-341` ("What generalist accountants miss"). Prompt set in §D.2.

8. **WHO WE ARE** on white — Eyebrow + h2 + `Prose` + `DrawnTickList` (`tickClassName="text-primary-600"`, A.8, the default 400-step tick measures ~1.9:1 on white). Re-sets `whySpecialistItems` (`:122-135`, rendered `:432-452`). Currently three prose cards in a `max-w-5xl` clamp with no visual.
   **Copy fix:** `:125` "Every accountant on our team specializes in…" is a team-composition claim and a US spelling; `:106-108` `trustItems[0]` "100% legal sector focus. Every accountant on our team works exclusively with solicitors" is the same claim with a fabricated statistic attached.

9. **WHY CHOOSE US** on `bg-slate-50` — re-sets `:104-120` `trustItems` and `:392-430` "Specialist vs generalist accountants". The `specialistRows` table (`:137-144`, rendered `:406-428`) becomes the section's figure via the **locally mirrored `ComparisonTable`**: stacked below `md:`, `<table min-w-[36rem]>` inside `overflow-x-auto` above, our column primary-edged, neutral minus for the other side, plus `ExampleFigureNote`. The current table has **one data column** and therefore compares nothing; it needs a real "with a generalist accountant" column or it is not a comparison. GATE 8.
   **Copy fix:** `:116-118` "Transparent pricing / Fixed fees / Clear, agreed fees with no hidden charges" is a fee claim; `:139` "Completed accurately every 5 weeks" is a turnaround promise dressed as a rule (the rule is SRA Accounts Rules 2019 r.8.3, house positions §5, and should be stated as the rule).

10. **SERVICES GRID** on `bg-primary-50/60`, 6 glow cards `rounded-xl border border-primary-100 bg-white p-6` + icon badges, on `ScrollGlowGroup`. Re-sets `howWeWorkItems` (`:71-102`, rendered `:366-390`). Each card links to its `/services` child so the Services footer column (A.2 row 3) has children to derive from — this section and GATE 3 are the same decision.
    The numeral chips (`:383` `text-3xl font-bold`) become `NumberedReasons` if the six are a sequence, or plain cards if they are six equivalent things. They are equivalent things: drop the numerals.

11. **WHO WE WORK WITH** on white — `CoverageCards` (3 col, icon badge, tone opposing the section ground), re-setting `whoWeWorkWith` (`:53-69`, rendered `:343-364`). **Ground collision fixed:** `:318` and `:343` are consecutive sections that BOTH set `background: var(--surface-elevated)`, so there is no boundary between them at all today (§0.1, §9).

12. **`#calculators` white + `CalculatorTabs`** with an explicit `tabs` list (max 5, the fleet's heads: `law-firm-valuation`, `fa-2014-salaried-member`, `partnership-vs-llp-take-home`, `sra-client-account-reserve`, `partner-tax-reserve`) + a **literal** `<a href="/calculators/law-firm-valuation">` and "See all 13 calculators" `data-cta="home_calculators_all"`.
    Net-new: the homepage has no on-page tool today. The literal href is not optional — `packages/web-shared/design/guards/calculator-tabs-crawl-path.ts` is a source scan and cannot see through a constant (§0.4).
    **Live defect retired here:** `:488` renders "6 calculators" against a registry of **13** generic tools, and `:495` renders "6 pillar guides" against **10** markdown files. The page contradicts its own stats strip (`service-tiers.ts:12-13`) two screens above. Derive both counts from `allTools()` and `getAllGuides()`; never type a count.

13. **LATEST INSIGHTS** on `bg-slate-50`, `divide-y` row list, 3 posts + "View all articles". Re-sets `:243-316`. Current cards are `card-flat` inside `max-w-5xl` with `font-serif` titles and a hand-rolled chevron SVG on both the title link and a duplicate "Read article" link — two links per card to the same URL, which adds zero unique links and doubles the row. One link per row.

14. **`#book` NAVY CLOSING** — `<div id="book" className="scroll-mt-24">` wrapping `LeadCTAPanel` (kit): `relative overflow-hidden bg-slate-900` + motif, `grid gap-8 sm:gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16`, `<Eyebrow onDark>` + h2 + 3 proof rows with `h-12 w-12 rounded-xl` check badges left, white `rounded-xl p-6 sm:p-8 lg:p-10` card holding `<LeadForm />` right.
    Replaces `:557-579` (the live `leadgen` branch): a bare `<LeadForm />` inside `mx-auto max-w-3xl` on `var(--surface-elevated)`, with no `id`, no `scroll-mt-24` and therefore **no anchor for any on-page CTA to scroll to**. This is the single largest structural fix on the page and it is what makes item 4 possible.
    **D.1 invariant, re-verify rendered:** `LeadForm` labels are `slate-900`; it renders on the WHITE card, never on the navy. The navy-ground variant shipped invisible labels at 1.00:1 on Property and generalist. Curl the rendered form and assert the label colour class.
    Proof rows (no promise, no count): "SRA Accounts Rules and the client account, read as a system" · "Partnership, LLP and salaried-member position modelled on your own figures" · "One named accountant, not a team inbox".
    `consent_text` is a **carve-out**: `src/config/site.ts:19` `leadConsentText` is byte-pinned by `lead-payload.test.ts` and by the 2026-08-24 conversion incident. Do not touch it, in any direction, for any reason.

15. **FAQ white, last** — kit `FaqSection` + `buildFaqPage(HOME_FAQS)` on the same array. Replaces the single hand-rolled `<details>` at `:582-601`.
    **The homepage MAY adopt kit `FaqSection`** and should. This is the opposite of the blog decision in C.1, and the reason is specific: the homepage FAQ is **one hand-written item**, its answers are plain strings, and it currently emits **no FAQPage schema at all**, so nothing is being stripped from a crawler that has it today. Adding `buildFaqPage` is a net gain. Author 6 to 8 items.
    Keeping FAQ last also keeps the navy `#book` band off the navy footer (§9, canonical tail = panel, FAQ, footer).

**Wiring:** `hero_primary` (`#book`, placement `hero`, goal `form`) · `hero_secondary` (`#calculators`, placement `hero`) · `home_calculators_all` (`/calculators`, placement `home_calculators`) · `home_cta_primary` / `home_cta_secondary` retained **only** inside the `packagesMode` branch (`:512-556`), which is live analytics history and must not be deleted with the branch. All carry `data-cta-variant`.

**RETIRED:** Unsplash hotlink hero ground (`:157`) · `BrandLogoHero` in the h1 slot (`:163`) · `btnMailOutline` (`:18-19`) · `TestimonialSlider` section (`:227-241`) — see GATE 9 · `ServiceTiers` + `featuredBadge="Most chosen"` (`:454-466`) — see GATE 10 · the crimson full-bleed "Free resources" band (`:468-510`, folds into items 10 and 12) · every `font-serif` heading (11 on this file) · every `mx-auto max-w-3xl/4xl/5xl` body clamp · `card-premium` / `card-flat` global CSS classes · `sectionYLoose`.

**JSON-LD:** `WebPage` + `AccountingService` + `Service` + `BreadcrumbList` + `FAQPage` (same array as item 15). None exist today.

**Pricing (owner decision 3, homepage instance recorded).** The homepage **does** publish our own fees. `page.tsx:464` renders `<ServiceTiers tiers={serviceTiers} featuredBadge="Most chosen" />`, and `src/config/service-tiers.ts:47` carries `"Fixed monthly fee from £180/mo"`. Curl-verified on the live pre-port build: `£180` and `/mo` both render on `/` under the **active `leadgen`** variant. `service-tiers.ts:64` "Bespoke pricing based on firm size and complexity" is the same class. This is the homepage instance to hand to the pricing slice; **T13 applies** — dropping the `featuredBadge` prop does not remove the shared component's default badge, so the section is removed, not de-propped. (The `£49/mo` strings in `Solicitors/niche.config.json` sit under the **inactive** `variants.packages` block and do not render; note that the pound sign is stored **literally** in that file, not as `£`, so a plain grep does find it here. Do not carry the generalist assumption across.)

---

## C. BLOG SUBSYSTEM

### C.0 The smallest edit points

| Surface | Routes | Files to touch |
|---|---|---|
| Blog posts | **196** | **2**: `src/app/blog/[category]/[slug]/page.tsx` (76 lines, data only) and `src/components/blog/BlogPostRenderer.tsx` (332 lines, all markup). Do not open a single `.md`. |
| Derived category hubs | **10** | **1**: `src/app/blog/[category]/page.tsx` |
| Hand-built category hubs | **7** | **7** page files, each ~190 lines, converging on one kit call |
| Blog index | 1 | `src/app/blog/page.tsx` + `src/components/blog/BlogListWithSearch.tsx` |
| Pillar guides | 10 + index | `src/app/solicitor-guides/[slug]/page.tsx`, `src/app/solicitor-guides/page.tsx` |

**Category ground truth (verified, 196 posts, 17 categories, sums to 196):**

| Category (frontmatter) | Posts | `slugifyCategory` output | Hub |
|---|---|---|---|
| Practice Finance & Cash Flow | 26 | `practice-finance-cash-flow` | hand-built |
| VAT & Compliance | 22 | `vat-compliance` | hand-built |
| SRA Compliance & Trust Accounting | 17 | `sra-compliance-trust-accounting` | hand-built |
| Partnership & LLP Structure | 17 | `partnership-llp-structure` | derived |
| Practice Succession & Sale | 15 | `practice-succession-sale` | hand-built |
| Partnership & LLP Accounting | 14 | `partnership-llp-accounting` | hand-built |
| SRA Accounts Rules | 13 | `sra-accounts-rules` | derived |
| Conveyancing Compliance | 11 | `conveyancing-compliance` | derived |
| Compliance & Risk (COLP / COFA) | 11 | `compliance-risk-colp-cofa` | derived |
| Practice Accounting | 10 | `practice-accounting` | derived |
| Structure & Incorporation | 9 | `structure-incorporation` | hand-built |
| Fee-Earner Tax & Compensation | 8 | `fee-earner-tax-compensation` | derived |
| Professional Indemnity | 6 | `professional-indemnity` | derived |
| Firm Acquisition & Merger | 6 | `firm-acquisition-merger` | derived |
| Locum Solicitor Tax | 5 | `locum-solicitor-tax` | derived |
| Sole Practitioner Tax | 4 | `sole-practitioner-tax` | hand-built |
| Trainee & Paralegal Tax | 2 | `trainee-paralegal-tax` | derived |

`slugifyCategory` (`src/lib/blog.ts:106-114`) lowercases, **deletes** `&` (leaving a double space that collapses to one hyphen), spaces to hyphens, strips everything outside `[a-z0-9-]`, collapses runs, trims. So `Compliance & Risk (COLP / COFA)` → `compliance-risk-colp-cofa`, matching the baseline route exactly. Every CTA map, filter and guard in this slice keys on **this output**, never on the raw label.

**Link floors in this family:** `/blog` = **40** · 196 post routes, min **16** (`/blog/trainee-paralegal-tax/how-much-do-trainee-solicitors-earn-uk-2025-26`), median 20, max 27 · hubs: `practice-finance-cash-flow` 37 · `sra-accounts-rules` 33 · `partnership-llp-structure` 33 · `vat-compliance` 33 · `compliance-risk-colp-cofa` 32 · `conveyancing-compliance` 32 · `practice-accounting` 31 · `fee-earner-tax-compensation` 29 · `sra-compliance-trust-accounting` 28 · `firm-acquisition-merger` 27 · `professional-indemnity` 27 · `locum-solicitor-tax` 26 · `practice-succession-sale` 26 · `partnership-llp-accounting` 25 · `trainee-paralegal-tax` 23 · `structure-incorporation` 20 · `sole-practitioner-tax` 15 · `/solicitor-guides` = **21**, its 10 children 14 to 20.

### C.1 `BlogPostRenderer.tsx` (332 lines → renders 196 pages)

**THE FAQ DECISION, and it is the opposite of the generalist port.** `:254-268` renders FAQs as a plain `<dl>`, and `:263` pushes each answer through `dangerouslySetInnerHTML`. Answers are therefore **in the pre-hydration HTML today** on 196 pages — curl-verified: a sampled post returns its answer text twice, once in the FAQPage JSON-LD and once in the rendered body. The kit's `primitives/FaqSection.tsx` is a Radix `Accordion type="single" collapsible` whose closed content is **not** server-rendered, and it renders the answer as `<p>{faq.answer}</p>`, i.e. **as escaped text**. Adopting it would (a) strip answer text from 196 pages and (b) print raw HTML tags on the 7 posts whose answers contain markup. **DECISION: mirror the `<dl>` locally, restyled; do NOT consume kit `FaqSection` in the blog.** Record it in `DESIGN_DELTA.md` §3 as a sanctioned deviation. The homepage still adopts the kit component (B.15) for the reason given there.

New reading order (F.3):

1. `<ReadingProgress />` — already the kit component (`:13`). KEEP, no change.
2. `<article className="bg-white py-12 sm:py-16">` → `siteContainerLg` → `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12`. Already conforming (`:155-157`). KEEP. Remove the redundant inner `max-w-4xl` at `:158`, which double-clamps the main column inside the grid track.
3. `<Breadcrumb>` on white, category href keyed on `categorySlug`. Already correct (`:97-105`). **Do NOT swap in the kit `Breadcrumb`** without removing the page-level BreadcrumbList: the local one (`src/components/ui/Breadcrumb.tsx`, 77 lines) emits **no** JSON-LD, so the trail comes from `buildBlogPostingJsonLd`; the kit one emits its own and would double it (T17 class).
4. **HEADER CARD** `rounded-xl bg-slate-50 p-8 mt-6`: `<Eyebrow>` = `post.category`, `<h1>` `text-3xl sm:text-4xl md:text-5xl`, meta pills (`inline-flex min-h-7 rounded-full bg-white px-3 py-1 text-xs font-semibold ring-1 ring-slate-200`; the Updated pill in primary tint), summary `mt-5 text-base leading-7 text-slate-600`.
   **REPLACES the 420/480/520px photo hero at `:81-153`** — a full `next/image` `fill` with `scale-110 blur-sm` under a `bg-slate-900/70` scrim, `priority`, `sizes="100vw"`. It costs the LCP and half the first viewport on 196 pages and carries no information. `post.image` becomes an in-body `rounded-xl` figure. The photo-credit block (`:129-152`) retires with the hero, and with it two `rel="noopener nofollow"` outbound links per post — **link-floor safe** (`nofollow` externals are not internal links and the floor counts `href="/…"` only), but state the delta.
   The rose-200 eyebrow at `:106` and the `text-slate-300` meta at `:112` only exist because the ground is a dark photo; on the slate-50 card they become slate-500/600 (`slate-400` never, A.8).
5. **Skip link** `data-cta="blog_skip_to_form"` → `#enquiry-form`, inside the header card. Net-new. The nearest thing today is `:168` "book a call" which **leaves the page for `/contact`**.
6. Mobile TOC (`:203-205`). KEEP, kit component already.
7. **Key takeaways / TL;DR box KEPT VERBATIM** (`:175-201`) — it is the `#answer-box` GEO surface. Restyle only: `rounded-lg border-l-4 border-[var(--primary)]` → the standard card (`rounded-xl bg-slate-50 ring-1 ring-slate-200/70`) + `EyebrowRule`. Add `id="answer-box"`.
8. **AuthorByline demoted.** `:159-173` is a top-of-article block with a rule under it, sitting above the answer. It becomes a meta pill in the header card plus the end aside. E-E-A-T is preserved twice and the answer takes the top position.
9. **Body** `.article-body.prose-blog mt-10` (17px / 1.75 / 65ch; h2 28px with a 4px primary left border; h3 22px). The tiered injection logic at `:207-252` is **ahead of Property** (3-moment split, premium island, ResourceGate, InlineMiniLeadForm fallback) — port the logic **unchanged**, restyle only. Add aside-CTA rewriting: every `<aside>` in the body gains `<a class="aside-cta" href="#enquiry-form">`.
10. **`#enquiry-form`** `<section id="enquiry-form" className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24" aria-labelledby="enquiry-form-heading">` + motif, white card `mt-8 rounded-xl bg-white p-6 sm:p-8` holding `<LeadForm redirectOnSuccess={false} />`.
    Replaces `:288-298`: a `rounded-2xl` gradient card (`from-[var(--primary)]/5 to-[var(--accent)]/5`, `border-2`) with **no `id`, no `scroll-mt-24`, no `aria-labelledby`**, and one generic CTA (`activeCta.blog.cta_heading/body/button`) shared by all **17** categories. Nothing on the page can link to it; nothing can scroll to it.
11. **Per-category CTA map** `CTA_BY_CATEGORY` in a new `src/lib/blog-cta.ts`, keyed on `slugifyCategory` output, with fallback to `getActiveCta(niche).blog.*` and the `packagesMode` bypass preserved. A guard test asserts every one of the 17 slugs has a key and that the key set equals `getAllCategories().map(c => c.slug)`. Copy map in §D.1.
12. **FAQ `<dl>`, mirrored locally, restyled.** Card `rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70` (was `border-l-4 border-[var(--primary)]`, `:261`); `<dt>` `text-base sm:text-lg font-bold text-slate-900`; `<dd>` `mt-3 text-base leading-relaxed text-slate-700`, keeping `dangerouslySetInnerHTML`. Heading `text-2xl font-bold text-slate-900 sm:text-4xl` (was `text-3xl`, `:256`).
    **Same-array rule.** `post.faqs` already feeds both the `<dl>` and the `FAQPage` block inside `buildBlogPostingJsonLd` (`src/lib/schema.ts:68-72`), so the binding is structurally correct. **But `:50-52` bypasses it**: `post.schema?.trim() || buildBlogPostingJsonLd(...)`. Any post shipping its own `schema` frontmatter renders the `<dl>` while emitting whatever that string says. Add a guard test that no post has both a non-empty `schema` and a non-empty `faqs`, or make the builder always append `buildFaqPage(post.faqs)` alongside the custom schema. This is T17 in its live form.
13. **Author aside** `rounded-xl ring-1 ring-slate-200/70` with a reviewer branch (Reviewed by / credentials / Last reviewed, rendered only when both fields are present). Replaces `:270-284`. **Fix the broken class stack at `:271`**: `hidden sm:block … flex items-center justify-center` sets `display:block` then `display:flex` on the same element, so the icon is not centred at any width.
14. **Kit `RelatedArticles`** replacing the bespoke `border-l-4` row list at `:300-319`. Pills derive from the href so they cannot disagree with the destination.
15. **SIDEBAR:** one `sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto` wrapper holding **`BlogSidebarCta`** (net-new, kit, navy `rounded-xl bg-slate-900 p-6`, anchors `#enquiry-form`, headings as `<p>` so they stay out of the TOC) then `TableOfContents`. Today the sidebar is TOC-only and its `sticky top-24` has no height clamp (`:322-326`), so a long TOC scrolls off the bottom of the viewport with no way back.
    Feed `BlogSidebarCta` from the **same `CTA_BY_CATEGORY` entry** as the `#enquiry-form` heading, so the two cannot drift.

**Wiring:** `blog_skip_to_form` (net-new, `#enquiry-form`, placement `blog_header`) · `blog_sidebar_book` (net-new, `#enquiry-form`, placement `blog_sidebar`) · existing `next_step` (`src/components/intent/NextStepOffer.tsx:41`) retained or retired per GATE 12. Note: **no `data-cta` exists anywhere in the blog subsystem today** — the whole corpus of 196 pages contributes zero rows to `vw_cta_performance`.
**RETIRED:** photo hero + scrim + credit block (`:81-153`) · top-of-article byline block (`:159-173`) · gradient CTA card (`:288-298`) · bespoke related list (`:300-319`) · redundant inner `max-w-4xl` (`:158`).
**JSON-LD:** `BlogPosting` (+ nested `FAQPage`) from `buildBlogPostingJsonLd`, unchanged, plus the `post.schema` bypass guard above. **Do not add a second BreadcrumbList.**

### C.2 `/blog` index — `src/app/blog/page.tsx` (83 lines). Floor **40**.

This is the site's highest-floor route in the slice and its worst-built page.

1. **The entire page body is `contentNarrow`** (`:33`, `max-w-3xl`). A `max-w-3xl` wrapper round a whole page body is the §0.1 headline defect and it is applied to the route with 40 internal links. Move to `siteContainerLg`; `contentNarrow` survives on the hero copy block only.
2. **Navy motif index hero** `min-h-[300px] sm:min-h-[350px]` + breadcrumb + Eyebrow + h1 + standfirst + CTA row (`#book` / `#articles`). Replaces the bare `<h1 className="font-serif …">` at `:40-49` sitting directly on the page ground with no hero at all.
3. **ONE merged filter band** — the 17 category chips at the 48px `rounded-xl border-2` recipe. Today there are **two** competing lists: a `min-h-[120px]` card grid of all 17 categories at `:52-74` ("Comprehensive Guides by Topic") **and** whatever `BlogListWithSearch` renders from the same `categories` array at `:79`. Seventeen 120px cards is far too heavy a treatment for a filter.
4. **Library** — kit `BlogListWithSearch` + `HubArticleList` (12 visible, the rest carried with the `hidden` attribute, never `slice()`) + `NumberedPagination`.
   **PAYLOAD DEFECT, load-bearing.** `:25-28` spreads `{...p, categorySlug}` into the props of a `"use client"` component (`src/components/blog/BlogListWithSearch.tsx:1`), so **the full `contentHtml` of all 196 posts is serialised into the RSC flight payload**. Measured: `/blog` returns **4.5 MB of HTML**. Project the item type to `{ slug, title, summary, category, categorySlug, date, readTime }` before it crosses the boundary.
5. **Net-new `#book` `LeadCTAPanel`.** The highest-traffic non-home page in the slice has **zero capture** today.
6. Slate-50 category tail last (navy never touches navy, §9) + a literal calculator bridge link.
7. **JSON-LD:** add `CollectionPage` + `BreadcrumbList`. The page emits **none** today (the local `Breadcrumb` does not emit).

**Em-dash gate, read this before you trust the baseline.** `link_baseline.json` records `dashes["/blog"] = 0`. The live pre-port server returns **149** em-dash characters on `/blog` (`curl … | grep -o '—' | wc -l`), and `/about` returns 2 against a recorded 1. The recorded figures are wrong for this route, almost certainly because the sweeper did not see the client payload where the 196 post summaries are inlined. **Re-derive `/blog`'s dash count against the current build before treating it as a regression gate**, or the projection in item 4 will read as a 149-dash improvement and any real regression will be invisible underneath it. Site total recorded: **330 across 43 of 274 routes** (source tree carries 362 across 72 files).

### C.3 `/blog/[category]` — `src/app/blog/[category]/page.tsx` (174 lines → 10 pages)

Page becomes data-only; markup moves to kit `BlogCategoryHub` (props: `categoryName`, `categorySlug`, `collectionName`, `description`, `intro`, `sections`, `cta`, `posts`, `categories`, `siteUrl`, `form`, `heroBackdrop`, `ctaBackdrop`, `proofPoints`, `libraryNote`).

1. **Cream motif hero** (`heroCreamSurface`, `min-h-[360px] sm:min-h-[420px] lg:min-h-[440px]`) + breadcrumb + CTA row `#enquiry-form` / `#articles`. Replaces `:111-133`, which prints the category name **three times in a row** as eyebrow (`:121-123`), h1 (`:124-126`) and again inside the standfirst (`:127-130`), the standfirst itself being an auto-generated "N articles on x" sentence.
2. **ESSENTIALS BRIEFING**, net-new, white — the largest content deliverable in the slice: **10 hubs × 3 to 4 ruled sections**. Per hub: the duty, when it bites, what firms get wrong, what we would look at. FT-plain, second person, figures only where re-derivable from `house_positions.md` with a §-ref.
3. **Library** `#articles scroll-mt-24` on slate-50, `HubArticleList`. Filtering is already correct (`:72` filters on `slugifyCategory(p.category) === category`, not raw-label equality). KEEP that. Same projection fix as C.2 — `:73` spreads `{...p}` into the client component.
4. **`#enquiry-form` `LeadCTAPanel`** using the **same `CTA_BY_CATEGORY` entry** as the posts in that category, so hub and post always agree. Today these 10 hubs have **no capture surface of any kind**.
5. **Other-topics tail LAST**, 48px chips.
6. **CRAWL-PATH DEFECT, fix it.** `:82` `const siblings = categories.filter(c => !STATIC_HUB_SLUGS.has(c.slug))` and that array is passed to both the chip nav (`:144-157`) and `BlogListWithSearch` (`:166`). So on all 10 derived hubs, **7 of the 17 categories are unreachable** — including the three largest (`practice-finance-cash-flow` 26 posts, `vat-compliance` 22, `sra-compliance-trust-accounting` 17). The chips must list all 17 minus self. This is a §0.6 breach and it raises every derived hub's link count, so it also cushions the floors above.
7. **JSON-LD:** `BreadcrumbList` + `CollectionPage` already emitted at `:84-102`. KEEP. Do not let `BlogCategoryHub` emit a second `CollectionPage` — check the component's own schema output and pass through, or drop the page-level copy. Exactly one of each.

### C.4 The 7 hand-built landings — `src/app/blog/<slug>/page.tsx` (~190 lines each)

All seven share one shape (verified on `sra-compliance-trust-accounting/page.tsx`, 190 lines; the other six differ only in copy):

| # | New | Replaces (file:line, SRA hub as the exemplar) | Verdict | Why |
|---|---|---|---|---|
| 1 | Converge all seven on kit `BlogCategoryHub`, passing the existing hand-written prose as `sections: HubSection[]` | `:54-189` in each of 7 files | ADOPT-STANDARD | seven ~190-line hand-rolled layouts collapse to seven data files. The prose is the asset and it is kept verbatim; only the layout goes |
| 2 | Cream motif hero, breadcrumb, Eyebrow, h1, standfirst, CTA row | `:60-76` `contentNarrow` page wrapper + a `border-l-4` header block | ADOPT-STANDARD | `contentNarrow` clamps the whole page body (§0.1); there is no hero and no CTA above the fold |
| 3 | Each `HubSection` gets a figure or a card set; none ships as prose alone | `:79-134` five prose-only `<section>`s of h2 + `<p>` + `<ul class="list-disc">` | ADOPT-STANDARD | §0.2. A wall of paragraphs is the pre-redesign template |
| 4 | Filter on `slugifyCategory(p.category) === "<slug>"` | `:32` `allPosts.filter(p => p.category === "SRA Compliance & Trust Accounting")` | ADOPT-STANDARD | **raw-label keying**, the exact pattern that produced Property's 57-posts-wrong-CTA and 228-pages-wrong-related bugs. One spelling variant in one frontmatter block silently empties a hub. Key on the slug in all 7 |
| 5 | `#enquiry-form` `LeadCTAPanel` with the category's `CTA_BY_CATEGORY` entry | `:175-185` bare `<LeadForm>` in a `rounded-2xl` gradient card, no `id`, no `scroll-mt-24` | ADOPT-STANDARD | §0.5: no bare LeadForm in a coloured card, and nothing can anchor to it |
| 6 | Other-topics chip tail, all 17 minus self | absent in all 7 | ADOPT-STANDARD | the hand-built hubs have **no** sibling navigation at all, the mirror image of the C.3 defect. Adding it is what lifts `sole-practitioner-tax` (floor 15, 4 posts) clear of its floor |
| 7 | Kit `HubArticleList` | `:139-171` bespoke `rounded-2xl` `font-serif` card list | ADOPT-STANDARD | one article-card component estate-wide (§0.6) |
| — | Page-level `BreadcrumbList` + `CollectionPage` (`:34-52`) | | KEEP | already correct; make sure the kit hub does not emit a duplicate |
| — | `metadata.title` / `metadata.description` referenced inside the JSON-LD (`:47-48`) | | KEEP | it is the same-source pattern and it works |

Per-hub floors to clear: `practice-finance-cash-flow` 37, `vat-compliance` 33, `sra-compliance-trust-accounting` 28, `practice-succession-sale` 26, `partnership-llp-accounting` 25, `structure-incorporation` 20, `sole-practitioner-tax` 15.

### C.5 `/solicitor-guides` (107 lines) and `/solicitor-guides/[slug]` (187 lines → 10 pages)

Closest surface on the site to the standard already, and one of only two places where `buildFaqPage` is correctly paired with a rendered FAQ on the same array.

**Index (floor 21):**
1. Navy motif hero replacing the flat `bg-[var(--primary)]` crimson band at `:48-64`; `sectionYLoose` → `py-12 sm:py-16 lg:py-20`.
2. Kit `RelatedArticles` grid replacing the bespoke `rounded-2xl` `font-serif` cards at `:74-100`; `h2` → `h3` inside cards; drop the no-op `mx-auto max-w-5xl` clamp at `:68`.
3. Net-new closing `LeadCTAPanel` — the index has **no ask** today.
4. **JSON-LD:** `CollectionPage` + `BreadcrumbList` at `:35-46`. KEEP.

**Guide page (floors 14 to 20):**
1. Navy motif hero replacing the crimson band at `:67-93`. The eyebrow at `:71` is `text-[var(--accent)]` = slate-blue `#475569` **on the crimson ground**: measure it, it will not clear 4.5:1, and on navy it must become `primary-400` or white.
2. Body `:95-101` — remove the `mx-auto max-w-3xl` (`:97`); `siteContainerLg` is the measure and `.prose-blog` already carries the 65ch. It is double-clamped today.
3. **FAQ `<dl>` KEPT and restyled**, same decision and the same reason as C.1: `guide.faqs` feeds `buildFaqPage` at `:56` and the `<dl>` at `:110-124` from one array, and the answers are in the HTML today. Restyle `rounded-2xl border-l-4` → `rounded-xl bg-slate-50 ring-1 ring-slate-200/70`, drop `font-serif` at `:116`, drop the `max-w-3xl` at `:106`.
4. Kit `RelatedArticles` for "More pillar guides" (`:130-159`).
5. Closing panel `:161-184` is **already the LeadCTAPanel shape** (two-column, statement left, white card with `LeadForm redirectOnSuccess={false}` right). Convert the ground crimson → navy, `rounded-2xl` → `rounded-xl`, add `id="book" scroll-mt-24`, and add a hero primary CTA pointing at it (there is none).
   **Copy fix, mandatory:** `:177` "We will be in touch within 24 hours." is a **turnaround promise** and comes out. Replace with "Tell us where the firm is and we will come back to you." `:166` "Free scoping call" stays.
6. **JSON-LD:** `BreadcrumbList` + `FAQPage` at `:55-57`. KEEP. Add `Article` for the guide body, which is missing.

---

## D. COPY DELIVERABLES

### D.1 Category → CTA copy map (keyed on `slugifyCategory` output; a guard test asserts all 17 keys exist)

Feeds three consumers from one object: the post `#enquiry-form`, `BlogSidebarCta`, and the hub `LeadCTAPanel`.

| Slug | Heading | Body | Button |
|---|---|---|---|
| `practice-finance-cash-flow` | Want a second look at lock-up and drawings? | Work in progress, debtor days and partner drawings move together, and looking at any one of them alone tends to cost money elsewhere. We read them as one position. | Book a practice finance review |
| `vat-compliance` | Not certain your disbursement treatment holds up? | The eight-condition test, Brabners, counsel's fees and the tax point on legal fees. We check the treatment before HMRC does. | Book a VAT review |
| `sra-compliance-trust-accounting` | Client account and the accountant's report, off your desk | Five-weekly reconciliations, residual balances and the annual report, run on a monthly rhythm so year end is a check on work already done. | Book a client account review |
| `partnership-llp-structure` | Is the current structure still the right one? | General partnership, LLP or a corporate member. The answer depends on your partner mix and the salaried-member position, not on a general rule. | Book a structure review |
| `practice-succession-sale` | Selling or retiring in the next two years? | Goodwill, work in progress on sale, BADR timing and the lifetime limit. The saving is made 12 to 24 months out, not at completion. | Book a succession call |
| `partnership-llp-accounting` | Partnership accounts and member allocations, handled together | The SA800, each member's own return and the reserve behind the tax bill, prepared as one piece of work rather than three. | Book a partnership accounts call |
| `sra-accounts-rules` | Want the Accounts Rules position checked before the report? | Rule 8.3 reconciliation, mixed receipts, residual balances and the report exemption. We look at the system, not just the file. | Book an Accounts Rules review |
| `conveyancing-compliance` | Search fees, disbursements and the property side | Post-Brabners treatment of search fees, SDLT, LBTT and LTT, and where the conveyancing ledger meets the client account. | Book a conveyancing review |
| `compliance-risk-colp-cofa` | Carrying the COFA role and want a second pair of eyes? | The COFA holds personal responsibility for the firm's Accounts Rules position. We look at the controls, the records and the breach register with you. | Book a COFA support call |
| `practice-accounting` | Behind on the practice accounts, or dreading year end? | We take the records as they are, get them straight, and keep the statutory deadlines off your calendar. | Book a practice accounting call |
| `structure-incorporation` | Thinking about converting or incorporating? | Incorporation is one of the more consequential decisions a firm makes. We model the tax, the SRA steps and the client account transfer in the order they have to happen. | Book an incorporation review |
| `fee-earner-tax-compensation` | Fee-share, bonus or equity, and the tax that follows | How a fee-share arrangement, a bonus and an equity share are each taxed, and what the salaried-member conditions mean for the person taking one. | Book a compensation review |
| `professional-indemnity` | Premium, run-off and the tax treatment | Minimum terms cover, the six-year run-off obligation and how the premium is treated for tax. We look at all three together. | Book a PII review |
| `firm-acquisition-merger` | Buying, merging or being bought? | Due diligence on the client account, work in progress and the goodwill position, plus what the combined firm's tax and SRA position looks like on day one. | Book an acquisition call |
| `locum-solicitor-tax` | Working as a locum or consultant solicitor? | Employment status, IR35 where a firm engages you through an intermediary, and the expenses that actually stand up. | Book a locum tax review |
| `sole-practitioner-tax` | Practice and personal tax, read as one position | Drawings, payments on account, pension contributions and the client account all move together for a sole practitioner. We look at the whole picture. | Book a sole practitioner review |
| `trainee-paralegal-tax` | Starting out and want the tax side straight? | Where your pay sits against the thresholds, what a training contract or paralegal role means for your return, and what you can actually claim. | Book a call |

Rules honoured: no fee or comparative fee claim, no turnaround, no client count, no "most firms qualify", no CFA/DBA **offer** (CFA/DBA remain available as subject matter per house positions §4.A), British English, no em-dashes. Every figure named is re-derivable: SRA Accounts Rules 2019 r.8.3 and the r.12.2 exemption (§5), the eight disbursement conditions and Brabners (§6, §6.A, §6.B, §6.D), salaried-member ss.863A-863D Conditions A and C (§2.A), BADR £1m lifetime limit and standard CGT 18%/24% (§9), WIP on sale ITTOIA 2005 ss.182-185 (§4, §9), PII minimum terms and 6-year run-off (§10), SDLT/LBTT/LTT (§7).

### D.2 `PromptMarquee` set (10, unattributed self-identification cues, NOT testimonials; even length; FT-plain)

1. Client account: "The five-weekly reconciliation gets done, but I could not tell you today whether there is a residual balance sitting on a closed matter."
2. Salaried members: "We have fixed-share members and nobody has checked the salaried-member conditions since the day we set it up."
3. VAT: "I still cannot give a straight answer on which of our search fees are disbursements and which are not."
4. Lock-up: "Billing is fine. Getting paid is fine. The gap between the two is what keeps me awake."
5. Structure: "We have been a general partnership for eleven years and I do not know whether an LLP would actually change anything."
6. COFA: "I am the COFA and I am not entirely sure what I would be personally on the hook for if something went wrong."
7. Succession: "Two of the four of us want out in three years and we have never had the firm valued."
8. Drawings: "Partners draw monthly, the tax bill lands in January, and every year it is a scramble."
9. Accountant fit: "Our accountant does the accounts and has never once asked me about the client account."
10. Locum work: "I do consultancy work for two firms and I have no idea whether either of those arrangements is inside IR35."

---

## E. WHERE THE BRIEF IS WRONG

Six corrections. Everything else in the brief verified true.

1. **"13 embed routes"** is right as a route count but there is **one file**, `src/app/embed/[slug]/page.tsx`, with `dynamicParams = false` and `generateStaticParams` over the 13 generic tools. Do not go looking for 13 files. `/embed` (the gallery, a separate file) is a 14th URL and **keeps** its chrome.
2. **"The kit `SiteFooter` hardcodes Property's copy so it must be mirrored locally or passed explicit props."** The second half is right and the first half is out of date: `resourcesHref` and `companyItems` are already props with Property defaults (`packages/web-shared/design/chrome/SiteFooter.tsx:44-54,69-75`). Passing them is sufficient; no local mirror. The kit components that genuinely still hardcode reference-site copy and DO need local mirrors are `marketing/ProblemStatement.tsx` and `marketing/ComparisonTable.tsx`. `blog/BlogCategoryHub.tsx` sits between the two: its `proofPoints` default is Property's (`:20-24`) but it is a prop, so pass ours.
3. **"`BlogPostRenderer.tsx` around :254-265."** The `<dl>` block is `:254-268`. The premise itself is **true and the decision stands** — answers are in the pre-hydration HTML today, curl-verified on a live post. There is a **second, independent** reason the brief did not give: the kit `FaqSection` renders `<p>{faq.answer}</p>` as escaped text, while `BlogPostRenderer.tsx:263` pushes answers through `dangerouslySetInnerHTML`, and 7 of the 1,245 FAQ answers in `content/blog/` contain HTML tags. Adopting the kit component would print raw markup on those 7 pages.
4. **"The 26.2% statistic appears on 4 pages."** Four **occurrences**, three **routes**: `src/app/page.tsx:211`, `src/app/page.tsx:595`, `src/app/about/page.tsx:50`, `src/app/sra-compliance/page.tsx:117`. Absent from `house_positions.md` (grep exit 1), so the brief's substantive point holds: it is unsourced and must not be republished. The homepage carries a **second** unsourced figure the brief did not name: `page.tsx:45` "average lock-up of 128-139 days", also absent from house positions.
5. **"Our own published pricing is removed (later slice, but note any homepage instance)."** There **is** a homepage instance and it is easy to miss because it does not appear in `page.tsx`: `page.tsx:464` renders `<ServiceTiers>` and the fee lives in `src/config/service-tiers.ts:47` (`"Fixed monthly fee from £180/mo"`) plus `:64` ("Bespoke pricing based on firm size and complexity"). Curl-verified rendering on `/` under the active `leadgen` variant. Related sub-correction: **the pound sign is stored literally in `Solicitors/niche.config.json`, not as `£`.** The generalist trap (T6) does not transfer to this site; a plain grep works here.
6. **"83 US spellings exist across 26 files."** Not reproducible. A rule-based sweep of `src/` + `content/` for the `-ize`/`-yze` family returns **42 hits in 15 files** once the 19 `"@type": "Organization"` schema strings are excluded (74 in 28 files if you count them, which you should not — they are a schema.org type name). A wider `-or`/`-er`/`-se` pattern returns 736 hits in 127 files but is dominated by `color:` and `center` inside CSS and Tailwind classes. **Sweep by rule with a pattern list and prove zero hits per rule (T6); do not chase the number 83.** One genuine domain breach the count would have missed either way: `practicing certificate` at `page.tsx:37` and `page.tsx:595` (5 occurrences site-wide against 189 correct `practising`).

Also worth recording, found while verifying and outside this slice's build scope: `link_baseline.json`'s own note flags `/resources` as a **live 404** linked from 8 resource pages with no route and no sitemap entry.

---

## F. KIT-VS-LOCAL SOURCING (slice 1)

`Solicitors/web` imports **nothing** from `packages/web-shared/design/` today (grep: 0 hits for `web-shared/design`). It imports 82 files' worth of other `web-shared` subtrees (`console/`, `lib/`, `content/`, `tools/`, `components/`, `lead-nurture/`), so the package resolution already works. This port is the design kit's **second** consumer after generalist.

**KIT (consume as-is):** `chrome/PageShell` · `chrome/SiteHeader` (with `ctaIds`) · `chrome/SiteFooter` (with `resourcesHref`, `companyItems`, `backdrop`, `consentToggle`) · `chrome/nav` (`buildPrimaryNav`) · `layout-utils` (re-exported through the local file) · `cn` · `globals-standard.css` tokens · `blog/BlogCategoryHub` (pass `proofPoints`) · `blog/HubArticleList` · `blog/BlogListWithSearch` (projected items only) · `blog/BlogSidebarCta` · `blog/RelatedArticles` · `blog/TableOfContents` and `blog/ReadingProgress` (already consumed from `web-shared/content/`, repoint) · `primitives/page-blocks` (Prose / Eyebrow / InlineLink / CardStack) · `primitives/EyebrowRule` · `primitives/ExampleFigureNote` · `primitives/NoticeCard` · `primitives/NumberedPagination` · `primitives/SlimHero` · `marketing/LeadCTAPanel` · `marketing/StatsCounter` · `marketing/PromptMarquee` · `marketing/CoverageCards` · `marketing/DrawnTickList` (with `tickClassName`) · `marketing/NumberedReasons` · `marketing/WhyUsList` · `marketing/TopicSection` · `marketing/ProcessTimeline` · `marketing/ScrollGlowGroup` · `marketing/WhatToExpectCard` · `primitives/FaqSection` + `primitives/accordion` (**homepage only**) · all four `guards/*.test.ts`.

**LOCAL build (mirror or write; never edit the kit):** `src/lib/nav.ts` (grouped IA + calculator groups derived from the 5 tool categories) · `src/lib/blog-cta.ts` (`CTA_BY_CATEGORY`, 17 keys) · `src/components/layout/LegalBrickBackdrop.tsx` (net-new; no motif exists) · `src/components/marketing/ProblemStatement.tsx` (T12 mirror) · `src/components/marketing/ComparisonTable.tsx` (T12 mirror) · `BlogPostRenderer.tsx` rewrite, **keeping the local `<dl>` FAQ** (C.1) · `src/lib/page-summaries.ts` (net-new, one sentence per non-article route, guarded by a first-sentence test) · `StickyCTA` stays local (intent-personalised, and it is the mount in GATE 1) · `src/components/ui/layout-utils.ts` becomes a one-line re-export of the kit's.

**LOCAL retire / delete:** `src/components/layout/SiteHeader.tsx` (210) · `src/components/layout/SiteFooter.tsx` (82) · `src/components/layout/PageShell.tsx` (29) · `src/components/blog/ExitIntentModal.tsx` (appendix D.2 says never rebuild) · `src/components/ui/CTASection.tsx` (superseded by `LeadCTAPanel`; **carries live `cta-section-primary` / `cta-section-secondary` ids**, so pair any removal with a deploy-watch baseline restatement) · `src/components/blog/AuthorByline.tsx` (absorbed into the header card and the end aside) · `src/components/solicitors/TestimonialSlider.tsx` (GATE 9) · the local `BlogListWithSearch` internals (keep the file, project the props, swap the body for the kit list) · `src/config/service-tiers.ts` `serviceTiers` export (GATE 10) and its `siteStats[3]` "Same-day" tile (unconditional) · `sectionYLoose` · `btnMailOutline` · the `card-premium` / `card-flat` global CSS classes · the Cormorant font wiring and all 194 `font-serif` uses.
**KEEP untouched:** `LeadForm`, `MiniCapture`, `InlineMiniLeadForm`, `ResourceGate`, `PremiumUpgrade`, `ResultGateModal`, `BookingPicker`, `DetailsForm`, `SpecialistWidget`, `DeepScrollModal`, `ReturningBar`, `IntentProvider`, `ConsentToggle`, `siteConfig.leadConsentText`. Port all, add none, change no threshold or cadence.

---

## G. SLICE 1 OWNER GATES

1. **StickyCTA cadence.** It is mounted in the local `PageShell` today, so it appears on every page; the kit `PageShell` mounts none and Property mounts it on the homepage only. Owner default = **keep every-page**, which means deliberately re-mounting it in `layout.tsx` as a sibling of `PageShell`. Confirm, because narrowing it would be a cadence change to a live capture surface.
2. **`data-cta` placement values.** Ids are passed through unrenamed, as instructed. But the kit header writes `data-cta-placement="mobile_menu"` where the local header writes `header_mobile`, and the kit writes `data-cta-goal="form"` where the local writes `contact`. Both feed `vw_cta_performance`. Owner picks: accept the kit's placement/goal values (cleanest, but splits two live series at the cutover) or pass the existing ones through as well, which needs two more props on the kit header and is therefore a kit change.
3. **Services column children.** The footer's Services column derives from `children` of the `/services` nav item, and there are none. Either author the `/services` sub-IA in `niche.config.json` (which also feeds the header dropdown and homepage section 10) or the Services column does not render.
4. **`/embed/*` goes chrome-free.** 13 partner-iframe URLs currently ship the full header and footer. Owner default = adopt. Consequence: those 13 lose their chrome links; none is in the link baseline (noindex, not in the sitemap) so no floor is breached, and partners get a widget that sits natively in their page.
5. **Wordmark mark and motif subject.** The site has no brand icon and no backdrop motif of any kind. The kit header and footer both require a `wordmarkIcon`, and the backdrop needs a subject. Scales, column, ledger rule, brick? One decision covers both.
6. **Hero live-pulse badge subject.** It is the only perpetual animation the standard allows on a page and it must name a live duty. Candidates from house positions: MTD for Income Tax from April 2026 (§10), the five-weekly reconciliation (§5), basis-period transition profits running to 2027/28 (§4).
7. **Fourth stats tile.** "Same-day response on regulatory questions" (`service-tiers.ts:15`) is a turnaround promise and is removed unconditionally. What replaces it: an evidenced enquiry count, a fourth derived content count, or three tiles.
8. **Specialist-vs-generalist comparison.** The table at `page.tsx:406-428` has one data column and compares nothing. Owner picks: author a real "with a generalist accountant" column, or retire the comparison and keep the six rows as a plain capability list.
9. **`TestimonialSlider`.** Four anonymised situation summaries (`TestimonialSlider.tsx:9-35`), correctly written and compliant, presented in an auto-rotating 8-second carousel that is not behind `prefers-reduced-motion` and hides three quarters of its own content. Owner picks: fold the copy into `PromptMarquee` (recommended, it is what these are), or keep it as a static `TestimonialsSection`. Do not keep the carousel.
10. **`ServiceTiers` on the homepage.** `page.tsx:454-466` publishes our own fees under the live `leadgen` variant (`£180/mo`, "Bespoke pricing"). Owner decision 3 removes pricing in a later slice; this section is the homepage instance. Owner picks: remove the section now and replace it with the services grid (section 10), or hold it and accept that the homepage publishes a fee until the pricing slice lands. **T13:** removing the `featuredBadge` prop does not remove the shared default badge, so the fix is removal of the section, not of the prop.
11. **`NextStepOffer` on 196 article pages.** `BlogPostRenderer.tsx:286` renders a second closing offer immediately before the enquiry form, with a live `next_step` id. Two consecutive asks. Owner picks: read the series out and kill it, or keep it and move it above the FAQ.
12. **`/blog` em-dash baseline.** The recorded floor says 0 and the live page returns 149. Before the projection fix in C.2, someone has to decide whether the baseline is re-derived (recommended) or the route is exempted from the dash gate for this slice. Left as-is, the gate is meaningless on the slice's highest-value route.
