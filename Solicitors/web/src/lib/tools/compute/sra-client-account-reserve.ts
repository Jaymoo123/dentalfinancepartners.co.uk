/**
 * SRA client account reserve compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from SraReserveCalculator.tsx.
 *
 * FIGURES TRACED:
 * - Volume average balances: indicative market figures (not SRA-mandated).
 * - Risk factors: indicative by matter type (not statutory).
 * - De minimis exemption: SRA Accounts Rules Rule 12.2
 *   (average balance not exceeding £10,000 AND maximum balance not exceeding £250,000).
 *   HP §5 / §5.G: "average not exceeding £10,000 AND maximum not exceeding £250,000".
 *   Do NOT use any £250 figure; the correct maximum threshold is £250,000.
 *
 * MANAGER-ORDERED FIX (2026-07-05, estate CRO parity R2, flag F3):
 *   The previous exemption test used `avgBalance <= 250` which was WRONG against
 *   HP §5.G. Corrected to `averageBalance <= 10000 && maximumBalance <= 250000`.
 *   The field `exemptionEligible` now requires both `averageBalance` (the period
 *   average) and `maximumBalance` (the period maximum) as explicit inputs, matching
 *   the actual SRA Rule 12.2 test. The old `avgBalance` (VOLUME_AVERAGE_BALANCE lookup)
 *   was a proxy per-matter figure, not the firm's period-average balance.
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
  /**
   * The firm's period-average client-account balance (all clients, all matters).
   * Used in the corrected Rule 12.2 exemption test: average not exceeding £10,000.
   * HP §5.G. Optional; when omitted the exemptionEligible field is omitted.
   */
  averageBalance?: number;
  /**
   * The firm's period-maximum client-account balance (the highest point in the period).
   * Used in the corrected Rule 12.2 exemption test: maximum not exceeding £250,000.
   * HP §5.G. Optional; when omitted the exemptionEligible field is omitted.
   */
  maximumBalance?: number;
};

export type SraReserveResult = {
  peakClientMoney: number;
  suggestedReserve: number;
  lowReserve: number;
  highReserve: number;
  /**
   * Rule 12.2 exemption: true only when averageBalance <= 10,000 AND
   * maximumBalance <= 250,000 (HP §5 / §5.G; do NOT use any £250 figure).
   * Undefined when averageBalance or maximumBalance are not supplied.
   */
  exemptionEligible?: boolean;
};

export function calcSraReserve(input: SraReserveInput): SraReserveResult {
  const { openMatters, volume, matterType, averageBalance, maximumBalance } = input;
  const avgBalancePerMatter = VOLUME_AVERAGE_BALANCE[volume];
  const peakClientMoney = openMatters * avgBalancePerMatter;
  const riskFactor = MATTER_RISK_FACTOR[matterType];
  const suggestedReserve = peakClientMoney * riskFactor;
  const lowReserve = suggestedReserve * 0.7;
  const highReserve = suggestedReserve * 1.5;
  // Corrected Rule 12.2 exemption test (HP §5.G):
  //   average client-account balance not exceeding £10,000
  //   AND maximum client-account balance not exceeding £250,000.
  // Only computed when both inputs are supplied. Never use £250.
  const exemptionEligible =
    averageBalance !== undefined && maximumBalance !== undefined
      ? averageBalance <= 10000 && maximumBalance <= 250000
      : undefined;
  return { peakClientMoney, suggestedReserve, lowReserve, highReserve, exemptionEligible };
}
