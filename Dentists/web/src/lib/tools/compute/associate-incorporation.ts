/**
 * Associate Incorporation Comparison compute lib — UK 2026/27
 *
 * Sole-trader associate vs limited company, INCLUDING the NHS Pension
 * consequence that generic incorporation calculators ignore.
 *
 * Pure functions only: no React, no window, no document, no fetch.
 *
 * Figures sourced:
 *   - Income tax bands/rates (PA £12,570, 20%/40%/45%, taper over £100k): HMRC 2026/27
 *   - Class 4 NI 6% (£12,570–£50,270), 2% above: HMRC 2026/27
 *   - Class 2 NI £3.45/week where profit > £6,725: HMRC 2026/27
 *   - Employer NI 15% above £5,000 secondary threshold: HMRC from 6 Apr 2025
 *   - Employee NI 8% (£12,570–£50,270), 2% above: HMRC 2026/27
 *   - Dividend allowance £500; rates 10.75%/35.75%/39.35%: FA 2026 s.4 from 6 Apr 2026
 *   - CT 19% small profits (≤£50,000), 26.5% marginal relief band, 25% main (≥£250,000)
 *   - Optimal director salary £12,570 (uses PA; no income tax or employee NI;
 *     employer NI £1,135.50, no Employment Allowance for single-director companies)
 *   - NHS Pension employer-equivalent value: 23.7% employer contribution rate
 *     (from 1 April 2024, up from 20.6%) plus 0.08% administration levy
 *     = 23.78% of pensionable earnings. This is the
 *     employer-side benefit a type-1 practitioner member receives that a
 *     Ltd-company associate generally forgoes. Rate vintages vary by scheme
 *     year and arrangement — treated as an estimate and flagged in tool copy.
 *
 * Limitations (stated in tool note):
 *   - NHS Pension access via a Ltd is a scheme-rule question, not a tax one;
 *     modelled as fully lost under the Ltd route (the common outcome for
 *     associate work billed through a company).
 *   - Member (employee-side) contributions are excluded from BOTH routes:
 *     they buy the benefit and net roughly off against it for comparison.
 *   - Full dividend extraction assumed; retained profit changes the answer.
 *   - IR35 and student loans not modelled.
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const CLASS4_RATE_LOWER = 0.06;
const CLASS4_RATE_UPPER = 0.02;
const INCOME_BASIC = 0.2;
const INCOME_HIGHER = 0.4;
const INCOME_ADDITIONAL = 0.45;
const CLASS2_WEEKLY = 3.45;
const CLASS2_THRESHOLD = 6725;
const NI_SECONDARY = 5000;
const EMPLOYER_NI = 0.15;
const DIVIDEND_ALLOWANCE = 500;
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_THRESHOLD = 250000;
const CT_SMALL_RATE = 0.19;
const CT_MAIN_RATE = 0.25;
const CT_MARGINAL_RATE = 0.265;
const LTD_ADMIN_COST = 1800;
const DIRECTOR_SALARY = 12570;
/** 23.7% employer contribution (from 1 Apr 2024) + 0.08% administration levy on pensionable pay. */
export const NHS_EMPLOYER_EQUIV_RATE = 0.2378;

function calcIncomeTax(taxable: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (taxable > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (taxable - 100000) / 2);
  const t = Math.max(0, taxable - pa);
  const basic = Math.min(t, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
  const higher = Math.max(0, Math.min(t - basic, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additional = Math.max(0, t - basic - higher);
  return basic * INCOME_BASIC + higher * INCOME_HIGHER + additional * INCOME_ADDITIONAL;
}

function calcClass4(profit: number): number {
  if (profit <= CLASS4_LOWER) return 0;
  const inLower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const inUpper = Math.max(0, profit - CLASS4_UPPER);
  return inLower * CLASS4_RATE_LOWER + inUpper * CLASS4_RATE_UPPER;
}

function calcCorporationTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_SMALL_THRESHOLD) return profit * CT_SMALL_RATE;
  if (profit >= CT_MAIN_THRESHOLD) return profit * CT_MAIN_RATE;
  return CT_SMALL_THRESHOLD * CT_SMALL_RATE + (profit - CT_SMALL_THRESHOLD) * CT_MARGINAL_RATE;
}

/** Dividend tax where the £12,570 salary has used the personal allowance. */
function calcDividendTax(salary: number, dividend: number): number {
  let pa = PERSONAL_ALLOWANCE;
  const total = salary + dividend;
  if (total > 100000) pa = Math.max(0, PERSONAL_ALLOWANCE - (total - 100000) / 2);
  const paLeftForDividend = Math.max(0, pa - Math.min(salary, pa));
  const taxableDividend = Math.max(0, dividend - paLeftForDividend - DIVIDEND_ALLOWANCE);
  if (taxableDividend === 0) return 0;
  const basicBand = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const higherBand = HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT;
  const salaryInBasic = Math.min(Math.max(0, salary - pa), basicBand);
  const remBasic = Math.max(0, basicBand - salaryInBasic);
  const remHigher = higherBand;
  let div = taxableDividend;
  let tax = 0;
  const inBasic = Math.min(div, remBasic);
  tax += inBasic * DIVIDEND_BASIC;
  div -= inBasic;
  const inHigher = Math.min(div, remHigher);
  tax += inHigher * DIVIDEND_HIGHER;
  div -= inHigher;
  tax += div * DIVIDEND_ADDITIONAL;
  return tax;
}

export type AssociateIncorporationResult = {
  associateShare: number;
  lab: number;
  netFees: number;
  pensionableEarnings: number;
  /** employer-equivalent NHS Pension value kept in the sole-trader route */
  pensionEmployerValue: number;
  soleTrader: {
    incomeTax: number;
    class4Ni: number;
    class2Ni: number;
    totalTax: number;
    net: number;
    /** net cash + pension employer-equivalent value */
    totalValue: number;
  };
  ltd: {
    salary: number;
    employerNi: number;
    adminCost: number;
    ctProfit: number;
    corporationTax: number;
    dividend: number;
    dividendTax: number;
    totalTax: number;
    net: number;
    /** net cash minus nothing: Ltd route has no NHS Pension value */
    totalValue: number;
  };
  /** ltd.net - soleTrader.net: the headline tax saving before pension */
  taxSavingBeforePension: number;
  /** ltd.totalValue - soleTrader.totalValue: the answer after pension */
  netPositionAfterPension: number;
  ltdWins: boolean;
};

export function calcAssociateIncorporation(
  grossFees: number,
  associatePct: number,
  labPct: number,
  expenses: number,
  nhsPct: number,
  pensionableOverride: number,
): AssociateIncorporationResult {
  const associateShare = grossFees * (associatePct / 100);
  const lab = grossFees * (labPct / 100) * (associatePct / 100);
  const netFees = Math.max(0, associateShare - lab - expenses);

  // Pensionable earnings: NHS share of net fees, unless overridden.
  const pensionableEarnings =
    pensionableOverride > 0 ? pensionableOverride : netFees * (Math.min(100, Math.max(0, nhsPct)) / 100);
  const pensionEmployerValue = pensionableEarnings * NHS_EMPLOYER_EQUIV_RATE;

  // Sole trader
  const stIncomeTax = calcIncomeTax(netFees);
  const stClass4 = calcClass4(netFees);
  const stClass2 = netFees > CLASS2_THRESHOLD ? 52 * CLASS2_WEEKLY : 0;
  const stTotalTax = stIncomeTax + stClass4 + stClass2;
  const stNet = netFees - stTotalTax;

  // Ltd: £12,570 salary (no income tax or employee NI at that level), dividends
  const salary = Math.min(DIRECTOR_SALARY, netFees);
  const employerNi = Math.max(0, (salary - NI_SECONDARY) * EMPLOYER_NI);
  const ctProfit = Math.max(0, netFees - salary - employerNi - LTD_ADMIN_COST);
  const corporationTax = calcCorporationTax(ctProfit);
  const dividend = ctProfit - corporationTax;
  const dividendTax = calcDividendTax(salary, dividend);
  const ltdTotalTax = employerNi + corporationTax + dividendTax;
  // Admin cost already deducted pre-CT (it is a deductible company expense).
  const ltdNet = salary + dividend - dividendTax;

  const taxSavingBeforePension = ltdNet - stNet;
  const netPositionAfterPension = ltdNet - (stNet + pensionEmployerValue);

  return {
    associateShare,
    lab,
    netFees,
    pensionableEarnings,
    pensionEmployerValue,
    soleTrader: {
      incomeTax: stIncomeTax,
      class4Ni: stClass4,
      class2Ni: stClass2,
      totalTax: stTotalTax,
      net: stNet,
      totalValue: stNet + pensionEmployerValue,
    },
    ltd: {
      salary,
      employerNi,
      adminCost: LTD_ADMIN_COST,
      ctProfit,
      corporationTax,
      dividend,
      dividendTax,
      totalTax: ltdTotalTax,
      net: ltdNet,
      totalValue: ltdNet,
    },
    taxSavingBeforePension,
    netPositionAfterPension,
    ltdWins: netPositionAfterPension > 0,
  };
}
