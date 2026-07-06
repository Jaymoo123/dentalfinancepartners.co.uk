/**
 * Tool 4: Employer NIC and cost-of-employment calculator (premium).
 *
 * toolId: employer-cost-to-hire-premium
 * topic: structure
 *
 * Composes calcEmployerNi from compute/employer-ni.ts. NO maths forked.
 * Input shaping (NOT a fork): assembles the employees[] array from two scalar
 * inputs (directorSalary, firstHireSalary) so calcEmployerNi is called unchanged.
 *
 * RATES (HP §2):
 *   Employer NIC: 15% above £5,000 secondary threshold (from 6 Apr 2025)
 *   EA:           £10,500 (only when employees.length >= 2, single-director excluded)
 *   Auto-enrolment pension: 3% employer minimum above £6,240
 *
 * GOLDEN (executed 2026-07-06, defaults directorSalary=12570, firstHireSalary=40000, EA=true, pension=true):
 *   employees=[{id:1,role:'director',salary:12570},{id:2,role:'hire',salary:40000}]
 *   grossSalaryTotal=52570, niTotal=6385.5, eaApplied=6385.5, niAfterEA=0
 *   pensionTotal=1202.7, totalEmploymentCost=53772.7 -> "£53,773"
 *   monthlyTotal=4481.06 -> "£4,481", eaEligibleWarning=false
 *
 * Single-director case (firstHireSalary=0 -> employees=[{12570}], EA on):
 *   niTotal=1135.5, eaApplied=0, niAfterEA=1135.5, pensionTotal=189.9
 *   totalEmploymentCost=13895.4 -> "£13,895", eaEligibleWarning=true
 *
 * EA-off case (default employees, EA=false):
 *   niAfterEA=6385.5, totalEmploymentCost=60158.2 -> "£60,158"
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcEmployerNi } from "@/lib/tools/compute/employer-ni";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const employerCostToHireConfig: PremiumToolConfig = {
  id: "employer-cost-to-hire-premium",
  topic: "structure",
  title: "Employer NIC and cost-of-employment calculator (2026/27)",
  intro: "See the true cost of employing yourself and a first hire after employer National Insurance and the auto-enrolment pension, and find out whether adding a second person to the payroll unlocks the £10,500 Employment Allowance.",
  fields: [
    {
      id: "directorSalary",
      label: "Your salary as director",
      type: "currency",
      default: 12570,
      min: 0,
      max: 200000,
      step: 500,
      help: "Your own director salary. Set to 0 for a dividend-only draw.",
    },
    {
      id: "firstHireSalary",
      label: "First employee salary",
      type: "currency",
      default: 40000,
      min: 0,
      max: 200000,
      step: 500,
      help: "The salary of your first employee. Set to 0 to model a solo director with no employees.",
    },
    {
      id: "claimEmploymentAllowance",
      label: "Claim the Employment Allowance",
      type: "toggle",
      default: true,
      help: "The £10,500 Employment Allowance is only available once you employ someone other than a single director (HP §2). It is applied automatically when you add a first hire above.",
    },
    {
      id: "includePension",
      label: "Include auto-enrolment pension",
      type: "toggle",
      default: true,
      help: "Auto-enrolment employer minimum 3% on qualifying earnings above £6,240.",
    },
  ],
  compute({ values }): PremiumResult {
    const directorSalary = Number(values.directorSalary) || 0;
    const firstHireSalary = Number(values.firstHireSalary) || 0;
    const claimEmploymentAllowance = Boolean(values.claimEmploymentAllowance);
    const includePension = Boolean(values.includePension);

    // Input shaping: assemble employees array from two scalar inputs.
    // This is NOT a maths fork; calcEmployerNi is called unchanged.
    // Two employees -> EA eligible (length >= 2); single director -> EA not eligible.
    const employees =
      firstHireSalary > 0
        ? [
            { id: 1, role: "director", salary: directorSalary },
            { id: 2, role: "employee", salary: firstHireSalary },
          ]
        : [{ id: 1, role: "director", salary: directorSalary }];

    const r = calcEmployerNi({ employees, useEmploymentAllowance: claimEmploymentAllowance, includePension });

    const warningNote =
      r.eaEligibleWarning
        ? "The company has only a single director on the payroll, so the Employment Allowance is not available (HP §2). Add a genuine first employee to unlock the allowance."
        : undefined;

    return {
      headline: {
        label: "Total annual employment cost",
        value: gbp(r.totalEmploymentCost),
        sub: `Employer NIC ${gbp(r.niAfterEA)} after Employment Allowance`,
        tone: r.eaEligibleWarning ? "warn" : "default",
      },
      breakdown: [
        { label: "Director salary", value: gbp(directorSalary) },
        ...(firstHireSalary > 0 ? [{ label: "First employee salary", value: gbp(firstHireSalary) }] : []),
        { label: "Gross salary total", value: gbp(r.grossSalaryTotal) },
        { label: "Employer NIC before EA", value: gbp(r.niTotal) },
        { label: "Employment Allowance applied", value: `-${gbp(r.eaApplied)}` },
        { label: "Employer NIC after EA", value: gbp(r.niAfterEA) },
        { label: "Auto-enrolment pension", value: gbp(r.pensionTotal) },
        { label: "Total employment cost", value: gbp(r.totalEmploymentCost), strong: true },
        { label: "Monthly cost", value: gbp(r.monthlyTotal) },
      ],
      note:
        (warningNote ? warningNote + " " : "") +
        "Employer NIC 15% above the £5,000 secondary threshold from 6 April 2025, never 13.8%/£9,100 (HP §2). EA £10,500 with the single-director exclusion (HP §2). A spouse or first-hire salary must be genuine and market-rate (HP §2). Auto-enrolment pension 3% employer minimum on qualifying earnings above £6,240.",
    };
  },
  explainer: {
    heading: "How the employer cost calculator works",
    paragraphs: [
      "Your first employee costs more than their salary: employer National Insurance at 15% and the auto-enrolment pension on top. But hiring someone other than a single director unlocks the £10,500 Employment Allowance, which can wipe out that NIC. Here is the true cost, and whether you can claim it. Surface the single-director trap plainly.",
      "The single-director exclusion is the most commonly misunderstood aspect of employer NIC planning. A company whose only employee is a sole director cannot claim the Employment Allowance, regardless of salary level. This rule changed on 6 April 2020. As soon as you hire a genuine first employee at a market-rate salary, the company qualifies, and the allowance covers up to £10,500 of employer NIC.",
      "The employer minimum pension contribution (3% on earnings above £6,240 under auto-enrolment) is a cash cost on top of NIC. It does not affect employee take-home pay but increases the total cost of employment. The combined NIC and pension cost is factored into the total shown above.",
    ],
  },
};
