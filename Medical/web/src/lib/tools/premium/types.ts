/**
 * Types for the premium calculator tier on the Medical Accountants UK site.
 *
 * Ported verbatim from Dentists/web/src/lib/tools/premium/types.ts and adapted
 * for the Medical site. The type shapes are identical to the Dentists wave-2
 * types; only the UI rendering differs (Medical tokens: navy #001b3d + copper
 * #b87333).
 *
 * The premium registry (lib/tools/premium/registry.ts) is deliberately SEPARATE
 * from the fleet registry (lib/tools/registry.ts), so the indexable calculator
 * pages, gallery and sitemap are untouched. Premium tools surface only as
 * additive client islands injected in blog articles.
 *
 * Storage prefix: ma (FROZEN). Grid keys (none used in R2): ma:grid:<toolId>.
 * Never ptp: or dfp:.
 *
 * Import chain: these types import only from the shared web-shared package's
 * tools/types.ts (CalcField, CalcValues, CalcResult, CalcResultRow), which are
 * already available across the Medical site.
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
 * Editable mini-grid (not used in R2 but present for type parity with Dentists)
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
 * Scenario comparison (e.g. sole trader vs limited company)
 * ------------------------------------------------------------------------- */

export interface ScenarioConfig {
  scenarios: { id: string; label: string }[];
}

/* ---------------------------------------------------------------------------
 * Charts (inline SVG/CSS, rendered client-only, no recharts dependency)
 * ------------------------------------------------------------------------- */

export type ChartKind = "bar" | "groupedBar" | "line";

/** One numeric series to plot, resolved by the tool's compute(). */
export interface ChartSeries {
  /** key into each ChartDatum */
  dataKey: string;
  label: string;
  /**
   * CSS custom property token name (e.g. "var(--gold)") or a hex colour.
   * Use the Medical token system: var(--gold), var(--navy), var(--accent).
   * var(--gold) and var(--accent) resolve to copper (#b87333) on Medical.
   * NEVER use var(--primary) -- estate portability rule forbids it.
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
