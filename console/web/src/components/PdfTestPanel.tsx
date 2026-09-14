/**
 * Paid-PDF concierge test panel (plan section 4.10). Server component, read-only.
 * Replaces the old "Sites (last 7 days)" strip in the same position and style.
 */
import { Sparkline } from "@accounting-network/web-shared/console/components/Sparkline";
import type { KillState, PdfTestModel, PdfWindow } from "@/lib/pdfTestData";
import { EXPOSURE_BAR } from "@/lib/pdfTestData";

const HEADING = "mt-10 text-lg font-bold text-slate-900";
const CARD = "mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white";
const NUM = "px-2 py-3 text-right font-mono text-slate-700 sm:px-4";
const TH = "bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500";

const KILL_CLASS: Record<KillState, string> = {
  build: "text-emerald-700",
  extend: "text-emerald-700",
  kill: "text-amber-700",
  waiting: "text-slate-500",
};

function n(v: number | null | undefined): string {
  return v == null ? "-" : v.toLocaleString("en-GB");
}
function pct(v: number | null): string {
  return v == null ? "-" : `${(v * 100).toFixed(2)}%`;
}
function day(iso: string): string {
  return iso.slice(0, 10);
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className={HEADING}>Paid PDF test</h2>
      {children}
    </>
  );
}

function WindowCard({ w }: { w: PdfWindow }) {
  const zero = w.exposures === 0;
  const rows: [string, string][] = [
    ["Exposures", zero ? "-" : n(w.exposures)],
    ["Clicks", zero ? "-" : n(w.clicks)],
    ["Click rate", pct(w.click_rate)],
    ["Checkouts opened", zero && w.checkouts === 0 ? "-" : n(w.checkouts)],
    ["Paid", zero && w.paid === 0 ? "-" : n(w.paid)],
    ["Paid rate", pct(w.paid_rate)],
    ["Revenue", w.paid === 0 ? "-" : `£${n(w.revenue)}`],
    ["Fulfilled", w.paid === 0 ? "-" : n(w.fulfilled)],
    ["Awaiting fulfilment", w.paid === 0 ? "-" : n(w.awaiting)],
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{w.label}</div>
      <dl className="mt-2 space-y-1 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3">
            <dt className="text-slate-500">{label}</dt>
            <dd
              className={`font-mono ${
                label === "Awaiting fulfilment" && w.awaiting > 0
                  ? "font-semibold text-amber-700"
                  : label === "Paid" || label === "Revenue"
                    ? "text-emerald-700"
                    : "text-slate-700"
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BreakdownTable({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; exposures: number; clicks: number; checkouts: number; paid: number }[];
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</div>
      <div className={CARD}>
        <table className="w-full text-sm">
          <thead className={TH}>
            <tr>
              <th className="px-2 py-2.5 sm:px-4">{title}</th>
              <th className="px-2 py-2.5 text-right sm:px-4">Exposures</th>
              <th className="px-2 py-2.5 text-right sm:px-4">Clicks</th>
              <th className="px-2 py-2.5 text-right sm:px-4">Checkouts</th>
              <th className="px-2 py-2.5 text-right sm:px-4">Paid</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Nothing yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.key} className="border-t border-slate-100">
                  <td className="px-2 py-3 font-medium text-slate-800 sm:px-4">{r.key}</td>
                  <td className={NUM}>{r.exposures || "-"}</td>
                  <td className={NUM}>{r.clicks || "-"}</td>
                  <td className={NUM}>{r.checkouts || "-"}</td>
                  <td className="px-2 py-3 text-right font-mono text-emerald-700 sm:px-4">
                    {r.paid || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PdfTestPanel({ model }: { model: PdfTestModel }) {
  if (model.state === "not_set_up") {
    return (
      <Shell>
        <div className={CARD}>
          <p className="px-4 py-6 text-center text-slate-400">Not set up</p>
        </div>
      </Shell>
    );
  }

  if (model.state === "off_never_started") {
    return (
      <Shell>
        <div className={CARD}>
          <p className="px-4 py-6 text-center text-slate-400">Switched off, never started</p>
        </div>
      </Shell>
    );
  }

  const { flag, windows } = model;
  const since = model.windows.find((w) => w.key === "all")!;
  const daysRunning = flag.started_at
    ? Math.max(0, Math.floor((Date.now() - Date.parse(flag.started_at)) / 86400_000))
    : 0;

  return (
    <Shell>
      <p className="mt-1 text-xs text-slate-500">
        £29 workings PDF on the three Property premium calculators. Read-only; the switch lives in
        the site_flags row.
      </p>

      {/* 1. Status */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <span className={flag.enabled ? "font-semibold text-emerald-700" : "font-semibold text-slate-500"}>
          {flag.enabled ? "ON" : "OFF"}
        </span>
        <span className="text-slate-500">
          Started {day(flag.started_at!)} · day {daysRunning}
        </span>
        <span className={flag.link ? "text-slate-500" : "text-amber-700"}>
          {flag.link ? "Stripe link set" : "Stripe link missing"}
        </span>
      </div>

      {/* 2. Windows */}
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {windows.map((w) => (
          <WindowCard key={w.key} w={w} />
        ))}
      </div>

      {/* 3. Kill lines, read against the since-start window */}
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
        <span className={KILL_CLASS[since.kill.exposures]}>
          Exposures {n(since.exposures)} of {EXPOSURE_BAR}
        </span>
        <span className={KILL_CLASS[since.kill.clicks]}>
          Click rate {pct(since.click_rate)} vs 2%
        </span>
        <span className={KILL_CLASS[since.kill.paid]}>
          Paid rate {pct(since.paid_rate)} vs 1% kill, 2% build
        </span>
      </div>

      {/* 4. Breakdowns */}
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <BreakdownTable title="Tool" rows={model.byTool} />
        <BreakdownTable title="Placement" rows={model.byPlacement} />
      </div>

      {/* 5. Daily clicks */}
      <div className="mt-3 max-w-md rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Clicks per day
        </div>
        <div className="mt-2 text-sky-500">
          <Sparkline values={model.dailyClicks.map((d) => d.clicks)} height={32} />
        </div>
      </div>

      {/* 6. Last 20 checkouts */}
      <div className={CARD}>
        <table className="w-full text-sm">
          <thead className={TH}>
            <tr>
              <th className="px-2 py-2.5 sm:px-4">When</th>
              <th className="px-2 py-2.5 sm:px-4">Tool</th>
              <th className="px-2 py-2.5 sm:px-4">Placement</th>
              <th className="px-2 py-2.5 text-right sm:px-4">Paid</th>
              <th className="px-2 py-2.5 text-right sm:px-4">Fulfilled</th>
            </tr>
          </thead>
          <tbody>
            {model.recent.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  No checkouts yet.
                </td>
              </tr>
            ) : (
              model.recent.map((r) => (
                <tr key={`${r.created_at}-${r.tool_id}`} className="border-t border-slate-100">
                  <td className="px-2 py-3 font-mono text-xs text-slate-500 sm:px-4">
                    {r.created_at.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="px-2 py-3 text-slate-700 sm:px-4">{r.tool_id ?? "-"}</td>
                  <td className="px-2 py-3 text-slate-500 sm:px-4">{r.placement ?? "-"}</td>
                  <td
                    className={`px-2 py-3 text-right sm:px-4 ${
                      r.stripe_session_id ? "font-semibold text-emerald-700" : "text-slate-400"
                    }`}
                  >
                    {r.stripe_session_id ? "yes" : "-"}
                  </td>
                  <td
                    className={`px-2 py-3 text-right sm:px-4 ${
                      r.fulfilled_at ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {r.fulfilled_at ? "yes" : r.stripe_session_id ? "awaiting" : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
