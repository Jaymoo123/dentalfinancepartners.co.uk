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

// Gateway slugs use dots for versions ("claude-opus-4.8"); the hyphenated
// Anthropic-style id 400s at the gateway. Verified against /v1/models 2026-08-20.
const MODEL = "anthropic/claude-opus-4.8";

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

// ---------------------------------------------------------------------------
// Case-tier rubric classification (docs/CLASSIFY.md)
// ---------------------------------------------------------------------------

export const CASE_TIER_VALUES = ["advisory", "standard", "essential"] as const;
export type CaseTier = (typeof CASE_TIER_VALUES)[number];

export interface CaseClassification {
  tier: CaseTier;
  /** One sentence, max 15 words, no names/contact details/company names. */
  intent_line: string;
  /** Short tag from the published lists, e.g. "incorporation", "basic_return". */
  case_type: string;
  /** Rough geography if stated, else "". */
  area: string;
}

const caseSchema = z.object({
  tier: z.enum(CASE_TIER_VALUES),
  intent_line: z.string().max(120),
  case_type: z.string().max(60),
  area: z.string().max(80),
});

/**
 * The classification prompt from docs/CLASSIFY.md ("Use verbatim"), which a
 * drift test pins to the fenced block in that file. Do not edit here; edit
 * CLASSIFY.md and mirror.
 */
export const CASE_TIER_PROMPT = `You grade enquiries for a UK lead distribution service. Given an enquiry
(message plus form fields), assign exactly one tier by matching the work the
enquirer describes against these case-type lists:

advisory: incorporation; ownership restructuring; CGT planning; SDLT;
non-resident or expat; charity or CIO formation or structuring; historic
records reconstruction; multi-property or multi-entity portfolio structuring.

standard: landlord self assessment with any complicating factor; SME accounts
and company filings; compliance mixed with advice that does not itself reach
an advisory case type.

essential: single straightforward return; basic compliance; verified but too
vague to evidence more.

Rules:
- Grade only on what the enquiry evidences, never on inferred client value.
- When in doubt between two tiers, output the lower tier.
- intent_line: one sentence, max 15 words, stating what the enquirer wants.
  No names, no contact details, no company names, no exact addresses.
- case_type: one short tag from the lists above (e.g. "incorporation",
  "landlord_sa_complex", "basic_return").
- area: rough geographic area if stated (e.g. "Greater Manchester"), else "".

Output strict JSON only, no prose, matching:
{"tier": "advisory" | "standard" | "essential",
 "intent_line": "<string>",
 "case_type": "<string>",
 "area": "<string>"}`;

// Worked examples from CLASSIFY.md as few-shot turns; the grade-down example
// is the one models most often get wrong.
const CASE_TIER_EXAMPLES = `Examples:

Enquiry: "I own 6 buy-to-lets in a partnership with my brother and want to know if moving them into a limited company makes sense before April."
Output: {"tier": "advisory", "intent_line": "Wants advice on incorporating a six-property partnership portfolio.", "case_type": "incorporation", "area": ""}

Enquiry: "Landlord with 2 properties, one jointly owned with my wife. Need this year's self assessment done, last accountant retired."
Output: {"tier": "standard", "intent_line": "Needs self assessment for two properties including jointly owned income.", "case_type": "landlord_sa_complex", "area": ""}

Enquiry: "Need my tax return sorted, self employed, nothing complicated. Based in Leeds."
Output: {"tier": "essential", "intent_line": "Wants a straightforward self-employed tax return prepared.", "case_type": "basic_return", "area": "Leeds"}

Enquiry: "I have a rental property, need help with my taxes."
Output: {"tier": "essential", "intent_line": "Landlord with one property wants help with tax affairs.", "case_type": "basic_return", "area": ""}`;

/**
 * Tier-classifier model override. The AI Gateway free tier gates Anthropic
 * and DeepSeek models behind paid credits; LEAD_TIER_MODEL lets grading run
 * on a free-tier model (e.g. openai/gpt-oss-120b) until the account is topped
 * up, at which point unsetting it restores the module default (Opus).
 */
function caseTierModel(): string {
  return (process.env.LEAD_TIER_MODEL || "").trim() || MODEL;
}

/**
 * Grade one enquiry against the published rubric. Returns null on any failure
 * (module convention); callers fall back to the deterministic stub or to the
 * owner's own tier pick, never to an unattended guess.
 */
export async function classifyCaseTier(input: {
  message: string;
  source?: string;
  role?: string;
}): Promise<CaseClassification | null> {
  const message = (input.message || "").trim();
  if (!message) return null;
  try {
    const { object } = await generateObject({
      model: caseTierModel(),
      schema: caseSchema,
      system: `${CASE_TIER_PROMPT}\n\n${CASE_TIER_EXAMPLES}`,
      prompt: `Enquiry message:\n"""${message.slice(0, 4000)}"""\n\nSource site: ${input.source ?? "unknown"}\nRole given: ${input.role ?? "unknown"}\n\nGrade this enquiry.`,
      temperature: 0,
    });
    return object as CaseClassification;
  } catch (err) {
    console.error("[ai] classifyCaseTier failed", err);
    return null;
  }
}

export const AI_MODEL_ID = MODEL;

// ---------------------------------------------------------------------------
// Enquiry redaction + verification (two-pass, owner decision 2026-08-20)
// ---------------------------------------------------------------------------
//
// Regex redaction was retired 2026-08-20 after a live leak: an enquiry naming
// "KAN.AI ... Edinburgh" passed the pattern layer verbatim (no Ltd suffix, no
// contact details). Free-text identifiers, misspellings and obfuscations are
// not pattern-matchable, so redaction is now two AI passes over the gateway:
// pass 1 rewrites the enquiry with bracketed tokens, pass 2 independently
// verifies the result carries no identifiers. Callers must treat any failure
// as FAIL-CLOSED: no verified text, no free text sent anywhere.
//
// Both passes are pinned to MODEL (Opus): LEAD_TIER_MODEL exists only as a
// free-tier stopgap for grading and must never route compliance redaction.

export interface RedactedEnquiry {
  /** The enquiry in the enquirer's own words, identifiers tokenised. */
  redacted_message: string;
  /** One-line anonymised summary for the buyer alert; may be "". */
  situation: string;
  /** Near-verbatim scheduling/contact-preference content of their replies,
   *  identifiers tokenised; "" when the replies carry none. */
  availability: string;
}

const redactSchema = z.object({
  redacted_message: z.string().max(2400),
  situation: z.string().max(480),
  availability: z.string().max(400),
});

const REDACT_SYSTEM = `You anonymise inbound enquiries to UK accountancy firms so they can be shown
to prospective buyer firms BEFORE any purchase. Rewrite the enquiry in the
enquirer's own words, replacing every identifying detail with a bracketed
token: [NAME], [COMPANY], [EMAIL], [PHONE], [POSTCODE], [ADDRESS], [LOCATION],
[LINK], [HANDLE].

Rules, absolute:
- Remove ALL names of people, companies, brands, trading names, employers,
  charities, websites, apps and products, however written: with or without a
  legal suffix, misspelled, split across words, or obfuscated ("kan dot ai"
  is still a company name).
- Replace towns, cities, streets and any location more specific than a UK
  nation or broad region with [LOCATION].
- Remove emails, phone numbers, postcodes, URLs and social handles even when
  malformed or disguised.
- Keep every tax-relevant fact: amounts, property counts, deadlines, HMRC
  interactions, structures, sector ("an AI health startup" is fine once the
  name is tokenised), dispute points.
- Keep the enquirer's own wording and tone wherever it is not identifying.
- situation: one to three sentences summarising the situation for a buyer firm.
  This paraphrase is the ONLY free text the buyer sees before purchasing, so
  cover every fact they need to price and decide (work type, complexity,
  amounts, deadlines, urgency). Sell the situation, never the person; no
  identifiers at all, and never quote the enquirer's own phrasing. Empty
  string if the message is too thin.
- availability: only when later replies are provided. Extract the scheduling
  and contact-preference content ALMOST VERBATIM: call-time availability,
  days, timezone, preferred channel (phone, Teams, Zoom, WhatsApp). Tokenise
  any identifier exactly as above; drop greetings, sign-offs, names and
  everything unrelated to scheduling. Empty string when there are no replies
  or they carry no scheduling content.
- Plain British English. No em-dashes.`;

/** Pass 1: rewrite the enquiry with identifiers tokenised. Null on any failure. */
export async function redactEnquiry(input: {
  message: string;
  role?: string;
  /** Verbatim bodies of the enquirer's later replies, newest first. */
  replies?: string[];
}): Promise<RedactedEnquiry | null> {
  const message = (input.message || "").trim();
  if (!message) return null;
  const replies = (input.replies ?? []).map((r) => (r || "").trim()).filter(Boolean);
  const repliesBlock = replies.length
    ? `\n\nTheir later replies (newest first):\n${replies
        .map((r) => `"""${r.slice(0, 1500)}"""`)
        .join("\n")}`
    : "";
  try {
    const { object } = await generateObject({
      model: MODEL,
      schema: redactSchema,
      system: REDACT_SYSTEM,
      prompt: `Enquiry message:\n"""${message.slice(0, 4000)}"""\n\nRole given: ${input.role ?? "unknown"}${repliesBlock}\n\nAnonymise this enquiry.`,
      temperature: 0,
    });
    return object as RedactedEnquiry;
  } catch (err) {
    console.error("[ai] redactEnquiry failed", err);
    return null;
  }
}

const verifySchema = z.object({
  clean: z.boolean(),
  issues: z.array(z.string()).max(10),
});

const VERIFY_SYSTEM = `You are the final compliance check before an anonymised enquiry leaves the
business. You are given one or more texts. Decide whether they are clean:
containing nothing that could help identify a specific person or business.

Flag as NOT clean if any text contains: a personal name; a company, brand,
product, app or trading name (with or without Ltd/LLP/PLC, including
misspelled or obfuscated forms); an email address, phone number, postcode,
street address, URL or social handle, however malformed; a place name more
specific than a UK nation or broad region; or a combination of details so
distinctive it likely identifies one person or firm.

Bracketed redaction tokens like [COMPANY] or [LOCATION] are fine. Generic
sector descriptions are fine. When in doubt, NOT clean.`;

/**
 * Pass 2: independent no-identifier check over the exact strings that will be
 * sent. Unlike the rest of this module this FAILS CLOSED: any error, gateway
 * outage or doubt returns false, and the caller must withhold the text.
 */
export async function verifyNoIdentifiers(texts: string[]): Promise<boolean> {
  const nonEmpty = texts.map((t) => (t || "").trim()).filter(Boolean);
  if (nonEmpty.length === 0) return false;
  try {
    const { object } = await generateObject({
      model: MODEL,
      schema: verifySchema,
      system: VERIFY_SYSTEM,
      prompt: `Texts to check:\n${nonEmpty.map((t, i) => `--- text ${i + 1} ---\n${t}`).join("\n")}\n\nAre these clean?`,
      temperature: 0,
    });
    const verdict = object as { clean: boolean; issues: string[] };
    if (!verdict.clean) console.warn("[ai] verifyNoIdentifiers flagged", verdict.issues);
    return verdict.clean === true;
  } catch (err) {
    console.error("[ai] verifyNoIdentifiers failed", err);
    return false;
  }
}
