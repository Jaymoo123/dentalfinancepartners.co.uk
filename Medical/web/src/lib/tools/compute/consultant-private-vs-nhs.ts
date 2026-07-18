/**
 * Consultant private-vs-NHS marginal-rate modeller — pure compute library.
 *
 * No React, no DOM, no fetch. Plain functions callable from Node/Vitest.
 *
 * Tax year: 2026/27.
 *
 * Models the marginal net value of one extra private session after income tax,
 * Class 4 NI, and the NHS Pension annual allowance taper interaction.
 *
 * LOCKED RULES (TOOL_ROSTER.md §5 + Tool 10 spec):
 *   - PA £12,570 tapered £1 per £2 above £100k, fully gone at £125,140.
 *   - Basic band fixed £37,700.
 *   - Higher band width = (125,140 - PA) - 37,700.
 *   - Additional rate 45% above £125,140.
 *   - Class 4 NI: 6% on £12,570-£50,270, 2% above.
 *   - AA taper: BOTH threshold > £200k AND adjusted > £260k must hold.
 *     Reduction = (adjusted - £260k) / 2, floor £10,000.
 *   - Adjusted income = threshold income + deemed employer NHS contribution.
 *     NOT threshold + growth (tool 1 simplification -- must NOT be reused here).
 *
 * NHS_DEEMED_EMPLOYER_RATE imported from nhs-super-tiers.ts (calibration knob).
 */

import { NHS_DEEMED_EMPLOYER_RATE } from "./nhs-super-tiers";

// ── 2026/27 income-tax constants ──────────────────────────────────────────────
const PA_FULL = 12_570;
const BASIC_BAND = 37_700;
const HIGHER_TOP = 125_140;

// ── 2026/27 Class 4 NI (self-employed private income) ────────────────────────
const CLASS4_LPL = 12_570;
const CLASS4_UPL = 50_270;
const CLASS4_MAIN = 0.06;
const CLASS4_UPPER = 0.02;

// ── NHS Pension annual allowance constants ────────────────────────────────────
const STANDARD_AA = 60_000;
const MIN_AA = 10_000;
const THRESHOLD_LIMIT = 200_000;
const ADJUSTED_LIMIT = 260_000;

export type ConsultantPrivateVsNhsInput = {
  nhsPensionablePay: number;
  existingPrivateIncome: number;
  extraSessionValue: number;
  otherIncome: number;
};

export type ConsultantPrivateVsNhsResult = {
  // Headline
  netFromSession: number;
  effectiveMarginalRate: number; // as a fraction, e.g. 0.628

  // Deduction breakdown
  incomeTaxOnSession: number;
  niOnSession: number;
  aaChargeImpact: number;
  totalCost: number;

  // AA positions
  aaBase: number;
  aaWith: number;
  aaReduction: number;
  aaTapered: boolean;

  // Threshold / adjusted income
  thresholdBase: number;
  adjustedIncomeBase: number;
  thresholdWith: number;
  adjustedIncomeWith: number;

  deemedEmployer: number;
};

/** Personal allowance after taper. Fully gone at £125,140. */
export function calcPA(totalIncome: number): number {
  if (totalIncome <= 100_000) return PA_FULL;
  return Math.max(0, PA_FULL - Math.floor((totalIncome - 100_000) / 2));
}

/** Income tax on total taxable income using locked 2026/27 bands. */
export function calcIncomeTax(totalIncome: number): number {
  const pa = calcPA(totalIncome);
  if (totalIncome <= pa) return 0;

  const taxable = totalIncome - pa;
  const higherBandWidth = Math.max(0, HIGHER_TOP - pa - BASIC_BAND);

  const inBasic = Math.min(taxable, BASIC_BAND);
  const inHigher = Math.max(0, Math.min(taxable - BASIC_BAND, higherBandWidth));
  const inAdditional = Math.max(0, totalIncome - HIGHER_TOP);

  return inBasic * 0.2 + inHigher * 0.4 + inAdditional * 0.45;
}

/**
 * Class 4 NI on self-employed private income.
 *
 * ponytail: applies Class 4 on private income standalone (ignoring NHS salary
 * overlap). Conservative for consultants whose salary already exhausts the
 * Class 1 main-rate band; stated in tool note.
 */
export function calcClass4(privateIncome: number): number {
  const inMain = Math.max(0, Math.min(privateIncome, CLASS4_UPL) - CLASS4_LPL);
  const inUpper = Math.max(0, privateIncome - CLASS4_UPL);
  return inMain * CLASS4_MAIN + inUpper * CLASS4_UPPER;
}

/** Annual allowance after taper. Both threshold > £200k AND adjusted > £260k must hold. */
export function calcAA(thresholdIncome: number, adjustedIncome: number): number {
  if (thresholdIncome <= THRESHOLD_LIMIT || adjustedIncome <= ADJUSTED_LIMIT) {
    return STANDARD_AA;
  }
  return Math.max(MIN_AA, STANDARD_AA - (adjustedIncome - ADJUSTED_LIMIT) / 2);
}

/** Effective marginal income-tax rate at total income (for AA charge modelling). */
export function marginalIncomeTaxRate(totalIncome: number): number {
  if (totalIncome > HIGHER_TOP) return 0.45;
  const pa = calcPA(totalIncome);
  if (totalIncome > 100_000) return 0.6; // effective rate in PA-taper zone
  if (totalIncome > pa + BASIC_BAND) return 0.4;
  if (totalIncome > pa) return 0.2;
  return 0;
}

export function calcConsultantPrivateVsNhs(
  input: ConsultantPrivateVsNhsInput
): ConsultantPrivateVsNhsResult {
  const {
    nhsPensionablePay,
    existingPrivateIncome,
    extraSessionValue,
    otherIncome,
  } = input;

  const deemedEmployer = nhsPensionablePay * NHS_DEEMED_EMPLOYER_RATE;

  // WITHOUT extra session
  const thresholdBase = nhsPensionablePay + existingPrivateIncome + otherIncome;
  const adjustedIncomeBase = thresholdBase + deemedEmployer;
  const aaBase = calcAA(thresholdBase, adjustedIncomeBase);

  // WITH extra session
  const thresholdWith = thresholdBase + extraSessionValue;
  const adjustedIncomeWith = thresholdWith + deemedEmployer;
  const aaWith = calcAA(thresholdWith, adjustedIncomeWith);

  const aaTapered = aaWith < aaBase;
  const aaReduction = Math.max(0, aaBase - aaWith);

  // Income tax delta
  const incomeTaxOnSession = Math.max(
    0,
    calcIncomeTax(thresholdWith) - calcIncomeTax(thresholdBase)
  );

  // Class 4 NI delta (private income only)
  const privateBase = existingPrivateIncome + otherIncome;
  const niOnSession = Math.max(
    0,
    calcClass4(privateBase + extraSessionValue) - calcClass4(privateBase)
  );

  // AA charge impact = AA reduction * marginal income-tax rate at the with-extra level
  const aaChargeImpact = aaReduction * marginalIncomeTaxRate(thresholdWith);

  const totalCost = incomeTaxOnSession + niOnSession + aaChargeImpact;
  const netFromSession = extraSessionValue - totalCost;
  const effectiveMarginalRate =
    extraSessionValue > 0 ? totalCost / extraSessionValue : 0;

  return {
    netFromSession,
    effectiveMarginalRate,
    incomeTaxOnSession,
    niOnSession,
    aaChargeImpact,
    totalCost,
    aaBase,
    aaWith,
    aaReduction,
    aaTapered,
    thresholdBase,
    adjustedIncomeBase,
    thresholdWith,
    adjustedIncomeWith,
    deemedEmployer,
  };
}
