/**
 * Per-site leads page. Cookie-gated, never indexed.
 */
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import { getLeadsForSite } from "@accounting-network/web-shared/console/adminData";
import { getSitesRegistry } from "@accounting-network/web-shared/console/estateData";
import { checkAuth } from "@/lib/checkAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

function ago(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

export default async function SiteLeadsPage({
  params,
}: {
  params: Promise<{ siteKey: string }>;
}) {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const { siteKey } = await params;
  const sites = await getSitesRegistry();
  const site = sites.find((s) => s.site_key === siteKey);
  if (!site) notFound();

  const leads = await getLeadsForSite(siteKey, 200);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="mt-0.5 text-xs text-slate-400">{site.display_name}</p>
        </div>
        <Link href={`/site/${siteKey}`} className="text-sm text-emerald-700 underline">
          Overview
        </Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">Most recent 200 leads for this site.</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="hidden px-3 py-2 sm:table-cell">Role</th>
              <th className="hidden px-3 py-2 lg:table-cell">Message</th>
              <th className="px-3 py-2 text-right">When</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-slate-400">
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">
                    {l.full_name || "-"}
                  </td>
                  <td className="px-3 py-2 text-slate-600">{l.email || "-"}</td>
                  <td className="hidden px-3 py-2 text-slate-500 sm:table-cell">
                    {l.role || "-"}
                  </td>
                  <td className="hidden max-w-xs truncate px-3 py-2 text-slate-400 lg:table-cell">
                    {l.message?.slice(0, 80) || "-"}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-slate-400">
                    {ago(l.created_at)}
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
