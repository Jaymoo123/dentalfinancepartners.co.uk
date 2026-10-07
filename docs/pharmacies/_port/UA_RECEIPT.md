# UA receipt: the thin hubs (pharmacies design uplift)

2026-10-07. Package UA of `UPLIFT_PACKAGES.md` (section "### UA", lines 276-362).
Five files touched, all inside the OWNS set. No build, no server start or stop, no
git command that writes, no subagent, no `packages/**` edit, no other site
touched.

**Files edited**

| file | what changed |
|---|---|
| `pharmacies/web/src/app/blog/page.tsx` | hero band, category band, library band, eyebrow, glow group, chip `data-cta`, panel to `contained` |
| `pharmacies/web/src/app/blog/[category]/page.tsx` | hero band, article band, eyebrow, glow group, panel to `contained` |
| `pharmacies/web/src/app/calculators/page.tsx` | hero band, tool band on slate-50, eyebrow, glow group on the 3 cards, NoticeCard ground flip, empty-state colour |
| `pharmacies/web/src/app/services/page.tsx` | eyebrow on the tiers band, glow group on CoverageCards, h1 type step |
| `pharmacies/web/src/app/for/page.tsx` | eyebrow on the card band, h1 type step |

---

## 1. Band map per route, before and after

Ground sequence read top to bottom; the kit footer is `bg-slate-900` on every
route, so the last band before it must be light (R2 / V1 darkOnDark finding,
relayed by the manager mid-task).

### `/blog`

| | before | after |
|---|---|---|
| 1 | `<div container py-16>` — breadcrumb, h1 30px, chips, article list (NOT a `<section>`) | `<section>` **primary-950** hero: backdrop `blog-index-hero`, breadcrumb `onBrand`, `Eyebrow onDark "Blog"`, h1 `sm:text-5xl lg:text-6xl leading-[1.15] text-balance` |
| 2 | — | `<section>` **white**: the category row, unchanged chips in a `<nav aria-label="Browse by category">` |
| 3 | — | `<section>` **slate-50**: the library, `HubArticleList` inside `ScrollGlowGroup delay={0.1}` |
| 4 | `LeadCTAPanel` navy `bg-slate-900` + backdrop → **navy into navy footer** | `LeadCTAPanel contained ground="white"` → **light into the dark footer** |
| | sections 1, eyebrow 0, glow 0, h1 30px | sections 4, eyebrow 1, glow 1, h1 at the hub step |

### `/blog/[category]` (all five live slugs)

| | before | after |
|---|---|---|
| 1 | `<div container py-16>` — breadcrumb, h1 30px, article list | `<section>` **primary-950** hero: backdrop `blog-category-hero-${category}`, breadcrumb `onBrand`, `Eyebrow onDark "Blog"`, h1 at the hub step |
| 2 | — | `<section>` **white**: `HubArticleList` inside `ScrollGlowGroup delay={0.1}` |
| 3 | `LeadCTAPanel` navy + backdrop → **navy into navy footer** | `LeadCTAPanel contained ground="slate"` → **light into the dark footer** |
| | sections 1, eyebrow 0, glow 0 | sections 3, eyebrow 1, glow 1 |

### `/calculators`

| | before | after |
|---|---|---|
| 1 | `<div max-w-4xl py-16>` — breadcrumb (default tone), h1 36px, paragraph, 3 tool cards, NoticeCard, enquiry link | `<section>` **primary-950** hero: backdrop `calculators-hub-hero`, breadcrumb `onBrand`, `Eyebrow onDark "Calculators"`, h1 at the hub step, the same paragraph at `text-slate-300` |
| 2 | — | `<section>` **slate-50**: the 3 tool cards as the direct children of `ScrollGlowGroup` (real stagger, not a single beat), NoticeCard `ground="slate"`, the `calc_index_help` link unchanged |
| 3 | `LeadCTAPanel contained ground="white"` (white under a white band) | `LeadCTAPanel contained ground="white"` — now preceded by slate-50, so the one `sameAdjacent` in the whole site is gone |
| | sections 1, eyebrow 0, glow 0, h1 36px | sections 3, eyebrow 1, glow 1, h1 at the hub step |

Container stays `mx-auto max-w-4xl px-6` on both bands: the measure this route
already reads at, not widened to `siteContainerLg`.

### `/services`

| | before | after |
|---|---|---|
| 1 | **primary-950** hero, backdrop, breadcrumb `onBrand`, h1 `sm:text-5xl` | same + h1 `lg:text-6xl leading-[1.15] text-balance` |
| 2 | **white**: h2 "Service tiers" + `ServiceTiers` | same + `Eyebrow "Services"` |
| 3 | **slate-50**: h2 "All services" + `CoverageCards` | same + `ScrollGlowGroup delay={0.1}` around the cards |
| 4 | `LeadCTAPanel contained ground="white"` | unchanged |
| | sections 4, eyebrow 0, glow 0 | sections 4, eyebrow 1, glow 1 |

### `/for`

| | before | after |
|---|---|---|
| 1 | **primary-950** hero, backdrop, breadcrumb `onBrand`, h1 `sm:text-5xl` | same + h1 `lg:text-6xl leading-[1.15] text-balance` |
| 2 | **white**: 5 cards already inside `ScrollGlowGroup` | same + `Eyebrow "Who we help"` |
| 3 | `LeadCTAPanel contained ground="slate"` | unchanged |
| | sections 3, eyebrow 0, glow 1 | sections 3, eyebrow 1, glow 1 |

**Ground alternation after UA:** no two adjacent bands share a ground on any of
the five routes, and every route ends on a light band before the slate-900
footer. The two navy-into-navy blog endings R2 reported are closed; the five
`/blog/[category]` URLs and `/blog` are six of the eight URLs V1 counted.

---

## 2. Components adopted, with props

| component (kit path) | route | props |
|---|---|---|
| `design/primitives/page-blocks.tsx` `Eyebrow` | `/blog` hero | `onDark`, text `"Blog"` (the terminal crumb label) |
| same | `/blog/[category]` hero | `onDark`, text `"Blog"` (the parent crumb label; h1 is the category name) |
| same | `/calculators` hero | `onDark`, text `"Calculators"` (the terminal crumb label) |
| same | `/services` tiers band | no props, text `"Services"` (route/nav label, above the different heading "Service tiers") |
| same | `/for` card band | no props, text `"Who we help"` (crumb/nav label, above five different card headings) |
| `design/marketing/ScrollGlowGroup.tsx` | `/blog` library band | `delay={0.1}` (one child: `HubArticleList` renders its own grid) |
| same | `/blog/[category]` article band | `delay={0.1}` (same reason) |
| same | `/calculators` tool band | `className="mt-10 grid gap-6 sm:grid-cols-2"` — replaces the grid div, so the 3 cards are direct children and the `:nth-child` stagger runs |
| same | `/services` all-services band | `delay={0.1}` (one child: `CoverageCards` renders its own grid) |
| `design/marketing/LeadCTAPanel.tsx` | `/blog`, `/blog/[category]` | `contained` + `ground="white"` / `ground="slate"`; `backdrop` dropped (kit renders it on the navy variant only, `LeadCTAPanel.tsx:72-77`) |
| `design/primitives/NoticeCard.tsx` | `/calculators` | `tone="slate"` unchanged, `ground` white → `slate` with the band's new ground (`NoticeCard.tsx:17`) |

Every eyebrow string is a label the route already renders. **No sentence,
heading, FAQ, figure, label or button text was written, rewritten or deleted.**
`LeadCTAPanel`'s `eyebrow=""` / `formTitle=""` / `proofPoints={[]}` pattern is
untouched everywhere it already was.

---

## 3. Declines, each written at the call site naming the kit file

| decline | where written | reason |
|---|---|---|
| `Eyebrow` on the `/blog` category band and library band | `blog/page.tsx` head comment | neither band publishes a heading or label of its own; minting one authors copy |
| `Eyebrow` on the `/blog/[category]` article band | `blog/[category]/page.tsx` head comment | same |
| `Eyebrow` on the `/calculators` tool band | at the band | only labels inside it are the per-card `t.category` strings and the enquiry link's own heading |
| `Eyebrow` on the `/services` hero and on the "All services" band | at both | would print the route label immediately above an identical or near-identical heading |
| `Eyebrow` on the `/for` hero | at the band | identical to the h1 |
| `StatsCounter` (`design/marketing/StatsCounter.tsx`) | `/services` tiers band, `/for` card band | figures exist **per slug only** (`src/data/pharmacies-services.ts`, `src/data/pharmacies-hubs.ts`, consumed by the two detail templates); no route-level set in `src/config` or `src/data`, and no record carries a source URL for `StatItem.href`. Selecting four of eight (or five) for the hub is editorial, not a port |
| `DrawnTickList` (`design/marketing/DrawnTickList.tsx:33`) | `/calculators`, `/services`, `/for` | the only claim-shaped lists are card bodies that each sit inside an `href`; tick rows are plain text and would drop 8 of 18, 5 of 15 and 3 of 13 floor links |
| `BlogListWithSearch` (`design/blog/BlogListWithSearch.tsx:43,91`) | `blog/page.tsx:20-26`, `blog/[category]/page.tsx` | kit edit **K-A** has not landed; the existing decline stands **verbatim**, not overwritten |
| `BlogCategoryHub`, `NumberedPagination` | both blog files | unchanged from 0.4 |
| `data-cta` `blog_index_book`, `blog_index_articles`, `blog_category_book`, `services_hero_book` | at the call sites | these routes publish **no hero CTA link and no button label**; tagging means authoring "Book a free call" / "Browse the library" first, and wording is frozen. Listed for the manager below |
| per-item `data-cta` inside `CoverageCards` | `/services` hero comment | the kit builds those 8 anchors itself and exposes no per-item attribute prop |
| per-card glow stagger inside `HubArticleList` / `CoverageCards` | at each mount | the cards are inside the kit components; `delay` is the prop the kit ships for a one-child group |

`data-cta` ADDED, on existing anchors only, no new link and no new sentence:
`blog_index_topic_<slug>` + `data-cta-placement="filter_band"` on the `/blog`
category chips, named for generalist's series so `vw_cta_performance` reads
across sites. No `data-cta-goal`: a topic chip is navigation, not a funnel
control, and generalist omits goal on the same series. `/for` adds none — the
written decline already on that file (goal on new surfaces only) stands.

---

## 4. Contrast rows per new ground

**`bg-primary-950` `#0f3a4a` hero, new for `/blog`, `/blog/[category]`,
`/calculators`.** Same ground, same backdrop, same 0.10 alpha as the heroes
already measured at `services/page.tsx:44-49` and `for/page.tsx:29-32`, so the
row is reused rather than a third ground invented (binding rule 7). Composited
stop = ground + 0.10 of the motif's `#45cdff` → `#14495c`.

| foreground | on bare `#0f3a4a` | on the composited stop | floor | verdict |
|---|---|---|---|---|
| white (h1) | 12.18 | 9.78 | 4.5 | PASS |
| `text-slate-300` `#cbd5e1` (`Eyebrow onDark`, the hero paragraph on `/calculators`) | 9.09 | 7.36 | 4.5 | PASS |
| white/80 (breadcrumb links) | — | 7.08 | 4.5 | PASS |
| white/80 chevron (graphic) | — | > 3.0 | 3.0 | PASS |
| `primary-400` `#45cdff` (the `EyebrowRule` mark, graphic) | — | 5.37 | 3.0 | PASS |

**`bg-slate-50` `#f8fafc` tool band, new for `/calculators`.**

| foreground | ratio | floor | verdict |
|---|---|---|---|
| `var(--ink)` `#0f172a` (card h2) | 16.82 | 4.5 | PASS |
| `var(--ink-soft)` `#334155` (NoticeCard body) | 9.89 | 4.5 | PASS |
| `var(--muted)` `#475569` (card one-liners, empty state) | 7.24 | 4.5 | PASS |
| `var(--brand-primary)` `#0f3a4a` (card category label, enquiry link) | 11.64 | 4.5 | PASS |
| card `bg-white` + `var(--border)` `#e2e8f0` edge (graphic) | card keeps an edge against the band, per DESIGN_SYSTEM §4a rule 3 | — | PASS |

**Light-ground eyebrows (`/services`, `/for`).** `Eyebrow`'s light branch is
slate-600 `#475569` = 7.58 on white; the `EyebrowRule` mark is primary-600
`#1c8fb6` = 3.71 on white, past the 3.0 graphic floor (`globals.css:159` records
the same 3.71 for this step).

One class-only fix taken on the way: `/calculators`' zero-tools empty state was
`text-slate-400` (2.45 on the new slate-50 ground, 2.58 on the old white). It is
now `text-[var(--muted)]`, 7.24. Dead branch today (3 tools), but it is a
contrast floor, not a style preference. No wording change.

No raw hex paint entered: every colour above is a declared token step or a
Tailwind utility on the site ramp. Every focus ring on a link this package
touched is the local `focusRing` recipe; no new focusable element was added.

---

## 5. Acceptance checks

Run here:

- **`npx tsc --noEmit`** → **no output, clean.**
- **`npx vitest run`** → `Test Files 7 passed (7)` / `Tests 72 passed (72)`, the
  stated baseline, duration 1.82s.
- **Prose multiset, source level** (comments stripped, every JSX text node and
  every non-plumbing string literal counted, working tree vs the last commit):
  **no sentence added and none removed on any of the five routes.** The only new
  visible strings are the five eyebrow labels, each a second occurrence of a
  string the same route already renders: `"Blog"` (x2 routes), `"Calculators"`,
  `"Services"`, `"Who we help"`. That is the one unavoidable consequence of the
  brief's item 2 (an eyebrow is visible text); nothing is authored.
- **Link floors:** held by construction. No `href` was added, removed or
  altered in any of the five files — every band change moves existing JSX, and
  `ScrollGlowGroup` / `Eyebrow` add no anchors. The `contained` panel flip
  changes the panel's ground only; its form and its copy are the same mount.
- **JSON-LD:** `<Breadcrumb>` mounts stay at exactly 1 per route with
  byte-identical `items`, so the `BreadcrumbList` block count is unchanged and
  no block was added or removed. No other `ld+json` emitter lives in these five
  files.

Needs the manager's build (I ran none, and `:3111` serves the pre-UA build):

1. DOM measure at 1280 per route: `sections >= 3` on `/blog`, `/blog/<cat>`,
   `/calculators`; `eyebrow >= 1` on all five; `[data-glow]` >= 1 on all five.
2. `curl` link floors, assert `>=`: `/blog` 37 (22 article links),
   `/blog/nhs-contract-and-income` 17, `/blog/buying-a-pharmacy` 17,
   `/blog/locum-pharmacists` 13, `/blog/selling-a-pharmacy` 13,
   `/blog/vat-and-retail-schemes` 12, `/calculators` 13, `/services` 18,
   `/for` 15.
3. `--grounds` re-run: expect `adjacentSame` 0 and `darkOnDark` 0 across the
   blog family and `/calculators`.
4. `json.loads` over every `ld+json` block on the five routes.
5. Rendered prose diff against the pre-UA build (the source-level check above is
   the strongest one available without a build).

## 6. For the manager

- **Four `data-cta` ids in brief item 8 cannot be placed without new copy**:
  `blog_index_book`, `blog_index_articles`, `blog_category_book`,
  `services_hero_book`. Generalist carries them on hero buttons these routes do
  not publish. Either the owner supplies the labels, or the ids stay unplaced.
  `calc_index_help` was already present and is untouched.
- **`CoverageCards` exposes no per-item attribute prop**, so the 8 `/services`
  card links cannot be instrumented from the call site. A kit edit would fix it
  for every site at once.
- **K-A (`BlogListWithSearch` `postsPerPage`) did not land**, so the existing
  decline stands verbatim on both blog files; if K-A lands later, `/blog` is the
  one route where adoption is legitimate.
- **Per-card glow stagger** on `/blog`, `/blog/[category]` and `/services` needs
  `ScrollGlowGroup` support inside `HubArticleList` / `CoverageCards` (a kit
  change). Today those three groups glow as one beat; `/calculators` and `/for`
  stagger properly because their cards are local.
