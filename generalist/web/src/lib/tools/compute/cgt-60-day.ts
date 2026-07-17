/**
 * Residential CGT 60-Day Reporting Calculator — pure compute module.
 *
 * UK-resident individual disposing of UK residential property.
 * No React / DOM / fetch. Current year: 2026/27.
 */

const AEA = 3_000; // uk-tax-rates.ts capitalGainsTax.annualExemption ✓
const RESIDENTIAL_BASIC = 0.18; // uk-tax-rates.ts capitalGainsTax.residential.basicRate ✓
const RESIDENTIAL_HIGHER = 0.24; // uk-tax-rates.ts capitalGainsTax.residential.higherRate ✓
const PERSONAL_ALLOWANCE = 12_570; // uk-tax-rates.ts incomeTax.personalAllowance ✓
const BASIC_RATE_BAND = 37_700; // basicRateUpperLimit 50,270 minus personal allowance ✓
const FINAL_PERIOD_MONTHS = 9; // PRR final-period exemption, s.223(1) TCGA 1992
const REPORTING_WINDOW_DAYS = 60;

export type Cgt60Result = {
  grossGain: number; // before reliefs; negative = loss
  prrRelief: number;
  prrMonths: number;
  gainAfterPrr: number;
  aeaUsed: number;
  chargeableGain: number;
  taxedAt18: number;
  taxedAt24: number;
  taxDue: number; // payment on account due within 60 days
  deadline: Date; // completion + 60 days
  returnNeeded: boolean;
  reason: string; // why no return is needed, when it isn't
};

export function calcCgt60Day(
  proceeds: number,
  saleCosts: number,
  purchasePrice: number,
  purchaseCosts: number,
  improvements: number,
  ownershipMonths: number,
  occupationMonths: number,
  otherIncome: number,
  aeaAlreadyUsed: number,
  completionDay: number,
  completionMonth: number, // 1-12
  completionYear: number,
): Cgt60Result {
  const grossGain =
    proceeds - saleCosts - purchasePrice - purchaseCosts - improvements;

  // PRR: actual occupation plus the final 9 months of ownership, capped at
  // total ownership. Assumes any occupation was as the only/main residence.
  const occ = Math.min(Math.max(0, occupationMonths), Math.max(0, ownershipMonths));
  const prrMonths =
    occ > 0 ? Math.min(ownershipMonths, occ + FINAL_PERIOD_MONTHS) : 0;
  const prrRelief =
    grossGain > 0 && ownershipMonths > 0
      ? grossGain * (prrMonths / ownershipMonths)
      : 0;

  const gainAfterPrr = Math.max(0, grossGain - prrRelief);
  const aeaRemaining = Math.max(0, AEA - Math.max(0, aeaAlreadyUsed));
  const aeaUsed = Math.min(gainAfterPrr, aeaRemaining);
  const chargeableGain = gainAfterPrr - aeaUsed;

  // Basic-rate band left after other taxable income (no PA taper modelling:
  // anyone tapered has income > £50,270, so their band is already 0).
  const taxableIncome = Math.max(0, otherIncome - PERSONAL_ALLOWANCE);
  const basicBandLeft = Math.max(0, BASIC_RATE_BAND - taxableIncome);
  const at18 = Math.min(chargeableGain, basicBandLeft);
  const at24 = chargeableGain - at18;
  const taxedAt18 = at18 * RESIDENTIAL_BASIC;
  const taxedAt24 = at24 * RESIDENTIAL_HIGHER;
  const taxDue = taxedAt18 + taxedAt24;

  // JS Date handles month/day rollover, so completion + 60 is exact.
  const deadline = new Date(
    completionYear,
    completionMonth - 1,
    completionDay + REPORTING_WINDOW_DAYS,
  );

  let returnNeeded = true;
  let reason = "";
  if (grossGain <= 0) {
    returnNeeded = false;
    reason =
      "The disposal produces a loss, so no CGT is due and a UK resident has no 60-day return to file. Report the loss on your Self Assessment return if you want to use it against future gains.";
  } else if (ownershipMonths > 0 && prrMonths >= ownershipMonths) {
    returnNeeded = false;
    reason =
      "Private residence relief covers the whole gain, so no CGT is due and a UK resident does not need to file a 60-day return.";
  } else if (taxDue === 0) {
    returnNeeded = false;
    reason =
      "No CGT is due after reliefs and the annual exempt amount, so a UK resident does not need to file a 60-day return. You may still need to report the disposal on Self Assessment if proceeds exceed £50,000.";
  }

  return {
    grossGain,
    prrRelief,
    prrMonths,
    gainAfterPrr,
    aeaUsed,
    chargeableGain,
    taxedAt18,
    taxedAt24,
    taxDue,
    deadline,
    returnNeeded,
    reason,
  };
}
