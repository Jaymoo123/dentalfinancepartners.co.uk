/**
 * Lead-nurture engine tests. Unlike the subscriber suite, these exercise the
 * REAL processLeadStep / runLeadNurtureCron by mocking the admin REST layer
 * (../nurture/admin) with an in-memory store, so the reactive multi-channel
 * scheduler is genuinely covered:
 *   - multi-channel claim-before-send + one-send-per-(step,channel) idempotency
 *   - claim release + retry when a whole step fails
 *   - skipped channels (dormant) still advance
 *   - status-guarded advance (never clobbers a contactable lead)
 *   - exhaustion -> unreachable
 *   - cron dormancy + due-scan
 *   - token round-trip / tamper / expiry
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── In-memory store backing the mocked admin layer ───────────────────────────
type SendRow = { id: string; lead_id: string; sequence: string; step: number; channel: string; status?: string; provider_id?: string | null };
type StateRow = { lead_id: string; sequence: string; step: number; status: string; next_action_at: string | null; last_action_at?: string | null; generated_copy?: Record<string, unknown> | null; copy_status?: string | null; best_send_hour?: number | null };
type LeadRow = { id: string; full_name: string; email: string; phone: string; role: string | null; source: string; message?: string | null };

const store = {
  sends: [] as SendRow[],
  events: [] as Record<string, unknown>[],
  states: [] as StateRow[],
  leads: [] as LeadRow[],
  counter: 0,
  reset() {
    this.sends = [];
    this.events = [];
    this.states = [];
    this.leads = [];
    this.counter = 0;
  },
};

function eqVal(params: Record<string, string>, key: string): string | undefined {
  const v = params[key];
  return v?.startsWith("eq.") ? v.slice(3) : undefined;
}

vi.mock("../nurture/admin", () => ({
  adminConfigured: () => true,
  adminInsert: vi.fn((table: string, rows: unknown, opts?: { onConflict?: string; ignoreDuplicates?: boolean }) => {
    if (table === "lead_nurture_sends") {
      const r = rows as SendRow;
      const dup = store.sends.find(
        (s) => s.lead_id === r.lead_id && s.sequence === r.sequence && s.step === r.step && s.channel === r.channel,
      );
      if (dup) return Promise.resolve({ ok: true, status: 201, data: opts?.ignoreDuplicates ? [] : [dup] });
      const row = { ...r, id: `snd-${++store.counter}` };
      store.sends.push(row);
      return Promise.resolve({ ok: true, status: 201, data: [row] });
    }
    if (table === "lead_contact_events") {
      store.events.push(rows as Record<string, unknown>);
      return Promise.resolve({ ok: true, status: 201, data: [rows] });
    }
    if (table === "lead_nurture_state") {
      const r = rows as StateRow;
      const existing = store.states.find((s) => s.lead_id === r.lead_id && s.sequence === r.sequence);
      if (existing) return Promise.resolve({ ok: true, status: 201, data: opts?.ignoreDuplicates ? [] : [existing] });
      store.states.push({ ...r });
      return Promise.resolve({ ok: true, status: 201, data: [r] });
    }
    return Promise.resolve({ ok: true, status: 201, data: [rows] });
  }),
  adminUpdate: vi.fn((table: string, params: Record<string, string>, patch: Record<string, unknown>) => {
    if (table === "lead_nurture_sends") {
      const id = eqVal(params, "id");
      const row = store.sends.find((s) => s.id === id);
      if (row) Object.assign(row, patch);
      return Promise.resolve({ ok: true, status: 200, data: row ? [row] : [] });
    }
    if (table === "lead_nurture_state") {
      const leadId = eqVal(params, "lead_id");
      const seq = eqVal(params, "sequence");
      const statusGuard = eqVal(params, "status");
      const row = store.states.find(
        (s) => s.lead_id === leadId && (!seq || s.sequence === seq) && (!statusGuard || s.status === statusGuard),
      );
      if (row) Object.assign(row, patch);
      return Promise.resolve({ ok: true, status: 200, data: row ? [row] : [] });
    }
    return Promise.resolve({ ok: true, status: 200, data: [] });
  }),
  adminDelete: vi.fn((table: string, params: Record<string, string>) => {
    if (table === "lead_nurture_sends") {
      const id = eqVal(params, "id");
      store.sends = store.sends.filter((s) => s.id !== id);
    }
    return Promise.resolve({ ok: true, status: 204, data: [] });
  }),
  adminSelect: vi.fn((table: string, params: Record<string, string>) => {
    if (table === "lead_nurture_state") {
      const seq = eqVal(params, "sequence");
      const nowLte = params.next_action_at?.startsWith("lte.") ? params.next_action_at.slice(4) : undefined;
      const due = store.states
        .filter((s) => (!seq || s.sequence === seq) && s.status === "active")
        .filter((s) => !nowLte || (s.next_action_at !== null && s.next_action_at <= nowLte))
        .map((s) => {
          const lead = store.leads.find((l) => l.id === s.lead_id) ?? null;
          return {
            lead_id: s.lead_id,
            step: s.step,
            generated_copy: s.generated_copy ?? null,
            copy_status: s.copy_status ?? null,
            best_send_hour: s.best_send_hour ?? null,
            leads: lead,
          };
        });
      return Promise.resolve({ ok: true, status: 200, data: due });
    }
    if (table === "lead_nurture_sends") {
      const data = store.sends.filter(
        (s) =>
          (!eqVal(params, "lead_id") || s.lead_id === eqVal(params, "lead_id")) &&
          (!eqVal(params, "sequence") || s.sequence === eqVal(params, "sequence")) &&
          (eqVal(params, "step") === undefined || String(s.step) === eqVal(params, "step")) &&
          (!eqVal(params, "channel") || s.channel === eqVal(params, "channel")),
      );
      return Promise.resolve({ ok: true, status: 200, data });
    }
    return Promise.resolve({ ok: true, status: 200, data: [] });
  }),
}));

import { processLeadStep, recordLeadContactEvent } from "./send.js";
import { runLeadNurtureCron } from "./cron.js";
import { mintLeadToken, verifyLeadToken, getLeadTokenSecret } from "./tokens.js";
import type { ChannelSender, LeadMessageContext, LeadNurtureConfig, NurtureLead } from "./config.js";

// ── Fixtures ─────────────────────────────────────────────────────────────────
const CFG: LeadNurtureConfig = {
  siteKey: "property",
  sequenceName: "property_contactability",
  steps: [
    {
      key: "instant",
      delayHours: 0,
      buildMessages: (c) => [
        { channel: "email", subject: "Welcome", html: "<p>hi</p>", text: "hi" },
        { channel: "sms", body: `Book: ${c.bookingUrl} ${c.optOutText}` },
      ],
    },
    { key: "d1", delayHours: 24, buildMessages: () => [{ channel: "sms", body: "nudge" }] },
    { key: "breakup", delayHours: 48, buildMessages: () => [{ channel: "email", subject: "bye", html: "<p>b</p>", text: "b" }] },
  ],
};
const CTX: LeadMessageContext = {
  firstName: "Sam",
  bookingUrl: "https://ptp.test/book",
  confirmUrl: "https://ptp.test/confirm/x",
  optOutText: "Reply STOP to opt out.",
  siteUrl: "https://ptp.test",
};
const LEAD: NurtureLead = { id: "lead-1", full_name: "Sam Smith", email: "sam@example.com", phone: "+447700900000", role: "Individual landlord", source: "property" };

function seedState(step = 0, status = "active"): void {
  store.states.push({ lead_id: LEAD.id, sequence: CFG.sequenceName, step, status, next_action_at: new Date(Date.now() - 1000).toISOString() });
}
function okSender(): ChannelSender {
  return { send: vi.fn(async () => ({ id: `prov-${Math.random()}` })) };
}

beforeEach(() => {
  store.reset();
  vi.clearAllMocks();
});

// ── processLeadStep ──────────────────────────────────────────────────────────
describe("processLeadStep: multi-channel send + advance", () => {
  it("sends every channel once and advances to the next step with a future due time", async () => {
    seedState(0);
    const sender = okSender();
    const dispatched = await processLeadStep(LEAD, 0, CFG, sender, CTX);

    expect(dispatched).toBe(2); // email + sms
    expect((sender.send as ReturnType<typeof vi.fn>).mock.calls.length).toBe(2);
    expect(store.sends.filter((s) => s.step === 0)).toHaveLength(2);
    const state = store.states[0];
    expect(state.step).toBe(1);
    expect(state.status).toBe("active");
    expect(new Date(state.next_action_at as string).getTime()).toBeGreaterThan(Date.now());
  });

  it("is idempotent: a duplicate call re-claims nothing and does not double-send or regress", async () => {
    seedState(0);
    const sender = okSender();
    await processLeadStep(LEAD, 0, CFG, sender, CTX); // advances to step 1
    // Simulate an overlapping worker replaying step 0.
    const dispatched2 = await processLeadStep(LEAD, 0, CFG, sender, CTX);
    expect(dispatched2).toBe(0); // both channels were duplicates
    expect((sender.send as ReturnType<typeof vi.fn>).mock.calls.length).toBe(2); // still only 2 real sends
    expect(store.sends).toHaveLength(2);
    expect(store.states[0].step).toBe(1); // no regression
  });

  it("marks claims failed (durable) and retries when the whole step fails", async () => {
    seedState(0);
    let fail = true;
    const flaky: ChannelSender = { send: vi.fn(async () => { if (fail) throw new Error("provider down"); return { id: "ok" }; }) };
    const d1 = await processLeadStep(LEAD, 0, CFG, flaky, CTX);
    expect(d1).toBe(0); // nothing sent
    expect(store.sends).toHaveLength(2); // rows kept, not deleted...
    expect(store.sends.every((s) => s.status === "failed")).toBe(true); // ...and visibly failed
    expect(store.states[0].step).toBe(0); // did NOT advance
    // Recover: provider back up, retry the same step -> takes over the failed rows.
    fail = false;
    const d2 = await processLeadStep(LEAD, 0, CFG, flaky, CTX);
    expect(d2).toBe(2);
    expect(store.sends.every((s) => s.status === "sent")).toBe(true);
    expect(store.states[0].step).toBe(1);
  });

  it("does NOT advance on mixed skip+fail with no successful send (retries the failed channel)", async () => {
    seedState(0);
    // email throws, sms would 'skip' — but our test config step 0 is email+sms.
    // Simulate: email fails, sms skipped -> nothing actually sent -> no advance.
    const mixed: ChannelSender = {
      send: vi.fn(async (m) => (m.channel === "email" ? (() => { throw new Error("smtp down"); })() : { skipped: true })),
    };
    const d = await processLeadStep(LEAD, 0, CFG, mixed, CTX);
    expect(d).toBe(0); // nothing sent
    expect(store.states[0].step).toBe(0); // held for retry, not advanced
  });

  it("dormant sender (skipped) still advances without a real send", async () => {
    seedState(0);
    const dormant: ChannelSender = { send: vi.fn(async () => ({ skipped: true })) };
    const dispatched = await processLeadStep(LEAD, 0, CFG, dormant, CTX);
    expect(dispatched).toBe(0);
    expect(store.sends.every((s) => s.status === "skipped")).toBe(true);
    expect(store.states[0].step).toBe(1); // advanced
  });

  it("marks the lead unreachable at exhaustion (last step chased, no response)", async () => {
    seedState(2); // last index
    await processLeadStep(LEAD, 2, CFG, okSender(), CTX);
    expect(store.states[0].status).toBe("unreachable");
    expect(store.states[0].next_action_at).toBeNull();
  });

  it("advance is status-guarded: a lead already 'contactable' is never reset", async () => {
    seedState(0, "contactable"); // e.g. an inbound reply flipped it mid-flight
    await processLeadStep(LEAD, 0, CFG, okSender(), CTX);
    // sends still happen (already claimed work), but the guarded advance is a no-op.
    expect(store.states[0].status).toBe("contactable");
    expect(store.states[0].step).toBe(0);
  });
});

// ── cron ─────────────────────────────────────────────────────────────────────
describe("runLeadNurtureCron", () => {
  it("does nothing when unarmed", async () => {
    seedState(1);
    store.leads.push(LEAD);
    const sender = okSender();
    const res = await runLeadNurtureCron(CFG, sender, async () => CTX, false);
    expect(res).toEqual({ processed: 0, dispatched: 0 });
    expect(sender.send).not.toHaveBeenCalled();
  });

  it("processes due active leads when armed", async () => {
    seedState(1); // due (next_action_at in the past)
    store.leads.push(LEAD);
    const sender = okSender();
    const res = await runLeadNurtureCron(CFG, sender, async () => CTX, true);
    expect(res.processed).toBe(1);
    expect(res.dispatched).toBe(1); // step 1 has one sms channel
    expect(store.states[0].step).toBe(2);
  });

  it("skips non-active leads (contactable/unreachable drop out of the due scan)", async () => {
    seedState(1, "contactable");
    store.leads.push(LEAD);
    const sender = okSender();
    const res = await runLeadNurtureCron(CFG, sender, async () => CTX, true);
    expect(res.processed).toBe(0);
    expect(sender.send).not.toHaveBeenCalled();
  });
});

// ── empty-messages guard ─────────────────────────────────────────────────────
describe("processLeadStep: empty buildMessages advances state without sending", () => {
  it("advances state and returns 0 when buildMessages returns an empty array", async () => {
    seedState(0);
    // Conditional step that produces no messages for this lead (e.g. VIP-only touch).
    const cfgWithEmpty: LeadNurtureConfig = {
      ...CFG,
      steps: [
        { key: "instant", delayHours: 0, buildMessages: () => [] },
        { key: "d1", delayHours: 24, buildMessages: () => [{ channel: "sms", body: "nudge" }] },
      ],
    };
    const sender = okSender();
    const dispatched = await processLeadStep(LEAD, 0, cfgWithEmpty, sender, CTX);

    expect(dispatched).toBe(0);
    expect((sender.send as ReturnType<typeof vi.fn>).mock.calls.length).toBe(0); // no send attempted
    expect(store.sends).toHaveLength(0); // no claim rows
    expect(store.states[0].step).toBe(1); // state advanced past the empty step
    expect(store.states[0].status).toBe("active");
  });
});

// ── nextActionAt hook ─────────────────────────────────────────────────────────
describe("advanceLeadState: config.nextActionAt overrides the default schedule", () => {
  it("uses nextActionAt return value as next_action_at when the hook is present", async () => {
    seedState(0);
    const FIXED_MS = Date.now() + 7 * 24 * 3_600_000; // one week from now
    const cfgWithHook: LeadNurtureConfig = {
      ...CFG,
      nextActionAt: (_fromMs, _nextStep, _ctx) => FIXED_MS,
    };
    const sender = okSender();
    await processLeadStep(LEAD, 0, cfgWithHook, sender, CTX);

    const expectedIso = new Date(FIXED_MS).toISOString();
    expect(store.states[0].step).toBe(1);
    expect(store.states[0].next_action_at).toBe(expectedIso);
  });

  it("passes nextStep and ctx into the nextActionAt hook", async () => {
    seedState(0);
    let capturedKey: string | undefined;
    let capturedFirstName: string | undefined;
    const cfgWithHook: LeadNurtureConfig = {
      ...CFG,
      nextActionAt: (_fromMs, nextStep, ctx) => {
        capturedKey = nextStep.key;
        capturedFirstName = ctx.firstName;
        return Date.now() + nextStep.delayHours * 3_600_000;
      },
    };
    await processLeadStep(LEAD, 0, cfgWithHook, okSender(), CTX);

    expect(capturedKey).toBe("d1"); // next step after index 0
    expect(capturedFirstName).toBe(CTX.firstName);
  });

  it("uses the default delayHours schedule when nextActionAt is absent", async () => {
    seedState(0);
    const before = Date.now();
    await processLeadStep(LEAD, 0, CFG, okSender(), CTX); // CFG has no nextActionAt
    const after = Date.now();

    const nextStep = CFG.steps[1]!;
    const recordedAt = new Date(store.states[0].next_action_at as string).getTime();
    const minExpected = before + nextStep.delayHours * 3_600_000;
    const maxExpected = after + nextStep.delayHours * 3_600_000;
    expect(recordedAt).toBeGreaterThanOrEqual(minExpected);
    expect(recordedAt).toBeLessThanOrEqual(maxExpected);
  });
});

// ── recordLeadContactEvent ───────────────────────────────────────────────────
describe("recordLeadContactEvent", () => {
  it("writes an event row", async () => {
    await recordLeadContactEvent("lead-9", "replied", "sms", { body: "YES" });
    expect(store.events).toHaveLength(1);
    expect(store.events[0]).toMatchObject({ lead_id: "lead-9", event_type: "replied", channel: "sms" });
  });
});

// ── tokens ───────────────────────────────────────────────────────────────────
describe("lead tokens", () => {
  const SECRET = "lead-token-secret-that-is-at-least-32-chars";
  function withSecret(fn: () => void) {
    const prev = process.env.LEAD_NURTURE_TOKEN_SECRET;
    process.env.LEAD_NURTURE_TOKEN_SECRET = SECRET;
    try { fn(); } finally { if (prev === undefined) delete process.env.LEAD_NURTURE_TOKEN_SECRET; else process.env.LEAD_NURTURE_TOKEN_SECRET = prev; }
  }

  it("round-trips confirm intent and returns the lead id", () => {
    withSecret(() => {
      const t = mintLeadToken("lead-abc", "confirm");
      const r = verifyLeadToken(t, "confirm");
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.leadId).toBe("lead-abc");
    });
  });

  it("rejects wrong intent", () => {
    withSecret(() => {
      const t = mintLeadToken("lead-abc", "optout");
      const r = verifyLeadToken(t, "confirm");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toBe("wrong-intent");
    });
  });

  it("rejects a tampered signature", () => {
    withSecret(() => {
      const t = mintLeadToken("lead-abc", "confirm");
      const [body] = t.split(".");
      const fake = Buffer.alloc(32).toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      const r = verifyLeadToken(`${body}.${fake}`, "confirm");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.reason).toBe("bad-signature");
    });
  });

  it("throws when the secret is missing or short", () => {
    const prev = process.env.LEAD_NURTURE_TOKEN_SECRET;
    delete process.env.LEAD_NURTURE_TOKEN_SECRET;
    expect(() => getLeadTokenSecret()).toThrow("LEAD_NURTURE_TOKEN_SECRET");
    if (prev !== undefined) process.env.LEAD_NURTURE_TOKEN_SECRET = prev;
  });
});
