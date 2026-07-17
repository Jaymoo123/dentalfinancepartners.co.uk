/**
 * Tool 7: Salaried GP vs GP partner net position comparison.
 *
 * toolId: salaried-gp-vs-partner
 * topic: gp-tax
 * priority: P1 (demand: "salaried gp vs gp partner" pos 1 Bing, "difference
 *   between salaried gp and gp partner" pos 1.2, 10+ impressions each)
 *
 * Side-by-side net pay comparison for the classic GP career decision.
 * Standalone compute -- NO dependency on shared compute libs (integrator wires
 * those later). Income-tax band rule enforced on BOTH columns.
 *
 * INCOME-TAX BAND RULE (LOCKED, TOOL_ROSTER.md §5):
 *   PA = 12,570 tapered -£1/£2 above £100,000, zero at £125,140.
 *   Basic band: FIXED £37,700.
 *   Higher band width = (125,140 - PA) - 37,700.  NOT a fixed £74,870.
 *   Additional (45%) above £125,140.
 *   The 60% effective-rate zone between £100k-£125,140 is a natural output.
 *
 * NHS SUPERANNUATION TIER TABLE (2026/27 employee rates, NHSBSA):
 *   from the shared single-source module compute/nhs-super-tiers.ts.
 *   Both worked-example salaries (£90k, £110k) fall in the top tier at 12.5%.
 *
 * CLASS 1 NI (employee, 2026/27 rates -- unchanged from 2025/26):
 *   8% on £12,570-£50,270; 2% above.
 *
 * CLASS 4 NI (self-employed partner, 2026/27):
 *   6% on £12,570-£50,270; 2% above.
 *
 * STUDENT LOAN THRESHOLDS (2025/26, no confirmed 2026/27 change):
 *   Plan 1 £26,065; Plan 2 £28,470; Plan 4 £32,745. Rate 9%.
 *
 * WORKED EXAMPLE (spec §4 Tool 7): salaried £90,000 vs partner £110,000.
 *   Salaried net: ~£51,507   Partner net: ~£59,361   Gap: ~£7,854
 *   (£20k headline gap narrows significantly after super/NI/PA-taper).
 *
 * PREMIUM sibling: yes (this IS the premium island; public twin is tool 7 in
 * registry.ts, wired by integrator). Premium addon scope: pension-value column
 * + 5-year projection (not in this file; deferred to next iteration).
 *
 * NO commit / NO deploy. Standalone config only.
 */

import type {
  PremiumToolConfig,
  PremiumResult,
  ScenarioResult,
} from "../types";
import type { StudentLoanPlan } from "@/lib/tools/compute/locum-tax";
import { nhsSuperEmployeeRate as superRate } from "@/lib/tools/compute/nhs-super-tiers";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number, dp = 1): string {
  return n.toFixed(dp) + "%";
}

// ---------------------------------------------------------------------------
// Income-tax computation (2026/27, LOCKED band rule)
// ---------------------------------------------------------------------------

function calcPA(grossIncome: number): number {
  if (grossIncome <= 100_000) return 12_570;
  const taper = Math.floor((grossIncome - 100_000) / 2);
  return Math.max(0, 12_570 - taper);
}

function calcIncomeTax(grossIncome: number, pa: number): number {
  // PA zone: 0%
  const basicTop = pa + 37_700;         // e.g. 50,270 when full PA
  const higherTop = 125_140;            // additional rate kicks in above this
  let tax = 0;
  // basic band (fixed £37,700)
  const basicIncome = Math.min(Math.max(grossIncome - pa, 0), 37_700);
  tax += basicIncome * 0.20;
  // higher band: width = (125,140 - PA) - 37,700
  if (grossIncome > basicTop) {
    const higherIncome = Math.min(grossIncome - basicTop, higherTop - basicTop);
    tax += higherIncome * 0.40;
  }
  // additional band
  if (grossIncome > higherTop) {
    tax += (grossIncome - higherTop) * 0.45;
  }
  return Math.max(tax, 0);
}

// ---------------------------------------------------------------------------
// NI computations
// ---------------------------------------------------------------------------

function calcClass1NI(salary: number): number {
  // Employee Class 1: 8% on £12,570-£50,270; 2% above
  const primary = Math.max(Math.min(salary, 50_270) - 12_570, 0) * 0.08;
  const upper = Math.max(salary - 50_270, 0) * 0.02;
  return primary + upper;
}

function calcClass4NI(profit: number): number {
  // Self-employed Class 4: 6% on £12,570-£50,270; 2% above
  const lower = Math.max(Math.min(profit, 50_270) - 12_570, 0) * 0.06;
  const upper = Math.max(profit - 50_270, 0) * 0.02;
  return lower + upper;
}

// ---------------------------------------------------------------------------
// Student loan
// ---------------------------------------------------------------------------

const LOAN_THRESHOLDS: Record<StudentLoanPlan, number> = {
  none: Infinity,
  plan1: 26_065,
  plan2: 28_470,
  plan4: 32_745,
};

function calcStudentLoan(income: number, plan: StudentLoanPlan): number {
  const threshold = LOAN_THRESHOLDS[plan];
  return Math.max(income - threshold, 0) * 0.09;
}

// ---------------------------------------------------------------------------
// Per-side net computation
// ---------------------------------------------------------------------------

interface SideResult {
  grossPay: number;
  pa: number;
  incomeTax: number;
  ni: number;
  superAmt: number;
  studentLoan: number;
  totalDeductions: number;
  netPay: number;
  effectiveDeductionRate: number;
  superRatePct: number;
}

function calcSalaried(salary: number, plan: StudentLoanPlan): SideResult {
  const pa = calcPA(salary);
  const incomeTax = calcIncomeTax(salary, pa);
  const ni = calcClass1NI(salary);
  const rate = superRate(salary);
  const superAmt = salary * rate;
  const studentLoan = calcStudentLoan(salary, plan);
  const totalDeductions = incomeTax + ni + superAmt + studentLoan;
  const netPay = salary - totalDeductions;
  return {
    grossPay: salary,
    pa,
    incomeTax,
    ni,
    superAmt,
    studentLoan,
    totalDeductions,
    netPay,
    effectiveDeductionRate: (totalDeductions / salary) * 100,
    superRatePct: rate * 100,
  };
}

function calcPartner(profit: number, plan: StudentLoanPlan): SideResult {
  const pa = calcPA(profit);
  const incomeTax = calcIncomeTax(profit, pa);
  const ni = calcClass4NI(profit);
  const rate = superRate(profit);
  const superAmt = profit * rate;
  const studentLoan = calcStudentLoan(profit, plan);
  const totalDeductions = incomeTax + ni + superAmt + studentLoan;
  const netPay = profit - totalDeductions;
  return {
    grossPay: profit,
    pa,
    incomeTax,
    ni,
    superAmt,
    studentLoan,
    totalDeductions,
    netPay,
    effectiveDeductionRate: (totalDeductions / profit) * 100,
    superRatePct: rate * 100,
  };
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const salariedGpVsPartnerConfig: PremiumToolConfig = {
  id: "salaried-gp-vs-partner",
  topic: "gp-tax",

  title: "Salaried GP vs GP partner: net pay comparison",
  intro:
    "Enter a salaried GP offer and a partner profit-share offer to see how much each actually puts in your pocket after income tax, National Insurance and NHS superannuation, on the 2026/27 basis.",

  fields: [
    {
      id: "salariedPay",
      label: "Salaried GP gross salary",
      type: "currency",
      default: 90_000,
      min: 20_000,
      max: 300_000,
      step: 1_000,
      help: "The GMS/PMS gross salary offered. Taxed under PAYE with Class 1 NIC.",
    },
    {
      id: "partnerProfitShare",
      label: "GP partner annual profit share",
      type: "currency",
      default: 110_000,
      min: 20_000,
      max: 300_000,
      step: 1_000,
      help: "The partnership profit allocation (drawings basis). Taxed as self-employed trading income with Class 4 NIC.",
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
    const salariedPay = Math.max(Number(values.salariedPay) || 0, 0);
    const partnerProfitShare = Math.max(Number(values.partnerProfitShare) || 0, 0);
    const plan = (String(values.studentLoanPlan) || "none") as StudentLoanPlan;

    const sal = calcSalaried(salariedPay, plan);
    const par = calcPartner(partnerProfitShare, plan);

    const netGap = par.netPay - sal.netPay;
    const grossGap = par.grossPay - sal.grossPay;

    // Salaried scenario columns
    const salariedRows = [
      { label: "Gross salary", value: gbp(sal.grossPay) },
      { label: "Personal allowance", value: gbp(sal.pa) },
      { label: "Income tax", value: gbp(sal.incomeTax) },
      {
        label: `Class 1 NI (employee)`,
        value: gbp(sal.ni),
      },
      {
        label: `NHS super (${pct(sal.superRatePct, 1)} tier)`,
        value: gbp(sal.superAmt),
      },
      ...(sal.studentLoan > 0
        ? [{ label: "Student loan", value: gbp(sal.studentLoan) }]
        : []),
      { label: "Total deductions", value: gbp(sal.totalDeductions), strong: true },
      { label: "Net pay", value: gbp(sal.netPay), strong: true },
    ];

    // Partner scenario columns
    const partnerRows = [
      { label: "Profit share", value: gbp(par.grossPay) },
      { label: "Personal allowance", value: gbp(par.pa) },
      { label: "Income tax", value: gbp(par.incomeTax) },
      {
        label: "Class 4 NI (self-employed)",
        value: gbp(par.ni),
      },
      {
        label: `NHS super (${pct(par.superRatePct, 1)} tier)`,
        value: gbp(par.superAmt),
      },
      ...(par.studentLoan > 0
        ? [{ label: "Student loan", value: gbp(par.studentLoan) }]
        : []),
      { label: "Total deductions", value: gbp(par.totalDeductions), strong: true },
      { label: "Net pay", value: gbp(par.netPay), strong: true },
    ];

    const scenarios: ScenarioResult[] = [
      {
        id: "salaried",
        label: "Salaried GP",
        headline: {
          label: "Net pay after all deductions",
          value: gbp(sal.netPay),
          sub: `effective deduction rate ${pct(sal.effectiveDeductionRate)}`,
          tone: sal.netPay >= par.netPay ? "good" : "default",
        },
        rows: salariedRows,
        best: sal.netPay >= par.netPay,
      },
      {
        id: "partner",
        label: "GP partner",
        headline: {
          label: "Net pay after all deductions",
          value: gbp(par.netPay),
          sub: `effective deduction rate ${pct(par.effectiveDeductionRate)}`,
          tone: par.netPay > sal.netPay ? "good" : "default",
        },
        rows: partnerRows,
        best: par.netPay > sal.netPay,
      },
    ];

    // Headline verdict: whichever nets more, but tempered by non-financial factors
    const headline: PremiumResult["headline"] =
      netGap > 0
        ? {
            label: `Partner role nets ${gbp(netGap)} more per year`,
            value: gbp(netGap),
            sub: `from a £${Math.abs(grossGap).toLocaleString("en-GB")} gross difference`,
            tone: "good",
          }
        : netGap < 0
        ? {
            label: `Salaried role nets ${gbp(Math.abs(netGap))} more per year`,
            value: gbp(Math.abs(netGap)),
            sub: `despite the gross pay gap of £${Math.abs(grossGap).toLocaleString("en-GB")}`,
            tone: "warn",
          }
        : {
            label: "Both roles net the same after deductions",
            value: "£0",
            sub: "gross gap fully absorbed by tax and super",
            tone: "default",
          };

    const breakdownRows = [
      { label: "Salaried gross", value: gbp(sal.grossPay) },
      { label: "Partner gross", value: gbp(par.grossPay) },
      { label: "Gross gap", value: gbp(Math.abs(grossGap)) },
      { label: "Salaried net", value: gbp(sal.netPay) },
      { label: "Partner net", value: gbp(par.netPay) },
      { label: "Net gap", value: gbp(Math.abs(netGap)), strong: true },
      {
        label: "Non-financial factors",
        value:
          "Partnership: indemnity costs, drawings volatility, practice risk, autonomy, no guaranteed holiday pay. Salaried: employment rights, predictable income, no practice liability.",
      },
    ];

    return {
      headline,
      scenarioResults: scenarios,
      breakdown: breakdownRows,
      chart: {
        data: [
          {
            name: "Gross pay",
            salaried: Math.round(sal.grossPay),
            partner: Math.round(par.grossPay),
          },
          {
            name: "Total deductions",
            salaried: Math.round(sal.totalDeductions),
            partner: Math.round(par.totalDeductions),
          },
          {
            name: "Net pay",
            salaried: Math.round(sal.netPay),
            partner: Math.round(par.netPay),
          },
        ],
      },
      note:
        "2026/27 basis. Income tax uses the LOCKED band rule: personal allowance £12,570 tapered £1/£2 above £100,000 (zero at £125,140); basic band fixed £37,700; higher-band width (125,140 minus PA) minus 37,700; additional rate 45% above £125,140. NHS super tiers are the 2025/26 NHSBSA published employee rates (check NHSBSA each April). Class 1 NI (salaried): 8%/2% split at £50,270. Class 4 NI (partner): 6%/2% split at £50,270. Student loan at 9% above plan threshold. Partner super is set aside from drawings but it IS a deduction to net position. This model does not include the employer NIC saving the practice makes on salaried staff (that does not flow to the individual). These are estimates, not advice.",
    };
  },

  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "salaried", label: "Salaried GP", color: "var(--gold)" },
      { dataKey: "partner", label: "GP partner", color: "var(--navy)" },
    ],
  },

  explainer: {
    heading: "How this comparison works",
    paragraphs: [
      "The gap between a salaried GP salary and a GP partner profit share looks large on paper. What lands in your account is a different number, because income tax, National Insurance and NHS superannuation each behave differently for the two employment types. This tool runs both sets of numbers side by side on the 2026/27 tax year.",

      "For the salaried GP, income tax is deducted at source under PAYE. National Insurance is Class 1 employee contributions at 8% between £12,570 and £50,270 and 2% above. The NHS superannuation is the employee tier contribution on the full salary, collected by the employer from gross pay. The tier rate is banded: a GP on £90,000 falls in the 12.5% band, meaning £11,250 leaves before take-home is reached.",

      "For the GP partner, the profit share is taxed as self-employed trading income. Class 4 National Insurance applies at 6% between £12,570 and £50,270 and 2% above, lower than Class 1 at the upper rate but the same 2% ceiling. NHS superannuation is the employee tier contribution on the superannuable profit, which the partner sets aside from drawings and pays to the practice (or directly to NHSBSA depending on the arrangement). Critically, a higher profit share pushes the personal allowance into the taper zone above £100,000, widening the effective tax band and narrowing the net advantage.",

      "The non-financial factors matter as much as the numbers. As a partner you bear a share of practice risk, indemnity costs are higher and typically not reimbursed, drawings can fluctuate with the practice's cashflow, and there is no guaranteed holiday or sick pay. Partnership brings clinical and operational autonomy and the ability to influence the direction of the practice. Neither option is inherently better; the right choice depends on your career stage, risk appetite and financial circumstances. A specialist medical accountant can model the full picture including NHS pension accrual, which can differ between partnership and salaried roles depending on the superannuable profit vs pensionable pay.",
    ],
  },
};

// ---------------------------------------------------------------------------
// SSR-able worked-example block
// Render this server-side in the blog article using a plain HTML table or a
// <dl> list. Values match the compute() output for the spec defaults:
//   salariedPay 90,000 / partnerProfitShare 110,000 / no student loan.
// ---------------------------------------------------------------------------

export const workedExampleSsr = {
  heading: "Worked example: salaried £90,000 vs partner £110,000 (2026/27)",
  description:
    "A salaried GP offered £90,000 and a partner role with a £110,000 profit share looks like a £20,000 gross advantage for partnership. After income tax, National Insurance and NHS superannuation, the net gap is around £7,854.",
  columns: [
    {
      label: "Salaried GP",
      rows: [
        { label: "Gross salary", value: "£90,000" },
        { label: "Personal allowance", value: "£12,570" },
        { label: "Income tax", value: "£23,432" },
        { label: "Class 1 NI (employee)", value: "£3,811" },
        { label: "NHS super (12.5% tier)", value: "£11,250" },
        { label: "Total deductions", value: "£38,493", strong: true },
        { label: "Net pay", value: "£51,507", strong: true },
      ],
    },
    {
      label: "GP partner",
      rows: [
        { label: "Profit share", value: "£110,000" },
        { label: "Personal allowance (tapered)", value: "£7,570" },
        { label: "Income tax", value: "£33,432" },
        { label: "Class 4 NI (self-employed)", value: "£3,457" },
        { label: "NHS super (12.5% tier)", value: "£13,750" },
        { label: "Total deductions", value: "£50,639", strong: true },
        { label: "Net pay", value: "£59,361", strong: true },
      ],
    },
  ],
  verdict:
    "The partner role nets around £7,854 more per year on these figures, not £20,000. The personal allowance starts to taper at £110,000 (PA falls to £7,570, widening the higher-rate band), and the higher super amount narrows the gap further. Add in partner indemnity costs, drawings volatility and practice risk, and the decision is closer than the headline pay gap suggests.",
  methodology: [
    "Income tax: PA = £12,570 (full, salary under £100k) for salaried; PA = £7,570 (tapered: £12,570 minus £5,000, being (£110,000 minus £100,000) / 2) for partner. Basic band fixed £37,700 at 20%. Higher band = (£125,140 minus PA) minus £37,700, at 40%. Additional rate 45% above £125,140.",
    "Class 1 NI (salaried): 8% on £37,700 (£12,570 to £50,270) = £3,016; 2% on £39,730 (£50,270 to £90,000) = £795. Total £3,811.",
    "Class 4 NI (partner): 6% on £37,700 (£12,570 to £50,270) = £2,262; 2% on £59,730 (£50,270 to £110,000) = £1,195. Total £3,457.",
    "NHS super: both salaries fall in the top NHSBSA tier (£67,669 and above) at 12.5%. Salaried: 12.5% of £90,000 = £11,250. Partner: 12.5% of £110,000 = £13,750.",
  ],
};
