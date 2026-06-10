/**
 * Shared types for the config-driven calculator fleet. A "generic" tool is
 * defined entirely by data here (fields + a pure compute function + explainer
 * prose), and rendered by <Calculator>. A "bespoke" tool has its own hand-built
 * component + page (the original five). Both are listed in the registry so the
 * gallery, sitemap and navigation treat the whole fleet uniformly.
 */

export type FieldType = "currency" | "number" | "select" | "toggle";

export interface CalcField {
  id: string;
  label: string;
  type: FieldType;
  default: number | string | boolean;
  /** select options */
  options?: { value: string; label: string }[];
  help?: string;
  step?: number;
  /** slider lower bound (premium renderer). Falls back to a type default. */
  min?: number;
  /** slider upper bound (premium renderer). Falls back to a type default. */
  max?: number;
  /** if true, this field is tucked into the "Advanced options" section. */
  advanced?: boolean;
  /** small suffix shown after a number input, e.g. "%" or "miles" */
  suffix?: string;
}

export type CalcValues = Record<string, number | string | boolean>;

export interface CalcResultRow {
  label: string;
  value: string;
  strong?: boolean;
}

export interface CalcResult {
  headline: { label: string; value: string; sub?: string; tone?: "default" | "warn" | "good" };
  rows?: CalcResultRow[];
  /** dynamic caveat / explanation shown under the result */
  note?: string;
  /** for yes/no checkers — renders a badge instead of a headline number */
  verdict?: { text: string; positive: boolean };
}

export type ComputeFn = (values: CalcValues) => CalcResult;

interface ToolMetaBase {
  slug: string;
  name: string;
  category: string;
  /** one-line blurb for cards, the gallery and meta descriptions */
  oneLiner: string;
  /** initial iframe height for the embed snippet (auto-resizes after load) */
  embedHeight: number;
}

export interface BespokeTool extends ToolMetaBase {
  kind: "bespoke";
}

export interface GenericTool extends ToolMetaBase {
  kind: "generic";
  metaTitle: string;
  metaDescription: string;
  intro: string;
  ctaLabel?: string;
  fields: CalcField[];
  compute: ComputeFn;
  explainer: { heading: string; paragraphs: string[] };
  faqs?: { question: string; answer: string }[];
}

export type Tool = BespokeTool | GenericTool;
