"use client";

/**
 * Editable mini-grid for the generalist premium calculator fleet.
 *
 * Used by Tool 4 (employer-cost-premium) to manage a list of employees.
 * Driven entirely by a GridConfig (columns + rowFactory + min/max rows).
 * Rows are lifted to the parent via rows/onRowsChange props so compute()
 * sees them.
 *
 * Optional debounced localStorage persistence keyed `hd:grid:<toolId>`
 * (NOT `ptp:` — generalist brand prefix). Styled with orange-500/600
 * and slate generalist tokens. Dependency-free: native inputs only.
 */

import { useEffect, useRef } from "react";
import type { GridConfig, GridRow } from "@/lib/calculators/premium/types";

const STORAGE_PREFIX = "hd:grid:";
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

  // Debounced, SSR-guarded persistence (best-effort, always enabled).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_PREFIX + toolId, JSON.stringify(rows));
      } catch {
        /* private mode or quota exceeded — persistence is best-effort */
      }
    }, PERSIST_DEBOUNCE_MS);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [rows, toolId]);

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
    <div className="space-y-3">
      {config.heading && (
        <h4 className="text-sm font-semibold text-slate-700">{config.heading}</h4>
      )}

      {rows.map((row, idx) => {
        const nameCol = config.columns.find((c) => c.type === "text");
        const numericCols = config.columns.filter((c) => c.type !== "text");
        return (
          <div
            key={row.id}
            className="rounded border border-slate-200 bg-slate-50/70 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              {nameCol ? (
                <input
                  type="text"
                  value={String(row[nameCol.id] ?? "")}
                  onChange={(e) => update(row.id, nameCol.id, e.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-1 py-0.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 rounded"
                  aria-label={`Row ${idx + 1} name`}
                />
              ) : (
                <span className="text-sm font-semibold text-slate-900">
                  Row {idx + 1}
                </span>
              )}
              {rows.length > config.minRows && (
                <button
                  type="button"
                  onClick={() => remove(row.id)}
                  className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-200/70 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  aria-label={`Remove row ${idx + 1}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {numericCols.map((col) => {
                const inputId = `grid-${row.id}-${col.id}`;
                return (
                  <div key={col.id} className="space-y-1">
                    <label htmlFor={inputId} className="block text-xs font-medium text-slate-500">
                      {col.label}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {col.type === "currency" && (
                        <span className="text-sm text-slate-500">£</span>
                      )}
                      <input
                        id={inputId}
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step={col.step ?? (col.type === "currency" ? 1000 : 1)}
                        value={Number(row[col.id] ?? 0)}
                        onChange={(e) =>
                          update(row.id, col.id, Math.max(0, Number(e.target.value)))
                        }
                        className="h-9 w-full border border-slate-200 bg-white px-2.5 text-sm text-slate-900 tabular-nums transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/25"
                      />
                    </div>
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
          className="flex w-full items-center justify-center gap-1.5 rounded border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-orange-500 hover:bg-orange-50/60 hover:text-orange-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {config.addLabel}
        </button>
      )}
    </div>
  );
}
