/**
 * EOT Tax Saving Calculator — pure compute module. No React / DOM / fetch.
 *
 * Models the post-26-November-2025 rule (Autumn Budget 2025): CGT relief on
 * a disposal to an Employee Ownership Trust was cut from 100% to 50% with
 * immediate effect. 50% of the gain is chargeable at the time of sale;
 * the other 50% is not chargeable at sale but is held over and bites the
 * trustees on a future disposal of the shares. BADR and Investors' Relief
 * cannot be claimed on the taxable 50% (TCGA 1992 ss.236H-236U; CG67800+).
 *
 * The "old rule" column (pre-26 Nov 2025, 100% relief, £0 CGT) is shown only
 * as a contrast so the seller sees the size of the change — it is NOT a
 * current option.
 *
 * 2026/27 rates: CGT on shares 24% (higher/additional), 18% (within any
 * unused basic-rate band); annual exempt amount £3,000; BADR 18% from
 * 6 April 2026, lifetime limit £1,000,000 (unaffected by the £2.5m IHT
 * business-property-relief cap, a different relief).
 */

export type IncomeBand = "basic" | "higher";

const AEA = 3000;
const BADR_RATE = 0.18;
const HIGHER_RATE = 0.24;
const BASIC_RATE = 0.18;

export type EOTResult = {
  gain: number;
  /** 50% of the gain, chargeable to CGT now under the post-26-Nov-2025 rule */
  chargeableNow: number;
  /** 50% of the gain, not taxed at sale — latent, bites the trustees on a future disposal */
  heldOver: number;
  /** CGT payable now under the current (new) EOT rule */
  cgtNew: number;
  /** CGT under the old, pre-26-Nov-2025 100%-relief position — contrast only, not current law */
  cgtOld: number;
  netProceedsNew: number;
  netProceedsOld: number;
  /** comparison column: CGT if this had instead been a straight trade sale using BADR */
  tradeSaleCgt: number;
  tradeSaleNet: number;
  sellerRate: number;
};

export function calcEOTTaxSaving(
  saleValue: number,
  baseCost: number,
  ownershipPct: number,
  incomeBand: IncomeBand,
  badrRemaining: number,
): EOTResult {
  const value = Math.max(0, saleValue);
  const cost = Math.max(0, baseCost);
  const pct = Math.min(100, Math.max(0, ownershipPct)) / 100;
  const sellerRate = incomeBand === "higher" ? HIGHER_RATE : BASIC_RATE;

  const gain = Math.max(0, value - cost) * pct;
  const proceeds = value * pct;

  const chargeableNow = gain * 0.5;
  const heldOver = gain - chargeableNow;
  const taxableNow = Math.max(0, chargeableNow - AEA);
  const cgtNew = taxableNow * sellerRate;
  const cgtOld = 0;

  const badrAllowance = Math.max(0, badrRemaining);
  const badrPortion = Math.min(gain, badrAllowance);
  const badrTax = badrPortion * BADR_RATE;
  const remainder = Math.max(0, gain - badrAllowance);
  const remainderTaxable = Math.max(0, remainder - AEA);
  const remainderTax = remainderTaxable * HIGHER_RATE;
  const tradeSaleCgt = badrTax + remainderTax;

  return {
    gain,
    chargeableNow,
    heldOver,
    cgtNew,
    cgtOld,
    netProceedsNew: proceeds - cgtNew,
    netProceedsOld: proceeds - cgtOld,
    tradeSaleCgt,
    tradeSaleNet: proceeds - tradeSaleCgt,
    sellerRate,
  };
}
