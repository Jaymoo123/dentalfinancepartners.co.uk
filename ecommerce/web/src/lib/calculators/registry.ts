import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { sellerTakeHomeTool } from "./tools/seller-take-home";
import { vatThresholdTrackerTool } from "./tools/vat-threshold-tracker";
import { soleTraderVsLtdSellersTool } from "./tools/sole-trader-vs-ltd-sellers";
import { sideHustleTaxCheckerTool } from "./tools/side-hustle-tax-checker";

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  sellerTakeHomeTool,
  vatThresholdTrackerTool,
  soleTraderVsLtdSellersTool,
  sideHustleTaxCheckerTool,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
