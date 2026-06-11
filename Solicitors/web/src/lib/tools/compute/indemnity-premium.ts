/**
 * PII premium estimator compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from IndemnityPremiumCalculator.tsx.
 *
 * FIGURES TRACED:
 * - Base rates by practice area: indicative UK 2025/26 market rates (not SRA-mandated).
 *   Conveyancing 2.5%, mixed 1.5%, commercial 0.8%, private client 0.7%,
 *   litigation 1.2%, criminal 1.0%.
 * - Claims multipliers: market convention (no-claim 1.0x, minor 1.25x, moderate 1.75x, major 3.0x).
 * - Cover multipliers: indicative (£2m: 1.0x, £3-5m: 1.2x, £10m: 1.5x, £20m+: 2.0x).
 * - Size penalty: 1.1x for firms with >20 fee-earners.
 * - MTC minimums: SRA Minimum Terms and Conditions 2013 (unincorporated £2m, incorporated £3m).
 *
 * LIMITATIONS: Real premiums depend on underwriter appetite, AML controls, file
 * management quality, and current claims experience. Specialist brokers typically
 * deliver 10-25% better than generalists.
 */

export type PracticeArea =
  | "conveyancing-heavy"
  | "mixed"
  | "commercial"
  | "private-client"
  | "litigation"
  | "criminal";
export type ClaimsHistory = "none-5y" | "minor-claim" | "moderate-claim" | "major-claim";

const PRACTICE_BASE_RATE: Record<PracticeArea, number> = {
  "conveyancing-heavy": 0.025,
  "mixed": 0.015,
  "commercial": 0.008,
  "private-client": 0.007,
  "litigation": 0.012,
  "criminal": 0.010,
};

const CLAIMS_MULTIPLIER: Record<ClaimsHistory, number> = {
  "none-5y": 1.0,
  "minor-claim": 1.25,
  "moderate-claim": 1.75,
  "major-claim": 3.0,
};

export type IndemnityPremiumInput = {
  grossFees: number;
  practiceArea: PracticeArea;
  claimsHistory: ClaimsHistory;
  feeEarnerCount: number;
  coverLevel: number;
};

export type IndemnityPremiumResult = {
  indicativePremium: number;
  low: number;
  high: number;
};

export function calcIndemnityPremium(input: IndemnityPremiumInput): IndemnityPremiumResult {
  const { grossFees, practiceArea, claimsHistory, feeEarnerCount, coverLevel } = input;
  const baseRate = PRACTICE_BASE_RATE[practiceArea];
  const claimsMult = CLAIMS_MULTIPLIER[claimsHistory];
  const coverMultiplier = coverLevel <= 2 ? 1.0 : coverLevel <= 5 ? 1.2 : coverLevel <= 10 ? 1.5 : 2.0;
  const size_penalty = feeEarnerCount > 20 ? 1.1 : 1.0;
  const indicativePremium = grossFees * baseRate * claimsMult * coverMultiplier * size_penalty;
  const low = indicativePremium * 0.8;
  const high = indicativePremium * 1.4;
  return { indicativePremium, low, high };
}
