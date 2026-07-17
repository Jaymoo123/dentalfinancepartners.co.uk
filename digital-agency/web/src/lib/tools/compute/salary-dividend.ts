/**
 * Salary vs dividend optimiser — pure compute, no React, no window/document/fetch.
 * 2025/26 UK tax rates.
 * Employer NI: 15% / £5,000 secondary threshold / £10,500 EA (from 6 Apr 2025).
 * Dividend tax: 10.75% / 35.75% / 39.35% (FA 2026, from 6 Apr 2026).
 *
 * TL-03: zero client/server dependencies; safe to import in golden tests or
 * server components without hydration.
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const NI_PRIMARY_THRESHOLD = 12570;
const NI_SECONDARY_THRESHOLD = 5000;
const EMPLOYEE_NI_BASIC = 0.08;
const EMPLOYER_NI = 0.15;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_THRESHOLD = 250000;
const CT_SMALL_RATE = 0.19;
const CT_MAIN_RATE = 0.25;
const EMPLOYMENT_ALLOWANCE = 10500;

export type SalaryDividendResult = {
  salary: number;
  dividend: number;
  employerNi: number;
  employeeNi: number;
  incomeTax: number;
  dividendTax: number;
  corporationTax: number;
  totalTax: number;
  netCash: number;
};

export type SalaryDividendInput = {
  profitBeforeDirector: number;
  useEmploymentAllowance: boolean;
};

export type SalaryDividendOutput = {
  optimal: SalaryDividendResult;
  salaryOnly: SalaryDividendResult;
  dividendOnly: SalaryDividendResult;
  optimalVsSalaryOnly: number;
  optimalVsDividendOnly: number;
};

function calcEmployerNi(salary: number, includeAllowance: boolean): number {
  if (salary <= NI_SECONDARY_THRESHOLD) return 0;
  const liability = (salary - NI_SECONDARY_THRESHOLD) * EMPLOYER_NI;
  const allowance = includeAllowance ? EMPLOYMENT_ALLOWANCE : 0;
  return Math.max(0, liability - allowance);
}

function calcEmployeeNi(salary: number): number {
  if (salary <= NI_PRIMARY_THRESHOLD) return 0;
  const upperEarningsLimit = 50270;
  const inBand = Math.min(salary, upperEarningsLimit) - NI_PRIMARY_THRESHOLD;
  const above = Math.max(0, salary - upperEarningsLimit);
  return inBand * EMPLOYEE_NI_BASIC + above * 0.02;
}

function calcIncomeTaxOnSalary(salary: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary - 100000) / 2);
  const taxable = Math.max(0, salary - pa);
  // 45% band starts at £125,140 gross = (HIGHER_RATE_LIMIT - pa) taxable; the fixed
  // £74,870 higher band is only correct at the full PA.
  const higherBand = Math.max(0, HIGHER_RATE_LIMIT - pa - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE));
  const basic = Math.min(taxable, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(taxable - basic, higherBand));
  const additional = Math.max(0, taxable - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

function calcDividendTax(salary: number, dividend: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary + dividend > 100000) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - (salary + dividend - 100000) / 2);
  }
  const paUsedBySalary = Math.min(salary, pa);
  const paLeftForDividend = Math.max(0, pa - paUsedBySalary);
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;

  const basicBandCapacity = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  // Higher band runs from the basic limit up to the £125,140 additional threshold,
  // which shrinks in taxable terms as the PA tapers: (HIGHER_RATE_LIMIT - pa) - basic.
  const higherBandCapacity = Math.max(0, HIGHER_RATE_LIMIT - pa - basicBandCapacity);
  const salaryInBasic = Math.min(Math.max(0, salary - pa), basicBandCapacity);
  const salaryInHigher = Math.min(Math.max(0, salary - pa - salaryInBasic), higherBandCapacity);
  const remainingBasic = basicBandCapacity - salaryInBasic;
  const remainingHigher = higherBandCapacity - salaryInHigher;

  let div = taxableDividend;
  let tax = 0;
  const inBasic = Math.min(div, Math.max(0, remainingBasic));
  tax += inBasic * DIVIDEND_BASIC;
  div -= inBasic;
  const inHigher = Math.min(div, Math.max(0, remainingHigher));
  tax += inHigher * DIVIDEND_HIGHER;
  div -= inHigher;
  tax += div * DIVIDEND_ADDITIONAL;
  return tax;
}

function calcCorporationTax(taxableProfit: number): number {
  if (taxableProfit <= 0) return 0;
  if (taxableProfit <= CT_SMALL_THRESHOLD) return taxableProfit * CT_SMALL_RATE;
  if (taxableProfit >= CT_MAIN_THRESHOLD) return taxableProfit * CT_MAIN_RATE;
  const small = CT_SMALL_THRESHOLD * CT_SMALL_RATE;
  const marginal = (taxableProfit - CT_SMALL_THRESHOLD) * 0.265;
  return small + marginal;
}

function modelExtraction(salary: number, profitBeforeDirector: number, useEA: boolean): SalaryDividendResult {
  const employerNi = calcEmployerNi(salary, useEA);
  const profitAfterPayroll = profitBeforeDirector - salary - employerNi;
  const corporationTax = calcCorporationTax(Math.max(0, profitAfterPayroll));
  const distributableProfit = Math.max(0, profitAfterPayroll - corporationTax);
  const dividend = distributableProfit;
  const employeeNi = calcEmployeeNi(salary);
  const incomeTax = calcIncomeTaxOnSalary(salary);
  const dividendTax = calcDividendTax(salary, dividend);
  const totalTax = employerNi + corporationTax + employeeNi + incomeTax + dividendTax;
  const netCash = salary - employeeNi - incomeTax + dividend - dividendTax;
  return { salary, dividend, employerNi, employeeNi, incomeTax, dividendTax, corporationTax, totalTax, netCash };
}

function findOptimal(profitBeforeDirector: number, useEA: boolean): SalaryDividendResult {
  let best: SalaryDividendResult | null = null;
  const maxSalary = Math.min(profitBeforeDirector, 60000);
  for (let s = 0; s <= maxSalary; s += 10) {
    const r = modelExtraction(s, profitBeforeDirector, useEA);
    if (!best || r.netCash > best.netCash) best = r;
  }
  return best!;
}

export function calcSalaryDividend(input: SalaryDividendInput): SalaryDividendOutput {
  const optimal = findOptimal(input.profitBeforeDirector, input.useEmploymentAllowance);
  const salaryOnly = modelExtraction(
    Math.min(input.profitBeforeDirector, 60000),
    input.profitBeforeDirector,
    input.useEmploymentAllowance,
  );
  const dividendOnly = modelExtraction(0, input.profitBeforeDirector, input.useEmploymentAllowance);
  return {
    optimal,
    salaryOnly,
    dividendOnly,
    optimalVsSalaryOnly: optimal.netCash - salaryOnly.netCash,
    optimalVsDividendOnly: optimal.netCash - dividendOnly.netCash,
  };
}
