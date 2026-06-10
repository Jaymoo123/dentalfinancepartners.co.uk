/**
 * UK Corporation Tax, 2026/27 (rates unchanged since April 2023):
 *   Small profits rate 19% on taxable profits up to £50,000.
 *   Main rate 25% on profits of £250,000 or more.
 *   Marginal relief eases between the two (standard fraction 3/200), giving an
 *   effective rate of about 26.5% on the slice between £50,000 and £250,000.
 * The £50,000 / £250,000 limits are shared between associated companies and
 * reduced for short accounting periods (assumed standalone, 12 months here).
 */
export const SMALL_PROFITS_RATE = 0.19;
export const MAIN_RATE = 0.25;
export const CT_LOWER_LIMIT = 50_000;
export const CT_UPPER_LIMIT = 250_000;
export const CT_MARGINAL_FRACTION = 3 / 200;

export function corporationTax(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= CT_LOWER_LIMIT) return profit * SMALL_PROFITS_RATE;
  if (profit >= CT_UPPER_LIMIT) return profit * MAIN_RATE;
  return profit * MAIN_RATE - (CT_UPPER_LIMIT - profit) * CT_MARGINAL_FRACTION;
}

export function corporationTaxEffectiveRate(profit: number): number {
  return profit > 0 ? (corporationTax(profit) / profit) * 100 : 0;
}
