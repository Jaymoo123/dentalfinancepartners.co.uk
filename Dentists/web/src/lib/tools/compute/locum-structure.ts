/**
 * Locum Structure Comparison compute lib — UK 2026/27
 *
 * Pure functions only: no React, no window, no document, no fetch.
 * Extracted from LocumStructureCalculator.tsx — golden tests pin the output.
 *
 * Figures sourced:
 *   - Income tax bands/rates: HMRC 2026/27
 *   - Class 4 NI 6%/2% thresholds: HMRC 2026/27
 *   - Class 2 NI £3.45/week: HMRC 2026/27
 *   - Employer NI 15% above £5,000 secondary threshold: HMRC from 6 Apr 2025
 *   - Employee NI 8% (£12,570–£50,270), 2% above: HMRC 2026/27
 *   - Dividend allowance £500: HMRC 2026/27
 *   - Dividend rates 10.75%/35.75%/39.35%: FA 2026 s.4 from 6 Apr 2026
 *   - CT small profits 19% (up to £50,000), marginal 26.5% relief, main 25%: HMRC 2023/24 onwards
 *
 * Limitations:
 *   - NHS Pension implications not modelled.
 *   - IR35 not modelled.
 *   - Umbrella margin assumed 5%; actual margins vary.
 *   - Ltd admin cost fixed at £1,800; actual varies.
 *   - No Employment Allowance (single-director restriction applies to most locum Ltd companies).
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_RATE_LOWER = 0.06;
const CLASS4_RATE_UPPER = 0.02;
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
const LTD_ADMIN_COST = 1800;
const UMBRELLA_MARGIN = 0.05;

function calcIncomeTax(taxable: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (taxable > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (taxable - 100000) / 2);
  const t = Math.max(0, taxable - pa);
  const basic = Math.min(t, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(t - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, t - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
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
  const higherBand = HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT;
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

export type LocumStructureResult = {
  grossIncome: number;
  profit: number;
  soleTrader: StructureResult;
  ltd: StructureResult;
  umbrella: StructureResult;
};

export function calcLocumStructure(
  dailyRate: number,
  daysPerYear: number,
  expenses: number,
): LocumStructureResult {
  const grossIncome = dailyRate * daysPerYear;
  const profit = Math.max(0, grossIncome - expenses);

  // Sole trader
  const soleTraderIncomeTax = calcIncomeTax(profit);
  const soleTraderNi = (() => {
    if (profit <= CLASS4_LOWER) return 0;
    const lower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
    const upper = Math.max(0, profit - CLASS4_UPPER);
    return lower * CLASS4_RATE_LOWER + upper * CLASS4_RATE_UPPER;
  })();
  const class2 = profit > CLASS2_THRESHOLD ? 52 * CLASS2_WEEKLY : 0;
  const soleTraderNet = profit - soleTraderIncomeTax - soleTraderNi - class2;

  // Ltd
  const ltdSalary = 12570;
  const ltdEmployerNi = calcEmployerNi(ltdSalary);
  const ltdEmployeeNi = calcEmployeeNi(ltdSalary);
  const ltdSalaryTax = calcIncomeTax(ltdSalary);
  const ltdProfitAfterSalary = Math.max(0, profit - ltdSalary - ltdEmployerNi);
  const ltdCt = calcCorporationTax(ltdProfitAfterSalary);
  const ltdAfterCt = ltdProfitAfterSalary - ltdCt;
  const ltdDividend = Math.max(0, ltdAfterCt);
  const ltdDividendTax = calcDividendTax(ltdSalary, ltdDividend);
  const ltdNet =
    ltdSalary -
    ltdSalaryTax -
    ltdEmployeeNi +
    (ltdDividend - ltdDividendTax) -
    LTD_ADMIN_COST;

  // Umbrella
  const umbrellaGross = grossIncome * (1 - UMBRELLA_MARGIN);
  const umbrellaFeesRetained = grossIncome * UMBRELLA_MARGIN;
  const umbrellaEmployerNi = calcEmployerNi(umbrellaGross);
  const umbrellaPayable = umbrellaGross - umbrellaEmployerNi;
  const umbrellaIncomeTax = calcIncomeTax(umbrellaPayable);
  const umbrellaEmployeeNi = calcEmployeeNi(umbrellaPayable);
  const umbrellaNet = umbrellaPayable - umbrellaIncomeTax - umbrellaEmployeeNi;

  return {
    grossIncome,
    profit,
    soleTrader: {
      net: soleTraderNet,
      tax: soleTraderIncomeTax + soleTraderNi + class2,
    },
    ltd: {
      net: ltdNet,
      tax: ltdSalaryTax + ltdEmployeeNi + ltdEmployerNi + ltdCt + ltdDividendTax + LTD_ADMIN_COST,
    },
    umbrella: {
      net: umbrellaNet,
      tax: umbrellaIncomeTax + umbrellaEmployeeNi + umbrellaEmployerNi + umbrellaFeesRetained,
    },
  };
}
