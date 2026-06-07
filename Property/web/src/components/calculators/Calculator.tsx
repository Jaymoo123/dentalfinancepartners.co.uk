"use client";

import { useEffect, useRef, useState } from "react";
import type { CalcField, CalcValues } from "@/lib/calculators/types";
import { getGenericTool } from "@/lib/calculators/registry";
import { Field } from "@/components/calculators/fields/Field";
import { EmbedCta } from "@/components/embed/EmbedCta";
import { track } from "@/lib/analytics/track";
import { useInViewOnce } from "@/lib/analytics/useInViewOnce";

function defaultValues(fields: CalcField[]): CalcValues {
  const v: CalcValues = {};
  for (const f of fields) v[f.id] = f.default;
  return v;
}

export function Calculator({
  slug,
  variant = "page",
}: {
  slug: string;
  variant?: "page" | "embed";
}) {
  // Resolved synchronously from a static registry, so `tool` is never briefly
  // undefined for a valid slug: it's the same stable reference on every render,
  // which keeps the calc_view effect below firing exactly once.
  const tool = getGenericTool(slug);
  const [values, setValues] = useState<CalcValues>(() => (tool ? defaultValues(tool.fields) : {}));
  const interactedRef = useRef(false);
  const computeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Where this calculator is surfaced: its own page vs an external embed iframe.
  const placement = variant === "embed" ? "embed" : "calculator";

  // Honest "viewed": fire calc_view the FIRST time the calculator actually
  // scrolls into view (not on mount), so a calc the visitor never reaches isn't
  // counted. Uses the SAME slug as calc_computed so the dashboard reconciles
  // views against computes. track() buffers until configureAnalytics() lands and
  // no-ops without consent; the hook fires once.
  const rootRef = useInViewOnce<HTMLDivElement>(() => {
    if (tool) {
      track("calc_view", { calculator_slug: tool.slug, placement, tool_kind: "standard" });
    }
  });

  // Clear the debounce timer on unmount.
  useEffect(() => {
    return () => {
      if (computeTimer.current) clearTimeout(computeTimer.current);
    };
  }, []);

  const set = (id: string, v: number | string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    if (!tool) return;
    track("calc_input_change", { calculator_slug: tool.slug, field_id: id, placement, tool_kind: "standard" });
    if (!interactedRef.current) {
      interactedRef.current = true;
      track("calc_result_viewed", { calculator_slug: tool.slug, placement, tool_kind: "standard" });
    }
    // Debounced "the user settled on inputs and saw a result".
    if (computeTimer.current) clearTimeout(computeTimer.current);
    computeTimer.current = setTimeout(() => {
      track("calc_computed", { calculator_slug: tool.slug, placement, tool_kind: "standard" });
    }, 800);
  };

  if (!tool) return null;
  const result = tool.compute(values);
  const tone = result.headline.tone ?? "default";
  const headlineColor =
    tone === "warn" ? "text-amber-400" : tone === "good" ? "text-emerald-400" : "text-emerald-400";

  return (
    <div ref={rootRef} className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10">
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

      {variant === "embed" && <EmbedCta campaign={tool.slug} label={tool.ctaLabel} />}
    </div>
  );
}
