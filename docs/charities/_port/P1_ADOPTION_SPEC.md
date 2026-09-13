# charities phase 1 — kit chrome adoption spec

Written 2026-09-13. **Read-only research. This document changes no code.**
Companion to `PHASE_PLAN.md` §1.1 and §5 (phase 1 packages P1-1 … P1-6).
Every claim below carries the `file:line` (or byte offset) that proves it.

Verification surface: post-fix production build of `charities` served at
`http://localhost:3119`, stylesheet `/_next/static/css/b34f0735f5a02135.css`
(46,359 bytes, **1 line**).

---

## 1. The kit components' real API

### 1.1 `SiteHeader` — `packages/web-shared/design/chrome/SiteHeader.tsx`

Props type at `:48-104`; destructured defaults at `:341-354`.

| Prop | Type | Required | Default | What the default renders | Property literal? |
|---|---|---|---|---|---|
| `nav` | `NavItem[]` | no | `undefined` | falls through to `fallbackNav`, then `[]` (`:358`) — header with wordmark + CTAs, no nav links | no |
| `fallbackNav` | `NavItem[]` | no | `undefined` | used only when `nav` omitted (`:52-56`, `:358`) | no |
| `ctaPrimary` | `NavCta` = `{label,href}` (`:22`) | **YES** | — | desktop + drawer primary button (`:461-477`, `:605-618`) | — |
| `ctaSecondary` | `NavCta` | no | `undefined` | xl-only secondary link is not rendered at all (`:436-459`) | no |
| `ctaVariant` | `string` | no | `undefined` | `data-cta-variant` attribute omitted; **no render effect** (`:60`, `:444`, `:472`, `:614`) | no |
| `ctaIds` | `HeaderCtaIds` (`:33-40`) | no | `{}` merged over `DEFAULT_CTA_IDS` (`:42-46`, `:355`) | `data-cta` = `header_book` / `header_book_mobile` / `header_contact` | **YES — Property's canonical ids** |
| `ctaContactGoal` | `string` | no | **`"form"`** (`:349`) | `data-cta-goal="form"` on any header CTA whose href starts `/contact` (`:443`, `:471`, `:613`) | **YES** |
| `ctaMobilePlacement` | `string` | no | **`"mobile_menu"`** (`:350`) | `data-cta-placement` on the **drawer** CTA (`:612`) | **YES** |
| `wordmarkIcon` | `WordmarkIcon` (`:14-20`) | **YES** | — | icon in header lockup (`:130-138`) and forwarded nowhere else | — |
| `wordmarkTop` | `string` | **YES** | — | upper lockup line (`:140-142`) | — |
| `wordmarkBottom` | `string` | **YES** | — | lower lockup line (`:147-149`) | — |
| `wordmarkAccentColor` | `string` (CSS colour) | no | `undefined` | icon `text-primary-600` + rule `bg-primary-600` keep the **ramp step** (`:134`, `:136`, `:145`, `:146`) | **effectively yes** — it inherits whatever the site's `--color-primary-600` is |

Other fixed behaviour worth knowing: the header is a click-toggled dropdown
(`:187-201` rationale), locks `document.documentElement.style.overflow` while the
drawer is open (`:376`), and hides any nav item equal to the secondary CTA href at
`xl` (`:424`).

### 1.2 `SiteFooter` — `packages/web-shared/design/chrome/SiteFooter.tsx`

Props type at `:7-66`; destructured defaults at `:116-133`.

| Prop | Type | Required | Default | What the default renders | Property literal? |
|---|---|---|---|---|---|
| `nav` | `NavItem[]` | no | `undefined` → `fallbackNav` → `[]` (`:135`) | link columns derived from nav (`:88-114`) | no |
| `fallbackNav` | `NavItem[]` | no | `undefined` | — | no |
| `description` | `string` | **YES** | — | brand-column paragraph (`:161-163`) | — |
| `footerLinks` | `{label,href}[]` | **YES** | — | legal/secondary row (`:198-208`) | — |
| `legalDisclosure` | `string` | **YES** | — | `:231-233` | — |
| `legalName` | `string` | **YES** | — | `© YEAR {legalName} t/a {tradingName}.` (`:236`) | — |
| `tradingName` | `string` | **YES** | — | same line (`:236`) | — |
| `wordmarkIcon` / `wordmarkTop` / `wordmarkBottom` | — | **YES** | — | dark-ground lockup, icon + rule pinned to `primary-400` (`:150`, `:155`) — **not** overridable, deliberately (`:95-101` in SiteHeader) | — |
| `backdrop` | `ReactNode` | no | `undefined` | no motif layer (`:139`) | no |
| `consentToggle` | `ReactNode` | **YES** | — | rendered in the copyright row (`:239`) | — |
| `newsletterSlot` | `ReactNode` | no | `null` (`:129`) | nothing | no |
| `resourcesHref` | `string` | no | **`"/landlord-tax"`** (`:80`, `:130`) | "Resources" column derived from that nav item's children | **YES — Property's hub** |
| `companyItems` | `{label,href}[]` | no | **About / Contact / Locations / Book a consultation** (`:81-86`, `:131`) | four links, `/locations` included | **YES — Property's routes** |
| `showBuilderCredit` | `boolean` | no | **`true`** (`:132`) | followed outbound link to `doublewiredcreative.com` (`:217-229`) | **YES**, and per owner ruling 2026-09-11 that is now the estate-wide intent |

Column derivation (`:88-114`): `Services` = children of `/services`; `Resources` =
children of `resourcesHref`; `Calculators` = first item of each of up to 5 groups on
the `/calculators` nav item, plus "All calculators"; `Company` = `companyItems`.
Empty columns are dropped (`:113`).

### 1.3 `PageShell` — `packages/web-shared/design/chrome/PageShell.tsx` (48 lines)

That is the real path. Props (`:9-20`): `children`, `nav?`, `header`
(`Omit<SiteHeaderProps,"nav">`), `footer` (`Omit<SiteFooterProps,"nav">`). It is
`"use client"` (`:1`) and reads `usePathname()` (`:23`). Behaviour: renders
`{children}` **bare** on `/embed/` prefixed paths (`:29-31`), otherwise skip link +
`SiteHeader` + `<main id="main">` + `SiteFooter` (`:33-46`). The single `nav` prop is
forwarded to **both** header and footer (`:41`, `:45`).

### 1.4 Playbook §8 item 11 cross-check (`docs/_engines/DESIGN_PORT_PLAYBOOK.md:479-510`)

| Playbook says | Source says | Verdict |
|---|---|---|
| `SiteHeader.ctaContactGoal` default `"form"` | `SiteHeader.tsx:349` | **correct** |
| `SiteHeader.ctaMobilePlacement` default `"mobile_menu"` | `SiteHeader.tsx:350` | **correct** |
| `SiteFooter.showBuilderCredit` default `true` | `SiteFooter.tsx:132` | **correct** |
| `SiteHeader.wordmarkAccentColor` default undefined → `primary-600`, footer out of scope | `SiteHeader.tsx:103`, `:134`, `:145`; footer pinned `primary-400` `SiteFooter.tsx:150` | **correct** |
| "**the two** kit-chrome props that must be passed on every port" | the list under it has **six** entries | wording stale, harmless |
| — | **`SiteFooter.resourcesHref` defaults to Property's `/landlord-tax`** | **MISSING from §8.11.** A ported site that passes nothing silently derives its Resources column from a route it does not have |
| — | **`SiteFooter.companyItems` defaults to Property's four routes incl. `/locations`** | **MISSING from §8.11.** On charities `/locations` is a **404** (probed at `:3119`) — see §7 R-C3 |
| — | `SiteHeader.ctaIds` defaults to Property's three `data-cta` ids | not listed as a must-pass; benign on charities (no history), but it is a Property literal |

---

## 2. What charities must pass

Pre-port CTA facts: `grep -rl data-cta charities/web/src` returns **one** file,
`src/app/thank-you/page.tsx:107-108` (`data-cta="thankyou-return-article"`,
`data-cta-placement="thank_you"`), rendered only behind a `return` query param.
`sweep_baseline.json` records **0 rendered CTAs across 66 URLs**. So: no header goal
or placement to preserve, and no `vw_cta_performance` series to split.

### 2.1 Header

| Prop | Value charities passes | One-line reason |
|---|---|---|
| `nav` | `buildPrimaryNav()` (§3) | server-built, so the tool registry never enters the client bundle |
| `ctaPrimary` | `{ label: "Get in touch", href: "/contact" }` | `niche.config.json` `cta.sticky_button` is already "Get in touch"; `/contact` is a live 200 and is the only route the goal below makes sense against |
| `ctaSecondary` | **omit** | site has no second header action today; adding one is IA authoring, not chrome adoption |
| `ctaVariant` | **omit** | attribute-only, no render effect, and there is no variant test running |
| `ctaIds` | **omit** (kit defaults) | no id history exists to preserve, so the kit's canonical ids are the cheapest consistent choice |
| `ctaContactGoal` | **`"contact"`** — pass explicitly | the port *introduces* this series rather than preserving one; explicit makes it a decision with a receipt instead of Property's `"form"` inherited by accident (matches `contractors-ir35/web/src/components/layout/SiteHeader.tsx:66`) |
| `ctaMobilePlacement` | **`"header_mobile"`** — pass explicitly | same; and it is the easiest to miss because the drawer never appears in an SSR crawl (`SiteHeader.tsx:612`) |
| `wordmarkIcon` | owner/manager pick (lucide) | kit type requires a component; none exists on this site today |
| `wordmarkTop` / `wordmarkBottom` | `"TRUSTEE TAX"` / e.g. `"CHARITY ACCOUNTANTS"` | display name is **Trustee Tax** (`charities/niche.config.json` `display_name`) |
| `wordmarkAccentColor` | **do not pass in phase 1; measure, then pass `#1a5c4a` if the wordmark and the CTA render different greens** | `#1a5c4a` is not a Tailwind ramp step, so whether it differs from the site's own `--color-primary-600` depends on how P1-1 mints the ramp — a measurement, not a guess (PHASE_PLAN §1.1) |

Brand note: `#1a5c4a` measures **7.85** on white, so it clears the 3:1 graphic floor,
the 4.5:1 text-on-white floor and works as a ground under white text. Therefore
**do not define `--brand-primary-text` or `--brand-primary-ground`** — the single-hex
case Medical needed them for does not exist here. Both already resolve via
`--brand-primary` at `charities/web/src/app/globals.css:14-16`.

### 2.2 Footer

| Prop | Value | Reason |
|---|---|---|
| `description` | `siteConfig.description` | same string the local footer prints today (`SiteFooter.tsx:16`) |
| `footerLinks` | `siteConfig.footer` = the 5 `footer_links` (Contact, Blog, Privacy Policy, Cookie Policy, Terms) | preserves the link floor exactly; the local footer splits the same array into two columns (`SiteFooter.tsx:29`, `:44`) |
| `legalDisclosure` / `legalName` / `tradingName` | `siteConfig.company.*` | identical bindings to the local footer (`:60`, `:64`) |
| `consentToggle` | `<ConsentToggle className="text-xs text-slate-400 hover:text-white transition-colors underline hover:no-underline inline-block py-1" />` | **mandatory** — the mount survives the swap (§6); the class is re-grounded for slate-900 |
| `resourcesHref` | **pass `"/guides"`** | kit default is Property's `/landlord-tax`, which this site does not have; `/guides` is charities' resources hub (200 at `:3119`) |
| `companyItems` | **pass `[{About,/about},{Contact,/contact},{Book a consultation,/book}]`** | the kit default includes `/locations`, which **404s** on charities |
| `showBuilderCredit` | **pass nothing** | default `true` is the owner's 2026-09-11 ruling; do not reintroduce a `false` "fix" (`contractors-ir35/web/src/components/layout/SiteFooter.tsx:86-96`) |
| `nav` | forwarded by PageShell | columns mirror the header |
| `backdrop` / `newsletterSlot` | omit | no motif, no footer newsletter on this site |
| `wordmark*` | same three values as the header | one lockup, two grounds |

---

## 3. Navigation derivation

`buildPrimaryNav` exists twice: the shared pure function
`packages/web-shared/design/chrome/nav.ts:39-41` (takes `nav` + `calculatorGroups`,
attaches `groups` to the item whose `href === "/calculators"`), and a **per-site
`src/lib/nav.ts` wrapper** that supplies both arguments. The canonical wrapper is
`generalist/web/src/lib/nav.ts:28-40`: `calculatorNavGroups()` walks `allTools()` from
the site's own tool registry, buckets by `tool.category` in **registry order, first
appearance wins**, and `buildPrimaryNav()` calls the shared function with
`niche.navigation` and those groups. Siblings: `Medical/web/src/lib/nav.ts:60`,
`Solicitors/web/src/lib/nav.ts:53` (reads `getActiveNav(niche)` instead of raw
`niche.navigation`), `Dentists/web/src/lib/nav.ts:87`. Every one is called
server-side in `layout.tsx` and passed down as a prop:
`generalist/web/src/app/layout.tsx:120`, `Medical:111`, `Dentists:98`, `Solicitors:108`.

charities has **no `src/lib/nav.ts`** (`ls charities/web/src/lib`) — P1-2 creates it.
Inputs available today: `charities/niche.config.json` `navigation` (7 items) and
`charities/web/src/lib/calculators/registry.ts:19-28` (3 tools, `toolPath` →
`/calculators/<slug>` via `packages/web-shared/tools/registry-helpers.ts:31`).

Expected `buildPrimaryNav()` output for charities:

```ts
[
  { label: "Services",     href: "/services" },
  { label: "Calculators",  href: "/calculators", groups: [
      { category: "Gift Aid", items: [
          { label: "Gift Aid Calculator",  href: "/calculators/gift-aid-calculator" },
          { label: "GASDS Small Donations Calculator",
            href: "/calculators/gasds-small-donations-calculator" },
        ] },
      { category: "Accounts & Scrutiny", items: [
          { label: "Independent Examination vs Audit Checker",
            href: "/calculators/independent-examination-vs-audit-checker" },
        ] },
    ] },
  { label: "Guides",   href: "/guides" },
  { label: "Research", href: "/research/uk-small-charity-finance-index" },
  { label: "Blog",     href: "/blog" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
]
```

Category order follows registry order (`registry.ts:20-22`: gift-aid →
independent-examination → gasds), so "Gift Aid" appears first and GASDS joins it.
Slugs per `tools/gift-aid-calculator.ts:7`, `tools/gasds-calculator.ts:7`,
`tools/independent-examination-audit-checker.ts:6`.

**Consequent footer columns** (`SiteFooter.tsx:105-113`), with the §2.2 overrides:

| Column | Items | Note |
|---|---|---|
| Services | — | `/services` nav item has no `children`; column **dropped** by `:113` |
| Resources | children of `/guides` | also empty unless P1-2 authors children; **dropped** if empty. Passing `resourcesHref="/guides"` costs nothing and is right the moment children exist |
| Calculators | Gift Aid Calculator, Independent Examination vs Audit Checker, All calculators | group heads (`:103`) + the fixed tail (`:110`) |
| Company | About, Contact, Book a consultation | **only** with the `companyItems` override; the default adds a 404 |

Grouping the flat 7-item nav into dropdowns is IA authoring, not phase-1 chrome work.

---

## 4. The `@source` prerequisite

`charities/web/src/app/globals.css:2` is `@import "tailwindcss" source("..")`, which
narrows the scan to `src/`. `packages/web-shared` resolves through a workspace symlink
under `node_modules`, which Tailwind skips by default. There is no `@source` line in
the file (23 lines total). Proof it bites today: the shipped bundle contains **zero**
`primary-600` occurrences (`curl … | grep -o primary-600 | wc -l` → `0`), and
`btnPrimary` paints `bg-[var(--btn-ground,var(--color-primary-600))]`
(`packages/web-shared/design/layout-utils.ts:30`).

Exact line and position — **line 3, immediately after the `@import`**:

```css
@source "../../../../packages/web-shared";
```

Four `..` because `src/app/globals.css` → `src` → `web` → `charities` → repo root.
Identical line and position on every ported site:
`generalist/web/src/app/globals.css:3`, `Dentists:3`, `Medical:3`, `Solicitors:3`,
`Property:3`, `construction-cis:3`, and `contractors-ir35:10` (same line, pushed down
by a 7-line explanatory comment, `globals.css:3-9`).

Post-adoption verification command (run against the **built** stylesheet, not the
source):

```bash
CSS=$(curl -s http://localhost:3119/ | grep -o '/_next/static/css/[^"]*\.css' | head -1)
curl -s "http://localhost:3119$CSS" | grep -o 'var(--color-primary-600)' | wc -l   # must be > 0
```

`grep -c` is wrong here: the production stylesheet is **one line** (46,359 bytes,
`awk 'END{print NR}'` → `1`), so `grep -c` can only ever return `0` or `1` and cannot
distinguish "one kit rule compiled" from "the whole kit compiled". Use
`grep -o … | wc -l`.

---

## 5. The header CTA cascade race

**Mechanism.** `SiteHeader.tsx:473` composes
`` `${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex` ``
and `btnPrimary` itself **opens with `inline-flex`**
(`packages/web-shared/design/layout-utils.ts:30`). The element therefore carries
`hidden` and `inline-flex` as two unmodified, equal-specificity utilities, and the
winner is decided by source order in the built stylesheet.

**Verified in byte order, in built stylesheets** (`grep -bo`):

| Built stylesheet | `.hidden{` | `.inline-flex{` | Winner |
|---|---|---|---|
| `contractors-ir35/web/.next/static/css/20caeb7298272b4f.css` | 17520 | 17599 | `.inline-flex` |
| `Dentists/web/.next/static/css/47e5c3a7f0ed19c3.css` | 13784 | 13863 | `.inline-flex` |
| charities `/_next/static/css/b34f0735f5a02135.css` (live at `:3119`) | 10836 | 10915 | `.inline-flex` |

`.inline-flex` is emitted **after** `.hidden` in every case, including charities' own
pre-port bundle, so `hidden` is a dead no-op and the header CTA renders alongside the
burger from 0 to 1023px. `lg:inline-flex` is redundant. Reading the class string
cannot tell you this; only the computed `display` or the byte order can.

**The site-local fix `contractors-ir35` carries**, quoted verbatim from
`contractors-ir35/web/src/app/globals.css:458-492` (comment abridged to its load-bearing
lines, rule block exact):

```css
/* ============================================================
   HEADER PRIMARY CTA VISIBILITY (P1-9)
   The kit header composes `${btnPrimary} hidden ... lg:inline-flex` on the
   desktop primary CTA. `btnPrimary` itself OPENS with `inline-flex`, so the
   element carries both `hidden` and `inline-flex` as unmodified, equal
   specificity utilities, and Tailwind emits `.hidden` BEFORE `.inline-flex`
   (verified: bytes 14873 vs 14952 of the built stylesheet).
   ...
   LAYERED deliberately: this sits inside `@layer utilities`, so it is NOT a
   fourth unlayered block and does not out-rank arbitrary Tailwind utilities.
   Inside the layer it wins on specificity alone (0,2,2 vs 0,1,0).
   ============================================================ */
@layer utilities {
  header a[data-cta-placement="header"][data-cta="header_book"] {
    display: none;
  }

  @media (min-width: 64rem) {
    header a[data-cta-placement="header"][data-cta="header_book"] {
      display: inline-flex;
    }
  }
}
```

**What charities should do.** Land the same rule, byte-for-byte, in
`src/app/globals.css` as part of P1-1, because charities adopts the kit header net new
and would otherwise ship the defect on day one. It is valid unchanged **only if
charities leaves `ctaIds` at the kit default** (§2.1), since the selector keys on
`data-cta="header_book"` (`SiteHeader.tsx:469`, `:470`). It does not touch
`packages/web-shared/`, so trap 12 and the open owner decision are untouched. The
drawer CTA is unaffected: it carries `data-cta-placement="header_mobile"` under §2.1's
value (`SiteHeader.tsx:612`), never `"header"`.

Check that catches a regression: render at 768px and 1024px and assert the CTA's
**computed** `display` is `none` then `inline-flex`. Never assert the class string.

---

## 6. Local footer vs kit footer — what must survive the swap

Source: `charities/web/src/components/layout/SiteFooter.tsx` (78 lines), mounted at
`charities/web/src/app/layout.tsx:99` (outside any `PageShell`, because none exists).

| Behaviour | Local, at | Kit equivalent | Verdict |
|---|---|---|---|
| **`ConsentToggle` mount** — the site's only analytics opt-out control, `posture="opt-out"` at `layout.tsx:94` means this button is the **entire** opt-out mechanism | `:4`, `:72` | `consentToggle` prop, rendered `SiteFooter.tsx:239` | **MUST survive.** Pass the element; a missing prop is a TS error, a wrong one is a silent legal regression |
| Legal disclosure paragraph | `:59-61` | `legalDisclosure` prop `:231-233` | survives |
| `© YEAR legalName t/a tradingName.` | `:63-65` | `:236` | survives, identical shape |
| 5 `footer_links` as two link columns | `:29`, `:44` | `footerLinks` single legal row `:198-208` | links survive; **layout changes** (one row, not two columns) — expected, record it |
| "Contact us" inline link to `/contact` | `:17-24` | not reproduced | `/contact` is in `footer_links` **and** in `companyItems`, so the link floor holds; the styled call-out does not survive |
| **Identity line "Specialist charity accountants. Editorial content only. Speak to us for advice specific to your organisation."** | `:66-69` | **no kit slot** | **AT RISK.** The kit has `description`, `legalDisclosure`, `footerLinks` and nothing else free. Cheapest survival: append it to the `legalDisclosure` string (a `siteConfig` change, P1-3 lease boundary) or accept its loss as an owner-visible copy decision. **Do not drop it silently** — it is the site's editorial-scope disclaimer |
| Site name as plain text heading | `:15` | replaced by the wordmark lockup `:144-160` | intentional change |
| Light ground `#fafaf9`, neutral palette | `:11` | `bg-slate-900` dark ground `:138` | intentional change; every passed slot must be re-grounded for dark (notably `consentToggle`'s className) |
| — | — | **followed outbound link to `doublewiredcreative.com`** `:217-229` | **NEW.** First outbound link this site has ever carried; expected per owner ruling, flagged so nobody refiles it |
| — | — | nav-derived link columns `:88-114` | **NEW** links — a link-floor *increase*, and the `/locations` 404 risk of §2.2 |

Nothing else in the local footer touches analytics, consent or legal.

---

## 7. Risks specific to charities, and the check that catches each

Numbered `R-Cn` so they do not collide with `PHASE_PLAN.md` §6.

| # | Risk | Why here | The check |
|---|---|---|---|
| R-C1 | **Missing `@source`** — kit classes compile to nothing, chrome ships unstyled, every test green | `globals.css:2` scans `src/` only; zero kit imports today so it has never bitten | §4 command; assert `var(--color-primary-600)` occurrences `> 0` with `grep -o … \| wc -l`, **not** `grep -c` |
| R-C2 | **No `primary-*` ramp exists** — even with `@source`, `bg-primary-600`, `text-primary-400`, `outline-primary-600` emit nothing; the header/footer render colourless | `globals.css` has **no `@theme` block at all** (23 lines); `layout-utils.ts:1-2` states each site must define `--color-primary-50..950` | after P1-1: the §4 grep **plus** a computed-style read of the header CTA's background at `:3119` |
| R-C3 | **`companyItems` / `resourcesHref` defaults inject Property routes** | `/locations` **404s** on charities (probed); `/landlord-tax` does not exist | `for p in /about /contact /book /locations; do curl -o /dev/null -w "%{http_code}" …; done` — assert every footer href returns 200 |
| R-C4 | **Tailwind v4 theme-variable collision** — a ramp declared on the existing plain `:root` generates **no** utilities while `var(--color-primary-600)` still resolves, so the two disagree silently | `globals.css:4-17` is an unlayered `:root` already holding `--background`, `--border`, `--muted`, `--surface` — adding ramp steps beside them is the obvious wrong move. Worked precedent: `contractors-ir35/web/src/app/globals.css:60-69` documents `--radius-xl` redeclared in a plain `:root` shadowing the layered theme default and shipping `rounded-xl` at 4px | assert **both** that the utility is in the bundle and that the variable resolves; never infer a v4 utility's value from a v3 hex table |
| R-C5 | **Unlayered rules beat every utility** | `globals.css` has **zero** `@layer` today: `:root` (`:4-17`) and `body` (`:19-23`) are both unlayered, so `body`'s `font-family`/`color` beat any `font-*`/`text-*` utility on `<body>` — exactly the defect `contractors-ir35/web/src/app/globals.css:163-171` records fixing | brace-depth walk (playbook §15 T30), then `awk '/^@layer/,/^}$/'` to confirm which selectors landed inside |
| R-C6 | **Header CTA cascade race** inherited net new | §5, verified in three built stylesheets | computed `display` at 768px and 1024px; the site-local `@layer utilities` block of §5 |
| R-C7 | **`--btn-radius` undeclared → every kit button is a 9999px pill** | `btnPrimary` reads `rounded-[var(--btn-radius,9999px)]`-style tokens via `layout-utils.ts:30`; charities declares no radius token and its own local `btnPrimary` (`src/components/ui/layout-utils.ts:18`) is **square** — the kit CTA would arrive as a pill next to square site buttons | read computed `border-radius` of the header CTA and of any in-page `btnPrimary`; they must agree |
| R-C8 | **`PageShell` is `"use client"` but `buildPrimaryNav()` imports the tool registry** | `PageShell.tsx:1`; `registry.ts:1-5` pulls every calculator's compute module | `nav` must be built in `layout.tsx` (server) and passed as a prop, as `generalist/web/src/app/layout.tsx:120` does; check the client bundle does not contain a calculator's compute source |
| R-C9 | **`/embed/` chrome gate semantics** | charities has `src/app/embed/`; the kit shell strips chrome on `/embed/` **with the trailing slash** and keeps it on the `/embed` gallery (`PageShell.tsx:25-31`) | curl `/embed` (chrome present) and `/embed/<slug>` (no `<header`, no `<footer`) |
| R-C10 | **The one pre-existing CTA triple must survive byte-identical** | `src/app/thank-you/page.tsx:107-108`, conditional on a `return` param so no crawl sees it | `curl '…/thank-you?return=/blog' \| grep -o 'data-cta[^ ]*'` before and after |
| R-C11 | **Two `layout-utils` modules with the same names, different values** | `src/components/ui/layout-utils.ts` (18 importers) and `packages/web-shared/design/layout-utils.ts` differ on `focusRing` (`outline-[#1a5c4a]` vs `outline-primary-600`), `sectionY`, `btnPrimary` | P1-4 must diff the two symbol-by-symbol before repointing any importer; assert no importer's rendered markup changes |
| R-C12 | **The kit header adds a sticky element over `#id` anchors** | charities has research and guide pages with in-page anchors and **no `scroll-margin-top` rule** (`globals.css` has none; contrast `contractors-ir35/web/src/app/globals.css:454-456`) | after P1-2, follow an in-page anchor and assert the target heading is not under the header |

---

## 8. Corrections to this task's brief

| Brief claim | Source | Verdict |
|---|---|---|
| "charities has **0 `data-cta` attributes anywhere on the site**" | `src/app/thank-you/page.tsx:107-108` | **FALSE as written.** Two attributes exist in source, conditional on a `return` param. 0 *rendered* across the 66 swept URLs. The conclusion the brief draws (no header goal/placement to preserve, no funnel history to split) still holds. Already recorded as C1 in `PHASE_PLAN.md:27` |
| "The playbook names `ctaContactGoal`, `ctaMobilePlacement`, `showBuilderCredit` and `wordmarkAccentColor`" | playbook `:479-510` | correct, and all four match source — but the playbook **omits** `SiteFooter.resourcesHref` and `SiteFooter.companyItems`, which are also Property literals and which **do** break on charities (`/locations` 404) |
| "`SiteFooter.tsx` mounts a `ConsentToggle` at line 72" | `:72` | **true** |
| "`globals.css` is 23 lines, `:root` and `body`, both unlayered" | `:1-23` | **true** |
| "no `@source` covering `packages/web-shared`" | `:1-23` | **true** |
| "`hidden` is a dead no-op" | three built stylesheets, §5 | **true**, verified in byte order |

### Could not determine

- **Whether the wordmark and the header CTA render two different greens.** That depends
  on how P1-1 mints `--color-primary-600` off `#1a5c4a`, which does not exist yet.
  Hence "measure, then decide" on `wordmarkAccentColor`.
- **Whether contractors-ir35's `@layer utilities` fix is live in a built bundle.** Its
  checked-in `.next` stylesheet predates the fix (`header a[data-cta-placement=…]` is
  absent from `20caeb7298272b4f.css`), and I was instructed not to build. The rule's
  specificity arithmetic (0,2,2 vs 0,1,0 inside the same layer) is sound on inspection,
  but the phase-1 reviewer should confirm it from a fresh charities build's computed
  `display`, not from this document.
- **The wordmark icon and lockup strings.** No brand mark or icon exists on this site
  (`PHASE_PLAN.md` §1 item 7: "Wordmark and motif: none today"); the kit type requires
  both, so this is an owner pick, not a builder default.
- **Armed `monitored_pages` rows for `charities`** — manager query, out of this
  read-only lease.
