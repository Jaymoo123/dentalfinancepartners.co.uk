/**
 * Section 24 PREMIUM tool config — the flagship on-page interactive tool for the
 * Section 24 / mortgage-interest-relief category.
 *
 * Headline value: a PERSONAL vs COMPANY comparison. For the landlord's numbers
 * (rent, mortgage interest, other costs, tax band) it shows the income tax + net
 * cash profit as an INDIVIDUAL under the Section 24 restriction (full rents taxed
 * at the marginal rate, a 20%/22% finance-cost tax credit) vs through a COMPANY
 * (interest deducted in full, Corporation Tax) — and the difference between them.
 *
 * An optional editable MINI-GRID lets a landlord list several properties (rent +
 * interest + other costs each) and see the portfolio-level impact: the grid totals
 * override the scalar inputs when used.
 *
 * All math comes from lib/section24.ts (which itself reuses the locked corpTax
 * constants), so this tool, the existing Section24Calculator and the Excel model
 * can never disagree.
 */
import type { PremiumToolConfig, PremiumComputeContext, GridRow } from "../types";
import { computeSection24, gbp, type TaxBand } from "@/lib/section24";

const BAND_OPTIONS = [
  { value: "basic", label: "Basic rate (20%)" },
  { value: "higher", label: "Higher rate (40%)" },
  { value: "additional", label: "Additional rate (45%)" },
];

const YEAR_OPTIONS = [
  { value: "2026-27", label: "2026/27 (20% credit)" },
  { value: "2027-28", label: "2027/28 (22% credit)" },
];

/** Sum the grid rows into rent / interest / other totals (0 if no usable rows). */
function gridTotals(rows: GridRow[]): {
  rent: number;
  interest: number;
  other: number;
  used: boolean;
} {
  let rent = 0;
  let interest = 0;
  let other = 0;
  let used = false;
  for (const row of rows) {
    const r = Number(row.rent) || 0;
    const i = Number(row.interest) || 0;
    const o = Number(row.other) || 0;
    if (r > 0 || i > 0 || o > 0) used = true;
    rent += r;
    interest += i;
    other += o;
  }
  return { rent, interest, other, used };
}

function compute(ctx: PremiumComputeContext) {
  const taxBand = String(ctx.values.taxBand ?? "higher") as TaxBand;
  const year = String(ctx.values.year ?? "2026-27") as "2026-27" | "2027-28";

  // If the portfolio grid has any data, it drives the model (portfolio view);
  // otherwise fall back to the single-property scalar inputs.
  const totals = gridTotals(ctx.rows);
  const usingGrid = totals.used;
  const rentalIncome = usingGrid ? totals.rent : Number(ctx.values.rentalIncome) || 0;
  const mortgageInterest = usingGrid ? totals.interest : Number(ctx.values.mortgageInterest) || 0;
  const otherExpenses = usingGrid ? totals.other : Number(ctx.values.otherExpenses) || 0;

  const res = computeSection24({
    rentalIncome,
    mortgageInterest,
    otherExpenses,
    taxBand,
    year,
  });

  const companyLower = res.companyVsIndividualTax < 0;
  const diff = Math.abs(res.companyVsIndividualTax);

  const reducerPct = Math.round(res.reducerRate * 100);
  const propCount = usingGrid ? ctx.rows.filter((r) => Number(r.rent) > 0 || Number(r.interest) > 0).length : 1;
  const scopeNote = usingGrid
    ? `Portfolio view: ${propCount} propert${propCount === 1 ? "y" : "ies"} combined.`
    : "Single-property view. Add properties in the grid for a portfolio total.";

  return {
    headline: {
      label: companyLower ? "A company pays less tax here" : "An individual pays less tax here",
      value: gbp(diff),
      sub: companyLower ? "Lower tax in a company, per year" : "Lower tax personally, per year",
      tone: (companyLower ? "warn" : "good") as "warn" | "good",
    },
    // Side-by-side scenario columns: Individual (S24) vs Company.
    scenarioResults: [
      {
        id: "individual",
        label: "You (individual, Section 24)",
        best: !companyLower,
        headline: { label: "Income tax / year", value: gbp(res.s24Tax) },
        rows: [
          { label: "Rental profit before interest", value: gbp(res.rentalProfitBeforeFinance) },
          { label: `Tax before credit (${Math.round(res.marginalRate * 100)}%)`, value: gbp(res.s24TaxBeforeCredit) },
          { label: `Finance-cost credit (${reducerPct}%)`, value: `- ${gbp(res.s24Credit)}` },
          { label: "Income tax payable", value: gbp(res.s24Tax), strong: true },
          { label: "Net cash profit after tax", value: gbp(res.s24NetProfit), strong: true },
        ],
      },
      {
        id: "company",
        label: "A company (outside Section 24)",
        best: companyLower,
        headline: { label: "Corporation Tax / year", value: gbp(res.companyTax) },
        rows: [
          { label: "Profit (interest deducted in full)", value: gbp(res.companyProfit) },
          { label: `Corporation Tax (${res.companyEffectiveRate.toFixed(1)}%)`, value: gbp(res.companyTax), strong: true },
          { label: "Retained in company after CT", value: gbp(res.companyNetProfit), strong: true },
        ],
      },
    ],
    breakdown: [
      { label: "Section 24 vs old (full-deduction) system", value: `+ ${gbp(res.extraTax)} extra tax`, strong: true },
      { label: "Reducer rate applied", value: `${reducerPct}%` },
    ],
    chart: {
      data: [
        {
          name: "Tax per year",
          individual: res.s24Tax,
          company: res.companyTax,
        },
        {
          name: "Net profit after tax",
          individual: res.s24NetProfit,
          company: res.companyNetProfit,
        },
      ],
    },
    note:
      `${scopeNote} The company figure is Corporation Tax on retained profit only — extracting it as ` +
      "salary or dividends is taxed again personally (the calculator does not model extraction). " +
      "The Section 24 reducer is also capped by your total taxable income, which a single tool cannot see. " +
      "Incorporating an existing portfolio can trigger CGT and SDLT. These are estimates, not advice for your situation.",
  };
}

export const section24PremiumTool: PremiumToolConfig = {
  id: "section-24-premium",
  topic: "section-24",
  title: "Section 24: personal vs company calculator",
  intro:
    "See your income tax and net profit as an individual under the Section 24 restriction versus through a limited company, with the difference. Add your whole portfolio to model the combined impact.",
  fields: [
    {
      id: "rentalIncome",
      label: "Annual rental income",
      type: "currency",
      default: 50000,
      help: "Gross rents for the year (used unless you add properties in the grid below).",
    },
    {
      id: "mortgageInterest",
      label: "Annual mortgage interest",
      type: "currency",
      default: 20000,
      help: "Mortgage interest plus other allowable finance costs.",
    },
    {
      id: "otherExpenses",
      label: "Other running costs",
      type: "currency",
      default: 8000,
      help: "Allowable non-finance costs (repairs, agent fees, insurance, etc).",
    },
    {
      id: "taxBand",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: BAND_OPTIONS,
    },
    {
      id: "year",
      label: "Tax year",
      type: "select",
      default: "2026-27",
      options: YEAR_OPTIONS,
      help: "The finance-cost credit rises from 20% (2026/27) to 22% from 2027/28 (FA 2026).",
    },
  ],
  grid: {
    heading: "Or model your whole portfolio (optional)",
    columns: [
      { id: "name", label: "Property", type: "text" },
      { id: "rent", label: "Annual rent", type: "currency" },
      { id: "interest", label: "Mortgage interest", type: "currency" },
      { id: "other", label: "Other costs", type: "currency" },
    ],
    rowFactory: (index: number) => ({
      id: `prop-${index}-${Math.random().toString(36).slice(2, 8)}`,
      name: `Property ${index + 1}`,
      rent: 0,
      interest: 0,
      other: 0,
    }),
    minRows: 0,
    maxRows: 12,
    addLabel: "+ Add a property",
  },
  // No scenario switcher: the compute always returns BOTH scenario columns
  // (individual vs company) side by side, so a tab toggle would be dead UI.
  compute,
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    valueAxisLabel: "£ per year",
    series: [
      { dataKey: "individual", label: "Individual (Section 24)", color: "#f59e0b" },
      { dataKey: "company", label: "Company", color: "#10b981" },
    ],
  },
  explainer: {
    heading: "How this comparison works",
    paragraphs: [
      "As an individual landlord, Section 24 stops you deducting mortgage interest from your rental profit. Your full rents (less non-finance costs) are taxed at your marginal rate, and you get a basic-rate tax credit (20% for 2026/27, rising to 22% from 2027/28) on the finance costs. For a higher or additional-rate landlord that credit is well below your tax rate, so the interest is effectively taxed.",
      "A limited company is outside Section 24: it deducts mortgage interest in full before Corporation Tax (19% on profits up to £50,000, 25% above £250,000, with marginal relief in between). That is why incorporation often looks attractive for heavily-geared, higher-rate landlords.",
      "The company column shows Corporation Tax on profit retained in the company only. Taking that money out as salary or dividends is taxed again in your hands, and moving an existing portfolio into a company can trigger Capital Gains Tax and Stamp Duty Land Tax. Use this as a first-pass comparison, then get the full picture modelled for your situation.",
    ],
  },
};
