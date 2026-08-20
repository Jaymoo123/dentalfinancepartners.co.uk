/**
 * Tests for the buyer offer/claim pipeline:
 *   - offer-config: qualifying rules, price card parsing, buyer matching
 *   - offer-teaser: PII scrub defence
 *   - offer-send: idempotent offer creation + buyer emails
 *   - claim route: first-click-wins state machine, GET never mutates,
 *     release email + nurture halt on claim
 *
 * Mocking mirrors the style of lead-aux-cron.test.ts.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ── In-memory DB ─────────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

const db = {
  leads:                [] as Row[],
  lead_buyers:          [] as Row[],
  lead_offers:          [] as Row[],
  lead_value_scores:    [] as Row[],
  lead_nurture_state:   [] as Row[],
  // Read by the suppression check on both the offer and the claim path.
  lead_contact_events:  [] as Row[],
  // Raw Bulk Supply ledger: read by the supplied-lead guard in sendOffers.
  lead_supply:          [] as Row[],
  // Verification row: read by the release email builder.
  lead_verification:    [] as Row[],
  reset() {
    this.leads               = [];
    this.lead_buyers         = [];
    this.lead_offers         = [];
    this.lead_value_scores   = [];
    this.lead_nurture_state  = [];
    this.lead_contact_events = [];
    this.lead_supply         = [];
    this.lead_verification   = [];
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
      // array contains: cs.{value}
      const want = raw.slice(3).replace(/^\{|\}$/g, "");
      if (!Array.isArray(row[k]) || !(row[k] as unknown[]).map(String).includes(want)) return false;
    }
  }
  return true;
}

let idCounter = 0;

// In-memory simulation of the claim_lead_offer() SQL function (migration
// 20260819000002): shared cap, exclusive lock, test buyers exempt from the
// allocation count. Mirrors the plpgsql exactly; keep in sync.
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

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn((table: string, params: Record<string, string>) => {
    const tableData = (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params));
    return Promise.resolve({ ok: true, status: 200, data: tableData });
  }),
  adminInsert: vi.fn(
    (table: string, rows: Row | Row[], opts?: { onConflict?: string; ignoreDuplicates?: boolean }) => {
      if (table === "rpc/claim_lead_offer") {
        return Promise.resolve({
          ok: true,
          status: 200,
          data: simulateClaimRpc(rows as never),
        });
      }
      const tableData = db[table as keyof typeof db] as Row[];
      const list = Array.isArray(rows) ? rows : [rows];
      const inserted: Row[] = [];
      for (const row of list) {
        if (opts?.onConflict && opts?.ignoreDuplicates) {
          const conflictKeys = opts.onConflict.split(",").map((k) => k.trim());
          const existing = tableData.find((r) => conflictKeys.every((k) => r[k] === row[k]));
          if (existing) continue;
        }
        // Mirror the DB column defaults the real insert relies on.
        const defaults: Row = table === "lead_offers" ? { status: "offered" } : {};
        const newRow: Row = { id: `row-${++idCounter}`, token: `tok${++idCounter}abcdef1234567890`, ...defaults, ...row };
        tableData.push(newRow);
        inserted.push(newRow);
      }
      return Promise.resolve({ ok: true, status: 201, data: inserted });
    },
  ),
  adminUpdate: vi.fn((table: string, params: Record<string, string>, patch: Row) => {
    const tableData = db[table as keyof typeof db] as Row[];
    const hits = tableData.filter((r) => matches(r, params));
    hits.forEach((r) => Object.assign(r, patch));
    return Promise.resolve({ ok: true, status: 200, data: hits });
  }),
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

// ── AI mock: two-pass gateway redaction returns whatever the test sets ──────

let aiRedact: { redacted_message: string; situation: string; availability?: string } | null = null;
let aiVerifyClean = true;
vi.mock("@/lib/ai", () => ({
  redactEnquiry: vi.fn(() => Promise.resolve(aiRedact)),
  verifyNoIdentifiers: vi.fn(() => Promise.resolve(aiVerifyClean)),
}));

// ── Contact-event mock ───────────────────────────────────────────────────────

const contactEvents: Array<{ leadId: string; type: string }> = [];
vi.mock("@accounting-network/web-shared/lead-nurture/send", () => ({
  recordLeadContactEvent: vi.fn((leadId: string, type: string) => {
    contactEvents.push({ leadId, type });
    return Promise.resolve();
  }),
}));

import { offerQualifies, tierPrice, tierAtLeast, matchingBuyers } from "@/lib/leads/offer-config";
import { buildTeaser } from "@/lib/leads/offer-teaser";
import { sendOffers, isBuyerAcceptance, parseLeadRefFromSubject } from "@/lib/leads/offer-send";
import { claimOffer } from "@/lib/leads/offer-release";
import { GET as claimGet, POST as claimPost } from "@/app/api/leads/claim/[token]/route";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeReq(opts: { method?: string; body?: string; contentType?: string } = {}) {
  return {
    url: "https://example.test/api/leads/claim/x",
    headers: {
      get: (h: string) =>
        h.toLowerCase() === "content-type"
          ? (opts.contentType ?? "application/x-www-form-urlencoded")
          : null,
    },
    text: () => Promise.resolve(opts.body ?? "confirm=1"),
  } as never;
}

function ctxFor(token: string) {
  return { params: Promise.resolve({ token }) };
}

const FUTURE = new Date(Date.now() + 3600_000).toISOString();
const PAST = new Date(Date.now() - 3600_000).toISOString();

// Estate sharing wording: the offer path only pools leads whose stored
// consent_text disclosed sharing (H1 guard).
const SHARING_CONSENT =
  "Dentists Tax Specialists will share your details with regulated firms in our specialist partner network so they can answer your enquiry. You can object at any time.";

function seedLeadRow(id: string, over: Row = {}): Row {
  const lead: Row = {
    id,
    full_name: "Jane Doe",
    email: `${id}@lead.test`,
    phone: "07000000000",
    source: "dentists",
    message: "Need help with practice incorporation",
    created_at: "2026-08-06T10:00:00Z",
    status: "new",
    consent_text: SHARING_CONSENT,
    ...over,
  };
  db.leads.push(lead);
  return lead;
}

function seedBuyer(over: Row = {}): Row {
  const buyer: Row = {
    id: `buyer-${++idCounter}`,
    ref: `firm${idCounter}`,
    firm_name: `Firm ${idCounter}`,
    contact_name: "Alex Smith",
    email: `firm${idCounter}@buyers.test`,
    status: "active",
    sources: ["dentists"],
    min_tier: "standard",
    dsa_signed_at: "2026-08-01T00:00:00.000Z",
    ...over,
  };
  db.lead_buyers.push(buyer);
  return buyer;
}

function seedOffer(over: Row = {}): Row {
  const offer: Row = {
    id: `offer-${++idCounter}`,
    lead_id: "lead-1",
    buyer_id: "buyer-1",
    token: `aaaabbbbccccdddd${idCounter}`,
    teaser: { site: "Dentists", tier: "advisory", intent: "structure", work_type: "recurring", role: "", surface: "", submitted_date: "2026-08-06" },
    status: "offered",
    expires_at: FUTURE,
    price_gbp: 85,
    ...over,
  };
  db.lead_offers.push(offer);
  return offer;
}

beforeEach(() => {
  db.reset();
  sentEmails.length = 0;
  contactEvents.length = 0;
  aiRedact = {
    redacted_message: "I run [COMPANY], an AI health startup in [LOCATION], and need accounts support.",
    situation: "Landlord with three properties weighing incorporation.",
  };
  aiVerifyClean = true;
  process.env.LEAD_OFFER_SOURCES = "dentists,solicitors,medical";
  process.env.LEAD_OFFER_PRICES = "essential:15,standard:40,advisory:85";
  process.env.LEAD_OFFER_MIN_TIER = "essential";
  delete process.env.LEAD_OFFER_AUTO;
});

// ── offer-config ─────────────────────────────────────────────────────────────

describe("offerQualifies", () => {
  const lead = (source: string, is_test = false) => ({ source, is_test });
  const score = (case_tier: string) => ({ tier: "medium", case_tier });

  it("accepts an essential+ lead on an offered vertical", () => {
    expect(offerQualifies(lead("dentists"), score("essential"))).toBe(true);
    expect(offerQualifies(lead("dentists"), score("standard"))).toBe(true);
    expect(offerQualifies(lead("solicitors"), score("advisory"))).toBe(true);
  });
  it("rejects unsellable scores, test leads, property, and unoffered sources", () => {
    expect(offerQualifies(lead("dentists"), { tier: "low" })).toBe(false);
    expect(offerQualifies(lead("dentists", true), score("advisory"))).toBe(false);
    expect(offerQualifies(lead("property"), score("advisory"))).toBe(false);
    expect(offerQualifies(lead("generalist"), score("advisory"))).toBe(false);
    expect(offerQualifies(lead(""), score("advisory"))).toBe(false);
  });
  it("READY-gates sources listed in LEAD_OFFER_READY_GATED_SOURCES (property always)", () => {
    process.env.LEAD_OFFER_READY_GATED_SOURCES = "dentists";
    expect(offerQualifies(lead("dentists"), score("advisory"))).toBe(false);
    expect(offerQualifies(lead("property"), score("advisory"))).toBe(false); // implicit, always
    expect(offerQualifies(lead("solicitors"), score("advisory"))).toBe(true);
    delete process.env.LEAD_OFFER_READY_GATED_SOURCES;
  });

  it("respects a raised min tier", () => {
    process.env.LEAD_OFFER_MIN_TIER = "advisory";
    expect(offerQualifies(lead("dentists"), score("standard"))).toBe(false);
    expect(offerQualifies(lead("dentists"), score("advisory"))).toBe(true);
  });

  it("legacy rows without case_tier fall back through the owner-approved map", () => {
    expect(offerQualifies(lead("dentists"), { tier: "very_high" })).toBe(true); // -> advisory
    expect(offerQualifies(lead("dentists"), { tier: "high" })).toBe(true); // -> advisory
    expect(offerQualifies(lead("dentists"), { tier: "medium" })).toBe(true); // -> standard
    expect(offerQualifies(lead("dentists"), { tier: "low" })).toBe(false); // unmapped = unsellable
    expect(offerQualifies(lead("dentists"), {})).toBe(false);
  });
});

describe("tierPrice / tierAtLeast", () => {
  it("reads the price card and never sells legacy ids", () => {
    expect(tierPrice("essential")).toBe(15);
    expect(tierPrice("standard")).toBe(40);
    expect(tierPrice("advisory")).toBe(85);
    expect(tierPrice("low")).toBeNull();
    expect(tierPrice("high")).toBeNull();
    expect(tierPrice("very_high")).toBeNull();
    expect(tierPrice("nonsense")).toBeNull();
  });
  it("orders tiers correctly", () => {
    expect(tierAtLeast("advisory", "essential")).toBe(true);
    expect(tierAtLeast("essential", "standard")).toBe(false);
    expect(tierAtLeast("standard", "standard")).toBe(true);
  });
});

describe("matchingBuyers", () => {
  it("filters by status, source subscription and tier floor", async () => {
    seedBuyer({ id: "b1", sources: ["dentists"], min_tier: "standard" });
    seedBuyer({ id: "b2", sources: ["dentists"], min_tier: "advisory" });
    seedBuyer({ id: "b3", sources: ["solicitors"], min_tier: "standard" });
    seedBuyer({ id: "b4", sources: ["dentists"], status: "paused" });
    const hit = await matchingBuyers("dentists", "standard");
    expect(hit.map((b) => b.id)).toEqual(["b1"]);
  });

  // The lawful basis for sharing depends on every recipient being under the standing
  // agreement before it receives anything, including a redacted alert. This was a
  // manual runbook step until 2026-08-14 and is now enforced here.
  it("excludes a buyer that has not signed the data sharing agreement", async () => {
    seedBuyer({ id: "signed", sources: ["dentists"], min_tier: "standard" });
    seedBuyer({ id: "unsigned", sources: ["dentists"], min_tier: "standard", dsa_signed_at: null });
    const hit = await matchingBuyers("dentists", "standard");
    expect(hit.map((b) => b.id)).toEqual(["signed"]);
  });
});

// ── suppression ──────────────────────────────────────────────────────────────

describe("objection suppression", () => {
  beforeEach(() => {
    seedLeadRow("lead-1");
  });

  it("does not offer a lead whose enquirer has opted out", async () => {
    seedBuyer({ id: "b1", sources: ["dentists"], min_tier: "standard" });
    db.lead_contact_events.push({
      lead_id: "lead-1",
      event_type: "opted_out",
      ts: "2026-08-10T09:00:00.000Z",
    });
    const res = await sendOffers("lead-1", "dentists", {
      site: "Dentists", tier: "advisory", intent: "structure", work_type: "recurring",
      role: "", surface: "", submitted_date: "2026-08-06",
    });
    expect(res).toEqual({ matched: 0, offered: 0, buyers: [] });
    expect(db.lead_offers).toHaveLength(0);
  });

  it("offers again after a later re-consent", async () => {
    seedBuyer({ id: "b1", sources: ["dentists"], min_tier: "standard" });
    db.lead_contact_events.push(
      { lead_id: "lead-1", event_type: "opted_out", ts: "2026-08-10T09:00:00.000Z" },
      { lead_id: "lead-1", event_type: "re_consented", ts: "2026-08-11T09:00:00.000Z" },
    );
    const res = await sendOffers("lead-1", "dentists", {
      site: "Dentists", tier: "advisory", intent: "structure", work_type: "recurring",
      role: "", surface: "", submitted_date: "2026-08-06",
    });
    expect(res.offered).toBe(1);
  });
});

// ── teaser scrub ─────────────────────────────────────────────────────────────

describe("teaser PII defence (two-pass AI, fail-closed)", () => {
  // The alert carries the enquiry itself, so redaction is what stands between a
  // pre-claim alert and a disclosure of identity to firms that never pay.
  it("carries the verified situation only, never the enquirer's words (2026-08-20)", async () => {
    const teaser = await buildTeaser(
      { id: "lead-1", message: "I run KAN.AI in Edinburgh, need accounts help", source: "generalist", created_at: "2026-08-06T10:00:00Z" },
      { tier: "high", case_tier: "advisory", intent: "structure", work_type: "recurring" },
    );
    expect(teaser.situation).toBe("Landlord with three properties weighing incorporation.");
    expect(teaser.redacted_message).toBeUndefined();
    expect(JSON.stringify(teaser)).not.toContain("KAN.AI");
  });

  it("carries last-responded + verified availability from reply events (2026-08-20)", async () => {
    db.lead_contact_events.push({
      lead_id: "lead-1",
      event_type: "replied",
      channel: "email",
      ts: "2026-08-20T04:53:00.000Z",
      meta: { body: "Hi Junayd, would a Teams call work? Any time tomorrow. Kind regards Sarah" },
    });
    aiRedact = {
      redacted_message: "",
      situation: "Non-resident landlord weighing company ownership for future purchases.",
      availability: "Would a Teams call work? Any time tomorrow.",
    };
    const teaser = await buildTeaser(
      { id: "lead-1", message: "help with BTL", source: "property", created_at: "2026-08-11T07:54:00Z" },
      { tier: "high", case_tier: "advisory", intent: "structure", work_type: "recurring" },
    );
    expect(teaser.last_responded).toBe("2026-08-20 04:53 · email");
    expect(teaser.availability).toBe("Would a Teams call work? Any time tomorrow.");
    expect(JSON.stringify(teaser)).not.toContain("Sarah");
  });

  it("verify failure drops availability along with the situation, keeps last_responded", async () => {
    db.lead_contact_events.push({
      lead_id: "lead-1",
      event_type: "replied",
      channel: "sms",
      ts: "2026-08-20T04:53:00.000Z",
      meta: { body: "call me anytime" },
    });
    aiRedact = {
      redacted_message: "",
      situation: "Something",
      availability: "Call Sarah on 07700",
    };
    aiVerifyClean = false;
    const teaser = await buildTeaser(
      { id: "lead-1", message: "help", source: "property" },
      { tier: "high", case_tier: "advisory" },
    );
    expect(teaser.availability).toBeUndefined();
    expect(teaser.situation).toBeUndefined();
    expect(teaser.last_responded).toBe("2026-08-20 04:53 · sms");
  });

  it("withholds ALL free text when the verify pass flags the redaction", async () => {
    aiVerifyClean = false;
    const teaser = await buildTeaser(
      { id: "lead-1", message: "help", source: "dentists", created_at: "2026-08-06T10:00:00Z" },
      { tier: "high", case_tier: "advisory", intent: "structure", work_type: "recurring" },
    );
    expect(teaser.redacted_message).toBeUndefined();
    expect(teaser.situation).toBeUndefined();
    expect(teaser.tier).toBe("advisory");
  });

  it("degrades to structured-only when redaction is unavailable (fail-closed)", async () => {
    aiRedact = null;
    const teaser = await buildTeaser(
      { id: "lead-1", message: "help", source: "dentists" },
      { tier: "medium", case_tier: "standard", intent: "cgt", work_type: "one_off" },
    );
    expect(teaser.redacted_message).toBeUndefined();
    expect(teaser.situation).toBeUndefined();
    expect(teaser.tier).toBe("standard");
  });

  it("teaser tier is the case tier, mapped for legacy scores, never a legacy id", async () => {
    aiRedact = null;
    const legacy = await buildTeaser(
      { id: "lead-1", message: "help", source: "dentists" },
      { tier: "high", est_value_gbp: 2000, intent: "structure", work_type: "recurring" },
    );
    expect(legacy.tier).toBe("advisory");
    const low = await buildTeaser(
      { id: "lead-2", message: "help", source: "dentists" },
      { tier: "low", est_value_gbp: 0 },
    );
    expect(low.tier).toBe("");
  });
});

// ── offer-send ───────────────────────────────────────────────────────────────

describe("sendOffers", () => {
  const teaser = {
    site: "Dentists", tier: "advisory", est_band: "£1,000–£3,000", intent: "structure",
    work_type: "recurring", role: "Practice owner", surface: "", submitted_date: "2026-08-06",
  };

  beforeEach(() => {
    // Every offered lead must exist with sharing-consent wording; the H1 guard
    // reads the stored consent_text before any offer goes out.
    seedLeadRow("lead-1");
    seedLeadRow("lead-9");
    seedLeadRow("lead-10");
  });

  it("creates one offer per matching buyer and emails each", async () => {
    seedBuyer({ id: "b1", email: "b1@buyers.test" });
    seedBuyer({ id: "b2", email: "b2@buyers.test" });
    const result = await sendOffers("lead-1", "dentists", teaser);
    expect(result.matched).toBe(2);
    expect(result.offered).toBe(2);
    expect(db.lead_offers).toHaveLength(2);
    expect(db.lead_offers.every((o) => o.price_gbp === 85 && o.status === "offered")).toBe(true);
    expect(sentEmails).toHaveLength(2);
    expect(sentEmails[0].subject).toContain("Advisory tier, £85");
    // Reply-to-accept model (owner decision 2026-08-19): no button, no claim
    // link; replies land on the inbound capture subdomain and the copy says
    // reply YES.
    expect(sentEmails[0].html).toContain("reply YES");
    expect(sentEmails[0].html).not.toContain("/api/leads/claim/");
    expect((sentEmails[0] as { replyTo?: string }).replyTo).toContain("@inbound.");
    // Buyer-facing copy renders the new labels, never the old tier ids.
    expect(sentEmails[0].html).not.toMatch(/very_high|Very high/);
    // Anonymised: buyer email must not contain a claimable lead id.
    expect(sentEmails[0].html).not.toContain("lead-1");
  });

  it("legacy fallback: a lead scored high with no case_tier offers as advisory at £85", async () => {
    aiRedact = null;
    seedBuyer({ id: "b1", email: "b1@buyers.test", min_tier: "standard" });
    const legacyTeaser = await buildTeaser(
      { id: "lead-9", message: "incorporation question", source: "dentists" },
      { tier: "high", est_value_gbp: 2000, intent: "incorporation", work_type: "project" },
    );
    const result = await sendOffers("lead-9", "dentists", legacyTeaser);
    expect(result.offered).toBe(1);
    expect(db.lead_offers[0].price_gbp).toBe(85);
    expect((db.lead_offers[0].teaser as { tier: string }).tier).toBe("advisory");
    expect(sentEmails[0].subject).toContain("Advisory tier, £85");
  });

  it("legacy fallback: a low-only lead never offers", async () => {
    aiRedact = null;
    seedBuyer({ id: "b1", email: "b1@buyers.test", min_tier: "essential" });
    const lowTeaser = await buildTeaser(
      { id: "lead-10", message: "hi", source: "dentists" },
      { tier: "low", est_value_gbp: 0 },
    );
    const result = await sendOffers("lead-10", "dentists", lowTeaser);
    expect(result.matched).toBe(0);
    expect(db.lead_offers).toHaveLength(0);
    expect(sentEmails).toHaveLength(0);
  });

  it("is idempotent: re-offering inserts nothing and emails no one", async () => {
    seedBuyer({ id: "b1" });
    await sendOffers("lead-1", "dentists", teaser);
    sentEmails.length = 0;
    const second = await sendOffers("lead-1", "dentists", teaser);
    expect(second.offered).toBe(0);
    expect(db.lead_offers).toHaveLength(1);
    expect(sentEmails).toHaveLength(0);
  });

  it("does nothing for an unsellable tier or no matching buyers", async () => {
    const r1 = await sendOffers("lead-1", "dentists", { ...teaser, tier: "low" });
    expect(r1.matched).toBe(0);
    const r2 = await sendOffers("lead-1", "dentists", teaser);
    expect(r2.matched).toBe(0);
    expect(db.lead_offers).toHaveLength(0);
  });
});

// ── subject lead-ref parsing ─────────────────────────────────────────────────

describe("parseLeadRefFromSubject", () => {
  it("pulls the ref out of a reply subject, any casing/prefix", () => {
    expect(parseLeadRefFromSubject("RE: New Property enquiry available, Advisory tier, £85 [L-12ebf7a6]")).toBe("12ebf7a6");
    expect(parseLeadRefFromSubject("Fwd: re: something [l-ABCDEF01]")).toBe("abcdef01");
  });
  it("returns null when absent or malformed", () => {
    expect(parseLeadRefFromSubject("RE: New Property enquiry available, Essential tier, £15")).toBeNull();
    expect(parseLeadRefFromSubject("[L-123]")).toBeNull();
    expect(parseLeadRefFromSubject("")).toBeNull();
  });
});

// ── buyer acceptance detection ───────────────────────────────────────────────

describe("isBuyerAcceptance", () => {
  it("accepts the yes-family in any casing", () => {
    for (const s of ["YES", "yes", "yEs", "Y", "y", "Yes.", "yes!", "Yep", "yeah",
      "Yes please", "yes, send it over", "Accept", "Interested, yes"]) {
      expect(isBuyerAcceptance(s), s).toBe(true);
    }
  });
  it("refuses negations, opt-outs and non-answers", () => {
    for (const s of ["no", "No thanks", "not this one", "yes but not this one",
      "please pause my subscription", "unsubscribe", "stop", "who is this?",
      "can you tell me more about the enquiry", ""]) {
      expect(isBuyerAcceptance(s), s).toBe(false);
    }
  });
  it("judges only the first line, so a signature cannot flip the verdict", () => {
    // The signed-STOP incident class: trailing signature text must not count.
    expect(isBuyerAcceptance("yes\n\nKind regards\nRob McKee CTA\nMaratax Limited")).toBe(true);
    expect(isBuyerAcceptance("Not for us\n\nyes to future advisory leads though")).toBe(false);
  });
  it("refuses an over-long first line (essay replies go to the owner instead)", () => {
    expect(
      isBuyerAcceptance(
        "yes well possibly, although it depends on quite a few things we would want to discuss first about scope",
      ),
    ).toBe(false);
  });
});

// ── claim route ──────────────────────────────────────────────────────────────

describe("claim route", () => {
  function seedLeadAndBuyer() {
    db.leads.push({
      id: "lead-1", full_name: "Jane Doe", email: "jane@lead.test", phone: "07000000000",
      source: "dentists", message: "Need help with practice incorporation",
      created_at: "2026-08-06T10:00:00Z", status: "new",
    });
    seedBuyer({ id: "buyer-1", email: "winner@buyers.test", firm_name: "Winner LLP" });
    seedBuyer({ id: "buyer-2", email: "loser@buyers.test", firm_name: "Loser LLP" });
  }

  it("GET renders the accept page and never mutates", async () => {
    seedLeadAndBuyer();
    const offer = seedOffer();
    const res = await claimGet(makeReq(), ctxFor(offer.token as string));
    const html = await res.text();
    expect(html).toContain("Accept this lead");
    expect(offer.status).toBe("offered");
    expect(sentEmails).toHaveLength(0);
  });

  it("POST claims, releases full details, halts nurture; sibling stays claimable (shared model)", async () => {
    seedLeadAndBuyer();
    db.lead_nurture_state.push({ lead_id: "lead-1", sequence: "contactability", status: "active" });
    const win = seedOffer({ buyer_id: "buyer-1" });
    const sibling = seedOffer({ buyer_id: "buyer-2", token: "ffffeeeeddddcccc99" });

    const res = await claimPost(makeReq(), ctxFor(win.token as string));
    const html = await res.text();
    expect(html).toContain("it is yours");
    expect(win.status).toBe("claimed");
    // Claim-race model: up to CLAIM_SLOTS_PER_LEAD firms share; the sibling
    // offer stays open, it does not flip to lost on the first claim.
    expect(sibling.status).toBe("offered");
    expect(db.lead_nurture_state[0].status).toBe("stopped");
    expect(contactEvents).toEqual([{ leadId: "lead-1", type: "handed_off" }]);
    expect(db.leads[0].status).toBe("forwarded");

    // Release email carries full PII but no Source page row; billing line present.
    const release = sentEmails.find((e) => e.to === "winner@buyers.test");
    expect(release?.html).toContain("jane@lead.test");
    expect(release?.html).toContain("Jane Doe");
    expect(release?.html).not.toContain("Source page");
    expect(release?.html).toContain("added to your monthly invoice");
    expect(sentEmails.some((e) => e.subject.startsWith("Lead claimed by Winner LLP"))).toBe(true);
    expect(win.released_at).toBeTruthy();
  });

  it("second firm shares the lead at the same price; cap closes the rest", async () => {
    seedLeadAndBuyer();
    seedBuyer({ id: "buyer-3", email: "third@buyers.test" });
    seedBuyer({ id: "buyer-4", email: "fourth@buyers.test" });
    const o1 = seedOffer({ buyer_id: "buyer-1" });
    const o2 = seedOffer({ buyer_id: "buyer-2", token: "ffffeeeeddddcccc98" });
    const o3 = seedOffer({ buyer_id: "buyer-3", token: "ffffeeeeddddcccc97" });
    const o4 = seedOffer({ buyer_id: "buyer-4", token: "ffffeeeeddddcccc96" });

    await claimPost(makeReq(), ctxFor(o1.token as string));
    const res2 = await claimPost(makeReq(), ctxFor(o2.token as string));
    expect(await res2.text()).toContain("it is yours");
    expect(o2.status).toBe("claimed");
    expect(o2.price_gbp).toBe(85); // same fixed price as the first claim

    await claimPost(makeReq(), ctxFor(o3.token as string));
    // Third real claim reaches the cap: the remaining offer closes.
    expect(o3.status).toBe("claimed");
    expect(o4.status).toBe("lost");

    sentEmails.length = 0;
    const res4 = await claimPost(makeReq(), ctxFor(o4.token as string));
    expect(await res4.text()).toContain("taken");
    expect(sentEmails).toHaveLength(0);
  });

  it("exclusive claim locks the lead at the multiplier; unavailable once shared-claimed", async () => {
    seedLeadAndBuyer();
    const o1 = seedOffer({ buyer_id: "buyer-1" });
    const o2 = seedOffer({ buyer_id: "buyer-2", token: "ffffeeeeddddcccc95" });

    const excl = await claimOffer(o1.id as string, { exclusive: true });
    expect(excl.outcome).toBe("claimed");
    expect(excl.offer?.price_gbp).toBe(255); // 85 x 3
    expect(o1.exclusive).toBe(true);
    expect(o2.status).toBe("lost");
  });

  it("test-buyer claims never consume an allocation slot", async () => {
    seedLeadAndBuyer();
    seedBuyer({ id: "buyer-test", email: "owner@test.inbox", is_test: true });
    const t = seedOffer({ buyer_id: "buyer-test", token: "ffffeeeeddddcccc94" });
    const real = seedOffer({ buyer_id: "buyer-1", token: "ffffeeeeddddcccc93" });

    await claimPost(makeReq(), ctxFor(t.token as string));
    expect(t.status).toBe("claimed");
    // A test claim does not block an exclusive lock for a real firm.
    const excl = await claimOffer(real.id as string, { exclusive: true });
    expect(excl.outcome).toBe("claimed");
  });

  it("expired offers cannot be claimed", async () => {
    seedLeadAndBuyer();
    const offer = seedOffer({ expires_at: PAST });
    const res = await claimPost(makeReq(), ctxFor(offer.token as string));
    const html = await res.text();
    expect(html).toContain("expired");
    expect(offer.status).toBe("offered"); // sweep flips it, claim never does
    expect(sentEmails).toHaveLength(0);
  });

  it("machine POST without confirm never claims (scanner safety)", async () => {
    seedLeadAndBuyer();
    const offer = seedOffer();
    const res = await claimPost(makeReq({ body: "List-Unsubscribe=One-Click" }), ctxFor(offer.token as string));
    expect(res.status).toBe(200);
    expect(offer.status).toBe("offered");
    expect(sentEmails).toHaveLength(0);
  });

  it("rejects malformed tokens", async () => {
    const res = await claimGet(makeReq(), ctxFor("../../etc/passwd"));
    const html = await res.text();
    expect(html).toContain("not valid");
  });
});
