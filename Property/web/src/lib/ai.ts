/**
 * Lead intelligence via the Vercel AI Gateway (Opus only, per the house rule:
 * no DeepSeek/Haiku, all reasoning through Opus 4.8). The gateway is addressed by
 * the plain "provider/model" string, which auto-routes with zero data retention;
 * on Vercel it authenticates via OIDC (no key), locally it needs AI_GATEWAY_API_KEY.
 *
 * Fail-open: every export returns null on any error (gateway unavailable, parse
 * failure, etc.) so the enrich path degrades gracefully and never blocks a lead.
 */
import { generateObject } from "ai";
import { z } from "zod";
import { surfaceLabel } from "./leads/role-labels";

const MODEL = "anthropic/claude-opus-4-8";

/** Intent buckets aligned to the site's real demand (incorporation/structuring lead). */
export const INTENT_CATEGORIES = [
  "incorporation",
  "section24",
  "cgt",
  "portfolio_structuring",
  "mtd",
  "non_resident",
  "accountancy_services",
  "general_info",
  "other",
] as const;
export type IntentCategory = (typeof INTENT_CATEGORIES)[number];

export interface LeadClassification {
  intent_category: IntentCategory;
  /** Model confidence in the category, 0..1. */
  intent_confidence: number;
  /** Value/seriousness proxy, 1 (tyre-kicker / info-only) .. 5 (high-value, ready to act). */
  quality_score: number;
  /** One-line, neutral summary of what they want (no added PII). */
  summary: string;
  /** Any company names mentioned, for a best-effort Companies House lookup. */
  company_names: string[];
}

const schema = z.object({
  intent_category: z.enum(INTENT_CATEGORIES),
  intent_confidence: z.number().min(0).max(1),
  quality_score: z.number().int().min(1).max(5),
  summary: z.string().max(200),
  company_names: z.array(z.string()).max(5),
});

/** True when the gateway has a chance of authenticating (Vercel runtime or a local key). */
export function aiConfigured(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL,
  );
}

const SYSTEM = [
  "You classify inbound enquiries to a UK property-tax lead-generation site that hands leads to specialist accountants.",
  "The site's highest-value demand is landlords asking about incorporating a portfolio and company structuring.",
  "Return ONLY the structured fields. Do not give tax advice.",
  "intent_category: pick the single best fit.",
  "quality_score rubric (value to the partner firm): 5 = serious, high-value (portfolio incorporation, multiple properties, clear intent to engage, complex structuring). 3 = a genuine individual question with some substance. 1 = vague, info-only, off-topic, or likely a tyre-kicker.",
  "summary: one neutral sentence describing what they want. Do not invent details.",
  "company_names: extract any company/LTD names mentioned verbatim; empty array if none.",
].join(" ");

/** Classify one lead's free-text message. Returns null on any failure. */
export async function classifyLead(input: {
  message: string;
  role?: string;
  sourceUrl?: string;
  role_detail?: string;
  form_id?: string;
}): Promise<LeadClassification | null> {
  const message = (input.message || "").trim();
  if (!message) return null;
  try {
    const { object } = await generateObject({
      model: MODEL,
      schema,
      system: SYSTEM,
      prompt: `Enquiry message:\n"""${message.slice(0, 4000)}"""\n\nRole given: ${input.role ?? "unknown"}${input.role_detail ? `\nRole detail (their own words): ${input.role_detail}` : ""}\nCapture surface: ${input.form_id ? (surfaceLabel(input.form_id) ?? input.form_id) : "unknown"}\nSubmitted from page: ${input.sourceUrl ?? "unknown"}\n\nClassify this enquiry.`,
      temperature: 0,
    });
    return object as LeadClassification;
  } catch (err) {
    console.error("[ai] classifyLead failed", err);
    return null;
  }
}

export const AI_MODEL_ID = MODEL;
