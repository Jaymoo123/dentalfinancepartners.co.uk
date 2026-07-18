import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcGpVsPartner,
  type StudentLoanPlan,
} from "@/lib/tools/compute/salaried-gp-vs-partner";

export const salariedGpVsPartnerTool: GenericTool = {
  kind: "generic",
  slug: "salaried-gp-vs-partner",
  name: "Salaried GP vs GP Partner Calculator",
  category: "Income Tax",
  oneLiner:
    "Compare a salaried GP salary against a partner profit share and see what each actually nets after income tax, National Insurance and NHS superannuation.",
  embedHeight: 640,
  metaTitle: "Salaried GP vs GP Partner Calculator 2026/27 | Net Pay Comparison",
  metaDescription:
    "Free salaried GP vs GP partner calculator for 2026/27. Compares PAYE and Class 1 NI against self-employed Class 4 NI, with NHS superannuation tiers and the personal allowance taper. See the real net gap, not the headline gap.",

  intro:
    "The classic GP career decision: take the salaried role, or take the partnership? The gross figures rarely tell the story. A partner profit share is taxed as self-employed income with Class 4 National Insurance, while a salaried GP pays Class 1 through PAYE, and a higher profit share can drag the personal allowance into the taper zone above £100,000. Enter both offers to see the real net position of each on the 2026/27 basis.",

  fields: [
    {
      id: "salariedPay",
      label: "Salaried GP gross salary",
      type: "currency",
      default: 90000,
      min: 20000,
      max: 300000,
      step: 1000,
      help: "The gross salary offered. Taxed under PAYE with Class 1 employee NI.",
    },
    {
      id: "partnerProfitShare",
      label: "GP partner annual profit share",
      type: "currency",
      default: 110000,
      min: 20000,
      max: 300000,
      step: 1000,
      help: "The partnership profit allocation (drawings basis). Taxed as self-employed trading income with Class 4 NI.",
    },
    {
      id: "studentLoanPlan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1 (started before September 2012)" },
        { value: "plan2", label: "Plan 2 (started September 2012 to 2023)" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
      ],
    },
  ],

  compute(values) {
    const salariedPay = Number(values.salariedPay);
    const partnerProfitShare = Number(values.partnerProfitShare);
    const studentLoanPlan = String(values.studentLoanPlan) as StudentLoanPlan;

    const r = calcGpVsPartner({ salariedPay, partnerProfitShare, studentLoanPlan });
    const { salaried: sal, partner: par, netGap, grossGap } = r;

    const rows = [
      { label: "Salaried: gross salary", value: gbp(sal.grossPay), strong: true as const },
      { label: "Salaried: personal allowance", value: gbp(sal.personalAllowance) },
      { label: "Salaried: income tax", value: `-${gbp(sal.incomeTax)}` },
      { label: "Salaried: Class 1 NI (employee)", value: `-${gbp(sal.ni)}` },
      {
        label: `Salaried: NHS super (${pct(sal.superTierRate * 100)} tier)`,
        value: `-${gbp(sal.nhsSuper)}`,
      },
      ...(sal.studentLoanRepayment > 0
        ? [{ label: "Salaried: student loan", value: `-${gbp(sal.studentLoanRepayment)}` }]
        : []),
      { label: "Salaried: net pay", value: gbp(sal.netPay), strong: true as const },

      { label: "Partner: profit share", value: gbp(par.grossPay), strong: true as const },
      { label: "Partner: personal allowance", value: gbp(par.personalAllowance) },
      { label: "Partner: income tax", value: `-${gbp(par.incomeTax)}` },
      { label: "Partner: Class 4 NI (self-employed)", value: `-${gbp(par.ni)}` },
      {
        label: `Partner: NHS super (${pct(par.superTierRate * 100)} tier)`,
        value: `-${gbp(par.nhsSuper)}`,
      },
      ...(par.studentLoanRepayment > 0
        ? [{ label: "Partner: student loan", value: `-${gbp(par.studentLoanRepayment)}` }]
        : []),
      { label: "Partner: net pay", value: gbp(par.netPay), strong: true as const },

      { label: "Gross gap", value: gbp(Math.abs(grossGap)) },
      { label: "Net gap", value: gbp(Math.abs(netGap)), strong: true as const },
    ];

    const headline =
      netGap > 0
        ? {
            label: "Partner role nets more per year",
            value: gbp(netGap),
            sub: `from a gross difference of ${gbp(Math.abs(grossGap))} · partner net ${gbp(par.netPay)} vs salaried net ${gbp(sal.netPay)}`,
            tone: "good" as const,
          }
        : netGap < 0
          ? {
              label: "Salaried role nets more per year",
              value: gbp(Math.abs(netGap)),
              sub: `despite the gross gap of ${gbp(Math.abs(grossGap))} · salaried net ${gbp(sal.netPay)} vs partner net ${gbp(par.netPay)}`,
              tone: "warn" as const,
            }
          : {
              label: "Both roles net the same after deductions",
              value: "£0",
              sub: "the gross gap is fully absorbed by tax, NI and superannuation",
              tone: "default" as const,
            };

    const paNote =
      par.personalAllowance < 12570 || sal.personalAllowance < 12570
        ? " The personal allowance is tapered where income exceeds £100,000, which widens the higher-rate band and steepens the effective rate."
        : "";

    return {
      headline,
      rows,
      note:
        "2026/27 basis. Salaried: PAYE income tax plus Class 1 employee NI (8% between £12,570 and £50,270, 2% above). Partner: income tax on the profit share plus Class 4 NI (6% between £12,570 and £50,270, 2% above). NHS superannuation at the NHSBSA employee tier rate on each figure. Partner super is set aside from drawings but it is still a deduction from net position. The employer NIC saving the practice makes on a partner does not flow to the individual and is not modelled." +
        paNote +
        " These are estimates, not advice.",
    };
  },

  explainer: {
    heading: "How this comparison works",
    paragraphs: [
      "The gap between a salaried GP salary and a GP partner profit share looks large on paper. What lands in your account is a different number, because income tax, National Insurance and NHS superannuation each behave differently for the two employment types. This calculator runs both sets of numbers side by side on the 2026/27 tax year.",

      "For the salaried GP, income tax is deducted at source under PAYE. National Insurance is Class 1 employee contributions at 8% between £12,570 and £50,270 and 2% above. NHS superannuation is the employee tier contribution on the full salary, collected by the employer from gross pay. The tier rate is banded: a GP on £90,000 falls in the top 12.5% band, meaning £11,250 leaves before take-home is reached.",

      "For the GP partner, the profit share is taxed as self-employed trading income through self-assessment. Class 4 National Insurance applies at 6% between £12,570 and £50,270 and 2% above, a lower main rate than Class 1 but the same 2% ceiling. NHS superannuation is the employee tier contribution on the superannuable profit, which the partner sets aside from drawings and pays via the practice (or directly to NHSBSA depending on the arrangement). Critically, a higher profit share can push the personal allowance into the taper zone above £100,000: the allowance falls by £1 for every £2 of income above £100,000, which both raises the tax bill and widens the higher-rate band, narrowing the net advantage.",

      "Both columns use the same 2026/27 band arithmetic: personal allowance £12,570 (tapered above £100,000, zero at £125,140), basic-rate band fixed at £37,700 taxed at 20%, a higher-rate band whose width is (£125,140 minus the personal allowance) minus £37,700 taxed at 40%, and 45% above £125,140. The taper creates an effective marginal rate of around 60% on income between £100,000 and £125,140, which is exactly where many partner profit shares sit.",

      // Worked example (roster spec §4 Tool 7)
      "Worked example: salaried £90,000 vs partner £110,000, no student loan. Salaried column: personal allowance £12,570 (full, salary under £100,000). Income tax: £37,700 at 20% = £7,540, plus £39,730 at 40% = £15,892, total £23,432. Class 1 NI: 8% on £37,700 = £3,016, plus 2% on £39,730 = £795, total £3,811. NHS super at the 12.5% tier = £11,250. Total deductions £38,493; net pay £51,507. Partner column: the £110,000 profit share tapers the personal allowance to £7,570 (£12,570 minus £5,000, being half of the £10,000 above £100,000). Income tax: £37,700 at 20% = £7,540, plus £64,730 at 40% = £25,892, total £33,432. Class 4 NI: 6% on £37,700 = £2,262, plus 2% on £59,730 = £1,195, total £3,457. NHS super at the 12.5% tier = £13,750. Total deductions £50,639; net pay £59,361. The £20,000 headline gap shrinks to a net gap of £7,854.",

      "The non-financial factors matter as much as the numbers. As a partner you bear a share of practice risk, indemnity costs are higher and typically not reimbursed, drawings can fluctuate with the practice's cashflow, and there is no guaranteed holiday or sick pay. Partnership brings clinical and operational autonomy and the ability to influence the direction of the practice. Neither option is inherently better; the right choice depends on your career stage, risk appetite and financial circumstances. A specialist medical accountant can model the full picture including NHS pension accrual, which can differ between partnership and salaried roles.",
    ],
  },

  faqs: [
    {
      question: "Why is the net gap so much smaller than the gross gap?",
      answer:
        "Three effects compress the gap. First, extra income above £100,000 tapers the personal allowance by £1 for every £2, creating an effective marginal rate of roughly 60% between £100,000 and £125,140, which is where many partner profit shares sit. Second, NHS superannuation is a percentage of the whole figure, so a higher profit share means a proportionately larger super deduction (12.5% at the top tier). Third, most of the extra income falls in the 40% band. In the worked example, a £20,000 gross advantage becomes roughly £7,854 net.",
    },
    {
      question: "What is the difference between Class 1 and Class 4 National Insurance?",
      answer:
        "A salaried GP is an employee and pays Class 1 employee NI through PAYE: 8% on earnings between £12,570 and £50,270 and 2% above. A GP partner is self-employed and pays Class 4 NI through self-assessment: 6% on profits between £12,570 and £50,270 and 2% above. Class 4 has a lower main rate, but at partner-level incomes most of the figure sits in the 2% band for both, so the NI difference is modest, around £750 a year at most from the main-rate band alone.",
    },
    {
      question: "How does NHS superannuation work for a partner compared to a salaried GP?",
      answer:
        "A salaried GP's employee contribution is deducted from gross pay by the employer at the NHSBSA tier rate for their pensionable pay. A GP partner contributes on superannuable practice profit, usually set aside from drawings and paid via the practice or directly to NHSBSA. This calculator applies the employee tier rate to each gross figure. For 2026/27 the tiers run from 5.2% at the lowest band to 12.5% on pensionable pay of £67,669 and above, so both figures in the worked example sit in the top tier.",
    },
    {
      question: "Does this calculator include the tax on partnership drawings?",
      answer:
        "Drawings themselves are not taxed; the partner is taxed on their share of practice profit whether or not it is drawn. This calculator taxes the full profit share, which is the correct basis. In practice a partner's monthly drawings are an estimate against expected profit, with a balancing adjustment once accounts are finalised, so month-to-month cash can differ from the annual net figure shown here. Payments on account to HMRC (31 January and 31 July) also change the cashflow timing compared to PAYE.",
    },
    {
      question: "What costs does a GP partner face that a salaried GP does not?",
      answer:
        "Partners typically fund their own medical indemnity (often higher than the salaried equivalent and not always reimbursed), may need to buy into the practice (capital or property), share liability for practice expenses and staff costs, and have no statutory holiday, sick or maternity pay. Drawings can fall if practice income drops. None of these appear in the tax arithmetic, so the true financial comparison is tighter than even the net-pay gap suggests. Weigh them alongside the autonomy and long-term equity that partnership brings.",
    },
    {
      question: "What is not included in this calculator?",
      answer:
        "It does not model: Class 2 NI (small flat charge for the self-employed, usually collected via self-assessment); the practice's employer NIC or employer superannuation costs (these affect the practice, not the individual's net pay); NHS pension accrual value or the Annual Allowance charge (use the NHS Pension Annual Allowance Calculator); seniority or other add-ons; partnership buy-in costs; or tax code adjustments. It assumes the whole profit share is superannuable, which may differ from your certificate of pensionable profit.",
    },
  ],

  related: [
    {
      label: "GP Partner Drawings Planner",
      href: "/calculators/gp-partner-drawings-planner",
    },
    {
      label: "Salaried Doctor Take-Home Pay Calculator",
      href: "/calculators/salaried-doctor-take-home",
    },
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
  ],
};
