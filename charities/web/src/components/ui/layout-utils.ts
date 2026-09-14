/** Layout utility tokens - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (--color-primary-*, --focus-ring,
 *  --radius chain), so these strings are the estate's; only the tokens are charities'.
 *
 *  Two deliberate deviations from a straight re-export, both recorded below:
 *    1. focusRing is LOCAL, because the kit's points at primary-600, which measures
 *       1.88 on this site's primary-900 hero and 2.27 on the kit's slate-900 footer.
 *    2. The button recipes are the kit's with their embedded focus outline swapped to
 *       --focus-ring, for the same reason.
 *  Everything else is re-exported byte-identically.
 *
 *  The --btn-ground trio is NOT declared on this site on purpose: the kit's own
 *  fallback chain is var(--btn-ground, var(--color-primary-600)) / -700 / -800,
 *  which is exactly the ground/hover/active this file painted locally before the
 *  adoption, so the green survives byte-identically with no extra token. White on
 *  primary-600 is 7.85, on 700 10.38, on 800 12.87; text floor 4.5:1, all PASS. */

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

/** --focus-ring (globals.css) is #3b8871, this site's own primary-500, NOT the
 *  primary-600 #1a5c4a this constant used to name. The ring sits at
 *  outline-offset-2, so its ground is the surface behind the control, and this site
 *  paints dark ones: primary-900 (homepage hero and the scrutiny band), slate-900
 *  (the kit footer), slate-800 (/services/[slug], /for/[slug]). #1a5c4a measures
 *  1.88 / 2.27 / 1.86 on those three, all under the 3.0 graphic floor, so keyboard
 *  focus was invisible there. #3b8871 clears 3.0 on all nine grounds that can host a
 *  ring (white 4.25 down to primary-800 3.03); the full table is in globals.css.
 *  Do not point this at --brand-primary or at any primary-600/700 step again. */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/** The kit's button recipes embed their own focus outline INSIDE the class string
 *  (`focus-visible:outline-primary-600` on btnPrimary/btnSecondary/btnOnCream,
 *  `focus-visible:outline-primary-400` on btnOnDark). Keeping the local focusRing
 *  constant above is therefore not enough on its own: a plain re-export would still
 *  paint the failing ring on every button. Swapping the colour utility out of the
 *  string is the fix that does not require editing packages/web-shared (shared with
 *  Property, trap 12).
 *
 *  A string replace rather than appending an override utility on purpose: two
 *  outline-color utilities in one class list are decided by Tailwind's emission order
 *  in the built sheet, not by the order they are written, so appending would be a
 *  cascade race. Replacing leaves exactly one outline-color utility and no race. The
 *  replacement literal appears in this file, so Tailwind's scanner emits
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

/** Inline text link with arrow, low-emphasis secondary actions (local idiom, kept:
 *  one live call site, src/app/calculators/page.tsx:63). Re-grounded onto --focus-ring
 *  with the recipes above; the text colours are unchanged (slate-900 is 17.85 on white). */
export const linkArrow =
  "inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]";

/* btnOnTeal was REMOVED here on 2026-09-14. It had ZERO call sites
 * (`grep -rn btnOnTeal src` returned this file only). A dead export is not worth
 * re-grounding onto a new ring; the kit's btnOnDark is the on-dark recipe now. */
