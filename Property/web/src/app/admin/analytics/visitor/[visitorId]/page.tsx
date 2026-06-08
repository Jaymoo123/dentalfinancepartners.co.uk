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
  getLeadForVisitor,
  type VisitorEvent,
} from "@/lib/analytics/server/adminData";
import { buildStory, buildActivityRows } from "@/lib/analytics/journey";
import VisitorTabs from "./VisitorTabs";

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
  const [journey, events, lead] = await Promise.all([
    getVisitorJourney(siteKey, visitorId),
    getVisitorEvents(siteKey, visitorId),
    getLeadForVisitor(siteKey, visitorId),
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

  // Group events by session (for the new-vs-returning + sparkline maths).
  const bySession = new Map<string, VisitorEvent[]>();
  for (const e of events) {
    const g = bySession.get(e.session_id);
    if (g) g.push(e); else bySession.set(e.session_id, [e]);
  }

  // Humanised views: a readable per-session STORY + the granular ACTIVITY log.
  const storySessions = buildStory(events);
  const activityRows = buildActivityRows(events);

  // Journey-as-story summary.
  const visits = journey?.total_sessions ?? bySession.size;
  const visitClass = visits > 1 ? "Returning" : "New";
  const sectionsRead = counts.get("section_view") || 0;
  const storyParts: string[] = [`${visitClass} visitor`];
  if (visits) storyParts.push(`${visits} visit${visits > 1 ? "s" : ""}`);
  if (pages.size)
    storyParts.push(
      `${pages.size} page${pages.size > 1 ? "s" : ""}${sectionsRead ? ` (${sectionsRead} sections read)` : ""}`,
    );
  if (calcs.size) storyParts.push(`${calcs.size} calculator${calcs.size > 1 ? "s" : ""}`);
  if (lead) storyParts.push(`converted as ${lead.full_name || lead.email}`);
  else if (journey?.converted) storyParts.push("converted");
  const story = storyParts.join(" · ");

  // Per-session engaged time (ms) for the sparkline (max cumulative per session).
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

  // Per-visitor mini-funnel — the same nested-funnel logic as the global view,
  // for this one person (downstream stage implies all upstream stages).
  const usedCalc = (counts.get("calc_computed") || 0) > 0;
  const clickedFormCta = events.some((e) => e.event_name === "cta_click" && e.props?.goal === "form");
  const startedForm = (counts.get("form_start") || 0) > 0 || (counts.get("form_submit") || 0) > 0;
  const isConverted = !!lead || !!journey?.converted;
  const isEngaged = (journey?.total_engaged_ms ?? 0) >= 10000;
  const fConverted = isConverted;
  const fFormStart = startedForm || fConverted;
  const fFormCta = clickedFormCta || fFormStart;
  const fCalc = usedCalc;
  const fEngaged = isEngaged || fFormCta || fCalc;
  const miniFunnel: Array<{ label: string; reached: boolean; branch?: boolean }> = [
    { label: "Visited", reached: true },
    { label: "Engaged", reached: fEngaged },
    { label: "Used calc", reached: fCalc, branch: true },
    { label: "Form CTA", reached: fFormCta },
    { label: "Form start", reached: fFormStart },
    { label: "Submitted", reached: fConverted },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={`/admin/analytics?k=${expected}`} className="text-sm text-emerald-700 underline">← All visitors</Link>

      {/* Header card */}
      <div className={`mt-3 rounded-xl border p-5 ${journey?.converted ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            {lead ? (
              <>
                <h1 className="truncate text-base font-bold text-slate-900">{lead.full_name || lead.email || "Lead"}</h1>
                <div className="mt-0.5 break-all text-xs text-slate-600">
                  {[lead.email, lead.phone, lead.role].filter(Boolean).join(" · ") || "—"}
                </div>
                <div className="mt-0.5 break-all font-mono text-[11px] text-slate-400">{visitorId}</div>
              </>
            ) : (
              <h1 className="break-all font-mono text-sm font-bold text-slate-900">{visitorId}</h1>
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${visitClass === "Returning" ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-700"}`}
            >
              {visitClass.toUpperCase()}
            </span>
            {journey?.converted || lead ? (
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">CONVERTED</span>
            ) : (
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">Not converted</span>
            )}
          </div>
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

      {/* Story line + engagement sparkline */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-700">{story}</p>
        {sessionEngagement.length > 0 && (
          <div className="flex items-end gap-1" title="Engaged time per session (left = first visit)">
            {sessionEngagement.map((ms, i) => (
              <div
                key={i}
                className="w-2 rounded-t bg-emerald-500"
                style={{ height: `${Math.max(3, (ms / maxEng) * 32)}px` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Per-visitor funnel — mirrors the global nested funnel for this person */}
      <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">This visitor&apos;s funnel</h3>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          {miniFunnel.map((s, i) => (
            <span key={s.label} className="flex items-center gap-1.5">
              {i > 0 && !s.branch && <span className="text-slate-300">→</span>}
              <span
                className={`rounded-full px-2.5 py-1 font-semibold ${
                  s.reached
                    ? s.branch
                      ? "bg-sky-100 text-sky-700"
                      : "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {s.branch ? "↳ " : ""}
                {s.label}
                {s.reached ? " ✓" : ""}
              </span>
            </span>
          ))}
        </div>
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
                <div key={p} className="flex justify-between gap-2"><span className="break-all text-slate-700" title={p}>{p}</span><span className="font-mono text-slate-400">{n}</span></div>
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
                <div key={id} className="flex justify-between gap-2"><span className="break-all text-slate-700" title={id}>{id}</span><span className="font-mono text-slate-400">{n}</span></div>
              ))}
          </div>
        </div>
      </div>

      {/* Story + Activity tabs */}
      <VisitorTabs story={storySessions} activity={activityRows} />
    </div>
  );
}
