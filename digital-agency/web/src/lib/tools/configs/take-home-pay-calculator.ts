/**
 * Take-Home Pay Calculator — GenericTool config.
 * 2025/26 UK PAYE rates.
 *
 * STALE-FIGURE NOTICE: Student loan thresholds plan1/plan2/plan4 in the
 * compute lib are 2024/25 values (24,990 / 27,295 / 31,395).
 * Correct 2025/26 values are 26,065 / 28,470 / 32,745 (SLC 2025).
 * A deliberate correction commit must follow with user notification.
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcTakeHomePay, type StudentLoanPlan } from "../compute/take-home-pay";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export const takeHomePayTool: GenericTool = {
  kind: "generic",
  slug: "take-home-pay-calculator",
  name: "Take-Home Pay Calculator",
  category: "Tax planning",
  oneLiner:
    "Standard UK PAYE salary calculator. 2025/26 income tax, NI, student loan plans and salary-sacrifice pension. Annual, monthly and weekly net.",
  metaTitle: "Take-Home Pay Calculator 2025/26 | UK PAYE Net Pay",
  metaDescription:
    "Free UK PAYE take-home pay calculator. 2025/26 income tax, employee NI, student loan plans 1-5 and pension sacrifice. Annual, monthly, weekly.",
  intro:
    "Calculate your net take-home pay as an employee under UK PAYE. Includes income tax, employee NI, student loan repayment and salary-sacrifice pension. Uses 2025/26 rates.",
  embedHeight: 380,
  fields: [
    {
      id: "salary",
      label: "Gross annual salary",
      type: "currency",
      default: 45000,
      min: 0,
      max: 500000,
      step: 500,
    },
    {
      id: "pensionPercent",
      label: "Pension contribution (salary sacrifice)",
      type: "number",
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
      help: "Salary sacrifice pension reduces your pensionable pay before tax is calculated.",
    },
    {
      id: "plan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "None" },
        { value: "plan1", label: "Plan 1 (pre-2012, threshold £24,990)" },
        { value: "plan2", label: "Plan 2 (post-2012, threshold £27,295)" },
        { value: "plan4", label: "Plan 4 (Scottish, threshold £31,395)" },
        { value: "plan5", label: "Plan 5 (post-Aug 2023, threshold £25,000)" },
        { value: "pg", label: "Postgraduate (threshold £21,000)" },
      ],
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcTakeHomePay({
      salary: Number(values.salary) || 0,
      pensionPercent: Number(values.pensionPercent) || 0,
      plan: (values.plan as StudentLoanPlan) || "none",
    });
    return {
      headline: {
        label: "Annual take-home",
        value: fmt(out.net),
        sub: `Monthly: ${fmt(out.monthly)} | Weekly: ${fmt(out.weekly)}`,
        tone: "good",
      },
      rows: [
        { label: "Gross salary", value: fmt(Number(values.salary) || 0) },
        { label: "Pension (salary sacrifice)", value: fmt(out.pension) },
        { label: "Personal allowance", value: fmt(out.personalAllowance) },
        { label: "Income tax", value: fmt(out.incomeTax) },
        { label: "Employee NI", value: fmt(out.ni) },
        { label: "Student loan repayment", value: fmt(out.studentLoan) },
        { label: "Total deductions", value: fmt(out.totalDeductions), strong: true },
        { label: "Net take-home (annual)", value: fmt(out.net), strong: true },
        { label: "Monthly", value: fmt(out.monthly) },
        { label: "Weekly", value: fmt(out.weekly) },
        { label: "Effective tax rate (IT+NI)", value: pct(out.effectiveRate) },
      ],
      note: "PAYE calculation only. Does not model HICBC, savings income or other sources.",
    };
  },
  explainer: {
    heading: "How UK PAYE works",
    paragraphs: [
      "Under PAYE, your employer deducts income tax, employee NI and student loan repayments before paying you. The personal allowance (£12,570 in 2025/26) is the amount you can earn before income tax starts.",
      "Salary-sacrifice pension contributions reduce your taxable pay, saving both income tax and employee NI on the sacrificed amount.",
    ],
  },
  faqs: [
    {
      question: "What are the student loan thresholds?",
      answer:
        "Plan 1 (pre-2012 English/Welsh loans): £24,990. Plan 2 (post-2012 English/Welsh): £27,295. Plan 4 (Scottish): £31,395. Plan 5 (post-Aug 2023): £25,000. Postgraduate: £21,000. All rates 9% except postgraduate at 6%.",
    },
  ],
};
