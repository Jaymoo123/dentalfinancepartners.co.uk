import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { pharmacyPurchaseAffordability } from "./tools/pharmacy-purchase-affordability";
import { pharmacyFp34CashFlowEstimator } from "./tools/pharmacy-fp34-cash-flow-estimator";
import { locumTakeHomeComparator } from "./tools/locum-take-home-comparator";

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  pharmacyPurchaseAffordability,
  pharmacyFp34CashFlowEstimator,
  locumTakeHomeComparator,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
