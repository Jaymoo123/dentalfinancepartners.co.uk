/**
 * Missing-contact routing tests: the single source of truth that decides which
 * primary sequence a lead enters and how the detail-capture copy phrases its ask.
 * Pure functions; no DB (the admin/niche mocks only exist because importing
 * @/config/lead-nurture pulls those modules at load time).
 */
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
}));
vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));

import {
  computeMissingContact,
  phoneDigitCount,
  nameMeetsFloor,
  phoneMeetsFloor,
} from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import {
  routePrimarySequence,
  missingPhraseFor,
  ctaLabelFor,
  LEAD_SEQUENCE_NAMES,
} from "@/config/lead-nurture";

describe("computeMissingContact", () => {
  it("returns [] for a name + valid phone", () => {
    expect(computeMissingContact({ full_name: "Alex Smith", phone: "07700900000" })).toEqual([]);
  });
  it("returns [name,phone] when both are blank", () => {
    expect(computeMissingContact({ full_name: "", phone: "" })).toEqual(["name", "phone"]);
  });
  it("returns [phone] when only the phone is missing", () => {
    expect(computeMissingContact({ full_name: "Alex Smith", phone: "" })).toEqual(["phone"]);
  });
  it("returns [name] when only the name is missing", () => {
    expect(computeMissingContact({ full_name: "", phone: "07700900000" })).toEqual(["name"]);
  });
  it("treats null fields as missing", () => {
    expect(computeMissingContact({ full_name: null, phone: null })).toEqual(["name", "phone"]);
  });

  it("honours the name floor at the boundary (2 chars)", () => {
    expect(nameMeetsFloor("A")).toBe(false);
    expect(nameMeetsFloor("Al")).toBe(true);
  });
  it("honours the phone floor at the boundary (10 digits)", () => {
    expect(phoneMeetsFloor("123456789")).toBe(false); // 9
    expect(phoneMeetsFloor("1234567890")).toBe(true); // 10
  });
  it("counts digits, ignoring formatting", () => {
    expect(phoneDigitCount("+44 7700 900000")).toBe(12);
    expect(phoneMeetsFloor("+44 7700 900000")).toBe(true);
  });
});

describe("routePrimarySequence", () => {
  it("routes a complete lead to contactability", () => {
    expect(routePrimarySequence({ full_name: "Alex Smith", phone: "07700900000" })).toBe(
      LEAD_SEQUENCE_NAMES.contactability,
    );
  });
  it("routes each missing combination to detail-capture", () => {
    expect(routePrimarySequence({ full_name: "", phone: "" })).toBe(
      LEAD_SEQUENCE_NAMES.detail_capture,
    );
    expect(routePrimarySequence({ full_name: "Alex Smith", phone: "" })).toBe(
      LEAD_SEQUENCE_NAMES.detail_capture,
    );
    expect(routePrimarySequence({ full_name: "", phone: "07700900000" })).toBe(
      LEAD_SEQUENCE_NAMES.detail_capture,
    );
  });
});

describe("missingPhraseFor", () => {
  it("phrases each combination naturally and empty for none", () => {
    expect(missingPhraseFor(["name", "phone"])).toBe("your name and a phone number");
    expect(missingPhraseFor(["phone"])).toBe("a phone number we can reach you on");
    expect(missingPhraseFor(["name"])).toBe("your name");
    expect(missingPhraseFor([])).toBe("");
  });
});

describe("ctaLabelFor", () => {
  it("labels the CTA by the missing field(s)", () => {
    expect(ctaLabelFor(["name", "phone"])).toBe("Add your details");
    expect(ctaLabelFor(["phone"])).toBe("Add your number");
    expect(ctaLabelFor(["name"])).toBe("Add your name");
    expect(ctaLabelFor([])).toBe("Add your details");
    expect(ctaLabelFor(undefined)).toBe("Add your details");
  });
});
