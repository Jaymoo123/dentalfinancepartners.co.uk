/**
 * Take-Home Pay — pure compute module.
 *
 * Extracted from TakeHomePayCalculator.tsx. No React / DOM / fetch.
 *
 * STALE-FIGURES FINDING (GAP-2 golden-test gate):
 *   SL plan 1/2/4 thresholds below are the OLD component's values (2024/25 rates).
 *   Canonical 2025/26 rates in uk-tax-rates.ts: plan1=26065, plan2=28470, plan4=32745.
 *   This extract is FAITHFUL to the old component so the golden test passes.
 *   User must approve updated thresholds before they are applied to the config.
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

const SL_THRESHOLDS: Record<StudentLoanPlan, { threshold: number; rate: number }> = {
  none: { threshold: 0, rate: 0 },
  plan1: { threshold: 24990, rate: 0.09 },  // STALE: 2025/26 correct = 26065
  plan2: { threshold: 27295, rate: 0.09 },  // STALE: 2025/26 correct = 28470
  plan4: { threshold: 31395, rate: 0.09 },  // STALE: 2025/26 correct = 32745
  plan5: { threshold: 25000, rate: 0.09 },  // ✓ matches uk-tax-rates.ts
  pg:    { threshold: 21000, rate: 0.06 },  // ✓ matches uk-tax-rates.ts
};

export function calcIncomeTaxTHP(salary: number): { tax: number; pa: number } {
  let pa = PERSONAL_ALLOWANCE;
  if (salary > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary - 100000) / 2);
  const taxable = Math.max(0, salary - pa);
  const basic = Math.min(taxable, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(taxable - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, taxable - basic - higher);
  return { tax: basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL, pa };
}

export function calcEmployeeNiTHP(salary: number): number {
  if (salary <= NI_PRIMARY) return 0;
  const inBand = Math.min(salary, NI_UPPER) - NI_PRIMARY;
  const above = Math.max(0, salary - NI_UPPER);
  return inBand * NI_BASIC + above * NI_UPPER_RATE;
}

export function calcStudentLoan(salary: number, plan: StudentLoanPlan): number {
  const cfg = SL_THRESHOLDS[plan];
  if (cfg.rate === 0) return 0;
  return Math.max(0, salary - cfg.threshold) * cfg.rate;
}

export type TakeHomeResult = {
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

export function calcTakeHomePay(
  salary: number,
  pensionPercent: number,
  plan: StudentLoanPlan,
): TakeHomeResult {
  const pension = salary * (pensionPercent / 100);
  const salaryAfterPension = salary - pension;
  const incomeTaxObj = calcIncomeTaxTHP(salaryAfterPension);
  const ni = calcEmployeeNiTHP(salary);
  const studentLoan = calcStudentLoan(salary, plan);
  const net = salaryAfterPension - incomeTaxObj.tax - ni - studentLoan;
  const totalDeductions = incomeTaxObj.tax + ni + studentLoan + pension;
  const effectiveRate = salary > 0 ? (incomeTaxObj.tax + ni) / salary : 0;
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
