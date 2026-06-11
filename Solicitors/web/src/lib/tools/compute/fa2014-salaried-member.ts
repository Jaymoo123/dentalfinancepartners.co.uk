/**
 * FA 2014 Salaried Member Rules compute lib (pure TypeScript, no React/window/document/fetch).
 *
 * Extracted from FA2014SalariedMemberCalculator.tsx.
 *
 * FIGURES TRACED:
 * - Finance Act 2014 s.863A-863G ITTOIA: all three conditions (A, B, C) statutory rules.
 * - Condition A: fixed/non-profit-dependent reward >= 80% of total reward.
 * - Condition B: no significant influence over LLP affairs.
 * - Condition C: capital contribution < 25% of disguised salary (fixed reward).
 * - No time-sensitive rates; the FA 2014 statutory test thresholds are fixed in law.
 *
 * LIMITATIONS: Directional model only. Real audits consider bonus classification,
 * deferred compensation, capital account interest, and specific management influence facts.
 */

export type FA2014Input = {
  totalReward: number;
  fixedReward: number;
  capitalContribution: number;
  hasInfluence: boolean;
};

export type FA2014Result = {
  conditionA_ratio: number;
  conditionA_met: boolean;
  conditionB_met: boolean;
  conditionC_ratio: number;
  conditionC_met: boolean;
  all_met: boolean;
  verdict: string;
  capitalToFixCondC: number;
  additionalCapitalNeeded: number;
};

export function calcFA2014SalariedMember(input: FA2014Input): FA2014Result {
  const { totalReward, fixedReward, capitalContribution, hasInfluence } = input;

  const conditionA_ratio = totalReward > 0 ? (fixedReward / totalReward) * 100 : 0;
  const conditionA_met = conditionA_ratio >= 80;
  const conditionB_met = !hasInfluence;
  const conditionC_ratio = fixedReward > 0 ? (capitalContribution / fixedReward) * 100 : 0;
  const conditionC_met = conditionC_ratio < 25;

  const all_met = conditionA_met && conditionB_met && conditionC_met;
  const verdict = all_met
    ? "EMPLOYEE-FOR-TAX (PAYE applies)"
    : "PARTNER-FOR-TAX (Class 4 NI on share)";
  const capitalToFixCondC = Math.ceil((fixedReward * 0.25) / 1000) * 1000;
  const additionalCapitalNeeded = Math.max(0, capitalToFixCondC - capitalContribution);

  return {
    conditionA_ratio,
    conditionA_met,
    conditionB_met,
    conditionC_ratio,
    conditionC_met,
    all_met,
    verdict,
    capitalToFixCondC,
    additionalCapitalNeeded,
  };
}
