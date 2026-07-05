/**
 * Tool 2: CIS vs PAYE take-home comparison (premium).
 *
 * Topic mapping: limited-company. Blog category: Limited Company (limited-company).
 * Primary calculator: cis-vs-paye-comparison.
 *
 * Compute reuse: wraps cis-vs-paye-comparison maths via cis-tax.ts helpers.
 * CIS side uses saLiability() (income tax + Class 4 6%/2%).
 * PAYE side uses class1EmployeeNi() (employee Class 1 8%/2%).
 * No maths forked.
 *
 * HP traces:
 *   CIS rates                     - HP §1
 *   PA £12,570, income tax bands  - HP §11a
 *   Class 4 NI 6%/2%              - HP §11a
 *   Employee Class 1 NI 8%/2%     - HP §11a (employer NIC out of scope, see §0 flag 2)
 *
 * Tokens: var(--accent) = orange, var(--dark) = slate. No --gold, no --navy.
 */
import type { PremiumToolConfig } from "../types";
import {
  saLiability,
  class1EmployeeNi,
  PERSONAL_ALLOWANCE,
  BASIC_RATE_LIMIT,
  INCOME_TAX_RATES,
  CIS_RATES,
} from "../../cis-tax";
import { gbp } from "../../format";

export const cisVsPayeConfig: PremiumToolConfig = {
  id: "cis-vs-paye-premium",
  topic: "limited-company",
  title: "CIS vs PAYE Take-Home Comparison",
  intro:
    "CIS self-employment and PAYE employment are taxed very differently at the same gross earnings. See the like-for-like take-home difference, including the expense advantage and the cash-flow timing effect of CIS deductions.",
  fields: [
    {
      id: "grossEarnings",
      label: "Gross annual earnings",
      type: "currency",
      default: 45000,
      step: 1000,
      help: "For CIS: your total labour invoiced. For PAYE: your annual salary. The comparison runs both calculations at this figure.",
    },
    {
      id: "cisExpenses",
      label: "Annual business expenses (CIS path only)",
      type: "currency",
      default: 5000,
      step: 500,
      help: "Mileage at 55p per mile (first 10,000 miles from April 2026), tools, PPE, van running costs and other allowable expenses.",
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
  compute: ({ values }) => {
    const gross = Number.isFinite(Number(values.grossEarnings)) ? Number(values.grossEarnings) : 0;
    const expenses = Number.isFinite(Number(values.cisExpenses)) ? Number(values.cisExpenses) : 0;
    const cisRateNum = Number.isFinite(Number(values.cisRate)) ? Number(values.cisRate) / 100 : CIS_RATES.registered;

    // --- CIS PATH (HP §11a) ---
    const cisProfit = Math.max(0, gross - expenses);
    const cisLiability = saLiability({ profit: cisProfit, otherIncome: 0 });
    const cisTotalTax = cisLiability.incomeTax + cisLiability.class4Ni;
    const cisTakeHome = gross - expenses - cisTotalTax;
    const cisAdvanceDeducted = gross * cisRateNum;

    // --- PAYE PATH (HP §11a) ---
    const payeTaxable = Math.max(0, gross - PERSONAL_ALLOWANCE);
    const payeIncomeTax =
      Math.min(payeTaxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic +
      Math.max(0, payeTaxable - BASIC_RATE_LIMIT) * INCOME_TAX_RATES.higher;
    const payeNi = class1EmployeeNi(gross);
    const payeTotalTax = payeIncomeTax + payeNi;
    const payeTakeHome = gross - payeTotalTax;

    const takeHomeDiff = cisTakeHome - payeTakeHome;
    const cisWins = takeHomeDiff >= 0;

    const note =
      "2026/27 rates: PA £12,570, basic rate 20%, higher rate 40% (HP §11a). " +
      "CIS: income tax at 20%/40%, Class 4 NI 6%/2%. PAYE: income tax identical, employee Class 1 NI 8%/2%. " +
      "CIS take-home assumes the year-end Self Assessment refund is received. Employer NIC is the engager's cost and is excluded from this subcontractor comparison. " +
      "PAYE figures assume no employment benefits or pension contributions.";

    return {
      headline: {
        label: cisWins ? "CIS take-home advantage" : "PAYE take-home advantage",
        value: gbp(Math.abs(takeHomeDiff)),
        tone: "good",
        sub: `CIS: ${gbp(cisTakeHome)} vs PAYE: ${gbp(payeTakeHome)} annual take-home`,
      },
      rows: [],
      scenarioResults: [
        {
          id: "cis",
          label: "CIS self-employed",
          best: cisWins,
          headline: {
            label: "Annual take-home",
            value: gbp(cisTakeHome),
            tone: "good",
          },
          rows: [
            { label: "Gross earnings", value: gbp(gross) },
            { label: "Less allowable expenses", value: `−${gbp(expenses)}` },
            { label: "Income tax", value: gbp(cisLiability.incomeTax) },
            { label: "Class 4 NI (6%/2%)", value: gbp(cisLiability.class4Ni) },
            { label: "Take-home", value: gbp(cisTakeHome), strong: true },
          ],
        },
        {
          id: "paye",
          label: "PAYE employee",
          best: !cisWins,
          headline: {
            label: "Annual take-home",
            value: gbp(payeTakeHome),
            tone: "good",
          },
          rows: [
            { label: "Gross earnings", value: gbp(gross) },
            { label: "Income tax", value: gbp(payeIncomeTax) },
            { label: "Employee NI (Class 1 8%/2%)", value: gbp(payeNi) },
            { label: "Take-home", value: gbp(payeTakeHome), strong: true },
          ],
        },
      ],
      breakdown: [
        { label: `CIS advance deducted at source (${Number(values.cisRate ?? "20")}%)`, value: gbp(cisAdvanceDeducted) },
        { label: "CIS cash-flow note", value: "The CIS advance is recovered via Self Assessment, cash-flow timing only" },
      ],
      chart: {
        data: [
          {
            name: "CIS",
            takeHome: cisTakeHome,
            totalTax: cisTotalTax,
          },
          {
            name: "PAYE",
            takeHome: payeTakeHome,
            totalTax: payeTotalTax,
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
        dataKey: "takeHome",
        label: "Take-home",
        color: "var(--accent)",
      },
      {
        dataKey: "totalTax",
        label: "Total tax and NIC",
        color: "var(--dark)",
      },
    ],
  },
  explainer: {
    heading: "CIS versus PAYE: what really changes",
    paragraphs: [
      "The core difference is that CIS subcontractors can deduct genuine business expenses from their gross income before calculating tax, whereas PAYE employees cannot claim equivalent deductions against their salary. Mileage at 55p per mile (first 10,000 miles from April 2026), tools, PPE and van running costs all reduce the taxable profit of a self-employed CIS worker, often resulting in a lower effective tax rate than a PAYE employee at the same gross earnings.",
      "The cash flow picture is more complicated. CIS deductions are taken at source by the contractor at 20% or 30% of the gross labour payment. Those deductions frequently exceed the subcontractor's actual income tax and NI liability for the year, creating an overpayment that sits with HMRC until Self Assessment is filed. The annual take-home figures above assume the refund is received in full. PAYE employees have the correct tax collected each pay period with no year-end settlement.",
      "The non-financial factors matter too. PAYE employees have statutory employment rights including sick pay, holiday pay and redundancy entitlement. CIS subcontractors have none of these protections. Getting the classification wrong exposes both the contractor and worker to reclassification and backdated liabilities. This calculator uses 2026/27 rates and is an estimate only.",
    ],
  },
};
