"use client";

/**
 * Charts for the per-site lead-analytics page. Self-contained recharts in the
 * console's slate Tailwind language; all props are serialisable arrays.
 */
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
} from "recharts";

const gbp = (v: number) => `£${v.toLocaleString("en-GB")}`;

const TIER_COLOR: Record<string, string> = {
  very_high: "#b91c1c",
  high: "#ea580c",
  medium: "#0284c7",
  low: "#94a3b8",
};

function Card({ label, note, children }: { label: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900">{label}</h3>
      {note && <p className="mt-0.5 text-xs text-slate-400">{note}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BoxTooltip({ active, payload, lines }: {
  active?: boolean;
  payload?: Array<{ payload?: Record<string, unknown> }>;
  lines: (p: Record<string, unknown>) => string[];
}) {
  const p = payload?.[0]?.payload;
  if (!active || !p) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      {lines(p).map((l, i) => (
        <div key={i} className={i === 0 ? "font-medium text-slate-900" : "text-slate-500"}>{l}</div>
      ))}
    </div>
  );
}

/** Histogram of estimated lead value (pre-bucketed server-side). */
export function ValueHistogram({ data }: { data: { bucket: string; count: number }[] }) {
  return (
    <Card label="Distribution of est. lead value" note="est. first-year fee if won">
      <ResponsiveContainer width="100%" height={220} initialDimension={{ width: 320, height: 220 }}>
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="bucket" fontSize={10} tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} interval={0} angle={-30} textAnchor="end" height={44} />
          <YAxis allowDecimals={false} fontSize={11} tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} width={28} />
          <Tooltip
            cursor={{ fill: "#0284c7", fillOpacity: 0.06 }}
            content={<BoxTooltip lines={(p) => [String(p.bucket), `${p.count} lead${p.count === 1 ? "" : "s"}`]} />}
          />
          <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

/** One point per scored lead, grouped by self-selected role, log-ish value axis. */
export function RoleStripChart({ data, roles }: {
  data: { roleIdx: number; jitter: number; value: number; plotValue: number; tier: string; name: string }[];
  roles: string[];
}) {
  return (
    <Card label="Est. value by self-selected role" note="one point per scored lead · log scale">
      <ResponsiveContainer width="100%" height={260} initialDimension={{ width: 320, height: 260 }}>
        <ScatterChart margin={{ left: 0, right: 16, top: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="jitter"
            domain={[-0.5, roles.length - 0.5]}
            ticks={roles.map((_, i) => i)}
            tickFormatter={(v) => roles[Math.round(Number(v))] ?? ""}
            fontSize={10}
            tick={{ fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            type="number"
            dataKey="plotValue"
            scale="log"
            domain={[40, 12000]}
            ticks={[100, 500, 1000, 2500, 5000, 10000]}
            tickFormatter={(v) => gbp(Number(v))}
            fontSize={10}
            tick={{ fill: "#64748b" }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <ZAxis range={[50, 51]} />
          <Tooltip
            cursor={false}
            content={<BoxTooltip lines={(p) => [String(p.name), `${gbp(Number(p.value))} · ${String(p.tier).replace("_", " ")}`]} />}
          />
          <Scatter data={data}>
            {data.map((d, i) => (
              <Cell key={i} fill={TIER_COLOR[d.tier] ?? "#94a3b8"} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        {Object.entries(TIER_COLOR).map(([t, c]) => (
          <span key={t} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
            {t.replace("_", " ")}
          </span>
        ))}
      </div>
    </Card>
  );
}

/** Bars = lead count per month, line = est. pipeline value per month. */
export function MonthlyTrendChart({ data }: { data: { month: string; count: number; value: number }[] }) {
  return (
    <Card label="Monthly volume and value" note="bars = leads · line = est. pipeline £">
      <ResponsiveContainer width="100%" height={220} initialDimension={{ width: 320, height: 220 }}>
        <ComposedChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" fontSize={11} tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} />
          <YAxis yAxisId="n" allowDecimals={false} fontSize={11} tick={{ fill: "#64748b" }} tickLine={false} axisLine={false} width={28} />
          <YAxis yAxisId="v" orientation="right" fontSize={10} tick={{ fill: "#b91c1c" }} tickFormatter={(v) => `£${Math.round(Number(v) / 1000)}k`} tickLine={false} axisLine={false} width={40} />
          <Tooltip
            cursor={{ fill: "#0284c7", fillOpacity: 0.06 }}
            content={<BoxTooltip lines={(p) => [String(p.month), `${p.count} leads`, `${gbp(Number(p.value))} est. value`]} />}
          />
          <Bar yAxisId="n" dataKey="count" fill="#93c5fd" radius={[4, 4, 0, 0]} />
          <Line yAxisId="v" dataKey="value" stroke="#b91c1c" strokeWidth={2} dot={{ r: 3 }} type="monotone" />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}
