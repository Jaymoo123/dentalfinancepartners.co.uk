/**
 * Employer NI and cost-to-hire calculator.
 * Pure compute, no React, no window/document/fetch. TL-03 clean.
 * 2025/26 rates (employer NI 15% / £5,000 secondary threshold / £10,500 EA from 6 Apr 2025).
 */

const SECONDARY_THRESHOLD = 5000;
const EMPLOYER_NI_RATE = 0.15;
const EMPLOYMENT_ALLOWANCE = 10500;
const PENSION_MIN_QUALIFYING = 6240;
const PENSION_EMPLOYER_MIN_RATE = 0.03;

export type EmployeeRow = {
  id: number;
  role: string;
  salary: number;
};

export type EmployerNiInput = {
  employees: EmployeeRow[];
  useEmploymentAllowance: boolean;
  includePension: boolean;
};

export type EmployerNiOutput = {
  grossSalaryTotal: number;
  niTotal: number;
  eaApplied: number;
  niAfterEA: number;
  pensionTotal: number;
  totalEmploymentCost: number;
  monthlyTotal: number;
  eaEligibleWarning: boolean;
};

function calcEmployerNiPerEmployee(salary: number): number {
  if (salary <= SECONDARY_THRESHOLD) return 0;
  return (salary - SECONDARY_THRESHOLD) * EMPLOYER_NI_RATE;
}

function calcMinPensionEmployer(salary: number): number {
  if (salary <= PENSION_MIN_QUALIFYING) return 0;
  return (salary - PENSION_MIN_QUALIFYING) * PENSION_EMPLOYER_MIN_RATE;
}

export function calcEmployerNi(input: EmployerNiInput): EmployerNiOutput {
  const grossSalaryTotal = input.employees.reduce((sum, e) => sum + e.salary, 0);
  const niTotal = input.employees.reduce((sum, e) => sum + calcEmployerNiPerEmployee(e.salary), 0);
  const eaApplied =
    input.useEmploymentAllowance && input.employees.length >= 2
      ? Math.min(EMPLOYMENT_ALLOWANCE, niTotal)
      : 0;
  const niAfterEA = Math.max(0, niTotal - eaApplied);
  const pensionTotal = input.includePension
    ? input.employees.reduce((sum, e) => sum + calcMinPensionEmployer(e.salary), 0)
    : 0;
  const totalEmploymentCost = grossSalaryTotal + niAfterEA + pensionTotal;
  return {
    grossSalaryTotal,
    niTotal,
    eaApplied,
    niAfterEA,
    pensionTotal,
    totalEmploymentCost,
    monthlyTotal: totalEmploymentCost / 12,
    eaEligibleWarning: input.useEmploymentAllowance && input.employees.length < 2,
  };
}
