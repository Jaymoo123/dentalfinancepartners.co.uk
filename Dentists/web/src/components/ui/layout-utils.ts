/** Layout utility recipes - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (--color-primary-*, the --btn-ground
 *  trio, --hero-cream), so these strings are the estate's and only the tokens are Dentists'.
 *  docs/dentists/DESIGN_DELTA.md records the approved contract: navy #001b3d is the
 *  primary-* ramp and the button ground (white label 17.15); gold #b8975d is demoted to a
 *  fixed non-text accent and is neither deleted nor darkened.
 *
 *  The container, section and button strings here were already byte-identical to the kit's,
 *  so this file is a re-export plus the two things that are genuinely local. */

export {
  siteContainer,
  siteContainerLg,
  siteContainerXl,
  contentNarrow,
  sectionY,
  sectionYLoose,
  btnOnDark,
  btnOnCream,
  heroCreamSurface,
} from "@accounting-network/web-shared/design/layout-utils";

import {
  btnPrimary as kitBtnPrimary,
  btnSecondary as kitBtnSecondary,
} from "@accounting-network/web-shared/design/layout-utils";

/** The kit bakes `focus-visible:outline-primary-600` into the button recipes, so
 *  overriding the exported `focusRing` constant below never reached them. On the navy
 *  grounds this site uses, primary-600 #2d4a6f measures 1.90 and the keyboard indicator
 *  disappears. primary-400 #5c80ab is 4.19 on navy and 4.09 on white, so the same swap
 *  the focusRing override makes is applied to the recipe strings themselves.
 *  ponytail: a string replace, not a forked copy of the kit's class lists, which would
 *  drift the moment the kit changes. */
const dentalRing = (recipe: string) =>
  recipe.replace("outline-primary-600", "outline-primary-400");

export const btnPrimary = dentalRing(kitBtnPrimary);
export const btnSecondary = dentalRing(kitBtnSecondary);

/** LOCAL OVERRIDE of the kit's `focusRing`, which outlines primary-600.
 *  Dentists puts interactive controls on the navy `.hero-brand` ground, where primary-600
 *  #2d4a6f measures 1.90 against navy and the keyboard indicator effectively disappears.
 *  primary-400 #5c80ab measures 4.09 on white and 4.19 on navy, so ONE constant clears the
 *  3:1 graphics floor on both grounds and no call site has to choose.
 *  ponytail: one ring, not an on-dark variant of every recipe (Medical needed two because
 *  its ramp is amber; a navy ramp does not). */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

/** The gold button the owner decision of 2026-09-11 explicitly preserves: gold ground,
 *  NAVY label, 6.23:1, the one button job gold keeps. `btnPrimary` above is now the kit's
 *  navy-ground/white-label standard, so this is the recipe a later phase places wherever the
 *  gold CTA should survive. A white label on gold is 2.75 and must never be written. */
export const btnGold =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-[var(--gold)] px-8 py-3.5 text-base font-bold text-[var(--navy)] transition-all duration-150 hover:bg-[var(--gold-strong)] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";
