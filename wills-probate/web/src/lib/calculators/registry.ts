import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { pensionsIht2027Estimator } from "./tools/pensions-iht-2027-estimator";
import { probateTimelineEstimator } from "./tools/probate-timeline-estimator";
import { ihtThresholdCalculator } from "./tools/iht-threshold-calculator";
import { probateCostCalculator } from "./tools/probate-cost-calculator";
import { doINeedProbateChecker } from "./tools/do-i-need-probate-checker";
import { probateDiyVsSolicitor } from "./tools/probate-diy-vs-solicitor";
import { makingAWillChecklist } from "./tools/making-a-will-checklist";

/**
 * wills-probate calculator fleet: the 7-tool probate/IHT fleet
 * (probate-cost-calculator, do-i-need-probate-checker,
 * iht-threshold-calculator, probate-timeline-estimator,
 * pensions-iht-2027-estimator, probate-diy-vs-solicitor,
 * making-a-will-checklist).
 *
 * Registry helpers (allTools / genericTools / getGenericTool / toolPath) are
 * provided by makeRegistryHelpers from the shared package.
 */

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  pensionsIht2027Estimator,
  probateTimelineEstimator,
  ihtThresholdCalculator,
  probateCostCalculator,
  doINeedProbateChecker,
  probateDiyVsSolicitor,
  makingAWillChecklist,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

// Shared registry helpers — same contract as Property's hand-written functions.
const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
