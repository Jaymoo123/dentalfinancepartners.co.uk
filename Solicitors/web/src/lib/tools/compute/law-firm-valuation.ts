/**
 * Law firm valuation compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from LawFirmValuationCalculator.tsx.
 *
 * FIGURES TRACED:
 * - Goodwill multiples: indicative UK 2025/26 market ranges (not statutory).
 *   Sole practitioner 0.6-1.1x, partnership/LLP 1.0-2.0x, specialist 1.8-3.5x,
 *   high-volume 0.8-1.5x.
 * - Region/demand adjustments: market conventions, not statutory.
 *
 * LIMITATIONS: Corporate acquirer premium not modelled. Add-backs not applied
 * (normalised profit is the user's input). Specialist criteria require judgment.
 */

export type FirmType = "sole-practitioner" | "partnership-llp" | "specialist" | "high-volume";
export type Region = "london" | "south" | "midlands" | "north" | "wales" | "scotland-ni";
export type MarketDemand = "low" | "normal" | "high";

const FIRM_TYPE_MULTIPLES: Record<FirmType, [number, number]> = {
  "sole-practitioner": [0.6, 1.1],
  "partnership-llp": [1.0, 2.0],
  "specialist": [1.8, 3.5],
  "high-volume": [0.8, 1.5],
};

const REGION_ADJUSTMENT: Record<Region, number> = {
  london: 0.15,
  south: 0.05,
  midlands: 0,
  north: -0.05,
  wales: -0.05,
  "scotland-ni": -0.05,
};

const DEMAND_ADJUSTMENT: Record<MarketDemand, number> = {
  low: -0.15,
  normal: 0,
  high: 0.1,
};

export type LawFirmValuationInput = {
  profit: number;
  firmType: FirmType;
  region: Region;
  demand: MarketDemand;
  wip: number;
  tangibleAssets: number;
};

export type LawFirmValuationResult = {
  multipleLow: number;
  multipleHigh: number;
  goodwillLow: number;
  goodwillHigh: number;
  totalLow: number;
  totalHigh: number;
};

export function calcLawFirmValuation(input: LawFirmValuationInput): LawFirmValuationResult {
  const { profit, firmType, region, demand, wip, tangibleAssets } = input;
  const [low, high] = FIRM_TYPE_MULTIPLES[firmType];
  const adjLow = Math.max(0.4, low + REGION_ADJUSTMENT[region] + DEMAND_ADJUSTMENT[demand]);
  const adjHigh = Math.max(0.5, high + REGION_ADJUSTMENT[region] + DEMAND_ADJUSTMENT[demand]);
  const goodwillLow = profit * adjLow;
  const goodwillHigh = profit * adjHigh;
  const totalLow = goodwillLow + wip + tangibleAssets;
  const totalHigh = goodwillHigh + wip + tangibleAssets;
  return { multipleLow: adjLow, multipleHigh: adjHigh, goodwillLow, goodwillHigh, totalLow, totalHigh };
}
