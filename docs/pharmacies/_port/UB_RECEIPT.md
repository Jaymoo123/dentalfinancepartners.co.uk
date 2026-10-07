# UB RECEIPT — detail templates

Files: `app/services/[slug]/page.tsx`, `app/for/[slug]/page.tsx`,
`app/calculators/[slug]/page.tsx`, `app/blog/[category]/[slug]/page.tsx`.
Read-only on everything else. No subagent, no build, no server start/stop, no
git command. `localhost:3111` read via `curl` only, for the one ground-collision
measurement below (older build; used descriptively, not as the source of truth
for current source).

## `app/services/[slug]/page.tsx`

Before: hero(dark, Eyebrow=`service.title`) / stats(dark) / challenges(white,
h2 only) / howWeHelp(slate-50, h2 only) / FAQ(white, eyebrow="") / LeadCTAPanel
(contained, `ground="slate"`, already G3-fixed). 1 eyebrow.

After: same band sequence and same grounds. Added:
- `data-cta="service_hero_book"` + `data-cta-placement="hero"` +
  `data-cta-goal="form"` on the existing hero "Get in touch" link.
- `lg:text-6xl leading-[1.15]` on the h1 (was `sm:text-5xl` only).
- Decline comment on the challenges/howWeHelp bands: no second label exists in
  `src/data/pharmacies-services.ts` beyond the h2 itself; `service.title` is
  already spent as the hero Eyebrow. No eyebrow minted.
- Re-read note upholding the `CardStack`/`ComparisonTable`/`WhatToExpectCard`
  declines (unchanged reasons, no reversal).

Eyebrows: 1 -> 1 (declined on 2 bands, in writing). `ScrollGlowGroup`: already
on both grids, untouched. No new ground.

## `app/for/[slug]/page.tsx`

Before/after: identical shape and reasoning to the twin above (`hub.title` is
the hero Eyebrow; no second label for challenges/howWeHelp). Added
`data-cta="hub_hero_book"` + placement/goal on the conditional hero link
(inside `{!hub.noLeadForm && ...}`, untouched branch logic), the same h1 step,
and the same re-read/uphold note on the card-component declines.

## `app/calculators/[slug]/page.tsx`

Before: hero(dark, Eyebrow=`tool.category`) / calculator(`bg-[var(--surface)]`,
containing `CalculatorClient` + the kit's own nested
`CalcResultCta` `<section>`, also `bg-[var(--surface)]`) / explainer(white,
h2 only) / FAQ(`bg-[var(--surface)]`, eyebrow=""). `sameAdjacent=1` per the
brief.

Measured the collision directly (`curl localhost:3111/calculators/locum-take-home-comparator
| grep -oE '<section[^>]*>'`): 5 `<section>` tags in doc order —
`bg-[var(--brand-primary)]` (hero), `bg-[var(--surface)]` (our wrapper),
`bg-[var(--surface)]` (`CalcResultCta.tsx:23`, nested, not in OWNS), `bg-white`
(explainer), `bg-[var(--surface)]` (FAQ). Entries 2 and 3 are the same ground —
that is the measured `sameAdjacent=1`.

Fix, inside this file only (`CalcResultCta.tsx` is `components/calculators/**`,
not OWNS): the wrapping section's ground moved from `bg-[var(--surface)]` to
`bg-white`, an already-measured ground (identical to the explainer section).
New flat sequence: dark / white / surface (nested card, now contrasts) / white
/ surface (FAQ) — zero adjacent repeats.

After, full band sequence: hero(dark) / calculator(white, containing a
surface-ground result card) / explainer(white) / FAQ(surface). Also added:
- `lg:text-5xl leading-[1.15]` on the h1 (was `sm:text-4xl` only).
- Decline comment: no card grid in this file's tree for `ScrollGlowGroup`
  (`CalculatorClient`/`Calculator.tsx` render single cards, not a grid; the
  kit file is off-limits anyway).
- Decline comment: `calc_hero_help` not addable — the hero carries no link at
  all, and rule 1 forbids minting a new one.
- Decline comment: no second label for the explainer band's eyebrow.

`sameAdjacent`: 1 -> 0. Eyebrows: 1 -> 1 (declined on 1 band). Calculator
maths, `lib/calculators/**` and `CalcResultCta`/`CalculatorClient`: untouched.

## `app/blog/[category]/[slug]/page.tsx`

Before: no `<section>` bands at all (single flowing light column) / 0
eyebrows / article body / optional "Key takeaways" / FAQ (white, eyebrow="") /
"Related reading" (`RelatedArticles`, ungrouped) / closing `LeadCTAPanel`,
NAVY (non-contained) variant with its own `PharmaciesBackdrop`, straight into
the `slate-900` footer — navy-on-navy, the R2 finding, measured ring 1.46 on
that band.

After:
- Added `<Eyebrow>{post.category}</Eyebrow>` above the h1. `post.category` is
  already published in this band as the Breadcrumb's second-to-last crumb, so
  no string is minted (same pattern the hero Eyebrow on the service/hub
  templates already uses — reusing a title that is also its own breadcrumb
  crumb).
- `lg:text-5xl leading-[1.15]` on the h1 (was `sm:text-4xl` only, the other
  template stuck at 36px per 0.3).
- `ScrollGlowGroup` DECLINED on the "Related reading" grid, in writing:
  `[data-glow="on"] > *` fires on direct children, but `RelatedArticles`
  renders its own internal `<ul>`/`<li>` grid, so wrapping the component would
  animate one opaque block, not a per-card wave; `.related-card` already
  carries its own, deliberately different, hover/focus glow
  (`globals-standard.css:213-226`) that the scroll stagger would duplicate.
- **R2 fix**: closing `LeadCTAPanel` moved from the navy variant + `backdrop`
  to `contained ground="slate"`, the same fix `services/[slug]` and
  `for/[slug]` already carry. `backdrop` dropped with it (the kit only renders
  it on the non-contained branch, so it was a no-op prop under the new variant
  anyway). `PharmaciesBackdrop` import removed (now unused in this file).
  New sequence: light content column -> light contained panel (`slate-50`) ->
  dark footer. Zero dark-on-dark on any of the 22 post routes this template
  generates.

No focus-ring wrapper added for the dark-ground ring token: per the
coordinator's note, that fix is landing site-wide in `globals.css` under
another package.

Eyebrows: 0 -> 1. `sameAdjacent` (band-level): n/a before (no bands) -> 0
dark-on-dark after.

## Kit declines upheld or added, with call site

| component | file:line | verdict |
|---|---|---|
| `CardStack` | `services/[slug]`, `for/[slug]` (re-read) | upheld, `columns` still `1\|2` |
| `ComparisonTable` | `services/[slug]`, `for/[slug]` (re-read) | upheld, forces a `general` column |
| `WhatToExpectCard` | `services/[slug]`, `for/[slug]` (re-read) | upheld, `DEFAULT_ITEMS` assert a fixed-fee line |
| `ScrollGlowGroup` | `calculators/[slug]` hero/explainer region | declined, no card grid in OWNS tree |
| `ScrollGlowGroup` | `blog/[category]/[slug]` "Related reading" | declined, direct-children mismatch + duplicate glow |
| Eyebrow | `services/[slug]`/`for/[slug]` challenges+howWeHelp (4 bands) | declined, no second label published |
| Eyebrow | `calculators/[slug]` explainer band | declined, no second label published |
| `data-cta="calc_hero_help"` | `calculators/[slug]` hero | declined, no existing link to tag |

## Contrast / ground rows

- `calculators/[slug]` wrapper section: `bg-white`, already measured
  elsewhere on this template (identical to the explainer section two bands
  down). No new ground introduced.
- `blog/[category]/[slug]` closing panel: `ground="slate"` on the kit's
  `contained` variant, the same ground and the same measured row
  `services/[slug]`/`for/[slug]` already carry from G3.

## Verification

```
cd pharmacies/web && npx tsc --noEmit
# clean, no output, exit 0

cd pharmacies/web && npx vitest run
# Test Files  7 passed (7)
#      Tests  72 passed (72)
# baseline unchanged
```

## Checks run here (no build needed)

- `tsc --noEmit`: clean.
- `vitest run`: 7/72 unchanged pass count, calculator goldens untouched
  (`lib/calculators/**` not edited).
- Read-diff by hand on all four files: every string inside a JSX text child,
  `dangerouslySetInnerHTML` source, `faqs`, `stats`, `challenges`, `howWeHelp`,
  `explainer`, and frontmatter-sourced field is byte-identical to before this
  package; only `className` strings, new `data-cta*` attributes, one new
  `<Eyebrow>` element (reusing `post.category`), one `<section>` background
  class, and the closing `LeadCTAPanel`'s props changed.

## Left for the manager (need the build / DOM)

- Acceptance #1 (eyebrow >= 2 / sections unchanged-or-up, in the DOM) on all
  four templates — needs the rebuilt `:3111` or a fresh dev server.
- Acceptance #2: `sameAdjacent == 0` on `/calculators/locum-take-home-comparator`
  — fixed in source per above; needs a rebuild to re-measure in the DOM.
- Acceptance #3: link floors per route — no link added or removed by this
  package, so these should hold unchanged, but want the real crawl.
- Acceptance #4: prose-multiset diff across all 8+5+3+22 routes — no sentence
  was written, rewritten or deleted; the one duplicated string
  (`post.category`, now rendered twice: breadcrumb crumb + Eyebrow) follows
  the same precedent already shipped on `services/[slug]`/`for/[slug]`
  (`service.title`/`hub.title` duplicated the same way). Flagging in case the
  multiset tool treats breadcrumb-vs-Eyebrow duplication as a diff.
- Acceptance #6: ld+json parse pass over every generated route — no JSON-LD
  builder call site was touched.
- R2's other findings outside this package's four files (if any) — not read
  here; R2 was read only for the one post-template finding the coordinator
  named.
