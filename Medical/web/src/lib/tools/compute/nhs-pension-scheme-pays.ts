/**
 * NHS Pension Scheme Pays cost comparison — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch.
 *
 * Compares paying an Annual Allowance charge in cash now against electing
 * Scheme Pays (scheme settles the charge, pension is permanently reduced by
 * an actuarial amount). Logic mirrors the premium config
 * (premium/configs/nhs-pension-scheme-pays-premium.ts) — keep in sync.
 *
 * Calibration knobs (update at each annual NHSBSA release):
 * - SCHEME_PAYS_FACTORS: age-banded actuarial factors, 2015 scheme, NPA 68
 *   (NHSBSA Scheme Pays interest and factors document, April 2024 revision).
 * - SCHEME_PAYS_INTEREST_RATE: annual compound interest applied to the debit
 *   (NHSBSA 2024/25 rate).
 */

export type MarginalRate = "basic" | "higher" | "additional";

export type SchemePaysInput = {
  annualAllowanceCharge: number;
  schemeGrowth: number;
  age: number;
  marginalRate: MarginalRate;
};

export type SchemePaysResult = {
  charge: number;
  mandatoryEligible: boolean;
  cashNow: number;
  yearsToRetirement: number;
  actuarialFactor: number;
  debitAtRetirement: number;
  annualPensionReduction: number;
  breakEvenYears: number | null;
  marginalRateValue: number;
};

// ponytail: single flat rate + one factor table, update annually with NHSBSA release
export const SCHEME_PAYS_INTEREST_RATE = 0.0235;

const STANDARD_AA = 60_000;
const MANDATORY_CHARGE_FLOOR = 2_000;

const MARGINAL_RATES: Record<MarginalRate, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

// NHSBSA age-banded actuarial factors (2015 scheme, NPA 68, April 2024 revision).
// pension reduction = debit_at_retirement / factor
const SCHEME_PAYS_FACTORS: { minAge: number; maxAge: number; factor: number }[] = [
  { minAge: 20, maxAge: 29, factor: 27.4 },
  { minAge: 30, maxAge: 34, factor: 25.1 },
  { minAge: 35, maxAge: 39, factor: 23.2 },
  { minAge: 40, maxAge: 44, factor: 21.4 },
  { minAge: 45, maxAge: 49, factor: 19.7 },
  { minAge: 50, maxAge: 54, factor: 18.1 },
  { minAge: 55, maxAge: 59, factor: 16.6 },
  { minAge: 60, maxAge: 64, factor: 14.8 },
  { minAge: 65, maxAge: 67, factor: 12.9 },
];

export function getActuarialFactor(age: number): number {
  const band = SCHEME_PAYS_FACTORS.find((b) => age >= b.minAge && age <= b.maxAge);
  if (!band) {
    return age < 20
      ? SCHEME_PAYS_FACTORS[0].factor
      : SCHEME_PAYS_FACTORS[SCHEME_PAYS_FACTORS.length - 1].factor;
  }
  return band.factor;
}

export function calcSchemePays(input: SchemePaysInput): SchemePaysResult {
  const charge = Math.max(0, Number(input.annualAllowanceCharge) || 0);
  const schemeGrowth = Math.max(0, Number(input.schemeGrowth) || 0);
  const age = Math.min(67, Math.max(20, Math.round(Number(input.age) || 45)));
  const marginalRateValue = MARGINAL_RATES[input.marginalRate] ?? MARGINAL_RATES.higher;

  const mandatoryEligible = charge > MANDATORY_CHARGE_FLOOR && schemeGrowth > STANDARD_AA;

  const cashNow = charge;
  const yearsToRetirement = Math.max(0, 68 - age);
  const actuarialFactor = getActuarialFactor(age);
  const debitAtRetirement =
    charge * Math.pow(1 + SCHEME_PAYS_INTEREST_RATE, yearsToRetirement);
  const annualPensionReduction =
    actuarialFactor > 0 ? debitAtRetirement / actuarialFactor : 0;
  const breakEvenYears =
    annualPensionReduction > 0 ? cashNow / annualPensionReduction : null;

  return {
    charge,
    mandatoryEligible,
    cashNow,
    yearsToRetirement,
    actuarialFactor,
    debitAtRetirement,
    annualPensionReduction,
    breakEvenYears,
    marginalRateValue,
  };
}
