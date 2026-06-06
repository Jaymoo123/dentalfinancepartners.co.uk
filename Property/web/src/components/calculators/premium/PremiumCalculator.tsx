"use client";

/**
 * Premium calculator renderer — renders ANY PremiumToolConfig: guided scalar
 * inputs (shared Field renderer) + an optional editable mini-grid + an optional
 * scenario switcher → a visual result panel (recharts via ResultChart) with
 * breakdown rows in the existing slate-900 panel style.
 *
 * Reuses the SAME analytics calls as the fleet Calculator (calc_view /
 * calc_input_change / calc_computed) so premium tools appear in the same funnel.
 *
 * Phase A: the premium registry is empty, so this component is never mounted on
 * the live site. It is the reusable renderer the Phase B/C tool configs target.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import type { CalcValues } from "@/lib/calculators/types";
import type {
  PremiumToolConfig,
  GridRow,
  PremiumResult,
  ScenarioResult,
} from "@/lib/calculators/premium/types";
import { Field } from "@/components/calculators/fields/Field";
import { MiniGrid } from "@/components/calculators/premium/MiniGrid";
import { ResultChart } from "@/components/calculators/premium/ResultChart";
import { track } from "@/lib/analytics/track";

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

function ResultPanel({ result }: { result: PremiumResult }) {
  const tone = result.headline.tone ?? "default";
  const headlineColor =
    tone === "warn" ? "text-amber-400" : tone === "good" ? "text-emerald-400" : "text-emerald-400";
  const breakdown = result.breakdown ?? result.rows;

  return (
    <div className="bg-slate-900 p-6 sm:p-8 text-white">
      {result.verdict ? (
        <div className="mb-2">
          <div className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
            {result.headline.label}
          </div>
          <div
            className={`inline-block px-5 sm:px-6 py-2 sm:py-3 text-xl sm:text-2xl font-bold ${
              result.verdict.positive ? "bg-emerald-500 text-emerald-950" : "bg-amber-400 text-amber-950"
            }`}
          >
            {result.verdict.text}
          </div>
        </div>
      ) : (
        <div className="mb-4 sm:mb-6">
          <div className={`text-xs sm:text-sm font-bold ${headlineColor} uppercase tracking-wider mb-2`}>
            {result.headline.label}
          </div>
          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-mono">
            {result.headline.value}
          </div>
          {result.headline.sub && (
            <div className="mt-2 text-xs sm:text-sm text-slate-300 uppercase tracking-wider">
              {result.headline.sub}
            </div>
          )}
        </div>
      )}

      {breakdown && breakdown.length > 0 && (
        <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-3">
          {breakdown.map((r, i) => (
            <div key={i} className="flex justify-between items-baseline gap-4">
              <span className="text-xs sm:text-sm text-slate-300">{r.label}</span>
              <span
                className={`font-semibold ${r.strong ? "text-lg sm:text-xl text-white" : "text-base text-slate-200"}`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {result.note && (
        <div className="mt-5 border-t border-slate-700 pt-4">
          <p className="text-xs text-slate-400 leading-relaxed">{result.note}</p>
        </div>
      )}
    </div>
  );
}

function ScenarioColumn({ scenario }: { scenario: ScenarioResult }) {
  return (
    <div
      className={`bg-slate-900 p-5 sm:p-6 text-white ${
        scenario.best ? "ring-2 ring-emerald-400" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">{scenario.label}</div>
        {scenario.best && (
          <span className="bg-emerald-500 text-emerald-950 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
            Best
          </span>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{scenario.headline.value}</div>
      <div className="mt-1 text-xs text-slate-300 uppercase tracking-wider">{scenario.headline.label}</div>
      {scenario.rows && scenario.rows.length > 0 && (
        <div className="mt-4 border-t border-slate-700 pt-4 space-y-2">
          {scenario.rows.map((r, i) => (
            <div key={i} className="flex justify-between items-baseline gap-3">
              <span className="text-xs text-slate-400">{r.label}</span>
              <span className={`text-sm font-semibold ${r.strong ? "text-white" : "text-slate-200"}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PremiumCalculator({ config }: { config: PremiumToolConfig }) {
  const [values, setValues] = useState<CalcValues>(() => defaultValues(config));
  const [rows, setRows] = useState<GridRow[]>(() => initialRows(config));
  const [scenario, setScenario] = useState<string>(
    () => config.scenarios?.scenarios[0]?.id ?? "",
  );
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    track("calc_view", { calculator_slug: config.id, variant: "premium" });
    return () => {
      if (computeTimer.current) clearTimeout(computeTimer.current);
    };
  }, [config.id]);

  const onInteract = (fieldId: string) => {
    track("calc_input_change", { calculator_slug: config.id, field_id: fieldId });
    if (!interactedRef.current) {
      interactedRef.current = true;
      track("calc_result_viewed", { calculator_slug: config.id, variant: "premium" });
    }
    if (computeTimer.current) clearTimeout(computeTimer.current);
    computeTimer.current = setTimeout(() => {
      track("calc_computed", { calculator_slug: config.id });
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

  const onScenario = (id: string) => {
    setScenario(id);
    onInteract("scenario");
  };

  const result = useMemo<PremiumResult>(
    () => config.compute({ values, rows, scenario }),
    [config, values, rows, scenario],
  );

  return (
    <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Premium tool
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{config.title}</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">{config.intro}</p>
      </div>

      {config.scenarios && config.scenarios.scenarios.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Scenario">
          {config.scenarios.scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={scenario === s.id}
              onClick={() => onScenario(s.id)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors min-h-[44px] ${
                scenario === s.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          {config.fields.map((f) => (
            <Field key={f.id} field={f} value={values[f.id]} onChange={(v) => setValue(f.id, v)} />
          ))}
          {config.grid && (
            <MiniGrid toolId={config.id} config={config.grid} rows={rows} onRowsChange={onRowsChange} />
          )}
        </div>

        <div className="space-y-6">
          {result.scenarioResults && result.scenarioResults.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {result.scenarioResults.map((sr) => (
                <ScenarioColumn key={sr.id} scenario={sr} />
              ))}
            </div>
          ) : (
            <ResultPanel result={result} />
          )}

          {config.chart && result.chart && (
            <div className="bg-white border-2 border-slate-200 p-4 sm:p-5">
              <ResultChart spec={config.chart} result={result.chart} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
