/**
 * BADR CGT Calculator — pure compute module.
 *
 * Extracted from BADRCalculator.tsx. No React / DOM / fetch.
 * Current year: 2026/27. Rates sourced from uk-tax-rates.ts.
 */

const BADR_RATE_2025_26 = 0.14;   // uk-tax-rates.ts capitalGainsTax.badr.rate_2025_26 ✓
const BADR_RATE_2026_27 = 0.18;   // uk-tax-rates.ts capitalGainsTax.badr.rate_2026_27_from ✓
const STANDARD_CGT_HIGHER = 0.24; // uk-tax-rates.ts capitalGainsTax.nonResidential.higherRate ✓
const BADR_LIFETIME_LIMIT = 1_000_000; // uk-tax-rates.ts capitalGainsTax.badr.lifetimeLimit ✓

export type BADRYear = "2025/26" | "2026/27";

export type BADRResult = {
  gain: number;
  eligibleForBADR: number;
  notEligible: number;
  badrTax: number;
  standardTax: number;
  totalTax: number;
  netProceeds: number;
  effectiveRate: number;
};

export function calcBADR(
  saleProceeds: number,
  originalCost: number,
  previousBADRUsed: number,
  year: BADRYear,
  meetsEligibility: boolean,
): BADRResult {
  const gain = Math.max(0, saleProceeds - originalCost);
  const badrRate = year === "2025/26" ? BADR_RATE_2025_26 : BADR_RATE_2026_27;
  const availableBADR = Math.max(0, BADR_LIFETIME_LIMIT - previousBADRUsed);

  if (!meetsEligibility) {
    const standardTax = gain * STANDARD_CGT_HIGHER;
    return {
      gain,
      eligibleForBADR: 0,
      notEligible: gain,
      badrTax: 0,
      standardTax,
      totalTax: standardTax,
      netProceeds: saleProceeds - standardTax,
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
    eligibleForBADR: eligibleSlice,
    notEligible: overflowSlice,
    badrTax,
    standardTax,
    totalTax,
    netProceeds: saleProceeds - totalTax,
    effectiveRate: gain > 0 ? totalTax / gain : 0,
  };
}
