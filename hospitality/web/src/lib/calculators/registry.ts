import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { troncCalculator } from "./tools/tronc";
import { vatCheckerTool } from "./tools/vat-checker";
import { staffCostTool } from "./tools/staff-cost";

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [troncCalculator, vatCheckerTool, staffCostTool];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
