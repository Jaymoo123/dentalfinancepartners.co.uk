/**
 * Sole-trader tax helper — the ONLY new maths seam in the R2 premium fleet.
 *
 * Computes income tax + Class 4 NIC for a self-employed sole trader, reusing
 * calcIncomeTaxTHP from the existing take-home-pay compute lib for income tax
 * (no duplication of income-tax logic). Class 4 NIC is computed here using
 * the 2026/27 thresholds from uk-tax-rates.ts nationalInsurance.selfEmployed.
 *
 * Class 4 thresholds (2026/27):
 *   Lower Profits Threshold:  £12,570  (lowerProfitsThreshold in uk-tax-rates.ts)
 *   Upper Profits Limit:      £50,270  (income-tax higher-rate limit, per §2 of the brief)
 *   Main rate:                6%       (class4MainRate)
 *   Upper rate:               2%       (class4UpperRate)
 *
 * Sources: uk-tax-rates.ts nationalInsurance.selfEmployed; HMRC SA103F guidance.
 * Pure, no React, no side effects.
 */

import { calcIncomeTaxTHP } from "@/lib/tools/compute/take-home-pay";
import { UK_TAX_RATES as T } from "@/lib/uk-tax-rates";

// Class 4 thresholds
const CLASS4_LOWER: number = T.nationalInsurance.selfEmployed.lowerProfitsThreshold; // 12570
const CLASS4_UPPER: number = T.incomeTax.basicRateUpperLimit; // 50270 — upper profits limit per §2
const CLASS4_MAIN: number = T.nationalInsurance.selfEmployed.class4MainRate;  // 0.06
const CLASS4_UPPER_RATE: number = T.nationalInsurance.selfEmployed.class4UpperRate; // 0.02

export type SoleTraderTaxResult = {
  /** income tax on the profit (reused from calcIncomeTaxTHP) */
  incomeTax: number;
  /** Class 4 NIC */
  class4Nic: number;
  /** total tax and NIC */
  totalDeductions: number;
  /** net profit after income tax and Class 4 NIC */
  netCash: number;
};

/**
 * Calculate total tax and NIC for a sole trader on `profit`.
 *
 * Income tax is delegated to calcIncomeTaxTHP (which already handles the
 * personal allowance taper above £100k). Class 4 NIC is:
 *   6% on profits between £12,570 and £50,270
 *   2% on profits above £50,270
 *
 * No Class 2 NIC is included (Class 2 is now voluntary-only from 2024/25).
 */
export function soleTraderTax(profit: number): SoleTraderTaxResult {
  // Delegate income tax to the shared lib — never re-derive income tax.
  const { tax: incomeTax } = calcIncomeTaxTHP(profit);

  // Class 4 NIC
  let class4Nic = 0;
  if (profit > CLASS4_LOWER) {
    const inBand = Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER;
    class4Nic += inBand * CLASS4_MAIN;
  }
  if (profit > CLASS4_UPPER) {
    class4Nic += (profit - CLASS4_UPPER) * CLASS4_UPPER_RATE;
  }

  const totalDeductions = incomeTax + class4Nic;
  const netCash = profit - totalDeductions;

  return { incomeTax, class4Nic, totalDeductions, netCash };
}
