/**
 * Sole Trader vs Limited Company — pure compute module.
 *
 * Decision tool (crossover analysis), not a payslip. Compares full-year net
 * cash at 2026/27 rates for the same pre-tax profit taken two ways:
 *   - Sole trader: income tax + Class 4 NI (6% main / 2% upper)
 *   - Ltd, full extraction: salary £12,570 (sole director, NO Employment
 *     Allowance), employer NI 15% above £5,000, CT 19/25% with 26.5%
 *     marginal band, remainder as dividends (£500 allowance,
 *     10.75% / 35.75% / 39.35%)
 *
 * Reuses the salary-dividend compute primitives so both tools stay in
 * lock-step with @/lib/uk-tax-rates.
 */
import { UK_TAX_RATES as T } from "@/lib/uk-tax-rates";
import {
  calcCorporationTaxSD,
  calcDividendTaxSD,
  calcIncomeTaxOnSalary,
} from "./salary-dividend";

const SE = T.nationalInsurance.selfEmployed;
const CLASS4_LOWER: number = SE.lowerProfitsThreshold; // 12,570
const CLASS4_UPPER: number = T.nationalInsurance.employee.upperEarningsLimit; // 50,270
const OPTIMAL_SALARY: number = T.incomeTax.personalAllowance; // 12,570
const ER_THRESHOLD: number = T.nationalInsurance.employer.secondaryThreshold; // 5,000
const ER_RATE: number = T.nationalInsurance.employer.rate; // 0.15

export function calcClass4(profit: number): number {
  if (profit <= CLASS4_LOWER) return 0;
  const inBand = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const above = Math.max(0, profit - CLASS4_UPPER);
  return inBand * SE.class4MainRate + above * SE.class4UpperRate;
}

export type SoleTraderResult = {
  incomeTax: number;
  class4: number;
  net: number;
};

export function calcSoleTrader(profit: number): SoleTraderResult {
  const incomeTax = calcIncomeTaxOnSalary(profit);
  const class4 = calcClass4(profit);
  return { incomeTax, class4, net: profit - incomeTax - class4 };
}

export type LtdResult = {
  salary: number;
  employerNi: number;
  corporationTax: number;
  dividend: number;
  dividendTax: number;
  net: number;
};

/**
 * Ltd path at the standard optimal salary (£12,570), full extraction.
 * Sole-director company: Employment Allowance NOT available, so employer NI
 * always applies above £5,000. At low profits the salary is capped so
 * salary + employer NI never exceeds profit.
 */
export function calcLtd(profit: number): LtdResult {
  // ponytail: closed-form cap instead of a search — salary + 15% ER NI above £5k must fit inside profit
  const cap =
    profit <= ER_THRESHOLD
      ? profit
      : (profit + ER_THRESHOLD * ER_RATE) / (1 + ER_RATE);
  const salary = Math.min(OPTIMAL_SALARY, Math.max(0, cap));
  const employerNi = Math.max(0, salary - ER_THRESHOLD) * ER_RATE;
  const taxableProfit = Math.max(0, profit - salary - employerNi);
  const corporationTax = calcCorporationTaxSD(taxableProfit);
  const dividend = Math.max(0, taxableProfit - corporationTax);
  const dividendTax = calcDividendTaxSD(salary, dividend);
  // salary ≤ personal allowance → no income tax, no employee NI on it
  const net = salary + dividend - dividendTax;
  return { salary, employerNi, corporationTax, dividend, dividendTax, net };
}

export type Comparison = {
  soleTrader: SoleTraderResult;
  ltd: LtdResult;
  /** ltd net minus extra admin cost, minus sole trader net */
  difference: number;
};

export function compare(profit: number, ltdAdminCost: number): Comparison {
  const soleTrader = calcSoleTrader(profit);
  const ltd = calcLtd(profit);
  return { soleTrader, ltd, difference: ltd.net - ltdAdminCost - soleTrader.net };
}

/**
 * First profit level (£20k–£150k, £100 steps) where the Ltd route beats the
 * sole trader route after the extra admin cost. Returns null if the company
 * never wins in that range. Note the advantage is NOT monotonic under
 * 2026/27 rates: on full extraction the Ltd edge opens just above ~£60k and
 * closes again once the 26.5% CT marginal band + 35.75% dividend rate bite,
 * so also report the window end.
 */
export function findCrossover(
  ltdAdminCost: number,
): { from: number; to: number | null } | null {
  let from: number | null = null;
  let lastWinning: number | null = null;
  for (let p = 20000; p <= 150000; p += 100) {
    const winning = compare(p, ltdAdminCost).difference > 0;
    if (winning && from === null) from = p;
    if (winning) lastWinning = p;
  }
  if (from === null) return null;
  // window closes if the last winning point is inside the scanned range
  const to = lastWinning !== null && lastWinning < 150000 ? lastWinning : null;
  return { from, to };
}

/** Chart-friendly series across the scanned range (for future bespoke chart). */
export function buildSeries(
  ltdAdminCost: number,
): { profit: number; soleTraderNet: number; ltdNet: number }[] {
  const out: { profit: number; soleTraderNet: number; ltdNet: number }[] = [];
  for (let p = 20000; p <= 150000; p += 10000) {
    const c = compare(p, ltdAdminCost);
    out.push({ profit: p, soleTraderNet: c.soleTrader.net, ltdNet: c.ltd.net - ltdAdminCost });
  }
  return out;
}
