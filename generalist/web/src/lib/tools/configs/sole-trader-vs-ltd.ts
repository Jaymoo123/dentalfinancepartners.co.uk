import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { compare, findCrossover } from "@/lib/tools/compute/sole-trader-vs-ltd";

export const soleTraderVsLtdTool: GenericTool = {
  kind: "generic",
  slug: "sole-trader-vs-ltd",
  name: "Sole Trader vs Limited Company Calculator",
  category: "Business Structure",
  oneLiner:
    "Compare sole trader and limited company take-home on the same profit, and see where (if anywhere) incorporating actually wins. 2026/27 rates.",
  embedHeight: 640,
  metaTitle: "Sole Trader vs Limited Company Calculator 2026/27 | Free UK Tool",
  metaDescription:
    "Free 2026/27 comparison of sole trader vs limited company take-home at your profit level, including the crossover analysis most calculators skip.",
  intro:
    "Enter your annual profit and this tool works out your net cash both ways: as a sole trader (income tax plus Class 4 National Insurance) and as a limited company director taking the standard £12,570 salary with the rest as dividends. It also scans every profit level from £20,000 to £150,000 to find where the company route starts to win, if it does at all. Under 2026/27 rates the answer surprises most people: if you draw everything out each year, the company's tax edge is tiny and a typical accountancy fee wipes it out. The real case for incorporating is usually profit retention, liability, or commercial reasons, and the tool is honest about that.",
  ctaLabel: "Book a free call",
  fields: [
    {
      id: "profit",
      label: "Annual profit (before tax and before paying yourself)",
      type: "currency",
      default: 60000,
      min: 0,
      max: 500000,
      step: 1000,
    },
    {
      id: "adminCost",
      label: "Extra yearly cost of running a company (accounts, filing, software)",
      type: "currency",
      default: 1000,
      min: 0,
      max: 10000,
      step: 100,
      help: "Limited company accounts and Corporation Tax filings typically cost £800 to £1,500 more per year than sole trader self assessment. Set to £0 to compare tax alone.",
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const adminCost = Number(values.adminCost);
    const c = compare(profit, adminCost);
    const window = findCrossover(adminCost);

    const soleWins = c.difference < 0;
    const diffAbs = Math.abs(c.difference);
    const crossoverLine = window
      ? window.to
        ? `Company wins only between ${gbp(window.from)} and ${gbp(window.to)} profit (full extraction)`
        : `Company wins from ${gbp(window.from)} profit upwards (full extraction)`
      : "No profit level from £20k to £150k where the company wins after costs";

    return {
      headline: {
        label: soleWins ? "Sole trader keeps more" : "Limited company keeps more",
        value: gbp(diffAbs),
        sub: `at ${gbp(profit)} profit, after the ${gbp(adminCost)} extra company running cost`,
        tone: "good",
      },
      rows: [
        { label: "Sole trader net", value: gbp(c.soleTrader.net), strong: true },
        { label: "· Income tax", value: gbp(c.soleTrader.incomeTax) },
        { label: "· Class 4 NI", value: gbp(c.soleTrader.class4) },
        { label: "Limited company net (before running costs)", value: gbp(c.ltd.net), strong: true },
        { label: "· Salary (tax-free at £12,570)", value: gbp(c.ltd.salary) },
        { label: "· Employer NI (no Employment Allowance, sole director)", value: gbp(c.ltd.employerNi) },
        { label: "· Corporation tax", value: gbp(c.ltd.corporationTax) },
        { label: "· Dividends", value: gbp(c.ltd.dividend) },
        { label: "· Dividend tax", value: gbp(c.ltd.dividendTax) },
        { label: "Crossover scan (£20k to £150k)", value: crossoverLine, strong: true },
      ],
      note:
        "Assumes full extraction: every pound of company profit paid out as salary plus dividends in the same year. Companies that retain profit for reinvestment defer the personal tax layer, which is where incorporation usually earns its keep. Assumes no other income, standard personal allowance, sole director with no Employment Allowance.",
    };
  },
  explainer: {
    heading: "How the comparison works, with two worked examples",
    paragraphs: [
      "Both routes start from the same annual profit. The sole trader pays income tax (20%, 40%, 45% bands) plus Class 4 National Insurance at 6% on profits between £12,570 and £50,270 and 2% above. The limited company pays you a £12,570 salary (no income tax or employee NI at that level, but 15% employer NI on the slice above £5,000, which a sole-director company cannot offset with the Employment Allowance), then pays corporation tax at 19% up to £50,000, an effective 26.5% between £50,000 and £250,000, and 25% above. What is left comes out as dividends, taxed at 10.75%, 35.75% or 39.35% after the £500 allowance.",
      "Worked example at £40,000 profit. Sole trader: income tax £5,486 plus Class 4 NI £1,645.80 leaves £32,868.20. Limited company: employer NI £1,135.50, corporation tax £4,995.95, dividends of £21,298.54 carrying £2,235.84 of dividend tax, for a net of £31,632.70 before running costs. The sole trader keeps £1,235.50 more, before you even add the accountancy fee.",
      "Worked example at £100,000 profit. Sole trader: income tax £27,432 plus Class 4 NI £3,256.60 leaves £69,311.40. Limited company: corporation tax £19,118.04 (the 26.5% marginal band bites here), dividends of £67,176.46 carrying £14,411.83 of tax, net £65,334.62. The sole trader keeps £3,976.78 more. The marginal corporation tax band plus the 35.75% higher dividend rate stack up badly at this level on full extraction.",
      "The crossover finding is the part most calculators get wrong. Under 2026/27 rates, with everything drawn out each year and zero extra running costs, the company route only edges ahead in a narrow window from roughly £60,200 to £62,600 of profit, and the peak advantage is about £102 a year. Add a typical £1,000 accountancy fee and there is no profit level between £20,000 and £150,000 where full extraction through a company wins. The scan in the results panel recomputes this live against your own running-cost figure.",
      "So why do people incorporate? Retained profit is the big one: money left in the company suffers only corporation tax until you draw it, which helps if you are saving to invest, plan to extract in a lower-income year, or will eventually sell and claim Business Asset Disposal Relief. Limited liability protects personal assets if the business fails or is sued. Some contracts and agencies simply require a company. Against that, companies mean Companies House filings, statutory accounts, a Corporation Tax return and a director's self assessment, while sole traders face Making Tax Digital for Income Tax quarterly updates from April 2026 if income is over £50,000 (£30,000 from April 2027). Neither route is paperwork-free any more.",
    ],
  },
  faqs: [
    {
      question: "What rates does this calculator use?",
      answer:
        "UK 2026/27 rates throughout. Sole trader: personal allowance £12,570, income tax at 20% / 40% / 45%, Class 4 NI at 6% between £12,570 and £50,270 and 2% above. Company: corporation tax 19% up to £50,000, 26.5% effective marginal rate to £250,000, 25% above; employer NI 15% above £5,000; dividend allowance £500 with rates of 10.75%, 35.75% and 39.35%.",
    },
    {
      question: "Why does the company barely ever win in this tool?",
      answer:
        "Because it models full extraction: every pound of profit paid out as salary plus dividends in the same year. The 2026/27 dividend rate rises (10.75% basic, 35.75% higher) plus 15% employer NI and the 26.5% marginal corporation tax band mean the layered company taxes now roughly match, or exceed, income tax plus 6% Class 4. If your accountant's comparison shows a big company saving, check whether it assumes profit retention or pre-2026 dividend rates.",
    },
    {
      question: "Does that mean incorporating is a mistake?",
      answer:
        "No, it means annual tax on full extraction is the wrong test on its own. Companies win when you retain profit (only 19% to 25% corporation tax until you draw it), when you can time extraction into lower-income years, when you plan an eventual sale using Business Asset Disposal Relief, when you need limited liability, or when clients require a company. This tool isolates the pure cash comparison so you can weigh those other factors honestly.",
    },
    {
      question: "Why is the Employment Allowance not applied to the company?",
      answer:
        "A company whose only employee paid above the £5,000 secondary threshold is also a director cannot claim the Employment Allowance. Since this tool models a single-director company on the standard £12,570 salary, the full 15% employer NI of £1,135.50 applies. If you have a second employee or director on the payroll, the £10,500 allowance may be available; our Salary and Dividend Optimiser lets you toggle it.",
    },
    {
      question: "What about Class 2 National Insurance for sole traders?",
      answer:
        "Compulsory Class 2 NI was abolished from April 2024. Sole traders with profits above £7,105 get National Insurance credits automatically; those below can pay voluntarily (£3.65 a week in 2026/27) to protect their State Pension record. It is small enough that we leave it out of the comparison.",
    },
    {
      question: "Is this advice on whether I should incorporate?",
      answer:
        "No. It is a model using standard 2026/27 rates, assuming no other income, no pension contributions, no student loan and full extraction of profit. Incorporation decisions also turn on retained profit plans, liability, VAT, contracts and exit plans. For a recommendation on your numbers, book a free call.",
    },
  ],
  related: [
    { label: "Salary & Dividend Optimiser", href: "/calculators/salary-dividend-optimiser" },
    { label: "Take-Home Pay Calculator", href: "/calculators/take-home-pay-calculator" },
  ],
};
