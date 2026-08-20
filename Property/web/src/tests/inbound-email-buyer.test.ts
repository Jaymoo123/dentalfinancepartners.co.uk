/**
 * Tests for the inbound-email buyer-reply defect fixes (2026-08-20):
 *   A1  claim hold is fail-open: held ONLY when armed + unpaused + auto off +
 *       Telegram prompt delivered; every other case releases instantly.
 *   A2  a subject ref matching no open offer never falls back to the buyer's
 *       one other open offer (wrong-lead sale); claimed-by-this-buyer refs get
 *       the "already have" ack, the rest go to the owner's ambiguous branch.
 *   A3  buyer email match is case-insensitive; a ref-carrying reply from an
 *       unknown sender notifies the owner (Telegram, then email) with no claim.
 *   A4  duplicate YES ('not-offered' on a row this buyer already claimed) acks
 *       "You already have this lead" instead of "no longer available".
 *   A6  the operator "Lead replied" email notes when the lead was released.
 *
 * Same in-memory-db idiom as inbound-email.test.ts; Resend + Telegram are
 * mocked so nothing leaves the process.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Shared in-memory store ────────────────────────────────────────────────────

type Row = Record<string, unknown>;
const db = {
  leads: [] as Row[],
  lead_buyers: [] as Row[],
  lead_offers: [] as Row[],
  lead_contact_events: [] as Row[],
  lead_nurture_state: [] as Row[],
  lead_verification: [] as Row[],
  lead_supply: [] as Row[],
  reset() {
    this.leads = [];
    this.lead_buyers = [];
    this.lead_offers = [];
    this.lead_contact_events = [];
    this.lead_nurture_state = [];
    this.lead_verification = [];
    this.lead_supply = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    } else if (raw.startsWith("ilike.")) {
      if (String(row[k]).toLowerCase() !== raw.slice(6).toLowerCase()) return false;
    } else if (raw.startsWith("in.")) {
      const set = raw.slice(3).replace(/^\(|\)$/g, "").split(",");
      if (!set.includes(String(row[k]))) return false;
    } else if (raw === "is.null") {
      if (!(row[k] === null || row[k] === undefined)) return false;
    } else if (raw === "not.is.null") {
      if (row[k] === null || row[k] === undefined) return false;
    }
  }
  return true;
}

// ── Mocks (hoisted by Vitest) ─────────────────────────────────────────────────

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((table: string, params: Record<string, string>) =>
    Promise.resolve({
      ok: true,
      status: 200,
      data: (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params)),
    }),
  ),
  adminInsert: vi.fn((table: string, rows: Row) => {
    (db[table as keyof typeof db] as Row[]).push(rows);
    return Promise.resolve({ ok: true, status: 201, data: [rows] });
  }),
  adminUpdate: vi.fn((table: string, params: Record<string, string>, patch: Row) => {
    const hits = (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params));
    hits.forEach((r) => Object.assign(r, patch));
    return Promise.resolve({ ok: true, status: 200, data: hits });
  }),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

vi.mock("@accounting-network/web-shared/nurture/webhook", () => ({
  verifyResendWebhook: vi.fn(() => true),
}));

vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn(async () => {}),
}));

vi.mock("@/lib/ai/anthropic", () => ({
  classify: vi.fn(async () => null),
  anthropicConfigured: () => true,
}));

vi.mock("@/lib/ai", () => ({
  redactEnquiry: vi.fn(async () => null),
  verifyNoIdentifiers: vi.fn(async () => true),
}));

vi.mock("@/lib/leads/inbound-content", () => ({
  fetchReceivedEmailText: vi.fn(async () => ""),
}));

vi.mock("@/lib/leads/verify", () => ({
  verifyLead: vi.fn(),
}));

const handoffSpy = vi.fn(async () => ({ sent: false, to: "ops@x", skipped: "test" as const }));
vi.mock("@/lib/leads/handoff", () => ({
  sendContactableHandoff: (...a: unknown[]) => handoffSpy(...(a as [])),
}));

// Resend spy: captures every email the route or reply-ack tries to send.
const resendSendSpy = vi.fn(async (_opts?: Record<string, unknown>) => ({
  data: { id: "em_1" },
  error: null,
}));
vi.mock("@/lib/resend", () => ({
  getResend: () => ({ emails: { send: resendSendSpy } }),
  getFromAddress: () => "Property Tax Partners <ops@x>",
}));

// Telegram transport: armed state + send result controllable per test.
let botArmedState = true;
let telegramSendResult = true;
const sendTelegramSpy = vi.fn(async (_text: string) => telegramSendResult);
vi.mock("@/lib/telegram", () => ({
  botArmed: () => botArmedState,
  sendTelegram: (text: string) => sendTelegramSpy(text),
}));

let botPausedState = false;
vi.mock("@/lib/leads/nurture-control", () => ({
  isBotPaused: vi.fn(async () => botPausedState),
}));

let claimHeldResult = false;
const notifyClaimHeldSpy = vi.fn(async (..._args: unknown[]) => claimHeldResult);
const notifyBuyerReplySpy = vi.fn(async (..._args: unknown[]) => true);
vi.mock("@/lib/leads/bot-notify", () => ({
  notifyClaimHeld: (...a: unknown[]) => notifyClaimHeldSpy(...a),
  notifyBuyerReply: (...a: unknown[]) => notifyBuyerReplySpy(...a),
  notifySuppliedLeadResponded: vi.fn(async () => true),
}));

// claimOffer/releaseClaimedOffer: the claim transition itself is covered by
// lead-offers.test.ts; here we only test the route's decisions around it.
type ClaimResult = {
  outcome: string;
  offer?: { id: string; lead_id: string; buyer_id: string; price_gbp: number };
};
let claimImpl: (offerId: string) => Promise<ClaimResult> = async (offerId) => {
  const row = db.lead_offers.find((o) => o.id === offerId) as Row;
  Object.assign(row, { status: "claimed" });
  return {
    outcome: "claimed",
    offer: {
      id: String(row.id),
      lead_id: String(row.lead_id),
      buyer_id: String(row.buyer_id),
      price_gbp: Number(row.price_gbp),
    },
  };
};
const claimOfferSpy = vi.fn((offerId: string) => claimImpl(offerId));
const releaseSpy = vi.fn(async (_offerId: string) => ({ already: false, released: true }));
vi.mock("@/lib/leads/offer-release", () => ({
  claimOffer: (offerId: string) => claimOfferSpy(offerId),
  releaseClaimedOffer: (offerId: string) => releaseSpy(offerId),
  offerFromAddress: () => "Ashfield Partner Network <leads@x>",
  offerReplyTo: () => "partners@inbound.x",
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────

import { POST } from "@/app/api/leads/inbound/email/route";
import { notifyOperatorOfReply } from "@/lib/leads/reply-ack";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const LEAD_A = "aaaa1111-0000-0000-0000-000000000001";
const LEAD_B = "deadbeef-0000-0000-0000-000000000002";
const BUYER_EMAIL = "firm@buyers.test";
const SUBJECT_A = "Re: New Property enquiry available, Advisory tier, £85 [L-aaaa1111]";
const SUBJECT_B = "Re: New Property enquiry available, Advisory tier, £85 [L-deadbeef]";

function makeReq(payload: Record<string, unknown>): Request {
  return new Request("http://localhost/api/leads/inbound/email", {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "svix-id": "msg_test",
      "svix-timestamp": String(Math.floor(Date.now() / 1000)),
      "svix-signature": "v1,fake",
    }),
    body: JSON.stringify(payload),
  });
}

function buyerReply(opts: { from?: string; subject?: string; text?: string }) {
  return {
    type: "email.received",
    data: {
      from: opts.from ?? BUYER_EMAIL,
      to: ["partners@inbound.propertytaxpartners.co.uk"],
      subject: opts.subject ?? SUBJECT_A,
      text: opts.text ?? "YES",
    },
  };
}

function seedBuyer(over: Row = {}): Row {
  const buyer: Row = {
    id: "buyer-1",
    firm_name: "Firm A",
    email: BUYER_EMAIL,
    status: "active",
    ...over,
  };
  db.lead_buyers.push(buyer);
  return buyer;
}

function seedOffer(over: Row = {}): Row {
  const offer: Row = {
    id: "offer-1",
    lead_id: LEAD_A,
    buyer_id: "buyer-1",
    status: "offered",
    price_gbp: 85,
    teaser: { tier: "advisory" },
    created_at: "2026-08-20T00:00:00.000Z",
    released_at: null,
    ...over,
  };
  db.lead_offers.push(offer);
  return offer;
}

function ackEmails(subject: string) {
  return resendSendSpy.mock.calls
    .map((c) => c[0] as Record<string, unknown>)
    .filter((p) => p && p.subject === subject);
}

beforeEach(() => {
  db.reset();
  vi.clearAllMocks();
  botArmedState = true;
  botPausedState = false;
  telegramSendResult = true;
  claimHeldResult = false;
  claimImpl = async (offerId) => {
    const row = db.lead_offers.find((o) => o.id === offerId) as Row;
    Object.assign(row, { status: "claimed" });
    return {
      outcome: "claimed",
      offer: {
        id: String(row.id),
        lead_id: String(row.lead_id),
        buyer_id: String(row.buyer_id),
        price_gbp: Number(row.price_gbp),
      },
    };
  };
  process.env.LEAD_RESEND_INBOUND_SECRET = "whsec_dGVzdA==";
  process.env.RESEND_API_KEY = "re_test";
  delete process.env.LEAD_RELEASE_AUTO;
});

// ── A1: hold is fail-open, every doubt releases instantly ────────────────────

describe("A1 — claimed offer hold vs instant release", () => {
  beforeEach(() => {
    seedBuyer();
    seedOffer();
  });

  it("Telegram delivery fails -> instant release (no silent hold)", async () => {
    claimHeldResult = false; // notifyClaimHeld could not reach Telegram

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(buyerReply({})) as any);

    expect(res.status).toBe(200);
    expect(notifyClaimHeldSpy).toHaveBeenCalledTimes(1);
    expect(releaseSpy).toHaveBeenCalledWith("offer-1");
  });

  it("bot paused -> instant release, no Telegram prompt", async () => {
    botPausedState = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    expect(notifyClaimHeldSpy).not.toHaveBeenCalled();
    expect(releaseSpy).toHaveBeenCalledWith("offer-1");
  });

  it("bot unarmed -> instant release, no Telegram prompt", async () => {
    botArmedState = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    expect(notifyClaimHeldSpy).not.toHaveBeenCalled();
    expect(releaseSpy).toHaveBeenCalledWith("offer-1");
  });

  it("LEAD_RELEASE_AUTO=true -> instant release ('true' accepted like '1')", async () => {
    process.env.LEAD_RELEASE_AUTO = "true";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    expect(notifyClaimHeldSpy).not.toHaveBeenCalled();
    expect(releaseSpy).toHaveBeenCalledWith("offer-1");
  });

  it("armed + prompt delivered -> held, NOT released", async () => {
    claimHeldResult = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    expect(notifyClaimHeldSpy).toHaveBeenCalledTimes(1);
    expect(releaseSpy).not.toHaveBeenCalled();
  });
});

// ── A2: stale subject ref never claims the buyer's other open offer ──────────

describe("A2 — unmatched subject ref", () => {
  it("stale ref + one other open offer -> no claim, owner decides with a note", async () => {
    seedBuyer();
    seedOffer(); // open offer on LEAD_A; reply references LEAD_B

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(makeReq(buyerReply({ subject: SUBJECT_B })) as any);

    expect(res.status).toBe(200);
    expect(claimOfferSpy).not.toHaveBeenCalled();
    expect(releaseSpy).not.toHaveBeenCalled();
    expect(notifyBuyerReplySpy).toHaveBeenCalledTimes(1);
    const subjectArg = notifyBuyerReplySpy.mock.calls[0][3] as string;
    expect(subjectArg).toContain("no longer open");
  });

  it("ref matches an offer this buyer already claimed -> 'already have' ack, no claim", async () => {
    seedBuyer();
    seedOffer(); // unrelated open offer on LEAD_A
    seedOffer({ id: "offer-9", lead_id: LEAD_B, status: "claimed", released_at: null });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({ subject: SUBJECT_B })) as any);

    expect(claimOfferSpy).not.toHaveBeenCalled();
    expect(notifyBuyerReplySpy).not.toHaveBeenCalled();
    const acks = ackEmails("You already have this lead");
    expect(acks).toHaveLength(1);
    expect(String(acks[0].text)).toContain("follow shortly"); // released_at null
  });
});

// ── A3: case-insensitive buyer match + unknown-sender-with-ref alert ─────────

describe("A3 — buyer resolution", () => {
  it("mixed-case stored buyer email still matches the lowercased sender", async () => {
    seedBuyer({ email: "Firm@Buyers.Test" });
    seedOffer();
    claimHeldResult = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({ from: BUYER_EMAIL })) as any);

    expect(claimOfferSpy).toHaveBeenCalledWith("offer-1");
  });

  it("unknown sender with a subject ref -> owner told via Telegram, no claim, no body content", async () => {
    // No buyers seeded at all.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await POST(
      makeReq(
        buyerReply({
          from: "random@stranger.test",
          subject: SUBJECT_A,
          text: "The enquirer's number is 07700 900123",
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any,
    );

    expect(res.status).toBe(200);
    expect(claimOfferSpy).not.toHaveBeenCalled();
    expect(sendTelegramSpy).toHaveBeenCalledTimes(1);
    const text = sendTelegramSpy.mock.calls[0][0] as string;
    expect(text).toContain("random@stranger.test");
    expect(text).toContain("[L-aaaa1111]");
    expect(text).not.toContain("07700"); // never the body
  });

  it("unknown sender with ref + Telegram down -> owner email fallback", async () => {
    telegramSendResult = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({ from: "random@stranger.test", subject: SUBJECT_A })) as any);

    const fallback = ackEmails("Unmatched buyer reply: random@stranger.test");
    expect(fallback).toHaveLength(1);
    expect(String(fallback[0].text)).toContain("random@stranger.test");
  });

  it("unknown sender WITHOUT a ref stays silent (unchanged enquirer path)", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({ from: "random@stranger.test", subject: "Hello" })) as any);

    expect(sendTelegramSpy).not.toHaveBeenCalled();
    expect(resendSendSpy).not.toHaveBeenCalled();
  });
});

// ── A4: duplicate YES on an offer this buyer already claimed ─────────────────

describe("A4 — 'not-offered' on the buyer's own claim", () => {
  it("duplicate YES -> 'You already have this lead' ack, no dup claim/release", async () => {
    seedBuyer();
    seedOffer(); // offered at load time; RPC finds it already claimed (race)
    claimImpl = async (offerId) => {
      const row = db.lead_offers.find((o) => o.id === offerId) as Row;
      Object.assign(row, { status: "claimed", released_at: null }); // same buyer won it
      return { outcome: "not-offered" };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    expect(claimOfferSpy).toHaveBeenCalledTimes(1);
    expect(releaseSpy).not.toHaveBeenCalled();
    const acks = ackEmails("You already have this lead");
    expect(acks).toHaveLength(1);
    expect(String(acks[0].text)).toContain("follow shortly");
    expect(ackEmails("That lead is no longer available")).toHaveLength(0);
  });

  it("released_at set -> ack says the details were already sent", async () => {
    seedBuyer();
    seedOffer();
    claimImpl = async (offerId) => {
      const row = db.lead_offers.find((o) => o.id === offerId) as Row;
      Object.assign(row, { status: "claimed", released_at: "2026-08-20T10:00:00.000Z" });
      return { outcome: "not-offered" };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    const acks = ackEmails("You already have this lead");
    expect(acks).toHaveLength(1);
    expect(String(acks[0].text)).toContain("were sent to you");
  });

  it("claimed by ANOTHER buyer -> unchanged 'no longer available' ack", async () => {
    seedBuyer();
    seedOffer();
    claimImpl = async (offerId) => {
      const row = db.lead_offers.find((o) => o.id === offerId) as Row;
      Object.assign(row, { status: "claimed", buyer_id: "buyer-2" });
      return { outcome: "not-offered" };
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await POST(makeReq(buyerReply({})) as any);

    expect(ackEmails("That lead is no longer available")).toHaveLength(1);
    expect(ackEmails("You already have this lead")).toHaveLength(0);
  });
});

// ── A6: operator reply email notes a released lead ───────────────────────────

describe("A6 — operator 'Lead replied' email on a sold lead", () => {
  it("appends the released-to-a-buyer note when an offer has released_at", async () => {
    db.leads.push({
      id: LEAD_A,
      full_name: "Sam Jones",
      email: "sam@example.com",
      phone: "07811111111",
      source: "property",
    });
    seedOffer({ status: "claimed", released_at: "2026-08-19T09:30:00.000Z" });

    const sent = await notifyOperatorOfReply({
      leadId: LEAD_A,
      channel: "email",
      replyBody: "Actually evenings suit better.",
    });

    expect(sent).toBe(true);
    const call = resendSendSpy.mock.calls[0][0] as Record<string, unknown>;
    expect(String(call.text)).toContain("Note: this lead was released to a buyer on 2026-08-19.");
    expect(String(call.html)).toContain("released to a buyer on 2026-08-19");
  });

  it("no released offer -> no note (unchanged email)", async () => {
    db.leads.push({
      id: LEAD_A,
      full_name: "Sam Jones",
      email: "sam@example.com",
      phone: "07811111111",
      source: "property",
    });
    seedOffer(); // offered, released_at null

    const sent = await notifyOperatorOfReply({
      leadId: LEAD_A,
      channel: "email",
      replyBody: "Hello again.",
    });

    expect(sent).toBe(true);
    const call = resendSendSpy.mock.calls[0][0] as Record<string, unknown>;
    expect(String(call.text)).not.toContain("released to a buyer");
  });
});
