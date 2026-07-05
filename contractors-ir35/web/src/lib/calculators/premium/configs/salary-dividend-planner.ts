/**
 * Tool 3: Salary and dividend planner.
 *
 * toolId: salary-dividend-planner-premium
 * topic: pay-planning
 *
 * Wraps personalTax(salary, dividends) from tax2026.ts.
 * Also uses DIVIDEND_ALLOWANCE, DIVIDEND_RATES, personalAllowance for the
 * band-breakdown rows.
 *
 * FIGURES TRACED (from tax2026.ts, no maths forked):
 *   Default: salary=12570, dividends=50000
 *   personalTax(12570, 50000):
 *     pa = 12570 (ANI 62570 <= 100000, no taper)
 *     paToSalary = 12570; paToDividends = 0
 *     incomeTaxOnSalary = 0 (salary - pa = 0)
 *     divTaxable = 50000 - 0 = 50000
 *     pos = 0 (salary band position)
 *     basicRoom = 37700; higherRoom = 74870
 *     dBasic = 37700; dHigher = min(12300, 74870) = 12300; dAdditional = 0
 *     allowance = 500: aBasic=500, dBasic=37200; dHigher=12300
 *     dividendTax = 37200*0.1075 + 12300*0.3575 = 3999 + 4397.25 = 8396.25
 *     employeeNI = 0 (salary 12570 = PT, no NIC due)
 *     totalPersonalTax = 0 + 8396.25 + 0 = 8396.25  -> "£8,396"
 *   Conservation: totalPersonalTax == incomeTaxOnSalary + dividendTax + employeeNI
 *                 8396.25 == 0 + 8396.25 + 0. Pass.
 *
 * Note: no single universal optimal salary (HP §8, §17). Never publish a
 * one-size-fits-all "optimal salary is £X". Employment Allowance caveat required
 * (single-director PSCs cannot claim EA, HP §6/§8). 2026/27 rates tagged.
 *
 * No em-dashes anywhere. No DJH.
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import {
  personalTax,
  DIVIDEND_ALLOWANCE,
  DIVIDEND_RATES,
  BASIC_RATE_LIMIT,
  HIGHER_RATE_LIMIT,
  personalAllowance as calcPA,
} from "@/lib/calculators/tax2026";

function gbp(n: number): string {
  return "£" + Math.round(Number.isFinite(n) ? n : 0).toLocaleString("en-GB");
}

export const salaryDividendPlannerConfig: PremiumToolConfig = {
  id: "salary-dividend-planner-premium",
  topic: "pay-planning",
  title: "Salary and dividend planner (2026/27)",
  intro: "See exactly how your chosen salary and dividend split is taxed, what you keep after income tax, dividend tax and National Insurance, and how the 2026/27 dividend rate rise affects you.",
  fields: [
    {
      id: "salary",
      label: "Director salary",
      type: "currency",
      default: 12570,
      min: 0,
      max: 100000,
      step: 500,
      help: "The salary drawn from your limited company. Common targets are £6,708 (lower earnings limit) and £12,570 (personal allowance). The most efficient level depends on whether your company qualifies for the Employment Allowance (HP §8).",
    },
    {
      id: "dividends",
      label: "Dividends drawn",
      type: "currency",
      default: 50000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Dividends paid from post-tax company profit. Only retained profit can be distributed.",
    },
  ],
  compute({ values }): PremiumResult {
    const salary    = Number.isFinite(Number(values.salary))    ? Number(values.salary)    : 12570;
    const dividends = Number.isFinite(Number(values.dividends)) ? Number(values.dividends) : 50000;

    const pt = personalTax(salary, dividends);

    // Band breakdown for the dividend rows.
    const ani = salary + dividends;
    const pa  = calcPA(ani);
    const paToSalary    = Math.min(salary, pa);
    const paToDividends = Math.min(Math.max(pa - salary, 0), dividends);
    const divTaxable    = dividends - paToDividends;
    const pos           = salary - paToSalary;
    const basicRoom     = Math.max(0, BASIC_RATE_LIMIT - pos);
    const higherRoom    = Math.max(0, HIGHER_RATE_LIMIT - Math.max(pos, BASIC_RATE_LIMIT));
    let dBasic          = Math.min(divTaxable, basicRoom);
    let dHigher         = Math.min(divTaxable - dBasic, higherRoom);
    let dAdditional     = divTaxable - dBasic - dHigher;

    // Apply the £500 dividend allowance from the lowest band up.
    let allowance = DIVIDEND_ALLOWANCE;
    const aBasic = Math.min(allowance, dBasic);
    dBasic      -= aBasic; allowance -= aBasic;
    const aHigher = Math.min(allowance, dHigher);
    dHigher     -= aHigher; allowance -= aHigher;
    const aAdditional = Math.min(allowance, dAdditional);
    dAdditional -= aAdditional;

    const netInPocket = salary + dividends - pt.totalPersonalTax;

    const headlineTone = ("good" as const);

    return {
      headline: {
        label: "Total personal tax on this split",
        value: gbp(pt.totalPersonalTax),
        sub: `Net in your pocket: ${gbp(netInPocket)} (2026/27 rates)`,
        tone: headlineTone,
      },
      breakdown: [
        { label: "Director salary", value: gbp(salary) },
        { label: "Personal allowance used", value: gbp(pt.personalAllowance), strong: false },
        { label: "Income tax on salary", value: gbp(pt.incomeTaxOnSalary), strong: false },
        { label: "Employee NIC on salary", value: gbp(pt.employeeNI), strong: false },
        { label: "Dividends drawn", value: gbp(dividends) },
        { label: "Dividend allowance (0%)", value: gbp(DIVIDEND_ALLOWANCE) },
        ...(dBasic > 0
          ? [{ label: `Dividend tax (ordinary ${(DIVIDEND_RATES.ordinary * 100).toFixed(2)}%)`, value: gbp(dBasic * DIVIDEND_RATES.ordinary) }]
          : []),
        ...(dHigher > 0
          ? [{ label: `Dividend tax (upper ${(DIVIDEND_RATES.upper * 100).toFixed(2)}%)`, value: gbp(dHigher * DIVIDEND_RATES.upper) }]
          : []),
        ...(dAdditional > 0
          ? [{ label: `Dividend tax (additional ${(DIVIDEND_RATES.additional * 100).toFixed(2)}%)`, value: gbp(dAdditional * DIVIDEND_RATES.additional) }]
          : []),
        { label: "Total dividend tax", value: gbp(pt.dividendTax), strong: true },
        { label: "Total personal tax", value: gbp(pt.totalPersonalTax), strong: true },
        { label: "Net in your pocket", value: gbp(netInPocket), strong: true },
      ],
      note: "2026/27 dividend rates: ordinary 10.75%, upper 35.75%, additional 39.35% (FA 2026 s.4). Dividend allowance £500. Employee NIC on salary only (8% between the primary threshold and UEL, 2% above). There is no single universal optimal salary for a director: the most tax-efficient level depends on whether your company can claim the Employment Allowance. Single-director PSCs cannot claim EA, so the £12,570 salary is usually preferable on net-income grounds, but circumstances vary (HP §8, §17). This figure is the personal tax on extraction; it does not include corporation tax on profit. These are estimates, not advice.",
    };
  },
  explainer: {
    heading: "How the salary and dividend planner works",
    paragraphs: [
      "Salary and dividends are taxed very differently. Salary is subject to income tax at 20%, 40% or 45% and employee National Insurance at 8% (between £12,570 and £50,270) and 2% above. Dividends are taxed at 10.75% (ordinary rate), 35.75% (upper rate) or 39.35% (additional rate) after a £500 annual dividend allowance, and they sit on top of your salary for band purposes. At lower income levels, where dividends stay in the basic rate band, the dividend rate (10.75%) is substantially below the income tax rate (20%), which is why the salary-plus-dividends structure is common for limited company contractors.",
      "The 2026/27 dividend rates are higher than they were two years ago. The ordinary rate rose from 8.75% to 10.75%, the upper rate from 33.75% to 35.75%, and the additional rate from 39.35% to 39.35% (unchanged at additional). If you have been using older estimates, the change is material: on £50,000 of dividends in the basic rate band, the difference between 8.75% and 10.75% is around £1,000 per year.",
      "The most tax-efficient salary level depends on whether your company qualifies for the Employment Allowance. Single-director PSCs cannot claim the Employment Allowance, so the employer National Insurance cost on a salary above £5,000 falls on the company. Setting the salary at £12,570 (the personal allowance) means no income tax and no employee National Insurance, but there is a small employer National Insurance cost. Setting it at £6,708 (the lower earnings limit) preserves the qualifying year for State Pension without triggering employer NIC. There is no single right answer without knowing your exact circumstances.",
    ],
  },
};
