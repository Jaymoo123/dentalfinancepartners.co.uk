/**
 * Capital Gains Tax on residential property (UK individuals), 2026/27.
 * Locked from docs/property/house_positions.md and HMRC:
 *   Residential CGT rates: 18% within the unused basic-rate band, 24% above.
 *   Annual exempt amount: £3,000 (2024/25 onwards).
 *   Personal allowance £12,570; basic-rate band £37,700 (both frozen).
 *   Residential property gains must be reported and paid within 60 days.
 * Models an investment / second property (no Private Residence Relief). If the
 * property was ever a main home, PRR and final-period relief reduce the gain —
 * out of scope for a calculator, so it is flagged to the user instead.
 */
export const CGT_ANNUAL_EXEMPT_AMOUNT = 3_000;
export const PERSONAL_ALLOWANCE = 12_570;
export const BASIC_RATE_BAND = 37_700;
export const CGT_RESIDENTIAL_BASIC = 0.18;
export const CGT_RESIDENTIAL_HIGHER = 0.24;

export interface CgtInputs {
  salePrice: number;
  purchasePrice: number;
  costs: number; // buying + selling + capital improvement costs
  otherIncome: number; // taxable income for the year, before this gain
  aeaUsed: boolean; // annual exempt amount already used elsewhere
}

export interface CgtResult {
  gain: number;
  aea: number;
  taxableGain: number;
  atBasic: number; // amount of gain taxed at 18%
  atHigher: number; // amount of gain taxed at 24%
  taxAtBasic: number;
  taxAtHigher: number;
  tax: number;
  effectiveRate: number; // tax as % of the gain
}

export function computeCgt(i: CgtInputs): CgtResult {
  const gain = Math.max(0, i.salePrice - i.purchasePrice - i.costs);
  const aea = i.aeaUsed ? 0 : CGT_ANNUAL_EXEMPT_AMOUNT;
  const taxableGain = Math.max(0, gain - aea);

  const incomeAbovePA = Math.max(0, i.otherIncome - PERSONAL_ALLOWANCE);
  const unusedBasicBand = Math.max(0, BASIC_RATE_BAND - incomeAbovePA);

  const atBasic = Math.min(taxableGain, unusedBasicBand);
  const atHigher = taxableGain - atBasic;
  const taxAtBasic = atBasic * CGT_RESIDENTIAL_BASIC;
  const taxAtHigher = atHigher * CGT_RESIDENTIAL_HIGHER;
  const tax = taxAtBasic + taxAtHigher;
  const effectiveRate = gain > 0 ? (tax / gain) * 100 : 0;

  return { gain, aea, taxableGain, atBasic, atHigher, taxAtBasic, taxAtHigher, tax, effectiveRate };
}
