/**
 * UDA Value compute lib — UK NHS dental 2026/27
 *
 * Pure functions only: no React, no window, no document, no fetch.
 * Extracted from UdaValueCalculator.tsx — golden tests pin the output.
 *
 * Figures sourced:
 *   - UDA benchmark ranges: indicative 2026/27 NHS dental contract data.
 *     England: £25–£35 (GDS contract), Wales: £25–£38 (revised contract),
 *     NI: £21–£32 (HS dental).
 *   - CPI proxy: 2.5% per year (simplified; actual CPI has been higher).
 *
 * Limitations:
 *   - Regional benchmark ranges are indicative; actual commissioner rates vary.
 *   - CPI proxy is simplified (2.5% constant; actual UK CPI 2006-2026 averaged higher).
 *   - Real value calculation uses compound CPI from year signed to 2026.
 *   - "Current year" for CPI calculation is hardcoded to 2026 at extraction.
 */

const CURRENT_YEAR = 2026;
const CPI_PROXY = 0.025;

export type UdaRegion = "england" | "wales" | "ni";

const REGION_TYPICAL_RANGE: Record<UdaRegion, [number, number]> = {
  england: [25, 35],
  wales: [25, 38],
  ni: [21, 32],
};

export type UdaPositionVsBenchmark = "below" | "within" | "above";

export type UdaValueResult = {
  effectiveUda: number;
  yearsSinceSigned: number;
  cumulativeCpi: number;
  realValuePerUda: number;
  benchmarkLow: number;
  benchmarkHigh: number;
  positionVsBenchmark: UdaPositionVsBenchmark;
};

export function calcUdaValue(
  region: UdaRegion,
  udas: number,
  contractValue: number,
  yearSigned: number,
): UdaValueResult {
  const effectiveUda = udas > 0 ? contractValue / udas : 0;
  const yearsSinceSigned = Math.max(0, CURRENT_YEAR - yearSigned);
  const cumulativeCpi = Math.pow(1 + CPI_PROXY, yearsSinceSigned) - 1;
  const realValuePerUda = effectiveUda / (1 + cumulativeCpi);
  const [low, high] = REGION_TYPICAL_RANGE[region];
  const positionVsBenchmark: UdaPositionVsBenchmark =
    effectiveUda < low ? "below" : effectiveUda > high ? "above" : "within";
  return {
    effectiveUda,
    yearsSinceSigned,
    cumulativeCpi,
    realValuePerUda,
    benchmarkLow: low,
    benchmarkHigh: high,
    positionVsBenchmark,
  };
}
