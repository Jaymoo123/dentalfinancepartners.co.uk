/**
 * Pension Contribution Optimiser — pure compute module.
 *
 * Extracted from PensionContributionOptimiser.tsx. No React / DOM / fetch.
 * Dividend rates/allowance are sourced from uk-tax-rates.ts (the canonical
 * 2026/27 snapshot) so they cannot drift; the frozen thresholds are inlined.
 */

import { UK_TAX_RATES } from "@/lib/uk-tax-rates";

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const DIVIDEND_ALLOWANCE = UK_TAX_RATES.dividendTax.allowance;
const DIVIDEND_BASIC = UK_TAX_RATES.dividendTax.basicRate;
const DIVIDEND_HIGHER = UK_TAX_RATES.dividendTax.higherRate;
const DIVIDEND_ADDITIONAL = UK_TAX_RATES.dividendTax.additionalRate;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_THRESHOLD = 250000;
const CT_SMALL_RATE = 0.19;
const CT_MAIN_RATE = 0.25;
const CT_MARGINAL_RATE = 0.265;
const ANNUAL_ALLOWANCE = 60000;
const ANNUAL_ALLOWANCE_TAPER_FLOOR = 10000;

export function corporationTaxPension(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_THRESHOLD) return profit * CT_SMALL_RATE;
  if (profit >= CT_MAIN_THRESHOLD) return profit * CT_MAIN_RATE;
  return CT_SMALL_THRESHOLD * CT_SMALL_RATE + (profit - CT_SMALL_THRESHOLD) * CT_MARGINAL_RATE;
}

export function marginalCorpRate(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_THRESHOLD) return CT_SMALL_RATE;
  if (profit >= CT_MAIN_THRESHOLD) return CT_MAIN_RATE;
  return CT_MARGINAL_RATE;
}

export function dividendTaxOnAmount(salary: number, dividend: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (salary + dividend > 100000) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - (salary + dividend - 100000) / 2);
  }
  const paUsedBySalary = Math.min(salary, pa);
  const paLeftForDividend = Math.max(0, pa - paUsedBySalary);
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;

  const basicBandCapacity = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const higherBandCapacity = HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT;
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

export function taperedAnnualAllowance(adjustedIncome: number): number {
  if (adjustedIncome <= 260000) return ANNUAL_ALLOWANCE;
  const reduction = Math.floor((adjustedIncome - 260000) / 2);
  return Math.max(ANNUAL_ALLOWANCE_TAPER_FLOOR, ANNUAL_ALLOWANCE - reduction);
}

export type PensionResult = {
  allowance: number;
  contribution: number;
  capped: boolean;
  ctWithPension: number;
  ctNoPension: number;
  ctSaved: number;
  marginal: number;
  realCostToCompany: number;
  pensionAdvantage: number;
  netDividendIfTakenInstead: number;
  profitAfter: number;
};

export function calcPensionOptimisation(
  profit: number,
  salary: number,
  contribution: number,
  adjustedIncome: number,
): PensionResult {
  const allowance = taperedAnnualAllowance(adjustedIncome);
  const c = Math.min(contribution, allowance);
  const profitAfter = Math.max(0, profit - salary - c);
  const ctWithPension = corporationTaxPension(profitAfter);

  const profitNoPension = Math.max(0, profit - salary);
  const ctNoPension = corporationTaxPension(profitNoPension);
  const ctSaved = ctNoPension - ctWithPension;

  const marginal = marginalCorpRate(profitNoPension);
  const realCostToCompany = c - ctSaved;

  const dividendIfTakenInstead = Math.max(0, c - c * marginal);
  const dividendTaxIfTakenInstead = dividendTaxOnAmount(salary, dividendIfTakenInstead);
  const netDividendIfTakenInstead = dividendIfTakenInstead - dividendTaxIfTakenInstead;
  const pensionAdvantage = c - netDividendIfTakenInstead;

  return {
    allowance,
    contribution: c,
    capped: contribution > allowance,
    ctWithPension,
    ctNoPension,
    ctSaved,
    marginal,
    realCostToCompany,
    pensionAdvantage,
    netDividendIfTakenInstead,
    profitAfter,
  };
}
