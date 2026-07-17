import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcPrincipalExtraction } from "@/lib/tools/compute/principal-extraction";

export const principalExtractionTool: GenericTool = {
  kind: "generic",
  slug: "principal-extraction",
  name: "Principal Extraction Calculator",
  category: "Practice accounting",
  oneLiner: "Partnership vs limited company on principal profit. Pension contribution input and NHS Pension impact flag. 2026/27 rates.",
  embedHeight: 500,
  metaTitle: "Dental Principal Extraction Calculator UK 2026/27 | Partnership vs Ltd",
  metaDescription:
    "Compare partnership and limited company profit extraction for UK dental principals at 2026/27 rates. NHS Pension impact included.",
  intro:
    "Compare partnership (sole trader) versus limited company profit extraction as a dental principal. Enter your practice profit, any pension contribution, and whether you are an active NHS Pension Scheme member. The calculator highlights which structure comes out ahead on tax alone and flags the NHS Pension consideration.",
  fields: [
    {
      id: "profit",
      label: "Practice profit available for extraction (£)",
      type: "currency",
      default: 150000,
      min: 0,
      max: 2000000,
      step: 1000,
    },
    {
      id: "pensionContrib",
      label: "Pension contribution (£/yr)",
      type: "currency",
      default: 0,
      min: 0,
      max: 60000,
      step: 500,
      help: "For Ltd-co: this is an employer contribution. For partnership: personal contribution.",
    },
    {
      id: "nhsActive",
      label: "I am an active NHS Pension Scheme member",
      type: "toggle",
      default: true,
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const nhsActive = Boolean(values.nhsActive);
    const pensionContrib = Number(values.pensionContrib);
    const r = calcPrincipalExtraction(profit, nhsActive, pensionContrib);
    const partnershipWins = r.partnership.net > r.ltd.net;
    const diff = Math.abs(r.partnership.net - r.ltd.net);
    return {
      headline: {
        label: `On tax alone, ${partnershipWins ? "partnership" : "limited company"} is worth ${gbp(diff)} more`,
        value: partnershipWins ? gbp(r.partnership.net) : gbp(r.ltd.net),
        sub: r.pensionImpact,
        tone: "default" as const,
      },
      rows: [
        { label: "Partnership net (after tax and NI)", value: gbp(r.partnership.net), strong: partnershipWins },
        { label: "Partnership total tax", value: gbp(r.partnership.tax) },
        { label: "Limited company net (after all tax and admin)", value: gbp(r.ltd.net), strong: !partnershipWins },
        { label: "Limited company total tax and admin", value: gbp(r.ltd.tax) },
        { label: "Difference", value: gbp(diff), strong: true },
      ],
      note: "Indicative UK 2026/27 model. Partnership = sole trader for tax purposes for a single principal. Ltd-co assumes £12,570 director salary plus balance as dividend, £2,500 admin cost, no Employment Allowance. Does NOT cost the NHS Pension accrual loss from incorporation.",
    };
  },
  explainer: {
    heading: "How this works",
    paragraphs: [
      "The partnership model treats the principal as a sole trader: profit after any pension contribution is subject to income tax (standard 2026/27 bands) and Class 2/4 NI.",
      "The limited company model pays a £12,570 director salary (at the NI primary threshold), deducts employer NI, runs the remaining profit through corporation tax (19% small profits rate, 25% main rate, marginal relief between £50,000 and £250,000), then extracts the net-of-CT amount as dividends.",
      "Critical: this model does NOT value the NHS Pension accrual loss for incorporated principals. For an NHS-active principal with 10 or more years of service ahead, the lost pension accrual on the dividend portion can outweigh the headline tax saving. The actuarial pension position needs separate modelling.",
    ],
  },
  faqs: [
    {
      question: "Does incorporation always save tax for a dental principal?",
      answer: "At high profit levels the limited company route does save income tax. However, the saving must be weighed against the loss of NHS Pension accrual on the dividend income. For a principal 10 to 15 years from retirement, the accrual loss can be worth more than the tax saving, making partnership the better outcome overall.",
    },
    {
      question: "What is the Employment Allowance position for a dental practice?",
      answer: "The Employment Allowance (£10,500 from 2025/26) reduces the practice's employer NI bill. A sole-director company cannot claim it, but if the practice employs at least one other person (such as a nurse or receptionist) and the director is not the only employee, the practice may qualify. The claim is worth verifying with an accountant.",
    },
    {
      question: "What pension contributions are included in this model?",
      answer: "The calculator allows a pension contribution input. For partnerships this is treated as a personal pension contribution (deductible from taxable income). For the Ltd-co it is treated as an employer contribution (deductible before corporation tax). NHS Pension contributions for active members are not separately modelled; they affect the effective tax rate materially.",
    },
  ],
};
