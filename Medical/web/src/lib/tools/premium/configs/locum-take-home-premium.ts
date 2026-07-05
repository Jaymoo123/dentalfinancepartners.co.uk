/**
 * Tool 2: Doctor take-home pay planner (locum and salaried/self-employed).
 *
 * toolId: locum-take-home-premium
 * topics: locum (primary), gp-tax (same tool, gp-tax framing via resources.ts)
 *
 * Direct reuse of calcLocumTax. Estimates take-home after income tax, Class 4
 * National Insurance and student loan on the 2025/26 basis.
 *
 * The gp-tax framing: a salaried GP is taxed under PAYE with Class 1 NIC, so
 * this planner models self-employed and locum income, or private-session income
 * a doctor holds alongside any salaried post. The explainer makes this explicit
 * (HP §1, §1.A). The tool must NOT imply a salaried GP files Class 4 on salary.
 *
 * FIGURES TRACED:
 * - calcLocumTax: 2025/26 bands (PA £12,570; basic rate limit £50,270; higher
 *   rate limit £125,140). Class 4 NIC: 6% between £12,570 and £50,270, 2%
 *   above. Class 2 is no longer a required payment from 6 April 2024 (HP §8).
 * - Student loan thresholds 2025/26: Plan 1 £26,065; Plan 2 £28,470; Plan 4
 *   (Scotland) £32,745. Rate 9% in all cases.
 *
 * NO chart: single take-home output, not a comparison.
 */
import type { PremiumToolConfig, PremiumResult, CalcResultRow } from "../types";
import { calcLocumTax, type StudentLoanPlan } from "@/lib/tools/compute/locum-tax";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const locumTakeHomePremiumConfig: PremiumToolConfig = {
  id: "locum-take-home-premium",
  topic: "locum",
  title: "Doctor take-home pay planner",
  intro:
    "Estimate your take-home pay as a locum or self-employed doctor after income tax, Class 4 National Insurance and any student loan, on the 2025/26 basis.",
  fields: [
    {
      id: "grossIncome",
      label: "Gross fees / income for the year",
      type: "currency",
      default: 80000,
      min: 0,
      max: 400000,
      step: 1000,
    },
    {
      id: "expenses",
      label: "Allowable business expenses",
      type: "currency",
      default: 5000,
      min: 0,
      max: 100000,
      step: 500,
      help: "Indemnity, GMC fee, professional subscriptions, equipment, mileage and so on (HP §8).",
    },
    {
      id: "pensionContributions",
      label: "Personal pension contributions",
      type: "currency",
      default: 10000,
      min: 0,
      max: 60000,
      step: 1000,
      advanced: true,
      help: "Deducted before tax in this model.",
    },
    {
      id: "studentLoanPlan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1" },
        { value: "plan2", label: "Plan 2" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
      ],
    },
  ],
  compute({ values }): PremiumResult {
    const grossIncome = Number(values.grossIncome) || 0;
    const expenses = Number(values.expenses) || 0;
    const pensionContributions = Number(values.pensionContributions) || 0;
    const studentLoanPlan = (String(values.studentLoanPlan) || "none") as StudentLoanPlan;

    const result = calcLocumTax({
      grossIncome,
      expenses,
      pensionContributions,
      studentLoanPlan,
    });

    const breakdownRows: CalcResultRow[] = [
      {
        label: "Net income after expenses and pension",
        value: gbp(result.netIncome),
      },
      {
        label: "Income tax",
        value: gbp(result.incomeTax),
      },
      {
        label: "Class 4 National Insurance",
        value: gbp(result.nationalInsurance),
      },
    ];

    if (result.studentLoanRepayment > 0) {
      breakdownRows.push({
        label: "Student loan",
        value: gbp(result.studentLoanRepayment),
      });
    }

    breakdownRows.push(
      {
        label: "Total deductions",
        value: gbp(result.totalDeductions),
        strong: true,
      },
      {
        label: "Take-home",
        value: gbp(result.netTakeHome),
        strong: true,
      },
    );

    return {
      headline: {
        label: "Estimated take-home",
        value: gbp(result.netTakeHome),
        sub: `effective deduction rate ${result.effectiveTaxRate.toFixed(1)}%`,
        tone: "good",
      },
      breakdown: breakdownRows,
      note:
        "2025/26 basis. Class 4 NIC is 6% between £12,570 and £50,270 then 2% (HP §8). Class 2 is no longer a required payment from 6 April 2024 (HP §8). Student loan thresholds are the 2025/26 values. Excludes payments on account timing. A salaried GP is taxed under PAYE with Class 1 NIC, so this planner fits self-employed and locum income (HP §1). These are estimates, not advice.",
    };
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "Your take-home as a self-employed or locum doctor starts with your gross fees or income for the year. Deductible business expenses (indemnity cover, GMC registration, professional subscriptions, equipment and mileage) reduce the figure to net income. If you contribute to a personal pension, that reduces the taxable amount further. The resulting net income is then subject to income tax at 20%, 40% or 45% on the progressive bands, plus Class 4 National Insurance at 6% between £12,570 and £50,270, and 2% above (HP §8). Class 2 NIC of £3.45 a week was abolished as a compulsory payment from 6 April 2024 and is not included in this model.",
      "If you have a student loan, the repayment is calculated on the net income above your plan threshold: Plan 1 (£26,065), Plan 2 (£28,470) or Plan 4 for Scottish borrowers (£32,745), all at 9% on the excess. Student loan repayments are not a tax deduction; they come out of your take-home after the tax and NIC calculation. The effective deduction rate shown in the headline is total deductions (tax plus NIC plus any loan repayment) divided by net income.",
      "This planner models self-employed and locum income. A salaried GP working under a GMS or PMS contract is employed, so their salary is taxed under PAYE with Class 1 NIC (employer and employee), not Class 4. Many doctors hold both: a salaried NHS post plus private sessions, locum work or out-of-hours shifts. In that case, use this tool for the self-employed portion only, and note that your PAYE income uses the personal allowance and basic-rate band first, which affects how much of your self-employed income falls at higher rates (HP §1, §1.A).",
    ],
  },
};
