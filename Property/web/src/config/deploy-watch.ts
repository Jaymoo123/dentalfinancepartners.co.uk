/**
 * Self-driving post-deploy watch: the reusable shape + the mini-form multi-step
 * rollout watch.
 *
 * A watch is a set of day-gates. The daily cron (/api/cron/deploy-watch) picks up
 * each gate once enough days have passed since the deploy, runs it, and emails a
 * PASS or ACTION verdict to the operator. The gates read numbers from web_events
 * through an injected query helper (built on adminSelect in the route) and apply
 * the pure decision functions below.
 *
 * The decision functions carry NO I/O so they are unit-testable in isolation
 * (src/tests/deploy-watch.test.ts). The route owns the database access; this
 * module owns the thresholds, the copy, and the gate wiring.
 *
 * House style: British English, no em-dashes anywhere in operator-facing text.
 */

// ── Result shape ────────────────────────────────────────────────────────────

export interface GateResult {
  verdict: "PASS" | "ACTION" | "LOW_VOLUME";
  headline: string;
  lines: string[];
  /** What the operator should do. Present only when verdict is ACTION. */
  action?: string;
}

// ── Pure decision functions (no I/O; unit-tested) ───────────────────────────

/** Round a 0..1 share to a whole-number percent for operator copy. */
function pct(share: number): number {
  return Math.round(share * 100);
}

/**
 * Error share of step advances. ACTION when more than 40% of attempts to move to
 * the next step hit a validation or server error, which points at a bug in the
 * new multi-step flow. No advances means no data, so PASS.
 */
const ERROR_SHARE_VOLUME_FLOOR = 10; // ponytail: named constant so the floor is obvious in tests

export function errorShareVerdict(errorCount: number, continueAttempts: number): GateResult {
  if (continueAttempts < ERROR_SHARE_VOLUME_FLOOR) {
    return {
      verdict: "LOW_VOLUME",
      headline: `Error-share check skipped: only ${continueAttempts} step completions (floor is ${ERROR_SHARE_VOLUME_FLOOR}).`,
      lines: [
        `Form errors: ${errorCount}`,
        `Step advances: ${continueAttempts}`,
        `Volume floor: ${ERROR_SHARE_VOLUME_FLOOR} completions required before verdict fires.`,
      ],
    };
  }
  const share = errorCount / continueAttempts;
  const action = share > 0.4;
  return {
    verdict: action ? "ACTION" : "PASS",
    headline: action
      ? `Errors are high: ${pct(share)}% of step advances hit an error.`
      : `Errors look normal: ${pct(share)}% of step advances hit an error.`,
    lines: [
      `Form errors: ${errorCount}`,
      `Step advances: ${continueAttempts}`,
      `Error share: ${pct(share)}% (action threshold is above 40%)`,
    ],
    action: action
      ? "Check the multi-step mini-form validation and step transitions for a fault introduced by the rollout."
      : undefined,
  };
}

/**
 * Step-2 completion rate. ACTION when fewer than 35% of people who finish step 1
 * go on to finish step 2, which means the extra step is losing people. No step-1
 * completions means no data, so PASS.
 */
export function stepCompletionVerdict(step2Submits: number, step1Completes: number): GateResult {
  const ratio = step1Completes > 0 ? step2Submits / step1Completes : 1;
  const action = ratio < 0.35;
  return {
    verdict: action ? "ACTION" : "PASS",
    headline: action
      ? `Step 2 is dropping people: ${pct(ratio)}% of step-1 finishers reach step 2.`
      : `Step progression looks healthy: ${pct(ratio)}% of step-1 finishers reach step 2.`,
    lines: [
      `Step 1 completions: ${step1Completes}`,
      `Step 2 completions: ${step2Submits}`,
      `Step-2 completion rate: ${pct(ratio)}% (action threshold is below 35%)`,
    ],
    action: action
      ? "Review the second step of the mini-form: shorten it, or fold the extra fields back into a single step."
      : undefined,
  };
}

/**
 * Week-one lead presence. ACTION when the multi-step mini-forms captured zero
 * leads in the first week AND the pre-rollout weekly baseline was meaningful
 * (3.5 or more), which means the new flow may be capturing nothing at all.
 */
export function weekOneLeadVerdict(leads: number, weeklyBaseline: number): GateResult {
  const action = leads === 0 && weeklyBaseline >= 3.5;
  return {
    verdict: action ? "ACTION" : "PASS",
    headline: action
      ? "No mini-form leads in the first week, but the baseline expected some."
      : `Mini-form leads in the first week: ${leads}.`,
    lines: [
      `Mini-form leads (week 1): ${leads}`,
      `Weekly baseline before the rollout: ${weeklyBaseline}`,
    ],
    action: action
      ? "Submit a real test lead through a mini-form and confirm the multi-step flow reaches the leads table."
      : undefined,
  };
}

/**
 * Two-week volume against the pre-rollout baseline. ACTION when actual leads fall
 * below half the baseline, which is a real drop rather than normal week-to-week
 * noise.
 */
export function volumeVerdict(actual2wk: number, baseline2wk: number): GateResult {
  const action = actual2wk < 0.5 * baseline2wk;
  const ratioPct = baseline2wk > 0 ? pct(actual2wk / baseline2wk) : 100;
  return {
    verdict: action ? "ACTION" : "PASS",
    headline: action
      ? `Mini-form volume is down: ${actual2wk} leads versus a baseline of ${baseline2wk}.`
      : `Mini-form volume is holding: ${actual2wk} leads versus a baseline of ${baseline2wk}.`,
    lines: [
      `Mini-form leads (actual): ${actual2wk}`,
      `Mini-form leads (baseline): ${baseline2wk}`,
      `Actual is ${ratioPct}% of baseline (action threshold is below 50%)`,
    ],
    action: action
      ? "Compare the new multi-step flow against the old single-step form and roll back if the drop holds."
      : undefined,
  };
}

// ── Constants ───────────────────────────────────────────────────────────────

/**
 * The mini-form capture surfaces this watch covers. These are the form_id values
 * emitted by the exit-intent modal, the inline mini form, the calculator result
 * gate, the mobile tool slot, the resource block, and the specialist widget.
 */
export const MINIFORM_FORM_IDS = [
  "exit_intent",
  "exit_intent_form",
  "inline_mini",
  "calc_result",
  "calc_result_gate",
  "mobile_tool",
  "resource_block",
  "specialist_widget",
] as const;

/**
 * Baseline mini-form leads over 28 days, MEASURED 2026-06-09 to 2026-07-07 (the
 * 28 days immediately before the multi-step rollout). This window includes the
 * specialist widget. It is the "before" number the day 14 and day 28 volume
 * checks compare against.
 */
export const BASELINE_MINIFORM_LEADS_28D = 15;
/** Derived weekly baseline (28d / 4). Used by the day 7 week-one lead check. */
export const BASELINE_MINIFORM_LEADS_WEEKLY = BASELINE_MINIFORM_LEADS_28D / 4; // 3.75
/** Derived fortnightly baseline (28d / 2). Used by the day 14 volume check. */
export const BASELINE_MINIFORM_LEADS_2WK = BASELINE_MINIFORM_LEADS_28D / 2; // 7.5

// ── Query helper (implemented in the route over adminSelect) ────────────────

export interface StepQueryOpts {
  /** Restrict to a single step index. Omit to count across all steps. */
  step?: number;
  /** Lookback window in days from now. */
  sinceDays: number;
}

/**
 * The numbers a gate needs, pulled from web_events for site_key='property',
 * is_bot=false, props.form_id in MINIFORM_FORM_IDS. Step and error queries are
 * additionally restricted to the multi-step flow (props.flow='multi'). The route
 * builds this over adminSelect; gates never touch the database directly.
 */
export interface WatchQueryHelper {
  /** Distinct human sessions that fired eventName in the multi flow within the window. */
  distinctStepSessions(eventName: string, opts: StepQueryOpts): Promise<number>;
  /** Raw count of eventName in the multi flow within the window. */
  stepEventCount(eventName: string, opts: StepQueryOpts): Promise<number>;
  /** Distinct human sessions that submitted a mini-form lead within the window (any flow). */
  miniformLeadSessions(sinceDays: number): Promise<number>;
}

// ── Gate + watch wiring ─────────────────────────────────────────────────────

export type GateFn = (q: WatchQueryHelper) => Promise<GateResult>;

export interface DeployWatch {
  watchKey: string;
  /** Short label used in the email subject line, e.g. "mini-form rollout". */
  label: string;
  /** Gate function per gate day. */
  gates: Record<number, GateFn>;
}

/**
 * Merge several sub-checks into one gate result. Verdict is ACTION if any
 * sub-check is ACTION; lines are concatenated; actions are joined into one
 * sentence-per-line block.
 */
function combineGateResults(headline: string, parts: GateResult[]): GateResult {
  const action = parts.some((p) => p.verdict === "ACTION");
  const lines: string[] = [];
  for (const p of parts) {
    lines.push(p.headline);
    for (const l of p.lines) lines.push(`  ${l}`);
  }
  const actions = parts.map((p) => p.action).filter(Boolean) as string[];
  return {
    verdict: action ? "ACTION" : "PASS",
    headline,
    lines,
    action: actions.length > 0 ? actions.join(" ") : undefined,
  };
}

// Day 3: earliest signal is a broken step. Watch the error share of advances.
const gateDay3: GateFn = async (q) => {
  const errors = await q.stepEventCount("form_error", { sinceDays: 3 });
  const advances = await q.stepEventCount("form_step_complete", { sinceDays: 3 });
  return errorShareVerdict(errors, advances);
};

// Day 7: is the second step losing people, and did we capture anything at all?
const gateDay7: GateFn = async (q) => {
  const step1 = await q.distinctStepSessions("form_step_complete", { step: 1, sinceDays: 7 });
  const step2 = await q.distinctStepSessions("form_step_complete", { step: 2, sinceDays: 7 });
  const leads = await q.miniformLeadSessions(7);
  return combineGateResults("Day 7: step progression and first-week leads.", [
    stepCompletionVerdict(step2, step1),
    weekOneLeadVerdict(leads, BASELINE_MINIFORM_LEADS_WEEKLY),
  ]);
};

// Day 14: enough data to judge volume against the fortnightly baseline.
const gateDay14: GateFn = async (q) => {
  const leads = await q.miniformLeadSessions(14);
  return volumeVerdict(leads, BASELINE_MINIFORM_LEADS_2WK);
};

// Day 28: before/after summary over the full 28-day window, then close the watch.
const gateDay28: GateFn = async (q) => {
  const leads = await q.miniformLeadSessions(28);
  const step1Views = await q.distinctStepSessions("form_step_view", { step: 1, sinceDays: 28 });
  const step2Completes = await q.distinctStepSessions("form_step_complete", {
    step: 2,
    sinceDays: 28,
  });
  const base = volumeVerdict(leads, BASELINE_MINIFORM_LEADS_28D);
  return {
    verdict: base.verdict,
    headline: `Day 28 before and after: ${BASELINE_MINIFORM_LEADS_28D} baseline leads versus ${leads} on the multi-step flow.`,
    lines: [
      `Mini-form leads, 28 days before the rollout: ${BASELINE_MINIFORM_LEADS_28D}`,
      `Mini-form leads, 28 days after the rollout: ${leads}`,
      `Step 1 views (28 days): ${step1Views}`,
      `Step 2 completions (28 days): ${step2Completes}`,
      "This is the final gate; the watch is now complete.",
    ],
    action: base.action,
  };
};

/** The mini-form multi-step rollout watch (days 3, 7, 14, 28). */
export const MINIFORM_MULTISTEP_WATCH: DeployWatch = {
  watchKey: "miniform_multistep",
  label: "mini-form rollout",
  gates: {
    3: gateDay3,
    7: gateDay7,
    14: gateDay14,
    28: gateDay28,
  },
};

/** Every watch the cron knows how to run, keyed by watch_key. */
export const DEPLOY_WATCHES: Record<string, DeployWatch> = {
  [MINIFORM_MULTISTEP_WATCH.watchKey]: MINIFORM_MULTISTEP_WATCH,
};
