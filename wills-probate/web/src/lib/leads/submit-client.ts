/**
 * Client-side helper: submit a Trade Tax Specialists lead through the server
 * chokepoint (/api/leads/submit) rather than inserting directly from the
 * browser. The server validates, deduplicates, stores with the service-role
 * key, and fires estate notifications.
 *
 * Fallback: on a network error OR a 5xx response the function falls back to
 * the shared submitLead() so a broken route degrades to the behaviour that
 * existed before this chokepoint was introduced. A honeypot-flagged submit
 * in the fallback path is stored with extras {honeypot:true, suspected_spam:true}
 * rather than being silently dropped.
 *
 * 4xx (validation / bad-request): the route returns a user-facing error; the
 * client surfaces it and does NOT fall back to the direct insert (a 4xx means
 * the server understood the request and rejected it deliberately).
 */

import {
  submitLead,
  getSupabaseConfig,
  type LeadSubmission,
} from "@accounting-network/web-shared/lib/supabase-client";

export interface CisLeadPayload {
  full_name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  source: string;
  source_url?: string;
  submitted_at?: string;
  consent_given?: boolean;
  consent_text?: string;
  consent_at?: string;
  visitor_id?: string;
  session_id?: string;
  extras?: Record<string, unknown>;
  captureMode?: "full" | "email_only";
}

export interface CisLeadResult {
  success: boolean;
  error?: string;
  leadId?: string;
  bookingToken?: string;
}

export async function submitCisLead(
  payload: CisLeadPayload,
  honeypot = "",
): Promise<CisLeadResult> {
  // Attempt via the server chokepoint.
  let useRoute = true;
  let res: Response | undefined;

  try {
    res = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, enquiry_ref: honeypot }),
    });
  } catch {
    // Network error: fall back to direct insert below.
    useRoute = false;
  }

  if (useRoute && res) {
    if (res.status < 500) {
      // 2xx / 4xx: parse and return (4xx carries a user-facing error message).
      // Do NOT fall back on 4xx — the server understood and rejected the request.
      let json: CisLeadResult = { success: false };
      try {
        json = (await res.json()) as CisLeadResult;
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        return { success: false, error: json.error || `Request failed (${res.status})` };
      }
      return { success: true, leadId: json.leadId, bookingToken: json.bookingToken };
    }
    // 5xx: route is broken; fall through to direct-insert fallback.
    try {
      await res.body?.cancel();
    } catch {
      /* ignore */
    }
  }

  // Fallback: direct Supabase insert via shared helper (anon key).
  // Honeypot-flagged submits are stored with extras flagged, never silently dropped.
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();
  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "Form not connected. Please try again shortly." };
  }

  const fallbackPayload: LeadSubmission = {
    full_name: payload.full_name,
    email: payload.email,
    phone: payload.phone,
    role: payload.role,
    message: payload.message,
    source: payload.source,
    source_url: payload.source_url ?? "",
    submitted_at: payload.submitted_at ?? new Date().toISOString(),
    consent_given: payload.consent_given ?? true,
    consent_text: payload.consent_text ?? "",
    consent_at: payload.consent_at ?? new Date().toISOString(),
    visitor_id: payload.visitor_id,
    session_id: payload.session_id,
    extras:
      honeypot
        ? { ...(payload.extras ?? {}), honeypot: true, suspected_spam: true }
        : payload.extras,
  };

  return submitLead(fallbackPayload, supabaseUrl, supabaseKey);
}
