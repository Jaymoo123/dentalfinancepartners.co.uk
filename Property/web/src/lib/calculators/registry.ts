import type { Tool, GenericTool } from "./types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { capitalGainsTaxCalculator } from "./tools/capital-gains-tax-calculator";
import { rentalIncomeTaxCalculator } from "./tools/rental-income-tax-calculator";
import { rentalYieldCalculator } from "./tools/rental-yield-calculator";
import { buyToLetCashflowCalculator } from "./tools/buy-to-let-cashflow-calculator";
import { lbttCalculator } from "./tools/lbtt-calculator";
import { lttCalculator } from "./tools/ltt-calculator";
import { firstTimeBuyerStampDutyCalculator } from "./tools/first-time-buyer-stamp-duty-calculator";
import { corporationTaxCalculator } from "./tools/corporation-tax-calculator";
import { dividendTaxCalculator } from "./tools/dividend-tax-calculator";
import { rentARoomReliefCalculator } from "./tools/rent-a-room-relief-calculator";
import { propertyAllowanceChecker } from "./tools/property-allowance-checker";

/**
 * The calculator fleet. "bespoke" tools have their own hand-built component +
 * page (the original five); "generic" tools live one-per-file under ./tools and
 * are rendered by <Calculator> via the dynamic /calculators/[slug] route. The
 * gallery, sitemap and navigation read this single registry, so adding a tool is
 * one import + one array entry.
 *
 * Registry helpers (allTools / genericTools / getGenericTool / toolPath) are now
 * provided by makeRegistryHelpers from the shared package, fulfilling TL-01.
 * The TOOLS export stays local (Property's own fleet) — the shared factory wraps it.
 *
 * Quality bar: every figure traces to docs/property/house_positions.md or HMRC.
 * No pricing/fees, no thin duplicates, honest disclaimers in each `note`.
 */

const BESPOKE: Tool[] = [
  {
    kind: "bespoke",
    slug: "stamp-duty-calculator",
    name: "Stamp Duty (SDLT) Calculator",
    category: "Stamp duty",
    oneLiner:
      "SDLT for England & NI, including the 5% buy-to-let / second-home surcharge, first-time-buyer relief and the 2% non-resident surcharge.",
    embedHeight: 620,
  },
  {
    kind: "bespoke",
    slug: "section-24-calculator",
    name: "Section 24 Tax Calculator",
    category: "Income tax",
    oneLiner:
      "The extra income tax the mortgage-interest restriction costs a landlord, by rent, mortgage interest and tax band.",
    embedHeight: 620,
  },
  {
    kind: "bespoke",
    slug: "incorporation-cost-calculator",
    name: "Incorporation Cost Calculator",
    category: "Incorporation",
    oneLiner:
      "The upfront CGT + SDLT of moving a rental into a limited company, plus the annual saving and break-even.",
    embedHeight: 740,
  },
  {
    kind: "bespoke",
    slug: "mtd-checker",
    name: "Making Tax Digital (MTD) Checker",
    category: "Compliance",
    oneLiner:
      "Whether a landlord must comply with Making Tax Digital for Income Tax, and from which April.",
    embedHeight: 560,
  },
  {
    kind: "bespoke",
    slug: "portfolio-profitability-calculator",
    name: "Portfolio Profitability Calculator",
    category: "Portfolio",
    oneLiner: "Net profit and gross / net yield across every property in a portfolio.",
    embedHeight: 900,
  },
];

const GENERIC: GenericTool[] = [
  capitalGainsTaxCalculator,
  rentalIncomeTaxCalculator,
  rentalYieldCalculator,
  buyToLetCashflowCalculator,
  lbttCalculator,
  lttCalculator,
  firstTimeBuyerStampDutyCalculator,
  corporationTaxCalculator,
  dividendTaxCalculator,
  rentARoomReliefCalculator,
  propertyAllowanceChecker,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

// Shared registry helpers — same contract as the previous hand-written functions.
const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
