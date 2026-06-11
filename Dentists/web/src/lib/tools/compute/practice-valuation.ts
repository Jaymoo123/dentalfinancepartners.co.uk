/**
 * Practice Valuation compute lib — UK dental 2025/26 market ranges
 *
 * Pure functions only: no React, no window, no document, no fetch.
 * Extracted from PracticeValuationCalculator.tsx — golden tests pin the output.
 *
 * Figures sourced:
 *   - EBITDA multiples: indicative UK dental market 2025/26 (industry M&A benchmarks).
 *   - Regional adjustments: indicative based on dental sector transactional data.
 *   - Demand adjustments: qualitative market signal adjustments.
 *
 * Limitations:
 *   - Directional model only; actual transaction values depend on buyer type,
 *     contract specifics, lease vs freehold, associate retention, and negotiation.
 *   - Corporate buyer premium not modelled.
 *   - Normalised EBITDA add-backs not calculated (user supplies normalised figure).
 */

export type PracticeMix = "nhs-heavy" | "mixed" | "private-heavy";
export type Region = "london" | "south" | "midlands" | "north" | "wales" | "ni";
export type Demand = "low" | "normal" | "high";

const MIX_BASE: Record<PracticeMix, [number, number]> = {
  "nhs-heavy": [0.65, 0.95],
  mixed: [0.85, 1.15],
  "private-heavy": [1.05, 1.45],
};

const REGION_ADJUST: Record<Region, number> = {
  london: 0.1,
  south: 0.05,
  midlands: 0,
  north: -0.05,
  wales: -0.05,
  ni: -0.05,
};

const DEMAND_ADJUST: Record<Demand, number> = {
  low: -0.1,
  normal: 0,
  high: 0.1,
};

export type PracticeValuationResult = {
  multipleLow: number;
  multipleHigh: number;
  goodwillLow: number;
  goodwillHigh: number;
  totalLow: number;
  totalHigh: number;
};

export function calcPracticeValuation(
  ebitda: number,
  mix: PracticeMix,
  region: Region,
  demand: Demand,
  tangibleAssets: number,
): PracticeValuationResult {
  const [low, high] = MIX_BASE[mix];
  const adjLow = Math.max(0.4, low + REGION_ADJUST[region] + DEMAND_ADJUST[demand]);
  const adjHigh = Math.max(0.5, high + REGION_ADJUST[region] + DEMAND_ADJUST[demand]);
  const goodwillLow = ebitda * adjLow;
  const goodwillHigh = ebitda * adjHigh;
  const totalLow = goodwillLow + tangibleAssets;
  const totalHigh = goodwillHigh + tangibleAssets;
  return {
    multipleLow: adjLow,
    multipleHigh: adjHigh,
    goodwillLow,
    goodwillHigh,
    totalLow,
    totalHigh,
  };
}
