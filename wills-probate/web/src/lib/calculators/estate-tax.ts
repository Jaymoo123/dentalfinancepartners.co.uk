/**
 * Single-source-of-truth rates and pure numeric helpers for wills-probate.
 *
 * England & Wales, tax year 2026/27. All constants are the current
 * (frozen-since-2009/2020) IHT thresholds, unchanged by FA 2026, plus the
 * announced-not-yet-live 6 April 2027 unused-pension-in-estate change, which
 * the pension delta helper models explicitly as a "from 2027" scenario.
 *
 * Helpers return NUMBERS (never gbp() strings) so tools can compose them
 * without string parsing.
 */

// ---------------------------------------------------------------------------
// Core thresholds
// ---------------------------------------------------------------------------

/** Nil-rate band, frozen. */
export const NRB = 325_000;
/** Residence nil-rate band, frozen. */
export const RNRB = 175_000;
/** Estate value above which RNRB tapers away, £1 lost per £2 over. */
export const RNRB_TAPER_THRESHOLD = 2_000_000;

export const IHT_RATE = 0.4;
/** Reduced rate when at least 10% of the net estate (baseline) is left to charity. */
export const IHT_CHARITY_RATE = 0.36;
/** Minimum % of the baseline estate that must pass to charity to qualify for the reduced rate. */
export const CHARITY_RATE_QUALIFYING_PCT = 0.1;

export const ANNUAL_GIFT_EXEMPT = 3_000;
export const SMALL_GIFT_EXEMPT = 250;

export const WEDDING_GIFT_LIMITS = {
  child: 5_000,
  grandchild: 2_500,
  other: 1_000,
} as const;

/**
 * Taper relief on gifts made 3-7 years before death (PETs that become
 * chargeable). Below 3 years, full 40% applies; at 7+ years, gift is exempt.
 * Values are the % REDUCTION applied to the tax otherwise due, keyed by the
 * completed year band since the gift.
 */
export const TAPER_RELIEF_BANDS: { minYears: number; maxYears: number; reductionPct: number }[] = [
  { minYears: 0, maxYears: 3, reductionPct: 0 },
  { minYears: 3, maxYears: 4, reductionPct: 20 },
  { minYears: 4, maxYears: 5, reductionPct: 40 },
  { minYears: 5, maxYears: 6, reductionPct: 60 },
  { minYears: 6, maxYears: 7, reductionPct: 80 },
  { minYears: 7, maxYears: Infinity, reductionPct: 100 },
];

/** Flat probate application fee (HMCTS), payable on estates above the threshold. £526 from 13 July 2026 (was £300). */
export const PROBATE_FEE = 526;
export const PROBATE_FEE_THRESHOLD = 5_000;
/** Extra sealed copy of the grant, when ordered with the application (from 13 July 2026; was £1.50). */
export const GRANT_COPY_FEE = 2;

/** Statutory legacy for a surviving spouse where the deceased died intestate leaving children. */
export const STATUTORY_LEGACY = 322_000;

/** "Excepted estate" simplified reporting thresholds (IHT400 not required). */
export const EXCEPTED_ESTATE_GROSS = 325_000;
export const EXCEPTED_ESTATE_EXEMPT_LIMIT = 3_000_000;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

/**
 * Available RNRB after tapering. Only applies where the home (or its
 * proceeds) passes to direct descendants; otherwise RNRB is 0.
 */
export function availableRnrb(
  estateValue: number,
  homeToDescendants: boolean,
  rnrbBase: number = RNRB
): number {
  if (!homeToDescendants) return 0;
  const taper = estateValue > RNRB_TAPER_THRESHOLD ? (estateValue - RNRB_TAPER_THRESHOLD) / 2 : 0;
  return Math.max(0, rnrbBase - taper);
}

/**
 * Combined NRB + RNRB threshold available to an estate, including any
 * transferred (unused) allowance from a late spouse/civil partner.
 */
export function combinedThreshold({
  married,
  widowedTransferPct,
  homeToDescendants,
  estateValue,
}: {
  /** true if there is a surviving spouse/CP whose own estate this is not (i.e. this deceased was previously widowed) */
  married: boolean;
  /** % of a late spouse's NRB/RNRB unused and available to transfer in (0-100). Only relevant if widowed. */
  widowedTransferPct: number;
  homeToDescendants: boolean;
  estateValue: number;
}): { nrb: number; rnrb: number; total: number } {
  const transferPct = married ? 0 : Math.max(0, Math.min(100, widowedTransferPct)) / 100;
  const nrb = NRB * (1 + transferPct);
  const rnrbBase = RNRB * (1 + transferPct);
  const rnrb = availableRnrb(estateValue, homeToDescendants, rnrbBase);
  return { nrb, rnrb, total: nrb + rnrb };
}

/** IHT due on a taxable estate at the standard or charity-discounted rate. */
export function ihtDue(taxableEstate: number, charityRate = false): number {
  const taxable = Math.max(0, taxableEstate);
  return taxable * (charityRate ? IHT_CHARITY_RATE : IHT_RATE);
}

/** Taper relief reduction % (0-100) for a PET made `yearsSinceGift` years before death. */
export function giftTaperRate(yearsSinceGift: number): number {
  const y = Math.max(0, yearsSinceGift);
  const band = TAPER_RELIEF_BANDS.find((b) => y >= b.minYears && y < b.maxYears);
  return band ? band.reductionPct : 100;
}

/**
 * Simplified excepted-estate test: an estate can usually skip the full
 * IHT400 where the gross estate is under the excepted-estate gross limit,
 * OR (for a fully spouse/charity-exempt estate) the net chargeable estate
 * is nil and gross is under the exempt-estate limit. This is a simplified
 * indicator only, not a substitute for the IHT205/400 decision tree.
 */
export function isExceptedEstate({
  gross,
  netChargeable,
  spouseCharityExempt,
}: {
  gross: number;
  netChargeable: number;
  spouseCharityExempt: boolean;
}): boolean {
  if (gross <= EXCEPTED_ESTATE_GROSS) return true;
  if (spouseCharityExempt && netChargeable <= 0 && gross <= EXCEPTED_ESTATE_EXEMPT_LIMIT) return true;
  return false;
}

/**
 * Compares IHT under current rules (pension pot outside the estate) against
 * the announced 6 April 2027 rules (unused pension pot brought into the
 * estate for IHT). Pure "before vs after" comparison at today's other
 * figures; does not model estate growth between now and 2027.
 */
export function pensionsIht2027Delta({
  estateExPension,
  pensionPot,
  married,
  widowedTransferPct,
  homeToDescendants,
}: {
  estateExPension: number;
  pensionPot: number;
  married: boolean;
  widowedTransferPct: number;
  homeToDescendants: boolean;
}): {
  ihtNow: number;
  iht2027: number;
  delta: number;
  rnrbLostByPensionInclusion: number;
  effectiveMarginalRate: number;
} {
  const pension = Math.max(0, pensionPot);
  const exPension = Math.max(0, estateExPension);
  const withPension = exPension + pension;

  const thresholdNow = combinedThreshold({
    married,
    widowedTransferPct,
    homeToDescendants,
    estateValue: exPension,
  });
  const taxableNow = Math.max(0, exPension - thresholdNow.total);
  const ihtNow = ihtDue(taxableNow);

  const threshold2027 = combinedThreshold({
    married,
    widowedTransferPct,
    homeToDescendants,
    estateValue: withPension,
  });
  const taxable2027 = Math.max(0, withPension - threshold2027.total);
  const iht2027 = ihtDue(taxable2027);

  const rnrbLostByPensionInclusion = Math.max(0, thresholdNow.rnrb - threshold2027.rnrb);
  const delta = iht2027 - ihtNow;
  // Effective marginal rate on the pension pot itself: the extra IHT caused
  // by adding the pension, as a % of the pension pot (captures RNRB-taper
  // knock-on, which can push the effective rate above the headline 40%).
  const effectiveMarginalRate = pension > 0 ? (delta / pension) * 100 : 0;

  return { ihtNow, iht2027, delta, rnrbLostByPensionInclusion, effectiveMarginalRate };
}
