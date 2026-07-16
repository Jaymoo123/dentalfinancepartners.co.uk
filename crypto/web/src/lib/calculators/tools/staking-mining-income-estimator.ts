import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// Per house_positions.md: staking/mining receipt = income; £1,000 misc allowance
const MISC_ALLOWANCE = 1000;
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270; // 12570 + 37700

function calcIncomeTax(taxable: number): number {
  if (taxable <= 0) return 0;
  const basicBand = BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE;
  const basic = Math.min(taxable, basicBand) * 0.2;
  const higher = taxable > basicBand ? (Math.min(taxable, 125140 - PERSONAL_ALLOWANCE) - basicBand) * 0.4 : 0;
  const additional = taxable > 125140 - PERSONAL_ALLOWANCE ? (taxable - (125140 - PERSONAL_ALLOWANCE)) * 0.45 : 0;
  return basic + higher + additional;
}

export const stakingMiningIncomeEstimator: GenericTool = {
  kind: "generic",
  slug: "staking-mining-income-estimator",
  name: "Staking and Mining Income Estimator",
  category: "Staking and Mining",
  oneLiner: "Estimate UK income tax on staking and mining receipts, including the £1,000 miscellaneous income allowance.",
  metaTitle: "Crypto Staking Mining Income Tax Calculator | Crypto Tax Partners",
  metaDescription: "Estimate UK income tax on staking rewards and mining income. Includes the £1,000 miscellaneous income allowance. 2026/27 rates. Scenario tool.",
  intro: "Staking rewards and mining income are taxed as miscellaneous income. The £1,000 miscellaneous income allowance can reduce the taxable amount. Enter your receipts and other income to see the estimated tax.",
  embedHeight: 460,
  fields: [
    { id: "stakingMiningIncome", label: "Staking and mining income in the tax year (£)", type: "currency", default: 5000, min: 0, help: "The sterling value of rewards at the date of receipt, as required by HMRC." },
    { id: "otherIncome", label: "Other taxable income in the tax year (£)", type: "currency", default: 30000, min: 0, help: "Salary, self-employment income etc. Determines which tax band your staking income falls into." },
  ],
  compute(v) {
    const stakingIncome = Math.max(0, Number(v.stakingMiningIncome));
    const otherIncome = Math.max(0, Number(v.otherIncome));

    const netStakingIncome = Math.max(0, stakingIncome - MISC_ALLOWANCE);

    if (netStakingIncome === 0) {
      return {
        headline: { label: "Estimated income tax on staking/mining", value: "£0", sub: `Within the £${MISC_ALLOWANCE.toLocaleString()} miscellaneous income allowance`, tone: "good" },
        rows: [
          { label: "Gross staking/mining income", value: gbp(stakingIncome) },
          { label: "Miscellaneous income allowance", value: gbp(MISC_ALLOWANCE) },
          { label: "Taxable staking income", value: "£0", strong: true },
          { label: "Estimated income tax", value: "£0", strong: true },
        ],
        note: "The allowance is lost if unused; it cannot be combined with the trading allowance.",
      };
    }

    const taxableTotal = Math.max(0, otherIncome + netStakingIncome - PERSONAL_ALLOWANCE);
    const taxablePrev = Math.max(0, otherIncome - PERSONAL_ALLOWANCE);
    const marginalTax = Math.round(calcIncomeTax(taxableTotal) - calcIncomeTax(taxablePrev));

    return {
      headline: { label: "Estimated income tax on staking/mining", value: gbp(marginalTax), sub: `On ${gbp(netStakingIncome)} taxable staking/mining income after the £${MISC_ALLOWANCE.toLocaleString()} allowance` },
      rows: [
        { label: "Gross staking/mining income", value: gbp(stakingIncome) },
        { label: "Miscellaneous income allowance", value: gbp(MISC_ALLOWANCE) },
        { label: "Taxable staking income", value: gbp(netStakingIncome), strong: true },
        { label: "Estimated income tax", value: gbp(marginalTax), strong: true },
      ],
      note: "When you later dispose of staked or mined tokens, CGT will apply to any gain above the value at the date of receipt. Speak to a specialist for the complete picture.",
    };
  },
  explainer: {
    heading: "How HMRC taxes staking and mining income",
    paragraphs: [
      "HMRC's position is that staking rewards and mining income received by individuals are taxed as miscellaneous income in the year of receipt, at the sterling value on the date received. This is different from trading profits.",
      "The £1,000 miscellaneous income allowance can reduce the taxable amount. If gross staking and mining income is below £1,000 in the year, no income tax is due. Above that, the excess is taxable at your marginal rate.",
      "When you later sell staked or mined tokens, Capital Gains Tax applies on any gain above the acquisition cost (which is the value at the date of receipt, having already been taxed as income).",
    ],
  },
  faqs: [
    { question: "Is staking income taxed differently from mining income?", answer: "HMRC treats both staking rewards and mining income as miscellaneous income where they do not amount to a trade. The tax treatment on receipt is the same: sterling value on the date of receipt, subject to the £1,000 miscellaneous income allowance." },
    { question: "What is the acquisition cost when I later sell staking rewards?", answer: "The acquisition cost for CGT purposes is the value at the date of receipt, because that value was already taxed as income. You do not pay tax twice on the same amount." },
  ],
};
