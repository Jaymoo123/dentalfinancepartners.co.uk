/**
 * Locum doctor tax calculator — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch. Plain functions callable from
 * Node/Vitest/any environment.
 *
 * Tax year: 2026/27. Income tax bands and Class 4 rates are unchanged from
 * 2025/26 (verified 2026-08-26, gov.uk income-tax-rates and
 * self-employed-national-insurance-rates); the student loan thresholds moved on
 * 6 April 2026 and were re-pinned the same day.
 *
 * Class 4 NIC is charged on TRADING PROFIT. Personal pension contributions do
 * not reduce it: relief is given against total income tax by extending the basic
 * rate band, not as a trading deduction (SSCBA 1992 s.15; gov.uk pension tax
 * relief). Corrected 2026-08-26; the previous version charged Class 4 on profit
 * less pension and understated it.
 */

export type StudentLoanPlan = "plan1" | "plan2" | "plan4" | "none";

export type LocumTaxInput = {
  grossIncome: number;
  expenses: number;
  pensionContributions: number;
  studentLoanPlan: StudentLoanPlan;
};

export type LocumTaxResult = {
  /** Trading profit (gross fees less expenses). The Class 4 NIC base. */
  profit: number;
  netIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  studentLoanRepayment: number;
  totalDeductions: number;
  netTakeHome: number;
  effectiveTaxRate: number;
};

// 2025/26 constants
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const NI_LOWER_LIMIT = 12570;
const NI_UPPER_LIMIT = 50270;

// Student loan thresholds — 2026/27 values, verified 2026-08-26 at
// https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
// and https://www.gov.uk/repaying-your-student-loan/what-you-pay
// (Plan 1 £26,900, Plan 2 £29,385, Plan 4 £33,795, all at 9%).
// These replace the 2025/26 values (26,065 / 28,470 / 32,745) that were correct
// when pinned on 2026-06-11 and went stale on 6 April 2026.
const STUDENT_LOAN_THRESHOLDS: Record<StudentLoanPlan, number> = {
  plan1: 26900,
  plan2: 29385,
  plan4: 33795,
  none: Infinity,
};

export function calcLocumTax(input: LocumTaxInput): LocumTaxResult {
  const { grossIncome, expenses, pensionContributions, studentLoanPlan } = input;

  // Trading profit. This is the Class 4 NIC base: SSCBA 1992 s.15(1)(b) charges
  // Class 4 on "profits chargeable to income tax under Chapter 2 of Part 2 of
  // ITTOIA 2005". A personal pension contribution is a relief against total
  // income, not a trading expense, so it does not reduce the Class 4 base.
  // Verified 2026-08-26: https://www.legislation.gov.uk/ukpga/1992/4/section/15
  // and https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim24001
  const profit = Math.max(0, grossIncome - expenses);
  const netIncome = grossIncome - expenses - pensionContributions;
  // Personal allowance tapers £1 per £2 above £100k, nil at £125,140.
  const pa = netIncome <= 100000 ? PERSONAL_ALLOWANCE : Math.max(0, PERSONAL_ALLOWANCE - (netIncome - 100000) / 2);
  const taxableIncome = Math.max(0, netIncome - pa);

  // Income tax. The 45% band starts at £125,140 gross, i.e. (HIGHER_RATE_LIMIT - pa)
  // taxable; the fixed £74,870 higher band is only correct at the full PA.
  const basicBand = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE; // 37,700, fixed
  const additionalTaxable = Math.max(basicBand, HIGHER_RATE_LIMIT - pa);
  let incomeTax = 0;
  if (taxableIncome > 0) {
    const basicBandIncome = Math.min(taxableIncome, basicBand);
    incomeTax += basicBandIncome * 0.2;

    if (taxableIncome > basicBand) {
      const higherBandIncome = Math.min(taxableIncome - basicBand, additionalTaxable - basicBand);
      incomeTax += higherBandIncome * 0.4;

      if (taxableIncome > additionalTaxable) {
        const additionalBandIncome = taxableIncome - additionalTaxable;
        incomeTax += additionalBandIncome * 0.45;
      }
    }
  }

  // Class 4 NI (self-employed), charged on PROFIT, not on profit less pension.
  let nationalInsurance = 0;
  if (profit > NI_LOWER_LIMIT) {
    const niableBand1 = Math.min(profit - NI_LOWER_LIMIT, NI_UPPER_LIMIT - NI_LOWER_LIMIT);
    nationalInsurance += niableBand1 * 0.06;

    if (profit > NI_UPPER_LIMIT) {
      nationalInsurance += (profit - NI_UPPER_LIMIT) * 0.02;
    }
  }

  // Student loan repayment
  let studentLoanRepayment = 0;
  if (studentLoanPlan !== "none") {
    const threshold = STUDENT_LOAN_THRESHOLDS[studentLoanPlan];
    if (netIncome > threshold) {
      studentLoanRepayment = (netIncome - threshold) * 0.09;
    }
  }

  const totalDeductions = incomeTax + nationalInsurance + studentLoanRepayment;
  const netTakeHome = netIncome - totalDeductions;
  const effectiveTaxRate = netIncome > 0 ? (totalDeductions / netIncome) * 100 : 0;

  return {
    profit,
    netIncome,
    incomeTax,
    nationalInsurance,
    studentLoanRepayment,
    totalDeductions,
    netTakeHome,
    effectiveTaxRate,
  };
}
