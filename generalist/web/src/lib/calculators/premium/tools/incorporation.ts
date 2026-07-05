/**
 * Premium Tool 2 — Sole trader vs limited company comparison (incorporation-premium)
 *
 * Topic: incorporation (also surfaces on sole-trader posts).
 * Reuses:
 *   - Company leg: modelExtraction + findOptimalSalary from salary-dividend.ts
 *   - Sole-trader leg: soleTraderTax (new helper, lib/sole-trader.ts) which
 *     delegates income tax to calcIncomeTaxTHP and adds Class 4 NIC.
 * Premium value: side-by-side net-cash comparison on the same profit, with
 * the annual difference highlighted.
 */

import type { PremiumToolConfig, PremiumComputeFn } from "../types";
import { modelExtraction, findOptimalSalary } from "@/lib/tools/compute/salary-dividend";
import { soleTraderTax } from "../lib/sole-trader";
import { gbp } from "@accounting-network/web-shared/tools/format";

const compute: PremiumComputeFn = ({ values }) => {
  const profit = Number(values.profit) || 0;
  const useEA = Boolean(values.useEA);

  // Sole-trader leg
  const st = soleTraderTax(profit);

  // Company leg — use the optimal salary
  const optimalSalary = findOptimalSalary(profit, useEA).salary;
  const co = modelExtraction(optimalSalary, profit, useEA);

  const difference = co.netCash - st.netCash;
  const companyWins = difference > 0;

  return {
    headline: {
      label: companyWins
        ? "Annual gain from incorporating"
        : "Annual cost of incorporating",
      value: gbp(Math.abs(difference)),
      sub: companyWins
        ? `Limited company puts ${gbp(difference)} more in your pocket each year`
        : `Sole trader leaves ${gbp(Math.abs(difference))} more in your pocket`,
      tone: companyWins ? "good" : "warn",
    },
    scenarioResults: [
      {
        label: "Sole trader",
        value: gbp(st.netCash),
        best: !companyWins,
        rows: [
          { label: "Profit", value: gbp(profit) },
          { label: "Income tax", value: gbp(st.incomeTax) },
          { label: "Class 4 NIC", value: gbp(st.class4Nic) },
          { label: "Net cash", value: gbp(st.netCash), strong: true },
        ],
      },
      {
        label: "Limited company",
        value: gbp(co.netCash),
        best: companyWins,
        rows: [
          { label: "Director salary", value: gbp(optimalSalary) },
          { label: "Dividend", value: gbp(co.dividend) },
          { label: "Corporation tax", value: gbp(co.corporationTax) },
          { label: "Employer NIC", value: gbp(co.employerNi) },
          { label: "Dividend tax", value: gbp(co.dividendTax) },
          { label: "Net cash", value: gbp(co.netCash), strong: true },
        ],
      },
    ],
    note:
      "Incorporation is a financial calculation, not a default recommendation. " +
      "A limited company adds annual accounts, a Companies House filing, and payroll. " +
      "The comparison above uses the optimal salary for the company leg. " +
      "It ignores any CGT or goodwill implications on the transfer of a going concern. " +
      "Get a specialist to model your specific situation before deciding.",
  };
};

export const incorporationPremium: PremiumToolConfig = {
  id: "incorporation-premium",
  name: "Sole trader vs limited company comparison",
  topic: "incorporation",
  description:
    "See the real after-tax gap between staying a sole trader and running a limited company " +
    "on the same profit, before you weigh the extra admin.",
  fields: [
    {
      id: "profit",
      label: "Annual profit",
      type: "currency",
      default: 80000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Your annual profit before tax (sole trader) or before salary and tax (company).",
    },
    {
      id: "useEA",
      label: "Claim the £10,500 Employment Allowance? (company leg only)",
      type: "toggle",
      default: false,
      help: "Only available where you have at least one non-director employee.",
    },
  ],
  compute,
  ctaLabel: "Get a personalised incorporation analysis",
};
