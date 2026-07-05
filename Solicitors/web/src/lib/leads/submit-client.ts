/**
 * Client-side helper: submit a Solicitors lead through the server chokepoint
 * (/api/leads/submit) instead of a direct PostgREST insert.
 *
 * The server validates, dedupes, and saves with the service role so client-side
 * anon-key calls are eliminated. On a >=500 or network error the helper falls
 * back to the shared submitLead (direct anon-key insert) so a lead is never
 * silently lost.
 *
 * Honeypot: the enquiry_ref field value is forwarded in the JSON body.  The
 * server stores the row flagged when it is non-empty and returns a success shape
 * so a bot receives no signal.  Critically, this replaces the old client-side
 * silent drop that destroyed real leads autofilled by browsers.
 */

import { submitLead, getSupabaseConfig } from "@accounting-network/web-shared/lib/supabase-client";

export interface SolicitorLeadPayload {
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
  /**
   * "email_only" relaxes server validation to email + message (name/phone
   * optional). Defaults to the full form when omitted.
   */
  captureMode?: "full" | "email_only";
}

export interface SolicitorLeadResult {
  success: boolean;
  error?: string;
  leadId?: string | null;
}

/**
 * Submit a lead through the site chokepoint with honeypot forwarding.
 *
 * enquiryRef: the honeypot field value -- pass whatever the hidden input holds.
 * When non-empty the server stores the row flagged and returns success so neither
 * a bot nor a real user with browser autofill sees an error.
 */
export async function submitSolicitorLead(
  payload: SolicitorLeadPayload,
  enquiryRef = "",
): Promise<SolicitorLeadResult> {
  try {
    const res = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, enquiry_ref: enquiryRef }),
    });

    let json: SolicitorLeadResult = { success: false };
    try {
      json = (await res.json()) as SolicitorLeadResult;
    } catch {
      /* non-JSON body */
    }

    if (res.status >= 500 || res.status === 0) {
      // Server error or network failure: fall back to shared direct insert so
      // the lead is never silently lost.
      const { supabaseUrl, supabaseKey } = getSupabaseConfig();
      if (supabaseUrl && supabaseKey) {
        const fallback = await submitLead(
          {
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
            extras: enquiryRef
              ? { ...(payload.extras ?? {}), honeypot: true, suspected_spam: true }
              : payload.extras,
          },
          supabaseUrl,
          supabaseKey,
        );
        return fallback;
      }
    }

    if (!res.ok) {
      return { success: false, error: json.error || `Request failed (${res.status})` };
    }

    return { success: true, leadId: json.leadId };
  } catch {
    // Network-level failure: attempt shared direct insert as fallback.
    const { supabaseUrl, supabaseKey } = getSupabaseConfig();
    if (supabaseUrl && supabaseKey) {
      try {
        const fallback = await submitLead(
          {
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
            extras: enquiryRef
              ? { ...(payload.extras ?? {}), honeypot: true, suspected_spam: true }
              : payload.extras,
          },
          supabaseUrl,
          supabaseKey,
        );
        return fallback;
      } catch {
        /* fallback also failed */
      }
    }
    return { success: false, error: "Network error. Please try again." };
  }
}
