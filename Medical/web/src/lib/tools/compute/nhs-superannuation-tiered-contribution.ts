/**
 * Pure compute for the public NHS Superannuation tiered contribution calculator.
 *
 * Tier table + deemed employer rate come from the shared single-source module
 * nhs-super-tiers.ts (2026/27). Do NOT re-declare a tier table here.
 *
 * Stepped (not banded) calculation: one rate applies to the WHOLE pensionable
 * pay. Income-tax band arithmetic is deliberately absent — the marginal rate is
 * used only for the net-of-relief note (this is not a take-home tool).
 */
import {
  nhsSuperEmployeeTier,
  NHS_DEEMED_EMPLOYER_RATE,
} from "./nhs-super-tiers";

export type MarginalBand = "basic" | "higher" | "additional";

const MARGINAL_RATES: Record<MarginalBand, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

export interface NHSSuperTieredInput {
  pensionablePay: number;
  incomeTaxBand: MarginalBand;
}

export interface NHSSuperTieredResult {
  tierRate: number;
  tierLabel: string;
  marginalRate: number;
  employeeContribution: number;
  deemedEmployerContribution: number;
  combinedPensionInput: number;
  netOfReliefCost: number;
}

export function calcNHSSuperTieredContribution(
  input: NHSSuperTieredInput
): NHSSuperTieredResult {
  const pay = Math.max(0, input.pensionablePay || 0);
  const marginalRate = MARGINAL_RATES[input.incomeTaxBand] ?? 0.4;

  const { rate, label } = nhsSuperEmployeeTier(pay);

  const employeeContribution = pay * rate;
  const deemedEmployerContribution = pay * NHS_DEEMED_EMPLOYER_RATE;

  return {
    tierRate: rate,
    tierLabel: label,
    marginalRate,
    employeeContribution,
    deemedEmployerContribution,
    combinedPensionInput: employeeContribution + deemedEmployerContribution,
    netOfReliefCost: employeeContribution * (1 - marginalRate),
  };
}
