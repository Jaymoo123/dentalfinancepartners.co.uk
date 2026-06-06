/**
 * Trends sub-page — the transactional view of the site over time at multiple
 * granularities. Secret-gated (?k=), service-role, never indexed.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import { getTimeseries } from "@/lib/analytics/server/adminData";
import { TimeSeriesChart } from "@/components/admin/TimeSeriesChart";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const isoOf = (d: Date) => d.toISOString();
const hhmm = (s: string) => new Date(s).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
const hourLabel = (s: string) => new Date(s).toLocaleString("en-GB", { weekday: "short", hour: "2-digit" });
const dayLabel = (s: string) => new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

export default async function TrendsPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || k !== expected) notFound();

  const siteKey = niche.content_strategy.source_identifier;
  const now = new Date();
  const h24 = new Date(now.getTime() - 24 * 3600_000);
  const d7 = new Date(now.getTime() - 7 * 86400_000);
  const d30 = new Date(now.getTime() - 30 * 86400_000);

  const [q15, h24hourly, w7hourly, w7daily, m30daily] = await Promise.all([
    getTimeseries(siteKey, "15 minutes", isoOf(h24), isoOf(now)),
    getTimeseries(siteKey, "1 hour", isoOf(h24), isoOf(now)),
    getTimeseries(siteKey, "1 hour", isoOf(d7), isoOf(now)),
    getTimeseries(siteKey, "1 day", isoOf(d7), isoOf(now)),
    getTimeseries(siteKey, "1 day", isoOf(d30), isoOf(now)),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Trends — {siteKey}</h1>
        <Link href={`/admin/analytics?k=${expected}`} className="text-sm text-emerald-700 underline">
          ← Overview
        </Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">Human-only (bots excluded), UTC buckets.</p>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 24 hours</h2>
      <div className="mt-3 space-y-3">
        <TimeSeriesChart data={q15} metric="sessions" label="Sessions · 15-minute" format={hhmm} />
        <TimeSeriesChart data={h24hourly} metric="sessions" label="Sessions · hourly" format={hhmm} />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 7 days</h2>
      <div className="mt-3 space-y-3">
        <TimeSeriesChart data={w7hourly} metric="sessions" label="Sessions · hourly" format={hourLabel} />
        <TimeSeriesChart data={w7daily} metric="sessions" label="Sessions · daily" format={dayLabel} />
        <TimeSeriesChart data={w7daily} metric="leads" label="Leads · daily" format={dayLabel} />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 30 days</h2>
      <div className="mt-3 space-y-3">
        <TimeSeriesChart data={m30daily} metric="sessions" label="Sessions · daily" format={dayLabel} />
        <TimeSeriesChart data={m30daily} metric="leads" label="Leads · daily" format={dayLabel} />
      </div>
    </div>
  );
}
