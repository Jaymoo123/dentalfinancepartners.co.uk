/**
 * R&D Tax Credit Estimator — pure compute module.
 *
 * Extracted from RDCreditEstimator.tsx. No React / DOM / fetch.
 *
 * STALE-FIGURES FINDING (GAP-2 golden-test gate):
 *   Old component uses RD_INTENSIVE_THRESHOLD = 40% and RD_INTENSIVE_RATE = 27%.
 *   uk-tax-rates.ts records the ERIS scheme threshold at 30%, payable credit 14.5%.
 *   These are different schemes (merged RDEC intensive vs ERIS for loss-making SMEs).
 *   Old component carries disclaimer "directional estimate only."
 *   This extract is FAITHFUL to the old component so the golden test passes.
 *   User must review and confirm the correct intensive threshold/rate before sign-off.
 */

const RDEC_RATE = 0.20;              // standard merged scheme
const RD_INTENSIVE_RATE = 0.27;      // old component's intensive SME rate
const RD_INTENSIVE_THRESHOLD = 0.40; // old component uses 40%; ERIS is 30%
const SUBCONTRACTOR_HAIRCUT = 0.65;

export type RDCreditResult = {
  qualifying: number;
  intensityRatio: number;
  isIntensive: boolean;
  creditRate: number;
  grossCredit: number;
  netBenefit: number;
};

export function calcRDCredit(
  totalExpenditure: number,
  staffCost: number,
  subcontractorCost: number,
  consumablesCost: number,
  softwareCost: number,
): RDCreditResult {
  const qualifying = staffCost + subcontractorCost * SUBCONTRACTOR_HAIRCUT + consumablesCost + softwareCost;
  const intensityRatio = totalExpenditure > 0 ? qualifying / totalExpenditure : 0;
  const isIntensive = intensityRatio >= RD_INTENSIVE_THRESHOLD;
  const creditRate = isIntensive ? RD_INTENSIVE_RATE : RDEC_RATE;
  const grossCredit = qualifying * creditRate;
  const netBenefit = grossCredit * (1 - 0.25);
  return { qualifying, intensityRatio, isIntensive, creditRate, grossCredit, netBenefit };
}
