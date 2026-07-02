/**
 * Lead readiness dossier + reply-ack tests.
 *
 * The dossier's scoring/formatting functions are pure, so most of this file is
 * straight input -> output. acknowledgeReply is tested against the same
 * in-memory admin mock pattern as lead-nurture.test.ts, with the channel sender
 * and Resend mocked so nothing leaves the process.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── In-memory admin store (same pattern as lead-nurture.test.ts) ─────────────
type Row = Record<string, unknown>;
const db = {
  leads: [] as Row[],
  lead_contact_events: [] as Row[],
  reset() {
    this.leads = [];
    this.lead_contact_events = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    }
  }
  return true;
}

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((table: string, params: Record<string, string>) =>
    Promise.resolve({
      ok: true,
      status: 200,
      data: ((db[table as keyof typeof db] as Row[]) || []).filter((r) => matches(r, params)),
    }),
  ),
  adminInsert: vi.fn((table: string, rows: Row) => {
    ((db[table as keyof typeof db] as Row[]) || []).push(rows);
    return Promise.resolve({ ok: true, status: 201, data: [rows] });
  }),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn(
    async (leadId: string, event_type: string, channel: string | null, meta?: unknown) => {
      db.lead_contact_events.push({ lead_id: leadId, event_type, channel, meta: meta ?? null });
    },
  ),
}));

vi.mock("@/config/lead-nurture", () => ({
  buildLeadMessageContext: vi.fn(() => ({
    firstName: "Sam",
    bookingUrl: "https://cal.example/slot",
    confirmUrl: "https://x/confirm/t",
    optOutText: "Reply STOP to opt out.",
    siteUrl: "https://x",
  })),
  LEAD_SEQUENCE_NAME: "property_contactability",
}));

const senderSpy = vi.fn(
  async (_msg?: unknown): Promise<{ id?: string; skipped?: boolean } | null> => ({
    id: "SM_test",
  }),
);
const buildSenderSpy = vi.fn((_opts?: { live?: boolean }) => ({ send: senderSpy }));
vi.mock("@/lib/leads/channels", () => ({
  buildLeadChannelSender: (opts?: { live?: boolean }) => buildSenderSpy(opts),
  toE164UK: (s: string) => s,
}));

const resendSendSpy = vi.fn(async () => ({ data: { id: "em_1" }, error: null }));
vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: resendSendSpy } }),
  getFromAddress: () => "Property Tax Partners <ops@x>",
}));
vi.mock("@/lib/lead-routing", () => ({
  resolveLeadTo: () => "operator@example.com",
}));

import {
  computeReadiness,
  bestCallWindow,
  humanisePath,
  formatLatency,
} from "@/lib/leads/dossier";
import { acknowledgeReply } from "@/lib/leads/reply-ack";

beforeEach(() => {
  db.reset();
  vi.clearAllMocks();
  senderSpy.mockResolvedValue({ id: "SM_test" });
  process.env.RESEND_API_KEY = "re_test";
});

// ── computeReadiness ─────────────────────────────────────────────────────────
describe("computeReadiness", () => {
  it("verified mobile + fast booking + engagement -> Grade A with reasons", () => {
    const r = computeReadiness({
      phoneStatus: "valid_mobile",
      emailStatus: "deliverable",
      bestResponse: "booked",
      responseLatencyMs: 30 * 60 * 1000,
      totalEngagedMs: 6 * 60 * 1000,
      totalSessions: 3,
      calcEvents: 2,
      enrichmentQuality: 4,
      messageLength: 250,
    });
    expect(r.grade).toBe("A");
    expect(r.score).toBe(10); // clamped
    expect(r.reasons.join(" ")).toMatch(/mobile/i);
    expect(r.reasons.join(" ")).toMatch(/booked/i);
  });

  it("invalid phone + bounced email + no response -> Grade C", () => {
    const r = computeReadiness({
      phoneStatus: "invalid",
      emailStatus: "undeliverable",
      bestResponse: null,
      responseLatencyMs: null,
      totalEngagedMs: 0,
      totalSessions: 0,
      calcEvents: 0,
      enrichmentQuality: null,
      messageLength: 40,
    });
    expect(r.grade).toBe("C");
    expect(r.score).toBe(0); // floored
  });

  it("VoIP number is penalised and the reason says so", () => {
    const r = computeReadiness({
      phoneStatus: "voip",
      emailStatus: "deliverable",
      bestResponse: "confirmed",
      responseLatencyMs: null,
      totalEngagedMs: 0,
      totalSessions: 1,
      calcEvents: 0,
      enrichmentQuality: null,
      messageLength: 0,
    });
    expect(r.reasons.join(" ")).toMatch(/voip/i);
    expect(r.grade).toBe("C");
  });

  it("SMS reply on an unverified number lands mid-table (B)", () => {
    const r = computeReadiness({
      phoneStatus: "unknown",
      emailStatus: "deliverable",
      bestResponse: "replied",
      responseLatencyMs: 45 * 60 * 1000,
      totalEngagedMs: 0,
      totalSessions: 1,
      calcEvents: 0,
      enrichmentQuality: null,
      messageLength: 100,
    });
    expect(r.grade).toBe("B");
  });
});

// ── bestCallWindow ───────────────────────────────────────────────────────────
describe("bestCallWindow", () => {
  it("returns null with no responses", () => {
    expect(bestCallWindow([])).toBeNull();
  });

  it("buckets a BST evening reply as evening (18:30 UTC = 19:30 London)", () => {
    expect(bestCallWindow([new Date("2026-07-01T18:30:00Z")])).toMatch(/evening/);
  });

  it("majority wins across mixed times", () => {
    const w = bestCallWindow([
      new Date("2026-07-01T18:30:00Z"), // evening
      new Date("2026-07-02T17:15:00Z"), // evening
      new Date("2026-07-03T08:00:00Z"), // morning
    ]);
    expect(w).toMatch(/evening/);
  });
});

// ── humanisePath / formatLatency ─────────────────────────────────────────────
describe("formatting", () => {
  it("humanises blog slugs with acronyms", () => {
    expect(humanisePath("/blog/cgt-on-selling-rental-property")).toBe(
      "CGT on selling rental property",
    );
  });

  it("labels calculators", () => {
    expect(humanisePath("/tools/rental-income-tax-calculator")).toMatch(/\(calculator\)$/);
  });

  it("handles the homepage", () => {
    expect(humanisePath("/")).toBe("Homepage");
  });

  it("formats latency at each magnitude", () => {
    expect(formatLatency(30 * 1000)).toBe("under a minute");
    expect(formatLatency(41 * 60 * 1000)).toBe("41 min");
    expect(formatLatency(3 * 3600 * 1000 + 20 * 60 * 1000)).toBe("3 h 20 min");
    expect(formatLatency(50 * 3600 * 1000)).toBe("2 days");
  });
});

// ── acknowledgeReply ─────────────────────────────────────────────────────────
const LID = "lead-ack-1";
function seedLead(source = "property") {
  db.leads.push({
    id: LID,
    full_name: "Sam Doe",
    email: "sam@example.com",
    phone: "+447700900123",
    role: "landlord",
    source,
    message: "hello",
  });
}

describe("acknowledgeReply", () => {
  it("sends exactly one ack per lead (idempotent)", async () => {
    seedLead();
    const first = await acknowledgeReply({
      leadId: LID,
      channel: "sms",
      replyTo: "+447700900123",
      replyBody: "YES",
      alreadyContactable: false,
    });
    expect(first.acked).toBe(true);
    expect(senderSpy).toHaveBeenCalledTimes(1);
    const msg = senderSpy.mock.calls[0][0] as unknown as { channel: string; body: string };
    expect(msg.channel).toBe("sms");
    expect(msg.body).toMatch(/best time/i);
    expect(msg.body).toContain("https://cal.example/slot");
    expect(msg.body).not.toContain("—"); // no em-dashes in copy

    const second = await acknowledgeReply({
      leadId: LID,
      channel: "sms",
      replyTo: "+447700900123",
      replyBody: "evenings please",
      alreadyContactable: false,
    });
    expect(second.acked).toBe(false);
    expect(senderSpy).toHaveBeenCalledTimes(1); // no re-send
  });

  it("does not burn the one ack when the provider is unconfigured (null)", async () => {
    seedLead();
    senderSpy.mockResolvedValueOnce(null);
    const first = await acknowledgeReply({
      leadId: LID,
      channel: "sms",
      replyTo: "+447700900123",
      replyBody: "YES",
      alreadyContactable: false,
    });
    expect(first.acked).toBe(false);
    // Next reply retries and succeeds.
    const second = await acknowledgeReply({
      leadId: LID,
      channel: "sms",
      replyTo: "+447700900123",
      replyBody: "YES again",
      alreadyContactable: false,
    });
    expect(second.acked).toBe(true);
  });

  it("post-handoff replies email the operator, capped at 3", async () => {
    seedLead();
    // Pre-seed the ack so only the operator-update path runs.
    db.lead_contact_events.push({ lead_id: LID, event_type: "ack_sent", channel: "sms" });

    for (let i = 0; i < 4; i++) {
      await acknowledgeReply({
        leadId: LID,
        channel: "sms",
        replyTo: "+447700900123",
        replyBody: `after 6pm works, message ${i}`,
        alreadyContactable: true,
      });
    }
    expect(resendSendSpy).toHaveBeenCalledTimes(3); // 4th suppressed by cap
    const updates = db.lead_contact_events.filter((e) => e.event_type === "operator_update");
    expect(updates).toHaveLength(3);
  });

  it("test leads never email the operator", async () => {
    seedLead("test");
    db.lead_contact_events.push({ lead_id: LID, event_type: "ack_sent", channel: "sms" });
    const r = await acknowledgeReply({
      leadId: LID,
      channel: "sms",
      replyTo: "+447700900123",
      replyBody: "test reply",
      alreadyContactable: true,
    });
    expect(r.operatorUpdated).toBe(false);
    expect(resendSendSpy).not.toHaveBeenCalled();
  });

  it("passes live:false to the sender for test leads", async () => {
    seedLead("test");
    await acknowledgeReply({
      leadId: LID,
      channel: "sms",
      replyTo: "+447700900123",
      replyBody: "YES",
      alreadyContactable: false,
    });
    expect(buildSenderSpy).toHaveBeenCalledWith({ live: false });
  });
});
