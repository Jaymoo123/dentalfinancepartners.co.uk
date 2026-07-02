/**
 * Unit tests for the thin @anthropic-ai/sdk wrapper (lib/ai/anthropic.ts).
 * The SDK is fully mocked so no real HTTP calls are made.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Mock @anthropic-ai/sdk before importing the module under test
// ---------------------------------------------------------------------------

const mockCreate = vi.fn();

vi.mock("@anthropic-ai/sdk", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: { create: mockCreate },
    })),
  };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeToolUseResponse(input: unknown, stopReason = "tool_use") {
  return {
    stop_reason: stopReason,
    content: [{ type: "tool_use", name: "emit", input }],
  };
}

// ---------------------------------------------------------------------------
// Import after mock registration
// ---------------------------------------------------------------------------

import {
  anthropicConfigured,
  generateJson,
  classify,
  judge,
  MODELS,
} from "@/lib/ai/anthropic";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("anthropicConfigured()", () => {
  it("returns false when ANTHROPIC_API_KEY is not set", () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect(anthropicConfigured()).toBe(false);
  });

  it("returns true when ANTHROPIC_API_KEY is set", () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    expect(anthropicConfigured()).toBe(true);
    delete process.env.ANTHROPIC_API_KEY;
  });
});

describe("MODELS registry", () => {
  it("exposes haiku / sonnet / opus model ids", () => {
    expect(MODELS.haiku).toBe("claude-haiku-4-5");
    expect(MODELS.sonnet).toBe("claude-sonnet-4-6");
    expect(MODELS.opus).toBe("claude-opus-4-8");
  });
});

describe("generateJson()", () => {
  const schema = z.object({ value: z.string() });

  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    mockCreate.mockReset();
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  // (1) unconfigured => null without calling SDK
  it("returns null without calling the SDK when ANTHROPIC_API_KEY is missing", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const result = await generateJson({
      system: "s",
      prompt: "p",
      schema,
    });
    expect(result).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  // (2) valid tool_use output => parsed object
  it("returns the parsed object on a valid tool_use response", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ value: "hello" }));
    const result = await generateJson({
      system: "sys",
      prompt: "prompt",
      schema,
    });
    expect(result).toEqual({ value: "hello" });
  });

  // (3) schema-invalid tool input => null
  it("returns null when tool input does not match the schema", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ wrong_key: 42 }));
    const result = await generateJson({
      system: "sys",
      prompt: "prompt",
      schema,
    });
    expect(result).toBeNull();
  });

  // (4) SDK throw => null
  it("returns null when the SDK throws", async () => {
    mockCreate.mockRejectedValue(new Error("network error"));
    const result = await generateJson({
      system: "sys",
      prompt: "prompt",
      schema,
    });
    expect(result).toBeNull();
  });

  it("returns null when stop_reason is refusal", async () => {
    mockCreate.mockResolvedValue({
      stop_reason: "refusal",
      content: [],
    });
    const result = await generateJson({
      system: "sys",
      prompt: "prompt",
      schema,
    });
    expect(result).toBeNull();
  });

  it("returns null when content contains no tool_use block", async () => {
    mockCreate.mockResolvedValue({
      stop_reason: "end_turn",
      content: [{ type: "text", text: "oops" }],
    });
    const result = await generateJson({
      system: "sys",
      prompt: "prompt",
      schema,
    });
    expect(result).toBeNull();
  });

  it("passes cacheSystem as an array system block", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ value: "ok" }));
    await generateJson({ system: "cached", prompt: "p", schema, cacheSystem: true });
    const call = mockCreate.mock.calls[0][0];
    expect(Array.isArray(call.system)).toBe(true);
    expect(call.system[0]).toMatchObject({
      type: "text",
      text: "cached",
      cache_control: { type: "ephemeral" },
    });
  });

  it("uses the correct model id for 'opus'", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ value: "x" }));
    await generateJson({ model: "opus", system: "s", prompt: "p", schema });
    expect(mockCreate.mock.calls[0][0].model).toBe(MODELS.opus);
  });

  it("forces tool_choice to the emit tool", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ value: "x" }));
    await generateJson({ system: "s", prompt: "p", schema });
    const call = mockCreate.mock.calls[0][0];
    expect(call.tool_choice).toEqual({ type: "tool", name: "emit" });
    expect(call.tools[0].name).toBe("emit");
  });
});

// (5) classify: returns a label from the set; returns null on garbage
describe("classify()", () => {
  const labels = ["yes", "no", "maybe"] as const;

  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    mockCreate.mockReset();
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("returns a valid label when the model outputs one", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse("yes"));
    const result = await classify({ system: "s", prompt: "p", labels });
    expect(result).toBe("yes");
  });

  it("returns null when the model outputs a value outside the label set", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse("unknown_label"));
    const result = await classify({ system: "s", prompt: "p", labels });
    expect(result).toBeNull();
  });

  it("uses the haiku model for classification", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse("no"));
    await classify({ system: "s", prompt: "p", labels });
    expect(mockCreate.mock.calls[0][0].model).toBe(MODELS.haiku);
  });

  it("returns null without calling SDK when unconfigured", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const result = await classify({ system: "s", prompt: "p", labels });
    expect(result).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
  });
});

describe("judge()", () => {
  const schema = z.object({ verdict: z.boolean() });

  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    mockCreate.mockReset();
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("uses the opus model", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ verdict: true }));
    await judge({ system: "s", prompt: "p", schema });
    expect(mockCreate.mock.calls[0][0].model).toBe(MODELS.opus);
  });

  it("returns the parsed result", async () => {
    mockCreate.mockResolvedValue(makeToolUseResponse({ verdict: false }));
    const result = await judge({ system: "s", prompt: "p", schema });
    expect(result).toEqual({ verdict: false });
  });
});
