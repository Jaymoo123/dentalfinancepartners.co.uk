import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcDividendTax } from "@/lib/tools/compute/dividend-tax";

export const dividendTaxTool: GenericTool = {
  kind: "generic",
  slug: "dividend-tax-2026-27",
  name: "Dividend Tax Calculator 2026/27",
  category: "Income Tax",
  oneLiner:
    "Work out your dividend tax bill at the new 2026/27 rates (10.75%, 35.75%, 39.35%) and see exactly how much more you pay than under the 2025/26 rates.",
  embedHeight: 560,
  metaTitle: "Dividend Tax Calculator 2026/27 | New Rates 10.75% & 35.75%",
  metaDescription:
    "Free UK dividend tax calculator for 2026/27. New FA 2026 rates: 10.75% basic, 35.75% higher, 39.35% additional. £500 allowance, personal allowance taper, and a side-by-side comparison with 2025/26.",
  intro:
    "Dividend tax rates rose from 6 April 2026. Finance Act 2026 set the basic rate at 10.75% (up from 8.75%) and the higher rate at 35.75% (up from 33.75%), with the additional rate unchanged at 39.35%. Enter your dividend income and your other income (salary, pension, rental profit) and this calculator stacks everything across the bands, applies the £500 dividend allowance and the personal allowance taper above £100,000, and shows your 2026/27 bill next to what the same income would have cost in 2025/26.",
  fields: [
    {
      id: "dividends",
      label: "Dividend income for 2026/27",
      type: "currency",
      default: 30000,
      min: 0,
      max: 500000,
      step: 500,
    },
    {
      id: "otherIncome",
      label: "Other income (salary, pension, rental)",
      type: "currency",
      default: 12570,
      min: 0,
      max: 500000,
      step: 500,
      help: "Non-dividend income is taxed first, so it determines which bands your dividends fall into. Enter gross figures before tax.",
    },
  ],
  compute(values) {
    const dividends = Number(values.dividends);
    const r = calcDividendTax(Number(values.otherIncome), dividends);
    const rows = [
      ...(r.paUsedByDividends > 0
        ? [{ label: "Personal allowance covering dividends", value: gbp(r.paUsedByDividends) }]
        : []),
      { label: "Dividend allowance used (0%)", value: gbp(r.allowanceUsed) },
      ...(r.taxedAtBasic > 0
        ? [{ label: `Taxed at basic rate 10.75% (${gbp(r.taxedAtBasic)})`, value: gbp(r.basicTax) }]
        : []),
      ...(r.taxedAtHigher > 0
        ? [{ label: `Taxed at higher rate 35.75% (${gbp(r.taxedAtHigher)})`, value: gbp(r.higherTax) }]
        : []),
      ...(r.taxedAtAdditional > 0
        ? [
            {
              label: `Taxed at additional rate 39.35% (${gbp(r.taxedAtAdditional)})`,
              value: gbp(r.additionalTax),
            },
          ]
        : []),
      { label: "Dividend tax for 2026/27", value: gbp(r.totalTax), strong: true as const },
      { label: "Same income at 2025/26 rates", value: gbp(r.tax2025_26) },
      {
        label: "Increase under the new rates",
        value: gbp(r.increaseVs2025_26),
        strong: true as const,
      },
      { label: "Dividends kept after tax", value: gbp(r.netDividend) },
    ];
    return {
      headline: {
        label: "Dividend tax bill 2026/27",
        value: gbp(r.totalTax),
        sub: `${pct(r.effectiveRate * 100)} effective rate on dividends · ${gbp(r.increaseVs2025_26)} more than 2025/26`,
        tone: r.totalTax === 0 ? "good" : "default",
      },
      rows,
      note:
        r.personalAllowance < 12570
          ? `Your personal allowance is tapered to ${gbp(r.personalAllowance)} because total income exceeds £100,000 (£1 lost for every £2 over).`
          : "Assumes the standard £12,570 personal allowance and no other reliefs or savings income. Scottish rates do not apply to dividends, so this works UK-wide.",
    };
  },
  explainer: {
    heading: "Dividend tax rates for 2026/27, and how the calculation works",
    paragraphs: [
      "For dividends received on or after 6 April 2026, Finance Act 2026 sets three rates: 10.75% at the basic rate (taxable income up to £37,700 after the personal allowance), 35.75% at the higher rate (up to £125,140 total income), and 39.35% at the additional rate above that. The first £500 of dividends is covered by the dividend allowance and taxed at 0%, although it still uses up band capacity. Your other income (salary, pension, rental profit) is taxed first, so dividends sit on top of it in the bands.",
      "Worked example 1: a director takes a £12,570 salary and £30,000 in dividends. The salary uses the full personal allowance, £500 of dividends is covered by the allowance, and the remaining £29,500 all falls in the basic rate band. Tax at 10.75% is £3,171.25 for 2026/27. The same income in 2025/26 at 8.75% cost £2,581.25, so the new rates add £590.",
      "Worked example 2: someone with £50,270 of salary and £40,000 of dividends. The salary fills the personal allowance and the entire basic rate band, so after the £500 allowance the remaining £39,500 of dividends is all taxed at the higher rate of 35.75%, giving £14,121.25. At the 2025/26 higher rate of 33.75% the bill was £13,331.25, an increase of £790.",
      "Above £100,000 of total income the personal allowance tapers away at £1 for every £2 of income, disappearing entirely at £125,140. The calculator applies this automatically, which is why effective rates climb sharply in that range.",
    ],
  },
  faqs: [
    {
      question: "What are the dividend tax rates for 2026/27?",
      answer:
        "From 6 April 2026 the rates are 10.75% at the basic rate, 35.75% at the higher rate, and 39.35% at the additional rate. Finance Act 2026 raised the basic and higher rates by 2 percentage points each from their 2025/26 levels of 8.75% and 33.75%. The additional rate is unchanged.",
    },
    {
      question: "What is the dividend allowance for 2026/27?",
      answer:
        "£500, unchanged from 2025/26. The first £500 of dividend income is taxed at 0%. It is not a deduction: the allowance still counts towards your basic or higher rate band, so it can push later dividend income into a higher band.",
    },
    {
      question: "How much more dividend tax will I pay in 2026/27 than in 2025/26?",
      answer:
        "Broadly 2p per £1 of dividends taxed at the basic or higher rate. A basic rate taxpayer with £20,000 of taxable dividends pays about £400 more; a higher rate taxpayer with £40,000 taxed at the higher rate pays about £800 more. Dividends taxed at the additional rate cost the same as before, since that rate stayed at 39.35%. The calculator shows your exact figure.",
    },
    {
      question: "Do salary and other income affect my dividend tax rate?",
      answer:
        "Yes. Dividends are taxed as the top slice of your income, so your salary, pension and rental income fill the personal allowance and lower bands first. £30,000 of dividends on top of a £12,570 salary is all basic rate; the same £30,000 on top of a £60,000 salary is all higher rate.",
    },
    {
      question: "What happens to dividend tax when income goes over £100,000?",
      answer:
        "Your personal allowance is reduced by £1 for every £2 of income over £100,000, reaching zero at £125,140. Because dividends count towards this total, dividend income in that range can carry a much higher effective rate than the headline 35.75%. The calculator builds the taper in.",
    },
    {
      question: "Do I need to file a Self Assessment return for dividends?",
      answer:
        "If your dividend income is over £10,000 you must file a Self Assessment return. Between £500 and £10,000 you can either file a return or ask HMRC to collect the tax through your PAYE tax code. Dividends within the £500 allowance need no action, though company directors often have other reasons to file.",
    },
  ],
  related: [
    { label: "Salary & Dividend Optimiser", href: "/calculators/salary-dividend-optimiser" },
    { label: "Take-Home Pay Calculator", href: "/calculators/take-home-pay-calculator" },
  ],
};
