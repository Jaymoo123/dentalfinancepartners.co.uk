"use client";

/**
 * Premium calculator renderer — renders ANY PremiumToolConfig in a clean, calm,
 * modern shadcn layout: a single rounded card with a header strip, a two-column
 * body (guided inputs on the left, one clear answer on the right) and the detail
 * (workings, breakdown, note) tucked into collapsibles so nothing is dumped at
 * once. The maths is unchanged: everything still comes from config.compute().
 *
 * Primary inputs (currency / number → labelled value + slider; select →
 * segmented control; toggle → labelled switch) sit above an "Advanced options"
 * collapsible holding the field.advanced fields plus the optional MiniGrid.
 *
 * Reuses the SAME analytics calls as the fleet Calculator (calc_view /
 * calc_input_change / calc_computed / calc_result_viewed) so premium tools
 * appear in the same funnel.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import type { CalcField, CalcValues } from "@/lib/calculators/types";
import type {
  PremiumToolConfig,
  GridRow,
  PremiumResult,
  ScenarioResult,
} from "@/lib/calculators/premium/types";
import { MiniGrid } from "@/components/calculators/premium/MiniGrid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { ResultGateModal } from "@/components/calculators/ResultGateModal";
import { useExperiment } from "@/components/experiments/useExperiment";
import { trackExperimentView } from "@/lib/experiments/exposure";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { btnPrimary } from "@/components/ui/layout-utils";

// The result-gate interstitial (result_gate_capture treatment) shows at most once
// per session: the cheeky capture moment. After it has shown, the per-calc "See
// your result" button reveals the result directly without re-popping.
let gateModalShownThisSession = false;

/* ---------------------------------------------------------------------------
 * Defaults / setup
 * ------------------------------------------------------------------------- */

function defaultValues(config: PremiumToolConfig): CalcValues {
  const v: CalcValues = {};
  for (const f of config.fields) v[f.id] = f.default;
  return v;
}

function initialRows(config: PremiumToolConfig): GridRow[] {
  if (!config.grid) return [];
  const n = Math.max(config.grid.minRows, 1);
  return Array.from({ length: n }, (_, i) => config.grid!.rowFactory(i));
}

/** Sensible slider bounds for a numeric field that did not declare min/max. */
function sliderBounds(field: CalcField): { min: number; max: number; step: number } {
  const min = field.min ?? 0;
  const defaultNum = typeof field.default === "number" ? field.default : 0;
  const max =
    field.max ?? Math.max(defaultNum * 3, field.type === "currency" ? 100000 : 100);
  const step = field.step ?? (field.type === "currency" ? 500 : 1);
  return { min, max, step };
}

const gbpAxis = (n: number) =>
  `£${Math.round(n).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;

/* ---------------------------------------------------------------------------
 * Field renderers (left column)
 * ------------------------------------------------------------------------- */

function NumberField({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: number;
  onChange: (v: number) => void;
}) {
  const { min, max, step } = sliderBounds(field);
  const isCurrency = field.type === "currency";

  // The box is backed by local string state so it can be cleared and retyped.
  // The previous controlled type="number" re-clamped on every keystroke
  // (Math.max(min, Number(value) || 0)), so a user could never blank the field
  // to enter their own number — the cause of the input rage-clicks in analytics.
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  const [text, setText] = useState<string>(() => String(Number.isFinite(value) ? value : min));
  const lastCommitted = useRef<number>(Number.isFinite(value) ? value : min);

  // Resync the box when the value is driven from outside (e.g. the slider).
  useEffect(() => {
    if (value !== lastCommitted.current) {
      lastCommitted.current = value;
      setText(String(Number.isFinite(value) ? value : min));
    }
  }, [value, min]);

  const commit = (n: number) => {
    const c = clamp(n);
    lastCommitted.current = c;
    onChange(c);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={`f-${field.id}`} className="text-slate-700">
          {field.label}
        </Label>
        <div className="flex items-center gap-1.5">
          {isCurrency && <span className="text-sm font-medium text-slate-500">£</span>}
          <Input
            id={`f-${field.id}`}
            type="text"
            inputMode="decimal"
            value={text}
            onChange={(e) => {
              const raw = e.target.value;
              // Allow empty + partial numeric entry while typing; commit only a
              // real number so the result/slider update live, and leave the value
              // untouched while the box is momentarily empty.
              if (/^-?\d*\.?\d*$/.test(raw)) {
                setText(raw);
                if (raw !== "" && raw !== "-" && raw !== ".") commit(Number(raw));
              }
            }}
            onBlur={() => {
              const n = text === "" || text === "-" || text === "." ? min : Number(text);
              const c = clamp(Number.isFinite(n) ? n : min);
              setText(String(c));
              commit(c);
            }}
            className="h-11 w-28 text-right tabular-nums"
          />
          {field.suffix && (
            <span className="text-sm font-medium text-slate-500">{field.suffix}</span>
          )}
        </div>
      </div>
      <Slider
        value={[Math.min(Math.max(value, min), max)]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onChange(vals[0])}
        aria-label={field.label}
      />
      {field.help && <p className="text-xs text-slate-400 mt-1.5">{field.help}</p>}
    </div>
  );
}

function SelectField({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-slate-700">{field.label}</Label>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={field.label}>
        {field.options?.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-lg border px-3.5 py-2 text-sm transition-colors min-h-[40px]",
                active
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {field.help && <p className="text-xs text-slate-400 mt-1.5">{field.help}</p>}
    </div>
  );
}

function ToggleField({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <label className="flex items-center justify-between gap-3 cursor-pointer">
        <span className="text-sm font-medium text-slate-700">{field.label}</span>
        <span
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
            value ? "bg-emerald-600" : "bg-slate-200",
          )}
        >
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
            aria-label={field.label}
          />
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
              value ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </span>
      </label>
      {field.help && <p className="text-xs text-slate-400 mt-1.5">{field.help}</p>}
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: CalcValues[string];
  onChange: (v: number | string | boolean) => void;
}) {
  if (field.type === "select") {
    return (
      <SelectField
        field={field}
        value={String(value ?? field.default ?? "")}
        onChange={onChange}
      />
    );
  }
  if (field.type === "toggle") {
    return <ToggleField field={field} value={Boolean(value)} onChange={onChange} />;
  }
  return (
    <NumberField field={field} value={Number(value) || 0} onChange={onChange} />
  );
}

/* ---------------------------------------------------------------------------
 * Results (right column)
 * ------------------------------------------------------------------------- */

function HeadlineCard({ result }: { result: PremiumResult }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {result.headline.label}
      </div>
      <div className="mt-1.5 text-3xl font-bold tabular-nums text-slate-900 sm:text-4xl">
        {result.headline.value}
      </div>
      {result.headline.sub && (
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
          <ArrowDown className="h-3.5 w-3.5" />
          {result.headline.sub}
        </div>
      )}
    </div>
  );
}

function ScenarioTiles({ scenarios }: { scenarios: ScenarioResult[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {scenarios.map((s) => (
        <div
          key={s.id}
          className={cn(
            "rounded-xl border bg-white p-4",
            s.best ? "border-emerald-300 ring-1 ring-emerald-200" : "border-slate-200",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs text-slate-500">{s.label}</span>
            {s.best && (
              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Lower
              </span>
            )}
          </div>
          <div className="mt-2 text-xl font-bold tabular-nums text-slate-900">
            {s.headline.value}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{s.headline.label}</div>
        </div>
      ))}
    </div>
  );
}

function ComparisonChart({
  config,
  result,
}: {
  config: PremiumToolConfig;
  result: PremiumResult;
}) {
  if (!config.chart || !result.chart || result.chart.data.length === 0) return null;
  const series = config.chart.series;
  const isCurrency = (config.chart.valueFormat ?? "currency") === "currency";

  const chartConfig: ChartConfig = {};
  for (const s of series) {
    chartConfig[s.dataKey] = { label: s.label, color: s.color };
  }

  return (
    <ChartContainer config={chartConfig} className="h-[180px] w-full">
      <BarChart data={result.chart.data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                const n = typeof value === "number" ? value : Number(value);
                const label = chartConfig[String(name)]?.label ?? name;
                return (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {isCurrency ? gbpAxis(n) : n.toLocaleString("en-GB")}
                    </span>
                  </div>
                );
              }}
            />
          }
        />
        {series.map((s) => (
          <Bar key={s.dataKey} dataKey={s.dataKey} fill={s.color} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

function RowList({
  rows,
}: {
  rows: { label: string; value: string; strong?: boolean }[];
}) {
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-baseline justify-between gap-4">
          <span className={cn("text-sm", r.strong ? "font-semibold text-slate-700" : "text-slate-500")}>
            {r.label}
          </span>
          <span
            className={cn(
              "text-sm tabular-nums",
              r.strong ? "font-bold text-slate-900" : "font-medium text-slate-700",
            )}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Workings({ result }: { result: PremiumResult }) {
  const hasScenarioRows = result.scenarioResults?.some((s) => s.rows && s.rows.length > 0);
  const hasBreakdown = result.breakdown && result.breakdown.length > 0;
  const hasGenericRows = !result.scenarioResults && result.rows && result.rows.length > 0;
  if (!hasScenarioRows && !hasBreakdown && !hasGenericRows && !result.note) return null;

  return (
    <Collapsible className="rounded-xl border border-slate-200 bg-white">
      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
        Show the workings
        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-5 border-t border-slate-100 px-4 py-4">
          {result.scenarioResults?.map(
            (s) =>
              s.rows &&
              s.rows.length > 0 && (
                <div key={s.id} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {s.label}
                  </div>
                  <RowList rows={s.rows} />
                </div>
              ),
          )}
          {hasGenericRows && <RowList rows={result.rows!} />}
          {hasBreakdown && (
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <RowList rows={result.breakdown!} />
            </div>
          )}
          {result.note && (
            <p className="border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
              {result.note}
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/* ---------------------------------------------------------------------------
 * Main component
 * ------------------------------------------------------------------------- */

export function PremiumCalculator({
  config,
  full = false,
  placement = "calculator",
  category,
}: {
  config: PremiumToolConfig;
  /** Calc-page variant: show the comparison chart and a roomier header. The
   *  default (used on blog posts) is more compact and omits the chart. */
  full?: boolean;
  /** Where the tool is surfaced — "calculator" | "blog" | "embed". */
  placement?: string;
  /** Blog category slug when placement === "blog" (for per-category rollups). */
  category?: string;
}) {
  const [values, setValues] = useState<CalcValues>(() => defaultValues(config));
  const [rows, setRows] = useState<GridRow[]>(() => initialRows(config));
  // The scenario is fixed to the config's first scenario; there is no in-tool
  // scenario switcher today, so only the getter is needed (it is read by compute).
  const [scenario] = useState<string>(
    () => config.scenarios?.scenarios[0]?.id ?? "",
  );
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // result_gate_capture experiment (in-blog only). Treatment hides the result
  // behind a "See your result" button + interstitial capture; control keeps the
  // inline form below. Converted visitors are never gated (instant access).
  const variant = useExperiment("result_gate_capture");
  const inExperiment = placement === "blog" && !isConverted();
  const gated = variant === "treatment" && inExperiment;
  const measuredControl = variant === "control" && inExperiment;
  const [revealed, setRevealed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const expViewedRef = useRef(false);
  const showResult = !gated || revealed;

  // Shared event context: which tool, where, and that this is the premium kind.
  const base = {
    calculator_slug: config.id,
    placement,
    tool_kind: "premium",
    ...(category ? { category } : {}),
  };

  // Honest "viewed": fire calc_view the first time the tool actually scrolls
  // into view (it is often injected mid-article), not on mount.
  const rootRef = useInViewOnce<HTMLDivElement>(() => {
    track("calc_view", base);
  });

  useEffect(() => {
    return () => {
      if (computeTimer.current) clearTimeout(computeTimer.current);
    };
  }, []);

  const onInteract = (fieldId: string) => {
    track("calc_input_change", { ...base, field_id: fieldId });
    if (!interactedRef.current) {
      interactedRef.current = true;
      track("calc_result_viewed", base);
    }
    // result_gate_capture exposure (both arms): once per session per calc, when the
    // reader reaches a result. Excludes converted visitors + non-blog placements.
    if (!expViewedRef.current && variant && inExperiment) {
      expViewedRef.current = true;
      trackExperimentView("result_gate_capture", "calc_result");
    }
    if (computeTimer.current) clearTimeout(computeTimer.current);
    computeTimer.current = setTimeout(() => {
      track("calc_computed", base);
    }, 800);
  };

  const setValue = (id: string, v: number | string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    onInteract(id);
  };

  const onRowsChange = (next: GridRow[]) => {
    setRows(next);
    onInteract("grid");
  };

  // Treatment "See your result": opens the interstitial the first time this
  // session, otherwise reveals directly. The press is auto-captured as a cta_click
  // via the button's data-cta.
  const onSeeResult = () => {
    // A treatment user can press this on the DEFAULT figure with no input change,
    // so fire the (once-per-session) exposure here too: this guarantees every gate
    // form-start is preceded by an experiment_view (acted is always a subset of
    // exposed). De-duped with the onInteract exposure via expViewedRef.
    if (!expViewedRef.current && variant && inExperiment) {
      expViewedRef.current = true;
      trackExperimentView("result_gate_capture", "calc_result");
    }
    if (!gateModalShownThisSession) {
      gateModalShownThisSession = true;
      setGateOpen(true);
    } else {
      setRevealed(true);
    }
  };
  // Stable identity so the modal's focus/Escape effects are not re-run (and focus
  // not stolen from the capture form) on an unrelated parent re-render.
  const revealFromGate = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
  }, []);

  const result = useMemo<PremiumResult>(
    () => config.compute({ values, rows, scenario }),
    [config, values, rows, scenario],
  );

  const primaryFields = config.fields.filter((f) => f.advanced !== true);
  const advancedFields = config.fields.filter((f) => f.advanced === true);
  const hasAdvanced = advancedFields.length > 0 || Boolean(config.grid);
  const scenarios = result.scenarioResults;

  return (
    <>
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_28px_-16px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.03]"
    >
      {/* Branded top accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
      {/* Header strip */}
      <div
        className={cn(
          "border-b border-slate-200 bg-slate-50/70 px-5 sm:px-7",
          full ? "py-4 sm:py-5" : "py-2.5 sm:py-3",
        )}
      >
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{config.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{config.intro}</p>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Inputs — on the compact (blog) layout the panel is capped to a fixed
            height and scrolls, so a tool with many inputs never runs the card too
            tall. Short tools never reach the cap, so they do not scroll. The full
            (calculator-page) layout has room, so it is uncapped. */}
        <div className="p-5 sm:p-7">
          <div
            className={cn(
              "space-y-6",
              !full && "max-h-[360px] overflow-y-auto pr-2 [scrollbar-width:thin]",
            )}
          >
            {primaryFields.map((f) => (
              <FieldControl
                key={f.id}
                field={f}
                value={values[f.id]}
                onChange={(v) => setValue(f.id, v)}
              />
            ))}

            {hasAdvanced && (
              <Collapsible className="rounded-xl border border-slate-200">
                <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                  Advanced options
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-6 border-t border-slate-100 px-4 py-5">
                    {advancedFields.map((f) => (
                      <FieldControl
                        key={f.id}
                        field={f}
                        value={values[f.id]}
                        onChange={(v) => setValue(f.id, v)}
                      />
                    ))}
                    {config.grid && (
                      <MiniGrid
                        toolId={config.id}
                        config={config.grid}
                        rows={rows}
                        onRowsChange={onRowsChange}
                      />
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5 border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0">
          {showResult ? (
            <>
              <HeadlineCard result={result} />
              {scenarios && scenarios.length > 0 && <ScenarioTiles scenarios={scenarios} />}
              {full && <ComparisonChart config={config} result={result} />}
              <Workings result={result} />
            </>
          ) : (
            // Treatment, pre-reveal: the figure is computed but held behind a button.
            // min-height reserves the result area so revealing causes no layout jump.
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm font-medium text-slate-600">Your figure is ready.</p>
              <button
                type="button"
                onClick={onSeeResult}
                className={`${btnPrimary} w-full sm:w-auto`}
                data-cta="see_result"
              >
                See your result
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Blog placement: the tool otherwise dead-ends (its only lead path is the
          email Excel gate placed further down the article). Add a form-bound CTA
          so a reader who just saw their numbers can go straight to a specialist.
          data-cta-goal="form" feeds the funnel's form-CTA stage + vw_cta_performance. */}
      {/* Control (and converted visitors): keep the inline capture below the result.
          Treatment removes it (the interstitial gate is the capture instead). The
          control arm threads the experiment key so both arms measure the same
          building-block; exposure already fired at the result moment above. */}
      {placement === "blog" && !gated && !revealed && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
          <CalcResultCta
            campaign={config.id}
            label="Get a specialist to check your numbers →"
            experimentKey={measuredControl ? "result_gate_capture" : undefined}
          />
        </div>
      )}
    </div>
    {gateOpen && <ResultGateModal campaign={config.id} onReveal={revealFromGate} />}
    </>
  );
}
