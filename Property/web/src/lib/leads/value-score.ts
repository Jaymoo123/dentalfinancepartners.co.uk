/**
 * Fire-and-forget lead value scoring: one Claude call per new lead, result
 * stored in lead_value_scores for the console's Lead Analytics page.
 *
 * Never throws and never blocks the notification email: every failure path
 * logs and returns. Data minimisation per the estate rule — no name / email /
 * phone is sent to the model; only role, message, site and source page.
 */
import { z } from "zod";
import { generateJson, anthropicConfigured } from "@/lib/ai/anthropic";
import { adminInsert } from "@/lib/supabase/admin";

const ScoreSchema = z.object({
  tier: z.enum(["very_high", "high", "medium", "low"]),
  est_value_gbp: z.number().int().min(0).max(20000),
  intent: z.enum([
    "incorporation",
    "structure",
    "cgt",
    "sdlt",
    "compliance",
    "nrl_expat",
    "vat",
    "other",
    "unknown",
  ]),
  work_type: z.enum(["recurring", "project", "one_off", "none", "unknown"]),
  confidence: z.enum(["high", "medium", "low"]),
  rationale: z.string().max(200),
});

const SYSTEM = `You triage inbound leads for UK accountancy firms specialising in tax
(property landlords, dentists, solicitors, contractors, small businesses). Estimate the
first-year engagement value of each lead IF WON, from what the lead says about their
position. Be conservative; never inflate.

Tiers and typical first-year fees:
- very_high: large portfolio / GBP 1m+ incorporation / trading business needing multi-entity
  accounts. GBP 3,000+/yr recurring or GBP 5,000+ one-off project. est_value_gbp 5000-10000.
- high: GBP 1,000-3,000/yr recurring. Multi-property landlords weighing incorporation,
  new SPVs with growth plans, complex disposals needing specialist project work.
- medium: GBP 300-1,500. One-off advisory (CGT computation, SDLT question, Form 17,
  ownership restructure) or small recurring work (single-property Ltd accounts, SA + MTD).
- low: vague one-liners, email-only captures, empty messages, non-client work (form
  requests, complaints, questions outside accountancy). est_value_gbp 0-100.

intent: the dominant topic. structure = ownership/SPV/LLP/splits short of full portfolio
incorporation; incorporation = moving property/business into a company; nrl_expat =
non-resident landlord / expat issues; compliance = SA/MTD/accounts/bookkeeping.
work_type: recurring = would become an ongoing client; project = large one-time engagement;
one_off = single piece of advisory; none = no billable work.
confidence: low for thin/one-line/ambiguous messages, high only when the lead gives
concrete facts (property counts, values, structures, deadlines).
rationale: one short sentence quoting the decisive facts.`;

type LeadLike = {
  id?: string;
  role?: string;
  message?: string;
  source?: string;
  source_url?: string;
  extras?: Record<string, unknown> | null;
};

/** Micro-capture surfaces (everything except the full contact/enquiry form). */
const WIDGET_FORM_IDS = new Set([
  "exit_intent",
  "exit_intent_form",
  "inline_mini",
  "calc_result",
  "calc_result_gate",
  "mobile_tool",
  "resource_block",
  "specialist_widget",
]);

/** Widget captures also self-identify via a bracketed message prefix. */
const WIDGET_MSG_PREFIX =
  /^\[(exit intent|inline mini-form|result gate|mobile tool|specialist question)/i;

function deriveChannel(lead: LeadLike): "form" | "widget" {
  const fid = lead.extras?.form_id;
  if (typeof fid === "string" && WIDGET_FORM_IDS.has(fid)) return "widget";
  if (WIDGET_MSG_PREFIX.test((lead.message ?? "").trim())) return "widget";
  return "form";
}

export async function scoreLeadValue(lead: LeadLike): Promise<void> {
  if (!lead.id || !anthropicConfigured()) return;

  const result = await generateJson({
    model: "sonnet",
    system: SYSTEM,
    prompt: JSON.stringify({
      site: lead.source ?? "unknown",
      role_selected: lead.role ?? null,
      message: (lead.message ?? "").slice(0, 4000),
      source_page: lead.source_url ?? null,
      role_detail:
        typeof lead.extras?.role_detail === "string" ? lead.extras.role_detail : null,
    }),
    schema: ScoreSchema,
    maxTokens: 512,
    cacheSystem: true,
  });
  if (!result) return; // generateJson already logged

  // ignoreDuplicates: duplicate webhook delivery hits unique(lead_id) — a no-op.
  const res = await adminInsert(
    "lead_value_scores",
    [
      {
        lead_id: lead.id,
        ...result,
        channel: deriveChannel(lead),
        scored_by: "claude_auto",
      },
    ],
    { onConflict: "lead_id", ignoreDuplicates: true },
  );
  if (!res.ok) {
    console.error("leads/value-score: insert failed", res.status);
  }
}
