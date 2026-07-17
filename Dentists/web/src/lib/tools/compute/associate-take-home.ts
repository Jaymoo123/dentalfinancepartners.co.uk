/**
 * Associate Take-Home Pay compute lib — UK 2026/27
 *
 * Pure functions only: no React, no window, no document, no fetch.
 * Extracted from AssociateTakeHomeCalculator.tsx — golden tests pin the output.
 *
 * Figures sourced:
 *   - PA £12,570 — HMRC Personal Allowance 2026/27 (unchanged from 2025/26)
 *   - Basic rate 20% up to £50,270 — HMRC income tax bands 2026/27 (unchanged)
 *   - Higher rate 40% up to £125,140 — HMRC income tax bands 2026/27 (unchanged)
 *   - Additional rate 45% above £125,140 — HMRC income tax bands 2026/27 (unchanged)
 *   - Class 4 NI 6% (£12,570–£50,270), 2% above — HMRC NI 2026/27 (unchanged)
 *   - Class 2 NI £3.45/week (52 weeks) where profit > £6,725 — HMRC NI 2026/27
 *
 * Limitations:
 *   - Excludes student loan repayments.
 *   - Excludes Marriage Allowance and other personal reliefs.
 *   - NHS Pension treated as deductible from taxable profit (practitioner arrangement).
 *   - Does not model Ltd-co associate structure.
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
const CLASS2_WEEKLY = 3.45;
const CLASS2_THRESHOLD = 6725;

function calcIncomeTax(taxable: number): number {
  let pa = PERSONAL_ALLOWANCE;
  if (taxable > 100000) {
    pa = Math.max(0, PERSONAL_ALLOWANCE - (taxable - 100000) / 2);
  }
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
  const inLower = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
  const inUpper = Math.max(0, profit - CLASS4_UPPER);
  return inLower * CLASS4_RATE_LOWER + inUpper * CLASS4_RATE_UPPER;
}

export type AssociateTakeHomeResult = {
  associateShare: number;
  lab: number;
  profit: number;
  taxableProfit: number;
  incomeTax: number;
  class4Ni: number;
  class2Ni: number;
  totalTax: number;
  netCash: number;
  effectiveRate: number;
};

export function calcAssociateTakeHome(
  grossFees: number,
  associatePct: number,
  labPct: number,
  expenses: number,
  pensionContribution: number,
): AssociateTakeHomeResult {
  const associateShare = grossFees * (associatePct / 100);
  const lab = grossFees * (labPct / 100) * (associatePct / 100);
  const afterLab = associateShare - lab;
  const profit = Math.max(0, afterLab - expenses);
  const nhsPensionEstimate = pensionContribution;
  const taxableProfit = profit - nhsPensionEstimate;
  const incomeTax = calcIncomeTax(taxableProfit);
  const class4Ni = calcClass4(Math.max(0, taxableProfit));
  const class2Ni = profit > CLASS2_THRESHOLD ? 52 * CLASS2_WEEKLY : 0;
  const totalTax = incomeTax + class4Ni + class2Ni;
  const netCash = taxableProfit - totalTax;
  return {
    associateShare,
    lab,
    profit,
    taxableProfit,
    incomeTax,
    class4Ni,
    class2Ni,
    totalTax,
    netCash,
    effectiveRate: profit > 0 ? (totalTax / profit) * 100 : 0,
  };
}
