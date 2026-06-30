/**
 * VAT Scheme Comparator — pure compute module.
 *
 * Extracted from VATSchemeComparator.tsx. No React / DOM / fetch.
 * All rates match uk-tax-rates.ts 2026/27 values.
 */

const STANDARD_VAT = 0.20;
const FLAT_RATE_MARKETING_AGENCY = 0.125;
const FLAT_RATE_LCT = 0.165; // uk-tax-rates.ts vat.flatRateLimitedCostTrader ✓
const ANNUAL_LCT_GOODS_THRESHOLD = 1000;
const LCT_TURNOVER_THRESHOLD = 0.02; // 2% of VAT-inclusive turnover

export type VATSchemeResult = {
  vatCollected: number;
  grossInclusive: number;
  standardNet: number;
  flatRate: number;
  flatNet: number;
  flatKeep: number;
  lctApplies: boolean;
  bestScheme: "Standard" | "Flat Rate";
  saving: number;
};

export function compareVATSchemes(
  turnover: number,
  vatInputs: number,
  goodsSpend: number,
): VATSchemeResult {
  const vatCollected = turnover * STANDARD_VAT;
  const grossInclusive = turnover + vatCollected;

  const standardNet = vatCollected - vatInputs;

  const lctGoodsCheck =
    goodsSpend < Math.max(ANNUAL_LCT_GOODS_THRESHOLD, grossInclusive * LCT_TURNOVER_THRESHOLD);
  const flatRate = lctGoodsCheck ? FLAT_RATE_LCT : FLAT_RATE_MARKETING_AGENCY;
  const flatPayment = grossInclusive * flatRate;
  const flatKeep = vatCollected - flatPayment;
  const flatNet = flatPayment;

  return {
    vatCollected,
    grossInclusive,
    standardNet,
    flatRate,
    flatNet,
    flatKeep,
    lctApplies: lctGoodsCheck,
    bestScheme: standardNet < flatNet ? "Standard" : "Flat Rate",
    saving: Math.abs(standardNet - flatNet),
  };
}
