import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcConsultantPrivateVsNhs } from "@/lib/tools/compute/consultant-private-vs-nhs";
import { NHS_DEEMED_EMPLOYER_RATE } from "@/lib/tools/compute/nhs-super-tiers";

export const consultantPrivateVsNhsTool: GenericTool = {
  kind: "generic",
  slug: "consultant-private-vs-nhs",
  name: "Consultant Private vs NHS Session Calculator",
  category: "Income Tax",
  oneLiner:
    "Model the true net value of one extra private session once income tax, Class 4 NI, and the NHS Pension annual allowance taper are all counted. Built for hospital consultants near the £200k threshold.",
  embedHeight: 640,
  metaTitle: "Consultant Private vs NHS Session Calculator 2026/27 | Marginal Rate Modeller",
  metaDescription:
    "Free calculator for hospital consultants: see the net value of one extra private session after income tax, Class 4 NI, and the NHS Pension annual allowance taper. 2026/27 figures. Includes the AA taper cliff at £260k adjusted income.",

  intro:
    "Hospital consultants with a substantial NHS salary and growing private practice income can face effective marginal rates well above 60% on a single extra private session. This calculator shows exactly what you keep after income tax, Class 4 National Insurance, and the NHS Pension annual allowance taper interaction are deducted. Enter your NHS pensionable pay, your existing private income, and the value of the session you are considering to see the true net.",

  fields: [
    {
      id: "nhsPensionablePay",
      label: "NHS pensionable pay (annual)",
      type: "currency",
      default: 150_000,
      min: 0,
      max: 400_000,
      step: 5_000,
      help: "Your NHS salary or sessional pay that counts as pensionable. This drives the deemed employer contribution used to test whether adjusted income crosses the £260,000 taper threshold.",
    },
    {
      id: "existingPrivateIncome",
      label: "Existing private income this year",
      type: "currency",
      default: 70_000,
      min: 0,
      max: 500_000,
      step: 5_000,
      help: "Private practice income already earned or committed for the tax year, before the extra session you are considering.",
    },
    {
      id: "extraSessionValue",
      label: "Extra session gross value",
      type: "currency",
      default: 15_000,
      min: 0,
      max: 100_000,
      step: 1_000,
      help: "The gross fee from the single additional private session. The calculator shows how much of this you actually keep.",
    },
    {
      id: "otherIncome",
      label: "Other taxable income (rental, savings, etc.)",
      type: "currency",
      default: 0,
      min: 0,
      max: 200_000,
      step: 1_000,
      advanced: true,
      help: "Any other taxable income that counts toward the threshold income test. Leave at zero if none.",
    },
  ],

  compute(values) {
    const nhsPensionablePay = Math.max(0, Number(values.nhsPensionablePay) || 0);
    const existingPrivateIncome = Math.max(0, Number(values.existingPrivateIncome) || 0);
    const extraSessionValue = Math.max(0, Number(values.extraSessionValue) || 0);
    const otherIncome = Math.max(0, Number(values.otherIncome) || 0);

    const r = calcConsultantPrivateVsNhs({
      nhsPensionablePay,
      existingPrivateIncome,
      extraSessionValue,
      otherIncome,
    });

    const effectiveRatePct = r.effectiveMarginalRate * 100;
    const tone =
      effectiveRatePct >= 60 ? ("warn" as const) : ("default" as const);

    const taperNote = r.aaTapered
      ? `The extra session pushes adjusted income to ${gbp(r.adjustedIncomeWith)}, triggering the AA taper. Your annual allowance falls from ${gbp(r.aaBase)} to ${gbp(r.aaWith)} (a ${gbp(r.aaReduction)} reduction), adding an AA charge impact of ${gbp(r.aaChargeImpact)}.`
      : r.adjustedIncomeBase > 260_000
      ? `Your adjusted income is already ${gbp(r.adjustedIncomeBase)} before this session and your AA is already tapered to ${gbp(r.aaBase)}. The extra session reduces it further to ${gbp(r.aaWith)}.`
      : `The extra session does not trigger the AA taper here (adjusted income stays at or below £260,000). The effective marginal rate reflects income tax and NI only.`;

    const verdictNote =
      effectiveRatePct >= 60
        ? `At an effective marginal rate of ${pct(effectiveRatePct)}, the extra session keeps only ${gbp(r.netFromSession)} of every ${gbp(extraSessionValue)} earned. Check whether carry-forward of unused annual allowance from the previous three tax years can remove the AA charge before declining the session.`
        : effectiveRatePct >= 50
        ? `At an effective marginal rate of ${pct(effectiveRatePct)}, the session is taxed heavily. Carry-forward of unused annual allowance may reduce or eliminate the AA charge impact.`
        : `At an effective marginal rate of ${pct(effectiveRatePct)}, the session is taxed at the standard high-income rate without the AA taper adding to the cost.`;

    const rows = [
      { label: "Gross extra session value", value: gbp(extraSessionValue) },
      { label: "Income tax on the session", value: `-${gbp(r.incomeTaxOnSession)}` },
      { label: "Class 4 NI on the session", value: `-${gbp(r.niOnSession)}` },
      {
        label: "AA charge impact (taper)",
        value: r.aaReduction > 0 ? `-${gbp(r.aaChargeImpact)}` : "£0 (no taper triggered)",
        strong: r.aaTapered as true | undefined,
      },
      { label: "Total deductions", value: `-${gbp(r.totalCost)}`, strong: true as const },
      { label: "Net income from extra session", value: gbp(r.netFromSession), strong: true as const },
      { label: "Effective marginal rate", value: pct(effectiveRatePct), strong: true as const },
      {
        label: "AA position (without extra session)",
        value: `Threshold ${gbp(r.thresholdBase)}, adjusted ${gbp(r.adjustedIncomeBase)}, AA ${gbp(r.aaBase)}`,
      },
      {
        label: "AA position (with extra session)",
        value: `Threshold ${gbp(r.thresholdWith)}, adjusted ${gbp(r.adjustedIncomeWith)}, AA ${gbp(r.aaWith)}`,
      },
      {
        label: "Deemed employer NHS contribution",
        value: `${gbp(r.deemedEmployer)} (${(NHS_DEEMED_EMPLOYER_RATE * 100).toFixed(1)}% of NHS pensionable pay)`,
      },
    ];

    const note =
      taperNote +
      " 2026/27 basis. Threshold income is the sum of NHS pay, private income, and other income (own pension contributions reduce threshold income but are not captured here, so the estimate may be conservative). The AA charge impact is modelled as the AA reduction multiplied by the marginal income-tax rate; your actual charge depends on whether total pension input for the year would otherwise have stayed within the allowance. Carry-forward of unused allowance from the prior three tax years may eliminate the charge entirely. Class 4 NI is applied to private income only. These are estimates, not advice. " +
      verdictNote;

    return {
      headline: {
        label: `Net from the extra session (${gbp(extraSessionValue)} gross)`,
        value: gbp(r.netFromSession),
        sub: `Effective marginal rate: ${pct(effectiveRatePct)}`,
        tone,
      },
      rows,
      note,
    };
  },

  explainer: {
    heading: "Why the marginal rate on a private session can exceed 60%",
    paragraphs: [
      "A hospital consultant with a significant NHS salary and growing private practice income faces three separate deductions on each extra private session: income tax at the marginal rate (40% or 45% once total income is above £50,270 or £125,140 respectively), Class 4 National Insurance on the self-employed private income (6% up to £50,270, 2% above, for 2026/27), and potentially an NHS Pension annual allowance charge if the extra income pushes adjusted income above the taper threshold.",
      "The annual allowance taper is the subtlest and most damaging interaction. The NHS Pension standard annual allowance is £60,000. It tapers downward where BOTH of the following apply: threshold income (broadly all your taxable income) exceeds £200,000, AND adjusted income (threshold income plus the deemed employer NHS pension contribution, currently 23.7% of your NHS pensionable pay) exceeds £260,000. For every £2 of adjusted income above £260,000, the allowance shrinks by £1, down to a minimum of £10,000. A consultant on £150,000 NHS pay and £70,000 existing private income has an adjusted income of roughly £255,550 before any extra session. A single extra session worth £15,000 can push adjusted income to £270,550, triggering the taper and reducing the annual allowance from £60,000 to around £54,725. If total pension input for the year exceeds the tapered allowance, the reduction in allowance is charged to income tax at the marginal rate. At these income levels that rate is 45%, so the £5,275 AA reduction costs around £2,374 in additional tax. The session that looked like £15,000 gross nets only around £5,576.",
      "The personal allowance taper adds a further complication between £100,000 and £125,140 of total income. In that band the personal allowance reduces by £1 for every £2 of additional income, creating an effective income-tax rate close to 60% on income in that range. This calculator models that interaction correctly by computing the personal allowance and income-tax bands dynamically rather than using a fixed higher-rate band width. Above £125,140 the effective income-tax rate drops back to 45%, but the AA taper and Class 4 NI can still push the combined effective marginal rate materially higher. The example above illustrates a combined effective rate approaching 63%.",
      "Worked example: consultant with NHS pensionable pay £150,000 and existing private income £70,000 considers a single extra session worth £15,000. Threshold income (with extra session): £150,000 plus £70,000 plus £15,000 equals £235,000. Deemed employer contribution: £150,000 multiplied by 23.7% equals £35,550. Adjusted income: £235,000 plus £35,550 equals £270,550, which exceeds £260,000, so the taper fires. Annual allowance falls from £60,000 to £60,000 minus (£270,550 minus £260,000) divided by 2 equals £54,725. Without the extra session, adjusted income is £255,550, below the £260,000 threshold, so no taper applies. AA reduction caused by the extra session: £5,275. Income tax on the extra £15,000 (all in the 45% additional-rate band at this income level): £6,750. Class 4 NI on the extra £15,000 (all above the £50,270 upper profits limit): £300. AA charge impact: £5,275 multiplied by 45% equals £2,374. Total cost: £9,424. Net retained: £5,576. Effective marginal rate: 62.8%.",
      "Before declining a private session on marginal-rate grounds, verify two things with your accountant. First, whether carry-forward of unused annual allowance from the previous three tax years can eliminate or reduce the AA charge entirely. If you had a lower pension input in prior years, your effective annual allowance for this year may be much higher than £60,000, removing the taper sting. Second, whether your actual pension input amount for the year will actually breach the tapered allowance. The AA charge only crystallises when pension input (not contributions paid) exceeds the allowance. These two factors can change the net picture materially, and they require your personal carry-forward history to model properly.",
    ],
  },

  faqs: [
    {
      question: "What is the NHS Pension annual allowance taper and why does it matter here?",
      answer:
        "The standard annual allowance for pension contributions is £60,000. For high earners it is reduced (tapered) where two conditions are both met: your threshold income exceeds £200,000, and your adjusted income exceeds £260,000. Adjusted income is threshold income plus the deemed employer NHS contribution (23.7% of your NHS pensionable pay), not simply a fixed pension growth figure. For every £2 of adjusted income above £260,000, the allowance shrinks by £1 to a minimum of £10,000. If the taper tips your pension input above the reduced allowance, you owe an AA charge at your marginal income-tax rate. For a consultant on £235,000 adjusted income, a single extra private session can be the trigger that fires this charge.",
    },
    {
      question: "Why is the effective marginal rate sometimes above 60% or even 80%?",
      answer:
        "Three charges can hit simultaneously on a single private session: income tax (45% at this income level), Class 4 NI (2% on income above £50,270), and an AA charge if the session triggers or deepens the taper. The AA charge is itself charged at the marginal income-tax rate (45%), so each £2 of AA reduction costs £0.90 in charge. Depending on how far above the £260,000 adjusted income threshold you land, the three charges combined can push the effective marginal rate above 60% and in severe taper cases above 80%. The calculator shows the exact figure for your inputs.",
    },
    {
      question: "What is the deemed employer NHS contribution and why is it included?",
      answer:
        "The NHS Pension Scheme includes both an employee contribution (deducted from your pay) and a deemed employer contribution, currently 23.7% of your NHS pensionable pay. The deemed employer contribution is added to your threshold income to arrive at adjusted income for the annual allowance taper test. This is the correct calculation set out in legislation. Using threshold income plus pension growth (as some older calculators do) understates adjusted income and may give you false reassurance that the taper has not fired.",
    },
    {
      question: "Can carry-forward of unused annual allowance eliminate the charge?",
      answer:
        "Yes, and it is one of the most effective ways to manage the taper. If your pension input was below your annual allowance in any of the previous three tax years, you can carry forward the unused portion and add it to the current year's allowance. This can absorb the taper reduction entirely. Carry-forward is not captured in this calculator because it requires your personal pension input history for three prior years. A specialist medical accountant can model it. If you are regularly near the taper threshold, maintaining a carry-forward schedule is essential planning.",
    },
    {
      question: "Does Class 4 NI on private income interact with the Class 1 NI I pay on my NHS salary?",
      answer:
        "Your NHS salary is subject to Class 1 employee NI through PAYE (8% on income between £12,570 and £50,270, then 2% above). Private practice income is self-employed income and attracts Class 4 NI instead. The upper profits limit (£50,270) is shared across both income types, so if your NHS salary already exceeds £50,270, all your private income falls in the 2% upper band rather than the 6% main band. This calculator models Class 4 on private income only, which is conservative for consultants whose NHS salary has already exhausted the Class 1 main-rate band.",
    },
    {
      question: "What is not covered by this calculator?",
      answer:
        "This calculator does not cover: carry-forward of unused annual allowance from prior years (can materially reduce or eliminate the AA charge); Scheme Pays elections for settling an AA charge via the pension scheme rather than cash; the interaction with any personal pension contributions you make (these reduce threshold income and can push you below the taper thresholds); superannuation employee contributions as a deduction from take-home pay; or tax on investment or rental income held in a corporate structure. For a full picture of your position, use the NHS Pension Annual Allowance calculator alongside this tool and speak to a specialist medical accountant.",
    },
  ],

  related: [
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
    {
      label: "Private Practice Incorporation Calculator",
      href: "/calculators/private-practice-incorporation",
    },
    {
      label: "Salaried Doctor Take-Home Pay Calculator",
      href: "/calculators/salaried-doctor-take-home",
    },
  ],
};
