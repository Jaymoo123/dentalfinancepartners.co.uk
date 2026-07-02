/**
 * Tests for lib/leads/sequence-gen.ts
 *
 * Mocks the Anthropic wrapper and Supabase admin layer so no network
 * calls are made. Tests verify:
 *   1. disabled flag -> {status:"disabled"}
 *   2. model failure -> "failed" + copy_status stored as "failed"
 *   3. happy path: one step with an em-dash is dropped (QA fail) -> "partial"
 *   4. regen cap: no-op at 2 regenerations
 *   5. regeneration only touches unsent steps (at or after current step index)
 *
 * British English. No em-dashes.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// Hoist mock references so they can be used inside vi.mock() factories.
// vi.hoisted() runs before vi.mock() calls which are themselves hoisted to
// the top of the file by vitest.
// ---------------------------------------------------------------------------

const { mockGenerateJson, mockAdminUpdate, mockAdminSelect, mockAdminInsert } =
  vi.hoisted(() => ({
    mockGenerateJson: vi.fn(),
    mockAdminUpdate: vi.fn(async () => ({
      ok: true,
      status: 200,
      data: [] as unknown[],
    })),
    mockAdminSelect: vi.fn(),
    mockAdminInsert: vi.fn(async () => ({
      ok: true,
      status: 201,
      data: [] as unknown[],
    })),
  }));

// ---------------------------------------------------------------------------
// In-memory DB (populated per test, read by mockAdminSelect)
// ---------------------------------------------------------------------------

type Row = Record<string, unknown>;

const db: Record<string, Row[]> = {
  leads: [],
  lead_enrichment: [],
  lead_contact_events: [],
  lead_nurture_state: [],
  vw_visitor_journey: [],
  web_events: [],
};

function resetDb() {
  for (const key of Object.keys(db)) {
    db[key] = [];
  }
}

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit", "is_bot"].includes(k)) continue;
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    } else if (raw.startsWith("gte.")) {
      const val = new Date(raw.slice(4)).getTime();
      const rowVal = new Date(String(row[k])).getTime();
      if (rowVal < val) return false;
    }
  }
  return true;
}

// Wire mockAdminSelect to the in-memory db
mockAdminSelect.mockImplementation(
  (table: string, params: Record<string, string>) =>
    Promise.resolve({
      ok: true,
      status: 200,
      data: (db[table] ?? []).filter((r) => matches(r, params)),
    }),
);

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("@/lib/ai/anthropic", () => ({
  generateJson: mockGenerateJson,
  anthropicConfigured: () => true,
}));

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: mockAdminSelect,
  adminInsert: mockAdminInsert,
  adminUpdate: mockAdminUpdate,
  adminDelete: vi.fn(async () => ({ ok: true, status: 204, data: [] })),
}));

vi.mock("@/config/niche-loader", () => ({
  getSiteUrl: () => "https://www.propertytaxpartners.co.uk",
}));

// Mint a stable fake token without needing LEAD_NURTURE_TOKEN_SECRET set
vi.mock("@accounting-network/web-shared/lead-nurture/tokens", () => ({
  mintLeadToken: (_leadId: string, intent: string) => `fake-token-${intent}`,
}));

// t0Variant always returns branded in tests (stable, avoids hash dependency)
vi.mock("@/config/lead-nurture", () => ({
  t0Variant: () => "t0_branded",
}));

// Keep enquiry-message and dossier helpers real (pure, no imports that need mocking)

// ---------------------------------------------------------------------------
// Import system under test AFTER mocks
// ---------------------------------------------------------------------------

import {
  copyAiEnabled,
  generateLeadSequenceCopy,
  regenerateLeadCopy,
} from "@/lib/leads/sequence-gen";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const LEAD_ID = "test-lead-1234";

function seedLead(overrides: Partial<Row> = {}) {
  db.leads.push({
    id: LEAD_ID,
    full_name: "Sam Jones",
    role: "Landlord",
    message:
      "Situation: I own two buy-to-let properties and need help with Section 24.\n\nPrompted by: my accountant suggested I get specialist advice\n\nWants from call: understand my options",
    source: "property",
    visitor_id: null,
    ...overrides,
  });
}

function seedNurtureState(overrides: Partial<Row> = {}) {
  db.lead_nurture_state.push({
    lead_id: LEAD_ID,
    step: 0,
    generated_copy: null,
    copy_status: null,
    best_send_hour: null,
    ...overrides,
  });
}

// A complete set of 6 step outputs that all pass QA
function goodSteps() {
  return {
    steps: [
      {
        key: "t0_email",
        subject: "Got your enquiry, {{firstName}}. Here is what happens next.",
        preheader: "A property tax specialist will call.",
        paragraphs: [
          "Thanks for getting in touch. I have read what you sent us, and wanting to understand your Section 24 position is exactly what our specialists handle.",
          "The next step is a short call, no charge and no obligation. Pick a time here: {{bookingUrl}}",
          "Or just reply to this email and we will call you.",
        ],
      },
      {
        key: "day1_sms",
        sms: "Hi {{firstName}}, following up on your property tax review. We have time set aside for your Section 24 question. Book here: {{bookingUrl}} Reply STOP to opt out.",
      },
      {
        key: "day2_give_email",
        subject: "Two things worth having to hand, {{firstName}}",
        preheader: "A quick way to see your numbers before we speak.",
        paragraphs: [
          "While you decide on a time, here are a couple of things that make these calls more useful.",
          "First, it helps to have a rough idea of your figures to hand. Nothing formal, the specialist works with whatever you have.",
          "Second, your review will cover where you stand today and the options that apply to your position. Book here: {{bookingUrl}}",
        ],
      },
      {
        key: "day4_sms",
        sms: "Hi {{firstName}}, Property Tax Partners here. Most landlords with a Section 24 question find one short call clears up months of uncertainty. Book: {{bookingUrl}} Reply STOP to opt out.",
      },
      {
        key: "day7_email",
        subject: "Still here whenever the timing is right, {{firstName}}",
        preheader: "No rush. One short conversation whenever it suits.",
        paragraphs: [
          "New week, so a quick note. Your free review is still open. No rush at all.",
          "Whenever you are ready, it is one minute to book: {{bookingUrl}}",
        ],
      },
      {
        key: "breakup_day11",
        subject: "We will leave it there for now, {{firstName}}",
        preheader: "The door stays open.",
        paragraphs: [
          "We have reached out a few times so we will stop the reminders now and leave the ball in your court.",
          "One parting thought: the moments most worth a quick review are a new purchase, a sale, or your Self Assessment bill. We are one message away.",
          "Your booking link stays live: {{bookingUrl}}",
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  resetDb();
  vi.clearAllMocks();
  // Re-wire select after clearAllMocks
  mockAdminSelect.mockImplementation(
    (table: string, params: Record<string, string>) =>
      Promise.resolve({
        ok: true,
        status: 200,
        data: (db[table] ?? []).filter((r) => matches(r, params)),
      }),
  );
  mockAdminUpdate.mockResolvedValue({ ok: true, status: 200, data: [] });
  mockAdminInsert.mockResolvedValue({ ok: true, status: 201, data: [] });
});

// ---------------------------------------------------------------------------
// 1. Disabled flag
// ---------------------------------------------------------------------------

describe("copyAiEnabled", () => {
  it("returns false when LEAD_COPY_AI_ENABLED is not set", () => {
    const orig = process.env.LEAD_COPY_AI_ENABLED;
    delete process.env.LEAD_COPY_AI_ENABLED;
    expect(copyAiEnabled()).toBe(false);
    if (orig !== undefined) process.env.LEAD_COPY_AI_ENABLED = orig;
  });

  it("returns false when LEAD_COPY_AI_ENABLED is 'false'", () => {
    const orig = process.env.LEAD_COPY_AI_ENABLED;
    process.env.LEAD_COPY_AI_ENABLED = "false";
    expect(copyAiEnabled()).toBe(false);
    if (orig !== undefined) {
      process.env.LEAD_COPY_AI_ENABLED = orig;
    } else {
      delete process.env.LEAD_COPY_AI_ENABLED;
    }
  });
});

describe("generateLeadSequenceCopy - disabled", () => {
  it("returns {status:'disabled'} when LEAD_COPY_AI_ENABLED is not 'true'", async () => {
    delete process.env.LEAD_COPY_AI_ENABLED;

    const result = await generateLeadSequenceCopy(LEAD_ID);
    expect(result.status).toBe("disabled");
    expect(mockGenerateJson).not.toHaveBeenCalled();
  });

  it("returns {status:'disabled'} for test leads (source='test')", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead({ source: "test" });

    const result = await generateLeadSequenceCopy(LEAD_ID);
    expect(result.status).toBe("disabled");
    expect(mockGenerateJson).not.toHaveBeenCalled();

    delete process.env.LEAD_COPY_AI_ENABLED;
  });
});

// ---------------------------------------------------------------------------
// 2. Model failure -> "failed" + copy_status stored as "failed"
// ---------------------------------------------------------------------------

describe("generateLeadSequenceCopy - model failure", () => {
  it("returns {status:'failed'} and stores copy_status='failed' when generateJson returns null", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();
    mockGenerateJson.mockResolvedValueOnce(null);

    const result = await generateLeadSequenceCopy(LEAD_ID);
    expect(result.status).toBe("failed");

    // Verify adminUpdate was called with copy_status="failed"
    expect(mockAdminUpdate).toHaveBeenCalledOnce();
    const [, , patch] = (mockAdminUpdate.mock.calls[0] as unknown) as [
      string,
      unknown,
      Record<string, unknown>,
    ];
    expect(patch.copy_status).toBe("failed");

    delete process.env.LEAD_COPY_AI_ENABLED;
  });
});

// ---------------------------------------------------------------------------
// 3. Happy path + em-dash step dropped -> "partial"
// ---------------------------------------------------------------------------

describe("generateLeadSequenceCopy - QA filtering", () => {
  it("drops the step with an em-dash and stores only the passing step -> 'partial'", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();

    // t0_email has an em-dash in the subject -> QA fail
    // day1_sms is clean -> QA pass
    mockGenerateJson.mockResolvedValueOnce({
      steps: [
        {
          key: "t0_email",
          subject: "Your property tax enquiry — a quick note", // em-dash (U+2014)
          preheader: "We have read your enquiry.",
          paragraphs: [
            "Hi {{firstName}}, thanks for your enquiry.",
            "We would love to help. Pick a time here: {{bookingUrl}}",
          ],
        },
        {
          key: "day1_sms",
          sms: "Hi {{firstName}}, following up on your property tax review. Book here: {{bookingUrl}} Reply STOP to opt out.",
        },
      ],
    });

    const result = await generateLeadSequenceCopy(LEAD_ID);
    expect(result.status).toBe("partial");

    expect(mockAdminUpdate).toHaveBeenCalledOnce();
    const [, , patch] = (mockAdminUpdate.mock.calls[0] as unknown) as [
      string,
      unknown,
      Record<string, unknown>,
    ];
    expect(patch.copy_status).toBe("partial");

    const stored = patch.generated_copy as Record<string, unknown>;
    // day1_sms present; t0_email absent (failed QA)
    expect(stored).toHaveProperty("day1_sms");
    expect(stored).not.toHaveProperty("t0_email");

    // day1_sms should be fully resolved: placeholder replaced with real value
    const smsEntry = stored.day1_sms as { sms?: string };
    expect(smsEntry.sms).toContain("Sam"); // firstName resolved
    expect(smsEntry.sms).not.toContain("{{firstName}}");
    expect(smsEntry.sms).toContain("Reply STOP to opt out.");

    delete process.env.LEAD_COPY_AI_ENABLED;
  });

  it("all 6 steps passing -> 'ready' with fully resolved copy", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();

    mockGenerateJson.mockResolvedValueOnce(goodSteps());

    const result = await generateLeadSequenceCopy(LEAD_ID);
    expect(result.status).toBe("ready");

    expect(mockAdminUpdate).toHaveBeenCalledOnce();
    const [, , patch] = (mockAdminUpdate.mock.calls[0] as unknown) as [
      string,
      unknown,
      Record<string, unknown>,
    ];
    expect(patch.copy_status).toBe("ready");

    const stored = patch.generated_copy as Record<string, unknown>;
    const expectedKeys = [
      "t0_email",
      "day1_sms",
      "day2_give_email",
      "day4_sms",
      "day7_email",
      "breakup_day11",
    ];
    for (const key of expectedKeys) {
      expect(stored, `${key} should be stored`).toHaveProperty(key);
    }

    // Subject should be resolved (no placeholder remaining)
    const t0 = stored.t0_email as { subject?: string; paragraphs?: string[] };
    expect(t0.subject).not.toContain("{{firstName}}");
    expect(t0.subject).toContain("Sam");

    // _meta should be present with regens=0
    const meta = stored._meta as { regens: number };
    expect(meta.regens).toBe(0);

    delete process.env.LEAD_COPY_AI_ENABLED;
  });
});

// ---------------------------------------------------------------------------
// 4. Regen cap at 2
// ---------------------------------------------------------------------------

describe("regenerateLeadCopy - cap", () => {
  it("is a no-op when _meta.regens is already 2", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();
    seedNurtureState({
      step: 3,
      generated_copy: {
        t0_email: { subject: "Existing copy", paragraphs: ["Para one."] },
        _meta: { regens: 2, generatedAt: new Date().toISOString() },
      },
    });

    await regenerateLeadCopy(LEAD_ID);

    expect(mockGenerateJson).not.toHaveBeenCalled();
    expect(mockAdminUpdate).not.toHaveBeenCalled();

    delete process.env.LEAD_COPY_AI_ENABLED;
  });

  it("is a no-op when _meta.regens exceeds 2", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();
    seedNurtureState({
      step: 3,
      generated_copy: {
        _meta: { regens: 5, generatedAt: new Date().toISOString() },
      },
    });

    await regenerateLeadCopy(LEAD_ID);

    expect(mockGenerateJson).not.toHaveBeenCalled();
    expect(mockAdminUpdate).not.toHaveBeenCalled();

    delete process.env.LEAD_COPY_AI_ENABLED;
  });
});

// ---------------------------------------------------------------------------
// 5. Regeneration only touches unsent steps
// ---------------------------------------------------------------------------

describe("regenerateLeadCopy - unsent steps only", () => {
  it("skips t0_email (stepsIdx=0) when current step is 3 (day1_sms), merges remaining", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();

    // step=3 means day1_sms is the current step (stepsIdx 3). t0_email has stepsIdx 0 < 3.
    // t0_email in existing copy should NOT be overwritten.
    seedNurtureState({
      step: 3,
      generated_copy: {
        t0_email: {
          subject: "Original t0 subject",
          paragraphs: [
            "Original para one.",
            "Link: https://www.propertytaxpartners.co.uk/book?t=fake-token-book",
          ],
        },
        _meta: { regens: 0, generatedAt: new Date().toISOString() },
      },
    });

    // Even though AI returns all 6 steps, only day1_sms onwards should be applied
    mockGenerateJson.mockResolvedValueOnce(goodSteps());

    await regenerateLeadCopy(LEAD_ID);

    expect(mockGenerateJson).toHaveBeenCalledOnce();
    expect(mockAdminUpdate).toHaveBeenCalledOnce();

    const [, , patch] = (mockAdminUpdate.mock.calls[0] as unknown) as [
      string,
      unknown,
      Record<string, unknown>,
    ];
    const stored = patch.generated_copy as Record<string, unknown>;

    // t0_email must retain original (not overwritten, since stepsIdx 0 < currentStep 3)
    const t0 = stored.t0_email as { subject?: string };
    expect(t0.subject).toBe("Original t0 subject");

    // Steps at stepsIdx >= 3 should be present from AI output
    expect(stored).toHaveProperty("day1_sms");
    expect(stored).toHaveProperty("day2_give_email");
    expect(stored).toHaveProperty("day4_sms");
    expect(stored).toHaveProperty("day7_email");
    expect(stored).toHaveProperty("breakup_day11");

    // _meta.regens incremented from 0 to 1
    const meta = stored._meta as { regens: number };
    expect(meta.regens).toBe(1);

    delete process.env.LEAD_COPY_AI_ENABLED;
  });

  it("increments regens from 1 to 2 on second successful regeneration", async () => {
    process.env.LEAD_COPY_AI_ENABLED = "true";
    seedLead();
    seedNurtureState({
      step: 0,
      generated_copy: {
        _meta: { regens: 1, generatedAt: new Date().toISOString() },
      },
    });

    mockGenerateJson.mockResolvedValueOnce(goodSteps());

    await regenerateLeadCopy(LEAD_ID);

    expect(mockAdminUpdate).toHaveBeenCalledOnce();
    const [, , patch] = (mockAdminUpdate.mock.calls[0] as unknown) as [
      string,
      unknown,
      Record<string, unknown>,
    ];
    const stored = patch.generated_copy as Record<string, unknown>;
    const meta = stored._meta as { regens: number };
    expect(meta.regens).toBe(2);

    delete process.env.LEAD_COPY_AI_ENABLED;
  });
});
