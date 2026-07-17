/**
 * Auxiliary scheduled sends: booked-slot reminders and abandoned-booking nudges.
 * Called hourly from the cron route (after the main nurture run).
 *
 * Both scans are idempotent via lead_nurture_sends claims and dormancy-gated
 * through the same ChannelSender. Skipped sends still claim so nothing loops.
 * Never throws out of runLeadAuxScans (best-effort wrapper).
 *
 * House style: no em-dashes. British English.
 */

import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { buildLeadChannelSender } from "@/lib/leads/channels";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { inSendWindow } from "@/lib/leads/send-window";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { getSiteUrl } from "@/config/niche-loader";
import { firstNameOf } from "@accounting-network/web-shared/lead-nurture/config";
import { LEAD_SEQUENCE_NAMES } from "@/config/lead-nurture";

// ---------------------------------------------------------------------------
// Window bounds (Europe/London wall-clock)
// ---------------------------------------------------------------------------

interface WindowBounds {
  startH: number;
  startM: number;
  endH: number;
  endM: number;
}

const WINDOW_BOUNDS: Record<string, WindowBounds> = {
  morning:        { startH: 9,  startM: 0, endH: 12, endM: 0  },
  afternoon:      { startH: 12, startM: 0, endH: 15, endM: 0  },
  late_afternoon: { startH: 15, startM: 0, endH: 17, endM: 30 },
};

/** Human phrase for the booked window, used in the T-24 reminder email. */
const WINDOW_PHRASES: Record<string, string> = {
  morning:        "in the morning, between 9am and 12pm",
  afternoon:      "in the afternoon, between 12pm and 3pm",
  late_afternoon: "in the late afternoon, between 3pm and 5.30pm",
};

// ---------------------------------------------------------------------------
// London-to-UTC conversion (mirrors send-window.ts londonEpochMs)
// ---------------------------------------------------------------------------

function londonToUtcMs(isoDate: string, hour: number, minute: number): number {
  const [year, month, day] = isoDate.split("-").map(Number);
  let ms = Date.UTC(year, month - 1, day, hour, minute, 0, 0);

  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  for (let i = 0; i < 4; i++) {
    const parts = fmt.formatToParts(new Date(ms));
    const actualH = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
    const actualM = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
    const diff = (hour * 60 + minute) - (actualH * 60 + actualM);
    if (diff === 0) break;
    ms += diff * 60_000;
  }

  return ms;
}

// ---------------------------------------------------------------------------
// Pure ICS builder (exported for unit tests and the ICS route)
// ---------------------------------------------------------------------------

export interface IcsSlotParams {
  leadId: string;
  date: string;    // YYYY-MM-DD
  windowKey: string;
  label: string;   // human slot label, used in SUMMARY
}

function toIcsDtStamp(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
}

export function buildIcsForSlot(params: IcsSlotParams): string {
  const bounds = WINDOW_BOUNDS[params.windowKey];
  if (!bounds) return "";

  const startMs = londonToUtcMs(params.date, bounds.startH, bounds.startM);
  const endMs   = londonToUtcMs(params.date, bounds.endH,   bounds.endM);

  const uid     = `${params.leadId}-${params.date}-${params.windowKey}@contractortaxaccountants.co.uk`;
  const summary = `IR35 review call (${params.label})`;
  const desc    = "An accountant will call you in this window. Nothing to prepare.";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Contractor Tax Accountants//Lead Review//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${toIcsDtStamp(startMs)}`,
    `DTEND:${toIcsDtStamp(endMs)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

// ---------------------------------------------------------------------------
// Claim helpers
// ---------------------------------------------------------------------------

interface SendRow {
  id: string;
}

async function claimSend(
  leadId: string,
  sequence: string,
  step: number,
  channel: string,
): Promise<string | null> {
  const res = await adminInsert<SendRow>(
    "lead_nurture_sends",
    { lead_id: leadId, sequence, step, channel, status: "pending" },
    { onConflict: "lead_id,sequence,step,channel", ignoreDuplicates: true },
  );
  if (!res.ok || res.data.length === 0) return null;
  return res.data[0].id;
}

async function markSendStatus(
  sendRowId: string,
  status: "sent" | "skipped" | "failed",
  providerId?: string | null,
): Promise<void> {
  await adminUpdate(
    "lead_nurture_sends",
    { id: `eq.${sendRowId}` },
    { status, ...(providerId != null ? { provider_id: providerId } : {}) },
  );
}

// ---------------------------------------------------------------------------
// URL builders
// ---------------------------------------------------------------------------

function buildOptOutUrl(leadId: string, base: string): string {
  try {
    return `${base}/api/leads/optout/${mintLeadToken(leadId, "optout")}`;
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// Email constants
// ---------------------------------------------------------------------------

const COMPANY  = "Contractor Tax Accountants";
const SIGNOFF  = `Speak soon, the team at ${COMPANY}`;
const FOOTER   =
  "You are receiving this because you submitted an enquiry on contractortaxaccountants.co.uk.";

// ---------------------------------------------------------------------------
// Booked event meta shape
// ---------------------------------------------------------------------------

interface BookedMeta {
  date:   string;
  window: string;
  start:  string;
}

function parseBookedMeta(raw: unknown): BookedMeta | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  if (typeof m.date !== "string" || typeof m.window !== "string") return null;
  return { date: m.date, window: m.window, start: typeof m.start === "string" ? m.start : "" };
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function runLeadAuxScans(): Promise<{ reminders: number; nudges: number }> {
  let reminders = 0;
  let nudges    = 0;

  try {
    const sender  = buildLeadChannelSender({ live: true });
    const siteUrl = getSiteUrl().replace(/\/$/, "");
    const now     = Date.now();

    // ── Scan A: booked-slot reminders ──────────────────────────────────────

    const thirtyDaysAgo = new Date(now - 30 * 24 * 3600_000).toISOString();

    const bookedRes = await adminSelect<{ lead_id: string; ts: string; meta: unknown }>(
      "lead_contact_events",
      {
        select: "lead_id,ts,meta",
        event_type: "eq.booked",
        ts: `gte.${thirtyDaysAgo}`,
        order: "ts.desc",
      },
    );

    // Group by lead_id keeping the latest booked event (query is desc so first wins).
    const latestByLead = new Map<string, BookedMeta>();
    for (const row of bookedRes.data) {
      if (latestByLead.has(row.lead_id)) continue;
      const meta = parseBookedMeta(row.meta);
      if (meta) latestByLead.set(row.lead_id, meta);
    }

    if (latestByLead.size > 0) {
      const leadIds = Array.from(latestByLead.keys());

      const leadsRes = await adminSelect<{
        id: string;
        full_name: string;
        email: string;
        phone: string | null;
        source: string | null;
      }>("leads", {
        select: "id,full_name,email,phone,source",
        id: `in.(${leadIds.join(",")})`,
      });
      const leadsById = new Map(leadsRes.data.map((l) => [l.id, l]));

      const optedOutRes = await adminSelect<{ lead_id: string }>("lead_contact_events", {
        select: "lead_id",
        event_type: "eq.opted_out",
        lead_id: `in.(${leadIds.join(",")})`,
      });
      const optedOutLeads = new Set(optedOutRes.data.map((e) => e.lead_id));

      for (const [leadId, meta] of latestByLead) {
        const lead = leadsById.get(leadId);
        if (!lead) continue;
        if (optedOutLeads.has(leadId)) continue;
        if (lead.source === "test") continue;

        const bounds = WINDOW_BOUNDS[meta.window];
        if (!bounds) continue;

        const slotStartMs = londonToUtcMs(meta.date, bounds.startH, bounds.startM);

        // Skip past slots.
        if (slotStartMs <= now) continue;

        const firstName  = firstNameOf(lead.full_name);
        const optOutUrl  = buildOptOutUrl(leadId, siteUrl);
        const label      = meta.start || `${meta.window} on ${meta.date}`;
        const sequence   = `booking_reminder:${meta.date}:${meta.window}`;

        // Step 0: T-24 email.
        const inT24 = now >= slotStartMs - 24 * 3600_000 && now < slotStartMs;
        if (inT24) {
          const sendRowId = await claimSend(leadId, sequence, 0, "email");
          if (sendRowId) {
            try {
              const windowPhrase = WINDOW_PHRASES[meta.window] ?? `in your booked slot (${label})`;
              const { html, text } = renderLeadServiceEmail({
                preheader: "Booked for tomorrow. Reply if the time no longer works.",
                greeting: `Hi ${firstName},`,
                paragraphs: [
                  `Your free IR35 review call is tomorrow, ${windowPhrase}.`,
                  "One of our accountants will ring you then. They will have read your enquiry before they call, the call takes about 20 minutes, and there is nothing to prepare.",
                  "If the time no longer works, just reply to this email and I will move it to one that does.",
                ],
                signoff: SIGNOFF,
                footerNote: FOOTER,
                ...(optOutUrl ? { optOutUrl } : {}),
              });

              const headers: Record<string, string> = {
                "List-Unsubscribe": `<${optOutUrl}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              };

              const result = await sender.send({
                channel: "email",
                to: lead.email,
                subject: `Your call is tomorrow, ${firstName}`,
                html,
                text,
                headers,
              });

              if (result?.skipped) {
                await markSendStatus(sendRowId, "skipped");
              } else if (result?.id) {
                await markSendStatus(sendRowId, "sent", result.id);
                reminders++;
              } else {
                await markSendStatus(sendRowId, "failed");
              }
            } catch (err) {
              await markSendStatus(sendRowId, "failed");
              console.error("[lead-aux-cron] T-24 email error", err);
            }
          }
        }

        // Step 1: same-day SMS (afternoon and late_afternoon only).
        const isMorning = meta.window === "morning";
        if (!isMorning) {
          const inT2 = now >= slotStartMs - 2 * 3600_000 && now < slotStartMs;
          if (inT2 && inSendWindow(now, true)) {
            const sendRowId = await claimSend(leadId, sequence, 1, "sms");
            if (sendRowId && lead.phone) {
              try {
                const body =
                  `Hi ${firstName}, your free IR35 review call is later today, ${label}. ` +
                  `Your accountant will call you then. Need a different time? Just reply and we will rearrange. Reply STOP to opt out.`;

                const result = await sender.send({
                  channel: "sms",
                  to: lead.phone,
                  body,
                });

                if (result?.skipped) {
                  await markSendStatus(sendRowId, "skipped");
                } else if (result?.id) {
                  await markSendStatus(sendRowId, "sent", result.id);
                  reminders++;
                } else {
                  await markSendStatus(sendRowId, "failed");
                }
              } catch (err) {
                await markSendStatus(sendRowId, "failed");
                console.error("[lead-aux-cron] T-2 SMS error", err);
              }
            } else if (sendRowId && !lead.phone) {
              await markSendStatus(sendRowId, "skipped");
            }
          }
        }
      }
    }

    // ── Scan B: abandoned-booking nudge ─────────────────────────────────────

    const fortyEightHoursAgo = new Date(now - 48 * 3600_000).toISOString();
    const twoHoursAgo        = now - 2 * 3600_000;

    const viewedRes = await adminSelect<{ lead_id: string; ts: string }>(
      "lead_contact_events",
      {
        select: "lead_id,ts",
        event_type: "eq.booking_viewed",
        ts: `gte.${fortyEightHoursAgo}`,
        order: "ts.desc",
      },
    );

    const recentViewed = viewedRes.data.filter(
      (e) => new Date(e.ts).getTime() <= twoHoursAgo,
    );
    const viewedLeadIds = [...new Set(recentViewed.map((e) => e.lead_id))];

    if (viewedLeadIds.length > 0) {
      const statesRes = await adminSelect<{ lead_id: string }>(
        "lead_nurture_state",
        {
          select: "lead_id",
          lead_id: `in.(${viewedLeadIds.join(",")})`,
          status: "eq.active",
          sequence: `eq.${LEAD_SEQUENCE_NAMES.contactability}`,
        },
      );
      const activeIds = new Set(statesRes.data.map((n) => n.lead_id));
      const candidateIds = viewedLeadIds.filter((id) => activeIds.has(id));

      if (candidateIds.length > 0) {
        const bookedCheckRes = await adminSelect<{ lead_id: string }>(
          "lead_contact_events",
          {
            select: "lead_id",
            event_type: "eq.booked",
            lead_id: `in.(${candidateIds.join(",")})`,
          },
        );
        const bookedIds = new Set(bookedCheckRes.data.map((e) => e.lead_id));

        const optedOutResB = await adminSelect<{ lead_id: string }>(
          "lead_contact_events",
          {
            select: "lead_id",
            event_type: "eq.opted_out",
            lead_id: `in.(${candidateIds.join(",")})`,
          },
        );
        const optedOutIdsB = new Set(optedOutResB.data.map((e) => e.lead_id));

        const eligibleIds = candidateIds.filter(
          (id) => !bookedIds.has(id) && !optedOutIdsB.has(id),
        );

        if (eligibleIds.length > 0 && inSendWindow(now, true)) {
          const nudgeLeadsRes = await adminSelect<{
            id: string;
            full_name: string;
            phone: string | null;
            source: string | null;
          }>("leads", {
            select: "id,full_name,phone,source",
            id: `in.(${eligibleIds.join(",")})`,
          });

          for (const lead of nudgeLeadsRes.data) {
            if (!lead.phone) continue;
            if (lead.source === "test") continue;

            const sendRowId = await claimSend(lead.id, "abandoned_booking", 0, "sms");
            if (!sendRowId) continue;

            try {
              const firstName  = firstNameOf(lead.full_name);
              const body =
                `Looks like you started to arrange a time, ${firstName}. Anything I can make easier? ` +
                `Just reply and I will sort it. Reply STOP to opt out.`;

              const result = await sender.send({
                channel: "sms",
                to: lead.phone,
                body,
              });

              if (result?.skipped) {
                await markSendStatus(sendRowId, "skipped");
              } else if (result?.id) {
                await markSendStatus(sendRowId, "sent", result.id);
                nudges++;
              } else {
                await markSendStatus(sendRowId, "failed");
              }
            } catch (err) {
              await markSendStatus(sendRowId, "failed");
              console.error("[lead-aux-cron] abandoned nudge error", err);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("[lead-aux-cron] unexpected top-level error", err);
  }

  return { reminders, nudges };
}
