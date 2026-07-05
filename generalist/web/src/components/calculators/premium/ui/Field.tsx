"use client";

/**
 * Field renderer for the generalist premium calculator fleet.
 *
 * Dependency-free: uses native <input type="range"> for sliders, native
 * <select> for dropdowns, and a plain checkbox-style toggle. No radix,
 * no shadcn slider/label/input primitives. Styled with the generalist
 * orange-500/600 + neutral-900 tokens.
 *
 * Supports CalcField types: "currency", "number", "select", "toggle".
 */

import { useEffect, useRef, useState } from "react";
import type { CalcField, CalcValues } from "@accounting-network/web-shared/tools/types";

const labelClass = "block text-sm font-medium text-slate-700";
const helpClass = "mt-1 text-xs text-slate-400 leading-relaxed";

const inputClass =
  "h-10 w-28 border border-slate-200 bg-white px-2.5 py-1.5 text-right text-sm font-medium text-slate-900 tabular-nums shadow-sm transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/25";

const rangeClass =
  "w-full cursor-pointer accent-orange-500";

// ---------------------------------------------------------------------------
// Number / currency field with a native range slider
// ---------------------------------------------------------------------------

function NumberField({
  field,
  value,
  onChange,
}: {
  field: CalcField;
  value: number;
  onChange: (v: number) => void;
}) {
  const isCurrency = field.type === "currency";
  const min = field.min ?? 0;
  const defaultNum = typeof field.default === "number" ? field.default : 0;
  const max = field.max ?? Math.max(defaultNum * 3, isCurrency ? 100000 : 100);
  const step = field.step ?? (isCurrency ? 500 : 1);

  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  // Local string state so the user can blank the field and retype without
  // the slider clamping on every keystroke.
  const [text, setText] = useState<string>(() => String(Number.isFinite(value) ? value : min));
  const lastCommitted = useRef<number>(Number.isFinite(value) ? value : min);

  // Resync from outside (e.g. slider drives the box)
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
    <div className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <label className={labelClass}>{field.label}</label>
        <div className="flex items-center gap-1">
          {isCurrency && <span className="text-sm font-medium text-slate-500">£</span>}
          <input
            type="text"
            inputMode="decimal"
            value={text}
            aria-label={field.label}
            onChange={(e) => {
              const raw = e.target.value;
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
            className={inputClass}
          />
          {field.suffix && (
            <span className="text-sm font-medium text-slate-500">{field.suffix}</span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(value, min), max)}
        onChange={(e) => {
          const n = Number(e.target.value);
          lastCommitted.current = n;
          setText(String(n));
          onChange(n);
        }}
        aria-label={`${field.label} slider`}
        className={rangeClass}
      />
      {field.help && <p className={helpClass}>{field.help}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Select field — segmented control (radio-button style buttons)
// ---------------------------------------------------------------------------

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
      <span className={labelClass}>{field.label}</span>
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
              className={[
                "rounded border px-3.5 py-2 text-sm transition-colors min-h-[40px]",
                active
                  ? "border-orange-500 bg-orange-50 text-orange-800 font-semibold"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {field.help && <p className={helpClass}>{field.help}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toggle field — labelled switch using a styled checkbox
// ---------------------------------------------------------------------------

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
          className={[
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
            value ? "bg-orange-500" : "bg-slate-200",
          ].join(" ")}
        >
          <input
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
      {field.help && <p className={helpClass}>{field.help}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public: unified field control dispatcher
// ---------------------------------------------------------------------------

export function FieldControl({
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
