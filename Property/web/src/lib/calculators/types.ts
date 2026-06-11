/**
 * Re-exports from the shared tools package.
 *
 * Property is the type ancestor — these types were lifted verbatim into
 * packages/web-shared/tools/types.ts. All local code that imports from this
 * path continues to work without change; downstream (premium/types.ts) also
 * keeps importing from "@/lib/calculators/types" so it is unaffected.
 */
export type {
  FieldType,
  CalcField,
  CalcValues,
  CalcResultRow,
  CalcResult,
  ComputeFn,
  BespokeTool,
  GenericTool,
  Tool,
} from "@accounting-network/web-shared/tools/types";
