/**
 * Principal Extraction compute lib — UK 2026/27
 *
 * Pure functions only: no React, no window, no document, no fetch.
 * Extracted from PrincipalExtractionCalculator.tsx — golden tests pin the output.
 *
 * Figures sourced:
 *   - Same tax engine as locum-structure.ts (income tax, Class 4 NI, CT, dividend).
 *   - HMRC 2026/27 bands and rates.
 *   - Employer NI 15% above £5,000 secondary threshold: from 6 Apr 2025.
 *   - Dividend rates 10.75%/35.75%/39.35%: FA 2026 s.4 from 6 Apr 2026.
 *
 * Limitations:
 *   - Does NOT model NHS Pension accrual loss from incorporation.
 *   - Partnership = sole trader for tax purposes (single principal).
 *   - Ltd model assumes £12,570 director salary + balance as dividend, £2,500 admin cost.
 *   - No Employment Allowance (single-director restriction).
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_LOWER_RATE = 0.06;
const CLASS4_UPPER_RATE = 0.02;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const NI_PRIMARY = 12570;
/** Employer NI secondary threshold: £5,000 from 6 Apr 2025 (was £9,100). */
const NI_SECONDARY = 5000;
const EMPLOYEE_NI_BASIC = 0.08;
/** Employer NI rate: 15% from 6 Apr 2025 (was 13.8%). */
const EMPLOYER_NI = 0.15;
const DIVIDEND_ALLOWANCE = 500;
/** Dividend rates 2026/27: FA 2026 s.4 (+2pp across all bands from 6 Apr 2026). */
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_RATE = 0.25;
const CT_SMALL_RATE = 0.19;
const CLASS2_WEEKLY = 3.45;
const CLASS2_THRESHOLD = 6725;
const LTD_ADMIN_COST = 2500;

function calcIncomeTax(taxable: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (taxable > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (taxable - 100000) / 2);
  const t = Math.max(0, taxable - pa);
  // Bands measured on TAXABLE income (after PA): basic 0-37,700; higher up to
  // (125,140 - pa); additional above. The higher-band WIDTH grows as the PA
  // tapers, so it must be derived from the tapered pa, not a fixed 50,270 start.
  const basicBandWidth = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE; // fixed £37,700
  const basic = Math.min(t, basicBandWidth);
  const higher = Math.max(0, Math.min(t - basic, HIGHER_RATE_LIMIT - pa - basicBandWidth));
  const additional = Math.max(0, t - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

function calcClass4(profit: number): number {
  if (profit <= CLASS4_LOWER) return 0;
  const lower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const upper = Math.max(0, profit - CLASS4_UPPER);
  return lower * CLASS4_LOWER_RATE + upper * CLASS4_UPPER_RATE;
}

function calcEmployerNi(salary: number): number {
  if (salary <= NI_SECONDARY) return 0;
  return (salary - NI_SECONDARY) * EMPLOYER_NI;
}

function calcEmployeeNi(salary: number): number {
  if (salary <= NI_PRIMARY) return 0;
  const upperEl = 50270;
  const inBand = Math.min(salary, upperEl) - NI_PRIMARY;
  const above = Math.max(0, salary - upperEl);
  return inBand * EMPLOYEE_NI_BASIC + above * 0.02;
}

function calcCorporationTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_THRESHOLD) return profit * CT_SMALL_RATE;
  if (profit >= 250000) return profit * CT_MAIN_RATE;
  const small = CT_SMALL_THRESHOLD * CT_SMALL_RATE;
  const marginal = (profit - CT_SMALL_THRESHOLD) * 0.265;
  return small + marginal;
}

function calcDividendTax(salary: number, dividend: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary + dividend > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary + dividend - 100000) / 2);
  const paUsedBySalary = Math.min(salary, pa);
  const paLeftForDividend = Math.max(0, pa - paUsedBySalary);
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;
  const basicBand = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  // Higher-band width on taxable income widens as the tapered pa shrinks.
  const higherBand = Math.max(0, HIGHER_RATE_LIMIT - pa - basicBand);
  const salaryInBasic = Math.min(Math.max(0, salary - pa), basicBand);
  const salaryInHigher = Math.min(Math.max(0, salary - pa - salaryInBasic), higherBand);
  const remBasic = basicBand - salaryInBasic;
  const remHigher = higherBand - salaryInHigher;
  let div = taxableDividend;
  let tax = 0;
  const inBasic = Math.min(div, Math.max(0, remBasic));
  tax += inBasic * DIVIDEND_BASIC;
  div -= inBasic;
  const inHigher = Math.min(div, Math.max(0, remHigher));
  tax += inHigher * DIVIDEND_HIGHER;
  div -= inHigher;
  tax += div * DIVIDEND_ADDITIONAL;
  return tax;
}

export type StructureResult = { net: number; tax: number };

export type PrincipalExtractionResult = {
  partnership: StructureResult;
  ltd: StructureResult;
  pensionImpact: string;
};

export function calcPrincipalExtraction(
  profit: number,
  nhsActive: boolean,
  pensionContrib: number,
): PrincipalExtractionResult {
  const partnerIncomeTax = calcIncomeTax(profit - pensionContrib);
  const partnerClass4 = calcClass4(Math.max(0, profit - pensionContrib));
  const class2 = profit > CLASS2_THRESHOLD ? 52 * CLASS2_WEEKLY : 0;
  const partnershipNet = profit - partnerIncomeTax - partnerClass4 - class2;

  const ltdSalary = 12570;
  const ltdEmployerNi = calcEmployerNi(ltdSalary);
  const ltdProfitAfterSalary = Math.max(0, profit - ltdSalary - ltdEmployerNi - pensionContrib);
  const ltdCt = calcCorporationTax(ltdProfitAfterSalary);
  const ltdAfterCt = ltdProfitAfterSalary - ltdCt;
  const ltdDividend = Math.max(0, ltdAfterCt);
  const ltdSalaryTax = calcIncomeTax(ltdSalary);
  const ltdEmployeeNi = calcEmployeeNi(ltdSalary);
  const ltdDividendTax = calcDividendTax(ltdSalary, ltdDividend);
  const ltdNet =
    ltdSalary -
    ltdSalaryTax -
    ltdEmployeeNi +
    (ltdDividend - ltdDividendTax) -
    LTD_ADMIN_COST +
    pensionContrib;

  const partnershipNetTotal = partnershipNet + pensionContrib;

  const pensionImpact = nhsActive
    ? "Partnership preserves NHS Pension accrual on full profit. Ltd-co accrues only on the £12,570 salary."
    : "NHS Pension not a factor in your decision.";

  return {
    partnership: {
      net: partnershipNetTotal,
      tax: partnerIncomeTax + partnerClass4 + class2,
    },
    ltd: {
      net: ltdNet,
      tax: ltdSalaryTax + ltdEmployeeNi + ltdEmployerNi + ltdCt + ltdDividendTax + LTD_ADMIN_COST,
    },
    pensionImpact,
  };
}
