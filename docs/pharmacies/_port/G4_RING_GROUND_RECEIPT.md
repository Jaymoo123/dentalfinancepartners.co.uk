# G4 — ring-follows-ground fix (after R2)

File touched: `pharmacies/web/src/app/globals.css` only. No build, no server,
no git state changed by this task (one `git stash` was run by mistake mid-task
and immediately reversed with `git stash pop`; verified after pop that the
whole working tree, including this edit, was intact — see the stash list went
back to empty and `git status` matches the pre-task modified-file set).

## Problem (R2 S1 + S3)

- S1: 11 links on dark grounds measured 1.56 — a UA 1px outline, not the ring
  token — because the LINK itself never carried `focusRing` in its
  `className` (a TSX issue, out of scope for a CSS-only fix; not touched
  here).
- S3: `.ground-dark` is missing from every dark band the KIT paints (6 route
  families, ~30 URLs) because the kit components
  (`TestimonialsSection`, `LeadCTAPanel`, `BlogSidebarCta`,
  `WhatToExpectCard`, `StickyCTA`, `SiteFooter`, `ProcessTimeline`'s active
  step) paint `bg-slate-900` on their own outer element and expose no
  `className` prop, so no site wrapper can carry `.ground-dark`. Consequence
  measured on the blog post template: a focusable "Get in touch" ring at
  1.46 against a `bg-slate-900` parent — the light-ground ring colour
  painted on a dark panel.
- G1's receipt (globals.css:170-190 at G1 time, comment preserved) separately
  warns never to wrap a light-ground card with `.ground-dark`, because custom
  properties inherit down into it.

## Fix

Kept `.ground-dark` as a selector (site code in `src/app/**` still writes it
by hand alongside `bg-primary-950`/`bg-primary-800`, and it's a harmless
alias now) but moved the ring-rebind so it ALSO keys off the ground utility
class itself. Added to the existing rule at `.ground-dark` (previously
globals.css:237, now ~262):

```css
.ground-dark,
.bg-slate-900,
.bg-primary-950,
.bg-primary-800 {
  --focus-ring: var(--focus-ring-on-brand);
  --kit-focus-ring: var(--focus-ring-on-brand);
}
```

Any element the kit or the site paints with one of those dark utilities now
scopes `--focus-ring`/`--kit-focus-ring` to `--focus-ring-on-brand`
automatically — no `.ground-dark` hand-add required. This directly removes
the S3 gap on all 6 route families without touching
`packages/web-shared/design` (site-local, no kit edit) and without touching
any TSX (S1's link-level `focusRing` omission is a separate, non-CSS fix,
left alone as instructed).

Added the light-card-inside-dark-band reset the G1 comment warned about,
scoped the same way instead of as a blanket caveat:

```css
.ground-dark .bg-white,
.bg-slate-900 .bg-white,
.bg-primary-950 .bg-white,
.bg-primary-800 .bg-white {
  --focus-ring: var(--focus-ring-on-light);
  --kit-focus-ring: var(--focus-ring-on-light);
}
```

Updated the explanatory comment above both rules to state the new mechanism,
the evidence for the selector list, and the cascade reasoning (kept below).

## Selector list — evidence

**Dark-ground selectors (`.bg-slate-900`, `.bg-primary-950`,
`.bg-primary-800`):**
- Built CSS (`pharmacies/web/.next/static/css/4e19b308b6595f7a.css`, read as
  the CSS text directly — no BOM issue, `iconv -f utf-8 -t utf-8` round-trip
  matched a plain read): emits `.bg-slate-900`, `.bg-primary-800`,
  `.bg-primary-950` among the primary/slate families. **Not emitted**:
  `.bg-primary-900`, `.bg-slate-950`.
- Kit sources (`packages/web-shared/design/**/*.tsx`, grepped for literal
  `bg-slate-900`/`bg-primary-*` outside `hover:`/`focus:`/`/`-opacity
  variants): only `bg-slate-900` is ever painted as a dark ground —
  `SiteFooter.tsx:182`, `LeadCTAPanel.tsx:103`, `TestimonialsSection.tsx:83`,
  `BlogSidebarCta.tsx:61`, `WhatToExpectCard.tsx:39`, `StickyCTA.tsx:130`,
  `SlimHero.tsx:27` (default `sectionClassName`), `ProcessTimeline.tsx:119`
  (active-step conditional). No kit source paints `bg-primary-950`,
  `bg-primary-800`, `bg-primary-900`, or `bg-slate-950`.
- Site sources (`pharmacies/web/src/**/*.tsx`, grepped the same way):
  `bg-primary-950` and `bg-primary-800` are painted directly by site code —
  `page.tsx:329,402,471,609,705`, `about/page.tsx:36,47`, `blog/page.tsx:88`,
  `blog/[category]/page.tsx:101`, `calculators/page.tsx:45`,
  `contact/page.tsx:70`, `for/page.tsx:38`, `for/[slug]/page.tsx:90`,
  `services/page.tsx:64`, `services/[slug]/page.tsx:109`,
  `research/*/page.tsx` (several), `ReturningBar.tsx:55`,
  `PharmacyIndexCharts.tsx:297` — every one of these already carries
  `.ground-dark` by hand in its `className`, so the new rule is redundant
  (same properties, same values) on these elements and only changes
  behaviour on the 6 kit-painted route families. `bg-primary-900` and
  `bg-slate-950` do not appear anywhere in `pharmacies/web/src`.
- Conclusion: the list `.bg-slate-900, .bg-primary-950, .bg-primary-800`
  covers every dark ground this site actually renders, built-CSS-confirmed.
  `bg-primary-900` and `bg-slate-950` are correctly left out — nothing emits
  them.

**Light-card reset selector (`.bg-white`):**
- `packages/web-shared/design/marketing/LeadCTAPanel.tsx:103` paints
  `bg-slate-900` on the outer `<section>` for its dark variant, and line 189
  paints `bg-white` on the form card nested inside it
  (`<div className="rounded-xl bg-white p-6 ...">`), which holds the lead
  form's focusable inputs and submit button. This is the one real
  dark-band-with-light-card case the kit ships.
- Cascade walked by hand for that exact component: the `<section
  className="... bg-slate-900">` matches the dark-ground rule, so
  `--focus-ring`/`--kit-focus-ring` resolve to `--focus-ring-on-brand`
  (`#ffffff`) and inherit down through the DOM subtree, including into the
  `bg-white` card. Without a reset, a focused input/button inside that card
  would paint a white ring on a white background — invisible, which is
  worse than S3's 1.46 UA outline. The reset rule re-matches on `.bg-white`
  (the card element itself, which is a descendant of `.bg-slate-900` in the
  DOM) and rebinds both properties back to `--focus-ring-on-light` (the
  brand navy, 12.18 on white), which is what the card's focusable children
  then inherit, since the reset sits deeper in the same cascade.
- `.bg-slate-50` was checked for the same case and does NOT need a reset:
  grepped every kit (`packages/web-shared/design`) and site
  (`pharmacies/web/src`) use of `bg-slate-50` — every instance is its own
  full-bleed light section (`BlogCategoryHub.tsx:264,303`,
  `ProblemStatement.tsx:27`, `CoverageCards.tsx`, `TopicSection.tsx`,
  `FaqSection.tsx`, `page-blocks.tsx`, and ~20 site-local sections/cards),
  never nested inside a `bg-slate-900`/`bg-primary-950`/`bg-primary-800`
  ancestor. `TestimonialsSection.tsx:95` uses `bg-white/5` (a distinct
  Tailwind opacity-modifier class, not `.bg-white`), which does not match
  either selector and is intentionally left alone — it's a translucent tint,
  not a solid light card.

## Layering and Tailwind v4 checks

- Kept inside `@layer components`, same layer as the pre-existing
  `.ground-dark` and `footer` rules. The rule only sets two custom
  properties (`--focus-ring`, `--kit-focus-ring`); no Tailwind utility
  declares either property, so there is nothing in `@layer utilities` for
  this rule to lose to regardless of layer order — confirmed by grepping the
  built CSS for `--focus-ring` and `--kit-focus-ring`: both appear only in
  this file's own rules and in the kit's `focusRing`/`kitFocusRing` recipe
  consumers (`var(--focus-ring, ...)` reads), never as a Tailwind-generated
  declaration.
- Tailwind v4 does not rewrite, scope, or purge class selectors written in
  an author CSS file — `@source`/`source("..")` only controls which
  TEMPLATE files Tailwind scans to decide which utility classes to GENERATE
  into `@layer utilities`; it has no effect on hand-written selectors like
  `.bg-slate-900 { ... }` in `@layer components`. Checked by confirming the
  existing `footer` element-selector rule two blocks below (pre-G4, G1-era)
  already relies on exactly this and has been stable across every phase
  since.

## `.ground-dark` on light cards (the G1 trap)

The surviving caveat from the original comment — never wrap a light-ground
card with `.ground-dark` — still holds for the hand-added class, and now also
holds implicitly for the utility-keyed selectors: grepped
`pharmacies/web/src` for `ground-dark` followed by `bg-white` in the same
element and found none, so no existing site code trips the trap either way.

## tsc

```
$ cd pharmacies/web && npx tsc --noEmit
(no output, exit 0)
```

No TSX/TS files were touched, so this just confirms the repo's TypeScript
state is unaffected by the CSS-only change.
