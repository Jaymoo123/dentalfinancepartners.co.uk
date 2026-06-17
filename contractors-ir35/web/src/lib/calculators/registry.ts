import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { outsideIr35TakeHomeCalculator } from "./tools/outside-ir35-take-home-calculator";
import { insideIr35TakeHomeCalculator } from "./tools/inside-ir35-take-home-calculator";
import { umbrellaVsLimitedCalculator } from "./tools/umbrella-vs-limited-calculator";
import { dividendTaxCalculator } from "./tools/dividend-tax-calculator";
import { corporationTaxCalculator } from "./tools/corporation-tax-calculator";
import { contractorSalaryDividendCalculator } from "./tools/contractor-salary-dividend-calculator";

/**
 * The contractor / IR35 calculator fleet. "bespoke" tools have their own
 * hand-built component + page; "generic" tools live one-per-file under ./tools
 * and are rendered by <Calculator> via the dynamic /calculators/[slug] route.
 * The gallery, sitemap and navigation read this single registry, so adding a
 * tool is one import + one array entry.
 *
 * Registry helpers (allTools / genericTools / getGenericTool / toolPath) are
 * provided by makeRegistryHelpers from the shared package.
 *
 * Quality bar: every tax figure traces to the locked 2026/27 house positions
 * (docs/contractors-ir35/house_positions.md) and the verified tax2026 engine.
 * No inlined rates, no thin duplicates, honest disclaimers in each `note`.
 */

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  outsideIr35TakeHomeCalculator,
  insideIr35TakeHomeCalculator,
  umbrellaVsLimitedCalculator,
  dividendTaxCalculator,
  corporationTaxCalculator,
  contractorSalaryDividendCalculator,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

// Shared registry helpers — same contract as Property's hand-written functions.
const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
