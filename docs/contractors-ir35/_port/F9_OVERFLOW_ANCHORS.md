# F9 — 390px horizontal overflow + in-page anchor scroll margin

Site: `contractors-ir35/web/`. Two measured defects, both reproduced against the
read-only server on the current build (http://localhost:3621, title asserted as
`Specialist Contractor Accountants | IR35 Advice UK`) before any edit.

Measurement tool: headless Edge via the repo's existing `puppeteer-core`
(no new dependency), viewport 390x800, same rule as the gate: enumerate
offenders only when `documentElement.scrollWidth > clientWidth + 1`.

---

## DEFECT 1 — horizontal overflow at 390px

### Measured before (build as served)

`/research/uk-contractor-index` at 390px:

```
scrollWidth 617, clientWidth 390
table.sr-only right=428, caption right=428, thead right=428,
tr right=428, th right=428, tbody/tr/td right=428 ...
```

Identical shape to the gate report. Real, not an instrument artefact. All three
chart routes overflow, and EVERY offender on all three is one of these tables:

| route | scrollWidth at 390px | widest offending table |
|---|---|---|
| `/research/uk-contractor-index` | 617 | `right=428` |
| `/research/uk-contractor-insolvency-index` | 603 | `right=438` |
| `/research/uk-contractor-survival-index` | 681 | `right=681` |

### The real cause (not "sr-only is broken")

`sr-only` is Tailwind v4's stock utility and it is correct:

```
position:absolute; width:1px; height:1px; padding:0; margin:-1px;
overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border-width:0
```

The defect is that F6 put that class **on the `<table>` element itself**.

1. A `<table>` is `display: table`. In CSS table layout the used width is
   `max(specified width, min-content width)` — `width` acts as a MINIMUM, not a
   cap. So `width: 1px` on a table is silently ignored and the table lays out at
   its natural content width (here ~428px of numeric columns, with
   `white-space: nowrap` from `sr-only` itself preventing any wrapping).
2. `overflow: hidden` on that same element clips its DESCENDANTS, but an element
   cannot clip itself: the table's own 428px box is what overflows.
3. `clip: rect(0,0,0,0)` affects PAINTING only. It does not remove the box from
   the scrollable overflow region, so the document still scrolls sideways.
4. Because the table is `position: absolute` with no positioned ancestor short
   of the page, its overflow propagates to the document scroll area.

Nothing else was involved: the site has no custom `sr-only` override
(`globals.css` imports Tailwind and never redefines it), and no descendant
context was to blame.

### Proof of the mechanism (isolated, both variants, same page conditions)

Static probe page, Tailwind's verbatim `sr-only` rules, 8-column numeric table,
390px viewport:

| variant | documentElement.scrollWidth |
|---|---|
| `sr-only` on the `<table>` (F6 shape) | **979px** — offenders `table.sr-only`, `caption`, `thead`, `tr`, `th`… |
| `sr-only` on a wrapper `<div>`, table plain | **390px**, zero offenders |

The offender list from the failing variant reproduces the gate's list element
for element, which confirms the diagnosis rather than merely matching a number.

### The fix

`src/components/research/ChartDataTable.tsx`: the `sr-only` class moves from the
`<table>` to a plain `<div>` wrapper; the table itself carries no class. A `div`
is `display: block`, so it honours `width: 1px`/`height: 1px`, and ITS
`overflow: hidden` clips the table inside it. The F6 accessibility fix is
untouched — same table, same caption, same `scope="col"` / `scope="row"`
headers, same set of charts (8 `ChartDataTable` instances: 3 + 3 + 2 across the
three research routes).

### Proof the accessibility data is still reachable

Chrome accessibility-tree snapshot (`page.accessibility.snapshot`,
`interestingOnly: false`) of the wrapper variant:

```
table:NEW sr-only on wrapper
  caption:
  rowgroup:
    row:
      columnheader:Column 1 header
      columnheader:Column 2 header  ... (all columns)
```

The `table` role, its accessible name from the `<caption>`, the `rowgroup`,
`row`, `columnheader` and cell nodes are all present. Wrapping a table in a
visually-hidden `div` changes no ARIA semantics (unlike putting
`display:block`/`display:contents` on the table, which would have destroyed the
implicit table role — that is why that route was rejected).

---

## DEFECT 2 — in-page anchors hide their own headings

### Current state, derived (the "zero of six families" figure was stale)

Phase 1 work is real and was verified in place, so it was NOT touched:

| already correct | where |
|---|---|
| `#main` | `components/layout/PageShell.tsx:21` `scroll-mt-24` |
| research `<Section id>` x3 routes | measured live: `SECTION#incorporations=96px` etc. |
| `#get-expert-help` | `app/calculators/[slug]/page.tsx:132` |
| `#<service.id>` | `app/services/page.tsx:128` |
| `#enquiry-form` | `components/blog/BlogPostRenderer.tsx:369` |

What was actually broken, measured live at 390px:

| route | heading targets | computed `scroll-margin-top` |
|---|---|---|
| `/blog/ir35-status/challenge-ir35-determination-sds` | 25 | all `0px` |
| `/resources/ir35` | 9 | all `0px` |

### Two stampers, not one

1. `addHeadingIds()` in `src/lib/markdown-utils.ts` — regex `/<(h[23])>/`, so it
   only stamps BARE headings. Callers: `src/lib/blog.ts:17` and
   `src/lib/resources/content.ts:61`.
2. **Hand-written ids in the content itself.** `content/resources/*.md`
   (3 files: `ir35.md`, `pay-planning.md`, `structure.md`) ship
   `<h2 id="...">` already stamped, which `addHeadingIds()` skips by design and
   which `extractHeadings()` then feeds into the resources table of contents
   (`app/resources/[topic]/page.tsx:114`). A guard inside `addHeadingIds()`
   would have covered the blog and left every hand-stamped resources heading
   broken — measured above at `0px`, and they are live TOC targets.

Also checked and found NOT to be separate stampers: FAQ blocks
(`#faq-heading`, static, has no incoming hash link), calculator sections,
glossary (none on this site), research pages (own `Section` component, already
96px), and blog body HTML (no hand-written `id=` anywhere under `content/blog`).

### The fix — one rule, on the shape, in `src/app/globals.css`

```css
:where(h2[id], h3[id], h4[id]) { scroll-margin-top: 6rem; }
```

`6rem` = 96px = the existing `scroll-mt-24` used on `#main`, so the estate keeps
one value. `:where()` holds specificity at 0, so any explicit `scroll-mt-*`
utility on a specific heading still wins. It covers both stampers, every current
caller, and any future one, without touching the helper or any template.
`h4` is included because content may add one later; the helper itself only
stamps h2/h3 today.

`packages/web-shared/` was NOT edited (trap 12) and did not need to be.

---

## Verification list for the manager's serialised build

Run after `next build` + `next start` on the port you use. The probe used here
is a scratch file; the checks are the assertions, not the script.

1. **390px overflow, the exact check.** For each of
   `/research/uk-contractor-index`, `/research/uk-contractor-insolvency-index`,
   `/research/uk-contractor-survival-index` (the three routes that render
   `ChartDataTable`), at viewport width 390:
   `document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1`.
   Expect `scrollWidth == 390` and an empty offender list. Before the fix
   `/research/uk-contractor-index` measured `scrollWidth 617` with
   `table.sr-only right=428`.
2. **Accessibility preserved.** On the same routes, accessibility snapshot must
   still contain the chart `table` nodes whose names are the chart captions, each
   with `columnheader` and `rowheader` descendants carrying the plotted values.
   Equivalent cheap check: `document.querySelectorAll('.sr-only table').length`
   is 3 / 3 / 2 on the three routes respectively (measured on the current
   build), and the chart `<svg>` elements remain `aria-hidden`.
3. **Anchors.** On `/blog/ir35-status/challenge-ir35-determination-sds` (25
   targets) and `/resources/ir35` (9 targets, hand-written ids):
   every `h2[id], h3[id], h4[id]` has
   `getComputedStyle(el).scrollMarginTop >= 96px`. Extend to any one further
   blog post and `/resources/pay-planning`, `/resources/structure`.
4. **No regression on the already-correct families.** `#main`, research
   `section[id]`, `#get-expert-help`, `#<service.id>`, `#enquiry-form` still
   report 96px.
5. **Unchanged elsewhere.** `npx tsc --noEmit` clean (ran clean locally after
   the edit); no `data-cta` attribute touched; no dependency added; link floor in
   `sweep_baseline.json` untouched (no links added or removed).

## Files changed

- `contractors-ir35/web/src/components/research/ChartDataTable.tsx`
- `contractors-ir35/web/src/app/globals.css`
- `docs/contractors-ir35/_port/F9_OVERFLOW_ANCHORS.md` (this file)
