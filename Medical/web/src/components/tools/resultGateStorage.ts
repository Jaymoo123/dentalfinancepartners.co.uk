/**
 * Per-calculator reveal memory for the result gate.
 *
 * Keyed per calculator so a reveal survives navigation without unlocking any
 * other calculator: one shared key is exactly the "unlock one, unlock all" bug
 * that the old once-per-session module flag shipped. sessionStorage, not localStorage:
 * a reveal should outlive a page change, not the browsing session.
 *
 * `ma` is this site's FROZEN storage prefix (lib/tools/premium/registry.ts:11).
 * The tier segment is load-bearing, not decoration: four ids are BOTH a generic
 * slug and a premium toolId (nhs-superannuation-tiered-contribution,
 * gp-partner-drawings-planner, salaried-gp-vs-partner, consultant-private-vs-nhs),
 * so an unprefixed key would let the free calculator unlock the premium one.
 */
export type GateTier = "generic" | "premium";

const revealKey = (tier: GateTier, campaign: string) =>
  `ma_calc_revealed_${tier}_${campaign}`;

export function wasRevealed(tier: GateTier, campaign: string): boolean {
  try {
    return window.sessionStorage.getItem(revealKey(tier, campaign)) === "1";
  } catch {
    return false;
  }
}

export function rememberRevealed(tier: GateTier, campaign: string): void {
  try {
    window.sessionStorage.setItem(revealKey(tier, campaign), "1");
  } catch {
    /* storage blocked - the reveal just does not survive navigation */
  }
}
