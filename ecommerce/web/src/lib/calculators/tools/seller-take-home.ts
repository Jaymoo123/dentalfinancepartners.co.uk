import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// 2026/27 ledger constants, source: docs/ecommerce/rates_ledger.json (verified 2026-07-15)
export const PERSONAL_ALLOWANCE = 12570;
export const BASIC_RATE = 0.20;
export const HIGHER_RATE = 0.40;
export const ADDITIONAL_RATE = 0.45;
export const BASIC_BAND_CEILING = 50270; // taxable income ceiling of basic-rate band
export const CLASS4_LOWER = 12570;
export const CLASS4_UPPER = 50270;
export const CLASS4_MAIN = 0.06;
export const CLASS4_UPPER_RATE = 0.02;
export const VAT_RATE = 0.20;
export const VAT_THRESHOLD = 90000;

export interface SellerTakeHomeResult {
  grossRevenue: number;
  platformFees: number;
  cogs: number;
  otherCosts: number;
  netProfit: number;
  vatDue: number;
  incomeTax: number;
  class4Nic: number;
  takeHome: number;
  effectiveRate: number;
}

export function calcSellerTakeHome(
  grossRevenue: number,
  platformFeePercent: number,
  cogs: number,
  otherCosts: number,
  vatRegistered: boolean,
): SellerTakeHomeResult {
  const platformFees = grossRevenue * (platformFeePercent / 100);
  const netProfit = grossRevenue - platformFees - cogs - otherCosts;
  const vatDue = vatRegistered ? grossRevenue * VAT_RATE - (cogs + platformFees + otherCosts) * VAT_RATE : 0;

  const taxableIncome = Math.max(0, netProfit - PERSONAL_ALLOWANCE);
  let incomeTax = 0;
  if (taxableIncome > 0) {
    const basicBand = Math.min(taxableIncome, BASIC_BAND_CEILING - PERSONAL_ALLOWANCE);
    const higherBand = Math.max(0, Math.min(taxableIncome - (BASIC_BAND_CEILING - PERSONAL_ALLOWANCE), 125140 - BASIC_BAND_CEILING));
    const additionalBand = Math.max(0, taxableIncome - (125140 - PERSONAL_ALLOWANCE));
    incomeTax = basicBand * BASIC_RATE + higherBand * HIGHER_RATE + additionalBand * ADDITIONAL_RATE;
  }

  const class4Profit = Math.max(0, netProfit);
  const class4Main = Math.max(0, Math.min(class4Profit, CLASS4_UPPER) - CLASS4_LOWER) * CLASS4_MAIN;
  const class4Upper = Math.max(0, class4Profit - CLASS4_UPPER) * CLASS4_UPPER_RATE;
  const class4Nic = class4Main + class4Upper;

  const takeHome = netProfit - incomeTax - class4Nic - Math.max(0, vatDue);
  const effectiveRate = grossRevenue > 0 ? Math.max(0, (grossRevenue - takeHome) / grossRevenue) * 100 : 0;

  return { grossRevenue, platformFees, cogs, otherCosts, netProfit, vatDue: Math.max(0, vatDue), incomeTax, class4Nic, takeHome, effectiveRate };
}

export const sellerTakeHomeTool: GenericTool = {
  kind: "generic",
  slug: "seller-take-home-calculator",
  name: "Seller Take-Home Calculator",
  category: "Business Structure and Tax",
  oneLiner:
    "Join marketplace fees, COGS and UK tax in one place. Enter your gross sales, platform fees and cost of goods to see true take-home after income tax and Class 4 NIC. 2026/27 rates.",
  metaTitle: "Seller Take-Home Calculator: Fees, COGS and Tax UK 2026/27",
  metaDescription:
    "See your true take-home as a UK marketplace seller. The only calculator that joins platform fees, cost of goods, VAT and income tax in one step. 2026/27 rates.",
  intro:
    "Money landing in your bank account is not your take-home. It arrives after the platform has already deducted referral and fulfilment fees, and before HMRC has taken income tax and Class 4 NIC. This calculator works through all four stages: gross sales, minus marketplace fees, minus cost of goods and other costs, then minus tax on the profit that remains. Enter your own fee figures from your platform statement, not a schedule we maintain.",
  ctaLabel: "Get help with your seller tax return",
  embedHeight: 680,
  fields: [
    {
      id: "grossRevenue",
      label: "Gross annual sales",
      type: "currency",
      default: 60000,
      step: 1000,
      min: 0,
      help: "Total gross sales before platform fees are deducted. Use the gross selling price, not your net payout.",
    },
    {
      id: "platformFeePercent",
      label: "Platform fees (% of gross sales)",
      type: "number",
      default: 15,
      step: 0.5,
      min: 0,
      max: 50,
      suffix: "%",
      help: "Enter the percentage from your own platform settlement statement. Referral fees plus FBA or fulfilment fees typically total 15-30% on Amazon. The tool does not hardcode live fee schedules.",
    },
    {
      id: "cogs",
      label: "Cost of goods sold (annual)",
      type: "currency",
      default: 25000,
      step: 500,
      min: 0,
      help: "Landed cost of stock matched to goods sold in the year (not stock still on hand). If you reinvest heavily in stock, your taxable profit will exceed your bank balance.",
    },
    {
      id: "otherCosts",
      label: "Other business costs (annual)",
      type: "currency",
      default: 5000,
      step: 500,
      min: 0,
      help: "Advertising, software, shipping, storage and other deductible costs not included above.",
    },
    {
      id: "vatRegistered",
      label: "VAT registered?",
      type: "toggle",
      default: false,
      help: `VAT registration is required once taxable turnover exceeds £${VAT_THRESHOLD.toLocaleString()} in any rolling 12 months. Tick if registered.`,
    },
  ],
  compute: (v) => {
    const r = calcSellerTakeHome(
      Math.max(0, Number(v.grossRevenue)),
      Math.max(0, Number(v.platformFeePercent)),
      Math.max(0, Number(v.cogs)),
      Math.max(0, Number(v.otherCosts)),
      Boolean(v.vatRegistered),
    );
    const tone = r.takeHome < 0 ? "warn" : r.takeHome < r.grossRevenue * 0.2 ? "default" : "good";
    return {
      headline: {
        label: "Estimated take-home (sole trader)",
        value: gbp(r.takeHome),
        sub: `Net profit ${gbp(r.netProfit)} | Effective total deduction rate ${r.effectiveRate.toFixed(1)}% of gross sales`,
        tone,
      },
      rows: [
        { label: "Gross sales", value: gbp(r.grossRevenue) },
        { label: "Platform fees", value: gbp(r.platformFees) },
        { label: "Cost of goods sold", value: gbp(r.cogs) },
        { label: "Other costs", value: gbp(r.otherCosts) },
        { label: "Net profit", value: gbp(r.netProfit), strong: true },
        { label: "Income tax (2026/27)", value: gbp(r.incomeTax) },
        { label: "Class 4 NIC (2026/27)", value: gbp(r.class4Nic) },
        ...(r.vatDue > 0 ? [{ label: "VAT (estimated net)", value: gbp(r.vatDue) }] : []),
        { label: "Estimated take-home", value: gbp(r.takeHome), strong: true },
      ],
      note: "This is an estimate for illustration only. It assumes sole-trader status with no other income and no other reliefs, and that all costs carry recoverable UK VAT at 20%: imported stock under postponed VAT accounting and reverse-charge marketplace fees net differently, so the VAT line is indicative. Corporation tax rates apply if you trade through a limited company. Speak to an accountant for figures specific to your situation.",
    };
  },
  explainer: {
    heading: "How the four-stage calculation works",
    paragraphs: [
      "Stage one is gross revenue: the full selling price of each item, before the platform deducts anything. This is also the figure that counts toward the <a href=\"https://www.gov.uk/vat-registration\">£90,000 VAT registration threshold</a>, not the net payout you receive.",
      "Stage two removes marketplace costs: platform referral fees, fulfilment or postage fees and any other charges the platform levies. These come straight off the top before you see any money. This calculator uses the percentage you enter from your own settlement statement rather than any hardcoded schedule, because fee structures change.",
      `Stage three removes your cost of goods sold and any other business costs. What remains is net profit and that is the figure <a href="https://www.gov.uk/self-employed-national-insurance-rates">HMRC taxes</a>. The personal allowance of £${PERSONAL_ALLOWANCE.toLocaleString()} shields the first portion. Income tax at 20% then applies up to £${BASIC_BAND_CEILING.toLocaleString()} of total income, and 40% above that.`,
      `Stage four is Class 4 NIC, which applies at ${CLASS4_MAIN * 100}% on self-employment profits between £${CLASS4_LOWER.toLocaleString()} and £${CLASS4_UPPER.toLocaleString()}, and ${CLASS4_UPPER_RATE * 100}% above that. It is charged on top of income tax and is specific to self-employment income.`,
    ],
  },
  faqs: [
    {
      question: "Is the calculator based on current rates?",
      answer: "Yes. Income tax rates and bands, personal allowance and Class 4 NIC rates are 2026/27 figures from HMRC, verified 2026-07-15. See <a href=\"https://www.gov.uk/income-tax-rates\">gov.uk/income-tax-rates</a> and <a href=\"https://www.gov.uk/self-employed-national-insurance-rates\">gov.uk/self-employed-national-insurance-rates</a>.",
    },
    {
      question: "Does this cover limited company sellers?",
      answer: "This calculator covers sole-trader sellers only. If you want to compare sole-trader and limited-company take-home, use the <a href=\"/calculators/sole-trader-vs-ltd-sellers\">sole trader vs limited company calculator</a> which runs the corporation tax and dividend extraction alongside the sole-trader figures.",
    },
    {
      question: "Does the £90,000 VAT threshold apply to my gross sales or my payout?",
      answer: "Gross sales. The <a href=\"https://www.gov.uk/vat-registration\">VAT registration threshold</a> applies to your total taxable turnover in any rolling 12-month period, which is the gross selling price of your items, not the net amount the platform deposits after deducting its fees. If you are close to the threshold, use the <a href=\"/calculators/vat-threshold-tracker\">VAT threshold tracker</a>.",
    },
    {
      question: "Do platform fees billed from abroad affect my VAT position?",
      answer: "Yes. Marketplace and advertising fees billed from outside the UK are reverse-charge services under <a href=\"https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a\">HMRC Notice 741A</a>. If you are VAT-registered, you self-account for VAT on these fees and the value counts toward the £90,000 threshold. See <a href=\"/vat/vat-on-marketplace-fees\">VAT on marketplace fees</a> for the full explanation.",
    },
  ],
};
