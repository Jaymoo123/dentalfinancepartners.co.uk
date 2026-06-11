/**
 * VAT Scheme comparator — Standard vs Flat Rate.
 * Pure compute, no React, no window/document/fetch. TL-03 clean.
 *
 * Standard: charge 20%, reclaim input VAT, pay net to HMRC.
 * Flat Rate: charge 20%, pay HMRC flat % of VAT-inclusive turnover.
 *   Marketing agencies: 12.5%, but Limited Cost Traders (most agencies) = 16.5%.
 * Cash Accounting: standard rules on cash basis.
 */

const STANDARD_VAT = 0.20;
const FLAT_RATE_MARKETING_AGENCY = 0.125;
const FLAT_RATE_LCT = 0.165;
const ANNUAL_LCT_GOODS_THRESHOLD = 1000;
const LCT_TURNOVER_THRESHOLD = 0.02; // 2% of VAT-inclusive turnover

export type VatSchemeInput = {
  turnover: number;     // ex-VAT annual turnover
  vatInputs: number;   // input VAT claimable on standard scheme
  goodsSpend: number;  // annual goods spend (LCT test)
};

export type VatSchemeOutput = {
  vatCollected: number;
  grossInclusive: number;
  standardNet: number;
  flatRate: number;
  flatPayment: number;
  flatKeep: number;
  lctApplies: boolean;
  bestScheme: "Standard" | "Flat Rate";
  saving: number;
};

export function calcVatScheme(input: VatSchemeInput): VatSchemeOutput {
  const vatCollected = input.turnover * STANDARD_VAT;
  const grossInclusive = input.turnover + vatCollected;

  const standardNet = vatCollected - input.vatInputs;

  const lctGoodsCheck =
    input.goodsSpend <
    Math.max(ANNUAL_LCT_GOODS_THRESHOLD, grossInclusive * LCT_TURNOVER_THRESHOLD);
  const flatRate = lctGoodsCheck ? FLAT_RATE_LCT : FLAT_RATE_MARKETING_AGENCY;
  const flatPayment = grossInclusive * flatRate;
  const flatKeep = vatCollected - flatPayment;

  return {
    vatCollected,
    grossInclusive,
    standardNet,
    flatRate,
    flatPayment,
    flatKeep,
    lctApplies: lctGoodsCheck,
    bestScheme: standardNet < flatPayment ? "Standard" : "Flat Rate",
    saving: Math.abs(standardNet - flatPayment),
  };
}
