"use client";

/**
 * Dependency-free premium calculator renderer for the contractors-ir35 site.
 *
 * Renders ANY PremiumToolConfig in a two-column card layout: guided inputs on
 * the left, one clear answer on the right. Uses native HTML inputs throughout:
 *   - currency / number fields: text input + native range slider
 *   - select fields: native <select> (or segmented <button> groups for short option sets)
 *   - toggle fields: native checkbox rendered as a labelled switch
 *   - "Advanced options" and "Show the workings" use native <details>/<summary>
 *
 * The comparison chart (full variant only) is a dependency-free inline SVG bar
 * chart via PremiumBarChart.tsx (no recharts).
 *
 * TOKEN DISCIPLINE: cfp does NOT define --gold, --navy or --dark. Every token here
 * uses the cfp design system:
 *   - var(--accent): petrol-cyan (#0e7490) active states, focus rings, accent bar
 *   - var(--border): borders and grid lines
 *   - var(--surface) / var(--surface-elevated): card surfaces
 *   - var(--ink) / var(--ink-soft) / var(--muted): text hierarchy
 * Never use var(--gold), var(--navy), var(--dark) or var(--primary) here.
 *
 * Analytics: fires only allowlisted event names (calc_view / calc_input_change /
 * calc_computed / calc_result_viewed / cta_click) per packages/web-shared/analytics/types.ts.
 *
 * Result gate: in-blog only, never for converted visitors, reveals on any dismiss.
 * Shows at most once per session (module-level flag, mirrors Dentists exactly).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CalcField, CalcValues } from "@/lib/calculators/premium/types";
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { PremiumToolConfig, GridRow, PremiumResult, ScenarioResult } from "@/lib/calculators/premium/types";
import { PremiumBarChart } from "./PremiumBarChart";
import { ResultGateModal } from "./ResultGateModal";
import { CalcResultCta } from "@/components/calculators/CalcResultCta";
import { track } from "@accounting-network/web-shared/analytics/track";
import { useInViewOnce } from "@accounting-network/web-shared/analytics/useInViewOnce";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { btnPrimary } from "@/components/ui/layout-utils";

// The gate interstitial shows at most once per session.
let gateModalShownThisSession = false;

/* ---------------------------------------------------------------------------
 * Defaults
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

function sliderBounds(field: CalcField): { min: number; max: number; step: number } {
  const min = field.min ?? 0;
  const defaultNum = typeof field.default === "number" ? field.default : 0;
  const max = field.max ?? Math.max(defaultNum * 3, field.type === "currency" ? 100000 : 100);
  const step = field.step ?? (field.type === "currency" ? 500 : 1);
  return { min, max, step };
}

/* ---------------------------------------------------------------------------
 * Field renderers (left column)
 * ------------------------------------------------------------------------- */

const inputCls =
  "w-full min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25";

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
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  const [text, setText] = useState<string>(() =>
    String(Number.isFinite(value) ? value : min)
  );
  const lastCommitted = useRef<number>(Number.isFinite(value) ? value : min);

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
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={`pf-${field.id}`}
          className="text-sm font-medium text-[var(--ink)]"
        >
          {field.label}
        </label>
        <div className="flex items-center gap-1">
          {isCurrency && (
            <span className="text-sm text-[var(--muted)]">£</span>
          )}
          <input
            id={`pf-${field.id}`}
            type="text"
            inputMode="decimal"
            value={text}
            onChange={(e) => {
              const raw = e.target.value;
              if (/^-?\d*\.?\d*$/.test(raw)) {
                setText(raw);
                if (raw !== "" && raw !== "-" && raw !== ".")
                  commit(Number(raw));
              }
            }}
            onBlur={() => {
              const n =
                text === "" || text === "-" || text === "."
                  ? min
                  : Number(text);
              const c = clamp(Number.isFinite(n) ? n : min);
              setText(String(c));
              commit(c);
            }}
            className={`${inputCls} w-28 text-right tabular-nums`}
          />
          {field.suffix && (
            <span className="text-sm text-[var(--muted)]">{field.suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(value, min), max)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={field.label}
        className="w-full accent-[var(--accent)] cursor-pointer"
      />
      {field.help && (
        <p className="text-xs text-[var(--muted)]">{field.help}</p>
      )}
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
  const opts = field.options ?? [];
  // Use segmented buttons for short lists (up to 4 options) and a native select
  // for longer lists, to keep the layout clean on narrow panels.
  if (opts.length <= 4) {
    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--ink)]">{field.label}</p>
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label={field.label}
        >
          {opts.map((opt) => {
            const active = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(opt.value)}
                className={[
                  "rounded-lg border px-3.5 py-2 text-sm transition-colors min-h-[38px]",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold"
                    : "border-[var(--border)] text-[var(--ink-soft)] hover:bg-[var(--surface-elevated)]",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        {field.help && (
          <p className="text-xs text-[var(--muted)]">{field.help}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={`pf-${field.id}`}
        className="block text-sm font-medium text-[var(--ink)]"
      >
        {field.label}
      </label>
      <select
        id={`pf-${field.id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        {opts.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {field.help && (
        <p className="text-xs text-[var(--muted)]">{field.help}</p>
      )}
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
      <label
        htmlFor={`pf-${field.id}`}
        className="flex items-center justify-between gap-3 cursor-pointer"
      >
        <span className="text-sm font-medium text-[var(--ink)]">
          {field.label}
        </span>
        <span
          className={[
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
            value ? "bg-[var(--accent)]" : "bg-[var(--border)]",
          ].join(" ")}
        >
          <input
            id={`pf-${field.id}`}
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
            aria-label={field.label}
          />
          <span
            className={[
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
              value ? "translate-x-5" : "translate-x-0.5",
            ].join(" ")}
          />
        </span>
      </label>
      {field.help && (
        <p className="text-xs text-[var(--muted)] mt-1">{field.help}</p>
      )}
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
    return (
      <ToggleField field={field} value={Boolean(value)} onChange={onChange} />
    );
  }
  return (
    <NumberField field={field} value={Number(value) || 0} onChange={onChange} />
  );
}

/* ---------------------------------------------------------------------------
 * Result panel components
 * ------------------------------------------------------------------------- */

function HeadlineCard({ result }: { result: PremiumResult }) {
  const tone = result.headline.tone ?? "good";
  const accentClass =
    tone === "warn"
      ? "bg-amber-50 border-amber-200"
      : "bg-[var(--surface-elevated)] border-[var(--border)]";
  return (
    <div className={`rounded-xl border p-4 ${accentClass}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {result.headline.label}
      </p>
      <p className="mt-1 text-3xl font-bold tabular-nums text-[var(--ink)] sm:text-4xl">
        {result.headline.value}
      </p>
      {result.headline.sub && (
        <p className="mt-1.5 text-xs text-[var(--ink-soft)]">
          {result.headline.sub}
        </p>
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
          className={[
            "rounded-xl border bg-white p-4",
            s.best
              ? "border-[var(--accent)] ring-1 ring-[var(--accent)]/30"
              : "border-[var(--border)]",
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-1">
            <span className="text-xs text-[var(--muted)]">{s.label}</span>
            {s.best && (
              <span className="rounded-full bg-[var(--accent)]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]">
                Better
              </span>
            )}
          </div>
          <div className="mt-2 text-xl font-bold tabular-nums text-[var(--ink)]">
            {s.headline.value}
          </div>
          <div className="mt-0.5 text-xs text-[var(--muted)]">
            {s.headline.label}
          </div>
          {s.headline.sub && (
            <div className="mt-0.5 text-xs text-[var(--ink-soft)]">
              {s.headline.sub}
            </div>
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
      {rows
        .filter((r) => r.label || r.value)
        .map((r, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4">
            <span
              className={[
                "text-sm",
                r.strong ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-soft)]",
              ].join(" ")}
            >
              {r.label}
            </span>
            <span
              className={[
                "text-sm tabular-nums shrink-0",
                r.strong
                  ? "font-bold text-[var(--ink)]"
                  : "font-medium text-[var(--ink-soft)]",
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
  const hasScenarioRows = result.scenarioResults?.some(
    (s) => s.rows && s.rows.length > 0
  );
  const hasBreakdown = result.breakdown && result.breakdown.length > 0;
  const hasGenericRows =
    !result.scenarioResults && result.rows && result.rows.length > 0;
  if (!hasScenarioRows && !hasBreakdown && !hasGenericRows && !result.note)
    return null;

  return (
    <details className="rounded-xl border border-[var(--border)] bg-white group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] [&::-webkit-details-marker]:hidden">
        <span>Show the workings</span>
        <svg
          className="h-4 w-4 transition-transform group-open:rotate-180 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="space-y-4 border-t border-[var(--border)] px-4 py-4">
        {result.scenarioResults?.map(
          (s) =>
            s.rows &&
            s.rows.length > 0 && (
              <div key={s.id} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {s.label}
                </p>
                <RowList rows={s.rows} />
              </div>
            )
        )}
        {hasGenericRows && <RowList rows={result.rows!} />}
        {hasBreakdown && (
          <div className="space-y-2 border-t border-[var(--border)] pt-4">
            <RowList rows={result.breakdown!} />
          </div>
        )}
        {result.note && (
          <p className="border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted)]">
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
  topicKey = null,
}: {
  config: PremiumToolConfig;
  /** Full (calculator-page) variant shows the comparison chart. Blog default is compact. */
  full?: boolean;
  /** Where the tool is surfaced: "calculator" | "blog" | "embed". */
  placement?: string;
  /** Blog category slug when placement === "blog". */
  category?: string;
  /** Resolved intent topic, threaded from PremiumUpgrade so the gate modal never re-derives it from the URL. */
  topicKey?: TopicKey | null;
}) {
  const [values, setValues] = useState<CalcValues>(() => defaultValues(config));
  const [rows] = useState<GridRow[]>(() => initialRows(config));
  const [scenario] = useState<string>(
    () => config.scenarios?.scenarios[0]?.id ?? ""
  );
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Result gate: in-blog only, never for already-converted visitors.
  const gated = placement === "blog" && !isConverted();
  const [revealed, setRevealed] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const showResult = !gated || revealed;

  const base = {
    calculator_slug: config.id,
    placement,
    tool_kind: "premium",
    ...(category ? { category } : {}),
  };

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

  // "See your result" button: opens the gate interstitial the first time this
  // session, otherwise reveals directly.
  const onSeeResult = () => {
    if (!gateModalShownThisSession) {
      gateModalShownThisSession = true;
      setGateOpen(true);
    } else {
      setRevealed(true);
    }
  };

  // Stable identity so the modal's focus/Escape effects are not re-run on
  // unrelated parent re-renders.
  const revealFromGate = useCallback(() => {
    setGateOpen(false);
    setRevealed(true);
  }, []);

  const result = useMemo<PremiumResult>(
    () => config.compute({ values, rows, scenario }),
    [config, values, rows, scenario]
  );

  const primaryFields = config.fields.filter((f) => !f.advanced);
  const advancedFields = config.fields.filter((f) => f.advanced === true);
  const hasAdvanced = advancedFields.length > 0;
  const scenarios = result.scenarioResults;

  return (
    <>
      <div
        ref={rootRef}
        className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
      >
        {/* Top accent bar -- cfp petrol-cyan (no --primary defined) */}
        <div className="h-1 bg-[var(--accent)]" />

        {/* Header strip */}
        <div className="border-b border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-3 sm:px-7">
          <h3 className="text-base font-bold text-[var(--ink)] sm:text-lg">
            {config.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{config.intro}</p>
        </div>

        <div className="grid lg:grid-cols-2">
          {/* Input panel */}
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
                <details className="rounded-xl border border-[var(--border)] group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                    <span>Advanced options</span>
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-180 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="space-y-6 border-t border-[var(--border)] px-4 py-5">
                    {advancedFields.map((f) => (
                      <FieldControl
                        key={f.id}
                        field={f}
                        value={values[f.id]}
                        onChange={(v) => setValue(f.id, v)}
                      />
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>

          {/* Result panel */}
          <div className="space-y-4 border-t border-[var(--border)] bg-[var(--surface-elevated)] p-5 sm:p-7 lg:border-l lg:border-t-0">
            {showResult ? (
              <>
                <HeadlineCard result={result} />
                {scenarios && scenarios.length > 0 && (
                  <ScenarioTiles scenarios={scenarios} />
                )}
                {full && config.chart && result.chart && (
                  <PremiumBarChart spec={config.chart} result={result.chart} />
                )}
                <Workings result={result} />
              </>
            ) : (
              // Pre-reveal state: figure computed but held behind the gate button.
              // min-height reserves the result area to prevent layout jump on reveal.
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-center">
                <p className="text-sm font-medium text-[var(--ink-soft)]">
                  Your figure is ready.
                </p>
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

        {/* In-blog non-gated CTA (converted visitors who see their result instantly). */}
        {placement === "blog" && !gated && !revealed && (
          <div className="border-t border-[var(--border)] bg-white px-5 py-4 sm:px-7">
            <CalcResultCta campaign={config.id} />
          </div>
        )}
      </div>

      {gateOpen && (
        <ResultGateModal campaign={config.id} topicKey={topicKey} onReveal={revealFromGate} />
      )}
    </>
  );
}
