"use client";

/**
 * Sortable per-lead table for the lead-analytics page. Receives a flat
 * serialisable row array; sorting is client-side (a few hundred rows max).
 */
import * as React from "react";
import { useState } from "react";

export type LeadRow = {
  id: string;
  name: string;
  date: string; // ISO
  role: string;
  tier: string | null; // null = unscored
  value: number | null;
  intent: string | null;
  channel: string | null;
  confidence: string | null;
  rationale: string | null;
  snippet: string;
};

const TIER_BADGE: Record<string, string> = {
  very_high: "bg-rose-100 text-rose-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-sky-100 text-sky-800",
  low: "bg-slate-100 text-slate-600",
};

const TIER_RANK: Record<string, number> = { very_high: 4, high: 3, medium: 2, low: 1 };

type SortKey = "date" | "value" | "tier" | "name";

export default function LeadAnalyticsTable({ rows }: { rows: LeadRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [desc, setDesc] = useState(true);

  const sorted = [...rows].sort((a, b) => {
    let d = 0;
    if (sortKey === "date") d = a.date.localeCompare(b.date);
    else if (sortKey === "value") d = (a.value ?? -1) - (b.value ?? -1);
    else if (sortKey === "tier") d = (a.tier ? TIER_RANK[a.tier] ?? 0 : -1) - (b.tier ? TIER_RANK[b.tier] ?? 0 : -1);
    else d = a.name.localeCompare(b.name);
    return desc ? -d : d;
  });

  const header = (key: SortKey, label: string, cls = "") => (
    <th className={`px-3 py-2 ${cls}`}>
      <button
        type="button"
        className="inline-flex items-center gap-1 uppercase tracking-wider hover:text-slate-700"
        onClick={() => {
          if (sortKey === key) setDesc(!desc);
          else {
            setSortKey(key);
            setDesc(true);
          }
        }}
      >
        {label}
        {sortKey === key && <span className="text-[9px]">{desc ? "▼" : "▲"}</span>}
      </button>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
          <tr>
            {header("name", "Lead")}
            {header("date", "When")}
            <th className="hidden px-3 py-2 md:table-cell">Role</th>
            {header("tier", "Tier")}
            {header("value", "Est. £", "text-right")}
            <th className="hidden px-3 py-2 lg:table-cell">Intent</th>
            <th className="hidden px-3 py-2 lg:table-cell">Channel</th>
            <th className="hidden px-3 py-2 xl:table-cell">Message</th>
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-3 py-6 text-center text-slate-400">
                No leads yet.
              </td>
            </tr>
          ) : (
            sorted.map((r) => (
              <tr key={r.id} className="border-t border-slate-100" title={r.rationale ?? undefined}>
                <td className="px-3 py-2 font-medium text-slate-800">{r.name || "-"}</td>
                <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-400">{r.date.slice(0, 10)}</td>
                <td className="hidden px-3 py-2 text-xs text-slate-500 md:table-cell">{r.role || "-"}</td>
                <td className="px-3 py-2">
                  {r.tier ? (
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${TIER_BADGE[r.tier] ?? ""} ${r.confidence === "low" ? "opacity-60" : ""}`}>
                      {r.tier.replace("_", " ")}
                      {r.confidence === "low" ? " ?" : ""}
                    </span>
                  ) : (
                    <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      unscored
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-right font-mono tabular-nums">
                  {r.value != null ? `£${r.value.toLocaleString("en-GB")}` : "-"}
                </td>
                <td className="hidden px-3 py-2 text-xs text-slate-500 lg:table-cell">{r.intent?.replace("_", " ") ?? "-"}</td>
                <td className="hidden px-3 py-2 text-xs text-slate-500 lg:table-cell">{r.channel ?? "-"}</td>
                <td className="hidden max-w-sm truncate px-3 py-2 text-xs text-slate-400 xl:table-cell">{r.snippet || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
