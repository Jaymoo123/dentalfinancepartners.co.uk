/**
 * Per-visitor timeline page for the estate console.
 * Cookie-gated, never indexed.
 */
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import {
  getVisitorJourney,
  getVisitorEvents,
  getLeadForVisitor,
  type VisitorEvent,
} from "@accounting-network/web-shared/console/adminData";
import {
  buildStory,
  buildActivityRows,
  summariseVitals,
} from "@accounting-network/web-shared/console/journey";
import { getSitesRegistry } from "@accounting-network/web-shared/console/estateData";
import { checkAuth } from "@/lib/checkAuth";
import VisitorTabs from "./VisitorTabs";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

const GROUPS: Array<{ title: string; events: Array<[string, string]> }> = [
  { title: "Engagement", events: [
    ["page_view", "Page views"], ["scroll_depth", "Scroll milestones"], ["engagement_time", "Engagement pings"],
    ["element_click", "Element clicks"], ["outbound_click", "Outbound clicks"], ["contact_click", "Contact clicks"],
  ]},
  { title: "Calculators", events: [
    ["calc_view", "Opens"], ["calc_computed", "Computes"], ["calc_result_viewed", "Results viewed"], ["embed_cta_click", "Embed CTA clicks"],
  ]},
  { title: "Forms", events: [
    ["form_start", "Started"], ["form_field_focus", "Field focuses"], ["form_submit", "Submits"],
  ]},
  { title: "Conversion", events: [
    ["cta_click", "CTA clicks"], ["lead_submitted", "Leads"],
  ]},
  { title: "Issues", events: [["rage_click", "Rage clicks"], ["dead_click", "Dead clicks"], ["client_error", "JS errors"]] },
];

const RATING_STYLE: Record<string, string> = {
  good: "bg-emerald-100 text-emerald-800",
  "needs-improvement": "bg-amber-100 text-amber-800",
  poor: "bg-rose-100 text-rose-800",
};
const VERDICT_STYLE: Record<string, string> = {
  Fast: "bg-emerald-600 text-white",
  OK: "bg-amber-500 text-white",
  Slow: "bg-rose-600 text-white",
};

function secs(ms: number): string {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

export default async function VisitorPage({
  params,
}: {
  params: Promise<{ siteKey: string; visitorId: string }>;
}) {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const { siteKey, visitorId } = await params;

  const sites = await getSitesRegistry();
  const site = sites.find((s) => s.site_key === siteKey);
  if (!site) notFound();

  const [journey, events, lead] = await Promise.all([
    getVisitorJourney(siteKey, visitorId),
    getVisitorEvents(siteKey, visitorId),
    getLeadForVisitor(siteKey, visitorId),
  ]);

  if (!journey && events.length === 0) notFound();

  const counts = new Map<string, number>();
  for (const e of events) counts.set(e.event_name, (counts.get(e.event_name) || 0) + 1);

  const pages = new Map<string, number>();
  const calcs = new Map<string, Set<string>>();
  const ctas = new Map<string, number>();
  for (const e of events) {
    if (e.event_name === "page_view" && e.page_path)
      pages.set(e.page_path, (pages.get(e.page_path) || 0) + 1);
    const slug = (e.props?.calculator_slug as string) || "";
    if (slug) {
      if (!calcs.has(slug)) calcs.set(slug, new Set());
      calcs.get(slug)!.add(e.event_name.replace("calc_", "").replace("embed_cta_click", "embed-cta"));
    }
    if (e.event_name === "cta_click") {
      const id = (e.props?.cta_id as string) || "?";
      ctas.set(id, (ctas.get(id) || 0) + 1);
    }
  }

  const bySession = new Map<string, VisitorEvent[]>();
  for (const e of events) {
    const g = bySession.get(e.session_id);
    if (g) g.push(e); else bySession.set(e.session_id, [e]);
  }

  const storySessions = buildStory(events);
  const activityRows = buildActivityRows(events);
  const vitals = summariseVitals(events);

  const visits = journey?.total_sessions ?? bySession.size;
  const visitClass = visits > 1 ? "Returning" : "New";
  const isConverted = !!lead || !!journey?.converted;

  const sessionEngagement = Array.from(bySession.values()).map((evts) => {
    let ms = 0;
    for (const e of evts) {
      if (e.event_name === "engagement_time") {
        const c = Number(e.props?.cumulative_ms || 0);
        if (c > ms) ms = c;
      }
    }
    return ms;
  });
  const maxEng = Math.max(1, ...sessionEngagement);

  const miniFunnel: Array<{ label: string; reached: boolean; branch?: boolean }> = [
    { label: "Visited", reached: true },
    { label: "Engaged", reached: (journey?.total_engaged_ms ?? 0) >= 10000 },
    { label: "Used calc", reached: (counts.get("calc_computed") || 0) > 0, branch: true },
    { label: "Form CTA", reached: events.some((e) => e.event_name === "cta_click" && e.props?.goal === "form") },
    { label: "Form start", reached: (counts.get("form_start") || 0) > 0 || isConverted },
    { label: "Submitted", reached: isConverted },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={`/site/${siteKey}`} className="text-sm text-emerald-700 underline">
        {site.display_name} visitors
      </Link>

      <div className={`mt-3 rounded-xl border p-5 ${isConverted ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            {lead ? (
              <>
                <h1 className="truncate text-base font-bold text-slate-900">{lead.full_name || lead.email || "Lead"}</h1>
                <div className="mt-0.5 break-all text-xs text-slate-600">
                  {[lead.email, lead.phone, lead.role].filter(Boolean).join(" · ") || "-"}
                </div>
                <div className="mt-0.5 break-all font-mono text-[11px] text-slate-400">{visitorId}</div>
              </>
            ) : (
              <h1 className="break-all font-mono text-sm font-bold text-slate-900">{visitorId}</h1>
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${visitClass === "Returning" ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700"}`}>
              {visitClass.toUpperCase()}
            </span>
            {isConverted ? (
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">CONVERTED</span>
            ) : (
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">Not converted</span>
            )}
            {vitals.verdict && (
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${VERDICT_STYLE[vitals.verdict]}`}>
                {vitals.verdict === "Fast" ? "Site felt fast" : vitals.verdict === "OK" ? "Site felt OK" : "Site felt slow"}
              </span>
            )}
          </div>
        </div>
        {journey && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Visits" value={String(journey.total_sessions)} />
            <Stat label="Events" value={String(journey.total_events)} />
            <Stat label="Engaged" value={secs(journey.total_engaged_ms || 0)} />
            <Stat label="Max scroll" value={`${journey.max_scroll_pct || 0}%`} />
            <Stat label="Device" value={`${journey.device_type || "-"} / ${journey.os_family || "-"}`} />
            <Stat label="Country" value={journey.country || "-"} />
            <Stat label="Source" value={journey.referrer_host || journey.utm_source || "direct"} />
            <Stat label="Entry" value={journey.entry_paths?.[0] || "-"} />
          </div>
        )}
      </div>

      {sessionEngagement.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-700">
            {visitClass} visitor · {visits} visit{visits !== 1 ? "s" : ""} · {pages.size} page{pages.size !== 1 ? "s" : ""}
            {isConverted ? " · converted" : ""}
          </p>
          <div className="flex items-end gap-1" title="Engaged time per session">
            {sessionEngagement.map((ms, i) => (
              <div key={i} className="w-2 rounded-t bg-emerald-500" style={{ height: `${Math.max(3, (ms / maxEng) * 32)}px` }} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">This visitor&apos;s funnel</h3>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          {miniFunnel.map((s, i) => (
            <span key={s.label} className="flex items-center gap-1.5">
              {i > 0 && !s.branch && <span className="text-slate-300">&rarr;</span>}
              <span className={`rounded-full px-2.5 py-1 font-semibold ${s.reached ? s.branch ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-400"}`}>
                {s.branch ? "↳ " : ""}{s.label}{s.reached ? " ✓" : ""}
              </span>
            </span>
          ))}
        </div>
      </div>

      {vitals.verdict && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Performance they experienced</h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${VERDICT_STYLE[vitals.verdict]}`}>{vitals.verdict}</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {vitals.rows.map((v) => (
              <div key={v.metric} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-sm text-slate-700">{v.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${RATING_STYLE[v.rating] || "bg-slate-100 text-slate-600"}`}>{v.display}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="mt-8 text-lg font-bold text-slate-900">Every measure</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.title} className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{g.title}</h3>
            <div className="mt-2 space-y-1.5">
              {g.events.map(([ev, label]) => {
                const c = counts.get(ev) || 0;
                return (
                  <div key={ev} className={`flex justify-between text-sm ${c > 0 ? "text-slate-800" : "text-slate-300"}`}>
                    <span>{label}</span>
                    <span className="font-mono font-semibold">{c}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Pages viewed</h3>
          <div className="mt-2 space-y-1 text-sm">
            {pages.size === 0 ? (
              <p className="text-xs text-slate-300">none</p>
            ) : (
              Array.from(pages.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([p, c]) => (
                  <div key={p} className="flex justify-between gap-2">
                    <span className="break-all text-slate-700">{p}</span>
                    <span className="font-mono text-slate-400">{c}</span>
                  </div>
                ))
            )}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Calculators used</h3>
          <div className="mt-2 space-y-1 text-sm">
            {calcs.size === 0 ? (
              <p className="text-xs text-slate-300">none</p>
            ) : (
              Array.from(calcs.entries()).map(([slug, steps]) => (
                <div key={slug} className="text-slate-700">
                  <span className="font-medium">{slug}</span>{" "}
                  <span className="text-xs text-slate-400">({Array.from(steps).join(", ")})</span>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">CTAs clicked</h3>
          <div className="mt-2 space-y-1 text-sm">
            {ctas.size === 0 ? (
              <p className="text-xs text-slate-300">none</p>
            ) : (
              Array.from(ctas.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([id, c]) => (
                  <div key={id} className="flex justify-between gap-2">
                    <span className="break-all text-slate-700">{id.replace(/[_-]+/g, " ")}</span>
                    <span className="font-mono text-slate-400">{c}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      <VisitorTabs story={storySessions} activity={activityRows} />
    </div>
  );
}
