/**
 * R&D Tax Credit estimator — pure compute, no React, no window/document/fetch.
 *
 * Merged scheme (Finance Act 2024): applies to accounting periods beginning on
 * or after 1 April 2024. Replaces the old SME and RDEC regimes for those periods.
 *
 * House positions §4 (locked 2026-07-05, ERIS estate-verified):
 *   Merged RDEC:  20% expenditure credit on qualifying R&D spend; taxable income
 *                 so net benefit at 25% CT = ~15% of qualifying spend.
 *   ERIS:         For loss-making R&D-intensive SMEs. Intensity threshold = 30%
 *                 (qualifying / total expenditure >= 30%, lowered from 40%).
 *                 86% enhanced deduction (total 186% of qualifying spend) +
 *                 14.5% payable credit on the surrendered loss.
 *                 Net benefit = qualifying * 1.86 * 0.145 = ~26.97p per £1.
 *
 * WARNING — eligibility boundary (house positions §4): most agency projects do
 * NOT qualify for R&D relief. This tool is illustrative only. Qualifying R&D
 * must seek an advance in science or technology through genuine technical
 * uncertainty. Routine web development, creative design, and project management
 * are excluded. HMRC is actively auditing claims.
 *
 * TL-03: zero client/server dependencies.
 */

/** Merged scheme RDEC rate (20%). Statute: CTA 2009 Part 13, FA 2024. */
const RDEC_RATE = 0.20;

/**
 * ERIS intensity threshold (30%). Qualifying R&D spend / total expenditure.
 * Lowered from 40% for accounting periods beginning on or after 1 April 2024.
 * gov.uk merged-scheme guidance; house positions §4.
 */
const ERIS_INTENSITY_THRESHOLD = 0.30;

/**
 * ERIS enhanced deduction rate (86% additional, giving 186% total).
 * house positions §4.
 */
const ERIS_ENHANCED_DEDUCTION = 0.86;

/**
 * ERIS payable credit rate (14.5%) applied to the surrendered loss.
 * Net benefit per £1 qualifying = 1.86 * 0.145 = ~26.97p.
 * house positions §4.
 */
const ERIS_PAYABLE_CREDIT_RATE = 0.145;

/** Subcontractor cost haircut (65% of qualifying subcontractor cost is claimable). */
const SUBCONTRACTOR_HAIRCUT = 0.65;

/** CT rate for merged-scheme net-benefit calculation. Conservative (main rate). */
const CT_MARGINAL_RATE = 0.25;

export type RdTaxCreditInput = {
  /** Total expenditure in the period (to calculate intensity ratio). */
  totalExpenditure: number;
  staffCost: number;
  subcontractorCost: number;
  consumablesCost: number;
  softwareCost: number;
};

export type RdTaxCreditOutput = {
  /** Qualifying R&D spend after subcontractor haircut. */
  qualifying: number;
  /** Ratio of qualifying / totalExpenditure. */
  intensityRatio: number;
  /** Whether ERIS threshold is met (>= 30%). */
  isIntensive: boolean;
  /**
   * For merged RDEC: 0.20 (20% credit rate).
   * For ERIS: not directly a single "rate" — use grossCredit and netBenefit.
   * This field returns the RDEC rate for non-intensive, and the effective
   * benefit rate (1.86 * 0.145 = 0.2697) for ERIS, so consumers can display it.
   */
  creditRate: number;
  /** Gross monetary benefit before tax relief / payable credit mechanics. */
  grossCredit: number;
  /**
   * Net monetary benefit after CT mechanics.
   * Merged RDEC: grossCredit * (1 - CT_MARGINAL_RATE).
   * ERIS: qualifying * 1.86 * 0.145 (payable credit on surrendered loss).
   */
  netBenefit: number;
  /** Whether the ERIS model was applied (vs standard merged RDEC). */
  usedEris: boolean;
};

export function calcRdTaxCredit(input: RdTaxCreditInput): RdTaxCreditOutput {
  const qualifying =
    input.staffCost +
    input.subcontractorCost * SUBCONTRACTOR_HAIRCUT +
    input.consumablesCost +
    input.softwareCost;

  const intensityRatio = input.totalExpenditure > 0 ? qualifying / input.totalExpenditure : 0;
  const isIntensive = intensityRatio >= ERIS_INTENSITY_THRESHOLD;

  if (isIntensive) {
    // ERIS: 86% enhanced deduction + 14.5% payable credit on surrendered loss.
    // Surrendered loss = qualifying * (1 + ERIS_ENHANCED_DEDUCTION) = qualifying * 1.86.
    // Payable credit = surrendered loss * ERIS_PAYABLE_CREDIT_RATE.
    const surrenderedLoss = qualifying * (1 + ERIS_ENHANCED_DEDUCTION);
    const grossCredit = surrenderedLoss * ERIS_PAYABLE_CREDIT_RATE;
    const netBenefit = grossCredit; // payable credit is cash — no further CT offset needed

    return {
      qualifying,
      intensityRatio,
      isIntensive: true,
      creditRate: ERIS_PAYABLE_CREDIT_RATE * (1 + ERIS_ENHANCED_DEDUCTION), // ~0.2697
      grossCredit,
      netBenefit,
      usedEris: true,
    };
  }

  // Standard merged RDEC: 20% credit, taxable so net = grossCredit * (1 - CT).
  const grossCredit = qualifying * RDEC_RATE;
  const netBenefit = grossCredit * (1 - CT_MARGINAL_RATE);

  return {
    qualifying,
    intensityRatio,
    isIntensive: false,
    creditRate: RDEC_RATE,
    grossCredit,
    netBenefit,
    usedEris: false,
  };
}

// Re-export constants for golden tests and consumers.
export { RDEC_RATE, ERIS_INTENSITY_THRESHOLD, ERIS_ENHANCED_DEDUCTION, ERIS_PAYABLE_CREDIT_RATE };
