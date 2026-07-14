import {
  submitLead,
  getSupabaseConfig,
  type LeadSubmission,
} from "@accounting-network/web-shared/lib/supabase-client";

export interface SiteLeadPayload {
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

export interface SiteLeadResult {
  success: boolean;
  error?: string;
  leadId?: string;
}

export async function submitSiteLead(
  payload: SiteLeadPayload,
  honeypot = "",
): Promise<SiteLeadResult> {
  let useRoute = true;
  let res: Response | undefined;

  try {
    res = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, enquiry_ref: honeypot }),
    });
  } catch {
    useRoute = false;
  }

  if (useRoute && res) {
    if (res.status < 500) {
      let json: SiteLeadResult = { success: false };
      try {
        json = (await res.json()) as SiteLeadResult;
      } catch {
        /* non-JSON body */
      }
      if (!res.ok) {
        return { success: false, error: json.error || `Request failed (${res.status})` };
      }
      return { success: true, leadId: json.leadId };
    }
    try {
      await res.body?.cancel();
    } catch {
      /* ignore */
    }
  }

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
