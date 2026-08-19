/**
 * Tests for the Telegram lead-ops webhook route
 * (src/app/api/telegram/webhook/route.ts):
 *
 *   - auth: secret unset -> 503, wrong header -> 401, correct -> 200
 *   - chat allowlist: a message from an unrecognised chat is dropped silently
 *   - /pause: writes lead_nurture_control.bot_paused=true (merge-upsert)
 *   - /month: gross/credits/unreleased summary from lead_offers
 *   - callbacks: rel (release, idempotent), ts (owner tier pick), bin
 *     (guarded status flip), br (claim-for-them, one release email),
 *     and a garbage callback_data that answers "expired" without crashing
 *
 * Real transport: @/lib/telegram is NOT mocked, so every assertion runs
 * through its actual fetch() call against a stubbed global.fetch. Mocking
 * mirrors the style of lead-offers.test.ts (in-memory db + matches()
 * PostgREST filter interpreter), with named mock-fn consts (nurture-control.test.ts
 * style) so calls can be inspected directly without type casts.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── In-memory DB ─────────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

const db = {
  leads: [] as Row[],
  lead_buyers: [] as Row[],
  lead_offers: [] as Row[],
  lead_value_scores: [] as Row[],
  lead_nurture_state: [] as Row[],
  lead_contact_events: [] as Row[],
  lead_supply: [] as Row[],
  lead_nurture_control: [] as Row[],
  reset() {
    this.leads = [];
    this.lead_buyers = [];
    this.lead_offers = [];
    this.lead_value_scores = [];
    this.lead_nurture_state = [];
    this.lead_contact_events = [];
    this.lead_supply = [];
    this.lead_nurture_control = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (k === "and") {
      // PostgREST and=(col.op.val,col.op.val,...) group -- only gte/lt needed
      // by the /month command's date-range filter.
      const inner = raw.replace(/^\(|\)$/g, "");
      for (const clause of inner.split(",")) {
        const m = clause.match(/^([^.]+)\.(gte|lt)\.(.+)$/);
        if (!m) continue;
        const [, col, op, val] = m;
        const cell = String(row[col] ?? "");
        if (op === "gte" && !(cell >= val)) return false;
        if (op === "lt" && !(cell < val)) return false;
      }
      continue;
    }
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    } else if (raw.startsWith("in.")) {
      const set = raw.slice(3).replace(/^\(|\)$/g, "").split(",");
      if (!set.includes(String(row[k]))) return false;
    } else if (raw.startsWith("lt.")) {
      if (!(String(row[k]) < raw.slice(3))) return false;
    } else if (raw.startsWith("gte.")) {
      if (!(String(row[k]) >= raw.slice(4))) return false;
    } else if (raw === "not.is.null") {
      if (row[k] === null || row[k] === undefined || row[k] === "") return false;
    } else if (raw === "is.null") {
      if (!(row[k] === null || row[k] === undefined || row[k] === "")) return false;
    } else if (raw.startsWith("cs.")) {
      const want = raw.slice(3).replace(/^\{|\}$/g, "");
      if (!Array.isArray(row[k]) || !(row[k] as unknown[]).map(String).includes(want)) return false;
    }
  }
  return true;
}

let idCounter = 0;

const mockAdminSelect = vi.fn((table: string, params: Record<string, string>) => {
  const tableData = (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params));
  return Promise.resolve({ ok: true, status: 200, data: tableData });
});

// Mirrors the claim_lead_offer() SQL function (migration 20260819000002):
// shared cap, exclusive lock, test buyers exempt. Keep in sync with the
// twin simulation in lead-offers.test.ts.
function simulateClaimRpc(args: {
  p_offer_id: string;
  p_cap: number;
  p_exclusive: boolean;
  p_exclusive_multiplier: number;
}): Row[] {
  const offer = db.lead_offers.find((o) => o.id === args.p_offer_id);
  if (!offer) return [{ outcome: "error", charged_gbp: 0 }];
  const price = offer.price_gbp as number;
  if (offer.status === "claimed") return [{ outcome: "not-offered", charged_gbp: price }];
  if (offer.status === "lost") return [{ outcome: "lost", charged_gbp: price }];
  if (offer.status !== "offered" || String(offer.expires_at) < new Date().toISOString()) {
    return [{ outcome: "expired", charged_gbp: price }];
  }
  const siblings = db.lead_offers.filter((o) => o.lead_id === offer.lead_id);
  const claimed = siblings.filter((o) => o.status === "claimed");
  if (claimed.some((o) => o.exclusive)) return [{ outcome: "lost", charged_gbp: price }];
  const isTestBuyer = (bid: unknown) =>
    Boolean(db.lead_buyers.find((b) => b.id === bid)?.is_test);
  const realClaims = claimed.filter((o) => !isTestBuyer(o.buyer_id)).length;
  if (args.p_exclusive) {
    if (realClaims > 0) return [{ outcome: "exclusive-unavailable", charged_gbp: price }];
    const charged = price * args.p_exclusive_multiplier;
    Object.assign(offer, {
      status: "claimed",
      claimed_at: new Date().toISOString(),
      exclusive: true,
      price_gbp: charged,
    });
    siblings.filter((o) => o.status === "offered").forEach((o) => (o.status = "lost"));
    return [{ outcome: "claimed", charged_gbp: charged }];
  }
  if (realClaims >= args.p_cap) return [{ outcome: "allocated", charged_gbp: price }];
  Object.assign(offer, { status: "claimed", claimed_at: new Date().toISOString() });
  const after = siblings.filter(
    (o) => o.status === "claimed" && !isTestBuyer(o.buyer_id),
  ).length;
  if (after >= args.p_cap) {
    siblings.filter((o) => o.status === "offered").forEach((o) => (o.status = "lost"));
  }
  return [{ outcome: "claimed", charged_gbp: price }];
}

const mockAdminInsert = vi.fn(
  (table: string, rows: Row | Row[], opts?: { onConflict?: string; ignoreDuplicates?: boolean }) => {
    if (table === "rpc/claim_lead_offer") {
      return Promise.resolve({ ok: true, status: 200, data: simulateClaimRpc(rows as never) });
    }
    const tableData = db[table as keyof typeof db] as Row[];
    const list = Array.isArray(rows) ? rows : [rows];
    const inserted: Row[] = [];
    for (const row of list) {
      let existing: Row | undefined;
      if (opts?.onConflict) {
        const conflictKeys = opts.onConflict.split(",").map((k) => k.trim());
        existing = tableData.find((r) => conflictKeys.every((k) => r[k] === row[k]));
      }
      if (existing) {
        if (opts?.ignoreDuplicates) continue; // no-op: no row in the returned data
        // Merge-upsert: setBotPaused's onConflict-without-ignoreDuplicates path
        // (and the nurture-control heartbeat writers) expect PostgREST upsert
        // semantics, i.e. an existing row is updated in place, not duplicated.
        Object.assign(existing, row);
        inserted.push(existing);
        continue;
      }
      const defaults: Row = table === "lead_offers" ? { status: "offered" } : {};
      const newRow: Row = { id: `row-${++idCounter}`, token: `tok${++idCounter}abcdef1234567890`, ...defaults, ...row };
      tableData.push(newRow);
      inserted.push(newRow);
    }
    return Promise.resolve({ ok: true, status: 201, data: inserted });
  },
);

const mockAdminUpdate = vi.fn((table: string, params: Record<string, string>, patch: Row) => {
  const tableData = db[table as keyof typeof db] as Row[];
  const hits = tableData.filter((r) => matches(r, params));
  hits.forEach((r) => Object.assign(r, patch));
  return Promise.resolve({ ok: true, status: 200, data: hits });
});

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => (mockAdminSelect as (...a: unknown[]) => unknown)(...args),
  adminInsert: (...args: unknown[]) => (mockAdminInsert as (...a: unknown[]) => unknown)(...args),
  adminUpdate: (...args: unknown[]) => (mockAdminUpdate as (...a: unknown[]) => unknown)(...args),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

// ── Resend mock ──────────────────────────────────────────────────────────────

const sentEmails: Array<{ from: string; to: string; subject: string; html?: string; text?: string }> = [];
vi.mock("@/lib/resend", () => ({
  getResend: () => ({
    emails: {
      send: vi.fn((payload: { from: string; to: string; subject: string; html?: string; text?: string }) => {
        sentEmails.push(payload);
        return Promise.resolve({ data: { id: `email-${sentEmails.length}` }, error: null });
      }),
    },
  }),
  getFromAddress: () => "JM Lead Notification <leads@test.invalid>",
}));

// ── Contact-event mock ───────────────────────────────────────────────────────

const contactEvents: Array<{ leadId: string; type: string }> = [];
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn((leadId: string, type: string) => {
    contactEvents.push({ leadId, type });
    return Promise.resolve();
  }),
}));

// ── AI mocks (unused paths in these tests, kept safe per the module contract) ─

vi.mock("@/lib/ai/anthropic", () => ({
  anthropicConfigured: () => false,
  generateJson: () => Promise.resolve(null),
}));

vi.mock("ai", () => ({
  generateObject: () => Promise.resolve(null),
}));

// @/lib/telegram is deliberately NOT mocked: these tests exercise its real
// fetch() against a stubbed global.fetch.

import { NextRequest } from "next/server";
import { POST } from "@/app/api/telegram/webhook/route";

// ── global.fetch stub (Telegram Bot API transport) ──────────────────────────

type FetchCall = { url: string; body: Record<string, unknown> };
const fetchCalls: FetchCall[] = [];

beforeEach(() => {
  fetchCalls.length = 0;
  global.fetch = vi.fn((url: unknown, init?: RequestInit) => {
    const body = init?.body ? (JSON.parse(init.body as string) as Record<string, unknown>) : {};
    fetchCalls.push({ url: String(url), body });
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ ok: true }),
      text: () => Promise.resolve(""),
    } as unknown as Response);
  }) as unknown as typeof fetch;
});

function callsTo(method: string): FetchCall[] {
  return fetchCalls.filter((c) => c.url.endsWith(`/${method}`));
}

// ── Env snapshot/restore ─────────────────────────────────────────────────────

const OLD_ENV = process.env;

beforeEach(() => {
  process.env = { ...OLD_ENV };
  process.env.TELEGRAM_BOT_TOKEN = "t0ken";
  process.env.TELEGRAM_CHAT_ID = "42";
  process.env.TELEGRAM_WEBHOOK_SECRET = "s3cret";
  process.env.LEAD_BOT_ENABLED = "1";
  process.env.LEAD_OFFER_PRICES = "essential:15,standard:40,advisory:85";
  db.reset();
  sentEmails.length = 0;
  contactEvents.length = 0;
  idCounter = 0;
  mockAdminSelect.mockClear();
  mockAdminInsert.mockClear();
  mockAdminUpdate.mockClear();
});

afterEach(() => {
  process.env = OLD_ENV;
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeReq(update: unknown, secret = "s3cret"): NextRequest {
  return new NextRequest("http://localhost/api/telegram/webhook", {
    method: "POST",
    headers: new Headers({ "x-telegram-bot-api-secret-token": secret }),
    body: JSON.stringify(update),
  });
}

function msgReq(text: string, chatId = 42): NextRequest {
  return makeReq({ message: { chat: { id: chatId }, text } });
}

function cbReq(data: string, messageId = 5, chatId = 42): NextRequest {
  return makeReq({
    callback_query: { id: "cbq1", data, message: { message_id: messageId, chat: { id: chatId } } },
  });
}

// UUID-shaped ids: the route's callback_data grammar requires them.
const LEAD_UUID = "11111111-1111-4111-8111-111111111111";
const OFFER_UUID = "33333333-3333-4333-8333-333333333333";
const OFFER_UUID_2 = "44444444-4444-4444-8444-444444444444";

// ── Auth ─────────────────────────────────────────────────────────────────────

describe("auth", () => {
  it("503 when TELEGRAM_WEBHOOK_SECRET is unset", async () => {
    delete process.env.TELEGRAM_WEBHOOK_SECRET;
    const res = await POST(msgReq("/status"));
    expect(res.status).toBe(503);
  });

  it("401 on a wrong secret header", async () => {
    const res = await POST(makeReq({ message: { chat: { id: 42 }, text: "/status" } }, "wrong"));
    expect(res.status).toBe(401);
  });

  it("200 with the correct secret", async () => {
    const res = await POST(msgReq("/status"));
    expect(res.status).toBe(200);
  });
});

// ── Chat allowlist ───────────────────────────────────────────────────────────

describe("chat allowlist", () => {
  it("drops a message from a non-allowlisted chat: 200, no outbound telegram fetch", async () => {
    const res = await POST(msgReq("/status", 99));
    expect(res.status).toBe(200);
    expect(fetchCalls).toHaveLength(0);
  });
});

// ── /pause ───────────────────────────────────────────────────────────────────

describe("/pause", () => {
  it("upserts lead_nurture_control.bot_paused=true via merge-update", async () => {
    db.lead_nurture_control.push({ id: 1, bot_paused: false });
    const res = await POST(msgReq("/pause"));
    expect(res.status).toBe(200);
    const row = db.lead_nurture_control.find((r) => r.id === 1);
    expect(row?.bot_paused).toBe(true);
  });
});

// ── /month ───────────────────────────────────────────────────────────────────

describe("/month", () => {
  it("reports gross (released), unreleased count and credits for the given month", async () => {
    db.lead_offers.push(
      {
        id: "o1",
        buyer_id: "b1",
        status: "claimed",
        price_gbp: 40,
        released_at: "2026-08-05T10:00:00.000Z",
        claimed_at: "2026-08-05T09:00:00.000Z",
      },
      {
        id: "o2",
        buyer_id: "b1",
        status: "claimed",
        price_gbp: 85,
        released_at: null,
        claimed_at: "2026-08-06T09:00:00.000Z",
      },
      {
        id: "o3",
        buyer_id: "b1",
        status: "credited",
        price_gbp: 15,
        released_at: null,
        claimed_at: "2026-08-07T09:00:00.000Z",
      },
    );
    const res = await POST(msgReq("/month 2026-08"));
    expect(res.status).toBe(200);
    const call = callsTo("sendMessage")[0];
    expect(call).toBeDefined();
    const text = call.body.text as string;
    expect(text).toContain("£40");
    expect(text).toContain("1 claimed offer(s) NOT released");
    expect(text).toContain("-£15");
  });
});

// ── Callback: rel (release a claimed offer) ─────────────────────────────────

describe("callback: rel", () => {
  function seedReleaseFixture() {
    db.lead_buyers.push({ id: "buyer-1", email: "firm@buyers.test", firm_name: "Firm One" });
    db.leads.push({ id: LEAD_UUID, source: "dentists", full_name: "Jane Doe" });
    db.lead_offers.push({
      id: OFFER_UUID,
      lead_id: LEAD_UUID,
      buyer_id: "buyer-1",
      status: "claimed",
      released_at: null,
      price_gbp: 40,
    });
  }

  it("releases once; a second identical tap releases nothing more and toasts 'already released'", async () => {
    seedReleaseFixture();

    const res1 = await POST(cbReq(`rel:${OFFER_UUID}`));
    expect(res1.status).toBe(200);
    expect(sentEmails.filter((e) => e.subject.startsWith("Lead released:"))).toHaveLength(1);
    const offerRow = db.lead_offers.find((o) => o.id === OFFER_UUID);
    expect(offerRow?.released_at).toBeTruthy();

    const res2 = await POST(cbReq(`rel:${OFFER_UUID}`));
    expect(res2.status).toBe(200);
    expect(sentEmails.filter((e) => e.subject.startsWith("Lead released:"))).toHaveLength(1); // unchanged

    const toasts = callsTo("answerCallbackQuery");
    expect(toasts[toasts.length - 1].body.text).toContain("Already released");
  });
});

// ── Callback: ts (owner tier pick) ──────────────────────────────────────────

describe("callback: ts (owner tier pick)", () => {
  it("ts:a sets case_tier=advisory, scored_by=owner, and edits the reply markup", async () => {
    db.leads.push({ id: LEAD_UUID, source: "dentists" });
    db.lead_value_scores.push({ id: "score-1", lead_id: LEAD_UUID, case_tier: null });

    const res = await POST(cbReq(`ts:a:${LEAD_UUID}`));
    expect(res.status).toBe(200);

    const row = db.lead_value_scores.find((r) => r.lead_id === LEAD_UUID);
    expect(row?.case_tier).toBe("advisory");
    expect(row?.scored_by).toBe("owner");

    expect(callsTo("editMessageReplyMarkup")).toHaveLength(1);
  });
});

// ── Callback: bin ────────────────────────────────────────────────────────────

describe("callback: bin", () => {
  it("no-ops when the lead has already moved on (status forwarded)", async () => {
    db.leads.push({ id: LEAD_UUID, status: "forwarded" });
    const res = await POST(cbReq(`bin:${LEAD_UUID}`));
    expect(res.status).toBe(200);
    expect(db.leads.find((l) => l.id === LEAD_UUID)?.status).toBe("forwarded");
    const toasts = callsTo("answerCallbackQuery");
    expect(toasts[toasts.length - 1].body.text).toContain("moved on");
  });

  it("bins a lead that is still contactable", async () => {
    db.leads.push({ id: LEAD_UUID, status: "contactable" });
    const res = await POST(cbReq(`bin:${LEAD_UUID}`));
    expect(res.status).toBe(200);
    expect(db.leads.find((l) => l.id === LEAD_UUID)?.status).toBe("closed");
  });
});

// ── Callback: br (claim-for-them) ───────────────────────────────────────────

describe("callback: br (claim-for-them)", () => {
  it("claims AND releases in one tap, stops nurture, sends exactly one release email", async () => {
    db.lead_buyers.push({
      id: "buyer-2",
      email: "firm2@buyers.test",
      firm_name: "Firm Two",
      status: "active",
      dsa_signed_at: "2026-08-01T00:00:00.000Z",
    });
    db.leads.push({
      id: LEAD_UUID,
      source: "dentists",
      full_name: "Jane Doe",
      consent_text: "will share your details with our specialist partner network",
    });
    db.lead_nurture_state.push({ lead_id: LEAD_UUID, status: "active" });
    db.lead_offers.push({
      id: OFFER_UUID_2,
      lead_id: LEAD_UUID,
      buyer_id: "buyer-2",
      status: "offered",
      released_at: null,
      expires_at: new Date(Date.now() + 3_600_000).toISOString(),
      price_gbp: 85,
    });

    const res = await POST(cbReq(`br:${OFFER_UUID_2}`));
    expect(res.status).toBe(200);

    const offerRow = db.lead_offers.find((o) => o.id === OFFER_UUID_2);
    expect(offerRow?.status).toBe("claimed");
    expect(offerRow?.released_at).toBeTruthy();

    expect(sentEmails.filter((e) => e.subject.startsWith("Lead released:"))).toHaveLength(1);

    const nurtureRow = db.lead_nurture_state.find((r) => r.lead_id === LEAD_UUID);
    expect(nurtureRow?.status).toBe("stopped");
  });
});

// ── Callback: garbage data ───────────────────────────────────────────────────

describe("callback: unknown/garbage data", () => {
  it("answers with an expired toast and does not crash", async () => {
    const res = await POST(cbReq("xx:yy"));
    expect(res.status).toBe(200);
    const toasts = callsTo("answerCallbackQuery");
    expect(toasts[toasts.length - 1].body.text).toContain("expired");
  });
});
