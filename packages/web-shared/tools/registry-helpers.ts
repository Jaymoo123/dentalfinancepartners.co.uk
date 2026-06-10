/**
 * Registry contract helpers — the type-safe query layer every site's tool
 * registry must satisfy. Sites keep their own registry.ts files (with their
 * own fleet); these helpers are the shared contract over that fleet.
 *
 * Usage (per-site registry.ts):
 *
 *   import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
 *   import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
 *
 *   const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];
 *   export const { allTools, genericTools, getGenericTool, toolPath } =
 *     makeRegistryHelpers(TOOLS);
 */

import type { Tool, GenericTool } from "./types";

export interface RegistryHelpers {
  allTools: () => Tool[];
  genericTools: () => GenericTool[];
  getGenericTool: (slug: string) => GenericTool | undefined;
  toolPath: (slug: string) => string;
}

export function makeRegistryHelpers(tools: Tool[]): RegistryHelpers {
  const generic = tools.filter((t): t is GenericTool => t.kind === "generic");
  return {
    allTools: () => tools,
    genericTools: () => generic,
    getGenericTool: (slug) => generic.find((t) => t.slug === slug),
    toolPath: (slug) => `/calculators/${slug}`,
  };
}
