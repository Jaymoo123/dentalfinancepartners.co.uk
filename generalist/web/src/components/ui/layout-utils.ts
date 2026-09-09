/** Layout utility tokens - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (--color-primary-*, --btn-ground trio),
 *  so these strings are the estate's; only the tokens are generalist's.
 *  DESIGN_DELTA.md records the approved deviations (btnPrimary ground at the 700 step). */

export {
  siteContainer,
  siteContainerLg,
  siteContainerXl,
  contentNarrow,
  sectionY,
  sectionYLoose,
  focusRing,
  btnPrimary,
  btnSecondary,
  btnOnDark,
  btnOnCream,
  heroCreamSurface,
} from "@accounting-network/web-shared/design/layout-utils";

/** Inline text link with arrow, low-emphasis secondary actions (local idiom, kept). */
export const linkArrow =
  "inline-flex items-center gap-1.5 py-0.5 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600";

/** DEPRECATED - only consumer is locations/[slug], whose gradient CTA band retires in
 *  the port's locations phase; this export dies with it. Do not use in new code. */
export const btnOnOrange =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-900 px-8 py-3.5 text-base font-bold text-white transition-colors duration-150 hover:bg-black active:bg-black disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
