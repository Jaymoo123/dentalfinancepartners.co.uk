# P1-E RECEIPT — `PharmaciesBackdrop` — pharmacies phase 1

## MOUNT INSTRUCTION FOR P1-C (exact, do not improvise)

Default export, so the import line is:

```tsx
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
```

Mount it in the kit `SiteFooter`'s `backdrop` slot in
`pharmacies/web/src/components/layout/SiteFooter.tsx` (the kit wrapper P1-C
creates), as the JSX element, not a function:

```tsx
backdrop={<PharmaciesBackdrop />}
```

Pass nothing else. `patternId` has a default
(`"pharmacies-dispensary-shelving"`) and only needs a value if a single
document ever mounts the component twice; phase 1 mounts it once, on the
footer, so leave it unset.

Host contract, already satisfied by the kit `SiteFooter` `backdrop` slot: the
parent must be `relative overflow-hidden` and its content `relative z-10`. If
P1-C mounts it anywhere else, that host needs both or the texture paints over
the copy, and that new ground needs its own contrast row added to the file's
header comment first.

## FILE

`pharmacies/web/src/components/layout/PharmaciesBackdrop.tsx` — new, the only
file this package created or touched. Nothing mounted, nothing built, no server
run, no git state changed.

## DESIGN RATIONALE (the two sentences)

The motif is a dispensary-shelf rhythm: shelf rules at a 40px pitch with short
vertical dividers standing on each run, and one full-height bay edge where a run
of shelving ends, so the field reads as the sober structure of the reader's own
premises rather than as decoration. Capsules, mortar-and-pestle glyphs, green
crosses and prescription-pad clip art are rejected for the reason startups-tech
rejected rockets — the wordmark already carries the pharmacy mark, and a glyph
cannot tile seamlessly in both axes the way a shelving run can, so it would read
as detached clip art at the tile seam.

Not generalist's motif: generalist is a ruled ledger with irregular ledger
ticks, painted into a fixed-view-box slice. This is a two-axis tiling shelving
run with no fixed view box, a graded alpha between the shelf rule and the
divider, and a pitch chosen so the rhythm reads horizontal rather than as a grid.

## DELIBERATE DEVIATIONS FROM THE TEMPLATE (both required by the brief)

1. **No fixed view box, no sliced aspect ratio.** `patternUnits="userSpaceOnUse"`
   painted into `<rect width="100%" height="100%">`, which is startups-tech's and
   hospitality's mechanism. generalist's fixed-box shape is what produces
   horizontal overflow at 390. Baseline here is 0 overflow at every width and
   this component cannot contribute to it: the wrapper is `hidden sm:block`, and
   even above `sm` it is `absolute inset-y-0 right-0 w-[55%]` inside an
   `overflow-hidden` host.
2. **`patternId` is a prop with a default.** A DOM id must be unique per
   document; a server component cannot call `useId`.

## COLOUR

`#45cdff` (the `primary-400` step of the P1-A ramp), written as a **literal**,
with both reasons in the file: an undefined custom property invalidates the
whole declaration and the element then paints nothing with every test still
green, and the Tailwind v4 ramp emits oklch rather than the sRGB these ratios
were measured on. No new colour enters. The brand hex `#0f3a4a` is NOT used
(1.47 on slate-900, invisible there).

Note for the manager: P1-A had not landed when this package ran
(`grep primary-400 src/app/globals.css` = 0 hits), so `#45cdff` is taken from
the brief as the declared step rather than read off the minted ramp. **If P1-A
mints a different `primary-400`, this file's literal and its contrast row both
need updating.**

## CONTRAST — one row, the only ground phase 1 mounts on

Worst case assumed: a 1px stroke at full alpha inside the `opacity: 0.10` group,
i.e. copy sitting directly on a shelf rule, which the left-fading mask means it
effectively never does.

| ground | bare vs white | bare vs slate-300 | composited | composited vs white | composited vs slate-300 | verdict |
|---|---|---|---|---|---|---|
| `bg-slate-900` `#0f172a` (kit footer) | 17.85 | 12.02 | `#14293f` | **14.80** | **9.97** | PASS |

`slate-300` = `#cbd5e1` (footer links); white = footer headings. The
`#45cdff`-on-slate-900 figure of 9.72 is the stroke against the ground, not the
figure that matters; the composited pair above is. Later phases that mount this
on another ground add their own row to the file header before reusing it.

## MOTION / A11Y

`aria-hidden="true"`, `pointer-events-none`, `focusable="false"` on the svg, no
text, no `role="img"`, no JS, no animation, no dependency, no data URI. Identical
in the static HTML and on the client, and identical under
`prefers-reduced-motion: reduce` because there is nothing to reduce, so no media
query is needed. Hidden below `sm`.

## ACCEPTANCE — run, output pasted

```
$ cd pharmacies/web
$ ls src/components/layout/ | grep -ci backdrop
1
$ grep -c "viewBox" src/components/layout/PharmaciesBackdrop.tsx
0
$ grep -c "userSpaceOnUse" src/components/layout/PharmaciesBackdrop.tsx
1
$ grep -c "use client\|useEffect\|useState" src/components/layout/PharmaciesBackdrop.tsx
0
$ npx tsc --noEmit
(no output, exit 0)
```

Gate row 4 goes `0` -> **1**.

Note on the two greps: the first pass of the file read `viewBox=2` and
`userSpaceOnUse=2` because the header comment *named* both tokens while
explaining the deviation. The acceptance greps cannot tell prose from code, so
the comment was reworded to describe them in words ("no fixed view box", "a
user-space pattern"). The code was not changed by that edit.

`npx tsc --noEmit` is clean on the whole site, so there is nothing to disown
from other packages.

## STILL OPEN (not this package's)

- P1-C mounts it (instruction at the top of this receipt). Unmounted, it paints
  nothing and gate row 4 is the only thing it moves.
- Rendered check, after the manager's build:
  `document.documentElement.scrollWidth === clientWidth` at 390 on `/`, `/blog`
  and `/research/pharmacy-openings-closures-index`.
- If P1-A's minted `primary-400` is not `#45cdff`, update the literal and the
  contrast row.
