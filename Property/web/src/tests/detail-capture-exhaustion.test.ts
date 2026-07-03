/**
 * Detail-capture phone-aware exhaustion: a lead with no usable phone is genuinely
 * unreachable; a lead that HAS a good phone but only ever lacked a name is
 * reachable and must be handed to the standard contactability chase, not marked
 * unreachable.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));
vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));

import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { buildPropertyLeadNurtureConfig, LEAD_SEQUENCE_NAMES } from "@/config/lead-nurture";

const config = buildPropertyLeadNurtureConfig("detail_capture");

beforeEach(() => vi.clearAllMocks());

describe("detail-capture phone-aware exhaustion", () => {
  it("marks a lead with no usable phone as unreachable (never re-enrols)", async () => {
    (adminSelect as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: [{ full_name: "", phone: "" }],
    });
    await config.onSequenceExhausted!("lead-1");
    expect(adminUpdate).toHaveBeenCalledWith(
      "leads",
      expect.objectContaining({ id: "eq.lead-1", status: "in.(new,nurturing)" }),
      { status: "unreachable" },
    );
    expect(adminInsert).not.toHaveBeenCalled();
  });

  it("re-enrols a reachable (phone present, name missing) lead into contactability", async () => {
    (adminSelect as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      data: [{ full_name: "", phone: "07700900000" }],
    });
    await config.onSequenceExhausted!("lead-2");
    expect(adminInsert).toHaveBeenCalledWith(
      "lead_nurture_state",
      expect.objectContaining({
        lead_id: "lead-2",
        sequence: LEAD_SEQUENCE_NAMES.contactability,
        step: 0,
        status: "active",
      }),
      expect.objectContaining({ onConflict: "lead_id,sequence", ignoreDuplicates: true }),
    );
    const unreachableCalls = (adminUpdate as unknown as ReturnType<typeof vi.fn>).mock.calls.filter(
      (c: unknown[]) => (c[2] as { status?: string })?.status === "unreachable",
    );
    expect(unreachableCalls).toHaveLength(0);
  });
});
