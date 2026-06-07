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
 * Styled to match the clean shadcn PremiumCalculator surface (rounded cards,
 * subtle slate fills, compact inputs) so it sits natively inside the "Advanced
 * options" collapsible rather than reading as a heavy bolted-on block.
 */
import { useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";
import type { GridConfig, GridRow } from "@/lib/calculators/premium/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              {nameCol ? (
                <input
                  type="text"
                  value={String(row[nameCol.id] ?? "")}
                  onChange={(e) => update(row.id, nameCol.id, e.target.value)}
                  className="min-w-0 flex-1 rounded-md bg-transparent px-1 py-0.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
                  className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-200/70 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  aria-label={`Remove row ${idx + 1}`}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {numericCols.map((col) => {
                const inputId = `grid-${row.id}-${col.id}`;
                return (
                  <div key={col.id} className="space-y-1.5">
                    <Label htmlFor={inputId} className="text-xs text-slate-500">
                      {col.label}
                    </Label>
                    {col.type === "select" ? (
                      <select
                        id={inputId}
                        value={String(row[col.id] ?? "")}
                        onChange={(e) => update(row.id, col.id, e.target.value)}
                        className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-sm text-slate-900 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        {col.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {col.type === "currency" && (
                          <span className="text-sm text-slate-500">£</span>
                        )}
                        <Input
                          id={inputId}
                          type="number"
                          inputMode="numeric"
                          min="0"
                          step={col.step ?? (col.type === "currency" ? 1000 : 1)}
                          value={Number(row[col.id] ?? 0)}
                          onChange={(e) =>
                            update(row.id, col.id, Math.max(0, Number(e.target.value)))
                          }
                          className="tabular-nums"
                        />
                        {col.suffix && (
                          <span className="text-sm text-slate-500">{col.suffix}</span>
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
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-700"
        >
          <Plus className="h-4 w-4" />
          {config.addLabel}
        </button>
      )}
    </div>
  );
}
