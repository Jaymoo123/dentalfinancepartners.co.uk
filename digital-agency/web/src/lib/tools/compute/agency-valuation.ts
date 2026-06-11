/**
 * Agency valuation — EBITDA x multiple model.
 * Pure compute, no React, no window/document/fetch. TL-03 clean.
 *
 * Typical UK agency multiples (2025 market):
 *   Boutique generalist: 3-5x adjusted EBITDA
 *   Specialist / niche: 5-8x
 *   High-retention: +0.5-1.5x uplift
 *   Key-person dependent: -0.5-2x discount
 *   Concentration risk (top client >30%): -0.5-1x discount
 */

export type ValuationType = "generalist" | "specialist" | "premium";

export type AgencyValuationInput = {
  revenue: number;
  ebitdaPct: number;
  type: ValuationType;
  retainerPct: number;
  topClientPct: number;
  keyPersonDependent: boolean;
};

export type AgencyValuationOutput = {
  ebitda: number;
  baseMultiple: number;
  retainerUplift: number;
  concentrationDiscount: number;
  keyPersonDiscount: number;
  adjustedMultiple: number;
  low: number;
  mid: number;
  high: number;
};

const BASE_MULTIPLE: Record<ValuationType, number> = {
  generalist: 4,
  specialist: 6,
  premium: 8,
};

export function calcAgencyValuation(input: AgencyValuationInput): AgencyValuationOutput {
  const ebitda = input.revenue * (input.ebitdaPct / 100);
  const baseMultiple = BASE_MULTIPLE[input.type];
  const retainerUplift = input.retainerPct >= 70 ? 1.0 : input.retainerPct >= 50 ? 0.5 : 0;
  const concentrationDiscount = input.topClientPct >= 50 ? -1.5 : input.topClientPct >= 30 ? -0.5 : 0;
  const keyPersonDiscount = input.keyPersonDependent ? -1.0 : 0;
  const adjustedMultiple = Math.max(
    1,
    baseMultiple + retainerUplift + concentrationDiscount + keyPersonDiscount,
  );
  return {
    ebitda,
    baseMultiple,
    retainerUplift,
    concentrationDiscount,
    keyPersonDiscount,
    adjustedMultiple,
    low: ebitda * Math.max(1, adjustedMultiple - 0.5),
    mid: ebitda * adjustedMultiple,
    high: ebitda * (adjustedMultiple + 0.5),
  };
}
