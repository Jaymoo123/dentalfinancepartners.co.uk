# P1-C receipt — chrome (pharmacies phase 1)

Package: P1-C. Model: Opus. **No subagents launched. No build, no server, no git
state change.**

## Files touched (exactly the OWNS list)

| file | action |
|---|---|
| `pharmacies/web/src/components/layout/PageShell.tsx` | REWRITTEN — per-site wiring of the kit chrome shell |
| `pharmacies/web/src/app/layout.tsx` | chrome region only — added `primaryNav` const + `nav={primaryNav}` on the mount |
| `pharmacies/web/src/components/layout/SiteHeader.tsx` | **DELETED** (81 lines) |
| `pharmacies/web/src/components/layout/SiteFooter.tsx` | **DELETED** (56 lines) |
| `pharmacies/web/src/components/analytics/ConsentToggle.tsx` | **NEW** (byte-for-byte copy, md5 verified) |
| `pharmacies/web/src/components/ui/StickyCTA.tsx` | the two one-liners + the grey ramp, nothing else |

Nothing under `globals.css`, `layout-utils.ts`, `PharmaciesBackdrop.tsx`,
`src/tests/`, `src/lib/schema.ts`, `packages/**`, any `app/**/page.tsx` or
`niche.config.json` was touched.

## The PageShell approach

`"use client"` wrapper around
`@accounting-network/web-shared/design/chrome/PageShell`, built on
`hospitality/web/src/components/layout/PageShell.tsx`. Client by necessity: the
kit takes an icon COMPONENT (`wordmarkIcon`) and ReactNode slots
(`consentToggle`, `backdrop`), neither of which crosses the RSC boundary from a
server layout.

`nav` is built **server-side in `layout.tsx`** and passed as plain data:

```tsx
const primaryNav: NavItem[] = siteConfig.nav.map((i) => ({ label: i.label, href: i.href }));
...
<PageShell nav={primaryNav}>{children}</PageShell>
```

Confirmed `siteConfig.nav` IS `niche.navigation` (`src/config/site.ts:26`), six
items, labels shipped verbatim: Services `/services`, For `/for`, Research
`/research/pharmacy-openings-closures-index`, Blog `/blog`, About `/about`,
Contact `/contact`.

**`bypassWhen` NOT passed** (decision recorded): one embed family,
`/embed/[slug]`, which the kit matches built-in (kit `PageShell.tsx:47`,
`pathname?.startsWith("/embed/")`) — the exact predicate the phase-0 local shell
used by hand. Hospitality's suffix predicate has no counterpart here, so copying
it would add an unreachable branch. **Embed routes therefore stay chrome-free by
the same mechanism as before, header, footer AND sticky bar.**

## Every kit chrome prop and the value set

### Header (`Omit<SiteHeaderProps, "nav">`)

| prop | value shipped | note |
|---|---|---|
| `ctaPrimary` | `{ label: niche.cta.sticky_button, href: "/contact" }` = **"Get in touch"** | unchanged from deleted `SiteHeader.tsx:32` |
| `ctaIds` | `{ primary: "header_contact", mobilePrimary: "header_contact_mobile" }` | MANDATORY. Kit defaults are `header_book`/`header_book_mobile`; taking them would rename both live series |
| `ctaMobilePlacement` | `"header_mobile_menu"` | the site's own value, NOT the kit default `"mobile_menu"` |
| `ctaContactGoal` | `"form"` | **ADDITIVE CHANGE, declared.** The site emits no `data-cta-goal` today (`goal: null` on all three baseline triples). The kit always emits the attribute and its parameter default is `"form"`, so `undefined` cannot reproduce "absent". No live goal series exists to split; this is a NEW dimension value appearing on 55 routes |
| `ctaSecondary` | **not passed** | would mint a third header CTA |
| `ctaVariant` | **not passed** | no `cta.variant` in config → `data-cta-variant={undefined}` → attribute omitted |
| phone | **no such prop exists** on `SiteHeaderProps` (re-verified) | "no phone" ruling satisfied structurally; `niche.contact.phone` is the `+44 20 0000 0000` placeholder and stays unrendered |
| `wordmarkIcon` | `Pill` from `lucide-react` | **verified exported** before wiring: `grep "^declare const Pill:" node_modules/lucide-react/dist/lucide-react.d.ts` = 1. `Cross` fallback not needed |
| `wordmarkTop` / `wordmarkBottom` | `"PHARMACY"` / `"TAX"` as literals | a display-name edit cannot silently rename the wordmark |
| `wordmarkAccentColor` | `niche.brand.primary_color` (read from config, not retyped) | MANDATORY. Kit default is the `primary-600` step, which after P1-A is not the brand (the brand is the 950 step). 12.18 on the white header |
| `nav` | forwarded by the kit shell to header AND footer | they cannot drift |

Desktop CTA emits `data-cta-placement="header"` — verified in kit source
(`SiteHeader.tsx:534`), **byte-for-byte the baseline's `header_contact|header`**.

### Footer (`Omit<SiteFooterProps, "nav">`)

| prop | value shipped | note |
|---|---|---|
| `description` | `siteConfig.description` | — |
| `footerLinks` | `siteConfig.footer` (5 items) | **expected to render EMPTY.** Traced `buildFooterColumns` in kit source: every one of the five (`/contact`, `/blog`, `/privacy-policy`, `/cookie-policy`, `/terms`) is already a column href — four in `companyItems`, `/blog` as the extra column — so all five are deduped out. A dedupe, not a dropped link |
| `legalDisclosure` / `legalName` / `tradingName` | `siteConfig.company.*` | built in `config/site.ts:37-40` |
| `wordmarkIcon/Top/Bottom` | the same three as the header (one `wordmark` const spread into both) | — |
| `resourcesHref` | `"/research/pharmacy-openings-closures-index"` | manager decision. Traced: `find()` matches the nav item, it has no `children`, so `childrenOf` falls back to `[{label: item.label, href: item.href}]` → a "Resources" column holding ONE link labelled **"Research"** |
| `companyItems` | About `/about`, Contact `/contact`, Privacy Policy `/privacy-policy`, Terms `/terms`, Cookie Policy `/cookie-policy` | kit default includes `/locations`, which 404s here (`locations: []`) |
| `extraNavHrefs` | `["/blog"]` | `/blog` has no fixed slot. `/calculators` is not a nav item, so the Calculators column renders only its "All calculators" fallback link — expected, recorded |
| `showBuilderCredit` | **OMITTED** (kit default `true`) | owner standing rule 2026-09-11. **This is a NEW visible line and a NEW followed outbound link on 55 pages.** |
| `backdrop` | `<PharmaciesBackdrop />` | mounted exactly as P1E_RECEIPT instructs: the element, no props, `patternId` left at its default. Kit footer is already `relative overflow-hidden` with `relative z-10` content = the host contract |
| `consentToggle` | `<ConsentToggle className="inline-block shrink-0 py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />` | `text-slate-400` on `bg-slate-900` = 6.78 |
| `newsletterSlot` | not passed | owner ruling: no newsletter |
| `fallbackNav` | not passed | `nav` always arrives from `layout.tsx` |

## ConsentToggle

`pharmacies/web/src/components/analytics/ConsentToggle.tsx` — **byte-for-byte
copy** of `hospitality/web/src/components/analytics/ConsentToggle.tsx`, verified
by `md5sum` (`d9dc8c4bea4d19683491b9c259bdf098` on both). Wording unchanged
("Do not track me" / "Enable analytics"). The ring stays INSIDE the component,
`focusRing` appended after the caller's `className`, so a caller can restyle
colour but cannot drop the ring. `components/analytics/` is a new directory on
this site; the component is the site's first and only opt-out affordance under
`posture="opt-out"`.

A new visible control on 55 pages. Not an interruption (no popup, modal, banner
or cadence) — a footer link closing a PECR gap. Flagged to the manager, not the
owner.

## StickyCTA mount

Re-mounted as a sibling of the kit shell, gated by the same `/embed/` prefix the
kit applies, so `sticky_cta` and `sticky_cta_close` survive on 55/55 routes and
stay off the embed routes:

```tsx
const bare = pathname?.startsWith("/embed/") ?? false;
return (<><KitPageShell …>{children}</KitPageShell>{!bare && <StickyCTA />}</>);
```

Two changes inside `StickyCTA.tsx`, nothing else (owner decision 2 — the bar,
trigger, copy and layout are untouched):

1. **Ring.** Was `focus:outline-none focus:ring-2 focus:ring-[#0f3a4a]
   focus:ring-offset-2 focus:ring-offset-neutral-900` on the close button =
   **1.47 on the dark ground, under the 3:1 indicator floor**. Replaced with
   P1-B's `focusRing` recipe, and `ground-dark` added to the bar's wrapper
   `div`, which rebinds `--focus-ring`/`--kit-focus-ring` to `#ffffff`
   (`globals.css:226`). **White on `slate-900` `#0f172a` = 17.85** — PASS, well
   past 3:1. This is the second of the two mounts `globals.css:168-170` promised
   for `.ground-dark`, so the class is now live, not declared-and-unmounted.
2. **Grey ramp.** `bg-neutral-900` → `bg-slate-900`, `text-neutral-300` →
   `text-slate-300`, `text-neutral-400` → `text-slate-400`. The fourth,
   `ring-offset-neutral-900`, was deleted with the old ring, so three
   substitutions close all four. `grep -rn "neutral-[0-9]" src` = 0 code hits
   site-wide.

Contrast re-checked on the new ground (slate-900 `#0f172a` vs neutral-900
`#171717`, both near-black, one step apart): white headline 17.85, `slate-300`
sub-copy 12.02, `slate-400` close glyph 6.78 — all PASS. The two `#0f3a4a`
border literals are left as they are: not in P1-C's two-change budget.

## JSON-LD change

**None. There was nothing to move — the brief's §0 row is correct.**
`src/lib/schema.ts:17-52` already calls `buildOrganization` from
`packages/web-shared/schema` and already passes `parentOrganization`
(`{ name: siteConfig.company.legalName, companyNumber: siteConfig.company.number }`).
`layout.tsx` injects it unchanged in `<head>`.

The C6 assertion, verified by reading the source:
- `legalName: "Ashfield Trading Ltd"` — present.
- `alternateName: siteConfig.company.tradingName` — present.
- `parentOrganization` — present.
- `priceRange` — **not passed.** The only `priceRange` string anywhere under
  `src` is a prose mention in the comment at `schema.ts:15` listing what the
  hand-rolled version carried; the builder only emits the key when the option is
  truthy (`organization.ts:41`), so no `priceRange` reaches the DOM.
- One `#organization` **node** per route, by `@id`
  (`buildOrganization` is the only full node; the hits at `schema.ts:62`, `:118`,
  `:156` and `lib/calculators/schema.ts:25` are stub references carrying the same
  `@id`, the standard JSON-LD reference pattern a graph merger folds into one).
  See handoff 3.

## Acceptance — run now (no build/server needed)

```
$ cd pharmacies/web && npx tsc --noEmit
(no output, exit 0)

$ grep -rn "<main" src --include=*.tsx | wc -l                                 -> 0
$ grep -rn "components/layout/SiteHeader\|components/layout/SiteFooter" src     -> 0
$ grep -c "web-shared/design/chrome/PageShell" src/components/layout/PageShell.tsx -> 1
$ grep -c 'header_contact"' src/components/layout/PageShell.tsx                 -> 1
$ grep -c "header_mobile_menu" src/components/layout/PageShell.tsx              -> 1
$ grep -coE '#[0-9a-fA-F]{3,8}' src/components/layout/PageShell.tsx             -> 0
$ grep -rn "neutral-[0-9]" src (code lines)                                     -> 0
$ grep -c "PharmaciesBackdrop />" src/components/layout/PageShell.tsx           -> 1
$ grep -c "StickyCTA />" src/components/layout/PageShell.tsx                    -> 1
$ ls src/components/analytics/                                                  -> ConsentToggle.tsx
$ ls src/components/layout/                                                     -> PageShell.tsx  PharmaciesBackdrop.tsx
```

**Note on the first four greps, same shape as P1-E's:** the first pass read
`<main`=1, `SiteHeader|SiteFooter`=1, kit-PageShell=2 and hex=2 — every extra hit
was the file's own HEADER COMMENT naming those tokens while explaining the
replacement. The greps cannot tell prose from code, so the comment was reworded
to describe them in words. **No code was changed by that edit**, and `tsc` was
re-run clean afterwards.

Also verified by reading the kit source, no build needed:
- **Drawer focus trap present** at this kit SHA: `SiteHeader.tsx:390` (focus
  RETURN) and `:405-426` (focus ENTRY + Tab/Shift+Tab cycle), on a
  `role="dialog" aria-modal="true"` panel (`:559-561`). Verified, not
  re-implemented; `packages/**` untouched.
- **Skip link** is rendered by the kit shell (`PageShell.tsx:53-58`,
  `href="#main"`, `focus:bg-primary-600` + `focus:text-white`). The site had none
  (baseline 0).
- **Single `<main id="main" className="flex-1 scroll-mt-24">`** is the kit's
  (`PageShell.tsx:60`); the local one went with this rewrite, so there is never a
  moment with two.

## For the manager to run (needs the build / `next start` on :3111)

1. `cta_snapshot.mjs` diffed against `cta_baseline.json`: same three ids and
   placements on all 55 routes (`header_contact|header`, `sticky_cta|sticky`,
   `sticky_cta_close|sticky`). **Only permitted delta: `goal: null → "form"` on
   `header_contact`**, declared above.
2. `main=1` on `/ /services /for /blog
   /research/pharmacy-openings-closures-index /contact /calculators`.
3. `curl -s localhost:3111/ | grep -c 'href="#main"'` → 1.
4. `curl -s localhost:3111/embed/pharmacy-purchase-affordability | grep -o
   "<header\|<footer\|data-cta=\"sticky_cta\"" | wc -l` → 0.
5. `header_contact_mobile` + `header_mobile_menu` from the SHIPPED client
   bundle: `grep -o "header_contact_mobile\|header_mobile_menu"
   .next/static/chunks/app/layout-*.js`; widen to `.next/static/chunks/**` if
   the layout chunk is empty (P0-D records that the brief's suggested glob
   misses it).
6. **Every chrome href probed for 404s**, status line per href. The 11 hrefs this
   package puts in the chrome: `/` (wordmark ×2), `/services`, `/for`,
   `/research/pharmacy-openings-closures-index`, `/blog`, `/about`, `/contact`,
   `/privacy-policy`, `/terms`, `/cookie-policy`, `/calculators` (the kit's "All
   calculators" fallback). **`/calculators` is the one to watch: it is NOT a nav
   item here, so it has never been in the chrome before** — and the kit emits it
   unconditionally with no prop to suppress it (handoff 1).
7. Link floor per route ≥ `sweep_baseline.json`, new number reported. Tightest:
   `/about`, `/contact`, `/privacy-policy`, `/cookie-policy`, `/terms` and all 8
   `/services/*` at 10; `/` 25; `/blog` 37. Expect the floor to RISE everywhere:
   the footer goes from 5 links to ~13 columns-plus-credit.
8. Skip link's focused ground measured (A5): white on `#0f3a4a` = 12.18.
9. **Header CTA visibility at 390 / 768 / 1023 / 1024 / 1280, measured as
   `display: none`, NOT "absent from the DOM"** (R1 false premise 3). Two
   deliberate, declared changes to measure, neither to be fixed:
   - **Breakpoint `xl:` → `lg:`.** The old desktop CTA was `xl:inline-flex`
     (deleted `SiteHeader.tsx:33`); the kit's is `lg:inline-flex`
     (`SiteHeader.tsx:537`). The desktop CTA now appears from 1024 and tablet
     volume shifts off the mobile row.
   - **"Contact" nav item stays visible at `xl:`.** With no `ctaSecondary` the
     kit's `item.href === secondaryCtaHref ? "xl:hidden" : ""` (`:488`) never
     matches, so the nav keeps its Contact link alongside the CTA at ≥1280.
     Measure at 1280 and record.
10. Backdrop overflow (P1-E's open item):
    `document.documentElement.scrollWidth === clientWidth` at 390 on `/`, `/blog`
    and `/research/pharmacy-openings-closures-index`.
11. `getComputedStyle(document.body).fontFamily` reports a quoted
    `"Plus Jakarta Sans"` (P1-A T-H1 — the one rendered font check).
12. Re-run the gate §9.1 rows: row 1 (layout-utils) and row 4 (backdrop) are now
    live, row 2 moves off 0 for the first time (this package is the site's first
    `web-shared/design` chrome consumer).

## Handoffs for the manager (kit edits are manager-only; nothing in `packages/**` was touched)

1. **KIT GAP — `/calculators` in the footer is unsuppressable.** Kit
   `SiteFooter.tsx:131-135` always appends `{ label: "All calculators", href:
   "/calculators" }` to the Calculators column, and `.filter(column =>
   column.items.length > 0)` can therefore never drop that column. There is no
   prop to turn it off. On this site `/calculators` is not a nav item, so this is
   a brand-new chrome link on 55 pages. It appears to be a real route (it is in
   the brief's own render-check list), so this is a note, not a 404 — but if the
   manager wants the column gone it needs a kit prop
   (`showCalculatorsColumn?: boolean`), which only the manager may add. Closest
   existing prop used in the meantime: none; the column ships.
2. **`/for` never reaches the footer.** The brief's C3 sets `extraNavHrefs:
   ["/blog"]` and gives `/blog`'s reason, but `/for` is also a flat nav item with
   no fixed slot, so it is the one nav entry with no footer presence at all.
   Hospitality passed `["/for"]` for exactly this reason. **Shipped as the brief
   specifies (`["/blog"]`) rather than silently widened** — adding `"/for"` is a
   one-line change and a visible new footer column, so it is the manager's call.
3. **Pre-existing, OFF LIMITS, not touched:** blog routes
   (`src/lib/schema.ts:116-120`) and calculator routes
   (`src/lib/calculators/schema.ts:24-28`) each emit a SECOND JSON object typed
   `Organization` carrying the same `#organization` `@id` as a publisher/provider
   stub. That is the normal JSON-LD reference idiom and folds to one node in the
   graph, so the C6 assertion holds — but if a later phase wants literally one
   `"@type": "Organization"` string per route, those two stubs are where it
   lives, and both files are outside P1-C's OWNS list.
4. `btnOnDark`'s ring (`primary-400`, flagged unmeasured by P1-B) is still
   unmounted: this package mounts no `btnOnDark` consumer.

## False premises found in the brief

1. **P1-E's receipt is the one that is stale, not the brief.** Its mount
   instruction says to mount the backdrop "in the kit `SiteFooter`'s `backdrop`
   slot in `pharmacies/web/src/components/layout/SiteFooter.tsx` (the kit wrapper
   P1-C creates)". **P1-C does not create a `SiteFooter.tsx` wrapper — it DELETES
   that file** (brief C3: the footer props go on the kit `PageShell`'s `footer`
   object). Mounted at the kit footer's `backdrop` slot via
   `footer={{ backdrop: <PharmaciesBackdrop /> }}`, which is the same DOM
   position and the same host contract P1-E's receipt describes, so its contrast
   row is unaffected. Honoured the intent, not the stale path.
2. **C5's suggested snippet drops `nav`.** The brief's example is
   `<KitPageShell nav={nav} header={{...}} footer={{...}}>` in C5 but the
   `pathname`/`bare` lines above it are presented as the whole wrapper body; the
   shipped file keeps `nav={nav}` (without it the kit falls through to
   `fallbackNav ?? []` and the entire footer column set plus the header nav
   vanish). Non-issue once written out, recorded because the snippet reads as
   complete.
3. **C2's phone row and C3's dedupe/fallback predictions were all re-verified
   against kit source and hold** (`SiteHeaderProps` genuinely has no phone prop;
   the `seenHrefs` register genuinely eats all five `footerLinks`; `childrenOf`
   genuinely self-links a childless nav item). No correction needed.
4. **C5's "its 4 `neutral-*` → `slate-*`" is a count of four classes, one of
   which the ring fix removes.** Three substitutions, not four, close the file.
   Stated so nobody greps for four replacements and reads three as incomplete.

Everything else in C1-C6 matched the source as written.
