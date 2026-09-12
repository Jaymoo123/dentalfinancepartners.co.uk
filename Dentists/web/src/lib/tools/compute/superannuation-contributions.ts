/**
 * NHS Superannuation Earnings & Contribution Calculator — dental practitioners
 *
 * England/Wales convention. Scotland uses different tier bands (note in FAQ).
 *
 * Superannuable earnings are an INPUT, not something this module derives. Net
 * pensionable earnings (NPE) come from the practitioner's own NHS pension
 * paperwork: the annual certificate of pensionable profits for a practitioner,
 * or the provider's Annual Reconciliation Report allocation for a performer on
 * a GDS/PDS contract. There is no per-dentist percentage of gross fees that
 * produces NPE. The 43.9% figure in HP §2.C is the ceiling on declared NPE for
 * a WHOLE contract, covering every dentist on it combined, so it must never be
 * applied to one dentist's gross fee income.
 *
 * Member contribution tiers — England and Wales only (Scotland and Northern Ireland
 * run different tier tables). Six-tier structure; the rates (5.2 / 6.5 / 8.3 / 9.8 /
 * 10.7 / 12.5%) are the settled final-phase structure, unchanged since 1 April 2024.
 * The THRESHOLDS are uprated and moved twice since. The table below is the 2026/27
 * table in force from 1 April 2026, uprated by the September 2025 CPI figure of 3.8%.
 * Verified at primary source 2026-09-11 and locked in house_positions.md §2.F.
 *
 * Employer contribution: 23.7% of pensionable pay from 1 April 2024 (up from
 * 20.6%), plus a 0.08% administration levy, so 23.78% in total. The increase
 * above the old 20.6% is centrally funded for most NHS employers, but 23.7% is
 * the headline employer rate and is what this tool shows as the employer cost.
 *
 * CARE pension growth: 1/54th of pensionable pay accrues as guaranteed pension
 * per year of contributions. No lump-sum accrual in the 2015 scheme.
 *
 * Tax relief: basic-rate (20%) applies automatically via net-pay arrangement
 * for NHS practitioners. Higher-rate relief claimed via self-assessment.
 */

/** ponytail: dated config constants so a future rate change is a one-line edit */
const TIERS_ENGLAND_WALES = [
  { upto: 13259, rate: 0.052 },
  { upto: 28854, rate: 0.065 },
  { upto: 35155, rate: 0.083 },
  { upto: 52778, rate: 0.098 },
  { upto: 67668, rate: 0.107 },
  { upto: Infinity, rate: 0.125 },
] as const;

/** Effective date of the tier table above (for display / audit trail) */
export const TIER_EFFECTIVE_DATE = "1 April 2026";

const EMPLOYER_RATE = 0.237;
const CARE_ACCRUAL_DENOMINATOR = 54;

export function memberTierRate(pensionableEarnings: number): number {
  for (const tier of TIERS_ENGLAND_WALES) {
    if (pensionableEarnings <= tier.upto) return tier.rate;
  }
  return TIERS_ENGLAND_WALES[TIERS_ENGLAND_WALES.length - 1].rate;
}

export type SuperannuationResult = {
  pensionableEarnings: number;
  memberRate: number;
  memberContribution: number;
  employerContribution: number;
  totalContribution: number;
  taxReliefBasic: number;
  taxReliefHigher: number;
  netCostBasicRatepayer: number;
  netCostHigherRatepayer: number;
  monthlyNetCostBasic: number;
  monthlyNetCostHigher: number;
  careGrowthPerYear: number;
};

export function calcSuperannuation(pensionableEarnings: number): SuperannuationResult {
  const memberRate = memberTierRate(pensionableEarnings);
  const memberContribution = pensionableEarnings * memberRate;
  const employerContribution = pensionableEarnings * EMPLOYER_RATE;
  const totalContribution = memberContribution + employerContribution;

  const taxReliefBasic = memberContribution * 0.2;
  const taxReliefHigher = memberContribution * 0.4;

  const netCostBasicRatepayer = memberContribution - taxReliefBasic;
  const netCostHigherRatepayer = memberContribution - taxReliefHigher;

  return {
    pensionableEarnings,
    memberRate,
    memberContribution,
    employerContribution,
    totalContribution,
    taxReliefBasic,
    taxReliefHigher,
    netCostBasicRatepayer,
    netCostHigherRatepayer,
    monthlyNetCostBasic: netCostBasicRatepayer / 12,
    monthlyNetCostHigher: netCostHigherRatepayer / 12,
    careGrowthPerYear: pensionableEarnings / CARE_ACCRUAL_DENOMINATOR,
  };
}

// Self-check: NPE of £52,680 sits in the 2026/27 £35,156–£52,778 band → 9.8%.
// Member contrib = £5,162.64. CARE = £975.56.
if (process.env.NODE_ENV === "test") {
  const r = calcSuperannuation(52680);
  console.assert(r.memberRate === 0.098, "tier lookup");
  console.assert(Math.round(r.memberContribution) === 5163, "member contrib");
  console.assert(Math.round(r.careGrowthPerYear) === 976, "CARE growth");
}
