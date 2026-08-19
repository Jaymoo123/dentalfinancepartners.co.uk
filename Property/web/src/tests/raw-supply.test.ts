/**
 * Tests for the Raw Bulk Supply lane (src/lib/leads/raw-supply.ts, DSA
 * clause 3.6): unverified leads sold whole as one batch to a single buyer,
 * no acceptance step, no credits.
 *
 *   - eligibleRawLeads: every exclusion reason (age, status, test, off-list
 *     source, in-house consent, already supplied/offered, suppressed) plus
 *     the nurturing/no-nurture split.
 *   - supplyRawLeads: one batch email happy path, double-send idempotency,
 *     the send-time re-check drop, and the no/unsigned-buyer path.
 *   - sendOffers (offer-send.ts): refuses a lead already raw-supplied.
 *   - consentAllowsSharing: the sharing-vs-in-house wording gate.
 *
 * Mocking mirrors the style of lead-offers.test.ts (in-memory db + matches()
 * PostgREST filter interpreter), with named mock-fn consts (nurture-control.test.ts
 * style) so calls can be inspected directly without type casts.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── In-memory DB ─────────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

const db = {
  leads: [] as Row[],
  lead_buyers: [] as Row[],
  lead_supply: [] as Row[],
  lead_offers: [] as Row[],
  lead_nurture_state: [] as Row[],
  lead_contact_events: [] as Row[],
  reset() {
    this.leads = [];
    this.lead_buyers = [];
    this.lead_supply = [];
    this.lead_offers = [];
    this.lead_nurture_state = [];
    this.lead_contact_events = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
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

const mockAdminInsert = vi.fn(
  (table: string, rows: Row | Row[], opts?: { onConflict?: string; ignoreDuplicates?: boolean }) => {
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
        if (opts?.ignoreDuplicates) continue;
        Object.assign(existing, row);
        inserted.push(existing);
        continue;
      }
      const defaults: Row = table === "lead_offers" ? { status: "offered" } : {};
      const newRow: Row = { id: `row-${++idCounter}`, ...defaults, ...row };
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

import { eligibleRawLeads, supplyRawLeads } from "@/lib/leads/raw-supply";
import { consentAllowsSharing, sendOffers } from "@/lib/leads/offer-send";

// ── Helpers ──────────────────────────────────────────────────────────────────

const HOUR = 3_600_000;
function hoursAgo(h: number): string {
  return new Date(Date.now() - h * HOUR).toISOString();
}

const SHARING_CONSENT =
  "Property Tax Partners will share your details with regulated firms in our specialist partner network so they can answer your enquiry. You can object at any time.";
const IN_HOUSE_CONSENT =
  "Property Tax Partners will use your details to respond to your enquiry and for no other purpose.";

function seedLead(id: string, over: Row = {}): Row {
  const lead: Row = {
    id,
    source: "dentists",
    created_at: hoursAgo(48),
    status: "new",
    is_test: false,
    consent_text: SHARING_CONSENT,
    full_name: "Test Lead",
    email: `${id}@lead.test`,
    phone: "07000000000",
    message: "Need help with practice incorporation",
    ...over,
  };
  db.leads.push(lead);
  return lead;
}

function seedRawBuyer(over: Row = {}): Row {
  const buyer: Row = {
    id: "raw-buyer-1",
    ref: "rob",
    firm_name: "Maratax",
    contact_name: "Rob Buyer",
    email: "rob@buyers.test",
    status: "active",
    sources: ["dentists", "solicitors"],
    min_tier: "essential",
    dsa_signed_at: "2026-08-01T00:00:00.000Z",
    ...over,
  };
  db.lead_buyers.push(buyer);
  return buyer;
}

beforeEach(() => {
  db.reset();
  sentEmails.length = 0;
  contactEvents.length = 0;
  idCounter = 0;
  mockAdminSelect.mockClear();
  mockAdminInsert.mockClear();
  mockAdminUpdate.mockClear();
  process.env.LEAD_RAW_SOURCES = "dentists,solicitors";
  process.env.LEAD_RAW_BUYER_REF = "rob";
  delete process.env.LEAD_RAW_PRICE_GBP;
});

// Regression: Number("") is 0, so an unset LEAD_RAW_PRICE_GBP once priced raw
// leads at £0 instead of the documented £5 default (fixed 2026-08-19).
describe("rawPriceGbp", () => {
  it("defaults to 5 when the env var is unset or blank", async () => {
    const { rawPriceGbp } = await import("@/lib/leads/raw-supply");
    delete process.env.LEAD_RAW_PRICE_GBP;
    expect(rawPriceGbp()).toBe(5);
    process.env.LEAD_RAW_PRICE_GBP = "  ";
    expect(rawPriceGbp()).toBe(5);
    process.env.LEAD_RAW_PRICE_GBP = "8";
    expect(rawPriceGbp()).toBe(8);
    process.env.LEAD_RAW_PRICE_GBP = "0";
    expect(rawPriceGbp()).toBe(0);
  });
});

// ── eligibleRawLeads ─────────────────────────────────────────────────────────

describe("eligibleRawLeads", () => {
  it("excludes a lead under 24h old", async () => {
    seedLead("l1", { created_at: hoursAgo(48) });
    seedLead("l2", { created_at: hoursAgo(2) });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes leads whose status has moved on (contactable, forwarded)", async () => {
    seedLead("l1");
    seedLead("l2", { status: "contactable" });
    seedLead("l3", { status: "forwarded" });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes is_test leads", async () => {
    seedLead("l1");
    seedLead("l2", { is_test: true });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes sources off the LEAD_RAW_SOURCES allow-list", async () => {
    seedLead("l1", { source: "dentists" });
    seedLead("l2", { source: "property" });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes leads collected under in-house (non-sharing) consent wording", async () => {
    seedLead("l1");
    seedLead("l2", { consent_text: IN_HOUSE_CONSENT });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes a lead already recorded in lead_supply", async () => {
    seedLead("l1");
    seedLead("l2");
    db.lead_supply.push({ lead_id: "l2", buyer_id: "buyer-x", price_gbp: 5, supplied_at: hoursAgo(1) });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes a lead that already has a tiered offer", async () => {
    seedLead("l1");
    seedLead("l2");
    db.lead_offers.push({ lead_id: "l2", buyer_id: "buyer-x", status: "offered" });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("excludes a suppressed (opted-out, never re-consented) lead, fail-closed even in the listing", async () => {
    seedLead("l1");
    seedLead("l2");
    db.lead_contact_events.push({ lead_id: "l2", event_type: "opted_out", ts: hoursAgo(1) });
    const { noNurture } = await eligibleRawLeads();
    expect(noNurture.map((l) => l.id)).toEqual(["l1"]);
  });

  it("splits a lead with an active nurture-state row into .nurturing", async () => {
    seedLead("l1");
    seedLead("l2");
    db.lead_nurture_state.push({ lead_id: "l2", status: "active" });
    const split = await eligibleRawLeads();
    expect(split.noNurture.map((l) => l.id)).toEqual(["l1"]);
    expect(split.nurturing.map((l) => l.id)).toEqual(["l2"]);
  });
});

// ── supplyRawLeads ───────────────────────────────────────────────────────────

describe("supplyRawLeads", () => {
  beforeEach(() => {
    seedRawBuyer();
  });

  it("supplies eligible leads as ONE batch email, latches lead_supply, flips status, stops nurture, records handed_off", async () => {
    seedLead("l1");
    seedLead("l2");
    db.lead_nurture_state.push({ lead_id: "l1", status: "active" });

    const result = await supplyRawLeads(["l1", "l2"]);
    expect(result.supplied).toBe(2);
    expect(result.emailSent).toBe(true);
    expect(result.buyerFirm).toBe("Maratax");

    expect(sentEmails).toHaveLength(1);
    expect(sentEmails[0].to).toBe("rob@buyers.test");
    expect(sentEmails[0].html).toContain("l1");
    expect(sentEmails[0].html).toContain("l2");

    const supplyRows = db.lead_supply.filter((r) => ["l1", "l2"].includes(r.lead_id as string));
    expect(supplyRows).toHaveLength(2);
    expect(supplyRows.every((r) => r.price_gbp === 5)).toBe(true);

    const leadRows = db.leads.filter((l) => ["l1", "l2"].includes(l.id as string));
    expect(leadRows.every((l) => l.status === "forwarded")).toBe(true);

    const nurtureRow = db.lead_nurture_state.find((r) => r.lead_id === "l1");
    expect(nurtureRow?.status).toBe("stopped");

    expect(contactEvents.filter((e) => e.type === "handed_off")).toHaveLength(2);
  });

  it("double-send: supplying the same leads again supplies nothing and sends no email", async () => {
    seedLead("l1");
    seedLead("l2");
    await supplyRawLeads(["l1", "l2"]);
    sentEmails.length = 0;

    const second = await supplyRawLeads(["l1", "l2"]);
    expect(second.supplied).toBe(0);
    expect(second.emailSent).toBe(false);
    expect(sentEmails).toHaveLength(0);
  });

  it("drops a lead whose status changed between listing and supply (send-time re-check)", async () => {
    seedLead("l1");
    seedLead("l2", { status: "contactable" }); // verified in the interim
    const result = await supplyRawLeads(["l1", "l2"]);
    expect(result.supplied).toBe(1);
    expect(db.lead_supply.map((r) => r.lead_id)).toEqual(["l1"]);
  });

  it("no buyer configured: supplies nothing, sends no email, reason no-raw-buyer", async () => {
    db.lead_buyers.length = 0;
    seedLead("l1");
    const result = await supplyRawLeads(["l1"]);
    expect(result).toEqual({ supplied: 0, skipped: 1, emailSent: false, reason: "no-raw-buyer" });
    expect(sentEmails).toHaveLength(0);
  });

  it("unsigned buyer: supplies nothing, sends no email, reason no-raw-buyer", async () => {
    db.lead_buyers.forEach((b) => {
      b.dsa_signed_at = null;
    });
    seedLead("l1");
    const result = await supplyRawLeads(["l1"]);
    expect(result.supplied).toBe(0);
    expect(result.emailSent).toBe(false);
    expect(result.reason).toBe("no-raw-buyer");
    expect(sentEmails).toHaveLength(0);
  });
});

// ── sendOffers refuses a raw-supplied lead ──────────────────────────────────

describe("sendOffers refuses an already raw-supplied lead", () => {
  it("returns {matched:0, offered:0} for a lead already in lead_supply", async () => {
    seedLead("l1", { consent_text: SHARING_CONSENT });
    db.lead_buyers.push({
      id: "buyer-1",
      ref: "firm1",
      firm_name: "Firm 1",
      email: "firm1@buyers.test",
      status: "active",
      sources: ["dentists"],
      min_tier: "essential",
      dsa_signed_at: "2026-08-01T00:00:00.000Z",
    });
    db.lead_supply.push({ lead_id: "l1", buyer_id: "raw-buyer-1", price_gbp: 5, supplied_at: hoursAgo(1) });

    const res = await sendOffers("l1", "dentists", {
      site: "Dentists",
      tier: "essential",
      intent: "unknown",
      work_type: "unknown",
      role: "",
      surface: "",
      submitted_date: "2026-08-06",
    });
    expect(res).toEqual({ matched: 0, offered: 0, buyers: [] });
    expect(db.lead_offers).toHaveLength(0);
  });
});

// ── consentAllowsSharing ─────────────────────────────────────────────────────

describe("consentAllowsSharing", () => {
  it("recognises the estate sharing wording", () => {
    expect(consentAllowsSharing(SHARING_CONSENT)).toBe(true);
  });

  it("rejects the in-house (non-sharing) wording", () => {
    expect(consentAllowsSharing(IN_HOUSE_CONSENT)).toBe(false);
  });

  it("rejects empty or null consent text", () => {
    expect(consentAllowsSharing("")).toBe(false);
    expect(consentAllowsSharing(null)).toBe(false);
    expect(consentAllowsSharing(undefined)).toBe(false);
  });

  it("recognises the 'a firm from our specialist partner network' phrase", () => {
    expect(consentAllowsSharing("your enquiry may be passed to a firm from our specialist partner network")).toBe(
      true,
    );
  });
});
