/**
 * Landlord tax essentials PREMIUM tool — the on-page interactive tool for the
 * "landlord-essentials" category.
 *
 * Headline value: your rental PROFIT and the INCOME TAX on it. The tool takes
 * rent, allowable expenses and mortgage interest, applies the £1,000 property
 * allowance where it beats your actual expenses, taxes the profit in the right
 * band(s) ON TOP of your other income (so a large profit can span bands and the
 * £100k personal-allowance taper is captured), and gives the Section 24
 * finance-cost credit. The result shows tax, take-home and an effective rate.
 *
 * An editable MINI-GRID lets a landlord list several properties (rent + expenses
 * + interest each) and see the COMBINED taxable profit and tax for the whole
 * portfolio — the grid drives the model when it has data; otherwise the single
 * scalar inputs are treated as one property.
 *
 * All math comes from lib/landlordTax.ts (which reuses the Section 24 reducer
 * rates from lib/section24.ts), so this tool, the Excel model and the existing
 * rental-income-tax-calculator cannot disagree on the finance-cost treatment.
 */
import type { PremiumToolConfig, PremiumComputeContext, GridRow } from "../types";
import {
  computePortfolio,
  bandRates,
  gbp,
  type TaxYear,
  type PropertyInput,
} from "@/lib/landlordTax";

const YEAR_OPTIONS = [
  { value: "2026-27", label: "2026/27 (20/40/45, 20% credit)" },
  { value: "2027-28", label: "2027/28 (22/42/47, 22% credit)" },
];

/** Turn the grid rows into PropertyInput[] (skips wholly-empty rows). */
function gridProperties(rows: GridRow[]): { properties: PropertyInput[]; used: boolean } {
  const properties: PropertyInput[] = [];
  for (const row of rows) {
    const rent = Number(row.rent) || 0;
    const expenses = Number(row.expenses) || 0;
    const interest = Number(row.interest) || 0;
    if (rent <= 0 && expenses <= 0 && interest <= 0) continue;
    properties.push({
      name: String(row.name ?? "").trim() || undefined,
      rent,
      expenses,
      interest,
    });
  }
  return { properties, used: properties.length > 0 };
}

function compute(ctx: PremiumComputeContext) {
  const year = (String(ctx.values.year ?? "2026-27") as TaxYear) ?? "2026-27";
  const otherIncome = Number(ctx.values.otherIncome) || 0;

  // The grid drives the model when it has any data; otherwise use the single
  // scalar property inputs.
  const grid = gridProperties(ctx.rows);
  const properties: PropertyInput[] = grid.used
    ? grid.properties
    : [
        {
          name: "Property 1",
          rent: Number(ctx.values.rentalIncome) || 0,
          expenses: Number(ctx.values.expenses) || 0,
          interest: Number(ctx.values.mortgageInterest) || 0,
        },
      ];

  const res = computePortfolio({ properties, otherIncome, year });
  const rates = bandRates(year);
  const reducerPct = Math.round(res.reducerRate * 100);
  const propCount = properties.length;

  const usedPA = res.properties.some((p) => p.usedPropertyAllowance);
  const scopeNote = grid.used
    ? `Portfolio view: ${propCount} propert${propCount === 1 ? "y" : "ies"} combined.`
    : "Single-property view. Add properties in the grid below for a portfolio total.";

  const bandLabel =
    res.topBand === "additional"
      ? `additional rate (${Math.round(rates.additional * 100)}%)`
      : res.topBand === "higher"
        ? `higher rate (${Math.round(rates.higher * 100)}%)`
        : `basic rate (${Math.round(rates.basic * 100)}%)`;

  // Breakdown rows beneath the headline.
  const breakdown = [
    { label: "Total rent received", value: gbp(res.totalRent) },
    {
      label: usedPA ? "Allowable expenses (incl. £1,000 allowance where better)" : "Allowable running costs",
      value: `- ${gbp(res.totalExpensesUsed)}`,
    },
    { label: "Taxable rental profit (interest NOT deducted)", value: gbp(res.totalTaxableProfit), strong: true },
    { label: `Income tax before credit (top slice in the ${bandLabel})`, value: gbp(res.taxBeforeCredit) },
    { label: `Section 24 finance-cost credit (${reducerPct}% of interest, capped)`, value: `- ${gbp(res.financeCredit)}` },
    { label: "Income tax payable on the rentals", value: gbp(res.incomeTax), strong: true },
    { label: "Mortgage interest paid", value: `- ${gbp(res.totalInterest)}` },
    { label: "Net cash kept after tax & interest", value: gbp(res.netCashProfit), strong: true },
  ];

  // Chart 1 data feeds a single stacked/grouped bar of where the money goes.
  const chartData = [
    {
      name: "Where the rent goes",
      expenses: res.totalExpensesUsed,
      interest: res.totalInterest,
      tax: res.incomeTax,
      netCash: Math.max(0, res.netCashProfit),
    },
  ];

  const effective = res.effectiveRate.toFixed(1);

  return {
    headline: {
      label: "Income tax on your rental profit",
      value: gbp(res.incomeTax),
      sub: `${gbp(res.netCashProfit)} kept after tax & mortgage · ${effective}% of profit`,
      tone: "default" as const,
    },
    breakdown,
    chart: { data: chartData },
    note:
      `${scopeNote} The tax is worked out on your rental profit sitting ON TOP of the other income you entered ` +
      `(${gbp(otherIncome)}), so it lands in the right band(s) and the £100,000 personal-allowance taper is captured. ` +
      "Mortgage interest is not deducted from profit (Section 24): instead you get a basic-rate credit " +
      `(${reducerPct}% for ${year === "2027-28" ? "2027/28" : "2026/27"}), capped at the lower of the credit rate times your ` +
      "finance costs, your rental profit, or your income above the personal allowance. The £1,000 property allowance is " +
      "applied automatically where it beats your actual expenses. These are estimates for England, Wales and NI, not advice " +
      "for your situation, and they do not model student-loan repayments, the High Income Child Benefit Charge or Scotland's rates.",
  };
}

export const landlordEssentialsPremiumTool: PremiumToolConfig = {
  id: "landlord-essentials-premium",
  topic: "landlord-essentials",
  title: "Landlord rental profit & income tax calculator",
  intro:
    "Work out your taxable rental profit and the income tax on it, with the £1,000 property allowance, the Section 24 mortgage-interest credit and your tax band all handled. Add several properties to see your whole portfolio at once.",
  fields: [
    {
      id: "rentalIncome",
      label: "Annual rental income",
      type: "currency",
      default: 18000,
      help: "Gross rents for the year (used as one property unless you add rows in the grid below).",
    },
    {
      id: "expenses",
      label: "Allowable running costs",
      type: "currency",
      default: 3000,
      help: "Repairs, letting/agent fees, insurance, ground rent, accountancy. NOT mortgage interest, and NOT capital improvements.",
    },
    {
      id: "mortgageInterest",
      label: "Annual mortgage interest",
      type: "currency",
      default: 6000,
      help: "Mortgage interest plus other allowable finance costs. Restricted under Section 24 (treated as a credit, not a deduction).",
    },
    {
      id: "otherIncome",
      label: "Your other taxable income",
      type: "currency",
      default: 40000,
      help: "Salary, pension and other taxable income before the rentals. We add the rental profit on top to find the right tax band.",
    },
    {
      id: "year",
      label: "Tax year",
      type: "select",
      default: "2026-27",
      options: YEAR_OPTIONS,
      help: "From 2027/28 property income in England, Wales & NI is taxed at 22/42/47 and the Section 24 credit rises to 22% (FA 2026).",
    },
  ],
  grid: {
    heading: "Or list your properties (optional — overrides the single property above)",
    columns: [
      { id: "name", label: "Property", type: "text" },
      { id: "rent", label: "Annual rent", type: "currency" },
      { id: "expenses", label: "Running costs", type: "currency" },
      { id: "interest", label: "Mortgage interest", type: "currency" },
    ],
    rowFactory: (index: number) => ({
      id: `prop-${index}-${Math.random().toString(36).slice(2, 8)}`,
      name: `Property ${index + 1}`,
      rent: 0,
      expenses: 0,
      interest: 0,
    }),
    minRows: 0,
    maxRows: 15,
    addLabel: "+ Add a property",
  },
  compute,
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    valueAxisLabel: "£ per year",
    series: [
      { dataKey: "netCash", label: "Net cash you keep", color: "#10b981" },
      { dataKey: "tax", label: "Income tax", color: "#f59e0b" },
      { dataKey: "interest", label: "Mortgage interest", color: "#6366f1" },
      { dataKey: "expenses", label: "Running costs", color: "#94a3b8" },
    ],
  },
  explainer: {
    heading: "How your rental income is taxed",
    paragraphs: [
      "As an individual landlord you pay income tax on your rental PROFIT, which is your gross rents less your allowable running costs: repairs, letting and management fees, insurance, ground rent, accountancy and similar revenue costs. Capital improvements are not deductible against income (they may reduce a future Capital Gains Tax bill instead), and mortgage interest is handled separately.",
      "Your rental profit is added to your other income and taxed at your marginal rate, so the band you land in depends on everything you earn. That is why this tool asks for your other income: a profit that looks basic-rate on its own can be taxed at 40% once it sits on top of a salary, and above £100,000 of total income you also start to lose your personal allowance.",
      "Mortgage interest is restricted by Section 24. You cannot deduct it from profit; instead your full profit is taxed and you receive a basic-rate tax credit on the interest (20% for 2026/27, rising to 22% from 2027/28). The credit is capped, so for higher and additional-rate landlords the effective tax on a geared rental is higher than the headline profit suggests.",
      "If your gross rents are £1,000 or less you need not declare them at all (the £1,000 property allowance gives full relief). If they are higher, you can choose to deduct the £1,000 allowance INSTEAD of your actual expenses where that leaves you better off; this tool picks whichever is better for you automatically. Get your exact position, and the most tax-efficient structure, confirmed before you file.",
    ],
  },
};
