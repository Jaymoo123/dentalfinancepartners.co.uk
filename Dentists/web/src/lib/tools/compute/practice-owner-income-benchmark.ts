/**
 * Practice Owner Income Benchmark compute lib — UK dental
 *
 * Pure functions only: no React, no window, no document, no fetch.
 *
 * Figures sourced:
 *   - NHS Digital / NHS England "Dental Earnings and Expenses Estimates"
 *     series (self-employed Providing-Performer dentists). The 2023/24 release
 *     puts average taxable income for all self-employed dentists (Providing-
 *     Performer and Associate combined) in England at £78,200, on average gross
 *     earnings of ~£158,700 and average expenses of ~£81,600 (an expenses-to-
 *     earnings ratio around 51%). Providing-Performers (practice owners) sit
 *     above the combined average, historically in the roughly £110k-£130k
 *     taxable-income range, with expense ratios around 55-70% depending on
 *     NHS/private mix (private-weighted practices run higher).
 *   - FLAG FOR VERIFICATION: the band values below are indicative constants
 *     structured from the published series, not a verbatim table lift.
 *     Verify against the latest Dental Earnings and Expenses Estimates
 *     release (nhs digital) before citing exact figures in copy.
 *
 * Limitations:
 *   - Bands are per practice-owner (Providing-Performer), pre-tax taxable
 *     income, not drawings and not Ltd-company dividends.
 *   - Region and size multipliers are indicative adjustments, not published
 *     cross-tabulations.
 */

export type PracticeMix = "mainly-nhs" | "mixed" | "mainly-private";
export type OwnerRegion = "england" | "wales" | "scotland" | "ni";

/** Per-owner taxable income benchmark bands, £/year. Dated: 2023/24-series basis. */
const MIX_INCOME_BAND: Record<PracticeMix, [number, number]> = {
  "mainly-nhs": [95000, 120000],
  mixed: [110000, 140000],
  "mainly-private": [110000, 155000],
};

/** Benchmark expenses-to-earnings ratio by mix. Dated: 2023/24-series basis. */
const MIX_EXPENSE_RATIO: Record<PracticeMix, number> = {
  "mainly-nhs": 0.55,
  mixed: 0.62,
  "mainly-private": 0.68,
};

/** Indicative regional adjustment vs England-basis bands. */
const REGION_MULTIPLIER: Record<OwnerRegion, number> = {
  england: 1.0,
  wales: 0.95,
  scotland: 0.95,
  ni: 0.9,
};

export type OwnerPosition = "below" | "within" | "above" | "not-entered";

export type OwnerIncomeBenchmarkResult = {
  benchmarkLow: number;
  benchmarkMid: number;
  benchmarkHigh: number;
  sizeMultiplier: number;
  associateMultiplier: number;
  regionMultiplier: number;
  benchmarkExpenseRatio: number;
  impliedProfitFromTurnover: number;
  ownExpenseRatio: number | null;
  position: OwnerPosition;
};

export function calcOwnerIncomeBenchmark(
  mix: PracticeMix,
  region: OwnerRegion,
  turnover: number,
  chairs: number,
  associateDeliveredPct: number,
  ownProfit: number,
): OwnerIncomeBenchmarkResult {
  const [baseLow, baseHigh] = MIX_INCOME_BAND[mix];
  const regionMultiplier = REGION_MULTIPLIER[region];

  // Size: small (1-2 chairs) trims, 3-4 is the band basis, 5+ lifts.
  const sizeMultiplier = chairs <= 2 ? 0.9 : chairs >= 5 ? 1.1 : 1.0;

  // Heavy associate delegation lowers the owner's personal clinical income;
  // taper up to -15% once associate-delivered share exceeds 50%.
  const associateMultiplier =
    1 - 0.15 * Math.min(1, Math.max(0, associateDeliveredPct - 50) / 50);

  const m = regionMultiplier * sizeMultiplier * associateMultiplier;
  const benchmarkLow = baseLow * m;
  const benchmarkHigh = baseHigh * m;
  const benchmarkMid = (benchmarkLow + benchmarkHigh) / 2;

  const benchmarkExpenseRatio = MIX_EXPENSE_RATIO[mix];
  const impliedProfitFromTurnover = turnover * (1 - benchmarkExpenseRatio);

  const ownExpenseRatio =
    ownProfit > 0 && turnover > 0 ? 1 - ownProfit / turnover : null;

  const position: OwnerPosition =
    ownProfit <= 0
      ? "not-entered"
      : ownProfit < benchmarkLow
      ? "below"
      : ownProfit > benchmarkHigh
      ? "above"
      : "within";

  return {
    benchmarkLow,
    benchmarkMid,
    benchmarkHigh,
    sizeMultiplier,
    associateMultiplier,
    regionMultiplier,
    benchmarkExpenseRatio,
    impliedProfitFromTurnover,
    ownExpenseRatio,
    position,
  };
}
