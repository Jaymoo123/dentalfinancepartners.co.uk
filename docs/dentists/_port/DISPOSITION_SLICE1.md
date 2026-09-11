# DENTISTS PORT BLUEPRINT — SLICE 1: CHROME, TOKENS, NAV IA, BLOG SUBSYSTEM

Site: `Dentists/web` (Dental Finance Partners, www.dentalfinancepartners.co.uk,
`source_identifier: dentists`, verified in `Dentists/niche.config.json:130`).
Reference: `Property/web` (local files, NOT the kit — see §G) + `packages/web-shared/design/`.
Method: `docs/_engines/DESIGN_PORT_PLAYBOOK.md`. Field notes: `docs/_engines/PORT_FIELD_NOTES.md`.
Surveyed 2026-09-11, every file opened. Read-only survey; nothing built.

**Standing conversions applied to every row below** (stated once):
- Dentists themes through CSS variables (`text-[var(--gold)]`, `bg-[var(--navy)]`). The port
  replaces these with real Tailwind ramp classes (`primary-*`, `slate-*`), because the kit
  emits `primary-*` and because the contrast instrument cannot read `var()` (playbook T25).
- Radius: Dentists uses `rounded-full` buttons, `rounded-lg`, `rounded-xl`, `rounded-2xl`
  interchangeably. `rounded-xl` becomes the only card/button radius.
- `font-serif` / `display-serif` (Cormorant Garamond) is retired; see §B.3 and T26.
- Copy: no em-dashes, no turnaround promises, no pricing for our services, British English.
- All content, all URLs, all forms stay unless an owner gate says otherwise.

---

## 0. THE MEASURED SHAPE (re-derived, commands in the receipt)

| Thing | Count | Note |
|---|---|---|
| Blog posts (`content/blog/*.md`) | 223 | brief correct |
| Blog categories (slugified) | 12 | 5 static hub files + 7 rendered by `[category]` |
| Dental guides (`content/dental-guides`) | 6 | brief correct |
| Resource-hub topics (`content/resources`) | 6 | brief correct |
| Locations | 2 | london, manchester |
| Calculators (generic tools) | 13 | brief correct |
| **Premium tools (no routes)** | **6** | blog islands only; registry comment says "five", it lists six |
| **Service sub-pages (`/services/[slug]`)** | **5** | **NOT IN THE BRIEF.** A sixth template. |
| Static `page.tsx` | 43 | brief correct |
| Addressable routes | **309** | 292 public (13 `/embed/*` noindex, 4+1 `/admin/*` excluded) |
| Templates rendering >1 page | **7**, rendering 262 | brief said 5 rendering 250; it missed `/services/[slug]` (5) and `/blog/[category]` (7) |

---

## A. SITE CHROME

Dentists renders LOCAL chrome and imports **nothing** from `packages/web-shared/design/`
(verified: `grep -rn "web-shared/design" Dentists/web/src` returns zero rows). The kit chrome's
only consumers are generalist and Solicitors. The port makes Dentists the third.

**The template to copy is `generalist/web/src/components/layout/PageShell.tsx` (101 lines).**
It is the finished form of commit `f4026125a` plus every correction since. Read it, not the
commit diff.

### A.1 `src/components/layout/SiteHeader.tsx` (208 lines, client)

Renders in order: sticky bar (`bg-[var(--surface)]/90 backdrop-blur-xl`, `border-[var(--border)]/80`)
→ `BrandWordmarkHomeLink` → desktop `<nav aria-label="Primary">` from `siteConfig.nav` (pill
links, `md:flex`) → secondary CTA link (`md:inline-flex`) → primary CTA (`btnPrimary`,
`sm:inline-flex`) → burger (`h-12 w-12`, `md:hidden`) → drawer (fixed, `md:hidden`, scrim,
"Menu" eyebrow, wordmark, nav list, footer CTA + secondary link).

| Disposition | **PORT** to the kit `SiteHeader` via `KitPageShell` | Phase 1 |
|---|---|---|

Adaptations required, each one a live-analytics or a11y hazard:

| # | Item | Dentists today (file:line) | Action |
|---|---|---|---|
| 1 | Breakpoint band collision | nav appears at `md:` (`:69`), burger hides at `md:` (`:110`), primary CTA appears at `sm:` (`:99`) | kit puts nav and burger both at `lg:`; the `sm:` CTA is the exact 08-23 incident breakpoint. Kit fixes all three. |
| 2 | `ctaIds` | primary `header-nav-cta` (`:101`), mobile `header-mobile-cta` (`:169`), secondary `header_nav_secondary` (`:92`) | **PASS ALL THREE VERBATIM.** Kit defaults are Property's `header_book` / `header_book_mobile` / `header_contact`. Note the hyphen-vs-underscore inconsistency in Dentists' own ids; do NOT tidy it, it is live segmentation. |
| 3 | `ctaContactGoal` | `data-cta-goal="contact"` (`:102`, ternary on `/contact` prefix) | **PASS `"contact"`.** Kit default is Property's `"form"`. Playbook T22. |
| 4 | `ctaMobilePlacement` | `data-cta-placement="header_mobile"` (`:169`) | **PASS `"header_mobile"`.** Kit default is Property's `"mobile_menu"`. Renders only when the drawer is open, so no SSR crawl will ever catch this; read the client bundle. |
| 5 | `wordmarkAccentColor` | n/a today (wordmark is text-only, no icon) | **PASS the brand hex** once §B settles it. Gold `#b8975d` is not a ramp step of anything. |
| 6 | `wordmarkIcon` | **none** — Dentists' wordmark has no icon at all | GATE 1. Kit `SiteHeader` requires a `WordmarkIcon`. Needs a lucide icon chosen (recommend `Stethoscope` or `Smile`; Property uses `Home`, generalist `Briefcase`). Also forces a new dependency, see §H. |
| 7 | Drawer secondary link | `header_mobile_secondary` (`:180`) | **The kit drawer has no secondary-link slot** (known kit gap). Dead today anyway, see #8. Retire the id; record it as orphaned. |
| 8 | Secondary CTA renders nothing | `activeCta.header_secondary` is undefined under the live `leadgen` variant (`niche.config.json:220-240` defines only `header_primary`) | **`header_nav_secondary` and `header_mobile_secondary` have never fired.** Correct any claim that the header has two CTAs. |
| 9 | Nav source | `siteConfig.nav` read client-side (`:73`) | kit takes `nav` as a server-built prop so the tool registry never reaches the client. Build it in `layout.tsx` with `buildPrimaryNav()`. |
| 10 | Active state | prefix match on both levels (`:74`) | kit: top-level PREFIX, children EXACT, guarded by `design/guards/nav-active-state`. |
| 11 | "Menu" eyebrow | `:151-153` | RETIRE, retired idiom. |

### A.2 `src/components/layout/SiteFooter.tsx` (75 lines)

Renders: navy ground → **"Our Specialist Accounting Services" sister-site block** (2 followed
outbound cards to accountsforlawyers.co.uk and medicalaccounts.co.uk, `:12-35`) → 2-column grid:
white tile holding the footer wordmark + `siteConfig.description` | flat `footer_links` list
(4 items) + `legalDisclosure` + copyright + `ConsentToggle`.

| Disposition | **PORT** to kit `SiteFooter`, with one local carve-out | Phase 1 |
|---|---|---|

| # | Item | Action |
|---|---|---|
| 1 | Flat `footer_links` thirds | kit derives Services / Resources / Calculators / Company columns from the nav. Raises the footer link floor and cannot go stale. |
| 2 | `resourcesHref` | **MUST pass `"/dental-guides"`.** Default is Property's `/landlord-tax`, which renders an EMPTY Resources column on any other site (known kit gap). |
| 3 | `companyItems` | **MUST override.** Default includes `/book`, which on Dentists is `robots: noindex,nofollow` (`book/page.tsx:17`) and must not be a footer link. Recommend `About / Contact / Locations / Research`. |
| 4 | `footerLinks` | keep the 4 legal items from `niche.config.json footer_links` minus `/locations` (which moves into Company). |
| 5 | `showBuilderCredit` | **pass nothing; the default `true` is correct.** Playbook §8 item 11, owner decision 2026-09-11, reverses the older `false` guidance still written in `PORT_FIELD_NOTES.md` §2. Flagged in the receipt. |
| 6 | **Sister-site block** | **MIRROR LOCALLY.** The kit footer has no slot for it. It is two followed outbound links on every page of the site; it predates the port and is an owner asset, not a defect. Recommend passing it through `newsletterSlot` (the only free ReactNode slot) or adding one additive `crossSiteSlot` prop. **Do not silently drop it** (it is 2 unique internal-to-estate links x 292 pages). GATE 2. |
| 7 | `consentToggle` | pass the local `ConsentToggle`; the `/cookie-policy` page promises a "Do not track me" control in the footer (comment at `:65-69`), so it is load-bearing compliance copy. Verify it still renders after the port. |
| 8 | White wordmark tile (`:39-41`) | RETIRE. Kit renders the footer lockup directly on the navy ground. |

### A.3 `src/components/layout/PageShell.tsx` (29 lines)

Renders: flex column → skip link → `SiteHeader` → `<main id="main">` → `SiteFooter` → `StickyCTA`.

| Disposition | **PORT** to `KitPageShell` | Phase 1 |
|---|---|---|

**LIVE DEFECT, fixed for free by the port:** this shell has no `/embed/` bypass, so all 13
`/embed/[slug]` widgets ship the full site header, footer and sister-site block inside a
partner's iframe. The kit shell bypasses on `pathname?.startsWith("/embed/")`
(`packages/web-shared/design/chrome/PageShell.tsx:29-31`). `StickyCTA` already self-excludes
`/embed` (`StickyCTA.tsx:92`), which is why nobody noticed the rest.

`StickyCTA` moves OFF the shell and onto `app/page.tsx` only, matching Property and generalist
(kit shell mounts no sticky CTA). Dentists' StickyCTA is intent-personalised beyond the kit
version, so the component itself stays LOCAL. Its `min(500px, 25%)` threshold is a sanctioned
deviation, same as generalist's.

### A.4 `src/app/layout.tsx` (116 lines)

Providers, in order: `ConsentProvider` → `AnalyticsProvider` (siteKey from niche, storagePrefix
`dfp` FROZEN, `noTrackPrefixes` `/admin` `/embed`) → `ConsentedScripts` (GA4 `G-273RJY0LZQ`) →
`IntentProvider` → `PageShell` → `ReturningBar` → `DeepScrollModal` → `SpecialistWidget`.

| Disposition | **PORT (wiring only)** | Phase 1 |
|---|---|---|

- Port every provider and every interruptive mount as-is. **Add none, remove none, change no
  trigger, timing or audience** (standard terms §7, playbook §1). `ReturningBar`,
  `DeepScrollModal` and `SpecialistWidget` are restyled in phase 6, never retimed.
- Build `nav` server-side here and pass it to the shell.
- Fonts: drop `Cormorant_Garamond`, keep `Plus_Jakarta_Sans`. See §B.3 for the T26 mapping.
- `metadataBase`, verification, OG defaults: LEAVE.

### A.5 `src/components/brand/BrandWordmarkHomeLink.tsx` (41 lines)

Already the two-line typographic lockup the standard wants: `text-[0.65rem] tracking-[0.18em]`
name / 2px gold rule / `text-[0.6rem] tracking-[0.32em]` descriptor, with a footer size variant.
Generalist needed a raster-vs-typographic gate here; **Dentists does not.** No gate.

| Disposition | **RETIRE** (kit renders the lockup from `wordmarkTop`/`wordmarkBottom`) | Phase 1 |
|---|---|---|

One defect to carry across: the accessible name is the visible text PLUS an off-screen
`, {tagline}` (`:36`), which fails WCAG 2.5.3 Label in Name. The kit builds
`"${top} ${bottom}, home"`, which fixes it. Export `WORDMARK_TOP = "DENTAL FINANCE"` /
`WORDMARK_BOTTOM = "PARTNERS"` from this file for the call site, as generalist does.

`src/components/brand/BrandLogoHero.tsx` (26 lines) is the hero-sized variant, used on the
homepage hero only. **RETIRE** in phase 5 when the hero is rebuilt.

---

## B. TOKENS — `src/app/globals.css` (330 lines) vs Property's 832

Property's own `globals.css` does **NOT** define a `--color-primary-50…950` ramp either; it
carries hand-rolled `--emerald-*` / `--slate-*` / `--amber-*` ramps and aliases a single
`--color-primary`. The `primary-*` ramp the KIT emits is defined per consuming site: see
`generalist/web/src/app/globals.css:124-134` and `Solicitors/web/src/app/globals.css:122+`.
**So the brand-layer package for Dentists writes a new ramp into Dentists' own globals.css.**
It blocks every other package in the port (kit components emit `primary-*` classes that render
as nothing until the ramp lands). Run it alone, first.

### B.1 What exists today

| Token group | Value | Disposition |
|---|---|---|
| `--navy` `#001b3d`, `--navy-soft` `#0d2d52`, `--navy-muted` `#1a3a5c` | brand dark | becomes the `primary-*` ramp anchor (recommended, §B.2) |
| `--gold` `#b8975d`, `--gold-strong` `#9e7f4a`, `--gold-soft` rgba(...,.14) | brand accent | kept as a fixed accent token, NOT the ramp |
| `--background` `#f4f6f9`, `--surface` `#fff`, `--surface-elevated` `#eef1f6` | grounds | to `bg-white` / `bg-slate-50`; navy sections to the dark ground |
| `--ink` `#001b3d`, `--ink-soft` `#2d3f5c`, `--muted` `#5c6b80`, `--border` `#e2e8f0` | text/hairline | slate-adjacent already; map to `slate-900/700/500/200` |
| `--brand-primary: var(--gold)` etc (`:35-37`) | kit bridge tokens | RETIRE once real ramp classes land |
| `--chart-1..5` | navy/gold recharts palette | KEEP, re-anchor on the new ramp (phase 6, research pages) |
| `.hero-brand` + `::before` + `::after` | navy gradient + radial glows + 56px grid SVG | this IS Dentists' backdrop motif. **PORT** it into a `DentistsBackdrop` component with `tone="navy" | "light"`, the shape the kit `backdrop` slot takes. |
| `.hero-reveal*` transform-only keyframes | motion | KEEP. Already avoids the invisible-hero-on-SSR class of bug. |
| `.eyebrow-gold`, `.rule-gold`, `.section-label` | eyebrow idioms | RETIRE into kit `EyebrowRule`. |
| `.card-premium`, `.card-flat`, `.hero-glass` | card recipes, `border-radius: 1rem` | RETIRE into the standard `rounded-xl border` card. |
| `.article-body.prose-blog` (`:196-330`) | the blog body stylesheet | **PORT** wholesale to the standard `.prose-blog` (17px/1.75/65ch, h2 with a 4px primary left border). Its h2 currently uses Cormorant. |

### B.2 Measured contrast (WCAG relative luminance, sRGB; hand-computed, `scripts/validate_palette.js` does not exist)

Self-test: slate-500 on white = 4.76, slate-400 on white = 2.56.

| Pair | Ratio | Verdict |
|---|---|---|
| gold `#b8975d` as TEXT on white | **2.78** | ⚠ FAIL |
| gold as TEXT on `--background` `#f4f6f9` | **2.70** | ⚠ FAIL |
| gold-strong `#9e7f4a` as TEXT on white | **3.76** | ⚠ FAIL for text, passes 3:1 for graphics |
| navy `#001b3d` label on gold ground (`btnPrimary`) | **6.19** | PASS |
| white label on gold ground | 2.78 | FAIL — never do this; the existing navy label is correct |
| gold on navy | 6.19 | PASS |
| gold-strong on navy | 4.57 | PASS |
| `focusRing` outline gold on white | 2.78 | ⚠ FAIL even at the 3:1 graphics floor |
| `--muted` `#5c6b80` on white / on `#f4f6f9` | 5.46 / 5.05 | PASS |
| `--ink-soft` `#2d3f5c` on white | 10.71 | PASS |
| navy on white | 17.2 | PASS |

**The finding:** unlike generalist, Dentists' PRIMARY BUTTON already clears contrast (6.19:1,
navy on gold). Do not "fix" it. What fails is **gold used as text on a light ground**, and the
**focus ring**. `grep -rno 'text-\[var(--gold)\]' src` = 75, `--gold-strong` = 45,
`--accent-strong` = 30, `--accent` = 2: **152 instances across 42 files**, an unknown share of
which sit on navy and pass. Phase 1 classifies each by ground; the rest of the sweep belongs to
the phase that owns each file.

Two of these are systemic and land in phase 1 or 2 regardless:
- `.eyebrow-gold` (2 uses) and `.section-label` (12 uses) are gold-on-light by definition.
- `BlogPostRenderer.tsx:318` renders the closing CTA `<h2>` as `text-[var(--gold)]` on a near-white
  gradient: **2.78:1, on all 223 posts.**

### B.3 Ramp recommendation (GATE 3, brand swatch is an owner call)

**Recommend: `primary-*` = a navy ramp anchored on `#001b3d`; gold stays a fixed accent token.**

Why, in one line each: gold cannot carry a white label at any usable step (2.78) and cannot be
text on light (2.78/3.76), so it can never be the `primary-600/700` the kit's buttons and links
assume; navy at those steps clears 12:1+ with white. Gold is also amber-adjacent, and the
standard reserves amber/orange for warning semantics, so making gold the brand would force the
warning ramp somewhere stranger. Keeping gold as a non-text accent preserves the site's actual
visual identity (rules, borders, tick marks, on-dark eyebrows) with zero contrast risk.

Warning / duty / deadline ramp: off amber AND off gold. Recommend the Solicitors-shaped ladder
(violet-700 → fuchsia-700 → red-600 → red-800, on-dark violet-400 / fuchsia-400 / red-400),
which is already measured in `docs/generalist/DESIGN_DELTA.md` §2 and needs no new arithmetic.

### B.4 Fonts (T26)

`Plus_Jakarta_Sans` + `Cormorant_Garamond` (`layout.tsx:16-26`), wired as `--font-sans` /
`--font-serif` (`globals.css:53-58`).

- KEEP Plus Jakarta as the sans. It is not Geist, but it is a competent UI sans and a font change
  is a BLOCKER-class owner input for no design gain. Not proposed.
- RETIRE Cormorant. **`grep -rn font-serif src | wc -l` = 128, plus 18 `display-serif`.** Those
  classes are spread across page files that phases 2 to 6 own, so they cannot be swept in one
  commit without colliding with every other builder.
  **RULE: map `--font-serif` to `--font-sans` as a documented transitional no-op in phase 1.**
  Each later phase deletes its own classes. The mapping goes when the count reaches zero. Never
  leave 146 headings rendering as Times across the port.

### B.5 Two real defects in this file

1. `--background` and `--border` are each declared TWICE in the same `:root` block
   (`:22`/`:47` and `:26`/`:48`), with identical values. Harmless, but it is why the file reads
   as if it has a shadcn layer it does not have. Collapse in phase 1.
2. The file is saved with a UTF-8 BOM and contains mojibake in its comments
   (`â€"`, `â‰¥` at `:6-9`, `:87`, `:196`). Comments only, not user-facing, so it is not an
   em-dash breach, but the encoding will corrupt further on the next non-ASCII edit. Rewrite the
   header comment in ASCII when the file is touched.

---

## C. NAVIGATION IA — Dentists vs Property

### C.1 Header nav

| Slot | Dentists | file:line | Property | file:line |
|---|---|---|---|---|
| Source | `siteConfig.nav` = `niche.navigation`, read CLIENT-side | `SiteHeader.tsx:73` | `getActiveNav(niche)`, server-built, Calculators group from the tool registry | `Property/web/src/components/layout/SiteHeader.tsx` (458 lines, local) |
| Items | Services, Pillar Guides, Calculators, Health Check, Blog, Contact (6, flat) | `niche.config.json:36-66` | grouped nav with a click-toggled Calculators dropdown | same |
| Breakpoint | `md:flex` | `SiteHeader.tsx:69` | `lg:flex` | kit `:` equivalent |
| Grouping | **none**; every item is a flat link | — | grouped dropdown, `w-[38rem] columns-2`, self-referential first child, Esc/outside/route-change close | kit `SiteHeader.tsx` |
| Primary CTA | "Book a call" → `/contact`, `sm:inline-flex` | `SiteHeader.tsx:96-107` | `btnPrimary`, `lg:inline-flex` | kit |
| Secondary CTA | markup exists, **renders nothing** (no `header_secondary` in the leadgen variant) | `SiteHeader.tsx:89-95` | "Contact" at `xl:` only | kit |
| Duplicate-link defect | Contact is a nav item AND (would be) the secondary link | `niche.config.json:63` | kit hides the nav Contact at `xl:` when the secondary shows | kit |

**Nav IA changes the port needs:** Calculators (13) and Pillar Guides (6) both deserve the kit's
grouped dropdown rather than a flat link. Building the Calculators group from
`src/lib/tools/registry.ts` is mandatory (never hand-list). "Health Check" carries
`hide_in_packages: true` and survives as-is. **No IA change beyond grouping** — a port is not an
IA programme.

### C.2 Mobile drawer

| Slot | Dentists | file:line |
|---|---|---|
| Trigger | `h-12 w-12 rounded-lg border`, `md:hidden` | `SiteHeader.tsx:110-121` |
| Scrim | `bg-[var(--navy)]/50 backdrop-blur-[2px]` | `:132-137` |
| Panel | `w-[min(20rem,92vw)]`, `border-l` (no brand edge) | `:138-145` |
| Header block | "Menu" eyebrow + close button + wordmark | `:146-166` |
| Items | flat `siteConfig.nav`, `rounded-xl px-4 py-3.5` | `:167-189` |
| Footer | `btnPrimary w-full` + a secondary link that never renders | `:190-206` |
Property/kit: brand `border-l-4 border-primary-600`, groups indented under
`text-[11px] uppercase` labels, active child gets `border-l-4 bg-primary-50`. PORT.

### C.3 Footer columns

| Dentists | Property/kit |
|---|---|
| Sister-site block (2 outbound cards), `SiteFooter.tsx:12-35` | no equivalent — **local carve-out, GATE 2** |
| Brand tile + description, `:38-43` | brand column, wordmark + description |
| ONE flat list of 4 `footer_links` (Locations, Privacy, Terms, Cookies), `:45-57` + `niche.config.json:68-87` | FOUR derived columns: Services, Resources (from `resourcesHref`), Calculators (category heads + All), Company |
| legalDisclosure + © + ConsentToggle, `:58-71` | same, in a `border-t border-white/10` legal row |

---

## D. KIT COMPONENTS THAT ARE UNUSABLE FOR DENTISTS (T12 / T27)

Mirror locally. **Never edit the kit to fix these; that changes Property and 18 other sites.**

| Kit component | Why it is unusable here | Do instead |
|---|---|---|
| `design/chrome/SiteFooter.tsx` default `resourcesHref` | defaults to Property's `/landlord-tax`; renders an EMPTY Resources column on Dentists | pass `"/dental-guides"` |
| `design/chrome/SiteFooter.tsx` default `companyItems` | includes `/book`, which is `noindex,nofollow` on Dentists | pass an explicit list |
| `design/chrome/SiteFooter.tsx` builder credit | followed outbound link to Property's design studio | **KEEP IT.** Owner reversed this 2026-09-11; default `true` is now correct estate-wide. Field notes' `false` guidance is stale. |
| `design/chrome/SiteFooter.tsx` — no cross-site slot | Dentists' sister-site block has nowhere to go | mirror locally, or one additive `crossSiteSlot` prop (manager-direct, Property default = nothing rendered) |
| `design/chrome/SiteHeader.tsx` drawer | no secondary-link slot | n/a here: Dentists' drawer secondary never renders |
| `design/marketing/ProblemStatement.tsx` | hardcodes Property's landlord copy, no copy props | MIRROR LOCALLY with dental copy |
| `design/marketing/ComparisonTable.tsx` | forces a "Most recommended" pill, hardcoded copy | MIRROR LOCALLY |
| `design/blog/BlogCategoryHub.tsx` | defaults Property's `proofPoints` and standfirst | consume, but pass every copy prop explicitly; verify no Property string survives in the rendered DOM |
| `design/primitives/FaqSection.tsx` | Radix collapsible; closed answers are NOT in the server HTML and answers render as ESCAPED TEXT | **DO NOT ADOPT BLINDLY.** Dentists renders FAQ answers with `dangerouslySetInnerHTML` (`BlogPostRenderer.tsx:299`), so real HTML in an answer would be escaped by the kit. Count the affected answers first; on Solicitors this was the difference between a safe adoption and stripping 196 posts. Falls to phase 2. |
| `design/marketing/StatsCounter.tsx` | Property runs its OWN copy at `Property/web/src/components/property/StatsCounter.tsx` | irrelevant to Dentists, but do not claim an estate-wide fix from editing the kit one (T5) |

---

## E. WHERE DENTISTS' BRAND IDENTITY IS DEFINED

| Place | What it sets | file:line |
|---|---|---|
| `Dentists/niche.config.json` | `display_name`, `tagline`, `description`, `domain`, `brand.primary_color`, `brand.logo_path`, `brand.publisher_logo_url`, `seo.theme_color`, nav, footer links, CTA copy, lead-form copy | `:2-24`, `:130` |
| `Dentists/web/src/app/globals.css` | the actual rendered palette: navy + gold + neutrals | `:11-50` |
| `Dentists/web/src/components/ui/layout-utils.ts` | `btnPrimary` (gold ground, navy label), `btnSecondary`, `btnOnDark`, `focusRing` (gold outline) | whole file, 29 lines |
| `Dentists/web/src/components/brand/BrandWordmarkHomeLink.tsx` | the wordmark lockup, "DENTAL FINANCE / PARTNERS" | 41 lines |
| `Dentists/web/src/components/brand/BrandLogoHero.tsx` | hero-size variant of the same lockup | 26 lines |
| `Dentists/web/src/app/api/og/route.tsx:7` | `BRAND_COLOR = "#2563eb"` | **blue** |
| `Dentists/web/src/app/blog/[category]/[slug]/opengraph-image.tsx:44,96` | `backgroundColor: "#2563eb"` | **blue** |
| `Dentists/web/src/config/site.ts` | derived `siteConfig` (name, url, nav, footer, company) | — |

### E.1 The `#2563eb` inconsistency — CONFIRMED, and worse than stated

The brief asked whether `niche.config.json brand.primary_color: "#2563eb"` conflicts with the
navy+gold in `globals.css`. Both halves need correcting:

1. **`brand.primary_color` is never consumed for rendering anywhere.** It is typed at
   `src/config/niche-loader.ts:26` and validated non-empty at
   `packages/web-shared/lib/niche-config.ts:211`. That is its only reach. Changing it alone would
   change nothing on screen. So it is not, by itself, "rendering blue".
2. **Blue IS rendered, from two other places.** `#2563eb` is hardcoded a second and third time in
   the OG image generators: `api/og/route.tsx:7` and
   `blog/[category]/[slug]/opengraph-image.tsx:44,96`. Those produce the social share card for
   **all 223 blog posts** plus the generic OG route. So every time a Dentists article is shared on
   social or in a chat client, it renders a **blue** accent that appears nowhere on the site.
3. `seo.theme_color` is `#001B3D` (navy) and IS consumed, at `layout.tsx:34`. So the browser
   chrome is navy while the share card is blue.

Disposition: `brand.primary_color` → set to the chosen brand hex in phase 1 (config hygiene, no
render change). The two OG generators → **PORT in phase 6** onto the ramp; they are a real
brand defect, not design work, and belong in STATE.md as such.

---

## F. BLOG SUBSYSTEM

### F.1 `src/components/blog/BlogPostRenderer.tsx` (369 lines) — renders 223 pages

Current order: `ReadingProgress` (from `web-shared/content`, NOT the design kit) → JSON-LD
(`post.schema` verbatim or `buildBlogPostingJsonLd`) → **420/480/520px photo hero** with
`blur-[2px]` + triple navy scrim, holding Breadcrumb, gold category eyebrow, h1, meta line →
photo-credit block → article grid `max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px]`
→ author + "figures checked" block → keyTakeaways box (gold `border-l-4`) → mobile TOC →
`.article-body.prose-blog` with the 3-moment split (PremiumUpgrade island → optional
`AssociateIncorporationWorkedExamples` → `GateOrForm` → remainder; else `InlineMiniLeadForm` at
mid-scroll) → hand-rolled `<dl>` FAQ → author aside → `NextStepOffer` → closing CTA card +
`LeadForm` → related-articles list → sticky sidebar (TOC only).

| Disposition | **PORT (rewrite in place)** | Phase 2 |
|---|---|---|

| # | Change | Reason | Reference |
|---|---|---|---|
| 1 | Photo hero → HEADER CARD `rounded-xl bg-slate-50 p-8`, Eyebrow + h1 + meta pills + summary; `post.image` becomes an in-body figure | 520px of viewport before a word of the answer, and an LCP image that is deliberately blurred. Photo credit retires with the hero. | `Property/web/src/components/blog/BlogPostRenderer.tsx` (418) |
| 2 | Closing CTA block gets `id="enquiry-form"`, `scroll-mt-24`, `aria-labelledby` | `:314-327` has NO id, NO scroll offset, NO aria, and ONE generic CTA for all 12 categories | Property's `#enquiry-form` |
| 3 | Add a skip link `data-cta="blog_skip_to_form"` → `#enquiry-form` | no in-page path to the form exists today | Property |
| 4 | **CTA heading `text-[var(--gold)]` → ramp** (`:318`) | 2.78:1 on 223 pages | §B.2 |
| 5 | Per-category CTA copy map keyed on `slugifyCategory` output, 12 keys, guard test asserts coverage | one generic ask across 12 very different intents | Property resolves this inline in its renderer and passes it to `BlogSidebarCta.tsx`; there is no standalone map file to copy — write one |
| 6 | Sidebar: ONE `sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto` wrapper holding a net-new `BlogSidebarCta` then the TOC | sidebar is TOC-only and unclamped (`:358-362`) | kit `design/blog/BlogSidebarCta.tsx` + `TableOfContents.tsx` |
| 7 | Hand-rolled `<dl>` FAQ → kit `FaqSection`, **only after the escaping check in §D** | answers use `dangerouslySetInnerHTML` (`:299`) | — |
| 8 | Related list → kit `RelatedArticles` | bespoke `border-l-4` rows (`:336-355`) | kit |
| 9 | keyTakeaways box KEPT VERBATIM, restyled | it is the GEO/answer-box surface | — |
| 10 | Author aside: **broken class stack.** `:302` is `hidden sm:block shrink-0 ... flex items-center justify-center` — `block` wins, `flex` is dead, the icon is not centred | live defect | — |
| 11 | `TableOfContents` / `ReadingProgress` imports move from `web-shared/content/*` to `design/blog/*` | the design kit versions are the standard ones | `packages/web-shared/design/blog/` |
| 12 | 3-moment capture split (`splitContentEarly` / `splitRemainderForGate` / `splitContentAtMidScroll`) | **KEEP THE LOGIC EXACTLY.** Restyle only. This is the site's live capture architecture and it is ahead of Property's. | — |
| 13 | `NextStepOffer` (`:313`) sits immediately before the closing form | second closing offer stacked on the first. GATE 4: keep restyled, or retire. | — |

### F.2 `src/app/blog/[category]/[slug]/page.tsx` (77 lines)

Data-only wrapper: resolves post, related, renders `BlogPostRenderer`.
| Disposition | **LEAVE** (no design surface) | — |

`opengraph-image.tsx` in the same folder: see §E.1. Phase 6.

### F.3 `src/app/blog/page.tsx` (92 lines) — the index

Renders inside `contentNarrow` (max-w-3xl): Breadcrumb → `font-serif` h1 → standfirst with one
inline link → "Comprehensive Guides by Topic" 12-card category grid → "All Articles" +
`BlogListWithSearch`.

| Disposition | **PORT** | Phase 2 |
|---|---|---|

- **PAYLOAD DEFECT:** `:31-34` does `posts.map(p => ({...p, categorySlug}))` and hands the result
  to `BlogListWithSearch`, which is `"use client"` (`:1`). That ships the full `contentHtml` of
  **all 223 posts** into the browser bundle on the index. PROJECT to
  `{slug,title,summary,category,categorySlug,date,readTime}`. Same defect, same fix, as generalist.
- `contentNarrow` (max-w-3xl) is wrong for a 3-column card grid; the hub container is `siteContainerLg`.
- Navy motif index hero replaces the bare h1.
- **Zero capture surface** on the site's second-highest-traffic route. Add a net-new
  `#book` `LeadCTAPanel`. In-flow closing panel, not interruptive, no gate needed.
- Add `CollectionPage` + `BreadcrumbList` JSON-LD (none today).
- 48px `rounded-xl` chips for the category rail; current cards are `min-h-[120px]` and heavy.
- "View guide" chip is `text-[var(--gold)]` on white: 2.78:1.

### F.4 `src/app/blog/[category]/page.tsx` (181 lines) — 7 derived hubs

Renders: JSON-LD (BreadcrumbList + CollectionPage) → navy-free hero band (eyebrow, `font-serif`
h1, count sentence) → sibling category strip → `BlogListWithSearch`.

| Disposition | **PORT** to kit `BlogCategoryHub` | Phase 2 |
|---|---|---|

- **INTERNAL-LINK DEFECT:** `:88` builds the sibling strip as
  `categories.filter(c => !STATIC_HUB_SLUGS.has(c.slug))`, so the 7 derived hubs link to each
  other and **never to the 5 static hubs**. 7 pages x 5 missing links. Fix by listing all 12.
- Same `{...p}` full-`contentHtml` payload defect as the index (`:80`).
- Zero capture surface → net-new `#enquiry-form` `LeadCTAPanel` with the §F.1 category copy map,
  so hub and post always agree.
- The category filter uses `slugifyCategory(p.category) === category` (`:79`), which is the
  correct slug-keyed comparison, not raw-label equality. **The Solicitors/Property hub-filter bug
  does not exist here.** Do not "fix" it. Add the guard test that every post lands in exactly one
  hub anyway; `content/blog` carries case variants of 6 labels (e.g. "Associate Tax" and
  "Associate tax") that currently merge correctly only because `slugifyCategory` lowercases.

### F.5 The 5 static hub pages

`src/app/blog/{associate-tax,buying-a-practice,practice-accounting,practice-finance,vat-and-compliance}/page.tsx`
(190, and comparable). Each is a hand-written editorial hub: JSON-LD → `border-l-4` header →
4-5 hand-written `<section>` briefings → related-articles list → closing CTA card + `LeadForm`.

| Disposition | **PORT, and CONVERGE onto the same `BlogCategoryHub`** | Phase 2 |
|---|---|---|

These five are the "essentials briefing" that the 7 derived hubs lack. Do not delete the prose:
lift each page's hand-written sections into the hub component's briefing slot, so all 12 hubs
render the same anatomy and 7 of them gain a briefing (a content deliverable for phase 2:
7 hubs x 3-4 ruled sections, FT-plain, second person, every figure re-derivable from
`docs/dentists/house_positions.md`).
Retire the duplicated `STATIC_HUB_SLUGS` guard machinery (`[category]/page.tsx:24-39,68-70`) only
if the convergence removes the five files; that is a routing change, so it is GATE 5.

### F.6 `src/components/blog/BlogListWithSearch.tsx` (205 lines, client)

| Disposition | **PORT** to kit `design/blog/BlogListWithSearch` + `HubArticleList` + `NumberedPagination`, projected items only | Phase 2 |

### F.7 `src/components/ui/Breadcrumb.tsx` (84 lines, local)

| Disposition | **RETIRE** into kit `design/primitives/Breadcrumb` | Phase 2 |
Watch for double `BreadcrumbList` emission: `[category]/page.tsx` emits the JSON-LD itself
(`:93-101`) AND renders `<Breadcrumb>`. The kit component emits the schema, so drop the
page-level copy. Same check on every page that does both.

### F.8 `src/components/blog/ExitIntentModal.tsx` (176 lines)

Already unmounted; `PageShell.tsx:4-5` says it is kept on disk for revert, and `SpecialistWidget`
subsumes it.
| Disposition | **RETIRE (delete the file)** | Phase 6 |
Zero risk: nothing imports it (`grep -rn ExitIntentModal src` hits only the PageShell comment).
Do NOT rebuild it; it is an interruptive surface and would need an owner gate.

---

## G. KIT-VS-LOCAL SOURCING (slice 1)

Property's chrome, blog components and templates are all **LOCAL** to `Property/web`; Property
imports **none** of `packages/web-shared/design/`. So for every row above, "the Property
reference" means Property's local file as the DESIGN reference, while the kit file is what
Dentists actually imports. Do not conflate them.

**KIT (consume):** `chrome/PageShell`, `chrome/SiteHeader`, `chrome/SiteFooter`, `chrome/nav`,
`blog/BlogCategoryHub`, `blog/BlogListWithSearch`, `blog/HubArticleList`, `blog/BlogSidebarCta`,
`blog/TableOfContents`, `blog/ReadingProgress`, `blog/RelatedArticles`,
`primitives/Breadcrumb`, `primitives/EyebrowRule`, `primitives/NumberedPagination`,
`primitives/page-blocks`, `primitives/ExampleFigureNote`, `marketing/LeadCTAPanel`,
`marketing/StatsCounter`, and the four guard tests in `design/guards/`.
**KIT, conditional:** `primitives/FaqSection` (escaping check first, §D).
**LOCAL build:** `BlogPostRenderer` rewrite, `DentistsBackdrop` (from `.hero-brand`),
per-category CTA copy map, sister-site footer block.
**LOCAL keep:** `StickyCTA` (intent-personalised), `LeadForm`, `GateOrForm`, `PremiumUpgrade`,
`InlineMiniLeadForm`, `ConsentToggle`, `IntentProvider`, `ReturningBar`, `DeepScrollModal`,
`SpecialistWidget`.
**LOCAL retire:** `BrandWordmarkHomeLink`, `BrandLogoHero`, `ui/Breadcrumb`,
`blog/ExitIntentModal`, `ui/CTASection`, and ONE of the two duplicate `CalcResultCta` files
(`components/calculators/CalcResultCta.tsx` 28 lines and `components/tools/CalcResultCta.tsx`
27 lines both exist — see Slice 2).

---

## H. DEPENDENCY CLOSURE (T24) — BLOCKS PHASE 1

`Dentists/web/package.json` declares 7 runtime dependencies. It does **not** declare
`lucide-react`. The kit `SiteHeader`/`SiteFooter` take an icon COMPONENT as a prop, and both
existing consumers pass a lucide icon; `lucide-react` is currently present only because sibling
sites hoisted it to the root `node_modules`. **It builds locally and fails on a clean install.**
This is the exact shape that made the estate undeployable for nine days.

RULE: the phase-1 commit that adds the icon also adds `"lucide-react": "^1.17.0"` to
`Dentists/web/package.json`, and `python scripts/check_dependency_closure.py` is an acceptance
test in every builder brief, not just the pre-deploy gate.

Related, found in the same check: `@tailwindcss/typography` is **not installed anywhere in the
monorepo**, and `src/app/resources/[topic]/page.tsx:117` uses `prose prose-slate
prose-headings:* prose-a:*`. Those classes are no-ops today. See Slice 2.

---

## I. SLICE 1 OWNER GATES

1. **Wordmark icon.** The kit header needs an icon; Dentists has never had one.
2. **Sister-site footer block.** Keep it (recommend), or drop it. Two followed outbound links on
   every page; it is an estate cross-link, not a third-party credit.
3. **Brand ramp + warning ramp.** Recommend navy ramp, gold as a fixed accent, warning ladder
   violet/fuchsia/red. §B.3.
4. **`NextStepOffer` on articles.** Keep restyled, or retire the second closing offer.
5. **Converging the 5 static hubs onto the derived hub template.** Content is preserved either
   way; the question is whether 5 route files disappear. Routing change, so owner decides.
