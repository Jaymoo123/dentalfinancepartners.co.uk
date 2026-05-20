/**
 * Shared layout primitives + button classes.
 *
 * Uses canonical CSS variables (--brand-primary, --brand-on-primary,
 * --ink, --muted, --surface, --border, --background) which every site
 * aliases to its own brand colours in its globals.css. This file
 * therefore renders correctly on every site without per-site forks.
 */

export const siteContainer =
  "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 min-w-0";

/** Wider reading width for marketing homepage. */
export const siteContainerLg =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0";

export const contentNarrow =
  "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0";

export const sectionY = "py-12 sm:py-16 md:py-20";

export const sectionYLoose = "py-16 sm:py-20 md:py-24 lg:py-28";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]";

/** Primary CTA: brand surface + brand-on-primary label. */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold tracking-tight text-[var(--brand-on-primary)] shadow-sm transition-all duration-200 hover:bg-[var(--brand-primary-strong)] hover:shadow-md active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]";

/** Secondary: ink outline, for use on light backgrounds. */
export const btnSecondary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-full border border-[var(--ink)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--ink)] transition-all duration-200 hover:border-[var(--ink)] hover:bg-[var(--ink)]/5 active:bg-[var(--ink)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]";

/** Ghost / on-dark: light border. */
export const btnOnDark =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]";
