/**
 * Route-level tests for the internal pool-intake bridge
 * (POST /api/leads/pool-intake): sibling sites call it when one of their leads
 * passes the contactability gate, so the Telegram grade + verified ping fire
 * from the single estate instance.
 *
 * Covers: auth (401 on missing/wrong token, 401 when no secret configured),
 * 400 on bad body, 404 unknown lead, test-lead refusal, bot unarmed/paused
 * no-ops, happy path (ensureCaseTier + notifyLeadVerified exactly once),
 * no-grade path, and a thrown grading error returning 500 without leaking.
 *
 * Mocking style mirrors leads-reconcile.test.ts.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Module mocks (declared before importing the route) ───────────────────────

const mockAdminSelect = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => mockAdminSelect(...args),
}));

const mockBotArmed = vi.fn();
vi.mock("@/lib/telegram", () => ({
  botArmed: () => mockBotArmed(),
}));

const mockIsBotPaused = vi.fn();
vi.mock("@/lib/leads/nurture-control", () => ({
  isBotPaused: () => mockIsBotPaused(),
}));

const mockEnsureCaseTier = vi.fn();
vi.mock("@/lib/leads/case-tier", () => ({
  ensureCaseTier: (...args: unknown[]) => mockEnsureCaseTier(...args),
}));

const mockNotifyLeadVerified = vi.fn();
vi.mock("@/lib/leads/bot-notify", () => ({
  notifyLeadVerified: (...args: unknown[]) => mockNotifyLeadVerified(...args),
}));

// ── Import route under test (after all mocks) ────────────────────────────────

import { POST } from "@/app/api/leads/pool-intake/route";

const SECRET = "test-internal-secret";

function intakeReq(body: unknown, { token }: { token?: string } = {}): Request {
  const headers = new Headers({ "content-type": "application/json" });
  if (token !== undefined) headers.set("x-internal-token", token);
  return new Request("http://localhost/api/leads/pool-intake", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function stubLead(row: Record<string, unknown> | null) {
  mockAdminSelect.mockResolvedValueOnce({ ok: true, status: 200, data: row ? [row] : [] });
}

const GRADE = { tier: "advisory", priceGbp: 85, reasons: ["multi-property"], source: "ai" };

beforeEach(() => {
  vi.clearAllMocks();
  process.env.LEAD_NURTURE_TOKEN_SECRET = SECRET;
  delete process.env.LEAD_INTERNAL_SECRET;
  mockBotArmed.mockReturnValue(true);
  mockIsBotPaused.mockResolvedValue(false);
  mockEnsureCaseTier.mockResolvedValue(GRADE);
  mockNotifyLeadVerified.mockResolvedValue(true);
});

describe("POST /api/leads/pool-intake auth", () => {
  it("401 without a token", async () => {
    const res = await POST(intakeReq({ leadId: "L1" }));
    expect(res.status).toBe(401);
    expect(mockAdminSelect).not.toHaveBeenCalled();
  });

  it("401 with a wrong token", async () => {
    const res = await POST(intakeReq({ leadId: "L1" }, { token: "wrong" }));
    expect(res.status).toBe(401);
  });

  it("401 when no secret is configured at all", async () => {
    delete process.env.LEAD_NURTURE_TOKEN_SECRET;
    const res = await POST(intakeReq({ leadId: "L1" }, { token: "" }));
    expect(res.status).toBe(401);
  });

  it("prefers the dedicated LEAD_INTERNAL_SECRET when set", async () => {
    process.env.LEAD_INTERNAL_SECRET = "dedicated";
    stubLead({ id: "L1", source: "dentists", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: "dedicated" }));
    expect(res.status).toBe(200);
    // The fallback secret no longer authenticates.
    const res2 = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    expect(res2.status).toBe(401);
  });
});

describe("POST /api/leads/pool-intake body + lead validation", () => {
  it("400 on unparseable JSON", async () => {
    const res = await POST(intakeReq("{not json", { token: SECRET }));
    expect(res.status).toBe(400);
  });

  it("400 on missing leadId", async () => {
    const res = await POST(intakeReq({}, { token: SECRET }));
    expect(res.status).toBe(400);
  });

  it("404 when the lead does not exist", async () => {
    stubLead(null);
    const res = await POST(intakeReq({ leadId: "missing" }, { token: SECRET }));
    expect(res.status).toBe(404);
  });
});

describe("POST /api/leads/pool-intake gating", () => {
  it("refuses test leads (is_test) without grading", async () => {
    stubLead({ id: "L1", source: "dentists", is_test: true });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    const json = await res.json();
    expect(json).toMatchObject({ ok: true, pinged: false, reason: "test" });
    expect(mockEnsureCaseTier).not.toHaveBeenCalled();
    expect(mockNotifyLeadVerified).not.toHaveBeenCalled();
  });

  it("refuses source='test' leads without grading", async () => {
    stubLead({ id: "L1", source: "test", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    const json = await res.json();
    expect(json).toMatchObject({ ok: true, pinged: false, reason: "test" });
    expect(mockEnsureCaseTier).not.toHaveBeenCalled();
  });

  it("no-ops when the bot is unarmed", async () => {
    mockBotArmed.mockReturnValue(false);
    stubLead({ id: "L1", source: "dentists", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    const json = await res.json();
    expect(json).toMatchObject({ ok: true, pinged: false, reason: "bot_unarmed" });
    expect(mockEnsureCaseTier).not.toHaveBeenCalled();
  });

  it("no-ops when the bot is paused", async () => {
    mockIsBotPaused.mockResolvedValue(true);
    stubLead({ id: "L1", source: "dentists", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    const json = await res.json();
    expect(json).toMatchObject({ ok: true, pinged: false, reason: "bot_paused" });
    expect(mockEnsureCaseTier).not.toHaveBeenCalled();
  });
});

describe("POST /api/leads/pool-intake happy path", () => {
  it("grades once, pings once, returns pinged:true", async () => {
    stubLead({ id: "L1", source: "dentists", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    const json = await res.json();
    expect(json).toMatchObject({ ok: true, pinged: true });
    expect(mockEnsureCaseTier).toHaveBeenCalledTimes(1);
    expect(mockEnsureCaseTier).toHaveBeenCalledWith("L1");
    expect(mockNotifyLeadVerified).toHaveBeenCalledTimes(1);
    expect(mockNotifyLeadVerified).toHaveBeenCalledWith("L1", GRADE);
  });

  it("no grade -> pinged:false, notify never called", async () => {
    mockEnsureCaseTier.mockResolvedValue(null);
    stubLead({ id: "L1", source: "dentists", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    const json = await res.json();
    expect(json).toMatchObject({ ok: true, pinged: false, reason: "no_grade" });
    expect(mockNotifyLeadVerified).not.toHaveBeenCalled();
  });

  it("a thrown grading error returns 500 without leaking internals", async () => {
    mockEnsureCaseTier.mockRejectedValue(new Error("gateway down"));
    stubLead({ id: "L1", source: "dentists", is_test: false });
    const res = await POST(intakeReq({ leadId: "L1" }, { token: SECRET }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(JSON.stringify(json)).not.toContain("gateway down");
  });
});
