import { describe, it, expect } from "vitest";
import type { LeadSubmission } from "./supabase-client";
import { getSupabaseConfig } from "./supabase-client";

describe("supabase-client", () => {
  it("getSupabaseConfig returns an object with supabaseUrl and supabaseKey keys", () => {
    const cfg = getSupabaseConfig();
    expect(cfg).toHaveProperty("supabaseUrl");
    expect(cfg).toHaveProperty("supabaseKey");
  });

  it("getSupabaseConfig returns undefined values when env vars are unset", () => {
    const cfg = getSupabaseConfig();
    // In the test environment no Supabase env vars are set
    expect(cfg.supabaseUrl).toBeUndefined();
    expect(cfg.supabaseKey).toBeUndefined();
  });
});

describe("LeadSubmission contract — extras field (GAP-4)", () => {
  // Baseline fixture covering every required field.
  const base: LeadSubmission = {
    full_name: "Jane Smith",
    email: "jane@example.com",
    phone: "07700900123",
    role: "owner",
    message: "Hello",
    source: "property",
    source_url: "https://example.com/contact",
    submitted_at: "2026-06-11T00:00:00.000Z",
    consent_given: true,
    consent_text: "I agree to share details.",
    consent_at: "2026-06-11T00:00:00.000Z",
  };

  it("LeadSubmission type accepts a payload with no extras (type round-trip)", () => {
    // TypeScript enforces the shape at compile time; this runtime assertion
    // confirms the object literal satisfies the interface without extras.
    const submission: LeadSubmission = { ...base };
    expect(submission).not.toHaveProperty("extras");
  });

  it("LeadSubmission type accepts a payload with extras present (type round-trip)", () => {
    const submission: LeadSubmission = {
      ...base,
      extras: { practice_type: "NHS", uda_band: "high" },
    };
    expect(submission.extras).toEqual({ practice_type: "NHS", uda_band: "high" });
  });

  it("extras serialises correctly when present", () => {
    const submission: LeadSubmission = {
      ...base,
      extras: { firm_type: "LLP", fee_earners: 12 },
    };
    const json = JSON.parse(JSON.stringify(submission)) as Record<string, unknown>;
    expect(json).toHaveProperty("extras");
    expect(json["extras"]).toEqual({ firm_type: "LLP", fee_earners: 12 });
  });

  it("extras is absent (not null) when not provided", () => {
    const submission: LeadSubmission = { ...base };
    const json = JSON.parse(JSON.stringify(submission)) as Record<string, unknown>;
    // JSON.stringify omits undefined keys; null would appear. This confirms omission.
    expect(Object.prototype.hasOwnProperty.call(json, "extras")).toBe(false);
  });

  it("extras accepts arbitrary Record<string, unknown> values including nested objects", () => {
    const submission: LeadSubmission = {
      ...base,
      extras: { score: 42, tags: ["urgent", "new"], meta: { source: "wizard" } },
    };
    const json = JSON.parse(JSON.stringify(submission)) as { extras: Record<string, unknown> };
    expect(json.extras["score"]).toBe(42);
    expect(json.extras["tags"]).toEqual(["urgent", "new"]);
    expect(json.extras["meta"]).toEqual({ source: "wizard" });
  });

  it("payload without extras does not send the key (no null sentinel)", () => {
    // Simulates what submitLead serialises to the network: JSON.stringify of a
    // payload object that was built without an extras key must not include extras.
    const payload: LeadSubmission = { ...base };
    const serialised = JSON.stringify(payload);
    expect(serialised).not.toContain('"extras"');
  });
});
