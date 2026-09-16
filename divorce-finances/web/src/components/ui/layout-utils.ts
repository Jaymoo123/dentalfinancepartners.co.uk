export const siteContainer =
  "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 min-w-0";

export const siteContainerLg =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0";

export const contentNarrow =
  "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0";

export const sectionY = "py-16 sm:py-20 lg:py-28";

export const sectionYLoose = "py-20 sm:py-28 lg:py-36";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

/** btnPrimary without its display, size, padding and text-size utilities, for the
 *  one caller that sets its own (the header bar CTA). Composing `hidden min-h-10
 *  px-6` OVER btnPrimary is a cascade race: both utilities land at equal
 *  specificity and Tailwind's own sort, not our source order, picks the winner,
 *  silently. That is how the header CTA never hid below 1024px on any site
 *  between 2026-08-23 and 2026-09-16. Compose from the base instead. */
export const btnPrimaryBase =
  "items-center justify-center bg-orange-500 font-medium text-white tracking-wide transition-colors duration-150 hover:bg-orange-600 active:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

export const btnPrimary = `inline-flex min-h-12 px-7 py-3.5 text-sm ${btnPrimaryBase}`;

export const btnOnTeal =
  "inline-flex min-h-12 items-center justify-center bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white tracking-wide transition-colors duration-150 hover:bg-black active:bg-black disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center border border-neutral-900 bg-transparent px-7 py-3.5 text-sm font-medium text-neutral-900 tracking-wide transition-colors duration-150 hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

export const linkArrow =
  "inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600";

export const btnOnDark = btnSecondary;
