/**
 * Per-calculator reveal memory for the result gate. Ported from generalist,
 * which ported it from Property; only the key prefix is site-local.
 *
 * Keyed by campaign/tool id so a reveal survives navigation without unlocking any
 * other calculator - a single shared key is what caused the earlier "unlock one,
 * unlock all" bug (which is exactly what the two
 * module-global once-per-session flags were, before they were re-keyed onto this).
 * sessionStorage, not localStorage: the reveal should outlive a page change but
 * not the browsing session.
 *
 * Prefix matches the site's existing `afl-embed-height` namespace.
 *
 * Shared by <ResultGate> (the generic calculator fleet + law-firm-sale-cgt) and
 * <PremiumCalculator> (the blog island), so the two cannot drift on key format.
 * The namespaces cannot collide: premium ids all end `-premium`, generic keys are
 * registry slugs.
 */
const revealKey = (campaign: string) => `afl_calc_revealed_${campaign}`;

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
