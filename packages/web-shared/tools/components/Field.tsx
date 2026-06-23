"use client";

/**
 * Shared single-field renderer for config-driven calculators.
 *
 * Uses canonical CSS tokens for focus rings (--brand-primary) so it renders
 * correctly across all site brands. Structural classes (border, spacing, a11y)
 * are site-agnostic.
 *
 * Lifted from Property/web/src/components/calculators/fields/Field.tsx.
 */

import { useEffect, useRef, useState } from "react";
import type { CalcField } from "../types";

// ---------------------------------------------------------------------------
// Number / currency sub-component
// Extracted so that React hooks are never called after a conditional return
// at the parent level (Rules of Hooks). Mirrors the string-backed pattern from
// PremiumCalculator's NumberField to fix the snap-to-0 rage-click bug: a
// controlled type="number" with Number(e.target.value) in onChange clamps on
// every keystroke, preventing users from clearing the box to retype a figure.
// ---------------------------------------------------------------------------
function NumberOrCurrencyField({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: number | string | boolean;
  onChange: (v: number | string | boolean) => void;
}) {
  const isCurrency = field.type === "currency";
  const min = field.min ?? 0;

  const numericValue = Number.isFinite(Number(value)) ? Number(value) : min;
  const [text, setText] = useState<string>(() => String(numericValue));
  const lastCommitted = useRef<number>(numericValue);

  // Resync the display when the value is driven from outside (e.g. programmatic
  // reset or a sibling field interaction that changes this field's prop).
  useEffect(() => {
    const incoming = Number.isFinite(Number(value)) ? Number(value) : min;
    if (incoming !== lastCommitted.current) {
      lastCommitted.current = incoming;
      setText(String(incoming));
    }
  }, [value, min]);

  const commit = (n: number) => {
    const clamped = Math.max(min, n);
    lastCommitted.current = clamped;
    onChange(clamped);
  };

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
          type="text"
          inputMode="decimal"
          value={text}
          onChange={(e) => {
            const raw = e.target.value;
            // Allow empty string and partial numeric entry while the user is
            // still typing; propagate a real number to the parent only when
            // the string already represents a valid one.
            if (/^\d*\.?\d*$/.test(raw)) {
              setText(raw);
              if (raw !== "" && raw !== ".") commit(Number(raw));
            }
          }}
          onBlur={() => {
            const n = text === "" || text === "." ? min : Number(text);
            const clamped = Math.max(min, Number.isFinite(n) ? n : min);
            setText(String(clamped));
            commit(clamped);
          }}
          className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 sm:py-3 text-xl sm:text-2xl font-bold text-slate-900 focus:border-[var(--brand-primary)] focus:outline-none transition-colors min-h-[44px]"
        />
        {field.suffix && <span className="text-base font-semibold text-slate-500">{field.suffix}</span>}
      </div>
      {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public component — props API unchanged
// ---------------------------------------------------------------------------
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
      <label className="flex items-start gap-3 cursor-pointer rounded-lg border-2 border-slate-200 p-3.5 hover:border-[var(--brand-primary)] transition-colors has-[:checked]:border-[var(--brand-primary)] has-[:checked]:bg-[var(--brand-primary)]/5">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--brand-primary)]"
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
          className="w-full border-2 border-slate-300 bg-white px-3 sm:px-4 py-3 text-sm sm:text-base font-semibold text-slate-900 focus:border-[var(--brand-primary)] focus:outline-none transition-colors min-h-[44px]"
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
  return <NumberOrCurrencyField field={field} value={value} onChange={onChange} />;
}
