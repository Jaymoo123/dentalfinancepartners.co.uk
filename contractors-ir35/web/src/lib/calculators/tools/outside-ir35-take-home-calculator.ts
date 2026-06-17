import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { limitedTakeHome } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Outside-IR35 limited-company take-home for 2026/27 (rUK). All tax maths runs
 * through the verified tax2026 primitives (limitedTakeHome); no rate is inlined
 * here. Single-director PSC assumption (no Employment Allowance), all reserves
 * distributed as dividends.
 */
export const outsideIr35TakeHomeCalculator: GenericTool = {
  kind: "generic",
  slug: "outside-ir35-take-home-calculator",
  name: "Outside IR35 Take-Home Pay Calculator",
  category: "IR35 and take-home",
  oneLiner:
    "Work out your annual net take-home through a limited company on an outside-IR35 contract for 2026/27, with the full salary, dividend, corporation tax and NIC breakdown.",
  metaTitle: "Outside IR35 Take-Home Calculator 2026/27",
  metaDescription:
    "Free outside IR35 take-home calculator for 2026/27. Enter your day rate to see your limited company net pay after corporation tax, dividends and NIC.",
  intro:
    "Enter your day rate, billable days and a tax-efficient director salary to see what you keep through a limited company on an outside-IR35 contract for the 2026/27 tax year.",
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
      help: "A full-time contractor typically bills around 220 to 240 days a year after holiday, illness and gaps between contracts.",
    },
    {
      id: "salary",
      label: "Director salary",
      type: "select",
      default: "12570",
      options: [
        { value: "12570", label: "£12,570 (personal allowance / primary threshold)" },
        { value: "6708", label: "£6,708 (lower earnings limit)" },
      ],
      help: "Two common 2026/27 salary targets for a single-director company. There is no single universal optimum; the right figure depends on your circumstances.",
    },
    {
      id: "annualExpenses",
      label: "Annual allowable expenses",
      type: "currency",
      default: 6000,
      step: 500,
      advanced: true,
      help: "Genuine wholly-and-exclusively business costs (accountancy, insurance, equipment, software, business travel). These reduce taxable profit. Pension contributions are not included here.",
    },
  ],
  compute: (v) => {
    const dayRate = Number(v.dayRate);
    const billableDays = Number(v.billableDays);
    const salary = Number(v.salary);
    const expenses = Number(v.annualExpenses);
    const turnover = dayRate * billableDays;

    const r = limitedTakeHome({ turnover, salary, expenses });
    const salaryLabel = salary === 12570 ? "£12,570" : "£6,708";

    return {
      headline: {
        label: "Net annual take-home",
        value: gbp(r.netTakeHome),
        sub: `You keep ${pct(r.retentionPct)} of ${gbp(turnover)} turnover · salary ${salaryLabel} plus dividends`,
        tone: "good",
      },
      rows: [
        { label: "Company turnover", value: gbp(turnover) },
        { label: "Director salary", value: gbp(r.salary) },
        { label: "Employer NIC (15% above £5,000)", value: `−${gbp(r.employerNI)}` },
        { label: "Allowable expenses", value: `−${gbp(r.expenses)}` },
        { label: "Profit before corporation tax", value: gbp(r.profitBeforeTax) },
        { label: "Corporation tax", value: `−${gbp(r.corporationTax)}` },
        { label: "Dividends declared", value: gbp(r.dividends) },
        { label: "Income tax on salary", value: `−${gbp(r.incomeTaxOnSalary)}` },
        { label: "Dividend tax", value: `−${gbp(r.dividendTax)}` },
        { label: "Net annual take-home", value: gbp(r.netTakeHome), strong: true },
      ],
      note: "Single-director company assumption (no Employment Allowance, which a sole director cannot claim for 2026/27), with all post-tax profit drawn as dividends and no retained reserves. Dividend tax uses the 2026/27 rates of 10.75% (basic), 35.75% (higher) and 39.35% (additional) after the £500 dividend allowance. An employer pension contribution would lower the corporation tax and shift more value into your pension tax-free, so this take-home figure is not the same as the most tax-efficient plan.",
    };
  },
  explainer: {
    heading: "How outside-IR35 take-home pay works for 2026/27",
    paragraphs: [
      "On a genuinely outside-IR35 contract you bill the client through your own limited company (a personal service company, or PSC), and you decide how to extract the profit. The standard route is a small director salary plus dividends. The salary is a deductible company expense, so it reduces the profit charged to corporation tax, while dividends are paid from post-corporation-tax profit and carry no National Insurance. The headline take-home above is your salary plus dividends, after the company has paid corporation tax and you have paid your personal income tax and dividend tax for 2026/27.",
      "The figures here use the locked 2026/27 rates. Corporation tax is 19% on profits up to £50,000, 25% above £250,000, and an effective marginal rate of about 26.5% in between (marginal relief, standard fraction 3/200). Employer National Insurance is 15% on salary above the £5,000 secondary threshold, and a single-director company cannot claim the £10,500 Employment Allowance, which is why a low salary is common. Dividends are taxed at 10.75%, 35.75% and 39.35% across the basic, higher and additional bands after the £500 dividend allowance, rates that rose from 8.75% and 33.75% on 6 April 2026 under Finance Act 2026.",
      "Two things this calculator deliberately does not do. First, it assumes you draw every available pound as a dividend in the year; in practice an employer pension contribution is the contractor's single biggest tax-efficient lever, because it is deductible against corporation tax, carries no NIC and is not taxed on you as income (subject to the £60,000 annual allowance). Second, it does not model VAT or the personal-allowance taper above £100,000. Treat the result as a realistic estimate of cash retention on an outside-IR35 engagement, then have the salary, dividend and pension split tailored to your actual position.",
    ],
  },
  faqs: [
    {
      question: "What does outside IR35 actually mean for my take-home?",
      answer:
        "Outside IR35 means the engagement is genuinely a business-to-business contract, not disguised employment, so you can be paid gross by your company and extract profit through a tax-efficient mix of salary and dividends. That is why an outside-IR35 contractor typically keeps noticeably more than an equivalent inside-IR35 or umbrella worker on the same rate: dividends carry no National Insurance and the company pays corporation tax rather than full PAYE. The status must be genuine and supported by your working practices, not just a label on the contract.",
    },
    {
      question: "Why is £12,570 or £6,708 the usual director salary for 2026/27?",
      answer:
        "For a single-director company that cannot claim the Employment Allowance, a salary between the £5,000 secondary threshold and the £6,708 lower earnings limit keeps employer NIC low while a salary at the £6,708 LEL still secures a qualifying year for the state pension. Taking £12,570 (the personal allowance and primary threshold) costs a little employer NIC on the slice above £5,000 but saves corporation tax on the extra salary, so for 2026/27 it can still come out marginally ahead. There is no single universal optimum, which is why this tool lets you compare both.",
    },
    {
      question: "How is corporation tax worked out in this calculator?",
      answer:
        "Corporation tax for the 2026/27 financial year is 19% on profits up to £50,000 and 25% on profits above £250,000, with marginal relief (standard fraction 3/200) producing an effective rate of roughly 26.5% on profits between those limits. The £50,000 and £250,000 limits are divided by the number of associated companies, so if you or a connected person controls more than one company the bands shrink. This calculator assumes a single company with no associates.",
    },
    {
      question: "Does this include a pension contribution or VAT?",
      answer:
        "No. The take-home figure assumes all post-tax profit is drawn as dividends, with no employer pension contribution and no VAT modelling. An employer pension contribution is usually the most tax-efficient extraction route for 2026/27 because it is deductible against corporation tax, carries no NIC and is not taxed on you as income, within the £60,000 annual allowance (plus any carry-forward). Adding one would reduce the dividends shown but increase your overall after-tax wealth, so the most tax-efficient plan is not the same as the highest cash take-home.",
    },
    {
      question: "Are these the correct 2026/27 tax figures?",
      answer:
        "Yes. The calculator uses the locked 2026/27 rates: personal allowance £12,570, basic-rate income tax 20% to £50,270, dividend allowance £500, dividend rates 10.75% / 35.75% / 39.35%, employer NIC 15% above the £5,000 secondary threshold, employee NIC 8% then 2%, and corporation tax 19% / 25% with 3/200 marginal relief. These reflect the position for the year 6 April 2026 to 5 April 2027 following Finance Act 2026, which raised the dividend ordinary and upper rates from 6 April 2026.",
    },
  ],
};
