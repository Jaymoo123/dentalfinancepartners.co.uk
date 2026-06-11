/**
 * BADR (Business Asset Disposal Relief) CGT calculator.
 * Pure compute, no React, no window/document/fetch. TL-03 clean.
 *
 * Rates:
 *   BADR 2025/26: 14% (disposals on/after 6 April 2025)
 *   BADR 2026/27: 18% (rising from 6 April 2026)
 *   Standard CGT higher rate: 24% (assumed for comparison)
 *   Lifetime BADR allowance: £1,000,000
 */

const BADR_RATE_2025_26 = 0.14;
const BADR_RATE_2026_27 = 0.18;
const STANDARD_CGT_HIGHER = 0.24;
const BADR_LIFETIME_LIMIT = 1_000_000;

export type BadrYear = "2025/26" | "2026/27";

export type BadrCgtInput = {
  saleProceeds: number;
  originalCost: number;
  previousBadrUsed: number;
  year: BadrYear;
  meetsEligibility: boolean;
};

export type BadrCgtOutput = {
  gain: number;
  eligibleForBadr: number;
  notEligible: number;
  badrTax: number;
  standardTax: number;
  totalTax: number;
  netProceeds: number;
  effectiveRate: number;
};

export function calcBadrCgt(input: BadrCgtInput): BadrCgtOutput {
  const gain = Math.max(0, input.saleProceeds - input.originalCost);
  const badrRate = input.year === "2025/26" ? BADR_RATE_2025_26 : BADR_RATE_2026_27;
  const availableBADR = Math.max(0, BADR_LIFETIME_LIMIT - input.previousBadrUsed);

  if (!input.meetsEligibility) {
    const standardTax = gain * STANDARD_CGT_HIGHER;
    return {
      gain,
      eligibleForBadr: 0,
      notEligible: gain,
      badrTax: 0,
      standardTax,
      totalTax: standardTax,
      netProceeds: input.saleProceeds - standardTax,
      effectiveRate: gain > 0 ? standardTax / gain : 0,
    };
  }

  const eligibleSlice = Math.min(gain, availableBADR);
  const overflowSlice = gain - eligibleSlice;
  const badrTax = eligibleSlice * badrRate;
  const standardTax = overflowSlice * STANDARD_CGT_HIGHER;
  const totalTax = badrTax + standardTax;

  return {
    gain,
    eligibleForBadr: eligibleSlice,
    notEligible: overflowSlice,
    badrTax,
    standardTax,
    totalTax,
    netProceeds: input.saleProceeds - totalTax,
    effectiveRate: gain > 0 ? totalTax / gain : 0,
  };
}
