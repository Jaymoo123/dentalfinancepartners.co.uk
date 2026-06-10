/**
 * Employer NI / Cost-to-Hire — pure compute module.
 *
 * Extracted from EmployerNICalculator.tsx. No React / DOM / fetch.
 * Registered kind: "bespoke" — the calculator uses a dynamic employee list
 * (add/remove rows) that cannot be expressed as a fixed GenericTool field list.
 *
 * STALE-LABEL FINDING (GAP-2 golden-test gate):
 *   EmployerNICalculator.tsx label reads "£5,000 off employer NI" (2024/25 rate).
 *   The canonical Employment Allowance for 2025/26 is £10,500 (uk-tax-rates.ts).
 *   User must approve updated label text before it ships.
 */
import { UK_TAX_RATES as T } from "@/lib/uk-tax-rates";

const SECONDARY_THRESHOLD: number = T.nationalInsurance.employer.secondaryThreshold;
const EMPLOYER_NI_RATE: number = T.nationalInsurance.employer.rate;
const EMPLOYMENT_ALLOWANCE: number = T.nationalInsurance.employer.employmentAllowance;
const PENSION_MIN_QUALIFYING = 6240;
const PENSION_EMPLOYER_MIN_RATE = 0.03;

export type Employee = { id: number; role: string; salary: number };

export function calcSingleEmployerNi(salary: number): number {
  if (salary <= SECONDARY_THRESHOLD) return 0;
  return (salary - SECONDARY_THRESHOLD) * EMPLOYER_NI_RATE;
}

export function calcMinPensionEmployer(salary: number): number {
  if (salary <= PENSION_MIN_QUALIFYING) return 0;
  return (salary - PENSION_MIN_QUALIFYING) * PENSION_EMPLOYER_MIN_RATE;
}

export type EmployerNIResult = {
  grossSalaryTotal: number;
  niTotal: number;
  eaApplied: number;
  niAfterEA: number;
  pensionTotal: number;
  totalEmploymentCost: number;
  monthlyTotal: number;
  eaEligibleWarning: boolean;
};

export function calcEmployerNIFleet(
  employees: Employee[],
  useEA: boolean,
  includePension: boolean,
): EmployerNIResult {
  const grossSalaryTotal = employees.reduce((sum, e) => sum + e.salary, 0);
  const niTotal = employees.reduce((sum, e) => sum + calcSingleEmployerNi(e.salary), 0);
  const eaApplied = useEA && employees.length >= 2 ? Math.min(EMPLOYMENT_ALLOWANCE, niTotal) : 0;
  const niAfterEA = Math.max(0, niTotal - eaApplied);
  const pensionTotal = includePension
    ? employees.reduce((sum, e) => sum + calcMinPensionEmployer(e.salary), 0)
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
    eaEligibleWarning: useEA && employees.length < 2,
  };
}
