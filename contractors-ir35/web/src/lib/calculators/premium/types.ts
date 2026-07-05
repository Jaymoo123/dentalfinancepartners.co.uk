/**
 * Types for the premium calculator tier on the contractors-ir35 site.
 *
 * Ported from Dentists/web/src/lib/tools/premium/types.ts and adapted for
 * the contractors-ir35 site, which uses the same dependency-free rendering
 * path (native range inputs, <details> collapsibles, CSS bar chart).
 *
 * The premium registry (lib/calculators/premium/registry.ts) is separate from
 * the fleet registry (lib/calculators/registry.ts), so the indexable calculator
 * pages, gallery and sitemap are untouched. Premium tools surface only as
 * additive client islands injected in blog articles.
 *
 * Storage prefix: cfp (FROZEN). Grid keys: cfp:grid:<toolId>. Never ptp:/bfp:.
 *
 * Token discipline: this site uses var(--accent) (#0e7490 petrol-cyan) and neutral
 * classes. No --gold, --navy or --dark tokens exist on this site.
 */
import type {
  CalcField,
  CalcValues,
  CalcResult,
  CalcResultRow,
} from "@accounting-network/web-shared/tools/types";
import type { TopicKey } from "@/lib/intent/taxonomy";

export type { CalcField, CalcValues, CalcResultRow };

/* ---------------------------------------------------------------------------
 * Editable mini-grid (not used in R2 but present for type parity)
 * ------------------------------------------------------------------------- */

export interface GridColumn {
  id: string;
  label: string;
  type: "text" | "currency" | "number" | "select";
  options?: { value: string; label: string }[];
  step?: number;
  suffix?: string;
}

export type GridRow = { id: string } & Record<string, string | number>;

export interface GridConfig {
  columns: GridColumn[];
  rowFactory: (index: number) => GridRow;
  minRows: number;
  maxRows: number;
  addLabel: string;
  heading?: string;
  persist?: boolean;
}

/* ---------------------------------------------------------------------------
 * Scenario comparison (e.g. outside vs inside IR35)
 * ------------------------------------------------------------------------- */

export interface ScenarioConfig {
  scenarios: { id: string; label: string }[];
}

/* ---------------------------------------------------------------------------
 * Charts (inline SVG/CSS, dependency-free, no recharts)
 * ------------------------------------------------------------------------- */

export type ChartKind = "bar" | "groupedBar" | "line";

/** One numeric series to plot, resolved by the tool's compute(). */
export interface ChartSeries {
  /** key into each ChartDatum */
  dataKey: string;
  label: string;
  /**
   * CSS custom property token name (e.g. "var(--accent)") or a hex colour.
   * Use cfp tokens: var(--accent) for the primary series, a neutral hex for
   * the secondary. Never use var(--gold), var(--navy), var(--dark) or
   * var(--primary): this site does not define those tokens.
   */
  color: string;
}

/** A single x-axis point with one value per series dataKey. */
export type ChartDatum = { name: string } & Record<string, string | number>;

export interface ChartSpec {
  kind: ChartKind;
  /** y-axis / tooltip value formatter id resolved in PremiumBarChart. */
  valueFormat?: "currency" | "percent" | "number";
  series: ChartSeries[];
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
  /** highlight the recommended scenario */
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
  /** chart data matching the config's ChartSpec. */
  chart?: ChartResult;
  /** per-scenario results for a comparison config. */
  scenarioResults?: ScenarioResult[];
}

/** Inputs passed to a premium compute(): scalar field values and optional grid rows. */
export interface PremiumComputeContext {
  values: CalcValues;
  rows: GridRow[];
  scenario?: string;
}

export type PremiumComputeFn = (ctx: PremiumComputeContext) => PremiumResult;

/* ---------------------------------------------------------------------------
 * The premium tool config
 * ------------------------------------------------------------------------- */

export interface PremiumToolConfig {
  /** stable id; matches resources.ts toolId. */
  id: string;
  topic: TopicKey;
  title: string;
  /** one-line intro shown under the title. */
  intro: string;
  /** scalar inputs (reuses the shared CalcField vocabulary). */
  fields: CalcField[];
  /** optional editable mini-grid (none of the R2 tools use this). */
  grid?: GridConfig;
  /** optional scenario comparison. */
  scenarios?: ScenarioConfig;
  /** pure result function -- no side effects, deterministic for a given context. */
  compute: PremiumComputeFn;
  /** optional chart spec; compute() returns the matching data. */
  chart?: ChartSpec;
  /** explainer prose rendered beneath the tool (mirrors GenericTool.explainer). */
  explainer: { heading: string; paragraphs: string[] };
}
