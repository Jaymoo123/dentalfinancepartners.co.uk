"use client";

/**
 * Editable mini-grid — a generalisation of the PortfolioProfitabilityCalculator
 * pattern (add/remove/edit rows of properties). Driven entirely by a GridConfig
 * (columns + rowFactory + min/max rows), so any premium tool can opt into a grid
 * with data only. Rows live in the parent's useState (lifted up via the rows /
 * onRowsChange props) so compute() sees them.
 *
 * Optional debounced localStorage persistence (config.persist) keyed
 * `ptp:grid:<toolId>`, SSR-guarded. Off by default → Phase A adds no storage.
 *
 * The visual style mirrors the existing portfolio calculator (slate cards,
 * emerald accents) so premium tools feel native.
 */
import { useEffect, useRef } from "react";
import type { GridConfig, GridRow } from "@/lib/calculators/premium/types";

const STORAGE_PREFIX = "ptp:grid:";
const PERSIST_DEBOUNCE_MS = 600;

export function MiniGrid({
  toolId,
  config,
  rows,
  onRowsChange,
}: {
  toolId: string;
  config: GridConfig;
  rows: GridRow[];
  onRowsChange: (rows: GridRow[]) => void;
}) {
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced, SSR-guarded persistence. Only when explicitly enabled.
  useEffect(() => {
    if (!config.persist || typeof window === "undefined") return;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_PREFIX + toolId, JSON.stringify(rows));
      } catch {
        /* private mode / quota — persistence is best-effort */
      }
    }, PERSIST_DEBOUNCE_MS);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [rows, toolId, config.persist]);

  const update = (id: string, key: string, value: string | number) => {
    onRowsChange(rows.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  };

  const add = () => {
    if (rows.length >= config.maxRows) return;
    onRowsChange([...rows, config.rowFactory(rows.length)]);
  };

  const remove = (id: string) => {
    if (rows.length <= config.minRows) return;
    onRowsChange(rows.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {config.heading && (
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{config.heading}</h4>
      )}

      {rows.map((row, idx) => {
        const nameCol = config.columns.find((c) => c.type === "text");
        const numericCols = config.columns.filter((c) => c.type !== "text");
        return (
          <div key={row.id} className="border-2 border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between mb-4">
              {nameCol ? (
                <input
                  type="text"
                  value={String(row[nameCol.id] ?? "")}
                  onChange={(e) => update(row.id, nameCol.id, e.target.value)}
                  className="border-0 bg-transparent text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded px-1"
                  aria-label={`Row ${idx + 1} name`}
                />
              ) : (
                <span className="text-xl font-bold text-slate-900">Row {idx + 1}</span>
              )}
              {rows.length > config.minRows && (
                <button
                  type="button"
                  onClick={() => remove(row.id)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded px-2 py-1 uppercase tracking-wider"
                  aria-label={`Remove row ${idx + 1}`}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {numericCols.map((col) => {
                const inputId = `grid-${row.id}-${col.id}`;
                return (
                  <div key={col.id}>
                    <label
                      htmlFor={inputId}
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                    >
                      {col.label}
                    </label>
                    {col.type === "select" ? (
                      <select
                        id={inputId}
                        value={String(row[col.id] ?? "")}
                        onChange={(e) => update(row.id, col.id, e.target.value)}
                        className="w-full border-2 border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
                      >
                        {col.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-2">
                        {col.type === "currency" && (
                          <span className="text-base sm:text-lg font-bold text-slate-900">£</span>
                        )}
                        <input
                          id={inputId}
                          type="number"
                          inputMode="numeric"
                          min="0"
                          step={col.step ?? (col.type === "currency" ? 1000 : 1)}
                          value={Number(row[col.id] ?? 0)}
                          onChange={(e) => update(row.id, col.id, Math.max(0, Number(e.target.value)))}
                          className="flex-1 border-b-2 border-slate-300 bg-transparent px-2 py-2 text-base sm:text-lg font-bold text-slate-900 focus:border-emerald-600 focus:outline-none transition-colors min-h-[44px]"
                        />
                        {col.suffix && (
                          <span className="text-sm font-semibold text-slate-500">{col.suffix}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {rows.length < config.maxRows && (
        <button
          type="button"
          onClick={add}
          className="w-full border-2 border-dashed border-slate-300 bg-slate-50 py-3 sm:py-4 text-sm sm:text-base font-bold text-slate-700 transition-colors hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 min-h-[44px]"
        >
          {config.addLabel}
        </button>
      )}
    </div>
  );
}
