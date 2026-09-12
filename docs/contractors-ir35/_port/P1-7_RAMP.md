# P1-7 — primary-* ramp + CTA breakpoint (CSS side)

File lease: `contractors-ir35/web/src/app/globals.css`. No other file touched.

Method: WCAG relative luminance, sRGB→linear per channel, `(L1+0.05)/(L2+0.05)`.
Self-test before trusting any figure: slate-500 `#64748b` on white = **4.76**,
slate-400 `#94a3b8` on white = **2.56**. Both reproduced exactly.

## The bigger defect found first: `@source` was missing

Before the ramp mattered at all, `globals.css` line 2 was
`@import "tailwindcss" source("..")` with **no `@source` for
`packages/web-shared`**. `source("..")` narrows Tailwind's scan to `src/`, and
`@accounting-network/web-shared` resolves through a workspace symlink under
`node_modules`, which Tailwind skips by default. Wave 1 adopted three kit
components wholesale (`design/chrome/SiteHeader`, `design/chrome/SiteFooter`,
`design/primitives/Breadcrumb`, 17 import sites). **None of their utility
classes were being generated** — not just the `primary-*` ones, but every
`bg-white`/`lg:flex`/`border-l-4` string that exists only inside web-shared.
Grep confirmed zero `@source` anywhere in the package (`src/`, `next.config.ts`,
`postcss.config.mjs`); `dentists/web/src/app/globals.css:3` carries the line and
its `globals-standard.css` header calls it "MANDATORY".

Fixed: added `@source "../../../../packages/web-shared";` immediately after the
`tailwindcss` import, same line and same position as dentists.

This is UNVERIFIED until the manager's build — static analysis cannot prove the
emitted CSS. It is the single highest-value thing in this package's
verification list.

## Import `globals-standard.css`, or mint locally?

**Mint locally. Importing it would not have fixed the ramp at all.**

`grep -nE "color-primary-|--primary-" packages/web-shared/design/globals-standard.css`
→ **zero hits**. That file's own header says so explicitly: "Brand colour
values (the actual `--primary`/`--accent`/etc tokens) stay per-site; this file
carries only shape and motion rules plus a small set of channel tokens." Its
single `@theme` block contains only the radius chain. Both ported siblings that
*do* import it still mint their own ramp locally
(`dentists/web/src/app/globals.css:153-163` in a bare `@theme`,
`medical/web/src/app/globals.css:209-219` likewise). So the ramp is per-site
work by design, and importing the shared sheet is orthogonal to it.

What importing it *would* change, beyond the ramp (i.e. why it is not being
done as a drive-by here):

- heading defaults (`@layer base` font-weight/letter-spacing/leading rules) on
  every `h1`-`h6` site-wide, which this file already sets itself at lines
  138-149 — two sources for the same properties;
- the motion/reveal rules and the brand-glow channel tokens
  (`--brand-glow*`), which would inherit **Property's emerald** values as CSS
  fallbacks unless this site declares overrides;
- a `@theme` radius chain (`--radius-sm/md/lg/xl`, `--btn-radius`) duplicating
  the two P1-1 already minted in `:root`.

That is a structural parity decision spanning heading rhythm and motion, not a
token fix, and it is the same call P1-1 already escalated. Reported, not taken.

## The ramp as minted

Resolution of the failing-600 fork, stated once and applied consistently:
**the ramp's 600 entry is bound to a darker value than true cyan-600.** The
dark end shifts one cyan step from 500 upward. No recipe-level override
anywhere.

Why that fork and not "recipes override to 700": the kit's `btnPrimary`
hard-codes its ground as `bg-[var(--btn-ground,var(--color-primary-600))]`
(`packages/web-shared/design/layout-utils.ts:31`) — the 600 step *is* the
button ground, and `--btn-ground` is undeclared here. `focusRing`
(`layout-utils.ts:21`) likewise hard-codes `outline-primary-600`. Overriding
per recipe means either editing `packages/web-shared` (18 sites, trap 12,
forbidden) or chasing ~20 class strings; binding the step fixes all of them in
one place. web-shared's own comment at `layout-utils.ts:130-134` documents this
as the intended mechanism ("not every brand ramp carries white text at the 600
step... such sites shift the ground to the 700 step").

No contradiction with the wave-1 role tokens — the shift makes them land on the
kit's matching steps:

| Wave-1 token | Value | Now equals |
|---|---|---|
| `--brand-primary-ground` | cyan-700 `#0e7490` | `--color-primary-600` |
| `--brand-primary-text` | cyan-800 `#155e75` | `--color-primary-700` |

| Step | Hex | Source | Consumed? |
|---|---|---|---|
| `--color-primary-50` | `#ecfeff` | cyan-50 (= `--accent-whisper`) | YES |
| `--color-primary-100` | `#cffafe` | cyan-100 | no |
| `--color-primary-200` | `#a5f3fc` | cyan-200 | no |
| `--color-primary-300` | `#67e8f9` | cyan-300 | no |
| `--color-primary-400` | `#22d3ee` | cyan-400 | YES |
| `--color-primary-500` | `#0891b2` | cyan-600 — shift starts | no |
| `--color-primary-600` | `#0e7490` | cyan-700 = site brand | YES |
| `--color-primary-700` | `#155e75` | cyan-800 | YES |
| `--color-primary-800` | `#164e63` | cyan-900 | YES |
| `--color-primary-900` | `#083344` | cyan-950 | YES |
| `--color-primary-950` | `#04212b` | one step past cyan-950 | no |

**400 is pinned to cyan-400, not shifted.** cyan-400 is already this site's
established on-dark accent (P1-5's StickyCTA, "cyan-400, 9.88:1 on navy"), and
the kit footer's `primary-400` sits on the same `bg-slate-900` ground. A
uniform shift would have put `#06b6d4` in the footer and `#22d3ee` in the
sticky bar — two on-dark accents in one stylesheet. Cost of the pin: the ramp
skips cyan-500, so 400→500 is a double step. Deliberate, noted in the CSS.

## Every consumed step, measured against the ground it actually sits on

Consumed-step inventory taken by grepping the three adopted kit components for
every `*-primary-NNN` class, then discarding the branches this site cannot
reach (`nav` here is 5 flat items with no `children`/`groups`, and
`ctaSecondary` is not passed — so the desktop dropdown panel and the `xl:`
secondary-CTA link never render).

| Class | Component / line | Role | Ground | Ratio | Floor | Verdict |
|---|---|---|---|---|---|---|
| `bg-[var(--btn-ground,primary-600)]` | layout-utils.ts:31 (header CTA) | ground under white label | white text | **5.36** | 4.5 | PASS |
| `hover:bg-…primary-700` | layout-utils.ts:31 | ground under white label | white text | **7.27** | 4.5 | PASS |
| `active:bg-…primary-800` | layout-utils.ts:31 | ground under white label | white text | **9.11** | 4.5 | PASS |
| `outline-primary-600` (`focusRing`) | layout-utils.ts:21 | focus indicator | white `#ffffff` | **5.36** | 3.0 | PASS |
| `outline-primary-600` (`focusRing`) | layout-utils.ts:21 | focus indicator | surface `#fafaf7` | **5.12** | 3.0 | PASS |
| `border-primary-600` | SiteHeader.tsx:427 (active nav underline) | graphic on white | white | **5.36** | 3.0 | PASS |
| `text-primary-700` | SiteHeader.tsx:427 (active nav label) | text on white | white | **7.27** | 4.5 | PASS |
| `border-primary-600` | SiteHeader.tsx:506 (drawer left edge) | graphic on white | white | **5.36** | 3.0 | PASS |
| `border-primary-600` | SiteHeader.tsx:542 (drawer active item) | graphic on `primary-50` | `#ecfeff` | **5.15** | 3.0 | PASS |
| `bg-primary-50` | SiteHeader.tsx:542 | ground tint vs page white | white | 1.04 | n/a | tint only, never the sole signal (border + weight also change) |
| `text-primary-900` | SiteHeader.tsx:542 (drawer active label) | text on `primary-50` | `#ecfeff` | **12.88** | 4.5 | PASS |
| `text-primary-400` | SiteFooter.tsx:150 (wordmark icon) | graphic on `slate-900` | `#0f172a` | **9.88** | 3.0 | PASS |
| `bg-primary-400` | SiteFooter.tsx:155 (wordmark rule) | graphic on `slate-900` | `#0f172a` | **9.88** | 3.0 | PASS |
| `text-primary-400` | SiteFooter.tsx:170 (column headings) | **text** on `slate-900` | `#0f172a` | **9.88** | 4.5 | PASS |
| `text-primary-700` | Breadcrumb.tsx:29 | text on surface `#fafaf7` | `#fafaf7` | **6.95** | 4.5 | PASS |
| `text-primary-700` | Breadcrumb.tsx:29 | text on white cards | white | **7.27** | 4.5 | PASS |

**Lowest ratio on any consumed step: 5.12** (`focusRing` outline on the warm
surface, a 3.0-floor graphic). Lowest on any *text* role: **5.36** is the
lowest ground-under-white-text; lowest text-on-ground is **6.95**. Nothing
consumed sits below its floor.

Two header classes are listed in the grep but are **not** live colour
consumers: `text-primary-600` (SiteHeader.tsx:136) and `bg-primary-600`
(SiteHeader.tsx:145) are both overridden by an inline
`style={{color/backgroundColor: accentColor}}` whenever `wordmarkAccentColor`
is passed, and P1-2 passes `#0e7490` explicitly. They now resolve to the same
hex either way, so the override is belt-and-braces rather than load-bearing.

Steps nobody consumes (100/200/300/500/950) were not measured, per the brief.

## Job 2 — CTA breakpoint dead zone: VERDICT, no CSS change

P1-2's claim **verified against source, not trusted**:

`grep -noE "(sm|md|lg|xl):(hidden|flex|inline-flex|block)" packages/web-shared/design/chrome/SiteHeader.tsx`

| Control | Line | Class |
|---|---|---|
| Desktop nav | 414 | `lg:flex` |
| Primary CTA | 473 | `lg:inline-flex` |
| Burger | 480 | `lg:hidden` |
| Drawer overlay | 493 | `lg:hidden` |

All four at `lg` (1024px). The only `xl:` hits (424, 445) belong to
`ctaSecondary`, which P1-2 does not pass, so that branch never renders. The
site wrapper `contractors-ir35/web/src/components/layout/SiteHeader.tsx` carries
**zero** responsive classes of its own
(`grep -noE "(sm|md|lg|xl):[a-z-]+"` = 0 hits), so it cannot re-open the dead
zone. The `sm:inline-flex` CTA that `P0D_CSS_A11Y.md` found no longer exists in
the rendered tree.

CSS side: `globals.css` contains exactly one `@media` query
(`prefers-reduced-motion`, line 116 pre-edit) and no `@custom-media` or
`--breakpoint-*` override. **Nothing in CSS is fighting the component fix.**

**Verdict: the component fix is complete. No CSS edit made.** A rule forcing a
breakpoint from this file would have to be unlayered to beat the utilities, and
per the brief's own hazard that is a fourth unlayered block beating every
utility it touches — for a defect that is already fixed.

## Unlayered-rule hazard

Nothing added is an element or class rule. `@source` is an at-rule with no
selector; the ramp is an `@theme` block, which Tailwind emits into the `theme`
layer as `:root` custom properties. **Existing unlayered block count unchanged
at three**; wave 1's audit of them stands and I did not re-litigate it.

## Verification list for the manager's serialised build

Run `npm run build` then `npm run start` in `contractors-ir35/web` **once**.

1. **`@source` took effect (the blocker).**
   `grep -c "primary-600" .next/static/css/*.css` — expect **≥1**.
   Pre-edit this would have been 0 for every kit-only class. Broader check:
   `grep -o "lg:flex" .next/static/css/*.css | head` should also hit, since
   `lg:flex` on this site exists only inside web-shared's header.
2. **Ramp resolves, no empty colour.** `http://localhost:3000/` — the header
   "Book a free call" button must have a **solid petrol-cyan `#0e7490`**
   ground with white text, not transparent/white-on-white. DevTools computed
   `background-color` = `rgb(14, 116, 144)`.
3. **Footer column headings are cyan, not invisible.** `http://localhost:3000/`
   scroll to footer — "Company" (and any other column heading) must render
   `rgb(34, 211, 238)` on the slate-900 ground, not inherit white/slate.
4. **Active nav underline paints.** `http://localhost:3000/contact` — the
   "Contact" nav item at ≥1024px must show a cyan bottom border
   (`rgb(14, 116, 144)`) and cyan-800 label text, not a transparent border.
5. **Drawer active state paints.** `http://localhost:3000/contact` at 390px
   wide, open the burger — "Contact" row must have a cyan left bar, a pale
   cyan (`rgb(236, 254, 255)`) ground and near-black-cyan label.
6. **Breadcrumb link colour.** `http://localhost:3000/blog` — breadcrumb links
   render `rgb(21, 94, 117)`, not browser-default blue and not black.
7. **Breakpoint dead zone closed (regression guard, expected already-passing).**
   `http://localhost:3000/` at **700px** wide: burger visible, primary CTA
   **not** visible. At **1100px**: nav + CTA visible, burger **not**. At
   **1000px**: burger only.
8. **No unstyled-chrome regression.** Header/footer must look laid out
   (flex rows, spacing), not a vertical stack of unstyled links — the
   whole-kit failure mode that item 1 is the mechanical test for.

Everything above is **UNVERIFIED** by this package: no build was run, per the
wave rule. Ratios are hand-computed and are facts about the hexes; what is
unverified is whether the emitted CSS contains these classes at all.

## Receipt

- **Ramp steps minted: 11** (`--color-primary-50` … `-950`, one `@theme`
  block).
- **Consumed steps measured: 6 distinct steps** (50, 400, 600, 700, 800, 900)
  across **16 class/ground pairs**.
- **Lowest ratio found: 5.12** (`outline-primary-600` focus ring on the warm
  surface `#fafaf7`, 3.0 graphics floor). Lowest text-role figure: 5.36.
  Nothing consumed is below its floor.
- **Failing-600 fork: resolved by binding the 600 entry to cyan-700**, not by
  per-recipe overrides. One answer, applied everywhere.
- **Breakpoint verdict: component fix is complete, CSS changed nothing.** All
  four controls verified at `lg:` in source; no competing breakpoint in CSS.
- **Import vs mint: mint.** `globals-standard.css` carries no ramp at all, so
  importing it would not have fixed this; both ported siblings mint locally
  even while importing that sheet.
- **Unlayered blocks: still three, none added.**
- **Wrong in the brief:** nothing about the ramp was wrong — `primary-*` really
  is absent and really was painting nothing. But the brief framed the missing
  `@source` only implicitly (via P1-1's import finding) and named the import
  question as being about the ramp. It is not: the shared sheet has no ramp.
  The load-bearing half of that finding is `@source`, which is a **larger**
  defect than the ramp — without it the kit chrome contributes no CSS
  whatsoever, so the invisible-colour defect the brief describes was the
  visible tip of a total-loss-of-styling defect. Fixed here.
