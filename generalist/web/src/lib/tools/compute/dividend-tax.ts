/**
 * Dividend Tax Calculator 2026/27 — pure compute module.
 *
 * FA 2026 s.4 dividend rates (10.75% / 35.75% / 39.35%) with a built-in
 * comparison against 2025/26 rates (8.75% / 33.75% / 39.35%).
 * 2026/27 rates and bands via @/lib/uk-tax-rates (canonical source);
 * 2025/26 dividend rates are hardcoded here as the comparison baseline.
 * No React / DOM / fetch.
 */
import { UK_TAX_RATES as T } from "@/lib/uk-tax-rates";

const PERSONAL_ALLOWANCE: number = T.incomeTax.personalAllowance;
const BASIC_RATE_LIMIT: number = T.incomeTax.basicRateUpperLimit;
const HIGHER_RATE_LIMIT: number = T.incomeTax.higherRateUpperLimit;
const DIVIDEND_ALLOWANCE: number = T.dividendTax.allowance;

const RATES_2026_27 = {
  basic: T.dividendTax.basicRate,
  higher: T.dividendTax.higherRate,
  additional: T.dividendTax.additionalRate,
};
// 2025/26 baseline for the year-on-year comparison (pre-FA 2026 s.4).
const RATES_2025_26 = { basic: 0.0875, higher: 0.3375, additional: 0.3935 };

export type DividendTaxResult = {
  personalAllowance: number;
  paUsedByDividends: number;
  allowanceUsed: number;
  /** taxable dividend amounts by band, after PA and the £500 allowance */
  taxedAtBasic: number;
  taxedAtHigher: number;
  taxedAtAdditional: number;
  basicTax: number;
  higherTax: number;
  additionalTax: number;
  totalTax: number;
  /** totalTax / dividend income (0 if no dividends) */
  effectiveRate: number;
  netDividend: number;
  /** same calculation at 2025/26 dividend rates */
  tax2025_26: number;
  /** totalTax - tax2025_26 (the FA 2026 increase) */
  increaseVs2025_26: number;
};

export function calcDividendTax(otherIncome: number, dividends: number): DividendTaxResult {
  const total = otherIncome + dividends;
  let pa = PERSONAL_ALLOWANCE;
  if (total > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (total - 100000) / 2);

  const paUsedByOther = Math.min(otherIncome, pa);
  const paUsedByDividends = Math.min(dividends, pa - paUsedByOther);
  const divAfterPA = dividends - paUsedByDividends;
  const taxableOther = otherIncome - paUsedByOther;

  // Band capacities are defined on TAXABLE income (after PA). Basic is fixed at
  // £37,700; the higher band runs up to (125,140 - pa), so its width GROWS as
  // the personal allowance tapers above £100k and must track the tapered pa.
  const basicCap = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const higherCap = Math.max(0, HIGHER_RATE_LIMIT - pa - basicCap);

  const otherInBasic = Math.min(taxableOther, basicCap);
  const otherInHigher = Math.min(taxableOther - otherInBasic, higherCap);

  let d = divAfterPA;
  const inBasic = Math.min(d, basicCap - otherInBasic);
  d -= inBasic;
  const inHigher = Math.min(d, higherCap - otherInHigher);
  d -= inHigher;
  const inAdditional = d;

  // The £500 dividend allowance is a 0% band: it uses up band capacity and
  // covers the lowest-taxed slice of dividend income first.
  let allow = Math.min(DIVIDEND_ALLOWANCE, divAfterPA);
  const allowanceUsed = allow;
  const allowInBasic = Math.min(allow, inBasic);
  allow -= allowInBasic;
  const allowInHigher = Math.min(allow, inHigher);
  allow -= allowInHigher;
  const allowInAdditional = Math.min(allow, inAdditional);

  const taxedAtBasic = inBasic - allowInBasic;
  const taxedAtHigher = inHigher - allowInHigher;
  const taxedAtAdditional = inAdditional - allowInAdditional;

  const taxAt = (r: { basic: number; higher: number; additional: number }) =>
    taxedAtBasic * r.basic + taxedAtHigher * r.higher + taxedAtAdditional * r.additional;

  const basicTax = taxedAtBasic * RATES_2026_27.basic;
  const higherTax = taxedAtHigher * RATES_2026_27.higher;
  const additionalTax = taxedAtAdditional * RATES_2026_27.additional;
  const totalTax = basicTax + higherTax + additionalTax;
  const tax2025_26 = taxAt(RATES_2025_26);

  return {
    personalAllowance: pa,
    paUsedByDividends,
    allowanceUsed,
    taxedAtBasic,
    taxedAtHigher,
    taxedAtAdditional,
    basicTax,
    higherTax,
    additionalTax,
    totalTax,
    effectiveRate: dividends > 0 ? totalTax / dividends : 0,
    netDividend: dividends - totalTax,
    tax2025_26,
    increaseVs2025_26: totalTax - tax2025_26,
  };
}
