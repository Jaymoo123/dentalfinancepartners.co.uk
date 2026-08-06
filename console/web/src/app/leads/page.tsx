/**
 * Estate leads: one consolidated page for all sites, with per-site breakdown
 * on the same page. Flow-focused (frequencies, consistency, size mix,
 * trailing-mean forecast) — no £ estimates; lead value is the partner's call.
 * Cookie-gated, never indexed.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import {
  getAllLeads,
  getLeadValueScores,
  type LeadValueScore,
} from "@accounting-network/web-shared/console/adminData";
import { getSitesRegistry } from "@accounting-network/web-shared/console/estateData";
import LeadsExplorer, { type ExplorerLead } from "@/components/LeadsExplorer";
import { checkAuth } from "@/lib/checkAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

export default async function EstateLeadsPage() {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const [sites, leads] = await Promise.all([getSitesRegistry(), getAllLeads()]);
  const scores: LeadValueScore[] = leads.length
    ? await getLeadValueScores(leads.map((l) => l.id))
    : [];
  const scoreByLead = new Map(scores.map((s) => [s.lead_id, s]));
  const nameBySite = new Map(sites.map((s) => [s.site_key, s.display_name]));

  const rows: ExplorerLead[] = leads.map((l) => {
    const s = scoreByLead.get(l.id);
    return {
      id: l.id,
      name: l.full_name || "(anonymous)",
      date: l.created_at,
      siteKey: l.source ?? "unknown",
      site: nameBySite.get(l.source ?? "") ?? l.source ?? "unknown",
      role: l.role || "",
      tier: s?.tier ?? null,
      intent: s?.intent ?? null,
      channel: s?.channel ?? null,
      confidence: s?.confidence ?? null,
      rationale: s?.rationale ?? null,
      snippet: (l.message || "").replace(/\s+/g, " ").slice(0, 80),
    };
  });

  const siteTabs = sites
    .filter((s) => s.active)
    .map((s) => ({ key: s.site_key, name: s.display_name }));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-600">Estate</Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-bold text-slate-900">Leads</span>
          </div>
          <span className="text-xs text-slate-400">All countries · UTC weeks</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <p className="mt-1 text-xs text-slate-500">
          What comes through the estate — how often, how consistently, and what it looks like.
          Size buckets come from lead scoring; the value a lead is worth is the partner&apos;s
          judgment, so no revenue figures here.
        </p>
        {rows.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            No leads yet.
          </div>
        ) : (
          <LeadsExplorer leads={rows} sites={siteTabs} nowIso={new Date().toISOString()} />
        )}
      </main>
    </div>
  );
}
