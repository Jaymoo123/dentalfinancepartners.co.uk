/**
 * Business Loan Calculator — pure compute module. No React / DOM / fetch.
 *
 * Standard amortising-loan formula: M = P·r·(1+r)^n / ((1+r)^n − 1), where
 * r = monthly rate (annual/12) and n = term in months. Interest-only pays
 * P·r each month with the full principal P due as a bullet at the end.
 */

export type RepaymentType = "amortising" | "interestOnly";

export type LoanResult = {
  monthlyRepayment: number;
  totalInterest: number;
  fee: number;
  totalRepayable: number;
  /** indicative annualised cost of the loan including the fee — NOT a regulated APR */
  indicativeAnnualCost: number;
};

export function calcBusinessLoan(
  amount: number,
  annualRatePct: number,
  termMonths: number,
  repaymentType: RepaymentType,
  feePct: number,
): LoanResult {
  const P = Math.max(0, amount);
  const n = Math.max(1, Math.round(termMonths));
  const r = Math.max(0, annualRatePct) / 100 / 12;
  const fee = (P * Math.max(0, feePct)) / 100;

  let monthlyRepayment: number;
  let totalRepayable: number;

  if (repaymentType === "interestOnly") {
    monthlyRepayment = P * r;
    totalRepayable = monthlyRepayment * n + P;
  } else if (r === 0) {
    monthlyRepayment = P / n;
    totalRepayable = P;
  } else {
    const factor = Math.pow(1 + r, n);
    monthlyRepayment = (P * r * factor) / (factor - 1);
    totalRepayable = monthlyRepayment * n;
  }

  const totalInterest = totalRepayable - P;
  const totalCostInclFee = totalInterest + fee;
  const years = n / 12;
  const indicativeAnnualCost = P > 0 && years > 0 ? (totalCostInclFee / P / years) * 100 : 0;

  return {
    monthlyRepayment,
    totalInterest,
    fee,
    totalRepayable: totalRepayable + fee,
    indicativeAnnualCost,
  };
}
