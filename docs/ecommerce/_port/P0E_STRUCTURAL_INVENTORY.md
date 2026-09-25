# P0E - Ecommerce port, structural live-defect and disposition inventory

**CHROME EXISTS. This is a restyle, not net-new construction:** `src/components/ui/SiteNav.tsx` renders a real `<header>` and `<nav aria-label="Primary">`, `src/components/ui/SiteFooter.tsx` renders a real `<footer>`, mounted at `src/app/layout.tsx:108` and `:110` exactly as the brief states, and both are present in the rendered DOM on every 200 route measured.

Instrument: `next start` on http://localhost:3191, asserted as this working tree -
`curl -s http://localhost:3191/ | grep -o '<title>[^<]*</title>'` -> `<title>Ecommerce and marketplace seller accountants UK</title>`.
Read-only throughout. No build, no git write, no site file edited.

---

## 0. FALSE PREMISES IN THIS BRIEF

1. **There is no `src/middleware.ts` and no redirect map.** `find . -name 'middleware.*' -not -path './node_modules/*' -not -path './.next/*'` -> empty. The only redirect on the site is the apex->www 308 in `next.config.ts` `redirects()`. **Check 9's "redirected slug that still has a file on disk" defect class cannot exist here.** Do not commission a redirect-map audit.
2. **`/embed` is a 404, not a route.** `curl -o /dev/null -w '%{http_code}' http://localhost:3191/embed` -> `404`. Only `src/app/embed/[slug]/page.tsx` exists; there is no embed gallery page. The brief's probe loop reported `header=1 main=0` for `/embed` - that was the **404 page**, which carries site chrome. Property has an `/embed` gallery; this site does not.
3. **"0 `<main>` on `/embed/*` is correct BY DESIGN" is true but incomplete, and it hides the real defect.** `/embed/vat-threshold-tracker` renders `main=0` **and `header=1 footer=1`**. The entire site chrome ships inside the partner's iframe. Property's `PageShell` explicitly strips it (`if (pathname?.startsWith("/embed/")) return <>{children}</>`). Live defect, not by design.
4. **`Property/web` is NOT on the kit chrome, so the six props have no Property precedent to inherit.** `Property/web/src/components/layout/SiteHeader.tsx` and `SiteFooter.tsx` are local components; nothing under `Property/web/src` imports `design/chrome`. The real prop precedents are `charities/web/src/components/layout/PageShell.tsx`, `crypto/web/src/components/ui/PageShell.tsx`, `generalist/web/src/components/layout/PageShell.tsx`. Property remains the correct *visual* reference, and its `PageShell` the correct *structural* reference (skip link, `<main id="main">`, embed bypass) - it is just not the kit-prop reference.
5. **The `btnPrimary` / `hidden` estate defect is ALREADY FIXED in the kit. Do not re-fix it.** `packages/web-shared/design/layout-utils.ts:36` - `btnPrimaryBase` no longer opens with `inline-flex`; the token was hoisted to `btnPrimary` on line 39. `SiteHeader.tsx:473` composes `${btnPrimaryBase} hidden ... lg:inline-flex`, so no bare `inline-flex` remains to beat `hidden`. (This site's CSS order would in fact lose - see check 3 - which is exactly why the source fix is load-bearing.)
6. **`NumberedReasons` does not animate off keyframe classes.** `grep -o 'animate-[a-z-]*' marketing/NumberedReasons.tsx` -> empty. It keys off `.story-numeral` / `.story-numeral-rule` plus an inline `transitionDelay`. The dependency is real, but it is a **per-site `globals.css` block**, not a keyframe utility. Correct form carried into check 5.
7. **The `sr-only`-on-a-`<table>` carve-out does not apply on the research pages.** Both render plain visible tables (`<table class="w-full text-sm border-collapse">`); zero `sr-only` and zero `aria-hidden` on any table or ancestor. A different, real a11y defect is present instead - check 7.

The brief's `layout.tsx:108` / `:110` mounting claim, its `SiteNav.tsx:5` `ponytail:` comment claim, and all six of its kit carve-outs other than the two above **verified true as written**.

---

## 1. CHROME EXISTENCE

```
for p in / /blog /contact /services /calculators; do
  echo "$p: header=$(curl -s http://localhost:3191$p | grep -o '<header' | wc -l)"; done
```
`header=1` on every route. `<nav aria-label="Primary">` on all. `<footer>` on all, including every dynamic route probed.

Disposition: the port replaces two local components. It does not build chrome.

---

## 2. LANDMARKS

`for p in <route>; do curl -s -o /tmp/pg -w '%{http_code}' http://localhost:3191$p; grep -o '<main' /tmp/pg | wc -l; done`

| Route | HTTP | `<main>` | correct? |
|---|---|---|---|
| `/` | 200 | **0** | NO |
| `/about` | 200 | **0** | NO |
| `/blog` | 200 | 1 | yes |
| `/blog/[category]` (`/blog/business-structure-and-tax`) | 200 | 1 | yes |
| `/blog/[category]/[slug]` (`.../online-seller-formation-trends`) | 200 | 1 | yes |
| `/book` | 200 | **0** | NO |
| `/calculators` | 200 | 1 | yes |
| `/calculators/[slug]` (`/calculators/vat-threshold-tracker`) | 200 | 1 | yes |
| `/complete` | 200 | **0** | NO |
| `/contact` | 200 | 1 | yes |
| `/cookie-policy` | 200 | **0** | NO |
| `/embed/[slug]` | 200 | 0, **header 1, footer 1** | main 0 correct; **chrome present = defect** |
| `/for` | 200 | **0** | NO |
| `/for/[slug]` (`/for/amazon-sellers`) | 200 | **0** | NO |
| `/privacy-policy` | 200 | **0** | NO |
| `/research` | 200 | 1 | yes |
| `/research/online-seller-index` | 200 | 1 | yes |
| `/research/online-seller-survival-index` | 200 | 1 | yes |
| `/services` | 200 | **0** | NO |
| `/services/[slug]` (`/services/ecommerce-vat-compliance`) | 200 | **0** | NO |
| `/terms` | 200 | **0** | NO |
| `/thank-you` | 200 | **0** | NO |
| `/vat` | 200 | **0** | NO |
| `/vat/[slug]` (`/vat/135-import-rule`) | 200 | **0** | NO |

**14 of the 23 non-embed route shapes have no `<main>` at all. No route has more than one.** This confirms the brief: `<main>` is authored per page, not in the layout.

**Skip link: ZERO.** `grep -o 'Skip to'` -> 0 on every route; `grep -rn 'sr-only.*focus' src/` -> no match. There is also no `id="main"` anywhere in the rendered DOM.

Disposition: the kit `PageShell` (Property's pattern) supplies the single `<main id="main">`, the skip link, and the `/embed/*` chrome bypass in one place - all three missing here. Adopting it **requires deleting the per-page `<main>` on the 9 routes that have one**, or they nest.

---

## 3. THE RESPONSIVE NAV

**Confirmed: no mobile drawer, no burger.** `src/components/ui/SiteNav.tsx:5` carries the `ponytail:` comment verbatim: `// ponytail: static links, no client state. Add mobile hamburger when analytics show mobile nav use matters.`

Rendered DOM of `/`:
- `<ul class="hidden md:flex ...">` holding the six nav links (Services, VAT Hub, Calculators, Blog, About, Contact).
- `<a class="md:hidden text-sm font-semibold ..." href="/contact">Contact</a>`.
- **Zero `<button>` in the header. Zero `role="dialog"`. Zero `aria-expanded`.**

**What a visitor on a phone (<768px) can reach from the header today: the wordmark (`/`) and `/contact`. Nothing else.** No Services, no VAT hub, no Calculators, no Blog, no About. The footer's five `footer_links` are the only other site-wide navigation below 768px.

### Breakpoint diff, as a single check (kit `chrome/SiteHeader.tsx`)

| element | line | hide/show token |
|---|---|---|
| desktop nav | 414 | `hidden ... lg:flex` |
| primary CTA | 473 | `hidden ... lg:inline-flex` |
| burger button | 480 | `lg:hidden` |
| drawer overlay | 493 | `lg:hidden` |
| secondary CTA | 445 | `hidden ... xl:inline-flex` |

**Nav, CTA, burger and drawer are all on `lg:`. No drift, no dead band.** The secondary CTA's `xl:` is a documented owner decision (comment at `:453-465`, owner 2026-08-23), not drift.

This site's pre-port nav is on `md:`; the port moves it to `lg:`. Because this site has no burger at all, the `md:`/`lg:` difference cannot produce a dead band today - it only can if someone ports the nav and not the burger.

### Built-CSS order (the check source review cannot do)

```
grep -boF '.hidden{'      .next/static/css/93927b945ac87065.css   -> 16070
grep -boF '.inline-flex{' .next/static/css/93927b945ac87065.css   -> 16149
```
**`.hidden` is emitted 79 bytes BEFORE `.inline-flex`.** Equal specificity, so a bare `inline-flex` on the same element wins and `hidden` never takes effect. The estate defect's mechanism is live in this bundle's cascade; it does not fire only because the kit source no longer composes a bare `inline-flex` under `hidden` (false premise 5). **Phase-1 rule: never put a bare `inline-flex` alongside `hidden` on this site. The cascade will not save you and source review will pass it.**

---

## 4. THE SIX KIT-CHROME PROPS

Sources: `packages/web-shared/design/chrome/SiteHeader.tsx:348,349,353`; `SiteFooter.tsx:80-86,130-132`.

| prop | kit DEFAULT | this site's pre-port equivalent | phase-1 action |
|---|---|---|---|
| `SiteHeader.ctaContactGoal` | `"form"` (`:348`) | **none** - the header has no CTA, and the whole site emits only two `data-cta*` attributes: `data-cta="thankyou-return-article"` and `data-cta-placement="thank_you"`, both on `/thank-you` | **Pass explicitly.** charities and generalist both pass `"contact"`. Inheriting `"form"` opens a `vw_cta_performance` row this site has no history for. |
| `SiteHeader.ctaMobilePlacement` | `"mobile_menu"` (`:349`) | **none** - no drawer exists, so no mobile CTA and no placement id | **Pass explicitly.** charities and generalist both pass `"header_mobile"`. Read method below. |
| `SiteFooter.resourcesHref` | `"/landlord-tax"` (`:80`) | the hub-shaped section here is `/vat` (children: `/vat/135-import-rule`, `/vat/deemed-supplier-establishment`, `/vat/vat-on-marketplace-fees`); `/for` is the second candidate (crypto passes `"/for"`) | **Pass explicitly. `/landlord-tax` is a 404 here** (`curl -o /dev/null -w '%{http_code}' /landlord-tax` -> `404`). Inheriting the default ships an **empty** Resources column, because `childrenOf("/landlord-tax")` matches nothing in this site's nav. |
| `SiteFooter.companyItems` | `[About /about, Contact /contact, Locations /locations, Book a consultation /book]` (`:81-86`) | `niche.config.json.footer_links`: Contact, Blog, Privacy Policy, Cookie Policy, Terms | **Pass explicitly.** Every default href probed against this site: `/about` **200**, `/contact` **200**, `/book` **200**, **`/locations` 404**. `ecommerce/niche.config.json` has `"locations": []`, confirming no locations surface. Inheriting the default ships **one 404 link in the footer of every page**. |
| `SiteFooter.showBuilderCredit` | `true` (`:132`) | this site's footer renders no builder credit; it renders `siteConfig.company.legalDisclosure` only | **Leave at default `true`** - charities, crypto and generalist all record the default as the owner's standing choice. But it is a **visible new line on every page**, so surface it in the phase-1 diff rather than letting it appear silently. |
| `SiteHeader.wordmarkAccentColor` | `undefined` (`:353`) -> falls back to `--color-primary-600` | brand is `#c9861b` (`niche.config.json.brand.primary_color`), surfaced as `--brand-primary` at `globals.css:18`. **`--color-primary-600` is defined nowhere on this site** - no match in `globals.css`, and there is no `@theme` block at all | **Must be resolved either way.** Either pass `wordmarkAccentColor="#c9861b"` (crypto, `PageShell.tsx:65`) or define the `primary-*` scale by importing `globals-standard.css` (charities). Doing neither renders the accent as an invalid colour. |

**How `ctaMobilePlacement` was read without the drawer rendering:** it is a source constant, not a runtime value. `SiteHeader.tsx:612` `data-cta-placement={ctaMobilePlacement}` sits inside the `{open ? ... }` drawer branch, so no SSR crawl and no page-source review on any route can see it; the default is read from the parameter destructure at `:349`. This site's shipped bundle contains no drawer at all, so there is nothing to grep in it - **on a ported site the correct probe is the client chunk, not the page source.**

---

## 5. KIT COMPONENT DISPOSITION

**Baseline, decisive:** `grep -rho "@accounting-network/web-shared/[a-z/]*" ecommerce/web/src | sort | uniq -c` returns **zero `web-shared/design/*` imports**. The site uses `web-shared/lead` (41 refs), `console` (19), `tools` (11), `analytics` (5), `content` (2) and others - **not one design-kit component**. The port is a from-zero adoption of the design layer.

### Blocking prerequisites (these gate the whole of phase 1, not one component)

| prerequisite | measured state | consequence if skipped |
|---|---|---|
| `@source "../../../../packages/web-shared"` in `globals.css` | **ALREADY PRESENT** (`globals.css:4`) | none - already done, do not redo it |
| `@import ".../design/globals-standard.css"` | **ABSENT.** All eight other sites import it (Dentists, Medical, Solicitors, charities, construction-cis, contractors-ir35, crypto, generalist); ecommerce is the only one that does not | no `@theme`, no `--radius-*`, no motion or glow rules; kit shape classes degrade |
| `primary-*` colour scale | **ABSENT.** Site defines `--brand-primary` etc. but no `--color-primary-600/700/800` | every kit `bg-primary-600`, `text-primary-700`, `border-primary-600`, `outline-primary-600` resolves to an invalid colour |
| `tw-animate-css` | **ABSENT** from `ecommerce/web/package.json`; `globals-standard.css`'s own header says it "must be listed in the consuming site's own dependencies" | the `globals-standard.css` animation layer does not resolve |
| `.story-numeral` / `.story-numeral-rule` CSS | **ABSENT.** Authored per site; only `Property/web/src/app/globals.css` and `crypto/web/src/app/globals.css` define them. `grep -c 'story-numeral' <this site's css bundle>` -> `0` | `NumberedReasons` renders numerals and rules stuck in their un-revealed state |
| `@radix-ui/react-accordion`, `lucide-react` | not in `ecommerce/web/package.json`; both declared by `packages/web-shared/package.json` (`:160`, `:163`) | resolves via the workspace today; confirm at the first build that actually renders `FaqSection` |

### chrome/

| component | disposition | measured reason |
|---|---|---|
| `PageShell` | **Only with props passed** - highest-value item in the port | supplies skip link, single `<main id="main">`, `/embed/*` chrome bypass; all three missing here (checks 2 and 0.3). Needs the thin **client shell wrapper** (`"use client"`, local file) because `wordmarkIcon` is a component function and cannot cross the RSC boundary - **required pattern, not a deviation.** Requires deleting the 9 per-page `<main>`s. |
| `SiteHeader` | **Only with props passed** | 3 of the 6 props must be set (check 4); `wordmarkAccentColor` or a `primary-*` scale is mandatory |
| `SiteFooter` | **Only with props passed** | `companyItems` default ships a `/locations` **404**; `resourcesHref` default `/landlord-tax` is a **404** |
| `nav.ts` | AS-IS | pure helper |

### blog/

| component | disposition | measured reason |
|---|---|---|
| `BlogCategoryHub` | **Only with props passed** | carries `id="enquiry-form"` at `:292` -> **adds a lead-capture surface**. Owner gate (check 8). |
| `BlogListWithSearch` | AS-IS | supplies its own `scroll-mt-24` (`:104`) |
| `HubArticleList` | AS-IS | supplies its own `scroll-mt-24` (`:76`) |
| `RelatedArticles` | AS-IS | presentational |
| `BlogSidebarCta` | **Only with props passed** | lead-capture surface; same owner gate |
| `ReadingProgress`, `TableOfContents` | see duplicate-family note | |

**DUPLICATE FAMILY.** `packages/web-shared/design/blog/` and `packages/web-shared/content/` each carry a `ReadingProgress.tsx` and a `TableOfContents.tsx`. **This site currently imports from `web-shared/content/`** (`content/llms`, `content/feed` in its import census) and imports nothing from `design/`. Phase 1 pulls in the **`design/blog/`** family with the rest of the kit. **Flag: after the port both families can be resolved in one build, and a patch to either copy must be mirrored or the two drift.** Phase 1 must name which family this site imports and say so in writing.

### marketing/

| component | disposition | measured reason |
|---|---|---|
| `LeadCTAPanel` | **Only with `proofPoints={[]}`** | `:163` renders `proofPoints` whenever non-empty; the prop is **required** (`:38` `proofPoints: ProofPoint[]`, no default), and estate call sites pass a turnaround promise. Also a lead-capture surface - owner gate. |
| `WhatToExpectCard` | **Only with `items` passed** | `:22-27` `DEFAULT_ITEMS` ends with **"Fixed fee quote if you decide to proceed"** - a fee-model claim nobody on this site authored. `items` **has** a default, so omitting it publishes the claim silently. Confirmed as briefed. |
| `StatsCounter` | **NOT adoptable for composite or cited figures** | `:7` `target: number` - one number plus `prefix`/`suffix` strings, and **no href and no children anywhere in the file**. Routing a cited composite research figure through it deletes the citation link and mangles the figure. Adoptable only for a single uncited round number. |
| `TestimonialsSection` | **NOT adoptable** | `:8` exports a hardcoded `testimonials` array of **Property's** quotes (Section 24 modelling, the 60-day CGT deadline, MTD property mapping). Confirmed verbatim. Publishing them on ecommerce is a false claim, and the estate model is anonymised social proof only. |
| `NumberedReasons` | Only with the CSS ported | depends on `.story-numeral` / `.story-numeral-rule` (prerequisites above), **not** `animate-*` (false premise 6) |
| `StickyCTA` | **NOT adoptable - banned** | an interruption. Check 8: the port changes neither the interruptive set nor the lead-capture set. Do not mount it. |
| `ScrollGlowGroup` | Only with the CSS ported | sets the data attribute the `globals-standard.css` glow rules key off |
| `ComparisonTable`, `CoverageCards`, `DrawnTickList`, `ProblemStatement`, `ProcessTimeline`, `WhyUsList`, `PromptMarquee` | AS-IS adoptable | presentational, content-driven, no default that publishes a claim |
| `TopicSection` | AS-IS adoptable | supplies its own `scroll-mt-24` (`:71`) |

### primitives/

| component | disposition | measured reason |
|---|---|---|
| `FaqSection` | **Only with the FAQ JSON-LD handled** | `:34` `<Accordion type="single" collapsible>`, `:38` `<AccordionContent>` - **no `forceMount` anywhere in the file**. Radix strips closed panels from the server HTML, so with `type="single"` every answer but one is absent from the SSR'd DOM while FAQPage JSON-LD keeps asserting them all. Confirmed as briefed. Either thread `forceMount` through `accordion.tsx` or do not emit FAQ JSON-LD for sections rendered this way. |
| `accordion.tsx` | AS-IS (it is the primitive) | `@radix-ui/react-accordion` + `lucide-react`; see prerequisites |
| `Breadcrumb`, `EyebrowRule`, `ExampleFigureNote`, `NoticeCard`, `NumberedPagination`, `SlimHero`, `page-blocks` | AS-IS adoptable | presentational, no claim-bearing defaults |

### guards/

Not components. `calculator-tabs-crawl-path`, `first-sentence`, `hub-article-crawl-path`, `nav-active-state`, each with a `.test.ts`. Adopt each guard with the component it guards.

---

## 6. ANCHORS

```
for p in / /services /vat /calculators /research/online-seller-index /for/amazon-sellers /services/ecommerce-vat-compliance; do
  curl -s http://localhost:3191$p | grep -o 'href="#[^"]*"' | sort -u; done
```
**Result: zero in-page anchors on every marketing, hub, service, VAT and calculator route.**

The only in-page anchors on the site are on research-style blog posts:
```
curl -s http://localhost:3191/blog/business-structure-and-tax/online-seller-formation-trends | grep -o 'href="#[^"]*"' | sort -u
-> #ref-1  #ref-2  #ref-3  #ref-4
```
Their targets (`id="ref-1"` .. `id="ref-4"`, plus `id="sources"` and eight heading ids) carry **no `scroll-margin-top`**.

```
grep -rn 'scroll-margin\|scroll-mt' ecommerce/web/src        -> no match
grep -o 'scroll-margin[^;}]*' <css bundle>                   -> scroll-margin-top:calc(var(--spacing) * 24)   (one rule)
grep -o '[^}{]*{[^}]*scroll-margin[^}]*}' <css bundle>       -> .scroll-mt-24{...}
```
The single `.scroll-mt-24` rule in the bundle is compiled from **kit files only** (`design/blog/BlogCategoryHub.tsx:264,292`, `BlogListWithSearch.tsx:104`, `HubArticleList.tsx:76`, `marketing/TopicSection.tsx:71`), reachable because of the `@source` line. **No element this site actually renders uses it.**

**`#main`: 0 occurrences.** There is no `id="main"` and no skip link, so the sibling sites' "`#main` measures 0px" defect is not measurable here - the target does not exist yet. **When `PageShell` introduces `<main id="main">` in phase 1, it introduces that defect unless a `scroll-mt-*` lands in the same change.**

| anchor target | count | `scroll-margin-top` today |
|---|---|---|
| `#ref-N` footnote refs (research blog posts) | 4 per post | **0px** |
| heading ids on research blog posts (`#sources`, `#the-decade-in-numbers`, ...) | 9 per post | **0px** - nothing points at them today, but a ported `TableOfContents` will |
| `#main` | **does not exist** | n/a - created in phase 1 |

---

## 7. A11Y DEFECTS THAT HIDE DATA

`src/components/research/FormationSeasonalityChart.tsx` (1 chart) and `SurvivalIndexCharts.tsx:66,101` (2 charts). All three are dependency-free, server-rendered inline SVG.

- **`role="img"` on a subtree carrying values: YES, all three.** `FormationSeasonalityChart.tsx:36`, `SurvivalIndexCharts.tsx:66`, `:101`. `role="img"` makes the subtree an accessibility leaf: every `<text>` inside is removed from the tree and only the one-line `aria-label` survives.
- **`aria-hidden` / `sr-only` on a `<table>` or an ancestor: NO.** All four tables across the two research pages render as `<table class="w-full text-sm border-collapse">` (one also `max-w-lg`), visible, no `sr-only`, no `aria-hidden`. The `display: table` overflow carve-out does not apply (false premise 7).
- **Is every value reachable as a text node? NO for one chart.**

```
# extracted every <text> node of each SVG and the <th> set of each page
/research/online-seller-index
  svg aria-label "Average SIC 47910 incorporations by calendar month"
    text nodes: 0, 1,062, 2,124, 3,186, 4,248, Jan..Dec, "Highest month", "Lowest month"
  page <th>: Quarter, Incorporations, Dissolutions, Net | Formed in, Ever registered,
             Still active, Still active (%) | Survival at 1yr, at 2yr, at 3yr | Year, Internet retail share (%)
```
**Defect: the twelve monthly averages exist only as bar heights.** The SVG's text nodes are gridline labels (`0 / 1,062 / 2,124 / 3,186 / 4,248`) and month names - there is no per-bar value. No table on the page carries a monthly series (no `<th>` mentions months). With `role="img"` collapsing the subtree, **a screen-reader user gets the sentence "Average SIC 47910 incorporations by calendar month" and no numbers at all**, and a sighted user gets no exact figure either. The `aria-label` names neither the peak month nor the trough, despite the component computing `peakIdx` and `troughIdx` at `:24-25`.

The two `SurvivalIndexCharts` are **covered**: `/research/online-seller-survival-index` renders a table with `<th>` `Birth year, Births, 1yr, 2yr, 3yr, 4yr, 5yr`, carrying the series both charts plot. Their `role="img"` is therefore acceptable - the data has a text route.

Phase-1 disposition: this is a data-reachability defect in **site** code, not kit code. Fix is either a monthly table beside the seasonality chart or an `aria-label` that names peak and trough with values. It is not caused by the port, and the port must not paper over it silently.

---

## 8. INTERRUPTIVE SURFACES

```
grep -rln 'StickyCTA\|exit-intent\|exitIntent\|role="dialog"\|aria-modal\|banner\|toast\|Modal' ecommerce/web/src
-> no match
```

**Interruptive surfaces today: NONE.** No modal, no banner, no popup, no toast, no exit-intent, no timed surface, no `StickyCTA`. `ConsentBanner` exists in the kit (`web-shared/analytics/react/ConsentBanner.tsx`) but is **not mounted**: `layout.tsx` runs `posture="opt-out"`, and the kit's own note (`analytics/init.ts:28`) reserves the banner for `"opt-in"` sites.

**Lead-capture surfaces today, by route:**

| route | surface | source |
|---|---|---|
| `/` | `LeadForm` | `src/app/page.tsx` |
| `/contact` | `LeadForm` | `src/app/contact/page.tsx` |
| `/book` | `BookingPicker` | `src/app/book/page.tsx` |
| `/complete` | `DetailsForm` | `src/app/complete/page.tsx` |
| `/thank-you` | post-submit surface | `src/app/thank-you/page.tsx` |
| `/research/online-seller-survival-index` | `LeadForm` | `src/app/research/online-seller-survival-index/page.tsx` |

**The port changes NEITHER set.** Three kit components would add to the lead-capture set if adopted unguarded - `LeadCTAPanel`, `BlogSidebarCta`, and `BlogCategoryHub`'s `id="enquiry-form"` block - and `StickyCTA` would add to the interruptive set. **Each is an owner gate, every time.**

---

## 9. THE LEFTOVERS

- **Components with no importer: none.** Scripted check over every `.tsx` basename under `src/components`: each has at least one reference outside its own file.
- **Redirect map: does not exist** (false premise 1). No `middleware.*` anywhere; `next.config.ts` carries only the apex->www 308. **The redirected-slug-still-on-disk defect class is not instantiable here.**
- **Routes nothing links to:**

| route | in-site `href` refs | in sitemap | verdict |
|---|---|---|---|
| `/book` | **0** | **yes** (3 `/book` matches in `sitemap.xml`) | **orphan in navigation.** Indexable and submitted, but no page links to it. Real defect: an indexed booking page with zero internal link equity. |
| `/complete` | **0** | no | reached only as a post-submit step; acceptable, but confirm the flow that reaches it |
| `/thank-you` | **0** | no, and `robots.ts:80` disallows it | correct by design. Reached by `LeadForm.tsx:35` `successRedirect` and `api/leads/confirm/[token]/route.ts:74` |
| `/embed/[slug]` | **0** | no | correct by design - partners embed it. **But it ships full site chrome** (false premise 3) |
| `/admin/*` | **0** | no; `robots.ts:80` disallows and `layout.tsx` sets `noTrackPrefixes: ["/admin"]` | correct by design |

- **Orphaned analytics ids: none, because almost nothing is instrumented.** The site emits only two `data-cta*` attributes in total, both on `/thank-you`. **The port adds header, footer and CTA ids wholesale; phase 1 must pass `ctaContactGoal` and `ctaMobilePlacement` explicitly (check 4) or it writes `vw_cta_performance` rows under the kit's literals.**
- **Sitemap: 51 `<loc>` entries.**

---

## WHAT THIS SITE DOES *NOT* NEED - DO NOT INVENT THIS WORK

| not needed | measured basis |
|---|---|
| Locations work of any kind | `ecommerce/niche.config.json` -> `"locations": []`; `/locations` -> **404**. The only locations exposure is the kit's `companyItems` default, and it is **prevented by passing the prop**, not by building a surface. |
| Lead magnets | none exist; adding one is a new lead-capture surface = owner gate (check 8) |
| A glossary | no glossary route in the app tree (23 route shapes enumerated; none is a glossary) |
| Compute-library changes | calculators run off `src/lib/calculators/registry` + `web-shared/tools/*`; the port touches presentation only. `/calculators/[slug]` and `/embed/[slug]` already render correctly. |
| A redirect-map audit | **no `middleware.ts` exists** (false premise 1) |
| Re-fixing the `btnPrimary` / `hidden` estate defect | **already fixed in the kit** at `layout-utils.ts:36-39` (false premise 5) |
| A breakpoint-drift fix in the kit header | nav, CTA, burger and drawer are **all on `lg:`**, verified as one check (check 3) |
| An `sr-only`-table overflow fix on the research pages | no table or ancestor is `sr-only` or `aria-hidden` (false premise 7). The real defect there is the seasonality chart's unreachable values (check 7). |
| An `/embed` gallery page | `/embed` is a **404** and this site has no gallery (false premise 2). Do not build one under cover of the port. |
| Adding `@source "packages/web-shared"` to `globals.css` | **already present** at `globals.css:4` |
