"use client";

/**
 * Shared config-driven calculator renderer.
 *
 * Accepts a GenericTool and renders its fields + live compute result.
 * Emits the standard calc_* lifecycle events through the Phase A analytics
 * SDK — instrumentation lives here once, not in each tool config.
 *
 * TL-06: calc_view / calc_input_change / calc_computed / calc_result_viewed /
 *        calc_copy / calc_share all fire from this renderer with the tool slug
 *        and variant carried as props.
 *
 * Styling uses canonical CSS tokens (--brand-primary, --ink, etc.) so the
 * component renders correctly across all site brands without per-site forks.
 */

import { useEffect, useRef, useState } from "react";
import type { CalcField, CalcValues, GenericTool } from "../types";
import { Field } from "./Field";
import { track } from "../../analytics/track";
import { useInViewOnce } from "../../analytics/useInViewOnce";

function defaultValues(fields: CalcField[]): CalcValues {
  const v: CalcValues = {};
  for (const f of fields) v[f.id] = f.default;
  return v;
}

export function Calculator({
  tool,
  variant = "page",
  resultCta,
}: {
  tool: GenericTool;
  variant?: "page" | "embed";
  /** Optional CTA rendered below the result (page variant). Pass a React node. */
  resultCta?: React.ReactNode;
}) {
  const [values, setValues] = useState<CalcValues>(() => defaultValues(tool.fields));
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placement = variant === "embed" ? "embed" : "calculator";

  const rootRef = useInViewOnce<HTMLDivElement>(() => {
    track("calc_view", { calculator_slug: tool.slug, placement, tool_kind: "standard" });
  });

  useEffect(() => {
    return () => {
      if (computeTimer.current) clearTimeout(computeTimer.current);
    };
  }, []);

  const set = (id: string, v: number | string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    track("calc_input_change", { calculator_slug: tool.slug, field_id: id, placement, tool_kind: "standard" });
    if (!interactedRef.current) {
      interactedRef.current = true;
      track("calc_result_viewed", { calculator_slug: tool.slug, placement, tool_kind: "standard" });
    }
    if (computeTimer.current) clearTimeout(computeTimer.current);
    computeTimer.current = setTimeout(() => {
      track("calc_computed", { calculator_slug: tool.slug, placement, tool_kind: "standard" });
    }, 800);
  };

  const result = tool.compute(values);
  const tone = result.headline.tone ?? "default";

  return (
    <div ref={rootRef} className="bg-white border-l-4 border-[var(--brand-primary)] p-6 sm:p-8 lg:p-10">
      <div className="mb-6 sm:mb-8">
        <div className="inline-block bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-2 sm:mb-3">
          Calculator
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{tool.name}</h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600">{tool.intro}</p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5 sm:space-y-6">
          {tool.fields.map((f) => (
            <Field key={f.id} field={f} value={values[f.id]} onChange={(v) => set(f.id, v)} />
          ))}
        </div>

        <div className="bg-slate-900 p-6 sm:p-8 text-white">
          {result.verdict ? (
            <div className="mb-2">
              <div className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                {result.headline.label}
              </div>
              <div
                className={`inline-block px-5 sm:px-6 py-2 sm:py-3 text-xl sm:text-2xl font-bold ${
                  result.verdict.positive ? "bg-[var(--brand-primary)] text-white" : "bg-amber-400 text-amber-950"
                }`}
              >
                {result.verdict.text}
              </div>
            </div>
          ) : (
            <div className="mb-4 sm:mb-6">
              <div
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 ${
                  tone === "warn" ? "text-amber-400" : "text-[var(--brand-primary)]"
                }`}
              >
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

          {result.rows && result.rows.length > 0 && (
            <div className="border-t border-slate-700 pt-4 sm:pt-6 space-y-3">
              {result.rows.map((r, i) => (
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
      </div>

      {resultCta && variant === "page" && (
        <div className="mt-6">{resultCta}</div>
      )}
    </div>
  );
}
