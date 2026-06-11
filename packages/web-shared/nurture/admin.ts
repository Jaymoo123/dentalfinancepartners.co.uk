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

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function adminConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

export type AdminResult<T> = { ok: boolean; status: number; data: T[] };

async function call<T>(
  table: string,
  init: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    params?: Record<string, string>;
    body?: unknown;
    prefer?: string;
  },
): Promise<AdminResult<T>> {
  if (!adminConfigured()) return { ok: false, status: 0, data: [] };
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
  }
  return { ok: res.ok, status: res.status, data };
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
