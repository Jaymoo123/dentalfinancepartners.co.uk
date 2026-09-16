/** Layout utility tokens - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (the --color-primary-* ramp and the
 *  --btn-ground trio), so these strings are the estate's; only the tokens are this site's.
 *
 *  This is a STRAIGHT re-export. Unlike crypto, charities and contractors-ir35, this site
 *  needs no local focusRing and no string surgery on the button recipes, because the kit's
 *  embedded `focus-visible:outline-primary-600` already resolves to the exact colour this
 *  file used to hard-code as `outline-orange-600`:
 *
 *    --color-primary-600 is declared in globals.css as oklch(64.6% 0.222 41.116), which is
 *    Tailwind v4's orange-600. Kit ring and incumbent ring are the same paint, so adopting
 *    the kit is a zero-pixel change on the ring.
 *
 *  CORRECTED 2026-09-14 (T4). The table below previously labelled that oklch as #ea580c.
 *  #ea580c is Tailwind **v3**'s orange-600 and this site emits v4, whose orange-600 is
 *  #f54900. The VERDICT is unchanged (utility against utility is identical, and every
 *  ground still clears its floor) but each ratio was off by ~0.03. Source labelling matters:
 *  a ramp UTILITY (`outline-primary-600`) and a CSS custom property do not render the same
 *  colour, and a v3 hex table copied into the next port is a documented estate incident.
 *
 *  Method: oklch -> Oklab -> LMS^3 -> linear sRGB (Bjorn Ottosson matrices) -> clamp to
 *  [0,1] -> WCAG 2.x relative luminance on the LINEAR values, i.e. no 8-bit quantisation,
 *  because the browser paints the oklch, not a hex round-trip. Grounds are hex, so those
 *  are sRGB-decoded. Calibration on Tailwind v4 slate: slate-500 #62748e on white = 4.76,
 *  slate-400 #90a1b9 on white = 2.63. (Quantising primary-600 to #f54900 first shifts the
 *  white row to 3.60; the unrounded 3.59 is the painted value.)
 *
 *  --color-primary-600 = oklch(64.6% 0.222 41.116) = #f54900 (v4 orange-600) measures,
 *  against every ground this site paints that can host a ring at outline-offset-2
 *  (graphic floor 3.0). Source is labelled per row: [util] = Tailwind ramp utility,
 *  [prop] = CSS custom property declared in globals.css.
 *    white [util]                          3.59
 *    --surface #fafaf9 [prop]              3.44
 *    neutral-50 #fafafa [util]             3.44
 *    stone-50 #fafaf9 [util]               3.44
 *    slate-50 #f8fafc [util]               3.43
 *    --hero-cream #fafaf7 [prop]           3.43
 *    primary-50 / --accent-whisper #fff7ed 3.38   (v4 orange-50 IS #fff7ed, unchanged)
 *    neutral-100 #f5f5f5 [util]            3.29
 *    stone-100 #f5f5f4 [util]              3.29
 *    --dark = slate-900 #0f172a [prop]     4.97
 *    neutral-900 #171717 [util]            4.99
 *    black [util]                          5.85
 *  Worst is stone-100 / neutral-100 at 3.29. ALL PASS.
 *  btnOnDark's `outline-primary-400` = oklch(75% 0.183 55.934) = #ff8904 (v4 orange-400,
 *  NOT v3's #fb923c) is on-dark only: 7.51 on slate-900, 7.54 on neutral-900. PASS.
 *  Grounds this site paints that FAIL 3.0 for primary-600 - slate-200 #e2e8f0 2.91,
 *  --border #e5e5e5 2.85, --btn-ground #c2410c 1.44, --accent/orange-500 #f97316 1.28,
 *  primary-600 itself 1.00 - host no focusable control: they are 1px rules,
 *  admin-dashboard progress bars, skeleton placeholders, icon tiles and static badges. If a
 *  future band uses one of those as a SECTION ground, mint a --focus-ring token here (as the
 *  other three sites did) rather than accepting an invisible ring.
 *
 *  The --btn-ground trio IS declared on this site (#c2410c / #9a3412 / #7c2d12), and the
 *  kit's chain is var(--btn-ground, var(--color-primary-600)) / -700 / -800, so the button
 *  ground survives byte-identically. White on those three is 5.18 / 7.31 / 9.37, text floor
 *  4.5, all PASS.
 *
 *  Two deliberate rendering deltas from the incumbent local copies, both estate-standard:
 *    1. sectionYLoose is the kit's py-16 sm:py-20 md:py-24 lg:py-28, not the local
 *       py-20 sm:py-28 lg:py-36. 22 call sites tighten to the Property rhythm.
 *    2. btnSecondary's border is the kit's primary-600 (#f54900, 3.59 on white, graphic
 *       floor 3.0, PASS) rather than the local --btn-ground #c2410c. The LABEL colour is
 *       unchanged: the kit's text-primary-700 is #c2410c, which is --accent-strong.
 *
 *  btnOnInk, btnOnTeal and linkArrow were REMOVED here on 2026-09-14. All three had ZERO
 *  call sites anywhere in construction-cis. The kit's btnOnDark is the on-dark recipe and
 *  btnOnCream is the on-light-hero one.
 */

export {
  siteContainer,
  siteContainerLg,
  siteContainerXl,
  contentNarrow,
  sectionY,
  sectionYLoose,
  focusRing,
  btnPrimary,
  btnPrimaryBase,
  btnSecondary,
  btnOnDark,
  btnOnCream,
  heroCreamSurface,
} from "@accounting-network/web-shared/design/layout-utils";
