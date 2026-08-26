/**
 * NHS Pension annual allowance calculator — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch.
 *
 * Calculates the tapered annual allowance and potential tax charge on NHS
 * pension growth for 2026/27 (every figure unchanged from 2025/26).
 */

export type TaxBand = "basic" | "higher" | "additional";

export type NHSPensionInput = {
  thresholdIncome: number;
  pensionGrowth: number;
  taxBand: TaxBand;
};

export type NHSPensionResult = {
  adjustedIncome: number;
  annualAllowance: number;
  isTapered: boolean;
  excess: number;
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
  const { thresholdIncome, pensionGrowth, taxBand } = input;

  const adjustedIncome = thresholdIncome + pensionGrowth;

  let annualAllowance = STANDARD_ALLOWANCE;
  let isTapered = false;

  if (thresholdIncome > THRESHOLD_LIMIT && adjustedIncome > ADJUSTED_LIMIT) {
    isTapered = true;
    const excessIncome = adjustedIncome - ADJUSTED_LIMIT;
    const reduction = excessIncome / 2;
    annualAllowance = Math.max(MIN_ALLOWANCE, STANDARD_ALLOWANCE - reduction);
  }

  const excess = Math.max(0, pensionGrowth - annualAllowance);
  const taxCharge = excess * TAX_RATES[taxBand];
  const effectiveCost = pensionGrowth > 0 && taxCharge > 0 ? (taxCharge / pensionGrowth) * 100 : 0;

  return {
    adjustedIncome,
    annualAllowance,
    isTapered,
    excess,
    taxCharge,
    effectiveCost,
  };
}
