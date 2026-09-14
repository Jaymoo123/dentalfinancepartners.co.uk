/** Layout utility tokens - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (the --color-primary-* ramp,
 *  --focus-ring, --btn-radius), so these strings are the estate's; only the tokens are
 *  this site's.
 *
 *  Two deliberate deviations from a straight re-export, both recorded below:
 *    1. focusRing is LOCAL, because the kit's points at primary-600, which on this site
 *       is the brand cyan #0e7490 and measures 1.00 on the primary-600 ground, 1.70 on
 *       primary-800 and 2.50 on the cyan-950 hero gradient stop.
 *    2. The button recipes are the kit's with their embedded focus outline swapped to
 *       --focus-ring, for the same reason.
 *  Everything else is re-exported byte-identically.
 *
 *  The --btn-ground trio is NOT declared on this site on purpose. The kit's own fallback
 *  chain is var(--btn-ground, var(--color-primary-600)) / -700 / -800, and this site's
 *  ramp binds those three steps to cyan-700 #0e7490, cyan-800 #155e75 and cyan-900
 *  #164e63 - which is exactly the bg-cyan-700 / hover:bg-cyan-800 / active:bg-cyan-900
 *  this file painted locally before the adoption. The button ground therefore survives
 *  byte-identically with no extra token. White on those three is 5.36 / 7.27 / 9.11,
 *  text floor 4.5, all PASS.
 */

import {
  btnPrimary as kitBtnPrimary,
  btnSecondary as kitBtnSecondary,
  btnOnDark as kitBtnOnDark,
  btnOnCream as kitBtnOnCream,
} from "@accounting-network/web-shared/design/layout-utils";

export {
  siteContainer,
  siteContainerLg,
  siteContainerXl,
  contentNarrow,
  sectionY,
  sectionYLoose,
  heroCreamSurface,
} from "@accounting-network/web-shared/design/layout-utils";

/** --focus-ring (globals.css) is #0891b2 - cyan-600, the value this site's ramp already
 *  carries at --color-primary-500 and at --chart-3. It is NOT the brand cyan #0e7490 that
 *  this constant used to name as `outline-cyan-700`, and it is NOT the kit's
 *  `outline-primary-600`, which on this site resolves to that same #0e7490.
 *
 *  The ring sits at outline-offset-2, so its ground is the surface behind the control, and
 *  this site paints dark cyan ones. #0e7490 measures 2.50 on the cyan-950 stop and 1.70 on
 *  the cyan-900 stop of the /locations/[slug] hero gradient, where both btnPrimary and the
 *  Breadcrumb live, all under the 3.0 graphic floor. #0891b2 clears 3.0 on every flat
 *  ground this site paints that can host a ring (worst is slate-100 at 3.36, white 3.68,
 *  neutral-900 4.11, slate-900 4.85, cyan-950 4.85) and on every composited gradient stop
 *  that hosts one. The full table is in globals.css.
 *
 *  Do not point this at --brand-primary, --accent, or any primary-600/700/800 step again:
 *  those ARE the ground on this site's cyan bands, so the ring would measure ~1.0 there.
 *  It is written as a literal hex rather than var(--color-primary-500) on purpose:
 *  primary-500 is consumed by no utility, so Tailwind tree-shakes the theme variable away
 *  and the var() would resolve to nothing, invalidating the whole outline-color
 *  declaration and painting no ring at all. */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/** The kit's button recipes embed their own focus outline INSIDE the class string
 *  (`focus-visible:outline-primary-600` on btnPrimary/btnSecondary/btnOnCream,
 *  `focus-visible:outline-primary-400` on btnOnDark). Keeping the local focusRing constant
 *  above is therefore not enough on its own: a plain re-export would still paint the
 *  failing ring on every button on the site. Swapping the colour utility out of the string
 *  is the fix that does not require editing packages/web-shared (shared with Property,
 *  trap 12).
 *
 *  A string replace rather than appending an override utility on purpose: two
 *  outline-color utilities in one class list are decided by Tailwind's emission order in
 *  the built sheet, not by the order they are written, so appending would be a cascade
 *  race. Replacing leaves exactly one outline-color utility and no race. The replacement
 *  literal appears in this file, so Tailwind's scanner emits
 *  `outline-[var(--focus-ring)]`. */
const localFocus = (recipe: string) =>
  recipe.replace(
    /focus-visible:outline-primary-\d+/g,
    "focus-visible:outline-[var(--focus-ring)]",
  );

export const btnPrimary = localFocus(kitBtnPrimary);
export const btnSecondary = localFocus(kitBtnSecondary);
export const btnOnDark = localFocus(kitBtnOnDark);
export const btnOnCream = localFocus(kitBtnOnCream);

/* btnOnTeal and linkArrow were REMOVED here on 2026-09-14. Both had ZERO call sites
 * (`grep -rn 'btnOnTeal\|linkArrow' src` returned this file only), and both were the last
 * hand-rolled neutral-900 recipes keeping this module off the kit. Dead exports are not
 * worth re-grounding onto a new ring; the kit's btnOnDark is the on-dark recipe now, and
 * btnOnCream is the on-light-hero one. If an inline text-link-with-arrow is wanted later,
 * write it on slate-900 and add it to the recipe list in src/tests/focus-ring.test.ts. */
