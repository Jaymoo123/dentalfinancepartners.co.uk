import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { trueCostCareHourTool } from "./tools/true-cost-care-hour";
import { sleepInNmwTool } from "./tools/sleep-in-nmw";
import { careStaffingMarginTool } from "./tools/care-staffing-margin";
import { fncFeeMixTool } from "./tools/fnc-fee-mix";
import { cqcFeeCalculatorTool } from "./tools/cqc-fee-calculator";

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  trueCostCareHourTool,
  sleepInNmwTool,
  careStaffingMarginTool,
  fncFeeMixTool,
  cqcFeeCalculatorTool,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
