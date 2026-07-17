/**
 * Salaried doctor take-home calculator — pure compute library.
 *
 * No React, no DOM, no fetch. Plain functions callable from Node/Vitest.
 *
 * Tax year: 2026/27 (default; rates confirmed via FA 2026 and ground truth).
 *
 * NHS employee superannuation tiers come from the shared single-source module
 * compute/nhs-super-tiers.ts (2026/27 table). Do NOT inline a table here.
 */

import { nhsSuperEmployeeRate } from "./nhs-super-tiers";

export type StudentLoanPlan = "plan1" | "plan2" | "plan4" | "none";

export type SalariedDoctorInput = {
  nhsSalary: number;
  privateSessionalIncome: number;
  studentLoanPlan: StudentLoanPlan;
  /** Optional private pension contribution (gross) — reduces taxable income */
  privatePensionContribution: number;
};

export type SalariedDoctorResult = {
  totalIncome: number;
  personalAllowance: number;
  incomeTax: number;
  class1NI: number;
  class4NI: number;
  nhsSuper: number;
  superTierRate: number; // e.g. 0.105 for 10.5%
  studentLoanRepayment: number;
  totalDeductions: number;
  annualNetTakeHome: number;
  monthlyNetTakeHome: number;
  effectiveTaxRate: number; // as a fraction, e.g. 0.32
};

// ── 2026/27 income-tax constants ──────────────────────────────────────────────
const PERSONAL_ALLOWANCE_BASE = 12570;
const BASIC_RATE_BAND = 37700; // fixed; basic covers £12,571-£50,270 at full PA
const HIGHER_RATE_LIMIT = 125140; // 45% above this
const BASIC_RATE = 0.2;
const HIGHER_RATE = 0.4;
const ADDITIONAL_RATE = 0.45;

// ── 2026/27 NI constants ──────────────────────────────────────────────────────
const NI_PRIMARY_THRESHOLD = 12570;
const NI_UPPER_EARNINGS_LIMIT = 50270;
const CLASS1_MAIN_RATE = 0.08; // 8% between PT and UEL
const CLASS1_UPPER_RATE = 0.02; // 2% above UEL
const CLASS4_MAIN_RATE = 0.06; // 6% between LPL and UPL (self-employed)
const CLASS4_UPPER_RATE = 0.02; // 2% above UPL
const CLASS4_LOWER_PROFIT_LIMIT = 12570;
const CLASS4_UPPER_PROFIT_LIMIT = 50270;

// NHS employee superannuation tiers: see compute/nhs-super-tiers.ts (2026/27).

// ── Student loan thresholds (2025/26; update if HMRC revises) ─────────────────
const STUDENT_LOAN_THRESHOLDS: Record<StudentLoanPlan, number> = {
  plan1: 26065,
  plan2: 28470,
  plan4: 32745,
  none: Infinity,
};

// ── Core compute ──────────────────────────────────────────────────────────────

export function calcSalariedDoctorTakeHome(input: SalariedDoctorInput): SalariedDoctorResult {
  const { nhsSalary, privateSessionalIncome, studentLoanPlan, privatePensionContribution } = input;

  const totalIncome = nhsSalary + privateSessionalIncome;

  // NHS super on salary only (not private income)
  const superTierRate = nhsSuperEmployeeRate(nhsSalary);
  const nhsSuper = nhsSalary * superTierRate;

  // Taxable income = total income minus private pension relief (gross)
  // NHS super is collected but is NOT deductible from income for tax purposes
  // (it reduces threshold income for AA purposes, handled separately in the AA tool).
  const taxableIncome = Math.max(0, totalIncome - privatePensionContribution);

  // Personal allowance — tapers £1 per £2 above £100k, zero at £125,140
  const pa =
    taxableIncome <= 100000
      ? PERSONAL_ALLOWANCE_BASE
      : Math.max(0, PERSONAL_ALLOWANCE_BASE - (taxableIncome - 100000) / 2);

  const taxable = Math.max(0, taxableIncome - pa);

  // Income tax — LOCKED band arithmetic:
  //   basic:      fixed £37,700
  //   higher:     (125,140 - PA) - 37,700  (widens as PA tapers)
  //   additional: above £125,140
  const higherBandWidth = Math.max(0, HIGHER_RATE_LIMIT - pa - BASIC_RATE_BAND);

  let incomeTax = 0;
  const basicTaxable = Math.min(taxable, BASIC_RATE_BAND);
  incomeTax += basicTaxable * BASIC_RATE;

  if (taxable > BASIC_RATE_BAND) {
    const higherTaxable = Math.min(taxable - BASIC_RATE_BAND, higherBandWidth);
    incomeTax += higherTaxable * HIGHER_RATE;
  }

  if (taxable > BASIC_RATE_BAND + higherBandWidth) {
    const additionalTaxable = taxable - BASIC_RATE_BAND - higherBandWidth;
    incomeTax += additionalTaxable * ADDITIONAL_RATE;
  }

  // Class 1 NI on NHS salary (employee, PAYE)
  let class1NI = 0;
  if (nhsSalary > NI_PRIMARY_THRESHOLD) {
    const mainBand = Math.min(nhsSalary - NI_PRIMARY_THRESHOLD, NI_UPPER_EARNINGS_LIMIT - NI_PRIMARY_THRESHOLD);
    class1NI += mainBand * CLASS1_MAIN_RATE;
    if (nhsSalary > NI_UPPER_EARNINGS_LIMIT) {
      class1NI += (nhsSalary - NI_UPPER_EARNINGS_LIMIT) * CLASS1_UPPER_RATE;
    }
  }

  // Class 4 NI on private sessional income (self-employed)
  // Private income stacks on top of NHS salary for NI purposes.
  // The UEL is shared: salary already uses up the main-rate band.
  let class4NI = 0;
  if (privateSessionalIncome > 0) {
    // Salary already occupies main-rate NI band up to the UEL; private income
    // only gets main-rate relief if salary < UEL.
    const remainingMainBand = Math.max(0, NI_UPPER_EARNINGS_LIMIT - nhsSalary);
    const privateMainBand = Math.min(privateSessionalIncome, remainingMainBand);
    class4NI += privateMainBand * CLASS4_MAIN_RATE;

    const privateAboveUEL = Math.max(0, privateSessionalIncome - remainingMainBand);
    class4NI += privateAboveUEL * CLASS4_UPPER_RATE;
  }

  // Student loan on total income
  let studentLoanRepayment = 0;
  if (studentLoanPlan !== "none") {
    const threshold = STUDENT_LOAN_THRESHOLDS[studentLoanPlan];
    if (totalIncome > threshold) {
      studentLoanRepayment = (totalIncome - threshold) * 0.09;
    }
  }

  const totalDeductions = incomeTax + class1NI + class4NI + nhsSuper + studentLoanRepayment;
  const annualNetTakeHome = totalIncome - totalDeductions;
  const monthlyNetTakeHome = annualNetTakeHome / 12;
  const effectiveTaxRate = totalIncome > 0 ? totalDeductions / totalIncome : 0;

  return {
    totalIncome,
    personalAllowance: pa,
    incomeTax,
    class1NI,
    class4NI,
    nhsSuper,
    superTierRate,
    studentLoanRepayment,
    totalDeductions,
    annualNetTakeHome,
    monthlyNetTakeHome,
    effectiveTaxRate,
  };
}
