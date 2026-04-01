/** Shared layout primitives — mobile-first, Medical Accounts */
export const siteContainer =
  "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 min-w-0";

/** Wider reading width for marketing homepage (Sidekick-style rhythm). */
export const siteContainerLg =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0";

export const contentNarrow =
  "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0";

export const sectionY = "py-12 sm:py-16 md:py-20";

export const sectionYLoose = "py-16 sm:py-20 md:py-24 lg:py-28";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--copper)]";

/** Primary CTA — copper surface, white label (distinctive medical brand) */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-full bg-[var(--copper)] px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-200 hover:bg-[var(--copper-strong)] hover:shadow-md active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--copper)]";

/** Secondary — navy outline, for use on light backgrounds */
export const btnSecondary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-full border border-[var(--navy)]/25 bg-transparent px-6 py-3 text-sm font-semibold tracking-tight text-[var(--navy)] transition-all duration-200 hover:border-[var(--navy)] hover:bg-[var(--navy)]/5 active:bg-[var(--navy)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--copper)]";

/** Ghost / on-dark: light border */
export const btnOnDark =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--copper)]";
