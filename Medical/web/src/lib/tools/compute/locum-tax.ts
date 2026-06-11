/**
 * Locum doctor tax calculator — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch. Plain functions callable from
 * Node/Vitest/any environment.
 *
 * Tax year: 2025/26.
 *
 * STALE-FIGURE NOTE: student loan thresholds in this file reproduce the OLD
 * component's values (plan1 24,990 / plan2 27,295 / plan4 31,395) which are
 * 2024/25 figures. This is intentional — golden tests are pinned to these
 * values first (per spec golden-test STOP rule). The deliberate correction to
 * 2025/26 values (26,065 / 28,470 / 32,745) will land as a separate approved
 * update with golden tests intentionally updated.
 */

export type StudentLoanPlan = "plan1" | "plan2" | "plan4" | "none";

export type LocumTaxInput = {
  grossIncome: number;
  expenses: number;
  pensionContributions: number;
  studentLoanPlan: StudentLoanPlan;
};

export type LocumTaxResult = {
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

// Student loan thresholds — 2024/25 values (OLD component faithfully reproduced)
// STALE: 2025/26 values are plan1=26,065 plan2=27,295 plan4=32,745
const STUDENT_LOAN_THRESHOLDS: Record<StudentLoanPlan, number> = {
  plan1: 24990,
  plan2: 27295,
  plan4: 31395,
  none: Infinity,
};

export function calcLocumTax(input: LocumTaxInput): LocumTaxResult {
  const { grossIncome, expenses, pensionContributions, studentLoanPlan } = input;

  const netIncome = grossIncome - expenses - pensionContributions;
  const taxableIncome = Math.max(0, netIncome - PERSONAL_ALLOWANCE);

  // Income tax
  let incomeTax = 0;
  if (taxableIncome > 0) {
    const basicBandIncome = Math.min(taxableIncome, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
    incomeTax += basicBandIncome * 0.2;

    if (taxableIncome > BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) {
      const higherBandIncome = Math.min(
        taxableIncome - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE),
        HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT,
      );
      incomeTax += higherBandIncome * 0.4;

      if (taxableIncome > HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE) {
        const additionalBandIncome = taxableIncome - (HIGHER_RATE_LIMIT - PERSONAL_ALLOWANCE);
        incomeTax += additionalBandIncome * 0.45;
      }
    }
  }

  // Class 4 NI (self-employed)
  let nationalInsurance = 0;
  if (netIncome > NI_LOWER_LIMIT) {
    const niableBand1 = Math.min(netIncome - NI_LOWER_LIMIT, NI_UPPER_LIMIT - NI_LOWER_LIMIT);
    nationalInsurance += niableBand1 * 0.06;

    if (netIncome > NI_UPPER_LIMIT) {
      nationalInsurance += (netIncome - NI_UPPER_LIMIT) * 0.02;
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
    netIncome,
    incomeTax,
    nationalInsurance,
    studentLoanRepayment,
    totalDeductions,
    netTakeHome,
    effectiveTaxRate,
  };
}
