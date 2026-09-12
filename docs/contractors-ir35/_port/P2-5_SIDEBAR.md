# P2-5: sidebar (TableOfContents + ReadingProgress) adoption

## Pushback: the brief does not match source

**Lease mismatch.** The brief leases "the sidebar files under
`contractors-ir35/web/src/components/blog/`, specifically the table of
contents and reading progress components." No such files exist. This site
never had local `TableOfContents.tsx`/`ReadingProgress.tsx` (unlike medical,
which has one-line re-export shims left over from its own local-to-shared
migration). Dentists and solicitors don't have them either — direct import
from `@accounting-network/web-shared/content/*` is the norm for this port,
not the exception.

**Adoption is already done, and it's not in my lease.** Phase 1 already
switched `BlogPostRenderer.tsx` to import the standard components:
```
import { TableOfContents } from "@accounting-network/web-shared/content/TableOfContents";
import { ReadingProgress } from "@accounting-network/web-shared/content/ReadingProgress";
```
`content/TableOfContents.tsx` is the version with the `stickyDesktop` prop;
`design/blog/TableOfContents.tsx` (older, no prop) is not in use here. So
there is nothing left for THIS package to adopt. The one thing left to fix -
the sticky arrangement - lives entirely in `BlogPostRenderer.tsx` at lines
346-350, which is leased to another agent. I made no edits. Everything below
is a finding + a precise change request for the manager to sequence.

**Also wrong: "the sidebar holds a CTA card and a table of contents."** It
doesn't, not yet. Current sidebar (`BlogPostRenderer.tsx:346-350`) is ToC
only, no `BlogSidebarCta` or any `data-cta` element:
```tsx
<aside className="hidden lg:block">
  <div className="sticky top-24">
    <TableOfContents headings={headings} />
  </div>
</aside>
```
The arrangement fix below is written to be correct today (ToC alone) and to
stay correct if/when a CTA card is added later (per medical's pattern), since
that's the one placement that survives both cases.

## Arrangement chosen: single clamp, on the outer column child, inner clamp off

**Confirmed defect in current build**, verified by fetching the rendered
phase-1 page (`localhost:3621/blog/contractor-accounting-basics/what-is-a-contractor-accountant`),
not just reading source:
```
<aside class="hidden lg:block">
  <div class="sticky top-24">                                          <- outer: sticky, NO clamp
    <nav aria-label="Table of contents">
      ...
      <div class="hidden lg:block ... sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">  <- inner: ALSO sticky + its own clamp (stickyDesktop defaults true)
```
This is exactly pattern 1 from the brief: a sticky wrapper nested around a
component that already clamps itself. Confirmed present today, not
hypothetical.

**Recommended fix** (medical's known-good pattern, which is the only one of
the three already-ported sibling sites - dentists, solicitors, medical - that
got this right; dentists and solicitors ship the same nested-sticky defect
found above and are not fixed by this package):

```tsx
<aside className="hidden lg:block">
  <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
    <TableOfContents headings={headings} stickyDesktop={false} />
  </div>
</aside>
```

`max-h-[calc(100vh-8rem)]` (not medical's `7rem`) because there's no CTA card
above the ToC here, so `top-24` (6rem) plus the same 2rem bottom margin
`content/TableOfContents.tsx` already used internally reproduces identical
geometry, just on the outer element instead of the inner one. If a
`BlogSidebarCta` is added above the ToC in the same wrapper later, switch to
`7rem` (or whatever the card's height requires) at that time - that's a
one-line follow-up, not a re-architecture.

**Report to manager (renderer is out of my lease):**
File: `contractors-ir35/web/src/components/blog/BlogPostRenderer.tsx`, lines
346-350. Change the two lines above. One scroll container after the fix
(the outer div); zero after, on the inner (its clamp is switched off via the
prop).

## Anchor offsets: gap confirmed, fix is out of lease

`P0D_CSS_A11Y.md` (phase 0) found 0/6 anchor-target route families carried
`scroll-mt-*`. That's since been partially closed: `scroll-mt-24` now exists
on `PageShell.tsx#main`, `services/page.tsx`, and all three `research/*`
section anchors (grepped fresh, not from the stale P0D count).

**Still missing: the ToC's own targets.** `TableOfContents` links to
`#{heading-id}` on the `<h2>`/`<h3>` elements inside `article.contentHtml`.
Those ids are stamped by `addHeadingIds()` in
`contractors-ir35/web/src/lib/markdown-utils.ts`:
```ts
return `<${tag} id="${uniqueId}">${content}</${tag}>`;
```
No `scroll-margin-top` anywhere on that tag. `scroll-mt-24` on an ancestor
(`#main`) does nothing for a jump straight to a descendant heading - CSS
`scroll-margin-top` only applies to the element actually named in the
fragment. Every ToC click currently lands the target heading directly under
the sticky header.

This file is outside `components/blog/` (it's in `lib/`) and outside my
declared lease, so I'm reporting rather than fixing:
**File:** `contractors-ir35/web/src/lib/markdown-utils.ts`, `addHeadingIds()`.
**Fix:** add `scroll-mt-24` (matches the `top-24` convention already used by
this site's header offset elsewhere) to the emitted tag:
`` `<${tag} id="${uniqueId}" class="scroll-mt-24">${content}</${tag}>` ``
(watch for an existing `class` attribute in `content` if markdown ever emits
one on a heading - it doesn't today, headings are stripped to plain text by
`extractHeadings`, but the raw HTML going into `addHeadingIds` could in
principle carry one).

## Contrast

No new text colour introduced (no edits made). For the record: the ToC's
`text-[var(--muted)]` inactive-link colour resolves to `--ink-soft: #525252`
on `--surface: #fafaf7` = ~7.8:1, well clear of the 4.76 slate-500 comparator
in the brief and of AA. Not a risk here.

## data-cta / link floor

No `data-cta` triples exist in the current sidebar (see pushback above), so
none to preserve. A table of contents emits in-page anchors
(`#{heading-id}`) only, no new routes - **no effect on the link-floor count**
in `docs/contractors-ir35/_port/sweep_baseline.json`.

## Verification list (manager, serialised build)

1. **Sticky arrangement, exact measurement** (this is the load-bearing check -
   reading classes doesn't prove it, per the brief). After the renderer
   change lands and a build is available: open a blog post, scroll the page
   to 6000px, then in devtools:
   ```js
   document.querySelector('aside .sticky').getBoundingClientRect()
   ```
   Expected (matches medical's passing read at 1440x900): `top: 96`,
   `bottom: 884`. Also count scroll containers in that column (elements with
   `overflow-y-auto`/`scroll` and content taller than their box) - expect
   **1**. **UNVERIFIED by me** - no server available in this session
   (`next build`/`next start` forbidden; the shared 3621/3611 dev servers
   were read-only fetched, no browser tool was reachable to run
   `getBoundingClientRect` against them).
2. Confirm `stickyDesktop={false}` on the `TableOfContents` call in
   `BlogPostRenderer.tsx` renders the inner desktop `<div>` WITHOUT
   `sticky`/`max-h`/`overflow-y-auto` (i.e. the prop actually reached the
   component - grep the rendered HTML for a single `sticky top-24` in that
   column, not two).
3. Click a ToC link on a real post, confirm the target `<h2>`/`<h3>` clears
   the sticky header (needs the `markdown-utils.ts` fix above to be applied
   first - currently will fail).
4. Mobile ToC (`lg:hidden` `<details>` block) is untouched by any of the
   above - spot check it still opens/closes and jumps correctly.
5. Re-run the link-floor sweep after the renderer change lands; expect no
   change in any route's count (ToC adds anchors, not links).

## Receipt

- **Arrangement chosen:** single clamp (`sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto`)
  on the `<aside>`'s direct child div, `stickyDesktop={false}` on
  `TableOfContents`, matching medical's fix. Not yet applied - the file
  (`BlogPostRenderer.tsx`) is leased elsewhere; reported above with exact
  lines.
- **Anchor offsets found:** `#main` and 4 other route families now carry
  `scroll-mt-24` (P0D's "0/6" is stale). The ToC's actual targets - headings
  stamped by `addHeadingIds()` in `lib/markdown-utils.ts` - carry none. Fix
  reported, not applied (file outside lease).
- **Wrong in the brief:** (1) the leased files (local ToC/ReadingProgress
  components under `components/blog/`) don't exist - this site imports the
  shared components directly, same as dentists/solicitors, so "adopt" was
  already done in phase 1 and there was nothing in-lease left to change; (2)
  "the sidebar holds a CTA card" - it doesn't yet, ToC only.
