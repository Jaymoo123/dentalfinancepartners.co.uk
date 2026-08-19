/**
 * Case-tier grading orchestration for the lead-ops bot.
 *
 * Order of truth (docs/CLASSIFY.md rule 4: one rubric, recorded at grading
 * time, downstream always reads the record):
 *   1. an existing case_tier on lead_value_scores wins (manual/owner grades
 *      are never overwritten by automation);
 *   2. else the AI Gateway rubric classifier (ai.ts classifyCaseTier);
 *   3. else the deterministic keyword stub, marked scored_by='deterministic'
 *      so the bot renders a tier PICKER instead of a one-tap send: stub
 *      output must never flow unattended into a priced buyer email, because
 *      a keyword false positive grades UP and a misgrade is a credit ground.
 */
import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { classifyCaseTier, type CaseTier } from "@/lib/ai";
import { redactMessage, scrubSituation } from "@/lib/leads/offer-teaser";

// ponytail: crude keyword heuristic ported from lead_engine/scripts/classify_stub.py,
// stands in for the CLASSIFY.md prompt only when the gateway is down. A drift
// test pins these maps to the python source; edit there and mirror.
export const STUB_ADVISORY: Record<string, string> = {
  incorporat: "incorporation",
  "limited company": "incorporation",
  restructur: "ownership_restructuring",
  "capital gains": "cgt_planning",
  cgt: "cgt_planning",
  "stamp duty": "sdlt",
  sdlt: "sdlt",
  "non-resident": "non_resident",
  expat: "non_resident",
  cio: "charity_structure",
  "charity structure": "charity_structure",
  "historic records": "records_reconstruction",
  reconstruct: "records_reconstruction",
};
export const STUB_STANDARD: Record<string, string> = {
  "self assessment": "landlord_sa_complex",
  jointly: "landlord_sa_complex",
  "year end accounts": "sme_accounts",
  "company filings": "sme_accounts",
  payroll: "sme_accounts",
};

export type StubClassification = { tier: CaseTier; case_type: string };

/** Ordered keyword match, advisory first, grade-down to essential by default. */
export function stubCaseTier(message: string): StubClassification {
  const text = (message || "").toLowerCase();
  for (const [kw, tag] of Object.entries(STUB_ADVISORY)) {
    if (text.includes(kw)) return { tier: "advisory", case_type: tag };
  }
  for (const [kw, tag] of Object.entries(STUB_STANDARD)) {
    if (text.includes(kw)) return { tier: "standard", case_type: tag };
  }
  return { tier: "essential", case_type: "basic_return" };
}

export type GradeSource = "existing" | "claude_auto" | "deterministic";

export type GradeResult = {
  tier: CaseTier;
  caseType: string;
  /** Empty when the grade came from the stub (the stub cannot write a safe one). */
  intentLine: string;
  source: GradeSource;
};

type ScoreRow = {
  id: string;
  case_tier: string | null;
  case_type: string | null;
  intent_line: string | null;
};

type LeadRow = { message: string | null; source: string | null; role: string | null };

const TIERS: readonly string[] = ["advisory", "standard", "essential"];

async function loadScoreRow(leadId: string): Promise<ScoreRow | null> {
  const res = await adminSelect<ScoreRow>("lead_value_scores", {
    select: "id,case_tier,case_type,intent_line",
    lead_id: `eq.${leadId}`,
    limit: "1",
  });
  return res.ok ? (res.data[0] ?? null) : null;
}

/**
 * Store a grade without ever clobbering one that already exists: PATCH is
 * guarded on case_tier=is.null, INSERT ignores duplicates. Best-effort; a
 * write failure still returns the grade so the bot can show it.
 */
async function storeGrade(
  leadId: string,
  hasRow: boolean,
  grade: { tier: CaseTier; case_type: string; intent_line: string },
  scoredBy: "claude_auto" | "deterministic",
): Promise<void> {
  const nowIso = new Date().toISOString();
  try {
    if (hasRow) {
      await adminUpdate(
        "lead_value_scores",
        { lead_id: `eq.${leadId}`, case_tier: "is.null" },
        {
          case_tier: grade.tier,
          case_type: grade.case_type,
          intent_line: grade.intent_line,
          scored_by: scoredBy,
          scored_at: nowIso,
        },
      );
    } else {
      // Post-08-14 leads may have no score row at all (value scoring is gated
      // on the direct Anthropic key). Nullable columns make a rubric-only
      // insert legal.
      await adminInsert(
        "lead_value_scores",
        [
          {
            lead_id: leadId,
            case_tier: grade.tier,
            case_type: grade.case_type,
            intent_line: grade.intent_line,
            scored_by: scoredBy,
            scored_at: nowIso,
          },
        ],
        { onConflict: "lead_id", ignoreDuplicates: true },
      );
    }
  } catch (err) {
    console.error("[case-tier] storeGrade failed", leadId, err);
  }
}

/**
 * Ensure a lead carries a case tier, grading it if needed. Returns null only
 * when the lead itself cannot be loaded.
 */
export async function ensureCaseTier(leadId: string): Promise<GradeResult | null> {
  const row = await loadScoreRow(leadId);
  if (row?.case_tier && TIERS.includes(row.case_tier)) {
    return {
      tier: row.case_tier as CaseTier,
      caseType: row.case_type ?? "",
      intentLine: row.intent_line ?? "",
      source: "existing",
    };
  }

  const leadRes = await adminSelect<LeadRow>("leads", {
    select: "message,source,role",
    id: `eq.${leadId}`,
    limit: "1",
  });
  const lead = leadRes.ok ? leadRes.data[0] : undefined;
  if (!lead) return null;

  // Data minimisation: the model grades the REDACTED enquiry (same text a
  // buyer sees pre-claim), never the raw message. Tier signals survive
  // redaction; names, numbers and postcodes never reach any provider. The
  // kill-switch "" case simply falls through to the stub.
  const ai = await classifyCaseTier({
    message: redactMessage(lead.message),
    source: lead.source ?? undefined,
    role: lead.role ?? undefined,
  });
  if (ai) {
    // Belt-and-braces: the rubric forbids PII in intent_line, and the
    // kill-switch scrub drops the line entirely if anything slipped through.
    const intentLine = scrubSituation(ai.intent_line);
    await storeGrade(
      leadId,
      row !== null,
      { tier: ai.tier, case_type: ai.case_type, intent_line: intentLine },
      "claude_auto",
    );
    return { tier: ai.tier, caseType: ai.case_type, intentLine, source: "claude_auto" };
  }

  // Deliberate deviation from the python stub: its intent() returns the raw
  // message prefix, which can carry PII. The fallback stores an empty
  // intent_line instead; case_type carries the signal.
  const stub = stubCaseTier(lead.message ?? "");
  await storeGrade(
    leadId,
    row !== null,
    { tier: stub.tier, case_type: stub.case_type, intent_line: "" },
    "deterministic",
  );
  return { tier: stub.tier, caseType: stub.case_type, intentLine: "", source: "deterministic" };
}

/**
 * The owner's tier pick from the Telegram picker. Always wins: unconditional
 * write, scored_by='owner'. Inserts the row if grading never ran.
 */
export async function setOwnerTier(leadId: string, tier: CaseTier): Promise<boolean> {
  const nowIso = new Date().toISOString();
  try {
    const patch = await adminUpdate<{ id: string }>(
      "lead_value_scores",
      { lead_id: `eq.${leadId}` },
      { case_tier: tier, scored_by: "owner", scored_at: nowIso },
    );
    if (patch.ok && patch.data.length > 0) return true;
    const ins = await adminInsert(
      "lead_value_scores",
      [{ lead_id: leadId, case_tier: tier, scored_by: "owner", scored_at: nowIso }],
      { onConflict: "lead_id", ignoreDuplicates: true },
    );
    return ins.ok;
  } catch (err) {
    console.error("[case-tier] setOwnerTier failed", leadId, err);
    return false;
  }
}
