/**
 * NHS Pension annual allowance taper compute lib (dental).
 * Pure TypeScript, no React/window/document/fetch. TL-03 compliant.
 *
 * Models the tapered annual allowance for a dentist with practice profit
 * share / associate fee income, 2026/27 rates:
 *
 * FIGURES (2026/27, unchanged from 2025/26 at primary source gov.uk
 * "Work out your reduced (tapered) annual allowance"):
 *   - Standard annual allowance: £60,000.
 *   - Threshold income limit: £200,000.
 *   - Adjusted income limit: £260,000.
 *   - Taper: AA reduced by £1 for every £2 of adjusted income above £260,000,
 *     to a minimum AA of £10,000 (reached at adjusted income £360,000).
 *   - Income tax (rUK, non-savings): PA £12,570 (tapered £1/£2 above £100,000),
 *     20% to £37,700 taxable, 40% to £125,140 taxable, 45% above.
 *
 * Definitions used (DB-scheme form, as applied to NHS members):
 *   - Threshold income = total taxable income minus employee pension
 *     contributions paid under net pay (practice profit share + other income
 *     - employee contributions). Lump-sum death benefits and salary-sacrifice
 *     add-backs are NOT modelled.
 *   - Adjusted income = threshold income + total pension input amount (PIA).
 *     This is the standard DB formulation: employee contributions are added
 *     back via the PIA, employer "contributions" for a DB scheme ARE the PIA
 *     net of employee contributions.
 *
 * PIA estimate (used only when the member does not supply a TRS/NHSBSA figure):
 *   2015 scheme is CARE, 1/54th accrual. Opening value is uplifted by CPI in
 *   the AA test, but in-service revaluation is CPI + 1.5%, so the 1.5% excess
 *   on the opening pension counts as growth. Estimate:
 *     PIA ~= 16 x (superannuableEarnings / 54 + 0.015 x openingPension)
 *   This is an APPROXIMATION: it ignores the exact CPI figures used at each
 *   scheme year end, part-year membership, added years/ERRBO, and any 1995/2008
 *   legacy-section input. The real figure comes from a Total Reward Statement
 *   or an NHSBSA pension savings statement.
 *
 * Scheme pays: mandatory scheme pays is available where the charge exceeds
 * £2,000 AND the NHS PIA alone exceeds the STANDARD £60,000 allowance.
 * Voluntary scheme pays covers taper-only cases (NHSBSA).
 *
 * LIMITATIONS (flagged in tool note): Scottish income tax bands not modelled;
 * charge assumes the excess is taxed as top-slice non-savings income.
 */

export const STANDARD_AA = 60000;
export const THRESHOLD_INCOME_LIMIT = 200000;
export const ADJUSTED_INCOME_LIMIT = 260000;
export const MIN_TAPERED_AA = 10000;
export const CARE_ACCRUAL = 54; // 2015 scheme: 1/54th of pensionable pay
export const DB_FACTOR = 16; // AA valuation factor for DB pension growth
export const REVAL_EXCESS_OVER_CPI = 0.015; // in-service revaluation CPI + 1.5%
export const SCHEME_PAYS_MIN_CHARGE = 2000;

export type AaTaperInput = {
  /** Practice profit share or associate fee income (taxable profit). */
  practiceProfit: number;
  /** Other taxable income (rental, dividends treated as top-slice NOT modelled separately). */
  otherIncome: number;
  /** Employee NHS Pension contributions this year (net pay arrangement). */
  employeeConts: number;
  /** 2015-scheme pension input amount from TRS/NHSBSA statement; 0 = estimate. */
  pia: number;
  /** Superannuable (pensionable) earnings this year — used only for the PIA estimate. */
  superannuable: number;
  /** 2015-scheme annual pension already accrued at the start of the year — estimate only. */
  openingPension: number;
  /** Unused annual allowance carried forward from the 3 prior tax years. */
  carryForward: number;
};

export type AaTaperResult = {
  thresholdIncome: number;
  adjustedIncome: number;
  /** true when the £200k threshold-income test switches the taper off. */
  taperApplies: boolean;
  taperedAa: number;
  /** The PIA used (supplied or estimated). */
  piaUsed: number;
  piaEstimated: boolean;
  carryForwardUsed: number;
  excess: number;
  /** AA charge at marginal income tax rate(s) on the excess. */
  charge: number;
  /** Effective marginal rate applied to the excess. */
  effectiveRate: number;
  mandatorySchemePays: boolean;
};

/** rUK non-savings income tax with PA taper (2026/27). */
export function incomeTax(income: number): number {
  const pa = Math.max(0, 12570 - Math.max(0, (income - 100000) / 2));
  const t = Math.max(0, income - pa);
  return (
    0.2 * Math.min(t, 37700) +
    0.4 * Math.max(0, Math.min(t, 125140) - 37700) +
    0.45 * Math.max(0, t - 125140)
  );
}

export function calcAaTaper(input: AaTaperInput): AaTaperResult {
  const {
    practiceProfit,
    otherIncome,
    employeeConts,
    pia,
    superannuable,
    openingPension,
    carryForward,
  } = input;

  const piaEstimated = pia <= 0;
  const piaUsed = piaEstimated
    ? DB_FACTOR * (superannuable / CARE_ACCRUAL + REVAL_EXCESS_OVER_CPI * openingPension)
    : pia;

  const taxableIncome = Math.max(0, practiceProfit + otherIncome - employeeConts);
  const thresholdIncome = taxableIncome;
  const adjustedIncome = thresholdIncome + piaUsed;

  let taperedAa = STANDARD_AA;
  const taperApplies =
    thresholdIncome > THRESHOLD_INCOME_LIMIT && adjustedIncome > ADJUSTED_INCOME_LIMIT;
  if (taperApplies) {
    const reduction = Math.floor((adjustedIncome - ADJUSTED_INCOME_LIMIT) / 2);
    taperedAa = Math.max(MIN_TAPERED_AA, STANDARD_AA - reduction);
  }

  const excessBeforeCf = Math.max(0, piaUsed - taperedAa);
  const carryForwardUsed = Math.min(Math.max(0, carryForward), excessBeforeCf);
  const excess = excessBeforeCf - carryForwardUsed;

  // Charge = tax on (income + excess) minus tax on income: the excess is
  // taxed as top-slice non-savings income at the member's marginal rate(s).
  const charge = excess > 0 ? incomeTax(taxableIncome + excess) - incomeTax(taxableIncome) : 0;
  const effectiveRate = excess > 0 ? charge / excess : 0;

  const mandatorySchemePays = charge > SCHEME_PAYS_MIN_CHARGE && piaUsed > STANDARD_AA;

  return {
    thresholdIncome,
    adjustedIncome,
    taperApplies,
    taperedAa,
    piaUsed,
    piaEstimated,
    carryForwardUsed,
    excess,
    charge,
    effectiveRate,
    mandatorySchemePays,
  };
}
