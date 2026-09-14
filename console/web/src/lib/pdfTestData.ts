/**
 * Console read for the paid-PDF concierge test (plan section 4.10).
 *
 * Server-only. The shared console helpers live in packages/web-shared/console/
 * (owner-gated) and their `rest` helper is not exported, so this file carries
 * its own small REST read with the same env vars and header shape.
 */

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function rest<T>(path: string, params: Record<string, string>): Promise<T[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("supabase env missing");
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}?${qs}`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase rest ${res.status} for ${path}`);
  return (await res.json()) as T[];
}

// ── Shapes ─────────────────────────────────────────────────────────────────

export type PdfFlag = {
  enabled: boolean;
  link: string;
  price_gbp: number;
  started_at: string | null;
  updated_at: string | null;
};

export type PdfViewRow = {
  day: string;
  tool_id: string | null;
  placement: string | null;
  exposure_sessions: number;
  click_sessions: number;
  clicks: number;
};

export type PdfRequestRow = {
  created_at: string;
  tool_id: string | null;
  placement: string | null;
  stripe_session_id: string | null;
  fulfilled_at: string | null;
};

/** emerald = build / on track, amber = kill line crossed, slate = not enough data. */
export type KillState = "waiting" | "build" | "extend" | "kill";

export type PdfWindow = {
  key: string;
  label: string;
  since: string | null;
  exposures: number;
  clicks: number;
  click_rate: number | null;
  checkouts: number;
  paid: number;
  paid_rate: number | null;
  revenue: number;
  fulfilled: number;
  awaiting: number;
  kill: { exposures: KillState; clicks: KillState; paid: KillState };
};

export type PdfBreakdownRow = {
  key: string;
  exposures: number;
  clicks: number;
  checkouts: number;
  paid: number;
};

export type PdfTestModel =
  | { state: "not_set_up" }
  | { state: "off_never_started"; flag: PdfFlag }
  | {
      state: "ready";
      flag: PdfFlag;
      windows: PdfWindow[];
      byTool: PdfBreakdownRow[];
      byPlacement: PdfBreakdownRow[];
      dailyClicks: { day: string; clicks: number }[];
      recent: PdfRequestRow[];
    };

export const EXPOSURE_BAR = 250;
export const CLICK_KILL_RATE = 0.02;
export const PAID_KILL_RATE = 0.01;
export const PAID_BUILD_RATE = 0.02;

// ── Reducer ────────────────────────────────────────────────────────────────

function rate(n: number, d: number): number | null {
  return d > 0 ? n / d : null;
}

function sumBy(
  viewRows: PdfViewRow[],
  requests: PdfRequestRow[],
  pick: (tool: string | null, placement: string | null) => string | null,
): PdfBreakdownRow[] {
  const acc = new Map<string, PdfBreakdownRow>();
  const get = (key: string) => {
    const row = acc.get(key) ?? { key, exposures: 0, clicks: 0, checkouts: 0, paid: 0 };
    acc.set(key, row);
    return row;
  };
  for (const v of viewRows) {
    const key = pick(v.tool_id, v.placement);
    if (key == null) continue;
    const row = get(key);
    row.exposures += v.exposure_sessions ?? 0;
    row.clicks += v.clicks ?? 0;
  }
  for (const r of requests) {
    const key = pick(r.tool_id, r.placement);
    if (key == null) continue;
    const row = get(key);
    row.checkouts += 1;
    if (r.stripe_session_id) row.paid += 1;
  }
  return [...acc.values()].sort((a, b) => b.exposures - a.exposures || a.key.localeCompare(b.key));
}

function buildWindow(
  key: string,
  label: string,
  since: string | null,
  viewRows: PdfViewRow[],
  requests: PdfRequestRow[],
  priceGbp: number,
): PdfWindow {
  // Timestamps, not string compare: the view returns date_trunc'd timestamptz
  // ("2026-09-14T00:00:00+00:00"), which does not sort against a plain ISO Z.
  const cut = since ? Date.parse(since) : Number.NEGATIVE_INFINITY;
  const v = viewRows.filter((r) => Date.parse(r.day) >= cut);
  const q = requests.filter((r) => Date.parse(r.created_at) >= cut);
  const exposures = v.reduce((a, r) => a + (r.exposure_sessions ?? 0), 0);
  const clicks = v.reduce((a, r) => a + (r.clicks ?? 0), 0);
  const paidRows = q.filter((r) => !!r.stripe_session_id);
  const fulfilled = paidRows.filter((r) => !!r.fulfilled_at).length;
  const clickRate = rate(clicks, exposures);
  const paidRate = rate(paidRows.length, exposures);
  const enough = exposures >= EXPOSURE_BAR;
  return {
    key,
    label,
    since,
    exposures,
    clicks,
    click_rate: clickRate,
    checkouts: q.length,
    paid: paidRows.length,
    paid_rate: paidRate,
    revenue: paidRows.length * priceGbp,
    fulfilled,
    awaiting: paidRows.length - fulfilled,
    kill: {
      exposures: enough ? "build" : "waiting",
      clicks: !enough || clickRate == null ? "waiting" : clickRate >= CLICK_KILL_RATE ? "build" : "kill",
      paid:
        !enough || paidRate == null
          ? "waiting"
          : paidRate >= PAID_BUILD_RATE
            ? "build"
            : paidRate >= PAID_KILL_RATE
              ? "extend"
              : "kill",
    },
  };
}

/** Pure panel model. `now` is injected so the windows are testable. */
export function summarisePdfTest(
  flag: PdfFlag | null,
  viewRows: PdfViewRow[],
  requests: PdfRequestRow[],
  now: Date,
): PdfTestModel {
  if (!flag) return { state: "not_set_up" };
  if (!flag.started_at) return { state: "off_never_started", flag };

  const iso = (ms: number) => new Date(ms).toISOString();
  const price = Number(flag.price_gbp) || 0;
  const windows = [
    buildWindow("d7", "Last 7 days", iso(now.getTime() - 7 * 86400_000), viewRows, requests, price),
    buildWindow("d14", "Last 14 days", iso(now.getTime() - 14 * 86400_000), viewRows, requests, price),
    buildWindow("all", "Since start", flag.started_at, viewRows, requests, price),
  ];

  // ponytail: view rows are per (day, tool, placement), so a session that saw two
  // tools counts twice in exposures. Distinct sessions need the day-14 SQL read.
  const dailyByDay = new Map<string, number>();
  for (const r of viewRows) {
    const day = r.day.slice(0, 10);
    dailyByDay.set(day, (dailyByDay.get(day) ?? 0) + (r.clicks ?? 0));
  }
  const dailyClicks = [...dailyByDay.entries()]
    .map(([day, clicks]) => ({ day, clicks }))
    .sort((a, b) => a.day.localeCompare(b.day));

  return {
    state: "ready",
    flag,
    windows,
    byTool: sumBy(viewRows, requests, (tool) => tool ?? "unknown"),
    byPlacement: sumBy(viewRows, requests, (_tool, placement) => placement ?? "unknown"),
    dailyClicks,
    recent: [...requests]
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 20),
  };
}

// ── Data ───────────────────────────────────────────────────────────────────

/** Never throws: a missing migration must not break the console homepage. */
export async function getPdfTestData(now: Date = new Date()): Promise<PdfTestModel> {
  try {
    const flagRows = await rest<{ value: unknown; updated_at: string | null }>("site_flags", {
      key: "eq.calc_pdf_offer",
      select: "value,updated_at",
    });
    const raw = flagRows[0]?.value;
    if (!raw || typeof raw !== "object") return { state: "not_set_up" };
    const v = raw as Record<string, unknown>;
    const flag: PdfFlag = {
      enabled: v.enabled === true,
      link: typeof v.link === "string" ? v.link : "",
      price_gbp: typeof v.price_gbp === "number" ? v.price_gbp : 0,
      started_at: typeof v.started_at === "string" ? v.started_at : null,
      updated_at: flagRows[0]?.updated_at ?? null,
    };
    if (!flag.started_at) return { state: "off_never_started", flag };

    const [viewRows, requests] = await Promise.all([
      rest<PdfViewRow>("vw_calc_pdf_test", { select: "*" }),
      rest<PdfRequestRow>("calc_pdf_requests", {
        select: "created_at,tool_id,placement,stripe_session_id,fulfilled_at",
        created_at: `gte.${flag.started_at}`,
        order: "created_at.desc",
        limit: "1000",
      }),
    ]);
    return summarisePdfTest(flag, viewRows, requests, now);
  } catch {
    return { state: "not_set_up" };
  }
}
