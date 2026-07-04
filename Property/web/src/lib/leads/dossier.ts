/**
 * Lead dossier: gathers every signal we hold about a lead (verification,
 * AI + Companies House enrichment, on-site journey, sends, and the two-way
 * conversation) into an ungraded evidence pack. Consumed by the internal ops
 * handoff email sent to the operator when a lead becomes contactable.
 *
 * All data gathering is best-effort: a missing table/view or a query error never
 * blocks the handoff, it just produces a sparser dossier.
 */

import { adminSelect } from "@/lib/supabase/admin";

// ── Pure: best call window ───────────────────────────────────────────────────

/**
 * Suggest when DJH should call, from the times the lead actually responded
 * (their replies prove when they pick up their phone). London time.
 */
export function bestCallWindow(responseTimes: Date[]): string | null {
  if (!responseTimes.length) return null;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "numeric",
    hour12: false,
  });
  const buckets = { morning: 0, afternoon: 0, evening: 0, late: 0 };
  for (const t of responseTimes) {
    const hour = Number(fmt.format(t));
    if (hour >= 8 && hour < 12) buckets.morning += 1;
    else if (hour >= 12 && hour < 17) buckets.afternoon += 1;
    else if (hour >= 17 && hour < 21) buckets.evening += 1;
    else buckets.late += 1;
  }
  const best = (Object.entries(buckets) as Array<[keyof typeof buckets, number]>).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
  const label: Record<keyof typeof buckets, string> = {
    morning: "mornings (8am to 12pm)",
    afternoon: "afternoons (12pm to 5pm)",
    evening: "evenings (5pm to 9pm)",
    late: "outside usual hours",
  };
  return `They respond in the ${label[best]}`;
}

// ── Pure: formatting helpers ─────────────────────────────────────────────────

const ACRONYMS: Record<string, string> = {
  cgt: "CGT",
  sdlt: "SDLT",
  btl: "BTL",
  hmrc: "HMRC",
  ltd: "Ltd",
  uk: "UK",
  spv: "SPV",
  vat: "VAT",
  atd: "ATED",
  ated: "ATED",
  mtd: "MTD",
  furnished: "furnished",
};

/** "/blog/cgt-on-selling-rental-property" -> "CGT on selling rental property". */
export function humanisePath(path: string): string {
  const clean = (path || "").split("?")[0].replace(/\/$/, "");
  const seg = clean.split("/").filter(Boolean).pop() || "homepage";
  if (seg === "homepage") return "Homepage";
  const words = seg
    .split("-")
    .filter(Boolean)
    .map((w) => ACRONYMS[w.toLowerCase()] || w);
  const sentence = words.join(" ");
  const capped = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  const section = clean.startsWith("/tools/")
    ? " (calculator)"
    : clean.startsWith("/research/")
      ? " (research)"
      : "";
  return capped + section;
}

/** "41 min" / "3 h 20 min" / "2 days". */
export function formatLatency(ms: number): string {
  if (ms < 60 * 1000) return "under a minute";
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    const rem = mins % 60;
    return rem ? `${hours} h ${rem} min` : `${hours} h`;
  }
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"}`;
}

// ── Data gathering ───────────────────────────────────────────────────────────

export interface TimelineEntry {
  ts: string;
  /** e.g. "Submitted the enquiry", "Our SMS (step 2)", "They replied". */
  label: string;
  /** Verbatim reply body etc., when present. */
  detail: string | null;
}

export interface LeadDossier {
  verification: {
    phone_status: string | null;
    phone_carrier: string | null;
    phone_e164: string | null;
    email_status: string | null;
  };
  enrichment: {
    intent_category: string | null;
    quality_score: number | null;
    summary: string | null;
    ch_company_name: string | null;
    ch_company_number: string | null;
    ch_company_status: string | null;
  };
  journey: {
    totalSessions: number;
    totalEngagedMs: number;
    pageViews: number;
    device: string | null;
    country: string | null;
    referrerHost: string | null;
    topPages: Array<{ path: string; views: number }>;
    calcEvents: number;
  } | null;
  timeline: TimelineEntry[];
  /** Verbatim reply bodies, oldest first. */
  replies: Array<{ ts: string; channel: string; body: string }>;
  bookingStart: string | null;
  responseLatencyMs: number | null;
  callWindow: string | null;
  touchesBeforeResponse: number;
}

interface DossierLead {
  id: string;
  created_at: string;
  visitor_id: string | null;
  message: string | null;
}

type EventRow = {
  event_type: string;
  channel: string | null;
  ts: string;
  meta: Record<string, unknown> | null;
};
type SendRow = { step: number; channel: string; status: string; sent_at: string };
type WebEventRow = { event_name: string; page_path: string | null; ts: string };

const RESPONSE_EVENTS = new Set(["replied", "confirmed", "booked"]);

/** Gather everything we know about a lead. Never throws; missing data -> sparse dossier. */
export async function gatherLeadDossier(lead: DossierLead): Promise<LeadDossier> {
  const [events, sends, ver, enr, journeyRow, webEvents] = await Promise.all([
    adminSelect<EventRow>("lead_contact_events", {
      lead_id: `eq.${lead.id}`,
      select: "event_type,channel,ts,meta",
      order: "ts.asc",
      limit: "60",
    })
      .then((r) => r.data)
      .catch(() => [] as EventRow[]),
    adminSelect<SendRow>("lead_nurture_sends", {
      lead_id: `eq.${lead.id}`,
      select: "step,channel,status,sent_at",
      order: "sent_at.asc",
      limit: "40",
    })
      .then((r) => r.data)
      .catch(() => [] as SendRow[]),
    adminSelect<Record<string, unknown>>("lead_verification", {
      lead_id: `eq.${lead.id}`,
      select: "phone_status,phone_carrier,phone_e164,email_status",
      limit: "1",
    })
      .then((r) => r.data[0] || {})
      .catch(() => ({}) as Record<string, unknown>),
    adminSelect<Record<string, unknown>>("lead_enrichment", {
      lead_id: `eq.${lead.id}`,
      select:
        "intent_category,quality_score,summary,ch_company_name,ch_company_number,ch_company_status",
      limit: "1",
    })
      .then((r) => r.data[0] || {})
      .catch(() => ({}) as Record<string, unknown>),
    lead.visitor_id
      ? adminSelect<Record<string, unknown>>("vw_visitor_journey", {
          visitor_id: `eq.${lead.visitor_id}`,
          select:
            "total_sessions,total_engaged_ms,page_views,device_type,country,referrer_host",
          limit: "1",
        })
          .then((r) => r.data[0] || null)
          .catch(() => null)
      : Promise.resolve(null),
    lead.visitor_id
      ? adminSelect<WebEventRow>("web_events", {
          visitor_id: `eq.${lead.visitor_id}`,
          is_bot: "eq.false",
          select: "event_name,page_path,ts",
          order: "ts.desc",
          limit: "300",
        })
          .then((r) => r.data)
          .catch(() => [] as WebEventRow[])
      : Promise.resolve([] as WebEventRow[]),
  ]);

  // Journey: top pages + calculator usage from raw events.
  const pageCounts = new Map<string, number>();
  let calcEvents = 0;
  for (const ev of webEvents) {
    if (ev.event_name === "page_view" && ev.page_path) {
      pageCounts.set(ev.page_path, (pageCounts.get(ev.page_path) || 0) + 1);
    }
    if (ev.event_name.startsWith("calc_")) calcEvents += 1;
  }
  const topPages = Array.from(pageCounts.entries())
    .filter(([p]) => p !== "/thank-you")
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, views]) => ({ path, views }));

  const journey = journeyRow
    ? {
        totalSessions: Number(journeyRow.total_sessions || 0),
        totalEngagedMs: Number(journeyRow.total_engaged_ms || 0),
        pageViews: Number(journeyRow.page_views || 0),
        device: (journeyRow.device_type as string) || null,
        country: (journeyRow.country as string) || null,
        referrerHost: (journeyRow.referrer_host as string) || null,
        topPages,
        calcEvents,
      }
    : webEvents.length
      ? {
          totalSessions: 1,
          totalEngagedMs: 0,
          pageViews: pageCounts.size,
          device: null,
          country: null,
          referrerHost: null,
          topPages,
          calcEvents,
        }
      : null;

  // Responses, replies, booking.
  const responses = events.filter((e) => RESPONSE_EVENTS.has(e.event_type));
  const firstResponse = responses[0] || null;
  const replies = events
    .filter((e) => e.event_type === "replied" && typeof e.meta?.body === "string")
    .map((e) => ({ ts: e.ts, channel: e.channel || "sms", body: String(e.meta?.body) }));
  const bookedEvent = [...events].reverse().find((e) => e.event_type === "booked");
  const bookingStart =
    bookedEvent && typeof bookedEvent.meta?.start === "string"
      ? String(bookedEvent.meta.start)
      : null;

  const responseLatencyMs = firstResponse
    ? Math.max(0, new Date(firstResponse.ts).getTime() - new Date(lead.created_at).getTime())
    : null;

  const realSends = sends.filter((s) => s.status === "sent" || s.status === "delivered");
  const touchesBeforeResponse = firstResponse
    ? realSends.filter((s) => new Date(s.sent_at) <= new Date(firstResponse.ts)).length
    : realSends.length;

  // Timeline: submit + sends + meaningful events, chronological, capped.
  const timeline: TimelineEntry[] = [
    { ts: lead.created_at, label: "Submitted the enquiry", detail: null },
  ];
  for (const s of realSends) {
    timeline.push({
      ts: s.sent_at,
      label: `Our ${s.channel === "email" ? "email" : s.channel.toUpperCase()} (touch ${s.step + 1})`,
      detail: null,
    });
  }
  for (const s of sends.filter((x) => x.status === "failed")) {
    timeline.push({ ts: s.sent_at, label: `Send failed (${s.channel})`, detail: null });
  }
  for (const e of events) {
    if (e.event_type === "replied") {
      timeline.push({
        ts: e.ts,
        label: `They replied by ${e.channel === "whatsapp" ? "WhatsApp" : "SMS"}`,
        detail: typeof e.meta?.body === "string" ? String(e.meta.body) : null,
      });
    } else if (e.event_type === "booked") {
      timeline.push({
        ts: e.ts,
        label: "They booked a callback",
        detail: bookingStart ? `Slot: ${bookingStart}` : null,
      });
    } else if (e.event_type === "confirmed") {
      timeline.push({ ts: e.ts, label: "They confirmed by one-tap email link", detail: null });
    } else if (e.event_type === "ack_sent") {
      timeline.push({ ts: e.ts, label: "Our auto-acknowledgement", detail: null });
    } else if (e.event_type === "opted_out") {
      timeline.push({ ts: e.ts, label: "They opted out", detail: null });
    }
  }
  timeline.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
  const cappedTimeline = timeline.slice(0, 25);

  const callWindow = bestCallWindow(responses.map((e) => new Date(e.ts)));

  return {
    verification: {
      phone_status: (ver.phone_status as string) || null,
      phone_carrier: (ver.phone_carrier as string) || null,
      phone_e164: (ver.phone_e164 as string) || null,
      email_status: (ver.email_status as string) || null,
    },
    enrichment: {
      intent_category: (enr.intent_category as string) || null,
      quality_score: enr.quality_score != null ? Number(enr.quality_score) : null,
      summary: (enr.summary as string) || null,
      ch_company_name: (enr.ch_company_name as string) || null,
      ch_company_number: (enr.ch_company_number as string) || null,
      ch_company_status: (enr.ch_company_status as string) || null,
    },
    journey,
    timeline: cappedTimeline,
    replies,
    bookingStart,
    responseLatencyMs,
    callWindow,
    touchesBeforeResponse,
  };
}
