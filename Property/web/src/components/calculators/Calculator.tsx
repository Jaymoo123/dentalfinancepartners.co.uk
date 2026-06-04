"use client";

import { useState } from "react";
import type { CalcField, CalcValues } from "@/lib/calculators/types";
import { getGenericTool } from "@/lib/calculators/registry";
import { EmbedCta } from "@/components/embed/EmbedCta";

function defaultValues(fields: CalcField[]): CalcValues {
  const v: CalcValues = {};
  for (const f of fields) v[f.id] = f.default;
  return v;
}

function Field({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: number | string | boolean;
  onChange: (v: number | string | boolean) => void;
}) {
  if (field.type === "toggle") {
    return (
      <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 border-slate-200 p-3.5 hover:border-emerald-400 transition-colors has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-emerald-600"
        />
        <span className="text-sm leading-snug text-slate-800">{field.label}</span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label
          htmlFor={field.id}
          className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2"
        >
          {field.label}
        </label>
        <select
          id={field.id}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-2 border-slate-300 bg-white px-3 sm:px-4 py-3 text-sm sm:text-base font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
        >
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
      </div>
    );
  }

  // currency / number
  const isCurrency = field.type === "currency";
  return (
    <div>
      <label
        htmlFor={field.id}
        className="block text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2"
      >
        {field.label}
      </label>
      <div className="flex items-center gap-2">
        {isCurrency && <span className="text-xl sm:text-2xl font-bold text-slate-900">£</span>}
        <input
          id={field.id}
          type="number"
          inputMode="numeric"
          min="0"
          step={field.step ?? (isCurrency ? 1000 : 1)}
          value={Number(value)}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
        />
        {field.suffix && <span className="text-base font-semibold text-slate-500">{field.suffix}</span>}
      </div>
      {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
    </div>
  );
}

export function Calculator({
  slug,
  variant = "page",
}: {
  slug: string;
  variant?: "page" | "embed";
}) {
  const tool = getGenericTool(slug);
  const [values, setValues] = useState<CalcValues>(() => (tool ? defaultValues(tool.fields) : {}));
  const set = (id: string, v: number | string | boolean) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  if (!tool) return null;
  const result = tool.compute(values);
  const tone = result.headline.tone ?? "default";
  const headlineColor =
    tone === "warn" ? "text-amber-400" : tone === "good" ? "text-emerald-400" : "text-emerald-400";

  return (
    <div className="bg-white border-l-4 border-emerald-600 p-6 sm:p-8 lg:p-10">
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
