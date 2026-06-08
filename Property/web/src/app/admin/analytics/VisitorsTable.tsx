"use client";

/**
 * Visitors tab — the most-browsed view. Client-side search / filter / sort over
 * the already-fetched visitor rows (≤500). This is an ADMIN-ONLY, key-gated,
 * noindex page and the rows are already in the server-rendered HTML, so filtering
 * them on the client exposes nothing new (the lead name/email are admin data).
 */
import { useMemo, useState } from "react";
import Link from "next/link";

export type VisitorRow = {
  visitor_id: string;
  last_seen: string;
  total_sessions: number;
  page_views: number;
  engaged_ms: number;
  max_scroll_pct: number;
  cta_clicks: number;
  device: string | null;
  country: string | null;
  source: string;
  topic: string | null;
  converted: boolean;
  lead_name: string | null;
  lead_email: string | null;
  lead_role: string | null;
};

function secs(ms: number): string {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}
function ago(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

type Filter = "all" | "converted" | "returning";
type Sort = "recent" | "engaged" | "visits";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

export default function VisitorsTable({
  rows,
  adminKey,
  country,
}: {
  rows: VisitorRow[];
  adminKey: string;
  country: string;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");

  const converted = rows.filter((r) => r.converted).length;
  const returning = rows.filter((r) => r.total_sessions > 1).length;
  const avgEng = rows.length ? rows.reduce((a, r) => a + r.engaged_ms, 0) / rows.length : 0;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = rows.filter((r) => {
      if (filter === "converted" && !r.converted) return false;
      if (filter === "returning" && r.total_sessions <= 1) return false;
      if (term) {
        const hay = `${r.visitor_id} ${r.lead_name ?? ""} ${r.lead_email ?? ""} ${r.topic ?? ""} ${r.source} ${r.country ?? ""}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
    out.sort((a, b) => {
      if (sort === "engaged") return b.engaged_ms - a.engaged_ms;
      if (sort === "visits") return b.total_sessions - a.total_sessions;
      return new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime();
    });
    return out;
  }, [rows, q, filter, sort]);

  const chip = (key: Filter, label: string) => (
    <button
      type="button"
      onClick={() => setFilter(key)}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        filter === key ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Visitors" value={String(rows.length)} />
        <Stat label="Returning" value={String(returning)} />
        <Stat label="Converted" value={String(converted)} />
        <Stat label="Avg engaged" value={secs(avgEng)} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search id, lead, topic, source…"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
        />
        <div className="flex items-center gap-1">
          {chip("all", "All")}
          {chip("converted", "Converted")}
          {chip("returning", "Returning")}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs text-slate-700"
        >
          <option value="recent">Most recent</option>
          <option value="engaged">Most engaged</option>
          <option value="visits">Most visits</option>
        </select>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Showing {filtered.length} of {rows.length}. Click any visitor to see their full journey, mini-funnel and story.
      </p>

      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Visitor</th>
              <th className="hidden px-3 py-2 sm:table-cell">Topic</th>
              <th className="px-3 py-2">Last seen</th>
              <th className="px-3 py-2 text-right">Visits</th>
              <th className="px-3 py-2 text-right">Pages</th>
              <th className="px-3 py-2 text-right">Engaged</th>
              <th className="hidden px-3 py-2 text-right lg:table-cell">Scroll</th>
              <th className="hidden px-3 py-2 text-right lg:table-cell">CTAs</th>
              <th className="hidden px-3 py-2 sm:table-cell">Device</th>
              <th className="hidden px-3 py-2 lg:table-cell">Country</th>
              <th className="hidden px-3 py-2 lg:table-cell">Source</th>
              <th className="px-3 py-2 text-center">Lead</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="px-3 py-4 text-center text-slate-400">No visitors match.</td>
              </tr>
            ) : (
              filtered.map((v) => (
                <tr key={v.visitor_id} className={`border-t border-slate-100 ${v.converted ? "bg-emerald-50/40" : ""}`}>
                  <td className="px-3 py-2">
                    <Link href={`/admin/analytics/visitor/${v.visitor_id}?k=${adminKey}`} className="font-mono text-xs text-emerald-700 underline">
                      {v.visitor_id.slice(0, 12)}…
                    </Link>
                    {v.lead_name || v.lead_email ? (
                      <div className="text-[11px] text-emerald-800">{v.lead_name || v.lead_email}</div>
                    ) : null}
                  </td>
                  <td className="hidden px-3 py-2 text-slate-600 sm:table-cell">{v.topic || "—"}</td>
                  <td className="px-3 py-2 text-slate-500">{ago(v.last_seen)}</td>
                  <td className="px-3 py-2 text-right font-mono">{v.total_sessions}</td>
                  <td className="px-3 py-2 text-right font-mono">{v.page_views}</td>
                  <td className="px-3 py-2 text-right font-mono">{secs(v.engaged_ms)}</td>
                  <td className="hidden px-3 py-2 text-right font-mono lg:table-cell">{v.max_scroll_pct}%</td>
                  <td className="hidden px-3 py-2 text-right font-mono lg:table-cell">{v.cta_clicks}</td>
                  <td className="hidden px-3 py-2 text-slate-600 sm:table-cell">{v.device || "—"}</td>
                  <td className="hidden px-3 py-2 text-slate-600 lg:table-cell">{v.country || "—"}</td>
                  <td className="hidden px-3 py-2 text-slate-600 lg:table-cell">{v.source}</td>
                  <td className="px-3 py-2 text-center text-xs text-emerald-800">
                    {v.converted ? "✅" : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Country: {country}. Filters apply to the most-recent 500 visitors.</p>
    </div>
  );
}
