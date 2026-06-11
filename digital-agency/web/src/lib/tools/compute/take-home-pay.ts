/**
 * Take-home pay calculator (PAYE employee).
 * Pure compute, no React, no window/document/fetch. TL-03 clean.
 * 2025/26 rates.
 *
 * STALE-FIGURE NOTICE (per golden-test STOP rule):
 * Student loan thresholds below are the values from the existing component
 * (plan1=24,990, plan2=27,295, plan4=31,395). These are 2024/25 values.
 * 2025/26 correct values are: plan1=26,065, plan2=28,470, plan4=32,745 (SLC 2025).
 * Golden tests are pinned to the OLD values. A deliberate correction commit
 * must follow with explicit user notification.
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const NI_PRIMARY = 12570;
const NI_UPPER = 50270;
const NI_BASIC = 0.08;
const NI_UPPER_RATE = 0.02;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;

export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "pg";

/** NOTE: plan1/plan2/plan4 thresholds are 2024/25 values — see STALE-FIGURE NOTICE above. */
const SL_THRESHOLDS: Record<StudentLoanPlan, { threshold: number; rate: number }> = {
  none: { threshold: 0, rate: 0 },
  plan1: { threshold: 24990, rate: 0.09 },
  plan2: { threshold: 27295, rate: 0.09 },
  plan4: { threshold: 31395, rate: 0.09 },
  plan5: { threshold: 25000, rate: 0.09 },
  pg: { threshold: 21000, rate: 0.06 },
};

function calcIncomeTax(salary: number): { tax: number; pa: number } {
  let pa = PERSONAL_ALLOWANCE;
  if (salary > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary - 100000) / 2);
  const taxable = Math.max(0, salary - pa);
  const basic = Math.min(taxable, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(taxable - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, taxable - basic - higher);
  return { tax: basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL, pa };
}

function calcEmployeeNi(salary: number): number {
  if (salary <= NI_PRIMARY) return 0;
  const inBand = Math.min(salary, NI_UPPER) - NI_PRIMARY;
  const above = Math.max(0, salary - NI_UPPER);
  return inBand * NI_BASIC + above * NI_UPPER_RATE;
}

function calcStudentLoan(salary: number, plan: StudentLoanPlan): number {
  const cfg = SL_THRESHOLDS[plan];
  if (cfg.rate === 0) return 0;
  return Math.max(0, salary - cfg.threshold) * cfg.rate;
}

export type TakeHomePayInput = {
  salary: number;
  pensionPercent: number;
  plan: StudentLoanPlan;
};

export type TakeHomePayOutput = {
  pension: number;
  incomeTax: number;
  personalAllowance: number;
  ni: number;
  studentLoan: number;
  net: number;
  totalDeductions: number;
  effectiveRate: number;
  monthly: number;
  weekly: number;
};

export function calcTakeHomePay(input: TakeHomePayInput): TakeHomePayOutput {
  const pension = input.salary * (input.pensionPercent / 100);
  const salaryAfterPension = input.salary - pension;
  const incomeTaxObj = calcIncomeTax(salaryAfterPension);
  const ni = calcEmployeeNi(input.salary);
  const studentLoan = calcStudentLoan(input.salary, input.plan);
  const net = salaryAfterPension - incomeTaxObj.tax - ni - studentLoan;
  const totalDeductions = incomeTaxObj.tax + ni + studentLoan + pension;
  const effectiveRate = input.salary > 0 ? (incomeTaxObj.tax + ni) / input.salary : 0;
  return {
    pension,
    incomeTax: incomeTaxObj.tax,
    personalAllowance: incomeTaxObj.pa,
    ni,
    studentLoan,
    net,
    totalDeductions,
    effectiveRate,
    monthly: net / 12,
    weekly: net / 52,
  };
}
