/** Layout utility tokens - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (--color-primary-*, the --btn-ground
 *  trio, --focus-ring), so these strings are the estate's; only the tokens are crypto's.
 *
 *  Two deliberate deviations from a straight re-export, both recorded below:
 *    1. focusRing is LOCAL, because the kit's points at primary-600 which fails on navy.
 *    2. The button recipes are the kit's with their embedded focus outline swapped to
 *       --focus-ring, for the same reason.
 *  Everything else is re-exported byte-identically. */

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

/** --focus-ring (globals.css) is #b86c42, NOT the navy #0e1a3a this used to hardcode. Navy is the
 *  band ground, so a navy ring on a navy section measured 1.00 and keyboard focus was invisible on
 *  every dark band. Do not point this at --brand-primary or at a ground colour again.
 *
 *  It is also NOT the kit's focusRing. The kit's is `focus-visible:outline-primary-600`, and on
 *  this site --color-primary-600 is the burnt orange #8f421f, which measures 2.42:1 on the navy
 *  band ground and fails the 3.0 graphic floor. #b86c42 was derived to clear 3.0 on all five
 *  grounds this site painted when it was derived (white 3.99, off-white 3.82, navy 4.29,
 *  slate-900 4.47, and the since-retired neutral-800 strip 3.79). Adopting the kit's constant
 *  here would silently undo that. */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/** The kit's button recipes embed their own focus outline INSIDE the class string
 *  (`focus-visible:outline-primary-600` on btnPrimary/btnSecondary/btnOnCream,
 *  `focus-visible:outline-primary-400` on btnOnDark). Keeping the local focusRing constant
 *  above is therefore not enough on its own: a plain re-export would still paint the failing
 *  ring on every button on the site. Swapping the colour utility out of the string is the fix
 *  that does not require editing packages/web-shared (which is shared with Property).
 *
 *  A string replace rather than appending an override utility on purpose: two outline-color
 *  utilities in one class list are decided by Tailwind's own emission order in the built sheet,
 *  not by the order they are written, so appending would be a cascade race. Replacing leaves
 *  exactly one outline-color utility and no race. The replacement literal appears in this file,
 *  so Tailwind's scanner emits `outline-[var(--focus-ring)]`.
 *
 *  Everything else about these recipes is the kit's: rounded-xl, font-bold, min-w-[10rem],
 *  and the --btn-ground/-hover/-active chain that globals.css:53-55 already declares, which is
 *  what keeps the navy ground with the burnt-orange hover and active states. */
const localFocus = (recipe: string) =>
  recipe.replace(
    /focus-visible:outline-primary-\d+/g,
    "focus-visible:outline-[var(--focus-ring)]",
  );

export const btnPrimary = localFocus(kitBtnPrimary);
export const btnSecondary = localFocus(kitBtnSecondary);
export const btnOnDark = localFocus(kitBtnOnDark);
export const btnOnCream = localFocus(kitBtnOnCream);

/* linkArrow (an inline text-link-with-arrow recipe) was REMOVED here on 2026-09-14. It was
 * the last neutral-* in this file and the only thing keeping it off the slate ramp, and it had
 * ZERO call sites: `grep -rn linkArrow src` returned this file and the focus-ring test only.
 * Every site link that wants this treatment writes it inline today. A dead export is not worth
 * re-measuring onto a new ramp; if one is wanted later, write it on slate-900 (17.83:1 on white,
 * 17.04:1 on slate-50) and add it back to the recipe list in src/tests/focus-ring.test.ts. */
