/**
 * Client-side helper: submit a Contractor Tax Accountants lead through the
 * server chokepoint (/api/leads/submit) rather than inserting directly from
 * the browser. The server validates, deduplicates, stores with the
 * service-role key, and fires estate notifications.
 *
 * Fallback: on a network error OR a 5xx response the function falls back to
 * the shared submitLead() so a broken route degrades to the behaviour that
 * existed before this chokepoint was introduced. A honeypot-flagged submit
 * in the fallback path is stored with extras {honeypot:true, suspected_spam:true}
 * rather than being silently dropped.
 */

import {
  submitLead,
  getSupabaseConfig,
  type LeadSubmission,
} from "@accounting-network/web-shared/lib/supabase-client";

export interface ContractorLeadPayload {
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

export interface ContractorLeadResult {
  success: boolean;
  error?: string;
  leadId?: string;
}

export async function submitContractorLead(
  payload: ContractorLeadPayload,
  honeypot = "",
): Promise<ContractorLeadResult> {
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
      let json: ContractorLeadResult = { success: false };
      try {
        json = (await res.json()) as ContractorLeadResult;
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        return { success: false, error: json.error || `Request failed (${res.status})` };
      }
      return { success: true, leadId: json.leadId };
    }
    // 5xx: route is broken; fall through to direct-insert fallback.
    try {
      await res.body?.cancel();
    } catch {
      /* ignore */
    }
  }

  // Fallback: direct Supabase insert via shared helper (anon key).
  // Honeypot-flagged submits are stored, never silently dropped.
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
