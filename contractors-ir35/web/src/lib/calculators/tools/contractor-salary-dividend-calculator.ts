import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { limitedTakeHome } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Salary vs dividend optimiser for a single-director PSC, 2026/27. Runs
 * limitedTakeHome at the two common salary targets (£12,570 and £6,708) on the
 * same turnover and reports the better net. All maths is in tax2026; no rate is
 * inlined. House stance: no single universal optimal salary (HP §8).
 */
export const contractorSalaryDividendCalculator: GenericTool = {
  kind: "generic",
  slug: "contractor-salary-dividend-calculator",
  name: "Contractor Salary and Dividend Calculator",
  category: "Dividends and salary",
  oneLiner:
    "Compare a £12,570 versus £6,708 director salary on the same turnover for 2026/27 and see which leaves a single-director company with the higher net take-home.",
  metaTitle: "Contractor Salary and Dividend Calculator 2026/27",
  metaDescription:
    "Free 2026/27 contractor salary and dividend calculator. Compare a £12,570 and £6,708 director salary on the same turnover to see which optimises your net take-home.",
  intro:
    "Enter your day rate and billable days to compare a £12,570 versus £6,708 director salary on the same turnover for 2026/27, and see which leaves you with more after all tax.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 660,
  fields: [
    {
      id: "dayRate",
      label: "Day rate",
      type: "currency",
      default: 500,
      step: 25,
      help: "Your billed day rate, excluding VAT. Turnover is this multiplied by your billable days.",
    },
    {
      id: "billableDays",
      label: "Billable days per year",
      type: "number",
      default: 240,
      step: 5,
      min: 0,
      max: 260,
      help: "Days you expect to bill across the year.",
    },
    {
      id: "annualExpenses",
      label: "Annual allowable expenses",
      type: "currency",
      default: 6000,
      step: 500,
      advanced: true,
      help: "Genuine wholly-and-exclusively business costs. Applied equally to both salary scenarios so the comparison is like for like.",
    },
  ],
  compute: (v) => {
    const dayRate = Number(v.dayRate);
    const billableDays = Number(v.billableDays);
    const expenses = Number(v.annualExpenses);
    const turnover = dayRate * billableDays;

    const high = limitedTakeHome({ turnover, salary: 12570, expenses }); // £12,570
    const low = limitedTakeHome({ turnover, salary: 6708, expenses }); // £6,708 LEL

    const better = high.netTakeHome >= low.netTakeHome ? high : low;
    const betterLabel = better === high ? "£12,570 salary" : "£6,708 salary";
    const gap = Math.abs(high.netTakeHome - low.netTakeHome);

    return {
      headline: {
        label: "Best net take-home",
        value: gbp(better.netTakeHome),
        sub: `Higher with the ${betterLabel} · ${gbp(gap)} better than the other option`,
        tone: "good",
      },
      rows: [
        { label: "Company turnover", value: gbp(turnover) },
        { label: "Net with £12,570 salary", value: gbp(high.netTakeHome), strong: better === high },
        { label: "Retention, £12,570", value: pct(high.retentionPct) },
        { label: "Net with £6,708 salary", value: gbp(low.netTakeHome), strong: better === low },
        { label: "Retention, £6,708", value: pct(low.retentionPct) },
        { label: "Difference between the two", value: gbp(gap), strong: true },
      ],
      note: "This assumes a single-director company that cannot claim the Employment Allowance (a sole director is excluded from it for 2026/27). A salary at the £6,708 lower earnings limit secures a qualifying year for the state pension while attracting only a little employer NIC, whereas £12,570 costs more employer NIC on the slice above the £5,000 secondary threshold but saves corporation tax on the extra salary, so the two are usually close. There is no single optimal salary that fits every contractor: the right figure depends on Employment Allowance eligibility, any other income using your personal allowance, and your corporation tax marginal rate. An employer pension contribution is a bigger lever than the salary choice and is not modelled here.",
    };
  },
  explainer: {
    heading: "Choosing a director salary for 2026/27",
    paragraphs: [
      "A limited-company contractor extracts profit through a mix of salary and dividends. Salary is a deductible company expense, so it cuts the profit charged to corporation tax, but it attracts PAYE income tax and National Insurance. Dividends carry no NIC but come from post-corporation-tax profit. The classic question is how much salary to take. For a single-director company that cannot claim the Employment Allowance, the two common 2026/27 targets are the £6,708 lower earnings limit and the £12,570 personal allowance. This calculator runs both on the same turnover and shows which leaves you better off after all company and personal tax.",
      "The trade-off is genuinely fine. A salary at the £6,708 LEL is just enough to count as a qualifying year for the state pension while keeping employer NIC tiny, since employer NIC only bites above the £5,000 secondary threshold for 2026/27. Taking £12,570 means a bit more employer NIC and a bit more employee NIC, but the extra salary saves corporation tax at 19% (or up to about 26.5% in the marginal band), and that saving usually slightly outweighs the extra NIC. The result is that the two options are typically within a few hundred pounds of each other, which is why the difference figure above is small.",
      "The important caveat is the one the house position insists on: there is no single optimal salary that fits everyone. The right number depends on whether your company can claim the Employment Allowance (a genuinely employed spouse or other staff changes the answer, often making £12,570 clearly best), whether you have other income already using your personal allowance, and your corporation tax marginal rate. And the salary choice is a small lever next to the big one: an employer pension contribution, which is deductible against corporation tax, free of NIC and untaxed on you as income within the £60,000 annual allowance. Treat this comparison as a starting point and have your full extraction plan tailored.",
    ],
  },
  faqs: [
    {
      question: "Should I take a £6,708 or £12,570 salary in 2026/27?",
      answer:
        "For a single-director company that cannot claim the Employment Allowance, the two are usually very close. A £6,708 salary (the lower earnings limit) secures a qualifying state-pension year with minimal employer NIC. A £12,570 salary costs a little more employer and employee NIC but saves corporation tax on the extra salary, often coming out marginally ahead. This calculator shows the exact difference for your turnover. If your company can claim the Employment Allowance, £12,570 is generally the clear winner.",
    },
    {
      question: "Why can my single-director company not claim the Employment Allowance?",
      answer:
        "The £10,500 Employment Allowance offsets an employer's secondary Class 1 National Insurance, but it is not available to a company whose only employee is a single director. That exclusion is precisely why single-director contractor companies often choose a low salary: there is no allowance to soak up employer NIC on a higher salary. If you employ another person who genuinely works in the business, for example a spouse on a real wage, the company may then qualify, which changes the optimal salary.",
    },
    {
      question: "Is there one optimal salary for all contractors?",
      answer:
        "No, and any source that gives a single universal figure is oversimplifying. The right salary depends on whether you can claim the Employment Allowance, whether you have other income using your personal allowance, and your corporation tax marginal rate. For most single-director companies the £6,708 and £12,570 options are within a few hundred pounds, so the choice is not where the big savings are. The larger lever is an employer pension contribution, which this calculator does not model.",
    },
    {
      question: "How are the dividends taxed in this comparison?",
      answer:
        "After the salary and corporation tax, the remaining profit is drawn as dividends and taxed on you personally at the 2026/27 rates: 10.75% in the basic band, 35.75% in the higher band and 39.35% in the additional band, after the £500 dividend allowance. Because the salary is set below or at the personal allowance, most of the dividend is taxed once it stacks above £12,570 of income, with the higher rate biting above the £50,270 higher-rate threshold.",
    },
    {
      question: "Does this include a pension contribution?",
      answer:
        "No. The comparison assumes all post-tax profit is drawn as dividends, with no employer pension contribution. In practice the pension is the contractor's biggest tax-efficient lever for 2026/27: an employer contribution is deductible against corporation tax, carries no NIC and is not taxed on you as income within the £60,000 annual allowance (plus any carry-forward from the previous three years). Adding one would reduce dividends but increase your overall after-tax position, so the most efficient plan is rarely the one that maximises dividends.",
    },
  ],
};
