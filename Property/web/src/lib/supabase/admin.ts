/**
 * Minimal server-only Supabase REST helper for routes that must READ/WRITE with
 * the service role (subscribe, nurture, unsubscribe). The analytics dashboard
 * has its own read-only `rest()`; this adds the small write surface those routes
 * need without pulling in the supabase-js client.
 *
 * NEVER import into a client component: SUPABASE_SERVICE_ROLE_KEY is not
 * NEXT_PUBLIC_, so it is undefined in the browser and these calls are inert if
 * bundled. RLS-protected tables (subscribers etc.) are reachable ONLY via this.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function adminConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

type RestResult<T> = { ok: boolean; status: number; data: T[] };

async function call<T>(
  table: string,
  init: {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    params?: Record<string, string>;
    body?: unknown;
    prefer?: string;
  },
): Promise<RestResult<T>> {
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
        const parsed = JSON.parse(text);
        data = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        data = [];
      }
    }
  }
  return { ok: res.ok, status: res.status, data };
}

export function adminSelect<T>(table: string, params: Record<string, string>): Promise<RestResult<T>> {
  return call<T>(table, { method: "GET", params });
}

/** Insert rows; returns the inserted representation. */
export function adminInsert<T>(
  table: string,
  rows: unknown,
  opts?: { onConflict?: string; ignoreDuplicates?: boolean },
): Promise<RestResult<T>> {
  const params: Record<string, string> = {};
  if (opts?.onConflict) params.on_conflict = opts.onConflict;
  const resolution = opts?.ignoreDuplicates ? "ignore-duplicates" : "merge-duplicates";
  const prefer = opts?.onConflict
    ? `return=representation,resolution=${resolution}`
    : "return=representation";
  return call<T>(table, { method: "POST", params, body: rows, prefer });
}

/** Patch rows matching `params`; returns the updated representation. */
export function adminUpdate<T>(
  table: string,
  params: Record<string, string>,
  patch: Record<string, unknown>,
): Promise<RestResult<T>> {
  return call<T>(table, { method: "PATCH", params, body: patch, prefer: "return=representation" });
}

/** Delete rows matching `params`. Used to release an idempotency claim on a failed send. */
export function adminDelete<T>(table: string, params: Record<string, string>): Promise<RestResult<T>> {
  return call<T>(table, { method: "DELETE", params });
}
