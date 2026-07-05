/**
 * Premium Tool 4 — Employer NIC and true cost-of-hire planner (employer-cost-premium)
 *
 * Topic: payroll.
 * Reuses: calcEmployerNIFleet + calcSingleEmployerNi + calcMinPensionEmployer
 *   from compute/employer-ni.ts.
 * Premium value: editable staff mini-grid with true loaded cost (salary +
 *   15% NIC + EA offset + 3% pension), per-hire and total.
 */

import type { PremiumToolConfig, PremiumComputeFn, GridConfig } from "../types";
import type { Employee } from "@/lib/tools/compute/employer-ni";
import { calcEmployerNIFleet } from "@/lib/tools/compute/employer-ni";
import { gbp } from "@accounting-network/web-shared/tools/format";

const compute: PremiumComputeFn = ({ values, gridRows }) => {
  const useEA = Boolean(values.useEA);
  const includePension = Boolean(values.includePension);

  // Map grid rows to Employee[] (fall back to a single default employee if no grid)
  const employees: Employee[] = (gridRows && gridRows.length > 0)
    ? gridRows.map((row, i) => ({
        id: i + 1,
        role: String(row.role ?? ""),
        salary: Number(row.salary) || 0,
      }))
    : [{ id: 1, role: "First hire", salary: 30000 }];

  const res = calcEmployerNIFleet(employees, useEA, includePension);

  const rows = [
    { label: "Gross salaries", value: gbp(res.grossSalaryTotal) },
    { label: "Employer NIC (before allowance)", value: gbp(res.niTotal) },
    ...(useEA ? [{ label: "Employment Allowance applied", value: `(${gbp(res.eaApplied)})` }] : []),
    { label: "Employer NIC (after allowance)", value: gbp(res.niAfterEA) },
    ...(includePension ? [{ label: "Employer pension (3%)", value: gbp(res.pensionTotal) }] : []),
    { label: "Total annual employment cost", value: gbp(res.totalEmploymentCost), strong: true },
  ];

  // EA eligibility warning row
  if (res.eaEligibleWarning) {
    rows.push({
      label: "Note: Employment Allowance requires at least one non-director employee",
      value: "Not applied",
    });
  }

  return {
    headline: {
      label: "True annual cost of your team",
      value: gbp(res.totalEmploymentCost),
      sub: `${gbp(res.monthlyTotal)}/month`,
      tone: "default",
    },
    rows,
    note:
      "The true cost of employment is the gross salary plus 15% employer NIC above the £5,000 secondary " +
      "threshold, plus the 3% minimum auto-enrolment pension on qualifying earnings above £6,240, plus " +
      "payroll-running and on-costs. The £10,500 Employment Allowance is not available to single-director " +
      "companies with no other employees.",
  };
};

export const employerCostGrid: GridConfig = {
  columns: [
    { id: "role", label: "Role", type: "text" },
    { id: "salary", label: "Annual salary", type: "currency", step: 1000 },
  ],
  rowFactory: (i: number): import("../types").GridRow => ({
    id: `emp-${i}-${Math.random().toString(36).slice(2, 7)}`,
    role: i === 0 ? "First hire" : `Employee ${i + 1}`,
    salary: 30000,
  }),
  minRows: 1,
  maxRows: 10,
  addLabel: "+ Add an employee",
  heading: "Your team",
};

export const employerCostPremium: PremiumToolConfig = {
  id: "employer-cost-premium",
  name: "Employer NIC and true cost-of-hire planner",
  topic: "payroll",
  description:
    "Add your team and see the real cost of employing them, not the headline salaries: " +
    "employer NIC, the Employment Allowance and the 3% pension all folded in.",
  fields: [
    {
      id: "useEA",
      label: "Claim the £10,500 Employment Allowance?",
      type: "toggle",
      default: true,
      help:
        "Available where you have at least one non-director employee; not a single-director company.",
    },
    {
      id: "includePension",
      label: "Include auto-enrolment pension (3% employer)?",
      type: "toggle",
      default: true,
      help: "Minimum employer contribution on qualifying earnings above £6,240.",
    },
  ],
  grid: employerCostGrid,
  compute,
  ctaLabel: "Get payroll and employment cost advice",
};
