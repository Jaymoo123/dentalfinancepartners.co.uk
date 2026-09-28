# P0C — CSS, token and contrast audit — startups-tech (pre-port)

Read-only audit. Site: `startups-tech/web`. Reference: `Property/web`. Kit: `packages/web-shared/design/`.

## §9.1 kit-adoption gate — output verbatim (pre-port)

```
1  layout-utils  : 0
2  kit adopted   : 1 distinct / 5 call sites
2a kit declined  : 0 comment references naming a kit path
2b homepage mktg : adopted=0 declined=0
3  webfont       : (empty)
4  backdrop      : 0
5  eyebrow ratio : Eyebrow=0 section-label=9
6  rings not the token: (none printed)
7  gradient grounds to measure stop by stop:
     app/page.tsx
8  ring guard    : walks=0 guards-the-guard=0

marker row: ping=0 stats=0 backdrop=0 rounded-full=0
```

Row 1 = 0: `components/ui/layout-utils.ts` is a full hand-rolled fork, no re-export, no
deviation comment. Row 2: the one adopted component is `LeadCTAPanel` (5 call sites,
about/for/for-[slug]/services/services-[slug]). Row 2b fails outright: neither adopted
nor declined on the homepage or `components/marketing/*` (that dir does not exist).
Row 3/4/8 all fail. Row 5 fails by 9-0 (comment-stripped). This reads like construction-cis
pre-uplift, not like generalist.

## Unlayered-rule table

`globals.css` (38 lines, read as `utf-8-sig`, no BOM found) has **no `@layer` block at
all**. Everything in the file is therefore "outside a layer" in the sense the playbook
means, but only one rule is a **selector rule** that competes with Tailwind utilities on
specificity; the rest are `@import`/`@source` directives or token/body declarations that
don't compete with utility classes the way a bare selector does.

| selector | beats which Tailwind utilities | note |
|---|---|---|
| `.prose table` (`display:block;overflow-x:auto;max-width:100%`) | any `table-*`/`overflow-*`/`max-w-*` utility applied directly to a `<table>` inside `.prose` | deliberate, commented, scroll-fix for wide tables in blog HTML bodies. Confirmed present in served CSS as `.prose table{max-width:100%;display:block;overflow-x:auto}`, 30 total `.prose` rules served, 1 `.section-label` rule served. |
| `:root` / `body` | none (custom-property and body-level declarations, not utility-competing selectors) | listed for completeness only |

No unlayered rule here silently overrides a utility unintentionally. Count of **problem**
unlayered rules: **0**. The one bare selector is intentional and documented.

## layout-utils divergence table

Site file has no header comment and no import of the kit file (`grep -c` on the kit path = 0).

| export | kit recipe | site recipe | divergence |
|---|---|---|---|
| `siteContainer` / `siteContainerLg` / `contentNarrow` | identical classes | identical | none |
| `siteContainerXl` | `max-w-7xl` | **absent** | dropped export |
| `sectionY` | `py-12 sm:py-16 md:py-20` | `py-16 sm:py-20 lg:py-28` | site is taller at every breakpoint, different bp (`lg` vs `md`) |
| `sectionYLoose` | `py-16 sm:py-20 md:py-24 lg:py-28` | `py-20 sm:py-28 lg:py-36` | same shape, taller and fewer steps |
| `focusRing` | `outline-[var(--kit-focus-ring,var(--color-primary-600))]` | `outline-[#4f46e5]` | hardcoded hex, no token indirection, cannot rebind on dark grounds |
| `btnPrimary` | rounded-xl, `rounded-xl`, reads `--btn-ground*` tokens, min-w-[10rem] | square corners, hardcoded `#4f46e5`/`#4338ca`/`#3730a3`, no min-width | different shape (no radius), no token hook |
| `btnPrimaryBase` | exported separately for header-CTA composition | **absent**, no split base/size | the kit's cascade-race fix (header CTA hidden-below-1024 bug) does not apply here; site composes its own single recipe |
| `btnSecondary` | rounded-xl, brand-coloured outline (`border-primary-600`, `text-primary-700`) | square, neutral-900 border/text, hover fills solid black | not a brand-secondary at all, it is a neutral ghost button; visually unrelated to kit's |
| `btnOnDark` | light border on dark ground, `border-white/40`, backdrop-blur | **aliased to `btnSecondary`** (neutral border/text) | on-dark button is not actually styled for a dark ground; renders near-invisible neutral-900-bordered button on a dark section (see hero contrast note below) |
| `btnOnTeal` | not present in kit (site-only alias) | aliased to `btnSecondary` | site-only invention, not a kit divergence but note it exists |
| `heroCreamSurface` / `btnOnCream` | present (cream hero support) | **absent entirely** | no cream-hero support ported |
| `linkArrow` | not in kit's current file (site-only) | present | site-only addition |

Every exported hex is a literal `#4f46e5`/`#4338ca`/`#3730a3`, not a var() indirection.
Brand recolour or dark-ground rebind touches every one of these strings by hand.

## Undefined-token table

`var(--...)` reads found in `web/src` (tsx/ts/css): `--background`, `--surface`,
`--brand-primary`, `--ink`, `--ink-soft`, `--muted`, `--border`. All seven are **defined**
in `globals.css :root`. `--surface-elevated` is defined but not read anywhere in `src`
(dead token, harmless). **No undefined-property reads found in site code.**

**Separate, more serious gap, found by checking the one adopted kit component:**
`LeadCTAPanel.tsx` (`packages/web-shared/design/marketing/LeadCTAPanel.tsx:170-171`) emits
literal Tailwind utility classes `bg-primary-50 text-primary-600 ring-primary-100` (and a
dark variant). These are **not** `var()` reads, they are Tailwind color-scale utilities
that require a `--color-primary-50..950` ramp declared in an `@theme` block. `globals.css`
has **no `@theme` block at all**. Confirmed against the served CSS
(`/_next/static/css/a6ee166f54c54978.css`): zero rules for `bg-primary-50`,
`text-primary-600`, or `ring-primary-100` — `grep -c "primary-" served.css` = 1, and that
one hit is an unrelated `var(--...primary...)` fallback chain, not these classes. **The
one kit component this site adopted renders its badge with no background, no text colour
and no ring, on all 5 pages that use it** (about, for, for/[slug], services,
services/[slug]).

## Contrast table — `#4f46e5`

Page ground: `globals.css :root { --background: #ffffff }`, read by `body{background:var(--background)}`.
**The site's actual ground is white**, identical to the CSS-defaults ground, so both
columns are the same measurement.

| ground | ratio | 3:1 graphic | 4.5:1 text | 4.5:1 ground-under-white-text |
|---|---|---|---|---|
| `#ffffff` (spec default) | **6.29:1** | PASS | PASS | PASS |
| `#ffffff` (site's actual `--background`) | **6.29:1** (same colour) | PASS | PASS | PASS |

Clears all three floors on both, same order as charities (7.85, needed neither token).
**Recommendation: `--brand-primary-text` and `--brand-primary-ground` are NOT needed on
this site.** Every observed use of `#4f46e5` as text-on-white or white-text-on-brand
(hero bands on about/for/services at `bg-[#4f46e5]` with white text/copy, and dozens of
`text-[#4f46e5]` links/labels on white) is a passing use at 6.29:1.

**One use not covered by the single-ratio model:** `btnOnDark` (aliased to `btnSecondary`,
`border-neutral-900 text-neutral-900`) is used on dark grounds via the shared alias
consumers may reach for; a neutral-900 border/text on a dark navy ground (`#1e1b4b`,
homepage hero) would be low-contrast if actually used there. Not currently called
anywhere in `web/src` search — no live defect found, but the recipe is a trap if a phase-1
page reaches for it on a dark section, since its name promises dark-ground safety it does
not deliver.

## Ramp finding

No dedicated warning/duty/deadline ramp exists. `amber-*` appears only in **admin analytics**
(internal dashboard, `app/admin/analytics/*`, not public) and in **research page callouts**
(`amber-50/200/400/600/800` boxes flagging data anomalies/caveats on the stats-index pages).
Neither is a public deadline/duty CTA ramp. **No amber/orange violation of the locked
design decision found on public marketing pages** — the locked rule has nothing to
violate here because the site never built a warning-ramp component. Flag as a phase-1 gap,
not a phase-0 defect.

## Font finding

Confirmed: no `next/font` import anywhere in `layout.tsx` (grep empty). `globals.css`
sets `body{font-family:ui-sans-serif,system-ui,-apple-system,sans-serif}`. Served CSS's
own Tailwind-default font stacks (`var(--font-sans)` etc.) are unbound since nothing
defines `--font-sans`/`--font-mono` either. **Site renders in the browser's system UI
font, confirmed live against the served CSS**, matching the pre-uplift crypto/charities
state before `7dfe04b3`/`ba7b184a` added Geist.

## Dead-class / served-CSS selector counts

Served stylesheet `/_next/static/css/a6ee166f54c54978.css` (78,412 bytes):
- `.prose*` rules: **30**
- `.section-label` rules: **1**
- `bg-primary-50` / `text-primary-600` / `ring-primary-100`: **0** (see undefined-token
  section — these are referenced by the one adopted kit component but never generated)

## Ranked findings

**Serious (renders wrong or invisible today):**
1. `LeadCTAPanel`'s badge (`bg-primary-50 text-primary-600 ring-primary-100`) has zero
   matching CSS on all 5 pages that render it — no `@theme` primary ramp defined. The
   badge is invisible/unstyled right now, in production-equivalent local build.
2. `layout-utils.ts` is a 100% hand-rolled fork with 9+ hardcoded `#4f46e5` occurrences
   and no token indirection; any future brand recolour or dark-ground rebind is a
   file-by-file hex hunt, not a token edit.
3. `btnOnDark` is aliased to a neutral-border/neutral-text `btnSecondary` recipe, not an
   actual dark-ground-safe treatment; unused today but will silently under-contrast if a
   phase-1 page reaches for it on a dark section.

**Minor (will matter in phase 1, not broken today):**
4. No webfont (system-ui), no backdrop component, no cream-hero support
   (`heroCreamSurface`/`btnOnCream` dropped), no ring guard test, `Eyebrow`/`section-label`
   ratio 0/9 (inverted from kit's intent), no dedicated warning/duty ramp component.
5. Kit adoption is minimal: 1 distinct component / 5 call sites, 0 on the homepage, 0
   marketing components, no documented declines (row 2a = 0) — closer to construction-cis
   pre-uplift than to generalist.
6. `sectionY`/`sectionYLoose` breakpoint and spacing values diverge from the kit's without
   a stated reason.

## False premises / could-not-do

- None of the brief's premises were found wrong. Body background is genuinely `#ffffff`,
  so the "on white" vs "on page ground" columns collapse to one measurement, exactly as
  found — reported as one ratio, both columns filled per the instruction, not skipped.
- Could not run `next build`/`next dev` (hard rule) or inspect any other page's served CSS
  beyond the homepage bundle hash; only one CSS file is emitted per the observed link, so
  this is not believed to be a gap.

Scratch used and deleted: `.../scratchpad/port/p0c/` (curl output only, removed).
