/**
 * Incorporation PREMIUM tool config — the flagship on-page interactive tool for the
 * "Incorporation and company structures" category.
 *
 * Headline value: a STAY-PERSONAL vs INCORPORATE comparison. For the landlord's
 * numbers (property value + base cost, rents, mortgage interest, tax band) it shows:
 *   - the UPFRONT cost of moving the property into a company (Capital Gains Tax on
 *     the deemed market-value disposal + Stamp Duty Land Tax at standard bands plus
 *     the 5% additional-dwelling surcharge), and
 *   - the ANNUAL tax saving the company structure gives (Section 24 income tax
 *     personally vs Corporation Tax + dividend-extraction tax in the company), and
 *   - the BREAK-EVEN point: how many years of saving it takes to recover that cost.
 *
 * A recharts view plots the upfront cost against the CUMULATIVE saving year by year,
 * so the crossover (break-even) is visible at a glance.
 *
 * All math comes from lib/incorporation.ts, which itself reuses the locked CGT,
 * SDLT, Section 24, Corporation Tax and dividend-tax modules, so this tool, the
 * existing IncorporationCostCalculator and the Excel model can never disagree.
 */
import type { PremiumToolConfig, PremiumComputeContext } from "../types";
import {
  computeIncorporation,
  gbp,
  NEVER_BREAKS_EVEN,
  type TaxBand,
  type TaxYear,
} from "@/lib/incorporation";

const BAND_OPTIONS = [
  { value: "basic", label: "Basic rate (20%)" },
  { value: "higher", label: "Higher rate (40%)" },
  { value: "additional", label: "Additional rate (45%)" },
];

const YEAR_OPTIONS = [
  { value: "2026-27", label: "2026/27 (20% S24 credit)" },
  { value: "2027-28", label: "2027/28 (22% S24 credit)" },
];

const RELIEF_OPTIONS = [
  { value: "no", label: "No, pay CGT on transfer" },
  { value: "yes", label: "Yes, s.162 relief claimed (CGT deferred)" },
];

const EXTRACT_OPTIONS = [
  { value: "extract", label: "Draw it all out as dividends" },
  { value: "retain", label: "Retain and reinvest in the company" },
];

/** Number of years to plot the cumulative-saving line over. */
const HORIZON_YEARS = 15;

function compute(ctx: PremiumComputeContext) {
  const taxBand = String(ctx.values.taxBand ?? "higher") as TaxBand;
  const year = String(ctx.values.year ?? "2026-27") as TaxYear;
  const s162Relief = String(ctx.values.s162Relief ?? "no") === "yes";
  const retainInCompany = String(ctx.values.extraction ?? "extract") === "retain";

  const res = computeIncorporation({
    propertyValue: Number(ctx.values.propertyValue) || 0,
    purchasePrice: Number(ctx.values.purchasePrice) || 0,
    annualRentalIncome: Number(ctx.values.annualRentalIncome) || 0,
    mortgageInterest: Number(ctx.values.mortgageInterest) || 0,
    otherExpenses: Number(ctx.values.otherExpenses) || 0,
    otherIncome: Number(ctx.values.otherIncome) || 0,
    taxBand,
    year,
    s162Relief,
    retainInCompany,
  });

  const worthwhile = res.worthwhile;
  const breaksEvenWithin = res.breakEvenYears <= HORIZON_YEARS;

  // Headline: the verdict. If incorporating saves tax, lead with the break-even;
  // if it does not, lead with the fact it costs more each year.
  const headline = worthwhile
    ? {
        label: breaksEvenWithin
          ? "Incorporating breaks even in"
          : "Incorporating saves tax, but recovers slowly",
        value: breaksEvenWithin
          ? `${res.breakEvenYears.toFixed(1)} years`
          : `${gbp(res.annualSaving)}/yr`,
        sub: breaksEvenWithin
          ? `after a ${gbp(res.totalUpfrontCost)} upfront cost`
          : `${gbp(res.totalUpfrontCost)} upfront takes ${res.breakEvenYears.toFixed(0)} years to recover`,
        tone: (breaksEvenWithin ? "good" : "warn") as "good" | "warn",
      }
    : {
        label: "Incorporating costs more here",
        value: `${gbp(Math.abs(res.annualSaving))}/yr`,
        sub: "the company route is more expensive each year on these figures",
        tone: "warn" as const,
      };

  const cgtLabel = res.s162Applied
    ? "CGT on transfer (s.162 relief, deferred)"
    : `CGT on transfer (${res.capitalGain > 0 ? ((res.cgtCost / res.capitalGain) * 100).toFixed(0) : 0}% of gain)`;

  // Cumulative-saving series for the recharts crossover view: a flat upfront-cost
  // line and a rising cumulative-saving line; where they cross is the break-even.
  const chartData = [];
  for (let yr = 0; yr <= HORIZON_YEARS; yr++) {
    chartData.push({
      name: `Yr ${yr}`,
      upfrontCost: res.totalUpfrontCost,
      cumulativeSaving: Math.max(0, res.annualSaving) * yr,
    });
  }

  return {
    headline,
    // Side-by-side scenario columns: stay personal vs incorporate.
    scenarioResults: [
      {
        id: "personal",
        label: "Stay in your own name",
        best: !worthwhile,
        headline: { label: "Income tax / year", value: gbp(res.personalTax) },
        rows: [
          { label: "Upfront cost to switch", value: gbp(0) },
          { label: "Income tax under Section 24 (per year)", value: gbp(res.personalTax), strong: true },
          { label: "Cash kept after tax (per year)", value: gbp(res.personalNetProfit), strong: true },
        ],
      },
      {
        id: "company",
        label: "Incorporate (limited company)",
        best: worthwhile,
        headline: { label: "Total tax / year", value: gbp(res.totalCompanyTax) },
        rows: [
          { label: cgtLabel, value: gbp(res.cgtCost) },
          { label: "SDLT (standard bands + 5% surcharge)", value: gbp(res.sdltCost) },
          { label: "Upfront cost to incorporate", value: gbp(res.totalUpfrontCost), strong: true },
          { label: `Corporation Tax (${res.corporationTaxEffectiveRate.toFixed(1)}%)`, value: gbp(res.corporationTax) },
          {
            label: retainInCompany ? "Dividend tax (profit retained, none)" : "Dividend tax on extracting profit",
            value: gbp(res.dividendTax),
          },
          { label: "Total tax per year (CT + dividends)", value: gbp(res.totalCompanyTax), strong: true },
        ],
      },
    ],
    breakdown: [
      { label: "Upfront cost (CGT + SDLT)", value: gbp(res.totalUpfrontCost), strong: true },
      { label: "Annual tax saving from the company", value: `${res.annualSaving >= 0 ? "" : "- "}${gbp(Math.abs(res.annualSaving))}` },
      {
        label: "Break-even",
        value: res.breakEvenYears >= NEVER_BREAKS_EVEN ? "Never (no annual saving)" : `${res.breakEvenYears.toFixed(1)} years`,
        strong: true,
      },
    ],
    chart: { data: chartData },
    note:
      "Upfront cost assumes a market-value transfer of the property into the company: CGT on the gain " +
      "(after the £3,000 annual exempt amount, at 18% within your unused basic-rate band and 24% above) " +
      "and SDLT at standard bands plus the 5% additional-dwelling surcharge on the whole value. " +
      (s162Relief
        ? "You have assumed s.162 incorporation relief applies, so the CGT is deferred. That needs a genuine business (typically a portfolio under active management), ALL assets transferred for shares, and (for transfers on/after 6 April 2026) a claim. "
        : "s.162 incorporation relief can defer the CGT where the lettings are a genuine business and all assets transfer for shares. Toggle it above to model that. ") +
      (retainInCompany
        ? "You are retaining profit in the company, so only Corporation Tax applies. The saving disappears if you later draw the money out as dividends. "
        : "The company saving assumes you extract all post-tax profit as dividends and pay personal dividend tax on it. ") +
      "Company buy-to-let mortgages usually cost more, and a £500k+ dwelling brings ATED (relieved for genuine commercial lets, but the return must still be filed). These are estimates, not advice for your situation.",
  };
}

export const incorporationPremiumTool: PremiumToolConfig = {
  id: "incorporation-premium",
  topic: "incorporation",
  title: "Stay personal vs incorporate: cost and break-even calculator",
  intro:
    "Weigh the upfront cost of moving a property into a limited company (Capital Gains Tax + Stamp Duty) against the annual tax saving, and see how many years it takes to break even.",
  // All inputs are shown in order; PremiumCalculator caps the inputs panel height
  // and scrolls it on the compact (blog) layout, so a long list never runs tall.
  fields: [
    {
      id: "propertyValue",
      label: "Current property value",
      type: "currency",
      default: 300000,
      min: 0,
      max: 2000000,
      step: 10000,
      help: "Market value transferred into the company (drives both CGT and SDLT).",
    },
    {
      id: "purchasePrice",
      label: "Original purchase price",
      type: "currency",
      default: 200000,
      min: 0,
      max: 2000000,
      step: 10000,
      help: "Your base cost. The gain is roughly today's value minus this.",
    },
    {
      id: "annualRentalIncome",
      label: "Annual rental income",
      type: "currency",
      default: 24000,
      min: 0,
      max: 150000,
      step: 1000,
      help: "Gross rents for the year.",
    },
    {
      id: "mortgageInterest",
      label: "Annual mortgage interest",
      type: "currency",
      default: 9000,
      min: 0,
      max: 100000,
      step: 1000,
      help: "Mortgage interest plus other finance costs (restricted personally under Section 24).",
    },
    {
      id: "otherExpenses",
      label: "Other running costs",
      type: "currency",
      default: 3000,
      min: 0,
      max: 60000,
      step: 500,
      help: "Allowable non-finance costs (repairs, agent fees, insurance, etc).",
    },
    {
      id: "taxBand",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: BAND_OPTIONS,
      help: "Drives your Section 24 rate, your CGT rate split and your dividend rate.",
    },
    {
      id: "extraction",
      label: "Profit you take out of the company",
      type: "select",
      default: "extract",
      options: EXTRACT_OPTIONS,
      help: "Retaining and reinvesting profit is where the company structure shines.",
    },
    {
      id: "s162Relief",
      label: "Claim s.162 incorporation relief?",
      type: "select",
      default: "no",
      options: RELIEF_OPTIONS,
      help: "Defers the CGT where the lettings are a genuine business and all assets transfer for shares.",
    },
    {
      id: "year",
      label: "Tax year",
      type: "select",
      default: "2026-27",
      options: YEAR_OPTIONS,
      help: "The Section 24 finance-cost credit rises from 20% (2026/27) to 22% from 2027/28 (FA 2026).",
    },
  ],
  // No scenario switcher: compute always returns BOTH scenario columns (stay personal
  // vs incorporate) side by side, so a tab toggle would be dead UI.
  compute,
  chart: {
    kind: "line",
    valueFormat: "currency",
    valueAxisLabel: "£",
    series: [
      { dataKey: "upfrontCost", label: "Upfront cost (CGT + SDLT)", color: "#f59e0b" },
      { dataKey: "cumulativeSaving", label: "Cumulative tax saving", color: "#10b981" },
    ],
  },
  explainer: {
    heading: "How this comparison works",
    paragraphs: [
      "Holding rental property in your own name means the Section 24 restriction: you cannot deduct mortgage interest from rental profit, so for a higher-rate landlord the interest is effectively taxed. A limited company is outside Section 24 and deducts interest in full before Corporation Tax (19% on profits up to £50,000, 25% above £250,000, with marginal relief in between). That difference is the annual saving the tool measures.",
      "Moving an existing property into a company is not free. It is a disposal at market value, so Capital Gains Tax can arise on the gain (after the £3,000 annual exempt amount, at 18% within your unused basic-rate band and 24% above). The company's purchase also pays SDLT at standard rates plus the 5% additional-dwelling surcharge on the whole value. s.162 incorporation relief can defer the CGT where the lettings are a genuine business and all assets transfer for shares, but it must now be claimed for transfers on or after 6 April 2026, and HMRC scrutinises whether residential letting really is a business.",
      "The company's money is not your money. Unless you retain and reinvest it, taking profit out as dividends is taxed again in your hands (8.75% / 33.75% / 39.35%), which is why the tool lets you toggle extraction. Company buy-to-let mortgages typically cost more, a £500k-plus dwelling brings ATED (relieved for genuine commercial lets but the return must still be filed), and there is ongoing company admin. Use this as a first-pass model, then get your actual portfolio run property by property.",
    ],
  },
};
