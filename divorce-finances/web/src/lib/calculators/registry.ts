import type { Tool, GenericTool } from "@accounting-network/web-shared/tools/types";
import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";

/**
 * The divorce-finances calculator fleet.
 *
 * STUB (scaffold phase): empty. "bespoke" tools have their own hand-built
 * component + page; "generic" tools live one-per-file under ./tools and are
 * rendered by <Calculator> via the dynamic /calculators/[slug] route. The
 * gallery, sitemap and navigation read this single registry, so adding a tool
 * is one import + one array entry.
 *
 * Quality bar: every figure traces to HMRC/gov.uk guidance. No pricing/fees,
 * no thin duplicates, honest disclaimers in each `note`.
 */

const BESPOKE: Tool[] = [];

const GENERIC: GenericTool[] = [];

export const TOOLS: Tool[] = [...BESPOKE, ...GENERIC];

const { allTools, genericTools, getGenericTool, toolPath } = makeRegistryHelpers(TOOLS);
export { allTools, genericTools, getGenericTool, toolPath };
