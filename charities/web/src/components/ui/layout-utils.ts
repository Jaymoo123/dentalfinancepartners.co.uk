export const siteContainer =
  "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 min-w-0";

export const siteContainerLg =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0";

export const contentNarrow =
  "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0";

export const sectionY = "py-16 sm:py-20 lg:py-28";

export const sectionYLoose = "py-20 sm:py-28 lg:py-36";

/* Brand colour resolves from the `primary-*` ramp in src/app/globals.css @theme,
   not from literals. --color-primary-600 IS the old #1a5c4a, so the resting
   brand colour is byte-identical; the 700/800 hover and active steps are the
   ramp's nearest steps to the old #154a3b/#0f3829 and are recorded in the
   recipes below. This module keeps its own sizing and weight: it is the site's
   local button, not the kit's, and 8 files import these exact names. */

/* Outline sits at offset-2, so its ground is the page, not the button.
   primary-600 on white measures 7.85 against the 3:1 non-text floor. */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

/* rounded-xl = var(--radius-xl) = 4px here, matching the kit header CTA, which
   is design/layout-utils.ts btnPrimary and also carries rounded-xl. These local
   buttons rendered at 0px before, so they were the only square corners left.
   hover was #154a3b, now primary-700 #16483a; active was #0f3829, now
   primary-800 #13382d. White on each: 9.63 -> 9.85 and 13.00 -> 12.89. */
export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-primary-600 px-7 py-3.5 text-sm font-medium text-white tracking-wide transition-colors duration-150 hover:bg-primary-700 active:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

export const btnOnTeal =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white tracking-wide transition-colors duration-150 hover:bg-black active:bg-black disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-neutral-900 bg-transparent px-7 py-3.5 text-sm font-medium text-neutral-900 tracking-wide transition-colors duration-150 hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

export const linkArrow =
  "inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600";

export const btnOnDark = btnSecondary;
