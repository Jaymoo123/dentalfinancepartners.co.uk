/**
 * Site layout utilities. Row 1 of the kit-adoption gate.
 *
 * Everything the shared kit already gets right is RE-EXPORTED from
 * `packages/web-shared/design/layout-utils.ts` rather than retyped. Where this
 * file deliberately keeps a local recipe, the reason is written immediately
 * above it and names that kit file path, so `grep -n "web-shared/design/layout-utils"`
 * finds every decline as well as every adoption.
 *
 * P1-B (2026-10-07): `linkArrow` is DELETED, zero consumers anywhere under
 * pharmacies/web/src and no kit equivalent exists to decline against.
 * `siteContainer` is re-exported at zero consumers today (P1-E/P1-C create
 * the first ones), same U4 shape other ports used.
 */

export {
  // Byte-identical to the local versions they replace. Pure adoption.
  siteContainer,
  siteContainerLg,
  contentNarrow,
  // Not byte-identical: the kit's rhythm is tighter (py-12 sm:py-16 md:py-20 /
  // py-16 sm:py-20 md:py-24 lg:py-28) than the old local py-16 sm:py-20 lg:py-28
  // / py-20 sm:py-28 lg:py-36. Adopted deliberately - the Property standard
  // vertical rhythm is the point of the port, and keeping a local spacing
  // scale that diverges without a stated reason is exactly the drift the gate
  // exists to stop. Tightens 10 call sites (8 sectionY, 2 sectionYLoose).
  sectionY,
  sectionYLoose,
} from "@accounting-network/web-shared/design/layout-utils";

/**
 * DECLINED: `focusRing` from packages/web-shared/design/layout-utils.ts:50.
 *
 * The kit ring reads `var(--kit-focus-ring, var(--color-primary-600))`, a
 * different custom property than the one every other ring on this site
 * points at (`--focus-ring`, declared in src/app/globals.css alongside
 * `--kit-focus-ring`, both bound to the same brand-950 value via A4). Kept
 * local so every recipe in this file shares the same token and one grep
 * (`outline-\[var\(--focus-ring\)\]`) finds every ring.
 */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * DECLINED (ring only): `btnPrimary` from
 * packages/web-shared/design/layout-utils.ts:69 (composed from
 * `btnPrimaryBase` at :66-67).
 *
 * Ground is adopted via the `--btn-ground/-hover/-active` tokens declared in
 * src/app/globals.css (the brand-950 trio: white label 12.18/13.48/14.20,
 * all PASS). What is wrong is the kit's focus ring: `btnPrimaryBase`
 * hardcodes `focus-visible:outline-primary-600`, a literal Tailwind utility
 * a call site cannot override, and on this site primary-600 measures 1.42
 * against the brand-950 button ground: invisible. Every other character
 * below is the kit's, unmodified. No literal hex survives.
 */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] px-8 py-3.5 text-base touch-manipulation items-center justify-center rounded-xl bg-[var(--btn-ground,var(--color-primary-600))] font-bold text-white transition-all duration-150 hover:bg-[var(--btn-ground-hover,var(--color-primary-700))] active:bg-[var(--btn-ground-active,var(--color-primary-800))] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * DECLINED (ring only): `btnSecondary` from
 * packages/web-shared/design/layout-utils.ts:72-73. Zero consumers today;
 * kept local rather than deleted (unlike `linkArrow`) because the kit's own
 * disposition table lists it `local, ring wrapped`, not `delete`. Same ring
 * fix as `btnPrimary`: the kit hardcodes `focus-visible:outline-primary-600`.
 * Every other character below is the kit's, unmodified.
 */
export const btnSecondary =
  "inline-flex min-h-12 min-w-[10rem] touch-manipulation items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-8 py-3.5 text-base font-bold text-primary-700 transition-all duration-150 hover:bg-white hover:text-primary-700 hover:border-primary-700 active:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * DECLINED (ring only): `btnOnDark` from
 * packages/web-shared/design/layout-utils.ts:76-77. Zero consumers today (the
 * local pre-port file aliased this name to the secondary recipe, a real
 * defect: a `slate-900` border and text for a dark ground). Re-exported
 * wrapped, same ring fix as `btnPrimary`: the kit hardcodes
 * `focus-visible:outline-primary-400`. That ring is not mounted on any
 * ground in phase 1 - this export has no consumer yet - so no contrast row
 * is measured here; the phase that first mounts it owns that measurement.
 * Every other character below is the kit's, unmodified.
 */
export const btnOnDark =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-white/40 bg-white/5 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-150 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";
