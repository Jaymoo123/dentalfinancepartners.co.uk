import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import {
  personalTax,
  personalAllowance,
  DIVIDEND_ALLOWANCE,
  DIVIDEND_RATES,
  BASIC_RATE_LIMIT,
  ADDITIONAL_RATE_GROSS_THRESHOLD,
} from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Dividend tax for 2026/27 (rUK), salary + dividends. The headline tax figure
 * is taken straight from the verified personalTax primitive; the per-band rows
 * re-derive the same stacking (using the locked tax2026 constants, no inlined
 * rates) purely to show the working, and reconcile to personalTax.dividendTax.
 */
export const dividendTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "dividend-tax-calculator",
  name: "Dividend Tax Calculator",
  category: "Dividends and salary",
  oneLiner:
    "Work out the dividend tax due on your salary and dividends for 2026/27, with the £500 allowance and the tax in each band shown at the 10.75%, 35.75% and 39.35% rates.",
  metaTitle: "Dividend Tax Calculator 2026/27",
  metaDescription:
    "Free 2026/27 dividend tax calculator. Enter your salary and dividends to see the tax due after the £500 allowance at the 10.75%, 35.75% and 39.35% rates.",
  intro:
    "Enter your salary and the dividends you draw to see the dividend tax due for 2026/27, after the £500 dividend allowance and across the basic, higher and additional bands.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 660,
  fields: [
    {
      id: "salary",
      label: "Salary (and other non-dividend income)",
      type: "currency",
      default: 12570,
      step: 500,
      help: "Your director salary plus any other non-savings income. Dividends are taxed on top of this.",
    },
    {
      id: "dividends",
      label: "Dividends drawn",
      type: "currency",
      default: 50000,
      step: 1000,
      help: "Total dividends taken in the year. These stack on top of your salary and are taxed in their own bands.",
    },
  ],
  compute: (v) => {
    const salary = Number(v.salary);
    const dividends = Number(v.dividends);

    const pt = personalTax(salary, dividends);
    const dividendTax = pt.dividendTax;

    // Re-derive the band split using the locked tax2026 constants so the rows
    // show the working. This mirrors personalTax exactly and reconciles to it.
    const pa = personalAllowance(salary + dividends);
    const paToDividends = Math.min(Math.max(pa - salary, 0), dividends);
    const salaryTaxable = Math.max(salary - Math.min(salary, pa), 0);
    const divTaxable = dividends - paToDividends;

    const pos = salaryTaxable;
    const additionalTaxable = Math.max(BASIC_RATE_LIMIT, ADDITIONAL_RATE_GROSS_THRESHOLD - pa);
    const basicRoom = Math.max(0, BASIC_RATE_LIMIT - pos);
    const higherRoom = Math.max(0, additionalTaxable - Math.max(pos, BASIC_RATE_LIMIT));
    let dBasic = Math.min(divTaxable, basicRoom);
    let dHigher = Math.min(divTaxable - dBasic, higherRoom);
    let dAdditional = divTaxable - dBasic - dHigher;

    // £500 allowance, 0%-rated, from the lowest band up.
    let allowance = DIVIDEND_ALLOWANCE;
    const aBasic = Math.min(allowance, dBasic);
    dBasic -= aBasic;
    allowance -= aBasic;
    const aHigher = Math.min(allowance, dHigher);
    dHigher -= aHigher;
    allowance -= aHigher;
    const aAdditional = Math.min(allowance, dAdditional);
    dAdditional -= aAdditional;

    const taxBasic = dBasic * DIVIDEND_RATES.ordinary;
    const taxHigher = dHigher * DIVIDEND_RATES.upper;
    const taxAdditional = dAdditional * DIVIDEND_RATES.additional;

    const effRate = dividends > 0 ? (dividendTax / dividends) * 100 : 0;

    return {
      headline: {
        label: "Dividend tax due (2026/27)",
        value: gbp(dividendTax),
        sub: `Effective dividend rate ${pct(effRate)} on ${gbp(dividends)} of dividends`,
        tone: dividendTax > 0 ? "warn" : "good",
      },
      rows: [
        { label: "Salary (non-dividend income)", value: gbp(salary) },
        { label: "Dividends drawn", value: gbp(dividends) },
        { label: "Dividend allowance (0%)", value: `−${gbp(Math.min(DIVIDEND_ALLOWANCE, divTaxable))}` },
        { label: "Taxed at ordinary 10.75%", value: gbp(taxBasic) },
        { label: "Taxed at upper 35.75%", value: gbp(taxHigher) },
        { label: "Taxed at additional 39.35%", value: gbp(taxAdditional) },
        { label: "Total dividend tax", value: gbp(dividendTax), strong: true },
        { label: "Effective dividend rate", value: pct(effRate), strong: true },
      ],
      note: "Dividends are taxed on top of your salary and other income, in their own bands, after the £500 dividend allowance (which is 0%-rated but still uses up band space). The 2026/27 rates are 10.75% (ordinary, basic band), 35.75% (upper, higher band) and 39.35% (additional band), up from 8.75% and 33.75% on 6 April 2026 under Finance Act 2026. This figure is the personal dividend tax only; it does not include the corporation tax the company already paid on the profits the dividends are drawn from, or the personal-allowance taper above £100,000 of total income.",
    };
  },
  explainer: {
    heading: "How dividend tax works for 2026/27",
    paragraphs: [
      "Dividends are the main way a limited-company contractor extracts profit, and for 2026/27 they are taxed in their own bands after all your other income. The order matters: your salary and other non-savings income are taxed first and fill the bands from the bottom, then dividends stack on top. Where your dividends fall determines the rate. The first £500 of dividends is covered by the dividend allowance and taxed at 0%, although it still consumes band space. Beyond that, dividends in the basic-rate band are taxed at 10.75%, those in the higher-rate band at 35.75%, and any in the additional-rate band at 39.35%.",
      "Those rates rose on 6 April 2026. Finance Act 2026 increased the dividend ordinary rate from 8.75% to 10.75% and the upper rate from 33.75% to 35.75%, while the additional rate stayed at 39.35% and the allowance stayed at £500. This is a genuine planning point for contractors: the incorporation advantage narrowed in 2026/27, and with the income tax thresholds frozen to April 2031, fiscal drag pushes more dividend income into the higher band over time. A typical low-salary, dividend-heavy contractor will now pay noticeably more dividend tax than a few years ago on the same drawings.",
      "Remember this is only the personal layer of tax. The profits your dividends come from have already borne corporation tax inside the company (19%, 25%, or an effective 26.5% in the marginal band for 2026/27). So the true total tax on company profit extracted as dividends is the corporation tax plus this dividend tax combined. When planning your drawings, it is usually the interaction of corporation tax, the £50,270 higher-rate threshold, the £100,000 personal-allowance taper and pension contributions that determines the most efficient split, not the dividend rate alone.",
    ],
  },
  faqs: [
    {
      question: "What are the dividend tax rates for 2026/27?",
      answer:
        "For 2026/27 the dividend rates are 10.75% in the basic-rate band (the ordinary rate), 35.75% in the higher-rate band (the upper rate) and 39.35% in the additional-rate band, after a £500 dividend allowance taxed at 0%. The ordinary and upper rates rose from 8.75% and 33.75% on 6 April 2026 under Finance Act 2026; the additional rate and the £500 allowance were unchanged.",
    },
    {
      question: "How does the £500 dividend allowance work?",
      answer:
        "The first £500 of your dividends for 2026/27 is taxed at 0%. It is an allowance, not a separate band, so it still uses up space in whichever band the dividends fall into. It is a flat £500 regardless of your income level, having been cut from £1,000 in earlier years. Above £500, your dividends are taxed at the ordinary, upper or additional rate depending on where they sit once stacked on top of your salary and other income.",
    },
    {
      question: "Why are my dividends taxed at the higher rate when my salary is low?",
      answer:
        "Because dividends stack on top of your other income. If your salary is £12,570 and you draw enough in dividends to push your total income above the £50,270 higher-rate threshold, the dividends above that point are taxed at the 35.75% upper rate for 2026/27, even though your salary alone is small. The bands are filled by salary first, then dividends, so it is your total income that decides how much of your dividend falls into each band.",
    },
    {
      question: "Does this calculator include the corporation tax already paid?",
      answer:
        "No. This figure is your personal dividend tax only. Dividends are paid from profits the company has already paid corporation tax on (19%, 25%, or about 26.5% in the marginal band for 2026/27), so the real total tax on profit taken as dividends is that corporation tax plus this dividend tax. To see the full picture of company plus personal tax on a contract, use the outside-IR35 take-home calculator instead.",
    },
    {
      question: "What about the personal allowance taper?",
      answer:
        "This calculator applies the £12,570 personal allowance and tapers it where total income exceeds £100,000 (lost at £1 for every £2 over, gone by £125,140), in line with the 2026/27 rules. If your salary plus dividends approaches or exceeds £100,000, the loss of personal allowance creates a high effective marginal rate on that slice of income, which is a common reason contractors manage their dividend timing around the £100,000 mark.",
    },
  ],
};
