# P0-F3 receipt — pharmacies, phase 0 serious-tier fixes

`npx tsc --noEmit` (pharmacies/web): clean, no output, exit 0.

## Files changed

- `src/components/research/PharmacyIndexCharts.tsx`
- `src/app/research/pharmacy-openings-closures-index/page.tsx`
- `src/app/research/pharmacy-density-and-workload-index/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[category]/page.tsx`
- `src/app/blog/[category]/[slug]/page.tsx`
- `src/app/not-found.tsx`

## NaN root cause (finding 1)

`pharmacy-openings-closures-index/page.tsx` built `chAnnualData` with
`value: r["47730"]`. The type `ChFormationsYear` (in
`src/lib/research/pharmacy-openings-closures-index.ts`, out of this
package's file set) declares a `"47730"` field, but the actual data in
`src/data/pharmacy-openings-closures-index.json` stores that series under
`count` (verified: `{"year":2016,"count":227}` etc, no `"47730"` key at
runtime). So every `r["47730"]` was `undefined`, `AnnualBarChart`'s
`Math.max(...values, 1)` returned `NaN` (one `NaN` in a `Math.max` call
poisons the whole result even with the `,1` floor), and every bar's
`height`/`y` attribute became `NaN` — the 8 console errors (2 attrs x 4
widths) on that one page.

Fix, in-file only (type/data file are off limits for this package):
- `page.tsx`: read `r["47730"] ?? (r as unknown as { count?: number }).count ?? 0`
  — before: `value: r["47730"]`.
- `PharmacyIndexCharts.tsx`: added a `safe()` finite-number guard inside
  `AnnualBarChart` and `StackedBarChart` so any future `NaN`/`undefined`
  input renders as a 0-height bar instead of an invalid SVG attribute, and
  guarded `barW` against `data.length === 0`. Chart output for valid data
  is unchanged (verified: guard is a no-op pass-through for finite numbers).

## Contrast (finding 2, 29 failures, ratio 2.48-2.58 vs 4.5 floor)

Both `/research/*` pages: `text-neutral-400` → `text-neutral-500` on every
chart source/methodology caption (`<p className="... text-neutral-400">`
source/methodology lines, both files, `sed` applied — neutral-500 on white
is ~4.74:1, the lightest step in the site's existing neutral scale that
clears 4.5). `PharmacyIndexCharts.tsx`: the `IndexedComparisonChart`
"(indexed to 100 at first year shown)" axis-index label, same
`text-neutral-400` → `text-neutral-500` swap (this is the density page's
5th flagged node). No wording, layout, or other colour touched.

## Chart value text nodes (finding 3)

`MonthlyLineChart`, `StackedBarChart`, `AnnualBarChart`, and
`IndexedComparisonChart` all render `role="img"` SVGs with per-point values
only inside `<title>` tooltips. Added a tiny shared `SrOnlyValues` component
(`<ul className="sr-only">`) rendered alongside each chart's `<svg>`,
listing the same tick/value pairs as real server-rendered text nodes.
Nothing visible changes; SVGs are untouched.

## Anchor scroll-margin (finding 4, 8 gaps, one blog article)

The missing anchors (`#ref-1`, `#ref-2`) are footnote `<li id="ref-N">`
elements inside raw content HTML
(`content/blog/pharmacy-closures-independents-vs-multiples.md`, off limits,
and shared by all 17 posts via `dangerouslySetInnerHTML`), not Tailwind-
classed elements the template can target directly. No `scroll-mt-*` class
existed anywhere else in `src` to copy (checked). Added one scoped rule in
`blog/[category]/[slug]/page.tsx`: `<style>{\`.prose [id] { scroll-margin-top: 6rem; }\`}</style>`
— applies to every anchor target in every post's body (6rem = 96px, matches
the brief's floor), no visible change, no content file touched.

## Nested `<main>` (finding 5, 34 pages estate-wide; 7 of them in this
package's files)

Root layout already wraps children in `<main>`. Changed the inner `<main>`
to `<div>` (same classes, same children) in:
- `blog/page.tsx`
- `blog/[category]/page.tsx`
- `blog/[category]/[slug]/page.tsx`
- `research/pharmacy-openings-closures-index/page.tsx`
- `research/pharmacy-density-and-workload-index/page.tsx`

`src/app/admin/**` has no `<main>` anywhere (checked, none found) — nothing
to change there.

## 404 noindex / canonical (findings 6-7)

`not-found.tsx` already existed but exported no metadata, so it inherited
the layout's full Organization JSON-LD + canonical (the "/admin/login still
renders a full indexable-looking shell" finding — `/admin/login` is not a
real route, only `/admin/analytics/login` exists, so it falls through to
this shared 404). Added
`export const metadata: Metadata = CONSOLE_NOINDEX_META;` — the same
`{ robots: { index: false, follow: false } }` constant already used on
every `/admin/analytics/*` page (`packages/web-shared/console/consoleAuth.ts`,
off limits, read-only). It carries no canonical, so no canonical-on-admin
change was needed. All five existing `/admin/analytics/*` pages already use
`CONSOLE_NOINDEX_META` and already carry no canonical — nothing to fix
there.

## Handoffs (outside this package's file set)

- `src/lib/research/pharmacy-openings-closures-index.ts:52,58` — type
  declares `"47730"` but the live JSON data field is `count`; the type
  should be corrected (or the data file renamed) so this isn't silently
  reading `undefined` again the next time someone edits this chart.
- `src/data/pharmacy-openings-closures-index.json` — confirms the field is
  `count`, not `"47730"` (data file, off limits).
- P0B findings #1/#2 (duplicate `@id` Organization JSON-LD, hardcoded
  `priceRange`) — shared layout/JSON-LD builder, out of this package's
  files entirely.
- P0B #3 (`/embed/*` renders full site chrome, not a stripped iframe
  layout) — embed layout component, not under `research/`, `blog/`, or
  `admin/`.
- P0B #4 (no visible breadcrumb UI despite `BreadcrumbList` JSON-LD on 21
  pages) — a breadcrumb component, not in this package's file set.
- P0D h1 weight inconsistency (600 vs 700 at matching size) — flagged to
  watch only, not a confirmed defect; not touched here.
