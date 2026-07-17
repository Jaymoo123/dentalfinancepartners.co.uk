/**
 * Associated Companies CT Calculator — pure compute module.
 *
 * Divides the corporation tax thresholds by (1 + associated companies),
 * pro-rates for short accounting periods, applies marginal relief
 * (CTA 2010 s.19 standard fraction 3/200), and flags the quarterly
 * instalment (QIP) trigger. No React / DOM / fetch.
 *
 * Rates 2026/27 (unchanged since FY2023):
 *   small profits rate 19%, main rate 25%,
 *   lower limit £50,000, upper limit £250,000, QIP "large" £1.5m.
 * All limits divided by (1 + N associated) and pro-rated by months/12.
 * Sourced from uk-tax-rates.ts corporationTax ✓
 */

const SMALL_PROFITS_RATE = 0.19;
const MAIN_RATE = 0.25;
const LOWER_LIMIT = 50_000;
const UPPER_LIMIT = 250_000;
const MARGINAL_FRACTION = 3 / 200;
const QIP_LARGE_LIMIT = 1_500_000;

export type AssociatedCTResult = {
  divisor: number;
  lowerLimit: number;
  upperLimit: number;
  qipLimit: number;
  augmentedProfits: number;
  band: "small" | "marginal" | "main";
  ctBeforeRelief: number;
  marginalRelief: number;
  ctPayable: number;
  effectiveRate: number;
  qipTriggered: boolean;
};

export function calcAssociatedCT(
  taxableProfits: number,
  exemptDividends: number,
  associatedCompanies: number,
  months: number,
): AssociatedCTResult {
  const divisor = 1 + Math.max(0, Math.floor(associatedCompanies));
  const proRata = Math.min(12, Math.max(1, months)) / 12;
  const lowerLimit = (LOWER_LIMIT * proRata) / divisor;
  const upperLimit = (UPPER_LIMIT * proRata) / divisor;
  const qipLimit = (QIP_LARGE_LIMIT * proRata) / divisor;

  const ttp = Math.max(0, taxableProfits);
  const augmentedProfits = ttp + Math.max(0, exemptDividends);

  let band: AssociatedCTResult["band"];
  let ctPayable: number;
  let marginalRelief = 0;
  const ctBeforeRelief = ttp * MAIN_RATE;

  if (augmentedProfits <= lowerLimit) {
    band = "small";
    ctPayable = ttp * SMALL_PROFITS_RATE;
  } else if (augmentedProfits >= upperLimit) {
    band = "main";
    ctPayable = ctBeforeRelief;
  } else {
    band = "marginal";
    // CTA 2010 s.19: relief = F × (U − A) × (N/A), N = TTP, A = augmented profits
    marginalRelief =
      MARGINAL_FRACTION * (upperLimit - augmentedProfits) * (augmentedProfits > 0 ? ttp / augmentedProfits : 1);
    ctPayable = ctBeforeRelief - marginalRelief;
  }

  return {
    divisor,
    lowerLimit,
    upperLimit,
    qipLimit,
    augmentedProfits,
    band,
    ctBeforeRelief,
    marginalRelief,
    ctPayable,
    effectiveRate: ttp > 0 ? ctPayable / ttp : 0,
    qipTriggered: augmentedProfits > qipLimit,
  };
}
