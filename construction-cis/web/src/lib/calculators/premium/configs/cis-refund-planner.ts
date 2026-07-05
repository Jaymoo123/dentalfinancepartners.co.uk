/**
 * Tool 1: CIS refund and deduction planner (premium).
 *
 * Topic mapping: cis-refund (primary). Also aliased by cis-deductions (resources.ts).
 * Blog categories: CIS Refunds (cis-refunds), CIS Basics (cis-basics), Expenses (expenses).
 *
 * Compute reuse: composes cisDeduction() + saLiability() from cis-tax.ts.
 * No maths forked. The premium layer adds the presentation and the sole-trader-vs-limited
 * reclaim-route framing (HP §9).
 *
 * HP traces:
 *   CIS deduction rates / labour-only base  - HP §1
 *   PA, income tax bands                    - HP §11a
 *   Class 4 NI 6%/2%                        - HP §11a
 *   Refund as entry service                 - HP §9, §12.B
 *   No guaranteed refund amount             - HP §13
 *
 * Tokens: var(--accent) = orange, var(--dark) = slate. No --gold, no --navy.
 */
import type { PremiumToolConfig } from "../types";
import {
  cisDeduction,
  saLiability,
  CIS_RATES,
  PERSONAL_ALLOWANCE,
} from "../../cis-tax";
import { gbp } from "../../format";

export const cisRefundPlannerConfig: PremiumToolConfig = {
  id: "cis-refund-planner-premium",
  topic: "cis-refund",
  title: "CIS Refund and Deduction Planner",
  intro:
    "CIS deductions are taken before your expenses and personal allowance. Most registered subcontractors overpay. Enter your figures to see what you can reclaim and how.",
  fields: [
    {
      id: "grossIncome",
      label: "Gross CIS income (total labour and materials invoiced)",
      type: "currency",
      default: 45000,
      step: 1000,
      help: "The total amount on your CIS invoices before any deductions. Include both labour and materials you invoice for.",
    },
    {
      id: "materialsInvoiced",
      label: "Materials cost (materials you supply and invoice for)",
      type: "currency",
      default: 5000,
      step: 500,
      help: "Materials you personally purchase and include on your invoices. These are excluded from the CIS deduction base (HP §1).",
    },
    {
      id: "status",
      label: "Your CIS deduction rate",
      type: "select",
      default: "registered",
      options: [
        { value: "registered", label: "20% (registered subcontractor)" },
        { value: "unregistered", label: "30% (unregistered subcontractor)" },
      ],
    },
    {
      id: "expenses",
      label: "Allowable business expenses",
      type: "currency",
      default: 4000,
      step: 500,
      help: "Mileage at 55p per mile (first 10,000 miles from April 2026), tools, PPE, van running costs, phone, professional fees.",
    },
    {
      id: "otherIncome",
      label: "Other taxable income (salary, rental, etc.)",
      type: "currency",
      default: 0,
      step: 1000,
      help: "Include any non-CIS income that forms part of your total taxable income for the year.",
      advanced: true,
    },
    {
      id: "reclaimRoute",
      label: "How you reclaim (changes the timing note, not the arithmetic)",
      type: "select",
      default: "sole-trader",
      options: [
        { value: "sole-trader", label: "Sole trader (reclaim via Self Assessment)" },
        { value: "limited", label: "Limited company (reclaim via monthly EPS)" },
      ],
      advanced: true,
    },
  ],
  compute: ({ values }) => {
    const grossIncome = Number.isFinite(Number(values.grossIncome)) ? Number(values.grossIncome) : 0;
    const materialsInvoiced = Number.isFinite(Number(values.materialsInvoiced)) ? Number(values.materialsInvoiced) : 0;
    const statusVal = String(values.status ?? "registered");
    const expenses = Number.isFinite(Number(values.expenses)) ? Number(values.expenses) : 0;
    const otherIncome = Number.isFinite(Number(values.otherIncome)) ? Number(values.otherIncome) : 0;
    const reclaimRoute = String(values.reclaimRoute ?? "sole-trader");

    const rate = statusVal === "unregistered" ? CIS_RATES.unregistered : CIS_RATES.registered;
    const rateLabel = statusVal === "unregistered" ? "30%" : "20%";

    const { deductionBase, cisDeducted } = cisDeduction({
      gross: grossIncome,
      materials: materialsInvoiced,
      rate,
    });

    // Taxable profit for SA: labour income minus allowable expenses
    const profit = Math.max(0, deductionBase - expenses);

    const { incomeTax, class4Ni, total: totalLiability } = saLiability({
      profit,
      otherIncome,
    });

    const refund = cisDeducted - totalLiability;
    const isRefund = refund >= 0;

    // Reclaim route note (HP §9)
    const routeNote =
      reclaimRoute === "limited"
        ? "Limited companies reclaim via the monthly Employer Payment Summary (EPS), recovering the money in real time against PAYE liabilities, not at year-end."
        : "Sole traders reclaim at year-end through Self Assessment. File by 31 January to get the refund processed quickly.";

    const note =
      `This estimate uses 2026/27 rates: PA £${PERSONAL_ALLOWANCE.toLocaleString("en-GB")}, basic rate 20%, Class 4 NI 6%/2% (HP §11a). ` +
      `The deduction base is the labour element only (materials excluded, HP §1). ` +
      routeNote +
      " A specialist will identify all allowable expenses and confirm your exact position.";

    return {
      headline: {
        label: isRefund ? "Estimated CIS refund" : "Estimated tax to pay",
        value: gbp(Math.abs(refund)),
        tone: isRefund ? "good" : "warn",
        sub: isRefund
          ? `${gbp(cisDeducted)} deducted at source, ${gbp(totalLiability)} actual liability`
          : `Your liability (${gbp(totalLiability)}) exceeds what was deducted (${gbp(cisDeducted)})`,
      },
      rows: [],
      breakdown: [
        { label: "Gross CIS income", value: gbp(grossIncome) },
        { label: "Less materials (excluded from deduction base)", value: `−${gbp(materialsInvoiced)}` },
        { label: "Labour deduction base", value: gbp(deductionBase) },
        { label: `CIS deducted at ${rateLabel}`, value: gbp(cisDeducted), strong: true },
        { label: "Less allowable expenses", value: `−${gbp(expenses)}` },
        { label: "Taxable profit", value: gbp(profit) },
        { label: "Estimated income tax", value: gbp(incomeTax) },
        { label: "Estimated Class 4 NI", value: gbp(class4Ni) },
        { label: "Total estimated liability", value: gbp(totalLiability), strong: true },
        { label: isRefund ? "Estimated refund" : "Estimated tax to pay", value: gbp(Math.abs(refund)), strong: true },
      ],
      chart: {
        data: [
          {
            name: "Your CIS year",
            cisDeducted,
            actualTax: totalLiability,
          },
        ],
      },
      note,
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      {
        dataKey: "cisDeducted",
        label: "CIS deducted at source",
        color: "var(--accent)",
      },
      {
        dataKey: "actualTax",
        label: "Actual tax due",
        color: "var(--dark)",
      },
    ],
  },
  explainer: {
    heading: "How the CIS refund works",
    paragraphs: [
      "CIS deductions are taken from your labour payments at source, before any account is made for your personal allowance, business expenses or materials costs. A registered subcontractor on a 20% rate may pay 20% on every labour pound received, even if their actual income tax liability for the year is far lower. The gap between what was deducted and what you actually owe is your refund.",
      "The deduction base is the labour element of your invoices only. Materials you personally purchase and supply are excluded (HP §1). That means a subcontractor supplying significant materials has a smaller deduction base, and therefore smaller over-deductions, than one billing purely for labour at the same gross total.",
      "The refund is reclaimed through Self Assessment (sole traders) or via the monthly Employer Payment Summary (limited companies). A specialist CIS accountant will identify every allowable expense, ensure the deduction base was correctly applied on your statements, and file your return to maximise the refund. This calculator uses 2026/27 rates and is an estimate only.",
    ],
  },
};
