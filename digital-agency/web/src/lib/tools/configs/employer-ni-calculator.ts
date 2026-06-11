/**
 * Employer NI & Cost-to-Hire Calculator — GenericTool config.
 * 2025/26 rates.
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcEmployerNi } from "../compute/employer-ni";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export const employerNiTool: GenericTool = {
  kind: "generic",
  slug: "employer-ni-calculator",
  name: "Employer NI & Cost-to-Hire",
  category: "Tax planning",
  oneLiner:
    "Total annual cost of your agency team. Employer NI at 13.8%, Employment Allowance and minimum auto-enrolment pension.",
  metaTitle: "Employer NI Calculator 2025/26 | Agency Cost-to-Hire",
  metaDescription:
    "Free employer NI calculator for UK agencies. Total employment cost including 13.8% NI, Employment Allowance and auto-enrolment pension. 2025/26.",
  intro:
    "Calculate the total cost of employing your agency team including employer NI at 13.8%, Employment Allowance (£5,000 off for eligible employers) and minimum auto-enrolment pension contributions.",
  embedHeight: 420,
  fields: [
    {
      id: "salary1",
      label: "Employee 1 salary",
      type: "currency",
      default: 55000,
      min: 0,
      max: 500000,
      step: 500,
      help: "Gross annual salary.",
    },
    {
      id: "salary2",
      label: "Employee 2 salary",
      type: "currency",
      default: 38000,
      min: 0,
      max: 500000,
      step: 500,
    },
    {
      id: "useEmploymentAllowance",
      label: "Apply Employment Allowance (£5,000)",
      type: "toggle",
      default: true,
      help: "Eligible if you have 2+ employees and your total NI bill is above £5,000. Single-director companies do not qualify.",
    },
    {
      id: "includePension",
      label: "Include minimum auto-enrolment pension (3%)",
      type: "toggle",
      default: true,
      help: "3% employer minimum on qualifying earnings above £6,240/year.",
    },
  ],
  compute: (values: CalcValues) => {
    const salary1 = Number(values.salary1) || 0;
    const salary2 = Number(values.salary2) || 0;
    const employees = [
      { id: 1, role: "Employee 1", salary: salary1 },
      { id: 2, role: "Employee 2", salary: salary2 },
    ].filter((e) => e.salary > 0);

    const out = calcEmployerNi({
      employees,
      useEmploymentAllowance: Boolean(values.useEmploymentAllowance),
      includePension: Boolean(values.includePension),
    });
    return {
      headline: {
        label: "Total employment cost",
        value: fmt(out.totalEmploymentCost),
        sub: `Monthly: ${fmt(out.monthlyTotal)} | NI after EA: ${fmt(out.niAfterEA)}`,
        tone: "default",
      },
      rows: [
        { label: "Total gross salaries", value: fmt(out.grossSalaryTotal) },
        { label: "Employer NI (before EA)", value: fmt(out.niTotal) },
        { label: "Employment Allowance applied", value: fmt(out.eaApplied) },
        { label: "Employer NI (after EA)", value: fmt(out.niAfterEA) },
        { label: "Min auto-enrolment pension", value: fmt(out.pensionTotal) },
        { label: "Total annual cost", value: fmt(out.totalEmploymentCost), strong: true },
        { label: "Monthly cost", value: fmt(out.monthlyTotal), strong: true },
      ],
      note: out.eaEligibleWarning
        ? "Employment Allowance requires 2+ employees. Single-director company does not qualify."
        : "Add more employees to model your full team cost.",
    };
  },
  explainer: {
    heading: "Employer NI and the Employment Allowance",
    paragraphs: [
      "Employers pay 13.8% NI on salaries above the secondary threshold (£9,100 in 2025/26). Eligible employers with 2+ employees can offset £5,000 via the Employment Allowance, reducing their NI bill.",
      "Auto-enrolment minimum employer pension is 3% on qualifying earnings above £6,240.",
    ],
  },
  faqs: [
    {
      question: "Who qualifies for the Employment Allowance?",
      answer:
        "Most employers with two or more employees and a total Class 1 NI bill under £100,000 in the prior tax year. Single-director companies with no other employees do not qualify.",
    },
  ],
};
