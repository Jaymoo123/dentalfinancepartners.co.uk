/**
 * Premium tool types for the Holloway Davies premium in-blog calculator fleet.
 *
 * Extends the shared CalcField/CalcValues/CalcResult/CalcResultRow/ComputeFn
 * from @accounting-network/web-shared/tools/types with premium-tier concepts:
 * multi-scenario side-by-side results, chart specs, and editable grids.
 *
 * This module is string-safe and contains no React — it may be imported from
 * both server and client code.
 */

import type { CalcField, CalcValues, CalcResult, CalcResultRow } from "@accounting-network/web-shared/tools/types";
import type { TopicKey } from "@/lib/intent/taxonomy";

// Re-export for convenience so tool files only need to import from here.
export type { CalcField, CalcValues, CalcResult, CalcResultRow };

// ---------------------------------------------------------------------------
// Grid (editable employee/item list — used by Tool 4 employer-cost)
// ---------------------------------------------------------------------------

export type GridColumnType = "text" | "currency" | "number";

export interface GridColumn {
  id: string;
  label: string;
  type: GridColumnType;
  /** step for currency/number columns */
  step?: number;
}

export interface GridRow {
  /** unique stable key for React reconciliation */
  id: string;
  [key: string]: string | number;
}

export interface GridConfig {
  columns: GridColumn[];
  /** factory that creates a blank row for index i */
  rowFactory: (i: number) => GridRow;
  minRows: number;
  maxRows: number;
  addLabel: string;
  heading: string;
}

// ---------------------------------------------------------------------------
// Chart (CSS/SVG bar visual — no recharts dependency)
// ---------------------------------------------------------------------------

export interface ChartBar {
  label: string;
  value: number;
  /** hex or tailwind colour token used for the bar fill */
  colour: string;
}

export interface ChartSpec {
  type: "bar";
  bars: ChartBar[];
  /** label shown above the chart */
  heading?: string;
}

// ---------------------------------------------------------------------------
// Scenario (side-by-side comparison columns)
// ---------------------------------------------------------------------------

export interface ScenarioResult {
  /** column heading e.g. "Sole trader" */
  label: string;
  /** headline value for this column */
  value: string;
  /** highlighted as the recommended/winning option */
  best?: boolean;
  /** breakdown rows specific to this scenario */
  rows?: CalcResultRow[];
}

// ---------------------------------------------------------------------------
// Premium compute context and result
// ---------------------------------------------------------------------------

export interface PremiumComputeContext {
  values: CalcValues;
  /** current grid rows — present only when the tool has a GridConfig */
  gridRows?: GridRow[];
}

export interface PremiumResult {
  /** single headline figure (or the "difference" headline for comparisons) */
  headline: {
    label: string;
    value: string;
    sub?: string;
    tone?: "default" | "warn" | "good";
  };
  /** for yes/no verdicts — renders a badge instead of a headline number */
  verdict?: { text: string; positive: boolean };
  /** flat breakdown rows shown below the headline (non-scenario tools) */
  rows?: CalcResultRow[];
  /** side-by-side comparison columns */
  scenarioResults?: ScenarioResult[];
  /** chart data — rendered by MiniBarChart */
  chart?: ChartSpec;
  /** caveat / methodology note shown under the result */
  note?: string;
}

export type PremiumComputeFn = (ctx: PremiumComputeContext) => PremiumResult;

// ---------------------------------------------------------------------------
// Premium tool config (the full descriptor, one per tool)
// ---------------------------------------------------------------------------

export interface PremiumToolConfig {
  /** unique slug, used as the lookup key in PREMIUM_TOOLS */
  id: string;
  /** human label */
  name: string;
  /** the taxonomy topic this tool belongs to */
  topic: TopicKey;
  /** short blurb for the tool header */
  description: string;
  /** field definitions (same CalcField shape as the standard fleet) */
  fields: CalcField[];
  /** grid config — only present for tools with an editable row-list */
  grid?: GridConfig;
  /** the pure compute function */
  compute: PremiumComputeFn;
  /** CTA label for the result-gate form and the post-result CTA */
  ctaLabel: string;
}
