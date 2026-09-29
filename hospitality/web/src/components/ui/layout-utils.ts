/**
 * Site layout utilities. Row 1 of the kit-adoption gate.
 *
 * Everything the shared kit already gets right is RE-EXPORTED from
 * `packages/web-shared/design/layout-utils.ts` rather than retyped. Where this
 * file deliberately keeps a local recipe, the reason is written immediately
 * above it and names that kit file path, so `grep -n "web-shared/design/layout-utils"`
 * finds every decline as well as every adoption.
 *
 * R1 C (2026-09-29): the local secondary-button wrapper is DELETED too, same
 * reasoning and same proof: zero consumers anywhere under hospitality/web/src.
 * A recipe with no call site is a dead rule that the next phase copies. The
 * phase that needs a secondary button re-declines the kit export then, with a
 * live consumer to point at.
 *
 * P1-B (2026-09-29): `btnOnTeal` and `linkArrow` are DELETED, zero consumers
 * and `btnOnTeal`'s name is from another site's palette. `siteContainer` is
 * re-exported at zero consumers today (U4 shape: the backdrop/hero work in
 * later phases creates the first ones, same reasoning startups-tech used).
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
  // exists to stop.
  sectionY,
  sectionYLoose,
} from "@accounting-network/web-shared/design/layout-utils";

/**
 * DECLINED: `focusRing` from packages/web-shared/design/layout-utils.ts:50.
 *
 * The kit ring reads `var(--kit-focus-ring, var(--color-primary-600))`, a
 * different custom property than the one every other ring on this site
 * points at (`--focus-ring`, declared in src/app/globals.css alongside
 * `--kit-focus-ring`, both currently bound to the light value only). Kept
 * local so every recipe in this file shares the same token and one grep
 * (`outline-\[var\(--focus-ring\)\]`) finds every ring.
 */
export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * DECLINED: `btnPrimary` from packages/web-shared/design/layout-utils.ts:69
 * (composed from `btnPrimaryBase` at :66-67).
 *
 * Ground is adopted verbatim via the `--btn-ground/-hover/-active` tokens
 * declared in src/app/globals.css (600/700/800 steps, LOCKED: buttons stay on
 * the 600 step on this site, the brand hex passes the white-label floor at 5.09).
 * What is wrong is the kit's focus ring: `btnPrimaryBase` hardcodes
 * `focus-visible:outline-primary-600`, a literal Tailwind utility a call site
 * cannot override, bypassing this site's `--focus-ring` mechanism. Every
 * other character below is the kit's, unmodified.
 */
export const btnPrimary =
  "inline-flex min-h-12 min-w-[10rem] px-8 py-3.5 text-base touch-manipulation items-center justify-center rounded-xl bg-[var(--btn-ground,var(--color-primary-600))] font-bold text-white transition-all duration-150 hover:bg-[var(--btn-ground-hover,var(--color-primary-700))] active:bg-[var(--btn-ground-active,var(--color-primary-800))] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";

/**
 * DECLINED (ring only): `btnOnDark` from
 * packages/web-shared/design/layout-utils.ts:76-77. Zero consumers today (the
 * local pre-port file aliased this name to the secondary recipe, a real defect: a
 * `neutral-900` border and text on a dark ground). Re-exported wrapped, same
 * ring fix as `btnPrimary`: the kit hardcodes
 * `focus-visible:outline-primary-400` (the primary-400 step on this site's
 * ramp). That ring is not mounted on any ground in phase 1 - this export has
 * no consumer yet - so no contrast row is measured here; the phase that first
 * mounts it owns that measurement. Every other character below is the kit's,
 * unmodified.
 */
export const btnOnDark =
  "inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-white/40 bg-white/5 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-150 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]";
