/** Shared layout utilities — the Property standard. Brand ramp is `primary-*`; each
 *  consuming site defines --color-primary-50..950 in its own @theme block. */

export const siteContainer =
  "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 min-w-0";

export const siteContainerLg =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 min-w-0";

export const siteContainerXl =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-w-0";

export const contentNarrow =
  "mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 min-w-0";

export const sectionY = "py-12 sm:py-16 md:py-20";

export const sectionYLoose = "py-16 sm:py-20 md:py-24 lg:py-28";

/**
 * Focus ring.
 *
 * Every recipe here carries `outline-offset-2`, so the outline paints two
 * pixels OUTSIDE the control, on whatever the SECTION is painting. What the
 * ring must contrast with is therefore the ground, which is an ancestor fact
 * the control cannot know. That is why the colour is read from an inherited
 * custom property rather than pinned here.
 *
 * Why it changed: pinned to `outline-primary-600`, this ring measured 1.18:1
 * against an amber brand hero and 2.42:1 against a navy one, both under the
 * 3:1 graphic floor and the first effectively invisible. It is reached through
 * components like Breadcrumb, whose internal ring a call site cannot override.
 *
 * OPT-IN ON PURPOSE. The hook is `--kit-focus-ring`, a variable no site
 * declared before this change, so every site that does not opt in falls back
 * to `--color-primary-600` and renders byte-identically. That is deliberate
 * rather than lazy: the obvious version of this fix reads `--focus-ring`
 * directly, and three live sites (charities, contractors-ir35, crypto) declare
 * that as a single FLAT colour with no dark-ground rebind. charities' own
 * globals.css documents its value measuring 1.98 on one of its grounds.
 * Reading `--focus-ring` here would therefore have silently repainted rings on
 * three live sites to a value nobody had measured against the grounds the kit
 * paints them on, which is a lateral move of unknown sign.
 *
 * To opt in, declare `--kit-focus-ring` and rebind it wherever the ground
 * flips, the way a `.ground-dark` section class already rebinds `--focus-ring`.
 * Point it at your existing ring token rather than a second hex, so a site
 * keeps ONE ring mechanism and one grep finds every ring.
 */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))]";

/** Primary CTA - brand background, white text.
 *  The ground reads --btn-ground/--btn-ground-hover/--btn-ground-active with the
 *  600/700/800 primary steps as fallbacks. Property's emerald-600 carries white
 *  text at 4.54:1, but not every brand ramp does at the 600 step (orange-600 is
 *  3.56:1), and L.2 says such sites shift the ground to the 700 step. Declaring
 *  the three tokens in a site's :root is that shift; leaving them undeclared
 *  keeps the 600-step behaviour byte-identically. */
/** btnPrimary without its display, size, padding and text-size utilities, for the
 *  one caller that sets its own (the header bar CTA). Composing `hidden min-h-10
 *  px-6` OVER btnPrimary is a cascade race: both utilities land at equal
 *  specificity and Tailwind's own sort, not our source order, picks the winner,
 *  silently. That is how the header CTA never hid below 1024px on any site
 *  between 2026-08-23 and 2026-09-16. Compose from the base instead. */
export const btnPrimaryBase =
  "touch-manipulation items-center justify-center rounded-xl bg-[var(--btn-ground,var(--color-primary-600))] font-bold text-white transition-all duration-150 hover:bg-[var(--btn-ground-hover,var(--color-primary-700))] active:bg-[var(--btn-ground-active,var(--color-primary-800))] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

export const btnPrimary = `inline-flex min-h-12 min-w-[10rem] px-8 py-3.5 text-base ${btnPrimaryBase}`;

/** Secondary - brand outline */
export const btnSecondary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-8 py-3.5 text-base font-bold text-primary-700 transition-all duration-150 hover:bg-white hover:text-primary-700 hover:border-primary-700 active:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";

/** Ghost / on-dark - Light border */
export const btnOnDark =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-white/40 bg-white/5 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-150 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

/**
 * Cream hero palette, used by the Services and Resources pages.
 *
 * These heroes used to be navy with a white brick etch. Cream inverts that: a
 * warm ground with the brickwork drawn in navy, and the copy in navy rather
 * than white. The copy colours are ordinary slate classes, but the cream itself
 * is a one-off value, so it lives here rather than being retyped across eleven
 * page files where it would drift.
 *
 * #fbfaf7 is a very light warm off-white — greyed rather than yellow, so it
 * separates from the pure-white sections below without reading as cream-cream.
 * slate-900 on it measures about 17:1, comfortably past WCAG AA at any size.
 */
export const heroCreamSurface = "bg-[var(--hero-cream,#fbfaf7)]";

/**
 * Hero secondary CTA on cream. The navy outline is the counterpart of the
 * white-outline button the navy heroes use: it inverts on hover so the button
 * still has somewhere to go, and it does not compete with the brand primary
 * sitting next to it.
 */
export const btnOnCream =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-slate-900 bg-transparent px-8 py-3.5 text-base font-bold text-slate-900 transition-all duration-150 hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600";
