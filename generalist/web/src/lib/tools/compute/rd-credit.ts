/**
 * R&D Tax Credit Estimator — pure compute module.
 *
 * Extracted from RDCreditEstimator.tsx. No React / DOM / fetch.
 *
 * 2026-06-10: CORRECTED to current rules (user-approved post-GAP-2 fix; the
 * old component used a 40% intensity threshold and a flat 27% "intensive rate"
 * with a 25% CT haircut applied to both branches):
 *   - Intensity threshold is 30% for accounting periods from 1 April 2024
 *     (was 40% before; ERIS / R&D-intensive support).
 *   - Intensive branch (ERIS, loss-making R&D-intensive SMEs): 86% enhanced
 *     deduction surrendered for a 14.5% payable credit → effective benefit
 *     1.86 × 14.5% ≈ 26.97p per £1 of qualifying spend. The payable credit is
 *     NOT taxable, so no CT haircut applies to this branch.
 *   - Standard merged-scheme RDEC: 20% above-the-line credit, taxable — net
 *     benefit 20% × (1 − 25%) = 15p per £1 (unchanged from old component).
 * Still a directional estimate (real claims depend on loss position, PAYE cap,
 * grant treatment, connected-party rules). Sources in docs/generalist/TOOLS.md.
 */

const RDEC_RATE = 0.20;                    // merged scheme, above the line (taxable)
const CT_MAIN_RATE = 0.25;                 // haircut on the taxable RDEC credit
const ERIS_ENHANCEMENT = 1.86;             // 100% cost + 86% enhanced deduction
const ERIS_CREDIT_RATE = 0.145;            // payable credit on surrendered loss
const RD_INTENSIVE_THRESHOLD = 0.30;       // intensity ratio for ERIS (from 1 Apr 2024)
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

  if (isIntensive) {
    // ERIS: effective ~26.97% of qualifying spend, payable, not taxable.
    const creditRate = ERIS_ENHANCEMENT * ERIS_CREDIT_RATE;
    const grossCredit = qualifying * creditRate;
    return { qualifying, intensityRatio, isIntensive, creditRate, grossCredit, netBenefit: grossCredit };
  }

  // Merged-scheme RDEC: 20% gross, taxable at the main CT rate.
  const grossCredit = qualifying * RDEC_RATE;
  const netBenefit = grossCredit * (1 - CT_MAIN_RATE);
  return { qualifying, intensityRatio, isIntensive, creditRate: RDEC_RATE, grossCredit, netBenefit };
}
