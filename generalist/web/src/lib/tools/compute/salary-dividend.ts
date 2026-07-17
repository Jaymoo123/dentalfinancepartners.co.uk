/**
 * Salary & Dividend Optimiser — pure compute module.
 *
 * Extracted from SalaryDividendCalculator.tsx. No React / DOM / fetch.
 * All rates via @/lib/uk-tax-rates (single canonical source).
 */
import { UK_TAX_RATES as T } from "@/lib/uk-tax-rates";

const PERSONAL_ALLOWANCE: number = T.incomeTax.personalAllowance;
const BASIC_RATE_LIMIT: number = T.incomeTax.basicRateUpperLimit;
const HIGHER_RATE_LIMIT: number = T.incomeTax.higherRateUpperLimit;
const NI_PRIMARY_THRESHOLD: number = T.nationalInsurance.employee.primaryThreshold;
const NI_SECONDARY_THRESHOLD: number = T.nationalInsurance.employer.secondaryThreshold;
const EMPLOYEE_NI_BASIC: number = T.nationalInsurance.employee.mainRate;
const EMPLOYEE_NI_UPPER: number = T.nationalInsurance.employee.upperRate;
const EMPLOYEE_NI_UEL: number = T.nationalInsurance.employee.upperEarningsLimit;
const EMPLOYER_NI: number = T.nationalInsurance.employer.rate;
const INCOME_BASIC: number = T.incomeTax.basicRate;
const INCOME_HIGHER: number = T.incomeTax.higherRate;
const INCOME_ADDITIONAL: number = T.incomeTax.additionalRate;
const DIVIDEND_ALLOWANCE: number = T.dividendTax.allowance;
const DIVIDEND_BASIC: number = T.dividendTax.basicRate;
const DIVIDEND_HIGHER: number = T.dividendTax.higherRate;
const DIVIDEND_ADDITIONAL: number = T.dividendTax.additionalRate;
const CT_SMALL_THRESHOLD: number = T.corporationTax.smallProfitsUpperLimit;
const CT_MAIN_THRESHOLD: number = T.corporationTax.mainRateLowerLimit;
const CT_SMALL_RATE: number = T.corporationTax.smallProfitsRate;
const CT_MAIN_RATE: number = T.corporationTax.mainRate;
const EMPLOYMENT_ALLOWANCE: number = T.nationalInsurance.employer.employmentAllowance;

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

export function calcEmployerNi(salary: number, includeAllowance: boolean): number {
  if (salary <= NI_SECONDARY_THRESHOLD) return 0;
  const liability = (salary - NI_SECONDARY_THRESHOLD) * EMPLOYER_NI;
  const allowance = includeAllowance ? EMPLOYMENT_ALLOWANCE : 0;
  return Math.max(0, liability - allowance);
}

export function calcEmployeeNiSD(salary: number): number {
  if (salary <= NI_PRIMARY_THRESHOLD) return 0;
  const inBand = Math.min(salary, EMPLOYEE_NI_UEL) - NI_PRIMARY_THRESHOLD;
  const above = Math.max(0, salary - EMPLOYEE_NI_UEL);
  return inBand * EMPLOYEE_NI_BASIC + above * EMPLOYEE_NI_UPPER;
}

export function calcIncomeTaxOnSalary(salary: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (salary - 100000) / 2);
  const taxable = Math.max(0, salary - pa);
  // Bands on TAXABLE income: basic fixed £37,700; higher up to (125,140 - pa).
  // The higher band widens as PA tapers above £100k, so derive it from pa.
  const basicBandWidth = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const basic = Math.min(taxable, basicBandWidth);
  const higher = Math.max(0, Math.min(taxable - basic, HIGHER_RATE_LIMIT - pa - basicBandWidth));
  const additional = Math.max(0, taxable - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

export function calcDividendTaxSD(salary: number, dividend: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary + dividend > 100000) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - (salary + dividend - 100000) / 2);
  }
  const paUsedBySalary = Math.min(salary, pa);
  const paLeftForDividend = Math.max(0, pa - paUsedBySalary);
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;

  const basicBandCapacity = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  // Higher band runs up to (125,140 - pa) in taxable terms; it widens as PA tapers.
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

export function calcCorporationTaxSD(taxableProfit: number): number {
  if (taxableProfit <= 0) return 0;
  if (taxableProfit <= CT_SMALL_THRESHOLD) return taxableProfit * CT_SMALL_RATE;
  if (taxableProfit >= CT_MAIN_THRESHOLD) return taxableProfit * CT_MAIN_RATE;
  const small = CT_SMALL_THRESHOLD * CT_SMALL_RATE;
  const marginal = (taxableProfit - CT_SMALL_THRESHOLD) * 0.265;
  return small + marginal;
}

export function modelExtraction(
  salary: number,
  profitBeforeDirector: number,
  useEA: boolean,
): SalaryDividendResult {
  const employerNi = calcEmployerNi(salary, useEA);
  const profitAfterPayroll = profitBeforeDirector - salary - employerNi;
  const corporationTax = calcCorporationTaxSD(Math.max(0, profitAfterPayroll));
  const distributableProfit = Math.max(0, profitAfterPayroll - corporationTax);
  const dividend = distributableProfit;
  const employeeNi = calcEmployeeNiSD(salary);
  const incomeTax = calcIncomeTaxOnSalary(salary);
  const dividendTax = calcDividendTaxSD(salary, dividend);
  const totalTax = employerNi + corporationTax + employeeNi + incomeTax + dividendTax;
  const netCash = salary - employeeNi - incomeTax + dividend - dividendTax;
  return { salary, dividend, employerNi, employeeNi, incomeTax, dividendTax, corporationTax, totalTax, netCash };
}

export function findOptimalSalary(profitBeforeDirector: number, useEA: boolean): SalaryDividendResult {
  let best: SalaryDividendResult | null = null;
  const maxSalary = Math.min(profitBeforeDirector, 60000);
  for (let s = 0; s <= maxSalary; s += 10) {
    const r = modelExtraction(s, profitBeforeDirector, useEA);
    if (!best || r.netCash > best.netCash) best = r;
  }
  return best!;
}
