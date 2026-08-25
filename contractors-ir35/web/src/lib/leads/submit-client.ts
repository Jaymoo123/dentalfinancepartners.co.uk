/**
 * Client-side helper: submit a Contractor Tax Accountants lead through the
 * server chokepoint (/api/leads/submit) instead of a direct PostgREST insert.
 *
 * The server validates, dedupes, verifies the phone/email in real time, saves
 * with the service role, and enrols the lead into nurture. There is NO anon-key
 * fallback: it bypassed every server check (honeypot handling, dedupe,
 * verification), so a server error now surfaces to the form instead of writing
 * an unverified row (matches Property, 2026-08).
 *
 * Honeypot: the enquiry_ref field value is forwarded in the JSON body. The
 * server stores the row flagged when it is non-empty and returns a success shape
 * so a bot receives no signal.
 */

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
  /**
   * "email_only" relaxes server validation to email + message (name/phone
   * optional). Defaults to the full form when omitted.
   */
  captureMode?: "full" | "email_only";
}

export interface ContractorLeadResult {
  success: boolean;
  error?: string;
  leadId?: string | null;
  /** Signed token for the native /book slot picker (thank-you page embed). */
  bookingToken?: string;
  verify?: {
    phone: "valid_mobile" | "valid_landline" | "voip" | "invalid" | "unknown";
    email: "deliverable" | "undeliverable" | "risky" | "unknown";
  };
  /** True when the saved contact details look wrong and the user should re-check. */
  needsCheck?: boolean;
}

/**
 * Submit a lead through the site chokepoint with honeypot forwarding.
 *
 * enquiryRef: the honeypot field value -- pass whatever the hidden input holds.
 * When non-empty the server stores the row flagged and returns success so neither
 * a bot nor a real user with browser autofill sees an error.
 */
export async function submitContractorLead(
  payload: ContractorLeadPayload,
  enquiryRef = "",
): Promise<ContractorLeadResult> {
  try {
    const res = await fetch("/api/leads/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, enquiry_ref: enquiryRef }),
    });
    let json: ContractorLeadResult = { success: false };
    try {
      json = (await res.json()) as ContractorLeadResult;
    } catch {
      /* non-JSON body */
    }
    if (!res.ok) {
      return { success: false, error: json.error || `Request failed (${res.status})` };
    }
    const needsCheck = json.verify?.phone === "invalid";
    return { ...json, success: true, needsCheck };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
