/**
 * Lead sequence golden tests: structure, copy quality, variant branching,
 * generatedCopy override, vip_sameday gating, header presence.
 *
 * No network, no DB: all builds are from static ctx objects.
 */

import { describe, it, expect, vi } from "vitest";

// The enquiry-message helpers write into enquiry-message.ts which may call no
// external modules, so no mock needed there. But buildLeadMessageContext reads
// from @/lib/supabase/admin and config/niche-loader; we only call the static
// sequence builders here, not buildLeadMessageContext.
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
  buildPropertyLeadNurtureConfig,
  t0Variant,
} from "@/config/lead-nurture";
import type { LeadMessageContext } from "@accounting-network/web-shared/lead-nurture/config";

// ── Shared fixtures ───────────────────────────────────────────────────────────

const BASE_CTX: LeadMessageContext = {
  firstName: "Alex",
  bookingUrl: "https://www.propertytaxpartners.co.uk/book?t=tok123",
  confirmUrl: "https://www.propertytaxpartners.co.uk/api/leads/confirm/tok456",
  optOutUrl: "https://www.propertytaxpartners.co.uk/api/leads/optout/tok789",
  optOutText: "Reply STOP to opt out.",
  siteUrl: "https://www.propertytaxpartners.co.uk",
  callGoalEcho: "understand your Section 24 position",
  variant: "t0_branded",
  qualityScore: 3,
};

const BRANDED_CTX: LeadMessageContext = { ...BASE_CTX, variant: "t0_branded" };
const PERSONAL_CTX: LeadMessageContext = { ...BASE_CTX, variant: "t0_personal" };
const VIP_CTX: LeadMessageContext = { ...BASE_CTX, qualityScore: 5 };

const config = buildPropertyLeadNurtureConfig();
const { steps } = config;

// ── 1. Sequence shape ─────────────────────────────────────────────────────────

describe("sequence shape", () => {
  const EXPECTED_KEYS = [
    "t0_email",
    "t0_sms",
    "vip_sameday",
    "day1_sms",
    "day2_give_email",
    "day4_sms",
    "day7_email",
    "breakup_day11",
  ];

  it("has exactly 8 steps", () => {
    expect(steps).toHaveLength(8);
  });

  it("has the exact keys in the correct order", () => {
    expect(steps.map((s) => s.key)).toEqual(EXPECTED_KEYS);
  });

  it("has the correct delayHours for each step", () => {
    const delays: Record<string, number> = {
      t0_email: 0,
      t0_sms: 0,
      vip_sameday: 4,
      day1_sms: 20,
      day2_give_email: 24,
      day4_sms: 48,
      day7_email: 72,
      breakup_day11: 96,
    };
    for (const step of steps) {
      expect(step.delayHours, `delayHours for ${step.key}`).toBe(delays[step.key]);
    }
  });

  it("has the correct channels declared for each step", () => {
    const channelMap: Record<string, string[]> = {
      t0_email: ["email"],
      t0_sms: ["sms", "whatsapp"],
      vip_sameday: ["sms"],
      day1_sms: ["sms", "whatsapp"],
      day2_give_email: ["email"],
      day4_sms: ["sms", "whatsapp"],
      // day7_email declares both channels: email is the default path;
      // sms is used when engagementVariant === "channel_shift".
      day7_email: ["email", "sms"],
      breakup_day11: ["email"],
    };
    for (const step of steps) {
      expect(step.channels ?? [], `channels for ${step.key}`).toEqual(channelMap[step.key]);
    }
  });

  it("day7_email has preferMonday: true", () => {
    const day7 = steps.find((s) => s.key === "day7_email");
    expect(day7?.preferMonday).toBe(true);
  });

  it("nextActionAt is defined on the config", () => {
    expect(typeof config.nextActionAt).toBe("function");
  });
});

// ── 2. No em/en dash anywhere in copy ────────────────────────────────────────

describe("no em/en dash in copy", () => {
  it("t0_branded: no em-dash or en-dash", () => {
    for (const step of steps) {
      for (const m of step.buildMessages(BRANDED_CTX)) {
        const blob = [m.subject, m.html, m.text, m.body].filter(Boolean).join(" ");
        expect(blob, `step ${step.key} (branded)`).not.toContain("—");
        expect(blob, `step ${step.key} (branded)`).not.toContain("–");
      }
    }
  });

  it("t0_personal: no em-dash or en-dash", () => {
    for (const step of steps) {
      for (const m of step.buildMessages(PERSONAL_CTX)) {
        const blob = [m.subject, m.html, m.text, m.body].filter(Boolean).join(" ");
        expect(blob, `step ${step.key} (personal)`).not.toContain("—");
        expect(blob, `step ${step.key} (personal)`).not.toContain("–");
      }
    }
  });
});

// ── 3. SMS quality ────────────────────────────────────────────────────────────

describe("SMS messages", () => {
  const smsMsgs = steps.flatMap((s) => s.buildMessages(VIP_CTX)).filter((m) => m.channel === "sms");

  it("every SMS is reply-based (Reply YES) with no booking link", () => {
    for (const m of smsMsgs) {
      expect(m.body?.toUpperCase(), `SMS must invite a reply`).toContain("REPLY YES");
      expect(m.body, `SMS must not link to a form`).not.toContain("/book");
    }
  });

  it("every SMS contains 'STOP' (case-insensitive opt-out instruction)", () => {
    for (const m of smsMsgs) {
      expect(m.body?.toUpperCase(), `SMS body must contain STOP`).toContain("STOP");
    }
  });
});

// ── 4. vip_sameday gating ────────────────────────────────────────────────────

describe("vip_sameday", () => {
  const step = steps.find((s) => s.key === "vip_sameday")!;

  it("returns [] for qualityScore 3", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, qualityScore: 3 });
    expect(msgs).toHaveLength(0);
  });

  it("returns [] for qualityScore undefined", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, qualityScore: undefined });
    expect(msgs).toHaveLength(0);
  });

  it("returns one SMS for qualityScore 5", () => {
    const msgs = step.buildMessages({ ...BASE_CTX, qualityScore: 5 });
    expect(msgs).toHaveLength(1);
    expect(msgs[0].channel).toBe("sms");
  });
});

// ── 5. t0_email variants ──────────────────────────────────────────────────────

describe("t0_email variants", () => {
  const step = steps.find((s) => s.key === "t0_email")!;

  it("t0_email is a single reply-based email with no link", () => {
    const msgs = step.buildMessages(BRANDED_CTX);
    expect(msgs).toHaveLength(1);
    const m = msgs[0];
    expect(m.channel).toBe("email");
    // Reply-based: no booking button, no links in the body.
    expect(m.html).not.toContain("Pick a time for your review");
    expect(m.html).not.toContain("http");
    expect(m.text?.toLowerCase()).toContain("reply");
    expect(m.html).toContain("The next step is a short call");
  });
});

// ── 6. t0Variant is deterministic and covers both arms ────────────────────────

describe("t0Variant", () => {
  // These two UUIDs are chosen to produce both arms; verified by manual hash.
  // If the hash function changes this test will catch it.
  const branded = "00000000-0000-0000-0000-000000000000";
  const personal = "00000000-0000-0000-0000-000000000001";

  it("is deterministic: same input always returns same variant", () => {
    expect(t0Variant(branded)).toBe(t0Variant(branded));
    expect(t0Variant(personal)).toBe(t0Variant(personal));
  });

  it("both arms are reachable (at least one branded and one personal across two UUIDs)", () => {
    const variants = new Set([t0Variant(branded), t0Variant(personal)]);
    expect(variants.size).toBe(2);
    expect(variants.has("t0_branded")).toBe(true);
    expect(variants.has("t0_personal")).toBe(true);
  });
});

// ── 7. generatedCopy override ────────────────────────────────────────────────

describe("generatedCopy override", () => {
  it("day1_sms uses generated sms body when present and non-empty", () => {
    const generatedSms = "GENERATED: custom copy for day1_sms";
    const ctxWithGen: LeadMessageContext = {
      ...BASE_CTX,
      qualityScore: 5,
      generatedCopy: {
        day1_sms: { sms: generatedSms },
      },
    };
    const step = steps.find((s) => s.key === "day1_sms")!;
    const msgs = step.buildMessages(ctxWithGen);
    const sms = msgs.find((m) => m.channel === "sms");
    expect(sms?.body).toBe(generatedSms);
  });

  it("day1_sms falls back to static copy when generatedCopy is absent", () => {
    const ctxNoGen: LeadMessageContext = { ...BASE_CTX, qualityScore: 5, generatedCopy: null };
    const step = steps.find((s) => s.key === "day1_sms")!;
    const msgs = step.buildMessages(ctxNoGen);
    const sms = msgs.find((m) => m.channel === "sms");
    expect(sms?.body).toContain("Reply YES");
    expect(sms?.body).not.toContain("GENERATED");
  });
});

// ── 8. List-Unsubscribe headers on email steps ───────────────────────────────

describe("email List-Unsubscribe headers", () => {
  const emailSteps = steps.filter((s) => (s.channels ?? []).includes("email"));

  it("every email step carries List-Unsubscribe when optOutUrl is set", () => {
    for (const step of emailSteps) {
      const msgs = step.buildMessages(BRANDED_CTX);
      for (const m of msgs.filter((msg) => msg.channel === "email")) {
        expect(m.headers?.["List-Unsubscribe"], `${step.key} List-Unsubscribe`).toBeTruthy();
        expect(m.headers?.["List-Unsubscribe-Post"], `${step.key} List-Unsubscribe-Post`).toBe(
          "List-Unsubscribe=One-Click",
        );
        expect(m.headers?.["List-Unsubscribe"]).toContain(BRANDED_CTX.optOutUrl);
      }
    }
  });

  it("t0_personal also carries List-Unsubscribe headers", () => {
    const step = steps.find((s) => s.key === "t0_email")!;
    const msgs = step.buildMessages(PERSONAL_CTX);
    const m = msgs.find((msg) => msg.channel === "email")!;
    expect(m.headers?.["List-Unsubscribe"]).toContain(PERSONAL_CTX.optOutUrl);
  });
});
