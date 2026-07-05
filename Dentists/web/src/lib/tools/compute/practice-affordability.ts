/**
 * Practice purchase affordability helper.
 * Pure TypeScript, no React/window/document/fetch. TL-03 compliant.
 *
 * Computes the deposit, loan amount, standard amortising annual repayment and
 * EBITDA cover ratio for a dental practice purchase. This is arithmetic only:
 * no tax rate is used or needed. The interest rate and loan term are the reader's
 * own assumptions, not house positions (F3).
 *
 * Annuity formula (monthly basis, annualised):
 *   monthly payment = loanAmount * r / (1 - (1 + r)^-n)
 *   where r = interestRate / 12, n = termYears * 12
 *   annualRepayment = monthly payment * 12
 *
 * When the interest rate is zero (edge case), the annual repayment degrades
 * gracefully to loanAmount / termYears.
 */

export type PracticeAffordabilityInput = {
  /** Agreed or expected total purchase price. */
  purchasePrice: number;
  /** Deposit as a percentage of the purchase price (0-100). */
  depositPct: number;
  /**
   * Annual loan interest rate as a percentage (e.g. 8 for 8%).
   * This is the reader's own assumption, not a house figure (F3).
   */
  interestRate: number;
  /**
   * Loan term in years.
   * This is the reader's own assumption, not a house figure (F3).
   */
  termYears: number;
  /** Normalised EBITDA of the practice. Used for the cover ratio only. */
  ebitda: number;
};

export type PracticeAffordabilityResult = {
  /** Deposit amount (purchasePrice * depositPct / 100). */
  deposit: number;
  /** Loan amount (purchasePrice - deposit). */
  loanAmount: number;
  /**
   * Annual repayment via the standard amortising annuity formula on a monthly
   * basis, annualised. See module header for the formula.
   */
  annualRepayment: number;
  /**
   * EBITDA cover ratio: ebitda / annualRepayment.
   * A ratio above 1.25x is generally considered comfortable for a dental practice
   * acquisition loan. Below 1x means the practice profit does not cover the
   * repayments at the assumed rate and term.
   */
  coverRatio: number;
};

export function calcAffordability(input: PracticeAffordabilityInput): PracticeAffordabilityResult {
  const { purchasePrice, depositPct, interestRate, termYears, ebitda } = input;

  const deposit = purchasePrice * (depositPct / 100);
  const loanAmount = purchasePrice - deposit;

  let annualRepayment: number;
  if (loanAmount <= 0) {
    annualRepayment = 0;
  } else if (interestRate === 0) {
    // Edge case: zero interest rate -- straight-line repayment.
    annualRepayment = termYears > 0 ? loanAmount / termYears : 0;
  } else {
    // Standard amortising annuity formula, monthly basis.
    const r = interestRate / 100 / 12;
    const n = termYears * 12;
    const monthlyPayment = (loanAmount * r) / (1 - Math.pow(1 + r, -n));
    annualRepayment = monthlyPayment * 12;
  }

  const coverRatio = annualRepayment > 0 ? ebitda / annualRepayment : 0;

  return { deposit, loanAmount, annualRepayment, coverRatio };
}
