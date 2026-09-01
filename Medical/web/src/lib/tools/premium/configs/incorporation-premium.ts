/**
 * Tool 3: Private practice incorporation comparison.
 *
 * toolId: incorporation-premium
 * topic: incorporation-private
 *
 * Direct reuse of calcIncorporation. Compares sole-trader private practice
 * against a limited company on the 2026/27 dividend basis, with the NHS Pension
 * trade-off made explicit.
 *
 * FIGURES TRACED:
 * - calcIncorporation: 2026/27 dividend rates (10.75% / 35.75% / 39.35%, FA
 *   2026 s.4); CT 19% / 25% with marginal relief between £50,000 and £250,000,
 *   charged after the deductible director salary and employer NIC (corrected
 *   2026-09-01). Class 4 NIC at 6% (corrected 2026-07-06; the abolished 9%
 *   rate biased the sole-trader side upward).
 * - All three default-input cases show incorporation COSTING MORE tax at typical
 *   private-income levels, which is the locked HP §5 position. The headline and
 *   NHS-pension note reinforce this.
 *
 * CRITICAL COMPLIANCE NON-NEGOTIABLE (HP §2.C, §5):
 * - The NHS Pension impact row is ALWAYS shown, even when taxSavings is positive.
 * - The note ALWAYS pairs any saving with the pension-accrual loss.
 * - The tool must NOT present incorporation as a clear tax win. QA blocks if
 *   the pension line is conditional or missing.
 *
 * CONSERVATION NOTE: taxSavings = soleTraderTotalTax - limitedCompanyTotalTax,
 * and since 2026-09-01 that also equals limitedCompanyNetIncome -
 * soleTraderNetIncome: both net figures are now net cash in hand after every
 * tax and NIC the model charges, on the same gross base.
 *
 * groupedBar chart included for type parity (full={false} blog variant does not
 * render it): series soleTrader (var(--gold)) and ltd (var(--navy)).
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calcIncorporation } from "@/lib/tools/compute/incorporation";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const incorporationPremiumConfig: PremiumToolConfig = {
  id: "incorporation-premium",
  topic: "incorporation-private",
  title: "Private practice incorporation comparison",
  intro:
    "Compare taking your private practice profit as a sole trader against extracting it through a limited company, on the 2026/27 dividend basis, with the NHS Pension trade-off made explicit.",
  fields: [
    {
      id: "privateIncome",
      label: "Private practice income for the year",
      type: "currency",
      default: 100000,
      min: 0,
      max: 1000000,
      step: 5000,
    },
    {
      id: "expenses",
      label: "Practice expenses",
      type: "currency",
      default: 15000,
      min: 0,
      max: 300000,
      step: 1000,
    },
    {
      id: "nhsIncome",
      label: "Your NHS (PAYE) income",
      type: "currency",
      default: 50000,
      min: 0,
      max: 300000,
      step: 5000,
      help: "Your salaried NHS pay. It uses your personal allowance and basic-rate band first.",
    },
    {
      id: "desiredSalary",
      label: "Director salary from the company",
      type: "currency",
      default: 12570,
      min: 0,
      max: 50000,
      step: 500,
      advanced: true,
      help: "Often set near the £5,000 secondary threshold for a single-director company. Run it at both £5,000 and £12,570 and compare.",
    },
  ],
  compute({ values }): PremiumResult {
    const privateIncome = Number(values.privateIncome) || 0;
    const expenses = Number(values.expenses) || 0;
    const nhsIncome = Number(values.nhsIncome) || 0;
    const desiredSalary = Number(values.desiredSalary) || 0;

    const result = calcIncorporation({
      privateIncome,
      expenses,
      desiredSalary,
      nhsIncome,
    });

    const taxSavings = result.taxSavings;
    const savingsPerMonth = result.savingsPerMonth;

    const headlineLabel =
      taxSavings >= 0
        ? "Estimated tax saving from incorporating"
        : "Incorporating costs more here";
    const headlineTone = taxSavings > 0 ? "good" : "warn";
    const monthlySub = `£${Math.round(Math.abs(savingsPerMonth)).toLocaleString("en-GB")} a month`;

    const scenarios: ScenarioResult[] = [
      {
        id: "sole-trader",
        label: "Sole trader",
        headline: {
          label: "Total tax and NIC",
          value: gbp(result.soleTraderTotalTax),
          sub: "income tax plus Class 4 NIC on private profit",
          tone: taxSavings <= 0 ? "good" : "warn",
        },
        rows: [
          { label: "Total tax and NIC", value: gbp(result.soleTraderTotalTax), strong: true },
          { label: "Net income after all tax and NIC", value: gbp(result.soleTraderNetIncome) },
        ],
        best: taxSavings <= 0,
      },
      {
        id: "ltd",
        label: "Limited company",
        headline: {
          label: "Total tax and NIC",
          value: gbp(result.limitedCompanyTotalTax),
          sub: "corporation tax, employer NIC, dividend tax and income tax on pay",
          tone: taxSavings > 0 ? "good" : "warn",
        },
        rows: [
          { label: "Corporation tax", value: gbp(result.corporationTax) },
          { label: "Employer National Insurance", value: gbp(result.employerNIC) },
          { label: "Income tax on salary and NHS pay", value: gbp(result.payeIncomeTax) },
          { label: "Dividend tax", value: gbp(result.dividendTax) },
          { label: "Total tax and NIC", value: gbp(result.limitedCompanyTotalTax), strong: true },
          { label: "Net income after all tax and NIC", value: gbp(result.limitedCompanyNetIncome) },
          {
            label: "Note",
            value: `£${desiredSalary.toLocaleString("en-GB")} salary plus dividends, no Employment Allowance for a single-director company`,
          },
        ],
        best: taxSavings > 0,
      },
    ];

    // The NHS Pension impact row is ALWAYS present (compliance non-negotiable,
    // house_positions.md §2.C and §5).
    const breakdownRows = [
      {
        label: "Tax difference",
        value: gbp(Math.abs(taxSavings)),
        strong: true,
      },
      {
        label: "Sole trader total tax",
        value: gbp(result.soleTraderTotalTax),
      },
      {
        label: "Limited company total tax",
        value: gbp(result.limitedCompanyTotalTax),
      },
      {
        label: "NHS Pension impact",
        value:
          "Company dividends are not NHS pensionable, so incorporated private income loses NHS accrual.",
      },
    ];

    return {
      headline: {
        label: headlineLabel,
        value: gbp(Math.abs(taxSavings)),
        sub: monthlySub,
        tone: headlineTone,
      },
      scenarioResults: scenarios,
      breakdown: breakdownRows,
      chart: {
        data: [
          {
            name: "Total tax",
            soleTrader: Math.round(result.soleTraderTotalTax),
            ltd: Math.round(result.limitedCompanyTotalTax),
          },
          {
            name: "Net after tax",
            soleTrader: Math.round(result.soleTraderNetIncome),
            ltd: Math.round(result.limitedCompanyNetIncome),
          },
        ],
      },
      note:
        "2026/27 dividend basis (10.75% / 35.75% / 39.35%, FA 2026 s.4). CT 19% to £50,000, 25% above £250,000, marginal relief between, charged after the deductible director salary and the employer NIC on it. Employer NIC is 15% above the £5,000 secondary threshold, with no Employment Allowance for a single-director company. One company assumed, so the £50,000 and £250,000 limits are not divided for associated companies, and employee National Insurance on the director salary is not charged. A doctor's ordinary personal service company CANNOT hold a GMS/PMS contract and company income is not NHS pensionable, so this decision applies to PRIVATE work only. Dividends are taxed again on extraction and that is already in the Ltd figure. A director's loan taken ahead of dividends triggers a s.455 charge at 35.75% on post-6-April-2026 loans. The headline tax gap is modest at typical private-income levels and the real drivers are the annual allowance taper, retained earnings and family planning. This model does not value the NHS pension accrual lost, which can outweigh the tax saving. These are estimates, not advice.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "soleTrader", label: "Sole trader", color: "var(--gold)" },
      { dataKey: "ltd", label: "Limited company", color: "var(--navy)" },
    ],
  },
  explainer: {
    heading: "How this comparison works",
    paragraphs: [
      "A doctor with private practice income has two main routes: taking the profit directly as a sole trader (income tax on the total of NHS pay plus private profit, plus Class 4 NIC on the private profit at 6% up to £50,270 and 2% above), or channelling private income through a limited company (the director salary and the employer NIC on it come off the profit first, the company pays corporation tax at 19% on profits up to £50,000, 25% above £250,000, with marginal relief between, and the remainder is drawn as dividends). The 2026/27 dividend rates are 10.75% (basic), 35.75% (higher) and 39.35% (additional) following FA 2026 s.4.",
      "Your NHS income matters because it uses your personal allowance and basic-rate band first. A consultant already on the higher-rate income tax band from their NHS salary will find that all private profit is taxed at 40% or 45% as a sole trader. A limited company can defer the personal tax charge on retained earnings, but the corporation tax still applies, and dividends are taxed again when you extract them. The headline tax gap at typical private-income levels is often smaller than expected, and the 2026/27 dividend rate increase narrowed it further.",
      "The most important number is not in this tool: it is the NHS pension accrual you give up on incorporated dividends. A GMS or PMS contract sits with GPs, their partnerships, or a company limited by shares whose shareholders all qualify, never a doctor's ordinary personal service company, and dividends are not NHS pensionable, so incorporated private income does not build NHS benefits. For a doctor with many years ahead, the actuarial value of that pension loss can outweigh the lifetime tax saving from a company structure. The real drivers of the incorporation decision are the annual allowance taper position, the ability to retain earnings in the company, and wider family tax planning. A specialist medical accountant can model the full picture.",
    ],
  },
};
