"use client";

/**
 * Visitors tab: client-side search/filter/sort over the already-fetched visitor
 * rows (up to 500). This is an admin-only, cookie-gated, noindex page and the
 * rows are already in the server-rendered HTML, so filtering on the client
 * exposes nothing new.
 *
 * visitorBasePath: the route prefix for visitor detail pages, e.g.
 * "/admin/analytics/visitor". The visitorId is appended as a path segment.
 *
 * NOTE: no key or credential in hrefs (OB-01 design). Auth travels in a cookie.
 *
 * Shared across all operator consoles. Lifted from Property with auth pattern
 * corrected (Property keeps its own copy until adoption).
 */
import { useEffect, useMemo, useState } from "react";
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
  // Matches SnapshotCard's spacing/type scale so the four visitor stats sit on
  // the same visual grid as every other dashboard card.
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

export default function VisitorsTable({
  rows,
  country,
  visitorBasePath,
  totalVisitors,
}: {
  rows: VisitorRow[];
  country: string;
  visitorBasePath: string;
  /** True (uncapped) distinct-visitor count; rows is only the loaded sample. */
  totalVisitors?: number;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  // "Last seen" is a relative label computed by ago() from Date.now(). React does
  // not re-render on its own, so without this it froze at page-load time and only
  // moved on a manual refresh. Re-render every 30s so the relative times advance
  // on their own. Cheap: no re-fetch, just recomputes the already-loaded rows.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  // Render only the first slice by default. Search/filter/sort still run over
  // every loaded row; this only caps how many <tr> the browser paints at once,
  // which is what makes opening this tab feel sluggish with a large sample.
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_CAP = 100;

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

  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_CAP);

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
        <Stat label="Visitors" value={(totalVisitors ?? rows.length).toLocaleString("en-GB")} />
        <Stat label="Returning" value={String(returning)} />
        <Stat label="Converted" value={String(converted)} />
        <Stat label="Avg engaged" value={secs(avgEng)} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search id, lead, topic, source..."
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

      <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span>
          Showing {visible.length} of {filtered.length}
          {filtered.length !== rows.length ? ` (filtered from ${rows.length})` : ""}. Click any visitor to see their full journey.
        </span>
        {!showAll && filtered.length > VISIBLE_CAP && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600 hover:bg-slate-200"
          >
            Show all {filtered.length}
          </button>
        )}
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
              visible.map((v) => (
                <tr key={v.visitor_id} className={`border-t border-slate-100 ${v.converted ? "bg-emerald-50/40" : ""}`}>
                  <td className="px-3 py-2">
                    <Link href={`${visitorBasePath}/${v.visitor_id}`} className="font-mono text-xs text-emerald-700 underline">
                      {v.visitor_id.slice(0, 12)}...
                    </Link>
                    {v.lead_name || v.lead_email ? (
                      <div className="text-[11px] text-emerald-800">{v.lead_name || v.lead_email}</div>
                    ) : null}
                  </td>
                  <td className="hidden px-3 py-2 text-slate-600 sm:table-cell">{v.topic || "-"}</td>
                  <td className="px-3 py-2 text-slate-500">{ago(v.last_seen)}</td>
                  <td className="px-3 py-2 text-right font-mono">{v.total_sessions}</td>
                  <td className="px-3 py-2 text-right font-mono">{v.page_views}</td>
                  <td className="px-3 py-2 text-right font-mono">{secs(v.engaged_ms)}</td>
                  <td className="hidden px-3 py-2 text-right font-mono lg:table-cell">{v.max_scroll_pct}%</td>
                  <td className="hidden px-3 py-2 text-right font-mono lg:table-cell">{v.cta_clicks}</td>
                  <td className="hidden px-3 py-2 text-slate-600 sm:table-cell">{v.device || "-"}</td>
                  <td className="hidden px-3 py-2 text-slate-600 lg:table-cell">{v.country || "-"}</td>
                  <td className="hidden px-3 py-2 text-slate-600 lg:table-cell">{v.source}</td>
                  <td className="px-3 py-2 text-center text-xs text-emerald-800">
                    {v.converted ? "Y" : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Country: {country}. List shows the most-recent {rows.length.toLocaleString("en-GB")}{totalVisitors != null && totalVisitors > rows.length ? ` of ${totalVisitors.toLocaleString("en-GB")}` : ""} visitors.</p>
    </div>
  );
}
