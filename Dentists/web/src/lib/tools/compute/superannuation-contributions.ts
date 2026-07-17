/**
 * NHS Superannuation Earnings & Contribution Calculator — dental practitioners
 *
 * England/Wales convention. Scotland uses different tier bands (note in FAQ).
 *
 * Superannuable earnings:
 *   Associate:  net pensionable earnings = gross NHS fee income × pensionable_pct
 *               Default 43.9% (England/Wales GDS convention; user-editable).
 *   Principal:  net pensionable earnings after deductible expenses (user provides).
 *
 * Member contribution tiers — England/Wales, six-tier structure in force from 1 April 2024
 * Rates (5.2 / 6.5 / 8.3 / 9.8 / 10.7 / 12.5%) are the settled final-phase structure.
 * Thresholds below are the 2024/25 values; they are uprated with AfC pay awards.
 * ⚠ VERIFY before publishing: confirm current-year threshold uprating (2026/27) at
 *   https://www.nhsbsa.nhs.uk/member-hub/your-membership/contribution-rates
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
  { upto: 27288, rate: 0.065 },
  { upto: 33247, rate: 0.083 },
  { upto: 49913, rate: 0.098 },
  { upto: 63994, rate: 0.107 },
  { upto: Infinity, rate: 0.125 },
] as const;

/** Effective date of the tier table above (for display / audit trail) */
export const TIER_EFFECTIVE_DATE = "1 April 2024";

const EMPLOYER_RATE = 0.237;
const CARE_ACCRUAL_DENOMINATOR = 54;

/** Associate convention: net pensionable earnings as % of gross NHS fee income */
export const ASSOCIATE_DEFAULT_PENSIONABLE_PCT = 43.9;

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

// Self-check: associate on £120k gross fees at 43.9% = £52,680 pensionable.
// Tier: £49,914–£63,994 → 10.7%. Member contrib = £5,636.76. CARE = £975.56.
if (process.env.NODE_ENV === "test") {
  const r = calcSuperannuation(52680);
  console.assert(r.memberRate === 0.107, "tier lookup");
  console.assert(Math.round(r.memberContribution) === 5637, "member contrib");
  console.assert(Math.round(r.careGrowthPerYear) === 976, "CARE growth");
}
