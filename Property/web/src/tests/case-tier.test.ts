/**
 * Tests for case-tier grading orchestration (src/lib/leads/case-tier.ts):
 *   - stubCaseTier: the deterministic keyword fallback, pinned to the
 *     CLASSIFY.md worked examples and to the rubric order (advisory first).
 *   - ensureCaseTier: existing-grade-wins, AI PATCH/INSERT, stub fallback,
 *     and the case_tier=is.null guard that stops a grade ever being clobbered.
 *   - setOwnerTier: the owner's tier pick always wins, unconditionally.
 *   - Drift guards: CASE_TIER_PROMPT (ai.ts) against the fenced prompt in
 *     docs/CLASSIFY.md, and STUB_ADVISORY/STUB_STANDARD against the python
 *     ADVISORY/STANDARD dicts in lead_engine/scripts/classify_stub.py.
 *
 * Mocking mirrors the style of lead-offers.test.ts (in-memory db + matches()
 * PostgREST filter interpreter), with named mock-fn consts (nurture-control.test.ts
 * style) so calls can be inspected directly without type casts.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// ── In-memory DB ─────────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

const db = {
  lead_value_scores: [] as Row[],
  leads: [] as Row[],
  reset() {
    this.lead_value_scores = [];
    this.leads = [];
  },
};

function matches(row: Row, params: Record<string, string>): boolean {
  for (const [k, raw] of Object.entries(params)) {
    if (["select", "order", "limit"].includes(k)) continue;
    if (raw.startsWith("eq.")) {
      if (String(row[k]) !== raw.slice(3)) return false;
    } else if (raw.startsWith("in.")) {
      const set = raw.slice(3).replace(/^\(|\)$/g, "").split(",");
      if (!set.includes(String(row[k]))) return false;
    } else if (raw.startsWith("lt.")) {
      if (!(String(row[k]) < raw.slice(3))) return false;
    } else if (raw.startsWith("gte.")) {
      if (!(String(row[k]) >= raw.slice(4))) return false;
    } else if (raw === "not.is.null") {
      if (row[k] === null || row[k] === undefined || row[k] === "") return false;
    } else if (raw === "is.null") {
      if (!(row[k] === null || row[k] === undefined || row[k] === "")) return false;
    } else if (raw.startsWith("cs.")) {
      const want = raw.slice(3).replace(/^\{|\}$/g, "");
      if (!Array.isArray(row[k]) || !(row[k] as unknown[]).map(String).includes(want)) return false;
    }
  }
  return true;
}

let idCounter = 0;

// Named mock fns (nurture-control.test.ts style) so tests can inspect .mock.calls
// directly, with the reference file's db/matches scaffolding behind them.
const mockAdminSelect = vi.fn((table: string, params: Record<string, string>) => {
  const tableData = (db[table as keyof typeof db] as Row[]).filter((r) => matches(r, params));
  return Promise.resolve({ ok: true, status: 200, data: tableData });
});

const mockAdminInsert = vi.fn(
  (table: string, rows: Row | Row[], opts?: { onConflict?: string; ignoreDuplicates?: boolean }) => {
    const tableData = db[table as keyof typeof db] as Row[];
    const list = Array.isArray(rows) ? rows : [rows];
    const inserted: Row[] = [];
    for (const row of list) {
      let existing: Row | undefined;
      if (opts?.onConflict) {
        const conflictKeys = opts.onConflict.split(",").map((k) => k.trim());
        existing = tableData.find((r) => conflictKeys.every((k) => r[k] === row[k]));
      }
      if (existing) {
        if (opts?.ignoreDuplicates) continue; // no-op: no row in the returned data
        Object.assign(existing, row); // merge-upsert (setBotPaused's onConflict-without-ignoreDuplicates path)
        inserted.push(existing);
        continue;
      }
      const newRow: Row = { id: `row-${++idCounter}`, ...row };
      tableData.push(newRow);
      inserted.push(newRow);
    }
    return Promise.resolve({ ok: true, status: 201, data: inserted });
  },
);

const mockAdminUpdate = vi.fn((table: string, params: Record<string, string>, patch: Row) => {
  const tableData = db[table as keyof typeof db] as Row[];
  const hits = tableData.filter((r) => matches(r, params));
  hits.forEach((r) => Object.assign(r, patch));
  return Promise.resolve({ ok: true, status: 200, data: hits });
});

vi.mock("@/lib/supabase/admin", () => ({
  adminConfigured: () => true,
  adminSelect: (...args: unknown[]) => (mockAdminSelect as (...a: unknown[]) => unknown)(...args),
  adminInsert: (...args: unknown[]) => (mockAdminInsert as (...a: unknown[]) => unknown)(...args),
  adminUpdate: (...args: unknown[]) => (mockAdminUpdate as (...a: unknown[]) => unknown)(...args),
  adminDelete: vi.fn(() => Promise.resolve({ ok: true, status: 204, data: [] })),
}));

// ── AI Gateway mock (ai.ts's classifyCaseTier calls generateObject from "ai") ──

const mockGenerateObject = vi.fn();
vi.mock("ai", () => ({
  generateObject: (...args: unknown[]) => (mockGenerateObject as (...a: unknown[]) => unknown)(...args),
}));

// case-tier.ts calls two gateway functions from @/lib/ai: classifyCaseTier
// (call 1) and verifyNoIdentifiers over the intent_line (call 2, fail-closed).
// Both bottom out in the mocked generateObject above, so tests queue one
// response per call with mockResolvedValueOnce.

import {
  stubCaseTier,
  ensureCaseTier,
  setOwnerTier,
  STUB_ADVISORY,
  STUB_STANDARD,
} from "@/lib/leads/case-tier";
import { CASE_TIER_PROMPT } from "@/lib/ai";

// ── Helpers ──────────────────────────────────────────────────────────────────

function seedScoreRow(leadId: string, over: Row = {}): Row {
  const row: Row = {
    id: `score-${++idCounter}`,
    lead_id: leadId,
    case_tier: null,
    case_type: null,
    intent_line: null,
    scored_by: null,
    // Default: written after the verified-at-write cutoff (2026-08-20), so a
    // stored intent_line returns untouched. E3 tests override with a
    // pre-cutoff date to exercise the backfill re-verification.
    scored_at: "2026-08-21T00:00:00.000Z",
    ...over,
  };
  db.lead_value_scores.push(row);
  return row;
}

function seedLead(leadId: string, over: Row = {}): Row {
  const row: Row = {
    id: leadId,
    message: "Need help with practice incorporation",
    source: "dentists",
    role: "landlord",
    ...over,
  };
  db.leads.push(row);
  return row;
}

type AiGrade = { tier: string; intent_line: string; case_type: string; area: string };

function mockAiSuccess(grade: AiGrade, opts: { verifyClean?: boolean } = {}): void {
  mockGenerateObject
    .mockResolvedValueOnce({ object: grade })
    .mockResolvedValueOnce({ object: { clean: opts.verifyClean ?? true, issues: [] } });
}

function mockAiFailure(): void {
  mockGenerateObject.mockRejectedValueOnce(new Error("gateway unavailable"));
}

beforeEach(() => {
  db.reset();
  idCounter = 0;
  mockAdminSelect.mockClear();
  mockAdminInsert.mockClear();
  mockAdminUpdate.mockClear();
  mockGenerateObject.mockReset();
});

// ── stubCaseTier: CLASSIFY.md worked examples ───────────────────────────────

describe("stubCaseTier: CLASSIFY.md worked examples", () => {
  it("example 1: incorporating a multi-property portfolio grades advisory", () => {
    const r = stubCaseTier(
      "I own 6 buy-to-lets in a partnership with my brother and want to know if moving them into a limited company makes sense before April.",
    );
    expect(r).toEqual({ tier: "advisory", case_type: "incorporation" });
  });

  it("example 2: landlord SA with jointly owned income grades standard", () => {
    const r = stubCaseTier(
      "Landlord with 2 properties, one jointly owned with my wife. Need this year's self assessment done, last accountant retired.",
    );
    expect(r).toEqual({ tier: "standard", case_type: "landlord_sa_complex" });
  });

  it("example 3: straightforward self-employed return grades essential", () => {
    const r = stubCaseTier("Need my tax return sorted, self employed, nothing complicated. Based in Leeds.");
    expect(r).toEqual({ tier: "essential", case_type: "basic_return" });
  });

  it("example 4 (grade-down): single rental property, no complicating factor, grades essential", () => {
    const r = stubCaseTier("I have a rental property, need help with my taxes.");
    expect(r).toEqual({ tier: "essential", case_type: "basic_return" });
  });

  it("checks advisory keywords before standard: capital gains wins over self assessment", () => {
    const r = stubCaseTier("I need capital gains advice and also want my self assessment done.");
    expect(r).toEqual({ tier: "advisory", case_type: "cgt_planning" });
  });
});

// ── ensureCaseTier ───────────────────────────────────────────────────────────

describe("ensureCaseTier", () => {
  it("an existing case_tier wins outright: no AI call, no lead lookup", async () => {
    seedScoreRow("lead-1", { case_tier: "standard", case_type: "sme_accounts", intent_line: "Existing grade" });
    const result = await ensureCaseTier("lead-1");
    expect(result).toEqual({
      tier: "standard",
      caseType: "sme_accounts",
      intentLine: "Existing grade",
      source: "existing",
    });
    expect(mockGenerateObject).not.toHaveBeenCalled();
    expect(mockAdminSelect.mock.calls.some(([table]) => table === "leads")).toBe(false);
  });

  it("AI success PATCHes an existing row, scored_by claude_auto, guarded on case_tier=is.null", async () => {
    seedScoreRow("lead-2", { case_tier: null, case_type: null, intent_line: null });
    seedLead("lead-2", { message: "Weighing incorporation of a six-property portfolio." });
    mockAiSuccess({
      tier: "advisory",
      intent_line: "Weighing incorporation of a six-property portfolio.",
      case_type: "incorporation",
      area: "",
    });

    const result = await ensureCaseTier("lead-2");
    expect(result).toMatchObject({
      tier: "advisory",
      caseType: "incorporation",
      intentLine: "Weighing incorporation of a six-property portfolio.",
      source: "claude_auto",
    });

    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-2");
    expect(row?.case_tier).toBe("advisory");
    expect(row?.case_type).toBe("incorporation");
    expect(row?.scored_by).toBe("claude_auto");

    // (e) the PATCH itself is guarded so an existing grade can never be clobbered.
    const patchCall = mockAdminUpdate.mock.calls.find(([table]) => table === "lead_value_scores");
    expect(patchCall?.[1]).toMatchObject({ lead_id: "eq.lead-2", case_tier: "is.null" });
  });

  it("AI success INSERTs when no score row exists at all", async () => {
    seedLead("lead-3", { message: "Portfolio incorporation query." });
    mockAiSuccess({
      tier: "advisory",
      intent_line: "Portfolio incorporation query.",
      case_type: "incorporation",
      area: "",
    });
    expect(db.lead_value_scores).toHaveLength(0);

    const result = await ensureCaseTier("lead-3");
    expect(result?.source).toBe("claude_auto");
    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-3");
    expect(row).toBeDefined();
    expect(row?.case_tier).toBe("advisory");
    expect(row?.scored_by).toBe("claude_auto");
  });

  it("drops an intent_line the verify pass flags, keeping the grade (fail-closed)", async () => {
    seedLead("lead-7", { message: "Portfolio incorporation query." });
    mockAiSuccess(
      {
        tier: "advisory",
        intent_line: "Kan.AI founder in Edinburgh wants incorporation.",
        case_type: "incorporation",
        area: "",
      },
      { verifyClean: false },
    );

    const result = await ensureCaseTier("lead-7");
    expect(result).toMatchObject({ tier: "advisory", intentLine: "", source: "claude_auto" });
    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-7");
    expect(row?.intent_line).toBe("");
  });

  it("AI failure (throw) falls back to the deterministic stub, with an empty intent_line", async () => {
    seedLead("lead-4", { message: "Need my tax return sorted, self employed, nothing complicated." });
    mockAiFailure();

    const result = await ensureCaseTier("lead-4");
    expect(result).toEqual({
      tier: "essential",
      caseType: "basic_return",
      intentLine: "",
      source: "deterministic",
    });

    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-4");
    expect(row?.scored_by).toBe("deterministic");
    expect(row?.intent_line).toBe("");
  });

  it("returns null when the lead itself cannot be loaded", async () => {
    const result = await ensureCaseTier("missing-lead");
    expect(result).toBeNull();
  });
});

// ── ensureCaseTier: health-check cap (owner decision 2026-08-20) ─────────────

describe("ensureCaseTier: health-check leads capped at essential", () => {
  it("health_check in extras caps a fresh AI advisory grade to essential, case_type untouched", async () => {
    seedLead("lead-13", {
      message: "Weighing incorporation of a six-property portfolio.",
      extras: { health_check: { score: 42 } },
    });
    mockAiSuccess({
      tier: "advisory",
      intent_line: "Weighing incorporation of a six-property portfolio.",
      case_type: "incorporation",
      area: "",
    });

    const result = await ensureCaseTier("lead-13");
    expect(result).toMatchObject({ tier: "essential", caseType: "incorporation", source: "claude_auto" });
    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-13");
    expect(row?.case_tier).toBe("essential");
    expect(row?.case_type).toBe("incorporation");
    expect(row?.scored_by).toBe("claude_auto");
  });

  it("extras without a health_check key leaves the AI tier unchanged", async () => {
    seedLead("lead-14", {
      message: "Weighing incorporation of a six-property portfolio.",
      extras: { utm_source: "bing" },
    });
    mockAiSuccess({
      tier: "advisory",
      intent_line: "Weighing incorporation of a six-property portfolio.",
      case_type: "incorporation",
      area: "",
    });

    const result = await ensureCaseTier("lead-14");
    expect(result?.tier).toBe("advisory");
    expect(db.lead_value_scores.find((r) => r.lead_id === "lead-14")?.case_tier).toBe("advisory");
  });

  it("owner override still upgrades a capped lead from the tier picker", async () => {
    seedLead("lead-15", {
      message: "Weighing incorporation of a six-property portfolio.",
      extras: { health_check: true },
    });
    mockAiSuccess({
      tier: "advisory",
      intent_line: "Weighing incorporation of a six-property portfolio.",
      case_type: "incorporation",
      area: "",
    });
    await ensureCaseTier("lead-15");

    const ok = await setOwnerTier("lead-15", "advisory");
    expect(ok).toBe(true);
    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-15");
    expect(row?.case_tier).toBe("advisory");
    expect(row?.scored_by).toBe("owner");
  });
});

// ── ensureCaseTier: stored intent_line vetting (E3) ──────────────────────────
// The 2026-08-14 python backfill wrote raw-message prefixes into intent_line;
// pre-cutoff rows must be re-verified before the line renders into Telegram.

describe("ensureCaseTier: stored intent_line vetting", () => {
  const PRE_CUTOFF = "2026-08-14T12:00:00.000Z";

  it("pre-cutoff line failing verify is dropped from the return AND nulled in the DB", async () => {
    const row = seedScoreRow("lead-8", {
      case_tier: "standard",
      case_type: "sme_accounts",
      intent_line: "Hi, John here from KAN.AI in Edinburgh, need accounts help",
      scored_by: "claude_auto",
      scored_at: PRE_CUTOFF,
    });
    mockGenerateObject.mockResolvedValueOnce({ object: { clean: false, issues: ["name"] } });

    const result = await ensureCaseTier("lead-8");
    expect(result).toMatchObject({ tier: "standard", intentLine: "", source: "existing" });
    expect(row.intent_line).toBeNull();
    expect(mockGenerateObject).toHaveBeenCalledTimes(1); // verify only, no re-grade
  });

  it("verify throw fails closed: line dropped and nulled", async () => {
    const row = seedScoreRow("lead-9", {
      case_tier: "standard",
      case_type: "sme_accounts",
      intent_line: "Raw message prefix from the backfill",
      scored_by: "claude_auto",
      scored_at: PRE_CUTOFF,
    });
    mockGenerateObject.mockRejectedValueOnce(new Error("gateway down"));

    const result = await ensureCaseTier("lead-9");
    expect(result?.intentLine).toBe("");
    expect(row.intent_line).toBeNull();
  });

  it("pre-cutoff line passing verify is returned and kept", async () => {
    const row = seedScoreRow("lead-10", {
      case_tier: "standard",
      case_type: "sme_accounts",
      intent_line: "Needs self assessment for two rental properties.",
      scored_by: "claude_auto",
      scored_at: PRE_CUTOFF,
    });
    mockGenerateObject.mockResolvedValueOnce({ object: { clean: true, issues: [] } });

    const result = await ensureCaseTier("lead-10");
    expect(result?.intentLine).toBe("Needs self assessment for two rental properties.");
    expect(row.intent_line).toBe("Needs self assessment for two rental properties.");
    expect(mockGenerateObject).toHaveBeenCalledTimes(1);
  });

  it("post-cutoff rows are verified at write time: returned untouched, no AI call", async () => {
    seedScoreRow("lead-11", {
      case_tier: "advisory",
      case_type: "incorporation",
      intent_line: "Wants portfolio incorporation advice.",
      scored_by: "claude_auto",
      scored_at: "2026-08-20T09:00:00.000Z",
    });
    const result = await ensureCaseTier("lead-11");
    expect(result?.intentLine).toBe("Wants portfolio incorporation advice.");
    expect(mockGenerateObject).not.toHaveBeenCalled();
  });

  it("owner-written lines are trusted regardless of age: no AI call", async () => {
    seedScoreRow("lead-12", {
      case_tier: "advisory",
      case_type: "incorporation",
      intent_line: "Owner note",
      scored_by: "owner",
      scored_at: "2026-08-10T00:00:00.000Z",
    });
    const result = await ensureCaseTier("lead-12");
    expect(result?.intentLine).toBe("Owner note");
    expect(mockGenerateObject).not.toHaveBeenCalled();
  });
});

// ── setOwnerTier ─────────────────────────────────────────────────────────────

describe("setOwnerTier", () => {
  it("unconditionally updates an existing row, scored_by owner", async () => {
    seedScoreRow("lead-5", { case_tier: "essential", scored_by: "deterministic" });
    const ok = await setOwnerTier("lead-5", "advisory");
    expect(ok).toBe(true);
    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-5");
    expect(row?.case_tier).toBe("advisory");
    expect(row?.scored_by).toBe("owner");
    expect(typeof row?.scored_at).toBe("string");
  });

  it("inserts a row when none exists", async () => {
    const ok = await setOwnerTier("lead-6", "standard");
    expect(ok).toBe(true);
    const row = db.lead_value_scores.find((r) => r.lead_id === "lead-6");
    expect(row).toBeDefined();
    expect(row?.case_tier).toBe("standard");
    expect(row?.scored_by).toBe("owner");
  });
});

// ── Drift guards ─────────────────────────────────────────────────────────────

describe("drift: CLASSIFY.md and classify_stub.py stay in lockstep with the TS code", () => {
  const HERE = path.dirname(fileURLToPath(import.meta.url));
  // tests -> src -> web -> Property -> repo root
  const CLASSIFY_MD_PATH = path.resolve(HERE, "../../../../docs/CLASSIFY.md");
  const STUB_PY_PATH = path.resolve(HERE, "../../../../lead_engine/scripts/classify_stub.py");

  it("CASE_TIER_PROMPT matches the fenced prompt block in docs/CLASSIFY.md verbatim", () => {
    const md = readFileSync(CLASSIFY_MD_PATH, "utf-8");
    const section = md.split("## Classification prompt")[1]?.split("## Worked examples")[0] ?? "";
    const fence = section.match(/```[^\n]*\n([\s\S]*?)```/);
    expect(fence, "could not find the fenced prompt block in CLASSIFY.md").not.toBeNull();
    // JS template literals normalise CRLF/CR to LF per spec (ECMA-262 TV of
    // TemplateCharacters), but a CRLF-checked-out file read via fs keeps \r\n
    // verbatim, so the file side must be normalised the same way to compare.
    const docPrompt = fence![1].replace(/\r\n/g, "\n").trim();
    expect(CASE_TIER_PROMPT.trim()).toBe(docPrompt);
  });

  it("STUB_ADVISORY / STUB_STANDARD mirror the python classify_stub.py dicts exactly", () => {
    const py = readFileSync(STUB_PY_PATH, "utf-8");
    const parseDict = (varName: string): Record<string, string> => {
      const start = py.indexOf(`${varName} = {`);
      const braceStart = py.indexOf("{", start);
      const braceEnd = py.indexOf("}", braceStart);
      const body = py.slice(braceStart + 1, braceEnd);
      const out: Record<string, string> = {};
      const re = /"([^"]+)":\s*"([^"]+)"/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(body))) out[m[1]] = m[2];
      return out;
    };
    expect(STUB_ADVISORY).toEqual(parseDict("ADVISORY"));
    expect(STUB_STANDARD).toEqual(parseDict("STANDARD"));
  });
});
