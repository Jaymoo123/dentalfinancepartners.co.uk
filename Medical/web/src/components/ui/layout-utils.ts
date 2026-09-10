/** Layout utility recipes - the Property standard, consumed from the shared design kit.
 *  Brand behaviour comes from tokens in globals.css (--color-primary-*, the --btn-ground
 *  trio, --hero-cream), so these strings are the estate's and only the tokens are Medical's.
 *  docs/medical/DESIGN_DELTA.md records the approved deviations: the button ground is
 *  --btn-ground #a0622b (white label 4.91), NOT the live brand hex #b87333, which measures
 *  3.79 on white and fails the 4.5:1 text floor. */

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

/** Focus ring for controls sitting on the navy ground.
 *  The kit's `focusRing` outlines primary-600, which is near-invisible against
 *  --navy #001b3d, so a keyboard user loses the focus indicator entirely on any
 *  dark section. The kit has no exported on-dark variant; its `btnOnDark` recipe
 *  solves the same problem inline with outline-primary-400, so this mirrors that
 *  choice rather than editing the kit (which would change Property and 14 other
 *  sites). ponytail: one constant, not an on-dark variant of every recipe. */
export const focusRingOnDark =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";
