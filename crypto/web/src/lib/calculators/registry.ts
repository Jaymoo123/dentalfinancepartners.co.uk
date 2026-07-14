import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { cryptoCgtEstimator } from "./tools/crypto-cgt-estimator";
import { cryptoDisclosureEstimator } from "./tools/crypto-disclosure-estimator";
import { investorVsTraderChecker } from "./tools/investor-vs-trader-checker";
import { stakingMiningIncomeEstimator } from "./tools/staking-mining-income-estimator";

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  cryptoCgtEstimator,
  cryptoDisclosureEstimator,
  investorVsTraderChecker,
  stakingMiningIncomeEstimator,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
