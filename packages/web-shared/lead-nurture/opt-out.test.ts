/**
 * Estate-wide opt-out mirror tests. Mocks the admin REST layer and asserts the
 * exact PostgREST call shapes, because the mirror's correctness IS its filters:
 * same-person match (phone OR email), never self, stop every sequence, close
 * only new/nurturing, and swallow every failure (a mirror error must never
 * block the primary opt-out).
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

const adminSelect = vi.fn();
const adminUpdate = vi.fn();
const adminInsert = vi.fn();

vi.mock("../nurture/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => adminSelect(...args),
  adminUpdate: (...args: unknown[]) => adminUpdate(...args),
  adminInsert: (...args: unknown[]) => adminInsert(...args),
  adminDelete: vi.fn(),
}));

import { mirrorOptOutToSiblings } from "./opt-out.js";

const SELF = { id: "lead-self" };

function selfRow(phone: string | null, email: string | null) {
  return { ok: true, status: 200, data: [{ phone, email }] };
}

beforeEach(() => {
  vi.clearAllMocks();
  adminInsert.mockResolvedValue({ ok: true, status: 201, data: [{}] });
  adminUpdate.mockResolvedValue({ ok: true, status: 200, data: [] });
});

describe("mirrorOptOutToSiblings", () => {
  it("matches siblings by phone OR email, never itself, capped at 20", async () => {
    adminSelect
      .mockResolvedValueOnce(selfRow("+447700900001", "sam@example.com"))
      .mockResolvedValueOnce({ ok: true, status: 200, data: [{ id: "sib-1" }, { id: "sib-2" }] });

    await mirrorOptOutToSiblings(SELF.id, "sms");

    const [table, params] = adminSelect.mock.calls[1];
    expect(table).toBe("leads");
    expect(params.or).toBe("(phone.eq.+447700900001,email.eq.sam@example.com)");
    expect(params.id).toBe(`neq.${SELF.id}`);
    expect(params.limit).toBe("20");
  });

  it("phone-only lead builds a phone-only filter; email-only builds email-only", async () => {
    adminSelect
      .mockResolvedValueOnce(selfRow("+447700900001", null))
      .mockResolvedValueOnce({ ok: true, status: 200, data: [] });
    await mirrorOptOutToSiblings(SELF.id, "sms");
    expect(adminSelect.mock.calls[1][1].or).toBe("(phone.eq.+447700900001)");

    adminSelect.mockClear();
    adminSelect
      .mockResolvedValueOnce(selfRow(null, "sam@example.com"))
      .mockResolvedValueOnce({ ok: true, status: 200, data: [] });
    await mirrorOptOutToSiblings(SELF.id, "email");
    expect(adminSelect.mock.calls[1][1].or).toBe("(email.eq.sam@example.com)");
  });

  it("neither phone nor email: no sibling query at all", async () => {
    adminSelect.mockResolvedValueOnce(selfRow(null, null));
    await mirrorOptOutToSiblings(SELF.id, "web");
    expect(adminSelect).toHaveBeenCalledTimes(1);
    expect(adminInsert).not.toHaveBeenCalled();
    expect(adminUpdate).not.toHaveBeenCalled();
  });

  it("per sibling: mirrored opted_out event, all sequences stopped, only new/nurturing closed", async () => {
    adminSelect
      .mockResolvedValueOnce(selfRow("+447700900001", "sam@example.com"))
      .mockResolvedValueOnce({ ok: true, status: 200, data: [{ id: "sib-1" }] });

    await mirrorOptOutToSiblings(SELF.id, "sms");

    // Event: recordLeadContactEvent -> adminInsert("lead_contact_events", ...)
    const evCall = adminInsert.mock.calls.find((c) => c[0] === "lead_contact_events");
    expect(evCall?.[1]).toMatchObject({
      lead_id: "sib-1",
      event_type: "opted_out",
      channel: "sms",
      meta: expect.objectContaining({ mirrored_from: SELF.id }),
    });

    // Nurture stop: every sequence for the sibling (no sequence filter).
    const stateCall = adminUpdate.mock.calls.find((c) => c[0] === "lead_nurture_state");
    expect(stateCall?.[1]).toMatchObject({ lead_id: "eq.sib-1" });
    expect(stateCall?.[1].sequence).toBeUndefined();
    expect(stateCall?.[2]).toMatchObject({ status: "stopped", next_action_at: null });

    // Lead close: guarded to new/nurturing so contactable/forwarded never regress.
    const leadCall = adminUpdate.mock.calls.find((c) => c[0] === "leads");
    expect(leadCall?.[1]).toMatchObject({ id: "eq.sib-1", status: "in.(new,nurturing)" });
    expect(leadCall?.[2]).toMatchObject({ status: "closed" });
  });

  it("swallows a total DB failure without throwing", async () => {
    adminSelect.mockRejectedValueOnce(new Error("db down"));
    await expect(mirrorOptOutToSiblings(SELF.id, "sms")).resolves.toBeUndefined();
  });

  it("swallows per-sibling update failures and still processes the event", async () => {
    adminSelect
      .mockResolvedValueOnce(selfRow("+447700900001", null))
      .mockResolvedValueOnce({ ok: true, status: 200, data: [{ id: "sib-1" }] });
    adminUpdate.mockRejectedValue(new Error("update down"));

    await expect(mirrorOptOutToSiblings(SELF.id, "sms")).resolves.toBeUndefined();
    expect(adminInsert).toHaveBeenCalled();
  });
});
