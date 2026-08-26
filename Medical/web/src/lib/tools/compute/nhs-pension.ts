/**
 * NHS Pension annual allowance calculator — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch.
 *
 * Calculates the tapered annual allowance and potential tax charge on NHS
 * pension growth for 2026/27 (every figure unchanged from 2025/26).
 *
 * Corrected 2026-08-26: adjusted income is now built from the TOTAL pension
 * input amount across all registered schemes (FA 2004 s.228ZA, HMRC PTM057100),
 * not from the NHS input amount alone, and three years of carry-forward are
 * modelled (HMRC PTM055100). Both new inputs default to zero, so an NHS-only
 * caller that passes neither gets the same answer as before.
 */

export type TaxBand = "basic" | "higher" | "additional";

/**
 * Status wording shared by the browser calculator and the downloadable
 * workbook. Both surfaces import these so the two cannot drift apart. Changing
 * a string here changes it in the xlsx at the next `npm run resources:xlsx`.
 */
export const CARRY_FORWARD_NOT_ENTERED =
  "CARRY-FORWARD NOT ENTERED: any charge above is BEFORE carry-forward and may be extinguished by it";
export const CARRY_FORWARD_ENTERED = "Carry-forward entered for the previous three years";
export const NHS_ONLY_ASSUMED =
  "NHS SCHEME ONLY: this assumes NHS pension growth is your only pension input. A SIPP, AVCs or another employer scheme raises adjusted income and can bring the taper into play";
export const ALL_SCHEMES_ENTERED = "Pension input entered for schemes outside the NHS scheme";

export type NHSPensionInput = {
  thresholdIncome: number;
  pensionGrowth: number;
  taxBand: TaxBand;
  /**
   * Pension input amount to every OTHER registered scheme (SIPP, AVCs, another
   * employer's scheme). The annual allowance is measured across all registered
   * schemes together and adjusted income adds back the total pension input
   * amount, so omitting this understates both. Defaults to 0.
   */
  otherPensionInput?: number;
  /**
   * Unused annual allowance carried forward, one entry per prior tax year,
   * ordered [3 years ago, 2 years ago, last year]. The current year's allowance
   * is used first, then the earliest of the three (HMRC PTM055100).
   * Defaults to none.
   */
  carryForward?: [number, number, number];
};

export type NHSPensionResult = {
  adjustedIncome: number;
  annualAllowance: number;
  isTapered: boolean;
  /** Total pension input amount across all registered schemes. */
  totalPensionInput: number;
  /** Excess over this year's allowance, BEFORE carry-forward. */
  excess: number;
  /** Carry-forward applied, earliest year first. */
  carryForwardUsed: number;
  /** Excess actually charged, after carry-forward. */
  chargeableExcess: number;
  taxCharge: number;
  effectiveCost: number;
};

// 2026/27 constants, verified 2026-08-26 at gov.uk pension-schemes-rates.
// Identical under "2026 to 2027" and "2025 to 2026"; do not re-tag without re-checking.
const STANDARD_ALLOWANCE = 60000;
const MIN_ALLOWANCE = 10000;
const THRESHOLD_LIMIT = 200000;
const ADJUSTED_LIMIT = 260000;

const TAX_RATES: Record<TaxBand, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

export function calcNHSPension(input: NHSPensionInput): NHSPensionResult {
  const { thresholdIncome, pensionGrowth, taxBand, otherPensionInput = 0, carryForward } = input;

  // Total pension input amount across every registered scheme. The allowance is
  // measured against this, not against the NHS scheme alone.
  const totalPensionInput = pensionGrowth + otherPensionInput;

  // Adjusted income, FA 2004 s.228ZA and HMRC PTM057100 (read 2026-08-26):
  // net income, plus contributions relieved under a net pay arrangement or
  // s.194(1), plus total pension input amount less the member's own
  // contributions. Threshold income is net income with gross relief-at-source
  // contributions already deducted, so that build-up collapses to threshold
  // income plus the TOTAL pension input amount. Building it from the NHS input
  // amount alone understated it for anyone in a second scheme.
  const adjustedIncome = thresholdIncome + totalPensionInput;

  let annualAllowance = STANDARD_ALLOWANCE;
  let isTapered = false;

  if (thresholdIncome > THRESHOLD_LIMIT && adjustedIncome > ADJUSTED_LIMIT) {
    isTapered = true;
    const excessIncome = adjustedIncome - ADJUSTED_LIMIT;
    const reduction = excessIncome / 2;
    annualAllowance = Math.max(MIN_ALLOWANCE, STANDARD_ALLOWANCE - reduction);
  }

  const excess = Math.max(0, totalPensionInput - annualAllowance);

  // Carry-forward: current year first (already applied above), then the earliest
  // of the three prior years (HMRC PTM055100). Order only affects which year is
  // consumed, so the total offset is capped at the sum available.
  const carryForwardAvailable = carryForward ? carryForward.reduce((a, b) => a + Math.max(0, b), 0) : 0;
  const carryForwardUsed = Math.min(excess, carryForwardAvailable);
  const chargeableExcess = excess - carryForwardUsed;

  const taxCharge = chargeableExcess * TAX_RATES[taxBand];
  const effectiveCost =
    totalPensionInput > 0 && taxCharge > 0 ? (taxCharge / totalPensionInput) * 100 : 0;

  return {
    adjustedIncome,
    annualAllowance,
    isTapered,
    totalPensionInput,
    excess,
    carryForwardUsed,
    chargeableExcess,
    taxCharge,
    effectiveCost,
  };
}
