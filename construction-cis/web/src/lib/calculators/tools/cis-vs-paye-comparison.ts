import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";
import { PERSONAL_ALLOWANCE, BASIC_RATE_LIMIT, CLASS4_NI, CLASS1_NI, INCOME_TAX_RATES } from "../cis-tax";

export const cisVsPayeComparison: GenericTool = {
  kind: "generic",
  slug: "cis-vs-paye-comparison",
  name: "CIS vs PAYE Comparison Calculator",
  category: "CIS Basics",
  oneLiner:
    "See how your take-home pay compares as a CIS subcontractor versus a PAYE employee at the same gross earnings.",
  metaTitle: "CIS vs PAYE Calculator | Take-Home Comparison 2026/27",
  metaDescription:
    "Compare your take-home pay as a CIS subcontractor versus PAYE employment at the same gross earnings. See the tax, NI and cash-flow difference side by side.",
  intro:
    "CIS subcontractors and PAYE construction workers face very different tax and NI calculations at the same gross income level. This calculator shows both paths side by side, including the expense advantage of self-employment and the cash-flow effect of CIS deductions.",
  ctaLabel: "Speak to a CIS specialist about your structure →",
  embedHeight: 700,
  fields: [
    {
      id: "grossEarnings",
      label: "Gross annual earnings",
      type: "currency",
      default: 45000,
      step: 1000,
      help: "For CIS: your total labour invoiced (gross CIS income). For PAYE: your annual salary. The comparison runs both calculations at this figure.",
    },
    {
      id: "cisExpenses",
      label: "Annual business expenses (CIS path only)",
      type: "currency",
      default: 5000,
      step: 500,
      help: "Mileage at 55p per mile (first 10,000 miles from April 2026), tools, PPE, van running costs and other allowable expenses. These reduce your CIS taxable profit but are not available under PAYE.",
    },
    {
      id: "cisRate",
      label: "Your CIS deduction rate",
      type: "select",
      default: "20",
      options: [
        { value: "0", label: "0% (Gross Payment Status)" },
        { value: "20", label: "20% (registered subcontractor)" },
        { value: "30", label: "30% (unregistered subcontractor)" },
      ],
    },
  ],
  compute: (v) => {
    const gross = Number(v.grossEarnings);
    const expenses = Number(v.cisExpenses);
    const cisRate = Number(v.cisRate) / 100;
    // --- CIS PATH (HP §11a) ---
    const cisProfit = Math.max(0, gross - expenses);
    const cisTaxable = Math.max(0, cisProfit - PERSONAL_ALLOWANCE);
    const cisIncomeTax =
      Math.min(cisTaxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic +
      Math.max(0, cisTaxable - BASIC_RATE_LIMIT) * INCOME_TAX_RATES.higher;
    // Class 4 NI (HP §11a)
    const class4Lower =
      Math.min(Math.max(0, cisProfit - CLASS4_NI.lowerLimit), CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit) * CLASS4_NI.main;
    const class4Upper = Math.max(0, cisProfit - CLASS4_NI.upperLimit) * CLASS4_NI.upper;
    const cisNi = class4Lower + class4Upper;
    const cisTotalTax = cisIncomeTax + cisNi;
    const cisTakeHome = gross - expenses - cisTotalTax;
    // CIS advance deducted at source (cash flow impact - they receive this minus deduction, get refund later)
    const cisAdvanceDeducted = gross * cisRate;

    // --- PAYE PATH (HP §11a) ---
    const payeTaxable = Math.max(0, gross - PERSONAL_ALLOWANCE);
    const payeIncomeTax =
      Math.min(payeTaxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic +
      Math.max(0, payeTaxable - BASIC_RATE_LIMIT) * INCOME_TAX_RATES.higher;
    // Employee Class 1 NI: 8% on £12,570-£50,270, 2% above (HP §11a)
    const payeNiLower =
      Math.min(Math.max(0, gross - CLASS4_NI.lowerLimit), CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit) * CLASS1_NI.main;
    const payeNiUpper = Math.max(0, gross - CLASS4_NI.upperLimit) * CLASS1_NI.upper;
    const payeNi = payeNiLower + payeNiUpper;
    const payeTotalTax = payeIncomeTax + payeNi;
    const payeTakeHome = gross - payeTotalTax;

    const takeHomeDiff = cisTakeHome - payeTakeHome;

    return {
      headline: {
        label:
          takeHomeDiff >= 0
            ? "CIS take-home advantage"
            : "PAYE take-home advantage",
        value: gbp(Math.abs(takeHomeDiff)),
        sub: `CIS: ${gbp(cisTakeHome)} vs PAYE: ${gbp(payeTakeHome)} annual take-home`,
      },
      rows: [
        { label: "Gross earnings", value: gbp(gross) },
        { label: "", value: "" },
        { label: "CIS path — income tax", value: gbp(cisIncomeTax) },
        { label: "CIS path — Class 4 NI", value: gbp(cisNi) },
        {
          label: "CIS path — allowable expenses benefit",
          value: `−${gbp(expenses)} off taxable profit`,
        },
        {
          label: "CIS path — annual take-home",
          value: gbp(cisTakeHome),
          strong: true,
        },
        {
          label: `CIS advance deducted at source (${Number(v.cisRate)}%)`,
          value: gbp(cisAdvanceDeducted),
        },
        { label: "", value: "" },
        { label: "PAYE path — income tax", value: gbp(payeIncomeTax) },
        { label: "PAYE path — employee NI (Class 1)", value: gbp(payeNi) },
        {
          label: "PAYE path — annual take-home",
          value: gbp(payeTakeHome),
          strong: true,
        },
      ],
      note: "This comparison uses 2026/27 rates. CIS income tax is at 20%/40%; Class 4 NI at 6%/2% (£12,570–£50,270). PAYE income tax is identical; employee Class 1 NI is 8% up to £50,270 and 2% above. The CIS advance deducted at source is recovered through Self Assessment — annual take-home figures assume the refund is received. PAYE figures assume no employment benefits or pension contributions.",
    };
  },
  explainer: {
    heading: "CIS versus PAYE: what really changes",
    paragraphs: [
      "The core difference is that CIS subcontractors can deduct genuine business expenses from their gross income before calculating tax, whereas PAYE employees cannot claim equivalent deductions against their salary. Mileage (at 55p per mile for the first 10,000 miles from April 2026), tools, PPE, and van running costs all reduce the taxable profit of a self-employed CIS worker. This often results in a lower effective tax rate for a CIS subcontractor compared with a PAYE employee at the same gross earnings, particularly where business costs are material.",
      "The cash flow picture is more complicated. CIS deductions are taken at source by the contractor at either 20% or 30% of the gross labour payment. Those deductions frequently exceed the subcontractor's actual income tax and National Insurance liability for the year, creating an overpayment that sits with HMRC until a Self Assessment return is filed and processed. A PAYE employee, by contrast, has the correct tax collected through the tax code each pay period with no year-end settlement required. The annual take-home figures shown above assume the CIS subcontractor receives their Self Assessment refund in full.",
      "The non-financial factors matter too. PAYE employees have statutory employment rights including sick pay, holiday pay and redundancy entitlement. CIS subcontractors working as sole traders have none of these protections. Misclassifying a genuine employee as a CIS subcontractor to avoid employer National Insurance and employment rights obligations is the most common target for HMRC compliance investigations in the construction sector. If the working relationship fails the control, personal service and mutuality of obligation tests, both the contractor and the worker face reclassification and backdated liabilities.",
    ],
  },
  faqs: [
    {
      question: "When does PAYE result in higher take-home than CIS?",
      answer:
        "When the subcontractor has very low expenses to deduct. If a CIS worker has minimal business costs the expense advantage disappears. At zero expenses and a 20% CIS rate, the PAYE and CIS income tax bills are identical, but PAYE employee NI (8%) is higher than Class 4 NI (6%), so the CIS path still wins marginally even with no expenses at all. The CIS path only falls behind PAYE when the self-employed NI saving is outweighed by additional costs not captured in the calculator, such as accountancy fees and insurance.",
    },
    {
      question:
        "Does my contractor get employment rights if they treat me as CIS?",
      answer:
        "No. But if HMRC determines that the working relationship is genuinely employment (using the control, personal service and mutuality of obligation tests), both parties may face reclassification. The contractor would be liable for unpaid employer NIC, penalties and interest. The worker may acquire employment rights retrospectively. Contractors have a positive obligation to assess employment status correctly before placing a worker under CIS.",
    },
    {
      question: "Can I switch from PAYE to CIS?",
      answer:
        "If the working arrangement genuinely meets the conditions for self-employment, you can register for CIS with HMRC and work as a subcontractor. The key conditions are that you control how the work is carried out, you have the right to send a substitute to do the work in your place, and there is no ongoing obligation on either side to provide or accept further work. This is a substantive legal question, not just a paperwork change. Getting it wrong exposes you and the contractor to a status enquiry.",
    },
    {
      question: "What is the false self-employment risk?",
      answer:
        "If HMRC determines that a CIS subcontractor is genuinely an employee, the contractor faces an employment status enquiry, unpaid employer NIC, penalties and interest. The contractor's Gross Payment Status may also be reviewed. Under rules strengthened from April 2026, the 'knew or should have known' standard increases the exposure for contractors who fail to carry out proper status assessments before placing workers under CIS.",
    },
    {
      question: "Are there other costs to consider for CIS self-employment?",
      answer:
        "Yes. As a CIS sole trader you are responsible for your own accountancy fees, public liability insurance and tools. You have no entitlement to holiday pay, statutory sick pay or an employer pension contribution. These costs and absences should be weighed against the take-home advantage shown above. A subcontractor who is off sick for several weeks with no income will feel the absence of sick pay more sharply than the annual tax saving from the CIS path.",
    },
  ],
};
