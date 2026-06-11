/**
 * SRA client account reserve compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from SraReserveCalculator.tsx.
 *
 * FIGURES TRACED:
 * - Volume average balances: indicative market figures (not SRA-mandated).
 * - Risk factors: indicative by matter type (not statutory).
 * - De minimis exemption: SRA Accounts Rules Rule 12.2 (peak <= £10,000 AND avg <= £250).
 *
 * LIMITATIONS: Not a regulatory requirement. The SRA Accounts Rules do not mandate
 * a specific firm-side reserve. This is an operational risk-management sizing tool.
 * Actual reserve decisions should involve the firm's COFA and accountant.
 */

export type MatterType = "conveyancing" | "litigation" | "private-client" | "commercial" | "mixed";
export type Volume = "low" | "moderate" | "high" | "very-high";

const VOLUME_AVERAGE_BALANCE: Record<Volume, number> = {
  low: 2500,
  moderate: 8000,
  high: 25000,
  "very-high": 75000,
};

const MATTER_RISK_FACTOR: Record<MatterType, number> = {
  conveyancing: 0.025,
  litigation: 0.01,
  "private-client": 0.005,
  commercial: 0.008,
  mixed: 0.012,
};

export type SraReserveInput = {
  openMatters: number;
  volume: Volume;
  matterType: MatterType;
};

export type SraReserveResult = {
  peakClientMoney: number;
  suggestedReserve: number;
  lowReserve: number;
  highReserve: number;
  exemptionEligible: boolean;
};

export function calcSraReserve(input: SraReserveInput): SraReserveResult {
  const { openMatters, volume, matterType } = input;
  const avgBalance = VOLUME_AVERAGE_BALANCE[volume];
  const peakClientMoney = openMatters * avgBalance;
  const riskFactor = MATTER_RISK_FACTOR[matterType];
  const suggestedReserve = peakClientMoney * riskFactor;
  const lowReserve = suggestedReserve * 0.7;
  const highReserve = suggestedReserve * 1.5;
  const exemptionEligible = peakClientMoney <= 10000 && avgBalance <= 250;
  return { peakClientMoney, suggestedReserve, lowReserve, highReserve, exemptionEligible };
}
