/**
 * @accounting-network/web-shared/tools
 *
 * Config-driven calculator platform — types, registry contract, shared
 * renderer, field renderer, and embed kit.
 *
 * Import from specific sub-paths for tree-shaking:
 *
 *   import type { GenericTool, CalcField } from "@accounting-network/web-shared/tools/types";
 *   import { gbp, pct } from "@accounting-network/web-shared/tools/format";
 *   import { makeRegistryHelpers } from "@accounting-network/web-shared/tools/registry-helpers";
 *   import { Calculator } from "@accounting-network/web-shared/tools/components/Calculator";
 *   import { Field } from "@accounting-network/web-shared/tools/components/Field";
 *   import { EmbedAutoResize } from "@accounting-network/web-shared/tools/embed/EmbedAutoResize";
 *   import { EmbedSnippet } from "@accounting-network/web-shared/tools/embed/EmbedSnippet";
 */

export * from "./types";
export * from "./format";
export * from "./registry-helpers";
