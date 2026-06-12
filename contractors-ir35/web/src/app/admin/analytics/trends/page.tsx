/**
 * Trends sub-page: time-series charts at multiple granularities.
 * Cookie-gated, service-role, never indexed.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import { getTimeseries } from "@accounting-network/web-shared/console/adminData";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import { checkAuth } from "../checkAuth";
import { Sparkline } from "@accounting-network/web-shared/console/components/Sparkline";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

const isoOf = (d: Date) => d.toISOString();

function TrendSection({
  title,
  data,
  metric,
  label,
}: {
  title: string;
  data: Array<{ bucket: string; sessions: number; events: number; leads: number }>;
  metric: "sessions" | "leads";
  label: string;
}) {
  const values = data.map((d) => d[metric]);
  const total = values.reduce((a, b) => a + b, 0);
  const peak = Math.max(0, ...values);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <span className="text-xs text-slate-500">{total.toLocaleString("en-GB")} total &middot; peak {peak.toLocaleString("en-GB")}</span>
      </div>
      {values.length === 0 ? (
        <div className="mt-3 flex h-16 items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">No data in this window</div>
      ) : (
        <div className="mt-3 text-teal-600">
          <Sparkline values={values} height={60} />
        </div>
      )}
      <p className="mt-1 text-[11px] text-slate-400">{title}</p>
    </div>
  );
}

export default async function TrendsPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const authed = await checkAuth();
  if (!authed) redirect("/admin/analytics/login");

  const { country: countryParam } = await searchParams;
  const siteKey = niche.content_strategy.site_key;
  const country = countryParam || "GB";
  const countryFilter = country === "ALL" ? undefined : country;

  const now = new Date();
  const h24 = new Date(now.getTime() - 24 * 3600_000);
  const d7 = new Date(now.getTime() - 7 * 86400_000);
  const d30 = new Date(now.getTime() - 30 * 86400_000);

  const [q15, h24hourly, w7daily, m30daily] = await Promise.all([
    getTimeseries(siteKey, "15 minutes", isoOf(h24), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 hour", isoOf(h24), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 day", isoOf(d7), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 day", isoOf(d30), isoOf(now), countryFilter),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Trends</h1>
        <Link href="/admin/analytics" className="text-sm text-teal-700 underline">Overview</Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">Human-only (bots excluded), UTC buckets. Country: {countryFilter ?? "all"}.</p>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 24 hours</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <TrendSection title="15-minute buckets" data={q15} metric="sessions" label="Sessions (15 min)" />
        <TrendSection title="Hourly buckets" data={h24hourly} metric="sessions" label="Sessions (hourly)" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 7 days</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <TrendSection title="Daily" data={w7daily} metric="sessions" label="Sessions (daily)" />
        <TrendSection title="Daily" data={w7daily} metric="leads" label="Leads (daily)" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 30 days</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <TrendSection title="Daily" data={m30daily} metric="sessions" label="Sessions (daily)" />
        <TrendSection title="Daily" data={m30daily} metric="leads" label="Leads (daily)" />
      </div>
    </div>
  );
}
