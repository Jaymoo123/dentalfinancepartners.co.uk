/**
 * GP partner drawings planner — pure compute library.
 *
 * No React, no DOM, no fetch. Callable from Node/Vitest.
 *
 * Tax year: 2026/27.
 *
 * INCOME-TAX BAND RULE (locked, TOOL_ROSTER.md §5):
 *   PA £12,570 tapered £1 per £2 above £100,000; zero at £125,140.
 *   Basic band FIXED £37,700.
 *   Higher band width = (125,140 - PA) - 37,700.
 *   45% above £125,140.
 *
 * Class 4 NI (2026/27): 6% on £12,570-£50,270, 2% above.
 * NHS superannuation: stepped tier from nhs-super-tiers.ts — never inline the table.
 */

import { nhsSuperEmployeeRate } from "./nhs-super-tiers";

export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4";

export type GpPartnerDrawingsInput = {
  profitShare: number;
  superannuablePay: number;
  studentLoanPlan: StudentLoanPlan;
  /** Fraction 0-0.30: extra buffer held back on top of computed liabilities */
  taxReserveRate: number;
};

export type GpPartnerDrawingsResult = {
  personalAllowance: number;
  incomeTax: number;
  basicTax: number;
  higherTax: number;
  additionalTax: number;
  class4NI: number;
  superAmount: number;
  superRate: number;
  studentLoanRepayment: number;
  bufferAmount: number;
  totalSetAside: number;
  netAnnual: number;
  monthlyDrawings: number;
  effectiveRate: number; // fraction; excludes buffer
};

// 2026/27 constants
const PA_BASE = 12570;
const BASIC_BAND = 37700;
const HIGHER_LIMIT = 125140;
const PA_TAPER_START = 100000;
const C4_LPL = 12570;
const C4_UPL = 50270;

const SL_THRESHOLDS: Record<StudentLoanPlan, number> = {
  none: Infinity,
  plan1: 26065,
  plan2: 28470,
  plan4: 32745,
};

function calcPA(income: number): number {
  if (income <= PA_TAPER_START) return PA_BASE;
  if (income >= HIGHER_LIMIT) return 0;
  return Math.max(0, PA_BASE - (income - PA_TAPER_START) / 2);
}

function calcIncomeTax(income: number): {
  tax: number; pa: number; basicTax: number; higherTax: number; additionalTax: number;
} {
  const pa = calcPA(income);
  const taxable = Math.max(0, income - pa);
  const higherBandWidth = Math.max(0, HIGHER_LIMIT - pa - BASIC_BAND);

  const basicTax = Math.min(taxable, BASIC_BAND) * 0.2;
  const higherTax = Math.max(0, Math.min(taxable - BASIC_BAND, higherBandWidth)) * 0.4;
  const additionalTax = Math.max(0, taxable - BASIC_BAND - higherBandWidth) * 0.45;

  return { tax: basicTax + higherTax + additionalTax, pa, basicTax, higherTax, additionalTax };
}

function calcClass4NI(profit: number): number {
  const band1 = Math.max(0, Math.min(profit, C4_UPL) - C4_LPL) * 0.06;
  const band2 = Math.max(0, profit - C4_UPL) * 0.02;
  return band1 + band2;
}

function calcStudentLoan(income: number, plan: StudentLoanPlan): number {
  return Math.max(0, income - SL_THRESHOLDS[plan]) * 0.09;
}

export function calcGpPartnerDrawings(input: GpPartnerDrawingsInput): GpPartnerDrawingsResult {
  const { profitShare, superannuablePay, studentLoanPlan, taxReserveRate } = input;

  const { tax: incomeTax, pa: personalAllowance, basicTax, higherTax, additionalTax } =
    calcIncomeTax(profitShare);

  const class4NI = calcClass4NI(profitShare);

  const superRate = nhsSuperEmployeeRate(superannuablePay);
  const superAmount = superannuablePay * superRate;

  const studentLoanRepayment = calcStudentLoan(profitShare, studentLoanPlan);

  const bufferAmount = profitShare * Math.max(0, Math.min(0.3, taxReserveRate));
  const totalSetAside = incomeTax + class4NI + superAmount + studentLoanRepayment + bufferAmount;
  const netAnnual = Math.max(0, profitShare - totalSetAside);
  const monthlyDrawings = netAnnual / 12;

  const effectiveRate =
    profitShare > 0 ? (incomeTax + class4NI + superAmount + studentLoanRepayment) / profitShare : 0;

  return {
    personalAllowance,
    incomeTax,
    basicTax,
    higherTax,
    additionalTax,
    class4NI,
    superAmount,
    superRate,
    studentLoanRepayment,
    bufferAmount,
    totalSetAside,
    netAnnual,
    monthlyDrawings,
    effectiveRate,
  };
}
