/**
 * R&D Tax Credit estimator — pure compute, no React, no window/document/fetch.
 * Post-April 2023 merged scheme. 2025/26.
 *
 * TL-03: zero client/server dependencies.
 */

const RDEC_RATE = 0.20;           // standard merged scheme
const RD_INTENSIVE_RATE = 0.27;   // R&D intensive SME rate
const RD_INTENSIVE_THRESHOLD = 0.40;
const SUBCONTRACTOR_HAIRCUT = 0.65; // claim 65% of subcontractor cost
const CT_MARGINAL_RATE = 0.25;    // conservative estimate for most agencies

export type RdTaxCreditInput = {
  totalExpenditure: number;
  staffCost: number;
  subcontractorCost: number;
  consumablesCost: number;
  softwareCost: number;
};

export type RdTaxCreditOutput = {
  qualifying: number;
  intensityRatio: number;
  isIntensive: boolean;
  creditRate: number;
  grossCredit: number;
  netBenefit: number;
};

export function calcRdTaxCredit(input: RdTaxCreditInput): RdTaxCreditOutput {
  const qualifying =
    input.staffCost +
    input.subcontractorCost * SUBCONTRACTOR_HAIRCUT +
    input.consumablesCost +
    input.softwareCost;

  const intensityRatio = input.totalExpenditure > 0 ? qualifying / input.totalExpenditure : 0;
  const isIntensive = intensityRatio >= RD_INTENSIVE_THRESHOLD;
  const creditRate = isIntensive ? RD_INTENSIVE_RATE : RDEC_RATE;
  const grossCredit = qualifying * creditRate;
  const netBenefit = grossCredit * (1 - CT_MARGINAL_RATE);

  return {
    qualifying,
    intensityRatio,
    isIntensive,
    creditRate,
    grossCredit,
    netBenefit,
  };
}
