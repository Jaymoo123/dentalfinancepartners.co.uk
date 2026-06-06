"use client";

/**
 * Shared single-field renderer for the config-driven calculators.
 *
 * Extracted verbatim from Calculator.tsx so the existing fleet AND the premium
 * tier (PremiumCalculator / MiniGrid) render inputs identically — same markup,
 * same classes, same a11y. Changing input styling here changes it everywhere,
 * by design. Keep the rendered output byte-for-byte equal to the original so the
 * existing calculator pages are unchanged.
 */
import type { CalcField } from "@/lib/calculators/types";

export function Field({
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
