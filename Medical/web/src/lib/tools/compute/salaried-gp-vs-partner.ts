/**
 * Salaried GP vs GP partner comparison — pure compute library.
 *
 * No React, no DOM, no fetch. Plain functions callable from Node/Vitest.
 *
 * Tax year: 2026/27. Income-tax band rule (LOCKED, TOOL_ROSTER.md §5):
 *   PA £12,570 tapered £1 per £2 above £100,000, zero at £125,140.
 *   Basic band FIXED £37,700. Higher band width = (125,140 - PA) - 37,700.
 *   45% above £125,140.
 *
 * Class 1 employee NI (salaried): 8% on £12,570-£50,270; 2% above.
 * Class 4 NI (partner, self-employed): 6% on £12,570-£50,270; 2% above.
 *
 * NHS employee superannuation tiers come from the shared single-source module
 * compute/nhs-super-tiers.ts. Do NOT inline a table here.
 *
 * Mirrors the premium config compute (premium/configs/salaried-gp-vs-partner.ts)
 * — golden values verified against its worked example (£90k vs £110k).
 */

import { nhsSuperEmployeeRate } from "./nhs-super-tiers";
import type { StudentLoanPlan } from "./locum-tax";

export type { StudentLoanPlan };

export type GpVsPartnerInput = {
  salariedPay: number;
  partnerProfitShare: number;
  studentLoanPlan: StudentLoanPlan;
};

export type GpSideResult = {
  grossPay: number;
  personalAllowance: number;
  incomeTax: number;
  ni: number;
  nhsSuper: number;
  superTierRate: number; // fraction, e.g. 0.125
  studentLoanRepayment: number;
  totalDeductions: number;
  netPay: number;
  effectiveDeductionRate: number; // fraction, e.g. 0.43
};

export type GpVsPartnerResult = {
  salaried: GpSideResult;
  partner: GpSideResult;
  grossGap: number; // partner gross minus salaried gross
  netGap: number; // partner net minus salaried net
};

// ── 2026/27 income-tax constants ──────────────────────────────────────────────
const PERSONAL_ALLOWANCE_BASE = 12570;
const BASIC_RATE_BAND = 37700; // fixed
const HIGHER_RATE_LIMIT = 125140; // 45% above this

// ── 2026/27 NI constants (thresholds shared by Class 1 and Class 4) ───────────
const NI_LOWER = 12570;
const NI_UPPER = 50270;

// ── Student loan thresholds (2025/26; update if HMRC revises) ─────────────────
const STUDENT_LOAN_THRESHOLDS: Record<StudentLoanPlan, number> = {
  plan1: 26065,
  plan2: 28470,
  plan4: 32745,
  none: Infinity,
};

function calcIncomeTax(gross: number): { pa: number; tax: number } {
  const pa =
    gross <= 100000
      ? PERSONAL_ALLOWANCE_BASE
      : Math.max(0, PERSONAL_ALLOWANCE_BASE - Math.floor((gross - 100000) / 2));

  const taxable = Math.max(0, gross - pa);
  const higherBandWidth = Math.max(0, HIGHER_RATE_LIMIT - pa - BASIC_RATE_BAND);

  let tax = Math.min(taxable, BASIC_RATE_BAND) * 0.2;
  if (taxable > BASIC_RATE_BAND) {
    tax += Math.min(taxable - BASIC_RATE_BAND, higherBandWidth) * 0.4;
  }
  if (taxable > BASIC_RATE_BAND + higherBandWidth) {
    tax += (taxable - BASIC_RATE_BAND - higherBandWidth) * 0.45;
  }
  return { pa, tax };
}

function calcNI(income: number, mainRate: number): number {
  const main = Math.max(Math.min(income, NI_UPPER) - NI_LOWER, 0) * mainRate;
  const upper = Math.max(income - NI_UPPER, 0) * 0.02;
  return main + upper;
}

function calcSide(gross: number, niMainRate: number, plan: StudentLoanPlan): GpSideResult {
  const { pa, tax } = calcIncomeTax(gross);
  const ni = calcNI(gross, niMainRate);
  const superTierRate = nhsSuperEmployeeRate(gross);
  const nhsSuper = gross * superTierRate;
  const studentLoanRepayment = Math.max(gross - STUDENT_LOAN_THRESHOLDS[plan], 0) * 0.09;
  const totalDeductions = tax + ni + nhsSuper + studentLoanRepayment;
  const netPay = gross - totalDeductions;
  return {
    grossPay: gross,
    personalAllowance: pa,
    incomeTax: tax,
    ni,
    nhsSuper,
    superTierRate,
    studentLoanRepayment,
    totalDeductions,
    netPay,
    effectiveDeductionRate: gross > 0 ? totalDeductions / gross : 0,
  };
}

export function calcGpVsPartner(input: GpVsPartnerInput): GpVsPartnerResult {
  const salariedPay = Math.max(input.salariedPay || 0, 0);
  const partnerProfitShare = Math.max(input.partnerProfitShare || 0, 0);
  const plan = input.studentLoanPlan;

  const salaried = calcSide(salariedPay, 0.08, plan); // Class 1 employee NI
  const partner = calcSide(partnerProfitShare, 0.06, plan); // Class 4 NI

  return {
    salaried,
    partner,
    grossGap: partner.grossPay - salaried.grossPay,
    netGap: partner.netPay - salaried.netPay,
  };
}
