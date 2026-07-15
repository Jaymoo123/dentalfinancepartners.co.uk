import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// 2026/27 ledger constants, source: docs/ecommerce/rates_ledger.json (verified 2026-07-15)
export const PERSONAL_ALLOWANCE = 12570;
export const BASIC_BAND_CEILING = 50270;
export const BASIC_RATE = 0.20;
export const HIGHER_RATE = 0.40;
export const CLASS4_LOWER = 12570;
export const CLASS4_UPPER = 50270;
export const CLASS4_MAIN = 0.06;
export const CLASS4_UPPER_RATE = 0.02;
export const CT_SMALL_RATE = 0.19; // profits up to £50,000
export const CT_MAIN_RATE = 0.25;  // profits above £250,000
export const CT_SMALL_THRESHOLD = 50000;
export const CT_MAIN_THRESHOLD = 250000;
export const CT_MARGINAL_RELIEF_FRACTION = 3 / 200;
export const DIVIDEND_ALLOWANCE = 500;
export const DIVIDEND_BASIC = 0.1075;
export const DIVIDEND_HIGHER = 0.3575;
// Salary at the employer NIC secondary threshold (£5,000, ledger employer_nic_secondary_threshold_annual):
// no employer NIC, no employee NIC, fully CT-deductible. Matches the strategy the site's own content recommends.
export const SALARY = 5000;

export interface StVsLtdResult {
  profit: number;
  stTax: number; stNic: number; stTakeHome: number;
  ltdCt: number; ltdDivTax: number; ltdTakeHome: number;
  saving: number;
}

export function calcStVsLtd(profit: number): StVsLtdResult {
  // Sole trader
  const stTaxable = Math.max(0, profit - PERSONAL_ALLOWANCE);
  const stBasic = Math.min(stTaxable, BASIC_BAND_CEILING - PERSONAL_ALLOWANCE);
  const stHigher = Math.max(0, stTaxable - (BASIC_BAND_CEILING - PERSONAL_ALLOWANCE));
  const stTax = stBasic * BASIC_RATE + stHigher * HIGHER_RATE;
  const stClass4 = Math.max(0, Math.min(profit, CLASS4_UPPER) - CLASS4_LOWER) * CLASS4_MAIN
    + Math.max(0, profit - CLASS4_UPPER) * CLASS4_UPPER_RATE;
  const stTakeHome = profit - stTax - stClass4;

  // Ltd: salary at the employer NIC secondary threshold, rest as dividend
  const ltdProfitAfterSalary = Math.max(0, profit - SALARY);
  let ltdCt: number;
  if (ltdProfitAfterSalary <= CT_SMALL_THRESHOLD) {
    ltdCt = ltdProfitAfterSalary * CT_SMALL_RATE;
  } else if (ltdProfitAfterSalary >= CT_MAIN_THRESHOLD) {
    ltdCt = ltdProfitAfterSalary * CT_MAIN_RATE;
  } else {
    // Main rate less marginal relief: 25% x P - 3/200 x (250,000 - P)
    ltdCt = ltdProfitAfterSalary * CT_MAIN_RATE
      - (CT_MAIN_THRESHOLD - ltdProfitAfterSalary) * CT_MARGINAL_RELIEF_FRACTION;
  }
  const ltdNetAfterCt = ltdProfitAfterSalary - ltdCt;
  const ltdTotalExtract = SALARY + ltdNetAfterCt;
  const ltdDivAmount = ltdNetAfterCt;
  // Salary sits below the personal allowance; the unused allowance shelters dividends first
  const paShelter = Math.max(0, PERSONAL_ALLOWANCE - SALARY);
  const ltdDivTaxableIncome = Math.max(0, ltdDivAmount - paShelter);
  // £500 dividend allowance is taxed at 0% but uses the band
  const basicBandWidth = BASIC_BAND_CEILING - PERSONAL_ALLOWANCE;
  const ltdDivInBasic = Math.min(ltdDivTaxableIncome, basicBandWidth);
  const ltdDivBasic = Math.max(0, ltdDivInBasic - DIVIDEND_ALLOWANCE);
  const ltdDivHigher = Math.max(0, ltdDivTaxableIncome - basicBandWidth);
  const ltdDivTax = ltdDivBasic * DIVIDEND_BASIC + ltdDivHigher * DIVIDEND_HIGHER;
  const ltdTakeHome = ltdTotalExtract - ltdDivTax;

  return { profit, stTax, stNic: stClass4, stTakeHome, ltdCt, ltdDivTax, ltdTakeHome, saving: ltdTakeHome - stTakeHome };
}

export const soleTraderVsLtdSellersTool: GenericTool = {
  kind: "generic",
  slug: "sole-trader-vs-ltd-sellers",
  name: "Sole Trader vs Ltd Company (Sellers)",
  category: "Business Structure and Tax",
  oneLiner:
    "Compare sole-trader and limited-company take-home for UK marketplace and ecommerce sellers. Runs on your selling profit after platform fees and COGS using 2026/27 rates.",
  metaTitle: "Sole Trader vs Ltd for Online Sellers UK | Tax Calculator 2026",
  metaDescription:
    "Compare sole-trader and limited-company take-home for UK marketplace sellers. Enter profit after platform fees and stock costs. 2026/27 income tax, Class 4 NIC, CT and dividend rates.",
  intro:
    "For marketplace and ecommerce sellers, the structure decision is not the same as for a service business. Stock reinvestment means your taxable profit often exceeds your available cash, and platform fees change the income picture before the tax comparison even starts. This calculator runs the sole-trader and limited-company take-home side by side at your profit level, after you have already deducted platform fees, cost of goods and other business costs. It uses 2026/27 rates for income tax, Class 4 NIC, corporation tax and <a href=\"https://www.gov.uk/tax-on-dividends\">dividend rates under Finance Act 2026</a>.",
  ctaLabel: "Get advice on the right structure for your selling business",
  embedHeight: 560,
  fields: [
    {
      id: "profit",
      label: "Annual profit (after business costs)",
      type: "currency",
      default: 40000,
      step: 1000,
      min: 0,
      help: "Net profit after deducting platform fees (referral, fulfilment), cost of goods sold and all other allowable costs. Enter the figure before any personal income tax or NIC. If you use the seller take-home calculator to model your costs, the net profit figure it shows is the one to enter here.",
    },
  ],
  compute: (v) => {
    const r = calcStVsLtd(Math.max(0, Number(v.profit)));
    const ltdBetter = r.saving > 0;
    const tone = ltdBetter ? "good" : "default";
    return {
      headline: {
        label: ltdBetter ? "Limited company saves" : "Sole trader is similar or better",
        value: ltdBetter ? gbp(r.saving) + " per year vs sole trader" : gbp(Math.abs(r.saving)) + " (sole trader ahead)",
        sub: `Sole trader take-home ${gbp(r.stTakeHome)} vs Ltd take-home ${gbp(r.ltdTakeHome)}`,
        tone,
      },
      rows: [
        { label: "Annual profit", value: gbp(r.profit) },
        { label: "Sole trader: income tax", value: gbp(r.stTax) },
        { label: "Sole trader: Class 4 NIC", value: gbp(r.stNic) },
        { label: "Sole trader take-home", value: gbp(r.stTakeHome), strong: true },
        { label: "Ltd: corporation tax", value: gbp(r.ltdCt) },
        { label: "Ltd: dividend tax", value: gbp(r.ltdDivTax) },
        { label: "Ltd take-home", value: gbp(r.ltdTakeHome), strong: true },
        { label: "Annual saving (Ltd vs ST)", value: gbp(r.saving), strong: true },
      ],
      note: "This is an estimate for illustration. It assumes no other income, a £5,000 salary (below the employer NIC threshold), full extraction of remaining post-tax profit as dividends, and no additional-rate income. Corporation tax marginal relief between £50,000 and £250,000 is applied. Accountancy costs for a limited company (typically £1,000 to £2,000 per year more) are not included. Speak to an accountant before changing structure.",
    };
  },
  explainer: {
    heading: "When does a limited company save tax for sellers?",
    paragraphs: [
      `At lower profit levels (under roughly £30,000 to £35,000), the tax saving from incorporating a selling business rarely covers the extra accountancy costs. The benefit grows above that level. For marketplace sellers, the key is using the right profit figure: taxable profit after platform fees and cost of goods, not gross revenue, is the number that drives the comparison.`,
      `As a sole trader, profit above £${PERSONAL_ALLOWANCE.toLocaleString()} is taxed at 20% income tax plus ${CLASS4_MAIN * 100}% <a href="https://www.gov.uk/self-employed-national-insurance-rates">Class 4 NIC</a>. Above £${BASIC_BAND_CEILING.toLocaleString()}, income tax rises to 40%. Both taxes apply to the same profit figure, so the combined rate in the basic band is 26%.`,
      `A <a href="https://www.gov.uk/corporation-tax-rates">limited company pays corporation tax</a> at ${CT_SMALL_RATE * 100}% on profits up to £${CT_SMALL_THRESHOLD.toLocaleString()} (reduced if there are associated companies), with marginal relief between £50,000 and £250,000. The owner-director takes a low salary up to the £5,000 employer NIC threshold, keeping it free of NIC and deductible for corporation tax, then extracts remaining post-tax profit as <a href="https://www.gov.uk/tax-on-dividends">dividends</a> taxed at ${DIVIDEND_BASIC * 100}% (basic rate, Finance Act 2026 s.4) and ${DIVIDEND_HIGHER * 100}% (higher rate) above the £${DIVIDEND_ALLOWANCE} annual dividend allowance.`,
      `The £1,000 <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">trading allowance</a> is worth noting at the bottom end: sellers with income below £1,000 may pay no tax at all. Above that level, using the allowance instead of actual costs is usually the worse option for goods sellers who have real COGS to deduct. Incorporation at this scale rarely makes sense.`,
    ],
  },
  faqs: [
    {
      question: "Should I incorporate my Shopify or Amazon selling business?",
      answer: `At selling profits below roughly £30,000 to £35,000, the tax saving from incorporating rarely covers the extra accountancy fees. Above that level, a limited company typically produces a meaningfully better take-home. The right answer depends on your profit level after platform fees and stock costs, any other income and your plans for the business. Use this calculator as a starting point and talk to an accountant before incorporating. For the generic version of this calculation without seller-specific inputs, the generalist incorporation calculator at hollowaydavies.co.uk covers that.`,
    },
    {
      question: "Does Making Tax Digital affect my structure choice?",
      answer: `<a href="https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax">MTD for Income Tax</a> applies to sole traders with combined self-employment and property income above £50,000 from 6 April 2026, above £30,000 from April 2027, and above £20,000 from April 2028. A limited company is not subject to MTD for Income Tax; it files corporation tax returns under standard CT rules. If you are approaching the MTD thresholds as a sole trader and incorporation makes tax sense at your profit level, the two benefits can align.`,
    },
    {
      question: "What is the £1,000 trading allowance and does it affect the comparison?",
      answer: `The <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">£1,000 trading allowance</a> means sellers with gross trading income of £1,000 or less may not need to register for Self Assessment or pay any tax. Above £1,000, you can either use the allowance instead of actual expenses or deduct real costs. For goods sellers with real stock costs, deducting actual COGS almost always produces a lower taxable profit. Incorporation at the £1,000 level is rarely worthwhile.`,
    },
  ],
};
