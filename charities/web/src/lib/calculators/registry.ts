import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { giftAidCalculator } from "./tools/gift-aid-calculator";
import { independentExaminationAuditChecker } from "./tools/independent-examination-audit-checker";
import { gasdsCalculator } from "./tools/gasds-calculator";

/**
 * The charities calculator fleet (estate config-driven pattern: one file +
 * one import per tool). The gallery, dynamic route, embed route and sitemap
 * all read this single registry.
 *
 * Quality bar: every figure traces to docs/charities/house_positions.md and
 * its gov.uk citations. England & Wales default; Scotland flagged, never
 * silently mixed (house position 26).
 */

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [
  giftAidCalculator,
  independentExaminationAuditChecker,
  gasdsCalculator,
];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
