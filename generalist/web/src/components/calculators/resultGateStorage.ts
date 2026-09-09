/**
 * Per-calculator reveal memory for the result gate. Ported from Property.
 *
 * Keyed by campaign/tool id so a reveal survives navigation without unlocking any
 * other calculator - a single shared key is what caused the earlier "unlock one,
 * unlock all" bug (which is exactly what PremiumCalculator's module-global flag
 * was, before it was re-keyed onto this). sessionStorage, not localStorage: the
 * reveal should outlive a page change but not the browsing session.
 *
 * Shared by <ResultGate> (the calculator pages) and <PremiumCalculator> (the blog
 * island), so the two cannot drift on key format.
 */
const revealKey = (campaign: string) => `hd_calc_revealed_${campaign}`;

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
    /* storage blocked - the reveal just does not survive navigation */
  }
}
