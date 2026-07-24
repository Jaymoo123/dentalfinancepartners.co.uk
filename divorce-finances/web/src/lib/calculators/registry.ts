import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { divorceCostCalculator } from "./tools/divorce-cost-calculator";
import { helpWithFeesChecker } from "./tools/help-with-fees-checker";
import { consentOrderCostCalculator } from "./tools/consent-order-cost-calculator";
import { settlementRangeEstimator } from "./tools/settlement-range-estimator";
import { mediationVsSolicitorCosts } from "./tools/mediation-vs-solicitor-costs";

/**
 * The divorce-finances calculator fleet. All generic (config-driven), rendered
 * by <Calculator> via the dynamic /calculators/[slug] route. Gallery, sitemap
 * and navigation read this single registry.
 *
 * Quality bar: court fees trace to the HMCTS schedule (13 July 2026 uplift),
 * Help with Fees thresholds to gov.uk; market cost bands are labelled as
 * estimates in every output. No legal or financial advice language anywhere
 * except in negation. Settlement estimator is indicative-range only.
 */

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  divorceCostCalculator,
  helpWithFeesChecker,
  consentOrderCostCalculator,
  settlementRangeEstimator,
  mediationVsSolicitorCosts,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
