/** Trade Tax Specialists - Layout Utilities */

export const siteContainer =
  "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 min-w-0";

export const siteContainerLg =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0";

/** Header bar only. The page measure is siteContainerLg. */
export const siteContainerXl =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-w-0";

export const contentNarrow =
  "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0";

export const sectionY = "py-12 sm:py-16 md:py-20";

export const sectionYLoose = "py-20 sm:py-28 lg:py-36";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

/**
 * Primary CTA. The ground is --btn-ground (orange-700 #c2410c), which measures 5.18:1
 * against the white label. It used to hard-code bg-orange-500, which is 2.80:1 and failed
 * both the 4.5:1 text floor and the 3:1 graphics floor on every page of the site. Colour
 * comes through the tokens so a re-hue is one edit in globals.css, and so this button and
 * web-shared's token-driven btnPrimary render identically.
 */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-[var(--btn-ground)] px-8 py-3.5 text-base font-bold text-white transition-all duration-150 hover:bg-[var(--btn-ground-hover)] active:bg-[var(--btn-ground-active)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

/** Secondary. Same box, orange outline, label at --accent-strong (orange-700, 5.18 on white). */
export const btnSecondary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl border-2 border-[var(--btn-ground)] bg-white px-8 py-3.5 text-base font-bold text-[var(--accent-strong)] transition-all duration-150 hover:border-[var(--btn-ground-hover)] hover:bg-white active:bg-[var(--accent-whisper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

/**
 * On-dark ghost. This was an alias of btnSecondary, which rendered ink-on-navy: a live
 * defect. This is the A.5 recipe, with the focus ring on the light primary step so the
 * outline is visible against the dark ground.
 */
export const btnOnDark =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-white/40 bg-white/5 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-150 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400";

/** Ink-ground CTA, for use on cream and other light non-white grounds. */
export const btnOnInk =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl bg-neutral-900 px-8 py-3.5 text-base font-bold text-white transition-all duration-150 hover:bg-black active:bg-black disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Transitional no-op. The teal brand is dead and this constant's ground has been
 * neutral-900 for some time, so the name was a fossil. Kept as an alias of btnOnInk so no
 * consumer breaks; retire the name as the phases that own those files touch them.
 */
export const btnOnTeal = btnOnInk;

export const linkArrow =
  "inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600";

/** Cream hero ground. Trade's own incumbent #fafaf7, tokenised as --hero-cream. */
export const heroCreamSurface = "bg-[var(--hero-cream)]";
