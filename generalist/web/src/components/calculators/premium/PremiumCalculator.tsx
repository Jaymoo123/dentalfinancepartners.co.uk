"use client";

/**
 * Premium calculator renderer for the Holloway Davies generalist site.
 *
 * Renders any PremiumToolConfig in a clean two-column card: guided inputs
 * on the left, a clear result panel on the right. The "Advanced options"
 * and "Show the workings" sections use native <details>/<summary> so there
 * are zero new npm dependencies.
 *
 * Re-uses the shared analytics calls (calc_view / calc_input_change /
 * calc_computed / calc_result_viewed) stamped with the premium tool context.
 *
 * Styled with generalist orange-500/600 and slate tokens, NOT Property's emerald.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CalcValues } from "@accounting-network/web-shared/tools/types";
import type {
  PremiumToolConfig,
  GridRow,
  PremiumResult,
  ScenarioResult,
} from "@/lib/calculators/premium/types";
import { FieldControl } from "@/components/calculators/premium/ui/Field";
import { MiniBarChart } from "@/components/calculators/premium/ui/MiniBarChart";
import { MiniGrid } from "@/components/calculators/premium/MiniGrid";
import { ResultGateModal } from "@/components/calculators/premium/ResultGateModal";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { btnPrimary } from "@/components/ui/layout-utils";

// The gate shows at most once per session. After it has shown, "See your result"
// reveals directly without re-popping.
let gateModalShownThisSession = false;

/* ---------------------------------------------------------------------------
 * Helpers
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

/* ---------------------------------------------------------------------------
 * Result sub-components
 * ------------------------------------------------------------------------- */

function HeadlineCard({ result }: { result: PremiumResult }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {result.headline.label}
      </div>
      <div className="mt-1.5 text-3xl font-bold tabular-nums text-slate-900 sm:text-4xl">
        {result.headline.value}
      </div>
      {result.headline.sub && (
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-100">
          {result.headline.sub}
        </div>
      )}
    </div>
  );
}

function VerdictBadge({ result }: { result: PremiumResult }) {
  if (!result.verdict) return null;
  return (
    <div
      className={[
        "rounded border px-4 py-3 text-sm font-semibold",
        result.verdict.positive
          ? "border-orange-200 bg-orange-50 text-orange-800"
          : "border-amber-200 bg-amber-50 text-amber-800",
      ].join(" ")}
    >
      {result.verdict.text}
    </div>
  );
}

function ScenarioTiles({ scenarios }: { scenarios: ScenarioResult[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {scenarios.map((s, i) => (
        <div
          key={i}
          className={[
            "rounded border bg-white p-4",
            s.best ? "border-orange-400 ring-1 ring-orange-200" : "border-slate-200",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs text-slate-500">{s.label}</span>
            {s.best && (
              <span className="rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700">
                Better
              </span>
            )}
          </div>
          <div className="mt-2 text-xl font-bold tabular-nums text-slate-900">
            {s.value}
          </div>
          {s.rows && s.rows.length > 0 && (
            <dl className="mt-2 space-y-0.5">
              {s.rows.slice(0, 3).map((r, j) => (
                <div key={j} className="flex items-baseline justify-between gap-2">
                  <dt className="text-xs text-slate-500 truncate min-w-0">{r.label}</dt>
                  <dd className={["text-xs tabular-nums shrink-0", r.strong ? "font-bold text-slate-900" : "font-medium text-slate-700"].join(" ")}>
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      ))}
    </div>
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
          <span className={["text-sm", r.strong ? "font-semibold text-slate-700" : "text-slate-500"].join(" ")}>
            {r.label}
          </span>
          <span
            className={[
              "text-sm tabular-nums",
              r.strong ? "font-bold text-slate-900" : "font-medium text-slate-700",
            ].join(" ")}
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
  const hasRows = result.rows && result.rows.length > 0;
  if (!hasScenarioRows && !hasRows && !result.note) return null;

  return (
    <details className="rounded border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 [&::-webkit-details-marker]:hidden">
        <span>Show the workings</span>
        <svg className="h-4 w-4 transition-transform details-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="space-y-5 border-t border-slate-100 px-4 py-4">
        {result.scenarioResults?.map(
          (s, i) =>
            s.rows &&
            s.rows.length > 0 && (
              <div key={i} className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {s.label}
                </div>
                <RowList rows={s.rows} />
              </div>
            ),
        )}
        {hasRows && !result.scenarioResults && <RowList rows={result.rows!} />}
        {result.note && (
          <p className="border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
            {result.note}
          </p>
        )}
      </div>
    </details>
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
  /** Full (calculator-page) variant: show the chart and a roomier layout. */
  full?: boolean;
  /** Where the tool is surfaced: "calculator" | "blog" | "embed". */
  placement?: string;
  /** Blog category slug when placement === "blog". */
  category?: string;
}) {
  const [values, setValues] = useState<CalcValues>(() => defaultValues(config));
  const [rows, setRows] = useState<GridRow[]>(() => initialRows(config));
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Gate logic: in-blog only, not for converted visitors.
  const gated = placement === "blog" && !isConverted();
  const [revealed, setRevealed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const showResult = !gated || revealed;

  // Shared event stamp for all analytics calls from this tool instance.
  const base = {
    calculator_slug: config.id,
    placement,
    tool_kind: "premium",
    ...(category ? { category } : {}),
  };

  // Fire calc_view when the tool first scrolls into the viewport.
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

  // "See your result": gate pop once per session, then reveal directly.
  const onSeeResult = () => {
    if (!gateModalShownThisSession) {
      gateModalShownThisSession = true;
      setGateOpen(true);
    } else {
      setRevealed(true);
    }
  };

  const revealFromGate = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
  }, []);

  const result = useMemo<PremiumResult>(
    () => config.compute({ values, gridRows: rows }),
    [config, values, rows],
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
        {/* Branded orange accent strip */}
        <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600" />

        {/* Header */}
        <div
          className={[
            "border-b border-slate-200 bg-slate-50/70 px-5 sm:px-7",
            full ? "py-4 sm:py-5" : "py-2.5 sm:py-3",
          ].join(" ")}
        >
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{config.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{config.description}</p>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Inputs */}
          <div className="p-5 sm:p-7">
            <div
              className={[
                "space-y-6",
                !full ? "max-h-[360px] overflow-y-auto pr-2 [scrollbar-width:thin]" : "",
              ].join(" ")}
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
                <details className="rounded border border-slate-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 [&::-webkit-details-marker]:hidden">
                    <span>Advanced options</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
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
                </details>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="space-y-5 border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0">
            {showResult ? (
              <>
                <HeadlineCard result={result} />
                <VerdictBadge result={result} />
                {scenarios && scenarios.length > 0 && <ScenarioTiles scenarios={scenarios} />}
                {result.chart && <MiniBarChart chart={result.chart} />}
                <Workings result={result} />
              </>
            ) : (
              // Pre-reveal: result computed but held behind the gate button.
              // min-height reserves space so revealing causes no layout jump.
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

        {/* Blog placement CTA for converted/non-gated readers */}
        {placement === "blog" && showResult && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 sm:px-7">
            <CalcResultCta campaign={config.id} />
          </div>
        )}
      </div>

      {gateOpen && <ResultGateModal campaign={config.id} onReveal={revealFromGate} />}
    </>
  );
}
