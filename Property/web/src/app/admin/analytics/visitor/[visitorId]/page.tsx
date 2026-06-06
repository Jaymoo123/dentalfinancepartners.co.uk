/**
 * Per-visitor console — the "entire story per person".
 *
 * Header + every tracked measure counted for this visitor + pages/calculators/
 * CTAs + the full chronological timeline. Secret-gated (?k=), service-role,
 * never indexed.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import {
  getVisitorJourney,
  getVisitorEvents,
  type VisitorEvent,
} from "@/lib/analytics/server/adminData";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const GROUPS: Array<{ title: string; events: Array<[string, string]> }> = [
  { title: "Engagement", events: [
    ["page_view", "Page views"], ["scroll_depth", "Scroll milestones"], ["engagement_time", "Engagement pings"],
    ["element_click", "Element clicks"], ["outbound_click", "Outbound clicks"], ["contact_click", "Contact clicks"],
    ["custom_interaction", "Custom interactions"],
  ]},
  { title: "Calculators", events: [
    ["calc_view", "Opens"], ["calc_input_change", "Input edits"], ["calc_computed", "Computes"],
    ["calc_result_viewed", "Results viewed"], ["calc_copy", "Copies"], ["calc_share", "Shares"], ["embed_cta_click", "Embed CTA clicks"],
  ]},
  { title: "Forms", events: [
    ["form_start", "Started"], ["form_field_focus", "Field focuses"], ["form_field_abandon", "Field abandons"],
    ["form_submit", "Submits"], ["form_error", "Errors"],
  ]},
  { title: "Conversion", events: [
    ["cta_click", "CTA clicks"], ["exit_intent_shown", "Exit-intent shown"], ["lead_submitted", "Leads"],
  ]},
  { title: "Issues", events: [["rage_click", "Rage clicks"], ["dead_click", "Dead clicks"], ["client_error", "JS errors"]] },
];

function secs(ms: number): string {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function summarise(e: VisitorEvent): string {
  const p = e.props || {};
  switch (e.event_name) {
    case "page_view": return `Viewed ${e.page_path}`;
    case "scroll_depth": return `Scrolled ${p.pct}%`;
    case "cta_click": return `Clicked CTA "${p.cta_id}"${p.placement ? ` (${p.placement})` : ""}`;
    case "element_click": return `Clicked ${p.nearest_text || p.selector}`;
    case "custom_interaction": return `Interacted "${p.track_id}"`;
    case "outbound_click": return `Left to ${p.target_host}`;
    case "contact_click": return `Clicked ${p.kind} link`;
    case "calc_view": return `Opened calculator ${p.calculator_slug}`;
    case "calc_input_change": return `Edited ${p.calculator_slug} (${p.field_id})`;
    case "calc_computed": return `Computed ${p.calculator_slug}`;
    case "calc_result_viewed": return `Saw result for ${p.calculator_slug}`;
    case "form_start": return `Started form "${p.form_id}"`;
    case "form_field_focus": return `Focused ${p.form_id}.${p.field}`;
    case "form_field_abandon": return `Abandoned ${p.form_id}.${p.field}`;
    case "form_error": return `Form error (${p.field}: ${p.error_kind})`;
    case "lead_submitted": return `✅ Converted — submitted ${p.form_id}`;
    case "rage_click": return `😠 Rage-clicked ${p.selector}`;
    case "engagement_time": return `Engaged +${Math.round(Number(p.engaged_ms_delta || 0) / 1000)}s`;
    case "exit_intent_shown": return "Exit-intent shown";
    case "client_error": return `JS error: ${p.message}`;
    default: return e.event_name;
  }
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

export default async function VisitorTimelinePage({
  params,
  searchParams,
}: {
  params: Promise<{ visitorId: string }>;
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || k !== expected) notFound();

  const { visitorId } = await params;
  const siteKey = niche.content_strategy.source_identifier;
  const [journey, events] = await Promise.all([
    getVisitorJourney(siteKey, visitorId),
    getVisitorEvents(siteKey, visitorId),
  ]);

  // Counts per event type.
  const counts = new Map<string, number>();
  for (const e of events) counts.set(e.event_name, (counts.get(e.event_name) || 0) + 1);

  // Pages, calculators, CTAs.
  const pages = new Map<string, number>();
  const calcs = new Map<string, Set<string>>();
  const ctas = new Map<string, number>();
  for (const e of events) {
    if (e.event_name === "page_view" && e.page_path) pages.set(e.page_path, (pages.get(e.page_path) || 0) + 1);
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

  // Group events by session.
  const bySession = new Map<string, VisitorEvent[]>();
  for (const e of events) {
    const g = bySession.get(e.session_id);
    if (g) g.push(e); else bySession.set(e.session_id, [e]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={`/admin/analytics?k=${expected}`} className="text-sm text-emerald-700 underline">← All visitors</Link>

      {/* Header card */}
      <div className={`mt-3 rounded-xl border p-5 ${journey?.converted ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
        <div className="flex items-center justify-between">
          <h1 className="break-all font-mono text-sm font-bold text-slate-900">{visitorId}</h1>
          {journey?.converted ? (
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">CONVERTED</span>
          ) : (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">Not converted</span>
          )}
        </div>
        {journey && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Visits" value={String(journey.total_sessions)} />
            <Stat label="Events" value={String(journey.total_events)} />
            <Stat label="Engaged" value={secs(journey.total_engaged_ms || 0)} />
            <Stat label="Max scroll" value={`${journey.max_scroll_pct || 0}%`} />
            <Stat label="Device" value={`${journey.device_type || "—"} / ${journey.os_family || "—"}`} />
            <Stat label="Country" value={journey.country || "—"} />
            <Stat label="Source" value={journey.referrer_host || journey.utm_source || "direct"} />
            <Stat label="Entry" value={journey.entry_paths?.[0] || "—"} />
          </div>
        )}
      </div>

      {/* Every measure */}
      <h2 className="mt-8 text-lg font-bold text-slate-900">Every measure</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => {
          const present = g.events.filter(([ev]) => (counts.get(ev) || 0) > 0);
          return (
            <div key={g.title} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{g.title}</h3>
              <div className="mt-2 space-y-1.5">
                {g.events.map(([ev, label]) => {
                  const n = counts.get(ev) || 0;
                  return (
                    <div key={ev} className={`flex justify-between text-sm ${n > 0 ? "text-slate-800" : "text-slate-300"}`}>
                      <span>{label}</span>
                      <span className="font-mono font-semibold">{n}</span>
                    </div>
                  );
                })}
                {present.length === 0 && <p className="text-xs text-slate-300">none</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pages + Calculators + CTAs */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Pages viewed</h3>
          <div className="mt-2 space-y-1 text-sm">
            {pages.size === 0 ? <p className="text-xs text-slate-300">none</p> :
              Array.from(pages.entries()).sort((a, b) => b[1] - a[1]).map(([p, n]) => (
                <div key={p} className="flex justify-between gap-2"><span className="truncate text-slate-700">{p}</span><span className="font-mono text-slate-400">{n}</span></div>
              ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Calculators used</h3>
          <div className="mt-2 space-y-1 text-sm">
            {calcs.size === 0 ? <p className="text-xs text-slate-300">none</p> :
              Array.from(calcs.entries()).map(([slug, steps]) => (
                <div key={slug} className="text-slate-700"><span className="font-medium">{slug}</span> <span className="text-xs text-slate-400">({Array.from(steps).join(", ")})</span></div>
              ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">CTAs clicked</h3>
          <div className="mt-2 space-y-1 text-sm">
            {ctas.size === 0 ? <p className="text-xs text-slate-300">none</p> :
              Array.from(ctas.entries()).sort((a, b) => b[1] - a[1]).map(([id, n]) => (
                <div key={id} className="flex justify-between gap-2"><span className="truncate text-slate-700">{id}</span><span className="font-mono text-slate-400">{n}</span></div>
              ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <h2 className="mt-8 text-lg font-bold text-slate-900">Timeline</h2>
      {bySession.size === 0 ? (
        <p className="mt-3 text-slate-400">No events for this visitor.</p>
      ) : (
        Array.from(bySession.entries()).map(([sessionId, evts], si) => (
          <section key={sessionId} className="mt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Session {si + 1} · {new Date(evts[0].ts).toLocaleString("en-GB")}
            </h3>
            <ol className="mt-2 border-l-2 border-slate-200">
              {evts.map((e, i) => (
                <li key={i} className="relative pl-5 pb-2.5">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400">{new Date(e.ts).toLocaleTimeString("en-GB")}</span>
                  <span className="ml-2 text-sm text-slate-800">{summarise(e)}</span>
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}
