/**
 * Solicitor take-home compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from SolicitorTakeHomeCalculator.tsx.
 * Tax year: 2026/27 UK rates (updated from 2025/26).
 *
 * FIGURES TRACED:
 * - Personal allowance £12,570 (HMRC 2026/27, unchanged)
 * - Basic rate limit £50,270 / higher rate limit £125,140 (HMRC 2026/27, unchanged)
 * - Class 4 NI lower £12,570, upper £50,270 (HMRC 2026/27, unchanged); rates 6%/2%
 * - Primary NI threshold £12,570, secondary £5,000 (employer NIC 15% above
 *   £5,000 from 6 April 2025; corrected 2026-07-06, was stale at £9,100)
 * - Employee NI basic 8%, employer NI 15% (FA 2025, from April 2025, unchanged)
 * - Dividend allowance £500 (2024/25 onwards, unchanged)
 * - Dividend tax 10.75%/35.75%/39.35% (FA 2026 s.4, from 6 April 2026)
 *   HP §3: "from 6 April 2026 (Finance Act 2026 c.11 s.4) ordinary 10.75% / upper 35.75%,
 *   additional 39.35% unchanged"
 * - CT small profits rate 19% (profits <= 50,000), main rate 25%, marginal 26.5% (FA 2023)
 *
 * MANAGER-ORDERED FIX (2026-07-05, estate CRO parity R2):
 *   Dividend rates updated from 8.75%/33.75% (2025/26) to 10.75%/35.75% (2026/27 FA 2026 s.4).
 *   Additional rate 39.35% unchanged. All outputs relabelled 2026/27 basis.
 *   HP §3 locked; estate ground truth confirmed 2026-07-05.
 *
 * LIMITATIONS: Partnership and LLP are tax-transparent (same as sole trader).
 * Ltd assumes min-salary (£12,570), remainder as dividend, £2,500 admin cost,
 * no Employment Allowance. Matches old calculator output exactly except for the
 * updated 2026/27 dividend rates.
 */

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;
const CLASS4_LOWER = 12570;
const CLASS4_UPPER = 50270;
const NI_PRIMARY = 12570;
const NI_SECONDARY = 5000;
const EMPLOYEE_NI_BASIC = 0.08;
const EMPLOYER_NI = 0.15;
const INCOME_BASIC = 0.20;
const INCOME_HIGHER = 0.40;
const INCOME_ADDITIONAL = 0.45;
const DIVIDEND_ALLOWANCE = 500;
// FA 2026 s.4: dividend rates from 6 April 2026 (HP §3)
const DIVIDEND_BASIC = 0.1075;
const DIVIDEND_HIGHER = 0.3575;
const DIVIDEND_ADDITIONAL = 0.3935;
const CT_SMALL_THRESHOLD = 50000;
const CT_MAIN_RATE = 0.25;
const CT_SMALL_RATE = 0.19;

export type TakeHomeInput = {
  profit: number;
  pensionContrib: number;
};

export type StructureResult = {
  net: number;
  tax: number;
};

export type TakeHomeResult = {
  partnership: StructureResult;
  soleTrader: StructureResult;
  ltd: StructureResult;
};

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
  const lower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const upper = Math.max(0, profit - CLASS4_UPPER);
  return lower * 0.06 + upper * 0.02;
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

export function calcSolicitorTakeHome(input: TakeHomeInput): TakeHomeResult {
  const { profit, pensionContrib } = input;

  // Partnership / LLP / sole trader: tax-transparent, Class 4 NI + income tax on profit share
  const partnerIncomeTax = calcIncomeTax(profit - pensionContrib);
  const partnerClass4 = calcClass4(Math.max(0, profit - pensionContrib));
  const partnershipNet = profit - partnerIncomeTax - partnerClass4;
  const soleTraderNet = partnershipNet;

  // Limited company
  const ltdSalary = 12570;
  const ltdEmployerNi = calcEmployerNi(ltdSalary);
  const ltdProfitAfterSalary = Math.max(0, profit - ltdSalary - ltdEmployerNi - pensionContrib);
  const ltdCt = calcCorporationTax(ltdProfitAfterSalary);
  const ltdAfterCt = ltdProfitAfterSalary - ltdCt;
  const ltdDividend = Math.max(0, ltdAfterCt);
  const ltdSalaryTax = calcIncomeTax(ltdSalary);
  const ltdEmployeeNi = calcEmployeeNi(ltdSalary);
  const ltdDividendTax = calcDividendTax(ltdSalary, ltdDividend);
  const ltdAdminCost = 2500;
  const ltdNet = ltdSalary - ltdSalaryTax - ltdEmployeeNi + (ltdDividend - ltdDividendTax) - ltdAdminCost;

  return {
    partnership: { net: partnershipNet, tax: partnerIncomeTax + partnerClass4 },
    soleTrader: { net: soleTraderNet, tax: partnerIncomeTax + partnerClass4 },
    ltd: {
      net: ltdNet,
      tax: ltdSalaryTax + ltdEmployeeNi + ltdEmployerNi + ltdCt + ltdDividendTax + ltdAdminCost,
    },
  };
}
