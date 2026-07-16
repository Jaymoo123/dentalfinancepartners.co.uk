import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// CGT rates 2026/27 per house_positions.md
const AEA = 3000;
const BASIC_RATE_CEILING = 37700; // basic-rate band width
const BASIC_RATE = 0.18;
const HIGHER_RATE = 0.24;

export const cryptoCgtEstimator: GenericTool = {
  kind: "generic",
  slug: "crypto-cgt-estimator",
  name: "Crypto CGT Estimator 2026/27",
  category: "Capital Gains Tax",
  oneLiner: "Estimate your CGT liability on cryptoasset disposals using 2026/27 rates (18%/24%) and the £3,000 annual exempt amount.",
  metaTitle: "Crypto CGT Calculator 2026/27 | Crypto Tax Partners",
  metaDescription: "Estimate UK Capital Gains Tax on cryptoasset disposals. 2026/27 rates: 18% basic rate, 24% higher rate, £3,000 annual exempt amount. Scenario tool.",
  intro: "Enter your total gain from crypto disposals and your other taxable income. The tool applies the £3,000 annual exempt amount and splits any remaining gain across the 18% and 24% rate bands.",
  embedHeight: 480,
  fields: [
    { id: "totalGain", label: "Total gain from cryptoasset disposals (£)", type: "currency", default: 10000, min: 0, help: "Your total capital gain before the annual exempt amount." },
    { id: "otherTaxableIncome", label: "Other taxable income in the tax year (£)", type: "currency", default: 25000, min: 0, help: "Salary, self-employment income etc. Used to determine how much basic-rate band remains." },
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

    const remainingBand = Math.max(0, BASIC_RATE_CEILING - income);
    const atBasicRate = Math.min(netGain, remainingBand);
    const atHigherRate = netGain - atBasicRate;
    const tax = Math.round(atBasicRate * BASIC_RATE + atHigherRate * HIGHER_RATE);

    return {
      headline: { label: "Estimated CGT", value: gbp(tax), sub: `On a taxable gain of ${gbp(netGain)} after the £${AEA.toLocaleString()} annual exempt amount` },
      rows: [
        { label: "Total gain", value: gbp(gain) },
        { label: "Annual exempt amount", value: gbp(AEA) },
        { label: "Taxable gain", value: gbp(netGain), strong: true },
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
    { question: "Do I have to report crypto gains under £3,000?", answer: "If your total gains (not just from crypto) are above £3,000 you must report them. If proceeds in the year exceed four times the AEA you must also report, even if the gain is below £3,000. HMRC recommends reporting via Self Assessment." },
  ],
};
