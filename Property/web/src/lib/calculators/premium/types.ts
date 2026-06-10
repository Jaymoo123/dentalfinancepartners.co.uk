/**
 * Types for the PREMIUM calculator tier — the richer, on-page interactive tools
 * (guided inputs → visual results, scenario comparison, an optional editable
 * mini-grid). These EXTEND the existing config-driven calculator vocabulary
 * (lib/calculators/types.ts) rather than replacing it, so the field renderer,
 * value handling and result-row styling are shared with the existing fleet.
 *
 * A PremiumToolConfig is rendered by <PremiumCalculator>. The premium registry
 * (lib/calculators/premium/registry.ts) is deliberately SEPARATE from the fleet
 * registry, so the indexable calculator pages, gallery and sitemap are untouched
 * — premium tools surface only as additive client islands.
 *
 * Phase A ships these interfaces + an EMPTY registry, so nothing renders yet.
 */
import type {
  CalcField,
  CalcValues,
  CalcResult,
  CalcResultRow,
} from "@/lib/calculators/types";
import type { TopicKey } from "@/lib/intent/taxonomy";

export type { CalcField, CalcValues, CalcResultRow };

/* ---------------------------------------------------------------------------
 * Editable mini-grid (generalises the PortfolioProfitabilityCalculator pattern)
 * ------------------------------------------------------------------------- */

/** A column in the editable mini-grid. */
export interface GridColumn {
  /** key on a row object */
  id: string;
  label: string;
  /** "text" for the row name; the rest mirror CalcField numeric/select inputs */
  type: "text" | "currency" | "number" | "select";
  options?: { value: string; label: string }[];
  step?: number;
  suffix?: string;
}

/** A single editable row: free-form keyed values plus a stable id. */
export type GridRow = { id: string } & Record<string, string | number>;

export interface GridConfig {
  columns: GridColumn[];
  /** builds a fresh row (called for the initial rows and on "add"). */
  rowFactory: (index: number) => GridRow;
  minRows: number;
  maxRows: number;
  addLabel: string;
  /** optional heading shown above the grid */
  heading?: string;
  /**
   * If true, rows persist to localStorage under `ptp:grid:<toolId>` (debounced,
   * SSR-guarded). Off by default so Phase A adds no storage behaviour.
   */
  persist?: boolean;
}

/* ---------------------------------------------------------------------------
 * Scenario comparison (e.g. personal vs company)
 * ------------------------------------------------------------------------- */

export interface ScenarioConfig {
  scenarios: { id: string; label: string }[];
}

/* ---------------------------------------------------------------------------
 * Charts (recharts, rendered client-only via next/dynamic, fixed aspect)
 * ------------------------------------------------------------------------- */

export type ChartKind = "bar" | "groupedBar" | "line";

/** One numeric series to plot, resolved by the tool's compute(). */
export interface ChartSeries {
  /** key into each ChartDatum */
  dataKey: string;
  label: string;
  /** tailwind-independent hex so it works inside the chart lib */
  color: string;
}

/** A single x-axis point with one value per series dataKey. */
export type ChartDatum = { name: string } & Record<string, string | number>;

export interface ChartSpec {
  kind: ChartKind;
  /** y-axis / tooltip value formatter id (resolved in ResultChart). */
  valueFormat?: "currency" | "percent" | "number";
  series: ChartSeries[];
  /** axis label for the value axis, optional */
  valueAxisLabel?: string;
}

/** Chart payload produced by compute() (data + which spec series to draw). */
export interface ChartResult {
  data: ChartDatum[];
}

/* ---------------------------------------------------------------------------
 * Premium result (extends the shared CalcResult)
 * ------------------------------------------------------------------------- */

/** A labelled result column for a single scenario (side-by-side comparison). */
export interface ScenarioResult {
  id: string;
  label: string;
  headline: CalcResult["headline"];
  rows?: CalcResultRow[];
  /** highlight the recommended / cheapest scenario */
  best?: boolean;
}

/**
 * The premium compute output. Extends CalcResult (headline + rows + note +
 * verdict) with optional breakdown rows, a chart payload and per-scenario
 * results for side-by-side comparison.
 */
export interface PremiumResult extends CalcResult {
  /** extra labelled rows rendered beneath the headline (the breakdown panel). */
  breakdown?: CalcResultRow[];
  /** chart data matching the config's ChartSpec (drawn client-only). */
  chart?: ChartResult;
  /** per-scenario results for a comparison config. */
  scenarioResults?: ScenarioResult[];
}

/** Inputs passed to a premium compute(): scalar field values + grid rows. */
export interface PremiumComputeContext {
  values: CalcValues;
  rows: GridRow[];
  /** the active scenario id, if the tool defines scenarios. */
  scenario?: string;
}

export type PremiumComputeFn = (ctx: PremiumComputeContext) => PremiumResult;

/* ---------------------------------------------------------------------------
 * The premium tool config
 * ------------------------------------------------------------------------- */

export interface PremiumToolConfig {
  /** stable id; matches CategoryResource.toolId. */
  id: string;
  topic: TopicKey;
  title: string;
  /** one-line intro shown under the title. */
  intro: string;
  /** scalar inputs (reuses the shared CalcField vocabulary + renderer). */
  fields: CalcField[];
  /** optional editable mini-grid. */
  grid?: GridConfig;
  /** optional scenario comparison (personal vs company, etc). */
  scenarios?: ScenarioConfig;
  /** pure result function — no side effects, deterministic for a given context. */
  compute: PremiumComputeFn;
  /** optional chart spec; compute() returns the matching data. */
  chart?: ChartSpec;
  /** explainer prose rendered beneath the tool (mirrors GenericTool.explainer). */
  explainer: { heading: string; paragraphs: string[] };
}
