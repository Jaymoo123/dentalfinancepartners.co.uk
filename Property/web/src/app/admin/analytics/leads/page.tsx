/**
 * Leads sub-page — every lead, paginated, enriched with each lead's journey
 * (intent, device, country, source, engagement). Secret-gated (?k=), service-
 * role, never indexed. PII is read straight from the leads table; never a view.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import { getLeadsPage, getTopVisitors } from "@/lib/analytics/server/adminData";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { getTopic } from "@/lib/intent/taxonomy";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const PAGE = 100;
const secs = (ms: number) => {
  const s = Math.round((ms || 0) / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m`;
};
const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string; page?: string; country?: string }>;
}) {
  const { k, page, country: countryParam } = await searchParams;
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || k !== expected) notFound();

  const siteKey = niche.content_strategy.source_identifier;
  const country = countryParam || "GB";
  const countryFilter = country === "ALL" ? undefined : country;
  const qsBase = `k=${expected}&country=${country}`;
  const pageNum = Math.max(0, parseInt(page || "0", 10) || 0);
  // Fetch visitors across ALL countries so we can read each lead's geo; leads
  // carry no country of their own (the leads table has no geo column).
  const [allLeads, visitors] = await Promise.all([
    getLeadsPage(siteKey, pageNum * PAGE, PAGE),
    getTopVisitors(siteKey, 1000),
  ]);
  const jByVisitor = new Map(visitors.map((v) => [v.visitor_id, v] as const));
  // Conservative geo filter: hide a lead only when its visitor is positively
  // known to be from another country. Leads with unknown geo are always shown,
  // so a real lead is never hidden just because we can't locate it.
  const leads = countryFilter
    ? allLeads.filter((l) => {
        const j = l.visitor_id ? jByVisitor.get(l.visitor_id) : undefined;
        return !j?.country || j.country === countryFilter;
      })
    : allLeads;
  const hasNext = allLeads.length === PAGE;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Leads — {siteKey}</h1>
        <Link href={`/admin/analytics?${qsBase}`} className="text-sm text-emerald-700 underline">
          ← Overview
        </Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Newest first, {PAGE} per page, enriched with each lead&apos;s journey.
        {countryFilter
          ? ` Showing ${countryFilter} + unlocated leads (leads positively from other countries are hidden).`
          : " Showing all countries."}
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Intent</th>
              <th className="px-3 py-2">When</th>
              <th className="px-3 py-2">Device</th>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2 text-right">Visits</th>
              <th className="px-3 py-2 text-right">Pages</th>
              <th className="px-3 py-2 text-right">Engaged</th>
              <th className="px-3 py-2">Journey</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={13} className="px-3 py-6 text-center text-slate-400">No leads on this page.</td>
              </tr>
            ) : (
              leads.map((l) => {
                const j = l.visitor_id ? jByVisitor.get(l.visitor_id) : undefined;
                const entry = j?.entry_paths?.[0] || "";
                const topic = entry ? getTopic(deriveTopic(entry)) : null;
                return (
                  <tr key={l.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-800">{l.full_name || "—"}</td>
                    <td className="px-3 py-2 break-all text-slate-700">{l.email || "—"}</td>
                    <td className="px-3 py-2 text-slate-600">{l.phone || "—"}</td>
                    <td className="px-3 py-2 text-slate-600">{l.role || "—"}</td>
                    <td className="px-3 py-2 text-slate-600">{topic ? topic.label : "—"}</td>
                    <td className="px-3 py-2 text-slate-500">{when(l.created_at)}</td>
                    <td className="px-3 py-2 text-slate-600">{j?.device_type || "—"}</td>
                    <td className="px-3 py-2 text-slate-600">{j?.country || "—"}</td>
                    <td className="px-3 py-2 text-slate-600">{j?.referrer_host || j?.utm_source || "direct"}</td>
                    <td className="px-3 py-2 text-right font-mono">{j?.total_sessions ?? "—"}</td>
                    <td className="px-3 py-2 text-right font-mono">{j?.page_views ?? "—"}</td>
                    <td className="px-3 py-2 text-right font-mono">{j ? secs(j.total_engaged_ms) : "—"}</td>
                    <td className="px-3 py-2">
                      {l.visitor_id ? (
                        <Link
                          href={`/admin/analytics/visitor/${l.visitor_id}?k=${expected}`}
                          className="text-emerald-700 underline"
                        >
                          view
                        </Link>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        {pageNum > 0 ? (
          <Link href={`/admin/analytics/leads?${qsBase}&page=${pageNum - 1}`} className="text-emerald-700 underline">
            ← Newer
          </Link>
        ) : (
          <span />
        )}
        <span className="text-xs text-slate-500">Page {pageNum + 1}</span>
        {hasNext ? (
          <Link href={`/admin/analytics/leads?${qsBase}&page=${pageNum + 1}`} className="text-emerald-700 underline">
            Older →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
