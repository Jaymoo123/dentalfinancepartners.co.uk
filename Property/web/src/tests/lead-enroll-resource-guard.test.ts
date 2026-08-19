/**
 * The resource-download guard lives at the ONE enrolment chokepoint
 * (lib/leads/enroll.ts), so the submit hook, retro-enrol route and reconcile
 * repair path all refuse alike: a role='resource' lead (Annex B.2 download,
 * in-house consent) is never chased. Found live 2026-08-19 when Medical's
 * submit-time enrol chased a downloader that only the reconcile guard knew
 * to skip.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

const mockAdminInsert = vi.fn();
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn().mockResolvedValue({ ok: true, status: 200, data: [] }),
  adminInsert: (...args: unknown[]) => mockAdminInsert(...args),
  adminUpdate: vi.fn().mockResolvedValue({ ok: true, status: 200, data: [] }),
}));

vi.mock("@/lib/leads/channels", () => ({
  leadNurtureArmed: () => true,
  buildLeadChannelSender: () => ({ send: vi.fn() }),
}));

import { enrollLead } from "@/lib/leads/enroll";

beforeEach(() => {
  vi.clearAllMocks();
  // buildLeadMessageContext mints signed booking/confirm links for real steps.
  process.env.LEAD_NURTURE_TOKEN_SECRET = "test-secret-0123456789-0123456789-01";
  mockAdminInsert.mockResolvedValue({ ok: true, status: 201, data: [{ lead_id: "L1" }] });
});

describe("enrollLead resource guard", () => {
  it("refuses role='resource' before touching the DB, even when armed", async () => {
    const result = await enrollLead({
      id: "L1",
      full_name: "",
      email: "downloader@example.com",
      phone: "",
      role: "resource",
      source: "property",
    });
    expect(result).toMatchObject({ enrolled: false, newlyEnrolled: false, reason: "resource" });
    expect(mockAdminInsert).not.toHaveBeenCalled();
  });

  it("still enrols a normal lead (guard does not overreach)", async () => {
    const result = await enrollLead(
      {
        id: "L2",
        full_name: "Jane Smith",
        email: "jane@example.com",
        phone: "+447700900123",
        role: "Individual landlord",
        source: "property",
      },
      { live: false },
    );
    expect(result.enrolled).toBe(true);
    expect(mockAdminInsert).toHaveBeenCalled();
  });
});
