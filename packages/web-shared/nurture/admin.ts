/**
 * Minimal service-role Supabase REST helper for the shared nurture engine.
 *
 * Mirrors the pattern from Property/web/src/lib/supabase/admin.ts (which
 * remains the Property-local copy). Lifted here so the shared engine has
 * its own admin surface without importing from a per-site lib path.
 *
 * NEVER import into client components: SUPABASE_SERVICE_ROLE_KEY is
 * server-only and undefined in the browser. RLS-protected tables
 * (subscribers, nurture_state, nurture_sends) are reachable ONLY via this.
 */

// .trim() guards the known env-whitespace trap: a pasted value with a trailing
// newline turns every fetch into "Invalid value" at request time.
const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
const SERVICE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

export function adminConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

export type AdminResult<T> = { ok: boolean; status: number; data: T[]; error?: string };

/**
 * Every failed call logs here, once, at the single choke point all ~30 callers
 * route through. Before 2026-08-15 a non-2xx returned `{ok:false, data:[]}`
 * silently; callers that only read `.data` rendered a DB outage as "no rows",
 * which is how crons reported ok:true while their queries failed. Do not make
 * this quiet again: this line is what Sentry's captureConsole picks up.
 */
let loggedUnconfigured = false;

async function call<T>(
  table: string,
  init: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    params?: Record<string, string>;
    body?: unknown;
    prefer?: string;
  },
): Promise<AdminResult<T>> {
  if (!adminConfigured()) {
    if (!loggedUnconfigured) {
      loggedUnconfigured = true;
      console.error("[admin] SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not configured; every admin call returns empty");
    }
    return { ok: false, status: 0, data: [], error: "not_configured" };
  }
  const qs = init.params ? "?" + new URLSearchParams(init.params).toString() : "";
  const headers: Record<string, string> = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
  if (init.prefer) headers.Prefer = init.prefer;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${qs}`, {
    method: init.method,
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  let data: T[] = [];
  let error: string | undefined;
  if (res.ok) {
    const text = await res.text();
    if (text) {
      try {
        const parsed: unknown = JSON.parse(text);
        data = Array.isArray(parsed) ? (parsed as T[]) : ([parsed] as T[]);
      } catch {
        data = [];
      }
    }
  } else {
    error = (await res.text().catch(() => "")).slice(0, 300);
    console.error(`[admin] ${init.method} ${table} -> ${res.status} ${error}`);
  }
  return { ok: res.ok, status: res.status, data, error };
}

export function adminSelect<T>(
  table: string,
  params: Record<string, string>,
): Promise<AdminResult<T>> {
  return call<T>(table, { method: "GET", params });
}

export function adminInsert<T>(
  table: string,
  rows: unknown,
  opts?: { onConflict?: string; ignoreDuplicates?: boolean },
): Promise<AdminResult<T>> {
  const params: Record<string, string> = {};
  if (opts?.onConflict) params.on_conflict = opts.onConflict;
  const resolution = opts?.ignoreDuplicates ? "ignore-duplicates" : "merge-duplicates";
  const prefer = opts?.onConflict
    ? `return=representation,resolution=${resolution}`
    : "return=representation";
  return call<T>(table, { method: "POST", params, body: rows, prefer });
}

export function adminUpdate<T>(
  table: string,
  params: Record<string, string>,
  patch: Record<string, unknown>,
): Promise<AdminResult<T>> {
  return call<T>(table, { method: "PATCH", params, body: patch, prefer: "return=representation" });
}

export function adminDelete<T>(
  table: string,
  params: Record<string, string>,
): Promise<AdminResult<T>> {
  return call<T>(table, { method: "DELETE", params });
}
