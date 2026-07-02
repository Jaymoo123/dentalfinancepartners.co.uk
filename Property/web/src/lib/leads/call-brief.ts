/**
 * AI "DJH call brief" for the Property Tax Partners handoff dossier.
 *
 * buildCallBrief: generates a concise four-field brief for the accountant
 * who will phone the lead. Best-effort -- returns null when Anthropic is
 * unconfigured, when the API call fails, or when the output fails the QA
 * gate. Never throws.
 *
 * renderBriefSection: pure render helper. Takes the brief (or null) and
 * returns the HTML block and plain-text equivalent ready to splice into the
 * handoff email. Returns empty strings when brief is null so the caller can
 * interpolate safely without extra conditionals in the template.
 */

import { z } from "zod";
import { anthropicConfigured, generateJson } from "@/lib/ai/anthropic";
import { qaGateMessage } from "@/lib/ai/qa-gate";
import { humanisePath, type LeadDossier } from "@/lib/leads/dossier";
import { copyAiEnabled } from "@/lib/leads/sequence-gen";

// The URL used by the QA gate to validate any links in the output.
// The brief is text-only (no URLs expected), but the gate still needs an origin.
const SITE_URL = "https://www.propertytaxpartners.co.uk";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CallBrief {
  /** Natural first line for the accountant to say when the call connects. */
  opening: string;
  /** One plain-English sentence: what the lead wants to achieve. */
  theirGoal: string;
  /** How to frame the conversation: tone and focus, no advice or figures. */
  suggestedAngle: string;
  /** When to call and why, drawn from the data. */
  bestWindow: string;
}

// ── Zod schema (each field capped at 300 chars) ───────────────────────────────

const briefSchema = z.object({
  opening: z.string().max(300),
  theirGoal: z.string().max(300),
  suggestedAngle: z.string().max(300),
  bestWindow: z.string().max(300),
});

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT =
  "You are preparing a brief for an accountant at Property Tax Partners who is about to phone a lead. " +
  "Produce four short fields only. " +
  "Rules: no em-dashes, no en-dashes, British English throughout, no tax advice, " +
  "no promised outcomes or savings, no figures (no pound signs or percentages), " +
  "no credential claims.\n\n" +
  "opening: A natural, warm first sentence to say when the call connects, " +
  "referencing the lead's own words or stated goal. Under 300 characters.\n" +
  "theirGoal: One plain-English sentence describing what the lead wants to achieve. Under 300 characters.\n" +
  "suggestedAngle: How to frame the conversation in tone and focus. " +
  "Never promise an outcome or give tax advice. Under 300 characters.\n" +
  "bestWindow: When to call and why, based on the data provided. Under 300 characters.";

// ── buildCallBrief ────────────────────────────────────────────────────────────

/**
 * Generates the call brief from the gathered dossier plus the lead's verbatim
 * enquiry (the three labelled answers from the guided composer). The verbatim
 * text is what lets the opening line reference their own words; the enrichment
 * summary alone is a lossy paraphrase. Other inputs: intent category and
 * quality score, readiness grade and reasons, best call window, booked slot
 * label, top pages read, and verbatim reply excerpts from the nurture sequence.
 *
 * Returns null on any error or QA failure.
 */
export async function buildCallBrief(
  dossier: LeadDossier,
  enquiryMessage?: string | null,
): Promise<CallBrief | null> {
  if (!anthropicConfigured()) return null;
  if (!copyAiEnabled()) return null;

  try {
    const enr = dossier.enrichment;
    const readiness = dossier.readiness;

    const replyLines = dossier.replies
      .slice(0, 3)
      .map((r, i) => `Reply ${i + 1} (${r.channel}): "${r.body}"`);

    const topPagesList = (dossier.journey?.topPages ?? [])
      .slice(0, 5)
      .map((p) => humanisePath(p.path));

    const promptParts: string[] = [
      enquiryMessage?.trim()
        ? `Their enquiry, verbatim (their own words; ground the opening line in these):\n"""${enquiryMessage.trim().slice(0, 1500)}"""`
        : null,
      enr.intent_category ? `Intent category: ${enr.intent_category}` : null,
      enr.quality_score != null ? `Quality score: ${enr.quality_score}/5` : null,
      enr.summary ? `AI summary of their enquiry: ${enr.summary}` : null,
      `Readiness grade: ${readiness.grade} (${readiness.score}/10)`,
      `Why this grade: ${readiness.reasons.join("; ")}`,
      dossier.callWindow
        ? `Best call window from their response history: ${dossier.callWindow}`
        : null,
      dossier.bookingStart
        ? `They have booked a callback slot at: ${dossier.bookingStart}`
        : null,
      topPagesList.length
        ? `Pages they read on site: ${topPagesList.join(", ")}`
        : null,
      replyLines.length
        ? `Their verbatim replies from the nurture sequence:\n${replyLines.join("\n")}`
        : null,
    ].filter((x): x is string => x !== null);

    const result = await generateJson({
      model: "sonnet",
      system: SYSTEM_PROMPT,
      prompt: promptParts.join("\n"),
      schema: briefSchema,
      maxTokens: 512,
    });

    if (!result) return null;

    // QA gate: concatenate all four fields and run the brief check.
    const combined = [
      result.opening,
      result.theirGoal,
      result.suggestedAngle,
      result.bestWindow,
    ].join(" ");

    const qa = qaGateMessage(
      "brief",
      { body: combined },
      { siteUrl: SITE_URL, requireBookingCta: false },
    );
    if (!qa.ok) return null;

    return result;
  } catch {
    return null;
  }
}

// ── renderBriefSection ────────────────────────────────────────────────────────

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function briefRow(label: string, value: string): string {
  return (
    `<tr>` +
    `<td style="padding:4px 10px 4px 0;color:#64748b;vertical-align:top;white-space:nowrap;">${esc(label)}</td>` +
    `<td style="padding:4px 0;">${esc(value)}</td>` +
    `</tr>`
  );
}

/**
 * Renders the "How to open this call" box for the handoff email. Pure function
 * with no side-effects.
 *
 * Returns empty strings when brief is null so the caller can interpolate the
 * result directly into the HTML and text templates without a guard.
 */
export function renderBriefSection(brief: CallBrief | null): { html: string; text: string } {
  if (!brief) return { html: "", text: "" };

  const html =
    `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;` +
    `padding:12px 14px;font-size:14px;margin:12px 0;">` +
    `<div style="color:#166534;font-weight:600;margin-bottom:8px;">How to open this call</div>` +
    `<table style="border-collapse:collapse;font-size:14px;">` +
    briefRow("Opening line", brief.opening) +
    briefRow("Their goal", brief.theirGoal) +
    briefRow("Suggested angle", brief.suggestedAngle) +
    briefRow("Best window", brief.bestWindow) +
    `</table>` +
    `</div>`;

  const text =
    `HOW TO OPEN THIS CALL\n` +
    `Opening: ${brief.opening}\n` +
    `Their goal: ${brief.theirGoal}\n` +
    `Suggested angle: ${brief.suggestedAngle}\n` +
    `Best window: ${brief.bestWindow}\n`;

  return { html, text };
}
