/**
 * Per-calculator reveal memory for the result gate.
 *
 * Keyed by campaign/tool id so a reveal survives navigation without unlocking any
 * other calculator — a single shared key is what caused the earlier "unlock one,
 * unlock all" bug. sessionStorage, not localStorage: the reveal should outlive a
 * page change but not the browsing session.
 *
 * Shared by <ResultGate> (the five bespoke calculators) and <PremiumCalculator>,
 * so the two cannot drift on key format.
 */
const revealKey = (campaign: string) => `ptp_calc_revealed_${campaign}`;

export function wasRevealed(campaign: string): boolean {
  try {
    return window.sessionStorage.getItem(revealKey(campaign)) === "1";
  } catch {
    return false;
  }
}

export function rememberRevealed(campaign: string): void {
  try {
    window.sessionStorage.setItem(revealKey(campaign), "1");
  } catch {
    /* storage blocked — the reveal just does not survive navigation */
  }
}
