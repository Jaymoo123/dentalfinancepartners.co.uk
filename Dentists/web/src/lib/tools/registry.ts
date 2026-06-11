/**
 * Dentists tool registry.
 *
 * Single source of truth for the dental calculator fleet. Gallery, sitemap,
 * and the dynamic [slug] route all read from here — nothing is hand-listed.
 *
 * Order controls display order on the gallery page.
 */
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
import { associateTakeHomeTool } from "./configs/associate-take-home";
import { locumStructureTool } from "./configs/locum-structure";
import { practiceValuationTool } from "./configs/practice-valuation";
import { principalExtractionTool } from "./configs/principal-extraction";
import { udaValueTool } from "./configs/uda-value";

const tools = [
  udaValueTool,
  associateTakeHomeTool,
  practiceValuationTool,
  locumStructureTool,
  principalExtractionTool,
] as const;

export const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers([...tools]);
