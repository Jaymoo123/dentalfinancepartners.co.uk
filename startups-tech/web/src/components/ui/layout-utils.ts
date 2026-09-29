/**
 * Site layout utilities. Row 1 of the kit-adoption gate.
 *
 * Everything the shared kit already gets right is RE-EXPORTED from
 * `packages/web-shared/design/layout-utils.ts` rather than retyped. Where this
 * file deliberately keeps a local recipe, the reason is written immediately
 * above it and names that kit file path, so `grep -n "web-shared/design/layout-utils"`
 * finds every decline as well as every adoption.
 *
 * Deleted, not ported: `siteContainer`, `btnSecondary`, `linkArrow`, `btnOnTeal`,
 * `btnOnDark` and `btnPrimaryBase`. All six had ZERO consumers anywhere under
 * `startups-tech/web/src` (`grep -rhoE` over every .tsx file). `btnOnTeal` and
 * `btnOnDark` were both aliased to the old local `btnSecondary`, a neutral-outline
 * recipe that would have been near-invisible on the dark grounds their names
 * promise. `btnPrimaryBase` is not dead weight for the header CTA either:
 * `packages/web-shared/design/chrome/SiteHeader.tsx:7` imports its own copy
 * straight from the kit, not from this file, so nothing here would ever reach
 * it. The kit has real versions of all six if one is ever needed:
 * `packages/web-shared/design/layout-utils.ts`.
 */

export {
  // Byte-identical to the local versions they replace. Pure adoption.
  siteContainerLg,
  contentNarrow,
  // Not byte-identical: the kit's rhythm is tighter (py-12 sm:py-16 md:py-20 /
  // py-16 sm:py-20 md:py-24 lg:py-28) than the old local py-16 sm:py-20 lg:py-28
  // / py-20 sm:py-28 lg:py-36. Adopted deliberately - the Property standard
  // vertical rhythm is the point of the port, and keeping a local spacing
  // scale that diverges without a stated reason is exactly the drift the gate
  // exists to stop.
  sectionY,
  sectionYLoose,
} from "@accounting-network/web-shared/design/layout-utils";

/**
 * DECLINED: `focusRing` from packages/web-shared/design/layout-utils.ts:50.
 *
 * The kit ring reads `var(--kit-focus-ring, var(--color-primary-600))`, an
 * OPT-IN token this site's globals.css does declare (see --kit-focus-ring
 * there). Re-exporting the kit string raw would still work for THIS one
 * export, but it names a different custom property than every other ring on
 * this site (`--focus-ring`), which breaks the one-grep guarantee
 * (`outline-\[var\(--focus-ring\)\]` should find every ring). Kept local so
 * every recipe in this file points at the same token.
 *
 * This site's ring is two-valued for a real reason, not a copy-paste one: the
 * proof is written out in `src/app/globals.css` above --focus-ring-on-light /
 * --focus-ring-on-brand. primary-600 measures 6.29:1 on white (this site's
 * brand hex needs no accessibility shift, unlike the amber/copper ports) but
 * 2.03-2.99:1 on the homepage hero's dark grounds (app/page.tsx:404-405,445),
 * all under the 3:1 graphic floor. What the ring must contrast with is the
 * GROUND, not the control: every recipe here carries `outline-offset-2`, so
 * the outline paints two pixels OUTSIDE the control, on whatever the section
 * is painting. Ground is an ancestor fact, so it is carried by the inherited
 * `--focus-ring` custom property: `:root` defaults it to the light value and
 * `.ground-dark` rebinds it to the on-brand white.
 */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * DECLINED: `btnPrimary` from packages/web-shared/design/layout-utils.ts:69
 * (composed from `btnPrimaryBase` at :66-67).
 *
 * Its ground is right and is adopted verbatim below via the same
 * --btn-ground/-hover/-active tokens declared in src/app/globals.css, at the
 * 700/800/900 steps the LOCKED design decision puts buttons on. What is wrong
 * is its focus ring: `btnPrimaryBase` hardcodes
 * `focus-visible:outline-primary-600`, a literal Tailwind utility class, not
 * the `--kit-focus-ring` custom property the kit's standalone `focusRing`
 * reads. That bypasses this site's --focus-ring/.ground-dark mechanism
 * entirely and would ring the button itself at 6.29:1 fine on white but at
 * 2.03-2.99:1 wherever the button sits on the homepage hero's dark grounds
 * (app/page.tsx:404-405,445) - the exact defect this port exists to fix.
 *
 * Ground: white label on #4338ca (700) = 7.90, on #3730a3 (800) = 9.93, on
 * #312e81 (900) = 11.97. All PASS 4.5:1.
 */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-[var(--btn-ground,var(--color-primary-700))] px-8 py-3.5 text-base font-bold text-white transition-all duration-150 hover:bg-[var(--btn-ground-hover,var(--color-primary-800))] active:bg-[var(--btn-ground-active,var(--color-primary-900))] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";
