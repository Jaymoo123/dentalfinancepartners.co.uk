import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// CGT rates 2026/27 per house_positions.md (positions 2, 3; rates_ledger keys
// cgt_rate_basic_within_band, cgt_rate_above_basic_band, cgt_annual_exempt_amount,
// basic_rate_band_ceiling).
const AEA = 3000;
const BASIC_RATE_CEILING = 37700; // TAXABLE income ceiling of the basic-rate band
const BASIC_RATE = 0.18;
const HIGHER_RATE = 0.24;
const PERSONAL_ALLOWANCE = 12570;

/** Personal allowance tapers by £1 for every £2 of income above £100,000. */
function personalAllowance(income: number): number {
  return Math.max(0, PERSONAL_ALLOWANCE - Math.max(0, income - 100000) / 2);
}

export const cryptoCgtEstimator: GenericTool = {
  kind: "generic",
  slug: "crypto-cgt-estimator",
  name: "Crypto CGT Estimator 2026/27",
  category: "Capital Gains Tax",
  oneLiner: "Estimate your CGT liability on cryptoasset disposals using 2026/27 rates (18%/24%) and the £3,000 annual exempt amount.",
  metaTitle: "Crypto CGT Calculator 2026/27 | Crypto Tax Partners",
  metaDescription: "Estimate UK Capital Gains Tax on cryptoasset disposals. 2026/27 rates: 18% on the gain within your remaining basic-rate band, 24% above it, £3,000 annual exempt amount. Scenario tool.",
  intro: "Enter your total gain from crypto disposals and your other income before tax. The tool applies the £3,000 annual exempt amount, deducts your personal allowance to find how much basic-rate band is left, and splits any remaining gain across the 18% and 24% rate bands.",
  embedHeight: 480,
  fields: [
    { id: "totalGain", label: "Total gain from cryptoasset disposals (£)", type: "currency", default: 10000, min: 0, help: "Your total capital gain before the annual exempt amount." },
    { id: "otherTaxableIncome", label: "Other income before tax in the tax year (£)", type: "currency", default: 25000, min: 0, help: "Salary, self-employment profit and other taxable income, before deducting your personal allowance. The tool deducts the personal allowance (tapered above £100,000) to work out how much basic-rate band is left." },
  ],
  compute(v) {
    const gain = Math.max(0, Number(v.totalGain));
    const income = Math.max(0, Number(v.otherTaxableIncome));

    const netGain = Math.max(0, gain - AEA);

    if (netGain === 0) {
      return {
        headline: { label: "Estimated CGT", value: "£0", sub: `Gain is within the £${AEA.toLocaleString()} annual exempt amount`, tone: "good" },
        rows: [
          { label: "Total gain", value: gbp(gain) },
          { label: "Annual exempt amount", value: gbp(AEA) },
          { label: "Taxable gain", value: gbp(0), strong: true },
          { label: "Estimated CGT", value: "£0", strong: true },
        ],
        note: "The annual exempt amount is lost if unused; it cannot be carried forward.",
      };
    }

    const taxableIncome = Math.max(0, income - personalAllowance(income));
    const remainingBand = Math.max(0, BASIC_RATE_CEILING - taxableIncome);
    const atBasicRate = Math.min(netGain, remainingBand);
    const atHigherRate = netGain - atBasicRate;
    const tax = Math.round(atBasicRate * BASIC_RATE + atHigherRate * HIGHER_RATE);

    return {
      headline: { label: "Estimated CGT", value: gbp(tax), sub: `On a taxable gain of ${gbp(netGain)} after the £${AEA.toLocaleString()} annual exempt amount` },
      rows: [
        { label: "Total gain", value: gbp(gain) },
        { label: "Annual exempt amount", value: gbp(AEA) },
        { label: "Taxable gain", value: gbp(netGain), strong: true },
        { label: "Basic-rate band remaining", value: gbp(remainingBand) },
        ...(atBasicRate > 0 ? [{ label: `At 18% (basic rate)`, value: gbp(atBasicRate * BASIC_RATE) }] : []),
        ...(atHigherRate > 0 ? [{ label: `At 24% (higher rate)`, value: gbp(atHigherRate * HIGHER_RATE) }] : []),
        { label: "Estimated CGT", value: gbp(tax), strong: true },
      ],
      note: "This estimate does not account for s104 pooling, same-day or 30-day matching rules, which can change the gain significantly. Speak to a specialist before filing.",
    };
  },
  explainer: {
    heading: "How UK crypto CGT is calculated",
    paragraphs: [
      "Each disposal of a cryptoasset is a capital gains tax event. You subtract the allowable cost (from the s104 pool, or matching rules if the same-day or 30-day rules apply) from the proceeds to arrive at the gain.",
      "For 2026/27, every individual has a £3,000 annual exempt amount. Gains above that are taxed at 18% if they fall within any remaining basic-rate band, or 24% above it.",
      "This tool estimates the tax on a single year's gains. It does not apply the pooling or matching rules, which can materially change the taxable amount. A crypto tax specialist will compute the correct position from your transaction history.",
    ],
  },
  faqs: [
    { question: "What is the CGT rate on crypto in 2026/27?", answer: "18% on gains within the basic-rate band (up to £37,700 taxable income including gains) and 24% above. The £3,000 annual exempt amount reduces the taxable gain first." },
    { question: "Do I have to report crypto gains under £3,000?", answer: "If your total gains (not just from crypto) are above the £3,000 annual exempt amount you must report them. Reporting and paying are separate questions: disposals can also be reportable where your total proceeds for the year exceed HMRC's reporting threshold, even if the annual exempt amount covers the gain. Check the current threshold on HMRC's reporting and paying Capital Gains Tax guidance before deciding not to file." },
  ],
};
