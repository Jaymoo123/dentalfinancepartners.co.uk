import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { rdReliefEstimator } from "./tools/rd-relief-estimator";
import { seisEisReliefCalculator } from "./tools/seis-eis-relief-calculator";
import { emiVsUnapprovedCalculator } from "./tools/emi-vs-unapproved-calculator";
import { founderDividendVsSalaryCalculator } from "./tools/founder-dividend-vs-salary-calculator";

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  rdReliefEstimator,
  seisEisReliefCalculator,
  emiVsUnapprovedCalculator,
  founderDividendVsSalaryCalculator,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
