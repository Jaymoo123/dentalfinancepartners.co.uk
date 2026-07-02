/**
 * Tests for the AI call brief module (lib/leads/call-brief.ts).
 *
 * buildCallBrief is tested directly by mocking @/lib/ai/anthropic so no real
 * HTTP calls are made. The real qaGateMessage (pure function) is used so the
 * QA-gate failure path is exercised against the genuine rule set.
 *
 * renderBriefSection is a pure render helper with no dependencies, tested
 * without any mocks.
 *
 * Note on handoff rendering: sendContactableHandoff pulls in Supabase,
 * Resend, lead-routing, and the full dossier pipeline. Rather than replicate
 * all those mocks here we test the render seam directly via renderBriefSection,
 * which is the function handoff.ts calls to produce the HTML and text blocks.
 * This matches the guidance in the task spec ("extract/verify via the render
 * helper").
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock @anthropic-ai/sdk before any imports that might load it ──────────────

vi.mock("@anthropic-ai/sdk", () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: { create: vi.fn() },
  })),
}));

// ── Mock @/lib/ai/anthropic ───────────────────────────────────────────────────

const mockGenerateJson = vi.fn();
const mockAnthropicConfigured = vi.fn(() => true);

vi.mock("@/lib/ai/anthropic", () => ({
  anthropicConfigured: () => mockAnthropicConfigured(),
  generateJson: (...args: unknown[]) => mockGenerateJson(...args),
  MODELS: {
    haiku: "claude-haiku-4-5",
    sonnet: "claude-sonnet-4-6",
    opus: "claude-opus-4-8",
  },
}));

// ── Mock @/lib/supabase/admin (loaded transitively via dossier.ts) ────────────

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => false,
  adminSelect: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminInsert: vi.fn(() => Promise.resolve({ ok: true, status: 201, data: [] })),
  adminUpdate: vi.fn(() => Promise.resolve({ ok: true, status: 200, data: [] })),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

// ── Imports after mock registration ──────────────────────────────────────────

import { buildCallBrief, renderBriefSection, type CallBrief } from "@/lib/leads/call-brief";
import type { LeadDossier } from "@/lib/leads/dossier";

// ── Shared fixtures ───────────────────────────────────────────────────────────

const sampleDossier: LeadDossier = {
  verification: {
    phone_status: "valid_mobile",
    phone_carrier: "EE",
    phone_e164: "+447700900123",
    email_status: "deliverable",
  },
  enrichment: {
    intent_category: "section24",
    quality_score: 4,
    summary: "Landlord wants to understand the impact of Section 24 on their buy-to-let portfolio.",
    ch_company_name: null,
    ch_company_number: null,
    ch_company_status: null,
  },
  journey: {
    totalSessions: 2,
    totalEngagedMs: 360000,
    pageViews: 8,
    device: "mobile",
    country: "GB",
    referrerHost: "google.com",
    topPages: [{ path: "/blog/section-24-landlords", views: 3 }],
    calcEvents: 1,
  },
  timeline: [
    { ts: "2026-07-01T09:00:00Z", label: "Submitted the enquiry", detail: null },
    {
      ts: "2026-07-01T10:00:00Z",
      label: "They replied by SMS",
      detail: "Yes, happy to chat this week.",
    },
  ],
  replies: [
    { ts: "2026-07-01T10:00:00Z", channel: "sms", body: "Yes, happy to chat this week." },
  ],
  bookingStart: null,
  responseLatencyMs: 3_600_000,
  callWindow: "They respond in the mornings (8am to 12pm)",
  touchesBeforeResponse: 1,
  readiness: {
    score: 7,
    grade: "A",
    reasons: [
      "Verified live UK mobile",
      "Replied by SMS/WhatsApp from the verified number",
    ],
  },
};

const goodBriefPayload = {
  opening: "Thanks for getting in touch about your portfolio.",
  theirGoal: "Understand the tax position on their buy-to-let properties.",
  suggestedAngle: "Start by confirming the portfolio size and whether they use interest-only mortgages.",
  bestWindow: "They replied in the morning so calling before noon should work well.",
};

// ── buildCallBrief ────────────────────────────────────────────────────────────

describe("buildCallBrief()", () => {
  beforeEach(() => {
    mockGenerateJson.mockReset();
    mockAnthropicConfigured.mockReturnValue(true);
  });

  it("happy path: returns all four fields when generateJson succeeds and QA passes", async () => {
    mockGenerateJson.mockResolvedValue(goodBriefPayload);

    const result = await buildCallBrief(sampleDossier);

    expect(result).not.toBeNull();
    expect(result?.opening).toBe(goodBriefPayload.opening);
    expect(result?.theirGoal).toBe(goodBriefPayload.theirGoal);
    expect(result?.suggestedAngle).toBe(goodBriefPayload.suggestedAngle);
    expect(result?.bestWindow).toBe(goodBriefPayload.bestWindow);
    expect(mockGenerateJson).toHaveBeenCalledOnce();
  });

  it("uses the sonnet model tier", async () => {
    mockGenerateJson.mockResolvedValue(goodBriefPayload);

    await buildCallBrief(sampleDossier);

    const callOpts = mockGenerateJson.mock.calls[0][0] as { model?: string };
    expect(callOpts.model).toBe("sonnet");
  });

  it("QA gate failure: returns null when generated output contains an em-dash", async () => {
    // Inject an em-dash (U+2014) into the opening field.
    mockGenerateJson.mockResolvedValue({
      ...goodBriefPayload,
      opening: "Good afternoon — ready to help with your enquiry.",
    });

    const result = await buildCallBrief(sampleDossier);

    expect(result).toBeNull();
  });

  it("unconfigured: returns null without calling generateJson", async () => {
    mockAnthropicConfigured.mockReturnValue(false);

    const result = await buildCallBrief(sampleDossier);

    expect(result).toBeNull();
    expect(mockGenerateJson).not.toHaveBeenCalled();
  });

  it("returns null when generateJson returns null (API failure)", async () => {
    mockGenerateJson.mockResolvedValue(null);

    const result = await buildCallBrief(sampleDossier);

    expect(result).toBeNull();
  });

  it("returns null without throwing when generateJson throws", async () => {
    mockGenerateJson.mockRejectedValue(new Error("network error"));

    await expect(buildCallBrief(sampleDossier)).resolves.toBeNull();
  });
});

// ── renderBriefSection ────────────────────────────────────────────────────────

describe("renderBriefSection()", () => {
  const sampleBrief: CallBrief = {
    opening: "Great to connect with you about your portfolio.",
    theirGoal: "Understand their options under Section 24.",
    suggestedAngle: "Focus on confirming the portfolio setup and financing arrangement.",
    bestWindow: "They replied in the morning, so call before noon.",
  };

  it("renders the HTML section with all four fields when brief is present", () => {
    const { html } = renderBriefSection(sampleBrief);

    expect(html).toContain("How to open this call");
    expect(html).toContain("Great to connect with you about your portfolio");
    expect(html).toContain("Understand their options under Section 24");
    expect(html).toContain("Focus on confirming the portfolio setup");
    expect(html).toContain("They replied in the morning, so call before noon");
  });

  it("renders the plain-text section with all four fields when brief is present", () => {
    const { text } = renderBriefSection(sampleBrief);

    expect(text).toContain("HOW TO OPEN THIS CALL");
    expect(text).toContain("Opening: Great to connect with you about your portfolio");
    expect(text).toContain("Their goal: Understand their options under Section 24");
    expect(text).toContain("Suggested angle:");
    expect(text).toContain("Best window: They replied in the morning");
  });

  it("HTML contains no em-dashes", () => {
    const { html } = renderBriefSection(sampleBrief);
    expect(html).not.toMatch(/—|–/);
  });

  it("escapes HTML special characters in field values", () => {
    const briefWithSpecialChars: CallBrief = {
      ...sampleBrief,
      opening: "Ask about their <portfolio> & tax position.",
    };
    const { html } = renderBriefSection(briefWithSpecialChars);
    expect(html).toContain("&lt;portfolio&gt;");
    expect(html).toContain("&amp;");
    expect(html).not.toContain("<portfolio>");
  });

  it("returns empty html and text strings when brief is null (clean degradation)", () => {
    const { html, text } = renderBriefSection(null);

    expect(html).toBe("");
    expect(text).toBe("");
  });

  it("HTML section renders after the grade badge block (no section present when null)", () => {
    // When null, interpolating into the handoff template produces no extra content.
    const template = `<p>Grade A</p>${renderBriefSection(null).html}<table>detail</table>`;
    expect(template).toBe("<p>Grade A</p><table>detail</table>");
  });

  it("HTML section is present when brief is non-null", () => {
    const template = `<p>Grade A</p>${renderBriefSection(sampleBrief).html}<table>detail</table>`;
    expect(template).toContain("How to open this call");
    expect(template).toContain("<p>Grade A</p>");
    expect(template).toContain("<table>detail</table>");
  });
});
