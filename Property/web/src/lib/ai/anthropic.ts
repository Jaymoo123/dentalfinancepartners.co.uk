/**
 * Server-only wrapper around @anthropic-ai/sdk.
 *
 * Estate rule: callers NEVER pass name / email / phone to this module.
 * This is the single named Anthropic processor for lead-facing AI (GDPR art. 28).
 * Data minimisation is the caller's responsibility, not enforced here.
 */
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Model registry
// ---------------------------------------------------------------------------

export const MODELS = {
  haiku: "claude-haiku-4-5",
  sonnet: "claude-sonnet-4-6",
  opus: "claude-opus-4-8",
} as const;
export type ModelTier = keyof typeof MODELS;

// ---------------------------------------------------------------------------
// Client (lazy singleton)
// ---------------------------------------------------------------------------

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

// ---------------------------------------------------------------------------
// Config check
// ---------------------------------------------------------------------------

/** True when ANTHROPIC_API_KEY is set (server-side). */
export function anthropicConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

// ---------------------------------------------------------------------------
// Internal helper: build system param with optional cache_control
// ---------------------------------------------------------------------------

type SystemParam =
  | string
  | Array<{ type: "text"; text: string; cache_control?: { type: "ephemeral" } }>;

function buildSystem(system: string, cache: boolean | undefined): SystemParam {
  if (!cache) return system;
  return [{ type: "text", text: system, cache_control: { type: "ephemeral" } }];
}

// ---------------------------------------------------------------------------
// generateJson
// ---------------------------------------------------------------------------

/**
 * Structured JSON generation validated by zod. Default model "sonnet".
 * Uses a single forced tool ("emit") whose input_schema = z.toJSONSchema(schema).
 * Validates the tool input with schema.safeParse. Returns null on any failure.
 */
export async function generateJson<T>(opts: {
  model?: ModelTier;
  system: string;
  prompt: string;
  schema: z.ZodType<T>;
  maxTokens?: number;
  cacheSystem?: boolean;
}): Promise<T | null> {
  if (!anthropicConfigured()) return null;

  const modelId = MODELS[opts.model ?? "sonnet"];
  const inputSchema = z.toJSONSchema(opts.schema) as Record<string, unknown>;

  // Strip $schema key: Anthropic does not accept it in input_schema
  const { $schema: _drop, ...cleanSchema } = inputSchema as { $schema?: unknown } & Record<string, unknown>;

  try {
    const response = await getClient().messages.create({
      model: modelId,
      max_tokens: opts.maxTokens ?? 2048,
      temperature: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      system: buildSystem(opts.system, opts.cacheSystem) as any,
      tools: [
        {
          name: "emit",
          description: "Emit the structured result.",
          input_schema: cleanSchema as Anthropic.Tool["input_schema"],
        },
      ],
      tool_choice: { type: "tool", name: "emit" },
      messages: [{ role: "user", content: opts.prompt }],
    });

    if (response.stop_reason === "refusal") return null;

    const block = response.content.find((b) => b.type === "tool_use");
    if (!block || block.type !== "tool_use") return null;

    const parsed = opts.schema.safeParse(block.input);
    if (!parsed.success) return null;
    return parsed.data;
  } catch (err) {
    console.error("[ai/anthropic] generateJson failed", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// classify
// ---------------------------------------------------------------------------

/**
 * Classify into exactly one label. Haiku, temperature 0, forced tool choice.
 * Returns null on ANY failure (unconfigured, API error, invalid output).
 */
export async function classify<T extends string>(opts: {
  system: string;
  prompt: string;
  labels: readonly T[];
  cacheSystem?: boolean;
}): Promise<T | null> {
  const schema = z.enum(opts.labels as [T, ...T[]]);
  const result = await generateJson({
    model: "haiku",
    system: opts.system,
    prompt: opts.prompt,
    schema,
    maxTokens: 64,
    cacheSystem: opts.cacheSystem,
  });
  return result ?? null;
}

// ---------------------------------------------------------------------------
// judge
// ---------------------------------------------------------------------------

/** Opus-tier judging; same mechanics as generateJson with model "opus". */
export async function judge<T>(opts: {
  system: string;
  prompt: string;
  schema: z.ZodType<T>;
  maxTokens?: number;
}): Promise<T | null> {
  return generateJson({ ...opts, model: "opus" });
}
