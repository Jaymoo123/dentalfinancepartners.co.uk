# P1-9 — Header primary-CTA gap fix (closes B1)

**Date:** 2026-09-12
**Scope:** `contractors-ir35/web/` only. Nothing under `packages/web-shared/` or `Property/` was changed.
**Servers:** read-only. 3611 = pre-port, 3621 = phase-1 build, STALE relative to the working tree and therefore the "before this fix" picture only.
**Build:** not run here (a build was already running on the shared tree). Post-fix measurements are listed as a verification list for the manager's serialised build.

Instrument assertion before trusting either server:

```
curl -s http://localhost:3621/ | grep -o '<title>[^<]*</title>'
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
curl -s http://localhost:3611/ | grep -o '<title>[^<]*</title>'
  -> <title>Specialist Contractor Accountants | IR35 Advice UK</title>
```

Both are this site.

---

## 1. Mechanism — CONFIRMED, exactly as the reviewer described

Three independent confirmations, none of them taken on trust from the brief.

**a. The composition.** `packages/web-shared/design/chrome/SiteHeader.tsx:473`

```
className={`${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`}
```

**b. The recipe opens with the colliding utility.** `packages/web-shared/design/layout-utils.ts:30`

```
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl ..."
```

So the element carries `inline-flex` and `hidden` together: two unmodified, equal-specificity
(0,1,0) utilities in the same cascade layer. The cascade can only resolve them on source order
in the emitted stylesheet.

**c. The emitted order.** `contractors-ir35/web/.next/static/css/99d4a99086ac4cf3.css`

```
14873: .hidden{display:none}
14952: .inline-flex{display:inline-flex}
```

`.inline-flex` is later, so `.inline-flex` wins. `hidden` is a dead no-op and `lg:inline-flex`
is redundant with it. This is Tailwind v4's canonical utility sort, not an accident of this
build, so it is stable across rebuilds.

**d. The rendered proof.** The served anchor on 3621 carries both classes in one list:

```
<a data-cta="header_book" data-cta-placement="header" data-cta-goal="contact"
   class="inline-flex min-h-12 ... focus-visible:outline-primary-600 hidden min-h-10 min-w-0
          whitespace-nowrap px-6 py-2 text-sm lg:inline-flex" href="/contact">
```

Which is precisely why this reads as correct in source review and in a diff: every class the
P1-2 receipt claims is present. They just never fire.

Consequence, as measured by P1-8 on both servers: the CTA renders at every width. The
CTA-and-burger overlap window went from 0-767px pre-port to 0-1023px after phase 1, because
the burger correctly moved `md:hidden` -> `lg:hidden` while the CTA never hid at all. At 390px
the wordmark is squeezed to 118.97 x 62 (it wraps). Phase 1's claim that the dead zone was
fixed is false. **The reviewer is right and the brief is right.**

Nothing in the brief was wrong. Two additions the brief did not state:

- The kit exposes **no `className` (or equivalent) prop** for the desktop primary CTA
  (`SiteHeaderProps` carries only `ctaPrimary: {label, href}`, `ctaIds`, `ctaContactGoal`,
  `ctaMobilePlacement`, wordmark props). So there is no prop-shaped site-local fix.
- This site does not pass `ctaIds`, so the CTA ships the kit default `data-cta="header_book"`,
  confirmed in the served HTML above. That attribute is what the fix keys on.

---

## 2. The fix

`contractors-ir35/web/src/app/globals.css`, appended (with the reasoning as a comment in the file):

```css
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

Why it works: it is inside `@layer utilities`, the same layer Tailwind emits its utilities
into (the built stylesheet contains exactly four layers — `theme`, `base`, `properties`,
`utilities`), so it never depends on source order against `.inline-flex`; it wins on
specificity, 0,2,2 against 0,1,0. `64rem` is the `lg:` breakpoint this build actually emits
(`@media (min-width:64rem)` is present in the built CSS; the site declares no
`--breakpoint-*` override), so the CTA switches at the *same* 1024px the nav, burger and
drawer switch at. No `!important`.

**Unlayered-rule hazard: not triggered.** The site's three audited unlayered blocks are
untouched and this is not a fourth — the new rule is layered, so it out-ranks only what it
beats *within* the utilities layer. Blast radius, stated in full: the `display` property of
the single header-bar primary CTA anchor. Any explicit `display` utility placed on that exact
element in future would now lose to this rule; there is none today. The drawer CTA carries
`data-cta-placement="header_mobile"` and the xl secondary carries `data-cta="header_contact"`,
so neither matches. No other element in the estate's markup carries this attribute pair.

### Options rejected

1. **Pass a class that beats `inline-flex` at the same layer.** Rejected: there is no prop to
   pass it through. `SiteHeaderProps` has no `className`/`ctaPrimaryClassName`, and adding one
   is an edit to `packages/web-shared/`, which is out of bounds (18 sites, owner-gated, trap 12).
2. **Wrap the CTA in an element that carries the responsive visibility.** Rejected for the same
   reason: the wrapper would have to live inside the kit component's own markup. The site-local
   wrapper (`src/components/layout/SiteHeader.tsx`) only mounts `<KitSiteHeader>`; it cannot
   reach inside it. Wrapping the whole kit header would hide the header.
3. (Considered and not taken) **Fix `btnPrimary` to drop its leading `inline-flex`, or reorder
   the class string.** Both are `packages/web-shared/` edits. Out of bounds, and correctly so —
   see §4.

---

## 3. Verification list for the manager's serialised build

Not run here: no build was permitted, and 3621 is stale. Every row below is the "before"
measurement from P1-8 on 3621, with the value the rebuild must produce.

Measure on the rebuilt server, homepage, with `getComputedStyle` + `getBoundingClientRect`
at each width, on: the desktop nav container, the `data-cta="header_book"` anchor, the burger
button, and (after clicking the burger) the drawer.

| Width | nav | CTA — before (3621) | CTA — required | burger | drawer |
|---|---|---|---|---|---|
| 390 | hidden | VISIBLE 171x48 @ x=147 | `display:none` | visible 48x48 | opens |
| 640 | hidden | VISIBLE 171x48 @ x=389 | `display:none` | visible 48x48 | opens |
| 700 | hidden | VISIBLE 171x48 @ x=449 | `display:none` | visible 48x48 | opens |
| 768 | hidden | VISIBLE 171x48 @ x=517 | `display:none` | visible 48x48 | opens |
| 1023 | hidden | VISIBLE 171x48 @ x=772 | `display:none` | visible 48x48 | opens |
| 1024 | visible | visible | `display:inline-flex`, visible | `display:none` | n/a |
| 1440 | visible | visible | `display:inline-flex`, visible | `display:none` | n/a |

Contract check: all four surfaces switch at 1024px and only at 1024px. Below it the bar is
wordmark + burger, one navigation system per band (DESIGN_SYSTEM.md §0.8 / §7a).

**Wordmark at 390px.** Before (3621): **118.97 x 62**, wrapped to two lines, against 337 x 38
at 640px. Required after: a single line, height ~38px (not 62), and width free to take the bar
now that the 171px button has left it. Measure `getBoundingClientRect()` on the wordmark link
and assert `height < 50` and no wrap.

Two further assertions worth making in the same pass, because they are what a careless fix
would break:

- The drawer CTA (`data-cta="header_book_mobile"`, `data-cta-placement="header_mobile"`) still
  renders at 390 — the new rule must not have caught it.
- The xl secondary (`data-cta="header_contact"`) still appears at 1440 and not at 1024 — the
  new rule must not have caught it either.

Analytics note, unchanged from the kit comment and now actually true for the first time:
`header_book` fires from 1024px up, tablet volume lands on `header_book_mobile`. Both rows
already exist in `vw_cta_performance`; the total is unchanged and the split gets truer.

---

## 4. Property — REPORT ONLY, nothing changed

**Assessment: Property reproduces the bug. Confidence HIGH.**

Evidence, from source and emitted CSS only. No Property server was started and no Property
file was modified.

1. **Identical composition.** `Property/web/src/components/layout/SiteHeader.tsx:310`

   ```
   className={`${btnPrimary} hidden min-h-10 min-w-0 whitespace-nowrap px-6 py-2 text-sm lg:inline-flex`}
   ```

   Byte-identical to the kit's line 473, including the same `data-cta="header_book"` /
   `data-cta-placement="header"` attributes and the same `lg:hidden` burger directly beneath it.
   The same 2026-08-23 owner comment sits above both.

2. **Its own `btnPrimary` opens with the same utility.** `Property/web/src/components/ui/layout-utils.ts:23`

   ```
   export const btnPrimary =
     "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-emerald-600 ..."
   ```

   Same collision: `inline-flex` and `hidden` on one element, both unmodified utilities.

3. **Its own emitted stylesheet has the same order.** `Property/web/.next/static/css/3e47daae61d1adc7.css`

   ```
   14722: .hidden{display:none}
   14801: .inline-flex{display:inline-flex}
   ```

   `.inline-flex` later, therefore winning. This is not a coincidence between the two sites: it
   is Tailwind v4's deterministic utility ordering, which is why it will hold on every site that
   composes this string.

4. **No local override rescues it.** Nothing in Property's CSS targets `data-cta-placement`.

What this means, stated plainly and left for the owner: **the estate-wide chrome fix recorded
as landing on 2026-08-23 changed the burger from `md:hidden` to `lg:hidden` and added a
`hidden`/`lg:inline-flex` pair to the CTA that has never once taken effect.** On Property the
net result of that change is the same as here — the overlap window was widened from 0-767 to
0-1023, not closed. Every site that took the kit header, or that copied this class string
before the kit existed, is a candidate. The three unknowns I did not resolve, and deliberately
did not go looking for, are: how many sites carry it, whether any has a local override, and
whether any site's `lg:` token differs.

The only residual uncertainty on Property is that its measurement is from source plus a built
stylesheet rather than a rendered DOM; a rendered check needs its own server and is outside
this package. Given three of three mechanism conditions match exactly, that uncertainty is
small — hence HIGH, not CERTAIN.

The durable fix is one character-level change in `packages/web-shared/design/layout-utils.ts`
(drop the leading `inline-flex` from `btnPrimary` and let each call site declare its own
display) or a `className` prop on the kit CTA. Both cross 18 sites. **Owner decision. Not
taken here.**
