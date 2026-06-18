import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { cisDeductionCalculator } from "./tools/cis-deduction-calculator";
import { cisGpsEligibilityChecker } from "./tools/cis-gps-eligibility-checker";
import { cisRefundEstimator } from "./tools/cis-refund-estimator";
import { cisSelfAssessmentCalculator } from "./tools/cis-self-assessment-calculator";
import { cisTakeHomeCalculator } from "./tools/cis-take-home-calculator";
import { cisInvoiceSplitter } from "./tools/cis-invoice-splitter";
import { cisVsPayeComparison } from "./tools/cis-vs-paye-comparison";
import { cisBackYearsCalculator } from "./tools/cis-back-years-calculator";

/**
 * The CIS calculator fleet. "bespoke" tools have their own hand-built component
 * + page; "generic" tools live one-per-file under ./tools and are rendered by
 * <Calculator> via the dynamic /calculators/[slug] route. The gallery, sitemap
 * and navigation read this single registry, so adding a tool is one import +
 * one array entry.
 *
 * Registry helpers (allTools / genericTools / getGenericTool / toolPath) are
 * provided by makeRegistryHelpers from the shared package.
 *
 * Quality bar: every figure traces to HMRC guidance or the CIS regulations.
 * No pricing/fees, no thin duplicates, honest disclaimers in each `note`.
 */

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  cisDeductionCalculator,
  cisGpsEligibilityChecker,
  cisRefundEstimator,
  cisSelfAssessmentCalculator,
  cisTakeHomeCalculator,
  cisInvoiceSplitter,
  cisVsPayeComparison,
  cisBackYearsCalculator,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

// Shared registry helpers — same contract as Property's hand-written functions.
const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
